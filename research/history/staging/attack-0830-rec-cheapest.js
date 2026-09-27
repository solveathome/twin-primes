#!/usr/bin/env node
'use strict';
// ============================================================================
// attack-0830-rec-cheapest.js — REC(s, u0) at its cheapest legal point,
//   s = 1 + sqrt(e) + eta, u0 = beta_2 - eta, and the pointwise floor of the
//   vector-sieve certificate. Companion to
//   research/history/staging/attack-0830-rec-cheapest.md. STAGING GRADE.
//   Nothing here lowers any exponent.
// ============================================================================
// THE OBJECT (rho-maximal-law.md sec.1; sift-limit-lemmaV.js header). At level
// D = z^s the Brudern-Fouvry vector-sieve certificate is
//     T(x) = sum_{x < r <= x+H} cc(r),
//     cc(r) = lam-(r) lam+(r+2) + lam+(r) lam-(r+2) - lam+(r) lam+(r+2),
// with lam+- the Rosser-Iwaniec linear-sieve weights of level D, and
//     T(x) = H*M + R_H(x)  exactly,   R_H(x) = rho(x) - rho(x+H).
// REC(s,u0): sup_x |R_H(x)| <= z^{u0/2 - eps} rms(R_H) at H = z^{u0}
// (attack-0829n-rml-proof.md sec.3). The consumer is min_x T(x) >= 1.
//
// WHAT IS COMPUTED.
//  S0 THE CHEAPEST POINT. s, u0, the cap-currency ask 2s - u0 = (2(1+sqrt e)
//     - beta_2) + 3 eta, the rms-currency ask u0/2, the exponent bought
//     beta_2 - u0 = eta, and the two thresholds 16s/9 and 2s that S3-S4 bear on.
//  S1 THE ARROW ON THE CITED s = 3.0 DATA, z = 13..47: need = log_z(HM - 1)
//     at H = z^{u0}, ms = log_z sqrt(B H) with the cited B, ask = need - ms,
//     the allowance u0/2, and the truth log_z(2 sup|rho~|) where the exact sup
//     exists (z <= 37; NONE exists at 41..47, only <rho~^2>).
//  S2 OWN EXACT WALKS at s = 1+sqrt(e)+eta, H = floor(z^{u0}), z = 13..29,
//     full period: sup|R_H|, rms(R_H), the ratio against z^{u0/2}, min_x T,
//     and min_r cc(r) (the control for S3).
//  S3 THE POINTWISE FLOOR. Sign facts checked exhaustively over every divisor
//     of P(z) (lam+ >= 0 >= lam- at non-rough n); then Omega(z) = -min_r cc(r)
//     EXACT by enumerating every split (P1, P2) of the primes below z into
//     "divides r", "divides r+2", "neither" (2 may divide both), since cc(r)
//     depends only on (gcd(r,W), gcd(r+2,W)) and every split is realised by
//     CRT. Controls: Omega equals -min cc from the S2 walk; at s = 3.0,
//     Omega - M <= 2 sup|rho~| (cited), because R_1(x) = cc(x+1) - M.
//  S4 LOWER BOUNDS ON Omega AT LARGER z: hill-climb over splits with direct
//     subset sums over the Rosser supports (z = 89..601), then a CERTIFIED
//     sub-family count (exit chains of length 2 and 4 in a parity split,
//     exact prime counting) to z = 5e5, each against H = z^{u0}.
//  S5 FITS. OLS slope of ln Omega on ln z over the exact range and over the
//     hill-climb range, estimator calibrated on a synthetic z^2.5 truth;
//     deficits 16s/9 - log_z Omega and 2s - log_z Omega per z.
//
// CITED CONSTANTS (inputs, not outputs; each carries its source):
//   beta_2 = 4.26645028414864 (dhr-verification.md, Booker-Browning table).
//   sup|rho~| at z = 13..29: rho-maximal-law.md sec.4; at 31, 37:
//     rho-exact-z31-01.md sec.4.1. <rho~^2> at 13..37: same; at 41, 43, 47:
//     attack-rhoms-01.js S1 (143.927, 201.454, 360.902), the 47 row also in
//     rho-exact-z31-01.md sec.4.6.
//   B(z,3.0) at 13..37: attack-beta2-01-lemmaV-meansquare.md item 1; at
//     41, 43, 47: attack-rhoms-01.md sec.0 (1.4963, 1.5057, 1.5135).
//
//   node research/history/staging/attack-0830-rec-cheapest.js   (~8 min)
//   Progress goes to stderr; stdout carries no timing figure.
// ============================================================================
const path = require('path');
const L = require(path.join(__dirname, '..', '..', 'sift-limit-lemmaV.js'));

const BETA2 = 4.26645028414864;
const SE = 1 + Math.sqrt(Math.E);
const ETA = 0.05;
const S_CHEAP = SE + ETA, U0_CHEAP = BETA2 - ETA;
const S3 = 3.0;
const SUP = { 13: 2.62013, 17: 4.33665, 19: 9.15247, 23: 12.10617, 29: 17.90249, 31: 28.122062, 37: 52.219092 };
const RHO2 = { 13: 1.095066, 17: 2.496563, 19: 4.952375, 23: 7.982480, 29: 13.596, 31: 24.738, 37: 85.677, 41: 143.927, 43: 201.454, 47: 360.902 };
const BC = { 13: 1.3833, 17: 1.4214, 19: 1.4348, 23: 1.4503, 29: 1.4660, 31: 1.4764, 37: 1.4883, 41: 1.4963, 43: 1.5057, 47: 1.5135 };

const f = (x, d) => Number(x).toFixed(d);
const e3 = (x) => Number(x).toExponential(3);
const pad = (s, n) => String(s).padStart(n);
const T0 = Date.now(); const el = () => ((Date.now() - T0) / 1000).toFixed(1) + 's';
const prog = (m) => process.stderr.write(`  [${el()}] ${m}\n`);

function primesBelow(n) { const s = new Uint8Array(n), o = []; for (let i = 2; i < n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j < n; j += i) s[j] = 1; } } return o; }
// the pilot's Rosser support, verbatim (sift-limit-lemmaV.js), so custody is exact
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
function buildLam16(Ln, supp) { const A = new Int16Array(Ln); for (const [d, sg] of supp) { for (let n = 0; n < Ln; n += d) A[n] += sg; } return A; }

// --- zeta tables: lam+(P), lam-(P) for every subset P of the primes below z ---
function zetaTables(z, S) {
  const ps = primesBelow(z), k = ps.length, N = 1 << k, D = Math.pow(z, S);
  const sp = rosserSupport(z, D, true), sm = rosserSupport(z, D, false);
  const maskOf = (n) => { let m = 0; for (let i = 0; i < k; i++) if (n % ps[i] === 0) m |= (1 << i); return m; };
  const fp = new Int32Array(N), fm = new Int32Array(N);
  for (const [d, sg] of sp) fp[maskOf(d)] += sg;
  for (const [d, sg] of sm) fm[maskOf(d)] += sg;
  for (let i = 0; i < k; i++) { const b = 1 << i; for (let m = 0; m < N; m++) if (m & b) { fp[m] += fp[m ^ b]; fm[m] += fm[m ^ b]; } }
  let dmax = 0; for (const [d] of sp) if (d > dmax) dmax = d;
  return { ps, k, N, fp, fm, np: sp.length, nm: sm.length, D, dmax };
}
// exact Omega by enumerating every split; returns the maximiser too
function omegaExact(T) {
  const k = T.k, fp = T.fp, fm = T.fm; let best = 0, bm1 = 0, bm2 = 0, bA1 = 0, bB1 = 0, bA2 = 0, bB2 = 0;
  const rec = (i, m1, m2) => {
    if (i === k) { const A1 = fp[m1], B1 = -fm[m1], A2 = fp[m2], B2 = -fm[m2]; const v = A1 * A2 + A1 * B2 + B1 * A2; if (v > best) { best = v; bm1 = m1; bm2 = m2; bA1 = A1; bB1 = B1; bA2 = A2; bB2 = B2; } return; }
    const b = 1 << i;
    if (i === 0) { rec(1, 0, 0); rec(1, b, b); return; }
    rec(i + 1, m1, m2); rec(i + 1, m1 | b, m2); rec(i + 1, m1, m2 | b);
  };
  rec(0, 0, 0);
  return { best, m1: bm1, m2: bm2, A1: bA1, B1: bB1, A2: bA2, B2: bB2 };
}

// --- multi-word masks for the hill-climb at larger z --------------------------
function supportArrays(z, S) {
  const ps = primesBelow(z), k = ps.length, D = Math.pow(z, S), Wd = Math.ceil(k / 32);
  const mk = (list) => { const n = list.length, m = new Uint32Array(n * Wd), sg = new Int8Array(n), dv = new Float64Array(n);
    list.forEach(([d, s], j) => { let x = d; for (let i = 0; i < k; i++) if (x % ps[i] === 0) { m[j * Wd + (i >> 5)] |= (1 << (i & 31)) >>> 0; x /= ps[i]; } sg[j] = s; dv[j] = d; }); return { m, sg, dv, n }; };
  return { ps, k, D, Wd, P: mk(rosserSupport(z, D, true)), Mn: mk(rosserSupport(z, D, false)) };
}
function lamMask(sup, Wd, mask) { let s = 0; const M = sup.m, G = sup.sg; outer: for (let j = 0; j < sup.n; j++) { const o = j * Wd; for (let w = 0; w < Wd; w++) if (((M[o + w] & ~mask[w]) >>> 0) !== 0) continue outer; s += G[j]; } return s; }
function maskOfAssign(a, val, k, Wd) { const m = new Uint32Array(Wd); for (let i = 0; i < k; i++) if (a[i] === val || a[i] === 3) m[i >> 5] |= (1 << (i & 31)) >>> 0; return m; }
function objective(T, a) {
  const m1 = maskOfAssign(a, 1, T.k, T.Wd), m2 = maskOfAssign(a, 2, T.k, T.Wd);
  const A1 = lamMask(T.P, T.Wd, m1), B1 = -lamMask(T.Mn, T.Wd, m1), A2 = lamMask(T.P, T.Wd, m2), B2 = -lamMask(T.Mn, T.Wd, m2);
  return { v: A1 * A2 + A1 * B2 + B1 * A2, A1, B1, A2, B2 };
}
function climb(T, a) {
  let best = objective(T, a).v, cur = a.slice(), improved = true, sweeps = 0;
  while (improved && sweeps < 12) { improved = false; sweeps++;
    for (let i = 0; i < T.k; i++) { const opts = i === 0 ? [0, 3] : [0, 1, 2]; for (const o of opts) { if (o === cur[i]) continue; const s = cur.slice(); s[i] = o; const v = objective(T, s).v; if (v > best) { best = v; cur = s; improved = true; } } } }
  return { best, a: cur };
}
let seed = 12345; const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
function hillSearch(T, restarts) {
  const k = T.k; let best = 0, bestA = null;
  const consider = (a) => { const r = climb(T, a); if (r.best > best) { best = r.best; bestA = r.a; } };
  const step = Math.max(1, Math.floor(k / 12));
  for (let a = 1; a < k; a += step) for (let b = a + 1; b <= k; b += step) for (const flip of [0, 1]) { const s = new Array(k).fill(0); for (let i = a; i < b; i++) s[i] = flip ? 2 : 1; for (let i = b; i < k; i++) s[i] = flip ? 1 : 2; consider(s); }
  for (const off of [0, 1]) { const s = new Array(k).fill(0); for (let i = 1; i < k; i++) s[i] = ((i + off) & 1) ? 1 : 2; consider(s); }
  for (let r = 0; r < restarts; r++) { const s = new Array(k).fill(0); s[0] = rnd() < 0.5 ? 0 : 3; for (let i = 1; i < k; i++) s[i] = Math.floor(rnd() * 3); consider(s); }
  return { best, a: bestA, ...objective(T, bestA) };
}

// --- certified sub-family: exit chains of length 2 and 4 inside a prime set Q ---
// lam+(P1) with P1 = {pstar} u Q, pstar < min Q, counts EXACTLY the d' in D+
// with d' | prod Q, omega(d') even, d' > D/pstar^3 (boundary identity, note
// sec.4). Chains of length 2 and 4 are a sub-family, so this is a lower bound.
function upperIdx(arr, x) { let lo = 0, hi = arr.length; while (lo < hi) { const m = (lo + hi) >> 1; if (arr[m] <= x) lo = m + 1; else hi = m; } return lo; } // # of entries <= x
function countChains(Q, pstar, D) {
  const t = D / (pstar * pstar * pstar), D13 = Math.cbrt(D);
  let c2 = 0, c4 = 0;
  // length 2: p1 > p2, p1^3 <= D, p1 p2 > t
  for (let j = 0; j < Q.length; j++) { const p2 = Q[j]; if (p2 >= D13) break; const lo = Math.max(p2, t / p2), hi = D13; if (hi > lo) c2 += upperIdx(Q, hi) - upperIdx(Q, lo); }
  // length 4: p1 > p2 > p3 > p4, p1^3 <= D, p1 p2 p3^3 <= D, p1 p2 p3 p4 > t
  for (let i4 = 0; i4 < Q.length; i4++) { const p4 = Q[i4];
    for (let i3 = i4 + 1; i3 < Q.length; i3++) { const p3 = Q[i3]; if (p3 * p3 * p3 * p3 * p3 > D) break;
      for (let i2 = i3 + 1; i2 < Q.length; i2++) { const p2 = Q[i2]; if (p2 >= D13) break;
        const hi = Math.min(D13, D / (p2 * p3 * p3 * p3)); if (hi <= p2) break;
        const lo = Math.max(p2, t / (p2 * p3 * p4)); if (hi > lo) c4 += upperIdx(Q, hi) - upperIdx(Q, lo); } } }
  return { c2, c4, tot: c2 + c4 };
}
function certifiedFamily(z, S, ps) {
  const D = Math.pow(z, S), small = ps.filter(p => p <= 47 && p >= 3);
  const cut = 47;
  const Q1 = [], Q2 = []; ps.forEach((p, i) => { if (p > cut) (i & 1 ? Q1 : Q2).push(p); });
  let b1 = { tot: 0 }, p1 = 0, b2 = { tot: 0 }, p2 = 0;
  for (const p of small) { const c = countChains(Q1, p, D); if (c.tot > b1.tot) { b1 = c; p1 = p; } }
  for (const p of small) { if (p === p1) continue; const c = countChains(Q2, p, D); if (c.tot > b2.tot) { b2 = c; p2 = p; } }
  return { A1: b1.tot, c2a: b1.c2, c4a: b1.c4, p1, A2: b2.tot, c2b: b2.c2, c4b: b2.c4, p2, prod: b1.tot * b2.tot, Q1, Q2 };
}

const ols = (xs, ys) => { const n = xs.length, mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n; let sxx = 0, sxy = 0; for (let i = 0; i < n; i++) { sxx += (xs[i] - mx) ** 2; sxy += (xs[i] - mx) * (ys[i] - my); } const b = sxy / sxx, a = my - b * mx; let rss = 0; for (let i = 0; i < n; i++) rss += (ys[i] - a - b * xs[i]) ** 2; return { b, se: n > 2 ? Math.sqrt(rss / (n - 2) / sxx) : NaN }; };

function main() {
  console.log('attack-0830-rec-cheapest.js');
  console.log('');
  console.log('S0 THE CHEAPEST LEGAL POINT — s = 1+sqrt(e)+eta, u0 = beta_2 - eta');
  console.log(`  1+sqrt(e) = ${f(SE, 12)}   2(1+sqrt(e)) = ${f(2 * SE, 12)}   beta_2 = ${f(BETA2, 14)}   2(1+sqrt(e)) - beta_2 = ${f(2 * SE - BETA2, 6)}`);
  console.log('  eta      s        u0       cap-ask 2s-u0   rms-ask u0/2   bought = eta   16s/9     2s');
  for (const eta of [0, 0.01, 0.05, 0.1, 0.2, 0.35]) { const s = SE + eta, u = BETA2 - eta; console.log(`  ${f(eta, 2)}   ${f(s, 4)}   ${f(u, 4)}   ${f(2 * s - u, 4)}          ${f(u / 2, 4)}         ${f(BETA2 - u, 2)}         ${f(16 * s / 9, 4)}   ${f(2 * s, 4)}`); }
  console.log(`  working point below: eta = ${ETA}, s = ${f(S_CHEAP, 6)}, u0 = ${f(U0_CHEAP, 6)}, cap-ask = ${f(2 * S_CHEAP - U0_CHEAP, 6)}, rms-ask = ${f(U0_CHEAP / 2, 6)}`);
  console.log(`  legality of the point: u0 - 2 = ${f(U0_CHEAP - 2, 4)} > 0 (fixed, never sent to 2); 16s/9 - beta_2 = ${f(16 * S_CHEAP / 9 - BETA2, 4)}, 16(1+sqrt e)/9 - beta_2 = ${f(16 * SE / 9 - BETA2, 4)}`);
  console.log('');

  // ---------------- S1: cited s = 3.0 data ----------------
  console.log('S1 THE ARROW AT (s = 3.0, u0 = beta_2 - eta) ON THE CITED EXACT DATA — exponents base z; H > W rows flagged');
  console.log('  need = log_z(HM-1); ms = log_z sqrt(B_cited H); ask = need - ms; allow = u0/2; truth = log_z(2 sup|rho~|) (none at 41..47); F = (HM-1)/(2 sup|rho~|)');
  console.log('   z      n        M      M ln^2 z   H>W?   need     ms      ask    allow   truth   log_z F     F');
  const ZS1 = [13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
  for (const z of ZS1) {
    prog(`S1 z=${z}`);
    const t = L.buildTerms(z, Math.pow(z, S3)); let lnW = 0; for (const p of primesBelow(z)) lnW += Math.log(p);
    const lnz = Math.log(z), H = Math.pow(z, U0_CHEAP), HM1 = H * t.M - 1;
    const need = Math.log(HM1) / lnz, ms = 0.5 * Math.log(BC[z] * H) / lnz;
    const tr = SUP[z] ? f(Math.log(2 * SUP[z]) / lnz, 4) : '  --  ';
    const F = SUP[z] ? HM1 / (2 * SUP[z]) : null;
    console.log(`  ${pad(z, 2)}  ${pad(t.n, 7)}  ${f(t.M, 6)}  ${f(t.M * lnz * lnz, 4)}    ${Math.log(H) > lnW ? 'yes' : ' no'}   ${f(need, 4)}  ${f(ms, 4)}  ${f(need - ms, 4)}  ${f(U0_CHEAP / 2, 4)}  ${tr}   ${F ? f(Math.log(F) / lnz, 4) : '  --  '}   ${F ? e3(F) : '  --'}`);
  }
  console.log('');

  // ---------------- S2: own exact walks at the cheapest s ----------------
  console.log(`S2 OWN EXACT WALKS at s = ${f(S_CHEAP, 6)}, H = floor(z^${f(U0_CHEAP, 6)}), full period W = P(z)`);
  console.log('   z     H         W          H>W?    n       M       M ln^2 z    HM         minT    maxT    sup|R_H|   rms(R_H)   sup/rms   log_z(sup/rms)   allow   log_z F    min cc');
  const walkMinCC = {};
  for (const z of [13, 17, 19, 23, 29]) {
    prog(`S2 walk z=${z}`);
    const H = Math.floor(Math.pow(z, U0_CHEAP)), D = Math.pow(z, S_CHEAP);
    let W = 1; for (const p of primesBelow(z)) W *= p;
    const Ln = W + H + 10;
    const Lp = buildLam16(Ln, rosserSupport(z, D, true)), Lm = buildLam16(Ln, rosserSupport(z, D, false));
    const t = L.buildTerms(z, D), HM = H * t.M;
    const cc = (r) => Lm[r] * Lp[r + 2] + Lp[r] * Lm[r + 2] - Lp[r] * Lp[r + 2];
    let T = 0; for (let r = 1; r <= H; r++) T += cc(r);
    let s2 = 0, sup = 0, minT = T, maxT = T;
    for (let x = 0; x < W; x++) { if (x > 0) T += cc(x + H) - cc(x); const R = T - HM; s2 += R * R; if (Math.abs(R) > sup) sup = Math.abs(R); if (T < minT) minT = T; if (T > maxT) maxT = T; }
    let mc = 0; for (let r = 0; r < W; r++) { const c = cc(r); if (c < mc) mc = c; }
    walkMinCC[z] = mc;
    const rms = Math.sqrt(s2 / W), lnz = Math.log(z), F = (HM - 1) / sup;
    console.log(`  ${pad(z, 2)}  ${pad(H, 8)}  ${pad(W, 10)}   ${H > W ? 'yes' : ' no'}   ${pad(t.n, 6)}  ${f(t.M, 6)}   ${f(t.M * lnz * lnz, 4)}    ${pad(f(HM, 1), 9)}  ${pad(minT, 6)}  ${pad(maxT, 6)}   ${pad(f(sup, 3), 8)}   ${f(rms, 4)}     ${f(sup / rms, 3)}      ${f(Math.log(sup / rms) / lnz, 4)}         ${f(U0_CHEAP / 2, 4)}  ${f(Math.log(F) / lnz, 4)}    ${pad(mc, 4)}`);
  }
  console.log('');

  // ---------------- S3: the pointwise floor, exact ----------------
  console.log('S3 THE POINTWISE FLOOR Omega(z) = -min_r cc(r), EXACT over every split (P1 | r, P2 | r+2, rest neither; 2 may divide both)');
  console.log('  sign facts: lam+(n) >= 0 and lam-(n) <= 0 checked at EVERY non-rough divisor n of P(z) (viol = number of violations)');
  const exactRows = [];
  for (const [S, zs, label] of [[S_CHEAP, [13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73], 'cheapest'], [S3, [13, 17, 19, 23, 29, 31, 37, 41, 43, 47], 's = 3.0']]) {
    console.log(`  s = ${f(S, 6)} (${label})`);
    console.log('   z    k   |D+|   |D-|    viol   lam+(P(z))   max d/D    Omega    log_z Omega   A1    B1    A2    B2   |P1|  |P2|  p*1  p*2     HM(u0)      Omega/HM   walk min cc   2 sup|rho~| - M (cited, s=3 only)');
    for (const z of zs) {
      prog(`S3 s=${label} z=${z}`);
      const T = zetaTables(z, S);
      let viol = 0; for (let m = 1; m < T.N; m++) { if (T.fp[m] < 0) viol++; if (T.fm[m] > 0) viol++; }
      const r = omegaExact(T);
      const t = L.buildTerms(z, Math.pow(z, S)); const HM = Math.pow(z, U0_CHEAP) * t.M;
      const P1 = T.ps.filter((p, i) => r.m1 >> i & 1), P2 = T.ps.filter((p, i) => r.m2 >> i & 1);
      const lnz = Math.log(z);
      const ctrl = (S === S_CHEAP && walkMinCC[z] !== undefined) ? `${walkMinCC[z]} ${-walkMinCC[z] === r.best ? 'MATCH' : 'MISMATCH'}` : '--';
      const supc = (S === S3 && SUP[z]) ? `${f(2 * SUP[z] - t.M, 3)} ${r.best - t.M <= 2 * SUP[z] ? 'ok' : 'VIOLATED'}` : '--';
      exactRows.push({ S, z, best: r.best });
      console.log(`  ${pad(z, 2)}  ${pad(T.k, 3)}  ${pad(T.np, 5)}  ${pad(T.nm, 5)}   ${pad(viol, 4)}     ${pad(T.fp[T.N - 1], 4)}       ${f(T.dmax / T.D, 4)}   ${pad(r.best, 6)}    ${f(Math.log(r.best) / lnz, 4)}     ${pad(r.A1, 3)}   ${pad(r.B1, 3)}   ${pad(r.A2, 3)}   ${pad(r.B2, 3)}    ${pad(P1.length, 2)}    ${pad(P2.length, 2)}   ${pad(P1[0] || '-', 2)}   ${pad(P2[0] || '-', 2)}   ${e3(HM)}   ${e3(r.best / HM)}   ${pad(ctrl, 10)}   ${supc}`);
    }
  }
  console.log('');

  // ---------------- S4: lower bounds at larger z ----------------
  console.log(`S4a HILL-CLIMB LOWER BOUNDS on Omega at s = ${f(S_CHEAP, 6)} (direct subset sums over the supports; a lower bound, not the max)`);
  console.log('   z     k    |D+|    |D-|   lam+(P(z))  max d/D   Omega >=      log_z    A1     B1     A2     B2   |P1|  |P2|  p*1  p*2    z^{u0}       Omega/z^{u0}   local slope');
  const hillRows = []; let prevZ = null, prevV = null; let T601 = null;
  for (const z of [89, 101, 127, 151, 181, 211, 251, 307, 353, 401, 449, 503, 601]) {
    prog(`S4a z=${z}`);
    const T = supportArrays(z, S_CHEAP);
    const full = new Array(T.k).fill(1); full[0] = 3; const lamP = lamMask(T.P, T.Wd, maskOfAssign(full, 1, T.k, T.Wd));
    let dmax = 0; for (let j = 0; j < T.P.n; j++) if (T.P.dv[j] > dmax) dmax = T.P.dv[j];
    const r = hillSearch(T, T.k <= 30 ? 10 : 4);
    const P1 = T.ps.filter((p, i) => r.a[i] === 1 || r.a[i] === 3), P2 = T.ps.filter((p, i) => r.a[i] === 2 || r.a[i] === 3);
    const lnz = Math.log(z), Hc = Math.pow(z, U0_CHEAP);
    const slope = prevZ ? f(Math.log(r.best / prevV) / Math.log(z / prevZ), 3) : '  -- ';
    hillRows.push({ z, best: r.best }); prevZ = z; prevV = r.best; if (z === 601) T601 = T;
    console.log(`  ${pad(z, 3)}  ${pad(T.k, 3)}  ${pad(T.P.n, 6)}  ${pad(T.Mn.n, 6)}    ${pad(lamP, 4)}       ${f(dmax / T.D, 4)}   ${e3(r.best)}   ${f(Math.log(r.best) / lnz, 4)}   ${pad(r.A1, 4)}   ${pad(r.B1, 4)}   ${pad(r.A2, 4)}   ${pad(r.B2, 4)}   ${pad(P1.length, 3)}   ${pad(P2.length, 3)}   ${pad(P1[0], 3)}  ${pad(P2[0], 3)}   ${e3(Hc)}    ${e3(r.best / Hc)}      ${slope}`);
  }
  console.log('');
  console.log(`S4b CERTIFIED SUB-FAMILY at s = ${f(S_CHEAP, 6)}: exit chains of length 2 and 4 inside a parity split of the primes above 47, best p* <= 47 per side; exact prime counting, a lower bound on Omega`);
  console.log('  control at z = 601: the family count for P1 = {p*1} u Q1 must not exceed the exact lam+(P1) from the support (all even chains)');
  {
    const ps = primesBelow(601); const c = certifiedFamily(601, S_CHEAP, ps);
    const a = new Array(T601.k).fill(0); T601.ps.forEach((p, i) => { if (c.Q1.includes(p) || p === c.p1) a[i] = 1; });
    const exact = lamMask(T601.P, T601.Wd, maskOfAssign(a, 1, T601.k, T601.Wd));
    console.log(`    z = 601: family A1 = ${c.A1} (2-chains ${c.c2a}, 4-chains ${c.c4a}, p*1 = ${c.p1})   exact lam+(P1) = ${exact}   ${c.A1 <= exact ? 'family <= exact, ok' : 'FAMILY EXCEEDS EXACT'}`);
  }
  console.log('   z        D            p*1   A1 (2ch, 4ch)              p*2   A2 (2ch, 4ch)              Omega >= A1 A2    log_z     z^{u0}       ratio        16s/9 - log_z   z^{16s/9}/ln^8 z');
  for (const z of [601, 1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000]) {
    prog(`S4b z=${z}`);
    const ps = primesBelow(z); const c = certifiedFamily(z, S_CHEAP, ps);
    const lnz = Math.log(z), Hc = Math.pow(z, U0_CHEAP), model = Math.pow(z, 16 * S_CHEAP / 9) / Math.pow(lnz, 8);
    const lg = c.prod > 0 ? f(Math.log(c.prod) / lnz, 4) : '  --  ';
    console.log(`  ${pad(z, 6)}   ${e3(Math.pow(z, S_CHEAP))}   ${pad(c.p1, 3)}   ${pad(c.A1, 8)} (${pad(c.c2a, 7)}, ${pad(c.c4a, 7)})   ${pad(c.p2, 3)}   ${pad(c.A2, 8)} (${pad(c.c2b, 7)}, ${pad(c.c4b, 7)})   ${e3(c.prod)}       ${lg}   ${e3(Hc)}   ${e3(c.prod / Hc)}    ${c.prod > 0 ? f(16 * S_CHEAP / 9 - Math.log(c.prod) / lnz, 4) : '  --  '}         ${e3(model)}`);
  }
  console.log('');

  // ---------------- S5: fits ----------------
  console.log('S5 FITS — OLS slope of ln Omega on ln z; deficits against 16s/9 and 2s');
  const cal = ols([13, 29, 47, 73].map(Math.log), [13, 29, 47, 73].map(z => 2.5 * Math.log(z) + 0.7));
  console.log(`  estimator control: synthetic z^2.5 truth returns slope ${f(cal.b, 6)} (se ${e3(cal.se)})`);
  const ex = exactRows.filter(r => r.S === S_CHEAP && r.z >= 29);
  const fe = ols(ex.map(r => Math.log(r.z)), ex.map(r => Math.log(r.best)));
  console.log(`  exact Omega, s cheapest, z = 29..73 (${ex.length} points): slope ${f(fe.b, 4)} +/- ${f(fe.se, 4)}`);
  const fh = ols(hillRows.map(r => Math.log(r.z)), hillRows.map(r => Math.log(r.best)));
  console.log(`  hill-climb lower bounds, z = 89..601 (${hillRows.length} points): slope ${f(fh.b, 4)} +/- ${f(fh.se, 4)}   (lower bounds of unequal quality: a slope on them is indicative only)`);
  const hh = hillRows.filter(r => r.z >= 251);
  const fh2 = ols(hh.map(r => Math.log(r.z)), hh.map(r => Math.log(r.best)));
  console.log(`  hill-climb lower bounds, z = 251..601 (${hh.length} points): slope ${f(fh2.b, 4)} +/- ${f(fh2.se, 4)}`);
  const e3s = exactRows.filter(r => r.S === S3 && r.z >= 29);
  const f3 = ols(e3s.map(r => Math.log(r.z)), e3s.map(r => Math.log(r.best)));
  console.log(`  exact Omega, s = 3.0, z = 29..47 (${e3s.length} points): slope ${f(f3.b, 4)} +/- ${f(f3.se, 4)}   (cited sup|rho~| slope on 13..37: 2.766 +/- 0.212, attack-0829n-rml-proof.md S5)`);
  console.log(`  thresholds at s cheapest: 16s/9 = ${f(16 * S_CHEAP / 9, 4)}, 2s = ${f(2 * S_CHEAP, 4)}, u0 = ${f(U0_CHEAP, 4)}; at s = 3.0: 16s/9 = ${f(16 / 3, 4)}, 2s = 6`);
  console.log('   z (cheapest)   log_z Omega   16s/9 - log_z   2s - log_z');
  for (const r of [...exactRows.filter(r => r.S === S_CHEAP && [29, 47, 73].includes(r.z)), ...hillRows.filter(r => [151, 307, 601].includes(r.z))]) { const lg = Math.log(r.best) / Math.log(r.z); console.log(`  ${pad(r.z, 5)}           ${f(lg, 4)}        ${f(16 * S_CHEAP / 9 - lg, 4)}          ${f(2 * S_CHEAP - lg, 4)}`); }
  console.log('');
  console.log('DONE');
}
main();

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/attack-0830-rec-cheapest.js
//   invocation:  node research/history/staging/attack-0830-rec-cheapest.js
//   code-sha256: 7a6d9016bbad46cb12bf43d49faab1dc1f501094b308e13b31e0b5168503d68f
//   out-sha256:  daf783d1e221279340e4e41e18debabae4f4f116740eccee9e411ce589cfb3bb
//   body-lines:  116
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     555.9 s
// ============================================================================
// attack-0830-rec-cheapest.js
//
// S0 THE CHEAPEST LEGAL POINT — s = 1+sqrt(e)+eta, u0 = beta_2 - eta
//   1+sqrt(e) = 2.648721270700   2(1+sqrt(e)) = 5.297442541400   beta_2 = 4.26645028414864   2(1+sqrt(e)) - beta_2 = 1.030992
//   eta      s        u0       cap-ask 2s-u0   rms-ask u0/2   bought = eta   16s/9     2s
//   0.00   2.6487   4.2665   1.0310          2.1332         0.00         4.7088   5.2974
//   0.01   2.6587   4.2565   1.0610          2.1282         0.01         4.7266   5.3174
//   0.05   2.6987   4.2165   1.1810          2.1082         0.05         4.7977   5.3974
//   0.10   2.7487   4.1665   1.3310          2.0832         0.10         4.8866   5.4974
//   0.20   2.8487   4.0665   1.6310          2.0332         0.20         5.0644   5.6974
//   0.35   2.9987   3.9165   2.0810          1.9582         0.35         5.3311   5.9974
//   working point below: eta = 0.05, s = 2.698721, u0 = 4.216450, cap-ask = 1.180992, rms-ask = 2.108225
//   legality of the point: u0 - 2 = 2.2165 > 0 (fixed, never sent to 2); 16s/9 - beta_2 = 0.5313, 16(1+sqrt e)/9 - beta_2 = 0.4424
//
// S1 THE ARROW AT (s = 3.0, u0 = beta_2 - eta) ON THE CITED EXACT DATA — exponents base z; H > W rows flagged
//   need = log_z(HM-1); ms = log_z sqrt(B_cited H); ask = need - ms; allow = u0/2; truth = log_z(2 sup|rho~|) (none at 41..47); F = (HM-1)/(2 sup|rho~|)
//    z      n        M      M ln^2 z   H>W?   need     ms      ask    allow   truth   log_z F     F
//   13      852  0.055844  0.3674    yes   3.0915  2.1715  0.9200  2.1082  0.6458   2.4457   5.301e+2
//   17     2236  0.046986  0.3772    yes   3.1371  2.1703  0.9668  2.1082  0.7625   2.3746   8.353e+2
//   19     4764  0.039598  0.3433     no   3.1198  2.1695  0.9502  2.1082  0.9873   2.1324   5.332e+2
//   23     9636  0.034169  0.3359     no   3.1396  2.1675  0.9721  2.1082  1.0164   2.1232   7.785e+2
//   29    20700  0.031843  0.3611     no   3.1928  2.1650  1.0278  2.1082  1.0626   2.1302   1.304e+3
//   31    35868  0.029253  0.3450     no   3.1880  2.1650  1.0230  2.1082  1.1735   2.0145   1.010e+3
//   37    76484  0.028057  0.3658     no   3.2268  2.1633  1.0635  2.1082  1.2874   1.9394   1.100e+3
//   41   125884  0.026239  0.3619     no   3.2361  2.1625  1.0736  2.1082    --       --       --
//   43   183084  0.024441  0.3458     no   3.2297  2.1626  1.0670  2.1082    --       --       --
//   47   293980  0.023166  0.3434     no   3.2386  2.1620  1.0765  2.1082    --       --       --
//
// S2 OWN EXACT WALKS at s = 2.698721, H = floor(z^4.216450), full period W = P(z)
//    z     H         W          H>W?    n       M       M ln^2 z    HM         minT    maxT    sup|R_H|   rms(R_H)   sup/rms   log_z(sup/rms)   allow   log_z F    min cc
//   13     49760        2310   yes      420  0.050649   0.3332       2520.3    2517    2523      3.312   1.0567     3.134      0.4453         2.1082  2.5865      -1
//   17    154215       30030   yes     1116  0.043790   0.3515       6753.0    6748    6759      5.996   1.9121     3.136      0.4034         2.1082  2.4801      -2
//   19    246490      510510    no     2332  0.035351   0.3065       8713.6    8704    8722      9.649   2.4586     3.925      0.4644         2.1082  2.3114      -3
//   23    551642     9699690    no     3100  0.030700   0.3018      16935.7   16922   16950     14.334   3.1119     4.606      0.4871         2.1082  2.2563      -6
//   29   1465981   223092870    no    10524  0.028248   0.3203      41411.0   41384   41439     27.971   5.8294     4.798      0.4657         2.1082  2.1679     -10
//
// S3 THE POINTWISE FLOOR Omega(z) = -min_r cc(r), EXACT over every split (P1 | r, P2 | r+2, rest neither; 2 may divide both)
//   sign facts: lam+(n) >= 0 and lam-(n) <= 0 checked at EVERY non-rough divisor n of P(z) (viol = number of violations)
//   s = 2.698721 (cheapest)
//    z    k   |D+|   |D-|    viol   lam+(P(z))   max d/D    Omega    log_z Omega   A1    B1    A2    B2   |P1|  |P2|  p*1  p*2     HM(u0)      Omega/HM   walk min cc   2 sup|rho~| - M (cited, s=3 only)
//   13    5     16     20      0        0       0.2070        1    0.0000       0     1     1    -1     2     0    7    -   2.520e+3   3.968e-4     -1 MATCH   --
//   17    6     28     32      0        0       0.2208        2    0.2447       0     2     1    -1     3     0    7    -   6.753e+3   2.962e-4     -2 MATCH   --
//   19    7     42     40      0        0       0.1933        3    0.3731       1     3     1    -1     4     0    7    -   8.714e+3   3.443e-4     -3 MATCH   --
//   23    8     44     60      0        0       0.1814        6    0.5714       3     0     1     1     4     2    5   17   1.694e+4   3.543e-4     -6 MATCH   --
//   29    9     88     86      0        0       0.2192       10    0.6838      10     0     1     0     6     1    5   23   4.141e+4   2.415e-4    -10 MATCH   --
//   31   10     92    102      0        0       0.2182       18    0.8417       9     0     1     1     6     2    5   23   4.840e+4   3.719e-4           --   --
//   37   11    132    120      0        0       0.2338       22    0.8560      11     0     1     1     7     2    5   29   9.345e+4   2.354e-4           --   --
//   41   12    140    148      0        0       0.2145       30    0.9159      10     0     1     2     6     3    7   29   1.333e+5   2.251e-4           --   --
//   43   13    180    180      0        0       0.2379       45    1.0121      15     0     1     2     7     3    7   31   1.497e+5   3.007e-4           --   --
//   47   14    236    210      0        0       0.2332       63    1.0761      21     0     1     2     8     3    7   37   2.057e+5   3.063e-4           --   --
//   53   15    252    282      0        0       0.2273       86    1.1219      21     2     1     3     8     4    7   37   3.358e+5   2.561e-4           --   --
//   59   16    322    344      0        0       0.2181      111    1.1550      27     3     1     3     9     4    7   41   5.094e+5   2.179e-4           --   --
//   61   17    336    390      0        0       0.2248      134    1.1914      26     4     1     4     9     5    7   41   5.520e+5   2.428e-4           --   --
//   67   18    490    466      0        0       0.2361      168    1.2186       0     6    28     2     8     9    3   13   8.036e+5   2.091e-4           --   --
//   71   19    516    546      0        0       0.2358      205    1.2487      39    10     1     4    11     5    7   47   9.872e+5   2.077e-4           --   --
//   73   20    598    590      0        0       0.2390      251    1.2878      48    11     1     4    12     5    7   53   1.052e+6   2.386e-4           --   --
//   s = 3.000000 (s = 3.0)
//    z    k   |D+|   |D-|    viol   lam+(P(z))   max d/D    Omega    log_z Omega   A1    B1    A2    B2   |P1|  |P2|  p*1  p*2     HM(u0)      Omega/HM   walk min cc   2 sup|rho~| - M (cited, s=3 only)
//   13    5     28     24      0        0       0.2103        1    0.0000       0     1     1    -1     2     0    7    -   2.779e+3   3.599e-4           --   5.184 ok
//   17    6     44     44      0        0       0.1746        2    0.2447       0     2     1    -1     5     0    3    -   7.246e+3   2.760e-4           --   8.626 ok
//   19    7     64     58      0        0       0.1933        3    0.3731       0     3     1    -1     6     0    3    -   9.760e+3   3.074e-4           --   18.265 ok
//   23    8     96     74      0        0       0.2244        3    0.3504       3     3     1    -1     4     0   11    -   1.885e+4   1.592e-4           --   24.178 ok
//   29    9    144    114      0        0       0.2300        3    0.3263       3     3     1    -1     4     0   13    -   4.668e+4   6.427e-5           --   35.773 ok
//   31   10    188    144      0        0       0.2226        9    0.6398       3     0     1     2     4     3    7   19   5.681e+4   1.584e-4           --   56.215 ok
//   37   11    270    236      0        0       0.2387       21    0.8431       3     0     5     2     4     5    5    7   1.149e+5   1.828e-4           --   104.410 ok
//   41   12    344    294      0        0       0.2398       36    0.9650       5     2     3     3     5     4    7   17   1.656e+5   2.173e-4           --   --
//   43   13    420    328      0        0       0.2373       63    1.1015       9     3     3     3     6     4    7   17   1.886e+5   3.340e-4           --   --
//   47   14    526    418      0        0       0.2361      100    1.1961       0    10    10     5     6     6    5   23   2.601e+5   3.844e-4           --   --
//
// S4a HILL-CLIMB LOWER BOUNDS on Omega at s = 2.698721 (direct subset sums over the supports; a lower bound, not the max)
//    z     k    |D+|    |D-|   lam+(P(z))  max d/D   Omega >=      log_z    A1     B1     A2     B2   |P1|  |P2|  p*1  p*2    z^{u0}       Omega/z^{u0}   local slope
//    89   23     818     900       0       0.2397   6.840e+2   1.4543      0     19     36      4    11    10     5   17   1.658e+8    4.126e-6        --
//   101   25    1140    1154       0       0.2364   1.155e+3   1.5280      0     21     55      3    11    12     5   17   2.826e+8    4.088e-6      4.142
//   127   30    1858    1898       0       0.2372   2.888e+3   1.6449      1     36     78      2    14    14     5   19   7.423e+8    3.891e-6      4.001
//   151   35    2758    2908       0       0.2394   9.585e+3   1.8273      5     86    105      6    17    16     5   23   1.540e+9    6.224e-6      6.931
//   181   41    4278    4350       0       0.2373   2.259e+4   1.9285      5    127    171      4    19    20     5   23   3.307e+9    6.832e-6      4.731
//   211   46    5722    5952       0       0.2222   3.431e+4   1.9513     12    168    190      9    23    21     5   29   6.313e+9    5.435e-6      2.724
//   251   53    8496    8812       0       0.2308   6.499e+4   2.0056     12    223    276     11    26    25     5   29   1.313e+10    4.952e-6      3.680
//   307   62   13332   13818       0       0.2389   1.124e+5   2.0307     78    401    231     22    36    23     7   59   3.068e+10    3.662e-6      2.718
//   353   70   19050   19370       0       0.2396   2.304e+5   2.1048    143    613    300     25    41    26     7   53   5.528e+10    4.167e-6      5.142
//   401   78   24742   26300       0       0.2385   3.824e+5   2.1445     31    609    595     53    39    36     7   37   9.463e+10    4.041e-6      3.976
//   449   86   33756   34170       0       0.2384   6.565e+5   2.1933    310    914    528     33    49    34     7   71   1.524e+11    4.307e-6      4.779
//   503   95   43540   44850       0       0.2400   1.001e+6   2.2210    474   1180    595     35    56    36     7   71   2.461e+11    4.067e-6      3.712
//   601  109   66626   68562       0       0.2400   2.108e+6   2.2757    812   1718    820     41    64    42     7   89   5.212e+11    4.044e-6      4.185
//
// S4b CERTIFIED SUB-FAMILY at s = 2.698721: exit chains of length 2 and 4 inside a parity split of the primes above 47, best p* <= 47 per side; exact prime counting, a lower bound on Omega
//   control at z = 601: the family count for P1 = {p*1} u Q1 must not exceed the exact lam+(P1) from the support (all even chains)
//     z = 601: family A1 = 300 (2-chains 300, 4-chains 0, p*1 = 23)   exact lam+(P1) = 300   family <= exact, ok
//    z        D            p*1   A1 (2ch, 4ch)              p*2   A2 (2ch, 4ch)              Omega >= A1 A2    log_z     z^{u0}       ratio        16s/9 - log_z   z^{16s/9}/ln^8 z
//      601   3.158e+7    23        300 (    300,       0)    29        300 (    300,       0)   9.000e+4       1.7828   5.212e+11   1.727e-7    3.0149         7.649e+6
//     1000   1.248e+8    37        780 (    780,       0)    41        780 (    780,       0)   6.084e+5       1.9281   4.460e+12   1.364e-7    2.8697         4.770e+7
//     2000   8.101e+8    47       2536 (   2536,       0)    43       2456 (   2456,       0)   6.228e+6       2.0583   8.291e+13   7.512e-8    2.7395         6.173e+8
//     5000   9.605e+9    47      11017 (  10473,     544)    43      10500 (  10182,     318)   1.157e+8       2.1799   3.949e+15   2.929e-8    2.6179         2.015e+10
//    10000   6.236e+10    47      41668 (  28636,   13032)    43      36374 (  26969,    9405)   1.516e+9       2.2951   7.342e+16   2.064e-8    2.5026         2.997e+11
//    20000   4.048e+11    47     228508 (  72772,  155736)    43     190436 (  66742,  123694)   4.352e+10       2.4735   1.365e+18   3.188e-8    2.3242         4.665e+12
//    50000   4.800e+12    47    2713375 ( 223343, 2490032)    43    2306291 ( 185950, 2120341)   6.258e+12       2.7232   6.501e+19   9.626e-8    2.0745         1.865e+14
//   100000   3.116e+13    47   16969634 ( 408073, 16561561)    43   14892829 ( 284783, 14608046)   2.527e+14       2.8805   1.209e+21   2.091e-7    1.9172         3.156e+15
//   200000   2.023e+14    47   100547603 ( 416879, 100130724)    43   90685180 ( 139870, 90545310)   9.118e+15       3.0107   2.247e+22   4.059e-7    1.7870         5.499e+16
//   500000   2.398e+15    47   979017225 (      0, 979017225)    43   905294776 (      0, 905294776)   8.863e+17       3.1493   1.070e+24   8.282e-7    1.6485         2.500e+18
//
// S5 FITS — OLS slope of ln Omega on ln z; deficits against 16s/9 and 2s
//   estimator control: synthetic z^2.5 truth returns slope 2.500000 (se 4.907e-16)
//   exact Omega, s cheapest, z = 29..73 (12 points): slope 3.2825 +/- 0.1205
//   hill-climb lower bounds, z = 89..601 (13 points): slope 4.1394 +/- 0.0898   (lower bounds of unequal quality: a slope on them is indicative only)
//   hill-climb lower bounds, z = 251..601 (7 points): slope 4.1033 +/- 0.1272
//   exact Omega, s = 3.0, z = 29..47 (6 points): slope 6.7327 +/- 0.5818   (cited sup|rho~| slope on 13..37: 2.766 +/- 0.212, attack-0829n-rml-proof.md S5)
//   thresholds at s cheapest: 16s/9 = 4.7977, 2s = 5.3974, u0 = 4.2165; at s = 3.0: 16s/9 = 5.3333, 2s = 6
//    z (cheapest)   log_z Omega   16s/9 - log_z   2s - log_z
//      29           0.6838        4.1139          4.7136
//      47           1.0761        3.7216          4.3213
//      73           1.2878        3.5099          4.1096
//     151           1.8273        2.9705          3.5702
//     307           2.0307        2.7670          3.3667
//     601           2.2757        2.5220          3.1218
//
// DONE
// ============================================================================
// READINGS
// ============================================================================
// (written in attack-0830-rec-cheapest.md sec.7 after the embed; the script
//  carries none of its own so that no figure can precede its run)
