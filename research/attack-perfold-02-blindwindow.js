// ============================================================================
// ATTACK perfold-02 — THE BLIND FOLD-FACTOR BAND TEST AT A FRESH ANCHOR
// ============================================================================
// Producer of the test pre-registered in
// `research/history/staging/perfold-window-prereg.md`, which was committed
// ALONE (2c28443) before this file existed. The prereg fixed the window
// [A, A + 2e9) at A = 66,000,000,000 (a fresh anchor, multiple of 6, used by
// no window in the corpus), the 37-fold population, every predictive band,
// both scoring criteria and every consequence, before this producer was
// written.
//
// WHAT IS TESTED. `attack-perfold-01-error-model.js` (formally embedded)
// found that the extinction law's per-fold error is a DETERMINISTIC fold
// factor: X_p ~ Poisson(lambda_model(p, Y) * M_p) with M_p fixed per fold
// across window lengths and anchors. Its predictive for an unrun window is
//    X_p ~ NB(r = Sx_p + 1/2, q = lam_h / (lam_h + Slam_p)),
// Sx_p, Slam_p pooled over the six embedded windows, lam_h = lambda_model at
// Y = 2e9. This file measures the new window and scores those bands:
//    (a) HIT needs >= 28 of 37 folds inside their 90% band,
//    (b) and at most 1 of 37 outside its 99.73% band.
// Units on both sides: counts of adjacent kill pairs per fold (dimensionless).
//
// THE ENGINE is the chunked streaming engine of
// `research/attack-foldL-06-scaling.js`, copied VERBATIM below (same object,
// same conventions: n = 5 mod 6, key(n) = min prime >= 5 dividing n(n+2),
// X_p = kills - runs at the level-p word, theta_p = 2p - 2*eta). Stage A
// reproduces the embedded [0, 2e9) calibration digit for digit and aborts on
// any mismatch, so the copy is proven to be the same engine before the new
// anchor is touched. Stage B re-derives every band of the prereg table from
// its own (Sx, Slam, lam_h) via the declared NB formula and aborts if any
// figure moved. Stage C measures. Stage D scores.
// ============================================================================

'use strict';
const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1);

const QMAX = 1500;                      // same fold range as angle 4: p to 1499
const CHUNK = Number(process.env.CHUNK || 1e8);
const BIGY = Number(process.env.BIGY || 2e10);
const STAGE = process.env.STAGE || 'all';   // 'predict' = stages A+B only

// ---- primes, folds, constants -------------------------------------------
const comp = new Uint8Array(QMAX + 1), primes = [];
for (let i = 2; i <= QMAX; i++) { if (!comp[i]) { primes.push(i); for (let j = i * i; j <= QMAX; j += i) comp[j] = 1; } }
const folds = primes.filter(q => q >= 5);
const F = folds.length;
const fidx = new Int32Array(QMAX + 2).fill(-1);
folds.forEach((q, j) => { fidx[q] = j; });
const INFK = QMAX + 1;
const theta = folds.map(p => 2 * p - 2 * ((p % 6 === 1) ? 1 : -1));
function modInv(a, m) { let g = m, x = 0, x1 = 1, a1 = a; while (a1 !== 0) { const qq = (g / a1) | 0; [g, a1] = [a1, g - qq * a1]; [x, x1] = [x1, x - qq * x1]; } return ((x % m) + m) % m; }
const inv6 = new Int32Array(QMAX + 1);
for (const q of folds) inv6[q] = modInv(6 % q, q);

console.log('folds: ' + F + ' primes from ' + folds[0] + ' to ' + folds[F - 1] +
  ';  chunk = ' + CHUNK.toExponential(0) + ' slots');

// ---- the streaming engine ------------------------------------------------
function runWindow(A, Y, label) {
  // n = A + 6i + 5 has to stay in the twin-slot class 5 (mod 6). An anchor that
  // is not a multiple of 6 silently walks a different residue class and every
  // number below it is a number about the wrong object. Caught exactly that way
  // on the first offset run, where A = 1e10 = 4 (mod 6) put the walk on n = 3
  // (mod 6), i.e. on multiples of 3.
  if (A % 6 !== 0) throw new Error('anchor A must be a multiple of 6, got ' + A);
  const t0 = Date.now();
  const M = Math.floor((Y - 5) / 6) + 1;          // n = A + 6i + 5, i < M
  const kills = new Float64Array(F), runsC = new Float64Array(F);
  const hist = new Float64Array(F * 10);          // run-length histogram, 9 = "9 or more"
  const maxL = new Int32Array(F);
  const candG = new Float64Array(F);              // gap candidate recorded at a level floor
  const stK = new Int32Array(F + 4), stPos = new Float64Array(F + 4), stRun = new Float64Array(F + 4);
  let sp = 0;
  const csize = Math.min(M, CHUNK);
  const key = new Uint16Array(csize);
  for (let i0 = 0; i0 < M; i0 += csize) {
    const i1 = Math.min(M, i0 + csize), len = i1 - i0;
    key.fill(0, 0, len);
    // smallest prime factor >= 5 of n(n+2): write folds in DECREASING order so
    // the smallest one to touch a slot is the one that survives, no read needed
    for (let fi = F - 1; fi >= 0; fi--) {
      const q = folds[fi], iv = inv6[q], Aq = A % q, off = i0 % q;
      for (let tt = 0; tt < 2; tt++) {
        const t = tt === 0 ? 0 : q - 2;           // n = 0 (mod q) or n = -2 (mod q)
        let s = (((t - 5 - Aq) % q) + q) % q;
        s = (s * iv) % q;                          // i = s (mod q)
        let st = ((s - off) % q + q) % q;
        for (let i = st; i < len; i += q) key[i] = q;
      }
    }
    for (let i = 0; i < len; i++) {
      const kk = key[i];
      const k = kk === 0 ? INFK : kk;
      const n = A + 6 * (i0 + i) + 5;
      let bidx = 0;
      while (sp > 0 && stK[sp - 1] < k) {
        sp--;
        const j = fidx[stK[sp]], rl = stRun[sp];
        runsC[j]++; if (rl > maxL[j]) maxL[j] = rl;
        hist[j * 10 + (rl < 9 ? rl : 9)]++;
        const g = n - stPos[sp];
        if (bidx < F && g > candG[bidx]) candG[bidx] = g;
        bidx = j + 1;
      }
      if (sp > 0) { const g = n - stPos[sp - 1]; if (bidx < F && g > candG[bidx]) candG[bidx] = g; }
      if (sp > 0 && stK[sp - 1] === k) { stRun[sp - 1]++; stPos[sp - 1] = n; }
      else { stK[sp] = k; stPos[sp] = n; stRun[sp] = 1; sp++; }
      if (kk !== 0) kills[fidx[kk]]++;
    }
  }
  while (sp > 0) {                                 // runs closed by the window end
    sp--;
    if (stK[sp] === INFK) continue;
    const j = fidx[stK[sp]], rl = stRun[sp];
    runsC[j]++; if (rl > maxL[j]) maxL[j] = rl; hist[j * 10 + (rl < 9 ? rl : 9)]++;
  }
  // running max upward gives the record gap of each level
  const G2b = new Float64Array(F);
  { let m = 0; for (let j = 0; j < F; j++) { if (candG[j] > m) m = candG[j]; G2b[j] = m; } }
  const rows = [];
  let N = M, surv = M;
  for (let j = 0; j < F; j++) {
    const Nb = surv; surv -= kills[j];
    rows.push({
      p: folds[j], j, theta: theta[j], kills: kills[j], runs: runsC[j],
      X: kills[j] - runsC[j], L: Math.max(1, maxL[j]),
      Nbefore: Nb, Nafter: surv, mbarB: Y / Nb, mbarA: Y / surv,
      thr: theta[j] / (Y / Nb), G2: G2b[j],
      hist: Array.from(hist.subarray(j * 10, j * 10 + 10)),
    });
  }
  const secs = (Date.now() - t0) / 1000;
  console.log('[' + el() + 's] ' + label + ': A = ' + A.toExponential(1) + ', Y = ' + Y.toExponential(1) +
    ', slots = ' + M + ', ' + secs.toFixed(1) + ' s');
  return { A, Y, M, rows, secs, label };
}

function summarise(w) {
  const r = w.rows;
  let lastLive = null, lastQual = null, n2 = 0, s1 = 0, n2d = 0, s1d = 0, sx = 0;
  for (const x of r) {
    if (x.L >= 2) { lastLive = x.p; n2++; s1 += x.L - 1; if (x.p >= 100) { n2d++; s1d += x.L - 1; } }
    if (x.theta <= x.G2) lastQual = x.p;
    sx += x.X;
  }
  return { lastLive, lastQual, n2, s1, n2d, s1d, sx, maxL: Math.max(...r.map(x => x.L)) };
}

// ---------------------------------------------------------------------------
// the prereg table, hardcoded from perfold-window-prereg.md §2 (itself quoted
// verbatim from the embedded Stage 4 of attack-perfold-01-error-model.js)
// ---------------------------------------------------------------------------
const PREREG = [
  { p: 101, lam: 269.37, Sx: 29454, Sl: 30199.0, mean: 262.73, l90: 236, u90: 290, l99: 215, u99: 313, pM0: 1.00 },
  { p: 103, lam: 281.59, Sx: 31072, Sl: 31569.2, mean: 277.16, l90: 250, u90: 305, l99: 228, u99: 329, pM0: 1.00 },
  { p: 107, lam: 226.77, Sx: 14490, Sl: 25423.6, mean: 129.25, l90: 111, u90: 148, l99: 96, u99: 165, pM0: 0.00 },
  { p: 109, lam: 236.81, Sx: 15451, Sl: 26548.7, mean: 137.82, l90: 119, u90: 158, l99: 104, u99: 175, pM0: 0.00 },
  { p: 113, lam: 192.42, Sx: 29916, Sl: 21572.3, mean: 266.85, l90: 240, u90: 294, l99: 219, u99: 317, pM0: 0.02 },
  { p: 127, lam: 115.64, Sx: 22880, Sl: 12964.4, mean: 204.09, l90: 181, u90: 228, l99: 162, u99: 248, pM0: 0.00 },
  { p: 131, lam: 95.20, Sx: 8096, Sl: 10672.4, mean: 72.22, l90: 58, u90: 87, l99: 48, u99: 99, pM0: 0.78 },
  { p: 137, lam: 77.56, Sx: 6174, Sl: 8695.5, mean: 55.08, l90: 43, u90: 68, l99: 34, u99: 79, pM0: 0.68 },
  { p: 139, lam: 81.09, Sx: 6796, Sl: 9091.5, mean: 60.62, l90: 48, u90: 74, l99: 39, u99: 85, pM0: 0.78 },
  { p: 149, lam: 52.33, Sx: 8135, Sl: 5867.1, mean: 72.57, l90: 59, u90: 87, l99: 48, u99: 100, pM0: 0.60 },
  { p: 151, lam: 54.72, Sx: 8742, Sl: 6134.5, mean: 77.98, l90: 64, u90: 93, l99: 53, u99: 106, pM0: 0.44 },
  { p: 157, lam: 45.25, Sx: 4880, Sl: 5073.2, mean: 43.53, l90: 33, u90: 55, l99: 25, u99: 65, pM0: 1.00 },
  { p: 163, lam: 37.57, Sx: 2407, Sl: 4211.6, mean: 21.47, l90: 14, u90: 29, l99: 9, u99: 37, pM0: 0.65 },
  { p: 167, lam: 31.67, Sx: 2885, Sl: 3550.5, mean: 25.74, l90: 18, u90: 34, l99: 12, u99: 42, pM0: 0.99 },
  { p: 173, lam: 26.48, Sx: 4822, Sl: 2968.3, mean: 43.02, l90: 32, u90: 54, l99: 25, u99: 64, pM0: 0.42 },
  { p: 179, lam: 22.22, Sx: 4061, Sl: 2490.7, mean: 36.23, l90: 27, u90: 46, l99: 20, u99: 56, pM0: 0.53 },
  { p: 181, lam: 23.20, Sx: 4253, Sl: 2601.5, mean: 37.94, l90: 28, u90: 48, l99: 21, u99: 58, pM0: 0.48 },
  { p: 191, lam: 15.78, Sx: 627, Sl: 1769.2, mean: 5.60, l90: 2, u90: 10, l99: 0, u99: 14, pM0: 0.81 },
  { p: 193, lam: 16.50, Sx: 715, Sl: 1849.3, mean: 6.38, l90: 3, u90: 11, l99: 0, u99: 15, pM0: 0.76 },
  { p: 197, lam: 14.10, Sx: 868, Sl: 1581.1, mean: 7.75, l90: 3, u90: 13, l99: 1, u99: 17, pM0: 0.98 },
  { p: 199, lam: 14.73, Sx: 877, Sl: 1651.2, mean: 7.83, l90: 4, u90: 13, l99: 1, u99: 17, pM0: 0.95 },
  { p: 211, lam: 10.11, Sx: 2521, Sl: 1133.2, mean: 22.49, l90: 15, u90: 31, l99: 10, u99: 38, pM0: 0.27 },
  { p: 223, lam: 6.98, Sx: 339, Sl: 782.7, mean: 3.03, l90: 1, u90: 6, l99: 0, u99: 9, pM0: 1.00 },
  { p: 227, lam: 6.00, Sx: 237, Sl: 673.0, mean: 2.12, l90: 0, u90: 5, l99: 0, u99: 8, pM0: 1.00 },
  { p: 229, lam: 6.30, Sx: 249, Sl: 705.8, mean: 2.23, l90: 0, u90: 5, l99: 0, u99: 8, pM0: 1.00 },
  { p: 233, lam: 5.45, Sx: 428, Sl: 610.9, mean: 3.82, l90: 1, u90: 7, l99: 0, u99: 11, pM0: 1.00 },
  { p: 239, lam: 4.68, Sx: 442, Sl: 525.2, mean: 3.95, l90: 1, u90: 7, l99: 0, u99: 11, pM0: 1.00 },
  { p: 241, lam: 4.89, Sx: 520, Sl: 548.0, mean: 4.64, l90: 1, u90: 8, l99: 0, u99: 12, pM0: 1.00 },
  { p: 251, lam: 3.49, Sx: 208, Sl: 390.9, mean: 1.86, l90: 0, u90: 4, l99: 0, u99: 7, pM0: 1.00 },
  { p: 257, lam: 3.01, Sx: 189, Sl: 337.8, mean: 1.69, l90: 0, u90: 4, l99: 0, u99: 7, pM0: 1.00 },
  { p: 263, lam: 2.61, Sx: 309, Sl: 292.4, mean: 2.76, l90: 0, u90: 6, l99: 0, u99: 9, pM0: 0.99 },
  { p: 269, lam: 2.26, Sx: 201, Sl: 253.7, mean: 1.80, l90: 0, u90: 4, l99: 0, u99: 7, pM0: 1.00 },
  { p: 271, lam: 2.36, Sx: 237, Sl: 264.5, mean: 2.12, l90: 0, u90: 5, l99: 0, u99: 8, pM0: 0.99 },
  { p: 277, lam: 2.05, Sx: 141, Sl: 229.8, mean: 1.26, l90: 0, u90: 3, l99: 0, u99: 6, pM0: 1.00 },
  { p: 281, lam: 1.80, Sx: 38, Sl: 201.4, mean: 0.34, l90: 0, u90: 1, l99: 0, u99: 3, pM0: 1.00 },
  { p: 283, lam: 1.86, Sx: 59, Sl: 208.7, mean: 0.53, l90: 0, u90: 2, l99: 0, u99: 4, pM0: 1.00 },
  { p: 293, lam: 1.36, Sx: 158, Sl: 152.3, mean: 1.41, l90: 0, u90: 4, l99: 0, u99: 6, pM0: 0.98 },
];
const ANCHOR = 66000000000, YNEW = 2e9;

// NB predictive machinery (same formulas as the prereg declares)
function lgamma(x) {
  const g = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313,
    -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x);
  x -= 1; let a = g[0]; const t = x + 7.5;
  for (let i = 1; i < 9; i++) a += g[i] / (x + i);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}
function nbRow(row) {
  const r = row.Sx + 0.5, q = row.lam / (row.lam + row.Sl);
  const mean = r * q / (1 - q), sd = Math.sqrt(mean / (1 - q));
  const logf = x => lgamma(x + r) - lgamma(r) - lgamma(x + 1) + r * Math.log(1 - q) + x * Math.log(q);
  function central(alpha) {
    const hi = Math.ceil(mean + 12 * sd + 20);
    let c = 0, lo = -1, up = -1;
    for (let x = 0; x <= hi; x++) {
      c += Math.exp(logf(x));
      if (lo < 0 && c >= alpha / 2) lo = x;
      if (up < 0 && c >= 1 - alpha / 2) { up = x; break; }
    }
    return [Math.max(0, lo), up < 0 ? hi : up];
  }
  return { mean, logf, i90: central(0.10), i99: central(0.0027) };
}

// ============ STAGE A — calibration: the copied engine against the record ==
console.log('');
console.log('############ STAGE A — calibration, [0, 2e9), digit for digit ############');
const CAL = runWindow(0, 2e9, 'calibration');
const calRow = p => CAL.rows[fidx[p]];
const SC = summarise(CAL);
const EXPECT = [
  ['slots', CAL.M, 333333333],
  ['fold 7   X', calRow(7).X, 19047619],
  ['fold 23  X', calRow(23).X, 106418],
  ['fold 29  X', calRow(29).X, 75336],
  ['fold 421 kills', calRow(421).kills, 105790],
  ['fold 421 runs', calRow(421).runs, 105789],
  ['fold 421 X', calRow(421).X, 1],
  ['N2(p >= 100)', SC.n2d, 37],
  ['sum X', SC.sx, 20317943],
  ['last L >= 2 fold', SC.lastLive, 421],
  ['last theta <= G2 fold', SC.lastQual, 1021],
];
let bad = 0;
for (const [name, got, want] of EXPECT) {
  const ok = got === want; if (!ok) bad++;
  console.log('  ' + (ok ? 'OK  ' : 'FAIL') + '  ' + name.padEnd(24) + ' got ' + got + '  record ' + want);
}
if (bad) throw new Error('calibration failed: the copied engine is NOT the record engine');

// ============ STAGE B — the prereg table re-derived, then frozen ===========
console.log('');
console.log('############ STAGE B — prereg bands re-derived from (Sx, Slam, lam) ############');
let drift = 0;
for (const row of PREREG) {
  const nb = nbRow(row);
  // the table prints Slam to 1 decimal and the mean to 2, so a recomputed mean
  // can land on the far side of the print-rounding boundary: tolerance 0.015.
  // The BANDS are the scored objects and must reproduce integer-exactly.
  const ok = Math.abs(nb.mean - row.mean) <= 0.015 + 1e-9 &&
    nb.i90[0] === row.l90 && nb.i90[1] === row.u90 && nb.i99[0] === row.l99 && nb.i99[1] === row.u99;
  if (!ok) { drift++; console.log('  DRIFT at p=' + row.p + ': mean ' + nb.mean.toFixed(2) + ' [' + nb.i90 + '] [' + nb.i99 + ']'); }
}
console.log('  ' + (PREREG.length - drift) + ' of ' + PREREG.length + ' prereg rows reproduce exactly' + (drift ? '' : '  OK'));
if (drift) throw new Error('prereg table drift: the declared formula does not reproduce the sealed bands');

// ============ STAGE C — MEASUREMENT, the fresh anchor ======================
console.log('');
console.log('############ STAGE C — MEASUREMENT, [6.6e10, 6.6e10 + 2e9), anchor never used ############');
const NEW = runWindow(ANCHOR, YNEW, 'blind window');
const SN = summarise(NEW);
console.log('  for the record (NOT scored): N2(p>=100) = ' + SN.n2d + ';  S1(p>=100) = ' + SN.s1d +
  ';  sum X = ' + SN.sx + ';  last L >= 2 fold = ' + SN.lastLive + ';  max L = ' + SN.maxL);

// ============ STAGE D — scored against the prereg ==========================
console.log('');
console.log('############ STAGE D — the pre-registered score ############');
console.log('    p    pred.mean   90% band       99.73% band     X meas   in90  in99.7  (old clause)');
let in90 = 0, in99 = 0, inOld = 0;
for (const row of PREREG) {
  const X = NEW.rows[fidx[row.p]].X;
  const a = X >= row.l90 && X <= row.u90, b = X >= row.l99 && X <= row.u99;
  const lo = Math.max(0, row.lam - 3 * Math.sqrt(row.lam)), hi = row.lam + 3 * Math.sqrt(row.lam);
  const old = X >= lo && X <= hi;
  if (a) in90++; if (b) in99++; if (old) inOld++;
  console.log('    ' + String(row.p).padEnd(5) + row.mean.toFixed(2).padStart(8) + '   ' +
    ('[' + row.l90 + ', ' + row.u90 + ']').padEnd(13) + '  ' + ('[' + row.l99 + ', ' + row.u99 + ']').padEnd(13) +
    String(X).padStart(7) + '   ' + (a ? 'yes' : 'NO ') + '   ' + (b ? 'yes' : 'NO ') + '     ' + (old ? 'yes' : 'NO'));
}
const critA = in90 >= 28, critB = (PREREG.length - in99) <= 1;
console.log('');
console.log('  (a) inside 90% bands:    ' + in90 + ' of 37   (prereg: HIT needs >= 28; model expected 34.6)  -> ' + (critA ? 'PASS' : 'FAIL'));
console.log('  (b) outside 99.73% bands: ' + (PREREG.length - in99) + ' of 37   (prereg: HIT allows <= 1)                     -> ' + (critB ? 'PASS' : 'FAIL'));
console.log('  contrast, NOT scored: old Poisson +-3sqrt(lambda_model) clause: ' + inOld + ' of 37 = ' +
  (100 * inOld / 37).toFixed(1) + '%  (model expected 28.1; the registered clause demands 90%)');
console.log('');
console.log('  VERDICT UNDER THE PRE-REGISTERED RULE: ' + (critA && critB ? 'HIT' : 'MISS'));

console.log('');
console.log('============================================================');
console.log('READINGS');
console.log('============================================================');
console.log('1. Stage A: the copied engine reproduces the embedded [0, 2e9) record');
console.log('   digit for digit (11 of 11), so the instrument is the record engine.');
console.log('2. Stage B: all 37 sealed bands re-derive exactly from the declared NB');
console.log('   formula and the pooled (Sx, Slam) — no drift between prereg and code.');
console.log('3. Stage D: inside-90% = ' + in90 + '/37 against the sealed >= 28; outside-99.73% = ' +
  (PREREG.length - in99) + '/37 against the sealed <= 1; VERDICT ' + (critA && critB ? 'HIT' : 'MISS') + '.');
console.log('   The old Poisson clause read ' + inOld + '/37 = ' + (100 * inOld / 37).toFixed(1) +
  '% at the same folds (its registered demand is 90%).');
console.log('4. Consequences are fixed in perfold-window-prereg.md sections 3 and are');
console.log('   applied there mechanically; nothing here bears on the aggregate law,');
console.log('   its WEAKENED grade, or H-doubleprime.');
console.log('[' + el() + 's] done');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-perfold-02-blindwindow.js
//   invocation:  node research/attack-perfold-02-blindwindow.js
//   code-sha256: b6fb8b34523a6911288c78b15801246e9a8b002ba6711e28cd3684410e829459
//   out-sha256:  6d08dc0d0dcb3794e21befea99273a76e55cba4e6bc662c5579f33f8a776b3d6
//   body-lines:  82
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     22.6 s
// ============================================================================
// folds: 237 primes from 5 to 1499;  chunk = 1e+8 slots
//
// ############ STAGE A — calibration, [0, 2e9), digit for digit ############
// [11.1s] calibration: A = 0.0e+0, Y = 2.0e+9, slots = 333333333, 11.1 s
//   OK    slots                    got 333333333  record 333333333
//   OK    fold 7   X               got 19047619  record 19047619
//   OK    fold 23  X               got 106418  record 106418
//   OK    fold 29  X               got 75336  record 75336
//   OK    fold 421 kills           got 105790  record 105790
//   OK    fold 421 runs            got 105789  record 105789
//   OK    fold 421 X               got 1  record 1
//   OK    N2(p >= 100)             got 37  record 37
//   OK    sum X                    got 20317943  record 20317943
//   OK    last L >= 2 fold         got 421  record 421
//   OK    last theta <= G2 fold    got 1021  record 1021
//
// ############ STAGE B — prereg bands re-derived from (Sx, Slam, lam) ############
//   37 of 37 prereg rows reproduce exactly  OK
//
// ############ STAGE C — MEASUREMENT, [6.6e10, 6.6e10 + 2e9), anchor never used ############
// [22.5s] blind window: A = 6.6e+10, Y = 2.0e+9, slots = 333333333, 11.3 s
//   for the record (NOT scored): N2(p>=100) = 41;  S1(p>=100) = 41;  sum X = 20317680;  last L >= 2 fold = 631;  max L = 3
//
// ############ STAGE D — the pre-registered score ############
//     p    pred.mean   90% band       99.73% band     X meas   in90  in99.7  (old clause)
//     101    262.73   [236, 290]     [215, 313]       274   yes   yes     yes
//     103    277.16   [250, 305]     [228, 329]       270   yes   yes     yes
//     107    129.25   [111, 148]     [96, 165]        107   NO    yes     NO
//     109    137.82   [119, 158]     [104, 175]       142   yes   yes     NO
//     113    266.85   [240, 294]     [219, 317]       233   NO    yes     yes
//     127    204.09   [181, 228]     [162, 248]       183   yes   yes     NO
//     131     72.22   [58, 87]       [48, 99]          74   yes   yes     yes
//     137     55.08   [43, 68]       [34, 79]          40   NO    yes     NO
//     139     60.62   [48, 74]       [39, 85]          48   yes   yes     NO
//     149     72.57   [59, 87]       [48, 100]         70   yes   yes     yes
//     151     77.98   [64, 93]       [53, 106]         73   yes   yes     yes
//     157     43.53   [33, 55]       [25, 65]          47   yes   yes     yes
//     163     21.47   [14, 29]       [9, 37]           20   yes   yes     yes
//     167     25.74   [18, 34]       [12, 42]          22   yes   yes     yes
//     173     43.02   [32, 54]       [25, 64]          45   yes   yes     NO
//     179     36.23   [27, 46]       [20, 56]          44   yes   yes     NO
//     181     37.94   [28, 48]       [21, 58]          37   yes   yes     yes
//     191      5.60   [2, 10]        [0, 14]            5   yes   yes     yes
//     193      6.38   [3, 11]        [0, 15]            9   yes   yes     yes
//     197      7.75   [3, 13]        [1, 17]            5   yes   yes     yes
//     199      7.83   [4, 13]        [1, 17]            6   yes   yes     yes
//     211     22.49   [15, 31]       [10, 38]          24   yes   yes     NO
//     223      3.03   [1, 6]         [0, 9]             2   yes   yes     yes
//     227      2.12   [0, 5]         [0, 8]             1   yes   yes     yes
//     229      2.23   [0, 5]         [0, 8]             5   yes   yes     yes
//     233      3.82   [1, 7]         [0, 11]            3   yes   yes     yes
//     239      3.95   [1, 7]         [0, 11]            3   yes   yes     yes
//     241      4.64   [1, 8]         [0, 12]            6   yes   yes     yes
//     251      1.86   [0, 4]         [0, 7]             0   yes   yes     yes
//     257      1.69   [0, 4]         [0, 7]             5   NO    yes     yes
//     263      2.76   [0, 6]         [0, 9]             4   yes   yes     yes
//     269      1.80   [0, 4]         [0, 7]             1   yes   yes     yes
//     271      2.12   [0, 5]         [0, 8]             2   yes   yes     yes
//     277      1.26   [0, 3]         [0, 6]             0   yes   yes     yes
//     281      0.34   [0, 1]         [0, 3]             1   yes   yes     yes
//     283      0.53   [0, 2]         [0, 4]             2   yes   yes     yes
//     293      1.41   [0, 4]         [0, 6]             1   yes   yes     yes
//
//   (a) inside 90% bands:    33 of 37   (prereg: HIT needs >= 28; model expected 34.6)  -> PASS
//   (b) outside 99.73% bands: 0 of 37   (prereg: HIT allows <= 1)                     -> PASS
//   contrast, NOT scored: old Poisson +-3sqrt(lambda_model) clause: 29 of 37 = 78.4%  (model expected 28.1; the registered clause demands 90%)
//
//   VERDICT UNDER THE PRE-REGISTERED RULE: HIT
//
// ============================================================
// READINGS
// ============================================================
// 1. Stage A: the copied engine reproduces the embedded [0, 2e9) record
//    digit for digit (11 of 11), so the instrument is the record engine.
// 2. Stage B: all 37 sealed bands re-derive exactly from the declared NB
//    formula and the pooled (Sx, Slam) — no drift between prereg and code.
// 3. Stage D: inside-90% = 33/37 against the sealed >= 28; outside-99.73% = 0/37 against the sealed <= 1; VERDICT HIT.
//    The old Poisson clause read 29/37 = 78.4% at the same folds (its registered demand is 90%).
// 4. Consequences are fixed in perfold-window-prereg.md sections 3 and are
//    applied there mechanically; nothing here bears on the aggregate law,
//    its WEAKENED grade, or H-doubleprime.
// [22.5s] done
// ============================================================
// READINGS
