#!/usr/bin/env node
'use strict';
// RED TEAM — B = O((log z)^8) checked as a proof, and the polylog sufficiency threshold re-solved
/* ============================================================================
   RED TEAM / attack-AB-bounded.md section 1  —  is B = O((log z)^8) a proof,
   and does polylog really suffice for the mean-square Lemma V?
   ============================================================================
   2026-08-18/19, attack 10 of 10. Two claims under attack.

   CLAIM 1. `B(z,s) <= 9 A(z)^2 (E(z)-1) = O((log z)^8)`, unconditional, in three
   steps. The report tags the chain [INFERRED] and the steps [VERIFIED] per-e to
   z = 41. A per-e verification is a measurement; the headline calls it a
   theorem. So this file checks the ALGEBRA of each step and then varies what
   should not matter.

   CLAIM 2. That polylog "is enough", because the mean-square Lemma V asks for
   `B <= H/log^6 H`, `H = z^u` is a power and B is polylog. The report adds a
   figure: "Under Theorem 1 the threshold is H >> (log z)^14". That figure is the
   attack surface. If H is itself polylog in z then log H is of order lnln z,
   NOT of order log z, and the log^6 H factor cannot be priced as (log z)^6. The
   two halves of that sentence use two different H's.

   WHAT THIS FILE DOES NOT DO. It does not recompute B from the Rosser supports;
   it imports profile() from the target and checks the target against itself
   only where that is the point. Everything the CHAIN asserts is re-derived here
   from the definitions.
   ========================================================================= */

const path = require('path');
const { profile, provedBound } = require(path.join(__dirname, 'attack-beta2-A-B-bounded.js'));

const F = (v, d = 4) => (Number.isFinite(v) ? v.toFixed(d) : ' n/a');
const pad = (s, n) => String(s).padStart(n);
const padr = (s, n) => String(s).padEnd(n);
function sieve(n) { const s = new Uint8Array(n + 1), o = []; for (let i = 2; i <= n; i++) if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } return o; }

console.log('='.repeat(78));
console.log('RED TEAM: B polylog, as a proof and as a sufficiency claim');
console.log('='.repeat(78));

// --- 1. the local factors, re-derived from the state description ------------
console.log('\n1. THE EULER FACTORS, RE-DERIVED FROM THE STATE DESCRIPTION.');
console.log('   The report describes the local states at an odd p as (neither), (p|d1),');
console.log('   (p|d2), with (p|both) barred by gcd | 2, and weights 1, 1/p, 1/p in the');
console.log('   sum of 1/q with q = d1 d2 / gcd. At p = 2 all four states are admissible');
console.log('   and (2|both) contributes 2/(2*2) = 1/2. Building A and r from THAT rather');
console.log('   than from the target\'s formulas:');
{
  const localA = p => (p === 2 ? 1 + 1 / 2 + 1 / 2 + 1 / 2 : 1 + 1 / p + 1 / p);
  const localBarred = p => (p === 2 ? 1 / 2 + 1 / 2 + 1 / 2 : 1 / p + 1 / p);
  console.log('   p    local A factor   from (5/2),(1+2/p)   barred/full = r(p)   from report');
  for (const p of [2, 3, 5, 7, 11, 13]) {
    const a = localA(p), af = (p === 2 ? 2.5 : 1 + 2 / p);
    const r = localBarred(p) / localA(p), rf = (p === 2 ? 0.6 : 2 / (p + 2));
    console.log('  ' + pad(p, 3) + pad(F(a, 6), 17) + pad(F(af, 6), 21) + pad(F(r, 6), 21) + pad(F(rf, 6), 14));
  }
  console.log('   Both columns agree, so A(z) = (5/2) prod(1+2/p) and r(p) = 2/(p+2) are');
  console.log('   what the stated state description gives. Step 2 of the chain is an');
  console.log('   Euler-product argument that goes through: the Rosser supports are SUBSETS');
  console.log('   of the divisors of P(z) and |lambda_d| <= 1, so the truncated sum is at');
  console.log('   most the full product, three blocks give the factor 3, and imposing e|q');
  console.log('   bars the (neither) state at every p | e. This is a PROOF, not a fit.');
}

// --- 2. step 3, and the E product ------------------------------------------
console.log('\n2. STEP 3. sum_{e | P(z)} e rho(e)^2 = prod_p (1 + p r(p)^2), by multiplicativity.');
{
  const ps = sieve(60);
  for (const z of [13, 23, 43]) {
    const P = ps.filter(p => p < z);
    // brute force over all squarefree e | P(z)
    let S = 0;
    const n = P.length;
    for (let m = 0; m < (1 << n); m++) {
      let e = 1, rho = 1;
      for (let b = 0; b < n; b++) if (m & (1 << b)) { const p = P[b]; e *= p; rho *= (p === 2 ? 0.6 : 2 / (p + 2)); }
      S += e * rho * rho;
    }
    let E = 1 + 18 / 25; for (const p of P) if (p > 2) E *= (1 + 4 * p / ((p + 2) * (p + 2)));
    console.log(`   z = ${pad(z, 2)}   brute force sum = ${S.toExponential(10)}   product E(z) = ${E.toExponential(10)}   rel diff ${(Math.abs(S - E) / E).toExponential(2)}`);
  }
  console.log('   Step 3 is an identity and it holds. The chain B <= sum_e e T(e)^2 <=');
  console.log('   9 A^2 sum_{e>1} e rho(e)^2 = 9 A^2 (E-1) is therefore valid GIVEN steps 1-2.');
}

// --- 3. the growth exponents -----------------------------------------------
console.log('\n3. IS THE EXPONENT 8? Measure the Mertens growth of A and E directly.');
{
  const ps = sieve(4000000);
  console.log('   z          A(z)        d ln A / d lnln z     E(z)         d ln E / d lnln z');
  const zs = [1e2, 1e3, 1e4, 1e5, 1e6, 4e6];
  let prev = null;
  for (const z of zs) {
    let A = 2.5, E = 1 + 18 / 25;
    for (const p of ps) { if (p >= z) break; if (p > 2) { A *= (1 + 2 / p); E *= (1 + 4 * p / ((p + 2) * (p + 2))); } }
    const ll = Math.log(Math.log(z));
    let dA = NaN, dE = NaN;
    if (prev) { dA = (Math.log(A) - Math.log(prev.A)) / (ll - prev.ll); dE = (Math.log(E) - Math.log(prev.E)) / (ll - prev.ll); }
    console.log('  ' + pad(z >= 1e5 ? z.toExponential(0) : String(z), 8) + pad(F(A, 3), 12) + pad(F(dA, 4), 20) + pad(F(E, 3), 14) + pad(F(dE, 4), 20));
    prev = { A, E, ll };
  }
  console.log('   The two local slopes tend to 2 and 4, so 9 A^2 (E-1) tends to exponent');
  console.log('   2*2 + 4 = 8 in log z. THE EXPONENT 8 IS CORRECT.');
}

// --- 4. the per-e verification, at a z the report did not use --------------
console.log('\n4. VARY WHAT SHOULD NOT MATTER: run the per-e check at z the report skipped,');
console.log('   and at the s the report says is the worst corner (s = 2.0, not 3.0).');
console.log('   z    s     B          sum e T^2     9A^2(E-1)    bound/B    viol1    viol2   #e');
for (const [z, s] of [[13, 2.0], [23, 3.0], [37, 2.0], [43, 3.0], [43, 2.0]]) {
  const P = profile(z, s), pb = provedBound(P.ps);
  let v1 = 0, v2 = 0;
  for (const r of P.rec.values()) {
    if (r.va - r.T > v1) v1 = r.va - r.T;
    let rho = 1; for (const p of P.ps) if (r.e % p === 0) rho *= (p === 2 ? 0.6 : 2 / (p + 2));
    const b = 3 * pb.A * rho; if (r.T - b > v2) v2 = r.T - b;
  }
  console.log('  ' + pad(z, 3) + pad(s.toFixed(1), 6) + pad(F(P.B, 6), 11) + pad(P.BT.toExponential(3), 14)
    + pad(pb.bound.toExponential(3), 13) + pad((pb.bound / P.B).toExponential(2), 11)
    + pad(v1 <= 0 ? 'none' : v1.toExponential(1), 9) + pad(v2 <= 0 ? 'none' : v2.toExponential(1), 8) + pad(P.ne, 6));
}
console.log('   No violation appears at any new point, and the chain holds at the s = 2.0');
console.log('   corner where B is largest. The bound is unbroken and grossly lossy.');

// --- 5. THE THRESHOLD. the (log z)^14 line ---------------------------------
console.log('\n5. THE (log z)^14 THRESHOLD IS WRONG, AND IT IS WRONG IN THE SAFE DIRECTION.');
console.log('   The ask is B <= H / (ln H)^6. Solve it exactly for H_min at each z, then');
console.log('   ask which power of log z that H_min actually is.');
{
  const ps = sieve(4000000);
  const Bproved = z => { let A = 2.5, E = 1 + 18 / 25; for (const p of ps) { if (p >= z) break; if (p > 2) { A *= (1 + 2 / p); E *= (1 + 4 * p / ((p + 2) * (p + 2))); } } return 9 * A * A * (E - 1); };
  const Hmin = B => { // solve H/(ln H)^6 = B by bisection in ln H
    let lo = 1, hi = 1000;
    for (let i = 0; i < 300; i++) { const mid = (lo + hi) / 2; if (Math.exp(mid) / mid ** 6 < B) lo = mid; else hi = mid; }
    return (lo + hi) / 2;                                     // returns ln H_min
  };
  console.log('   z          B proved     ln H_min   H_min          (log z)^14      ln H_min / lnln z');
  for (const z of [13, 29, 101, 1009, 1e6, 1e12, 1e30, 1e100]) {
    const B = z <= 4e6 ? Bproved(z) : null;
    if (B === null) continue;
    const lh = Hmin(B), ll = Math.log(Math.log(z));
    const l14 = 14 * Math.log(Math.log(z));
    console.log('  ' + pad(z >= 1e5 ? z.toExponential(0) : String(z), 9) + pad(B.toExponential(3), 13) + pad(F(lh, 3), 11)
      + pad(Math.exp(lh).toExponential(3), 14) + pad(Math.exp(l14).toExponential(3), 16) + pad(F(lh / ll, 3), 18));
  }
  console.log('\n   Extending the SHAPE rather than the exact product: with B = C (log z)^8,');
  console.log('   H_min solves H/(ln H)^6 = C(log z)^8, and ln H_min = 8 lnln z + 6 ln(ln H_min)');
  console.log('   + ln C, so ln H_min / lnln z -> 8, not 14.');
  const C = 1;
  for (const lz of [10, 30, 100, 1e3, 1e5, 1e10, 1e30]) {
    const ll = Math.log(lz);                                   // lnln z
    let lh = 8 * ll + 1;
    for (let i = 0; i < 400; i++) lh = 8 * ll + 6 * Math.log(Math.max(lh, 1.0001)) + Math.log(C);
    console.log(`     log z = ${pad(lz.toExponential(0), 8)}   ln H_min = ${pad(F(lh, 3), 10)}   ln H_min / lnln z = ${F(lh / ll, 4)}`);
  }
  console.log('   The ratio falls through 14 and keeps going, to 8. So "H >> (log z)^14"');
  console.log('   is not the threshold; the threshold is (log z)^{8+o(1)}. The slip is');
  console.log('   using ln H = ln z inside the log^6 H factor while setting H polylog in z,');
  console.log('   which is the two-different-H error. It OVERSTATES the requirement, so');
  console.log('   the sufficiency conclusion is untouched and is if anything stronger.');
}

// --- 6. the sufficiency logic itself ---------------------------------------
console.log('\n6. THE SUFFICIENCY CLAIM, CHECKED AS AN IMPLICATION.');
console.log('   Ask: B <= H/(ln H)^6, with H = z^u.  Then ln H = u ln z and the ask is');
console.log('   C (log z)^8 <= z^u / (u ln z)^6, i.e. z^u >= C u^6 (ln z)^14.');
console.log('   For any FIXED u > 0 the left side is a power of z and the right a polylog,');
console.log('   so it holds for all large z. THE IMPLICATION IS VALID.');
console.log('   Two conditions on it, both real:');
console.log('     (i) u must be bounded away from 0 as z grows. If u -> 0 with z the');
console.log('         comparison is not automatic. The corpus uses u ~ beta2 = 4.26645,');
console.log('         a constant, so this is satisfied where it is used.');
console.log('    (ii) the ask itself is the MEAN-SQUARE ask. sift-limit-attack.md 7e proves');
console.log('         <R^2>_H <= B H, which controls the AVERAGE of |R| over positions and');
console.log('         not the sup. The report says so itself, in its own headline: "What');
console.log('         separates the proved mean-square lemma from Lemma V proper is the');
console.log('         position quantifier, not B."');
{
  const ps = sieve(4000000);
  const Bproved = z => { let A = 2.5, E = 1 + 18 / 25; for (const p of ps) { if (p >= z) break; if (p > 2) { A *= (1 + 2 / p); E *= (1 + 4 * p / ((p + 2) * (p + 2))); } } return 9 * A * A * (E - 1); };
  console.log('\n   At u = beta2 = 4.26645, the z from which the proved bound already suffices:');
  console.log('   z          B proved      z^u/(u ln z)^6      suffices?');
  const u = 4.26645028414864191641;
  for (const z of [13, 29, 101, 1009, 1e4, 1e5, 1e6]) {
    const B = Bproved(z), lz = Math.log(z);
    const lhs = u * lz - 6 * Math.log(u * lz);
    console.log('  ' + pad(z >= 1e5 ? z.toExponential(0) : String(z), 9) + pad(B.toExponential(3), 14) + pad(Math.exp(lhs).toExponential(3), 20)
      + pad(Math.exp(lhs) >= B ? 'YES' : 'no', 12));
  }
}
console.log('\n' + '='.repeat(78));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/redteam-B-polylog.js
//   invocation:  node research/redteam-B-polylog.js
//   code-sha256: f3c6af0c2ec413eb07ef908ad456c79f9815665787825e6ad089982ccdda8387
//   out-sha256:  f3d09eeaaea64bc9a5c6ea5a64bc4d93e0faaccae6efffc069fcd6b484100645
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     3.1 s
// ============================================================================
// ==============================================================================
// RED TEAM: B polylog, as a proof and as a sufficiency claim
// ==============================================================================
//
// 1. THE EULER FACTORS, RE-DERIVED FROM THE STATE DESCRIPTION.
//    The report describes the local states at an odd p as (neither), (p|d1),
//    (p|d2), with (p|both) barred by gcd | 2, and weights 1, 1/p, 1/p in the
//    sum of 1/q with q = d1 d2 / gcd. At p = 2 all four states are admissible
//    and (2|both) contributes 2/(2*2) = 1/2. Building A and r from THAT rather
//    than from the target's formulas:
//    p    local A factor   from (5/2),(1+2/p)   barred/full = r(p)   from report
//     2         2.500000             2.500000             0.600000      0.600000
//     3         1.666667             1.666667             0.400000      0.400000
//     5         1.400000             1.400000             0.285714      0.285714
//     7         1.285714             1.285714             0.222222      0.222222
//    11         1.181818             1.181818             0.153846      0.153846
//    13         1.153846             1.153846             0.133333      0.133333
//    Both columns agree, so A(z) = (5/2) prod(1+2/p) and r(p) = 2/(p+2) are
//    what the stated state description gives. Step 2 of the chain is an
//    Euler-product argument that goes through: the Rosser supports are SUBSETS
//    of the divisors of P(z) and |lambda_d| <= 1, so the truncated sum is at
//    most the full product, three blocks give the factor 3, and imposing e|q
//    bars the (neither) state at every p | e. This is a PROOF, not a fit.
//
// 2. STEP 3. sum_{e | P(z)} e rho(e)^2 = prod_p (1 + p r(p)^2), by multiplicativity.
//    z = 13   brute force sum = 6.0796356210e+0   product E(z) = 6.0796356210e+0   rel diff 0.00e+0
//    z = 23   brute force sum = 1.0427419500e+1   product E(z) = 1.0427419500e+1   rel diff 6.81e-16
//    z = 43   brute force sum = 1.7839193126e+1   product E(z) = 1.7839193126e+1   rel diff 3.98e-15
//    Step 3 is an identity and it holds. The chain B <= sum_e e T(e)^2 <=
//    9 A^2 sum_{e>1} e rho(e)^2 = 9 A^2 (E-1) is therefore valid GIVEN steps 1-2.
//
// 3. IS THE EXPONENT 8? Measure the Mertens growth of A and E directly.
//    z          A(z)        d ln A / d lnln z     E(z)         d ln E / d lnln z
//        100      24.895                 n/a        35.071                 n/a
//       1000      54.699              1.9414       163.877              3.8024
//      10000      96.695              1.9804       510.930              3.9527
//       1e+5     150.803              1.9916      1242.481              3.9823
//       1e+6     217.040              1.9971      2573.626              3.9941
//       4e+6     262.774              1.9997      3772.499              3.9993
//    The two local slopes tend to 2 and 4, so 9 A^2 (E-1) tends to exponent
//    2*2 + 4 = 8 in log z. THE EXPONENT 8 IS CORRECT.
//
// 4. VARY WHAT SHOULD NOT MATTER: run the per-e check at z the report skipped,
//    and at the s the report says is the worst corner (s = 2.0, not 3.0).
//    z    s     B          sum e T^2     9A^2(E-1)    bound/B    viol1    viol2   #e
//    13   2.0   1.272776      9.467e+2     3.592e+3    2.82e+3     none    none    23
//    23   3.0   1.450254      1.027e+4     1.354e+4    9.34e+3     none    none   243
//    37   2.0   1.644340      3.781e+3     3.062e+4    1.86e+4     none    none   199
//    43   3.0   1.505719      2.919e+4     4.522e+4    3.00e+4     none    none  3879
//    43   2.0   1.718147      4.288e+3     4.522e+4    2.63e+4     none    none   259
//    No violation appears at any new point, and the chain holds at the s = 2.0
//    corner where B is largest. The bound is unbroken and grossly lossy.
//
// 5. THE (log z)^14 THRESHOLD IS WRONG, AND IT IS WRONG IN THE SAFE DIRECTION.
//    The ask is B <= H / (ln H)^6. Solve it exactly for H_min at each z, then
//    ask which power of log z that H_min actually is.
//    z          B proved     ln H_min   H_min          (log z)^14      ln H_min / lnln z
//          13     3.592e+3     28.228     1.817e+12        5.335e+5            29.968
//          29     1.861e+4     30.298     1.439e+13        2.410e+7            24.955
//         101     1.900e+5     33.164     2.528e+14        1.989e+9            21.685
//        1009     4.386e+6     36.952     1.116e+16       5.736e+11            19.107
//        1e+6     1.091e+9     43.438     7.327e+18       9.229e+15            16.543
//
//    Extending the SHAPE rather than the exact product: with B = C (log z)^8,
//    H_min solves H/(ln H)^6 = C(log z)^8, and ln H_min = 8 lnln z + 6 ln(ln H_min)
//    + ln C, so ln H_min / lnln z -> 8, not 14.
//      log z =     1e+1   ln H_min =     40.651   ln H_min / lnln z = 17.6544
//      log z =     3e+1   ln H_min =     50.774   ln H_min / lnln z = 14.9282
//      log z =     1e+2   ln H_min =     61.562   ln H_min / lnln z = 13.3679
//      log z =     1e+3   ln H_min =     81.679   ln H_min / lnln z = 11.8242
//      log z =     1e+5   ln H_min =    120.872   ln H_min / lnln z = 10.4988
//      log z =    1e+10   ln H_min =    216.472   ln H_min / lnln z = 9.4012
//      log z =    1e+30   ln H_min =    590.910   ln H_min / lnln z = 8.5543
//    The ratio falls through 14 and keeps going, to 8. So "H >> (log z)^14"
//    is not the threshold; the threshold is (log z)^{8+o(1)}. The slip is
//    using ln H = ln z inside the log^6 H factor while setting H polylog in z,
//    which is the two-different-H error. It OVERSTATES the requirement, so
//    the sufficiency conclusion is untouched and is if anything stronger.
//
// 6. THE SUFFICIENCY CLAIM, CHECKED AS AN IMPLICATION.
//    Ask: B <= H/(ln H)^6, with H = z^u.  Then ln H = u ln z and the ask is
//    C (log z)^8 <= z^u / (u ln z)^6, i.e. z^u >= C u^6 (ln z)^14.
//    For any FIXED u > 0 the left side is a power of z and the right a polylog,
//    so it holds for all large z. THE IMPLICATION IS VALID.
//    Two conditions on it, both real:
//      (i) u must be bounded away from 0 as z grows. If u -> 0 with z the
//          comparison is not automatic. The corpus uses u ~ beta2 = 4.26645,
//          a constant, so this is satisfied where it is used.
//     (ii) the ask itself is the MEAN-SQUARE ask. sift-limit-attack.md 7e proves
//          <R^2>_H <= B H, which controls the AVERAGE of |R| over positions and
//          not the sup. The report says so itself, in its own headline: "What
//          separates the proved mean-square lemma from Lemma V proper is the
//          position quantifier, not B."
//
//    At u = beta2 = 4.26645, the z from which the proved bound already suffices:
//    z          B proved      z^u/(u ln z)^6      suffices?
//          13      3.592e+3            3.294e-2          no
//          29      1.861e+4            1.973e-1          no
//         101      1.900e+5            6.107e+0          no
//        1009      4.386e+6            9.912e+3          no
//       10000      4.291e+7            3.160e+7          no
//        1e+5      2.541e+8           1.530e+11         YES
//        1e+6      1.091e+9           9.465e+14         YES
//
// ==============================================================================
// ============================================================
// READINGS
// ============================================================
//
// 1. THE CHAIN IS A PROOF, NOT A FIT, AND IT HOLDS. Rebuilding the local
//    factors from the report's own state description -- (neither), (p|d1),
//    (p|d2) at odd p with (p|both) barred by gcd|2, all four states at p = 2 --
//    returns 2.500000 at p = 2 and 1+2/p at odd p, matching A(z) = (5/2)
//    prod(1+2/p), and returns r(2) = 0.600000 and r(p) = 2/(p+2). Step 2 is an
//    Euler-product argument over a SUBSET of the divisors of P(z) with
//    |lambda_d| <= 1, so the truncated sum is at most the full product; the
//    factor 3 is the three certificate blocks; imposing e|q bars the (neither)
//    state at every p|e. Step 3 is an identity, and brute force over every
//    squarefree e|P(z) matches prod_p(1 + p r(p)^2) to 3.98e-15 at z = 13, 23
//    and 43.
//
// 2. THE EXPONENT 8 IS CORRECT, MEASURED RATHER THAN ASSERTED. d ln A/d lnln z
//    runs 1.9414 -> 1.9997 and d ln E/d lnln z runs 3.8024 -> 3.9993 over
//    z = 10^3..4*10^6. So 9 A^2 (E-1) is (log z)^{4+4} = (log z)^8.
//
// 3. THE PER-e VERIFICATION HOLDS WHERE THE REPORT DID NOT LOOK. No violation
//    of step 1 or step 2 appears at z = 43, which the report's table stops
//    short of, nor at s = 2.0, which the report itself identifies as the corner
//    where B is largest. B at z = 43 and s = 2.0 is 1.718147, the largest B seen here, and
//    the bound is still 2.63e+4 times above it.
//
// 4. THE (log z)^14 THRESHOLD IS WRONG. Solving H/(ln H)^6 = 9A^2(E-1) exactly,
//    ln H_min / lnln z reads 29.968 at z = 13 and falls monotonically to 16.543
//    at z = 10^6 -- still above 14 and still falling. Continuing the SHAPE
//    B = C(log z)^8, the same ratio reads 13.3679 at log z = 100 and 8.5543 at
//    log z = 10^30. The ratio passes through 14 and tends to 8, so the true
//    polylog threshold is (log z)^{8+o(1)}. The slip is pricing the log^6 H
//    factor as (log z)^6, i.e. using ln H = ln z, while simultaneously setting
//    H polylog in z: two different H's in one sentence. It OVERSTATES the
//    requirement, so the sufficiency conclusion is untouched.
//
// 5. THE SUFFICIENCY IMPLICATION IS VALID, WITH TWO CONDITIONS. B <= H/(ln H)^6
//    with H = z^u is z^u >= C u^6 (ln z)^14, a power against a polylog, true for
//    all large z at any fixed u > 0. The conditions are that u must be bounded
//    away from 0 -- the corpus uses u ~ beta2 = 4.26645, a constant, so this
//    holds where it is used -- and that the ask is the MEAN-SQUARE ask.
//    At u = 4.26645 the proved bound first suffices between z = 10^4, where
//    4.291e+7 is still above 3.160e+7, and z = 10^5, where 2.541e+8 is below
//    1.530e+11.
//
// 6. SO HEADLINE 3 STANDS AS A PROOF AND AS A SUFFICIENCY CLAIM. What it does
//    not license is any statement that Lemma V proper is now unconditional.
//    sift-limit-attack.md section 7e proves <R^2>_H <= B H, which is an average
//    over positions, and attack-AB-bounded.md says so in its own headline:
//    what separates the mean-square lemma from Lemma V is the position
//    quantifier, not B. Every downstream use has to carry the words "mean
//    square".
