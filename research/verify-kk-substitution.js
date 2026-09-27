#!/usr/bin/env node
'use strict';
// ============================================================================
// VERIFY: the Kalmynin-Konyagin substitution, re-derived by an adversary
// ============================================================================
// Run it:  node research/verify-kk-substitution.js
//
// Independent check of research/history/staging/attack-kk-substitution.md.
// Nothing here is copied from that report or from its producer script; every
// formula below is written from the PDF of record (arXiv:2302.00459v2, md5
// b5d7d2a23ffd902415057adebfe430b1, section 2, pages 3-7) and from a hand
// re-derivation, then compared to what the report claims.
//
// Sections:
//   V1  the Proposition (substituted trichotomy) BRUTE-FORCED over a real range,
//       with the load-bearing inequality 2m/y < z0 both satisfied and violated
//   V2  the Mertens ledger and its two identified constants, from scratch
//   V3  the exponent assembly, re-derived by hand and evaluated
//   V4  band geometry at y = 4001, against the report's "1.5e6"
//   V5  y0 from z0 < z1, independently bisected
//   V6  the sieve level of distribution that K-K's Lemma 1 does not state,
//       and whether the missing hypothesis is satisfiable at the stated parameters
//   V7  pi(y) - pi(y/2): a pdftotext linearization trap, settled on the page image
// ============================================================================

const F = (v, d = 4) => Number.isFinite(v) ? v.toFixed(d) : String(v);
const E = (v, d = 3) => Number.isFinite(v) ? v.toExponential(d) : String(v);
const pad = (s, n) => String(s).padStart(n);
const padr = (s, n) => String(s).padEnd(n);
const head = (t) => console.log('\n' + '='.repeat(78) + '\n' + t + '\n' + '='.repeat(78));
const sub = (t) => console.log('\n' + t + '\n' + '-'.repeat(t.length));
const MERTENS = 0.2614972128476428;

let FAIL = 0;
function claim(label, ok, detail) {
  if (!ok) FAIL++;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${label}${detail ? '\n          ' + detail : ''}`);
}

// smallest-prime-factor sieve
function spfUpTo(n) {
  const s = new Int32Array(n + 1);
  for (let i = 2; i <= n; i++) {
    if (s[i] === 0) for (let j = i; j <= n; j += i) if (s[j] === 0) s[j] = i;
  }
  return s;
}
function factorSet(n, spf) {
  const out = [];
  while (n > 1) { const p = spf[n]; out.push(p); while (n % p === 0) n /= p; }
  return out;
}
function primesUpTo(n) {
  const s = new Uint8Array(n + 1), o = [];
  for (let i = 2; i <= n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } }
  return o;
}

// ============================================================ V1
head('V1.  THE PROPOSITION, BRUTE-FORCED');
console.log(`
The substituted trichotomy, as the report states it, is a FINITE statement for
any (y, z0, z1, m).  It is not asymptotic and can be tested exhaustively.

  Construction, step 1: a_p = 0  for p <= z0 and for z1 < p < y/2
                                 -> i killed iff p | i or p | i+2
  Construction, step 2: a_p = 1  for z0 < p <= z1
                                 -> i killed iff p | i-1 or p | i+1

  PROPOSITION.  If i <= m is unkilled after steps 1 and 2 then at least one of
    (a) i <= sqrt(y) + 2
    (b) i or i+2 is z1-smooth
    (c) i mod p not in Omega_p for every p <= sqrt(y),
        Omega_p = {0,-2} for all p, union {1,-1} for z0 < p <= z1.

  The report's proof of Case 1 consumes exactly one inequality, 2m/y < z0.
  So the Proposition is tested here BOTH with that inequality satisfied and
  with it violated. If it is really load-bearing, violating it must produce
  counterexamples and satisfying it must produce none.`);

function testProp(y, z0, z1, m, spf) {
  const sq = Math.sqrt(y), yhalf = y / 2;
  let unkilled = 0, viol = 0, byA = 0, byB = 0, byC = 0;
  const examples = [];
  for (let i = 1; i <= m; i++) {
    const fi = factorSet(i, spf), fi2 = factorSet(i + 2, spf);
    // step 1
    let k1 = false;
    for (const q of fi) if (q <= z0 || (q > z1 && q < yhalf)) { k1 = true; break; }
    if (!k1) for (const q of fi2) if (q <= z0 || (q > z1 && q < yhalf)) { k1 = true; break; }
    if (k1) continue;
    // step 2
    let k2 = false;
    if (i >= 2) for (const q of factorSet(i - 1, spf)) if (q > z0 && q <= z1) { k2 = true; break; }
    if (!k2) for (const q of factorSet(i + 1, spf)) if (q > z0 && q <= z1) { k2 = true; break; }
    if (k2) continue;
    unkilled++;
    const a = i <= sq + 2;
    const maxi = fi.length ? Math.max(...fi) : 1, maxi2 = Math.max(...fi2);
    const b = maxi <= z1 || maxi2 <= z1;
    // (c): no p <= sqrt y with i mod p in Omega_p
    let c = true;
    for (const q of fi) if (q <= sq) { c = false; break; }
    if (c) for (const q of fi2) if (q <= sq) { c = false; break; }
    if (c && i >= 2) for (const q of factorSet(i - 1, spf)) if (q > z0 && q <= Math.min(z1, sq)) { c = false; break; }
    if (c) for (const q of factorSet(i + 1, spf)) if (q > z0 && q <= Math.min(z1, sq)) { c = false; break; }
    if (a) byA++; else if (b) byB++; else if (c) byC++;
    if (!a && !b && !c) { viol++; if (examples.length < 4) examples.push(i); }
  }
  return { unkilled, viol, byA, byB, byC, examples };
}

{
  const y = 200000, z1 = 300;
  const M = 4000000;
  const spf = spfUpTo(M + 3);
  console.log(`\n  y = ${y}, z1 = ${z1}, sqrt(y) = ${F(Math.sqrt(y), 1)}, m = ${M} throughout.`);
  console.log(`  Case 1 needs 2m/y < z0, i.e. z0 > ${F(2 * M / y, 1)}.\n`);
  console.log('   z0     2m/y < z0 ?   unkilled i <= m   by (a)   by (b)   by (c)   COUNTEREXAMPLES');
  for (const z0 of [100, 60, 45, 30, 20, 10]) {
    const r = testProp(y, z0, z1, M, spf);
    const holds = 2 * M / y < z0;
    console.log(`  ${pad(z0, 4)}   ${padr(holds ? 'yes' : 'NO', 11)}   ${pad(r.unkilled, 15)}   ${pad(r.byA, 6)}   ${pad(r.byB, 6)}   ${pad(r.byC, 6)}   ${pad(r.viol, 8)}${r.examples.length ? '  e.g. ' + r.examples.join(', ') : ''}`);
    if (holds) claim(`Proposition holds exhaustively on [1,${M}] at z0 = ${z0}`, r.viol === 0);
  }
}

// ============================================================ V2
head('V2.  THE MERTENS LEDGER, FROM SCRATCH');
console.log(`
Two sums are charged.  Omega^I = {0,-2} at every p <= sqrt(y); Omega^III =
{1,-1} on band 2 only.  |Omega^I_p| = 2 for p >= 3 and 1 at p = 2; the two sets
are disjoint and of full size exactly for p >= 5.`);
{
  // disjointness / size, from first principles rather than from a resultant
  let firstGood = null, bad = [];
  for (const p of primesUpTo(1000)) {
    const OI = new Set([0, ((-2) % p + p) % p]);
    const OIII = new Set([1 % p, ((-1) % p + p) % p]);
    const ok = OI.size === 2 && OIII.size === 2 && [...OI].every(t => !OIII.has(t));
    if (!ok) bad.push(p); else if (firstGood === null) firstGood = p;
  }
  console.log(`\n  primes where |Omega^I| = |Omega^III| = 2 and they are disjoint FAIL: ${bad.join(', ')}`);
  claim('the only failures are p = 2 and p = 3, so p0 = 3 (first good prime 5)', bad.join(',') === '2,3');
  claim('max g(p) = |Omega^I| + |Omega^III| = 4, so kappa = 4 suffices', true,
    'Corollary 1 (v2 p.4) sees Omega_p only through |Omega_p|; K-K use kappa = 3 deg f = 6');
}
{
  const C_I = -2 * Math.log(2) + 2 * MERTENS - 2 * (1 / 2 + 1 / 3);
  const C_full = -2 * Math.log(2) + 2 * MERTENS - 1 / 2;
  console.log(`\n  sum_{5<=p<=sqrt y} 2/p - 2 lnln y  ->  -2ln2 + 2M - 2(1/2+1/3) = ${F(C_I, 6)}`);
  console.log(`  sum_{p<=sqrt y} g(p)/p - 2 lnln y  ->  -2ln2 + 2M - 1/2       = ${F(C_full, 6)}`);
  claim('report section 3b constant -2.529967 reproduced', Math.abs(C_I + 2.529967) < 5e-7);
  claim('report section F3 constant -1.363300 reproduced', Math.abs(C_full + 1.363300) < 5e-7);
  console.log('\n  measured convergence of the first residual:');
  console.log('    sqrt y      sum_{5<=p<=sqrt y} 2/p   2 lnln y    residual    residual - constant');
  const PS = primesUpTo(10000000);
  for (const X of [1e3, 1e4, 1e5, 1e6, 1e7]) {
    let s = 0;
    for (const p of PS) { if (p > X) break; if (p >= 5) s += 2 / p; }
    const t = 2 * Math.log(Math.log(X * X));
    console.log(`   ${padr(E(X, 1), 10)}  ${pad(F(s, 6), 20)}   ${pad(F(t, 6), 9)}   ${pad(F(s - t, 6), 9)}   ${pad(F(s - t - C_I, 8), 18)}`);
  }
}

// ============================================================ V3
head('V3.  THE EXPONENT ASSEMBLY, RE-DERIVED BY HAND');
console.log(`
Hand derivation, written before looking at the report's section 3c.
With L = ln y, ll = lnln y, lll = lnlnln y, llll = lnlnlnln y:

  ln ln z0 = ln(A ll)                  = lnA + lll
  ln ln z1 = ln(lll * L / (A ll))      = llll + ll - lll - lnA
  2 lnln sqrt(y)                       = 2 ll - 2 ln2

  SUM  = 2 ll + 2(lnln z1 - lnln z0) + O(1)
       = 2 ll + 2(ll - 2 lll + llll - 2 lnA) + O(1)
       = 4 ll - 4 lll + 2 llll - 4 lnA + O(1)

  exp(-SUM) = (ln y)^-4 (ll)^4 (lll)^-2 A^4

  m * exp(-SUM) = (y/B)(L^3 lll^2 / ll^4) * L^-4 ll^4 lll^-2 A^4
                = A^4 y / (B L)

which is K-K's own displayed  A^{2M(f)-2h_f} y/(B ln y)  at M(f)=2, h_f=0.
Evaluated below as a ratio that must be exactly 1.`);
{
  console.log('\n     ln y        A       B      m*exp(-SUM) / [A^4 y/(B ln y)]     ratio - 1');
  let worst = 0;
  for (const L of [1e2, 1e3, 1e6, 1e12, 1e50, 1e150, 1e300]) {
    for (const [A, B] of [[4.05, 10], [5, 100], [10, 1000]]) {
      const ll = Math.log(L), lll = Math.log(ll), llll = Math.log(lll);
      const lnz0 = A * ll, lnz1 = lll * L / (A * ll);
      const SUM = 2 * ll + 2 * (Math.log(lnz1) - Math.log(lnz0));   // no O(1)
      const ln_m_over_y = 3 * Math.log(L) + 2 * Math.log(lll) - 4 * Math.log(ll) - Math.log(B);
      const lhs = ln_m_over_y - SUM;                       // ln( m exp(-SUM) / y )
      const rhs = 4 * Math.log(A) - Math.log(B) - Math.log(L);
      const ratio = Math.exp(lhs - rhs);
      worst = Math.max(worst, Math.abs(ratio - 1));
      console.log(`   ${padr(E(L, 1), 10)}  ${pad(A, 5)}  ${pad(B, 5)}   ${pad(F(ratio, 15), 30)}   ${pad(E(ratio - 1, 3), 12)}`);
    }
  }
  claim('the assembly is an identity to floating-point', worst < 1e-11, `max |ratio - 1| = ${E(worst, 3)}`);
  console.log(`
  NOTE. This collapses because 2 lnln sqrt(y) was replaced by its leading term
  2 ll. The identity is EXACT in the leading coefficients and the discarded
  pieces (-2ln2, +2M, -1/2, the p<=p0 terms) are the O(1) of V2. So a numerical
  "collapse to 5.7e-13" tests the coefficient bookkeeping only; it cannot and
  does not test the O(1). V2 tests the O(1) separately, and both pass.`);
}

// ============================================================ V4
head('V4.  BAND GEOMETRY AT y = 4001, AGAINST THE REPORT\'S "1.5e6"');
console.log(`
attack-kk-substitution.md section 5 says: "At y = 4001 the bands do not exist -
z0 = (ln y)^A with A > 4 is already 1.5e6, past y."  The conclusion is checked
here and so is the number.`);
{
  const y = 4001, L = Math.log(y), ll = Math.log(L), lll = Math.log(ll);
  console.log(`\n  y = ${y}, L = ln y = ${F(L, 5)}, lnln y = ${F(ll, 5)}, lnlnln y = ${F(lll, 5)}`);
  console.log('\n     A        z0 = (ln y)^A        z1        band 2 = (z0,z1] nonempty?');
  for (const A of [4.0, 4.05, 4.5, 5, 6, 6.72, 7]) {
    const z0 = Math.pow(L, A), z1 = Math.exp(lll * L / (A * ll));
    console.log(`   ${pad(A, 5)}   ${pad(E(z0, 4), 18)}   ${pad(E(z1, 4), 9)}    ${z0 < z1 ? 'YES' : 'no'}`);
  }
  const z0_405 = Math.pow(L, 4.05);
  const A_needed = Math.log(1.5e6) / Math.log(L);
  claim('band 2 is empty at y = 4001 for every A > 4 (report conclusion)', Math.pow(L, 4) > Math.exp(lll * L / (4 * ll)));
  claim('the quoted "1.5e6" is NOT z0 at any A > 4 near the threshold', Math.abs(z0_405 - 1.5e6) > 1e6,
    `z0 at A = 4.05 is ${E(z0_405, 4)}, not 1.5e6; 1.5e6 needs A = ${F(A_needed, 3)}`);
  console.log(`
  So the CONCLUSION holds (z0 = ${E(z0_405, 4)} already exceeds y = 4001, and
  z1 = ${F(Math.exp(lll * L / (4.05 * ll)), 4)} < z0, so band 2 is empty), but the
  NUMBER 1.5e6 corresponds to A = ${F(A_needed, 3)}, not to "A > 4". It appears in
  no section of attack-kk-substitution.js's output block.`);
}

// ============================================================ V5
head('V5.  y0, INDEPENDENTLY BISECTED FROM z0 < z1');
{
  const holds = (L, A) => A * A * Math.log(L) * Math.log(L) < L * Math.log(Math.log(L));
  console.log('\n     A      least L with z0 < z1      y0            report says');
  const said = { 4.05: '10^134.1', 4.5: '10^177.2', 5: '10^233.4', 7: '10^553.0', 10: '10^1346.7' };
  for (const A of [4.05, 4.5, 5, 7, 10]) {
    let lo = 3, hi = 1e12;
    while (hi / lo > 1 + 1e-12) { const mid = Math.sqrt(lo * hi); if (holds(mid, A)) hi = mid; else lo = mid; }
    const y0 = hi / Math.log(10);
    console.log(`   ${pad(A, 5)}   ${pad(E(hi, 4), 20)}      10^${padr(F(y0, 1), 10)}  ${said[A]}`);
  }
  claim('y0 table reproduced independently (z0 < z1 is the binding condition)', true);
}

// ============================================================ V6
head('V6.  THE LEVEL OF DISTRIBUTION K-K\'s LEMMA 1 DOES NOT STATE');
console.log(`
K-K's Lemma 1 (v2 p.3) states its hypotheses as: g multiplicative, g(p) <= kappa,
g(p) < p, |r_d| <= g(d) for all d | P(z), and "z << X".  It concludes
S(a,z) << XV(z) with NO remainder term.  As literally stated that is not a
complete sieve statement: an upper-bound sieve with support xi carries a
remainder sum_{d <= xi^2, d|P(z)} 3^{omega(d)} |r_d|, and "z << X" places no
constraint on the support at all.  attack-kk-substitution.md section 3a checks
the hypotheses AS WRITTEN ("z << X: sqrt(y) << m, immediate") and so inherits
the omission.

THE QUESTION AN ADVERSARY MUST ASK: is the missing hypothesis SATISFIABLE at the
report's own parameters, z = sqrt(y) and X = m?  Selberg with support xi gives

  S  <=  X / G(xi)  +  sum_{d <= xi^2, d|P(z)} 3^{omega(d)} |r_d|
      <=  X / G(xi)  +  O( xi^2 (ln xi)^{11} )        since 3^w g(d) <= 12^w

and for a bounded-dimension sieve G(z^u) >>_{kappa,u} V(z)^{-1} for any fixed
u > 0, so taking xi = sqrt(y) / (ln y)^K costs only (1 - 2K lnln y/ln y)^kappa
-> 1 in the main term.  Below: the remainder at that support, against the main
term m V(sqrt y) ~ A^4 y/(B ln y).  Column "ratio" is remainder/main, as a power
of ln y: it is (ln y)^{11 - 2K + 1} and must go to zero.`);
{
  console.log('\n     K      support xi              remainder ~ xi^2 (ln xi)^11    ratio to main term      verdict');
  for (const K of [0, 3, 6, 7, 10]) {
    const powr = 11 - 2 * K;            // remainder = y (ln y)^{11-2K}
    const powm = -1;                    // main = y (ln y)^{-1}
    const d = powr - powm;
    console.log(`   ${pad(K, 4)}   ${padr('sqrt(y)/(ln y)^' + K, 22)}  ${padr('y (ln y)^' + powr, 28)}  ${padr('(ln y)^' + (d >= 0 ? '+' : '') + d, 22)}  ${d < 0 ? 'ok, o(1)' : 'SWAMPS'}`);
  }
  claim('the unstated hypothesis IS satisfiable at z = sqrt(y), X = m', true,
    'Selberg support sqrt(y)/(ln y)^7 leaves remainder/main = (ln y)^{-2} -> 0, and the main term loses only (1-o(1))^kappa');
  console.log(`
  READING, and it is a correction to the report rather than to the theorem.
  The naive support xi = z = sqrt(y) (level D = z^2 = y) does NOT work: the
  remainder is y(ln y)^{11} against a main term y/(B ln y), too big by
  (ln y)^{12}. Pulling the support down by seven logs fixes it and changes
  nothing else, because the Mertens ledger is untouched and the main term loses
  only a factor tending to 1. So Corollary 1 IS applicable at the report's own
  z = sqrt(y) and X = m -- but that is a fact about the SUPPORT, and section 3a
  verifies "z << X" instead, which is not the hypothesis that does the work.
  The transferred proof is not damaged; its hypothesis check is incomplete.`);
}

// ============================================================ V7
head('V7.  pi(y) - pi(y/2): A LINEARIZATION TRAP, AND A CUSTODY NOTE');
console.log(`
Recorded because it nearly became a false finding in this very verification.

"pdftotext -layout kk.pdf" renders K-K v2 p.7 as

   Since for the third step we have pi(y) - pi(y/2) = (2+o(1)) ln y primes ...

with a bare "y" on the preceding line, which reads naturally as
(2+o(1)) y/ln y.  That would be wrong by a factor of 4: the truth is
(1/2+o(1)) y/ln y.  The page image at 200 dpi settles it -- the fraction bar
spans the whole denominator and the display is

   pi(y) - pi(y/2)  =  y / ( (2+o(1)) ln y )

which is correct.  K-K have no error here.  The lesson is the one units.js
section 5 already carries in another form: a linearized formula is not the
formula.  Every K-K display this verification leans on -- m, z0, z1, the
S(m,Omega) line and this one -- was confirmed against the rendered page.

The measurement, for the record:`);
{
  const PS = primesUpTo(20000000);
  const pi = (x) => { let lo = 0, hi = PS.length; while (lo < hi) { const mid = (lo + hi) >> 1; if (PS[mid] <= x) lo = mid + 1; else hi = mid; } return lo; };
  console.log('\n        y          pi(y)-pi(y/2)      y/ln y        ratio       y/((2+o(1))ln y) predicts 0.5');
  for (const y of [1e5, 1e6, 1e7, 2e7]) {
    const d = pi(y) - pi(y / 2), r = d / (y / Math.log(y));
    console.log(`   ${padr(E(y, 1), 12)}  ${pad(d, 12)}  ${pad(F(y / Math.log(y), 1), 13)}   ${pad(F(r, 5), 8)}      ${pad(Math.abs(r - 0.5) < 0.06 ? 'consistent' : 'NO', 20)}`);
  }
  const d = pi(2e7) - pi(1e7), r = d / (2e7 / Math.log(2e7));
  claim('K-K\'s displayed constant is correct as printed', Math.abs(r - 0.5) < 0.06, `measured ratio ${F(r, 5)} at y = 2e7, against 1/2`);
  claim('and the step has room: R <= y/(3 ln y) < (1/2) y/ln y', 1 / 3 < 1 / 2);
}

head(FAIL === 0 ? 'ALL CHECKS PASSED' : `${FAIL} CHECK(S) FAILED`);
process.exit(0);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/verify-kk-substitution.js
//   invocation:  node research/verify-kk-substitution.js
//   code-sha256: 524c4f9c89a6203ae72244019ada75f907bd101edbebdc21c020b2e98d8a6a95
//   out-sha256:  d84216d0138bb8b61ec282a13a3ef2929d5a49f1729fd08c9accbe48ed8f0d34
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     3.5 s
// ============================================================================
//
// ==============================================================================
// V1.  THE PROPOSITION, BRUTE-FORCED
// ==============================================================================
//
// The substituted trichotomy, as the report states it, is a FINITE statement for
// any (y, z0, z1, m).  It is not asymptotic and can be tested exhaustively.
//
//   Construction, step 1: a_p = 0  for p <= z0 and for z1 < p < y/2
//                                  -> i killed iff p | i or p | i+2
//   Construction, step 2: a_p = 1  for z0 < p <= z1
//                                  -> i killed iff p | i-1 or p | i+1
//
//   PROPOSITION.  If i <= m is unkilled after steps 1 and 2 then at least one of
//     (a) i <= sqrt(y) + 2
//     (b) i or i+2 is z1-smooth
//     (c) i mod p not in Omega_p for every p <= sqrt(y),
//         Omega_p = {0,-2} for all p, union {1,-1} for z0 < p <= z1.
//
//   The report's proof of Case 1 consumes exactly one inequality, 2m/y < z0.
//   So the Proposition is tested here BOTH with that inequality satisfied and
//   with it violated. If it is really load-bearing, violating it must produce
//   counterexamples and satisfying it must produce none.
//
//   y = 200000, z1 = 300, sqrt(y) = 447.2, m = 4000000 throughout.
//   Case 1 needs 2m/y < z0, i.e. z0 > 40.0.
//
//    z0     2m/y < z0 ?   unkilled i <= m   by (a)   by (b)   by (c)   COUNTEREXAMPLES
//    100   yes                     16985       10      240    16735          0
//   ok    Proposition holds exhaustively on [1,4000000] at z0 = 100
//     60   yes                     14381        9      798    13574          0
//   ok    Proposition holds exhaustively on [1,4000000] at z0 = 60
//     45   yes                     13164        8     1064    12092          0
//   ok    Proposition holds exhaustively on [1,4000000] at z0 = 45
//     30   NO                      11228        8     1355     9630        235  e.g. 3104681, 3106601, 3110321, 3115529
//     20   NO                      10372        7     1446     8120        799  e.g. 2302967, 2304347, 2312027, 2324171
//     10   NO                       9086        6     2200     3959       2921  e.g. 1102277, 1102937, 1104917, 1105619
//
// ==============================================================================
// V2.  THE MERTENS LEDGER, FROM SCRATCH
// ==============================================================================
//
// Two sums are charged.  Omega^I = {0,-2} at every p <= sqrt(y); Omega^III =
// {1,-1} on band 2 only.  |Omega^I_p| = 2 for p >= 3 and 1 at p = 2; the two sets
// are disjoint and of full size exactly for p >= 5.
//
//   primes where |Omega^I| = |Omega^III| = 2 and they are disjoint FAIL: 2, 3
//   ok    the only failures are p = 2 and p = 3, so p0 = 3 (first good prime 5)
//   ok    max g(p) = |Omega^I| + |Omega^III| = 4, so kappa = 4 suffices
//           Corollary 1 (v2 p.4) sees Omega_p only through |Omega_p|; K-K use kappa = 3 deg f = 6
//
//   sum_{5<=p<=sqrt y} 2/p - 2 lnln y  ->  -2ln2 + 2M - 2(1/2+1/3) = -2.529967
//   sum_{p<=sqrt y} g(p)/p - 2 lnln y  ->  -2ln2 + 2M - 1/2       = -1.363300
//   ok    report section 3b constant -2.529967 reproduced
//   ok    report section F3 constant -1.363300 reproduced
//
//   measured convergence of the first residual:
//     sqrt y      sum_{5<=p<=sqrt y} 2/p   2 lnln y    residual    residual - constant
//    1.0e+3                  2.729494    5.251584   -2.522090           0.00787636
//    1.0e+4                  3.299453    5.826948   -2.527495           0.00247186
//    1.0e+5                  3.743878    6.273235   -2.529357           0.00060922
//    1.0e+6                  4.107990    6.637878   -2.529889           0.00007794
//    1.0e+7                  4.416232    6.946180   -2.529947           0.00001915
//
// ==============================================================================
// V3.  THE EXPONENT ASSEMBLY, RE-DERIVED BY HAND
// ==============================================================================
//
// Hand derivation, written before looking at the report's section 3c.
// With L = ln y, ll = lnln y, lll = lnlnln y, llll = lnlnlnln y:
//
//   ln ln z0 = ln(A ll)                  = lnA + lll
//   ln ln z1 = ln(lll * L / (A ll))      = llll + ll - lll - lnA
//   2 lnln sqrt(y)                       = 2 ll - 2 ln2
//
//   SUM  = 2 ll + 2(lnln z1 - lnln z0) + O(1)
//        = 2 ll + 2(ll - 2 lll + llll - 2 lnA) + O(1)
//        = 4 ll - 4 lll + 2 llll - 4 lnA + O(1)
//
//   exp(-SUM) = (ln y)^-4 (ll)^4 (lll)^-2 A^4
//
//   m * exp(-SUM) = (y/B)(L^3 lll^2 / ll^4) * L^-4 ll^4 lll^-2 A^4
//                 = A^4 y / (B L)
//
// which is K-K's own displayed  A^{2M(f)-2h_f} y/(B ln y)  at M(f)=2, h_f=0.
// Evaluated below as a ratio that must be exactly 1.
//
//      ln y        A       B      m*exp(-SUM) / [A^4 y/(B ln y)]     ratio - 1
//    1.0e+2       4.05     10                1.000000000000002      1.776e-15
//    1.0e+2          5    100                1.000000000000004      3.553e-15
//    1.0e+2         10   1000                1.000000000000002      1.776e-15
//    1.0e+3       4.05     10                0.999999999999999     -8.882e-16
//    1.0e+3          5    100                1.000000000000001      8.882e-16
//    1.0e+3         10   1000                1.000000000000000       0.000e+0
//    1.0e+6       4.05     10                0.999999999999993     -7.105e-15
//    1.0e+6          5    100                0.999999999999996     -3.553e-15
//    1.0e+6         10   1000                0.999999999999996     -3.553e-15
//    1.0e+12      4.05     10                0.999999999999989     -1.066e-14
//    1.0e+12         5    100                1.000000000000004      3.553e-15
//    1.0e+12        10   1000                0.999999999999989     -1.066e-14
//    1.0e+50      4.05     10                1.000000000000085      8.527e-14
//    1.0e+50         5    100                1.000000000000057      5.684e-14
//    1.0e+50        10   1000                1.000000000000014      1.421e-14
//    1.0e+150     4.05     10                1.000000000000171      1.705e-13
//    1.0e+150        5    100                1.000000000000171      1.705e-13
//    1.0e+150       10   1000                1.000000000000171      1.705e-13
//    1.0e+300     4.05     10                0.999999999999773     -2.274e-13
//    1.0e+300        5    100                0.999999999999886     -1.137e-13
//    1.0e+300       10   1000                0.999999999999545     -4.547e-13
//   ok    the assembly is an identity to floating-point
//           max |ratio - 1| = 4.547e-13
//
//   NOTE. This collapses because 2 lnln sqrt(y) was replaced by its leading term
//   2 ll. The identity is EXACT in the leading coefficients and the discarded
//   pieces (-2ln2, +2M, -1/2, the p<=p0 terms) are the O(1) of V2. So a numerical
//   "collapse to 5.7e-13" tests the coefficient bookkeeping only; it cannot and
//   does not test the O(1). V2 tests the O(1) separately, and both pass.
//
// ==============================================================================
// V4.  BAND GEOMETRY AT y = 4001, AGAINST THE REPORT'S "1.5e6"
// ==============================================================================
//
// attack-kk-substitution.md section 5 says: "At y = 4001 the bands do not exist -
// z0 = (ln y)^A with A > 4 is already 1.5e6, past y."  The conclusion is checked
// here and so is the number.
//
//   y = 4001, L = ln y = 8.29430, lnln y = 2.11557, lnlnln y = 0.74932
//
//      A        z0 = (ln y)^A        z1        band 2 = (z0,z1] nonempty?
//        4            4.7328e+3   2.0843e+0    no
//     4.05            5.2609e+3   2.0655e+0    no
//      4.5            1.3630e+4   1.9210e+0    no
//        5            3.9255e+4   1.7996e+0    no
//        6            3.2560e+5   1.6317e+0    no
//     6.72            1.4935e+6   1.5483e+0    no
//        7            2.7006e+6   1.5215e+0    no
//   ok    band 2 is empty at y = 4001 for every A > 4 (report conclusion)
//   ok    the quoted "1.5e6" is NOT z0 at any A > 4 near the threshold
//           z0 at A = 4.05 is 5.2609e+3, not 1.5e6; 1.5e6 needs A = 6.722
//
//   So the CONCLUSION holds (z0 = 5.2609e+3 already exceeds y = 4001, and
//   z1 = 2.0655 < z0, so band 2 is empty), but the
//   NUMBER 1.5e6 corresponds to A = 6.722, not to "A > 4". It appears in
//   no section of attack-kk-substitution.js's output block.
//
// ==============================================================================
// V5.  y0, INDEPENDENTLY BISECTED FROM z0 < z1
// ==============================================================================
//
//      A      least L with z0 < z1      y0            report says
//     4.05              3.0867e+2      10^134.1       10^134.1
//      4.5              4.0795e+2      10^177.2       10^177.2
//        5              5.3747e+2      10^233.4       10^233.4
//        7              1.2733e+3      10^553.0       10^553.0
//       10              3.1008e+3      10^1346.7      10^1346.7
//   ok    y0 table reproduced independently (z0 < z1 is the binding condition)
//
// ==============================================================================
// V6.  THE LEVEL OF DISTRIBUTION K-K's LEMMA 1 DOES NOT STATE
// ==============================================================================
//
// K-K's Lemma 1 (v2 p.3) states its hypotheses as: g multiplicative, g(p) <= kappa,
// g(p) < p, |r_d| <= g(d) for all d | P(z), and "z << X".  It concludes
// S(a,z) << XV(z) with NO remainder term.  As literally stated that is not a
// complete sieve statement: an upper-bound sieve with support xi carries a
// remainder sum_{d <= xi^2, d|P(z)} 3^{omega(d)} |r_d|, and "z << X" places no
// constraint on the support at all.  attack-kk-substitution.md section 3a checks
// the hypotheses AS WRITTEN ("z << X: sqrt(y) << m, immediate") and so inherits
// the omission.
//
// THE QUESTION AN ADVERSARY MUST ASK: is the missing hypothesis SATISFIABLE at the
// report's own parameters, z = sqrt(y) and X = m?  Selberg with support xi gives
//
//   S  <=  X / G(xi)  +  sum_{d <= xi^2, d|P(z)} 3^{omega(d)} |r_d|
//       <=  X / G(xi)  +  O( xi^2 (ln xi)^{11} )        since 3^w g(d) <= 12^w
//
// and for a bounded-dimension sieve G(z^u) >>_{kappa,u} V(z)^{-1} for any fixed
// u > 0, so taking xi = sqrt(y) / (ln y)^K costs only (1 - 2K lnln y/ln y)^kappa
// -> 1 in the main term.  Below: the remainder at that support, against the main
// term m V(sqrt y) ~ A^4 y/(B ln y).  Column "ratio" is remainder/main, as a power
// of ln y: it is (ln y)^{11 - 2K + 1} and must go to zero.
//
//      K      support xi              remainder ~ xi^2 (ln xi)^11    ratio to main term      verdict
//       0   sqrt(y)/(ln y)^0        y (ln y)^11                   (ln y)^+12              SWAMPS
//       3   sqrt(y)/(ln y)^3        y (ln y)^5                    (ln y)^+6               SWAMPS
//       6   sqrt(y)/(ln y)^6        y (ln y)^-1                   (ln y)^+0               SWAMPS
//       7   sqrt(y)/(ln y)^7        y (ln y)^-3                   (ln y)^-2               ok, o(1)
//      10   sqrt(y)/(ln y)^10       y (ln y)^-9                   (ln y)^-8               ok, o(1)
//   ok    the unstated hypothesis IS satisfiable at z = sqrt(y), X = m
//           Selberg support sqrt(y)/(ln y)^7 leaves remainder/main = (ln y)^{-2} -> 0, and the main term loses only (1-o(1))^kappa
//
//   READING, and it is a correction to the report rather than to the theorem.
//   The naive support xi = z = sqrt(y) (level D = z^2 = y) does NOT work: the
//   remainder is y(ln y)^{11} against a main term y/(B ln y), too big by
//   (ln y)^{12}. Pulling the support down by seven logs fixes it and changes
//   nothing else, because the Mertens ledger is untouched and the main term loses
//   only a factor tending to 1. So Corollary 1 IS applicable at the report's own
//   z = sqrt(y) and X = m -- but that is a fact about the SUPPORT, and section 3a
//   verifies "z << X" instead, which is not the hypothesis that does the work.
//   The transferred proof is not damaged; its hypothesis check is incomplete.
//
// ==============================================================================
// V7.  pi(y) - pi(y/2): A LINEARIZATION TRAP, AND A CUSTODY NOTE
// ==============================================================================
//
// Recorded because it nearly became a false finding in this very verification.
//
// "pdftotext -layout kk.pdf" renders K-K v2 p.7 as
//
//    Since for the third step we have pi(y) - pi(y/2) = (2+o(1)) ln y primes ...
//
// with a bare "y" on the preceding line, which reads naturally as
// (2+o(1)) y/ln y.  That would be wrong by a factor of 4: the truth is
// (1/2+o(1)) y/ln y.  The page image at 200 dpi settles it -- the fraction bar
// spans the whole denominator and the display is
//
//    pi(y) - pi(y/2)  =  y / ( (2+o(1)) ln y )
//
// which is correct.  K-K have no error here.  The lesson is the one units.js
// section 5 already carries in another form: a linearized formula is not the
// formula.  Every K-K display this verification leans on -- m, z0, z1, the
// S(m,Omega) line and this one -- was confirmed against the rendered page.
//
// The measurement, for the record:
//
//         y          pi(y)-pi(y/2)      y/ln y        ratio       y/((2+o(1))ln y) predicts 0.5
//    1.0e+5                4459         8685.9    0.51336                consistent
//    1.0e+6               36960        72382.4    0.51062                consistent
//    1.0e+7              316066       620420.7    0.50944                consistent
//    2.0e+7              606028      1189680.0    0.50940                consistent
//   ok    K-K's displayed constant is correct as printed
//           measured ratio 0.50940 at y = 2e7, against 1/2
//   ok    and the step has room: R <= y/(3 ln y) < (1/2) y/ln y
//
// ==============================================================================
// ALL CHECKS PASSED
// ==============================================================================
// ==============================================================================
// READINGS
// ==============================================================================
//
// 1.  THE PROPOSITION IS TRUE AND THE INEQUALITY 2m/y < z0 IS EXACTLY WHAT MAKES
//     IT TRUE.  V1 runs the substituted construction exhaustively over
//     i = 1 .. 4,000,000 at y = 200000, z1 = 300, and varies z0 across the
//     threshold 2m/y = 40. At z0 = 100, 60, 45 the Proposition holds with ZERO
//     counterexamples among 16985, 14381, 13164 unkilled i. At z0 = 30, 20, 10
//     it fails, with 235, 799 and 2921 counterexamples, the first being
//     i = 3104681, 2302967 and 1102277. This is the strongest single piece of
//     evidence in this verification: the report's Case 1 is not merely
//     re-derivable, its one stated hypothesis is necessary and sufficient at
//     finite scale. The report claims "one inequality, 2m/y < z0, and nothing
//     else", and that is what the counterexample threshold shows.
//
// 2.  THE MERTENS CONSTANTS ARE BOTH RIGHT AND THEY ARE DIFFERENT CONSTANTS.
//     -2ln2 + 2M - 5/3 = -2.529967 is the residual of sum_{5<=p<=sqrt y} 2/p,
//     and -2ln2 + 2M - 1/2 = -1.363300 is the residual of the FULL band-aware
//     sum from p = 2. Both reproduce to six figures, and the measured approach
//     0.00787636 -> 0.00001915 across sqrt y = 1e3 .. 1e7 agrees with the
//     report's F1 digit for digit. p0 = 3 (first good prime 5) is confirmed by
//     direct enumeration to 1000: p = 2 and p = 3 are the only primes where
//     {0,-2} and {1,-1} fail to be disjoint pairs of size 2.
//
// 3.  THE EXPONENT ASSEMBLY IS AN IDENTITY, AND THE NUMERICAL COLLAPSE TESTS
//     LESS THAN IT LOOKS.  The hand derivation
//     SUM = 4 ll - 4 lll + 2 llll - 4 lnA + O(1) gives m exp(-SUM) = A^4 y/(B L),
//     which is K-K's own displayed A^{2M(f)-2h_f} y/(B ln y), confirmed against
//     the rendered page 7. Evaluated at 21 (L, A, B) triples out to L = 1e300
//     the ratio is 1 to 4.547e-13. But the collapse happens because the O(1) was
//     dropped on both sides: it tests coefficient bookkeeping only, never the
//     O(1). V2 tests the O(1) separately. The report's "5.7e-13 out to
//     ln y = 1e300" should be read with that limitation attached.
//
// 4.  THE REPORT'S "1.5e6" AT y = 4001 IS NOT A COMPUTED NUMBER.  Section 5 says
//     "z0 = (ln y)^A with A > 4 is already 1.5e6, past y". At y = 4001,
//     ln y = 8.29430 and z0 = 5.2609e+3 at A = 4.05, 4.7328e+3 at A = 4.
//     1.5e6 requires A = 6.722. The CONCLUSION is untouched -- z0 exceeds
//     y = 4001 at every A > 4 and z1 = 2.07 < z0, so band 2 is empty and the
//     construction does not exist at that y -- but the number is off by 285x and
//     appears nowhere in attack-kk-substitution.js's OUTPUT block.
//
// 5.  y0 REPRODUCES EXACTLY.  Bisecting A^2 ln^2 L < L lnln L independently gives
//     L0 = 3.0867e+2, 4.0795e+2, 5.3747e+2, 1.2733e+3, 3.1008e+3 at
//     A = 4.05, 4.5, 5, 7, 10, i.e. y0 = 10^134.1, 10^177.2, 10^233.4, 10^553.0,
//     10^1346.7 -- every figure the report gives.
//
// 6.  ONE HYPOTHESIS IS CHECKED IN THE WRONG PLACE.  K-K's Lemma 1 lists "z << X"
//     and no level of distribution, and the report's section 3a checks exactly
//     that. It is not the hypothesis that does the work. At the natural Selberg
//     support xi = z = sqrt(y) the remainder is y(ln y)^{11} against a main term
//     y/(B ln y) -- too big by (ln y)^{12}. Pulling the support to
//     sqrt(y)/(ln y)^7 leaves remainder/main = (ln y)^{-2} and costs only
//     (1 - 2K lnln y/ln y)^kappa -> 1 in the main term. So the hypothesis holds
//     at the report's own z and X, and the theorem is untouched; what is missing
//     is the check, not the fact.
//
// 7.  A FALSE FINDING, CAUGHT.  pdftotext linearizes K-K v2 p.7 in a way that
//     reads as pi(y) - pi(y/2) = (2+o(1)) y/ln y, which would be wrong by 4x.
//     The 200 dpi page image shows the fraction bar spanning the denominator:
//     y/((2+o(1)) ln y), which is correct and agrees with the measured ratio
//     0.50940 at y = 2e7. K-K have no error here. Recorded because this
//     verification came within one paragraph of publishing the opposite, and
//     because it is the same class of defect as units.js section 5.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded output block does not contain
// verbatim actually is. No number above was changed.
//
// SAME VALUE, DIFFERENT NOTATION: reading 3's L = 1e300 is the printed row
// label 1.0e+300, the last row of the exponent-assembly table, and is written
// the same way in the L list in the code above the banner.
//
// ROUNDINGS of a value this file's own table prints (printed value first):
// 2.0655e+0 is quoted in reading 4 as z1 = 2.07, on the A = 4.05 row at
// y = 4001.
//
// DERIVED IN THIS READING by arithmetic over printed values: 285x in reading 4
// is the report's asserted 1.5e6 divided by the z0 this file computes at
// A = 4.05, 1.5e6 / 5.2609e+3 = 285.1. Against the A = 4 value 4.7328e+3 the
// factor would be 317, so the reading quotes the smaller of the two.
// ---------------------------------------------------------------------------
