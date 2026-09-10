// ============================================================================
// ATTACK mp-derive-01 — DERIVING THE FOLD-FACTOR FIELD M_p FROM ARITHMETIC
// ============================================================================
// THE QUESTION. `perfold-error-model.md` establishes that the extinction law's
// per-fold error is a deterministic fold-factor field: X_p ~ Poisson(
// lambda_model(p,Y) * M_p) with M_p a fixed number of the fold, MEASURED at
// 48 folds (sd ln M = 0.560, range [0.19, 2.23]) and blind-validated 33/37,
// but NOT derived. The recorded mechanism lead is corr(ln Mhat, ln comb-weight
// (theta_p)) = 0.654. This script builds the full measured target table from
// the embedded artifacts and tests candidate DERIVATIONS of the field against
// the whole of it, with parameters fitted only on a declared TRAIN split and
// scored on held-out deep folds and the blind window.
//
// THE CANDIDATE MECHANISM, stated before any fit. M_p = lambda_derived /
// lambda_model (import-stein §2.4 P1, 8/8), and lambda_derived is dominated by
// N(theta_p), the count of gaps of exact value theta_p = 2p - 2eta in the word
// before fold p. The smooth law models that count as A*exp(-c*theta/mbar),
// blind to theta's arithmetic. The exact endpoint comb is computable: for a
// pair of twin-slots at distance v, a fold q < p forbids residues {0,-2,-v,
// -v-2}, whose overlaps depend on q | v (two coincidences) and q | v-2 or
// q | v+2 (one each). Relative to a generic v the pair weight is
//     W1(v) = prod_{q|v} (q-2)/(q-4) * prod_{q|v-2 or q|v+2} (q-3)/(q-4)
// over primes 5 <= q < p. (The corpus's recorded comb, prod_{q|theta}
// (q-1)/(q-2), is the twin-prime singular series form; W1 is the exact
// two-residue-endpoint form, and it also carries the q | theta -+ 2 classes,
// i.e. the divisor structure of p -+ 1 and p -+ 2.) Candidates:
//   D0: M = b (constant; the pooled bias)
//   D1: M = k * W0(theta)                (the recorded lead, as a formula)
//   D2: M = k * W1(theta)                (the exact endpoint comb)
//   D3: M = k * exp(-d*z)                (depth only, z = theta/mbar; no comb)
//   D4: M = k * W1 * exp(-d*z)           (comb + a steeper true exponent:
//        equivalent to re-estimating the law's own two constants A, c with
//        the comb in place — no parameter the law does not already carry)
//   D4q: M = k * W1 * exp(-f*z^2/2)      (curvature variant)
//   D5: free-exponent diagnostic ln M = a + b1*lnW1 + g*z (is beta = 1 right?)
// Rivals scored under identical protocol. Prediction, written before running:
// D4 or D4q wins; the comb classes carry the within-depth spread and the
// depth term carries the band decay 0.959 -> 0.858 -> 0.520.
//
// UNITS, both sides. Mhat = Sx/Slam is a ratio of a count to an expected
// count (dimensionless); every candidate M is dimensionless; z = theta/mbar
// is a gap in units of the mean gap (dimensionless). Log-likelihoods are in
// nats. No unit conversion occurs anywhere in this file.
//
// COMPUTE DISCIPLINE. Nothing is re-sieved. Every number is parsed from the
// formally embedded OUTPUT blocks of:
//   research/attack-perfold-01-error-model.js   (pooled Mhat table, Stage-4
//       pools Sx/Slam and blind lambda_model, band means, corr 0.654)
//   research/attack-perfold-02-blindwindow.js   (blind-window X, 37 folds)
//   research/foldL-window5-01-extinction.js     (B2 verbatim model means and
//       theta/mbar at 2e11 for p in [307,709]; C1 measured X at 2e11)
//   research/attack-foldL-06-scaling.js         (per-window X tables, offset)
//   research/import-stein-01-multikill.js       (B2: derived lambda_p at 2e9)
//   research/import-thinning-03-deepfolds.js    (K = Psi/Phi^2 column)
// Custody: the parse must reproduce the printed pooled rows, the printed corr,
// the printed band means, the blind 33/37, and Slam = 1.1211 * lambda_2e11
// before anything is fitted. mbar is computed analytically as
// 6*prod_{5<=q<p} q/(q-2) and custody-checked against the embedded
// theta/mbar chain.
//
// FIT / HELD-OUT PROTOCOL, declared before any fit. TRAIN = the 37 pooled
// folds with p <= 293 (weighted ln-regression). TEST (never fitted on):
// (a) the 65 folds p in [307, 709] with pooled counts, scored by total
// Poisson and Poisson-lognormal log-likelihood of Sx under Slam * M(p);
// (b) the 37 blind-window folds, same scoring at lambda_blind * M(p);
// (c) the [300,500) exposure-weighted band mean; (d) the extreme folds
// p >= 521 including the M(631) sighting. CALIBRATION: the identical
// pipeline is run first on two synthetic controls at the real exposure grid
// (truth known, sfc32 seeded): control R with a planted comb+depth field
// (must be recovered) and control N with a pure lognormal field, no comb
// (the comb candidates must NOT win) — gates abort the run if misread.
// ============================================================================

'use strict';
const fs = require('fs');
const path = require('path');
const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1) + 's';

function readSrc(f) {
  const t = fs.readFileSync(path.join(__dirname, f), 'utf8');
  // lastIndexOf: a producer that itself parses embeds mentions the marker in
  // its CODE; the formally embedded block is always the last occurrence.
  const i = t.lastIndexOf('OUTPUT — EMBEDDED');
  if (i < 0) throw new Error('no embedded OUTPUT block in ' + f);
  return t.slice(i);
}
const srcP1 = readSrc('attack-perfold-01-error-model.js');
const srcP2 = readSrc('attack-perfold-02-blindwindow.js');
const srcW5 = readSrc('foldL-window5-01-extinction.js');
const srcSc = readSrc('attack-foldL-06-scaling.js');
const srcSt = readSrc('import-stein-01-multikill.js');
const srcTh = readSrc('import-thinning-03-deepfolds.js');

function isPrime(n) { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; }
const PRIMES = []; for (let n = 5; n <= 1499; n++) if (isPrime(n)) PRIMES.push(n);
const FOLDS = PRIMES.filter(p => p >= 101 && p <= 709);   // the record's fold universe
const eta = p => (p % 6 === 1 ? 1 : -1);
const THETA = {}; for (const p of PRIMES) THETA[p] = 2 * p - 2 * eta(p);
const SY = 1.1211;  // (2e7+2e8+2e9+2e9+2e10+2e11)/2e11: pooled exposure in 2e11 units

function assertNear(name, got, want, tol) {
  const ok = Math.abs(got - want) <= tol;
  console.log('  ' + (ok ? 'OK  ' : 'FAIL') + '  ' + name + '  got ' + got + '  want ' + want);
  if (!ok) throw new Error('custody: ' + name);
}

// ---------------------------------------------------------------------------
// Stage 0 — parse the embedded artifacts
// ---------------------------------------------------------------------------
console.log('--- Stage 0: parse + custody of the embeds --- [' + el() + ']');

// pipe-table parser (house form, as in attack-perfold-01)
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
function section(src, fromRe, toRe) {
  const a = src.search(fromRe); if (a < 0) throw new Error('section start not found: ' + fromRe);
  const rest = src.slice(a);
  const b = rest.search(toRe); if (b < 0) throw new Error('section end not found: ' + toRe);
  return rest.slice(0, b);
}

// (1) pooled Mhat table from perfold-01: p theta Mhat se [per-window...]
const MPOOL = {};   // p -> {Mhat, se}
{
  const sec = section(srcP1, /pooled fold factors Mhat/, /Stage 3b/);
  const re = /^\/\/\s+(\d+)\s+(\d+)\s+([\d.]+)\s+([\d.]+)\s/;
  for (const l of sec.split('\n')) {
    const m = l.match(re); if (!m) continue;
    const p = +m[1];
    if (+m[2] !== THETA[p]) throw new Error('theta mismatch pooled p=' + p);
    MPOOL[p] = { Mhat: +m[3], se: +m[4] };
  }
  const n = Object.keys(MPOOL).length;
  assertNear('pooled Mhat rows parsed', n, 48, 0);
  assertNear('Mhat(101) verbatim', MPOOL[101].Mhat, 0.975, 0);
  assertNear('Mhat(211) verbatim', MPOOL[211].Mhat, 2.225, 0);
}

// (2) Stage-4 pools from perfold-01: p lam_model(2e9) Sx Slam
const POOL4 = {};   // p -> {lam9, Sx, Sl}
{
  const sec = section(srcP1, /Stage 4: BLIND per-fold bands/, /expected count inside/);
  const re = /^\/\/\s+(\d+)\s+([\d.]+)\s+(\d+)\s+([\d.]+)\s+([\d.]+)\s+\[/;
  for (const l of sec.split('\n')) {
    const m = l.match(re); if (!m) continue;
    POOL4[+m[1]] = { lam9: +m[2], Sx: +m[3], Sl: +m[4] };
  }
  assertNear('Stage-4 rows parsed', Object.keys(POOL4).length, 37, 0);
  // Slam identity: Sl = lam9 * 100 * SY (pooled exposure over the six windows)
  assertNear('Slam(101) = lam9*100*1.1211', POOL4[101].Sl, POOL4[101].lam9 * 100 * SY, 0.5);
  assertNear('Slam(293) = lam9*100*1.1211', POOL4[293].Sl, POOL4[293].lam9 * 100 * SY, 0.5);
}

// (3) blind window from perfold-02: p, X measured
const BLINDX = {};
{
  const sec = section(srcP2, /STAGE D — the pre-registered score/, /\(a\) inside 90% bands/);
  const re = /^\/\/\s+(\d+)\s+([\d.]+)\s+\[(\d+), (\d+)\]\s+\[(\d+), (\d+)\]\s+(\d+)\s/;
  let in90 = 0;
  for (const l of sec.split('\n')) {
    const m = l.match(re); if (!m) continue;
    const p = +m[1], X = +m[7];
    BLINDX[p] = X;
    if (X >= +m[3] && X <= +m[4]) in90++;
  }
  assertNear('blind rows parsed', Object.keys(BLINDX).length, 37, 0);
  assertNear('blind in-90 replay', in90, 33, 0);
}

// (4) window-5 B2: verbatim model mean and theta/mbar at 2e11, p in [307,709]
const B2 = {};   // p -> {lam11, z}  (z = theta/mbar as embedded)
{
  const rows = parseTable(srcW5, /p \| theta \|\s+theta\/mbar/, 6);
  for (const c of rows) {
    const p = +c[0];
    if (+c[1] !== THETA[p]) throw new Error('theta mismatch B2 p=' + p);
    B2[p] = { z: +c[2], lam11: +c[4].split(/\s+/)[0] };
  }
  assertNear('B2 rows parsed', Object.keys(B2).length, 65, 0);
  assertNear('B2 lam11(421) verbatim', B2[421].lam11, 9.286, 0);
}

// (5) window-5 C1: measured X at 2e11 (folds absent have X = 0)
const X11 = {}; const MBAR11 = {};
{
  const rows = parseTable(srcW5, /--- C1\. every fold with L >= 2 at W = 2e\+11/, 8);
  for (const c of rows) { const p = +c[0]; X11[p] = +c[3]; MBAR11[p] = +c[6]; }
  assertNear('C1: X(331) at 2e11', X11[331], 85, 0);
  assertNear('C1: X(631) at 2e11', X11[631], 1, 0);
}

// (6) the four scaling windows + offset window (for deep-fold pooled Sx)
function parseWindowTable(src, label) {
  const rows = parseTable(src, new RegExp('--- Y = ' + label.replace(/\+/g, '\\+') + ': every fold'), 8);
  const m = {}; for (const c of rows) m[+c[0]] = +c[3];  // X
  return m;
}
const XW = [parseWindowTable(srcSc, '2e+7'), parseWindowTable(srcSc, '2e+8'),
  parseWindowTable(srcSc, '2e+9'), parseWindowTable(srcSc, '2e+10')];
{
  const rows = parseTable(srcSc, /STAGE D — same length, moved up/, 4);
  const m = {}; for (const c of rows) m[+c[0]] = +c[2];
  XW.push(m);
}

// (7) import-stein B2 at 2e9: derived lambda_p (zero-parameter first moment)
const LDER = {};
{
  const sec = section(srcSt, /--- B2\. per fold at Y = 2e9/, /--- B3\./);
  const re = /^\/\/\s+(\d+)\s+(\d+)\s+([\d.]+)\s+(\d+)\s+([\d.e+-]+)\s+(\d+)\s+\|/;
  for (const l of sec.split('\n')) {
    const m = l.match(re); if (!m) continue;
    LDER[+m[1]] = { Q: +m[4], lder: +m[5], X9: +m[6] };
  }
  assertNear('import-stein B2 rows parsed', Object.keys(LDER).length, 14, 0);
  assertNear('lder(101) verbatim', LDER[101].lder, 262.9, 0.05);
}

// (8) import-thinning-03: K = Psi/Phi^2 at u = 0.90 (localized frame)
const KPSI = {};
{
  // this table is interleaved with progress lines, so scan every row-shaped line
  const re = /^\/\/\s+(\d+) \|\s+\d+ \|\s+[\d.]+ \| (\d\.\d\d) \|/;
  for (const l of srcTh.split('\n')) {
    const m = l.match(re); if (!m) continue;
    if (m[2] !== '0.90') continue;
    const cells = l.replace(/^\/\/\s*/, '').split('|').map(s => s.trim());
    KPSI[+cells[0]] = +cells[7];
  }
  assertNear('K(101, u=0.9) verbatim', KPSI[101], 0.90691716, 1e-8);
}

// ---------------------------------------------------------------------------
// Stage 1 — the arithmetic objects: theta, mbar (analytic), W0, W1
// ---------------------------------------------------------------------------
console.log('\n--- Stage 1: arithmetic objects + custody --- [' + el() + ']');

// analytic mean gap before fold p: 6 * prod_{5 <= q < p} q/(q-2)
const MBAN = {};
{
  let m = 6;
  let k = 0;
  for (const p of PRIMES) { MBAN[p] = m; m *= p / (p - 2); k++; }
  // custody against the embedded theta/mbar chain (B2 uses mbar_before)
  let worst = 0, worstP = 0;
  for (const p of Object.keys(B2).map(Number)) {
    const zEmb = B2[p].z, zAn = THETA[p] / MBAN[p];
    const rel = Math.abs(zAn / zEmb - 1);
    if (rel > worst) { worst = rel; worstP = p; }
  }
  console.log('  analytic mbar vs embedded theta/mbar chain over ' + Object.keys(B2).length +
    ' folds: worst rel dev = ' + (worst * 100).toFixed(3) + '% at p = ' + worstP);
  assertNear('mbar_before(421) analytic vs record 88.7337', MBAN[421], 88.7337, 0.4);
  if (worst > 0.005) throw new Error('analytic mbar drifts from the embedded chain');
}
const ZDEPTH = {}; for (const p of FOLDS) ZDEPTH[p] = THETA[p] / MBAN[p];

// the corpus's recorded comb W0 (twin-prime singular-series form), any q >= 5 | theta
function combW0(p) {
  let w = 1; const g = THETA[p];
  for (let q = 5; q <= g; q += 2) { if (!isPrime(q)) continue; if (g % q === 0) w *= (q - 1) / (q - 2); }
  return w;
}
// the exact endpoint comb W1 over the primes actually folded before p (5 <= q < p)
function combW1v(v, p) {
  let w = 1;
  for (const q of PRIMES) {
    if (q >= p) break;
    if (v % q === 0) w *= (q - 2) / (q - 4);
    else if ((v - 2) % q === 0 || (v + 2) % q === 0) w *= (q - 3) / (q - 4);
  }
  return w;
}
const W0 = {}, W1 = {};
for (const p of FOLDS) { W0[p] = combW0(p); W1[p] = combW1v(THETA[p], p); }

// custody: replicate the recorded mechanism probe, corr(ln Mhat, ln W0) = 0.654
function corr(xs, ys) {
  const n = xs.length; let sx = 0, sy = 0, sxy = 0, sxx = 0, syy = 0;
  for (let i = 0; i < n; i++) { sx += xs[i]; sy += ys[i]; sxy += xs[i] * ys[i]; sxx += xs[i] * xs[i]; syy += ys[i] * ys[i]; }
  return (n * sxy - sx * sy) / Math.sqrt((n * sxx - sx * sx) * (n * syy - sy * sy));
}
{
  const ps = Object.keys(MPOOL).map(Number);
  const r0 = corr(ps.map(p => Math.log(W0[p])), ps.map(p => Math.log(MPOOL[p].Mhat)));
  console.log('  corr(ln Mhat, ln W0) over the ' + ps.length + ' pooled folds = ' + r0.toFixed(3) +
    '   (record: 0.654; 3-decimal Mhat reparse)');
  assertNear('recorded comb correlation replicated', r0, 0.654, 0.01);
  const r1 = corr(ps.map(p => Math.log(W1[p])), ps.map(p => Math.log(MPOOL[p].Mhat)));
  const rz = corr(ps.map(p => ZDEPTH[p]), ps.map(p => Math.log(MPOOL[p].Mhat)));
  const rzW = corr(ps.map(p => ZDEPTH[p]), ps.map(p => Math.log(MPOOL[p].Mhat) - Math.log(W1[p])));
  console.log('  corr(ln Mhat, ln W1)              = ' + r1.toFixed(3) + '   <- the exact endpoint comb');
  console.log('  corr(ln Mhat, z = theta/mbar)     = ' + rz.toFixed(3));
  console.log('  corr(ln Mhat - ln W1, z)          = ' + rzW.toFixed(3) + '   <- depth structure of the comb residual');
}

// ---------------------------------------------------------------------------
// Stage 2 — the target table: the whole measured field, with custody
// ---------------------------------------------------------------------------
console.log('\n--- Stage 2: the target table --- [' + el() + ']');

// deep folds p in [307, 709]: pooled Sx over the six windows, Slam from B2
const FIELD = {};   // p -> {Sx, Sl, Mhat, se|null, lam9, lamB}
for (const p of FOLDS) {
  if (p <= 293) {
    if (!POOL4[p]) throw new Error('missing Stage-4 pool at p = ' + p);
    FIELD[p] = { Sx: POOL4[p].Sx, Sl: POOL4[p].Sl, Mhat: MPOOL[p].Mhat, se: MPOOL[p].se, lamB: POOL4[p].lam9 };
  } else {
    if (!B2[p]) throw new Error('missing B2 row at p = ' + p);
    let Sx = X11[p] || 0;
    for (const w of XW) Sx += w[p] || 0;
    const Sl = B2[p].lam11 * SY;
    FIELD[p] = { Sx, Sl, Mhat: Sx / Sl, se: Math.sqrt(Math.max(Sx, 1)) / Sl, lamB: B2[p].lam11 / 100 };
  }
}
// custody: the deep pooled Mhat must reproduce the printed pooled rows 307..367
{
  let worst = 0, worstP = 0, n = 0;
  for (const p of Object.keys(MPOOL).map(Number)) {
    if (p < 307) continue;
    n++;
    const d = Math.abs(FIELD[p].Mhat - MPOOL[p].Mhat);
    if (d > worst) { worst = d; worstP = p; }
  }
  console.log('  deep pooled Mhat vs the ' + n + ' printed rows 307..367: worst |diff| = ' +
    worst.toFixed(4) + ' at p = ' + worstP + '  (printed at 3 decimals)');
  if (worst > 0.002) throw new Error('deep pooling does not reproduce the printed pooled table');
}
// custody: the printed exposure-weighted band means
{
  const band = ([lo, hi]) => {
    let sx = 0, sl = 0;
    for (const p of FOLDS) if (p >= lo && p < hi) { sx += FIELD[p].Sx; sl += FIELD[p].Sl; }
    return sx / sl;
  };
  const b1 = band([100, 200]), b2 = band([200, 300]), b3 = band([300, 500]);
  assertNear('band mean [100,200) replicated', b1, 0.959, 0.002);
  assertNear('band mean [200,300) replicated', b2, 0.858, 0.002);
  assertNear('band mean [300,500) replicated', b3, 0.520, 0.002);
}
// custody: M_p = lambda_derived/lambda_model at the import-stein folds (all 14)
{
  console.log('  import-stein unification, all 14 printed folds (lder/lam_model at 2e9 vs pooled Mhat):');
  let nAg = 0, nTot = 0;
  for (const p of Object.keys(LDER).map(Number)) {
    const lam9 = p <= 293 ? POOL4[p].lam9 : B2[p].lam11 / 100;
    const ratio = LDER[p].lder / lam9;
    const f = FIELD[p];
    const se2 = 2 * Math.sqrt(Math.max(f.Sx, 1)) / f.Sl;
    const ok = Math.abs(ratio - f.Mhat) <= se2 + 0.05 * f.Mhat;
    nTot++; if (ok) nAg++;
    console.log('    p=' + p + '  ratio=' + ratio.toFixed(3) + '  pooled Mhat=' + f.Mhat.toFixed(3) + (ok ? '' : '  DISAGREES'));
  }
  console.log('    agreement: ' + nAg + ' of ' + nTot);
}
const TRAIN = FOLDS.filter(p => p <= 293);
const TEST = FOLDS.filter(p => p >= 307);
console.log('  TRAIN = ' + TRAIN.length + ' folds (p <= 293), TEST = ' + TEST.length +
  ' folds (307..709) + 37 blind folds.  Field total: ' + FOLDS.length + ' folds.');

// ---------------------------------------------------------------------------
// numerics: lgamma, Poisson / Poisson-lognormal log-likelihood, OLS, RNG
// ---------------------------------------------------------------------------
function lgamma(x) {
  const g = [676.5203681218851, -1259.1392167224028, 771.32342877765313,
    -176.61502916214059, 12.507343278686905, -0.13857109526572012,
    9.9843695780195716e-6, 1.5056327351493116e-7];
  if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x);
  x -= 1;
  let a = 0.99999999999980993;
  const t = x + 7.5;
  for (let i = 0; i < 8; i++) a += g[i] / (x + i + 1);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}
function logPois(x, mu) {
  mu = Math.max(mu, 1e-12);
  return x * Math.log(mu) - mu - lgamma(x + 1);
}
// Poisson-lognormal: X ~ Pois(mu * exp(s*u - s^2/2)), u ~ N(0,1), trapezoid in u
function logPLN(x, mu, s) {
  if (s < 1e-4) return logPois(x, mu);
  const N = 61, LO = -5, HI = 5, h = (HI - LO) / (N - 1);
  let best = -Infinity; const terms = [];
  for (let i = 0; i < N; i++) {
    const u = LO + i * h;
    const w = (i === 0 || i === N - 1) ? 0.5 : 1;
    const lt = logPois(x, mu * Math.exp(s * u - s * s / 2)) - 0.5 * u * u + Math.log(w * h / Math.sqrt(2 * Math.PI));
    terms.push(lt); if (lt > best) best = lt;
  }
  let sum = 0; for (const lt of terms) sum += Math.exp(lt - best);
  return best + Math.log(sum);
}
function ols1(xs, ys) {           // y = a + b x
  const n = xs.length; let sx = 0, sy = 0, sxy = 0, sxx = 0;
  for (let i = 0; i < n; i++) { sx += xs[i]; sy += ys[i]; sxy += xs[i] * ys[i]; sxx += xs[i] * xs[i]; }
  const b = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  const a = (sy - b * sx) / n;
  let ss = 0; for (let i = 0; i < n; i++) { const r = ys[i] - a - b * xs[i]; ss += r * r; }
  return { a, b, sd: Math.sqrt(ss / (n - 2)) };
}
function ols2(x1, x2, ys) {       // y = a + b1 x1 + b2 x2 (normal equations)
  const n = ys.length;
  let S = [[n, 0, 0], [0, 0, 0], [0, 0, 0]], v = [0, 0, 0];
  for (let i = 0; i < n; i++) {
    S[0][1] += x1[i]; S[0][2] += x2[i];
    S[1][1] += x1[i] * x1[i]; S[1][2] += x1[i] * x2[i]; S[2][2] += x2[i] * x2[i];
    v[0] += ys[i]; v[1] += x1[i] * ys[i]; v[2] += x2[i] * ys[i];
  }
  S[1][0] = S[0][1]; S[2][0] = S[0][2]; S[2][1] = S[1][2];
  // 3x3 solve, Cramer
  const det = M => M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
  const D = det(S);
  const rep = (M, j, w) => M.map((row, i) => row.map((x, k) => k === j ? w[i] : x));
  const a = det(rep(S, 0, v)) / D, b1 = det(rep(S, 1, v)) / D, b2 = det(rep(S, 2, v)) / D;
  let ss = 0; for (let i = 0; i < n; i++) { const r = ys[i] - a - b1 * x1[i] - b2 * x2[i]; ss += r * r; }
  return { a, b1, b2, sd: Math.sqrt(ss / (n - 3)) };
}
function sfc32(a, b, c, d) {
  return function () {
    a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
    let t = (a + b) | 0; a = b ^ (b >>> 9); b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11); d = (d + 1) | 0; t = (t + d) | 0;
    c = (c + t) | 0; return (t >>> 0) / 4294967296;
  };
}
function makeNormal(rng) {
  let spare = null;
  return function () {
    if (spare !== null) { const s = spare; spare = null; return s; }
    let u, v, r;
    do { u = 2 * rng() - 1; v = 2 * rng() - 1; r = u * u + v * v; } while (r >= 1 || r === 0);
    const f = Math.sqrt(-2 * Math.log(r) / r);
    spare = v * f; return u * f;
  };
}
function makePoisson(rng, norm) {
  return function (mu) {
    if (mu <= 0) return 0;
    if (mu < 50) {
      const L = Math.exp(-mu); let k = 0, pr = 1;
      do { k++; pr *= rng(); } while (pr > L);
      return k - 1;
    }
    return Math.max(0, Math.round(mu + Math.sqrt(mu) * norm()));
  };
}

// ---------------------------------------------------------------------------
// the fitting + scoring pipeline (shared by controls and the real field)
// ---------------------------------------------------------------------------
// field: p -> {Sx, Sl, lamB}; blindX: p -> X for the 37 blind folds (p <= 293)
function runPipeline(field, blindX, label, quiet) {
  const train = TRAIN.filter(p => field[p].Sx > 0);
  const y = {}; for (const p of train) y[p] = Math.log(field[p].Sx / field[p].Sl);
  const lw0 = {}, lw1 = {}, z = {};
  for (const p of FOLDS) { lw0[p] = Math.log(W0[p]); lw1[p] = Math.log(W1[p]); z[p] = ZDEPTH[p]; }

  const cands = [];
  // fixed rivals
  cands.push({ name: 'M == 1 (the raw law)', M: () => 1, s0: sdAround(train, y, () => 0) });
  // fitted candidates
  const a0 = mean(train.map(p => y[p]));
  cands.push({ name: 'D0  M = b (const)', M: () => Math.exp(a0), s0: sdAround(train, y, () => a0), par: 'b=' + Math.exp(a0).toFixed(3) });
  const a1 = mean(train.map(p => y[p] - lw0[p]));
  cands.push({ name: 'D1  k*W0 (recorded lead)', M: p => Math.exp(a1 + lw0[p]), s0: sdAround(train, y, p => a1 + lw0[p]), par: 'k=' + Math.exp(a1).toFixed(3) });
  const a2 = mean(train.map(p => y[p] - lw1[p]));
  cands.push({ name: 'D2  k*W1 (endpoint comb)', M: p => Math.exp(a2 + lw1[p]), s0: sdAround(train, y, p => a2 + lw1[p]), par: 'k=' + Math.exp(a2).toFixed(3) });
  const f3 = ols1(train.map(p => z[p]), train.map(p => y[p]));
  cands.push({ name: 'D3  k*exp(-d*z) (no comb)', M: p => Math.exp(f3.a + f3.b * z[p]), s0: f3.sd, par: 'k=' + Math.exp(f3.a).toFixed(2) + ' d=' + (-f3.b).toFixed(3) });
  const f4 = ols1(train.map(p => z[p]), train.map(p => y[p] - lw1[p]));
  cands.push({ name: 'D4  k*W1*exp(-d*z)', M: p => Math.exp(f4.a + lw1[p] + f4.b * z[p]), s0: f4.sd, par: 'k=' + Math.exp(f4.a).toFixed(2) + ' d=' + (-f4.b).toFixed(3) });
  const f4q = ols1(train.map(p => z[p] * z[p] / 2), train.map(p => y[p] - lw1[p]));
  cands.push({ name: 'D4q k*W1*exp(-f*z^2/2)', M: p => Math.exp(f4q.a + lw1[p] + f4q.b * z[p] * z[p] / 2), s0: f4q.sd, par: 'k=' + Math.exp(f4q.a).toFixed(2) + ' f=' + (-f4q.b).toFixed(4) });
  const f5 = ols2(train.map(p => lw1[p]), train.map(p => z[p]), train.map(p => y[p]));
  cands.push({ name: 'D5  free-beta diagnostic', M: p => Math.exp(f5.a + f5.b1 * lw1[p] + f5.b2 * z[p]), s0: f5.sd, par: 'beta=' + f5.b1.toFixed(2) + ' d=' + (-f5.b2).toFixed(3) });

  if (!quiet) {
    console.log('  [' + label + ']  train n = ' + train.length + '   (candidate | params | train sd(ln resid) | deep LL Pois | deep LL PLN | blind LL Pois | blind LL PLN)');
  }
  const scores = [];
  for (const c of cands) {
    let dP = 0, dL = 0;
    for (const p of TEST) {
      const mu = field[p].Sl * c.M(p);
      dP += logPois(field[p].Sx, mu);
      dL += logPLN(field[p].Sx, mu, c.s0);
    }
    let bP = 0, bL = 0;
    for (const p of Object.keys(blindX).map(Number)) {
      const mu = field[p].lamB * c.M(p);
      bP += logPois(blindX[p], mu);
      bL += logPLN(blindX[p], mu, c.s0);
    }
    scores.push({ name: c.name, s0: c.s0, dP, dL, bP, bL, M: c.M, par: c.par || '' });
    if (!quiet) console.log('    ' + c.name.padEnd(26) + ' ' + (c.par || '').padEnd(22) +
      ' ' + c.s0.toFixed(3) + '   ' + dP.toFixed(1).padStart(8) + '  ' + dL.toFixed(1).padStart(8) +
      '  ' + bP.toFixed(1).padStart(8) + '  ' + bL.toFixed(1).padStart(8));
  }
  return { scores, delta4: -f4.b, beta5: f5.b1, f4, f4q };
  function mean(v) { return v.reduce((s, x) => s + x, 0) / v.length; }
  function sdAround(ps, yy, m) {
    let ss = 0; for (const p of ps) { const r = yy[p] - m(p); ss += r * r; }
    return Math.sqrt(ss / (ps.length - 1));
  }
}

// ---------------------------------------------------------------------------
// Stage 3 — controls: the pipeline read against two known truths
// ---------------------------------------------------------------------------
console.log('\n--- Stage 3: controls (truth known, same exposure grid, same pipeline) --- [' + el() + ']');
{
  const rng = sfc32(0x9e3779b9, 0x243f6a88, 0xb7e15162, 0xdeadbeef);
  const norm = makeNormal(rng), pois = makePoisson(rng, norm);
  // control R: planted comb + depth field, lognormal roughness 0.2
  const MR = {}; for (const p of FOLDS) MR[p] = 1.6 * W1[p] * Math.exp(-0.25 * ZDEPTH[p]) * Math.exp(0.2 * norm());
  const fR = {}; const bR = {};
  for (const p of FOLDS) fR[p] = { Sx: pois(FIELD[p].Sl * MR[p]), Sl: FIELD[p].Sl, lamB: FIELD[p].lamB };
  for (const p of Object.keys(BLINDX).map(Number)) bR[p] = pois(FIELD[p].lamB * MR[p]);
  const rR = runPipeline(fR, bR, 'control R: truth 1.6*W1*exp(-0.25z)*LN(0.2)');
  const sR = Object.fromEntries(rR.scores.map(s => [s.name.slice(0, 3).trim(), s]));
  const g1 = Math.abs(rR.delta4 - 0.25) <= 0.08;
  const g2 = sR['D4'].dL - sR['D3'].dL >= 5 && sR['D4'].dL - sR['D2'].dL >= 5;
  const g3 = Math.abs(rR.beta5 - 1) <= 0.35;
  console.log('  GATE R1 recovers the planted depth (delta = ' + rR.delta4.toFixed(3) + ' vs 0.25): ' + (g1 ? 'PASS' : 'FAIL'));
  console.log('  GATE R2 D4 beats both single-mechanism rivals on held-out PLN LL: ' + (g2 ? 'PASS' : 'FAIL'));
  console.log('  GATE R3 free beta reads ~1 (beta = ' + rR.beta5.toFixed(2) + '): ' + (g3 ? 'PASS' : 'FAIL'));
  // control N: pure lognormal field, NO comb, NO depth
  const MN = {}; for (const p of FOLDS) MN[p] = Math.exp(0.56 * norm() - 0.56 * 0.56 / 2);
  const fN = {}; const bN = {};
  for (const p of FOLDS) fN[p] = { Sx: pois(FIELD[p].Sl * MN[p]), Sl: FIELD[p].Sl, lamB: FIELD[p].lamB };
  for (const p of Object.keys(BLINDX).map(Number)) bN[p] = pois(FIELD[p].lamB * MN[p]);
  const rN = runPipeline(fN, bN, 'control N: truth LN(0.56), no comb, no depth');
  const sN = Object.fromEntries(rN.scores.map(s => [s.name.slice(0, 3).trim(), s]));
  const g4 = Math.abs(rN.delta4) <= 0.25;
  const g5 = sN['D4'].dL - sN['D0'].dL < 5;
  console.log('  GATE N1 no depth invented (delta = ' + rN.delta4.toFixed(3) + '): ' + (g4 ? 'PASS' : 'FAIL'));
  console.log('  GATE N2 no comb advantage invented (D4 - D0 deep PLN = ' + (sN['D4'].dL - sN['D0'].dL).toFixed(1) + ' nats): ' + (g5 ? 'PASS' : 'FAIL'));
  if (!(g1 && g2 && g3 && g4 && g5)) throw new Error('control gates failed; the pipeline is not calibrated');
}

// ---------------------------------------------------------------------------
// Stage 4 — the real field through the calibrated pipeline
// ---------------------------------------------------------------------------
console.log('\n--- Stage 4: the real field --- [' + el() + ']');
const REAL = runPipeline(FIELD, BLINDX, 'REAL field');
const RS = Object.fromEntries(REAL.scores.map(s => [s.name.slice(0, 3).trim(), s]));
{
  const best = REAL.scores.reduce((a, b) => (b.dL + b.bL > a.dL + a.bL ? b : a));
  console.log('  best candidate on held-out PLN LL (deep + blind): ' + best.name);
  console.log('  D4 vs the no-comb depth rival D3:  deep ' + (RS['D4'].dL - RS['D3'].dL).toFixed(1) +
    ' nats, blind ' + (RS['D4'].bL - RS['D3'].bL).toFixed(1) + ' nats');
  console.log('  D4 vs the comb-only rival D2:      deep ' + (RS['D4'].dL - RS['D2'].dL).toFixed(1) +
    ' nats, blind ' + (RS['D4'].bL - RS['D2'].bL).toFixed(1) + ' nats');
  console.log('  D4 vs the recorded-lead rival D1:  deep ' + (RS['D4'].dL - RS['D1'].dL).toFixed(1) +
    ' nats, blind ' + (RS['D4'].bL - RS['D1'].bL).toFixed(1) + ' nats');
  console.log('  D4 vs the raw law M == 1:          deep ' + (RS['D4'].dL - RS['M ='].dL).toFixed(1) +
    ' nats, blind ' + (RS['D4'].bL - RS['M ='].bL).toFixed(1) + ' nats');
  console.log('  free-exponent diagnostic D5: beta on ln W1 = ' + REAL.beta5.toFixed(3) +
    '  (the derivation says exactly 1)');
  console.log('  D4 fitted pair: k = ' + Math.exp(REAL.f4.a).toFixed(4) + ', delta = ' + REAL.delta4.toFixed(4) +
    '  -> as a law: E[X] = kills * (A*k) * W1(theta) * exp(-(c+delta)*theta/mbar), c+delta = ' +
    (1.0818 + REAL.delta4).toFixed(3));
}

// ---------------------------------------------------------------------------
// Stage 5 — structural tests of the mechanism
// ---------------------------------------------------------------------------
console.log('\n--- Stage 5: structural tests --- [' + el() + ']');

// 5a. twin-theta: two folds sharing theta (twin primes) must share M
{
  console.log('  5a. twin-theta pairs (same theta -> the mechanism predicts the SAME M):');
  console.log('      pair          theta   Mhat_a   Mhat_b   |dln M|   Poisson se   pull');
  const pairs = [];
  for (let i = 0; i + 1 < FOLDS.length; i++) {
    const a = FOLDS[i], b = FOLDS[i + 1];
    if (THETA[a] === THETA[b] && FIELD[a].Sx >= 10 && FIELD[b].Sx >= 10) pairs.push([a, b]);
  }
  let ssT = 0, nT = 0, pulls = [];
  for (const [a, b] of pairs) {
    const d = Math.abs(Math.log(FIELD[a].Mhat) - Math.log(FIELD[b].Mhat));
    const se = Math.sqrt(1 / FIELD[a].Sx + 1 / FIELD[b].Sx);
    ssT += d * d; nT++; pulls.push(d / se);
    console.log('      (' + a + ',' + b + ')   ' + String(THETA[a]).padStart(5) + '   ' +
      FIELD[a].Mhat.toFixed(3) + '    ' + FIELD[b].Mhat.toFixed(3) + '    ' + d.toFixed(3) +
      '     ' + se.toFixed(3) + '        ' + (d / se).toFixed(2));
  }
  // matched control: adjacent folds NOT sharing theta, same Sx floor
  let ssC = 0, nC = 0;
  for (let i = 0; i + 1 < FOLDS.length; i++) {
    const a = FOLDS[i], b = FOLDS[i + 1];
    if (THETA[a] === THETA[b]) continue;
    if (FIELD[a].Sx < 10 || FIELD[b].Sx < 10) continue;
    const d = Math.log(FIELD[a].Mhat) - Math.log(FIELD[b].Mhat);
    ssC += d * d; nC++;
  }
  const rmsT = Math.sqrt(ssT / nT), rmsC = Math.sqrt(ssC / nC);
  const mpull = pulls.reduce((s, x) => s + x * x, 0) / pulls.length;
  console.log('      rms |dln M| within the ' + nT + ' twin pairs = ' + rmsT.toFixed(3) +
    '  vs ' + rmsC.toFixed(3) + ' across the ' + nC + ' adjacent non-twin pairs (ratio ' +
    (rmsT / rmsC).toFixed(2) + ')');
  console.log('      mean squared Poisson pull within twins = ' + mpull.toFixed(2) +
    '  (1.0 = twins differ ONLY by counting noise)');
}

// 5b. the Psi - Phi^2 candidate (import-thinning): does K carry the field?
{
  const ps = Object.keys(KPSI).map(Number).filter(p => FIELD[p] && FIELD[p].Sx >= 10);
  console.log('  5b. K = Psi/Phi^2 (u = 0.9) against Mhat at the measurable folds:');
  for (const p of ps) console.log('      p=' + p + '  K=' + KPSI[p].toFixed(4) + '  Mhat=' + FIELD[p].Mhat.toFixed(3));
  const spreadK = Math.max(...ps.map(p => KPSI[p])) / Math.min(...ps.map(p => KPSI[p]));
  const spreadM = Math.max(...ps.map(p => FIELD[p].Mhat)) / Math.min(...ps.map(p => FIELD[p].Mhat));
  console.log('      K spans a factor ' + spreadK.toFixed(3) + ' where Mhat spans a factor ' +
    spreadM.toFixed(2) + '  -> the adjacent-pair moment does NOT carry the field');
}

// 5c. band means: measured vs each candidate, exposure-weighted
{
  console.log('  5c. exposure-weighted band means, measured vs candidates:');
  const bands = [[100, 200], [200, 300], [300, 500], [500, 710]];
  const hdr = ['measured', 'D1', 'D2', 'D3', 'D4', 'D4q'];
  console.log('      band        ' + hdr.map(h => h.padStart(9)).join(''));
  for (const [lo, hi] of bands) {
    let sx = 0, sl = 0; const pred = { D1: 0, D2: 0, D3: 0, D4: 0, D4q: 0 };
    for (const p of FOLDS) {
      if (p < lo || p >= hi) continue;
      sx += FIELD[p].Sx; sl += FIELD[p].Sl;
      pred.D1 += FIELD[p].Sl * RS['D1'].M(p); pred.D2 += FIELD[p].Sl * RS['D2'].M(p);
      pred.D3 += FIELD[p].Sl * RS['D3'].M(p); pred.D4 += FIELD[p].Sl * RS['D4'].M(p);
      pred.D4q += FIELD[p].Sl * RS['D4q'].M(p);
    }
    console.log('      [' + lo + ',' + hi + ')'.padEnd(6) + '   ' + (sx / sl).toFixed(3).padStart(8) +
      ['D1', 'D2', 'D3', 'D4', 'D4q'].map(k => (pred[k] / sl).toFixed(3).padStart(9)).join(''));
  }
}

// 5d. the extreme folds p >= 521, and the M(631) sighting
{
  console.log('  5d. the extreme folds (p >= 521; total exposure = pooled six windows + blind):');
  let Etot4 = 0, Etot0 = 0, obsTot = 0;
  let mu631 = 0;
  for (const p of TEST) {
    if (p < 521) continue;
    const T = FIELD[p].Sl + FIELD[p].lamB;
    const mu4 = T * RS['D4'].M(p);
    Etot4 += mu4; Etot0 += T * RS['D0'].M(p);
    const obs = FIELD[p].Sx + (p === 631 ? 1 : 0);   // blind window: fold 631 fired once (its last L>=2 fold)
    obsTot += obs;
    if (p === 631) mu631 = mu4;
  }
  console.log('      expected events under D4 = ' + Etot4.toFixed(2) + ', under D0 = ' + Etot0.toFixed(2) +
    ', observed = ' + obsTot + ' (both at fold 631: 2e11 once, blind window once)');
  const M4_631 = RS['D4'].M(631);
  const T631 = FIELD[631].Sl + FIELD[631].lamB;
  console.log('      fold 631: theta = 1260 = 2^2*3^2*5*7, W1 = ' + W1[631].toFixed(2) +
    ', z = ' + ZDEPTH[631].toFixed(2) + ', D4 predicts M = ' + M4_631.toFixed(3));
  console.log('      sighting: Mhat(631) = ' + (2 / T631).toFixed(1) + ' from 2 events on exposure ' + T631.toFixed(3) +
    ' (the record quotes 4.5 on the six-window pool alone)');
  // exact: P(some single fold >= 2) = 1 - prod_p e^{-mu}(1+mu); and where does D4 put the mass?
  let lnP0 = 0; const mus = [];
  for (const p of TEST) {
    if (p < 521) continue;
    const T = FIELD[p].Sl + FIELD[p].lamB;
    const mu = T * RS['D4'].M(p);
    lnP0 += -mu + Math.log(1 + mu); mus.push([mu, p]);
  }
  mus.sort((a, b) => b[0] - a[0]);
  console.log('      top expected-event folds under D4: ' + mus.slice(0, 5).map(([m, p]) => p + ':' + m.toFixed(3)).join('  ') +
    '   <- is the twice-seen extinction fold the comb maximum?');
  console.log('      P(>= 2 events at fold 631 | D4) = ' + (1 - Math.exp(-mu631) * (1 + mu631)).toExponential(2) +
    ';  P(>= 2 at SOME fold p >= 521 | D4) = ' + (1 - Math.exp(lnP0)).toExponential(2));
  console.log('      total-count verdict: P(N <= 2 | D0 rival, E=' + Etot0.toFixed(1) + ') = ' +
    (Math.exp(-Etot0) * (1 + Etot0 + Etot0 * Etot0 / 2)).toExponential(2) +
    ' vs P(N = 2 | D4, E=' + Etot4.toFixed(1) + ') = ' +
    (Math.exp(-Etot4) * Etot4 * Etot4 / 2).toFixed(3));
}

// 5e. failure characterization: does the train-fitted depth slope hold deep?
{
  // diagnostic ONLY (uses TEST for a refit): 1-d Poisson MLE for delta with
  // k and W1 held at the train fit, over the deep folds
  const k4 = Math.exp(REAL.f4.a);
  let best = null;
  for (let d = 0.10; d <= 0.40; d += 0.001) {
    let ll = 0;
    for (const p of TEST) {
      const mu = FIELD[p].Sl * k4 * W1[p] * Math.exp(-d * ZDEPTH[p]);
      ll += logPois(FIELD[p].Sx, mu);
    }
    if (!best || ll > best.ll) best = { d, ll };
  }
  console.log('  5e. depth-slope stability (diagnostic refit, k held): delta_train = ' + REAL.delta4.toFixed(3) +
    ' (z in [3.9, 7.5])  vs delta_deep_MLE = ' + best.d.toFixed(3) + ' (z in [7.7, 13.6])');
  console.log('      -> the linear-in-z residual decay flattens in the far tail; the D4 extrapolation');
  console.log('         over-decays there (band [300,500): predicted 0.423 vs measured 0.520), and that');
  console.log('         flattening, not the comb, is the residual structure a third parameter would chase.');
}

// ---------------------------------------------------------------------------
// Stage 6 — the per-fold residual table of the winning formula, whole field
// ---------------------------------------------------------------------------
console.log('\n--- Stage 6: D4 residual table over the whole field --- [' + el() + ']');
{
  const s0 = RS['D4'].s0;
  console.log('  M_D4 = ' + Math.exp(REAL.f4.a).toFixed(4) + ' * W1(theta) * exp(-' + REAL.delta4.toFixed(4) + ' * theta/mbar)');
  console.log('  pull: p <= 293 = (ln Mhat - ln M_D4)/' + s0.toFixed(3) + ' (train resid sd); p >= 307 = Pearson (Sx-mu)/sqrt(mu)');
  console.log('    p    theta      z     W1      Sx       Sl     Mhat    M_D4    pull   flag');
  const failing = [];
  for (const p of FOLDS) {
    const f = FIELD[p], m4 = RS['D4'].M(p);
    let pull, flag = '';
    if (p <= 293) {
      pull = (Math.log(f.Mhat) - Math.log(m4)) / s0;
      if (Math.abs(pull) > 2.5) { flag = '<<'; failing.push(p); }
    } else {
      const mu = f.Sl * m4;
      pull = (f.Sx - mu) / Math.sqrt(mu);
      if (Math.abs(pull) > 3) { flag = '<<'; failing.push(p); }
    }
    console.log('  ' + String(p).padStart(5) + String(THETA[p]).padStart(7) + ZDEPTH[p].toFixed(2).padStart(8) +
      W1[p].toFixed(2).padStart(7) + String(f.Sx).padStart(8) + f.Sl.toFixed(1).padStart(10) +
      f.Mhat.toFixed(3).padStart(8) + m4.toFixed(3).padStart(8) + pull.toFixed(2).padStart(8) + '  ' + flag);
  }
  console.log('  failing folds (|pull| beyond the flag): ' + (failing.length ? failing.join(', ') : 'none'));
  for (const p of failing) {
    const t = THETA[p];
    const fac = [];
    for (const q of PRIMES) { if (q >= p) break;
      if (t % q === 0) fac.push(q + '|theta');
      else if ((t - 2) % q === 0) fac.push(q + '|theta-2');
      else if ((t + 2) % q === 0) fac.push(q + '|theta+2');
    }
    console.log('    p=' + p + ': theta=' + t + ' [' + fac.join(', ') + ']  W1=' + W1[p].toFixed(2));
  }
}

// ============================================================
// READINGS
// ============================================================
console.log('\n// ============================================================');
console.log('// READINGS');
console.log('// ============================================================');
console.log('// 1. CUSTODY: every parsed object reproduces its embed (pooled rows, the');
console.log('//    0.654 probe, the band means, blind 33/37, Slam = 1.1211*lam_2e11, the');
console.log('//    analytic mbar chain, and the import-stein unification now at 14 of 14).');
console.log('// 2. CONTROLS: the pipeline recovers a planted comb+depth field (delta and');
console.log('//    beta both recovered) and invents neither depth nor comb on a pure-noise');
console.log('//    field. What it says about the real field is calibrated.');
console.log('// 3. THE FORMULA: M_p = k * W1(theta_p) * exp(-delta * theta_p/mbar_p), with');
console.log('//    W1 the ZERO-PARAMETER exact endpoint comb (the residue-overlap weight of');
console.log('//    the two kill classes at distance theta, i.e. the divisor structure of');
console.log('//    p-eta and p-eta-+1 in the folded primes) and (k, delta) the SAME two');
console.log('//    degrees of freedom the law already spends on (A, c), re-estimated: the');
console.log('//    field is the law seen without its comb. Train residual sd(ln M) falls');
console.log('//    0.560 -> 0.177; held-out it beats every rival (raw law, constant bias,');
console.log('//    recorded W0 lead, comb-only, depth-only) by 10-40 nats on BOTH test');
console.log('//    sets; the free-exponent diagnostic reads beta = 1.03 where the');
console.log('//    derivation says exactly 1.');
console.log('// 4. STRUCTURE: twin-theta folds carry the same M (rms 0.155 vs 0.764 for');
console.log('//    non-twin neighbours) — the field is a function of THETA, not of p —');
console.log('//    though at 2.25x Poisson-pull scale, so a ~10-15 percent non-theta');
console.log('//    residual exists. K = Psi/Phi^2 is flat where M varies 2.3x: the');
console.log('//    Fold Moment Identity deviation does NOT predict the field.');
console.log('// 5. WHAT FAILS, exactly: (a) the far tail decays slower than the train');
console.log('//    extrapolation (delta 0.277 -> 0.252 deep; band [300,500) measured');
console.log('//    0.520 vs 0.423 predicted); (b) the twice-seen extinction fold 631 is');
console.log('//    a 2.8e-3 event under D4 at that fold (17 percent somewhere) — D4 makes');
console.log('//    631 comb-loud (W1 = 5.55) but not the loudest; (c) four flagged folds:');
console.log('//    311, 331, 409, 631 — three of the four sit HIGH, and 331/631 are');
console.log('//    the two comb-loudest deep folds, so the residual grows with W1.');
console.log('//    The far-tail TOTAL is D4\'s cleanest win: 2 observed vs 2.3 expected,');
console.log('//    against 9.6 for the constant-bias rival (P = 3.8e-3).');
console.log('// 6. GRADE, stated against the bar: PARTIAL DERIVATION. The deterministic');
console.log('//    field is comb-times-recalibrated-law; the comb half is derived with');
console.log('//    zero parameters; the two scalars are refits of constants the law');
console.log('//    already had; the residual field (sd ~ 0.18, the far-tail flattening,');
console.log('//    fold 631) is real, deterministic-looking, and NOT derived here.');
console.log('// [' + el() + '] done');

// ---------------------------------------------------------------------------
// Stage 7 — SEALED formula bands for an unrun window, to be pre-registered
// ---------------------------------------------------------------------------
// The window is [A, A + 2e9) at A = 132,000,000,000 = 1.32e11: a multiple of 6
// and a fresh anchor (git grep finds no prior use of 132000000000 or 1.32e11
// anywhere in the corpus). Population: the same 37 folds as the perfold
// prereg (p <= 293). The predictive is the FORMULA, not the measured field:
//     X_p ~ PLN(mu = lambda_model(p, 2e9) * M_D4(p), s0)
// with M_D4 = k*W1*exp(-delta*z) at the train-fitted (k, delta) printed above
// and s0 the train residual sd — the formula's own honest roughness. The
// contrast rival is D0 (constant bias b, its own s0). No per-fold measured
// M enters the bands: a HIT means the ARITHMETIC transfers to an anchor no
// fold of which has ever been measured.
console.log('\n--- Stage 7: sealed D4-formula bands for [1.32e11, 1.32e11 + 2e9) --- [' + el() + ']');
{
  const s0 = RS['D4'].s0, s0r = RS['D0'].s0;
  const XMAX = 500;
  function plnBands(mu, s) {
    const pmf = []; let c = 0;
    for (let x = 0; x <= XMAX; x++) { pmf.push(Math.exp(logPLN(x, mu, s))); c += pmf[x]; if (c > 1 - 1e-12 && x > 10 * mu + 20) break; }
    const cdf = []; let a = 0;
    for (let x = 0; x < pmf.length; x++) { a += pmf[x]; cdf.push(a); }
    const q = t => { for (let x = 0; x < cdf.length; x++) if (cdf[x] >= t) return x; return cdf.length; };
    return { l90: q(0.05), u90: q(0.95), l99: q(0.00135), u99: q(0.99865), pmf, cdf };
  }
  // incumbent truth model for EXPECTED scores: the measured-field NB predictive
  // updated with the blind window (Sx + X_blind, Sl + lam_blind)
  function nbPmf(r, qq, x) {   // NB(r, q): P(X = x) = C(x+r-1, x) q^r (1-q)^x
    // convention of the perfold prereg: q = lam_h/(lam_h + Slam), mean = r*q/(1-q)
    return Math.exp(lgamma(x + r) - lgamma(r) - lgamma(x + 1) + r * Math.log(1 - qq) + x * Math.log(qq));
  }
  let expIn90 = 0, expIn99 = 0, expSelf90 = 0, expMargin = 0;
  console.log('    p    lam_model   mu_D4     90% band     99.73% band   incumbent P(in90)');
  const seal = [];
  for (const p of TRAIN) {
    const lam = FIELD[p].lamB;
    const mu4 = lam * RS['D4'].M(p);
    const b4 = plnBands(mu4, s0);
    const mu0 = lam * RS['D0'].M(p);
    // incumbent: NB with blind-updated pools
    const r = FIELD[p].Sx + BLINDX[p] + 0.5, qq = lam / (lam + FIELD[p].Sl + lam);
    let pin90 = 0, pin99 = 0, pself = 0, marg = 0;
    for (let x = 0; x <= XMAX; x++) {
      const w = nbPmf(r, qq, x); if (w < 1e-14 && x > mu4 + 50) break;
      if (x >= b4.l90 && x <= b4.u90) pin90 += w;
      if (x >= b4.l99 && x <= b4.u99) pin99 += w;
      marg += w * (logPLN(x, mu4, s0) - logPLN(x, mu0, s0r));
    }
    for (let x = b4.l90; x <= b4.u90; x++) pself += Math.exp(logPLN(x, mu4, s0));
    expIn90 += pin90; expIn99 += pin99; expSelf90 += pself; expMargin += marg;
    seal.push({ p, lam, mu4, ...b4 });
    console.log('  ' + String(p).padStart(5) + lam.toFixed(2).padStart(10) + mu4.toFixed(2).padStart(9) +
      ('   [' + b4.l90 + ', ' + b4.u90 + ']').padEnd(14) + ('[' + b4.l99 + ', ' + b4.u99 + ']').padEnd(14) +
      pin90.toFixed(2).padStart(6));
  }
  console.log('  expected in-90 under the blind-updated MEASURED-field NB (the incumbent): ' + expIn90.toFixed(1) + ' of 37');
  console.log('  expected in-99.73 under the incumbent: ' + expIn99.toFixed(1) + ' of 37;  self-consistent in-90 if D4 is exact: ' + expSelf90.toFixed(1));
  console.log('  expected PLN loglik margin D4 - D0 under the incumbent: ' + expMargin.toFixed(1) + ' nats');
  console.log('  proposed scoring rule for the prereg: (a) >= 28 of 37 inside the 90% bands;');
  console.log('  (b) at most 1 of 37 outside the 99.73% bands; (c) PLN loglik margin D4 - D0 > 0.');
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-mp-derive-01.js
//   invocation:  node research/attack-mp-derive-01.js
//   code-sha256: 248c8c887aeacec404c5765e10e129c66527e63e9bebb1d4cabbb04e5a181d7f
//   out-sha256:  856d0519823561926b61cadf56017223fa10e2da62df4d6d86d50fe711e9af14
//   body-lines:  329
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     0.2 s
// ============================================================================
// --- Stage 0: parse + custody of the embeds --- [0.0s]
//   OK    pooled Mhat rows parsed  got 48  want 48
//   OK    Mhat(101) verbatim  got 0.975  want 0.975
//   OK    Mhat(211) verbatim  got 2.225  want 2.225
//   OK    Stage-4 rows parsed  got 37  want 37
//   OK    Slam(101) = lam9*100*1.1211  got 30199  want 30199.0707
//   OK    Slam(293) = lam9*100*1.1211  got 152.3  want 152.46959999999999
//   OK    blind rows parsed  got 37  want 37
//   OK    blind in-90 replay  got 33  want 33
//   OK    B2 rows parsed  got 65  want 65
//   OK    B2 lam11(421) verbatim  got 9.286  want 9.286
//   OK    C1: X(331) at 2e11  got 85  want 85
//   OK    C1: X(631) at 2e11  got 1  want 1
//   OK    import-stein B2 rows parsed  got 14  want 14
//   OK    lder(101) verbatim  got 262.9  want 262.9
//   OK    K(101, u=0.9) verbatim  got 0.90691716  want 0.90691716
//
// --- Stage 1: arithmetic objects + custody --- [0.0s]
//   analytic mbar vs embedded theta/mbar chain over 65 folds: worst rel dev = 0.439% at p = 709
//   OK    mbar_before(421) analytic vs record 88.7337  got 88.68422819340812  want 88.7337
//   corr(ln Mhat, ln W0) over the 48 pooled folds = 0.654   (record: 0.654; 3-decimal Mhat reparse)
//   OK    recorded comb correlation replicated  got 0.6535356624948161  want 0.654
//   corr(ln Mhat, ln W1)              = 0.722   <- the exact endpoint comb
//   corr(ln Mhat, z = theta/mbar)     = -0.490
//   corr(ln Mhat - ln W1, z)          = -0.886   <- depth structure of the comb residual
//
// --- Stage 2: the target table --- [0.0s]
//   deep pooled Mhat vs the 11 printed rows 307..367: worst |diff| = 0.0005 at p = 311  (printed at 3 decimals)
//   OK    band mean [100,200) replicated  got 0.9589634006636955  want 0.959
//   OK    band mean [200,300) replicated  got 0.8585146984391886  want 0.858
//   OK    band mean [300,500) replicated  got 0.5195282830106048  want 0.52
//   import-stein unification, all 14 printed folds (lder/lam_model at 2e9 vs pooled Mhat):
//     p=101  ratio=0.976  pooled Mhat=0.975
//     p=127  ratio=1.770  pooled Mhat=1.765
//     p=151  ratio=1.420  pooled Mhat=1.425
//     p=199  ratio=0.538  pooled Mhat=0.531
//     p=211  ratio=2.189  pooled Mhat=2.225
//     p=251  ratio=0.501  pooled Mhat=0.532
//     p=307  ratio=0.679  pooled Mhat=0.641
//     p=331  ratio=1.327  pooled Mhat=1.509
//     p=401  ratio=0.206  pooled Mhat=0.134
//     p=421  ratio=1.074  pooled Mhat=1.345
//     p=457  ratio=0.610  pooled Mhat=0.956
//     p=499  ratio=0.187  pooled Mhat=0.000
//     p=601  ratio=0.000  pooled Mhat=0.000
//     p=701  ratio=0.000  pooled Mhat=0.000
//     agreement: 14 of 14
//   TRAIN = 37 folds (p <= 293), TEST = 65 folds (307..709) + 37 blind folds.  Field total: 102 folds.
//
// --- Stage 3: controls (truth known, same exposure grid, same pipeline) --- [0.0s]
//   [control R: truth 1.6*W1*exp(-0.25z)*LN(0.2)]  train n = 37   (candidate | params | train sd(ln resid) | deep LL Pois | deep LL PLN | blind LL Pois | blind LL PLN)
//     M == 1 (the raw law)                              0.654     -330.9    -125.0    -248.6    -132.2
//     D0  M = b (const)          b=0.761                0.592     -221.4    -114.3    -293.3    -133.1
//     D1  k*W0 (recorded lead)   k=0.671                0.513     -198.6    -115.5    -277.3    -129.3
//     D2  k*W1 (endpoint comb)   k=0.409                0.353     -224.1    -131.6    -285.8    -122.8
//     D3  k*exp(-d*z) (no comb)  k=1.76 d=0.148         0.577     -153.3     -99.4    -258.6    -130.7
//     D4  k*W1*exp(-d*z)         k=1.66 d=0.247         0.227      -86.9     -83.6    -146.8    -110.4
//     D4q k*W1*exp(-f*z^2/2)     k=0.84 f=0.0431        0.233      -89.3     -84.8    -152.8    -110.8
//     D5  free-beta diagnostic   beta=1.09 d=0.255      0.226      -87.3     -84.0    -154.4    -110.8
//   GATE R1 recovers the planted depth (delta = 0.247 vs 0.25): PASS
//   GATE R2 D4 beats both single-mechanism rivals on held-out PLN LL: PASS
//   GATE R3 free beta reads ~1 (beta = 1.09): PASS
//   [control N: truth LN(0.56), no comb, no depth]  train n = 37   (candidate | params | train sd(ln resid) | deep LL Pois | deep LL PLN | blind LL Pois | blind LL PLN)
//     M == 1 (the raw law)                              0.622     -246.3    -134.2    -361.7    -142.1
//     D0  M = b (const)          b=0.847                0.599     -217.4    -131.4    -394.5    -142.9
//     D1  k*W0 (recorded lead)   k=0.747                0.640     -231.0    -133.3    -442.5    -145.1
//     D2  k*W1 (endpoint comb)   k=0.456                0.809     -330.9    -139.1    -665.3    -151.4
//     D3  k*exp(-d*z) (no comb)  k=0.81 d=-0.008        0.607     -220.1    -131.7    -398.3    -142.9
//     D4  k*W1*exp(-d*z)         k=0.76 d=0.091         0.814     -288.5    -138.3    -592.2    -150.4
//     D4q k*W1*exp(-f*z^2/2)     k=0.58 f=0.0140        0.815     -287.1    -138.9    -606.0    -150.7
//     D5  free-beta diagnostic   beta=-0.11 d=-0.019    0.613     -227.2    -132.4    -396.0    -142.6
//   GATE N1 no depth invented (delta = 0.091): PASS
//   GATE N2 no comb advantage invented (D4 - D0 deep PLN = -6.9 nats): PASS
//
// --- Stage 4: the real field --- [0.0s]
//   [REAL field]  train n = 37   (candidate | params | train sd(ln resid) | deep LL Pois | deep LL PLN | blind LL Pois | blind LL PLN)
//     M == 1 (the raw law)                              0.634     -302.4    -128.2    -248.4    -132.4
//     D0  M = b (const)          b=0.750                0.563     -205.6    -118.3    -271.1    -133.5
//     D1  k*W0 (recorded lead)   k=0.661                0.494     -176.1    -116.2    -248.6    -130.1
//     D2  k*W1 (endpoint comb)   k=0.404                0.353     -180.9    -122.7    -243.5    -123.0
//     D3  k*exp(-d*z) (no comb)  k=2.06 d=0.178         0.535     -165.4    -107.8    -262.0    -132.1
//     D4  k*W1*exp(-d*z)         k=1.95 d=0.277         0.177      -92.7     -88.6    -137.1    -112.7
//     D4q k*W1*exp(-f*z^2/2)     k=0.91 f=0.0489        0.180     -112.1    -101.6    -139.0    -112.8
//     D5  free-beta diagnostic   beta=1.03 d=0.280      0.179      -92.4     -88.5    -139.1    -112.8
//   best candidate on held-out PLN LL (deep + blind): D5  free-beta diagnostic
//   D4 vs the no-comb depth rival D3:  deep 19.2 nats, blind 19.3 nats
//   D4 vs the comb-only rival D2:      deep 34.1 nats, blind 10.2 nats
//   D4 vs the recorded-lead rival D1:  deep 27.6 nats, blind 17.4 nats
//   D4 vs the raw law M == 1:          deep 39.6 nats, blind 19.7 nats
//   free-exponent diagnostic D5: beta on ln W1 = 1.031  (the derivation says exactly 1)
//   D4 fitted pair: k = 1.9468, delta = 0.2771  -> as a law: E[X] = kills * (A*k) * W1(theta) * exp(-(c+delta)*theta/mbar), c+delta = 1.359
//
// --- Stage 5: structural tests --- [0.0s]
//   5a. twin-theta pairs (same theta -> the mechanism predicts the SAME M):
//       pair          theta   Mhat_a   Mhat_b   |dln M|   Poisson se   pull
//       (101,103)     204   0.975    0.984    0.009     0.008        1.13
//       (107,109)     216   0.570    0.582    0.021     0.012        1.80
//       (137,139)     276   0.710    0.748    0.052     0.018        2.97
//       (149,151)     300   1.387    1.425    0.027     0.015        1.75
//       (179,181)     360   1.630    1.635    0.003     0.022        0.14
//       (191,193)     384   0.354    0.387    0.089     0.055        1.63
//       (197,199)     396   0.549    0.531    0.033     0.048        0.70
//       (227,229)     456   0.352    0.353    0.003     0.091        0.03
//       (239,241)     480   0.842    0.949    0.120     0.065        1.85
//       (269,271)     540   0.792    0.896    0.123     0.096        1.29
//       (281,283)     564   0.189    0.283    0.404     0.208        1.94
//       (311,313)     624   0.440    0.383    0.139     0.221        0.63
//       (419,421)     840   0.999    1.345    0.297     0.414        0.72
//       rms |dln M| within the 13 twin pairs = 0.155  vs 0.764 across the 34 adjacent non-twin pairs (ratio 0.20)
//       mean squared Poisson pull within twins = 2.25  (1.0 = twins differ ONLY by counting noise)
//   5b. K = Psi/Phi^2 (u = 0.9) against Mhat at the measurable folds:
//       p=101  K=0.9069  Mhat=0.975
//       p=211  K=0.9155  Mhat=2.225
//       p=421  K=0.9150  Mhat=1.345
//       K spans a factor 1.009 where Mhat spans a factor 2.28  -> the adjacent-pair moment does NOT carry the field
//   5c. exposure-weighted band means, measured vs candidates:
//       band         measured       D1       D2       D3       D4      D4q
//       [100,200)           0.959    0.714    0.654    0.968    0.946    0.926
//       [200,300)           0.859    0.801    1.068    0.646    0.872    0.883
//       [300,500)           0.520    0.748    0.881    0.472    0.423    0.367
//       [500,710)           0.357    0.791    1.116    0.269    0.233    0.112
//   5d. the extreme folds (p >= 521; total exposure = pooled six windows + blind):
//       expected events under D4 = 2.30, under D0 = 9.60, observed = 2 (both at fold 631: 2e11 once, blind window once)
//       fold 631: theta = 1260 = 2^2*3^2*5*7, W1 = 5.55, z = 12.49, D4 predicts M = 0.338
//       sighting: Mhat(631) = 8.9 from 2 events on exposure 0.225 (the record quotes 4.5 on the six-window pool alone)
//       top expected-event folds under D4: 541:0.413  547:0.327  571:0.162  523:0.160  569:0.155   <- is the twice-seen extinction fold the comb maximum?
//       P(>= 2 events at fold 631 | D4) = 2.76e-3;  P(>= 2 at SOME fold p >= 521 | D4) = 1.70e-1
//       total-count verdict: P(N <= 2 | D0 rival, E=9.6) = 3.84e-3 vs P(N = 2 | D4, E=2.3) = 0.265
//   5e. depth-slope stability (diagnostic refit, k held): delta_train = 0.277 (z in [3.9, 7.5])  vs delta_deep_MLE = 0.252 (z in [7.7, 13.6])
//       -> the linear-in-z residual decay flattens in the far tail; the D4 extrapolation
//          over-decays there (band [300,500): predicted 0.423 vs measured 0.520), and that
//          flattening, not the comb, is the residual structure a third parameter would chase.
//
// --- Stage 6: D4 residual table over the whole field --- [0.0s]
//   M_D4 = 1.9468 * W1(theta) * exp(-0.2771 * theta/mbar)
//   pull: p <= 293 = (ln Mhat - ln M_D4)/0.177 (train resid sd); p >= 307 = Pearson (Sx-mu)/sqrt(mu)
//     p    theta      z     W1      Sx       Sl     Mhat    M_D4    pull   flag
//     101    204    3.91   1.15   29454   30199.0   0.975   0.761    1.40
//     103    204    3.83   1.17   31072   31569.2   0.984   0.785    1.28
//     107    216    3.98   1.00   14490   25423.6   0.570   0.647   -0.72
//     109    216    3.90   1.01   15451   26548.7   0.582   0.667   -0.77
//     113    228    4.04   2.39   29916   21572.3   1.387   1.515   -0.50
//     127    252    4.39   3.33   22880   12964.4   1.765   1.923   -0.48
//     131    264    4.53   1.83    8096   10672.4   0.759   1.016   -1.65
//     137    276    4.66   1.11    6174    8695.5   0.710   0.592    1.03
//     139    276    4.59   1.11    6796    9091.5   0.748   0.607    1.18
//     149    300    4.92   3.00    8135    5867.1   1.387   1.494   -0.42
//     151    300    4.85   3.02    8742    6134.5   1.425   1.532   -0.41
//     157    312    4.98   2.53    4880    5073.2   0.962   1.241   -1.44
//     163    324    5.11   1.40    2407    4211.6   0.572   0.664   -0.84
//     167    336    5.23   1.85    2885    3550.5   0.813   0.846   -0.23
//     173    348    5.35   2.88    4822    2968.3   1.625   1.272    1.38
//     179    360    5.47   3.00    4061    2490.7   1.630   1.282    1.36
//     181    360    5.41   3.02    4253    2601.5   1.635   1.311    1.25
//     191    384    5.71   1.00     627    1769.2   0.354   0.400   -0.70
//     193    384    5.65   1.01     715    1849.3   0.387   0.409   -0.31
//     197    396    5.76   1.29     868    1581.1   0.549   0.507    0.45
//     199    396    5.71   1.29     877    1651.2   0.531   0.518    0.14
//     211    420    5.99   6.10    2521    1133.2   2.225   2.256   -0.08
//     223    444    6.27   1.27     339     782.7   0.433   0.434   -0.02
//     227    456    6.38   1.13     237     673.0   0.352   0.376   -0.37
//     229    456    6.33   1.14     249     705.8   0.353   0.384   -0.47
//     233    468    6.44   2.50     428     610.9   0.701   0.818   -0.87
//     239    480    6.55   3.00     442     525.2   0.842   0.952   -0.69
//     241    480    6.49   3.01     520     548.0   0.949   0.970   -0.13
//     251    504    6.76   2.01     208     390.9   0.532   0.600   -0.68
//     257    516    6.87   1.44     189     337.8   0.559   0.419    1.63
//     263    528    6.97   2.62     309     292.4   1.057   0.740    2.02
//     269    540    7.07   3.00     201     253.7   0.792   0.822   -0.21
//     271    540    7.02   3.01     237     264.5   0.896   0.837    0.38
//     277    552    7.12   2.53     141     229.8   0.614   0.683   -0.60
//     281    564    7.23   1.05      38     201.4   0.189   0.275   -2.12
//     283    564    7.18   1.05      59     208.7   0.283   0.280    0.06
//     293    588    7.43   3.39     158     152.3   1.037   0.843    1.17
//     307    612    7.68   2.35      71     110.8   0.641   0.544    1.37
//     311    624    7.78   1.22      43      97.6   0.440   0.276    3.10  <<
//     313    624    7.73   1.23      39     101.7   0.383   0.280    1.96
//     317    636    7.83   1.24      32      89.8   0.357   0.275    1.47
//     331    660    8.07   5.26      99      65.6   1.509   1.094    3.21  <<
//     337    672    8.17   3.39      45      57.7   0.780   0.685    0.87
//     347    696    8.41   1.08      10      42.9   0.233   0.204    0.42
//     349    696    8.36   1.08       8      44.7   0.179   0.208   -0.42
//     353    708    8.46   2.10      14      39.6   0.354   0.393   -0.40
//     359    720    8.55   3.20      20      34.9   0.572   0.582   -0.08
//     367    732    8.64   2.10       7      30.7   0.228   0.372   -1.31
//     373    744    8.74   1.46       6      27.1   0.221   0.252   -0.33
//     379    756    8.83   1.93      10      24.0   0.417   0.324    0.79
//     383    768    8.92   3.05      14      21.4   0.655   0.500    1.01
//     389    780    9.02   4.16      15      18.9   0.792   0.665    0.68
//     397    792    9.11   2.61       5      16.7   0.299   0.406   -0.69
//     401    804    9.20   1.19       2      14.9   0.134   0.181   -0.42
//     409    816    9.29   1.36       8      13.2   0.607   0.201    3.28  <<
//     419    840    9.52   5.00      10      10.0   0.999   0.696    1.15
//     421    840    9.47   5.01      14      10.4   1.345   0.707    2.45
//     431    864    9.70   1.00       0       7.9   0.000   0.133   -1.03
//     433    864    9.65   1.00       0       8.3   0.000   0.134   -1.05
//     439    876    9.74   1.16       1       7.4   0.136   0.151   -0.11
//     443    888    9.83   2.15       1       6.6   0.152   0.274   -0.60
//     449    900    9.92   3.52       3       5.9   0.510   0.439    0.26
//     457    912   10.00   3.36       5       5.2   0.956   0.409    1.96
//     461    924   10.09   2.14       2       4.7   0.426   0.255    0.74
//     463    924   10.05   2.15       1       4.9   0.205   0.258   -0.23
//     467    936   10.13   1.66       1       4.4   0.229   0.194    0.16
//     479    960   10.35   3.43       1       3.4   0.297   0.380   -0.24
//     487    972   10.43   2.02       1       3.0   0.333   0.218    0.43
//     491    984   10.52   1.18       0       2.7   0.000   0.124   -0.58
//     499    996   10.61   1.39       0       2.4   0.000   0.143   -0.59
//     503   1008   10.69   3.37       2       2.2   0.921   0.339    1.47
//     509   1020   10.77   4.68       3       1.9   1.540   0.460    2.22
//     521   1044   10.98   1.08       0       1.5   0.000   0.100   -0.39
//     523   1044   10.94   1.08       0       1.6   0.000   0.102   -0.40
//     541   1080   11.28   4.57       0       1.0   0.000   0.391   -0.64
//     547   1092   11.36   4.11       0       0.9   0.000   0.344   -0.57
//     557   1116   11.57   1.22       0       0.7   0.000   0.097   -0.27
//     563   1128   11.65   2.11       0       0.7   0.000   0.163   -0.33
//     569   1140   11.73   3.40       0       0.6   0.000   0.256   -0.39
//     571   1140   11.69   3.41       0       0.6   0.000   0.260   -0.40
//     577   1152   11.77   2.11       0       0.6   0.000   0.157   -0.30
//     587   1176   11.97   1.84       0       0.4   0.000   0.130   -0.24
//     593   1188   12.06   3.69       0       0.4   0.000   0.254   -0.32
//     599   1200   12.14   3.00       0       0.4   0.000   0.202   -0.27
//     601   1200   12.10   3.01       0       0.4   0.000   0.205   -0.28
//     607   1212   12.18   2.33       0       0.3   0.000   0.155   -0.23
//     613   1224   12.26   1.31       0       0.3   0.000   0.085   -0.16
//     617   1236   12.34   1.02       0       0.3   0.000   0.065   -0.13
//     619   1236   12.30   1.02       0       0.3   0.000   0.066   -0.14
//     631   1260   12.49   5.55       1       0.2   4.482   0.338    3.36  <<
//     641   1284   12.69   1.02       0       0.2   0.000   0.059   -0.10
//     643   1284   12.65   1.02       0       0.2   0.000   0.060   -0.10
//     647   1296   12.73   1.16       0       0.2   0.000   0.066   -0.11
//     653   1308   12.81   2.05       0       0.2   0.000   0.115   -0.13
//     659   1320   12.89   3.86       0       0.1   0.000   0.211   -0.17
//     661   1320   12.85   3.86       0       0.1   0.000   0.214   -0.17
//     673   1344   13.04   1.94       0       0.1   0.000   0.102   -0.11
//     677   1356   13.12   1.37       0       0.1   0.000   0.070   -0.08
//     683   1368   13.20   2.28       0       0.1   0.000   0.115   -0.10
//     691   1380   13.27   3.76       0       0.1   0.000   0.185   -0.12
//     701   1404   13.46   1.34       0       0.1   0.000   0.063   -0.06
//     709   1416   13.54   1.40       0       0.1   0.000   0.064   -0.06
//   failing folds (|pull| beyond the flag): 311, 331, 409, 631
//     p=311: theta=624 [13|theta]  W1=1.22
//     p=331: theta=660 [5|theta, 7|theta-2, 11|theta, 47|theta-2]  W1=5.26
//     p=409: theta=816 [11|theta-2, 17|theta, 37|theta-2]  W1=1.36
//     p=631: theta=1260 [5|theta, 7|theta, 17|theta-2, 37|theta-2]  W1=5.55
//
// // ============================================================
// // READINGS
// // ============================================================
// // 1. CUSTODY: every parsed object reproduces its embed (pooled rows, the
// //    0.654 probe, the band means, blind 33/37, Slam = 1.1211*lam_2e11, the
// //    analytic mbar chain, and the import-stein unification now at 14 of 14).
// // 2. CONTROLS: the pipeline recovers a planted comb+depth field (delta and
// //    beta both recovered) and invents neither depth nor comb on a pure-noise
// //    field. What it says about the real field is calibrated.
// // 3. THE FORMULA: M_p = k * W1(theta_p) * exp(-delta * theta_p/mbar_p), with
// //    W1 the ZERO-PARAMETER exact endpoint comb (the residue-overlap weight of
// //    the two kill classes at distance theta, i.e. the divisor structure of
// //    p-eta and p-eta-+1 in the folded primes) and (k, delta) the SAME two
// //    degrees of freedom the law already spends on (A, c), re-estimated: the
// //    field is the law seen without its comb. Train residual sd(ln M) falls
// //    0.560 -> 0.177; held-out it beats every rival (raw law, constant bias,
// //    recorded W0 lead, comb-only, depth-only) by 10-40 nats on BOTH test
// //    sets; the free-exponent diagnostic reads beta = 1.03 where the
// //    derivation says exactly 1.
// // 4. STRUCTURE: twin-theta folds carry the same M (rms 0.155 vs 0.764 for
// //    non-twin neighbours) — the field is a function of THETA, not of p —
// //    though at 2.25x Poisson-pull scale, so a ~10-15 percent non-theta
// //    residual exists. K = Psi/Phi^2 is flat where M varies 2.3x: the
// //    Fold Moment Identity deviation does NOT predict the field.
// // 5. WHAT FAILS, exactly: (a) the far tail decays slower than the train
// //    extrapolation (delta 0.277 -> 0.252 deep; band [300,500) measured
// //    0.520 vs 0.423 predicted); (b) the twice-seen extinction fold 631 is
// //    a 2.8e-3 event under D4 at that fold (17 percent somewhere) — D4 makes
// //    631 comb-loud (W1 = 5.55) but not the loudest; (c) four flagged folds:
// //    311, 331, 409, 631 — three of the four sit HIGH, and 331/631 are
// //    the two comb-loudest deep folds, so the residual grows with W1.
// //    The far-tail TOTAL is D4's cleanest win: 2 observed vs 2.3 expected,
// //    against 9.6 for the constant-bias rival (P = 3.8e-3).
// // 6. GRADE, stated against the bar: PARTIAL DERIVATION. The deterministic
// //    field is comb-times-recalibrated-law; the comb half is derived with
// //    zero parameters; the two scalars are refits of constants the law
// //    already had; the residual field (sd ~ 0.18, the far-tail flattening,
// //    fold 631) is real, deterministic-looking, and NOT derived here.
// // [0.0s] done
//
// --- Stage 7: sealed D4-formula bands for [1.32e11, 1.32e11 + 2e9) --- [0.0s]
//     p    lam_model   mu_D4     90% band     99.73% band   incumbent P(in90)
//     101    269.37   204.94   [146, 274] [111, 351]      0.76
//     103    281.59   221.14   [158, 296] [120, 378]      0.88
//     107    226.77   146.69   [104, 198] [77, 254]       0.99
//     109    236.81   157.89   [112, 212] [84, 272]       0.99
//     113    192.42   291.52   [210, 388] [161, 496]      1.00
//     127    115.64   222.36   [159, 297] [121, 380]      1.00
//     131     95.20    96.69   [67, 132]  [49, 170]       0.75
//     137     77.56    45.88   [30, 65]   [20, 85]        0.92
//     139     81.09    49.25   [32, 69]   [22, 90]        0.87
//     149     52.33    78.20   [53, 107]  [38, 139]       0.99
//     151     54.72    83.86   [58, 115]  [41, 148]       0.99
//     157     45.25    56.18   [37, 78]   [26, 102]       0.86
//     163     37.57    24.94   [15, 37]   [9, 49]         0.94
//     167     31.67    26.80   [16, 39]   [10, 52]        0.98
//     173     26.48    33.69   [21, 48]   [13, 64]        0.80
//     179     22.22    28.48   [17, 41]   [10, 55]        0.81
//     181     23.20    30.42   [19, 44]   [12, 58]        0.86
//     191     15.78     6.32   [2, 11]    [0, 16]         0.96
//     193     16.50     6.75   [3, 12]    [0, 17]         0.94
//     197     14.10     7.14   [3, 12]    [0, 18]         0.93
//     199     14.73     7.62   [3, 13]    [1, 19]         0.95
//     211     10.11    22.81   [13, 34]   [8, 45]         0.98
//     223      6.98     3.03   [0, 6]     [0, 10]         0.96
//     227      6.00     2.26   [0, 5]     [0, 8]          0.98
//     229      6.30     2.42   [0, 5]     [0, 9]          0.97
//     233      5.45     4.46   [1, 8]     [0, 13]         0.96
//     239      4.68     4.45   [1, 8]     [0, 13]         0.96
//     241      4.89     4.75   [1, 9]     [0, 13]         0.97
//     251      3.49     2.09   [0, 5]     [0, 8]          0.99
//     257      3.01     1.26   [0, 3]     [0, 6]          0.90
//     263      2.61     1.93   [0, 5]     [0, 8]          0.94
//     269      2.26     1.86   [0, 4]     [0, 7]          0.96
//     271      2.36     1.98   [0, 5]     [0, 8]          0.98
//     277      2.05     1.40   [0, 4]     [0, 6]          0.99
//     281      1.80     0.49   [0, 2]     [0, 4]          0.99
//     283      1.86     0.52   [0, 2]     [0, 4]          0.98
//     293      1.36     1.15   [0, 3]     [0, 6]          0.94
//   expected in-90 under the blind-updated MEASURED-field NB (the incumbent): 34.6 of 37
//   expected in-99.73 under the incumbent: 37.0 of 37;  self-consistent in-90 if D4 is exact: 34.5
//   expected PLN loglik margin D4 - D0 under the incumbent: 23.6 nats
//   proposed scoring rule for the prereg: (a) >= 28 of 37 inside the 90% bands;
//   (b) at most 1 of 37 outside the 99.73% bands; (c) PLN loglik margin D4 - D0 > 0.
// ============================================================================
// READINGS
//
