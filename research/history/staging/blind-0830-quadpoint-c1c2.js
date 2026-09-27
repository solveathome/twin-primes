// ============================================================================
// BLIND 0830 QUADPOINT C1 VERSUS C2 — THE FIFTH DECADE, SEALED ON THE
// SAMPLING-ERROR SCALE: WHICH ZERO-PARAMETER FINITE-SIZE COMPARATOR IS THE
// MAIN TERM OF THE DEPTH LAW, THE EXACT-MERTENS PARTIAL PRODUCT (C1) OR THE
// OMEGA-AT-FINITE-u CROSSING (C2)?
// ============================================================================
// THE OBJECT (attack-quadpoint-01/02/03.js, restated so this file stands
// alone). Anchor Q prime >= 7, Q' the next prime, stretch S_Q = [Q^2, Q'^2);
// channel pairs (a, a+2) with a = 11, 17, 29 (mod 30), Q^2 <= a, a+2 < Q'^2;
// C = #pairs, T = #twins; actives p_1 < p_2 < ... = 7, 11, 13, ... <= Q,
// nR = pool = pi(Q) - 3 of them. X(K) = #both-composite pairs whose smaller
// lpf exceeds p_K (X(0) = CC). By the capture identity (quadpoint-identity-
// 01.md, PROVEN) floor_K = T - X(K); K* = least K with T - X(K) >= 1;
// y* = p_{K*}. y* exists iff T >= 1 (asserted at every anchor; every law
// below is stated on that set and the run cannot test the quantifier).
//
// THE FOUR ZERO-PARAMETER COMPARATORS, per anchor at h = Q^2 (identical to
// blind-0830-quadpoint-31607.js, the fourth decade's producer):
//   OLD  y = h^theta_old, theta_old = 1/(2 e^gamma)          (identity note §3)
//   NEW  y = h^theta_new, theta_new = 1/u*, u* root of u omega(u) = 2
//                                                     (prior-art note §2.2)
//   C1   least active y with prod_{7<=p<=y}(1 - 1/p) <= 7.5/ln h
//                                                     (u2-engine-depth.md §5)
//   C2   least K >= 1 with omega(ln h/ln p_K) < prod_{K<i<=nR}(1 - 1/p_i)
//                                                     (import-rough-anatomy.md §2.1)
//   OLD/NEW take K = pi(y) - 3; C1/C2 take K = the index of y.
//
// WHY THIS FILE EXISTS. At the fourth decade both C1 and C2 HIT every sealed
// row (tolerance +-0.0015 on L = ln y*/ln h), and POST HOC, unsealed, C1 sat
// above the data by 3.6 and 8.8 se at B11 and B12 while C2 did not. That
// preference was noticed after the run and is worth nothing until it is
// sealed and tested blind. This file seals it (stage seal) BEFORE any anchor
// above Q = 100003 is sieved, then runs the fifth decade (stages b13, b14).
//
// STAGES (one embedded tail each; the code above the first tail is shared):
//   --stage seal   width audit at the new level, omega gates, calibration
//                  gate on Q <= 10007 (digit-exact against attack-quadpoint-
//                  02.js / -03.js), the FOURTH-DECADE CUSTODY GATE (B9-B12
//                  re-run and asserted digit for digit against the tails of
//                  blind-0830-quadpoint-31607.js, forecasts included), the
//                  post-hoc z reading reproduced and the new D-rows dry-run on
//                  B9-B12, then the SEALED forecasts and rules for B13-B14.
//                  A mechanical guard fails the stage if any anchor above
//                  100003 is sieved by it.
//   --stage b13    B13 = (100003, 177828]; B12 re-run silently for the chain.
//   --stage b14    B14 = (177828, 316243]; B13 re-run silently for the chain.
// The forecasts are recomputed deterministically in every stage from the
// same code; the sealed values are the ones the seal tail prints.
//
// THE DISCRIMINATING STATISTIC (sealed in stage seal, scored in b13/b14):
//   per band b and comparator c in {C1, C2}:  z_c(b) = (L_b - F_c(b)) / se_b,
//   L_b the measured band mean of ln y*/ln h, F_c(b) the comparator's own
//   band mean (no sieving), se_b = sd_b / sqrt(n_b) with sd_b the measured
//   in-band sample sd. Rows:
//   D1 "C2-preferred"  HIT iff z_C1 <= -3 AND |z_C2| <= 2   (C1 above the data
//                      at >= 3 se, sign as observed post hoc; C2 within 2 se)
//   D2 "C1-preferred"  HIT iff |z_C2| >= 3 AND |z_C1| <= 2   (the converse)
//   D3 "C2 closer"     |z_C2| < |z_C1|  (necessary for D1, not sufficient)
//   class A = D1 HIT; B = D2 HIT; N = both |z| <= 2 (not separable at this
//   n); F = neither D1 nor D2 and not N (both main terms off at the sampling
//   scale; D3 says which is closer, and closer is not a HIT).
//   The y* band mean's z is printed as a check and is NOT scored.
//
// WIDTH AUDIT (the level this RUNS at): Q <= 316243, Q' = 316259,
// hi = Q'^2 ~ 1.0002e11 > 2^31 but < 2^53: every value is an exact double;
// v % 30, v % r, lo % r exact; first multiple of r at or above lo is
// lo + ((r - lo % r) % r), integer arithmetic, never ceil(lo/r)*r.
// width = (Q'-Q)(Q'+Q) < 2^31 is ASSERTED from this file's own prime gaps
// before any window is allocated; offsets index an Int32Array; no bit shifts.
//
// Everything is exact counting over a finite range; NO first-moment TPC
// claim (Route B CLOSED, research/REFUTED.md; rho(2) ADVERSE). HELD.
// No wall-clock figure is printed to stdout; progress goes to stderr.
// ============================================================================
'use strict';
const ARGS = process.argv.slice(2);
const argOf = (n, d) => { const i = ARGS.indexOf('--' + n); return i === -1 ? d : ARGS[i + 1]; };
const STAGE = argOf('stage', 'seal');
if (!['seal', 'b13', 'b14'].includes(STAGE)) { console.error('usage: --stage seal|b13|b14'); process.exit(2); }

let failures = 0;
function assertEq(tag, got, want) {
  if (got !== want) { failures++; console.log(`  ASSERT FAIL [${tag}]: got ${got} want ${want}`); return false; }
  return true;
}
function assertTrue(tag, cond) { if (!cond) { failures++; console.log(`  ASSERT FAIL [${tag}]`); } return cond; }
const f1 = (x) => x.toFixed(1), f2 = (x) => x.toFixed(2), f3 = (x) => x.toFixed(3), f4 = (x) => x.toFixed(4), f5 = (x) => x.toFixed(5), f6 = (x) => x.toFixed(6);
const sg = (x, f) => (x >= 0 ? '+' : '') + f(x);
const log = (s) => console.log(s);
const progress = (s) => process.stderr.write(s + '\n');
const pad = (s, n) => String(s).padStart(n);

// ---------- primes to 316800 (covers Q' = 316259) ---------------------------
const PLIM = 316800;
const flag = new Uint8Array(PLIM + 1); flag[0] = flag[1] = 1;
for (let p = 2; p * p <= PLIM; p++) if (!flag[p]) for (let m = p * p; m <= PLIM; m += p) flag[m] = 1;
const PRIMES = []; for (let n = 2; n <= PLIM; n++) if (!flag[n]) PRIMES.push(n);
const ACT = PRIMES.filter(p => p >= 7);
const QMAX_ALL = 316243;
const QMAX_SEEN = 100003;                            // the fourth decade's last anchor; the seal may not sieve past it
const ANCHORS = ACT.filter(p => p <= QMAX_ALL);      // anchor i has nR = i + 1
const nextPrime = (n) => PRIMES[PRIMES.findIndex(p => p > n)];
const isPrime = (n) => n <= PLIM && !flag[n];
function actCount(y) { let lo = 0, hi = ACT.length; while (lo < hi) { const m = (lo + hi) >> 1; if (ACT[m] <= y) lo = m + 1; else hi = m; } return lo; }
function largestPrimeLE(x) { let p = 2; for (const q of PRIMES) { if (q > x) break; p = q; } return p; }

// ---------- Mertens partial products over the actives -----------------------
const cum = new Float64Array(ACT.length + 1); cum[0] = 1;
for (let i = 0; i < ACT.length; i++) cum[i + 1] = cum[i] * (1 - 1 / ACT[i]);

// ---------- Buchstab omega on a grid ----------------------------------------
const GAMMA = 0.5772156649015329, EMG = Math.exp(-GAMMA);
const OM_D = 1e-5, OM_MAX = 14;
const OM_N = Math.round(OM_MAX / OM_D);
const omg = new Float64Array(OM_N + 1);
const Fg = new Float64Array(OM_N + 1);
{
  const n1 = Math.round(1 / OM_D);
  for (let i = 0; i <= OM_N; i++) {
    const u = 1 + i * OM_D;
    if (i <= n1) { omg[i] = 1 / u; Fg[i] = 1; continue; }
    Fg[i] = Fg[i - 1] + OM_D * (omg[i - 1 - n1] + omg[i - n1]) / 2;
    omg[i] = Fg[i] / u;
  }
}
function omega(u) {
  if (u >= OM_MAX) return EMG;
  if (u <= 1) return 1;
  const x = (u - 1) / OM_D, i = Math.floor(x), t = x - i;
  return omg[i] * (1 - t) + omg[Math.min(i + 1, OM_N)] * t;
}
function rootUomega2() {
  for (let i = 1; i <= OM_N; i++) if (Fg[i] >= 2) {
    const t = (2 - Fg[i - 1]) / (Fg[i] - Fg[i - 1]);
    return 1 + (i - 1 + t) * OM_D;
  }
  return NaN;
}
const USTAR = rootUomega2();
const THETA_OLD = 1 / (2 * Math.exp(GAMMA));
const THETA_NEW = 1 / USTAR;

// ---------- the four comparators, per anchor --------------------------------
function comparators(Q, nR) {
  const lnh = 2 * Math.log(Q);
  const out = {};
  for (const [name, th] of [['OLD', THETA_OLD], ['NEW', THETA_NEW]]) {
    const y = Math.exp(th * lnh);
    out[name] = { K: actCount(y), y, L: th };
  }
  { // C1
    const thr = 7.5 / lnh; let i = 1;
    while (i <= nR && cum[i] > thr) i++;
    const K = i <= nR ? i : -1;
    out.C1 = K > 0 ? { K, y: ACT[K - 1], L: Math.log(ACT[K - 1]) / lnh } : { K: -1, y: NaN, L: NaN };
  }
  { // C2
    let K = -1;
    for (let k = 1; k <= nR; k++) {
      const U = cum[nR] / cum[k];
      if (omega(lnh / Math.log(ACT[k - 1])) < U) { K = k; break; }
    }
    out.C2 = K > 0 ? { K, y: ACT[K - 1], L: Math.log(ACT[K - 1]) / lnh } : { K: -1, y: NaN, L: NaN };
  }
  return out;
}

// ---------- width audit, before any window is allocated ---------------------
let MAXGAP = 0, MAXGAP_AT = 0, MAXW = 0, HIMAX = 0;
let MAXGAP4 = 0, MAXGAP4_AT = 0, MAXW4 = 0, HIMAX4 = 0;   // restricted to Q <= 100003, for the custody gate
for (let i = 0; i < ANCHORS.length; i++) {
  const Q = ANCHORS[i], Qp = i + 1 < ANCHORS.length ? ANCHORS[i + 1] : nextPrime(Q);
  const w = Qp * Qp - Q * Q;
  if (Qp - Q > MAXGAP) { MAXGAP = Qp - Q; MAXGAP_AT = Q; }
  if (w > MAXW) MAXW = w;
  if (Qp * Qp > HIMAX) HIMAX = Qp * Qp;
  if (Q <= QMAX_SEEN) {
    if (Qp - Q > MAXGAP4) { MAXGAP4 = Qp - Q; MAXGAP4_AT = Q; }
    if (w > MAXW4) MAXW4 = w;
    if (Qp * Qp > HIMAX4) HIMAX4 = Qp * Qp;
  }
}
const lpfw = new Int32Array(MAXW + 4);            // first touch = active index + 1

// ---------- the identity-path engine (verbatim from the fourth decade) ------
let sievedAbove = 0;                              // anchors above QMAX_SEEN sieved by this process
function runAnchor(Qi) {
  const Q = ANCHORS[Qi], Qp = Qi + 1 < ANCHORS.length ? ANCHORS[Qi + 1] : nextPrime(Q);
  if (Q > QMAX_SEEN) { sievedAbove++; if (STAGE === 'seal') assertTrue(`SEAL BREACH: stage seal sieved Q = ${Q}`, false); }
  const lo = Q * Q, hi = Qp * Qp, width = hi - lo, nR = Qi + 1;
  lpfw.fill(0, 0, width + 3);
  for (let ri = 0; ri < nR; ri++) {
    const r = ACT[ri];
    const v0 = lo + ((r - lo % r) % r);
    for (let v = v0; v <= hi + 1; v += r) { const o = v - lo; if (lpfw[o] === 0) lpfw[o] = ri + 1; }
  }
  let C = 0, T = 0;
  const histo = new Int32Array(nR + 2);
  let a = lo + ((11 - lo % 30) + 30) % 30;
  const steps = [6, 12, 12]; let si = 0;
  {
    const r30 = lo % 30;
    if (r30 > 11 && r30 <= 17) { a = lo + (17 - r30); si = 1; }
    else if (r30 > 17 && r30 <= 29) { a = lo + (29 - r30); si = 2; }
  }
  for (; a + 2 < hi; a += steps[si], si = (si + 1) % 3) {
    C++;
    const iA = lpfw[a - lo], iB = lpfw[a + 2 - lo];
    if (iA === 0 && iB === 0) T++;
    else if (iA > 0 && iB > 0) histo[Math.min(iA, iB)]++;
  }
  let CC = 0; for (let d = 1; d <= nR; d++) CC += histo[d];
  let X = CC, Kstar = -1, XK = -1;
  for (let K = 0; K <= nR; K++) {
    if (K > 0) X -= histo[K];
    if (T - X >= 1) { Kstar = K; XK = X; break; }
  }
  assertTrue(`occupancy T >= 1 at Q=${Q}`, T >= 1);
  const ystar = Kstar > 0 ? ACT[Kstar - 1] : 1;
  return { Q, Qp, width, C, T, nR, CC, floor0: T - CC, Kstar, floorK: T - XK, ystar,
    L: Kstar > 0 ? Math.log(ystar) / (2 * Math.log(Q)) : NaN, twinQ: Qp - Q === 2 };
}
// independent T recount (second sieve: full composite mask by every prime <= Q)
const comp = new Uint8Array(MAXW + 4);
function recountT(Qi) {
  const Q = ANCHORS[Qi], Qp = Qi + 1 < ANCHORS.length ? ANCHORS[Qi + 1] : nextPrime(Q);
  const lo = Q * Q, hi = Qp * Qp, width = hi - lo;
  comp.fill(0, 0, width + 3);
  for (const p of PRIMES) { if (p > Q) break; for (let v = lo + ((p - lo % p) % p); v <= hi + 1; v += p) comp[v - lo] = 1; }
  let T = 0;
  for (let a = lo; a + 2 < hi; a++) { const c = a % 30; if ((c === 11 || c === 17 || c === 29) && !comp[a - lo] && !comp[a + 2 - lo]) T++; }
  return T;
}

// ---------- band statistics and the sealed rows -----------------------------
const COMPS = ['C2', 'C1', 'OLD', 'NEW'];
const TOL = { R1: 0.05, R2: 0.0015, R3: 0.05, R4: 0.006, R6K: 2, R7: 0.005, R8: 0.25, D_FAR: 3, D_NEAR: 2 };
function bandRange(name) {
  return { B3: [101, 313], B4: [317, 997], B5: [1009, 1499], B6: [1500, 3163], B7: [3164, 5623], B8: [5624, 10007],
    B9: [10008, 17783], B10: [17784, 31607], B11: [31608, 56234], B12: [56235, 100003],
    B13: [100004, 177828], B14: [177829, 316243] }[name];
}
function anchorsOf(name) { const [a, b] = bandRange(name); return ANCHORS.map((Q, i) => [Q, i]).filter(([Q]) => Q >= a && Q <= b); }
function forecastBand(name) {
  const idx = anchorsOf(name);
  const acc = {}; for (const c of COMPS) acc[c] = { K: 0, F: 0, L: 0, Y: 0, n: 0 };
  for (const [Q, i] of idx) {
    const cp = comparators(Q, i + 1);
    for (const c of COMPS) { const z = cp[c]; if (z.K < 0) continue; const s = acc[c]; s.K += z.K; s.F += z.K / (i + 1); s.L += z.L; s.Y += z.y; s.n++; }
  }
  const out = { n: idx.length };
  for (const c of COMPS) { const s = acc[c]; out[c] = { K: s.K / s.n, F: s.F / s.n, L: s.L / s.n, Y: s.Y / s.n, n: s.n }; }
  return out;
}
function measureBand(name) {
  const idx = anchorsOf(name);
  const rows = [];
  let k = 0;
  for (const [Q, i] of idx) {
    rows.push(runAnchor(i));
    if (++k % 500 === 0) progress(`  ${name}: ${k}/${idx.length} anchors (Q = ${Q})`);
  }
  const rs = rows.filter(r => r.Kstar > 0);
  const n = rs.length;
  const mean = (f) => rs.reduce((s, r) => s + f(r), 0) / n;
  const mF = mean(r => r.Kstar / r.nR), mK = mean(r => r.Kstar), mY = mean(r => r.ystar), mL = mean(r => r.L);
  const sdL = Math.sqrt(rs.reduce((s, r) => s + (r.L - mL) ** 2, 0) / (n - 1));
  const sdY = Math.sqrt(rs.reduce((s, r) => s + (r.ystar - mY) ** 2, 0) / (n - 1));
  const mxF = Math.max(...rs.map(r => r.Kstar / r.nR));
  const worstK = rs.reduce((w, r) => (r.Kstar > w.Kstar ? r : w));
  const tw = rs.filter(r => r.twinQ);
  const twF = tw.length ? tw.reduce((s, r) => s + r.Kstar / r.nR, 0) / tw.length : NaN;
  const twMx = tw.length ? Math.max(...tw.map(r => r.Kstar / r.nR)) : NaN;
  return { name, rows, n, nAll: rows.length, mF, mK, mY, mL, sdL, sdY, mxF, worstK, twN: tw.length, twF, twMx };
}
function scoreBand(b, prev, fc) {
  let nHit = 0, nMiss = 0;
  const hit = (ok) => { if (ok) nHit++; else nMiss++; return ok ? 'HIT ' : 'MISS'; };
  log(`  ${b.name} [${bandRange(b.name)[0]}, ${bandRange(b.name)[1]}]  n = ${b.n}  measured: m = ${f4(b.mF)}  K* mean ${f2(b.mK)}  y* mean ${f2(b.mY)}  L = ${f5(b.mL)} (sd ${f5(b.sdL)}, se ${f5(b.sdL / Math.sqrt(b.n))})  max ${f3(b.mxF)}`);
  log(`    row  comparator   forecast    measured    tolerance   verdict`);
  for (const c of COMPS) {
    const F = fc[c].F; log(`    R1   ${c.padEnd(4)}  m      ${pad(f4(F), 8)}   ${pad(f4(b.mF), 8)}   ±${f4(TOL.R1 * F)}     ${hit(Math.abs(b.mF - F) <= TOL.R1 * F)}`);
  }
  for (const c of COMPS) {
    const F = fc[c].L; log(`    R2   ${c.padEnd(4)}  L      ${pad(f5(F), 8)}   ${pad(f5(b.mL), 8)}   ±${f4(TOL.R2)}     ${hit(Math.abs(b.mL - F) <= TOL.R2)}   residual ${sg(b.mL - F, f5)}`);
  }
  for (const c of COMPS) {
    const F = fc[c].Y; log(`    R3   ${c.padEnd(4)}  y*     ${pad(f2(F), 8)}   ${pad(f2(b.mY), 8)}   ±${f2(TOL.R3 * F)}       ${hit(Math.abs(b.mY - F) <= TOL.R3 * F)}`);
  }
  for (const [nm, th] of [['/old', THETA_OLD], ['/new', THETA_NEW]]) {
    const F = fc.C1.L / th, r = b.mL / th;
    log(`    R4   C1${nm}  ratio  ${pad(f4(F), 8)}   ${pad(f4(r), 8)}   ±${f4(TOL.R4)}     ${hit(Math.abs(r - F) <= TOL.R4)}`);
  }
  log(`    R5   shape: m_prev = ${f4(prev.mF)} (${prev.name}), m = ${f4(b.mF)}  =>  ${hit(b.mF <= prev.mF).trim() === 'HIT' ? 'no bend (HIT)' : 'BEND FIRES (MISS)'}`);
  const supOK = b.mxF <= prev.mxF, kOK = b.worstK.Kstar <= TOL.R6K * fc.C2.K;
  log(`    R6   sup: max_prev = ${f3(prev.mxF)}, max = ${f3(b.mxF)} (${supOK ? 'ok' : 'RISES'}); largest K* = ${b.worstK.Kstar} at Q = ${b.worstK.Q} (pool ${b.worstK.nR}) vs 2 x C2 mean K* = ${f2(TOL.R6K * fc.C2.K)} (${kOK ? 'ok' : 'EXCEEDS'})  =>  ${hit(supOK && kOK).trim() === 'HIT' ? 'quiet (HIT)' : 'FLAG (MISS)'}`);
  log(`    R7   twin-Q: n = ${b.twN}, mean ${f4(b.twF)}, max ${f3(b.twMx)} vs all-band ${f4(b.mF)}  =>  ${hit(Math.abs(b.twF - b.mF) <= TOL.R7)}`);
  const missC2 = !(Math.abs(b.mF - fc.C2.F) <= TOL.R1 * fc.C2.F) || !(Math.abs(b.mL - fc.C2.L) <= TOL.R2) || !(Math.abs(b.mY - fc.C2.Y) <= TOL.R3 * fc.C2.Y);
  log(`    KILL ROWS R1-R3 on C2: ${missC2 ? 'AT LEAST ONE MISS — finite-size law REFUTED at ' + b.name : 'all HIT'}; score ${b.name}: ${nHit} HIT, ${nMiss} MISS of ${nHit + nMiss} sealed rows (R1-R7)`);
  const se = b.sdL / Math.sqrt(b.n), gap = THETA_OLD - THETA_NEW;
  log(`    asymptotes: L - theta_old = ${sg(b.mL - THETA_OLD, f5)}, L - theta_new = ${sg(b.mL - THETA_NEW, f5)}, theta_old - theta_new = ${f6(gap)}, se = ${f6(se)}, gap/se = ${f2(gap / se)}, C2 residual ${sg(b.mL - fc.C2.L, f5)}`);
}
// the discriminating rows, D1-D3, on the sampling-error scale
function discRows(b, fc) {
  const se = b.sdL / Math.sqrt(b.n);
  const z1 = (b.mL - fc.C1.L) / se, z2 = (b.mL - fc.C2.L) / se;
  const seY = b.sdY / Math.sqrt(b.n);
  const zy1 = (b.mY - fc.C1.Y) / seY, zy2 = (b.mY - fc.C2.Y) / seY;
  const d1 = z1 <= -TOL.D_FAR && Math.abs(z2) <= TOL.D_NEAR;
  const d2 = Math.abs(z2) >= TOL.D_FAR && Math.abs(z1) <= TOL.D_NEAR;
  const d3 = Math.abs(z2) < Math.abs(z1);
  const cls = d1 ? 'A (C2-preferred)' : d2 ? 'B (C1-preferred)' : (Math.abs(z1) <= TOL.D_NEAR && Math.abs(z2) <= TOL.D_NEAR) ? 'N (not separable at this n)' : 'F (both off at the sampling scale)';
  log(`    D    ${b.name}: se_L = ${f6(se)}; residual C1 ${sg(b.mL - fc.C1.L, f5)} = ${sg(z1, f2)} se; residual C2 ${sg(b.mL - fc.C2.L, f5)} = ${sg(z2, f2)} se; C1 - C2 forecast gap ${f5(fc.C1.L - fc.C2.L)} = ${f2((fc.C1.L - fc.C2.L) / se)} se`);
  log(`    D1   C2-preferred (z_C1 <= -3 and |z_C2| <= 2):  ${d1 ? 'HIT' : 'MISS'}`);
  log(`    D2   C1-preferred (|z_C2| >= 3 and |z_C1| <= 2):  ${d2 ? 'HIT' : 'MISS'}`);
  log(`    D3   C2 closer (|z_C2| < |z_C1|):                ${d3 ? 'HIT' : 'MISS'}`);
  log(`    K3   C2 off at the sampling scale (|z_C2| > 3):  ${Math.abs(z2) > TOL.D_FAR ? 'YES' : 'no'}`);
  log(`    class: ${cls}`);
  log(`    y* check (printed, not scored): se_y* = ${f2(seY)}; y* - C1 = ${sg(b.mY - fc.C1.Y, f2)} (${sg(zy1, f2)} se); y* - C2 = ${sg(b.mY - fc.C2.Y, f2)} (${sg(zy2, f2)} se)`);
  return { z1, z2, d1, d2, d3, cls };
}
function pointRow(Q) {
  const i = ANCHORS.indexOf(Q); assertTrue(`point anchor ${Q} is prime`, i >= 0);
  const r = runAnchor(i), cp = comparators(Q, i + 1);
  log(`  R8   Q = ${Q}: measured y* = ${r.ystar} (K* = ${r.Kstar}, pool ${r.nR}, T = ${r.T}, L = ${f5(r.L)})`);
  for (const c of COMPS) { const F = cp[c].y; log(`         ${c.padEnd(4)} forecast y* = ${f2(F)} (K = ${cp[c].K})   ±25%   ${Math.abs(r.ystar - F) <= TOL.R8 * F ? 'HIT' : 'MISS'}`); }
  return r;
}
function showRows(b, picks) {
  log('       Q   width       C      T  pool     CC    K*  K*/pool   y*   ln y*/ln h  twinQ');
  for (const r of b.rows) {
    if (!picks.has(r.Q)) continue;
    log(`  ${pad(r.Q, 6)}  ${pad(r.width, 9)}  ${pad(r.C, 7)}  ${pad(r.T, 6)}  ${pad(r.nR, 5)}  ${pad(r.CC, 7)}  ${pad(r.Kstar, 4)}   ${f4(r.Kstar / r.nR)}  ${pad(r.ystar, 5)}   ${f5(r.L)}   ${r.twinQ ? 'yes' : ''}`);
  }
}
function reproTarget(bands) {
  log('  reproduction target (band means of K*/pool | K* | y* | L), for any analytic bound:');
  log('    ' + bands.map(b => `${b.name}: ${f3(b.mF)} | ${f2(b.mK)} | ${f2(b.mY)} | ${f5(b.mL)}`).join('   '));
}

// ============================================================================
// THE CITED CALIBRATION CONSTANTS (from embedded OUTPUT blocks; asserted)
// ============================================================================
// attack-quadpoint-02.js lines 186-197 (v1 rows: Q width C T pool floor0 K* floor@K*)
const V1ROWS = [
  [7, 72, 6, 4, 1, 4, 0, 4], [11, 48, 4, 2, 2, 2, 0, 2], [13, 120, 11, 7, 3, 7, 0, 7],
  [23, 312, 30, 8, 6, 4, 0, 4], [43, 360, 35, 11, 11, 1, 0, 1], [61, 768, 76, 19, 15, -9, 1, 2],
  [67, 552, 54, 11, 16, -6, 1, 3], [71, 288, 28, 3, 17, -6, 4, 1], [101, 408, 40, 7, 23, -10, 2, 1],
  [149, 600, 59, 10, 32, -10, 2, 2], [199, 4920, 491, 52, 43, -143, 4, 6], [293, 8400, 839, 88, 59, -283, 5, 7],
  [401, 6480, 647, 54, 76, -244, 7, 3], [499, 4008, 400, 28, 92, -171, 9, 4], [601, 7248, 724, 52, 107, -291, 8, 2],
  [701, 11280, 1127, 79, 123, -488, 9, 4], [809, 3240, 323, 19, 137, -147, 16, 1], [907, 7272, 726, 59, 152, -313, 7, 4],
  [1009, 8088, 808, 54, 166, -370, 10, 8], [1103, 13272, 1326, 89, 182, -627, 11, 1], [1201, 28968, 2896, 194, 194, -1379, 12, 14],
  [1301, 5208, 520, 32, 209, -242, 13, 4], [1399, 28080, 2807, 174, 219, -1383, 13, 8], [1499, 36120, 3611, 224, 236, -1742, 13, 1],
];
// attack-quadpoint-02.js lines 328-346 (SEC 1: Q width C T pool floor0 K* K*/pool floor@K* twinQ)
const V2ROWS = [
  [1511, 36408, 3640, 217, 237, -1786, 15, '0.063', 8, false], [1999, 16008, 1600, 93, 300, -790, 16, '0.053', 2, false],
  [2503, 90432, 9042, 465, 365, -4698, 19, '0.052', 16, false], [2999, 12000, 1199, 54, 427, -661, 25, '0.059', 3, true],
  [3163, 25320, 2531, 135, 444, -1338, 18, '0.041', 1, false], [3511, 42168, 4216, 206, 487, -2261, 22, '0.045', 8, false],
  [4001, 16008, 1600, 69, 548, -879, 27, '0.049', 1, true], [4507, 54120, 5411, 256, 608, -2985, 21, '0.035', 9, false],
  [4999, 40008, 4000, 200, 666, -2233, 22, '0.033', 4, false], [5623, 180192, 18018, 803, 736, -10242, 27, '0.037', 28, false],
  [6007, 48072, 4806, 221, 781, -2689, 23, '0.029', 3, false], [6521, 104400, 10439, 441, 840, -5998, 27, '0.032', 3, false],
  [7001, 168168, 16816, 714, 898, -9722, 29, '0.032', 11, false], [7507, 150240, 15023, 618, 948, -8797, 34, '0.036', 12, false],
  [8009, 32040, 3203, 137, 1005, -1904, 31, '0.031', 3, true], [8513, 136272, 13626, 563, 1058, -8017, 32, '0.030', 13, false],
  [9001, 108048, 10804, 461, 1115, -6324, 33, '0.030', 3, false], [9497, 266112, 26610, 1080, 1174, -15675, 32, '0.027', 1, false],
  [10007, 40032, 4002, 160, 1227, -2388, 30, '0.024', 3, true],
];
// attack-quadpoint-02.js lines 349-357 and SEC 0 (v1 B3/B4): band n, K* mean, K*/pool mean, max
const BANDTAB = { B3: [40, '3.88', '0.093', '0.179'], B4: [103, '8.42', '0.075', '0.128'], B5: [71, '12.20', '0.061', '0.090'],
  B6: [208, '16.88', '0.050', '0.075'], B7: [292, '23.34', '0.040', '0.065'], B8: [491, '31.22', '0.032', '0.045'] };
// attack-quadpoint-02.js lines 359-368: twin-Q n, mean, max
const TWINTAB = { B3: [12, '0.093', '0.130'], B4: [15, '0.081', '0.128'], B5: [15, '0.067', '0.090'], B6: [33, '0.053', '0.075'], B7: [53, '0.041', '0.065'], B8: [70, '0.032', '0.044'] };
// attack-quadpoint-03.js lines 262-268: y* mean, ln y*/ln h mean, ratio to 0.2807
const V3TAB = { B3: ['16.15', '0.2624', '0.935'], B4: ['33.76', '0.2705', '0.963'], B5: ['48.92', '0.2720', '0.969'], B6: ['69.85', '0.2740', '0.976'], B7: ['100.42', '0.2749', '0.979'], B8: ['141.80', '0.2763', '0.984'] };

// THE FOURTH DECADE, blind-0830-quadpoint-31607.js tails 2-3 SEC F/G (band
// summary lines, "asymptotes" lines, R8 rows) and tail 1 SEC E (forecasts):
//   n, m, K* mean, y* mean, L, sd_L, se_L(6 dec), max, largest K* [K*, Q, pool],
//   twin-Q [n, mean, max], C2 residual, C1 residual, gap/se
const D4 = {
  B9: [810, '0.0257', '41.49', '197.22', '0.27705', '0.00394', '0.000138', '0.036', [56, 16691, 1927], [103, '0.0256', '0.036'], '-0.00022', '-0.00023', '2.10'],
  B10: [1361, '0.0204', '54.99', '272.88', '0.27744', '0.00300', '0.000081', '0.028', [71, 30491, 3288], [178, '0.0205', '0.028'], '-0.00009', '-0.00018', '3.58'],
  B11: [2302, '0.0162', '73.03', '384.70', '0.27858', '0.00250', '0.000052', '0.023', [102, 51197, 5235], [282, '0.0164', '0.023'], '-0.00002', '-0.00018', '5.60'],
  B12: [3890, '0.0128', '96.59', '532.71', '0.27875', '0.00200', '0.000032', '0.017', [129, 83561, 8152], [455, '0.0127', '0.017'], '-0.00009', '-0.00028', '9.09'],
};
const D4_REPRO = { B9: '0.026', B10: '0.020', B11: '0.016', B12: '0.013' };
// tail 1 SEC E: comp -> band -> [K/pool, L, y*, K]
const D4_FC = {
  C2: { B9: ['0.02568', '0.27727', '197.65', '41.53'], B10: ['0.02045', '0.27752', '272.91', '55.05'], B11: ['0.01620', '0.27860', '384.47', '72.96'], B12: ['0.01277', '0.27884', '533.39', '96.68'] },
  C1: { B9: ['0.02569', '0.27728', '197.69', '41.55'], B10: ['0.02048', '0.27762', '273.45', '55.14'], B11: ['0.01624', '0.27876', '385.79', '73.18'], B12: ['0.01282', '0.27903', '535.72', '97.05'] },
  OLD: { B9: ['0.02689', '0.28073', '210.92', '43.46'], B10: ['0.02140', '0.28073', '291.13', '57.58'], B11: ['0.01674', '0.28073', '402.27', '75.41'], B12: ['0.01318', '0.28073', '556.04', '99.69'] },
  NEW: { B9: ['0.02674', '0.28044', '209.75', '43.23'], B10: ['0.02131', '0.28044', '289.42', '57.33'], B11: ['0.01664', '0.28044', '399.77', '74.98'], B12: ['0.01311', '0.28044', '552.40', '99.16'] },
};
// tails 2-3 SEC G: point anchors [y*, K*, pool, T, L] and the point forecasts [C2 y, C2 K, C1 y, C1 K, OLD y, NEW y]
const D4_PT = { 31607: [313, 62, 3398, 3867, '0.27730', [313, 62, 317, 63, '336.1', '334.1']], 100003: [631, 112, 9590, 7972, '0.28000', [617, 110, 617, 110, '641.7', '637.4']] };

function calibrationGate() {
  log('SEC C — CALIBRATION GATE: Q <= 10007 reproduced digit-exact from the embedded blocks');
  const cal = {}; const all = [];
  for (const nm of ['B3', 'B4', 'B5', 'B6', 'B7', 'B8']) { cal[nm] = measureBand(nm); all.push(...cal[nm].rows); }
  const small = ANCHORS.map((Q, i) => [Q, i]).filter(([Q]) => Q < 101).map(([, i]) => runAnchor(i));
  const rowsAll = [...small, ...all];
  for (const [Q, w, C, T, pool, fl0, Ks, flK] of V1ROWS) {
    const r = rowsAll.find(x => x.Q === Q);
    assertTrue(`v1 row Q=${Q}`, r && r.width === w && r.C === C && r.T === T && r.nR === pool && r.floor0 === fl0 && r.Kstar === Ks && r.floorK === flK);
  }
  for (const [Q, w, C, T, pool, fl0, Ks, fr, flK, tq] of V2ROWS) {
    const r = rowsAll.find(x => x.Q === Q);
    assertTrue(`v2 row Q=${Q}`, r && r.width === w && r.C === C && r.T === T && r.nR === pool && r.floor0 === fl0 && r.Kstar === Ks && f3(r.Kstar / r.nR) === fr && r.floorK === flK && r.twinQ === tq);
  }
  const ok0 = rowsAll.filter(r => r.floor0 >= 1).map(r => r.Q);
  assertEq('K=0 certificate list', ok0.join(','), '7,11,13,19,23,31,37,43');
  for (const nm of Object.keys(BANDTAB)) {
    const b = cal[nm], [n, mK, mF, mx] = BANDTAB[nm];
    assertTrue(`band table ${nm}`, b.n === n && f2(b.mK) === mK && f3(b.mF) === mF && f3(b.mxF) === mx);
    const [tn, tF, tMx] = TWINTAB[nm];
    assertTrue(`twin-Q table ${nm}`, b.twN === tn && f3(b.twF) === tF && f3(b.twMx) === tMx);
    const [mY, mL, ratio] = V3TAB[nm];
    assertTrue(`v3 SEC 2 table ${nm}`, f2(b.mY) === mY && f4(b.mL) === mL && f3(b.mL / THETA_OLD) === ratio);
  }
  assertEq('v3 top-band mean/candidate', f4(cal.B8.mL / THETA_OLD), '0.9843');
  const w = cal.B8.worstK; assertTrue('largest K* = 46 at Q = 9281 (pool 1146)', w.Q === 9281 && w.Kstar === 46 && w.nR === 1146);
  assertTrue('Q = 9281: T = 127, CC = 2357, y* = 227', w.T === 127 && w.CC === 2357 && w.ystar === 227);
  const worst = rowsAll.filter(r => r.Kstar >= 0).reduce((a, r) => (r.Kstar / r.nR > a.Kstar / a.nR ? r : a));
  assertTrue('worst fraction Q = 29, K* = 2 of 7', worst.Q === 29 && worst.Kstar === 2 && worst.nR === 7);
  let bad = 0; for (const r of rowsAll) if (recountT(ANCHORS.indexOf(r.Q)) !== r.T) bad++;
  assertEq('independent T recount mismatches, all anchors <= 10007', bad, 0);
  log(`  ${rowsAll.length} anchors 7..10007: 24 v1 rows, 19 v2 rows, K = 0 list, six band tables, six twin-Q tables, six v3 SEC 2 rows, top-band 0.9843, largest K* and worst fraction, independent T recount: ${failures === 0 ? 'ALL REPRODUCED' : failures + ' FAILURES'}`);
  return cal;
}

function fourthDecadeGate(cal) {
  log('\nSEC C2 — FOURTH-DECADE CUSTODY GATE: B9-B12 re-run with this engine and asserted digit for digit against blind-0830-quadpoint-31607.js tails 1-3');
  const before = failures;
  const d4 = {};
  let prev = cal.B8;
  for (const nm of ['B9', 'B10', 'B11', 'B12']) {
    progress(`custody gate: re-running ${nm}`);
    const b = measureBand(nm); d4[nm] = b;
    const fc = forecastBand(nm);
    const [n, m, mK, mY, mL, sd, se, mx, [wK, wQ, wP], [tn, tF, tMx], rC2, rC1, gse] = D4[nm];
    assertTrue(`${nm} n = ${n}`, b.n === n && b.nAll === n && b.rows.every(r => r.T >= 1 && r.Kstar > 0));
    assertTrue(`${nm} m = ${m}`, f4(b.mF) === m);
    assertTrue(`${nm} K* mean ${mK}`, f2(b.mK) === mK);
    assertTrue(`${nm} y* mean ${mY}`, f2(b.mY) === mY);
    assertTrue(`${nm} L = ${mL}`, f5(b.mL) === mL);
    assertTrue(`${nm} sd_L ${sd}`, f5(b.sdL) === sd);
    assertTrue(`${nm} se_L ${se}`, f6(b.sdL / Math.sqrt(b.n)) === se);
    assertTrue(`${nm} max ${mx}`, f3(b.mxF) === mx);
    assertTrue(`${nm} largest K* ${wK} at ${wQ} pool ${wP}`, b.worstK.Kstar === wK && b.worstK.Q === wQ && b.worstK.nR === wP);
    assertTrue(`${nm} twin-Q ${tn} ${tF} ${tMx}`, b.twN === tn && f4(b.twF) === tF && f3(b.twMx) === tMx);
    assertTrue(`${nm} C2 residual ${rC2}`, f5(b.mL - fc.C2.L) === rC2);
    assertTrue(`${nm} C1 residual ${rC1}`, f5(b.mL - fc.C1.L) === rC1);
    assertTrue(`${nm} gap/se ${gse}`, f2((THETA_OLD - THETA_NEW) / (b.sdL / Math.sqrt(b.n))) === gse);
    assertTrue(`${nm} repro target ${D4_REPRO[nm]}`, f3(b.mF) === D4_REPRO[nm]);
    assertTrue(`${nm} no bend, sup quiet`, b.mF <= prev.mF && b.mxF <= prev.mxF);
    for (const c of COMPS) {
      const [F, L, Y, K] = D4_FC[c][nm];
      assertTrue(`${nm} sealed forecast ${c}`, f5(fc[c].F) === F && f5(fc[c].L) === L && f2(fc[c].Y) === Y && f2(fc[c].K) === K);
    }
    let bad = 0, cnt = 0;
    for (let j = 0; j < b.rows.length; j += 25) { cnt++; if (recountT(ANCHORS.indexOf(b.rows[j].Q)) !== b.rows[j].T) bad++; }
    assertEq(`${nm} independent T recount mismatches on ${cnt} sampled anchors`, bad, 0);
    prev = b;
  }
  for (const Q of [31607, 100003]) {
    const [y, K, pool, T, L, [c2y, c2k, c1y, c1k, oy, ny]] = D4_PT[Q];
    const r = d4[Q === 31607 ? 'B10' : 'B12'].rows.find(x => x.Q === Q), cp = comparators(Q, ANCHORS.indexOf(Q) + 1);
    assertTrue(`point ${Q}: y* ${y}, K* ${K}, pool ${pool}, T ${T}, L ${L}`, r && r.ystar === y && r.Kstar === K && r.nR === pool && r.T === T && f5(r.L) === L);
    assertTrue(`point ${Q}: forecasts`, cp.C2.y === c2y && cp.C2.K === c2k && cp.C1.y === c1y && cp.C1.K === c1k && f1(cp.OLD.y) === oy && f1(cp.NEW.y) === ny);
  }
  assertTrue('width audit to 100003: largest gap 72 at 31397, width 11484288, hi 10003800361', MAXGAP4 === 72 && MAXGAP4_AT === 31397 && MAXW4 === 11484288 && HIMAX4 === 10003800361);
  log(`  8363 anchors 10009..100003: four band summaries (n, m, K* mean, y* mean, L, sd, se, max, largest K*, twin-Q), the C2 and C1 residuals, gap/se, the 3-decimal reproduction target, all 16 sealed forecast rows, the two point rows, the width audit: ${failures === before ? 'ALL REPRODUCED' : (failures - before) + ' FAILURES'}`);
  return d4;
}

// ============================================================================
if (STAGE === 'seal') {
  log('SEC A — WIDTH AUDIT (the level this file runs at)');
  log(`  primes sieved to ${PLIM}; anchors 7..${QMAX_ALL} (${ANCHORS.length} of them); next prime above ${QMAX_ALL} = ${nextPrime(QMAX_ALL)}`);
  log(`  largest prime gap among anchors: ${MAXGAP} at Q = ${MAXGAP_AT}; largest window width ${MAXW}; largest hi = ${HIMAX}`);
  assertTrue('largest width < 2^31', MAXW < 2 ** 31);
  assertTrue('largest hi + 1 is a safe integer (< 2^53)', Number.isSafeInteger(HIMAX + 1));
  assertTrue('lpf table allocated at MAXW + 4', lpfw.length === MAXW + 4);
  assertTrue('316243 is a prime anchor and the last one', isPrime(316243) && ANCHORS[ANCHORS.length - 1] === 316243);
  assertEq('largest prime <= 177828', largestPrimeLE(177828), 177823);
  assertEq('largest prime <= 316228 (10^5.5 = 316227.77)', largestPrimeLE(316228), 316223);
  assertEq('primes between 316227.77 and 316243', PRIMES.filter(p => p > 316227 && p < 316243).join(','), '316241');
  assertEq('pool at Q = 177823 is pi(177823) - 3', ANCHORS.indexOf(177823) + 1, 16141);
  assertEq('pool at Q = 316243 is pi(316243) - 3', ANCHORS.indexOf(316243) + 1, 27292);
  log(`  band anchor counts: ${['B13', 'B14'].map(b => `${b} = ${anchorsOf(b).length}`).join(', ')}; band edges B13 = (100003, 177828], B14 = (177828, 316243]; point anchors 177823 and 316243`);

  log('\nSEC B — OMEGA GRID GATES AND THE TWO ASYMPTOTES');
  log(`  omega(2) = ${f6(omega(2))} (want 0.5); 3 omega(3) = ${f6(3 * omega(3))} (want 1 + ln 2 = ${f6(1 + Math.log(2))}); omega(12) = ${f6(omega(12))} (e^-gamma = ${f6(EMG)})`);
  assertTrue('omega gates to 5 decimals', Math.abs(omega(2) - 0.5) < 1e-5 && Math.abs(3 * omega(3) - 1 - Math.log(2)) < 1e-5 && Math.abs(omega(12) - EMG) < 1e-5);
  log(`  root of u omega(u) = 2: u* = ${USTAR.toFixed(7)}; 1/u* = theta_new = ${f6(THETA_NEW)}; theta_old = 1/(2e^gamma) = ${f6(THETA_OLD)}; theta_old - theta_new = ${f6(THETA_OLD - THETA_NEW)}`);
  log('  comparator cross-check against import-rough-anatomy.md §3\'s scratchpad-grade forward row (printed, not asserted):');
  { const cp = comparators(316243, ANCHORS.indexOf(316243) + 1);
    log(`    Q = 316243: this file  C2 K ${cp.C2.K} y ${cp.C2.y} L ${f5(cp.C2.L)};  C1 K ${cp.C1.K} y ${cp.C1.y} L ${f5(cp.C1.L)};  OLD y ${f1(cp.OLD.y)} K ${cp.OLD.K};  NEW y ${f1(cp.NEW.y)} K ${cp.NEW.K}   | note: C2 K 192, y 1187, L 0.27949`); }

  log('');
  const cal = calibrationGate();
  const d4 = fourthDecadeGate(cal);
  assertEq('anchors above 100003 sieved by this stage', sievedAbove, 0);
  if (failures > 0) { log('CALIBRATION OR CUSTODY GATE FAILED — nothing sealed'); log(`assertion failures: ${failures}`); process.exitCode = 1; }
  else {
    log('\nSEC D — THE POST-HOC READING REPRODUCED, AND THE D-ROWS DRY-RUN ON B9-B12 (post hoc, disclosed as such; nothing here is a sealed score)');
    let rms = 0;
    for (const nm of ['B9', 'B10', 'B11', 'B12']) {
      const fc = forecastBand(nm);
      discRows(d4[nm], fc);
      rms += (d4[nm].mL - fc.C2.L) ** 2;
    }
    rms = Math.sqrt(rms / 4);
    log(`  C2 rms residual on B9-B12: ${f6(rms)}; distinguishability criterion (c) needs < ${f6((THETA_OLD - THETA_NEW) / 3)}: ${rms < (THETA_OLD - THETA_NEW) / 3 ? 'passes' : 'FAILS, as on B3-B8 (0.000294)'}`);

    log('\nSEC E — SEALED FORECASTS AND RULES FOR B13-B14 (no anchor above 100003 has been sieved by this stage; asserted above)');
    log(`  carried rows and tolerances (fourth decade, unchanged): R1 ±5% rel, R2 ±${TOL.R2}, R3 ±5% rel, R4 ±${TOL.R4}, R5 no bend, R6 largest K* <= ${TOL.R6K} x C2 mean K*, R7 ±${TOL.R7}, R8 ±25%; R1-R3 on C2 are the kill rows of the finite-size law`);
    log(`  new rows: D1 C2-preferred HIT iff z_C1 <= -${TOL.D_FAR} and |z_C2| <= ${TOL.D_NEAR}; D2 C1-preferred HIT iff |z_C2| >= ${TOL.D_FAR} and |z_C1| <= ${TOL.D_NEAR}; D3 C2 closer iff |z_C2| < |z_C1|; z_c = (L_b - F_c)/se_b, se_b = sd_b/sqrt(n_b) measured in band; K3 flags |z_C2| > ${TOL.D_FAR}`);
    log('  band   n_pred   comp   K/pool(F)    L(F)      y*(F)    K(F)     r_old(F)  r_new(F)   se_L(sd B12)  se_L(trend)');
    const sd12 = d4.B12.sdL;
    const sdTrend = { B13: d4.B12.sdL * (d4.B12.sdL / d4.B11.sdL), B14: d4.B12.sdL * (d4.B12.sdL / d4.B11.sdL) ** 2 };
    for (const nm of ['B13', 'B14']) {
      const fc = forecastBand(nm), seC = sd12 / Math.sqrt(fc.n), seT = sdTrend[nm] / Math.sqrt(fc.n);
      for (const c of COMPS) log(`  ${nm.padEnd(4)}  ${pad(fc.n, 5)}    ${c.padEnd(4)}   ${f5(fc[c].F)}    ${f5(fc[c].L)}   ${pad(f2(fc[c].Y), 8)}   ${pad(f2(fc[c].K), 7)}   ${f4(fc[c].L / THETA_OLD)}    ${f4(fc[c].L / THETA_NEW)}    ${f6(seC)}      ${f6(seT)}`);
      log(`  ${nm}: C1 - C2 forecast gap in L = ${f5(fc.C1.L - fc.C2.L)} = ${f2((fc.C1.L - fc.C2.L) / seC)} se (sd B12) = ${f2((fc.C1.L - fc.C2.L) / seT)} se (trend); C2 deficit against theta_new ${f5(THETA_NEW - fc.C2.L)}, against theta_old ${f5(THETA_OLD - fc.C2.L)}`);
    }
    log(`  se(sd B12) uses sd_L(B12) = ${f5(sd12)} unchanged (an upper edge, sd fell 0.00394 -> 0.00200 over B9-B12); se(trend) continues the last ratio sd(B12)/sd(B11) = ${f4(d4.B12.sdL / d4.B11.sdL)} per band; the scored se is the MEASURED in-band one`);
    log('  point forecasts (R8):');
    for (const Q of [177823, 316243]) { const cp = comparators(Q, ANCHORS.indexOf(Q) + 1); log(`    Q = ${Q}: ${COMPS.map(c => `${c} ${f1(cp[c].y)} (K ${cp[c].K})`).join('   ')}`); }
    log('  pre-declared expectations, written before the run: (i) R1-R3 on C2 and on C1 HIT at both bands (the ±0.0015 rows cannot separate them, the forecasts differ by 0.0002); OLD/NEW MISS R2 at both bands and HIT R1/R3;');
    log('    (ii) D1 at B13 and B14 is the test: C1 sits 8 to 20 se above C2 by forecast, so the outcome is set by where the data sit relative to C2 alone; class A if C2\'s residual stays within 2 se, class F with D3 HIT if C2 is off by more than 2 se on the negative side (as at B12, -2.8 se), class B only if the data climb to C1;');
    log('    (iii) the asymptotes are not separable at this decade: criterion (c) fails before the run (C2 rms residual on B9-B12 above 0.000097), and the forecast deficit below both asymptotes is 4 to 6 times their 0.000291 difference;');
    log('    (iv) y* exists iff T >= 1; every anchor is asserted T >= 1; the run tests nothing about the quantifier and nothing asymptotic moves whatever the score.');
    log('  kill rules, sealed: K1 any MISS on R1-R3(C2) at a band marks the finite-size law REFUTED at that band, no repair; K2 the C2-preferred reading (C2 is the better main term; the drift mechanism is the omega-at-finite-u crossing and not the exact partial product) is CONFIRMED at the sampling scale iff D1 HITs at both bands, PARTIAL iff D1 HITs at one band and the other is class F with D3 HIT, REFUTED iff D2 HITs at either band or D3 MISSes at both bands; K3 |z_C2| > 3 at both bands records C2 itself as off at the sampling scale (a missing finite-size term), without touching the ±0.0015 law.');
  }
}

if (STAGE === 'b13' || STAGE === 'b14') {
  const chain = STAGE === 'b13' ? 'B12' : 'B13';
  const band = STAGE === 'b13' ? 'B13' : 'B14';
  const point = STAGE === 'b13' ? 177823 : 316243;
  log(`SEC F — THE BLIND RUN: ${band} (chain band ${chain} re-run silently)`);
  progress(`re-running ${chain} for the chain`);
  const prev = measureBand(chain);
  log(`  chain band ${chain}: n = ${prev.n}, m = ${f4(prev.mF)}, max ${f3(prev.mxF)}, K* mean ${f2(prev.mK)}, y* mean ${f2(prev.mY)}, L = ${f5(prev.mL)} (sd ${f5(prev.sdL)})`);
  if (chain === 'B12') assertTrue('chain B12 reproduces the fourth decade', f4(prev.mF) === '0.0128' && f2(prev.mK) === '96.59' && f3(prev.mxF) === '0.017' && f5(prev.mL) === '0.27875');
  progress(`running ${band}`);
  const b = measureBand(band);
  let bad = 0, cnt = 0;
  for (let j = 0; j < b.rows.length; j += 25) { cnt++; if (recountT(ANCHORS.indexOf(b.rows[j].Q)) !== b.rows[j].T) bad++; }
  assertEq(`independent T recount mismatches on ${cnt} sampled anchors of ${band}`, bad, 0);
  const picks = new Set(b.rows.filter((r, j) => j % Math.max(1, Math.floor(b.rows.length / 8)) === 0).map(r => r.Q));
  picks.add(b.rows[b.rows.length - 1].Q); picks.add(b.worstK.Q);
  log(`\n  ${band}: ${b.nAll} anchors, ${b.n} with K* > 0, ${b.rows.filter(r => r.T < 1).length} with T = 0`);
  showRows(b, picks);
  const fc = forecastBand(band);
  scoreBand(b, prev, fc);
  log('  the discriminating rows (sealed in the seal tail):');
  discRows(b, fc);
  log('\nSEC G — POINT ROW, REPRODUCTION TARGET');
  const pr = pointRow(point);
  assertTrue(`point anchor ${point} is the band's last row`, b.rows[b.rows.length - 1].Q === point && b.rows[b.rows.length - 1].ystar === pr.ystar);
  reproTarget([b]);
}

log(`\nassertion failures: ${failures}`);
log(failures === 0 ? 'ALL ASSERTIONS PASS' : `FAILURES: ${failures}`);
if (failures > 0) process.exitCode = 1;
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --tail 1 research/history/staging/blind-0830-quadpoint-c1c2.js -- --stage seal
//   invocation:  node research/history/staging/blind-0830-quadpoint-c1c2.js --stage seal
//   code-sha256: a626a40fa88fb4fc75b14fe07c3871fe35a9141389b3655c8d525a87aff1a935
//   out-sha256:  9ab9c64e80a9b8a82d693c98532fd5821a56bb2f5d28ef28f0815ed3671a3038
//   body-lines:  74
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     250.2 s
// ============================================================================
// SEC A — WIDTH AUDIT (the level this file runs at)
//   primes sieved to 316800; anchors 7..316243 (27292 of them); next prime above 316243 = 316259
//   largest prime gap among anchors: 86 at Q = 155921; largest window width 43909320; largest hi = 100019755081
//   band anchor counts: B13 = 6551, B14 = 11151; band edges B13 = (100003, 177828], B14 = (177828, 316243]; point anchors 177823 and 316243
//
// SEC B — OMEGA GRID GATES AND THE TWO ASYMPTOTES
//   omega(2) = 0.500000 (want 0.5); 3 omega(3) = 1.693147 (want 1 + ln 2 = 1.693147); omega(12) = 0.561459 (e^-gamma = 0.561459)
//   root of u omega(u) = 2: u* = 3.5658466; 1/u* = theta_new = 0.280438; theta_old = 1/(2e^gamma) = 0.280730; theta_old - theta_new = 0.000291
//   comparator cross-check against import-rough-anatomy.md §3's scratchpad-grade forward row (printed, not asserted):
//     Q = 316243: this file  C2 K 192 y 1187 L 0.27949;  C1 K 193 y 1193 L 0.27969;  OLD y 1224.7 K 197;  NEW y 1215.7 K 195   | note: C2 K 192, y 1187, L 0.27949
//
// SEC C — CALIBRATION GATE: Q <= 10007 reproduced digit-exact from the embedded blocks
//   1227 anchors 7..10007: 24 v1 rows, 19 v2 rows, K = 0 list, six band tables, six twin-Q tables, six v3 SEC 2 rows, top-band 0.9843, largest K* and worst fraction, independent T recount: ALL REPRODUCED
//
// SEC C2 — FOURTH-DECADE CUSTODY GATE: B9-B12 re-run with this engine and asserted digit for digit against blind-0830-quadpoint-31607.js tails 1-3
//   8363 anchors 10009..100003: four band summaries (n, m, K* mean, y* mean, L, sd, se, max, largest K*, twin-Q), the C2 and C1 residuals, gap/se, the 3-decimal reproduction target, all 16 sealed forecast rows, the two point rows, the width audit: ALL REPRODUCED
//
// SEC D — THE POST-HOC READING REPRODUCED, AND THE D-ROWS DRY-RUN ON B9-B12 (post hoc, disclosed as such; nothing here is a sealed score)
//     D    B9: se_L = 0.000138; residual C1 -0.00023 = -1.70 se; residual C2 -0.00022 = -1.62 se; C1 - C2 forecast gap 0.00001 = 0.07 se
//     D1   C2-preferred (z_C1 <= -3 and |z_C2| <= 2):  MISS
//     D2   C1-preferred (|z_C2| >= 3 and |z_C1| <= 2):  MISS
//     D3   C2 closer (|z_C2| < |z_C1|):                HIT
//     K3   C2 off at the sampling scale (|z_C2| > 3):  no
//     class: N (not separable at this n)
//     y* check (printed, not scored): se_y* = 0.83; y* - C1 = -0.47 (-0.57 se); y* - C2 = -0.43 (-0.52 se)
//     D    B10: se_L = 0.000081; residual C1 -0.00018 = -2.23 se; residual C2 -0.00009 = -1.05 se; C1 - C2 forecast gap 0.00010 = 1.18 se
//     D1   C2-preferred (z_C1 <= -3 and |z_C2| <= 2):  MISS
//     D2   C1-preferred (|z_C2| >= 3 and |z_C1| <= 2):  MISS
//     D3   C2 closer (|z_C2| < |z_C1|):                HIT
//     K3   C2 off at the sampling scale (|z_C2| > 3):  no
//     class: F (both off at the sampling scale)
//     y* check (printed, not scored): se_y* = 0.81; y* - C1 = -0.57 (-0.70 se); y* - C2 = -0.02 (-0.03 se)
//     D    B11: se_L = 0.000052; residual C1 -0.00018 = -3.46 se; residual C2 -0.00002 = -0.39 se; C1 - C2 forecast gap 0.00016 = 3.08 se
//     D1   C2-preferred (z_C1 <= -3 and |z_C2| <= 2):  HIT
//     D2   C1-preferred (|z_C2| >= 3 and |z_C1| <= 2):  MISS
//     D3   C2 closer (|z_C2| < |z_C1|):                HIT
//     K3   C2 off at the sampling scale (|z_C2| > 3):  no
//     class: A (C2-preferred)
//     y* check (printed, not scored): se_y* = 0.84; y* - C1 = -1.09 (-1.29 se); y* - C2 = +0.23 (+0.28 se)
//     D    B12: se_L = 0.000032; residual C1 -0.00028 = -8.83 se; residual C2 -0.00009 = -2.82 se; C1 - C2 forecast gap 0.00019 = 6.01 se
//     D1   C2-preferred (z_C1 <= -3 and |z_C2| <= 2):  MISS
//     D2   C1-preferred (|z_C2| >= 3 and |z_C1| <= 2):  MISS
//     D3   C2 closer (|z_C2| < |z_C1|):                HIT
//     K3   C2 off at the sampling scale (|z_C2| > 3):  no
//     class: F (both off at the sampling scale)
//     y* check (printed, not scored): se_y* = 0.92; y* - C1 = -3.01 (-3.27 se); y* - C2 = -0.68 (-0.74 se)
//   C2 rms residual on B9-B12: 0.000129; distinguishability criterion (c) needs < 0.000097: FAILS, as on B3-B8 (0.000294)
//
// SEC E — SEALED FORECASTS AND RULES FOR B13-B14 (no anchor above 100003 has been sieved by this stage; asserted above)
//   carried rows and tolerances (fourth decade, unchanged): R1 ±5% rel, R2 ±0.0015, R3 ±5% rel, R4 ±0.006, R5 no bend, R6 largest K* <= 2 x C2 mean K*, R7 ±0.005, R8 ±25%; R1-R3 on C2 are the kill rows of the finite-size law
//   new rows: D1 C2-preferred HIT iff z_C1 <= -3 and |z_C2| <= 2; D2 C1-preferred HIT iff |z_C2| >= 3 and |z_C1| <= 2; D3 C2 closer iff |z_C2| < |z_C1|; z_c = (L_b - F_c)/se_b, se_b = sd_b/sqrt(n_b) measured in band; K3 flags |z_C2| > 3
//   band   n_pred   comp   K/pool(F)    L(F)      y*(F)    K(F)     r_old(F)  r_new(F)   se_L(sd B12)  se_L(trend)
//   B13    6551    C2     0.01004    0.27897     737.02    127.92   0.9937    0.9947    0.000025      0.000020
//   B13    6551    C1     0.01009    0.27919     740.94    128.49   0.9945    0.9955    0.000025      0.000020
//   B13    6551    OLD    0.01037    0.28073     768.05    132.01   1.0000    1.0010    0.000025      0.000020
//   B13    6551    NEW    0.01031    0.28044     762.77    131.20   0.9990    1.0000    0.000025      0.000020
//   B13: C1 - C2 forecast gap in L = 0.00022 = 9.00 se (sd B12) = 11.23 se (trend); C2 deficit against theta_new 0.00147, against theta_old 0.00176
//   B14   11151    C2     0.00787    0.27925    1022.55    169.23   0.9947    0.9957    0.000019      0.000012
//   B14   11151    C1     0.00792    0.27949    1028.80    170.11   0.9956    0.9966    0.000019      0.000012
//   B14   11151    OLD    0.00810    0.28073    1061.02    174.09   1.0000    1.0010    0.000019      0.000012
//   B14   11151    NEW    0.00805    0.28044    1053.36    173.03   0.9990    1.0000    0.000019      0.000012
//   B14: C1 - C2 forecast gap in L = 0.00024 = 12.86 se (sd B12) = 20.01 se (trend); C2 deficit against theta_new 0.00119, against theta_old 0.00148
//   se(sd B12) uses sd_L(B12) = 0.00200 unchanged (an upper edge, sd fell 0.00394 -> 0.00200 over B9-B12); se(trend) continues the last ratio sd(B12)/sd(B11) = 0.8016 per band; the scored se is the MEASURED in-band one
//   point forecasts (R8):
//     Q = 177823: C2 857.0 (K 145)   C1 859.0 (K 146)   OLD 886.5 (K 150)   NEW 880.2 (K 148)
//     Q = 316243: C2 1187.0 (K 192)   C1 1193.0 (K 193)   OLD 1224.7 (K 197)   NEW 1215.7 (K 195)
//   pre-declared expectations, written before the run: (i) R1-R3 on C2 and on C1 HIT at both bands (the ±0.0015 rows cannot separate them, the forecasts differ by 0.0002); OLD/NEW MISS R2 at both bands and HIT R1/R3;
//     (ii) D1 at B13 and B14 is the test: C1 sits 8 to 20 se above C2 by forecast, so the outcome is set by where the data sit relative to C2 alone; class A if C2's residual stays within 2 se, class F with D3 HIT if C2 is off by more than 2 se on the negative side (as at B12, -2.8 se), class B only if the data climb to C1;
//     (iii) the asymptotes are not separable at this decade: criterion (c) fails before the run (C2 rms residual on B9-B12 above 0.000097), and the forecast deficit below both asymptotes is 4 to 6 times their 0.000291 difference;
//     (iv) y* exists iff T >= 1; every anchor is asserted T >= 1; the run tests nothing about the quantifier and nothing asymptotic moves whatever the score.
//   kill rules, sealed: K1 any MISS on R1-R3(C2) at a band marks the finite-size law REFUTED at that band, no repair; K2 the C2-preferred reading (C2 is the better main term; the drift mechanism is the omega-at-finite-u crossing and not the exact partial product) is CONFIRMED at the sampling scale iff D1 HITs at both bands, PARTIAL iff D1 HITs at one band and the other is class F with D3 HIT, REFUTED iff D2 HITs at either band or D3 MISSes at both bands; K3 |z_C2| > 3 at both bands records C2 itself as off at the sampling scale (a missing finite-size term), without touching the ±0.0015 law.
//
// assertion failures: 0
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
//
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --tail 2 research/history/staging/blind-0830-quadpoint-c1c2.js -- --stage b13
//   invocation:  node research/history/staging/blind-0830-quadpoint-c1c2.js --stage b13
//   code-sha256: a626a40fa88fb4fc75b14fe07c3871fe35a9141389b3655c8d525a87aff1a935
//   out-sha256:  2b939af9fc39b0c7d0632129daa0a486bf0095083d77ca3dd4c11799f2c71d84
//   body-lines:  57
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     1162.9 s
// ============================================================================
// SEC F — THE BLIND RUN: B13 (chain band B12 re-run silently)
//   chain band B12: n = 3890, m = 0.0128, max 0.017, K* mean 96.59, y* mean 532.71, L = 0.27875 (sd 0.00200)
//
//   B13: 6551 anchors, 6551 with K* > 0, 0 with T = 0
//        Q   width       C      T  pool     CC    K*  K*/pool   y*   ln y*/ln h  twinQ
//   100019    4801488   480148   11989   9591   335641   109   0.0114    613   0.27874
//   109519    3943008   394300    9712  10409   276329   114   0.0110    643   0.27862
//   119173    1430112   143010    3492  11227   100604   118   0.0105    661   0.27779
//   128677    1544160   154415    3760  12045   108892   118   0.0098    661   0.27598
//   138289    6085200   608519   14385  12863   429948   126   0.0098    727   0.27832
//   148147    1185192   118518    2790  13681    83857   129   0.0094    743   0.27762
//   157769     631080    63107    1408  14499    44699   138   0.0095    811   0.27982   yes
//   167759    4026360   402635    9312  15317   286455   139   0.0091    821   0.27890
//   169007     676032    67602    1435  15409    48158   167   0.0108   1013   0.28746   yes
//   177761     711048    71104    1588  16135    50650   152   0.0094    907   0.28169   yes
//   177823    5690592   569058   12776  16141   405458   144   0.0089    853   0.27914
//   B13 [100004, 177828]  n = 6551  measured: m = 0.0100  K* mean 127.91  y* mean 737.02  L = 0.27894 (sd 0.00149, se 0.00002)  max 0.013
//     row  comparator   forecast    measured    tolerance   verdict
//     R1   C2    m        0.0100     0.0100   ±0.0005     HIT
//     R1   C1    m        0.0101     0.0100   ±0.0005     HIT
//     R1   OLD   m        0.0104     0.0100   ±0.0005     HIT
//     R1   NEW   m        0.0103     0.0100   ±0.0005     HIT
//     R2   C2    L       0.27897    0.27894   ±0.0015     HIT    residual -0.00002
//     R2   C1    L       0.27919    0.27894   ±0.0015     HIT    residual -0.00025
//     R2   OLD   L       0.28073    0.27894   ±0.0015     MISS   residual -0.00179
//     R2   NEW   L       0.28044    0.27894   ±0.0015     HIT    residual -0.00150
//     R3   C2    y*       737.02     737.02   ±36.85       HIT
//     R3   C1    y*       740.94     737.02   ±37.05       HIT
//     R3   OLD   y*       768.05     737.02   ±38.40       HIT
//     R3   NEW   y*       762.77     737.02   ±38.14       HIT
//     R4   C1/old  ratio    0.9945     0.9936   ±0.0060     HIT
//     R4   C1/new  ratio    0.9955     0.9947   ±0.0060     HIT
//     R5   shape: m_prev = 0.0128 (B12), m = 0.0100  =>  no bend (HIT)
//     R6   sup: max_prev = 0.017, max = 0.013 (ok); largest K* = 167 at Q = 169007 (pool 15409) vs 2 x C2 mean K* = 255.83 (ok)  =>  quiet (HIT)
//     R7   twin-Q: n = 727, mean 0.0101, max 0.013 vs all-band 0.0100  =>  HIT
//     KILL ROWS R1-R3 on C2: all HIT; score B13: 16 HIT, 1 MISS of 17 sealed rows (R1-R7)
//     asymptotes: L - theta_old = -0.00179, L - theta_new = -0.00150, theta_old - theta_new = 0.000291, se = 0.000018, gap/se = 15.81, C2 residual -0.00002
//   the discriminating rows (sealed in the seal tail):
//     D    B13: se_L = 0.000018; residual C1 -0.00025 = -13.33 se; residual C2 -0.00002 = -1.26 se; C1 - C2 forecast gap 0.00022 = 12.07 se
//     D1   C2-preferred (z_C1 <= -3 and |z_C2| <= 2):  HIT
//     D2   C1-preferred (|z_C2| >= 3 and |z_C1| <= 2):  MISS
//     D3   C2 closer (|z_C2| < |z_C1|):                HIT
//     K3   C2 off at the sampling scale (|z_C2| > 3):  no
//     class: A (C2-preferred)
//     y* check (printed, not scored): se_y* = 0.93; y* - C1 = -3.92 (-4.23 se); y* - C2 = +0.00 (+0.00 se)
//
// SEC G — POINT ROW, REPRODUCTION TARGET
//   R8   Q = 177823: measured y* = 853 (K* = 144, pool 16141, T = 12776, L = 0.27914)
//          C2   forecast y* = 857.00 (K = 145)   ±25%   HIT
//          C1   forecast y* = 859.00 (K = 146)   ±25%   HIT
//          OLD  forecast y* = 886.45 (K = 150)   ±25%   HIT
//          NEW  forecast y* = 880.23 (K = 148)   ±25%   HIT
//   reproduction target (band means of K*/pool | K* | y* | L), for any analytic bound:
//     B13: 0.010 | 127.91 | 737.02 | 0.27894
//
// assertion failures: 0
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
//
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --tail 3 research/history/staging/blind-0830-quadpoint-c1c2.js -- --stage b14
//   invocation:  node research/history/staging/blind-0830-quadpoint-c1c2.js --stage b14
//   code-sha256: a626a40fa88fb4fc75b14fe07c3871fe35a9141389b3655c8d525a87aff1a935
//   out-sha256:  a9bbb3f05ca4202dff60467d4dd03cc55d7f103e7f060b32fae973546d3c0d5b
//   body-lines:  57
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     1371.7 s
// ============================================================================
// SEC F — THE BLIND RUN: B14 (chain band B13 re-run silently)
//   chain band B13: n = 6551, m = 0.0100, max 0.013, K* mean 127.91, y* mean 737.02, L = 0.27894 (sd 0.00149)
//
//   B14: 11151 anchors, 11151 with K* > 0, 0 with T = 0
//        Q   width       C      T  pool     CC    K*  K*/pool   y*   ln y*/ln h  twinQ
//   177839     711360    71135    1629  16142    50694   136   0.0084    797   0.27633   yes
//   194581    3891720   389171    8730  17535   278323   149   0.0085    881   0.27840
//   211457    5075112   507510   11047  18928   363497   162   0.0086    977   0.28073
//   228737    6404832   640482   13761  20321   459836   166   0.0082   1009   0.28025
//   246073   11812080  1181207   25472  21714   849458   168   0.0077   1019   0.27900
//   263519    1054080   105407    2273  23107    76071   174   0.0075   1051   0.27870   yes
//   280859    6740760   674075   14422  24500   486747   177   0.0072   1069   0.27796
//   298211    1192848   119284    2370  25860    86315   215   0.0083   1361   0.28622   yes
//   298679    1194720   119471    2455  25893    86341   186   0.0072   1129   0.27877   yes
//   316193    5059152   505914   10476  27286   366362   192   0.0070   1187   0.27950
//   316243   10120032  1012002   20882  27292   732873   190   0.0070   1171   0.27896
//   B14 [177829, 316243]  n = 11151  measured: m = 0.0079  K* mean 169.19  y* mean 1022.47  L = 0.27923 (sd 0.00117, se 0.00001)  max 0.010
//     row  comparator   forecast    measured    tolerance   verdict
//     R1   C2    m        0.0079     0.0079   ±0.0004     HIT
//     R1   C1    m        0.0079     0.0079   ±0.0004     HIT
//     R1   OLD   m        0.0081     0.0079   ±0.0004     HIT
//     R1   NEW   m        0.0081     0.0079   ±0.0004     HIT
//     R2   C2    L       0.27925    0.27923   ±0.0015     HIT    residual -0.00002
//     R2   C1    L       0.27949    0.27923   ±0.0015     HIT    residual -0.00026
//     R2   OLD   L       0.28073    0.27923   ±0.0015     MISS   residual -0.00150
//     R2   NEW   L       0.28044    0.27923   ±0.0015     HIT    residual -0.00121
//     R3   C2    y*      1022.55    1022.47   ±51.13       HIT
//     R3   C1    y*      1028.80    1022.47   ±51.44       HIT
//     R3   OLD   y*      1061.02    1022.47   ±53.05       HIT
//     R3   NEW   y*      1053.36    1022.47   ±52.67       HIT
//     R4   C1/old  ratio    0.9956     0.9946   ±0.0060     HIT
//     R4   C1/new  ratio    0.9966     0.9957   ±0.0060     HIT
//     R5   shape: m_prev = 0.0100 (B13), m = 0.0079  =>  no bend (HIT)
//     R6   sup: max_prev = 0.013, max = 0.010 (ok); largest K* = 215 at Q = 298211 (pool 25860) vs 2 x C2 mean K* = 338.46 (ok)  =>  quiet (HIT)
//     R7   twin-Q: n = 1183, mean 0.0079, max 0.010 vs all-band 0.0079  =>  HIT
//     KILL ROWS R1-R3 on C2: all HIT; score B14: 16 HIT, 1 MISS of 17 sealed rows (R1-R7)
//     asymptotes: L - theta_old = -0.00150, L - theta_new = -0.00121, theta_old - theta_new = 0.000291, se = 0.000011, gap/se = 26.33, C2 residual -0.00002
//   the discriminating rows (sealed in the seal tail):
//     D    B14: se_L = 0.000011; residual C1 -0.00026 = -23.82 se; residual C2 -0.00002 = -1.82 se; C1 - C2 forecast gap 0.00024 = 22.01 se
//     D1   C2-preferred (z_C1 <= -3 and |z_C2| <= 2):  HIT
//     D2   C1-preferred (|z_C2| >= 3 and |z_C1| <= 2):  MISS
//     D3   C2 closer (|z_C2| < |z_C1|):                HIT
//     K3   C2 off at the sampling scale (|z_C2| > 3):  no
//     class: A (C2-preferred)
//     y* check (printed, not scored): se_y* = 0.92; y* - C1 = -6.33 (-6.88 se); y* - C2 = -0.08 (-0.09 se)
//
// SEC G — POINT ROW, REPRODUCTION TARGET
//   R8   Q = 316243: measured y* = 1171 (K* = 190, pool 27292, T = 20882, L = 0.27896)
//          C2   forecast y* = 1187.00 (K = 192)   ±25%   HIT
//          C1   forecast y* = 1193.00 (K = 193)   ±25%   HIT
//          OLD  forecast y* = 1224.73 (K = 197)   ±25%   HIT
//          NEW  forecast y* = 1215.72 (K = 195)   ±25%   HIT
//   reproduction target (band means of K*/pool | K* | y* | L), for any analytic bound:
//     B14: 0.008 | 169.19 | 1022.47 | 0.27923
//
// assertion failures: 0
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
// ============================================================================
// (written after the three tails were bound; every figure appears in a tail
// above; the adjudication text belongs to the staging note of the same name)
// 1. THE SEAL HELD [custody]. Tail 1 (--stage seal) bound the width audit,
//    the calibration gate (1227 anchors, ALL REPRODUCED), the fourth-decade
//    custody gate (8363 anchors, ALL REPRODUCED digit for digit), the D-row
//    dry run and the forecast table, and asserted "anchors above 100003
//    sieved by this stage" = 0, before tails 2 and 3 sieved any; all three
//    tails share code-sha256 a626a40f...; no --force anywhere.
// 2. THE SCORE [MEASURED, blind]. 17702 new anchors 100019 <= Q <= 316243,
//    all with T >= 1. Carried rows: B13 16 HIT 1 MISS, B14 16 HIT 1 MISS of
//    17; R8 8 HIT of 8. The only MISS is OLD on R2. Kill rows R1-R3 on C2
//    all HIT. NEW HIT R2 at both bands (-0.00150, -0.00121), against the
//    pre-declared expectation that it would MISS.
// 3. THE DISCRIMINATING ROWS: D1 HIT at B13 (C1 -13.33 se, C2 -1.26 se) and
//    at B14 (C1 -23.82 se, C2 -1.82 se); D2 MISS, D3 HIT, K3 no at both;
//    class A at both. By the sealed K2 rule the C2-preferred reading is
//    CONFIRMED at the sampling scale. The y* check agrees (C1 -4.23 and
//    -6.88 se; C2 +0.00 and -0.09 se).
// 4. NO BEND, SUP QUIET, TWIN-Q CONVERGED: m = 0.0100 -> 0.0079 from the
//    reproduced 0.0128; maxes 0.013 -> 0.010; largest K* 167 (Q = 169007)
//    and 215 (Q = 298211), both twin-Q; twin-Q means 0.0101 and 0.0079
//    against all-band 0.0100 and 0.0079.
// 5. THE ASYMPTOTES ARE NOT SEPARATED. L - theta_old = -0.00179, -0.00150;
//    L - theta_new = -0.00150, -0.00121; four to six times 0.000291;
//    gap/se 15.81 and 26.33, so the sampling error would allow it and the
//    pre-declared criterion (c) forbids it (C2 rms residual on B9-B12
//    0.000129 > 0.000097). The run separates two mechanisms, not two
//    constants. Nothing asymptotic is decided.
// ============================================================================
