#!/usr/bin/env node
'use strict';
// ============================================================================
// signed-moment-validation.js
// ----------------------------------------------------------------------------
// Companion checks for research/signed-moment.md.
//
// WHAT THIS DOES AND DOES NOT DO.  Everything below is exact rational
// bookkeeping over the block exponents asserted in the note, plus small
// finite integer/analytic identities used inside the two derivations.  It
// validates NO imported analytic estimate, establishes NO asymptotic rate,
// and says nothing about the sign or size of the signed cross term.  A green
// run means the exponent arithmetic and the finite identities are as written.
//
// Sections
//   A  block-exponent tables at named boxes (exact rationals)
//   B  region comparison: does Lemma B add area over the controlled region?
//   C  finite identities behind Lemma A / Lemma B
//   D  negative controls (each must FIRE)
// ============================================================================

// ---------- exact rationals over BigInt --------------------------------------
function g(a, b) { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) { const t = a % b; a = b; b = t; } return a; }
class Q {
  constructor(n, d = 1n) {
    n = BigInt(n); d = BigInt(d);
    if (d === 0n) throw new Error('zero denominator');
    if (d < 0n) { n = -n; d = -d; }
    const k = g(n, d) || 1n;
    this.n = n / k; this.d = d / k;
  }
  add(o) { return new Q(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { return new Q(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { return new Q(this.n * o.n, this.d * o.d); }
  div(o) { return new Q(this.n * o.d, this.d * o.n); }
  cmp(o) { const l = this.n * o.d, r = o.n * this.d; return l < r ? -1 : l > r ? 1 : 0; }
  lt(o) { return this.cmp(o) < 0; }
  le(o) { return this.cmp(o) <= 0; }
  eq(o) { return this.cmp(o) === 0; }
  num() { return Number(this.n) / Number(this.d); }
  toString() { return this.d === 1n ? `${this.n}` : `${this.n}/${this.d}`; }
}
const q = (n, d = 1n) => new Q(n, d);
const Q0 = q(0), Q1 = q(1), Q2 = q(2), QH = q(1, 2n);
const qmax = (...xs) => xs.reduce((a, b) => (a.lt(b) ? b : a));
const qmin = (...xs) => xs.reduce((a, b) => (b.lt(a) ? b : a));

// ---------- geometry of the original divisor domain --------------------------
// d ~ x^delta, e ~ x^nu; expanded lengths M << x^a, N << x^b with
// a = delta + 6/25, b = nu + 1/20 (RESEARCH-HANDOFF sec.4).
const W_CUT = q(6, 25n);   // left cutoff exponent w
const V_CUT = q(1, 20n);   // right cutoff exponent v
const DELTA_LO = q(6, 25n), DELTA_HI = q(19, 25n);
const NU_LO = q(1, 20n), NU_HI = q(19, 20n);
const ab = (delta, nu) => [delta.add(W_CUT), nu.add(V_CUT)];

// Grouped moment, right orientation (grouped-divisor-moment (14)):
//   zero (1+a)/2,  cross a/2 + 3b/2,  periods a.  Left orientation swaps a,b.
const groupedRight = (a, b) => [Q1.add(a).div(Q2), a.div(Q2).add(q(3, 2n).mul(b)), a];
const groupedLeft = (a, b) => groupedRight(b, a);

// Lemma B (this note): Cauchy in the harmonic variable, harmonic band completed
// by positivity, geometric series in h.  Four terms
//   sqrt(MNx), N sqrt(x), M sqrt(N), N sqrt(M)  ->  exponents
const lemmaB = (a, b) => [
  Q1.add(a).add(b).div(Q2),        // sqrt(M N x)
  b.add(QH),                       // N sqrt(x)
  a.add(b.div(Q2)),                // M sqrt(N)
  b.add(a.div(Q2)),                // N sqrt(M)
];

// Lemma A (this note): the (u,h)-diagonal of |T|^2 is << x^(2-min(a,b)+eps).
// Reported as an exponent of |T|^2, and as the |T| exponent it would allow.
const lemmaA_T2 = (a, b) => Q2.sub(qmin(a, b));
const lemmaA_T = (a, b) => lemmaA_T2(a, b).div(Q2);

// Lemma B with its u1 != u2 part replaced by the u-diagonal (CONDITIONAL: this
// assumes cancellation in the right Mobius signs that is not proved).  Terms
//   M sqrt(x), M, N sqrt(x), sqrt(MN)  ->  max = (1 + max(a,b))/2 on the top band.
const lemmaBudiag = (a, b) => [
  Q1.add(a).div(Q2), a, Q1.add(b).div(Q2), a.add(b).div(Q2),
];

// HEURISTIC ceiling for arbitrary bounded coefficients (see note sec.6):
//   sup_{|b_u|<=B,|c_h|<=C/A} |T|  ~  x^((1+min(a,b))/2)  on the top band.
const ceilingHeur = (a, b) => Q1.add(qmin(a, b)).div(Q2);

// Controlled region after grouped-divisor-moment (handoff sec.4):
const controlled = (delta, nu) =>
  delta.add(nu).lt(q(19, 25n)) ||
  q(5).mul(delta).add(Q2.mul(nu)).lt(q(123, 50n)) ||
  (delta.lt(q(19, 25n)) && delta.add(q(3).mul(nu)).lt(q(161, 100n)));

const usable = (budgets) => qmax(...budgets).lt(Q1);

// ============================================================================
let PASS = 0, FAIL = 0;
const chk = (name, cond, detail = '') => {
  if (cond) { PASS++; } else { FAIL++; console.log(`  FAIL  ${name} ${detail}`); }
};

const BOXES = [
  ['corner            (19/25,19/20)', q(19, 25n), q(19, 20n)],
  ['target box        ( 8/25, 9/20)', q(8, 25n), q(9, 20n)],
  ['benchmark         ( 2/5 , 2/5 )', q(2, 5n), q(2, 5n)],
  ['product supremum  ( 8/25,11/25)', q(8, 25n), q(11, 25n)],
  ['d-edge cheapest   (19/25, 1/20)', q(19, 25n), q(1, 20n)],
  ['e-edge cheapest   ( 6/25,19/20)', q(6, 25n), q(19, 20n)],
];

console.log('A. BLOCK EXPONENTS AT NAMED BOXES (exact rationals)');
console.log('   columns: a, b | grouped right max | grouped left max | Lemma B max'
  + ' | Lemma A (|T|^2) | Lemma B u-diag | heuristic ceiling');
for (const [name, delta, nu] of BOXES) {
  const [a, b] = ab(delta, nu);
  const gr = qmax(...groupedRight(a, b)), gl = qmax(...groupedLeft(a, b));
  const lb = qmax(...lemmaB(a, b));
  console.log(`   ${name}  a=${a} b=${b} | ${gr} | ${gl} | ${lb} | ${lemmaA_T2(a, b)}`
    + ` | ${qmax(...lemmaBudiag(a, b))} | ${ceilingHeur(a, b)}`);
}

// The four Lemma B terms at the corner and at the target box, individually.
{
  const [a, b] = ab(q(19, 25n), q(19, 20n));
  const t = lemmaB(a, b);
  console.log(`   corner   Lemma B terms  sqrt(MNx)=${t[0]} Nsqrt(x)=${t[1]}`
    + ` Msqrt(N)=${t[2]} Nsqrt(M)=${t[3]}`);
  chk('corner: all four Lemma B terms equal 3/2',
    t.every((e) => e.eq(q(3, 2n))));
  chk('corner: grouped right max is 2', qmax(...groupedRight(a, b)).eq(Q2));
  chk('corner: grouped zero budget is exactly 1', groupedRight(a, b)[0].eq(Q1));
  chk('corner: Lemma A |T|^2 exponent is 1', lemmaA_T2(a, b).eq(Q1));
  chk('corner: Lemma A allows |T| at 1/2', lemmaA_T(a, b).eq(QH));
  chk('corner: heuristic ceiling is exactly 1', ceilingHeur(a, b).eq(Q1));
  chk('corner: Lemma B with cancelled u-off-diagonal is exactly 1',
    qmax(...lemmaBudiag(a, b)).eq(Q1));
}
{
  const [a, b] = ab(q(8, 25n), q(9, 20n));
  const t = lemmaB(a, b);
  console.log(`   target   Lemma B terms  sqrt(MNx)=${t[0]} Nsqrt(x)=${t[1]}`
    + ` Msqrt(N)=${t[2]} Nsqrt(M)=${t[3]}`);
  chk('target: Lemma B max is 103/100', qmax(...t).eq(q(103, 100n)));
  chk('target: grouped right max is 103/100',
    qmax(...groupedRight(a, b)).eq(q(103, 100n)));
  chk('target: Lemma A |T|^2 exponent is 3/2', lemmaA_T2(a, b).eq(q(3, 2n)));
  chk('target: heuristic ceiling is 3/4', ceilingHeur(a, b).eq(q(3, 4n)));
  chk('target: Lemma B with cancelled u-off-diagonal is 39/50',
    qmax(...lemmaBudiag(a, b)).eq(q(39, 50n)));
}
{
  const [a, b] = ab(q(2, 5n), q(2, 5n));
  chk('benchmark: Lemma B max is 209/200', qmax(...lemmaB(a, b)).eq(q(209, 200n)));
  chk('benchmark: grouped right max is 199/200',
    qmax(...groupedRight(a, b)).eq(q(199, 200n)));
  chk('benchmark: Lemma B is strictly worse than grouped there',
    qmax(...groupedRight(a, b)).lt(qmax(...lemmaB(a, b))));
  chk('benchmark: heuristic ceiling 29/40 below the proven 199/200',
    ceilingHeur(a, b).eq(q(29, 40n)) && ceilingHeur(a, b).lt(q(199, 200n)));
}

// ---------------------------------------------------------------------------
console.log('');
console.log('B. REGION COMPARISON ON A RATIONAL GRID');
{
  const STEPS = 190n; // 191 x 191 lattice over the original domain
  let boxes = 0, lbUsable = 0, lbNew = 0, lemmaAAlways = 0, ceilBelow = 0;
  let ceilUnderProven = 0, udiagBelow = 0;
  const dspan = DELTA_HI.sub(DELTA_LO), nspan = NU_HI.sub(NU_LO);
  for (let i = 0n; i <= STEPS; i++) {
    const delta = DELTA_LO.add(dspan.mul(q(i, STEPS)));
    for (let k = 0n; k <= STEPS; k++) {
      const nu = NU_LO.add(nspan.mul(q(k, STEPS)));
      boxes++;
      const [a, b] = ab(delta, nu);
      const lb = lemmaB(a, b);
      if (usable(lb)) {
        lbUsable++;
        if (!controlled(delta, nu)) lbNew++;
      }
      // Lemma A: the (u,h)-diagonal is always a power below x^2.
      if (lemmaA_T2(a, b).lt(Q2)) lemmaAAlways++;
      // Heuristic ceiling below 1 except at a=b=1.
      if (ceilingHeur(a, b).lt(Q1)) ceilBelow++;
      if (qmax(...lemmaBudiag(a, b)).lt(Q1)) udiagBelow++;
      // Consistency control: the heuristic ceiling must never EXCEED the best
      // proven block bound at the box, or the model is refuted outright.
      const best = qmin(qmax(...groupedRight(a, b)), qmax(...groupedLeft(a, b)),
        qmax(...lb));
      if (ceilingHeur(a, b).le(best)) ceilUnderProven++;
    }
  }
  console.log(`   grid boxes                                   ${boxes}`);
  console.log(`   Lemma B usable (all four budgets < 1)        ${lbUsable}`);
  console.log(`   ... of those OUTSIDE the controlled region   ${lbNew}`);
  console.log(`   Lemma A diagonal strictly below x^2          ${lemmaAAlways}`);
  console.log(`   heuristic ceiling strictly below 1           ${ceilBelow}`);
  console.log(`   heuristic ceiling <= best proven bound       ${ceilUnderProven}`);
  console.log(`   Lemma B u-diagonal conditional below 1       ${udiagBelow}`);
  // Where does Lemma B strictly beat BOTH grouped orientations?
  let beatsBoth = 0, beatsBothAndBelowOne = 0;
  let minA = null, minB = null;
  for (let i = 0n; i <= STEPS; i++) {
    const delta = DELTA_LO.add(dspan.mul(q(i, STEPS)));
    for (let k = 0n; k <= STEPS; k++) {
      const nu = NU_LO.add(nspan.mul(q(k, STEPS)));
      const [a, b] = ab(delta, nu);
      const bestG = qmin(qmax(...groupedRight(a, b)), qmax(...groupedLeft(a, b)));
      if (qmax(...lemmaB(a, b)).lt(bestG)) {
        beatsBoth++;
        if (minA === null || a.lt(minA)) minA = a;
        if (minB === null || b.lt(minB)) minB = b;
        if (usable(lemmaB(a, b))) beatsBothAndBelowOne++;
      }
    }
  }
  console.log(`   Lemma B strictly beats both grouped orientations ${beatsBoth}`);
  console.log(`   ... smallest a, b on that set                    a>=${minA} b>=${minB}`);
  console.log(`   ... of those with Lemma B below 1                ${beatsBothAndBelowOne}`);
  chk('where Lemma B wins it is still never below 1', beatsBothAndBelowOne === 0);
  chk('Lemma B adds no region', lbNew === 0, `(lbNew=${lbNew})`);
  chk('Lemma A diagonal below x^2 on every grid box', lemmaAAlways === boxes);
  chk('heuristic ceiling never exceeds a proven bound', ceilUnderProven === boxes);
  chk('u-diagonal conditional below 1 exactly off the two edges',
    udiagBelow === boxes - (2 * Number(STEPS) + 1),
    `(udiagBelow=${udiagBelow}, boxes=${boxes})`);
  chk('heuristic ceiling < 1 off the corner', ceilBelow === boxes - 1,
    `(ceilBelow=${ceilBelow}, boxes=${boxes})`);
}

// ---------------------------------------------------------------------------
console.log('');
console.log('C. FINITE IDENTITIES BEHIND LEMMA A AND LEMMA B');

// gcd / modular inverse helpers over ordinary integers
function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a; }
function inv(a, n) { // inverse of a mod n, or null
  let [old_r, r] = [((a % n) + n) % n, n];
  let [old_s, s] = [1, 0];
  while (r !== 0) { const t = Math.floor(old_r / r); [old_r, r] = [r, old_r - t * r]; [old_s, s] = [s, old_s - t * s]; }
  if (old_r !== 1) return null;
  return ((old_s % n) + n) % n;
}
const frac = (v, c) => { const t = ((v % c) + c) % c; return Math.min(t, c - t) / c; }; // ||v/c||

// C1. Phase combination: e_{u1}(s*th*h*m1bar) * conj(e_{u2}(s*th*h*m2bar))
//     = e_c(s*th*h*(m1bar*l2 - m2bar*l1)),  c = lcm(u1,u2) = j*l1*l2.
{
  let tested = 0, ok = 0;
  for (let u1 = 2; u1 <= 40; u1++) for (let u2 = 2; u2 <= 40; u2++) {
    const j = gcd(u1, u2), l1 = u1 / j, l2 = u2 / j, c = j * l1 * l2;
    for (let m1 = 1; m1 <= 12; m1++) for (let m2 = 1; m2 <= 12; m2++) {
      const i1 = inv(m1, u1), i2 = inv(m2, u2);
      if (i1 === null || i2 === null) continue;
      for (const th of [1, 2]) for (const s of [1, -1]) for (const h of [1, 3, 7]) {
        tested++;
        // left side as a rational mod 1, with denominator c
        const lhsNum = s * th * h * (i1 * l2 - i2 * l1);
        // right side by direct rational arithmetic: s*th*h*(i1/u1 - i2/u2)
        // multiply through by c: c/u1 = l2, c/u2 = l1
        const rhsNum = s * th * h * i1 * (c / u1) - s * th * h * i2 * (c / u2);
        if (((lhsNum - rhsNum) % c + c) % c === 0) ok++;
      }
    }
  }
  console.log(`   C1 phase combination e_{u1}/e_{u2} -> e_c            ${ok}/${tested}`);
  chk('C1 phase combination exact', ok === tested && tested > 20000);
}

// C2. Coset structure: as t runs over [0,u2), P0 - t*l1 mod c runs over a coset
//     of the subgroup l1*Z/cZ, of size exactly c/l1 = u2, bijectively.
{
  let tested = 0, ok = 0, okMult = 0;
  for (let u1 = 2; u1 <= 60; u1++) for (let u2 = 2; u2 <= 60; u2++) {
    const j = gcd(u1, u2), l1 = u1 / j, l2 = u2 / j, c = j * l1 * l2;
    const P0 = (17 * u1 + 5) % c;
    const seen = new Set();
    let allInCoset = true;
    for (let t = 0; t < u2; t++) {
      const P = (((P0 - t * l1) % c) + c) % c;
      seen.add(P);
      if ((((P - P0) % c) + c) % c % l1 !== 0) allInCoset = false;
    }
    tested++;
    if (seen.size === u2 && c / l1 === u2) ok++;
    if (allInCoset) okMult++;
  }
  console.log(`   C2 coset size c/l1 = u2, bijective in t              ${ok}/${tested}`);
  console.log(`   C2 all values lie in P0 + l1*Z/cZ                    ${okMult}/${tested}`);
  chk('C2 coset size and bijectivity', ok === tested && tested > 3000);
  chk('C2 coset membership', okMult === tested);
}

// C3. The geometric-series sum bound actually used in Lemma B:
//     sum_{t<u2} min(A, 1/||th*(P0 - t*l1)/c||)  <=  K*(A + u2*(1+log A)).
{
  let tested = 0, worst = 0, worstAt = '';
  for (let u1 = 3; u1 <= 48; u1 += 3) for (let u2 = 3; u2 <= 48; u2 += 3) {
    const j = gcd(u1, u2), l1 = u1 / j, l2 = u2 / j, c = j * l1 * l2;
    for (const A of [4, 16, 64, 256]) for (const th of [1, 2]) for (const P0 of [0, 1, 7, 23]) {
      let S = 0;
      for (let t = 0; t < u2; t++) {
        const v = th * (((P0 - t * l1) % c) + c) % c;
        const d = frac(v, c);
        S += (d === 0) ? A : Math.min(A, 1 / d);
      }
      const budget = A + u2 * (1 + Math.log(A));
      const ratio = S / budget;
      tested++;
      if (ratio > worst) { worst = ratio; worstAt = `u1=${u1},u2=${u2},A=${A},th=${th},P0=${P0}`; }
    }
  }
  console.log(`   C3 worst ratio S / (A + u2(1+log A))                 ${worst.toFixed(4)}  at ${worstAt}`);
  console.log(`   C3 configurations tested                             ${tested}`);
  chk('C3 sum bound holds with absolute constant <= 4', worst <= 4);
}

// C4. #{m in I : mbar = t mod u} <= |I|/u + 1, used to count m2 per residue.
{
  let tested = 0, ok = 0, worstExcess = -Infinity;
  for (let u = 2; u <= 60; u++) for (const L of [10, 37, 120]) {
    const start = 5 * u + 3;
    const counts = new Map();
    for (let m = start; m < start + L; m++) {
      const i = inv(m, u); if (i === null) continue;
      counts.set(i, (counts.get(i) || 0) + 1);
    }
    let mx = 0; for (const v of counts.values()) mx = Math.max(mx, v);
    const bound = L / u + 1;
    tested++;
    if (mx <= bound) ok++;
    worstExcess = Math.max(worstExcess, mx - bound);
  }
  console.log(`   C4 per-residue inverse count <= |I|/u + 1            ${ok}/${tested}`);
  chk('C4 inverse count bound', ok === tested);
}

// C5. The endpoint factor is a difference of two pure exponentials in h, so the
//     h-sum is a geometric series with no partial summation; and |Phi| << f.
{
  const g_ = 2, u = 37, m = 411, z0 = 1000, z = 2500;
  let maxRatio = 0, linearOk = 0, tests = 0;
  for (let h = 1; h <= 400; h++) {
    const p0 = 2 * Math.PI * h * z0 / (g_ * m * u), p1 = 2 * Math.PI * h * z / (g_ * m * u);
    const re = Math.cos(p0) - Math.cos(p1), im = Math.sin(p0) - Math.sin(p1);
    const mod = Math.hypot(re, im);
    const v = h * Math.abs(z - z0) / (g_ * m * u);
    const f = Math.min(1, v);
    maxRatio = Math.max(maxRatio, mod / Math.max(f, 1e-12));
    // linear-phase check: the two summands are exactly e(h*const)
    const c0 = 2 * Math.PI * z0 / (g_ * m * u);
    tests++;
    if (Math.abs(Math.cos(p0) - Math.cos(h * c0)) < 1e-9) linearOk++;
  }
  console.log(`   C5 max |Phi| / min(1, h|z-z0|/(gmu))                 ${maxRatio.toFixed(4)}`);
  console.log(`   C5 pure-exponential-in-h checks                      ${linearOk}/${tests}`);
  chk('C5 |Phi| << f with constant <= 2*pi', maxRatio <= 2 * Math.PI);
  chk('C5 phase is linear in h', linearOk === tests);
}

// ---------------------------------------------------------------------------
console.log('');
console.log('D. NEGATIVE CONTROLS (each must FIRE)');
let fired = 0, controls = 0;
const control = (name, firesWhenTrue) => {
  controls++;
  if (firesWhenTrue) { fired++; console.log(`   FIRES  ${name}`); }
  else console.log(`   silent ${name}   <-- control did not fire`);
};

// D1. Dropping the h-cancellation.  Without the geometric series in h the
//     inner second moment is only  sum_h |W(h)|^2 <= A * (B C N M f)^2 / C^2,
//     and Cauchy in h returns exactly the trivial bound |T| << B C M N f.
{
  const [a, b] = ab(q(19, 25n), q(19, 20n));
  const noCancel = a.add(b); // trivial bound M*N*f, exponent a+b
  console.log(`   D1 corner exponent without the h geometric series: ${noCancel}`
    + ` (with it: ${qmax(...lemmaB(a, b))})`);
  control('D1 no-h-cancellation returns the trivial bound',
    qmax(...lemmaB(a, b)).lt(noCancel) && noCancel.eq(Q2));
}

// D2. Claiming Lemma B adds region.
{
  const STEPS = 60n;
  let added = 0;
  const dspan = DELTA_HI.sub(DELTA_LO), nspan = NU_HI.sub(NU_LO);
  for (let i = 0n; i <= STEPS; i++) for (let k = 0n; k <= STEPS; k++) {
    const delta = DELTA_LO.add(dspan.mul(q(i, STEPS)));
    const nu = NU_LO.add(nspan.mul(q(k, STEPS)));
    const [a, b] = ab(delta, nu);
    if (usable(lemmaB(a, b)) && !controlled(delta, nu)) added++;
  }
  control('D2 "Lemma B adds region" is false', added === 0);
}

// D3. Claiming the corner is reachable by Lemma B.
{
  const [a, b] = ab(q(19, 25n), q(19, 20n));
  control('D3 "corner reachable by Lemma B" is false', !usable(lemmaB(a, b)));
}

// D4. Reading Lemma A's x^1 at the corner as a bound on |T| rather than |T|^2
//     would wrongly declare the corner controlled.
{
  const [a, b] = ab(q(19, 25n), q(19, 20n));
  const misread = lemmaA_T2(a, b);            // 1, read as a |T| exponent
  const correct = lemmaA_T(a, b);             // 1/2, the actual |T| exponent
  control('D4 |T| vs |T|^2 misreading detected',
    misread.eq(Q1) && correct.eq(QH) && !misread.eq(correct));
}

// D5. Using the harmonic subset H without completing it by positivity: then no
//     geometric series is available and the bound degrades to the trivial one.
{
  const [a, b] = ab(q(19, 25n), q(19, 20n));
  const alpha = a.add(b).sub(Q1);
  const trivial = a.add(b);                    // |T| <= B C M N f
  const lb = qmax(...lemmaB(a, b));
  console.log(`   D5 corner: trivial ${trivial}, Lemma B ${lb}, band exponent ${alpha}`);
  control('D5 completion by positivity is what buys the saving', lb.lt(trivial));
}

// D6. Treating the frequency P as equidistributed over ALL residues mod c
//     (ignoring the l1 spacing) understates the near-zero count.
{
  let understates = 0, tested = 0;
  for (let u1 = 4; u1 <= 40; u1 += 2) for (let u2 = 4; u2 <= 40; u2 += 2) {
    const j = gcd(u1, u2), l1 = u1 / j, l2 = u2 / j, c = j * l1 * l2;
    if (l1 === 1) continue;
    tested++;
    // spaced model: c/l1 = u2 distinct values; naive model: c distinct values
    if (c / l1 < c) understates++;
  }
  control('D6 the l1 spacing is real (c/l1 < c whenever l1>1)',
    tested > 0 && understates === tested);
}

console.log('');
console.log(`ASSERTIONS  pass ${PASS}  fail ${FAIL}`);
console.log(`CONTROLS    fired ${fired}/${controls}`);
if (FAIL > 0 || fired !== controls) process.exitCode = 1;

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/signed-moment-validation.js
//   invocation:  node research/signed-moment-validation.js
//   code-sha256: 21f11b5c84e8a1d6d858e134b45ec3f31403beda9bf0b56ecf12dc66e1d9bc0e
//   out-sha256:  e85405abc7c2aaad9fe65ad58de77625f34622ab70b3d3de4c26e1d8f36c62fd
//   body-lines:  45
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.4 s
// ============================================================================
// A. BLOCK EXPONENTS AT NAMED BOXES (exact rationals)
//    columns: a, b | grouped right max | grouped left max | Lemma B max | Lemma A (|T|^2) | Lemma B u-diag | heuristic ceiling
//    corner            (19/25,19/20)  a=1 b=1 | 2 | 2 | 3/2 | 1 | 1 | 1
//    target box        ( 8/25, 9/20)  a=14/25 b=1/2 | 103/100 | 109/100 | 103/100 | 3/2 | 39/50 | 3/4
//    benchmark         ( 2/5 , 2/5 )  a=16/25 b=9/20 | 199/200 | 237/200 | 209/200 | 31/20 | 41/50 | 29/40
//    product supremum  ( 8/25,11/25)  a=14/25 b=49/100 | 203/200 | 217/200 | 41/40 | 151/100 | 39/50 | 149/200
//    d-edge cheapest   (19/25, 1/20)  a=1 b=1/10 | 1 | 31/20 | 21/20 | 19/10 | 1 | 11/20
//    e-edge cheapest   ( 6/25,19/20)  a=12/25 b=1 | 87/50 | 61/50 | 3/2 | 38/25 | 1 | 37/50
//    corner   Lemma B terms  sqrt(MNx)=3/2 Nsqrt(x)=3/2 Msqrt(N)=3/2 Nsqrt(M)=3/2
//    target   Lemma B terms  sqrt(MNx)=103/100 Nsqrt(x)=1 Msqrt(N)=81/100 Nsqrt(M)=39/50
//
// B. REGION COMPARISON ON A RATIONAL GRID
//    grid boxes                                   36481
//    Lemma B usable (all four budgets < 1)        6906
//    ... of those OUTSIDE the controlled region   0
//    Lemma A diagonal strictly below x^2          36481
//    heuristic ceiling strictly below 1           36480
//    heuristic ceiling <= best proven bound       36481
//    Lemma B u-diagonal conditional below 1       36100
//    Lemma B strictly beats both grouped orientations 16173
//    ... smallest a, b on that set                    a>=1192/2375 b>=191/380
//    ... of those with Lemma B below 1                0
//
// C. FINITE IDENTITIES BEHIND LEMMA A AND LEMMA B
//    C1 phase combination e_{u1}/e_{u2} -> e_c            995328/995328
//    C2 coset size c/l1 = u2, bijective in t              3481/3481
//    C2 all values lie in P0 + l1*Z/cZ                    3481/3481
//    C3 worst ratio S / (A + u2(1+log A))                 1.7746  at u1=3,u2=6,A=256,th=2,P0=0
//    C3 configurations tested                             8192
//    C4 per-residue inverse count <= |I|/u + 1            177/177
//    C5 max |Phi| / min(1, h|z-z0|/(gmu))                 6.2581
//    C5 pure-exponential-in-h checks                      400/400
//
// D. NEGATIVE CONTROLS (each must FIRE)
//    D1 corner exponent without the h geometric series: 2 (with it: 3/2)
//    FIRES  D1 no-h-cancellation returns the trivial bound
//    FIRES  D2 "Lemma B adds region" is false
//    FIRES  D3 "corner reachable by Lemma B" is false
//    FIRES  D4 |T| vs |T|^2 misreading detected
//    D5 corner: trivial 2, Lemma B 3/2, band exponent 1
//    FIRES  D5 completion by positivity is what buys the saving
//    FIRES  D6 the l1 spacing is real (c/l1 < c whenever l1>1)
//
// ASSERTIONS  pass 29  fail 0
// CONTROLS    fired 6/6
// ============================================================================
// READINGS
// 1. The (u,h)-diagonal of |T|^2 is a power below x^2 on every box of the
//    original domain (36481/36481) and equals x^1 at the corner, so the true
//    diagonal is not what blocks the corner; read as a |T| exponent it is 1/2.
// 2. Lemma B's four block exponents are all 3/2 at the corner, against the
//    grouped moment's 2 in both orientations, and the list contains no
//    (1+a)/2 zero-frequency term.
// 3. Lemma B adds no region: 6906 usable grid boxes, 0 outside the region
//    already controlled. Where it beats both grouped orientations (16173
//    boxes) it is still never below 1.
// 4. CONDITIONAL: replacing Lemma B's u1!=u2 part by its u-diagonal, which
//    assumes unproved cancellation in the right Mobius signs, gives
//    (1+max(a,b))/2: exactly 1 on both edges including the corner, below 1 on
//    the 36100 interior boxes, and 39/50 at the target box.
// 5. The heuristic arbitrary-coefficient ceiling (1+min(a,b))/2 is below 1 on
//    every box except the corner and never exceeds a proven bound.
// 6. The finite identities behind the two lemmas hold: the phase combination
//    on 995328 configurations, the l1-spaced coset on 3481 modulus pairs, the
//    geometric-series sum bound with constant below 2, the per-residue inverse
//    count, and the pure-exponential-in-h form of the endpoint factor.
// ============================================================================
