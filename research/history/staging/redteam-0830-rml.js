#!/usr/bin/env node
'use strict';
// ============================================================================
// redteam-0830-rml.js — ADVERSARIAL re-derivation of three HELD notes:
//   (a) research/history/staging/attack-0829n-rml-proof.md  — the C1-C6 chain,
//       the CAP lemma of sec.4.1, the sec.4.3 reduction, the sec.2 and sec.5
//       tables, the slope and its s.e. placements.
//   (b) research/history/staging/verify-0830-usup-convention.md — the
//       same-object ruling and the two crossover claims its replacement
//       sentences put into research/history/staging/lemmaV-sup-extension.md.
//   (c) research/history/staging/measure-0830-rho-sup-z41.md — the reflection
//       identity, the custody sups, the walked sup|R_H|, the sealed forecast
//       and the cost extrapolation.
//   Companion to research/history/staging/redteam-0830-rml.md. STAGING GRADE.
//   Nothing here moves an exponent. Every section is a re-derivation or an
//   attempt to falsify a claim those notes already make.
// ============================================================================
// INDEPENDENCE. The Rosser supports, the CRT class, the divisor-pair lattice,
// V(e,e1) and Vabs(e), the Fourier coefficients Theta_e(a), CAP, the exact
// mean square, the full-period walk and the OLS fit are re-implemented HERE
// from the mathematics stated in research/sift-limit-lemmaV.js's header
// (lines 6-22), not copied from its code. That file is required for ONE
// purpose: S0 compares this file's lattice against its buildTerms term by
// term, so a disagreement is itself a finding. No other section calls it.
//
// CITED INPUTS (targets quoted from the notes under test):
//   SUP_CITED    sup|rho~|, z = 13..37  (rho-exact-z31-01.js S2, via
//                attack-0829n-rml-proof.js:68)
//   SUPR3_CITED  sup|R_H| at H = z^3, z = 19..37 (measure-0830 sec.3, S1)
//   RECS_CITED   lemmaV-sup-extension.md's #records, z = 13..47
//   C_LSE = 2.0516  lemmaV-sup-extension.md line 442
//
// SECTIONS. S0 lattice + swap symmetry + the L5 decomposition. S1 the CAP
// lemma, every step. S2 u_cap past z = 47 and the term-count premise. S3 the
// sec.2 / sec.5 tables and the limit of the Gaussian column. S4 the slope and
// every pre-registered number of measure-0830 sec.5. S5 the sec.4.3 reduction.
// S6 the reflection identity at every position. S7 an independent full-period
// walk. S8 the two crossover claims. S9 the cost arithmetic.
//
//   node research/history/staging/redteam-0830-rml.js      (~12 min)
// ============================================================================
const path = require('path');
const REPO = require(path.join(__dirname, '..', '..', 'sift-limit-lemmaV.js')); // S0 only

const S = 3.0, BETA2 = 4.26645;
const SUP_CITED = { 13: 2.620130, 17: 4.336647, 19: 9.152470, 23: 12.106173, 29: 17.902491, 31: 28.122062, 37: 52.219092 };
const SUPR3_CITED = { 19: 8.600331, 23: 15.737099, 29: 21.611574, 31: 29.537383, 37: 47.838730 };
const RECS_CITED = { 13: 31, 17: 63, 19: 127, 23: 243, 29: 448, 31: 763, 37: 1494, 41: 2501, 43: 3814, 47: 6035 };
const SSAT_CITED = { 13: 1.9602e+1, 47: 1.2623e+4 };
const C_LSE = 2.0516;
const ZALL = [13, 17, 19, 23, 29, 31, 37, 41, 43, 47];

const f = (x, d) => Number(x).toFixed(d);
const e3 = (x) => Number(x).toExponential(3);
const e4 = (x) => Number(x).toExponential(4);
const pad = (s, n) => String(s).padStart(n);
const say = (s) => console.log(s);
const note = (s) => process.stderr.write(s + '\n');

function primesBelow(n) { const s = new Uint8Array(n), o = []; for (let i = 2; i < n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j < n; j += i) s[j] = 1; } } return o; }
function gcd(a, b) { while (b) { const t = a % b; a = b; b = t; } return a; }
function inverse(a, m) { let t = 0, nt = 1, r = m, nr = ((a % m) + m) % m; while (nr !== 0) { const qq = Math.floor(r / nr); [t, nt] = [nt, t - qq * nt]; [r, nr] = [nr, r - qq * nr]; } return ((t % m) + m) % m; }

// --- INDEPENDENT lattice ----------------------------------------------------
function rosser(z, D, upper) {
  const ps = primesBelow(z).slice().sort((a, b) => b - a), out = [];
  const walk = (start, prod, depth) => {
    out.push([prod, depth % 2 === 0 ? 1 : -1]);
    for (let i = start; i < ps.length; i++) {
      const p = ps[i], nd = depth + 1, np = prod * p;
      if (np > D) continue;
      if ((upper ? (nd % 2 === 1) : (nd % 2 === 0)) && np * p * p > D) continue;
      walk(i + 1, np, nd);
    }
  };
  walk(0, 1, 0); return out;
}
function crt(d1, d2) {
  const g = gcd(d1, d2); if (2 % g !== 0) return null;
  const d2g = d2 / g, d1g = d1 / g, q = d1 * d2g;
  const t = (((-2 / g) % d2g) + d2g) % d2g * inverse(d1g, d2g) % d2g;
  return [q, (d1 * t) % q];
}
function buildTerms(z, D) {
  const sp = rosser(z, D, true), sm = rosser(z, D, false);
  const COMB = [[sm, sp, +1], [sp, sm, +1], [sp, sp, -1]];
  const w = [], q = [], c = [], d1a = [], d2a = []; let M = 0;
  for (const [A, B, eps] of COMB) for (const [a, sa] of A) for (const [b, sb] of B) {
    const r = crt(a, b); if (!r) continue;
    const ww = eps * sa * sb;
    w.push(ww); q.push(r[0]); c.push(r[1]); d1a.push(a); d2a.push(b); M += ww / r[0];
  }
  return { w, q, c, d1: d1a, d2: d2a, M, n: w.length };
}
function vtable(t, ps) {
  const V = new Map();
  for (let i = 0; i < t.n; i++) {
    const q = t.q[i], wq = t.w[i] / q, pf = [];
    for (const p of ps) if (q % p === 0) pf.push(p);
    for (let mask = 1; mask < (1 << pf.length); mask++) {
      let e = 1; for (let k = 0; k < pf.length; k++) if (mask & (1 << k)) e *= pf[k];
      let m = V.get(e); if (!m) { m = new Map(); V.set(e, m); }
      const e1 = gcd(e, t.d1[i]); m.set(e1, (m.get(e1) || 0) + wq);
    }
  }
  const rows = [];
  for (const [e, m] of V) { let va = 0; for (const v of m.values()) va += Math.abs(v); rows.push({ e, va }); }
  rows.sort((a, b) => a.e - b.e); return rows;
}
const capOf = (rows, lo, hi) => { let s = 0; for (const r of rows) { if (lo !== undefined && r.e <= lo) continue; if (hi !== undefined && r.e > hi) continue; s += r.va * r.e * (Math.log(r.e) + 1); } return s; };
const idxOf = (t, e) => { const o = []; for (let i = 0; i < t.n; i++) if (t.q[i] % e === 0) o.push(i); return o; };
function thetaAll(t, e, idx) { const out = []; for (let a = 1; a < e; a++) { if (gcd(a, e) !== 1) { out.push(null); continue; } let re = 0, im = 0; for (const i of idx) { const ph = -2 * Math.PI * a * (t.c[i] % e) / e, u = t.w[i] / t.q[i]; re += u * Math.cos(ph); im += u * Math.sin(ph); } out.push([re, im]); } return out; }
const psi = (x, q) => { let r = x % q; if (r < 0) r += q; return r / q - 0.5; };
function rhoT(t, y) { let s = 0; for (let i = 0; i < t.n; i++) s += t.w[i] * psi(y - t.c[i], t.q[i]); return s + t.M / 2; }
function Pz(ps) { let P = 1; for (const p of ps) P *= p; return P; }
function thetaFn(ps) { let s = 0; for (const p of ps) s += Math.log(p); return s; }
// exact <R_H^2> and <rho~^2> over one period, masked gcd; O(n^2/2)
function moments(t, ps, H) {
  const n = t.n, q = Float64Array.from(t.q), c = Float64Array.from(t.c), w = Int8Array.from(t.w);
  const PR = Float64Array.from(ps), mk = new Int32Array(n);
  for (let i = 0; i < n; i++) { let m = 0; for (let k = 0; k < ps.length; k++) if (q[i] % ps[k] === 0) m |= (1 << k); mk[i] = m; }
  const Pg = (d, g) => { let x = d % g; if (x < 0) x += g; return x * (g - x) / 2; };
  let R2 = 0, r2 = 0;
  for (let i = 0; i < n; i++) {
    { const g = q[i]; R2 += (Pg(-H, g) + Pg(H, g) - 2 * Pg(0, g)) / (g * g); r2 += ((g * g - 1) / 12) / (g * g); }
    const qi = q[i], ci = c[i], wi = w[i], mi = mk[i];
    for (let j = i + 1; j < n; j++) {
      let m = mi & mk[j], g = 1;
      while (m) { const b = m & (-m); g *= PR[31 - Math.clz32(b)]; m ^= b; }
      const d = c[j] - ci, inv = 2 * wi * w[j] / (qi * q[j]);
      R2 += inv * (Pg(d - H, g) + Pg(d + H, g) - 2 * Pg(d, g));
      r2 += inv * (((g * g - 1) / 12) - Pg(d, g));
    }
  }
  return { R2, r2 };
}
function ols(xs, ys) {
  const n = xs.length, mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
  let sxx = 0, sxy = 0; for (let i = 0; i < n; i++) { sxx += (xs[i] - mx) ** 2; sxy += (xs[i] - mx) * (ys[i] - my); }
  const b = sxy / sxx, a = my - b * mx;
  let rss = 0; for (let i = 0; i < n; i++) rss += (ys[i] - a - b * xs[i]) ** 2;
  const s2 = rss / (n - 2);
  return { a, b, se: Math.sqrt(s2 / sxx), s: Math.sqrt(s2), sxx, mx, n };
}

// ============================================================================
function main() {
say('redteam-0830-rml.js — independent re-derivation, s = ' + f(S, 1) + ', beta_2 = ' + BETA2);
say('');

// ---- S0 --------------------------------------------------------------------
say('S0 THE LATTICE REBUILT INDEPENDENTLY; THE SWAP SYMMETRY; THE L5 DECOMPOSITION');
say('   targets: attack-0829n-rml-proof.md sec.1 and sec.4.1 (L5); measure-0830 sec.2(a) ("the three-entry COMB list is symmetric")');
say('   z    n(mine)  n(repo)  M(mine)      |dM|        same multiset   swap-closed   c(swap) = -2-c mod q   max |L5 - direct|');
const LAT = {};
for (const z of [13, 17, 19, 23, 29, 31, 37]) {
  const ps = primesBelow(z), D = Math.pow(z, S);
  const t = buildTerms(z, D), rt = REPO.buildTerms(z, D);
  let same = t.n === rt.n;
  if (same) { const K = (w, q, c) => w + ':' + q + ':' + c, A = new Map(); for (let i = 0; i < rt.n; i++) { const k = K(rt.w[i], rt.q[i], rt.c[i]); A.set(k, (A.get(k) || 0) + 1); } for (let i = 0; i < t.n; i++) { const k = K(t.w[i], t.q[i], t.c[i]), v = A.get(k); if (!v) { same = false; break; } A.set(k, v - 1); } }
  const mk = (a, b, w) => a + '|' + b + '|' + w, idx = new Map();
  for (let i = 0; i < t.n; i++) idx.set(mk(t.d1[i], t.d2[i], t.w[i]), i);
  let swapOK = true, classOK = true;
  for (let i = 0; i < t.n; i++) {
    const j = idx.get(mk(t.d2[i], t.d1[i], t.w[i]));
    if (j === undefined) { swapOK = false; break; }
    const want = ((-2 - t.c[i]) % t.q[i] + t.q[i]) % t.q[i];
    if (t.q[j] !== t.q[i] || t.c[j] !== want) classOK = false;
  }
  let l5 = null;
  if (z <= 17) {
    const rows = vtable(t, ps), H = Math.round(Math.pow(z, 3));
    const XS = [0, 1, 7, 101, 1009], acc = XS.map(() => 0);
    for (const r of rows) {
      const e = r.e, ix = idxOf(t, e), th = thetaAll(t, e, ix);
      for (let a = 1; a < e; a++) {
        const T = th[a - 1]; if (!T) continue;
        const s = Math.PI * a / e, mag = Math.sin(H * s) / Math.sin(s);
        const sre = mag * Math.cos(s * (H + 1)), sim = mag * Math.sin(s * (H + 1));
        for (let k = 0; k < XS.length; k++) {
          const ang = 2 * Math.PI * a * XS[k] / e, pre = Math.cos(ang), pim = Math.sin(ang);
          const are = sre * pre - sim * pim, aim = sre * pim + sim * pre;
          acc[k] += T[0] * are - T[1] * aim;
        }
      }
    }
    l5 = 0; for (let k = 0; k < XS.length; k++) l5 = Math.max(l5, Math.abs(acc[k] - (rhoT(t, XS[k]) - rhoT(t, XS[k] + H))));
  }
  LAT[z] = { t, ps, D };
  say(`  ${pad(z, 2)}   ${pad(t.n, 7)}  ${pad(rt.n, 7)}  ${e4(t.M)}   ${e3(Math.abs(t.M - rt.M))}   ${same ? 'yes' : 'NO '}             ${swapOK ? 'yes' : 'NO '}           ${classOK ? 'yes' : 'NO '}                    ${l5 === null ? '  --   ' : e3(l5)}`);
  note('S0 ' + z);
}
say('   (same multiset = the two implementations agree on the multiset of (w, q, c). swap-closed and c(swap) are exactly the two hypotheses');
say('    the reflection identity needs. L5 = R_H rebuilt from sum_e sum*_a Theta_e(a) S_H(a/e) e(ax/e) against the direct sawtooth sum at five x.)');
say('');

// ---- S1 --------------------------------------------------------------------
say('S1 THE CAP LEMMA OF sec.4.1, EVERY STEP RE-DERIVED');
say('   claim: sup_x |R_H(x)| <= CAP(z) = sum_{e>1} Vabs(e) e (ln e + 1) <= z^{2s} (2s ln z + 1) 6 prod_{p<z}(1+2/p)^2');
say('   (i) the sine sum, e = 2..20000');
{
  let wr = 0, we = 0, viol = 0, ws = 0, vs = 0;
  for (let e = 2; e <= 20000; e++) {
    let s = 0; for (let a = 1; a < e; a++) s += 1 / Math.sin(Math.PI * a / e);
    const b = e * (Math.log(e) + 1); if (s > b) viol++;
    if (s / b > wr) { wr = s / b; we = e; }
    let Hn = 0; const m = Math.floor((e - 1) / 2); for (let k = 1; k <= m; k++) Hn += 1 / k;
    const sharp = e * Hn + 1; if (s > sharp) vs++; ws = Math.max(ws, s / sharp);
  }
  say(`       sum_{a=1}^{e-1} 1/sin(pi a/e) <= e (ln e + 1):  violations ${viol};  worst ratio ${f(wr, 6)} at e = ${we}`);
  say(`       against the sharper e*H_{floor((e-1)/2)} + 1 that sin(pi t) >= 2t actually gives:  violations ${vs};  worst ratio ${f(ws, 6)}`);
}
say('   (ii) sum_e Vabs(e) <= sum_i (tau(q_i)-1)/q_i <= 6 prod (1+2/p)^2, and e <= z^{2s}');
say('   z    sum Vabs   sum_i (tau-1)/q   6 prod(1+2/p)^2   chain holds   #e      max e       z^{2s}      max e <= z^{2s}   #e <= z^{2s}');
for (const z of [13, 17, 19, 23, 29, 31, 37]) {
  const { t, ps } = LAT[z], rows = vtable(t, ps);
  let sv = 0; for (const r of rows) sv += r.va;
  let st = 0; for (let i = 0; i < t.n; i++) { let tau = 1; for (const p of ps) if (t.q[i] % p === 0) tau *= 2; st += (tau - 1) / t.q[i]; }
  let P2 = 1; for (const p of ps) P2 *= (1 + 2 / p);
  const B6 = 6 * P2 * P2, maxe = rows[rows.length - 1].e, z2s = Math.pow(z, 2 * S);
  say(`  ${pad(z, 2)}   ${f(sv, 6)}   ${f(st, 4)}            ${f(B6, 4)}          ${(sv <= st && st <= B6) ? 'yes' : 'NO '}         ${pad(rows.length, 5)}   ${e3(maxe)}   ${e3(z2s)}   ${maxe <= z2s ? 'yes' : 'NO '}             ${rows.length <= z2s ? 'yes' : 'NO '}`);
}
say('   (iii) CAP, u_cap, u_triv, the explicit bound, and the per-modulus check sum*_a |Theta_e(a)| |S_H(a/e)| <= Vabs(e) e (ln e + 1)');
say('   z    CAP         u_cap    u_triv   explicit bound   bound/CAP    H = z^3: exact l1   CAP/l1   viol    H = z^4: exact l1   CAP/l1   viol');
for (const z of [13, 17]) {
  const { t, ps } = LAT[z], rows = vtable(t, ps), lnz = Math.log(z);
  const CAP = capOf(rows);
  let P2 = 1; for (const p of ps) P2 *= (1 + 2 / p);
  const bound = Math.pow(z, 2 * S) * (2 * S * lnz + 1) * 6 * P2 * P2;
  const out = [];
  for (const u of [3, 4]) {
    const H = Math.round(Math.pow(z, u)); let tot = 0, viol = 0;
    for (const r of rows) {
      const e = r.e, ix = idxOf(t, e), th = thetaAll(t, e, ix); let per = 0;
      for (let a = 1; a < e; a++) { const T = th[a - 1]; if (!T) continue; const s = Math.PI * a / e; per += Math.hypot(T[0], T[1]) * Math.abs(Math.sin(H * s) / Math.sin(s)); }
      if (per > r.va * e * (Math.log(e) + 1) * (1 + 1e-9)) viol++;
      tot += per;
    }
    out.push([tot, CAP / tot, viol]);
  }
  say(`  ${pad(z, 2)}   ${f(CAP, 4)}   ${f(Math.log((CAP + 1) / t.M) / lnz, 4)}   ${f(Math.log((t.n + t.M + 1) / t.M) / lnz, 4)}   ${e3(bound)}       ${e3(bound / CAP)}    ${f(out[0][0], 4)}            ${f(out[0][1], 2)}     ${out[0][2]}       ${f(out[1][0], 4)}            ${f(out[1][1], 2)}     ${out[1][2]}`);
}
say('');

// ---- S2 --------------------------------------------------------------------
say('S2 u_cap PAST z = 47 — sec.4.1 writes "u_cap -> 2s + o(1)"; the proof gives "<= 2s + o(1)". Where does the PROVEN cap actually sit?');
say('   z    n         #e       CAP          u_cap    u_cap - beta_2   u_triv   log_z n   2s');
for (const z of [13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79]) {
  const ps = primesBelow(z), lnz = Math.log(z);
  const t = buildTerms(z, Math.pow(z, S)), rows = vtable(t, ps);
  const CAP = capOf(rows), uc = Math.log((CAP + 1) / t.M) / lnz;
  say(`  ${pad(z, 2)}   ${pad(t.n, 7)}   ${pad(rows.length, 6)}   ${e4(CAP)}   ${f(uc, 4)}   ${f(uc - BETA2, 7)}        ${f(Math.log((t.n + t.M + 1) / t.M) / lnz, 4)}   ${f(Math.log(t.n) / lnz, 4)}    ${f(2 * S, 4)}`);
  note('S2 ' + z);
}
say('   the premise under "-> 2s" is the term count. |S+|, |S-| are the Rosser supports at D = z^3; 3|S+||S-| is the pair count before the CRT filter');
say('   z      |S+|      |S-|    3|S+||S-|    log_z(3|S+||S-|)   2s');
for (const z of [13, 19, 29, 41, 53, 71, 97, 127, 173, 211]) {
  const D = Math.pow(z, S), sp = rosser(z, D, true), sm = rosser(z, D, false), pr = 3 * sp.length * sm.length;
  say(`  ${pad(z, 3)}   ${pad(sp.length, 7)}   ${pad(sm.length, 7)}   ${e4(pr)}     ${f(Math.log(pr) / Math.log(z), 4)}             ${f(2 * S, 4)}`);
}
say('');

// ---- S3 --------------------------------------------------------------------
say('S3 THE sec.2 EXPONENT TABLE AND THE sec.5 F TABLE, RECOMPUTED — AND THE TWO OBJECTS THE "ms_m" COLUMN CONFLATES');
say('   ms_b = log_z sqrt(B H), B = sum_e e Vabs(e)^2, the PROVEN Lemma V bound: this is the note\'s ms_m column');
say('   ms_t = log_z sqrt(<R_H^2>), the TRUE period mean square, exact, O(n^2), recomputed at z <= 31 only');
say('   ask_b = need - ms_b (the note\'s ask); ask_t = need - ms_t (what REC, stated against <R_H^2>^{1/2}, actually allows)');
say('   u0     z    need      ms_b      ms_t      sqrt(BH)/rms   ask_b     ask_t     gauss    gauss<=ask_b  gauss<=ask_t   union    truth    log_z(2sup/rms)   F=(HM-1)/(2sup)   log_z F');
for (const [u0, z] of [[3, 19], [3, 29], [3, 31], [3, 37], [3.5, 19], [3.5, 37], [4, 19], [4, 29], [4, 31], [4, 37], [4.25, 19], [4.25, 37]]) {
  const ps = primesBelow(z), lnz = Math.log(z), W = Pz(ps), th = thetaFn(ps), t = LAT[z].t;
  const H = Math.round(Math.pow(z, u0)); if (H >= W) continue;
  const rows = vtable(t, ps); let B = 0; for (const r of rows) B += r.e * r.va * r.va;
  const need = Math.log(H * t.M - 1) / lnz, msb = 0.5 * Math.log(B * H) / lnz;
  let rms = null; if (z <= 31) rms = Math.sqrt(moments(t, ps, H).R2);
  const mst = rms === null ? null : Math.log(rms) / lnz;
  const union = th / (2 * lnz), truth = Math.log(2 * SUP_CITED[z]) / lnz;
  const gauss = Math.log(2 * Math.sqrt(2 * th)) / lnz, F = (H * t.M - 1) / (2 * SUP_CITED[z]);
  const askb = need - msb, askt = mst === null ? null : need - mst;
  say(`  ${f(u0, 2)}   ${pad(z, 3)}   ${f(need, 4)}    ${f(msb, 4)}    ${mst === null ? '  --  ' : f(mst, 4)}    ${rms === null ? '  --   ' : f(Math.sqrt(B * H) / rms, 2)}          ${f(askb, 4)}    ${askt === null ? '  --  ' : f(askt, 4)}    ${f(gauss, 4)}   ${gauss <= askb ? 'yes' : 'NO '}           ${askt === null ? ' -- ' : (gauss <= askt ? 'yes' : 'NO ')}            ${f(union, 4)}   ${f(truth, 4)}   ${mst === null ? '  --  ' : f(truth - mst, 4)}            ${e3(F)}          ${f(Math.log(F) / lnz, 4)}`);
  note('S3 ' + z + ' ' + u0);
}
say('   (B here: ' + [19, 29, 31].map(z => { const rows = vtable(LAT[z].t, LAT[z].ps); let B = 0; for (const r of rows) B += r.e * r.va * r.va; return z + ': ' + f(B, 4); }).join(', ') + ' — the note cites B measured flat 1.3833-1.4883.)');
say('   sec.4.4: "improving B to O(1) would change ms_m by O(ln ln z / ln z) and nothing in the ask column". The three B\'s, at H = z^4:');
say('   z    B_meas = sum_e e Vabs^2   9A^2(E-1) (PROVEN)   bound/B_meas   ms_b(B_meas)   ms_b(proven)   ms_b(B = 1)   ms_b(B_meas) - ms_b(1)   ms_b(proven) - ms_b(1)');
for (const z of [13, 19, 29, 31, 37]) {
  const ps = primesBelow(z), lnz = Math.log(z), t = LAT[z].t, rows = vtable(t, ps);
  let B = 0; for (const r of rows) B += r.e * r.va * r.va;
  let A = 2.5, E = 43 / 25;
  for (const p of ps) if (p > 2) { A *= (1 + 2 / p); E *= (1 + 4 * p / ((p + 2) * (p + 2))); }
  const bd = 9 * A * A * (E - 1), H = Math.round(Math.pow(z, 4));
  const g = (b) => 0.5 * Math.log(b * H) / lnz;
  say(`  ${pad(z, 2)}   ${f(B, 6)}                 ${e3(bd)}            ${e3(bd / B)}     ${f(g(B), 4)}         ${f(g(bd), 4)}         ${f(g(1), 4)}        ${f(g(B) - g(1), 4)}                  ${f(g(bd) - g(1), 4)}`);
}
say('');
say('   the gauss column continued, gauss = log_z(2 sqrt(2 ln W)) with ln W = theta(z), no lattice needed. sec.5 asserts "gauss -> 0":');
say('   z            theta(z)      gauss     0.5 + ln(2 sqrt 2)/ln z');
for (const z of [19, 37, 101, 1009, 10007, 100003, 1000003, 10000019]) {
  const th = thetaFn(primesBelow(z)), lnz = Math.log(z);
  say(`  ${pad(z, 9)}   ${e4(th)}    ${f(Math.log(2 * Math.sqrt(2 * th)) / lnz, 4)}    ${f(0.5 + Math.log(2 * Math.SQRT2) / lnz, 4)}`);
}
say('');

// ---- S4 --------------------------------------------------------------------
say('S4 THE SLOPE, ITS s.e. PLACEMENTS, AND EVERY PRE-REGISTERED NUMBER OF measure-0830 sec.5, FROM THE SEVEN CITED SUPS ALONE');
{
  const zs = [13, 17, 19, 23, 29, 31, 37];
  const xs = zs.map(Math.log), ys = zs.map(z => Math.log(SUP_CITED[z])), r = ols(xs, ys);
  say(`   OLS ln sup|rho~| on ln z, seven points: slope ${f(r.b, 4)} +/- ${f(r.se, 4)}, intercept ${f(r.a, 4)}, residual sigma ${f(r.s, 4)}`);
  for (const u0 of [3.0, 3.5, 4.0, 4.25]) say(`     room under u0 = ${f(u0, 2)}: ${f(u0 - r.b, 4)} = ${f((u0 - r.b) / r.se, 2)} se`);
  let lo = 99, hi = -99, seLo = 9, seHi = 0;
  for (let k = 0; k < 7; k++) { const q = ols(xs.filter((_, i) => i !== k), ys.filter((_, i) => i !== k)); lo = Math.min(lo, q.b); hi = Math.max(hi, q.b); seLo = Math.min(seLo, q.se); seHi = Math.max(seHi, q.se); }
  say(`     leave-one-out: slope in [${f(lo, 4)}, ${f(hi, 4)}], se in [${f(seLo, 4)}, ${f(seHi, 4)}]`);
  say(`     estimator control on a synthetic z^2.5 truth: ${f(ols(xs, zs.map(z => 2.5 * Math.log(z))).b, 6)}`);
  const x41 = Math.log(41), pred = r.a + r.b * x41, sp = r.s * Math.sqrt(1 + 1 / r.n + (x41 - r.mx) ** 2 / r.sxx);
  say(`   forecast sup|rho~|(41) = ${f(Math.exp(pred), 2)};  1-se prediction band [${f(Math.exp(pred - sp), 2)}, ${f(Math.exp(pred + sp), 2)}];  2-se [${f(Math.exp(pred - 2 * sp), 2)}, ${f(Math.exp(pred + 2 * sp), 2)}]`);
  const solve = (want, sign) => { const g = (v) => { const q = ols(xs.concat([x41]), ys.concat([Math.log(v)])); return q.b + sign * q.se - want; }; let a = 1, b = 1e9; if (g(a) * g(b) > 0) return NaN; for (let k = 0; k < 300; k++) { const m = Math.sqrt(a * b); if (g(a) * g(m) <= 0) b = m; else a = m; } return Math.sqrt(a * b); };
  say(`   eight-point fit excludes u0 = 3.0 from below (slope - se >= 3) iff sup|rho~|(41) >= ${f(solve(3.0, -1), 1)};  from above (slope + se <= 3) iff sup|rho~|(41) <= ${f(solve(3.0, 1), 1)}`);
  { const q = ols(xs.concat([x41]), ys.concat([pred])); say(`   on the forecast the eight-point fit is ${f(q.b, 4)} +/- ${f(q.se, 4)}`); }
  const z5 = [19, 23, 29, 31, 37], r3 = ols(z5.map(Math.log), z5.map(z => Math.log(SUPR3_CITED[z])));
  const p3 = r3.a + r3.b * x41, s3 = r3.s * Math.sqrt(1 + 1 / r3.n + (x41 - r3.mx) ** 2 / r3.sxx);
  say(`   sup|R_H3| five-point slope ${f(r3.b, 4)} +/- ${f(r3.se, 4)};  forecast at 41 = ${f(Math.exp(p3), 2)}, 1-se [${f(Math.exp(p3 - s3), 2)}, ${f(Math.exp(p3 + s3), 2)}]`);
  const t41 = buildTerms(41, Math.pow(41, S)), H3 = Math.pow(41, 3), kill = H3 * t41.M - 1;
  say(`   M(41) = ${e4(t41.M)}, n(41) = ${t41.n};  H*M - 1 at H = 41^3 is ${f(kill, 3)};  the kill via |R_H| <= 2 sup needs sup|rho~|(41) >= ${f(kill / 2, 2)} = ${f((kill / 2) / Math.exp(pred), 2)}x the forecast`);
  const rmsRho41 = Math.sqrt(143.927339), lnW41 = thetaFn(primesBelow(41));
  say(`   Gaussian line: C_true = 1 at sup|rho~|(41) = rms*sqrt(2 ln W) = ${f(rmsRho41 * Math.sqrt(2 * lnW41), 2)};  C in [0.6044, 0.8412] gives sup in [${f(0.6044 * rmsRho41 * Math.sqrt(2 * lnW41), 2)}, ${f(0.8412 * rmsRho41 * Math.sqrt(2 * lnW41), 2)}], sup/rms in [${f(0.6044 * Math.sqrt(2 * lnW41), 3)}, ${f(0.8412 * Math.sqrt(2 * lnW41), 3)}]`);
  say(`   REC(3,3) allowance 41^{1.5} = ${f(Math.pow(41, 1.5), 2)};  the pilot's lower bounds give F3 <= ${f(kill / 64.416936, 3)} and sup|rho~|/rms >= ${f(70.651250 / rmsRho41, 3)}`);
  const env = [], ratios = [];
  for (const z of zs) { const m = moments(LAT[z].t, LAT[z].ps, Math.round(Math.pow(z, 3))); env.push(Math.log(2 * Math.sqrt(m.r2) * Math.sqrt(2 * thetaFn(LAT[z].ps)))); ratios.push(SUP_CITED[z] / Math.sqrt(m.r2)); }
  const re = ols(xs, env);
  say(`   F4 envelope 2 sqrt(<rho~^2>) sqrt(2 ln W): slope ${f(re.b, 4)} +/- ${f(re.se, 4)};  sup/rms(rho~) over z = 13..37: ${ratios.map(v => f(v, 3)).join(', ')}`);
  say(`   octaves: log2(37/13) = ${f(Math.log2(37 / 13), 4)};  log2(41/13) = ${f(Math.log2(41 / 13), 4)}`);
}
say('');

// ---- S5 --------------------------------------------------------------------
say('S5 THE sec.4.3 REDUCTION — CAP restricted to e <= z^{u0-delta} against H*M - 1 at H = z^{u0}, (u0, delta) = (4, 0.5)');
say('   z    CAP          CAP(e <= z^3.5)   share    H*M - 1      CAP_small/(HM-1)   CAP(e > z^4)/CAP   P(y) lever at y = ceil(4 ln z)');
for (const z of [13, 17, 19, 23, 29, 31, 37]) {
  const { t, ps } = LAT[z], rows = vtable(t, ps), CAP = capOf(rows);
  const X = Math.pow(z, 3.5), H = Math.round(Math.pow(z, 4));
  const small = capOf(rows, undefined, X), above = capOf(rows, H, undefined);
  const y = Math.ceil(4 * Math.log(z)), Py = Pz(primesBelow(y));
  let killed = 0; for (const r of rows) if (Py % r.e === 0) killed += r.va * r.e * (Math.log(r.e) + 1);
  say(`  ${pad(z, 2)}   ${e4(CAP)}   ${e4(small)}       ${f(100 * small / CAP, 2)}%   ${e4(H * t.M - 1)}   ${f(small / (H * t.M - 1), 4)}             ${f(100 * above / CAP, 2)}%             y = ${pad(y, 2)}   ${f(100 * killed / CAP, 3)}%`);
}
say('');

// ---- S6 --------------------------------------------------------------------
say('S6 THE REFLECTION IDENTITY rho~(W-3-y) = -rho~(y) AT EVERY POSITION (measure-0830 sec.2(a), marked PROVEN)');
say('   z    W        max_y |rho~(W-3-y) + rho~(y)|   max_x |R_H(W-3-H-x) - R_H(x)|, H = z^3   L = ceil(W/2)+z^4+4: 2L >= W-2   2L - (W-2)');
for (const z of [13, 17, 19]) {
  const { t, ps } = LAT[z], W = Pz(ps), arr = new Float64Array(W), K = new Int32Array(W);
  for (let i = 0; i < t.n; i++) { const q = t.q[i], w = t.w[i]; for (let y = t.c[i] % q; y < W; y += q) K[y] += w; }
  let v = rhoT(t, 0); arr[0] = v;
  for (let y = 1; y < W; y++) { v += t.M - K[y]; arr[y] = v; }
  let d1 = 0; for (let y = 0; y < W; y++) { const m = ((W - 3 - y) % W + W) % W; d1 = Math.max(d1, Math.abs(arr[m] + arr[y])); }
  const H = Math.round(Math.pow(z, 3)), R = (x) => { const a = ((x % W) + W) % W, b = (((x + H) % W) + W) % W; return arr[a] - arr[b]; };
  let d2 = 0; for (let x = 0; x < W; x++) d2 = Math.max(d2, Math.abs(R(W - 3 - H - x) - R(x)));
  const L = Math.ceil(W / 2) + Math.round(Math.pow(z, 4)) + 4;
  say(`  ${pad(z, 2)}   ${pad(W, 7)}  ${e3(d1)}                        ${e3(d2)}                          ${2 * L >= W - 2 ? 'yes' : 'NO '}                      ${2 * L - (W - 2)}`);
}
say('');

// ---- S7 --------------------------------------------------------------------
say('S7 AN INDEPENDENT FULL-PERIOD WALK — sup|rho~| against the cited column, sup|R_H| at H = z^3 against measure-0830 sec.3 S1');
say('   z    W            sup|rho~| here   cited        |diff|      sup|R_H3| here   cited        |diff|      sup R3 / sup rho~   argmax');
for (const z of [13, 17, 19, 23, 29]) {
  const ps = primesBelow(z), W = Pz(ps), t = buildTerms(z, Math.pow(z, S));
  const H = Math.round(Math.pow(z, 3)), B = Math.min(W, 1 << 22);
  const K = new Int32Array(B), ring = new Float64Array(H), head = new Float64Array(H);
  let sup = 0, argmax = 0, supR = 0;
  for (let a = 0; a < W; a += B) {
    const len = Math.min(B, W - a); K.fill(0, 0, len);
    for (let i = 0; i < t.n; i++) { const q = t.q[i], w = t.w[i]; let y0 = (t.c[i] - a) % q; if (y0 < 0) y0 += q; for (let y = y0; y < len; y += q) K[y] += w; }
    let v = rhoT(t, a);
    for (let k = 0; k < len; k++) {
      const y = a + k; if (k > 0) v += t.M - K[k];
      const av = v < 0 ? -v : v; if (av > sup) { sup = av; argmax = y; }
      const slot = y % H;
      if (y < H) head[y] = v; else { const r = Math.abs(ring[slot] - v); if (r > supR) supR = r; }
      ring[slot] = v;
    }
    note('S7 z=' + z + ' at ' + a);
  }
  for (let k = 0; k < H; k++) { const r = Math.abs(ring[(W - H + k) % H] - head[k]); if (r > supR) supR = r; }
  const cs = SUP_CITED[z], cr = SUPR3_CITED[z];
  say(`  ${pad(z, 2)}   ${pad(W, 10)}   ${f(sup, 6)}       ${f(cs, 6)}    ${e3(Math.abs(sup - cs))}   ${f(supR, 6)}        ${cr ? f(cr, 6) : '   --   '}    ${cr ? e3(Math.abs(supR - cr)) : '  --   '}   ${f(supR / sup, 4)}              ${argmax}`);
}
say('');

// ---- S8 --------------------------------------------------------------------
say('S8 THE TWO CROSSOVER CLAIMS THAT verify-0830 PUT INTO lemmaV-sup-extension.md LINES 485-486 AND 508-516');
{
  let z223 = null;
  for (const z of primesBelow(4000)) { if (z < 13) continue; if (primesBelow(z).length * Math.log(2) > 2 * S * Math.log(z)) { z223 = z; break; } }
  say(`   first prime z with 2^pi(z) > z^{2s}, pi counting primes STRICTLY below z (the corpus convention): z = ${z223}`);
  say('   z     pi(z)   2^pi(z)     z^{2s}      smaller of the two');
  for (const z of [47, 197, 199, 211, 223, 227]) { const k = primesBelow(z).length; say(`  ${pad(z, 4)}   ${pad(k, 5)}   ${e3(Math.pow(2, k))}   ${e3(Math.pow(z, 6))}   ${Math.pow(2, k) < Math.pow(z, 6) ? '2^pi(z)' : 'z^{2s}'}`); }
  say('   but the modulus count is bounded by z^{2s} at EVERY level, so "polynomially many" is true from z = 13 on, not from 223 on:');
  say('   z    #e measured   z^{2s}      #e / z^{2s}');
  for (const z of [13, 23, 37, 47]) { const rows = vtable(buildTerms(z, Math.pow(z, S)), primesBelow(z)); say(`  ${pad(z, 2)}   ${pad(rows.length, 6)}        ${e3(Math.pow(z, 6))}   ${e3(rows.length / Math.pow(z, 6))}`); }
  say('   the C^pi(z) crossover, with A made explicit (the applied sentence uses A = 1 silently):');
  const AS = [['1 (the applied sentence)', 1], ['Ssat(47)/C^pi(47)', SSAT_CITED[47] / Math.pow(C_LSE, primesBelow(47).length)], ['Ssat(13)/C^pi(13)', SSAT_CITED[13] / Math.pow(C_LSE, primesBelow(13).length)]];
  say('   A                          value        first prime z with A C^pi(z) > z^{2s}(2s ln z + 1) 6 prod(1+2/p)^2, C = 2.0516');
  for (const [nm, A] of AS) {
    let zc = null;
    for (const z of primesBelow(6000)) {
      if (z < 13) continue;
      const ps = primesBelow(z); let P2 = 1; for (const p of ps) P2 *= (1 + 2 / p);
      const lnB = 2 * S * Math.log(z) + Math.log(2 * S * Math.log(z) + 1) + Math.log(6) + 2 * Math.log(P2);
      if (Math.log(A) + ps.length * Math.log(C_LSE) > lnB) { zc = z; break; }
    }
    say(`   ${nm.padEnd(25)}  ${e4(A)}   z = ${zc}`);
  }
  const rows47 = vtable(buildTerms(47, Math.pow(47, S)), primesBelow(47));
  say(`   count at z = 47: every e | q_i = ${rows47.length};  with Vabs(e) > 0 = ${rows47.filter(r => r.va > 0).length};  LSE's cited #records = ${RECS_CITED[47]};  2^pi(47) - 1 = ${Math.pow(2, primesBelow(47).length) - 1}`);
  let bad = [];
  for (const z of ZALL) { const rows = vtable(buildTerms(z, Math.pow(z, S)), primesBelow(z)); const nz = rows.filter(r => r.va > 0).length; if (nz !== RECS_CITED[z]) bad.push(z + ':' + nz + ' vs ' + RECS_CITED[z]); }
  say(`   #{e : Vabs(e) > 0} against LSE's #records at all ten levels z = 13..47: ${bad.length ? 'MISMATCH ' + bad.join(', ') : 'equal at all ten'}`);
}
say('');

// ---- S9 --------------------------------------------------------------------
say('S9 THE COST ARITHMETIC OF measure-0830 sec.4 AND sec.6, RECHECKED ON ITS OWN MEASURED RATES');
{
  const Whalf = 3710374718933, Wfull = 7420738134810;
  const rows = [
    ['naive, full period, 10 workers at the gain 36.6/4.89', Wfull * 69.8e-9 / (36.6 / 4.89), '19 h'],
    ['table-reseed + reflection at the z = 37 fleet rate 4.89 ns', Whalf * 4.89e-9, '5.0 h of walking'],
    ['  the same plus three table builds of 452.8 s', Whalf * 4.89e-9 + 3 * 452.8, 'about 5.4 h'],
    ['table-legacy + reflection at 2.23 ns plus three builds', Whalf * 2.23e-9 + 3 * 452.8, 'about 2.7 h'],
    ['eleven segments at the z = 41 pilot rate', 11 * (1398.6 + 164.6), '4.8 h'],
    ['one segment on this machine', 3.092e11 * 4.89e-9 + 452.8, 'about 33 min'],
    ['the box: 11 x 33 min x (10/16) / 0.7', 11 * (3.092e11 * 4.89e-9 + 452.8) * (10 / 16) / 0.7, 'roughly 5.4 h']
  ];
  say('   line                                                            recomputed     the note says');
  for (const [k, v, c] of rows) say(`   ${k.padEnd(60)}  ${f(v / 3600, 3)} h      ${c}`);
  say(`   the pilot rate: 1398.6 s / 3.092e11 positions = ${f(1398.6 / 3.092e11 * 1e9, 3)} ns`);
  say(`   12 x 309200483133 = ${12 * 309200483133}, against the plan's half range plus wrap 3710374718933 (difference ${12 * 309200483133 - Whalf})`);
  say(`   half range plus wrap as a share of the full period: ${f(100 * Whalf / Wfull, 4)}%`);
  say(`   the segment mean square 144.009169 against the full-period closed form 143.927339: ${f(100 * (144.009169 / 143.927339 - 1), 4)}% apart`);
  say(`   sup|R_H3| / sup|rho~| at z = 19..37 from the two cited columns: ` + [19, 23, 29, 31, 37].map(z => f(SUPR3_CITED[z] / SUP_CITED[z], 4)).join(', '));
  say(`   so the factor 2 of |R_H| <= 2 sup|rho~| is loose by ` + f(2 / Math.max(...[19, 23, 29, 31, 37].map(z => SUPR3_CITED[z] / SUP_CITED[z])), 3) + ' to ' + f(2 / Math.min(...[19, 23, 29, 31, 37].map(z => SUPR3_CITED[z] / SUP_CITED[z])), 3) + 'x');
}
say('');
say('DONE');
}
main();

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js ~/Files/Git/primeoire/research/history/staging/redteam-0830-rml.js
//   invocation:  node ~/Files/Git/primeoire/research/history/staging/redteam-0830-rml.js
//   code-sha256: 1bddce7e2722ca5a973d5cd2f6074e459f64724ecef38d5237a1360a3df42088
//   out-sha256:  0735420c75e353aba0cd7d924eb30ad95bd697cb190445f77d207f841696839f
//   body-lines:  185
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     698.0 s
// ============================================================================
// redteam-0830-rml.js — independent re-derivation, s = 3.0, beta_2 = 4.26645
//
// S0 THE LATTICE REBUILT INDEPENDENTLY; THE SWAP SYMMETRY; THE L5 DECOMPOSITION
//    targets: attack-0829n-rml-proof.md sec.1 and sec.4.1 (L5); measure-0830 sec.2(a) ("the three-entry COMB list is symmetric")
//    z    n(mine)  n(repo)  M(mine)      |dM|        same multiset   swap-closed   c(swap) = -2-c mod q   max |L5 - direct|
//   13       852      852  5.5844e-2   0.000e+0   yes             yes           yes                    1.644e-12
//   17      2236     2236  4.6986e-2   0.000e+0   yes             yes           yes                    8.293e-12
//   19      4764     4764  3.9598e-2   0.000e+0   yes             yes           yes                      --
//   23      9636     9636  3.4169e-2   0.000e+0   yes             yes           yes                      --
//   29     20700    20700  3.1843e-2   0.000e+0   yes             yes           yes                      --
//   31     35868    35868  2.9253e-2   0.000e+0   yes             yes           yes                      --
//   37     76484    76484  2.8057e-2   0.000e+0   yes             yes           yes                      --
//    (same multiset = the two implementations agree on the multiset of (w, q, c). swap-closed and c(swap) are exactly the two hypotheses
//     the reflection identity needs. L5 = R_H rebuilt from sum_e sum*_a Theta_e(a) S_H(a/e) e(ax/e) against the direct sawtooth sum at five x.)
//
// S1 THE CAP LEMMA OF sec.4.1, EVERY STEP RE-DERIVED
//    claim: sup_x |R_H(x)| <= CAP(z) = sum_{e>1} Vabs(e) e (ln e + 1) <= z^{2s} (2s ln z + 1) 6 prod_{p<z}(1+2/p)^2
//    (i) the sine sum, e = 2..20000
//        sum_{a=1}^{e-1} 1/sin(pi a/e) <= e (ln e + 1):  violations 0;  worst ratio 0.585568 at e = 20000
//        against the sharper e*H_{floor((e-1)/2)} + 1 that sin(pi t) >= 2t actually gives:  violations 0;  worst ratio 1.000000
//    (ii) sum_e Vabs(e) <= sum_i (tau(q_i)-1)/q_i <= 6 prod (1+2/p)^2, and e <= z^{2s}
//    z    sum Vabs   sum_i (tau-1)/q   6 prod(1+2/p)^2   chain holds   #e      max e       z^{2s}      max e <= z^{2s}   #e <= z^{2s}
//   13   0.944156   79.0827            301.6860          yes            31   2.310e+3   4.827e+6   yes             yes
//   17   0.953014   106.3384            401.6529          yes            63   3.003e+4   2.414e+7   yes             yes
//   19   0.960966   130.2565            501.7187          yes           127   5.105e+5   4.705e+7   yes             yes
//   23   0.967713   156.9928            612.9029          yes           243   8.818e+5   1.480e+8   yes             yes
//   29   0.970014   186.7533            724.1291          yes           467   3.432e+6   5.948e+8   yes             yes
//   31   0.974240   210.3780            827.4531          yes           827   9.700e+6   8.875e+8   yes             yes
//   37   0.974695   242.8556            937.6654          yes          1527   3.187e+7   2.566e+9   yes             yes
//    (iii) CAP, u_cap, u_triv, the explicit bound, and the per-modulus check sum*_a |Theta_e(a)| |S_H(a/e)| <= Vabs(e) e (ln e + 1)
//    z    CAP         u_cap    u_triv   explicit bound   bound/CAP    H = z^3: exact l1   CAP/l1   viol    H = z^4: exact l1   CAP/l1   viol
//   13   350.4593   3.4103   3.7560   2.387e+10       6.810e+7    12.2446            28.62     0       11.4257            30.67     0
//   17   1209.9555   3.5850   3.8016   1.745e+11       1.442e+8    32.8523            36.83     0       32.7589            36.94     0
//
// S2 u_cap PAST z = 47 — sec.4.1 writes "u_cap -> 2s + o(1)"; the proof gives "<= 2s + o(1)". Where does the PROVEN cap actually sit?
//    z    n         #e       CAP          u_cap    u_cap - beta_2   u_triv   log_z n   2s
//   13       852       31   3.5046e+2   3.4103   -0.8561354        3.7560   2.6307    6.0000
//   17      2236       63   1.2100e+3   3.5850   -0.6814523        3.8016   2.7222    6.0000
//   19      4764      127   2.6963e+3   3.7797   -0.4867905        3.9729   2.8762    6.0000
//   23      9636      243   5.2959e+3   3.8116   -0.4548294        4.0025   2.9256    6.0000
//   29     20700      467   1.1820e+4   3.8086   -0.4578779        3.9750   2.9513    6.0000
//   31     35868      827   2.2121e+4   3.9418   -0.3246404        4.0825   3.0541    6.0000
//   37     76484     1527   6.5128e+4   4.0593   -0.2071916        4.1038   3.1141    6.0000
//   41    125884     2535   1.1857e+5   4.1264   -0.1400218        4.1425   3.1622    6.0000
//   43    183084     3879   1.7643e+5   4.1987   -0.0677384        4.2086   3.2218    6.0000
//   47    293980     6119   3.1380e+5   4.2652   -0.0012736        4.2482   3.2703    6.0000
//   53    466340     9553   5.1898e+5   4.2744   0.0079820        4.2475   3.2876    6.0000
//   59    774812    15385   9.3390e+5   4.3138   0.0473242        4.2680   3.3256    6.0000
//   61   1025812    21111   1.2904e+6   4.3689   0.1024307        4.3131   3.3669    6.0000
//   67   1574044    31019   2.1587e+6   4.4007   0.1342572        4.3256   3.3936    6.0000
//   71   2148388    42947   3.0495e+6   4.4303   0.1638999        4.3482   3.4204    6.0000
//   73   2712324    56703   4.0182e+6   4.4756   0.2091653        4.3840   3.4526    6.0000
//   79   3806396    78049   5.9019e+6   4.4891   0.2226132        4.3887   3.4678    6.0000
//    the premise under "-> 2s" is the term count. |S+|, |S-| are the Rosser supports at D = z^3; 3|S+||S-| is the pair count before the CRT filter
//    z      |S+|      |S-|    3|S+||S-|    log_z(3|S+||S-|)   2s
//    13        28        24   2.0160e+3     2.9665             6.0000
//    19        64        58   1.1136e+4     3.1646             6.0000
//    29       144       114   4.9248e+4     3.2087             6.0000
//    41       344       294   3.0341e+5     3.3991             6.0000
//    53       674       512   1.0353e+6     3.4885             6.0000
//    71      1412      1124   4.7613e+6     3.6071             6.0000
//    97      2952      2314   2.0493e+7     3.6801             6.0000
//   127      5932      4498   8.0046e+7     3.7567             6.0000
//   173     13348     10300   4.1245e+8     3.8495             6.0000
//   211     22596     17404   1.1798e+9     3.9031             6.0000
//
// S3 THE sec.2 EXPONENT TABLE AND THE sec.5 F TABLE, RECOMPUTED — AND THE TWO OBJECTS THE "ms_m" COLUMN CONFLATES
//    ms_b = log_z sqrt(B H), B = sum_e e Vabs(e)^2, the PROVEN Lemma V bound: this is the note's ms_m column
//    ms_t = log_z sqrt(<R_H^2>), the TRUE period mean square, exact, O(n^2), recomputed at z <= 31 only
//    ask_b = need - ms_b (the note's ask); ask_t = need - ms_t (what REC, stated against <R_H^2>^{1/2}, actually allows)
//    u0     z    need      ms_b      ms_t      sqrt(BH)/rms   ask_b     ask_t     gauss    gauss<=ask_b  gauss<=ask_t   union    truth    log_z(2sup/rms)   F=(HM-1)/(2sup)   log_z F
//   3.00    19   1.9021    1.5613    0.3162    39.10          0.3408    1.5859    0.7905   NO            yes            2.2319   0.9873   0.6712            1.478e+1          0.9148
//   3.00    29   1.9760    1.5568    0.4567    40.63          0.4192    1.5193    0.7477   NO            yes            2.8544   1.0626   0.6059            2.166e+1          0.9134
//   3.00    31   1.9712    1.5567    0.5089    36.53          0.4145    1.4623    0.7567   NO            yes            3.2892   1.1735   0.6646            1.548e+1          0.7977
//   3.00    37   2.0102    1.5551      --        --             0.4551      --      0.7392   NO             --             3.6036   1.2874     --              1.360e+1          0.7228
//   3.50    19   2.4031    1.8113    0.3480    74.33          0.5918    2.0550    0.7905   NO            yes            2.2319   0.9873   0.6393            6.462e+1          1.4157
//   3.50    37   2.5103    1.8051      --        --             0.7053      --      0.7392   NO             --             3.6036   1.2874     --              8.276e+1          1.2230
//   4.00    19   2.9033    2.0613    0.4245    123.88          0.8420    2.4787    0.7905   yes           yes            2.2319   0.9873   0.5628            2.819e+2          1.9160
//   4.00    29   2.9763    2.0568    0.4942    192.83          0.9195    2.4822    0.7477   yes           yes            2.8544   1.0626   0.5684            6.290e+2          1.9137
//   4.00    31   2.9715    2.0567    0.5732    163.12          0.9148    2.3983    0.7567   yes           yes            3.2892   1.1735   0.6003            4.803e+2          1.7980
//   4.00    37   3.0104    2.0551      --        --             0.9553      --      0.7392   yes            --             3.6036   1.2874     --              5.035e+2          1.7230
//   4.25    19   3.1533    2.1863    0.3861    200.45          0.9670    2.7672    0.7905   yes           yes            2.2319   0.9873   0.6012            5.885e+2          2.1660
//   4.25    37   3.2604    2.1801      --        --             1.0803      --      0.7392   yes            --             3.6036   1.2874     --              1.242e+3          1.9730
//    (B here: 19: 1.4348, 29: 1.4660, 31: 1.4764 — the note cites B measured flat 1.3833-1.4883.)
//    sec.4.4: "improving B to O(1) would change ms_m by O(ln ln z / ln z) and nothing in the ask column". The three B's, at H = z^4:
//    z    B_meas = sum_e e Vabs^2   9A^2(E-1) (PROVEN)   bound/B_meas   ms_b(B_meas)   ms_b(proven)   ms_b(B = 1)   ms_b(B_meas) - ms_b(1)   ms_b(proven) - ms_b(1)
//   13   1.383263                 3.592e+3            2.597e+3     2.0632         3.5958         2.0000        0.0632                  1.5958
//   19   1.434774                 9.283e+3            6.470e+3     2.0613         3.5514         2.0000        0.0613                  1.5514
//   29   1.465995                 1.861e+4            1.269e+4     2.0568         3.4598         2.0000        0.0568                  1.4598
//   31   1.476418                 2.406e+4            1.630e+4     2.0567         3.4689         2.0000        0.0567                  1.4689
//   37   1.488330                 3.062e+4            2.057e+4     2.0551         3.4303         2.0000        0.0551                  1.4303
//
//    the gauss column continued, gauss = log_z(2 sqrt(2 ln W)) with ln W = theta(z), no lattice needed. sec.5 asserts "gauss -> 0":
//    z            theta(z)      gauss     0.5 + ln(2 sqrt 2)/ln z
//          19   1.3143e+1    0.7905    0.8531
//          37   2.6024e+1    0.7392    0.7879
//         101   8.3728e+1    0.7050    0.7253
//        1009   9.5625e+2    0.6464    0.6503
//       10007   9.8960e+3    0.6123    0.6129
//      100003   9.9685e+4    0.5902    0.5903
//     1000003   9.9848e+5    0.5752    0.5753
//    10000019   9.9952e+6    0.5645    0.5645
//
// S4 THE SLOPE, ITS s.e. PLACEMENTS, AND EVERY PRE-REGISTERED NUMBER OF measure-0830 sec.5, FROM THE SEVEN CITED SUPS ALONE
//    OLS ln sup|rho~| on ln z, seven points: slope 2.7660 +/- 0.2120, intercept -6.1762, residual sigma 0.1922
//      room under u0 = 3.00: 0.2340 = 1.10 se
//      room under u0 = 3.50: 0.7340 = 3.46 se
//      room under u0 = 4.00: 1.2340 = 5.82 se
//      room under u0 = 4.25: 1.4840 = 7.00 se
//      leave-one-out: slope in [2.6180, 2.8598], se in [0.1852, 0.3156]
//      estimator control on a synthetic z^2.5 truth: 2.500000
//    forecast sup|rho~|(41) = 60.07;  1-se prediction band [47.25, 76.37];  2-se [37.16, 97.11]
//    eight-point fit excludes u0 = 3.0 from below (slope - se >= 3) iff sup|rho~|(41) >= 342.8;  from above (slope + se <= 3) iff sup|rho~|(41) <= 69.0
//    on the forecast the eight-point fit is 2.7660 +/- 0.1656
//    sup|R_H3| five-point slope 2.4522 +/- 0.2095;  forecast at 41 = 58.26, 1-se [50.24, 67.56]
//    M(41) = 2.6239e-2, n(41) = 125884;  H*M - 1 at H = 41^3 is 1807.417;  the kill via |R_H| <= 2 sup needs sup|rho~|(41) >= 903.71 = 15.04x the forecast
//    Gaussian line: C_true = 1 at sup|rho~|(41) = rms*sqrt(2 ln W) = 92.36;  C in [0.6044, 0.8412] gives sup in [55.82, 77.69], sup/rms in [4.653, 6.476]
//    REC(3,3) allowance 41^{1.5} = 262.53;  the pilot's lower bounds give F3 <= 28.058 and sup|rho~|/rms >= 5.889
//    F4 envelope 2 sqrt(<rho~^2>) sqrt(2 ln W): slope 2.5111 +/- 0.1775;  sup/rms(rho~) over z = 13..37: 2.504, 2.745, 4.113, 4.285, 4.855, 5.654, 5.642
//    octaves: log2(37/13) = 1.5090;  log2(41/13) = 1.6571
//
// S5 THE sec.4.3 REDUCTION — CAP restricted to e <= z^{u0-delta} against H*M - 1 at H = z^{u0}, (u0, delta) = (4, 0.5)
//    z    CAP          CAP(e <= z^3.5)   share    H*M - 1      CAP_small/(HM-1)   CAP(e > z^4)/CAP   P(y) lever at y = ceil(4 ln z)
//   13   3.5046e+2   3.5046e+2       100.00%   1.5940e+3   0.2199             0.00%             y = 11   31.645%
//   17   1.2100e+3   1.0742e+3       88.78%   3.9233e+3   0.2738             0.00%             y = 12   34.380%
//   19   2.6963e+3   2.0371e+3       75.55%   5.1594e+3   0.3948             6.58%             y = 12   14.255%
//   23   5.2959e+3   4.2084e+3       79.46%   9.5610e+3   0.4402             7.59%             y = 13   6.921%
//   29   1.1820e+4   8.7481e+3       74.01%   2.2521e+4   0.3884             6.11%             y = 14   11.731%
//   31   2.2121e+4   1.3687e+4       61.87%   2.7014e+4   0.5067             12.13%             y = 14   6.031%
//   37   6.5128e+4   2.8110e+4       43.16%   5.2582e+4   0.5346             27.26%             y = 15   1.713%
//
// S6 THE REFLECTION IDENTITY rho~(W-3-y) = -rho~(y) AT EVERY POSITION (measure-0830 sec.2(a), marked PROVEN)
//    z    W        max_y |rho~(W-3-y) + rho~(y)|   max_x |R_H(W-3-H-x) - R_H(x)|, H = z^3   L = ceil(W/2)+z^4+4: 2L >= W-2   2L - (W-2)
//   13      2310  1.875e-12                        9.406e-13                          yes                      57132
//   17     30030  4.151e-11                        2.076e-11                          yes                      167052
//   19    510510  1.675e-10                        8.376e-11                          yes                      260652
//
// S7 AN INDEPENDENT FULL-PERIOD WALK — sup|rho~| against the cited column, sup|R_H| at H = z^3 against measure-0830 sec.3 S1
//    z    W            sup|rho~| here   cited        |diff|      sup|R_H3| here   cited        |diff|      sup R3 / sup rho~   argmax
//   13         2310   2.620130       2.620130    1.299e-7   3.310390           --         --      1.2634              1666
//   17        30030   4.336647       4.336647    3.133e-7   5.843923           --         --      1.3476              27088
//   19       510510   9.152470       9.152470    7.902e-8   8.600331        8.600331    4.151e-8   0.9397              458830
//   23      9699690   12.106173       12.106173    3.767e-7   15.737099        15.737099    4.948e-7   1.2999              3011380
//   29    223092870   17.902491       17.902491    1.453e-7   21.611574        21.611574    5.439e-8   1.2072              49427920
//
// S8 THE TWO CROSSOVER CLAIMS THAT verify-0830 PUT INTO lemmaV-sup-extension.md LINES 485-486 AND 508-516
//    first prime z with 2^pi(z) > z^{2s}, pi counting primes STRICTLY below z (the corpus convention): z = 223
//    z     pi(z)   2^pi(z)     z^{2s}      smaller of the two
//     47      14   1.638e+4   1.078e+10   2^pi(z)
//    197      44   1.759e+13   5.845e+13   2^pi(z)
//    199      45   3.518e+13   6.210e+13   2^pi(z)
//    211      46   7.037e+13   8.825e+13   2^pi(z)
//    223      47   1.407e+14   1.230e+14   z^{2s}
//    227      48   2.815e+14   1.368e+14   z^{2s}
//    but the modulus count is bounded by z^{2s} at EVERY level, so "polynomially many" is true from z = 13 on, not from 223 on:
//    z    #e measured   z^{2s}      #e / z^{2s}
//   13       31        4.827e+6   6.422e-6
//   23      243        1.480e+8   1.641e-6
//   37     1527        2.566e+9   5.952e-7
//   47     6119        1.078e+10   5.677e-7
//    the C^pi(z) crossover, with A made explicit (the applied sentence uses A = 1 silently):
//    A                          value        first prime z with A C^pi(z) > z^{2s}(2s ln z + 1) 6 prod(1+2/p)^2, C = 2.0516
//    1 (the applied sentence)   1.0000e+0   z = 331
//    Ssat(47)/C^pi(47)          5.3934e-1   z = 337
//    Ssat(13)/C^pi(13)          5.3931e-1   z = 337
//    count at z = 47: every e | q_i = 6119;  with Vabs(e) > 0 = 6035;  LSE's cited #records = 6035;  2^pi(47) - 1 = 16383
//    #{e : Vabs(e) > 0} against LSE's #records at all ten levels z = 13..47: equal at all ten
//
// S9 THE COST ARITHMETIC OF measure-0830 sec.4 AND sec.6, RECHECKED ON ITS OWN MEASURED RATES
//    line                                                            recomputed     the note says
//    naive, full period, 10 workers at the gain 36.6/4.89          19.223 h      19 h
//    table-reseed + reflection at the z = 37 fleet rate 4.89 ns    5.040 h      5.0 h of walking
//      the same plus three table builds of 452.8 s                 5.417 h      about 5.4 h
//    table-legacy + reflection at 2.23 ns plus three builds        2.676 h      about 2.7 h
//    eleven segments at the z = 41 pilot rate                      4.776 h      4.8 h
//    one segment on this machine                                   0.546 h      about 33 min
//    the box: 11 x 33 min x (10/16) / 0.7                          5.360 h      roughly 5.4 h
//    the pilot rate: 1398.6 s / 3.092e11 positions = 4.523 ns
//    12 x 309200483133 = 3710405797596, against the plan's half range plus wrap 3710374718933 (difference 31078663)
//    half range plus wrap as a share of the full period: 50.0001%
//    the segment mean square 144.009169 against the full-period closed form 143.927339: 0.0569% apart
//    sup|R_H3| / sup|rho~| at z = 19..37 from the two cited columns: 0.9397, 1.2999, 1.2072, 1.0503, 0.9161
//    so the factor 2 of |R_H| <= 2 sup|rho~| is loose by 1.539 to 2.183x
//
// DONE
// ============================================================================
// READINGS
//
