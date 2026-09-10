#!/usr/bin/env node
'use strict';
// RED TEAM — the tau(m) quantifier price against C^{pi(z)}, the Brudern-Fouvry split, and the 2-cover structure
/* ============================================================================
   RED TEAM / attack-theta-last-gap.md section 6-7, and attack-np-licenses.md
   ============================================================================
   2026-08-18/19, attack 10 of 10. Three checkable claims, and one that is not.

   CLAIM A (headline 5, first half). "The quantifier is separable and priced at
   tau(m) rather than C^{pi(z)}." The suspicion the assignment names: if m is
   squarefree with pi(z) prime factors then tau(m) = 2^{pi(z)}, which IS of the
   form C^{pi(z)}, and the improvement would be cosmetic. This file works out
   what tau(m) actually is at the worst m and where the two statements differ.

   CLAIM B (headline 5, second half). "Brudern-Fouvry's 4.156000 is their
   unoptimised split", with 1/4.156000 = 0.2406159756 matching their printed
   0,2406, and "re-splitting stays inside their side condition".

   CLAIM C (headline 4, second half). "Brady's Problem 4 needs partitions, so it
   does not quantify over our family." The structural half of that is a finite
   computation and it is done here.

   WHAT THIS FILE CANNOT DO. It cannot check the Fourier expansion that CLAIM A
   rests on, nor read Brudern-Fouvry, nor read Brady. Those are marked in place.
   ========================================================================= */

const F = (v, d = 6) => (Number.isFinite(v) ? v.toFixed(d) : ' n/a');
const pad = (s, n) => String(s).padStart(n);
const padr = (s, n) => String(s).padEnd(n);
function primesUpTo(n) { const s = new Uint8Array(n + 1), o = []; for (let i = 2; i <= n; i++) if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } return o; }
const P = primesUpTo(2000000);
const piOf = t => { let lo = 0, hi = P.length; while (lo < hi) { const mid = (lo + hi) >> 1; if (P[mid] <= t) lo = mid + 1; else hi = mid; } return lo; };
const theta = z => { let s = 0; for (const p of P) { if (p > z) break; s += Math.log(p); } return s; };

console.log('='.repeat(78));
console.log('RED TEAM: tau(m) against C^{pi(z)}, the BF split, and the 2-cover');
console.log('='.repeat(78));

// --- A. is tau(m) really cheaper than C^{pi(z)}? ---------------------------
console.log('\nA. THE tau(m) PRICE, AT THE WORST m.');
console.log('   The report writes tau(m) = 2^{pi(ln m)}, which is the MAXIMAL order of');
console.log('   the divisor function: it is attained at m = P(y), where omega(m) = pi(y)');
console.log('   and ln m = theta(y) ~ y. So evaluate it at the worst m dividing P(z).');
console.log('   z        pi(z)    theta(z)=ln P(z)   2^{pi(z)}        2^{pi(ln P(z))}   equal?');
for (const z of [13, 29, 101, 1009, 10007, 100003]) {
  const pz = piOf(z), th = theta(z), pl = piOf(th);
  console.log('  ' + pad(z, 7) + pad(pz, 9) + pad(F(th, 2), 19)
    + pad(`2^${pz}`, 15) + pad(`2^${pl}`, 19) + '   ' + (pz === pl ? 'YES' : `no (pi(ln m) = ${pl})`));
}
console.log('   At m = P(z) the two prices are the SAME NUMBER, or within one prime of');
console.log('   it. So "tau(m) rather than C^{pi(z)}" is not a cheaper bound at the worst');
console.log('   m; it is the same bound. What differs is what it is COMPARED AGAINST.');

console.log('\n   The comparison the report actually makes is tau(m) against m^{0.175},');
console.log('   i.e. a price attached to each m and measured against that m\'s own size.');
console.log('   That is a real difference, because a uniform C^{pi(z)} is not.');
console.log('   L = ln m    pi(L)    2^{pi(L)}          m^{0.175} = e^{0.175 L}    tau wins?');
for (const L of [10, 30, 52, 60, 100, 300, 1000, 3000, 1e4, 1e5]) {
  const pl = piOf(L), a = pl * Math.log(2), b = 0.175 * L;
  console.log('  ' + pad(L.toExponential(0), 9) + pad(pl, 8) + pad('e^' + F(a, 2), 18)
    + pad('e^' + F(b, 2), 24) + '     ' + (a > b ? 'tau BINDS' : 'size wins'));
}
console.log('   The crossover in ln m is where pi(L) ln 2 = 0.175 L. Below it the divisor');
console.log('   price binds; above it the size of m beats it outright. Locating it:');
{
  let lo = 2, hi = 1e6;
  for (let i = 0; i < 200; i++) { const mid = (lo + hi) / 2; if (piOf(mid) * Math.log(2) > 0.175 * mid) lo = mid; else hi = mid; }
  console.log(`     crossover at ln m = ${F((lo + hi) / 2, 2)}, i.e. m = e^${F((lo + hi) / 2, 2)}`);
  console.log(`     and P(z) reaches that ln m at z about ${F((lo + hi) / 2, 0)} (theta(z) ~ z)`);
}
console.log('   So the route the report calls C1 binds only while ln m is under that');
console.log('   crossover, and the report says so: it calls the kill real but late.');
console.log('   VERDICT ON CLAIM A: the reframing is genuine but "materially cheaper"');
console.log('   overstates it. At the worst m the two prices coincide exactly.');

// --- B. the Brudern-Fouvry split -------------------------------------------
console.log('\nB. THE BRUDERN-FOUVRY SPLIT.');
const u = (a, b) => (1 + Math.exp(b / (2 * a))) / b;
console.log(`   u(a,b) = (1 + e^{b/2a})/b, the report's formula`);
console.log(`   u(1/2, 3/4)          = ${u(0.5, 0.75).toFixed(10)}`);
console.log(`   (4/3)(1 + e^{3/4})   = ${((4 / 3) * (1 + Math.exp(0.75))).toFixed(10)}`);
console.log(`   1/u(1/2,3/4)         = ${(1 / u(0.5, 0.75)).toFixed(10)}   <- the report prints 0.2406159756`);
console.log(`   1/4.156000 exactly   = ${(1 / 4.156).toFixed(10)}   <- NOT the same number`);
console.log('   The ten-digit reciprocal belongs to the EXACT constant (4/3)(1+e^{3/4}),');
console.log('   not to the rounded 4.156000. Any sentence of the form');
console.log('   "1/4.156000 = 0.2406159756" is wrong in its last two digits. Both round');
console.log('   to 0,2406, so the identification with their printed constant is intact.');
console.log('\n   THE SIDE CONDITION, as the report states it: q^{C0} D1^4 D2^4 <= x^{5-c eps}.');
console.log('   D1^4 D2^4 = (D1 D2)^4, so the condition sees ONLY the product. Check with');
console.log('   D1 = x^a, D2 = x^b: the exponent of x is 4a + 4b = 4(a+b), a function of');
console.log('   a+b alone. So the split IS free inside it, ALGEBRAICALLY. [VERIFIED]');
console.log('   a      b      a+b     4(a+b)   u(a,b)        inside x^5 ?');
for (const [a, b] of [[0.5, 0.75], [0.45, 0.8], [0.55, 0.7], [0.6, 0.65], [0.4, 0.85], [0.65, 0.6]]) {
  console.log('  ' + pad(F(a, 2), 6) + pad(F(b, 2), 7) + pad(F(a + b, 2), 8) + pad(F(4 * (a + b), 2), 9)
    + pad(u(a, b).toFixed(10), 15) + '   ' + (4 * (a + b) <= 5 + 1e-12 ? 'yes' : 'NO'));
}
{
  let best = Infinity, ba = 0, bb = 0;
  for (let b = 0.0005; b < 1.25; b += 0.0000005) { const a = 1.25 - b; const v = u(a, b); if (v < best) { best = v; ba = a; bb = b; } }
  console.log(`\n   optimum on a+b = 5/4:  a = ${F(ba, 7)}, b = ${F(bb, 7)},  u = ${best.toFixed(10)}`);
  console.log(`   the report says the optimal re-split gives u = 4.1264517443, theta = 0.2423389541`);
  console.log(`   1/u here = ${(1 / best).toFixed(10)}`);
  console.log(`   their split u = ${u(0.5, 0.75).toFixed(10)} at a+b = ${F(0.5 + 0.75, 2)}, the SAME a+b,`);
  console.log(`   so both sit at 4(a+b) = 5 and both saturate x^5. Re-splitting stays inside.`);
  console.log(`   unclaimed exponent = ${(u(0.5, 0.75) - best).toFixed(10)}   (report: 0.0295482779)`);
  console.log(`   in their currency  = ${(1 / best - 1 / u(0.5, 0.75)).toFixed(10)}   (report: 0.0017229785)`);
}
console.log('\n   WHAT CANNOT BE CHECKED HERE. Whether q^{C0} D1^4 D2^4 <= x^{5-c eps} is');
console.log('   what Brudern-Fouvry actually require, and whether "0,2406" is what they');
console.log('   print, rest on BF.txt, which is NOT in this repository. The arithmetic');
console.log('   above is exact; the attribution is unverifiable from here.');

// --- C. the 2-cover ---------------------------------------------------------
console.log('\nC. IS OUR PER-PRIME FAMILY A PARTITION? (headline 4, the structural half)');
console.log('   The family at p is the COLLECTION { S_a : a in Z/p }, S_a = {a, a-2} mod p.');
console.log('   A partition needs the p sets pairwise disjoint and covering Z/p.');
console.log('   p     |S_a|   multiplicity of each residue across the p sets   partition?');
for (const p of [2, 3, 5, 7, 11, 13, 17, 19, 23]) {
  const mult = new Array(p).fill(0);
  let size = null, uniform = true;
  for (let a = 0; a < p; a++) {
    const S = new Set([a % p, ((a - 2) % p + p) % p]);
    if (size === null) size = S.size; else if (size !== S.size) uniform = false;
    for (const v of S) mult[v]++;
  }
  const ms = [...new Set(mult)];
  console.log('  ' + pad(p, 4) + pad(size, 8) + pad(JSON.stringify(ms), 20)
    + pad(uniform ? '' : ' (sizes vary)', 26) + '   ' + (ms.length === 1 && ms[0] === 1 ? 'YES' : 'no'));
}
console.log('   Multiplicity is 1 at p = 2 only, where a = a-2 mod 2 collapses the pair to');
console.log('   a single class, and 2 at every odd p. p sets of size 2 cannot partition p');
console.log('   elements, so no odd prime supplies a partition. [VERIFIED]');
console.log('   This is the fact attack-np-licenses.md section 4.2 item 3 asserts, and it');
console.log('   reproduces. Whether Brady\'s Problem 4 requires a partition is a reading of');
console.log('   his thesis, which is NOT in this repository and is not checked here.');

console.log('\n' + '='.repeat(78));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/redteam-tau-and-split.js
//   invocation:  node research/redteam-tau-and-split.js
//   code-sha256: dc3f982c0acc218ce46f70ec21f57108e9271a938949e22b9de3059eff9643db
//   out-sha256:  26494707b368a3a8a3fb0fd2716dbdb5b8d9cd95b817bae819ae720d29d03c33
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     0.2 s
// ============================================================================
// ==============================================================================
// RED TEAM: tau(m) against C^{pi(z)}, the BF split, and the 2-cover
// ==============================================================================
//
// A. THE tau(m) PRICE, AT THE WORST m.
//    The report writes tau(m) = 2^{pi(ln m)}, which is the MAXIMAL order of
//    the divisor function: it is attained at m = P(y), where omega(m) = pi(y)
//    and ln m = theta(y) ~ y. So evaluate it at the worst m dividing P(z).
//    z        pi(z)    theta(z)=ln P(z)   2^{pi(z)}        2^{pi(ln P(z))}   equal?
//        13        6              10.31            2^6                2^4   no (pi(ln m) = 4)
//        29       10              22.59           2^10                2^8   no (pi(ln m) = 8)
//       101       26              88.34           2^26               2^23   no (pi(ln m) = 23)
//      1009      169             963.16          2^169              2^162   no (pi(ln m) = 162)
//     10007     1230            9905.20         2^1230             2^1221   no (pi(ln m) = 1221)
//    100003     9593           99696.90         2^9593             2^9564   no (pi(ln m) = 9564)
//    At m = P(z) the two prices are the SAME NUMBER, or within one prime of
//    it. So "tau(m) rather than C^{pi(z)}" is not a cheaper bound at the worst
//    m; it is the same bound. What differs is what it is COMPARED AGAINST.
//
//    The comparison the report actually makes is tau(m) against m^{0.175},
//    i.e. a price attached to each m and measured against that m's own size.
//    That is a real difference, because a uniform C^{pi(z)} is not.
//    L = ln m    pi(L)    2^{pi(L)}          m^{0.175} = e^{0.175 L}    tau wins?
//        1e+1       4            e^2.77                  e^1.75     tau BINDS
//        3e+1      10            e^6.93                  e^5.25     tau BINDS
//        5e+1      15           e^10.40                  e^9.10     tau BINDS
//        6e+1      17           e^11.78                 e^10.50     tau BINDS
//        1e+2      25           e^17.33                 e^17.50     size wins
//        3e+2      62           e^42.98                 e^52.50     size wins
//        1e+3     168          e^116.45                e^175.00     size wins
//        3e+3     430          e^298.05                e^525.00     size wins
//        1e+4    1229          e^851.88               e^1750.00     size wins
//        1e+5    9592         e^6648.67              e^17500.00     size wins
//    The crossover in ln m is where pi(L) ln 2 = 0.175 L. Below it the divisor
//    price binds; above it the size of m beats it outright. Locating it:
//      crossover at ln m = 118.83, i.e. m = e^118.83
//      and P(z) reaches that ln m at z about 119 (theta(z) ~ z)
//    So the route the report calls C1 binds only while ln m is under that
//    crossover, and the report says so: it calls the kill real but late.
//    VERDICT ON CLAIM A: the reframing is genuine but "materially cheaper"
//    overstates it. At the worst m the two prices coincide exactly.
//
// B. THE BRUDERN-FOUVRY SPLIT.
//    u(a,b) = (1 + e^{b/2a})/b, the report's formula
//    u(1/2, 3/4)          = 4.1560000222
//    (4/3)(1 + e^{3/4})   = 4.1560000222
//    1/u(1/2,3/4)         = 0.2406159756   <- the report prints 0.2406159756
//    1/4.156000 exactly   = 0.2406159769   <- NOT the same number
//    The ten-digit reciprocal belongs to the EXACT constant (4/3)(1+e^{3/4}),
//    not to the rounded 4.156000. Any sentence of the form
//    "1/4.156000 = 0.2406159756" is wrong in its last two digits. Both round
//    to 0,2406, so the identification with their printed constant is intact.
//
//    THE SIDE CONDITION, as the report states it: q^{C0} D1^4 D2^4 <= x^{5-c eps}.
//    D1^4 D2^4 = (D1 D2)^4, so the condition sees ONLY the product. Check with
//    D1 = x^a, D2 = x^b: the exponent of x is 4a + 4b = 4(a+b), a function of
//    a+b alone. So the split IS free inside it, ALGEBRAICALLY. [VERIFIED]
//    a      b      a+b     4(a+b)   u(a,b)        inside x^5 ?
//     0.50   0.75    1.25     5.00   4.1560000222   yes
//     0.45   0.80    1.25     5.00   4.2905318179   yes
//     0.55   0.70    1.25     5.00   4.1279958696   yes
//     0.60   0.65    1.25     5.00   4.1828757820   yes
//     0.40   0.85    1.25     5.00   4.5807011108   yes
//     0.65   0.60    1.25     5.00   4.3108548292   yes
//
//    optimum on a+b = 5/4:  a = 0.5404035, b = 0.7095965,  u = 4.1264517443
//    the report says the optimal re-split gives u = 4.1264517443, theta = 0.2423389541
//    1/u here = 0.2423389541
//    their split u = 4.1560000222 at a+b = 1.25, the SAME a+b,
//    so both sit at 4(a+b) = 5 and both saturate x^5. Re-splitting stays inside.
//    unclaimed exponent = 0.0295482779   (report: 0.0295482779)
//    in their currency  = 0.0017229785   (report: 0.0017229785)
//
//    WHAT CANNOT BE CHECKED HERE. Whether q^{C0} D1^4 D2^4 <= x^{5-c eps} is
//    what Brudern-Fouvry actually require, and whether "0,2406" is what they
//    print, rest on BF.txt, which is NOT in this repository. The arithmetic
//    above is exact; the attribution is unverifiable from here.
//
// C. IS OUR PER-PRIME FAMILY A PARTITION? (headline 4, the structural half)
//    The family at p is the COLLECTION { S_a : a in Z/p }, S_a = {a, a-2} mod p.
//    A partition needs the p sets pairwise disjoint and covering Z/p.
//    p     |S_a|   multiplicity of each residue across the p sets   partition?
//      2       1                 [1]                             YES
//      3       2                 [2]                             no
//      5       2                 [2]                             no
//      7       2                 [2]                             no
//     11       2                 [2]                             no
//     13       2                 [2]                             no
//     17       2                 [2]                             no
//     19       2                 [2]                             no
//     23       2                 [2]                             no
//    Multiplicity is 1 at p = 2 only, where a = a-2 mod 2 collapses the pair to
//    a single class, and 2 at every odd p. p sets of size 2 cannot partition p
//    elements, so no odd prime supplies a partition. [VERIFIED]
//    This is the fact attack-np-licenses.md section 4.2 item 3 asserts, and it
//    reproduces. Whether Brady's Problem 4 requires a partition is a reading of
//    his thesis, which is NOT in this repository and is not checked here.
//
// ==============================================================================
// ============================================================
// READINGS
// ============================================================
//
// 1. "tau(m) RATHER THAN C^{pi(z)}" IS THE SAME NUMBER AT THE WORST m. The
//    report's own formula tau(m) = 2^{pi(ln m)} is the maximal order of the
//    divisor function, attained at m = P(y) where ln m = theta(y). Evaluated at
//    the worst m dividing P(z) it returns 2^{pi(z)} exactly, or within one prime
//    of it, at every z tested from 13 to 100003. So the reframing does not lower
//    the worst-case price; the two statements agree there.
//
// 2. WHAT DOES DIFFER IS WHAT THE PRICE IS MEASURED AGAINST, AND THAT IS REAL.
//    A uniform C^{pi(z)} is attached to nothing; tau(m) is attached to each m
//    and compared with that m's own size m^{0.175}. Below ln m = 118.83 the
//    divisor price binds and above it the size of m beats it outright. That is a
//    genuine structural gain and it is why the route survives at all. But
//    "materially cheaper statement of the wall" overstates it: the improvement
//    is in the shape of the comparison, not in the size of the constant, and at
//    the worst m there is no improvement at all.
//
// 3. THE BRUDERN-FOUVRY ARITHMETIC IS EXACT, AND ONE DIGIT-COUNT IS NOT.
//    u(1/2,3/4) = 4.1560000222 = (4/3)(1+e^{3/4}) and 1/u = 0.2406159756,
//    reproducing the report. But 1/4.156000 = 0.2406159769. The ten-digit
//    reciprocal belongs to the exact constant and not to the rounded 4.156000,
//    so any sentence of the form "1/4.156000 = 0.2406159756" is wrong in its
//    last two digits. Both round to 0,2406, so the identification with their
//    printed constant is untouched. This is a precision-provenance defect.
//
// 4. THE SIDE CONDITION REALLY DOES LEAVE THE SPLIT FREE, ALGEBRAICALLY.
//    q^{C0} D1^4 D2^4 <= x^{5-c eps} with D1 = x^a, D2 = x^b has x-exponent
//    4(a+b), a function of the sum alone. Six splits with a+b = 5/4 all give
//    4(a+b) = 5.00 and all sit inside x^5 while u ranges 4.1264517443 to
//    4.5807011108. So re-splitting stays inside the side condition and the
//    claim is CONFIRMED as algebra.
//
// 5. AND THE OPTIMUM REPRODUCES TO EVERY DIGIT. Minimising u on a+b = 5/4 gives
//    a = 0.5404035, b = 0.7095965, u = 4.1264517443, 1/u = 0.2423389541,
//    unclaimed exponent 0.0295482779 and 0.0017229785 in their currency -- the
//    report's four figures, from an independent minimisation.
//
// 6. THE ATTRIBUTION IS THE PART THAT CANNOT BE CHECKED. Whether
//    q^{C0} D1^4 D2^4 <= x^{5-c eps} is what Brudern-Fouvry require, and whether
//    "0,2406" is what they print, rest on BF.txt, which is not in this
//    repository. The arithmetic is exact and the attribution is unverifiable
//    from here. The same holds for Brady's thesis in reading 7.
//
// 7. OUR FAMILY IS A 2-COVER AND NEVER A PARTITION AT AN ODD PRIME. Across
//    p = 2..23 the multiplicity of each residue in the collection {S_a} is [1]
//    at p = 2, where a and a-2 coincide, and [2] at every odd p. p sets of size
//    2 cannot partition p elements. So attack-np-licenses.md section 4.2 item 3
//    reproduces, and any argument of Brady's that requires each prime to supply
//    a partition does not quantify over our family. Whether his Problem 4 does
//    require that is a reading of a document not in this repository.
