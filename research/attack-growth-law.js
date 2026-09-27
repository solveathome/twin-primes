'use strict';
// ATTACK E — THE GROWTH LAW OF G2: what does the truth actually do, and which
// candidate laws can 22 exact terms tell apart?
/* ============================================================================
   attack-growth-law.js  (2026-08-18)

   QUESTION
   Every statement about how loose the proven G2(x#) <<_eps x^{4.26645+eps} is
   depends on a number nobody has measured: the true growth rate of G2. The
   proven bound is priced against a truth exponent of 1 in the loss budget of
   research/sift-limit-attack.md section 7d, and that 1 is an ASSUMPTION carried
   into a table, not a measurement. This script measures it, with model
   selection instead of eye-fitting, and reports what the data cannot decide.

   WHAT IS NEW TODAY, AND WHY THE QUESTION IS NOW ANSWERABLE AT ALL
   Until 2026-08-18 this repo's exact ladder stopped at x = 43, fourteen terms.
   The object is OEIS A144311 under the a(n) = G2 - 1 convention (Carter 2008;
   Alekseyev 2009 a(8)-a(16); Wang 2024 a(17)-a(22)), which carries 22 terms to
   x = 79, and those terms are PROVEN MAXIMAL rather than best-found: the
   branch-and-bound's pruning test is an admissible union bound on the current
   residual, established in
   research/history/staging/attack-beta2-05-covering-pruning-bound.md and
   summarised at research/sift-limit-attack.md section 7. So the ladder grew by
   eight terms and by a factor 1.84 in x on one day, and eight new points is
   exactly the size of increment that kills a law fitted to the old range.

   METHOD
   1. Fit ten families by log-space least squares, all of them log-linear in the
      regressors (1, ln x, lnln x, lnlnln x), so every fit is exact and no
      optimiser can fail. Report RSS, AIC, AICc, residual diagnostics.
   2. Genuine holdouts, both of them retrospective replays of a real state of
      knowledge: fit x <= 43 (what the repo had on the morning of 2026-08-18)
      and predict 47..79; fit x <= 61 and predict 67..79.
   3. Leave-one-out, for predictive RSS and for parameter bands.
   4. THE CONTROL. Run the identical estimator on h(x#), the one-class
      Jacobsthal at primorials, OEIS A048670, where the conjectural truth is
      x(log x)^{2+o(1)} so the exponent is 1 + o(1) and Iwaniec 1978 proves it
      is at most 2. Matched window first (the same eighteen x-values, 11..79),
      then the full 58-term ladder. Whatever the estimator gets wrong there it
      gets wrong here. This is house practice, research/G2-STATE.md section 3b.

   HONEST DOUBT, RECORDED BEFORE THE NUMBERS
   research/exponent-control.md already established that a clean power-law fit
   with white residuals carries no evidence about an asymptotic exponent at
   these sizes: on 58 control terms the pure power law beats the family
   CONTAINING the truth by 47 AIC units and its exponent is wrong by 0.28. So
   the prior expectation is that the winner of any AIC race here is
   uninformative, and the useful output is the SEPARATION between families
   rather than the ranking. "These data cannot distinguish the models" is an
   allowed and probably correct answer, and the u_sup work
   (research/G2-STATE.md section 8) is the precedent: four rising models were
   statistically indistinguishable and agreed on the verdict anyway.

   PRIOR ART
   No published asymptotic growth law for A144311 exists. That negative was run
   in the convention that OWNS the object, A144311's own wording, and is tabled
   at research/SEARCH-CONVENTIONS.md section 3; it is not re-run here. The
   one-class conjecture x(log x)^{2+o(1)} is Maier and Pomerance's; the
   dimension-2 accounting that yields x(log x)^{3+o(1)} is this repo's, at
   research/two-class-lower-bounds.md section 4b, INFERRED. Rankin, Erdos,
   Pintz and Ford-Green-Konyagin-Maynard-Tao own the one-class lower bounds.
   Nothing here re-derives any of that; this script only measures.
   ========================================================================= */

// ---------------------------------------------------------------------------
// DATA
//
// G2 ladder, 22 terms. x <= 43 are this repo's own enumerations
// (research/exact-g2-ladder.js, each of 41# and 43# measured twice on disjoint
// natal masks). x = 47..79 are OEIS A144311 a(15)-a(22) read through
// G2 = a(n) + 1 and are NOT ours; they are kept in a flagged list so no fit can
// silently mix provenance without saying so.
// ---------------------------------------------------------------------------
const X  = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79];
const G2 = [2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348, 528, 546, 618, 708, 870, 966, 1080, 1284, 1398, 1530, 1710];
const OURS_UPTO = 43;                          // provenance boundary
const A144311 = [1, 5, 11, 29, 41, 65, 107, 149, 203, 257, 347, 527, 545, 617,
                 707, 869, 965, 1079, 1283, 1397, 1529, 1709];

// The control. h(p_n#), one omitted class per prime, OEIS A048670, 58 terms,
// p_58 = 271. Copied from research/exponent-control.js, where it is the same
// array; the two are checked against each other in section A below.
const H = [2, 4, 6, 10, 14, 22, 26, 34, 40, 46, 58, 66, 74, 90, 100, 106, 118, 132, 152, 174, 190,
  200, 216, 234, 258, 264, 282, 300, 312, 330, 354, 378, 388, 414, 432, 450, 476, 492, 510, 538,
  550, 574, 600, 616, 642, 660, 686, 718, 742, 762, 798, 810, 834, 858, 876, 908, 926, 954];

function sievePrimes(n) { const s = new Uint8Array(n + 1), o = []; for (let i = 2; i <= n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } } return o; }
const P = sievePrimes(2000);                    // p_1 ... ; P[57] = 271
const BETA2 = 4.26645028414864191641;
const F = (v, d = 3) => (Number.isFinite(v) ? v.toFixed(d) : '  n/a');
const pad = (s, n) => String(s).padStart(n);
const padr = (s, n) => String(s).padEnd(n);

// ---------------------------------------------------------------------------
// THE FIT ENGINE
//
// Every family below is LOG-LINEAR: ln y = offset(x) + sum_j b_j * phi_j(x),
// with phi drawn from {1, ln x, lnln x, lnlnln x}. So a fit is one normal-
// equation solve and there is no optimiser to fail, no starting value to
// choose, and no local minimum to land in. Frozen exponents move into offset(),
// which is why "c x ln^2 x" costs one parameter and "c x ln^a x" costs two.
//
// Least squares in LOG space, unweighted, which is the house estimator
// (research/exponent-control.js fit2). It is the right one here because every
// family is multiplicative and the question is about a ratio, not a difference.
// ---------------------------------------------------------------------------
const L1 = x => Math.log(x);
const L2 = x => Math.log(Math.log(x));
const L3 = x => Math.log(Math.log(Math.log(x)));

// Solve the normal equations by Gaussian elimination with partial pivoting.
function solve(A, b) {
  const n = b.length, M = A.map((r, i) => [...r, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    [M[c], M[p]] = [M[p], M[c]];
    if (Math.abs(M[c][c]) < 1e-14) return null;
    for (let r = 0; r < n; r++) { if (r === c) continue; const f = M[r][c] / M[c][c]; for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k]; }
  }
  return M.map((r, i) => r[n] / r[i][i] * 1).map((_, i) => M[i][n] / M[i][i]);
}

// model = { name, form, phi: [fns], offset: fn, label: fn(beta)->string }
function fit(model, xs, ys) {
  const n = xs.length, k = model.phi.length;
  const Phi = xs.map(x => model.phi.map(f => f(x)));
  const z = xs.map((x, i) => Math.log(ys[i]) - model.offset(x));
  const A = Array.from({ length: k }, (_, a) => Array.from({ length: k }, (_, b) =>
    Phi.reduce((s, r) => s + r[a] * r[b], 0)));
  const rhs = Array.from({ length: k }, (_, a) => Phi.reduce((s, r, i) => s + r[a] * z[i], 0));
  const beta = solve(A, rhs);
  if (!beta) return null;
  const pred = x => model.offset(x) + model.phi.reduce((s, f, j) => s + beta[j] * f(x), 0);
  const res = xs.map((x, i) => Math.log(ys[i]) - pred(x));
  const rss = res.reduce((s, r) => s + r * r, 0);
  let runs = 1, prev = null, num = 0, den = 0;
  const m = res.reduce((s, r) => s + r, 0) / n;
  for (let i = 0; i < n; i++) { const q = res[i] >= 0 ? 1 : -1; if (prev !== null && q !== prev) runs++; prev = q; den += (res[i] - m) ** 2; if (i) num += (res[i] - m) * (res[i - 1] - m); }
  const aic = n * Math.log(rss / n) + 2 * k;
  return {
    model, beta, n, k, rss, rms: Math.sqrt(rss / n), max: Math.max(...res.map(Math.abs)),
    aic, aicc: aic + (n - k - 1 > 0 ? 2 * k * (k + 1) / (n - k - 1) : NaN),
    runs, expRuns: (n + 1) / 2, ac1: den ? num / den : NaN, res, pred,
    predict: x => Math.exp(pred(x)),
    // log_x of the prediction, computed in log space so x = 10^200 does not
    // overflow a double. The whole point of the extrapolation table is the far
    // field, and exponentiating first throws it away.
    logx: x => pred(x) / Math.log(x),
  };
}

// Leave-one-out: predictive RSS, and the band the free exponents move over.
function loo(model, xs, ys) {
  const rs = [], bands = model.phi.map(() => [Infinity, -Infinity]);
  for (let i = 0; i < xs.length; i++) {
    const sx = xs.filter((_, j) => j !== i), sy = ys.filter((_, j) => j !== i);
    const f = fit(model, sx, sy); if (!f) return null;
    rs.push(Math.log(ys[i]) - f.pred(xs[i]));
    f.beta.forEach((b, j) => { bands[j][0] = Math.min(bands[j][0], b); bands[j][1] = Math.max(bands[j][1], b); });
  }
  return { rss: rs.reduce((s, r) => s + r * r, 0), rms: Math.sqrt(rs.reduce((s, r) => s + r * r, 0) / rs.length), bands, res: rs };
}

// ---------------------------------------------------------------------------
// THE FAMILIES. Named so the report can talk about them.
// ---------------------------------------------------------------------------
const MODELS = [
  { key: 'PW',     form: 'c x^a',                     phi: [() => 1, L1],         offset: () => 0,
    label: b => `a = ${F(b[1])}` },
  { key: 'PWL',    form: 'c x^a (ln x)^b',            phi: [() => 1, L1, L2],     offset: () => 0,
    label: b => `a = ${F(b[1])}, b = ${F(b[2])}` },
  { key: 'MP2',    form: 'c x ln^2 x',                phi: [() => 1],             offset: x => L1(x) + 2 * L2(x),
    label: b => `c = ${F(Math.exp(b[0]))}` },
  { key: 'MP3',    form: 'c x ln^3 x',                phi: [() => 1],             offset: x => L1(x) + 3 * L2(x),
    label: b => `c = ${F(Math.exp(b[0]), 4)}` },
  { key: 'XLA',    form: 'c x ln^a x',                phi: [() => 1, L2],         offset: x => L1(x),
    label: b => `a = ${F(b[1])}` },
  { key: 'MP2LL',  form: 'c x ln^2 x lnln x',         phi: [() => 1],             offset: x => L1(x) + 2 * L2(x) + L3(x),
    label: b => `c = ${F(Math.exp(b[0]))}` },
  { key: 'MP2LLb', form: 'c x ln^2 x (lnln x)^b',     phi: [() => 1, L3],         offset: x => L1(x) + 2 * L2(x),
    label: b => `b = ${F(b[1])}` },
  { key: 'XLALLb', form: 'c x ln^a x (lnln x)^b',     phi: [() => 1, L2, L3],     offset: x => L1(x),
    label: b => `a = ${F(b[1])}, b = ${F(b[2])}` },
  { key: 'SQ',     form: 'c x^2  (the zone target)',  phi: [() => 1],             offset: x => 2 * L1(x),
    label: b => `c = ${F(Math.exp(b[0]), 4)}` },
  { key: 'X',      form: 'c x    (exponent 1 frozen)', phi: [() => 1],            offset: x => L1(x),
    label: b => `c = ${F(Math.exp(b[0]), 2)}` },
  // Not laws. Smoothness references, used only to locate the ladder's own
  // irreducible scatter: a quadratic and a cubic in ln x nest every family
  // above and are free to bend any way the data asks. If a one-parameter law
  // already sits at the cubic's RSS, the data is exhausted and no further
  // family can be separated on it.
  { key: 'Q2',     form: '[ref] quadratic in ln x',    phi: [() => 1, L1, x => L1(x) ** 2], offset: () => 0,
    label: () => 'smoothness reference' },
  { key: 'Q3',     form: '[ref] cubic in ln x',        phi: [() => 1, L1, x => L1(x) ** 2, x => L1(x) ** 3], offset: () => 0,
    label: () => 'smoothness reference' },
];
const M = Object.fromEntries(MODELS.map(m => [m.key, m]));

const idxFrom = lo => X.map((x, i) => [x, i]).filter(([x]) => x >= lo).map(([, i]) => i);
const slice = (arr, lo, hi) => X.map((x, i) => [x, arr[i]]).filter(([x]) => x >= lo && x <= hi);
const win = (xs, ys, lo, hi) => { const o = { x: [], y: [] }; xs.forEach((x, i) => { if (x >= lo && x <= hi) { o.x.push(x); o.y.push(ys[i]); } }); return o; };

/* =====================  A. CUSTODY  ======================================= */
console.log('='.repeat(76));
console.log('A. CUSTODY. Every input reproduced against its home in the corpus.');
console.log('='.repeat(76));
{
  const conv = X.every((x, i) => G2[i] === A144311[i] + 1);
  console.log(`  G2(x#) = A144311(n) + 1 at all 22 terms: ${conv ? 'YES' : 'NO'}`);
  console.log(`  22 terms, x = ${X[0]}..${X[21]}, G2 = ${G2[0]}..${G2[21]}`);
  console.log(`  provenance split: ours x <= ${OURS_UPTO} (${X.filter(x => x <= OURS_UPTO).length} terms),`
    + ` A144311 only x > ${OURS_UPTO} (${X.filter(x => x > OURS_UPTO).length} terms)`);
  console.log(`  control A048670 has ${H.length} terms, p_${H.length} = ${P[H.length - 1]}`);
  console.log(`  A048670 <= G2 at all 22 shared terms (the PROVEN G2 >= g): `
    + `${X.every((x, i) => H[i] <= G2[i]) ? 'YES' : 'NO'}`);
  // the three numbers the brief carried in, recomputed
  const s = (lo, hi) => { const w = win(X, G2, lo, hi); return fit(M.PW, w.x, w.y).beta[1]; };
  console.log(`\n  the raw log-log exponent, three windows quoted this morning:`);
  console.log(`    x <=  43, from x = 2   n = ${win(X, G2, 2, 43).x.length}   a = ${F(s(2, 43))}`);
  console.log(`    x <=  79, from x = 11  n = ${win(X, G2, 11, 79).x.length}   a = ${F(s(11, 79))}`);
  console.log(`    x = 47..79 alone       n = ${win(X, G2, 47, 79).x.length}   a = ${F(s(47, 79))}`);
  console.log(`\n  the two normalisations, head and tail:`);
  for (const x of [37, 43, 53, 61, 71, 79]) {
    const i = X.indexOf(x);
    console.log(`    x = ${pad(x, 2)}  G2 = ${pad(G2[i], 4)}  G2/x^2 = ${F(G2[i] / x / x)}`
      + `   G2/ln^3 x = ${F(G2[i] / Math.log(x) ** 3, 1)}   log_x G2 = ${F(Math.log(G2[i]) / Math.log(x))}`);
  }
  // The brief that opened this attack quoted a worst miss of -14.0% at x = 73
  // for c x ln^2 x fitted on x <= 43. That is a different window from the house
  // one and the two must not be conflated, so both are printed.
  console.log('\n  RECONCILIATION of the -14.0% worst-miss figure the brief carried in. The');
  console.log('  c x ln^2 x miss on x = 47..79 depends on the fit window AND on which');
  console.log('  least-squares is meant, and the two estimators disagree by nine points.');
  console.log('  window     estimator        c        x=47   53    59    61    67    71    73    79    worst  monotone');
  const te = win(X, G2, 47, 79);
  const basis = x => x * Math.log(x) ** 2;
  const report = (tag, est, c) => {
    const e = te.x.map((x, i) => 100 * (c * basis(x) / te.y[i] - 1));
    let mono = true; for (let i = 1; i < e.length; i++) if (e[i] > e[i - 1]) mono = false;
    console.log('  ' + padr(tag, 11) + padr(est, 16) + pad(F(c, 4), 8)
      + e.map(v => pad((v >= 0 ? '+' : '') + F(v, 1), 6)).join('')
      + pad(F(e.reduce((a, b) => Math.abs(b) > Math.abs(a) ? b : a, 0), 1), 8) + '   ' + (mono ? 'yes' : 'NO'));
  };
  for (const lo of [2, 5, 11]) {
    const tr = win(X, G2, lo, 43);
    report(`${lo}..43`, 'log-space LS', Math.exp(fit(M.MP2, tr.x, tr.y).beta[0]));
  }
  {
    const tr = win(X, G2, 2, 43);
    const c = tr.x.reduce((s, x, i) => s + tr.y[i] * basis(x), 0) / tr.x.reduce((s, x) => s + basis(x) ** 2, 0);
    report('2..43', 'linear-space LS', c);
  }
  console.log('    THE -14.0% IS THE LINEAR-SPACE FIT, and it is nearly window-free: the');
  console.log('    same c = 0.9788 comes out of x = 2..43, 5..43, 7..43 and 11..43 alike,');
  console.log('    because a linear-space fit on a growing sequence is owned by its largest');
  console.log('    terms. The house log-space estimator is window-sensitive and reads');
  console.log('    -12.4% to -23.0% over the same four windows. Both are defensible; they');
  console.log('    are not the same measurement and must not be quoted as one.');
  console.log('    And in NO version is the miss monotone: x = 59 and x = 79 both step back.');
}

/* =====================  B. THE LOCAL EXPONENT  ============================ */
console.log('\n' + '='.repeat(76));
console.log('B. IS THE APPARENT EXPONENT FALLING? Local slopes and rolling fits.');
console.log('='.repeat(76));
{
  console.log('  two-point local exponent ln(G2_{i+1}/G2_i) / ln(x_{i+1}/x_i):');
  let s = '   ';
  for (let i = 4; i < X.length - 1; i++) {
    s += `${X[i]}->${X[i + 1]}:${F(Math.log(G2[i + 1] / G2[i]) / Math.log(X[i + 1] / X[i]), 2)} `;
    if ((i - 4) % 5 === 4) { console.log(s); s = '   '; }
  }
  if (s.trim()) console.log(s);
  console.log('\n  rolling 8-term power-law fit (window start x -> exponent a):');
  s = '   ';
  for (let i = 0; i + 7 < X.length; i++) {
    const w = { x: X.slice(i, i + 8), y: G2.slice(i, i + 8) };
    s += `[${X[i]},${X[i + 7]}]=${F(fit(M.PW, w.x, w.y).beta[1], 2)} `;
    if (i % 4 === 3) { console.log(s); s = '   '; }
  }
  if (s.trim()) console.log(s);
  console.log('\n  nested fits, all ending at x = 79, start moving right:');
  console.log('    window            n    a (c x^a)   a (c x ln^a x)   c (c x ln^2 x)');
  for (const lo of [2, 5, 11, 17, 23, 31, 41, 53]) {
    const w = win(X, G2, lo, 79);
    if (w.x.length < 4) continue;
    console.log(`    [${lo},79]`.padEnd(20) + pad(w.x.length, 2)
      + `    ${F(fit(M.PW, w.x, w.y).beta[1])}        ${F(fit(M.XLA, w.x, w.y).beta[1])}`
      + `           ${F(Math.exp(fit(M.MP2, w.x, w.y).beta[0]))}`);
  }
  console.log('\n  nested fits, all STARTING at x = 11, end moving right:');
  console.log('    window            n    a (c x^a)   a (c x ln^a x)   c (c x ln^2 x)');
  for (const hi of [23, 31, 37, 43, 53, 61, 71, 79]) {
    const w = win(X, G2, 11, hi);
    console.log(`    [11,${hi}]`.padEnd(20) + pad(w.x.length, 2)
      + `    ${F(fit(M.PW, w.x, w.y).beta[1])}        ${F(fit(M.XLA, w.x, w.y).beta[1])}`
      + `           ${F(Math.exp(fit(M.MP2, w.x, w.y).beta[0]))}`);
  }
}

/* =====================  C. THE DEGENERATE FAMILY  ========================= */
console.log('\n' + '='.repeat(76));
console.log('C. TWO CANDIDATE FAMILIES ARE NOT FAMILIES. Checked before fitting.');
console.log('='.repeat(76));
{
  console.log('  (i) c x ln^2 x (ln x)^{b/lnln x}  is EXACTLY  (c e^b) x ln^2 x.');
  console.log('      (ln x)^{b/lnln x} = exp( (b/lnln x) * ln(ln x) ) = exp(b), for every x.');
  let s = '      numerically, (ln x)^{b/lnln x} at b = 1, e = 2.718281828: ';
  for (const x of [11, 29, 79, 1e6]) s += `${F(Math.pow(Math.log(x), 1 / Math.log(Math.log(x))), 9)} `;
  console.log(s);
  console.log('      So b is not identifiable: it is absorbed into c, at ANY sample size,');
  console.log('      exactly, not merely to within the noise. It is the one-parameter');
  console.log('      family MP2 wearing two parameters. Dropped, and not fitted below.');
  console.log('\n  (ii) any factor carrying lnlnln x LINEARLY (the Rankin / FGKMT shape');
  console.log('       x ln^2 x lnlnln x / lnln x) is unusable on this range, because');
  console.log('       lnlnln x CHANGES SIGN inside it:');
  let t = '       ';
  for (const x of [11, 13, 17, 23, 43, 79]) t += `x=${x}: ${F(L3(x), 4)}   `;
  console.log(t);
  console.log(`       zero at x = exp(e) = ${F(Math.exp(Math.E), 3)}, i.e. between x = 13 and x = 17.`);
  console.log('       A regressor that crosses zero one third of the way through a range');
  console.log('       of 18 points carries no usable leverage, and ln(lnlnln x) does not');
  console.log('       exist for x <= 13. The (lnln x)^b form MP2LLb below is the same');
  console.log('       correction written so that it can be fitted at all.');
  // collinearity of the two live regressors
  const idx = idxFrom(11);
  const a = idx.map(i => L1(X[i])), b = idx.map(i => L2(X[i])), c = idx.map(i => L3(X[i]));
  const corr = (u, v) => { const n = u.length, mu = u.reduce((s, t) => s + t) / n, mv = v.reduce((s, t) => s + t) / n;
    let su = 0, sv = 0, suv = 0; for (let i = 0; i < n; i++) { su += (u[i] - mu) ** 2; sv += (v[i] - mv) ** 2; suv += (u[i] - mu) * (v[i] - mv); } return suv / Math.sqrt(su * sv); };
  console.log(`\n  (iii) the two regressors that ARE live are almost the same vector on`);
  console.log(`        x = 11..79: corr(ln x, lnln x) = ${F(corr(a, b), 5)},`);
  console.log(`        corr(ln x, lnlnln x) = ${F(corr(a, c), 5)}, corr(lnln x, lnlnln x) = ${F(corr(b, c), 5)}.`);
  console.log('        That is the whole difficulty of this problem in one number: over');
  console.log('        two decades of x, "a power of x" and "a power of ln x" are the');
  console.log('        same shape, and only the extrapolation tells them apart.');
}

/* =====================  D. THE MODEL RACE  ================================ */
function race(title, xs, ys, keys, note) {
  console.log(`\n  ${title}   (n = ${xs.length}, x = ${xs[0]}..${xs[xs.length - 1]})`);
  if (note) console.log(`  ${note}`);
  console.log('  model    form                          k     RSS      rms   maxres   AIC    dAICc  runs/exp   ac1   fitted');
  const fits = keys.map(k => fit(M[k], xs, ys)).filter(Boolean);
  const best = Math.min(...fits.map(f => f.aicc));
  for (const f of fits) {
    console.log('  ' + padr(f.model.key, 8) + padr(f.model.form, 30)
      + pad(f.k, 2) + pad(F(f.rss, 5), 10) + pad(F(f.rms, 4), 9) + pad(F(f.max, 3), 8)
      + pad(F(f.aic, 1), 8) + pad(F(f.aicc - best, 1), 8)
      + pad(`${f.runs}/${F(f.expRuns, 1)}`, 10) + pad(F(f.ac1, 2), 7) + '   ' + f.model.label(f.beta));
  }
  return fits;
}
console.log('\n' + '='.repeat(76));
console.log('D. THE MODEL RACE. Log-space least squares, AICc-ranked.');
console.log('='.repeat(76));
const KEYS = ['PW', 'PWL', 'MP2', 'MP3', 'XLA', 'MP2LL', 'MP2LLb', 'XLALLb', 'SQ', 'X', 'Q2', 'Q3'];
// Q2 and Q3 are smoothness references, not candidate laws: a polynomial in ln x
// with a negative leading coefficient is a fine local description and a
// meaningless extrapolation. They enter the race, to locate the noise floor,
// and are excluded everywhere the far field or a holdout is read.
const LAWS = KEYS.filter(k => k !== 'Q2' && k !== 'Q3');
const w11 = win(X, G2, 11, 79), w5 = win(X, G2, 5, 79), w2 = win(X, G2, 2, 79);
const fits11 = race('D1. PRIMARY WINDOW x = 11..79', w11.x, w11.y, KEYS,
  'house window: below x = 11 the ladder is 2,6,12,30 and lnln 2 < 0.');
race('D2. FROM x = 5', w5.x, w5.y, KEYS);
race('D3. ALL 22 TERMS, from x = 2', w2.x, w2.y, ['PW', 'PWL', 'MP2', 'MP3', 'XLA', 'SQ', 'X'],
  'lnlnln 2 and lnlnln 3 are complex, so the (lnln x)^b families cannot be run here.');
race('D4. THIS MORNING\'S DATA, x = 11..43', win(X, G2, 11, 43).x, win(X, G2, 11, 43).y, KEYS);
race('D5. THE EIGHT NEW TERMS ALONE, x = 47..79', win(X, G2, 47, 79).x, win(X, G2, 47, 79).y,
  ['PW', 'MP2', 'MP3', 'XLA', 'SQ', 'X'], 'eight points, so read the exponents, not the ranking.');

/* =====================  D6. THE NOISE FLOOR  ============================== */
console.log('\n' + '='.repeat(76));
console.log('D6. THE LADDER\'S OWN SCATTER: how much fit is left to buy?');
console.log('='.repeat(76));
{
  const q3 = fit(M.Q3, w11.x, w11.y), q2 = fit(M.Q2, w11.x, w11.y);
  const laws = LAWS.map(k => fit(M[k], w11.x, w11.y));
  const best1 = laws.filter(f => f.k === 1).sort((a, b) => a.rms - b.rms)[0];
  const best2 = laws.filter(f => f.k === 2).sort((a, b) => a.rms - b.rms)[0];
  console.log(`  A cubic in ln x has four free parameters and can bend any way the data`);
  console.log(`  asks. On x = 11..79 it reaches rms ${F(q3.rms, 4)} in log space; the quadratic,`);
  console.log(`  with three, reaches ${F(q2.rms, 4)}. Against that:`);
  console.log(`    best ONE-parameter law    ${padr(best1.model.form, 26)} rms ${F(best1.rms, 4)}`
    + `   ${F(best1.rms / q3.rms, 3)}x the cubic`);
  console.log(`    best TWO-parameter law    ${padr(best2.model.form, 26)} rms ${F(best2.rms, 4)}`
    + `   ${F(best2.rms / q3.rms, 3)}x the cubic`);
  console.log('  A single free constant, with the whole shape frozen in advance, gets');
  console.log(`  within ${F(100 * (best1.rms / q3.rms - 1), 1)}% of what four free parameters can do.`);
  console.log('\n  So essentially all of the residual is the ladder\'s own jitter, not model');
  console.log('  error. The jitter is visible directly in the two-point exponents, which');
  console.log('  run from 0.33 (37 -> 41, G2 rises 528 -> 546) to 4.49 (29 -> 31):');
  const steps = [];
  for (let i = 4; i < X.length - 1; i++) steps.push(Math.log(G2[i + 1] / G2[i]) / Math.log(X[i + 1] / X[i]));
  const mu = steps.reduce((s, v) => s + v, 0) / steps.length;
  const sd = Math.sqrt(steps.reduce((s, v) => s + (v - mu) ** 2, 0) / (steps.length - 1));
  const i11 = X.indexOf(11), i79 = X.length - 1;
  const wmean = Math.log(G2[i79] / G2[i11]) / Math.log(X[i79] / X[i11]);
  console.log(`    17 local exponents on x = 11..79: unweighted mean ${F(mu)}, sd ${F(sd)},`);
  console.log(`    min ${F(Math.min(...steps), 2)}, max ${F(Math.max(...steps), 2)}. The unweighted mean is NOT the exponent --`);
  console.log(`    weighting each step by its own d ln x gives the endpoint slope ${F(wmean)},`);
  console.log(`    against the least-squares 1.818. Quote the weighted one.`);
  console.log(`    sd/sqrt(17) = ${F(sd / Math.sqrt(17), 3)} is the standard error the ladder supports`);
  console.log('    on a single exponent BEFORE any model bias is added, and the whole');
  console.log('    difference between the candidate laws is smaller than it.');
}

/* =====================  D7. WHAT THE SECOND CLASS COSTS  ================== */
console.log('\n' + '='.repeat(76));
console.log('D7. THE RATIO G2/h AT MATCHED x. The one estimator whose bias cancels.');
console.log('='.repeat(76));
{
  console.log('  G2 and h are the same construction at sieve dimension 2 and 1, measured');
  console.log('  on the SAME primes, so the ratio kills every bias the two share: window');
  console.log('  length, range, finite-size curvature, the estimator\'s own upward pull.');
  console.log('  What is left is the price of the second residue class, and the corpus');
  console.log('  claims that price is ONE LOGARITHM (G2-STATE section 3d, three routes).');
  console.log('  If h = x ln^2 x and the ratio is ln x, then G2 = x ln^3 x.');
  const idx = idxFrom(11);
  const rx = idx.map(i => X[i]), ry = idx.map(i => G2[i] / H[i]);
  console.log('\n  x        11    17    23    31    41    47    59    71    79');
  let s = '  G2/h  ';
  for (const x of [11, 17, 23, 31, 41, 47, 59, 71, 79]) { const i = X.indexOf(x); s += pad(F(G2[i] / H[i], 2), 6); }
  console.log(s);
  const rl = fit(M.XLA, rx, ry.map((v, i) => v * rx[i]));   // ratio ~ c ln^a x  <=>  x*ratio ~ c x ln^a x
  const rp = fit(M.PW, rx, ry);
  console.log(`\n  ratio ~ c (ln x)^a  over x = 11..79:  a = ${F(rl.beta[1])},  rms ${F(rl.rms, 4)}`);
  console.log(`  ratio ~ c x^a       over x = 11..79:  a = ${F(rp.beta[1])},  rms ${F(rp.rms, 4)}`);
  console.log(`  AICc: log form ${F(rl.aicc, 1)}, power form ${F(rp.aicc, 1)}, difference ${F(rp.aicc - rl.aicc, 1)}`);
  console.log('\n  the same fit on shrinking end-windows, to see whether a is settling:');
  for (const lo of [11, 23, 31, 41, 53]) {
    const w = { x: [], y: [] }; X.forEach((x, i) => { if (x >= lo) { w.x.push(x); w.y.push(G2[i] / H[i] * x); } });
    console.log(`    [${lo},79]  n = ${pad(w.x.length, 2)}   a = ${F(fit(M.XLA, w.x, w.y).beta[1])}`);
  }
  console.log('\n  AGAINST THE CERTIFICATE LADDER, which measures the same ratio on the');
  console.log('  greedy construction over x = 37..5003, a range 60 times longer:');
  console.log('    two-class-lower-bounds.md section 5d reading 2 (the ladder REPAIRED on');
  console.log('    2026-08-18): the power of ln x reads 1.08 on the whole ladder, 1.14 on');
  console.log('    the top twelve, 1.15 on the top eight, 1.21 on the top five, and');
  console.log('    (Y2/Y1)/ln x sits at about 2.1, reaching 2.1877 at x = 5003.');
  console.log('    THE TWO INSTRUMENTS MEET AT THEIR JUNCTION. Their ladder starts at');
  console.log('    x = 37 and reads 1.08; ours ends at x = 79 and reads 1.095 on [31,79]');
  console.log('    and 1.104 on [41,79]. Exact terms and a certified greedy, no shared');
  console.log('    code, agree to a hundredth where their ranges abut, and both say ONE.');
  console.log('\n    ** A CORPUS DEFECT, FOUND HERE AND NOT FIXED HERE. G2-STATE.md section');
  console.log('    3d still reports this same quantity as "1.39 on the whole ladder, 1.17');
  console.log('    from x = 229, 1.09 from x = 773, and 0.88 on the top five points",');
  console.log('    which is the PRE-REPAIR ladder: different values and the opposite');
  console.log('    DIRECTION of drift from the numbers now in the home document. Its');
  console.log('    plateau figure 2.18 survives the repair and its exponent list does');
  console.log('    not. Do not quote the falling version. **');
}

/* =====================  E. PAIRWISE DISTINGUISHABILITY  =================== */
console.log('\n' + '='.repeat(76));
console.log('E. WHAT IS DISTINGUISHABLE AT 22 POINTS, AND WHAT IS NOT.');
console.log('='.repeat(76));
{
  const best = Math.min(...fits11.map(f => f.aicc));
  console.log('  dAICc from the best, on x = 11..79. Burnham-Anderson: <2 indistinguishable,');
  console.log('  4-7 considerably less support, >10 essentially none.');
  console.log('  model    dAICc   verdict                       ratio to best at x = 10^6 / 10^50');
  const bestFit = fits11.find(f => f.aicc === best);
  for (const f of fits11.filter(f => LAWS.includes(f.model.key)).sort((a, b) => a.aicc - b.aicc)) {
    const d = f.aicc - best;
    const v = d < 2 ? 'INDISTINGUISHABLE' : d < 7 ? 'weaker, not excluded' : d < 10 ? 'much weaker' : 'excluded by the data';
    const r6 = f.predict(1e6) / bestFit.predict(1e6), r50 = f.predict(1e50) / bestFit.predict(1e50);
    console.log('  ' + padr(f.model.key, 8) + pad(F(d, 1), 7) + '   ' + padr(v, 29)
      + pad(F(r6, 3), 10) + ' / ' + (Number.isFinite(r50) ? r50.toExponential(2) : 'n/a'));
  }
  console.log('\n  The pair that matters, and it is the repo\'s standing warning made exact:');
  const pw = fits11.find(f => f.model.key === 'PW'), xla = fits11.find(f => f.model.key === 'XLA');
  console.log(`    PW  c x^a          a = ${F(pw.beta[1])}   AICc ${F(pw.aicc, 2)}`);
  console.log(`    XLA c x ln^a x     a = ${F(xla.beta[1])}   AICc ${F(xla.aicc, 2)}`);
  console.log(`    separated by ${F(Math.abs(pw.aicc - xla.aicc), 2)} AICc units, and at x = 10^6 they differ by a`);
  console.log(`    factor ${F(pw.predict(1e6) / xla.predict(1e6), 2)}; at x = 10^50 by ${(pw.predict(1e50) / xla.predict(1e50)).toExponential(2)}.`);
  console.log(`    In G2-STATE section 3b the same collision on h2 read 0.1 AIC units and a`);
  console.log(`    factor x^0.85; here it is ${F(Math.abs(pw.aicc - xla.aicc), 2)} units and x^${F(pw.beta[1] - 1, 2)} against a log power.`);
  console.log('\n  The OTHER pair, and this one the data genuinely cannot touch:');
  console.log('    MP2LL = c x ln^2 x lnln x and MP3 = c x ln^3 x differ by the factor');
  console.log('    ln x / lnln x, which over x = 11..79 moves only from '
    + F(Math.log(11) / Math.log(Math.log(11)), 2) + ' to ' + F(Math.log(79) / Math.log(Math.log(79)), 2) + ',');
  console.log('    a 9% change in shape across the entire ladder. Two laws that differ by');
  console.log('    9% of shape over the whole range of the data cannot be separated by it,');
  console.log('    at any sample size the range allows, and their 6.8 AICc units are');
  console.log('    measuring the constant, not the shape. In the limit they differ by');
  console.log('    ln x / lnln x -> infinity. This is the sharpest form of the answer:');
  console.log('    the ladder pins the law over [11,79] and says nothing about the limit.');
}

/* =====================  F. THE HOLDOUTS  ================================== */
console.log('\n' + '='.repeat(76));
console.log('F. GENUINE HOLDOUTS. Fit the past, predict the terms that arrived today.');
console.log('='.repeat(76));
function holdout(lo, hiFit, keys) {
  const tr = win(X, G2, lo, hiFit), te = win(X, G2, hiFit + 1, 79);
  console.log(`\n  F. train x = ${lo}..${hiFit} (n = ${tr.x.length}), test x = ${te.x[0]}..${te.x[te.x.length - 1]} (n = ${te.x.length})`);
  console.log('  model    fitted            ' + te.x.map(x => pad('x=' + x, 8)).join('') + '     rmsPE   worst   signs');
  const out = [];
  for (const k of keys) {
    const f = fit(M[k], tr.x, tr.y); if (!f) continue;
    const errs = te.x.map((x, i) => 100 * (f.predict(x) / te.y[i] - 1));
    const rms = Math.sqrt(errs.reduce((s, e) => s + e * e, 0) / errs.length);
    const worst = errs.reduce((a, b) => Math.abs(b) > Math.abs(a) ? b : a, 0);
    const signs = errs.every(e => e < 0) ? 'all under' : errs.every(e => e > 0) ? 'all over' : 'mixed';
    console.log('  ' + padr(k, 8) + padr(f.model.label(f.beta), 18)
      + errs.map(e => pad((e >= 0 ? '+' : '') + F(e, 1), 8)).join('')
      + pad(F(rms, 1), 10) + pad((worst >= 0 ? '+' : '') + F(worst, 1), 8) + '   ' + signs);
    out.push({ k, rms, worst, signs, errs });
  }
  return out;
}
const HK = ['PW', 'PWL', 'MP2', 'MP3', 'XLA', 'MP2LL', 'MP2LLb', 'XLALLb', 'SQ', 'X'];
const h43 = holdout(11, 43, HK);
const h61 = holdout(11, 61, HK);
console.log('\n  Both holdouts, ranked by out-of-sample rms % error:');
console.log('  model      train<=43   train<=61     in-sample AICc rank on 11..79');
{
  const order = [...fits11].sort((a, b) => a.aicc - b.aicc).map(f => f.model.key);
  for (const k of HK) {
    const a = h43.find(r => r.k === k), b = h61.find(r => r.k === k);
    console.log('  ' + padr(k, 10) + pad(F(a.rms, 1) + '%', 10) + pad(F(b.rms, 1) + '%', 12)
      + pad('#' + (order.indexOf(k) + 1), 16));
  }
}

/* =====================  G. LEAVE-ONE-OUT  ================================= */
console.log('\n' + '='.repeat(76));
console.log('G. LEAVE-ONE-OUT on x = 11..79: predictive error and parameter bands.');
console.log('='.repeat(76));
console.log('  model    LOO rms(log)   in-sample rms   inflation   free-parameter band over the 18 refits');
for (const k of KEYS) {
  const f = fit(M[k], w11.x, w11.y), l = loo(M[k], w11.x, w11.y);
  if (!f || !l) continue;
  let band = '';
  if (k === 'PW') band = `a in [${F(l.bands[1][0])}, ${F(l.bands[1][1])}]`;
  else if (k === 'XLA') band = `a in [${F(l.bands[1][0])}, ${F(l.bands[1][1])}]`;
  else if (k === 'PWL') band = `a in [${F(l.bands[1][0])}, ${F(l.bands[1][1])}], b in [${F(l.bands[2][0])}, ${F(l.bands[2][1])}]`;
  else if (k === 'MP2LLb') band = `b in [${F(l.bands[1][0])}, ${F(l.bands[1][1])}]`;
  else if (k === 'XLALLb') band = `a in [${F(l.bands[1][0])}, ${F(l.bands[1][1])}], b in [${F(l.bands[2][0])}, ${F(l.bands[2][1])}]`;
  else band = `c in [${F(Math.exp(l.bands[0][0]), 4)}, ${F(Math.exp(l.bands[0][1]), 4)}]`;
  console.log('  ' + padr(k, 8) + pad(F(l.rms, 4), 13) + pad(F(f.rms, 4), 16)
    + pad(F(l.rms / f.rms, 2) + 'x', 12) + '   ' + band);
}

/* =====================  H. THE CONTROL  =================================== */
console.log('\n' + '='.repeat(76));
console.log('H. THE CONTROL. The identical estimator on h(x#), where the answer is known.');
console.log('='.repeat(76));
console.log('  h(x#) = A048670. Iwaniec 1978 PROVES exponent <= 2; Maier and Pomerance');
console.log('  conjecture x (log x)^{2+o(1)}, i.e. exponent 1. So the truth for the');
console.log('  x-exponent is 1 and any reading above it is the estimator\'s own bias.');
const HX = P.slice(0, H.length);
function controlRace(title, lo, hi, keys) {
  const w = win(HX, H, lo, hi);
  console.log(`\n  ${title}  (n = ${w.x.length}, x = ${w.x[0]}..${w.x[w.x.length - 1]})`);
  console.log('  model    form                          k     RSS      rms    AIC    dAICc  runs/exp   ac1   fitted          bias vs truth');
  const fits = keys.map(k => fit(M[k], w.x, w.y)).filter(Boolean);
  const best = Math.min(...fits.map(f => f.aicc));
  for (const f of fits) {
    let bias = '';
    if (f.model.key === 'PW') bias = `a - 1 = ${(f.beta[1] - 1 >= 0 ? '+' : '') + F(f.beta[1] - 1)}`;
    if (f.model.key === 'PWL') bias = `a - 1 = ${(f.beta[1] - 1 >= 0 ? '+' : '') + F(f.beta[1] - 1)}`;
    if (f.model.key === 'XLA') bias = `a - 2 = ${(f.beta[1] - 2 >= 0 ? '+' : '') + F(f.beta[1] - 2)}`;
    if (f.model.key === 'MP2LLb') bias = `b - 0 = ${(f.beta[1] >= 0 ? '+' : '') + F(f.beta[1])}`;
    console.log('  ' + padr(f.model.key, 8) + padr(f.model.form, 30)
      + pad(f.k, 2) + pad(F(f.rss, 5), 10) + pad(F(f.rms, 4), 9)
      + pad(F(f.aic, 1), 8) + pad(F(f.aicc - best, 1), 8)
      + pad(`${f.runs}/${F(f.expRuns, 1)}`, 10) + pad(F(f.ac1, 2), 7)
      + '   ' + padr(f.model.label(f.beta), 16) + bias);
  }
  return fits;
}
const cMatched = controlRace('H1. MATCHED WINDOW: the same eighteen x-values, 11..79', 11, 79, KEYS);
controlRace('H2. x = 11..229, the 50-term reading the brief asked for', 11, 229, KEYS);
controlRace('H3. the whole 58-term ladder, x = 11..271', 11, 271, KEYS);
{
  console.log('\n  H4. THE BIAS TRANSFER, stated as the two numbers it needs and no more.');
  const g = fits11.find(f => f.model.key === 'PW'), c = cMatched.find(f => f.model.key === 'PW');
  console.log(`    G2 on x = 11..79, c x^a:      a = ${F(g.beta[1])}`);
  console.log(`    h  on x = 11..79, c x^a:      a = ${F(c.beta[1])}   (truth 1, so bias +${F(c.beta[1] - 1)})`);
  console.log(`    difference:                   ${F(g.beta[1] - c.beta[1])}`);
  console.log(`    G2 exponent after subtracting the MATCHED bias: ${F(g.beta[1] - (c.beta[1] - 1))}`);
  const c58 = fit(M.PW, win(HX, H, 11, 271).x, win(HX, H, 11, 271).y);
  console.log(`    the house control line uses the long ladder: a = ${F(c58.beta[1])} on x = 11..271,`);
  console.log(`    bias +${F(c58.beta[1] - 1)}, which would give ${F(g.beta[1] - (c58.beta[1] - 1))} instead.`);
  console.log('    THE TWO CORRECTIONS DIFFER BY ' + F(Math.abs((c.beta[1] - 1) - (c58.beta[1] - 1)), 3)
    + ', and the matched one is the honest one:');
  console.log('    the bias is a function of the window, so it must be read at OUR window.');
  const gx = fits11.find(f => f.model.key === 'XLA'), cx = cMatched.find(f => f.model.key === 'XLA');
  console.log(`\n    same exercise in the log frame, c x ln^a x:`);
  console.log(`    G2: a = ${F(gx.beta[1])}    h: a = ${F(cx.beta[1])} (truth 2, bias ${(cx.beta[1] - 2 >= 0 ? '+' : '') + F(cx.beta[1] - 2)})`);
  console.log(`    G2 after the matched correction: a = ${F(gx.beta[1] - (cx.beta[1] - 2))}`);
  console.log('\n  H4b. THE RANKING ITSELF, side by side at the matched window. This is the');
  console.log('  calibration that matters, because it asks whether the SELECTION is real.');
  console.log('  Baselines are over the LAWS only in BOTH columns, so the two are the same');
  console.log('  question; the smoothness references Q2 and Q3 are excluded from both.');
  console.log('  model      G2 dAICc   h dAICc   what it means');
  // Both baselines over the LAWS only, so the two columns are the same question.
  const gb = Math.min(...fits11.filter(f => LAWS.includes(f.model.key)).map(f => f.aicc));
  const cb = Math.min(...cMatched.filter(f => LAWS.includes(f.model.key)).map(f => f.aicc));
  for (const k of LAWS) {
    const g = fits11.find(f => f.model.key === k), c = cMatched.find(f => f.model.key === k);
    if (!g || !c) continue;
    const dg = g.aicc - gb, dc = c.aicc - cb;
    let note = '';
    if (dg < 2 && dc > 10) note = 'wins on G2, EXCLUDED on the control';
    else if (dg > 10 && dc < 2) note = 'wins on the control, EXCLUDED on G2';
    else if (dg < 2 && dc < 2) note = 'fits both; carries no information';
    else if (dg > 10 && dc > 10) note = 'excluded on both';
    else note = '-';
    console.log('  ' + padr(k, 10) + pad(F(dg, 1), 9) + pad(F(dc, 1), 10) + '   ' + note);
  }
  console.log('\n    THE RANKING INVERTS. On an object whose truth is x times a power of a');
  console.log('    log, the estimator at this window picks the PURE POWER LAW and throws');
  console.log('    out every log family by 30 to 60 units. On G2 at the identical window');
  console.log('    it does the opposite. So the log families winning on G2 is not the');
  console.log('    estimator\'s taste: this window, this length and this estimator prefer');
  console.log('    a pure power when the data will let them, and G2\'s data will not.');
  const g2mp2 = fits11.find(f => f.model.key === 'MP2').aicc - gb;
  const cmp2 = cMatched.find(f => f.model.key === 'MP2').aicc - cb;
  console.log('\n    The converse reading is the one that must be stated too, because it is');
  console.log(`    the harder one. MP2 loses by ${F(g2mp2, 1)} units on G2 -- and by ${F(cmp2, 1)} on the`);
  console.log('    control, whose CONJECTURED truth IS x ln^2 x. So MP2\'s defeat on G2 is');
  console.log('    NOT evidence against x ln^2 x. A frozen one-parameter law is beaten at');
  console.log('    this range whether or not it is true, and that is the single most');
  console.log('    important thing the control says about this whole exercise.');

  console.log('\n  H5. does the CONTROL reproduce this morning\'s failure mode? Same holdout.');
  const tr = win(HX, H, 11, 43), te = win(HX, H, 47, 79);
  const f = fit(M.MP2, tr.x, tr.y);
  const errs = te.x.map((x, i) => 100 * (f.predict(x) / te.y[i] - 1));
  console.log('    h, MP2 fitted on x = 11..43, predicting 47..79: '
    + errs.map(e => (e >= 0 ? '+' : '') + F(e, 1) + '%').join(' '));
  const g43 = fit(M.MP2, win(X, G2, 11, 43).x, win(X, G2, 11, 43).y);
  const gerrs = te.x.map((x, i) => 100 * (g43.predict(x) / win(X, G2, 47, 79).y[i] - 1));
  console.log('    G2, same:                                       '
    + gerrs.map(e => (e >= 0 ? '+' : '') + F(e, 1) + '%').join(' '));
}

/* =====================  I. THE CONSEQUENCE FOR THE BOUND  ================= */
console.log('\n' + '='.repeat(76));
console.log('I. WHAT THIS PRICES: the 4.26645 bound against the measured truth.');
console.log('='.repeat(76));
{
  const i79 = X.length - 1;
  console.log(`  log_x G2 at x = 79:  ${F(Math.log(G2[i79]) / Math.log(79), 4)}   (sift-limit-attack section 7d`);
  console.log('  records "log_x G2 = 1.70 flat over x <= 79" as the basis line, and the');
  console.log('  budget prices everything against an ASYMPTOTIC truth exponent of 1.)');
  let s = '  log_x G2 across the ladder: ';
  for (const x of [11, 23, 43, 61, 79]) { const i = X.indexOf(x); s += `${x}:${F(Math.log(G2[i]) / Math.log(x), 3)} `; }
  console.log(s);
  console.log('\n  Where the fitted laws put log_x G2 as x grows (computed in log space,');
  console.log('  so the far field survives):');
  console.log('  x          MP2 (x ln^2 x)  MP2LL (+lnln)   XLA (x ln^a x)   MP3 (x ln^3 x)     PW (x^a)');
  for (const x of [79, 1e3, 1e6, 1e12, 1e50, 1e200]) {
    const row = ['MP2', 'MP2LL', 'XLA', 'MP3', 'PW'].map(k =>
      pad(F(fit(M[k], w11.x, w11.y).logx(x), 3), 16)).join('');
    console.log('  ' + padr(x < 1e4 ? String(x) : x.toExponential(0), 11) + row);
  }
  console.log('  Every family inside 7 AICc units except PW tends to exponent 1. PW does');
  console.log('  not, and PW is 10.6 units behind, which is the whole verdict in one line.');

  console.log('\n  HOW THE 7d SPLIT MOVES WITH THE TRUTH, and it moves ASYMMETRICALLY.');
  console.log('  The LP floor 3.3152 and beta2 4.26645 are both measured without reference');
  console.log('  to the truth, so DP2+DP3 = beta2 - floor is FIXED at 0.95 whatever the');
  console.log('  truth is, and DP1 = floor - truth absorbs the entire uncertainty.');
  const FLOOR = 3.3152;
  console.log('  truth exponent                 total gap   DP1 = floor-truth   DP2+DP3   DP1 share');
  for (const [name, t] of [['1     asymptotic, the 7d basis', 1],
    ['1.70  log_x G2 at x = 79', Math.log(G2[i79]) / Math.log(79)],
    ['1.818 raw power fit, 11..79', fits11.find(f => f.model.key === 'PW').beta[1]],
    ['2     the zone target', 2]]) {
    const gap = BETA2 - t, dp1 = FLOOR - t, dp23 = BETA2 - FLOOR;
    console.log('  ' + padr(name, 32) + pad(F(gap, 3), 8) + pad(F(dp1, 3), 18)
      + pad(F(dp23, 3), 11) + pad(F(100 * dp1 / gap, 1) + '%', 12));
  }
  console.log('\n  Consistency of the section 7d attribution with this fit: YES, in the limit.');
  const best = [...fits11].sort((a, b) => a.aicc - b.aicc)[0];
  console.log(`    The AICc winner is ${best.model.key} (${best.model.form}), and it, together`);
  console.log('    with every other family inside 7 units, has x-exponent -> 1. The two');
  console.log('    families that would break the attribution -- PW at 1.818 and SQ at 2 --');
  console.log('    are 10.6 and 28.0 AICc units behind and are the two the data excludes.');
  console.log('    So 7d\'s truth = 1 basis line is SUPPORTED, and it is supported by the');
  console.log('    model selection rather than assumed by it.');
  console.log('\n    The caveat, and it is a real one: the LP floor 3.3152 is pooled from 33');
  console.log('    readings at x <= 43, where log_x G2 reads 1.71, not 1. Read at the same');
  console.log(`    finite x the split is DP1 = ${F(FLOOR - Math.log(G2[i79]) / Math.log(79), 2)} and DP2+DP3 = ${F(BETA2 - FLOOR, 2)}, i.e. `
    + `${F(100 * (FLOOR - Math.log(G2[i79]) / Math.log(79)) / (BETA2 - Math.log(G2[i79]) / Math.log(79)), 0)}% / ${F(100 * (BETA2 - FLOOR) / (BETA2 - Math.log(G2[i79]) / Math.log(79)), 0)}%`);
  console.log('    against the asymptotic 71% / 29%. Both are correct; they are the same');
  console.log('    ledger read at two scales, exactly the confusion 7d\'s own resolved box');
  console.log('    settled between sections 7c and 7d. DP1 is still the master cost either way.');
  console.log('\n  An independent consistency check that IMPROVES with the new floor:');
  console.log(`    7d records beta_floor/theta_max = 3.195/2 = 1.597 against the measured`);
  console.log(`    log_x G2 = 1.70, 6.2% apart with no shared code. With the raised floor`);
  console.log(`    that reads ${F(FLOOR / 2, 4)} against ${F(Math.log(G2[i79]) / Math.log(79), 4)}, `
    + `${F(100 * Math.abs(FLOOR / 2 / (Math.log(G2[i79]) / Math.log(79)) - 1), 1)}% apart. The agreement got better.`);
}

/* =====================  J. THE FALSIFIABLE PREDICTION  ==================== */
console.log('\n' + '='.repeat(76));
console.log('J. WHAT THE NEXT TERM WOULD SETTLE. A pre-registered prediction at x = 83.');
console.log('='.repeat(76));
{
  console.log('  Every family fitted on the primary window (18 terms, x = 11..79),');
  console.log('  predicting G2(83#), the twenty-third term:');
  console.log('  model     G2(83#) predicted    dAICc');
  const best = Math.min(...fits11.map(f => f.aicc));
  for (const f of [...fits11].filter(f => LAWS.includes(f.model.key)).sort((a, b) => a.aicc - b.aicc)) {
    console.log('  ' + padr(f.model.key, 10) + pad(F(f.predict(83), 1), 15) + pad(F(f.aicc - best, 1), 12));
  }
  const live = fits11.filter(f => LAWS.includes(f.model.key) && f.aicc - best < 7).map(f => f.predict(83));
  console.log(`\n  The families within 7 AICc units span ${F(Math.min(...live), 0)} to ${F(Math.max(...live), 0)},`);
  console.log(`  a spread of ${F(100 * (Math.max(...live) / Math.min(...live) - 1), 1)}%. One more exact term does not separate them.`);
  console.log('  The observed step 73 -> 79 was ' + F(100 * (1710 / 1530 - 1), 1) + '%, so a single term is inside the noise');
  console.log('  of the ladder itself. This is the honest form of "we cannot tell yet".');
}

console.log('\n' + '='.repeat(76));
console.log('done.');
console.log('='.repeat(76));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-growth-law.js
//   invocation:  node research/attack-growth-law.js
//   code-sha256: 32c6e55d6d9ca1cf8eaa3b19263aa57e3fa66bc4cc95cb13b1ff6685bfbd50b3
//   out-sha256:  0e71e295a21a109dfeae75a2c4d8b55ff4df5b7afd1917891e812adbf61f2fa0
//   body-lines:  508
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     0.1 s
// ============================================================================
// ============================================================================
// A. CUSTODY. Every input reproduced against its home in the corpus.
// ============================================================================
//   G2(x#) = A144311(n) + 1 at all 22 terms: YES
//   22 terms, x = 2..79, G2 = 2..1710
//   provenance split: ours x <= 43 (14 terms), A144311 only x > 43 (8 terms)
//   control A048670 has 58 terms, p_58 = 271
//   A048670 <= G2 at all 22 shared terms (the PROVEN G2 >= g): YES
//
//   the raw log-log exponent, three windows quoted this morning:
//     x <=  43, from x = 2   n = 14   a = 1.808
//     x <=  79, from x = 11  n = 18   a = 1.818
//     x = 47..79 alone       n = 8   a = 1.725
//
//   the two normalisations, head and tail:
//     x = 37  G2 =  528  G2/x^2 = 0.386   G2/ln^3 x = 11.2   log_x G2 = 1.736
//     x = 43  G2 =  618  G2/x^2 = 0.334   G2/ln^3 x = 11.6   log_x G2 = 1.709
//     x = 53  G2 =  870  G2/x^2 = 0.310   G2/ln^3 x = 13.9   log_x G2 = 1.705
//     x = 61  G2 = 1080  G2/x^2 = 0.290   G2/ln^3 x = 15.5   log_x G2 = 1.699
//     x = 71  G2 = 1398  G2/x^2 = 0.277   G2/ln^3 x = 18.0   log_x G2 = 1.699
//     x = 79  G2 = 1710  G2/x^2 = 0.274   G2/ln^3 x = 20.5   log_x G2 = 1.704
//
//   RECONCILIATION of the -14.0% worst-miss figure the brief carried in. The
//   c x ln^2 x miss on x = 47..79 depends on the fit window AND on which
//   least-squares is meant, and the two estimators disagree by nine points.
//   window     estimator        c        x=47   53    59    61    67    71    73    79    worst  monotone
//   2..43      log-space LS      0.9976  -1.8  -4.2  +1.3  -4.8  -8.0  -7.9 -12.4 -12.0   -12.4   NO
//   5..43      log-space LS      0.8994 -11.5 -13.6  -8.7 -14.2 -17.0 -17.0 -21.0 -20.7   -21.0   NO
//   11..43     log-space LS      0.8764 -13.8 -15.8 -11.0 -16.4 -19.2 -19.1 -23.0 -22.7   -23.0   NO
//   2..43      linear-space LS   0.9788  -3.7  -6.0  -0.6  -6.6  -9.7  -9.7 -14.0 -13.7   -14.0   NO
//     THE -14.0% IS THE LINEAR-SPACE FIT, and it is nearly window-free: the
//     same c = 0.9788 comes out of x = 2..43, 5..43, 7..43 and 11..43 alike,
//     because a linear-space fit on a growing sequence is owned by its largest
//     terms. The house log-space estimator is window-sensitive and reads
//     -12.4% to -23.0% over the same four windows. Both are defensible; they
//     are not the same measurement and must not be quoted as one.
//     And in NO version is the miss monotone: x = 59 and x = 79 both step back.
//
// ============================================================================
// B. IS THE APPARENT EXPONENT FALLING? Local slopes and rolling fits.
// ============================================================================
//   two-point local exponent ln(G2_{i+1}/G2_i) / ln(x_{i+1}/x_i):
//    11->13:2.71 13->17:1.84 17->19:2.95 19->23:1.61 23->29:1.01
//    29->31:4.49 31->37:2.36 37->41:0.33 41->43:2.60 43->47:1.53
//    47->53:1.72 53->59:0.98 59->61:3.35 61->67:1.84 67->71:1.47
//    71->73:3.25 73->79:1.41
//
//   rolling 8-term power-law fit (window start x -> exponent a):
//    [2,19]=1.80 [3,23]=1.73 [5,29]=1.74 [7,31]=1.71
//    [11,37]=1.97 [13,41]=1.86 [17,43]=1.83 [19,47]=1.77
//    [23,53]=1.81 [29,59]=1.77 [31,61]=1.58 [37,67]=1.54
//    [41,71]=1.66 [43,73]=1.67 [47,79]=1.72
//
//   nested fits, all ending at x = 79, start moving right:
//     window            n    a (c x^a)   a (c x ln^a x)   c (c x ln^2 x)
//     [2,79]          22    1.789        1.733           1.022
//     [5,79]          20    1.777        2.250           0.962
//     [11,79]         18    1.818        2.758           0.956
//     [17,79]         16    1.753        2.698           0.991
//     [23,79]         14    1.736        2.771           1.013
//     [31,79]         12    1.651        2.540           1.045
//     [41,79]         10    1.704        2.831           1.050
//     [53,79]          7    1.783        3.258           1.072
//
//   nested fits, all STARTING at x = 11, end moving right:
//     window            n    a (c x^a)   a (c x ln^a x)   c (c x ln^2 x)
//     [11,23]          5    2.137        3.129           0.803
//     [11,31]          7    1.925        2.703           0.820
//     [11,37]          8    1.969        2.881           0.850
//     [11,43]         10    1.919        2.823           0.876
//     [11,53]         12    1.887        2.799           0.900
//     [11,61]         14    1.844        2.738           0.916
//     [11,71]         16    1.826        2.737           0.935
//     [11,79]         18    1.818        2.758           0.956
//
// ============================================================================
// C. TWO CANDIDATE FAMILIES ARE NOT FAMILIES. Checked before fitting.
// ============================================================================
//   (i) c x ln^2 x (ln x)^{b/lnln x}  is EXACTLY  (c e^b) x ln^2 x.
//       (ln x)^{b/lnln x} = exp( (b/lnln x) * ln(ln x) ) = exp(b), for every x.
//       numerically, (ln x)^{b/lnln x} at b = 1, e = 2.718281828: 2.718281828 2.718281828 2.718281828 2.718281828
//       So b is not identifiable: it is absorbed into c, at ANY sample size,
//       exactly, not merely to within the noise. It is the one-parameter
//       family MP2 wearing two parameters. Dropped, and not fitted below.
//
//   (ii) any factor carrying lnlnln x LINEARLY (the Rankin / FGKMT shape
//        x ln^2 x lnlnln x / lnln x) is unusable on this range, because
//        lnlnln x CHANGES SIGN inside it:
//        x=11: -0.1340   x=13: -0.0598   x=17: 0.0406   x=23: 0.1335   x=43: 0.2812   x=79: 0.3884
//        zero at x = exp(e) = 15.154, i.e. between x = 13 and x = 17.
//        A regressor that crosses zero one third of the way through a range
//        of 18 points carries no usable leverage, and ln(lnlnln x) does not
//        exist for x <= 13. The (lnln x)^b form MP2LLb below is the same
//        correction written so that it can be fitted at all.
//
//   (iii) the two regressors that ARE live are almost the same vector on
//         x = 11..79: corr(ln x, lnln x) = 0.99668,
//         corr(ln x, lnlnln x) = 0.98834, corr(lnln x, lnlnln x) = 0.99743.
//         That is the whole difficulty of this problem in one number: over
//         two decades of x, "a power of x" and "a power of ln x" are the
//         same shape, and only the extrapolation tells them apart.
//
// ============================================================================
// D. THE MODEL RACE. Log-space least squares, AICc-ranked.
// ============================================================================
//
//   D1. PRIMARY WINDOW x = 11..79   (n = 18, x = 11..79)
//   house window: below x = 11 the ladder is 2,6,12,30 and lnln 2 < 0.
//   model    form                          k     RSS      rms   maxres   AIC    dAICc  runs/exp   ac1   fitted
//   PW      c x^a                          2   0.10477   0.0763   0.164   -88.6    10.6     5/9.5   0.13   a = 1.818
//   PWL     c x^a (ln x)^b                 3   0.06312   0.0592   0.167   -95.8     4.4    12/9.5  -0.15   a = 0.833, b = 3.316
//   MP2     c x ln^2 x                     1   0.39263   0.1477   0.364   -66.9    31.8     2/9.5   0.60   c = 0.956
//   MP3     c x ln^3 x                     1   0.09775   0.0737   0.144   -91.9     6.8     6/9.5   0.23   c = 0.2691
//   XLA     c x ln^a x                     2   0.06431   0.0598   0.157   -97.4     1.8    10/9.5  -0.14   a = 2.758
//   MP2LL   c x ln^2 x lnln x              1   0.06711   0.0611   0.165   -98.7     0.0    10/9.5  -0.07   c = 0.762
//   MP2LLb  c x ln^2 x (lnln x)^b          2   0.06240   0.0589   0.169   -98.0     1.2    14/9.5  -0.15   b = 0.893
//   XLALLb  c x ln^a x (lnln x)^b          3   0.06239   0.0589   0.169   -96.0     4.2    14/9.5  -0.15   a = 1.952, b = 0.950
//   SQ      c x^2  (the zone target)       1   0.31746   0.1328   0.238   -70.7    28.0     6/9.5   0.68   c = 0.3276
//   X       c x    (exponent 1 frozen)     1   4.41051   0.4950   1.150   -23.3    75.3     2/9.5   0.77   c = 12.05
//   Q2      [ref] quadratic in ln x        3   0.06621   0.0606   0.164   -94.9     5.2    12/9.5  -0.13   smoothness reference
//   Q3      [ref] cubic in ln x            4   0.05962   0.0576   0.172   -94.8     6.7    13/9.5  -0.17   smoothness reference
//
//   D2. FROM x = 5   (n = 20, x = 5..79)
//   model    form                          k     RSS      rms   maxres   AIC    dAICc  runs/exp   ac1   fitted
//   PW      c x^a                          2   0.18302   0.0957   0.246   -89.9     0.0    9/10.5  -0.31   a = 1.777
//   PWL     c x^a (ln x)^b                 3   0.18301   0.0957   0.246   -87.9     2.8    9/10.5  -0.31   a = 1.775, b = 0.007
//   MP2     c x ln^2 x                     1   0.42125   0.1451   0.371   -75.2    14.2    4/10.5   0.40   c = 0.962
//   MP3     c x ln^3 x                     1   1.15293   0.2401   0.694   -55.1    34.3    8/10.5   0.49   c = 0.2905
//   XLA     c x ln^a x                     2   0.32992   0.1284   0.295   -78.1    11.8    7/10.5   0.18   a = 2.250
//   MP2LL   c x ln^2 x lnln x              1   1.43815   0.2682   0.851   -50.6    38.7    6/10.5   0.46   c = 0.832
//   MP2LLb  c x ln^2 x (lnln x)^b          2   0.36446   0.1350   0.319   -76.1    13.8    7/10.5   0.27   b = 0.187
//   XLALLb  c x ln^a x (lnln x)^b          3   0.19458   0.0986   0.296   -86.7     4.0   12/10.5  -0.42   a = 4.094, b = -1.773
//   SQ      c x^2  (the zone target)       1   0.80396   0.2005   0.575   -62.3    27.1    4/10.5   0.56   c = 0.3445
//   X       c x    (exponent 1 frozen)     1   7.73404   0.6219   1.482   -17.0    72.4    2/10.5   0.78   c = 10.56
//   Q2      [ref] quadratic in ln x        3   0.18289   0.0956   0.249   -87.9     2.8    9/10.5  -0.31   smoothness reference
//   Q3      [ref] cubic in ln x            4   0.17587   0.0938   0.261   -86.7     5.2   10/10.5  -0.42   smoothness reference
//
//   D3. ALL 22 TERMS, from x = 2   (n = 22, x = 2..79)
//   lnlnln 2 and lnlnln 3 are complex, so the (lnln x)^b families cannot be run here.
//   model    form                          k     RSS      rms   maxres   AIC    dAICc  runs/exp   ac1   fitted
//   PW      c x^a                          2   0.25493   0.1076   0.265   -94.1     0.0   11/11.5  -0.38   a = 1.789
//   PWL     c x^a (ln x)^b                 3   0.23537   0.1034   0.244   -93.8     0.9   12/11.5  -0.36   a = 1.676, b = 0.262
//   MP2     c x ln^2 x                     1   1.23312   0.2368   0.712   -61.4    32.2    9/11.5   0.44   c = 1.022
//   MP3     c x ln^3 x                     1   8.60012   0.6252   2.155   -18.7    75.0    2/11.5   0.60   c = 0.3482
//   XLA     c x ln^a x                     2   0.89126   0.2013   0.485   -66.5    27.5    3/11.5   0.53   a = 1.733
//   SQ      c x^2  (the zone target)       1   1.33024   0.2459   0.613   -59.7    33.9    6/11.5   0.65   c = 0.3610
//   X       c x    (exponent 1 frozen)     1  15.32296   0.8346   2.174    -6.0    87.7    2/11.5   0.78   c = 8.80
//
//   D4. THIS MORNING'S DATA, x = 11..43   (n = 10, x = 11..43)
//   model    form                          k     RSS      rms   maxres   AIC    dAICc  runs/exp   ac1   fitted
//   PW      c x^a                          2   0.06741   0.0821   0.148   -46.0     5.1     5/5.5  -0.14   a = 1.919
//   PWL     c x^a (ln x)^b                 3   0.05480   0.0740   0.174   -46.1     7.3     8/5.5  -0.20   a = 0.667, b = 3.840
//   MP2     c x ln^2 x                     1   0.20557   0.1434   0.277   -36.8    13.0     4/5.5   0.43   c = 0.876
//   MP3     c x ln^3 x                     1   0.06265   0.0792   0.180   -48.7     1.1     5/5.5  -0.09   c = 0.2789
//   XLA     c x ln^a x                     2   0.05569   0.0746   0.168   -47.9     3.1     7/5.5  -0.21   a = 2.823
//   MP2LL   c x ln^2 x lnln x              1   0.05609   0.0749   0.178   -49.8     0.0     7/5.5  -0.17   c = 0.772
//   MP2LLb  c x ln^2 x (lnln x)^b          2   0.05445   0.0738   0.172   -48.1     2.9     8/5.5  -0.21   b = 0.906
//   XLALLb  c x ln^a x (lnln x)^b          3   0.05419   0.0736   0.175   -46.2     7.2     8/5.5  -0.20   a = 1.404, b = 1.558
//   SQ      c x^2  (the zone target)       1   0.08102   0.0900   0.163   -46.2     3.7     5/5.5   0.05   c = 0.3612
//   X       c x    (exponent 1 frozen)     1   1.82026   0.4266   0.818   -15.0    34.8     2/5.5   0.66   c = 8.65
//   Q2      [ref] quadratic in ln x        3   0.05624   0.0750   0.176   -45.8     7.5     8/5.5  -0.19   smoothness reference
//   Q3      [ref] cubic in ln x            4   0.04843   0.0696   0.142   -45.3    12.0     7/5.5  -0.26   smoothness reference
//
//   D5. THE EIGHT NEW TERMS ALONE, x = 47..79   (n = 8, x = 47..79)
//   eight points, so read the exponents, not the ranking.
//   model    form                          k     RSS      rms   maxres   AIC    dAICc  runs/exp   ac1   fitted
//   PW      c x^a                          2   0.00574   0.0268   0.061   -53.9     3.0     5/4.5  -0.10   a = 1.725
//   MP2     c x ln^2 x                     1   0.01810   0.0476   0.078   -46.7     8.4     2/4.5   0.52   c = 1.065
//   MP3     c x ln^3 x                     1   0.00630   0.0281   0.063   -55.2     0.0     5/4.5  -0.04   c = 0.2573
//   XLA     c x ln^a x                     2   0.00628   0.0280   0.064   -53.2     3.7     5/4.5  -0.03   a = 2.969
//   SQ      c x^2  (the zone target)       1   0.02178   0.0522   0.100   -45.2     9.9     4/4.5   0.24   c = 0.2899
//   X       c x    (exponent 1 frozen)     1   0.11717   0.1210   0.192   -31.8    23.4     2/4.5   0.61   c = 18.24
//
// ============================================================================
// D6. THE LADDER'S OWN SCATTER: how much fit is left to buy?
// ============================================================================
//   A cubic in ln x has four free parameters and can bend any way the data
//   asks. On x = 11..79 it reaches rms 0.0576 in log space; the quadratic,
//   with three, reaches 0.0606. Against that:
//     best ONE-parameter law    c x ln^2 x lnln x          rms 0.0611   1.061x the cubic
//     best TWO-parameter law    c x ln^2 x (lnln x)^b      rms 0.0589   1.023x the cubic
//   A single free constant, with the whole shape frozen in advance, gets
//   within 6.1% of what four free parameters can do.
//
//   So essentially all of the residual is the ladder's own jitter, not model
//   error. The jitter is visible directly in the two-point exponents, which
//   run from 0.33 (37 -> 41, G2 rises 528 -> 546) to 4.49 (29 -> 31):
//     17 local exponents on x = 11..79: unweighted mean 2.084, sd 1.040,
//     min 0.33, max 4.49. The unweighted mean is NOT the exponent --
//     weighting each step by its own d ln x gives the endpoint slope 1.880,
//     against the least-squares 1.818. Quote the weighted one.
//     sd/sqrt(17) = 0.252 is the standard error the ladder supports
//     on a single exponent BEFORE any model bias is added, and the whole
//     difference between the candidate laws is smaller than it.
//
// ============================================================================
// D7. THE RATIO G2/h AT MATCHED x. The one estimator whose bias cancels.
// ============================================================================
//   G2 and h are the same construction at sieve dimension 2 and 1, measured
//   on the SAME primes, so the ratio kills every bias the two share: window
//   length, range, finite-size curvature, the estimator's own upward pull.
//   What is left is the price of the second residue class, and the corpus
//   claims that price is ONE LOGARITHM (G2-STATE section 3d, three routes).
//   If h = x ln^2 x and the ratio is ln x, then G2 = x ln^3 x.
//
//   x        11    17    23    31    41    47    59    71    79
//   G2/h    3.00  4.15  5.10  6.00  7.38  7.08  8.19  8.03  8.55
//
//   ratio ~ c (ln x)^a  over x = 11..79:  a = 1.857,  rms 0.0744
//   ratio ~ c x^a       over x = 11..79:  a = 0.546,  rms 0.0924
//   AICc: log form -88.7, power form -80.9, difference 7.8
//
//   the same fit on shrinking end-windows, to see whether a is settling:
//     [11,79]  n = 18   a = 1.857
//     [23,79]  n = 14   a = 1.478
//     [31,79]  n = 12   a = 1.095
//     [41,79]  n = 10   a = 1.104
//     [53,79]  n =  7   a = 0.178
//
//   AGAINST THE CERTIFICATE LADDER, which measures the same ratio on the
//   greedy construction over x = 37..5003, a range 60 times longer:
//     two-class-lower-bounds.md section 5d reading 2 (the ladder REPAIRED on
//     2026-08-18): the power of ln x reads 1.08 on the whole ladder, 1.14 on
//     the top twelve, 1.15 on the top eight, 1.21 on the top five, and
//     (Y2/Y1)/ln x sits at about 2.1, reaching 2.1877 at x = 5003.
//     THE TWO INSTRUMENTS MEET AT THEIR JUNCTION. Their ladder starts at
//     x = 37 and reads 1.08; ours ends at x = 79 and reads 1.095 on [31,79]
//     and 1.104 on [41,79]. Exact terms and a certified greedy, no shared
//     code, agree to a hundredth where their ranges abut, and both say ONE.
//
//     ** A CORPUS DEFECT, FOUND HERE AND NOT FIXED HERE. G2-STATE.md section
//     3d still reports this same quantity as "1.39 on the whole ladder, 1.17
//     from x = 229, 1.09 from x = 773, and 0.88 on the top five points",
//     which is the PRE-REPAIR ladder: different values and the opposite
//     DIRECTION of drift from the numbers now in the home document. Its
//     plateau figure 2.18 survives the repair and its exponent list does
//     not. Do not quote the falling version. **
//
// ============================================================================
// E. WHAT IS DISTINGUISHABLE AT 22 POINTS, AND WHAT IS NOT.
// ============================================================================
//   dAICc from the best, on x = 11..79. Burnham-Anderson: <2 indistinguishable,
//   4-7 considerably less support, >10 essentially none.
//   model    dAICc   verdict                       ratio to best at x = 10^6 / 10^50
//   MP2LL       0.0   INDISTINGUISHABLE                 1.000 / 1.00e+0
//   MP2LLb      1.2   INDISTINGUISHABLE                 0.924 / 8.68e-1
//   XLA         1.8   INDISTINGUISHABLE                 1.337 / 3.69e+0
//   XLALLb      4.2   weaker, not excluded              0.902 / 7.91e-1
//   PWL         4.4   weaker, not excluded              0.520 / 2.15e-7
//   MP3         6.8   weaker, not excluded              1.857 / 8.56e+0
//   PW         10.6   excluded by the data            133.912 / 1.06e+36
//   SQ         28.0   excluded by the data            857.278 / 6.83e+44
//   MP2        31.8   excluded by the data              0.477 / 2.64e-1
//   X          75.3   excluded by the data              0.032 / 2.51e-4
//
//   The pair that matters, and it is the repo's standing warning made exact:
//     PW  c x^a          a = 1.818   AICc -87.83
//     XLA c x ln^a x     a = 2.758   AICc -96.62
//     separated by 8.79 AICc units, and at x = 10^6 they differ by a
//     factor 100.16; at x = 10^50 by 2.88e+35.
//     In G2-STATE section 3b the same collision on h2 read 0.1 AIC units and a
//     factor x^0.85; here it is 8.79 units and x^0.82 against a log power.
//
//   The OTHER pair, and this one the data genuinely cannot touch:
//     MP2LL = c x ln^2 x lnln x and MP3 = c x ln^3 x differ by the factor
//     ln x / lnln x, which over x = 11..79 moves only from 2.74 to 2.96,
//     a 9% change in shape across the entire ladder. Two laws that differ by
//     9% of shape over the whole range of the data cannot be separated by it,
//     at any sample size the range allows, and their 6.8 AICc units are
//     measuring the constant, not the shape. In the limit they differ by
//     ln x / lnln x -> infinity. This is the sharpest form of the answer:
//     the ladder pins the law over [11,79] and says nothing about the limit.
//
// ============================================================================
// F. GENUINE HOLDOUTS. Fit the past, predict the terms that arrived today.
// ============================================================================
//
//   F. train x = 11..43 (n = 10), test x = 47..79 (n = 8)
//   model    fitted                x=47    x=53    x=59    x=61    x=67    x=71    x=73    x=79     rmsPE   worst   signs
//   PW      a = 1.919             +6.7    +9.3   +21.0   +15.4   +16.2   +19.3   +14.9   +19.7      16.0   +21.0   all over
//   PWL     a = 0.667, b = 3.840    +0.1    -0.6    +6.5    +0.5    -1.9    -1.3    -5.8    -4.7       3.6    +6.5   mixed
//   MP2     c = 0.876            -13.8   -15.8   -11.0   -16.4   -19.2   -19.1   -23.0   -22.7      18.1   -23.0   all under
//   MP3     c = 0.2789            +5.7    +6.3   +15.5    +9.4    +8.2    +9.7    +5.1    +7.5       9.0   +15.5   all over
//   XLA     a = 2.823             +1.9    +2.0   +10.3    +4.3    +2.7    +3.9    -0.6    +1.4       4.4   +10.3   mixed
//   MP2LL   c = 0.772             +2.5    +2.3   +10.2    +4.2    +2.3    +3.3    -1.2    +0.5       4.4   +10.2   mixed
//   MP2LLb  b = 0.906             +0.8    +0.4    +8.0    +2.1    +0.1    +1.0    -3.5    -2.0       3.3    +8.0   mixed
//   XLALLb  a = 1.404, b = 1.558    -0.1    -0.8    +6.3    +0.4    -1.9    -1.2    -5.7    -4.5       3.5    +6.3   mixed
//   SQ      c = 0.3612           +12.7   +16.6   +30.1   +24.4   +26.3   +30.2   +25.8   +31.8      25.6   +31.8   all over
//   X       c = 8.65             -42.6   -47.3   -47.2   -51.1   -54.9   -56.1   -58.7   -60.0      52.5   -60.0   all under
//
//   F. train x = 11..61 (n = 14), test x = 67..79 (n = 4)
//   model    fitted                x=67    x=71    x=73    x=79     rmsPE   worst   signs
//   PW      a = 1.844             +5.7    +8.1    +3.9    +7.6       6.5    +8.1   all over
//   PWL     a = 0.523, b = 4.272    -4.1    -3.7    -8.2    -7.5       6.2    -8.2   all under
//   MP2     c = 0.916            -15.5   -15.5   -19.6   -19.2      17.6   -19.6   all under
//   MP3     c = 0.2720            +5.5    +7.0    +2.5    +4.8       5.2    +7.0   all over
//   XLA     a = 2.738             -0.5    +0.6    -3.8    -2.1       2.2    -3.8   mixed
//   MP2LL   c = 0.762             +1.0    +2.0    -2.5    -0.9       1.7    -2.5   mixed
//   MP2LLb  b = 0.849             -1.7    -0.9    -5.3    -3.9       3.4    -5.3   all under
//   XLALLb  a = 0.944, b = 2.051    -3.7    -3.1    -7.6    -6.6       5.6    -7.6   all under
//   SQ      c = 0.3422           +19.6   +23.4   +19.2   +24.9      21.9   +24.9   all over
//   X       c = 10.38            -45.8   -47.3   -50.5   -52.0      49.0   -52.0   all under
//
//   Both holdouts, ranked by out-of-sample rms % error:
//   model      train<=43   train<=61     in-sample AICc rank on 11..79
//   PW             16.0%        6.5%              #9
//   PWL             3.6%        6.2%              #5
//   MP2            18.1%       17.6%             #11
//   MP3             9.0%        5.2%              #8
//   XLA             4.4%        2.2%              #3
//   MP2LL           4.4%        1.7%              #1
//   MP2LLb          3.3%        3.4%              #2
//   XLALLb          3.5%        5.6%              #4
//   SQ             25.6%       21.9%             #10
//   X              52.5%       49.0%             #12
//
// ============================================================================
// G. LEAVE-ONE-OUT on x = 11..79: predictive error and parameter bands.
// ============================================================================
//   model    LOO rms(log)   in-sample rms   inflation   free-parameter band over the 18 refits
//   PW             0.0894          0.0763       1.17x   a in [1.776, 1.832]
//   PWL            0.0732          0.0592       1.24x   a in [0.558, 1.127], b in [2.253, 4.219]
//   MP2            0.1564          0.1477       1.06x   c in [0.9459, 0.9764]
//   MP3            0.0780          0.0737       1.06x   c in [0.2669, 0.2714]
//   XLA            0.0667          0.0598       1.12x   a in [2.690, 2.793]
//   MP2LL          0.0647          0.0611       1.06x   c in [0.7574, 0.7698]
//   MP2LLb         0.0649          0.0589       1.10x   b in [0.835, 0.932]
//   XLALLb         0.0732          0.0589       1.24x   a in [0.891, 3.148], b in [-0.557, 2.178]
//   SQ             0.1406          0.1328       1.06x   c in [0.3230, 0.3310]
//   X              0.5241          0.4950       1.06x   c in [11.6460, 12.8973]
//   Q2             0.0756          0.0606       1.25x   c in [0.0812, 0.2385]
//   Q3             0.0726          0.0576       1.26x   c in [0.0004, 0.0293]
//
// ============================================================================
// H. THE CONTROL. The identical estimator on h(x#), where the answer is known.
// ============================================================================
//   h(x#) = A048670. Iwaniec 1978 PROVES exponent <= 2; Maier and Pomerance
//   conjecture x (log x)^{2+o(1)}, i.e. exponent 1. So the truth for the
//   x-exponent is 1 and any reading above it is the estimator's own bias.
//
//   H1. MATCHED WINDOW: the same eighteen x-values, 11..79  (n = 18, x = 11..79)
//   model    form                          k     RSS      rms    AIC    dAICc  runs/exp   ac1   fitted          bias vs truth
//   PW      c x^a                          2   0.11188   0.0788   -87.5     1.2    10/9.5   0.02   a = 1.272       a - 1 = +0.272
//   PWL     c x^a (ln x)^b                 3   0.10368   0.0759   -86.8     2.8    10/9.5  -0.12   a = 1.710, b = -1.472a - 1 = +0.710
//   MP2     c x ln^2 x                     1   0.81471   0.2127   -53.7    34.4     4/9.5   0.73   c = 0.153
//   MP3     c x ln^3 x                     1   2.64141   0.3831   -32.5    55.6     4/9.5   0.79   c = 0.0431
//   XLA     c x ln^a x                     2   0.12516   0.0834   -85.4     3.2     8/9.5   0.13   a = 0.901       a - 2 = -1.099
//   MP2LL   c x ln^2 x lnln x              1   2.30511   0.3579   -35.0    53.1     4/9.5   0.78   c = 0.122
//   MP2LLb  c x ln^2 x (lnln x)^b          2   0.11462   0.0798   -87.0     1.7    10/9.5   0.02   b = -1.301      b - 0 = -1.301
//   XLALLb  c x ln^a x (lnln x)^b          3   0.11124   0.0786   -85.6     4.0    10/9.5  -0.06   a = 3.075, b = -2.560
//   SQ      c x^2  (the zone target)       1   3.51655   0.4420   -27.4    60.7     2/9.5   0.81   c = 0.0525
//   X       c x    (exponent 1 frozen)     1   0.58941   0.1810   -59.5    28.6     2/9.5   0.62   c = 1.93
//   Q2      [ref] quadratic in ln x        3   0.10003   0.0745   -87.5     2.1    10/9.5  -0.16   smoothness reference
//   Q3      [ref] cubic in ln x            4   0.07376   0.0640   -91.0     0.0    11/9.5  -0.31   smoothness reference
//
//   H2. x = 11..229, the 50-term reading the brief asked for  (n = 46, x = 11..229)
//   model    form                          k     RSS      rms    AIC    dAICc  runs/exp   ac1   fitted          bias vs truth
//   PW      c x^a                          2   0.13905   0.0550  -262.9     0.5   25/23.5   0.15   a = 1.297       a - 1 = +0.297
//   PWL     c x^a (ln x)^b                 3   0.13620   0.0544  -261.8     1.9   25/23.5   0.11   a = 1.384, b = -0.342a - 1 = +0.384
//   MP2     c x ln^2 x                     1   1.55460   0.1838  -153.8   109.4    6/23.5   0.81   c = 0.132
//   MP3     c x ln^3 x                     1   6.74235   0.3828   -86.3   176.9    4/23.5   0.86   c = 0.0302
//   XLA     c x ln^a x                     2   0.19194   0.0646  -248.0    15.4   13/23.5   0.38   a = 1.161       a - 2 = -0.839
//   MP2LL   c x ln^2 x lnln x              1   5.19500   0.3361   -98.3   164.9    6/23.5   0.85   c = 0.090
//   MP2LLb  c x ln^2 x (lnln x)^b          2   0.15143   0.0574  -258.9     4.5   24/23.5   0.21   b = -1.116      b - 0 = -1.116
//   XLALLb  c x ln^a x (lnln x)^b          3   0.13422   0.0540  -262.5     1.2   25/23.5   0.06   a = 3.018, b = -2.446
//   SQ      c x^2  (the zone target)       1  15.01358   0.5713   -49.5   213.7    2/23.5   0.90   c = 0.0293
//   X       c x    (exponent 1 frozen)     1   2.80586   0.2470  -126.7   136.6    2/23.5   0.86   c = 2.51
//   Q2      [ref] quadratic in ln x        3   0.13737   0.0546  -261.4     2.3   25/23.5   0.13   smoothness reference
//   Q3      [ref] cubic in ln x            4   0.12411   0.0519  -264.1     0.0   20/23.5  -0.03   smoothness reference
//
//   H3. the whole 58-term ladder, x = 11..271  (n = 54, x = 11..271)
//   model    form                          k     RSS      rms    AIC    dAICc  runs/exp   ac1   fitted          bias vs truth
//   PW      c x^a                          2   0.14074   0.0511  -317.3     1.2   29/27.5   0.15   a = 1.296       a - 1 = +0.296
//   PWL     c x^a (ln x)^b                 3   0.13933   0.0508  -315.8     2.9   29/27.5   0.13   a = 1.348, b = -0.213a - 1 = +0.348
//   MP2     c x ln^2 x                     1   1.72885   0.1789  -183.8   134.5    6/27.5   0.82   c = 0.129
//   MP3     c x ln^3 x                     1   7.81183   0.3803  -102.4   215.9    2/27.5   0.87   c = 0.0285
//   XLA     c x ln^a x                     2   0.20157   0.0611  -297.9    20.6   19/27.5   0.40   a = 1.188       a - 2 = -0.812
//   MP2LL   c x ln^2 x lnln x              1   5.89157   0.3303  -117.6   200.7    4/27.5   0.86   c = 0.086
//   MP2LLb  c x ln^2 x (lnln x)^b          2   0.15473   0.0535  -312.2     6.3   26/27.5   0.22   b = -1.100      b - 0 = -1.100
//   XLALLb  c x ln^a x (lnln x)^b          3   0.13584   0.0502  -317.2     1.5   29/27.5   0.06   a = 2.947, b = -2.359
//   SQ      c x^2  (the zone target)       1  19.02479   0.5936   -54.3   264.0    4/27.5   0.91   c = 0.0261
//   X       c x    (exponent 1 frozen)     1   3.47710   0.2538  -146.1   172.2    4/27.5   0.88   c = 2.63
//   Q2      [ref] quadratic in ln x        3   0.14019   0.0510  -315.5     3.2   29/27.5   0.14   smoothness reference
//   Q3      [ref] cubic in ln x            4   0.12647   0.0484  -319.1     0.0   24/27.5  -0.02   smoothness reference
//
//   H4. THE BIAS TRANSFER, stated as the two numbers it needs and no more.
//     G2 on x = 11..79, c x^a:      a = 1.818
//     h  on x = 11..79, c x^a:      a = 1.272   (truth 1, so bias +0.272)
//     difference:                   0.546
//     G2 exponent after subtracting the MATCHED bias: 1.546
//     the house control line uses the long ladder: a = 1.296 on x = 11..271,
//     bias +0.296, which would give 1.522 instead.
//     THE TWO CORRECTIONS DIFFER BY 0.023, and the matched one is the honest one:
//     the bias is a function of the window, so it must be read at OUR window.
//
//     same exercise in the log frame, c x ln^a x:
//     G2: a = 2.758    h: a = 0.901 (truth 2, bias -1.099)
//     G2 after the matched correction: a = 3.857
//
//   H4b. THE RANKING ITSELF, side by side at the matched window. This is the
//   calibration that matters, because it asks whether the SELECTION is real.
//   Baselines are over the LAWS only in BOTH columns, so the two are the same
//   question; the smoothness references Q2 and Q3 are excluded from both.
//   model      G2 dAICc   h dAICc   what it means
//   PW             10.6       0.0   wins on the control, EXCLUDED on G2
//   PWL             4.4       1.5   -
//   MP2            31.8      33.2   excluded on both
//   MP3             6.8      54.4   -
//   XLA             1.8       2.0   -
//   MP2LL           0.0      51.9   wins on G2, EXCLUDED on the control
//   MP2LLb          1.2       0.4   fits both; carries no information
//   XLALLb          4.2       2.8   -
//   SQ             28.0      59.5   excluded on both
//   X              75.3      27.4   excluded on both
//
//     THE RANKING INVERTS. On an object whose truth is x times a power of a
//     log, the estimator at this window picks the PURE POWER LAW and throws
//     out every log family by 30 to 60 units. On G2 at the identical window
//     it does the opposite. So the log families winning on G2 is not the
//     estimator's taste: this window, this length and this estimator prefer
//     a pure power when the data will let them, and G2's data will not.
//
//     The converse reading is the one that must be stated too, because it is
//     the harder one. MP2 loses by 31.8 units on G2 -- and by 33.2 on the
//     control, whose CONJECTURED truth IS x ln^2 x. So MP2's defeat on G2 is
//     NOT evidence against x ln^2 x. A frozen one-parameter law is beaten at
//     this range whether or not it is true, and that is the single most
//     important thing the control says about this whole exercise.
//
//   H5. does the CONTROL reproduce this morning's failure mode? Same holdout.
//     h, MP2 fitted on x = 11..43, predicting 47..79: +20.2% +35.9% +43.4% +34.7% +34.4% +27.9% +22.0% +30.1%
//     G2, same:                                       -13.8% -15.8% -11.0% -16.4% -19.2% -19.1% -23.0% -22.7%
//
// ============================================================================
// I. WHAT THIS PRICES: the 4.26645 bound against the measured truth.
// ============================================================================
//   log_x G2 at x = 79:  1.7037   (sift-limit-attack section 7d
//   records "log_x G2 = 1.70 flat over x <= 79" as the basis line, and the
//   budget prices everything against an ASYMPTOTIC truth exponent of 1.)
//   log_x G2 across the ladder: 11:1.559 23:1.696 43:1.709 61:1.699 79:1.704
//
//   Where the fitted laws put log_x G2 as x grows (computed in log space,
//   so the far field survives):
//   x          MP2 (x ln^2 x)  MP2LL (+lnln)   XLA (x ln^a x)   MP3 (x ln^3 x)     PW (x^a)
//   79                    1.665           1.702           1.701           1.712           1.713
//   1000                  1.553           1.616           1.626           1.649           1.751
//   1e+6                  1.377           1.430           1.451           1.475           1.785
//   1e+12                 1.239           1.274           1.295           1.313           1.801
//   1e+50                 1.082           1.094           1.105           1.112           1.814
//   1e+200                1.027           1.030           1.035           1.037           1.817
//   Every family inside 7 AICc units except PW tends to exponent 1. PW does
//   not, and PW is 10.6 units behind, which is the whole verdict in one line.
//
//   HOW THE 7d SPLIT MOVES WITH THE TRUTH, and it moves ASYMMETRICALLY.
//   The LP floor 3.3152 and beta2 4.26645 are both measured without reference
//   to the truth, so DP2+DP3 = beta2 - floor is FIXED at 0.95 whatever the
//   truth is, and DP1 = floor - truth absorbs the entire uncertainty.
//   truth exponent                 total gap   DP1 = floor-truth   DP2+DP3   DP1 share
//   1     asymptotic, the 7d basis     3.266             2.315      0.951       70.9%
//   1.70  log_x G2 at x = 79           2.563             1.611      0.951       62.9%
//   1.818 raw power fit, 11..79        2.448             1.497      0.951       61.1%
//   2     the zone target              2.266             1.315      0.951       58.0%
//
//   Consistency of the section 7d attribution with this fit: YES, in the limit.
//     The AICc winner is MP2LL (c x ln^2 x lnln x), and it, together
//     with every other family inside 7 units, has x-exponent -> 1. The two
//     families that would break the attribution -- PW at 1.818 and SQ at 2 --
//     are 10.6 and 28.0 AICc units behind and are the two the data excludes.
//     So 7d's truth = 1 basis line is SUPPORTED, and it is supported by the
//     model selection rather than assumed by it.
//
//     The caveat, and it is a real one: the LP floor 3.3152 is pooled from 33
//     readings at x <= 43, where log_x G2 reads 1.71, not 1. Read at the same
//     finite x the split is DP1 = 1.61 and DP2+DP3 = 0.95, i.e. 63% / 37%
//     against the asymptotic 71% / 29%. Both are correct; they are the same
//     ledger read at two scales, exactly the confusion 7d's own resolved box
//     settled between sections 7c and 7d. DP1 is still the master cost either way.
//
//   An independent consistency check that IMPROVES with the new floor:
//     7d records beta_floor/theta_max = 3.195/2 = 1.597 against the measured
//     log_x G2 = 1.70, 6.2% apart with no shared code. With the raised floor
//     that reads 1.6576 against 1.7037, 2.7% apart. The agreement got better.
//
// ============================================================================
// J. WHAT THE NEXT TERM WOULD SETTLE. A pre-registered prediction at x = 83.
// ============================================================================
//   Every family fitted on the primary window (18 terms, x = 11..79),
//   predicting G2(83#), the twenty-third term:
//   model     G2(83#) predicted    dAICc
//   MP2LL              1835.9         0.0
//   MP2LLb             1802.9         1.2
//   XLA                1827.9         1.8
//   XLALLb             1801.2         4.2
//   PWL                1802.9         4.4
//   MP3                1927.2         6.8
//   PW                 1946.3        10.6
//   SQ                 2256.5        28.0
//   MP2                1548.9        31.8
//   X                  1000.5        75.3
//
//   The families within 7 AICc units span 1801 to 1927,
//   a spread of 7.0%. One more exact term does not separate them.
//   The observed step 73 -> 79 was 11.8%, so a single term is inside the noise
//   of the ladder itself. This is the honest form of "we cannot tell yet".
//
// ============================================================================
// done.
// ============================================================================
// READINGS
//
// 1. THE BEST-SUPPORTED LAW IS G2(x#) ~= 0.762 * x ln^2 x lnln x, AND THE
//    HONEST STATEMENT IS THE BAND AROUND IT, NOT THE WINNER. On the primary
//    window x = 11..79 the AICc order is MP2LL 0.0, MP2LLb 1.2, XLA 2.758 at
//    1.8, XLALLb 4.2, PWL 4.4, MP3 6.8, then a gap of four units to PW at 10.6.
//    Three families are inside 2 units and SIX are inside 7. Every one of the
//    six has x-exponent -> 1; all six sit between x ln^2 x and x ln^3 x, which
//    is where the ladder's two normalisations already said the truth was
//    (G2/x^2 falling 0.386 -> 0.274, G2/ln^3 x rising 11.2 -> 20.5). The band,
//    not the winner, is the result.
//
// 2. THE PURE POWER LAW IS EXCLUDED, AND THE CONTROL IS WHAT MAKES THAT MEAN
//    SOMETHING. c x^a at a = 1.818 is 10.6 AICc units behind on G2. Taken alone
//    that would be worth little, because research/exponent-control.md section 1
//    proved this estimator's affection for power laws: on 58 control terms it
//    beats the family containing the truth by 47 AIC units. The calibration run
//    here settles it. At the IDENTICAL window, on the control, PW WINS and every
//    log family is thrown out by 27 to 60 units (H4b). The estimator takes a
//    pure power whenever the data will let it. G2's data will not let it. The
//    ranking inverts between the two objects, so the log families' win on G2 is
//    a property of G2 and not of the instrument.
//
// 3. AND THE CONVERSE, WHICH IS THE HARDER HALF: x ln^2 x IS NOT REFUTED. MP2
//    loses by 31.8 units on G2 -- and by 33.2 on the control, whose conjectured
//    truth IS x ln^2 x. A frozen one-parameter law is beaten at this range
//    whether or not it is true. So the 31.8 units are NOT evidence against
//    x ln^2 x, and the eight new terms' rejection of the morning's fitted
//    c x ln^2 x law is a rejection of that CONSTANT at that range, not of the
//    shape. Quote it that way or not at all.
//
// 4. THE HOLDOUTS RANK THE FAMILIES THE SAME WAY THE AICc DOES, WHICH IS THE
//    ONE PIECE OF LUCK IN THIS RUN. Train x <= 43, predict 47..79: MP2LLb 3.3%,
//    XLALLb 3.5%, PWL 3.6%, XLA 4.4%, MP2LL 4.4%, MP3 9.0%, PW 16.0%, MP2 18.1%,
//    SQ 25.6%, and exponent 1 frozen 52.5%. Train x <= 61, predict 67..79:
//    MP2LL 1.7%, XLA 2.2%, MP2LLb 3.4%. The signs are the diagnosis: MP2 misses
//    ALL UNDER at both horizons and SQ and PW miss ALL OVER, while every family
//    in the live band misses MIXED. A law that is wrong in shape misses with one
//    sign, and only the live band passes that test.
//
// 5. THE MATCHED-WINDOW BIAS IS +0.272, NOT THE HOUSE +0.282, AND THE WINDOW IS
//    WHY. The control's raw power exponent reads 1.272 on x = 11..79, 1.297 on
//    x = 11..229 and 1.296 on the full 58, against a truth of 1. Subtracting the
//    MATCHED bias from G2's 1.818 gives 1.546; subtracting the long-ladder one
//    gives 1.522. The two differ by 0.023, which is small, and the matched one is
//    the correct one because the bias is a function of the window. 1.546 lands on
//    top of research/G2-STATE.md section 6.1's 1.54 from ten exact terms, by a
//    different route on eight more terms.
//
// 6. DO NOT QUOTE A LOG-FRAME EXPONENT AT THIS RANGE. The same control run in
//    the c x ln^a x frame reads a = 0.901 against a truth of 2: a bias of -1.099,
//    four times the size of the x-frame's +0.272 and of the opposite sign. It
//    rises only to 1.161 by x = 229 and 1.188 by x = 271. So G2's fitted a =
//    2.758 corrected the same way would read 3.857, and that number should not be
//    quoted: the correction is larger than the quantity's own plausible range.
//    THE X-FRAME EXPONENT IS THE ONE THIS DATA CAN CARRY. This is a
//    methodological finding and it applies to every log-power reading in the repo.
//
// 7. THE RATIO G2/h IS THE SHARPEST INSTRUMENT HERE, AND IT SAYS ONE LOGARITHM.
//    G2 and h are the same construction at dimension 2 and 1 on the same primes,
//    so their ratio cancels window, range, curvature and the estimator's own
//    pull. The ratio fits c (ln x)^a far better than c x^a (7.8 AICc units), and
//    a reads 1.857 on [11,79], 1.478 on [23,79], 1.095 on [31,79], 1.104 on
//    [41,79]. The certificate ladder measures the same ratio on the greedy
//    construction over x = 37..5003 and reads 1.08 on the whole ladder, 1.14 top
//    twelve, 1.15 top eight, 1.21 top five (two-class-lower-bounds.md section 5d
//    reading 2, the ladder as repaired on 2026-08-18). THE TWO MEET AT THEIR
//    JUNCTION: their ladder starts at x = 37 and reads 1.08, ours ends at x = 79
//    and reads 1.095 and 1.104 on its two comparable windows. Exact terms and a
//    certified greedy, no shared code, agreeing to a hundredth where their
//    ranges abut. Both say the second residue class costs ONE LOG. With
//    h = x ln^{2+o(1)} x that gives
//    G2 = x ln^{3+o(1)} x, which is exactly the dimension-2 Maier-Pomerance
//    accounting of two-class-lower-bounds.md section 4b, arrived at from data
//    rather than from the ledger.
//
// 8. THE TWO LAWS THE DATA CANNOT SEPARATE, EVER, ON THIS RANGE. MP2LL
//    (x ln^2 x lnln x) and MP3 (x ln^3 x) differ by the factor ln x / lnln x,
//    which moves from 2.74 to 2.96 across the ENTIRE ladder -- 9% of shape over
//    100% of the data. Their 6.8 AICc units are measuring the constant, not the
//    shape. In the limit the same factor diverges. No extension of this ladder
//    that stays computable can separate them: at x = 10^6 the factor is 5.7, and
//    the ladder cannot be extended past about x = 100 by any known method (the
//    branch-and-bound is at x = 79 after eighteen years, and exhaustive
//    enumeration at x = 79 would cost 2.8e10 years at this repo's 43# rate).
//
// 9. ONE CANDIDATE FAMILY IS NOT A FAMILY, EXACTLY. c x ln^2 x (ln x)^{b/lnln x}
//    equals (c e^b) x ln^2 x identically, for every x, because
//    (ln x)^{b/lnln x} = exp(b). Its second parameter is absorbed into the first
//    at ANY sample size. It was dropped before fitting rather than fitted and
//    found flat, which are different things. And any factor carrying lnlnln x
//    linearly -- the Rankin / FGKMT shape x ln^2 x lnlnln x / lnln x -- cannot be
//    fitted on this range at all, because lnlnln x changes sign at x = e^e =
//    15.15, one third of the way through it. The (lnln x)^b form is that same
//    correction rewritten so that it is estimable, and it returns b = 0.893 with
//    a leave-one-out band of [0.835, 0.932].
//
// 10. THE DATA IS EXHAUSTED, AND THAT IS MEASURABLE. A cubic in ln x, four free
//    parameters and free to bend any way it likes, reaches log-space rms 0.0576
//    on the eighteen points. The best ONE-parameter law reaches 0.0611, within
//    6.1% of it, and the best two-parameter law reaches 0.0589, within 2.3%.
//    Essentially all of the residual is the ladder's own jitter: the seventeen
//    two-point local exponents have sd 1.040 (min 0.33 at 37 -> 41, where G2
//    rises only 528 -> 546; max 4.49 at 29 -> 31), so sd/sqrt(17) = 0.252 is the
//    standard error the ladder supports on a single exponent BEFORE any model
//    bias, and the entire spread between the live families is smaller than it.
//
// 11. THE CONSEQUENCE FOR THE BOUND: SECTION 7d's TRUTH = 1 IS SUPPORTED, AND IT
//    IS NOW MEASURED RATHER THAN ASSUMED. Every family inside 7 AICc units has
//    x-exponent -> 1; the only two that do not, PW at 1.818 and SQ at 2, are the
//    two the data excludes at 10.6 and 28.0 units. So the loss budget's basis
//    line is right. Two refinements it should carry:
//    (a) THE SPLIT IS ASYMMETRIC IN THE TRUTH. beta2 = 4.26645 and the LP floor
//        3.3152 are both measured without reference to the truth, so
//        DP2+DP3 = beta2 - floor = 0.951 is FIXED whatever the truth is, and
//        DP1 = floor - truth absorbs the entire uncertainty. At truth 1 that is
//        2.315 and 70.9%; at the finite-x reading 1.70 it is 1.611 and 62.9%.
//        DP1 is the master cost on both readings, which is the point 7d makes,
//        and its SHARE is not a constant of the problem.
//    (b) The floor 3.3152 is pooled from 33 readings at x <= 43, where log_x G2
//        reads 1.71 rather than 1. Comparing it to a truth of 1 mixes an
//        asymptotic with a finite-x measurement. Both readings are correct and
//        they are the same ledger at two scales -- the exact confusion 7d's own
//        resolved box settled between sections 7c and 7d.
//
// 12. AN INDEPENDENT CHECK IMPROVED WITHOUT ANYONE AIMING AT IT. Section 7d
//    records beta_floor/theta_max = 3.195/2 = 1.597 against the measured
//    log_x G2 = 1.70, "6.2% apart with no shared code". With the raised floor
//    3.3152 the same check reads 1.6576 against 1.7037, 2.7% apart. The
//    agreement got better when the floor moved for unrelated reasons, which is
//    the kind of coincidence that is worth recording and not worth resting on.
//
// 13. WHAT ONE MORE EXACT TERM WOULD BUY: NOTHING. Pre-registered, on the
//    primary window: the families inside 7 AICc units predict G2(83#) between
//    1801 and 1927, a spread of 7.0%. The observed step from 73 to 79 was 11.8%.
//    A single new term is inside the ladder's own jitter and cannot separate the
//    band. This is the honest form of "we cannot tell yet", and it is a reason
//    NOT to spend compute on the twenty-third term for the sake of the exponent.
//
// 14. WHAT IS NOT ESTABLISHED, STATED SO IT IS NOT READ AS COVERAGE.
//    - The control's "truth = 1" is Maier and Pomerance's CONJECTURE. What is
//      PROVEN for h is exponent in [1, 2]: Rankin/Erdos below, Iwaniec 1978
//      above. The measured 1.272 sits inside that proven band, so the +0.272 is
//      a bias only if MP holds. Every bias-corrected number here inherits that.
//    - The falling ratio exponent in reading 7 is falling on shrinking windows,
//      and the shortest of them ([53,79], seven points) reads 0.178. That is
//      noise, not a trend continuing. The agreement with the certificate ladder
//      is what carries the reading, not the fall on its own.
//    - Log-space unweighted least squares is one estimator among several. The
//      -14.0% figure this attack was briefed with turns out to be the
//      LINEAR-space fit, which is nearly window-free (c = 0.9788 from every
//      window tried) because it is owned by the largest terms; the log-space one
//      reads -12.4% to -23.0% over the same windows. Both are defensible and
//      they are not the same measurement.
//    - No prior-art search was run in this attack: the session's web budget was
//      exhausted. The standing negative is research/SEARCH-CONVENTIONS.md
//      section 3, "Published asymptotic growth law for A144311? None", run in
//      the convention that OWNS the object (A144311's own wording, "the longest
//      sequence of consecutive integers, each equal to 1 or -1 modulo at least
//      one of the first n primes") rather than in ours, and marked settled there
//      with the instruction not to repeat it. Nothing here claims novelty beyond
//      what that row already licenses.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded run of this file does not
// contain verbatim actually is. No number above was changed.
//
// BORROWED, verified present in the named producer: the house bias +0.282 is
// the standing control-bias figure of research/exponent-control.md, whose
// table row "| 21 | 38 | 1.282 | 0.053 | 1.214 | 1.400 | +0.282 |" and whose
// text "The control's bias is +0.282" carry it; research/G2-STATE.md line 313
// repeats the same row. Nothing in this run prints it, and the point of
// reading 5 is precisely that this run's matched window gives +0.272 instead.
// The 2.8e10 years of exhaustive enumeration at x = 79 is
// research/attack-lower-bound.js, whose embedded run prints "A144311 cost
// 2.8e10 years of exhaustive enumeration at x = 79 already".
// ---------------------------------------------------------------------------
