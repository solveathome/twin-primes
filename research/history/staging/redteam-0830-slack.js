// ============================================================================
// redteam-0830-slack.js — adversarial re-derivation, on code written from the
// definitions, of the three notes landed 2026-08-30 and of the verification
// whose rulings now ride on five live files:
//   attack-0830-head-remainder.md / .js
//   attack-0830-tail-derivation.md / .js
//   verify-0830-record-defects.md / .js   (riders on varE-theta2-step.md,
//        varE-theta2-proof.md, varE-spectral.md, zone-tail-02-0829.md,
//        head-residual-hl3.md)
//
// Nothing here is copied from those producers. Every object is rebuilt from
// the written definitions:
//   * the tile T_x is sieved from gcd(a(a+2), x#) = 1 and EVERY origin in
//     [0, W) is visited with a two-period opener pointer (the wrap is the
//     failure mode: a one-period pointer gives R + 2.500004 at x = 23);
//   * W(h) is rebuilt from E_2={1}, E_3={2}, E_5={1,2}, E_p=Z_p\{0,-2};
//   * rho(t,g) is rebuilt from nu_4 = |{0,2,g,g+2} mod q|, nu_5 = |that + t|,
//     normalised by its own generic factor (the normaliser is t- and
//     g-independent and cancels in every pipeline quantity);
//   * the head windows come from a fresh sieve to 1.2e8.
//
//   SEC 0  custody on the number line
//   SEC 1  the tile: the convention constants and the tail note's tables,
//          exact at x = 7..23 and (segmented) x = 29
//   SEC 2  the shift groups X1, X2-, X2+, Xmix, x = 7..23
//   SEC 3  the pooled intercept: sub-window means to 16 splits, the exact
//          two-piece decomposition, HL's own pooling, the de-pooled halves
//   SEC 4  the rotation ensemble ladder pipe/ens, exact y = 11..29
//   SEC 5  the Mertens constant, the record's split, and the anchoring
//          part's sensitivity to the un-matched E[g] at the top window
//
//   node research/history/staging/redteam-0830-slack.js     (~3 min)
// ============================================================================
'use strict';
let FAIL = 0;
const err = (...a) => process.stderr.write(a.join(' ') + '\n');
function A(name, got, want, tol) {
  const ok = Math.abs(got - want) <= tol;
  if (!ok) { FAIL++; console.log(`  ASSERT FAIL ${name}: ${got} vs ${want} (tol ${tol})`); }
  return ok;
}
function AE(name, got, want) {
  if (got !== want) { FAIL++; console.log(`  ASSERT FAIL ${name}: ${got} vs ${want}`); }
}
const f3 = (v) => v.toFixed(3), f4 = (v) => v.toFixed(4), f5 = (v) => v.toFixed(5), f6 = (v) => v.toFixed(6);
const pad = (v, n) => String(v).padStart(n);
function primesUpTo(n) { const s = new Uint8Array(n + 1), o = []; for (let i = 2; i <= n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } } return o; }
const PR = primesUpTo(50000);

// ---------------------------------------------------------------------------
// rho~(t,g): hl3 SEC 2's conditional singular series, divided by its own
// t-independent generic product. rho = K_y * rho~ with K_y free of t and g,
// so every ratio the pipeline forms is unchanged.  ymax truncates the product
// (ymax = Infinity is the number line's own value).
// ---------------------------------------------------------------------------
function WtildeSum(g, ymax) {
  const Arr = new Float64Array(g + 1);
  for (let t = 0; t <= g; t++) Arr[t] = (t % 2 === 0 && t % 3 !== 1) ? 1 : 0;
  const res = (v, q) => ((v % q) + q) % q;
  for (const q of PR) {
    if (q < 5) continue; if (q > g + 2 || q > ymax) break;
    const mk = new Uint8Array(q); mk[0] = 1; mk[2 % q] = 1; mk[res(g, q)] = 1; mk[res(g + 2, q)] = 1;
    let nu4 = 0; for (let r = 0; r < q; r++) if (mk[r]) nu4++;
    const c1 = 1 - 1 / q, fMark = 1 / c1, fGen = (1 - (nu4 + 1) / q) / ((1 - nu4 / q) * c1);
    const gen = q === 5 ? 1 : ((1 - 5 / q) / ((1 - 4 / q) * c1));
    const rm = fMark / gen, rg = fGen / gen;
    if (Math.abs(rg - 1) < 1e-15) { for (let t = 0; t <= g; t++) if (mk[t % q]) Arr[t] *= rm; }
    else for (let t = 0; t <= g; t++) Arr[t] *= mk[t % q] ? rm : rg;
  }
  let s = 0; for (let t = 3; t <= g - 1; t++) s += Arr[t];
  return s;
}
const WCACHE = new Map();
const Wg = (g) => { if (!WCACHE.has(g)) WCACHE.set(g, WtildeSum(g, Infinity)); return WCACHE.get(g); };

// ===========================================================================
// SEC 0 — CUSTODY ON THE NUMBER LINE
// ===========================================================================
console.log('SEC 0 — CUSTODY: a fresh sieve to 1.2e8, every figure the three notes assert about the head windows');
const NLIM = 1.2e8;
const comp = new Uint8Array(NLIM); comp[0] = comp[1] = 1;
for (let i = 2; i * i < NLIM; i++) if (!comp[i]) for (let j = i * i; j < NLIM; j += i) comp[j] = 1;
const OP = []; for (let a = 3; a + 2 < NLIM; a += 2) if (!comp[a] && !comp[a + 2]) OP.push(a);
const NOP = OP.length;
const NGAP = new Int32Array(NOP);
for (let i = 0; i + 1 < NOP; i++) { let c = 0; for (let m = OP[i]; m < OP[i + 1]; m++) if (!comp[m]) c++; NGAP[i] = c; }
err('  [sec0] sieve done');

function window(lo, hi, withHL) {
  let G = 0, Sg = 0, Sg2 = 0, Sn = 0, Sn2 = 0, Sng = 0, SW = 0, SWg = 0, gMax = 0, bad6 = 0;
  let i0 = 0; while (i0 < NOP && OP[i0] < lo) i0++;
  for (let i = i0; i + 1 < NOP && OP[i + 1] < hi; i++) {
    const g = OP[i + 1] - OP[i], n = NGAP[i];
    G++; Sg += g; Sg2 += g * g; Sn += n; Sn2 += n * n; Sng += n * g;
    if (g > gMax) gMax = g; if (g > 3 && g % 6 !== 0) bad6++;
    if (withHL) { const w = Wg(g); SW += w; SWg += w * g; }
  }
  const Eg = Sg / G, En = Sn / G, vg = Sg2 / G - Eg * Eg, vn = Sn2 / G - En * En;
  const al = (Sng / G - En * Eg) / vg, be = En - al * Eg;
  const s2 = (vn - al * al * vg) * G / (G - 2);
  const se = Math.sqrt(s2 * (1 / G) * (1 + Eg * Eg / vg));
  const o = { G, Eg, En, vg, al, be, delta: 2 - be, se, gMax, bad6, R: Sg2 / (2 * Sg), lam: En / Eg };
  if (withHL) { const EW = SW / G, cWg = SWg / G - EW * Eg; o.dHL = (En - 2) * (Eg * cWg / (EW * vg) - 1); }
  return o;
}
{
  const d7 = window(1e7, 1e8, true);
  // the forward head F(p) over every prime >= 7, and over coprime-30 / -210 origins
  let k = 0; while (OP[k] <= 1e7) k++;
  let sP = 0, cP = 0, s30 = 0, c30 = 0, s210 = 0, c210 = 0;
  for (let o = 1e7; o < 1e8; o++) {
    while (OP[k] <= o) k++;
    const f = OP[k] - o;
    if (!comp[o]) { sP += f; cP++; }
    if (o % 2 && o % 3 && o % 5) { s30 += f; c30++; if (o % 7) { s210 += f; c210++; } }
  }
  const h = sP / cP;
  console.log(`  [1e7,1e8): gaps ${d7.G}  R = ${f4(d7.R)}  g_max = ${d7.gMax}  gaps > 3 not divisible by 6: ${d7.bad6}`);
  console.log(`    primes >= 7: ${cP}   h = ${f4(h)}   h - R = ${f4(h - d7.R)}   coprime-30 offset ${f4(s30 / c30 - d7.R)}   coprime-210 offset ${f4(s210 / c210 - d7.R)}`);
  A('R at [1e7,1e8) = 223.5196 (head-remainder SEC 0)', d7.R, 223.5196, 1e-4);
  A('h - R = 5.680 (record 5.679)', h - d7.R, 5.680, 1e-3);
  A('coprime-30 offset 2.7541', s30 / c30 - d7.R, 2.7541, 1e-3);
  A('coprime-210 offset 3.3395', s210 / c210 - d7.R, 3.3395, 1e-3);
  AE('g_max + 2 = 2870 at [1e7,1e8)', d7.gMax + 2, 2870);
  AE('every twin gap > 3 divisible by 6', d7.bad6, 0);
}
console.log('  window          gaps    Delta_meas +- se     Delta_HL   ratio HL/meas');
{
  const rows = [[1e5, 1e6, 0.6899, 0.0355, 0.7914], [1e6, 1e7, 0.6862, 0.0148, 0.7124], [1e7, 1e8, 0.6214, 0.0060, 0.6545]];
  for (const [lo, hi, dm, sem, dh] of rows) {
    const r = window(lo, hi, true);
    console.log(`  [${lo.toExponential(0)},${hi.toExponential(0)})  ${pad(r.G, 8)}   ${f4(r.delta)} +- ${f4(r.se)}      ${f4(r.dHL)}     ${f4(r.dHL / r.delta)}`);
    A(`Delta_meas at ${lo}`, r.delta, dm, 1.5e-4); A(`se at ${lo}`, r.se, sem, 1.5e-4);
    A(`Delta_HL at ${lo}`, r.dHL, dh, 1.5e-4);
  }
}
console.log('  half-decades (head-remainder SEC 3 table), Delta_HL recomputed here rather than quoted:');
console.log('    window            gaps      E[g]    Delta_meas +- se     Delta_HL   (HL-meas)/meas');
{
  const want = [[0.8239, 0.8298], [0.7114, 0.7786], [0.7705, 0.7385], [0.7172, 0.7039], [0.6848, 0.6768], [0.6500, 0.6472]];
  for (let j = 0; j < 6; j++) {
    const lo = Math.pow(10, 5 + j * 0.5), hi = Math.pow(10, 5 + (j + 1) * 0.5);
    const r = window(lo, hi, true);
    console.log(`    [1e${(5 + j * 0.5).toFixed(2)},1e${(5 + (j + 1) * 0.5).toFixed(2)})  ${pad(r.G, 8)}   ${f3(r.Eg)}   ${f4(r.delta)} +- ${f4(r.se)}      ${f4(r.dHL)}     ${(r.dHL - r.delta) / r.delta >= 0 ? '+' : ''}${f3((r.dHL - r.delta) / r.delta)}`);
    A(`half-decade ${j} Delta_meas`, r.delta, want[j][0], 1.5e-4);
    A(`half-decade ${j} Delta_HL`, r.dHL, want[j][1], 1.5e-4);
  }
}
console.log('  quarter-decades of [1e7,1e8):');
for (let j = 0; j < 4; j++) {
  const r = window(Math.pow(10, 7 + j * 0.25), Math.pow(10, 7 + (j + 1) * 0.25), false);
  console.log(`    q${j}: gaps ${pad(r.G, 7)}  Delta = ${f4(r.delta)} +- ${f4(r.se)}`);
  A(`quarter ${j}`, r.delta, [0.7203, 0.6842, 0.6677, 0.6565][j], 1.5e-4);
}
console.log('');
// ===========================================================================
// SEC 1 — THE TILE: the convention constants and the tail note's tables
// ===========================================================================
console.log('SEC 1 — THE TILE T_x: every origin visited, the seven convention constants, and the tail note\'s sec.2b and sec.4 tables');
console.log('  convention: tail = o - max{a opener : a + 2 < o}; head = min{a opener : a > o} - o;');
console.log('  backward-lt = o - max{a : a < o}; backward-le = o - max{a : a <= o}.  R = sum g^2 / 2W.');
const TILE = {};
function tileSmall(x) {
  const qs = primesUpTo(x); let W = 1; for (const q of qs) W *= q;
  const hole = new Uint8Array(W + 4); hole.fill(1);
  for (const q of qs) for (let m = 0; m < W + 4; m += q) hole[m] = 0;
  hole[W] = hole[0]; hole[W + 1] = hole[1]; hole[W + 2] = hole[2]; hole[W + 3] = hole[3];
  let D = 0; for (let m = 1; m < W; m += 2) if (hole[m] && hole[m + 2]) D++;
  const op = new Float64Array(D); { let i = 0; for (let m = 1; m < W; m += 2) if (hole[m] && hole[m + 2]) op[i++] = m; }
  let Sg2 = 0; for (let i = 0; i < D; i++) { const g = (i + 1 < D ? op[i + 1] : op[0] + W) - op[i]; Sg2 += g * g; }
  const R = Sg2 / (2 * W), mbar = W / D, cv2 = (Sg2 / D) / (mbar * mbar) - 1;
  const odd = qs.filter(q => q > 2);
  const qr = new Map(); for (const q of odd) { const s = new Uint8Array(q); for (let r = 1; r < q; r++) s[(r * r) % q] = 1; qr.set(q, s); }
  let start = D - 1; while (op[start] >= W - 2) start--;
  const wrapTail = []; for (let j = start + 1; j < D; j++) wrapTail.push(op[j] - W);
  let curV = op[start] - W, nx = 0, wt = 0;
  // pointers for a<o, a<=o, a>o over the same three-period list
  const two = new Float64Array(3 * D); for (let j = 0; j < D; j++) { two[j] = op[j] - W; two[D + j] = op[j]; two[2 * D + j] = op[j] + W; }
  let li = 0, lei = 0, fi = 0;
  while (li + 1 < 3 * D && two[li + 1] < 0) li++;
  while (lei + 1 < 3 * D && two[lei + 1] <= 0) lei++;
  while (two[fi] <= 0) fi++;
  const S = { all: 0, odd: 0, m6: 0, cls: 0, rgh: 0, rc: 0, sq: 0, h: 0, hodd: 0, hHole: 0, blt: 0, ble: 0 };
  const C = { all: 0, odd: 0, m6: 0, cls: 0, rgh: 0, rc: 0, sq: 0, h: 0, hodd: 0, hHole: 0 };
  for (let o = 0; o < W; o++) {
    while (wt < wrapTail.length && wrapTail[wt] + 2 < o) { curV = wrapTail[wt]; wt++; }
    while (nx < D && op[nx] + 2 < o) { curV = op[nx]; nx++; }
    while (li + 1 < 3 * D && two[li + 1] < o) li++;
    while (lei + 1 < 3 * D && two[lei + 1] <= o) lei++;
    while (two[fi] <= o) fi++;
    const tau = o - curV, fwd = two[fi] - o;
    S.all += tau; C.all++;
    S.blt += o - two[li]; S.ble += o - two[lei];
    S.h += fwd; C.h++;
    if (o & 1) { S.odd += tau; C.odd++; S.hodd += fwd; C.hodd++; }
    if (o % 6 === 1) { S.m6 += tau; C.m6++; }
    const m30 = o % 30, isC = (m30 === 1 || m30 === 19);
    if (isC) { S.cls += tau; C.cls++; }
    if (hole[o]) {
      S.rgh += tau; C.rgh++; S.hHole += fwd; C.hHole++;
      if (isC) { S.rc += tau; C.rc++; }
      let isq = true; for (const q of odd) if (!qr.get(q)[o % q]) { isq = false; break; }
      if (isq) { S.sq += tau; C.sq++; }
    }
  }
  return { x, W, D, R, mbar, cv2, S, C, phiExp: qs.reduce((a, q) => a * (q - 1), 1), Dexp: qs.reduce((a, q) => a * (q <= 3 ? 1 : q - 2), 1) };
}
function tileBig29() {          // x = 29: W = 6.47e9, segmented; square units by CRT
  const x = 29, qs = primesUpTo(x); let W = 1; for (const q of qs) W *= q;
  function egcd(a, b) { if (b === 0) return [a, 1, 0]; const [g, p, r] = egcd(b, a % b); return [g, r, p - Math.floor(a / b) * r]; }
  let list = [1], M = 2;
  for (const q of qs) {
    if (q === 2) continue;
    const seen = new Set(); for (let r = 1; r < q; r++) seen.add((r * r) % q);
    const qs2 = [...seen].sort((a, b) => a - b);
    const [, inv] = egcd(M % q, q), iM = ((inv % q) + q) % q;
    const nl = new Float64Array(list.length * qs2.length); let k = 0;
    for (const o of list) for (const r of qs2) { let t = ((r - o) % q + q) % q; t = (t * iM) % q; nl[k++] = o + M * t; }
    list = nl; M *= q;
  }
  const sq = Float64Array.from(list); sq.sort();
  const preLen = 400, pre = new Uint8Array(preLen + 4); pre.fill(1);
  for (const q of qs) { for (let m = Math.ceil((W - preLen) / q) * q; m < W + 4; m += q) pre[m - (W - preLen)] = 0; }
  pre[preLen] = 0; pre[preLen + 1] = 1; pre[preLen + 2] = 0; pre[preLen + 3] = 1;
  const tailOp = []; for (let m = W - preLen + 1; m < W; m += 2) { const i = m - (W - preLen); if (pre[i] && pre[i + 2]) tailOp.push(m - W); }
  let lastA = null; const pending = [];
  for (const a of tailOp) { if (a + 2 < 0) lastA = a; else pending.push(a); }
  const S = { all: 0, odd: 0, m6: 0, cls: 0, rgh: 0, rc: 0, sq: 0, hHole: 0 };
  const C = { all: 0, odd: 0, m6: 0, cls: 0, rgh: 0, rc: 0, sq: 0, hHole: 0 };
  let Sg2 = 0, nOp = 0, nH = 0, prevOp = -1, firstOp = -1, si = 0, m30 = 0, m6 = 0;
  const SEG = 1 << 26;
  for (let lo = 0; lo < W; lo += SEG) {
    const hi = Math.min(lo + SEG, W), len = hi - lo + 2;
    const seg = new Uint8Array(len); seg.fill(1);
    for (const q of qs) for (let m = Math.ceil(lo / q) * q; m < lo + len; m += q) seg[m - lo] = 0;
    if (hi === W) { seg[len - 2] = 0; seg[len - 1] = 1; }
    m30 = lo % 30; m6 = lo % 6;
    for (let o = lo; o < hi; o++) {
      while (pending.length && pending[0] + 2 < o) lastA = pending.shift();
      const tau = o - lastA;
      S.all += tau; C.all++;
      if (o & 1) { S.odd += tau; C.odd++; }
      if (m6 === 1) { S.m6 += tau; C.m6++; }
      const isC = (m30 === 1 || m30 === 19), h = seg[o - lo];
      if (isC) { S.cls += tau; C.cls++; if (h) { S.rc += tau; C.rc++; } }
      if (si < sq.length && sq[si] === o) { S.sq += tau; C.sq++; si++; }
      if (h) {
        nH++; S.rgh += tau; C.rgh++;
        if ((o & 1) && seg[o - lo + 2]) { nOp++; pending.push(o); if (prevOp >= 0) { const g = o - prevOp; Sg2 += g * g; } else firstOp = o; prevOp = o; }
      }
      m30++; if (m30 === 30) m30 = 0; m6++; if (m6 === 6) m6 = 0;
    }
    err(`  [sec1 x=29] ${hi} / ${W}`);
  }
  { const g = firstOp + W - prevOp; Sg2 += g * g; }
  const R = Sg2 / (2 * W), mbar = W / nOp, cv2 = (Sg2 / nOp) / (mbar * mbar) - 1;
  return { x, W, D: nOp, R, mbar, cv2, S, C, phiExp: qs.reduce((a, q) => a * (q - 1), 1), Dexp: qs.reduce((a, q) => a * (q <= 3 ? 1 : q - 2), 1), nH };
}
console.log('   x |        W |         D | mbar     | R        | CV^2   | (1+CV^2)/2 |  tail all-R  odd-R  1mod6-R | head all-R  odd-R | back a<o  a<=o');
for (const x of [7, 11, 13, 17, 19, 23]) {
  const t = tileSmall(x); TILE[x] = t;
  AE(`x=${x} D = prod(q-2)`, t.D, t.Dexp);
  AE(`x=${x} holes = phi(W)`, t.C.rgh, t.phiExp);
  const E = (k) => t.S[k] / t.C[k];
  console.log(`  ${pad(x, 2)} | ${pad(t.W, 8)} | ${pad(t.D, 9)} | ${f4(t.mbar)} | ${f4(t.R)} | ${f4(t.cv2)} |   ${f4((1 + t.cv2) / 2)}   |   ${f6(E('all') - t.R)} ${f6(E('odd') - t.R)} ${f6(E('m6') - t.R)} |  ${f6(E('h') - t.R)} ${f6(E('hodd') - t.R)} | ${f6(t.S.blt / t.W - t.R)} ${f6(t.S.ble / t.W - t.R)}`);
  A(`x=${x} tail all = R + 5/2`, E('all') - t.R, 2.5, 1e-9);
  A(`x=${x} tail odd = R + 3`, E('odd') - t.R, 3, 1e-9);
  A(`x=${x} tail 1 mod 6 = R + 5`, E('m6') - t.R, 5, 1e-9);
  A(`x=${x} head all = R + 1/2`, E('h') - t.R, 0.5, 1e-9);
  A(`x=${x} head odd = R + 1`, E('hodd') - t.R, 1, 1e-9);
  A(`x=${x} backward a<o = R + 1/2`, t.S.blt / t.W - t.R, 0.5, 1e-9);
  A(`x=${x} backward a<=o = R - 1/2`, t.S.ble / t.W - t.R, -0.5, 1e-9);
}
{
  const t = tileBig29(); TILE[29] = t;
  AE('x=29 D = prod(q-2)', t.D, t.Dexp); AE('x=29 holes = phi(W)', t.nH, t.phiExp);
  const E = (k) => t.S[k] / t.C[k];
  console.log(`  29 | ${pad(t.W, 8)} | ${pad(t.D, 9)} | ${f4(t.mbar)} | ${f4(t.R)} | ${f4(t.cv2)} |   ${f4((1 + t.cv2) / 2)}   |   ${f6(E('all') - t.R)} ${f6(E('odd') - t.R)} ${f6(E('m6') - t.R)} |  (head not walked at this level)`);
  A('x=29 tail all = R + 5/2', E('all') - t.R, 2.5, 1e-9);
  A('x=29 tail odd = R + 3', E('odd') - t.R, 3, 1e-9);
  A('x=29 tail 1 mod 6 = R + 5', E('m6') - t.R, 5, 1e-9);
}
console.log('  the tail note sec.4 conditionals, rebuilt (E over origins in the named population, minus nothing):');
console.log('   x |  E_cls  | E_cls-R |  E_rc   |  E_sq   | E_rc/E_cls | E_sq/E_cls | E_sq/E_rc |    n_rc    |   n_sq  | E_rgh-R');
{
  const want = { 7: [14.4286, 5.6000, 14.5000, 13.0000, 1.0050, 0.9010, 0.8966, 12, 6],
                 11: [16.8442, 5.7091, 17.2000, 16.2000, 1.0211, 0.9618, 0.9419, 120, 30],
                 13: [19.5235, 5.8326, 20.2083, 18.3667, 1.0351, 0.9407, 0.9089, 1440, 180],
                 17: [22.0136, 5.9127, 22.9659, 20.9375, 1.0433, 0.9511, 0.9117, 23040, 1440],
                 19: [24.5294, 5.9728, 25.6618, 23.5523, 1.0462, 0.9602, 0.9178, 414720, 12960],
                 23: [26.7880, 6.0078, 28.1268, 27.2983, 1.0500, 1.0190, 0.9705, 9123840, 142560],
                 29: [28.7280, 6.0336, 30.2300, 29.0998, 1.0523, 1.0129, 0.9626, 255467520, 1995840] };
  for (const x of [7, 11, 13, 17, 19, 23, 29]) {
    const t = TILE[x], E = (k) => t.S[k] / t.C[k], w = want[x];
    console.log(`  ${pad(x, 2)} | ${f4(E('cls'))} | ${f4(E('cls') - t.R)}  | ${f4(E('rc'))} | ${f4(E('sq'))} |   ${f4(E('rc') / E('cls'))}   |   ${f4(E('sq') / E('cls'))}   |  ${f4(E('sq') / E('rc'))}   | ${pad(t.C.rc, 10)} | ${pad(t.C.sq, 7)} | ${f4(E('rgh') - t.R)}`);
    A(`x=${x} E_cls`, E('cls'), w[0], 1e-4); A(`x=${x} E_cls-R`, E('cls') - t.R, w[1], 1e-4);
    A(`x=${x} E_rc`, E('rc'), w[2], 1e-4); A(`x=${x} E_sq`, E('sq'), w[3], 1e-4);
    A(`x=${x} E_rc/E_cls`, E('rc') / E('cls'), w[4], 1e-4);
    A(`x=${x} E_sq/E_cls`, E('sq') / E('cls'), w[5], 1e-4);
    A(`x=${x} E_sq/E_rc`, E('sq') / E('rc'), w[6], 1e-4);
    AE(`x=${x} n_rc`, t.C.rc, w[7]); AE(`x=${x} n_sq`, t.C.sq, w[8]);
  }
}
console.log('  the population p\'^2 actually belongs to is the ROUGH class, not the class null:');
console.log('    x |  E_rc - R  |  E_cls - R  |  difference   (the record adds the class null\'s ~6.05 to R_shell, not the rough class\'s)');
for (const x of [7, 11, 13, 17, 19, 23, 29]) {
  const t = TILE[x], E = (k) => t.S[k] / t.C[k];
  console.log(`   ${pad(x, 2)} |   ${f4(E('rc') - t.R)}   |   ${f4(E('cls') - t.R)}    |   ${f4(E('rc') - E('cls'))}`);
}
console.log('');
// ===========================================================================
// SEC 2 — THE SHIFT GROUPS (verify note claim 1), third implementation
// ===========================================================================
console.log('SEC 2 — THE SHIFT GROUPS: W(h) rebuilt from the comb, X2 as a group over ALL |h| < L against the doubled positive half');
console.log('  W(h) = prod_{p<=y} p*rho_p(h)/|E_p|^2, L = x#, y = largest prime <= sqrt(L).');
console.log('  W-(h) keeps only the p | h-2 bracket, W+(h) only p | h+2; W-(-h) = W+(h) identically, so');
console.log('  a group sum over all |h| < L is NOT the positive half doubled unless W- is even, which it is not.');
// brute force at x = 7, 11: W-(h) and W+(h) built from divisibility of h-2, h+2 directly,
// over EVERY h in (-L, L), to check the mirror identity without reusing the sieve's own indexing
for (const x of [7, 11]) {
  const sp = primesUpTo(x); let L = 1; for (const q of sp) L *= q;
  const pl = primesUpTo(Math.floor(Math.sqrt(L))), ps = pl.filter(p => p >= 7);
  let D = 1; for (const p of ps) D *= p * (p - 4) / ((p - 2) * (p - 2));
  const f5 = (h) => { const r = ((h % 5) + 5) % 5; return r === 0 ? 2.5 : (r === 1 || r === 4 ? 1.25 : 0); };
  const Wm = (h) => { if (((h % 6) + 6) % 6 !== 0) return 0; let v = 6 * f5(h) * D; for (const p of ps) if ((h - 2) % p === 0) v *= (p - 3) / (p - 4); return v; };
  const Wp = (h) => { if (((h % 6) + 6) % 6 !== 0) return 0; let v = 6 * f5(h) * D; for (const p of ps) if ((h + 2) % p === 0) v *= (p - 3) / (p - 4); return v; };
  let me = 0, ne = 0;
  for (let h = -(L - 1); h < L; h++) { me = Math.max(me, Math.abs(Wm(-h) - Wp(h))); if (h > 0 && Wm(h) !== Wm(-h)) ne++; }
  console.log(`  brute force at x = ${x}: max |W-(-h) - W+(h)| over all |h| < L = ${me.toExponential(1)}; W-(h) != W-(-h) at ${ne} of the ${L / 6 - 1} positive shifts h = 6k`);
  A(`x=${x} mirror identity W-(-h) = W+(h)`, me, 0, 1e-12);
}
console.log('   x |  y     |  delta*X  | delta*X1  | delta*X2c | delta*X2- | delta*X2+ |  2*X2c  | 2*X2grp | d*Xmix(c) | d*Xmix(true) | c/true | Xmix/ln y | asym shifts');
const SG = [];
for (const x of [7, 11, 13, 17, 19, 23]) {
  const sp = primesUpTo(x); let L = 1; for (const q of sp) L *= q;
  const pl = primesUpTo(Math.floor(Math.sqrt(L))), y = pl[pl.length - 1], ps = pl.filter(p => p >= 7);
  let delta = 1; for (const p of pl) { const s = (p === 2 || p === 3) ? 1 : (p === 5 ? 2 : p - 2); delta *= s / p; }
  let D = 1, b1 = 1, b2 = 1; for (const p of ps) { const u = (p - 2) * (p - 2); D *= p * (p - 4) / u; b1 *= 1 - 2 / u; b2 *= 1 - 3 / u; }
  const K = L / 6;
  const P0 = new Float64Array(K).fill(1), PM = new Float64Array(K).fill(1), PP = new Float64Array(K).fill(1);
  const wantHash = K <= 2e6;
  const HM = wantHash ? new Uint32Array(K) : null, HP = wantHash ? new Uint32Array(K) : null;
  for (const p of ps) {
    const Ap = (p - 2) / (p - 4), Bp = (p - 3) / (p - 4);
    for (let k = p; k < K; k += p) P0[k] *= Ap;
    let i6 = 0; for (let t = 1; t < p; t++) if ((6 * t) % p === 1) { i6 = t; break; }
    let k0 = (2 * i6) % p || p; for (let k = k0; k < K; k += p) { PM[k] *= Bp; if (wantHash) HM[k] = (Math.imul(HM[k], 2654435761) + p) >>> 0; }
    let k1 = ((p - 2) * i6) % p || p; for (let k = k1; k < K; k += p) { PP[k] *= Bp; if (wantHash) HP[k] = (Math.imul(HP[k], 2654435761) + p) >>> 0; }
  }
  const f5of = (k) => { const r = k % 5; return r === 0 ? 2.5 : (r === 1 || r === 4 ? 1.25 : 0); };
  let W1z = 6 * 2.5 * D; for (const p of ps) W1z *= (p - 2) / (p - 4);
  const W0 = 1 / delta, Wm0 = 6 * 2.5 * D;
  let X = W0 - 6, X1 = W1z - 6 * b1, X2c = Wm0 - 6 * b2, X2m = Wm0 - 6 * b2, X2p = Wm0 - 6 * b2;
  let asym = 0, asymExact = 0;
  for (let k = 1; k < K; k++) {
    const w = 1 - 6 * k / L, base = 6 * f5of(k) * D;
    const Wv = base * P0[k] * PM[k] * PP[k], W1v = base * P0[k], Wmv = base * PM[k], Wpv = base * PP[k];
    X += 2 * w * (Wv - 6); X1 += 2 * w * (W1v - 6 * b1);
    X2c += 2 * w * (Wmv - 6 * b2);
    X2m += w * ((Wmv - 6 * b2) + (Wpv - 6 * b2));
    X2p += w * ((Wpv - 6 * b2) + (Wmv - 6 * b2));
    if (Wmv !== Wpv) asym++;
    if (wantHash && HM[k] !== HP[k]) asymExact++;
  }
  const XmixC = X - X1 - 2 * X2c, XmixT = X - X1 - X2m - X2p;
  let bnd = 60; for (const p of ps) bnd *= p * (p - 3) / ((p - 2) * (p - 2));
  SG.push({ x, y, delta, X, X1, X2c, X2m, XmixC, XmixT, bnd, lny: Math.log(y) });
  console.log(`  ${pad(x, 2)} | ${pad(y, 6)} | ${f6(delta * X)}  | ${f6(delta * X1)}  | ${f6(delta * X2c)}  | ${f6(delta * X2m)} | ${f6(delta * X2p)} | ${f4(2 * X2c).padStart(7)} | ${f4(2 * X2m).padStart(7)} | ${f6(delta * XmixC)}  |  ${f6(delta * XmixT)}   | ${f3(XmixC / XmixT)}  | ${f4(XmixT / Math.log(y))}   | ${asym}${wantHash ? ' (' + asymExact + ' by divisor set)' : ''}`);
  A(`x=${x} X2+ = X2- (mirror)`, X2p, X2m, 1e-9 * Math.abs(X2m) + 1e-12);
  P0.fill(0); PM.fill(0); PP.fill(0);
}
{
  const want = { 7: [0.152075, 0.205517, 0.094199, -0.009235, -0.5603, 5.7147, -0.241840, -0.034971],
                 11: [0.256267, 0.293618, 0.047843, 0.004509, 0.5304, 5.6281, -0.133037, -0.046368],
                 13: [0.299499, 0.322208, 0.027019, 0.001365, 0.2694, 5.3331, -0.076748, -0.025439],
                 17: [0.326772, 0.345842, 0.017012, 0.000736, 0.2314, 5.3519, -0.053095, -0.020542],
                 19: [0.347302, 0.363348, 0.011379, 0.000394, 0.1846, 5.3266, -0.038804, -0.016835],
                 23: [0.364320, null, 0.007968, null, null, null, -0.029342, null] };
  for (const o of SG) {
    const w = want[o.x];
    A(`x=${o.x} delta*X`, o.delta * o.X, w[0], 2e-6);
    if (w[1] !== null) A(`x=${o.x} delta*X1`, o.delta * o.X1, w[1], 2e-6);
    A(`x=${o.x} corpus column delta*X2c`, o.delta * o.X2c, w[2], 2e-6);
    if (w[3] !== null) A(`x=${o.x} group delta*X2`, o.delta * o.X2m, w[3], 2e-6);
    if (w[4] !== null) A(`x=${o.x} 2*X2 group`, 2 * o.X2m, w[4], 1e-3);
    if (w[5] !== null) A(`x=${o.x} 2*X2c doubled half`, 2 * o.X2c, w[5], 1e-3);
    A(`x=${o.x} corpus Xmix`, o.delta * o.XmixC, w[6], 2e-6);
    if (w[7] !== null) A(`x=${o.x} true Xmix`, o.delta * o.XmixT, w[7], 2e-6);
  }
}
function f2b(v) { return v.toFixed(2).padStart(9); }
function f1b(v) { return v.toFixed(1).padStart(9); }
console.log('  the bound of varE-theta2-proof sec.3, |2*X2| <= 60 prod p(p-3)/(p-2)^2, against both readings:');
console.log('    x |   bound   | 2*X2 group | looseness vs group | 2*X2c doubled half | looseness vs half');
for (const o of SG) console.log(`   ${pad(o.x, 2)} | ${f2b(o.bnd)} |   ${f4(2 * o.X2m).padStart(8)} |      ${f1b(o.bnd / Math.abs(2 * o.X2m))}      |      ${f4(2 * o.X2c).padStart(8)}      |     ${f1b(o.bnd / (2 * o.X2c))}`);
console.log('  delta*(X - X1), the quantity varE-theta2-step sec.5 tabulates, is 2*X2 + Xmix under EITHER split:');
for (const o of SG) console.log(`    x=${pad(o.x, 2)}: delta*(X-X1) = ${f6(o.delta * (o.X - o.X1))} = corpus ${f6(o.delta * (2 * o.X2c + o.XmixC))} = corrected ${f6(o.delta * (2 * o.X2m + o.XmixT))}`);
for (const o of SG) A(`x=${o.x} the sec.5 column is untouched by the split`, o.delta * (2 * o.X2c + o.XmixC), o.delta * (2 * o.X2m + o.XmixT), 1e-9);
console.log('');
// ===========================================================================
// SEC 3 — THE POOLED INTERCEPT (verify note claim 3)
// ===========================================================================
console.log('SEC 3 — THE POOLED INTERCEPT: sub-window means to 16 splits, the exact two-piece decomposition, HL\'s own pooling');
function subwins(e0, e1, K, withHL) { const a = []; for (let j = 0; j < K; j++) a.push(window(Math.pow(10, e0 + (e1 - e0) * j / K), Math.pow(10, e0 + (e1 - e0) * (j + 1) / K), withHL)); return a; }
function aggregate(rs) {
  const Gt = rs.reduce((s, r) => s + r.G, 0), w = rs.map(r => r.G / Gt);
  const mbar = rs.reduce((s, r, i) => s + w[i] * r.Eg, 0), mubar = rs.reduce((s, r, i) => s + w[i] * r.En, 0);
  const Vw = rs.reduce((s, r, i) => s + w[i] * r.vg, 0);
  const B = rs.reduce((s, r, i) => s + w[i] * (r.Eg - mbar) ** 2, 0);
  const sB = rs.reduce((s, r, i) => s + w[i] * (r.En - mubar) * (r.Eg - mbar), 0) / B;
  const aw = rs.reduce((s, r, i) => s + w[i] * r.al * r.vg, 0) / Vw;
  const abar = rs.reduce((s, r, i) => s + w[i] * r.al, 0);
  const dbar = rs.reduce((s, r, i) => s + w[i] * r.delta, 0);
  const hlbar = rs.some(r => r.dHL === undefined) ? null : rs.reduce((s, r, i) => s + w[i] * r.dHL, 0);
  const seBar = Math.sqrt(rs.reduce((s, r, i) => s + w[i] * w[i] * r.se * r.se, 0));
  const betw = mbar * (aw - sB) * B / (Vw + B);
  const rem = rs.reduce((s, r, i) => s + w[i] * r.al * (r.Eg - mbar), 0) + mbar * (abar - aw);
  return { Gt, dbar, hlbar, seBar, sB, aw, abar, apool: (aw * Vw + sB * B) / (Vw + B), Vw, B, betw, rem, mbar, alo: Math.min(...rs.map(r => r.al)), ahi: Math.max(...rs.map(r => r.al)) };
}
console.log('  identity: Delta_pool - sum w_k Delta_k = -[ sum w_k a_k (m_k - mbar) + mbar (sum w_k a_k - a_pool) ],');
console.log('  split into the between-slope piece mbar(a_w - s_B) B/(V_w+B) and the within-slope-gradient remainder.');
for (const [e0, e1] of [[5, 6], [6, 7], [7, 8]]) {
  const pool = window(Math.pow(10, e0), Math.pow(10, e1), true);
  console.log(`  decade [1e${e0},1e${e1}): pooled Delta = ${f4(pool.delta)} +- ${f4(pool.se)}, Delta_HL = ${f4(pool.dHL)}, alpha = ${f5(pool.al)}, lambda/2 = ${f5(pool.lam / 2)}`);
  console.log('    K  | mean Delta_k +- se | mean Delta_HL,k | pooling term | between | remainder | between share | s_B     | a_pool(id) | a_pool(direct) | HL_pool - mean HL | alpha_k range');
  for (const K of [2, 4, 8, 16]) {
    const rs = subwins(e0, e1, K, true), a = aggregate(rs);
    console.log(`   ${pad(K, 2)}  |   ${f4(a.dbar)} +- ${f4(a.seBar)}   |     ${f4(a.hlbar)}      |   ${f4(pool.delta - a.dbar)}    | ${f4(a.betw)}  |  ${f4(a.rem)}   |     ${f3(a.betw / (a.betw + a.rem) * 100)}%   | ${f5(a.sB)} |  ${f5(a.apool)}   |    ${f5(pool.al)}     |      ${f4(pool.dHL - a.hlbar)}       | ${f5(a.ahi)} -> ${f5(a.alo)}`);
    A(`decade ${e0} K=${K}: identity a_pool = direct OLS slope`, a.apool, pool.al, 3e-4);
  }
}
console.log('  each HALF-decade re-read as the gap-weighted mean of its own sub-splits (K = 1 is the half itself):');
console.log('    window            HL     K=1 (se)         K=2 (se)         K=4 (se)         K=8 (se)      | HL - K=4 value | z on the K=4 se');
for (const [e0] of [[5], [6], [7]]) {
  for (let h = 0; h < 2; h++) {
    const a0 = e0 + 0.5 * h, a1 = e0 + 0.5 * (h + 1);
    const dir = window(Math.pow(10, a0), Math.pow(10, a1), true);
    const cells = [], vals = [];
    for (const K of [1, 2, 4, 8]) { const a = aggregate(subwins(a0, a1, K, false)); cells.push(`${f4(a.dbar)} (${f4(a.seBar)})`); vals.push(a); }
    const v4 = vals[2];
    console.log(`    [1e${a0.toFixed(2)},1e${a1.toFixed(2)})  ${f4(dir.dHL)}  ${cells.join('  ')}  |    ${f4(dir.dHL - v4.dbar)}     |    ${f2s((dir.dHL - v4.dbar) / v4.seBar)}`);
  }
}
function f2s(v) { return (v >= 0 ? '+' : '') + v.toFixed(2); }
console.log('');

// ===========================================================================
// SEC 4 — THE ROTATION ENSEMBLE LADDER, EXACT
// ===========================================================================
console.log('SEC 4 — THE ENSEMBLE LADDER: Delta_pipe / Delta_ens by full enumeration of T_y, y = 11..29 (y = 29 segmented)');
console.log('  Delta_ens is the OLS 2 - beta over the tile\'s own gaps with n = holes in [a_i, a_{i+1});');
console.log('  Delta_pipe is hl3\'s pipeline on the same gap law with rho truncated at q <= y.');
console.log('    y  |     W      |     D      |  E[g]  |  E[n]  |    R    | Delta_ens | Delta_pipe | pipe/ens | hole-origin head - R');
function ensLevel(y) {
  const qs = primesUpTo(y); let W = 1; for (const q of qs) W *= q;
  let Sg = 0, Sg2 = 0, Sn = 0, Sn2 = 0, Sng = 0, nGap = 0, nH = 0, SfH = 0, gMax = 0;
  const gapHist = new Map();
  let prevOp = -1, firstOp = -1, pendK = 0, pendSum = 0;
  const preHoles = [];
  const close = (b) => { const g = b - prevOp; Sg += g; Sg2 += g * g; Sn += pendK; Sn2 += pendK * pendK; Sng += pendK * g; nGap++; if (g > gMax) gMax = g; gapHist.set(g, (gapHist.get(g) || 0) + 1); SfH += pendK * b - pendSum; pendK = 0; pendSum = 0; };
  const SEG = 1 << 26;
  for (let lo = 0; lo < W; lo += SEG) {
    const hi = Math.min(lo + SEG, W), len = hi - lo + 2;
    const seg = new Uint8Array(len); seg.fill(1);
    for (const q of qs) for (let m = Math.ceil(lo / q) * q; m < lo + len; m += q) seg[m - lo] = 0;
    if (hi === W) { seg[len - 2] = 0; seg[len - 1] = 1; }
    for (let m = (lo % 2 === 0 ? lo + 1 : lo); m < hi; m += 2) {
      const i = m - lo; if (!seg[i]) continue;
      if (seg[i + 2]) { if (prevOp >= 0) close(m); else firstOp = m; prevOp = m; }
      nH++; if (prevOp >= 0) { pendK++; pendSum += m; } else preHoles.push(m);
    }
    if (W > 1e9) err(`  [sec4 y=${y}] ${hi} / ${W}`);
  }
  { for (const m of preHoles) { pendK++; pendSum += m + W; } close(firstOp + W); }
  const G = nGap, Eg = Sg / G, En = Sn / G, vg = Sg2 / G - Eg * Eg;
  const al = (Sng / G - En * Eg) / vg, be = En - al * Eg, R = Sg2 / (2 * Sg);
  let SW = 0, SWg = 0;
  for (const [g, c] of gapHist) { const w = WtildeSum(g, y); SW += c * w; SWg += c * w * g; }
  const EW = SW / G, cWg = SWg / G - EW * Eg;
  return { y, W, D: G, Eg, En, R, dEns: 2 - be, dPipe: (En - 2) * (Eg * cWg / (EW * vg) - 1), hHole: SfH / nH, nH, gMax };
}
{
  const want = { 11: [1.0492, 3.2524], 13: [1.0134, 3.4903], 17: [0.9842, 3.6719], 19: [0.9711, 3.8263], 23: [0.9584, 3.9604], 29: [null, null] };
  for (const y of [11, 13, 17, 19, 23, 29]) {
    const e = ensLevel(y), w = want[y];
    console.log(`   ${pad(y, 3)} | ${pad(e.W, 10)} | ${pad(e.D, 10)} | ${f3(e.Eg)} | ${f3(e.En)} | ${f4(e.R)} |  ${f4(e.dEns)}   |   ${f4(e.dPipe)}   |  ${f4(e.dPipe / e.dEns)}  |        ${f4(e.hHole - e.R)}`);
    if (w[0] !== null) { A(`y=${y} pipe/ens`, e.dPipe / e.dEns, w[0], 1e-4); A(`y=${y} hole-origin head - R`, e.hHole - e.R, w[1], 1e-4); }
  }
}
console.log('  (y = 29 is the level attack-0830-head-remainder.md sec.0 records as dropped, "about fifteen minutes"; the walk above is under a minute for these statistics.)');
console.log('');
// ===========================================================================
// SEC 5 — THE MERTENS CONSTANT, THE RECORD'S SPLIT, THE ANCHORING SENSITIVITY
// ===========================================================================
console.log('SEC 5 — THE CONSTANTS: e^{2gamma}/(8 C2), the record\'s factorisation, and the top window\'s un-matched E[g]');
{
  const P2 = primesUpTo(2e7);
  let C2 = 1; for (const q of P2) { if (q < 3) continue; C2 *= 1 - 1 / ((q - 1) * (q - 1)); }
  const GAM = 0.57721566490153286, e2g = Math.exp(2 * GAM);
  console.log(`  C2 (direct product to 2e7) = ${C2.toFixed(12)}   [literature 0.660161815847; the direct product converges from above]`);
  console.log(`  HL = 1/(2 C2) = ${f6(1 / (2 * C2))}   rho(2) = e^{2gamma}/4 = ${f6(e2g / 4)}   HL * rho(2) = ${f6(e2g / (8 * C2))}   e^{2gamma}/(8 C2) = ${f6(e2g / (8 * C2))}`);
  A('HL * rho(2) = e^{2gamma}/(8 C2)', (1 / (2 * C2)) * (e2g / 4), e2g / (8 * C2), 1e-12);
  A('the constant is 0.6007', e2g / (8 * C2), 0.6007, 5e-5);
  console.log('  mbar(x) = 6 prod_{5<=q<=x} q/(q-2) against its Mertens form e^{2gamma} ln^2 x /(2 C2):');
  console.log('       x    |     mbar     |  Mertens form  |  ratio');
  {
    let mb = 6; const marks = new Set([7, 11, 13, 17, 19, 23, 29, 101, 1009, 10007, 100003, 1000003, 10000019]);
    for (const q of P2) {
      if (q < 5) continue; mb *= q / (q - 2);
      if (marks.has(q)) { const a = e2g * Math.log(q) ** 2 / (2 * C2); console.log(`   ${pad(q, 9)}  | ${mb.toFixed(6).padStart(12)} | ${a.toFixed(6).padStart(14)} | ${f6(mb / a)}`); }
    }
  }
  const t = 447.26, Rs = 434.31, cn = 440.36, c = 0.7522, ln2 = t / c;
  console.log(`  the record's top band (zone-tail-02.js:796-798): t = ${t}, R_shell = ${Rs}, classNull = ${cn}, c_local = ${c}`);
  console.log(`    implied ln^2(p'^2) = ${ln2.toFixed(2)}; R_shell/ln^2 = ${f4(Rs / ln2)}; (R_shell/ln^2)/HL = ${f4((Rs / ln2) / (1 / (2 * C2)))}; product with t/R_shell = ${f4((Rs / ln2) * (t / Rs))}`);
  A('the record split 0.7304 x 1.0298 = 0.7522', (Rs / ln2) * (t / Rs), 0.7522, 1e-4);
  A('R_shell/ln^2 = 0.9644 x HL', (Rs / ln2) / (1 / (2 * C2)), 0.9644, 1e-4);
  console.log(`    t/(R+1/2) = ${f4(t / (Rs + 0.5))}  t/(R+5/2) = ${f4(t / (Rs + 2.5))}  t/(R+3) = ${f4(t / (Rs + 3))}  t/(R+5) = ${f4(t / (Rs + 5))}  t/classNull = ${f4(t / cn)}   classNull - R_shell = ${(cn - Rs).toFixed(2)}`);
  A('t/(R+3) = 1.0228', t / (Rs + 3), 1.0228, 1e-4); A('t/(R+5) = 1.0181', t / (Rs + 5), 1.0181, 1e-4);
  A('t/classNull = 1.0157', t / cn, 1.0157, 1e-4);
  console.log(`    the rough-class constant the ensemble gives at x = 29 is E_rc - R = ${f4(TILE[29].S.rc / TILE[29].C.rc - TILE[29].R)}; t/(R_shell + that) = ${f4(t / (Rs + (TILE[29].S.rc / TILE[29].C.rc - TILE[29].R)))}`);
  console.log(`    c_local / 0.6007 = ${f4(c / (e2g / (8 * C2)))}   against 1/rho(2) = ${f4(4 / e2g)}`);
}
console.log('  the anchoring part against the E[g] mismatch. Columns 1-4 are attack-0830-head-remainder.md sec.3\'s own');
console.log('  table (its Monte Carlo, quoted, not recomputed); the fit is a power law Delta_ens = c E[g]^k on its six points.');
{
  const rows = [[113.1, 113.6, 0.8239, 0.8537], [135.8, 136.2, 0.7114, 0.8100], [157.4, 157.5, 0.7705, 0.7742],
                [184.4, 184.3, 0.7172, 0.7364], [213.8, 213.4, 0.6848, 0.7012], [244.0, 235.9, 0.6500, 0.6814]];
  let n = 0, sx = 0, sy = 0, sxx = 0, sxy = 0;
  for (const r of rows) { const X = Math.log(r[1]), Y = Math.log(r[3]); n++; sx += X; sy += Y; sxx += X * X; sxy += X * Y; }
  const k = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  const kloc = Math.log(rows[5][3] / rows[4][3]) / Math.log(rows[5][1] / rows[4][1]);
  console.log(`    global log-log slope k = ${f4(k)};  local slope over the top two levels = ${f4(kloc)}`);
  console.log('     E[g] line | E[g] ens | mismatch | Delta_ens as run | Delta_ens at the line\'s E[g] | meas/ens as run | meas/ens matched');
  for (const r of rows) {
    const adj = r[3] * Math.pow(r[0] / r[1], k), adjl = r[3] * Math.pow(r[0] / r[1], kloc);
    console.log(`      ${f1(r[0])}   |  ${f1(r[1])}  |  ${f3(r[0] / r[1] - 1)}  |      ${f4(r[3])}      |         ${f4(adj)} (${f4(adjl)})        |     ${f4(r[2] / r[3])}      |     ${f4(r[2] / adj)}`);
  }
}
function f1(v) { return v.toFixed(1).padStart(7); }
console.log('');
console.log(FAIL === 0 ? 'VERDICT: 0 assertion failures' : `VERDICT: ${FAIL} ASSERTION FAILURES`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/redteam-0830-slack.js
//   invocation:  node research/history/staging/redteam-0830-slack.js
//   code-sha256: 363f9f1cdadcd8ac94c42d0006afc81f06555bf255f95e7d4be9c6b6fe4e7d0f
//   out-sha256:  41b27959ef0b493a4b74161f4a98bd7521e9a991f071e1d155c77e96aabe3d5d
//   body-lines:  157
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     118.8 s
// ============================================================================
// SEC 0 — CUSTODY: a fresh sieve to 1.2e8, every figure the three notes assert about the head windows
//   [1e7,1e8): gaps 381331  R = 223.5196  g_max = 2868  gaps > 3 not divisible by 6: 0
//     primes >= 7: 5096876   h = 229.1990   h - R = 5.6794   coprime-30 offset 2.7540   coprime-210 offset 3.3394
//   window          gaps    Delta_meas +- se     Delta_HL   ratio HL/meas
//   [1e+5,1e+6)      6944   0.6899 +- 0.0355      0.7914     1.1471
//   [1e+6,1e+7)     50810   0.6862 +- 0.0148      0.7124     1.0383
//   [1e+7,1e+8)    381331   0.6214 +- 0.0060      0.6545     1.0532
//   half-decades (head-remainder SEC 3 table), Delta_HL recomputed here rather than quoted:
//     window            gaps      E[g]    Delta_meas +- se     Delta_HL   (HL-meas)/meas
//     [1e5.00,1e5.50)      1908   113.145   0.8239 +- 0.0625      0.8298     +0.007
//     [1e5.50,1e6.00)      5035   135.793   0.7114 +- 0.0419      0.7786     +0.094
//     [1e6.00,1e6.50)     13730   157.415   0.7705 +- 0.0268      0.7385     -0.042
//     [1e6.50,1e7.00)     37079   184.408   0.7172 +- 0.0174      0.7039     -0.019
//     [1e7.00,1e7.50)    101137   213.795   0.6848 +- 0.0111      0.6768     -0.012
//     [1e7.50,1e8.00)    280193   244.035   0.6500 +- 0.0070      0.6472     -0.004
//   quarter-decades of [1e7,1e8):
//     q0: gaps   38071  Delta = 0.7203 +- 0.0176
//     q1: gaps   63065  Delta = 0.6842 +- 0.0142
//     q2: gaps  104886  Delta = 0.6677 +- 0.0113
//     q3: gaps  175306  Delta = 0.6565 +- 0.0089
//
// SEC 1 — THE TILE T_x: every origin visited, the seven convention constants, and the tail note's sec.2b and sec.4 tables
//   convention: tail = o - max{a opener : a + 2 < o}; head = min{a opener : a > o} - o;
//   backward-lt = o - max{a : a < o}; backward-le = o - max{a : a <= o}.  R = sum g^2 / 2W.
//    x |        W |         D | mbar     | R        | CV^2   | (1+CV^2)/2 |  tail all-R  odd-R  1mod6-R | head all-R  odd-R | back a<o  a<=o
//    7 |      210 |        15 | 14.0000 | 8.8286 | 0.2612 |   0.6306   |   2.500000 3.000000 5.000000 |  0.500000 1.000000 | 0.500000 -0.500000
//   11 |     2310 |       135 | 17.1111 | 11.1351 | 0.3015 |   0.6508   |   2.500000 3.000000 5.000000 |  0.500000 1.000000 | 0.500000 -0.500000
//   13 |    30030 |      1485 | 20.2222 | 13.6909 | 0.3540 |   0.6770   |   2.500000 3.000000 5.000000 |  0.500000 1.000000 | 0.500000 -0.500000
//   17 |   510510 |     22275 | 22.9185 | 16.1009 | 0.4051 |   0.7025   |   2.500000 3.000000 5.000000 |  0.500000 1.000000 | 0.500000 -0.500000
//   19 |  9699690 |    378675 | 25.6148 | 18.5566 | 0.4489 |   0.7244   |   2.500000 3.000000 5.000000 |  0.500000 1.000000 | 0.500000 -0.500000
//   23 | 223092870 |   7952175 | 28.0543 | 20.7803 | 0.4814 |   0.7407   |   2.500000 3.000000 5.000000 |  0.500000 1.000000 | 0.500000 -0.500000
//   29 | 6469693230 | 214708725 | 30.1324 | 22.6944 | 0.5063 |   0.7532   |   2.500000 3.000000 5.000000 |  (head not walked at this level)
//   the tail note sec.4 conditionals, rebuilt (E over origins in the named population, minus nothing):
//    x |  E_cls  | E_cls-R |  E_rc   |  E_sq   | E_rc/E_cls | E_sq/E_cls | E_sq/E_rc |    n_rc    |   n_sq  | E_rgh-R
//    7 | 14.4286 | 5.6000  | 14.5000 | 13.0000 |   1.0050   |   0.9010   |  0.8966   |         12 |       6 | 4.9214
//   11 | 16.8442 | 5.7091  | 17.2000 | 16.2000 |   1.0211   |   0.9618   |  0.9419   |        120 |      30 | 5.2524
//   13 | 19.5235 | 5.8326  | 20.2083 | 18.3667 |   1.0351   |   0.9407   |  0.9089   |       1440 |     180 | 5.4903
//   17 | 22.0136 | 5.9127  | 22.9659 | 20.9375 |   1.0433   |   0.9511   |  0.9117   |      23040 |    1440 | 5.6719
//   19 | 24.5294 | 5.9728  | 25.6618 | 23.5523 |   1.0462   |   0.9602   |  0.9178   |     414720 |   12960 | 5.8263
//   23 | 26.7880 | 6.0078  | 28.1268 | 27.2983 |   1.0500   |   1.0190   |  0.9705   |    9123840 |  142560 | 5.9604
//   29 | 28.7280 | 6.0336  | 30.2300 | 29.0998 |   1.0523   |   1.0129   |  0.9626   |  255467520 | 1995840 | 6.0581
//   the population p'^2 actually belongs to is the ROUGH class, not the class null:
//     x |  E_rc - R  |  E_cls - R  |  difference   (the record adds the class null's ~6.05 to R_shell, not the rough class's)
//     7 |   5.6714   |   5.6000    |   0.0714
//    11 |   6.0649   |   5.7091    |   0.3558
//    13 |   6.5174   |   5.8326    |   0.6849
//    17 |   6.8650   |   5.9127    |   0.9523
//    19 |   7.1053   |   5.9728    |   1.1325
//    23 |   7.3465   |   6.0078    |   1.3387
//    29 |   7.5357   |   6.0336    |   1.5020
//
// SEC 2 — THE SHIFT GROUPS: W(h) rebuilt from the comb, X2 as a group over ALL |h| < L against the doubled positive half
//   W(h) = prod_{p<=y} p*rho_p(h)/|E_p|^2, L = x#, y = largest prime <= sqrt(L).
//   W-(h) keeps only the p | h-2 bracket, W+(h) only p | h+2; W-(-h) = W+(h) identically, so
//   a group sum over all |h| < L is NOT the positive half doubled unless W- is even, which it is not.
//   brute force at x = 7: max |W-(-h) - W+(h)| over all |h| < L = 0.0e+0; W-(h) != W-(-h) at 9 of the 34 positive shifts h = 6k
//   brute force at x = 11: max |W-(-h) - W+(h)| over all |h| < L = 0.0e+0; W-(h) != W-(-h) at 159 of the 384 positive shifts h = 6k
//    x |  y     |  delta*X  | delta*X1  | delta*X2c | delta*X2- | delta*X2+ |  2*X2c  | 2*X2grp | d*Xmix(c) | d*Xmix(true) | c/true | Xmix/ln y | asym shifts
//    7 |     13 | 0.152075  | 0.205517  | 0.094199  | -0.009235 | -0.009235 |  5.7147 | -0.5603 | -0.241840  |  -0.034971   | 6.915  | -0.4136   | 9 (17 by divisor set)
//   11 |     47 | 0.256267  | 0.293618  | 0.047843  | 0.004509 | 0.004509 |  5.6281 |  0.5304 | -0.133037  |  -0.046368   | 2.869  | -0.7084   | 159 (274 by divisor set)
//   13 |    173 | 0.299499  | 0.322208  | 0.027019  | 0.001365 | 0.001365 |  5.3331 |  0.2694 | -0.076748  |  -0.025439   | 3.017  | -0.4872   | 2444 (4091 by divisor set)
//   17 |    709 | 0.326772  | 0.345842  | 0.017012  | 0.000736 | 0.000736 |  5.3519 |  0.2314 | -0.053095  |  -0.020542   | 2.585  | -0.4923   | 45296 (75231 by divisor set)
//   19 |   3109 | 0.347302  | 0.363348  | 0.011379  | 0.000394 | 0.000394 |  5.3266 |  0.1846 | -0.038804  |  -0.016835   | 2.305  | -0.4900   | 900676 (1495753 by divisor set)
//   23 |  14929 | 0.364320  | 0.377724  | 0.007968  | 0.000236 | 0.000236 |  5.3143 |  0.1571 | -0.029342  |  -0.013876   | 2.115  | -0.4814   | 21251359
//   the bound of varE-theta2-proof sec.3, |2*X2| <= 60 prod p(p-3)/(p-2)^2, against both readings:
//     x |   bound   | 2*X2 group | looseness vs group | 2*X2c doubled half | looseness vs half
//     7 |     78.44 |    -0.5603 |          140.0      |        5.7147      |          13.7
//    11 |    106.82 |     0.5304 |          201.4      |        5.6281      |          19.0
//    13 |    137.73 |     0.2694 |          511.2      |        5.3331      |          25.8
//    17 |    173.68 |     0.2314 |          750.6      |        5.3519      |          32.5
//    19 |    211.82 |     0.1846 |         1147.6      |        5.3266      |          39.8
//    23 |    252.81 |     0.1571 |         1608.8      |        5.3143      |          47.6
//   delta*(X - X1), the quantity varE-theta2-step sec.5 tabulates, is 2*X2 + Xmix under EITHER split:
//     x= 7: delta*(X-X1) = -0.053442 = corpus -0.053442 = corrected -0.053442
//     x=11: delta*(X-X1) = -0.037351 = corpus -0.037351 = corrected -0.037351
//     x=13: delta*(X-X1) = -0.022709 = corpus -0.022709 = corrected -0.022709
//     x=17: delta*(X-X1) = -0.019071 = corpus -0.019071 = corrected -0.019071
//     x=19: delta*(X-X1) = -0.016046 = corpus -0.016046 = corrected -0.016046
//     x=23: delta*(X-X1) = -0.013405 = corpus -0.013405 = corrected -0.013405
//
// SEC 3 — THE POOLED INTERCEPT: sub-window means to 16 splits, the exact two-piece decomposition, HL's own pooling
//   identity: Delta_pool - sum w_k Delta_k = -[ sum w_k a_k (m_k - mbar) + mbar (sum w_k a_k - a_pool) ],
//   split into the between-slope piece mbar(a_w - s_B) B/(V_w+B) and the within-slope-gradient remainder.
//   decade [1e5,1e6): pooled Delta = 0.6899 +- 0.0355, Delta_HL = 0.7914, alpha = 0.06645, lambda/2 = 0.03828
//     K  | mean Delta_k +- se | mean Delta_HL,k | pooling term | between | remainder | between share | s_B     | a_pool(id) | a_pool(direct) | HL_pool - mean HL | alpha_k range
//     2  |   0.7423 +- 0.0349   |     0.7927      |   -0.0524    | 0.0254  |  0.0269   |     48.479%   | 0.04002 |  0.06645   |    0.06645     |      -0.0013       | 0.07147 -> 0.06540
//     4  |   0.7605 +- 0.0347   |     0.7927      |   -0.0706    | 0.0326  |  0.0370   |     46.862%   | 0.03889 |  0.06645   |    0.06645     |      -0.0014       | 0.07520 -> 0.06485
//     8  |   0.7656 +- 0.0347   |     0.7925      |   -0.0757    | 0.0353  |  0.0387   |     47.640%   | 0.04002 |  0.06645   |    0.06645     |      -0.0011       | 0.07587 -> 0.06467
//    16  |   0.7628 +- 0.0347   |     0.7923      |   -0.0729    | 0.0357  |  0.0357   |     50.044%   | 0.04202 |  0.06645   |    0.06645     |      -0.0009       | 0.07762 -> 0.06301
//   decade [1e6,1e7): pooled Delta = 0.6862 +- 0.0148, Delta_HL = 0.7124, alpha = 0.05770, lambda/2 = 0.03256
//     K  | mean Delta_k +- se | mean Delta_HL,k | pooling term | between | remainder | between share | s_B     | a_pool(id) | a_pool(direct) | HL_pool - mean HL | alpha_k range
//     2  |   0.7316 +- 0.0146   |     0.7132      |   -0.0455    | 0.0225  |  0.0223   |     50.218%   | 0.03424 |  0.05771   |    0.05770     |      -0.0008       | 0.06118 -> 0.05694
//     4  |   0.7453 +- 0.0146   |     0.7134      |   -0.0592    | 0.0295  |  0.0291   |     50.264%   | 0.03439 |  0.05771   |    0.05770     |      -0.0010       | 0.06248 -> 0.05627
//     8  |   0.7516 +- 0.0145   |     0.7133      |   -0.0655    | 0.0314  |  0.0335   |     48.377%   | 0.03500 |  0.05771   |    0.05770     |      -0.0009       | 0.06363 -> 0.05593
//    16  |   0.7525 +- 0.0145   |     0.7133      |   -0.0663    | 0.0320  |  0.0338   |     48.582%   | 0.03532 |  0.05771   |    0.05770     |      -0.0009       | 0.06426 -> 0.05557
//   decade [1e7,1e8): pooled Delta = 0.6214 +- 0.0060, Delta_HL = 0.6545, alpha = 0.05079, lambda/2 = 0.02832
//     K  | mean Delta_k +- se | mean Delta_HL,k | pooling term | between | remainder | between share | s_B     | a_pool(id) | a_pool(direct) | HL_pool - mean HL | alpha_k range
//     2  |   0.6592 +- 0.0059   |     0.6551      |   -0.0378    | 0.0187  |  0.0191   |     49.598%   | 0.02867 |  0.05079   |    0.05079     |      -0.0006       | 0.05339 -> 0.05018
//     4  |   0.6705 +- 0.0059   |     0.6553      |   -0.0491    | 0.0245  |  0.0246   |     49.958%   | 0.02848 |  0.05079   |    0.05079     |      -0.0008       | 0.05461 -> 0.04968
//     8  |   0.6736 +- 0.0059   |     0.6553      |   -0.0522    | 0.0261  |  0.0262   |     49.930%   | 0.02848 |  0.05079   |    0.05079     |      -0.0008       | 0.05523 -> 0.04939
//    16  |   0.6740 +- 0.0059   |     0.6553      |   -0.0526    | 0.0264  |  0.0263   |     50.139%   | 0.02847 |  0.05079   |    0.05079     |      -0.0009       | 0.05541 -> 0.04919
//   each HALF-decade re-read as the gap-weighted mean of its own sub-splits (K = 1 is the half itself):
//     window            HL     K=1 (se)         K=2 (se)         K=4 (se)         K=8 (se)      | HL - K=4 value | z on the K=4 se
//     [1e5.00,1e5.50)  0.8298  0.8239 (0.0625)  0.8515 (0.0618)  0.8543 (0.0616)  0.8573 (0.0615)  |    -0.0245     |    -0.40
//     [1e5.50,1e6.00)  0.7786  0.7114 (0.0419)  0.7260 (0.0417)  0.7320 (0.0418)  0.7270 (0.0418)  |    0.0466     |    +1.12
//     [1e6.00,1e6.50)  0.7385  0.7705 (0.0268)  0.7892 (0.0267)  0.8000 (0.0267)  0.8001 (0.0267)  |    -0.0614     |    -2.30
//     [1e6.50,1e7.00)  0.7039  0.7172 (0.0174)  0.7291 (0.0173)  0.7337 (0.0173)  0.7348 (0.0173)  |    -0.0298     |    -1.72
//     [1e7.00,1e7.50)  0.6768  0.6848 (0.0111)  0.6978 (0.0110)  0.7005 (0.0110)  0.7009 (0.0110)  |    -0.0237     |    -2.15
//     [1e7.50,1e8.00)  0.6472  0.6500 (0.0070)  0.6607 (0.0070)  0.6638 (0.0070)  0.6643 (0.0070)  |    -0.0166     |    -2.37
//
// SEC 4 — THE ENSEMBLE LADDER: Delta_pipe / Delta_ens by full enumeration of T_y, y = 11..29 (y = 29 segmented)
//   Delta_ens is the OLS 2 - beta over the tile's own gaps with n = holes in [a_i, a_{i+1});
//   Delta_pipe is hl3's pipeline on the same gap law with rho truncated at q <= y.
//     y  |     W      |     D      |  E[g]  |  E[n]  |    R    | Delta_ens | Delta_pipe | pipe/ens | hole-origin head - R
//     11 |       2310 |        135 | 17.111 | 3.556 | 11.1351 |  1.2280   |   1.2884   |  1.0492  |        3.2524
//     13 |      30030 |       1485 | 20.222 | 3.879 | 13.6909 |  1.2164   |   1.2327   |  1.0134  |        3.4903
//     17 |     510510 |      22275 | 22.919 | 4.137 | 16.1009 |  1.2268   |   1.2074   |  0.9842  |        3.6719
//     19 |    9699690 |     378675 | 25.615 | 4.381 | 18.5566 |  1.2222   |   1.1869   |  0.9711  |        3.8263
//     23 |  223092870 |    7952175 | 28.054 | 4.589 | 20.7803 |  1.2168   |   1.1662   |  0.9584  |        3.9604
//     29 | 6469693230 |  214708725 | 30.132 | 4.759 | 22.6944 |  1.2057   |   1.1496   |  0.9535  |        4.0581
//   (y = 29 is the level attack-0830-head-remainder.md sec.0 records as dropped, "about fifteen minutes"; the walk above is under a minute for these statistics.)
//
// SEC 5 — THE CONSTANTS: e^{2gamma}/(8 C2), the record's factorisation, and the top window's un-matched E[g]
//   C2 (direct product to 2e7) = 0.660161817707   [literature 0.660161815847; the direct product converges from above]
//   HL = 1/(2 C2) = 0.757390   rho(2) = e^{2gamma}/4 = 0.793055   HL * rho(2) = 0.600652   e^{2gamma}/(8 C2) = 0.600652
//   mbar(x) = 6 prod_{5<=q<=x} q/(q-2) against its Mertens form e^{2gamma} ln^2 x /(2 C2):
//        x    |     mbar     |  Mertens form  |  ratio
//            7  |    14.000000 |       9.097631 | 1.538862
//           11  |    17.111111 |      13.814755 | 1.238611
//           13  |    20.222222 |      15.806669 | 1.279348
//           17  |    22.918519 |      19.285962 | 1.188352
//           19  |    25.614815 |      20.829933 | 1.229712
//           23  |    28.054321 |      23.620809 | 1.187695
//           29  |    30.132419 |      27.242396 | 1.106085
//          101  |    53.278373 |      51.173940 | 1.041123
//         1009  |   115.752032 |     114.942999 | 1.007039
//        10007  |   204.355304 |     203.845021 | 1.002503
//       100003  |   318.659385 |     318.461112 | 1.000623
//      1000003  |   458.618214 |     458.581811 | 1.000079
//     10000019  |   624.192599 |     624.180675 | 1.000019
//   the record's top band (zone-tail-02.js:796-798): t = 447.26, R_shell = 434.31, classNull = 440.36, c_local = 0.7522
//     implied ln^2(p'^2) = 594.60; R_shell/ln^2 = 0.7304; (R_shell/ln^2)/HL = 0.9644; product with t/R_shell = 0.7522
//     t/(R+1/2) = 1.0286  t/(R+5/2) = 1.0239  t/(R+3) = 1.0228  t/(R+5) = 1.0181  t/classNull = 1.0157   classNull - R_shell = 6.05
//     the rough-class constant the ensemble gives at x = 29 is E_rc - R = 7.5357; t/(R_shell + that) = 1.0123
//     c_local / 0.6007 = 1.2523   against 1/rho(2) = 1.2609
//   the anchoring part against the E[g] mismatch. Columns 1-4 are attack-0830-head-remainder.md sec.3's own
//   table (its Monte Carlo, quoted, not recomputed); the fit is a power law Delta_ens = c E[g]^k on its six points.
//     global log-log slope k = -0.3120;  local slope over the top two levels = -0.2858
//      E[g] line | E[g] ens | mismatch | Delta_ens as run | Delta_ens at the line's E[g] | meas/ens as run | meas/ens matched
//         113.1   |    113.6  |  -0.004  |      0.8537      |         0.8549 (0.8548)        |     0.9651      |     0.9638
//         135.8   |    136.2  |  -0.003  |      0.8100      |         0.8107 (0.8107)        |     0.8783      |     0.8775
//         157.4   |    157.5  |  -0.001  |      0.7742      |         0.7744 (0.7743)        |     0.9952      |     0.9950
//         184.4   |    184.3  |  0.001  |      0.7364      |         0.7363 (0.7363)        |     0.9739      |     0.9741
//         213.8   |    213.4  |  0.002  |      0.7012      |         0.7008 (0.7008)        |     0.9766      |     0.9772
//         244.0   |    235.9  |  0.034  |      0.6814      |         0.6743 (0.6749)        |     0.9539      |     0.9640
//
// VERDICT: 0 assertion failures
// ============================================================================
// READINGS
// ============================================================================
// (written in the companion note research/history/staging/redteam-0830-slack.md)
