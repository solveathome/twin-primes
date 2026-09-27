// ============================================================================
// row11-closure-01-coverage.js  —  IMPORT-MAP ROW 11, CLOSED ON ARITHMETIC
// ============================================================================
// WHAT THIS IS. research/IMPORT-MAP.md row 11 (combinatorial optimization) is
// carried as "UNTRIED, pre-priced dead". The arithmetic that kills it exists
// only as prose, in the map's §11 paragraph and in
// research/history/staging/import-map-construction.md §4(b): the achievable
// coverage of a long interval is 1 - prod_{3<=p<=x}(1-2/p), "0.800 at x = 5
// rising to 0.959 at x = 79", never below 0.632, so a (1-1/e) certificate can
// never fire. This script reproduces that computation over the full ladder and
// tests the three things the prose leaves implicit. Pre-registered in
// research/history/staging/row11-closure-prereg.md, committed alone.
//
// THE OBJECT, and where it comes from. research/greedy-oracle-validation.js's
// header states the identity this corpus proves elsewhere:
//
//   G2(x#) - 1 = the largest m for which [1, m] can be covered by choosing,
//                for each prime p <= x, one residue pair {a_p, a_p - 2} mod p,
//                with a_p free.
//
// Coverage of a fixed [1, L] is a monotone submodular function with f(empty)=0
// and "one pair per prime" is a partition matroid, which is row 11's exact
// identification. The optima themselves are OEIS A144311, 22 terms to x = 79,
// QUOTED here from research/covering-dive.md and never recomputed: recomputing
// an exact covering optimum is a multi-hour job and the standing compute rule
// forbids it when a custody-bound value exists.
//
// WHAT THE PROSE LEAVES IMPLICIT, and what is added here.
//   (i)  1 - prod(1-2/p) is the DENSITY of a covered set, and the certificate
//        condition is about an ALGORITHM's value. The step that connects them:
//        for odd p, every n in [1,L] lies in exactly 2 of the p candidate pairs
//        for that prime, so the offsets' gains sum to exactly 2x the uncovered
//        count and the best offset gains at least (2/p) of it; for p = 2 the
//        pair {a, a-2} collapses to one class and the factor is 1/2. So the
//        uncovered count falls by a factor of at least (1-2/p) at the round
//        where prime p is chosen, whatever order the greedy chooses in, and
//        greedy's coverage is at least L(1 - prod(1-2/p)) for EVERY L, not only
//        for a long interval. That is exact, with no error term, and it is what
//        makes the record's comparison legitimate.
//   (ii) The threshold is not one number. 1 - (1-1/k)^k is the finite-k form,
//        1 - 1/e its limit, and 1/2 is what the greedy is actually proven to
//        give on a matroid. All three are computed and none of them fires.
//  (iii) The record's product omits p = 2 while A144311's object includes it.
//        Including it can only raise the coverage, so the record's figure is
//        the conservative one. Both columns are printed.
//
//   node research/row11-closure-01-coverage.js
// ============================================================================
'use strict';

// OEIS A144311, quoted from research/covering-dive.md; term n is the covering
// optimum over the first n primes, so G2 = term + 1 is the first uncoverable
// length at that level.
const A144311 = [1, 5, 11, 29, 41, 65, 107, 149, 203, 257, 347, 527, 545, 617,
                 707, 869, 965, 1079, 1283, 1397, 1529, 1709];
const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59,
                61, 67, 71, 73, 79];
// The six figures the map and the construction record state.
const QUOTED = { 3: 0.666667, 5: 0.800000, 7: 0.857143, 11: 0.883117,
                 13: 0.901099, 79: 0.959010 };

const f = (x, d) => x.toFixed(d);
const pad = (s, w) => String(s).padStart(w);

// density of the covered set: 1 - prod (1 - 2/p), p over the chosen ladder
function coverDensity(x, fromTwo) {
  let prod = 1;
  for (const p of PRIMES) {
    if (p > x) break;
    if (p === 2) { if (fromTwo) prod *= 0.5; continue; }
    prod *= (1 - 2 / p);
  }
  return 1 - prod;
}

// The plain greedy on the partition matroid: at every round, over every prime
// not yet used and every offset for it, take the pair with the largest marginal
// coverage of [1, L]. This is the algorithm the guarantees attach to. It is NOT
// the corpus's tuned oracle of two-class-lower-bounds.js, which has restarts and
// carries no approximation guarantee.
function greedyCover(x, L, fromTwo) {
  const ps = PRIMES.filter(p => p <= x && (fromTwo || p !== 2));
  const covered = new Uint8Array(L + 1);
  const used = new Set();
  let total = 0;
  for (let round = 0; round < ps.length; round++) {
    let bestGain = -1, bestP = 0, bestA = 0;
    for (const p of ps) {
      if (used.has(p)) continue;
      for (let a = 0; a < p; a++) {
        const r1 = a % p, r2 = ((a - 2) % p + p) % p;
        let g = 0;
        for (let n = (r1 === 0 ? p : r1); n <= L; n += p) if (!covered[n]) g++;
        if (r2 !== r1) for (let n = (r2 === 0 ? p : r2); n <= L; n += p) if (!covered[n]) g++;
        if (g > bestGain) { bestGain = g; bestP = p; bestA = a; }
      }
    }
    used.add(bestP);
    const r1 = bestA % bestP, r2 = ((bestA - 2) % bestP + bestP) % bestP;
    for (let n = (r1 === 0 ? bestP : r1); n <= L; n += bestP) covered[n] = 1;
    if (r2 !== r1) for (let n = (r2 === 0 ? bestP : r2); n <= L; n += bestP) covered[n] = 1;
    total += bestGain;
  }
  return total;
}

// ============================================== 1. THE COVERAGE LADDER =====
console.log('=== 1. THE COVERAGE LADDER, REPRODUCED  (R1, R2) ===');
console.log('achievable coverage of a long interval = 1 - prod (1 - 2/p)\n');
console.log('   x    pi(x)   from p=3 (the record\'s)   from p=2 (A144311\'s)   G2(x#)   step up');
let prevD = -1, monotone = true;
const dens = {};
for (let i = 0; i < PRIMES.length; i++) {
  const x = PRIMES[i], d3 = coverDensity(x, false), d2 = coverDensity(x, true);
  dens[x] = { d3, d2, g2: A144311[i] + 1, k: i + 1 };
  if (x >= 5 && d3 <= prevD) monotone = false;
  const step = prevD < 0 ? '' : f(d3 - prevD, 6);
  prevD = d3;
  console.log(pad(x, 5) + pad(i + 1, 7) + pad(f(d3, 6), 21) + pad(f(d2, 6), 22) +
              pad(A144311[i] + 1, 11) + pad(step, 11));
}
console.log('\nagainst the six figures the map and the construction record state:\n');
console.log('   x     stated      recomputed      |diff|');
let r1ok = true;
for (const x of Object.keys(QUOTED).map(Number)) {
  const d = coverDensity(x, false), diff = Math.abs(d - QUOTED[x]);
  if (diff > 1e-6) r1ok = false;
  console.log(pad(x, 5) + pad(f(QUOTED[x], 6), 12) + pad(f(d, 6), 15) + pad(diff.toExponential(1), 12));
}
console.log('\nR1 (all six within 1e-6): ' + (r1ok ? 'PASS' : 'FAIL'));
console.log('R2 (strictly increasing from x = 5 to x = 79): ' + (monotone ? 'PASS' : 'FAIL'));
console.log('minimum over the ladder x = 5..79 is ' + f(dens[5].d3, 6) + ' at x = 5;');
console.log('the record\'s ladder reaches down to x = 3, where it is ' + f(dens[3].d3, 6) + ',');
console.log('a margin of only ' + f(dens[3].d3 - (1 - 1 / Math.E), 6) + ' over 1 - 1/e. From x = 5 the margin is ' +
            f(dens[5].d3 - (1 - 1 / Math.E), 6) + '.');

// ================================================== 2. THE THRESHOLDS =====
console.log('\n\n=== 2. THE THRESHOLDS A CERTIFICATE COULD USE  (R3) ===');
console.log('the certificate fires only if an algorithm with proven ratio alpha');
console.log('returns coverage below alpha * L, since OPT <= ALG/alpha < L\n');
console.log('the finite-k column is a RIDER: 1-(1-1/k)^k is the cardinality-constraint');
console.log('form, and row 11\'s constraint is a partition matroid, so it does not apply\n');
console.log('   x     k    1-(1-1/k)^k    1-1/e      1/2      coverage    fires at any alpha?');
let anyFire = false;
for (const x of PRIMES) {
  const k = dens[x].k, aK = 1 - Math.pow(1 - 1 / k, k), aE = 1 - 1 / Math.E, cov = dens[x].d3;
  const fire = (cov < aK) || (cov < aE) || (cov < 0.5);
  if (fire && x >= 5) anyFire = true;
  console.log(pad(x, 5) + pad(k, 6) + pad(f(aK, 6), 14) + pad(f(aE, 6), 10) + pad('0.500000', 10) +
              pad(f(cov, 6), 12) + pad(fire ? (x < 5 ? 'yes, below ladder' : 'YES') : 'no', 20));
}
console.log('\nThe two rows below the pre-registered ladder are reported and not scored,');
console.log('and they are worth one sentence each. At x = 2 there is one prime and the pair');
console.log('collapses to one class, so long-interval coverage is 0.500000 and a 1/2-');
console.log('certificate fires. At x = 3 only the inapplicable finite-k rider fires, at');
console.log('k = 2 where its threshold is 0.750000 against coverage 0.666667. Both fire');
console.log('CORRECTLY and uselessly: a long interval really is uncoverable by two or three');
console.log('primes, and the certificate is being asked a question whose answer is already');
console.log('known. Neither is a level at which G2 is in doubt.');
console.log('\nthe finite-k form is the LARGER threshold and it still never fires;');
console.log('1 - (1-1/k)^k falls to ' + f(1 - Math.pow(1 - 1 / 22, 22), 6) + ' at k = 22 and to 1 - 1/e = ' +
            f(1 - 1 / Math.E, 6) + ' in the limit.');

// ============================== 3. THE INDUCTION, AND THE DECISIVE L ======
console.log('\n\n=== 3. THE PLAIN GREEDY ON REAL INTERVALS  (R4, R5) ===');
console.log('L = G2(x#), the FIRST UNCOVERABLE length, which is the only length at which');
console.log('a certificate would ever be run; ladder from p = 2, matching A144311\n');
console.log('   x      L      greedy covered   fraction   density bound   above bound?   above 1-1/e?');
let r4ok = true, r5ok = true, minFrac = 1;
for (let i = 0; i < PRIMES.length; i++) {
  const x = PRIMES[i], L = dens[x].g2;
  const got = greedyCover(x, L, true), frac = got / L, bound = coverDensity(x, true);
  const ok1 = frac >= bound - 1e-12, ok2 = frac >= 1 - 1 / Math.E;
  if (x >= 5) {
    if (!ok1) r4ok = false;
    if (!ok2) r5ok = false;
    if (frac < minFrac) minFrac = frac;
  }
  console.log(pad(x, 5) + pad(L, 8) + pad(got, 16) + pad(f(frac, 6), 12) + pad(f(bound, 6), 15) +
              pad(ok1 ? 'yes' : 'NO', 15) + pad(ok2 ? 'yes' : 'NO', 15));
}
console.log('\nR4 (greedy at or above the density bound, x = 5..79): ' + (r4ok ? 'PASS' : 'FAIL'));
console.log('R5 (greedy above 1 - 1/e at the decisive length, x = 5..79): ' + (r5ok ? 'PASS' : 'FAIL'));
console.log('lowest greedy fraction on the ladder x = 5..79: ' + f(minFrac, 6));
console.log('The x = 2 row is below the ladder and is printed for completeness: one prime,');
console.log('one class, fraction 0.500000, which is the degenerate case the thresholds table');
console.log('already flagged. Every scored level covers all but a handful of the interval:');
console.log('greedy reaches 1704 of 1710 at x = 79, and the optimum there is exactly 1709.');

console.log('\nthe same at three lengths, to show the certificate has no length to fire at:\n');
console.log('   x      L = G2    frac      L = 4*G2   frac      L = 16*G2   frac');
for (let i = 2; i < PRIMES.length; i += 4) {
  const x = PRIMES[i], g2 = dens[x].g2;
  const out = [];
  for (const mult of [1, 4, 16]) {
    const L = g2 * mult;
    out.push([L, greedyCover(x, L, true) / L]);
  }
  console.log(pad(x, 5) + pad(out[0][0], 9) + pad(f(out[0][1], 6), 10) +
              pad(out[1][0], 11) + pad(f(out[1][1], 6), 10) +
              pad(out[2][0], 12) + pad(f(out[2][1], 6), 10));
}

// ====================================================== 4. VERDICT ========
console.log('\n\n=== 4. THE CERTIFICATE, SCORED ===\n');
console.log('C1  the six quoted figures reproduce                    ' + (r1ok ? 'PASS' : 'FAIL'));
console.log('C2  the ladder is increasing over x = 5..79             ' + (monotone ? 'PASS' : 'FAIL'));
console.log('C3  greedy is above every threshold at the decisive L   ' + ((r4ok && r5ok) ? 'PASS' : 'FAIL'));
console.log('C4  the firing condition holds nowhere                  ' + (!anyFire ? 'PASS' : 'FAIL'));
const dead = r1ok && monotone && r4ok && r5ok && !anyFire;
console.log('\nROW 11 IS ' + (dead ? 'DEAD, FORMALLY.' : 'NOT CLOSED: the map\'s pre-pricing is wrong.'));
console.log('The gap between what the certificate can see and what the question asks is');
console.log('structural, not a matter of margin: coverage runs from ' + f(dens[5].d3, 3) + ' to ' +
            f(dens[79].d3, 3) + ' along the');
console.log('ladder while the question is whether it reaches exactly 1, and no');
console.log('constant-factor approximation guarantee can distinguish 1 from ' + f(dens[79].d3, 3) + '.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/row11-closure-01-coverage.js
//   invocation:  node research/row11-closure-01-coverage.js
//   code-sha256: d12bedd7115ce56d67526a0abb91a2fa1ea620b9a3f81a0db062671ad3d9c338
//   out-sha256:  84109ad91cd5112adf07ae4a3870c2e67dc436694d0dc089ef5ba4eaa4bf65b0
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     0.1 s
// ============================================================================
// === 1. THE COVERAGE LADDER, REPRODUCED  (R1, R2) ===
// achievable coverage of a long interval = 1 - prod (1 - 2/p)
//
//    x    pi(x)   from p=3 (the record's)   from p=2 (A144311's)   G2(x#)   step up
//     2      1             0.000000              0.500000          2
//     3      2             0.666667              0.833333          6   0.666667
//     5      3             0.800000              0.900000         12   0.133333
//     7      4             0.857143              0.928571         30   0.057143
//    11      5             0.883117              0.941558         42   0.025974
//    13      6             0.901099              0.950549         66   0.017982
//    17      7             0.912734              0.956367        108   0.011635
//    19      8             0.921920              0.960960        150   0.009186
//    23      9             0.928710              0.964355        204   0.006790
//    29     10             0.933626              0.966813        258   0.004917
//    31     11             0.937908              0.968954        348   0.004282
//    37     12             0.941265              0.970632        528   0.003356
//    41     13             0.944130              0.972065        546   0.002865
//    43     14             0.946729              0.973364        618   0.002599
//    47     15             0.948995              0.974498        708   0.002267
//    53     16             0.950920              0.975460        870   0.001925
//    59     17             0.952584              0.976292        966   0.001664
//    61     18             0.954138              0.977069       1080   0.001555
//    67     19             0.955507              0.977754       1284   0.001369
//    71     20             0.956761              0.978380       1398   0.001253
//    73     21             0.957945              0.978973       1530   0.001185
//    79     22             0.959010              0.979505       1710   0.001065
//
// against the six figures the map and the construction record state:
//
//    x     stated      recomputed      |diff|
//     3    0.666667       0.666667      3.3e-7
//     5    0.800000       0.800000      0.0e+0
//     7    0.857143       0.857143      1.4e-7
//    11    0.883117       0.883117      1.2e-7
//    13    0.901099       0.901099      9.9e-8
//    79    0.959010       0.959010      7.0e-8
//
// R1 (all six within 1e-6): PASS
// R2 (strictly increasing from x = 5 to x = 79): PASS
// minimum over the ladder x = 5..79 is 0.800000 at x = 5;
// the record's ladder reaches down to x = 3, where it is 0.666667,
// a margin of only 0.034546 over 1 - 1/e. From x = 5 the margin is 0.167879.
//
//
// === 2. THE THRESHOLDS A CERTIFICATE COULD USE  (R3) ===
// the certificate fires only if an algorithm with proven ratio alpha
// returns coverage below alpha * L, since OPT <= ALG/alpha < L
//
// the finite-k column is a RIDER: 1-(1-1/k)^k is the cardinality-constraint
// form, and row 11's constraint is a partition matroid, so it does not apply
//
//    x     k    1-(1-1/k)^k    1-1/e      1/2      coverage    fires at any alpha?
//     2     1      1.000000  0.632121  0.500000    0.000000   yes, below ladder
//     3     2      0.750000  0.632121  0.500000    0.666667   yes, below ladder
//     5     3      0.703704  0.632121  0.500000    0.800000                  no
//     7     4      0.683594  0.632121  0.500000    0.857143                  no
//    11     5      0.672320  0.632121  0.500000    0.883117                  no
//    13     6      0.665102  0.632121  0.500000    0.901099                  no
//    17     7      0.660083  0.632121  0.500000    0.912734                  no
//    19     8      0.656391  0.632121  0.500000    0.921920                  no
//    23     9      0.653561  0.632121  0.500000    0.928710                  no
//    29    10      0.651322  0.632121  0.500000    0.933626                  no
//    31    11      0.649506  0.632121  0.500000    0.937908                  no
//    37    12      0.648004  0.632121  0.500000    0.941265                  no
//    41    13      0.646742  0.632121  0.500000    0.944130                  no
//    43    14      0.645665  0.632121  0.500000    0.946729                  no
//    47    15      0.644736  0.632121  0.500000    0.948995                  no
//    53    16      0.643926  0.632121  0.500000    0.950920                  no
//    59    17      0.643214  0.632121  0.500000    0.952584                  no
//    61    18      0.642583  0.632121  0.500000    0.954138                  no
//    67    19      0.642020  0.632121  0.500000    0.955507                  no
//    71    20      0.641514  0.632121  0.500000    0.956761                  no
//    73    21      0.641058  0.632121  0.500000    0.957945                  no
//    79    22      0.640643  0.632121  0.500000    0.959010                  no
//
// The two rows below the pre-registered ladder are reported and not scored,
// and they are worth one sentence each. At x = 2 there is one prime and the pair
// collapses to one class, so long-interval coverage is 0.500000 and a 1/2-
// certificate fires. At x = 3 only the inapplicable finite-k rider fires, at
// k = 2 where its threshold is 0.750000 against coverage 0.666667. Both fire
// CORRECTLY and uselessly: a long interval really is uncoverable by two or three
// primes, and the certificate is being asked a question whose answer is already
// known. Neither is a level at which G2 is in doubt.
//
// the finite-k form is the LARGER threshold and it still never fires;
// 1 - (1-1/k)^k falls to 0.640643 at k = 22 and to 1 - 1/e = 0.632121 in the limit.
//
//
// === 3. THE PLAIN GREEDY ON REAL INTERVALS  (R4, R5) ===
// L = G2(x#), the FIRST UNCOVERABLE length, which is the only length at which
// a certificate would ever be run; ladder from p = 2, matching A144311
//
//    x      L      greedy covered   fraction   density bound   above bound?   above 1-1/e?
//     2       2               1    0.500000       0.500000            yes             NO
//     3       6               5    0.833333       0.833333            yes            yes
//     5      12              11    0.916667       0.900000            yes            yes
//     7      30              29    0.966667       0.928571            yes            yes
//    11      42              41    0.976190       0.941558            yes            yes
//    13      66              65    0.984848       0.950549            yes            yes
//    17     108             107    0.990741       0.956367            yes            yes
//    19     150             149    0.993333       0.960960            yes            yes
//    23     204             203    0.995098       0.964355            yes            yes
//    29     258             257    0.996124       0.966813            yes            yes
//    31     348             345    0.991379       0.968954            yes            yes
//    37     528             523    0.990530       0.970632            yes            yes
//    41     546             543    0.994505       0.972065            yes            yes
//    43     618             616    0.996764       0.973364            yes            yes
//    47     708             706    0.997175       0.974498            yes            yes
//    53     870             867    0.996552       0.975460            yes            yes
//    59     966             963    0.996894       0.976292            yes            yes
//    61    1080            1076    0.996296       0.977069            yes            yes
//    67    1284            1278    0.995327       0.977754            yes            yes
//    71    1398            1394    0.997139       0.978380            yes            yes
//    73    1530            1526    0.997386       0.978973            yes            yes
//    79    1710            1704    0.996491       0.979505            yes            yes
//
// R4 (greedy at or above the density bound, x = 5..79): PASS
// R5 (greedy above 1 - 1/e at the decisive length, x = 5..79): PASS
// lowest greedy fraction on the ladder x = 5..79: 0.916667
// The x = 2 row is below the ladder and is printed for completeness: one prime,
// one class, fraction 0.500000, which is the degenerate case the thresholds table
// already flagged. Every scored level covers all but a handful of the interval:
// greedy reaches 1704 of 1710 at x = 79, and the optimum there is exactly 1709.
//
// the same at three lengths, to show the certificate has no length to fire at:
//
//    x      L = G2    frac      L = 4*G2   frac      L = 16*G2   frac
//     5       12  0.916667         48  0.916667         192  0.901042
//    17      108  0.990741        432  0.969907        1728  0.959491
//    31      348  0.991379       1392  0.979885        5568  0.972522
//    47      708  0.997175       2832  0.984110       11328  0.977843
//    67     1284  0.995327       5136  0.985592       20544  0.980968
//
//
// === 4. THE CERTIFICATE, SCORED ===
//
// C1  the six quoted figures reproduce                    PASS
// C2  the ladder is increasing over x = 5..79             PASS
// C3  greedy is above every threshold at the decisive L   PASS
// C4  the firing condition holds nowhere                  PASS
//
// ROW 11 IS DEAD, FORMALLY.
// The gap between what the certificate can see and what the question asks is
// structural, not a matter of margin: coverage runs from 0.800 to 0.959 along the
// ladder while the question is whether it reaches exactly 1, and no
// constant-factor approximation guarantee can distinguish 1 from 0.959.
// ============================================================
// READINGS
// ============================================================
//
// 1. THE MAP'S SIX FIGURES ARE RIGHT. [VERIFIED] 0.666667, 0.800000, 0.857143,
//    0.883117, 0.901099 and 0.959010 all reproduce, the largest disagreement
//    being 3.3e-7 and that is the rounding of the stated six decimals. The
//    computation that existed only as prose in IMPORT-MAP.md §11 and
//    import-map-construction.md §4(b) now has a producer, and the producer
//    agrees with it.
//
// 2. THE LADDER IS MONOTONE, SO THE CLAIM IS ABOUT ONE ENDPOINT. [VERIFIED]
//    Coverage rises at every step from 0.800000 at x = 5 to 0.959010 at x = 79,
//    steps falling from 0.133333 to 0.001065. So "never below 0.632" is not
//    twenty separate checks, it is the x = 5 value and monotonicity. The margin
//    there is 0.167879 over 1 - 1/e. The record's ladder reaches down to x = 3,
//    where the margin is only 0.034546, and that is the one level where the
//    prose's phrasing is nearly tight.
//
// 3. THE THRESHOLD IS NOT ONE NUMBER, AND THE LARGEST OF THE THREE STILL DOES
//    NOT FIRE. [VERIFIED] The finite-k form 1-(1-1/k)^k runs from 0.703704 at
//    k = 3 down to 0.640643 at k = 22 and is above 1 - 1/e = 0.632121 at every
//    level, so it is the strongest test available; coverage beats it at every
//    level of the ladder with a worst margin of 0.800000 against 0.703704. The
//    1/2 that the plain greedy is actually proven to give on a matroid is
//    weaker still. Whichever constant is used, the certificate is silent.
//
// 4. THE STEP FROM A DENSITY TO AN ALGORITHM IS EXACT, AND IT IS WHAT THE PROSE
//    OMITS. [PROVEN, and verified at every level] Every n in [1,L] lies in
//    exactly two of the p candidate pairs for an odd prime p, so the offsets'
//    gains sum to exactly twice the uncovered count with no boundary error, and
//    the best offset takes at least a (2/p) share of it. The uncovered count
//    therefore falls by at least (1-2/p) at the round where p is chosen, in
//    whatever order the greedy chooses, and greedy's coverage is at least
//    L(1 - prod(1-2/p)) for EVERY L. The run confirms it at every level: the
//    achieved fraction is at or above the density bound in all 22 rows.
//
// 5. AT THE ONLY LENGTH THAT MATTERS THE GREEDY IS WITHIN A HANDFUL OF THE
//    OPTIMUM, NOT WITHIN A CONSTANT FACTOR OF IT. [MEASURED] Run at
//    L = G2(x#), the first uncoverable length, the plain greedy covers 11 of
//    12 at x = 5 and 1704 of 1710 at x = 79, fractions 0.916667 and 0.996491,
//    against an optimum of 1709 at the top. **The certificate is being asked to
//    distinguish 1.000000 from 0.996491 using a guarantee whose resolution is
//    0.640643.** That is the closure in one line, and it is a statement about
//    resolution rather than about margin.
//
// 6. NO LENGTH RESCUES IT. [MEASURED] Stretching the interval to 4 and 16 times
//    the decisive length only moves the fraction from 0.995327 to 0.985592 to
//    0.980968 at x = 67, and from 0.916667 to 0.901042 at x = 5. The fraction
//    is bounded below by the density for every L by reading 4, so there is no
//    interval length anywhere at which an algorithm with a proven ratio returns
//    less than 0.8 of it.
//
// 7. THE TWO ROWS BELOW THE LADDER FIRE, CORRECTLY AND USELESSLY. [MEASURED]
//    At x = 2 the pair collapses to one class, coverage is 0.500000 and a
//    1/2-certificate fires; at x = 3 the inapplicable finite-k rider fires, its
//    threshold 0.750000 against coverage 0.666667. Both are certifying that a
//    long interval cannot be covered by two or three primes, which is not in
//    doubt, and neither is a level at which G2 is unknown. They are reported
//    because a scored range that quietly excludes the only rows where something
//    happens is the defect this corpus's gate exists to catch.
//
// 8. VERDICT. [MEASURED] C1 through C4 all PASS on the pre-registered ladder,
//    so row 11 is dead formally and not only on prose. The reason is structural
//    and survives any improvement in the constant: coverage runs from 0.800000
//    to 0.959010 along the ladder, and from 0.916667 to 0.996491 at the
//    decisive lengths, while the question asked is whether it reaches exactly
//    1. No constant-factor approximation guarantee resolves that, and the
//    hardness results in the same literature say no better constant is coming.
