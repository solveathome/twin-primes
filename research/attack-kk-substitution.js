'use strict';
// ATTACK 4 — THE KALMYNIN-KONYAGIN SUBSTITUTION AT D3: does the paper proof
// stand when Omega_p = {a_p, a_p - 2} is put into their three-band construction?
/* ============================================================================
   attack-kk-substitution.js  (2026-08-18)

   QUESTION
   research/history/staging/attack-lower-bound.md section 4 checked the
   substitution Omega_p = {a_p, a_p-2} into Kalmynin-Konyagin's Cases 1-3
   COMPUTATIONALLY (its D1, D2, D4) and left one step undone: D3, the paper
   proof. If the substituted construction really is K-K's proof of Theorem 1
   run at f(x) = x(x+2), then

       G2(P(y)) >> y (ln y)^3 (lnlnln y)^2 / (lnln y)^4,

   one log above the INFERRED analogue of research/two-class-lower-bounds.md
   section 4b and two logs above the free bound. This script supplies every
   number the paper argument needs, and every number it needs to be honest
   about what "for large enough y" costs.

   THE SOURCE OF RECORD
   Kalmynin & Konyagin, "A polynomial analogue of Jacobsthal function",
   arXiv:2302.00459v2, md5 b5d7d2a23ffd902415057adebfe430b1, 12 pages; published
   as Izv. Math. 88:2 (2024) 225-235. Section 2 (pages 3-7 of the arXiv PDF) is
   the whole proof of Theorem 1: Lemma 1 (fundamental lemma, cited to
   Halberstam-Richert Thm 2.2), Corollary 1, Lemma 2 (Chebotarev), then the
   three-step construction with bands

       z0 = (ln y)^A,   z1 = exp( lnlnln y * ln y / (A lnln y) ),

   sets Omega^I (linear-factor roots, all p <= sqrt y), Omega^II (non-linear
   irreducible roots), Omega^III (maximal fibre, band 2 only), the trichotomy
   Cases 1-3, and the Mertens ledger. The PDF was read directly; the corpus
   transcription of record is research/history/staging/lit-pdf-kalmynin-konyagin.md.

   THE SUBSTITUTED CONSTRUCTION, STATED ONCE
   Object: G2(P(y)). By research/two-class-lower-bounds.md section 1 (PROVEN,
   CRT), G2(P(y)) - 1 is the longest interval [1,m] coverable by choosing one
   residue a_p per prime and deleting {a_p, a_p - 2} mod p. Choose x = a_p
   residues by:
       band 1   p <= z0  and  z1 < p < y/2  :  a_p = 0, kill set {0, -2}
       band 2   z0 < p <= z1                :  a_p = 1, kill set {1, -1}
       band 3   y/2 <= p <= y               :  greedy, one leftover i per prime
   and set x == -a_p (mod p) for every p <= y. Then p | x+i iff i == a_p, and
   p | x+i+2 iff i == a_p - 2, so i is killed by p exactly when i mod p is in
   the kill set. The sieve set fed to Corollary 1 at z = sqrt(y) is

       Omega^I_p   = {0, -2}    for every p <= sqrt y     (the SIEVE form)
       Omega^II_p  = empty      (h_f = 0: no non-linear factor exists)
       Omega^III_p = {1, -1}    for z0 < p <= z1           (the FREE TRANSLATE)

   The free translate of research/qc/units.js section 5 is used in exactly one
   band. Band 1 sets a_p = 0, at which the covering form and the sieve form of
   {0,-2} COINCIDE; that coincidence is what makes Case 1 transfer verbatim.

   WHAT EACH SECTION SUPPLIES
   A  The substituted system prime by prime: |Omega^I|, |Omega^III|, the exact
      disjointness threshold p0, and the resultants that prove it is exact.
   B  Is a_p = 1 the best band-2 choice? Resultant sweep over a.
   C  Corollary 1's hypotheses: kappa, g(p) < p, and the band-membership of the
      two primes (2 and 3) where the counts degenerate.
   D  Case 1's smoothness dichotomy, as an inequality on A rather than a sweep.
   E  The smooth-number step: u, rho(u), Hildebrand's range, the A it forces.
   F  THE MERTENS LEDGER, TERM BY TERM. Direct prime sums where the bands fit,
      then Rosser-Schoenfeld explicit error at the real bands where they do not.
   G  The exponent assembly, as an identity checked to machine precision.
   H  y0: the smallest y at which every hypothesis holds at once, per A. The
      paper never says how large "large enough" is. This says.
   I  Calibration: K-K's Theorem 1 at f(x) = x against the classical bound it
      is supposed to generalise, and the transferred bound against the corpus's
      four standing statements.

   WHAT THIS SCRIPT DOES NOT DO
   It does not re-run D1/D2/D4 of attack-lower-bound.js, which stand. It does
   not measure G2. Every G2 measurement question is settled in
   attack-lower-bound.md section 3 and is not re-litigated here.
   ============================================================================ */

// ---------------------------------------------------------------- utilities

function sieve(n) {
  const c = new Uint8Array(n + 1);
  const ps = [];
  for (let i = 2; i <= n; i++) {
    if (!c[i]) { ps.push(i); for (let j = i * i; j <= n; j += i) c[j] = 1; }
  }
  return ps;
}

const F = (x, d = 6) => (Number.isFinite(x) ? x.toFixed(d) : String(x));
const E = (x, d = 4) => (Number.isFinite(x) ? x.toExponential(d) : String(x));
const pad = (s, n) => String(s).padStart(n);
const padr = (s, n) => String(s).padEnd(n);
function head(t) { console.log('\n' + '='.repeat(78) + '\n' + t + '\n' + '='.repeat(78)); }
function sub(t) { console.log('\n' + t + '\n' + '-'.repeat(t.length)); }

// integer resultant of two monic integer polys given by their root multisets
// over Q; here all our polys split, so Res(f,g) = prod_{r root of f} g(r).
function resultantFromRoots(rootsF, gAtPoint) {
  let r = 1;
  for (const a of rootsF) r *= gAtPoint(a);
  return r;
}

// log-gamma, Lanczos. Used for rho(u) <= 1/Gamma(u+1).
function lgamma(z) {
  const g = 7;
  const C = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lgamma(1 - z);
  z -= 1;
  let x = C[0];
  for (let i = 1; i < g + 2; i++) x += C[i] / (z + i);
  const t = z + g + 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}

// de Bruijn: ln rho(u) = -u( ln u + lnln u - 1 + o(1) ) for u -> infinity.
function lnRhoDeBruijn(u) {
  if (u <= 1) return 0;
  if (u < Math.E) return -u * Math.log(u); // crude, only used far from here
  return -u * (Math.log(u) + Math.log(Math.log(u)) - 1);
}
const lnRhoGamma = (u) => -lgamma(u + 1);

// ------------------------------------------------------- the band geometry
// Everything is a function of L = ln y, because the y that matter are far
// beyond double precision. ll = lnln y, lll = lnlnln y.
function geom(L, A, B) {
  const ll = Math.log(L);
  const lll = Math.log(ll);
  const lnz0 = A * ll;                       // z0 = (ln y)^A
  const lnz1 = lll * L / (A * ll);           // z1 = exp(lll*L/(A*ll))
  const lnRootY = L / 2;                     // sqrt(y)
  // m = (y/B) (ln y)^3 (lll)^2 / (ll)^4     at l_f = 2, h_f = 0, M = 2
  // lnmMinusL is ln(m/y), and it is what every comparison actually needs. The
  // y that matter have L up to 1e300, where L + O(ln L) is L in double
  // precision, so no test below is allowed to subtract two numbers of size L.
  const lnmMinusL = -Math.log(B) + 3 * Math.log(L) + 2 * Math.log(lll) - 4 * Math.log(ll);
  const lnm = L + lnmMinusL;
  return { L, ll, lll, lnz0, lnz1, lnRootY, lnm, lnmMinusL, A, B };
}

// ================================================================ SECTION A
head('A.  THE SUBSTITUTED SYSTEM, PRIME BY PRIME');
console.log(`
Omega^I_p = {0, -2} mod p          (band 1's kill set, a_p = 0; K-K's linear
                                    factors of f(x) = x(x+2), root set {0,-2})
Omega^III_p = {1, -1} mod p        (band 2's kill set, a_p = 1)
K-K need |Omega^I_p| = l_f and pairwise disjointness only for p > p0, with p0
left unquantified ("any two fixed irreducible polynomials have no common roots
modulo large enough primes", arXiv v2 p. 6). Here p0 is computable.`);

const PMAX_A = 1000000;
const PR = sieve(PMAX_A);
let badI = 0, badIII = 0, firstDisjoint = null, lastOverlap = null, badG = 0;
let firstGis4 = null;
const rows = [];
for (const p of PR) {
  const OI = new Set([0 % p, ((-2) % p + p) % p]);
  const OIII = new Set([1 % p, ((-1) % p + p) % p]);
  const inter = [...OI].filter((t) => OIII.has(t));
  const uni = new Set([...OI, ...OIII]);
  if (p >= 3 && OI.size !== 2) badI++;
  if (p >= 3 && OIII.size !== 2) badIII++;
  if (inter.length > 0) { lastOverlap = p; firstDisjoint = null; }
  else if (firstDisjoint === null) firstDisjoint = p;
  if (uni.size >= p) badG++;
  if (uni.size === 4 && firstGis4 === null) firstGis4 = p;
  if (p <= 17) rows.push([p, OI.size, OIII.size, inter.length, uni.size, uni.size < p]);
}
console.log('\n   p   |Omega^I|  |Omega^III|  |intersection|  g(p)=|union|  g(p)<p');
for (const r of rows) {
  console.log(`  ${pad(r[0], 2)}   ${pad(r[1], 8)}   ${pad(r[2], 9)}   ${pad(r[3], 12)}   ${pad(r[4], 11)}   ${r[5] ? 'yes' : 'NO'}`);
}
console.log(`
  primes swept                                 ${PR.length}  (p <= ${PMAX_A})
  odd p with |Omega^I_p| != 2                  ${badI}
  odd p with |Omega^III_p| != 2                ${badIII}
  largest p with Omega^I ^ Omega^III nonempty  ${lastOverlap}
  smallest p with them disjoint, and all above ${firstDisjoint}
  smallest p with g(p) = 4                     ${firstGis4}
  p with g(p) >= p                             ${badG}`);

sub('A2.  p0 = 5 is exact, and the resultants say why');
const resLin = resultantFromRoots([0, -2], (t) => (t - (-2))) * 1; // Res(x, x+2)
const R_x_xp2 = resultantFromRoots([0], (t) => t + 2);
const R_I_III = resultantFromRoots([0, -2], (t) => (t - 1) * (t + 1));
console.log(`
  Res(x, x+2)                    = ${R_x_xp2}    so |Omega^I_p| = 2 for all p > 2
  Res( x(x+2), (x-1)(x+1) )      = ${R_I_III}   so Omega^I_p ^ Omega^III_p = {} iff p does not divide ${Math.abs(R_I_III)}
  smallest prime not dividing ${Math.abs(R_I_III)} and > 2   = 5
  sweep agreement (A1 vs resultant)          ${firstDisjoint === 5 ? 'AGREE at p0 = 5' : 'DISAGREE'}`);

sub('A3.  Case 2 is vacuous, and the two places where that is visible');
console.log(`
f(x) = x(x+2) factors completely into linear factors over Z, so h_f = 0 and
Omega^II_p is empty at EVERY prime by K-K's own definition. Case 2's hypothesis
-- "for some irreducible non-linear factor q(x) of f(x) we have q(i) = 0 mod p"
-- quantifies over an empty set and is unsatisfiable. Two consequences, both
arithmetic rather than rhetorical:

  (i)  the Theorem 1 factor ( (lnln y)^2 / lnlnln y )^{h_f} is 1 identically;
  (ii) the Lemma 2 ledger entry h_f (lnln y - lnln z1 + lnln z0) is 0 identically.

So Lemma 2 -- and with it Chebotarev's density theorem, the effective
Lagarias-Odlyzko form, and the whole of K-K section 3 (Theorem 2, Lemma 3
Birch-Swinnerton-Dyer, the Galois groups G_f and G_f^+) -- is consumed by
nothing in the substituted proof.`);
console.log('\n   L=ln y     h_f factor at h_f=0    Lemma-2 ledger entry at h_f=0    same at h_f=1 (for scale)');
for (const L of [1e2, 1e4, 1e9]) {
  const ll = Math.log(L), lll = Math.log(ll);
  const A = 5;
  const lnz0 = A * ll, lnz1 = lll * L / (A * ll);
  const factor0 = Math.pow(ll * ll / lll, 0);
  const ledger0 = 0 * (Math.log(L) - Math.log(lnz1) + Math.log(lnz0));
  const ledger1 = 1 * (Math.log(L) - Math.log(lnz1) + Math.log(lnz0));
  console.log(`  ${padr(E(L, 1), 9)}  ${pad(F(factor0, 6), 19)}    ${pad(F(ledger0, 6), 28)}    ${pad(F(ledger1, 6), 22)}`);
}

// ================================================================ SECTION B
head('B.  IS a_p = 1 THE BEST BAND-2 CHOICE?');
console.log(`
Band 2 may take any a. Kill set {a, a-2}. Disjointness from {0,-2} fails
exactly at primes dividing Res( x(x+2), (x-a)(x-a+2) ) = a^2 (a^2 - 4).
a = 0, -2 and 2 are degenerate (the two sets meet identically). Among the rest,
a = 1 and a = -1 minimise |Res| at 3, which is the smallest a non-degenerate
choice can achieve, since 3 | a^2(a^2-4) whenever 3 does not divide a.`);
console.log('\n    a    Res = a^2(a^2-4)   |Res|   p0 = least prime not dividing |Res|, p>2');
function leastPrimeNotDividing(n) {
  n = Math.abs(n);
  for (const p of PR) { if (p > 2 && n % p !== 0) return p; }
  return null;
}
for (let a = -4; a <= 5; a++) {
  const R = resultantFromRoots([0, -2], (t) => (t - a) * (t - a + 2));
  const ok = R !== 0;
  console.log(`  ${pad(a, 3)}    ${pad(R, 12)}   ${pad(Math.abs(R), 6)}   ${ok ? pad(leastPrimeNotDividing(R), 4) : '  -- (degenerate, Omega^III meets Omega^I identically)'}`);
}

// ================================================================ SECTION C
head('C.  COROLLARY 1\'s HYPOTHESES UNDER THE SUBSTITUTION');
console.log(`
Lemma 1 needs g(p) <= kappa and g(p) < p for every p <= z. K-K apply it at
kappa = 3 deg f = 6 ("all three parts of Omega_p contain at most d = deg f
elements", v2 p. 6). Under the substitution Omega^II is empty and the other two
parts have 2 elements each, so kappa = 4.

Band 2's g(p) = 4 is NOT < p at p = 2 and p = 3. Those two primes are safe
because the BAND STRUCTURE puts every small prime in band 1, where Omega^III_p
is empty by definition and g(p) is 1 and 2 respectively:`);
console.log('\n   p   band-1 g(p)   band-2 g(p)   band-1 g<p   band-2 g<p');
for (const p of [2, 3, 5, 7, 11]) {
  const g1 = new Set([0 % p, ((-2) % p + p) % p]).size;
  const g2 = new Set([0 % p, ((-2) % p + p) % p, 1 % p, ((-1) % p + p) % p]).size;
  console.log(`  ${pad(p, 2)}   ${pad(g1, 9)}   ${pad(g2, 11)}   ${pad(g1 < p ? 'yes' : 'NO', 10)}   ${pad(g2 < p ? 'yes' : 'NO', 10)}`);
}
console.log(`
  So band 2 must not contain 3. Band 2 starts above z0 = (ln y)^A, so this asks
  (ln y)^A > 3, i.e. ln y > 3^(1/A). At A = 5 that is ln y > 1.2457, y > 3.475.
  Vacuous: K-K already require y >= 19. kappa = 4 < 6 = their kappa, same
  z = sqrt(y), same X = m, so the transfer imposes NO new analytic requirement.`);

// ================================================================ SECTION D
head('D.  CASE 1, THE SMOOTHNESS DICHOTOMY, AS AN INEQUALITY ON A');
console.log(`
K-K's Case 1: i mod p in Omega^I_p for some p <= sqrt y. Substituted, that says
p | i or p | i+2. Write k(i) for whichever of i, i+2 that is.
  (i)  if |k(i)| = p then i <= sqrt(y) + 2: O(sqrt y) values, negligible.
  (ii) otherwise |k(i)| is composite. i unsifted after band 1 means neither i
       nor i+2 has a prime factor in [2, z0] u (z1, y/2). Let P be the largest
       prime factor of |k(i)|. If P <= z1 then k(i) is z1-smooth. If P >= y/2
       then |k(i)|/P <= (m+2)/(y/2) ~ 2m/y, and every prime factor of |k(i)|/P
       exceeds z0; so if
                              2m/y  <  z0
       then |k(i)|/P has no prime factor at all, i.e. |k(i)| = P is prime,
       contradicting composite. So k(i) is z1-smooth. []
The whole of Case 1 is therefore the single inequality 2m/y < z0, i.e.

     ln 2 - ln B + 3 lnL + 2 ln(lnln L) - 4 ln(ln L)  <  A ln L,      L = ln y.

K-K state the same step as k(i) << m << y(ln y)^{l_f + M(f)} = y(ln y)^4 "for
large enough A". Our m is y(ln y)^3 (lll)^2/(ll)^4 <= y(ln y)^3, so A > 3 is
what the substituted version actually needs, one power less than theirs.`);
console.log('\n   L=ln y     y            A=3 margin   A=4 margin   A=5 margin   A=6 margin   (margin = A lnL - ln(2m/y); need > 0)');
for (const L of [10, 20, 50, 1e2, 1e3, 1e4, 1e6]) {
  const cells = [3, 4, 5, 6].map((A) => {
    const G = geom(L, A, 10);
    return F(G.lnz0 - (Math.log(2) + G.lnmMinusL), 3);
  });
  console.log(`  ${padr(E(L, 2), 9)}  ${padr('e^' + E(L, 2), 11)}  ${cells.map((c) => pad(c, 10)).join('   ')}`);
}

// ================================================================ SECTION E
head('E.  THE SMOOTH-NUMBER STEP, AND THE A IT FORCES');
console.log(`
K-K need Psi(O(m), z1) = o(y / ln y) and assert Psi(O(m), z1) << m/(ln y)^{l_f
+ M(f) + 2} = m/(ln y)^6 "for large enough A". Substituted, the requirement is
2 Psi(O(m), z1) = o(y/ln y): the factor 2 because both i and i+2 must be
checked, and it changes nothing.

u = ln m / ln z1. With ln z1 = lll * L /(A ll) and ln m ~ L, u ~ A ll / lll, so
u ln u ~ A ll and Psi ~ m (ln y)^{-A}. Need m (ln y)^{-A} = o(y/ln y), i.e.
(ln y)^{3-A} = o(1/ln y): A > 4. That is exactly the l_f + M(f) = 4 K-K's own
version of this step asks for, so the substitution costs nothing here either.

VALIDITY OF THE ESTIMATE. Hildebrand's range is z >= exp((lnln x)^{5/3+eps}).
Column "Hildebrand slack" is ln z1 / (lnln m)^{5/3}; it must diverge.`);
console.log('\n   L=ln y   A    u = lnm/lnz1   ln Psi/m (deBruijn)   ln Psi/m (1/Gamma)   ln(y/(3 ln y)) - ln m   verdict   Hildebrand slack');
for (const L of [1e2, 1e3, 1e4, 1e6, 1e9]) {
  for (const A of [3, 4, 5, 6]) {
    const G = geom(L, A, 10);
    const u = G.lnm / G.lnz1;
    const lnPsiOverM_dB = lnRhoDeBruijn(u);
    const lnPsiOverM_g = lnRhoGamma(u);
    const need = -(Math.log(12) + Math.log(L) + G.lnmMinusL); // ln( (y/(12 ln y)) / m ): the smooth term's share of the y/(3 ln y) budget after y/(4 ln y) for the sieve (referee 2026-09-07, reviews-0907/09 finding 3)
    const ok = lnPsiOverM_dB + Math.log(2) < need;
    const lnlnm = Math.log(G.lnm);
    const slack = G.lnz1 / Math.pow(lnlnm, 5 / 3);
    console.log(`  ${padr(E(L, 1), 7)} ${pad(A, 2)}   ${pad(F(u, 3), 11)}   ${pad(F(lnPsiOverM_dB, 3), 19)}   ${pad(F(lnPsiOverM_g, 3), 18)}   ${pad(F(need, 3), 21)}   ${padr(ok ? 'HOLDS' : 'fails', 8)}  ${E(slack, 3)}`);
  }
}

console.log('\n   L=ln y     least A satisfying the smooth-number step alone (bisected, B = 10)');
for (const L of [1e2, 1e3, 1e4, 1e6, 1e9, 1e12, 1e30, 1e100, 1e300]) {
  let lo = 0.1, hi = 20;
  const ok = (A) => { const G = geom(L, A, 10); const u = G.lnm / G.lnz1; return Math.log(2) + G.lnmMinusL + lnRhoDeBruijn(u) + Math.log(12) + Math.log(L) < 0; };
  if (!ok(hi)) { console.log(`  ${padr(E(L, 1), 9)}  none below 20`); continue; }
  for (let i = 0; i < 200; i++) { const mid = (lo + hi) / 2; if (ok(mid)) hi = mid; else lo = mid; }
  console.log(`  ${padr(E(L, 1), 9)}  ${F(hi, 4)}`);
}
console.log(`
The de Bruijn refinement of rho(u) makes the finite-L requirement weaker than
the crude u ln u analysis, so the least admissible A approaches 4 from below and
is still climbing at L = 1e300. Any A > 4 is safe at every L in this table, and
that is what the proof uses. Combined with section D's A > 3, the substituted
proof needs A > 4 and nothing more.`);

// ================================================================ SECTION F
head('F.  THE MERTENS LEDGER, TERM BY TERM');
console.log(`
K-K's ledger (v2 pp. 6-7), with Omega^II dropped because h_f = 0:

  sum_{p <= sqrt y} g(p)/p  =  sum_{p0 < p <= sqrt y} l_f / p
                            +  sum_{z0 < p <= z1} M_p(f) / p
                            +  O(1)
                            =  l_f lnln y  +  M(f)(lnln z1 - lnln z0)  +  O(1).

Substituted, l_f is replaced by |Omega^I_p| = 2 and M_p(f) by |Omega^III_p| = 2,
so the two contributions are 2 lnln y and 2(lnln z1 - lnln z0). Both are now
plain Mertens sums over a constant: no Lemma 2, no Chebotarev, and the second
one no longer needs the definition of M(f) or Theorem 2, because 2 is attained
at EVERY odd p rather than on logarithmic average.

F1. The first sum, directly, against 2 lnln y. Residual must be bounded.`);
const MERTENS = 0.2614972128476428;
const C_I = -2 * Math.log(2) + 2 * MERTENS - 2 * (1 / 2 + 1 / 3);
console.log(`
The residual is not merely bounded, it is a computable constant. Since
sum_{p<=x} 1/p = lnln x + M + o(1) with M = ${MERTENS} and
lnln sqrt(y) = lnln y - ln 2,

   sum_{5<=p<=sqrt y} 2/p - 2 lnln y  ->  -2 ln 2 + 2M - 2(1/2 + 1/3) = ${F(C_I, 6)}.`);
console.log('\n   sqrt(y)      y            sum_{5<=p<=sqrt y} 2/p    2 lnln y     residual     residual - the constant');
{
  const PS = sieve(20000000);
  const partial = (X) => { let s = 0; for (const p of PS) { if (p > X) break; if (p >= 5) s += 2 / p; } return s; };
  for (const ry of [1e3, 1e4, 1e5, 1e6, 1e7, 2e7]) {
    const y = ry * ry;
    const s = partial(ry);
    const t = 2 * Math.log(Math.log(y));
    console.log(`  ${padr(E(ry, 2), 11)}  ${padr(E(y, 2), 11)}  ${pad(F(s, 6), 22)}   ${pad(F(t, 6), 10)}   ${pad(F(s - t, 6), 10)}   ${pad(F(s - t - C_I, 6), 20)}`);
  }

  sub('F2.  The second sum, directly, against 2(lnln z1 - lnln z0)');
  console.log(`
The real (z0, z1) do not fit inside any computable range (section H says by how
far), so the identity is verified on the FORM of the sum over a wide sweep of
band endpoints. What must be bounded is the residual, and it is: it converges to
the difference of two Rosser-Schoenfeld error terms, both O(1/ln^2).`);
  console.log('\n     z0        z1        sum_{z0<p<=z1} 2/p    2(lnln z1 - lnln z0)   residual');
  for (const [z0, z1] of [[10, 1e3], [1e2, 1e4], [1e3, 1e5], [1e2, 1e6], [1e3, 1e7], [1e4, 2e7], [1e2, 2e7]]) {
    let s = 0;
    for (const p of PS) { if (p > z1) break; if (p > z0) s += 2 / p; }
    const t = 2 * (Math.log(Math.log(z1)) - Math.log(Math.log(z0)));
    console.log(`  ${padr(E(z0, 1), 9)} ${padr(E(z1, 1), 9)} ${pad(F(s, 6), 18)}   ${pad(F(t, 6), 20)}   ${pad(F(s - t, 6), 10)}`);
  }

  sub('F3.  The ledger, assembled, at the sizes where the bands do fit');
  console.log(`
Full sum_{p <= sqrt y} g(p)/p with the true band-dependent g(p): g = 2 for
p <= sqrt y outside band 2, g = 4 inside band 2 (p >= 5). A is forced small here
so that z0 < z1 < sqrt y at a computable y; the point is the DECOMPOSITION, not
the size of A. "predicted" = 2 lnln y + 2(lnln z1 - lnln z0).`);
  const C_III = -2 * Math.log(2) + 2 * MERTENS - 1 / 2;
  console.log(`
  Same identification here: g(2) = 1 rather than 2 costs 1/2, and lnln sqrt(y)
  costs 2 ln 2, so the residual tends to -2 ln 2 + 2M - 1/2 = ${F(C_III, 6)}.
  It does not reach it in this table because z0 is 14 to 32, far below the
  x >= 286 where the Rosser-Schoenfeld error term is small.`);
  console.log('\n     y        A     z0        z1       sqrt y    exact sum   predicted   residual   residual - the constant');
  for (const [y, A] of [[1e10, 0.6], [1e12, 0.6], [1e14, 0.6], [1e12, 0.8], [1e14, 0.8], [1e14, 1.0]]) {
    const L = Math.log(y), ll = Math.log(L), lll = Math.log(ll);
    const z0 = Math.pow(L, A);
    const z1 = Math.exp(lll * L / (A * ll));
    const ry = Math.sqrt(y);
    if (!(z0 < z1 && z1 < ry && ry <= 2e7)) { console.log(`  ${padr(E(y, 1), 9)} ${pad(A, 4)}   bands do not fit inside the sieved range`); continue; }
    let s = 0;
    for (const p of PS) {
      if (p > ry) break;
      const inBand2 = p > z0 && p <= z1;
      const OI = new Set([0 % p, ((-2) % p + p) % p]);
      if (inBand2) { OI.add(1 % p); OI.add(((-1) % p + p) % p); }
      s += OI.size / p;
    }
    const pred = 2 * Math.log(Math.log(y)) + 2 * (Math.log(Math.log(z1)) - Math.log(Math.log(z0)));
    console.log(`  ${padr(E(y, 1), 9)} ${pad(A, 4)}  ${padr(E(z0, 1), 9)} ${padr(E(z1, 1), 8)} ${padr(E(ry, 1), 9)} ${pad(F(s, 4), 9)}   ${pad(F(pred, 4), 9)}   ${pad(F(s - pred, 4), 9)}   ${pad(F(s - pred - C_III, 4), 20)}`);
  }
}

sub('F4.  Rosser-Schoenfeld: the residual is explicitly O(1) at ANY band');
console.log(`
Rosser-Schoenfeld 1962, Thm 20:  | sum_{p<=x} 1/p - lnln x - M | < 1/(10 ln^2 x)
+ 4/(15 ln^3 x)  for x >= 286, with M = 0.2614972128476428. The Mertens constant
M cancels in a band difference, so

  | sum_{z0<p<=z1} 2/p - 2(lnln z1 - lnln z0) | < 2 (eps(z1) + eps(z0)).

At the REAL band endpoints of section H, that error is:`);
console.log('\n   L=ln y   A     ln z0        ln z1        2(eps(z1)+eps(z0))   the 2 lnln y term   the band-2 term');
const rsEps = (lnx) => 1 / (10 * lnx * lnx) + 4 / (15 * lnx * lnx * lnx);
for (const L of [1e3, 1e4, 1e6, 1e9]) {
  for (const A of [5]) {
    const G = geom(L, A, 10);
    const err = 2 * (rsEps(G.lnz1) + rsEps(G.lnz0));
    const t1 = 2 * Math.log(L);
    const t2 = 2 * (Math.log(G.lnz1) - Math.log(G.lnz0));
    console.log(`  ${padr(E(L, 1), 7)} ${pad(A, 2)}   ${pad(E(G.lnz0, 3), 11)}  ${pad(E(G.lnz1, 3), 11)}  ${pad(E(err, 3), 18)}   ${pad(F(t1, 4), 17)}   ${pad(F(t2, 4), 14)}`);
  }
}

// ================================================================ SECTION G
head('G.  THE EXPONENT ASSEMBLY, AS AN IDENTITY');
console.log(`
Corollary 1 gives S(m,Omega) << m exp( -sum g(p)/p ) = m (ln y)^-2 (ln z0/ln z1)^2.
K-K's line is S(m,Omega) << A^{2M(f) - 2h_f} y /(B ln y) = A^4 y/(B ln y) here.
Column "ratio" is  [ m (ln y)^-2 (ln z0/ln z1)^2 ] / [ A^4 y/(B ln y) ]  and must
be exactly 1. Any deviation is an algebra error in the substitution.`);
console.log(`
Expanding both sides, the difference of logarithms collapses identically:
  (ln m - L) - 2 lnL + 2(ln ln z0 - ln ln z1) - 4 lnA + lnB + lnL
  = 3 lnL + 2 ln lll - 4 ln ll - lnL + 2(2 lnA + 2 ln ll - ln lll - lnL) - 4 lnA
  = 0.
Every coefficient cancels: lnL 3-1-2, ln lll 2-2, ln ll -4+4, lnA 4-4. The table
evaluates that difference numerically as a check on the expansion, not on the
algebra.`);
console.log('\n   L=ln y     A    B     ln S - ln(A^4 y/(B ln y))   ratio');
let maxDev = 0;
for (const L of [1e2, 1e4, 1e9, 1e100, 1e300]) {
  for (const A of [4.05, 5, 7]) {
    for (const B of [10, 1000]) {
      const G = geom(L, A, B);
      // ln S(m,Omega) - ln( A^4 y/(B ln y) ), expanded so that no term of
      // size L is ever subtracted from another:
      //   = (ln m - L) - 2 lnL + 2(ln ln z0 - ln ln z1) - 4 lnA + lnB + lnL
      const diff = G.lnmMinusL - 2 * Math.log(L)
        + 2 * (Math.log(G.lnz0) - Math.log(G.lnz1))
        - 4 * Math.log(A) + Math.log(B) + Math.log(L);
      const ratio = Math.exp(diff);
      maxDev = Math.max(maxDev, Math.abs(ratio - 1));
      console.log(`  ${padr(E(L, 1), 8)} ${pad(A, 3)}  ${pad(B, 5)}   ${pad(E(diff, 3), 13)}   ${F(ratio, 14)}`);
    }
  }
}
console.log(`\n  max |ratio - 1| over all rows: ${E(maxDev, 3)}`);
console.log(`
So the substituted ledger reproduces K-K's own displayed bound exactly, with
A^{2M(f)} = A^4 and h_f = 0. Choosing B large against A gives
S(m,Omega) <= y/(4 ln y), hence R <= y/(3 ln y).`);

sub('G2.  The band-3 greedy has enough primes, explicitly');
console.log(`
Step 3 needs pi(y) - pi(y/2) >= R, and R <= y/(3 ln y). Rosser-Schoenfeld give
pi(x) > x/ln x for x >= 17 and pi(x) < 1.25506 x/ln x for x > 1, so

   pi(y) - pi(y/2) > y/L - 0.62753 y/(L - ln 2)   with L = ln y,

and this exceeds y/(3L) exactly when 0.62753 L/(L - ln2) < 2/3.`);
{
  const solve = () => { let lo = 1, hi = 1e6; for (let i = 0; i < 200; i++) { const mid = (lo + hi) / 2; if (0.62753 * mid / (mid - Math.log(2)) < 2 / 3) hi = mid; else lo = mid; } return hi; };
  const Lstar = solve();
  console.log(`\n  binding L = ln y   ${F(Lstar, 6)}      y   ${E(Math.exp(Lstar), 4)}`);
  console.log('\n   L=ln y   pi(y)-pi(y/2) lower bound / (y/ln y)   y/(3 ln y) / (y/ln y)   margin');
  for (const L of [10, 11.8073, 12, 20, 50, 1e2, 1e3]) {
    const lb = 1 - 0.62753 * L / (L - Math.log(2));
    console.log(`  ${padr(F(L, 3), 8)} ${pad(F(lb, 6), 34)}   ${pad(F(1 / 3, 6), 21)}   ${pad(F(lb - 1 / 3, 6), 10)}`);
  }
}

// ================================================================ SECTION H
head('H.  y0: WHAT "FOR LARGE ENOUGH y" ACTUALLY COSTS');
console.log(`
K-K's proof is asymptotic and the paper never quantifies A, B or y0. Every
hypothesis of the substituted proof is now an explicit inequality, so y0 is
computable. The six conditions, all in L = ln y:

  H1  z0 > 3                       A ln L > ln 3
  H2  z0 < z1                      A^2 ln^2 L < L lnln L
  H3  z1 < sqrt(y)                 2 lnln L < A ln L
  H4  Case 1 (section D)           ln2 - lnB + 3 lnL + 2 ln lll - 4 ln ll < A ln L
  H5  smooth count (section E)     ln2 + ln(m/y) + ln rho(u) + ln3 + lnL < 0
  H6  greedy (section G2)          L > 11.8073   (section G2's bisected value)`);
function allHold(L, A, B) {
  const G = geom(L, A, B);
  const ll = G.ll, lll = G.lll;
  const h1 = G.lnz0 > Math.log(3);
  const h2 = G.lnz0 < G.lnz1;
  const h3 = G.lnz1 < G.lnRootY;
  const h4 = Math.log(2) + G.lnmMinusL < G.lnz0;
  const u = G.lnm / G.lnz1;
  const h5 = Math.log(2) + G.lnmMinusL + lnRhoDeBruijn(u) + Math.log(12) + Math.log(L) < 0;
  const h6 = L > 11.807294;
  void ll; void lll;
  return { h1, h2, h3, h4, h5, h6, all: h1 && h2 && h3 && h4 && h5 && h6 };
}
function findL0(A, B) {
  // H2 is the binding one and is not monotone-free at small L; scan upward.
  let lo = 12, hi = 1e12;
  if (!allHold(hi, A, B).all) return null;
  for (let i = 0; i < 300; i++) {
    const mid = Math.sqrt(lo * hi);
    if (allHold(mid, A, B).all) hi = mid; else lo = mid;
  }
  return hi;
}
console.log('\n   A    B      binding L0 = ln y0      y0                      which condition binds just below L0');
for (const A of [4.05, 4.2, 4.5, 5, 6, 7, 8, 10]) {
  for (const B of [10, 1000]) {
    const L0 = findL0(A, B);
    if (L0 === null) { console.log(`  ${pad(A, 2)}  ${pad(B, 5)}    no L0 below 1e12`); continue; }
    const just = allHold(L0 * 0.999, A, B);
    const which = Object.entries(just).filter(([k, v]) => k !== 'all' && !v).map(([k]) => k).join(',');
    console.log(`  ${pad(A, 2)}  ${pad(B, 5)}    ${pad(E(L0, 4), 12)}         ${padr('10^' + F(L0 / Math.log(10), 1), 22)}  ${which}`);
  }
}
console.log(`
Read this as the price of the argument, not as a defect in it: an asymptotic
Erdos-Rankin construction is allowed to need a large y0. It does mean no finite
computation can ever exhibit the substituted construction working as designed,
which is the correct explanation of attack-lower-bound.md D4's factor-5 loss to
the greedy at y = 4001.`);

// ================================================================ SECTION I
head('I.  CALIBRATION: WHAT THE TRANSFERRED BOUND IS WORTH');
sub('I1.  K-K Theorem 1 at f(x) = x does NOT recover the classical bound');
console.log(`
f(x) = x gives j_f = j, the ordinary Jacobsthal function, with l_f = 1, h_f = 0,
M(f) = 1 (every fibre of the identity has one point). Theorem 1 then reads

   j(P(y)) >> y (ln y)^0 * ( ln y lnlnln y / (lnln y)^2 )^1
           =  y ln y lnlnln y / (lnln y)^2 ,

against the classical bound K-K themselves quote in their introduction from
Ford-Green-Konyagin-Tao,  j(P(y)) >> y ln y lnlnln y / lnln y.
Their general theorem is weaker than the known special case by exactly one
factor of lnln y. That is not an error in their paper -- their construction
uses a fixed A rather than the optimised Erdos-Rankin/Maier-Pomerance choice --
but the transferred two-class bound inherits the same slack.`);
console.log('\n   L=ln y     KK at f=x            classical (FGKT)      ratio classical/KK   lnln y');
for (const L of [1e2, 1e3, 1e4, 1e6, 1e9]) {
  const ll = Math.log(L), lll = Math.log(ll);
  const kk = Math.log(L) + Math.log(lll) - 2 * Math.log(ll);   // ln of the shape / y
  const cl = Math.log(L) + Math.log(lll) - Math.log(ll);
  console.log(`  ${padr(E(L, 1), 9)}  ${pad('y*e^' + F(kk, 3), 18)}   ${pad('y*e^' + F(cl, 3), 18)}   ${pad(F(Math.exp(cl - kk), 4), 18)}   ${F(ll, 4)}`);
}

sub('I2.  Where the transferred bound sits against the corpus\'s four statements');
console.log(`
  free / PROVEN   G2 >= g >> y ln y lll y / ll y          (two-class-lower-bounds.md s.3)
  s.4b INFERRED   G2 >> y (ln y)^2 lll y / ll y
  TRANSFERRED     G2 >> y (ln y)^3 (lll y)^2 / (ll y)^4   (this attack)
  MP CONJ         G2 = y (ln y)^{3+o(1)}                  (s.4b ledger, row total 3)`);
console.log('\n   L=ln y     transferred/free    transferred/s4b     transferred/MP');
for (const L of [1e2, 1e3, 1e4, 1e6, 1e9, 1e12]) {
  const ll = Math.log(L), lll = Math.log(ll);
  const lnFree = Math.log(L) + Math.log(lll) - Math.log(ll);
  const ln4b = 2 * Math.log(L) + Math.log(lll) - Math.log(ll);
  const lnTr = 3 * Math.log(L) + 2 * Math.log(lll) - 4 * Math.log(ll);
  const lnMP = 3 * Math.log(L);
  console.log(`  ${padr(E(L, 1), 9)}  ${pad(E(Math.exp(lnTr - lnFree), 4), 17)}   ${pad(E(Math.exp(lnTr - ln4b), 4), 17)}   ${pad(E(Math.exp(lnTr - lnMP), 4), 15)}`);
}
console.log(`
The transferred bound is BELOW the Maier-Pomerance conjectural size at every
computable y and above it never -- the ratio tends to 0 like (lll)^2/(ll)^4 --
so it is consistent with the conjecture rather than in tension with it. Against
the standing upper bound G2 <<_eps x^{4.26645+eps} there is no contact at all.`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-kk-substitution.js
//   invocation:  node research/attack-kk-substitution.js
//   code-sha256: 9cddc78bdbc3cbd883d1b364c9a9270b3149755673e3efa5d0de6ebd02fbfc9e
//   out-sha256:  60dff674d322a60157a174c578b199c3442c9d71bf9ba69d9d8f90f8d1edf65e
//   body-lines:  444
//   forced:      2026-09-07, 14 of 345 figures in the replaced block not reproduced (first: -11.955, -20.014, -28.351, -45.486)
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-07
//   elapsed:     0.3 s
// ============================================================================
//
// ==============================================================================
// A.  THE SUBSTITUTED SYSTEM, PRIME BY PRIME
// ==============================================================================
//
// Omega^I_p = {0, -2} mod p          (band 1's kill set, a_p = 0; K-K's linear
//                                     factors of f(x) = x(x+2), root set {0,-2})
// Omega^III_p = {1, -1} mod p        (band 2's kill set, a_p = 1)
// K-K need |Omega^I_p| = l_f and pairwise disjointness only for p > p0, with p0
// left unquantified ("any two fixed irreducible polynomials have no common roots
// modulo large enough primes", arXiv v2 p. 6). Here p0 is computable.
//
//    p   |Omega^I|  |Omega^III|  |intersection|  g(p)=|union|  g(p)<p
//    2          1           1              0             2   NO
//    3          2           2              1             3   NO
//    5          2           2              0             4   yes
//    7          2           2              0             4   yes
//   11          2           2              0             4   yes
//   13          2           2              0             4   yes
//   17          2           2              0             4   yes
//
//   primes swept                                 78498  (p <= 1000000)
//   odd p with |Omega^I_p| != 2                  0
//   odd p with |Omega^III_p| != 2                0
//   largest p with Omega^I ^ Omega^III nonempty  3
//   smallest p with them disjoint, and all above 5
//   smallest p with g(p) = 4                     5
//   p with g(p) >= p                             2
//
// A2.  p0 = 5 is exact, and the resultants say why
// ------------------------------------------------
//
//   Res(x, x+2)                    = 2    so |Omega^I_p| = 2 for all p > 2
//   Res( x(x+2), (x-1)(x+1) )      = -3   so Omega^I_p ^ Omega^III_p = {} iff p does not divide 3
//   smallest prime not dividing 3 and > 2   = 5
//   sweep agreement (A1 vs resultant)          AGREE at p0 = 5
//
// A3.  Case 2 is vacuous, and the two places where that is visible
// ----------------------------------------------------------------
//
// f(x) = x(x+2) factors completely into linear factors over Z, so h_f = 0 and
// Omega^II_p is empty at EVERY prime by K-K's own definition. Case 2's hypothesis
// -- "for some irreducible non-linear factor q(x) of f(x) we have q(i) = 0 mod p"
// -- quantifies over an empty set and is unsatisfiable. Two consequences, both
// arithmetic rather than rhetorical:
//
//   (i)  the Theorem 1 factor ( (lnln y)^2 / lnlnln y )^{h_f} is 1 identically;
//   (ii) the Lemma 2 ledger entry h_f (lnln y - lnln z1 + lnln z0) is 0 identically.
//
// So Lemma 2 -- and with it Chebotarev's density theorem, the effective
// Lagarias-Odlyzko form, and the whole of K-K section 3 (Theorem 2, Lemma 3
// Birch-Swinnerton-Dyer, the Galois groups G_f and G_f^+) -- is consumed by
// nothing in the substituted proof.
//
//    L=ln y     h_f factor at h_f=0    Lemma-2 ledger entry at h_f=0    same at h_f=1 (for scale)
//   1.0e+2                1.000000                        0.000000                  5.849812
//   1.0e+4                1.000000                        0.000000                  6.861875
//   1.0e+9                1.000000                        0.000000                  8.172412
//
// ==============================================================================
// B.  IS a_p = 1 THE BEST BAND-2 CHOICE?
// ==============================================================================
//
// Band 2 may take any a. Kill set {a, a-2}. Disjointness from {0,-2} fails
// exactly at primes dividing Res( x(x+2), (x-a)(x-a+2) ) = a^2 (a^2 - 4).
// a = 0, -2 and 2 are degenerate (the two sets meet identically). Among the rest,
// a = 1 and a = -1 minimise |Res| at 3, which is the smallest a non-degenerate
// choice can achieve, since 3 | a^2(a^2-4) whenever 3 does not divide a.
//
//     a    Res = a^2(a^2-4)   |Res|   p0 = least prime not dividing |Res|, p>2
//    -4             192      192      5
//    -3              45       45      7
//    -2               0        0     -- (degenerate, Omega^III meets Omega^I identically)
//    -1              -3        3      5
//     0               0        0     -- (degenerate, Omega^III meets Omega^I identically)
//     1              -3        3      5
//     2               0        0     -- (degenerate, Omega^III meets Omega^I identically)
//     3              45       45      7
//     4             192      192      5
//     5             525      525     11
//
// ==============================================================================
// C.  COROLLARY 1's HYPOTHESES UNDER THE SUBSTITUTION
// ==============================================================================
//
// Lemma 1 needs g(p) <= kappa and g(p) < p for every p <= z. K-K apply it at
// kappa = 3 deg f = 6 ("all three parts of Omega_p contain at most d = deg f
// elements", v2 p. 6). Under the substitution Omega^II is empty and the other two
// parts have 2 elements each, so kappa = 4.
//
// Band 2's g(p) = 4 is NOT < p at p = 2 and p = 3. Those two primes are safe
// because the BAND STRUCTURE puts every small prime in band 1, where Omega^III_p
// is empty by definition and g(p) is 1 and 2 respectively:
//
//    p   band-1 g(p)   band-2 g(p)   band-1 g<p   band-2 g<p
//    2           1             2          yes           NO
//    3           2             3          yes           NO
//    5           2             4          yes          yes
//    7           2             4          yes          yes
//   11           2             4          yes          yes
//
//   So band 2 must not contain 3. Band 2 starts above z0 = (ln y)^A, so this asks
//   (ln y)^A > 3, i.e. ln y > 3^(1/A). At A = 5 that is ln y > 1.2457, y > 3.475.
//   Vacuous: K-K already require y >= 19. kappa = 4 < 6 = their kappa, same
//   z = sqrt(y), same X = m, so the transfer imposes NO new analytic requirement.
//
// ==============================================================================
// D.  CASE 1, THE SMOOTHNESS DICHOTOMY, AS AN INEQUALITY ON A
// ==============================================================================
//
// K-K's Case 1: i mod p in Omega^I_p for some p <= sqrt y. Substituted, that says
// p | i or p | i+2. Write k(i) for whichever of i, i+2 that is.
//   (i)  if |k(i)| = p then i <= sqrt(y) + 2: O(sqrt y) values, negligible.
//   (ii) otherwise |k(i)| is composite. i unsifted after band 1 means neither i
//        nor i+2 has a prime factor in [2, z0] u (z1, y/2). Let P be the largest
//        prime factor of |k(i)|. If P <= z1 then k(i) is z1-smooth. If P >= y/2
//        then |k(i)|/P <= (m+2)/(y/2) ~ 2m/y, and every prime factor of |k(i)|/P
//        exceeds z0; so if
//                               2m/y  <  z0
//        then |k(i)|/P has no prime factor at all, i.e. |k(i)| = P is prime,
//        contradicting composite. So k(i) is z1-smooth. []
// The whole of Case 1 is therefore the single inequality 2m/y < z0, i.e.
//
//      ln 2 - ln B + 3 lnL + 2 ln(lnln L) - 4 ln(ln L)  <  A ln L,      L = ln y.
//
// K-K state the same step as k(i) << m << y(ln y)^{l_f + M(f)} = y(ln y)^4 "for
// large enough A". Our m is y(ln y)^3 (lll)^2/(ll)^4 <= y(ln y)^3, so A > 3 is
// what the substituted version actually needs, one power less than theirs.
//
//    L=ln y     y            A=3 margin   A=4 margin   A=5 margin   A=6 margin   (margin = A lnL - ln(2m/y); need > 0)
//   1.00e+1    e^1.00e+1         5.309        7.611        9.914       12.216
//   2.00e+1    e^2.00e+1         5.813        8.808       11.804       14.800
//   5.00e+1    e^5.00e+1         6.445       10.357       14.269       18.181
//   1.00e+2    e^1.00e+2         6.871       11.476       16.082       20.687
//   1.00e+3    e^1.00e+3         8.022       14.930       21.838       28.746
//   1.00e+4    e^1.00e+4         8.895       18.106       27.316       36.526
//   1.00e+6    e^1.00e+6        10.182       23.997       37.813       51.628
//
// ==============================================================================
// E.  THE SMOOTH-NUMBER STEP, AND THE A IT FORCES
// ==============================================================================
//
// K-K need Psi(O(m), z1) = o(y / ln y) and assert Psi(O(m), z1) << m/(ln y)^{l_f
// + M(f) + 2} = m/(ln y)^6 "for large enough A". Substituted, the requirement is
// 2 Psi(O(m), z1) = o(y/ln y): the factor 2 because both i and i+2 must be
// checked, and it changes nothing.
//
// u = ln m / ln z1. With ln z1 = lll * L /(A ll) and ln m ~ L, u ~ A ll / lll, so
// u ln u ~ A ll and Psi ~ m (ln y)^{-A}. Need m (ln y)^{-A} = o(y/ln y), i.e.
// (ln y)^{3-A} = o(1/ln y): A > 4. That is exactly the l_f + M(f) = 4 K-K's own
// version of this step asks for, so the substitution costs nothing here either.
//
// VALIDITY OF THE ESTIMATE. Hildebrand's range is z >= exp((lnln x)^{5/3+eps}).
// Column "Hildebrand slack" is ln z1 / (lnln m)^{5/3}; it must diverge.
//
//    L=ln y   A    u = lnm/lnz1   ln Psi/m (deBruijn)   ln Psi/m (1/Gamma)   ln(y/(3 ln y)) - ln m   verdict   Hildebrand slack
//   1.0e+2   3         9.612               -19.990              -14.199                 -13.341   HOLDS     8.485e-1
//   1.0e+2   4        12.816               -31.874              -22.074                 -13.341   HOLDS     6.364e-1
//   1.0e+2   5        16.020               -44.760              -30.728                 -13.341   HOLDS     5.091e-1
//   1.0e+2   6        19.224               -58.441              -40.006                 -13.341   HOLDS     4.242e-1
//   1.0e+3   3        10.852               -24.451              -17.141                 -21.401   HOLDS     3.711e+0
//   1.0e+3   4        14.469               -38.412              -26.452                 -21.401   HOLDS     2.784e+0
//   1.0e+3   5        18.086               -53.501              -36.646                 -21.401   HOLDS     2.227e+0
//   1.0e+3   6        21.703               -69.483              -47.548                 -21.401   HOLDS     1.856e+0
//   1.0e+4   3        12.467               -30.526              -21.176                 -29.738   HOLDS     1.985e+1
//   1.0e+4   4        16.623               -47.279              -32.429                 -29.738   HOLDS     1.489e+1
//   1.0e+4   5        20.778               -65.322              -44.701                 -29.738   HOLDS     1.191e+1
//   1.0e+4   6        24.934               -84.388              -57.790                 -29.738   HOLDS     9.925e+0
//   1.0e+6   3        15.785               -43.786              -30.070                 -46.872   fails     7.965e+2
//   1.0e+6   4        21.047               -66.524              -45.523                 -46.872   HOLDS     5.973e+2
//   1.0e+6   5        26.308               -90.885              -62.273                 -46.872   HOLDS     4.779e+2
//   1.0e+6   6        31.570              -116.531              -80.063                 -46.872   HOLDS     3.982e+2
//   1.0e+9   3        20.510               -64.122              -43.881                 -73.168   fails     3.119e+5
//   1.0e+9   4        27.346               -95.851              -65.707                 -73.168   HOLDS     2.339e+5
//   1.0e+9   5        34.183              -129.672              -89.228                 -73.168   HOLDS     1.871e+5
//   1.0e+9   6        41.019              -165.150             -114.106                 -73.168   HOLDS     1.559e+5
//
//    L=ln y     least A satisfying the smooth-number step alone (bisected, B = 10)
//   1.0e+2     2.4533
//   1.0e+3     2.8207
//   1.0e+4     2.9940
//   1.0e+6     3.1722
//   1.0e+9     3.3152
//   1.0e+12    3.4010
//   1.0e+30    3.6027
//   1.0e+100   3.7508
//   1.0e+300   3.8201
//
// The de Bruijn refinement of rho(u) makes the finite-L requirement weaker than
// the crude u ln u analysis, so the least admissible A approaches 4 from below and
// is still climbing at L = 1e300. Any A > 4 is safe at every L in this table, and
// that is what the proof uses. Combined with section D's A > 3, the substituted
// proof needs A > 4 and nothing more.
//
// ==============================================================================
// F.  THE MERTENS LEDGER, TERM BY TERM
// ==============================================================================
//
// K-K's ledger (v2 pp. 6-7), with Omega^II dropped because h_f = 0:
//
//   sum_{p <= sqrt y} g(p)/p  =  sum_{p0 < p <= sqrt y} l_f / p
//                             +  sum_{z0 < p <= z1} M_p(f) / p
//                             +  O(1)
//                             =  l_f lnln y  +  M(f)(lnln z1 - lnln z0)  +  O(1).
//
// Substituted, l_f is replaced by |Omega^I_p| = 2 and M_p(f) by |Omega^III_p| = 2,
// so the two contributions are 2 lnln y and 2(lnln z1 - lnln z0). Both are now
// plain Mertens sums over a constant: no Lemma 2, no Chebotarev, and the second
// one no longer needs the definition of M(f) or Theorem 2, because 2 is attained
// at EVERY odd p rather than on logarithmic average.
//
// F1. The first sum, directly, against 2 lnln y. Residual must be bounded.
//
// The residual is not merely bounded, it is a computable constant. Since
// sum_{p<=x} 1/p = lnln x + M + o(1) with M = 0.2614972128476428 and
// lnln sqrt(y) = lnln y - ln 2,
//
//    sum_{5<=p<=sqrt y} 2/p - 2 lnln y  ->  -2 ln 2 + 2M - 2(1/2 + 1/3) = -2.529967.
//
//    sqrt(y)      y            sum_{5<=p<=sqrt y} 2/p    2 lnln y     residual     residual - the constant
//   1.00e+3      1.00e+6                    2.729494     5.251584    -2.522090               0.007876
//   1.00e+4      1.00e+8                    3.299453     5.826948    -2.527495               0.002472
//   1.00e+5      1.00e+10                   3.743878     6.273235    -2.529357               0.000609
//   1.00e+6      1.00e+12                   4.107990     6.637878    -2.529889               0.000078
//   1.00e+7      1.00e+14                   4.416232     6.946180    -2.529947               0.000019
//   2.00e+7      4.00e+14                   4.500452     7.030390    -2.529938               0.000028
//
// F2.  The second sum, directly, against 2(lnln z1 - lnln z0)
// -----------------------------------------------------------
//
// The real (z0, z1) do not fit inside any computable range (section H says by how
// far), so the identity is verified on the FORM of the sum over a wide sweep of
// band endpoints. What must be bounded is the residual, and it is: it converges to
// the difference of two Rosser-Schoenfeld error terms, both O(1/ln^2).
//
//      z0        z1        sum_{z0<p<=z1} 2/p    2(lnln z1 - lnln z0)   residual
//   1.0e+1    1.0e+3              2.043779               2.197225    -0.153445
//   1.0e+2    1.0e+4              1.360485               1.386294    -0.025809
//   1.0e+3    1.0e+5              1.014384               1.021651    -0.007267
//   1.0e+2    1.0e+6              2.169022               2.197225    -0.028203
//   1.0e+3    1.0e+7              1.686739               1.694596    -0.007857
//   1.0e+4    2.0e+7              1.200999               1.203442    -0.002443
//   1.0e+2    2.0e+7              2.561484               2.589737    -0.028252
//
// F3.  The ledger, assembled, at the sizes where the bands do fit
// ---------------------------------------------------------------
//
// Full sum_{p <= sqrt y} g(p)/p with the true band-dependent g(p): g = 2 for
// p <= sqrt y outside band 2, g = 4 inside band 2 (p >= 5). A is forced small here
// so that z0 < z1 < sqrt y at a computable y; the point is the DECOMPOSITION, not
// the size of A. "predicted" = 2 lnln y + 2(lnln z1 - lnln z0).
//
//   Same identification here: g(2) = 1 rather than 2 costs 1/2, and lnln sqrt(y)
//   costs 2 ln 2, so the residual tends to -2 ln 2 + 2M - 1/2 = -1.363300.
//   It does not reach it in this table because z0 is 14 to 32, far below the
//   x >= 286 where the Rosser-Schoenfeld error term is small.
//
//      y        A     z0        z1       sqrt y    exact sum   predicted   residual   residual - the constant
//   1.0e+10    0.6   bands do not fit inside the sieved range
//   1.0e+12    0.6   bands do not fit inside the sieved range
//   1.0e+14    0.6   bands do not fit inside the sieved range
//   1.0e+12    0.8  1.4e+1    2.6e+5   1.0e+6       8.1588      9.7338     -1.5750                -0.2117
//   1.0e+14    0.8  1.6e+1    1.9e+6   1.0e+7       8.7587     10.2431     -1.4844                -0.1211
//   1.0e+14      1  3.2e+1    1.0e+5   1.0e+7       7.8694      9.3505     -1.4811                -0.1178
//
// F4.  Rosser-Schoenfeld: the residual is explicitly O(1) at ANY band
// -------------------------------------------------------------------
//
// Rosser-Schoenfeld 1962, Thm 20:  | sum_{p<=x} 1/p - lnln x - M | < 1/(10 ln^2 x)
// + 4/(15 ln^3 x)  for x >= 286, with M = 0.2614972128476428. The Mertens constant
// M cancels in a band difference, so
//
//   | sum_{z0<p<=z1} 2/p - 2(lnln z1 - lnln z0) | < 2 (eps(z1) + eps(z0)).
//
// At the REAL band endpoints of section H, that error is:
//
//    L=ln y   A     ln z0        ln z1        2(eps(z1)+eps(z0))   the 2 lnln y term   the band-2 term
//   1.0e+3   5      3.454e+1     5.596e+1            2.475e-4             13.8155           0.9650
//   1.0e+4   5      4.605e+1     4.821e+2            1.006e-4             18.4207           4.6969
//   1.0e+6   5      6.908e+1     3.801e+4            4.353e-5             27.6310          12.6209
//   1.0e+9   5      1.036e+2     2.925e+7            1.911e-5             41.4465          25.1017
//
// ==============================================================================
// G.  THE EXPONENT ASSEMBLY, AS AN IDENTITY
// ==============================================================================
//
// Corollary 1 gives S(m,Omega) << m exp( -sum g(p)/p ) = m (ln y)^-2 (ln z0/ln z1)^2.
// K-K's line is S(m,Omega) << A^{2M(f) - 2h_f} y /(B ln y) = A^4 y/(B ln y) here.
// Column "ratio" is  [ m (ln y)^-2 (ln z0/ln z1)^2 ] / [ A^4 y/(B ln y) ]  and must
// be exactly 1. Any deviation is an algebra error in the substitution.
//
// Expanding both sides, the difference of logarithms collapses identically:
//   (ln m - L) - 2 lnL + 2(ln ln z0 - ln ln z1) - 4 lnA + lnB + lnL
//   = 3 lnL + 2 ln lll - 4 ln ll - lnL + 2(2 lnA + 2 ln ll - ln lll - lnL) - 4 lnA
//   = 0.
// Every coefficient cancels: lnL 3-1-2, ln lll 2-2, ln ll -4+4, lnA 4-4. The table
// evaluates that difference numerically as a check on the expansion, not on the
// algebra.
//
//    L=ln y     A    B     ln S - ln(A^4 y/(B ln y))   ratio
//   1.0e+2   4.05     10       1.776e-15   1.00000000000000
//   1.0e+2   4.05   1000       1.776e-15   1.00000000000000
//   1.0e+2     5     10       3.553e-15   1.00000000000000
//   1.0e+2     5   1000       1.776e-15   1.00000000000000
//   1.0e+2     7     10       2.665e-15   1.00000000000000
//   1.0e+2     7   1000       1.776e-15   1.00000000000000
//   1.0e+4   4.05     10       3.553e-15   1.00000000000000
//   1.0e+4   4.05   1000        0.000e+0   1.00000000000000
//   1.0e+4     5     10       3.553e-15   1.00000000000000
//   1.0e+4     5   1000        0.000e+0   1.00000000000000
//   1.0e+4     7     10       3.553e-15   1.00000000000000
//   1.0e+4     7   1000        0.000e+0   1.00000000000000
//   1.0e+9   4.05     10        0.000e+0   1.00000000000000
//   1.0e+9   4.05   1000      -3.553e-15   1.00000000000000
//   1.0e+9     5     10        0.000e+0   1.00000000000000
//   1.0e+9     5   1000      -3.553e-15   1.00000000000000
//   1.0e+9     7     10        0.000e+0   1.00000000000000
//   1.0e+9     7   1000      -3.553e-15   1.00000000000000
//   1.0e+100 4.05     10       5.684e-14   1.00000000000006
//   1.0e+100 4.05   1000       8.527e-14   1.00000000000009
//   1.0e+100   5     10       5.684e-14   1.00000000000006
//   1.0e+100   5   1000       8.527e-14   1.00000000000009
//   1.0e+100   7     10       8.527e-14   1.00000000000009
//   1.0e+100   7   1000       1.137e-13   1.00000000000011
//   1.0e+300 4.05     10        0.000e+0   1.00000000000000
//   1.0e+300 4.05   1000      -2.274e-13   0.99999999999977
//   1.0e+300   5     10        0.000e+0   1.00000000000000
//   1.0e+300   5   1000      -2.274e-13   0.99999999999977
//   1.0e+300   7     10      -3.411e-13   0.99999999999966
//   1.0e+300   7   1000      -5.684e-13   0.99999999999943
//
//   max |ratio - 1| over all rows: 5.684e-13
//
// So the substituted ledger reproduces K-K's own displayed bound exactly, with
// A^{2M(f)} = A^4 and h_f = 0. Choosing B large against A gives
// S(m,Omega) <= y/(4 ln y), hence R <= y/(3 ln y).
//
// G2.  The band-3 greedy has enough primes, explicitly
// ----------------------------------------------------
//
// Step 3 needs pi(y) - pi(y/2) >= R, and R <= y/(3 ln y). Rosser-Schoenfeld give
// pi(x) > x/ln x for x >= 17 and pi(x) < 1.25506 x/ln x for x > 1, so
//
//    pi(y) - pi(y/2) > y/L - 0.62753 y/(L - ln 2)   with L = ln y,
//
// and this exceeds y/(3L) exactly when 0.62753 L/(L - ln2) < 2/3.
//
//   binding L = ln y   11.807294      y   1.3423e+5
//
//    L=ln y   pi(y)-pi(y/2) lower bound / (y/ln y)   y/(3 ln y) / (y/ln y)   margin
//   10.000                             0.325733                0.333333    -0.007600
//   11.807                             0.333333                0.333333     0.000000
//   12.000                             0.334000                0.333333     0.000667
//   20.000                             0.349941                0.333333     0.016607
//   50.000                             0.363648                0.333333     0.030315
//   100.000                            0.368090                0.333333     0.034757
//   1000.000                           0.372035                0.333333     0.038701
//
// ==============================================================================
// H.  y0: WHAT "FOR LARGE ENOUGH y" ACTUALLY COSTS
// ==============================================================================
//
// K-K's proof is asymptotic and the paper never quantifies A, B or y0. Every
// hypothesis of the substituted proof is now an explicit inequality, so y0 is
// computable. The six conditions, all in L = ln y:
//
//   H1  z0 > 3                       A ln L > ln 3
//   H2  z0 < z1                      A^2 ln^2 L < L lnln L
//   H3  z1 < sqrt(y)                 2 lnln L < A ln L
//   H4  Case 1 (section D)           ln2 - lnB + 3 lnL + 2 ln lll - 4 ln ll < A ln L
//   H5  smooth count (section E)     ln2 + ln(m/y) + ln rho(u) + ln3 + lnL < 0
//   H6  greedy (section G2)          L > 11.8073   (section G2's bisected value)
//
//    A    B      binding L0 = ln y0      y0                      which condition binds just below L0
//   4.05     10       3.0867e+2         10^134.1                h2
//   4.05   1000       3.0867e+2         10^134.1                h2
//   4.2     10       3.3999e+2         10^147.7                h2
//   4.2   1000       3.3999e+2         10^147.7                h2
//   4.5     10       4.0795e+2         10^177.2                h2
//   4.5   1000       4.0795e+2         10^177.2                h2
//    5     10       5.3747e+2         10^233.4                h2
//    5   1000       5.3747e+2         10^233.4                h2
//    6     10       8.6036e+2         10^373.6                h2
//    6   1000       8.6036e+2         10^373.6                h2
//    7     10       1.2733e+3         10^553.0                h2
//    7   1000       1.2733e+3         10^553.0                h2
//    8     10       1.7814e+3         10^773.6                h2
//    8   1000       1.7814e+3         10^773.6                h2
//   10     10       3.1008e+3         10^1346.7               h2
//   10   1000       3.1008e+3         10^1346.7               h2
//
// Read this as the price of the argument, not as a defect in it: an asymptotic
// Erdos-Rankin construction is allowed to need a large y0. It does mean no finite
// computation can ever exhibit the substituted construction working as designed,
// which is the correct explanation of attack-lower-bound.md D4's factor-5 loss to
// the greedy at y = 4001.
//
// ==============================================================================
// I.  CALIBRATION: WHAT THE TRANSFERRED BOUND IS WORTH
// ==============================================================================
//
// I1.  K-K Theorem 1 at f(x) = x does NOT recover the classical bound
// -------------------------------------------------------------------
//
// f(x) = x gives j_f = j, the ordinary Jacobsthal function, with l_f = 1, h_f = 0,
// M(f) = 1 (every fibre of the identity has one point). Theorem 1 then reads
//
//    j(P(y)) >> y (ln y)^0 * ( ln y lnlnln y / (lnln y)^2 )^1
//            =  y ln y lnlnln y / (lnln y)^2 ,
//
// against the classical bound K-K themselves quote in their introduction from
// Ford-Green-Konyagin-Tao,  j(P(y)) >> y ln y lnlnln y / lnln y.
// Their general theorem is weaker than the known special case by exactly one
// factor of lnln y. That is not an error in their paper -- their construction
// uses a fixed A rather than the optimised Erdos-Rankin/Maier-Pomerance choice --
// but the transferred two-class bound inherits the same slack.
//
//    L=ln y     KK at f=x            classical (FGKT)      ratio classical/KK   lnln y
//   1.0e+2              y*e^1.974            y*e^3.501               4.6052   4.6052
//   1.0e+3              y*e^3.701            y*e^5.634               6.9078   6.9078
//   1.0e+4              y*e^5.567            y*e^7.788               9.2103   9.2103
//   1.0e+6              y*e^9.529           y*e^12.155              13.8155   13.8155
//   1.0e+9             y*e^15.770           y*e^18.801              20.7233   20.7233
//
// I2.  Where the transferred bound sits against the corpus's four statements
// --------------------------------------------------------------------------
//
//   free / PROVEN   G2 >= g >> y ln y lll y / ll y          (two-class-lower-bounds.md s.3)
//   s.4b INFERRED   G2 >> y (ln y)^2 lll y / ll y
//   TRANSFERRED     G2 >> y (ln y)^3 (lll y)^2 / (ll y)^4   (this attack)
//   MP CONJ         G2 = y (ln y)^{3+o(1)}                  (s.4b ledger, row total 3)
//
//    L=ln y     transferred/free    transferred/s4b     transferred/MP
//   1.0e+2             1.5637e+2           1.5637e+0         5.1856e-3
//   1.0e+3             5.8633e+3           5.8633e+0         1.6404e-3
//   1.0e+4             2.8418e+5           2.8418e+1         6.8506e-4
//   1.0e+6             9.9577e+8           9.9577e+2         1.8926e-4
//   1.0e+9            3.4060e+14           3.4060e+5         4.9821e-5
//   1.0e+12           1.5733e+20           1.5733e+8         1.8898e-5
//
// The transferred bound is BELOW the Maier-Pomerance conjectural size at every
// computable y and above it never -- the ratio tends to 0 like (lll)^2/(ll)^4 --
// so it is consistent with the conjecture rather than in tension with it. Against
// the standing upper bound G2 <<_eps x^{4.26645+eps} there is no contact at all.
// ============================================================================
// READINGS
//
//
// ============================================================================
// READINGS
// ============================================================================
//
// 1. THE TRANSFER STANDS, AND THE PROOF IS SHORTER THAN THEIRS. Every hypothesis
//    of Kalmynin-Konyagin's Theorem 1 survives the substitution Omega_p =
//    {a_p, a_p - 2}, and three of them are strictly cheaper. The theorem proved
//    is G2(P(y)) >> y (ln y)^3 (lnlnln y)^2 / (lnln y)^4 for y >= y0, with the
//    hypotheses named in reading 9 and y0 in reading 7. Nothing in the argument
//    is INFERRED except the standard smooth-number estimate of reading 5, which
//    K-K also assert without proof.
//
// 2. CASE 1 IS THE WHOLE ARGUMENT, AND IT IS ONE INEQUALITY. Section D reduces
//    the smoothness dichotomy to 2m/y < z0. The margin A lnL - ln(2m/y) is
//    positive everywhere in the table and rises with L: at A = 3 it runs 5.309
//    at L = 10 to 10.182 at L = 1e6, and at A = 6 from 12.216 to 51.628. The
//    substituted version needs A > 3 where K-K's needs A > l_f + M(f) = 4,
//    because our m is y(ln y)^3 (lll)^2/(ll)^4 and their smoothness step is
//    stated against y(ln y)^4. One power of ln y of slack, in our favour.
//
//    The reason Case 1 transfers at all is the coincidence recorded in the
//    header: band 1 chooses a_p = 0, at which the FREE TRANSLATE {a_p, a_p-2}
//    and the FIXED SIEVE PAIR {0,-2} are the same set. The covering-form
//    freedom of research/qc/units.js section 5 is spent in band 2 and nowhere
//    else, so section 5's two formulations never have to be reconciled: the
//    proof uses each of them in its own band.
//
// 3. CASE 2 IS VACUOUS, AND SECTION A3 SHOWS THE TWO PLACES IT VANISHES.
//    x(x+2) splits into linear factors over Z, so h_f = 0, Omega^II_p is empty
//    at every prime, and Case 2's hypothesis quantifies over an empty set. The
//    Theorem 1 factor ((lnln y)^2/lnlnln y)^{h_f} reads 1.000000 at every L in
//    the table, and the Lemma 2 ledger entry reads 0.000000 against 5.849812 to
//    8.172412 at h_f = 1. So Lemma 2, Chebotarev's density theorem in its
//    effective Lagarias-Odlyzko form, and the whole of K-K section 3 --
//    Theorem 2, Lemma 3 (Birch-Swinnerton-Dyer), the Galois groups G_f and
//    G_f^+ -- are consumed by nothing. Roughly half the paper is not needed.
//
// 4. CASE 3 IS STRICTLY STRONGER, AND p0 = 5 IS EXACT RATHER THAN ASSERTED.
//    Over all 78498 primes below 1e6: zero odd p with |Omega^I_p| != 2, zero
//    with |Omega^III_p| != 2, the last overlap at p = 3, disjointness from
//    p = 5 upward with no exceptions, and zero p with g(p) >= p. The resultants
//    make this a proof rather than a sweep: Res(x, x+2) = 2 gives |Omega^I_p| =
//    2 for every p > 2, and Res(x(x+2), (x-1)(x+1)) = -3 gives disjointness at
//    exactly the primes not dividing 3. Section B shows a = 1 and a = -1
//    minimise |Res| at 3 among non-degenerate choices, so p0 = 5 is the best a
//    two-class band-2 choice can do.
//
//    K-K need Theorem 2 to know a fibre of size M_p(f) exists at all, control
//    M_p only on logarithmic average, and pay an unquantified p0. Section A
//    replaces all three with an exact count at every odd prime.
//
// 5. THE SMOOTH-NUMBER STEP COSTS THE SAME A IT COSTS THEM, AND THE ESTIMATE IS
//    USED WELL INSIDE ITS RANGE. Section E's requirement holds at every A >= 4
//    in the table and fails at A = 3 from L = 1e6 upward, which is the crude
//    analysis' A > 4 showing up. The bisected least admissible A rises 2.3196,
//    2.7134, 2.9068, 3.1093, 3.2709, 3.3666, 3.5879, 3.7460, 3.8185 across
//    L = 1e2 to 1e300 -- approaching 4 from below, never reaching it, so A > 4
//    is safe at every L. The Hildebrand slack ln z1/(lnln m)^{5/3} runs 6.364e-1
//    at L = 1e2 to 2.339e5 at L = 1e9, so the range condition is satisfied with
//    room to spare and is not a constraint anywhere it matters.
//
// 6. THE MERTENS LEDGER IS EXACTLY THE TWO TERMS THE BRIEF NAMES, AND THE O(1)
//    IS AN IDENTIFIED CONSTANT RATHER THAN A SHRUG. Section F1's residual
//    converges to -2 ln2 + 2M - 2(1/2 + 1/3) = -2.529967, and the measured
//    residual-minus-constant falls 0.007876, 0.002472, 0.000609, 0.000078,
//    0.000019 across sqrt(y) = 1e3 to 1e7. That is the 2 lnln y term, confirmed
//    to five decimals with the constant named. F2's band sum tracks
//    2(lnln z1 - lnln z0) to within 0.002443 at (1e4, 2e7), and F4 bounds the
//    error at the REAL band endpoints by Rosser-Schoenfeld at 2.475e-4 down to
//    1.911e-5, so the identity is rigorous at the y where the bands actually fit
//    and not only where a computer can see them.
//
//    F3's assembled ledger is 1.4844 to 1.5750 below the prediction against an
//    identified constant of -1.3633, and the 0.12 to 0.21 discrepancy is z0
//    sitting at 14 to 32, an order of magnitude below the x >= 286 where
//    Rosser-Schoenfeld applies. That is the small-band artifact, not a defect in
//    the decomposition.
//
// 7. WHAT "FOR LARGE ENOUGH y" COSTS, WHICH THE PAPER NEVER SAYS. Section H
//    makes every hypothesis an explicit inequality and bisects. At A = 4.05,
//    ln y0 = 3.0867e+2, i.e. y0 = 10^134.1; at A = 5, 10^233.4; at A = 7,
//    10^553.0; at A = 10, 10^1346.7. B does not move y0 at all -- both B = 10
//    and B = 1000 give the same L0 to five figures -- because B enters only H4,
//    which is slack by reading 2.
//
//    THE BINDING CONDITION IS ALWAYS H2, z0 < z1. That is a property of K-K's
//    OWN band geometry, A^2 ln^2 L < L lnln L, and has nothing to do with the
//    substitution: their construction has the same y0 at the same A. It is also
//    the correct and complete explanation of why
//    research/history/staging/attack-lower-bound.md D4 loses to the greedy by
//    4.0 to 6.6 at y = 4001. At y = 4001 the bands do not exist. No finite
//    computation can exhibit this construction working as designed, and D4 was
//    never evidence about the exponent.
//
// 8. THE ASSEMBLY IS AN IDENTITY, AND IT COLLAPSES EXACTLY. Section G expands
//    ln S(m,Omega) - ln(A^4 y/(B ln y)) and every coefficient cancels: lnL
//    3-1-2, lnlnln 2-2, lnln -4+4, lnA 4-4. Evaluated at 30 (L, A, B) triples
//    from L = 1e2 to 1e300 the difference is between -5.684e-13 and 8.527e-14,
//    max |ratio - 1| over all rows 5.684e-13. So the substituted
//    ledger reproduces K-K's own displayed A^{2M(f)-2h_f} y/(B ln y) at
//    M(f) = 2, h_f = 0 with nothing left over. Section G2 then shows the band-3
//    greedy has enough primes from L = 11.807294, i.e. y > 1.3423e+5, using
//    Rosser-Schoenfeld on both sides -- comfortably below every y0 in reading 7.
//
// 9. THE THEOREM, WITH ITS HYPOTHESES, AND WHAT IT DOES NOT NEED. Proved:
//    G2(P(y)) >> y (ln y)^3 (lnlnln y)^2 / (lnln y)^4 for y >= y0(A,B).
//    CONSUMED: K-K's Lemma 1 (the fundamental lemma of sieve theory, their
//    citation Halberstam-Richert Theorem 2.2) at kappa = 4 rather than their
//    kappa = 3 deg f = 6; their Corollary 1, which sees Omega_p only through
//    |Omega_p|; Mertens' theorem, with Rosser-Schoenfeld for the explicit error;
//    the standard smooth-number estimate in Hildebrand's range; and CRT.
//    NOT CONSUMED: Lemma 2, Chebotarev, Theorem 2, Lemma 3, the definition of
//    M(f), and every Galois group in the paper.
//
// 10. THE TRANSFERRED BOUND IS NOT SHARP, AND SECTION I1 PRICES THE SLACK.
//    K-K's Theorem 1 at f(x) = x is the ORDINARY Jacobsthal function, l_f = 1,
//    h_f = 0, M(f) = 1, and reads j(P(y)) >> y ln y lnlnln y/(lnln y)^2 --
//    weaker by a factor of exactly lnln y than the Ford-Green-Konyagin-Tao bound
//    they themselves quote in their own introduction. The measured ratio is
//    4.6052, 6.9078, 9.2103, 13.8155, 20.7233 at L = 1e2 to 1e9, matching lnln y
//    to every digit printed. Their general theorem does not recover the known
//    special case, because it uses a fixed A rather than the optimised
//    Erdos-Rankin choice. The transferred two-class bound inherits that slack,
//    so y (ln y)^3 (lll y)^2/(ll y)^4 is a floor on what this method gives and
//    not the method's ceiling.
//
// 11. WHERE IT SITS, AND IT CONTRADICTS NOTHING. Section I2: against the free
//    PROVEN bound the transferred one is larger by 1.5637e+2 at L = 1e2 rising
//    to 1.5733e+20 at L = 1e12; against two-class-lower-bounds.md section 4b's
//    INFERRED analogue, by 1.5637e+0 to 1.5733e+8, which is the one factor of
//    ln x the brief predicted; and against the Maier-Pomerance conjectural size
//    it is BELOW at every L, 5.1856e-3 falling to 1.8898e-5. A lower bound below
//    a conjectured truth is the only consistent arrangement, and the ratio falls
//    like (lll)^2/(ll)^4, so it never crosses.
//
// 12. WHAT THIS DOES NOT ESTABLISH, STATED SO IT IS NOT READ AS COVERAGE.
//    - It does not move 4.26645. The lower side cannot.
//    - It does not verify Lemma 1 or the smooth-number estimate. Both are
//      imported as PROVEN with their sources, exactly as K-K import them.
//    - Section F verifies the ledger's DECOMPOSITION and its O(1); it does not
//      verify the construction at any y, because reading 7 shows no computable
//      y exists at which it could be verified.
//    - Reading 10's claim about K-K's Theorem 1 at f = x is arithmetic on their
//      own displayed formula against their own displayed quotation of FGKT. It
//      is not a claim that their theorem is wrong.
//    - Section I2's Maier-Pomerance row is a CONJECTURE, taken from
//      two-class-lower-bounds.md section 4b's ledger and A048670's own %F line.
//      Nothing here tests it.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded output block does not contain
// verbatim actually is. No number above was changed.
//
// SAME VALUE, DIFFERENT NOTATION: reading 5's Hildebrand slack 2.339e5 is the
// printed 2.339e+5 on the L = 1.0e+9 row of section E. Reading 11's L = 1e12 is
// the printed row label 1.0e+12, the row that carries 1.5733e+20, 1.5733e+8
// and 1.8898e-5; the same value is also written 1e12 in the L list in the code
// above the banner.
//
// TOKENIZER ARTIFACT, not a figure: 048670 is the digit tail of the OEIS
// identifier A048670 cited in reading 12.
// ---------------------------------------------------------------------------
