#!/usr/bin/env node
'use strict';
// ============================================================================
// fold-arithmetic-bridge-validation.js  (lane E, 2026-09-08)
// ----------------------------------------------------------------------------
// Owning note: research/fold-arithmetic-bridge.md (pre-registration in its §0,
// written before this file existed).
//
// SEC 1  Exact finite check of the two-sided parity identity on dyadic
//        intervals (X, 2X], y = floor(X^(1/u)):
//          S  = #{n : n(n+2) has no prime factor <= y}
//          A  = sum lambda(n), B = sum lambda(n+2), C = sum lambda(n)lambda(n+2)
//          T  = twin primes, P_odd = #{Omega(n) odd}, P'_odd = #{Omega(n+2) odd}
//          N_odd3 = #{both Omega odd, max >= 3}
//        Asserted exactly (BigInt):  4 T S = 4 P_odd P'_odd + (C S - A B) - 4 N_odd3 S.
//        Finite readings only; no asymptotic claim.
// SEC 2  Sieve-function numerics: Buchstab omega, the rough-P_k densities
//        D_k(u), linear-sieve F_1/f_1 (Rosser-Iwaniec), Ankeny-Onishi sigma_2
//        for a valid dimension-2 upper function F_2 = 1/sigma_2.
//        Controls: sum_k D_k(u) = u*omega(u); f_1(2)=0, F_1(2)=e^gamma,
//        sigma_2(2)=e^(-2gamma)/2; D_3 by recursion vs direct 2-D quadrature.
// SEC 3  The two pre-registered ratios:
//          Q_cov(u)  = f_1(u/2)^2 rho_odd^2 / (2 e^-gamma u F_1(u/2) F_2(u) (rho_odd-1))
//          c*_best(u)= rho_odd/(rho_odd-1),  c*_real(u) = f_1(u/2)^2 c*_best/F_2(u)
//          c_eff(u)  = weighted mean over the odd-composite contamination mass of
//                      the best classical pair constant
//                      c_pair(tau) = min(8/tau, 4 tau/(2 tau-1)) (tau>1/2), 8/tau (tau<=1/2);
//                      k=3 by 2-D quadrature, k=5,7 by seeded Monte Carlo, k>=9 at the floor 4,
//                      tau = exponent of the largest prime factor of n+2.
//        Sufficient test is Q_cov>1 (covariance) or c*_real>c_eff (marginal).
// ============================================================================

const assert = require('assert');
const GAMMA = 0.5772156649015329;
const EG = Math.exp(GAMMA);

// ---------------------------------------------------------------- SEC 1 ----
function spfSieve(N) {
  const spf = new Int32Array(N + 1);
  for (let i = 2; i <= N; i++) if (spf[i] === 0) {
    for (let j = i; j <= N; j += i) if (spf[j] === 0) spf[j] = i;
  }
  return spf;
}
function omegaBig(n, spf) { let k = 0; while (n > 1) { n = n / spf[n]; k++; } return k; }

console.log('SEC1 exact two-sided parity identity on (X,2X], y=floor(X^(1/u))');
const XS = [1 << 16, 1 << 18, 1 << 20, 1 << 22, 1 << 24];
const US1 = [4.5, 6];
const t0 = Date.now();
const spf = spfSieve(2 * XS[XS.length - 1] + 2);
for (const X of XS) for (const u of US1) {
  const y = Math.floor(Math.pow(X, 1 / u));
  let S = 0, A = 0, B = 0, C = 0, T = 0, Po = 0, Po2 = 0, N3 = 0, P1 = 0;
  for (let n = X + 1; n <= 2 * X; n++) {
    if (spf[n] <= y || spf[n + 2] <= y) continue;
    const o1 = omegaBig(n, spf), o2 = omegaBig(n + 2, spf);
    const l1 = (o1 & 1) ? -1 : 1, l2 = (o2 & 1) ? -1 : 1;
    S++; A += l1; B += l2; C += l1 * l2;
    if (o1 & 1) Po++;
    if (o2 & 1) Po2++;
    if (o1 === 1) P1++;
    if (o1 === 1 && o2 === 1) T++;
    if ((o1 & 1) && (o2 & 1) && Math.max(o1, o2) >= 3) N3++;
  }
  const bS = BigInt(S), bA = BigInt(A), bB = BigInt(B), bC = BigInt(C);
  const lhs = 4n * BigInt(T) * bS;
  const rhs = 4n * BigInt(Po) * BigInt(Po2) + (bC * bS - bA * bB) - 4n * BigInt(N3) * bS;
  assert.strictEqual(lhs, rhs, 'two-sided identity');
  // review-0905's four-sign identity 4T = S-A-B+C needs y >= (2X+2)^(1/3); otherwise both-odd = T + N_odd3
  assert.strictEqual(bS - bA - bB + bC, 4n * (BigInt(T) + BigInt(N3)), 'both-odd identity');
  const cov = C / S - (A / S) * (B / S);
  console.log(`X=2^${Math.log2(X)} u=${u} y=${y} S=${S} T=${T} P1/S=${(P1 / S).toFixed(4)} Podd/S=${(Po / S).toFixed(4)} Nodd3/S=${(N3 / S).toFixed(4)} cov=${cov.toFixed(4)} identity=exact`);
}
console.log(`SEC1 done in ${((Date.now() - t0) / 1000).toFixed(1)} s; both-odd and two-sided identities exact on all ${XS.length * US1.length} intervals`);

// ---------------------------------------------------------------- SEC 2 ----
// grid on u in [0, UMAX], step H; all functions stored on this grid
const H = 0.002, UMAX = 64;
const NG = Math.round(UMAX / H) + 1;
const ug = (i) => i * H;
function interp(arr, u) {
  if (u <= 0) return arr[0];
  const x = u / H; const i = Math.floor(x);
  if (i >= NG - 1) return arr[NG - 1];
  const f = x - i; return arr[i] * (1 - f) + arr[i + 1] * f;
}
// cumulative trapezoid of g(u) from u0 to grid points
function cumtrap(g, i0) {
  const out = new Float64Array(NG);
  for (let i = i0 + 1; i < NG; i++) out[i] = out[i - 1] + 0.5 * H * (g(ug(i - 1)) + g(ug(i)));
  return out;
}

// Buchstab omega: omega(u)=1/u on [1,2]; (u omega)' = omega(u-1)
const om = new Float64Array(NG);
for (let i = 0; i < NG; i++) { const u = ug(i); om[i] = u < 1 ? 0 : (u <= 2 ? 1 / u : 0); }
{
  const i2 = Math.round(2 / H);
  let acc = 1; // u*omega(u) at u=2
  for (let i = i2 + 1; i < NG; i++) {
    acc += 0.5 * H * (om[Math.round((ug(i - 1) - 1) / H)] + om[Math.round((ug(i) - 1) / H)]);
    om[i] = acc / ug(i);
  }
}
// D_k(u): D_1 = 1 (u>=1); D_k(u) = int_{k-1}^{u-1} D_{k-1}(v) dv/v
const KMAX = 30;
const D = [];
D[1] = new Float64Array(NG); for (let i = 0; i < NG; i++) D[1][i] = ug(i) >= 1 ? 1 : 0;
for (let k = 2; k <= KMAX; k++) {
  D[k] = new Float64Array(NG);
  const ik = Math.round(k / H);
  let acc = 0;
  for (let i = ik + 1; i < NG; i++) {
    const va = ug(i - 1) - 1, vb = ug(i) - 1;
    acc += 0.5 * H * (interp(D[k - 1], va) / va + interp(D[k - 1], vb) / vb);
    D[k][i] = acc;
  }
}
// direct 2-D quadrature for D_3 (control) and for the c_pair-weighted K_3
function cpair(tau) { return tau > 0.5 ? Math.min(8 / tau, 4 * tau / (2 * tau - 1)) : 8 / tau; }
function direct3(u, weight) {
  // t1 in (1/u, 1/3], t2 in [t1, (1-t1)/2], tau = 1-t1-t2 >= t2
  const n = 600; let s = 0;
  const a = 1 / u, b = 1 / 3; if (b <= a) return 0;
  const h1 = (b - a) / n;
  for (let i = 0; i < n; i++) {
    const t1 = a + (i + 0.5) * h1;
    const lo = t1, hi = (1 - t1) / 2; if (hi <= lo) continue;
    const h2 = (hi - lo) / n;
    for (let j = 0; j < n; j++) {
      const t2 = lo + (j + 0.5) * h2, tau = 1 - t1 - t2;
      s += weight(tau) / (t1 * t2 * tau) * h1 * h2;
    }
  }
  return s;
}
// Monte Carlo on the ordered simplex for k>=5 with weight w(tau); seeded LCG
let seed = 123456789;
function rnd() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
function mcK(k, u, weight, samples) {
  // sample t_1..t_{k-1} i.i.d. uniform on (1/u, 1/2), sort, require sum<=1 and tau=1-sum >= t_{k-1}
  const a = 1 / u, b = 0.5; if (b <= a) return 0;
  const vol = Math.pow(b - a, k - 1) / factorial(k - 1); // ordered region volume
  let acc = 0; const t = new Float64Array(k - 1);
  for (let s = 0; s < samples; s++) {
    let sum = 0;
    for (let i = 0; i < k - 1; i++) { t[i] = a + (b - a) * rnd(); sum += t[i]; }
    const tau = 1 - sum; let mx = 0; for (let i = 0; i < k - 1; i++) if (t[i] > mx) mx = t[i];
    if (tau < mx) continue;
    let prod = tau; for (let i = 0; i < k - 1; i++) prod *= t[i];
    acc += weight(tau) / prod;
  }
  return vol * acc / samples;
}
function factorial(n) { let f = 1; for (let i = 2; i <= n; i++) f *= i; return f; }

// linear sieve F_1, f_1: F=2e^g/s on [1,3], f=2e^g log(s-1)/s on [2,4]; (sF)'=f(s-1), (sf)'=F(s-1)
const F1 = new Float64Array(NG), f1 = new Float64Array(NG);
for (let i = 0; i < NG; i++) {
  const s = ug(i);
  F1[i] = s < 1 ? (s > 0 ? 2 * EG / s : 0) : (s <= 3 ? 2 * EG / s : 0);
  f1[i] = s <= 2 ? 0 : (s <= 4 ? 2 * EG * Math.log(s - 1) / s : 0);
}
{
  // interleaved in increasing s: F on s>3 needs f at s-1 (closed form to 4, computed beyond),
  // f on s>4 needs F at s-1 (closed form to 3, computed beyond); each value used is already final
  const i3 = Math.round(3 / H), i4 = Math.round(4 / H);
  let accF = 3 * F1[i3], accf = 4 * f1[i4];
  for (let i = i3 + 1; i < NG; i++) {
    const ia = Math.round((ug(i - 1) - 1) / H), ib = Math.round((ug(i) - 1) / H);
    accF += 0.5 * H * (f1[ia] + f1[ib]); F1[i] = accF / ug(i);
    if (i > i4) { accf += 0.5 * H * (F1[ia] + F1[ib]); f1[i] = accf / ug(i); }
  }
}
// Ankeny-Onishi sigma_2: sigma=u^2/(8e^{2g}) on (0,2]; (u^-2 sigma)' = -2 u^-3 sigma(u-2)
const sig2 = new Float64Array(NG);
for (let i = 0; i < NG; i++) { const u = ug(i); sig2[i] = u <= 2 ? u * u / (8 * EG * EG) : 0; }
{
  const i2 = Math.round(2 / H);
  let acc = sig2[i2] / 4;
  for (let i = i2 + 1; i < NG; i++) {
    const ua = ug(i - 1), ub = ug(i);
    acc -= 0.5 * H * (2 * Math.pow(ua, -3) * sig2[Math.round((ua - 2) / H)] + 2 * Math.pow(ub, -3) * sig2[Math.round((ub - 2) / H)]);
    sig2[i] = acc * ub * ub;
  }
}
console.log('SEC2 sieve functions and controls');
const c_f12 = interp(f1, 2), c_F12 = interp(F1, 2), c_s22 = interp(sig2, 2);
console.log(`control f_1(2)=${c_f12.toFixed(6)} (0) F_1(2)=${c_F12.toFixed(6)} (e^gamma=${EG.toFixed(6)}) sigma_2(2)=${c_s22.toFixed(6)} (e^-2gamma/2=${(1 / (2 * EG * EG)).toFixed(6)})`);
assert(Math.abs(c_f12) < 1e-9 && Math.abs(c_F12 - EG) < 1e-6 && Math.abs(c_s22 - 1 / (2 * EG * EG)) < 1e-9);
console.log(`control omega(2)=${interp(om, 2).toFixed(6)} (0.5) omega(3)=${interp(om, 3).toFixed(6)} ((1+ln2)/3=${((1 + Math.LN2) / 3).toFixed(6)}) omega(60)=${interp(om, 60).toFixed(6)} (e^-gamma=${(1 / EG).toFixed(6)})`);
console.log(`control F_1(s)>=1>=f_1(s) at s=6,10,20: ${[6,10,20].map(v=>interp(F1,v).toFixed(5)+'/'+interp(f1,v).toFixed(5)).join(' ')}`);
console.log(`control D_2(3)=${interp(D[2], 3).toFixed(6)} (ln2=${Math.LN2.toFixed(6)}) f_1(4)=${interp(f1, 4).toFixed(4)} F_1(3)=${interp(F1, 3).toFixed(4)} F_1(6)=${interp(F1, 6).toFixed(4)} sigma_2(6)=${interp(sig2, 6).toFixed(4)} sigma_2(20)=${interp(sig2, 20).toFixed(4)}`);

// ---------------------------------------------------------------- SEC 3 ----
console.log('SEC3 the two ratios; sufficient test is Q_cov>1 or c*_real>c_eff');
console.log('u | massErr | rho_odd | P1|R | Podd|R | f1(u/2) | F1(u/2) | F2=1/sig2 | Q_cov(F2) Q_cov(F2=1) | c*_best c*_real c_eff | verdict');
const US = [4.1, 4.2, 4.3, 4.5, 5, 5.5, 6, 7, 8, 10, 12, 15, 20, 30, 45, 60];
let anyPass = false, maxQ = 0, maxQfloor = 0, maxRatio = 0;
for (const u of US) {
  let total = 0, rhoOdd = 0, contamHL = 0, contamSieve = 0;
  for (let k = 1; k <= KMAX; k++) {
    const dk = interp(D[k], u); total += dk;
    if (k % 2 === 1) rhoOdd += dk;
  }
  const massErr = total - u * interp(om, u);
  // contamination: odd k>=3, HL weight (= D_k) and c_pair-weighted K_k
  for (let k = 3; k <= KMAX; k += 2) {
    const dk = interp(D[k], u); if (dk < 1e-12) continue;
    contamHL += dk;
    if (k === 3) contamSieve += direct3(u, cpair);
    else if (k <= 7) contamSieve += mcK(k, u, cpair, 400000);
    else contamSieve += 4 * dk; // k>=9: c_pair(tau)>=4 everywhere; a floor, conservative for the negative
  }
  const d3rec = interp(D[3], u), d3dir = direct3(u, () => 1);
  const fl = interp(f1, u / 2), Fl = interp(F1, u / 2), F2 = 1 / interp(sig2, u);
  const Qcov = fl * fl * rhoOdd * rhoOdd / (2 * u * Fl * F2 * (rhoOdd - 1) / EG);
  const Qcov1 = Qcov * F2;
  const cBest = rhoOdd / (rhoOdd - 1), cReal = fl * fl * cBest / F2, cEff = contamSieve / contamHL;
  const pass = Qcov1 > 1 || cReal > cEff; anyPass = anyPass || pass;
  maxQ = Math.max(maxQ, Qcov); maxQfloor = Math.max(maxQfloor, Qcov1); maxRatio = Math.max(maxRatio, cReal / cEff);
  console.log(`${u} | ${massErr.toExponential(1)} | ${rhoOdd.toFixed(4)} | ${(1 / total).toFixed(4)} | ${(rhoOdd / total).toFixed(4)} | ${fl.toFixed(4)} | ${Fl.toFixed(4)} | ${F2.toFixed(4)} | ${Qcov.toFixed(4)} ${Qcov1.toFixed(4)} | ${cBest.toFixed(3)} ${cReal.toFixed(3)} ${cEff.toFixed(2)} | ${pass ? 'CLOSES' : 'fails'}${u === 4.5 || u === 6 ? ` D3 rec/dir=${(d3rec / d3dir).toFixed(4)}` : ''}`);
}
console.log(`SEC3 summary: max Q_cov=${maxQ.toFixed(4)} (valid F_2), max Q_cov at floor F_2=1: ${maxQfloor.toFixed(4)}; max c*_real/c_eff=${maxRatio.toFixed(4)}; any listed u passes: ${anyPass}`);
console.log(`asymptote check Q_cov(60)*4=${(4 * (function () { const u = 60; let ro = 0, tot = 0; for (let k = 1; k <= KMAX; k++) { const d = interp(D[k], u); tot += d; if (k % 2) ro += d; } const fl = interp(f1, 30), Fl = interp(F1, 30), F2 = 1 / interp(sig2, 60); return fl * fl * ro * ro / (2 * u * Fl * F2 * (ro - 1) / EG); })()).toFixed(3)} (limit 1)`);
console.log('All pre-registered checks evaluated. Finite identities exact; ratio table is numerical evaluation of sieve functions, not a theorem about primes.');

// ---------------------------------------------------------------- SEC 4 ----
// Added 2026-09-08 (second dispatch, lane E source check; owning note section 3a-4a).
// (a) Fine scan of the same numerical model over every grid point u in (4, 64]:
//     Q_cov with the note's F_2 and at the floor F_2 = 1, and c*_real. Measurements.
// (b) The elementary all-depth bounds of note section 4a, evaluated piecewise:
//       Q_cov(u)   <= f_1(u/2)^2 [e^gamma/4 + e^gamma (1 + 1/D_3(u)) / (2u)]
//       c*_real(u) <= f_1(u/2)^2 (1 + 1/D_3(u))
//     using f_1 <= 1 <= F_1, F_2 >= 1, rho_odd >= 1 + D_3, rho_odd < u/2 (from
//     D_k(u) <= log^(k-1)(u-1)/(k-1)!), f_1 increasing on [2,4] with its closed form,
//     and D_3 increasing. D_3 lower bounds: the integral bound
//     ((u-2)log(u-2)-(u-3))/(u-1), or a minimum-endpoint Riemann sum of the unimodal
//     integrand log(v-1)/v (a lower bound up to double-precision rounding).
//     The corrected contamination constant is c_eff = 4 (note section 3a); the
//     marginal test needs c*_real > 4, the covariance test needs Q_cov > 1.
// (c) Grid controls: rho_odd <= (u-1)/2 + 1/(2(u-1)) and rho_odd >= 1 + D_3 at every
//     grid point; the analytic bound dominates the grid value at every grid point.
console.log('SEC4 fine scan and the piecewise all-depth bounds (added 2026-09-08)');
function f1closed(s) { assert(s >= 2 && s <= 4); return 2 * EG * Math.log(s - 1) / s; }
function D3formula(u) { return ((u - 2) * Math.log(u - 2) - (u - 3)) / (u - 1); }
function D3lowerSum(u, h) {
  const g = (v) => Math.log(v - 1) / v; // unimodal on [2, infinity): min of endpoints bounds below on each cell
  let s = 0, a = 2;
  while (a < u - 1 - 1e-12) { const b = Math.min(a + h, u - 1); s += Math.min(g(a), g(b)) * (b - a); a = b; }
  return s;
}
const pieces = [
  { lo: 4, hi: 4.4, f1sq: f1closed(2.2) ** 2, d3: D3formula(4), d3how: 'formula at 4' },
  { lo: 4.4, hi: 4.8, f1sq: f1closed(2.4) ** 2, d3: D3formula(4.4), d3how: 'formula at 4.4' },
  { lo: 4.8, hi: 6, f1sq: f1closed(3) ** 2, d3: D3lowerSum(4.8, 0.01), d3how: 'lower sum at 4.8' },
  { lo: 6, hi: 8, f1sq: f1closed(4) ** 2, d3: D3lowerSum(6, 0.01), d3how: 'lower sum at 6' },
  { lo: 8, hi: Infinity, f1sq: 1, d3: D3lowerSum(8, 0.01), d3how: 'lower sum at 8' },
];
let allPiecesOK = true;
for (const P of pieces) {
  P.Qb = P.f1sq * (EG / 4 + EG * (1 + 1 / P.d3) / (2 * P.lo));
  P.cb = P.f1sq * (1 + 1 / P.d3);
  const ok = P.Qb < 1 && P.cb < 4; allPiecesOK = allPiecesOK && ok;
  console.log(`piece (${P.lo},${P.hi}]: f1(hi/2)^2<=${P.f1sq.toFixed(4)} D3>=${P.d3.toFixed(4)} (${P.d3how}) => Q_cov<=${P.Qb.toFixed(4)} c*_real<=${P.cb.toFixed(4)} ${ok ? 'both tests fail on the piece' : 'BOUND INSUFFICIENT'}`);
}
assert(allPiecesOK, 'piecewise bounds');
// fine scan
let mQ = 0, mQ1 = 0, mC = 0, uQ = 0, uQ1 = 0, uC = 0, viol = 0, dom = 0, over2 = 0, npts = 0, sieveViol = 0;
for (let i = Math.round(4 / H) + 1; i < NG; i++) {
  const u = ug(i); npts++;
  let ro = 0; for (let k = 1; k <= KMAX; k += 2) ro += D[k][i];
  const d3 = D[3][i];
  if (ro > (u - 1) / 2 + 1 / (2 * (u - 1)) + 1e-9 || ro < 1 + d3 - 1e-9) viol++;
  const fl = interp(f1, u / 2), Fl = interp(F1, u / 2), F2 = 1 / interp(sig2, u);
  if (fl > 1 + 1e-6 || Fl < 1 - 1e-6 || F2 < 1 - 1e-6) sieveViol++; // grid discretisation tolerance; f_1<=1<=F_1 is a theorem, not a grid fact
  const Q1 = fl * fl * ro * ro / (2 * u * Fl * (ro - 1) / EG), Q = Q1 / F2;
  const cR = fl * fl * (ro / (ro - 1)) / F2;
  if (Q > mQ) { mQ = Q; uQ = u; } if (Q1 > mQ1) { mQ1 = Q1; uQ1 = u; } if (cR > mC) { mC = cR; uC = u; }
  if (cR >= 2) over2++;
  const P = pieces.find((p) => u > p.lo && u <= p.hi);
  if (!(Q1 <= P.Qb + 1e-9 && cR <= P.cb + 1e-9)) dom++;
}
console.log(`fine scan over ${npts} grid points in (4,64]: max Q_cov(F_2)=${mQ.toFixed(4)} at u=${uQ.toFixed(3)}; max Q_cov(F_2=1)=${mQ1.toFixed(4)} at u=${uQ1.toFixed(3)}; max c*_real=${mC.toFixed(4)} at u=${uC.toFixed(3)}; grid points with c*_real>=2: ${over2}`);
console.log(`grid controls: rho_odd bound violations=${viol}; f_1<=1<=F_1 and F_2>=1 violations beyond 1e-6=${sieveViol}; grid points where the piecewise analytic bound fails to dominate=${dom}`);
assert(viol === 0 && dom === 0 && sieveViol === 0, 'grid controls');
console.log(`corrected marginal test with c_eff=4: max c*_real/4=${(mC / 4).toFixed(4)} (fails at every grid point); covariance test max Q_cov(F_2=1)=${mQ1.toFixed(4)} (fails at every grid point)`);
console.log('SEC4 done: floating-point piecewise bounds and model scan; directed rational certificates are in research-round-validation.js.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/fold-arithmetic-bridge-validation.js
//   invocation:  node research/fold-arithmetic-bridge-validation.js
//   code-sha256: 71818b6767f705137a1316123636871f909e23c5f42e14b87b40ca1d80b355a9
//   out-sha256:  15a767cc8cc9accace2f9678f6f14b8c69609fe6ae88dec5138e076ca549b07a
//   body-lines:  48
//   forced:      2026-09-09, 0 of 253 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-09
//   elapsed:     1.2 s
// ============================================================================
// SEC1 exact two-sided parity identity on (X,2X], y=floor(X^(1/u))
// X=2^16 u=4.5 y=11 S=3828 T=666 P1/S=0.4180 Podd/S=0.5185 Nodd3/S=0.1001 cov=0.0103 identity=exact
// X=2^16 u=6 y=6 S=6554 T=666 P1/S=0.3261 Podd/S=0.5070 Nodd3/S=0.1596 cov=0.0178 identity=exact
// X=2^18 u=4.5 y=15 S=12962 T=2071 P1/S=0.4045 Podd/S=0.5116 Nodd3/S=0.1019 cov=-0.0010 identity=exact
// X=2^18 u=6 y=7 S=18723 T=2071 P1/S=0.3395 Podd/S=0.5059 Nodd3/S=0.1449 cov=-0.0046 identity=exact
// X=2^20 u=4.5 y=21 S=40930 T=6965 P1/S=0.4115 Podd/S=0.5124 Nodd3/S=0.0943 cov=0.0098 identity=exact
// X=2^20 u=6 y=10 S=74897 T=6965 P1/S=0.3080 Podd/S=0.5053 Nodd3/S=0.1631 cov=0.0077 identity=exact
// X=2^22 u=4.5 y=29 S=139218 T=22643 P1/S=0.4051 Podd/S=0.5090 Nodd3/S=0.0960 cov=0.0016 identity=exact
// X=2^22 u=6 y=12 S=245123 T=22643 P1/S=0.3078 Podd/S=0.5022 Nodd3/S=0.1600 cov=0.0011 identity=exact
// X=2^24 u=4.5 y=40 S=492701 T=76371 P1/S=0.3951 Podd/S=0.5063 Nodd3/S=0.1010 cov=-0.0000 identity=exact
// X=2^24 u=6 y=15 S=829642 T=76371 P1/S=0.3064 Podd/S=0.5019 Nodd3/S=0.1595 cov=-0.0005 identity=exact
// SEC1 done in 0.6 s; both-odd and two-sided identities exact on all 10 intervals
// SEC2 sieve functions and controls
// control f_1(2)=0.000000 (0) F_1(2)=1.781072 (e^gamma=1.781072) sigma_2(2)=0.157618 (e^-2gamma/2=0.157618)
// control omega(2)=0.500000 (0.5) omega(3)=0.564382 ((1+ln2)/3=0.564382) omega(60)=0.561460 (e^-gamma=0.561459)
// control F_1(s)>=1>=f_1(s) at s=6,10,20: 1.00011/0.99990 1.00000/1.00000 1.00000/1.00000
// control D_2(3)=0.693147 (ln2=0.693147) f_1(4)=0.9784 F_1(3)=1.1874 F_1(6)=1.0001 sigma_2(6)=0.8423 sigma_2(20)=1.0000
// SEC3 the two ratios; sufficient test is Q_cov>1 or c*_real>c_eff
// u | massErr | rho_odd | P1|R | Podd|R | f1(u/2) | F1(u/2) | F2=1/sig2 | Q_cov(F2) Q_cov(F2=1) | c*_best c*_real c_eff | verdict
// 4.1 | -4.4e-16 | 1.1708 | 0.4344 | 0.5085 | 0.0848 | 1.7376 | 1.7739 | 0.0041 0.0072 | 6.856 0.028 19.72 | fails
// 4.2 | 0.0e+0 | 1.1950 | 0.4240 | 0.5067 | 0.1617 | 1.6963 | 1.7165 | 0.0139 0.0239 | 6.127 0.093 19.49 | fails
// 4.3 | -4.4e-16 | 1.2200 | 0.4142 | 0.5053 | 0.2316 | 1.6568 | 1.6638 | 0.0273 0.0453 | 5.546 0.179 19.28 | fails
// 4.5 | 3.6e-15 | 1.2715 | 0.3958 | 0.5032 | 0.3533 | 1.5832 | 1.5704 | 0.0592 0.0929 | 4.684 0.372 18.90 | fails D3 rec/dir=1.0000
// 5 | 3.1e-15 | 1.4061 | 0.3562 | 0.5009 | 0.5777 | 1.4249 | 1.3928 | 0.1458 0.2031 | 3.462 0.830 18.10 | fails
// 5.5 | 3.6e-15 | 1.5447 | 0.3238 | 0.5002 | 0.7249 | 1.2953 | 1.2714 | 0.2263 0.2877 | 2.836 1.172 17.42 | fails
// 6 | 8.9e-16 | 1.6846 | 0.2968 | 0.5001 | 0.8230 | 1.1874 | 1.1872 | 0.2957 0.3510 | 2.461 1.404 16.81 | fails D3 rec/dir=1.0000
// 7 | 5.3e-15 | 1.9651 | 0.2544 | 0.5000 | 0.9326 | 1.0652 | 1.0873 | 0.3822 0.4156 | 2.036 1.629 15.73 | fails
// 8 | 1.2e-14 | 2.2458 | 0.2226 | 0.5000 | 0.9784 | 1.0216 | 1.0391 | 0.4063 0.4222 | 1.803 1.661 14.99 | fails
// 10 | 1.6e-14 | 2.8073 | 0.1781 | 0.5000 | 0.9982 | 1.0017 | 1.0067 | 0.3837 0.3863 | 1.553 1.538 14.16 | fails
// 12 | -1.1e-13 | 3.3688 | 0.1484 | 0.5000 | 0.9999 | 1.0001 | 1.0009 | 0.3551 0.3554 | 1.422 1.421 13.56 | fails
// 15 | -3.2e-13 | 4.2109 | 0.1187 | 0.5000 | 1.0000 | 1.0000 | 1.0000 | 0.3278 0.3279 | 1.311 1.311 13.48 | fails
// 20 | -6.8e-13 | 5.6146 | 0.0891 | 0.5000 | 1.0000 | 1.0000 | 1.0000 | 0.3042 0.3042 | 1.217 1.217 13.18 | fails
// 30 | -2.1e-14 | 8.4219 | 0.0594 | 0.5000 | 1.0000 | 1.0000 | 1.0000 | 0.2837 0.2837 | 1.135 1.135 12.97 | fails
// 45 | 1.2e-11 | 12.6328 | 0.0396 | 0.5000 | 1.0000 | 1.0000 | 1.0000 | 0.2715 0.2715 | 1.086 1.086 12.96 | fails
// 60 | 1.9e-11 | 16.8438 | 0.0297 | 0.5000 | 1.0000 | 1.0000 | 1.0000 | 0.2658 0.2658 | 1.063 1.063 12.86 | fails
// SEC3 summary: max Q_cov=0.4063 (valid F_2), max Q_cov at floor F_2=1: 0.4222; max c*_real/c_eff=0.1108; any listed u passes: false
// asymptote check Q_cov(60)*4=1.063 (limit 1)
// All pre-registered checks evaluated. Finite identities exact; ratio table is numerical evaluation of sieve functions, not a theorem about primes.
// SEC4 fine scan and the piecewise all-depth bounds (added 2026-09-08)
// piece (4,4.4]: f1(hi/2)^2<=0.0871 D3>=0.1288 (formula at 4) => Q_cov<=0.2089 c*_real<=0.7639 both tests fail on the piece
// piece (4.4,4.8]: f1(hi/2)^2<=0.2494 D3>=0.2062 (formula at 4.4) => Q_cov<=0.4063 c*_real<=1.4588 both tests fail on the piece
// piece (4.8,6]: f1(hi/2)^2<=0.6774 D3>=0.3501 (lower sum at 4.8) => Q_cov<=0.7862 c*_real<=2.6119 both tests fail on the piece
// piece (6,8]: f1(hi/2)^2<=0.9572 D3>=0.6823 (lower sum at 6) => Q_cov<=0.7765 c*_real<=2.3601 both tests fail on the piece
// piece (8,Infinity]: f1(hi/2)^2<=1.0000 D3>=1.2176 (lower sum at 8) => Q_cov<=0.6480 c*_real<=1.8213 both tests fail on the piece
// fine scan over 30000 grid points in (4,64]: max Q_cov(F_2)=0.4065 at u=8.120; max Q_cov(F_2=1)=0.4240 at u=7.652; max c*_real=1.6641 at u=7.732; grid points with c*_real>=2: 0
// grid controls: rho_odd bound violations=0; f_1<=1<=F_1 and F_2>=1 violations beyond 1e-6=0; grid points where the piecewise analytic bound fails to dominate=0
// corrected marginal test with c_eff=4: max c*_real/4=0.4160 (fails at every grid point); covariance test max Q_cov(F_2=1)=0.4240 (fails at every grid point)
// SEC4 done: floating-point piecewise bounds and model scan; directed rational certificates are in research-round-validation.js.
// ============================================================================
// READINGS
//
// 1. Finite identities. On all 10 intervals (X = 2^16 .. 2^24, u = 4.5 and 6)
//    the two-sided identity 4 T S = 4 P_odd P'_odd + (C S - A B) - 4 N_odd3 S and
//    the both-odd identity S - A - B + C = 4 (T + N_odd3) hold exactly
//    ("identity=exact"). These are algebra checks of the bridge, not evidence
//    about any asymptotic.
// 2. Finite fractions sit near their asymptotic densities: at X = 2^24, u = 4.5,
//    P1/S = 0.3951 against P1|R = 0.3958; at u = 6, P1/S = 0.3064 against 0.2968.
//    The measured covariance at 2^24 reads -0.0000 (u = 4.5) and -0.0005 (u = 6).
//    A finite covariance near zero is a reading, not support for hypothesis (Cov_u).
// 3. Covariance route: max Q_cov = 0.4063 with the valid Ankeny-Onishi F_2 and
//    0.4222 at the floor F_2 = 1, both attained near u = 8; the limit check
//    Q_cov(60)*4 = 1.063 is consistent with the derived limit 1/4. Q_cov < 1 at
//    every listed u, so (Cov_u) alone does not close at this scope.
// 4. Marginal route: max c*_real = 1.661 at u = 8 (c*_best = 1.803 there), against
//    the benchmark constant 4 and the superseded contamination-weighted
//    c_eff = 14.99 at that u; max c*_real/c_eff = 0.1108. No listed u closes.
// 5. Controls pass: f_1(2) = 0, F_1(2) = e^gamma, sigma_2(2) = e^-2gamma/2,
//    omega(2) = 0.5, omega(3) = (1+ln 2)/3, omega(60) -> e^-gamma, D_2(3) = ln 2,
//    D_3 recursion/direct = 1.0000 at u = 4.5 and 6, mass error <= 1.9e-11,
//    F_1 >= 1 >= f_1 at s = 6, 10, 20.
// 6. SEC 4 (added 2026-09-08, second dispatch). The five piecewise bounds of the
//    owning note's Proposition 5 evaluate to Q_cov <= 0.7862 and c*_real <= 2.6119
//    at worst, evaluated in floating-point arithmetic. These are not directed
//    interval bounds; the proof uses research-round-validation.js instead.
//    The fine scan of the same numerical model over 30000 grid points gives
//    max Q_cov(F_2=1) = 0.4240 at u = 7.652 and max c*_real = 1.6641 at u = 7.732,
//    with no grid point at or above c*_real = 2; these are measurements of the
//    model, and the analytic bound dominates the grid value at every point.
//    With the corrected contamination constant c_eff = 4 the marginal ratio is at
//    most 0.4160 on the grid. None of this is a statement about primes beyond the
//    inputs named in the note; the note's Propositions 3 and 4 carry the theorem side.
