// ============================================================================
// ATTACK ROUGHPAIR ERROR 01 — TRUTH-SIDE vs PROOF-SIDE ON THE FOURTH NAMING:
// HOW BIG IS THE ACTUAL ERROR TERM OF THE ROUGH-PAIR CENSUS X(y), MEASURED
// AGAINST THE TWIN COUNT T IT HAS TO BEAT?
// ============================================================================
// THE QUESTION (TODO Z2 first move (b), the half of it nobody asked).
// The capture identity (quadpoint-identity-01.md, HELD, UNVERIFIED PREMISE —
// never red-teamed) says floor_K = T - X(K) exactly, so the certificate at
// (Q, y) is the statement X(y) < T. Z2 states the wall as "beat the twin
// density in the error term of a rough-pair count on a short interval". That
// is a statement about what a PROOF needs. It says nothing about how big the
// error term actually IS. Two situations the programme must tell apart:
//
//   (i) the empirical error E = X(y) - mainterm(y) sits well below T with a
//       ratio that falls  => the truth is favourable, the obstruction is
//       entirely technique;
//   (ii) E is comparable to or above T where the certificate must work
//       => the route is dead on the numbers, no technique helps, close Z2.
//
// THE MAIN TERM USED, AND ITS SOURCE. The classical dimension-2 sifting main
// term (Ford, Sieve methods lecture notes Spring 2023, §1.7.2, cited through
// quadpoint-prior-art.md §1.1: A = interval, A_p = {n : p | n(n+2)},
// rho(2) = 1, rho(p) = 2, sifting dimension 2), i.e. |A| * prod_{p<=z}
// (1 - rho(p)/p). On the wheel-30 channel this is exactly
//
//     S_main(A; y, y) / C = V2(y) := prod_{7<=p<=y} (1 - 2/p),
//
// C = channel openers. X is not a sifting function; it is an exact
// inclusion-exclusion of four of them, since inside a stretch "prime" =
// "Q-rough" (finality, stretch-01 §1 S2):
//
//     X(y) = S(y,y) - S(y,Q) - S(Q,y) + S(Q,Q),
//     S(y,z)/C main term = V2(y) * prod_{y<p<=z}(1 - 1/p)   (y <= z),
//
// which gives the ZERO-PARAMETER naive main term
//
//     Xnaive(K)/C = V2(K) - 2 * V2(K) * U(K) + V2(nR),
//     U(K) = prod_{i>K} (1 - 1/p_i),  V2(K) = prod_{i<=K} (1 - 2/p_i).
//
// It vanishes identically at K = nR, matching X(Q) = 0 exactly.
//
// THE BUCHSTAB-CORRECTED MAIN TERM. The naive product is the fundamental-
// lemma main term and carries a known per-member bias omega(u) e^gamma at
// finite u = ln h / ln y (Ford §1.7.1's w(c); prior-art §2.2's coordinate).
// Applying it per member:
//
//     Xcorr(K)/C = V2(K) b_K^2 - 2 V2(K) U(K) b_K b_Q + V2(nR) b_Q^2,
//     b_K = omega(u_K) e^gamma,  u_K = ln h / ln p_K,  b_Q = omega(2) e^gamma
//                                                          = e^gamma / 2.
//
// At K = nR this is C * V2(Q) * rho(2), rho(2) = e^{2gamma}/4 = 0.79305 — the
// Hardy-Littlewood twin main term, i.e. the corrected form reproduces the ONE
// point where the truth is known. SEC 1 measures that calibration before any
// error is quoted (campaign lesson: calibrate the estimator before fitting).
//
// WHAT IS CITED AND NOT RECOMPUTED (standing compute rule). The capture
// identity itself is CITED from attack-quadpoint-03.js (verified there at
// every depth of all 1,227 anchors); this file does not re-verify it. The v1/
// v2 K* constants and the Z1 band means are recomputed ONLY as an ENGINE
// REPRODUCTION GATE — if this file's window sieve does not reproduce them
// digit-for-digit it is not entitled to measure anything, and it aborts.
//
// NO TPC CLAIM. Route B CLOSED, rho(2) ADVERSE. Two decades decide nothing
// asymptotic; every exponent below is a range summary with its control quoted
// beside it, per the exponent lesson (REFUTED.md, the linear-exponent rule
// that was refuted twice blind).
// ============================================================================
'use strict';
const T0 = Date.now();

let failures = 0;
function assertEq(tag, got, want) {
  if (got !== want) { failures++; console.log(`  ASSERT FAIL [${tag}]: got ${got} want ${want}`); return false; }
  return true;
}
function assertTrue(tag, cond) { if (!cond) { failures++; console.log(`  ASSERT FAIL [${tag}]`); } return cond; }
function assertNear(tag, got, want, tol) {
  if (!(Math.abs(got - want) <= tol)) { failures++; console.log(`  ASSERT FAIL [${tag}]: got ${got} want ${want} +-${tol}`); return false; }
  return true;
}
const f2 = (x) => x.toFixed(2), f3 = (x) => x.toFixed(3), f4 = (x) => x.toFixed(4), f5 = (x) => x.toFixed(5);
const pad = (s, n) => String(s).padStart(n);

// ---------------------------------------------------------------------------
// primes, actives, anchors — conventions identical to attack-quadpoint-01/02/03
// ---------------------------------------------------------------------------
const PLIM = 31700;
const flag = new Uint8Array(PLIM + 1); flag[0] = flag[1] = 1;
for (let p = 2; p * p <= PLIM; p++) if (!flag[p]) for (let m = p * p; m <= PLIM; m += p) flag[m] = 1;
const PRIMES = []; for (let n = 2; n <= PLIM; n++) if (!flag[n]) PRIMES.push(n);
const ACT = PRIMES.filter(p => p >= 7);
const QMAX = 10007;
const ANCHORS = ACT.filter(p => p <= QMAX);
const GAMMA = 0.5772156649015329, EG = Math.exp(GAMMA), EMG = Math.exp(-GAMMA);
const LICHTMAN = 3.29956;     // Lichtman 2025, pi_2 <~ 3.29956 * S  (CITED, prior-art 1.2)
const BETA2 = 4.2665;         // dimension-2 sifting limit (CITED, corpus constant)

const isOpen30 = (c) => c === 11 || c === 17 || c === 29;

// global prefix products over the active list (same for every anchor)
const NP = ACT.length;
const P1 = new Float64Array(NP + 1), P2 = new Float64Array(NP + 1);
P1[0] = 1; P2[0] = 1;
for (let i = 1; i <= NP; i++) { const p = ACT[i - 1]; P1[i] = P1[i - 1] * (1 - 1 / p); P2[i] = P2[i - 1] * (1 - 2 / p); }

// ---------------------------------------------------------------------------
// Buchstab omega on a grid, from the delay equation  (u w(u))' = w(u-1)
// closed forms: w(u) = 1/u on [1,2];  u w(u) = 1 + ln(u-1) on [2,3]
// ---------------------------------------------------------------------------
const WSTEP = 1e-4, WMAX = 20;
const NW = Math.round((WMAX - 1) / WSTEP) + 1;
const WOM = new Float64Array(NW);                    // WOM[j] = omega(1 + j*WSTEP)
{
  for (let j = 0; j < NW; j++) {
    const u = 1 + j * WSTEP;
    if (u <= 2) WOM[j] = 1 / u;
    else if (u <= 3) WOM[j] = (1 + Math.log(u - 1)) / u;
    else break;
  }
  const j3 = Math.round(2 / WSTEP);                  // index of u = 3
  let g = 3 * WOM[j3];                               // g(u) = u*omega(u)
  for (let j = j3 + 1; j < NW; j++) {
    const u = 1 + j * WSTEP;
    // trapezoid on omega(t-1), both endpoints already known (t-1 < u-1 < u)
    const a = WOM[j - 1 - Math.round(1 / WSTEP)], b = WOM[j - Math.round(1 / WSTEP)];
    g += WSTEP * (a + b) / 2;
    WOM[j] = g / u;
  }
}
function omega(u) {
  if (u < 1) return 0;
  if (u >= WMAX) return EMG;
  const t = (u - 1) / WSTEP, j = Math.floor(t), fr = t - j;
  return WOM[j] * (1 - fr) + WOM[Math.min(j + 1, NW - 1)] * fr;
}
const beta = (u) => omega(u) * EG;                   // per-member correction factor

// ---------------------------------------------------------------------------
console.log('SEC 0 — GATES: the omega integrator, and the engine against the cited constants');
// ---------------------------------------------------------------------------
assertNear('omega(2) = 1/2', omega(2), 0.5, 1e-9);
assertNear('3*omega(3) = 1 + ln 2', 3 * omega(3), 1 + Math.LN2, 1e-7);
assertNear('omega(12) -> e^{-gamma}', omega(12), EMG, 1e-6);
let uStar = 0;
{ // root of u*omega(u) = 2 by bisection on the integrated grid
  let a = 3, b = 5;
  for (let it = 0; it < 200; it++) { const m = (a + b) / 2; if (m * omega(m) < 2) a = m; else b = m; }
  uStar = (a + b) / 2;
}
console.log(`  omega: w(2) = ${f5(omega(2))}, 3w(3) = ${f5(3 * omega(3))} (= 1+ln2 = ${f5(1 + Math.LN2)}), w(12) = ${f5(omega(12))} (e^-g = ${f5(EMG)})`);
console.log(`  root of u*w(u) = 2:  u* = ${uStar.toFixed(6)}, 1/u* = ${(1 / uStar).toFixed(6)}   [prior-art scratchpad value 3.565845 / 0.280438]`);
assertNear('u* matches the prior-art scratchpad root', uStar, 3.565845, 2e-4);
console.log(`  rho(2) = e^{2gamma}/4 = ${f5(EG * EG / 4)} = beta(2)^2 = ${f5(beta(2) * beta(2))} (the corrected main term IS the HL twin constant at full depth)`);

// ---------------------------------------------------------------------------
// the engine: per-anchor window sieve, X(K) for every K
// ---------------------------------------------------------------------------
let maxW = 0;
{ let prev = 7; for (const p of ACT) { if (p > 10009) break; maxW = Math.max(maxW, p * p - prev * prev); prev = p; } }
const lpfw = new Int32Array(maxW + 4);

const rows = [];
for (let Qi = 0; Qi < ANCHORS.length; Qi++) {
  const Q = ANCHORS[Qi], Qp = Qi + 1 < ANCHORS.length ? ANCHORS[Qi + 1] : PRIMES[PRIMES.findIndex(p => p > Q)];
  const lo = Q * Q, hi = Qp * Qp, width = hi - lo, nR = Qi + 1;
  lpfw.fill(0, 0, width + 3);
  for (let ri = 0; ri < nR; ri++) {
    const r = ACT[ri];
    for (let v = Math.ceil(lo / r) * r; v <= hi + 1; v += r) if (lpfw[v - lo] === 0) lpfw[v - lo] = ri + 1;
  }
  let C = 0, T = 0;
  const histo = new Int32Array(nR + 2);
  for (let a = lo; a + 2 < hi; a++) {
    if (!isOpen30(a % 30)) continue;
    C++;
    const iA = lpfw[a - lo], iB = lpfw[a + 2 - lo];
    if (iA === 0 && iB === 0) T++;
    else if (iA > 0 && iB > 0) histo[Math.min(iA, iB)]++;
  }
  const X = new Int32Array(nR + 1);
  for (let K = nR - 1; K >= 0; K--) X[K] = X[K + 1] + histo[K + 1];
  let Kstar = -1;
  for (let K = 0; K <= nR; K++) if (T - X[K] >= 1) { Kstar = K; break; }
  rows.push({ Q, Qp, lo, hi, width, C, T, nR, X, Kstar, X0: X[0], lnh: 2 * Math.log(Q), lnW: Math.log(width) });
}
const byQ = new Map(rows.map(r => [r.Q, r]));

// --- engine reproduction gate (NOT a recomputation of the result: a licence) --
{
  const V2K = [[1511, 15], [1999, 16], [2503, 19], [2999, 25], [3163, 18], [3511, 22], [4001, 27], [4507, 21],
    [4999, 22], [5623, 27], [6007, 23], [6521, 27], [7001, 29], [7507, 34], [8009, 31], [8513, 32],
    [9001, 33], [9497, 32], [10007, 30], [7, 0], [43, 0], [61, 1], [67, 1], [71, 4], [809, 16], [1499, 13]];
  for (const [Q, Ks] of V2K) assertEq(`cited K* at Q=${Q}`, byQ.get(Q).Kstar, Ks);
  const worst = rows.reduce((w, r) => (r.Kstar > w.Kstar ? r : w));
  assertTrue('cited largest K* = 46 at Q = 9281', worst.Q === 9281 && worst.Kstar === 46);
  const ok0 = rows.filter(r => r.X0 <= r.T - 1).map(r => r.Q);
  assertEq('cited K=0 certificate list', ok0.join(','), '7,11,13,19,23,31,37,43');
  for (const r of rows) { assertTrue(`X(full) = 0 at Q=${r.Q}`, r.X[r.nR] === 0); }
  console.log(`  engine: ${rows.length} anchors Q = 7..${QMAX}; 25 cited K* values, max K* = 46 at 9281, the K=0 list, X(full) = 0 everywhere — all reproduced`);
}

const BANDS = [['B3', 101, 313], ['B4', 317, 997], ['B5', 1009, 1499], ['B6', 1500, 3163], ['B7', 3164, 5623], ['B8', 5624, 10007]];
{ // Z1's reproduction target, recomputed here as the gate
  const want = { B3: ['3.88', '0.093'], B4: ['8.42', '0.075'], B5: ['12.20', '0.061'], B6: ['16.88', '0.050'], B7: ['23.34', '0.040'], B8: ['31.22', '0.032'] };
  let line = '  Z1 target reproduced: ';
  for (const [nm, a, b] of BANDS) {
    const rs = rows.filter(r => r.Q >= a && r.Q <= b);
    const mK = rs.reduce((s, r) => s + r.Kstar, 0) / rs.length;
    const mF = rs.reduce((s, r) => s + r.Kstar / r.nR, 0) / rs.length;
    assertEq(`Z1 ${nm} K* mean`, f2(mK), want[nm][0]);
    assertEq(`Z1 ${nm} K*/pool mean`, f3(mF), want[nm][1]);
    line += `${nm} ${f2(mK)}/${f3(mF)}  `;
  }
  console.log(line.trimEnd());
}

// ---------------------------------------------------------------------------
// main terms
// ---------------------------------------------------------------------------
function mains(r, K) {
  const nR = r.nR;
  const V2K = P2[K], U = P1[nR] / P1[K], V2Q = P2[nR];
  const naive = r.C * (V2K - 2 * V2K * U + V2Q);
  const uK = K === 0 ? Infinity : r.lnh / Math.log(ACT[K - 1]);
  const bK = K === 0 ? 1 : beta(uK), bQ = beta(2);
  const corr = r.C * (V2K * bK * bK - 2 * V2K * U * bK * bQ + V2Q * bQ * bQ);
  return { naive, corr, uK };
}
const Tmain = (r) => r.C * P2[r.nR] * beta(2) * beta(2);
function KatU(r, u) {                                 // deepest active p <= h^{1/u}
  const y = Math.exp(r.lnh / u);
  let lo = 0, hi = r.nR;
  while (lo < hi) { const m = (lo + hi + 1) >> 1; if (ACT[m - 1] <= y) lo = m; else hi = m - 1; }
  return lo;
}

// ---------------------------------------------------------------------------
console.log('\nSEC 1 — CALIBRATION OF THE MAIN TERM AT THE ONE POINT WHERE THE TRUTH IS KNOWN (T)');
// ---------------------------------------------------------------------------
// If the corrected main term cannot reproduce the twin count it has no
// standing to price X's error. Naive shown beside it: its bias is 1/rho(2).
{
  console.log('  band   Q-range          n      sum T   sum Tmain(corr)   T/Tmain    T/Tnaive   [naive bias 1/rho(2) = ' + f4(1 / (beta(2) * beta(2))) + ']');
  for (const [nm, a, b] of BANDS) {
    const rs = rows.filter(r => r.Q >= a && r.Q <= b);
    const sT = rs.reduce((s, r) => s + r.T, 0);
    const sM = rs.reduce((s, r) => s + Tmain(r), 0);
    const sN = rs.reduce((s, r) => s + r.C * P2[r.nR], 0);
    console.log(`  ${nm}  [${pad(a, 5)},${pad(b, 6)}]  ${pad(rs.length, 4)}  ${pad(sT, 9)}   ${pad(sM.toFixed(0), 13)}   ${f4(sT / sM)}     ${f4(sT / sN)}`);
  }
}

// ---------------------------------------------------------------------------
console.log('\nSEC 2 — THE EMPIRICAL ERROR E = X(y) - mainterm(y) AT FIXED DEPTH u = ln h / ln y');
// ---------------------------------------------------------------------------
// E is reported against the CORRECTED main term (SEC 1 says which one is
// calibrated). Everything is per band, aggregated over anchors; the columns
// that decide the question are |E|/T and chi2/df = mean(E^2 / Xmain).
const UGRID = [2.5, 3.0, uStar, 4.0, 5.0];
const cell = {};                                       // cell[u][band] = stats
for (const u of UGRID) {
  cell[u] = {};
  for (const [nm, a, b] of BANDS) {
    const rs = rows.filter(r => r.Q >= a && r.Q <= b).map(r => ({ r, K: KatU(r, u) })).filter(o => o.K >= 3);
    if (!rs.length) continue;
    let sX = 0, sM = 0, sT = 0, sE = 0, sAE = 0, sE2overM = 0, mxAEoverT = 0, sXoverT = 0, sMoverT = 0, n = 0;
    const Es = [];
    for (const { r, K } of rs) {
      const m = mains(r, K), X = r.X[K], E = X - m.corr;
      sX += X; sM += m.corr; sT += r.T; sE += E; sAE += Math.abs(E);
      if (m.corr > 0) sE2overM += E * E / m.corr;
      mxAEoverT = Math.max(mxAEoverT, Math.abs(E) / r.T);
      sXoverT += X / r.T; sMoverT += m.corr / r.T; n++;
      Es.push({ E, M: m.corr, W: r.width, T: r.T, lnW: r.lnW });
    }
    cell[u][nm] = { n, sX, sM, sT, sE, sAE, chi2: sE2overM / n, mxAEoverT, mXoverT: sXoverT / n, mMoverT: sMoverT / n, Es };
  }
}
for (const u of UGRID) {
  console.log(`  --- u = ${u === uStar ? 'u* = ' + f4(uStar) : f2(u)}  (y = h^{1/u}) ---`);
  console.log('  band     n    <X/T>   <Xmain/T>   sumE/sumXmain   <|E|>/<T>   max|E|/T   chi2/df = <E^2/Xmain>');
  for (const [nm] of BANDS) {
    const c = cell[u][nm]; if (!c) continue;
    console.log(`  ${nm}  ${pad(c.n, 4)}   ${f4(c.mXoverT)}    ${f4(c.mMoverT)}      ${pad((c.sE / c.sM >= 0 ? '+' : '') + f4(c.sE / c.sM), 8)}      ${f4(c.sAE / c.sT)}     ${f4(c.mxAEoverT)}     ${f3(c.chi2)}`);
  }
}
// the sup, because the certificate must hold at EVERY anchor, not on average
{
  for (const u of [3.0, uStar]) {
    let mx = 0, mxQ = 0, nOver = 0, n = 0;
    for (const r of rows) {
      const K = KatU(r, u); if (K < 3) continue;
      const E = r.X[K] - mains(r, K).corr; n++;
      if (Math.abs(E) / r.T > mx) { mx = Math.abs(E) / r.T; mxQ = r.Q; }
      if (Math.abs(E) >= r.T) nOver++;
    }
    console.log(`  SUP over all ${n} anchors at u = ${u === uStar ? 'u*' : f2(u)}: max |E|/T = ${f4(mx)} at Q = ${mxQ}; anchors with |E| >= T: ${nOver}`);
  }
}

// ---------------------------------------------------------------------------
console.log('\nSEC 3 — WHAT E DOES TO THE CROSSING: measured K* vs main-term-predicted K*');
// ---------------------------------------------------------------------------
// K*_pred(zero-param) = least K with Xcorr(K) < Tmain(Q); K*_pred(semi) uses
// the MEASURED T, isolating the error on the X side alone.
{
  console.log('  band     n   <K*>   <K*pred zero-param>   <K*pred semi (true T)>   <K*-K*pred_semi>   frac |diff| <= 2');
  for (const [nm, a, b] of BANDS) {
    const rs = rows.filter(r => r.Q >= a && r.Q <= b && r.Kstar > 0);
    if (!rs.length) continue;
    let sK = 0, sP0 = 0, sP1 = 0, sD = 0, nOK = 0;
    for (const r of rs) {
      const tm = Tmain(r);
      let p0 = r.nR, p1 = r.nR;
      for (let K = 0; K <= r.nR; K++) { if (mains(r, K).corr < tm) { p0 = K; break; } }
      for (let K = 0; K <= r.nR; K++) { if (mains(r, K).corr < r.T) { p1 = K; break; } }
      sK += r.Kstar; sP0 += p0; sP1 += p1; sD += r.Kstar - p1; if (Math.abs(r.Kstar - p1) <= 2) nOK++;
    }
    const n = rs.length;
    console.log(`  ${nm}  ${pad(n, 4)}  ${pad(f2(sK / n), 5)}   ${pad(f2(sP0 / n), 19)}   ${pad(f2(sP1 / n), 22)}   ${pad((sD / n >= 0 ? '+' : '') + f2(sD / n), 16)}   ${f3(nOK / n)}`);
  }
}

// ---------------------------------------------------------------------------
console.log('\nSEC 4 — THE EXPONENT OF |E| IN THE WINDOW WIDTH, WITH THE ESTIMATOR CALIBRATED FIRST');
// ---------------------------------------------------------------------------
// Pipeline: bin anchors by ln W into NB log-spaced Q bins, take rms(E) per
// bin, OLS ln rms(E) on ln W. The SAME pipeline is run on synthetic data with
// a KNOWN exponent before any measured slope is quoted (the calibration
// control the corpus requires beside a fit).
function ols(xs, ys) {
  const n = xs.length, mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
  let sxy = 0, sxx = 0; for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; }
  const b = sxy / sxx, a = my - b * mx;
  let ss = 0; for (let i = 0; i < n; i++) ss += (ys[i] - a - b * xs[i]) ** 2;
  const se = n > 2 ? Math.sqrt(ss / (n - 2) / sxx) : NaN;
  return { b, a, se };
}
function mkRng(seed) { let s = seed >>> 0; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return (s + 0.5) / 4294967296; }; }
function gauss(rng) { const u = rng(), v = rng(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
const NB = 10;
function binFit(items, val) {                          // items: {lnW, ...}; val: item -> deviation
  const lo = Math.min(...items.map(i => i.lnW)), hi = Math.max(...items.map(i => i.lnW));
  const xs = [], ys = [];
  for (let k = 0; k < NB; k++) {
    const a = lo + (hi - lo) * k / NB, b = lo + (hi - lo) * (k + 1) / NB;
    const g = items.filter(i => i.lnW >= a && (k === NB - 1 ? i.lnW <= b : i.lnW < b));
    if (g.length < 8) continue;
    const rms = Math.sqrt(g.reduce((s, i) => s + val(i) ** 2, 0) / g.length);
    if (!(rms > 0)) continue;
    xs.push(g.reduce((s, i) => s + i.lnW, 0) / g.length); ys.push(Math.log(rms));
  }
  return { ...ols(xs, ys), nbin: xs.length };
}
{
  const uUse = [3.0, uStar];
  for (const u of uUse) {
    const items = [];
    for (const [nm, a, b] of BANDS) { const c = cell[u][nm]; if (c) for (const e of c.Es) items.push(e); }
    const hiItems = items.filter(i => i.W >= 1000);    // drop the tiny early windows
    const rng = mkRng(20260823);
    const synPois = hiItems.map(i => ({ lnW: i.lnW, d: Math.sqrt(Math.max(i.M, 1)) * gauss(rng) }));
    const rng2 = mkRng(77777);
    const synSys = hiItems.map(i => ({ lnW: i.lnW, d: 0.02 * Math.max(i.M, 1) * gauss(rng2) }));
    const fE = binFit(hiItems, i => i.E);
    const fT = binFit(hiItems, i => i.T);
    const fM = binFit(hiItems, i => i.M);
    const fP = binFit(synPois, i => i.d);
    const fS = binFit(synSys, i => i.d);
    const half = hiItems.slice().sort((p, q) => p.lnW - q.lnW);
    const fL = binFit(half.slice(0, Math.floor(half.length / 2)), i => i.E);
    const fH = binFit(half.slice(Math.floor(half.length / 2)), i => i.E);
    console.log(`  --- u = ${u === uStar ? 'u*' : f2(u)}, n = ${hiItems.length} anchors with W >= 1000, ${fE.nbin} bins ---`);
    console.log(`    measured  exponent of rms(E)  in W : ${f3(fE.b)} +- ${f3(fE.se)}`);
    console.log(`    CONTROL   same pipeline, synthetic Poisson-scale noise sd = sqrt(Xmain) : ${f3(fP.b)} +- ${f3(fP.se)}   [truth: rms ∝ sqrt(Xmain)]`);
    console.log(`    CONTROL   same pipeline, synthetic systematic noise sd = 0.02*Xmain     : ${f3(fS.b)} +- ${f3(fS.se)}   [truth: rms ∝ Xmain]`);
    console.log(`    reference exponent of rms(T)     in W : ${f3(fT.b)} +- ${f3(fT.se)}    (what E must stay below)`);
    console.log(`    reference exponent of rms(Xmain) in W : ${f3(fM.b)} +- ${f3(fM.se)}`);
    console.log(`    SPLIT-HALF on the measured E: low half ${f3(fL.b)} +- ${f3(fL.se)}, high half ${f3(fH.b)} +- ${f3(fH.se)}`);
    console.log(`    GAP a proof must close: exponent(T) - exponent(E) = ${f3(fT.b - fE.b)}`);
  }
}

// ---------------------------------------------------------------------------
console.log('\nSEC 5 — THE SLACK CURVE: how loose may a proof-side bound on X be, and where does 3.29956 sit?');
// ---------------------------------------------------------------------------
// slack(y) = T / Xmain(y): the multiplicative looseness an upper bound on X
// may carry at depth y and still certify X(y) < T. Reported against the
// sieve's own coordinate s = ln W / ln y (level of distribution <= the window
// length W), because a bound at depth y must be produced by sifting an
// interval of length W. Lichtman 2025's 3.29956 is CITED as the standing
// distance on the adjacent, easier, whole-range problem.
{
  console.log(`  Lichtman 2025 factor (CITED): ${LICHTMAN}; dimension-2 sifting limit beta_2 (CITED): ${BETA2}`);
  console.log('  band     n   <lnW/lnh>  min   slack at u*   s at u*   | depth where slack = 3.29956: <u>   <s = lnW/ln y>   frac with s >= 1');
  for (const [nm, a, b] of BANDS) {
    const rs = rows.filter(r => r.Q >= a && r.Q <= b);
    let n = 0, sSl = 0, sS1 = 0, sU = 0, sS = 0, nS1 = 0, m = 0, sWH = 0, mnWH = 9;
    for (const r of rs) {
      const Ku = KatU(r, uStar); if (Ku < 3) continue;
      const mm = mains(r, Ku).corr; if (!(mm > 0)) continue;
      n++; sSl += r.T / mm; sS1 += r.lnW / Math.log(ACT[Ku - 1]);
      sWH += r.lnW / r.lnh; mnWH = Math.min(mnWH, r.lnW / r.lnh);
      // walk depth outward until the main term drops below T / LICHTMAN
      let Kf = -1;
      for (let K = Ku; K <= r.nR; K++) { const v = mains(r, K).corr; if (v > 0 && v <= r.T / LICHTMAN) { Kf = K; break; } }
      if (Kf > 0) { const y = ACT[Kf - 1], u = r.lnh / Math.log(y), s = r.lnW / Math.log(y); sU += u; sS += s; if (s >= 1) nS1++; m++; }
    }
    if (!n) continue;
    console.log(`  ${nm}  ${pad(n, 4)}   ${pad(f3(sWH / n), 7)} ${f3(mnWH)}   ${pad(f3(sSl / n), 9)}   ${pad(f3(sS1 / n), 7)}   | ${pad(m, 4)}  ${pad(f3(sU / m), 7)}          ${pad(f3(sS / m), 7)}          ${f3(nS1 / m)}`);
  }
  // what the main term says at the sifting limit itself
  console.log('  band     n   at s = beta_2 = 4.2665 (y = W^{1/beta_2}):  <u>   <Xmain/T>   [certificate needs < 1]');
  for (const [nm, a, b] of BANDS) {
    const rs = rows.filter(r => r.Q >= a && r.Q <= b);
    let n = 0, sU = 0, sR = 0;
    for (const r of rs) {
      const y = Math.exp(r.lnW / BETA2); if (y < 7) continue;
      let K = 0; while (K < r.nR && ACT[K] <= y) K++;
      if (K < 3) continue;
      const mm = mains(r, K).corr; if (!(mm > 0)) continue;
      n++; sU += r.lnh / Math.log(ACT[K - 1]); sR += mm / r.T;
    }
    if (n) console.log(`  ${nm}  ${pad(n, 4)}                                       ${pad(f3(sU / n), 6)}   ${pad(f3(sR / n), 8)}`);
  }
}

// ---------------------------------------------------------------------------
console.log('\nSEC 6 — CONSISTENCY WITH Z1: does the main term alone reproduce Z1\'s reproduction target?');
// ---------------------------------------------------------------------------
// Z1 fixed m6/m7/m8 = 0.050/0.040/0.032 and K* band means 12.20 -> 31.22 as
// the target any analytic bound must hit. SEC 0 asserted the measured values.
// Here: the same statistics computed from the ZERO-PARAMETER main term. If
// the main term reproduces them, the two readings agree; if not, one is wrong
// and that matters more than either.
{
  console.log('  band     measured K*   main-term K*   measured K*/pool   main-term K*/pool   ratio(K*)');
  for (const [nm, a, b] of BANDS) {
    const rs = rows.filter(r => r.Q >= a && r.Q <= b);
    let sK = 0, sP = 0, sKf = 0, sPf = 0;
    for (const r of rs) {
      const tm = Tmain(r); let p0 = r.nR;
      for (let K = 0; K <= r.nR; K++) if (mains(r, K).corr < tm) { p0 = K; break; }
      sK += r.Kstar; sP += p0; sKf += r.Kstar / r.nR; sPf += p0 / r.nR;
    }
    const n = rs.length;
    console.log(`  ${nm}   ${pad(f2(sK / n), 10)}   ${pad(f2(sP / n), 12)}   ${pad(f3(sKf / n), 16)}   ${pad(f3(sPf / n), 17)}   ${f3((sP / n) / (sK / n))}`);
  }
}

console.log(`\ndone in ${((Date.now() - T0) / 1000).toFixed(1)}s; assertion failures: ${failures}`);
console.log(failures === 0 ? 'ALL ASSERTIONS PASS' : `FAILURES: ${failures}`);
if (failures > 0) process.exitCode = 1;
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-roughpair-error-01.js
//   invocation:  node research/attack-roughpair-error-01.js
//   code-sha256: c33973ffe1aff24a84efd13c28dbb38b1051bc24e3b3dc106a644905cfb87a76
//   out-sha256:  7fd82f32f44b20f509114c5e0a808c6fa1b1bb2c8969edd8d00dcddbee7f6297
//   body-lines:  112
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-26
//   elapsed:     0.8 s
// ============================================================================
// SEC 0 — GATES: the omega integrator, and the engine against the cited constants
//   omega: w(2) = 0.50000, 3w(3) = 1.69315 (= 1+ln2 = 1.69315), w(12) = 0.56146 (e^-g = 0.56146)
//   root of u*w(u) = 2:  u* = 3.565847, 1/u* = 0.280438   [prior-art scratchpad value 3.565845 / 0.280438]
//   rho(2) = e^{2gamma}/4 = 0.79305 = beta(2)^2 = 0.79305 (the corrected main term IS the HL twin constant at full depth)
//   engine: 1227 anchors Q = 7..10007; 25 cited K* values, max K* = 46 at 9281, the K=0 list, X(full) = 0 everywhere — all reproduced
//   Z1 target reproduced: B3 3.88/0.093  B4 8.42/0.075  B5 12.20/0.061  B6 16.88/0.050  B7 23.34/0.040  B8 31.22/0.032
//
// SEC 1 — CALIBRATION OF THE MAIN TERM AT THE ONE POINT WHERE THE TRUTH IS KNOWN (T)
//   band   Q-range          n      sum T   sum Tmain(corr)   T/Tmain    T/Tnaive   [naive bias 1/rho(2) = 1.2609]
//   B3  [  101,   313]    40       1017            1006   1.0109     0.8017
//   B4  [  317,   997]   103       7086            7036   1.0072     0.7987
//   B5  [ 1009,  1499]    71       8332            8119   1.0262     0.8138
//   B6  [ 1500,  3163]   208      42495           42115   1.0090     0.8002
//   B7  [ 3164,  5623]   292     101763          101524   1.0024     0.7949
//   B8  [ 5624, 10007]   491     280128          279608   1.0019     0.7945
//
// SEC 2 — THE EMPIRICAL ERROR E = X(y) - mainterm(y) AT FIXED DEPTH u = ln h / ln y
//   --- u = 2.50  (y = h^{1/u}) ---
//   band     n    <X/T>   <Xmain/T>   sumE/sumXmain   <|E|>/<T>   max|E|/T   chi2/df = <E^2/Xmain>
//   B3    40   0.1302    0.1586       -0.1265      0.0507     0.1828     0.672
//   B4   103   0.1535    0.1566       -0.0287      0.0279     0.2495     0.652
//   B5    71   0.1510    0.1575       -0.0398      0.0242     0.1230     0.721
//   B6   208   0.1584    0.1606       -0.0222      0.0186     0.1313     0.875
//   B7   292   0.1589    0.1610       -0.0195      0.0152     0.1303     0.931
//   B8   491   0.1590    0.1615       -0.0158      0.0115     0.1095     0.866
//   --- u = 3.00  (y = h^{1/u}) ---
//   band     n    <X/T>   <Xmain/T>   sumE/sumXmain   <|E|>/<T>   max|E|/T   chi2/df = <E^2/Xmain>
//   B3    40   0.3729    0.4247       -0.0872      0.0845     0.5190     0.803
//   B4   103   0.4327    0.4381       -0.0156      0.0464     0.4463     0.667
//   B5    71   0.4370    0.4374       +0.0057      0.0402     0.2431     0.777
//   B6   208   0.4493    0.4536       -0.0089      0.0296     0.2304     0.686
//   B7   292   0.4555    0.4597       -0.0079      0.0239     0.1601     0.760
//   B8   491   0.4618    0.4654       -0.0046      0.0184     0.1440     0.770
//   --- u = u* = 3.5658  (y = h^{1/u}) ---
//   band     n    <X/T>   <Xmain/T>   sumE/sumXmain   <|E|>/<T>   max|E|/T   chi2/df = <E^2/Xmain>
//   B3    40   0.7467    0.7903       -0.0311      0.0934     0.5628     0.627
//   B4   103   0.8734    0.8819       -0.0089      0.0759     0.4792     0.785
//   B5    71   0.9054    0.9044       +0.0056      0.0462     0.2818     0.546
//   B6   208   0.9115    0.9115       -0.0044      0.0401     0.3271     0.665
//   B7   292   0.9209    0.9268       -0.0051      0.0298     0.1949     0.578
//   B8   491   0.9486    0.9491       -0.0012      0.0255     0.2054     0.718
//   --- u = 4.00  (y = h^{1/u}) ---
//   band     n    <X/T>   <Xmain/T>   sumE/sumXmain   <|E|>/<T>   max|E|/T   chi2/df = <E^2/Xmain>
//   B3    26   1.1998    1.2716       -0.0387      0.0999     0.5413     0.497
//   B4   103   1.2850    1.2953       -0.0074      0.0837     0.4033     0.714
//   B5    71   1.3726    1.3663       +0.0013      0.0484     0.3137     0.434
//   B6   208   1.3881    1.3891       -0.0041      0.0481     0.3008     0.607
//   B7   292   1.4243    1.4310       -0.0045      0.0356     0.2580     0.552
//   B8   491   1.4391    1.4396       -0.0015      0.0298     0.2359     0.660
//   --- u = 5.00  (y = h^{1/u}) ---
//   band     n    <X/T>   <Xmain/T>   sumE/sumXmain   <|E|>/<T>   max|E|/T   chi2/df = <E^2/Xmain>
//   B4    57   2.4973    2.5080       -0.0067      0.0961     0.4772     0.485
//   B5    71   2.7329    2.7181       -0.0008      0.0628     0.4170     0.289
//   B6   208   2.6128    2.6161       -0.0020      0.0556     0.3258     0.429
//   B7   292   2.8772    2.8832       -0.0016      0.0448     0.3053     0.439
//   B8   491   2.9316    2.9338       -0.0013      0.0358     0.2705     0.458
//   SUP over all 1216 anchors at u = 3.00: max |E|/T = 0.5190 at Q = 269; anchors with |E| >= T: 0
//   SUP over all 1206 anchors at u = u*: max |E|/T = 0.5628 at Q = 269; anchors with |E| >= T: 0
//
// SEC 3 — WHAT E DOES TO THE CROSSING: measured K* vs main-term-predicted K*
//   band     n   <K*>   <K*pred zero-param>   <K*pred semi (true T)>   <K*-K*pred_semi>   frac |diff| <= 2
//   B3    40   3.88                  3.92                     4.03              -0.15   1.000
//   B4   103   8.42                  8.27                     8.27              +0.15   0.971
//   B5    71  12.20                 12.10                    12.08              +0.11   0.958
//   B6   208  16.88                 16.82                    16.78              +0.11   0.942
//   B7   292  23.34                 23.30                    23.32              +0.02   0.925
//   B8   491  31.22                 31.15                    31.13              +0.09   0.902
//
// SEC 4 — THE EXPONENT OF |E| IN THE WINDOW WIDTH, WITH THE ESTIMATOR CALIBRATED FIRST
//   --- u = 3.00, n = 1194 anchors with W >= 1000, 10 bins ---
//     measured  exponent of rms(E)  in W : 0.405 +- 0.022
//     CONTROL   same pipeline, synthetic Poisson-scale noise sd = sqrt(Xmain) : 0.479 +- 0.024   [truth: rms ∝ sqrt(Xmain)]
//     CONTROL   same pipeline, synthetic systematic noise sd = 0.02*Xmain     : 0.823 +- 0.026   [truth: rms ∝ Xmain]
//     reference exponent of rms(T)     in W : 0.812 +- 0.018    (what E must stay below)
//     reference exponent of rms(Xmain) in W : 0.839 +- 0.015
//     SPLIT-HALF on the measured E: low half 0.387 +- 0.073, high half 0.366 +- 0.051
//     GAP a proof must close: exponent(T) - exponent(E) = 0.407
//   --- u = u*, n = 1194 anchors with W >= 1000, 10 bins ---
//     measured  exponent of rms(E)  in W : 0.413 +- 0.022
//     CONTROL   same pipeline, synthetic Poisson-scale noise sd = sqrt(Xmain) : 0.483 +- 0.025   [truth: rms ∝ sqrt(Xmain)]
//     CONTROL   same pipeline, synthetic systematic noise sd = 0.02*Xmain     : 0.832 +- 0.025   [truth: rms ∝ Xmain]
//     reference exponent of rms(T)     in W : 0.812 +- 0.018    (what E must stay below)
//     reference exponent of rms(Xmain) in W : 0.847 +- 0.014
//     SPLIT-HALF on the measured E: low half 0.381 +- 0.051, high half 0.535 +- 0.032
//     GAP a proof must close: exponent(T) - exponent(E) = 0.399
//
// SEC 5 — THE SLACK CURVE: how loose may a proof-side bound on X be, and where does 3.29956 sit?
//   Lichtman 2025 factor (CITED): 3.29956; dimension-2 sifting limit beta_2 (CITED): 4.2665
//   band     n   <lnW/lnh>  min   slack at u*   s at u*   | depth where slack = 3.29956: <u>   <s = lnW/ln y>   frac with s >= 1
//   B3    40     0.709 0.621       1.310     2.608   |   40    2.792            1.980          1.000
//   B4   103     0.691 0.602       1.154     2.514   |  103    2.786            1.924          1.000
//   B5    71     0.669 0.595       1.118     2.419   |   71    2.770            1.855          1.000
//   B6   208     0.665 0.586       1.102     2.388   |  208    2.758            1.833          1.000
//   B7   292     0.653 0.580       1.084     2.350   |  292    2.750            1.797          1.000
//   B8   491     0.647 0.575       1.056     2.317   |  491    2.747            1.778          1.000
//   band     n   at s = beta_2 = 4.2665 (y = W^{1/beta_2}):  <u>   <Xmain/T>   [certificate needs < 1]
//   B5     1                                        5.607      3.054
//   B6    43                                        6.098      4.032
//   B7   149                                        6.481      4.924
//   B8   399                                        6.733      5.631
//
// SEC 6 — CONSISTENCY WITH Z1: does the main term alone reproduce Z1's reproduction target?
//   band     measured K*   main-term K*   measured K*/pool   main-term K*/pool   ratio(K*)
//   B3         3.88           3.92              0.093               0.093   1.013
//   B4         8.42           8.27              0.075               0.074   0.983
//   B5        12.20          12.10              0.061               0.060   0.992
//   B6        16.88          16.82              0.050               0.050   0.996
//   B7        23.34          23.30              0.040               0.040   0.998
//   B8        31.22          31.15              0.032               0.032   0.998
//
// done in 0.7s; assertion failures: 0
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
// 0. WHAT IS BEING PRICED, AND ON WHOSE PREMISE. The whole reading
//    rests on the capture identity floor_K = T - X(K)
//    (quadpoint-identity-01.md), which is HELD and has NEVER been
//    red-teamed — UNVERIFIED PREMISE. What this file verifies on its
//    own is narrower and is asserted in SEC 0: the window engine
//    reproduces the 25 cited K* values, max K* = 46 at Q = 9281, the
//    K = 0 certificate list, X(full) = 0 at every anchor, and Z1's
//    band means. If the identity is wrong, the census measured here
//    is still the census; only its reading as "the certificate" falls.
// 1. THE MAIN TERM IS CALIBRATED BEFORE ANYTHING IS PRICED
//    [MEASURED]. The zero-parameter Buchstab-corrected main term
//    reproduces the twin count at T/Tmain = 1.0109, 1.0072, 1.0262,
//    1.0090, 1.0024, 1.0019 across B3..B8 — 0.19% in the top band.
//    The naive fundamental-lemma product misses by exactly the known
//    rho(2) factor (T/Tnaive = 0.7945 at B8 against 1/rho(2) =
//    1.2609), so ONLY the corrected form is used to price E. This is
//    the one point where the truth of a pair count is known here.
// 2. THE DISCONFIRMING SIDE FIRST — E IS NOT SMALL AT EVERY ANCHOR.
//    The certificate must hold at every anchor, not on average. The
//    sup over all 1,206 anchors at u* is max |E|/T = 0.5628, at
//    Q = 269, and band maxima at u* are 0.5628, 0.4792, 0.2818,
//    0.3271, 0.1949, 0.2054 — NOT monotone (B6's 0.3271 exceeds B5's
//    0.2818). At u = 3 the sup is 0.5190, also at Q = 269. So there
//    are anchors where the true error is a fifth to a half of the
//    twin count. What does NOT happen anywhere: 0 of 1,206 anchors at
//    u* and 0 of 1,216 at u = 3 have |E| >= T.
// 3. THE SIZE OF E RELATIVE TO T, THE QUESTION THAT WAS ASKED
//    [MEASURED, 1,206 anchors, two decades]. <|E|>/<T> at u* falls
//    0.0934, 0.0759, 0.0462, 0.0401, 0.0298, 0.0255 across B3..B8 —
//    about 2.6% of the twin count in Q = [5624, 10007]. The
//    systematic part is smaller still and has the FAVOURABLE sign:
//    sumE/sumXmain at u* is -0.0311, -0.0089, +0.0056, -0.0044,
//    -0.0051, -0.0012, i.e. the census X sits BELOW its main term by
//    about a tenth of a percent in the top band. Same picture at
//    u = 2.5, 3, 4, 5.
// 4. THE DISPERSION IS AT OR BELOW POISSON SCALE [MEASURED, FIT-FREE].
//    chi2/df = <E^2/Xmain> is 0.546..0.785 at u*, 0.667..0.803 at
//    u = 3, and never exceeds 0.931 anywhere in SEC 2. Below 1 at
//    every band and every depth: sub-Poisson, no exponent required to
//    say it. This is the strongest single statement in the file
//    because it needs no fit.
// 5. THE EXPONENT, WITH ITS CONTROL BESIDE IT, AND ONE CONTROL FAILS
//    [MEASURED; the split-half disagrees at u*]. rms(E) as a power of
//    the window width W: 0.405 +- 0.022 at u = 3, 0.413 +- 0.022 at
//    u*. The estimator was calibrated first on synthetic noise of
//    KNOWN scale through the identical pipeline: sqrt(Xmain)-scale
//    returns 0.479 +- 0.024 (truth 0.5, so the pipeline carries a
//    ~0.02 low bias at this n) and Xmain-scale returns 0.823 +- 0.026,
//    the two classes cleanly separated. The measured value sits in
//    the Poisson class, ~3 s.e. BELOW even the Poisson control,
//    consistent with reading 4. THE SPLIT-HALF CONTROL FAILS AT u*:
//    low half 0.381 +- 0.051, high half 0.535 +- 0.032, a 2.5 s.e.
//    disagreement. At u = 3 it passes (0.387 +- 0.073, 0.366 +-
//    0.051). So the u* exponent is a range summary, NOT a law, and
//    per the linear-exponent-rule lesson (REFUTED.md, the H rule that
//    missed two sealed bands) no single exponent should be quoted.
// 6. THE GAP, AS A NUMBER. The same pipeline gives the twin count's
//    own exponent in W as 0.812 +- 0.018 (and Xmain's as 0.839/0.847).
//    exponent(T) - exponent(rms E) = 0.407 at u = 3, 0.399 at u*.
//    Over two decades of W the error grows at roughly the square root
//    of the rate T grows. MEASURED on this range; two decades decide
//    nothing asymptotic.
// 7. THE ERROR BARELY MOVES THE CROSSING [MEASURED]. Main-term-
//    predicted K* band means 3.92, 8.27, 12.10, 16.82, 23.30, 31.15
//    against measured 3.88, 8.42, 12.20, 16.88, 23.34, 31.22; mean
//    signed difference +0.09 at B8; a fraction 0.902 of B8 anchors is within 2
//    of the prediction that uses the true T. The depth cost is a
//    main-term phenomenon, not an error-term one.
// 8. THE PROOF SIDE, WHERE THE NUMBERS TURN AGAINST THE ROUTE.
//    The multiplicative looseness an upper bound on X may carry at
//    the crossing is slack = T/Xmain(u*) = 1.310, 1.154, 1.118,
//    1.102, 1.084, 1.056 — FALLING toward 1. Lichtman-grade looseness
//    (3.29956) only suffices at depth u = 2.747 in B8, which is
//    sifting parameter s = lnW/ln y = 1.778. And at the dimension-2
//    sifting limit s = beta_2 = 4.2665 the main term ALONE is
//    Xmain/T = 3.054, 4.032, 4.924, 5.631 across B5..B8 and RISING:
//    there the certificate fails on the main term, and no control of
//    the error term reaches it. The favourable truth of readings 3-6
//    buys nothing on the proof side by itself.
// 9. THE WINDOW IS SHORT IN THE TECHNICAL SENSE. <lnW/lnh> = 0.709,
//    0.691, 0.669, 0.665, 0.653, 0.647 across B3..B8, with band
//    minima 0.621..0.575 — the twin-Q minimal-width stretches, whose
//    width is 4Q + 4 = h^{1/2 + o(1)}. Both columns drift toward 0.5.
//    Every count above lives on an interval of that length.
// 10. CONSISTENT WITH Z1, NO FLAG RAISED [MEASURED]. Z1's
//    reproduction target (m6/m7/m8 = 0.050/0.040/0.032 and K* band
//    means 12.20 -> 31.22) is reproduced by this engine as a gate,
//    AND is reproduced from the zero-parameter main term alone:
//    main-term K*/pool 0.093, 0.074, 0.060, 0.050, 0.040, 0.032 and
//    K* 3.92 -> 31.15, ratio to measured 1.013, 0.983, 0.992, 0.996,
//    0.998, 0.998. The two readings agree; nothing here contradicts
//    Z1's verdict.
// 11. NO TPC CLAIM, NO ROUTE OPENED. Route B CLOSED, rho(2) ADVERSE.
//    The reading is: on this range the truth is favourable and the
//    obstruction is on the proof side — which is the wall's fourth
//    naming given coordinates, not a way past it.
// ============================================================
// FIGURE PROVENANCE. Lichtman 2025's 3.29956 and beta_2 = 4.2665 are
// CITED constants (quadpoint-prior-art.md 1.2 / the corpus sifting
// constant) and enter only as thresholds this file measures against;
// they are not re-derived. The 25 K* values, max K* = 46 at Q = 9281,
// the K = 0 certificate list and Z1's band means are CITED from the
// embedded OUTPUT of attack-quadpoint-01/02.js and are ASSERTED here
// as an engine gate, not recomputed as results. The capture identity
// is CITED from attack-quadpoint-03.js and is NOT re-verified here.
// The prior-art scratchpad root 3.565845 / 0.280438 is CITED from
// quadpoint-prior-art.md 2.2 and asserted against this file's own
// omega integrator. Every other figure is from this producer's own
// OUTPUT block.
// ============================================================
