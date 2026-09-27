// ============================================================================
// ATTACK perfold-01 — THE PER-FOLD ERROR MODEL OF THE EXTINCTION LAW
// ============================================================================
// THE QUESTION. The extinction rate law lands its AGGREGATE blind predictions
// at five windows over four decades of Y (fifth window HIT, `foldL-window5.md`),
// but its per-fold clause — at folds p >= 100 with E[X_p] >= 1, 90% of measured
// X_p inside E[X_p] +- 3 sqrt(E[X_p]) — FAILS at 43.2% (D3 of that record).
// The aggregate is right while the Poisson-scale per-fold band is wrong. This
// script hunts the correct per-fold error model among four candidates:
//
//   (i)   overdispersion as i.i.d. noise: negative binomial per (fold, window),
//         variance = mu + mu^2/k;
//   (ii)  a heavy-tailed mixture (Poisson-lognormal) per (fold, window);
//   (iii) correlated neighbouring folds (block variance);
//   (iv)  a DETERMINISTIC per-fold systematic the smooth law misses: X_p ~
//         Poisson(lambda_model(p, Y) * M_p) with M_p a fixed number of the fold,
//         shared by every window and every anchor — the same shape as the
//         hot-count systematic that is now written into the law, one level
//         finer. The lead for (iv) is `import-stein.md` §2.4 P1: around the
//         DERIVED first moment lambda_p the +-3 sqrt band holds at 97-100%, so
//         the dispersion around the true per-fold mean is Poisson-compatible
//         and the failure must live in the first moment itself.
//
// UNITS, both sides. X_p is a count: the number of adjacent kill pairs at fold
// p in the window (dimensionless integer). lambda is the model's expected
// count for the same fold and window (dimensionless). Pearson residuals
// (X - lambda)/sqrt(lambda) are dimensionless.
//
// COMPUTE DISCIPLINE. No window is re-sieved. Every X_p, kills, theta, mbar
// and model mean below is PARSED from the formally embedded OUTPUT blocks of
//   research/attack-foldL-06-scaling.js      (Y = 2e7, 2e8, 2e9, 2e10, offset)
//   research/foldL-window5-01-extinction.js  (W = 2e11: C1, B2, D3 tables)
// and custody-asserted against the aggregates those embeds state (sum X per
// window, N2 counts, the 32-of-74 clause). The model mean at W = 2e11 is taken
// VERBATIM from the window-5 B2 table for p >= 307 and reconstructed for
// p in [101, 306] from the law's own formula
//     lambda(p, Y) = (2 Y / (p * mbar_before(p))) * A * exp(-c * theta_p / mbar_before(p))
// with the record's fitted pair A = 2.4312e-2, c = 1.0818 and mbar_before from
// the embedded mbar chains; the reconstruction is validated by reproducing the
// prereg's decade sum 1.996e5, D4's total 2.004481e5, and D3's 32-of-74 count
// EXACTLY before anything is fitted. lambda at every other window is exactly
// lambda(p, 2e11) * Y / 2e11, because the model is linear in Y (kills is).
//
// CALIBRATION DISCIPLINE (the campaign rule: calibrate the estimator on a
// control whose truth you know, in the same pass). Three synthetic controls
// are generated at the REAL lambda grid and pushed through the ENTIRE battery
// before the real data is read:
//   control A: X ~ Poisson(lambda)                        (truth: no extra term)
//   control B: X ~ Poisson(lambda * M_p), ln M_p ~ N(-s^2/2, s^2), s = 0.6,
//              M_p FIXED per fold across all six windows  (truth: candidate iv)
//   control C: X ~ NegBin(mean lambda, k = 3), drawn independently per
//              (fold, window)                             (truth: candidate i)
// The battery must read A as Poisson, B as deterministic-fold, C as i.i.d.
// overdispersion, or the run aborts. RNG is sfc32 (seeded, standard 32-bit
// generator; the << / >>> in it are its defined 32-bit semantics, not an
// aliasing hazard — nothing here touches residue bitmasks).
//
// FIT / HELD-OUT PROTOCOL. Dispersion parameters are fitted on the FIT set
// {2e7, 2e8, 2e9, 2e9-offset} and scored on the two HELD windows 2e10 and
// 2e11 (for 2e11 the fold-factor model also gets the natural sequential fit
// that includes 2e10, labelled M4b). Scores: total held-out log predictive
// likelihood on the window's registered population {p >= 100, lambda >= 1},
// and coverage of the central 90% and 99.73% predictive intervals.
// ============================================================================

'use strict';
const fs = require('fs');
const path = require('path');
const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1) + 's';

// ---------------------------------------------------------------------------
// Stage 0 — parse the embedded artifacts
// ---------------------------------------------------------------------------
function readSrc(f) {
  // parse ONLY the formally embedded OUTPUT block, never the code above it
  const t = fs.readFileSync(path.join(__dirname, f), 'utf8');
  const i = t.indexOf('OUTPUT — EMBEDDED');
  if (i < 0) throw new Error('no embedded OUTPUT block in ' + f);
  return t.slice(i);
}
const srcScaling = readSrc('attack-foldL-06-scaling.js');
const srcW5 = readSrc('foldL-window5-01-extinction.js');

function isPrime(n) { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; }
const PRIMES = []; for (let n = 5; n <= 1499; n++) if (isPrime(n)) PRIMES.push(n);
const eta = p => (p % 6 === 1 ? 1 : -1);
const THETA = {}; for (const p of PRIMES) THETA[p] = 2 * p - 2 * eta(p);

// generic: parse a pipe table that follows a header line matching `hdrRe`,
// rows are comment lines of numeric cells split by '|'; stop at first
// non-matching line.
function parseTable(src, hdrRe, ncells) {
  const lines = src.split('\n');
  let i = lines.findIndex(l => hdrRe.test(l));
  if (i < 0) throw new Error('header not found: ' + hdrRe);
  const rows = [];
  for (i = i + 1; i < lines.length; i++) {
    const l = lines[i];
    if (!/^\/\//.test(l)) break;
    const body = l.replace(/^\/\/\s*/, '');
    const cells = body.split('|').map(s => s.trim());
    if (cells.length < ncells) { if (rows.length) break; else continue; }
    const first = cells[0].split(/\s+/)[0];
    if (!/^\d+$/.test(first)) { if (rows.length) break; else continue; }
    rows.push(cells);
  }
  if (!rows.length) throw new Error('no rows under ' + hdrRe);
  return rows;
}

// --- the four scaling windows: fold | kills | runs | X | L | theta | mbar | G2
function parseWindowTable(src, label) {
  const rows = parseTable(src, new RegExp('--- Y = ' + label.replace(/\+/g, '\\+') + ': every fold'), 8);
  const m = {};
  for (const c of rows) {
    const p = +c[0];
    m[p] = { kills: +c[1], X: +c[3], L: +c[4], theta: +c[5], mbar: +c[6] };
    if (m[p].theta !== THETA[p]) throw new Error('theta mismatch at ' + label + ' p=' + p);
  }
  return m;
}
const W2e7 = parseWindowTable(srcScaling, '2e+7');
const W2e8 = parseWindowTable(srcScaling, '2e+8');
const W2e9 = parseWindowTable(srcScaling, '2e+9');
const W2e10 = parseWindowTable(srcScaling, '2e+10');

// --- the offset window (STAGE D): fold | kills | X | L
const offRows = parseTable(srcScaling, /STAGE D — same length, moved up/, 4);
const WOFF = {}; for (const c of offRows) WOFF[+c[0]] = { X: +c[2], L: +c[3] };

// --- window 5, C1: fold | kills | runs | X | L | theta | mbar | G2
const c1Rows = parseTable(srcW5, /--- C1\. every fold with L >= 2 at W = 2e\+11/, 8);
const W2e11 = {};
for (const c of c1Rows) {
  const p = +c[0];
  W2e11[p] = { kills: +c[1], X: +c[3], L: +c[4], theta: +c[5], mbar: +c[6] };
  if (W2e11[p].theta !== THETA[p]) throw new Error('theta mismatch W5 p=' + p);
}

// --- window 5, B2: p | theta | theta/mbar | kills | "Efit [lo, hi]" | "Estein [...]"
const b2Rows = parseTable(srcW5, /p \| theta \|\s+theta\/mbar \| kills\(W\)/, 6);
const B2 = {};
for (const c of b2Rows) {
  const p = +c[0], theta = +c[1], tom = +c[2], kills = +c[3];
  const mEfit = c[4].match(/^([\d.eE+-]+)\s+\[([\d.\-]+),\s*([\d.\-]+)\]/);
  if (!mEfit) throw new Error('B2 Efit cell unparsed at p=' + p + ': ' + c[4]);
  B2[p] = { theta, tom, kills, Efit: +mEfit[1], mbarBefore: theta / tom };
  if (theta !== THETA[p]) throw new Error('theta mismatch B2 p=' + p);
}

// --- window 5, D3: p | Efit | [band] | X | inside   (printed only for p >= 300)
const d3Rows = parseTable(srcW5, /p \|\s+E\[X\] fitted \|\s+band\s+\| X measured \| inside/, 5);
const D3 = {};
for (const c of d3Rows) D3[+c[0]] = { Efit: +c[1], X: +c[3], inside: c[4] === 'yes' };

// --- custody assertions: the embeds' own aggregates, digit for digit
function sumX(m, pmin, pmax) { let s = 0; for (const k in m) { const p = +k; if (p >= pmin && p <= pmax) s += m[k].X; } return s; }
function assertEq(name, got, want) {
  if (got !== want) throw new Error('CUSTODY FAIL ' + name + ': got ' + got + ' want ' + want);
  console.log('  OK  ' + name.padEnd(46) + ' ' + got);
}
console.log('--- Stage 0: custody of the parsed embeds ---');
assertEq('sum X, Y=2e7, all folds (embed: 203165)', sumX(W2e7, 5, 1499), 203165);
assertEq('sum X, Y=2e8, all folds (embed: 2031788)', sumX(W2e8, 5, 1499), 2031788);
assertEq('sum X, Y=2e9, all folds (embed: 20317943)', sumX(W2e9, 5, 1499), 20317943);
assertEq('sum X, Y=2e10, all folds (embed: 203176087)', sumX(W2e10, 5, 1499), 203176087);
assertEq('N2(p>=100), Y=2e7 (embed: 8)', Object.keys(W2e7).filter(p => +p >= 100).length, 8);
assertEq('N2(p>=100), Y=2e8 (embed: 21)', Object.keys(W2e8).filter(p => +p >= 100).length, 21);
assertEq('N2(p>=100), Y=2e9 (embed: 37)', Object.keys(W2e9).filter(p => +p >= 100).length, 37);
assertEq('N2(p>=100), Y=2e10 (embed: 50)', Object.keys(W2e10).filter(p => +p >= 100).length, 50);
assertEq('N2(p>=100), offset window (embed: 40)', Object.keys(WOFF).filter(p => +p >= 100).length, 40);
assertEq('N2(p>=100), W=2e11 (embed: 69)', Object.keys(W2e11).filter(p => +p >= 100).length, 69);
assertEq('sum X(p>=100), W=2e11 (embed: 190961)', sumX(W2e11, 100, 1499), 190961);
assertEq('sum X, W=2e11, all folds (embed: 2031759826)', sumX(W2e11, 5, 1499), 2031759826);
assertEq('B2 rows parsed = all primes in [307,709]', Object.keys(B2).length,
  PRIMES.filter(p => p >= 307 && p <= 709).length);
for (const p of PRIMES.filter(p => p >= 307 && p <= 709))
  if (!B2[p]) throw new Error('B2 missing prime ' + p);
assertEq('D3 rows parsed (p>=300 scored folds)', Object.keys(D3).length, 37);

// ---------------------------------------------------------------------------
// Stage 1 — the model mean lambda(p, W=2e11): verbatim for p >= 307,
//           reconstructed for p in [101, 306], then validated hard
// ---------------------------------------------------------------------------
console.log('\n--- Stage 1: the model mean, verbatim + reconstructed, validated ---');
const A_FIT = 2.4312e-2, C_FIT = 1.0818, WBIG = 2e11;

// mbar_before(p) for p in [101, 306] comes from the embedded mbar chains:
// mbar_after(q) at q = prevprime(p). Prefer the 2e9 chain (the model's own
// definition uses the measured 2e9 mbar), fill its three gaps (223, 281, 283)
// from the 2e10 chain, and cross-check every value that appears in both.
const mbarAfter = {};
for (const [tbl, name] of [[W2e9, '2e9'], [W2e10, '2e10'], [W2e11, '2e11']]) {
  for (const k in tbl) {
    const p = +k, v = tbl[k].mbar;
    if (!(p in mbarAfter)) mbarAfter[p] = v;
    else if (Math.abs(mbarAfter[p] / v - 1) > 0.0025)
      throw new Error('mbar chain disagreement at p=' + p + ' (' + name + '): ' + mbarAfter[p] + ' vs ' + v);
  }
}
function prevprime(p) { const i = PRIMES.indexOf(p); return PRIMES[i - 1]; }
const LAM5 = {};   // lambda_model at W = 2e11
const MBARB = {};  // mbar_before used
for (const p of PRIMES) {
  if (p < 101 || p > 709) continue;
  if (B2[p]) { LAM5[p] = B2[p].Efit; MBARB[p] = B2[p].mbarBefore; continue; }
  if (p > 306) continue; // B2 covers all folds in [307, 709]
  const q = prevprime(p);
  const mb = mbarAfter[q];
  if (mb === undefined) throw new Error('mbar_before missing for p=' + p + ' (needs after ' + q + ')');
  MBARB[p] = mb;
  LAM5[p] = (2 * WBIG / (p * mb)) * A_FIT * Math.exp(-C_FIT * THETA[p] / mb);
}

// V1: the formula reproduces the verbatim B2 column on B2's own inputs
// tolerance: Efit is PRINTED to 3 decimals, so a fold with Efit ~ 0.05 carries
// up to 1% pure print-rounding; gate on |err| < 2e-3 * Efit + 6e-4 (abs)
let maxexc = 0, v1fail = 0;
for (const k in B2) {
  const p = +k, b = B2[k];
  const lam = b.kills * A_FIT * Math.exp(-C_FIT * b.tom);
  const err = Math.abs(lam - b.Efit), tol = 2e-3 * b.Efit + 6e-4;
  maxexc = Math.max(maxexc, err / tol);
  if (err > tol) v1fail++;
}
console.log('  V1 formula vs verbatim B2 E[X] fitted: max err/tolerance = ' + maxexc.toFixed(2) +
  ', folds outside tolerance = ' + v1fail + (v1fail === 0 ? '  OK' : '  FAIL'));
if (v1fail > 0) throw new Error('V1 failed');

// V2: decade sum [100, 300) against the prereg's 1.996e5, and the p >= 100
// total against D4's 2.004481e5 (B2 stops at 709; the omitted tail is < 0.5
// by the embedded cumulative table, 2.5e-6 of the total)
let s100300 = 0, s100 = 0;
for (const k in LAM5) { const p = +k; if (p < 300) s100300 += LAM5[k]; s100 += LAM5[k]; }
console.log('  V2 sum lambda [100,300) = ' + s100300.toFixed(1) + '  vs prereg 1.996e5  (ratio ' + (s100300 / 1.996e5).toFixed(4) + ')');
console.log('     sum lambda p>=100    = ' + s100.toFixed(1) + '  vs D4 2.004481e5 (ratio ' + (s100 / 2.004481e5).toFixed(4) + ')');
if (Math.abs(s100300 / 1.996e5 - 1) > 2e-3 || Math.abs(s100 / 2.004481e5 - 1) > 2e-3) throw new Error('V2 failed');

// V3: reproduce the registered clause EXACTLY: 74 folds with lambda >= 1,
// 32 inside +-3 sqrt(lambda), and every printed p >= 300 inside-flag
let n74 = 0, nin = 0, flagsOK = true, boundary = [];
for (const k in LAM5) {
  const p = +k, lam = LAM5[k];
  if (lam < 1) continue;
  n74++;
  const X = W2e11[p] ? W2e11[p].X : 0;
  const lo = Math.max(0, lam - 3 * Math.sqrt(lam)), hi = lam + 3 * Math.sqrt(lam);
  const inside = X >= lo && X <= hi;
  if (inside) nin++;
  if (D3[p] && D3[p].inside !== inside) flagsOK = false;
  const d = Math.min(Math.abs(X - lo), Math.abs(X - hi));
  if (d < 0.02 * (3 * Math.sqrt(lam))) boundary.push(p);
}
console.log('  V3 registered clause replay: ' + nin + ' of ' + n74 + ' inside (embed: 32 of 74)' +
  ((nin === 32 && n74 === 74) ? '  OK' : '  FAIL') + ';  p>=300 flags all match: ' + flagsOK +
  (boundary.length ? ';  near-boundary folds: ' + boundary.join(',') : ''));
if (nin !== 32 || n74 !== 74 || !flagsOK) throw new Error('V3 failed');

// the six windows; lambda(p, Y) = LAM5[p] * Y / 2e11 exactly (model linear in Y)
const WINDOWS = [
  { name: '2e7', Y: 2e7, X: W2e7 },
  { name: '2e8', Y: 2e8, X: W2e8 },
  { name: '2e9', Y: 2e9, X: W2e9 },
  { name: '2e9off', Y: 2e9, X: WOFF },
  { name: '2e10', Y: 2e10, X: W2e10 },
  { name: '2e11', Y: 2e11, X: W2e11 },
];
const FOLDS = Object.keys(LAM5).map(Number).sort((a, b) => a - b); // primes in [101, 709]
const lam = (p, w) => LAM5[p] * w.Y / WBIG;
const xOf = (p, w) => (w.X[p] ? w.X[p].X : 0);
console.log('  fold universe: ' + FOLDS.length + ' primes in [101, 709];  6 windows (4 fit-eligible + 2 held)');

// ---------------------------------------------------------------------------
// numerics: lgamma, Poisson / NB / Poisson-lognormal pmfs, quantiles, RNG
// ---------------------------------------------------------------------------
function lgamma(x) { // Lanczos g=7, n=9
  const g = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313,
    -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x);
  x -= 1; let a = g[0]; const t = x + 7.5;
  for (let i = 1; i < 9; i++) a += g[i] / (x + i);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}
const logPois = (x, m) => (m <= 0 ? (x === 0 ? 0 : -Infinity) : x * Math.log(m) - m - lgamma(x + 1));
// NB with mean mu, dispersion k: Var = mu + mu^2/k
function logNB(x, mu, k) {
  if (mu <= 0) return x === 0 ? 0 : -Infinity;
  const q = mu / (mu + k);
  return lgamma(x + k) - lgamma(k) - lgamma(x + 1) + k * Math.log(1 - q) + x * Math.log(q);
}
// central interval [ql, qh] of a pmf given as logf(x); scan from 0 upward
function centralInterval(logf, mean, sd, alpha) {
  const hi = Math.ceil(mean + 12 * sd + 20);
  let c = 0, lo = -1, up = -1;
  for (let x = 0; x <= hi; x++) {
    c += Math.exp(logf(x));
    if (lo < 0 && c >= alpha / 2) lo = x;
    if (up < 0 && c >= 1 - alpha / 2) { up = x; break; }
  }
  if (up < 0) up = hi;
  if (lo < 0) lo = 0;
  return [lo, up];
}
// sfc32: standard seeded 32-bit RNG (<< and >>> here are its defined 32-bit
// semantics; nothing in this file builds residue bitmasks)
function sfc32(a, b, c, d) {
  return function () {
    a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
    let t = (a + b) | 0; a = b ^ (b >>> 9); b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11); d = (d + 1) | 0; t = (t + d) | 0; c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}
function makeRng(seed) { const r = sfc32(0x9e3779b9 ^ seed, 0x243f6a88, 0xb7e15162, seed | 1); for (let i = 0; i < 20; i++) r(); return r; }
function gauss(rng) { let u = 0, v = 0; while (u === 0) u = rng(); while (v === 0) v = rng(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
function rpois(rng, m) { // exact (Knuth) below 30, normal-rounded above; disclosed
  if (m <= 0) return 0;
  if (m < 30) { const L = Math.exp(-m); let k = 0, pr = 1; do { k++; pr *= rng(); } while (pr > L); return k - 1; }
  return Math.max(0, Math.round(m + Math.sqrt(m) * gauss(rng)));
}
function rgamma(rng, k) { // Marsaglia-Tsang, mean k; scale afterwards
  if (k < 1) { const u = rng(); return rgamma(rng, k + 1) * Math.pow(u, 1 / k); }
  const d = k - 1 / 3, c = 1 / Math.sqrt(9 * d);
  for (;;) {
    let x, v; do { x = gauss(rng); v = 1 + c * x; } while (v <= 0);
    v = v * v * v; const u = rng();
    if (u < 1 - 0.0331 * x * x * x * x) return d * v;
    if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v;
  }
}
// Poisson-lognormal logpmf: ln M ~ N(-s^2/2, s^2) (mean-1 mixing), numeric
const PLN_T = []; { for (let t = -8; t <= 8.0001; t += 0.1) PLN_T.push(t); }
function logPLN(x, mu, s) {
  if (s < 1e-4) return logPois(x, mu);
  let best = -Infinity; const terms = [];
  for (const t of PLN_T) {
    const w = Math.exp(-t * t / 2) / Math.sqrt(2 * Math.PI) * 0.1;
    const m = mu * Math.exp(s * t - s * s / 2);
    const lt = Math.log(w) + logPois(x, m);
    terms.push(lt); if (lt > best) best = lt;
  }
  let acc = 0; for (const lt of terms) acc += Math.exp(lt - best);
  return best + Math.log(acc);
}

// ---------------------------------------------------------------------------
// the battery: given data {get(p, w)}, compute the diagnostics and fits
// ---------------------------------------------------------------------------
const FITW = WINDOWS.filter(w => ['2e7', '2e8', '2e9', '2e9off'].includes(w.name));
const HELD10 = WINDOWS.find(w => w.name === '2e10');
const HELD11 = WINDOWS.find(w => w.name === '2e11');
const SEQFITW = WINDOWS.filter(w => w.name !== '2e11'); // for M4b: everything before 2e11

function battery(getX, opts) {
  const quiet = opts && opts.quiet;
  const out = {};
  // (a) global bias on the fit set
  let sx = 0, sl = 0;
  for (const w of FITW) for (const p of FOLDS) { sx += getX(p, w); sl += lam(p, w); }
  const bias = sx / sl; out.bias = bias;

  // (b) variance-vs-mean: Pearson z^2 against bias-corrected mean, in lambda bins
  const bins = [[1, 3], [3, 10], [10, 30], [30, 100], [100, 1e9]];
  out.varbins = bins.map(([lo, hi]) => {
    let s2 = 0, n = 0;
    for (const w of WINDOWS) for (const p of FOLDS) {
      const m = bias * lam(p, w); if (m < lo || m >= hi) continue;
      const z = (getX(p, w) - m) / Math.sqrt(m); s2 += z * z; n++;
    }
    return { lo, hi, n, vz: n ? s2 / n : NaN };
  });

  // (c) anchor-replicate test: 2e9 vs 2e9off, sum (X0-X1)^2/(X0+X1)
  const w9 = WINDOWS.find(w => w.name === '2e9'), w9o = WINDOWS.find(w => w.name === '2e9off');
  let chiA = 0, dfA = 0;
  for (const p of FOLDS) {
    const a = getX(p, w9), b = getX(p, w9o);
    if (a + b === 0) continue;
    chiA += (a - b) * (a - b) / (a + b); dfA++;
  }
  out.anchor = { chi: chiA, df: dfA };

  // (d) cross-window fold-factor deviance: pooled Mhat per fold over ALL
  // windows, Poisson deviance of every (p, w) with lambda >= 0.5 against it
  let G = 0, dfG = 0;
  for (const p of FOLDS) {
    let px = 0, pl = 0; const cells = [];
    for (const w of WINDOWS) { const l = lam(p, w); if (l < 0.5) continue; px += getX(p, w); pl += l; cells.push(w); }
    if (cells.length < 2 || px === 0) continue;
    const Mh = px / pl;
    for (const w of cells) {
      const x = getX(p, w), m = Mh * lam(p, w);
      G += 2 * (x > 0 ? x * Math.log(x / m) : 0) - 2 * (x - m);
    }
    dfG += cells.length - 1;
  }
  out.folddev = { G, df: dfG };

  // (e) neighbour correlation of Pearson residuals within each window
  //     (block-variance candidate), on folds with bias*lambda >= 1
  let sxy = 0, sxx = 0, syy = 0, nn = 0;
  for (const w of WINDOWS) {
    let prev = null;
    for (const p of FOLDS) {
      const m = bias * lam(p, w);
      if (m < 1) { prev = null; continue; }
      const z = (getX(p, w) - m) / Math.sqrt(m);
      if (prev !== null) { sxy += prev * z; sxx += prev * prev; syy += z * z; nn++; }
      prev = z;
    }
  }
  out.neigh = { r: nn ? sxy / Math.sqrt(sxx * syy) : NaN, n: nn };

  // (f) MLE of NB k (i.i.d. per cell) and Poisson-lognormal s on the FIT set
  function llNB(k) { let s = 0; for (const w of FITW) for (const p of FOLDS) s += logNB(getX(p, w), bias * lam(p, w), k); return s; }
  function llPLN(sig) { let s = 0; for (const w of FITW) for (const p of FOLDS) s += logPLN(getX(p, w), bias * lam(p, w), sig); return s; }
  function goldmax(f, lo, hi, it) {
    const gr = (Math.sqrt(5) - 1) / 2;
    let a = lo, b = hi, c = b - gr * (b - a), d = a + gr * (b - a), fc = f(c), fd = f(d);
    for (let i = 0; i < it; i++) { if (fc > fd) { b = d; d = c; fd = fc; c = b - gr * (b - a); fc = f(c); } else { a = c; c = d; fc = fd; d = a + gr * (b - a); fd = f(d); } }
    return (a + b) / 2;
  }
  const lnk = goldmax(t => llNB(Math.exp(t)), Math.log(0.05), Math.log(500), 40);
  out.kNB = Math.exp(lnk); out.llNBfit = llNB(out.kNB);
  out.sPLN = goldmax(s => llPLN(s), 0.01, 2.5, 30); out.llPLNfit = llPLN(out.sPLN);
  out.llPoisFit = (() => { let s = 0; for (const w of FITW) for (const p of FOLDS) s += logPois(getX(p, w), bias * lam(p, w)); return s; })();

  // (g) held-out scoring
  function scoreHeld(held, fitset, tag) {
    const pop = FOLDS.filter(p => lam(p, held) >= 1);
    // refit bias/k/s on fitset (bias always; k, s reused from FIT set when
    // fitset === FITW, refitted cheaply otherwise)
    let fx = 0, fl = 0;
    for (const w of fitset) for (const p of FOLDS) { fx += getX(p, w); fl += lam(p, w); }
    const b2 = fx / fl;
    const models = {};
    // M0 Poisson(lambda) — the registered clause's model
    // M1 Poisson(b*lambda) — hot-corrected Poisson
    // M2 NB(b*lambda, k) — i.i.d. overdispersion
    // M3 PLN(b*lambda, s) — heavy-tailed i.i.d. mixture
    // M4 deterministic fold factor: NB predictive from the fold's own fit-set
    //    exposure, r = Sx + 1/2, q = lam_h/(lam_h + Slam)  (Gamma(1/2) prior)
    let k = out.kNB, s = out.sPLN;
    if (fitset !== FITW) {
      const llNB2 = kk => { let t = 0; for (const w of fitset) for (const p of FOLDS) t += logNB(getX(p, w), b2 * lam(p, w), kk); return t; };
      k = Math.exp(goldmax(t => llNB2(Math.exp(t)), Math.log(0.05), Math.log(500), 35));
      const llPLN2 = ss => { let t = 0; for (const w of fitset) for (const p of FOLDS) t += logPLN(getX(p, w), b2 * lam(p, w), ss); return t; };
      s = goldmax(llPLN2, 0.01, 2.5, 25);
    }
    for (const name of ['M0', 'M1', 'M2', 'M3', 'M4']) models[name] = { ll: 0, in90: 0, in997: 0 };
    for (const p of pop) {
      const lh = lam(p, held), x = getX(p, held);
      let Sx = 0, Sl = 0;
      for (const w of fitset) { Sx += getX(p, w); Sl += lam(p, w); }
      const cases = {
        M0: { logf: xx => logPois(xx, lh), mean: lh, sd: Math.sqrt(lh) },
        M1: { logf: xx => logPois(xx, b2 * lh), mean: b2 * lh, sd: Math.sqrt(b2 * lh) },
        M2: { logf: xx => logNB(xx, b2 * lh, k), mean: b2 * lh, sd: Math.sqrt(b2 * lh + (b2 * lh) ** 2 / k) },
        M3: { logf: xx => logPLN(xx, b2 * lh, s), mean: b2 * lh, sd: Math.sqrt(b2 * lh + (b2 * lh) ** 2 * (Math.exp(s * s) - 1)) },
        M4: (() => {
          const r = Sx + 0.5, q = lh / (lh + Sl);
          const mean = r * q / (1 - q), sd = Math.sqrt(mean / (1 - q));
          return { logf: xx => lgamma(xx + r) - lgamma(r) - lgamma(xx + 1) + r * Math.log(1 - q) + xx * Math.log(q), mean, sd };
        })(),
      };
      for (const name in cases) {
        const c = cases[name];
        models[name].ll += c.logf(x);
        const [l90, u90] = centralInterval(c.logf, c.mean, c.sd, 0.10);
        if (x >= l90 && x <= u90) models[name].in90++;
        const [l99, u99] = centralInterval(c.logf, c.mean, c.sd, 0.0027);
        if (x >= l99 && x <= u99) models[name].in997++;
      }
    }
    return { tag, n: pop.length, b: b2, k, s, models };
  }
  out.held10 = scoreHeld(HELD10, FITW, 'held 2e10 | fit {2e7,2e8,2e9,off}');
  out.held11 = scoreHeld(HELD11, FITW, 'held 2e11 | fit {2e7,2e8,2e9,off}');
  out.held11seq = scoreHeld(HELD11, SEQFITW, 'held 2e11 | fit {all five prior}');
  return out;
}

function printBattery(tag, r) {
  console.log('  [' + tag + ']  bias b = ' + r.bias.toFixed(4) +
    ';  NB k = ' + r.kNB.toFixed(3) + ';  PLN sigma = ' + r.sPLN.toFixed(3));
  console.log('    var(z) by lambda bin: ' + r.varbins.map(b =>
    '[' + b.lo + ',' + (b.hi > 1e8 ? 'inf' : b.hi) + '):' + (isNaN(b.vz) ? '--' : b.vz.toFixed(2)) + '(n=' + b.n + ')').join('  '));
  console.log('    anchor replicate chi/df = ' + r.anchor.chi.toFixed(1) + '/' + r.anchor.df +
    ' = ' + (r.anchor.chi / r.anchor.df).toFixed(2) +
    ';  fold-factor deviance G/df = ' + r.folddev.G.toFixed(1) + '/' + r.folddev.df + ' = ' + (r.folddev.G / r.folddev.df).toFixed(2) +
    ';  neighbour r = ' + r.neigh.r.toFixed(3) + ' (n=' + r.neigh.n + ')');
  for (const h of [r.held10, r.held11, r.held11seq]) {
    const m = h.models;
    console.log('    ' + h.tag + '  (n=' + h.n + ', b=' + h.b.toFixed(3) + ', k=' + h.k.toFixed(2) + ', s=' + h.s.toFixed(2) + ')');
    console.log('      model        loglik      in-90%     in-99.7%');
    for (const name of ['M0', 'M1', 'M2', 'M3', 'M4'])
      console.log('      ' + name + '  ' + m[name].ll.toFixed(1).padStart(12) + '  ' +
        (m[name].in90 + '/' + h.n).padStart(9) + '  ' + (m[name].in997 + '/' + h.n).padStart(9));
  }
}

// ---------------------------------------------------------------------------
// Stage 2 — CONTROLS: the battery against three known truths, same lambda grid
// ---------------------------------------------------------------------------
console.log('\n--- Stage 2: controls (truth known, same lambda grid, same battery) --- [' + el() + ']');
function makeControl(kind, seed) {
  const rng = makeRng(seed);
  const M = {};
  if (kind === 'B') for (const p of FOLDS) M[p] = Math.exp(0.6 * gauss(rng) - 0.18);
  const data = {};
  for (const w of WINDOWS) {
    data[w.name] = {};
    for (const p of FOLDS) {
      const l = lam(p, w);
      let m = l;
      if (kind === 'B') m = l * M[p];
      if (kind === 'C') m = l * rgamma(rng, 3) / 3;
      data[w.name][p] = rpois(rng, m);
    }
  }
  return (p, w) => data[w.name][p];
}
const ctlA = battery(makeControl('A', 11), {});
printBattery('control A: Poisson, no extra term', ctlA);
const ctlB = battery(makeControl('B', 22), {});
printBattery('control B: fixed fold factor, sigma=0.6', ctlB);
const ctlC = battery(makeControl('C', 33), {});
printBattery('control C: i.i.d. NB, k=3', ctlC);

// hard calibration gates: the battery must read the truths correctly
function gate(name, ok) { console.log('  GATE ' + name + ': ' + (ok ? 'PASS' : 'FAIL')); if (!ok) throw new Error('calibration gate failed: ' + name); }
gate('A reads as Poisson (k > 50, sigma < 0.15, G/df < 1.6)',
  ctlA.kNB > 50 && ctlA.sPLN < 0.15 && ctlA.folddev.G / ctlA.folddev.df < 1.6);
gate('B reads as fold-factor (G/df < 2 with anchor chi/df < 1.7, and M4 beats M2 on held 2e11)',
  ctlB.folddev.G / ctlB.folddev.df < 2 && ctlB.anchor.chi / ctlB.anchor.df < 1.7 &&
  ctlB.held11seq.models.M4.ll > ctlB.held11seq.models.M2.ll);
gate('C reads as i.i.d. NB (fold-factor deviance blows up: G/df > 3, and M2 beats M4 on held 2e11)',
  ctlC.folddev.G / ctlC.folddev.df > 3 && ctlC.held11seq.models.M2.ll > ctlC.held11seq.models.M4.ll);
gate('A: sigma-PLN and k-NB do not invent overdispersion (var(z) in [1,3) bin within [0.5, 1.6])',
  ctlA.varbins[0].vz > 0.5 && ctlA.varbins[0].vz < 1.6);

// ---------------------------------------------------------------------------
// Stage 3 — the real data through the same battery
// ---------------------------------------------------------------------------
console.log('\n--- Stage 3: the real data, same battery --- [' + el() + ']');
const real = battery(xOf, {});
printBattery('REAL', real);

// the registered-clause replay at window 5 for each model, exactly the D3
// population (74 folds, lambda >= 1, NO bias correction on M0 by definition)
console.log('\n  registered-clause replay at W=2e11 (population: 74 folds, lambda>=1):');
{
  const held = HELD11, pop = FOLDS.filter(p => lam(p, held) >= 1);
  const b = real.held11seq.b, k = real.held11seq.k, s = real.held11seq.s;
  const rows = [];
  const count = (name, logf) => {
    let c = 0;
    for (const p of pop) {
      const x = xOf(p, held);
      const f = logf(p);
      const [lo, hi] = centralInterval(f.logf, f.mean, f.sd, 0.0027);
      if (x >= lo && x <= hi) c++;
    }
    rows.push('    ' + name.padEnd(58) + c + '/' + pop.length + ' = ' + (100 * c / pop.length).toFixed(1) + '%');
  };
  count('M0  Poisson(lambda), the registered +-3sqrt clause', p => { const l = lam(p, held); return { logf: x => logPois(x, l), mean: l, sd: Math.sqrt(l) }; });
  count('M1  Poisson(b*lambda), hot-corrected', p => { const l = b * lam(p, held); return { logf: x => logPois(x, l), mean: l, sd: Math.sqrt(l) }; });
  count('M2  NB(b*lambda, k), i.i.d. overdispersion', p => { const l = b * lam(p, held); return { logf: x => logNB(x, l, k), mean: l, sd: Math.sqrt(l + l * l / k) }; });
  count('M3  PLN(b*lambda, s), heavy-tailed i.i.d. mixture', p => { const l = b * lam(p, held); return { logf: x => logPLN(x, l, s), mean: l, sd: Math.sqrt(l + l * l * (Math.exp(s * s) - 1)) }; });
  count('M4  fold-factor NB predictive from the five prior windows', p => {
    let Sx = 0, Sl = 0; for (const w of SEQFITW) { Sx += xOf(p, w); Sl += lam(p, w); }
    const lh = lam(p, held), r = Sx + 0.5, q = lh / (lh + Sl);
    const mean = r * q / (1 - q), sd = Math.sqrt(mean / (1 - q));
    return { logf: x => lgamma(x + r) - lgamma(r) - lgamma(x + 1) + r * Math.log(1 - q) + x * Math.log(q), mean, sd };
  });
  for (const r of rows) console.log(r);
}

// per-fold factor table: the strongest exposures, pooled Mhat with its own
// Poisson standard error, to show the factor is real and window-stable
console.log('\n  pooled fold factors Mhat = sum X / sum lambda (all six windows), folds with sum lambda >= 30:');
console.log('    p    theta  Mhat    +-se     per-window X/lambda');
const MHAT = {};
for (const p of FOLDS) {
  let Sx = 0, Sl = 0; const parts = [];
  for (const w of WINDOWS) { const l = lam(p, w); Sx += xOf(p, w); Sl += l; if (l >= 3) parts.push((xOf(p, w) / l).toFixed(2)); }
  MHAT[p] = { M: Sx / Sl, se: Math.sqrt(Sx) / Sl || 0, Sl, Sx };
  if (Sl >= 30) console.log('    ' + String(p).padEnd(5) + String(THETA[p]).padEnd(6) + ' ' +
    (Sx / Sl).toFixed(3) + '  ' + (Math.sqrt(Math.max(Sx, 1)) / Sl).toFixed(3) + '   ' + parts.join(' '));
}

// --- Stage 3b: unify M_p with import-stein's DERIVED first moment ---------
// import-stein-01's embedded B2 table prints, at Y = 2e9, the zero-parameter
// derived lambda_p (the window's own qualifying gaps, counted). If the fold
// factor is real, M_p should BE lambda_derived / lambda_model at each fold:
// the roughness the smooth law misses is the first moment itself.
{
  const srcStein = readSrc('import-stein-01-multikill.js');
  const steinRows = parseTable(srcStein, /p  theta  theta\/mbar    Q      lambda      X/, 1);
  console.log('\n  Stage 3b: M_p against import-stein\'s derived lambda_p / lambda_model at Y = 2e9:');
  console.log('    p    lam_derived  lam_model   ratio    pooled Mhat  (+-2se)   agree?');
  let nAgree = 0, nTot = 0;
  for (const c of steinRows) {
    // rows are space-separated in that table, not pipe-separated
    const f = c[0].split(/\s+/).map(Number);
    if (f.length < 6 || !isPrime(f[0])) continue;
    const p = f[0], lamDer = f[4];
    if (!(p in LAM5) || lamDer <= 0) continue;
    const lamMod = LAM5[p] * 1e-2; // lambda_model at Y = 2e9
    const ratio = lamDer / lamMod;
    const mh = MHAT[p];
    if (mh.Sx < 15) continue; // only folds where Mhat has any precision
    const se = Math.sqrt(Math.max(mh.Sx, 1)) / mh.Sl;
    const ok = Math.abs(ratio - mh.M) <= 2 * se + 0.05 * mh.M;
    nTot++; if (ok) nAgree++;
    console.log('    ' + String(p).padEnd(5) + lamDer.toExponential(3).padStart(10) + '  ' +
      lamMod.toFixed(3).padStart(9) + '  ' + ratio.toFixed(3).padStart(6) + '   ' +
      mh.M.toFixed(3).padStart(6) + '  (+-' + (2 * se).toFixed(3) + ')   ' + (ok ? 'yes' : 'NO'));
  }
  console.log('    agreement: ' + nAgree + ' of ' + nTot +
    '  -> M_p and the derived-first-moment ratio are the same object');
}

// --- Stage 3c: the M field summarised -------------------------------------
{
  const well = FOLDS.filter(p => MHAT[p].Sx >= 25);
  const lnM = well.map(p => Math.log(MHAT[p].M));
  const mean = lnM.reduce((a, b) => a + b, 0) / lnM.length;
  const sd = Math.sqrt(lnM.reduce((a, b) => a + (b - mean) * (b - mean), 0) / (lnM.length - 1));
  const dec = [[100, 200], [200, 300], [300, 500]].map(([lo, hi]) => {
    let sx = 0, sl = 0;
    for (const p of FOLDS) if (p >= lo && p < hi) { sx += MHAT[p].Sx; sl += MHAT[p].Sl; }
    return '[' + lo + ',' + hi + '): ' + (sx / sl).toFixed(3);
  });
  console.log('\n  Stage 3c: the M field over the ' + well.length + ' folds with sum X >= 25:');
  console.log('    mean ln M = ' + mean.toFixed(3) + ',  sd ln M = ' + sd.toFixed(3) +
    ',  range of M = [' + Math.min(...well.map(p => MHAT[p].M)).toFixed(3) + ', ' +
    Math.max(...well.map(p => MHAT[p].M)).toFixed(3) + ']');
  console.log('    exposure-weighted mean M by band of p: ' + dec.join('   ') +
    '   <- the known ~20% deep-decade count overprediction IS the deep tail of this field');
}

// does the fold factor correlate with the singular-series comb weight of the
// dominant qualifying gap value theta_p? (mechanism probe, not a fit)
{
  let n = 0, sx = 0, sy = 0, sxy = 0, sxx = 0, syy = 0;
  for (const p of FOLDS) {
    if (MHAT[p].Sl < 30) continue;
    let wgt = 1, g = THETA[p];
    for (let q = 5; q * q <= g || q <= g; q += 2) { if (q > g) break; if (!isPrime(q)) continue; if (g % q === 0) wgt *= (q - 1) / (q - 2); }
    const x = Math.log(wgt), y = Math.log(MHAT[p].M);
    n++; sx += x; sy += y; sxy += x * y; sxx += x * x; syy += y * y;
  }
  const r = (n * sxy - sx * sy) / Math.sqrt((n * sxx - sx * sx) * (n * syy - sy * sy));
  console.log('  mechanism probe: corr(ln Mhat, ln comb-weight of theta_p) = ' + r.toFixed(3) + ' over ' + n + ' folds');
}

// ---------------------------------------------------------------------------
// Stage 4 — the BLIND per-fold prediction for a window that has never been
// run: Y = 2e9 anchored at A = 66000000000 (a multiple of 6; no window in the
// corpus has used this anchor). PREDICTION ONLY — this script measures
// nothing there. For each fold, the fold-factor predictive is
//   X ~ NB(r = Sx + 1/2, q = lam_h / (lam_h + Slam)),
// Sx and Slam pooled over ALL SIX embedded windows, lam_h = lambda_model at
// Y = 2e9. Because Slam is ~112x lam_h, the predictive is nearly
// Poisson(lam_h * Mhat_p): the fold factor carries almost all of the width.
// The registered Poisson-around-model clause is printed beside it as the
// contrast, with its own predicted (low) coverage under this model.
// ---------------------------------------------------------------------------
console.log('\n--- Stage 4: BLIND per-fold bands for the unrun window [A, A+2e9), A = 6.6e10 --- [' + el() + ']');
{
  const YNEW = 2e9;
  const rows = [];
  let expM0 = 0, expM4in90 = 0;
  for (const p of FOLDS) {
    const lh = LAM5[p] * YNEW / WBIG;
    let Sx = 0, Sl = 0;
    for (const w of WINDOWS) { Sx += xOf(p, w); Sl += lam(p, w); }
    const r = Sx + 0.5, q = lh / (lh + Sl);
    const mean = r * q / (1 - q), sd = Math.sqrt(mean / (1 - q));
    if (mean < 1 && lh < 1) continue;
    const logf = x => lgamma(x + r) - lgamma(r) - lgamma(x + 1) + r * Math.log(1 - q) + x * Math.log(q);
    const [l90, u90] = centralInterval(logf, mean, sd, 0.10);
    const [l99, u99] = centralInterval(logf, mean, sd, 0.0027);
    // predicted probability that X lands in the OLD Poisson clause band
    const plo = Math.max(0, Math.ceil(lh - 3 * Math.sqrt(lh))), phi = Math.floor(lh + 3 * Math.sqrt(lh));
    let pM0 = 0; for (let x = plo; x <= phi; x++) pM0 += Math.exp(logf(x));
    expM0 += pM0;
    let pIn = 0; for (let x = l90; x <= u90; x++) pIn += Math.exp(logf(x));
    expM4in90 += pIn;
    rows.push({ p, lh, Sx, Sl, mean, l90, u90, l99, u99, pM0 });
  }
  console.log('  population: folds p >= 100 with predictive mean >= 1 or lambda_model >= 1: ' + rows.length + ' folds');
  console.log('    p    lam_model   Sx      Slam      pred.mean   90% band     99.73% band   P(old +-3sqrt clause)');
  for (const r of rows)
    console.log('    ' + String(r.p).padEnd(5) + r.lh.toFixed(2).padStart(8) + '  ' +
      String(r.Sx).padStart(6) + '  ' + r.Sl.toFixed(1).padStart(8) + '  ' + r.mean.toFixed(2).padStart(9) +
      '   ' + ('[' + r.l90 + ', ' + r.u90 + ']').padEnd(13) + ' ' + ('[' + r.l99 + ', ' + r.u99 + ']').padEnd(13) + ' ' + r.pM0.toFixed(2));
  console.log('  expected count inside the 90% predictive bands = ' + expM4in90.toFixed(1) + ' of ' + rows.length);
  console.log('  expected count inside the OLD Poisson +-3sqrt(lambda_model) clause = ' + expM0.toFixed(1) + ' of ' + rows.length +
    '  <- the contrast: the registered clause is predicted to keep failing');
  console.log('  scoring proposal for the prereg: HIT if >= ceil(0.75 * n) folds are inside their 90% band');
  console.log('  and at most one fold escapes its 99.73% band; the old clause is printed, not scored.');
}

// ---------------------------------------------------------------------------
// READINGS (assembled by the code so numbers cannot drift from the run)
// ---------------------------------------------------------------------------
console.log('\n============================================================');
console.log('READINGS');
console.log('============================================================');
console.log('1. CUSTODY + REPLAY: every parsed aggregate matches its embed digit for');
console.log('   digit, and the registered clause replays exactly (' + nin + ' of ' + n74 + ' inside at');
console.log('   W = 2e11, the record\'s 43.2%). The lambda reconstruction reproduces the');
console.log('   prereg decade sum and D4 total to <0.2%, so the model mean under test is');
console.log('   the law\'s own, not a re-derivation.');
console.log('2. CONTROLS: the battery reads a pure-Poisson truth as Poisson, a fixed');
console.log('   fold-factor truth as fold-factor, and an i.i.d.-NB truth as i.i.d.');
console.log('   overdispersion (all gates PASS above), so what it says about the real');
console.log('   data is calibrated, not shape-assumed.');
console.log('3. THE VERDICT GATES on the real data:');
{
  const g1 = real.anchor.chi / real.anchor.df, g2 = real.folddev.G / real.folddev.df;
  const m4wins10 = real.held10.models.M4.ll > real.held10.models.M2.ll;
  const m4wins11 = real.held11seq.models.M4.ll > real.held11seq.models.M2.ll;
  console.log('   anchor-replicate chi/df = ' + g1.toFixed(2) + ' (control B: ' +
    (ctlB.anchor.chi / ctlB.anchor.df).toFixed(2) + ', control C: ' + (ctlC.anchor.chi / ctlC.anchor.df).toFixed(2) + ')');
  console.log('   fold-factor deviance G/df = ' + g2.toFixed(2) + ' (control B: ' +
    (ctlB.folddev.G / ctlB.folddev.df).toFixed(2) + ', control C: ' + (ctlC.folddev.G / ctlC.folddev.df).toFixed(2) + ')');
  console.log('   M4 beats M2 held-out at 2e10: ' + m4wins10 + ' (by ' +
    (real.held10.models.M4.ll - real.held10.models.M2.ll).toFixed(1) + ' nats); at 2e11 (sequential): ' + m4wins11 +
    ' (by ' + (real.held11seq.models.M4.ll - real.held11seq.models.M2.ll).toFixed(1) + ' nats)');
  const verdict = g1 < 1.7 && g2 < 2 && m4wins10 && m4wins11;
  console.log('   => THE SURVIVING MODEL IS THE DETERMINISTIC FOLD FACTOR: ' + (verdict ? 'YES' : 'NO') +
    '. X_p ~ Poisson(lambda_model * M_p) with M_p a fixed number of the fold,');
  console.log('   identical across anchors and window lengths; i.i.d. NB (k ~ 3.5-4.2) is');
  console.log('   only the shadow this field casts when the fold identity is ignored, and');
  console.log('   window-level mixing / block-correlated noise are REFUTED by the anchor');
  console.log('   replicate at Poisson scale.');
}
console.log('4. Stage 3b ties M_p to import-stein P1: it is lambda_derived/lambda_model,');
console.log('   i.e. the error the law still misses is in the FIRST MOMENT (deterministic,');
console.log('   comb-structured: corr(ln M, ln comb-weight(theta)) printed above), not in');
console.log('   the noise; and the known ~20% hot-count systematic is the exposure-weighted');
console.log('   deep tail of the same field (Stage 3c).');
console.log('5. Stage 4 fixes the blind test: per-fold NB predictive bands for the unrun');
console.log('   window [6.6e10, 6.6e10 + 2e9), to be pre-registered and then produced by');
console.log('   attack-perfold-02. The old Poisson clause is predicted to keep failing');
console.log('   there; the fold-factor bands are predicted to cover at ~90%.');
console.log('[' + el() + '] done');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-perfold-01-error-model.js
//   invocation:  node research/attack-perfold-01-error-model.js
//   code-sha256: b2ee07d8754db73a7ebe6d10c37be99368d15d219d14acf7428d5423aab6d764
//   out-sha256:  a764a88aaa1b37fa3f945e985782885b427d7d7fb5aee0978ca7d074fc3708f0
//   body-lines:  278
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     142.0 s
// ============================================================================
// --- Stage 0: custody of the parsed embeds ---
//   OK  sum X, Y=2e7, all folds (embed: 203165)        203165
//   OK  sum X, Y=2e8, all folds (embed: 2031788)       2031788
//   OK  sum X, Y=2e9, all folds (embed: 20317943)      20317943
//   OK  sum X, Y=2e10, all folds (embed: 203176087)    203176087
//   OK  N2(p>=100), Y=2e7 (embed: 8)                   8
//   OK  N2(p>=100), Y=2e8 (embed: 21)                  21
//   OK  N2(p>=100), Y=2e9 (embed: 37)                  37
//   OK  N2(p>=100), Y=2e10 (embed: 50)                 50
//   OK  N2(p>=100), offset window (embed: 40)          40
//   OK  N2(p>=100), W=2e11 (embed: 69)                 69
//   OK  sum X(p>=100), W=2e11 (embed: 190961)          190961
//   OK  sum X, W=2e11, all folds (embed: 2031759826)   2031759826
//   OK  B2 rows parsed = all primes in [307,709]       65
//   OK  D3 rows parsed (p>=300 scored folds)           37
//
// --- Stage 1: the model mean, verbatim + reconstructed, validated ---
//   V1 formula vs verbatim B2 E[X] fitted: max err/tolerance = 0.68, folds outside tolerance = 0  OK
//   V2 sum lambda [100,300) = 199621.1  vs prereg 1.996e5  (ratio 1.0001)
//      sum lambda p>=100    = 200473.9  vs D4 2.004481e5 (ratio 1.0001)
//   V3 registered clause replay: 32 of 74 inside (embed: 32 of 74)  OK;  p>=300 flags all match: true;  near-boundary folds: 431,433,491,499,521,523
//   fold universe: 102 primes in [101, 709];  6 windows (4 fit-eligible + 2 held)
//
// --- Stage 2: controls (truth known, same lambda grid, same battery) --- [0.0s]
//   [control A: Poisson, no extra term]  bias b = 0.9927;  NB k = 500.000;  PLN sigma = 0.031
//     var(z) by lambda bin: [1,3):0.97(n=46)  [3,10):0.97(n=43)  [10,30):0.88(n=38)  [30,100):1.52(n=33)  [100,inf):0.89(n=71)
//     anchor replicate chi/df = 55.2/48 = 1.15;  fold-factor deviance G/df = 200.7/185 = 1.09;  neighbour r = -0.042 (n=225)
//     held 2e10 | fit {2e7,2e8,2e9,off}  (n=55, b=0.993, k=500.00, s=0.03)
//       model        loglik      in-90%     in-99.7%
//       M0        -180.9      52/55      55/55
//       M1        -180.6      51/55      55/55
//       M2        -186.0      53/55      55/55
//       M3        -184.0      53/55      55/55
//       M4        -223.6      52/55      55/55
//     held 2e11 | fit {2e7,2e8,2e9,off}  (n=74, b=0.993, k=500.00, s=0.03)
//       model        loglik      in-90%     in-99.7%
//       M0        -286.2      68/74      74/74
//       M1        -286.6      69/74      74/74
//       M2        -306.4      70/74      74/74
//       M3        -299.8      70/74      74/74
//       M4        -414.2      69/74      74/74
//     held 2e11 | fit {all five prior}  (n=74, b=0.994, k=500.00, s=0.01)
//       model        loglik      in-90%     in-99.7%
//       M0        -286.2      68/74      74/74
//       M1        -285.6      68/74      74/74
//       M2        -306.4      70/74      74/74
//       M3        -288.4      70/74      74/74
//       M4        -367.0      67/74      74/74
//   [control B: fixed fold factor, sigma=0.6]  bias b = 1.0203;  NB k = 1.911;  PLN sigma = 0.736
//     var(z) by lambda bin: [1,3):1.57(n=45)  [3,10):2.94(n=45)  [10,30):7.98(n=38)  [30,100):51.22(n=33)  [100,inf):1853.92(n=72)
//     anchor replicate chi/df = 47.5/48 = 0.99;  fold-factor deviance G/df = 164.6/185 = 0.89;  neighbour r = 0.094 (n=227)
//     held 2e10 | fit {2e7,2e8,2e9,off}  (n=55, b=1.020, k=1.91, s=0.74)
//       model        loglik      in-90%     in-99.7%
//       M0       -5448.2      26/55      31/55
//       M1       -5452.3      25/55      31/55
//       M2        -261.3      54/55      55/55
//       M3        -259.2      54/55      55/55
//       M4        -215.0      50/55      55/55
//     held 2e11 | fit {2e7,2e8,2e9,off}  (n=74, b=1.020, k=1.91, s=0.74)
//       model        loglik      in-90%     in-99.7%
//       M0      -52413.9      27/74      34/74
//       M1      -52439.2      25/74      32/74
//       M2        -426.1      73/74      74/74
//       M3        -457.4      72/74      74/74
//       M4        -399.4      71/74      74/74
//     held 2e11 | fit {all five prior}  (n=74, b=1.004, k=2.12, s=0.74)
//       model        loglik      in-90%     in-99.7%
//       M0      -52413.9      27/74      34/74
//       M1      -52412.4      25/74      34/74
//       M2        -425.1      73/74      74/74
//       M3        -450.4      72/74      74/74
//       M4        -354.3      65/74      74/74
//   [control C: i.i.d. NB, k=3]  bias b = 1.0038;  NB k = 2.790;  PLN sigma = 0.602
//     var(z) by lambda bin: [1,3):1.80(n=43)  [3,10):3.86(n=46)  [10,30):6.81(n=37)  [30,100):25.24(n=34)  [100,inf):553.30(n=71)
//     anchor replicate chi/df = 546.5/47 = 11.63;  fold-factor deviance G/df = 9215.9/184 = 50.09;  neighbour r = -0.206 (n=225)
//     held 2e10 | fit {2e7,2e8,2e9,off}  (n=55, b=1.004, k=2.79, s=0.60)
//       model        loglik      in-90%     in-99.7%
//       M0       -2916.1      20/55      30/55
//       M1       -2926.4      20/55      29/55
//       M2        -269.1      51/55      55/55
//       M3        -268.6      47/55      55/55
//       M4       -1085.2      31/55      39/55
//     held 2e11 | fit {2e7,2e8,2e9,off}  (n=74, b=1.004, k=2.79, s=0.60)
//       model        loglik      in-90%     in-99.7%
//       M0      -16299.8      27/74      34/74
//       M1      -16226.1      28/74      34/74
//       M2        -417.6      73/74      74/74
//       M3        -431.4      72/74      74/74
//       M4       -1120.2      44/74      55/74
//     held 2e11 | fit {all five prior}  (n=74, b=0.891, k=2.65, s=0.58)
//       model        loglik      in-90%     in-99.7%
//       M0      -16299.8      27/74      34/74
//       M1      -19901.8      29/74      32/74
//       M2        -418.9      73/74      74/74
//       M3        -457.0      72/74      74/74
//       M4       -3684.8      36/74      49/74
//   GATE A reads as Poisson (k > 50, sigma < 0.15, G/df < 1.6): PASS
//   GATE B reads as fold-factor (G/df < 2 with anchor chi/df < 1.7, and M4 beats M2 on held 2e11): PASS
//   GATE C reads as i.i.d. NB (fold-factor deviance blows up: G/df > 3, and M2 beats M4 on held 2e11): PASS
//   GATE A: sigma-PLN and k-NB do not invent overdispersion (var(z) in [1,3) bin within [0.5, 1.6]): PASS
//
// --- Stage 3: the real data, same battery --- [99.6s]
//   [REAL]  bias b = 0.9733;  NB k = 4.160;  PLN sigma = 0.484
//     var(z) by lambda bin: [1,3):1.53(n=45)  [3,10):3.28(n=45)  [10,30):7.54(n=36)  [30,100):15.54(n=34)  [100,inf):475.79(n=70)
//     anchor replicate chi/df = 50.2/43 = 1.17;  fold-factor deviance G/df = 180.0/183 = 0.98;  neighbour r = 0.223 (n=224)
//     held 2e10 | fit {2e7,2e8,2e9,off}  (n=55, b=0.973, k=4.16, s=0.48)
//       model        loglik      in-90%     in-99.7%
//       M0       -1693.3      24/55      32/55
//       M1       -1680.3      24/55      32/55
//       M2        -251.1      51/55      55/55
//       M3        -251.7      50/55      55/55
//       M4        -195.3      53/55      55/55
//     held 2e11 | fit {2e7,2e8,2e9,off}  (n=74, b=0.973, k=4.16, s=0.48)
//       model        loglik      in-90%     in-99.7%
//       M0      -15343.1      22/74      30/74
//       M1      -15158.5      24/74      33/74
//       M2        -414.4      64/74      74/74
//       M3        -428.6      59/74      74/74
//       M4        -380.4      70/74      74/74
//     held 2e11 | fit {all five prior}  (n=74, b=0.964, k=3.46, s=0.53)
//       model        loglik      in-90%     in-99.7%
//       M0      -15343.1      22/74      30/74
//       M1      -15128.3      22/74      33/74
//       M2        -411.0      68/74      74/74
//       M3        -417.5      63/74      74/74
//       M4        -335.5      68/74      74/74
//
//   registered-clause replay at W=2e11 (population: 74 folds, lambda>=1):
//     M0  Poisson(lambda), the registered +-3sqrt clause        30/74 = 40.5%
//     M1  Poisson(b*lambda), hot-corrected                      33/74 = 44.6%
//     M2  NB(b*lambda, k), i.i.d. overdispersion                74/74 = 100.0%
//     M3  PLN(b*lambda, s), heavy-tailed i.i.d. mixture         74/74 = 100.0%
//     M4  fold-factor NB predictive from the five prior windows 74/74 = 100.0%
//
//   pooled fold factors Mhat = sum X / sum lambda (all six windows), folds with sum lambda >= 30:
//     p    theta  Mhat    +-se     per-window X/lambda
//     101  204    0.975  0.006   0.82 1.05 0.97 0.98 0.97
//     103  204    0.984  0.006   1.07 1.08 0.96 1.00 0.98
//     107  216    0.570  0.005   0.40 0.55 0.57 0.56 0.57
//     109  216    0.582  0.005   0.55 0.62 0.59 0.58 0.58
//     113  228    1.387  0.008   0.94 1.41 1.31 1.41 1.39
//     127  252    1.765  0.012   2.85 1.86 1.55 1.76 1.77
//     131  264    0.759  0.008   0.95 0.90 0.86 0.80 0.75
//     137  276    0.710  0.009   0.52 0.63 0.84 0.71 0.71
//     139  276    0.748  0.009   0.99 0.80 0.75 0.77 0.74
//     149  300    1.387  0.015   1.91 1.49 1.24 1.40 1.39
//     151  300    1.425  0.015   1.10 1.43 1.37 1.43 1.43
//     157  312    0.962  0.014   0.88 1.06 0.99 0.99 0.96
//     163  324    0.572  0.012   1.06 0.67 0.51 0.58 0.57
//     167  336    0.813  0.015   0.95 0.82 0.73 0.87 0.81
//     173  348    1.625  0.023   1.74 1.66 1.62 1.62
//     179  360    1.630  0.026   1.67 1.89 1.63 1.63
//     181  360    1.635  0.025   1.29 2.07 1.67 1.63
//     191  384    0.354  0.014   0.38 0.25 0.32 0.36
//     193  384    0.387  0.014   0.24 0.42 0.42 0.38
//     197  396    0.549  0.019   0.57 0.85 0.57 0.54
//     199  396    0.531  0.018   0.48 0.54 0.48 0.54
//     211  420    2.225  0.044   2.87 2.47 2.32 2.21
//     223  444    0.433  0.024   0.00 0.57 0.42 0.44
//     227  456    0.352  0.023   0.83 0.00 0.32 0.35
//     229  456    0.353  0.022   1.27 0.32 0.38 0.34
//     233  468    0.701  0.034   1.47 0.92 0.79 0.68
//     239  480    0.842  0.040   0.43 1.07 0.75 0.85
//     241  480    0.949  0.042   0.20 1.43 1.06 0.94
//     251  504    0.532  0.037   0.57 0.86 0.63 0.52
//     257  516    0.559  0.041   0.33 1.00 0.80 0.53
//     263  528    1.057  0.060   0.81 1.09
//     269  540    0.792  0.056   0.66 0.81
//     271  540    0.896  0.058   0.81 0.91
//     277  552    0.614  0.052   0.63 0.61
//     281  564    0.189  0.031   0.17 0.19
//     283  564    0.283  0.037   0.05 0.31
//     293  588    1.037  0.083   1.03 1.04
//     307  612    0.641  0.076   0.61 0.64
//     311  624    0.440  0.067   0.69 0.40
//     313  624    0.383  0.061   0.33 0.39
//     317  636    0.357  0.063   0.25 0.36
//     331  660    1.509  0.152   1.88 1.45
//     337  672    0.780  0.116   0.19 0.86
//     347  696    0.233  0.074   0.00 0.26
//     349  696    0.179  0.063   0.25 0.15
//     353  708    0.354  0.094   0.57 0.34
//     359  720    0.572  0.128   0.64 0.58
//     367  732    0.228  0.086   0.26
//
//   Stage 3b: M_p against import-stein's derived lambda_p / lambda_model at Y = 2e9:
//     p    lam_derived  lam_model   ratio    pooled Mhat  (+-2se)   agree?
//     101    2.629e+2    269.369   0.976    0.975  (+-0.011)   yes
//     127    2.047e+2    115.640   1.770    1.765  (+-0.023)   yes
//     151    7.768e+1     54.718   1.420    1.425  (+-0.030)   yes
//     199    7.930e+0     14.728   0.538    0.531  (+-0.036)   yes
//     211    2.213e+1     10.108   2.189    2.225  (+-0.089)   yes
//     251    1.749e+0      3.487   0.502    0.532  (+-0.074)   yes
//     307    6.710e-1      0.989   0.679    0.641  (+-0.152)   yes
//     331    7.764e-1      0.585   1.327    1.509  (+-0.303)   yes
//     agreement: 8 of 8  -> M_p and the derived-first-moment ratio are the same object
//
//   Stage 3c: the M field over the 43 folds with sum X >= 25:
//     mean ln M = -0.319,  sd ln M = 0.560,  range of M = [0.189, 2.225]
//     exposure-weighted mean M by band of p: [100,200): 0.959   [200,300): 0.858   [300,500): 0.520   <- the known ~20% deep-decade count overprediction IS the deep tail of this field
//   mechanism probe: corr(ln Mhat, ln comb-weight of theta_p) = 0.654 over 48 folds
//
// --- Stage 4: BLIND per-fold bands for the unrun window [A, A+2e9), A = 6.6e10 --- [141.9s]
//   population: folds p >= 100 with predictive mean >= 1 or lambda_model >= 1: 37 folds
//     p    lam_model   Sx      Slam      pred.mean   90% band     99.73% band   P(old +-3sqrt clause)
//     101    269.37   29454   30199.0     262.73   [236, 290]    [215, 313]    1.00
//     103    281.59   31072   31569.2     277.16   [250, 305]    [228, 329]    1.00
//     107    226.77   14490   25423.6     129.25   [111, 148]    [96, 165]     0.00
//     109    236.81   15451   26548.7     137.82   [119, 158]    [104, 175]    0.00
//     113    192.42   29916   21572.3     266.85   [240, 294]    [219, 317]    0.02
//     127    115.64   22880   12964.4     204.09   [181, 228]    [162, 248]    0.00
//     131     95.20    8096   10672.4      72.22   [58, 87]      [48, 99]      0.78
//     137     77.56    6174    8695.5      55.08   [43, 68]      [34, 79]      0.68
//     139     81.09    6796    9091.5      60.62   [48, 74]      [39, 85]      0.78
//     149     52.33    8135    5867.1      72.57   [59, 87]      [48, 100]     0.60
//     151     54.72    8742    6134.5      77.98   [64, 93]      [53, 106]     0.44
//     157     45.25    4880    5073.2      43.53   [33, 55]      [25, 65]      1.00
//     163     37.57    2407    4211.6      21.47   [14, 29]      [9, 37]       0.65
//     167     31.67    2885    3550.5      25.74   [18, 34]      [12, 42]      0.99
//     173     26.48    4822    2968.3      43.02   [32, 54]      [25, 64]      0.42
//     179     22.22    4061    2490.7      36.23   [27, 46]      [20, 56]      0.53
//     181     23.20    4253    2601.5      37.94   [28, 48]      [21, 58]      0.48
//     191     15.78     627    1769.2       5.60   [2, 10]       [0, 14]       0.81
//     193     16.50     715    1849.3       6.38   [3, 11]       [0, 15]       0.76
//     197     14.10     868    1581.1       7.75   [3, 13]       [1, 17]       0.98
//     199     14.73     877    1651.2       7.83   [4, 13]       [1, 17]       0.95
//     211     10.11    2521    1133.2      22.49   [15, 31]      [10, 38]      0.27
//     223      6.98     339     782.7       3.03   [1, 6]        [0, 9]        1.00
//     227      6.00     237     673.0       2.12   [0, 5]        [0, 8]        1.00
//     229      6.30     249     705.8       2.23   [0, 5]        [0, 8]        1.00
//     233      5.45     428     610.9       3.82   [1, 7]        [0, 11]       1.00
//     239      4.68     442     525.2       3.95   [1, 7]        [0, 11]       1.00
//     241      4.89     520     548.0       4.64   [1, 8]        [0, 12]       1.00
//     251      3.49     208     390.9       1.86   [0, 4]        [0, 7]        1.00
//     257      3.01     189     337.8       1.69   [0, 4]        [0, 7]        1.00
//     263      2.61     309     292.4       2.76   [0, 6]        [0, 9]        0.99
//     269      2.26     201     253.7       1.80   [0, 4]        [0, 7]        1.00
//     271      2.36     237     264.5       2.12   [0, 5]        [0, 8]        0.99
//     277      2.05     141     229.8       1.26   [0, 3]        [0, 6]        1.00
//     281      1.80      38     201.4       0.34   [0, 1]        [0, 3]        1.00
//     283      1.86      59     208.7       0.53   [0, 2]        [0, 4]        1.00
//     293      1.36     158     152.3       1.41   [0, 4]        [0, 6]        0.98
//   expected count inside the 90% predictive bands = 34.6 of 37
//   expected count inside the OLD Poisson +-3sqrt(lambda_model) clause = 28.1 of 37  <- the contrast: the registered clause is predicted to keep failing
//   scoring proposal for the prereg: HIT if >= ceil(0.75 * n) folds are inside their 90% band
//   and at most one fold escapes its 99.73% band; the old clause is printed, not scored.
//
// ============================================================
// READINGS
// ============================================================
// 1. CUSTODY + REPLAY: every parsed aggregate matches its embed digit for
//    digit, and the registered clause replays exactly (32 of 74 inside at
//    W = 2e11, the record's 43.2%). The lambda reconstruction reproduces the
//    prereg decade sum and D4 total to <0.2%, so the model mean under test is
//    the law's own, not a re-derivation.
// 2. CONTROLS: the battery reads a pure-Poisson truth as Poisson, a fixed
//    fold-factor truth as fold-factor, and an i.i.d.-NB truth as i.i.d.
//    overdispersion (all gates PASS above), so what it says about the real
//    data is calibrated, not shape-assumed.
// 3. THE VERDICT GATES on the real data:
//    anchor-replicate chi/df = 1.17 (control B: 0.99, control C: 11.63)
//    fold-factor deviance G/df = 0.98 (control B: 0.89, control C: 50.09)
//    M4 beats M2 held-out at 2e10: true (by 55.8 nats); at 2e11 (sequential): true (by 75.5 nats)
//    => THE SURVIVING MODEL IS THE DETERMINISTIC FOLD FACTOR: YES. X_p ~ Poisson(lambda_model * M_p) with M_p a fixed number of the fold,
//    identical across anchors and window lengths; i.i.d. NB (k ~ 3.5-4.2) is
//    only the shadow this field casts when the fold identity is ignored, and
//    window-level mixing / block-correlated noise are REFUTED by the anchor
//    replicate at Poisson scale.
// 4. Stage 3b ties M_p to import-stein P1: it is lambda_derived/lambda_model,
//    i.e. the error the law still misses is in the FIRST MOMENT (deterministic,
//    comb-structured: corr(ln M, ln comb-weight(theta)) printed above), not in
//    the noise; and the known ~20% hot-count systematic is the exposure-weighted
//    deep tail of the same field (Stage 3c).
// 5. Stage 4 fixes the blind test: per-fold NB predictive bands for the unrun
//    window [6.6e10, 6.6e10 + 2e9), to be pre-registered and then produced by
//    attack-perfold-02. The old Poisson clause is predicted to keep failing
//    there; the fold-factor bands are predicted to cover at ~90%.
// [141.9s] done
// ============================================================
// READINGS
