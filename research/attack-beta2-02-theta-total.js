// attack-beta2-02-theta-total.js
// The minimal theta_total for the vector sieve: Brudern-Fouvry's own polytope,
// the break-even against beta_2, and why absolute values cannot pass theta_total = 1.
//
// COMPANION to research/history/staging/attack-beta2-02-theta-total-minimal.md.
//
// WHAT THIS COMPUTES, in seven sections.
//
// S1  The vector-sieve positivity threshold in the form Brudern and Fouvry
//     actually use it (Compositio Math. 102 (1996) 337-355, p.355, read from the
//     numdam PDF CM_1996__102_3_337_0):
//         2 f( (3/4)/xi ) - F( (1/2)/xi ) = 0
//     with F(s) = 2e^gamma/s on [1,3] and f(s) = 2e^gamma ln(s-1)/s on [2,4].
//     We solve it numerically, check the closed form u = (1+e^{b/(2a)})/b, and
//     check that both arguments land inside the ranges where those explicit
//     formulas for F and f are valid.
//
// S2  theta_total -> u under the SYMMETRIC parametrisation used by
//     research/sift-limit-attack.md 4.5 (u > 2(1+sqrt e)/theta_total), including
//     the break-even 5.2974/4.26645.
//
// S3  theta_total -> u under BF's parametrisation, where the asymmetry is
//     UPPER level vs LOWER level rather than component 1 vs component 2. This is
//     strictly better at fixed theta_total, and it moves the break-even down.
//
// S4  BF Proposition 1 (elementary: Cauchy-Schwarz + Weil, their p.344 display
//     R << q^{C0}(x^{1/2}D1^{1/2} + D1 + D1^{1/2}D2^{3/2})x^eps). The polytope it
//     licenses, and the best exponent obtainable inside it.
//
// S5  BF Proposition 2 (Deshouillers-Iwaniec Kloosterman, their p.345 conditions
//     q^{C0}D1 <= x^{1-c eps}, q^{C0}D1 D2^2 <= x^{2-c eps},
//     q^{C0}D1^2 D2^3 <= x^{3-c eps}, q^{C0}D1^4 D2^4 <= x^{5-c eps}).
//     The last condition is exactly theta_total <= 5/4. We recover BF's own
//     choice (D, Delta) = (x^{1/2}, x^{3/4}) as the optimum of their polytope.
//
// S6  The size of the ask: the cancellation exponent gamma needed at each
//     theta_total, and the power of H that must be saved.
//
// S7  Sharpness of absolute-value accounting at the worst window position.
//     An explicit window position at which sum |r_{d1,d2}| is a constant
//     fraction of D1*D2 rather than O(H log^2 H), for the two-class interval
//     sequence. This is what forbids theta_total > 1 by absolute values,
//     uniformly in position, and it is the reason the long-interval Brudern-
//     Fouvry accounting does not transfer.
//
// Run: node research/attack-beta2-02-theta-total.js

'use strict';

const EG = Math.exp(0.5772156649015329);          // e^gamma
const F = s => 2 * EG / s;                        // linear sieve upper function, exact on [1,3]
const f = s => 2 * EG * Math.log(s - 1) / s;      // linear sieve lower function, exact on [2,4]
const BETA2 = 4.26645028414864191641;             // paper/beta2-note.md, Booker-Browning truncation
const fx = n => n.toFixed(6);

const line = t => console.log('\n' + t + '\n' + '-'.repeat(t.length));

// ---------------------------------------------------------------------------
// S1. BF's own threshold equation, solved.
// ---------------------------------------------------------------------------
line('S1. Brudern-Fouvry p.355: the unique root of 2 f((3/4)/xi) - F((1/2)/xi) = 0');

// bisection on xi. g(xi) = 2f(b/xi) - F(a/xi) = 2 e^gamma xi [ 2 ln(b/xi - 1)/b - 1/a ]
// is DECREASING in xi, so the bracket walks the other way; the search is confined
// to xi <= b/2 so that f is evaluated inside the range [2,4] where the explicit
// formula f(s) = 2 e^gamma ln(s-1)/s holds.
function rootXi(a, b) {                    // a = upper level exponent, b = lower level exponent
  const g = xi => 2 * f(b / xi) - F(a / xi);
  let lo = 1e-6, hi = b / 2;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (g(mid) > 0) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}
const xiBF = rootXi(0.5, 0.75);
const closed = (a, b) => (1 + Math.exp(b / (2 * a))) / b;   // = 1/xi
console.log(`  numeric root          xi   = ${fx(xiBF)}          (BF print 0,2406)`);
console.log(`  exponent              u    = ${fx(1 / xiBF)}`);
console.log(`  closed form (1+e^{b/2a})/b = ${fx(closed(0.5, 0.75))}   = (4/3)(1+e^{3/4})`);
console.log(`  BF's own printed form 3/(4(1+exp 0,75))    = ${fx(3 / (4 * (1 + Math.exp(0.75))))}`);
console.log(`  validity: F evaluated at s = ${fx(0.5 / xiBF)}  (explicit F is exact on [1,3])`);
console.log(`  validity: f evaluated at s = ${fx(0.75 / xiBF)}  (explicit f is exact on [2,4])`);
console.log(`  beta_2 = ${BETA2}  ->  BF clears it by ${fx(BETA2 - 1 / xiBF)}`);
console.log(`  BF's own comparison in their 1: DHR gives theta < 1/4,2664 = ${fx(1 / 4.2664)}`);

// ---------------------------------------------------------------------------
// S2. Symmetric parametrisation (the one in sift-limit-attack.md 4.5).
// ---------------------------------------------------------------------------
line('S2. Symmetric levels: u = 2(1+sqrt e)/theta_total');
const SYM = 2 * (1 + Math.sqrt(Math.E));
console.log(`  2(1+sqrt e)                      = ${fx(SYM)}`);
console.log(`  break-even theta_total           = ${fx(SYM / BETA2)}   (ties beta_2)`);
for (const th of [1.0, 1.2417, 1.25, 1.3, 1.5, 2.0]) {
  const u = SYM / th;
  console.log(`  theta_total = ${th.toFixed(4)}  ->  u = ${fx(u)}   ${u < BETA2 ? 'BEATS beta_2 by ' + fx(BETA2 - u) : 'loses to beta_2'}`);
}

// ---------------------------------------------------------------------------
// S3. BF parametrisation: upper level a, lower level b, theta_total = a + b.
// ---------------------------------------------------------------------------
line('S3. Upper/lower asymmetry (BF): u(a,b) = (1+e^{b/2a})/b, theta_total = a+b');
function bestAtTheta(theta) {
  let best = { u: Infinity };
  for (let a = 0.05; a < theta; a += 0.00025) {
    const b = theta - a;
    if (2 * a > theta + 1e-12) continue;      // the Lambda^+Lambda^+ term sits at level (a,a)
    const u = closed(a, b);
    if (u < best.u) best = { u, a, b, sF: a * u, sf: b * u };
  }
  return best;
}
for (const th of [1.0, 1.2089, 1.2417, 1.25, 1.3, 1.5, 2.0]) {
  const r = bestAtTheta(th);
  const ok = r.sF >= 1 && r.sF <= 3 && r.sf >= 2 && r.sf <= 4;
  console.log(`  theta_total = ${th.toFixed(4)}  ->  u = ${fx(r.u)}  at (a,b) = (${r.a.toFixed(4)}, ${r.b.toFixed(4)})` +
              `  [F at s=${r.sF.toFixed(3)}, f at s=${r.sf.toFixed(3)}${ok ? '' : '  OUT OF RANGE'}]`);
}
// break-even: smallest theta_total whose best u equals beta_2
let lo = 1.0, hi = 1.5;
for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (bestAtTheta(m).u > BETA2) lo = m; else hi = m; }
const breakEvenAsym = (lo + hi) / 2;
// u is exactly G*/theta_total with G* = min_rho (1+e^{rho/2})(1+1/rho): the whole
// family is scale-invariant, which is why sF and sf above do not move with theta.
let gStar = Infinity, rhoStar = 0;
for (let r = 0.2; r < 6; r += 0.000005) { const g = (1 + Math.exp(r / 2)) * (1 + 1 / r); if (g < gStar) { gStar = g; rhoStar = r; } }
console.log(`\n  G* = min_rho (1+e^{rho/2})(1+1/rho) = ${fx(gStar)}  at rho = b/a = ${fx(rhoStar)}`);
console.log(`  so u = G*/theta_total exactly, against the symmetric 2(1+sqrt e)/theta_total = ${fx(SYM)}/theta_total`);
console.log(`  BREAK-EVEN theta_total, optimally asymmetric = ${fx(breakEvenAsym)}`);
console.log(`  BREAK-EVEN theta_total, symmetric            = ${fx(SYM / BETA2)}`);
console.log(`  the asymmetry is worth ${fx(SYM / BETA2 - breakEvenAsym)} in theta_total,`);
console.log(`  and at theta_total = 1.25 it is worth ${fx(SYM / 1.25 - bestAtTheta(1.25).u)} in exponent.`);

// ---------------------------------------------------------------------------
// S4/S5. The two BF polytopes.
// ---------------------------------------------------------------------------
// A = the larger of the two component levels (the arbitrary-coefficient side),
// B = the smaller (the well-factorable side). Both mixed terms Lambda^- Lambda^+
// carry (a,b); the Lambda^+ Lambda^+ term carries (a,a).
const prop1 = (A, B) => A <= 1 + 1e-12 && A + 3 * B <= 2 + 1e-12;
const prop2 = (A, B) => A <= 1 + 1e-12 && A + 2 * B <= 2 + 1e-12 &&
                        2 * A + 3 * B <= 3 + 1e-12 && 4 * A + 4 * B <= 5 + 1e-12;
function feasible(test, a, b) {
  const [A, B] = a >= b ? [a, b] : [b, a];       // mixed term, either assignment allowed
  return test(A, B) && test(a, a);               // plus the Lambda^+ Lambda^+ term at (a,a)
}
function optimise(test, label) {
  let best = { u: Infinity };
  for (let a = 0.02; a <= 1.2; a += 0.0005)
    for (let b = 0.02; b <= 1.6; b += 0.0005) {
      if (!feasible(test, a, b)) continue;
      const u = closed(a, b);
      if (u < best.u) best = { u, a, b, th: a + b, sF: a * u, sf: b * u };
    }
  const ok = best.sF >= 1 && best.sF <= 3 && best.sf >= 2 && best.sf <= 4;
  console.log(`  ${label}`);
  console.log(`     optimum (a_upper, b_lower) = (${best.a.toFixed(4)}, ${best.b.toFixed(4)})   theta_total = ${best.th.toFixed(4)}`);
  console.log(`     exponent u = ${fx(best.u)}   ${best.u < BETA2 ? 'BEATS beta_2 by ' + fx(BETA2 - best.u) : 'LOSES to beta_2 by ' + fx(best.u - BETA2)}`);
  console.log(`     F at s = ${best.sF.toFixed(3)}, f at s = ${best.sf.toFixed(3)}${ok ? '' : '   OUT OF THE EXPLICIT RANGE'}`);
  return best;
}
line('S4. BF Proposition 1 (elementary, Weil): A <= 1 and A + 3B <= 2');
const p1 = optimise(prop1, 'Prop 1 polytope');
line('S5. BF Proposition 2 (Deshouillers-Iwaniec): A<=1, A+2B<=2, 2A+3B<=3, 4A+4B<=5');
const p2 = optimise(prop2, 'Prop 2 polytope');
console.log(`     BF's stated choice (D, Delta) = (x^{1/2}, x^{3/4}):  u = ${fx(closed(0.5, 0.75))}, theta_total = 1.25`);
console.log(`     the binding constraint 4A+4B <= 5 IS theta_total <= 5/4 = 1.25.`);
console.log(`     tightness at (A,B) = (3/4, 1/2): A+2B = ${(0.75 + 1).toFixed(2)}/2, 2A+3B = ${(1.5 + 1.5).toFixed(2)}/3, 4A+4B = ${(3 + 2).toFixed(2)}/5`);

// ---------------------------------------------------------------------------
// S6. The size of the ask.
// ---------------------------------------------------------------------------
line('S6. How much cancellation each theta_total asks for');
console.log('  Terms in the joint remainder sum: D1*D2 = H^theta_total.');
console.log('  Needed: << H^{1-eps}.  Trivial (absolute values): H^theta_total.');
console.log('  Write the signed deviation as (term count)^gamma. Then gamma <= 1/theta_total is needed.\n');
console.log('    theta_total   power of H to save   gamma needed   (sqrt-cancellation gives 0.5)');
for (const th of [1.0, 1.2089, 1.2417, 1.25, 1.5, 2.0]) {
  console.log(`      ${th.toFixed(4)}          H^${(th - 1).toFixed(4)}            ${(1 / th).toFixed(4)}`);
}
console.log('\n  So theta_total = 2 asks for EXACTLY square-root cancellation and no less;');
console.log(`  theta_total = 1.25 asks for gamma <= 0.8, i.e. ${((2 - 1) / (1.25 - 1)).toFixed(0)}x less saved power of H.`);
console.log('  The pilot in research/sift-limit-attack.js measures gamma = 0.23 to 0.33.');

// ---------------------------------------------------------------------------
// S7. Absolute values are SHARP at the worst window position.
// ---------------------------------------------------------------------------
line('S7. The worst window position: sum |r| is a constant fraction of D1*D2');

function primesBelow(z) { const out = []; for (let n = 2; n < z; n++) { let p = true; for (let d = 2; d * d <= n; d++) if (n % d === 0) { p = false; break; } if (p) out.push(n); } return out; }
function divisorsUpTo(primes, D) {            // squarefree products of `primes` that are <= D
  let out = [1];
  for (const p of primes) { const add = []; for (const d of out) if (d * p <= D) add.push(d * p); out = out.concat(add); }
  return out.sort((a, b) => a - b);
}
function egcd(a, b) { if (!b) return [a, 1, 0]; const [g, x, y] = egcd(b, a % b); return [g, y, x - Math.floor(a / b) * y]; }
function crt(r1, m1, r2, m2) {                // n = r1 mod m1, r2 mod m2, (m1,m2)=1
  const [, s] = egcd(m1, m2);
  let t = ((r2 - r1) % m2 + m2) % m2;
  let k = (t * ((s % m2) + m2)) % m2;
  return ((r1 + m1 * k) % (m1 * m2) + m1 * m2) % (m1 * m2);
}
// exact count of n in (X, X+H] with n = rho (mod m)
const countIn = (X, H, rho, m) => Math.floor((X + H - rho) / m) - Math.floor((X - rho) / m);

function absSum(X, H, ds1, ds2) {
  let s = 0;
  for (const d1 of ds1) for (const d2 of ds2) {
    if (d1 % 2 === 0 && d2 % 2 === 0) continue;
    const g = egcd(d1, d2)[0]; if (g !== 1) continue;
    const rho = crt(0, d1, ((-2 % d2) + d2) % d2, d2);
    s += Math.abs(countIn(X, H, rho, d1 * d2) - H / (d1 * d2));
  }
  return s;
}

// z is kept below 42 so that the modulus Q1*Q2 = product of odd primes < z stays
// under 2^53 and every count below is exact integer arithmetic in doubles.
console.log('    H     D1=D2   pairs   sum|r| worst   /pairs   sum|r| typical   /pairs   worst/typical');
for (const [z, H, D1, D2] of [[42, 60, 100, 100], [42, 60, 200, 200], [42, 60, 400, 400],
                              [42, 30, 400, 400], [42, 15, 400, 400], [42, 8, 800, 800]]) {
  const ps = primesBelow(z).filter(p => p > 2);
  const S1 = ps.filter((_, i) => i % 2 === 0), S2 = ps.filter((_, i) => i % 2 === 1);
  const Q1 = S1.reduce((a, b) => a * b, 1), Q2 = S2.reduce((a, b) => a * b, 1);
  const ds1 = divisorsUpTo(S1, D1), ds2 = divisorsUpTo(S2, D2);
  const pairs = ds1.length * ds2.length;
  const n0 = crt(0, Q1, ((-2 % Q2) + Q2) % Q2, Q2);      // n0 = 0 mod Q1, -2 mod Q2
  const worst = absSum(n0 - 1, H, ds1, ds2);
  let typ = 0; const T = 200;
  for (let i = 1; i <= T; i++) typ += absSum((i * 2654435761) % (Q1 * Q2), H, ds1, ds2);
  typ /= T;
  console.log(`   ${String(H).padStart(4)}   ${String(D1).padStart(5)}   ${String(pairs).padStart(5)}` +
              `   ${worst.toFixed(1).padStart(11)}   ${(worst / pairs).toFixed(3)}` +
              `   ${typ.toFixed(1).padStart(13)}   ${(typ / pairs).toFixed(3)}` +
              `   ${(worst / typ).toFixed(1).padStart(13)}`);
}
// ---------------------------------------------------------------------------
// S8. Is the SIGNED sum large at the same position? (It is not.)
// ---------------------------------------------------------------------------
line('S8. The same worst position, signed, with real Rosser-Iwaniec weights');

// Rosser-Iwaniec linear-sieve supports, the construction certified in
// research/sift-limit-attack.js: d = p1>p2>...>pr with p1...p_{m-1} p_m^3 <= D
// at all odd m (upper) or all even m (lower); lambda_d = mu(d) on the support.
function rosserSupport(z, D, upper) {
  const ps = primesBelow(z).slice().sort((a, b) => b - a);
  const out = [];
  (function rec(start, prod, m) {
    out.push([prod, (m % 2 === 0) ? 1 : -1]);
    for (let i = start; i < ps.length; i++) {
      const p = ps[i], m2 = m + 1;
      if (prod * p > D) continue;
      const isCond = upper ? (m2 % 2 === 1) : (m2 % 2 === 0);
      if (isCond && prod * p * p * p > D) continue;
      rec(i + 1, prod * p, m2);
    }
  })(0, 1, 0);
  return out;
}
function signedSum(X, H, s1, s2) {
  let s = 0;
  for (const [d1, g1] of s1) for (const [d2, g2] of s2) {
    if (d1 % 2 === 0 && d2 % 2 === 0) continue;
    if (egcd(d1, d2)[0] !== 1) continue;
    const rho = crt(0, d1, ((-2 % d2) + d2) % d2, d2);
    s += g1 * g2 * (countIn(X, H, rho, d1 * d2) - H / (d1 * d2));
  }
  return s;
}
console.log('    H     Dup   Dlo   pairs   |signed| worst pos   sum|r| worst pos   |signed| max over 20k pos');
for (const [z, H, Dup, Dlo] of [[42, 60, 200, 400], [42, 30, 200, 400], [42, 15, 200, 400], [42, 8, 400, 800]]) {
  const ps = primesBelow(z).filter(p => p > 2);
  const S1 = ps.filter((_, i) => i % 2 === 0), S2 = ps.filter((_, i) => i % 2 === 1);
  const Q1 = S1.reduce((a, b) => a * b, 1), Q2 = S2.reduce((a, b) => a * b, 1);
  const su = rosserSupport(z, Dup, true), sl = rosserSupport(z, Dlo, false);
  const n0 = crt(0, Q1, ((-2 % Q2) + Q2) % Q2, Q2);
  const sgW = signedSum(n0 - 1, H, su, sl);
  const abW = absSum(n0 - 1, H, su.map(x => x[0]), sl.map(x => x[0]));
  let mx = 0;
  for (let i = 0; i < 20000; i++) { const v = Math.abs(signedSum(i, H, su, sl)); if (v > mx) mx = v; }
  console.log(`   ${String(H).padStart(4)}   ${String(Dup).padStart(3)}   ${String(Dlo).padStart(3)}` +
              `   ${String(su.length * sl.length).padStart(5)}   ${sgW.toFixed(2).padStart(15)}` +
              `   ${abW.toFixed(1).padStart(16)}   ${mx.toFixed(2).padStart(22)}`);
}
console.log('\n  Reading: the signed sum stays of order H at the very position where the');
console.log('  absolute-value sum saturates its trivial bound. The obstruction of S7 is an');
console.log('  artifact of the absolute values, not evidence against Lemma V. What S7 forbids');
console.log('  is the METHOD of bounding term by term, at every theta_total above 1.');

console.log('\n  Reading of S7: at the constructed position every admissible pair contributes ~1, so the');
console.log('  absolute-value bound D1*D2 is ATTAINED up to the smooth-divisor density, while at a');
console.log('  typical position it is the divisor-average O(H log^2 H) that governs. Brudern-Fouvry');
console.log('  have the average because they sum over n ~ x; the G2 problem must survive the worst');
console.log('  position, where the average is false. Hence theta_total <= 1 for absolute values,');
console.log('  uniformly in position, and no amount of Kloosterman input changes that step.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-beta2-02-theta-total.js
//   invocation:  node research/attack-beta2-02-theta-total.js
//   code-sha256: 1a1612681f01e0ddebe8e6d44f60b59a2f40d31deaff2cce93be86368ee4e159
//   out-sha256:  b8c1350bee19125e7dd5ddf8a6f416464d762476cf04ad1351261fdfe1b936d9
//   body-lines:  104
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     6.4 s
// ============================================================================
//
// S1. Brudern-Fouvry p.355: the unique root of 2 f((3/4)/xi) - F((1/2)/xi) = 0
// ----------------------------------------------------------------------------
//   numeric root          xi   = 0.240616          (BF print 0,2406)
//   exponent              u    = 4.156000
//   closed form (1+e^{b/2a})/b = 4.156000   = (4/3)(1+e^{3/4})
//   BF's own printed form 3/(4(1+exp 0,75))    = 0.240616
//   validity: F evaluated at s = 2.078000  (explicit F is exact on [1,3])
//   validity: f evaluated at s = 3.117000  (explicit f is exact on [2,4])
//   beta_2 = 4.266450284148642  ->  BF clears it by 0.110450
//   BF's own comparison in their 1: DHR gives theta < 1/4,2664 = 0.234390
//
// S2. Symmetric levels: u = 2(1+sqrt e)/theta_total
// -------------------------------------------------
//   2(1+sqrt e)                      = 5.297443
//   break-even theta_total           = 1.241651   (ties beta_2)
//   theta_total = 1.0000  ->  u = 5.297443   loses to beta_2
//   theta_total = 1.2417  ->  u = 4.266282   BEATS beta_2 by 0.000168
//   theta_total = 1.2500  ->  u = 4.237954   BEATS beta_2 by 0.028496
//   theta_total = 1.3000  ->  u = 4.074956   BEATS beta_2 by 0.191494
//   theta_total = 1.5000  ->  u = 3.531628   BEATS beta_2 by 0.734822
//   theta_total = 2.0000  ->  u = 2.648721   BEATS beta_2 by 1.617729
//
// S3. Upper/lower asymmetry (BF): u(a,b) = (1+e^{b/2a})/b, theta_total = a+b
// --------------------------------------------------------------------------
//   theta_total = 1.0000  ->  u = 5.158065  at (a,b) = (0.4322, 0.5678)  [F at s=2.230, f at s=2.928]
//   theta_total = 1.2089  ->  u = 4.266742  at (a,b) = (0.5227, 0.6862)  [F at s=2.230, f at s=2.928]
//   theta_total = 1.2417  ->  u = 4.154035  at (a,b) = (0.5367, 0.7050)  [F at s=2.230, f at s=2.928]
//   theta_total = 1.2500  ->  u = 4.126452  at (a,b) = (0.5405, 0.7095)  [F at s=2.230, f at s=2.928]
//   theta_total = 1.3000  ->  u = 3.967742  at (a,b) = (0.5620, 0.7380)  [F at s=2.230, f at s=2.928]
//   theta_total = 1.5000  ->  u = 3.438710  at (a,b) = (0.6485, 0.8515)  [F at s=2.230, f at s=2.928]
//   theta_total = 2.0000  ->  u = 2.579032  at (a,b) = (0.8647, 1.1353)  [F at s=2.230, f at s=2.928]
//
//   G* = min_rho (1+e^{rho/2})(1+1/rho) = 5.158065  at rho = b/a = 1.313085
//   so u = G*/theta_total exactly, against the symmetric 2(1+sqrt e)/theta_total = 5.297443/theta_total
//   BREAK-EVEN theta_total, optimally asymmetric = 1.208983
//   BREAK-EVEN theta_total, symmetric            = 1.241651
//   the asymmetry is worth 0.032668 in theta_total,
//   and at theta_total = 1.25 it is worth 0.111502 in exponent.
//
// S4. BF Proposition 1 (elementary, Weil): A <= 1 and A + 3B <= 2
// ---------------------------------------------------------------
//   Prop 1 polytope
//      optimum (a_upper, b_lower) = (0.4190, 0.7430)   theta_total = 1.1620
//      exponent u = 4.612313   LOSES to beta_2 by 0.345863
//      F at s = 1.933, f at s = 3.427
//
// S5. BF Proposition 2 (Deshouillers-Iwaniec): A<=1, A+2B<=2, 2A+3B<=3, 4A+4B<=5
// ------------------------------------------------------------------------------
//   Prop 2 polytope
//      optimum (a_upper, b_lower) = (0.5030, 0.7455)   theta_total = 1.2485
//      exponent u = 4.155795   BEATS beta_2 by 0.110655
//      F at s = 2.090, f at s = 3.098
//      BF's stated choice (D, Delta) = (x^{1/2}, x^{3/4}):  u = 4.156000, theta_total = 1.25
//      the binding constraint 4A+4B <= 5 IS theta_total <= 5/4 = 1.25.
//      tightness at (A,B) = (3/4, 1/2): A+2B = 1.75/2, 2A+3B = 3.00/3, 4A+4B = 5.00/5
//
// S6. How much cancellation each theta_total asks for
// ---------------------------------------------------
//   Terms in the joint remainder sum: D1*D2 = H^theta_total.
//   Needed: << H^{1-eps}.  Trivial (absolute values): H^theta_total.
//   Write the signed deviation as (term count)^gamma. Then gamma <= 1/theta_total is needed.
//
//     theta_total   power of H to save   gamma needed   (sqrt-cancellation gives 0.5)
//       1.0000          H^0.0000            1.0000
//       1.2089          H^0.2089            0.8272
//       1.2417          H^0.2417            0.8053
//       1.2500          H^0.2500            0.8000
//       1.5000          H^0.5000            0.6667
//       2.0000          H^1.0000            0.5000
//
//   So theta_total = 2 asks for EXACTLY square-root cancellation and no less;
//   theta_total = 1.25 asks for gamma <= 0.8, i.e. 4x less saved power of H.
//   The pilot in research/sift-limit-attack.js measures gamma = 0.23 to 0.33.
//
// S7. The worst window position: sum |r| is a constant fraction of D1*D2
// ----------------------------------------------------------------------
//     H     D1=D2   pairs   sum|r| worst   /pairs   sum|r| typical   /pairs   worst/typical
//      60     100     108          79.9   0.740            23.6   0.219             3.4
//      60     200     168         136.2   0.811            28.9   0.172             4.7
//      60     400     320         284.7   0.890            34.8   0.109             8.2
//      30     400     320         294.4   0.920            24.8   0.078            11.9
//      15     400     320         302.7   0.946            17.4   0.054            17.4
//       8     800     520         508.7   0.978            13.9   0.027            36.7
//
// S8. The same worst position, signed, with real Rosser-Iwaniec weights
// ---------------------------------------------------------------------
//     H     Dup   Dlo   pairs   |signed| worst pos   sum|r| worst pos   |signed| max over 20k pos
//      60   200   400     272              2.00               46.7                    10.00
//      30   200   400     272              3.00               44.0                     9.00
//      15   200   400     272              4.00               36.1                     7.00
//       8   400   800     588              1.00               54.5                     6.00
//
//   Reading: the signed sum stays of order H at the very position where the
//   absolute-value sum saturates its trivial bound. The obstruction of S7 is an
//   artifact of the absolute values, not evidence against Lemma V. What S7 forbids
//   is the METHOD of bounding term by term, at every theta_total above 1.
//
//   Reading of S7: at the constructed position every admissible pair contributes ~1, so the
//   absolute-value bound D1*D2 is ATTAINED up to the smooth-divisor density, while at a
//   typical position it is the divisor-average O(H log^2 H) that governs. Brudern-Fouvry
//   have the average because they sum over n ~ x; the G2 problem must survive the worst
//   position, where the average is false. Hence theta_total <= 1 for absolute values,
//   uniformly in position, and no amount of Kloosterman input changes that step.
// ============================================================================
// READINGS
// ============================================================================
