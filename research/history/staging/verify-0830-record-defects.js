#!/usr/bin/env node
'use strict';
// ============================================================================
// verify-0830-record-defects.js — three defect claims raised on 2026-08-30,
//   each recomputed from the DEFINITIONS on code written from scratch (no
//   line shared with the producers under test). Companion to
//   research/history/staging/verify-0830-record-defects.md. STAGING GRADE.
//   Adjudication only; nothing here moves an exponent or opens a route.
// ============================================================================
// CLAIM 1 (attack-0830-varE-identification.md sec.8 item 1): varE-theta2-step.js
//   builds the shift group X2 by doubling the positive-h half of ONE pattern
//   (p | h-2), but that pattern's mirror is the OTHER pattern (p | h+2), so the
//   doubled half is neither group; the true group sum 2X2 is O(1) and small,
//   and the corpus Xmix absorbs the difference.
//   PART 1 rebuilds W(h), the three group patterns and every sum from the
//   comb definition of varE-spectral.md sec.1 (E_2={1}, E_3={2}, E_5={1,2},
//   E_p = Z_p \ {0,-2} for p >= 7; f_p = p rho_p / |E_p|^2), with rho_p counted
//   by brute force per prime, W(h) checked against a brute-force pair count on
//   the full comb mod 30030 at x = 7, and X checked against the corpus column.
// CLAIM 2 (attack-0830-tail-derivation.md sec.7 item 5): the corpus's
//   "R + 1/2" (zone-tail-02.js:799, head-residual-factor.md:70) is a different
//   origin convention; under the tail's own (a + 2 < o, strict) the constants
//   are 5/2 (all origins) and 3 (odd origins), R = sum g^2 / 2W.
//   PART 2 builds the twin-slot tile T_x from scratch, sums the backward and
//   forward distance from EVERY origin o mod W under each convention, and
//   compares with R + c for the constants each convention predicts.
// CLAIM 3 (attack-0830-head-remainder.md sec.1): the record's Delta_meas =
//   2 - beta = 0.6214 at [1e7,1e8) (head-residual-hl3.md) pools a decade over
//   which the prime density falls ~10%, and the OLS intercept absorbs the
//   between-height gradient (Simpson-type); half-decades read 0.6848, 0.6500.
//   PART 3 re-sieves [1e5,1e8) from scratch, recomputes the OLS intercept at
//   decade, half, quarter and eighth resolution, and evaluates the EXACT
//   within/between decomposition of the pooled slope, against the first-order
//   prediction for a linear gradient.
// No timing figure is printed. No file outside this one is read at run time.
// ============================================================================

function assert(c, m) { if (!c) throw new Error('ASSERT FAIL: ' + m); }
const f4 = v => v.toFixed(4), f6 = v => v.toFixed(6), f3 = v => v.toFixed(3);
const pad = (s, n) => String(s).padStart(n);
function primesUpTo(n) { const s = new Uint8Array(n + 1), o = []; for (let i = 2; i <= n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } } return o; }
class Kahan { constructor() { this.s = 0; this.c = 0; } add(v) { const y = v - this.c, t = this.s + y; this.c = (t - this.s) - y; this.s = t; } get() { return this.s; } }

// ============================================================================
// PART 1 — the shift groups of the theta = 2 decoupling step
// ============================================================================
console.log('=== PART 1: X2 and Xmix rebuilt from the comb definition (claim 1) ===');

// the comb's surviving classes per prime, from varE-spectral.md sec.1
function combClasses(p) {
  if (p === 2) return [1];
  if (p === 3) return [2];
  if (p === 5) return [1, 2];
  const E = []; for (let a = 0; a < p; a++) if (a !== 0 && a !== p - 2) E.push(a); return E;
}
// rho_p(h) = #{a in E_p : a + h in E_p}, counted, and f_p = p rho / |E|^2
function localTable(p) {
  const E = combClasses(p), inE = new Uint8Array(p); for (const a of E) inE[a] = 1;
  const f = new Float64Array(p);
  for (let h = 0; h < p; h++) { let r = 0; for (const a of E) if (inE[(a + h) % p]) r++; f[h] = p * r / (E.length * E.length); }
  return { p, E, f };
}

// brute-force custody at x = 7: W(h) = M rho(h) / |E|^2 on the full comb mod M = 30030
{
  const ps = [2, 3, 5, 7, 11, 13], M = 30030, tabs = ps.map(localTable);
  const comb = []; for (let r = 0; r < M; r++) { let ok = true; for (const t of tabs) { if (!t.E.includes(r % t.p)) { ok = false; break; } } if (ok) comb.push(r); }
  const inC = new Uint8Array(M); for (const r of comb) inC[r] = 1;
  let worst = 0;
  for (let h = 0; h < M; h++) {
    let rho = 0; for (const a of comb) if (inC[(a + h) % M]) rho++;
    let prod = 1; for (const t of tabs) prod *= t.f[h % t.p];
    worst = Math.max(worst, Math.abs(M * rho / (comb.length * comb.length) - prod));
  }
  console.log('  custody at x = 7, M = 30030: |comb| = ' + comb.length + ', max |M rho(h)/|E|^2 - prod_p f_p(h)| over all h mod M = ' + worst.toExponential(2));
  assert(comb.length === 990 && worst < 1e-12, 'W(h) is the product of the per-prime tables');
}

const LEVELS = [
  { x: 7, L: 210, y: 13, corpusDX: 0.152075, corpusDX2: 0.094199, corpusDXmix: -0.241840 },
  { x: 11, L: 2310, y: 47, corpusDX: 0.256267, corpusDX2: 0.047843, corpusDXmix: -0.133037 },
  { x: 13, L: 30030, y: 173, corpusDX: 0.299499, corpusDX2: 0.027019, corpusDXmix: -0.076748 },
  { x: 17, L: 510510, y: 709, corpusDX: 0.326772, corpusDX2: 0.017012, corpusDXmix: -0.053095 },
  { x: 19, L: 9699690, y: 3109, corpusDX: 0.347302, corpusDX2: 0.011379, corpusDXmix: -0.038804 },
]; // corpus columns READ from varE-theta2-step.js PART 2 / PART 3 (embedded 2026-08-28), for comparison only

console.log('  definitions: X = sum_{|h|<L}(1-|h|/L)(W(h)-1); W1 = group "p | h"; W- = group "p | h-2"; W+ = group "p | h+2";');
console.log('  X1 = sum (1-|h|/L)(W1 - beta1); X2+- = sum (1-|h|/L)(W+- - beta2) over ALL |h| < L; X2c = [h=0] + 2 sum_{h>0} (1-h/L)(W- - beta2) (the doubling under test)');
console.log('   x |     y |  delta*X here | corpus delta*X | delta*X1 | delta*X2c (doubled half) | corpus col | delta*X2- (group) | delta*X2+ | X2c    | X2 group |  2X2 group | #h: W-(h)!=W-(-h) | max|W-(-h)-W+(h)|');
const P1 = [];
for (const lv of LEVELS) {
  const { x, L, y } = lv;
  const ps = primesUpTo(y), tabs = ps.map(localTable), big = tabs.filter(t => t.p >= 7);
  let delta = 1; for (const t of tabs) delta *= t.E.length / t.p;
  // per-prime pieces for p >= 7: generic value, and the multipliers at h = 0, h = +-2
  let D = 1, beta1 = 1, beta2 = 1;
  const A = new Float64Array(big.length), B = new Float64Array(big.length), G = new Float64Array(big.length);
  big.forEach((t, i) => {
    const p = t.p, gen = t.f[3]; // class 3 is generic for p >= 7 (neither 0 nor +-2 mod p)
    assert(Math.abs(t.f[2] - t.f[p - 2]) < 1e-15 && Math.abs(t.f[1] - gen) < 1e-15 && Math.abs(t.f[4] - gen) < 1e-15, 'f_p(2) = f_p(-2), generic classes agree at p=' + p);
    G[i] = gen; A[i] = t.f[0] / gen - 1; B[i] = t.f[2] / gen - 1; D *= gen;
    beta1 *= gen * (1 + A[i] / p); beta2 *= gen * (1 + B[i] / p);   // the mean over h of each group pattern's p-factor
  });
  const f5 = tabs[2].f; // p = 5 table
  // mean over one period 30 of f_2 f_3 f_5 (the small-prime pattern) must be 1
  { let m = 0; for (let h = 0; h < 30; h++) m += tabs[0].f[h % 2] * tabs[1].f[h % 3] * f5[h % 5]; assert(Math.abs(m / 30 - 1) < 1e-12, 'small-prime pattern has mean 1'); }
  // W at h = 0
  const W0 = (() => { let w = 1; for (const t of tabs) w *= t.f[0]; return w; })();
  assert(Math.abs(W0 - 1 / delta) < 1e-9 * W0, 'W(0) = 1/delta');
  // pattern sums over h = 6k (W and every group vanish off 6 | h); the constants (1, beta1, beta2) are subtracted
  // over ALL |h| < L at the end, using sum_{|h|<L} (1 - |h|/L) = L
  const SW = new Kahan(), S1 = new Kahan(), SM = new Kahan(), SP = new Kahan(), SC = new Kahan();
  let W1z = 6 * f5[0] * D, W2z = 6 * f5[0] * D; for (let i = 0; i < big.length; i++) W1z *= 1 + A[i];
  SW.add(W0); S1.add(W1z); SM.add(W2z); SP.add(W2z); SC.add(W2z);
  let nAsym = 0, maxMirror = 0;
  const K = L / 6;
  for (let k = 1; k < K; k++) {
    const h = 6 * k, w = 1 - h / L;
    const small = tabs[0].f[h % 2] * tabs[1].f[h % 3] * f5[h % 5];   // even in h: f_5(-h) = f_5(h)
    let Wf = 1, w1 = 1, wm = 1, wp = 1, wmNeg = 1, wpNeg = 1;
    for (let i = 0; i < big.length; i++) {
      const p = big[i].p, r = h % p;
      Wf *= big[i].f[r];
      if (r === 0) w1 *= 1 + A[i];
      if (r === 2) { wm *= 1 + B[i]; wpNeg *= 1 + B[i]; }          // p | h-2  <=>  p | (-h)+2
      if (r === p - 2) { wp *= 1 + B[i]; wmNeg *= 1 + B[i]; }      // p | h+2  <=>  p | (-h)-2
    }
    const Wh = small * Wf, W1 = small * D * w1, Wm = small * D * wm, Wp = small * D * wp, WmNeg = small * D * wmNeg, WpNeg = small * D * wpNeg;
    if (Wm !== WmNeg) nAsym++;
    maxMirror = Math.max(maxMirror, Math.abs(WmNeg - Wp), Math.abs(WpNeg - Wm));
    SW.add(2 * w * Wh);                 // W is even
    S1.add(2 * w * W1);                 // W1 is even
    SM.add(w * Wm + w * WmNeg);         // W- over +h and -h
    SP.add(w * Wp + w * WpNeg);         // W+ over +h and -h
    SC.add(2 * w * Wm);                 // the doubling under test
  }
  const X = SW.get() - L, X1 = S1.get() - beta1 * L, X2m = SM.get() - beta2 * L, X2p = SP.get() - beta2 * L, X2c = SC.get() - beta2 * L;
  assert(Math.abs(X2m - X2p) < 1e-9 * Math.max(1, Math.abs(X2m)), 'the two shift groups are equal by mirror symmetry');
  assert(Math.abs(delta * X - lv.corpusDX) < 2e-6, 'delta*X reproduces the corpus at x=' + x);
  assert(maxMirror < 1e-12, 'W-(-h) = W+(h) exactly');
  const XmixC = X - X1 - 2 * X2c, XmixT = X - X1 - X2m - X2p;
  P1.push({ x, y, L, delta, X, X1, X2m, X2p, X2c, XmixC, XmixT, lv });
  console.log('  ' + pad(x, 2) + ' | ' + pad(y, 5) + ' | ' + pad(f6(delta * X), 13) + ' | ' + pad(f6(lv.corpusDX), 14) + ' | ' + pad(f6(delta * X1), 8)
    + ' | ' + pad(f6(delta * X2c), 24) + ' | ' + pad(f6(lv.corpusDX2), 10) + ' | ' + pad(f6(delta * X2m), 17) + ' | ' + pad(f6(delta * X2p), 9)
    + ' | ' + pad(f4(X2c), 6) + ' | ' + pad(f4(X2m), 8) + ' | ' + pad(f4(X2m + X2p), 10) + ' | ' + pad(nAsym, 17) + ' | ' + maxMirror.toExponential(1));
}
console.log('\n  Xmix under each bookkeeping (X = X1 + 2 X2 + Xmix in both):');
console.log('   x |   ln y | corpus delta*Xmix | rebuilt corpus-style | true delta*Xmix | corpus/true | Xmix true | Xmix true / ln y | 2X2c - 2X2 (absorbed) | 2X2c');
for (const r of P1) {
  const lny = Math.log(r.y);
  console.log('  ' + pad(r.x, 2) + ' | ' + pad(f3(lny), 6) + ' | ' + pad(f6(r.lv.corpusDXmix), 17) + ' | ' + pad(f6(r.delta * r.XmixC), 20) + ' | ' + pad(f6(r.delta * r.XmixT), 15)
    + ' | ' + pad(f4(r.XmixC / r.XmixT), 11) + ' | ' + pad(f4(r.XmixT), 9) + ' | ' + pad(f4(r.XmixT / lny), 16) + ' | ' + pad(f4(2 * r.X2c - r.X2m - r.X2p), 21) + ' | ' + pad(f4(2 * r.X2c), 6));
  assert(Math.abs(r.delta * r.XmixC - r.lv.corpusDXmix) < 2e-6, 'corpus-style Xmix reproduces the corpus column at x=' + r.x);
}
{
  // the PROVEN bound of varE-theta2-proof.md, |2 X2| <= 60 prod_{7<=p<=y} p(p-3)/(p-2)^2, against the group sum here
  console.log('\n  the bound |2 X2| <= 60 prod p(p-3)/(p-2)^2 (varE-theta2-proof.md sec.3) against the group sum and against the doubled half:');
  for (const r of P1) {
    let bnd = 60; for (const p of primesUpTo(r.y)) if (p >= 7) bnd *= p * (p - 3) / ((p - 2) * (p - 2));
    console.log('    x = ' + pad(r.x, 2) + '  bound ' + pad(bnd.toFixed(2), 7) + '  |2X2 group| ' + f4(Math.abs(r.X2m + r.X2p)) + '  loose by ' + pad((bnd / Math.abs(r.X2m + r.X2p)).toFixed(1), 7)
      + '  |  |2X2c| ' + f4(Math.abs(2 * r.X2c)) + '  loose by ' + (bnd / Math.abs(2 * r.X2c)).toFixed(1));
  }
}
console.log('  (x = 23 not rebuilt here: L/6 = 3.7e7 positions times 1745 primes on the per-h route; the sieve route is the one under test and is not reused)');

// ============================================================================
// PART 2 — the tile ensemble's origin constants under each convention
// ============================================================================
console.log('\n=== PART 2: E[distance] - R from every origin of the twin-slot tile, by convention (claim 2) ===');
console.log('  tile T_x: openers a mod W = x# with gcd(a(a+2), W) = 1; R = sum g^2 / 2W. Backward "tail" convention: last opener a with a + 2 < o (strict).');
console.log('  Forward "head" convention: first opener a with a > o (strict). Two more backward conventions carried: a < o (distances 1..g) and a <= o (0..g-1).');
console.log('   x |         W |       D |        R | tail,all-R | tail,odd-R | tail,o=1(6)-R | tail,{1,19}(30) E_cls | E_cls-R | note E_cls | fwd,all-R | fwd,odd-R | bwd a<o,all-R | bwd a<=o,all-R | rough tail-R');
const TAILNOTE_ECLS = { 7: 14.4286, 11: 16.8442, 13: 19.5235, 17: 22.0136, 19: 24.5294, 23: 26.7880 }; // READ from attack-0830-tail-derivation.md sec.4 table
for (const x of [7, 11, 13, 17, 19, 23]) {
  const ps = primesUpTo(x); let W = 1; for (const p of ps) W *= p;
  const bad = new Uint8Array(W);
  for (const p of ps) { for (let m = 0; m < W; m += p) { bad[m] = 1; bad[(m - 2 + W) % W] = 1; } }
  const op = []; for (let a = 0; a < W; a++) if (!bad[a]) op.push(a);
  const Dn = op.length; let Dexp = 1; for (const p of ps) if (p >= 5) Dexp *= p - 2;
  assert(Dn === Dexp, 'D = prod (q-2)');
  let Sg2 = 0; for (let i = 0; i < Dn; i++) { const g = (op[(i + 1) % Dn] - op[i] + W) % W; Sg2 += g * g; }
  const R = Sg2 / (2 * W);
  // direct pass over every origin o in [0, W): backward distance under three conventions, forward under one
  // opener array extended cyclically so that every origin has a predecessor and a successor
  const ext = new Float64Array(Dn + 4); ext[0] = op[Dn - 2] - W; ext[1] = op[Dn - 1] - W; for (let i = 0; i < Dn; i++) ext[i + 2] = op[i]; ext[Dn + 2] = op[0] + W; ext[Dn + 3] = op[1] + W;
  let j = 1; // index into ext with ext[j] <= o < ext[j+1]
  const acc = { tailAll: 0, tailOdd: 0, nOdd: 0, tail1m6: 0, n1m6: 0, tailCls: 0, nCls: 0, fwdAll: 0, fwdOdd: 0, bwdLt: 0, bwdLe: 0, tailRough: 0, nRough: 0 };
  let phiW = 1; for (const p of ps) phiW *= p - 1;
  for (let o = 0; o < W; o++) {
    while (ext[j + 1] <= o) j++;
    const aLe = ext[j];                                      // largest opener <= o
    const aLt = (aLe === o) ? ext[j - 1] : aLe;              // largest opener < o
    const aTail = (aLe + 2 < o) ? aLe : ext[j - 1];         // largest opener with a + 2 < o (consecutive openers differ by >= 6)
    const aFwd = ext[j + 1];                                 // smallest opener > o
    const t = o - aTail;
    acc.tailAll += t; acc.bwdLt += o - aLt; acc.bwdLe += o - aLe; acc.fwdAll += aFwd - o;
    if (o & 1) { acc.tailOdd += t; acc.nOdd++; acc.fwdOdd += aFwd - o; }
    if (o % 6 === 1) { acc.tail1m6 += t; acc.n1m6++; }
    const r30 = o % 30; if (r30 === 1 || r30 === 19) { acc.tailCls += t; acc.nCls++; }
    { let rough = true; for (const p of ps) if (o % p === 0) { rough = false; break; } if (rough) { acc.tailRough += t; acc.nRough++; } }
  }
  assert(acc.nOdd === W / 2 && acc.nRough === phiW, 'origin counts');
  const Ecls = acc.tailCls / acc.nCls;
  const row = [x, W, Dn, f4(R), f4(acc.tailAll / W - R), f4(acc.tailOdd / acc.nOdd - R), f4(acc.tail1m6 / acc.n1m6 - R), f4(Ecls), f4(Ecls - R), f4(TAILNOTE_ECLS[x]),
    f4(acc.fwdAll / W - R), f4(acc.fwdOdd / acc.nOdd - R), f4(acc.bwdLt / W - R), f4(acc.bwdLe / W - R), f4(acc.tailRough / acc.nRough - R)];
  console.log('  ' + pad(row[0], 2) + ' | ' + pad(row[1], 9) + ' | ' + pad(row[2], 7) + ' | ' + pad(row[3], 8) + ' | ' + pad(row[4], 10) + ' | ' + pad(row[5], 10) + ' | ' + pad(row[6], 13)
    + ' | ' + pad(row[7], 21) + ' | ' + pad(row[8], 7) + ' | ' + pad(row[9], 10) + ' | ' + pad(row[10], 9) + ' | ' + pad(row[11], 9) + ' | ' + pad(row[12], 13) + ' | ' + pad(row[13], 14) + ' | ' + pad(row[14], 12));
  assert(Math.abs(acc.tailAll / W - R - 2.5) < 1e-9, 'tail, all origins: R + 5/2 at x=' + x);
  assert(Math.abs(acc.tailOdd / acc.nOdd - R - 3) < 1e-9, 'tail, odd origins: R + 3 at x=' + x);
  assert(Math.abs(acc.tail1m6 / acc.n1m6 - R - 5) < 1e-9, 'tail, origins 1 mod 6: R + 5 at x=' + x);
  assert(Math.abs(acc.fwdAll / W - R - 0.5) < 1e-9, 'head, all origins: R + 1/2 at x=' + x);
  assert(Math.abs(acc.fwdOdd / acc.nOdd - R - 1) < 1e-9, 'head, odd origins: R + 1 at x=' + x);
  assert(Math.abs(acc.bwdLt / W - R - 0.5) < 1e-9 && Math.abs(acc.bwdLe / W - R + 0.5) < 1e-9, 'backward a<o: R + 1/2; a<=o: R - 1/2 at x=' + x);
  assert(Math.abs(Ecls - TAILNOTE_ECLS[x]) < 6e-5, 'E_cls reproduces the tail note at x=' + x);
}
console.log('  asserted at every level: tail,all = R + 5/2; tail,odd = R + 3; tail,o=1 mod 6 = R + 5; head,all = R + 1/2; head,odd = R + 1; bwd a<o = R + 1/2; bwd a<=o = R - 1/2 (all to 1e-9)');
{
  const t = 447.26, Rs = 434.31, cn = 440.36; // READ from zone-tail-02.js:796-798 (top band 1e5-p.5, 17700 zones)
  console.log('  the record\'s top band, t = 447.26, R_shell = 434.31, classNull = 440.36 (zone-tail-02.js:796-798):');
  console.log('    t/R_shell = ' + f4(t / Rs) + ' | t/(R+1/2) = ' + f4(t / (Rs + 0.5)) + ' (shift ' + f4(t / Rs - t / (Rs + 0.5)) + ') | t/(R+5/2) = ' + f4(t / (Rs + 2.5))
    + ' | t/(R+3) = ' + f4(t / (Rs + 3)) + ' (shift ' + f4(t / Rs - t / (Rs + 3)) + ') | t/(R+5) = ' + f4(t / (Rs + 5)) + ' | t/classNull = ' + f4(t / cn) + ' (classNull - R = ' + f4(cn - Rs) + ')');
}

// ============================================================================
// PART 3 — the head's endpoint deficit Delta = 2 - beta at four window widths
// ============================================================================
console.log('\n=== PART 3: Delta = 2 - beta re-measured on an independent sieve, decade to eighth-decade (claim 3) ===');
const NMAX = 100000004;
const comp = new Uint8Array(NMAX + 1);            // full sieve to 1e8 + 4
{ comp[0] = comp[1] = 1; for (let i = 2; i * i <= NMAX; i++) if (!comp[i]) for (let j = i * i; j <= NMAX; j += i) comp[j] = 1; }
// convention A of head-residual-hl3.js SEC 0 (as documented in head-residual-factor.md sec.1 and attack-0830-head-remainder.md sec.1):
// gaps between consecutive twin openers with BOTH openers in [lo, hi); n_i = number of primes in [a_i, a_{i+1}) (the opener and its partner included)
function measure(lo, hi) {
  let prev = -1, np = 0, nGap = 0, Sg = 0, Sg2 = 0, Sn = 0, Sn2 = 0, Sng = 0;
  for (let n = lo | 1; n < hi; n += 2) {
    if (comp[n]) continue;
    if (!comp[n + 2]) {
      if (prev > 0) { const g = n - prev; nGap++; Sg += g; Sg2 += g * g; Sn += np; Sn2 += np * np; Sng += np * g; }
      prev = n; np = 0;
    }
    np++;
  }
  const Eg = Sg / nGap, En = Sn / nGap, vg = Sg2 / nGap - Eg * Eg, vn = Sn2 / nGap - En * En;
  const alpha = (Sng / nGap - En * Eg) / vg, beta = En - alpha * Eg;
  const s2 = (vn - alpha * alpha * vg) * nGap / (nGap - 2), se = Math.sqrt(s2 / nGap * (1 + Eg * Eg / vg));
  return { lo, hi, nGap, Eg, En, vg, alpha, beta, se, delta: 2 - beta, lam: En / Eg };
}
const edges = (e0, e1, k) => Array.from({ length: k + 1 }, (_, i) => Math.round(Math.pow(10, e0 + (e1 - e0) * i / k)));
const RECORD = { '5': [0.6899, 0.0355], '6': [0.6862, 0.0148], '7': [0.6214, 0.0060] }; // READ from head-residual-hl3.md sec.3 table (lines 176-178)
const RECORD_HALF7 = [[0.6848, 0.0111, 101137], [0.6500, 0.0070, 280193]];        // READ from attack-0830-head-remainder.js:690-691
const RECORD_QUARTER7 = [0.7203, 0.6842, 0.6677, 0.6565];                          // READ from attack-0830-head-remainder.js:692-695
const HL_HALF = { 5: [0.8298, 0.7786], 6: [0.7385, 0.7039], 7: [0.6768, 0.6472] }; // Delta_HL per half-decade READ from attack-0830-head-remainder.js:848-878
const HL_DEC = { 5: 0.7914, 6: 0.7124, 7: 0.6545 };                                // READ from head-residual-hl3.md sec.3 table
for (const e of [5, 6, 7]) {
  const dec = measure(Math.pow(10, e), Math.pow(10, e + 1));
  console.log('  decade [1e' + e + ',1e' + (e + 1) + '): gaps ' + dec.nGap + '  E[g] = ' + f3(dec.Eg) + '  E[n] = ' + f3(dec.En) + '  alpha = ' + dec.alpha.toFixed(5) + '  beta = ' + f4(dec.beta)
    + '  Delta_meas = ' + f4(dec.delta) + ' +- ' + f4(dec.se) + '   (record ' + f4(RECORD[e][0]) + ' +- ' + f4(RECORD[e][1]) + ')   Delta_HL record ' + f4(HL_DEC[e]) + '  ratio ' + f3(HL_DEC[e] / dec.delta));
  assert(Math.abs(dec.delta - RECORD[e][0]) < 1.5e-4 && Math.abs(dec.se - RECORD[e][1]) < 1.5e-4, 'decade Delta reproduces the record at 1e' + e);
  for (const k of [2, 4, 8]) {
    const E = edges(e, e + 1, k), subs = [];
    for (let i = 0; i < k; i++) subs.push(measure(E[i], E[i + 1]));
    const N = subs.reduce((s, r) => s + r.nGap, 0), w = subs.map(r => r.nGap / N);
    const mbar = subs.reduce((s, r, i) => s + w[i] * r.Eg, 0), mubar = subs.reduce((s, r, i) => s + w[i] * r.En, 0);
    const Vw = subs.reduce((s, r, i) => s + w[i] * r.vg, 0), Bm = subs.reduce((s, r, i) => s + w[i] * (r.Eg - mbar) ** 2, 0);
    const covW = subs.reduce((s, r, i) => s + w[i] * r.alpha * r.vg, 0), covB = subs.reduce((s, r, i) => s + w[i] * (r.En - mubar) * (r.Eg - mbar), 0);
    const aW = covW / Vw, sB = covB / Bm;                        // within slope, between slope
    const dbar = subs.reduce((s, r, i) => s + w[i] * r.delta, 0); // gap-weighted mean of the sub-window Deltas
    const lamBar = subs.reduce((s, r, i) => s + w[i] * r.lam, 0);
    // pooled OLS over the union of the sub-windows (the sub-windows partition the decade's gap set up to the gaps straddling a cut)
    const alphaPoolId = (covW + covB) / (Vw + Bm), betaPoolId = mubar - alphaPoolId * mbar;
    const term1 = subs.reduce((s, r, i) => s + w[i] * r.alpha * (r.Eg - mbar), 0), term2 = (subs.reduce((s, r, i) => s + w[i] * r.alpha, 0) - alphaPoolId) * mbar;
    const predLinear = -mbar * (Bm / (Vw + Bm)) * (aW - lamBar / 2);
    const pieceA = mbar * (aW - sB) * (Bm / (Vw + Bm));          // the between-slope (Simpson) piece, exact given the within slope aW
    const pieceB = (term1 + term2) - pieceA;                       // what is left: the within slopes themselves fall with height and the pooled OLS weights them by Var(g)
    console.log('    ' + k + ' sub-windows: Delta = ' + subs.map(r => f4(r.delta)).join(', ') + ' | gap-weighted mean ' + f4(dbar) + ' | pooled (direct) ' + f4(dec.delta) + ' | pooled minus mean ' + f4(dec.delta - dbar)
      + ' | straddling gaps ' + (dec.nGap - N));
    console.log('       within slope ' + aW.toFixed(5) + ', between slope ' + sB.toFixed(5) + ', lambda/2 = ' + (lamBar / 2).toFixed(5) + ', B/(Vw+B) = ' + (Bm / (Vw + Bm)).toFixed(5)
      + ' | identity: 2 - beta_pool = ' + f4(2 - betaPoolId) + ' (direct ' + f4(dec.delta) + ') | Delta_pool - mean = -(' + f4(term1) + ' + ' + f4(term2) + ') = -(' + f4(pieceA) + ' between-slope + ' + f4(pieceB) + ' slope-gradient) | linear-gradient prediction ' + f4(predLinear)
      + ' | alpha_k = ' + subs.map(r => r.alpha.toFixed(5)).join(','));
    if (k === 8) {
      // each half-decade re-read as the gap-weighted mean of its four eighths (the half's own pooling term removed to eighth resolution), against the record's half-decade HL
      const halves = [subs.slice(0, 4), subs.slice(4)];
      const line = halves.map((h, i) => { const n = h.reduce((s, r) => s + r.nGap, 0), d = h.reduce((s, r) => s + r.delta * r.nGap, 0) / n; return f4(d) + ' (HL ' + f4(HL_HALF[e][i]) + ', HL - local = ' + f4(HL_HALF[e][i] - d) + ')'; });
      console.log('       half-decades re-read from their eighths: ' + line.join(' | '));
    }
    if (k === 2) {
      const hlMean = (HL_HALF[e][0] * subs[0].nGap + HL_HALF[e][1] * subs[1].nGap) / N;
      console.log('       HL (record): half-decade ' + f4(HL_HALF[e][0]) + ', ' + f4(HL_HALF[e][1]) + '; gap-weighted mean ' + f4(hlMean) + ' against the record\'s pooled Delta_HL ' + f4(HL_DEC[e]) + ' (difference ' + f4(HL_DEC[e] - hlMean) + ')');
      console.log('       (HL - meas)/se at the halves: ' + subs.map((r, i) => ((HL_HALF[e][i] - r.delta) / r.se).toFixed(2)).join(', ') + ' | (HL - meas)/meas: ' + subs.map((r, i) => ((HL_HALF[e][i] - r.delta) / r.delta).toFixed(3)).join(', ')
        + ' | pooled (HL - meas)/se = ' + ((HL_DEC[e] - dec.delta) / dec.se).toFixed(2));
      if (e === 7) { subs.forEach((r, i) => assert(Math.abs(r.delta - RECORD_HALF7[i][0]) < 1.5e-4 && Math.abs(r.se - RECORD_HALF7[i][1]) < 1.5e-4 && r.nGap === RECORD_HALF7[i][2], 'half-decade ' + i + ' reproduces the record')); }
    }
    if (k === 4 && e === 7) subs.forEach((r, i) => assert(Math.abs(r.delta - RECORD_QUARTER7[i]) < 1.5e-4, 'quarter-decade ' + i + ' reproduces the record'));
  }
}
console.log('  prime density ratio across a decade, ln(1e7)/ln(1e8) = ' + f4(Math.log(1e7) / Math.log(1e8)) + ' (the "falls ten percent")');
console.log('\nDONE');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/verify-0830-record-defects.js
//   invocation:  node research/history/staging/verify-0830-record-defects.js
//   code-sha256: 36bb5487c96279a5358ead6cf8c92de65bc6bc65de2fec5d8f337479c23a40a3
//   out-sha256:  b04233d47c14d778bb2aec332790fa61e1fabd3567c2ffa025e37997e7155ef1
//   body-lines:  75
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     27.7 s
// ============================================================================
// === PART 1: X2 and Xmix rebuilt from the comb definition (claim 1) ===
//   custody at x = 7, M = 30030: |comb| = 990, max |M rho(h)/|E|^2 - prod_p f_p(h)| over all h mod M = 3.55e-15
//   definitions: X = sum_{|h|<L}(1-|h|/L)(W(h)-1); W1 = group "p | h"; W- = group "p | h-2"; W+ = group "p | h+2";
//   X1 = sum (1-|h|/L)(W1 - beta1); X2+- = sum (1-|h|/L)(W+- - beta2) over ALL |h| < L; X2c = [h=0] + 2 sum_{h>0} (1-h/L)(W- - beta2) (the doubling under test)
//    x |     y |  delta*X here | corpus delta*X | delta*X1 | delta*X2c (doubled half) | corpus col | delta*X2- (group) | delta*X2+ | X2c    | X2 group |  2X2 group | #h: W-(h)!=W-(-h) | max|W-(-h)-W+(h)|
//    7 |    13 |      0.152075 |       0.152075 | 0.205517 |                 0.094199 |   0.094199 |         -0.009235 | -0.009235 | 2.8574 |  -0.2801 |    -0.5603 |                 9 | 0.0e+0
//   11 |    47 |      0.256267 |       0.256267 | 0.293618 |                 0.047843 |   0.047843 |          0.004509 |  0.004509 | 2.8140 |   0.2652 |     0.5304 |               159 | 0.0e+0
//   13 |   173 |      0.299499 |       0.299499 | 0.322208 |                 0.027019 |   0.027019 |          0.001365 |  0.001365 | 2.6666 |   0.1347 |     0.2694 |              2444 | 0.0e+0
//   17 |   709 |      0.326772 |       0.326772 | 0.345842 |                 0.017012 |   0.017012 |          0.000736 |  0.000736 | 2.6760 |   0.1157 |     0.2314 |             45296 | 0.0e+0
//   19 |  3109 |      0.347302 |       0.347302 | 0.363348 |                 0.011379 |   0.011379 |          0.000394 |  0.000394 | 2.6633 |   0.0923 |     0.1846 |            900679 | 0.0e+0
//
//   Xmix under each bookkeeping (X = X1 + 2 X2 + Xmix in both):
//    x |   ln y | corpus delta*Xmix | rebuilt corpus-style | true delta*Xmix | corpus/true | Xmix true | Xmix true / ln y | 2X2c - 2X2 (absorbed) | 2X2c
//    7 |  2.565 |         -0.241840 |            -0.241840 |       -0.034971 |      6.9154 |   -1.0608 |          -0.4136 |                6.2750 | 5.7147
//   11 |  3.850 |         -0.133037 |            -0.133037 |       -0.046368 |      2.8692 |   -2.7273 |          -0.7084 |                5.0977 | 5.6281
//   13 |  5.153 |         -0.076748 |            -0.076748 |       -0.025439 |      3.0169 |   -2.5106 |          -0.4872 |                5.0637 | 5.3331
//   17 |  6.564 |         -0.053095 |            -0.053095 |       -0.020542 |      2.5847 |   -3.2312 |          -0.4923 |                5.1205 | 5.3519
//   19 |  8.042 |         -0.038804 |            -0.038804 |       -0.016835 |      2.3050 |   -3.9404 |          -0.4900 |                5.1421 | 5.3266
//
//   the bound |2 X2| <= 60 prod p(p-3)/(p-2)^2 (varE-theta2-proof.md sec.3) against the group sum and against the doubled half:
//     x =  7  bound   78.44  |2X2 group| 0.5603  loose by   140.0  |  |2X2c| 5.7147  loose by 13.7
//     x = 11  bound  106.82  |2X2 group| 0.5304  loose by   201.4  |  |2X2c| 5.6281  loose by 19.0
//     x = 13  bound  137.73  |2X2 group| 0.2694  loose by   511.2  |  |2X2c| 5.3331  loose by 25.8
//     x = 17  bound  173.68  |2X2 group| 0.2314  loose by   750.6  |  |2X2c| 5.3519  loose by 32.5
//     x = 19  bound  211.82  |2X2 group| 0.1846  loose by  1147.6  |  |2X2c| 5.3266  loose by 39.8
//   (x = 23 not rebuilt here: L/6 = 3.7e7 positions times 1745 primes on the per-h route; the sieve route is the one under test and is not reused)
//
// === PART 2: E[distance] - R from every origin of the twin-slot tile, by convention (claim 2) ===
//   tile T_x: openers a mod W = x# with gcd(a(a+2), W) = 1; R = sum g^2 / 2W. Backward "tail" convention: last opener a with a + 2 < o (strict).
//   Forward "head" convention: first opener a with a > o (strict). Two more backward conventions carried: a < o (distances 1..g) and a <= o (0..g-1).
//    x |         W |       D |        R | tail,all-R | tail,odd-R | tail,o=1(6)-R | tail,{1,19}(30) E_cls | E_cls-R | note E_cls | fwd,all-R | fwd,odd-R | bwd a<o,all-R | bwd a<=o,all-R | rough tail-R
//    7 |       210 |      15 |   8.8286 |     2.5000 |     3.0000 |        5.0000 |               14.4286 |  5.6000 |    14.4286 |    0.5000 |    1.0000 |        0.5000 |        -0.5000 |       4.9214
//   11 |      2310 |     135 |  11.1351 |     2.5000 |     3.0000 |        5.0000 |               16.8442 |  5.7091 |    16.8442 |    0.5000 |    1.0000 |        0.5000 |        -0.5000 |       5.2524
//   13 |     30030 |    1485 |  13.6909 |     2.5000 |     3.0000 |        5.0000 |               19.5235 |  5.8326 |    19.5235 |    0.5000 |    1.0000 |        0.5000 |        -0.5000 |       5.4903
//   17 |    510510 |   22275 |  16.1009 |     2.5000 |     3.0000 |        5.0000 |               22.0136 |  5.9127 |    22.0136 |    0.5000 |    1.0000 |        0.5000 |        -0.5000 |       5.6719
//   19 |   9699690 |  378675 |  18.5566 |     2.5000 |     3.0000 |        5.0000 |               24.5294 |  5.9728 |    24.5294 |    0.5000 |    1.0000 |        0.5000 |        -0.5000 |       5.8263
//   23 | 223092870 | 7952175 |  20.7803 |     2.5000 |     3.0000 |        5.0000 |               26.7880 |  6.0078 |    26.7880 |    0.5000 |    1.0000 |        0.5000 |        -0.5000 |       5.9604
//   asserted at every level: tail,all = R + 5/2; tail,odd = R + 3; tail,o=1 mod 6 = R + 5; head,all = R + 1/2; head,odd = R + 1; bwd a<o = R + 1/2; bwd a<=o = R - 1/2 (all to 1e-9)
//   the record's top band, t = 447.26, R_shell = 434.31, classNull = 440.36 (zone-tail-02.js:796-798):
//     t/R_shell = 1.0298 | t/(R+1/2) = 1.0286 (shift 0.0012) | t/(R+5/2) = 1.0239 | t/(R+3) = 1.0228 (shift 0.0071) | t/(R+5) = 1.0181 | t/classNull = 1.0157 (classNull - R = 6.0500)
//
// === PART 3: Delta = 2 - beta re-measured on an independent sieve, decade to eighth-decade (claim 3) ===
//   decade [1e5,1e6): gaps 6944  E[g] = 129.581  E[n] = 9.921  alpha = 0.06645  beta = 1.3101  Delta_meas = 0.6899 +- 0.0355   (record 0.6899 +- 0.0355)   Delta_HL record 0.7914  ratio 1.147
//     2 sub-windows: Delta = 0.8239, 0.7114 | gap-weighted mean 0.7423 | pooled (direct) 0.6899 | pooled minus mean -0.0524 | straddling gaps 1
//        within slope 0.06665, between slope 0.04002, lambda/2 = 0.03840, B/(Vw+B) = 0.00735 | identity: 2 - beta_pool = 0.6900 (direct 0.6899) | Delta_pool - mean = -(-0.0274 + 0.0797) = -(0.0254 between-slope + 0.0269 slope-gradient) | linear-gradient prediction -0.0269 | alpha_k = 0.07147,0.06540
//        HL (record): half-decade 0.8298, 0.7786; gap-weighted mean 0.7927 against the record's pooled Delta_HL 0.7914 (difference -0.0013)
//        (HL - meas)/se at the halves: 0.10, 1.60 | (HL - meas)/meas: 0.007, 0.094 | pooled (HL - meas)/se = 2.86
//     4 sub-windows: Delta = 1.0365, 0.7378, 0.6619, 0.7648 | gap-weighted mean 0.7605 | pooled (direct) 0.6899 | pooled minus mean -0.0706 | straddling gaps 3
//        within slope 0.06670, between slope 0.03889, lambda/2 = 0.03843, B/(Vw+B) = 0.00905 | identity: 2 - beta_pool = 0.6909 (direct 0.6899) | Delta_pool - mean = -(-0.0351 + 0.1047) = -(0.0326 between-slope + 0.0370 slope-gradient) | linear-gradient prediction -0.0332 | alpha_k = 0.07520,0.06975,0.06665,0.06485
//     8 sub-windows: Delta = 0.8372, 1.1961, 0.9467, 0.5738, 0.6314, 0.6984, 0.7213, 0.8088 | gap-weighted mean 0.7656 | pooled (direct) 0.6899 | pooled minus mean -0.0757 | straddling gaps 7
//        within slope 0.06673, between slope 0.04002, lambda/2 = 0.03844, B/(Vw+B) = 0.01019 | identity: 2 - beta_pool = 0.6916 (direct 0.6899) | Delta_pool - mean = -(-0.0377 + 0.1117) = -(0.0353 between-slope + 0.0387 slope-gradient) | linear-gradient prediction -0.0373 | alpha_k = 0.07435,0.07587,0.07228,0.06793,0.06704,0.06644,0.06517,0.06467
//        half-decades re-read from their eighths: 0.8543 (HL 0.8298, HL - local = -0.0245) | 0.7320 (HL 0.7786, HL - local = 0.0466)
//   decade [1e6,1e7): gaps 50810  E[g] = 177.129  E[n] = 11.535  alpha = 0.05770  beta = 1.3138  Delta_meas = 0.6862 +- 0.0148   (record 0.6862 +- 0.0148)   Delta_HL record 0.7124  ratio 1.038
//     2 sub-windows: Delta = 0.7705, 0.7172 | gap-weighted mean 0.7316 | pooled (direct) 0.6862 | pooled minus mean -0.0455 | straddling gaps 1
//        within slope 0.05783, between slope 0.03424, lambda/2 = 0.03264, B/(Vw+B) = 0.00538 | identity: 2 - beta_pool = 0.6869 (direct 0.6862) | Delta_pool - mean = -(-0.0225 + 0.0673) = -(0.0225 between-slope + 0.0223 slope-gradient) | linear-gradient prediction -0.0240 | alpha_k = 0.06118,0.05694
//        HL (record): half-decade 0.7385, 0.7039; gap-weighted mean 0.7132 against the record's pooled Delta_HL 0.7124 (difference -0.0008)
//        (HL - meas)/se at the halves: -1.19, -0.77 | (HL - meas)/meas: -0.042, -0.019 | pooled (HL - meas)/se = 1.77
//     4 sub-windows: Delta = 0.7801, 0.7950, 0.7467, 0.7184 | gap-weighted mean 0.7453 | pooled (direct) 0.6862 | pooled minus mean -0.0592 | straddling gaps 3
//        within slope 0.05787, between slope 0.03439, lambda/2 = 0.03266, B/(Vw+B) = 0.00708 | identity: 2 - beta_pool = 0.6867 (direct 0.6862) | Delta_pool - mean = -(-0.0294 + 0.0879) = -(0.0295 between-slope + 0.0291 slope-gradient) | linear-gradient prediction -0.0316 | alpha_k = 0.06248,0.06062,0.05832,0.05627
//     8 sub-windows: Delta = 0.8406, 0.7507, 0.8487, 0.7721, 0.7628, 0.7455, 0.7022, 0.7371 | gap-weighted mean 0.7516 | pooled (direct) 0.6862 | pooled minus mean -0.0655 | straddling gaps 7
//        within slope 0.05788, between slope 0.03500, lambda/2 = 0.03267, B/(Vw+B) = 0.00774 | identity: 2 - beta_pool = 0.6868 (direct 0.6862) | Delta_pool - mean = -(-0.0317 + 0.0966) = -(0.0314 between-slope + 0.0335 slope-gradient) | linear-gradient prediction -0.0345 | alpha_k = 0.06363,0.06174,0.06149,0.06010,0.05886,0.05797,0.05678,0.05593
//        half-decades re-read from their eighths: 0.8000 (HL 0.7385, HL - local = -0.0615) | 0.7337 (HL 0.7039, HL - local = -0.0298)
//   decade [1e7,1e8): gaps 381331  E[g] = 236.014  E[n] = 13.366  alpha = 0.05079  beta = 1.3786  Delta_meas = 0.6214 +- 0.0060   (record 0.6214 +- 0.0060)   Delta_HL record 0.6545  ratio 1.053
//     2 sub-windows: Delta = 0.6848, 0.6500 | gap-weighted mean 0.6592 | pooled (direct) 0.6214 | pooled minus mean -0.0378 | straddling gaps 1
//        within slope 0.05087, between slope 0.02867, lambda/2 = 0.02836, B/(Vw+B) = 0.00358 | identity: 2 - beta_pool = 0.6214 (direct 0.6214) | Delta_pool - mean = -(-0.0189 + 0.0567) = -(0.0187 between-slope + 0.0191 slope-gradient) | linear-gradient prediction -0.0190 | alpha_k = 0.05339,0.05018
//        HL (record): half-decade 0.6768, 0.6472; gap-weighted mean 0.6551 against the record's pooled Delta_HL 0.6545 (difference -0.0006)
//        (HL - meas)/se at the halves: -0.72, -0.39 | (HL - meas)/meas: -0.012, -0.004 | pooled (HL - meas)/se = 5.50
//     4 sub-windows: Delta = 0.7203, 0.6842, 0.6677, 0.6565 | gap-weighted mean 0.6705 | pooled (direct) 0.6214 | pooled minus mean -0.0491 | straddling gaps 3
//        within slope 0.05089, between slope 0.02848, lambda/2 = 0.02838, B/(Vw+B) = 0.00464 | identity: 2 - beta_pool = 0.6214 (direct 0.6214) | Delta_pool - mean = -(-0.0246 + 0.0737) = -(0.0245 between-slope + 0.0246 slope-gradient) | linear-gradient prediction -0.0247 | alpha_k = 0.05461,0.05280,0.05119,0.04968
//     8 sub-windows: Delta = 0.7384, 0.7103, 0.6894, 0.6856, 0.6838, 0.6620, 0.6565, 0.6614 | gap-weighted mean 0.6736 | pooled (direct) 0.6214 | pooled minus mean -0.0522 | straddling gaps 7
//        within slope 0.05090, between slope 0.02848, lambda/2 = 0.02838, B/(Vw+B) = 0.00493 | identity: 2 - beta_pool = 0.6213 (direct 0.6214) | Delta_pool - mean = -(-0.0261 + 0.0783) = -(0.0261 between-slope + 0.0262 slope-gradient) | linear-gradient prediction -0.0262 | alpha_k = 0.05523,0.05416,0.05325,0.05248,0.05167,0.05086,0.05009,0.04939
//        half-decades re-read from their eighths: 0.7005 (HL 0.6768, HL - local = -0.0237) | 0.6638 (HL 0.6472, HL - local = -0.0166)
//   prime density ratio across a decade, ln(1e7)/ln(1e8) = 0.8750 (the "falls ten percent")
//
// DONE
// ============================================================================
// READINGS
// (written in the companion note; the numbers above are the record)
