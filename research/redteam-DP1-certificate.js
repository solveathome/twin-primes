#!/usr/bin/env node
'use strict';
// RED TEAM — the degree-2 Boole-Frechet certificate re-derived on the sharp LP, exact arithmetic at x = 19
/* ============================================================================
   RED TEAM / attack-DP1-mechanism.md  —  are the six certified bounds right,
   and is the +5.20 slope what the report says it is?
   ============================================================================
   2026-08-18/19, attack 10 of 10. The headline under attack:

     "Degree 2 certifies G2(x#) <= 12, 114, 390, 2256, 18900, 117558 at
      x = 5..19 against truths 12, 30, 42, 66, 108, 150. The over-certification
      ratio runs 1.0, 3.8, 9.3, 34.2, 175.0, 783.7 with log-log slope +5.20."

   That report has already been through one correction: it retracted three of its
   predecessor's four claims. This file looks for the second.

   WHAT THE TARGET DOES, AND THE GAP IT LEAVES. research/attack-D-twopoint.js
   finds each L by a CLOSED FORM (`deg2works`: a variance inequality), not by the
   sharp LP, and re-checks against the LP only when `found <= 400`. The reported
   L are 2, 19, 65, 376, 3150, 19593, so x = 17 and x = 19 -- the two largest
   numbers in the headline, and the two the +5.20 slope leans on hardest -- were
   NEVER put on the sharp LP by their own producer.

   WHAT THIS FILE DOES, INDEPENDENTLY OF THAT SCRIPT.
     1. Rebuilds the sifted set on the 6-lattice from the definition.
     2. Confirms the units: the certificate is in SLOTS and the headline is in
        INTEGERS, and the factor is 6 (research/qc/units.js section 2 is the
        trap this is checking).
     3. Computes S_1 and S_2 by a sliding window over the whole period, so the
        two-point input is a direct count and not a convolution formula.
     4. Solves the sharp degree-2 LP V_2(L) = max{nu_0} EXACTLY, by enumerating
        every basic feasible support {0, a, b}. Three constraints, so a basic
        solution has at most three nonzero components and this enumeration is
        the exact optimum, not a heuristic.
     5. Checks V_2(L) < 1 <= V_2(L-1) at the reported L, at ALL SIX levels,
        x = 17 and x = 19 included.
     6. Recomputes the slope, over the points the target actually used and over
        the points the headline actually lists.
   ========================================================================= */

const F = (v, d = 4) => (Number.isFinite(v) ? v.toFixed(d) : ' n/a');
const pad = (s, n) => String(s).padStart(n);
const padr = (s, n) => String(s).padEnd(n);

function primesUpTo(n) { const s = new Uint8Array(n + 1), o = []; for (let i = 2; i <= n; i++) if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } return o; }

const G2TRUE = { 5: 12, 7: 30, 11: 42, 13: 66, 17: 108, 19: 150 };
const REPORTED_L = { 5: 2, 7: 19, 11: 65, 13: 376, 17: 3150, 19: 19593 };
const REPORTED_BOUND = { 5: 12, 7: 114, 11: 390, 13: 2256, 17: 18900, 19: 117558 };

// --- the sifted set on the 6-lattice, from the definition -------------------
// slot s carries n = 6s+5; the pair is (n, n+2) = (6s+5, 6s+7). Both are
// automatically coprime to 2 and 3. Survivor iff neither is divisible by any
// prime p with 5 <= p <= x.
function tile(x) {
  const ps = primesUpTo(x).filter(p => p >= 5);
  let M = 1; for (const p of ps) M *= p;                 // M = x#/6
  const A = new Uint8Array(M).fill(1);
  for (const p of ps) {
    // 6s+5 = 0 mod p  ->  s = -5 * inv6 mod p ;  6s+7 = 0 mod p -> s = -7*inv6
    let inv6 = 1; while ((6 * inv6) % p !== 1) inv6++;
    const s1 = ((-5 * inv6) % p + p) % p, s2 = ((-7 * inv6) % p + p) % p;
    for (let s = s1; s < M; s += p) A[s] = 0;
    for (let s = s2; s < M; s += p) A[s] = 0;
  }
  let n = 0; for (let i = 0; i < M; i++) n += A[i];
  return { x, M, A, surv: n, ps };
}

// true maximal slot gap, cyclic
function trueGapSlots(T) {
  const idx = []; for (let i = 0; i < T.M; i++) if (T.A[i]) idx.push(i);
  let g = 0;
  for (let i = 0; i < idx.length; i++) {
    const d = (i + 1 < idx.length) ? idx[i + 1] - idx[i] : idx[0] + T.M - idx[i];
    if (d > g) g = d;
  }
  return g;
}

// S_1, S_2 and the window histogram, by a cyclic sliding window
function moments(T, L) {
  const { M, A } = T;
  let X = 0; for (let i = 0; i < L; i++) X += A[i % M];
  let S1 = 0, S2 = 0, maxX = 0, nEmpty = 0;
  const hist = new Map();
  for (let a = 0; a < M; a++) {
    S1 += X; S2 += X * (X - 1) / 2;
    if (X > maxX) maxX = X;
    if (X === 0) nEmpty++;
    hist.set(X, (hist.get(X) || 0) + 1);
    X -= A[a]; X += A[(a + L) % M];
  }
  return { S1, S2, maxX, nEmpty, hist };
}

// sharp degree-2 LP: max nu_0 over nu >= 0 on {0..L} with the three moment
// constraints. Basic solutions have <= 3 nonzeros, so enumerate supports
// {0, a, b} with 1 <= a < b <= L. Exact, not heuristic.
function V2(M, S1, S2, L) {
  let best = 0, arg = null;
  // supports of size 2, {0, a}: feasible only when C(a,2)*(S1/a) === S2 exactly.
  // Omitting these is a real bug at tiny L, where no pair {a,b} exists at all.
  for (let a = 1; a <= L; a++) {
    const na = S1 / a;
    if (Math.abs(a * (a - 1) / 2 * na - S2) <= 1e-9 * Math.max(1, Math.abs(S2))) {
      const n0 = M - na;
      if (na >= 0 && n0 > best) { best = n0; arg = [a]; }
    }
  }
  for (let a = 1; a <= L; a++) {
    const Ca = a * (a - 1) / 2;
    for (let b = a + 1; b <= L; b++) {
      const Cb = b * (b - 1) / 2;
      const det = a * Cb - b * Ca;                       // = a*b*(b-a)/2 > 0
      const na = (S1 * Cb - S2 * b) / det;
      const nb = (a * S2 - Ca * S1) / det;
      if (na < 0 || nb < 0) continue;
      const n0 = M - na - nb;
      if (n0 > best) { best = n0; arg = [a, b]; }
    }
  }
  return { v: best, arg };
}

console.log('='.repeat(78));
console.log('RED TEAM: the degree-2 Boole-Frechet certificate, re-derived');
console.log('='.repeat(78));

console.log('\n1. THE OBJECT AND THE UNITS.');
console.log('   x   M = x#/6   survivors   density   true gap (slots)   6*gap   G2 truth');
const TILES = {};
for (const x of [5, 7, 11, 13, 17, 19]) {
  const T = tile(x); TILES[x] = T;
  const g = trueGapSlots(T);
  T.gap = g;
  console.log('  ' + pad(x, 3) + pad(T.M, 11) + pad(T.surv, 12) + pad(F(T.surv / T.M, 5), 10)
    + pad(g, 19) + pad(6 * g, 8) + pad(G2TRUE[x], 10) + (6 * g === G2TRUE[x] ? '   ok' : '   MISMATCH'));
}
console.log('   The slot->integer factor is 6 and it is applied correctly: the true');
console.log('   maximal SLOT gap times 6 is the published G2 at all six levels. The');
console.log('   units trap of research/qc/units.js section 2 is NOT what went wrong here.');

console.log('\n2. THE SHARP LP AT THE REPORTED L, ALL SIX LEVELS.');
console.log('   The certificate proves G2 <= 6L iff V_2(L) < 1. For the reported L to be');
console.log('   the FIRST that works, we also need V_2(L-1) >= 1.');
console.log('   x    L reported   6L      V_2(L)        V_2(L-1)      verdict');
const rows = [];
for (const x of [5, 7, 11, 13, 17, 19]) {
  const T = TILES[x], L = REPORTED_L[x];
  const m = moments(T, L), mm = moments(T, L - 1);
  const v = V2(T.M, m.S1, m.S2, L), vm = V2(T.M, mm.S1, mm.S2, L - 1);
  const ok = v.v < 1, tight = vm.v >= 1;
  rows.push({ x, L, v: v.v, vm: vm.v, ok, tight, maxX: m.maxX });
  console.log('  ' + pad(x, 3) + pad(L, 12) + pad(6 * L, 8) + pad(v.v.toExponential(4), 14)
    + pad(vm.v.toExponential(4), 14) + '   ' + (ok ? (tight ? 'CERTIFIES, and is the first L' : 'certifies, but L-1 ALSO works') : 'DOES NOT CERTIFY'));
}
console.log('\n   6L against the headline numbers:');
for (const x of [5, 7, 11, 13, 17, 19]) {
  console.log(`     x = ${pad(x, 2)}   6L = ${pad(6 * REPORTED_L[x], 7)}   headline = ${pad(REPORTED_BOUND[x], 7)}   ${6 * REPORTED_L[x] === REPORTED_BOUND[x] ? 'match' : 'MISMATCH'}`);
}

console.log('\n3. THE RATIO AND THE SLOPE.');
console.log('   x     6L        G2 truth   ratio');
const R = [];
for (const x of [5, 7, 11, 13, 17, 19]) {
  const r = 6 * REPORTED_L[x] / G2TRUE[x];
  R.push({ x, r });
  console.log('  ' + pad(x, 3) + pad(6 * REPORTED_L[x], 10) + pad(G2TRUE[x], 11) + pad(F(r, 1), 9));
}
function slope(pts) {
  const xs = pts.map(p => Math.log(p.x)), ys = pts.map(p => Math.log(p.r)), n = xs.length;
  const mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n;
  let sxy = 0, sxx = 0; for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; }
  return sxy / sxx;
}
console.log(`   d log(ratio)/d log x over x = 7..19  (5 points, what the script fits): ${F(slope(R.filter(p => p.x >= 7)), 2)}`);
console.log(`   d log(ratio)/d log x over x = 5..19  (6 points, what the headline lists): ${F(slope(R), 2)}`);
console.log('   The headline prints six ratios and then one slope. The slope is fitted on');
console.log('   FIVE of them; x = 5 is dropped, correctly, because its ratio is exactly 1');
console.log('   and it is the one level the certificate is sharp at. The two numbers');
console.log('   differ, so the sentence should say which five.');
console.log('   Five points over a range of x = 7 to 19 is under half a decade, and a');
console.log('   power law fitted on it prices nothing beyond the range.');

console.log('\n4. WHAT THE PRODUCER NEVER CHECKED.');
console.log('   attack-D-twopoint.js finds L by the closed form `deg2works` and re-checks');
console.log('   against the sharp LP only when found <= 400. Reported L are:');
for (const x of [5, 7, 11, 13, 17, 19]) console.log(`     x = ${pad(x, 2)}   L = ${pad(REPORTED_L[x], 6)}   LP re-checked by producer: ${REPORTED_L[x] <= 400 ? 'yes' : 'NO'}`);
console.log('   So x = 17 and x = 19 rested on the closed form alone. Section 2 above puts');
console.log('   them on the sharp LP for the first time.');

console.log('\n4b. THE MARGIN IS COLLAPSING, AND THE TIGHTEST ROW IN EXACT ARITHMETIC.');
console.log('   V_2(L) must be < 1 out of M. The margins 1 - V_2(L):');
for (const r of rows) console.log(`     x = ${pad(r.x, 2)}   V_2(L) = ${F(r.v, 8)}   margin = ${(1 - r.v).toExponential(3)}`);
console.log('   At x = 19 the certificate clears by 1.4e-4 out of a period of 1,616,615.');
console.log('   Double precision is not obviously safe there: S1*C(b,2) reaches 1.4e18,');
console.log('   past 2^53. So the x = 19 row is redone in exact BigInt rationals.');
{
  const T = TILES[19], L = REPORTED_L[19];
  const m = moments(T, L);
  const M = BigInt(T.M), S1 = BigInt(Math.round(m.S1)), S2 = BigInt(Math.round(m.S2));
  console.log(`     exact inputs: M = ${M}, S1 = ${S1}, S2 = ${S2}`);
  console.log(`     S1 = L * survivors ? ${BigInt(L) * BigInt(T.surv) === S1 ? 'yes' : 'NO'}`);
  // best over pairs, comparing nu_0 = M - na - nb as exact rationals
  let bn = -1n, bd = 1n, barg = null;
  for (let a = 1; a <= L; a++) {
    const A = BigInt(a), Ca = A * (A - 1n) / 2n;
    for (let b = a + 1; b <= L; b++) {
      const B = BigInt(b), Cb = B * (B - 1n) / 2n;
      const det = A * Cb - B * Ca;
      const naN = S1 * Cb - S2 * B, nbN = A * S2 - Ca * S1;
      if (naN < 0n || nbN < 0n) continue;
      const n0N = M * det - naN - nbN;                 // numerator over det
      if (n0N * bd > bn * det) { bn = n0N; bd = det; barg = [a, b]; }
    }
  }
  console.log(`     exact V_2(${L}) = ${bn}/${bd} = ${(Number(bn) / Number(bd)).toFixed(10)}  at (a,b) = (${barg})`);
  console.log(`     is it < 1 ?  ${bn < bd ? 'YES, the certificate holds' : 'NO, THE CERTIFICATE FAILS'}`);
  console.log(`     double-precision value was ${rows.find(r => r.x === 19).v.toFixed(10)}`);
}

console.log('\n5. MAX X IN A WINDOW, the quantity claim (i) and (iv) are about.');
console.log('   x    L      max_a X_a   (a degree-k certificate needs k >= max X at L = gap)');
for (const r of rows) console.log('  ' + pad(r.x, 3) + pad(r.L, 8) + pad(r.maxX, 11));

console.log('\n' + '='.repeat(78));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/redteam-DP1-certificate.js
//   invocation:  node research/redteam-DP1-certificate.js
//   code-sha256: c5953acd211343b2cfee2a0c39ae4c025089607fc760a13487b873365ff14bcd
//   out-sha256:  b9c4717ae1ea49c6f418970816b247fca3e32679cc03646cc83fd60645029153
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     7.4 s
// ============================================================================
// ==============================================================================
// RED TEAM: the degree-2 Boole-Frechet certificate, re-derived
// ==============================================================================
//
// 1. THE OBJECT AND THE UNITS.
//    x   M = x#/6   survivors   density   true gap (slots)   6*gap   G2 truth
//     5          5           3   0.60000                  2      12        12   ok
//     7         35          15   0.42857                  5      30        30   ok
//    11        385         135   0.35065                  7      42        42   ok
//    13       5005        1485   0.29670                 11      66        66   ok
//    17      85085       22275   0.26180                 18     108       108   ok
//    19    1616615      378675   0.23424                 25     150       150   ok
//    The slot->integer factor is 6 and it is applied correctly: the true
//    maximal SLOT gap times 6 is the published G2 at all six levels. The
//    units trap of research/qc/units.js section 2 is NOT what went wrong here.
//
// 2. THE SHARP LP AT THE REPORTED L, ALL SIX LEVELS.
//    The certificate proves G2 <= 6L iff V_2(L) < 1. For the reported L to be
//    the FIRST that works, we also need V_2(L-1) >= 1.
//    x    L reported   6L      V_2(L)        V_2(L-1)      verdict
//     5           2      12     0.0000e+0     2.0000e+0   CERTIFIES, and is the first L
//     7          19     114     8.8889e-1     1.1071e+0   CERTIFIES, and is the first L
//    11          65     390     9.4466e-1     1.0040e+0   CERTIFIES, and is the first L
//    13         376    2256     9.6589e-1     1.0171e+0   CERTIFIES, and is the first L
//    17        3150   18900     9.8748e-1     1.0008e+0   CERTIFIES, and is the first L
//    19       19593  117558     9.9986e-1     1.0129e+0   CERTIFIES, and is the first L
//
//    6L against the headline numbers:
//      x =  5   6L =      12   headline =      12   match
//      x =  7   6L =     114   headline =     114   match
//      x = 11   6L =     390   headline =     390   match
//      x = 13   6L =    2256   headline =    2256   match
//      x = 17   6L =   18900   headline =   18900   match
//      x = 19   6L =  117558   headline =  117558   match
//
// 3. THE RATIO AND THE SLOPE.
//    x     6L        G2 truth   ratio
//     5        12         12      1.0
//     7       114         30      3.8
//    11       390         42      9.3
//    13      2256         66     34.2
//    17     18900        108    175.0
//    19    117558        150    783.7
//    d log(ratio)/d log x over x = 7..19  (5 points, what the script fits): 5.20
//    d log(ratio)/d log x over x = 5..19  (6 points, what the headline lists): 4.60
//    The headline prints six ratios and then one slope. The slope is fitted on
//    FIVE of them; x = 5 is dropped, correctly, because its ratio is exactly 1
//    and it is the one level the certificate is sharp at. The two numbers
//    differ, so the sentence should say which five.
//    Five points over a range of x = 7 to 19 is under half a decade, and a
//    power law fitted on it prices nothing beyond the range.
//
// 4. WHAT THE PRODUCER NEVER CHECKED.
//    attack-D-twopoint.js finds L by the closed form `deg2works` and re-checks
//    against the sharp LP only when found <= 400. Reported L are:
//      x =  5   L =      2   LP re-checked by producer: yes
//      x =  7   L =     19   LP re-checked by producer: yes
//      x = 11   L =     65   LP re-checked by producer: yes
//      x = 13   L =    376   LP re-checked by producer: yes
//      x = 17   L =   3150   LP re-checked by producer: NO
//      x = 19   L =  19593   LP re-checked by producer: NO
//    So x = 17 and x = 19 rested on the closed form alone. Section 2 above puts
//    them on the sharp LP for the first time.
//
// 4b. THE MARGIN IS COLLAPSING, AND THE TIGHTEST ROW IN EXACT ARITHMETIC.
//    V_2(L) must be < 1 out of M. The margins 1 - V_2(L):
//      x =  5   V_2(L) = 0.00000000   margin = 1.000e+0
//      x =  7   V_2(L) = 0.88888889   margin = 1.111e-1
//      x = 11   V_2(L) = 0.94466403   margin = 5.534e-2
//      x = 13   V_2(L) = 0.96589447   margin = 3.411e-2
//      x = 17   V_2(L) = 0.98747867   margin = 1.252e-2
//      x = 19   V_2(L) = 0.99985586   margin = 1.441e-4
//    At x = 19 the certificate clears by 1.4e-4 out of a period of 1,616,615.
//    Double precision is not obviously safe there: S1*C(b,2) reaches 1.4e18,
//    past 2^53. So the x = 19 row is redone in exact BigInt rationals.
//      exact inputs: M = 1616615, S1 = 7419379275, S2 = 17021748913882
//      S1 = L * survivors ? yes
//      exact V_2(19593) = 10530232/10531755 = 0.9998553897  at (a,b) = (4589,4590)
//      is it < 1 ?  YES, the certificate holds
//      double-precision value was 0.9998558644
//
// 5. MAX X IN A WINDOW, the quantity claim (i) and (iv) are about.
//    x    L      max_a X_a   (a degree-k certificate needs k >= max X at L = gap)
//     5       2          2
//     7      19         10
//    11      65         25
//    13     376        116
//    17    3150        834
//    19   19593       4605
//
// ==============================================================================
// ============================================================
// READINGS
// ============================================================
//
// 1. ALL SIX CERTIFIED BOUNDS ARE CORRECT, ON THE SHARP LP, FROM AN INDEPENDENT
//    IMPLEMENTATION. 6L reads 12, 114, 390, 2256, 18900, 117558 at x = 5..19,
//    matching the headline at every level, with V_2(L) < 1 and V_2(L-1) >= 1 at
//    all six, so each reported L is genuinely the first that certifies.
//
// 2. THE UNITS ARE RIGHT, WHICH WAS THE FIRST THING TO DOUBT. The certificate
//    is in SLOTS and the headline is in INTEGERS. Computing the true maximal
//    slot gap directly gives 2, 5, 7, 11, 18, 25, and six times those is
//    12, 30, 42, 66, 108, 150 -- the published G2 at all six levels. The
//    slots-versus-integers trap of research/qc/units.js section 2 is not what
//    went wrong here.
//
// 3. AND THE PRODUCER NEVER PUT THE TWO LARGEST ON THE LP. attack-D-twopoint.js
//    finds each L by a closed-form variance inequality and re-checks against the
//    sharp LP only when found <= 400. The reported L are 2, 19, 65, 376, 3150,
//    19593, so x = 17 and x = 19 -- the two numbers the +5.20 slope leans on
//    hardest -- rested on the closed form alone. Section 2 above is the first
//    time they have been on the sharp LP, and they pass.
//
// 4. THE MARGIN IS COLLAPSING AND THE LAST ROW IS DELICATE. 1 - V_2(L) reads
//    1.111e-1, 5.534e-2, 3.411e-2, 1.252e-2, 1.441e-4 at x = 7..19. At x = 19
//    the certificate clears by 1.4e-4 out of a period of 1,616,615, and the
//    double-precision LP touches products of order 1.4e18, past 2^53. Redone in
//    exact BigInt rationals the answer is 10530232/10531755 = 0.9998553897 at
//    (a,b) = (4589,4590), still below 1, against the double's 0.9998558644.
//    The verdict is unchanged and the margin is now certified rather than
//    assumed. Any extension of this table to x = 23 must be done in exact
//    arithmetic.
//
// 5. THE +5.20 SLOPE IS A FIVE-POINT FIT PRESENTED BESIDE SIX RATIOS. The
//    headline lists 1.0, 3.8, 9.3, 34.2, 175.0, 783.7 and then one slope. Fitted
//    on x = 7..19 it is 5.20, which is what the script computes; fitted on all
//    six listed ratios it is 4.60. Dropping x = 5 is the right choice -- it is
//    the one level where the certificate is exact and the ratio is 1 by
//    construction -- but the sentence has to say so, because a reader given six
//    numbers and one slope will assume the slope is over the six.
//
// 6. WHAT THE SLOPE CAN AND CANNOT CARRY. Five points from x = 7 to x = 19 is
//    under half a decade. The qualitative claim -- that the price of stopping at
//    two-point data grows rather than staying a constant factor -- is carried by
//    the ratios themselves, which rise 3.8 -> 783.7 monotonically, and needs no
//    fitted exponent. The exponent itself should not be extrapolated, and the
//    report is right that this is the mechanism's cost and wrong to give the
//    figure to three significant digits.
//
// 7. max_a X_a AT THE CERTIFYING L runs 2, 10, 25, 116, 834, 4605. This is the
//    quantity a degree-k certificate needs k to reach, and it is rising fast
//    enough that no fixed degree survives; that half of the inherited picture
//    is consistent with what is measured here.
//
// CORRECTION 2026-08-19 (monotonicity sweep): READINGS 1's inference "V_2(L) < 1
// and V_2(L-1) >= 1 at all six, so each reported L is genuinely the first that
// certifies" is INVALID as stated: validity is not upward-closed in L (this
// script's own V_2(3149..3151) = 1.0008, 0.98748, 1.020 is the counterexample
// shape), so a two-point local check cannot establish a global first. The
// "first L" claims remain TRUE because both producers scan consecutively from
// L = 1 (attack-D-twopoint.js, attack-bonferroni-degree.js); what this red team
// independently establishes is the BOUND (V_2(L) < 1 => G2 <= 6L), not the
// minimality. Record: history/staging/monotonicity-sweep.md.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the 2026-08-19 correction above that the embedded run of this file
// does not contain verbatim actually is. No number above was changed.
//
// SAME VALUE, DIFFERENT NOTATION:
//   0.98748 is the printed 9.8748e-1, and 1.0008 is the printed 1.0008e+0, both
//   from the row "17  3150  18900  9.8748e-1  1.0008e+0". The columns are
//   V_2(L) and V_2(L-1).
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   3149 and 3151 are L-1 and L+1 at the printed L = 3150. The run computes
//   V_2 only at L and L-1, so 3149 names the second printed column and 3151
//   names a point outside this script's grid.
//
// BORROWED, verified present in the record the correction names:
//   1.020, the value of V_2 at 3151, comes from the consecutive scan recorded
//   in research/history/staging/monotonicity-sweep.md, which reads "at x = 17
//   it reads 1.000818, 0.987479, 1.020035 at L = 3149, 3150, 3151". The first
//   two of those agree with this file's own two printed columns, which is the
//   cross-check that makes the third usable. Its producer was a session
//   scratchpad re-implementation, not an embedded artifact, so 1.020035 has no
//   run of its own in the corpus; the sweep note is its custody.
// ---------------------------------------------------------------------------
