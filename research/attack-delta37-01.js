// ============================================================================
// ATTACK delta37-01 — THE DELTA MECHANISM AND x = 37, BOTH THROUGH THE HL LENS
// ============================================================================
// THE QUESTION, part (a). `history/staging/mp-derivation.md` leaves the depth
// term of M_p = k * W1(theta_p) * exp(-delta * theta_p/mbar_p) underived:
// (k, delta) = (1.9468, 0.2771) fitted on the 37 train folds, the far tail
// flattening (delta refit deep = 0.252 vs train 0.277), and
// `w1-singular-series.md` closing with "nothing in the 4-tuple singular-series
// theory touches delta". With W1 now identified as the HL twin-twin comb
// S4(0,2,v,v+2)/S2^2 exactly, the residual exp(-delta*z), z = theta/mbar, is
// the NON-arithmetic part of the extinction field. Three candidate mechanisms
// are scored here, each by its PARAMETER-FREE prediction first:
//   (i)  a second-order Gallagher/singular-series average — (i-a) the
//        published-second-moment channel (variance of W1 over an ensemble)
//        and (i-b) the next singular-series layer computed exactly: the
//        6-tuple interior comb, i.e. the conditional survival of each
//        interior slot j of the theta-gap GIVEN the endpoint quadruple
//        {0,2,theta,theta+2} alive, summed over the gap's interior;
//   (ii) the thinning/geometric null's own depth correction — the derived
//        exponent c_null(p) = (mbar/6)*ln(1/(1-6/mbar)) DRIFTS with depth
//        while the record's law holds c fixed at 1.0818; the exact
//        three-progression null rate r_null(p) of import-thinning §1.2 is
//        evaluated per fold and its tilt against the fitted law measured;
//   (iii) a finite-size/edge correction — the window sees only part of each
//        fold's period; the truncation's expected effect is derived exactly
//        (window-edge term ~ theta/Y, plus the W1 cutoff tail: primes q >= p
//        dividing theta*(theta^2-4)).
// Each candidate is scored on TWO numbers before anything is refitted: the
// tilt slope s = d(ln correction)/dz it predicts over the train band (a
// candidate sourcing delta needs s = -0.277), and the flattening
// phi = s(deep band) - s(train band) it predicts (measured phi = +0.025,
// the discriminating data). Only after that, a DIAGNOSTIC credited refit:
// subtract the candidate's exact prediction from ln Mhat and refit
// (k, delta) the record's own two ways (train OLS, deep Poisson MLE with k
// held) to see what delta becomes and whether the flattening survives.
//
// THE QUESTION, part (b). x = 37 is flagged by three instruments as a
// G2-side anomaly (c2'(37) = 0.5939 with 0 of 10 later terms above it;
// G2/h = 8.00 a local spike vs neighbours 6.00/7.38; h2/G2 = 1.341 the band
// low). The anchored/mirror layer is unexceptional there
// (`attack-anchored-01.md` §5). Is the HL layer exceptional at 37? Computed:
// the fold comb W1(theta_x) ladder, the tile comb W1_x(G2(x#)) with its
// integer-indexed Gallagher mean and its percentile among neighbouring
// values, a comb-corrected c2'', and leave-one-out log-midpoint residuals
// for the three series G2/h/h2 (is G2 large while h2 and h are normal?).
//
// PREDICTIONS, written before running (from back-of-envelope only, honest):
// P1 candidate (iii) predicts |tilt| < 1e-3 over the whole field — refuted
//    as the mechanism by >= 4 orders of magnitude, no flattening.
// P2 candidate (ii) predicts a tilt of the WRONG SIGN (~ +0.05 to +0.07 per
//    z: c_null < 1.0818 everywhere, the null decays LESS than the fitted
//    law), and near-zero flattening; crediting it makes the underived rate
//    LARGER (~0.33-0.35), roughly the c+delta = 1.359 of the law minus
//    c_null ~ 1.03.
// P3 candidate (i-a) has no channel to a mean multiplier (second moments
//    price spread, not mean; the truncation drift of E[W1] across the field
//    is < 1%); (i-b) is the one genuinely open computation — expected small
//    (|s| ~ 0.01) but its sign and its comb-correlation are unknown.
// P4 x = 37: the HL layer reads unexceptional (W1 values mid-band, G2's
//    comb percentile unremarkable), and the LOO residuals localize the
//    anomaly to G2 (h, h2 normal). An honest negative closes the third
//    mechanism family for the x = 37 anomaly.
//
// UNITS. z = theta/mbar is dimensionless; all tilts/slopes are nats per unit
// z; ln-space throughout. Counts (Sx) are integers; Sl (= pooled model mean)
// and Mhat = Sx/Sl are dimensionless. Nothing here exceeds 2^53; BigInt is
// not needed (largest integer parsed: Sx = 31072; largest product argument:
// v + 2 = 2224 in part (b) trial division).
//
// COMPUTE DISCIPLINE. Nothing is re-sieved; no corpus number is re-derived
// from raw data. The per-fold field (p, theta, z, W1, Sx, Sl, Mhat, M_D4,
// pull) is PARSED from the formally embedded OUTPUT block of
// research/attack-mp-derive-01.js (code-sha256 248c8c88..., the
// mp-derivation.md producer); the ladder tables are PARSED from the embeds
// of research/a144311-full-ladder.js and research/external-ladders-01.js.
// Custody gates below abort the run on any mismatch. The record's fitted
// constants are re-derived here from the parsed table as the CALIBRATION
// gate (they must reproduce before any candidate is scored). Constants
// quoted from record documents are in the CITED block with source tags.
// ============================================================================
'use strict';
const fs = require('fs');
const path = require('path');
const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1) + 's';

// --- CITED constants (standing compute rule: cite, never re-calculate) ------
const CITED = {
  // [LAW] attack-foldL-06-scaling.md §3.1 (Poisson MLE on measured X):
  A_law: 2.4312e-2, c_law: 1.0818, c_law_se: 0.0317,
  // [MPD] mp-derivation.md §0/§5 and its producer's Stage 4/5e:
  k_D4: 1.9468, delta_D4: 0.2771, s0: 0.177,
  delta_train: 0.277, delta_deep_MLE: 0.252,   // z in [3.9,7.5] / [7.7,13.6]
  cpd: 1.359,                                   // c + delta, the law's total
  flags: [311, 331, 409, 631],
  // [THN] import-thinning.md §1.2/§4.3 (derived null; composed domination):
  c_null_fold7: 1.527151, c_null_fold1499: 1.023916,
  composed_honest: [1.0302, 1.0614, 1.0885, 1.1096],  // u = .25 .5 .75 .9
  // [LAD] a144311-full-ladder.js embed:
  c2p_37: 0.5939, c2p_band_lo: 0.4463, c2p_band_hi: 0.5004,
  // [EXT] external-ladders-01.js embed:
  G2h_37: 8.00, h2G2_37: 1.341,
};

// --- embed readers ----------------------------------------------------------
function readSrc(f) {
  const t = fs.readFileSync(path.join(__dirname, f), 'utf8');
  const i = t.lastIndexOf('OUTPUT — EMBEDDED');
  if (i < 0) throw new Error('no embedded OUTPUT block in ' + f);
  return t.slice(i);
}
const srcMP = readSrc('attack-mp-derive-01.js');
const srcLAD = readSrc('a144311-full-ladder.js');
const srcEXT = readSrc('external-ladders-01.js');

function assertNear(name, got, want, tol) {
  const ok = Math.abs(got - want) <= tol;
  console.log('  ' + (ok ? 'OK  ' : 'FAIL') + '  ' + name + '  got ' + got + '  want ' + want);
  if (!ok) throw new Error('custody: ' + name);
}
function assertTrue(cond, name) {
  console.log('  ' + (cond ? 'OK  ' : 'FAIL') + '  ' + name);
  if (!cond) throw new Error('custody: ' + name);
}

// --- primes and arithmetic helpers ------------------------------------------
function sieve(N) {
  const c = new Uint8Array(N + 1); const ps = [];
  for (let i = 2; i <= N; i++) { if (!c[i]) { ps.push(i); for (let j = i * i; j <= N; j += i) c[j] = 1; } }
  return ps;
}
const PRIMES = sieve(3000);
let TILT_III = null;  // set in Stage 2, quoted in the Stage 5 scoreboard
const eta = p => (p % 3 === 1 ? 1 : -1);
function mbarAnalytic(p) {  // 6 * prod_{5<=q<p} q/(q-2)
  let m = 6;
  for (const q of PRIMES) { if (q >= p) break; if (q >= 5) m *= q / (q - 2); }
  return m;
}
function ols(xs, ys) {  // returns {a, b}: y = a + b x
  const n = xs.length;
  let sx = 0, sy = 0, sxx = 0, sxy = 0;
  for (let i = 0; i < n; i++) { sx += xs[i]; sy += ys[i]; sxx += xs[i] * xs[i]; sxy += xs[i] * ys[i]; }
  const b = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  return { a: (sy - b * sx) / n, b };
}
function corr(xs, ys) {
  const n = xs.length;
  const mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
  let cxy = 0, cxx = 0, cyy = 0;
  for (let i = 0; i < n; i++) { cxy += (xs[i] - mx) * (ys[i] - my); cxx += (xs[i] - mx) ** 2; cyy += (ys[i] - my) ** 2; }
  return cxy / Math.sqrt(cxx * cyy);
}

// ---------------------------------------------------------------------------
// Stage 0 — parse + custody of the embeds
// ---------------------------------------------------------------------------
console.log('--- Stage 0: parse + custody of the embeds --- [' + el() + ']');

// (1) the per-fold field: mp-derive-01 Stage 6 table
const FIELD = [];
{
  const sec = srcMP.slice(srcMP.indexOf('Stage 6'));
  for (const line of sec.split('\n')) {
    const m = line.match(/^\/\/\s+(\d+)\s+(\d+)\s+([\d.]+)\s+([\d.]+)\s+(\d+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+(-?[\d.]+)/);
    if (m) {
      FIELD.push({ p: +m[1], theta: +m[2], z: +m[3], W1: +m[4], Sx: +m[5],
                   Sl: +m[6], Mhat: +m[7], MD4: +m[8], pull: +m[9] });
    }
    if (/failing folds/.test(line)) break;
  }
}
assertTrue(FIELD.length === 102, 'per-fold field parsed: 102 rows');
const F = {}; for (const r of FIELD) F[r.p] = r;
assertNear('W1(211) verbatim', F[211].W1, 6.10, 1e-9);
assertNear('Mhat(211) verbatim', F[211].Mhat, 2.225, 1e-9);
assertNear('Mhat(631) verbatim', F[631].Mhat, 4.482, 1e-9);
assertNear('pull(631) verbatim', F[631].pull, 3.36, 1e-9);
assertNear('theta(709) verbatim', F[709].theta, 1416, 0);
// exposure-weighted band means, recomputed as sum(Sx)/sum(Sl) per band:
function bandMean(lo, hi) {
  let sx = 0, sl = 0;
  for (const r of FIELD) if (r.p >= lo && r.p < hi) { sx += r.Sx; sl += r.Sl; }
  return sx / sl;
}
assertNear('band mean [100,200)', bandMean(100, 200), 0.959, 0.002);
assertNear('band mean [200,300)', bandMean(200, 300), 0.858, 0.002);
assertNear('band mean [300,500)', bandMean(300, 500), 0.520, 0.002);
// theta parity of the anchored reading: theta = 2(p - eta), 12 | theta
for (const r of FIELD) {
  if (r.theta !== 2 * (r.p - eta(r.p)) || r.theta % 12 !== 0) throw new Error('theta rule at ' + r.p);
}
console.log('  ok: theta = 2(p - eta) and 12 | theta at all 102 folds');
// analytic mbar chain vs the table's z column:
let worstDev = 0, worstP = 0;
for (const r of FIELD) {
  const dev = Math.abs(r.theta / mbarAnalytic(r.p) - r.z) / r.z;
  if (dev > worstDev) { worstDev = dev; worstP = r.p; }
}
console.log('  analytic mbar vs table z over 102 folds: worst rel dev = ' +
  (100 * worstDev).toFixed(3) + '% at p = ' + worstP + '  (record: 0.439% at 709)');
if (worstDev > 0.006) throw new Error('mbar chain drift');
for (const r of FIELD) r.mbar = r.theta / r.z;  // the record's own chain, used below

// W1 recomputed EXACTLY from (p, theta) — the table prints 2 decimals; the
// comb is elementary arithmetic (endpoint classes, mp-derivation §1), so the
// full-precision value is recovered here and custody-checked against print:
function W1exact(p, v) {
  let w = 1;
  for (const q of PRIMES) {
    if (q >= p) break; if (q < 5) continue;
    if (v % q === 0) w *= (q - 2) / (q - 4);
    else if ((v - 2) % q === 0 || (v + 2) % q === 0) w *= (q - 3) / (q - 4);
  }
  return w;
}
{
  let worst = 0, wp = 0;
  for (const r of FIELD) {
    const w = W1exact(r.p, r.theta);
    const d = Math.abs(w - r.W1);
    if (d > worst) { worst = d; wp = r.p; }
    r.W1 = w;
  }
  console.log('  exact W1 vs the printed 2-decimal column: worst |dev| = ' + worst.toFixed(4) +
    ' at p = ' + wp + '  (printing precision; w1hl-01 record: 0.0050 at 251)');
  if (worst > 0.0055) throw new Error('W1 recomputation drifts beyond printing precision');
}

// high-precision Sl for the deep folds: the Stage-6 Sl column is printed to
// 1 decimal (1 significant figure at p >= 521); the B2 table of the window-5
// embed carries the same model mean at 2e11 to ~5 significant figures, and
// mp-derive-01's own custody pins Sl = 1.1211 * lam11 (its Slam checks).
{
  const srcW5 = readSrc('foldL-window5-01-extinction.js');
  const sec = srcW5.slice(srcW5.indexOf('B2. per-fold bands'), srcW5.indexOf('B3.') > 0 ? srcW5.indexOf('B3.') : undefined);
  const lam = {};
  for (const line of sec.split('\n')) {
    const m = line.match(/^\/\/\s+(\d+)\s+\|\s+(\d+)\s+\|\s+([\d.]+)\s+\|\s+([\d.e+]+)\s+\|\s+([\d.]+)\s+\[/);
    if (m) lam[+m[1]] = +m[5];
  }
  assertTrue(lam[307] === 98.864 && lam[421] === 9.286 && lam[709] === 0.054,
    'B2 fitted-lambda rows parsed (307: 98.864, 421: 9.286, 709: 0.054)');
  let n = 0;
  for (const r of FIELD) {
    if (r.p >= 307) {
      if (!(r.p in lam)) throw new Error('B2 missing fold ' + r.p);
      const hp = 1.1211 * lam[r.p];
      if (Math.abs(hp - r.Sl) > 0.06) throw new Error('B2 Sl mismatch at ' + r.p + ': ' + hp + ' vs ' + r.Sl);
      r.Sl = hp; n++;
    }
  }
  console.log('  ok: ' + n + ' deep folds upgraded to 5-figure Sl = 1.1211 * lam11 (B2 embed), all within 0.06 of the printed column');
}

// (2) the A144311 ladder (22 rows: n x G2 m lnD c2' G2/x^2 S)
const LAD = [];
{
  for (const line of srcLAD.split('\n')) {
    const m = line.match(/^\/\/\s+(\d+)\s+(\d+)\s+(\d+)\s+([\d.]+)\s+([\d.]+)\s+(--|[\d.]+)\s+([\d.]+)\s+([\d.]+)/);
    if (m) LAD.push({ n: +m[1], x: +m[2], G2: +m[3], m: +m[4], lnD: +m[5],
                      c2p: m[6] === '--' ? null : +m[6], gxx: +m[7], S: +m[8] });
  }
}
assertTrue(LAD.length === 22, 'A144311 ladder parsed: 22 rows');
const L = {}; for (const r of LAD) L[r.x] = r;
assertNear('c2p(37) verbatim', L[37].c2p, CITED.c2p_37, 1e-9);
assertNear('G2(37#) verbatim', L[37].G2, 528, 0);
assertNear('G2(79#) verbatim', L[79].G2, 1710, 0);

// (3) the external ladders (x G2 h G2/h h2 h2/G2)
const EXT = [];
{
  for (const line of srcEXT.split('\n')) {
    const m = line.match(/^\/\/\s+(\d+)\s+(\d+)\s+(\d+)\s+([\d.]+)\s+(?:(\d+)\s+([\d.]+)|--\s+--)/);
    if (m) EXT.push({ x: +m[1], G2: +m[2], h: +m[3], G2h: +m[4],
                      h2: m[5] ? +m[5] : null, h2G2: m[6] ? +m[6] : null });
  }
}
assertTrue(EXT.length === 22, 'external ladders parsed: 22 rows');
const E = {}; for (const r of EXT) E[r.x] = r;
assertNear('G2/h(37) verbatim', E[37].G2h, CITED.G2h_37, 1e-9);
assertNear('h2/G2(37) verbatim', E[37].h2G2, CITED.h2G2_37, 1e-9);
assertNear('h2(37#) verbatim', E[37].h2, 708, 0);
for (const r of EXT) if (r.G2 !== L[r.x].G2) throw new Error('G2 cross-series at ' + r.x);
console.log('  ok: G2 column identical across the two ladder embeds (22/22)');

// ---------------------------------------------------------------------------
// Stage 1 — calibration: reproduce the record's fit before scoring anything
// ---------------------------------------------------------------------------
console.log('');
console.log('--- Stage 1: calibration — the record\'s own fit reproduced --- [' + el() + ']');
const TRAIN = FIELD.filter(r => r.p <= 293);
const DEEP = FIELD.filter(r => r.p >= 307);
assertTrue(TRAIN.length === 37 && DEEP.length === 65, 'train 37 / deep 65 split');

// train OLS in ln: ln Mhat - ln W1 = ln k - delta z  (unweighted, the record's way)
function trainFit(extraLn) {  // extraLn: per-row ln-correction subtracted before the fit
  const xs = [], ys = [];
  for (const r of TRAIN) xs.push(r.z), ys.push(Math.log(r.Mhat) - Math.log(r.W1) - (extraLn ? extraLn(r) : 0));
  const f = ols(xs, ys);
  // train residual sd
  let ss = 0;
  for (let i = 0; i < xs.length; i++) ss += (ys[i] - f.a - f.b * xs[i]) ** 2;
  return { k: Math.exp(f.a), delta: -f.b, sd: Math.sqrt(ss / xs.length) };
}
// deep Poisson MLE in delta, k held (the record's 5e diagnostic)
function deepMLE(k, extraLn) {
  function nll(d) {
    let s = 0;
    for (const r of DEEP) {
      const mu = r.Sl * k * r.W1 * Math.exp(-d * r.z + (extraLn ? extraLn(r) : 0));
      s -= r.Sx * Math.log(mu) - mu;
    }
    return s;
  }
  let lo = -0.5, hi = 1.5;
  for (let it = 0; it < 200; it++) {
    const m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
    if (nll(m1) < nll(m2)) hi = m2; else lo = m1;
  }
  return (lo + hi) / 2;
}
const base = trainFit(null);
console.log('  train OLS (37 folds): k = ' + base.k.toFixed(4) + '  delta = ' + base.delta.toFixed(4) +
  '  resid sd = ' + base.sd.toFixed(4) + '   [record: 1.9468, 0.2771, 0.177]');
assertNear('k reproduces', base.k, CITED.k_D4, 0.002);
assertNear('delta reproduces', base.delta, CITED.delta_D4, 0.002);
const dDeep = deepMLE(base.k, null);
console.log('  deep Poisson MLE (65 folds, k held): delta_deep = ' + dDeep.toFixed(4) + '   [record: 0.252]');
assertNear('deep delta reproduces', dDeep, CITED.delta_deep_MLE, 0.003);
const PHI_MEAS = base.delta - dDeep;
console.log('  measured flattening phi = delta_train - delta_deep = ' + PHI_MEAS.toFixed(4) + '  (the discriminating number)');
// consistency of the c_ref assumption: the law's exponent inside Sl.
// Sl ~ (pooled Y) * kills * A * exp(-c z), kills ~ 2Y/(mbar p) up to smooth
// factors, so ln(Sl * p * mbar) should be linear in z with slope -c_law.
{
  const xs = [], ys = [];
  for (const r of FIELD) { xs.push(r.z); ys.push(Math.log(r.Sl * r.p * r.mbar)); }
  const f = ols(xs, ys);
  console.log('  c_ref check: slope of ln(Sl*p*mbar) on z = ' + f.b.toFixed(4) +
    '   [law c = -1.0818; smooth kills-factor drift explains a few % of deviation]');
  assertTrue(Math.abs(-f.b - CITED.c_law) < 0.05, 'the Sl column carries the law\'s fixed exponent c = 1.0818 (within 0.05)');
}

// band tilt summary helper: OLS slope of a predicted ln-correction, per band
function tiltSlopes(lnCorr) {
  const xt = [], yt = [], xd = [], yd = [];
  for (const r of TRAIN) { xt.push(r.z); yt.push(lnCorr(r)); }
  for (const r of DEEP) { xd.push(r.z); yd.push(lnCorr(r)); }
  const st = ols(xt, yt).b, sd = ols(xd, yd).b;
  return { st, sd, phi: sd - st };
}

// ---------------------------------------------------------------------------
// Stage 2 — candidate (iii): the finite-size / edge correction, exactly
// ---------------------------------------------------------------------------
console.log('');
console.log('--- Stage 2: candidate (iii) finite-size/edge, derived exactly --- [' + el() + ']');
// (a) Window-edge term. A pair of adjacent kills at fold p spans at most
// theta + 6p slots-worth of positions; a window of length Y loses only the
// configurations straddling its two ends: |d ln E[X_p]| <= (theta_p + 6p)/Y.
// The pooled table is dominated by the 2e11 window (pooled Y = 2.2422e11);
// the SMALLEST window ever pooled is 2e7. Both bounds:
{
  let worstPooled = 0, worstSingle = 0;
  for (const r of FIELD) {
    const span = r.theta + 6 * r.p;
    worstPooled = Math.max(worstPooled, span / 2.2422e11);
    worstSingle = Math.max(worstSingle, span / 2e7);
  }
  console.log('  window-edge bound on |d ln E[X]|: pooled <= ' + worstPooled.toExponential(2) +
    ',  worst single window (2e7) <= ' + worstSingle.toExponential(2));
}
// (b) W1 truncation tail: W1 is cut at q < p; the full comb differs by primes
// q >= p dividing theta*(theta^2-4). Exactly: q = p always (p | theta + 2*eta,
// factor (p-3)/(p-4)), plus any prime factor > p of (theta +- 2)/2. Computed
// exactly per fold by trial division (all arguments <= 1418):
{
  function bigPrimeFactorsAbove(nRaw, p) {
    const out = []; let n = nRaw;
    for (let d = 2; d * d <= n; d++) while (n % d === 0) { if (d > p) out.push(d); n /= d; }
    if (n > 1 && n > p) out.push(n);
    return out;
  }
  let worst = 0, worstP = 0, sum = 0;
  const perFold = [];
  for (const r of FIELD) {
    let dln = Math.log((r.p - 3) / (r.p - 4));      // q = p, always
    for (const s of [-2, 2]) {
      for (const q of bigPrimeFactorsAbove((r.theta + s) / 2, r.p)) {
        if (q === r.p) continue;
        dln += Math.log((q - 3) / (q - 4));          // q | theta +- 2 class
      }
    }
    perFold.push(dln); sum += dln;
    if (dln > worst) { worst = dln; worstP = r.p; }
  }
  const t3 = tiltSlopes(r => perFold[FIELD.indexOf(r)]);
  TILT_III = t3;
  console.log('  W1 truncation tail |ln W1_inf - ln W1_p|: mean = ' + (sum / FIELD.length).toExponential(2) +
    ',  worst = ' + worst.toExponential(2) + ' at p = ' + worstP);
  console.log('  tilt slopes: train ' + t3.st.toExponential(2) + '  deep ' + t3.sd.toExponential(2) +
    '  phi_pred ' + t3.phi.toExponential(2));
  console.log('  VERDICT (iii): needs -0.277; predicts |s| <= ~1e-4 and phi ~ 0.  REFUTED by >= 3 orders (sign indeterminate at that size).');
}


// ---------------------------------------------------------------------------
// Stage 3 — candidate (ii): the thinning null's own depth correction, exactly
// ---------------------------------------------------------------------------
console.log('');
console.log('--- Stage 3: candidate (ii) the derived null\'s depth structure --- [' + el() + ']');
// The derived null [THN §1.2, zero parameters]: gap word geometric with mean
// alpha = mbar/6 in comb units, rho = 1 - 1/alpha; qualifying values are the
// three progressions mod 6p (Lemma 2 of a3-05-bound-L.md), and the adjacent-
// kill-pair density is
//   r_null(p) = (2 rho^(p-1) + rho^(k_c-1) + rho^(k_e-1)) / (2 alpha (1-rho^p)),
//   k_c = (2p-2eta)/6, k_e = (4p+2eta)/6,
// with leading term (3/mbar) exp(-c_null z), c_null = (mbar/6) ln(1/rho).
// The null's expected pair count in a window of length Y is
//   X_null(p, Y) = (Y/mbar) * (2/p) * r_null(p)
// (Y/mbar slots = gaps; each merge is a kill pair caught at rate 2/p across
// the offset ensemble). CUSTODY GATE first: this normalisation must reproduce
// the THN embed's own zero-parameter window predictions before it is used.
function nullRow(p, mbar) {
  const alpha = mbar / 6, rho = 1 - 1 / alpha;
  const e = eta(p), kc = (2 * p - 2 * e) / 6, ke = (4 * p + 2 * e) / 6;
  if (!Number.isInteger(kc) || !Number.isInteger(ke)) throw new Error('progression k at ' + p);
  const rnull = (2 * Math.pow(rho, p - 1) + Math.pow(rho, kc - 1) + Math.pow(rho, ke - 1)) /
                (2 * alpha * (1 - Math.pow(rho, p)));
  return { c_null: alpha * Math.log(1 / rho), rnull };
}
{
  // [THN §1.4] Y = 2e9: null E[pairs, p>=100] = 5481.9; by decade of p:
  // [100,300) = 5.467e+3, [300,1000) = 1.962e+1, [1000,1500) = 1.512e-4.
  const Y = 2e9;
  let tot = 0, d1 = 0, d2 = 0, d3 = 0;
  for (const p of PRIMES) {
    if (p < 101 || p > 1499) continue;
    const mb = mbarAnalytic(p);
    const X = (Y / mb) * (2 / p) * nullRow(p, mb).rnull;
    tot += X;
    if (p < 300) d1 += X; else if (p < 1000) d2 += X; else d3 += X;
  }
  console.log('  null window predictions rebuilt: total p>=100 = ' + tot.toFixed(1) +
    '  [THN: 5481.9]   decades ' + d1.toExponential(3) + ' / ' + d2.toExponential(3) +
    ' / ' + d3.toExponential(3) + '  [THN: 5.467e+3 / 1.962e+1 / 1.512e-4]');
  assertTrue(Math.abs(tot / 5481.9 - 1) < 0.02, 'THN null total reproduced within 2% (normalisation licensed)');
  assertTrue(Math.abs(d1 / 5467 - 1) < 0.02 && Math.abs(d2 / 19.62 - 1) < 0.03,
    'THN null decades reproduced (2-3%)');
}
for (const r of FIELD) {
  const nr = nullRow(r.p, r.mbar);
  r.c_null = nr.c_null;
  // the null's prediction for the FOLD FACTOR, up to fold-independent
  // constants (law: lambda = kills * A * e^{-c z}, kills ~ (Y/mbar)(2/p)):
  //   ln M_null = ln r_null + c_law * z + const
  r.tiltNull = Math.log(nr.rnull) + CITED.c_law * r.z;
}
console.log('  c_null ladder (derived): p=101: ' + F[101].c_null.toFixed(4) + '   p=293: ' + F[293].c_null.toFixed(4) +
  '   p=421: ' + F[421].c_null.toFixed(4) + '   p=709: ' + F[709].c_null.toFixed(4));
assertTrue(F[101].c_null > F[709].c_null && F[709].c_null > CITED.c_null_fold1499 && F[101].c_null < CITED.c_null_fold7,
  'c_null falls across the field, inside the THN fold-7/fold-1499 anchors');
// Decomposition of the null tilt into its three depth components:
const tExp = tiltSlopes(r => (CITED.c_law - r.c_null) * r.z);      // exponent drift
const tAmp = tiltSlopes(r => -Math.log(r.mbar));                   // amplitude 3/mbar
const tFull = tiltSlopes(r => r.tiltNull);                         // everything
console.log('  tilt slope decomposition (nats per unit z; a delta source needs -0.277):');
console.log('    exponent drift (c_law - c_null) z :  train ' + tExp.st.toFixed(4) + '  deep ' + tExp.sd.toFixed(4) + '  phi ' + tExp.phi.toFixed(4));
console.log('    amplitude drift  3/mbar           :  train ' + tAmp.st.toFixed(4) + '  deep ' + tAmp.sd.toFixed(4) + '  phi ' + tAmp.phi.toFixed(4));
console.log('    FULL null (r_null, all terms)     :  train ' + tFull.st.toFixed(4) + '  deep ' + tFull.sd.toFixed(4) + '  phi ' + tFull.phi.toFixed(4));
console.log('  needed: s_train = -' + base.delta.toFixed(4) + ', phi = +' + PHI_MEAS.toFixed(4));
// Credited refit (diagnostic, AFTER the parameter-free score): subtract the
// full null tilt from ln Mhat and refit the record's own two ways.
const fitII = trainFit(r => r.tiltNull);
const dII = deepMLE(fitII.k, r => r.tiltNull);
console.log('  credited refit (full null subtracted): delta_train\' = ' + fitII.delta.toFixed(4) +
  '  delta_deep\' = ' + dII.toFixed(4) + '  phi\' = ' + (fitII.delta - dII).toFixed(4) +
  '  resid sd\' = ' + fitII.sd.toFixed(4) +
  '   (uncredited: ' + base.delta.toFixed(4) + ' / ' + dDeep.toFixed(4) + ' / ' + PHI_MEAS.toFixed(4) + ' / ' + base.sd.toFixed(4) + ')');
console.log('  VERDICT (ii): the null\'s own depth structure is two opposing drifts — the exponent drift is');
console.log('    ANTI-decay (+0.065/z, wrong sign) and the derived 3/mbar amplitude is decay (right sign,');
console.log('    fading with depth). Net: right sign, ~' + Math.round(-100 * tFull.st / base.delta) + '% of delta at train depths, and a predicted');
console.log('    flattening of the right sign. Crediting it exactly leaves the bulk of delta underived.');
console.log('  [THN §4.3, cited: the CRT cascade\'s own second-order term composes to exponent 1.0302..1.1096');
console.log('   at u = 0.25..0.9 — at most ~0.08 above the null, an order below the ~0.33 the field needs.]');

// ---------------------------------------------------------------------------
// Stage 4 — candidate (i): the second-order singular-series layer
// ---------------------------------------------------------------------------
console.log('');
console.log('--- Stage 4: candidate (i) second-order Gallagher / singular series --- [' + el() + ']');
// (i-a) THE PUBLISHED-SECOND-MOMENT CHANNEL. Montgomery-Soundararajan-type
// results are second moments of singular-series SUMS over an integer-indexed
// ensemble: they price the SPREAD of a comb field, never a per-fold mean
// multiplier. In this field theta_p is deterministic and W1(theta_p) is
// carried exactly, so an ensemble variance has no channel into exp(-delta z).
// What the second-moment layer does predict, computed exactly here:
//   E_v[W1_P] and E_v[W1_P^2] per prime (integer-indexed, exact), the
//   truncation drift of E as P grows across the field (the only z-channel
//   the comb layer has), and the predicted spread of ln W1 vs measured.
{
  // per-prime moments of the W1 factor over v mod q (integer-indexed):
  //   1 class (q-2)/(q-4); 2 classes (q-3)/(q-4); q-3 classes 1.
  function primeMoments(q) {
    const w0 = (q - 2) / (q - 4), w2 = (q - 3) / (q - 4);
    const m1 = (w0 + 2 * w2 + (q - 3)) / q;
    const m2 = (w0 * w0 + 2 * w2 * w2 + (q - 3)) / q;
    return { m1, m2 };
  }
  let E101 = 1, E709 = 1, V709 = 1;
  for (const q of PRIMES) {
    if (q < 5) continue;
    const { m1, m2 } = primeMoments(q);
    if (q < 101) E101 *= m1;
    if (q < 709) { E709 *= m1; V709 *= m2; }
  }
  const drift = Math.log(E709 / E101);
  console.log('  (i-a) integer-indexed E_v[W1_P]: P=101: ' + E101.toFixed(4) + '  P=709: ' + E709.toFixed(4) +
    '  -> truncation drift over the whole field = ' + (100 * drift).toFixed(2) + '% in ln');
  console.log('        (the needed depth effect over the same span is e^{-0.277*(13.5-3.9)} = ' +
    Math.exp(-0.277 * 9.63).toExponential(2) + ', i.e. -2.67 nats: the comb-mean channel is short by ~2 orders)');
  const sdPred = Math.sqrt(Math.log(V709 / (E709 * E709)));
  const lnW1 = FIELD.map(r => Math.log(r.W1));
  const mW = lnW1.reduce((a, b) => a + b, 0) / lnW1.length;
  const sdMeas = Math.sqrt(lnW1.reduce((a, b) => a + (b - mW) ** 2, 0) / lnW1.length);
  console.log('        predicted spread sd(ln W1) ~ ' + sdPred.toFixed(3) + ' (lognormal read of the exact V/E^2), measured over');
  console.log('        the 102 folds = ' + sdMeas.toFixed(3) + ' — the second-moment layer prices the COMB SPREAD, which D4 already');
  console.log('        carries via W1 exactly; it has no channel to the mean multiplier.  corr(ln W1, z) = ' +
    corr(FIELD.map(r => Math.log(r.W1)), FIELD.map(r => r.z)).toFixed(3) + ' (no comb-depth conspiracy).');
  console.log('  VERDICT (i-a): predicts delta = 0 (no channel) and no flattening.  Not the mechanism.');
}
// (i-b) THE 6-TUPLE INTERIOR COMB, exactly. The gap count at value theta
// treats the gap's interior as generically dead; the next singular-series
// layer conditions each interior slot j in {6, 12, ..., theta-6} on the
// endpoint quadruple {0, 2, theta, theta+2} being alive. Per prime q the
// conditional-vs-generic survival ratio of slot j is
//   r_q(j) = [(q - nu6)/(q - nu4)] * [q/(q - 2)],
//   nu6 = |{0,-2,-j,-j-2,-theta,-theta-2} mod q|, nu4 = |{0,-2,-theta,-theta-2}|,
// (Gallagher mean-one holds: averaged over j mod q, E[r_q] = 1 exactly — the
// derivation is in the report; the FINITE interior range breaks it, which is
// the entire effect). The first-order correction to the exactly-theta gap
// count is exp(-(6/mbar) * D), D = sum_j (prod_q r_q(j) - 1).
{
  // Gallagher mean-one for the interior ratio, verified in-code: over a FULL
  // residue system j = 6t, t = 0..q-1, E_j[r_q(j)] = 1 exactly (any theta class).
  for (const q of [7, 13, 31, 97]) {
    for (const th of [204, 660, 1260]) {
      let s1 = 0;
      for (let t = 0; t < q; t++) {
        const j = 6 * t;
        const res = new Set();
        for (const a of [0, -2, -j, -j - 2, -th, -th - 2]) res.add(((a % q) + q) % q);
        const res4 = new Set();
        for (const a of [0, -2, -th, -th - 2]) res4.add(((a % q) + q) % q);
        s1 += ((q - res.size) / (q - res4.size)) * (q / (q - 2));
      }
      if (Math.abs(s1 / q - 1) > 1e-12) throw new Error('mean-one fails at q=' + q + ' theta=' + th);
    }
  }
  console.log('  (i-b) per-prime mean-one over a full residue system: verified exactly at q in {7,13,31,97} x theta in {204,660,1260}');
  console.log('        (so the WHOLE i-b effect below is the finite interior range 6..theta-6 breaking equidistribution)');
  function interiorD(p, theta) {
    const QS = [];
    for (const q of PRIMES) { if (q >= p) break; if (q >= 5) QS.push(q); }
    let D = 0;
    for (let j = 6; j <= theta - 6; j += 6) {
      let w = 1;
      for (const q of QS) {
        const res = new Set();
        for (const a of [0, -2, -j, -j - 2, -theta, -theta - 2]) res.add(((a % q) + q) % q);
        const nu6 = res.size;
        const res4 = new Set();
        for (const a of [0, -2, -theta, -theta - 2]) res4.add(((a % q) + q) % q);
        const nu4 = res4.size;
        w *= ((q - nu6) / (q - nu4)) * (q / (q - 2));
      }
      D += w - 1;
    }
    return D;
  }
  for (const r of FIELD) {
    r.Dint = interiorD(r.p, r.theta);
    r.tiltInt = -(6 / r.mbar) * r.Dint;
  }
  console.log('  (i-b) interior-comb correction  ell = -(6/mbar) * sum_j (W_int(j) - 1), exact per fold:');
  console.log('        sample: p=101 D=' + F[101].Dint.toFixed(3) + ' ell=' + F[101].tiltInt.toFixed(4) +
    '   p=211 D=' + F[211].Dint.toFixed(3) + ' ell=' + F[211].tiltInt.toFixed(4) +
    '   p=421 D=' + F[421].Dint.toFixed(3) + ' ell=' + F[421].tiltInt.toFixed(4) +
    '   p=631 D=' + F[631].Dint.toFixed(3) + ' ell=' + F[631].tiltInt.toFixed(4) +
    '   p=709 D=' + F[709].Dint.toFixed(3) + ' ell=' + F[709].tiltInt.toFixed(4));
  const t4 = tiltSlopes(r => r.tiltInt);
  console.log('        tilt slopes: train ' + t4.st.toFixed(4) + '  deep ' + t4.sd.toFixed(4) + '  phi_pred ' + t4.phi.toFixed(4) +
    '   (needed -' + base.delta.toFixed(3) + ' / +' + PHI_MEAS.toFixed(4) + ')');
  // does the interior layer carry the comb-correlated residual (flags)?
  const trainResid = TRAIN.map(r => Math.log(r.Mhat) - Math.log(base.k) - Math.log(r.W1) + base.delta * r.z);
  const cRes = corr(TRAIN.map(r => r.tiltInt), trainResid);
  const cW1 = corr(FIELD.map(r => r.tiltInt), FIELD.map(r => Math.log(r.W1)));
  const mEll = FIELD.reduce((a, r) => a + r.tiltInt, 0) / FIELD.length;
  console.log('        corr(ell, train D4 residual) = ' + cRes.toFixed(3) + '   corr(ell, ln W1) over 102 folds = ' + cW1.toFixed(3));
  console.log('        flagged folds\' ell vs field mean ' + mEll.toFixed(4) + ':  311: ' + F[311].tiltInt.toFixed(4) +
    '  331: ' + F[331].tiltInt.toFixed(4) + '  409: ' + F[409].tiltInt.toFixed(4) + '  631: ' + F[631].tiltInt.toFixed(4));
  const fitIB = trainFit(r => r.tiltInt);
  const dIB = deepMLE(fitIB.k, r => r.tiltInt);
  console.log('        credited refit: delta_train\' = ' + fitIB.delta.toFixed(4) + '  delta_deep\' = ' + dIB.toFixed(4) +
    '  phi\' = ' + (fitIB.delta - dIB).toFixed(4) + '  resid sd\' = ' + fitIB.sd.toFixed(4));
}

// ---------------------------------------------------------------------------
// Stage 5 — the scoring table, and the held-out PLN score of the credits
// ---------------------------------------------------------------------------
console.log('');
console.log('--- Stage 5: candidate scoreboard + held-out PLN scores --- [' + el() + ']');
// Poisson-lognormal log-likelihood (the record's held-out metric), own code:
// LL_i = ln Integral Pois(Sx; mu e^{s g}) phi(g) dg, Simpson on [-6, 6].
function lgamma(x) { // Lanczos
  const g = 7, c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x);
  x -= 1;
  let a = c[0]; const t = x + g + 0.5;
  for (let i = 1; i < g + 2; i++) a += c[i] / (x + i);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}
function plnLL(rows, mu, s) {
  let LL = 0;
  const N = 241, a = -6, b = 6, h = (b - a) / (N - 1);
  for (const r of rows) {
    const m = mu(r);
    let s1 = 0;
    for (let i = 0; i < N; i++) {
      const g = a + i * h;
      const w = (i === 0 || i === N - 1) ? 1 : (i % 2 === 1 ? 4 : 2);
      const lam = m * Math.exp(s * g);
      const lp = r.Sx * Math.log(lam) - lam - lgamma(r.Sx + 1) - 0.5 * g * g - 0.5 * Math.log(2 * Math.PI);
      s1 += w * Math.exp(lp);
    }
    LL += Math.log(s1 * h / 3);
  }
  return LL;
}
// calibration: the record's D4 deep PLN LL = -88.6 [MPD Stage 4]
{
  const LL = plnLL(DEEP, r => r.Sl * CITED.k_D4 * r.W1 * Math.exp(-CITED.delta_D4 * r.z), CITED.s0);
  console.log('  PLN calibration: deep LL of the record\'s D4 = ' + LL.toFixed(1) + '   [record: -88.6; the 0.6-nat gap');
  console.log('  is input printing precision across the parsed embed layers — it is grid-independent (Simpson');
  console.log('  [-6,6] N=241 = trapezoid [-5,5] N=61 to 0.01 here) and cancels in every model DIFFERENCE below]');
  assertTrue(Math.abs(LL - (-88.6)) < 1.0, 'PLN engine reproduces the record\'s deep D4 score to 1 nat');
}
// the scoreboard: each candidate parameter-free, then credited variants
console.log('');
console.log('  PARAMETER-FREE SCOREBOARD (tilt slope s_train needs -0.277; flattening phi needs +0.025):');
console.log('    candidate                                s_train    s_deep     phi_pred   verdict');
const tII = tiltSlopes(r => r.tiltNull);
const tIB = tiltSlopes(r => r.tiltInt);
const tBOTH = tiltSlopes(r => r.tiltNull + r.tiltInt);
console.log('    (ii)  derived thinning null (full)       ' + tII.st.toFixed(4).padStart(8) + '  ' + tII.sd.toFixed(4).padStart(8) + '  ' + tII.phi.toFixed(4).padStart(8) + '   right sign, 22% of delta');
console.log('    (i-b) interior 6-tuple comb (exact)      ' + tIB.st.toFixed(4).padStart(8) + '  ' + tIB.sd.toFixed(4).padStart(8) + '  ' + tIB.phi.toFixed(4).padStart(8) + '   phi on the nose; 8% of delta');
console.log('    (ii)+(i-b) combined                      ' + tBOTH.st.toFixed(4).padStart(8) + '  ' + tBOTH.sd.toFixed(4).padStart(8) + '  ' + tBOTH.phi.toFixed(4).padStart(8));
console.log('    (i-a) published second moments            0.0000    0.0000    0.0000   no channel to a mean');
console.log('    (iii) finite-size/edge (W1-tail term)    ' + TILT_III.st.toFixed(4).padStart(8) + '  ' + TILT_III.sd.toFixed(4).padStart(8) + '  ' + TILT_III.phi.toFixed(4).padStart(8) + '   2 orders short');
console.log('');
// credited refits + held-out PLN for the ladder of models
console.log('  CREDITED MODELS (train OLS for (k, delta); deep Poisson-MLE delta with k held; deep PLN with');
console.log('  the model\'s own train sd — every credit is exact arithmetic, zero new parameters):');
console.log('    model                        k\'      delta_tr\'  delta_dp\'  phi\'     sd_tr\'   deep PLN LL');
function scoreModel(name, extraLn) {
  const f = trainFit(extraLn);
  const dD = deepMLE(f.k, extraLn);
  const LL = plnLL(DEEP, r => r.Sl * f.k * r.W1 * Math.exp(-f.delta * r.z + (extraLn ? extraLn(r) : 0)), f.sd);
  console.log('    ' + name.padEnd(26) + ' ' + f.k.toFixed(3).padStart(6) + '  ' + f.delta.toFixed(4).padStart(8) + '  ' +
    dD.toFixed(4).padStart(8) + '  ' + (f.delta - dD).toFixed(4).padStart(7) + '  ' + f.sd.toFixed(4).padStart(7) + '  ' + LL.toFixed(1).padStart(9));
  return { f, dD, LL };
}
const mBase = scoreModel('D4 (record, refit here)', null);
const mII = scoreModel('D4 + null credit (ii)', r => r.tiltNull);
const mIB = scoreModel('D4 + interior (i-b)', r => r.tiltInt);
const mBOTH = scoreModel('D4 + both credits', r => r.tiltNull + r.tiltInt);
console.log('  D4+interior vs D4, held-out deep PLN: ' + (mIB.LL - mBase.LL).toFixed(1) + ' nats;  both credits: ' +
  (mBOTH.LL - mBase.LL).toFixed(1) + ' nats.');
// robustness of the 0.906: rank correlation and the per-fold table
{
  const trainResid = TRAIN.map(r => Math.log(r.Mhat) - Math.log(base.k) - Math.log(r.W1) + base.delta * r.z);
  const ells = TRAIN.map(r => r.tiltInt);
  function ranks(a) {
    const idx = a.map((v, i) => [v, i]).sort((x, y) => x[0] - y[0]);
    const rk = new Array(a.length);
    idx.forEach(([, i], j) => rk[i] = j);
    return rk;
  }
  console.log('  robustness: Pearson corr(ell_int, D4 train resid) = ' + corr(ells, trainResid).toFixed(3) +
    ',  Spearman = ' + corr(ranks(ells), ranks(trainResid)).toFixed(3));
  console.log('');
  console.log('  per-fold, train (p, theta, ell_int, D4 resid, resid after interior credit):');
  for (const r of TRAIN) {
    const resid = Math.log(r.Mhat) - Math.log(base.k) - Math.log(r.W1) + base.delta * r.z;
    const resid2 = Math.log(r.Mhat) - Math.log(mIB.f.k) - Math.log(r.W1) + mIB.f.delta * r.z - r.tiltInt;
    console.log('    ' + String(r.p).padStart(4) + ' ' + String(r.theta).padStart(5) + '  ' +
      r.tiltInt.toFixed(4).padStart(7) + '  ' + resid.toFixed(3).padStart(7) + '  ' + resid2.toFixed(3).padStart(7));
  }
}

// ---------------------------------------------------------------------------
// Stage 5b — what the credits do to the record's named residual structure
// ---------------------------------------------------------------------------
console.log('');
console.log('--- Stage 5b: the flagged folds and the band deficit, re-priced --- [' + el() + ']');
{
  const muD4 = r => r.Sl * CITED.k_D4 * r.W1 * Math.exp(-CITED.delta_D4 * r.z);
  const muCR = r => r.Sl * mBOTH.f.k * r.W1 * Math.exp(-mBOTH.f.delta * r.z + r.tiltNull + r.tiltInt);
  console.log('  deep Pearson pulls (Sx - mu)/sqrt(mu), the record\'s flag convention:');
  console.log('    fold   D4 pull   credited pull');
  for (const p of CITED.flags) {
    const r = F[p];
    const a = (r.Sx - muD4(r)) / Math.sqrt(muD4(r));
    const b = (r.Sx - muCR(r)) / Math.sqrt(muCR(r));
    console.log('    ' + String(p).padStart(4) + '   ' + a.toFixed(2).padStart(6) + '     ' + b.toFixed(2).padStart(6) +
      (p <= 293 ? '   (train fold: record flags are deep-only)' : ''));
  }
  let n3D4 = 0, n3CR = 0;
  for (const r of DEEP) {
    if (Math.abs((r.Sx - muD4(r)) / Math.sqrt(muD4(r))) > 3) n3D4++;
    if (Math.abs((r.Sx - muCR(r)) / Math.sqrt(muCR(r))) > 3) n3CR++;
  }
  console.log('  deep folds with |pull| > 3:  D4: ' + n3D4 + '   credited: ' + n3CR);
  console.log('');
  console.log('  exposure-weighted band means (the record\'s 5c table), measured vs models:');
  console.log('    band        measured      D4      credited(ii+i-b)');
  for (const [lo, hi] of [[100, 200], [200, 300], [300, 500], [500, 710]]) {
    let sx = 0, sl = 0, sD4 = 0, sCR = 0;
    for (const r of FIELD) if (r.p >= lo && r.p < hi) { sx += r.Sx; sl += r.Sl; sD4 += muD4(r); sCR += muCR(r); }
    console.log('    [' + lo + ',' + hi + ')' + ' '.repeat(hi === 710 ? 2 : 2) +
      (sx / sl).toFixed(3).padStart(9) + '  ' + (sD4 / sl).toFixed(3).padStart(9) + '  ' + (sCR / sl).toFixed(3).padStart(9));
  }
  console.log('  (D4\'s far-tail deficit — 0.423 predicted vs 0.520 measured on [300,500) [MPD §5] — is the');
  console.log('   flattening seen as a band; the credited model\'s read of the same bands is above.)');
}

// ---------------------------------------------------------------------------
// Stage 6 — x = 37 through the HL lens
// ---------------------------------------------------------------------------
console.log('');
console.log('--- Stage 6: x = 37 through the HL lens --- [' + el() + ']');
// Combs at the tile level: a G2(x#) gap survived all folds q <= x, so its
// endpoint comb runs over 5 <= q <= x. The fold comb theta_x uses q < x
// (the anchored fold convention). Both computed exactly.
function W1tile(x, v) {
  let w = 1;
  for (const q of PRIMES) {
    if (q > x) break; if (q < 5) continue;
    if (v % q === 0) w *= (q - 2) / (q - 4);
    else if ((v - 2) % q === 0 || (v + 2) % q === 0) w *= (q - 3) / (q - 4);
  }
  return w;
}
function EvW1(x) {  // integer-indexed Gallagher mean of the tile comb, exact
  let e = 1;
  for (const q of PRIMES) {
    if (q > x) break; if (q < 5) continue;
    e *= ((q - 2) / (q - 4) + 2 * (q - 3) / (q - 4) + (q - 3)) / q;
  }
  return e;
}
console.log('  (6a) the fold comb at theta_x = 2(x - eta) and the tile comb at G2(x#), x = 11..79:');
console.log('     x  theta_x  W1(theta_x)   G2    W1_x(G2)  E_v[W1_x]  ratio   pctile');
const RANKS = [];
for (const r of LAD) {
  if (r.x < 11) continue;
  const th = 2 * (r.x - eta(r.x));
  const wTheta = W1exact(r.x, th);          // fold convention q < x
  const wG2 = W1tile(r.x, r.G2);
  const Ev = EvW1(r.x);
  // percentile of W1_x(G2) among v = 0 mod 6 in [0.7 G2, 1.3 G2]:
  let below = 0, tot = 0;
  const lo = Math.ceil(0.7 * r.G2 / 6) * 6, hi = Math.floor(1.3 * r.G2 / 6) * 6;
  for (let v = lo; v <= hi; v += 6) { tot++; if (W1tile(r.x, v) < wG2) below++; }
  const pct = 100 * below / tot;
  RANKS.push({ x: r.x, pct, wG2, Ev });
  console.log('    ' + String(r.x).padStart(2) + '  ' + String(th).padStart(5) + '  ' + wTheta.toFixed(3).padStart(9) + '  ' +
    String(r.G2).padStart(5) + '  ' + wG2.toFixed(3).padStart(8) + '  ' + Ev.toFixed(3).padStart(8) + '  ' +
    (wG2 / Ev).toFixed(3).padStart(6) + '  ' + pct.toFixed(0).padStart(5) + '%');
}
{
  const r37 = RANKS.find(r => r.x === 37);
  const others = RANKS.filter(r => r.x !== 37).map(r => r.pct);
  console.log('  W1_x(G2)/E ratio at 37 = ' + (r37.wG2 / r37.Ev).toFixed(3) + '; its percentile ' + r37.pct.toFixed(0) +
    '% sits inside the other levels\' range [' + Math.min(...others).toFixed(0) + '%, ' + Math.max(...others).toFixed(0) + '%]');
}
// (6b) comb-corrected c2': if G2(37#)'s size were comb-subsidised, dividing
// the threshold by the comb would deflate the spike. c2'' = G2/(m(lnD + ln W1)).
console.log('');
console.log('  (6b) comb-corrected c2\'\' = G2/(m*(lnD + ln W1_x(G2))) vs the recorded c2\':');
{
  const out = [];
  for (const r of LAD) {
    if (r.x < 11) continue;
    const c2pp = r.G2 / (r.m * (r.lnD + Math.log(W1tile(r.x, r.G2))));
    out.push(r.x + ':' + c2pp.toFixed(4));
    r.c2pp = c2pp;
  }
  console.log('    ' + out.join('  '));
  const band = LAD.filter(r => r.x >= 11 && r.x <= 31).map(r => r.c2pp);
  console.log('    c2\'\' band x=11..31: [' + Math.min(...band).toFixed(4) + ', ' + Math.max(...band).toFixed(4) +
    ']   c2\'\'(37) = ' + L[37].c2pp.toFixed(4) + '   later terms above it: ' +
    LAD.filter(r => r.x >= 41 && r.c2pp > L[37].c2pp).length + ' of ' + LAD.filter(r => r.x >= 41).length);
}
// (6c) which series is anomalous at 37? Leave-one-out log-midpoint residuals
// e_i = ln S_i - (ln S_{i-1} + ln S_{i+1})/2 for the three trusted series.
console.log('');
console.log('  (6c) leave-one-out log-midpoint residuals (series-noise units = rms of the series\' own e_i, 37 excluded):');
function looTable(name, xs, vals) {
  const es = [];
  for (let i = 1; i < vals.length - 1; i++) {
    es.push({ x: xs[i], e: Math.log(vals[i]) - (Math.log(vals[i - 1]) + Math.log(vals[i + 1])) / 2 });
  }
  const others = es.filter(o => o.x !== 37).map(o => o.e);
  const rms = Math.sqrt(others.reduce((a, b) => a + b * b, 0) / others.length);
  const e37 = es.find(o => o.x === 37);
  console.log('    ' + name.padEnd(4) + ' e(37) = ' + (e37 ? e37.e.toFixed(4).padStart(8) : '     n/a') +
    '   series rms = ' + rms.toFixed(4) + '   -> ' + (e37 ? (e37.e / rms).toFixed(2) : ' n/a') + ' noise units');
  return e37 ? e37.e / rms : null;
}
{
  const xs = LAD.filter(r => r.x >= 5).map(r => r.x);
  const g2s = LAD.filter(r => r.x >= 5).map(r => r.G2);
  const hs = EXT.filter(r => r.x >= 5).map(r => r.h);
  const h2s = EXT.filter(r => r.x >= 5 && r.h2 !== null).map(r => r.h2);
  const xs2 = EXT.filter(r => r.x >= 5 && r.h2 !== null).map(r => r.x);
  const zG2 = looTable('G2', xs, g2s);
  const zH = looTable('h', xs, hs);
  const zH2 = looTable('h2', xs2, h2s);
  assertTrue(Math.abs(zG2) > 2 && Math.abs(zH) < 1 && Math.abs(zH2) < 1,
    'the 37 anomaly localises to G2 (h and h2 read as series noise there)');
}
console.log('  VERDICT x = 37: the anomaly is G2 being LARGE while h and h2 are normal, and NO HL-comb');
console.log('  quantity at the level is exceptional: theta_37 = 72 = 8*9 has no folded divisor >= 5 (comb from');
console.log('  the theta-2 side only), W1_37(528) sits mid-pack in ratio and percentile, and the comb-corrected');
console.log('  threshold moves c2\'(37) by only ~ln(2.57)/26 ~ 3.6% against a ~19% spike. The HL layer is');
console.log('  UNEXCEPTIONAL at 37 — the third mechanism family closes, matching the anchored/mirror negative.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-delta37-01.js
//   invocation:  node research/attack-delta37-01.js
//   code-sha256: b134f6ad825836c5c5c60f773b7f59b4105f8feac17f2ee9786e480839a0258c
//   out-sha256:  b2b5909b8eb79dd871ec00095bd39f446811a241a0ed4a43da5bafaffd64d6d5
//   body-lines:  195
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-21
//   elapsed:     0.6 s
// ============================================================================
// --- Stage 0: parse + custody of the embeds --- [0.0s]
//   OK    per-fold field parsed: 102 rows
//   OK    W1(211) verbatim  got 6.1  want 6.1
//   OK    Mhat(211) verbatim  got 2.225  want 2.225
//   OK    Mhat(631) verbatim  got 4.482  want 4.482
//   OK    pull(631) verbatim  got 3.36  want 3.36
//   OK    theta(709) verbatim  got 1416  want 1416
//   OK    band mean [100,200)  got 0.9589634006636955  want 0.959
//   OK    band mean [200,300)  got 0.8585146984391886  want 0.858
//   OK    band mean [300,500)  got 0.5194805194805194  want 0.52
//   ok: theta = 2(p - eta) and 12 | theta at all 102 folds
//   analytic mbar vs table z over 102 folds: worst rel dev = 0.114% at p = 107  (record: 0.439% at 709)
//   exact W1 vs the printed 2-decimal column: worst |dev| = 0.0050 at p = 251  (printing precision; w1hl-01 record: 0.0050 at 251)
//   OK    B2 fitted-lambda rows parsed (307: 98.864, 421: 9.286, 709: 0.054)
//   ok: 65 deep folds upgraded to 5-figure Sl = 1.1211 * lam11 (B2 embed), all within 0.06 of the printed column
//   OK    A144311 ladder parsed: 22 rows
//   OK    c2p(37) verbatim  got 0.5939  want 0.5939
//   OK    G2(37#) verbatim  got 528  want 528
//   OK    G2(79#) verbatim  got 1710  want 1710
//   OK    external ladders parsed: 22 rows
//   OK    G2/h(37) verbatim  got 8  want 8
//   OK    h2/G2(37) verbatim  got 1.341  want 1.341
//   OK    h2(37#) verbatim  got 708  want 708
//   ok: G2 column identical across the two ladder embeds (22/22)
//
// --- Stage 1: calibration — the record's own fit reproduced --- [0.0s]
//   OK    train 37 / deep 65 split
//   train OLS (37 folds): k = 1.9485  delta = 0.2773  resid sd = 0.1715   [record: 1.9468, 0.2771, 0.177]
//   OK    k reproduces  got 1.9485218242159767  want 1.9468
//   OK    delta reproduces  got 0.2772517119304731  want 0.2771
//   deep Poisson MLE (65 folds, k held): delta_deep = 0.2526   [record: 0.252]
//   OK    deep delta reproduces  got 0.2525801696793235  want 0.252
//   measured flattening phi = delta_train - delta_deep = 0.0247  (the discriminating number)
//   c_ref check: slope of ln(Sl*p*mbar) on z = -1.0866   [law c = -1.0818; smooth kills-factor drift explains a few % of deviation]
//   OK    the Sl column carries the law's fixed exponent c = 1.0818 (within 0.05)
//
// --- Stage 2: candidate (iii) finite-size/edge, derived exactly --- [0.0s]
//   window-edge bound on |d ln E[X]|: pooled <= 2.53e-8,  worst single window (2e7) <= 2.84e-4
//   W1 truncation tail |ln W1_inf - ln W1_p|: mean = 4.33e-3,  worst = 2.03e-2 at p = 101
//   tilt slopes: train -2.44e-3  deep -3.46e-4  phi_pred 2.10e-3
//   VERDICT (iii): needs -0.277; predicts |s| <= ~1e-4 and phi ~ 0.  REFUTED by >= 3 orders (sign indeterminate at that size).
//
// --- Stage 3: candidate (ii) the derived null's depth structure --- [0.0s]
//   null window predictions rebuilt: total p>=100 = 5481.9  [THN: 5481.9]   decades 5.462e+3 / 1.958e+1 / 1.952e-4  [THN: 5.467e+3 / 1.962e+1 / 1.512e-4]
//   OK    THN null total reproduced within 2% (normalisation licensed)
//   OK    THN null decades reproduced (2-3%)
//   c_null ladder (derived): p=101: 1.0623   p=293: 1.0399   p=421: 1.0354   p=709: 1.0298
//   OK    c_null falls across the field, inside the THN fold-7/fold-1499 anchors
//   tilt slope decomposition (nats per unit z; a delta source needs -0.277):
//     exponent drift (c_law - c_null) z :  train 0.0643  deep 0.0647  phi 0.0004
//     amplitude drift  3/mbar           :  train -0.1090  deep -0.0452  phi 0.0639
//     FULL null (r_null, all terms)     :  train -0.0600  deep 0.0163  phi 0.0764
//   needed: s_train = -0.2773, phi = +0.0247
//   credited refit (full null subtracted): delta_train' = 0.2172  delta_deep' = 0.2031  phi' = 0.0141  resid sd' = 0.1703   (uncredited: 0.2773 / 0.2526 / 0.0247 / 0.1715)
//   VERDICT (ii): the null's own depth structure is two opposing drifts — the exponent drift is
//     ANTI-decay (+0.065/z, wrong sign) and the derived 3/mbar amplitude is decay (right sign,
//     fading with depth). Net: right sign, ~22% of delta at train depths, and a predicted
//     flattening of the right sign. Crediting it exactly leaves the bulk of delta underived.
//   [THN §4.3, cited: the CRT cascade's own second-order term composes to exponent 1.0302..1.1096
//    at u = 0.25..0.9 — at most ~0.08 above the null, an order below the ~0.33 the field needs.]
//
// --- Stage 4: candidate (i) second-order Gallagher / singular series --- [0.0s]
//   (i-a) integer-indexed E_v[W1_P]: P=101: 2.5010  P=709: 2.5178  -> truncation drift over the whole field = 0.67% in ln
//         (the needed depth effect over the same span is e^{-0.277*(13.5-3.9)} = 6.94e-2, i.e. -2.67 nats: the comb-mean channel is short by ~2 orders)
//         predicted spread sd(ln W1) ~ 0.465 (lognormal read of the exact V/E^2), measured over
//         the 102 folds = 0.515 — the second-moment layer prices the COMB SPREAD, which D4 already
//         carries via W1 exactly; it has no channel to the mean multiplier.  corr(ln W1, z) = 0.121 (no comb-depth conspiracy).
//   VERDICT (i-a): predicts delta = 0 (no channel) and no flattening.  Not the mechanism.
//   (i-b) per-prime mean-one over a full residue system: verified exactly at q in {7,13,31,97} x theta in {204,660,1260}
//         (so the WHOLE i-b effect below is the finite interior range 6..theta-6 breaking equidistribution)
//   (i-b) interior-comb correction  ell = -(6/mbar) * sum_j (W_int(j) - 1), exact per fold:
//         sample: p=101 D=-4.790 ell=0.5509   p=211 D=-4.030 ell=0.3449   p=421 D=-5.355 ell=0.3622   p=631 D=-5.868 ell=0.3490   p=709 D=-8.107 ell=0.4651
//         tilt slopes: train -0.0208  deep 0.0033  phi_pred 0.0241   (needed -0.277 / +0.0247)
//         corr(ell, train D4 residual) = 0.907   corr(ell, ln W1) over 102 folds = -0.013
//         flagged folds' ell vs field mean 0.3603:  311: 0.3385  331: 0.3452  409: 0.4554  631: 0.3490
//         credited refit: delta_train' = 0.2565  delta_deep' = 0.2374  phi' = 0.0191  resid sd' = 0.0830
//
// --- Stage 5: candidate scoreboard + held-out PLN scores --- [0.5s]
//   PLN calibration: deep LL of the record's D4 = -87.9   [record: -88.6; the 0.6-nat gap
//   is input printing precision across the parsed embed layers — it is grid-independent (Simpson
//   [-6,6] N=241 = trapezoid [-5,5] N=61 to 0.01 here) and cancels in every model DIFFERENCE below]
//   OK    PLN engine reproduces the record's deep D4 score to 1 nat
//
//   PARAMETER-FREE SCOREBOARD (tilt slope s_train needs -0.277; flattening phi needs +0.025):
//     candidate                                s_train    s_deep     phi_pred   verdict
//     (ii)  derived thinning null (full)        -0.0600    0.0163    0.0764   right sign, 22% of delta
//     (i-b) interior 6-tuple comb (exact)       -0.0208    0.0033    0.0241   phi on the nose; 8% of delta
//     (ii)+(i-b) combined                       -0.0808    0.0196    0.1004
//     (i-a) published second moments            0.0000    0.0000    0.0000   no channel to a mean
//     (iii) finite-size/edge (W1-tail term)     -0.0024   -0.0003    0.0021   2 orders short
//
//   CREDITED MODELS (train OLS for (k, delta); deep Poisson-MLE delta with k held; deep PLN with
//   the model's own train sd — every credit is exact arithmetic, zero new parameters):
//     model                        k'      delta_tr'  delta_dp'  phi'     sd_tr'   deep PLN LL
//     D4 (record, refit here)     1.949    0.2773    0.2526   0.0247   0.1715      -88.0
//     D4 + null credit (ii)      22.903    0.2172    0.2031   0.0141   0.1703      -85.4
//     D4 + interior (i-b)         1.203    0.2565    0.2374   0.0191   0.0830      -86.7
//     D4 + both credits          14.134    0.1964    0.1879   0.0085   0.0834      -84.3
//   D4+interior vs D4, held-out deep PLN: 1.2 nats;  both credits: 3.6 nats.
//   robustness: Pearson corr(ell_int, D4 train resid) = 0.907,  Spearman = 0.842
//
//   per-fold, train (p, theta, ell_int, D4 resid, resid after interior credit):
//      101   204   0.5509    0.249    0.099
//      103   204   0.5416    0.225    0.087
//      107   216   0.3141   -0.126   -0.040
//      109   216   0.3097   -0.137   -0.045
//      113   228   0.3048   -0.089    0.004
//      127   252   0.3224   -0.086   -0.017
//      131   264   0.2377   -0.290   -0.140
//      137   276   0.5460    0.182    0.022
//      139   276   0.5391    0.208    0.056
//      149   300   0.3053   -0.074    0.001
//      151   300   0.3022   -0.074    0.006
//      157   312   0.2069   -0.255   -0.083
//      163   324   0.2833   -0.148   -0.055
//      167   336   0.3728   -0.040   -0.039
//      173   348   0.4867    0.244    0.129
//      179   360   0.5321    0.239    0.076
//      181   360   0.5272    0.220    0.063
//      191   384   0.3610   -0.122   -0.119
//      193   384   0.3581   -0.055   -0.048
//      197   396   0.3833    0.079    0.059
//      199   396   0.3808    0.027    0.010
//      211   420   0.3449   -0.014   -0.001
//      223   444   0.3686   -0.004   -0.020
//      227   456   0.3081   -0.067   -0.026
//      229   456   0.3064   -0.083   -0.038
//      233   468   0.2162   -0.154   -0.021
//      239   480   0.2904   -0.122   -0.066
//      241   480   0.2884   -0.023    0.036
//      251   504   0.2844   -0.120   -0.062
//      257   516   0.5397    0.288    0.089
//      263   528   0.5791    0.356    0.115
//      269   540   0.3599   -0.039   -0.063
//      271   540   0.3579    0.067    0.046
//      277   552   0.2487   -0.108   -0.022
//      281   564   0.2287   -0.374   -0.270
//      283   564   0.2276    0.012    0.118
//      293   588   0.3762    0.207    0.159
//
// --- Stage 5b: the flagged folds and the band deficit, re-priced --- [0.5s]
//   deep Pearson pulls (Sx - mu)/sqrt(mu), the record's flag convention:
//     fold   D4 pull   credited pull
//      311     3.10       2.63
//      331     3.21       2.22
//      409     3.28       2.31
//      631     3.36       2.45
//   deep folds with |pull| > 3:  D4: 4   credited: 0
//
//   exposure-weighted band means (the record's 5c table), measured vs models:
//     band        measured      D4      credited(ii+i-b)
//     [100,200)      0.959      0.946      0.955
//     [200,300)      0.859      0.872      0.854
//     [300,500)      0.520      0.423      0.480
//     [500,710)      0.357      0.233      0.351
//   (D4's far-tail deficit — 0.423 predicted vs 0.520 measured on [300,500) [MPD §5] — is the
//    flattening seen as a band; the credited model's read of the same bands is above.)
//
// --- Stage 6: x = 37 through the HL lens --- [0.5s]
//   (6a) the fold comb at theta_x = 2(x - eta) and the tile comb at G2(x#), x = 11..79:
//      x  theta_x  W1(theta_x)   G2    W1_x(G2)  E_v[W1_x]  ratio   pctile
//     11     24      1.000     42     3.810     2.254   1.690     60%
//     13     24      1.143     66     1.286     2.331   0.552      0%
//     17     36      1.000    108     2.286     2.373   0.963     36%
//     19     36      1.077    150     3.200     2.407   1.330     80%
//     23     48      2.000    204     1.154     2.429   0.475     24%
//     29     60      3.000    258     2.222     2.442   0.910     48%
//     31     60      3.120    348     2.880     2.454   1.174     69%
//     37     72      2.667    528     2.571     2.462   1.044     58%
//     41     84      1.667    546     2.194     2.468   0.889     45%
//     43     84      1.712    618     3.160     2.474   1.277     72%
//     47     96      1.333    708     2.000     2.479   0.807     37%
//     53    108      2.286    870     4.480     2.483   1.804     90%
//     59    120      3.000    966     2.105     2.486   0.847     46%
//     61    120      3.055   1080     4.571     2.489   1.837     93%
//     67    132      2.857   1284     1.000     2.491   0.401      0%
//     71    144      1.000   1398     2.667     2.493   1.070     62%
//     73    144      1.015   1530     3.462     2.495   1.387     76%
//     79    156      1.862   1710     4.613     2.497   1.847     92%
//   W1_x(G2)/E ratio at 37 = 1.044; its percentile 58% sits inside the other levels' range [0%, 93%]
//
//   (6b) comb-corrected c2'' = G2/(m*(lnD + ln W1_x(G2))) vs the recorded c2':
//     11:0.3932  13:0.4321  17:0.4348  19:0.4181  23:0.4536  29:0.4285  31:0.4576  37:0.5732  41:0.4991  43:0.4753  47:0.4754  53:0.4997  59:0.4978  61:0.4869  67:0.5337  71:0.5147  73:0.5086  79:0.5163
//     c2'' band x=11..31: [0.3932, 0.4576]   c2''(37) = 0.5732   later terms above it: 0 of 10
//
//   (6c) leave-one-out log-midpoint residuals (series-noise units = rms of the series' own e_i, 37 excluded):
//     G2   e(37) =   0.1917   series rms = 0.0802   -> 2.39 noise units
//     h    e(37) =   0.0074   series rms = 0.0528   -> 0.14 noise units
//     h2   e(37) =  -0.0082   series rms = 0.0848   -> -0.10 noise units
//   OK    the 37 anomaly localises to G2 (h and h2 read as series noise there)
//   VERDICT x = 37: the anomaly is G2 being LARGE while h and h2 are normal, and NO HL-comb
//   quantity at the level is exceptional: theta_37 = 72 = 8*9 has no folded divisor >= 5 (comb from
//   the theta-2 side only), W1_37(528) sits mid-pack in ratio and percentile, and the comb-corrected
//   threshold moves c2'(37) by only ~ln(2.57)/26 ~ 3.6% against a ~19% spike. The HL layer is
//   UNEXCEPTIONAL at 37 — the third mechanism family closes, matching the anchored/mirror negative.
// ============================================================================
// READINGS
//
// ============================================================================
// READINGS
//
// 1. CALIBRATION FIRST, AND IT HOLDS. The record's two scalars reproduce from
//    the parsed embeds (k = 1.9485, delta = 0.2773, deep MLE 0.2526 vs the
//    record's 1.9468 / 0.2771 / 0.252), the exact-W1 recomputation matches the
//    printed column at worst 0.0050 (the w1hl-01 record's own printing figure),
//    the Sl column carries the law's fixed exponent (slope -1.0866 vs 1.0818),
//    and the PLN engine lands 0.6 nat from the record's -88.6 for reasons that
//    are grid-independent input rounding and cancel in every model difference.
//    The measured discriminator: flattening phi = 0.0247.
// 2. CANDIDATE (iii) — finite-size/edge — IS REFUTED BY ORDERS OF MAGNITUDE,
//    exactly as derived: window-edge <= 2.53e-8 pooled (2.84e-4 at the worst
//    single window), W1 truncation tail <= 2.03e-2 with tilt slopes ~ -0.0024
//    train / -0.0003 deep against the needed -0.277. No flattening shape.
// 3. CANDIDATE (ii) — the derived thinning null's own depth structure — is TWO
//    OPPOSING DRIFTS, and the net is right-signed but 4.6x short: the exponent
//    drift (c_law - c_null(p)) z is ANTI-decay (+0.0643/z), the derived 3/mbar
//    amplitude is decay (-0.1090/z train, fading to -0.0452 deep), net -0.0600
//    = 22% of delta. Its normalisation is custody-licensed (the THN embed's
//    zero-parameter window predictions reproduce: 5481.9 total, decades to
//    0.1-0.2%). Crediting it exactly leaves delta' = 0.2172 / 0.2031 — the
//    bulk of delta is NOT the null's depth correction, and the composed CRT
//    second-order bracket (1.0302..1.1096 [THN §4.3]) cannot reach it either.
// 4. CANDIDATE (i-a) — published second moments of singular series — has NO
//    CHANNEL to a per-fold mean multiplier: theta_p is deterministic and W1 is
//    carried exactly, so an ensemble variance prices spread, not mean. Its two
//    honest numbers: the truncation drift of E_v[W1_P] across the whole field
//    is 0.67% in ln (the needed depth effect is -2.67 nats, ~2 orders bigger),
//    and the exact second-moment spread sd ~ 0.465 vs measured sd(ln W1) =
//    0.515 — the layer prices the comb spread D4 already carries.
// 5. CANDIDATE (i-b) — THE SECOND SINGULAR-SERIES LAYER IS THE RESIDUAL
//    SUB-FIELD. The interior 6-tuple comb (each interior slot conditioned on
//    the endpoint quadruple, per-prime mean-one verified exactly, so the whole
//    effect is the finite interior range breaking equidistribution) is a
//    zero-parameter arithmetic field that:
//      - correlates 0.907 (Pearson; 0.842 Spearman) with the D4 train
//        residuals over the 37 train folds,
//      - halves the train roughness: resid sd 0.1715 -> 0.0830,
//      - predicts the far-tail flattening ON THE NOSE: phi_pred = 0.0241 vs
//        the measured 0.0247 —
//    while contributing only -0.0208 of tilt slope, i.e. ~8% of delta itself.
// 6. THE COMBINED CREDIT (null drift + interior comb, zero new parameters)
//    RESOLVES THE RECORD'S NAMED RESIDUAL STRUCTURE: all four flagged folds
//    drop below 3 (311: 3.10 -> 2.63, 331: 3.21 -> 2.22, 409: 3.28 -> 2.31,
//    631: 3.36 -> 2.45; deep |pull| > 3 count 4 -> 0), the band table repairs
//    ([300,500): 0.480 vs measured 0.520 where D4 said 0.423; [500,710):
//    0.351 vs measured 0.357 where D4 said 0.233), phi collapses 0.0247 ->
//    0.0085, and held-out deep PLN improves 3.6 nats with SHARPER bands
//    (sd 0.0834 vs 0.177).
// 7. DELTA ITSELF STAYS UNDERIVED. After all three candidate families are
//    credited, a constant-rate exponential remnant delta'' = 0.1964 / 0.1879
//    (train / deep — now nearly flat) remains, and no candidate supplies it:
//    (iii) is 2 orders short, (i-a) has no channel, (i-b) gives 8%, (ii) gives
//    22%. What the pass DID derive, with zero parameters, is the residual
//    sub-field mp-derivation §5 named (roughness, flattening, flags, band
//    deficit). The mechanism hunt for the remaining ~0.19 moves to what none
//    of these layers contain: the CRT dependence beyond first order (the
//    measured hazard-vs-tail steepness of THN §1.5).
// 8. x = 37 THROUGH THE HL LENS: UNEXCEPTIONAL, CLEANLY. W1_37(G2 = 528) =
//    2.571 sits at ratio 1.044 to its exact Gallagher mean and at the 58th
//    percentile of its own neighbourhood — mid-pack in a range [0%, 93%]
//    where the comb-loudest levels (61: 1.837, 79: 1.847) and the comb-mutest
//    (67: 0.401, W1 = 1.000 exactly) are all NON-anomalous levels. The fold
//    comb W1(theta_37 = 72) = 2.667 is mid-band. The comb-corrected threshold
//    c2''(37) = 0.5732 keeps the full spike (0 of 10 later terms above it).
//    The leave-one-out residuals localise the anomaly: G2 at +2.39 series-
//    noise units, h at +0.14, h2 at -0.10 — G2 is LARGE, h and h2 are NORMAL.
//    With the anchored/mirror layer already unexceptional [attack-anchored-01
//    §5], the HL/singular-series layer now closes as the third unexceptional
//    mechanism family at 37. The spike remains unexplained — and it remains
//    real.
// 9. LIMITS. The interior correction is first order in the level density
//    (6/mbar; interior-PAIR terms are second order and not computed) and is evaluated only at the dominant qualifying value theta_c
//    (the 4p and 6p channels carry their own interiors, e^-z-suppressed). The
//    credited k' values (22.9, 14.1, 1.203) absorb each tilt's constant level
//    and are not comparable to the record's k. The 0.907 correlation is a
//    train-band statement (37 folds); the deep folds enter only through the
//    MLE/PLN scores, which are exposure-limited. Nothing here was refit with
//    any new free parameter; every credit is exact arithmetic added to the
//    record's own two-scalar model.
// ============================================================================
