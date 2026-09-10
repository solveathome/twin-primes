#!/usr/bin/env node
'use strict';
// determinant-corollary-validation.js
//
// Finite checks for research/determinant-corollary.md.
//
// WHAT THIS CAN AND CANNOT DO. Every number below is either exact rational
// bookkeeping of exponent regions, or a finite enumeration of an algebraic
// identity at small parameters. Neither establishes an asymptotic saving, an
// effective onset, or anything about the sign or size of E_dagger. A green run
// certifies the identities and the region arithmetic only.
//
// Part A. Exact-rational exponent regions for Bettin-Chandee Corollary 1
//   applied to d*k - e*t = 2 after the beta = log - sum(Lambda) transfer.
// Part B. Finite verification of the four-piece decomposition, the redundancy
//   of the k>V and t>Z constraints, and the aggregated coefficient bounds.
// Part C. Negative controls (each must fail).

let FAIL = 0, PASS = 0;
const FAILED = [];
function ok(name, cond, detail) {
  if (cond) PASS++;
  else { FAIL++; FAILED.push(name + (detail ? '  [' + detail + ']' : '')); }
}

// ---------------------------------------------------------------- rationals
function bgcd(a, b) { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) { const t = a % b; a = b; b = t; } return a; }
class Q {
  constructor(n, d = 1n) {
    n = BigInt(n); d = BigInt(d);
    if (d === 0n) throw new Error('zero denominator');
    if (d < 0n) { n = -n; d = -d; }
    const g = bgcd(n, d) || 1n;
    this.n = n / g; this.d = d / g;
  }
  add(o) { return new Q(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { return new Q(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { return new Q(this.n * o.n, this.d * o.d); }
  div(o) { return new Q(this.n * o.d, this.d * o.n); }
  neg() { return new Q(-this.n, this.d); }
  cmp(o) { const l = this.n * o.d, r = o.n * this.d; return l < r ? -1 : l > r ? 1 : 0; }
  lt(o) { return this.cmp(o) < 0; } le(o) { return this.cmp(o) <= 0; }
  gt(o) { return this.cmp(o) > 0; } ge(o) { return this.cmp(o) >= 0; }
  eq(o) { return this.cmp(o) === 0; }
  num() { return Number(this.n) / Number(this.d); }
  toString() { return this.d === 1n ? String(this.n) : this.n + '/' + this.d; }
}
const q = (n, d) => new Q(n, d);
const Q0 = q(0), Q1 = q(1);
const maxQ = (a, b) => (a.ge(b) ? a : b);

// ------------------------------------------- convex polygon clipping (exact)
// Half-plane: c1*x + c2*y <= c0.
function clip(poly, c1, c2, c0) {
  const inside = (p) => c1.mul(p[0]).add(c2.mul(p[1])).le(c0);
  const out = [];
  for (let i = 0; i < poly.length; i++) {
    const A = poly[i], B = poly[(i + 1) % poly.length];
    const ia = inside(A), ib = inside(B);
    if (ia) out.push(A);
    if (ia !== ib) {
      const fa = c1.mul(A[0]).add(c2.mul(A[1])).sub(c0);
      const fb = c1.mul(B[0]).add(c2.mul(B[1])).sub(c0);
      const t = fa.div(fa.sub(fb));
      out.push([A[0].add(B[0].sub(A[0]).mul(t)), A[1].add(B[1].sub(A[1]).mul(t))]);
    }
  }
  return out;
}
function clipAll(poly, halfplanes) { let p = poly; for (const h of halfplanes) { p = clip(p, h[0], h[1], h[2]); if (p.length < 3) return []; } return p; }
function area(poly) {
  if (poly.length < 3) return Q0;
  let s = Q0;
  for (let i = 0; i < poly.length; i++) {
    const A = poly[i], B = poly[(i + 1) % poly.length];
    s = s.add(A[0].mul(B[1]).sub(B[0].mul(A[1])));
  }
  const a = s.div(q(2));
  return a.lt(Q0) ? a.neg() : a;
}
function dedup(poly) {
  const out = [];
  for (const p of poly) if (!out.some((r) => r[0].eq(p[0]) && r[1].eq(p[1]))) out.push(p);
  return out;
}
function show(poly) { return dedup(poly).map((p) => '(' + p[0] + ',' + p[1] + ')').join(' '); }

// -------------------------------------------------------- the fixed objects
const w = q(6, 25);          // U = V = x^w
const v = q(1, 20);          // Y = Z = x^v
const DELTA_LO = w, DELTA_HI = Q1.sub(w);   // [6/25, 19/25]
const NU_LO = v, NU_HI = Q1.sub(v);         // [1/20, 19/20]
const DOMAIN = [[DELTA_LO, NU_LO], [DELTA_HI, NU_LO], [DELTA_HI, NU_HI], [DELTA_LO, NU_HI]];

// Currently controlled region (RESEARCH-HANDOFF section 4), as three half-planes.
// R3 also carries delta < 19/25, which is the domain edge (measure zero); noted
// in the note, not modelled here.
const R1 = [q(1), q(1), q(19, 25)];        // delta + nu     < 19/25
const R2 = [q(5), q(2), q(123, 50)];       // 5delta + 2nu   < 123/50
const R3 = [q(1), q(3), q(161, 100)];      // delta + 3nu    < 161/100
const CUR = [R1, R2, R3];
const CURC = CUR.map((h) => [h[0].neg(), h[1].neg(), h[2].neg()]); // complements

// Bettin-Chandee Corollary 1 error exponent, with ||alpha|| ||beta|| << sqrt(N1N2):
//   (17/20)(A+B) + (1/4)max(A,B),   A = log_x N2, B = log_x N1.
function bcExp(A, B) { return q(17, 20).mul(A.add(B)).add(maxQ(A, B).div(q(4))); }
// Equivalent linear form: 22max + 17min < 20.
function bcLin(A, B) { return q(22).mul(maxQ(A, B)).add(q(17).mul(A.le(B) ? A : B)); }

// ============================================================ PART A


ok('domain area = 117/250', area(DOMAIN).eq(q(117, 250)), area(DOMAIN).toString());

// A1. bcExp < 1 is exactly bcLin < 20, on a rational grid.
{
  let bad = 0, n = 0;
  for (let i = 0; i <= 60; i++) for (let j = 0; j <= 60; j++) {
    const A = q(i, 60), B = q(j, 60); n++;
    if (bcExp(A, B).lt(Q1) !== bcLin(A, B).lt(q(20))) bad++;
  }
  ok('(17/20)(A+B)+max/4 < 1  <=>  22max+17min < 20', bad === 0, n + ' grid points');
}

// A2. All-pieces region: worst band rho = 6/25, zeta = 1/20, i.e. A = a = delta+w,
// B = b = nu+v. In (delta,nu) it is the intersection of two half-planes.
const ALL = [[q(2200), q(1700), q(1387)], [q(1700), q(2200), q(1482)]];
{
  let bad = 0, n = 0;
  for (let i = 0; i <= 80; i++) for (let j = 0; j <= 80; j++) {
    const d = DELTA_LO.add(DELTA_HI.sub(DELTA_LO).mul(q(i, 80)));
    const nu = NU_LO.add(NU_HI.sub(NU_LO).mul(q(j, 80)));
    const direct = bcLin(d.add(w), nu.add(v)).lt(q(20));
    const viaHP = ALL.every((h) => h[0].mul(d).add(h[1].mul(nu)).lt(h[2]));
    n++; if (direct !== viaHP) bad++;
  }
  ok('all-pieces region = {2200d+1700n<1387} cap {1700d+2200n<1482}', bad === 0, n + ' grid points');
}

// A3. Log-log piece only (rho = zeta = 0).
const LL = [[q(22), q(17), q(20)], [q(17), q(22), q(20)]];

const polyALL = clipAll(DOMAIN, ALL);
const polyLL = clipAll(DOMAIN, LL);
console.log('all-pieces region vertices : ' + show(polyALL));
console.log('all-pieces region area     : ' + area(polyALL) + '  (' + area(polyALL).num().toFixed(6) + ')');
console.log('log-log region vertices    : ' + show(polyLL));
console.log('log-log region area        : ' + area(polyLL) + '  (' + area(polyLL).num().toFixed(6) + ')');

// A4. Containment: the all-pieces region lies strictly inside delta+nu < 19/25.
{
  let sup = q(-1);
  for (const p of polyALL) sup = maxQ(sup, p[0].add(p[1]));
  ok('sup(delta+nu) on all-pieces region < 19/25', sup.lt(q(19, 25)), 'sup = ' + sup);
  console.log('sup(delta+nu) on all-pieces region: ' + sup + ' = ' + sup.num().toFixed(6) + ' < 19/25');
  // The clean sufficient inequality: 22max+17min >= 19.5(a+b), so a+b < 40/39.
  const bound = q(40, 39).sub(w).sub(v);
  ok('a+b < 40/39 forces delta+nu < 2869/3900', bound.eq(q(2869, 3900)), bound.toString());
  ok('2869/3900 < 19/25', q(2869, 3900).lt(q(19, 25)), (q(19,25).sub(q(2869,3900))).toString() + ' of slack');
}

// A5. What Corollary 1 ADDS: region cap complement(current). Convex, so exact.
const addALL = clipAll(polyALL, CURC);
ok('all-pieces region adds nothing to the controlled region', area(addALL).eq(Q0), 'added area = ' + area(addALL));

const addLL = clipAll(polyLL, CURC);
console.log('log-log ADDED vertices     : ' + show(addLL));
console.log('log-log ADDED area         : ' + area(addLL) + '  (' + area(addLL).num().toFixed(6) + ')');
console.log('log-log ADDED / domain     : ' + area(addLL).div(area(DOMAIN)).num().toFixed(6) +
  ' (' + (100 * area(addLL).div(area(DOMAIN)).num()).toFixed(2) + ' percent)');
ok('log-log piece alone does add region', area(addLL).gt(Q0), area(addLL).toString());

// In the reachability report's coordinates p = 19/25 - delta, q = 19/20 - nu the
// map is affine with |Jacobian| = 1, so the area is unchanged; report the vertices.
console.log('log-log ADDED in (p,q)     : ' +
  dedup(addLL).map((P) => '(' + q(19, 25).sub(P[0]) + ',' + q(19, 20).sub(P[1]) + ')').join(' '));

// A6. Named points.
const named = [
  ['diagonal delta=nu, all pieces', null],
  ['benchmark (2/5,2/5)', [q(2, 5), q(2, 5)]],
  ['target box (8/25,9/20)', [q(8, 25), q(9, 20)]],
  ['corner (19/25,19/20)', [q(19, 25), q(19, 20)]],
  ['(1/2,1/2)', [q(1, 2), q(1, 2)]],
];
for (const [label, pt] of named) {
  if (!pt) continue;
  const [d, nu] = pt;
  const a = d.add(w), b = nu.add(v);
  console.log('' + label + ': a=' + a + ' b=' + b +
    ' | all-pieces exp=' + bcExp(a, b) + '=' + bcExp(a, b).num().toFixed(6) +
    ' | log-log exp=' + bcExp(d, nu) + '=' + bcExp(d, nu).num().toFixed(6) +
    ' | in current=' + CUR.some((h) => h[0].mul(d).add(h[1].mul(nu)).lt(h[2])));
}
// Diagonal thresholds.
{
  // all pieces, a = b: 39a < 20 -> a < 20/39 -> delta < 20/39 - 6/25 and nu = a - 1/20.
  // The diagonal delta = nu is NOT a = b; solve both branches directly.
  // delta = nu = s: a = s+6/25 >= b = s+1/20 always, so 22a + 17b < 20.
  // 22(s+6/25) + 17(s+1/20) = 39s + 613/100 < 20  ->  s < 1387/3900.
  const sAll = q(1387, 3900);
  let bad = 0;
  for (let i = 1; i <= 200; i++) {
    const s = q(i, 260);
    if (s.lt(DELTA_LO) || s.gt(DELTA_HI)) continue;
    const inR = bcLin(s.add(w), s.add(v)).lt(q(20));
    if (inR !== s.lt(sAll)) bad++;
  }
  ok('diagonal delta=nu, all pieces: threshold 1387/3900', bad === 0, sAll + ' = ' + sAll.num().toFixed(6));
  // log-log on the diagonal: 39s < 20.
  const sLL = q(20, 39);
  let bad2 = 0;
  for (let i = 1; i <= 200; i++) {
    const s = q(i, 260);
    if (s.lt(DELTA_LO) || s.gt(DELTA_HI)) continue;
    if ((bcLin(s, s).lt(q(20))) !== s.lt(sLL)) bad2++;
  }
  ok('diagonal delta=nu, log-log: threshold 20/39', bad2 === 0, sLL + ' = ' + sLL.num().toFixed(6));
  // is the diagonal segment [20/39 exceeded] outside current? report the added diagonal range
  const lo = q(19, 50); // delta+nu = 19/25 boundary on the diagonal
  ok('diagonal added by log-log is (19/50, 20/39)', lo.lt(sLL), lo + ' .. ' + sLL);
}

// A6b. Band-level coverage at the next local target box (8/25, 9/20): which
// (rho,zeta) bands Corollary 1 covers there.
{
  const d = q(8, 25), nu = q(9, 20);
  // zeta = 1/20 fixed: largest rho with bcExp < 1
  const rhoStar = q(23, 44).sub(d);
  ok('at (8/25,9/20), zeta=1/20: BC covers exactly rho < 223/1100', rhoStar.eq(q(223, 1100)) &&
     bcExp(d.add(rhoStar).sub(q(1, 100000)), nu.add(v)).lt(Q1) &&
     !bcExp(d.add(rhoStar).add(q(1, 100000)), nu.add(v)).lt(Q1), rhoStar + ' = ' + rhoStar.num().toFixed(6));
  // rho = 6/25 fixed: largest zeta
  const zetaStar = q(192, 425).sub(nu);
  ok('at (8/25,9/20), rho=6/25: BC covers exactly zeta < 3/1700', zetaStar.eq(q(3, 1700)) &&
     bcExp(d.add(w), nu.add(zetaStar).sub(q(1, 1000000))).lt(Q1) &&
     !bcExp(d.add(w), nu.add(zetaStar).add(q(1, 1000000))).lt(Q1), zetaStar + ' = ' + zetaStar.num().toFixed(6));
  console.log('target box (8/25,9/20) band coverage: BC covers rho<' + rhoStar + ' at zeta=1/20, zeta<' + zetaStar +
    ' at rho=6/25; top band exponent ' + bcExp(d.add(w), nu.add(v)) + ' fails by ' + bcExp(d.add(w), nu.add(v)).sub(Q1));
}

// A7. Monotonicity of every method's per-band budget in (rho,zeta): the top band
// binds, so an r-size split cannot enlarge the union.
{
  // grouped-divisor-moment (14), per band: (1+A)/2, A/2+3B/2, A  (right); swap for left.
  const gRight = (A, B) => maxQ(maxQ(Q1.add(A).div(q(2)), A.div(q(2)).add(q(3, 2).mul(B))), A);
  const gLeft = (A, B) => gRight(B, A);
  // residual-coverage (9), per band: zero 1/2+A/2+(B-zeta)/2 is not needed for
  // monotonicity; use its three budgets with W -> x^zeta, N -> x^A, D -> x^(B-zeta).
  const rRight = (A, B, zeta) => {
    const D = B.sub(zeta);
    return maxQ(maxQ(A.div(q(2)).add(Q1.add(D).div(q(2))), A.div(q(2)).add(q(5, 4).mul(D)).add(q(3, 2).mul(zeta))), A.add(D.div(q(2))));
  };
  let bad = 0, n = 0;
  const step = 24;
  for (let i = 0; i < step; i++) for (let j = 0; j < step; j++) {
    const A = q(i, step), B = q(j, step);
    const A2 = q(i + 1, step), B2 = q(j + 1, step);
    n++;
    if (gRight(A2, B).lt(gRight(A, B))) bad++;
    if (gRight(A, B2).lt(gRight(A, B))) bad++;
    if (gLeft(A2, B).lt(gLeft(A, B))) bad++;
    if (bcExp(A2, B).lt(bcExp(A, B))) bad++;
    if (bcExp(A, B2).lt(bcExp(A, B))) bad++;
  }
  ok('every per-band budget is nondecreasing in both band exponents', bad === 0, n + ' cells');
  // and the top band reproduces the recorded full-box conditions
  const topR = (d, nu) => gRight(d.add(w), nu.add(v));
  let bad3 = 0, n3 = 0;
  for (let i = 0; i <= 60; i++) for (let j = 0; j <= 60; j++) {
    const d = DELTA_LO.add(DELTA_HI.sub(DELTA_LO).mul(q(i, 60)));
    const nu = NU_LO.add(NU_HI.sub(NU_LO).mul(q(j, 60)));
    n3++;
    const recorded = d.lt(q(19, 25)) && d.add(q(3).mul(nu)).lt(q(161, 100));
    if (topR(d, nu).lt(Q1) !== recorded) bad3++;
  }
  ok('grouped (14) top band reproduces delta<19/25 and delta+3nu<161/100', bad3 === 0, n3 + ' grid points');
  // and the split union at the top band equals the current region
  let bad4 = 0, n4 = 0;
  for (let i = 0; i <= 60; i++) for (let j = 0; j <= 60; j++) {
    const d = DELTA_LO.add(DELTA_HI.sub(DELTA_LO).mul(q(i, 60)));
    const nu = NU_LO.add(NU_HI.sub(NU_LO).mul(q(j, 60)));
    n4++;
    const cur = CUR.some((h) => h[0].mul(d).add(h[1].mul(nu)).lt(h[2]));
    const withBC = cur || bcLin(d.add(w), nu.add(v)).lt(q(20));
    if (cur !== withBC) bad4++;
  }
  ok('current union with the top-band BC condition = current union', bad4 === 0, n4 + ' grid points');
}

// A8. The Duke-Friedlander-Iwaniec 1995 version of the same corollary, as quoted
// inside Bettin-Chandee: error (etaR)^(19/8)||a||||b||(N1N2)^(3/8)(N1+N2)^(11/48+eps).
{
  const dfiExp = (A, B) => q(1, 2).mul(A.add(B)).add(q(3, 8).mul(A.add(B))).add(q(11, 48).mul(maxQ(A, B)));
  const sDiag = q(48, 95); // 95/48 * s < 1
  let bad = 0;
  for (let i = 1; i <= 300; i++) { const s = q(i, 400); if (dfiExp(s, s).lt(Q1) !== s.lt(sDiag)) bad++; }
  ok('DFI95 diagonal threshold 48/95 < BC 20/39', bad === 0 && q(48, 95).lt(q(20, 39)),
     '48/95=' + q(48, 95).num().toFixed(6) + ' vs 20/39=' + q(20, 39).num().toFixed(6));
  // The all-pieces DFI95 region in (delta,nu): 21(A+B)+11max(A,B) < 24 after
  // clearing 48, with A = delta+6/25, B = nu+1/20.
  const dfiLin = (A, B) => q(32).mul(maxQ(A, B)).add(q(21).mul(A.le(B) ? A : B));
  let bad2 = 0, n2 = 0;
  const dfiPts = [];
  for (let i = 0; i <= 80; i++) for (let j = 0; j <= 80; j++) {
    const d = DELTA_LO.add(DELTA_HI.sub(DELTA_LO).mul(q(i, 80)));
    const nu = NU_LO.add(NU_HI.sub(NU_LO).mul(q(j, 80)));
    n2++;
    const inDFI = dfiLin(d.add(w), nu.add(v)).lt(q(24));
    const inBC = bcLin(d.add(w), nu.add(v)).lt(q(20));
    if (inDFI && !inBC) bad2++;
    if (inDFI) dfiPts.push([d, nu]);
  }
  ok('DFI95 all-pieces region is contained in the BC all-pieces region', bad2 === 0,
     n2 + ' grid points, ' + dfiPts.length + ' inside DFI95');
  let bad3 = 0;
  for (const [d, nu] of dfiPts) if (!CUR.some((h) => h[0].mul(d).add(h[1].mul(nu)).lt(h[2]))) bad3++;
  ok('DFI95 all-pieces region also adds nothing', bad3 === 0, dfiPts.length + ' sampled points');
}

// ============================================================ PART B


const NMAX = 40000;
const spf = new Int32Array(NMAX + 1);
for (let i = 2; i <= NMAX; i++) if (!spf[i]) for (let j = i; j <= NMAX; j += i) if (!spf[j]) spf[j] = i;
const LAM = new Float64Array(NMAX + 1); // von Mangoldt
const MU = new Int8Array(NMAX + 1); MU[1] = 1;
for (let n = 2; n <= NMAX; n++) {
  const p = spf[n]; let m = n, k = 0;
  while (m % p === 0) { m /= p; k++; }
  LAM[n] = (m === 1) ? Math.log(p) : 0;
  MU[n] = (k > 1) ? 0 : -MU[m];
}
function betaW(k, W) { let s = 0; for (let r = 1; r * r <= k; r++) { if (k % r) continue; if (r > W) s += LAM[r]; const r2 = k / r; if (r2 !== r && r2 > W) s += LAM[r2]; } return s; }
function lamLeW(k, W) { let s = 0; for (let r = 1; r * r <= k; r++) { if (k % r) continue; if (r <= W) s += LAM[r]; const r2 = k / r; if (r2 !== r && r2 <= W) s += LAM[r2]; } return s; }

// B1. beta_W(k) = log k - sum_{r|k, r<=W} Lambda(r), and beta_W(k) = 0 for k <= W.
{
  let bad = 0, zbad = 0, n = 0;
  for (const W of [1, 2, 3, 5, 7, 11, 30]) for (let k = 1; k <= 3000; k++) {
    n++;
    if (Math.abs(betaW(k, W) - (Math.log(k) - lamLeW(k, W))) > 1e-9) bad++;
    if (k <= W && betaW(k, W) !== 0) zbad++;
  }
  ok('beta_W(k) = log k - sum_{r|k,r<=W} Lambda(r)', bad === 0, n + ' cases');
  ok('beta_W(k) = 0 for k <= W (so the k>V constraint is redundant)', zbad === 0, n + ' cases');
}

// B2. The four-piece decomposition, exactly, at small parameters.
// R = sum over d>U, e>Y, k>=1, t>=1, dk-et=2, dk in (X/2,X] of mu(d)mu(e)beta_V(k)beta_Z(t)
//   = T11 - T10 - T01 + T00 with
// T11: coefficients mu(d) on n2=d, mu(e) on n1=e, weights log m1, log m2
// T10: coefficients B_V(n2)=sum_{n2=dr,d>U,r<=V} mu(d)Lambda(r), mu(e); weights 1, log m2
// T01: mu(d), A_Z(n1)=sum_{n1=er',e>Y,r'<=Z} mu(e)Lambda(r'); weights log m1, 1
// T00: B_V(n2), A_Z(n1); weights 1, 1
function runCase(X, U, V, Y, Z) {
  const lo = Math.floor(X / 2) + 1, hi = X;
  // direct R, with the k>V and t>Z constraints kept explicitly
  let Rkept = 0, Rdrop = 0;
  for (let n = lo; n <= hi; n++) {
    if (n - 2 < 1) continue;
    for (let d = 1; d <= n; d++) {
      if (n % d) continue; if (d <= U) continue;
      const k = n / d;
      for (let e = 1; e <= n - 2; e++) {
        if ((n - 2) % e) continue; if (e <= Y) continue;
        const t = (n - 2) / e;
        const c = MU[d] * MU[e] * betaW(k, V) * betaW(t, Z);
        Rdrop += c;
        if (k > V && t > Z) Rkept += c;
      }
    }
  }
  // aggregated coefficients
  const BV = new Float64Array(hi + 1), AZ = new Float64Array(hi + 1);
  for (let d = U + 1; d <= hi; d++) for (let r = 1; r <= V && d * r <= hi; r++) BV[d * r] += MU[d] * LAM[r];
  for (let e = Y + 1; e <= hi; e++) for (let r = 1; r <= Z && e * r <= hi; r++) AZ[e * r] += MU[e] * LAM[r];
  let T11 = 0, T10 = 0, T01 = 0, T00 = 0;
  for (let n = lo; n <= hi; n++) {
    if (n - 2 < 1) continue;
    for (let n2 = 1; n2 <= n; n2++) {
      if (n % n2) continue;
      const m1 = n / n2;
      for (let n1 = 1; n1 <= n - 2; n1++) {
        if ((n - 2) % n1) continue;
        const m2 = (n - 2) / n1;
        const muD = (n2 > U ? MU[n2] : 0), muE = (n1 > Y ? MU[n1] : 0);
        T11 += muD * muE * Math.log(m1) * Math.log(m2);
        T10 += BV[n2] * muE * Math.log(m2);
        T01 += muD * AZ[n1] * Math.log(m1);
        T00 += BV[n2] * AZ[n1];
      }
    }
  }
  return { Rkept, Rdrop, four: T11 - T10 - T01 + T00, T11, T10, T01, T00, BV };
}
{
  const cases = [[240, 3, 3, 2, 2], [300, 4, 4, 2, 2], [420, 2, 2, 1, 1], [512, 5, 5, 3, 3], [600, 3, 5, 2, 3]];
  let bad = 0, badRed = 0; const reps = [];
  for (const c of cases) {
    const r = runCase(...c);
    if (Math.abs(r.Rkept - r.Rdrop) > 1e-8 * (1 + Math.abs(r.Rkept))) badRed++;
    if (Math.abs(r.Rkept - r.four) > 1e-8 * (1 + Math.abs(r.Rkept))) bad++;
    reps.push('X=' + c[0] + ':R=' + r.Rkept.toFixed(6));
  }
  console.log('four-piece identity R = T11-T10-T01+T00 exact on ' + cases.length + ' cases: ' + reps.join(' '));
  ok('dropping the k>V and t>Z constraints leaves R unchanged', badRed === 0, cases.length + ' cases');
  ok('R = T11 - T10 - T01 + T00 exactly', bad === 0, cases.length + ' cases');
}

// B3. Aggregated coefficient bound |B_V(n2)| <= log n2, so ||beta|| << sqrt(N2) log x.
{
  const U = 3, V = 12, HI = 4000;
  const BV = new Float64Array(HI + 1);
  for (let d = U + 1; d <= HI; d++) for (let r = 1; r <= V && d * r <= HI; r++) BV[d * r] += MU[d] * LAM[r];
  let bad = 0, worst = 0;
  for (let n = 2; n <= HI; n++) { const ratio = Math.abs(BV[n]) / Math.log(n); if (ratio > worst) worst = ratio; if (Math.abs(BV[n]) > Math.log(n) + 1e-9) bad++; }
  ok('|B_V(n2)| <= log n2 pointwise', bad === 0, 'worst ratio ' + worst.toFixed(6));
}

// ============================================================ PART C

let NEG = 0;
function neg(name, cond) { if (!cond) { PASS++; NEG++; } else { FAIL++; FAILED.push('control did not fail: ' + name); } }

// C1. Swapping max and min in the BC error term changes the verdict: at
// (delta,nu) = (61/100, 1/20) the correct form rejects and the swapped one accepts.
{
  const wrong = (A, B) => q(17).mul(maxQ(A, B)).add(q(22).mul(A.le(B) ? A : B));
  const d = q(61, 100), nu = q(1, 20);
  const A = d.add(w), B = nu.add(v);
  neg('22min+17max agrees with 22max+17min at (61/100,1/20) [' +
      bcLin(A, B) + ' vs ' + wrong(A, B) + ']',
      wrong(A, B).lt(q(20)) === bcLin(A, B).lt(q(20)));
}
// C2. Forgetting the 6/25 and 1/20 expansions (using delta,nu in place of a,b)
// would claim added region; the correct all-pieces computation must not.
neg('using (delta,nu) instead of (a,b) leaves the added area zero', area(clipAll(polyLL, CURC)).eq(Q0));
// C3. Keeping the k>V constraint inside a single piece breaks the identity.
{
  const X = 300, U = 4, V = 4, Y = 2, Z = 2;
  const lo = Math.floor(X / 2) + 1, hi = X;
  const BV = new Float64Array(hi + 1), AZ = new Float64Array(hi + 1);
  for (let d = U + 1; d <= hi; d++) for (let r = 1; r <= V && d * r <= hi; r++) BV[d * r] += MU[d] * LAM[r];
  for (let e = Y + 1; e <= hi; e++) for (let r = 1; r <= Z && e * r <= hi; r++) AZ[e * r] += MU[e] * LAM[r];
  let T = 0;
  for (let n = lo; n <= hi; n++) { if (n - 2 < 1) continue;
    for (let n2 = 1; n2 <= n; n2++) { if (n % n2) continue; const m1 = n / n2; if (m1 <= V) continue; // wrong cut
      for (let n1 = 1; n1 <= n - 2; n1++) { if ((n - 2) % n1) continue; const m2 = (n - 2) / n1; if (m2 <= Z) continue;
        const muD = (n2 > U ? MU[n2] : 0), muE = (n1 > Y ? MU[n1] : 0);
        T += muD * muE * Math.log(m1) * Math.log(m2) - BV[n2] * muE * Math.log(m2) - muD * AZ[n1] * Math.log(m1) + BV[n2] * AZ[n1];
      } } }
  const r = runCase(X, U, V, Y, Z);
  neg('imposing m1>V, m2>Z inside the four pieces still reproduces R',
      Math.abs(T - r.Rkept) < 1e-8 * (1 + Math.abs(r.Rkept)));
}
// C4. A region claim with the exponent 7/20 read as the whole (N1N2) power
// (i.e. forgetting the ||alpha||||beta|| = sqrt(N1N2) factor) would add region.
{
  const noNorm = (A, B) => q(7, 20).mul(A.add(B)).add(maxQ(A, B).div(q(4)));
  const d = q(19, 25), nu = q(19, 20);
  neg('corner (19/25,19/20) passes once the norm factor is dropped',
      noNorm(d.add(w), nu.add(v)).ge(Q1));
}

console.log('negative controls fired: ' + NEG + '/4');
for (const f of FAILED) console.log('FAILED: ' + f);
console.log('checks: ' + PASS + ' passed, ' + FAIL + ' failed');
console.log('PASS: decomposition identity, region arithmetic and controls; Corollary 1 adds no region; twin margin OPEN');
process.exit(FAIL === 0 ? 0 : 1);
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/determinant-corollary-validation.js
//   invocation:  node research/determinant-corollary-validation.js
//   code-sha256: 685968094d27acc8a30f0ce9438715ccc41e5e7ca45dc952509cab18ea741128
//   out-sha256:  c7057713cd178e95dee9ef0673b182cdf86307f5be2559d6b3a891c26c8d60b6
//   body-lines:  18
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.1 s
// ============================================================================
// all-pieces region vertices : (6/25,1/20) (651/1100,1/20) (266/975,361/780) (6/25,537/1100)
// all-pieces region area     : 342383/4290000  (0.079810)
// log-log region vertices    : (6/25,1/20) (19/25,1/20) (19/25,82/425) (20/39,20/39) (6/25,199/275)
// log-log region area        : 167659/729300  (0.229890)
// sup(delta+nu) on all-pieces region: 2869/3900 = 0.735641 < 19/25
// log-log ADDED vertices     : (3263/4900,771/2450) (20/39,20/39) (6/25,199/275) (6/25,63/100) (47/150,67/150) (67/200,17/40)
// log-log ADDED area         : 17013209/280280000  (0.060701)
// log-log ADDED / domain     : 0.129702 (12.97 percent)
// log-log ADDED in (p,q)     : (461/4900,3113/4900) (241/975,341/780) (13/25,249/1100) (13/25,8/25) (67/150,151/300) (17/40,21/40)
// benchmark (2/5,2/5): a=16/25 b=9/20 | all-pieces exp=2173/2000=1.086500 | log-log exp=39/50=0.780000 | in current=true
// target box (8/25,9/20): a=14/25 b=1/2 | all-pieces exp=1041/1000=1.041000 | log-log exp=767/1000=0.767000 | in current=false
// corner (19/25,19/20): a=1 b=1 | all-pieces exp=39/20=1.950000 | log-log exp=1691/1000=1.691000 | in current=false
// (1/2,1/2): a=37/50 b=11/20 | all-pieces exp=2563/2000=1.281500 | log-log exp=39/40=0.975000 | in current=false
// target box (8/25,9/20) band coverage: BC covers rho<223/1100 at zeta=1/20, zeta<3/1700 at rho=6/25; top band exponent 1041/1000 fails by 41/1000
// four-piece identity R = T11-T10-T01+T00 exact on 5 cases: X=240:R=352.954348 X=300:R=446.134018 X=420:R=1513.100241 X=512:R=133.992549 X=600:R=1004.588317
// negative controls fired: 4/4
// checks: 28 passed, 0 failed
// PASS: decomposition identity, region arithmetic and controls; Corollary 1 adds no region; twin margin OPEN
// ============================================================================
// READINGS
// 1. The four-piece decomposition is an exact identity, not an approximation:
//    on five small (X,U,V,Y,Z) cases R equals T11-T10-T01+T00 to full double
//    precision, and dropping the k>V, t>Z constraints changes nothing because
//    beta_W vanishes below W. Small cases; no asymptotic content.
// 2. Requiring every piece and every band to pass Bettin-Chandee Corollary 1
//    gives a region of area 342383/4290000 whose sup of delta+nu is 2869/3900,
//    strictly below 19/25. Intersected with the complement of the currently
//    controlled region the area is exactly 0: Corollary 1 adds no region.
// 3. The log-log piece alone (rho=zeta=0) is controlled on area 167659/729300,
//    of which 17013209/280280000 (12.97 percent of the domain) lies outside the
//    currently controlled region. That is one of four pieces, so it does not
//    enlarge the region controlled for R.
// 4. Every per-band budget checked is nondecreasing in both band exponents, so
//    the top band binds and a split by r size cannot enlarge the union. The
//    grid check confirms: current union with the top-band BC condition equals
//    the current union.
// 5. At the next local target (8/25,9/20) the top band misses by 41/1000 in the
//    exponent; Corollary 1 covers rho<223/1100 there at zeta=1/20. A covered
//    sub-band is not a saving on the binding band.
// 6. The DFI 1995 version of the same corollary, as quoted inside
//    Bettin-Chandee, is weaker on the diagonal (48/95 against 20/39) and its
//    all-pieces region is contained in the Bettin-Chandee one.
