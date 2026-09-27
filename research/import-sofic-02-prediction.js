// import-sofic-02-prediction.js
//
// FOREIGN IMPORT (IMPORT-MAP row 2), stage 2: THE FIRST-MOMENT LONGEST-RUN LAW
// FROM THE GRAPH, AND THE PRE-REGISTERED RATIO TEST.
//
// THE IMPORT. Flajolet and Sedgewick, "Analytic Combinatorics", CUP 2009,
// Proposition V.2 (the longest run): in a Bernoulli sequence of length n with
// per-letter probability q, the longest run of that letter concentrates at
// log_{1/q}(n) with an O(1) fluctuation. The first-moment form used here is the
// crossing point of the expected count of runs of length l with 1, which is the
// same leading term.
//
// WHAT IS PRE-REGISTERED. research/history/staging/import-sofic-prereg.md,
// written before this file ran. It fixes three estimators A, B, C; the exclusion
// of folds 11 and 29 with the PROVEN reason for each; the trend statistic (OLS
// slope of the ratio on ln p, with its standard error, on nine folds and on
// seven); and the kill thresholds.
//
// WHAT D IS, FOR THIS GRAPH, PER FOLD. This is the question the map leaves open.
// The fold at p acts on the tile T_x, x the previous prime, and the run scan
// must run over the FULL PERIOD of p copies, pD slots, not D
// (research/import-maxplus-01-mapping.js reading 8). The count of KILLS in that
// period is exactly 2D, since every old slot is deleted in exactly two of the p
// copies. The per-step continuation probability given a state is 2/p under
// uniform gap residues, NOT the qualifying fraction 3/p (import-sofic-01 s4).
// So the first-moment law is
//      2D * (2/p)^(l-1) = 1   =>   L_A = 1 + ln(2D)/ln(p/2) = ln(pD)/ln(p/2),
// and the two ways of writing it, "kills times continuation" and "period length
// times marginal", agree identically because the marginal kill rate 2/p equals
// the conditional one.
//
// NOTHING EXACT IS RECOMPUTED HERE. The exact per-fold L, the tile slot counts D
// and the adjacent-pair census PAIRS are all cited from the corpus.
'use strict';

// ---- cited inputs ----------------------------------------------------------
// research/U-FRAME.md section 5 table; research/a3-10-lower-tightness.js reading
// 1 (which corrects fold 29 to 2 and confirms folds 31 and 37); qc.js W2 for the
// first seven. VERIFIED again at folds 7..29 by import-sofic-01-graph.js.
const FOLD  = [7, 11, 13, 17, 19, 23, 29, 31, 37];
const TILE  = [5, 7, 11, 13, 17, 19, 23, 29, 31];
const LEXACT= [2, 1, 2, 2, 2, 3, 2, 4, 4];
// D = prod_{3<=q<=x}(q-2); T_31's 6,226,553,025 agrees with
// research/operator-and-pair-count.md.
const D     = [3, 15, 135, 1485, 22275, 378675, 7952175, 214708725, 6226553025];
// research/operator-and-pair-count.md section 11, the weighted census.
const PAIRS = [2, 0, 6, 72, 1088, 11870, 243822, 8025014, 114874436];
// research/U-FRAME.md section 5a step 7, the measured qualifying-gap fraction f
// on the diagonal (folds 13..37; folds 7 and 11 are not in that table).
const F_UFRAME = [null, null, 4.44e-2, 4.85e-2, 4.88e-2, 3.11e-2, 3.07e-2, 3.74e-2, 1.84e-2];

const out = []; const say = s => out.push(s);
const fx = (v, d) => (v === null || !isFinite(v)) ? '   --   ' : v.toFixed(d);

// ---- 1. the three estimators ----------------------------------------------
say('=== 1. THE THREE ESTIMATORS, AS PRE-REGISTERED ===');
say('A  graph first moment, uniform residues:  L_A = ln(pD)/ln(p/2)');
say('B  the map/U-FRAME 5a step 6 formula:     L_B = ln D / ln(p/3)');
say('C  graph with the MEASURED edge weight:   L_C = 1 + ln(2D)/ln(1/f_edge),');
say('                                          f_edge = PAIRS/(2D)');
say('');
say('fold  tile   D             lnD        lnD/p    L_A      L_B      f_edge      L_C');
const A = [], B = [], C = [], FE = [];
for (let i = 0; i < FOLD.length; i++) {
  const p = FOLD[i], d = D[i], lnD = Math.log(d);
  const a = Math.log(p * d) / Math.log(p / 2);
  const b = lnD / Math.log(p / 3);
  const fe = PAIRS[i] / (2 * d);
  const c = (fe > 0) ? 1 + Math.log(2 * d) / Math.log(1 / fe) : 1;
  A.push(a); B.push(b); C.push(c); FE.push(fe);
  say(`  ${String(p).padEnd(6)}T_${String(TILE[i]).padEnd(5)}${String(d).padEnd(14)}` +
      `${fx(lnD, 4).padEnd(11)}${fx(lnD / p, 4).padEnd(9)}${fx(a, 4).padEnd(9)}${fx(b, 4).padEnd(9)}` +
      `${fe.toExponential(3).padEnd(12)}${fx(c, 4)}`);
}
say('f_edge = 0 at fold 11 forces L_C = 1 exactly, which is the truth there.');
say('lnD/p is the Chebyshev ratio the shape claim needs at 1; it is still climbing.');

// ---- 2. the ratio column ---------------------------------------------------
say('');
say('=== 2. THE RATIO COLUMN, R = L_pred / L_exact ===');
say('fold  L_exact   R_A       R_B       R_C');
const RA = [], RB = [], RC = [];
for (let i = 0; i < FOLD.length; i++) {
  RA.push(A[i] / LEXACT[i]); RB.push(B[i] / LEXACT[i]); RC.push(C[i] / LEXACT[i]);
  say(`  ${String(FOLD[i]).padEnd(6)}${String(LEXACT[i]).padEnd(10)}${fx(RA[i], 4).padEnd(10)}${fx(RB[i], 4).padEnd(10)}${fx(RC[i], 4)}`);
}

// ---- 3. the pre-registered trend test --------------------------------------
function ols(xs, ys) {
  const n = xs.length;
  const mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
  let sxx = 0, sxy = 0;
  for (let i = 0; i < n; i++) { sxx += (xs[i] - mx) ** 2; sxy += (xs[i] - mx) * (ys[i] - my); }
  const b = sxy / sxx, a = my - b * mx;
  let sse = 0; for (let i = 0; i < n; i++) sse += (ys[i] - a - b * xs[i]) ** 2;
  let sst = 0; for (let i = 0; i < n; i++) sst += (ys[i] - my) ** 2;
  const s2 = sse / (n - 2), se = Math.sqrt(s2 / sxx);
  return { a, b, se, t: b / se, r2: 1 - sse / sst, n, mean: my };
}
const KEEP7 = FOLD.map((p, i) => i).filter(i => FOLD[i] !== 11 && FOLD[i] !== 29);
const lnp = FOLD.map(p => Math.log(p));
say('');
say('=== 3. THE PRE-REGISTERED TREND TEST: OLS of R on ln p ===');
say('estimator  set        n  mean R    slope b    SE(b)     t = b/SE   R^2      b > 2 SE ?');
const trend = {};
for (const [name, R] of [['A', RA], ['B', RB], ['C', RC]]) {
  for (const [tag, idx] of [['all nine', FOLD.map((_, i) => i)], ['seven', KEEP7]]) {
    const f = ols(idx.map(i => lnp[i]), idx.map(i => R[i]));
    trend[name + '|' + tag] = f;
    say(`  ${name.padEnd(11)}${tag.padEnd(11)}${String(f.n).padEnd(3)}${fx(f.mean, 4).padEnd(10)}` +
        `${(f.b >= 0 ? ' ' : '') + fx(f.b, 4).padEnd(11)}${fx(f.se, 4).padEnd(10)}` +
        `${(f.t >= 0 ? ' ' : '') + fx(f.t, 4).padEnd(11)}${fx(f.r2, 4).padEnd(9)}${f.b > 2 * f.se}`);
  }
}
say('');
say('endpoint check: mean R over folds 29,31,37 divided by mean R over folds 7,11,13');
for (const [name, R] of [['A', RA], ['B', RB], ['C', RC]]) {
  const top = (R[6] + R[7] + R[8]) / 3, bot = (R[0] + R[1] + R[2]) / 3;
  say(`  ${name}: top ${fx(top, 4)}  bottom ${fx(bot, 4)}  ratio ${fx(top / bot, 4)}`);
}
say('');
say('the alternative the kill criterion aims at: if the shape were wrong by one log,');
say('R would track ln p. ln p over the nine folds spans a factor of');
say(`  ln 37 / ln 7 = ${fx(Math.log(37) / Math.log(7), 4)}, so a ratio growing like ln p would show`);
say('  an endpoint ratio near that and a slope near mean R.');

// ---- 4. the verdict against the pre-registered thresholds ------------------
say('');
say('=== 4. VERDICT AGAINST THE PRE-REGISTERED THRESHOLDS ===');
for (const name of ['A', 'B', 'C']) {
  const f9 = trend[name + '|all nine'], f7 = trend[name + '|seven'];
  const sig9 = f9.b > 2 * f9.se, sig7 = f7.b > 2 * f7.se;
  let v;
  if (sig9 && sig7) v = 'KILL 1: shape dies, row drops to WALL-ADDRESS';
  else if (sig9 !== sig7) v = 'AMBIGUOUS (thresholds 4): the two readings disagree';
  else if (f7.mean > 5) v = 'KILL 2: flat but mean R > 5, constant out of reach';
  else v = 'SURVIVES: flat, and mean R <= 5';
  say(`  estimator ${name}: nine-fold b>2SE = ${String(sig9).padEnd(6)} seven-fold b>2SE = ${String(sig7).padEnd(6)} mean R (seven) = ${fx(f7.mean, 4)}`);
  say(`               ${v}`);
}

// ---- 5. the map's own arithmetic at p = 101 --------------------------------
function primesTo(n) { const ps = []; for (let k = 2; k <= n; k++) { let ok = true; for (let j = 2; j * j <= k; j++) if (k % j === 0) { ok = false; break; } if (ok) ps.push(k); } return ps; }
function lnDof(x) { let s = 0; for (const q of primesTo(x)) if (q >= 3) s += Math.log(q - 2); return s; }
say('');
say('=== 5. THE MAP ROW-2 ARITHMETIC AT p = 101, CHECKED ===');
{
  const p = 101, x = 97, lnD = lnDof(x);
  const need = p / Math.log(p);
  const lo = 0.19 * need, hi = 0.31 * need;
  say(`  requirement (gate-multiplies.md s8): L <= (0.19 to 0.31) p/ln p`);
  say(`  p/ln p = ${fx(need, 4)}  =>  L <= ${fx(lo, 4)} to ${fx(hi, 4)}   (the map's "4.2 to 6.8": confirmed)`);
  say(`  the map's 28.7:  p / ln(p/3) = ${fx(p / Math.log(p / 3), 4)}   <- ln D replaced by p`);
  say(`  the true ln D(T_97) = sum_{3<=q<=97} ln(q-2) = ${fx(lnD, 4)}, not 101; ratio ${fx(lnD / p, 4)}`);
  const b101 = lnD / Math.log(p / 3), a101 = (lnD + Math.log(p)) / Math.log(p / 2);
  say(`  L_B(101) with the true ln D = ${fx(b101, 4)}`);
  say(`  L_A(101), the graph's own first moment = ${fx(a101, 4)}`);
  say(`  factor over the requirement: map's 28.7 -> ${fx(28.7217 / hi, 3)} to ${fx(28.7217 / lo, 3)}   (the map's "4.2 to 6.9")`);
  say(`                               L_B true    -> ${fx(b101 / hi, 3)} to ${fx(b101 / lo, 3)}`);
  say(`                               L_A         -> ${fx(a101 / hi, 3)} to ${fx(a101 / lo, 3)}`);
  const meanRA = trend['A|seven'].mean;
  say(`  and if R_A were flat at its seven-fold mean ${fx(meanRA, 4)}, the implied TRUTH at p=101`);
  say(`  is L = ${fx(a101 / meanRA, 4)}, against the requirement ${fx(lo, 4)} to ${fx(hi, 4)}: factor ${fx(a101 / meanRA / hi, 3)} to ${fx(a101 / meanRA / lo, 3)}`);
}

// ---- 6. which f the object actually has ------------------------------------
say('');
say('=== 6. THE INPUT THE SHAPE CLAIM NEEDS, AGAINST THE ONE THE OBJECT HAS ===');
say('fold  f_edge (graph)  f measured (U-FRAME 5a step 7)  uniform 3/p   f_meas/(3/p)');
for (let i = 0; i < FOLD.length; i++) {
  const p = FOLD[i], u = 3 / p, fm = F_UFRAME[i];
  say(`  ${String(p).padEnd(6)}${FE[i].toExponential(3).padEnd(16)}${(fm === null ? '   --   ' : fm.toExponential(3)).padEnd(32)}` +
      `${u.toExponential(3).padEnd(14)}${fm === null ? '  --  ' : fx(fm / u, 4)}`);
}
say('');
say('research/f-decays.md, 42 exact census points x = 11..199, CITED not recomputed:');
say('  ln(1/f) = 1.001 + 1.451*(2p/mbar), R^2 = 0.902, and f falls by a factor 170');
say('  over that range while 3/p falls by a factor of about 16.');
say('  With mbar ~ Mertens, polylog in x, ln(1/f) grows like p/polylog(p), not like ln p,');
say('  so L ~ lnD/ln(1/f) ~ p/(p/polylog) = polylog. f-decays.md fits');
say('  ln L = -1.884 + 2.892*lnln x, R^2 = 0.972.');
say('  The uniform-residue input f = 3/p is therefore NOT the object f, and the');
say('  p/ln p shape is the shape of the WRONG input.');


// ---- 7. post-hoc robustness, and why A is flat where B is not --------------
say('');
say('=== 7. POST-HOC ROBUSTNESS (declared post-hoc, NOT pre-registered) ===');
{
  const top5 = [3, 4, 5, 7, 8];          // folds 17, 19, 23, 31, 37 (29 excluded)
  for (const [name, R] of [['A', RA], ['B', RB], ['C', RC]]) {
    const f = ols(top5.map(i => lnp[i]), top5.map(i => R[i]));
    say(`  ${name} on folds 17,19,23,31,37 only: mean ${fx(f.mean, 4)}  slope ${fx(f.b, 4)}  SE ${fx(f.se, 4)}  t ${fx(f.t, 4)}`);
  }
  say('  so B\'s significant slope is carried by the two smallest folds, where D is 3 and 15.');
  say('');
  say('  and the reason A is flat where B is not, decomposed exactly:');
  say('  A/B = [ln(pD)/ln D] * [ln(p/3)/ln(p/2)]');
  say('  fold   ln(pD)/lnD   ln(p/3)/ln(p/2)   A/B');
  for (let i = 0; i < FOLD.length; i++) {
    const p = FOLD[i], d = D[i];
    const t1 = Math.log(p * d) / Math.log(d), t2 = Math.log(p / 3) / Math.log(p / 2);
    say(`   ${String(p).padEnd(7)}${fx(t1, 4).padEnd(13)}${fx(t2, 4).padEnd(18)}${fx(t1 * t2, 4)}`);
  }
  say('  A/B falls to 1.00 by fold 37, so the correction that flattens A is a');
  say('  SMALL-D TRANSIENT and is spent. Beyond the ladder A and B coincide, and');
  say('  A must inherit B\'s drift. A\'s flatness over 7..37 does not extrapolate.');
}

// ---- 8. the comparison at the levels that actually decide ------------------
say('');
say('=== 8. THE REQUIREMENT AT THE LEVELS THAT DECIDE IT ===');
say('research/gate-multiplies.md s8, CITED: burn/replenish ~ 2.6 ln^3 p / p on the');
say('polylog branch, crossing 1 near p ~ 800. So p = 101, the level the map picks,');
say('is below the level at which ANY L clears the threshold, and the factor quoted');
say('there is measured where the chain fails for a reason that is not L.');
say('');
say('level x   p        mbar=W/D    req lo    req hi    L_A       L_A/Rflat   L(f-decays)  L(f-fit)');
for (const x of [31, 97, 199, 809, 1009, 10007]) {
  const ps = primesTo(x + 200);
  const p = ps.find(q => q > x);
  let lnD = 0, lnW = 0;
  for (const q of ps) { if (q > x) break; lnW += Math.log(q); if (q >= 3) lnD += Math.log(q - 2); }
  const mbar = Math.exp(lnW - lnD);
  const need = p / Math.log(p), lo = 0.19 * need, hi = 0.31 * need;
  const a = (lnD + Math.log(p)) / Math.log(p / 2);
  const rflat = trend['A|seven'].mean;
  // f-decays.md CITED fits: ln L = -1.884 + 2.892 lnln x, and
  // ln(1/f) = 1.001 + 1.451 (2p/mbar) fed through L = 1 + ln(2D)/ln(2/f).
  const Lpoly = Math.exp(-1.884 + 2.892 * Math.log(Math.log(x)));
  const lninvf = 1.001 + 1.451 * (2 * p / mbar);
  const Lffit = 1 + (lnD + Math.log(2)) / (lninvf + Math.log(2));
  say(`  ${String(x).padEnd(10)}${String(p).padEnd(9)}${fx(mbar, 2).padEnd(12)}${fx(lo, 3).padEnd(10)}${fx(hi, 3).padEnd(10)}` +
      `${fx(a, 3).padEnd(10)}${fx(a / rflat, 3).padEnd(12)}${fx(Lpoly, 3).padEnd(13)}${fx(Lffit, 3)}`);
}
say('');
say('  L_A/Rflat is what the flat-ratio hypothesis predicts the TRUTH to be.');
say('  L(f-decays) and L(f-fit) are two forward projections from f-decays.md\'s two');
say('  independent fits over 42 exact census points. All three are CITED-COEFFICIENT');
say('  extrapolations far outside their range and none is a bound.');
say('');
say('  crossing levels, where each projection first falls below the requirement:');
for (const [nm, fn] of [
  ['L_A/Rflat vs 0.31 p/lnp', (lnD, p, mbar, x) => ((lnD + Math.log(p)) / Math.log(p / 2)) / trend['A|seven'].mean - 0.31 * p / Math.log(p)],
  ['L(f-decays) vs 0.31 p/lnp', (lnD, p, mbar, x) => Math.exp(-1.884 + 2.892 * Math.log(Math.log(x))) - 0.31 * p / Math.log(p)],
  ['L(f-decays) vs 0.19 p/lnp', (lnD, p, mbar, x) => Math.exp(-1.884 + 2.892 * Math.log(Math.log(x))) - 0.19 * p / Math.log(p)],
]) {
  let cross = null;
  const ps = primesTo(20000);
  for (const x of ps) {
    if (x < 30) continue;
    const p = ps.find(q => q > x);
    let lnD = 0, lnW = 0;
    for (const q of ps) { if (q > x) break; lnW += Math.log(q); if (q >= 3) lnD += Math.log(q - 2); }
    if (fn(lnD, p, Math.exp(lnW - lnD), x) < 0) { cross = x; break; }
  }
  say(`   ${nm.padEnd(28)} first clears at x = ${cross === null ? '> 20000' : cross}`);
}
say('  gate-multiplies.md s8 puts the turnaround near p ~ 800 independently.');


// ---- 9. the constant that remains, stated exactly -------------------------
say('');
say('=== 9. THE CONSTANT THAT REMAINS, STATED EXACTLY ===');
say('A flat ratio R turns the prediction L_A into a claim about the truth,');
say('L_true = L_A / R. For that to meet L <= c p/ln p with c in [0.19, 0.31],');
say('R must be at least (L_A ln p / p) / c. Measured R_A (seven folds) = ' + fx(trend['A|seven'].mean, 4) + '.');
say('');
say('level x   p        L_A/(p/lnp)   R needed at c=0.31   R needed at c=0.19   R measured   shortfall');
for (const x of [31, 97, 199, 1009, 10007]) {
  const ps = primesTo(x + 200);
  const pp = ps.find(q => q > x);
  let lnD = 0; for (const q of ps) { if (q > x) break; if (q >= 3) lnD += Math.log(q - 2); }
  const a = (lnD + Math.log(pp)) / Math.log(pp / 2);
  const k = a / (pp / Math.log(pp));
  const rm = trend['A|seven'].mean;
  say(`  ${String(x).padEnd(10)}${String(pp).padEnd(9)}${fx(k, 4).padEnd(14)}${fx(k / 0.31, 4).padEnd(21)}${fx(k / 0.19, 4).padEnd(21)}${fx(rm, 4).padEnd(13)}${fx(k / 0.31 / rm, 3)} to ${fx(k / 0.19 / rm, 3)}`);
}
say('');
say('so a PERFECTLY flat ratio at the measured value still misses the requirement');
say('by a factor of about 1.6 to 2.7 at every level. The map\'s "only a constant"');
say('is a constant that the measurement does not supply.');

console.log(out.join('\n'));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/import-sofic-02-prediction.js
//   invocation:  node research/import-sofic-02-prediction.js
//   code-sha256: d98b2c95ed20add8331b041569a75c1a417c30082e6e6058e5123a203b4a1cdb
//   out-sha256:  58476cff096ca4c89a4bf8dec998bf18171cb7daf969e949734e5a31759cca38
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     0.1 s
// ============================================================================
// === 1. THE THREE ESTIMATORS, AS PRE-REGISTERED ===
// A  graph first moment, uniform residues:  L_A = ln(pD)/ln(p/2)
// B  the map/U-FRAME 5a step 6 formula:     L_B = ln D / ln(p/3)
// C  graph with the MEASURED edge weight:   L_C = 1 + ln(2D)/ln(1/f_edge),
//                                           f_edge = PAIRS/(2D)
//
// fold  tile   D             lnD        lnD/p    L_A      L_B      f_edge      L_C
//   7     T_5    3             1.0986     0.1569   2.4302   1.2966   3.333e-1    2.6309
//   11    T_7    15            2.7081     0.2462   2.9951   2.0843   0.000e+0    1.0000
//   13    T_11   135           4.9053     0.3773   3.9909   3.3453   2.222e-2    2.4707
//   17    T_13   1485          7.3032     0.4296   4.7365   4.2103   2.424e-2    3.1497
//   19    T_17   22275         10.0112    0.5269   5.7548   5.4237   2.442e-2    3.8835
//   23    T_19   378675        12.8444    0.5585   6.5429   6.3059   1.567e-2    4.2575
//   29    T_23   7952175       15.8890    0.5479   7.2009   7.0036   1.533e-2    4.9690
//   31    T_29   214708725     19.1848    0.6189   8.2525   8.2149   1.869e-2    5.9946
//   37    T_31   6226553025    22.5521    0.6095   8.9668   8.9767   9.225e-3    5.9607
// f_edge = 0 at fold 11 forces L_C = 1 exactly, which is the truth there.
// lnD/p is the Chebyshev ratio the shape claim needs at 1; it is still climbing.
//
// === 2. THE RATIO COLUMN, R = L_pred / L_exact ===
// fold  L_exact   R_A       R_B       R_C
//   7     2         1.2151    0.6483    1.3155
//   11    1         2.9951    2.0843    1.0000
//   13    2         1.9955    1.6726    1.2353
//   17    2         2.3682    2.1051    1.5749
//   19    2         2.8774    2.7119    1.9418
//   23    3         2.1810    2.1020    1.4192
//   29    2         3.6004    3.5018    2.4845
//   31    4         2.0631    2.0537    1.4987
//   37    4         2.2417    2.2442    1.4902
//
// === 3. THE PRE-REGISTERED TREND TEST: OLS of R on ln p ===
// estimator  set        n  mean R    slope b    SE(b)     t = b/SE   R^2      b > 2 SE ?
//   A          all nine   9  2.3931     0.5157     0.4385     1.1759     0.1649   false
//   A          seven      7  2.1346     0.5292     0.3213     1.6471     0.3517   false
//   B          all nine   9  2.1249     0.9784     0.3828     2.5561     0.4828   true
//   B          seven      7  1.9340     0.8880     0.3301     2.6904     0.5914   true
//   C          all nine   9  1.5511     0.4083     0.2609     1.5651     0.2592   false
//   C          seven      7  1.4965     0.1353     0.1721     0.7864     0.1101   false
//
// endpoint check: mean R over folds 29,31,37 divided by mean R over folds 7,11,13
//   A: top 2.6351  bottom 2.0686  ratio 1.2739
//   B: top 2.5999  bottom 1.4684  ratio 1.7706
//   C: top 1.8244  bottom 1.1836  ratio 1.5414
//
// the alternative the kill criterion aims at: if the shape were wrong by one log,
// R would track ln p. ln p over the nine folds spans a factor of
//   ln 37 / ln 7 = 1.8556, so a ratio growing like ln p would show
//   an endpoint ratio near that and a slope near mean R.
//
// === 4. VERDICT AGAINST THE PRE-REGISTERED THRESHOLDS ===
//   estimator A: nine-fold b>2SE = false  seven-fold b>2SE = false  mean R (seven) = 2.1346
//                SURVIVES: flat, and mean R <= 5
//   estimator B: nine-fold b>2SE = true   seven-fold b>2SE = true   mean R (seven) = 1.9340
//                KILL 1: shape dies, row drops to WALL-ADDRESS
//   estimator C: nine-fold b>2SE = false  seven-fold b>2SE = false  mean R (seven) = 1.4965
//                SURVIVES: flat, and mean R <= 5
//
// === 5. THE MAP ROW-2 ARITHMETIC AT p = 101, CHECKED ===
//   requirement (gate-multiplies.md s8): L <= (0.19 to 0.31) p/ln p
//   p/ln p = 21.8846  =>  L <= 4.1581 to 6.7842   (the map's "4.2 to 6.8": confirmed)
//   the map's 28.7:  p / ln(p/3) = 28.7217   <- ln D replaced by p
//   the true ln D(T_97) = sum_{3<=q<=97} ln(q-2) = 79.7729, not 101; ratio 0.7898
//   L_B(101) with the true ln D = 22.6852
//   L_A(101), the graph's own first moment = 21.5167
//   factor over the requirement: map's 28.7 -> 4.234 to 6.907   (the map's "4.2 to 6.9")
//                                L_B true    -> 3.344 to 5.456
//                                L_A         -> 3.172 to 5.175
//   and if R_A were flat at its seven-fold mean 2.1346, the implied TRUTH at p=101
//   is L = 10.0801, against the requirement 4.1581 to 6.7842: factor 1.486 to 2.424
//
// === 6. THE INPUT THE SHAPE CLAIM NEEDS, AGAINST THE ONE THE OBJECT HAS ===
// fold  f_edge (graph)  f measured (U-FRAME 5a step 7)  uniform 3/p   f_meas/(3/p)
//   7     3.333e-1           --                           4.286e-1        --
//   11    0.000e+0           --                           2.727e-1        --
//   13    2.222e-2        4.440e-2                        2.308e-1      0.1924
//   17    2.424e-2        4.850e-2                        1.765e-1      0.2748
//   19    2.442e-2        4.880e-2                        1.579e-1      0.3091
//   23    1.567e-2        3.110e-2                        1.304e-1      0.2384
//   29    1.533e-2        3.070e-2                        1.034e-1      0.2968
//   31    1.869e-2        3.740e-2                        9.677e-2      0.3865
//   37    9.225e-3        1.840e-2                        8.108e-2      0.2269
//
// research/f-decays.md, 42 exact census points x = 11..199, CITED not recomputed:
//   ln(1/f) = 1.001 + 1.451*(2p/mbar), R^2 = 0.902, and f falls by a factor 170
//   over that range while 3/p falls by a factor of about 16.
//   With mbar ~ Mertens, polylog in x, ln(1/f) grows like p/polylog(p), not like ln p,
//   so L ~ lnD/ln(1/f) ~ p/(p/polylog) = polylog. f-decays.md fits
//   ln L = -1.884 + 2.892*lnln x, R^2 = 0.972.
//   The uniform-residue input f = 3/p is therefore NOT the object f, and the
//   p/ln p shape is the shape of the WRONG input.
//
// === 7. POST-HOC ROBUSTNESS (declared post-hoc, NOT pre-registered) ===
//   A on folds 17,19,23,31,37 only: mean 2.3463  slope -0.5672  SE 0.4534  t -1.2510
//   B on folds 17,19,23,31,37 only: mean 2.2434  slope -0.2433  SE 0.4583  t -0.5309
//   C on folds 17,19,23,31,37 only: mean 1.5849  slope -0.3182  SE 0.3161  t -1.0065
//   so B's significant slope is carried by the two smallest folds, where D is 3 and 15.
//
//   and the reason A is flat where B is not, decomposed exactly:
//   A/B = [ln(pD)/ln D] * [ln(p/3)/ln(p/2)]
//   fold   ln(pD)/lnD   ln(p/3)/ln(p/2)   A/B
//    7      2.7712       0.6763            1.8743
//    11     1.8855       0.7622            1.4370
//    13     1.5229       0.7834            1.1930
//    17     1.3879       0.8105            1.1250
//    19     1.2941       0.8199            1.0610
//    23     1.2441       0.8340            1.0376
//    29     1.2119       0.8484            1.0282
//    31     1.1790       0.8521            1.0046
//    37     1.1601       0.8610            0.9989
//   A/B falls to 1.00 by fold 37, so the correction that flattens A is a
//   SMALL-D TRANSIENT and is spent. Beyond the ladder A and B coincide, and
//   A must inherit B's drift. A's flatness over 7..37 does not extrapolate.
//
// === 8. THE REQUIREMENT AT THE LEVELS THAT DECIDE IT ===
// research/gate-multiplies.md s8, CITED: burn/replenish ~ 2.6 ln^3 p / p on the
// polylog branch, crossing 1 near p ~ 800. So p = 101, the level the map picks,
// is below the level at which ANY L clears the threshold, and the factor quoted
// there is measured where the chain fails for a reason that is not L.
//
// level x   p        mbar=W/D    req lo    req hi    L_A       L_A/Rflat   L(f-decays)  L(f-fit)
//   31        37       32.21       1.947     3.176     8.967     4.201       5.387        5.623
//   97        101      52.22       4.158     6.784     21.517    10.080      12.347       12.013
//   199       211      70.11       7.491     12.222    40.712    19.073      18.828       18.742
//   809       811      108.53      23.004    37.534    127.858   59.899      37.154       33.584
//   1009      1013     115.75      27.811    45.376    155.010   72.619      40.811       36.403
//   10007     10009    204.36      206.455   336.848   1163.300  544.981     93.448       69.835
//
//   L_A/Rflat is what the flat-ratio hypothesis predicts the TRUTH to be.
//   L(f-decays) and L(f-fit) are two forward projections from f-decays.md's two
//   independent fits over 42 exact census points. All three are CITED-COEFFICIENT
//   extrapolations far outside their range and none is a bound.
//
//   crossing levels, where each projection first falls below the requirement:
//    L_A/Rflat vs 0.31 p/lnp      first clears at x = > 20000
//    L(f-decays) vs 0.31 p/lnp    first clears at x = 773
//    L(f-decays) vs 0.19 p/lnp    first clears at x = 2297
//   gate-multiplies.md s8 puts the turnaround near p ~ 800 independently.
//
// === 9. THE CONSTANT THAT REMAINS, STATED EXACTLY ===
// A flat ratio R turns the prediction L_A into a claim about the truth,
// L_true = L_A / R. For that to meet L <= c p/ln p with c in [0.19, 0.31],
// R must be at least (L_A ln p / p) / c. Measured R_A (seven folds) = 2.1346.
//
// level x   p        L_A/(p/lnp)   R needed at c=0.31   R needed at c=0.19   R measured   shortfall
//   31        37       0.8751        2.8229               4.6057               2.1346       1.322 to 2.158
//   97        101      0.9832        3.1716               5.1747               2.1346       1.486 to 2.424
//   199       211      1.0326        3.3311               5.4349               2.1346       1.561 to 2.546
//   1009      1013     1.0590        3.4162               5.5737               2.1346       1.600 to 2.611
//   10007     10009    1.0706        3.4535               5.6346               2.1346       1.618 to 2.640
//
// so a PERFECTLY flat ratio at the measured value still misses the requirement
// by a factor of about 1.6 to 2.7 at every level. The map's "only a constant"
// is a constant that the measurement does not supply.
// ============================================================================
// READINGS
//
// 1. THE PRE-REGISTERED TEST, SCORED, AND IT SPLITS THE MAP'S OWN FORMULA FROM
//    THE GRAPH'S. On the map's literal estimator B = ln D / ln(p/3) the ratio to
//    the exact L GROWS: slope 0.9784 with SE 0.3828 on all nine folds and 0.8880
//    with SE 0.3301 on the pre-registered seven, both above 2 SE. That is
//    KILL 1 as written down in advance. On the graph's own estimator
//    A = ln(pD)/ln(p/2) the slope is 0.5157 with SE 0.4385 (nine) and 0.5292
//    with SE 0.3213 (seven), neither significant, mean ratio 2.1346: SURVIVES.
//    The single correction that separates them is the one the graph forces, the
//    per-step rate 2/p in place of the qualifying fraction 3/p.
//
// 2. AND THE SURVIVAL IS A TRANSIENT, WHICH THE SAME FILE SHOWS. A/B decomposes
//    exactly as [ln(pD)/ln D] * [ln(p/3)/ln(p/2)] and falls 1.8743, 1.4370,
//    1.1930, 1.1250, 1.0610, 1.0376, 1.0282, 1.0046, 0.9989 across folds 7..37.
//    The factor that flattens A is spent by fold 37. Beyond the ladder A and B
//    are the same estimator, so A must inherit B's drift and A's flatness over
//    7..37 does not extrapolate. Read together, readings 1 and 2 are one
//    finding: the ratio is flat only where a small-D correction is still paying
//    for it.
//
// 3. THE GRAPH WITH THE OBJECT'S OWN EDGE MEASURE IS THE ONE THAT IS REALLY
//    FLAT. Estimator C, the same first-moment law fed the measured edge weight
//    f_edge = PAIRS/2D, has slope 0.1353 with SE 0.1721 on the seven, t = 0.7864,
//    mean ratio 1.4965. So the sofic first-moment machinery predicts the exact L
//    to within a flat factor of about 1.5 once it is given the true letter
//    measure. The machinery is validated; the input is what was wrong.
//
// 4. THE INPUT WAS WRONG BY A MEASURED FACTOR OF THREE TO FIVE, AND WIDENING.
//    f measured against the uniform 3/p reads 0.1924, 0.2748, 0.3091, 0.2384,
//    0.2968, 0.3865, 0.2269 at folds 13..37. Over f-decays.md's 42 exact census
//    points f falls by a factor of 170 from x = 11 to x = 199 while 3/p falls by
//    about 16. The uniform-residue f = 3/p is therefore not the object's f, and
//    the p/ln p shape that IMPORT-MAP row 2 derives is the shape of an input the
//    corpus has already measured and refuted.
//
// 5. THE MAP'S OWN ARITHMETIC AT p = 101, CHECKED, AND ONE NUMBER IN IT IS
//    WRONG. The requirement is confirmed: p/ln p = 21.8846, so 0.19 to 0.31 of
//    it is 4.1581 to 6.7842, the map's "4.2 to 6.8". The prediction quoted as
//    28.7 is p/ln(p/3) = 28.7217, that is ln D replaced by p. The true
//    ln D(T_97) = 79.7729, ratio to p of 0.7898, so the correct readings are
//    L_B = 22.6852 and the graph's L_A = 21.5167. The factor over the
//    requirement is 3.172 to 5.175, not the map's 4.234 to 6.907. The map's
//    constant is inflated by using the Chebyshev asymptotic as an equality at a
//    level where ln D / p is still 0.7898.
//
// 6. THE HONEST ANSWER TO "WHAT WOULD REMAIN BETWEEN A FLAT RATIO AND A PROOF",
//    AND IT IS NOT A CONSTANT THAT THE MEASUREMENT SUPPLIES. L_A/(p/ln p) tends
//    to 1 from below, reading 0.8751, 0.9832, 1.0326, 1.0590, 1.0706 at
//    x = 31, 97, 199, 1009, 10007. For a flat ratio R to convert L_A into
//    L <= c p/ln p, R must be at least that figure divided by c: 3.4535 at
//    c = 0.31 and 5.6346 at c = 0.19, at x = 10007. The measured ratio is
//    2.1346. So even granting perfect flatness and granting the whole chain,
//    the requirement is missed by 1.618 to 2.640. "Only a constant" is right in
//    kind and the constant is short by a factor of about two.
//
// 7. AND THE LEVEL THE MAP PRICES AT IS BELOW THE LEVEL THAT DECIDES ANYTHING.
//    gate-multiplies.md section 8, cited, puts burn/replenish at 2.6 ln^3 p / p
//    on the polylog branch, crossing 1 near p ~ 800. At p = 101 no L clears the
//    threshold, so a factor quoted there measures a level where the chain fails
//    for a reason that is not L. Projected forward with f-decays.md's own fitted
//    coefficients, L(f-decays) first falls below 0.31 p/ln p at x = 773 and
//    below 0.19 p/ln p at x = 2297, which is an independent arrival at
//    gate-multiplies' p ~ 800 from the L side.
//
// 8. THE TWO f-DECAYS PROJECTIONS AGREE WITH EACH OTHER AND DISAGREE WITH THE
//    FLAT-RATIO HYPOTHESIS. At x = 97, 199, 1009, 10007 the two independent
//    forward projections read 12.347/12.013, 18.828/18.742, 40.811/36.403 and
//    93.448/69.835, while the flat-ratio hypothesis reads 10.080, 19.073,
//    72.619 and 544.981. They part company decisively above x ~ 1000: the
//    flat-ratio reading is a linear-over-log law and the census readings are
//    polylog. The corpus's own 42 exact points therefore refute the flat ratio
//    asymptotically, and they refute it in the favourable direction, the truth
//    being far SMALLER than p/ln p.
//
// 9. FOLD 11 AND FOLD 29, THE TWO PRE-REGISTERED EXCLUSIONS, BEHAVE AS DECLARED.
//    At fold 11 f_edge is exactly 0, so estimator C returns 1.0000, which is the
//    truth, while A and B return 2.9951 and 2.0843 because neither can see that
//    T_7's gap set contains no 24. At fold 29 every estimator overshoots most:
//    R_A = 3.6004, R_B = 3.5018, R_C = 2.4845. Both anomalies are arithmetic and
//    both were named in advance in the pre-registration.
//
// 10. WHAT THIS FILE DOES NOT SHOW. It proves nothing. Every estimator is a
//    heuristic first moment over a deterministic word, the ratio test has nine
//    points and an exact L that takes four distinct integer values, and every
//    number past fold 37 is an extrapolation of a fitted law far outside its
//    range. No exact L, no D and no PAIRS value is recomputed here; all are
//    cited. Nothing here bounds L, kappa(m) or G2, and nothing here moves the
//    dimension-2 exponent gap.
