// REACHABILITY COVERAGE — exact rational bookkeeping of the grouped-moment block
// budgets, the region a nonzero-kernel saving adds, and the leftover it cannot
// reach. Companion: reachability-coverage.md. This is closed-form rational
// arithmetic over stated inequalities. It measures no arithmetic sum, no rate
// and no onset, and it validates none of the imported analytic estimates.
'use strict';
const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path');
const started = Date.now(), cap = () => assert(Date.now() - started < 600000, 'ten-minute validation cap');

// ---------------------------------------------------------------- exact rationals
function bgcd(a, b) { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a; }
class Q {
  constructor(n, d = 1n) { n = BigInt(n); d = BigInt(d); assert(d !== 0n, 'zero denominator');
    if (d < 0n) { n = -n; d = -d; } const g = bgcd(n, d) || 1n; this.n = n / g; this.d = d / g; }
  add(o) { return new Q(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { return new Q(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { return new Q(this.n * o.n, this.d * o.d); }
  div(o) { return new Q(this.n * o.d, this.d * o.n); }
  cmp(o) { const l = this.n * o.d, r = o.n * this.d; return l < r ? -1 : l > r ? 1 : 0; }
  eq(o) { return this.cmp(o) === 0; }
  neg() { return new Q(-this.n, this.d); }
  toString() { return this.d === 1n ? `${this.n}` : `${this.n}/${this.d}`; }
  num() { return Number(this.n) / Number(this.d); }
}
const q = (n, d = 1n) => new Q(n, d);
const Q0 = q(0), Q1 = q(1), Q2 = q(2), Q3 = q(3), QH = q(1, 2);

// ---------------------------------------------------------------- fixed constants
const W = q(6, 25), V = q(1, 20);                    // cutoff exponents: U=V=x^w, Y=Z=x^v
const DMIN = W, DMAX = Q1.sub(W), NMIN = V, NMAX = Q1.sub(V);   // 6/25..19/25, 1/20..19/20
const OLD_A = q(19, 25), OLD_B = q(123, 50);         // limiting-region boundaries
const CUT_A = q(3, 4), CUT_B = q(49, 20);            // the concrete cuts inside W_dagger
const R_LIN = q(161, 100), L_LIN = q(123, 100);      // right/left cross frontier at gamma=0
assert(DMAX.eq(q(19, 25)) && NMAX.eq(q(19, 20)));

// budgets, both parametrisations
const budgets = (delta, nu) => {
  const a = delta.add(W), b = nu.add(V), p = DMAX.sub(delta), Qd = NMAX.sub(nu);
  return { a, b, p, q: Qd,
    zeroR: Q1.add(a).div(Q2), crossR: a.div(Q2).add(q(3, 2).mul(b)), perR: a,
    zeroL: Q1.add(b).div(Q2), crossL: b.div(Q2).add(q(3, 2).mul(a)), perL: b };
};

// ---------------------------------------------------------------- A. budget identities
let budgetChecks = 0;
for (let i = 0; i <= 52; i++) for (let j = 0; j <= 45; j++) {
  const delta = DMIN.add(q(i, 100)), nu = NMIN.add(q(j, 50));
  if (delta.cmp(DMAX) > 0 || nu.cmp(NMAX) > 0) continue;
  const B = budgets(delta, nu);
  assert(B.a.eq(Q1.sub(B.p)) && B.b.eq(Q1.sub(B.q)), 'a=1-p, b=1-q');
  assert(B.zeroR.eq(Q1.sub(B.p.div(Q2))), 'right zero = 1-p/2');
  assert(B.crossR.eq(Q2.sub(B.p.div(Q2)).sub(q(3, 2).mul(B.q))), 'right cross = 2-p/2-3q/2');
  assert(B.perR.eq(Q1.sub(B.p)), 'right periods = 1-p');
  assert(B.zeroL.eq(Q1.sub(B.q.div(Q2))), 'left zero = 1-q/2');
  assert(B.crossL.eq(Q2.sub(B.q.div(Q2)).sub(q(3, 2).mul(B.p))), 'left cross = 2-q/2-3p/2');
  assert(B.zeroR.cmp(B.perR) >= 0 && B.zeroL.cmp(B.perL) >= 0, 'zero dominates periods');
  budgetChecks++;
}
console.log(`budget identities: ${budgetChecks} rational boxes; zero=1-p/2 dominates periods=1-p everywhere`);

// ---------------------------------------------------------------- B. region equivalence
// added(gamma) written in (delta,nu) must equal the usability conditions in (p,q).
let regionChecks = 0, usableCount = 0;
const GAMMAS = [q(0), q(3, 50), q(1, 5), q(39, 100), QH, q(1), q(11, 10), q(3, 2), q(37, 25), q(7, 4), q(2), q(9, 4)];
const E0 = q(1, 1000);                                  // the fixed strict margin eta_0 used in the checks
for (const g of GAMMAS) for (let i = 0; i <= 26; i++) for (let j = 0; j <= 18; j++) {
  const delta = DMIN.add(q(i, 50)), nu = NMIN.add(q(j, 20));
  if (delta.cmp(DMAX) > 0 || nu.cmp(NMAX) > 0) continue;
  const B = budgets(delta, nu), lim = Q1.sub(E0);
  const rightBudgets = B.zeroR.cmp(lim) <= 0 && B.crossR.sub(g.div(Q2)).cmp(lim) <= 0 && B.perR.cmp(lim) <= 0;
  const rightPQ = B.p.cmp(E0.mul(Q2)) >= 0 && B.p.add(Q3.mul(B.q)).cmp(Q2.sub(g).add(E0.mul(Q2))) >= 0;
  const leftBudgets = B.zeroL.cmp(lim) <= 0 && B.crossL.sub(g.div(Q2)).cmp(lim) <= 0 && B.perL.cmp(lim) <= 0;
  const leftPQ = B.q.cmp(E0.mul(Q2)) >= 0 && Q3.mul(B.p).add(B.q).cmp(Q2.sub(g).add(E0.mul(Q2))) >= 0;
  assert.equal(rightBudgets, rightPQ, `right usability mismatch at ${delta},${nu},gamma=${g}`);
  assert.equal(leftBudgets, leftPQ, `left usability mismatch at ${delta},${nu},gamma=${g}`);
  // the delta/nu form quoted in the note
  const rightNote = delta.cmp(DMAX) < 0 && delta.add(Q3.mul(nu)).cmp(R_LIN.add(g)) < 0;
  const leftNote = nu.cmp(NMAX) < 0 && Q3.mul(delta).add(nu).cmp(L_LIN.add(g)) < 0;
  if (rightBudgets) assert(rightNote, 'right note-form must contain the margin form');
  if (leftBudgets) assert(leftNote, 'left note-form must contain the margin form');
  if (rightBudgets || leftBudgets) usableCount++;
  regionChecks++; cap();
}
console.log(`region equivalence: ${regionChecks} (box,gamma) pairs, ${usableCount} usable; (delta,nu) and (p,q) forms agree`);

// ---------------------------------------------------------------- C. leftover polygons
const cons = (A, B, C) => ({ A, B, C });                 // A*delta + B*nu >= C
const DOMAIN = [cons(Q1, Q0, DMIN), cons(Q1.neg(), Q0, DMAX.neg()),
                cons(Q0, Q1, NMIN), cons(Q0, Q1.neg(), NMAX.neg())];
function vertices(cs) {
  const out = [];
  for (let i = 0; i < cs.length; i++) for (let j = i + 1; j < cs.length; j++) {
    const a = cs[i], b = cs[j], det = a.A.mul(b.B).sub(b.A.mul(a.B));
    if (det.n === 0n) continue;
    const x = a.C.mul(b.B).sub(b.C.mul(a.B)).div(det), y = a.A.mul(b.C).sub(b.A.mul(a.C)).div(det);
    if (cs.every(c => c.A.mul(x).add(c.B.mul(y)).cmp(c.C) >= 0) &&
        !out.some(v => v[0].eq(x) && v[1].eq(y))) out.push([x, y]);
  }
  return out;
}
function area(V2) {
  if (V2.length < 3) return Q0;
  let cx = Q0, cy = Q0; for (const v of V2) { cx = cx.add(v[0]); cy = cy.add(v[1]); }
  cx = cx.div(q(V2.length)); cy = cy.div(q(V2.length));
  const S = V2.slice().sort((u, v) => Math.atan2(u[1].sub(cy).num(), u[0].sub(cx).num())
                                     - Math.atan2(v[1].sub(cy).num(), v[0].sub(cx).num()));
  let s = Q0; for (let i = 0; i < S.length; i++) { const a = S[i], b = S[(i + 1) % S.length];
    s = s.add(a[0].mul(b[1]).sub(b[0].mul(a[1]))); }
  s = s.div(Q2); return s.n < 0n ? s.neg() : s;
}
const domainArea = DMAX.sub(DMIN).mul(NMAX.sub(NMIN));

// C1. The leftover at each gamma, at the LIMITING region boundaries (19/25, 123/50).
const polyRows = [];
for (const g of GAMMAS) {
  const cs = DOMAIN.concat([cons(Q1, Q1, OLD_A), cons(q(5), Q2, OLD_B),
                            cons(Q1, Q3, R_LIN.add(g)), cons(Q3, Q1, L_LIN.add(g))]);
  const V2 = vertices(cs), A = area(V2);
  polyRows.push({ gamma: g.toString(), nvert: V2.length, area: A.toString(), areaDec: A.num(),
    pct: A.div(domainArea).num() * 100, verts: V2.map(v => `(${v[0]},${v[1]})`).sort() });
  cap();
}
const at = g => polyRows.find(r => r.gamma === g);
assert.equal(at('0').area, '35347/120000', 'limiting leftover area at gamma=0');
assert.equal(at('2').nvert, 1, 'gamma=2 leftover is a single point');
assert.equal(at('2').verts[0], '(19/25,19/20)', 'that point is the corner');
assert.equal(at('9/4').nvert, 0, 'beyond gamma=2 the cross constraints alone leave nothing');
// The corner survives only through the zero-budget conditions, which the cross-only
// polygon does not encode. Check it directly at every gamma, including gamma>2.
let cornerChecks = 0;
for (const g of GAMMAS.concat([q(10), q(1000)])) {
  const B = budgets(DMAX, NMAX);
  const rightUsable = B.p.cmp(E0.mul(Q2)) >= 0 && B.p.add(Q3.mul(B.q)).cmp(Q2.sub(g).add(E0.mul(Q2))) >= 0;
  const leftUsable = B.q.cmp(E0.mul(Q2)) >= 0 && Q3.mul(B.p).add(B.q).cmp(Q2.sub(g).add(E0.mul(Q2))) >= 0;
  assert(!rightUsable && !leftUsable, `corner must stay unreachable at gamma=${g}`);
  cornerChecks++;
}

// C2. The genuine W_dagger, with the CONCRETE cuts 3/4, 49/20 and the disjunction
// (d>x^(151/200) or de^3>x^(321/200)). That disjunction makes it a union of two
// convex pieces, so it is not the same set as the limiting-boundary complement.
const CUT_K = q(151, 200), CUT_L = q(321, 200);
const wBase = DOMAIN.concat([cons(Q1, Q1, CUT_A), cons(q(5), Q2, CUT_B)]);
const wPiece1 = wBase.concat([cons(Q1, Q3, CUT_L)]);
const wPiece2 = wBase.concat([cons(Q1, Q0, CUT_K), cons(Q1.neg(), Q3.neg(), CUT_L.neg())]);
const wA1 = area(vertices(wPiece1)), wA2 = area(vertices(wPiece2)), wArea = wA1.add(wA2);
assert.equal(wArea.toString(), '142537/480000', 'concrete-cut W_dagger area');
assert(wArea.cmp(at('0').area === undefined ? Q0 : q(35347, 120000)) > 0, 'concrete W_dagger exceeds the limiting complement');
const inWdagger = (delta, nu) => delta.add(nu).cmp(CUT_A) > 0 && q(5).mul(delta).add(Q2.mul(nu)).cmp(CUT_B) > 0
  && (delta.cmp(CUT_K) > 0 || delta.add(Q3.mul(nu)).cmp(CUT_L) > 0);
for (const [dn, dd, nn, nd] of [[19, 25, 19, 20], [19, 25, 9, 20], [19, 25, 1, 2], [19, 25, 1, 20], [6, 25, 19, 20]])
  assert(inWdagger(q(dn, dd), q(nn, nd)), `named point must lie in W_dagger: ${dn}/${dd},${nn}/${nd}`);
console.log(`corner: unreachable at all ${cornerChecks} tested gamma values, including gamma=1000`);
console.log(`leftover polygons: ${polyRows.length} gamma values; limiting-boundary complement at gamma=0 is ${at('0').area} (${(at('0').pct).toFixed(2)}%), concrete-cut W_dagger is ${wArea} = ${wA1}+${wA2} (${(wArea.div(domainArea).num() * 100).toFixed(2)}%)`);

// ---------------------------------------------------------------- D. required saving
const BOXES = [[2, 5, 2, 5], [47, 150, 67, 150], [8, 25, 9, 20], [1, 2, 1, 2], [6, 25, 63, 100],
               [1, 2, 7, 10], [19, 25, 9, 20], [19, 25, 1, 2], [19, 25, 1, 20], [6, 25, 19, 20], [19, 25, 19, 20]];
const reqRows = BOXES.map(([dn, dd, nn, nd]) => {
  const delta = q(dn, dd), nu = q(nn, nd), B = budgets(delta, nu);
  const gR = Q2.sub(B.p).sub(Q3.mul(B.q)), gL = Q2.sub(Q3.mul(B.p)).sub(B.q);
  assert(gR.eq(delta.add(Q3.mul(nu)).sub(R_LIN)), 'right requirement in (delta,nu)');
  assert(gL.eq(Q3.mul(delta).add(nu).sub(L_LIN)), 'left requirement in (delta,nu)');
  const rightUsable = B.p.n > 0n, leftUsable = B.q.n > 0n;
  const cands = [].concat(rightUsable ? [gR] : [], leftUsable ? [gL] : []);
  const req = cands.length ? cands.reduce((m, z) => (z.cmp(m) < 0 ? z : m)) : null;
  return { delta: delta.toString(), nu: nu.toString(), p: B.p.toString(), q: B.q.toString(),
    gammaRight: gR.toString(), gammaLeft: gL.toString(), rightUsable, leftUsable,
    gammaReq: req ? req.toString() : 'unbounded', gammaReqDec: req ? req.num() : null };
});
const find = (a, b) => reqRows.find(r => r.delta === a && r.nu === b);
assert.equal(find('8/25', '9/20').gammaReq, '3/50');
assert.equal(find('19/25', '9/20').gammaReq, '3/2');
assert.equal(find('19/25', '1/2').gammaReq, '31/20');
assert.equal(find('19/25', '1/20').gammaReq, '11/10');
assert.equal(find('6/25', '19/20').gammaReq, '37/25');
assert.equal(find('19/25', '19/20').gammaReq, 'unbounded');
assert.equal(find('2/5', '2/5').gammaReqDec < 0, true);
console.log(`required saving: ${reqRows.length} named boxes; (8/25,9/20)=3/50, (19/25,9/20)=3/2, corner unbounded`);

// ---------------------------------------------------------------- E. the two edges
// On the d-edge (p=0) only the left orientation can apply and gamma_req = 2-q;
// on the e-edge (q=0) only the right and gamma_req = 2-p. Both approach 2.
let edgeChecks = 0, dEdgeAbove = 0, eEdgeAbove = 0;
let dEdgeMin = null, eEdgeMin = null, dEdgeSup = Q0, eEdgeSup = Q0;
for (let j = 0; j <= 180; j++) {
  const nu = NMIN.add(q(j, 200)); if (nu.cmp(NMAX) > 0) continue;
  const B = budgets(DMAX, nu), g = Q2.sub(B.q);
  assert(g.eq(Q3.mul(DMAX).add(nu).sub(L_LIN)), 'd-edge requirement');
  if (dEdgeMin === null || g.cmp(dEdgeMin) < 0) dEdgeMin = g;
  if (g.cmp(dEdgeSup) > 0) dEdgeSup = g;
  if (g.cmp(q(11, 10)) > 0) dEdgeAbove++;
  edgeChecks++;
}
for (let i = 0; i <= 104; i++) {
  const delta = DMIN.add(q(i, 200)); if (delta.cmp(DMAX) > 0) continue;
  const B = budgets(delta, NMAX), g = Q2.sub(B.p);
  assert(g.eq(delta.add(Q3.mul(NMAX)).sub(R_LIN)), 'e-edge requirement');
  if (eEdgeMin === null || g.cmp(eEdgeMin) < 0) eEdgeMin = g;
  if (g.cmp(eEdgeSup) > 0) eEdgeSup = g;
  if (g.cmp(q(37, 25)) > 0) eEdgeAbove++;
  edgeChecks++;
}
assert.equal(dEdgeMin.toString(), '11/10'); assert.equal(eEdgeMin.toString(), '37/25');
assert.equal(dEdgeSup.toString(), '2'); assert.equal(eEdgeSup.toString(), '2');
// S_R minus S_0 is nonempty for every gamma < 2: witness p=0, q=2*eta_0.
let stripWitnesses = 0;
for (const g of GAMMAS) {
  const pw = Q0, qw = E0.mul(Q2);
  const inStrip = pw.cmp(E0.mul(Q2)) < 0 && Q3.mul(pw).add(qw).cmp(Q2.sub(g).add(E0.mul(Q2))) < 0;
  const outsideCorner = qw.cmp(E0.mul(Q2)) >= 0;
  if (g.cmp(Q2) < 0) { assert(inStrip && outsideCorner, `S_R minus S_0 empty at gamma=${g}`); stripWitnesses++; }
  else assert(!(inStrip && outsideCorner), `S_R minus S_0 should be empty at gamma=${g}`);
}
console.log(`edge analysis: ${edgeChecks} edge points; d-edge requirement runs over [11/10,2), e-edge over [37/25,2); ${dEdgeAbove} d-edge and ${eEdgeAbove} e-edge points exceed their own cheapest value; ${stripWitnesses} strip witnesses below gamma=2`);

// ---------------------------------------------------------------- F. dyadic block size
// eta_0 = C*loglog(x)/log(x) keeps a fixed logarithmic saving. Count the dyadic
// boxes inside 2*eta_0 of each edge; dyadic steps in delta are log2/log x.
const blockRows = [];
for (const jExp of [1024, 2 ** 16, 2 ** 24, 2 ** 32, 2 ** 40]) {
  const logx = jExp * Math.log(2), C = 3, eta0 = C * Math.log(logx) / logx;
  const perSide = 2 * eta0 * logx / Math.log(2);          // = 2*C*loglog x / log 2
  const dTotal = DMAX.sub(DMIN).num() * logx / Math.log(2);
  const eTotal = NMAX.sub(NMIN).num() * logx / Math.log(2);
  const dBoxes = Math.min(Math.floor(perSide), Math.floor(dTotal));
  const eBoxes = Math.min(Math.floor(perSide), Math.floor(eTotal));
  blockRows.push({ jExp, logx, eta0, perSide, dTotalBoxes: Math.floor(dTotal), eTotalBoxes: Math.floor(eTotal),
    dBoxes, eBoxes, boxes: dBoxes * eBoxes, savingAsLogPower: -C,
    lastBoxZeroBudgetDeficit: Math.log(2) / (2 * logx), saving: Math.pow(logx, -C) });
  assert(dBoxes >= 1 && eBoxes >= 1, 'the unreachable block never becomes empty');
}
assert(blockRows[blockRows.length - 1].boxes < blockRows[blockRows.length - 1].dTotalBoxes,
  'the block is a vanishing fraction of the boxes but never empty');
console.log(`dyadic block: eta_0=3*loglog x/log x gives ${blockRows.map(r => r.boxes).join(', ')} unreachable boxes at j=${blockRows.map(r => r.jExp).join(', ')}; the last box keeps zero budget 1-log2/(2 log x)`);

// ---------------------------------------------------------------- G. mass constants
// One top dyadic band on each side: sum over primes r in (R,2R] of 1/r is
// log(1+log2/log R)+o(1), and the weight is (log r)(log r'). The log x factors cancel.
const massRows = [];
for (const jExp of [1024, 4096, 16384]) {
  const logx = jExp * Math.log(2), lr = W.num() * logx, ls = V.num() * logx;
  const bandR = Math.log(1 + Math.log(2) / lr), bandS = Math.log(1 + Math.log(2) / ls);
  massRows.push({ jExp, oneBoxLeadingMass: bandR * bandS * lr * ls, limit: Math.log(2) ** 2 });
}
assert(Math.abs(massRows[massRows.length - 1].oneBoxLeadingMass - Math.log(2) ** 2) < 2e-3,
  'one dyadic box tends to (log 2)^2 x');
const eta0Fixed = 1 / 100, logxRef = 1024 * Math.log(2);
const blockLeading = Math.log(1 + 2 * eta0Fixed / W.num()) * Math.log(1 + 2 * eta0Fixed / V.num())
                   * W.num() * V.num() * logxRef * logxRef;
console.log(`mass constants: one top dyadic box carries leading absolute mass ${massRows[massRows.length - 1].oneBoxLeadingMass.toFixed(4)}*x, limit (log 2)^2=${(Math.log(2) ** 2).toFixed(4)}; at fixed eta_0=1/100 the block carries ${blockLeading.toFixed(4)}*x before the squarefree factor`);

// ---------------------------------------------------------------- H. negative controls
const controls = { droppedZeroBudget: 0, cheapestPointClearsEdge: 0, limitingCutsMismatch: 0,
                   wrongCauchyDictionary: 0, periodUsedAsBinding: 0, droppedVerticalCut: 0 };
// (i) drop the zero-budget conditions: at gamma=2 the corner would be wrongly cleared.
{ const g = q(9, 4), B = budgets(DMAX, NMAX);
  const withZero = B.p.cmp(E0.mul(Q2)) >= 0 || B.q.cmp(E0.mul(Q2)) >= 0;
  const withoutZero = B.p.add(Q3.mul(B.q)).cmp(Q2.sub(g).add(E0.mul(Q2))) >= 0
                   || Q3.mul(B.p).add(B.q).cmp(Q2.sub(g).add(E0.mul(Q2))) >= 0;
  if (!withZero && withoutZero) controls.droppedZeroBudget++; }
// (ii) claiming 11/10 clears the whole d-edge, or 37/25 the whole e-edge, is false.
controls.cheapestPointClearsEdge += dEdgeAbove + eEdgeAbove;
// (iii) the limiting boundaries are not the concrete cuts.
if (wArea.toString() !== at('0').area) controls.limitingCutsMismatch++;
// (iv) gamma = eta_(21) instead of 3/50 + eta_(21).
{ const delta = q(8, 25), nu = q(9, 20), B = budgets(delta, nu), eta21 = q(1, 100);
  const right = B.crossR.sub(q(3, 50).add(eta21).div(Q2)), wrong = B.crossR.sub(eta21.div(Q2));
  assert(right.cmp(Q1) < 0, 'correct dictionary clears the box');
  if (wrong.cmp(Q1) >= 0) controls.wrongCauchyDictionary++; }
// (v) using the period budget as the binding one wrongly declares edge boxes reachable.
for (let j = 0; j <= 40; j++) {
  const nu = NMIN.add(q(j, 50)); if (nu.cmp(NMAX) > 0) continue;
  const delta = DMAX.sub(q(3, 2000)), B = budgets(delta, nu);      // p = 3/2000 < 2*eta_0, >= eta_0
  if (B.p.cmp(E0) >= 0 && B.p.cmp(E0.mul(Q2)) < 0) controls.periodUsedAsBinding++;
}
// (vi) dropping the vertical cut delta<19/25 from the right region.
for (let j = 0; j <= 40; j++) {
  const nu = NMIN.add(q(j, 50)); if (nu.cmp(NMAX) > 0) continue;
  const B = budgets(DMAX, nu);
  if (B.crossR.cmp(Q1) < 0 && B.zeroR.cmp(Q1.sub(E0)) > 0) controls.droppedVerticalCut++;
}
for (const [name, n] of Object.entries(controls)) assert(n > 0, `inactive control ${name}`);
console.log(`negative controls: ${Object.entries(controls).map(([k, v]) => `${k}=${v}`).join('; ')}`);

fs.writeFileSync(path.join(__dirname, 'reachability-validation.json'), JSON.stringify({
  schema: 1,
  scope: 'Exact rational bookkeeping over stated block-budget inequalities. No arithmetic sum, rate or onset is measured, and no imported analytic estimate is validated.',
  cutoffs: { w: W.toString(), v: V.toString(), deltaRange: [DMIN.toString(), DMAX.toString()], nuRange: [NMIN.toString(), NMAX.toString()] },
  margin: E0.toString(), domainArea: domainArea.toString(),
  budgetChecks, regionChecks, usableCount, edgeChecks, stripWitnesses,
  dEdge: { min: dEdgeMin.toString(), sup: dEdgeSup.toString(), aboveCheapest: dEdgeAbove },
  eEdge: { min: eEdgeMin.toString(), sup: eEdgeSup.toString(), aboveCheapest: eEdgeAbove },
  cornerChecks, polyRows, wDaggerArea: wArea.toString(), wDaggerPieces: [wA1.toString(), wA2.toString()],
  reqRows, blockRows, massRows, controls
}, null, 2) + '\n');
console.log('PASS: budget identities, region equivalence, leftover polygons and edge requirements; the corner survives every gamma; global twin margin OPEN');
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/reachability-validation.js
//   invocation:  node research/reachability-validation.js
//   code-sha256: 4fc8f81e4a993f6e65520c410b0888b173d00f759ae442bedbed8a9398b1fe27
//   out-sha256:  f51baa19e592841b3c242cc1689b942e00d123d19c324d4dfb0f32d891711664
//   body-lines:  10
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-06
//   elapsed:     0.1 s
// ============================================================================
// budget identities: 2438 rational boxes; zero=1-p/2 dominates periods=1-p everywhere
// region equivalence: 6156 (box,gamma) pairs, 4405 usable; (delta,nu) and (p,q) forms agree
// corner: unreachable at all 14 tested gamma values, including gamma=1000
// leftover polygons: 12 gamma values; limiting-boundary complement at gamma=0 is 35347/120000 (62.94%), concrete-cut W_dagger is 142537/480000 = 141979/480000+93/80000 (63.45%)
// required saving: 11 named boxes; (8/25,9/20)=3/50, (19/25,9/20)=3/2, corner unbounded
// edge analysis: 286 edge points; d-edge requirement runs over [11/10,2), e-edge over [37/25,2); 180 d-edge and 104 e-edge points exceed their own cheapest value; 10 strip witnesses below gamma=2
// dyadic block: eta_0=3*loglog x/log x gives 3136, 8464, 19600, 35344, 55696 unreachable boxes at j=1024, 65536, 16777216, 4294967296, 1099511627776; the last box keeps zero budget 1-log2/(2 log x)
// mass constants: one top dyadic box carries leading absolute mass 0.4801*x, limit (log 2)^2=0.4805; at fixed eta_0=1/100 the block carries 162.8183*x before the squarefree factor
// negative controls: droppedZeroBudget=1; cheapestPointClearsEdge=284; limitingCutsMismatch=1; wrongCauchyDictionary=1; periodUsedAsBinding=41; droppedVerticalCut=12
// PASS: budget identities, region equivalence, leftover polygons and edge requirements; the corner survives every gamma; global twin margin OPEN
// ============================================================================
// READINGS
// The mathematics is in the companion note. These are closed-form checks of the
// stated inequalities; no arithmetic sum, rate or onset is measured here.
