// attack-fekete-1d-02-lemma.js
//
// TODO 1d: WHAT DOES A BOUNDED DEFECT BUY? THE EXACT LEMMA, ITS HYPOTHESES
// VERIFIED, AND ITS CONCLUSION CALIBRATED ON KNOWN-TRUTH CONTROLS.
//
// THE QUESTION. import-interp.md 5 read the submultiplicativity defect as
// BOUNDED on the reachable range, and 7 left the open target as "S is
// super-additive up to a bounded error, error never named". This file states
// the exact lemma that converts a bounded defect into limit existence, proves
// it in the comments below, verifies every hypothesis that can be verified
// today, and runs its conclusion formula on two synthetic ladders whose true
// exponents are known, so the formula's finite-range behaviour is calibrated
// before anything is claimed about G2.
//
// ---------------------------------------------------------------------------
// LEMMA (multiplicative Fekete with bounded defect).
//   Let f : {2, 3, 4, ...} -> [0, infinity) satisfy
//     (H-sub)  f(s*t) <= f(s) + f(t) + K   for all integers s, t >= 2,
//              for some constant K >= 0;
//     (H-mono) f is nondecreasing.
//   Then  lim_{n->inf} f(n)/ln n  EXISTS and equals
//     L = inf_{n>=2} (f(n) + K)/ln n,   with 0 <= L < infinity.
//
// PROOF.
//   (liminf >= L)  For every n, (f(n)+K)/ln n >= L by definition of inf, so
//     f(n)/ln n >= L - K/ln n  ->  liminf f(n)/ln n >= L.
//   (limsup <= L)  Fix any base b >= 2. Iterating (H-sub) on b^(k+1) gives
//     f(b^(k+1)) <= (k+1) f(b) + k K.  For n in [b^k, b^(k+1)), (H-mono) gives
//     f(n) <= f(b^(k+1)) <= (k+1) f(b) + k K,  and ln n >= k ln b, so
//     f(n)/ln n <= ((k+1) f(b) + k K)/(k ln b) -> (f(b)+K)/ln b  as k -> inf.
//     Hence limsup f(n)/ln n <= (f(b)+K)/ln b for EVERY b, i.e. limsup <= L.
//   L >= 0 since f >= 0; L < infinity since L <= (f(2)+K)/ln 2.        QED
//
// TWO REMARKS THAT ARE THE POINT.
//   1. NO SPLIT IS EVER NEEDED. BGT's interpolation died on hypothesis H1
//      because pi(st) != pi(s) + pi(t) -- the ground set does not split
//      (import-interp.md 2). This lemma never asks an integer to factor:
//      primes enter only as points where (H-mono) bridges between powers of a
//      base. The one-sided inequality plus monotonicity replaces the additive
//      ground set entirely. That is why the bounded-defect route survives the
//      obstruction that killed the machine.
//   2. WHAT IT BUYS AND WHAT IT DOES NOT. With f = ln Ghat (Ghat(x) = G2(p#)
//      at the largest prime p <= x), the conclusion is: beta = lim ln
//      G2(x#)/ln x EXISTS -- along integers, hence along reals, since Ghat is
//      a step function. Existence makes 1d's central question well-posed.
//      It does NOT give beta < 2: from L = inf (f(n)+K)/ln n,
//          beta < 2  <=>  exists n with S(n) = ln(n^2/Ghat(n)) > K,
//      so the Zone-Postulate-strength conclusion is EXACTLY "the slack beats
//      the defect constant at one integer" -- the trap (any explicit K below
//      the threshold is TPC-implying) and the prize (existence needs no
//      explicit K) are the two faces of this one equivalence.
// ---------------------------------------------------------------------------
//
// HYPOTHESIS STATUS, and what this file verifies:
//   (H-sub)  OPEN. This is the candidate itself. VERIFIED at all reachable
//            pairs with K = ln 2.9333 = 1.0761 (attack-fekete-1d-01,
//            import-interp-01); unproven beyond the ladder. Everything the
//            lemma concludes about G2 is conditional on it.
//   (H-mono) PROVEN, one line: the twin-slot set of T_next is a SUBSET of the
//            (periodized) twin-slot set of T_x -- folding only deletes slots
//            -- and deleting points only merges gaps, so G2(x#) is
//            nondecreasing in x, hence Ghat is nondecreasing. This file
//            VERIFIES the subset property by direct sieve at every fold
//            3->5->7->11->13->17->19 (periods to 9,699,690) and monotonicity
//            on all 22 ladder terms.
//   (f >= 0) Ghat >= 2 everywhere, so f = ln Ghat >= ln 2 > 0. Trivial.
//
// HONEST DOUBT. The lemma is elementary and the proof is eight lines; the
// risk is not the proof but the temptation to read its conclusion as
// unconditional. It is conditional on (H-sub), which is unproven, is the
// whole content, and -- with any explicit K < 1.3555 -- is TPC-implying, so
// no soft proof of it should be expected. The controls below also show the
// finite-range inf DOES NOT converge quickly: on the known-truth LOG control
// the inf formula still reads 53% high at n = 10^6, so nothing about the
// VALUE of beta should ever be quoted from a finite inf.
//
// ARITHMETIC NOTE. Sieves run to 19# = 9,699,690 < 2^53; all masks are
// Uint8Array, no shift operators, no BigInt needed.
//
// usage: node research/attack-fekete-1d-02-lemma.js

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

// ------------------------------------------------- custody: the ladder again
const srcLadder = fs.readFileSync(path.join(__dirname, 'exact-g2-ladder.js'), 'utf8');
const EXACT = [];
{
  const re = /\{ x: (\d+),\s+g: (\d+),/g;
  let m;
  while ((m = re.exec(srcLadder)) !== null) EXACT.push({ x: +m[1], g: +m[2] });
}
const srcInterp = fs.readFileSync(path.join(__dirname, 'import-interp-01-bgt-defect.js'), 'utf8');
const A144311 = srcInterp.match(/const A144311 = \[([^\]]+)\]/s)[1].split(',').map((s) => parseInt(s.trim(), 10));
const PR = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79];
const G2FULL = A144311.map((v) => v + 1);

console.log('=== 1. (H-mono): THE SUBSET PROOF, VERIFIED AT SEVEN LEVELS ========');
// twin-slot set of T_x: r in [0, x#) with r != 0 and r != -2 mod every p <= x.
// The claim behind (H-mono): slots(T_next), reduced mod x#, is a subset of
// slots(T_x) -- adding a prime only adds kill conditions. Verified literally.
const CHAIN = [2, 3, 5, 7, 11, 13, 17, 19];
function slotMask(primes, period) {
  const m = new Uint8Array(period).fill(1);
  for (const p of primes) {
    for (let r = 0; r < period; r += p) m[r] = 0;                 // r = 0 mod p
    for (let r = ((p - 2) % p); r < period; r += p) m[r] = 0;     // r = -2 mod p
  }
  return m;
}
function maxGap(mask) {
  // maximum circular gap between consecutive 1s
  const n = mask.length;
  let first = -1; let last = -1; let best = 0; let prev = -1;
  for (let i = 0; i < n; i++) {
    if (!mask[i]) continue;
    if (first < 0) first = i; else best = Math.max(best, i - prev);
    prev = i; last = i;
  }
  if (first < 0) return 0;
  return Math.max(best, first + n - last);   // wrap-around gap
}
let period = 2;
let mask = slotMask([2], 2);
for (let i = 1; i < CHAIN.length; i++) {
  const p = CHAIN[i];
  const newPeriod = period * p;
  const newMask = slotMask(CHAIN.slice(0, i + 1), newPeriod);
  // subset: every slot of the new tile is a slot of the old one mod period
  let subset = true; let newCount = 0;
  for (let r = 0; r < newPeriod; r++) {
    if (!newMask[r]) continue;
    newCount++;
    if (!mask[r % period]) { subset = false; break; }
  }
  const gOld = maxGap(mask); const gNew = maxGap(newMask);
  const lad = EXACT.find((e) => e.x === p);
  check('fold ' + CHAIN[i - 1] + '->' + p + ': slots(T_' + p + ') subset of slots(T_' + CHAIN[i - 1] + '), G2 ' + gOld + ' -> ' + gNew,
    subset && gNew >= gOld && lad && gNew === lad.g,
    'survivors ' + newCount + ', ladder says G2(' + p + '#) = ' + (lad ? lad.g : '?'));
  period = newPeriod; mask = newMask;
}
console.log('largest period sieved: ' + period.toLocaleString('en-US') + ' = 19#');
{
  let mono = true;
  for (let i = 1; i < G2FULL.length; i++) mono = mono && G2FULL[i] >= G2FULL[i - 1];
  check('G2 nondecreasing on all 22 ladder terms (8 literature)', mono);
  check('f = ln Ghat >= ln 2 > 0 (positivity)', Math.min(...G2FULL) >= 2);
}

console.log('');
console.log('=== 2. (H-sub): THE CANDIDATE, STATUS RESTATED =====================');
// Not re-derived here: attack-fekete-1d-01-defect47.js holds the pair table.
// One structural check is cheap and belongs to THIS file: the lemma needs
// (H-sub) on PRODUCTS only, so the primes' failure to factor is no obstacle.
{
  const mkAt = (t) => { let k = -1; for (let i = 0; i < PR.length; i++) if (PR[i] <= t) k = i; return k < 0 ? null : G2FULL[k]; };
  let worstR = 0; let wp = null;
  for (let s = 2; s * s <= 82; s++) for (let t = s; s * t <= 82; t++) {
    const R = mkAt(s * t) / (mkAt(s) * mkAt(t));
    if (R > worstR) { worstR = R; wp = [s, t]; }
  }
  check('(H-sub) holds at every reachable pair with K = ln ' + F(worstR), worstR < Math.exp(1.3555),
    'sup at (' + wp[0] + ',' + wp[1] + '), ln = ' + F(Math.log(worstR)) + '; UNPROVEN beyond the ladder');
  console.log('  status: OPEN. Explicit K < 1.3555 (custody threshold) is TPC-implying;');
  console.log('  the existence conclusion needs only SOME K, unnamed.');
}

console.log('');
console.log('=== 3. THE CONCLUSION FORMULA ON KNOWN-TRUTH CONTROLS ==============');
// L = inf_n (f(n)+K)/ln n is approached from ABOVE on any finite range (an
// inf over a subset can only overshoot). How fast? Two controls whose true
// beta is known, sampled at every integer 2..N (no step artifact, so what is
// measured is the FORMULA's convergence, not the ladder's sampling):
//   POW  f(n) = ln(1.84 * n^1.546)      true beta = 1.546, defect const
//   LOG  f(n) = ln(1.016 * n * ln^2 n)  true beta = 1,     delta = 2
// For each, K is set to its true sup defect on n <= N (measured on a pair
// grid), and the finite-range inf is tabulated against N.
function calibrate(name, f, trueBeta, N) {
  // sup defect on a pair grid (s <= 1000, st <= N)
  let K = 0;
  for (let s = 2; s <= 1000; s++) {
    for (let t = s; s * t <= N; t = Math.max(t + 1, Math.floor(t * 1.05))) {
      K = Math.max(K, f(s * t) - f(s) - f(t));
    }
  }
  const rows = [];
  let inf = Infinity;
  let nextPrint = 10;
  for (let n = 2; n <= N; n++) {
    inf = Math.min(inf, (f(n) + K) / Math.log(n));
    if (n === nextPrint || n === N) {
      rows.push({ n, inf, ratio: f(n) / Math.log(n) });
      nextPrint *= 10;
    }
  }
  console.log(name + '  true beta = ' + trueBeta + ',  K(measured sup defect) = ' + F(K));
  console.log('  n        : ' + rows.map((r) => pad(r.n, 10)).join(''));
  console.log('  f/ln n   : ' + rows.map((r) => pad(r.ratio.toFixed(4), 10)).join(''));
  console.log('  inf-form : ' + rows.map((r) => pad(r.inf.toFixed(4), 10)).join(''));
  const last = rows[rows.length - 1];
  console.log('  overshoot of the inf formula at N = ' + N + ': ' + F(100 * (last.inf - trueBeta) / trueBeta, 1) + '%  (from above: ' + (last.inf >= trueBeta ? 'yes' : 'NO -- BROKEN') + ')');
  check(name.trim() + ': inf formula sits ABOVE the true beta and falls toward it',
    last.inf >= trueBeta - 1e-9 && last.inf <= rows[0].inf + 1e-9, '');
  return last.inf;
}
calibrate('POW', (n) => Math.log(1.84) + 1.546 * Math.log(n), 1.546, 1e6);
calibrate('LOG', (n) => Math.log(1.016 * n) + 2 * Math.log(Math.log(n)), 1, 1e6);
console.log('reading: the formula is sound and SLOW; on LOG it still reads 53% high');
console.log('at n = 10^6. A finite-range inf is an upper bound on beta, never beta.');

console.log('');
console.log('=== 4. THE CONDITIONAL APPLICATION TO G2, both faces ===============');
{
  const mkAt = (t) => { let k = -1; for (let i = 0; i < PR.length; i++) if (PR[i] <= t) k = i; return k < 0 ? null : G2FULL[k]; };
  const K = Math.log(528 / 180);   // reachable sup, custody terms (4,10)
  let best = Infinity; let bb = 0;
  for (let n = 2; n < 83; n++) { const v = (Math.log(mkAt(n)) + K) / Math.log(n); if (v < best) { best = v; bb = n; } }
  console.log('IF (H-sub) held with the reachable K = ' + F(K) + ' (a LOWER bound on any');
  console.log('true K, so this row is the TRAP illustrated, not a bound):');
  console.log('  beta <= min_n (ln Ghat(n) + K)/ln n = ' + F(best) + '  at n = ' + bb);
  check('the 1.8992 of import-interp.md 4 is THIS formula at b = 16', Math.abs(best - 1.8992) < 5e-4 && bb === 16, F(best));
  console.log('  i.e. < 2: any proof of (H-sub) with C in [2.9333, 3.8788) IS a proof of');
  console.log('  beta < 2 via custody terms alone -- the one-way door.');
  console.log('WITH K UNNAMED (the honest target): beta EXISTS, equals inf_n (f(n)+K)/ln n,');
  console.log('  and beta < 2 <=> S(n) > K at a single integer. Existence alone makes');
  console.log('  1d\'s question -- does G2(x#)/x^2 fall -- well-posed: under existence,');
  console.log('  beta < 2 forces the ratio to 0 and beta > 2 forces it to infinity;');
  console.log('  only beta = 2 leaves the sublinear part to decide.');
  console.log('UNCONDITIONALLY: nothing here moves the proven 4.2665 -> 2 gap.');
}

console.log('');
console.log('self-test failures: ' + FAILS + (FAILS ? '   <-- DO NOT TRUST THIS OUTPUT' : '   (all checks passed)'));
console.log('total ' + ((Date.now() - T0) / 1000).toFixed(1) + ' s');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-fekete-1d-02-lemma.js
//   invocation:  node research/attack-fekete-1d-02-lemma.js
//   code-sha256: 62cb37d91880292b3f98d613c739df7a5a60e5f38a4c2281fa5b17f06862fd30
//   out-sha256:  1c99d42b15fc6a1a12f56e2905a4e056680c11f17890d059f8cb1307e2b8a0ea
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     0.2 s
// ============================================================================
// === 1. (H-mono): THE SUBSET PROOF, VERIFIED AT SEVEN LEVELS ========
//   ok    fold 2->3: slots(T_3) subset of slots(T_2), G2 2 -> 6   survivors 1, ladder says G2(3#) = 6
//   ok    fold 3->5: slots(T_5) subset of slots(T_3), G2 6 -> 12   survivors 3, ladder says G2(5#) = 12
//   ok    fold 5->7: slots(T_7) subset of slots(T_5), G2 12 -> 30   survivors 15, ladder says G2(7#) = 30
//   ok    fold 7->11: slots(T_11) subset of slots(T_7), G2 30 -> 42   survivors 135, ladder says G2(11#) = 42
//   ok    fold 11->13: slots(T_13) subset of slots(T_11), G2 42 -> 66   survivors 1485, ladder says G2(13#) = 66
//   ok    fold 13->17: slots(T_17) subset of slots(T_13), G2 66 -> 108   survivors 22275, ladder says G2(17#) = 108
//   ok    fold 17->19: slots(T_19) subset of slots(T_17), G2 108 -> 150   survivors 378675, ladder says G2(19#) = 150
// largest period sieved: 9,699,690 = 19#
//   ok    G2 nondecreasing on all 22 ladder terms (8 literature)
//   ok    f = ln Ghat >= ln 2 > 0 (positivity)
//
// === 2. (H-sub): THE CANDIDATE, STATUS RESTATED =====================
//   ok    (H-sub) holds at every reachable pair with K = ln  2.9333   sup at (4,10), ln =  1.0761; UNPROVEN beyond the ladder
//   status: OPEN. Explicit K < 1.3555 (custody threshold) is TPC-implying;
//   the existence conclusion needs only SOME K, unnamed.
//
// === 3. THE CONCLUSION FORMULA ON KNOWN-TRUTH CONTROLS ==============
// POW  true beta = 1.546,  K(measured sup defect) =  0.0000
//   n        :         10       100      1000     10000    100000   1000000
//   f/ln n   :     1.8108    1.6784    1.6343    1.6122    1.5990    1.5901
//   inf-form :     1.8108    1.6784    1.6343    1.6122    1.5990    1.5901
//   overshoot of the inf formula at N = 1000000:  2.9%  (from above: yes)
//   ok    POW: inf formula sits ABOVE the true beta and falls toward it
// LOG  true beta = 1,  K(measured sup defect) =  2.1034
//   n        :         10       100      1000     10000    100000   1000000
//   f/ln n   :     1.7313    1.6667    1.5619    1.4839    1.4259    1.3813
//   inf-form :     2.6448    2.1235    1.8664    1.7122    1.6086    1.5335
//   overshoot of the inf formula at N = 1000000:  53.4%  (from above: yes)
//   ok    LOG: inf formula sits ABOVE the true beta and falls toward it
// reading: the formula is sound and SLOW; on LOG it still reads 53% high
// at n = 10^6. A finite-range inf is an upper bound on beta, never beta.
//
// === 4. THE CONDITIONAL APPLICATION TO G2, both faces ===============
// IF (H-sub) held with the reachable K =  1.0761 (a LOWER bound on any
// true K, so this row is the TRAP illustrated, not a bound):
//   beta <= min_n (ln Ghat(n) + K)/ln n =  1.8992  at n = 16
//   ok    the 1.8992 of import-interp.md 4 is THIS formula at b = 16    1.8992
//   i.e. < 2: any proof of (H-sub) with C in [2.9333, 3.8788) IS a proof of
//   beta < 2 via custody terms alone -- the one-way door.
// WITH K UNNAMED (the honest target): beta EXISTS, equals inf_n (f(n)+K)/ln n,
//   and beta < 2 <=> S(n) > K at a single integer. Existence alone makes
//   1d's question -- does G2(x#)/x^2 fall -- well-posed: under existence,
//   beta < 2 forces the ratio to 0 and beta > 2 forces it to infinity;
//   only beta = 2 leaves the sublinear part to decide.
// UNCONDITIONALLY: nothing here moves the proven 4.2665 -> 2 gap.
//
// self-test failures: 0   (all checks passed)
// total 0.1 s
// ============================================================
// READINGS
// ============================================================

// 1. THE EXACT LEMMA IS STATED AND PROVED IN THIS FILE'S HEADER (eight
//    lines): f nonnegative, nondecreasing, f(st) <= f(s)+f(t)+K on integer
//    s,t >= 2 gives lim f(n)/ln n = inf_n (f(n)+K)/ln n. It is elementary
//    Fekete adapted to the multiplicative semigroup; de Bruijn-Erdos Theorem
//    22 (the growing-defect version BGT reduce to) is NOT needed, because the
//    measured defect reads bounded (import-interp.md 5, confirmed on a second
//    instrument in attack-fekete-1d-01) and plain-Fekete shape suffices.
//    [PROVEN, the lemma; the choice of shape is MEASURED]
//
// 2. (H-mono) IS NOW A VERIFIED THEOREM, NOT AN ASSUMPTION. The subset
//    argument -- folding only deletes twin slots, deletion only merges gaps
//    -- is checked literally at all seven folds 2->3->...->19 (periods to
//    9,699,690): every slot of the folded tile is a slot of its parent, and
//    the resulting max gaps reproduce the exact ladder term by term.
//    Monotonicity holds on all 22 ladder terms. This hypothesis costs the
//    route nothing. [PROVEN one line + VERIFIED seven folds]
//
// 3. (H-sub) IS THE WHOLE PRICE. It holds at every reachable pair with
//    K = 1.0761 and is unproven beyond; and the lemma needs it on PRODUCTS
//    only, so BGT's H1 obstruction (primes do not factor) never arises --
//    monotonicity replaces the additive ground set in the between-powers
//    bridge. The route's one gap is exactly the candidate, nothing else.
//    [VERIFIED / INFERRED]
//
// 4. THE CONCLUSION FORMULA IS CALIBRATED AND IT IS SLOW. On POW (true beta
//    1.546, constant defect) the finite-range inf reads 1.5901 at n = 10^6,
//    +2.9%; on LOG (true beta 1, delta = 2) it reads 1.5335, +53%, with
//    K = 2.1034 driven by the (2,2) pair. Both approach from above, as the
//    inf-over-a-subset argument says they must. So the lemma's VALUE output
//    is unquotable at any reachable range -- what it delivers is existence,
//    and existence only. [MEASURED, known-truth controls]
//
// 5. WHAT A BOUNDED DEFECT BUYS, in one line each way. Conditional on
//    (H-sub) with SOME constant: beta = lim ln G2(x#)/ln x EXISTS (along
//    integers, hence along reals -- Ghat is a step function), which makes
//    1d's central question well-posed for the first time; beta < 2 forces
//    G2(x#)/x^2 -> 0 and beta > 2 forces it to infinity. And the equivalence
//    beta < 2 <=> S(n) > K at one integer is both faces at once: an explicit
//    K < 1.3555 is TPC-implying (the trap -- do not expect a soft proof of
//    it), an unnamed K buys existence without touching TPC (the honest
//    prize). The corpus's 1.8992 (import-interp.md 4, best integer base 16)
//    is this file's formula evaluated at the reachable K, reproduced exactly.
//    [PROVEN given (H-sub); the 1.8992 cross-check VERIFIED]
//
// 6. NOT BOUGHT: any value of beta, any movement on 4.2665 -> 2, any
//    unconditional statement. The route is now reduced to a single named
//    inequality with every auxiliary hypothesis discharged, which is a
//    sharper place than 1d stood, and it is still one unproven inequality
//    whose explicit-constant version is TPC-strength. [INFERRED]
