// ============================================================================
// FOLD PROFILE 06 — IS THE SURVIVAL LAW SCALE FREE?
// ============================================================================
// 05 computed the exact survival curve inside the T23 window: fold in every
// prime after 23 and watch the twin slots go from 7,952,175 down to 895,790,
// with the ratio S/P against the product law W*(1/2)*prod(1-2/q) staying inside
// [0.86, 1.014] the whole way.
//
// The decision-relevant question for the programme is whether the TILE buys
// anything here. If S/P is a function of u = ln W / ln y alone, then choosing a
// bigger tile moves W and the target y together and buys nothing at all: the
// question is scale free and the fold picture is a picture, not a lever.
//
// Test: run the same curve in three windows of very different size and shape,
//   [0, 19#)  =  9,699,690    a primorial window, exact start at D = 378,675
//   [0, 23#)  =  223,092,870  a primorial window, exact start at D = 7,952,175
//   [0, 5e8)               an arbitrary window, no tile structure at all
// and plot S/P against u. Collapse onto one curve means scale free.
//
// Run:  node --max-old-space-size=8000 fold-profile-06-scale-free.js
// ============================================================================
'use strict';

const t0 = Date.now();
const el = () => ((Date.now() - t0) / 1000).toFixed(1) + 's';
const log = (s) => process.stderr.write('   [' + el() + '] ' + s + '\n');

function primesTo(n) {
  const c = new Uint8Array(n + 1); const out = [];
  for (let i = 2; i <= n; i++) { if (!c[i]) { out.push(i); for (let j = i * i; j <= n; j += i) c[j] = 1; } }
  return out;
}

// survival curve in [0, W): returns samples of (y, u, S, P, S/P)
function curveFor(W, label, custodyD) {
  const LIMIT = W + 2;
  const ROOT = Math.floor(Math.sqrt(LIMIT)) + 1;
  const PS = primesTo(ROOT + 10);
  log(`${label}: sieving [0, ${W.toLocaleString()}] ...`);
  const rough = new Uint8Array(LIMIT + 1).fill(1);
  rough[0] = 0;
  let alive = 0, prod = 1;
  const out = [];
  // seed: nothing sifted yet. Sift prime by prime from 2 up.
  // count of alive pairs is maintained incrementally after the first prime.
  for (const p of PS) {
    for (let m = p; m <= LIMIT; m += p) rough[m] = 0;
    prod *= (p === 2 ? 0.5 : 1 - 2 / p);
    if (p === 2) continue;
    if (p === 3) { alive = 0; for (let n = 0; n < W; n++) if (rough[n] && rough[n + 2]) alive++; }
    else {
      // recount incrementally is not possible now (we already wiped), so do it
      // properly: mark-and-decrement from here on.
    }
    break;
  }
  // restart cleanly with the incremental method
  rough.fill(1); rough[0] = 0;
  for (const q of [2, 3]) for (let m = q; m <= LIMIT; m += q) rough[m] = 0;
  alive = 0; for (let n = 0; n < W; n++) if (rough[n] && rough[n + 2]) alive++;
  prod = 0.5 * (1 - 2 / 3);
  out.push({ y: 3, u: Math.log(W) / Math.log(3), S: alive, P: W * prod });

  for (const p of PS) {
    if (p <= 3) continue;
    for (let m = p; m <= LIMIT; m += p) {
      if (!rough[m]) continue;
      rough[m] = 0;
      if (m >= 2 && m - 2 < W && rough[m - 2]) alive--;
      if (m < W && rough[m + 2]) alive--;
    }
    prod *= (1 - 2 / p);
    out.push({ y: p, u: Math.log(W) / Math.log(p), S: alive, P: W * prod });
  }
  if (custodyD !== undefined) {
    const at = out.find((r) => r.y === custodyD.y);
    console.log(`   CUSTODY ${label}: S at y = ${custodyD.y} is ${at.S.toLocaleString()}, ` +
      `expected ${custodyD.D.toLocaleString()}  ${at.S === custodyD.D ? 'MATCH' : '*** MISMATCH ***'}`);
  }
  return out;
}

console.log('='.repeat(96));
console.log('FOLD PROFILE 06 — the survival law against u = ln W / ln y, in three windows');
console.log('='.repeat(96));
console.log('');

const W19 = 9699690, W23 = 223092870, WARB = 500000000;
const c19 = curveFor(W19, 'W = 19#', { y: 19, D: 378675 });
const c23 = curveFor(W23, 'W = 23#', { y: 23, D: 7952175 });
const cAR = curveFor(WARB, 'W = 5e8 ');

// sample each curve at a common grid of u
function ratioAt(curve, u) {
  // curve is ordered by increasing y, i.e. decreasing u
  for (let i = 1; i < curve.length; i++) {
    if (curve[i].u <= u && curve[i - 1].u >= u) {
      const a = curve[i - 1], b = curve[i];
      const f = (a.u - u) / (a.u - b.u);
      const ra = a.S / a.P, rb = b.S / b.P;
      return ra * (1 - f) + rb * f;
    }
  }
  return NaN;
}

console.log('');
console.log('   u    |  S/P  in 19#  |  S/P in 23#  |  S/P in 5e8  |  spread  | note');
console.log('-'.repeat(96));
const US = [6.0, 5.5, 5.0, 4.5, 4.26645, 4.0, 3.75, 3.5, 3.25, 3.0, 2.9, 2.8, 2.7, 2.6, 2.5, 2.4, 2.3, 2.2, 2.1, 2.0];
for (const u of US) {
  const a = ratioAt(c19, u), b = ratioAt(c23, u), c = ratioAt(cAR, u);
  const vals = [a, b, c].filter((v) => !isNaN(v));
  const spread = vals.length > 1 ? Math.max(...vals) - Math.min(...vals) : NaN;
  const note = Math.abs(u - 4.26645) < 1e-6 ? 'beta_2: DHR lower bound dies here'
    : (u === 2.0 ? 'u = 2: survivors ARE the twin primes' : '');
  console.log(`  ${u.toFixed(3).padStart(6)} | ${(isNaN(a) ? '-' : a.toFixed(4)).padStart(13)} | ` +
    `${(isNaN(b) ? '-' : b.toFixed(4)).padStart(12)} | ${(isNaN(c) ? '-' : c.toFixed(4)).padStart(12)} | ` +
    `${(isNaN(spread) ? '-' : spread.toFixed(4)).padStart(8)} | ${note}`);
}

console.log('');
console.log('   The asymptotic prediction at u = 2 is e^{2gamma}/4 = ' + (Math.exp(2 * 0.5772156649) / 4).toFixed(4) +
  ', the repo\'s Unification Law trough constant.');
console.log('   Measured values sit above it by the finite-size Hardy-Littlewood correction,');
console.log('   which is the same factor in every window:');
for (const [lab, cur, W] of [['19#', c19, W19], ['23#', c23, W23], ['5e8', cAR, WARB]]) {
  const last = cur[cur.length - 1];
  const hl = 1.3203236316 * W / (Math.log(W) * Math.log(W));
  console.log(`     ${lab}: S(sqrt W) = ${last.S.toLocaleString().padStart(9)},  S/P = ${(last.S / last.P).toFixed(4)},  ` +
    `S/HL = ${(last.S / hl).toFixed(4)},  (e^{2g}/4)*(S/HL) = ${((Math.exp(2 * 0.5772156649) / 4) * (last.S / hl)).toFixed(4)}`);
}

console.log('');
console.log('   done in ' + el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/fold-profile-06-scale-free.js
//   invocation:  node research/fold-profile-06-scale-free.js
//   code-sha256: 91142e9c9057fea24dea7bbbc4abe9d50a11806d677c48a2f390ba3547da0fda
//   out-sha256:  224adc855083786bd86050df218e88df0007de487a221d303f864aa8f6c0c055
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     6.9 s
// ============================================================================
// ================================================================================================
// FOLD PROFILE 06 — the survival law against u = ln W / ln y, in three windows
// ================================================================================================
//
//    CUSTODY W = 19#: S at y = 19 is 378,675, expected 378,675  MATCH
//    CUSTODY W = 23#: S at y = 23 is 7,952,175, expected 7,952,175  MATCH
//
//    u    |  S/P  in 19#  |  S/P in 23#  |  S/P in 5e8  |  spread  | note
// ------------------------------------------------------------------------------------------------
//    6.000 |        1.0000 |       1.0000 |       1.0000 |   0.0000 |
//    5.500 |        1.0000 |       1.0000 |       1.0000 |   0.0000 |
//    5.000 |        1.0000 |       1.0000 |       1.0000 |   0.0000 |
//    4.500 |        1.0000 |       1.0000 |       1.0000 |   0.0000 |
//    4.266 |        0.9999 |       1.0000 |       0.9999 |   0.0001 | beta_2: DHR lower bound dies here
//    4.000 |        0.9998 |       0.9995 |       0.9995 |   0.0003 |
//    3.750 |        0.9997 |       0.9992 |       0.9991 |   0.0006 |
//    3.500 |        1.0010 |       1.0005 |       1.0001 |   0.0009 |
//    3.250 |        1.0056 |       1.0050 |       1.0053 |   0.0006 |
//    3.000 |        1.0116 |       1.0132 |       1.0134 |   0.0019 |
//    2.900 |        1.0102 |       1.0135 |       1.0143 |   0.0041 |
//    2.800 |        1.0062 |       1.0104 |       1.0113 |   0.0052 |
//    2.700 |        0.9984 |       1.0024 |       1.0036 |   0.0052 |
//    2.600 |        0.9848 |       0.9890 |       0.9914 |   0.0065 |
//    2.500 |        0.9664 |       0.9707 |       0.9723 |   0.0059 |
//    2.400 |        0.9444 |       0.9454 |       0.9470 |   0.0026 |
//    2.300 |        0.9169 |       0.9143 |       0.9154 |   0.0026 |
//    2.200 |        0.8922 |       0.8819 |       0.8813 |   0.0109 |
//    2.100 |        0.8823 |       0.8607 |       0.8580 |   0.0243 |
//    2.000 |        0.9232 |       0.8927 |       0.8880 |   0.0353 | u = 2: survivors ARE the twin primes
//
//    The asymptotic prediction at u = 2 is e^{2gamma}/4 = 0.7931, the repo's Unification Law trough constant.
//    Measured values sit above it by the finite-size Hardy-Littlewood correction,
//    which is the same factor in every window:
//      19#: S(sqrt W) =    57,370,  S/P = 0.9241,  S/HL = 1.1594,  (e^{2g}/4)*(S/HL) = 0.9195
//      23#: S(sqrt W) =   895,790,  S/P = 0.8929,  S/HL = 1.1238,  (e^{2g}/4)*(S/HL) = 0.8912
//      5e8: S(sqrt W) = 1,839,791,  S/P = 0.8881,  S/HL = 1.1181,  (e^{2g}/4)*(S/HL) = 0.8867
//
//    done in 6.8s
// ───── stderr ─────
//    [0.0s] W = 19#: sieving [0, 9,699,690] ...
//    [0.1s] W = 23#: sieving [0, 223,092,870] ...
//    [2.1s] W = 5e8 : sieving [0, 500,000,000] ...
// ============================================================================
// READINGS (2026-08-18) — honestly calibrated
// ============================================================================
// 1. THE ANSWER IS YES, THE LAW IS SCALE FREE, AND THE TILE BUYS NOTHING. Down
//    to u = 2.4 the three windows agree to 0.0065 or better, and over
//    u = 6.0..3.5 the spread is at most 0.0009. Two of the windows are exact
//    primorial periods with tile structure and the third, [0, 5e8), has none;
//    they lie on the same curve. That is the decision-relevant result: since
//    S/P depends on u alone, enlarging the tile moves W and the target y
//    together and changes nothing. The fold picture is a picture, not a lever.
// 2. THE COLLAPSE DOES BREAK AT THE BOTTOM, AND THE FILE'S REPAIR IS SOUND BUT
//    ITS PRINTED CHECK IS VACUOUS. The spread column grows monotonically over
//    the last four rows: 0.0026, 0.0109, 0.0243, 0.0353, ending at u = 2 with
//    0.9232 / 0.8927 / 0.8880 ordered by window size. The file attributes that
//    to the finite-size Hardy-Littlewood factor and prints
//    (e^{2g}/4)*(S/HL) = 0.9195, 0.8912, 0.8867 against measured S/P = 0.9241,
//    0.8929, 0.8881. The agreement is real (0.50%, 0.19%, 0.16% = the summary block's
//    (S/P − (e^{2g}/4)(S/HL)) / (S/P), shrinking with W) — but it carries NO information about survival, because S cancels:
//        (S/P) / [(e^{2g}/4)(S/HL)] = 4*HL / (P * e^{2g}),
//    which has no S in it. What is being verified is the twin-Mertens theorem
//    prod_{3<=q<=y}(1-2/q) ~ 4*C2*e^{-2gamma}/ln^2 y at y = sqrt(W), against the
//    Hardy-Littlewood constant. That is a true and useful check of the product
//    law, and it is NOT evidence that the u = 2 spread is finite-size. The
//    argument for that has to come from the shrinking of the spread with W,
//    which is visible (0.0353 over three windows spanning 9,699,690 = 9.7e6 to 5e8) but
//    rests on three points. MEDIUM confidence in the conclusion; the printed
//    check does not support it.
// 3. THIS FILE PRINTS 0.8929, WHICH SETTLES A WAVE-5 QUESTION THE OTHER WAY.
//    The wave-5 partition report (research/history/staging/qc-scripts-S2.md,
//    finding S2-19) recorded FOLD-PROFILE.md:393's "against 0.8929" as a slip,
//    on the ground that "fold-profile-06 gives 0.8927 at exactly u = 2.000 ...
//    so neither figure is 0.8929". The summary block of THIS run reads
//    "23#: S(sqrt W) = 895,790, S/P = 0.8929". So 0.8929 is a real number with a
//    real home, and it is this file's, at y = sqrt(W) rather than at the last
//    prime below it. The .md is still confusing — its table quotes
//    fold-profile-05's 0.8926 and its prose three lines later quotes
//    fold-profile-06's 0.8929 without naming either sampling point — but the
//    defect is a missing citation, not a wrong digit.
// 4. THIS FILE ALSO DISAGREES WITH ITSELF IN THE SAME THIRD DIGIT, IN ALL THREE
//    WINDOWS. Table row u = 2.000: 0.9232, 0.8927, 0.8880. Summary block
//    S(sqrt W): 0.9241, 0.8929, 0.8881. Same quantity, two sampling conventions
//    (the u-grid row versus y = floor(sqrt(W))), never reconciled and never
//    flagged. Any downstream quote of "the u = 2 value" is ambiguous at the
//    0.1% level, and fold-profile-05 supplies a third convention (0.8926 at
//    y = 14,929, the last prime below the root). Three numbers, one quantity.
// 5. THE CURVE'S SHAPE REPRODUCES 05 IN ALL THREE WINDOWS. S/P is flat at
//    1.0000 to u = 4.5, dips to 0.9991-0.9997 near u = 3.75, rises to a peak of
//    1.0116-1.0143 at u = 2.9-3.0, falls to a minimum of 0.8580-0.8823 at
//    u = 2.1, and turns UP again at u = 2.0. The overshoot and the two turning
//    points are present in the structureless 5e8 window too, so they are
//    properties of the two-dimensional sieve and not of primorial windows.
// 6. beta_2 IS INVISIBLE IN THE DATA. The u = 4.266 row is annotated "DHR lower
//    bound dies here" and its S/P values are 0.9999, 1.0000, 0.9999 — the curve
//    does not notice. The threshold is a limit of what can be PROVEN, not a
//    feature of the object. Worth saying out loud, because the annotated row
//    invites the opposite reading.
// 7. SCOPE. Three windows, two of them primorial and nested (19# divides 23#),
//    so the two "tile" samples are not independent. The arbitrary window is one
//    round number, not a random offset, so "no tile structure" is asserted
//    rather than sampled. No error bars anywhere and no repeat windows at the
//    same size. Runtime 6.9 s, plain node; the header's suggested
//    --max-old-space-size=8000 was not needed.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   the stderr line's 9,699,690 -> "9.7e6" in reading 2.
// TOKENIZER ARTIFACT, not a figure: the three hyphenated ranges in reading 5,
//   0.9991-0.9997 and 1.0116-1.0143 and 0.8580-0.8823, make the scanner read
//   the upper endpoint as a negative number. All six endpoints are cells of
//   the u table: 0.9997 and 0.9991 in the u = 3.750 row, 1.0116 in the
//   u = 3.000 row, 1.0143 in the u = 2.900 row, 0.8823 and 0.8580 in the
//   u = 2.100 row.
// DERIVED IN THIS READING by arithmetic over printed values: the 0.50%, 0.19%
//   and 0.16% of reading 2 are the relative gaps between the summary block's
//   measured S/P and its (e^{2g}/4)*(S/HL), window by window. 0.4978, 0.1904
//   and 0.1576 percent, from the pairs 0.9241 against 0.9195, 0.8929 against
//   0.8912, and 0.8881 against 0.8867. Checked.
// BORROWED, verified present in the named producer's embedded OUTPUT: the
//   0.8926 and the y = 14,929 of readings 3 and 4 are the last table row of
//   research/fold-profile-05-survival-curve.js, which reads
//   "14929 | 2.0001 | 895,790 | 1003543 | 0.8926".
// IN-CODE: the 8000 of reading 7 is the heap size in the Run line of the
//   header, at line 20, not a measurement.
// STALE POINTER, correct when the reading was written on 2026-08-18:
//   FOLD-PROFILE.md:393 for the "against 0.8929" sentence is now line 397.
//   The document gained a citation block at lines 404 to 410, exactly the
//   repair readings 3 and 4 asked for, which pushed everything down by four.
//   The wave-5 report the reading quotes is at
//   research/history/staging/qc-scripts-S2.md, finding S2-19 at its line 297.
// ---------------------------------------------------------------------------
