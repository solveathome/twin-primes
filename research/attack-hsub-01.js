// attack-hsub-01.js
//
// TODO 1d: ATTACK ON (H-sub), THE SINGLE REMAINING GAP OF THE BOUNDED-DEFECT
// FEKETE ROUTE. THREE PROVEN REDUCTIONS OF THE HYPOTHESIS, THE STRUCTURAL
// VERDICT ON THE FOLD MACHINERY, AND THE COUNTEREXAMPLE HUNT OVER EVERY
// REACHABLE INTEGER PAIR.
//
// THE QUESTION. The route (fekete-1d.md; lemma stated and proved in
// attack-fekete-1d-02-lemma.js) is reduced to one inequality:
//   (H-sub)  f(st) <= f(s) + f(t) + K  on integers s,t >= 2,  f = ln Ghat,
// where Ghat(x) = G2(p#) at the largest prime p <= x. Its defect is
// identically D(s,t) = S(s)+S(t)-S(st), S(x) = ln(x^2/Ghat(x))
// (import-interp.md 3, PROVEN). This file asks: (a) what does the corpus's
// PROVEN machinery say about the hypothesis -- can any sub-family be proven,
// and what does the lemma actually consume; (b) where is the defect worst on
// the trusted 22-term range, and does any family drift; (c) where do the trap
// windows now sit.
//
// ---------------------------------------------------------------------------
// THREE REDUCTIONS, PROVEN IN THIS HEADER. All three are theorems about the
// LEMMA (they shrink the hypothesis it needs); none is a theorem about G2.
//
// REDUCTION 1 (power pairs suffice -- the lemma's proof already shows it).
//   Replace (H-sub) by
//     (H-sub-pow)  f(b^{k+1}) <= f(b^k) + f(b) + K   for all integers b >= 2,
//                  k >= 1.
//   Then the FULL conclusion of the bounded-defect Fekete lemma holds
//   unchanged: lim f(n)/ln n exists and equals L = inf_n (f(n)+K)/ln n, and
//   beta < 2 <=> S(n) > K at one integer.
//   PROOF. Re-read attack-fekete-1d-02-lemma.js's eight lines: the limsup
//   half iterates (H-sub) ONLY on the pairs (b^k, b) -- the induction step is
//   f(b^{k+1}) = f(b^k * b) <= f(b^k) + f(b) + K -- and then bridges with
//   (H-mono); the liminf half uses only the definition of inf and no pair at
//   all. So the proof of the lemma is, character for character, a proof of
//   the power-pair version. QED (by inspection of the existing proof).
//   CONSEQUENCE FOR THE TRAP: the data floor on K is now the reachable sup of
//   D over POWER PAIRS only. The global sup 1.0761 at (4,10) and the
//   47-window's 1.0330 at (4,12) are NOT power pairs and no longer constrain
//   the candidate the route needs.
//
// REDUCTION 2 (one base carries the whole TPC face; existence needs the inf).
//   (a) If (H-sub-pow) holds at a SINGLE base b0 with constant K, then
//       limsup f(n)/ln n <= (f(b0)+K)/ln b0    [same iteration + (H-mono)].
//       Hence K < S(b0) = 2 ln b0 - f(b0) already gives limsup < 2 -- the
//       TPC-implying face never needed the full candidate, only one geometric
//       chain. At b0 = 16: any K < 1.3555 on the chain (16^k, 16) suffices;
//       at b0 = 66 (trusted): any K < 1.3946 on (66^k, 66).
//   (b) A cofinal chain with two-sidedly pinned steps also suffices for the
//       LIMSUP face: if a*n_j <= n_{j+1} <= b*n_j (a > 1), n_j -> inf, and
//       f(n_{j+1}) <= f(n_j) + f(b) + K, then for n in [n_j, n_{j+1}):
//       f(n) <= f(n_0) + (j+1)(f(b)+K) and ln n >= ln n_0 + j ln a, so
//       limsup <= (f(b)+K)/ln a. (Steps pinned only from above degrade the
//       denominator and give nothing.)
//   (c) LIMIT EXISTENCE does NOT follow from one chain or one base: limsup <=
//       (f(b0)+K)/ln b0 but liminf >= L = inf over ALL n, and the two close
//       only when the base family realizes the inf. So the answer to "does a
//       cofinal chain suffice for limit existence" is NO for existence, YES
//       for the limsup face, and the TPC face is the limsup face.
//
// REDUCTION 3 (fixed-t slices, each with its own trap and its own prize).
//   Fix t0 >= 2. If f(t0*s) <= f(s) + f(t0) + K_t0 for ALL s >= 2 (the t0
//   slice; it contains its own base chain (t0^k, t0)), then
//     limsup f(n)/ln n <= (f(t0)+K_t0)/ln t0.
//   Faces: TPC-implying iff K_t0 < S(t0); and IMPROVES the proven sifting
//   ceiling beta2 = 4.26645028414864191641 (dhr-verification.md row 1a) iff
//   K_t0 < beta2*ln t0 - f(t0). For t0 = 2 the conclusion has a clean form:
//   Ghat(2s) <= C2*Ghat(s) for all s gives limsup <= log2(C2); TPC iff
//   C2 < 4; improves beta2 iff C2 < 2^beta2 = 19.2455.
//
// ---------------------------------------------------------------------------
// THE STRUCTURAL VERDICT ON THE FOLD MACHINERY, derived here, verified below.
//
//   (i) THE FOLD STEP IS NOT AN INTEGER PAIR. The fold G2(p_n#) -> G2(p_n+1#)
//   is, in the ARGUMENT coordinate of Ghat, multiplication by p_n+1/p_n < 2
//   (Bertrand). The candidate's domain floor t >= 2 -- forced by the corpus's
//   own correction (real bases carry ln C >= 2.01 and clear nothing,
//   import-interp.md 4) -- sits strictly ABOVE the one-fold regime. So the
//   family "t prime, s a primorial level: exactly the fold step" does not
//   exist inside the candidate's domain: EVERY admissible pair (s, t>=2)
//   crosses pi(st) - pi(s) >= pi(2s) - pi(s) >= 1 folds (Bertrand), a count
//   that -> infinity with s. The corpus's strongest machinery (copy theorem,
//   Mirror-Sweep, maxsum profiles) is one-fold-local; no per-fold cap
//   composes into (H-sub), because a constant per-fold factor compounds to
//   exp(#folds) and #folds is unbounded on every slice.
//
//   (ii) WHAT (H-sub) SAYS IN FOLD COORDINATES -- exact, and verified below.
//   Let r_1 = ln G2(2#) = ln 2 and r_i = ln[G2(p_i#)/G2(p_i-1#)] >= 0 (the
//   fold budgets; nonnegative BY THE PROVEN (H-mono)). Then f(n) = sum of r_i
//   over p_i <= n, and (H-sub) at (s,t) is IDENTICALLY the window comparison
//       sum_{pi(s) < i <= pi(st)} r_i  <=  sum_{i <= pi(t)} r_i + K :
//   the budget spent in the window (s, st] never exceeds the budget of the
//   FIRST pi(t) folds plus K -- head dominance. The window holds ~st/ln(st)
//   folds against the head's pi(t): (H-sub) is a statement that late fold
//   budgets thin out, which no local structure supplies.
//
//   (iii) THE PROVEN DIRECTION IS THE WRONG SIDE. Copying/(H-mono) and the
//   disjoint-set super-additivity (block-ladder record) give LOWER bounds on
//   Ghat(st), i.e. they bound D from BELOW: D(s,t) >= -min(f(s), f(t))
//   [PROVEN: st >= s gives f(st) >= f(s) by (H-mono), so D >= -f(t); same
//   with s,t swapped]. Nothing proven in the corpus bounds Ghat(st) above by
//   level-s and level-t data, and this file proves no instance of (H-sub).
//
// HONEST DOUBT. The reductions are real but they are quantifier surgery on
// the lemma, not progress on G2: no instance of (H-sub) is proven for any
// integer pair family, and the family floors below are reachable sups --
// lower bounds on the true constants, not evidence the constants exist. The
// slice-trap verdicts depend on the trusted A144311 terms where marked; the
// custody-only columns are printed beside them. Slope readings on traces
// carry the known step-sampling artifact and are read ONLY against the
// in-pass POW null (campaign rule: calibrate before fitting).
//
// ARITHMETIC NOTE. Everything is small: values <= 1710, products <= 82,
// no quantity near 2^53, no BigInt, no shift operators.
//
// usage: node research/attack-hsub-01.js

'use strict';

const fs = require('fs');
const path = require('path');
const T0 = Date.now();
const F = (v, d = 4) => (Number.isFinite(v) ? (v >= 0 ? ' ' : '') + v.toFixed(d) : '  n/a');
const pad = (s, n) => String(s).padStart(n);
let FAILS = 0;
function check(label, ok, detail) {
  if (!ok) { FAILS++; console.log('  FAIL  ' + label + (detail ? '   ' + detail : '')); }
  else console.log('  ok    ' + label + (detail ? '   ' + detail : ''));
}

const BETA2 = 4.26645028414864191641; // proven sifting exponent, dhr-verification.md row 1a

// ------------------------------------------------------- A. custody
const HERE = path.join(__dirname);
const srcLadder = fs.readFileSync(path.join(HERE, 'exact-g2-ladder.js'), 'utf8');
const srcInterp = fs.readFileSync(path.join(HERE, 'import-interp-01-bgt-defect.js'), 'utf8');
const EXACT = [];
{
  const re = /\{ x: (\d+),\s+g: (\d+),/g;
  let m;
  while ((m = re.exec(srcLadder)) !== null) EXACT.push({ x: +m[1], g: +m[2] });
}
let A144311 = null;
{
  const m = srcInterp.match(/const A144311 = \[([^\]]+)\]/s);
  A144311 = m[1].split(',').map((s) => parseInt(s.trim(), 10));
}
const PR = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79];
const G2FULL = A144311.map((v) => v + 1);

console.log('=== A. CUSTODY ======================================================');
check('14 exact terms parsed from exact-g2-ladder.js', EXACT.length === 14);
check('22 A144311 terms parsed from import-interp-01', A144311.length === 22);
let agree = true;
for (let i = 0; i < 14; i++) agree = agree && EXACT[i].x === PR[i] && EXACT[i].g === G2FULL[i];
check('exact ladder == A144311+1 on all 14 shared terms', agree);

// ladder objects: Ghat(t) = value at largest listed prime <= t, domain [2, cap)
function mkG(pr, vals, cap) {
  return {
    pr, vals, cap,
    at(t) { let k = -1; for (let i = 0; i < pr.length; i++) if (pr[i] <= t) k = i; return k < 0 ? null : vals[k]; },
  };
}
const LFULL = mkG(PR, G2FULL, 83);                            // trusted 22-term
const LCUST = mkG(PR.slice(0, 14), G2FULL.slice(0, 14), 47);  // custody 14-term
const fOf = (L, n) => Math.log(L.at(n));
const Sof = (L, b) => Math.log(b * b / L.at(b));
const Dof = (L, s, t) => Math.log(L.at(s * t) / (L.at(s) * L.at(t)));
const piOf = (v) => { let c = 0; for (const p of PR) if (p <= v) c++; return c; };

function pairs(L, stMax) {
  const out = [];
  const M = Math.min(stMax, L.cap - 1);
  for (let s = 2; s * s <= M; s++) for (let t = s; s * t <= M; t++) {
    out.push({ s, t, st: s * t, D: Dof(L, s, t) });
  }
  return out;
}
const PALL = pairs(LFULL, 82);
const PCUST = pairs(LCUST, 46);
const supOf = (arr) => arr.reduce((a, b) => (b.D > a.D ? b : a));
const supAll = supOf(PALL);
const supCust = supOf(PCUST);
check('111 reachable pairs (st <= 82), 50 custody (st <= 46)', PALL.length === 111 && PCUST.length === 50,
  PALL.length + ' / ' + PCUST.length);
check('cross-check -01: global sup D = 1.0761 at (4,10)', Math.abs(supAll.D - 1.0761) < 5e-4 && supAll.s === 4 && supAll.t === 10, F(supAll.D));
{
  let thr = -1; let thrB = 0;
  for (let b = 2; b < 83; b++) { const v = Sof(LFULL, b); if (v > thr) { thr = v; thrB = b; } }
  check('cross-check -01: trusted threshold 1.3946 at b = 66', Math.abs(thr - 1.3946) < 5e-4 && thrB === 66, F(thr));
  let thc = -1; let thcB = 0;
  for (let b = 2; b < 47; b++) { const v = Sof(LCUST, b); if (v > thc) { thc = v; thcB = b; } }
  check('cross-check -01: custody threshold 1.3555 at b = 16', Math.abs(thc - 1.3555) < 5e-4 && thcB === 16, F(thc));
  check('cross-check -01: D(4,12) = 1.0330 (the 47-window sup)', Math.abs(Dof(LFULL, 4, 12) - 1.0330) < 5e-4, F(Dof(LFULL, 4, 12)));
}

// ------------------------------------------------------- B. Reduction 1
console.log('');
console.log('=== B. REDUCTION 1: THE LEMMA CONSUMES ONLY POWER PAIRS ============');
console.log('(proof in the header: -02\'s own eight lines never use another pair)');
// enumerate power pairs (b^k, b), b^{k+1} <= 82 (custody: <= 46)
function powerPairs(L, M) {
  const out = [];
  for (let b = 2; b * b <= M; b++) {
    for (let v = b * b; v <= M; v *= b) out.push({ b, k: Math.round(Math.log(v) / Math.log(b)) - 1, s: v / b, t: b, st: v, D: Dof(L, v / b, b) });
  }
  return out;
}
const PPFULL = powerPairs(LFULL, 82);
const PPCUST = powerPairs(LCUST, 46);
console.log('power pairs (b^k, b) with b^(k+1) <= 82: ' + PPFULL.length + '   (custody, <= 46: ' + PPCUST.length + ')');
console.log('  (b,k)    pair        st    D (nats)   grade');
for (const q of PPFULL.sort((a, b) => b.D - a.D)) {
  const grade = q.st <= 46 ? 'custody' : 'trusted';
  console.log('  (' + q.b + ',' + q.k + ')   (' + pad(q.s, 2) + ',' + q.t + ')  ' + pad(q.st, 6) + '   ' + F(q.D) + '   ' + grade);
}
const ppSupFull = supOf(PPFULL);
const ppSupCust = supOf(PPCUST);
console.log('');
console.log('power-pair family floor (trusted) : ' + F(ppSupFull.D) + '  at (' + ppSupFull.s + ',' + ppSupFull.t + '), the base-' + ppSupFull.b + ' chain pair at k = ' + ppSupFull.k);
console.log('power-pair family floor (custody) : ' + F(ppSupCust.D) + '  at (' + ppSupCust.s + ',' + ppSupCust.t + ')');
check('(4,10) and (4,12) are NOT power pairs', !PPFULL.some((q) => (q.s === 4 && q.t === 10) || (q.s === 4 && q.t === 12)));
check('power-pair floor sits BELOW the all-pairs floor 1.0761', ppSupFull.D < supAll.D,
  F(ppSupFull.D) + ' < ' + F(supAll.D));
console.log('REDUCED TRAP WINDOWS (Reduction 1; ceilings unchanged, they belong to');
console.log('the conclusion formula, not the pair family):');
console.log('  trusted : ln C in [' + F(ppSupFull.D) + ', 1.3946)   width ' + F(1.39459 - ppSupFull.D) + '  (was [1.0761, 1.3946), 0.3185)');
console.log('  custody : ln C in [' + F(ppSupCust.D) + ', 1.3555)   width ' + F(1.35552 - ppSupCust.D));
// which bases have any reachable chain data at all
{
  const basesWithData = [...new Set(PPFULL.map((q) => q.b))];
  console.log('bases with ANY reachable chain pair: {' + basesWithData.join(',') + '}  (b >= 10: none, b^2 > 82)');
  check('the threshold bases 16 and 66 have ZERO reachable chain pairs', !basesWithData.includes(16) && !basesWithData.includes(66),
    'the pairs that decide the trap carry no data at all');
}

// ------------------------------------------------------- C. Reduction 3 slices
console.log('');
console.log('=== C. FIXED-t SLICES: PER-SLICE TRAPS AND THE SOFT WINDOW =========');
console.log('slice t0: hypothesis f(t0*s) <= f(s)+f(t0)+K for all s; conclusion');
console.log('limsup <= (f(t0)+K)/ln t0; TPC iff K < S(t0); improves the proven');
console.log('beta2 = 4.2665 iff K < beta2*ln t0 - f(t0).');
console.log('');
console.log('  t0  supD(full)  at pair   supD(cust)  S(t0)  trap        impr.ceil  limsup@floor');
const SLICE = {};
for (let t0 = 2; t0 <= 13; t0++) {
  const fam = PALL.filter((q) => q.s === t0 || q.t === t0);
  const famC = PCUST.filter((q) => q.s === t0 || q.t === t0);
  if (!fam.length) continue;
  const sf = supOf(fam);
  const sc = famC.length ? supOf(famC) : null;
  const S0 = Sof(LFULL, t0);
  const ceil = BETA2 * Math.log(t0) - fOf(LFULL, t0);
  const open = sf.D < S0;
  const atFloor = (fOf(LFULL, t0) + sf.D) / Math.log(t0);
  SLICE[t0] = { sf, sc, S0, ceil, open, atFloor };
  console.log('  ' + pad(t0, 2) + '  ' + F(sf.D) + '   (' + sf.s + ',' + pad(sf.t, 2) + ')   ' + (sc ? F(sc.D) : '     n/a') + '   ' + F(S0) + '  ' + (open ? 'OPEN  ' : 'closed') + '      ' + F(ceil) + '    ' + F(atFloor));
}
console.log('');
console.log('readings of the table:');
console.log('- slices t0 = 2,3,4,5: trap CLOSED by data (supD >= S(t0)) -- any');
console.log('  provable K there is NOT TPC-implying, so a soft proof is not');
console.log('  excluded by the trap logic; and every K below the impr. ceiling');
console.log('  still lowers the proven exponent ceiling.');
{
  const s2 = SLICE[2];
  const C2floor = 2 * Math.exp(s2.sf.D);
  const C2ceil = Math.pow(2, BETA2);
  console.log('- THE DOUBLING WINDOW (t0 = 2, all data custody-grade): the slice reads');
  console.log('  Ghat(2s) <= C2*Ghat(s) => limsup <= log2(C2). Reachable floor');
  console.log('  C2 = ' + F(C2floor) + ' (= 348/66 at s = 16, both custody-exact); TPC needs');
  console.log('  C2 < 4 (excluded by data); improvement needs C2 < 2^beta2 = ' + F(C2ceil) + '.');
  console.log('  So EVERY C2 in [' + F(C2floor) + ', ' + F(C2ceil) + ') is (i) consistent with all data,');
  console.log('  (ii) NOT TPC-implying, (iii) lowers the proven ceiling to');
  console.log('  log2(C2) in [' + F(Math.log2(C2floor)) + ', ' + F(BETA2) + '). Width ' + F(Math.log(C2ceil / C2floor)) + ' nats.');
  check('the doubling window is nonempty and entirely non-TPC', C2floor > 4 && C2floor < C2ceil,
    'floor ' + F(C2floor) + ' > 4 and < ceiling ' + F(C2ceil));
  const sD2 = supOf(PALL.filter((q) => q.s === 2 || q.t === 2));
  check('doubling floor is custody-grade (pair st <= 46)', sD2.st <= 46, 'sup at (' + sD2.s + ',' + sD2.t + '), st = ' + sD2.st);
}
{
  const s6 = SLICE[6];
  console.log('- slices t0 >= 6 all have OPEN traps (supD < S(t0)); t0 = 6 is the');
  console.log('  NARROWEST: window K6 in [' + F(s6.sf.D) + ', ' + F(s6.S0) + '), width ' + F(s6.S0 - s6.sf.D) + ' nats,');
  console.log('  floor at (' + s6.sf.s + ',' + s6.sf.t + ') st = ' + s6.sf.s * s6.sf.t + ' (custody-exact); at the floor the implied');
  console.log('  bound is ' + F(s6.atFloor) + ' < 2. An explicit K6 below ' + F(s6.S0) + ' is TPC-implying,');
  console.log('  and the data floor sits 0.0572 nats under that line.');
}

// ------------------------------------------------------- D. fold coordinates
console.log('');
console.log('=== D. THE FOLD-BUDGET IDENTITY AND THE MULTI-FOLD VERDICT =========');
// r_i table from the trusted ladder
const R = [Math.log(G2FULL[0])];
for (let i = 1; i < 22; i++) R.push(Math.log(G2FULL[i] / G2FULL[i - 1]));
console.log('fold budgets r_i = ln[G2(p_i#)/G2(p_i-1#)] (r_1 = ln G2(2#)):');
console.log('  p_i : ' + PR.map((p) => pad(p, 6)).join(''));
console.log('  r_i : ' + R.map((r) => pad(r.toFixed(3), 6)).join(''));
check('every r_i >= 0 (the PROVEN (H-mono), restated per fold)', R.every((r) => r >= 0));
// identity: f(st) - f(s) = sum of r over window (pi(s), pi(st)]
{
  let worst = 0;
  for (const q of PALL) {
    let w = 0;
    for (let i = piOf(q.s); i < piOf(q.st); i++) w += R[i];
    const lhs = fOf(LFULL, q.st) - fOf(LFULL, q.s);
    worst = Math.max(worst, Math.abs(w - lhs));
  }
  check('window identity f(st)-f(s) = sum r_i over (pi(s), pi(st)], all 111 pairs', worst < 1e-12,
    'max dev ' + worst.toExponential(2));
}
console.log('so (H-sub) at (s,t) is EXACTLY: window budget <= head budget + K,');
console.log('with head = first pi(t) folds. The three worst pairs, decomposed:');
for (const q of [...PALL].sort((a, b) => b.D - a.D).slice(0, 3)) {
  let w = 0;
  for (let i = piOf(q.s); i < piOf(q.st); i++) w += R[i];
  const head = fOf(LFULL, q.t);
  console.log('  (' + q.s + ',' + pad(q.t, 2) + '): window (' + q.s + ',' + q.st + '] carries ' + (piOf(q.st) - piOf(q.s)) + ' folds, budget ' + F(w) +
    ';  head pi(' + q.t + ') = ' + piOf(q.t) + ' folds, budget ' + F(head) + ';  excess D = ' + F(w - head));
}
// fold counts: every pair is multi-fold; the fold step is sub-integer
{
  let minFolds = Infinity; let minPair = null; let dpiNeg = 0;
  for (const q of PALL) {
    const d = piOf(q.st) - piOf(q.s);
    if (d < minFolds) { minFolds = d; minPair = q; }
    if (piOf(q.st) - piOf(q.s) - piOf(q.t) < 0) dpiNeg++;
  }
  check('every reachable pair crosses >= 1 fold (Bertrand: pi(2s) > pi(s))', minFolds >= 1,
    'min ' + minFolds + ' folds at (' + minPair.s + ',' + minPair.t + ')');
  check('pi(st) - pi(s) - pi(t) never negative on the range (import-interp 2)', dpiNeg === 0);
  const ratios = [];
  for (let i = 1; i < 22; i++) ratios.push(PR[i] / PR[i - 1]);
  const maxRatio = Math.max(...ratios);
  check('the fold step in argument space is t = p_next/p < 2 at EVERY fold', maxRatio < 2,
    'max ratio ' + F(maxRatio) + ' = 5/3 at 3->5; the integer domain t >= 2 starts above it');
}
// the proven wrong-side floor. slack = D + min(f(s),f(t)) = f(st) - f(t)
// for s <= t; strictly positive on the range because every pair crosses a
// fold and every measured r_i > 0.
{
  let minSlack = Infinity; let sq = null;
  for (const q of PALL) {
    const sl = q.D + Math.min(fOf(LFULL, q.s), fOf(LFULL, q.t));
    if (sl < minSlack) { minSlack = sl; sq = q; }
  }
  check('proven floor D >= -min(f(s), f(t)) holds at every pair', minSlack >= -1e-12,
    'min slack ' + F(minSlack) + ' at (' + sq.s + ',' + sq.t + ') (the floor is (H-mono), the proven direction)');
}

// ------------------------------------------------------- E. the hunt
console.log('');
console.log('=== E. THE HUNT: EXTREMES AND FAMILY TRACES, NULLS IN-PASS =========');
{
  const sorted = [...PALL].sort((a, b) => b.D - a.D);
  console.log('five largest defects  : ' + sorted.slice(0, 5).map((q) => '(' + q.s + ',' + q.t + ')' + F(q.D)).join('  '));
  console.log('five most negative    : ' + sorted.slice(-5).reverse().map((q) => '(' + q.s + ',' + q.t + ')' + F(q.D)).join('  '));
  const neg = PALL.filter((q) => q.D < 0).length;
  console.log('negative-D pairs      : ' + neg + ' of 111 (the super-multiplicative side)');
  const minQ = sorted[sorted.length - 1];
  console.log('global min D          : ' + F(minQ.D) + ' at (' + minQ.s + ',' + minQ.t + ')   [proven floor there: ' + F(-Math.min(fOf(LFULL, minQ.s), fOf(LFULL, minQ.t))) + ']');
}
// traces with in-pass nulls (POW: constant defect; LOG: decreasing defect)
const mkNull = (f) => mkG(PR, PR.map(f), 83);
const NPOW = mkNull((p) => 1.84 * Math.pow(p, 1.546));
const NLOG = mkNull((p) => 1.016 * p * Math.log(p) ** 2);
function ols(xs, ys) {
  const n = xs.length;
  const mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
  let sxy = 0, sxx = 0;
  for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; }
  const b = sxy / sxx, a = my - b * mx;
  let ss = 0; for (let i = 0; i < n; i++) ss += (ys[i] - a - b * xs[i]) ** 2;
  return { b, se: Math.sqrt((ss / Math.max(1, n - 2)) / sxx) };
}
function trace(name, fam, xKey) {
  const xs = fam.map((q) => Math.log(q[xKey]));
  const fit = ols(xs, fam.map((q) => Dof(LFULL, q.s, q.t)));
  const fitP = ols(xs, fam.map((q) => Dof(NPOW, q.s, q.t)));
  const fitL = ols(xs, fam.map((q) => Dof(NLOG, q.s, q.t)));
  const d = fit.b - fitP.b;
  const se = Math.sqrt(fit.se ** 2 + fitP.se ** 2);
  console.log(name + ' (' + fam.length + ' pts): slope ' + F(fit.b) + ' +- ' + F(fit.se) +
    '   POW null ' + F(fitP.b) + ' +- ' + F(fitP.se) + '   LOG null ' + F(fitL.b));
  console.log('  G2 minus POW: ' + F(d) + ' +- ' + F(se) + '   -> ' + (Math.abs(d) < se ? 'CONSISTENT WITH BOUNDED' : (d > 0 ? 'above the bounded null' : 'BELOW the bounded null')));
  return { fit, fitP, d, se };
}
console.log('');
console.log('the (4,t) family -- the one that carries both record defects:');
const F4 = []; for (let t = 2; 4 * t <= 82; t++) F4.push({ s: 4, t });
console.log('  t : ' + F4.map((q) => pad(q.t, 6)).join(''));
console.log('  D : ' + F4.map((q) => pad(Dof(LFULL, 4, q.t).toFixed(3), 6)).join(''));
trace('(4,t) vs ln t', F4, 't');
{
  const peak = F4.reduce((a, b) => (Dof(LFULL, 4, b.t) > Dof(LFULL, 4, a.t) ? b : a));
  const tail = F4.filter((q) => q.t >= 13);
  const below = tail.every((q) => Dof(LFULL, 4, q.t) < Dof(LFULL, 4, 10));
  check('(4,t) peaks at t = 10 (the 37-spike) and every t >= 13 sits below it', peak.t === 10 && below,
    'peak D = ' + F(Dof(LFULL, 4, 10)));
}
console.log('');
console.log('the doubling family (s,2), s = 2..41 -- Reduction 3\'s t0 = 2 slice:');
const F2 = []; for (let s = 2; 2 * s <= 82; s++) F2.push({ s, t: 2 });
trace('(s,2) vs ln s', F2, 's');
console.log('');
console.log('the diagonal (b,b), b = 2..9 -- where a growing defect would live:');
const FD = []; for (let b = 2; b * b <= 82; b++) FD.push({ s: b, t: b });
console.log('  b : ' + FD.map((q) => pad(q.s, 8)).join(''));
console.log('  D : ' + FD.map((q) => pad(Dof(LFULL, q.s, q.s).toFixed(4), 8)).join(''));
trace('(b,b) vs ln b', FD, 's');
console.log('(the diagonal has 8 points to sqrt(82) = 9; it cannot see growth, only');
console.log(' record that nothing visible grows -- the -01 blind spot, unchanged)');

// ------------------------------------------------------- G. summary
console.log('');
console.log('=== G. SUMMARY NUMBERS =============================================');
console.log('power-pair floor (trusted/custody)     : ' + F(ppSupFull.D) + ' / ' + F(ppSupCust.D));
console.log('reduced trap window, trusted           : [' + F(ppSupFull.D) + ', 1.3946)  width ' + F(1.39459 - ppSupFull.D));
console.log('reduced trap window, custody           : [' + F(ppSupCust.D) + ', 1.3555)  width ' + F(1.35552 - ppSupCust.D));
console.log('doubling soft window (C2, custody)     : [' + F(2 * Math.exp(SLICE[2].sf.D)) + ', ' + F(Math.pow(2, BETA2)) + ')  -> limsup <= log2 C2');
console.log('t0 = 6 slice trap window (custody)     : [' + F(SLICE[6].sf.D) + ', ' + F(SLICE[6].S0) + ')  width ' + F(SLICE[6].S0 - SLICE[6].sf.D));
{
  const minQ = PALL.reduce((a, b) => (b.D < a.D ? b : a));
  console.log('global extremes on 111 pairs           : max ' + F(supAll.D) + ' at (4,10), min ' + F(minQ.D) + ' at (' + minQ.s + ',' + minQ.t + ')');
}
console.log('');
console.log('self-test failures: ' + FAILS + (FAILS ? '   <-- DO NOT TRUST THIS OUTPUT' : '   (all checks passed)'));
console.log('total ' + ((Date.now() - T0) / 1000).toFixed(1) + ' s');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-hsub-01.js
//   invocation:  node research/attack-hsub-01.js
//   code-sha256: f14f578995033a4d3919f6bb48afe9f6d4796b8380e2f2b208a4ee9ab894ede4
//   out-sha256:  ee4e9643fc41f829d821cbc90b5d4bbe61dfeed039ce8aed33ce11c4228d315c
//   body-lines:  131
//   inputs:      research/exact-g2-ladder.js@999d2c5fa3ab research/import-interp-01-bgt-defect.js@20ad0a1961c8
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     0.1 s
// ============================================================================
// === A. CUSTODY ======================================================
//   ok    14 exact terms parsed from exact-g2-ladder.js
//   ok    22 A144311 terms parsed from import-interp-01
//   ok    exact ladder == A144311+1 on all 14 shared terms
//   ok    111 reachable pairs (st <= 82), 50 custody (st <= 46)   111 / 50
//   ok    cross-check -01: global sup D = 1.0761 at (4,10)    1.0761
//   ok    cross-check -01: trusted threshold 1.3946 at b = 66    1.3946
//   ok    cross-check -01: custody threshold 1.3555 at b = 16    1.3555
//   ok    cross-check -01: D(4,12) = 1.0330 (the 47-window sup)    1.0330
//
// === B. REDUCTION 1: THE LEMMA CONSUMES ONLY POWER PAIRS ============
// (proof in the header: -02's own eight lines never use another pair)
// power pairs (b^k, b) with b^(k+1) <= 82: 15   (custody, <= 46: 9)
//   (b,k)    pair        st    D (nats)   grade
//   (4,2)   (16,4)      64    1.0033   trusted
//   (2,4)   (16,2)      32    0.9694   custody
//   (2,2)   ( 4,2)       8    0.9163   custody
//   (6,1)   ( 6,6)      36    0.8824   custody
//   (9,1)   ( 9,9)      81    0.6419   trusted
//   (4,1)   ( 4,4)      16    0.6061   custody
//   (2,5)   (32,2)      64    0.4394   trusted
//   (2,1)   ( 2,2)       4    0.4055   custody
//   (5,1)   ( 5,5)      25    0.3483   custody
//   (3,3)   (27,3)      81    0.3344   trusted
//   (8,1)   ( 8,8)      64    0.1823   trusted
//   (3,2)   ( 9,3)      27    0.1252   custody
//   (2,3)   ( 8,2)      16    0.0953   custody
//   (3,1)   ( 3,3)       9   -0.1823   custody
//   (7,1)   ( 7,7)      49   -0.2400   trusted
//
// power-pair family floor (trusted) :  1.0033  at (16,4), the base-4 chain pair at k = 2
// power-pair family floor (custody) :  0.9694  at (16,2)
//   ok    (4,10) and (4,12) are NOT power pairs
//   ok    power-pair floor sits BELOW the all-pairs floor 1.0761    1.0033 <  1.0761
// REDUCED TRAP WINDOWS (Reduction 1; ceilings unchanged, they belong to
// the conclusion formula, not the pair family):
//   trusted : ln C in [ 1.0033, 1.3946)   width  0.3913  (was [1.0761, 1.3946), 0.3185)
//   custody : ln C in [ 0.9694, 1.3555)   width  0.3861
// bases with ANY reachable chain pair: {4,2,6,9,5,3,8,7}  (b >= 10: none, b^2 > 82)
//   ok    the threshold bases 16 and 66 have ZERO reachable chain pairs   the pairs that decide the trap carry no data at all
//
// === C. FIXED-t SLICES: PER-SLICE TRAPS AND THE SOFT WINDOW =========
// slice t0: hypothesis f(t0*s) <= f(s)+f(t0)+K for all s; conclusion
// limsup <= (f(t0)+K)/ln t0; TPC iff K < S(t0); improves the proven
// beta2 = 4.2665 iff K < beta2*ln t0 - f(t0).
//
//   t0  supD(full)  at pair   supD(cust)  S(t0)  trap        impr.ceil  limsup@floor
//    2   0.9694   (2,16)    0.9694    0.6931  closed       2.2641     2.3985
//    3   0.5810   (3,16)    0.4451    0.4055  closed       2.8954     2.1598
//    4   1.0761   (4,10)    1.0761    0.9808  closed       4.1228     2.0688
//    5   0.7697   (5,16)    0.7340    0.7340  closed       4.3817     2.0222
//    6   1.0415   (4, 6)    1.0415    1.0986  OPEN         5.1595     1.9681
//    7   0.4165   (6, 7)    0.4165    0.4906  OPEN         4.9009     1.9619
//    8   0.6763   (6, 8)    0.6592    0.7577  OPEN         5.4706     1.9609
//    9   0.8824   (6, 9)    0.6592    0.9933  OPEN         5.9732     1.9495
//   10   1.0761   (4,10)    1.0761    1.2040  OPEN         6.4227     1.9445
//   11   0.8971   (4,11)    0.8971    1.0581  OPEN         6.4928     1.9328
//   12   1.0330   (4,12)    0.8873    1.2321  OPEN         6.8641     1.9199
//   13   0.6585   (6,13)    0.4353    0.9402  OPEN         6.7536     1.8901
//
// readings of the table:
// - slices t0 = 2,3,4,5: trap CLOSED by data (supD >= S(t0)) -- any
//   provable K there is NOT TPC-implying, so a soft proof is not
//   excluded by the trap logic; and every K below the impr. ceiling
//   still lowers the proven exponent ceiling.
// - THE DOUBLING WINDOW (t0 = 2, all data custody-grade): the slice reads
//   Ghat(2s) <= C2*Ghat(s) => limsup <= log2(C2). Reachable floor
//   C2 =  5.2727 (= 348/66 at s = 16, both custody-exact); TPC needs
//   C2 < 4 (excluded by data); improvement needs C2 < 2^beta2 =  19.2455.
//   So EVERY C2 in [ 5.2727,  19.2455) is (i) consistent with all data,
//   (ii) NOT TPC-implying, (iii) lowers the proven ceiling to
//   log2(C2) in [ 2.3985,  4.2665). Width  1.2947 nats.
//   ok    the doubling window is nonempty and entirely non-TPC   floor  5.2727 > 4 and < ceiling  19.2455
//   ok    doubling floor is custody-grade (pair st <= 46)   sup at (2,16), st = 32
// - slices t0 >= 6 all have OPEN traps (supD < S(t0)); t0 = 6 is the
//   NARROWEST: window K6 in [ 1.0415,  1.0986), width  0.0572 nats,
//   floor at (4,6) st = 24 (custody-exact); at the floor the implied
//   bound is  1.9681 < 2. An explicit K6 below  1.0986 is TPC-implying,
//   and the data floor sits 0.0572 nats under that line.
//
// === D. THE FOLD-BUDGET IDENTITY AND THE MULTI-FOLD VERDICT =========
// fold budgets r_i = ln[G2(p_i#)/G2(p_i-1#)] (r_1 = ln G2(2#)):
//   p_i :      2     3     5     7    11    13    17    19    23    29    31    37    41    43    47    53    59    61    67    71    73    79
//   r_i :  0.693 1.099 0.693 0.916 0.336 0.452 0.492 0.329 0.307 0.235 0.299 0.417 0.034 0.124 0.136 0.206 0.105 0.112 0.173 0.085 0.090 0.111
//   ok    every r_i >= 0 (the PROVEN (H-mono), restated per fold)
//   ok    window identity f(st)-f(s) = sum r_i over (pi(s), pi(st)], all 111 pairs   max dev 1.78e-15
// so (H-sub) at (s,t) is EXACTLY: window budget <= head budget + K,
// with head = first pi(t) folds. The three worst pairs, decomposed:
//   (4,10): window (4,40] carries 10 folds, budget  4.4773;  head pi(10) = 4 folds, budget  3.4012;  excess D =  1.0761
//   (4, 6): window (4,24] carries 7 folds, budget  3.5264;  head pi(6) = 3 folds, budget  2.4849;  excess D =  1.0415
//   (4,12): window (4,48] carries 13 folds, budget  4.7707;  head pi(12) = 5 folds, budget  3.7377;  excess D =  1.0330
//   ok    every reachable pair crosses >= 1 fold (Bertrand: pi(2s) > pi(s))   min 1 folds at (2,2)
//   ok    pi(st) - pi(s) - pi(t) never negative on the range (import-interp 2)
//   ok    the fold step in argument space is t = p_next/p < 2 at EVERY fold   max ratio  1.6667 = 5/3 at 3->5; the integer domain t >= 2 starts above it
//   ok    proven floor D >= -min(f(s), f(t)) holds at every pair   min slack  0.6931 at (2,3) (the floor is (H-mono), the proven direction)
//
// === E. THE HUNT: EXTREMES AND FAMILY TRACES, NULLS IN-PASS =========
// five largest defects  : (4,10) 1.0761  (4,6) 1.0415  (4,12) 1.0330  (6,12) 1.0202  (4,16) 1.0033
// five most negative    : (7,7)-0.2400  (3,7)-0.1823  (3,3)-0.1823  (3,5)-0.0870  (7,8)-0.0339
// negative-D pairs      : 7 of 111 (the super-multiplicative side)
// global min D          : -0.2400 at (7,7)   [proven floor there: -3.4012]
//
// the (4,t) family -- the one that carries both record defects:
//   t :      2     3     4     5     6     7     8     9    10    11    12    13    14    15    16    17    18    19    20
//   D :  0.916 0.154 0.606 0.734 1.041 0.125 0.659 0.659 1.076 0.897 1.033 0.581 0.787 0.892 1.003 0.684 0.769 0.531 0.642
// (4,t) vs ln t (19 pts): slope  0.0808 +-  0.0957   POW null  0.0828 +-  0.0624   LOG null -0.4470
//   G2 minus POW: -0.0020 +-  0.1143   -> CONSISTENT WITH BOUNDED
//   ok    (4,t) peaks at t = 10 (the 37-spike) and every t >= 13 sits below it   peak D =  1.0761
//
// the doubling family (s,2), s = 2..41 -- Reduction 3's t0 = 2 slice:
// (s,2) vs ln s (40 pts): slope  0.0529 +-  0.0443   POW null  0.0864 +-  0.0399   LOG null -0.1313
//   G2 minus POW: -0.0336 +-  0.0596   -> CONSISTENT WITH BOUNDED
//
// the diagonal (b,b), b = 2..9 -- where a growing defect would live:
//   b :        2       3       4       5       6       7       8       9
//   D :   0.4055 -0.1823  0.6061  0.3483  0.8824 -0.2400  0.1823  0.6419
// (b,b) vs ln b (8 pts): slope  0.0826 +-  0.3110   POW null  0.6014 +-  0.2460   LOG null -0.6469
//   G2 minus POW: -0.5188 +-  0.3966   -> BELOW the bounded null
// (the diagonal has 8 points to sqrt(82) = 9; it cannot see growth, only
//  record that nothing visible grows -- the -01 blind spot, unchanged)
//
// === G. SUMMARY NUMBERS =============================================
// power-pair floor (trusted/custody)     :  1.0033 /  0.9694
// reduced trap window, trusted           : [ 1.0033, 1.3946)  width  0.3913
// reduced trap window, custody           : [ 0.9694, 1.3555)  width  0.3861
// doubling soft window (C2, custody)     : [ 5.2727,  19.2455)  -> limsup <= log2 C2
// t0 = 6 slice trap window (custody)     : [ 1.0415,  1.0986)  width  0.0572
// global extremes on 111 pairs           : max  1.0761 at (4,10), min -0.2400 at (7,7)
//
// self-test failures: 0   (all checks passed)
// total 0.0 s
// ============================================================================
// READINGS
// ============================================================

// 1. REDUCTION 1 IS FREE AND IT MOVES THE FLOOR. The bounded-defect Fekete
//    lemma's own eight-line proof consumes (H-sub) only at the power pairs
//    (b^k, b) -- the limsup induction is f(b^{k+1}) <= f(b^k) + f(b) + K and
//    the liminf half uses no pair at all -- so the hypothesis can be weakened
//    to (H-sub-pow) with the conclusion unchanged, by inspection of the
//    existing proof. The worst measured defects, 1.0761 at (4,10) and 1.0330
//    at (4,12), are NOT power pairs and stop constraining the candidate: the
//    power-pair reachable floor is 1.0033 at (16,4) (trusted; rests on
//    G2(61#) = 1080, Wang 2024) and 0.9694 at (16,2) (custody-exact). The
//    trap window widens from [1.0761, 1.3946), 0.3185 nats, to
//    [1.0033, 1.3946), 0.3913 nats trusted -- and [0.9694, 1.3555), 0.3861
//    nats on custody terms alone. [PROVEN, the reduction; VERIFIED, the
//    floors]
//
// 2. THE TPC FACE NEEDS ONE CHAIN; EXISTENCE NEEDS THE INF. (H-sub-pow) at
//    the SINGLE base b0 already gives limsup <= (f(b0)+K)/ln b0, so any
//    K < S(b0) on one geometric chain is TPC-implying (b0 = 16 at 1.3555
//    custody, b0 = 66 at 1.3946 trusted); a cofinal chain with two-sidedly
//    pinned steps a*n_j <= n_{j+1} <= b*n_j gives limsup <= (f(b)+K)/ln a
//    the same way. But NO single chain gives limit existence -- liminf >= L
//    takes the inf over ALL n, and the two faces close only when chains
//    exist at inf-realizing bases. And the chains that decide the trap are
//    completely dataless: no base b >= 10 has a single reachable pair
//    (b^2 > 82), so bases 16 and 66 are unconstrained by every measurement
//    the corpus owns. [PROVEN, the two faces; VERIFIED, the datalessness]
//
// 3. THE DOUBLING SLICE IS THE ROUTE'S ONE TRAP-FREE, PRIZE-BEARING TARGET.
//    The t0 = 2 slice Ghat(2s) <= C2 * Ghat(s) gives limsup <= log2(C2)
//    (Reduction 3). Its TPC line is C2 < 4 and the custody data already
//    exclude it (C2 >= 348/66 = 5.2727 at s = 16, both terms corpus-exact),
//    so NO provable doubling constant is TPC-implying -- the trap logic that
//    guards the general candidate is void on this slice, and a soft proof is
//    not excluded by it. Meanwhile every C2 in [5.2727, 2^beta2 = 19.2455)
//    lowers the proven exponent ceiling 4.2665 to log2(C2) in
//    [2.3985, 4.2665). One inequality, a 1.29-nat-wide landing zone, no trap
//    anywhere in it: this is the sharpest attackable statement this pass
//    found. [PROVEN, the implication; VERIFIED, the window]
//
// 4. SLICES SPLIT AT t0 = 6, AND THE t0 = 6 TRAP IS NEARLY SHUT. Slices
//    t0 = 2..5 have their per-slice traps CLOSED by data (reachable supD
//    >= S(t0)); slices t0 >= 6 are OPEN, and t0 = 6 is the narrowest: any
//    explicit K6 in [1.0415, 1.0986) -- 0.0572 nats, floor at the
//    custody-exact (4,6) -- would be TPC-implying, with implied bound 1.9681
//    at the floor. The general trap window [1.0761, 1.3946) stays the
//    operative one; this records that a single fixed-t inequality at t = 6
//    is already TPC-strength on a far thinner margin. [VERIFIED]
//
// 5. THE FOLD MACHINERY CANNOT REACH (H-sub), AND THE REASON IS NOW EXACT.
//    The fold step is multiplication by p_next/p <= 5/3 < 2 in Ghat's
//    argument coordinate, strictly below the candidate's integer floor
//    t >= 2 (the floor the corpus itself forced when real bases died at
//    ln C >= 2.01) -- so "the fold-step family" has no admissible pairs, and
//    every admissible pair crosses pi(st) - pi(s) >= 1 folds, unboundedly
//    many as s grows. In fold coordinates (H-sub) is IDENTICALLY the window
//    comparison sum of r_i over (pi(s), pi(st)] <= f(t) + K with r_i >= 0
//    proven by (H-mono) (identity verified to max dev 1.78e-15 at all 111 pairs):
//    head dominance of the fold-budget sequence. Copy theorem, Mirror-Sweep,
//    and the maxsum profiles are one-fold-local and supply no multi-fold
//    decay; the proven directions (copying, disjoint-set super-additivity)
//    bound D from BELOW -- D >= -min(f(s), f(t)) holds at every pair -- the
//    side (H-sub) does not need. [PROVEN / VERIFIED]
//
// 6. THE HUNT FOUND NO COUNTEREXAMPLE FAMILY. Over all 111 reachable pairs:
//    max D = 1.0761 at (4,10), min D = -0.2400 at (7,7), 7 pairs negative.
//    The (4,t) family that carries both record defects peaks at t = 10 (the
//    37-spike) and every t >= 13 sits below the peak; its slope against the
//    in-pass constant-defect null reads -0.0020 +- 0.1143. The doubling
//    family (s,2) reads -0.0336 +- 0.0596 against the same null. Both
//    CONSISTENT WITH BOUNDED; neither drifts. The diagonal (b,b) -- the one
//    place unbounded growth could hide -- reads BELOW the bounded null
//    (-0.5188 +- 0.3966, 1.3 sigma, 8 points to b = 9): leaning
//    super-multiplicative, seeing nothing, and still blind past b = 9
//    exactly as -01 recorded. [MEASURED]
//
// 7. NOT REACHED, so the next reader does not re-walk it: no instance of
//    (H-sub) is proven for any family -- the three reductions are quantifier
//    surgery on the lemma, not theorems about G2; the doubling inequality of
//    reading 3 is posed, not attacked; no new defect data beyond st = 82
//    exists to collect until the ladder grows (the 61# enumeration remains
//    ~146,969x the 43# run); and the diagonal stays invisible past
//    sqrt(82). [INFERRED]
