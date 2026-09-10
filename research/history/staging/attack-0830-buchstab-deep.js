#!/usr/bin/env node
'use strict';
// ============================================================================
// ATTACK 0830 BUCHSTAB-DEEP — THE DEEP-LADDER BUCHSTAB TRANSFER AT DIMENSION 2,
// PRICED WITH THE DHR SHARP SIEVE FUNCTIONS AT THE DEPTHS THE RUN LEVELS REACH,
// AND CHECKED AGAINST THE EXACT LADDER AT @23
// ============================================================================
// QUESTION (TODO item 8, remaining part (a)). The certificate engine
// (research/natal-cap-28-analytic-certificate.js, RESULT 2) models the depth-K
// survival ratio of the fresh victims of a scour prime q as
//   (cap_K(q) - s) / (cap2(q) - s)  =  PROD_{i<K} (1 - 1/(q_i - 1)) * B(q,K),
// with B a ratio of dimension-1 Buchstab densities. The shallow half
// (thm-buchstab-transfer-shallow.md) proves B = 1 + O(delta) through the
// fundamental lemma, which needs s >= 22.06 and is empty at every run level.
// This producer prices every route that does NOT go through the fundamental
// lemma: the Diamond-Halberstam-Richert functions F2, f2 on the numerator and
// the denominator separately, the Buchstab identity iterated once (Bonferroni)
// with F2 on the subtracted terms, and the kappa = 1 linear-sieve coordinates
// that part (b) would need. Everything sieve-theoretic here is a LIMIT-FORM
// statement: remainder and the unwritten O-constant of DH Theorem 9.1 are set
// to zero. SEC 4 then prices the remainder exactly, to show what the finite
// level costs on top.
//
// SOURCES COPIED VERBATIM, NOT RE-DERIVED.
//   solveDDE  — research/attack-beta2-04-loss-budget.js (embedded producer,
//               code-sha256 b289acea...), the (F_kappa, f_kappa) march from
//               Booker-Browning Thm 3.1 as quoted in research/dhr-verification.md
//               section 1.1. SEC 0 checks it against that file's own OUTPUT
//               figures (f2/F2 at 4.5, 5.0, 20).
//   omega     — research/natal-cap-28-analytic-certificate.js lines 84-89, the
//               engine's own Buchstab grid, so the model B printed here is the
//               engine's B and not a re-implementation.
//   marchLevel/scanLevel logic — natal-cap-28 (cap-24 verbatim), re-expressed
//               to keep the per-q, per-K survival counts, and asserted against
//               natal-cap-28's embedded @23 'meas' column at all nine K.
// CONSTANTS. beta2 = 4.26645028414864191641, alpha2 = 5.35772744559446184227
// (Booker-Browning, rigorous truncation, dhr-verification.md section 1.1).
//
// DIRECTION. The certificate is survivors >= N - SUM_q cap_K(q), so the only
// direction it can use is an UPPER bound on cap_K(q), i.e. on the sifted
// count #A_K. The sharp sieve's upper side is F2. Lower sides (f2) are
// printed because "proving the transfer" means an asymptotic, which needs
// both sides; they never enter a certificate here.
//
//   node research/history/staging/attack-0830-buchstab-deep.js   (~15 s, ~100 MB)
// ============================================================================
function assert(c, m) { if (!c) throw new Error('ASSERT FAIL: ' + m); }
let checks = 0; function check(c, m) { checks++; assert(c, m); }
const fmt = (v, d = 4) => (Number.isFinite(v) ? v.toFixed(d) : String(v));
const EULER = 0.5772156649015328606;
const BETA2 = 4.26645028414864191641;
const ALPHA2 = 5.35772744559446184227;
function primesUpTo(n) { const s = new Uint8Array(n + 1), o = []; for (let i = 2; i <= n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } } return o; }

// ---- solveDDE, verbatim from research/attack-beta2-04-loss-budget.js ---------
function solveDDE(kappa, alpha, beta, UMAX, h) {
  const N = Math.round(UMAX / h) + 1;
  const i1 = Math.round(1 / h), i2 = Math.round(2 / h);
  const G = new Float64Array(N);   // g(u) = u^{-k} sigma(u)
  const F = new Float64Array(N);
  const f = new Float64Array(N);
  const gam = kappa === 1 ? 1 : 2;   // Gamma(1+kappa) for kappa in {1,2}
  const A = Math.pow(2 * Math.exp(EULER), -kappa) / gam;
  for (let i = 0; i <= i2 && i < N; i++) G[i] = A;
  const dg = i => { const u = i * h; return u <= 2 ? 0 : -kappa * Math.pow(u, -kappa - 1) * Math.pow(u - 2, kappa) * G[i - i2]; };
  for (let i = i2 + 1; i < N; i++) G[i] = G[i - 1] + 0.5 * h * (dg(i - 1) + dg(i));
  const sigma = i => Math.pow(i * h, kappa) * G[i];

  const ia = Math.floor(alpha / h), ib = Math.floor(beta / h);
  for (let i = 1; i <= ia && i < N; i++) F[i] = 1 / sigma(i);
  F[0] = Infinity;
  for (let i = 0; i <= ib && i < N; i++) f[i] = 0;

  // forward march. At index i both delayed values (i - i1) are already set.
  let PF = Math.pow(ia * h, kappa) * F[ia];
  let Pf = 0;
  const start = Math.min(ia, ib) + 1;
  for (let i = start; i < N; i++) {
    const u = i * h, um = (i - 1) * h;
    if (i > ib) {
      Pf += 0.5 * h * (kappa * Math.pow(um, kappa - 1) * F[i - 1 - i1] + kappa * Math.pow(u, kappa - 1) * F[i - i1]);
      f[i] = Pf / Math.pow(u, kappa);
    }
    if (i > ia) {
      PF += 0.5 * h * (kappa * Math.pow(um, kappa - 1) * f[i - 1 - i1] + kappa * Math.pow(u, kappa - 1) * f[i - i1]);
      F[i] = PF / Math.pow(u, kappa);
    }
  }
  const at = (arr, u) => { const t = u / h, i = Math.floor(t); if (i < 0 || i + 1 >= N) return NaN; const w = t - i; return arr[i] * (1 - w) + arr[i + 1] * w; };
  return { F: u => at(F, u), f: u => at(f, u), sigma: u => at(G, u) * Math.pow(u, kappa), N, h };
}

// ---- Buchstab omega grid, verbatim from natal-cap-28 lines 84-89 ------------
const H = 1 / 4096, UMAX = 24, NG = Math.round((UMAX - 1) / H), OM = new Float64Array(NG + 1);
{ for (let i = 0; i <= NG; i++) { const u = 1 + i * H; OM[i] = u <= 2 ? 1 / u : 0; }
  const i2 = Math.round(1 / H); let g = 2 * OM[i2];
  for (let i = i2 + 1; i <= NG; i++) { g += H * (OM[i - 1 - i2] + OM[i - i2]) / 2; OM[i] = g / (1 + i * H); } }
const EMG = 0.5614594836; // e^{-gamma}
function omega(u) { if (u <= 1) return 0; if (u >= UMAX) return EMG; const t = (u - 1) / H, i = Math.floor(t), f = t - i; return i >= NG ? OM[NG] : OM[i] * (1 - f) + OM[i + 1] * f; }

// ============================================================================
console.log('SEC 0 — THE INSTRUMENTS, CHECKED AGAINST THEIR EMBEDDED SOURCES');
const DH = 1e-5, DUMAX = 22; // the reference producer's own grid (attack-beta2-04 section3: h = 1e-5, UMAX = 22)
const S2 = solveDDE(2, ALPHA2, BETA2, DUMAX, DH);
const S1 = solveDDE(1, 2, 2, DUMAX, DH);
{
  // attack-beta2-04-loss-budget.js OUTPUT, section 3c table (cited)
  const ref = [[4.5, 0.240280, 1.570435], [5.0, 0.578997, 1.392835], [6.0, 0.884369, 1.113607], [8.0, 0.997329, 1.002663]];
  let worst = 0;
  for (const [u, f, F] of ref) { worst = Math.max(worst, Math.abs(S2.f(u) - f), Math.abs(S2.F(u) - F)); }
  console.log(`  kappa=2 march vs attack-beta2-04 OUTPUT at u = 4.5, 5, 6, 8: worst |diff| = ${worst.toExponential(2)}`);
  check(worst < 2e-4, 'DHR march reproduces the embedded artifact');
  const c1 = Math.abs(S1.F(2.5) - 2 * Math.exp(EULER) / 2.5), c2 = Math.abs(S1.f(3) - 2 * Math.exp(EULER) * Math.log(2) / 3);
  console.log(`  kappa=1 closed forms: |F1(2.5) - 2e^g/2.5| = ${c1.toExponential(2)}, |f1(3) - 2e^g ln2/3| = ${c2.toExponential(2)}`);
  check(c1 < 1e-6 && c2 < 5e-5, 'linear sieve closed forms (the reference march carries a ~6e-6 offset on f1, visible in its own table as f1 -> 1.000006)');
  console.log(`  f2(BETA2 + 1e-3) = ${S2.f(BETA2 + 1e-3).toExponential(3)} (positive), f2(BETA2 - 1e-3) = ${S2.f(BETA2 - 1e-3)}`);
  console.log(`  e^g omega(2) = ${fmt(Math.exp(EULER) * omega(2), 6)}  (the engine's deep-end B, cited 0.890536)`);
  check(Math.abs(Math.exp(EULER) * omega(2) - 0.890536) < 1e-5, 'omega grid');
}

// ============================================================================
console.log('\nSEC 1 — THE SIFTING PARAMETER EACH RUN LEVEL HAS');
console.log('  sigma(q) = ln(T)/ln q, T = W/q, D = T (epsilon -> 0). kappa = 2 formulation of thm-buchstab-transfer-shallow.md section 3.1: z = q.');
console.log('  q0 = the shallowest scour prime; sigma = 2 at q = W^{1/3}; sigma = 1 at q = sqrt W; f2 > 0 needs sigma > beta2, i.e. q < W^{1/(1+beta2)}.');
const LEVELS = [13, 17, 19, 23, 29, 31, 37, 41, 53, 97];
// engine's crossing depth y* (natal-cap-28 embedded q* column; @23 from u2-engine-depth.md section 2 y*_ctr)
const YST = { 23: 150.89, 29: 408.9, 31: 1092, 37: 3121, 41: 8854, 53: 2.440e5, 97: 1.666e10 };
const lvl = {};
console.log('  x   lnW       q0    sigma(q0)  ln(W)/(1+beta2) as q  log-depth share with f2>0   count share (exact)   sigma2(head,y*)  sigma2(tail,y*)');
for (const x of LEVELS) {
  const wheel = primesUpTo(x); let lnW = 0; for (const p of wheel) lnW += Math.log(p);
  const q0 = primesUpTo(x + 30).find(p => p > x);
  const sig0 = (lnW - Math.log(q0)) / Math.log(q0);
  const lnqmax = lnW / (1 + BETA2), lnroot = lnW / 2;
  const share = Math.max(0, (lnqmax - Math.log(q0)) / (lnroot - Math.log(q0)));
  let cnt = 'n/a';
  if (lnroot <= Math.log(6e7)) {
    const root = Math.floor(Math.exp(lnroot)) + 2;
    const sc = primesUpTo(root).filter(q => q > x && Math.log(q) * 2 <= lnW);
    const n1 = sc.filter(q => (lnW - Math.log(q)) / Math.log(q) > BETA2).length;
    cnt = `${n1}/${sc.length} = ${(100 * n1 / sc.length).toFixed(2)}%`;
  }
  let s2h = 'n/a', s2t = 'n/a';
  if (YST[x]) { s2h = fmt((lnW - Math.log(q0)) / Math.log(YST[x]), 3); s2t = fmt((lnW / 2) / Math.log(YST[x]), 3); }
  lvl[x] = { lnW, q0, sig0 };
  console.log(`  ${String(x).padEnd(3)} ${fmt(lnW, 3).padEnd(9)} ${String(q0).padEnd(5)} ${fmt(sig0, 4).padEnd(10)} ${Math.exp(lnqmax).toExponential(2).padEnd(19)} ${(100 * share).toFixed(2).padStart(6)}%                    ${cnt.padEnd(21)} ${s2h.padEnd(16)} ${s2t}`);
}
check(Math.abs(lvl[23].sig0 - 4.7088) < 5e-4 && Math.abs(lvl[97].sig0 - 17.1422) < 5e-4, 'sigma(q0) reproduces the sibling notes at @23 and @97');

// ============================================================================
console.log('\nSEC 2 — WHAT THE SHARP FUNCTIONS GIVE AT THOSE DEPTHS  [LIMIT-FORM]');
console.log('  The ratio the transfer models has numerator and denominator at the same z = q, so its certified bracket is [f2/F2, F2/f2] at sigma(q).');
console.log('  x    sigma(q0)   F2        f2        F2/f2 (bracket width on B)   F2 alone (legal side, factor on cap_K)');
for (const x of LEVELS) {
  const s = lvl[x].sig0, F = S2.F(s), f = S2.f(s);
  console.log(`  ${String(x).padEnd(4)} ${fmt(s, 4).padEnd(11)} ${fmt(F, 5).padEnd(9)} ${fmt(f, 5).padEnd(9)} ${(f > 0 ? fmt(F / f, 4) : 'no lower bound (f2 = 0)').padEnd(29)} ${fmt(F, 4)}`);
}
{
  const targets = [[1.1229, 'resolve the deep-end correction e^g/2 = 0.8905 (width 1/0.8905)'], [1.0104, 'resolve e^g omega(3) - 1 = 0.0052 (mid-curve bump, width 2x that)'], [1.001, 'resolve a 0.1% correction']];
  console.log('  bracket width F2/f2 first below a target, and the least level whose head sigma(q0) reaches it:');
  const allx = primesUpTo(1300).filter(p => p >= 13);
  for (const [w, what] of targets) {
    let s = BETA2 + 1e-3; while (S2.F(s) / S2.f(s) > w && s < 25) s += 1e-3;
    let lx = null; let lnW = 0; const ps = primesUpTo(1300);
    for (const p of ps) { lnW += Math.log(p); if (p < 13) continue; const q0 = allx.find(q => q > p); const sg = (lnW - Math.log(q0)) / Math.log(q0); if (sg >= s) { lx = p; break; } }
    console.log(`    width < ${w}: sigma >= ${fmt(s, 3)}  -> ${what}; head sigma(q0) first reaches it at level x = ${lx}`);
  }
  console.log(`  F2 at the deep end of every scour, sigma = 1: F2(1) = ${fmt(S2.F(1), 4)}; at sigma = 2 (q = W^{1/3}, start of the tail regime): F2(2) = ${fmt(S2.F(2), 4)}`);
  // SEC 2b: where the correction lives. B departs from 1 only where e^g omega(u) departs from 1, u = ln n / ln y_K <= ln W / ln y_K.
  // Since q > y_K, sigma(q) = ln W/ln q - 1 < ln W/ln y_K - 1 = u - 1. So a correction of size c at u < u_c is confined to sigma < u_c - 1.
  console.log('  SEC 2b — where |B - 1| >= c can occur (u_c = the largest u with |e^g omega(u) - 1| >= c, on the engine\'s own omega grid), and the sieve functions at the sigma that allows it:');
  console.log('    c        u_c      sigma < u_c - 1   F2(u_c - 1)   f2(u_c - 1)');
  for (const c of [0.10, 0.05, 0.02, 0.01, 0.001, 1e-5]) {
    let uc = 1; for (let u = 12; u > 1; u -= 1e-4) { if (Math.abs(Math.exp(EULER) * omega(u) - 1) >= c) { uc = u; break; } }
    const sg = uc - 1;
    console.log(`    ${String(c).padEnd(8)} ${fmt(uc, 3).padEnd(8)} ${fmt(sg, 3).padEnd(17)} ${fmt(S2.F(sg), 3).padEnd(13)} ${fmt(S2.f(sg), 3)}`);
  }
}

// ============================================================================
console.log('\nSEC 3 — THE EXACT LADDER AT @23, PER q AND PER K, AGAINST THE MODEL B AND THE BRACKETS');
const X = 23;
const wheel = primesUpTo(X), mids = wheel.filter(p => p >= 7);
let W = 1; for (const p of wheel) W *= p;
const alive = new Uint8Array(W); let N = 0;
for (const r0 of [11, 17]) for (let r = r0; r < W; r += 30) { let ok = true; for (const p of mids) { const m = r % p; if (m === 0 || m === p - 2) { ok = false; break; } } if (ok) { alive[r] = 1; N++; } }
const scour = primesUpTo(Math.ceil(Math.sqrt(W)) + 2).filter(q => q > X && q * q <= W);
const rows = [];
for (const q of scour) { let fresh = 0, self = 0; for (let r = q; r < W; r += q) if (alive[r]) { alive[r] = 0; fresh++; if (r === q) self++; } for (let r = q - 2; r < W; r += q) if (alive[r]) { alive[r] = 0; fresh++; if (r === q - 2) self++; } rows.push({ q, fresh, self }); }
let truth = 0; for (const r0 of [11, 17]) for (let r = r0; r < W; r += 30) if (alive[r]) truth++;
check(N === 5301450 && truth === 597475 && scour.length === 1739, 'natal-cap-28 @23 anchors N, truth, scour');
const len = scour.length, Q = Int32Array.from(scour), lnQ = Float64Array.from(Q, q => Math.log(q));
const LIM = Math.floor((W + 1) / Q[0]), lpf = new Int32Array(LIM + 1);
for (let i = 2; i <= LIM; i++) if (lpf[i] === 0) for (let j = i; j <= LIM; j += i) if (lpf[j] === 0) lpf[j] = i;
const Fq = Float64Array.from(Q, q => 1 / (q - 1)); const P = new Float64Array(len + 1); P[0] = 1; for (let j = 0; j < len; j++) P[j + 1] = P[j] * (1 - Fq[j]);
// sieve density V_K(q) = prod_{7<=p<=y_K}(1-2/p) * prod_{y_K<p<q}(1-1/p), y_0 = x
let V2x = 1; for (const p of mids) V2x *= (1 - 2 / p);
const P1 = new Float64Array(len + 1); P1[0] = 1; for (let j = 0; j < len; j++) P1[j + 1] = P1[j] * (1 - 1 / Q[j]);
const Vk = (idx, K) => { let v = V2x; for (let j = 0; j < K; j++) v *= (1 - 2 / Q[j]); for (let j = K; j < idx; j++) v *= (1 - 1 / Q[j]); return v; };
const perQ = [];
const KLIST = [0, 27, 60, 100, 150, 250, 500, 1000, 1739];
const floorTrue = new Float64Array(KLIST.length), floorSharp = new Float64Array(KLIST.length);
let sumCap2 = 0;
for (let idx = 0; idx < len; idx++) {
  const q = Q[idx], A = Math.floor((W - 1) / q), B = Math.floor((W + 1) / q);
  const s = [11, 13, 17, 19].includes(q % 30) ? 1 : 0;
  const nf = idx, hist = new Int32Array(nf + 1);
  let XA = 0, XB = 0;
  for (let m = 2; m <= B; m++) {
    const v = q * m, t30 = v % 30; let side = 0;
    if (m <= A && (t30 === 11 || t30 === 17)) { XA++; let ok = true; for (const p of mids) if (v % p === p - 2) { ok = false; break; } if (ok) side = 1; }
    else if (t30 === 13 || t30 === 19) { XB++; let ok = true; for (const p of mids) if (v % p === 2) { ok = false; break; } if (ok) side = 2; }
    if (!side || lpf[m] < q) continue;
    let first = nf;
    if (side === 1) { for (let j = 0; j < nf; j++) { const t = v % Q[j]; if (t === 0 || t === Q[j] - 2) { first = j; break; } } }
    else { for (let j = 0; j < nf; j++) { const t = v % Q[j]; if (t === 0 || t === 2) { first = j; break; } } }
    hist[first]++;
  }
  const cum = new Int32Array(nf + 2); for (let j = nf; j >= 0; j--) cum[j] = cum[j + 1] + hist[j];
  assert(cum[nf] === rows[idx].fresh - rows[idx].self, `cap_full anchor q=${q}`); // natal-cap-28's own anchor: full-depth survivors = the march's fresh kills minus self-strikes
  const cap2 = s + cum[0]; sumCap2 += cap2;
  const T = B, sig = Math.log(T) / lnQ[idx], F2s = S2.F(sig), f2s = S2.f(sig);
  const Xtot = XA + XB;
  for (let k = 0; k < KLIST.length; k++) {
    const K = Math.min(KLIST[k], nf);
    floorTrue[k] += s + cum[K];
    const up = Xtot * Vk(idx, K) * F2s;
    floorSharp[k] += s + Math.min(cum[0], up);
  }
  perQ.push({ q, idx, s, A, B, XA, XB, cum, cap2, sig, F2s, f2s });
}
console.log(`  N = ${N}, truth = ${truth}, scour = ${len}, Sigma cap2 = ${sumCap2}`);
{
  const ENG = [-1733138, 4841, 272732, 381799, 449292, 514452, 570772, 593943, 596782]; // natal-cap-28 embedded OUTPUT, @23 'meas' column
  console.log('  K      floor_true   engine meas   floor_sharp [F2, limit-form]   floor_sharp/N');
  for (let k = 0; k < KLIST.length; k++) {
    const ft = N - floorTrue[k], fs = N - floorSharp[k];
    check(ft === ENG[k], `floor at K=${KLIST[k]} reproduces natal-cap-28 (${ft} vs ${ENG[k]})`);
    console.log(`  ${String(KLIST[k]).padEnd(6)} ${String(ft).padStart(10)}   ${String(ENG[k]).padStart(10)}   ${fs.toFixed(0).padStart(14)}                 ${(fs / N).toFixed(3)}`);
  }
  // the best the sharp upper side could ever do: F2 = 1 exactly at every q (its infimum), still with the min against cap2
  // does the sharp upper side ever beat the trivial cap_K <= cap2? count (q, K) pairs at full depth and at every K, and the least ratio
  let below = 0, pairs = 0, minRatio = Infinity, argq = 0;
  for (const r of perQ) { for (let K = 0; K <= r.idx; K++) { pairs++; const up = (r.XA + r.XB) * Vk(r.idx, K) * r.F2s; if (up < r.cum[0]) below++; } const rf = (r.XA + r.XB) * Vk(r.idx, r.idx) * r.F2s / Math.max(1, r.cum[0]); if (r.cum[0] > 0 && rf < minRatio) { minRatio = rf; argq = r.q; } }
  console.log(`  (q, K) pairs at @23 where X V_K F2(sigma(q)) < #A_0 (the trivial bound): ${below} of ${pairs}; least ratio (X V_full F2)/#A_0 over q: ${fmt(minRatio, 3)} at q = ${argq}`);
  check(below === 0, 'the sharp upper bound never beats the trivial one at @23');
  let best = 0; for (const r of perQ) best += r.s + Math.min(r.cum[0], (r.XA + r.XB) * Vk(r.idx, r.idx));
  console.log(`  for scale only, NOT a bound (#A_K/(X V_K) exceeds 1 in the tail, table below): F2 replaced by 1 at every q gives ${(N - best).toFixed(0)} at full depth vs truth ${truth}`);
}
console.log('  per-q, per-K: B_true = (cap_K - s)/((cap2 - s) PROD), B_model = the engine omega-ratio, bracket [f2/F2, F2/f2] at sigma(q), Bonferroni-1 lower bound on B (limit-form)');
console.log('  also #A_K/(X V_K): the sifted count against its own sieve main term, which the sharp sieve brackets by [f2, F2]');
{
  const NB = 24;
  const lnx = Math.log(X);
  const pick = [31, 37, 41, 53, 101, 211, 401, 1009, 2003, 4001, 8009, 11000].map(q => perQ.find(r => r.q >= q)).filter(Boolean);
  for (const r of pick) {
    const lnn = new Float64Array(NB), wgt = new Float64Array(NB); let ws = 0; const lo = r.q * r.q, span = W - lo;
    for (let b = 0; b < NB; b++) { const n = lo + span * (b + 0.5) / NB; lnn[b] = Math.log(n); wgt[b] = 1 / Math.max(0.5, lnn[b] - lnQ[r.idx]); ws += wgt[b]; }
    const omAt = lny => { let a = 0; for (let b = 0; b < NB; b++) a += wgt[b] * omega(lnn[b] / lny); return a / ws; };
    const om0 = omAt(lnx);
    const Kgrid = [1, 2, 5, 10, 27, 60, 100, 250, 500, 1000, r.idx].filter((K, i, a) => K <= r.idx && a.indexOf(K) === i);
    const br = r.f2s > 0 ? `[${fmt(r.f2s / r.F2s, 3)}, ${fmt(r.F2s / r.f2s, 3)}]` : 'no lower bound';
    console.log(`  q = ${r.q} (idx ${r.idx}, T = ${r.B}, sigma = ${fmt(r.sig, 3)}, F2 = ${fmt(r.F2s, 3)}, f2 = ${fmt(r.f2s, 3)}, bracket on B ${br}, cap2 = ${r.cap2}, #A_0/(X V_0) = ${fmt(r.cum[0] / ((r.XA + r.XB) * Vk(r.idx, 0)), 4)})`);
    console.log('     K      y_K   cap_K   B_true    B_model   #A_K/(X V_K)   Bonf-1 lower on B');
    for (const K of Kgrid) {
      const Bt = (r.cum[K]) / (r.cum[0] * P[K]);
      const Bm = omAt(lnQ[K - 1]) / om0;
      const ratio = r.cum[K] / ((r.XA + r.XB) * Vk(r.idx, K));
      let bonf = 'n/a';
      if (r.f2s > 0) { let sum = 0; for (let i = 0; i < K; i++) { const si = (Math.log(r.B) - lnQ[i]) / lnQ[r.idx]; sum += S2.F(si) / ((Q[i] - 1) * r.f2s); } bonf = fmt((1 - sum) / P[K], 3); }
      console.log(`     ${String(K).padEnd(6)} ${String(Q[K - 1]).padEnd(6)} ${String(r.s + r.cum[K]).padStart(6)}   ${fmt(Bt, 4)}    ${fmt(Bm, 4)}    ${fmt(ratio, 4).padEnd(12)}   ${bonf}`);
    }
  }
}

// ============================================================================
console.log('\nSEC 4 — THE FINITE LEVEL: DH THEOREM 9.1\'s REMAINDER 2 SUM_{m|P(z), m<D} 4^nu(m) |r_A(m)|, EXACT, AT @23 AND @29 HEAD PRIMES');
console.log('  A = {m <= T : m = a (mod 30)}, two classes a; for m | P(z), r_A(m) = #{m-values in the union of the omega(m) sifting classes mod m} - X omega(m)/m, exact by floor division.');
console.log('  The O((log log D)^2/(log D)^{1/6}) term carries an unwritten constant and is NOT added: these are lower bounds on the finite-level cost.');
function remainderExact(x, q, yK, T, D) {
  // sifting primes 7 <= p < q; classes for m: {0, -2 q^{-1} mod p} for p <= yK, {0} above. Two classes a mod 30 (q m = 11, 17 mod 30).
  const ps = primesUpTo(q - 1).filter(p => p >= 7);
  const modinv = (a, p) => { let t = 0, nt = 1, r = p, nr = ((a % p) + p) % p; while (nr) { const qq = Math.floor(r / nr); [t, nt] = [nt, t - qq * nt]; [r, nr] = [nr, r - qq * nr]; } return ((t % p) + p) % p; };
  const cls = ps.map(p => p <= yK ? [0, (p - 2 * modinv(q, p) % p) % p] : [0]);
  const aList = [11, 17].map(a => (a * modinv(q, 30)) % 30);
  const Xa = aList.map(a => Math.floor((T - a) / 30) + 1);
  const Xtot = Xa[0] + Xa[1];
  // enumerate squarefree m | P(z) with m < D, by DFS; for each, the union of class-combinations mod m is a set of prod omega(p) classes; count via CRT per combination
  let sumExact = 0, sumTriv = 0, nm = 0, maxAbs = 0;
  const crt = (r1, m1, r2, m2) => { // combine x = r1 mod m1, x = r2 mod m2, (m1,m2)=1
    const inv = modinv(m1 % m2, m2); const k = ((r2 - r1) % m2 + m2) % m2 * inv % m2; return r1 + m1 * k; };
  const rec = (i, m, nu, combos) => { // combos: array of residues mod m
    if (m > 1 && m < D) {
      let cnt = 0;
      for (const c of combos) for (let t = 0; t < 2; t++) { const a = aList[t]; const M = 30 * m; let r0 = crt(a, 30, c, m); // m-values in [1, T] with m-value = r0 mod 30m
        if (r0 === 0) r0 = M; if (r0 <= T) cnt += Math.floor((T - r0) / M) + 1; }
      const rA = cnt - Xtot * combos.length / m;
      sumExact += Math.pow(4, nu) * Math.abs(rA); sumTriv += Math.pow(4, nu) * combos.length; nm++; if (Math.abs(rA) > maxAbs) maxAbs = Math.abs(rA);
    }
    for (let j = i; j < ps.length; j++) { const p = ps[j]; if (m * p >= D) continue; const nc = []; for (const c of combos) for (const cp of cls[j]) nc.push(crt(c, m, cp, p)); rec(j + 1, m * p, nu + 1, nc); }
  };
  rec(0, 1, 0, [0]);
  let V = 1; for (let j = 0; j < ps.length; j++) V *= (1 - cls[j].length / ps[j]);
  return { Xtot, V, sumExact: 2 * sumExact, sumTriv: 2 * sumTriv, nm, maxAbs };
}
{
  const cases = [[23, 31, 23], [23, 31, 29], [23, 37, 31], [29, 31, 29]];
  for (const [x, q, yK] of cases) {
    const wh = primesUpTo(x); let Wx = 1; for (const p of wh) Wx *= p; const T = Math.floor((Wx + 1) / q);
    for (const [label, D] of [['D = T', T], ['D = q^4.5', Math.pow(q, 4.5)]]) {
      const sig = Math.log(D) / Math.log(q), F = S2.F(sig), f = S2.f(sig);
      const R = remainderExact(x, q, yK, T, D);
      const main = R.Xtot * R.V;
      console.log(`  @${x} q = ${q} y_K = ${yK} ${label}: sigma = ${fmt(sig, 3)}, X V = ${main.toFixed(0)}, X V f2 = ${(main * f).toFixed(0)}, X V F2 = ${(main * F).toFixed(0)}; remainder: exact ${R.sumExact.toFixed(0)} (max|r| ${R.maxAbs.toFixed(2)}, ${R.nm} moduli), trivial |r|<=omega(m): ${R.sumTriv.toFixed(0)}; exact/(X V) = ${(R.sumExact / main).toFixed(2)}`);
    }
  }
}

// ============================================================================
console.log('\nSEC 5 — PART (b) COORDINATES: THE kappa = 1 SIEVE OVER PRIMES AT THE ENGINE\'S CROSSING DEPTH (scoped, not attacked)');
console.log('  tail regime q^3 > W: m prime, T = W/q runs from W^{2/3} (q = W^{1/3}) down to W^{1/2} (q = sqrt W); sift the partner q m + 2 by one class per freshness prime up to y*.');
console.log('  level D = T^theta; s = theta ln T / ln y*. theta = 1/2 is Bombieri-Vinogradov, theta = 1 is Elliott-Halberstam; F1 needs s >= 1, f1 > 0 needs s > 2.');
console.log('  x    rho = ln y*/ln T at T = W^{2/3} | at T = sqrt W     s_BV (2/3 | 1/2)     s_EH (2/3 | 1/2)     F1(s_EH) (2/3 | 1/2)   theta for s = 2 at sqrt W');
for (const x of [29, 31, 37, 41, 53, 97]) {
  const { lnW } = lvl[x]; const ly = Math.log(YST[x]);
  const r23 = ly / (2 * lnW / 3), r12 = ly / (lnW / 2);
  const F1 = s => (s >= 1 ? fmt(S1.F(s), 3) : 'none');
  console.log(`  ${String(x).padEnd(4)} ${fmt(r23, 3)} | ${fmt(r12, 3).padEnd(28)} ${fmt(0.5 / r23, 3)} | ${fmt(0.5 / r12, 3).padEnd(13)} ${fmt(1 / r23, 3)} | ${fmt(1 / r12, 3).padEnd(13)} ${F1(1 / r23)} | ${F1(1 / r12).padEnd(13)} ${fmt(2 * r12, 3)}`);
  if (x === 97) check(Math.abs(r12 - 0.562) < 1e-3 && Math.abs(0.5 / r12 - 0.890) < 1e-3 && Math.abs(1 / r12 - 1.779) < 1e-3, 'reproduces thm-capK-bv / thm-sharp-sieve-range at @97: 0.562, s_BV 0.890, s_EH 1.779');
}
console.log(`\nchecks passed: ${checks}`);
console.log('ALL ASSERTIONS PASS');
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/attack-0830-buchstab-deep.js
//   invocation:  node research/history/staging/attack-0830-buchstab-deep.js
//   code-sha256: f0d7fd03e0ffe03510b7d306687f2ab86d33cb5e7ba20b991a1243b0c8e006d6
//   out-sha256:  d0bbd7b581470b52b7f5a087572e50497cb1c9b5242cf2c2180556c2e50720e4
//   body-lines:  190
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     43.2 s
// ============================================================================
// SEC 0 — THE INSTRUMENTS, CHECKED AGAINST THEIR EMBEDDED SOURCES
//   kappa=2 march vs attack-beta2-04 OUTPUT at u = 4.5, 5, 6, 8: worst |diff| = 4.92e-7
//   kappa=1 closed forms: |F1(2.5) - 2e^g/2.5| = 2.22e-16, |f1(3) - 2e^g ln2/3| = 1.19e-5
//   f2(BETA2 + 1e-3) = 1.180e-3 (positive), f2(BETA2 - 1e-3) = 0
//   e^g omega(2) = 0.890536  (the engine's deep-end B, cited 0.890536)
//
// SEC 1 — THE SIFTING PARAMETER EACH RUN LEVEL HAS
//   sigma(q) = ln(T)/ln q, T = W/q, D = T (epsilon -> 0). kappa = 2 formulation of thm-buchstab-transfer-shallow.md section 3.1: z = q.
//   q0 = the shallowest scour prime; sigma = 2 at q = W^{1/3}; sigma = 1 at q = sqrt W; f2 > 0 needs sigma > beta2, i.e. q < W^{1/(1+beta2)}.
//   x   lnW       q0    sigma(q0)  ln(W)/(1+beta2) as q  log-depth share with f2>0   count share (exact)   sigma2(head,y*)  sigma2(tail,y*)
//   13  10.310    17    2.6390     7.08e+0               0.00%                    0/34 = 0.00%          n/a              n/a
//   17  13.143    19    3.4637     1.21e+1               0.00%                    0/120 = 0.00%         n/a              n/a
//   19  16.088    23    4.1308     2.12e+1               0.00%                    0/435 = 0.00%         n/a              n/a
//   23  19.223    29    4.7088     3.85e+1               4.53%                    3/1739 = 0.17%        3.161            1.916
//   29  22.590    31    5.5785     7.29e+1              10.88%                    10/7863 = 0.13%       3.186            1.878
//   31  26.024    37    6.2071     1.40e+2              14.15%                    23/37534 = 0.06%      3.204            1.860
//   37  29.635    41    6.9803     2.78e+2              17.23%                    47/198274 = 0.02%     3.222            1.842
//   41  33.349    43    7.8666     5.62e+2              19.91%                    89/1117909 = 0.01%    3.255            1.835
//   53  44.931    59    10.0190    5.07e+3              24.22%                    n/a                   3.293            1.811
//   97  83.728    101   17.1422    8.03e+6              30.29%                    n/a                   3.361            1.779
//
// SEC 2 — WHAT THE SHARP FUNCTIONS GIVE AT THOSE DEPTHS  [LIMIT-FORM]
//   The ratio the transfer models has numerator and denominator at the same z = q, so its certified bracket is [f2/F2, F2/f2] at sigma(q).
//   x    sigma(q0)   F2        f2        F2/f2 (bracket width on B)   F2 alone (legal side, factor on cap_K)
//   13   2.6390      3.68684   0.00000   no lower bound (f2 = 0)       3.6868
//   17   3.4637      2.28589   0.00000   no lower bound (f2 = 0)       2.2859
//   19   4.1308      1.75570   0.00000   no lower bound (f2 = 0)       1.7557
//   23   4.7088      1.48779   0.40557   3.6684                        1.4878
//   29   5.5785      1.21681   0.79401   1.5325                        1.2168
//   31   6.2071      1.08171   0.91585   1.1811                        1.0817
//   37   6.9803      1.02128   0.97897   1.0432                        1.0213
//   41   7.8666      1.00354   0.99644   1.0071                        1.0035
//   53   10.0190     1.00002   0.99998   1.0000                        1.0000
//   97   17.1422     1.00000   1.00000   1.0000                        1.0000
//   bracket width F2/f2 first below a target, and the least level whose head sigma(q0) reaches it:
//     width < 1.1229: sigma >= 6.422  -> resolve the deep-end correction e^g/2 = 0.8905 (width 1/0.8905); head sigma(q0) first reaches it at level x = 37
//     width < 1.0104: sigma >= 7.688  -> resolve e^g omega(3) - 1 = 0.0052 (mid-curve bump, width 2x that); head sigma(q0) first reaches it at level x = 41
//     width < 1.001: sigma >= 8.746  -> resolve a 0.1% correction; head sigma(q0) first reaches it at level x = 47
//   F2 at the deep end of every scour, sigma = 1: F2(1) = 25.3778; at sigma = 2 (q = W^{1/3}, start of the tail regime): F2(2) = 6.3444
//   SEC 2b — where |B - 1| >= c can occur (u_c = the largest u with |e^g omega(u) - 1| >= c, on the engine's own omega grid), and the sieve functions at the sigma that allows it:
//     c        u_c      sigma < u_c - 1   F2(u_c - 1)   f2(u_c - 1)
//     0.1      2.022    1.022             24.302        0.000
//     0.05     2.171    1.171             18.498        0.000
//     0.02     2.315    1.315             14.682        0.000
//     0.01     2.798    1.798             7.849         0.000
//     0.001    3.586    2.586             3.832         0.000
//     0.00001  4.705    3.705             2.056         0.000
//
// SEC 3 — THE EXACT LADDER AT @23, PER q AND PER K, AGAINST THE MODEL B AND THE BRACKETS
//   N = 5301450, truth = 597475, scour = 1739, Sigma cap2 = 7034588
//   K      floor_true   engine meas   floor_sharp [F2, limit-form]   floor_sharp/N
//   0        -1733138     -1733138         -1733138                 -0.327
//   27           4841         4841         -1733138                 -0.327
//   60         272732       272732         -1733138                 -0.327
//   100        381799       381799         -1733138                 -0.327
//   150        449292       449292         -1733138                 -0.327
//   250        514452       514452         -1733138                 -0.327
//   500        570772       570772         -1733138                 -0.327
//   1000       593943       593943         -1733138                 -0.327
//   1739       596782       596782         -1733138                 -0.327
//   (q, K) pairs at @23 where X V_K F2(sigma(q)) < #A_0 (the trivial bound): 0 of 1512930; least ratio (X V_full F2)/#A_0 over q: 1.475 at q = 31
//   for scale only, NOT a bound (#A_K/(X V_K) exceeds 1 in the tail, table below): F2 replaced by 1 at every q gives 675796 at full depth vs truth 597475
//   per-q, per-K: B_true = (cap_K - s)/((cap2 - s) PROD), B_model = the engine omega-ratio, bracket [f2/F2, F2/f2] at sigma(q), Bonferroni-1 lower bound on B (limit-form)
//   also #A_K/(X V_K): the sifted count against its own sieve main term, which the sharp sieve brackets by [f2, F2]
//   q = 31 (idx 1, T = 7196544, sigma = 4.598, F2 = 1.530, f2 = 0.323, bracket on B [0.211, 4.740], cap2 = 330235, #A_0/(X V_0) = 1.0000)
//      K      y_K   cap_K   B_true    B_model   #A_K/(X V_K)   Bonf-1 lower on B
//      1      29     318450   1.0000    1.0000    1.0000         0.792
//   q = 37 (idx 2, T = 6029537, sigma = 4.324, F2 = 1.652, f2 = 0.065, bracket on B [0.039, 25.347], cap2 = 267736, #A_0/(X V_0) = 0.9999)
//      K      y_K   cap_K   B_true    B_model   #A_K/(X V_K)   Bonf-1 lower on B
//      1      29     258164   1.0000    1.0000    0.9999         -0.308
//      2      31     249561   1.0000    1.0000    0.9999         -1.628
//   q = 41 (idx 3, T = 5441289, sigma = 4.176, F2 = 1.730, f2 = 0.000, bracket on B no lower bound, cap2 = 235097, #A_0/(X V_0) = 1.0000)
//      K      y_K   cap_K   B_true    B_model   #A_K/(X V_K)   Bonf-1 lower on B
//      1      29     226709   1.0000    1.0000    1.0000         n/a
//      2      31     219158   1.0001    1.0000    1.0000         n/a
//      3      37     213075   1.0001    1.0000    1.0000         n/a
//   q = 53 (idx 6, T = 4209299, sigma = 3.842, F2 = 1.947, f2 = 0.000, bracket on B no lower bound, cap2 = 169621, #A_0/(X V_0) = 1.0000)
//      K      y_K   cap_K   B_true    B_model   #A_K/(X V_K)   Bonf-1 lower on B
//      1      29     163554   0.9999    1.0000    0.9999         n/a
//      2      31     158094   0.9999    1.0000    0.9999         n/a
//      5      43     146307   1.0000    1.0000    1.0000         n/a
//      6      47     143124   1.0000    1.0000    1.0000         n/a
//   q = 101 (idx 16, T = 2208840, sigma = 3.165, F2 = 2.656, f2 = 0.000, bracket on B no lower bound, cap2 = 77416, #A_0/(X V_0) = 1.0026)
//      K      y_K   cap_K   B_true    B_model   #A_K/(X V_K)   Bonf-1 lower on B
//      1      29      74677   1.0003    1.0000    1.0030         n/a
//      2      31      72189   1.0004    1.0000    1.0030         n/a
//      5      43      66830   1.0008    1.0000    1.0035         n/a
//      10     67      61013   1.0006    1.0000    1.0033         n/a
//      16     97      56556   1.0002    0.9999    1.0028         n/a
//   q = 211 (idx 37, T = 1057312, sigma = 2.592, F2 = 3.814, f2 = 0.000, bracket on B no lower bound, cap2 = 31624, #A_0/(X V_0) = 0.9909)
//      K      y_K   cap_K   B_true    B_model   #A_K/(X V_K)   Bonf-1 lower on B
//      1      29      30491   0.9999    1.0000    0.9908         n/a
//      2      31      29470   0.9997    1.0000    0.9906         n/a
//      5      43      27281   1.0001    1.0000    0.9910         n/a
//      10     67      24907   1.0000    1.0000    0.9909         n/a
//      27     151     21068   0.9995    0.9995    0.9904         n/a
//      37     199     19913   0.9995    0.9997    0.9904         n/a
//   q = 401 (idx 69, T = 556341, sigma = 2.207, F2 = 5.213, f2 = 0.000, bracket on B no lower bound, cap2 = 14317, #A_0/(X V_0) = 0.9516)
//      K      y_K   cap_K   B_true    B_model   #A_K/(X V_K)   Bonf-1 lower on B
//      1      29      13800   0.9996    1.0000    0.9512         n/a
//      2      31      13353   1.0006    1.0000    0.9521         n/a
//      5      43      12332   0.9986    1.0000    0.9503         n/a
//      10     67      11256   0.9982    1.0000    0.9498         n/a
//      27     151      9508   0.9963    0.9995    0.9481         n/a
//      60     347      8234   0.9948    1.0025    0.9467         n/a
//      69     397      8044   0.9958    1.0036    0.9476         n/a
//   q = 1009 (idx 159, T = 221102, sigma = 1.779, F2 = 8.017, f2 = 0.000, bracket on B no lower bound, cap2 = 5677, #A_0/(X V_0) = 1.0914)
//      K      y_K   cap_K   B_true    B_model   #A_K/(X V_K)   Bonf-1 lower on B
//      1      29       5475   1.0001    1.0000    1.0915         n/a
//      2      31       5282   0.9981    1.0000    1.0893         n/a
//      5      43       4865   0.9935    1.0000    1.0843         n/a
//      10     67       4449   0.9949    1.0000    1.0858         n/a
//      27     151      3764   0.9946    0.9994    1.0855         n/a
//      60     347      3269   0.9960    1.0025    1.0869         n/a
//      100    599      2997   0.9968    1.0072    1.0879         n/a
//      159    997      2776   0.9964    1.0050    1.0874         n/a
//   q = 2003 (idx 294, T = 111379, sigma = 1.529, F2 = 10.862, f2 = 0.000, bracket on B no lower bound, cap2 = 2989, #A_0/(X V_0) = 1.2538)
//      K      y_K   cap_K   B_true    B_model   #A_K/(X V_K)   Bonf-1 lower on B
//      1      29       2890   1.0027    1.0000    1.2572         n/a
//      2      31       2799   1.0046    1.0000    1.2596         n/a
//      5      43       2578   0.9999    1.0000    1.2537         n/a
//      10     67       2347   0.9969    1.0000    1.2499         n/a
//      27     151      1996   1.0018    0.9993    1.2561         n/a
//      60     347      1756   1.0162    1.0024    1.2741         n/a
//      100    599      1605   1.0141    1.0076    1.2714         n/a
//      250    1637     1365   0.9985    0.9951    1.2519         n/a
//      294    1999     1305   0.9780    0.9881    1.2262         n/a
//   q = 4001 (idx 541, T = 55759, sigma = 1.318, F2 = 14.617, f2 = 0.000, bracket on B no lower bound, cap2 = 1502, #A_0/(X V_0) = 1.3711)
//      K      y_K   cap_K   B_true    B_model   #A_K/(X V_K)   Bonf-1 lower on B
//      1      29       1454   1.0039    1.0000    1.3765         n/a
//      2      31       1404   1.0028    1.0000    1.3749         n/a
//      5      43       1302   1.0049    1.0000    1.3778         n/a
//      10     67       1189   1.0049    1.0001    1.3778         n/a
//      27     151      1001   0.9995    0.9993    1.3705         n/a
//      60     347       858   0.9876    1.0019    1.3542         n/a
//      100    599       785   0.9864    1.0080    1.3525         n/a
//      250    1637      665   0.9672    0.9984    1.3262         n/a
//      500    3637      563   0.9044    0.9642    1.2400         n/a
//      541    3989      557   0.9044    0.9586    1.2401         n/a
//   q = 8009 (idx 998, T = 27855, sigma = 1.139, F2 = 19.573, f2 = 0.000, bracket on B no lower bound, cap2 = 589, #A_0/(X V_0) = 1.1662)
//      K      y_K   cap_K   B_true    B_model   #A_K/(X V_K)   Bonf-1 lower on B
//      1      29        565   0.9948    1.0000    1.1601         n/a
//      2      31        544   0.9908    1.0000    1.1555         n/a
//      5      43        500   0.9842    1.0000    1.1477         n/a
//      10     67        456   0.9829    1.0001    1.1463         n/a
//      27     151       387   0.9857    0.9994    1.1495         n/a
//      60     347       338   0.9927    1.0005    1.1576         n/a
//      100    599       320   1.0260    1.0075    1.1965         n/a
//      250    1637      277   1.0283    1.0029    1.1991         n/a
//      500    3637      248   1.0170    0.9739    1.1860         n/a
//      998    7993      216   0.9697    0.9222    1.1308         n/a
//   q = 11003 (idx 1326, T = 20275, sigma = 1.066, F2 = 22.346, f2 = 0.000, bracket on B no lower bound, cap2 = 285, #A_0/(X V_0) = 0.8026)
//      K      y_K   cap_K   B_true    B_model   #A_K/(X V_K)   Bonf-1 lower on B
//      1      29        274   0.9970    1.0000    0.8002         n/a
//      2      31        262   0.9862    1.0000    0.7915         n/a
//      5      43        238   0.9682    1.0000    0.7770         n/a
//      10     67        219   0.9756    1.0001    0.7830         n/a
//      27     151       184   0.9686    0.9995    0.7773         n/a
//      60     347       160   0.9711    0.9999    0.7794         n/a
//      100    599       146   0.9675    1.0065    0.7764         n/a
//      250    1637      120   0.9206    1.0050    0.7388         n/a
//      500    3637      110   0.9323    0.9792    0.7482         n/a
//      1000   8011      102   0.9466    0.9313    0.7597         n/a
//      1326   10993      98   0.9415    0.9055    0.7556         n/a
//
// SEC 4 — THE FINITE LEVEL: DH THEOREM 9.1's REMAINDER 2 SUM_{m|P(z), m<D} 4^nu(m) |r_A(m)|, EXACT, AT @23 AND @29 HEAD PRIMES
//   A = {m <= T : m = a (mod 30)}, two classes a; for m | P(z), r_A(m) = #{m-values in the union of the omega(m) sifting classes mod m} - X omega(m)/m, exact by floor division.
//   The O((log log D)^2/(log D)^{1/6}) term carries an unwritten constant and is NOT added: these are lower bounds on the finite-level cost.
//   @23 q = 31 y_K = 23 D = T: sigma = 4.598, X V = 165118, X V f2 = 53299, X V F2 = 252626; remainder: exact 97080 (max|r| 9.13, 119 moduli), trivial |r|<=omega(m): 1120104; exact/(X V) = 0.59
//   @23 q = 31 y_K = 23 D = q^4.5: sigma = 4.500, X V = 165118, X V f2 = 39674, X V F2 = 259306; remainder: exact 97080 (max|r| 9.13, 119 moduli), trivial |r|<=omega(m): 1120104; exact/(X V) = 0.59
//   @23 q = 31 y_K = 29 D = T: sigma = 4.598, X V = 159221, X V f2 = 51396, X V F2 = 243603; remainder: exact 88215 (max|r| 8.89, 119 moduli), trivial |r|<=omega(m): 1701616; exact/(X V) = 0.55
//   @23 q = 31 y_K = 29 D = q^4.5: sigma = 4.500, X V = 159221, X V f2 = 38257, X V F2 = 250046; remainder: exact 88215 (max|r| 8.89, 119 moduli), trivial |r|<=omega(m): 1701616; exact/(X V) = 0.55
//   @23 q = 37 y_K = 31 D = T: sigma = 4.324, X V = 124794, X V f2 = 8133, X V F2 = 206151; remainder: exact 250017 (max|r| 12.72, 217 moduli), trivial |r|<=omega(m): 4238976; exact/(X V) = 2.00
//   @23 q = 37 y_K = 31 D = q^4.5: sigma = 4.500, X V = 124794, X V f2 = 29986, X V F2 = 195981; remainder: exact 284980 (max|r| 12.72, 222 moduli), trivial |r|<=omega(m): 6401664; exact/(X V) = 2.28
//   @29 q = 31 y_K = 29 D = T: sigma = 5.578, X V = 4617392, X V f2 = 3666277, X V F2 = 5618482; remainder: exact 230050 (max|r| 7.26, 126 moduli), trivial |r|<=omega(m): 5371632; exact/(X V) = 0.05
//   @29 q = 31 y_K = 29 D = q^4.5: sigma = 4.500, X V = 4617392, X V f2 = 1109466, X V F2 = 7251315; remainder: exact 92900 (max|r| 7.26, 119 moduli), trivial |r|<=omega(m): 1701616; exact/(X V) = 0.02
//
// SEC 5 — PART (b) COORDINATES: THE kappa = 1 SIEVE OVER PRIMES AT THE ENGINE'S CROSSING DEPTH (scoped, not attacked)
//   tail regime q^3 > W: m prime, T = W/q runs from W^{2/3} (q = W^{1/3}) down to W^{1/2} (q = sqrt W); sift the partner q m + 2 by one class per freshness prime up to y*.
//   level D = T^theta; s = theta ln T / ln y*. theta = 1/2 is Bombieri-Vinogradov, theta = 1 is Elliott-Halberstam; F1 needs s >= 1, f1 > 0 needs s > 2.
//   x    rho = ln y*/ln T at T = W^{2/3} | at T = sqrt W     s_BV (2/3 | 1/2)     s_EH (2/3 | 1/2)     F1(s_EH) (2/3 | 1/2)   theta for s = 2 at sqrt W
//   29   0.399 | 0.532                        1.252 | 0.939         2.504 | 1.878         1.422 | 1.896         1.065
//   31   0.403 | 0.538                        1.240 | 0.930         2.480 | 1.860         1.436 | 1.915         1.075
//   37   0.407 | 0.543                        1.228 | 0.921         2.456 | 1.842         1.451 | 1.934         1.086
//   41   0.409 | 0.545                        1.223 | 0.917         2.446 | 1.835         1.456 | 1.942         1.090
//   53   0.414 | 0.552                        1.207 | 0.905         2.415 | 1.811         1.475 | 1.967         1.104
//   97   0.422 | 0.562                        1.186 | 0.889         2.372 | 1.779         1.502 | 2.003         1.124
//
// checks passed: 16
// ALL ASSERTIONS PASS
// ============================================================================
// READINGS
// ============================================================================
