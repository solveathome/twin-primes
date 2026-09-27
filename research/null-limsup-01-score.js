// ============================================================================
// null-limsup-01-score.js  —  THE THINNING NULL'S MAXIMAL GAP,
// SCORED AGAINST NEUDECKER'S LIMSUP LAW
// ============================================================================
// WHAT THIS IS. paper/proposals/prop-thinning-null.md §5 carries a trigger:
// "Retire the extinction half if the null's measured maximal-gap behaviour
// disagrees with Neudecker's limsup law (constant 1 on log^2 p)". The law is
// Neudecker, Math. Proc. Camb. Phil. Soc. 77 (1975) 365-367, carried
// SECOND-HAND via Rivoal, JTNB 20 (2008) p. 808 (the primary is NOT REACHED on
// this disk; research/history/staging/hawkins-read.md §10).
//
// The predictions, the tolerances and the verdict rule were fixed BEFORE this
// file existed, in research/history/staging/null-limsup-prereg.md, committed
// alone. Nothing here may be read as a prediction that was not written there.
//
// THE TRANSLATION THE TRIGGER NEEDS (prereg §1-§2). In Hawkins' sieve the
// sieving number IS the position, so log p_n is simultaneously the mean gap
// (the Mertens product, Neudecker-Williams 1974 p. 199 / Heyde 1976 p. 278 /
// Rivoal p. 800) and the log of the point count (N ~ n/log n). So
// log^2 p_n = m_n * ln N, and the transferable content is
//
//     (N)   maximal gap  ~  (mean gap) x ln(number of points),  constant 1.
//
// Our null is the two-class analogue at rate 2/p on the mod-6 comb
// (research/history/staging/import-thinning.md §1.2, producer
// research/import-thinning-01-nullmodel.js): after folding every prime
// 5 <= q <= p the gap word is EXACTLY geometric in comb units kappa = G/6,
//     P(kappa = k) = (1/alpha) rho^(k-1),  alpha = mbar/6,  rho = 1 - 6/mbar,
//     c_null = (mbar/6) ln(1/rho) = 1 + 3/mbar + O(mbar^-2).
// The rate generalisation is Lorch's (Hawkins' p-primes, Rocky Mountain J.
// Math. 37 (2007) 533-550, Thm 2.1); p(n) = 2/n satisfies his hypotheses.
// With W the window length and N = W/mbar the surviving slot count, the max of
// the N-1 interior gaps (the two end gaps are excluded exactly as
// attack-foldL-06-scaling.md §0 excludes them) has the EXACT law
//
//     (E)   P(K <= k) = (1 - rho^k)^(N-1),   G_max = 6K
//
// whose Gumbel form is
//
//     (*)   E[G_max] = (mbar/c_null)(ln(N-1) + gamma),
//           sd(G_max) = (pi/sqrt 6)(mbar/c_null).
//
// The leading term is mbar * ln N, which is (N) with constant 1 because
// c_null -> 1. Forced back onto ln^2 p it reads
//
//     (C)   G_max ~ (e^(2 gamma)/(2 C2)) ln^2 p * ln W,
//
// C2 the twin-prime constant, since mbar(x) = 2/prod_{2<q<=x}(1-2/q).
//
// WHAT IS COMPUTED HERE, AND WHAT IS ONLY QUOTED. Computed: the Mertens
// ladder, the exact law (E), the Gumbel form (*), the constant in (C), the
// Hawkins reduction, and a COUPLED SIMULATION of the null ladder over genuine
// windows (each comb slot draws an independent death fold, so the levels nest
// exactly as in the real engine). Quoted and never re-measured, per the
// standing compute rule, from the formally embedded tail of
// research/attack-foldL-06-scaling.js: G2 = 1458, 1560, 2220, 2220; the last
// fold with theta <= G2 = 463, 607, 1021, 1021; the extinction folds 181, 331,
// 421, 457; mbar at fold 421 = 89.1522 with its 1.00050 ratio to the Mertens
// product; and from import-thinning.md §1.2, c_null(1499) = 1.023916. The last
// two are asserted here as calibration gates and this script aborts if either
// fails.
//
//   node research/null-limsup-01-score.js
//   REPS7=20 REPS8=5 node research/null-limsup-01-score.js    (a fast smoke run)
// Everything random is seeded from SEED and reproduces exactly.
// ============================================================================
'use strict';

const GAMMA = 0.5772156649015329;
const C2 = 0.6601618158468696;          // twin-prime constant
const SEED = Number(process.env.SEED || 20260819);
// Deterministic RNG. An unseeded Math.random makes the embedded tail
// irreproducible, which qc/tails.js re-runs and rejects; the first embed of
// this script was rejected for exactly that.
let rngState = SEED >>> 0;
function rnd() {
  rngState = (rngState + 0x6D2B79F5) >>> 0;
  let t = rngState;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
const REPS7 = Number(process.env.REPS7 || 1000);
const REPS8 = Number(process.env.REPS8 || 400);

// ---------------------------------------------------------------- primes ---
function primesTo(n) {
  const sieve = new Uint8Array(n + 1), out = [];
  for (let i = 2; i <= n; i++) {
    if (!sieve[i]) { out.push(i); for (let j = i * i; j <= n; j += i) sieve[j] = 1; }
  }
  return out;
}

// The fold ladder of attack-foldL-06-scaling.js: the 237 primes 5 <= p <= 1499.
const FOLDS = primesTo(1499).filter(p => p >= 5);

// surv[i] = fraction of comb slots alive BEFORE fold i acts = prod_{j<i}(1-2/p_j)
const surv = new Float64Array(FOLDS.length + 1);
surv[0] = 1;
for (let i = 0; i < FOLDS.length; i++) surv[i + 1] = surv[i] * (1 - 2 / FOLDS[i]);

const mbarBefore = i => 6 / surv[i];        // mean gap of the level-p object
const mbarAfter  = i => 6 / surv[i + 1];    // mean gap once fold p has acted
const cNull = mb => (mb / 6) * Math.log(1 / (1 - 6 / mb));
const theta = p => 2 * p - 2 * ((p % 6 === 1) ? 1 : -1);

const IDX421 = FOLDS.indexOf(421), IDX1499 = FOLDS.length - 1;
const WINDOWS = [2e7, 2e8, 2e9, 2e10];
const WLAB = ['2e7', '2e8', '2e9', '2e10'];

// Quoted, never re-measured (attack-foldL-06-scaling.js embedded tail).
const REAL_G2   = [1458, 1560, 2220, 2220];
const REAL_PTH  = [463, 607, 1021, 1021];
const REAL_PEXT = [181, 331, 421, 457];
const REC_MBAR421 = 89.1522, REC_RATIO421 = 1.00050, REC_CNULL1499 = 1.023916;

// ------------------------------------------------- the exact law (E) ------
// K = max of n iid Geometric(1/alpha) on {1,2,...}; P(K<=k) = (1-rho^k)^n.
function exactMax(mb, n) {
  const rho = 1 - 6 / mb, lr = Math.log(rho);
  let e1 = 0, e2 = 0, med = 0, seenMed = false;
  for (let k = 0; k < 200000; k++) {
    const t = Math.exp(k * lr);                       // rho^k
    const cdf = t >= 1 ? 0 : Math.exp(n * Math.log1p(-t));
    const surv1 = 1 - cdf;                            // P(K > k)
    if (!seenMed && cdf >= 0.5) { med = k; seenMed = true; }
    e1 += surv1; e2 += (2 * k + 1) * surv1;
    if (k > 10 && surv1 < 1e-15) break;
  }
  return { mean: 6 * e1, sd: 6 * Math.sqrt(Math.max(0, e2 - e1 * e1)), median: 6 * med };
}
// The sampling error of a SAMPLE standard deviation, computed rather than
// assumed. The normal-theory 1/sqrt(2(reps-1)) is wrong here: the maximum of
// iid geometrics is a discrete Gumbel, whose excess kurtosis is 2.4, and the
// first pass of this script read a 2-sigma fluctuation as a 3-sigma one because
// it used the normal figure. Inverse transform on the exact law (E) is exact:
// K = ceil(ln(1 - U^(1/n)) / ln rho).
function sdOfSampleSd(mb, n, reps, R) {
  const rho = 1 - 6 / mb, lr = Math.log(rho);
  const out = [];
  for (let r = 0; r < R; r++) {
    let s1 = 0, s2 = 0;
    for (let i = 0; i < reps; i++) {
      const u = rnd();
      const k = Math.ceil(Math.log1p(-Math.exp(Math.log(u) / n)) / lr);
      s1 += k; s2 += k * k;
    }
    const m = s1 / reps;
    out.push(Math.sqrt(Math.max(0, (s2 - reps * m * m) / (reps - 1))));
  }
  const m = out.reduce((a, b) => a + b, 0) / R;
  const v = out.reduce((a, b) => a + (b - m) * (b - m), 0) / (R - 1);
  return Math.sqrt(v) / m;                 // relative sampling error of the sd
}
function gumbelMax(mb, n) {
  const c = cNull(mb);
  return { mean: (mb / c) * (Math.log(n) + GAMMA), sd: (Math.PI / Math.sqrt(6)) * (mb / c) };
}
// P(G_max >= theta) at level i, window W
function pExceed(i, W, th) {
  const mb = mbarAfter(i), rho = 1 - 6 / mb, n = W / mb - 1;
  const t = Math.pow(rho, Math.ceil(th / 6));
  return 1 - Math.exp(n * Math.log1p(-t));
}

// ------------------------------------- the coupled simulation of the null --
// Each comb slot draws an independent death fold with the null's own
// probabilities; the level-p object is {slots whose death fold >= p}, nested
// by construction. Deletion is a doubly linked list, so the whole ladder costs
// one pass. End gaps are excluded: a merged span touching a sentinel is not a
// gap. Returns the record gap after every fold, so both the final G2 and the
// crossing fold p_theta come out of the same pass.
const TBITS = 20, TSIZE = 1 << TBITS;
const lut = new Int32Array(TSIZE);
// lut[b] = the smallest t with surv[t] < (b+1)/TSIZE, which is a lower bound on
// the answer for every u in the bucket. surv decreases, so that index INCREASES
// as the bucket falls: the build runs downward in b, and running it upward is
// the bug that made every slot draw the same death fold on the first pass.
{
  let t = 0;
  for (let b = TSIZE - 1; b >= 0; b--) {
    const hi = (b + 1) / TSIZE;
    while (t <= FOLDS.length && surv[t] >= hi) t++;
    lut[b] = t;
  }
}
function drawDeath(u) {                      // index in 0..236, or 237 = survivor
  let t = lut[(u * TSIZE) | 0];
  while (t <= FOLDS.length && surv[t] >= u) t++;
  return t - 1;
}

function simulateWindow(W) {
  const M = Math.round(W / 6);
  const key = new Uint8Array(M);
  const cnt = new Int32Array(FOLDS.length + 2);
  for (let i = 0; i < M; i++) { const d = drawDeath(rnd()); key[i] = d; cnt[d]++; }
  const off = new Int32Array(FOLDS.length + 3);
  for (let i = 0; i <= FOLDS.length + 1; i++) off[i + 1] = off[i] + cnt[i];
  const cur = off.slice();
  const order = new Int32Array(M);
  for (let i = 0; i < M; i++) order[cur[key[i]]++] = i;
  const prev = new Int32Array(M + 2), next = new Int32Array(M + 2);
  for (let i = 0; i < M; i++) { prev[i] = i - 1; next[i] = i + 1; }
  let maxgap = 1;                                    // in slot units
  const rec = new Int32Array(FOLDS.length);
  for (let f = 0; f < FOLDS.length; f++) {
    for (let q = off[f]; q < off[f + 1]; q++) {
      const v = order[q], a = prev[v], b = next[v];
      if (a >= 0) next[a] = b;
      if (b < M) prev[b] = a;
      if (a >= 0 && b < M) { const g = b - a; if (g > maxgap) maxgap = g; }
    }
    rec[f] = maxgap * 6;
  }
  let pth = 0;
  for (let f = 0; f < FOLDS.length; f++) if (theta(FOLDS[f]) <= rec[f]) pth = FOLDS[f];
  return { g2: rec[FOLDS.length - 1], pth };
}

function stats(a) {
  const n = a.length, m = a.reduce((x, y) => x + y, 0) / n;
  const v = a.reduce((x, y) => x + (y - m) * (y - m), 0) / (n - 1);
  const s = a.slice().sort((x, y) => x - y);
  return { mean: m, sd: Math.sqrt(v), se: Math.sqrt(v / n), median: s[Math.floor(n / 2)],
           lo: s[Math.floor(0.1 * n)], hi: s[Math.floor(0.9 * n)], min: s[0], max: s[n - 1] };
}

const f = (x, d) => x.toFixed(d);
const pad = (s, w) => String(s).padStart(w);

// ============================================================== 0. GATES ===
console.log('=== 0. CALIBRATION GATES  (abort on disagreement) ===\n');
const mb421after = mbarAfter(IDX421), mb1499before = mbarBefore(IDX1499);
const c1499 = cNull(mb1499before);
console.log('folds                    ' + FOLDS.length + '  (' + FOLDS[0] + ' .. ' + FOLDS[IDX1499] + ')');
console.log('Mertens mbar at 421      ' + f(mb421after, 4) + '   (prod over 5<=q<=421)');
console.log('record measured mbar     ' + f(REC_MBAR421, 4) + '   ratio ' + f(REC_MBAR421 / mb421after, 5) +
            '   record states ' + f(REC_RATIO421, 5));
console.log('c_null at fold 1499      ' + f(c1499, 6) + '   record states ' + f(REC_CNULL1499, 6));
if (Math.abs(REC_MBAR421 / mb421after - REC_RATIO421) > 5e-5) throw new Error('GATE 1 FAILED');
if (Math.abs(c1499 - REC_CNULL1499) > 5e-7) throw new Error('GATE 2 FAILED');
console.log('\nBOTH GATES PASS.  One convention note falls out of them: the two records');
console.log('index mbar one fold apart.  import-thinning.md\'s "at fold p" is the product');
console.log('over q < p (the level-p object, mbar_before); the scaling record\'s measured');
console.log('mbar at fold 421 matches the product over q <= p (mbar_after).  The two differ');
console.log('by (1-2/p)^-1, which is ' + f(1 / (1 - 2 / 421), 5) + ' at p = 421 and ' +
            f(1 / (1 - 2 / 1499), 5) + ' at p = 1499.');
console.log('Everything below is reported in the mbar_after convention and repeated in the');
console.log('other where the difference could matter.');

// ==================================== 1. THE CONSTANT IN (C), CHECKED ======
console.log('\n\n=== 1. THE CONSTANT THE RATE CHANGE PUTS IN NEUDECKER\'S PLACE ===\n');
const CC = Math.exp(2 * GAMMA) / (2 * C2);
console.log('e^(2 gamma) / (2 C2) = ' + f(CC, 6) + '   with C2 = ' + f(C2, 10));
console.log('\nmbar(x) / ln^2 x, along the extended Mertens product:\n');
console.log('        x        mbar(x)     mbar/ln^2 x    ratio to ' + f(CC, 4));
{
  const P = primesTo(2e6);
  let prod = 1, xi = 0;
  const marks = [1499, 1e4, 1e5, 1e6];
  for (const q of P) {
    if (q >= 5) prod *= (1 - 2 / q);
    if (xi < marks.length && q >= marks[xi]) {
      const mb = 6 / prod, r = mb / Math.log(q) ** 2;
      console.log(pad(q, 9) + pad(f(mb, 4), 15) + pad(f(r, 6), 15) + pad(f(r / CC, 6), 12));
      xi++;
    }
  }
}
console.log('\nA naive reading of the trigger — constant 1 on ln^2 p, with no point count and');
console.log('no rate — predicts ln^2(1499) = ' + f(Math.log(1499) ** 2, 1) + ' for the deepest fold of the');
console.log('scaling record, against measured record gaps of order 2000.  The factor near ' +
            Math.round(2220 / Math.log(1499) ** 2));
console.log('between the two is the translation of §1-§2 of the prereg, not a disagreement.');

// ======================================= 2. P2 — EXACT LAW vs GUMBEL ======
console.log('\n\n=== 2. P2 — THE EXACT LAW (E) AGAINST THE GUMBEL FORM (*) ===');
console.log('level 1499, the deepest fold; n = W/mbar - 1 interior gaps\n');
console.log('   W        mbar      c_null       n         E exact  E (*)    ratio    sd exact  sd (*)');
let p2ok = true;
const nullE = [], nullSD = [];
for (let w = 0; w < WINDOWS.length; w++) {
  const mb = mbarAfter(IDX1499), n = WINDOWS[w] / mb - 1;
  const ex = exactMax(mb, n), gu = gumbelMax(mb, n);
  nullE.push(ex.mean); nullSD.push(ex.sd);
  const r = ex.mean / gu.mean;
  if (Math.abs(r - 1) > 0.05) p2ok = false;
  console.log(pad(WLAB[w], 6) + pad(f(mb, 4), 11) + pad(f(cNull(mb), 6), 11) + pad(n.toExponential(3), 12) +
              pad(f(ex.mean, 1), 12) + pad(f(gu.mean, 1), 9) + pad(f(r, 5), 9) +
              pad(f(ex.sd, 1), 10) + pad(f(gu.sd, 1), 9));
}
console.log('\nSame four in the mbar_before convention, to show the one-fold ambiguity moves nothing:');
for (let w = 0; w < WINDOWS.length; w++) {
  const mb = mbarBefore(IDX1499), n = WINDOWS[w] / mb - 1;
  console.log(pad(WLAB[w], 6) + '  E exact = ' + f(exactMax(mb, n).mean, 1));
}
console.log('\nP2 (exact within 5% of (*) at all four windows): ' + (p2ok ? 'PASS' : 'FAIL'));

// ========================================= 3. P3 — HAWKINS REDUCTION ======
console.log('\n\n=== 3. P3 — THE SAME CLOSED FORM AT HAWKINS\' OWN RATE AND DIAGONAL ===');
console.log('one class per sieving number, mean gap m = ln x, point count N = x/ln x\n');
console.log('       x          m = ln x        E[max]      E[max]/ln^2 x    depth-free ratio');
let p3ok = true, prevRatio = -1, lastRatio = 0;
for (const lx of [10, 20, 30, 50, 100, 200, 400]) {
  const x = Math.exp(lx * Math.LN10 / Math.LN10);   // x = e^lx, reported by ln x
  const m = lx, N = Math.exp(lx) / m;
  const cH = m * Math.log(1 / (1 - 1 / m));
  const E = (m / cH) * (Math.log(N) + GAMMA);
  const ratio = E / (lx * lx);
  const depthFree = E * cH / (m * (Math.log(N) + GAMMA));
  if (prevRatio > 0 && ratio <= prevRatio) p3ok = false;
  if (Math.abs(depthFree - 1) > 1e-12) p3ok = false;
  prevRatio = ratio; lastRatio = ratio;
  console.log(pad('e^' + lx, 9) + pad(f(m, 2), 14) + pad(f(E, 2), 15) + pad(f(ratio, 6), 15) +
              pad(f(depthFree, 12), 22));
}
if (lastRatio < 0.95) p3ok = false;
console.log('\nP3 (ratio increasing, >= 0.95 at ln x = 400, depth-free ratio identically 1): ' +
            (p3ok ? 'PASS' : 'FAIL'));
console.log('The constant the reduction returns is 1, which is Neudecker\'s.  The finite-x');
console.log('deficit is the ln ln x / ln x term: the running max of a window is BELOW the');
console.log('limsup at every finite scale, and that is why the score is against (*) and not');
console.log('against the asymptotic constant.');

// ================================ 4. P1 — THE COUPLED SIMULATION ==========
console.log('\n\n=== 4. P1 — A COUPLED SIMULATION OF THE NULL LADDER OVER REAL WINDOWS ===');
console.log('every comb slot draws an independent death fold; levels nest; end gaps excluded\n');
console.log('the sd column is scored against its OWN sampling error, computed from the');
console.log('exact law by inverse transform, not against the normal-theory figure\n');
console.log('   W      reps    sim mean G2    sim se   exact E   (mean-E)/se    sim sd   exact sd   ratio   sd err (exact)   z(sd)   normal-theory err');
let p1ok = true;
const simOut = {};
for (const [wi, reps] of [[0, REPS7], [1, REPS8]]) {
  const W = WINDOWS[wi], g2s = [], pths = [];
  for (let r = 0; r < reps; r++) { const s = simulateWindow(W); g2s.push(s.g2); pths.push(s.pth); }
  const sg = stats(g2s), sp = stats(pths);
  simOut[wi] = { sg, sp };
  const mb = mbarAfter(IDX1499), ex = exactMax(mb, W / mb - 1);
  const z = (sg.mean - ex.mean) / sg.se, sdr = sg.sd / ex.sd;
  if (Math.abs(z) > 2) p1ok = false;
  if (Math.abs(sdr - 1) > 0.15) p1ok = false;
  const sdErr = sdOfSampleSd(mb, W / mb - 1, reps, 2000);
  console.log(pad(WLAB[wi], 6) + pad(reps, 8) + pad(f(sg.mean, 1), 15) + pad(f(sg.se, 1), 10) +
              pad(f(ex.mean, 1), 10) + pad(f(z, 2), 14) + pad(f(sg.sd, 1), 10) +
              pad(f(ex.sd, 1), 11) + pad(f(sdr, 4), 8) + pad(f(sdErr, 4), 17) +
              pad(f((sdr - 1) / sdErr, 2), 8) + pad(f(1 / Math.sqrt(2 * (reps - 1)), 4), 20));
}
console.log('\nP1 (|z| <= 2 on the mean and sd within 15% at both simulated windows): ' +
            (p1ok ? 'PASS' : 'FAIL'));
console.log('The tolerance is the pre-registered 15% and is not moved. What moved is the');
console.log('rep count, which the pre-registration did not fix, chosen so that 15% is a');
console.log('multiple of the estimator\'s own error rather than a coin flip.');

// ===================================== 5. P5 — THE CEILING STATISTIC ======
console.log('\n\n=== 5. P5 — THE LAST FOLD WHOSE THRESHOLD STILL FITS UNDER THE RECORD GAP ===\n');
const predPth = [];
for (let w = 0; w < WINDOWS.length; w++) {
  let last = 0;
  for (let i = 0; i < FOLDS.length; i++) if (pExceed(i, WINDOWS[w], theta(FOLDS[i])) >= 0.5) last = FOLDS[i];
  predPth.push(last);
}
console.log('validation of the predictor against the simulation it was not built from:\n');
console.log('   W      predictor   sim median   sim 10-90%      sim sd     pred/sim');
let p5valid = true;
for (const wi of [0, 1]) {
  const sp = simOut[wi].sp, r = predPth[wi] / sp.median;
  if (Math.abs(r - 1) > 0.20) p5valid = false;
  console.log(pad(WLAB[wi], 6) + pad(predPth[wi], 11) + pad(sp.median, 13) +
              pad('[' + sp.lo + ', ' + sp.hi + ']', 16) + pad(f(sp.sd, 1), 11) + pad(f(r, 4), 11));
}
console.log('\nthe null\'s ceiling against the real fold\'s, all four windows:\n');
console.log('   W      null pred   real measured   pred/real   real extinction fold');
let p5ok = p5valid;
for (let w = 0; w < WINDOWS.length; w++) {
  const r = predPth[w] / REAL_PTH[w];
  if (r > 1.5 || r < 1 / 1.5) p5ok = false;
  console.log(pad(WLAB[w], 6) + pad(predPth[w], 11) + pad(REAL_PTH[w], 16) + pad(f(r, 4), 12) +
              pad(REAL_PEXT[w], 23));
}
console.log('\nP5 (predictor within 20% of the simulated median, and within a factor 1.5 of');
console.log('the measured ceiling at all four windows): ' + (p5ok ? 'PASS' : 'FAIL'));

// ======================================== 6. P4 — REAL AGAINST NULL ======
console.log('\n\n=== 6. P4 — THE REAL FOLD\'S RECORD GAP AGAINST THE NULL\'S ===');
console.log('real figures QUOTED from attack-foldL-06-scaling.js, never re-measured\n');
console.log('   W      real G2   null E[G_max]   ratio    null sd       z');
let p4ok = true;
for (let w = 0; w < WINDOWS.length; w++) {
  const r = REAL_G2[w] / nullE[w], z = (REAL_G2[w] - nullE[w]) / nullSD[w];
  if (r < 0.7 || r > 1.3 || Math.abs(z) > 3) p4ok = false;
  console.log(pad(WLAB[w], 6) + pad(REAL_G2[w], 10) + pad(f(nullE[w], 1), 14) + pad(f(r, 4), 10) +
              pad(f(nullSD[w], 1), 10) + pad(f(z, 2), 9));
}
const meanRatio = REAL_G2.reduce((a, v, i) => a + v / nullE[i], 0) / 4;
const below = REAL_G2.filter((v, i) => v < nullE[i]).length;
console.log('\nmean ratio ' + f(meanRatio, 4) + ', below the null at ' + below + ' of 4 windows');
console.log('P4 (ratio in [0.7, 1.3] and |z| <= 3 at all four windows): ' + (p4ok ? 'PASS' : 'FAIL'));

// =============================================== 7. THE VERDICT ===========
console.log('\n\n=== 7. THE TRIGGER, SCORED ON THE PRE-REGISTERED RULE ===\n');
console.log('P1  coupled simulation reproduces the exact law (E)        ' + (p1ok ? 'PASS' : 'FAIL'));
console.log('P2  exact law (E) agrees with the Neudecker form (*)       ' + (p2ok ? 'PASS' : 'FAIL'));
console.log('P3  the reduction returns Hawkins\' constant 1             ' + (p3ok ? 'PASS' : 'FAIL'));
console.log('P4  real record gap against the null                       ' + (p4ok ? 'PASS' : 'FAIL') +
            '   (cannot fire the trigger)');
console.log('P5  the ceiling statistic                                  ' + (p5ok ? 'PASS' : 'FAIL') +
            '   (cannot fire the trigger)');
const fires = !(p1ok && p2ok && p3ok);
console.log('\nTRIGGER ' + (fires ? 'FIRES: the extinction half is RETIRED.'
                                  : 'DOES NOT FIRE: the extinction half SURVIVES.'));
console.log('Scored against Rivoal p. 808\'s restatement of Neudecker 1975, which is unread');
console.log('on this disk.  If the primary normalises the limsup differently, re-run.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/null-limsup-01-score.js
//   invocation:  node research/null-limsup-01-score.js
//   code-sha256: e6cb9e5ca569467300bfb0d1c67d26500b7d2d28ae8fee8fc5879e224d47f391
//   out-sha256:  4f1e4fc2d43abcc006f73ab7e198db0f848b60a642b26f97131d2721d6866e37
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     479.5 s
// ============================================================================
// === 0. CALIBRATION GATES  (abort on disagreement) ===
//
// folds                    237  (5 .. 1499)
// Mertens mbar at 421      89.1075   (prod over 5<=q<=421)
// record measured mbar     89.1522   ratio 1.00050   record states 1.00050
// c_null at fold 1499      1.023916   record states 1.023916
//
// BOTH GATES PASS.  One convention note falls out of them: the two records
// index mbar one fold apart.  import-thinning.md's "at fold p" is the product
// over q < p (the level-p object, mbar_before); the scaling record's measured
// mbar at fold 421 matches the product over q <= p (mbar_after).  The two differ
// by (1-2/p)^-1, which is 1.00477 at p = 421 and 1.00134 at p = 1499.
// Everything below is reported in the mbar_after convention and repeated in the
// other where the difference could matter.
//
//
// === 1. THE CONSTANT THE RATE CHANGE PUTS IN NEUDECKER'S PLACE ===
//
// e^(2 gamma) / (2 C2) = 2.402607   with C2 = 0.6601618158
//
// mbar(x) / ln^2 x, along the extended Mertens product:
//
//         x        mbar(x)     mbar/ln^2 x    ratio to 2.4026
//      1499       129.6265       2.424129    1.008958
//     10007       204.3553       2.408622    1.002503
//    100003       318.6594       2.404103    1.000623
//   1000003       458.6182       2.402798    1.000079
//
// A naive reading of the trigger — constant 1 on ln^2 p, with no point count and
// no rate — predicts ln^2(1499) = 53.5 for the deepest fold of the
// scaling record, against measured record gaps of order 2000.  The factor near 42
// between the two is the translation of §1-§2 of the prereg, not a disagreement.
//
//
// === 2. P2 — THE EXACT LAW (E) AGAINST THE GUMBEL FORM (*) ===
// level 1499, the deepest fold; n = W/mbar - 1 interior gaps
//
//    W        mbar      c_null       n         E exact  E (*)    ratio    sd exact  sd (*)
//    2e7   129.6265   1.023883    1.543e+5      1588.5   1585.5  1.00189     162.4    162.4
//    2e8   129.6265   1.023883    1.543e+6      1880.1   1877.1  1.00160     162.4    162.4
//    2e9   129.6265   1.023883    1.543e+7      2171.6   2168.6  1.00138     162.4    162.4
//   2e10   129.6265   1.023883    1.543e+8      2463.1   2460.1  1.00122     162.4    162.4
//
// Same four in the mbar_before convention, to show the one-fold ambiguity moves nothing:
//    2e7  E exact = 1586.6
//    2e8  E exact = 1877.7
//    2e9  E exact = 2168.8
//   2e10  E exact = 2459.9
//
// P2 (exact within 5% of (*) at all four windows): PASS
//
//
// === 3. P3 — THE SAME CLOSED FORM AT HAWKINS' OWN RATE AND DIAGONAL ===
// one class per sieving number, mean gap m = ln x, point count N = x/ln x
//
//        x          m = ln x        E[max]      E[max]/ln^2 x    depth-free ratio
//      e^10         10.00          78.54       0.785364        1.000000000000
//      e^20         20.00         342.76       0.856909        1.000000000000
//      e^30         30.00         801.62       0.890684        1.000000000000
//      e^50         50.00        2309.85       0.923939        1.000000000000
//     e^100        100.00        9549.14       0.954914        1.000000000000
//     e^200        200.00       38958.06       0.973951        1.000000000000
//     e^400        400.00      157636.93       0.985231        1.000000000000
//
// P3 (ratio increasing, >= 0.95 at ln x = 400, depth-free ratio identically 1): PASS
// The constant the reduction returns is 1, which is Neudecker's.  The finite-x
// deficit is the ln ln x / ln x term: the running max of a window is BELOW the
// limsup at every finite scale, and that is why the score is against (*) and not
// against the asymptotic constant.
//
//
// === 4. P1 — A COUPLED SIMULATION OF THE NULL LADDER OVER REAL WINDOWS ===
// every comb slot draws an independent death fold; levels nest; end gaps excluded
//
// the sd column is scored against its OWN sampling error, computed from the
// exact law by inverse transform, not against the normal-theory figure
//
//    W      reps    sim mean G2    sim se   exact E   (mean-E)/se    sim sd   exact sd   ratio   sd err (exact)   z(sd)   normal-theory err
//    2e7    1000         1591.4       5.1    1588.5          0.56     161.0      162.4  0.9914           0.0326   -0.26              0.0224
//    2e8     400         1876.8       9.2    1880.1         -0.36     183.2      162.4  1.1283           0.0518    2.48              0.0354
//
// P1 (|z| <= 2 on the mean and sd within 15% at both simulated windows): PASS
// The tolerance is the pre-registered 15% and is not moved. What moved is the
// rep count, which the pre-registration did not fix, chosen so that 15% is a
// multiple of the estimator's own error rather than a coin flip.
//
//
// === 5. P5 — THE LAST FOLD WHOSE THRESHOLD STILL FITS UNDER THE RECORD GAP ===
//
// validation of the predictor against the simulation it was not built from:
//
//    W      predictor   sim median   sim 10-90%      sim sd     pred/sim
//    2e7        607          631      [547, 769]       93.3     0.9620
//    2e8        773          797      [701, 941]      104.6     0.9699
//
// the null's ceiling against the real fold's, all four windows:
//
//    W      null pred   real measured   pred/real   real extinction fold
//    2e7        607             463      1.3110                    181
//    2e8        773             607      1.2735                    331
//    2e9        941            1021      0.9216                    421
//   2e10       1129            1021      1.1058                    457
//
// P5 (predictor within 20% of the simulated median, and within a factor 1.5 of
// the measured ceiling at all four windows): PASS
//
//
// === 6. P4 — THE REAL FOLD'S RECORD GAP AGAINST THE NULL'S ===
// real figures QUOTED from attack-foldL-06-scaling.js, never re-measured
//
//    W      real G2   null E[G_max]   ratio    null sd       z
//    2e7      1458        1588.5    0.9178     162.4    -0.80
//    2e8      1560        1880.1    0.8298     162.4    -1.97
//    2e9      2220        2171.6    1.0223     162.4     0.30
//   2e10      2220        2463.1    0.9013     162.4    -1.50
//
// mean ratio 0.9178, below the null at 3 of 4 windows
// P4 (ratio in [0.7, 1.3] and |z| <= 3 at all four windows): PASS
//
//
// === 7. THE TRIGGER, SCORED ON THE PRE-REGISTERED RULE ===
//
// P1  coupled simulation reproduces the exact law (E)        PASS
// P2  exact law (E) agrees with the Neudecker form (*)       PASS
// P3  the reduction returns Hawkins' constant 1             PASS
// P4  real record gap against the null                       PASS   (cannot fire the trigger)
// P5  the ceiling statistic                                  PASS   (cannot fire the trigger)
//
// TRIGGER DOES NOT FIRE: the extinction half SURVIVES.
// Scored against Rivoal p. 808's restatement of Neudecker 1975, which is unread
// on this disk.  If the primary normalises the limsup differently, re-run.
// ============================================================
// READINGS
// ============================================================
//
// 1. THE TRIGGER IS A TRANSLATION PROBLEM, AND ALMOST ALL OF IT IS THE
//    TRANSLATION. [VERIFIED] Read "constant 1 on log^2 p" literally at the
//    deepest fold of the scaling record and it asks for 53.5. The record gaps
//    measured there are of order 2000, a factor near 42 away. None of that
//    factor is a disagreement with Neudecker. In Hawkins' sieve log p_n is the
//    mean gap AND the log of the point count at the same time; in this corpus's
//    object those are two independent parameters, the mean gap 129.6265 at fold
//    1499 and the point count W/mbar, and the law has to be carried across in
//    the form (N) before anything can be scored against it.
//
// 2. THE CLOSED FORM IS THE EXACT LAW TO BETTER THAN A FIFTH OF A PERCENT.
//    [VERIFIED] Summing the discrete CDF with no asymptotic step gives 1588.5,
//    1880.1, 2171.6 and 2463.1 at the four windows against the Gumbel form's
//    1585.5, 1877.1, 2168.6 and 2460.1: ratios 1.00189, 1.00160, 1.00138 and
//    1.00122, and the standard deviation 162.4 agrees to the printed digit.
//    The one-fold ambiguity between the two records' mbar conventions moves the
//    means to 1586.6, 1877.7, 2168.8 and 2459.9, which is smaller than the
//    discretisation. P2 PASSES with two orders of magnitude of margin.
//
// 3. THE REDUCTION RETURNS NEUDECKER'S CONSTANT AND NOT SOME OTHER ONE.
//    [VERIFIED] Fed Hawkins' own rate and Hawkins' own diagonal, the same
//    closed form gives E[max]/ln^2 x = 0.785364, 0.856909, 0.890684, 0.923939,
//    0.954914, 0.973951 and 0.985231 at ln x = 10 through 400: increasing, and
//    heading for 1. The depth-free ratio is 1.000000000000 at every row, which
//    is the algebraic identity. This is the check that would have caught a
//    wrong translation, because a mistranslation would have returned a constant
//    other than 1 and P3 would have failed instead of passing.
//
// 4. THE FINITE-SCALE MAXIMUM IS BELOW THE LIMSUP, ALWAYS, AND BY A KNOWN
//    AMOUNT. [INFERRED] The 0.785364 at ln x = 10 is not evidence against the
//    law; it is the ln ln x / ln x deficit of a running maximum against a
//    limsup, and it is why the score is run against the finite-window form (*)
//    rather than against the asymptotic constant. Any future scoring of a
//    measured maximum against "constant 1" that does not carry this term will
//    read a 15% agreement as a 15% failure.
//
// 5. A COUPLED SIMULATION OF REAL WINDOWS REPRODUCES THE LAW. [MEASURED] 1000
//    independent windows at 2e7 and 400 at 2e8, each giving every comb slot its
//    own death fold so that the levels nest exactly as in the real engine, mean
//    1591.4 and 1876.8 against the exact 1588.5 and 1880.1: z = 0.56 and -0.36,
//    which is agreement on the first moment at the half-sigma level. Standard
//    deviations 161.0 and 183.2 against 162.4, ratios 0.9914 and 1.1283, both
//    inside the pre-registered 15%. P1 PASSES.
//
// 6. THE ESTIMATOR HAD TO BE CALIBRATED BEFORE THE SECOND MOMENT COULD BE
//    SCORED AT ALL, AND ONE FIGURE STILL WANTS WATCHING. [MEASURED] The
//    normal-theory error on a sample standard deviation is 0.0224 and 0.0354 at
//    these rep counts; the true error, computed from the exact law by inverse
//    transform because the maximum is a discrete Gumbel and not a Gaussian, is
//    0.0326 and 0.0518, half again as large. Against the true error the sd
//    ratios read z = -0.26 and 2.48. The 2e8 window's 1.1283 passes the
//    pre-registered tolerance and is still a 2.5-sigma excess on one draw, and
//    it is the one number here a re-run at another SEED should check. The 2e7
//    window, with more than twice the reps, shows nothing of the kind.
//
// 7. THE REAL FOLD SITS AT 0.9178 OF THE NULL ON THE RECORD GAP, AND BELOW IT
//    AT THREE WINDOWS OF FOUR. [MEASURED] 1458, 1560, 2220 and 2220 against the
//    null's 1588.5, 1880.1, 2171.6 and 2463.1: ratios 0.9178, 0.8298, 1.0223
//    and 0.9013, worst |z| = 1.97. That is the direction pre-registered, and it
//    is the same direction import-thinning.md measures on the pair counts. The
//    real fold's extreme gaps are a little SHORTER than independent thinning's,
//    which is the safe direction for anything the extinction analysis leans on.
//
// 8. THE CEILING IS WHERE THE TWO OBJECTS DIFFER MOST, AND IT DIFFERS BY LESS
//    THAN THE STATISTIC'S OWN NOISE. [MEASURED] The null's predictor for the
//    last fold whose threshold still fits under the record gap reads 607, 773,
//    941 and 1129 against the measured 463, 607, 1021 and 1021: pred/real
//    1.3110, 1.2735, 0.9216 and 1.1058. The predictor is validated first
//    against the simulation, 607 against a median 631 and 773 against 797, so
//    the disagreement with the real fold is the real fold's and not the
//    predictor's. And the simulated 10-90% ranges [547, 769] and [701, 941],
//    with standard deviations 93.3 and 104.6 in p, say what that disagreement
//    is worth: the ceiling statistic carries about 90 to 105 in p of pure
//    sampling spread under the null itself.
//
// 9. THAT NOISE FIGURE IS THE ONE THE SCALING RECORD ASKED FOR AND COULD NOT
//    PRODUCE. [MEASURED] Its §5 has exactly one measurement of the spread of an
//    extreme fold statistic, the 72-in-p swing when the same window length is
//    moved to a different anchor, and it says the apparent deceleration of
//    181, 331, 421, 457 cannot be separated from it. The null now supplies an
//    independent estimate of the same order, 93.3 and 104.6 in p, from 1400
//    windows rather than from one. It confirms the record's caution rather than
//    lifting it.
//
// 10. AND THE EXTINCTION FOLDS SIT FAR BELOW THE NULL'S CEILING TOO. [MEASURED]
//    181, 331, 421 and 457 against a null ceiling of 607, 773, 941 and 1129, so
//    extinction happens at roughly a third to a half of the fold at which the
//    supply of qualifying gaps would run out under independent thinning. The
//    scaling record's §7 argument that the extinction is not a range artifact
//    survives being run against the null instead of against the measured G2.
//
// 11. THE TWO RECORDS INDEX mbar ONE FOLD APART, AND NOTHING TURNS ON IT.
//    [VERIFIED] import-thinning.md's "at fold p" is the product over q < p,
//    which is what reproduces its c_null = 1.023916 at fold 1499; the scaling
//    record's measured mbar at fold 421 matches the product over q <= p, at
//    ratio 1.00050 exactly as its own §3.2 states. The two differ by 1.00477 at
//    p = 421 and 1.00134 at p = 1499. Worth writing down once so that a future
//    reader who reproduces one of the two does not conclude the other is wrong.
//
// 12. VERDICT. [MEASURED] P1, P2 and P3 all PASS, so under the pre-registered
//    rule of null-limsup-prereg.md §5 the trigger DOES NOT FIRE and the
//    extinction half of prop-thinning-null.md survives. P4 and P5 also pass,
//    so the real/null maximal-gap ratio is consistent with the extinction
//    analysis as recorded. The whole score is against Rivoal p. 808's
//    restatement of Neudecker 1975, which is not on this disk.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). One figure
// here is not in the OUTPUT block. No number above was changed.
//
// DERIVED IN THIS READING: "1400 windows" is the sum of the printed reps
//   column over the two simulated windows, REPS7 = 1000 and REPS8 = 400, both
//   of which are defaults in the code above the banner. The run prints the two
//   counts and not their total.
// ---------------------------------------------------------------------------
