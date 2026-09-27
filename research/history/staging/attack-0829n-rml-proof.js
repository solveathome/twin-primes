#!/usr/bin/env node
'use strict';
// ============================================================================
// attack-0829n-rml-proof.js — the chain from Lemma V's PROVEN mean square to
//   an exponent below beta_2, priced at numbers; the one open arrow located.
//   Companion to research/history/staging/attack-0829n-rml-proof.md.
//   STAGING GRADE. Not a route: nothing here lowers any exponent.
// ============================================================================
// THE OBJECT (rho-maximal-law.md sec.1; sift-limit-lemmaV.js header). At level
// D = z^s the Brudern-Fouvry vector-sieve certificate splits exactly as
//     T(x) = H*M + R_H(x),   R_H(x) = rho(x) - rho(x+H),
//     rho(y) = sum_j w_j psi((y - c_j)/q_j),  psi(t) = t - floor(t) - 1/2,
// over the divisor-pair lattice (block, d1, d2), q = [d1,d2], w in {+-1}.
// PROVEN inputs used here, all from the repo's own code:
//   (P1) <R_H^2> <= B(z,s) H,  B = sum_{e|P(z),e>1} e Vabs(e)^2
//        (lemmaV-parseval.js L1-L5; attack-beta2-01-lemmaV-meansquare.md).
//   (P2) B <= 9 A(z)^2 (E(z)-1) = O(log^8 z), A = (5/2)prod_{2<p<z}(1+2/p),
//        E = (43/25)prod_{2<p<z}(1+4p/(p+2)^2)  (redteam-0829-theorem1.md).
//   (P3) sup_x |R_H(x)| <= 2 sup_y |rho~(y)|  (exact algebra).
//   (P4) the ell^1 Fourier bound sup|R_H| <= Ssup(H) =
//        sum_{e>1} sum*_a |Theta_e(a)| |S_H(a/e)|, |Theta_e(a)| <= Vabs(e)
//        (lemmaV-parseval.js L5 + Theorem B).
//
// WHAT IS COMPUTED.
//  S0 CONTROLS. n, M, M ln^2 z; the exact <rho~^2> from the repo's meanSquare
//     against the cited column; B(z,3.0) from THIS file's own Vabs(e) against
//     the cited column; 9A^2(E-1) against the cited column. If these do not
//     match, nothing below is trusted.
//  S1 THE CHAIN AT NUMBERS, at window exponents u0 in {3.0, 3.5, 4.0, 4.25}:
//     what the consumer needs (HM - 1), what the mean square hands over
//     (sqrt(BH), measured B and proven B), the recovery ratio the open arrow
//     must supply, the price the union bound charges for it, and the truth
//     (2 sup|rho~|, CITED exact) — all in exponents base z.
//  S2 THE ell^1 CAP. Every absolute-value accounting over the lattice is capped
//     by the support e <= D^2 = z^{2s}: CAP(z) = sum_e Vabs(e) e (ln e + 1)
//     bounds Ssup(H) for EVERY H, so u_sup <= log_z((CAP+1)/M) -> 2s + o(1).
//     Checked against the cited u_sup column (must be >=) and, at z = 13, 17,
//     against the exact Ssup(H) computed over all primitive frequencies.
//  S3 WHERE THE LOSS SITS. The share of CAP, of the lattice terms, and of the
//     (B)-form mean-square bound sum_e Vabs(e)^2 h(e-h), carried by moduli
//     e > H at H = z^{u0}: the arrow is a statement about terms whose modulus
//     exceeds the window.
//  S4 THE SMOOTH-WINDOW LEVER. Choosing H = 0 mod P(y) kills every modulus
//     all of whose primes are < y (V1). The share of CAP those moduli carry at
//     y = u0 ln z, i.e. what the lever can move.
//  S5 THE FALSIFIER. OLS slope of ln(2 sup|rho~|) against ln z on the seven
//     CITED exact points, estimator calibrated on a synthetic z^2.5 truth first;
//     the slope is what any candidate u0 is measured against.
//
// CITED CONSTANTS (inputs, not outputs; each carries its source):
//   sup|rho~| at z = 13..29: rho-maximal-law.md sec.4 (research/rho-maxlaw-01-
//     sufficiency.js S1); at z = 31, 37: rho-exact-z31-01.md sec.4.1.
//   <rho~^2> at z = 37: rho2-analytic-bound.md sec.3 (attack-rhoms-01.js S3).
//   B(z,3.0): attack-beta2-01-lemmaV-meansquare.md item 1 (lemmaV-parseval.js).
//   9A^2(E-1) at z = 13, 17, 19: redteam-0829-theorem1.md sec.2.
//   u_sup: lemmaV-sup-extension.md (research/lemmaV-sup-extension.js).
//   beta_2 = 4.26645: paper/beta2-note.md.
//
//   node research/history/staging/attack-0829n-rml-proof.js     (~1 min)
// ============================================================================
const path = require('path');
const L = require(path.join(__dirname, '..', '..', 'sift-limit-lemmaV.js'));

const S = 3.0;
const BETA2 = 4.26645;
const ZS = [13, 17, 19, 23, 29, 31, 37];
const U0S = [3.0, 3.5, 4.0, 4.25];
const SUP = { 13: 2.62013, 17: 4.33665, 19: 9.15247, 23: 12.10617, 29: 17.90249, 31: 28.122062, 37: 52.219092 };
const RHO2_CITED = { 13: 1.095066, 17: 2.496563, 19: 4.952375, 23: 7.982480, 29: 13.596, 31: 24.738, 37: 85.677 };
const B_CITED = { 13: 1.3833, 17: 1.4214, 19: 1.4348, 23: 1.4503, 29: 1.4660, 31: 1.4764, 37: 1.4883 };
const BOUND_CITED = { 13: 3.5917e3, 17: 6.1045e3, 19: 9.2832e3 };
const USUP_CITED = { 13: 2.0617, 17: 2.3036, 19: 2.5518, 23: 2.6666, 29: 2.7464, 31: 2.8924, 37: 3.0125 };
const EXACT_RHO2_MAX_Z = 31;   // meanSquare is O(n^2); z = 37 (n = 76484) is cited instead

function primesBelow(n) { const s = new Uint8Array(n), o = []; for (let i = 2; i < n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j < n; j += i) s[j] = 1; } } return o; }
function gcd(a, b) { while (b) { const t = a % b; a = b; b = t; } return a; }
const f = (x, d) => Number(x).toFixed(d);
const e3 = (x) => Number(x).toExponential(3);
const pad = (s, n) => String(s).padStart(n);

// --- the modulus lattice: V(e1,e2), Vabs(e), T(e) for every e | P(z), e > 1 ---
function lattice(t, ps) {
  const V = new Map();   // e -> Map(e1 -> sum w/q)
  const T = new Map();   // e -> sum 1/q
  for (let i = 0; i < t.n; i++) {
    const q = t.q[i], w = t.w[i], d1 = t.d1[i];
    const pf = [];
    for (const p of ps) if (q % p === 0) pf.push(p);
    const m = pf.length;
    for (let mask = 1; mask < (1 << m); mask++) {
      let e = 1;
      for (let k = 0; k < m; k++) if (mask & (1 << k)) e *= pf[k];
      const e1 = gcd(e, d1);
      let ve = V.get(e); if (!ve) { ve = new Map(); V.set(e, ve); }
      ve.set(e1, (ve.get(e1) || 0) + w / q);
      T.set(e, (T.get(e) || 0) + 1 / q);
    }
  }
  const rows = [];
  for (const [e, ve] of V) {
    let vabs = 0; for (const v of ve.values()) vabs += Math.abs(v);
    rows.push({ e, vabs, T: T.get(e) });
  }
  rows.sort((a, b) => a.e - b.e);
  return rows;
}

// exact Ssup(H) = sum_e sum*_a |Theta_e(a)| |S_H(a/e)| over all primitive a/e
function exactSsup(t, rows, H) {
  let tot = 0, maxViol = 0;
  for (const r of rows) {
    const e = r.e;
    const idx = []; for (let i = 0; i < t.n; i++) if (t.q[i] % e === 0) idx.push(i);
    let se = 0, capA = 0;
    for (let a = 1; a < e; a++) {
      if (gcd(a, e) !== 1) continue;
      let re = 0, im = 0;
      for (const i of idx) { const ph = -2 * Math.PI * a * (t.c[i] % e) / e; re += (t.w[i] / t.q[i]) * Math.cos(ph); im += (t.w[i] / t.q[i]) * Math.sin(ph); }
      const th = Math.hypot(re, im);
      const sh = Math.abs(Math.sin(Math.PI * H * a / e) / Math.sin(Math.PI * a / e));
      se += th * sh;
      if (th > r.vabs * (1 + 1e-9)) maxViol = Math.max(maxViol, th / r.vabs - 1);
    }
    tot += se;
    const cap = r.vabs * e * (Math.log(e) + 1);
    if (se > cap * (1 + 1e-9)) maxViol = Math.max(maxViol, se / cap - 1);
  }
  return { Ssup: tot, maxViol };
}

function main() {
  console.log('attack-0829n-rml-proof.js  s = ' + S + '  beta_2 = ' + BETA2);
  console.log('');
  // the elementary lemma behind the cap: sum_{a=1}^{e-1} 1/sin(pi a/e) <= e (ln e + 1)
  let worst = 0, worstE = 0;
  for (let e = 2; e <= 20000; e++) { let s = 0; for (let a = 1; a < e; a++) s += 1 / Math.sin(Math.PI * a / e); const r = s / (e * (Math.log(e) + 1)); if (r > worst) { worst = r; worstE = e; } }
  console.log('LEMMA CHECK  sum_{a<e} 1/sin(pi a/e) <= e(ln e + 1): worst ratio ' + f(worst, 6) + ' at e = ' + worstE + ' over e = 2..20000  (' + (worst <= 1 ? 'holds' : 'FAILS') + ')');
  console.log('');

  const data = {};
  for (const z of ZS) {
    const ps = primesBelow(z);
    const t = L.buildTerms(z, Math.pow(z, S));
    let lnW = 0; for (const p of ps) lnW += Math.log(p);
    const rows = lattice(t, ps);
    let B = 0, CAP = 0, sigV = 0, sigT = 0, sigT2 = 0;
    for (const r of rows) { B += r.e * r.vabs * r.vabs; CAP += r.vabs * r.e * (Math.log(r.e) + 1); sigV += r.vabs; sigT += r.T; }
    // sum_i (tau(q_i)-1)/q_i must equal sigT exactly (partition control)
    for (let i = 0; i < t.n; i++) { let om = 0; for (const p of ps) if (t.q[i] % p === 0) om++; sigT2 += (Math.pow(2, om) - 1) / t.q[i]; }
    let A = 2.5, E = 43 / 25, P2 = 1;
    for (const p of ps) { P2 *= (1 + 2 / p); if (p > 2) { A *= (1 + 2 / p); E *= (1 + 4 * p / ((p + 2) * (p + 2))); } }
    const bound = 9 * A * A * (E - 1);
    let rho2 = null;
    if (z <= EXACT_RHO2_MAX_Z) rho2 = L.meanSquare(t, 100).rho2;
    data[z] = { z, ps, t, lnW, rows, B, CAP, sigV, sigT, sigT2, A, E, bound, P2, rho2: rho2 === null ? RHO2_CITED[z] : rho2, rho2exact: rho2 !== null, W: Math.exp(lnW) };
  }

  console.log('S0 CONTROLS — the inputs, recomputed where cheap, cited where not');
  console.log('   z      n        M      M ln^2 z   <rho~^2> here   cited     B here   cited    9A^2(E-1)   cited     sigT partition');
  for (const z of ZS) {
    const d = data[z];
    console.log(`  ${pad(z, 2)}  ${pad(d.t.n, 6)}  ${f(d.t.M, 6)}  ${f(d.t.M * Math.log(z) ** 2, 4)}   ${d.rho2exact ? pad(f(d.rho2, 6), 12) : pad('(cited)', 12)}   ${pad(RHO2_CITED[z], 8)}   ${f(d.B, 4)}   ${f(B_CITED[z], 4)}   ${e3(d.bound)}   ${BOUND_CITED[z] ? e3(BOUND_CITED[z]) : '   --   '}   ${Math.abs(d.sigT - d.sigT2) < 1e-9 * d.sigT ? 'exact' : 'MISMATCH'}`);
  }
  console.log('  (B here is from this file\'s own Vabs(e); agreement with the cited column is the check that the lattice is the producer\'s.)');
  console.log('');

  console.log('S1 THE CHAIN AT NUMBERS — everything in exponents base z; rows with H > W are calibration only (window exceeds the period)');
  console.log('  need   = log_z(HM - 1)                    what the consumer needs sup|R_H| to stay under');
  console.log('  ms_m   = log_z sqrt(B_meas H),  ms_p = log_z sqrt(9A^2(E-1) H)   what (P1)/(P2) hand over as rms');
  console.log('  ask    = need - ms_m   the recovery exponent the open arrow must supply (sup/rms <= z^ask)');
  console.log('  union  = theta(z)/(2 ln z)   what a union bound over the W positions charges for it');
  console.log('  truth  = log_z(2 sup|rho~|)  (CITED exact); F = (HM-1)/(2 sup|rho~|) the certified margin');
  console.log('  gauss  = log_z(2 sqrt(2 ln W))   the F4 (Gaussian) recovery factor, for comparison with ask');
  for (const u0 of U0S) {
    console.log(`  u0 = ${f(u0, 2)}`);
    console.log('   z    H>W?    need    ms_m    ms_p     ask    union   gauss   truth   log_z F    F');
    for (const z of ZS) {
      const d = data[z], lnz = Math.log(z);
      const H = Math.pow(z, u0), HM1 = H * d.t.M - 1;
      const need = Math.log(HM1) / lnz, msm = 0.5 * Math.log(d.B * H) / lnz, msp = 0.5 * Math.log(d.bound * H) / lnz;
      const union = d.lnW / (2 * lnz), truth = Math.log(2 * SUP[z]) / lnz, F = HM1 / (2 * SUP[z]);
      const gauss = Math.log(2 * Math.sqrt(2 * d.lnW)) / lnz;
      console.log(`  ${pad(z, 2)}    ${H > d.W ? 'yes' : ' no'}   ${f(need, 4)}  ${f(msm, 4)}  ${f(msp, 4)}  ${f(need - msm, 4)}  ${f(union, 4)}  ${f(gauss, 4)}  ${f(truth, 4)}  ${f(Math.log(F) / lnz, 4)}  ${e3(F)}`);
    }
  }
  console.log('');

  console.log('S2 THE ell^1 CAP — CAP(z) = sum_e Vabs(e) e (ln e + 1) >= Ssup(H) for every H; u_cap = log_z((CAP+1)/M)');
  console.log('   z    #moduli   max e      sum Vabs   sum T     6 P2^2    CAP        u_cap    u_sup(cited)   u_triv    2s');
  for (const z of ZS) {
    const d = data[z], lnz = Math.log(z);
    const maxE = d.rows[d.rows.length - 1].e;
    const ucap = Math.log((d.CAP + 1) / d.t.M) / lnz;
    const utriv = Math.log((d.t.n + d.t.M + 1) / d.t.M) / lnz;
    console.log(`  ${pad(z, 2)}   ${pad(d.rows.length, 7)}   ${e3(maxE)}   ${f(d.sigV, 4)}   ${f(d.sigT, 4)}   ${f(6 * d.P2 * d.P2, 3)}   ${e3(d.CAP)}   ${f(ucap, 4)}   ${f(USUP_CITED[z], 4)}        ${f(utriv, 4)}   ${f(2 * S, 1)}`);
  }
  console.log('  (u_cap >= u_sup at every z is the consistency condition; sum Vabs <= sum T <= 6 P2^2 is the polylog control.)');
  for (const z of [13, 17]) {
    const d = data[z];
    for (const u0 of [3.0, 4.0]) {
      const H = Math.round(Math.pow(z, u0));
      const ex = exactSsup(d.t, d.rows, H);
      console.log(`  exact Ssup at z = ${z}, H = ${H}: ${f(ex.Ssup, 4)}  vs CAP ${f(d.CAP, 4)}  ratio CAP/Ssup ${f(d.CAP / ex.Ssup, 2)}  per-modulus cap violations: ${ex.maxViol === 0 ? 'none' : 'MAX ' + e3(ex.maxViol)}`);
    }
  }
  console.log('');

  console.log('S3 WHERE THE LOSS SITS — shares carried by moduli e > H (and lattice terms q > H) at H = z^{u0}');
  console.log('  and the PROVEN reduction: moduli e <= z^{u0-delta} are handled by the ell^1 accounting; their CAP part against HM-1 at u0 = 4, delta = 0.5');
  console.log('   z    CAP_{e <= z^3.5}    HM - 1 at z^4    ratio    share of CAP above z^3.5');
  for (const z of ZS) {
    const d = data[z];
    const cut = Math.pow(z, 3.5), HM1 = Math.pow(z, 4) * d.t.M - 1;
    let capS = 0; for (const r of d.rows) if (r.e <= cut) capS += r.vabs * r.e * (Math.log(r.e) + 1);
    console.log(`  ${pad(z, 2)}    ${e3(capS)}         ${e3(HM1)}      ${f(capS / HM1, 4)}    ${f(1 - capS / d.CAP, 4)}`);
  }
  console.log('   z   u0     e>H share of CAP   q>H share of n   e>H share of sum Vabs^2 h(e-h)');
  for (const z of ZS) {
    const d = data[z];
    for (const u0 of [4.0, BETA2]) {
      const H = Math.floor(Math.pow(z, u0));
      let capBig = 0, msBig = 0, msAll = 0, nBig = 0;
      for (const r of d.rows) { const h = H % r.e, term = r.vabs * r.vabs * h * (r.e - h); msAll += term; if (r.e > H) { capBig += r.vabs * r.e * (Math.log(r.e) + 1); msBig += term; } }
      for (let i = 0; i < d.t.n; i++) if (d.t.q[i] > H) nBig++;
      console.log(`  ${pad(z, 2)}  ${f(u0, 2)}      ${f(capBig / d.CAP, 4)}             ${f(nBig / d.t.n, 4)}            ${msAll > 0 ? f(msBig / msAll, 4) : '   --'}`);
    }
  }
  console.log('');

  console.log('S4 THE SMOOTH-WINDOW LEVER — H = 0 mod P(y) kills every modulus with all primes < y; share of CAP those carry');
  console.log('   z    y = ceil(u0 ln z), u0 = 4   P(y)          moduli killed   share of CAP killed');
  for (const z of ZS) {
    const d = data[z];
    const y = Math.ceil(4 * Math.log(z));
    let Py = 1; for (const p of d.ps) if (p < y) Py *= p;
    let killed = 0, capK = 0;
    for (const r of d.rows) { let smooth = true; for (const p of d.ps) if (p >= y && r.e % p === 0) { smooth = false; break; } if (smooth) { killed++; capK += r.vabs * r.e * (Math.log(r.e) + 1); } }
    console.log(`  ${pad(z, 2)}         ${pad(y, 2)}                  ${pad(Py, 8)}        ${pad(killed, 5)}            ${e3(capK / d.CAP)}`);
  }
  console.log('');

  console.log('S5 THE FALSIFIER — OLS slope of ln(2 sup|rho~|) on ln z over the seven cited exact points');
  const ols = (xs, ys) => { const n = xs.length, mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n; let sxx = 0, sxy = 0; for (let i = 0; i < n; i++) { sxx += (xs[i] - mx) ** 2; sxy += (xs[i] - mx) * (ys[i] - my); } const b = sxy / sxx, a = my - b * mx; let rss = 0; for (let i = 0; i < n; i++) rss += (ys[i] - a - b * xs[i]) ** 2; return { b, se: Math.sqrt(rss / (n - 2) / sxx) }; };
  const xs = ZS.map(z => Math.log(z));
  const cal = ols(xs, ZS.map(z => 2.5 * Math.log(z) + 0.7));
  console.log(`  estimator control: synthetic z^2.5 truth returns slope ${f(cal.b, 6)} (se ${e3(cal.se)})`);
  const fit = ols(xs, ZS.map(z => Math.log(2 * SUP[z])));
  console.log(`  slope of ln(2 sup|rho~|): ${f(fit.b, 4)} +/- ${f(fit.se, 4)}  (seven points, z = 13..37; rho-exact-z31-01.md cites 2.766 +/- 0.212 for sup|rho~| on the same points)`);
  const fit6 = ols(xs.slice(0, 6), ZS.slice(0, 6).map(z => Math.log(2 * SUP[z])));
  console.log(`  leave-out z = 37: ${f(fit6.b, 4)} +/- ${f(fit6.se, 4)}`);
  for (const u0 of U0S) console.log(`  u0 = ${f(u0, 2)}: room u0 - slope = ${f(u0 - fit.b, 4)}, i.e. ${f((u0 - fit.b) / fit.se, 2)} se above the measured truth slope`);
  const fitF4 = ols(xs, ZS.map(z => Math.log(2 * Math.sqrt(data[z].rho2) * Math.sqrt(2 * data[z].lnW))));
  console.log(`  slope of the F4 (Gaussian, C = 1) envelope 2 sqrt(<rho~^2>) sqrt(2 ln W): ${f(fitF4.b, 4)} +/- ${f(fitF4.se, 4)}`);
  console.log('');
  console.log('DONE');
}
main();

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/attack-0829n-rml-proof.js
//   invocation:  node research/history/staging/attack-0829n-rml-proof.js
//   code-sha256: df0a972c181937d06f70e427ede214a42db0a39010ade70218c0ea38939a4b51
//   out-sha256:  6b93489937195ebefe99dd631eb4bbdd8ff42b16be255105f11e12783e79599e
//   body-lines:  121
//   forced:      2026-08-29, 0 of 367 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     42.4 s
// ============================================================================
// attack-0829n-rml-proof.js  s = 3  beta_2 = 4.26645
//
// LEMMA CHECK  sum_{a<e} 1/sin(pi a/e) <= e(ln e + 1): worst ratio 0.585568 at e = 20000 over e = 2..20000  (holds)
//
// S0 CONTROLS — the inputs, recomputed where cheap, cited where not
//    z      n        M      M ln^2 z   <rho~^2> here   cited     B here   cited    9A^2(E-1)   cited     sigT partition
//   13     852  0.055844  0.3674       1.095066   1.095066   1.3833   1.3833   3.592e+3   3.592e+3   exact
//   17    2236  0.046986  0.3772       2.496563   2.496563   1.4214   1.4214   6.105e+3   6.105e+3   exact
//   19    4764  0.039598  0.3433       4.952375   4.952375   1.4348   1.4348   9.283e+3   9.283e+3   exact
//   23    9636  0.034169  0.3359       7.982480    7.98248   1.4503   1.4503   1.354e+4      --      exact
//   29   20700  0.031843  0.3611      13.595974     13.596   1.4660   1.4660   1.861e+4      --      exact
//   31   35868  0.029253  0.3450      24.738489     24.738   1.4764   1.4764   2.406e+4      --      exact
//   37   76484  0.028057  0.3658        (cited)     85.677   1.4883   1.4883   3.062e+4      --      exact
//   (B here is from this file's own Vabs(e); agreement with the cited column is the check that the lattice is the producer's.)
//
// S1 THE CHAIN AT NUMBERS — everything in exponents base z; rows with H > W are calibration only (window exceeds the period)
//   need   = log_z(HM - 1)                    what the consumer needs sup|R_H| to stay under
//   ms_m   = log_z sqrt(B_meas H),  ms_p = log_z sqrt(9A^2(E-1) H)   what (P1)/(P2) hand over as rms
//   ask    = need - ms_m   the recovery exponent the open arrow must supply (sup/rms <= z^ask)
//   union  = theta(z)/(2 ln z)   what a union bound over the W positions charges for it
//   truth  = log_z(2 sup|rho~|)  (CITED exact); F = (HM-1)/(2 sup|rho~|) the certified margin
//   gauss  = log_z(2 sqrt(2 ln W))   the F4 (Gaussian) recovery factor, for comparison with ask
//   u0 = 3.00
//    z    H>W?    need    ms_m    ms_p     ask    union   gauss   truth   log_z F    F
//   13     no   1.8720  1.5632  3.0958  0.3087  1.5098  0.8044  0.6458  1.2262  2.322e+1
//   17     no   1.9192  1.5621  3.0383  0.3571  1.8195  0.7787  0.7625  1.1567  2.650e+1
//   19     no   1.9021  1.5613  3.0514  0.3408  2.2319  0.7905  0.9873  0.9148  1.478e+1
//   23     no   1.9224  1.5593  3.0171  0.3631  2.5654  0.7746  1.0164  0.9060  1.713e+1
//   29     no   1.9760  1.5568  2.9598  0.4192  2.8544  0.7477  1.0626  0.9134  2.166e+1
//   31     no   1.9712  1.5567  2.9689  0.4145  3.2892  0.7567  1.1735  0.7977  1.548e+1
//   37     no   2.0102  1.5551  2.9303  0.4551  3.6036  0.7392  1.2874  0.7228  1.360e+1
//   u0 = 3.50
//    z    H>W?    need    ms_m    ms_p     ask    union   gauss   truth   log_z F    F
//   13    yes   2.3743  1.8132  3.3458  0.5610  1.5098  0.8044  0.6458  1.7285  8.423e+1
//   17     no   2.4203  1.8121  3.2883  0.6083  1.8195  0.7787  0.7625  1.6579  1.096e+2
//   19     no   2.4031  1.8113  3.3014  0.5918  2.2319  0.7905  0.9873  1.4157  6.462e+1
//   23     no   2.4230  1.8093  3.2671  0.6137  2.5654  0.7746  1.0164  1.4066  8.231e+1
//   29     no   2.4763  1.8068  3.2098  0.6695  2.8544  0.7477  1.0626  1.4137  1.168e+2
//   31     no   2.4715  1.8067  3.2189  0.6647  3.2892  0.7567  1.1735  1.2980  8.625e+1
//   37     no   2.5103  1.8051  3.1803  0.7053  3.6036  0.7392  1.2874  1.2230  8.276e+1
//   u0 = 4.00
//    z    H>W?    need    ms_m    ms_p     ask    union   gauss   truth   log_z F    F
//   13    yes   2.8749  2.0632  3.5958  0.8117  1.5098  0.8044  0.6458  2.2291  3.042e+2
//   17    yes   2.9206  2.0621  3.5383  0.8586  1.8195  0.7787  0.7625  2.1581  4.523e+2
//   19     no   2.9033  2.0613  3.5514  0.8420  2.2319  0.7905  0.9873  1.9160  2.819e+2
//   23     no   2.9231  2.0593  3.5171  0.8638  2.5654  0.7746  1.0164  1.9067  3.949e+2
//   29     no   2.9763  2.0568  3.4598  0.9195  2.8544  0.7477  1.0626  1.9137  6.290e+2
//   31     no   2.9715  2.0567  3.4689  0.9148  3.2892  0.7567  1.1735  1.7980  4.803e+2
//   37     no   3.0104  2.0551  3.4303  0.9553  3.6036  0.7392  1.2874  1.7230  5.035e+2
//   u0 = 4.25
//    z    H>W?    need    ms_m    ms_p     ask    union   gauss   truth   log_z F    F
//   13    yes   3.1250  2.1882  3.7208  0.9368  1.5098  0.8044  0.6458  2.4792  5.778e+2
//   17    yes   3.1707  2.1871  3.6633  0.9836  1.8195  0.7787  0.7625  2.4082  9.186e+2
//   19     no   3.1533  2.1863  3.6764  0.9670  2.2319  0.7905  0.9873  2.1660  5.885e+2
//   23     no   3.1731  2.1843  3.6421  0.9889  2.5654  0.7746  1.0164  2.1568  8.648e+2
//   29     no   3.2263  2.1818  3.5848  1.0445  2.8544  0.7477  1.0626  2.1637  1.460e+3
//   31     no   3.2215  2.1817  3.5939  1.0398  3.2892  0.7567  1.1735  2.0480  1.133e+3
//   37     no   3.2604  2.1801  3.5553  1.0803  3.6036  0.7392  1.2874  1.9730  1.242e+3
//
// S2 THE ell^1 CAP — CAP(z) = sum_e Vabs(e) e (ln e + 1) >= Ssup(H) for every H; u_cap = log_z((CAP+1)/M)
//    z    #moduli   max e      sum Vabs   sum T     6 P2^2    CAP        u_cap    u_sup(cited)   u_triv    2s
//   13        31   2.310e+3   0.9442   79.0827   301.686   3.505e+2   3.4103   2.0617        3.7560   6.0
//   17        63   3.003e+4   0.9530   106.3384   401.653   1.210e+3   3.5850   2.3036        3.8016   6.0
//   19       127   5.105e+5   0.9610   130.2565   501.719   2.696e+3   3.7797   2.5518        3.9729   6.0
//   23       243   8.818e+5   0.9677   156.9928   612.903   5.296e+3   3.8116   2.6666        4.0025   6.0
//   29       467   3.432e+6   0.9700   186.7533   724.129   1.182e+4   3.8086   2.7464        3.9750   6.0
//   31       827   9.700e+6   0.9742   210.3780   827.453   2.212e+4   3.9418   2.8924        4.0825   6.0
//   37      1527   3.187e+7   0.9747   242.8556   937.665   6.513e+4   4.0593   3.0125        4.1038   6.0
//   (u_cap >= u_sup at every z is the consistency condition; sum Vabs <= sum T <= 6 P2^2 is the polylog control.)
//   exact Ssup at z = 13, H = 2197: 12.2446  vs CAP 350.4593  ratio CAP/Ssup 28.62  per-modulus cap violations: none
//   exact Ssup at z = 13, H = 28561: 11.4257  vs CAP 350.4593  ratio CAP/Ssup 30.67  per-modulus cap violations: none
//   exact Ssup at z = 17, H = 4913: 32.8523  vs CAP 1209.9555  ratio CAP/Ssup 36.83  per-modulus cap violations: none
//   exact Ssup at z = 17, H = 83521: 32.7589  vs CAP 1209.9555  ratio CAP/Ssup 36.94  per-modulus cap violations: none
//
// S3 WHERE THE LOSS SITS — shares carried by moduli e > H (and lattice terms q > H) at H = z^{u0}
//   and the PROVEN reduction: moduli e <= z^{u0-delta} are handled by the ell^1 accounting; their CAP part against HM-1 at u0 = 4, delta = 0.5
//    z    CAP_{e <= z^3.5}    HM - 1 at z^4    ratio    share of CAP above z^3.5
//   13    3.505e+2         1.594e+3      0.2199    0.0000
//   17    1.074e+3         3.923e+3      0.2738    0.1122
//   19    2.037e+3         5.159e+3      0.3948    0.2445
//   23    4.208e+3         9.561e+3      0.4402    0.2054
//   29    8.748e+3         2.252e+4      0.3884    0.2599
//   31    1.369e+4         2.701e+4      0.5067    0.3813
//   37    2.811e+4         5.258e+4      0.5346    0.5684
//    z   u0     e>H share of CAP   q>H share of n   e>H share of sum Vabs^2 h(e-h)
//   13  4.00      0.0000             0.0000            0.0000
//   13  4.27      0.0000             0.0000            0.0000
//   17  4.00      0.0000             0.0000            0.0000
//   17  4.27      0.0000             0.0000            0.0000
//   19  4.00      0.0658             0.0088            0.0352
//   19  4.27      0.0315             0.0038            0.0309
//   23  4.00      0.0759             0.0232            0.0452
//   23  4.27      0.0276             0.0068            0.0143
//   29  4.00      0.0611             0.0416            0.0225
//   29  4.27      0.0186             0.0038            0.0055
//   31  4.00      0.1213             0.0636            0.0729
//   31  4.27      0.0424             0.0149            0.0187
//   37  4.00      0.2726             0.0999            0.1993
//   37  4.27      0.1365             0.0269            0.1223
//
// S4 THE SMOOTH-WINDOW LEVER — H = 0 mod P(y) kills every modulus with all primes < y; share of CAP those carry
//    z    y = ceil(u0 ln z), u0 = 4   P(y)          moduli killed   share of CAP killed
//   13         11                       210           15            3.164e-1
//   17         12                      2310           31            3.438e-1
//   19         12                      2310           31            1.426e-1
//   23         13                      2310           31            6.921e-2
//   29         14                     30030           63            1.173e-1
//   31         14                     30030           63            6.031e-2
//   37         15                     30030           63            1.713e-2
//
// S5 THE FALSIFIER — OLS slope of ln(2 sup|rho~|) on ln z over the seven cited exact points
//   estimator control: synthetic z^2.5 truth returns slope 2.500000 (se 4.382e-16)
//   slope of ln(2 sup|rho~|): 2.7660 +/- 0.2120  (seven points, z = 13..37; rho-exact-z31-01.md cites 2.766 +/- 0.212 for sup|rho~| on the same points)
//   leave-out z = 37: 2.6180 +/- 0.2601
//   u0 = 3.00: room u0 - slope = 0.2340, i.e. 1.10 se above the measured truth slope
//   u0 = 3.50: room u0 - slope = 0.7340, i.e. 3.46 se above the measured truth slope
//   u0 = 4.00: room u0 - slope = 1.2340, i.e. 5.82 se above the measured truth slope
//   u0 = 4.25: room u0 - slope = 1.4840, i.e. 7.00 se above the measured truth slope
//   slope of the F4 (Gaussian, C = 1) envelope 2 sqrt(<rho~^2>) sqrt(2 ln W): 2.5111 +/- 0.1775
//
// DONE
// ============================================================================
// READINGS
// ============================================================================
// (written in attack-0829n-rml-proof.md sec.7 after the embed; the script
//  carries none of its own so that no figure can precede its run)
