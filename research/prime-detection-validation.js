// PRIME DETECTION — exact local-comparator and Vaughan/fold identity checks.
// Companion: research/prime-detection-spec.md; research/bilinear-fold-attack.md;
// research/polylog-fold-transfer.md.
// Checks finite algebra only, never the open bilinear estimate.
'use strict';
const assert = require('node:assert/strict');

const levels = [256, 4096, 65536];
const cap = Math.max(...levels);
const spf = new Uint32Array(cap + 1);
const mu = new Int8Array(cap + 1);
const primes = [];
mu[1] = 1;
for (let p = 2; p <= cap; p++) {
  if (spf[p]) continue;
  primes.push(p);
  for (let n = p; n <= cap; n += p) if (!spf[n]) spf[n] = p;
}
for (let n = 2; n <= cap; n++) {
  const p = spf[n], m = n / p;
  mu[n] = m % p === 0 ? 0 : -mu[m];
}
function factor(n) {
  const f = new Map();
  while (n > 1) { const p = spf[n]; f.set(p, (f.get(p) || 0) + 1); n /= p; }
  return f;
}
function divisors(n) {
  let ds = [1];
  for (const [p, e] of factor(n)) {
    const before = ds.slice(); let power = 1;
    for (let j = 1; j <= e; j++) { power *= p; ds.push(...before.map(d => d * power)); }
  }
  return ds;
}
function plus(target, source, scale = 1) {
  for (const [p, c] of source) {
    const v = (target.get(p) || 0) + scale * c;
    if (v) target.set(p, v); else target.delete(p);
  }
}
function equalVectors(a, b, label) {
  const sort = v => [...v].sort((x, y) => x[0] - y[0]);
  assert.deepEqual(sort(a), sort(b), label);
}
function lambdaVector(n) {
  const f = factor(n);
  return f.size === 1 ? new Map([[f.keys().next().value, 1]]) : new Map();
}
function betaVector(n, cutoff) {
  const result = new Map();
  for (const [p, e] of factor(n)) {
    let power = 1, count = 0;
    for (let j = 1; j <= e; j++) { power *= p; if (power > cutoff) count++; }
    if (count) result.set(p, count);
  }
  return result;
}
// All log expressions are maps p -> integer coefficient of log(p). Thus
// cancellations are checked exactly, without floating point logarithms.
let pointChecks = 0, ancestryChecks = 0;
for (const x of levels) {
  // Exact floor of x^(6/25), including values near integer boundaries.
  let U = Math.floor(x ** (6 / 25));
  const x6 = BigInt(x) ** 6n;
  while (BigInt(U + 1) ** 25n <= x6) U++;
  while (BigInt(U) ** 25n > x6) U--;
  const V = U;
  const cs = Array.from({length: U * V + 1}, () => new Map());
  for (let d = 1; d <= U; d++) {
    if (!mu[d]) continue;
    for (let ell = 2; ell <= V; ell++) plus(cs[d * ell], lambdaVector(ell), mu[d]);
  }
  const contractedDirect = new Map(), contractedParts = new Map(), contractedFold = new Map();
  let intervalChecks = 0;
  for (let n = 2; n <= x; n++) {
    const ds = divisors(n), first = new Map(), second = new Map(), bilinear = new Map();
    for (const d of ds) {
      const k = n / d;
      if (d <= U && mu[d]) plus(first, factor(k), mu[d]);
      if (d <= U * V) plus(second, cs[d]);
      if (d > U && k > V && mu[d]) plus(bilinear, betaVector(k, V), mu[d]);
    }
    const rhs = new Map();
    plus(rhs, first); plus(rhs, second, -1); plus(rhs, bilinear);
    if (n <= V) plus(rhs, lambdaVector(n));
    equalVectors(rhs, lambdaVector(n), `Vaughan x=${x}, n=${n}`);
    pointChecks++;
    if (n <= x / 2) continue;
    // This independent first-fold enumeration includes s=1 and requires
    // the STRICT least-prime-factor condition, including squareful s.
    const fold = new Map();
    for (const q of factor(n).keys()) {
      for (const s of divisors(n / q)) {
        const d = q * s, k = n / d;
        if (d <= U || k <= V || (s !== 1 && spf[s] <= q)) continue;
        plus(fold, betaVector(k, V), -mu[s]);
      }
    }
    equalVectors(fold, bilinear, `first fold x=${x}, n=${n}`);
    ancestryChecks++; intervalChecks++;
    // An arbitrary signed integer test weight exercises contraction of the
    // pointwise identity. It is not a model of the prime distribution.
    const testWeight = ((37 * n + 11) % 23) - 11;
    plus(contractedDirect, lambdaVector(n), testWeight);
    plus(contractedParts, first, testWeight);
    plus(contractedParts, second, -testWeight);
    plus(contractedParts, bilinear, testWeight);
    plus(contractedFold, fold, testWeight);
    plus(contractedFold, first, testWeight);
    plus(contractedFold, second, -testWeight);
  }
  equalVectors(contractedDirect, contractedParts, 'weighted contraction');
  equalVectors(contractedDirect, contractedFold, 'fold contraction');
  console.log(`x=${x} U=V=${U}: exact Vaughan vectors through x; ${intervalChecks} partner endpoints and first-fold identities agree`);
}

function gcd(a, b) { while (b) [a, b] = [b, a % b]; return a < 0n ? -a : a; }
function rat(n, d = 1n) {
  n = BigInt(n); d = BigInt(d); assert(d !== 0n);
  if (d < 0n) { n = -n; d = -d; }
  const g = gcd(n, d); return {n: n / g, d: d / g};
}
const add = (a, b) => rat(a.n * b.d + b.n * a.d, a.d * b.d);
const mul = (a, b) => rat(a.n * b.n, a.d * b.d);
function f(n) {
  let out = rat(1);
  for (const p of factor(n).keys()) if (p > 2) out = mul(out, rat(p - 1, p - 2));
  return out;
}
function h(n) {
  if (n % 2 === 0 || !mu[n]) return rat(0);
  let out = rat(1);
  for (const p of factor(n).keys()) out = mul(out, rat(1, p - 2));
  return out;
}
let convolutionChecks = 0, localChecks = 0;
for (let n = 1; n <= 4095; n += 2) {
  const sum = divisors(n).reduce((a, d) => add(a, h(d)), rat(0));
  assert.deepEqual(sum, f(n)); convolutionChecks++;
}
const localPrimes = primes.filter(p => p > 2 && p <= 31);
let Cfinite = rat(1);
for (const p of localPrimes) Cfinite = mul(Cfinite, rat(p * (p - 2), (p - 1) ** 2));
for (let d = 1; d <= 4095; d += 2) {
  const fs = factor(d);
  if ([...fs.keys()].some(p => p > 31)) continue;
  let lhs = mul(Cfinite, f(d)), rhs = rat(1);
  for (const p of localPrimes) if (d % p !== 0) lhs = mul(lhs, rat((p - 1) ** 2, p * (p - 2)));
  for (const p of fs.keys()) rhs = mul(rhs, rat(p, p - 1));
  assert.deepEqual(lhs, rhs); localChecks++;
}
console.log(`exact comparator: ${convolutionChecks} odd divisor expansions; ${localChecks} finite Euler-factor density identities, including prime powers`);
let mobiusProductChecks = 0;
for (const selected of [new Set([3, 5, 7, 11]), new Set(primes.filter(p => p > 2))]) {
  for (const k of [1, 3, 15, 49, 77]) {
    const hProduct = e => {
      let out = rat(1);
      for (const p of factor(e).keys()) {
        if (p === 2) continue;
        if (!selected.has(p) || k % p === 0) return rat(0);
        out = mul(out, rat(-1, p - 2));
      }
      return out;
    };
    for (let d = 1; d <= 256; d++) {
      const convolution = divisors(d).reduce((out, e) => add(out, mul(rat(mu[d / e]), hProduct(e))), rat(0));
      let expected = rat(d % 2 ? mu[d] : 0);
      for (const p of factor(d).keys()) {
        if (p > 2 && selected.has(p) && k % p !== 0) expected = mul(expected, rat(p - 1, p - 2));
      }
      assert.deepEqual(convolution, expected); mobiusProductChecks++;
    }
  }
}
console.log(`exact comparison Mobius convolution: ${mobiusProductChecks} rational identities, uniformly indexed by selected prime set and cofactor`);

// Check the second-moment expansion on a deterministic signed integer
// sequence: this verifies endpoints and diagonal/off-diagonal accounting.
const sx = 256, cutoff = 3;
const betaUnit = k => [...betaVector(k, cutoff).values()].reduce((a, b) => a + b, 0);
const testW = n => ((19 * n + 7) % 17) - 8;
let blockChecks = 0;
for (let M = cutoff; M < sx / cutoff; M *= 2) {
  const rows = [];
  for (let d = M + 1; d <= Math.min(2 * M, Math.floor(sx / cutoff)); d++) {
    const entries = [];
    for (let k = Math.max(cutoff + 1, Math.floor(sx / (2 * d)) + 1); k <= Math.floor(sx / d); k++) {
      entries.push([k, betaUnit(k) * testW(d * k)]);
    }
    rows.push([d, entries]);
  }
  let rowSquare = 0, diag = 0, off = 0, B = 0;
  for (const [d, entries] of rows) {
    const sum = entries.reduce((a, e) => a + e[1], 0);
    B += mu[d] * sum; rowSquare += sum * sum;
    for (const [k1, v1] of entries) for (const [k2, v2] of entries) {
      if (k1 === k2) diag += v1 * v2; else off += v1 * v2;
    }
  }
  assert.equal(rowSquare, diag + off);
  assert(B * B <= 2 * M * rowSquare);
  blockChecks++;
}
console.log(`exact second moment: ${blockChecks} clipped blocks, signed off-diagonal and Cauchy-Schwarz bound agree`);
let covarianceChecks = 0;
for (const q of [3, 5, 7, 11, 13]) {
  // r_q(t) has denominator (q-1)^2. Keep its integer numerator.
  const rn = t => (t % q === 2 ? 0 : q * (q - 1))
    - (t % q === 0 ? q * (q - 1) : q * (q - 2));
  const cov = Array.from({length: q}, () => new Array(q).fill(0));
  for (let i = 0; i < q; i++) for (let j = 0; j < q; j++) {
    let sum = 0;
    for (let d = 0; d < q; d++) sum += rn(d * i) * rn(d * j);
    const expected = !i || !j ? 0 : q * q * (q - 1) * (i === j ? q - 2 : -1);
    assert.equal(sum, expected); cov[i][j] = sum; covarianceChecks++;
  }
  // Weighted kernel contraction, with the common denominator omitted.
  const masses = Array.from({length: q}, (_, i) => (7 * i + 3) % 11 - 5);
  let lhs = 0, sum = 0, squares = 0;
  for (let i = 1; i < q; i++) {
    sum += masses[i]; squares += masses[i] ** 2;
    for (let j = 1; j < q; j++) lhs += masses[i] * masses[j] * cov[i][j];
  }
  assert.equal(lhs, q * q * (q - 1) * ((q - 1) * squares - sum * sum));
  for (let i = 0; i < q; i++) assert.equal(cov[i].reduce((a, b) => a + b, 0), 0);
}
console.log(`exact fixed-fold covariance: ${covarianceChecks} residue pairs; weighted imbalance-square identity and zero row sums agree`);
let jointClasses = 0;
for (const Q of [6, 30, 210]) {
  const qPrimes = [...factor(Q).keys()].filter(q => q > 2);
  // Common denominator is product (q-1)^2 over odd q|Q; parity has no
  // denominator. These are exact numerators of A_Q(t)-b_Q(t).
  const jointNumer = t => {
    let a = t % 2 ? 2 : 0, b = a;
    for (const q of qPrimes) {
      a *= t % q === 2 ? 0 : q * (q - 1);
      b *= t % q === 0 ? q * (q - 1) : q * (q - 2);
    }
    return a - b;
  };
  for (let d = 0; d < Q; d++) {
    const byGcd = new Map();
    for (let k = 0; k < Q; k++) {
      const g = Number(gcd(BigInt(k), BigInt(Q)));
      byGcd.set(g, (byGcd.get(g) || 0) + jointNumer(d * k));
    }
    for (const sum of byGcd.values()) { assert.equal(sum, 0); jointClasses++; }
  }
}
console.log(`exact joint folds: ${jointClasses} gcd-class conditional means vanish at Q=6,30,210, including nonunit and parity cases`);
console.log(`total: ${pointChecks} pointwise log-vector identities; ${ancestryChecks} first-fold identities; no asymptotic bilinear estimate tested`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/prime-detection-validation.js
//   invocation:  node research/prime-detection-validation.js
//   code-sha256: fe664677a010e87248442419719de66394d1c2b89b96e05fef582a4420827e17
//   out-sha256:  5686f278bb3c87633934b7aebd449bcef21520674677d83e216ee0ecb769088b
//   body-lines:  9
//   forced:      2026-09-05, 0 of 11 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-05
//   elapsed:     0.4 s
// ============================================================================
// x=256 U=V=3: exact Vaughan vectors through x; 128 partner endpoints and first-fold identities agree
// x=4096 U=V=7: exact Vaughan vectors through x; 2048 partner endpoints and first-fold identities agree
// x=65536 U=V=14: exact Vaughan vectors through x; 32768 partner endpoints and first-fold identities agree
// exact comparator: 2048 odd divisor expansions; 364 finite Euler-factor density identities, including prime powers
// exact comparison Mobius convolution: 2560 rational identities, uniformly indexed by selected prime set and cofactor
// exact second moment: 5 clipped blocks, signed off-diagonal and Cauchy-Schwarz bound agree
// exact fixed-fold covariance: 373 residue pairs; weighted imbalance-square identity and zero row sums agree
// exact joint folds: 3624 gcd-class conditional means vanish at Q=6,30,210, including nonunit and parity cases
// total: 69885 pointwise log-vector identities; 34944 first-fold identities; no asymptotic bilinear estimate tested
// ============================================================================
// READINGS
// Logarithms are represented by exact prime-indexed integer vectors; local
// Euler factors use BigInt rationals. These check the specified identities
// and finite endpoint conventions, not a cancellation rate for shifted primes.
