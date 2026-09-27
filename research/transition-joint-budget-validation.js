#!/usr/bin/env node
'use strict';
// Question: is the four-piece transition decomposition exact, does it leak
// outside the corner's divisor rectangle, and is the moving-sharp-cutoff
// (finite-difference) representation of T and of the four pieces correct?
// Named algebra gap tested here: the rho/h orientation, the strict transition
// endpoints, the redundancy of the upper divisor cut, and the identity
//   T(m) = (1/L) * integral_{D}^{z} G^{(S)}(m) dS/S,  G^{(S)}=sharp window (D,S].
// Finite proxy cutoffs only. No asymptotic rate, sign or norm order is tested.
const assert = require('node:assert/strict');

const X = 4096;
const ds = Array.from({ length: X + 1 }, () => []);
for (let d = 1; d <= X; d++) for (let n = d; n <= X; n += d) ds[n].push(d);
const primes = [];
for (let n = 2; n <= X; n++) if (ds[n].length === 2) primes.push(n);
const mu = Array(X + 1).fill(1), base = Array(X + 1).fill(0), expo = Array(X + 1).fill(0);
for (const p of primes) {
  for (let n = p; n <= X; n += p) mu[n] *= -1;
  for (let n = p * p; n <= X; n += p * p) mu[n] = 0;
  let e = 1;
  for (let r = p; r <= X; r *= p) { base[r] = p; expo[r] = e++; }
}
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const near = (a, b, tag) =>
  assert(Math.abs(a - b) < 1e-8 * (1 + Math.abs(a) + Math.abs(b)), `${tag}: ${a} != ${b}`);
const controls = new Set();

// beta_W(k) = sum over prime powers r|k, r>W, of Lambda(r) = log p (not log r).
const beta = (k, W) => {
  let s = 0;
  for (const r of ds[k]) if (r > W && base[r]) s += Math.log(base[r]);
  return s;
};
// Deliberately wrong weight used as a control.
const betaLogR = (k, W) => {
  let s = 0;
  for (const r of ds[k]) if (r > W && base[r]) s += Math.log(r);
  return s;
};

let fixtures = 0, powersSeen = 0, nonSquarefreeSeen = 0, evenPairFibers = 0;
let kernelFibers = 0, integralPoints = 0, minkowskiChecks = 0;

const cases = [
  { x: 2048, WL: 7, DL: 100, zL: 180, WR: 5, DR: 120, zR: 200 },
  { x: 3072, WL: 7, DL: 200, zL: 330, WR: 3, DR: 170, zR: 300 },
];

for (const c of cases) {
  const { x, WL, DL, zL, WR, DR, zR } = c;
  const DpL = Math.floor(x / (WL + 1));           // floor(x/(W+1))
  const DpR = Math.floor((x - 2) / (WR + 1));     // floor((x-2)/(W+1)), shifted endpoint
  assert(DL < zL && zL < DpL && DR < zR && zR < DpR);
  const LL = Math.log(zL / DL), LR = Math.log(zR / DR);

  // rho on the transition band, h = 1 - rho extended by 0 below D and 1 above z.
  const rho = (d, D, z) => (d <= D ? 1 : d >= z ? 0 : Math.log(z / d) / Math.log(z / D));
  const h = (d, D, z) => 1 - rho(d, D, z);

  // Sharp coefficient with lower cut S and the upper cut Dp; the smoothed and
  // transition coefficients carry no upper cut at all (redundancy is asserted).
  const sharp = (m, S, Dp, W) => {
    let s = 0;
    for (const d of ds[m]) if (d > S && d <= Dp && mu[d]) s += mu[d] * beta(m / d, W);
    return s;
  };
  const smooth = (m, D, z, W) => {
    let s = 0;
    for (const d of ds[m]) if (mu[d]) { const w = h(d, D, z); if (w) s += mu[d] * w * beta(m / d, W); }
    return s;
  };
  const trans = (m, D, z, W) => {
    let s = 0;
    for (const d of ds[m]) if (d > D && d < z && mu[d]) s += mu[d] * rho(d, D, z) * beta(m / d, W);
    return s;
  };
  // Sharp coefficient of the short window (D,S], used by the moving-cutoff route.
  const win = (m, D, S, W) => {
    let s = 0;
    for (const d of ds[m]) if (d > D && d <= S && mu[d]) s += mu[d] * beta(m / d, W);
    return s;
  };

  const lo = x / 2;
  const ns = [];
  for (let n = Math.floor(lo) + 1; n <= x; n++) ns.push(n);

  // (1) Upper divisor cut is redundant on the actual intervals.
  for (const n of ns) {
    for (const d of ds[n]) if (d > DpL) assert(beta(n / d, WL) === 0, 'left upper cut not redundant');
    for (const d of ds[n - 2]) if (d > DpR) assert(beta((n - 2) / d, WR) === 0, 'right upper cut not redundant');
  }
  // Control: off the interval the cut is not redundant.
  {
    let witness = 0;
    for (let n = x + 1; n <= Math.min(X, 2 * x); n++)
      for (const d of ds[n]) if (d > DpL && beta(n / d, WL) !== 0) witness++;
    assert(witness > 0, 'upper-cut hypothesis vacuous');
    controls.add('upper divisor cut off the interval');
  }

  // (2) Pointwise splitting C = T + Ctilde, and support of both in (D, Dp].
  const CL = [], tCL = [], TL = [], CR = [], tCR = [], TR = [];
  for (const n of ns) {
    CL[n] = sharp(n, DL, DpL, WL);
    tCL[n] = smooth(n, DL, zL, WL);
    TL[n] = trans(n, DL, zL, WL);
    near(CL[n], TL[n] + tCL[n], 'left split');
    const m = n - 2;
    CR[m] = sharp(m, DR, DpR, WR);
    tCR[m] = smooth(m, DR, zR, WR);
    TR[m] = trans(m, DR, zR, WR);
    near(CR[m], TR[m] + tCR[m], 'right split');
    if (mu[n] === 0 || mu[m] === 0) nonSquarefreeSeen++;
    for (const d of ds[n]) if (d > DL && d <= DpL && mu[d] && base[n / d] && expo[n / d] > 1 && n / d > WL) powersSeen++;
    // No divisor at or below the lower cut carries weight in either piece.
    for (const d of ds[n]) if (d <= DL) assert(h(d, DL, zL) === 0 && rho(d, DL, zL) === 1 && !(d > DL), 'leak below cut');
  }
  // Control: setting h identically 1 (no lower cut) breaks the split.
  {
    const n = ns.find(v => CL[v] !== 0);
    let bad = 0;
    for (const d of ds[n]) if (mu[d]) bad += mu[d] * beta(n / d, WL);
    assert(Math.abs(bad - tCL[n]) > 1e-9, 'lower-cut control inactive');
    controls.add('smoothed weight without the lower cut');
  }
  // Control: swapping rho and h destroys the split.
  {
    const n = ns.find(v => TL[v] !== 0);
    let swapped = 0;
    for (const d of ds[n]) if (d > DL && d < zL && mu[d]) swapped += mu[d] * h(d, DL, zL) * beta(n / d, WL);
    assert(Math.abs(swapped - TL[n]) > 1e-9, 'rho/h orientation control inactive');
    controls.add('rho and h exchanged');
  }
  // Control: log r in place of Lambda(r) changes the coefficient.
  {
    let seen = 0;
    for (const n of ns) {
      let alt = 0;
      for (const d of ds[n]) if (d > DL && d <= DpL && mu[d]) alt += mu[d] * betaLogR(n / d, WL);
      if (Math.abs(alt - CL[n]) > 1e-9) seen++;
    }
    assert(seen > 0, 'prime-power weight control inactive');
    controls.add('log r in place of Lambda');
  }

  // (3) The four signed sums and the exact decomposition.
  let R00 = 0, R10 = 0, R01 = 0, R11 = 0, Rcor = 0;
  for (const n of ns) {
    const m = n - 2;
    R00 += tCL[n] * tCR[m]; R10 += TL[n] * tCR[m];
    R01 += tCL[n] * TR[m]; R11 += TL[n] * TR[m];
    Rcor += CL[n] * CR[m];
  }
  near(Rcor, R00 + R10 + R01 + R11, 'four-piece decomposition');
  // Control: the unshifted product is a different number.
  {
    let unshifted = 0;
    for (const n of ns) if (CR[n] !== undefined) unshifted += CL[n] * CR[n];
    assert(Math.abs(unshifted - Rcor) > 1e-9, 'shift control inactive');
    controls.add('right factor at n instead of n-2');
  }

  // (4) Kernel (E1): rebuild R11 from the determinant-2 fibers, both gcd branches.
  let kernel = 0;
  for (let d = DL + 1; d < zL; d++) {
    if (!mu[d]) continue;
    const rd = rho(d, DL, zL);
    for (let e = DR + 1; e < zR; e++) {
      if (!mu[e]) continue;
      const g = gcd(d, e);
      if (2 % g !== 0) continue;
      if (g === 2) evenPairFibers++;
      const re = rho(e, DR, zR);
      for (let k = Math.floor(lo / d) + 1; d * k <= x; k++) {
        const n = d * k, m = n - 2;
        if (m % e) continue;
        const v = m / e;
        const bk = beta(k, WL), bv = beta(v, WR);
        if (!bk || !bv) continue;
        kernel += mu[d] * mu[e] * rd * re * bk * bv;
        kernelFibers++;
      }
    }
  }
  near(kernel, R11, 'kernel (E1)');
  // Control: dropping the (d,e)|2 compatibility test admits impossible pairs.
  {
    let incompatible = 0;
    for (let d = DL + 1; d < zL; d++) for (let e = DR + 1; e < zR; e++) if (2 % gcd(d, e) !== 0) incompatible++;
    assert(incompatible > 0, 'compatibility control inactive');
    controls.add('(d,e)|2 compatibility dropped');
  }

  // (5) Moving sharp cutoff: T is the logarithmic average of window coefficients.
  // The integrand is constant on [S, S+1), so the dS/S integral is exact.
  const segs = [];
  for (let s = DL; s < zL; s++) {
    const a = Math.max(s, DL), b = Math.min(s + 1, zL);
    if (b > a) segs.push([s, Math.log(b / a)]);
  }
  integralPoints += segs.length;
  for (const n of ns.slice(0, 200)) {
    let acc = 0;
    for (const [s, w] of segs) acc += win(n, DL, s, WL) * w;
    near(acc / LL, TL[n], 'moving-cutoff representation of T');
  }
  // Control: using the complementary window (S, z] instead of (D, S].
  {
    const n = ns.find(v => TL[v] !== 0);
    let acc = 0;
    for (const [s, w] of segs) {
      let g = 0;
      for (const d of ds[n]) if (d > s && d < zL && mu[d]) g += mu[d] * beta(n / d, WL);
      acc += g * w;
    }
    assert(Math.abs(acc / LL - TL[n]) > 1e-9, 'window orientation control inactive');
    controls.add('complementary cutoff window');
  }

  // (6) The four pieces as differences of averages of one two-parameter sum.
  // Phi(S,T) = sum_n C^{(S)}(n) C'^{(T)}(n-2); averages taken with dS/(S L).
  let A_S = 0;   // <Phi(S, DR)>_S  should equal R00 + R01
  let A_SS = 0;  // <<Phi(S,T)>>    should equal R00
  for (const [s, w] of segs) {
    let phi = 0, phiSm = 0;
    for (const n of ns) {
      const cs = sharp(n, s, DpL, WL);
      phi += cs * CR[n - 2];
      phiSm += cs * tCR[n - 2];
    }
    A_S += phi * w; A_SS += phiSm * w;
  }
  near(A_S / LL, R00 + R01, 'left cutoff average');
  near(A_SS / LL, R00, 'double cutoff average');
  let A_T = 0;   // <Phi(DL, T)>_T  should equal R00 + R10
  const segsR = [];
  for (let s = DR; s < zR; s++) {
    const a = Math.max(s, DR), b = Math.min(s + 1, zR);
    if (b > a) segsR.push([s, Math.log(b / a)]);
  }
  integralPoints += segsR.length;
  for (const [s, w] of segsR) {
    let phi = 0;
    for (const n of ns) phi += CL[n] * sharp(n - 2, s, DpR, WR);
    A_T += phi * w;
  }
  near(A_T / LR, R00 + R10, 'right cutoff average');
  // The mixed second difference reproduces R11 exactly.
  near(Rcor - A_S / LL - A_T / LR + A_SS / LL, R11, 'mixed second difference');

  // (7) Direction of the Minkowski step used in the note's no-go.
  let avgNorm = 0, normT = 0;
  for (const n of ns) normT += TL[n] * TL[n];
  normT = Math.sqrt(normT);
  for (const [s, w] of segs) {
    let q = 0;
    for (const n of ns) { const g = win(n, DL, s, WL); q += g * g; }
    avgNorm += Math.sqrt(q) * w;
  }
  avgNorm /= LL;
  assert(avgNorm >= normT - 1e-9, 'Minkowski direction violated');
  minkowskiChecks++;
  // Control: the reverse inequality is not an identity here.
  assert(avgNorm > normT + 1e-9, 'Minkowski slack control inactive');
  controls.add('Minkowski inequality is strict here');

  fixtures++;
}

assert(powersSeen && nonSquarefreeSeen && evenPairFibers);
const required = ['upper divisor cut off the interval', 'smoothed weight without the lower cut',
  'rho and h exchanged', 'log r in place of Lambda', 'right factor at n instead of n-2',
  '(d,e)|2 compatibility dropped', 'complementary cutoff window',
  'Minkowski inequality is strict here'];
for (const key of required) assert(controls.has(key), `inactive control: ${key}`);

console.log('Transition joint-budget finite identities PASS');
console.log(`Fixtures: ${fixtures}; kernel fibers: ${kernelFibers}; even divisor pairs entered: ${evenPairFibers}`);
console.log(`Proper-prime-power divisor terms: ${powersSeen}; non-squarefree arguments: ${nonSquarefreeSeen}`);
console.log(`Cutoff-integral breakpoints: ${integralPoints}; Minkowski direction checks: ${minkowskiChecks}`);
console.log(`Active controls (${required.length}): ${required.join('; ')}`);
console.log('No asymptotic norm order, sign, saving or twin margin is numerically certified.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/transition-joint-budget-validation.js
//   invocation:  node research/transition-joint-budget-validation.js
//   code-sha256: a037bf524b7a053dd165393546e52ce763267b7f2105cb048a552fd4a7088a1a
//   out-sha256:  6eb0568497db74c046a392bdb364a3707f5ff475b4e0d7b968d007f30513e4a5
//   body-lines:  6
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.2 s
// ============================================================================
// Transition joint-budget finite identities PASS
// Fixtures: 2; kernel fibers: 105; even divisor pairs entered: 826
// Proper-prime-power divisor terms: 363; non-squarefree arguments: 1738
// Cutoff-integral breakpoints: 420; Minkowski direction checks: 2
// Active controls (8): upper divisor cut off the interval; smoothed weight without the lower cut; rho and h exchanged; log r in place of Lambda; right factor at n instead of n-2; (d,e)|2 compatibility dropped; complementary cutoff window; Minkowski inequality is strict here
// No asymptotic norm order, sign, saving or twin margin is numerically certified.
// ============================================================================
// READINGS
// Exact finite algebra with proxy cutoffs and active failed-shortcut controls.
// The four-piece split, the corner kernel with both gcd branches, the
// moving-sharp-cutoff representation of T and the mixed second difference of
// the two-parameter sharp correlation all reproduce exactly. Nothing here
// tests an asymptotic norm order, a sign, a saving or the twin margin.
