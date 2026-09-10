#!/usr/bin/env node
'use strict';
// ============================================================================
// structured-dispersion-estimate-validation.js
// ----------------------------------------------------------------------------
// Companion checks for research/structured-dispersion-estimate.md.
//
// WHAT THIS DOES AND DOES NOT DO.  Exact integer checks of the one new
// elementary lemma (harmonic gcd average with a fixed prime-power factor),
// exact checks of the pair algebra with the prime-power factor inside the
// modulus, a direct numerical expansion of the (m,q)-Cauchy moment, and exact
// rational bookkeeping of the block exponents and the region comparison.  It
// validates NO imported analytic estimate (the completion bound (7) of
// grouped-divisor-moment is reused, not tested), establishes NO asymptotic
// rate, and says nothing about the sign or size of the signed remainder.  A
// green run means the finite inputs and the exponent arithmetic are as
// written in the note.
//
// Sections
//   A  Lemma H: sum over h1,h2 of (R,q)^(1/2)(h1,l1)^(1/2)(h2,l2)^(1/2)
//   B  pair algebra with the q factor; direct expansion of the (m,q) moment
//   C  block exponents (exact rationals), region grid, sector union at target
//   D  negative controls (each must FIRE)
//   E  the four-condition domain of section 6 (containment, slack, witness)
// ============================================================================

// ---------- exact rationals over BigInt --------------------------------------
function gB(a, b) { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) { const t = a % b; a = b; b = t; } return a; }
class Q {
  constructor(n, d = 1n) {
    n = BigInt(n); d = BigInt(d);
    if (d === 0n) throw new Error('zero denominator');
    if (d < 0n) { n = -n; d = -d; }
    const k = gB(n, d) || 1n;
    this.n = n / k; this.d = d / k;
  }
  static of(n, d) { return new Q(n, d); }
  add(o) { return new Q(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { return new Q(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { return new Q(this.n * o.n, this.d * o.d); }
  div(o) { return new Q(this.n * o.d, this.d * o.n); }
  cmp(o) { const l = this.n * o.d, r = o.n * this.d; return l < r ? -1 : l > r ? 1 : 0; }
  lt(o) { return this.cmp(o) < 0; }
  ge(o) { return this.cmp(o) >= 0; }
  gt(o) { return this.cmp(o) > 0; }
  eq(o) { return this.cmp(o) === 0; }
  toString() { return this.d === 1n ? `${this.n}` : `${this.n}/${this.d}`; }
}
const q = (n, d = 1) => Q.of(n, d);
const min = (a, b) => (a.lt(b) ? a : b);
const max = (a, b) => (a.lt(b) ? b : a);
const ONE = q(1), ZERO = q(0);

let failures = 0;
function check(name, ok, detail = '') {
  console.log(`  [${ok ? 'ok' : 'FAIL'}] ${name}${detail ? '  ' + detail : ''}`);
  if (!ok) failures++;
}

// ---------- integer helpers --------------------------------------------------
function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a; }
function tau(n) { let c = 0; for (let d = 1; d * d <= n; d++) if (n % d === 0) c += (d * d === n ? 1 : 2); return c; }
function modinv(a, m) { // a, m > 0 coprime
  let [g0, x0, x1] = [a % m, 1, 0]; let mm = m; let aa = a % m;
  // extended Euclid
  let old_r = aa, r = mm, old_s = 1, s = 0;
  while (r !== 0) { const qq = Math.floor(old_r / r); [old_r, r] = [r, old_r - qq * r]; [old_s, s] = [s, old_s - qq * s]; }
  if (old_r !== 1) throw new Error('not invertible');
  void g0; void x0; void x1;
  return ((old_s % m) + m) % m;
}
function lcm(a, b) { return a / gcd(a, b) * b; }
// deterministic pseudo-random (LCG), so the run is reproducible
let seed = 20260908;
function rnd() { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; }
function rint(lo, hi) { return lo + Math.floor(rnd() * (hi - lo + 1)); }

// ============================================================================
console.log('A. LEMMA H: harmonic gcd average with a fixed prime-power factor');
console.log('   claim: for q=p^k, (l1,l2)=1, H subset of (A,2A], R=h1*l2-h2*l1, (0,q):=q,');
console.log('   sum_{h1,h2 in H} (R,q)^(1/2) (h1,l1)^(1/2) (h2,l2)^(1/2)');
console.log('     <= (k+1) tau(l1) tau(l2) [4A^2 + 2^(3/2) A^(3/2) q^(1/2)]');
// ============================================================================
function lemmaH_lhs(pk, l1, l2, H) {
  let s = 0;
  for (const h1 of H) for (const h2 of H) {
    const R = h1 * l2 - h2 * l1;
    const gq = R === 0 ? pk : gcd(R, pk);
    s += Math.sqrt(gq) * Math.sqrt(gcd(h1, l1)) * Math.sqrt(gcd(h2, l2));
  }
  return s;
}
function lemmaH_bound(pk, k, l1, l2, A, dropTail) {
  const main = 4 * A * A;
  const tail = dropTail ? 0 : Math.pow(2, 1.5) * Math.pow(A, 1.5) * Math.sqrt(pk);
  return (k + 1) * tau(l1) * tau(l2) * (main + tail);
}
{
  const primePowers = [[2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [3, 1], [3, 2], [3, 3], [5, 1], [5, 2], [7, 1], [7, 2], [11, 1], [13, 1]];
  let configs = 0, maxRatio = 0, worst = null, cases = { pNone: 0, pL1: 0, pL2: 0, subset: 0, zeroPairs: 0 };
  for (const [p, k] of primePowers) {
    const pk = Math.pow(p, k);
    for (let A = 1; A <= 24; A += (A < 8 ? 1 : 4)) {
      const full = []; for (let h = A + 1; h <= 2 * A; h++) full.push(h);
      for (let l1 = 1; l1 <= 30; l1++) for (let l2 = 1; l2 <= 30; l2++) {
        if (gcd(l1, l2) !== 1) continue;
        if ((l1 * l2) % 7 !== 0 && (l1 + l2) % 3 !== 0 && rnd() < 0.55) continue; // thin the grid, keep p-divisible cases
        const useSubset = rnd() < 0.3;
        const H = useSubset ? full.filter(() => rnd() < 0.6) : full;
        if (H.length === 0) continue;
        const lhs = lemmaH_lhs(pk, l1, l2, H);
        const bnd = lemmaH_bound(pk, k, l1, l2, A, false);
        const ratio = lhs / bnd;
        configs++;
        if (l1 % p === 0) cases.pL1++; else if (l2 % p === 0) cases.pL2++; else cases.pNone++;
        if (useSubset) cases.subset++;
        for (const h1 of H) for (const h2 of H) if (h1 * l2 === h2 * l1) { cases.zeroPairs++; break; }
        if (ratio > maxRatio) { maxRatio = ratio; worst = { p, k, A, l1, l2, n: H.length, lhs: lhs.toFixed(3), bnd: bnd.toFixed(3) }; }
      }
    }
  }
  console.log(`   configurations: ${configs}  (p not dividing l1*l2: ${cases.pNone}, p|l1: ${cases.pL1}, p|l2: ${cases.pL2}, proper subsets H: ${cases.subset}, configs containing R=0 pairs: ${cases.zeroPairs})`);
  console.log(`   max LHS/bound = ${maxRatio.toFixed(6)} at ${JSON.stringify(worst)}`);
  check('Lemma H holds on every configuration (max ratio <= 1)', maxRatio <= 1);
}

// ============================================================================
console.log('B. PAIR ALGEBRA WITH THE PRIME-POWER FACTOR INSIDE THE MODULUS');
// ============================================================================
{
  // B1: for u_i = q e_i, (m, u1 u2) = 1:
  //   h1*inv(m,u1)/u1 - h2*inv(m,u2)/u2  ==  R*inv(m,c)/c   (mod 1),
  //   c = q*lcm(e1,e2) = q*j*l1*l2,  R = h1*l2 - h2*l1,  l_i = e_i/j.
  let n1 = 0, bad1 = 0, bad2 = 0, n2 = 0;
  for (let t = 0; t < 4000; t++) {
    const p = [2, 3, 5, 7][rint(0, 3)], k = rint(1, 3), pk = Math.pow(p, k);
    const e1 = rint(2, 60), e2 = rint(2, 60);
    const u1 = pk * e1, u2 = pk * e2;
    let m = rint(2, 400); if (gcd(m, u1 * u2) !== 1) continue;
    const h1 = rint(1, 40), h2 = rint(1, 40);
    const j = gcd(e1, e2), l1 = e1 / j, l2 = e2 / j;
    const c = pk * j * l1 * l2;
    if (c !== lcm(u1, u2)) { bad1++; }
    const R = h1 * l2 - h2 * l1;
    // exact: multiply everything by c; residues mod c must agree
    const lhs = ((h1 * modinv(m, u1) * (c / u1)) - (h2 * modinv(m, u2) * (c / u2))) % c;
    const rhs = (((R % c) + c) % c) * modinv(m, c) % c;
    if (((lhs % c) + c) % c !== rhs) bad1++;
    n1++;
    // B2: gcd bound (R, c) <= (R,q)(R,j)(h1,l1)(h2,l2) for R != 0
    if (R !== 0) {
      n2++;
      const G = gcd(R, c);
      if (G > gcd(R, pk) * gcd(R, j) * gcd(h1, l1) * gcd(h2, l2)) bad2++;
    }
  }
  console.log(`   B1 combined-phase identity with modulus q*lcm(e1,e2): ${n1} random configurations, ${bad1} violations`);
  check('B1 pair phase combines to e_c(R mbar) with c = q j l1 l2', bad1 === 0);
  console.log(`   B2 gcd bound (R,c) <= (R,q)(R,j)(h1,l1)(h2,l2) on ${n2} nonzero-R configurations, ${bad2} violations`);
  check('B2 gcd factorisation bound', bad2 === 0);

  // B3: direct expansion of sum_q Lambda(q) sum_m |Y_q(m)|^2 against the ordered-pair kernel form.
  // Small model: q in {4, 5, 7, 9}, e in (E,2E], h in (A,2A], m in an interval, endpoint factor Phi.
  const qs = [4, 5, 7, 9], Lq = { 4: Math.log(2), 5: Math.log(5), 7: Math.log(7), 9: Math.log(3) };
  const E = 6, A = 3, M0 = 50, Mlen = 37, theta = 2, sigma = -1, gB = 1, z0 = 300, z = 500;
  const beta = {}, ch = {};
  for (let e = E + 1; e <= 2 * E; e++) beta[e] = [rnd() - 0.5, rnd() - 0.5];
  for (let h = A + 1; h <= 2 * A; h++) ch[h] = [(rnd() - 0.5) / A, (rnd() - 0.5) / A];
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cconj = (a) => [a[0], -a[1]];
  const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const ex = (t) => [Math.cos(2 * Math.PI * t), Math.sin(2 * Math.PI * t)];
  const Phi = (u, h, m) => cadd(ex(h * z0 / (gB * m * u)), cmul([-1, 0], ex(h * z / (gB * m * u))));
  let direct = 0, pairs = 0;
  for (const qq of qs) {
    // direct
    let Mq = 0;
    for (let m = M0 + 1; m <= M0 + Mlen; m++) {
      let Y = [0, 0];
      for (let e = E + 1; e <= 2 * E; e++) {
        const u = qq * e; if (gcd(m, u) !== 1) continue;
        const inv = modinv(m, u);
        for (let h = A + 1; h <= 2 * A; h++) {
          const ph = ex(sigma * theta * h * inv / u);
          Y = cadd(Y, cmul(cmul(beta[e], ch[h]), cmul(ph, Phi(u, h, m))));
        }
      }
      Mq += Y[0] * Y[0] + Y[1] * Y[1];
    }
    direct += Lq[qq] * Mq;
    // pair-kernel form
    let Pq = [0, 0];
    for (let e1 = E + 1; e1 <= 2 * E; e1++) for (let e2 = E + 1; e2 <= 2 * E; e2++) {
      const j = gcd(e1, e2), l1 = e1 / j, l2 = e2 / j, c = qq * j * l1 * l2;
      for (let h1 = A + 1; h1 <= 2 * A; h1++) for (let h2 = A + 1; h2 <= 2 * A; h2++) {
        const R = h1 * l2 - h2 * l1, r = sigma * theta * R;
        let K = [0, 0];
        for (let m = M0 + 1; m <= M0 + Mlen; m++) {
          if (gcd(m, c) !== 1) continue;
          const F = cmul(Phi(qq * e1, h1, m), cconj(Phi(qq * e2, h2, m)));
          K = cadd(K, cmul(ex((((r * modinv(m, c)) % c) + c) % c / c), F));
        }
        const w = cmul(cmul(beta[e1], cconj(beta[e2])), cmul(ch[h1], cconj(ch[h2])));
        Pq = cadd(Pq, cmul(w, K));
      }
    }
    direct -= 0; // keep as is
    const rel = Math.abs(Pq[0] * Lq[qq] - Lq[qq] * Mq) / Math.max(1e-12, Math.abs(Lq[qq] * Mq));
    pairs += Lq[qq] * Pq[0];
    if (rel > 1e-9 || Math.abs(Pq[1]) > 1e-9) console.log(`   B3 mismatch at q=${qq}: rel=${rel} imag=${Pq[1]}`);
  }
  const relTotal = Math.abs(direct - pairs) / Math.abs(direct);
  console.log(`   B3 direct sum_q Lambda(q) sum_m |Y_q(m)|^2 = ${direct.toFixed(9)}, ordered-pair kernel form = ${pairs.toFixed(9)}, rel diff ${relTotal.toExponential(2)}`);
  check('B3 (m,q)-moment equals its ordered-pair kernel expansion (real, modulus q*lcm)', relTotal < 1e-9);
}

// ============================================================================
console.log('C. BLOCK EXPONENTS, REGION GRID AND SECTOR UNION (exact rationals)');
// ============================================================================
const SIG = q(1, 20);          // right prime-power ceiling Z = x^(1/20)
const RHO = q(6, 25);          // left prime-power ceiling W = x^(6/25)
function abOf(delta, nu) { return [delta.add(q(6, 25)), nu.add(q(1, 20))]; }
// grouped right budgets (14): (1+a)/2, a/2+3b/2, a
function grouped(a, b) { return [ONE.add(a).div(q(2)), a.div(q(2)).add(b.mul(q(3, 2))), a]; }
// (D1): zero (1+a+sig)/2 ; cross a/2+3b/2 - min(sig, alpha)/4 with alpha=a+b-1 (clipped at 0) ; period a+sig
function D1(a, b, sig) {
  const alpha = max(a.add(b).sub(ONE), ZERO);
  return [ONE.add(a).add(sig).div(q(2)), a.div(q(2)).add(b.mul(q(3, 2))).sub(min(sig, alpha).div(q(4))), a.add(sig)];
}
// structure-discarding variant: (R,q) <= q, i.e. no Q^(-1/4)/A^(-1/4) factor on the cross term
function D1_discard(a, b, sig) { return [ONE.add(a).add(sig).div(q(2)), a.div(q(2)).add(b.mul(q(3, 2))), a.add(sig)]; }
// black-box (12) variant: cross term M^(1/2) N^(3/2) Q^(1/4)
function D1_blackbox(a, b, sig) { return [ONE.add(a).add(sig).div(q(2)), a.div(q(2)).add(b.mul(q(3, 2))).add(sig.div(q(4))), a.add(sig)]; }
// left-orientation analogue: swap a<->b and use the left prime-power ceiling rho
function D1_left(a, b) { return D1(b, a, RHO); }
const maxOf = (arr) => arr.reduce((m, v) => max(m, v));
const controlled = (arr) => maxOf(arr).lt(ONE);
function existing(delta, nu) {
  return delta.add(nu).lt(q(19, 25)) || delta.mul(q(5)).add(nu.mul(q(2))).lt(q(123, 50)) ||
    (delta.lt(q(19, 25)) && delta.add(nu.mul(q(3))).lt(q(161, 100)));
}
// closed form on boxes with delta+nu >= 19/25 (every box outside the existing region): there alpha >= sigma,
// so the cross condition is delta+3nu < 327/200 and the zero/period conditions are both delta < 71/100.
// The alpha < sigma branch would read delta+5nu < 251/100; it never binds outside the existing region.
function closedForm(delta, nu) {
  return delta.lt(q(71, 100)) && delta.add(nu.mul(q(3))).lt(q(327, 200));
}
function closedFormNoDeltaCut(delta, nu) { return delta.add(nu.mul(q(3))).lt(q(327, 200)); }
{
  const boxes = [
    ['target box', q(8, 25), q(9, 20)], ['benchmark', q(2, 5), q(2, 5)], ['product witness', q(8, 25), q(11, 25)],
    ['corner', q(19, 25), q(19, 20)], ['sample new (1/2, 93/250)', q(1, 2), q(93, 250)], ['sample new (2/5, 81/200)', q(2, 5), q(81, 200)],
    ['strip edge (7/10, 61/200)', q(7, 10), q(61, 200)],
  ];
  console.log('   columns: (delta,nu) a b | grouped zero/cross/period | (D1) zero/cross/period | (D1) max | discard-variant cross | blackbox cross');
  for (const [name, d, n] of boxes) {
    const [a, b] = abOf(d, n);
    const G = grouped(a, b), D = D1(a, b, SIG), Dd = D1_discard(a, b, SIG), Db = D1_blackbox(a, b, SIG);
    console.log(`   ${name.padEnd(28)} (${d},${n}) a=${a} b=${b} | ${G.join(' ')} | ${D.join(' ')} | ${maxOf(D)} | ${Dd[1]} | ${Db[1]}`);
  }
  const [aT, bT] = abOf(q(8, 25), q(9, 20));
  const DT = D1(aT, bT, SIG);
  check('(D1) cross exponent at the target box is 407/400', DT[1].eq(q(407, 400)), `got ${DT[1]}`);
  check('(D1) max block exponent at the target box is 407/400 (> 1: not controlled)', maxOf(DT).eq(q(407, 400)));
  check('grouped cross at target is 103/100 and (D1) saves exactly 1/80 there', grouped(aT, bT)[1].eq(q(103, 100)) && grouped(aT, bT)[1].sub(DT[1]).eq(q(1, 80)));
  const [aW, bW] = abOf(q(8, 25), q(11, 25));
  check('product witness (8/25,11/25) still not controlled by (D1): cross = 401/400', D1(aW, bW, SIG)[1].eq(q(401, 400)) && !controlled(D1(aW, bW, SIG)));
  const [aC, bC] = abOf(q(19, 25), q(19, 20));
  check('corner: (D1) zero budget 41/40, worse than grouped 1', D1(aC, bC, SIG)[0].eq(q(41, 40)));

  // region grid 191 x 191
  const NG = 190; let nD1 = 0, nNew = 0, nExisting = 0, mismatch = 0, nLeftNew = 0, nDiscardNew = 0, nNoQCostNew = 0, nNoA14New = 0, alphaBelowSigma = 0, nNoDeltaCutNew = 0;
  const samples = [];
  let thresholdCandidate = q(1); // sup product exponent such that every box below is controlled by existing or D1
  for (let i = 0; i <= NG; i++) for (let j = 0; j <= NG; j++) {
    const d = q(6, 25).add(q(13, 25).mul(q(i, NG)));
    const n = q(1, 20).add(q(9, 10).mul(q(j, NG)));
    const [a, b] = abOf(d, n);
    const ex = existing(d, n); if (ex) nExisting++;
    const cD = controlled(D1(a, b, SIG)); if (cD) nD1++;
    if (d.add(n).ge(q(19, 25)) && cD !== closedForm(d, n)) mismatch++;
    if (d.add(n).ge(q(19, 25)) && a.add(b).sub(ONE).lt(SIG)) alphaBelowSigma++;
    if (closedFormNoDeltaCut(d, n) && !ex) nNoDeltaCutNew++;
    if (cD && !ex) { nNew++; if (samples.length < 4) samples.push(`(${d},${n})`); }
    if (controlled(D1_left(a, b)) && !ex) nLeftNew++;
    if (controlled(D1_discard(a, b, SIG)) && !ex) nDiscardNew++;
    // control: drop the first-Cauchy factor Q, i.e. both the zero cost sigma/2 and the period cost sigma
    const noQ = [ONE.add(a).div(q(2)), D1(a, b, SIG)[1], a];
    if (controlled(noQ) && !ex) nNoQCostNew++;
    // control: ignore the A^(-1/4) term (use sigma/4 saving always)
    const noA14 = [ONE.add(a).add(SIG).div(q(2)), a.div(q(2)).add(b.mul(q(3, 2))).sub(SIG.div(q(4))), a.add(SIG)];
    if (controlled(noA14) && !ex) nNoA14New++;
    if (!ex && !cD) thresholdCandidate = min(thresholdCandidate, d.add(n));
  }
  console.log(`   grid 191x191: existing region ${nExisting} boxes; (D1) controls ${nD1}; (D1) minus existing = ${nNew} boxes; closed-form mismatches ${mismatch}`);
  console.log(`   sample new boxes: ${samples.join(' ')}`);
  console.log(`   smallest product exponent delta+nu among grid boxes controlled by neither: ${thresholdCandidate} (grid step 1/190 in each coordinate; the exact witness (8/25,11/25) is not a grid point)`);
  console.log(`   boxes outside the existing region with alpha < sigma (where delta+5nu<251/100 would bind): ${alphaBelowSigma}`);
  check('(D1) controls a nonempty set of boxes outside the existing region', nNew > 0, `${nNew} boxes`);
  check('closed form {delta<71/100, delta+3nu<327/200} equals the (D1) budget test on every grid box with delta+nu>=19/25', mismatch === 0);
  check('alpha >= sigma on every grid box outside the existing region (the delta+5nu cut never binds there)', alphaBelowSigma === 0);
  check('uniform product threshold unchanged: uncontrolled grid boxes reach down to delta+nu < 19/25 + 1/190, and the exact witness is uncontrolled', thresholdCandidate.lt(q(19, 25).add(q(1, 190))));
  check('left-orientation analogue adds no box', nLeftNew === 0);
  check('structure-discarding variant ((R,q)<=q) adds no box', nDiscardNew === 0);
  console.log(`   (controls for D: dropping the first-Cauchy factor Q would add ${nNoQCostNew}; dropping the delta<71/100 cut would add ${nNoDeltaCutNew}; ignoring the A^(-1/4) term adds ${nNoA14New}, identical because alpha>=sigma there)`);
  globalThis.__ctrl = { nNew, nNoQCostNew, nNoDeltaCutNew, nNoA14New };

  // sector union at the target box: rho in [0,6/25], sigma in [0,1/20]
  const NS = 200; let survivors = 0, worst = ZERO, worstAt = '', worstOld = ZERO, survivorsOld = 0;
  for (let i = 0; i <= NS; i++) for (let j = 0; j <= NS; j++) {
    const rho = RHO.mul(q(i, NS)), sig = SIG.mul(q(j, NS));
    const a = q(8, 25).add(rho), b = q(9, 20).add(sig);
    const gr = maxOf(grouped(a, b));
    const l2 = maxOf([q(77, 100).add(sig).add(rho.div(q(2))), q(289, 400).add(rho).add(sig.mul(q(5, 4))), q(109, 200).add(rho).add(sig.div(q(2)))]);
    const d1 = maxOf(D1(a, b, sig));
    const bestOld = min(gr, l2), best = min(bestOld, d1);
    if (bestOld.ge(ONE)) { survivorsOld++; worstOld = max(worstOld, bestOld); }
    if (best.ge(ONE)) { survivors++; if (best.cmp(worst) > 0) { worst = best; worstAt = `(rho,sigma)=(${rho},${sig})`; } }
  }
  console.log(`   target-box sectors (201x201): survivors under grouped+LemmaII ${survivorsOld} (worst ${worstOld}); under grouped+LemmaII+(D1) ${survivors} (worst ${worst} at ${worstAt})`);
  check('worst surviving sector exponent at the target box drops from 41/40 to 407/400', worstOld.eq(q(41, 40)) && worst.eq(q(407, 400)));
  check('the survivor set shrinks but is nonempty (target box NOT controlled)', survivors > 0 && survivors < survivorsOld);
}

// ============================================================================
console.log('D. NEGATIVE CONTROLS (each must FIRE)');
// ============================================================================
{
  // D1: dropping the A^(3/2) q^(1/2) tail of Lemma H must fail for q > A
  let viol = 0, tested = 0;
  for (const [p, k] of [[2, 4], [2, 8], [3, 3], [3, 5], [5, 2], [7, 2], [11, 2], [13, 2], [31, 2]]) {
    const pk = Math.pow(p, k);
    for (let A = 1; A <= 6; A++) {
      const H = []; for (let h = A + 1; h <= 2 * A; h++) H.push(h);
      for (let l1 = 1; l1 <= 24; l1++) for (let l2 = 1; l2 <= 24; l2++) {
        if (gcd(l1, l2) !== 1) continue; tested++;
        if (lemmaH_lhs(pk, l1, l2, H) > lemmaH_bound(pk, k, l1, l2, A, true)) viol++;
      }
    }
  }
  console.log(`   D1 Lemma H without its q^(1/2) tail: ${viol} violations on ${tested} configurations (the violations come from q > A with R=0 pairs, where (0,q)=q)`);
  check('D1 FIRES: the q^(1/2) tail of Lemma H is necessary as stated', viol > 0);
  // D2: the structure-discarding step returns the generic 103/100 exactly
  const [aT, bT] = abOf(q(8, 25), q(9, 20));
  check('D2 FIRES: (R,q)<=q in the Weil term returns exactly the grouped cross 103/100', D1_discard(aT, bT, SIG)[1].eq(q(103, 100)));
  // D3: black-box (12) instead of Lemma H is worse than doing nothing
  check('D3 FIRES: black-box (12) gives 417/400 > 103/100', D1_blackbox(aT, bT, SIG)[1].eq(q(417, 400)));
  // D4: dropping the sigma/2 zero cost or the A^(-1/4) term overstates the region
  const c = globalThis.__ctrl;
  check('D4 FIRES: omitting the first-Cauchy factor Q (zero and period costs) enlarges the claimed region', c.nNoQCostNew > c.nNew, `${c.nNoQCostNew} vs ${c.nNew}`);
  check('D5 FIRES: omitting the delta<71/100 cut enlarges the claimed region', c.nNoDeltaCutNew > c.nNew, `${c.nNoDeltaCutNew} vs ${c.nNew}`);
  check('D6 FIRES: claiming the target box controlled by (D1) is false', !controlled(D1(aT, bT, SIG)));
}

// ============================================================================
console.log('E. THE FOUR-CONDITION DOMAIN OF SECTION 6 (exact rationals on the grid)');
// ============================================================================
{
  const KAP = q(141, 200), LAM = q(1631, 1000), MU = q(77, 100);
  const inA = (d, n) => !d.add(n).gt(q(3, 4));                                   // de <= x^(3/4)
  const inB = (d, n) => !d.mul(q(5)).add(n.mul(q(2))).gt(q(49, 20));              // d^5 e^2 <= x^(49/20)
  const inC = (d, n) => !d.gt(q(151, 200)) && !d.add(n.mul(q(3))).gt(q(321, 200)); // d <= x^(151/200), de^3 <= x^(321/200)
  const inCp = (d, n) => !d.gt(KAP) && !d.add(n.mul(q(3))).gt(LAM) && d.add(n).gt(MU);
  const W3 = (d, n) => !inA(d, n) && !inB(d, n) && !inC(d, n);
  const W4 = (d, n) => W3(d, n) && !inCp(d, n);
  const Wsub = (d, n) => !inA(d, n) && !inB(d, n) && !inCp(d, n);                 // the first draft's wrong substitution
  const NG = 190; let n3 = 0, n4 = 0, notSubset = 0, hitCp = 0, removed = 0, readmitted = 0, onlyThird = 0;
  let minSlackD1 = q(1), minSlackGrouped = q(1), cpBoxes = 0, sliver = 0, onlyThirdV3 = 0;
  for (let i = 0; i <= NG; i++) for (let j = 0; j <= NG; j++) {
    const d = q(6, 25).add(q(13, 25).mul(q(i, NG)));
    const n = q(1, 20).add(q(9, 10).mul(q(j, NG)));
    const [a, b] = abOf(d, n);
    const w3 = W3(d, n), w4 = W4(d, n);
    if (w3) n3++; if (w4) n4++;
    if (w4 && !w3) notSubset++;
    if (w4 && inCp(d, n)) hitCp++;
    if (w3 && !w4) removed++;
    if (Wsub(d, n) && !w3) readmitted++;
    if (!inA(d, n) && !inB(d, n) && inC(d, n) && !inCp(d, n)) onlyThird++;
    // V3's definition: controlled only by the third REGION condition (delta<19/25 and delta+3nu<161/100), not by the other two regions, not by the strip (5)
    const r1 = d.add(n).lt(q(19, 25)), r2 = d.mul(q(5)).add(n.mul(q(2))).lt(q(123, 50)), r3 = d.lt(q(19, 25)) && d.add(n.mul(q(3))).lt(q(161, 100));
    if (r3 && !r1 && !r2 && !closedForm(d, n)) onlyThirdV3++;
    if (inCp(d, n)) {
      cpBoxes++;
      const slackD1 = ONE.sub(maxOf(D1(a, b, SIG)));
      const slackG = ONE.sub(maxOf(grouped(a, n)));          // non-prime-power sectors: b = nu
      minSlackD1 = min(minSlackD1, slackD1); minSlackGrouped = min(minSlackGrouped, slackG);
    }
    if (!existing(d, n) && controlled(D1(a, b, SIG)) && !inCp(d, n)) sliver++;
  }
  const wd = q(73, 100), wn = q(29, 100);
  console.log(`   grid 191x191: W3 (three conditions) ${n3} boxes; W4 (four conditions) ${n4}; W3 minus W4 = ${removed}; W4 not inside W3: ${notSubset}; W4 meeting C': ${hitCp}`);
  console.log(`   boxes meeting C': ${cpBoxes}; min slack under (D1) there ${minSlackD1}; min slack under the grouped bound (b=nu) there ${minSlackGrouped}`);
  console.log(`   substitution control: boxes re-admitted by replacing C with C' ${readmitted}; boxes in C minus (A u B) outside C' ${onlyThird}; controlled only by the third region condition and not by the strip (V3's definition) ${onlyThirdV3}`);
  console.log(`   strip boxes controlled by (D1) outside the previous region but not removed by C' (the sliver 19/25<=delta+nu<77/100): ${sliver}`);
  console.log(`   witness (73/100,29/100): in C ${inC(wd, wn)}, in A ${inA(wd, wn)}, in B ${inB(wd, wn)}, in C' ${inCp(wd, wn)}, in W3 ${W3(wd, wn)}, in W4 ${W4(wd, wn)}, in W_substituted ${Wsub(wd, wn)}`);
  check('W4 is contained in W3 (adding a condition only shrinks the domain)', notSubset === 0);
  check('W4 misses every box of C\'', hitCp === 0);
  check('W3 minus W4 is exactly the boxes of W3 inside C\', and is nonempty', removed > 0 && removed === n3 - n4);
  check('(D1) has fixed slack at least 1/500 on every grid box meeting C\'', minSlackD1.ge(q(1, 500)), `min slack ${minSlackD1}`);
  check('grouped bound has fixed slack at least 1/500 on the non-prime-power sectors of every box meeting C\'', minSlackGrouped.ge(q(1, 500)), `min slack ${minSlackGrouped}`);
  check('witness (73/100,29/100) is outside W3 and W4 but inside the substituted domain (the first draft\'s defect)', !W3(wd, wn) && !W4(wd, wn) && Wsub(wd, wn));
  check('the substitution re-admits exactly the boxes of C minus (A u B) outside C\', a nonempty set', readmitted > 0 && readmitted === onlyThird, `${readmitted}`);
  check('V3\'s count reproduced: 928 boxes controlled only by the third region condition and not by the strip', onlyThirdV3 === 928, `${onlyThirdV3}`);
  check('the (D1) cross budget is exactly 1 at (31/100,11/25), so a lower product cut above 3/4 is needed for fixed slack', D1(...abOf(q(31, 100), q(11, 25)), SIG)[1].eq(ONE));
}

console.log(failures === 0 ? 'ALL CHECKS PASSED' : `${failures} CHECK(S) FAILED`);
process.exitCode = failures === 0 ? 0 : 1;

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/structured-dispersion-estimate-validation.js
//   invocation:  node research/structured-dispersion-estimate-validation.js
//   code-sha256: 21c9daa17c5675cef8a810f8afa2e543a18706f85d170b53235b0a6d4b2626d3
//   out-sha256:  0d9a58fe5d3056678f8b30d62ee4d416ec6fdb2809a1af5b8fc827ad18f8139c
//   body-lines:  66
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-08
//   elapsed:     1.4 s
// ============================================================================
// A. LEMMA H: harmonic gcd average with a fixed prime-power factor
//    claim: for q=p^k, (l1,l2)=1, H subset of (A,2A], R=h1*l2-h2*l1, (0,q):=q,
//    sum_{h1,h2 in H} (R,q)^(1/2) (h1,l1)^(1/2) (h2,l2)^(1/2)
//      <= (k+1) tau(l1) tau(l2) [4A^2 + 2^(3/2) A^(3/2) q^(1/2)]
//    configurations: 62832  (p not dividing l1*l2: 34528, p|l1: 14135, p|l2: 14169, proper subsets H: 18410, configs containing R=0 pairs: 7382)
//    max LHS/bound = 0.126974 at {"p":13,"k":1,"A":1,"l1":1,"l2":1,"n":1,"lhs":"3.606","bnd":"28.396"}
//   [ok] Lemma H holds on every configuration (max ratio <= 1)
// B. PAIR ALGEBRA WITH THE PRIME-POWER FACTOR INSIDE THE MODULUS
//    B1 combined-phase identity with modulus q*lcm(e1,e2): 1396 random configurations, 0 violations
//   [ok] B1 pair phase combines to e_c(R mbar) with c = q j l1 l2
//    B2 gcd bound (R,c) <= (R,q)(R,j)(h1,l1)(h2,l2) on 1396 nonzero-R configurations, 0 violations
//   [ok] B2 gcd factorisation bound
//    B3 direct sum_q Lambda(q) sum_m |Y_q(m)|^2 = 21.371929854, ordered-pair kernel form = 21.371929854, rel diff 1.66e-16
//   [ok] B3 (m,q)-moment equals its ordered-pair kernel expansion (real, modulus q*lcm)
// C. BLOCK EXPONENTS, REGION GRID AND SECTOR UNION (exact rationals)
//    columns: (delta,nu) a b | grouped zero/cross/period | (D1) zero/cross/period | (D1) max | discard-variant cross | blackbox cross
//    target box                   (8/25,9/20) a=14/25 b=1/2 | 39/50 103/100 14/25 | 161/200 407/400 61/100 | 407/400 | 103/100 | 417/400
//    benchmark                    (2/5,2/5) a=16/25 b=9/20 | 41/50 199/200 16/25 | 169/200 393/400 69/100 | 393/400 | 199/200 | 403/400
//    product witness              (8/25,11/25) a=14/25 b=49/100 | 39/50 203/200 14/25 | 161/200 401/400 61/100 | 401/400 | 203/200 | 411/400
//    corner                       (19/25,19/20) a=1 b=1 | 1 2 1 | 41/40 159/80 21/20 | 159/80 | 2 | 161/80
//    sample new (1/2, 93/250)     (1/2,93/250) a=37/50 b=211/500 | 87/100 1003/1000 37/50 | 179/200 1981/2000 79/100 | 1981/2000 | 1003/1000 | 2031/2000
//    sample new (2/5, 81/200)     (2/5,81/200) a=16/25 b=91/200 | 41/50 401/400 16/25 | 169/200 99/100 69/100 | 99/100 | 401/400 | 203/200
//    strip edge (7/10, 61/200)    (7/10,61/200) a=47/50 b=71/200 | 97/100 401/400 47/50 | 199/200 99/100 99/100 | 199/200 | 401/400 | 203/200
//   [ok] (D1) cross exponent at the target box is 407/400  got 407/400
//   [ok] (D1) max block exponent at the target box is 407/400 (> 1: not controlled)
//   [ok] grouped cross at target is 103/100 and (D1) saves exactly 1/80 there
//   [ok] product witness (8/25,11/25) still not controlled by (D1): cross = 401/400
//   [ok] corner: (D1) zero budget 41/40, worse than grouped 1
//    grid 191x191: existing region 13508 boxes; (D1) controls 12289; (D1) minus existing = 245 boxes; closed-form mismatches 0
//    sample new boxes: (778/2375,206/475) (1569/4750,206/475) (791/2375,163/380) (791/2375,206/475)
//    smallest product exponent delta+nu among grid boxes controlled by neither: 289/380 (grid step 1/190 in each coordinate; the exact witness (8/25,11/25) is not a grid point)
//    boxes outside the existing region with alpha < sigma (where delta+5nu<251/100 would bind): 0
//   [ok] (D1) controls a nonempty set of boxes outside the existing region  245 boxes
//   [ok] closed form {delta<71/100, delta+3nu<327/200} equals the (D1) budget test on every grid box with delta+nu>=19/25
//   [ok] alpha >= sigma on every grid box outside the existing region (the delta+5nu cut never binds there)
//   [ok] uniform product threshold unchanged: uncontrolled grid boxes reach down to delta+nu < 19/25 + 1/190, and the exact witness is uncontrolled
//   [ok] left-orientation analogue adds no box
//   [ok] structure-discarding variant ((R,q)<=q) adds no box
//    (controls for D: dropping the first-Cauchy factor Q would add 277; dropping the delta<71/100 cut would add 329; ignoring the A^(-1/4) term adds 245, identical because alpha>=sigma there)
//    target-box sectors (201x201): survivors under grouped+LemmaII 885 (worst 41/40); under grouped+LemmaII+(D1) 730 (worst 407/400 at (rho,sigma)=(6/25,1/20))
//   [ok] worst surviving sector exponent at the target box drops from 41/40 to 407/400
//   [ok] the survivor set shrinks but is nonempty (target box NOT controlled)
// D. NEGATIVE CONTROLS (each must FIRE)
//    D1 Lemma H without its q^(1/2) tail: 3 violations on 19386 configurations (the violations come from q > A with R=0 pairs, where (0,q)=q)
//   [ok] D1 FIRES: the q^(1/2) tail of Lemma H is necessary as stated
//   [ok] D2 FIRES: (R,q)<=q in the Weil term returns exactly the grouped cross 103/100
//   [ok] D3 FIRES: black-box (12) gives 417/400 > 103/100
//   [ok] D4 FIRES: omitting the first-Cauchy factor Q (zero and period costs) enlarges the claimed region  277 vs 245
//   [ok] D5 FIRES: omitting the delta<71/100 cut enlarges the claimed region  329 vs 245
//   [ok] D6 FIRES: claiming the target box controlled by (D1) is false
// E. THE FOUR-CONDITION DOMAIN OF SECTION 6 (exact rationals on the grid)
//    grid 191x191: W3 (three conditions) 23116 boxes; W4 (four conditions) 22877; W3 minus W4 = 239; W4 not inside W3: 0; W4 meeting C': 0
//    boxes meeting C': 3413; min slack under (D1) there 77/38000; min slack under the grouped bound (b=nu) there 273/9500
//    substitution control: boxes re-admitted by replacing C with C' 1543; boxes in C minus (A u B) outside C' 1543; controlled only by the third region condition and not by the strip (V3's definition) 928
//    strip boxes controlled by (D1) outside the previous region but not removed by C' (the sliver 19/25<=delta+nu<77/100): 50
//    witness (73/100,29/100): in C true, in A false, in B false, in C' false, in W3 false, in W4 false, in W_substituted true
//   [ok] W4 is contained in W3 (adding a condition only shrinks the domain)
//   [ok] W4 misses every box of C'
//   [ok] W3 minus W4 is exactly the boxes of W3 inside C', and is nonempty
//   [ok] (D1) has fixed slack at least 1/500 on every grid box meeting C'  min slack 77/38000
//   [ok] grouped bound has fixed slack at least 1/500 on the non-prime-power sectors of every box meeting C'  min slack 273/9500
//   [ok] witness (73/100,29/100) is outside W3 and W4 but inside the substituted domain (the first draft's defect)
//   [ok] the substitution re-admits exactly the boxes of C minus (A u B) outside C', a nonempty set  1543
//   [ok] V3's count reproduced: 928 boxes controlled only by the third region condition and not by the strip  928
//   [ok] the (D1) cross budget is exactly 1 at (31/100,11/25), so a lower product cut above 3/4 is needed for fixed slack
// ALL CHECKS PASSED
// ============================================================================
// READINGS
//
// 1. Lemma H holds on all 62832 finite configurations, including p|l1, p|l2,
//    proper subsets H and R=0 pairs; the largest ratio to the bound is
//    0.126974, so the constant is generous. Its q^(1/2) tail is necessary as
//    stated (3 violations without it, all from q>A with R=0 pairs).
// 2. The pair phase with the prime-power factor inside the modulus combines
//    to e_c(R mbar) with c = q j l1 l2 (0 violations on 1396 configurations),
//    and the (m,q)-moment equals its ordered-pair kernel expansion to
//    relative difference 1.66e-16 on the small complex model.
// 3. At the target box (8/25,9/20) the (D1) exponents are 161/200, 407/400,
//    61/100 against the grouped 39/50, 103/100, 14/25: the cross term saves
//    exactly 1/80 and the box is NOT controlled. The worst surviving sector
//    drops from 41/40 to 407/400; survivors 885 -> 730 of 40401.
// 4. On the 191x191 grid (D1) controls 245 boxes outside the previous region,
//    and the closed form {delta<71/100, delta+3nu<327/200} matches the budget
//    test on every box with delta+nu>=19/25 (0 mismatches). The product
//    witness (8/25,11/25) stays uncontrolled at 401/400, so the uniform
//    product threshold is unchanged; the corner zero budget is 41/40.
// 5. Controls: the structure-discarding step (R,q)<=q returns exactly
//    103/100; the black-box (12) route gives 417/400; dropping the
//    first-Cauchy factor Q or the delta<71/100 cut would overstate the region
//    (277 and 329 boxes against 245).
// 6. Section E: the four-condition domain W4 has 22877 grid boxes against
//    23116 for W3, is contained in W3, misses every box of C' (3413 boxes
//    meet C'), and removes exactly 239 boxes. On every box meeting C' the
//    (D1) slack is at least 77/38000 > 1/500 and the grouped slack on the
//    non-prime-power sectors at least 273/9500. Substituting C' for C would
//    re-admit 1543 boxes, among them the witness (73/100,29/100); under
//    V3's region definition 928 boxes are controlled only by the third
//    condition. The (D1) cross budget equals 1 at (31/100,11/25), which is
//    why the cut carries the lower product bound de > x^(77/100); the sliver
//    of 50 strip boxes with 19/25<=delta+nu<77/100 stays in W_dagger.
//    Finite checks certify no asymptotic rate and nothing about the sign of
//    the remainder.
// ============================================================================
