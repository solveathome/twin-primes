// SINGLETON FIBERS — reuse archived interval inputs; measure the new partition.
// Companions: research/singleton-fiber-audit.md; research/data-reuse-audit.md.
// Finite identities and descriptive measurements, not an asymptotic fit.
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.join(__dirname, '..');
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
const csvBytes = fs.readFileSync(path.join(__dirname, 'fold-ledger-01.csv'));
const lines = csvBytes.toString().trim().split('\n'), header = lines.shift().split(',');
const rows = lines.map(line => Object.fromEntries(line.split(',').map((s, i) => [header[i], Number(s)])));
for (let i = 0; i < rows.length; i++) {
  const r = rows[i];
  assert.equal(r.stretch_lo, r.q * r.q);
  assert.equal(r.width, r.q_next ** 2 - r.stretch_lo);
  assert.equal(r.added_pairs - r.removed_total, r.net_new_twins);
  assert.equal(r.removed_by_new_prime + r.removed_by_old_moire, r.removed_total);
  if (i) assert.equal(rows[i - 1].q_next, r.q);
}
const basePrimes = [2, 3, 5, ...rows.map(r => r.q), rows.at(-1).q_next];
const flags = new Uint8Array(basePrimes.at(-1) + 1);
for (let p = 2; p * p < flags.length; p++) if (!flags[p]) {
  for (let m = p * p; m < flags.length; m += p) flags[m] = 1;
}
const referencePrimes = [];
for (let n = 2; n < flags.length; n++) if (!flags[n]) referencePrimes.push(n);
assert.deepEqual(basePrimes, referencePrimes, 'archived q/q_next columns supply the complete base prime list');
console.log(`input: fold-ledger-01.csv sha256=${sha(csvBytes)}; ${rows.length} rows checked; ${basePrimes.length} base primes recovered through ${basePrimes.at(-1)}`);

function gcd(a, b) { while (b) [a, b] = [b, a % b]; return a; }
function inverse(a, q) {
  let r = a, s = q, u = 1, v = 0;
  while (s) { const t = Math.floor(r / s); [r, s] = [s, r - t * s]; [u, v] = [v, u - t * v]; }
  assert.equal(r, 1); return ((u % q) + q) % q;
}
function powerFloor(x, a, b) {
  let n = Math.floor(x ** (a / b));
  const t = BigInt(x) ** BigInt(a);
  while (BigInt(n + 1) ** BigInt(b) <= t) n++;
  while (BigInt(n) ** BigInt(b) > t) n--;
  return n;
}
const cuts = x => ({U: powerFloor(x, 6, 25), Y: powerFloor(x, 1, 20)});
class Sum {
  constructor() { this.s = 0; this.c = 0; }
  add(v) { const y = v - this.c, t = this.s + y; this.c = (t - this.s) - y; this.s = t; }
}
function close(a, b, scale, label) { assert(Math.abs(a - b) <= 2e-11 * Math.max(1, scale), `${label}: ${a} != ${b}`); }

const cap = 2 ** 20, spf = new Uint32Array(cap + 1), mu = new Int8Array(cap + 1);
mu[1] = 1;
for (const p of basePrimes) {
  if (p * p > cap) break;
  for (let n = p * p; n <= cap; n += p) if (!spf[n]) spf[n] = p;
}
for (let n = 2; n <= cap; n++) { const p = spf[n] || n, m = n / p; mu[n] = m % p ? -mu[m] : 0; }
function factors(n) {
  const out = [];
  while (n > 1) {
    const p = spf[n] || n; let a = 0;
    do { n /= p; a++; } while (n % p === 0);
    out.push([p, a]);
  }
  return out;
}
function factorBlock(lo, hi) {
  const rem = Float64Array.from({length: hi - lo + 1}, (_, j) => lo + j);
  const out = Array.from({length: rem.length}, () => []);
  for (const p of basePrimes) {
    if (p * p > hi) break;
    for (let n = Math.ceil(lo / p) * p; n <= hi; n += p) {
      const j = n - lo; let a = 0;
      while (rem[j] % p === 0) { rem[j] /= p; a++; }
      if (a) out[j].push([p, a]);
    }
  }
  for (let j = 0; j < rem.length; j++) {
    if (rem[j] > 1) out[j].push([rem[j], 1]);
    assert.equal(out[j].reduce((n, [p, a]) => n * p ** a, 1), lo + j);
  }
  return out;
}
// Enumerate squarefree divisors only: all other Mobius coefficients vanish.
// Removing one p from d's cofactor removes log(p) from beta exactly when
// the original largest power p^a exceeds the cutoff.
function terms(n, fac, cutoff) {
  let initial = 0;
  for (const [p, a] of fac) {
    let power = 1;
    for (let j = 1; j <= a; j++) { power *= p; if (power > cutoff) initial += Math.log(p); }
  }
  let divisors = [[1, 1, initial]];
  for (const [p, a] of fac) {
    const delta = p ** a > cutoff ? Math.log(p) : 0, len = divisors.length;
    for (let j = 0; j < len; j++) {
      const [d, sign, beta] = divisors[j]; divisors.push([d * p, -sign, beta - delta]);
    }
  }
  const out = [];
  for (let [d, sign, beta] of divisors) {
    // Nonzero exact beta is at least log(2); this only normalizes roundoff.
    if (Math.abs(beta) < 1e-10) beta = 0;
    assert(beta >= 0);
    if (d > cutoff && n / d > cutoff && beta) out.push({d, k: n / d, sign, beta});
  }
  return out;
}
function fiberSize(x, U, Y, d, k, e, v) {
  // On an actual determinant-2 solution the gcd is 1 or 2.
  const g = k % 2 === 0 && v % 2 === 0 ? 2 : 1;
  const sd = v / g, se = k / g;
  const lower = Math.max(Math.floor((Math.max(U, Math.floor(x / (2 * k))) - d) / sd), Math.floor((Y - e) / se));
  const upper = Math.floor((Math.floor(x / k) - d) / sd);
  const m = upper - lower;
  assert(m >= 1);
  if (k * v > x) assert.equal(m, 1);
  return m;
}

// Independently check the optimized divisor/weight enumeration against
// the defining sums, including prime powers and several unequal sizes.
{
  const lambda = Array.from({length: 513}, (_, n) => {
    if (n < 2) return 0;
    const f = factors(n); return f.length === 1 ? Math.log(f[0][0]) : 0;
  });
  let checked = 0;
  for (let n = 2; n <= 512; n++) for (const c of [1, 2, 3, 7, 31]) {
    const actual = terms(n, factors(n), c), expected = [];
    for (let d = c + 1; d <= n; d++) {
      if (n % d || !mu[d] || n / d <= c) continue;
      const k = n / d; let beta = 0;
      for (let r = c + 1; r <= k; r++) if (k % r === 0) beta += lambda[r];
      if (beta) expected.push({d, k, sign: mu[d], beta});
    }
    actual.sort((a, b) => a.d - b.d);
    assert.equal(actual.length, expected.length);
    for (let j = 0; j < actual.length; j++) {
      assert.deepEqual([actual[j].d, actual[j].k, actual[j].sign], [expected[j].d, expected[j].k, expected[j].sign]);
      close(actual[j].beta, expected[j].beta, Math.log(n), 'direct beta/divisor definition');
    }
    checked++;
  }
  console.log(`coefficients: ${checked} integer/cutoff cases agree with independent defining divisor sums`);
}

// Independent exhaustive geometry includes zero Mobius/beta terms, so a
// fiber containing a zero coefficient is not misclassified as a singleton.
{
  const x = 256, {U, Y} = cuts(x), table = new Map();
  for (let d = U + 1; d <= x; d++) for (let k = U + 1; d * k <= x; k++) {
    if (d * k <= x / 2) continue;
    for (let e = Y + 1; e <= d * k - 2; e++) {
      const v = (d * k - 2) / e;
      if (!Number.isInteger(v) || v <= Y) continue;
      const key = `${k},${v}`;
      if (!table.has(key)) table.set(key, []);
      table.get(key).push({d, k, e, v});
    }
  }
  let count = 0;
  for (const terms of table.values()) for (const t of terms) {
    assert.equal(fiberSize(x, U, Y, t.d, t.k, t.e, t.v), terms.length); count++;
  }
  console.log(`geometry: ${count} determinant solutions in ${table.size} independently counted fibers; zero-weight solutions retained`);
}

// Verify the coprime/squarefree witness classes used by the written proof.
for (const [U, Y] of [[32, 16], [128, 32], [512, 64]]) {
  let pos = 0, neg = 0;
  for (let d = U + 1; d <= 2 * U; d += 1) for (let e = Y + 1; e <= 2 * Y; e += 1) {
    if (!(d % 2 && e % 2) || gcd(d, e) !== 1 || !mu[d] || !mu[e]) continue;
    if (mu[d] * mu[e] > 0) pos++; else neg++;
  }
  assert(pos && neg); // Finite nonemptiness, not the asymptotic density claim.
  console.log(`witness classes U=${U} Y=${Y}: positive=${pos}, negative=${neg}; density theorem is proved separately`);
}
// Exact power budgets: Q exponent 1/4 < sqrt(K) exponent 19/50;
// proper-prime-power subtraction exponent 87/100 < 1.
assert(50n < 4n * 19n); assert(87n < 100n);

function measure(label, x, lo, hi, getFactors, full) {
  const {U, Y} = cuts(x), sum = {};
  for (const s of ['grouped', 'single', 'multiple', 'pos1', 'neg1', 'absMulti', 'witness', 'primeMass', 'shifted']) sum[s] = new Sum();
  let active = 0, one = 0, primeZero = 0;
  const ellList = basePrimes.filter(p => p > x ** 0.1 && p <= x ** 0.2 && p > 2 * Y);
  for (let n = lo; n <= hi; n++) {
    const fn = getFactors(n), ft = getFactors(n - 2);
    const left = terms(n, fn, U), right = terms(n - 2, ft, Y);
    const lc = left.reduce((s, t) => s + t.sign * t.beta, 0), rc = right.reduce((s, t) => s + t.sign * t.beta, 0);
    sum.grouped.add(lc * rc);
    const ln = fn.length === 1 ? Math.log(fn[0][0]) : 0, lt = ft.length === 1 ? Math.log(ft[0][0]) : 0;
    sum.primeMass.add(ln * lt); sum.shifted.add(lc * lt);
    const isPrime = f => f.length === 1 && f[0][1] === 1;
    if (isPrime(fn) || isPrime(ft)) { assert.equal(left.length * right.length, 0); primeZero++; }
    for (const a of left) for (const b of right) {
      const w = a.beta * b.beta, sign = a.sign * b.sign;
      const size = fiberSize(x, U, Y, a.d, a.k, b.d, b.k);
      if (size === 1) {
        sum.single.add(sign * w); sum[sign > 0 ? 'pos1' : 'neg1'].add(w); one++;
      } else { sum.multiple.add(sign * w); sum.absMulti.add(w); }
      active++;
      if (a.d <= 2 * U && b.d <= 2 * Y && a.d % 2 && b.d % 2 && fn.some(([p]) => p === a.k)) {
        assert.equal(gcd(a.d, b.d), 1);
        assert.equal(size, 1);
        let betaPart = 0;
        for (const ell of ellList) if (b.k % ell === 0) betaPart += Math.log(ell);
        sum.witness.add(Math.log(a.k) * betaPart);
      }
    }
  }
  const abs = sum.pos1.s + sum.neg1.s + sum.absMulti.s;
  close(sum.grouped.s, sum.single.s + sum.multiple.s, abs, `${label} regrouping`);
  close(sum.single.s, sum.pos1.s - sum.neg1.s, abs, `${label} singleton signs`);
  assert(sum.witness.s <= sum.pos1.s + sum.neg1.s + 1e-8);
  // Independent arithmetic-progression enumeration of the lower-bound
  // witness, on full intervals where the primality sieve is available.
  if (full) {
    const ap = new Sum();
    for (let d = U + 1; d <= 2 * U; d++) for (let e = Y + 1; e <= 2 * Y; e++) {
      if (!(d % 2 && e % 2) || !mu[d] || !mu[e] || gcd(d, e) !== 1) continue;
      for (const ell of ellList) {
        const q = e * ell;
        if (gcd(d, q) !== 1) continue;
        const a = 2 * inverse(d, q) % q, kmin = Math.floor(x / (2 * d)) + 1;
        for (let k = kmin + ((a - kmin) % q + q) % q; k <= Math.floor(x / d); k += q) {
          if (k <= U || spf[k]) continue;
          const v = (d * k - 2) / e;
          if (v <= Y) continue;
          ap.add(Math.log(k) * Math.log(ell));
        }
      }
    }
    close(sum.witness.s, ap.s, abs, `${label} independent witness progressions`);
  }
  const denominator = full ? x : hi - lo + 1;
  const unit = full ? '/x' : '/partner';
  console.log(`${label} x=${x} U=V=${U} Y=Z=${Y} n=${lo}..${hi}: R${unit}=${(sum.grouped.s / denominator).toFixed(6)} singleton${unit}=${(sum.single.s / denominator).toFixed(6)} multi${unit}=${(sum.multiple.s / denominator).toFixed(6)} P1${unit}=${(sum.pos1.s / denominator).toFixed(6)} N1${unit}=${(sum.neg1.s / denominator).toFixed(6)}`);
  console.log(`  active terms=${active}; singleton terms=${one}; prime-containing zero coefficients=${primeZero}; witness mass=${sum.witness.s.toFixed(6)}; grouping checks pass`);
  if (full) console.log(`  finite budgets /x: S=${(sum.primeMass.s / x).toFixed(6)} outer=${((sum.primeMass.s - sum.shifted.s) / x).toFixed(6)} second-Type-I=${((sum.shifted.s - sum.grouped.s) / x).toFixed(6)}; asymptotic errors are not discarded`);
  return {label, x, U, Y, lo, hi, full, active, one, primeZero, sums: Object.fromEntries(Object.entries(sum).map(([k, v]) => [k, v.s]))};
}

const results = [];
for (const x of [2 ** 14, 2 ** 16, 2 ** 18, 2 ** 20]) results.push(measure('dyadic', x, x / 2 + 1, x, factors, true));

const windows = [];
for (const q of [97, 997, 9973]) {
  const row = rows.find(r => r.q === q); assert(row);
  const low = row.stretch_lo, top = row.q_next ** 2;
  // Recheck the entire archived row using a separate all-prime marking.
  const mark = new Uint32Array(row.width);
  for (const p of basePrimes) {
    if (p > q) break;
    for (let n = Math.ceil(low / p) * p; n < top; n += p) if (!mark[n - low]) mark[n - low] = p;
  }
  let added = 0, twins = 0, both = 0, byNew = 0;
  for (let a = low; a + 2 < top; a++) {
    if (![11, 17, 29].includes(a % 30)) continue;
    added++;
    const pa = mark[a - low], pb = mark[a + 2 - low];
    if (!pa && !pb) { twins++; continue; }
    if (pa && pb) both++;
    if ((pa && pb ? Math.min(pa, pb) : pa || pb) === q) byNew++;
  }
  assert.deepEqual([added, twins, both, byNew], [row.added_pairs, row.net_new_twins, row.both_composite_pairs, row.removed_by_new_prime]);
  const x = 2 ** Math.ceil(Math.log2(top)), lo = Math.max(low + 2, x / 2 + 1), hi = Math.min(top - 1, lo + 4095);
  const start = lo - 2, fac = factorBlock(start, hi);
  const get = n => fac[n - start];
  const result = measure(`archived-q${q}`, x, lo, hi, get, false);
  windows.push({q, row, x, lo, hi, factorStart: start, primePowerFactors: fac});
  results.push(result);
  console.log(`  archived q=${q}: full CSV row independently reproduced; new prefix includes every residue class`);
}
const payload = {schema: 1, producer: 'research/singleton-fiber-validation.js', source: 'research/fold-ledger-01.csv', sourceSha256: sha(csvBytes), basePrimes, windows, results};
const bytes = JSON.stringify(payload) + '\n';
const outDir = path.join(__dirname, 'data-reuse'); fs.mkdirSync(outDir, {recursive: true});
fs.writeFileSync(path.join(outDir, 'factor-windows.json'), bytes);
console.log(`saved data-reuse/factor-windows.json: ${Buffer.byteLength(bytes)} bytes sha256=${sha(bytes)}; complete prime-power factorizations retained for all archived prefixes`);
console.log('No asymptotic rate fitted. Partial archived windows are not full dyadic residuals; small inner cutoffs are explicit.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/singleton-fiber-validation.js
//   invocation:  node research/singleton-fiber-validation.js
//   code-sha256: 99e0e648c4350069dcecbd33846c994c95f34166bcf9c7187622af04cf94770d
//   out-sha256:  df454a423658669a00ebc70a83994cd256c1867d3d59cb884f602b71dfb36c19
//   body-lines:  29
//   inputs:      research/fold-ledger-01.csv@ed5364404c9b
//   forced:      2026-09-05, 0 of 101 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-05
//   elapsed:     1.7 s
// ============================================================================
// input: fold-ledger-01.csv sha256=ed5364404c9b84d16709a800e3eb5d7077788879dc1f2f5df4433fb55823461d; 1226 rows checked; 1230 base primes recovered through 10007
// coefficients: 2555 integer/cutoff cases agree with independent defining divisor sums
// geometry: 1574 determinant solutions in 1118 independently counted fibers; zero-weight solutions retained
// witness classes U=32 Y=16: positive=36, negative=35; density theorem is proved separately
// witness classes U=128 Y=32: positive=273, negative=311; density theorem is proved separately
// witness classes U=512 Y=64: positive=2314, negative=2355; density theorem is proved separately
// dyadic x=16384 U=V=10 Y=Z=1 n=8193..16384: R/x=1.969603 singleton/x=2.067754 multi/x=-0.098151 P1/x=50.215760 N1/x=48.148007
//   active terms=107807; singleton terms=65147; prime-containing zero coefficients=1632; witness mass=0.000000; grouping checks pass
//   finite budgets /x: S=0.616445 outer=0.882577 second-Type-I=-2.235734; asymptotic errors are not discarded
// dyadic x=65536 U=V=14 Y=Z=1 n=32769..65536: R/x=0.098539 singleton/x=0.159203 multi/x=-0.060664 P1/x=79.350749 N1/x=79.191546
//   active terms=543536; singleton terms=322120; prime-containing zero coefficients=5705; witness mass=0.000000; grouping checks pass
//   finite budgets /x: S=0.633497 outer=0.320402 second-Type-I=0.214555; asymptotic errors are not discarded
// dyadic x=262144 U=V=19 Y=Z=1 n=131073..262144: R/x=-1.770774 singleton/x=-1.771275 multi/x=0.000501 P1/x=128.302162 N1/x=130.073438
//   active terms=2711768; singleton terms=1616377; prime-containing zero coefficients=20346; witness mass=0.000000; grouping checks pass
//   finite budgets /x: S=0.652028 outer=0.358462 second-Type-I=2.064340; asymptotic errors are not discarded
// dyadic x=1048576 U=V=27 Y=Z=2 n=524289..1048576: R/x=3.025298 singleton/x=3.015154 multi/x=0.010144 P1/x=162.394153 N1/x=159.378999
//   active terms=11909087; singleton terms=6982970; prime-containing zero coefficients=73486; witness mass=60072.660220; grouping checks pass
//   finite budgets /x: S=0.664244 outer=0.460854 second-Type-I=-2.821908; asymptotic errors are not discarded
// archived-q97 x=16384 U=V=10 Y=Z=1 n=9411..10200: R/partner=3.311795 singleton/partner=3.968943 multi/partner=-0.657148 P1/partner=85.739145 N1/partner=81.770202
//   active terms=9625; singleton terms=5491; prime-containing zero coefficients=163; witness mass=0.000000; grouping checks pass
//   archived q=97: full CSV row independently reproduced; new prefix includes every residue class
// archived-q997 x=1048576 U=V=27 Y=Z=2 n=994011..998106: R/partner=6.175242 singleton/partner=6.190935 multi/partner=-0.015693 P1/partner=358.112965 N1/partner=351.922029
//   active terms=98739; singleton terms=58358; prime-containing zero coefficients=574; witness mass=589.036806; grouping checks pass
//   archived q=997: full CSV row independently reproduced; new prefix includes every residue class
// archived-q9973 x=134217728 U=V=89 Y=Z=2 n=99460731..99464826: R/partner=2.811357 singleton/partner=2.732651 multi/partner=0.078707 P1/partner=1101.234101 N1/partner=1098.501451
//   active terms=164813; singleton terms=99028; prime-containing zero coefficients=418; witness mass=527.770902; grouping checks pass
//   archived q=9973: full CSV row independently reproduced; new prefix includes every residue class
// saved data-reuse/factor-windows.json: 235554 bytes sha256=fa30e65431c2f9fa7b66a4e3cf7eb44cdcc912c4de19b97d56dfbf279030b98b; complete prime-power factorizations retained for all archived prefixes
// No asymptotic rate fitted. Partial archived windows are not full dyadic residuals; small inner cutoffs are explicit.
// ============================================================================
// READINGS
// Input rows are read from the existing CSV, not transcribed. The prime list
// and selected old row counts are checked independently. Saved factorizations
// allow later cutoffs to be evaluated without losing divisor information.
// Signed and absolute masses are finite measurements. The written argument,
// not these runs, establishes the eventual lower bounds for each sign.
