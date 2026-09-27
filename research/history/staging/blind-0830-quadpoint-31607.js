// ============================================================================
// BLIND 0830 QUADPOINT 31607 — THE ZERO-PARAMETER DEPTH LAW'S BLIND TEST AT
// THE THIRD DECADE (AND THE FOURTH IF IT FITS): FRESH WIDTH AUDIT, SEALED
// FORECASTS ON BOTH ASYMPTOTIC FORMS AND ON THE TWO FINITE-SIZE COMPARATORS,
// THE RUN PAST Q = 10007, SCORED ROW BY ROW.
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
// THE FOUR ZERO-PARAMETER COMPARATORS, per anchor at h = Q^2:
//   OLD  y = h^theta_old, theta_old = 1/(2 e^gamma)          (identity note §3)
//   NEW  y = h^theta_new, theta_new = 1/u*, u* root of u omega(u) = 2
//                                                     (prior-art note §2.2)
//   C1   least active y with prod_{7<=p<=y}(1 - 1/p) <= 7.5/ln h
//                                                     (u2-engine-depth.md §5)
//   C2   least K >= 1 with omega(ln h/ln p_K) < prod_{K<i<=nR}(1 - 1/p_i)
//                                                     (import-rough-anatomy.md §2.1)
//   OLD/NEW take K = pi(y) - 3; C1/C2 take K = the index of y.
//
// STAGES (one embedded tail each; the code above the first tail is shared):
//   --stage seal     width audit, omega gates, calibration gate on Q <= 10007
//                    (digit-exact against the embedded blocks of
//                    attack-quadpoint-02.js and -03.js), the row machinery
//                    dry-run on B6-B8, and the SEALED forecast table for
//                    B9-B12. This stage cannot sieve any Q > 10007.
//   --stage decade3  B9 = (10007, 17783], B10 = (17783, 31607]; B8 re-run
//                    silently for the shape chain. Scored against the seal.
//   --stage decade4  B11 = (31607, 56234], B12 = (56234, 100003]; B10 re-run
//                    silently for the chain. Scored against the seal.
// The forecasts are recomputed deterministically in every stage from the
// same code; the sealed values are the ones tail 1 prints.
//
// WIDTH AUDIT (the level this RUNS at): Q <= 100003, Q' <= 100019,
// hi = Q'^2 <= 100019^2 ~ 1.0004e10 > 2^31 but < 2^53: every value is an
// exact double; v % 30, v % r, lo % r exact; first multiple of r at or above
// lo is lo + ((r - lo % r) % r), integer arithmetic, never ceil(lo/r)*r.
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
if (!['seal', 'decade3', 'decade4'].includes(STAGE)) { console.error('usage: --stage seal|decade3|decade4'); process.exit(2); }

let failures = 0;
function assertEq(tag, got, want) {
  if (got !== want) { failures++; console.log(`  ASSERT FAIL [${tag}]: got ${got} want ${want}`); return false; }
  return true;
}
function assertTrue(tag, cond) { if (!cond) { failures++; console.log(`  ASSERT FAIL [${tag}]`); } return cond; }
const f2 = (x) => x.toFixed(2), f3 = (x) => x.toFixed(3), f4 = (x) => x.toFixed(4), f5 = (x) => x.toFixed(5), f6 = (x) => x.toFixed(6);
const log = (s) => console.log(s);
const progress = (s) => process.stderr.write(s + '\n');
const pad = (s, n) => String(s).padStart(n);

// ---------- primes to 100100 (covers Q' = 100019) --------------------------
const PLIM = 100100;
const flag = new Uint8Array(PLIM + 1); flag[0] = flag[1] = 1;
for (let p = 2; p * p <= PLIM; p++) if (!flag[p]) for (let m = p * p; m <= PLIM; m += p) flag[m] = 1;
const PRIMES = []; for (let n = 2; n <= PLIM; n++) if (!flag[n]) PRIMES.push(n);
const ACT = PRIMES.filter(p => p >= 7);
const QMAX_ALL = 100003;
const ANCHORS = ACT.filter(p => p <= QMAX_ALL);      // anchor i has nR = i + 1
const nextPrime = (n) => PRIMES[PRIMES.findIndex(p => p > n)];
const isPrime = (n) => n <= PLIM && !flag[n];
// count of actives <= y (= pi(y) - 3 for y >= 5)
function actCount(y) { let lo = 0, hi = ACT.length; while (lo < hi) { const m = (lo + hi) >> 1; if (ACT[m] <= y) lo = m + 1; else hi = m; } return lo; }

// ---------- Mertens partial products over the actives -----------------------
// cum[i] = prod_{j<=i} (1 - 1/p_j), cum[0] = 1
const cum = new Float64Array(ACT.length + 1); cum[0] = 1;
for (let i = 0; i < ACT.length; i++) cum[i + 1] = cum[i] * (1 - 1 / ACT[i]);

// ---------- Buchstab omega on a grid ----------------------------------------
const GAMMA = 0.5772156649015329, EMG = Math.exp(-GAMMA);
const OM_D = 1e-5, OM_MAX = 14;
const OM_N = Math.round(OM_MAX / OM_D);
const omg = new Float64Array(OM_N + 1);           // omega(1 + i*d)
const Fg = new Float64Array(OM_N + 1);            // u*omega(u)
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
for (let i = 0; i < ANCHORS.length; i++) {
  const Q = ANCHORS[i], Qp = i + 1 < ANCHORS.length ? ANCHORS[i + 1] : nextPrime(Q);
  const w = Qp * Qp - Q * Q;
  if (Qp - Q > MAXGAP) { MAXGAP = Qp - Q; MAXGAP_AT = Q; }
  if (w > MAXW) MAXW = w;
  if (Qp * Qp > HIMAX) HIMAX = Qp * Qp;
}
const lpfw = new Int32Array(MAXW + 4);            // first touch = active index + 1

// ---------- the identity-path engine ----------------------------------------
function runAnchor(Qi) {
  const Q = ANCHORS[Qi], Qp = Qi + 1 < ANCHORS.length ? ANCHORS[Qi + 1] : nextPrime(Q);
  const lo = Q * Q, hi = Qp * Qp, width = hi - lo, nR = Qi + 1;
  lpfw.fill(0, 0, width + 3);
  for (let ri = 0; ri < nR; ri++) {
    const r = ACT[ri];
    const v0 = lo + ((r - lo % r) % r);
    for (let v = v0; v <= hi + 1; v += r) { const o = v - lo; if (lpfw[o] === 0) lpfw[o] = ri + 1; }
  }
  // independent second count of T: composite mask by ALL primes <= Q
  // (2, 3, 5 included; on channel positions they never divide, so the two
  // counts must agree — a real second code path for T).
  let C = 0, T = 0;
  const histo = new Int32Array(nR + 2);
  // wheel walk over openers a = 11, 17, 29 (mod 30)
  let a = lo + ((11 - lo % 30) + 30) % 30;      // first a >= lo with a = 11 mod 30
  // step pattern from residue 11: +6 -> 17, +12 -> 29, +12 -> 41 = 11
  const steps = [6, 12, 12]; let si = 0;
  // align: if lo's residue is beyond 11 we may have skipped 17 or 29 of the same block
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
  // X(K) = #cc with minIdx > K, suffix sums; K* = least K with T - X(K) >= 1
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
const TOL = { R1: 0.05, R2: 0.0015, R3: 0.05, R4: 0.006, R6K: 2, R7: 0.005, R8: 0.25 };
function bandRange(name) {
  return { B3: [101, 313], B4: [317, 997], B5: [1009, 1499], B6: [1500, 3163], B7: [3164, 5623], B8: [5624, 10007],
    B9: [10008, 17783], B10: [17784, 31607], B11: [31608, 56234], B12: [56235, 100003] }[name];
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
function measureBand(name, quiet) {
  const idx = anchorsOf(name);
  const rows = [];
  let k = 0;
  for (const [Q, i] of idx) {
    rows.push(runAnchor(i));
    if (++k % 200 === 0) progress(`  ${name}: ${k}/${idx.length} anchors (Q = ${Q})`);
  }
  const rs = rows.filter(r => r.Kstar > 0);
  const n = rs.length;
  const mean = (f) => rs.reduce((s, r) => s + f(r), 0) / n;
  const mF = mean(r => r.Kstar / r.nR), mK = mean(r => r.Kstar), mY = mean(r => r.ystar), mL = mean(r => r.L);
  const sdL = Math.sqrt(rs.reduce((s, r) => s + (r.L - mL) ** 2, 0) / (n - 1));
  const mxF = Math.max(...rs.map(r => r.Kstar / r.nR));
  const worstK = rs.reduce((w, r) => (r.Kstar > w.Kstar ? r : w));
  const tw = rs.filter(r => r.twinQ);
  const twF = tw.length ? tw.reduce((s, r) => s + r.Kstar / r.nR, 0) / tw.length : NaN;
  const twMx = tw.length ? Math.max(...tw.map(r => r.Kstar / r.nR)) : NaN;
  return { name, rows, n, nAll: rows.length, mF, mK, mY, mL, sdL, mxF, worstK, twN: tw.length, twF, twMx };
}
function scoreBand(b, prev, fc) {
  // b: measured band; prev: measured previous band (for R5/R6 chain); fc: forecastBand(b.name)
  let nHit = 0, nMiss = 0;
  const hit = (ok) => { if (ok) nHit++; else nMiss++; return ok ? 'HIT ' : 'MISS'; };
  log(`  ${b.name} [${bandRange(b.name)[0]}, ${bandRange(b.name)[1]}]  n = ${b.n}  measured: m = ${f4(b.mF)}  K* mean ${f2(b.mK)}  y* mean ${f2(b.mY)}  L = ${f5(b.mL)} (sd ${f5(b.sdL)}, se ${f5(b.sdL / Math.sqrt(b.n))})  max ${f3(b.mxF)}`);
  log(`    row  comparator   forecast    measured    tolerance   verdict`);
  for (const c of COMPS) {
    const F = fc[c].F; log(`    R1   ${c.padEnd(4)}  m      ${pad(f4(F), 8)}   ${pad(f4(b.mF), 8)}   ±${f4(TOL.R1 * F)}     ${hit(Math.abs(b.mF - F) <= TOL.R1 * F)}`);
  }
  for (const c of COMPS) {
    const F = fc[c].L; log(`    R2   ${c.padEnd(4)}  L      ${pad(f5(F), 8)}   ${pad(f5(b.mL), 8)}   ±${f4(TOL.R2)}     ${hit(Math.abs(b.mL - F) <= TOL.R2)}   residual ${(b.mL - F >= 0 ? '+' : '') + f5(b.mL - F)}`);
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
  // distinguishability
  const se = b.sdL / Math.sqrt(b.n), gap = THETA_OLD - THETA_NEW;
  log(`    asymptotes: L - theta_old = ${(b.mL - THETA_OLD >= 0 ? '+' : '') + f5(b.mL - THETA_OLD)}, L - theta_new = ${(b.mL - THETA_NEW >= 0 ? '+' : '') + f5(b.mL - THETA_NEW)}, theta_old - theta_new = ${f6(gap)}, se = ${f6(se)}, gap/se = ${f2(gap / se)}, C2 residual ${(b.mL - fc.C2.L >= 0 ? '+' : '') + f5(b.mL - fc.C2.L)}`);
}
function pointRow(Q) {
  const i = ANCHORS.indexOf(Q); assertTrue(`point anchor ${Q} is prime`, i >= 0);
  const r = runAnchor(i), cp = comparators(Q, i + 1);
  log(`  R8   Q = ${Q}: measured y* = ${r.ystar} (K* = ${r.Kstar}, pool ${r.nR}, T = ${r.T}, L = ${f5(r.L)})`);
  for (const c of COMPS) { const F = cp[c].y; log(`         ${c.padEnd(4)} forecast y* = ${f2(F)} (K = ${cp[c].K})   ±25%   ${Math.abs(r.ystar - F) <= TOL.R8 * F ? 'HIT' : 'MISS'}`); }
}
function showRows(b, picks) {
  log('       Q   width       C      T  pool     CC    K*  K*/pool   y*   ln y*/ln h  twinQ');
  for (const r of b.rows) {
    if (!picks.has(r.Q)) continue;
    log(`  ${pad(r.Q, 6)}  ${pad(r.width, 8)}  ${pad(r.C, 6)}  ${pad(r.T, 5)}  ${pad(r.nR, 4)}  ${pad(r.CC, 6)}  ${pad(r.Kstar, 4)}   ${f4(r.Kstar / r.nR)}  ${pad(r.ystar, 4)}   ${f5(r.L)}   ${r.twinQ ? 'yes' : ''}`);
  }
}
function reproTarget(bands) {
  log('  reproduction target (band means of K*/pool | K* | y*), for any analytic bound:');
  log('    ' + bands.map(b => `${b.name}: ${f3(b.mF)} | ${f2(b.mK)} | ${f2(b.mY)}`).join('   '));
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

function calibrationGate() {
  log('SEC C — CALIBRATION GATE: Q <= 10007 reproduced digit-exact from the embedded blocks');
  const cal = {}; const all = [];
  for (const nm of ['B3', 'B4', 'B5', 'B6', 'B7', 'B8']) { cal[nm] = measureBand(nm, true); all.push(...cal[nm].rows); }
  // the anchors below 101 (for v1 rows and the K = 0 list)
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
  assertEq('max K* over K=0-dead anchors Q <= 1499', Math.max(...rowsAll.filter(r => r.Q <= 1499 && r.floor0 < 1).map(r => r.Kstar)), 21);
  // independent T recount at every anchor <= 10007
  let bad = 0; for (const r of rowsAll) if (recountT(ANCHORS.indexOf(r.Q)) !== r.T) bad++;
  assertEq('independent T recount mismatches, all anchors <= 10007', bad, 0);
  log(`  ${rowsAll.length} anchors 7..10007: 24 v1 rows, 19 v2 rows, K = 0 list, six band tables (n, K* mean, K*/pool mean, max), six twin-Q tables, six v3 SEC 2 rows, top-band 0.9843, largest K* and worst fraction, max K* 21 to 1499, independent T recount: ${failures === 0 ? 'ALL REPRODUCED' : failures + ' FAILURES'}`);
  return cal;
}

// ============================================================================
if (STAGE === 'seal') {
  log('SEC A — WIDTH AUDIT (the level this file runs at)');
  log(`  primes sieved to ${PLIM}; anchors 7..${QMAX_ALL} (${ANCHORS.length} of them); next prime above ${QMAX_ALL} = ${nextPrime(QMAX_ALL)}`);
  log(`  largest prime gap among anchors: ${MAXGAP} at Q = ${MAXGAP_AT}; largest window width ${MAXW}; largest hi = ${HIMAX}`);
  assertTrue('largest width < 2^31', MAXW < 2 ** 31);
  assertTrue('largest hi + 1 is a safe integer (< 2^53)', Number.isSafeInteger(HIMAX + 1));
  assertTrue('lpf table allocated at MAXW + 4', lpfw.length === MAXW + 4);
  assertTrue('31607 and 100003 are prime anchors', isPrime(31607) && isPrime(100003));
  assertEq('pool at Q = 31607 is pi(31607) - 3', ANCHORS.indexOf(31607) + 1, 3398);
  assertEq('pool at Q = 100003 is pi(100003) - 3', ANCHORS.indexOf(100003) + 1, 9590);
  log(`  band anchor counts: ${['B9', 'B10', 'B11', 'B12'].map(b => `${b} = ${anchorsOf(b).length}`).join(', ')}`);

  log('\nSEC B — OMEGA GRID GATES AND THE TWO ASYMPTOTES');
  log(`  omega(2) = ${f6(omega(2))} (want 0.5); 3 omega(3) = ${f6(3 * omega(3))} (want 1 + ln 2 = ${f6(1 + Math.log(2))}); omega(12) = ${f6(omega(12))} (e^-gamma = ${f6(EMG)})`);
  assertTrue('omega gates to 5 decimals', Math.abs(omega(2) - 0.5) < 1e-5 && Math.abs(3 * omega(3) - 1 - Math.log(2)) < 1e-5 && Math.abs(omega(12) - EMG) < 1e-5);
  log(`  root of u omega(u) = 2: u* = ${USTAR.toFixed(7)}; 1/u* = theta_new = ${f6(THETA_NEW)}; theta_old = 1/(2e^gamma) = ${f6(THETA_OLD)}; theta_old - theta_new = ${f6(THETA_OLD - THETA_NEW)}`);
  log('  comparator cross-check against the two notes\' scratchpad-grade forward values (printed, not asserted):');
  for (const [Q, note] of [[10007, 'C2: K 35, y 163 (import §3)'], [31607, 'C2: K 62, y 313 (import §3); C1: y 317 (u2 §5); OLD: 336 (03.js)'], [100003, 'C2: K 110, y 617; C1: 617; OLD: 642']]) {
    const cp = comparators(Q, ANCHORS.indexOf(Q) + 1);
    log(`    Q = ${Q}: this file  C2 K ${cp.C2.K} y ${cp.C2.y};  C1 K ${cp.C1.K} y ${cp.C1.y};  OLD y ${f1(cp.OLD.y)} K ${cp.OLD.K};  NEW y ${f1(cp.NEW.y)} K ${cp.NEW.K}   | notes: ${note}`);
  }

  log('');
  const cal = calibrationGate();
  if (failures > 0) { log('CALIBRATION GATE FAILED — nothing sealed'); log(`assertion failures: ${failures}`); process.exitCode = 1; }
  else {
    log('\nSEC D — DRY RUN OF THE ROW MACHINERY ON THE DECADE ALREADY MEASURED (B6-B8, same tolerances)');
    let prev = cal.B5;
    for (const nm of ['B6', 'B7', 'B8']) { scoreBand(cal[nm], prev, forecastBand(nm)); prev = cal[nm]; }

    log('\nSEC E — SEALED FORECASTS FOR B9-B12 (no anchor above 10007 has been sieved by this stage)');
    log(`  tolerances: R1 ±5% rel, R2 ±${TOL.R2}, R3 ±5% rel, R4 ±${TOL.R4}, R6 largest K* <= ${TOL.R6K} x C2 mean K*, R7 ±${TOL.R7}, R8 ±25%`);
    log('  band   n_pred   comp   K/pool(F)    L(F)      y*(F)    K(F)     r_old(F)  r_new(F)   pred se_L');
    for (const nm of ['B9', 'B10', 'B11', 'B12']) {
      const fc = forecastBand(nm), se = cal.B8.sdL / Math.sqrt(fc.n);
      for (const c of COMPS) log(`  ${nm.padEnd(4)}  ${pad(fc.n, 5)}    ${c.padEnd(4)}   ${f5(fc[c].F)}    ${f5(fc[c].L)}   ${pad(f2(fc[c].Y), 7)}   ${pad(f2(fc[c].K), 6)}   ${f4(fc[c].L / THETA_OLD)}    ${f4(fc[c].L / THETA_NEW)}    ${f5(se)}`);
    }
    log(`  predicted se uses sd_L(B8) = ${f5(cal.B8.sdL)}; theta_old - theta_new = ${f6(THETA_OLD - THETA_NEW)}`);
    log('  point forecasts (R8):');
    for (const Q of [31607, 100003]) { const cp = comparators(Q, ANCHORS.indexOf(Q) + 1); log(`    Q = ${Q}: ${COMPS.map(c => `${c} ${f1(cp[c].y)}`).join('   ')}`); }
    log('  pre-declared expectations: C2/C1 rows HIT; OLD/NEW MISS R2 at all four bands (NEW marginal at B12, forecast deficit 0.0016 against the 0.0015 band); R5/R6/R7 HIT; the decade cannot separate theta_old from theta_new (C2 rms residual on B3-B8 is 0.000294 > 0.000292/3).');
  }
}

if (STAGE === 'decade3' || STAGE === 'decade4') {
  const chain = STAGE === 'decade3' ? 'B8' : 'B10';
  const bands = STAGE === 'decade3' ? ['B9', 'B10'] : ['B11', 'B12'];
  log(`SEC F — THE BLIND RUN: ${bands.join(', ')} (chain band ${chain} re-run silently)`);
  progress(`re-running ${chain} for the chain`);
  let prev = measureBand(chain, true);
  log(`  chain band ${chain}: n = ${prev.n}, m = ${f4(prev.mF)}, max ${f3(prev.mxF)}, K* mean ${f2(prev.mK)}, L = ${f5(prev.mL)}`);
  if (chain === 'B8') assertTrue('chain B8 reproduces the cited table', f3(prev.mF) === '0.032' && f2(prev.mK) === '31.22' && f3(prev.mxF) === '0.045');
  const done = [];
  for (const nm of bands) {
    progress(`running ${nm}`);
    const b = measureBand(nm, false);
    // independent T recount on a fixed subsample (every 25th anchor) plus the point anchors
    let bad = 0, cnt = 0;
    for (let j = 0; j < b.rows.length; j += 25) { cnt++; if (recountT(ANCHORS.indexOf(b.rows[j].Q)) !== b.rows[j].T) bad++; }
    assertEq(`independent T recount mismatches on ${cnt} sampled anchors of ${nm}`, bad, 0);
    const picks = new Set(b.rows.filter((r, j) => j % Math.max(1, Math.floor(b.rows.length / 8)) === 0).map(r => r.Q));
    picks.add(b.rows[b.rows.length - 1].Q); picks.add(b.worstK.Q);
    log(`\n  ${nm}: ${b.nAll} anchors, ${b.n} with K* > 0, ${b.rows.filter(r => r.T < 1).length} with T = 0`);
    showRows(b, picks);
    scoreBand(b, prev, forecastBand(nm));
    prev = b; done.push(b);
  }
  log('\nSEC G — POINT ROWS, REPRODUCTION TARGET');
  for (const Q of (STAGE === 'decade3' ? [31607] : [100003])) pointRow(Q);
  reproTarget(done);
}

log(`\nassertion failures: ${failures}`);
log(failures === 0 ? 'ALL ASSERTIONS PASS' : `FAILURES: ${failures}`);
if (failures > 0) process.exitCode = 1;
function f1(x) { return x.toFixed(1); }
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --tail 1 research/history/staging/blind-0830-quadpoint-31607.js -- --stage seal
//   invocation:  node research/history/staging/blind-0830-quadpoint-31607.js --stage seal
//   code-sha256: 34dd79029b6fe9d70a07af5b0c39a76c623211a26974e74ce7e0d06415aeefb2
//   out-sha256:  7c396a1022369ee5d3998dc7a4f46826faeb3fa32621ac5c9123535a5fb5fd46
//   body-lines:  108
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     1.3 s
// ============================================================================
// SEC A — WIDTH AUDIT (the level this file runs at)
//   primes sieved to 100100; anchors 7..100003 (9590 of them); next prime above 100003 = 100019
//   largest prime gap among anchors: 72 at Q = 31397; largest window width 11484288; largest hi = 10003800361
//   band anchor counts: B9 = 810, B10 = 1361, B11 = 2302, B12 = 3890
//
// SEC B — OMEGA GRID GATES AND THE TWO ASYMPTOTES
//   omega(2) = 0.500000 (want 0.5); 3 omega(3) = 1.693147 (want 1 + ln 2 = 1.693147); omega(12) = 0.561459 (e^-gamma = 0.561459)
//   root of u omega(u) = 2: u* = 3.5658466; 1/u* = theta_new = 0.280438; theta_old = 1/(2e^gamma) = 0.280730; theta_old - theta_new = 0.000291
//   comparator cross-check against the two notes' scratchpad-grade forward values (printed, not asserted):
//     Q = 10007: this file  C2 K 35 y 163;  C1 K 35 y 163;  OLD y 176.2 K 37;  NEW y 175.3 K 37   | notes: C2: K 35, y 163 (import §3)
//     Q = 31607: this file  C2 K 62 y 313;  C1 K 63 y 317;  OLD y 336.1 K 64;  NEW y 334.1 K 64   | notes: C2: K 62, y 313 (import §3); C1: y 317 (u2 §5); OLD: 336 (03.js)
//     Q = 100003: this file  C2 K 110 y 617;  C1 K 110 y 617;  OLD y 641.7 K 113;  NEW y 637.4 K 112   | notes: C2: K 110, y 617; C1: 617; OLD: 642
//
// SEC C — CALIBRATION GATE: Q <= 10007 reproduced digit-exact from the embedded blocks
//   1227 anchors 7..10007: 24 v1 rows, 19 v2 rows, K = 0 list, six band tables (n, K* mean, K*/pool mean, max), six twin-Q tables, six v3 SEC 2 rows, top-band 0.9843, largest K* and worst fraction, max K* 21 to 1499, independent T recount: ALL REPRODUCED
//
// SEC D — DRY RUN OF THE ROW MACHINERY ON THE DECADE ALREADY MEASURED (B6-B8, same tolerances)
//   B6 [1500, 3163]  n = 208  measured: m = 0.0502  K* mean 16.88  y* mean 69.85  L = 0.27401 (sd 0.00738, se 0.00051)  max 0.075
//     row  comparator   forecast    measured    tolerance   verdict
//     R1   C2    m        0.0500     0.0502   ±0.0025     HIT
//     R1   C1    m        0.0495     0.0502   ±0.0025     HIT
//     R1   OLD   m        0.0536     0.0502   ±0.0027     MISS
//     R1   NEW   m        0.0533     0.0502   ±0.0027     MISS
//     R2   C2    L       0.27431    0.27401   ±0.0015     HIT    residual -0.00030
//     R2   C1    L       0.27364    0.27401   ±0.0015     HIT    residual +0.00037
//     R2   OLD   L       0.28073    0.27401   ±0.0015     MISS   residual -0.00672
//     R2   NEW   L       0.28044    0.27401   ±0.0015     MISS   residual -0.00643
//     R3   C2    y*        69.64      69.85   ±3.48       HIT
//     R3   C1    y*        68.96      69.85   ±3.45       HIT
//     R3   OLD   y*        77.01      69.85   ±3.85       MISS
//     R3   NEW   y*        76.66      69.85   ±3.83       MISS
//     R4   C1/old  ratio    0.9748     0.9761   ±0.0060     HIT
//     R4   C1/new  ratio    0.9758     0.9771   ±0.0060     HIT
//     R5   shape: m_prev = 0.0609 (B5), m = 0.0502  =>  no bend (HIT)
//     R6   sup: max_prev = 0.090, max = 0.075 (ok); largest K* = 26 at Q = 2657 (pool 381) vs 2 x C2 mean K* = 33.64 (ok)  =>  quiet (HIT)
//     R7   twin-Q: n = 33, mean 0.0534, max 0.075 vs all-band 0.0502  =>  HIT
//     KILL ROWS R1-R3 on C2: all HIT; score B6: 11 HIT, 6 MISS of 17 sealed rows (R1-R7)
//     asymptotes: L - theta_old = -0.00672, L - theta_new = -0.00643, theta_old - theta_new = 0.000291, se = 0.000512, gap/se = 0.57, C2 residual -0.00030
//   B7 [3164, 5623]  n = 292  measured: m = 0.0399  K* mean 23.34  y* mean 100.42  L = 0.27487 (sd 0.00660, se 0.00039)  max 0.065
//     row  comparator   forecast    measured    tolerance   verdict
//     R1   C2    m        0.0398     0.0399   ±0.0020     HIT
//     R1   C1    m        0.0396     0.0399   ±0.0020     HIT
//     R1   OLD   m        0.0425     0.0399   ±0.0021     MISS
//     R1   NEW   m        0.0423     0.0399   ±0.0021     MISS
//     R2   C2    L       0.27484    0.27487   ±0.0015     HIT    residual +0.00003
//     R2   C1    L       0.27456    0.27487   ±0.0015     HIT    residual +0.00030
//     R2   OLD   L       0.28073    0.27487   ±0.0015     MISS   residual -0.00586
//     R2   NEW   L       0.28044    0.27487   ±0.0015     MISS   residual -0.00557
//     R3   C2    y*        99.76     100.42   ±4.99       HIT
//     R3   C1    y*        99.32     100.42   ±4.97       HIT
//     R3   OLD   y*       110.18     100.42   ±5.51       MISS
//     R3   NEW   y*       109.64     100.42   ±5.48       MISS
//     R4   C1/old  ratio    0.9780     0.9791   ±0.0060     HIT
//     R4   C1/new  ratio    0.9791     0.9801   ±0.0060     HIT
//     R5   shape: m_prev = 0.0502 (B6), m = 0.0399  =>  no bend (HIT)
//     R6   sup: max_prev = 0.075, max = 0.065 (ok); largest K* = 33 at Q = 5021 (pool 670) vs 2 x C2 mean K* = 46.60 (ok)  =>  quiet (HIT)
//     R7   twin-Q: n = 53, mean 0.0410, max 0.065 vs all-band 0.0399  =>  HIT
//     KILL ROWS R1-R3 on C2: all HIT; score B7: 11 HIT, 6 MISS of 17 sealed rows (R1-R7)
//     asymptotes: L - theta_old = -0.00586, L - theta_new = -0.00557, theta_old - theta_new = 0.000291, se = 0.000386, gap/se = 0.75, C2 residual +0.00003
//   B8 [5624, 10007]  n = 491  measured: m = 0.0321  K* mean 31.22  y* mean 141.80  L = 0.27632 (sd 0.00570, se 0.00026)  max 0.045
//     row  comparator   forecast    measured    tolerance   verdict
//     R1   C2    m        0.0320     0.0321   ±0.0016     HIT
//     R1   C1    m        0.0320     0.0321   ±0.0016     HIT
//     R1   OLD   m        0.0335     0.0321   ±0.0017     HIT
//     R1   NEW   m        0.0334     0.0321   ±0.0017     HIT
//     R2   C2    L       0.27647    0.27632   ±0.0015     HIT    residual -0.00016
//     R2   C1    L       0.27633    0.27632   ±0.0015     HIT    residual -0.00001
//     R2   OLD   L       0.28073    0.27632   ±0.0015     MISS   residual -0.00441
//     R2   NEW   L       0.28044    0.27632   ±0.0015     MISS   residual -0.00412
//     R3   C2    y*       141.64     141.80   ±7.08       HIT
//     R3   C1    y*       141.30     141.80   ±7.07       HIT
//     R3   OLD   y*       152.61     141.80   ±7.63       MISS
//     R3   NEW   y*       151.82     141.80   ±7.59       MISS
//     R4   C1/old  ratio    0.9843     0.9843   ±0.0060     HIT
//     R4   C1/new  ratio    0.9853     0.9853   ±0.0060     HIT
//     R5   shape: m_prev = 0.0399 (B7), m = 0.0321  =>  no bend (HIT)
//     R6   sup: max_prev = 0.065, max = 0.045 (ok); largest K* = 46 at Q = 9281 (pool 1146) vs 2 x C2 mean K* = 62.31 (ok)  =>  quiet (HIT)
//     R7   twin-Q: n = 70, mean 0.0320, max 0.044 vs all-band 0.0321  =>  HIT
//     KILL ROWS R1-R3 on C2: all HIT; score B8: 13 HIT, 4 MISS of 17 sealed rows (R1-R7)
//     asymptotes: L - theta_old = -0.00441, L - theta_new = -0.00412, theta_old - theta_new = 0.000291, se = 0.000257, gap/se = 1.13, C2 residual -0.00016
//
// SEC E — SEALED FORECASTS FOR B9-B12 (no anchor above 10007 has been sieved by this stage)
//   tolerances: R1 ±5% rel, R2 ±0.0015, R3 ±5% rel, R4 ±0.006, R6 largest K* <= 2 x C2 mean K*, R7 ±0.005, R8 ±25%
//   band   n_pred   comp   K/pool(F)    L(F)      y*(F)    K(F)     r_old(F)  r_new(F)   pred se_L
//   B9      810    C2     0.02568    0.27727    197.65    41.53   0.9877    0.9887    0.00020
//   B9      810    C1     0.02569    0.27728    197.69    41.55   0.9877    0.9887    0.00020
//   B9      810    OLD    0.02689    0.28073    210.92    43.46   1.0000    1.0010    0.00020
//   B9      810    NEW    0.02674    0.28044    209.75    43.23   0.9990    1.0000    0.00020
//   B10    1361    C2     0.02045    0.27752    272.91    55.05   0.9886    0.9896    0.00015
//   B10    1361    C1     0.02048    0.27762    273.45    55.14   0.9889    0.9899    0.00015
//   B10    1361    OLD    0.02140    0.28073    291.13    57.58   1.0000    1.0010    0.00015
//   B10    1361    NEW    0.02131    0.28044    289.42    57.33   0.9990    1.0000    0.00015
//   B11    2302    C2     0.01620    0.27860    384.47    72.96   0.9924    0.9934    0.00012
//   B11    2302    C1     0.01624    0.27876    385.79    73.18   0.9930    0.9940    0.00012
//   B11    2302    OLD    0.01674    0.28073    402.27    75.41   1.0000    1.0010    0.00012
//   B11    2302    NEW    0.01664    0.28044    399.77    74.98   0.9990    1.0000    0.00012
//   B12    3890    C2     0.01277    0.27884    533.39    96.68   0.9933    0.9943    0.00009
//   B12    3890    C1     0.01282    0.27903    535.72    97.05   0.9940    0.9950    0.00009
//   B12    3890    OLD    0.01318    0.28073    556.04    99.69   1.0000    1.0010    0.00009
//   B12    3890    NEW    0.01311    0.28044    552.40    99.16   0.9990    1.0000    0.00009
//   predicted se uses sd_L(B8) = 0.00570; theta_old - theta_new = 0.000291
//   point forecasts (R8):
//     Q = 31607: C2 313.0   C1 317.0   OLD 336.1   NEW 334.1
//     Q = 100003: C2 617.0   C1 617.0   OLD 641.7   NEW 637.4
//   pre-declared expectations: C2/C1 rows HIT; OLD/NEW MISS R2 at all four bands (NEW marginal at B12, forecast deficit 0.0016 against the 0.0015 band); R5/R6/R7 HIT; the decade cannot separate theta_old from theta_new (C2 rms residual on B3-B8 is 0.000294 > 0.000292/3).
//
// assertion failures: 0
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
//
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --tail 2 research/history/staging/blind-0830-quadpoint-31607.js -- --stage decade3
//   invocation:  node research/history/staging/blind-0830-quadpoint-31607.js --stage decade3
//   code-sha256: 34dd79029b6fe9d70a07af5b0c39a76c623211a26974e74ce7e0d06415aeefb2
//   out-sha256:  7a57331bc5a1431966d40ad2d2141453c71114eff80c582a900d02339684eaaf
//   body-lines:  83
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     9.8 s
// ============================================================================
// SEC F — THE BLIND RUN: B9, B10 (chain band B8 re-run silently)
//   chain band B8: n = 491, m = 0.0321, max 0.045, K* mean 31.22, L = 0.27632
//
//   B9: 810 anchors, 810 with K* > 0, 0 with T = 0
//        Q   width       C      T  pool     CC    K*  K*/pool   y*   ln y*/ln h  twinQ
//    10009    561288   56128   2164  1228   35529    36   0.0293   167   0.27781
//    10973    131712   13170    510  1329    8358    36   0.0271   167   0.27507
//    11953    143472   14346    521  1430    9161    42   0.0294   197   0.28136
//    12893    154752   15474    599  1531    9933    38   0.0248   179   0.27405
//    13831    276720   27671    982  1632   17821    43   0.0263   199   0.27758
//    14821    177888   17788    640  1733   11471    43   0.0248   199   0.27558
//    15749    378120   37811   1302  1834   24397    48   0.0262   233   0.28201
//    16691     66768    6676    209  1927    4353    56   0.0291   277   0.28922   yes
//    16763    805200   80519   2855  1935   52241    45   0.0233   223   0.27795
//    17761    781968   78196   2634  2036   50925    48   0.0236   233   0.27855
//    17783    213432   21342    752  2037   13872    43   0.0211   199   0.27045
//   B9 [10008, 17783]  n = 810  measured: m = 0.0257  K* mean 41.49  y* mean 197.22  L = 0.27705 (sd 0.00394, se 0.00014)  max 0.036
//     row  comparator   forecast    measured    tolerance   verdict
//     R1   C2    m        0.0257     0.0257   ±0.0013     HIT
//     R1   C1    m        0.0257     0.0257   ±0.0013     HIT
//     R1   OLD   m        0.0269     0.0257   ±0.0013     HIT
//     R1   NEW   m        0.0267     0.0257   ±0.0013     HIT
//     R2   C2    L       0.27727    0.27705   ±0.0015     HIT    residual -0.00022
//     R2   C1    L       0.27728    0.27705   ±0.0015     HIT    residual -0.00023
//     R2   OLD   L       0.28073    0.27705   ±0.0015     MISS   residual -0.00368
//     R2   NEW   L       0.28044    0.27705   ±0.0015     MISS   residual -0.00339
//     R3   C2    y*       197.65     197.22   ±9.88       HIT
//     R3   C1    y*       197.69     197.22   ±9.88       HIT
//     R3   OLD   y*       210.92     197.22   ±10.55       MISS
//     R3   NEW   y*       209.75     197.22   ±10.49       MISS
//     R4   C1/old  ratio    0.9877     0.9869   ±0.0060     HIT
//     R4   C1/new  ratio    0.9887     0.9879   ±0.0060     HIT
//     R5   shape: m_prev = 0.0321 (B8), m = 0.0257  =>  no bend (HIT)
//     R6   sup: max_prev = 0.045, max = 0.036 (ok); largest K* = 56 at Q = 16691 (pool 1927) vs 2 x C2 mean K* = 83.06 (ok)  =>  quiet (HIT)
//     R7   twin-Q: n = 103, mean 0.0256, max 0.036 vs all-band 0.0257  =>  HIT
//     KILL ROWS R1-R3 on C2: all HIT; score B9: 13 HIT, 4 MISS of 17 sealed rows (R1-R7)
//     asymptotes: L - theta_old = -0.00368, L - theta_new = -0.00339, theta_old - theta_new = 0.000291, se = 0.000138, gap/se = 2.10, C2 residual -0.00022
//
//   B10: 1361 anchors, 1361 with K* > 0, 0 with T = 0
//        Q   width       C      T  pool     CC    K*  K*/pool   y*   ln y*/ln h  twinQ
//    17789     71160    7115    249  2038    4622    47   0.0231   229   0.27762   yes
//    19483    233832   23382    817  2208   15286    45   0.0204   223   0.27372
//    21179    338928   33892   1132  2378   22325    51   0.0214   251   0.27736
//    22853    274272   27426    867  2548   18045    54   0.0212   269   0.27871
//    24527    294360   29435    990  2718   19526    50   0.0184   241   0.27132
//    26309    421008   42100   1318  2888   27955    58   0.0201   283   0.27734
//    28057    673512   67350   2106  3058   44856    59   0.0193   293   0.27730
//    29833    238680   23867    776  3228   15852    55   0.0170   271   0.27186
//    30491    121968   12196    349  3288    8141    71   0.0216   373   0.28675   yes
//    31607   1264680  126467   3867  3398   84735    62   0.0182   313   0.27730
//   B10 [17784, 31607]  n = 1361  measured: m = 0.0204  K* mean 54.99  y* mean 272.88  L = 0.27744 (sd 0.00300, se 0.00008)  max 0.028
//     row  comparator   forecast    measured    tolerance   verdict
//     R1   C2    m        0.0204     0.0204   ±0.0010     HIT
//     R1   C1    m        0.0205     0.0204   ±0.0010     HIT
//     R1   OLD   m        0.0214     0.0204   ±0.0011     HIT
//     R1   NEW   m        0.0213     0.0204   ±0.0011     HIT
//     R2   C2    L       0.27752    0.27744   ±0.0015     HIT    residual -0.00009
//     R2   C1    L       0.27762    0.27744   ±0.0015     HIT    residual -0.00018
//     R2   OLD   L       0.28073    0.27744   ±0.0015     MISS   residual -0.00329
//     R2   NEW   L       0.28044    0.27744   ±0.0015     MISS   residual -0.00300
//     R3   C2    y*       272.91     272.88   ±13.65       HIT
//     R3   C1    y*       273.45     272.88   ±13.67       HIT
//     R3   OLD   y*       291.13     272.88   ±14.56       MISS
//     R3   NEW   y*       289.42     272.88   ±14.47       MISS
//     R4   C1/old  ratio    0.9889     0.9883   ±0.0060     HIT
//     R4   C1/new  ratio    0.9899     0.9893   ±0.0060     HIT
//     R5   shape: m_prev = 0.0257 (B9), m = 0.0204  =>  no bend (HIT)
//     R6   sup: max_prev = 0.036, max = 0.028 (ok); largest K* = 71 at Q = 30491 (pool 3288) vs 2 x C2 mean K* = 110.10 (ok)  =>  quiet (HIT)
//     R7   twin-Q: n = 178, mean 0.0205, max 0.028 vs all-band 0.0204  =>  HIT
//     KILL ROWS R1-R3 on C2: all HIT; score B10: 13 HIT, 4 MISS of 17 sealed rows (R1-R7)
//     asymptotes: L - theta_old = -0.00329, L - theta_new = -0.00300, theta_old - theta_new = 0.000291, se = 0.000081, gap/se = 3.58, C2 residual -0.00009
//
// SEC G — POINT ROWS, REPRODUCTION TARGET
//   R8   Q = 31607: measured y* = 313 (K* = 62, pool 3398, T = 3867, L = 0.27730)
//          C2   forecast y* = 313.00 (K = 62)   ±25%   HIT
//          C1   forecast y* = 317.00 (K = 63)   ±25%   HIT
//          OLD  forecast y* = 336.08 (K = 64)   ±25%   HIT
//          NEW  forecast y* = 334.06 (K = 64)   ±25%   HIT
//   reproduction target (band means of K*/pool | K* | y*), for any analytic bound:
//     B9: 0.026 | 41.49 | 197.22   B10: 0.020 | 54.99 | 272.88
//
// assertion failures: 0
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
//
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --tail 3 research/history/staging/blind-0830-quadpoint-31607.js -- --stage decade4
//   invocation:  node research/history/staging/blind-0830-quadpoint-31607.js --stage decade4
//   code-sha256: 34dd79029b6fe9d70a07af5b0c39a76c623211a26974e74ce7e0d06415aeefb2
//   out-sha256:  85ac9e320e5ff8b54600c3def9a9f54620e8fde40e90ca02893a37c4e833f535
//   body-lines:  84
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     195.9 s
// ============================================================================
// SEC F — THE BLIND RUN: B11, B12 (chain band B10 re-run silently)
//   chain band B10: n = 1361, m = 0.0204, max 0.028, K* mean 54.99, L = 0.27744
//
//   B11: 2302 anchors, 2302 with K* > 0, 0 with T = 0
//        Q   width       C      T  pool     CC    K*  K*/pool   y*   ln y*/ln h  twinQ
//    31627   1012320  101231   3107  3399   67694    62   0.0182   313   0.27728
//    34519   1243008  124300   3690  3686   83418    66   0.0179   347   0.27989
//    37549    901320   90131   2690  3973   60840    67   0.0169   349   0.27793
//    40699    814080   81407   2362  4260   54880    71   0.0167   373   0.27895
//    43661    698640   69863   2062  4547   47553    72   0.0158   379   0.27786
//    46817    187272   18726    513  4834   12636    85   0.0176   457   0.28476   yes
//    49919    199680   19967    564  5121   13597    86   0.0168   461   0.28348   yes
//    51197    204792   20478    527  5235   14009   102   0.0195   571   0.29268   yes
//    53047    424392   42438   1142  5408   28944    82   0.0152   439   0.27965
//    56167    449352   44934   1260  5695   30854    80   0.0140   431   0.27734
//    56209   3148488  314848   8663  5700  215634    84   0.0147   449   0.27920
//   B11 [31608, 56234]  n = 2302  measured: m = 0.0162  K* mean 73.03  y* mean 384.70  L = 0.27858 (sd 0.00250, se 0.00005)  max 0.023
//     row  comparator   forecast    measured    tolerance   verdict
//     R1   C2    m        0.0162     0.0162   ±0.0008     HIT
//     R1   C1    m        0.0162     0.0162   ±0.0008     HIT
//     R1   OLD   m        0.0167     0.0162   ±0.0008     HIT
//     R1   NEW   m        0.0166     0.0162   ±0.0008     HIT
//     R2   C2    L       0.27860    0.27858   ±0.0015     HIT    residual -0.00002
//     R2   C1    L       0.27876    0.27858   ±0.0015     HIT    residual -0.00018
//     R2   OLD   L       0.28073    0.27858   ±0.0015     MISS   residual -0.00215
//     R2   NEW   L       0.28044    0.27858   ±0.0015     MISS   residual -0.00186
//     R3   C2    y*       384.47     384.70   ±19.22       HIT
//     R3   C1    y*       385.79     384.70   ±19.29       HIT
//     R3   OLD   y*       402.27     384.70   ±20.11       HIT
//     R3   NEW   y*       399.77     384.70   ±19.99       HIT
//     R4   C1/old  ratio    0.9930     0.9923   ±0.0060     HIT
//     R4   C1/new  ratio    0.9940     0.9934   ±0.0060     HIT
//     R5   shape: m_prev = 0.0204 (B10), m = 0.0162  =>  no bend (HIT)
//     R6   sup: max_prev = 0.028, max = 0.023 (ok); largest K* = 102 at Q = 51197 (pool 5235) vs 2 x C2 mean K* = 145.93 (ok)  =>  quiet (HIT)
//     R7   twin-Q: n = 282, mean 0.0164, max 0.023 vs all-band 0.0162  =>  HIT
//     KILL ROWS R1-R3 on C2: all HIT; score B11: 15 HIT, 2 MISS of 17 sealed rows (R1-R7)
//     asymptotes: L - theta_old = -0.00215, L - theta_new = -0.00186, theta_old - theta_new = 0.000291, se = 0.000052, gap/se = 5.60, C2 residual -0.00002
//
//   B12: 3890 anchors, 3890 with K* > 0, 0 with T = 0
//        Q   width       C      T  pool     CC    K*  K*/pool   y*   ln y*/ln h  twinQ
//    56237    224952   22494    634  5701   15441    84   0.0147   449   0.27918   yes
//    61543    492360   49235   1320  6187   33788    89   0.0144   479   0.27983
//    67003   2412432  241242   6540  6673  166128    87   0.0130   463   0.27616
//    72367   1736952  173694   4541  7159  119799    95   0.0133   521   0.27954
//    77801   1867368  186736   4895  7645  129582    96   0.0126   523   0.27791
//    83311   4666200  466619  12068  8131  324028    98   0.0121   547   0.27821
//    83561    334248   33424    793  8152   23403   129   0.0158   743   0.29165   yes
//    89003   1068072  106806   2707  8617   74368   104   0.0121   587   0.27969
//    94427   1133160  113315   2883  9103   79020   107   0.0118   601   0.27928
//    99991   2399928  239992   5879  9589  167736   113   0.0118   641   0.28069
//   100003   3200352  320034   7972  9590  223611   112   0.0117   631   0.28000
//   B12 [56235, 100003]  n = 3890  measured: m = 0.0128  K* mean 96.59  y* mean 532.71  L = 0.27875 (sd 0.00200, se 0.00003)  max 0.017
//     row  comparator   forecast    measured    tolerance   verdict
//     R1   C2    m        0.0128     0.0128   ±0.0006     HIT
//     R1   C1    m        0.0128     0.0128   ±0.0006     HIT
//     R1   OLD   m        0.0132     0.0128   ±0.0007     HIT
//     R1   NEW   m        0.0131     0.0128   ±0.0007     HIT
//     R2   C2    L       0.27884    0.27875   ±0.0015     HIT    residual -0.00009
//     R2   C1    L       0.27903    0.27875   ±0.0015     HIT    residual -0.00028
//     R2   OLD   L       0.28073    0.27875   ±0.0015     MISS   residual -0.00198
//     R2   NEW   L       0.28044    0.27875   ±0.0015     MISS   residual -0.00169
//     R3   C2    y*       533.39     532.71   ±26.67       HIT
//     R3   C1    y*       535.72     532.71   ±26.79       HIT
//     R3   OLD   y*       556.04     532.71   ±27.80       HIT
//     R3   NEW   y*       552.40     532.71   ±27.62       HIT
//     R4   C1/old  ratio    0.9940     0.9929   ±0.0060     HIT
//     R4   C1/new  ratio    0.9950     0.9940   ±0.0060     HIT
//     R5   shape: m_prev = 0.0162 (B11), m = 0.0128  =>  no bend (HIT)
//     R6   sup: max_prev = 0.023, max = 0.017 (ok); largest K* = 129 at Q = 83561 (pool 8152) vs 2 x C2 mean K* = 193.37 (ok)  =>  quiet (HIT)
//     R7   twin-Q: n = 455, mean 0.0127, max 0.017 vs all-band 0.0128  =>  HIT
//     KILL ROWS R1-R3 on C2: all HIT; score B12: 15 HIT, 2 MISS of 17 sealed rows (R1-R7)
//     asymptotes: L - theta_old = -0.00198, L - theta_new = -0.00169, theta_old - theta_new = 0.000291, se = 0.000032, gap/se = 9.09, C2 residual -0.00009
//
// SEC G — POINT ROWS, REPRODUCTION TARGET
//   R8   Q = 100003: measured y* = 631 (K* = 112, pool 9590, T = 7972, L = 0.28000)
//          C2   forecast y* = 617.00 (K = 110)   ±25%   HIT
//          C1   forecast y* = 617.00 (K = 110)   ±25%   HIT
//          OLD  forecast y* = 641.66 (K = 113)   ±25%   HIT
//          NEW  forecast y* = 637.37 (K = 112)   ±25%   HIT
//   reproduction target (band means of K*/pool | K* | y*), for any analytic bound:
//     B11: 0.016 | 73.03 | 384.70   B12: 0.013 | 96.59 | 532.71
//
// assertion failures: 0
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
// ============================================================================
// (written after the three tails were bound; every figure appears in a tail
// above; the adjudication text belongs to the staging note of the same name)
// 1. THE SEAL HELD [custody]. Tail 1 (--stage seal) bound the width audit, the
//    calibration gate (1227 anchors, ALL REPRODUCED, 0 failures) and the
//    forecast table before tails 2 and 3 sieved any anchor above 10007; all
//    three tails share code-sha256 34dd7902...; no --force anywhere.
// 2. THE SCORE [MEASURED, blind]. 8363 new anchors 10009 <= Q <= 100003, all
//    with T >= 1. Per band, of 17 sealed rows: B9 13 HIT 4 MISS, B10 13/4,
//    B11 15/2, B12 15/2; R8 point rows 8 HIT of 8. Every MISS is on OLD or
//    NEW: R2 (ln y*/ln h) at all four bands, R3 (y*) at B9 and B10. The kill
//    rows R1-R3 on C2 are all HIT; C1 HITs every row too.
// 3. RESIDUALS ON L against C2: -0.00022, -0.00009, -0.00002, -0.00009 (B9 to
//    B12) with se 0.000138, 0.000081, 0.000052, 0.000032; against C1:
//    -0.00023, -0.00018, -0.00018, -0.00028. Both inside the sealed +-0.0015;
//    C1 sits above the data by 3.6 and 9 se at B11 and B12 (post-hoc reading).
// 4. NO BEND, SUP QUIET, TWIN-Q CONVERGED: m = 0.0257 -> 0.0204 -> 0.0162 ->
//    0.0128 from the reproduced 0.0321; band maxes 0.036 -> 0.028 -> 0.023 ->
//    0.017; largest K* 56, 71, 102, 129 (the last at Q = 83561, pool 8152);
//    twin-Q means within 0.0002 of the all-band means at every band.
// 5. THE ASYMPTOTES ARE NOT SEPARATED. L - theta_old = -0.00368 -> -0.00198
//    and L - theta_new = -0.00339 -> -0.00169, six to twelve times
//    theta_old - theta_new = 0.000291; gap/se reads 2.10, 3.58, 5.60, 9.09, so
//    the sampling error would allow it, and the pre-declared criterion (c)
//    forbids it: which limit the deficit series tends to is decided by the
//    comparator, not by the data. Nothing asymptotic is decided.
// ============================================================================
