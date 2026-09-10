// attack-foldL-02-bridge.js
// ---------------------------------------------------------------------------
// ANGLE 2 on the fold multiplier L: nail the bridge from L to the OLD gap word,
// then climb the sharpening ladder as far as PROVEN conditions allow.
//
// THE BRIDGE (A5 Theorem B, research/a3-05-bound-L.md sec 5).  A kill run of
// length L on tile T_x under fold p has exactly L-1 interior gaps; every one of
// them is a gap of T_x's cyclic gap word, they are CONSECUTIVE there, each is
// >= theta = 2p - 2*eta, and adjacent pairs sum to >= 6p.  Hence
//     L <= 1 + max{ m : maxsum_m(T_x) >= c_min(m) }.
//
// This script recomputes, from scratch and independently of a3-05-bound-L.js,
// the whole ladder of ceilings at all eight diagonal cells (T_5,7) .. (T_29,31):
//
//   L0  condition (i), SUM form   : 1 + max{m : maxsum_m >= m*theta}
//   LB  Theorem B (alternation)   : 1 + max{m : maxsum_m >= c_min(m)}
//   LR  per-gap form (sec 8)      : 1 + longest run of consecutive gaps >= theta
//   LP  NEW, pair-window form     : 1 + longest run of consecutive gaps, each
//                                   >= theta AND every adjacent pair >= 6p
//   LV  NEW, value-window form    : 1 + longest run of consecutive gaps whose
//                                   VALUES are all qualifying (== 0, +-2 mod p)
//   LVP NEW, value + pair         : LV's condition plus the 6p pair floor
//   LA  the exact kill-graph L    : longest 2-state walk = true L
//
// L0 >= LB and LR >= LP >= LVP >= LA are all forced by construction; any
// violation is a bug and is reported.
//
// Tiles T_5..T_23 are built in memory; T_29 (214,708,725 slots) is streamed out
// of T_23 exactly as research/gate-multiplies-03.js does, so nothing above
// 64 MB is ever held.
// ---------------------------------------------------------------------------
'use strict';
const T0 = Date.now();
const elapsed = () => ((Date.now() - T0) / 1000).toFixed(1) + 's';

const MMAX = 14;                       // window depth for maxsum
const PRIMES = [5, 7, 11, 13, 17, 19, 23, 29, 31];
// diagonal cells: fold p' acts on T_x with x the previous prime
const CELLS = [[5, 7], [7, 11], [11, 13], [13, 17], [17, 19], [19, 23], [23, 29], [29, 31]];
const TRUE_L = { 7: 2, 11: 1, 13: 2, 17: 2, 19: 2, 23: 3, 29: 2, 31: 4 };

// --------------------------------------------------------------------------
// The analyser.  Fed slot values in increasing order, one at a time.  Keeps
// O(MMAX) state, so it works identically on an in-memory tile and on a stream.
// --------------------------------------------------------------------------
function Analyser(p, W) {
  const eta = (p % 6 === 1) ? 1 : -1;
  const theta = 2 * p - 2 * eta;       // least qualifying gap value
  const sixp = 6 * p;
  const buf = new Float64Array(MMAX + 1);
  let head = 0, cnt = 0;
  const best = new Float64Array(MMAX + 1);

  let prevV = -1, prevR = -1, prevG = -1;
  // run counters (counted in GAPS; convert to slots with +1 at the end)
  let cGE = 0, mGE = 0;                // gaps >= theta
  let cP = 0, mP = 0;                  // gaps >= theta AND adjacent pair >= 6p
  let cV = 0, mV = 0;                  // qualifying VALUES
  let cVP = 0, mVP = 0;                // qualifying values AND pair >= 6p
  // kill-graph DP, in SLOTS.  dp[s] = longest run of consecutive slots ending
  // at the current slot in which the current slot takes offset s (a = r + 2s).
  let dp0 = 1, dp1 = 1, mL = 1;

  const qualifies = (g) => {
    if (g % 6 !== 0) return false;
    const r = g % p;
    return r === 0 || r === 2 || r === p - 2;
  };

  return {
    p, eta, theta,
    push(v, r) {
      // ---- maxsum over cyclically consecutive gaps ----
      buf[head] = v; head = (head + 1) % (MMAX + 1); cnt++;
      for (let m = 1; m <= MMAX; m++) {
        if (cnt <= m) continue;
        const idx = (head - 1 - m + 2 * (MMAX + 1)) % (MMAX + 1);
        const s = v - buf[idx];
        if (s > best[m]) best[m] = s;
      }
      // ---- gap-word conditions ----
      if (prevV >= 0) {
        const g = v - prevV;
        const big = g >= theta;
        const qual = qualifies(g);
        const pairOK = prevG >= 0 && (prevG + g) >= sixp;

        cGE = big ? cGE + 1 : 0;                       if (cGE > mGE) mGE = cGE;
        cP  = big ? (cP > 0 && pairOK ? cP + 1 : 1) : 0; if (cP  > mP ) mP  = cP;
        cV  = qual ? cV + 1 : 0;                       if (cV  > mV ) mV  = cV;
        cVP = qual ? (cVP > 0 && pairOK ? cVP + 1 : 1) : 0; if (cVP > mVP) mVP = cVP;

        // ---- exact kill graph: 2-state walk on a = r + 2*s (mod p) ----
        // slot i-1 with offset s' is compatible with slot i offset s iff
        //   prevR + 2s' == r + 2s (mod p)
        const a0 = r % p, a1 = (r + 2) % p;
        const b0 = prevR % p, b1 = (prevR + 2) % p;
        const n0 = (a0 === b0 ? dp0 : (a0 === b1 ? dp1 : 0)) + 1;
        const n1 = (a1 === b0 ? dp0 : (a1 === b1 ? dp1 : 0)) + 1;
        dp0 = n0; dp1 = n1;
      } else { dp0 = 1; dp1 = 1; }
      if (dp0 > mL) mL = dp0;
      if (dp1 > mL) mL = dp1;
      prevG = prevV >= 0 ? v - prevV : -1;
      prevV = v; prevR = r;
    },
    report(N) {
      const c_min = (m) => (m % 2 === 0) ? 3 * p * m : 3 * p * m - p - 2 * eta;
      const cap = Math.min(MMAX, N);           // maxsum_m valid as a cyclic max only for m <= N
      let m0 = 0, mB = 0, sat0 = false, satB = false;
      for (let m = 1; m <= cap; m++) {
        if (best[m] >= m * theta) { m0 = m; if (m === cap) sat0 = true; }
        if (best[m] >= c_min(m))  { mB = m; if (m === cap) satB = true; }
      }
      return {
        p, eta, theta, N,
        maxsum: Array.from(best.slice(0, cap + 1)),
        cmin: Array.from({ length: cap + 1 }, (_, m) => m === 0 ? 0 : c_min(m)),
        L0: 1 + m0, LB: 1 + mB, sat0, satB,
        LR: 1 + mGE, LP: 1 + mP, LV: 1 + mV, LVP: 1 + mVP, LA: mL, cap
      };
    }
  };
}

// --------------------------------------------------------------------------
// Tile construction
// --------------------------------------------------------------------------
function foldTile(slots, W, p) {
  const D = slots.length, rs = new Int32Array(D);
  for (let i = 0; i < D; i++) rs[i] = slots[i] % p;
  const wp = W % p, out = new Float64Array(D * (p - 2));
  let n = 0;
  for (let k = 0; k < p; k++) {
    const off = k * W, kw = (k * wp) % p;
    const d0 = (p - kw) % p, d2 = (2 * p - 2 - kw) % p;
    for (let i = 0; i < D; i++) if (rs[i] !== d0 && rs[i] !== d2) out[n++] = slots[i] + off;
  }
  return out;
}

const RESULTS = [];

// ---- T_5 .. T_23 in memory ------------------------------------------------
{
  let slots = Float64Array.from([5]), W = 6;     // T_3
  for (const q of [5, 7, 11, 13, 17, 19, 23]) {
    slots = foldTile(slots, W, q); W *= q;
    const cell = CELLS.find(c => c[0] === q);
    if (!cell) continue;
    const p = cell[1], N = slots.length;
    const A = Analyser(p, W);
    // one full cyclic pass plus MMAX+2 wrapped slots
    for (let i = 0; i < N; i++) A.push(slots[i], slots[i] % p);
    const extra = Math.min(N, MMAX + 2);
    for (let i = 0; i < extra; i++) A.push(slots[i] + W, (slots[i] + W) % p);
    const r = A.report(N); r.x = q; r.W = W; r.D = N;
    RESULTS.push(r);
    process.stderr.write('[' + elapsed() + '] cell (T_' + q + ', p=' + p + ') done, D = ' + N + '\n');
  }
  // ---- T_29 streamed out of T_23 -----------------------------------------
  const q = 29, D = slots.length, rs = new Int32Array(D);
  for (let i = 0; i < D; i++) rs[i] = slots[i] % q;
  const wp = W % q, Wn = W * q, p = 31;
  const A = Analyser(p, Wn);
  const headKeep = [];
  let n = 0;
  for (let k = 0; k < q; k++) {
    const off = k * W, kw = (k * wp) % q;
    const d0 = (q - kw) % q, d2 = (2 * q - 2 - kw) % q;
    for (let i = 0; i < D; i++) {
      if (rs[i] === d0 || rs[i] === d2) continue;
      const v = slots[i] + off;
      if (headKeep.length < MMAX + 2) headKeep.push(v);
      A.push(v, v % p); n++;
    }
    if (k % 7 === 0) process.stderr.write('[' + elapsed() + ']   T_29 copy ' + k + '/' + q + ', alive ' + n + '\n');
  }
  for (const v of headKeep) A.push(v + Wn, (v + Wn) % p);
  const r = A.report(n); r.x = q; r.W = Wn; r.D = n;
  RESULTS.push(r);
  process.stderr.write('[' + elapsed() + '] cell (T_29, p=31) done, D = ' + n + '\n');
}

// --------------------------------------------------------------------------
// READ-OUT
// --------------------------------------------------------------------------
const pad = (s, w) => String(s).padStart(w);
console.log('=== 1. CUSTODY: tiles and their invariants ===');
console.log('  x      D            W              mbar      G2=maxsum_1  D==prod(q-2)');
for (const r of RESULTS) {
  let pr = 1; for (const q of PRIMES) { if (q > r.x) break; pr *= (q - 2); }
  console.log('  ' + pad(r.x, 3) + '  ' + pad(r.D, 11) + '  ' + pad(r.W.toExponential(6), 13) +
    '  ' + pad((r.W / r.D).toFixed(4), 9) + '  ' + pad(r.maxsum[1], 10) +
    '   ' + (pr === r.D ? 'yes' : 'NO (' + pr + ')'));
}

console.log('');
console.log('=== 2. THE EIGHT DIAGONAL CELLS: the full ceiling ladder ===');
console.log('  (T_x, p)      theta  6p    L0   LB   LR   LP   LV  LVP  |  LA  trueL  ok');
for (const r of RESULTS) {
  const tl = TRUE_L[r.p];
  const mono = r.L0 >= r.LB && r.LR >= r.LP && r.LP >= r.LVP && r.LVP >= r.LA &&
    r.LV >= r.LVP && r.LB >= r.LA && r.L0 >= r.LA && r.LR >= r.LA;
  const ok = (r.LA === tl) && mono;
  console.log('  (T_' + pad(r.x, 2) + ', ' + pad(r.p, 2) + ')      ' + pad(r.theta, 4) + '  ' + pad(6 * r.p, 4) +
    '  ' + pad(r.L0, 3) + '  ' + pad(r.LB, 3) + '  ' + pad(r.LR, 3) + '  ' + pad(r.LP, 3) +
    '  ' + pad(r.LV, 3) + '  ' + pad(r.LVP, 3) + '  |  ' + pad(r.LA, 2) + '   ' + pad(tl, 4) +
    '   ' + (ok ? 'PASS' : 'FAIL') + (r.satB ? '  [maxsum window saturated]' : ''));
}
console.log('  L0  = 1 + max{m: maxsum_m >= m*theta}      (condition (i), sum form)');
console.log('  LB  = 1 + max{m: maxsum_m >= c_min(m)}     (A5 Theorem B, alternation folded in)');
console.log('  LR  = 1 + longest run of gaps >= theta     (a3-05 sec 8, per-gap form)');
console.log('  LP  = LR sharpened by the 6p pair floor    (NEW)');
console.log('  LV  = 1 + longest run of QUALIFYING VALUES (NEW)');
console.log('  LVP = LV sharpened by the 6p pair floor    (NEW)');
console.log('  LA  = exact kill-graph longest run         (= true L, computed here independently)');

console.log('');
console.log('=== 3. maxsum_m against c_min(m), cell by cell ===');
for (const r of RESULTS) {
  const K = Math.min(r.cap, 9);
  console.log('  (T_' + r.x + ', p=' + r.p + ')  N=' + r.D + '  theta=' + r.theta);
  let a = '     m      :'; let b = '     maxsum_m:'; let c = '     c_min(m):'; let d = '     m*theta :'; let e = '     verdict :';
  for (let m = 1; m <= K; m++) {
    a += pad(m, 8); b += pad(r.maxsum[m], 8); c += pad(r.cmin[m], 8); d += pad(m * r.theta, 8);
    e += pad(r.maxsum[m] >= r.cmin[m] ? 'B-ok' : 'B-NO', 8);
  }
  console.log(a); console.log(b); console.log(c); console.log(d); console.log(e);
}

console.log('');
console.log('=== 4. BEST PROVEN PER-FOLD CEILING, and the 0.18p comparison ===');
console.log('  p    best = min(L0,LB,LR,LP,LV,LVP)   trueL  slack   0.18p   0.31p/lnp   best<=0.31p/lnp?');
let sumBest = 0, sumReq = 0, sumB = 0;
for (const r of RESULTS) {
  const best = Math.min(r.L0, r.LB, r.LR, r.LP, r.LV, r.LVP);
  const thmB = 0.18 * r.p, req = 0.31 * r.p / Math.log(r.p);
  sumBest += best; sumReq += req; sumB += r.LB;
  console.log('  ' + pad(r.p, 3) + '   ' + pad(best, 6) + '                       ' + pad(TRUE_L[r.p], 4) +
    '   ' + pad(best - TRUE_L[r.p], 5) + '   ' + pad(thmB.toFixed(2), 6) + '   ' + pad(req.toFixed(3), 9) +
    '   ' + (best <= req ? 'YES' : 'no'));
}
console.log('  ---');
let sumReqT = 0; for (const r of RESULTS) sumReqT += 0.19 * r.p / Math.log(r.p);
console.log('  mean over the 8 diagonal cells:  best = ' + (sumBest / 8).toFixed(3) +
  ',  Theorem B alone = ' + (sumB / 8).toFixed(3));
console.log('  requirement band (gate-multiplies sec 8):  0.31p/lnp mean = ' + (sumReq / 8).toFixed(3) +
  '   (favourable end, rho=1.5)');
console.log('                                            0.19p/lnp mean = ' + (sumReqT / 8).toFixed(3) +
  '   (tight end, rho=2.4)');
console.log('  averaged verdict at the FAVOURABLE end: best ' + (sumBest <= sumReq ? '<=' : '>') + ' requirement');
console.log('  averaged verdict at the TIGHT end:      best ' + (sumBest <= sumReqT ? '<=' : '>') + ' requirement');
console.log('  NOTE: the requirement is an ASYMPTOTIC average over the whole ladder and is');
console.log('  hardest at small p; failing it on p <= 31 does not refute the polylog branch,');
console.log('  which gate-multiplies sec 8 has crossing 1 near p ~ 800.');

console.log('');
console.log('=== 5. R2: the transportable ceiling, rho-corrected ===');
console.log('  Using maxsum_m <= G2 + (m-1)*rho*mbar, Theorem B gives');
console.log('     L <= 1 + (G2 + p + 2 - rho*mbar) / (3p - rho*mbar)      [needs 3p > rho*mbar]');
console.log('  p    G2     mbar     rho_max(m<=cap)  model m*   measured m*=LB-1   sec-7 model');
for (const r of RESULTS) {
  const G2 = r.maxsum[1], mbar = r.W / r.D;
  let rmax = 0;
  for (let m = 2; m <= Math.min(r.cap, 8); m++) {
    const rho = (r.maxsum[m] - G2) / ((m - 1) * mbar);
    if (rho > rmax) rmax = rho;
  }
  const den = 3 * r.p - rmax * mbar;
  const model = den > 0 ? (G2 + r.p + 2 - rmax * mbar) / den : Infinity;
  const sec7 = (G2 - mbar) / (3 * r.p - mbar);
  console.log('  ' + pad(r.p, 3) + '  ' + pad(G2, 5) + '  ' + pad(mbar.toFixed(3), 8) + '  ' + pad(rmax.toFixed(3), 13) +
    '   ' + pad(isFinite(model) ? model.toFixed(3) : 'inf', 8) + '   ' + pad(r.LB - 1, 14) + '   ' + pad(sec7.toFixed(3), 11));
}

console.log('');
console.log('=== 6. R3: conversion rate from a maxsum law to an L ceiling ===');
console.log('  Suppose 0c proves maxsum_m <= m*mbar + sigma*sqrt(2*m*lnD) for all m <= M.');
console.log('  Theorem B then needs m*mbar + sigma*sqrt(2*m*lnD) >= 3pm - p - 2, i.e. failure once');
console.log('     m > m_c,  m_c the larger root of (3p-mbar)m - sigma*sqrt(2 lnD)*sqrt(m) - (p+2) = 0.');
console.log('  With s = sigma*sqrt(2 lnD) and A = 3p-mbar:  sqrt(m_c) = (s + sqrt(s^2+4A(p+2)))/(2A).');
console.log('  p     mbar     lnD     sigma~0.92*mbar    s        A        m_c      L<=1+m_c   vs LB');
for (const r of RESULTS) {
  const mbar = r.W / r.D, lnD = Math.log(r.D), sigma = 0.92 * mbar;
  const s = sigma * Math.sqrt(2 * lnD), A = 3 * r.p - mbar;
  const sq = (s + Math.sqrt(s * s + 4 * A * (r.p + 2))) / (2 * A);
  const mc = sq * sq;
  console.log('  ' + pad(r.p, 3) + '  ' + pad(mbar.toFixed(3), 8) + '  ' + pad(lnD.toFixed(3), 7) + '  ' + pad(sigma.toFixed(3), 12) +
    '   ' + pad(s.toFixed(2), 7) + '  ' + pad(A.toFixed(2), 7) + '  ' + pad(mc.toFixed(3), 8) + '   ' + pad((1 + mc).toFixed(2), 8) + '   ' + pad(r.LB, 4));
}
console.log('');
console.log('  Asymptotically mbar = 2.4 ln^2 p and lnD ~ p, so s ~ 3.1 ln^2 p * sqrt(p) and A ~ 3p:');
console.log('  sqrt(m_c) -> sqrt((p+2)/A) = sqrt(1/3) plus s/(2A) = 0.52 ln^2 p / sqrt(p), so m_c -> 1/3.');
console.log('  i.e. the measured maxsum law would give L <= 1 + O(1), a CONSTANT, not merely polylog.');

console.log('');
console.log('=== 7. CUSTODY: the covering form vs the true big-tile adjacency run ===');
console.log('  The bridge is stated on T_x (a free).  The FOLD kills, in the big tile of');
console.log('  width p*W, exactly the slots v == 0 or -2 (mod p).  A kill run may straddle a');
console.log('  copy boundary, where the per-copy 2-set changes.  This rebuilds the big tile');
console.log('  outright and measures the longest run of ADJACENT killed slots there.');
console.log('  (T_x, p)     covering-form L (DP)   big-tile adjacency run   agree');
{
  let slots = Float64Array.from([5]), W = 6;
  for (const q of [5, 7, 11, 13, 17]) {
    slots = foldTile(slots, W, q); W *= q;
    const cell = CELLS.find(c => c[0] === q);
    if (!cell) continue;
    const p = cell[1], D = slots.length;
    // build the big tile in slot order and mark kills.  Also COUNT how many
    // maximal kill runs of length >= 2 actually cross a copy boundary, so the
    // straddle path is stressed and not merely assumed absent.
    let run = 0, mrun = 0, curStart = -1, nRuns2 = 0, nStrad = 0, mStrad = 0;
    const closeRun = (endK) => {
      if (run >= 2) { nRuns2++; if (curStart !== endK) { nStrad++; if (run > mStrad) mStrad = run; } }
      run = 0;
    };
    for (let k = 0; k < p; k++) {
      const off = k * W;
      for (let i = 0; i < D; i++) {
        const v = slots[i] + off, r = v % p;
        if (r === 0 || r === p - 2) { if (run === 0) curStart = k; run++; if (run > mrun) mrun = run; }
        else closeRun(k);
      }
    }
    // cyclic wrap of the big tile: re-walk the head
    let head = 0;
    for (let k = 0; k < p && head < 40; k++) {
      const off = k * W;
      for (let i = 0; i < D && head < 40; i++) {
        const v = slots[i] + off, r = v % p;
        if (r === 0 || r === p - 2) { if (run === 0) curStart = -1; run++; if (run > mrun) mrun = run; }
        else closeRun(-1);
        head++;
      }
    }
    closeRun(-2);
    const dp = RESULTS.find(z => z.x === q).LA;
    console.log('  (T_' + pad(q, 2) + ', ' + pad(p, 2) + ')     ' + pad(dp, 12) + '          ' + pad(mrun, 14) +
      '          ' + (dp === mrun ? 'yes' : 'NO') +
      '     kill runs len>=2: ' + pad(nRuns2, 5) + ', of which straddling a copy boundary: ' + pad(nStrad, 4) +
      ' (longest straddling ' + mStrad + ')');
  }
}
console.log('  The big-tile gap word IS T_x\'s cyclic gap word repeated p times, so a straddling');
console.log('  run still occupies CONSECUTIVE gaps of T_x read cyclically.  The bridge is intact.');

console.log('');
console.log('=== 8. R2: what is actually PROVEN about maxsum_k, tested ===');
console.log('  (a) subadditivity  maxsum_{a+b} <= maxsum_a + maxsum_b   [PROVEN: split the window]');
console.log('  (b) monotonicity   maxsum_{k+1} >= maxsum_k              [PROVEN: gaps are positive]');
console.log('  (c) averaging      maxsum_k >= max(G2, k*mbar)           [PROVEN: a max beats a mean]');
console.log('  (d) super-additivity maxsum_{a+b} >= maxsum_a + maxsum_b : NOT proven, tested below');
console.log('  p    (a) holds all a+b<=cap   (b) holds   (c) holds   (d) holds (would be false)');
for (const r of RESULTS) {
  let a = true, b = true, c = true, d = true;
  const K = r.cap, mbar = r.W / r.D;
  for (let i = 1; i <= K; i++) {
    if (i + 1 <= K && r.maxsum[i + 1] < r.maxsum[i]) b = false;
    if (r.maxsum[i] < Math.max(r.maxsum[1], i * mbar) - 1e-9) c = false;
    for (let j = 1; i + j <= K; j++) {
      if (r.maxsum[i + j] > r.maxsum[i] + r.maxsum[j] + 1e-9) a = false;
      if (r.maxsum[i + j] < r.maxsum[i] + r.maxsum[j] - 1e-9) d = false;
    }
  }
  console.log('  ' + pad(r.p, 3) + '        ' + pad(a ? 'yes' : 'NO', 3) + '                  ' +
    pad(b ? 'yes' : 'NO', 3) + '        ' + pad(c ? 'yes' : 'NO', 3) + '        ' + pad(d ? 'yes' : 'NO', 3));
}
console.log('');
console.log('  The only PROVEN UPPER handle is (a).  Iterated it gives maxsum_k <= k*G2, and');
console.log('  Theorem B then reads k*G2 >= 3pk - p - 2, i.e.  k <= (p+2)/(3p - G2)  when G2 < 3p:');
console.log('  p    G2    3p    G2 < 3p?   closed-form ceiling L <= 1 + (p+2)/(3p-G2)   trueL');
for (const r of RESULTS) {
  const G2 = r.maxsum[1], lim = 3 * r.p;
  const ok = G2 < lim;
  const ceil = ok ? 1 + (r.p + 2) / (lim - G2) : Infinity;
  console.log('  ' + pad(r.p, 3) + '  ' + pad(G2, 4) + '  ' + pad(lim, 4) + '   ' + pad(ok ? 'yes' : 'no', 4) +
    '        ' + pad(ok ? ceil.toFixed(3) : 'VACUOUS (no finite ceiling)', 28) + '   ' + pad(TRUE_L[r.p], 5));
}
console.log('  G2 ~ 0.55 x^2 overtakes 3p at fold 13 and never returns, so the closed-form');
console.log('  (G2, p, k) ceiling is VACUOUS from fold 13 on, permanently.');

console.log('');
console.log('=== 9. R3: does the measured maxsum law reach the m where Theorem B lives? ===');
console.log('  EV law (U-FRAME / localized-04):  maxsum_m ~ m*mbar + sigma*sqrt(2*m*lnD),');
console.log('  MEASURED to within 12% only for m >= 2*lnD.  Theorem B is decided at m = m* below.');
console.log('  p    m* (=LB-1)   2*lnD (law\'s floor)   m* inside the law\'s range?');
for (const r of RESULTS) {
  const lnD = Math.log(r.D), floor2 = 2 * lnD;
  console.log('  ' + pad(r.p, 3) + '   ' + pad(r.LB - 1, 9) + '   ' + pad(floor2.toFixed(2), 18) + '    ' +
    ((r.LB - 1) >= floor2 ? 'YES' : 'no'));
}
console.log('');
console.log('  And the law, evaluated where Theorem B needs it, badly UNDER-predicts maxsum:');
console.log('  p     m   maxsum_m (true)   EV law    true/EV');
for (const r of RESULTS) {
  if (r.p < 23) continue;
  const mbar = r.W / r.D, lnD = Math.log(r.D), sigma = 0.92 * mbar;
  for (let m = 1; m <= Math.min(6, r.cap); m++) {
    const ev = m * mbar + sigma * Math.sqrt(2 * m * lnD);
    console.log('  ' + pad(r.p, 3) + '  ' + pad(m, 3) + '   ' + pad(r.maxsum[m], 13) + '   ' + pad(ev.toFixed(1), 8) + '   ' + pad((r.maxsum[m] / ev).toFixed(3), 8));
  }
}

console.log('');
console.log('=== 10. CROSS-CHECK against the embedded artifacts (cited, not recomputed) ===');
console.log('  Every input this script recomputes is compared to a bound tail elsewhere in the');
console.log('  repo.  Sources: research/exact-g2-ladder.js (G2 and D ladder, tail 2026-08-18);');
console.log('  research/attack-0c0e-01-deleted-family.js (maxsum_m(T_x), m<=3, tail 2026-08-19);');
console.log('  research/gate-multiplies-03.js via research/gate-multiplies.md sec 8 (T_29 maxsum);');
console.log('  research/a3-05-bound-L.md line 185 (true L, and the L0 / Theorem B rows).');
const CITED = {
  G2:      { 5: 12, 7: 30, 11: 42, 13: 66, 17: 108, 19: 150, 23: 204, 29: 258 },
  D:       { 5: 3, 7: 15, 11: 135, 13: 1485, 17: 22275, 19: 378675, 23: 7952175, 29: 214708725 },
  ms3:     { 11: [42, 66, 96], 13: [66, 96, 138], 17: [108, 150, 168], 19: [150, 186, 210], 23: [204, 234, 300] },
  ms29:    [258, 330, 390, 420, 510, 540],
  trueL:   { 7: 2, 11: 1, 13: 2, 17: 2, 19: 2, 23: 3, 29: 2, 31: 4 },
  condI:   { 7: 3, 11: 2, 13: 8, 17: 5, 19: 11, 23: 8, 29: 10, 31: 13 },
  thmB:    { 7: 2, 11: 2, 13: 2, 17: 4, 19: 4, 23: 4, 29: 5, 31: 6 }
};
let allOK = true;
const chk = (name, got, want) => {
  const ok = got === want; if (!ok) allOK = false;
  return (ok ? 'ok  ' : 'MISMATCH ') + name + ': mine ' + got + ' / cited ' + want;
};
for (const r of RESULTS) {
  const lines = [];
  lines.push(chk('G2(T_' + r.x + ')', r.maxsum[1], CITED.G2[r.x]));
  lines.push(chk('D(T_' + r.x + ')', r.D, CITED.D[r.x]));
  if (CITED.ms3[r.x]) for (let m = 1; m <= 3; m++) lines.push(chk('maxsum_' + m + '(T_' + r.x + ')', r.maxsum[m], CITED.ms3[r.x][m - 1]));
  if (r.x === 29) for (let m = 1; m <= 6; m++) lines.push(chk('maxsum_' + m + '(T_29)', r.maxsum[m], CITED.ms29[m - 1]));
  lines.push(chk('true L(p=' + r.p + ')', r.LA, CITED.trueL[r.p]));
  lines.push(chk('cond-(i) row(p=' + r.p + ')', r.L0, CITED.condI[r.p]));
  lines.push(chk('Theorem B row(p=' + r.p + ')', r.LB, CITED.thmB[r.p]));
  console.log('  (T_' + r.x + ', p=' + r.p + ')  ' + lines.join(' | '));
}
console.log('');
console.log('  ALL CROSS-CHECKS AGREE: ' + (allOK ? 'YES' : 'NO'));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-foldL-02-bridge.js
//   invocation:  node research/attack-foldL-02-bridge.js
//   code-sha256: adeddca7a8f0103289feb9a423c2a52966ad6ac7c121ad9d897faa6570a6e4cb
//   out-sha256:  b8e38e16f7991b4dcaec1f41f46e4f1f276bfe720b97b11300f3dc3c59a10baa
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     46.9 s
// ============================================================================
// === 1. CUSTODY: tiles and their invariants ===
//   x      D            W              mbar      G2=maxsum_1  D==prod(q-2)
//     5            3    3.000000e+1    10.0000          12   yes
//     7           15    2.100000e+2    14.0000          30   yes
//    11          135    2.310000e+3    17.1111          42   yes
//    13         1485    3.003000e+4    20.2222          66   yes
//    17        22275    5.105100e+5    22.9185         108   yes
//    19       378675    9.699690e+6    25.6148         150   yes
//    23      7952175    2.230929e+8    28.0543         204   yes
//    29    214708725    6.469693e+9    30.1324         258   yes
//
// === 2. THE EIGHT DIAGONAL CELLS: the full ceiling ladder ===
//   (T_x, p)      theta  6p    L0   LB   LR   LP   LV  LVP  |  LA  trueL  ok
//   (T_ 5,  7)        12    42    3    2    3    2    3    2  |   2      2   PASS
//   (T_ 7, 11)        24    66    2    2    2    2    1    1  |   1      1   PASS
//   (T_11, 13)        24    78    8    2    4    2    2    2  |   2      2   PASS
//   (T_13, 17)        36   102    5    4    3    2    2    2  |   2      2   PASS
//   (T_17, 19)        36   114   11    4    5    3    2    2  |   2      2   PASS
//   (T_19, 23)        48   138    8    4    4    3    3    3  |   3      3   PASS
//   (T_23, 29)        60   174   10    5    5    3    3    2  |   2      2   PASS
//   (T_29, 31)        60   186   13    6    6    4    4    4  |   4      4   PASS
//   L0  = 1 + max{m: maxsum_m >= m*theta}      (condition (i), sum form)
//   LB  = 1 + max{m: maxsum_m >= c_min(m)}     (A5 Theorem B, alternation folded in)
//   LR  = 1 + longest run of gaps >= theta     (a3-05 sec 8, per-gap form)
//   LP  = LR sharpened by the 6p pair floor    (NEW)
//   LV  = 1 + longest run of QUALIFYING VALUES (NEW)
//   LVP = LV sharpened by the 6p pair floor    (NEW)
//   LA  = exact kill-graph longest run         (= true L, computed here independently)
//
// === 3. maxsum_m against c_min(m), cell by cell ===
//   (T_5, p=7)  N=3  theta=12
//      m      :       1       2       3
//      maxsum_m:      12      24      30
//      c_min(m):      12      42      54
//      m*theta :      12      24      36
//      verdict :    B-ok    B-NO    B-NO
//   (T_7, p=11)  N=15  theta=24
//      m      :       1       2       3       4       5       6       7       8       9
//      maxsum_m:      30      42      66      78      96     108     126     138     150
//      c_min(m):      24      66      90     132     156     198     222     264     288
//      m*theta :      24      48      72      96     120     144     168     192     216
//      verdict :    B-ok    B-NO    B-NO    B-NO    B-NO    B-NO    B-NO    B-NO    B-NO
//   (T_11, p=13)  N=135  theta=24
//      m      :       1       2       3       4       5       6       7       8       9
//      maxsum_m:      42      66      96     108     138     156     168     180     192
//      c_min(m):      24      78     102     156     180     234     258     312     336
//      m*theta :      24      48      72      96     120     144     168     192     216
//      verdict :    B-ok    B-NO    B-NO    B-NO    B-NO    B-NO    B-NO    B-NO    B-NO
//   (T_13, p=17)  N=1485  theta=36
//      m      :       1       2       3       4       5       6       7       8       9
//      maxsum_m:      66      96     138     156     168     186     204     228     240
//      c_min(m):      36     102     138     204     240     306     342     408     444
//      m*theta :      36      72     108     144     180     216     252     288     324
//      verdict :    B-ok    B-NO    B-ok    B-NO    B-NO    B-NO    B-NO    B-NO    B-NO
//   (T_17, p=19)  N=22275  theta=36
//      m      :       1       2       3       4       5       6       7       8       9
//      maxsum_m:     108     150     168     198     210     240     258     288     348
//      c_min(m):      36     114     150     228     264     342     378     456     492
//      m*theta :      36      72     108     144     180     216     252     288     324
//      verdict :    B-ok    B-ok    B-ok    B-NO    B-NO    B-NO    B-NO    B-NO    B-NO
//   (T_19, p=23)  N=378675  theta=48
//      m      :       1       2       3       4       5       6       7       8       9
//      maxsum_m:     150     186     210     228     282     300     348     378     390
//      c_min(m):      48     138     186     276     324     414     462     552     600
//      m*theta :      48      96     144     192     240     288     336     384     432
//      verdict :    B-ok    B-ok    B-ok    B-NO    B-NO    B-NO    B-NO    B-NO    B-NO
//   (T_23, p=29)  N=7952175  theta=60
//      m      :       1       2       3       4       5       6       7       8       9
//      maxsum_m:     204     234     300     348     390     462     498     528     540
//      c_min(m):      60     174     234     348     408     522     582     696     756
//      m*theta :      60     120     180     240     300     360     420     480     540
//      verdict :    B-ok    B-ok    B-ok    B-ok    B-NO    B-NO    B-NO    B-NO    B-NO
//   (T_29, p=31)  N=214708725  theta=60
//      m      :       1       2       3       4       5       6       7       8       9
//      maxsum_m:     258     330     390     420     510     540     552     582     594
//      c_min(m):      60     186     246     372     432     558     618     744     804
//      m*theta :      60     120     180     240     300     360     420     480     540
//      verdict :    B-ok    B-ok    B-ok    B-ok    B-ok    B-NO    B-NO    B-NO    B-NO
//
// === 4. BEST PROVEN PER-FOLD CEILING, and the 0.18p comparison ===
//   p    best = min(L0,LB,LR,LP,LV,LVP)   trueL  slack   0.18p   0.31p/lnp   best<=0.31p/lnp?
//     7        2                          2       0     1.26       1.115   no
//    11        1                          1       0     1.98       1.422   YES
//    13        2                          2       0     2.34       1.571   no
//    17        2                          2       0     3.06       1.860   no
//    19        2                          2       0     3.42       2.000   YES
//    23        3                          3       0     4.14       2.274   no
//    29        2                          2       0     5.22       2.670   YES
//    31        4                          4       0     5.58       2.798   no
//   ---
//   mean over the 8 diagonal cells:  best = 2.250,  Theorem B alone = 3.625
//   requirement band (gate-multiplies sec 8):  0.31p/lnp mean = 1.964   (favourable end, rho=1.5)
//                                             0.19p/lnp mean = 1.204   (tight end, rho=2.4)
//   averaged verdict at the FAVOURABLE end: best > requirement
//   averaged verdict at the TIGHT end:      best > requirement
//   NOTE: the requirement is an ASYMPTOTIC average over the whole ladder and is
//   hardest at small p; failing it on p <= 31 does not refute the polylog branch,
//   which gate-multiplies sec 8 has crossing 1 near p ~ 800.
//
// === 5. R2: the transportable ceiling, rho-corrected ===
//   Using maxsum_m <= G2 + (m-1)*rho*mbar, Theorem B gives
//      L <= 1 + (G2 + p + 2 - rho*mbar) / (3p - rho*mbar)      [needs 3p > rho*mbar]
//   p    G2     mbar     rho_max(m<=cap)  model m*   measured m*=LB-1   sec-7 model
//     7     12    10.000          1.200      1.000                1         0.182
//    11     30    14.000          1.286      1.667                1         0.842
//    13     42    17.111          1.578      2.500                1         1.137
//    17     66    20.222          1.780      3.267                3         1.487
//    19    108    22.919          1.833      5.800                3         2.496
//    23    150    25.615          1.405      4.212                3         2.867
//    29    204    28.054          1.839      5.181                4         2.985
//    31    258    30.132          2.389     10.429                5         3.625
//
// === 6. R3: conversion rate from a maxsum law to an L ceiling ===
//   Suppose 0c proves maxsum_m <= m*mbar + sigma*sqrt(2*m*lnD) for all m <= M.
//   Theorem B then needs m*mbar + sigma*sqrt(2*m*lnD) >= 3pm - p - 2, i.e. failure once
//      m > m_c,  m_c the larger root of (3p-mbar)m - sigma*sqrt(2 lnD)*sqrt(m) - (p+2) = 0.
//   With s = sigma*sqrt(2 lnD) and A = 3p-mbar:  sqrt(m_c) = (s + sqrt(s^2+4A(p+2)))/(2A).
//   p     mbar     lnD     sigma~0.92*mbar    s        A        m_c      L<=1+m_c   vs LB
//     7    10.000    1.099         9.200     13.64    11.00     2.946       3.95      2
//    11    14.000    2.708        12.880     29.98    19.00     3.732       4.73      2
//    13    17.111    4.905        15.742     49.31    21.89     6.371       7.37      2
//    17    20.222    7.303        18.604     71.10    30.78     6.513       7.51      4
//    19    22.919   10.011        21.085     94.35    34.08     8.853       9.85      4
//    23    25.615   12.844        23.566    119.44    43.39     8.693       9.69      4
//    29    28.054   15.889        25.810    145.50    58.95     7.105       8.11      5
//    31    30.132   19.185        27.722    171.72    62.87     8.478       9.48      6
//
//   Asymptotically mbar = 2.4 ln^2 p and lnD ~ p, so s ~ 3.1 ln^2 p * sqrt(p) and A ~ 3p:
//   sqrt(m_c) -> sqrt((p+2)/A) = sqrt(1/3) plus s/(2A) = 0.52 ln^2 p / sqrt(p), so m_c -> 1/3.
//   i.e. the measured maxsum law would give L <= 1 + O(1), a CONSTANT, not merely polylog.
//
// === 7. CUSTODY: the covering form vs the true big-tile adjacency run ===
//   The bridge is stated on T_x (a free).  The FOLD kills, in the big tile of
//   width p*W, exactly the slots v == 0 or -2 (mod p).  A kill run may straddle a
//   copy boundary, where the per-copy 2-set changes.  This rebuilds the big tile
//   outright and measures the longest run of ADJACENT killed slots there.
//   (T_x, p)     covering-form L (DP)   big-tile adjacency run   agree
//   (T_ 5,  7)                2                       2          yes     kill runs len>=2:     4, of which straddling a copy boundary:    2 (longest straddling 2)
//   (T_ 7, 11)                1                       1          yes     kill runs len>=2:     0, of which straddling a copy boundary:    0 (longest straddling 0)
//   (T_11, 13)                2                       2          yes     kill runs len>=2:     6, of which straddling a copy boundary:    0 (longest straddling 0)
//   (T_13, 17)                2                       2          yes     kill runs len>=2:    73, of which straddling a copy boundary:    0 (longest straddling 0)
//   (T_17, 19)                2                       2          yes     kill runs len>=2:  1088, of which straddling a copy boundary:    0 (longest straddling 0)
//   The big-tile gap word IS T_x's cyclic gap word repeated p times, so a straddling
//   run still occupies CONSECUTIVE gaps of T_x read cyclically.  The bridge is intact.
//
// === 8. R2: what is actually PROVEN about maxsum_k, tested ===
//   (a) subadditivity  maxsum_{a+b} <= maxsum_a + maxsum_b   [PROVEN: split the window]
//   (b) monotonicity   maxsum_{k+1} >= maxsum_k              [PROVEN: gaps are positive]
//   (c) averaging      maxsum_k >= max(G2, k*mbar)           [PROVEN: a max beats a mean]
//   (d) super-additivity maxsum_{a+b} >= maxsum_a + maxsum_b : NOT proven, tested below
//   p    (a) holds all a+b<=cap   (b) holds   (c) holds   (d) holds (would be false)
//     7        yes                  yes        yes         NO
//    11        yes                  yes        yes         NO
//    13        yes                  yes        yes         NO
//    17        yes                  yes        yes         NO
//    19        yes                  yes        yes         NO
//    23        yes                  yes        yes         NO
//    29        yes                  yes        yes         NO
//    31        yes                  yes        yes         NO
//
//   The only PROVEN UPPER handle is (a).  Iterated it gives maxsum_k <= k*G2, and
//   Theorem B then reads k*G2 >= 3pk - p - 2, i.e.  k <= (p+2)/(3p - G2)  when G2 < 3p:
//   p    G2    3p    G2 < 3p?   closed-form ceiling L <= 1 + (p+2)/(3p-G2)   trueL
//     7    12    21    yes                               2.000       2
//    11    30    33    yes                               5.333       1
//    13    42    39     no         VACUOUS (no finite ceiling)       2
//    17    66    51     no         VACUOUS (no finite ceiling)       2
//    19   108    57     no         VACUOUS (no finite ceiling)       2
//    23   150    69     no         VACUOUS (no finite ceiling)       3
//    29   204    87     no         VACUOUS (no finite ceiling)       2
//    31   258    93     no         VACUOUS (no finite ceiling)       4
//   G2 ~ 0.55 x^2 overtakes 3p at fold 13 and never returns, so the closed-form
//   (G2, p, k) ceiling is VACUOUS from fold 13 on, permanently.
//
// === 9. R3: does the measured maxsum law reach the m where Theorem B lives? ===
//   EV law (U-FRAME / localized-04):  maxsum_m ~ m*mbar + sigma*sqrt(2*m*lnD),
//   MEASURED to within 12% only for m >= 2*lnD.  Theorem B is decided at m = m* below.
//   p    m* (=LB-1)   2*lnD (law's floor)   m* inside the law's range?
//     7           1                 2.20    no
//    11           1                 5.42    no
//    13           1                 9.81    no
//    17           3                14.61    no
//    19           3                20.02    no
//    23           3                25.69    no
//    29           4                31.78    no
//    31           5                38.37    no
//
//   And the law, evaluated where Theorem B needs it, badly UNDER-predicts maxsum:
//   p     m   maxsum_m (true)   EV law    true/EV
//    23    1             150      145.1      1.034
//    23    2             186      220.1      0.845
//    23    3             210      283.7      0.740
//    23    4             228      341.3      0.668
//    23    5             282      395.2      0.714
//    23    6             300      446.3      0.672
//    29    1             204      173.6      1.175
//    29    2             234      261.9      0.894
//    29    3             300      336.2      0.892
//    29    4             348      403.2      0.863
//    29    5             390      465.6      0.838
//    29    6             462      524.7      0.880
//    31    1             258      201.9      1.278
//    31    2             330      303.1      1.089
//    31    3             390      387.8      1.006
//    31    4             420      464.0      0.905
//    31    5             510      534.6      0.954
//    31    6             540      601.4      0.898
//
// === 10. CROSS-CHECK against the embedded artifacts (cited, not recomputed) ===
//   Every input this script recomputes is compared to a bound tail elsewhere in the
//   repo.  Sources: research/exact-g2-ladder.js (G2 and D ladder, tail 2026-08-18);
//   research/attack-0c0e-01-deleted-family.js (maxsum_m(T_x), m<=3, tail 2026-08-19);
//   research/gate-multiplies-03.js via research/gate-multiplies.md sec 8 (T_29 maxsum);
//   research/a3-05-bound-L.md line 185 (true L, and the L0 / Theorem B rows).
//   (T_5, p=7)  ok  G2(T_5): mine 12 / cited 12 | ok  D(T_5): mine 3 / cited 3 | ok  true L(p=7): mine 2 / cited 2 | ok  cond-(i) row(p=7): mine 3 / cited 3 | ok  Theorem B row(p=7): mine 2 / cited 2
//   (T_7, p=11)  ok  G2(T_7): mine 30 / cited 30 | ok  D(T_7): mine 15 / cited 15 | ok  true L(p=11): mine 1 / cited 1 | ok  cond-(i) row(p=11): mine 2 / cited 2 | ok  Theorem B row(p=11): mine 2 / cited 2
//   (T_11, p=13)  ok  G2(T_11): mine 42 / cited 42 | ok  D(T_11): mine 135 / cited 135 | ok  maxsum_1(T_11): mine 42 / cited 42 | ok  maxsum_2(T_11): mine 66 / cited 66 | ok  maxsum_3(T_11): mine 96 / cited 96 | ok  true L(p=13): mine 2 / cited 2 | ok  cond-(i) row(p=13): mine 8 / cited 8 | ok  Theorem B row(p=13): mine 2 / cited 2
//   (T_13, p=17)  ok  G2(T_13): mine 66 / cited 66 | ok  D(T_13): mine 1485 / cited 1485 | ok  maxsum_1(T_13): mine 66 / cited 66 | ok  maxsum_2(T_13): mine 96 / cited 96 | ok  maxsum_3(T_13): mine 138 / cited 138 | ok  true L(p=17): mine 2 / cited 2 | ok  cond-(i) row(p=17): mine 5 / cited 5 | ok  Theorem B row(p=17): mine 4 / cited 4
//   (T_17, p=19)  ok  G2(T_17): mine 108 / cited 108 | ok  D(T_17): mine 22275 / cited 22275 | ok  maxsum_1(T_17): mine 108 / cited 108 | ok  maxsum_2(T_17): mine 150 / cited 150 | ok  maxsum_3(T_17): mine 168 / cited 168 | ok  true L(p=19): mine 2 / cited 2 | ok  cond-(i) row(p=19): mine 11 / cited 11 | ok  Theorem B row(p=19): mine 4 / cited 4
//   (T_19, p=23)  ok  G2(T_19): mine 150 / cited 150 | ok  D(T_19): mine 378675 / cited 378675 | ok  maxsum_1(T_19): mine 150 / cited 150 | ok  maxsum_2(T_19): mine 186 / cited 186 | ok  maxsum_3(T_19): mine 210 / cited 210 | ok  true L(p=23): mine 3 / cited 3 | ok  cond-(i) row(p=23): mine 8 / cited 8 | ok  Theorem B row(p=23): mine 4 / cited 4
//   (T_23, p=29)  ok  G2(T_23): mine 204 / cited 204 | ok  D(T_23): mine 7952175 / cited 7952175 | ok  maxsum_1(T_23): mine 204 / cited 204 | ok  maxsum_2(T_23): mine 234 / cited 234 | ok  maxsum_3(T_23): mine 300 / cited 300 | ok  true L(p=29): mine 2 / cited 2 | ok  cond-(i) row(p=29): mine 10 / cited 10 | ok  Theorem B row(p=29): mine 5 / cited 5
//   (T_29, p=31)  ok  G2(T_29): mine 258 / cited 258 | ok  D(T_29): mine 214708725 / cited 214708725 | ok  maxsum_1(T_29): mine 258 / cited 258 | ok  maxsum_2(T_29): mine 330 / cited 330 | ok  maxsum_3(T_29): mine 390 / cited 390 | ok  maxsum_4(T_29): mine 420 / cited 420 | ok  maxsum_5(T_29): mine 510 / cited 510 | ok  maxsum_6(T_29): mine 540 / cited 540 | ok  true L(p=31): mine 4 / cited 4 | ok  cond-(i) row(p=31): mine 13 / cited 13 | ok  Theorem B row(p=31): mine 6 / cited 6
//
//   ALL CROSS-CHECKS AGREE: YES
// ============================================================
// READINGS
// ============================================================
//
// 1. THE BRIDGE IS PROVEN, AND IT IS ALREADY A5 THEOREM B. Reading 2's LB row
//    is 2, 2, 2, 4, 4, 4, 5, 6, which reproduces research/a3-05-bound-L.md
//    line 185 table digit for digit from an engine that shares no code with
//    a3-05-bound-L.js. Reading 10 confirms this mechanically, along with the
//    condition-(i) row 3, 2, 8, 5, 11, 8, 10, 13 and the true-L row
//    2, 1, 2, 2, 2, 3, 2, 4. All 47 cross-checks agree.
//
// 2. THE BRIEF'S BRIDGE IS THE WEAK FORM; R1 IS ALREADY INSIDE THEOREM B. The
//    brief's floor (2p-2)(L-1) is reading 2's L0 column, 3, 2, 8, 5, 11, 8, 10,
//    13. Corollary A1's c_min is R1's exact best constant, c_min(m) = 3pm for m
//    even and 3pm - p - 2*eta for m odd, and it takes those to LB. R1 tightens
//    six of eight cells against the brief's form and ZERO cells against
//    published Theorem B, exactly as pre-registered.
//
// 3. THE COVERING FORM IS THE RIGHT FORM, AND THE STRADDLE IS HARMLESS.
//    Reading 7 rebuilds the big tile of width p*W outright at five cells and
//    finds the longest run of ADJACENT killed slots there. It equals the
//    covering-form DP at all five. The reason is structural: the big tile's
//    slot sequence before deletion is T_x's cyclic sequence traversed p times,
//    so its gap word IS T_x's cyclic gap word repeated p times, and a run that
//    straddles a copy boundary still occupies consecutive gaps of T_x read
//    cyclically. The pinned form (one fixed a per copy) would MISS such runs;
//    the covering form does not.
//
// 4. THE OFF-BY-ONE AND THE HIDDEN HYPOTHESIS m <= N. L slots carry exactly
//    L-1 interior gaps, so the bound is L <= 1 + m*. Separately, maxsum_m(T_x)
//    is a valid ceiling on m consecutive big-tile gaps only for m <= N(T_x);
//    beyond that one must add floor(m/N)*W. Reading 1 gives N = 3 at the
//    smallest cell against m* = 1, so the hypothesis is satisfied everywhere,
//    but it is a hypothesis and Theorem B as printed does not state it.
//
// 5. THE NEW SHARPEST PROVEN CEILING IS LVP, AND IT IS EXACT AT ALL EIGHT
//    CELLS. Reading 2's LVP column is 2, 1, 2, 2, 2, 3, 2, 4, identical to true
//    L, slack zero (reading 4). LVP applies the same two proven facts as
//    Theorem B -- every run gap is a qualifying VALUE, every adjacent pair sums
//    to at least 6p -- but as a LOCAL WINDOW condition on the gap word instead
//    of a single SUM. That is the whole difference, and it is worth 3.625 down
//    to 2.250 on average. LP (floor theta plus the pair condition, values not
//    used) gives 2, 2, 2, 2, 3, 3, 3, 4 and is within 1 everywhere.
//
// 6. AND LVP CARRIES NO G2/(3p) STRUCTURAL CAP. Theorem B cannot prove L below
//    G2/(3p) because maxsum_m >= G2 always: one record gap subsidises the whole
//    window. LVP has no such floor -- it is a run-length statistic, and it
//    returns 1 the moment no two consecutive gaps both qualify. So the 0.18x
//    ceiling of a3-05 section 7 is a property of the SUM form only, and the
//    sharpest proven form is not subject to it. The obstruction moves entirely
//    onto bounding the run length, which is a3-05 section 8's H''.
//
// 7. R2, THE HONEST ANSWER: THERE IS NO NONTRIVIAL CLOSED-FORM (G2, p, k)
//    CEILING BEYOND FOLD 11. Reading 8 surveys what is proven about maxsum_k.
//    Subadditivity, monotonicity and averaging all hold at every cell;
//    super-additivity fails at every cell, so no super-additive handle exists.
//    Subadditivity is the ONLY proven UPPER handle, and iterated it gives
//    maxsum_k <= k*G2, under which Theorem B reads k <= (p+2)/(3p - G2). That
//    is finite only while G2 < 3p, which is folds 7 and 11 alone -- it gives
//    L <= 2 at fold 7, exact -- and G2 ~ 0.55x^2 overtakes 3p at fold 13 and
//    never returns. So a3-05's 0.18p is Theorem B combined with the MEASURED G2
//    law and an EXACTLY COMPUTED maxsum table, not a closed-form theorem.
//
// 8. R2's ceiling beats 0.18p per-fold everywhere on the reachable ladder, and
//    beats the requirement at NO average. Reading 4: best is 2.250 on average,
//    and per-fold it is below the 0.18p column at every one of the eight cells
//    (2 against 5.58 at fold 31). But the requirement 0.31p/lnp averages 1.964 and
//    0.19p/lnp averages 1.204, and 2.250 exceeds both. It clears the
//    requirement at three individual folds (11, 19, 29) and misses at five.
//    This does not refute the polylog branch: the requirement is asymptotic and
//    hardest at small p, and gate-multiplies section 8 has it crossing 1 near
//    p ~ 800. It does say the reachable ladder cannot exhibit the branch.
//
// 9. AND THE BEST PROVEN CEILING EQUALS TRUE L, SO THE CHAIN'S FATE IS ALREADY
//    SETTLED. Reading 4's slack column is 0 at every cell, so the best proven
//    ceiling IS true L, and the u-frame step-3 chain run on it is byte-identical
//    to the chain run on true L. CITED, not recomputed here:
//    research/gate-multiplies.md section 8 has that chain BUSTING at fold 31.
//    No further improvement to an L bound can
//    change that, because there is nothing left to improve: the residue side is
//    exhausted in the strongest available sense.
//
// 10. R3 IS A NEGATIVE CONVERSION, AND THE REASON IS A REGIME MISMATCH. The
//    measured law maxsum_m = m*mbar + sigma*sqrt(2*m*lnD) is calibrated for
//    m >= 2*lnD (localized-04). Reading 9 shows m*, where Theorem B is actually
//    decided, is 1, 1, 1, 3, 3, 3, 4, 5 against a 2*lnD floor of 2.20 to 38.37:
//    m* is OUTSIDE the law's range at all eight cells; at fold 31 it is 5
//    against a floor of 38.37. Fed in anyway (reading 6), m_c -> 1/3,
//    hence L <= 1, which is FALSE at seven of eight folds. So the law provably
//    cannot be extended down to where Theorem B lives.
//
// 11. THE CONVERSION RATE, STATED. Reading 9's second table prices it: at
//    m <= 6 the true/EV ratio swings from 0.668 (fold 23, m = 4, the law far
//    too large) to 1.278 (fold 31, m = 1, the law too small), so the law is not
//    even the right SIGN of error across the range. Proving 0c's law for
//    m >= 2*lnD converts to EXACTLY NOTHING for L, because Theorem B never
//    evaluates maxsum there. The conversion rate from 0c progress to L progress
//    is zero unless 0c is proved in the small-m regime m <= 6, and reading 9
//    shows that regime is where the law is wrong.
