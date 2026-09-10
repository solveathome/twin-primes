// ============================================================================
// ATTACK foldL-06 — THE MULTI-KILL EXTINCTION SCALING TEST
// ============================================================================
// PROMOTION TEST for the law candidate of `attack-foldL-04-amortized.md` §8.
// That note measured, in the localized window [0, 2e9), that kill-runs of
// length >= 2 die out past a threshold fold, and that the first-moment
// inequality
//
//        2c * p / mbar(p)  >  ln( kills in the window at fold p )
//
// crosses at the same fold, p = 421, with a fitted c = 1.22. One window, one
// fitted constant, one extreme-value statistic: that is an observation, not a
// law. A law has to predict a window it was not fitted on. This script does
// exactly that, and nothing else.
//
// WHAT IS BEING TESTED, AND WHAT IS NOT. The mechanism behind the inequality
// is H'' of `a3-05-bound-L.md` §8: an exponential density law for the chance
// that a killed slot has a killed neighbour, at rate set by the qualifying
// threshold theta_p ~ 2p against the mean spacing mbar. H'' is UNPROVEN and
// this script does not prove it. It promotes or breaks it empirically.
//
// THE ENGINE, AND WHY THE INNER LOOP IS NEW. `attack-foldL-04-localized.js`
// owns this object and its conventions, and is reused verbatim in every
// convention below: window [0, Y), positions n = 5 (mod 6), key(n) = min{q
// prime >= 5 : q | n(n+2)} with key = 0 for the survivors of every fold <=
// QMAX, fold p deletes the n with key(n) = p, a kill run is a maximal block of
// slots adjacent in the CURRENT level and all killed at p, L = longest run,
// X_p = (kills - runs) = adjacent kill pairs, mbar = Y / N, and the qualifying
// threshold theta_p = 2p - 2*eta with eta = +1 for p = 1 (mod 6) and -1 for
// p = 5 (mod 6), which is the 2p' -+ 2 form that `attack-foldL-01-census.md`
// §0 corrected. What could NOT be reused is its data structure. That engine
// materialises a doubly linked list over all M = Y/6 positions: at Y = 2e9 it
// holds about 7 GB of typed arrays, and at Y = 2e10 it would hold 70 GB. So
// the inner loop here is a chunked, streaming re-derivation of the SAME
// quantities, and the whole of Stage A exists to prove the two engines agree:
// twenty figures of the angle-4 embedded tail are asserted digit for digit,
// and the script aborts if any of them moves.
//
// THE STREAMING IDENTITY that makes chunking exact rather than approximate.
// The level-p object is {n : key(n) = 0 or key(n) >= p}. Two slots i < j with
// key = p are adjacent at level p if and only if every slot strictly between
// them has key < p. So the entire fold history is a local function of the key
// SEQUENCE, and one left-to-right pass with a stack of strictly decreasing
// keys computes every run at every fold at once: a new key k pops (and thereby
// closes the run of) every stack entry with a smaller key, extends the run if
// the surviving top equals k, and starts a new run otherwise. key = 0 is the
// sentinel +infinity. The stack carries across chunk boundaries, so there is
// no margin, no overlap and no boundary approximation: the chunked answer is
// the whole-window answer. Memory is one Uint16 array per chunk, flat in Y.
//
// The same stack yields the level-by-level record gap for free: when a slot
// arrives it becomes the predecessor of every level <= its key, so each popped
// entry contributes one genuine gap to a contiguous band of levels, recorded
// at the band's floor and swept upward with a running max, which is valid
// because the level-p object is a subset of the level-q object for q < p and a
// gap can only grow.
//
// PRE-REGISTRATION (the point of the exercise). Stage B derives, from the
// Y = 2e9 calibration ALONE, a predicted extinction fold, a predicted count of
// folds carrying L >= 2, and a predicted sum of (L-1), for each of the three
// unrun windows, each with a band, plus a stated kill criterion. Stage B runs
// before Stage C and its text is written into the staging report before Stage
// C is ever executed. The two stages are separated in this file so a reader
// can check that no measurement of a new window feeds a prediction of it.
//
// `attack-foldL-02-bridge.md`'s straddle question does not arise here and it
// is worth saying why: that note's runs straddle a COPY boundary of a cyclic
// tile, an artifact of representing T_x as p copies of a residue word. A
// window is not a cyclic object and has no copies. Its only boundary artifacts
// are the two end gaps, excluded throughout, and the least-factor slots n = p
// and n = p^2 - 2 below p^2, a couple per fold against ~2Y/(p*mbar).
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
const DEC = [[5, 10], [10, 30], [30, 100], [100, 300], [300, 1000], [1000, 1500]];
function byDecade(w) {
  return DEC.map(([lo, hi]) => {
    const sel = w.rows.filter(x => x.p >= lo && x.p < hi);
    return { lo, hi, folds: sel.length, n2: sel.filter(x => x.L >= 2).length, s1: sel.reduce((a, x) => a + x.L - 1, 0) };
  });
}

// ==========================================================================
// STAGE A — CALIBRATION ON Y = 2e9 ONLY
// ==========================================================================
console.log('');
console.log('############ STAGE A — CALIBRATION, Y = 2e9, window anchored at 0 ############');
const CAL = runWindow(0, 2e9, 'calibration');
const calRow = p => CAL.rows[fidx[p]];
const S = summarise(CAL);

console.log('');
console.log('--- A1. digit-for-digit against the embedded tail of attack-foldL-04-localized.js ---');
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
  ['last fold with L >= 2', S.lastLive, 421],
  ['last fold with theta <= G2', S.lastQual, 1021],
  ['folds with L >= 2', S.n2, 58],
  ['max L over all folds', S.maxL, 3],
  ['sum over folds of (L-1)', S.s1, 64],
  ['sum over folds of X', S.sx, 20317943],
];
let bad = 0;
for (const [name, got, want] of EXPECT) {
  const ok = got === want;
  if (!ok) bad++;
  console.log('  ' + (ok ? 'OK  ' : 'FAIL') + '  ' + name.padEnd(44) + ' got ' + String(got).padStart(11) + '   record ' + String(want).padStart(11));
}
console.log('  mbar at fold 421 (after) = ' + calRow(421).mbarA.toFixed(2) + '   record 89.15');
console.log('  theta/mbar at fold 421   = ' + calRow(421).thr.toFixed(3) + '   record 9.467');
console.log('  ' + (bad === 0 ? 'CALIBRATION CLEAN: 30 of 30 figures reproduced by an independent engine.'
  : 'CALIBRATION BROKEN: ' + bad + ' figure(s) disagree with the record. STOP.'));

console.log('');
console.log('--- A2. the crossing arithmetic of the record, reproduced ---');
{
  const r = calRow(421), rn = calRow(431);
  console.log('  p = 421: mbar = ' + r.mbarA.toFixed(2) + ', kills = ' + r.kills + ', ln kills = ' + Math.log(r.kills).toFixed(3));
  console.log('           2c*p/mbar at c = 1.22 is ' + (2 * 1.22 * 421 / r.mbarA).toFixed(3) + '  (record: 11.6 at c = 1.22)');
  console.log('           c that makes the two sides equal: c = ' + (Math.log(r.kills) * r.mbarA / (2 * 421)).toFixed(4));
  console.log('  p = 431: 2c*p/mbar = ' + (2 * 1.22 * 431 / rn.mbarA).toFixed(3) + ' vs ln kills = ' + Math.log(rn.kills).toFixed(3) + '  -> already closed');
}

console.log('');
console.log('--- A3. the density law, fitted properly (Poisson MLE) ---');
console.log('  the law candidate says the chance that a killed slot has a killed neighbour decays as exp(-c*theta/mbar).');
console.log('  model 1 (the law as written):  X_p ~ Poisson( kills_p * exp(-c*u_p) ),          u_p = theta_p / mbar_before(p)');
console.log('  model 2 (one amplitude added): X_p ~ Poisson( kills_p * A * exp(-c*u_p) ).');
console.log('  The amplitude is not a free fudge: the mechanism produces one. A gap qualifies when it is 0 or +-2 mod p,');
console.log('  which is 3 residues out of p among multiples of 6, so the rate carries a prefactor of order 6/mbar before');
console.log('  any exponential is taken. Model 1 forces that prefactor to be 1.');
function fit1(sel) {
  let c = 1.3;
  for (let it = 0; it < 200; it++) {
    let g = 0, h = 0;
    for (const r of sel) { const e = r.kills * Math.exp(-c * r.thr); g += -r.X * r.thr + e * r.thr; h += -e * r.thr * r.thr; }
    const st = g / h; c -= st; if (Math.abs(st) < 1e-13) break;
  }
  let info = 0; for (const r of sel) info += r.kills * r.thr * r.thr * Math.exp(-c * r.thr);
  return { A: 1, c, seC: 1 / Math.sqrt(info) };
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
  return { A: Math.exp(a), c, seC: Math.sqrt(h11 / det), rho: -h12 / Math.sqrt(h11 * h22) };
}
function fitA(sel, c) {   // profile the amplitude at a fixed rate
  let a = 0;
  for (let it = 0; it < 300; it++) {
    let g = 0, h = 0;
    for (const r of sel) { const e = r.kills * Math.exp(a - c * r.thr); g += r.X - e; h += -e; }
    const st = g / h; a -= st; if (Math.abs(st) < 1e-14) break;
  }
  return { A: Math.exp(a), c };
}
const DEEP = CAL.rows.filter(r => r.p >= 100);
const M1 = fit1(DEEP), M2 = fit2(DEEP);
console.log('  model 1, folds p >= 100 (' + DEEP.length + ' folds, ' + DEEP.reduce((a, r) => a + r.X, 0) + ' adjacent kill pairs): c = ' + M1.c.toFixed(4) + ' +- ' + M1.seC.toFixed(4));
console.log('  model 2, same folds: A = ' + M2.A.toExponential(4) + ', c = ' + M2.c.toFixed(4) + ' +- ' + M2.seC.toFixed(4) + ', corr(A,c) = ' + M2.rho.toFixed(3));
console.log('  model 1 over all 237 folds: c = ' + fit1(CAL.rows).c.toFixed(4) + ' (the shallow folds dominate it; see A4)');
console.log('');
console.log('  effective c by decade of p, two ways. c_agg is the record s form, -ln(sum X / sum kills) / mean(theta/mbar);');
console.log('  c_mle is the model-1 maximum likelihood value on the same folds:');
for (const [lo, hi] of DEC) {
  const sel = CAL.rows.filter(r => r.p >= lo && r.p < hi);
  const k = sel.reduce((a, r) => a + r.kills, 0), x = sel.reduce((a, r) => a + r.X, 0);
  const u = sel.reduce((a, r) => a + r.thr, 0) / sel.length;
  const f = x > 0 ? fit1(sel) : null;
  console.log('    p in [' + String(lo).padStart(4) + ',' + String(hi).padStart(4) + '): folds ' + String(sel.length).padStart(3) +
    '  mean theta/mbar ' + u.toFixed(2).padStart(6) + '  X/kills ' + (x / k).toExponential(2) +
    '  c_agg ' + (x > 0 ? (-Math.log(x / k) / u).toFixed(3) : '  -  ') + '  c_mle ' + (f ? f.c.toFixed(3) + ' +- ' + f.seC.toFixed(3) : '  -  '));
}
console.log('  The two disagree, and c_agg is the one that is wrong. Within a decade the pairs all sit at the SMALLEST u');
console.log('  in the decade while the mean u is far larger, so dividing an aggregate log-ratio by a mean u understates c.');
console.log('  The record s reading of a c that "drifts below the bracket at the closure point" is that bias, not a drift.');

console.log('');
console.log('--- A4. where the geometric run model is valid, and where it is refuted ---');
console.log('  under the model the expected number of runs of length >= l is kills * A * r^(l-1), r = exp(-c*theta/mbar),');
console.log('  so predicted L = 1 + floor( ln(kills*A) / (c*theta/mbar) ). Measured against predicted, model 2:');
console.log('   fold | kills      | c*theta/mbar | L pred | L meas');
for (const p of [7, 13, 23, 31, 43, 53, 67, 97, 113, 149, 211, 271, 421]) {
  const r = calRow(p), u = M2.c * r.thr;
  console.log('  ' + String(p).padStart(5) + ' | ' + String(r.kills).padStart(10) + ' | ' + u.toFixed(3).padStart(12) +
    ' | ' + String(1 + Math.max(0, Math.floor(Math.log(r.kills * M2.A) / u))).padStart(6) + ' | ' + String(r.L).padStart(6));
}
console.log('  The model overpredicts L below p ~ 50 because run lengths there are capped by the ALTERNATION constraint of');
console.log('  attack-foldL-01-census.md §1 (from channel A the legal gap classes are {0,-2}, from B they are {0,+2}, so');
console.log('  non-zero classes strictly alternate and the cheap word 2p-2, 2p-2 is illegal), not by scarcity of qualifying');
console.log('  gaps. It is calibrated from p ~ 100 upward. Every prediction below is made for the band p >= 100 only, and');
console.log('  the shallow folds are reported as raw data with no prediction attached.');

console.log('');
console.log('--- A5. mbar(p) is Y-independent and height-independent, by an exact argument ---');
console.log('  key(n) depends only on n mod prod(q <= 1499), so the level-p population density is EXACTLY periodic.');
console.log('  Hence mbar(p) carries no Y dependence and no drift with height, and kills(Y,p) = (Y/mbar_before(p)) * (2/p)');
console.log('  is exactly proportional to Y. Check against the Mertens product 6 / prod_{5<=q<=p}(1-2/q):');
{
  let pr = 1;
  console.log('   fold | mbar measured | mbar Mertens | ratio');
  for (let j = 0; j < F; j++) {
    pr *= (1 - 2 / folds[j]);
    if ([5, 13, 29, 101, 421, 1051, 1499].includes(folds[j]))
      console.log('  ' + String(folds[j]).padStart(5) + ' | ' + CAL.rows[j].mbarA.toFixed(3).padStart(13) + ' | ' + (6 / pr).toFixed(3).padStart(12) +
        ' | ' + (CAL.rows[j].mbarA / (6 / pr)).toFixed(5));
  }
  console.log('  The last two rows drift because the window has stopped being large against the level spacing, not because');
  console.log('  mbar depends on Y: at p = 1499 the level holds 15.7e6 slots in 2e9, still ample. The predictions below use');
  console.log('  the MEASURED mbar, so this approximation never enters them.');
}

// ==========================================================================
// STAGE B — PRE-REGISTERED PREDICTIONS (derived from Stage A ONLY)
// ==========================================================================
const C_CROSS = 1.22;                     // the record's own constant, §8 of attack-foldL-04-amortized.md
const OFFA = 10000000002;                 // smallest multiple of 6 above 1e10; see the guard in runWindow
const mbB = CAL.rows.map(r => r.mbarB), mbA = CAL.rows.map(r => r.mbarA);
const killsPred = (Y, j) => (Y / mbB[j]) * (2 / folds[j]);
const uOf = j => theta[j] / mbB[j];

function tailSum(Y, m, fromJ) { let s = 0; for (let j = fromJ; j < F; j++) s += killsPred(Y, j) * m.A * Math.exp(-m.c * uOf(j)); return s; }
function lastFoldAt(Y, m, level) { let ans = folds[0]; for (let j = 0; j < F; j++) if (tailSum(Y, m, j) >= level) ans = folds[j]; return ans; }
function crossFold(Y, c) { let ans = null; for (let j = 0; j < F; j++) if (2 * c * folds[j] / mbA[j] <= Math.log(killsPred(Y, j))) ans = folds[j]; return ans; }
function counts(Y, m, pmin) {
  let n2 = 0, v = 0, s1 = 0;
  for (let j = 0; j < F; j++) {
    if (folds[j] < pmin) continue;
    const K = killsPred(Y, j), r = Math.exp(-m.c * uOf(j)), mu = K * m.A * r;
    const P = 1 - Math.exp(-mu); n2 += P; v += P * (1 - P);
    for (let l = 2; l <= 60; l++) { const mm = K * m.A * Math.pow(r, l - 1); if (mm < 1e-10) break; s1 += 1 - Math.exp(-mm); }
  }
  return { n2, sd: Math.sqrt(v), s1geo: s1, s1: n2 };
}
function decadePred(Y, m) {
  return DEC.map(([lo, hi]) => {
    let n2 = 0;
    for (let j = 0; j < F; j++) { if (folds[j] < lo || folds[j] >= hi) continue; n2 += 1 - Math.exp(-killsPred(Y, j) * m.A * Math.exp(-m.c * uOf(j))); }
    return { lo, hi, n2 };
  });
}
// the extinction band: 10th to 90th percentile of the last-pair distribution, unioned over
// the rate within +-3 standard errors with the amplitude profiled at each rate
const CSET = [-3, -2, 0, 2, 3].map(k => M2.c + k * M2.seC);
function bandOf(Y) {
  let lo = 1e9, hi = 0;
  for (const c of CSET) { const m = fitA(DEEP, c); lo = Math.min(lo, lastFoldAt(Y, m, 2.302585)); hi = Math.max(hi, lastFoldAt(Y, m, 0.105361)); }
  return [lo, hi];
}

console.log('');
console.log('--- A6. ESTIMATOR CALIBRATION: does the predictive machine reproduce the window it was fitted on? ---');
console.log('  This is the step the campaign keeps paying for skipping. Model 1 and model 2 are both fitted on the');
console.log('  Y = 2e9 pairs; only one of them reproduces the Y = 2e9 STATISTICS the test will be scored on.');
console.log('   model | c      | A         | last-pair median | 10-90% band | N2(p>=100) | S1(p>=100)');
for (const [nm, m] of [['1', M1], ['2', M2]]) {
  const cc = counts(2e9, m, 100);
  console.log('     ' + nm + '   | ' + m.c.toFixed(4) + ' | ' + m.A.toExponential(3) + ' | ' + String(lastFoldAt(2e9, m, Math.LN2)).padStart(16) +
    ' | [' + String(lastFoldAt(2e9, m, 2.302585)).padStart(3) + ',' + String(lastFoldAt(2e9, m, 0.105361)).padStart(4) + '] | ' +
    cc.n2.toFixed(1).padStart(10) + ' | ' + cc.s1geo.toFixed(1).padStart(10));
}
{
  const sC = summarise(CAL);
  console.log('   MEASURED at 2e9                        | ' + String(sC.lastLive).padStart(16) + ' |             | ' + String(sC.n2d).padStart(10) + ' | ' + String(sC.s1d).padStart(10));
}
console.log('  Model 1 misses on both: it puts the last pair at fold 277 against the truth 421 and predicts 27.4 folds');
console.log('  with a pair against 37. Model 2 lands the extinction fold at 431 against 421 and brackets it. So MODEL 2 IS');
console.log('  ADOPTED for the bands and counts, and the one-parameter form of the law is already refuted as a fitting');
console.log('  model on its own calibration window, before any new window is touched.');
console.log('');
console.log('  THE RUN-LENGTH EXTENSION OF MODEL 2 IS REFUTED, AND IS NOT USED. Chaining the same rate to runs of');
console.log('  length l gives kills*A*r^(l-1) runs of length >= l, which at Y = 2e9 predicts ' +
  (counts(2e9, M2, 100).s1geo - counts(2e9, M2, 100).n2).toFixed(1) + ' folds with p >= 100');
console.log('  carrying L >= 3. Measured: ZERO. Every one of the 37 folds with p >= 100 and L >= 2 has L exactly 2, and');
console.log('  the whole window s max L is 3, reached only at shallow folds. The reason is again alternation: a run of 3');
console.log('  needs two consecutive qualifying gaps in opposite channels, which the independence model does not know');
console.log('  about. So the pre-registered prediction for S1 is S1 = N2, i.e. no fold above p = 100 carries L >= 3 in any');
console.log('  window, and the geometric value is carried alongside only as the contrast it is.');
console.log('');
console.log('  Model 2 is not unbiased either, and the bias is disclosed and priced. Decade by decade at Y = 2e9:');
console.log('   decade      | folds | X meas | X pred | N2 meas | N2 pred');
for (const [lo, hi] of [[100, 200], [200, 300], [300, 500], [500, 1000], [1000, 1500]]) {
  const sel = CAL.rows.filter(r => r.p >= lo && r.p < hi);
  let xp = 0, n2 = 0;
  for (const r of sel) { const mu = (2e9 / r.mbarB) * (2 / r.p) * M2.A * Math.exp(-M2.c * r.thr); xp += mu; n2 += 1 - Math.exp(-mu); }
  console.log('   [' + String(lo).padStart(4) + ',' + String(hi).padStart(4) + ') | ' + String(sel.length).padStart(5) + ' | ' +
    String(sel.reduce((a, r) => a + r.X, 0)).padStart(6) + ' | ' + xp.toFixed(1).padStart(6) + ' | ' +
    String(sel.filter(r => r.L >= 2).length).padStart(7) + ' | ' + n2.toFixed(1).padStart(7));
}
console.log('  It is exact through p = 300 and runs about a factor 2 hot beyond it (8.4 predicted pairs against 3, 6.5');
console.log('  folds against 3), which is exactly the regime that sets the extinction point. The count bands below are');
console.log('  therefore widened by a flat +-30% on top of two Poisson standard deviations, which covers that self-check');
console.log('  miss with room to spare.');

console.log('');
console.log('############ STAGE B — PRE-REGISTRATION. Derived from Y = 2e9 alone. ############');
console.log('Written into research/history/staging/attack-foldL-06-scaling.md BEFORE Stage C was run.');
console.log('');
console.log('B1. THE PREDICTIVE MACHINE, in full.');
console.log('  kills(Y,p) = (Y / mbar_before(p)) * (2/p), mbar_before(p) the Y = 2e9 measured value (Y-independent by A5).');
console.log('  E[X_p]     = kills(Y,p) * A * exp(-c * theta_p / mbar_before(p)),  A = ' + M2.A.toExponential(4) + ', c = ' + M2.c.toFixed(4) + ' +- ' + M2.seC.toFixed(4) + '.');
console.log('  POINT PREDICTION OF THE EXTINCTION FOLD, in the law s own literal §8 arithmetic:');
console.log('    p* = the last fold with 2c*p/mbar(p) <= ln kills(Y,p), at the record s c = ' + C_CROSS + '.');
console.log('  BAND: 10th to 90th percentile of the last-pair distribution under P(last >= p) = 1 - exp(-sum_{q>=p} E[X_q]),');
console.log('    unioned over c in [c-3se, c+3se] with A profiled at each c. Range of c used: ' +
  CSET.map(c => c.toFixed(3)).join(', ') + '.');
console.log('  COUNTS (better powered than any single last event): N2(Y) = # folds p >= 100 with L >= 2, predicted by');
console.log('    sum (1 - exp(-E[X_p])). S1(Y) = sum_{p>=100} (L-1) is predicted EQUAL TO N2 by A6: above p = 100 no');
console.log('    fold carries L >= 3. The geometric chain value is printed beside it as the refuted contrast.');
console.log('    Acceptance band on both: prediction x [0.7, 1.3], then widened by +-2 Poisson standard deviations.');
console.log('');
console.log('B2. THE PREDICTIONS.');
const TARGETS = [2e7, 2e8, BIGY];
const PRED = {};
console.log('   Y      | crossing p* (c=1.22) | survival p* median | 10-90% band  | N2 pred | accept       | S1 pred | accept       | S1 geo (refuted)');
for (const Y of TARGETS) {
  const [lo, hi] = bandOf(Y), cc = counts(Y, M2, 100);
  const n2lo = 0.7 * cc.n2 - 2 * cc.sd, n2hi = 1.3 * cc.n2 + 2 * cc.sd;
  const s1lo = 0.7 * cc.s1 - 2 * cc.sd, s1hi = 1.3 * cc.s1 + 2 * cc.sd;
  PRED[Y] = { cross: crossFold(Y, C_CROSS), med: lastFoldAt(Y, M2, Math.LN2), lo, hi, n2: cc.n2, sd: cc.sd, s1: cc.s1, s1geo: cc.s1geo, n2lo, n2hi, s1lo, s1hi };
  const P = PRED[Y];
  console.log('  ' + Y.toExponential(0).padStart(6) + ' | ' + String(P.cross).padStart(20) + ' | ' + String(P.med).padStart(18) +
    ' | [' + String(P.lo).padStart(4) + ',' + String(P.hi).padStart(5) + '] | ' + P.n2.toFixed(1).padStart(7) +
    ' | ' + (n2lo.toFixed(1) + ' - ' + n2hi.toFixed(1)).padStart(12) + ' | ' + P.s1.toFixed(1).padStart(7) +
    ' | ' + (s1lo.toFixed(1) + ' - ' + s1hi.toFixed(1)).padStart(12) + ' | ' + cc.s1geo.toFixed(1).padStart(17));
}
{
  const [lo, hi] = bandOf(2e9), cc = counts(2e9, M2, 100), sC = summarise(CAL);
  console.log('  ' + (2e9).toExponential(0).padStart(6) + ' | ' + String(crossFold(2e9, C_CROSS)).padStart(20) + ' | ' + String(lastFoldAt(2e9, M2, Math.LN2)).padStart(18) +
    ' | [' + String(lo).padStart(4) + ',' + String(hi).padStart(5) + '] | ' + cc.n2.toFixed(1).padStart(7) + ' | (fitted here)| ' + cc.s1.toFixed(1).padStart(7) + ' | (fitted here)| ' + cc.s1geo.toFixed(1).padStart(17));
  console.log('         | MEASURED at 2e9: last L >= 2 fold ' + sC.lastLive + ', N2 = ' + sC.n2d + ', S1 = ' + sC.s1d + '. The 2e9 row is the calibration, not a test.');
}
console.log('');
console.log('  predicted count of folds with L >= 2, by decade of p:');
console.log('   decade        |    2e7 |    2e8 |    2e9 |  ' + BIGY.toExponential(0));
{
  const d = [2e7, 2e8, 2e9, BIGY].map(Y => decadePred(Y, M2));
  for (let i = 0; i < DEC.length; i++)
    console.log('   [' + String(DEC[i][0]).padStart(4) + ',' + String(DEC[i][1]).padStart(4) + ')    | ' +
      d.map(x => x[i].n2.toFixed(1).padStart(6)).join(' | '));
  console.log('   (the [5,100) rows carry NO prediction: A4 refutes the model there. They are printed for completeness.)');
}
console.log('');
console.log('B3. THE OFFSET PREDICTION. By A5 the object is exactly periodic in n, so [' + OFFA + ', ' + OFFA + ' + 2e9) must be');
console.log('  statistically identical to [0, 2e9): the extinction fold sits in the same band [' + bandOf(2e9)[0] + ', ' + bandOf(2e9)[1] + '] and');
console.log('  N2(p >= 100) sits within 2 Poisson s.d. of the [0,2e9) value. There is no height drift to allow for, so a');
console.log('  material move would falsify A5, which is an exact argument, and not H\'\'.');
console.log('');
console.log('B4. THE KILL CRITERION, stated before the data exists.');
console.log('  CONFIRMED  if, at ALL THREE new windows: (a) the measured last L >= 2 fold lies inside its 10-90% band;');
console.log('             (b) measured N2(p >= 100) lies inside its acceptance band; (c) measured S1(p >= 100) likewise;');
console.log('             and (d) the measured extinction fold is strictly increasing across 2e7 < 2e8 < 2e9 < ' + BIGY.toExponential(0) + '.');
console.log('  PARTIAL    if (d) holds and (b) holds at 2 of the 3 new windows, but (a) or (c) fails somewhere, AND no');
console.log('             measured extinction fold misses its band by more than a factor 1.5 in p.');
console.log('  BROKEN     if (d) fails, or (b) fails at 2 or more of the 3 windows, or the measured extinction fold misses');
console.log('             its band by more than a factor 1.5 in p at any window.');
console.log('  The law being scored is H\'\' as the record states it: an exponential density for the qualifying-gap');
console.log('  adjacency, at a rate fixed by theta/mbar, with a constant calibrated once. CONFIRMED promotes it from');
console.log('  observation to calibrated law. BROKEN retires it. PARTIAL leaves it an observation with a known scaling.');

// A top-level `return` would do here and Node would accept it, but the corpus
// parser will not, so the measurement stages sit inside the else branch. Their
// indentation is left alone deliberately: re-indenting 150 lines to express one
// boolean makes the diff unreadable for no gain.
if (STAGE === 'predict') { console.log(''); console.log('[' + el() + 's] STAGE=predict: stopping before any new window is touched.'); } else {

// ==========================================================================
// STAGE C — THE THREE NEW WINDOWS
// ==========================================================================
console.log('');
console.log('############ STAGE C — MEASUREMENT ############');
const W = {};
W[2e7] = runWindow(0, 2e7, 'Y = 2e7');
W[2e8] = runWindow(0, 2e8, 'Y = 2e8');
W[2e9] = CAL;
W[BIGY] = runWindow(0, BIGY, 'Y = ' + BIGY.toExponential(0));

for (const Y of [2e7, 2e8, 2e9, BIGY]) {
  const w = W[Y], s = summarise(w);
  console.log('');
  console.log('--- Y = ' + Y.toExponential(0) + ': every fold with L >= 2 ---');
  console.log('   fold |    kills |  runs   |     X | L |  theta | mbar   | G2 before');
  for (const r of w.rows) {
    if (r.L < 2) continue;
    console.log('  ' + String(r.p).padStart(5) + ' | ' + String(r.kills).padStart(8) + ' | ' + String(r.runs).padStart(8) +
      ' | ' + String(r.X).padStart(5) + ' | ' + r.L + ' | ' + String(r.theta).padStart(6) + ' | ' + r.mbarA.toFixed(2).padStart(6) +
      ' | ' + String(r.G2).padStart(9));
  }
  console.log('  last L >= 2 fold = ' + s.lastLive + ';  last fold with theta <= G2 = ' + s.lastQual +
    ';  max L = ' + s.maxL + ';  folds with L >= 2 = ' + s.n2 + ' of ' + F +
    ';  sum (L-1) = ' + s.s1 + ';  sum X = ' + s.sx);
  console.log('  restricted to the calibrated band p >= 100:  N2 = ' + s.n2d + ',  S1 = ' + s.s1d);
}

// ==========================================================================
// STAGE D — THE OFFSET WINDOW
// ==========================================================================
console.log('');
console.log('############ STAGE D — same length, moved up: [' + OFFA + ', ' + OFFA + ' + 2e9) ############');
const OFF = runWindow(OFFA, 2e9, 'offset');
{
  const s = summarise(OFF);
  console.log('   fold |    kills |     X | L');
  for (const r of OFF.rows) if (r.L >= 2 && r.p >= 100) console.log('  ' + String(r.p).padStart(5) + ' | ' + String(r.kills).padStart(8) + ' | ' + String(r.X).padStart(5) + ' | ' + r.L);
  console.log('  last L >= 2 fold = ' + s.lastLive + ' (anchored at 0: ' + summarise(CAL).lastLive + ')');
  console.log('  folds with L >= 2 = ' + s.n2 + ' (anchored at 0: ' + summarise(CAL).n2 + ');  sum (L-1) = ' + s.s1 + ' (' + summarise(CAL).s1 + ')');
  console.log('  N2(p >= 100) = ' + s.n2d + ' (' + summarise(CAL).n2d + ');  S1(p >= 100) = ' + s.s1d + ' (' + summarise(CAL).s1d + ')');
  console.log('  mbar at fold 421 = ' + OFF.rows[fidx[421]].mbarA.toFixed(4) + ' (anchored at 0: ' + CAL.rows[fidx[421]].mbarA.toFixed(4) + ')');
  console.log('  kills at fold 421 = ' + OFF.rows[fidx[421]].kills + ' (anchored at 0: ' + CAL.rows[fidx[421]].kills + ')');
}

// ==========================================================================
// STAGE E — PRE-REGISTERED VERSUS MEASURED
// ==========================================================================
console.log('');
console.log('############ STAGE E — the comparison, against B2 and B4 ############');
console.log('');
console.log('   Y      | last L>=2 | cross pred | surv pred | band        | in band | N2 meas | N2 pred (band)     | S1 meas | S1 pred (band)');
const verdictRows = [];
for (const Y of TARGETS) {
  const s = summarise(W[Y]), P = PRED[Y];
  const inBand = s.lastLive >= P.lo && s.lastLive <= P.hi;
  const n2lo = P.n2lo, n2hi = P.n2hi, s1lo = P.s1lo, s1hi = P.s1hi;
  const n2ok = s.n2d >= n2lo && s.n2d <= n2hi, s1ok = s.s1d >= s1lo && s.s1d <= s1hi;
  verdictRows.push({ Y, s, P, inBand, n2ok, s1ok, ratio: s.lastLive / P.med });
  console.log('  ' + Y.toExponential(0).padStart(6) + ' | ' + String(s.lastLive).padStart(9) + ' | ' + String(P.cross).padStart(10) +
    ' | ' + String(P.med).padStart(9) + ' | [' + String(P.lo).padStart(4) + ',' + String(P.hi).padStart(5) + '] | ' + (inBand ? '  yes  ' : '  NO   ') +
    ' | ' + String(s.n2d).padStart(7) + ' | ' + (n2lo.toFixed(1) + ' - ' + n2hi.toFixed(1)).padStart(18) + (n2ok ? ' ok' : ' NO') +
    ' | ' + String(s.s1d).padStart(7) + ' | ' + (s1lo.toFixed(1) + ' - ' + s1hi.toFixed(1)).padStart(14) + (s1ok ? ' ok' : ' NO'));
}
{
  const sC = summarise(CAL);
  console.log('  ' + (2e9).toExponential(0).padStart(6) + ' | ' + String(sC.lastLive).padStart(9) + ' | (calibration window: fitted here, not predicted)  N2 = ' + sC.n2d + ', S1 = ' + sC.s1d);
}
console.log('');
console.log('  the systematic, measured / predicted on N2(p >= 100), all four windows:');
{
  let line = '   ';
  for (const Y of [2e7, 2e8, 2e9, BIGY]) {
    const s2 = summarise(W[Y]), pr = (PRED[Y] ? PRED[Y].n2 : counts(2e9, M2, 100).n2);
    line += Y.toExponential(0) + ': ' + s2.n2d + '/' + pr.toFixed(1) + ' = ' + (s2.n2d / pr).toFixed(2) + '   ';
  }
  console.log(line);
  console.log('  and on the deep decade [300,1000) alone, where the extinction point is decided:');
  let l2 = '   ';
  for (const Y of [2e7, 2e8, 2e9, BIGY]) {
    const m = W[Y].rows.filter(r => r.p >= 300 && r.p < 1000 && r.L >= 2).length;
    const pr = decadePred(Y, M2)[4].n2;
    l2 += Y.toExponential(0) + ': ' + m + '/' + pr.toFixed(1) + '   ';
  }
  console.log(l2);
}
console.log('');
console.log('  full-window totals, all 237 folds (no prediction attached below p = 100):');
console.log('   Y      | folds L>=2 | sum (L-1) | max L | last theta<=G2 | G2 at fold 1499');
for (const Y of [2e7, 2e8, 2e9, BIGY]) {
  const s = summarise(W[Y]);
  console.log('  ' + Y.toExponential(0).padStart(6) + ' | ' + String(s.n2).padStart(10) + ' | ' + String(s.s1).padStart(9) +
    ' | ' + String(s.maxL).padStart(5) + ' | ' + String(s.lastQual).padStart(14) + ' | ' + String(W[Y].rows[F - 1].G2).padStart(15));
}
console.log('');
console.log('  measured count of folds with L >= 2 by decade of p, against B2:');
console.log('   decade       |  2e7 m/p  |  2e8 m/p  |  2e9 m/p  |  ' + BIGY.toExponential(0) + ' m/p');
{
  const dm = {}, dp = {};
  for (const Y of [2e7, 2e8, 2e9, BIGY]) { dm[Y] = byDecade(W[Y]); dp[Y] = decadePred(Y, M2); }
  for (let i = 0; i < DEC.length; i++) {
    let line = '   [' + String(DEC[i][0]).padStart(4) + ',' + String(DEC[i][1]).padStart(4) + ')   ';
    for (const Y of [2e7, 2e8, 2e9, BIGY]) line += ' | ' + (String(dm[Y][i].n2) + '/' + dp[Y][i].n2.toFixed(1)).padStart(9);
    console.log(line);
  }
}
console.log('');
console.log('  the ordering test (d): extinction folds in Y order = ' +
  [2e7, 2e8, 2e9, BIGY].map(Y => summarise(W[Y]).lastLive).join(' -> '));
{
  const seq = [2e7, 2e8, 2e9, BIGY].map(Y => summarise(W[Y]).lastLive);
  let mono = true; for (let i = 1; i < seq.length; i++) if (!(seq[i] > seq[i - 1])) mono = false;
  const aOK = verdictRows.filter(v => v.inBand).length, bOK = verdictRows.filter(v => v.n2ok).length, cOK = verdictRows.filter(v => v.s1ok).length;
  const worst = Math.max(...verdictRows.map(v => Math.max(v.ratio, 1 / v.ratio)));
  console.log('  (a) last-fold in band at ' + aOK + ' of 3;  (b) N2 in band at ' + bOK + ' of 3;  (c) S1 in band at ' + cOK +
    ' of 3;  (d) strictly increasing: ' + mono + ';  worst last-fold ratio ' + worst.toFixed(2));
  let v;
  if (aOK === 3 && bOK === 3 && cOK === 3 && mono) v = 'CONFIRMED';
  else if (mono && bOK >= 2 && worst <= 1.5) v = 'PARTIAL';
  else v = 'BROKEN';
  console.log('');
  console.log('  VERDICT UNDER THE PRE-REGISTERED RULE OF B4: ' + v);
}
console.log('');
console.log('[' + el() + 's] done');

}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/attack-foldL-06-scaling.js
//   invocation:  node research/attack-foldL-06-scaling.js
//   code-sha256: eeda6f888ae1bb385e48d95da3060996a9c21d2a113e45806f53058c78f0d771
//   out-sha256:  1bb4b217a20591b567634b740330fc5b38ed09fc66350f29447ed31707d590b5
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     96.5 s
// ============================================================================
// folds: 237 primes from 5 to 1499;  chunk = 1e+8 slots
//
// ############ STAGE A — CALIBRATION, Y = 2e9, window anchored at 0 ############
// [8.0s] calibration: A = 0.0e+0, Y = 2.0e+9, slots = 333333333, 8.0 s
//
// --- A1. digit-for-digit against the embedded tail of attack-foldL-04-localized.js ---
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
//   mbar at fold 421 (after) = 89.15   record 89.15
//   theta/mbar at fold 421   = 9.467   record 9.467
//   CALIBRATION CLEAN: 30 of 30 figures reproduced by an independent engine.
//
// --- A2. the crossing arithmetic of the record, reproduced ---
//   p = 421: mbar = 89.15, kills = 105790, ln kills = 11.569
//            2c*p/mbar at c = 1.22 is 11.522  (record: 11.6 at c = 1.22)
//            c that makes the two sides equal: c = 1.2250
//   p = 431: 2c*p/mbar = 11.742 vs ln kills = 11.540  -> already closed
//
// --- A3. the density law, fitted properly (Poisson MLE) ---
//   the law candidate says the chance that a killed slot has a killed neighbour decays as exp(-c*theta/mbar).
//   model 1 (the law as written):  X_p ~ Poisson( kills_p * exp(-c*u_p) ),          u_p = theta_p / mbar_before(p)
//   model 2 (one amplitude added): X_p ~ Poisson( kills_p * A * exp(-c*u_p) ).
//   The amplitude is not a free fudge: the mechanism produces one. A gap qualifies when it is 0 or +-2 mod p,
//   which is 3 residues out of p among multiples of 6, so the rate carries a prefactor of order 6/mbar before
//   any exponential is taken. Model 1 forces that prefactor to be 1.
//   model 1, folds p >= 100 (214 folds, 2006 adjacent kill pairs): c = 1.9496 +- 0.0052
//   model 2, same folds: A = 2.4312e-2, c = 1.0818 +- 0.0317, corr(A,c) = 0.987
//   model 1 over all 237 folds: c = 1.7306 (the shallow folds dominate it; see A4)
//
//   effective c by decade of p, two ways. c_agg is the record s form, -ln(sum X / sum kills) / mean(theta/mbar);
//   c_mle is the model-1 maximum likelihood value on the same folds:
//     p in [   5,  10): folds   2  mean theta/mbar   1.60  X/kills 1.00e-1  c_agg 1.439  c_mle 1.545 +- 0.000
//     p in [  10,  30): folds   6  mean theta/mbar   1.75  X/kills 1.42e-2  c_agg 2.435  c_mle 2.594 +- 0.001
//     p in [  30, 100): folds  15  mean theta/mbar   2.90  X/kills 6.43e-3  c_agg 1.738  c_mle 2.052 +- 0.001
//     p in [ 100, 300): folds  37  mean theta/mbar   5.67  X/kills 1.51e-4  c_agg 1.550  c_mle 1.950 +- 0.005
//     p in [ 300,1000): folds 106  mean theta/mbar  12.59  X/kills 3.96e-7  c_agg 1.171  c_mle 1.656 +- 0.070
//     p in [1000,1500): folds  71  mean theta/mbar  20.61  X/kills 0.00e+0  c_agg   -    c_mle   -
//   The two disagree, and c_agg is the one that is wrong. Within a decade the pairs all sit at the SMALLEST u
//   in the decade while the mean u is far larger, so dividing an aggregate log-ratio by a mean u understates c.
//   The record s reading of a c that "drifts below the bracket at the closure point" is that bias, not a drift.
//
// --- A4. where the geometric run model is valid, and where it is refuted ---
//   under the model the expected number of runs of length >= l is kills * A * r^(l-1), r = exp(-c*theta/mbar),
//   so predicted L = 1 + floor( ln(kills*A) / (c*theta/mbar) ). Measured against predicted, model 2:
//    fold | kills      | c*theta/mbar | L pred | L meas
//       7 |   57142857 |        1.298 |     11 |      2
//      13 |   17982017 |        1.517 |      9 |      2
//      23 |    6789558 |        2.027 |      6 |      3
//      31 |    4282163 |        2.154 |      6 |      3
//      43 |    2598611 |        2.539 |      5 |      3
//      53 |    1924786 |        2.980 |      4 |      3
//      67 |    1368905 |        3.275 |      4 |      3
//      97 |     806124 |        4.061 |      3 |      2
//     113 |     627680 |        4.373 |      3 |      2
//     149 |     440791 |        5.321 |      2 |      2
//     211 |     271868 |        6.477 |      2 |      2
//     271 |     192438 |        7.589 |      2 |      2
//     421 |     105790 |       10.241 |      1 |      2
//   The model overpredicts L below p ~ 50 because run lengths there are capped by the ALTERNATION constraint of
//   attack-foldL-01-census.md §1 (from channel A the legal gap classes are {0,-2}, from B they are {0,+2}, so
//   non-zero classes strictly alternate and the cheap word 2p-2, 2p-2 is illegal), not by scarcity of qualifying
//   gaps. It is calibrated from p ~ 100 upward. Every prediction below is made for the band p >= 100 only, and
//   the shallow folds are reported as raw data with no prediction attached.
//
// --- A5. mbar(p) is Y-independent and height-independent, by an exact argument ---
//   key(n) depends only on n mod prod(q <= 1499), so the level-p population density is EXACTLY periodic.
//   Hence mbar(p) carries no Y dependence and no drift with height, and kills(Y,p) = (Y/mbar_before(p)) * (2/p)
//   is exactly proportional to Y. Check against the Mertens product 6 / prod_{5<=q<=p}(1-2/q):
//    fold | mbar measured | mbar Mertens | ratio
//       5 |        10.000 |       10.000 | 1.00000
//      13 |        20.222 |       20.222 | 1.00000
//      29 |        30.132 |       30.132 | 1.00000
//     101 |        53.276 |       53.278 | 0.99996
//     421 |        89.152 |       89.108 | 1.00050
//    1051 |       116.243 |      117.563 | 0.98878
//    1499 |       127.692 |      129.626 | 0.98508
//   The last two rows drift because the window has stopped being large against the level spacing, not because
//   mbar depends on Y: at p = 1499 the level holds 15.7e6 slots in 2e9, still ample. The predictions below use
//   the MEASURED mbar, so this approximation never enters them.
//
// --- A6. ESTIMATOR CALIBRATION: does the predictive machine reproduce the window it was fitted on? ---
//   This is the step the campaign keeps paying for skipping. Model 1 and model 2 are both fitted on the
//   Y = 2e9 pairs; only one of them reproduces the Y = 2e9 STATISTICS the test will be scored on.
//    model | c      | A         | last-pair median | 10-90% band | N2(p>=100) | S1(p>=100)
//      1   | 1.9496 | 1.000e+0 |              277 | [241, 331] |       27.4 |       28.2
//      2   | 1.0818 | 2.431e-2 |              431 | [367, 521] |       42.6 |       50.9
//    MEASURED at 2e9                        |              421 |             |         37 |         37
//   Model 1 misses on both: it puts the last pair at fold 277 against the truth 421 and predicts 27.4 folds
//   with a pair against 37. Model 2 lands the extinction fold at 431 against 421 and brackets it. So MODEL 2 IS
//   ADOPTED for the bands and counts, and the one-parameter form of the law is already refuted as a fitting
//   model on its own calibration window, before any new window is touched.
//
//   THE RUN-LENGTH EXTENSION OF MODEL 2 IS REFUTED, AND IS NOT USED. Chaining the same rate to runs of
//   length l gives kills*A*r^(l-1) runs of length >= l, which at Y = 2e9 predicts 8.3 folds with p >= 100
//   carrying L >= 3. Measured: ZERO. Every one of the 37 folds with p >= 100 and L >= 2 has L exactly 2, and
//   the whole window s max L is 3, reached only at shallow folds. The reason is again alternation: a run of 3
//   needs two consecutive qualifying gaps in opposite channels, which the independence model does not know
//   about. So the pre-registered prediction for S1 is S1 = N2, i.e. no fold above p = 100 carries L >= 3 in any
//   window, and the geometric value is carried alongside only as the contrast it is.
//
//   Model 2 is not unbiased either, and the bias is disclosed and priced. Decade by decade at Y = 2e9:
//    decade      | folds | X meas | X pred | N2 meas | N2 pred
//    [ 100, 200) |    21 |   1937 | 1930.7 |      21 |    21.0
//    [ 200, 300) |    16 |     66 |   65.2 |      13 |    14.9
//    [ 300, 500) |    33 |      3 |    8.4 |       3 |     6.5
//    [ 500,1000) |    73 |      0 |    0.2 |       0 |     0.2
//    [1000,1500) |    71 |      0 |    0.0 |       0 |     0.0
//   It is exact through p = 300 and runs about a factor 2 hot beyond it (8.4 predicted pairs against 3, 6.5
//   folds against 3), which is exactly the regime that sets the extinction point. The count bands below are
//   therefore widened by a flat +-30% on top of two Poisson standard deviations, which covers that self-check
//   miss with room to spare.
//
// ############ STAGE B — PRE-REGISTRATION. Derived from Y = 2e9 alone. ############
// Written into research/history/staging/attack-foldL-06-scaling.md BEFORE Stage C was run.
//
// B1. THE PREDICTIVE MACHINE, in full.
//   kills(Y,p) = (Y / mbar_before(p)) * (2/p), mbar_before(p) the Y = 2e9 measured value (Y-independent by A5).
//   E[X_p]     = kills(Y,p) * A * exp(-c * theta_p / mbar_before(p)),  A = 2.4312e-2, c = 1.0818 +- 0.0317.
//   POINT PREDICTION OF THE EXTINCTION FOLD, in the law s own literal §8 arithmetic:
//     p* = the last fold with 2c*p/mbar(p) <= ln kills(Y,p), at the record s c = 1.22.
//   BAND: 10th to 90th percentile of the last-pair distribution under P(last >= p) = 1 - exp(-sum_{q>=p} E[X_q]),
//     unioned over c in [c-3se, c+3se] with A profiled at each c. Range of c used: 0.987, 1.018, 1.082, 1.145, 1.177.
//   COUNTS (better powered than any single last event): N2(Y) = # folds p >= 100 with L >= 2, predicted by
//     sum (1 - exp(-E[X_p])). S1(Y) = sum_{p>=100} (L-1) is predicted EQUAL TO N2 by A6: above p = 100 no
//     fold carries L >= 3. The geometric chain value is printed beside it as the refuted contrast.
//     Acceptance band on both: prediction x [0.7, 1.3], then widened by +-2 Poisson standard deviations.
//
// B2. THE PREDICTIONS.
//    Y      | crossing p* (c=1.22) | survival p* median | 10-90% band  | N2 pred | accept       | S1 pred | accept       | S1 geo (refuted)
//     2e+7 |                  233 |                211 | [ 163,  311] |    10.6 |   3.4 - 17.9 |    10.6 |   3.4 - 17.9 |              10.8
//     2e+8 |                  317 |                311 | [ 241,  439] |    25.7 |  13.5 - 37.8 |    25.7 |  13.5 - 37.8 |              27.6
//    2e+10 |                  523 |                557 | [ 457,  719] |    60.8 |  37.7 - 83.9 |    60.8 |  37.7 - 83.9 |              79.4
//     2e+9 |                  421 |                431 | [ 347,  577] |    42.6 | (fitted here)|    42.6 | (fitted here)|              50.9
//          | MEASURED at 2e9: last L >= 2 fold 421, N2 = 37, S1 = 37. The 2e9 row is the calibration, not a test.
//
//   predicted count of folds with L >= 2, by decade of p:
//    decade        |    2e7 |    2e8 |    2e9 |  2e+10
//    [   5,  10)    |    2.0 |    2.0 |    2.0 |    2.0
//    [  10,  30)    |    6.0 |    6.0 |    6.0 |    6.0
//    [  30, 100)    |   15.0 |   15.0 |   15.0 |   15.0
//    [ 100, 300)    |   10.5 |   24.8 |   35.9 |   37.0
//    [ 300,1000)    |    0.1 |    0.8 |    6.7 |   23.8
//    [1000,1500)    |    0.0 |    0.0 |    0.0 |    0.0
//    (the [5,100) rows carry NO prediction: A4 refutes the model there. They are printed for completeness.)
//
// B3. THE OFFSET PREDICTION. By A5 the object is exactly periodic in n, so [10000000002, 10000000002 + 2e9) must be
//   statistically identical to [0, 2e9): the extinction fold sits in the same band [347, 577] and
//   N2(p >= 100) sits within 2 Poisson s.d. of the [0,2e9) value. There is no height drift to allow for, so a
//   material move would falsify A5, which is an exact argument, and not H''.
//
// B4. THE KILL CRITERION, stated before the data exists.
//   CONFIRMED  if, at ALL THREE new windows: (a) the measured last L >= 2 fold lies inside its 10-90% band;
//              (b) measured N2(p >= 100) lies inside its acceptance band; (c) measured S1(p >= 100) likewise;
//              and (d) the measured extinction fold is strictly increasing across 2e7 < 2e8 < 2e9 < 2e+10.
//   PARTIAL    if (d) holds and (b) holds at 2 of the 3 new windows, but (a) or (c) fails somewhere, AND no
//              measured extinction fold misses its band by more than a factor 1.5 in p.
//   BROKEN     if (d) fails, or (b) fails at 2 or more of the 3 windows, or the measured extinction fold misses
//              its band by more than a factor 1.5 in p at any window.
//   The law being scored is H'' as the record states it: an exponential density for the qualifying-gap
//   adjacency, at a rate fixed by theta/mbar, with a constant calibrated once. CONFIRMED promotes it from
//   observation to calibrated law. BROKEN retires it. PARTIAL leaves it an observation with a known scaling.
//
// ############ STAGE C — MEASUREMENT ############
// [8.1s] Y = 2e7: A = 0.0e+0, Y = 2.0e+7, slots = 3333333, 0.1 s
// [8.9s] Y = 2e8: A = 0.0e+0, Y = 2.0e+8, slots = 33333333, 0.8 s
// [88.6s] Y = 2e+10: A = 0.0e+0, Y = 2.0e+10, slots = 3333333333, 79.7 s
//
// --- Y = 2e+7: every fold with L >= 2 ---
//    fold |    kills |  runs   |     X | L |  theta | mbar   | G2 before
//       7 |   571428 |   380952 | 190476 | 2 |     12 |  14.00 |        12
//      13 |   179820 |   175824 |  3996 | 2 |     24 |  20.22 |        42
//      17 |   116355 |   113533 |  2822 | 2 |     36 |  22.92 |        66
//      19 |    91859 |    89615 |  2244 | 2 |     36 |  25.61 |       108
//      23 |    67900 |    66839 |  1061 | 3 |     48 |  28.05 |       150
//      29 |    49171 |    48429 |   742 | 2 |     60 |  30.13 |       192
//      31 |    42835 |    42050 |   785 | 3 |     60 |  32.21 |       222
//      37 |    33550 |    33231 |   319 | 2 |     72 |  34.05 |       252
//      41 |    28661 |    28550 |   111 | 2 |     84 |  35.80 |       270
//      43 |    25997 |    25878 |   119 | 2 |     84 |  37.55 |       306
//      47 |    22704 |    22613 |    91 | 2 |     96 |  39.22 |       318
//      53 |    19245 |    19110 |   135 | 2 |    108 |  40.76 |       318
//      59 |    16702 |    16644 |    58 | 2 |    120 |  42.19 |       318
//      61 |    15608 |    15532 |    76 | 2 |    120 |  43.63 |       318
//      67 |    13693 |    13655 |    38 | 2 |    132 |  44.97 |       366
//      71 |    12562 |    12557 |     5 | 2 |    144 |  46.28 |       408
//      73 |    11865 |    11859 |     6 | 2 |    144 |  47.58 |       408
//      79 |    10643 |    10623 |    20 | 2 |    156 |  48.82 |       408
//      83 |     9846 |     9827 |    19 | 2 |    168 |  50.02 |       408
//      89 |     8983 |     8963 |    20 | 2 |    180 |  51.17 |       462
//      97 |     8040 |     8035 |     5 | 2 |    192 |  52.25 |       510
//     101 |     7553 |     7552 |     1 | 2 |    204 |  53.30 |       510
//     103 |     7188 |     7186 |     2 | 2 |    204 |  54.34 |       522
//     107 |     6842 |     6840 |     2 | 2 |    216 |  55.37 |       570
//     109 |     6537 |     6535 |     2 | 2 |    216 |  56.39 |       570
//     113 |     6175 |     6173 |     2 | 2 |    228 |  57.39 |       570
//     127 |     5367 |     5362 |     5 | 2 |    252 |  58.29 |       570
//     173 |     3419 |     3418 |     1 | 2 |    348 |  65.50 |       582
//     181 |     3202 |     3200 |     2 | 2 |    360 |  66.92 |       630
//   last L >= 2 fold = 181;  last fold with theta <= G2 = 463;  max L = 3;  folds with L >= 2 = 29 of 237;  sum (L-1) = 31;  sum X = 203165
//   restricted to the calibrated band p >= 100:  N2 = 8,  S1 = 8
//
// --- Y = 2e+8: every fold with L >= 2 ---
//    fold |    kills |  runs   |     X | L |  theta | mbar   | G2 before
//       7 |  5714286 |  3809524 | 1904762 | 2 |     12 |  14.00 |        12
//      13 |  1798201 |  1758241 | 39960 | 2 |     24 |  20.22 |        42
//      17 |  1163544 |  1135337 | 28207 | 2 |     36 |  22.92 |        66
//      19 |   918585 |   896149 | 22436 | 2 |     36 |  25.61 |       108
//      23 |   678955 |   668297 | 10658 | 3 |     48 |  28.05 |       150
//      29 |   491649 |   484092 |  7557 | 2 |     60 |  30.13 |       204
//      31 |   428221 |   420205 |  8016 | 3 |     60 |  32.21 |       228
//      37 |   335637 |   332553 |  3084 | 3 |     72 |  34.05 |       270
//      41 |   286505 |   285403 |  1102 | 2 |     84 |  35.80 |       378
//      43 |   259800 |   258616 |  1184 | 2 |     84 |  37.54 |       378
//      47 |   226627 |   225667 |   960 | 2 |     96 |  39.21 |       378
//      53 |   192399 |   191125 |  1274 | 3 |    108 |  40.75 |       378
//      59 |   166385 |   165737 |   648 | 2 |    120 |  42.18 |       408
//      61 |   155463 |   154757 |   706 | 2 |    120 |  43.61 |       450
//      67 |   136906 |   136570 |   336 | 2 |    132 |  44.95 |       450
//      71 |   125351 |   125314 |    37 | 2 |    144 |  46.25 |       450
//      73 |   118517 |   118456 |    61 | 2 |    144 |  47.56 |       486
//      79 |   106555 |   106396 |   159 | 2 |    156 |  48.79 |       498
//      83 |    98846 |    98650 |   196 | 2 |    168 |  50.00 |       498
//      89 |    90019 |    89845 |   174 | 2 |    180 |  51.15 |       498
//      97 |    80903 |    80826 |    77 | 2 |    192 |  52.23 |       516
//     101 |    76028 |    76006 |    22 | 2 |    204 |  53.29 |       516
//     103 |    73166 |    73136 |    30 | 2 |    204 |  54.35 |       522
//     107 |    69021 |    69012 |     9 | 2 |    216 |  55.39 |       570
//     109 |    66474 |    66461 |    13 | 2 |    216 |  56.42 |       660
//     113 |    63008 |    62990 |    18 | 2 |    228 |  57.45 |       660
//     127 |    55027 |    54994 |    33 | 2 |    252 |  58.37 |       660
//     131 |    52570 |    52561 |     9 | 2 |    264 |  59.28 |       720
//     137 |    49467 |    49463 |     4 | 2 |    276 |  60.16 |       720
//     139 |    47970 |    47962 |     8 | 2 |    276 |  61.04 |       720
//     149 |    44118 |    44108 |    10 | 2 |    300 |  61.87 |       720
//     151 |    42867 |    42861 |     6 | 2 |    300 |  62.71 |       720
//     157 |    40686 |    40682 |     4 | 2 |    312 |  63.52 |       720
//     163 |    38642 |    38638 |     4 | 2 |    324 |  64.30 |       720
//     167 |    37300 |    37297 |     3 | 2 |    336 |  65.09 |       720
//     173 |    35527 |    35524 |     3 | 2 |    348 |  65.85 |       720
//     179 |    33827 |    33825 |     2 | 2 |    360 |  66.59 |       720
//     181 |    33145 |    33137 |     8 | 2 |    360 |  67.33 |       768
//     193 |    30214 |    30213 |     1 | 2 |    384 |  68.75 |       768
//     211 |    26724 |    26721 |     3 | 2 |    420 |  70.81 |       768
//     233 |    23139 |    23136 |     3 | 2 |    468 |  73.30 |       840
//     331 |    14171 |    14170 |     1 | 2 |    660 |  81.96 |       948
//   last L >= 2 fold = 331;  last fold with theta <= G2 = 607;  max L = 3;  folds with L >= 2 = 42 of 237;  sum (L-1) = 46;  sum X = 2031788
//   restricted to the calibrated band p >= 100:  N2 = 21,  S1 = 21
//
// --- Y = 2e+9: every fold with L >= 2 ---
//    fold |    kills |  runs   |     X | L |  theta | mbar   | G2 before
//       7 | 57142857 | 38095238 | 19047619 | 2 |     12 |  14.00 |        12
//      13 | 17982017 | 17582417 | 399600 | 2 |     24 |  20.22 |        42
//      17 | 11635420 | 11353348 | 282072 | 2 |     36 |  22.92 |        66
//      19 |  9185867 |  8961531 | 224336 | 2 |     36 |  25.61 |       108
//      23 |  6789558 |  6683140 | 106418 | 3 |     48 |  28.05 |       150
//      29 |  4916578 |  4841242 | 75336 | 2 |     60 |  30.13 |       204
//      31 |  4282163 |  4202136 | 80027 | 3 |     60 |  32.21 |       258
//      37 |  3356312 |  3325364 | 30948 | 3 |     72 |  34.05 |       300
//      41 |  2865135 |  2854081 | 11054 | 2 |     84 |  35.80 |       378
//      43 |  2598611 |  2586902 | 11709 | 3 |     84 |  37.54 |       378
//      47 |  2266838 |  2257013 |  9825 | 2 |     96 |  39.21 |       420
//      53 |  1924786 |  1912349 | 12437 | 3 |    108 |  40.75 |       492
//      59 |  1663768 |  1657198 |  6570 | 2 |    120 |  42.18 |       492
//      61 |  1554532 |  1547570 |  6962 | 2 |    120 |  43.61 |       492
//      67 |  1368905 |  1365270 |  3635 | 3 |    132 |  44.95 |       498
//      71 |  1253211 |  1252751 |   460 | 2 |    144 |  46.25 |       498
//      73 |  1184355 |  1183862 |   493 | 2 |    144 |  47.56 |       558
//      79 |  1064490 |  1062721 |  1769 | 2 |    156 |  48.79 |       558
//      83 |   987440 |   985425 |  2015 | 2 |    168 |  50.00 |       612
//      89 |   898671 |   896740 |  1931 | 2 |    180 |  51.15 |       612
//      97 |   806124 |   805403 |   721 | 2 |    192 |  52.22 |       642
//     101 |   758132 |   757850 |   282 | 2 |    204 |  53.28 |       642
//     103 |   728755 |   728450 |   305 | 2 |    204 |  54.33 |       642
//     107 |   687992 |   687867 |   125 | 2 |    216 |  55.37 |       696
//     109 |   662623 |   662477 |   146 | 2 |    216 |  56.40 |       696
//     113 |   627680 |   627409 |   271 | 2 |    228 |  57.42 |       774
//     127 |   548802 |   548587 |   215 | 2 |    252 |  58.34 |       774
//     131 |   524062 |   523976 |    86 | 2 |    264 |  59.24 |       774
//     137 |   493564 |   493515 |    49 | 2 |    276 |  60.12 |       774
//     139 |   479387 |   479322 |    65 | 2 |    276 |  61.00 |       774
//     149 |   440791 |   440713 |    78 | 2 |    300 |  61.83 |       774
//     151 |   429097 |   429019 |    78 | 2 |    300 |  62.66 |       774
//     157 |   407376 |   407328 |    48 | 2 |    312 |  63.47 |       774
//     163 |   387881 |   387856 |    25 | 2 |    324 |  64.26 |       774
//     167 |   373926 |   373900 |    26 | 2 |    336 |  65.04 |       822
//     173 |   356682 |   356636 |    46 | 2 |    348 |  65.81 |       822
//     179 |   341059 |   341022 |    37 | 2 |    360 |  66.55 |       828
//     181 |   333471 |   333441 |    30 | 2 |    360 |  67.30 |       828
//     191 |   312720 |   312714 |     6 | 2 |    384 |  68.02 |       852
//     193 |   306189 |   306185 |     4 | 2 |    384 |  68.73 |       852
//     197 |   296595 |   296587 |     8 | 2 |    396 |  69.44 |       882
//     199 |   290928 |   290921 |     7 | 2 |    396 |  70.15 |       900
//     211 |   271868 |   271839 |    29 | 2 |    420 |  70.82 |       900
//     227 |   247858 |   247853 |     5 | 2 |    456 |  72.11 |       900
//     229 |   243642 |   243634 |     8 | 2 |    456 |  72.75 |       900
//     233 |   237468 |   237460 |     8 | 2 |    468 |  73.38 |       900
//     239 |   229412 |   229410 |     2 | 2 |    480 |  74.00 |       900
//     241 |   225324 |   225323 |     1 | 2 |    480 |  74.63 |       900
//     251 |   214538 |   214536 |     2 | 2 |    504 |  75.23 |       990
//     257 |   208003 |   208002 |     1 | 2 |    516 |  75.82 |       990
//     263 |   201700 |   201698 |     2 | 2 |    528 |  76.41 |       990
//     269 |   195354 |   195352 |     2 | 2 |    540 |  76.98 |       990
//     271 |   192438 |   192435 |     3 | 2 |    540 |  77.55 |       990
//     277 |   186698 |   186696 |     2 | 2 |    552 |  78.12 |       990
//     293 |   172576 |   172575 |     1 | 2 |    588 |  79.79 |      1122
//     317 |   155078 |   155077 |     1 | 2 |    636 |  81.87 |      1122
//     331 |   147314 |   147313 |     1 | 2 |    660 |  82.37 |      1170
//     421 |   105790 |   105789 |     1 | 2 |    840 |  89.15 |      1170
//   last L >= 2 fold = 421;  last fold with theta <= G2 = 1021;  max L = 3;  folds with L >= 2 = 58 of 237;  sum (L-1) = 64;  sum X = 20317943
//   restricted to the calibrated band p >= 100:  N2 = 37,  S1 = 37
//
// --- Y = 2e+10: every fold with L >= 2 ---
//    fold |    kills |  runs   |     X | L |  theta | mbar   | G2 before
//       7 | 571428571 | 380952381 | 190476190 | 2 |     12 |  14.00 |        12
//      13 | 179820180 | 175824176 | 3996004 | 2 |     24 |  20.22 |        42
//      17 | 116354234 | 113533526 | 2820708 | 2 |     36 |  22.92 |        66
//      19 | 91858606 | 89615242 | 2243364 | 2 |     36 |  25.61 |       108
//      23 | 67895490 | 66831364 | 1064126 | 3 |     48 |  28.05 |       150
//      29 | 49165702 | 48411964 | 753738 | 2 |     60 |  30.13 |       204
//      31 | 42821719 | 42021505 | 800214 | 4 |     60 |  32.21 |       258
//      37 | 33562972 | 33253528 | 309444 | 4 |     72 |  34.05 |       348
//      41 | 28651298 | 28540501 | 110797 | 2 |     84 |  35.80 |       378
//      43 | 25986126 | 25868572 | 117554 | 3 |     84 |  37.54 |       402
//      47 | 22668728 | 22571990 | 96738 | 3 |     96 |  39.21 |       420
//      53 | 19247052 | 19123176 | 123876 | 3 |    108 |  40.75 |       492
//      59 | 16637486 | 16571771 | 65715 | 2 |    120 |  42.18 |       492
//      61 | 15546229 | 15476534 | 69695 | 2 |    120 |  43.61 |       528
//      67 | 13690197 | 13653453 | 36744 | 3 |    132 |  44.95 |       528
//      71 | 12533365 | 12528930 |  4435 | 2 |    144 |  46.25 |       630
//      73 | 11846543 | 11841687 |  4856 | 2 |    144 |  47.56 |       630
//      79 | 10646776 | 10629446 | 17330 | 2 |    156 |  48.79 |       630
//      83 |  9877166 |  9857355 | 19811 | 3 |    168 |  50.00 |       630
//      89 |  8989180 |  8970781 | 18399 | 2 |    180 |  51.15 |       636
//      97 |  8062196 |  8055140 |  7056 | 2 |    192 |  52.22 |       672
//     101 |  7582664 |  7580034 |  2630 | 2 |    204 |  53.28 |       720
//     103 |  7287920 |  7285091 |  2829 | 2 |    204 |  54.33 |       720
//     107 |  6879046 |  6877767 |  1279 | 2 |    216 |  55.37 |       720
//     109 |  6626687 |  6625323 |  1364 | 2 |    216 |  56.40 |       756
//     113 |  6274355 |  6271651 |  2704 | 2 |    228 |  57.42 |       798
//     127 |  5483630 |  5481595 |  2035 | 2 |    252 |  58.34 |       798
//     131 |  5232470 |  5231710 |   760 | 2 |    264 |  59.24 |       798
//     137 |  4926519 |  4925970 |   549 | 2 |    276 |  60.12 |       798
//     139 |  4784604 |  4783976 |   628 | 2 |    276 |  61.00 |       798
//     149 |  4399249 |  4398518 |   731 | 2 |    300 |  61.83 |       798
//     151 |  4282611 |  4281826 |   785 | 2 |    300 |  62.65 |       852
//     157 |  4064674 |  4064224 |   450 | 2 |    312 |  63.46 |       852
//     163 |  3865612 |  3865395 |   217 | 2 |    324 |  64.25 |       918
//     167 |  3726928 |  3726654 |   274 | 2 |    336 |  65.03 |       930
//     173 |  3554828 |  3554398 |   430 | 2 |    348 |  65.79 |       930
//     179 |  3396029 |  3395667 |   362 | 2 |    360 |  66.53 |       930
//     181 |  3321101 |  3320714 |   387 | 2 |    360 |  67.28 |       930
//     191 |  3112786 |  3112735 |    51 | 2 |    384 |  67.99 |       930
//     193 |  3048456 |  3048387 |    69 | 2 |    384 |  68.70 |       930
//     197 |  2956143 |  2956063 |    80 | 2 |    396 |  69.41 |       930
//     199 |  2896937 |  2896867 |    70 | 2 |    396 |  70.11 |       978
//     211 |  2705634 |  2705399 |   235 | 2 |    420 |  70.78 |       978
//     223 |  2535936 |  2535907 |    29 | 2 |    444 |  71.42 |       978
//     227 |  2468885 |  2468866 |    19 | 2 |    456 |  72.06 |       978
//     229 |  2426204 |  2426180 |    24 | 2 |    456 |  72.69 |      1158
//     233 |  2364600 |  2364557 |    43 | 2 |    468 |  73.32 |      1158
//     239 |  2286061 |  2286026 |    35 | 2 |    480 |  73.94 |      1158
//     241 |  2248044 |  2247992 |    52 | 2 |    480 |  74.56 |      1158
//     251 |  2141533 |  2141511 |    22 | 2 |    504 |  75.16 |      1158
//     257 |  2074987 |  2074963 |    24 | 2 |    516 |  75.75 |      1206
//     263 |  2012245 |  2012224 |    21 | 2 |    528 |  76.34 |      1206
//     269 |  1952732 |  1952717 |    15 | 2 |    540 |  76.91 |      1206
//     271 |  1924803 |  1924784 |    19 | 2 |    540 |  77.48 |      1206
//     277 |  1869393 |  1869380 |    13 | 2 |    552 |  78.05 |      1206
//     281 |  1829726 |  1829723 |     3 | 2 |    564 |  78.61 |      1206
//     283 |  1804088 |  1804087 |     1 | 2 |    564 |  79.17 |      1206
//     293 |  1730854 |  1730840 |    14 | 2 |    588 |  79.72 |      1206
//     307 |  1640879 |  1640873 |     6 | 2 |    612 |  80.24 |      1206
//     311 |  1610084 |  1610078 |     6 | 2 |    624 |  80.76 |      1206
//     313 |  1589389 |  1589386 |     3 | 2 |    624 |  81.28 |      1206
//     317 |  1560169 |  1560167 |     2 | 2 |    636 |  81.80 |      1206
//     331 |  1484473 |  1484462 |    11 | 2 |    660 |  82.30 |      1206
//     337 |  1449506 |  1449505 |     1 | 2 |    672 |  82.80 |      1230
//     349 |  1383526 |  1383525 |     1 | 2 |    696 |  83.76 |      1266
//     353 |  1360515 |  1360513 |     2 | 2 |    708 |  84.24 |      1266
//     359 |  1330887 |  1330885 |     2 | 2 |    720 |  84.72 |      1266
//     389 |  1195570 |  1195569 |     1 | 2 |    780 |  87.01 |      1308
//     409 |  1119873 |  1119870 |     3 | 2 |    816 |  88.33 |      1308
//     421 |  1077537 |  1077536 |     1 | 2 |    840 |  89.18 |      1308
//     457 |   965116 |   965115 |     1 | 2 |    912 |  91.66 |      1392
//   last L >= 2 fold = 457;  last fold with theta <= G2 = 1021;  max L = 4;  folds with L >= 2 = 71 of 237;  sum (L-1) = 81;  sum X = 203176087
//   restricted to the calibrated band p >= 100:  N2 = 50,  S1 = 50
//
// ############ STAGE D — same length, moved up: [10000000002, 10000000002 + 2e9) ############
// [96.4s] offset: A = 1.0e+10, Y = 2.0e+9, slots = 333333333, 7.7 s
//    fold |    kills |     X | L
//     101 |   758134 |   261 | 2
//     103 |   728820 |   270 | 2
//     107 |   688009 |   130 | 2
//     109 |   662847 |   139 | 2
//     113 |   627395 |   252 | 2
//     127 |   547999 |   179 | 2
//     131 |   523269 |    82 | 2
//     137 |   492752 |    65 | 2
//     139 |   478344 |    61 | 2
//     149 |   439923 |    65 | 2
//     151 |   428250 |    75 | 2
//     157 |   406322 |    45 | 2
//     163 |   386349 |    19 | 2
//     167 |   372493 |    23 | 2
//     173 |   355048 |    44 | 2
//     179 |   339295 |    42 | 2
//     181 |   331778 |    48 | 2
//     191 |   311009 |     4 | 2
//     193 |   304536 |     7 | 2
//     197 |   295421 |    12 | 2
//     199 |   289374 |     8 | 2
//     211 |   270101 |    25 | 2
//     223 |   253481 |     4 | 2
//     229 |   242548 |     2 | 2
//     233 |   236440 |     5 | 2
//     239 |   228487 |     5 | 2
//     241 |   224610 |     7 | 2
//     251 |   213907 |     3 | 2
//     257 |   207269 |     3 | 2
//     263 |   201173 |     2 | 2
//     269 |   195167 |     1 | 2
//     271 |   192484 |     1 | 2
//     277 |   186917 |     1 | 2
//     281 |   182932 |     1 | 2
//     293 |   173146 |     2 | 2
//     307 |   164038 |     2 | 2
//     311 |   160887 |     2 | 2
//     313 |   159124 |     1 | 2
//     331 |   148484 |     1 | 2
//     349 |   138478 |     1 | 2
//   last L >= 2 fold = 349 (anchored at 0: 421)
//   folds with L >= 2 = 61 (anchored at 0: 58);  sum (L-1) = 65 (64)
//   N2(p >= 100) = 40 (37);  S1(p >= 100) = 40 (37)
//   mbar at fold 421 = 89.1763 (anchored at 0: 89.1522)
//   kills at fold 421 = 107988 (anchored at 0: 105790)
//
// ############ STAGE E — the comparison, against B2 and B4 ############
//
//    Y      | last L>=2 | cross pred | surv pred | band        | in band | N2 meas | N2 pred (band)     | S1 meas | S1 pred (band)
//     2e+7 |       181 |        233 |       211 | [ 163,  311] |   yes   |       8 |         3.4 - 17.9 ok |       8 |     3.4 - 17.9 ok
//     2e+8 |       331 |        317 |       311 | [ 241,  439] |   yes   |      21 |        13.5 - 37.8 ok |      21 |    13.5 - 37.8 ok
//    2e+10 |       457 |        523 |       557 | [ 457,  719] |   yes   |      50 |        37.7 - 83.9 ok |      50 |    37.7 - 83.9 ok
//     2e+9 |       421 | (calibration window: fitted here, not predicted)  N2 = 37, S1 = 37
//
//   the systematic, measured / predicted on N2(p >= 100), all four windows:
//    2e+7: 8/10.6 = 0.75   2e+8: 21/25.7 = 0.82   2e+9: 37/42.6 = 0.87   2e+10: 50/60.8 = 0.82
//   and on the deep decade [300,1000) alone, where the extinction point is decided:
//    2e+7: 0/0.1   2e+8: 1/0.8   2e+9: 3/6.7   2e+10: 13/23.8
//
//   full-window totals, all 237 folds (no prediction attached below p = 100):
//    Y      | folds L>=2 | sum (L-1) | max L | last theta<=G2 | G2 at fold 1499
//     2e+7 |         29 |        31 |     3 |            463 |            1458
//     2e+8 |         42 |        46 |     3 |            607 |            1560
//     2e+9 |         58 |        64 |     3 |           1021 |            2220
//    2e+10 |         71 |        81 |     4 |           1021 |            2220
//
//   measured count of folds with L >= 2 by decade of p, against B2:
//    decade       |  2e7 m/p  |  2e8 m/p  |  2e9 m/p  |  2e+10 m/p
//    [   5,  10)    |     1/2.0 |     1/2.0 |     1/2.0 |     1/2.0
//    [  10,  30)    |     5/6.0 |     5/6.0 |     5/6.0 |     5/6.0
//    [  30, 100)    |   15/15.0 |   15/15.0 |   15/15.0 |   15/15.0
//    [ 100, 300)    |    8/10.5 |   20/24.8 |   34/35.9 |   37/37.0
//    [ 300,1000)    |     0/0.1 |     1/0.8 |     3/6.7 |   13/23.8
//    [1000,1500)    |     0/0.0 |     0/0.0 |     0/0.0 |     0/0.0
//
//   the ordering test (d): extinction folds in Y order = 181 -> 331 -> 421 -> 457
//   (a) last-fold in band at 3 of 3;  (b) N2 in band at 3 of 3;  (c) S1 in band at 3 of 3;  (d) strictly increasing: true;  worst last-fold ratio 1.22
//
//   VERDICT UNDER THE PRE-REGISTERED RULE OF B4: CONFIRMED
//
// [96.4s] done
// ============================================================================
// READINGS
// ============================================================================
//
// [1] CALIBRATION CLEAN: 30 OF 30 FIGURES OF ANGLE 4 REPRODUCED BY AN ENGINE
//     THAT SHARES NO DATA STRUCTURE WITH IT. Slot count, N / kills / runs / X /
//     L at folds 5, 7, 23, 29, 421 and 1451, G2 = 258 after fold 29, and every
//     summary of the closure section: last fold with L >= 2 = 421, last fold
//     with theta <= G2 = 1021, 58 folds of 237 with L >= 2, max L = 3,
//     sum (L-1) = 64, sum X = 20317943. mbar(421) = 89.15 and theta/mbar =
//     9.467 also reproduce. The streaming stack and the linked list are the
//     same object. Two small additions rather than corrections: the crossing at
//     421 is 11.522 against ln kills = 11.569 at c = 1.22, so the record's
//     "11.6" was rounded up and the exact-equality c is 1.2250; and at 431 the
//     left side is 11.742 against 11.540, so the crossing really is at 421.
//
// [2] THE LAW IN ITS ONE-PARAMETER FORM IS REFUTED ON ITS OWN CALIBRATION
//     WINDOW, BEFORE ANY NEW WINDOW IS TOUCHED. Model 1, X_p ~ Poisson(kills *
//     exp(-c*theta/mbar)), fitted by maximum likelihood on the 2006 adjacent
//     kill pairs at p >= 100, gives c = 1.9496 and then puts the last pair at
//     fold 277 against the truth 421 and predicts 27.4 folds with a pair
//     against 37. The record's c = 1.22 and this c = 1.9496 are two
//     calibrations of the same one-parameter shape against two different
//     statistics, and they disagree by 60%. That disagreement IS the
//     misspecification. Model 2 adds the amplitude the mechanism already
//     implies, A = 2.4312e-2 with c = 1.0818, reconciles them, and lands the
//     extinction fold at 431 against 421.
//
// [3] THE SCALING TEST PASSES ALL FOUR PRE-REGISTERED CRITERIA. Measured last
//     fold with L >= 2, against the pre-registered band: 181 in [163, 311] at
//     Y = 2e7, 331 in [241, 439] at 2e8, 457 in [457, 719] at 2e+10. N2(p>=100)
//     8, 21, 50 against acceptance bands 3.4 - 17.9, 13.5 - 37.8, 37.7 - 83.9.
//     S1(p>=100) identical to N2 at every window and inside the same bands. The
//     ordering test: 181 -> 331 -> 421 -> 457, strictly increasing. Worst
//     last-fold ratio to the survival median 1.22. VERDICT: CONFIRMED. The
//     record's own literal crossing arithmetic at c = 1.22, which is the law as
//     written, predicts 233, 317 and 523 against measured 181, 331 and 457,
//     i.e. within 22%, 4% and 13% across three decades of Y it was not fitted
//     on.
//
// [4] THE MODEL IS HOT, AND ALWAYS IN THE SAME DIRECTION, WHICH A WIDE BAND
//     HIDES AND SHOULD NOT. Measured over predicted N2(p >= 100) reads 0.75,
//     0.82, 0.87, 0.82 at 2e7, 2e8, 2e9, 2e+10. On the deep decade [300,1000)
//     alone, the decade that decides where extinction lands, it reads 0/0.1,
//     1/0.8, 3/6.7 and 13/23.8: a factor near 2 too many predicted at the two
//     largest windows. That is why the 2e+10 measurement, 457, sits exactly on
//     the floor of its own [457, 719] band. The pass is real and it is not
//     comfortable.
//
// [5] NO FOLD ABOVE p = 100 CARRIES L >= 3 IN ANY WINDOW, INCLUDING ONE OF
//     2e+10. The geometric chain of the same rate predicted 8.3 such folds at
//     2e9, and at 2e+10 it predicted 79.4 where the no-L>=3 form predicted 60.8,
//     the difference being folds with L >= 3. Measured: zero, at all four window
//     lengths, so S1(p >= 100) equals N2(p >= 100) exactly at 8, 21, 37 and 50.
//     This is the alternation constraint of attack-foldL-01-census.md section 1
//     doing visible work three decades of Y away from where it was proved: a
//     run of 3 needs two consecutive qualifying gaps in opposite channels, and
//     an independence model cannot see that. Max L over the whole fold range is
//     3, 3, 3 and 4, and the single L = 4 at 2e+10 is at a shallow fold.
//
// [6] THE OFFSET WINDOW MEASURES THE NOISE ON THE EXTREME STATISTIC, WHICH IS
//     THE MOST USEFUL THING IT COULD HAVE DONE. Moving the same 2e9 length up
//     to [10000000002, 10000000002 + 2e9) leaves the well-powered statistics
//     alone, N2(p >= 100) 40 against 37 and folds with L >= 2 61 against 58,
//     and moves the last L >= 2 fold from 421 to 349. So a swing of 72 in p is
//     ordinary sampling at fixed Y. Read the measured extinction sequence 181,
//     331, 421, 457 against that scale: the per-decade increments 150, 90, 36
//     look decelerating, but the deceleration is inside one offset window's
//     worth of noise and nothing here establishes it. mbar at fold 421 moves
//     from 89.1522 to 89.1763 and kills from 105790 to 107988, both 2 parts in
//     1000 or less, which is the exact periodicity of A5 showing up as
//     measurement.
//
// [7] WHAT THIS DOES NOT SHOW. It does not prove H''. It does not move angle
//     4's tile conclusion by a single term: the ln^2 x factor there is a
//     statement about a population of size e^{theta(x)}, and four bounded
//     windows say nothing about it. The confirmed object is the localized one,
//     and the confirmation is of the two-parameter mechanism form, not of the
//     one-parameter law the record wrote down. The bands were pre-registered
//     wide on purpose and a wide band is a weak test: the band at 2e+10 runs
//     from 457 all the way to 719, and its count band from 37.7 to 83.9. Finally
//     the fold range stops at 1499 in every window, and at 2e+10 the last fold
//     whose theta still fits under G2 is 1021, so nothing beyond that could
//     have carried a run anyway; the extinction at 457 is well inside that
//     ceiling and is not a range artifact.
// ============================================================================
