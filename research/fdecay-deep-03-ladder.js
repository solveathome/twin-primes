'use strict';
// ============================================================================
// fdecay-deep 03 — the qualifying fraction f measured OUT OF SAMPLE, x to 907
// ============================================================================
// Pre-registration: `research/history/staging/fdecay-deep-prereg.md`, committed
// alone before any producer existed. Instrument: `fdecay-deep-00-core.js`, a
// segmented window sieve (the `LOCALIZED-GAP.md` §10 lever). Companion:
// `fdecay-deep-01-census-defect.js`, which is why the published 42-point census
// is quoted here only as the object under test.
//
// f_win IS AN ESTIMATE OF THE TILE QUANTITY. It is the same ratio over a window
// of the period rather than over the whole period, and §2 measures the error of
// that substitution by drawing uniformly random offsets of the period (CRT) and
// comparing them with the prefix [0, X) that the localized frame normally uses.
//
// L_win IS A PROVEN LOWER BOUND on the tile L at the same fold, and nothing
// more: the window holds X/mbar slots against the period's p*D, so it reads the
// same first-moment law at a far smaller sample size (prereg §1, §6).
// ============================================================================

const C = require('./fdecay-deep-00-core.js');
const t00 = Date.now();
const el = () => ((Date.now() - t00) / 1000).toFixed(1);
const log = console.log;
const XS = Number(process.argv[2] || 2e9);          // shallow window, x <= 199
const XD = Number(process.argv[3] || 1e11);         // deep window,    x >= 211

const PR = C.primesUpTo(200000);
const nextPrime = x => PR.find(q => q > x);
const CENSUS_X = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199];
const DEEP_X = [211, 251, 307, 353, 401, 449, 503, 547, 601, 653, 701, 773, 829, 907];

// CITED, `research/a3-03-f-from-census.js` embedded OUTPUT §5, the 42 published
// points. Quoted to be tested, not to be believed: see 01-census-defect.
const PUB = { 11: 4.444e-2, 13: 4.848e-2, 17: 4.884e-2, 19: 3.112e-2, 23: 3.066e-2, 29: 3.737e-2, 31: 1.844e-2, 37: 7.509e-3, 41: 8.870e-3, 43: 8.660e-3, 47: 1.303e-2, 53: 7.969e-3, 59: 9.094e-3, 61: 5.298e-3, 67: 6.890e-4, 71: 8.024e-4, 73: 3.300e-3, 79: 4.026e-3, 83: 4.209e-3, 89: 1.810e-3, 97: 7.262e-4, 101: 8.144e-4, 103: 4.126e-4, 107: 4.567e-4, 109: 8.960e-4, 113: 8.177e-4, 127: 3.346e-4, 131: 2.460e-4, 137: 2.662e-4, 139: 4.423e-4, 149: 4.830e-4, 151: 2.880e-4, 157: 1.499e-4, 163: 1.707e-4, 167: 3.299e-4, 173: 2.851e-4, 179: 3.082e-4, 181: 5.736e-5, 191: 6.189e-5, 193: 7.956e-5, 197: 8.617e-5, 199: 2.653e-4 };

// PRE-REGISTERED specifications, from the prereg §2 table (refit there on the
// 42 published points; reproduced here so the scoring uses the registered
// numbers and not a fresh fit).
const SPEC = {
  'A-full': [1.0006, 1.4506, 0],
  'B-comb': [1.5294, 1.4819, -1.0251],
  'B-lower': [0.5390, 1.8656, -1.0590],
  'B-upper': [3.3143, 1.1148, -0.9910]
};
const predOf = (co, T, S) => co[0] + co[1] * T + co[2] * S;

function ols(rows, cols, y) {
  const n = rows.length, k = cols.length, A = [];
  for (let a = 0; a < k; a++) A.push(new Array(k + 1).fill(0));
  for (const r of rows) { const X = cols.map(c => c(r)), yy = y(r); for (let a = 0; a < k; a++) { for (let b = 0; b < k; b++) A[a][b] += X[a] * X[b]; A[a][k] += X[a] * yy; } }
  const M = A.map(r => r.slice());
  for (let c = 0; c < k; c++) { let piv = c; for (let r2 = c + 1; r2 < k; r2++) if (Math.abs(A[r2][c]) > Math.abs(A[piv][c])) piv = r2; [A[c], A[piv]] = [A[piv], A[c]]; for (let r2 = 0; r2 < k; r2++) { if (r2 === c) continue; const f = A[r2][c] / A[c][c]; for (let cc = c; cc <= k; cc++) A[r2][cc] -= f * A[c][cc]; } }
  const co = []; for (let c = 0; c < k; c++) co.push(A[c][k] / A[c][c]);
  let ssr = 0, sst = 0; const mn = rows.reduce((s, r) => s + y(r), 0) / n;
  for (const r of rows) { const X = cols.map(c => c(r)); let yh = 0; for (let a = 0; a < k; a++) yh += co[a] * X[a]; ssr += (y(r) - yh) ** 2; sst += (y(r) - mn) ** 2; }
  // SE of the slope on the FIRST regressor after the intercept, by the usual
  // (X'X)^{-1} sigma^2, computed by Gauss-Jordan on the unpivoted normal matrix
  const s2 = ssr / Math.max(1, n - k);
  const G = M.map(r => r.slice(0, k)); const I = [];
  for (let a = 0; a < k; a++) { I.push(new Array(k).fill(0)); I[a][a] = 1; }
  for (let c = 0; c < k; c++) { let piv = c; for (let r2 = c + 1; r2 < k; r2++) if (Math.abs(G[r2][c]) > Math.abs(G[piv][c])) piv = r2; [G[c], G[piv]] = [G[piv], G[c]]; [I[c], I[piv]] = [I[piv], I[c]]; const dv = G[c][c]; for (let cc = 0; cc < k; cc++) { G[c][cc] /= dv; I[c][cc] /= dv; } for (let r2 = 0; r2 < k; r2++) { if (r2 === c) continue; const f = G[r2][c]; for (let cc = 0; cc < k; cc++) { G[r2][cc] -= f * G[c][cc]; I[r2][cc] -= f * I[c][cc]; } } }
  const se = co.map((_, a) => Math.sqrt(Math.max(0, s2 * I[a][a])));
  return { co, se, r2: 1 - ssr / sst, n };
}

log('== fdecay-deep 03: f OUT OF SAMPLE, BY SEGMENTED WINDOW ==');
log(`shallow window X = ${XS.toExponential(2)} over the 42 census levels; deep window X = ${XD.toExponential(2)} over x = 211..907`);
log('every f below is a WINDOW ESTIMATE of the tile ratio, never the tile ratio itself');

// ---------------------------------------------------------------- §1 ------
log('\n== 1. THE MEASURED DIAGONAL ==');
const runS = C.measure({ X: XS, levels: CENSUS_X, checkpoints: [] });
log(`  [${el()}s] shallow run done`);
const runD = C.measure({ X: XD, levels: DEEP_X, checkpoints: [] });
log(`  [${el()}s] deep run done`);
const ROWS = [];
for (const [run, X] of [[runS, XS], [runD, XD]]) for (const w of run.rows) {
  const T = 2 * w.p / w.mbarExact, lnf = w.nqual > 0 ? Math.log(1 / w.f) : NaN;
  ROWS.push({ x: w.x, p: w.p, dmin: w.dmin, X, N: w.N, ngap: w.ngap, K: w.nqual, f: w.f, lnf, T, S: w.lnSx, lnD: w.lnDx, Lwin: w.Lwin, L0: w.Lcopy0, maxGap: w.maxGap, mbarR: (X / w.N) / w.mbarExact, hist: w.qhist });
}
log('  x | p | d_min | X | N | mbar_win/mbar_exact | gaps | K qualifying | f_win | ln(1/f) | 2p/mbar | ln s | ln D | L_win | L(copy 0) | max gap | first term %');
for (const r of ROWS) {
  const share = r.hist.length ? 100 * r.hist[0][1] / r.K : NaN;
  log(`  ${r.x} | ${r.p} | ${r.dmin} | ${r.X.toExponential(1)} | ${r.N} | ${r.mbarR.toFixed(5)} | ${r.ngap} | ${r.K} | ${r.K > 0 ? r.f.toExponential(4) : '0'} | ${isFinite(r.lnf) ? r.lnf.toFixed(4) : '-'} | ${r.T.toFixed(3)} | ${r.S.toFixed(3)} | ${r.lnD.toFixed(1)} | ${r.Lwin} | ${r.L0} | ${r.maxGap} | ${isFinite(share) ? share.toFixed(2) : '-'}`);
}
log('  K is the count the whole estimate rests on: the relative standard error of f_win is 1/sqrt(K),');
log('  so a row with K below about 10 carries no usable digit and is reported for its existence only.');

// ---------------------------------------------------------------- §2 ------
log('\n== 2. IS THE PREFIX AN UNBIASED WINDOW? PREFIX vs UNIFORMLY RANDOM OFFSETS ==');
log('  the prefix [0, X) is the window the localized frame uses. A uniformly random offset Z of the');
log('  period (Z mod q drawn independently for every q, which by CRT is uniform mod x#) is unbiased');
log('  for the tile ratio BY CONSTRUCTION. If the two agree, the prefix carries no head bias for f.');
{
  const LV = [101, 151, 199], XO = 2e8, NS = 8;
  log(`  window length ${XO.toExponential(1)}, ${NS} independent random offsets against the prefix`);
  log('  x | prefix f | random-offset f, seed by seed | pooled random f | pooled/prefix | pooled K');
  for (const x of LV) {
    const p0 = C.measure({ X: XO, levels: [x], checkpoints: [], seed: 0 }).rows[0];
    const fs = [], ks = [], gs = [];
    for (let s = 1; s <= NS; s++) { const r = C.measure({ X: XO, levels: [x], checkpoints: [], seed: s }).rows[0]; fs.push(r.f); ks.push(r.nqual); gs.push(r.ngap); }
    const K = ks.reduce((a, b) => a + b, 0), G = gs.reduce((a, b) => a + b, 0), fp = K / G;
    log(`  ${x} | ${p0.f.toExponential(4)} | ${fs.map(v => v.toExponential(3)).join(' ')} | ${fp.toExponential(4)} | ${(fp / p0.f).toFixed(4)} | ${K}`);
  }
  log(`  [${el()}s]`);
}

// ---------------------------------------------------------------- §3 ------
log('\n== 3. AGAINST THE PUBLISHED 42-POINT CENSUS (CITED, a3-03-f-from-census.js OUTPUT §5) ==');
log('  x | 2p/mbar | f_win (measured here) | f published | measured/published | K | 3 sigma band');
for (const r of ROWS) {
  if (!(r.x in PUB)) continue;
  const rel = r.f / PUB[r.x], sig = 3 / Math.sqrt(Math.max(1, r.K));
  log(`  ${r.x} | ${r.T.toFixed(3)} | ${r.f.toExponential(4)} | ${PUB[r.x].toExponential(4)} | ${rel.toFixed(4)} | ${r.K} | +-${sig.toFixed(4)}`);
}
{
  const rs = ROWS.filter(r => r.x in PUB);
  const lo = rs.filter(r => r.x <= 31), hi = rs.filter(r => r.x >= 37);
  log(`  x <= 31 (every prime of the tile below 32): ratio ${Math.min(...lo.map(r => r.f / PUB[r.x])).toFixed(4)} to ${Math.max(...lo.map(r => r.f / PUB[r.x])).toFixed(4)}`);
  log(`  x >= 37 (the tile has a prime above 32): ratio ${Math.min(...hi.map(r => r.f / PUB[r.x])).toFixed(4)} to ${Math.max(...hi.map(r => r.f / PUB[r.x])).toFixed(4)}`);
  const fit = ols(hi, [() => 1, r => Math.log(r.x)], r => Math.log(r.f / PUB[r.x]));
  log(`  ln(measured/published) on ln x over x >= 37: slope ${fit.co[1].toFixed(4)} +- ${fit.se[1].toFixed(4)}, R2 ${fit.r2.toFixed(4)}`);
  log('  the split at 32 is not a fitted boundary: it is where the published evaluator first shifts by 32');
  log('  or more. `fdecay-deep-01-census-defect.js` carries the mechanism and the corrected values.');
}

// ---------------------------------------------------------------- §4 ------
log('\n== 4. THE DECAY LAW, REFIT ON THE MEASURED POINTS ==');
const USE = ROWS.filter(r => r.K >= 10 && isFinite(r.lnf));
{
  const one = () => 1, T = r => r.T, S = r => r.S, Y = r => r.lnf;
  const sets = [['all measured, K>=10', USE], ['x <= 199 only', USE.filter(r => r.x <= 199)], ['x >= 211 only (out of sample)', USE.filter(r => r.x >= 211)], ['lower half', USE.slice(0, Math.floor(USE.length / 2))], ['upper half', USE.slice(Math.floor(USE.length / 2))]];
  log('  set | n | ln(1/f) = a + b*(2p/mbar) | R2 | with the comb: a + b*T + c*ln s | R2');
  const FITS = {};
  for (const [nm, rs] of sets) {
    if (rs.length < 4) continue;
    const A = ols(rs, [one, T], Y), B = ols(rs, [one, T, S], Y);
    FITS[nm] = B;
    log(`  ${nm} | ${rs.length} | ${A.co[0].toFixed(3)} + ${A.co[1].toFixed(4)}(+-${A.se[1].toFixed(4)})*T | ${A.r2.toFixed(4)} | ${B.co[0].toFixed(3)} + ${B.co[1].toFixed(4)}(+-${B.se[1].toFixed(4)})*T ${B.co[2] < 0 ? '-' : '+'} ${Math.abs(B.co[2]).toFixed(3)}*S | ${B.r2.toFixed(4)}`);
  }
  log('  published for comparison (CITED, fitted on the defective points): 1.001 + 1.451*T, R2 0.9020;');
  log('    with the comb 1.529 + 1.482*T - 1.025*S, R2 0.9639.');
  const D = ols(USE, [one, r => Math.log(Math.log(r.x))], r => Math.log(r.lnD / r.lnf));
  log(`  downstream, U-FRAME §5a step 6/7: ln L_indep = ${D.co[0].toFixed(3)} + ${D.co[1].toFixed(3)}(+-${D.se[1].toFixed(3)})*lnln x, R2 ${D.r2.toFixed(4)}`);
  log('    published: ln L = -1.884 + 2.892*lnln x, R2 0.972. An exponent near 2 is the polylog branch.');
  module.exports = { FITS };
}
const BEST = ols(USE, [() => 1, r => r.T, r => r.S], r => r.lnf);

// ---------------------------------------------------------------- §5 ------
log('\n== 5. SCORING THE PRE-REGISTRATION ==');
log('  the band is [min, max] over the four registered specifications, all fitted on the PUBLISHED points');
log('  x | K | measured ln(1/f) | A-full | B-comb | B-lower | B-upper | band | verdict | residual vs B-comb');
const RES = [];
for (const r of USE) {
  if (r.x < 211) continue;
  const v = Object.entries(SPEC).map(([, co]) => predOf(co, r.T, r.S));
  const band = [Math.min(...v), Math.max(...v)];
  const verdict = r.lnf < band[0] ? 'BELOW (f larger, decay slower)' : (r.lnf > band[1] ? 'ABOVE (f smaller, decay faster)' : 'INSIDE');
  const res = r.lnf - v[1];
  RES.push({ x: r.x, res, K: r.K, verdict });
  log(`  ${r.x} | ${r.K} | ${r.lnf.toFixed(3)} | ${v[0].toFixed(2)} | ${v[1].toFixed(2)} | ${v[2].toFixed(2)} | ${v[3].toFixed(2)} | [${band[0].toFixed(2)},${band[1].toFixed(2)}] | ${verdict} | ${res >= 0 ? '+' : ''}${res.toFixed(3)}`);
}
{
  const ins = RES.filter(r => r.verdict === 'INSIDE').length;
  const mean = RES.reduce((s, r) => s + r.res, 0) / RES.length;
  log(`  R3: predicted INSIDE at every deep level, and mean residual vs B-comb NEGATIVE with |mean| <= 3.`);
  log(`      SCORE: ${ins} of ${RES.length} inside; mean residual ${mean.toFixed(3)} -> ${mean < 0 ? 'negative' : 'POSITIVE, against the registered sign'}; |mean| ${Math.abs(mean) <= 3 ? '<= 3, as registered' : '> 3, outside the registered bound'}.`);
  const tr = ols(RES, [() => 1, r => Math.log(r.x)], r => r.res);
  const t = tr.co[1] / tr.se[1];
  log(`  R4: residual on ln x, slope ${tr.co[1].toFixed(3)} +- ${tr.se[1].toFixed(3)}, t = ${t.toFixed(2)} (registered: negative slope, |t| < 3).`);
  log(`      SCORE: ${Math.abs(t) < 3 ? 'no significant trend' : (t > 0 ? 'SIGNIFICANT POSITIVE — the true decay outruns the published fit' : 'SIGNIFICANT NEGATIVE — the published fit over-states the decay')}.`);
}

// ---------------------------------------------------------------- §6 ------
log('\n== 6. THE CROSSINGS, RECOMPUTED FROM THE MEASURED LAW ==');
log('  form 1, f-decays / U-FRAME §5a step 6: L = ln D / ln(1/f)');
log('  form 2, import-sofic §4 estimator C, the only one that record found flat:');
log('          L_hat = [1 + ln(2D)/ln(2/f)] / 1.4965, the 1.4965 measured on nine folds at p <= 37');
{
  const lnDx = x => C.lnD(x, PR), mg = x => C.meanGap(x, PR);
  const lnSx = x => { const p = nextPrime(x); return C.lnS(x, 6 * C.k0of(p), PR); };
  const lnfHat = x => { const p = nextPrime(x); return BEST.co[0] + BEST.co[1] * (2 * p / mg(x)) + BEST.co[2] * lnSx(x); };
  log('  x | p | measured or fitted ln(1/f) | L = lnD/ln(1/f) | L_hat (estimator C) | L_hat raw | 0.31p/lnp | 0.19p/lnp');
  const meas = new Map(USE.map(r => [r.x, r.lnf]));
  for (const x of [199, 211, 307, 401, 503, 601, 701, 773, 907, 1009, 1499, 2297, 3001, 6323]) {
    const p = nextPrime(x), lf = meas.has(x) ? meas.get(x) : lnfHat(x), lD = lnDx(x);
    const L1 = lD / lf, raw = 1 + (lD + Math.log(2)) / (Math.log(2) + lf), L2 = raw / 1.4965;
    log(`  ${x} | ${p} | ${lf.toFixed(3)}${meas.has(x) ? ' MEASURED' : ' fitted'} | ${L1.toFixed(2)} | ${L2.toFixed(2)} | ${raw.toFixed(2)} | ${(0.31 * p / Math.log(p)).toFixed(2)} | ${(0.19 * p / Math.log(p)).toFixed(2)}`);
  }
  const stays = (Lof, c) => {
    const lv = PR.filter(q => q >= 11 && q <= 50000);
    const below = lv.map(x => Lof(x) < c * nextPrime(x) / Math.log(nextPrime(x)));
    let i = below.length - 1; while (i >= 0 && below[i]) i--;
    return i + 1 < below.length ? lv[i + 1] : null;
  };
  const L1of = x => lnDx(x) / lnfHat(x);
  const L2of = x => (1 + (lnDx(x) + Math.log(2)) / (Math.log(2) + lnfHat(x))) / 1.4965;
  log('  stays-below levels (smallest x from which the inequality holds at every prime level to 50000):');
  log(`    form 1: 0.31 from x = ${stays(L1of, 0.31)}, 0.19 from x = ${stays(L1of, 0.19)}`);
  log(`    form 2: 0.31 from x = ${stays(L2of, 0.31)}, 0.19 from x = ${stays(L2of, 0.19)}`);
  log('    published projection under test (CITED import-sofic §6): 773 and 2297.');
  log(`  R5 registered [400,1100] and [900,3000] for form 1; R7 registered [300,700] and [700,2200] for form 2.`);
}

// ---------------------------------------------------------------- §7 ------
log('\n== 7. THE DIRECT L POINTS (window lower bounds on the tile L) ==');
log('  x | p | L_win | L(copy 0) | first-moment L_win prediction 1+ln(2N)/ln(2/f) | 0.31p/lnp | 0.19p/lnp | L_win over 0.31p/lnp');
for (const r of ROWS) {
  const pred = r.K > 0 ? 1 + Math.log(2 * r.N) / (Math.log(2) + r.lnf) : NaN;
  const req = 0.31 * r.p / Math.log(r.p);
  log(`  ${r.x} | ${r.p} | ${r.Lwin} | ${r.L0} | ${isFinite(pred) ? pred.toFixed(2) : '-'} | ${req.toFixed(2)} | ${(0.19 * r.p / Math.log(r.p)).toFixed(2)} | ${(r.Lwin / req).toFixed(3)}`);
}
log('  R6 registered: L_win falsifies nothing, because the window sample is exponentially smaller than');
log('  the period. A ratio above 1 in the last column would kill U-FRAME §5a step 3 outright at that level.');
log(`\n[total ${el()}s]`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/fdecay-deep-03-ladder.js -- 2e9 1e11
//   invocation:  node research/fdecay-deep-03-ladder.js 2e9 1e11
//   code-sha256: 193eff25dc50bc9405bc9798fa6d3a2a332b253553fa80bf4d6293ad5adbec20
//   out-sha256:  0825440da586833e28b4bc9ce35b46039077f0da8f479811bce1d6464fd6bfc2
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     1325.5 s
// ============================================================================
// == fdecay-deep 03: f OUT OF SAMPLE, BY SEGMENTED WINDOW ==
// shallow window X = 2.00e+9 over the 42 census levels; deep window X = 1.00e+11 over x = 211..907
// every f below is a WINDOW ESTIMATE of the tile ratio, never the tile ratio itself
//
// == 1. THE MEASURED DIAGONAL ==
//   [69.2s] shallow run done
//   [1311.7s] deep run done
//   x | p | d_min | X | N | mbar_win/mbar_exact | gaps | K qualifying | f_win | ln(1/f) | 2p/mbar | ln s | ln D | L_win | L(copy 0) | max gap | first term %
//   11 | 13 | 24 | 2.0e+9 | 116883116 | 1.00000 | 116883115 | 5194805 | 4.4444e-2 | 3.1135 | 1.519 | 0.134 | 4.9 | 2 | 2 | 42 | 100.00
//   13 | 17 | 36 | 2.0e+9 | 98901099 | 1.00000 | 98901098 | 4795205 | 4.8485e-2 | 3.0265 | 1.681 | 0.000 | 7.3 | 2 | 2 | 66 | 83.33
//   17 | 19 | 36 | 2.0e+9 | 87265679 | 1.00000 | 87265678 | 4262402 | 4.8844e-2 | 3.0191 | 1.658 | 0.074 | 10.0 | 2 | 2 | 108 | 93.93
//   19 | 23 | 48 | 2.0e+9 | 78079812 | 1.00000 | 78079811 | 2429781 | 3.1119e-2 | 3.4699 | 1.796 | 0.693 | 12.8 | 3 | 3 | 150 | 88.78
//   23 | 29 | 60 | 2.0e+9 | 71290254 | 1.00000 | 71290253 | 2185770 | 3.0660e-2 | 3.4848 | 2.067 | 1.099 | 15.9 | 2 | 2 | 204 | 99.82
//   29 | 31 | 60 | 2.0e+9 | 66373676 | 1.00000 | 66373675 | 2480311 | 3.7369e-2 | 3.2869 | 2.058 | 1.138 | 19.2 | 4 | 3 | 258 | 97.42
//   31 | 37 | 72 | 2.0e+9 | 62091513 | 1.00000 | 62091512 | 1145092 | 1.8442e-2 | 3.9931 | 2.297 | 0.981 | 22.6 | 4 | 3 | 300 | 95.68
//   37 | 41 | 84 | 2.0e+9 | 58735201 | 1.00000 | 58735200 | 455118 | 7.7486e-3 | 4.8602 | 2.408 | 0.511 | 26.1 | 3 | 2 | 378 | 95.97
//   41 | 43 | 84 | 2.0e+9 | 55870066 | 1.00000 | 55870065 | 505515 | 9.0480e-3 | 4.7052 | 2.402 | 0.537 | 29.8 | 3 | 3 | 378 | 98.75
//   43 | 47 | 96 | 2.0e+9 | 53271455 | 1.00000 | 53271454 | 455804 | 8.5563e-3 | 4.7611 | 2.504 | 0.288 | 33.5 | 2 | 2 | 420 | 97.93
//   47 | 53 | 108 | 2.0e+9 | 51004617 | 1.00000 | 51004616 | 656230 | 1.2866e-2 | 4.3532 | 2.703 | 0.827 | 37.3 | 3 | 3 | 492 | 98.26
//   53 | 59 | 120 | 2.0e+9 | 49079831 | 1.00000 | 49079830 | 387015 | 7.8854e-3 | 4.8427 | 2.896 | 1.099 | 41.2 | 3 | 2 | 492 | 99.64
//   59 | 61 | 120 | 2.0e+9 | 47416063 | 1.00000 | 47416062 | 424453 | 8.9517e-3 | 4.7159 | 2.892 | 1.117 | 45.3 | 3 | 2 | 492 | 99.81
//   61 | 67 | 132 | 2.0e+9 | 45861531 | 1.00000 | 45861530 | 246588 | 5.3768e-3 | 5.2257 | 3.073 | 1.050 | 49.3 | 3 | 3 | 498 | 99.40
//   67 | 71 | 144 | 2.0e+9 | 44492626 | 1.00000 | 44492625 | 31218 | 7.0164e-4 | 7.2621 | 3.159 | 0.000 | 53.5 | 2 | 2 | 498 | 95.41
//   71 | 73 | 144 | 2.0e+9 | 43239415 | 1.00000 | 43239414 | 35259 | 8.1544e-4 | 7.1118 | 3.156 | 0.015 | 57.8 | 2 | 2 | 558 | 98.00
//   73 | 79 | 156 | 2.0e+9 | 42055060 | 0.99999 | 42055059 | 137682 | 3.2739e-3 | 5.7218 | 3.322 | 0.622 | 62.0 | 2 | 2 | 558 | 99.31
//   79 | 83 | 168 | 2.0e+9 | 40990570 | 0.99998 | 40990569 | 164633 | 4.0164e-3 | 5.5174 | 3.402 | 1.278 | 66.4 | 3 | 2 | 612 | 99.14
//   83 | 89 | 180 | 2.0e+9 | 40003130 | 0.99998 | 40003129 | 159448 | 3.9859e-3 | 5.5250 | 3.560 | 1.492 | 70.8 | 3 | 2 | 612 | 99.93
//   89 | 97 | 192 | 2.0e+9 | 39104459 | 0.99997 | 39104458 | 69381 | 1.7742e-3 | 6.3344 | 3.793 | 0.758 | 75.2 | 3 | 2 | 642 | 99.38
//   97 | 101 | 204 | 2.0e+9 | 38298335 | 0.99997 | 38298334 | 26557 | 6.9342e-4 | 7.2739 | 3.868 | 0.143 | 79.8 | 2 | 2 | 642 | 99.26
//   101 | 103 | 204 | 2.0e+9 | 37540203 | 0.99996 | 37540202 | 28909 | 7.7008e-4 | 7.1690 | 3.866 | 0.153 | 84.4 | 2 | 2 | 642 | 99.76
//   103 | 107 | 216 | 2.0e+9 | 36811448 | 0.99995 | 36811447 | 13679 | 3.7160e-4 | 7.8977 | 3.939 | 0.000 | 89.0 | 2 | 2 | 696 | 99.62
//   107 | 109 | 216 | 2.0e+9 | 36123456 | 0.99995 | 36123455 | 15136 | 4.1901e-4 | 7.7776 | 3.937 | 0.010 | 93.6 | 2 | 2 | 696 | 99.20
//   109 | 113 | 228 | 2.0e+9 | 35460833 | 0.99995 | 35460832 | 30216 | 8.5210e-4 | 7.0678 | 4.007 | 0.870 | 98.3 | 2 | 2 | 774 | 99.46
//   113 | 127 | 252 | 2.0e+9 | 34833153 | 0.99995 | 34833152 | 25997 | 7.4633e-4 | 7.2003 | 4.424 | 1.204 | 103.0 | 2 | 2 | 774 | 99.85
//   127 | 131 | 264 | 2.0e+9 | 34284351 | 0.99996 | 34284350 | 9684 | 2.8246e-4 | 8.1720 | 4.491 | 0.604 | 107.8 | 2 | 2 | 774 | 99.79
//   131 | 137 | 276 | 2.0e+9 | 33760289 | 0.99997 | 33760288 | 7664 | 2.2701e-4 | 8.3905 | 4.625 | 0.100 | 112.7 | 2 | 2 | 774 | 99.63
//   137 | 139 | 276 | 2.0e+9 | 33266725 | 1.00000 | 33266724 | 8280 | 2.4890e-4 | 8.2985 | 4.624 | 0.108 | 117.6 | 2 | 2 | 774 | 99.76
//   139 | 149 | 300 | 2.0e+9 | 32787338 | 1.00002 | 32787337 | 10807 | 3.2961e-4 | 8.0176 | 4.885 | 1.099 | 122.5 | 2 | 2 | 774 | 99.94
//   149 | 151 | 300 | 2.0e+9 | 32346547 | 1.00004 | 32346546 | 11730 | 3.6264e-4 | 7.9221 | 4.885 | 1.105 | 127.5 | 2 | 2 | 774 | 99.98
//   151 | 157 | 312 | 2.0e+9 | 31917450 | 1.00006 | 31917449 | 6953 | 2.1784e-4 | 8.4317 | 5.011 | 0.930 | 132.5 | 2 | 2 | 774 | 99.74
//   157 | 163 | 324 | 2.0e+9 | 31510074 | 1.00009 | 31510073 | 3525 | 1.1187e-4 | 9.0982 | 5.137 | 0.339 | 137.6 | 2 | 2 | 774 | 99.97
//   163 | 167 | 336 | 2.0e+9 | 31122193 | 1.00013 | 31122192 | 4338 | 1.3939e-4 | 8.8783 | 5.198 | 0.616 | 142.7 | 2 | 2 | 822 | 99.93
//   167 | 173 | 348 | 2.0e+9 | 30748267 | 1.00017 | 30748266 | 7310 | 2.3774e-4 | 8.3443 | 5.320 | 1.058 | 147.8 | 2 | 2 | 822 | 99.92
//   173 | 179 | 360 | 2.0e+9 | 30391585 | 1.00021 | 30391584 | 6507 | 2.1411e-4 | 8.4490 | 5.441 | 1.099 | 152.9 | 2 | 2 | 828 | 100.00
//   179 | 181 | 360 | 2.0e+9 | 30050526 | 1.00025 | 30050525 | 7013 | 2.3337e-4 | 8.3629 | 5.441 | 1.104 | 158.1 | 2 | 2 | 828 | 99.99
//   181 | 191 | 384 | 2.0e+9 | 29717055 | 1.00030 | 29717054 | 1105 | 3.7184e-5 | 10.1996 | 5.678 | 0.000 | 163.3 | 2 | 2 | 852 | 99.73
//   191 | 193 | 384 | 2.0e+9 | 29404335 | 1.00036 | 29404334 | 1194 | 4.0606e-5 | 10.1116 | 5.677 | 0.005 | 168.5 | 2 | 2 | 852 | 99.92
//   193 | 197 | 396 | 2.0e+9 | 29098146 | 1.00041 | 29098145 | 1460 | 5.0175e-5 | 9.9000 | 5.735 | 0.251 | 173.8 | 2 | 2 | 882 | 100.00
//   197 | 199 | 396 | 2.0e+9 | 28801551 | 1.00045 | 28801550 | 1578 | 5.4789e-5 | 9.8120 | 5.734 | 0.256 | 179.0 | 2 | 2 | 900 | 99.87
//   199 | 211 | 420 | 2.0e+9 | 28510623 | 1.00050 | 28510622 | 4669 | 1.6376e-4 | 8.7171 | 6.019 | 1.808 | 184.3 | 2 | 2 | 900 | 100.00
//   211 | 223 | 444 | 1.0e+11 | 1412796718 | 0.99995 | 1412796717 | 32968 | 2.3335e-5 | 10.6655 | 6.301 | 0.238 | 189.7 | 2 | 2 | 1068 | 99.98
//   251 | 257 | 516 | 1.0e+11 | 1330570708 | 0.99992 | 1330570707 | 21506 | 1.6163e-5 | 11.0328 | 6.839 | 0.368 | 227.8 | 2 | 2 | 1206 | 100.00
//   307 | 311 | 624 | 1.0e+11 | 1246604531 | 0.99992 | 1246604530 | 3946 | 3.1654e-6 | 12.6632 | 7.753 | 0.201 | 278.4 | 2 | 2 | 1368 | 100.00
//   353 | 359 | 720 | 1.0e+11 | 1187632268 | 0.99997 | 1187632267 | 3603 | 3.0338e-6 | 12.7057 | 8.527 | 1.163 | 324.8 | 2 | 2 | 1368 | 100.00
//   401 | 409 | 816 | 1.0e+11 | 1138499320 | 1.00006 | 1138499319 | 709 | 6.2275e-7 | 14.2891 | 9.314 | 0.306 | 372.3 | 2 | 2 | 1518 | 100.00
//   449 | 457 | 912 | 1.0e+11 | 1096686586 | 1.00020 | 1096686585 | 503 | 4.5865e-7 | 14.5950 | 10.026 | 1.211 | 420.7 | 2 | 2 | 1524 | 100.00
//   503 | 509 | 1020 | 1.0e+11 | 1055874788 | 1.00038 | 1055874787 | 332 | 3.1443e-7 | 14.9725 | 10.753 | 1.544 | 476.2 | 2 | 2 | 1668 | 100.00
//   547 | 557 | 1116 | 1.0e+11 | 1035903937 | 1.00050 | 1035903936 | 26 | 2.5099e-8 | 17.5004 | 11.546 | 0.202 | 507.6 | 2 | 1 | 1668 | 100.00
//   601 | 607 | 1212 | 1.0e+11 | 1003945769 | 1.00071 | 1003945768 | 25 | 2.4902e-8 | 17.5083 | 12.197 | 0.847 | 564.8 | 2 | 1 | 1668 | 100.00
//   653 | 659 | 1320 | 1.0e+11 | 975413933 | 1.00091 | 975413932 | 9 | 9.2269e-9 | 18.5011 | 12.868 | 1.350 | 622.8 | 2 | 1 | 1980 | 100.00
//   701 | 709 | 1416 | 1.0e+11 | 955303824 | 1.00105 | 955303823 | 2 | 2.0936e-9 | 19.9844 | 13.560 | 0.334 | 668.4 | 2 | 1 | 1980 | 100.00
//   773 | 787 | 1572 | 1.0e+11 | 927234036 | 1.00123 | 927234035 | 1 | 1.0785e-9 | 20.6477 | 14.613 | 0.715 | 741.1 | 2 | 1 | 1980 | 100.00
//   829 | 839 | 1680 | 1.0e+11 | 909049736 | 1.00133 | 909049735 | 1 | 1.1000e-9 | 20.6279 | 15.274 | 1.649 | 794.7 | 2 | 1 | 1980 | 100.00
//   907 | 911 | 1824 | 1.0e+11 | 888300953 | 1.00141 | 888300952 | 0 | 0 | - | 16.208 | 0.271 | 862.3 | 1 | 1 | 1980 | -
//   K is the count the whole estimate rests on: the relative standard error of f_win is 1/sqrt(K),
//   so a row with K below about 10 carries no usable digit and is reported for its existence only.
//
// == 2. IS THE PREFIX AN UNBIASED WINDOW? PREFIX vs UNIFORMLY RANDOM OFFSETS ==
//   the prefix [0, X) is the window the localized frame uses. A uniformly random offset Z of the
//   period (Z mod q drawn independently for every q, which by CRT is uniform mod x#) is unbiased
//   for the tile ratio BY CONSTRUCTION. If the two agree, the prefix carries no head bias for f.
//   window length 2.0e+8, 8 independent random offsets against the prefix
//   x | prefix f | random-offset f, seed by seed | pooled random f | pooled/prefix | pooled K
//   101 | 7.8359e-4 | 7.712e-4 7.566e-4 7.810e-4 7.411e-4 7.797e-4 7.845e-4 7.489e-4 7.954e-4 | 7.6980e-4 | 0.9824 | 23118
//   151 | 2.1696e-4 | 2.127e-4 2.124e-4 2.018e-4 2.180e-4 2.052e-4 2.246e-4 2.180e-4 2.152e-4 | 2.1350e-4 | 0.9841 | 5452
//   199 | 1.7746e-4 | 1.630e-4 1.609e-4 1.553e-4 1.714e-4 1.529e-4 1.578e-4 1.672e-4 1.648e-4 | 1.6166e-4 | 0.9110 | 3689
//   [1323.9s]
//
// == 3. AGAINST THE PUBLISHED 42-POINT CENSUS (CITED, a3-03-f-from-census.js OUTPUT §5) ==
//   x | 2p/mbar | f_win (measured here) | f published | measured/published | K | 3 sigma band
//   11 | 1.519 | 4.4444e-2 | 4.4440e-2 | 1.0001 | 5194805 | +-0.0013
//   13 | 1.681 | 4.8485e-2 | 4.8480e-2 | 1.0001 | 4795205 | +-0.0014
//   17 | 1.658 | 4.8844e-2 | 4.8840e-2 | 1.0001 | 4262402 | +-0.0015
//   19 | 1.796 | 3.1119e-2 | 3.1120e-2 | 1.0000 | 2429781 | +-0.0019
//   23 | 2.067 | 3.0660e-2 | 3.0660e-2 | 1.0000 | 2185770 | +-0.0020
//   29 | 2.058 | 3.7369e-2 | 3.7370e-2 | 1.0000 | 2480311 | +-0.0019
//   31 | 2.297 | 1.8442e-2 | 1.8440e-2 | 1.0001 | 1145092 | +-0.0028
//   37 | 2.408 | 7.7486e-3 | 7.5090e-3 | 1.0319 | 455118 | +-0.0044
//   41 | 2.402 | 9.0480e-3 | 8.8700e-3 | 1.0201 | 505515 | +-0.0042
//   43 | 2.504 | 8.5563e-3 | 8.6600e-3 | 0.9880 | 455804 | +-0.0044
//   47 | 2.703 | 1.2866e-2 | 1.3030e-2 | 0.9874 | 656230 | +-0.0037
//   53 | 2.896 | 7.8854e-3 | 7.9690e-3 | 0.9895 | 387015 | +-0.0048
//   59 | 2.892 | 8.9517e-3 | 9.0940e-3 | 0.9843 | 424453 | +-0.0046
//   61 | 3.073 | 5.3768e-3 | 5.2980e-3 | 1.0149 | 246588 | +-0.0060
//   67 | 3.159 | 7.0164e-4 | 6.8900e-4 | 1.0184 | 31218 | +-0.0170
//   71 | 3.156 | 8.1544e-4 | 8.0240e-4 | 1.0162 | 35259 | +-0.0160
//   73 | 3.322 | 3.2739e-3 | 3.3000e-3 | 0.9921 | 137682 | +-0.0081
//   79 | 3.402 | 4.0164e-3 | 4.0260e-3 | 0.9976 | 164633 | +-0.0074
//   83 | 3.560 | 3.9859e-3 | 4.2090e-3 | 0.9470 | 159448 | +-0.0075
//   89 | 3.793 | 1.7742e-3 | 1.8100e-3 | 0.9802 | 69381 | +-0.0114
//   97 | 3.868 | 6.9342e-4 | 7.2620e-4 | 0.9549 | 26557 | +-0.0184
//   101 | 3.866 | 7.7008e-4 | 8.1440e-4 | 0.9456 | 28909 | +-0.0176
//   103 | 3.939 | 3.7160e-4 | 4.1260e-4 | 0.9006 | 13679 | +-0.0257
//   107 | 3.937 | 4.1901e-4 | 4.5670e-4 | 0.9175 | 15136 | +-0.0244
//   109 | 4.007 | 8.5210e-4 | 8.9600e-4 | 0.9510 | 30216 | +-0.0173
//   113 | 4.424 | 7.4633e-4 | 8.1770e-4 | 0.9127 | 25997 | +-0.0186
//   127 | 4.491 | 2.8246e-4 | 3.3460e-4 | 0.8442 | 9684 | +-0.0305
//   131 | 4.625 | 2.2701e-4 | 2.4600e-4 | 0.9228 | 7664 | +-0.0343
//   137 | 4.624 | 2.4890e-4 | 2.6620e-4 | 0.9350 | 8280 | +-0.0330
//   139 | 4.885 | 3.2961e-4 | 4.4230e-4 | 0.7452 | 10807 | +-0.0289
//   149 | 4.885 | 3.6264e-4 | 4.8300e-4 | 0.7508 | 11730 | +-0.0277
//   151 | 5.011 | 2.1784e-4 | 2.8800e-4 | 0.7564 | 6953 | +-0.0360
//   157 | 5.137 | 1.1187e-4 | 1.4990e-4 | 0.7463 | 3525 | +-0.0505
//   163 | 5.198 | 1.3939e-4 | 1.7070e-4 | 0.8166 | 4338 | +-0.0455
//   167 | 5.320 | 2.3774e-4 | 3.2990e-4 | 0.7206 | 7310 | +-0.0351
//   173 | 5.441 | 2.1411e-4 | 2.8510e-4 | 0.7510 | 6507 | +-0.0372
//   179 | 5.441 | 2.3337e-4 | 3.0820e-4 | 0.7572 | 7013 | +-0.0358
//   181 | 5.678 | 3.7184e-5 | 5.7360e-5 | 0.6483 | 1105 | +-0.0902
//   191 | 5.677 | 4.0606e-5 | 6.1890e-5 | 0.6561 | 1194 | +-0.0868
//   193 | 5.735 | 5.0175e-5 | 7.9560e-5 | 0.6307 | 1460 | +-0.0785
//   197 | 5.734 | 5.4789e-5 | 8.6170e-5 | 0.6358 | 1578 | +-0.0755
//   199 | 6.019 | 1.6376e-4 | 2.6530e-4 | 0.6173 | 4669 | +-0.0439
//   x <= 31 (every prime of the tile below 32): ratio 1.0000 to 1.0001
//   x >= 37 (the tile has a prime above 32): ratio 0.6173 to 1.0319
//   ln(measured/published) on ln x over x >= 37: slope -0.2835 +- 0.0295, R2 0.7363
//   the split at 32 is not a fitted boundary: it is where the published evaluator first shifts by 32
//   or more. `fdecay-deep-01-census-defect.js` carries the mechanism and the corrected values.
//
// == 4. THE DECAY LAW, REFIT ON THE MEASURED POINTS ==
//   set | n | ln(1/f) = a + b*(2p/mbar) | R2 | with the comb: a + b*T + c*ln s | R2
//   all measured, K>=10 | 51 | 1.375 + 1.3782(+-0.0365)*T | 0.9668 | 1.917 + 1.4016(+-0.0235)*T - 1.021*S | 0.9867
//   x <= 199 only | 42 | 0.723 + 1.5562(+-0.0727)*T | 0.9197 | 1.252 + 1.5875(+-0.0417)*T - 1.024*S | 0.9745
//   x >= 211 only (out of sample) | 9 | 3.074 + 1.1803(+-0.0876)*T | 0.9629 | 2.807 + 1.2799(+-0.0272)*T - 0.968*S | 0.9974
//   lower half | 25 | -0.029 + 1.8377(+-0.1560)*T | 0.8578 | 0.568 + 1.8385(+-0.0948)*T - 1.007*S | 0.9498
//   upper half | 26 | 2.176 + 1.2685(+-0.0475)*T | 0.9675 | 2.701 + 1.2933(+-0.0134)*T - 1.008*S | 0.9976
//   published for comparison (CITED, fitted on the defective points): 1.001 + 1.451*T, R2 0.9020;
//     with the comb 1.529 + 1.482*T - 1.025*S, R2 0.9639.
//   downstream, U-FRAME §5a step 6/7: ln L_indep = -1.827 + 2.844(+-0.058)*lnln x, R2 0.9801
//     published: ln L = -1.884 + 2.892*lnln x, R2 0.972. An exponent near 2 is the polylog branch.
//
// == 5. SCORING THE PRE-REGISTRATION ==
//   the band is [min, max] over the four registered specifications, all fitted on the PUBLISHED points
//   x | K | measured ln(1/f) | A-full | B-comb | B-lower | B-upper | band | verdict | residual vs B-comb
//   211 | 32968 | 10.666 | 10.14 | 10.62 | 12.04 | 10.10 | [10.10,12.04] | INSIDE | +0.043
//   251 | 21506 | 11.033 | 10.92 | 11.29 | 12.91 | 10.57 | [10.57,12.91] | INSIDE | -0.254
//   307 | 3946 | 12.663 | 12.25 | 12.81 | 14.79 | 11.76 | [11.76,14.79] | INSIDE | -0.150
//   353 | 3603 | 12.706 | 13.37 | 12.97 | 15.22 | 11.67 | [11.67,15.22] | INSIDE | -0.267
//   401 | 709 | 14.289 | 14.51 | 15.02 | 17.59 | 13.39 | [13.39,17.59] | INSIDE | -0.728
//   449 | 503 | 14.595 | 15.54 | 15.14 | 17.96 | 13.29 | [13.29,17.96] | INSIDE | -0.550
//   503 | 332 | 14.973 | 16.60 | 15.88 | 18.96 | 13.77 | [13.77,18.96] | INSIDE | -0.909
//   547 | 26 | 17.500 | 17.75 | 18.43 | 21.86 | 15.99 | [15.99,21.86] | INSIDE | -0.931
//   601 | 25 | 17.508 | 18.69 | 18.74 | 22.40 | 16.07 | [16.07,22.40] | INSIDE | -1.227
//   R3: predicted INSIDE at every deep level, and mean residual vs B-comb NEGATIVE with |mean| <= 3.
//       SCORE: 9 of 9 inside; mean residual -0.553 -> negative; |mean| <= 3, as registered.
//   R4: residual on ln x, slope -1.114 +- 0.157, t = -7.08 (registered: negative slope, |t| < 3).
//       SCORE: SIGNIFICANT NEGATIVE — the published fit over-states the decay.
//
// == 6. THE CROSSINGS, RECOMPUTED FROM THE MEASURED LAW ==
//   form 1, f-decays / U-FRAME §5a step 6: L = ln D / ln(1/f)
//   form 2, import-sofic §4 estimator C, the only one that record found flat:
//           L_hat = [1 + ln(2D)/ln(2/f)] / 1.4965, the 1.4965 measured on nine folds at p <= 37
//   x | p | measured or fitted ln(1/f) | L = lnD/ln(1/f) | L_hat (estimator C) | L_hat raw | 0.31p/lnp | 0.19p/lnp
//   199 | 211 | 8.717 MEASURED | 21.14 | 13.81 | 20.66 | 12.22 | 7.49
//   211 | 223 | 10.666 MEASURED | 17.78 | 11.87 | 17.76 | 12.78 | 7.84
//   307 | 311 | 12.663 MEASURED | 21.98 | 14.63 | 21.89 | 16.80 | 10.29
//   401 | 409 | 14.289 MEASURED | 26.05 | 17.30 | 25.89 | 21.08 | 12.92
//   503 | 509 | 14.973 MEASURED | 31.81 | 21.01 | 31.44 | 25.32 | 15.52
//   601 | 607 | 17.508 MEASURED | 32.26 | 21.43 | 32.07 | 29.36 | 18.00
//   701 | 709 | 20.582 fitted | 32.47 | 21.68 | 32.45 | 33.48 | 20.52
//   773 | 787 | 21.667 fitted | 34.20 | 22.84 | 34.17 | 36.59 | 22.42
//   907 | 911 | 24.356 fitted | 35.40 | 23.69 | 35.45 | 41.44 | 25.40
//   1009 | 1013 | 25.202 fitted | 38.03 | 25.42 | 38.04 | 45.38 | 27.81
//   1499 | 1511 | 33.983 fitted | 42.88 | 28.76 | 43.05 | 63.99 | 39.22
//   2297 | 2309 | 44.747 fitted | 49.93 | 33.53 | 50.18 | 92.42 | 56.65
//   3001 | 3011 | 56.366 fitted | 52.08 | 35.05 | 52.46 | 116.53 | 71.42
//   6323 | 6329 | 96.755 fitted | 64.46 | 43.44 | 65.01 | 224.15 | 137.38
//   stays-below levels (smallest x from which the inequality holds at every prime level to 50000):
//     form 1: 0.31 from x = 719, 0.19 from x = 1801
//     form 2: 0.31 from x = 271, 0.19 from x = 839
//     published projection under test (CITED import-sofic §6): 773 and 2297.
//   R5 registered [400,1100] and [900,3000] for form 1; R7 registered [300,700] and [700,2200] for form 2.
//
// == 7. THE DIRECT L POINTS (window lower bounds on the tile L) ==
//   x | p | L_win | L(copy 0) | first-moment L_win prediction 1+ln(2N)/ln(2/f) | 0.31p/lnp | 0.19p/lnp | L_win over 0.31p/lnp
//   11 | 13 | 2 | 2 | 6.06 | 1.57 | 0.96 | 1.273
//   13 | 17 | 2 | 2 | 6.14 | 1.86 | 1.14 | 1.075
//   17 | 19 | 2 | 2 | 6.11 | 2.00 | 1.23 | 1.000
//   19 | 23 | 3 | 3 | 5.53 | 2.27 | 1.39 | 1.319
//   23 | 29 | 2 | 2 | 5.49 | 2.67 | 1.64 | 0.749
//   29 | 31 | 4 | 3 | 5.70 | 2.80 | 1.72 | 1.429
//   31 | 37 | 4 | 3 | 4.98 | 3.18 | 1.95 | 1.259
//   37 | 41 | 3 | 2 | 4.35 | 3.42 | 2.10 | 0.877
//   41 | 43 | 3 | 3 | 4.43 | 3.54 | 2.17 | 0.846
//   43 | 47 | 2 | 2 | 4.39 | 3.78 | 2.32 | 0.529
//   47 | 53 | 3 | 3 | 4.65 | 4.14 | 2.54 | 0.725
//   53 | 59 | 3 | 2 | 4.32 | 4.49 | 2.75 | 0.669
//   59 | 61 | 3 | 2 | 4.40 | 4.60 | 2.82 | 0.652
//   61 | 67 | 3 | 3 | 4.10 | 4.94 | 3.03 | 0.607
//   67 | 71 | 2 | 2 | 3.30 | 5.16 | 3.16 | 0.387
//   71 | 73 | 2 | 2 | 3.34 | 5.27 | 3.23 | 0.379
//   73 | 79 | 2 | 2 | 3.84 | 5.60 | 3.44 | 0.357
//   79 | 83 | 3 | 2 | 3.93 | 5.82 | 3.57 | 0.515
//   83 | 89 | 3 | 2 | 3.93 | 6.15 | 3.77 | 0.488
//   89 | 97 | 3 | 2 | 3.59 | 6.57 | 4.03 | 0.456
//   97 | 101 | 2 | 2 | 3.28 | 6.78 | 4.16 | 0.295
//   101 | 103 | 2 | 2 | 3.31 | 6.89 | 4.22 | 0.290
//   103 | 107 | 2 | 2 | 3.11 | 7.10 | 4.35 | 0.282
//   107 | 109 | 2 | 2 | 3.14 | 7.20 | 4.41 | 0.278
//   109 | 113 | 2 | 2 | 3.33 | 7.41 | 4.54 | 0.270
//   113 | 127 | 2 | 2 | 3.29 | 8.13 | 4.98 | 0.246
//   127 | 131 | 2 | 2 | 3.04 | 8.33 | 5.11 | 0.240
//   131 | 137 | 2 | 2 | 2.98 | 8.63 | 5.29 | 0.232
//   137 | 139 | 2 | 2 | 3.00 | 8.73 | 5.35 | 0.229
//   139 | 149 | 2 | 2 | 3.07 | 9.23 | 5.66 | 0.217
//   149 | 151 | 2 | 2 | 3.09 | 9.33 | 5.72 | 0.214
//   151 | 157 | 2 | 2 | 2.97 | 9.63 | 5.90 | 0.208
//   157 | 163 | 2 | 2 | 2.83 | 9.92 | 6.08 | 0.202
//   163 | 167 | 2 | 2 | 2.88 | 10.12 | 6.20 | 0.198
//   167 | 173 | 2 | 2 | 2.98 | 10.41 | 6.38 | 0.192
//   173 | 179 | 2 | 2 | 2.96 | 10.70 | 6.56 | 0.187
//   179 | 181 | 2 | 2 | 2.98 | 10.79 | 6.62 | 0.185
//   181 | 191 | 2 | 2 | 2.64 | 11.27 | 6.91 | 0.177
//   191 | 193 | 2 | 2 | 2.66 | 11.37 | 6.97 | 0.176
//   193 | 197 | 2 | 2 | 2.69 | 11.56 | 7.08 | 0.173
//   197 | 199 | 2 | 2 | 2.70 | 11.65 | 7.14 | 0.172
//   199 | 211 | 2 | 2 | 2.90 | 12.22 | 7.49 | 0.164
//   211 | 223 | 2 | 2 | 2.92 | 12.78 | 7.84 | 0.156
//   251 | 257 | 2 | 2 | 2.85 | 14.36 | 8.80 | 0.139
//   307 | 311 | 2 | 2 | 2.62 | 16.80 | 10.29 | 0.119
//   353 | 359 | 2 | 2 | 2.61 | 18.92 | 11.59 | 0.106
//   401 | 409 | 2 | 2 | 2.44 | 21.08 | 12.92 | 0.095
//   449 | 457 | 2 | 2 | 2.41 | 23.13 | 14.18 | 0.086
//   503 | 509 | 2 | 2 | 2.37 | 25.32 | 15.52 | 0.079
//   547 | 557 | 2 | 1 | 2.18 | 27.31 | 16.74 | 0.073
//   601 | 607 | 2 | 1 | 2.18 | 29.36 | 18.00 | 0.068
//   653 | 659 | 2 | 1 | 2.11 | 31.47 | 19.29 | 0.064
//   701 | 709 | 2 | 1 | 2.03 | 33.48 | 20.52 | 0.060
//   773 | 787 | 2 | 1 | 2.00 | 36.59 | 22.42 | 0.055
//   829 | 839 | 2 | 1 | 2.00 | 38.63 | 23.68 | 0.052
//   907 | 911 | 1 | 1 | - | 41.44 | 25.40 | 0.024
//   R6 registered: L_win falsifies nothing, because the window sample is exponentially smaller than
//   the period. A ratio above 1 in the last column would kill U-FRAME §5a step 3 outright at that level.
//
// [total 1325.4s]
// ============================================================================
// READINGS — the decay law survives out of sample as a band and fails as a
// point: nine of nine deep levels land inside the pre-registered band, and the
// residual against the central specification trends at t = -7.08.
//
// 1. THE INSTRUMENT REACHED x = 829, four times deeper than the census method's
//    x = 200 wall. At X = 1e11 the deepest level with a usable count is x = 503
//    (K = 332), the deepest with any count is x = 829 (K = 1), and x = 907 sees
//    nothing. Pre-registered prediction R1 put the wall at x ~ 600 with 30 or
//    more qualifying gaps; measured, K = 26 at x = 547 and K = 25 at x = 601, so
//    R1 is right to within one level. The cost is 1325.5 s for the whole ladder,
//    against 421.3 s for the published census's 42 points — three decades of x
//    for three times the time, which is the `LOCALIZED-GAP.md` §10 lever
//    working on a tail functional.
//
// 2. THE PREFIX IS NOT BIASED. Against eight uniformly random offsets of the
//    period, the prefix ratio is 0.9824 at x = 101, 0.9841 at x = 151 and 0.9110
//    at x = 199. The last looks large and is not: the prefix estimate there
//    rests on K = 506, so the combined standard error of the ratio is about five
//    per cent and 0.9110 is 1.8 of them. The pooled random-offset value at
//    x = 199, 1.6166e-4, sits 1.3 per cent from the X = 2e9 prefix value
//    1.6376e-4. The window is a sample of the period and behaves like one.
//
// 3. THE PUBLISHED 42-POINT CENSUS FAILS, AND THE FAILURE HAS A HARD EDGE AT 32.
//    Measured over published is 1.0000 to 1.0001 at every level x <= 31 and
//    0.6173 to 1.0319 at every level x >= 37, with ln of that ratio falling on
//    ln x at slope -0.2835 +- 0.0295. The boundary is not fitted: T_x contains a
//    prime above 32 exactly when x >= 37. `fdecay-deep-01-census-defect.js`
//    carries the mechanism.
//
// 4. THE CORRECTED LAW IS FLATTER, AND IT FITS BETTER. On 51 measured levels
//    ln(1/f) = 1.917 + 1.4016(+-0.0235)*T - 1.021*S with R2 0.9867, against the
//    published 1.529 + 1.482*T - 1.025*S at R2 0.9639. The comb coefficient is
//    -1 to within the fit on the corrected points too, which is the one piece of
//    `f-decays.md`'s arithmetic story that comes through untouched.
//
// 5. RANGE DEPENDENCE SURVIVES AND IS THE REAL FINDING. The threshold
//    coefficient reads 1.5875 on x <= 199 and 1.2799 on x >= 211, and 1.8385 on
//    the lower half against 1.2933 on the upper. The published table's own
//    range dependence was 1.695 against 0.906; the corrected one is smaller but
//    it is still there, and it is now measured across a range three times wider.
//    No single slope should be quoted, exactly as `f-decays.md` already says.
//
// 6. THE BRANCH CALL SURVIVES. ln L_indep = -1.827 + 2.844(+-0.058)*lnln x with
//    R2 0.9801, against the published -1.884 + 2.892 at R2 0.972. The exponent
//    is unchanged inside its own error, so U-FRAME §12's polylog reading is not
//    what the defect touches. What the defect touches is where the crossing is.
//
// 7. THE PRE-REGISTRATION, SCORED. R3 holds: 9 of 9 deep levels INSIDE the
//    four-specification band, mean residual against B-comb -0.553, negative as
//    registered and well inside the registered |mean| <= 3. R4 FAILS: the
//    residual falls on ln x at slope -1.114 +- 0.157, t = -7.08 against a
//    registered |t| < 3. The direction is the registered one and the size is
//    not. Read plainly: the published fit over-states the decay, and it
//    over-states it more the deeper you go, so every projection built on it is
//    optimistic about how fast f falls.
//
// 8. THE CROSSINGS MOVE DOWN, NOT UP. From the measured law, form 1 puts
//    0.31*p/ln p at x = 719 and 0.19*p/ln p at x = 1801, against the published
//    projection's 773 and 2297. R5 registered [400,1100] and [900,3000] and both
//    land inside. So the headline the sofic record hung on those two numbers is
//    not damaged by the census defect; it is confirmed and moved slightly
//    earlier. `fdecay-deep-04-crossings.js` reports the spread over seven fits.
//
// 9. AND THE GRAPH-CORRECTED ESTIMATOR MOVES THEM MUCH FURTHER DOWN. Form 2,
//    import-sofic's estimator C with the measured letter measure, puts
//    0.31*p/ln p at x = 271 and 0.19*p/ln p at x = 839. R7 registered [300,700]
//    and [700,2200]: the second lands, the first does not — 271 is below the
//    registered floor. The two forms disagree by a factor of two to three in x,
//    and the disagreement is the 1.4965 and the ln(2/f) denominator, not the
//    data. Which form is right is `import-sofic.md`'s question and it is open.
//
// 10. THE DIRECT L POINTS DECIDE NOTHING, AS REGISTERED (R6), AND SAY SOMETHING
//    ANYWAY. L_win is 2 at every level from x = 97 to x = 829 and 1 at x = 907,
//    reaching 4 at x = 29 and x = 31 and never more, so the ratio in the last
//    column of §7 falls from 1.319 at x = 19 to 0.052 at x = 829 and nothing is
//    falsified.
//    But the first-moment prediction 1 + ln(2N)/ln(2/f) reads 2.92 at x = 211,
//    2.37 at x = 503 and 2.00 at x = 773, so the graph's own law predicts the
//    measured window L to within a fraction of an integer at every deep level.
//    The machinery import-sofic validated on nine folds at p <= 37 still works
//    at p = 787, at a sample size fourteen orders of magnitude smaller than the
//    period's.
//
// 11. WHAT WOULD HAVE KILLED THE ROUTE AND DID NOT. A window L above
//    0.31*p/ln p at any level would end U-FRAME §5a step 3 there, since L_win is
//    a proven lower bound on the tile L. The ratio reaches or passes 1 at
//    x = 11, 13, 17 and 19, reading 1.273, 1.075, 1.000 and 1.319 — and those are levels
//    where the requirement is 1.57 to 2.27 and an integer L of 2 or 3 clears it
//    by arithmetic rather than by structure. From x = 23 up the ratio never
//    reaches 1 again.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded output block does not contain
// verbatim actually is. No number above was changed.
//
// SAME VALUE, DIFFERENT NOTATION: reading 3's X = 1e11 is the deep-window
// bound printed as 1.00e+11, and is also the second command-line argument in
// the regenerate line at the top of the embedded block.
//
// BORROWED, verified present in the named producer's embedded output: reading
// 5's published halves 1.695 against 0.906 are the f-decays.md table's own
// range dependence. Both appear verbatim in the embedded output of
// research/fdecay-deep-01-census-defect.js ("halves 1.695 and 0.906"), and in
// research/f-decays.md line 95. The 0.9020 printed in this file's own table is
// an R2, a digit coincidence and not the source of 0.906.
// ---------------------------------------------------------------------------
