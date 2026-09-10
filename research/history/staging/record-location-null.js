// ============================================================================
// RECORD-LOCATION NULL (TODO Z5) — DOES THE 6.0% TREND-LOAD DEFICIT SURVIVE A
// CORRECTED NULL? SCRATCHPAD-GRADE, NOT FORMALLY EMBEDDED.
// ============================================================================
// THE QUESTION. zonegap-03-model.js §(b) measured the A113274 record ladder
// against a matched Kourbatov-Wolf pure-Exp record process: trend load
// A = mean_k g_k/T(e_k) reads 0.9295 against a null 0.9895 +- 0.0182, a 6.0%
// deficit at 3.3 null-sd. TODO item Z5 asks whether that survives once the
// correlation machinery the sealed preregs use (n_eff) is applied, before any
// mechanism is hunted.
//
// WHAT THIS FILE IS NOT. No new census, no sieve, no twin data beyond the
// adopted ladder. It re-runs zonegap-03-model.js's own estimator and null
// with the same seeds (gate), then applies four corrections to the null and
// two robustness checks. Every number it prints is SCRATCHPAD-GRADE:
//   node research/history/staging/record-location-null.js
//
// THE FOUR NULL VARIANTS TESTED
//   N0  as published: 200-rep matched ensemble, sd across reps.
//   N1  the INDEPENDENCE null (what a test that treated the 72 records as
//       independent draws would use): sd(g/T)/sqrt(72). Reported to show
//       which direction the correlation correction moves, and by how much.
//   N2  CONDITIONAL on the observed record count: OLS of A on N across the
//       ensemble, conditional mean and residual sd at N = 72. A and N are
//       not independent, so an unconditional band double-counts.
//   N3  MARGINAL-SUBTRACTED (the repo's pooling rule applied here): the
//       null's own mean of g/T is a function of height, and the data's 72
//       records sit at different heights from any one null realisation's.
//       Divide each record by the null's per-height marginal mu(ln e)
//       BEFORE pooling, then compare the ratio statistic.
//   R1  window robustness: A over [1e4, EMAX], [1e6, .], [1e8, .], [1e10, .].
//   R2  block-approximation validation: the null is exact gap-by-gap only to
//       1e7 and Gumbel block maxima above. Compare the two constructions on
//       a common range [1e4, 1e8] where both can run.
//
// DATA: research/a113274-gap-records.js, arrays EXTRACTED FROM SOURCE at
// runtime (never transcribed — records-placement-01.js's lesson).
// CITED, NOT RECOMPUTED (standing compute rule): zonegap-03-model.js's
// embedded S4 line "HL2 calibration ratio 1.000046 (1e10) -> 1.000032
// (1e11)" — abar(x) = ln^2 x/(2C2) is calibrated to 5e-5 against the custody
// pair counts, so a mis-scaled abar cannot be the 6%.
// ============================================================================
'use strict';
const fs = require('fs'), path = require('path');
const T0 = Date.now();
const C2 = 0.6601618158468696;
const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length;
const sd = (a) => { const m = mean(a); return Math.sqrt(mean(a.map(x => (x - m) * (x - m)))); };
const log = (s) => console.log(s);
const fail = (s) => { console.log('FAIL: ' + s); process.exit(1); };
const F = (x, d) => x.toFixed(d);

// ---- ladder, extracted from the adopted producer's source -------------------
const LSRC = fs.readFileSync(path.join(__dirname, '..', '..', 'a113274-gap-records.js'), 'utf8');
function extractArray(name) {
  const m = LSRC.match(new RegExp(name + String.raw` = \[([\s\S]*?)\];`));
  if (!m) fail('array ' + name + ' not found in ladder source');
  return m[1].match(/\d+/g).map(BigInt);
}
const GAP = extractArray('GAP'), START = extractArray('START');
if (GAP.length !== 82 || START.length !== 82) fail('ladder term counts');
for (let i = 1; i < 82; i++) {
  if (GAP[i] % 6n !== 0n || GAP[i] <= GAP[i - 1] || START[i] <= START[i - 1]) fail('ladder guards at n=' + (i + 1));
}
const E = START.map((s, i) => s + GAP[i] + 2n);           // zonegap-03 convention
const EMAX = Number(E[81]);
const L82 = GAP.map((g, k) => ({ e: Number(E[k]), g: Number(g) }));

// ---- zonegap-03-model.js's estimator and null, verbatim ---------------------
const abar = (x) => Math.log(x) * Math.log(x) / (2 * C2);
const trend = (x) => abar(x) * Math.log(x / abar(x));
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function estimators(recs, WLO, WHI) {
  const w = recs.filter(r => r.e >= WLO && r.e <= WHI);
  const n = w.length;
  const ln = w.map(r => Math.log(r.e));
  let sx = 0, sy = 0, sxx = 0, sxy = 0;
  for (let i = 0; i < n; i++) { const x = ln[i], y = i + 1; sx += x; sy += y; sxx += x * x; sxy += x * y; }
  const rate = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  const d = []; for (let i = 1; i < n; i++) d.push(ln[i] - ln[i - 1]);
  const z = w.map(r => (r.g - trend(r.e)) / abar(r.e));
  const load = w.map(r => r.g / trend(r.e));
  return { n, rate, dCV: sd(d) / mean(d), zMean: mean(z), zSd: sd(z),
           A: mean(load), load, ln, w };
}
function simulate(rnd, aFac, XEXACT, XTOP) {
  const recs = [];
  let x = 100, rm = 0;
  while (x < XEXACT) {
    const g = -Math.log(1 - rnd()) * aFac * abar(x);
    x += g;
    if (g > rm) { rm = g; recs.push({ e: x, g }); }
  }
  const dLn = 0.005, Lhi = Math.log(XTOP);
  for (let L = Math.log(XEXACT); L < Lhi; L += dLn) {
    const xl = Math.exp(L), xh = Math.exp(L + dLn), xm = Math.exp(L + dLn / 2);
    const N = (xh - xl) / (aFac * abar(xm));
    let u = rnd(); if (u < 1e-12) u = 1e-12; if (u > 1 - 1e-12) u = 1 - 1e-12;
    const m = aFac * abar(xm) * (Math.log(N) - Math.log(-Math.log(u)));
    if (m > rm) { rm = m; recs.push({ e: xm, g: m }); }
  }
  return recs;
}
const WLO = 1e4;

// ============================================================================
log('RECORD-LOCATION NULL (Z5) — scratchpad-grade. Ladder: 82 records,');
log('  extracted from research/a113274-gap-records.js at runtime.');
log('');

// ---- GATE: reproduce zonegap-03-model.js's published record block -----------
const data = estimators(L82, WLO, EMAX);
const gateNull = [];
for (let r = 0; r < 200; r++) gateNull.push(estimators(simulate(mulberry32(0xC0FFEE + r), 1, 1e7, EMAX), WLO, EMAX));
const gs = (f) => { const v = gateNull.map(f); return { m: mean(v), s: sd(v), v }; };
const gN = gs(o => o.n), gRate = gs(o => o.rate), gCV = gs(o => o.dCV),
      gZm = gs(o => o.zMean), gZs = gs(o => o.zSd), gA = gs(o => o.A);
{
  const want = [
    ['data n', data.n, 72], ['data A', +F(data.A, 4), 0.9295], ['data zMean', +F(data.zMean, 3), -1.298],
    ['data zSd', +F(data.zSd, 3), 1.021], ['data rate', +F(data.rate, 3), 2.562], ['data dCV', +F(data.dCV, 3), 0.908],
    ['null N', +F(gN.m, 1), 68.4], ['null N sd', +F(gN.s, 1), 7.9],
    ['null A', +F(gA.m, 4), 0.9895], ['null A sd', +F(gA.s, 4), 0.0182],
    ['null zMean', +F(gZm.m, 3), -0.212], ['null zMean sd', +F(gZm.s, 3), 0.244],
    ['null zSd', +F(gZs.m, 3), 1.264], ['null rate', +F(gRate.m, 3), 2.356],
    ['null dCV', +F(gCV.m, 3), 0.944],
  ];
  let bad = 0;
  for (const [tag, got, exp] of want) if (got !== exp) { log('  GATE FAIL [' + tag + ']: ' + got + ' != ' + exp); bad++; }
  if (bad) fail('gate: this file does not reproduce zonegap-03-model.js');
  log('GATE. All 15 published record-block figures of zonegap-03-model.js §(b)');
  log('  reproduced from the same seeds, digit for digit. The estimator and the');
  log('  null below are that file\'s, unmodified.');
}
log('');

// ---- N0: the published null -------------------------------------------------
const zN0 = (data.A - gA.m) / gA.s;
log('N0 (as published). A = ' + F(data.A, 4) + ' vs null ' + F(gA.m, 4) + ' +- ' + F(gA.s, 4) +
    ';  deficit ' + F(100 * (1 - data.A / gA.m), 2) + '% of trend,  z = ' + F(zN0, 2) +
    ',  MC tail ' + gA.v.filter(a => a <= data.A).length + '/200.');

// ---- N1: the independence null ---------------------------------------------
{
  const sIndep = sd(data.load) / Math.sqrt(data.n);
  const nullWithin = mean(gateNull.map(o => sd(o.load)));
  log('N1 (independence null — records treated as 72 independent draws).');
  log('  sd(g/T) = ' + F(sd(data.load), 4) + ', /sqrt(72) = ' + F(sIndep, 5) + '  =>  z = ' +
      F((data.A - gA.m) / sIndep, 1) + '.');
  log('  (the null\'s own within-realisation sd(g/T) = ' + F(nullWithin, 4) + ', /sqrt(68.4) = ' +
      F(nullWithin / Math.sqrt(gN.m), 5) + ' — same order.)');
  log('  The ensemble sd is ' + F(gA.s / sIndep, 2) + 'x WIDER than the independence sd: the');
  log('  record-process correlation correction is ALREADY inside the published');
  log('  sigma. n_eff-style deflation cannot be applied a second time; applied to');
  log('  N0 it would move the test the wrong way, to z = ' + F((data.A - gA.m) / sIndep, 1) + '.');
}
log('');

// ---- the larger ensemble (N2, N3, R1 all read off it) -----------------------
const BIG = 5000;
const bigRecs = [];
for (let r = 0; r < BIG; r++) bigRecs.push(simulate(mulberry32(0x5EED00 + r), 1, 1e7, EMAX));
const big = bigRecs.map(rc => estimators(rc, WLO, EMAX));
const bA = big.map(o => o.A), bN = big.map(o => o.n);
const bAm = mean(bA), bAs = sd(bA);
{
  const skew = mean(bA.map(a => Math.pow((a - bAm) / bAs, 3)));
  log('BIG ENSEMBLE (' + BIG + ' reps, fresh seeds). A = ' + F(bAm, 4) + ' +- ' + F(bAs, 4) +
      ', skew ' + F(skew, 2) + ',');
  log('  min A over ' + BIG + ' reps = ' + F(Math.min(...bA), 4) + ', reps with A <= data: ' +
      bA.filter(a => a <= data.A).length + '/' + BIG + '.  z = ' + F((data.A - bAm) / bAs, 2) + '.');
}

// ---- N2: conditional on the observed record count ---------------------------
{
  const mn = mean(bN), ma = bAm;
  let sxy = 0, sxx = 0;
  for (let i = 0; i < BIG; i++) { sxy += (bN[i] - mn) * (bA[i] - ma); sxx += (bN[i] - mn) * (bN[i] - mn); }
  const b = sxy / sxx, r = sxy / Math.sqrt(sxx * BIG * bAs * bAs);
  const resid = bA.map((a, i) => a - (ma + b * (bN[i] - mn)));
  const sRes = sd(resid);
  const condMean = ma + b * (data.n - mn);
  log('N2 (conditional on N = ' + data.n + '). corr(A, N) = ' + F(r, 3) + ', slope ' + F(b, 5) + ' per record.');
  log('  E[A | N=72] = ' + F(condMean, 4) + ', residual sd ' + F(sRes, 4) + '  =>  deficit ' +
      F(100 * (1 - data.A / condMean), 2) + '%, z = ' + F((data.A - condMean) / sRes, 2) + '.');
}

// ---- N3: marginal-subtracted (the pooling rule) -----------------------------
{
  // per-height marginal mu(ln e) of g/T, pooled over the big ensemble
  const LO = Math.log(WLO), HI = Math.log(EMAX), NB = 15, W = (HI - LO) / NB;
  const sum = new Array(NB).fill(0), cnt = new Array(NB).fill(0);
  for (const o of big) for (let i = 0; i < o.n; i++) {
    const b = Math.min(NB - 1, Math.floor((o.ln[i] - LO) / W));
    sum[b] += o.load[i]; cnt[b]++;
  }
  const mu = sum.map((s, i) => (cnt[i] ? s / cnt[i] : NaN));
  if (cnt.some(c => c < 30)) fail('a height bin has < 30 null records; rebin');
  const marg = (o) => {
    const v = [];
    for (let i = 0; i < o.n; i++) v.push(o.load[i] / mu[Math.min(NB - 1, Math.floor((o.ln[i] - LO) / W))]);
    return mean(v);
  };
  const dM = marg(data), nM = big.map(marg), nMm = mean(nM), nMs = sd(nM);
  log('N3 (marginal-subtracted: each record divided by the null\'s own mean g/T');
  log('  at its height, ' + NB + ' bins in ln e, before pooling — the repo\'s rule that a');
  log('  pooled test subtracts per-unit marginals first).');
  log('  data ' + F(dM, 4) + ' vs null ' + F(nMm, 4) + ' +- ' + F(nMs, 4) + '  =>  deficit ' +
      F(100 * (1 - dM / nMm), 2) + '%, z = ' + F((dM - nMm) / nMs, 2) +
      ', MC tail ' + nM.filter(v => v <= dM).length + '/' + BIG + '.');
  log('  null height marginals mu(ln e), bin centres ' + F(LO + W / 2, 1) + '..' + F(HI - W / 2, 1) + ':');
  log('    ' + mu.map(m => F(m, 3)).join(' '));
}
log('');

// ---- R1: window robustness ---------------------------------------------------
log('R1 (window robustness — WLO = 1e4 is a choice; the deficit must not be it):');
log('    window        n(data)   A(data)   null A +- sd     deficit    z');
for (const lo of [1e4, 1e6, 1e8, 1e10, 1e12]) {
  const d = estimators(L82, lo, EMAX);
  const nv = big.map(o => estimators(o.w, lo, EMAX).A).filter(a => isFinite(a));
  const m = mean(nv), s = sd(nv);
  log('    [' + lo.toExponential(0) + ', 7.0e16]' + String(d.n).padStart(7) + '   ' + F(d.A, 4) +
      '    ' + F(m, 4) + ' +- ' + F(s, 4) + '   ' + F(100 * (1 - d.A / m), 2).padStart(6) + '%  ' +
      F((d.A - m) / s, 2).padStart(6));
}
log('');

// ---- R1b: disjoint height bands (the size of what survives, by height) ------
log('R1b (DISJOINT bands, data vs null; n small per band, read as a profile only):');
log('    band              n(data)  A(data)   null A +- sd    deficit    z');
for (const [lo, hi] of [[1e4, 1e8], [1e8, 1e11], [1e11, 1e14], [1e14, EMAX]]) {
  const d = estimators(L82, lo, hi);
  const nv = big.map(o => estimators(o.w, lo, hi)).filter(o => o.n >= 2).map(o => o.A);
  const m = mean(nv), s = sd(nv);
  log('    [' + lo.toExponential(0) + ', ' + hi.toExponential(0) + ']' + String(d.n).padStart(8) + '   ' + F(d.A, 4) +
      '    ' + F(m, 4) + ' +- ' + F(s, 4) + '  ' + F(100 * (1 - d.A / m), 2).padStart(6) + '%  ' +
      F((d.A - m) / s, 2).padStart(6));
}
log('');

// ---- R2: block-approximation validation --------------------------------------
{
  const XT = 1e8, REP = 200;
  const exactA = [], hybA = [], exactN = [], hybN = [];
  for (let r = 0; r < REP; r++) {
    const e1 = estimators(simulate(mulberry32(0xA11CE0 + r), 1, XT, XT), WLO, XT);
    const e2 = estimators(simulate(mulberry32(0xB0B0E0 + r), 1, 1e7, XT), WLO, XT);
    if (e1.n > 1) { exactA.push(e1.A); exactN.push(e1.n); }
    if (e2.n > 1) { hybA.push(e2.A); hybN.push(e2.n); }
  }
  const em = mean(exactA), es = sd(exactA), hm = mean(hybA), hs = sd(hybA);
  log('R2 (block approximation vs exact, common window [1e4, 1e8], ' + REP + ' reps each):');
  log('    exact gap-by-gap:  A = ' + F(em, 4) + ' +- ' + F(es, 4) + ', N = ' + F(mean(exactN), 1));
  log('    hybrid (blocks>1e7): A = ' + F(hm, 4) + ' +- ' + F(hs, 4) + ', N = ' + F(mean(hybN), 1));
  const dz = (hm - em) / Math.sqrt(es * es / exactA.length + hs * hs / hybA.length);
  log('    difference ' + F(100 * (hm / em - 1), 2) + '% of A, ' + F(dz, 2) +
      ' s.e. — against a measured deficit of ' + F(100 * (1 - data.A / gA.m), 2) + '%.');
}
log('');
log('done in ' + F((Date.now() - T0) / 1000, 1) + ' s');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/record-location-null.js
//   invocation:  node research/history/staging/record-location-null.js
//   code-sha256: 080f862381cb5fcf2ba85a80a4fff6a22bdf945c87a17927a8175b6f57655e18
//   out-sha256:  673e3f89b434bb8f286a18fea5dcf782b0fbe5c30e9e978081e877872eb50046
//   body-lines:  48
//   inputs:      research/history@c5b6ecc62124
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     15.5 s
// ============================================================================
// RECORD-LOCATION NULL (Z5) — scratchpad-grade. Ladder: 82 records,
//   extracted from research/a113274-gap-records.js at runtime.
//
// GATE. All 15 published record-block figures of zonegap-03-model.js §(b)
//   reproduced from the same seeds, digit for digit. The estimator and the
//   null below are that file's, unmodified.
//
// N0 (as published). A = 0.9295 vs null 0.9895 +- 0.0182;  deficit 6.06% of trend,  z = -3.30,  MC tail 0/200.
// N1 (independence null — records treated as 72 independent draws).
//   sd(g/T) = 0.0743, /sqrt(72) = 0.00876  =>  z = -6.9.
//   (the null's own within-realisation sd(g/T) = 0.0962, /sqrt(68.4) = 0.01163 — same order.)
//   The ensemble sd is 2.08x WIDER than the independence sd: the
//   record-process correlation correction is ALREADY inside the published
//   sigma. n_eff-style deflation cannot be applied a second time; applied to
//   N0 it would move the test the wrong way, to z = -6.9.
//
// BIG ENSEMBLE (5000 reps, fresh seeds). A = 0.9891 +- 0.0178, skew 0.31,
//   min A over 5000 reps = 0.9288, reps with A <= data: 1/5000.  z = -3.34.
// N2 (conditional on N = 72). corr(A, N) = -0.703, slope -0.00162 per record.
//   E[A | N=72] = 0.9833, residual sd 0.0127  =>  deficit 5.48%, z = -4.24.
// N3 (marginal-subtracted: each record divided by the null's own mean g/T
//   at its height, 15 bins in ln e, before pooling — the repo's rule that a
//   pooled test subtracts per-unit marginals first).
//   data 0.9413 vs null 1.0014 +- 0.0180  =>  deficit 6.01%, z = -3.33, MC tail 1/5000.
//   null height marginals mu(ln e), bin centres 10.2..37.8:
//     0.998 0.992 0.990 0.985 0.985 0.986 0.985 0.985 0.987 0.985 0.986 0.987 0.988 0.989 0.989
//
// R1 (window robustness — WLO = 1e4 is a choice; the deficit must not be it):
//     window        n(data)   A(data)   null A +- sd     deficit    z
//     [1e+4, 7.0e16]     72   0.9295    0.9891 +- 0.0178     6.03%   -3.34
//     [1e+6, 7.0e16]     64   0.9238    0.9880 +- 0.0151     6.50%   -4.26
//     [1e+8, 7.0e16]     56   0.9293    0.9881 +- 0.0137     5.95%   -4.28
//     [1e+10, 7.0e16]     48   0.9325    0.9887 +- 0.0138     5.68%   -4.07
//     [1e+12, 7.0e16]     33   0.9499    0.9896 +- 0.0150     4.01%   -2.65
//
// R1b (DISJOINT bands, data vs null; n small per band, read as a profile only):
//     band              n(data)  A(data)   null A +- sd    deficit    z
//     [1e+4, 1e+8]      16   0.9301    0.9989 +- 0.0555    6.88%   -1.24
//     [1e+8, 1e+11]      15   0.8881    0.9910 +- 0.0326   10.39%   -3.16
//     [1e+11, 1e+14]      24   0.9280    0.9904 +- 0.0227    6.29%   -2.75
//     [1e+14, 7e+16]      17   0.9674    0.9915 +- 0.0181    2.43%   -1.33
//
// R2 (block approximation vs exact, common window [1e4, 1e8], 200 reps each):
//     exact gap-by-gap:  A = 0.9989 +- 0.0541, N = 18.9
//     hybrid (blocks>1e7): A = 0.9956 +- 0.0566, N = 19.4
//     difference -0.33% of A, -0.59 s.e. — against a measured deficit of 6.06%.
//
// done in 15.4 s
// ============================================================================
// READINGS
// ============================================================================
