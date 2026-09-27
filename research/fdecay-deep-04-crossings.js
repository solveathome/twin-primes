'use strict';
// ============================================================================
// fdecay-deep 04 — where L clears 0.31 and 0.19 p/ln p, under every fit
// ============================================================================
// `history/staging/import-sofic.md` §6 projects that L first falls below
// 0.31*p/ln p at x = 773 and below 0.19*p/ln p at x = 2297, from `f-decays.md`'s
// fitted coefficients. Those coefficients were fitted to a table that
// `fdecay-deep-01-census-defect.js` shows is corrupted from x = 37. This script
// redoes the projection from the MEASURED points of
// `fdecay-deep-03-ladder.js`, and reports it as a spread over specifications
// rather than as a pair of numbers, because that is what the spread is.
//
// EVERY NUMBER BELOW IS AN EXTRAPOLATION OF A FITTED LAW OUTSIDE ITS RANGE, and
// none of it is a bound. The deepest measured level is a level, not a proof.
// ============================================================================

const C = require('./fdecay-deep-00-core.js');
const log = console.log;
const PR = C.primesUpTo(200000);
const nextPrime = x => PR.find(q => q > x);

// CITED, `fdecay-deep-03-ladder.js` embedded OUTPUT §1: x, K, ln(1/f_win).
// K is the qualifying-gap count the estimate rests on; rows with K < 10 are
// carried for the record and excluded from every fit, as pre-registered.
const MEAS = [
  [11, 5194805, 3.1135], [13, 4795205, 3.0265], [17, 4262402, 3.0191], [19, 2429781, 3.4699],
  [23, 2185770, 3.4848], [29, 2480311, 3.2869], [31, 1145092, 3.9931], [37, 455118, 4.8602],
  [41, 505515, 4.7052], [43, 455804, 4.7611], [47, 656230, 4.3532], [53, 387015, 4.8427],
  [59, 424453, 4.7159], [61, 246588, 5.2257], [67, 31218, 7.2621], [71, 35259, 7.1118],
  [73, 137682, 5.7218], [79, 164633, 5.5174], [83, 159448, 5.5250], [89, 69381, 6.3344],
  [97, 26557, 7.2739], [101, 28909, 7.1690], [103, 13679, 7.8977], [107, 15136, 7.7776],
  [109, 30216, 7.0678], [113, 25997, 7.2003], [127, 9684, 8.1720], [131, 7664, 8.3905],
  [137, 8280, 8.2985], [139, 10807, 8.0176], [149, 11730, 7.9221], [151, 6953, 8.4317],
  [157, 3525, 9.0982], [163, 4338, 8.8783], [167, 7310, 8.3443], [173, 6507, 8.4490],
  [179, 7013, 8.3629], [181, 1105, 10.1996], [191, 1194, 10.1116], [193, 1460, 9.9000],
  [197, 1578, 9.8120], [199, 4669, 8.7171], [211, 32968, 10.6655], [251, 21506, 11.0328],
  [307, 3946, 12.6632], [353, 3603, 12.7057], [401, 709, 14.2891], [449, 503, 14.5950],
  [503, 332, 14.9725], [547, 26, 17.5004], [601, 25, 17.5083], [653, 9, 18.5011],
  [701, 2, 19.9844], [773, 1, 20.6477], [829, 1, 20.6279]
];

const rows = MEAS.map(([x, K, lf]) => {
  const p = nextPrime(x), d = 6 * C.k0of(p);
  return { x, p, K, lf, T: 2 * p / C.meanGap(x, PR), S: C.lnS(x, d, PR), lnD: C.lnD(x, PR) };
});

function ols(rs, cols, y) {
  const n = rs.length, k = cols.length, A = [];
  for (let a = 0; a < k; a++) A.push(new Array(k + 1).fill(0));
  for (const r of rs) { const X = cols.map(c => c(r)), yy = y(r); for (let a = 0; a < k; a++) { for (let b = 0; b < k; b++) A[a][b] += X[a] * X[b]; A[a][k] += X[a] * yy; } }
  for (let c = 0; c < k; c++) { let piv = c; for (let r2 = c + 1; r2 < k; r2++) if (Math.abs(A[r2][c]) > Math.abs(A[piv][c])) piv = r2; [A[c], A[piv]] = [A[piv], A[c]]; for (let r2 = 0; r2 < k; r2++) { if (r2 === c) continue; const f = A[r2][c] / A[c][c]; for (let cc = c; cc <= k; cc++) A[r2][cc] -= f * A[c][cc]; } }
  const co = []; for (let c = 0; c < k; c++) co.push(A[c][k] / A[c][c]);
  let ssr = 0, sst = 0; const mn = rs.reduce((s, r) => s + y(r), 0) / n;
  for (const r of rs) { const X = cols.map(c => c(r)); let yh = 0; for (let a = 0; a < k; a++) yh += co[a] * X[a]; ssr += (y(r) - yh) ** 2; sst += (y(r) - mn) ** 2; }
  return { co, r2: 1 - ssr / sst, n };
}
const one = () => 1, fT = r => r.T, fS = r => r.S, fY = r => r.lf;

const USE = rows.filter(r => r.K >= 10);
const SETS = [
  ['all measured, comb', USE, true],
  ['all measured, threshold only', USE, false],
  ['x <= 199 only, comb', USE.filter(r => r.x <= 199), true],
  ['x >= 211 only, comb', USE.filter(r => r.x >= 211), true],
  ['lower half, comb', USE.slice(0, Math.floor(USE.length / 2)), true],
  ['upper half, comb', USE.slice(Math.floor(USE.length / 2)), true],
  ['K >= 100 only, comb', USE.filter(r => r.K >= 100), true]
];

log('== fdecay-deep 04: THE CROSSINGS, UNDER EVERY FIT OF THE MEASURED POINTS ==');
log(`  ${rows.length} measured levels cited from 03, of which ${USE.length} carry K >= 10`);
log('  form 1 (f-decays / U-FRAME §5a step 6):   L = ln D / ln(1/f)');
log('  form 2 (import-sofic §4 estimator C):     L = [1 + ln(2D)/ln(2/f)] / 1.4965');
log('  a crossing level is the smallest x from which the inequality holds at EVERY prime level to 50000.');
log('');
log('  fit | n | ln(1/f) = a + b*T (+ c*S) | R2 | form1 0.31 | form1 0.19 | form2 0.31 | form2 0.19');
const stays = (Lof, c) => {
  const lv = PR.filter(q => q >= 11 && q <= 50000);
  const below = lv.map(x => { const p = nextPrime(x); return Lof(x) < c * p / Math.log(p); });
  let i = below.length - 1; while (i >= 0 && below[i]) i--;
  return i + 1 < below.length ? lv[i + 1] : 'never';
};
const OUT = [];
for (const [nm, rs, comb] of SETS) {
  if (rs.length < 5) continue;
  const F = comb ? ols(rs, [one, fT, fS], fY) : ols(rs, [one, fT], fY);
  const lf = x => { const p = nextPrime(x), T = 2 * p / C.meanGap(x, PR), S = C.lnS(x, 6 * C.k0of(p), PR); return F.co[0] + F.co[1] * T + (comb ? F.co[2] * S : 0); };
  const L1 = x => C.lnD(x, PR) / lf(x);
  const L2 = x => (1 + (C.lnD(x, PR) + Math.log(2)) / (Math.log(2) + lf(x))) / 1.4965;
  const r = [stays(L1, 0.31), stays(L1, 0.19), stays(L2, 0.31), stays(L2, 0.19)];
  OUT.push(r);
  log(`  ${nm} | ${rs.length} | ${F.co[0].toFixed(3)} + ${F.co[1].toFixed(4)}*T${comb ? ` ${F.co[2] < 0 ? '-' : '+'} ${Math.abs(F.co[2]).toFixed(3)}*S` : ''} | ${F.r2.toFixed(4)} | ${r[0]} | ${r[1]} | ${r[2]} | ${r[3]}`);
}
{
  const num = a => a.filter(v => v !== 'never').map(Number);
  const col = i => num(OUT.map(r => r[i]));
  log('');
  log(`  spread over the ${OUT.length} specifications:`);
  log(`    form 1, 0.31*p/ln p: ${Math.min(...col(0))} to ${Math.max(...col(0))}   (published projection 773)`);
  log(`    form 1, 0.19*p/ln p: ${Math.min(...col(1))} to ${Math.max(...col(1))}   (published projection 2297)`);
  log(`    form 2, 0.31*p/ln p: ${Math.min(...col(2))} to ${Math.max(...col(2))}`);
  log(`    form 2, 0.19*p/ln p: ${Math.min(...col(3))} to ${Math.max(...col(3))}`);
}

// the same, using the MEASURED f directly at the levels where it exists, with
// no fit at all — the only rows in this file with no extrapolation in them.
log('');
log('== L AT THE MEASURED LEVELS, NO FIT ==');
log('  x | p | K | ln(1/f) measured | form1 L | form2 L | 0.31p/lnp | 0.19p/lnp | form1 clears 0.31? | form2 clears 0.31?');
for (const r of rows) {
  if (r.K < 10) continue;
  const L1 = r.lnD / r.lf, L2 = (1 + (r.lnD + Math.log(2)) / (Math.log(2) + r.lf)) / 1.4965;
  const a = 0.31 * r.p / Math.log(r.p), b = 0.19 * r.p / Math.log(r.p);
  log(`  ${r.x} | ${r.p} | ${r.K} | ${r.lf.toFixed(3)} | ${L1.toFixed(2)} | ${L2.toFixed(2)} | ${a.toFixed(2)} | ${b.toFixed(2)} | ${L1 < a ? 'yes' : 'no'} | ${L2 < a ? 'yes' : 'no'}`);
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/fdecay-deep-04-crossings.js
//   invocation:  node research/fdecay-deep-04-crossings.js
//   code-sha256: f551584e3d56dccd620857749257fbe2a2fbe955ab219e36fd219ab248e36ccf
//   out-sha256:  45336f9ef49d3baa3fd6969a1f648fc4e5a8cd41915e644adeaf60879dbc80e2
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     6.5 s
// ============================================================================
// == fdecay-deep 04: THE CROSSINGS, UNDER EVERY FIT OF THE MEASURED POINTS ==
//   55 measured levels cited from 03, of which 51 carry K >= 10
//   form 1 (f-decays / U-FRAME §5a step 6):   L = ln D / ln(1/f)
//   form 2 (import-sofic §4 estimator C):     L = [1 + ln(2D)/ln(2/f)] / 1.4965
//   a crossing level is the smallest x from which the inequality holds at EVERY prime level to 50000.
//
//   fit | n | ln(1/f) = a + b*T (+ c*S) | R2 | form1 0.31 | form1 0.19 | form2 0.31 | form2 0.19
//   all measured, comb | 51 | 1.917 + 1.4016*T - 1.021*S | 0.9867 | 719 | 1801 | 271 | 839
//   all measured, threshold only | 51 | 1.375 + 1.3782*T | 0.9668 | 701 | 1811 | 241 | 829
//   x <= 199 only, comb | 42 | 1.252 + 1.5875*T - 1.024*S | 0.9745 | 631 | 1499 | 241 | 719
//   x >= 211 only, comb | 9 | 2.807 + 1.2799*T - 0.968*S | 0.9974 | 757 | 2039 | 241 | 929
//   lower half, comb | 25 | 0.568 + 1.8385*T - 1.007*S | 0.9498 | 509 | 1201 | 211 | 547
//   upper half, comb | 26 | 2.701 + 1.2933*T - 1.008*S | 0.9976 | 757 | 2017 | 271 | 929
//   K >= 100 only, comb | 49 | 1.796 + 1.4375*T - 1.051*S | 0.9830 | 691 | 1741 | 241 | 839
//
//   spread over the 7 specifications:
//     form 1, 0.31*p/ln p: 509 to 757   (published projection 773)
//     form 1, 0.19*p/ln p: 1201 to 2039   (published projection 2297)
//     form 2, 0.31*p/ln p: 211 to 271
//     form 2, 0.19*p/ln p: 547 to 929
//
// == L AT THE MEASURED LEVELS, NO FIT ==
//   x | p | K | ln(1/f) measured | form1 L | form2 L | 0.31p/lnp | 0.19p/lnp | form1 clears 0.31? | form2 clears 0.31?
//   11 | 13 | 5194805 | 3.114 | 1.58 | 1.65 | 1.57 | 0.96 | no | no
//   13 | 17 | 4795205 | 3.026 | 2.41 | 2.10 | 1.86 | 1.14 | no | no
//   17 | 19 | 4262402 | 3.019 | 3.32 | 2.60 | 2.00 | 1.23 | no | no
//   19 | 23 | 2429781 | 3.470 | 3.70 | 2.84 | 2.27 | 1.39 | no | no
//   23 | 29 | 2185770 | 3.485 | 4.56 | 3.32 | 2.67 | 1.64 | no | no
//   29 | 31 | 2480311 | 3.287 | 5.84 | 4.01 | 2.80 | 1.72 | no | no
//   31 | 37 | 1145092 | 3.993 | 5.65 | 3.98 | 3.18 | 1.95 | no | no
//   37 | 41 | 455118 | 4.860 | 5.37 | 3.89 | 3.42 | 2.10 | no | no
//   41 | 43 | 505515 | 4.705 | 6.33 | 4.44 | 3.54 | 2.17 | no | no
//   43 | 47 | 455804 | 4.761 | 7.03 | 4.86 | 3.78 | 2.32 | no | no
//   47 | 53 | 656230 | 4.353 | 8.57 | 5.70 | 4.14 | 2.54 | no | no
//   53 | 59 | 387015 | 4.843 | 8.51 | 5.73 | 4.49 | 2.75 | no | no
//   59 | 61 | 424453 | 4.716 | 9.60 | 6.35 | 4.60 | 2.82 | no | no
//   61 | 67 | 246588 | 5.226 | 9.44 | 6.32 | 4.94 | 3.03 | no | no
//   67 | 71 | 31218 | 7.262 | 7.37 | 5.22 | 5.16 | 3.16 | no | no
//   71 | 73 | 35259 | 7.112 | 8.12 | 5.67 | 5.27 | 3.23 | no | no
//   73 | 79 | 137682 | 5.722 | 10.84 | 7.20 | 5.60 | 3.44 | no | no
//   79 | 83 | 164633 | 5.517 | 12.03 | 7.88 | 5.82 | 3.57 | no | no
//   83 | 89 | 159448 | 5.525 | 12.81 | 8.35 | 6.15 | 3.77 | no | no
//   89 | 97 | 69381 | 6.334 | 11.87 | 7.89 | 6.57 | 4.03 | no | no
//   97 | 101 | 26557 | 7.274 | 10.97 | 7.42 | 6.78 | 4.16 | no | no
//   101 | 103 | 28909 | 7.169 | 11.77 | 7.90 | 6.89 | 4.22 | no | no
//   103 | 107 | 13679 | 7.898 | 11.27 | 7.64 | 7.10 | 4.35 | no | no
//   107 | 109 | 15136 | 7.778 | 12.04 | 8.11 | 7.20 | 4.41 | no | no
//   109 | 113 | 30216 | 7.068 | 13.91 | 9.19 | 7.41 | 4.54 | no | no
//   113 | 127 | 25997 | 7.200 | 14.31 | 9.45 | 8.13 | 4.98 | no | no
//   127 | 131 | 9684 | 8.172 | 13.20 | 8.85 | 8.33 | 5.11 | no | no
//   131 | 137 | 7664 | 8.390 | 13.43 | 9.01 | 8.63 | 5.29 | no | no
//   137 | 139 | 8280 | 8.299 | 14.17 | 9.46 | 8.73 | 5.35 | no | no
//   139 | 149 | 10807 | 8.018 | 15.28 | 10.12 | 9.23 | 5.66 | no | no
//   149 | 151 | 11730 | 7.922 | 16.10 | 10.61 | 9.33 | 5.72 | no | no
//   151 | 157 | 6953 | 8.432 | 15.72 | 10.42 | 9.63 | 5.90 | no | no
//   157 | 163 | 3525 | 9.098 | 15.12 | 10.10 | 9.92 | 6.08 | no | no
//   163 | 167 | 4338 | 8.878 | 16.07 | 10.68 | 10.12 | 6.20 | no | no
//   167 | 173 | 7310 | 8.344 | 17.71 | 11.64 | 10.41 | 6.38 | no | no
//   173 | 179 | 6507 | 8.449 | 18.10 | 11.89 | 10.70 | 6.56 | no | no
//   179 | 181 | 7013 | 8.363 | 18.90 | 12.38 | 10.79 | 6.62 | no | no
//   181 | 191 | 1105 | 10.200 | 16.01 | 10.73 | 11.27 | 6.91 | no | yes
//   191 | 193 | 1194 | 10.112 | 16.66 | 11.13 | 11.37 | 6.97 | no | yes
//   193 | 197 | 1460 | 9.900 | 17.55 | 11.67 | 11.56 | 7.08 | no | no
//   197 | 199 | 1578 | 9.812 | 18.25 | 12.10 | 11.65 | 7.14 | no | no
//   199 | 211 | 4669 | 8.717 | 21.14 | 13.81 | 12.22 | 7.49 | no | no
//   211 | 223 | 32968 | 10.665 | 17.78 | 11.87 | 12.78 | 7.84 | no | yes
//   251 | 257 | 21506 | 11.033 | 20.65 | 13.69 | 14.36 | 8.80 | no | yes
//   307 | 311 | 3946 | 12.663 | 21.98 | 14.63 | 16.80 | 10.29 | no | yes
//   353 | 359 | 3603 | 12.706 | 25.56 | 16.90 | 18.92 | 11.59 | no | yes
//   401 | 409 | 709 | 14.289 | 26.05 | 17.30 | 21.08 | 12.92 | no | yes
//   449 | 457 | 503 | 14.595 | 28.83 | 19.09 | 23.13 | 14.18 | no | yes
//   503 | 509 | 332 | 14.973 | 31.81 | 21.01 | 25.32 | 15.52 | no | yes
//   547 | 557 | 26 | 17.500 | 29.00 | 19.34 | 27.31 | 16.74 | no | yes
//   601 | 607 | 25 | 17.508 | 32.26 | 21.43 | 29.36 | 18.00 | no | yes
// ============================================================================
// READINGS — the published projection of x = 773 and x = 2297 survives as the
// top of a range, and the graph-corrected estimator halves it.
//
// 1. FORM 1, THE FORM THE PROJECTION USED, LANDS AT 719 AND 1801 ON THE FULL
//    MEASURED SET, and the seven specifications spread it over 509 to 757 for
//    0.31*p/ln p and 1201 to 2039 for 0.19*p/ln p. The published 773 and 2297
//    sit just above both spreads. The reading that survives is a range with the
//    published numbers at its optimistic edge, not a pair of levels.
//
// 2. THE SPREAD IS THE RANGE DEPENDENCE, NOT NOISE. The lower half of the
//    measured points fits 0.568 + 1.8385*T and crosses at 509; the upper half
//    fits 2.701 + 1.2933*T and crosses at 757. The out-of-sample-only fit,
//    x >= 211 with nine levels and R2 0.9974, crosses at 757 and 2039 — the
//    deepest data give the LATEST crossing, which is the direction that costs
//    the route.
//
// 3. FORM 2 IS A DIFFERENT ANSWER, NOT A REFINEMENT. import-sofic's estimator C
//    puts 0.31*p/ln p between 211 and 271 and 0.19*p/ln p between 547 and 929.
//    The two forms differ by a factor of two to three in x at both thresholds.
//    Both are fed the same measured f, so the gap is entirely the shape of the
//    estimator: ln D/ln(1/f) against [1 + ln(2D)/ln(2/f)]/1.4965.
//
// 4. AT THE MEASURED LEVELS THEMSELVES, WITH NO FIT AT ALL, form 1 never clears
//    0.31*p/ln p anywhere on the ladder: at x = 601 it reads 32.26 against
//    29.36, still above. Form 2 clears it from x = 211 (11.87 against 12.78) and
//    stays clear at every deep level. So the fitted crossings of §1 are not an
//    artifact of extrapolation for form 2 — the measurement itself already sits
//    on the clear side — and they ARE extrapolation for form 1, which does not
//    clear anywhere in the measured range.
//
// 5. WHAT NONE OF THIS IS. No row here is a bound. Every crossing is a fitted
//    law read outside its range, the 1.4965 of form 2 is measured on nine folds
//    at p <= 37, and the deepest measured level with a usable count is x = 503.
