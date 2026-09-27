// ============================================================================
// FOLD-L WINDOW 5 — THE EXTINCTION TEST AT W = 2e11
// ============================================================================
// PRE-REGISTERED at research/history/staging/foldL-window5-prereg.md, committed
// alone before this file was written. Every number this script predicts in
// Stage B appears in that note, and the note was on disk first.
//
// WHAT FIRES. paper/proposals/prop-thinning-null.md §5 carries "Downgrade
// toward RETIRED if the rate law misses at a fifth window". The rate law is
//
//        E[X_p] = kills(Y,p) * A * exp(-c * theta_p / mbar_before(p))
//
// measured at Y = 2e7, 2e8, 2e9, 2e10 by attack-foldL-06-scaling.md, last
// L >= 2 fold 181, 331, 421, 457, verdict CONFIRMED. This is the fifth window,
// one decade above the largest one measured.
//
// THE ENGINE IS attack-foldL-06-scaling.js's, copied verbatim except for the
// fold ceiling. The chunked streaming identity is that one: the level-p object
// is {n : key(n) = 0 or key(n) >= p}, so two slots with key = p are adjacent at
// level p iff every slot strictly between them has key < p, and one left-to-
// right pass with a stack of strictly decreasing keys computes every run at
// every fold at once. The stack carries across chunk boundaries, so chunking is
// exact and the chunk size changes memory and nothing else. Stage A asserts the
// same thirty figures against angle 4's embedded tail and aborts on any
// disagreement, which is what licenses the copy.
//
// THE FOLD CEILING IS RAISED to 2999 from the record's 1499, and prereg §4 says
// why: at W = 2e11 the last fold whose theta still fits under the window's
// record gap G2 should land near 1300, close enough to 1499 that a reader is
// entitled to ask whether the ceiling and not the arithmetic stopped the runs.
// Raising it is sound because the level-p object depends only on keys strictly
// below p, so extra folds above change no statistic below them, and Stage A
// verifies exactly that by reproducing the record at the raised ceiling.
// SCORING IS ON THE RESTRICTION TO p <= 1499, which is the record's object.
//
// THE ANCHOR IS 0, prereg §2, the anchor of all four windows in the record. The
// engine throws unless the anchor is a multiple of 6, because the first offset
// run used 1e10 = 4 (mod 6) and walked n = 3 (mod 6), multiples of 3, and every
// number it produced was about the wrong object.
// ============================================================================

'use strict';
const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1);

const QMAX = Number(process.env.QMAX || 3000);   // raised from the record's 1500; see header
const QREC = 1500;                               // the record's ceiling: scoring restriction
const CHUNK = Number(process.env.CHUNK || 1e8);
const BIGY = Number(process.env.BIGY || 2e11);   // the fifth window
const STAGE = process.env.STAGE || 'all';        // 'predict' = stages A+B only

const comp = new Uint8Array(QMAX + 1), primes = [];
for (let i = 2; i <= QMAX; i++) { if (!comp[i]) { primes.push(i); for (let j = i * i; j <= QMAX; j += i) comp[j] = 1; } }
const folds = primes.filter(q => q >= 5);
const F = folds.length;
const FREC = folds.filter(q => q < QREC).length;   // folds of the record's object
const fidx = new Int32Array(QMAX + 2).fill(-1);
folds.forEach((q, j) => { fidx[q] = j; });
const INFK = QMAX + 1;
const theta = folds.map(p => 2 * p - 2 * ((p % 6 === 1) ? 1 : -1));
function modInv(a, m) { let g = m, x = 0, x1 = 1, a1 = a; while (a1 !== 0) { const qq = (g / a1) | 0; [g, a1] = [a1, g - qq * a1]; [x, x1] = [x1, x - qq * x1]; } return ((x % m) + m) % m; }
const inv6 = new Int32Array(QMAX + 1);
for (const q of folds) inv6[q] = modInv(6 % q, q);

console.log('folds: ' + F + ' primes from ' + folds[0] + ' to ' + folds[F - 1] +
  ' (the record s object is the first ' + FREC + ', to ' + folds[FREC - 1] + ');  chunk = ' + CHUNK.toExponential(0) + ' slots');

// ---- the streaming engine, copied from attack-foldL-06-scaling.js -----------
function runWindow(A, Y, label) {
  if (A % 6 !== 0) throw new Error('anchor A must be a multiple of 6, got ' + A);
  const t0 = Date.now();
  const M = Math.floor((Y - 5) / 6) + 1;
  const kills = new Float64Array(F), runsC = new Float64Array(F);
  const maxL = new Int32Array(F);
  const candG = new Float64Array(F);
  const stK = new Int32Array(F + 4), stPos = new Float64Array(F + 4), stRun = new Float64Array(F + 4);
  let sp = 0;
  const csize = Math.min(M, CHUNK);
  const key = new Uint16Array(csize);
  const nch = Math.ceil(M / csize);
  let ch = 0;
  for (let i0 = 0; i0 < M; i0 += csize) {
    const i1 = Math.min(M, i0 + csize), len = i1 - i0;
    key.fill(0, 0, len);
    for (let fi = F - 1; fi >= 0; fi--) {
      const q = folds[fi], iv = inv6[q], Aq = A % q, off = i0 % q;
      for (let tt = 0; tt < 2; tt++) {
        const t = tt === 0 ? 0 : q - 2;
        let s = (((t - 5 - Aq) % q) + q) % q;
        s = (s * iv) % q;
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
        const g = n - stPos[sp];
        if (bidx < F && g > candG[bidx]) candG[bidx] = g;
        bidx = j + 1;
      }
      if (sp > 0) { const g = n - stPos[sp - 1]; if (bidx < F && g > candG[bidx]) candG[bidx] = g; }
      if (sp > 0 && stK[sp - 1] === k) { stRun[sp - 1]++; stPos[sp - 1] = n; }
      else { stK[sp] = k; stPos[sp] = n; stRun[sp] = 1; sp++; }
      if (kk !== 0) kills[fidx[kk]]++;
    }
    ch++;
    if (nch > 1) process.stderr.write('[' + el() + 's] ' + label + ': chunk ' + ch + ' of ' + nch + '\n');
  }
  while (sp > 0) {
    sp--;
    if (stK[sp] === INFK) continue;
    const j = fidx[stK[sp]], rl = stRun[sp];
    runsC[j]++; if (rl > maxL[j]) maxL[j] = rl;
  }
  const G2b = new Float64Array(F);
  { let m = 0; for (let j = 0; j < F; j++) { if (candG[j] > m) m = candG[j]; G2b[j] = m; } }
  const rows = [];
  let surv = M;
  for (let j = 0; j < F; j++) {
    const Nb = surv; surv -= kills[j];
    rows.push({
      p: folds[j], j, theta: theta[j], kills: kills[j], runs: runsC[j],
      X: kills[j] - runsC[j], L: Math.max(1, maxL[j]),
      Nbefore: Nb, Nafter: surv, mbarB: Y / Nb, mbarA: Y / surv,
      thr: theta[j] / (Y / Nb), G2: G2b[j],
    });
  }
  const secs = (Date.now() - t0) / 1000;
  console.log('[' + el() + 's] ' + label + ': A = ' + A.toExponential(1) + ', Y = ' + Y.toExponential(1) +
    ', slots = ' + M + ', ' + secs.toFixed(1) + ' s, ' + (M / secs).toExponential(3) + ' slots/s');
  return { A, Y, M, rows, secs, label };
}

// summaries. `cap` restricts to the record's fold set, which is what is scored.
function summarise(w, cap) {
  const r = cap ? w.rows.filter(x => x.p < QREC) : w.rows;
  let lastLive = null, lastQual = null, n2 = 0, s1 = 0, n2d = 0, s1d = 0, sx = 0;
  for (const x of r) {
    if (x.L >= 2) { lastLive = x.p; n2++; s1 += x.L - 1; if (x.p >= 100) { n2d++; s1d += x.L - 1; } }
    if (x.theta <= x.G2) lastQual = x.p;
    sx += x.X;
  }
  return { lastLive, lastQual, n2, s1, n2d, s1d, sx, maxL: Math.max(...r.map(x => x.L)) };
}
const DEC = [[5, 10], [10, 30], [30, 100], [100, 300], [300, 1000], [1000, 1500]];
function byDecade(w) {
  return DEC.map(([lo, hi]) => {
    const sel = w.rows.filter(x => x.p >= lo && x.p < hi);
    return { lo, hi, folds: sel.length, n2: sel.filter(x => x.L >= 2).length, s1: sel.reduce((a, x) => a + x.L - 1, 0) };
  });
}

// ==========================================================================
// STAGE A — CALIBRATION ON Y = 2e9, AND THE CEILING-INVARIANCE CHECK
// ==========================================================================
console.log('');
console.log('############ STAGE A — calibration, Y = 2e9, anchor 0, ceiling ' + QMAX + ' ############');
const CAL = runWindow(0, 2e9, 'calibration');
const calRow = p => CAL.rows[fidx[p]];
const SC = summarise(CAL, true), SCfull = summarise(CAL, false);

console.log('');
console.log('--- A1. digit for digit against angle 4 s embedded tail, restricted to the record s folds p < ' + QREC + ' ---');
const EXPECT = [
  ['slots (n = 5 mod 6)', CAL.M, 333333333],
  ['fold 5   N after', calRow(5).Nafter, 200000000],
  ['fold 5   kills', calRow(5).kills, 133333333],
  ['fold 5   X', calRow(5).X, 0],
  ['fold 5   L', calRow(5).L, 1],
  ['fold 7   N after', calRow(7).Nafter, 142857143],
  ['fold 7   kills', calRow(7).kills, 57142857],
  ['fold 7   runs', calRow(7).runs, 38095238],
  ['fold 7   X', calRow(7).X, 19047619],
  ['fold 7   L', calRow(7).L, 2],
  ['fold 23  kills', calRow(23).kills, 6789558],
  ['fold 23  X', calRow(23).X, 106418],
  ['fold 23  L', calRow(23).L, 3],
  ['fold 29  N after', calRow(29).Nafter, 66373676],
  ['fold 29  X', calRow(29).X, 75336],
  ['fold 31  G2 before fold (= G2 after fold 29)', calRow(31).G2, 258],
  ['fold 421 N after', calRow(421).Nafter, 22433554],
  ['fold 421 kills', calRow(421).kills, 105790],
  ['fold 421 runs', calRow(421).runs, 105789],
  ['fold 421 X', calRow(421).X, 1],
  ['fold 421 L', calRow(421).L, 2],
  ['fold 421 theta', calRow(421).theta, 840],
  ['fold 1451 N after', calRow(1451).Nafter, 15852743],
  ['fold 1451 kills', calRow(1451).kills, 21565],
  ['last fold with L >= 2', SC.lastLive, 421],
  ['last fold with theta <= G2', SC.lastQual, 1021],
  ['folds with L >= 2', SC.n2, 58],
  ['max L over all folds', SC.maxL, 3],
  ['sum over folds of (L-1)', SC.s1, 64],
  ['sum over folds of X', SC.sx, 20317943],
];
let bad = 0;
for (const [name, got, want] of EXPECT) {
  const ok = got === want;
  if (!ok) bad++;
  console.log('  ' + (ok ? 'OK  ' : 'FAIL') + '  ' + name.padEnd(44) + ' got ' + String(got).padStart(11) + '   record ' + String(want).padStart(11));
}
console.log('  ' + (bad === 0 ? 'CALIBRATION CLEAN: 30 of 30 figures reproduced at the raised ceiling.'
  : 'CALIBRATION BROKEN: ' + bad + ' figure(s) disagree with the record. STOP.'));
if (bad !== 0) { console.log('  aborting: the copied engine does not reproduce the record.'); process.exit(1); }

console.log('');
console.log('--- A2. ceiling invariance: the raised ceiling adds folds and moves nothing below it ---');
console.log('  restricted to p < ' + QREC + ':  N2 = ' + SC.n2 + ', sum(L-1) = ' + SC.s1 + ', sum X = ' + SC.sx +
  ', max L = ' + SC.maxL + ', last L >= 2 = ' + SC.lastLive + ', last theta <= G2 = ' + SC.lastQual);
console.log('  all ' + F + ' folds to ' + folds[F - 1] + ':   N2 = ' + SCfull.n2 + ', sum(L-1) = ' + SCfull.s1 + ', sum X = ' + SCfull.sx +
  ', max L = ' + SCfull.maxL + ', last L >= 2 = ' + SCfull.lastLive + ', last theta <= G2 = ' + SCfull.lastQual);
console.log('  G2 at the record s last fold ' + folds[FREC - 1] + ' = ' + CAL.rows[FREC - 1].G2 + ';  G2 at fold ' + folds[F - 1] + ' = ' + CAL.rows[F - 1].G2 +
  ';  theta at that fold = ' + theta[F - 1] + '. The extra folds carry no run and none of them qualifies.');

// ==========================================================================
// STAGE B — THE PRE-REGISTERED PREDICTIONS
// ==========================================================================
// Computed on the record s fold set only, p < 1500, which is how the record
// extrapolated to windows 2 through 4. Recomputing on the full sweep moves no
// headline figure, and prereg §3.1 says so.
const C_CROSS = 1.22;
const mbB = CAL.rows.map(r => r.mbarB), mbA = CAL.rows.map(r => r.mbarA);
const killsPred = (Y, j) => (Y / mbB[j]) * (2 / folds[j]);
const uOf = j => theta[j] / mbB[j];
function tailSum(Y, m, fromJ) { let s = 0; for (let j = fromJ; j < FREC; j++) s += killsPred(Y, j) * m.A * Math.exp(-m.c * uOf(j)); return s; }
function lastFoldAt(Y, m, level) { let ans = folds[0]; for (let j = 0; j < FREC; j++) if (tailSum(Y, m, j) >= level) ans = folds[j]; return ans; }
function crossFold(Y, c) { let ans = null; for (let j = 0; j < FREC; j++) if (2 * c * folds[j] / mbA[j] <= Math.log(killsPred(Y, j))) ans = folds[j]; return ans; }
function counts(Y, m, pmin) {
  let n2 = 0, v = 0, s1 = 0;
  for (let j = 0; j < FREC; j++) {
    if (folds[j] < pmin) continue;
    const K = killsPred(Y, j), r = Math.exp(-m.c * uOf(j)), mu = K * m.A * r;
    const P = 1 - Math.exp(-mu); n2 += P; v += P * (1 - P);
    for (let l = 2; l <= 60; l++) { const mm = K * m.A * Math.pow(r, l - 1); if (mm < 1e-10) break; s1 += 1 - Math.exp(-mm); }
  }
  return { n2, sd: Math.sqrt(v), s1geo: s1, s1: n2 };
}
function decadePred(Y, m) {
  return DEC.map(([lo, hi]) => {
    let n2 = 0, x = 0;
    for (let j = 0; j < FREC; j++) { if (folds[j] < lo || folds[j] >= hi) continue; const mu = killsPred(Y, j) * m.A * Math.exp(-m.c * uOf(j)); n2 += 1 - Math.exp(-mu); x += mu; }
    return { lo, hi, n2, x };
  });
}
function fit2(sel) {
  let a = 0, c = 1.5;
  for (let it = 0; it < 300; it++) {
    let g1 = 0, g2 = 0, h11 = 0, h12 = 0, h22 = 0;
    for (const r of sel) {
      const e = r.kills * Math.exp(a - c * r.thr);
      g1 += r.X - e; g2 += -r.X * r.thr + e * r.thr; h11 += -e; h12 += e * r.thr; h22 += -e * r.thr * r.thr;
    }
    const det = h11 * h22 - h12 * h12;
    const da = (h22 * g1 - h12 * g2) / det, dc = (-h12 * g1 + h11 * g2) / det;
    a -= da; c -= dc; if (Math.abs(da) + Math.abs(dc) < 1e-14) break;
  }
  let h11 = 0, h12 = 0, h22 = 0;
  for (const r of sel) { const e = r.kills * Math.exp(a - c * r.thr); h11 += e; h12 += -e * r.thr; h22 += e * r.thr * r.thr; }
  const det = h11 * h22 - h12 * h12;
  return { A: Math.exp(a), c, seC: Math.sqrt(h11 / det) };
}
function fitA(sel, c) {
  let a = 0;
  for (let it = 0; it < 300; it++) { let g = 0, h = 0; for (const r of sel) { const e = r.kills * Math.exp(a - c * r.thr); g += r.X - e; h += -e; } const st = g / h; a -= st; if (Math.abs(st) < 1e-14) break; }
  return { A: Math.exp(a), c };
}
const DEEP = CAL.rows.filter(r => r.p >= 100 && r.p < QREC);
const M2 = fit2(DEEP);
const CSET = [-3, -2, 0, 2, 3].map(k => M2.c + k * M2.seC);
function bandUnion(Y) {
  let lo = 1e9, hi = 0;
  for (const c of CSET) { const m = fitA(DEEP, c); lo = Math.min(lo, lastFoldAt(Y, m, 2.302585)); hi = Math.max(hi, lastFoldAt(Y, m, 0.105361)); }
  return [lo, hi];
}
const FIT = { A: M2.A, c: M2.c, name: 'PREDICTION 1, the record s fitted pair' };
const STEIN = { A: 2.2091e-2, c: 1.0701, name: 'PREDICTION 2, the import-stein first-moment pair' };

console.log('');
console.log('############ STAGE B — the pre-registered predictions, from Y = 2e9 alone ############');
console.log('Every figure below is in research/history/staging/foldL-window5-prereg.md, committed alone before');
console.log('this file was written. Read the two line by line.');
console.log('');
console.log('B0. the fit is the record s, reproduced: A = ' + M2.A.toExponential(4) + ', c = ' + M2.c.toFixed(4) + ' +- ' + M2.seC.toFixed(4) +
  '   (record: 2.4312e-2, 1.0818 +- 0.0317)');
console.log('    band c set: ' + CSET.map(c => c.toFixed(3)).join(', '));
console.log('');
const PRED = {};
for (const m of [FIT, STEIN]) {
  const cc = counts(BIGY, m, 100);
  const band = m === FIT ? bandUnion(BIGY) : [lastFoldAt(BIGY, m, 2.302585), lastFoldAt(BIGY, m, 0.105361)];
  PRED[m.name] = { m, cc, band, med: lastFoldAt(BIGY, m, Math.LN2), cross: crossFold(BIGY, m === FIT ? C_CROSS : m.c),
    n2lo: 0.7 * cc.n2 - 2 * cc.sd, n2hi: 1.3 * cc.n2 + 2 * cc.sd };
  const P = PRED[m.name];
  console.log(m.name + ':  A = ' + m.A.toExponential(4) + ', c = ' + m.c.toFixed(4));
  console.log('  survival median last-pair fold                   ' + P.med);
  console.log('  10-90% band                                      [' + P.band[0] + ', ' + P.band[1] + ']' +
    (m === FIT ? '   (unioned over c +- 3se, A profiled)' : '   (this pair alone; it carries no standard error)'));
  if (m === FIT) console.log('  10-90% band, this pair alone, no c union         [' + lastFoldAt(BIGY, m, 2.302585) + ', ' + lastFoldAt(BIGY, m, 0.105361) + ']');
  console.log('  crossing fold 2c*p/mbar <= ln kills, at c = ' + (m === FIT ? C_CROSS : m.c) + (m === FIT ? '      ' : '   ') + P.cross +
    (m === FIT ? '   (the record s literal §8 arithmetic)' : '   (labelled, NOT scored: mixes two calibrations)'));
  console.log('  N2(p >= 100) predicted                           ' + P.cc.n2.toFixed(1) + '   accept [' + P.n2lo.toFixed(1) + ', ' + P.n2hi.toFixed(1) + ']');
  console.log('  S1(p >= 100) predicted, = N2 by the alternation cap  ' + P.cc.s1.toFixed(1) + '   accept [' + P.n2lo.toFixed(1) + ', ' + P.n2hi.toFixed(1) + ']');
  console.log('  S1 under the geometric chain (REFUTED contrast)   ' + P.cc.s1geo.toFixed(1));
  const d = decadePred(BIGY, m);
  console.log('  N2 by decade:      ' + d.map(x => '[' + x.lo + ',' + x.hi + ') ' + x.n2.toFixed(1)).join('  '));
  console.log('  sum E[X] by decade:' + d.map(x => ' [' + x.lo + ',' + x.hi + ') ' + x.x.toExponential(3)).join(''));
  console.log('');
}
console.log('B0a. ONE FOURTH-DIGIT DIFFERENCE FROM THE PREREG, disclosed rather than hidden. The prereg s §3.2 row');
console.log('  "sum E[X] by decade" reads 7.518e7, 3.103e7, 4.374e6, 1.996e5, 8.534e2, 5.223e-3, computed from the');
console.log('  PUBLISHED ROUNDED constants 2.4312e-2 and 1.0818. This script refits and carries the full precision, as');
console.log('  the record s own machinery does, so three of those six move in the fourth significant digit. Every');
console.log('  scored figure, the crossing 653, the median 683, the band [571, 877], the counts 80.1 and the acceptance');
console.log('  band 51.2 to 108.9, and every decade N2, is identical to the prereg.');
console.log('');
console.log('B1. WHAT THIS WINDOW CANNOT DECIDE, registered before it runs (prereg §3.5). The two pairs put the');
console.log('  survival median at the SAME fold and their bands differ by one fold at each end, against a fold spacing');
console.log('  near 683 of 6 to 12, and their count predictions differ by 0.3 against an acceptance band 58 wide. The');
console.log('  fifth window CANNOT separate the derived amplitude from the fitted one. A later claim that it did is an');
console.log('  artifact. What it decides is whether either pair works one decade above where either was calibrated.');
console.log('');
console.log('B2. per-fold bands, prereg §3.4. The clause is import-stein.md §2.4 P1 s form |X_p - lam| <= 3 sqrt(lam),');
console.log('  applied to the MODEL mean, because the derived lambda_p is computed from the window s own qualifying');
console.log('  gaps and does not exist until the window is measured.');
console.log('   PRE-REGISTERED CLAUSE: at folds p >= 100 with E[X_p] >= 1, at least 90% of measured X_p lie inside');
console.log('   E[X_p] +- 3 sqrt(E[X_p]). This is a clause on the body of the distribution, deliberately separate from');
console.log('   the extinction clause, which is an extreme.');
console.log('     p | theta |  theta/mbar | kills(W)     |  E[X] fitted   band              |  E[X] stein    band');
for (let j = 0; j < FREC; j++) {
  const p = folds[j]; if (p < 300) continue;
  const K = killsPred(BIGY, j), u = uOf(j);
  const mf = K * FIT.A * Math.exp(-FIT.c * u), ms = K * STEIN.A * Math.exp(-STEIN.c * u);
  if (mf < 0.05 && ms < 0.05) continue;
  const bd = v => '[' + Math.max(0, v - 3 * Math.sqrt(v)).toFixed(2) + ', ' + (v + 3 * Math.sqrt(v)).toFixed(2) + ']';
  console.log('  ' + String(p).padStart(4) + ' | ' + String(theta[j]).padStart(5) + ' | ' + u.toFixed(3).padStart(11) + ' | ' + K.toExponential(4).padStart(12) +
    ' | ' + mf.toFixed(3).padStart(10) + ' ' + bd(mf).padStart(18) + ' | ' + ms.toFixed(3).padStart(10) + ' ' + bd(ms).padStart(18));
}
console.log('');
console.log('B3. cumulative tail sum_{q>=p} E[X_q], which is what the band arithmetic is made of (fitted / stein):');
for (const p of [457, 571, 601, 653, 683, 701, 877, 1009, 1201, 1499]) {
  const j = fidx[p]; if (j < 0) continue;
  console.log('   p = ' + String(p).padStart(4) + ':  ' + tailSum(BIGY, FIT, j).toExponential(3) + '   ' + tailSum(BIGY, STEIN, j).toExponential(3));
}
console.log('');
console.log('B4. THE SCORING RULE, prereg §5. Read off the restriction to p < ' + QREC + ' at anchor 0, against PREDICTION 1.');
{
  const P = PRED[FIT.name];
  console.log('  (a) measured last fold with L >= 2 lies inside [' + P.band[0] + ', ' + P.band[1] + ']');
  console.log('  (b) measured N2(p >= 100) lies inside [' + P.n2lo.toFixed(1) + ', ' + P.n2hi.toFixed(1) + ']');
  console.log('  (c) measured S1(p >= 100) lies inside [' + P.n2lo.toFixed(1) + ', ' + P.n2hi.toFixed(1) + ']');
  console.log('  (d) 181, 331, 421, 457, p*5 is strictly increasing, that is p*5 > 457');
  console.log('  HIT needs all four. MISS is any one failing, EXCEPT that (a) failing alone in the direction the model s');
  console.log('  known hot bias predicts, with (b), (c), (d) holding and p*5 within a factor 1.5 of the median ' + P.med + ',');
  console.log('  that is p*5 >= ' + Math.ceil(P.med / 1.5) + ', is PARTIAL in the record s own §3.4 language and is not a MISS.');
  console.log('  HIT: prop-thinning-null.md §5 s downgrade clause does NOT fire. The grade does not improve: WEAKENED was');
  console.log('       set by found prior art and a fifth window says nothing about prior art.');
  console.log('  MISS: the clause fires and the extinction half moves toward RETIRED. The PROVEN identity half, the group');
  console.log('       law and the Y-independence of mbar are untouched by any outcome here.');
}

if (STAGE === 'predict') { console.log(''); console.log('[' + el() + 's] STAGE=predict: stopping before the fifth window is touched.'); } else {

// ==========================================================================
// STAGE C — THE FIFTH WINDOW
// ==========================================================================
console.log('');
console.log('############ STAGE C — MEASUREMENT, W = ' + BIGY.toExponential(0) + ', anchor 0 ############');
const W5 = runWindow(0, BIGY, 'W = ' + BIGY.toExponential(0));
const S5 = summarise(W5, true), S5full = summarise(W5, false);

console.log('');
console.log('--- C1. every fold with L >= 2 at W = ' + BIGY.toExponential(0) + ' ---');
console.log('   fold |     kills |      runs |      X | L |  theta | mbar   | G2 before');
for (const r of W5.rows) {
  if (r.L < 2) continue;
  console.log('  ' + String(r.p).padStart(5) + ' | ' + String(r.kills).padStart(9) + ' | ' + String(r.runs).padStart(9) +
    ' | ' + String(r.X).padStart(6) + ' | ' + r.L + ' | ' + String(r.theta).padStart(6) + ' | ' + r.mbarA.toFixed(2).padStart(6) +
    ' | ' + String(r.G2).padStart(9));
}
console.log('');
console.log('--- C2. the scored statistics, restricted to the record s folds p < ' + QREC + ' ---');
console.log('  last fold with L >= 2      = ' + S5.lastLive);
console.log('  last fold with theta <= G2 = ' + S5.lastQual);
console.log('  folds with L >= 2          = ' + S5.n2 + ' of ' + FREC + ';   sum (L-1) = ' + S5.s1 + ';   max L = ' + S5.maxL + ';   sum X = ' + S5.sx);
console.log('  N2(p >= 100) = ' + S5.n2d + ';   S1(p >= 100) = ' + S5.s1d);
console.log('');
console.log('--- C3. the range check, the full sweep to ' + folds[F - 1] + ' (prereg §4, not a test) ---');
console.log('  last fold with L >= 2      = ' + S5full.lastLive);
console.log('  last fold with theta <= G2 = ' + S5full.lastQual + '   (at Y = 2e10 the record measured 1021 under a ceiling of 1499)');
console.log('  folds with L >= 2 = ' + S5full.n2 + ';   sum (L-1) = ' + S5full.s1 + ';   max L = ' + S5full.maxL);
console.log('  G2 at fold ' + folds[FREC - 1] + ' = ' + W5.rows[FREC - 1].G2 + ';   G2 at fold ' + folds[F - 1] + ' = ' + W5.rows[F - 1].G2 +
  ';   theta at that fold = ' + theta[F - 1]);
console.log('  If the last qualifying fold is below ' + folds[FREC - 1] + ' then the record s ceiling was never binding and the');
console.log('  extinction is arithmetic, not a range artifact.');

// ==========================================================================
// STAGE D — SCORING AGAINST STAGE B
// ==========================================================================
console.log('');
console.log('############ STAGE D — scored against Stage B and prereg §5 ############');
const P1 = PRED[FIT.name], P2 = PRED[STEIN.name];
const aOK = S5.lastLive >= P1.band[0] && S5.lastLive <= P1.band[1];
const bOK = S5.n2d >= P1.n2lo && S5.n2d <= P1.n2hi;
const cOK = S5.s1d >= P1.n2lo && S5.s1d <= P1.n2hi;
const SEQ = [181, 331, 421, 457, S5.lastLive];
let dOK = true; for (let i = 1; i < SEQ.length; i++) if (!(SEQ[i] > SEQ[i - 1])) dOK = false;
console.log('  criterion | prediction              | measured | verdict');
console.log('  (a) last L >= 2 fold | [' + P1.band[0] + ', ' + P1.band[1] + '] median ' + P1.med + '  | ' + S5.lastLive + ' | ' + (aOK ? 'in band' : 'OUT OF BAND'));
console.log('  (b) N2(p >= 100)     | ' + P1.cc.n2.toFixed(1) + ' accept [' + P1.n2lo.toFixed(1) + ', ' + P1.n2hi.toFixed(1) + '] | ' + S5.n2d + ' | ' + (bOK ? 'in band' : 'OUT OF BAND'));
console.log('  (c) S1(p >= 100)     | ' + P1.cc.s1.toFixed(1) + ' accept [' + P1.n2lo.toFixed(1) + ', ' + P1.n2hi.toFixed(1) + '] | ' + S5.s1d + ' | ' + (cOK ? 'in band' : 'OUT OF BAND'));
console.log('  (d) sequence         | strictly increasing     | ' + SEQ.join(' -> ') + ' | ' + (dOK ? 'holds' : 'FAILS'));
console.log('  crossing fold at c = 1.22 predicted ' + P1.cross + ', measured ' + S5.lastLive +
  ', ratio ' + (S5.lastLive / P1.cross).toFixed(3));
console.log('  survival median ' + P1.med + ', measured ' + S5.lastLive + ', ratio ' + (S5.lastLive / P1.med).toFixed(3) +
  ' (the PARTIAL clause allows down to ' + Math.ceil(P1.med / 1.5) + ')');
console.log('  PREDICTION 2 for the record only: band [' + P2.band[0] + ', ' + P2.band[1] + '], median ' + P2.med +
  ', N2 accept [' + P2.n2lo.toFixed(1) + ', ' + P2.n2hi.toFixed(1) + ']: ' +
  ((S5.lastLive >= P2.band[0] && S5.lastLive <= P2.band[1]) ? 'last fold in band' : 'last fold out of band') +
  '. B1 says this cannot be read as evidence between the pairs.');
let V;
if (aOK && bOK && cOK && dOK) V = 'HIT';
else if (bOK && cOK && dOK && S5.lastLive >= P1.med / 1.5) V = 'PARTIAL';
else V = 'MISS';
console.log('');
console.log('  VERDICT UNDER THE PRE-REGISTERED RULE: ' + V);
console.log('  ' + (V === 'HIT' ? 'prop-thinning-null.md §5 s downgrade clause does not fire. The grade stays WEAKENED for prior-art reasons.'
  : V === 'PARTIAL' ? 'the hot bias showing as an extreme. Not a MISS under prereg §5, and the repair is to fix the bias, not the band.'
  : 'prop-thinning-null.md §5 s downgrade clause FIRES. The extinction half moves toward RETIRED.'));

console.log('');
console.log('--- D1. the hot systematic, now at five windows: measured / predicted N2(p >= 100) ---');
console.log('  2e7: 8/10.6 = 0.75   2e8: 21/25.7 = 0.82   2e9: 37/42.6 = 0.87   2e10: 50/60.8 = 0.82   ' +
  BIGY.toExponential(0) + ': ' + S5.n2d + '/' + P1.cc.n2.toFixed(1) + ' = ' + (S5.n2d / P1.cc.n2).toFixed(2));
console.log('  prereg §5: if the fifth reading is again inside [0.70, 0.90] the systematic is confirmed at five windows');
console.log('  and belongs in the law as a known 20% overprediction on counts, not absorbed by the band a fifth time.');

console.log('');
console.log('--- D2. counts of folds with L >= 2 by decade of p, measured against predicted ---');
{
  const dm = byDecade(W5), dp = decadePred(BIGY, FIT), ds = decadePred(BIGY, STEIN);
  console.log('   decade        | measured | pred fitted | pred stein');
  for (let i = 0; i < DEC.length; i++)
    console.log('   [' + String(DEC[i][0]).padStart(4) + ',' + String(DEC[i][1]).padStart(4) + ')    | ' +
      String(dm[i].n2).padStart(8) + ' | ' + dp[i].n2.toFixed(1).padStart(11) + ' | ' + ds[i].n2.toFixed(1).padStart(10));
  console.log('   the [5,100) rows carry NO prediction: alternation caps run lengths there and the record refuses to');
  console.log('   predict them. They are printed for completeness.');
}

console.log('');
console.log('--- D3. the per-fold clause of B2, scored ---');
{
  let tot = 0, ok = 0;
  console.log('     p |  E[X] fitted |  band              | X measured | inside');
  for (let j = 0; j < FREC; j++) {
    const p = folds[j]; if (p < 100) continue;
    const mu = killsPred(BIGY, j) * FIT.A * Math.exp(-FIT.c * uOf(j));
    if (mu < 1) continue;
    tot++;
    const lo = mu - 3 * Math.sqrt(mu), hi = mu + 3 * Math.sqrt(mu);
    const x = W5.rows[j].X, inside = x >= lo && x <= hi;
    if (inside) ok++;
    if (p >= 300) console.log('  ' + String(p).padStart(4) + ' | ' + mu.toFixed(3).padStart(12) + ' | [' + Math.max(0, lo).toFixed(2).padStart(8) + ', ' + hi.toFixed(2).padStart(8) + '] | ' +
      String(x).padStart(10) + ' | ' + (inside ? 'yes' : 'NO'));
  }
  console.log('  folds p >= 100 with E[X] >= 1: ' + ok + ' of ' + tot + ' inside the 3 sqrt band = ' + (100 * ok / tot).toFixed(1) +
    '%, against the pre-registered 90%: ' + (ok / tot >= 0.9 ? 'CLAUSE HOLDS' : 'CLAUSE FAILS'));
  console.log('  (only the folds p >= 300 are printed; the shallower ones are counted and not listed.)');
}

console.log('');
console.log('--- D4. the sum, and the ratio the first moment is scored on ---');
{
  let sx = 0, sl = 0, sls = 0;
  for (let j = 0; j < FREC; j++) { if (folds[j] < 100) continue; sx += W5.rows[j].X; sl += killsPred(BIGY, j) * FIT.A * Math.exp(-FIT.c * uOf(j)); sls += killsPred(BIGY, j) * STEIN.A * Math.exp(-STEIN.c * uOf(j)); }
  console.log('  sum X over p >= 100 measured = ' + sx + ';  model fitted = ' + sl.toExponential(6) + ', ratio ' + (sx / sl).toFixed(4) +
    ';  model stein = ' + sls.toExponential(6) + ', ratio ' + (sx / sls).toFixed(4));
  console.log('  import-stein.md §2.4 P1 read 0.914, 1.009, 1.046, 1.009 at the four windows against its DERIVED lambda,');
  console.log('  which is a different object from the model mean here and is not comparable digit for digit.');
}

console.log('');
console.log('[' + el() + 's] done');

}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/foldL-window5-01-extinction.js
//   invocation:  node research/foldL-window5-01-extinction.js
//   code-sha256: 88614c6ac9bc612729e9bc0cad3f66b9728281bd87dc3b85a07fa958e6c807d4
//   out-sha256:  6046e82ffcbd915a409bd577389779fa88b7809621ac13a96f495171b137b2f7
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     782.2 s
// ============================================================================
// folds: 428 primes from 5 to 2999 (the record s object is the first 237, to 1499);  chunk = 1e+8 slots
//
// ############ STAGE A — calibration, Y = 2e9, anchor 0, ceiling 3000 ############
// [8.9s] calibration: A = 0.0e+0, Y = 2.0e+9, slots = 333333333, 8.9 s, 3.734e+7 slots/s
//
// --- A1. digit for digit against angle 4 s embedded tail, restricted to the record s folds p < 1500 ---
//   OK    slots (n = 5 mod 6)                          got   333333333   record   333333333
//   OK    fold 5   N after                             got   200000000   record   200000000
//   OK    fold 5   kills                               got   133333333   record   133333333
//   OK    fold 5   X                                   got           0   record           0
//   OK    fold 5   L                                   got           1   record           1
//   OK    fold 7   N after                             got   142857143   record   142857143
//   OK    fold 7   kills                               got    57142857   record    57142857
//   OK    fold 7   runs                                got    38095238   record    38095238
//   OK    fold 7   X                                   got    19047619   record    19047619
//   OK    fold 7   L                                   got           2   record           2
//   OK    fold 23  kills                               got     6789558   record     6789558
//   OK    fold 23  X                                   got      106418   record      106418
//   OK    fold 23  L                                   got           3   record           3
//   OK    fold 29  N after                             got    66373676   record    66373676
//   OK    fold 29  X                                   got       75336   record       75336
//   OK    fold 31  G2 before fold (= G2 after fold 29) got         258   record         258
//   OK    fold 421 N after                             got    22433554   record    22433554
//   OK    fold 421 kills                               got      105790   record      105790
//   OK    fold 421 runs                                got      105789   record      105789
//   OK    fold 421 X                                   got           1   record           1
//   OK    fold 421 L                                   got           2   record           2
//   OK    fold 421 theta                               got         840   record         840
//   OK    fold 1451 N after                            got    15852743   record    15852743
//   OK    fold 1451 kills                              got       21565   record       21565
//   OK    last fold with L >= 2                        got         421   record         421
//   OK    last fold with theta <= G2                   got        1021   record        1021
//   OK    folds with L >= 2                            got          58   record          58
//   OK    max L over all folds                         got           3   record           3
//   OK    sum over folds of (L-1)                      got          64   record          64
//   OK    sum over folds of X                          got    20317943   record    20317943
//   CALIBRATION CLEAN: 30 of 30 figures reproduced at the raised ceiling.
//
// --- A2. ceiling invariance: the raised ceiling adds folds and moves nothing below it ---
//   restricted to p < 1500:  N2 = 58, sum(L-1) = 64, sum X = 20317943, max L = 3, last L >= 2 = 421, last theta <= G2 = 1021
//   all 428 folds to 2999:   N2 = 58, sum(L-1) = 64, sum X = 20317943, max L = 3, last L >= 2 = 421, last theta <= G2 = 1021
//   G2 at the record s last fold 1499 = 2220;  G2 at fold 2999 = 2256;  theta at that fold = 6000. The extra folds carry no run and none of them qualifies.
//
// ############ STAGE B — the pre-registered predictions, from Y = 2e9 alone ############
// Every figure below is in research/history/staging/foldL-window5-prereg.md, committed alone before
// this file was written. Read the two line by line.
//
// B0. the fit is the record s, reproduced: A = 2.4312e-2, c = 1.0818 +- 0.0317   (record: 2.4312e-2, 1.0818 +- 0.0317)
//     band c set: 0.987, 1.018, 1.082, 1.145, 1.177
//
// PREDICTION 1, the record s fitted pair:  A = 2.4312e-2, c = 1.0818
//   survival median last-pair fold                   683
//   10-90% band                                      [571, 877]   (unioned over c +- 3se, A profiled)
//   10-90% band, this pair alone, no c union         [617, 809]
//   crossing fold 2c*p/mbar <= ln kills, at c = 1.22      653   (the record s literal §8 arithmetic)
//   N2(p >= 100) predicted                           80.1   accept [51.2, 108.9]
//   S1(p >= 100) predicted, = N2 by the alternation cap  80.1   accept [51.2, 108.9]
//   S1 under the geometric chain (REFUTED contrast)   112.8
//   N2 by decade:      [5,10) 2.0  [10,30) 6.0  [30,100) 15.0  [100,300) 37.0  [300,1000) 43.0  [1000,1500) 0.0
//   sum E[X] by decade: [5,10) 7.518e+7 [10,30) 3.103e+7 [30,100) 4.373e+6 [100,300) 1.996e+5 [300,1000) 8.533e+2 [1000,1500) 5.221e-3
//
// PREDICTION 2, the import-stein first-moment pair:  A = 2.2091e-2, c = 1.0701
//   survival median last-pair fold                   683
//   10-90% band                                      [619, 811]   (this pair alone; it carries no standard error)
//   crossing fold 2c*p/mbar <= ln kills, at c = 1.0701   761   (labelled, NOT scored: mixes two calibrations)
//   N2(p >= 100) predicted                           80.4   accept [51.4, 109.4]
//   S1(p >= 100) predicted, = N2 by the alternation cap  80.4   accept [51.4, 109.4]
//   S1 under the geometric chain (REFUTED contrast)   113.5
//   N2 by decade:      [5,10) 2.0  [10,30) 6.0  [30,100) 15.0  [100,300) 37.0  [300,1000) 43.4  [1000,1500) 0.0
//   sum E[X] by decade: [5,10) 6.960e+7 [10,30) 2.874e+7 [30,100) 4.089e+6 [100,300) 1.908e+5 [300,1000) 8.553e+2 [1000,1500) 5.881e-3
//
// B0a. ONE FOURTH-DIGIT DIFFERENCE FROM THE PREREG, disclosed rather than hidden. The prereg s §3.2 row
//   "sum E[X] by decade" reads 7.518e7, 3.103e7, 4.374e6, 1.996e5, 8.534e2, 5.223e-3, computed from the
//   PUBLISHED ROUNDED constants 2.4312e-2 and 1.0818. This script refits and carries the full precision, as
//   the record s own machinery does, so three of those six move in the fourth significant digit. Every
//   scored figure, the crossing 653, the median 683, the band [571, 877], the counts 80.1 and the acceptance
//   band 51.2 to 108.9, and every decade N2, is identical to the prereg.
//
// B1. WHAT THIS WINDOW CANNOT DECIDE, registered before it runs (prereg §3.5). The two pairs put the
//   survival median at the SAME fold and their bands differ by one fold at each end, against a fold spacing
//   near 683 of 6 to 12, and their count predictions differ by 0.3 against an acceptance band 58 wide. The
//   fifth window CANNOT separate the derived amplitude from the fitted one. A later claim that it did is an
//   artifact. What it decides is whether either pair works one decade above where either was calibrated.
//
// B2. per-fold bands, prereg §3.4. The clause is import-stein.md §2.4 P1 s form |X_p - lam| <= 3 sqrt(lam),
//   applied to the MODEL mean, because the derived lambda_p is computed from the window s own qualifying
//   gaps and does not exist until the window is measured.
//    PRE-REGISTERED CLAUSE: at folds p >= 100 with E[X_p] >= 1, at least 90% of measured X_p lie inside
//    E[X_p] +- 3 sqrt(E[X_p]). This is a clause on the body of the distribution, deliberately separate from
//    the extinction clause, which is an extreme.
//      p | theta |  theta/mbar | kills(W)     |  E[X] fitted   band              |  E[X] stein    band
//    307 |   612 |       7.670 |    1.6330e+7 |     98.864    [69.03, 128.69] |     98.286    [68.54, 128.03]
//    311 |   624 |       7.770 |    1.6015e+7 |     87.076    [59.08, 115.07] |     86.667    [58.74, 114.60]
//    313 |   624 |       7.720 |    1.5810e+7 |     90.744    [62.17, 119.32] |     90.265    [61.76, 118.77]
//    317 |   636 |       7.818 |    1.5511e+7 |     80.058    [53.22, 106.90] |     79.728    [52.94, 106.51]
//    331 |   660 |       8.062 |    1.4761e+7 |     58.523     [35.57, 81.47] |     58.448     [35.51, 81.38]
//    337 |   672 |       8.159 |    1.4411e+7 |     51.438     [29.92, 72.95] |     51.431     [29.92, 72.95]
//    347 |   696 |       8.400 |    1.3912e+7 |     38.249     [19.70, 56.80] |     38.352     [19.77, 56.93]
//    349 |   696 |       8.352 |    1.3753e+7 |     39.838     [20.90, 58.77] |     39.923     [20.97, 58.88]
//    353 |   708 |       8.447 |    1.3520e+7 |     35.319     [17.49, 53.15] |     35.434     [17.58, 53.29]
//    359 |   720 |       8.542 |    1.3219e+7 |     31.171     [14.42, 47.92] |     31.307     [14.52, 48.09]
//    367 |   732 |       8.636 |    1.2859e+7 |     27.384     [11.68, 43.08] |     27.533     [11.79, 43.28]
//    373 |   744 |       8.730 |    1.2583e+7 |     24.206      [9.45, 38.97] |     24.365      [9.56, 39.17]
//    379 |   756 |       8.824 |    1.2318e+7 |     21.413      [7.53, 35.30] |     21.578      [7.64, 35.51]
//    383 |   768 |       8.917 |    1.2126e+7 |     19.059      [5.96, 32.16] |     19.227      [6.07, 32.38]
//    389 |   780 |       9.009 |    1.1877e+7 |     16.892      [4.56, 29.22] |     17.059      [4.67, 29.45]
//    397 |   792 |       9.101 |    1.1578e+7 |     14.907      [3.32, 26.49] |     15.071      [3.42, 26.72]
//    401 |   804 |       9.193 |    1.1406e+7 |     13.295      [2.36, 24.23] |     13.456      [2.45, 24.46]
//    409 |   816 |       9.284 |    1.1128e+7 |     11.752      [1.47, 22.04] |     11.906      [1.55, 22.26]
//    419 |   840 |       9.511 |    1.0810e+7 |      8.931      [0.00, 17.90] |      9.073      [0.04, 18.11]
//    421 |   840 |       9.467 |    1.0708e+7 |      9.286      [0.14, 18.43] |      9.429      [0.22, 18.64]
//    431 |   864 |       9.691 |    1.0410e+7 |      7.079      [0.00, 15.06] |      7.207      [0.00, 15.26]
//    433 |   864 |       9.647 |    1.0314e+7 |      7.359      [0.00, 15.50] |      7.488      [0.00, 15.70]
//    439 |   876 |       9.736 |    1.0127e+7 |      6.559      [0.00, 14.24] |      6.681      [0.00, 14.43]
//    443 |   888 |       9.825 |    9.9906e+6 |      5.877      [0.00, 13.15] |      5.992      [0.00, 13.34]
//    449 |   900 |       9.914 |    9.8135e+6 |      5.245      [0.00, 12.12] |      5.353      [0.00, 12.29]
//    457 |   912 |      10.002 |    9.5996e+6 |      4.663      [0.00, 11.14] |      4.764      [0.00, 11.31]
//    461 |   924 |      10.090 |    9.4754e+6 |      4.184      [0.00, 10.32] |      4.280      [0.00, 10.49]
//    463 |   924 |      10.047 |    9.3943e+6 |      4.346      [0.00, 10.60] |      4.443      [0.00, 10.77]
//    467 |   936 |      10.135 |    9.2744e+6 |      3.903       [0.00, 9.83] |      3.994       [0.00, 9.99]
//    479 |   960 |      10.351 |    9.0041e+6 |      2.999       [0.00, 8.19] |      3.077       [0.00, 8.34]
//    487 |   972 |      10.438 |    8.8200e+6 |      2.675       [0.00, 7.58] |      2.747       [0.00, 7.72]
//    491 |   984 |      10.524 |    8.7130e+6 |      2.407       [0.00, 7.06] |      2.474       [0.00, 7.19]
//    499 |   996 |      10.610 |    8.5392e+6 |      2.149       [0.00, 6.55] |      2.212       [0.00, 6.67]
//    503 |  1008 |      10.696 |    8.4380e+6 |      1.936       [0.00, 6.11] |      1.994       [0.00, 6.23]
//    509 |  1020 |      10.781 |    8.3063e+6 |      1.738       [0.00, 5.69] |      1.792       [0.00, 5.81]
//    521 |  1044 |      10.993 |    8.0839e+6 |      1.345       [0.00, 4.82] |      1.391       [0.00, 4.93]
//    523 |  1044 |      10.952 |    8.0230e+6 |      1.396       [0.00, 4.94] |      1.442       [0.00, 5.04]
//    541 |  1080 |      11.287 |    7.7272e+6 |      0.935       [0.00, 3.84] |      0.970       [0.00, 3.92]
//    547 |  1092 |      11.371 |    7.6150e+6 |      0.841       [0.00, 3.59] |      0.873       [0.00, 3.68]
//    557 |  1116 |      11.580 |    7.4517e+6 |      0.657       [0.00, 3.09] |      0.683       [0.00, 3.16]
//    563 |  1128 |      11.664 |    7.3466e+6 |      0.591       [0.00, 2.90] |      0.616       [0.00, 2.97]
//    569 |  1140 |      11.747 |    7.2441e+6 |      0.533       [0.00, 2.72] |      0.556       [0.00, 2.79]
//    571 |  1140 |      11.707 |    7.1941e+6 |      0.552       [0.00, 2.78] |      0.576       [0.00, 2.85]
//    577 |  1152 |      11.791 |    7.0953e+6 |      0.498       [0.00, 2.61] |      0.520       [0.00, 2.68]
//    587 |  1176 |      11.996 |    6.9510e+6 |      0.391       [0.00, 2.27] |      0.409       [0.00, 2.33]
//    593 |  1188 |      12.079 |    6.8581e+6 |      0.352       [0.00, 2.13] |      0.369       [0.00, 2.19]
//    599 |  1200 |      12.161 |    6.7674e+6 |      0.318       [0.00, 2.01] |      0.333       [0.00, 2.07]
//    601 |  1200 |      12.122 |    6.7232e+6 |      0.330       [0.00, 2.05] |      0.345       [0.00, 2.11]
//    607 |  1212 |      12.204 |    6.6354e+6 |      0.298       [0.00, 1.93] |      0.312       [0.00, 1.99]
//    613 |  1224 |      12.286 |    6.5497e+6 |      0.269       [0.00, 1.83] |      0.282       [0.00, 1.88]
//    617 |  1236 |      12.367 |    6.4868e+6 |      0.244       [0.00, 1.73] |      0.256       [0.00, 1.78]
//    619 |  1236 |      12.329 |    6.4456e+6 |      0.253       [0.00, 1.76] |      0.265       [0.00, 1.81]
//    631 |  1260 |      12.529 |    6.3035e+6 |      0.199       [0.00, 1.54] |      0.209       [0.00, 1.58]
//    641 |  1284 |      12.729 |    6.1862e+6 |      0.157       [0.00, 1.35] |      0.166       [0.00, 1.39]
//    643 |  1284 |      12.691 |    6.1485e+6 |      0.163       [0.00, 1.37] |      0.172       [0.00, 1.42]
//    647 |  1296 |      12.771 |    6.0923e+6 |      0.148       [0.00, 1.30] |      0.156       [0.00, 1.34]
//    653 |  1308 |      12.851 |    6.0185e+6 |      0.134       [0.00, 1.23] |      0.142       [0.00, 1.27]
//    659 |  1320 |      12.931 |    5.9462e+6 |      0.121       [0.00, 1.17] |      0.128       [0.00, 1.20]
//    661 |  1320 |      12.894 |    5.9110e+6 |      0.126       [0.00, 1.19] |      0.133       [0.00, 1.23]
//    673 |  1344 |      13.090 |    5.7888e+6 |      0.100       [0.00, 1.05] |      0.106       [0.00, 1.08]
//    677 |  1356 |      13.170 |    5.7383e+6 |      0.091       [0.00, 0.99] |      0.096       [0.00, 1.03]
//    683 |  1368 |      13.249 |    5.6719e+6 |      0.082       [0.00, 0.94] |      0.087       [0.00, 0.97]
//    691 |  1380 |      13.328 |    5.5906e+6 |      0.074       [0.00, 0.89] |      0.079       [0.00, 0.92]
//    701 |  1404 |      13.522 |    5.4957e+6 |      0.059       [0.00, 0.79] |      0.063       [0.00, 0.82]
//    709 |  1416 |      13.601 |    5.4189e+6 |      0.054       [0.00, 0.75] |      0.057       [0.00, 0.77]
//
// B3. cumulative tail sum_{q>=p} E[X_q], which is what the band arithmetic is made of (fitted / stein):
//    p =  457:  4.274e+1   4.403e+1
//    p =  571:  5.438e+0   5.720e+0
//    p =  601:  3.326e+0   3.514e+0
//    p =  653:  1.266e+0   1.349e+0
//    p =  683:  6.941e-1   7.442e-1
//    p =  701:  5.375e-1   5.779e-1
//    p =  877:  3.423e-2   3.782e-2
//    p = 1009:  5.221e-3   5.881e-3
//    p = 1201:  2.755e-4   3.193e-4
//    p = 1499:  4.504e-7   5.392e-7
//
// B4. THE SCORING RULE, prereg §5. Read off the restriction to p < 1500 at anchor 0, against PREDICTION 1.
//   (a) measured last fold with L >= 2 lies inside [571, 877]
//   (b) measured N2(p >= 100) lies inside [51.2, 108.9]
//   (c) measured S1(p >= 100) lies inside [51.2, 108.9]
//   (d) 181, 331, 421, 457, p*5 is strictly increasing, that is p*5 > 457
//   HIT needs all four. MISS is any one failing, EXCEPT that (a) failing alone in the direction the model s
//   known hot bias predicts, with (b), (c), (d) holding and p*5 within a factor 1.5 of the median 683,
//   that is p*5 >= 456, is PARTIAL in the record s own §3.4 language and is not a MISS.
//   HIT: prop-thinning-null.md §5 s downgrade clause does NOT fire. The grade does not improve: WEAKENED was
//        set by found prior art and a fifth window says nothing about prior art.
//   MISS: the clause fires and the extinction half moves toward RETIRED. The PROVEN identity half, the group
//        law and the Y-independence of mbar are untouched by any outcome here.
//
// ############ STAGE C — MEASUREMENT, W = 2e+11, anchor 0 ############
// [782.1s] W = 2e+11: A = 0.0e+0, Y = 2.0e+11, slots = 33333333333, 773.1 s, 4.312e+7 slots/s
//
// --- C1. every fold with L >= 2 at W = 2e+11 ---
//    fold |     kills |      runs |      X | L |  theta | mbar   | G2 before
//       7 | 5714285714 | 3809523810 | 1904761904 | 2 |     12 |  14.00 |        12
//      13 | 1798201799 | 1758241759 | 39960040 | 2 |     24 |  20.22 |        42
//      17 | 1163542340 | 1135335251 | 28207089 | 2 |     36 |  22.92 |        66
//      19 | 918586064 | 896152362 | 22433702 | 2 |     36 |  25.61 |       108
//      23 | 678954915 | 668313607 | 10641308 | 3 |     48 |  28.05 |       150
//      29 | 491656999 | 484119631 | 7537368 | 2 |     60 |  30.13 |       204
//      31 | 428217425 | 420214841 | 8002584 | 4 |     60 |  32.21 |       258
//      37 | 335629829 | 332534222 | 3095607 | 4 |     72 |  34.05 |       348
//      41 | 286513339 | 285403227 | 1110112 | 2 |     84 |  35.80 |       408
//      43 | 259860836 | 258685159 | 1175677 | 3 |     84 |  37.54 |       540
//      47 | 226687035 | 225718250 | 968785 | 3 |     96 |  39.21 |       540
//      53 | 192470285 | 191230768 | 1239517 | 3 |    108 |  40.75 |       570
//      59 | 166372586 | 165715964 | 656622 | 3 |    120 |  42.18 |       570
//      61 | 155462743 | 154767103 | 695640 | 3 |    120 |  43.61 |       612
//      67 | 136899969 | 136532729 | 367240 | 3 |    132 |  44.95 |       642
//      71 | 125331308 | 125286738 |  44570 | 2 |    144 |  46.25 |       720
//      73 | 118463949 | 118415223 |  48726 | 2 |    144 |  47.56 |       720
//      79 | 106467984 | 106293507 | 174477 | 2 |    156 |  48.79 |       720
//      83 |  98771827 |  98574472 | 197355 | 3 |    168 |  50.00 |       720
//      89 |  89894239 |  89714748 | 179491 | 2 |    180 |  51.15 |       720
//      97 |  80626307 |  80555256 |  71051 | 3 |    192 |  52.22 |       768
//     101 |  75836910 |  75810652 |  26258 | 2 |    204 |  53.28 |       768
//     103 |  72892071 |  72864435 |  27636 | 3 |    204 |  54.33 |       768
//     107 |  68805556 |  68792611 |  12945 | 2 |    216 |  55.37 |       858
//     109 |  66280175 |  66266388 |  13787 | 2 |    216 |  56.40 |       858
//     113 |  62760722 |  62734053 |  26669 | 2 |    228 |  57.42 |       858
//     127 |  54852945 |  54832532 |  20413 | 2 |    252 |  58.34 |       912
//     131 |  52340696 |  52333537 |   7159 | 2 |    264 |  59.24 |       912
//     137 |  49283257 |  49277750 |   5507 | 2 |    276 |  60.12 |       930
//     139 |  47864786 |  47858752 |   6034 | 2 |    276 |  61.00 |       930
//     149 |  44008547 |  44001296 |   7251 | 2 |    300 |  61.83 |       930
//     151 |  42841206 |  42833408 |   7798 | 2 |    300 |  62.66 |       948
//     157 |  40657252 |  40652919 |   4333 | 2 |    312 |  63.47 |       948
//     163 |  38661930 |  38659788 |   2142 | 2 |    324 |  64.25 |      1020
//     167 |  37271019 |  37268460 |   2559 | 2 |    336 |  65.03 |      1020
//     173 |  35546263 |  35541965 |   4298 | 2 |    348 |  65.79 |      1020
//     179 |  33956247 |  33952629 |   3618 | 2 |    360 |  66.54 |      1020
//     181 |  33204597 |  33200819 |   3778 | 2 |    360 |  67.28 |      1020
//     191 |  31117369 |  31116803 |    566 | 2 |    384 |  67.99 |      1020
//     193 |  30471685 |  30471051 |    634 | 2 |    384 |  68.70 |      1020
//     197 |  29542513 |  29541745 |    768 | 2 |    396 |  69.41 |      1020
//     199 |  28948267 |  28947475 |    792 | 2 |    396 |  70.11 |      1056
//     211 |  27027160 |  27024931 |   2229 | 2 |    420 |  70.78 |      1068
//     223 |  25328937 |  25328631 |    306 | 2 |    444 |  71.42 |      1068
//     227 |  24659661 |  24659448 |    213 | 2 |    456 |  72.06 |      1104
//     229 |  24229029 |  24228814 |    215 | 2 |    456 |  72.69 |      1158
//     233 |  23604779 |  23604410 |    369 | 2 |    468 |  73.32 |      1158
//     239 |  22814848 |  22814448 |    400 | 2 |    480 |  73.94 |      1158
//     241 |  22436479 |  22436019 |    460 | 2 |    480 |  74.56 |      1158
//     251 |  21362042 |  21361861 |    181 | 2 |    504 |  75.16 |      1158
//     257 |  20697922 |  20697761 |    161 | 2 |    516 |  75.75 |      1206
//     263 |  20068450 |  20068166 |    284 | 2 |    528 |  76.33 |      1206
//     269 |  19473707 |  19473524 |    183 | 2 |    540 |  76.90 |      1206
//     271 |  19186015 |  19185801 |    214 | 2 |    540 |  77.47 |      1206
//     277 |  18632088 |  18631963 |    125 | 2 |    552 |  78.03 |      1206
//     281 |  18235083 |  18235049 |     34 | 2 |    564 |  78.59 |      1206
//     283 |  17977664 |  17977606 |     58 | 2 |    564 |  79.15 |      1368
//     293 |  17241678 |  17241537 |    141 | 2 |    588 |  79.69 |      1368
//     307 |  16344037 |  16343974 |     63 | 2 |    612 |  80.22 |      1368
//     311 |  16030169 |  16030134 |     35 | 2 |    624 |  80.74 |      1368
//     313 |  15826585 |  15826550 |     35 | 2 |    624 |  81.26 |      1368
//     317 |  15527624 |  15527595 |     29 | 2 |    636 |  81.77 |      1368
//     331 |  14778096 |  14778011 |     85 | 2 |    660 |  82.27 |      1368
//     337 |  14428543 |  14428499 |     44 | 2 |    672 |  82.76 |      1368
//     347 |  13931669 |  13931659 |     10 | 2 |    696 |  83.24 |      1368
//     349 |  13772478 |  13772472 |      6 | 2 |    696 |  83.72 |      1368
//     353 |  13539369 |  13539357 |     12 | 2 |    708 |  84.20 |      1368
//     359 |  13239411 |  13239393 |     18 | 2 |    720 |  84.67 |      1368
//     367 |  12879284 |  12879277 |      7 | 2 |    732 |  85.13 |      1392
//     373 |  12604567 |  12604561 |      6 | 2 |    744 |  85.59 |      1392
//     379 |  12338825 |  12338815 |     10 | 2 |    756 |  86.05 |      1470
//     383 |  12147053 |  12147039 |     14 | 2 |    768 |  86.50 |      1470
//     389 |  11900132 |  11900118 |     14 | 2 |    780 |  86.95 |      1470
//     397 |  11600185 |  11600180 |      5 | 2 |    792 |  87.39 |      1518
//     401 |  11429878 |  11429876 |      2 | 2 |    804 |  87.82 |      1518
//     409 |  11150962 |  11150957 |      5 | 2 |    816 |  88.26 |      1518
//     419 |  10833316 |  10833306 |     10 | 2 |    840 |  88.68 |      1524
//     421 |  10730960 |  10730948 |     12 | 2 |    840 |  89.10 |      1524
//     439 |  10151621 |  10151620 |      1 | 2 |    876 |  90.35 |      1524
//     443 |  10014718 |  10014717 |      1 | 2 |    888 |  90.76 |      1524
//     449 |   9836843 |   9836840 |      3 | 2 |    900 |  91.17 |      1524
//     457 |   9624438 |   9624434 |      4 | 2 |    912 |  91.57 |      1524
//     461 |   9499118 |   9499116 |      2 | 2 |    924 |  91.97 |      1524
//     463 |   9419057 |   9419056 |      1 | 2 |    924 |  92.37 |      1524
//     467 |   9298492 |   9298491 |      1 | 2 |    936 |  92.77 |      1668
//     479 |   9029105 |   9029104 |      1 | 2 |    960 |  93.16 |      1668
//     487 |   8843796 |   8843795 |      1 | 2 |    972 |  93.54 |      1668
//     503 |   8462874 |   8462872 |      2 | 2 |   1008 |  94.68 |      1668
//     509 |   8330747 |   8330744 |      3 | 2 |   1020 |  95.06 |      1668
//     631 |   6323532 |   6323531 |      1 | 2 |   1260 | 101.21 |      1980
//
// --- C2. the scored statistics, restricted to the record s folds p < 1500 ---
//   last fold with L >= 2      = 631
//   last fold with theta <= G2 = 1039
//   folds with L >= 2          = 90 of 237;   sum (L-1) = 104;   max L = 4;   sum X = 2031759826
//   N2(p >= 100) = 69;   S1(p >= 100) = 70
//
// --- C3. the range check, the full sweep to 2999 (prereg §4, not a test) ---
//   last fold with L >= 2      = 631
//   last fold with theta <= G2 = 1039   (at Y = 2e10 the record measured 1021 under a ceiling of 1499)
//   folds with L >= 2 = 90;   sum (L-1) = 104;   max L = 4
//   G2 at fold 1499 = 2322;   G2 at fold 2999 = 3198;   theta at that fold = 6000
//   If the last qualifying fold is below 1499 then the record s ceiling was never binding and the
//   extinction is arithmetic, not a range artifact.
//
// ############ STAGE D — scored against Stage B and prereg §5 ############
//   criterion | prediction              | measured | verdict
//   (a) last L >= 2 fold | [571, 877] median 683  | 631 | in band
//   (b) N2(p >= 100)     | 80.1 accept [51.2, 108.9] | 69 | in band
//   (c) S1(p >= 100)     | 80.1 accept [51.2, 108.9] | 70 | in band
//   (d) sequence         | strictly increasing     | 181 -> 331 -> 421 -> 457 -> 631 | holds
//   crossing fold at c = 1.22 predicted 653, measured 631, ratio 0.966
//   survival median 683, measured 631, ratio 0.924 (the PARTIAL clause allows down to 456)
//   PREDICTION 2 for the record only: band [619, 811], median 683, N2 accept [51.4, 109.4]: last fold in band. B1 says this cannot be read as evidence between the pairs.
//
//   VERDICT UNDER THE PRE-REGISTERED RULE: HIT
//   prop-thinning-null.md §5 s downgrade clause does not fire. The grade stays WEAKENED for prior-art reasons.
//
// --- D1. the hot systematic, now at five windows: measured / predicted N2(p >= 100) ---
//   2e7: 8/10.6 = 0.75   2e8: 21/25.7 = 0.82   2e9: 37/42.6 = 0.87   2e10: 50/60.8 = 0.82   2e+11: 69/80.1 = 0.86
//   prereg §5: if the fifth reading is again inside [0.70, 0.90] the systematic is confirmed at five windows
//   and belongs in the law as a known 20% overprediction on counts, not absorbed by the band a fifth time.
//
// --- D2. counts of folds with L >= 2 by decade of p, measured against predicted ---
//    decade        | measured | pred fitted | pred stein
//    [   5,  10)    |        1 |         2.0 |        2.0
//    [  10,  30)    |        5 |         6.0 |        6.0
//    [  30, 100)    |       15 |        15.0 |       15.0
//    [ 100, 300)    |       37 |        37.0 |       37.0
//    [ 300,1000)    |       32 |        43.0 |       43.4
//    [1000,1500)    |        0 |         0.0 |        0.0
//    the [5,100) rows carry NO prediction: alternation caps run lengths there and the record refuses to
//    predict them. They are printed for completeness.
//
// --- D3. the per-fold clause of B2, scored ---
//      p |  E[X] fitted |  band              | X measured | inside
//    307 |       98.864 | [   69.03,   128.69] |         63 | NO
//    311 |       87.076 | [   59.08,   115.07] |         35 | NO
//    313 |       90.744 | [   62.17,   119.32] |         35 | NO
//    317 |       80.058 | [   53.22,   106.90] |         29 | NO
//    331 |       58.523 | [   35.57,    81.47] |         85 | NO
//    337 |       51.438 | [   29.92,    72.95] |         44 | yes
//    347 |       38.249 | [   19.70,    56.80] |         10 | NO
//    349 |       39.838 | [   20.90,    58.77] |          6 | NO
//    353 |       35.319 | [   17.49,    53.15] |         12 | NO
//    359 |       31.171 | [   14.42,    47.92] |         18 | yes
//    367 |       27.384 | [   11.68,    43.08] |          7 | NO
//    373 |       24.206 | [    9.45,    38.97] |          6 | NO
//    379 |       21.413 | [    7.53,    35.30] |         10 | yes
//    383 |       19.059 | [    5.96,    32.16] |         14 | yes
//    389 |       16.892 | [    4.56,    29.22] |         14 | yes
//    397 |       14.907 | [    3.32,    26.49] |          5 | yes
//    401 |       13.295 | [    2.36,    24.23] |          2 | NO
//    409 |       11.752 | [    1.47,    22.04] |          5 | yes
//    419 |        8.931 | [    0.00,    17.90] |         10 | yes
//    421 |        9.286 | [    0.14,    18.43] |         12 | yes
//    431 |        7.079 | [    0.00,    15.06] |          0 | yes
//    433 |        7.359 | [    0.00,    15.50] |          0 | yes
//    439 |        6.559 | [    0.00,    14.24] |          1 | yes
//    443 |        5.877 | [    0.00,    13.15] |          1 | yes
//    449 |        5.245 | [    0.00,    12.12] |          3 | yes
//    457 |        4.663 | [    0.00,    11.14] |          4 | yes
//    461 |        4.184 | [    0.00,    10.32] |          2 | yes
//    463 |        4.346 | [    0.00,    10.60] |          1 | yes
//    467 |        3.903 | [    0.00,     9.83] |          1 | yes
//    479 |        2.999 | [    0.00,     8.19] |          1 | yes
//    487 |        2.675 | [    0.00,     7.58] |          1 | yes
//    491 |        2.407 | [    0.00,     7.06] |          0 | yes
//    499 |        2.149 | [    0.00,     6.55] |          0 | yes
//    503 |        1.936 | [    0.00,     6.11] |          2 | yes
//    509 |        1.738 | [    0.00,     5.69] |          3 | yes
//    521 |        1.345 | [    0.00,     4.82] |          0 | yes
//    523 |        1.396 | [    0.00,     4.94] |          0 | yes
//   folds p >= 100 with E[X] >= 1: 32 of 74 inside the 3 sqrt band = 43.2%, against the pre-registered 90%: CLAUSE FAILS
//   (only the folds p >= 300 are printed; the shallower ones are counted and not listed.)
//
// --- D4. the sum, and the ratio the first moment is scored on ---
//   sum X over p >= 100 measured = 190961;  model fitted = 2.004481e+5, ratio 0.9527;  model stein = 1.917009e+5, ratio 0.9961
//   import-stein.md §2.4 P1 read 0.914, 1.009, 1.046, 1.009 at the four windows against its DERIVED lambda,
//   which is a different object from the model mean here and is not comparable digit for digit.
//
// [782.1s] done
// ============================================================
// READINGS
// ============================================================
// 1. THE PRE-REGISTERED VERDICT IS HIT (Stage D): last fold with L >= 2 at
//    W = 2e11 measured 631 against the sealed band [571, 877] (median 683);
//    N2(p >= 100) = 69 and S1 = 70 inside [51.2, 108.9]; the sequence
//    181 -> 331 -> 421 -> 457 -> 631 strictly increasing. The rate law's
//    support now spans five windows and four decades. Prereg:
//    history/staging/foldL-window5-prereg.md (committed alone, 7038e0b);
//    record: history/staging/foldL-window5.md.
// 2. The hot systematic is confirmed at five of five windows (D1: 0.75,
//    0.82, 0.87, 0.82, 0.86) and per the prereg now belongs IN the law as a
//    known ~20% count overprediction.
// 3. The per-fold clause FAILS (D3: 32 of 74 folds inside +-3 sqrt(lambda)
//    = 43.2% against the registered 90%): the aggregate lands while
//    per-fold dispersion is far wider than Poisson — the law's one missing
//    piece.
// 4. The range check (C3): last fold with theta <= G2 = 1039 < 1499 on the
//    full sweep to 2999, so the record's old ceiling was never binding and
//    the extinction is arithmetic.
// 5. D4, for the record only per prereg §3.5: sum X(p >= 100) = 190961,
//    fitted model ratio 0.9527, Stein-derived ratio 0.9961 — not evidence
//    between the pairs.

// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded run of this file does not
// contain verbatim actually is. No number above was changed.
//
// SAME VALUE, DIFFERENT NOTATION: W = 2e11 is the run's own W, printed as
// "STAGE C -- MEASUREMENT, W = 2e+11, anchor 0".
//
// TOKENIZER ARTIFACT, not a figure: 7038e0 is the leading six characters of
// the git commit 7038e0b, the sealed pre-registration commit named in the same
// sentence. That commit exists and its subject line is "prereg:
// foldL-window5". A figure scanner reads the hash prefix as exponent notation.
// ---------------------------------------------------------------------------
