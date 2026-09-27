// CHEN BENCHMARK — exact minorant checks and a rational integral certificate.
// Finite algebra checks only. No numerical claim of asymptotic cancellation.
// Proof and input ledger: research/chen-fold-benchmark.md
'use strict';
const assert = require('node:assert/strict');

// Fractions are exact BigInts; all logarithm bounds below come from a positive
// power series with an explicit geometric tail, not floating point quadrature.
function gcd(a, b) { while (b) [a, b] = [b, a % b]; return a < 0n ? -a : a; }
function rat(n, d = 1n) {
  n = BigInt(n); d = BigInt(d); assert(d !== 0n);
  if (d < 0n) { n = -n; d = -d; }
  const g = gcd(n, d); return { n: n / g, d: d / g };
}
const add = (a, b) => rat(a.n * b.d + b.n * a.d, a.d * b.d);
const neg = a => rat(-a.n, a.d);
const sub = (a, b) => add(a, neg(b));
const mul = (a, b) => rat(a.n * b.n, a.d * b.d);
const div = (a, b) => rat(a.n * b.d, a.d * b.n);
const lt = (a, b) => a.n * b.d < b.n * a.d;
const one = rat(1);
function logBounds(u, terms = 6) {
  const w = div(sub(u, one), add(u, one));
  assert(w.n >= 0n && lt(w, one));
  const w2 = mul(w, w);
  let power = w, lower = rat(0);
  for (let j = 0; j < terms; j++) {
    lower = add(lower, div(mul(rat(2), power), rat(2 * j + 1)));
    power = mul(power, w2);
  }
  const tail = div(mul(rat(2), power), mul(rat(2 * terms + 1), sub(one, w2)));
  return { lower, upper: add(lower, tail) };
}
const partitions = 128;
const left = rat(1, 8), step = div(sub(rat(1, 3), left), rat(partitions));
let integralUpper = rat(0);
for (let j = 0; j < partitions; j++) {
  const t = add(left, mul(rat(j), step));
  const logUpper = logBounds(sub(rat(2), mul(rat(3), t))).upper;
  integralUpper = add(integralUpper, mul(step, div(logUpper, mul(t, sub(one, t)))));
}
assert(lt(integralUpper, rat(3, 8)));
assert(lt(rat(2, 5), logBounds(rat(3, 2)).lower));
assert(lt(rat(1, 40), sub(logBounds(rat(3, 2)).lower, integralUpper)));
console.log(`rational certificate: ${partitions} left rectangles, 6 log-series terms; J < 3/8, log(3/2) > 2/5, margin > 1/40`);

// The elementary lower bound log(u) >= 2(u-1)/(u+1), integrated in the
// benchmark's J, gives J >= (2/3) log(7/2) - 10/21. This checks the sign
// of the separate-estimate budget in the opportunity audit, not the sign
// of the actual twin-count expression.
const jLower = sub(mul(rat(2, 3), logBounds(rat(7, 2)).lower), rat(10, 21));
assert(lt(rat(1, 3), jLower));
assert(lt(logBounds(rat(3, 2)).upper, rat(1, 2)));
assert(lt(sub(mul(rat(1, 2), logBounds(rat(3, 2)).upper), jLower), rat(-1, 12)));
console.log('separate-estimate certificate: J > 1/3; (1/2)log(3/2)-J < -1/12, so component cancellation alone does not close these bounds');

const levels = [256, 4096, 65536, 1048576];
const cap = Math.max(...levels);
const spf = new Uint32Array(cap + 1), omega = new Uint8Array(cap + 1);
const primes = [];
for (let p = 2; p <= cap; p++) {
  if (spf[p]) continue;
  primes.push(p);
  for (let m = p; m <= cap; m += p) if (!spf[m]) spf[m] = p;
}
for (let m = 2; m <= cap; m++) omega[m] = omega[m / spf[m]] + 1;
const sign = m => omega[m] % 2 ? -1 : 1;
function factors(m) {
  const fs = [];
  while (m > 1) { const p = spf[m]; fs.push(p); m /= p; }
  return fs;
}

let pointChecks = 0;
for (const x of levels) {
  // Compute integer cutoffs with small, exact products; never raise a large
  // prime to a power outside the safe-integer range.
  let r = 0, roughCut = 2;
  while ((r + 1) ** 3 <= x) r++;
  while (roughCut ** 8 < x) roughCut++;
  assert(Number.isSafeInteger((r + 1) ** 3) && Number.isSafeInteger(roughCut ** 8));
  const small = primes.filter(q => q <= r);
  const rough = m => spf[m] >= roughCut;
  const qRange = small.filter(q => q >= roughCut);
  let q2 = 0, r2 = 0, twins = 0, chen = 0, roughPrimes = 0;
  let loss2 = 0, positiveQ2 = 0, positiveR2 = 0;
  let classifiedLoss2 = 0;
  let signedBase = 0, signedDivisor = 0, triples = 0, signedSquare = 0;
  for (let m = x / 2 + 2; m <= x; m++) {
    const fs = factors(m);
    const k = small.reduce((v, q) => v + Number(m % q === 0), 0);
    const e = small.reduce((v, q) => v + Number(m % (q * q) === 0), 0);
    const b = Number(fs.length === 3 && fs[0] <= r && fs[1] > r);
    const w2 = 2 - k - b - e; // exactly 2 W_x(m)
    assert(w2 <= 2 * Number(fs.length <= 2));
    assert((1 - sign(m)) * w2 <= 4 * Number(fs.length === 1));
    assert.equal(w2 > 0, fs.length <= 2);
    assert.equal((1 - sign(m)) * Math.max(w2, 0), 4 * Number(fs.length === 1));
    pointChecks++;
    if (spf[m - 2] !== m - 2 || !rough(m)) continue;
    roughPrimes++;
    q2 += w2; r2 += sign(m) * w2;
    positiveQ2 += Math.max(w2, 0);
    positiveR2 += sign(m) * Math.max(w2, 0);
    if (fs.length >= 3 && sign(m) === -1) {
      loss2 -= w2;
      const squarefree = new Set(fs).size === fs.length;
      if (!squarefree) classifiedLoss2 -= w2;
      else if (fs.length === 3) {
        assert(k >= 1 && k <= 3);
        classifiedLoss2 += Number(k === 3);
      } else if (fs.length === 5) {
        assert(k === 4 || k === 5);
        classifiedLoss2 += k === 4 ? 2 : 3;
      } else {
        assert.equal(fs.length, 7);
        assert.equal(k, 7);
        classifiedLoss2 += 5;
      }
    }
    twins += Number(fs.length === 1); chen += Number(fs.length <= 2);
    signedBase += sign(m); signedDivisor += sign(m) * k;
    triples += b; signedSquare += sign(m) * e;
  }
  assert(q2 <= 2 * chen);
  assert(q2 - r2 <= 4 * twins);
  assert.equal(loss2, classifiedLoss2);
  assert.equal(q2 - r2, 4 * twins - 2 * loss2);
  assert.equal(positiveQ2 - positiveR2, 4 * twins);
  assert.equal(r2, 2 * signedBase - signedDivisor + triples - signedSquare);

  // Independent enumeration of actual prime-factor/cofactor pairs, checking
  // lambda(qv)=-lambda(v) including q|v and all endpoint conventions.
  let cofactorSum = 0;
  for (const q of qRange) {
    for (let v = Math.ceil((x / 2 + 2) / q); v <= Math.floor(x / q); v++) {
      const n = q * v - 2;
      if (spf[n] === n && rough(v)) cofactorSum -= sign(v);
    }
  }
  assert.equal(signedDivisor, cofactorSum);
  console.log(`x=${x} rough prime openers=${roughPrimes} Chen pairs=${chen} twins=${twins} 2Qprime=${q2} 2Rprime=${r2}; minorants and cofactor identity agree`);
  console.log(`  exact loss identity: 2L=${loss2}; positive-part weight removes the penalty and gives 4*twins=${positiveQ2 - positiveR2}`);
}
console.log(`checked ${pointChecks} integers pointwise; prime-opener sums use unit weights for exact integer comparison, not von Mangoldt weights`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/chen-benchmark-validation.js
//   invocation:  node research/chen-benchmark-validation.js
//   code-sha256: 0c2d7569f6b6b818b20b6fe82d5a3c3d1183cf00802554a1fd8cf89d5a27cd9f
//   out-sha256:  3951fb2e7891acbde408affc9817b3f213cda7efcfb433f9d4ac658068160ca0
//   body-lines:  11
//   forced:      2026-09-05, 0 of 19 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-05
//   elapsed:     0.8 s
// ============================================================================
// rational certificate: 128 left rectangles, 6 log-series terms; J < 3/8, log(3/2) > 2/5, margin > 1/40
// separate-estimate certificate: J > 1/3; (1/2)log(3/2)-J < -1/12, so component cancellation alone does not close these bounds
// x=256 rough prime openers=23 Chen pairs=16 twins=7 2Qprime=24 2Rprime=-4; minorants and cofactor identity agree
//   exact loss identity: 2L=0; positive-part weight removes the penalty and gives 4*twins=28
// x=4096 rough prime openers=255 Chen pairs=135 twins=45 2Qprime=150 2Rprime=8; minorants and cofactor identity agree
//   exact loss identity: 2L=19; positive-part weight removes the penalty and gives 4*twins=180
// x=65536 rough prime openers=1516 Chen pairs=1031 twins=355 2Qprime=1474 2Rprime=120; minorants and cofactor identity agree
//   exact loss identity: 2L=33; positive-part weight removes the penalty and gives 4*twins=1420
// x=1048576 rough prime openers=14482 Chen pairs=10172 twins=3785 2Qprime=15221 2Rprime=461; minorants and cofactor identity agree
//   exact loss identity: 2L=190; positive-part weight removes the penalty and gives 4*twins=15140
// checked 559228 integers pointwise; prime-opener sums use unit weights for exact integer comparison, not von Mangoldt weights
// ============================================================================
// READINGS.
// The rational calculation certifies the numerical sign in the classical
// benchmark. The interval enumerations check algebra and endpoints only.
// They do not estimate an asymptotic signed saving or validate a new mechanism.
