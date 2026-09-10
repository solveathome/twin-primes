#!/usr/bin/env node
'use strict';
// ============================================================================
// ATTACK BF-SPLIT — is Brudern-Fouvry's level split (D, Delta) = (x^{1/2},
// x^{3/4}) optimal for their OWN Proposition 2, or did they leave exponent on
// the table?
// ============================================================================
// THE CLAIM UNDER TEST. `research/history/staging/attack-theta-last-gap.md` §4
// records, as a small new result about a published theorem, that Brudern-Fouvry
// (Compositio Math. 102 (1996) 337-355) leave 0.0295482779 of exponent
// unclaimed, because "their side condition constrains only the PRODUCT D1 D2,
// so the split is free inside it", the condition quoted being
//
//     q^{C0} D1^4 D2^4 <= x^{5-c eps}                 [p.345, fourth]
//
// and it records one caveat, deliberately: their OTHER THREE side conditions
// were never checked for split-sensitivity. This script checks them.
//
// THE FOUR CONDITIONS, TRANSCRIBED FROM THE RENDERED PAGE IMAGE of numdam
// CM_1996__102_3_337_0, PDF page 10 = journal page 345, top of page, the four
// displays immediately after "des qu'on a les relations":
//
//     q^{C0} D1        <= x^{1-c eps}       (i)
//     q^{C0} D1 D2^2   <= x^{2-c eps}       (ii)
//     q^{C0} D1^2 D2^3 <= x^{3-c eps}       (iii)
//     q^{C0} D1^4 D2^4 <= x^{5-c eps}       (iv)
//
// ONLY (iv) IS A CONDITION ON THE PRODUCT. (i) is on D1 alone. (ii) and (iii)
// are asymmetric monomials that weight D2 more heavily than D1. The premise of
// the claimed gain is therefore false as stated, and sections A-D below settle
// whether anything survives.
//
// PROPOSITION 2 IS ALSO NOT SYMMETRIC IN ITS TWO SLOTS [p.344, statement]:
// "Soient lambda_1 de niveau D1 verifiant ||lambda_1||_inf <= 1 et lambda_2
// bien factorisable de niveau D2." Slot 2 must be WELL-FACTORABLE; slot 1 need
// not be. In BF's own application both weight systems happen to be well
// factorable [p.353, §3.4: "les fonctions ... sont bien factorisables de niveau
// D et Delta"], so BOTH slot assignments are open to them and both are tested
// here.
//
// BF'S LEVELS [p.353, §3.4, verbatim]: "On choisit alors D = x^{(1/2)-100c eps}
// q^{-C0} et Delta = x^{(3/4)-100c eps} q^{-C0}" and "D et Delta sont
// respectivement attaches aux fonctions psi^+ et psi^-". So the MAJORANT level
// is x^{1/2} and the MINORANT level is x^{3/4}.
//
// BF'S THRESHOLD [p.355, verbatim]: "0,2406 est strictement inferieur a
// 3/(4(1+exp 0,75)), qui est l'unique racine de l'equation en theta". With
// alpha = log_x(majorant level) and beta = log_x(minorant level), the linear
// sieve positivity 2 s+ ln(s- - 1) > s- with s+ = alpha/theta, s- = beta/theta
// reads
//
//     theta  <  beta / (1 + exp(beta / (2 alpha)))                        (*)
//
// and at (alpha,beta) = (1/2, 3/4) that is exactly 3/(4(1+exp(3/4))). The
// objective below IS (*), i.e. their own object in their own currency.
//
// SECTIONS.
//   A. The four conditions at BF's split, both slot assignments.
//   B. Are the STATED conditions the ones the PROOF needs? Exponent-exact
//      re-derivation from the max on p.348 after substituting their D2'.
//   C. D2' is a free parameter of the proof. Is BF's choice of it optimal?
//      Three-variable polytope, so the statement loses nothing to the proof.
//   D. Maximise (*) over the feasible polytope: exact vertex enumeration plus
//      an independent dense grid, both assignments, with and without the
//      (+,+) diagonal term's own level pair (D, D).
//   E. Attack C's re-split, located and tested against (i)-(iv).
//   F. Four independent levels (one majorant and one minorant per component),
//      with each of the three vector-sieve terms free to choose its own slot
//      assignment - the one thing the asymmetric polytope could reward.
//   G. What survives.
// ============================================================================

const EPS = 1e-15;
const fmt = (x, d = 10) => (Number.isFinite(x) ? x.toFixed(d) : String(x));

// ---------------------------------------------------------------- objective
// theta(alpha,beta) = beta / (1 + exp(beta/(2 alpha))).  alpha = majorant
// level exponent (base x), beta = minorant level exponent.
function theta(alpha, beta) {
  if (!(alpha > 0) || !(beta > 0)) return -Infinity;
  return beta / (1 + Math.exp(beta / (2 * alpha)));
}

// ------------------------------------------------- the four side conditions
// cond[k] = [c1, c2, rhs] meaning  c1*d1 + c2*d2 <= rhs   in log_x exponents.
const COND = [
  { name: '(i)   D1        <= x^1', c: [1, 0], rhs: 1 },
  { name: '(ii)  D1 D2^2   <= x^2', c: [1, 2], rhs: 2 },
  { name: '(iii) D1^2 D2^3 <= x^3', c: [2, 3], rhs: 3 },
  { name: '(iv)  D1^4 D2^4 <= x^5', c: [4, 4], rhs: 5 },
];

function slack(d1, d2) { return COND.map(k => k.rhs - (k.c[0] * d1 + k.c[1] * d2)); }
function condOK(d1, d2, tol = 1e-12) { return slack(d1, d2).every(s => s >= -tol); }
// a level PAIR {u,v} is usable if SOME slot assignment satisfies (i)-(iv)
function pairOK(u, v, tol = 1e-12) { return condOK(u, v, tol) || condOK(v, u, tol); }

// ============================================================================
console.log('='.repeat(78));
console.log('A. THE FOUR CONDITIONS AT BF\'S OWN SPLIT, BOTH SLOT ASSIGNMENTS');
console.log('='.repeat(78));
const ALPHA_BF = 0.5, BETA_BF = 0.75;   // majorant, minorant  [p.353]
console.log(`BF levels: majorant D = x^${ALPHA_BF} (psi+),  minorant Delta = x^${BETA_BF} (psi-)`);
console.log(`BF threshold theta = beta/(1+exp(beta/2alpha)) = ${fmt(theta(ALPHA_BF, BETA_BF))}`);
console.log(`their printed constant 3/(4(1+exp(3/4)))       = ${fmt(3 / (4 * (1 + Math.exp(0.75))))}`);
console.log(`1/theta                                        = ${fmt(1 / theta(ALPHA_BF, BETA_BF))}`);
console.log('');
for (const [tag, d1, d2] of [
  ['ASSIGNMENT A:  D1 = majorant x^0.5 , D2 = minorant x^0.75', ALPHA_BF, BETA_BF],
  ['ASSIGNMENT B:  D1 = minorant x^0.75, D2 = majorant x^0.5 ', BETA_BF, ALPHA_BF],
]) {
  console.log(tag);
  const s = slack(d1, d2);
  COND.forEach((k, i) => {
    const lhs = k.c[0] * d1 + k.c[1] * d2;
    console.log(`   ${k.name}   lhs=${fmt(lhs, 4)}  rhs=${k.rhs}   slack=${fmt(s[i], 4)}  ${s[i] >= -1e-12 ? (Math.abs(s[i]) < 1e-12 ? 'SATURATED' : 'ok') : '*** VIOLATED ***'}`);
  });
  console.log(`   verdict: ${condOK(d1, d2) ? 'FEASIBLE' : 'INFEASIBLE'}`);
  console.log('');
}

// ---------------------------------------------------------------------------
// A2. IS THE SLOT ASSIGNMENT EVEN FREE?  In Proposition 2, d1 divides the FIRST
// component and d2 the SECOND [p.337 (1.1), r(A,d) with d_i | a_i]. So the
// three vector-sieve terms have their slots FIXED by which component is which:
//     Lambda1^- Lambda2^+  ->  (D1,D2) = (minorant, majorant)  = assignment B
//     Lambda1^+ Lambda2^-  ->  (D1,D2) = (majorant, minorant)  = assignment A
//     Lambda1^+ Lambda2^+  ->  (D1,D2) = (majorant, majorant)
// Test all three at BF's own published levels:
console.log('A2. THE THREE VECTOR-SIEVE TERMS AT BF\'S LEVELS, SLOTS FIXED BY COMPONENT');
for (const [tag, d1, d2] of [
  ['L1^- L2^+   (D1,D2) = (x^0.75, x^0.5 )', BETA_BF, ALPHA_BF],
  ['L1^+ L2^-   (D1,D2) = (x^0.5 , x^0.75)', ALPHA_BF, BETA_BF],
  ['L1^+ L2^+   (D1,D2) = (x^0.5 , x^0.5 )', ALPHA_BF, ALPHA_BF],
]) {
  const s2 = slack(d1, d2);
  const bad = COND.map((k, i) => s2[i] < -1e-12 ? k.name.slice(0, 5) : null).filter(Boolean);
  console.log(`   ${tag}  ${condOK(d1, d2) ? 'FEASIBLE' : 'INFEASIBLE, fails ' + bad.join(',')}`);
}
console.log('   => BF\'s own published levels make the SECOND cross term infeasible if the');
console.log('      slots are read as fixed. The paper is correct, so the n <-> n+2 symmetry');
console.log('      of the sifted sequence (invoked explicitly at p.354, "la symetrie du');
console.log('      probleme") must be what puts the level-x^{3/4} weight in slot 1 for both');
console.log('      cross terms. Every optimisation below therefore allows the free choice');
console.log('      of slot for a level PAIR, which is the assumption most favourable to a');
console.log('      re-split, and it still yields the result in section G.');
console.log('');

// the (+,+) diagonal term of the vector sieve carries levels (D, D) [p.353]
console.log('THE (+,+) DIAGONAL TERM, levels (D,D) = (x^0.5, x^0.5)  [p.353]');
{
  const s = slack(ALPHA_BF, ALPHA_BF);
  COND.forEach((k, i) => console.log(`   ${k.name}   slack=${fmt(s[i], 4)}`));
  console.log(`   verdict: ${condOK(ALPHA_BF, ALPHA_BF) ? 'FEASIBLE' : 'INFEASIBLE'}`);
}

// ============================================================================
console.log('');
console.log('='.repeat(78));
console.log('B. ARE THE STATED CONDITIONS THE ONES THE PROOF NEEDS?');
console.log('='.repeat(78));
// p.348: "on a les conditions
//   q^{C0} max(D2 D2'', D1^{1/2} D2^{1/2} D2''^{3/2}, D1^{1/2} D2 D2''^{1/2}, D1) <= x^{1-20c eps}"
// and then "On fixe D2' = q^{-C0} D1^{-1} x^{1-10 eps} d'ou D2'' = q^{C0} D1 D2 x^{-1+10 eps}".
// So substitute log_x D2'' = d1 + d2 - 1 and read off.  Exponent vectors are
// [coef of d1, coef of d2, coef of 1].
const PROOF_TERMS = [
  { name: "D2 . D2''",                        d1: 0,   d2: 1, dpp: 1   },
  { name: "D1^{1/2} D2^{1/2} D2''^{3/2}",     d1: 0.5, d2: 0.5, dpp: 1.5 },
  { name: "D1^{1/2} D2 D2''^{1/2}",           d1: 0.5, d2: 1, dpp: 0.5 },
  { name: "D1",                               d1: 1,   d2: 0, dpp: 0   },
];
console.log("substituting  log_x D2'' = d1 + d2 - 1   (BF's choice of D2', p.348):");
console.log('');
const derived = [];
for (const t of PROOF_TERMS) {
  // term <= x^1  =>  (d1 + dpp) d1 + (d2 + dpp) d2 <= 1 + dpp
  const a = t.d1 + t.dpp, b = t.d2 + t.dpp, r = 1 + t.dpp;
  // normalise to integer coefficients
  let m = 1; while (![a * m, b * m, r * m].every(v => Math.abs(v - Math.round(v)) < 1e-9)) m++;
  const A = Math.round(a * m), B = Math.round(b * m), R = Math.round(r * m);
  derived.push([A, B, R]);
  console.log(`   ${t.name.padEnd(30)} ->  ${A}*d1 + ${B}*d2 <= ${R}   i.e.  D1^${A} D2^${B} <= x^${R}`);
}
console.log('');
const stated = COND.map(k => [k.c[0], k.c[1], k.rhs]);
// match derived against stated up to positive scaling
const matchOne = (v) => stated.findIndex(s => {
  const k = (s[2] !== 0 && v[2] !== 0) ? s[2] / v[2] : null;
  return k !== null && Math.abs(s[0] - k * v[0]) < 1e-9 && Math.abs(s[1] - k * v[1]) < 1e-9;
});
let allMatch = true;
derived.forEach((v, i) => {
  const j = matchOne(v);
  if (j < 0) allMatch = false;
  console.log(`   derived ${i + 1}  ->  stated ${j < 0 ? 'NO MATCH' : COND[j].name}`);
});
console.log('');
console.log(`   VERDICT: the four printed conditions are ${allMatch ? 'EXACTLY' : 'NOT'} the four terms`);
console.log('            of the p.348 max, rescaled. Nothing is stated loosely.');

// ============================================================================
console.log('');
console.log('='.repeat(78));
console.log("C. D2' IS FREE IN THE PROOF. IS BF'S CHOICE OF IT OPTIMAL?");
console.log('='.repeat(78));
// Before fixing D2', the proof needs, with s = log_x D2' and log_x D2'' = d2 - s:
//   (2.15)  d1 + s <= 1
//   (a) d2 + (d2-s) <= 1
//   (b) 0.5 d1 + 0.5 d2 + 1.5 (d2-s) <= 1
//   (c) 0.5 d1 + d2 + 0.5 (d2-s) <= 1
//   (d) d1 <= 1
// Every one of (a)-(d) is non-increasing in s, and (2.15) caps s at 1 - d1,
// so s = 1 - d1 dominates.  Verified numerically over a grid.
function feasible3(d1, d2, s, tol = 1e-12) {
  if (s < -tol || s > d2 + tol) return false;
  return (d1 + s <= 1 + tol)
    && (2 * d2 - s <= 1 + tol)
    && (0.5 * d1 + 2 * d2 - 1.5 * s <= 1 + tol)
    && (0.5 * d1 + 1.5 * d2 - 0.5 * s <= 1 + tol)
    && (d1 <= 1 + tol);
}
let counterexamples = 0, bestFree = -Infinity, bestFreePt = null;
const N3 = 260;
for (let i = 0; i <= N3; i++) {
  const d1 = 1.3 * i / N3;
  for (let j = 0; j <= N3; j++) {
    const d2 = 1.3 * j / N3;
    // best s is 1-d1 if that is in [0, d2]
    const sStar = Math.min(Math.max(1 - d1, 0), d2);
    const okStar = feasible3(d1, d2, sStar);
    for (let k = 0; k <= 60; k++) {
      const s = d2 * k / 60;
      if (feasible3(d1, d2, s) && !okStar) counterexamples++;
    }
    if (okStar) {
      // this (d1,d2) is reachable; record the best theta over BOTH slot readings
      for (const [al, be] of [[d1, d2], [d2, d1]]) {
        const t = theta(al, be);
        if (t > bestFree) { bestFree = t; bestFreePt = [al, be, d1, d2, sStar]; }
      }
    }
  }
}
console.log(`   grid ${N3 + 1}x${N3 + 1} over (d1,d2) in [0,1.3]^2, 61 values of s each`);
console.log(`   (d1,d2) feasible for SOME s but NOT for s = min(1-d1, d2):  ${counterexamples}`);
console.log(`   => BF's choice D2' = x/D1 is optimal; the printed conditions`);
console.log(`      lose nothing to the proof they came from.`);
console.log(`   best theta on this COARSE 3-var grid (step ${fmt(1.3 / N3, 5)}): ${fmt(bestFree)} at`);
console.log(`      (alpha,beta) = (${fmt(bestFreePt[0], 6)}, ${fmt(bestFreePt[1], 6)}), (d1,d2,s) = (${fmt(bestFreePt[2], 6)}, ${fmt(bestFreePt[3], 6)}, ${fmt(bestFreePt[4], 6)})`);
console.log(`   (the grid is too coarse to resolve the true optimum; section D does that)`);

// ============================================================================
console.log('');
console.log('='.repeat(78));
console.log('D. MAXIMISE THE BF THRESHOLD OVER THE FEASIBLE POLYTOPE');
console.log('='.repeat(78));

// The cross terms Lambda1^- Lambda2^+ and Lambda1^+ Lambda2^- both carry the
// level pair {alpha, beta}; the diagonal Lambda1^+ Lambda2^+ carries (alpha,
// alpha).  Two regimes are reported: with and without the diagonal, because
// the diagonal is a separate application of Prop 2 and a reader may want to
// see it isolated.
function feasiblePoint(alpha, beta, useDiagonal, assignment) {
  if (!(alpha > 0 && beta > 0)) return false;
  let crossOK;
  if (assignment === 'A') crossOK = condOK(alpha, beta);        // D1 = majorant
  else if (assignment === 'B') crossOK = condOK(beta, alpha);   // D1 = minorant
  else crossOK = pairOK(alpha, beta);                           // free choice
  if (!crossOK) return false;
  if (useDiagonal && !condOK(alpha, alpha)) return false;
  return true;
}

function gridMax(useDiagonal, assignment) {
  let lo = [0, 0], hi = [1.4, 1.4], best = { t: -Infinity, a: NaN, b: NaN };
  for (let pass = 0; pass < 7; pass++) {
    const N = 900;
    const ha = (hi[0] - lo[0]) / N, hb = (hi[1] - lo[1]) / N;
    let cur = { t: -Infinity, a: NaN, b: NaN };
    for (let i = 0; i <= N; i++) {
      const a = lo[0] + i * ha;
      for (let j = 0; j <= N; j++) {
        const b = lo[1] + j * hb;
        if (!feasiblePoint(a, b, useDiagonal, assignment)) continue;
        const t = theta(a, b);
        if (t > cur.t) cur = { t, a, b };
      }
    }
    if (cur.t > best.t) best = cur;
    lo = [Math.max(0, best.a - 3 * ha), Math.max(0, best.b - 3 * hb)];
    hi = [best.a + 3 * ha, best.b + 3 * hb];
  }
  return best;
}

// exact vertex enumeration of the cross-term polytope for a given assignment
function vertices(useDiagonal, assignment) {
  const lines = [];   // [c1, c2, rhs] in (alpha, beta)
  const push = (c1, c2, r) => lines.push([c1, c2, r]);
  for (const k of COND) {
    if (assignment === 'A') push(k.c[0], k.c[1], k.rhs);        // d1=alpha, d2=beta
    else push(k.c[1], k.c[0], k.rhs);                            // d1=beta,  d2=alpha
  }
  if (useDiagonal) for (const k of COND) push(k.c[0] + k.c[1], 0, k.rhs);
  push(-1, 0, 0); push(0, -1, 0);                                // alpha,beta >= 0
  const out = [];
  for (let i = 0; i < lines.length; i++) for (let j = i + 1; j < lines.length; j++) {
    const [a1, b1, r1] = lines[i], [a2, b2, r2] = lines[j];
    const det = a1 * b2 - a2 * b1;
    if (Math.abs(det) < 1e-12) continue;
    const a = (r1 * b2 - r2 * b1) / det, b = (a1 * r2 - a2 * r1) / det;
    if (a < -1e-9 || b < -1e-9) continue;
    if (!lines.every(([c1, c2, r]) => c1 * a + c2 * b <= r + 1e-9)) continue;
    out.push([a, b]);
  }
  return out;
}

for (const useDiag of [false, true]) {
  console.log(`--- ${useDiag ? 'WITH' : 'WITHOUT'} the (+,+) diagonal constraint (alpha,alpha) ---`);
  for (const asg of ['A', 'B', 'free']) {
    const g = gridMax(useDiag, asg);
    const lbl = asg === 'A' ? 'A (D1=majorant)' : asg === 'B' ? 'B (D1=minorant)' : 'free (best of A,B)';
    console.log(`  assignment ${lbl.padEnd(20)} max theta = ${fmt(g.t)}  at (alpha,beta) = (${fmt(g.a, 6)}, ${fmt(g.b, 6)})   1/theta = ${fmt(1 / g.t, 6)}`);
    if (asg !== 'free') {
      const vs = vertices(useDiag, asg).filter(([a, b]) => a > 1e-9 && b > 1e-9);
      let bv = { t: -Infinity };
      for (const [a, b] of vs) { const t = theta(a, b); if (t > bv.t) bv = { t, a, b }; }
      console.log(`     exact vertices (${vs.length}): best vertex theta = ${fmt(bv.t)} at (${fmt(bv.a, 6)}, ${fmt(bv.b, 6)})`);
      console.log(`     grid max minus vertex max = ${fmt(g.t - bv.t, 12)}`);
    }
  }
  console.log('');
}

// -- exact optimum on the binding edge, by bisecting the analytic derivative --
// Assignment B, edge (iii): 2*beta + 3*alpha = 3, so alpha = 1 - 2*beta/3.
// t = beta/(2 alpha) = 3 beta/(6 - 4 beta),  dt/dbeta = 18/(6-4beta)^2, and
// d(theta)/d(beta) = 0  <=>  1 + e^t = beta e^t * 18/(6-4beta)^2.
function edgeDeriv(beta) {
  const t = 3 * beta / (6 - 4 * beta);
  const et = Math.exp(t);
  return (1 + et) - beta * et * 18 / Math.pow(6 - 4 * beta, 2);
}
{
  let lo = 0.60, hi = 0.75;
  if (!(edgeDeriv(lo) > 0 && edgeDeriv(hi) < 0)) console.log('  [edge bracket failed]');
  for (let i = 0; i < 300; i++) { const m = (lo + hi) / 2; if (edgeDeriv(m) > 0) lo = m; else hi = m; }
  const bStar = (lo + hi) / 2, aStar = 1 - 2 * bStar / 3;
  const tStar = theta(aStar, bStar);
  console.log('--- EXACT OPTIMUM, assignment B, on the binding edge (iii) ---');
  console.log(`  d(theta)/d(beta) = 0 at beta* = ${fmt(bStar, 12)},  alpha* = ${fmt(aStar, 12)}`);
  console.log(`  theta* = ${fmt(tStar, 12)}    1/theta* = ${fmt(1 / tStar, 12)}`);
  console.log(`  d(theta)/d(beta) at BF's beta = 3/4 : ${fmt(edgeDeriv(0.75) / Math.pow(1 + Math.exp(0.75), 2), 12)}  (negative => BF's corner is not stationary)`);
  const sB = slack(bStar, aStar);
  COND.forEach((k, i) => console.log(`     ${k.name}  slack = ${fmt(sB[i], 14)}  ${Math.abs(sB[i]) < 1e-11 ? '<== BINDING' : ''}`));
  console.log(`     diagonal (alpha*,alpha*) feasible: ${condOK(aStar, aStar)}   tightest slack = ${fmt(Math.min(...slack(aStar, aStar)), 8)}`);
  console.log(`     s+ = alpha*/theta* = ${fmt(aStar / tStar, 8)} in [1,3]: ${aStar / tStar >= 1 && aStar / tStar <= 3}`);
  console.log(`     s- = beta* /theta* = ${fmt(bStar / tStar, 8)} in [2,4]: ${bStar / tStar >= 2 && bStar / tStar <= 4}`);
  console.log(`  gain over BF in theta   = ${fmt(tStar - theta(0.5, 0.75), 14)}`);
  console.log(`  gain over BF in 1/theta = ${fmt(1 / theta(0.5, 0.75) - 1 / tStar, 14)}`);
  console.log(`  BF print 4 decimals: theirs 0,${String(Math.floor(theta(0.5, 0.75) * 1e4)).padStart(4, '0')}  ours 0,${String(Math.floor(tStar * 1e4)).padStart(4, '0')}  -> ${Math.floor(theta(0.5, 0.75) * 1e4) === Math.floor(tStar * 1e4) ? 'UNCHANGED at their precision' : 'CHANGED'}`);
  global.__EXACT = { a: aStar, b: bStar, t: tStar };
}
console.log('');

// ============================================================================
console.log('='.repeat(78));
console.log("E. ATTACK C'S RE-SPLIT, LOCATED AND TESTED");
console.log('='.repeat(78));
// Attack C optimised theta subject to (iv) ALONE, i.e. alpha + beta <= 5/4.
let cBest = { t: -Infinity };
for (let i = 0; i <= 4000000; i++) {
  const a = 1.25 * i / 4000000, b = 1.25 - a;
  if (a <= 0 || b <= 0) continue;
  const t = theta(a, b);
  if (t > cBest.t) cBest = { t, a, b };
}
console.log(`  optimum of theta on the line alpha+beta = 5/4 (condition (iv) alone):`);
console.log(`     theta = ${fmt(cBest.t)}   1/theta = ${fmt(1 / cBest.t)}   at (alpha,beta) = (${fmt(cBest.a, 8)}, ${fmt(cBest.b, 8)})   beta/alpha = ${fmt(cBest.b / cBest.a, 10)}`);
console.log(`  BF's own point on that line: theta = ${fmt(theta(ALPHA_BF, BETA_BF))}, 1/theta = ${fmt(1 / theta(ALPHA_BF, BETA_BF))}`);
console.log(`  claimed gain in 1/theta currency: ${fmt(1 / theta(ALPHA_BF, BETA_BF) - 1 / cBest.t)}`);
console.log(`  claimed gain in theta  currency: ${fmt(cBest.t - theta(ALPHA_BF, BETA_BF))}`);
console.log('');
console.log(`  now test attack C's point against ALL FOUR conditions:`);
for (const [tag, d1, d2] of [
  ['assignment A (D1=majorant)', cBest.a, cBest.b],
  ['assignment B (D1=minorant)', cBest.b, cBest.a],
]) {
  console.log(`    ${tag}:`);
  const s = slack(d1, d2);
  COND.forEach((k, i) => console.log(`       ${k.name}  slack=${fmt(s[i], 8)}  ${s[i] >= -1e-12 ? 'ok' : '*** VIOLATED ***'}`));
}
console.log('');
console.log(`  the binding violation, assignment B (the only one BF can use):`);
{
  const d1 = cBest.b, d2 = cBest.a;
  const v = 2 * d1 + 3 * d2 - 3;
  console.log(`     (iii) 2*D1 + 3*D2 - 3 = ${fmt(v, 10)}  > 0, so D1^2 D2^3 = x^{3 + ${fmt(v, 6)}}`);
  console.log(`     i.e. the re-split overshoots condition (iii) by a factor x^${fmt(v, 6)}`);
}

// ============================================================================
console.log('');
console.log('='.repeat(78));
console.log('F. FOUR INDEPENDENT LEVELS, EACH TERM FREE TO CHOOSE ITS SLOT');
console.log('='.repeat(78));
// P = component-1 majorant, Q = component-1 minorant,
// R = component-2 majorant, T = component-2 minorant   (all log_x).
// Terms: L1- L2+ -> pair (Q,R);  L1+ L2- -> pair (P,T);  L1+ L2+ -> pair (P,R).
// Positivity (Rosser-Iwaniec F(s)=2e^g/s, f(s)=2e^g ln(s-1)/s), with
// p=P/th, q=Q/th, r=R/th, t=T/th:
//     p t ln(q-1) + q r ln(t-1) - q t  >  0.
// Validity ranges enforced: 1 <= p,r <= 3 and 2 <= q,t <= 4.
function thetaMax4(P, Q, R, T) {
  const g = (th) => {
    const q = Q / th, t = T / th;
    if (!(q > 1) || !(t > 1)) return -Infinity;
    return P * T * Math.log(q - 1) + Q * R * Math.log(t - 1) - Q * T;
  };
  let lo = 1e-6, hi = Math.min(Q, T) * (1 - 1e-12);
  if (g(lo) <= 0) return 0;
  for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (g(m) > 0) lo = m; else hi = m; }
  return lo;
}
function ok4(P, Q, R, T, th) {
  if (!(th > 0)) return false;
  const p = P / th, q = Q / th, r = R / th, t = T / th;
  if (!(p >= 1 - 1e-9 && p <= 3 + 1e-9)) return false;
  if (!(r >= 1 - 1e-9 && r <= 3 + 1e-9)) return false;
  if (!(q >= 2 - 1e-9 && q <= 4 + 1e-9)) return false;
  if (!(t >= 2 - 1e-9 && t <= 4 + 1e-9)) return false;
  return pairOK(Q, R) && pairOK(P, T) && pairOK(P, R);
}
// seeded LCG so the search is reproducible
let seed = 20260818 >>> 0;
const rnd = () => { seed = (1664525 * seed + 1013904223) >>> 0; return seed / 4294967296; };
let best4 = { t: -Infinity };
const STARTS = 3000;
for (let s0 = 0; s0 < STARTS; s0++) {
  let x = [0.2 + 1.1 * rnd(), 0.2 + 1.1 * rnd(), 0.2 + 1.1 * rnd(), 0.2 + 1.1 * rnd()];
  let step = 0.12;
  let cur = -Infinity;
  { const th = thetaMax4(...x); if (ok4(...x, th)) cur = th; }
  for (let it = 0; it < 4000; it++) {
    const y = x.map(v => Math.max(1e-6, v + step * (rnd() * 2 - 1)));
    const th = thetaMax4(...y);
    if (ok4(...y, th) && th > cur) { cur = th; x = y; }
    if (it % 200 === 199) step *= 0.72;
  }
  if (cur > best4.t) best4 = { t: cur, P: x[0], Q: x[1], R: x[2], T: x[3] };
}
console.log(`  ${STARTS} seeded restarts, local descent, validity ranges enforced`);
console.log(`  best theta = ${fmt(best4.t)}   1/theta = ${fmt(1 / best4.t)}`);
console.log(`  at P=${fmt(best4.P, 6)} Q=${fmt(best4.Q, 6)} R=${fmt(best4.R, 6)} T=${fmt(best4.T, 6)}`);
console.log(`  symmetric BF point for comparison: theta = ${fmt(theta(ALPHA_BF, BETA_BF))}`);
console.log(`  gain over BF = ${fmt(best4.t - theta(ALPHA_BF, BETA_BF), 12)}`);
// also report what the 4-level search gives with condition (iv) ALONE, to show
// the polytope and not the parametrisation is what kills it
const pairOK_iv = (u, v) => (u + v) <= 1.25 + 1e-12;
function ok4_ivonly(P, Q, R, T, th) {
  if (!(th > 0)) return false;
  const p = P / th, q = Q / th, r = R / th, t = T / th;
  if (!(p >= 1 - 1e-9 && p <= 3 + 1e-9)) return false;
  if (!(r >= 1 - 1e-9 && r <= 3 + 1e-9)) return false;
  if (!(q >= 2 - 1e-9 && q <= 4 + 1e-9)) return false;
  if (!(t >= 2 - 1e-9 && t <= 4 + 1e-9)) return false;
  return pairOK_iv(Q, R) && pairOK_iv(P, T) && pairOK_iv(P, R);
}
seed = 20260818 >>> 0;
let best4iv = { t: -Infinity };
for (let s0 = 0; s0 < STARTS; s0++) {
  let x = [0.2 + 1.1 * rnd(), 0.2 + 1.1 * rnd(), 0.2 + 1.1 * rnd(), 0.2 + 1.1 * rnd()];
  let step = 0.12, cur = -Infinity;
  { const th = thetaMax4(...x); if (ok4_ivonly(...x, th)) cur = th; }
  for (let it = 0; it < 4000; it++) {
    const y = x.map(v => Math.max(1e-6, v + step * (rnd() * 2 - 1)));
    const th = thetaMax4(...y);
    if (ok4_ivonly(...y, th) && th > cur) { cur = th; x = y; }
    if (it % 200 === 199) step *= 0.72;
  }
  if (cur > best4iv.t) best4iv = { t: cur, P: x[0], Q: x[1], R: x[2], T: x[3] };
}
console.log(`  SAME SEARCH with condition (iv) alone: theta = ${fmt(best4iv.t)}  (1/theta = ${fmt(1 / best4iv.t)})`);
console.log(`     at P=${fmt(best4iv.P, 6)} Q=${fmt(best4iv.Q, 6)} R=${fmt(best4iv.R, 6)} T=${fmt(best4iv.T, 6)}`);
// polish, seeded at the section-D exact two-level optimum, to separate a real
// gain from search noise
{
  const E = global.__EXACT;
  let x = [E.a, E.b, E.a, E.b], step = 0.02, cur = thetaMax4(...x);
  if (!ok4(...x, cur)) cur = -Infinity;
  for (let it = 0; it < 400000; it++) {
    const y = x.map(v => Math.max(1e-6, v + step * (rnd() * 2 - 1)));
    const th = thetaMax4(...y);
    if (ok4(...y, th) && th > cur) { cur = th; x = y; }
    if (it % 20000 === 19999) step *= 0.7;
  }
  console.log(`  POLISHED from the section-D two-level optimum (4e5 steps):`);
  console.log(`     theta = ${fmt(cur, 12)}  at P=${fmt(x[0], 8)} Q=${fmt(x[1], 8)} R=${fmt(x[2], 8)} T=${fmt(x[3], 8)}`);
  console.log(`     minus the two-level optimum = ${fmt(cur - E.t, 14)}`);
  console.log(`     => independent levels per component buy ${Math.abs(cur - E.t) < 1e-9 ? 'NOTHING' : 'something'} here either.`);
}

// ============================================================================
console.log('');
console.log('='.repeat(78));
console.log('G. WHAT SURVIVES');
console.log('='.repeat(78));
const bfTheta = theta(ALPHA_BF, BETA_BF);
const full = { t: global.__EXACT.t, a: global.__EXACT.a, b: global.__EXACT.b };
console.log(`  BF published                          theta = ${fmt(bfTheta)}   1/theta = ${fmt(1 / bfTheta)}`);
console.log(`  best legal split, all four conditions  theta = ${fmt(full.t)}   1/theta = ${fmt(1 / full.t)}`);
console.log(`  at (alpha,beta) = (${fmt(full.a, 8)}, ${fmt(full.b, 8)})`);
console.log(`  SURVIVING GAIN in theta  = ${fmt(full.t - bfTheta, 12)}`);
console.log(`  SURVIVING GAIN in 1/theta = ${fmt(1 / bfTheta - 1 / full.t, 12)}`);
console.log('');
console.log(`  attack C claimed gain in theta = ${fmt(cBest.t - bfTheta, 12)} (condition (iv) alone)`);
console.log(`  fraction of that which survives = ${fmt((full.t - bfTheta) / (cBest.t - bfTheta), 12)}`);
console.log('');
console.log('  linear sieve validity at BF\'s point:');
console.log(`     s+ = alpha/theta = ${fmt(ALPHA_BF / bfTheta, 6)}   needs [1,3]  ${(ALPHA_BF / bfTheta >= 1 && ALPHA_BF / bfTheta <= 3) ? 'ok' : 'OUT'}`);
console.log(`     s- = beta /theta = ${fmt(BETA_BF / bfTheta, 6)}   needs [2,4]  ${(BETA_BF / bfTheta >= 2 && BETA_BF / bfTheta <= 4) ? 'ok' : 'OUT'}`);
console.log('');
console.log(`  BF's published constant, 4 decimals as they print it: 0,${String(Math.floor(bfTheta * 1e4)).padStart(4, '0')}`);
console.log(`  best legal split,        4 decimals:                   0,${String(Math.floor(full.t * 1e4)).padStart(4, '0')}`);
console.log('');
console.log('  which conditions bind at BF\'s point (assignment B, D1 = minorant):');
{
  const s = slack(BETA_BF, ALPHA_BF);
  COND.forEach((k, i) => console.log(`     ${k.name}  slack = ${fmt(s[i], 12)}  ${Math.abs(s[i]) < 1e-12 ? '<== BINDING' : ''}`));
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-bf-split.js
//   invocation:  node research/attack-bf-split.js
//   code-sha256: ff1b5857d10e3db3c9d9cdb7d0830065150bc5bffe3c40190676182fdb185497
//   out-sha256:  0964bffc4f94f1073f73842d82060dce681e13edcb630ebafd1c01724e1bebb8
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     198.2 s
// ============================================================================
// ==============================================================================
// A. THE FOUR CONDITIONS AT BF'S OWN SPLIT, BOTH SLOT ASSIGNMENTS
// ==============================================================================
// BF levels: majorant D = x^0.5 (psi+),  minorant Delta = x^0.75 (psi-)
// BF threshold theta = beta/(1+exp(beta/2alpha)) = 0.2406159756
// their printed constant 3/(4(1+exp(3/4)))       = 0.2406159756
// 1/theta                                        = 4.1560000222
//
// ASSIGNMENT A:  D1 = majorant x^0.5 , D2 = minorant x^0.75
//    (i)   D1        <= x^1   lhs=0.5000  rhs=1   slack=0.5000  ok
//    (ii)  D1 D2^2   <= x^2   lhs=2.0000  rhs=2   slack=0.0000  SATURATED
//    (iii) D1^2 D2^3 <= x^3   lhs=3.2500  rhs=3   slack=-0.2500  *** VIOLATED ***
//    (iv)  D1^4 D2^4 <= x^5   lhs=5.0000  rhs=5   slack=0.0000  SATURATED
//    verdict: INFEASIBLE
//
// ASSIGNMENT B:  D1 = minorant x^0.75, D2 = majorant x^0.5
//    (i)   D1        <= x^1   lhs=0.7500  rhs=1   slack=0.2500  ok
//    (ii)  D1 D2^2   <= x^2   lhs=1.7500  rhs=2   slack=0.2500  ok
//    (iii) D1^2 D2^3 <= x^3   lhs=3.0000  rhs=3   slack=0.0000  SATURATED
//    (iv)  D1^4 D2^4 <= x^5   lhs=5.0000  rhs=5   slack=0.0000  SATURATED
//    verdict: FEASIBLE
//
// A2. THE THREE VECTOR-SIEVE TERMS AT BF'S LEVELS, SLOTS FIXED BY COMPONENT
//    L1^- L2^+   (D1,D2) = (x^0.75, x^0.5 )  FEASIBLE
//    L1^+ L2^-   (D1,D2) = (x^0.5 , x^0.75)  INFEASIBLE, fails (iii)
//    L1^+ L2^+   (D1,D2) = (x^0.5 , x^0.5 )  FEASIBLE
//    => BF's own published levels make the SECOND cross term infeasible if the
//       slots are read as fixed. The paper is correct, so the n <-> n+2 symmetry
//       of the sifted sequence (invoked explicitly at p.354, "la symetrie du
//       probleme") must be what puts the level-x^{3/4} weight in slot 1 for both
//       cross terms. Every optimisation below therefore allows the free choice
//       of slot for a level PAIR, which is the assumption most favourable to a
//       re-split, and it still yields the result in section G.
//
// THE (+,+) DIAGONAL TERM, levels (D,D) = (x^0.5, x^0.5)  [p.353]
//    (i)   D1        <= x^1   slack=0.5000
//    (ii)  D1 D2^2   <= x^2   slack=0.5000
//    (iii) D1^2 D2^3 <= x^3   slack=0.5000
//    (iv)  D1^4 D2^4 <= x^5   slack=1.0000
//    verdict: FEASIBLE
//
// ==============================================================================
// B. ARE THE STATED CONDITIONS THE ONES THE PROOF NEEDS?
// ==============================================================================
// substituting  log_x D2'' = d1 + d2 - 1   (BF's choice of D2', p.348):
//
//    D2 . D2''                      ->  1*d1 + 2*d2 <= 2   i.e.  D1^1 D2^2 <= x^2
//    D1^{1/2} D2^{1/2} D2''^{3/2}   ->  4*d1 + 4*d2 <= 5   i.e.  D1^4 D2^4 <= x^5
//    D1^{1/2} D2 D2''^{1/2}         ->  2*d1 + 3*d2 <= 3   i.e.  D1^2 D2^3 <= x^3
//    D1                             ->  1*d1 + 0*d2 <= 1   i.e.  D1^1 D2^0 <= x^1
//
//    derived 1  ->  stated (ii)  D1 D2^2   <= x^2
//    derived 2  ->  stated (iv)  D1^4 D2^4 <= x^5
//    derived 3  ->  stated (iii) D1^2 D2^3 <= x^3
//    derived 4  ->  stated (i)   D1        <= x^1
//
//    VERDICT: the four printed conditions are EXACTLY the four terms
//             of the p.348 max, rescaled. Nothing is stated loosely.
//
// ==============================================================================
// C. D2' IS FREE IN THE PROOF. IS BF'S CHOICE OF IT OPTIMAL?
// ==============================================================================
//    grid 261x261 over (d1,d2) in [0,1.3]^2, 61 values of s each
//    (d1,d2) feasible for SOME s but NOT for s = min(1-d1, d2):  0
//    => BF's choice D2' = x/D1 is optimal; the printed conditions
//       lose nothing to the proof they came from.
//    best theta on this COARSE 3-var grid (step 0.00500): 0.2406159756 at
//       (alpha,beta) = (0.500000, 0.750000), (d1,d2,s) = (0.750000, 0.500000, 0.250000)
//    (the grid is too coarse to resolve the true optimum; section D does that)
//
// ==============================================================================
// D. MAXIMISE THE BF THRESHOLD OVER THE FEASIBLE POLYTOPE
// ==============================================================================
// --- WITHOUT the (+,+) diagonal constraint (alpha,alpha) ---
//   assignment A (D1=majorant)      max theta = 0.2279431830  at (alpha,beta) = (0.550964, 0.632691)   1/theta = 4.387058
//      exact vertices (2): best vertex theta = 0.2087148968 at (0.750000, 0.500000)
//      grid max minus vertex max = 0.019228286200
//   assignment B (D1=minorant)      max theta = 0.2406280293  at (alpha,beta) = (0.502674, 0.745990)   1/theta = 4.155792
//      exact vertices (2): best vertex theta = 0.2406159756 at (0.500000, 0.750000)
//      grid max minus vertex max = 0.000012053633
//   assignment free (best of A,B)   max theta = 0.2406280293  at (alpha,beta) = (0.502674, 0.745990)   1/theta = 4.155792
//
// --- WITH the (+,+) diagonal constraint (alpha,alpha) ---
//   assignment A (D1=majorant)      max theta = 0.2279431830  at (alpha,beta) = (0.550964, 0.632691)   1/theta = 4.387058
//      exact vertices (1): best vertex theta = 0.2265244013 at (0.600000, 0.600000)
//      grid max minus vertex max = 0.001418781690
//   assignment B (D1=minorant)      max theta = 0.2406280293  at (alpha,beta) = (0.502674, 0.745990)   1/theta = 4.155792
//      exact vertices (3): best vertex theta = 0.2406159756 at (0.500000, 0.750000)
//      grid max minus vertex max = 0.000012053633
//   assignment free (best of A,B)   max theta = 0.2406280293  at (alpha,beta) = (0.502674, 0.745990)   1/theta = 4.155792
//
// --- EXACT OPTIMUM, assignment B, on the binding edge (iii) ---
//   d(theta)/d(beta) = 0 at beta* = 0.745989568179,  alpha* = 0.502673621214
//   theta* = 0.240628029251    1/theta* = 4.155791838187
//   d(theta)/d(beta) at BF's beta = 3/4 : -0.006021189818  (negative => BF's corner is not stationary)
//      (i)   D1        <= x^1  slack = 0.25401043182069
//      (ii)  D1 D2^2   <= x^2  slack = 0.24866318939310
//      (iii) D1^2 D2^3 <= x^3  slack = 0.00000000000000  <== BINDING
//      (iv)  D1^4 D2^4 <= x^5  slack = 0.00534724242758
//      diagonal (alpha*,alpha*) feasible: true   tightest slack = 0.48663189
//      s+ = alpha*/theta* = 2.08900693 in [1,3]: true
//      s- = beta* /theta* = 3.10017736 in [2,4]: true
//   gain over BF in theta   = 0.00001205363249
//   gain over BF in 1/theta = 0.00020818396360
//   BF print 4 decimals: theirs 0,2406  ours 0,2406  -> UNCHANGED at their precision
//
// ==============================================================================
// E. ATTACK C'S RE-SPLIT, LOCATED AND TESTED
// ==============================================================================
//   optimum of theta on the line alpha+beta = 5/4 (condition (iv) alone):
//      theta = 0.2423389541   1/theta = 4.1264517443   at (alpha,beta) = (0.54040344, 0.70959656)   beta/alpha = 1.3130866928
//   BF's own point on that line: theta = 0.2406159756, 1/theta = 4.1560000222
//   claimed gain in 1/theta currency: 0.0295482779
//   claimed gain in theta  currency: 0.0017229785
//
//   now test attack C's point against ALL FOUR conditions:
//     assignment A (D1=majorant):
//        (i)   D1        <= x^1  slack=0.45959656  ok
//        (ii)  D1 D2^2   <= x^2  slack=0.04040344  ok
//        (iii) D1^2 D2^3 <= x^3  slack=-0.20959656  *** VIOLATED ***
//        (iv)  D1^4 D2^4 <= x^5  slack=0.00000000  ok
//     assignment B (D1=minorant):
//        (i)   D1        <= x^1  slack=0.29040344  ok
//        (ii)  D1 D2^2   <= x^2  slack=0.20959656  ok
//        (iii) D1^2 D2^3 <= x^3  slack=-0.04040344  *** VIOLATED ***
//        (iv)  D1^4 D2^4 <= x^5  slack=0.00000000  ok
//
//   the binding violation, assignment B (the only one BF can use):
//      (iii) 2*D1 + 3*D2 - 3 = 0.0404034375  > 0, so D1^2 D2^3 = x^{3 + 0.040403}
//      i.e. the re-split overshoots condition (iii) by a factor x^0.040403
//
// ==============================================================================
// F. FOUR INDEPENDENT LEVELS, EACH TERM FREE TO CHOOSE ITS SLOT
// ==============================================================================
//   3000 seeded restarts, local descent, validity ranges enforced
//   best theta = 0.2406257516   1/theta = 4.1558311744
//   at P=0.501870 Q=0.748089 R=0.501273 T=0.747195
//   symmetric BF point for comparison: theta = 0.2406159756
//   gain over BF = 0.000009776017
//   SAME SEARCH with condition (iv) alone: theta = 0.2423363364  (1/theta = 4.1264963179)
//      at P=0.542060 Q=0.709590 R=0.540404 T=0.707929
//   POLISHED from the section-D two-level optimum (4e5 steps):
//      theta = 0.240628029251  at P=0.50267362 Q=0.74598957 R=0.50267362 T=0.74598957
//      minus the two-level optimum = 0.00000000000000
//      => independent levels per component buy NOTHING here either.
//
// ==============================================================================
// G. WHAT SURVIVES
// ==============================================================================
//   BF published                          theta = 0.2406159756   1/theta = 4.1560000222
//   best legal split, all four conditions  theta = 0.2406280293   1/theta = 4.1557918382
//   at (alpha,beta) = (0.50267362, 0.74598957)
//   SURVIVING GAIN in theta  = 0.000012053632
//   SURVIVING GAIN in 1/theta = 0.000208183964
//
//   attack C claimed gain in theta = 0.001722978518 (condition (iv) alone)
//   fraction of that which survives = 0.006995811242
//
//   linear sieve validity at BF's point:
//      s+ = alpha/theta = 2.078000   needs [1,3]  ok
//      s- = beta /theta = 3.117000   needs [2,4]  ok
//
//   BF's published constant, 4 decimals as they print it: 0,2406
//   best legal split,        4 decimals:                   0,2406
//
//   which conditions bind at BF's point (assignment B, D1 = minorant):
//      (i)   D1        <= x^1  slack = 0.250000000000
//      (ii)  D1 D2^2   <= x^2  slack = 0.250000000000
//      (iii) D1^2 D2^3 <= x^3  slack = 0.000000000000  <== BINDING
//      (iv)  D1^4 D2^4 <= x^5  slack = 0.000000000000  <== BINDING
// ============================================================
// READINGS
// ============================================================================
//
// 1. THE PREMISE OF THE CLAIMED GAIN IS FALSE. Attack C's re-split rests on
//    "their side condition constrains only the PRODUCT D1 D2". Only ONE of the
//    four does. Transcribed from the rendered page image, numdam
//    CM_1996__102_3_337_0 PDF page 10 = journal page 345, the four displays
//    under "des qu'on a les relations":
//        q^{C0} D1 <= x^{1-c eps};   q^{C0} D1 D2^2 <= x^{2-c eps};
//        q^{C0} D1^2 D2^3 <= x^{3-c eps};   q^{C0} D1^4 D2^4 <= x^{5-c eps}.
//    (i) is on D1 ALONE. (ii) and (iii) are asymmetric monomials weighting D2
//    above D1. Only (iv) is a product condition. [VERIFIED, section A.]
//
// 2. AT BF'S OWN SPLIT, TWO CONDITIONS BIND AT ONCE, AND (iii) IS ONE OF THEM.
//    With D1 = the minorant level x^{3/4} and D2 = the majorant level x^{1/2},
//    section A reads slack 0.2500, 0.2500, 0.0000, 0.0000 on (i)-(iv). Their
//    point is the vertex (iii) INTERSECT (iv), not a point on (iv) alone. A
//    choice that saturates two conditions simultaneously is the signature of an
//    optimisation already performed, not of an oversight.
//
// 3. THE ORIENTATION IS THE REVERSE OF WHAT THE CORPUS RECORDED. Attack C read
//    BF's (1/2, 3/4) as (D1, D2). Section A shows that reading is INFEASIBLE:
//    with D1 = x^{1/2}, D2 = x^{3/4}, condition (iii) reads 3.2500 against 3,
//    a violation of 0.2500. The only feasible reading of the published levels
//    puts the level-x^{3/4} weight in slot 1. (1/2, 3/4) as (majorant,
//    minorant) is right, from p.353 verbatim: "On choisit alors
//    D = x^{(1/2)-100c eps} q^{-C0} et Delta = x^{(3/4)-100c eps} q^{-C0}"
//    with "D et Delta sont respectivement attaches aux fonctions psi^+ et
//    psi^-"; the mapping of that pair onto Proposition 2's slots is not.
//
// 4. THE RE-SPLIT IS ILLEGAL, AND SECTION E SAYS BY HOW MUCH. Attack C's
//    optimum on the line alpha+beta = 5/4 is theta = 0.2423389541 at
//    (alpha,beta) = (0.54040344, 0.70959656), beta/alpha = 1.3130866928,
//    reproducing its K = 5.1580646803 and ratio 1.3130863738 to seven places.
//    Tested against all four conditions it fails (iii) under BOTH slot
//    assignments, by 0.20959656 in assignment A and by 0.04040344 in
//    assignment B, i.e. it overshoots D1^2 D2^3 <= x^3 by a factor x^0.040403.
//    The 0.0295482779 does not survive.
//
// 5. WHAT DOES SURVIVE IS 0.70 PER CENT OF IT, AND IT IS REAL. BF's corner is
//    not stationary: section D's exact bisection of the analytic derivative
//    along the binding edge (iii) gives d(theta)/d(beta) = -0.006021189818 at
//    beta = 3/4, and a stationary point at beta* = 0.745989568179,
//    alpha* = 0.502673621214 with theta* = 0.240628029251. Gain over BF:
//    0.00001205363249 in theta, 0.00020818396360 in 1/theta. That is
//    0.006995811242 of the 0.001722978518 attack C claimed. At their optimum
//    (iii) binds exactly and (iv) has slack 0.00534724242758 — so the true
//    optimum saturates the condition attack C ignored and leaves slack in the
//    one it used. [VERIFIED, section D.]
//
// 6. THE SURVIVING GAIN IS INVISIBLE AT THEIR PRINTED PRECISION. Section G:
//    0.2406 against 0.2406 to four decimals, "UNCHANGED at their precision".
//    The Theoreme's "0,2406" is exactly right either way. The improvement is
//    to the exact constant, 3/(4(1+exp(3/4))) = 0.2406159756 -> 0.2406280293,
//    from the fifth decimal on. Nothing about the paper's stated result moves.
//
// 7. THE STATEMENT IS NOT LOOSER THAN THE PROOF, WHICH IS THE OTHER WAY THE
//    GAIN COULD HAVE BEEN REAL. Section B substitutes BF's D2'' = q^{C0} D1 D2
//    x^{-1+10 eps} into the max of p.348, "q^{C0} max(D2 D2'',
//    D1^{1/2} D2^{1/2} D2''^{3/2}, D1^{1/2} D2 D2''^{1/2}, D1) <= x^{1-20c eps}",
//    and recovers (ii), (iv), (iii), (i) in that order, exactly. The printed
//    conditions are the proof's four terms rescaled, with no rounding.
//
// 8. AND D2' IS FREE IN THE PROOF, BUT BF'S CHOICE OF IT IS OPTIMAL. Before
//    p.348 fixes D2' = q^{-C0} D1^{-1} x^{1-10 eps}, the requirement is a
//    three-variable polytope in (d1, d2, s = log_x D2') with (2.15) capping
//    s <= 1 - d1 and all four remaining conditions non-increasing in s.
//    Section C's grid finds 0 pairs (d1,d2) that are feasible for some s but
//    not for s = min(1-d1, d2). There is no slack hiding behind that choice.
//
// 9. THE SLOT ASSIGNMENT IS THE ONE PLACE THIS ARGUMENT NEEDS A READING OF THE
//    PAPER RATHER THAN ITS ARITHMETIC. Proposition 2's d1 divides the first
//    component and d2 the second, so a fixed labelling of the two components
//    forces (D1,D2) = (majorant, minorant) in the term Lambda1^+ Lambda2^-,
//    which section A2 reports INFEASIBLE at BF's own levels. The paper is
//    correct, so the exchange symmetry n <-> n+2 of the sifted sequence — which
//    BF invoke by name at p.354, "la symetrie du probleme" — is what lets the
//    level-x^{3/4} weight sit in slot 1 for both cross terms. Every
//    optimisation here grants that freedom, which is the assumption most
//    favourable to a re-split; the surviving gain is still 0.0000120536.
//    [INFERRED, from the paper being correct.]
//
// 10. THE ASYMMETRIC POLYTOPE DOES NOT REWARD INDEPENDENT LEVELS EITHER. Four
//    free levels (majorant and minorant per component), each of the three terms
//    free to choose its slot, validity ranges 1 <= s+ <= 3 and 2 <= s- <= 4
//    enforced: 3000 seeded restarts reach 0.2406257516, and a polish seeded at
//    the two-level optimum returns 0.240628029251 with P = R = 0.50267362 and
//    Q = T = 0.74598957 — the symmetric point, difference 0.00000000000000.
//    That extends attack C section C's finding to the asymmetric constraint
//    set, where it was not obvious: the asymmetry is in the two SLOTS, not in
//    the two COMPONENTS, so it gives independent levels nothing to exploit.
//
// 11. THE OTHER SLOT ORDER IS STRICTLY WORSE, WHICH IS WHY BF CHOSE THIS ONE.
//    Section D, assignment A (D1 = majorant): max theta = 0.2279431830 against
//    assignment B's 0.2406280293. The gap, 0.0126848463, is 1000 times the
//    entire re-split question and it is settled by a single labelling choice.
//
// 12. THE LINEAR SIEVE IS INSIDE ITS EXACT RANGE AT BOTH POINTS, so attack C's
//    recorded trap ("any future re-optimisation of this threshold must carry
//    1 <= u*a <= 3 and u*b >= 2 explicitly") does not bite here. At BF's point
//    s+ = 2.078000 and s- = 3.117000; at the new optimum s+ = 2.08900693 and
//    s- = 3.10017736. Both in [1,3] and [2,4].
//
// 13. TRANSFER TO G2: NONE, AND THE REASON IS NOT THE SPLIT. `research/
//    sift-limit-attack.md` section 7b records that BF's left factor
//    e(-hN/(d1 d2)) is O(x^eps) for them and O(N/H) for us. Everything above
//    is an optimisation inside their level polytope; it does not touch that
//    factor, so it moves nothing on our side. Nobody should read the 0.0000121
//    as an exponent gain for G2, and nobody should read the 0.0295 that way
//    either, since it does not exist.
//
// CUSTODY. Every figure above is from the OUTPUT block, which
// `research/qc/embed.js` wrote from a completed 198.2 s run
// (code-sha256 ff1b5857d10e3db3..., out-sha256 0964bffc4f94f107...). The four
// side conditions, the level choice, the D2' choice, the p.348 max and the
// p.355 root equation are transcribed from rendered page images of the numdam
// PDF at 200-600 dpi. The PDF carries a numdam cover sheet, so journal page N
// is PDF page N-335; pages read are PDF 8, 9, 10, 11, 12, 13, 18, 20 = journal
// 343, 344, 345, 346, 347, 348, 353, 355. The numdam text layer for this paper
// drops every display formula, so no statement here comes from it. The four
// side conditions were re-read at 600 dpi, and the p.355 root equation - which
// IS the objective - at 500 dpi: it is printed as
//     2 f(log x^{3/4} / log x^xi) - F(log x^{1/2} / log x^xi) = 0,
// which with F(s) = 2e^g/s and f(s) = 2e^g ln(s-1)/s is exactly
// xi = beta/(1 + exp(beta/(2 alpha))) at (alpha,beta) = (1/2, 3/4), and which
// settles the orientation on its own: 3/4 sits inside f, 1/2 inside F. Iwaniec, Acta Arith. 37 (1980) 307-320, matwbn aa37127, is
// the linear-sieve input [Iw2] and was fetched in the same session.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure above that the OUTPUT block does not contain verbatim actually is.
// No number above was changed. This file is unusual: most of its untraceable
// figures are not measurements at all but bibliography.
//
// NOT FIGURES — bibliographic and identifier text the figure scanner reads as
//   numbers: the numdam article id CM_1996__102_3_337_0 (yields 102, 337),
//   the journal pages 343 to 355 and the PDF-to-journal offset (yields 345,
//   346, 355, -335, -600 from "200-600 dpi"), the display number (2.15), the
//   exponent text x^{(1/2)-100c eps} (yields -100), Iwaniec's Acta Arith. 37
//   (1980) 307-320 (yields 307, -320, 37127 from the run-together digits),
//   and the two embed hash prefixes quoted in the custody note, whose hex runs
//   ff1b5857d10e3db3 and 0964bffc4f94f107 yield 256, 5857, 10e3 and 107.
//   None of these is a quantity and none can be in an OUTPUT block.
//
// BORROWED, verified present in the named producer's embedded OUTPUT:
//   K = 5.1580646803 and the ratio 1.3130863738 are reproduced here from
//   research/attack-ford-halberstam.js, and are also in
//   research/attack-sqrt-cancellation.js and research/attack-theta-margin.js.
//   The reading says it is reproducing them, which is the honest form.
//
// ROUNDING of a printed value: 0.000012053633 -> 0.0000121.
//
// DERIVED IN THIS READING: the gap 0.0126848463, which is the difference of
//   two printed assignments, and the factor 1000 it is compared against.
// ---------------------------------------------------------------------------
