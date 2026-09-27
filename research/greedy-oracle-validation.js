// ============================================================================
// IS THE CORRECTED GREEDY A G2 ORACLE? The decisive instrument test.
// (TODO item 1b. Companion report:
//  research/history/staging/greedy-oracle-validation.md)
// ============================================================================
//
// THE PRE-REGISTRATION, sealed in TODO.md item 1b BEFORE this run and quoted
// here verbatim, unedited:
//
//   "oracle established if greedy = optimum at >= 12 of 13 and >= 0.99 at all
//    13; oracle dead if the ratio degrades with x, in which case record the
//    degradation rate, which is itself the result."
//
// It was written when the corpus held THIRTEEN exact terms, x = 2..41. A
// fourteenth, G2(43#) = 618, landed afterwards. The rule is NOT rewritten. It
// is scored twice and both readings are printed: once on the thirteen terms it
// names, and once on all fourteen, so a miss at the newest level cannot hide in
// a denominator. The eight further exact optima from OEIS A144311 (levels
// nobody here measured) are scored in a THIRD, separate table and are never
// folded into the pre-registered verdict.
//
// WHAT IS BEING TESTED, precisely. By the CRT identity of
// research/two-class-lower-bounds.js (its header, and Chris's PAIRED collapse
// in research/attack2-rankin2d.js),
//
//    G2(x#) - 1  =  the largest m for which [1,m] can be covered by choosing,
//                   for each prime p <= x, one residue pair {a_p, a_p - 2}
//                   mod p, with a_p free.
//
// So G2 - 1 IS a covering optimum, and "does the greedy find it" is a question
// with an exact answer at every level where G2 is known. The greedy is scored
// against that optimum, never against an estimate of it.
//
// WHAT IS DELIBERATELY DIFFERENT FROM two-class-lower-bounds.js §1c. That
// script scores the extension levels at its own budget SCHEDULE, which drops
// 5.3x in restarts and 25x in call cap exactly at np = 16 (x = 53) - which is
// exactly where its ratios fall. Its own tail says so and calls the reading
// confounded. Here the budget is FIXED across every level of the ladder, so a
// falling ratio cannot be an artifact of a falling budget. Two uniform budgets
// are run, eight-to-one apart, so budget-limitation is measured rather than
// argued: a shortfall that closes when the budget rises 4x is budget, one that
// does not is structure.
//
// CUSTODY OF THE INSTRUMENT. The greedy, the verifier, the variant family and
// the repaired non-monotone search are NOT re-implemented here. They are
// EXTRACTED AS SOURCE TEXT from research/two-class-lower-bounds.js at run time
// and evaluated, and the sha256 of the extracted text is printed. A re-implementation
// would test a copy; this tests the instrument itself, and the hash says which
// bytes were tested. (research/two-class-lower-bounds.js is not a module: it
// runs its whole campaign at load, so require() is not available.)
//
// RUN
//   node research/greedy-oracle-validation.js
//   node research/greedy-oracle-validation.js --quick     the R=512 pass only
// About 11 minutes on a 10-core machine under load; the two ladders are
// 22 levels each and the top level dominates. Everything random is seeded from
// SEED_BASE and reproduces exactly.
// ============================================================================
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const REPO = path.resolve(__dirname, '..');
const QUICK = process.argv.includes('--quick');
const SEED_BASE = 20260818;             // the instrument's own seed base
const HR = '='.repeat(78);
const rule = () => console.log(HR);
const pad = (v, n) => String(v).padStart(n);
const secs = (t0) => ((Date.now() - t0) / 1000).toFixed(1) + ' s';

// ============================================================================
// 0. CUSTODY
// ============================================================================
rule();
console.log('0. CUSTODY: the instrument, the truth, and the seed');
rule();

// ---- 0a. extract the instrument's own functions, by source text -------------
const INSTR = path.join(REPO, 'research', 'two-class-lower-bounds.js');
const INSTR_TXT = fs.readFileSync(INSTR, 'utf8');
function grabFn(name) {
  const decl = 'function ' + name + '(';
  const i = INSTR_TXT.indexOf(decl);
  if (i < 0) throw new Error('instrument function not found: ' + name);
  let d = 0, k = INSTR_TXT.indexOf('{', i);
  for (;; k++) { const c = INSTR_TXT[k]; if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; } }
  return INSTR_TXT.slice(i, k + 1);
}
const FNAMES = ['mulberry32', 'greedyD2', 'verifyD2', 'mkVariants', 'searchMax', 'fit'];
const FSRC = FNAMES.map(grabFn).join('\n\n');
const FSHA = crypto.createHash('sha256').update(FSRC, 'utf8').digest('hex');
const INSTRSHA = crypto.createHash('sha256').update(INSTR_TXT, 'utf8').digest('hex');
const { mulberry32, greedyD2, verifyD2, mkVariants, searchMax, fit } =
  new Function(FSRC + '\nreturn {' + FNAMES.join(',') + '};')();

console.log('\n0a. the instrument, extracted as source text and evaluated here');
console.log('    source          research/two-class-lower-bounds.js');
console.log('    file sha256     ' + INSTRSHA);
console.log('    extracted       ' + FNAMES.join(', '));
console.log('    bytes           ' + FSRC.length);
console.log('    extract sha256  ' + FSHA);
console.log('    (nothing about the greedy, the verifier or the repaired search is');
console.log('     re-typed in this file. If the instrument changes, both hashes move.)');

// ---- 0b. the truth, parsed from the artifacts that own it -------------------
// OURS: research/exact-g2-ladder.js's LADDER, x = 2..43, direct enumeration of
// the primorial period (x <= 29) or the tile-major bit-parallel enumeration on
// two independent base wheels (31..43). Each carries a position certificate.
const LADDER_TXT = fs.readFileSync(path.join(REPO, 'research', 'exact-g2-ladder.js'), 'utf8');
const OURS = new Map();
for (const m of LADDER_TXT.matchAll(/\{\s*x:\s*(\d+),\s*g:\s*(\d+),/g)) OURS.set(+m[1], +m[2]);

// PUBLISHED: OEIS A144311 a(15)-a(22), x = 47..79. Carter 2008 opened the
// sequence; a(8)-a(16) Max Alekseyev 2009, a(17)-a(22) Jinyuan Wang 2024, by
// branch-and-bound over the residue choice per prime. A144311(n) IS G2 - 1, so
// these ARE covering optima and need no conversion.
// (research/SEARCH-CONVENTIONS.md S2, research/PRIOR-ART.md.)
const A144311 = new Map([[47, 707], [53, 869], [59, 965], [61, 1079],
                         [67, 1283], [71, 1397], [73, 1529], [79, 1709]]);

// the instrument's own copy of both, parsed so the two can be cross-checked
const G2E_TXT = INSTR_TXT.slice(INSTR_TXT.indexOf('const G2EXACT={'));
const G2E = new Map();
{
  const body = G2E_TXT.slice(0, G2E_TXT.indexOf('};') + 1).split('\n')
    .map(l => l.replace(/\/\/.*$/, '')).join('\n');
  for (const m of body.matchAll(/(\d+):(\d+)/g)) G2E.set(+m[1], +m[2]);
}

const OWNX = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43];   // measured here
const PREREGX = OWNX.filter(x => x <= 41);                            // the thirteen named
const PUBX = [47, 53, 59, 61, 67, 71, 73, 79];                        // A144311's eight
const OPT = new Map();
for (const x of OWNX) OPT.set(x, OURS.get(x) - 1);
for (const x of PUBX) OPT.set(x, A144311.get(x));

console.log('\n0b. the truth, parsed from the artifacts that own it (never retyped)');
console.log('    ours       research/exact-g2-ladder.js  LADDER, ' + OURS.size + ' terms, x = 2..43');
console.log('    published  OEIS A144311 a(15)-a(22),    ' + A144311.size + ' terms, x = 47..79');
console.log('    A144311(n) is G2 - 1 already, so the published levels ARE covering optima.');

// ---- 0c. self-tests ---------------------------------------------------------
console.log('\n0c. SELF-TESTS. A green table here is the licence to read anything below.');
const T = [];
const t = (name, got, want) => { const ok = String(got) === String(want); T.push(ok);
  console.log(`   [${ok ? 'PASS' : 'FAIL'}] ${name.padEnd(56)} ${String(got).padStart(8)}  (want ${want})`); };

function primesTo(N) { const s = new Uint8Array(N + 1), P = []; for (let i = 2; i <= N; i++) { if (!s[i]) { P.push(i); for (let j = i * i; j <= N; j += i) s[j] = 1; } } return P; }
const ALLP = primesTo(100);
const plistOf = (x) => ALLP.filter(p => p <= x);
// the instrument's own closed-form bracket seed, level-independent
const startD2s = (x) => Math.max(8, Math.round(x * Math.log(x) ** 2));

// T1. brute force G2(x#) straight off the tile, for the levels a period fits in
{
  let agree = 0;
  for (const x of [2, 3, 5, 7, 11, 13]) {
    const ps = plistOf(x); let W = 1; for (const p of ps) W *= p;
    const hole = new Uint8Array(W + 3).fill(1);
    for (const p of ps) for (let n = 0; n <= W + 2; n += p) hole[n] = 0;
    const slots = []; for (let n = 1; n <= W; n++) if (hole[n] && hole[n + 2]) slots.push(n);
    let mx = 0; for (let i = 1; i < slots.length; i++) mx = Math.max(mx, slots[i] - slots[i - 1]);
    mx = Math.max(mx, slots[0] + W - slots[slots.length - 1]);
    if (mx === OURS.get(x)) agree++;
  }
  t('brute-force G2(x#) = the ladder, x = 2,3,5,7,11,13', agree, 6);
}
// T2. the two independent copies of the truth agree, term by term
t('exact-g2-ladder.js = the instrument\'s G2EXACT, x <= 43',
  OWNX.filter(x => OURS.get(x) === G2E.get(x)).length, OWNX.length);
t('A144311 + 1 = the instrument\'s G2EXACT, x = 47..79',
  PUBX.filter(x => A144311.get(x) + 1 === G2E.get(x)).length, PUBX.length);
// T3. determinism, which is what makes a pasted tail mean anything
{
  const pl = plistOf(23);
  const a = greedyD2(150, pl, {}), b = greedyD2(150, pl, {});
  t('deterministic greedy is deterministic', a.prefix === b.prefix && a.ok === b.ok, true);
  const c = greedyD2(190, pl, { topK: 4, rnd: mulberry32(12345) });
  const d = greedyD2(190, pl, { topK: 4, rnd: mulberry32(12345) });
  t('seeded greedy reproduces from the same seed', c.prefix === d.prefix && c.ok === d.ok, true);
}
// T4. the verifier is not a rubber stamp: three negative controls
{
  const pl = plistOf(19);
  const r = searchMax(greedyD2, pl, mkVariants(64, SEED_BASE), { window: 40, grid: 12, start: 100 });
  const good = verifyD2(r.best, r.chosen, pl);
  t('verifier accepts a real certificate (uncovered cells)', good.bad, 0);
  const bent = r.chosen.map(([p, a], i) => i === 0 ? [p, (a + 1) % p] : [p, a]);
  t('verifier rejects one shifted class (uncovered > 0)', verifyD2(r.best, bent, pl).bad > 0, true);
  const dup = r.chosen.concat([[r.chosen[0][0], r.chosen[0][1]]]);
  t('verifier rejects a prime used twice', verifyD2(r.best, dup, pl).bad, -1);
  const alien = r.chosen.concat([[101, 0]]);
  t('verifier rejects a prime outside the allowed list', verifyD2(r.best, alien, pl).bad, -1);
}
// T5. feasibility in m really is NON-MONOTONE, re-measured here and not assumed.
// This is the whole reason a bisection, or a scan that halts at the first
// failure, is wrong: both read the first hole as the ceiling. An exhaustive
// scan of the 100 targets below the reached maximum, at every variant in the
// family, is what decides it, and one hole anywhere is enough.
{
  let levelsWithHoles = 0;
  for (const x of [23, 31, 37]) {
    const pl = plistOf(x), V = mkVariants(512, SEED_BASE);
    const top = searchMax(greedyD2, pl, V, { window: 200, grid: 24, start: startD2s(x) }).best;
    let nInf = 0, run = 0, mx = 0;
    for (let m = Math.max(1, top - 100); m < top; m++) {
      let ok = false; for (const f of V) if (greedyD2(m, pl, f()).ok) { ok = true; break; }
      if (!ok) { nInf++; run++; if (run > mx) mx = run; } else run = 0;
    }
    if (nInf > 0) levelsWithHoles++;
    console.log(`          x = ${String(x).padStart(2)}: max reached ${String(top).padStart(4)},` +
                ` ${String(nInf).padStart(3)} infeasible m in the 100 below it, longest run ${mx}`);
  }
  t('at least one level has an infeasible m below its own maximum', levelsWithHoles > 0, true);
}
console.log(`\n   ${T.filter(Boolean).length} of ${T.length} self-tests pass.`);

// ============================================================================
// 1. THE ORACLE TEST
// ============================================================================
console.log('\n' + HR);
console.log('1. THE ORACLE TEST: the corrected greedy against every exact optimum');
rule();
console.log(`
   PRE-REGISTERED RULE, quoted verbatim from TODO.md item 1b and not rewritten:

     "oracle established if greedy = optimum at >= 12 of 13 and >= 0.99 at all
      13; oracle dead if the ratio degrades with x, in which case record the
      degradation rate, which is itself the result."

   BUDGET. Fixed across every level of each ladder, chosen before the ladder ran
   and never tuned per level. Two uniform budgets, four apart in restarts:
     A (headline)  R = 2048 restarts, window W = 200, grid NG = 24, cap 3e6 calls
     B (control)   R =  512 restarts, window W = 200, grid NG = 24, cap 3e6 calls
   B is exactly the instrument's own np <= 15 schedule row, applied to ALL levels
   instead of only the small ones. The bracket seed is the instrument's closed
   form in x alone, start = x (ln x)^2, so no level is seeded from another.
   Every row is replay-verified: the emitted (p, a_p) are re-covered from scratch
   by verifyD2, which the negative controls above show is not a rubber stamp.
`);

const startD2 = startD2s;
const BUDGETS = QUICK ? [{ tag: 'B', R: 512 }] : [{ tag: 'A', R: 2048 }, { tag: 'B', R: 512 }];
const RES = new Map();   // tag -> Map(x -> {best, ratio, calls, capped, secs})

for (const B of BUDGETS) {
  const M = new Map(); RES.set(B.tag, M);
  console.log(`\n1${B.tag === 'A' ? 'a' : 'b'}. BUDGET ${B.tag}: R = ${B.R} restarts, W = 200, NG = 24, cap 3e6 calls, UNIFORM.`);
  console.log('      x   np   truth      G2(x#)   optimum   greedy   short   ratio   replay   direct    from   calls    time');
  let viaPrefix = 0;
  for (const x of OWNX.concat(PUBX)) {
    const t0 = Date.now(), pl = plistOf(x), opt = OPT.get(x);
    // The runner is wrapped so the search records HOW it got there, at no cost:
    // `direct` is the largest target the family ever covered outright, `from`
    // is the target whose run produced the winning prefix. A failure at target
    // t still exhibits a legal (a_p) covering [1, prefix], so the two are both
    // certificates and only one of them is a cover of its own target.
    let direct = 0, fromM = 0, fromP = 0;
    const runner = (m, p, o) => { const r = greedyD2(m, p, o);
      if (r.ok && m > direct) direct = m;
      if (r.prefix > fromP) { fromP = r.prefix; fromM = m; }
      return r; };
    const r = searchMax(runner, pl, mkVariants(B.R, SEED_BASE),
                        { window: 200, grid: 24, start: startD2(x), maxCalls: 3e6 });
    const v = verifyD2(r.best, r.chosen, pl);
    const ratio = r.best / opt;
    const prefixWon = r.best > direct;
    if (prefixWon) viaPrefix++;
    M.set(x, { best: r.best, ratio, calls: r.calls, capped: r.capped, bad: v.bad, direct, fromM, prefixWon });
    const truth = OURS.has(x) ? 'ours ' : 'A1443';
    console.log([pad(x, 7), pad(pl.length, 4), '  ' + truth,
      pad(OURS.has(x) ? OURS.get(x) : opt + 1, 8), pad(opt, 9), pad(r.best, 8),
      pad(opt - r.best, 7), '  ' + ratio.toFixed(4),
      (v.bad === 0 ? '   OK ' : ' FAIL ' + (v.err || v.bad)),
      pad(direct, 7), pad(prefixWon ? fromM : '-', 7),
      pad(r.calls + (r.capped ? '*' : ''), 8),
      (r.best > opt ? ' *** EXCEEDS THE OPTIMUM, IMPOSSIBLE ***' : ''),
      secs(t0)].join(' '));
  }
  console.log(`      "direct" = the largest target the variant family covered OUTRIGHT at this level.`);
  console.log(`      "from"   = the target whose FAILED run left the winning prefix, blank when the`);
  console.log(`                 answer was a cover of its own target. At budget ${B.tag} the answer came from a`);
  console.log(`                 prefix rather than a cover at ${viaPrefix} of the ${OWNX.length + PUBX.length} levels.`);
}

// ============================================================================
// 2. THE VERDICT
// ============================================================================
console.log('\n' + HR);
console.log('2. THE VERDICT UNDER THE PRE-REGISTERED RULE');
rule();
const A = RES.get('A') || RES.get('B');
const HEAD = RES.has('A') ? 'A (R = 2048)' : 'B (R = 512)';
console.log('\n   Scored on budget ' + HEAD + '. Three readings, printed together.\n');
function score(label, xs) {
  const nOpt = xs.filter(x => A.get(x).best === OPT.get(x)).length;
  const rs = xs.map(x => A.get(x).ratio);
  const mn = Math.min(...rs);
  const worst = xs[rs.indexOf(mn)];
  console.log(`   ${label}`);
  console.log(`     exact at ${nOpt} of ${xs.length}; minimum ratio ${mn.toFixed(4)} (at x = ${worst}); mean ratio ${(rs.reduce((a, b) => a + b, 0) / rs.length).toFixed(4)}`);
  return { nOpt, n: xs.length, mn, worst };
}
const s13 = score('READING 1 - the thirteen terms the rule names, x = 2..41:', PREREGX);
const s14 = score('READING 2 - all fourteen terms measured here, x = 2..43:', OWNX);
const sPB = score('READING 3 - the eight A144311 optima, x = 47..79 (NOT in the rule):', PUBX);

const verdict = (s, need) => (s.nOpt >= need && s.mn >= 0.99) ? 'ESTABLISHED' : 'NOT ESTABLISHED';
console.log('\n   The rule has two clauses. Clause 1, the counting clause:');
console.log(`     13-term reading: exact at ${s13.nOpt} of 13, need >= 12; min ratio ${s13.mn.toFixed(4)}, need >= 0.99  -> ${verdict(s13, 12)}`);
console.log(`     14-term reading: exact at ${s14.nOpt} of 14, need >= 12; min ratio ${s14.mn.toFixed(4)}, need >= 0.99  -> ${verdict(s14, 12)}`);
console.log('   (The count threshold is the literal 12 in both readings. Rescaling it to');
console.log('    13-of-14 would be rewriting a sealed rule in the oracle\'s favour, and the');
console.log('    14-term reading is reported so the rule cannot be gamed the other way.)');

// ============================================================================
// 3. CLAUSE 2: DOES THE RATIO DEGRADE WITH x?
// ============================================================================
console.log('\n' + HR);
console.log('3. CLAUSE 2 OF THE RULE: does the ratio DEGRADE with x, and how fast?');
rule();
console.log(`
   The rule kills the oracle if the ratio degrades. That is a slope question, so
   it needs a band, and with n this small one point can carry a slope. Three
   numbers per fit: OLS slope, its standard error from the residuals, and the
   full leave-one-out range, which is the honest small-sample band.
`);
function regress(label, pts) {
  // pts: [x, ratio]. log-log, the corpus's convention for this estimator.
  const n = pts.length;
  const X = pts.map(p => Math.log(p[0])), Y = pts.map(p => Math.log(p[1]));
  const sl = (xs, ys) => { const k = xs.length; let sx = 0, sy = 0, sxx = 0, sxy = 0;
    for (let i = 0; i < k; i++) { sx += xs[i]; sy += ys[i]; sxx += xs[i] * xs[i]; sxy += xs[i] * ys[i]; }
    const b = (k * sxy - sx * sy) / (k * sxx - sx * sx); return [b, (sy - b * sx) / k]; };
  const [b, a] = sl(X, Y);
  let sse = 0; for (let i = 0; i < n; i++) { const e = Y[i] - (a + b * X[i]); sse += e * e; }
  const mx = X.reduce((u, v) => u + v, 0) / n;
  let sxx = 0; for (const v of X) sxx += (v - mx) ** 2;
  const se = n > 2 ? Math.sqrt(sse / (n - 2) / sxx) : NaN;
  // THE se ABOVE ASSUMES INDEPENDENT RESIDUALS, AND LADDER RESIDUALS ARE NOT
  // (measured here 2026-08-20). These points are nested rungs of one ladder:
  // level x+1 contains level x's primes, so consecutive residuals are
  // correlated, and an OLS se computed as if they were independent is too
  // small. redteam-growth-aicc.js §3 measured lag-1 from -0.150 to +0.773
  // across ten families on this same ladder and prices the deflator explicitly;
  // this fit's own lag-1 had never been measured, and a SIGN verdict rides on
  // the +-1.96 se band below. The AR(1) deflator is the one that file uses,
  // n_eff = n(1-r)/(1+r), so the slope's se inflates by sqrt((1+r)/(1-r)).
  const res = []; for (let i = 0; i < n; i++) res.push(Y[i] - (a + b * X[i]));
  const m0 = res.reduce((u, v) => u + v, 0) / n;
  let acNum = 0, acDen = 0;
  for (let i = 0; i < n; i++) { acDen += (res[i] - m0) ** 2; if (i) acNum += (res[i] - m0) * (res[i - 1] - m0); }
  // A fit whose residuals are identically zero (the rule's own scope is exactly
  // that: greedy equals the optimum at all eight levels, slope 0.00000, se
  // 0.00000) has no autocorrelation to price and no sign to verify. Say so
  // rather than dividing by nothing and printing a verdict about a fit that
  // does not exist.
  const flat = !(acDen > 0);
  const ac1 = flat ? NaN : acNum / acDen;
  const vif = flat ? 1 : (ac1 < 1 ? (1 + ac1) / (1 - ac1) : Infinity);
  const seAR = se * Math.sqrt(Math.max(vif, 1));
  // the lag-1 at which zero would enter the +-1.96 se band, i.e. how much room
  // the sign verdict actually has. |b| = 1.96*se*sqrt((1+r)/(1-r))  =>  r*.
  const fNeed = se > 0 ? Math.abs(b) / (1.96 * se) : Infinity;
  const acFlip = Number.isFinite(fNeed) ? (fNeed * fNeed - 1) / (fNeed * fNeed + 1) : NaN;
  const jk = [];
  for (let i = 0; i < n; i++) jk.push(sl(X.filter((_, j) => j !== i), Y.filter((_, j) => j !== i))[0]);
  console.log(`   ${label}`);
  console.log(`     n = ${n}, x in [${pts[0][0]}, ${pts[n - 1][0]}]`);
  console.log(`     log-log slope  ${b >= 0 ? '+' : ''}${b.toFixed(5)}   se ${se.toFixed(5)}   band +-1.96 se = [${(b - 1.96 * se).toFixed(5)}, ${(b + 1.96 * se).toFixed(5)}]`);
  if (flat) {
    console.log('     residual lag-1 autocorrelation: the residuals are identically zero, so there is');
    console.log('     no autocorrelation to price and no sign to verify. The fit is exact, not significant.');
  } else {
    console.log(`     residual lag-1 autocorrelation ${ac1 >= 0 ? '+' : ''}${ac1.toFixed(5)}   AR(1) VIF ${vif.toFixed(3)}   se x${Math.sqrt(Math.max(vif, 1)).toFixed(3)} = ${seAR.toFixed(5)}`);
    console.log(`     band on the AR(1)-corrected se = [${(b - 1.96 * seAR).toFixed(5)}, ${(b + 1.96 * seAR).toFixed(5)}]  ->  zero is ${(b - 1.96 * seAR) * (b + 1.96 * seAR) > 0 ? 'OUTSIDE it, the sign verdict SURVIVES' : 'INSIDE it, the sign verdict DOES NOT survive'}`);
    console.log(`     zero would enter the band at lag-1 ${acFlip.toFixed(5)}, i.e. ${(acFlip - ac1).toFixed(5)} above the measured one`);
  }
  console.log(`     leave-one-out slopes in [${Math.min(...jk).toFixed(5)}, ${Math.max(...jk).toFixed(5)}]`);
  console.log(`     ratio the fit reads at x = 41: ${(Math.exp(a) * Math.pow(41, b)).toFixed(4)};  at x = 79: ${(Math.exp(a) * Math.pow(79, b)).toFixed(4)};  at x = 229: ${(Math.exp(a) * Math.pow(229, b)).toFixed(4)}`);
  return { b, se, ac1, vif, seAR, flat, acFlip, lo: Math.min(...jk), hi: Math.max(...jk) };
}
const P13 = PREREGX.filter(x => x >= 13).map(x => [x, A.get(x).ratio]);
const P14 = OWNX.filter(x => x >= 13).map(x => [x, A.get(x).ratio]);
const PAL = OWNX.concat(PUBX).filter(x => x >= 13).map(x => [x, A.get(x).ratio]);
const r13 = regress('over the thirteen-term range, x = 13..41 (the rule\'s own scope):', P13);
const r14 = regress('over the fourteen-term range, x = 13..43:', P14);
const rAL = regress('over every exact level, x = 13..79 (13 measured + 8 published):', PAL);
console.log('\n   The shortfall itself, optimum - greedy, level by level (budget ' + HEAD + '):');
console.log('      x  ' + OWNX.concat(PUBX).filter(x => x >= 13).map(x => pad(x, 5)).join(''));
console.log('    gap  ' + OWNX.concat(PUBX).filter(x => x >= 13).map(x => pad(OPT.get(x) - A.get(x).best, 5)).join(''));
console.log(`\n   DEGRADATION VERDICT: over the rule's own scope the slope is ${r13.b >= 0 ? '+' : ''}${r13.b.toFixed(5)}`);
console.log(`   with a +-1.96 se band of [${(r13.b - 1.96 * r13.se).toFixed(5)}, ${(r13.b + 1.96 * r13.se).toFixed(5)}]; over all exact levels it is ${rAL.b.toFixed(5)},`);
console.log(`   band [${(rAL.b - 1.96 * rAL.se).toFixed(5)}, ${(rAL.b + 1.96 * rAL.se).toFixed(5)}]. Sign, not size, is what the rule asks for.`);
console.log(`   AND THE SIGN CALL IS AN INDEPENDENCE CLAIM, so it is priced here rather than assumed.`);
console.log(`   Ladder rungs are nested, level x+1 contains level x's primes, so the OLS se above`);
console.log(`   treats correlated residuals as independent draws. Over the rule's own scope there is`);
console.log(`   ${r13.flat ? 'nothing to price: every residual is exactly zero and the slope is exactly zero.' : 'lag-1 ' + r13.ac1.toFixed(4) + ', VIF ' + r13.vif.toFixed(3) + '.'}`);
console.log(`   Over all exact levels lag-1 is ${rAL.ac1 >= 0 ? '+' : ''}${rAL.ac1.toFixed(5)}, VIF ${rAL.vif.toFixed(3)}, se x${Math.sqrt(rAL.vif).toFixed(3)}, and the`);
console.log(`   corrected band is [${(rAL.b - 1.96 * rAL.seAR).toFixed(5)}, ${(rAL.b + 1.96 * rAL.seAR).toFixed(5)}] -> ${(rAL.b - 1.96 * rAL.seAR) * (rAL.b + 1.96 * rAL.seAR) > 0 ? 'zero stays OUTSIDE and the sign verdict SURVIVES' : 'ZERO ENTERS and the sign verdict does NOT survive'}.`);
console.log(`   The margin is thin and it is now on the record: zero enters at lag-1 ${rAL.acFlip.toFixed(5)},`);
console.log(`   which is ${(rAL.acFlip - rAL.ac1).toFixed(5)} above what this ladder measures.`);

// ============================================================================
// 4. BUDGET OR STRUCTURE? The two uniform ladders, differenced.
// ============================================================================
if (RES.has('A') && RES.has('B')) {
  console.log('\n' + HR);
  console.log('4. IS A SHORTFALL BUDGET OR STRUCTURE? The two uniform ladders, differenced');
  rule();
  console.log(`
   A shortfall that CLOSES when the restart count rises 4x, at a fixed rule, is
   the search budget. One that does not move is the greedy rule itself. This is
   the discriminating test the instrument's own tail asks for and cannot run,
   because its extension levels sit on a different schedule row from its
   measured ones.
`);
  console.log('      x   optimum   R=512   R=2048   gained   still short   verdict at this level');
  for (const x of OWNX.concat(PUBX)) {
    const b = RES.get('B').get(x), a = RES.get('A').get(x), opt = OPT.get(x);
    const v = (a.best === opt) ? (b.best === opt ? 'exact at both budgets' : 'BUDGET: 4x restarts closed it')
            : (a.best > b.best ? 'still moving with budget' : 'no movement from 4x restarts');
    console.log([pad(x, 7), pad(opt, 9), pad(b.best, 7), pad(a.best, 8),
      pad(a.best - b.best, 8), pad(opt - a.best, 13), '   ' + v].join(' '));
  }
}

// ============================================================================
// 5. THE BUDGET LAW: how many restarts does the optimum itself cost?
// ============================================================================
console.log('\n' + HR);
console.log('5. THE BUDGET LAW, which is what governs whether the oracle EXTENDS');
rule();
console.log(`
   The ratio is not the number that governs a ladder past enumeration. This one
   is: at the optimum's OWN target m = G2 - 1, how many seeded restarts before
   the first cover? Median over 9 independent seed bases, cap ${QUICK ? 2000 : 6000} restarts.
   Censored means the cap was hit and the optimum was never reached.

   READ THIS TABLE AS A PESSIMISTIC PROXY, and S1a's "from" column is why. The
   search does not only cover targets; a FAILED run at a larger target leaves a
   covered prefix, which is a legal certificate for that prefix. So a level can
   be censored here - no seed base covers m = G2 - 1 as a target - while the
   ladder above still reaches G2 - 1, by prefix. Where that happens, "from"
   names the target that did it. The censoring below is therefore a lower bound
   on the search's reach and an upper bound on nothing.
`);
const KS = [4, 2, 3, 5], CAP = QUICK ? 2000 : 6000, TR = 9;
console.log('      x   np   optimum   median restarts to first hit   censored');
const bl = [];
for (const x of [13, 17, 19, 23, 29, 31, 37, 41, 43, 47]) {
  const pl = plistOf(x), M = OPT.get(x), hits = [];
  for (let tr = 0; tr < TR; tr++) {
    let n = CAP;
    for (let s = 0; s < CAP; s++) {
      const seed = ((SEED_BASE + tr * 104729) ^ Math.imul(s + 1, 2654435761)) >>> 0;
      if (greedyD2(M, pl, { topK: KS[s % 4], rnd: mulberry32(seed) }).ok) { n = s + 1; break; }
    }
    hits.push(n);
  }
  hits.sort((a, b) => a - b);
  const med = hits[Math.floor(TR / 2)], cens = hits.filter(h => h >= CAP).length;
  const medCens = med >= CAP;                 // the median itself hit the cap
  if (!medCens) bl.push([pl.length, med]);
  console.log(`   ${pad(x, 5)} ${pad(pl.length, 4)} ${pad(M, 9)} ${pad(med + (medCens ? '+ (never)' : ''), 25)}   ${cens ? cens + ' of ' + TR : '-'}`);
}
if (bl.length >= 2) {
  let sx = 0, sy = 0, sxx = 0, sxy = 0; const n = bl.length;
  for (const [k, v] of bl) { sx += k; sy += Math.log(v); sxx += k * k; sxy += k * Math.log(v); }
  const sl = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  console.log(`\n   Over the ${n} uncensored levels, log(median restarts) rises ${sl.toFixed(4)} per added prime,`);
  console.log(`   a factor of ${Math.exp(sl).toFixed(2)} per prime. At that rate the restarts needed at x = 229`);
  console.log(`   (50 primes) are 10^${((50 - bl[bl.length - 1][0]) * sl / Math.LN10).toFixed(0)} times what the last uncensored level needed.`);
}

// ============================================================================
// 6. THE SIXTEEN Y2 LEVELS
// ============================================================================
console.log('\n' + HR);
console.log('6. THE SIXTEEN Y2 LEVELS: SKIPPED, and the cost that skips them');
rule();
console.log(`
   TODO 1b also asks for the sixteen Y2 levels recomputed with the corrected
   instrument. They are NOT recomputed here, and this is a cost decision stated
   rather than a result withheld. The corrected instrument already owns that
   ladder - research/two-class-lower-bounds.js S2+3 - and its header records the
   price on the same class of machine: about 235 minutes for the sixteen levels,
   of which x = 4001 alone is 71. Every level is independent since the level
   chaining was removed, so the ladder shards:

     node research/two-class-lower-bounds.js --ladder-only --levels=4001
     node research/two-class-lower-bounds.js --ladder-only --levels=3001
     ... one process per level, wall clock = the longest rung, not the sum.

   The measured cost HERE is what makes that decision, and it is printed above:
   the 22-level exact ladder at R = 2048 is the whole compute budget of this run,
   and x = 79 alone - 22 primes - is its largest rung. x = 4001 carries 550
   primes. Adding the sixteen Y2 levels to this script would multiply its runtime
   by roughly twentyfold and would produce numbers the instrument already
   produces, at the instrument's schedule rather than at a fixed budget.

   WHAT THIS RUN SAYS ABOUT THOSE SIXTEEN NUMBERS ANYWAY, and it is the point of
   S5: every one of them is a CERTIFIED LOWER BOUND on G2(x#) - 1 and none is an
   estimate of it. S5 measures the restart budget the optimum costs, per added
   prime, on the only levels where the optimum is knowable, and S1a's "from"
   column says that budget is a pessimistic proxy for the search's real reach.
   The Y2 ladder runs at
   a schedule that FALLS with np while that requirement RISES with np. The two
   move in opposite directions, so nothing measured here transfers up the ladder,
   and the fidelity of Y2 above the exact frontier remains unmeasured by this run
   or by any other.
`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/greedy-oracle-validation.js
//   invocation:  node research/greedy-oracle-validation.js
//   code-sha256: 93e3cf533257f6f225a0f98a3a3a5c78c96b2c11ef59adaffc7622fbddc0ff61
//   out-sha256:  d35a21ec155f7c0f3c0d1c3d5facf95aea5ba08139f6c0428c5505e5880c59ba
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     811.5 s
// ============================================================================
// ==============================================================================
// 0. CUSTODY: the instrument, the truth, and the seed
// ==============================================================================
//
// 0a. the instrument, extracted as source text and evaluated here
//     source          research/two-class-lower-bounds.js
//     file sha256     726e5a4bef8f8241295d37b264ba575486cb5aaba76b37550c1d06d2004f4023
//     extracted       mulberry32, greedyD2, verifyD2, mkVariants, searchMax, fit
//     bytes           4971
//     extract sha256  d89573d36a947f9f30423860dd1e4ac5abef721b44cd7c6e70e4708933a81044
//     (nothing about the greedy, the verifier or the repaired search is
//      re-typed in this file. If the instrument changes, both hashes move.)
//
// 0b. the truth, parsed from the artifacts that own it (never retyped)
//     ours       research/exact-g2-ladder.js  LADDER, 14 terms, x = 2..43
//     published  OEIS A144311 a(15)-a(22),    8 terms, x = 47..79
//     A144311(n) is G2 - 1 already, so the published levels ARE covering optima.
//
// 0c. SELF-TESTS. A green table here is the licence to read anything below.
//    [PASS] brute-force G2(x#) = the ladder, x = 2,3,5,7,11,13              6  (want 6)
//    [PASS] exact-g2-ladder.js = the instrument's G2EXACT, x <= 43         14  (want 14)
//    [PASS] A144311 + 1 = the instrument's G2EXACT, x = 47..79              8  (want 8)
//    [PASS] deterministic greedy is deterministic                        true  (want true)
//    [PASS] seeded greedy reproduces from the same seed                  true  (want true)
//    [PASS] verifier accepts a real certificate (uncovered cells)           0  (want 0)
//    [PASS] verifier rejects one shifted class (uncovered > 0)           true  (want true)
//    [PASS] verifier rejects a prime used twice                            -1  (want -1)
//    [PASS] verifier rejects a prime outside the allowed list              -1  (want -1)
//           x = 23: max reached  203,   0 infeasible m in the 100 below it, longest run 0
//           x = 31: max reached  347,  12 infeasible m in the 100 below it, longest run 7
//           x = 37: max reached  527,  10 infeasible m in the 100 below it, longest run 1
//    [PASS] at least one level has an infeasible m below its own maximum     true  (want true)
//
//    10 of 10 self-tests pass.
//
// ==============================================================================
// 1. THE ORACLE TEST: the corrected greedy against every exact optimum
// ==============================================================================
//
//    PRE-REGISTERED RULE, quoted verbatim from TODO.md item 1b and not rewritten:
//
//      "oracle established if greedy = optimum at >= 12 of 13 and >= 0.99 at all
//       13; oracle dead if the ratio degrades with x, in which case record the
//       degradation rate, which is itself the result."
//
//    BUDGET. Fixed across every level of each ladder, chosen before the ladder ran
//    and never tuned per level. Two uniform budgets, four apart in restarts:
//      A (headline)  R = 2048 restarts, window W = 200, grid NG = 24, cap 3e6 calls
//      B (control)   R =  512 restarts, window W = 200, grid NG = 24, cap 3e6 calls
//    B is exactly the instrument's own np <= 15 schedule row, applied to ALL levels
//    instead of only the small ones. The bracket seed is the instrument's closed
//    form in x alone, start = x (ln x)^2, so no level is seeded from another.
//    Every row is replay-verified: the emitted (p, a_p) are re-covered from scratch
//    by verifyD2, which the negative controls above show is not a rubber stamp.
//
//
// 1a. BUDGET A: R = 2048 restarts, W = 200, NG = 24, cap 3e6 calls, UNIFORM.
//       x   np   truth      G2(x#)   optimum   greedy   short   ratio   replay   direct    from   calls    time
//       2    1   ours         2         1        1       0   1.0000    OK        1       -   418201  0.2 s
//       3    2   ours         6         5        5       0   1.0000    OK        5       -   414101  0.4 s
//       5    3   ours        12        11       11       0   1.0000    OK        8      13   414101  0.6 s
//       7    4   ours        30        29       29       0   1.0000    OK       27      45   412052  0.8 s
//      11    5   ours        42        41       41       0   1.0000    OK       39      63   414101  1.3 s
//      13    6   ours        66        65       65       0   1.0000    OK       53      86   414101  1.8 s
//      17    7   ours       108       107      107       0   1.0000    OK       85     136   414101  2.6 s
//      19    8   ours       150       149      149       0   1.0000    OK      103     165   414101  3.6 s
//      23    9   ours       204       203      203       0   1.0000    OK      203       -   822148  9.4 s
//      29   10   ours       258       257      257       0   1.0000    OK      257       -   787926  11.6 s
//      31   11   ours       348       347      347       0   1.0000    OK      228     364   461251  8.8 s
//      37   12   ours       528       527      527       0   1.0000    OK      518     554   455410  12.3 s
//      41   13   ours       546       545      545       0   1.0000    OK      353     629   463301  14.1 s
//      43   14   ours       618       617      617       0   1.0000    OK      604     759   869677  30.8 s
//      47   15   A1443      708       707      704       3   0.9958    OK      701     728   868839  36.1 s
//      53   16   A1443      870       869      869       0   1.0000    OK      854    1046  1278255  64.0 s
//      59   17   A1443      966       965      953      12   0.9876    OK      910     989   868480  51.0 s
//      61   18   A1443     1080      1079     1074       5   0.9954    OK     1050    1215   868952  59.0 s
//      67   19   A1443     1284      1283     1228      55   0.9571    OK     1228       -   849094  66.6 s
//      71   20   A1443     1398      1397     1313      84   0.9399    OK     1297    1385   865355  77.1 s
//      73   21   A1443     1530      1529     1487      42   0.9725    OK     1487       -   865957  89.1 s
//      79   22   A1443     1710      1709     1635      74   0.9567    OK     1635       -   793923  91.3 s
//       "direct" = the largest target the variant family covered OUTRIGHT at this level.
//       "from"   = the target whose FAILED run left the winning prefix, blank when the
//                  answer was a cover of its own target. At budget A the answer came from a
//                  prefix rather than a cover at 15 of the 22 levels.
//
// 1b. BUDGET B: R = 512 restarts, W = 200, NG = 24, cap 3e6 calls, UNIFORM.
//       x   np   truth      G2(x#)   optimum   greedy   short   ratio   replay   direct    from   calls    time
//       2    1   ours         2         1        1       0   1.0000    OK        1       -   104857  0.1 s
//       3    2   ours         6         5        5       0   1.0000    OK        5       -   103829  0.1 s
//       5    3   ours        12        11       11       0   1.0000    OK        8      13   103829  0.1 s
//       7    4   ours        30        29       29       0   1.0000    OK       27      45   103316  0.2 s
//      11    5   ours        42        41       41       0   1.0000    OK       39      63   103829  0.3 s
//      13    6   ours        66        65       65       0   1.0000    OK       53      86   103829  0.5 s
//      17    7   ours       108       107      107       0   1.0000    OK       85     136   103829  0.7 s
//      19    8   ours       150       149      149       0   1.0000    OK      103     165   103829  0.9 s
//      23    9   ours       204       203      203       0   1.0000    OK      203       -   206212  2.3 s
//      29   10   ours       258       257      257       0   1.0000    OK      254     265   196996  2.8 s
//      31   11   ours       348       347      347       0   1.0000    OK      344     364   203595  3.8 s
//      37   12   ours       528       527      527       0   1.0000    OK      527       -   216340  5.4 s
//      41   13   ours       546       545      545       0   1.0000    OK      353     625   218965  6.4 s
//      43   14   ours       618       617      611       6   0.9903    OK      580     770   218460  7.5 s
//      47   15   A1443      708       707      701       6   0.9915    OK      686     726   215749  8.8 s
//      53   16   A1443      870       869      836      33   0.9620    OK      835    1008   218081  10.8 s
//      59   17   A1443      966       965      953      12   0.9876    OK      924    1079   210557  12.1 s
//      61   18   A1443     1080      1079     1028      51   0.9527    OK     1028       -   214746  14.7 s
//      67   19   A1443     1284      1283     1211      72   0.9439    OK     1202    1297   211382  16.8 s
//      71   20   A1443     1398      1397     1313      84   0.9399    OK     1244    1395   216631  19.7 s
//      73   21   A1443     1530      1529     1487      42   0.9725    OK     1487       -   217765  22.8 s
//      79   22   A1443     1710      1709     1635      74   0.9567    OK     1635       -   205569  24.2 s
//       "direct" = the largest target the variant family covered OUTRIGHT at this level.
//       "from"   = the target whose FAILED run left the winning prefix, blank when the
//                  answer was a cover of its own target. At budget B the answer came from a
//                  prefix rather than a cover at 15 of the 22 levels.
//
// ==============================================================================
// 2. THE VERDICT UNDER THE PRE-REGISTERED RULE
// ==============================================================================
//
//    Scored on budget A (R = 2048). Three readings, printed together.
//
//    READING 1 - the thirteen terms the rule names, x = 2..41:
//      exact at 13 of 13; minimum ratio 1.0000 (at x = 2); mean ratio 1.0000
//    READING 2 - all fourteen terms measured here, x = 2..43:
//      exact at 14 of 14; minimum ratio 1.0000 (at x = 2); mean ratio 1.0000
//    READING 3 - the eight A144311 optima, x = 47..79 (NOT in the rule):
//      exact at 1 of 8; minimum ratio 0.9399 (at x = 71); mean ratio 0.9756
//
//    The rule has two clauses. Clause 1, the counting clause:
//      13-term reading: exact at 13 of 13, need >= 12; min ratio 1.0000, need >= 0.99  -> ESTABLISHED
//      14-term reading: exact at 14 of 14, need >= 12; min ratio 1.0000, need >= 0.99  -> ESTABLISHED
//    (The count threshold is the literal 12 in both readings. Rescaling it to
//     13-of-14 would be rewriting a sealed rule in the oracle's favour, and the
//     14-term reading is reported so the rule cannot be gamed the other way.)
//
// ==============================================================================
// 3. CLAUSE 2 OF THE RULE: does the ratio DEGRADE with x, and how fast?
// ==============================================================================
//
//    The rule kills the oracle if the ratio degrades. That is a slope question, so
//    it needs a band, and with n this small one point can carry a slope. Three
//    numbers per fit: OLS slope, its standard error from the residuals, and the
//    full leave-one-out range, which is the honest small-sample band.
//
//    over the thirteen-term range, x = 13..41 (the rule's own scope):
//      n = 8, x in [13, 41]
//      log-log slope  +0.00000   se 0.00000   band +-1.96 se = [0.00000, 0.00000]
//      residual lag-1 autocorrelation: the residuals are identically zero, so there is
//      no autocorrelation to price and no sign to verify. The fit is exact, not significant.
//      leave-one-out slopes in [0.00000, 0.00000]
//      ratio the fit reads at x = 41: 1.0000;  at x = 79: 1.0000;  at x = 229: 1.0000
//    over the fourteen-term range, x = 13..43:
//      n = 9, x in [13, 43]
//      log-log slope  +0.00000   se 0.00000   band +-1.96 se = [0.00000, 0.00000]
//      residual lag-1 autocorrelation: the residuals are identically zero, so there is
//      no autocorrelation to price and no sign to verify. The fit is exact, not significant.
//      leave-one-out slopes in [0.00000, 0.00000]
//      ratio the fit reads at x = 41: 1.0000;  at x = 79: 1.0000;  at x = 229: 1.0000
//    over every exact level, x = 13..79 (13 measured + 8 published):
//      n = 17, x in [13, 79]
//      log-log slope  -0.02353   se 0.00706   band +-1.96 se = [-0.03736, -0.00970]
//      residual lag-1 autocorrelation +0.46629   AR(1) VIF 2.747   se x1.658 = 0.01170
//      band on the AR(1)-corrected se = [-0.04646, -0.00061]  ->  zero is OUTSIDE it, the sign verdict SURVIVES
//      zero would enter the band at lag-1 0.48644, i.e. 0.02015 above the measured one
//      leave-one-out slopes in [-0.02830, -0.01851]
//      ratio the fit reads at x = 41: 0.9875;  at x = 79: 0.9724;  at x = 229: 0.9483
//
//    The shortfall itself, optimum - greedy, level by level (budget A (R = 2048)):
//       x     13   17   19   23   29   31   37   41   43   47   53   59   61   67   71   73   79
//     gap      0    0    0    0    0    0    0    0    0    3    0   12    5   55   84   42   74
//
//    DEGRADATION VERDICT: over the rule's own scope the slope is +0.00000
//    with a +-1.96 se band of [0.00000, 0.00000]; over all exact levels it is -0.02353,
//    band [-0.03736, -0.00970]. Sign, not size, is what the rule asks for.
//    AND THE SIGN CALL IS AN INDEPENDENCE CLAIM, so it is priced here rather than assumed.
//    Ladder rungs are nested, level x+1 contains level x's primes, so the OLS se above
//    treats correlated residuals as independent draws. Over the rule's own scope there is
//    nothing to price: every residual is exactly zero and the slope is exactly zero.
//    Over all exact levels lag-1 is +0.46629, VIF 2.747, se x1.658, and the
//    corrected band is [-0.04646, -0.00061] -> zero stays OUTSIDE and the sign verdict SURVIVES.
//    The margin is thin and it is now on the record: zero enters at lag-1 0.48644,
//    which is 0.02015 above what this ladder measures.
//
// ==============================================================================
// 4. IS A SHORTFALL BUDGET OR STRUCTURE? The two uniform ladders, differenced
// ==============================================================================
//
//    A shortfall that CLOSES when the restart count rises 4x, at a fixed rule, is
//    the search budget. One that does not move is the greedy rule itself. This is
//    the discriminating test the instrument's own tail asks for and cannot run,
//    because its extension levels sit on a different schedule row from its
//    measured ones.
//
//       x   optimum   R=512   R=2048   gained   still short   verdict at this level
//       2         1       1        1        0             0    exact at both budgets
//       3         5       5        5        0             0    exact at both budgets
//       5        11      11       11        0             0    exact at both budgets
//       7        29      29       29        0             0    exact at both budgets
//      11        41      41       41        0             0    exact at both budgets
//      13        65      65       65        0             0    exact at both budgets
//      17       107     107      107        0             0    exact at both budgets
//      19       149     149      149        0             0    exact at both budgets
//      23       203     203      203        0             0    exact at both budgets
//      29       257     257      257        0             0    exact at both budgets
//      31       347     347      347        0             0    exact at both budgets
//      37       527     527      527        0             0    exact at both budgets
//      41       545     545      545        0             0    exact at both budgets
//      43       617     611      617        6             0    BUDGET: 4x restarts closed it
//      47       707     701      704        3             3    still moving with budget
//      53       869     836      869       33             0    BUDGET: 4x restarts closed it
//      59       965     953      953        0            12    no movement from 4x restarts
//      61      1079    1028     1074       46             5    still moving with budget
//      67      1283    1211     1228       17            55    still moving with budget
//      71      1397    1313     1313        0            84    no movement from 4x restarts
//      73      1529    1487     1487        0            42    no movement from 4x restarts
//      79      1709    1635     1635        0            74    no movement from 4x restarts
//
// ==============================================================================
// 5. THE BUDGET LAW, which is what governs whether the oracle EXTENDS
// ==============================================================================
//
//    The ratio is not the number that governs a ladder past enumeration. This one
//    is: at the optimum's OWN target m = G2 - 1, how many seeded restarts before
//    the first cover? Median over 9 independent seed bases, cap 6000 restarts.
//    Censored means the cap was hit and the optimum was never reached.
//
//    READ THIS TABLE AS A PESSIMISTIC PROXY, and S1a's "from" column is why. The
//    search does not only cover targets; a FAILED run at a larger target leaves a
//    covered prefix, which is a legal certificate for that prefix. So a level can
//    be censored here - no seed base covers m = G2 - 1 as a target - while the
//    ladder above still reaches G2 - 1, by prefix. Where that happens, "from"
//    names the target that did it. The censoring below is therefore a lower bound
//    on the search's reach and an upper bound on nothing.
//
//       x   np   optimum   median restarts to first hit   censored
//       13    6        65                         2   -
//       17    7       107                         3   -
//       19    8       149                        10   -
//       23    9       203                        15   -
//       29   10       257                       986   -
//       31   11       347                      1061   -
//       37   12       527                       374   -
//       41   13       545             6000+ (never)   6 of 9
//       43   14       617             6000+ (never)   9 of 9
//       47   15       707             6000+ (never)   9 of 9
//
//    Over the 7 uncensored levels, log(median restarts) rises 1.1436 per added prime,
//    a factor of 3.14 per prime. At that rate the restarts needed at x = 229
//    (50 primes) are 10^19 times what the last uncensored level needed.
//
// ==============================================================================
// 6. THE SIXTEEN Y2 LEVELS: SKIPPED, and the cost that skips them
// ==============================================================================
//
//    TODO 1b also asks for the sixteen Y2 levels recomputed with the corrected
//    instrument. They are NOT recomputed here, and this is a cost decision stated
//    rather than a result withheld. The corrected instrument already owns that
//    ladder - research/two-class-lower-bounds.js S2+3 - and its header records the
//    price on the same class of machine: about 235 minutes for the sixteen levels,
//    of which x = 4001 alone is 71. Every level is independent since the level
//    chaining was removed, so the ladder shards:
//
//      node research/two-class-lower-bounds.js --ladder-only --levels=4001
//      node research/two-class-lower-bounds.js --ladder-only --levels=3001
//      ... one process per level, wall clock = the longest rung, not the sum.
//
//    The measured cost HERE is what makes that decision, and it is printed above:
//    the 22-level exact ladder at R = 2048 is the whole compute budget of this run,
//    and x = 79 alone - 22 primes - is its largest rung. x = 4001 carries 550
//    primes. Adding the sixteen Y2 levels to this script would multiply its runtime
//    by roughly twentyfold and would produce numbers the instrument already
//    produces, at the instrument's schedule rather than at a fixed budget.
//
//    WHAT THIS RUN SAYS ABOUT THOSE SIXTEEN NUMBERS ANYWAY, and it is the point of
//    S5: every one of them is a CERTIFIED LOWER BOUND on G2(x#) - 1 and none is an
//    estimate of it. S5 measures the restart budget the optimum costs, per added
//    prime, on the only levels where the optimum is knowable, and S1a's "from"
//    column says that budget is a pessimistic proxy for the search's real reach.
//    The Y2 ladder runs at
//    a schedule that FALLS with np while that requirement RISES with np. The two
//    move in opposite directions, so nothing measured here transfers up the ladder,
//    and the fidelity of Y2 above the exact frontier remains unmeasured by this run
//    or by any other.
// ============================================================================
// READINGS
//
// 1. THE PRE-REGISTERED RULE IS MET, ON BOTH READINGS, AND NEITHER READING IS
//    THE ONE THE RULE WAS EXPECTED TO NEED. At the headline uniform budget the
//    greedy is exact at 13 of 13 on the thirteen terms the rule names and at
//    14 of 14 on all fourteen measured here, minimum ratio 1.0000 in both. The
//    rule asked for 12 of 13 and a floor of 0.99; it got a clean sweep with no
//    level to argue about. ORACLE ESTABLISHED, on the rule as sealed.
//
// 2. CLAUSE 2 DOES NOT FIRE WHERE THE RULE POINTS IT, AND DOES FIRE JUST ABOVE.
//    Over x = 13..41 and x = 13..43 the ratios are identically 1.0000, so the
//    log-log slope is +0.00000 with a zero band: degenerate, and degenerate in
//    the direction that keeps the oracle alive. Over every exact level, x =
//    13..79, the slope is -0.02353, se 0.00706, band [-0.03736, -0.00970],
//    leave-one-out range [-0.02830, -0.01851]. That is a real degradation and
//    it excludes zero, but it is measured OUTSIDE the rule's scope, on eight
//    optima this project did not compute. Both facts are the result. The rule
//    is met; the ratio does degrade; the degradation begins above x = 43.
//
// 3. THE 43# SHORTFALL WAS BUDGET, NOT STRUCTURE, AND SO WAS 53. At R = 512 the
//    greedy reads 611 against 617 at x = 43 and 836 against 869 at x = 53. Four
//    times the restarts closes both to exact, at the same rule, on the same
//    seed base. That settles the question the instrument's own tail left open
//    at its newest level and could not settle from inside, because its
//    extension levels sit on a different budget row from its measured ones.
//
// 4. THE GREEDY REPRODUCES A PUBLISHED OPTIMUM NOBODY HERE COMPUTED. x = 53 is
//    an A144311 term, found by branch-and-bound elsewhere, at a period this
//    project's enumerator cannot reach. The greedy lands on 869 exactly. That is
//    one level of external validation and it is worth exactly one level.
//
// 5. THE MECHANISM IS NOT THE ONE THE SEARCH IS USUALLY DESCRIBED BY, AND THIS
//    IS THE MOST TRANSFERABLE THING IN THE FILE. At 15 of the 22 levels the
//    answer came from a covered PREFIX left by a FAILED attempt at a larger
//    target, not from covering its own target. x = 43 is the sharpest case:
//    the family never covers 617 outright - the largest target it covers is
//    604 - and the certificate for 617 falls out of the failed run at 759.
//    So "how many restarts to cover m = G2 - 1" is the wrong meter for this
//    search, and any tuning that shrinks the window or stops at the first
//    failure destroys the path that actually finds the optimum. It is also
//    exactly the defect the 2026-08-18 repair removed, arriving from a second
//    direction.
//
// 6. ABOVE x = 53 THE SHORTFALL STOPS RESPONDING TO BUDGET. Four times the
//    restarts buys 0 at x = 59, 71, 73 and 79, while 47, 61 and 67 are still
//    moving. The four unmoved levels are still 12, 84, 42 and 74 short. On this
//    evidence the greedy rule itself, not the search around it, is what runs out
//    somewhere in x = 59..79, and no budget this project can pay will hide it.
//
// 7. THE COST OF EXACTNESS RISES BY A FACTOR OF 3.14 PER ADDED PRIME, measured
//    on the seven levels where a median is uncensored, and the median is already
//    censored at 6000 restarts from x = 41 upward. Read with reading 5 that is a
//    pessimistic proxy rather than a wall, but its SLOPE is the honest number,
//    and it is the slope that decides whether an oracle extends.
//
// 8. WHAT THE ORACLE IS ACTUALLY GOOD FOR, stated so it cannot be over-quoted.
//    TODO 1b hoped for a conjectural ladder to x = 100+ accurate to a fraction
//    of a percent. What is demonstrated is exactness to x = 43 on this project's
//    own terms, exactness at one further published level, and a measured decay
//    to 0.9567 by x = 79. The fitted ratio reads 0.9483 at x = 229. A ladder
//    built from this instrument past x = 79 is a lower bound with an unmeasured
//    and visibly falling fidelity, not an oracle, and the honest frontier of the
//    oracle claim is around x = 53, not x = 100.
//
// 9. NON-MONOTONICITY IN m IS REAL AND WAS RE-MEASURED HERE, NOT INHERITED. At
//    x = 31 there are 12 infeasible targets in the 100 below the reached
//    maximum, in a longest run of 7; at x = 37 there are 10, longest run 1; at
//    x = 23 there are none. So the defect the 2026-08-18 repair fixed is level
//    dependent and invisible at some levels, which is how a bisection survived
//    being wrong for a year of levels. The window W = 200 used throughout sits
//    far above the longest run of 7 seen anywhere here.
//
// 10. EVERY ROW IS REPLAY-VERIFIED AND NO ROW EXCEEDS ITS OPTIMUM. The emitted
//    (p, a_p) are re-covered from scratch at every level of both ladders, and
//    the verifier is shown by three negative controls to reject a shifted class,
//    a repeated prime and a prime outside the allowed list. A row above its
//    optimum would be an impossibility and none appears.
//
// 11. THE SIXTEEN Y2 LEVELS ARE SKIPPED ON COST, AND S6 STATES THE PRICE RATHER
//    THAN THE RESULT. Nothing measured here transfers to them: their schedule
//    falls with the prime count while reading 7's requirement rises with it.
