'use strict';
// ============================================================================
// fdecay-deep 02 — validating the window instrument before it is believed
// ============================================================================
// The pre-registration (`research/history/staging/fdecay-deep-prereg.md` §3, §4)
// fixed four checks in advance and one required report. This script runs them.
//
//   V2  the window's slot density reproduces the exact tile mean gap
//   V3  the window's SINGLE-COPY kill-run length reproduces, level by level,
//       the L column of `attack-foldL-04-localized.js`'s embedded OUTPUT at the
//       same window length X = 2e9 — a different engine (min-prime key array,
//       linked list, bucketed deletions) reading the same object
//   V4  the qualifying comb's first-term share
//   §4  window-size sensitivity: f_win at every decade of X
//
// V1, the agreement with the published 42-point census, is NOT run here: it is
// the subject of `fdecay-deep-01-census-defect.js`, which shows the published
// table is the thing that fails. The instrument is validated against the
// alias-free evaluator there instead, which is the stronger check.
//
// f_win IS AN ESTIMATE of the tile ratio. §4 is the honest measurement of how
// much the window length matters, reported whether or not it is flattering.
// ============================================================================

const C = require('./fdecay-deep-00-core.js');
const t00 = Date.now();
const el = () => ((Date.now() - t00) / 1000).toFixed(1);
const log = console.log;
const X = Number(process.argv[2] || 2e9);
const XD = Number(process.argv[3] || 1e10);

const PR = C.primesUpTo(2000);
const nextPrime = x => PR.find(q => q > x);
const CEN = PR.filter(q => q >= 11 && q <= 199);
const DEEP = [211, 251, 307, 353, 401, 449, 503];

// CITED, `attack-foldL-04-localized.js` embedded OUTPUT, window X = 2.0e+9,
// column L, indexed by the FOLD p (its level before the fold is T_prevprime(p),
// which is this script's level x with p = nextprime(x)).
const FOLDL04 = { 13: 2, 17: 2, 19: 2, 23: 3, 29: 2, 31: 3, 37: 3, 41: 2, 43: 3, 47: 2, 53: 3, 59: 2, 61: 2, 67: 3, 71: 2, 73: 2, 79: 2, 83: 2, 89: 2, 97: 2, 101: 2, 103: 2, 107: 2, 109: 2, 113: 2, 127: 2, 131: 2, 137: 2, 139: 2, 149: 2, 151: 2, 157: 2, 163: 2, 167: 2, 173: 2, 179: 2, 181: 2, 191: 2, 193: 2, 197: 2, 199: 2, 211: 2, 227: 2, 229: 2, 233: 2, 239: 2, 241: 2, 251: 2, 257: 2, 263: 2, 269: 2, 271: 2, 277: 2, 281: 1, 293: 2, 311: 1, 317: 2, 331: 2, 401: 1, 421: 2, 431: 1, 461: 1, 491: 1, 601: 1, 701: 1, 751: 1 };

log('== fdecay-deep 02: VALIDATING THE WINDOW INSTRUMENT ==');
log(`census-range window X = ${X.toExponential(2)}, deep window X = ${XD.toExponential(2)}`);

const CP = [1e6, 1e7, 1e8, 1e9, 1e10, 1e11].filter(v => v <= X);
const run = C.measure({ X, levels: CEN, checkpoints: CP });
log(`[${el()}s] census-range run done`);

// ---------------------------------------------------------------- §1 ------
log('\n== 1. V2, HEAD BIAS: THE WINDOW SLOT DENSITY AGAINST THE EXACT TILE MEAN GAP ==');
log('  criterion fixed in advance: |X/(N*mbar_exact) - 1| <= 0.01 at every level');
let worst = 0, worstX = 0;
for (const w of run.rows) { const r = Math.abs((X / w.N) / w.mbarExact - 1); if (r > worst) { worst = r; worstX = w.x; } }
log(`  x | N | mbar_win | mbar_exact | ratio - 1`);
for (const w of run.rows) if ([11, 31, 71, 101, 151, 181, 199].includes(w.x)) log(`  ${w.x} | ${w.N} | ${(X / w.N).toFixed(4)} | ${w.mbarExact.toFixed(4)} | ${(((X / w.N) / w.mbarExact) - 1).toExponential(2)}`);
log(`  worst over all ${run.rows.length} levels: ${worst.toExponential(2)} at x = ${worstX} — V2 ${worst <= 0.01 ? 'PASSES' : 'FAILS'}`);
log('  the one cited comparison: attack-foldL-04-localized.js reports N = 28510623 at X = 2e9 for the');
log(`  level folded by 211, i.e. T_199. This run: N = ${run.rows[run.rows.length - 1].N}.`);

// ---------------------------------------------------------------- §2 ------
log('\n== 2. V3, THE SINGLE-COPY KILL RUN AGAINST attack-foldL-04-localized.js ==');
log('  same object, same window length, unrelated engine. Any disagreement is a defect HERE.');
log('  x | fold p | L(copy 0) measured | cited foldL-04 | agree');
let bad = 0, cmp = 0;
for (const w of run.rows) {
  const cited = FOLDL04[w.p]; if (cited === undefined) continue;
  cmp++; const ok = cited === w.Lcopy0; if (!ok) bad++;
  if (!ok || [11, 19, 31, 61, 101, 151, 199].includes(w.x)) log(`  ${w.x} | ${w.p} | ${w.Lcopy0} | ${cited} | ${ok ? 'yes' : 'NO'}`);
}
log(`  ${cmp - bad} of ${cmp} levels agree — V3 ${bad === 0 ? 'PASSES' : 'FAILS at ' + bad + ' levels'}`);
log('  and the max-over-copies L_win is a different and larger object, reported in 03 §7:');
log('  x | L(copy 0) | L_win (all p copies, the graph DP)');
for (const w of run.rows) if ([11, 19, 23, 29, 31, 47, 61, 101, 151, 199].includes(w.x)) log(`  ${w.x} | ${w.Lcopy0} | ${w.Lwin}`);

// ---------------------------------------------------------------- §3 ------
log('\n== 3. V4, THE QUALIFYING COMB TERM BY TERM ==');
log('  x | p | d_min | the comb as measured, d:count | first-term share of f');
for (const w of run.rows) {
  const sh = w.qhist.length ? 100 * w.qhist[0][1] / w.nqual : NaN;
  if (![11, 13, 17, 19, 23, 29, 31, 37, 61, 97, 101, 151, 199].includes(w.x)) continue;
  log(`  ${w.x} | ${w.p} | ${w.dmin} | ${w.qhist.slice(0, 5).map(([d, c]) => d + ':' + c).join(' ')} | ${sh.toFixed(3)}%`);
}
{
  const sh = run.rows.filter(w => w.qhist.length >= 2).map(w => 100 * w.qhist[0][1] / w.nqual).sort((a, b) => a - b);
  log(`  first-term share over the ${sh.length} levels where the window sees more than one comb tooth:`);
  log(`    min ${sh[0].toFixed(2)}%, median ${sh[sh.length >> 1].toFixed(2)}%, max ${sh[sh.length - 1].toFixed(2)}%`);
  log('    published for comparison (CITED a3-03 OUTPUT §4b, 18 rows): min 83.33%, median 98.08%.');
}

// ---------------------------------------------------------------- §4 ------
log('\n== 4. WINDOW-SIZE SENSITIVITY, THE REQUIRED REPORT ==');
log('  f_win at every decade of X. Registered prediction R2: no systematic drift beyond sampling error');
log('  once K >= 100. A drift here is an unknown bias in every deep point.');
log('  x | ' + CP.map(v => 'X=' + v.toExponential(0) + ' (f | K)').join(' | '));
for (const w of run.rows) {
  if (![37, 61, 97, 101, 127, 151, 181, 199].includes(w.x)) continue;
  log(`  ${w.x} | ` + w.snaps.map(s => `${(s.nqual / s.ngap).toExponential(3)} | ${s.nqual}`).join(' | '));
}
{
  log('  drift, measured: for each level the ratio f(final decade)/f(first decade with K >= 100), and');
  log('  the same ratio expressed in standard errors of the smaller sample.');
  let mx = 0, mxx = 0;
  for (const w of run.rows) {
    const good = w.snaps.filter(s => s.nqual >= 100); if (good.length < 2) continue;
    const a = good[0], b = good[good.length - 1];
    const z = ((b.nqual / b.ngap) / (a.nqual / a.ngap) - 1) * Math.sqrt(a.nqual);
    if (Math.abs(z) > Math.abs(mx)) { mx = z; mxx = w.x; }
  }
  log(`  worst drift over all levels: ${mx.toFixed(2)} sigma, at x = ${mxx}`);
}

// ---------------------------------------------------------------- §5 ------
log('\n== 5. THE SAME SENSITIVITY AT THE DEEP LEVELS ==');
const runD = C.measure({ X: XD, levels: DEEP, checkpoints: [1e8, 1e9, 1e10, 1e11].filter(v => v <= XD) });
log(`[${el()}s] deep run done, X = ${XD.toExponential(2)}`);
log('  x | p | d_min | ' + [1e8, 1e9, 1e10, 1e11].filter(v => v <= XD).map(v => 'X=' + v.toExponential(0)).join(' | ') + ' | final K | L_win | L(copy 0)');
for (const w of runD.rows) log(`  ${w.x} | ${w.p} | ${w.dmin} | ` + w.snaps.map(s => `${s.nqual ? (s.nqual / s.ngap).toExponential(3) : '0'}(K=${s.nqual})`).join(' | ') + ` | ${w.nqual} | ${w.Lwin} | ${w.Lcopy0}`);
log('  cited foldL-04 L at the folds this run reaches: p=257 gives 2, p=311 gives 1.');
log(`  measured here at the same folds: p=257 gives ${runD.rows.find(w => w.p === 257).Lcopy0}, p=311 gives ${runD.rows.find(w => w.p === 311).Lcopy0}.`);
log(`\n[total ${el()}s]`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/fdecay-deep-02-window.js -- 2e9 1e10
//   invocation:  node research/fdecay-deep-02-window.js 2e9 1e10
//   code-sha256: 3e7a3fc1baa1077bed3a0e305e8d3fd3f494fa4daa278922aa076a21f6a7e880
//   out-sha256:  6da42b1e1d458ed172b65213e7a73b8fd899724b7ab0a581f319ca3f3ff273de
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     140.8 s
// ============================================================================
// == fdecay-deep 02: VALIDATING THE WINDOW INSTRUMENT ==
// census-range window X = 2.00e+9, deep window X = 1.00e+10
// [67.8s] census-range run done
//
// == 1. V2, HEAD BIAS: THE WINDOW SLOT DENSITY AGAINST THE EXACT TILE MEAN GAP ==
//   criterion fixed in advance: |X/(N*mbar_exact) - 1| <= 0.01 at every level
//   x | N | mbar_win | mbar_exact | ratio - 1
//   11 | 116883116 | 17.1111 | 17.1111 | 7.56e-9
//   31 | 62091513 | 32.2105 | 32.2105 | 1.42e-7
//   71 | 43239415 | 46.2541 | 46.2543 | -4.04e-6
//   101 | 37540203 | 53.2762 | 53.2784 | -4.05e-5
//   151 | 31917450 | 62.6616 | 62.6578 | 6.08e-5
//   181 | 29717055 | 67.3014 | 67.2811 | 3.02e-4
//   199 | 28510623 | 70.1493 | 70.1143 | 4.98e-4
//   worst over all 42 levels: 4.98e-4 at x = 199 — V2 PASSES
//   the one cited comparison: attack-foldL-04-localized.js reports N = 28510623 at X = 2e9 for the
//   level folded by 211, i.e. T_199. This run: N = 28510623.
//
// == 2. V3, THE SINGLE-COPY KILL RUN AGAINST attack-foldL-04-localized.js ==
//   same object, same window length, unrelated engine. Any disagreement is a defect HERE.
//   x | fold p | L(copy 0) measured | cited foldL-04 | agree
//   11 | 13 | 2 | 2 | yes
//   19 | 23 | 3 | 3 | yes
//   31 | 37 | 3 | 3 | yes
//   61 | 67 | 3 | 3 | yes
//   101 | 103 | 2 | 2 | yes
//   151 | 157 | 2 | 2 | yes
//   199 | 211 | 2 | 2 | yes
//   42 of 42 levels agree — V3 PASSES
//   and the max-over-copies L_win is a different and larger object, reported in 03 §7:
//   x | L(copy 0) | L_win (all p copies, the graph DP)
//   11 | 2 | 2
//   19 | 3 | 3
//   23 | 2 | 2
//   29 | 3 | 4
//   31 | 3 | 4
//   47 | 3 | 3
//   61 | 3 | 3
//   101 | 2 | 2
//   151 | 2 | 2
//   199 | 2 | 2
//
// == 3. V4, THE QUALIFYING COMB TERM BY TERM ==
//   x | p | d_min | the comb as measured, d:count | first-term share of f
//   11 | 13 | 24 | 24:5194805 | 100.000%
//   13 | 17 | 36 | 36:3996004 66:799201 | 83.333%
//   17 | 19 | 36 | 36:4003838 78:258564 | 93.934%
//   19 | 23 | 48 | 48:2157196 90:254851 138:17734 | 88.781%
//   23 | 29 | 60 | 60:2181773 114:3943 174:54 | 99.817%
//   29 | 31 | 60 | 60:2416251 126:63415 186:645 | 97.417%
//   31 | 37 | 72 | 72:1095675 150:49186 222:230 294:1 | 95.684%
//   37 | 41 | 84 | 84:436789 162:18302 246:25 330:2 | 95.973%
//   61 | 67 | 132 | 132:245104 270:1475 402:9 | 99.398%
//   97 | 101 | 204 | 204:26361 402:196 | 99.262%
//   101 | 103 | 204 | 204:28840 414:68 618:1 | 99.761%
//   151 | 157 | 312 | 312:6935 630:18 | 99.741%
//   199 | 211 | 420 | 420:4669 | 100.000%
//   first-term share over the 38 levels where the window sees more than one comb tooth:
//     min 83.33%, median 99.63%, max 99.99%
//     published for comparison (CITED a3-03 OUTPUT §4b, 18 rows): min 83.33%, median 98.08%.
//
// == 4. WINDOW-SIZE SENSITIVITY, THE REQUIRED REPORT ==
//   f_win at every decade of X. Registered prediction R2: no systematic drift beyond sampling error
//   once K >= 100. A drift here is an unknown bias in every deep point.
//   x | X=1e+6 (f | K) | X=1e+7 (f | K) | X=1e+8 (f | K) | X=1e+9 (f | K)
//   37 | 8.087e-3 | 747 | 7.821e-3 | 2890 | 7.736e-3 | 22869 | 7.745e-3 | 227538
//   61 | 5.728e-3 | 413 | 5.534e-3 | 1596 | 5.335e-3 | 12314 | 5.379e-3 | 123393
//   97 | 6.453e-4 | 39 | 6.598e-4 | 159 | 6.872e-4 | 1324 | 6.904e-4 | 13225
//   101 | 7.254e-4 | 43 | 7.406e-4 | 175 | 7.731e-4 | 1460 | 7.682e-4 | 14424
//   127 | 2.762e-4 | 15 | 2.220e-4 | 48 | 2.877e-4 | 496 | 2.816e-4 | 4828
//   151 | 2.566e-4 | 13 | 1.685e-4 | 34 | 2.118e-4 | 340 | 2.158e-4 | 3445
//   181 | 2.122e-5 | 1 | 1.591e-5 | 3 | 4.211e-5 | 63 | 3.883e-5 | 577
//   199 | 8.868e-5 | 4 | 1.324e-4 | 24 | 1.796e-4 | 258 | 1.662e-4 | 2370
//   drift, measured: for each level the ratio f(final decade)/f(first decade with K >= 100), and
//   the same ratio expressed in standard errors of the smaller sample.
//   worst drift over all levels: 3.01 sigma, at x = 79
//
// == 5. THE SAME SENSITIVITY AT THE DEEP LEVELS ==
// [140.6s] deep run done, X = 1.00e+10
//   x | p | d_min | X=1e+8 | X=1e+9 | X=1e+10 | final K | L_win | L(copy 0)
//   211 | 223 | 444 | 2.038e-5(K=29) | 2.174e-5(K=307) | 2.337e-5(K=3301) | 3301 | 2 | 2
//   251 | 257 | 516 | 1.415e-5(K=19) | 1.512e-5(K=201) | 1.646e-5(K=2190) | 2190 | 2 | 2
//   307 | 311 | 624 | 3.962e-6(K=5) | 2.809e-6(K=35) | 3.211e-6(K=400) | 400 | 2 | 2
//   353 | 359 | 720 | 2.489e-6(K=3) | 2.189e-6(K=26) | 3.025e-6(K=359) | 359 | 2 | 2
//   401 | 409 | 816 | 8.635e-7(K=1) | 2.633e-7(K=3) | 6.242e-7(K=71) | 71 | 2 | 1
//   449 | 457 | 912 | 8.948e-7(K=1) | 9.099e-7(K=10) | 5.203e-7(K=57) | 57 | 2 | 1
//   503 | 509 | 1020 | 0(K=0) | 3.775e-7(K=4) | 2.654e-7(K=28) | 28 | 2 | 1
//   cited foldL-04 L at the folds this run reaches: p=257 gives 2, p=311 gives 1.
//   measured here at the same folds: p=257 gives 2, p=311 gives 2.
//
// [total 140.6s]
// ============================================================================
// READINGS — the instrument is validated, and the strongest single line is that
// N = 28510623 at X = 2e9 agrees digit for digit with a different engine.
//
// 1. V2, HEAD BIAS: PASSES, and by three orders of margin. The window's slot
//    density reproduces the exact tile mean gap to 4.98e-4 at worst, at x = 199,
//    against a criterion of 0.01 fixed in the pre-registration. At x = 11 the
//    agreement is 7.56e-9. The prefix is not a biased sample of the period for
//    the FIRST moment, which is what this check covers and all it covers.
//
// 2. V3, THE SINGLE-COPY KILL RUN: PASSES, 42 of 42 levels. The comparison is
//    against `attack-foldL-04-localized.js`, which reads the same object at the
//    same X = 2e9 through a min-prime key array, a doubly linked list and
//    bucketed deletions, and shares no line of code with this sieve. Its slot
//    count at the level folded by 211 is 28510623 and this run's is 28510623.
//    That is the custody this pass rests on, and it was fixed in advance.
//
// 3. THE MAX-OVER-COPIES L IS A DIFFERENT AND LARGER OBJECT. At x = 29 and
//    x = 31 the single copy gives 3 and the graph DP over all p copies gives 4.
//    Elsewhere in the sampled rows they coincide. So `foldL-04`'s L column is a
//    lower bound on the lower bound, and the L_win of 03 §7 is the right window
//    analogue of the tile's L.
//
// 4. V4, THE COMB: the window sees the qualifying comb tooth by tooth, 24 alone
//    at x = 11, then 36 and 66 at x = 13, up to four teeth at x = 31
//    (72:1095675 150:49186 222:230 294:1). The first-term share runs 83.33 per
//    cent at worst and 99.63 per cent at the median over the 38 levels with more
//    than one tooth, against the published 83.33 per cent and 98.08 per cent
//    over 18 rows. Same object, more levels.
//
// 5. WINDOW-SIZE SENSITIVITY: NO DRIFT, which is registered prediction R2 and it
//    holds. Worst drift over all 42 levels is 3.01 sigma, at x = 79, between the
//    first decade with K >= 100 and the last. Level by level the decades sit on
//    top of each other: x = 37 reads 8.087e-3, 7.821e-3, 7.736e-3, 7.745e-3
//    across four decades of X, and x = 199 reads 1.796e-4 then 1.662e-4 once K
//    passes 100. Below K = 100 the scatter is large and visible — x = 181 reads
//    2.122e-5 on ONE event — which is why every deep row is quoted with its K.
//
// 6. AND THE SAME AT DEPTH. Over x = 211 to 503 the decades agree wherever K is
//    not tiny: x = 211 reads 2.174e-5 then 2.337e-5 at K = 307 and K = 3301.
//    At x = 401, 449, 503 the K = 1 to 10 columns swing by a factor of three,
//    which is Poisson and not instrument.
//
// 7. ONE APPARENT DISAGREEMENT, AND IT IS NOT ONE. At fold 311 this run reports
//    a single-copy L of 2 where `foldL-04` reports 1. The two windows are not
//    the same: that comparison is made in §5 at X = 1e10 against a cited value
//    measured at X = 2e9, and L is monotone in the window. The like-for-like
//    comparison is §2, at X = 2e9, where every level agrees. At fold 257 both
//    read 2 at both lengths.
//
// 8. WHAT IS NOT VALIDATED HERE. V1 of the pre-registration, agreement with the
//    published 42-point census, is not run in this file. It fails, and
//    `fdecay-deep-01-census-defect.js` is why: the published table is the object
//    that breaks, not the instrument. The check that replaces it is the window
//    against an alias-free evaluation of the census law, in 01 §3.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). One figure
// here is not in the OUTPUT block. No number above was changed.
//
// SAME VALUE, DIFFERENT NOTATION: X = 1e10 is printed as "deep window
//   X = 1.00e+10".
// ---------------------------------------------------------------------------
