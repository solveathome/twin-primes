#!/usr/bin/env node
'use strict';
// ============================================================================
// verify-0830-usup-convention.js — are lemmaV-sup-extension.md's u_sup/u_sat
//   and attack-0829n-rml-proof.md sec.4.1's CAP(z) bounds on the SAME object
//   (same level D, same modulus set, same weights, same normalisation), so
//   that the sec.4.1 correction-in-passing applies, or on different ones?
//   Companion to research/history/staging/verify-0830-usup-convention.md.
//   STAGING GRADE. Adjudication only; nothing here moves an exponent.
// ============================================================================
// THE TWO CODE PATHS, both imported and never recopied:
//   LSE  lemmaV-sup-extension.js:93 S_LEVEL = 3.0 -> lemmaV-parseval.js
//        spectralRecords(z, s): REPO.buildTerms(z, round(z^s)); records e | P(z)
//        with at least one V(e1,e2) != 0; va = sum |V(e1,e2)| (Theorem B).
//   RML  attack-0829n-rml-proof.js:64,143 S = 3.0, L.buildTerms(z, z^S);
//        lattice(): every e | q_i; vabs = sum |V(e1,e2)|; CAP = sum vabs e (ln e+1).
// WHAT IS COMPUTED.
//  S0 THE LATTICES, side by side at z = 13..23: D, n, M, the modulus sets
//     (RML's every-e vs LSE's nonzero-V records), max e, and the per-modulus
//     Vabs agreement on the common set.
//  S1 THE OBJECTS, evaluated at z = 13..19 on the RML lattice: Ssat (LSE's
//     H-free object) computed directly from |Theta_e(a)| over every primitive
//     frequency, against LSE's own supBoundTable Ssat and the CITED Ssat;
//     CAP against the CITED CAP; Ssat <= CAP; u_sat against u_cap.
//  S2 THE FULL-LEVEL ALTERNATIVE (the brief's suspected reading): the same
//     construction with every Rosser condition vacuous (D = P(z) z^3, both
//     supports = all divisors of P(z)), at z = 13, 17. If LSE's cited numbers
//     matched THIS column the objects would differ; they are printed side by
//     side with S1's.
//  S3 THE CAP AGAINST u_sat AT ALL TEN CITED LEVELS (z = 13..47), the H-free
//     comparison sec.4.1 did not run (it compared against u_sup, z <= 37), plus
//     the arithmetic of the two growth shapes: 2^{pi(z)} against z^{2s} (the
//     modulus-count bound) and C^{pi(z)} at C = 2.0516 (LSE sec.4's per-prime
//     factor) against the proven cap z^{2s}(2s ln z + 1) 6 prod(1+2/p)^2.
// CITED CONSTANTS (inputs, each with its source line):
//   Ssat, u_sat, #recs at z = 13..47: lemmaV-sup-extension.md lines 168-177,
//     202-211 (research/lemmaV-sup-extension.js S2, S3).
//   CAP at z = 13, 17 and #moduli at z = 13..37: attack-0829n-rml-proof.js
//     OUTPUT S2 (lines 331-344 of that file).
//   C = 2.0516: lemmaV-sup-extension.md line 442.
//   node research/history/staging/verify-0830-usup-convention.js   (~2 min)
// ============================================================================
const path = require('path');
const L = require(path.join(__dirname, '..', '..', 'sift-limit-lemmaV.js'));
const A1 = require(path.join(__dirname, '..', '..', 'lemmaV-parseval.js'));

const S = 3.0;
const ZS_LATTICE = [13, 17, 19, 23];
const ZS_EXACT = [13, 17, 19];
const ZS_ALL = [13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
const SSAT_CITED = { 13: 1.9602e+1, 17: 5.0314e+1, 19: 1.2006e+2, 23: 2.4250e+2, 29: 5.2311e+2, 31: 9.5263e+2, 37: 2.5727e+3, 41: 4.6495e+3, 43: 7.1072e+3, 47: 1.2623e+4 };
const USAT_CITED = { 13: 2.2850, 17: 2.4623, 19: 2.7228, 23: 2.8281, 29: 2.8827, 31: 3.0259, 37: 3.1644, 41: 3.2543, 43: 3.3448, 47: 3.4306 };
const RECS_CITED = { 13: 31, 17: 63, 19: 127, 23: 243, 29: 448, 31: 763, 37: 1494, 41: 2501, 43: 3814, 47: 6035 };
const MODULI_CITED = { 13: 31, 17: 63, 19: 127, 23: 243, 29: 467, 31: 827, 37: 1527 };
const CAP_CITED = { 13: 350.4593, 17: 1209.9555 };
const C_CITED = 2.0516;

function primesBelow(n) { const s = new Uint8Array(n), o = []; for (let i = 2; i < n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j < n; j += i) s[j] = 1; } } return o; }
function gcd(a, b) { while (b) { const t = a % b; a = b; b = t; } return a; }
const f = (x, d) => Number(x).toFixed(d);
const e3 = (x) => Number(x).toExponential(3);
const e4 = (x) => Number(x).toExponential(4);
const pad = (s, n) => String(s).padStart(n);

// RML's lattice(), verbatim in substance (attack-0829n-rml-proof.js:82-106)
function lattice(t, ps) {
  const V = new Map();
  for (let i = 0; i < t.n; i++) {
    const q = t.q[i], w = t.w[i], d1 = t.d1[i];
    const pf = []; for (const p of ps) if (q % p === 0) pf.push(p);
    const m = pf.length;
    for (let mask = 1; mask < (1 << m); mask++) {
      let e = 1; for (let k = 0; k < m; k++) if (mask & (1 << k)) e *= pf[k];
      const e1 = gcd(e, d1);
      let ve = V.get(e); if (!ve) { ve = new Map(); V.set(e, ve); }
      ve.set(e1, (ve.get(e1) || 0) + w / q);
    }
  }
  const rows = [];
  for (const [e, ve] of V) { let vabs = 0; for (const v of ve.values()) vabs += Math.abs(v); rows.push({ e, vabs }); }
  rows.sort((a, b) => a.e - b.e);
  return rows;
}
function capOf(rows) { let c = 0; for (const r of rows) c += r.vabs * r.e * (Math.log(r.e) + 1); return c; }

// Ssat = sum_e sum*_a |Theta_e(a)| / |sin(pi a/e)| from the raw terms (no peel, no fast sine)
function exactSsat(t, rows) {
  let tot = 0, viol = 0;
  for (const r of rows) {
    if (r.vabs === 0) continue;
    const e = r.e, idx = [];
    for (let i = 0; i < t.n; i++) if (t.q[i] % e === 0) idx.push(i);
    for (let a = 1; a < e; a++) {
      if (gcd(a, e) !== 1) continue;
      let re = 0, im = 0;
      for (const i of idx) { const ph = -2 * Math.PI * a * (t.c[i] % e) / e; re += (t.w[i] / t.q[i]) * Math.cos(ph); im += (t.w[i] / t.q[i]) * Math.sin(ph); }
      const th = Math.hypot(re, im);
      if (th > r.vabs * (1 + 1e-9)) viol++;
      tot += th / Math.abs(Math.sin(Math.PI * a / e));
    }
  }
  return { Ssat: tot, viol };
}

function main() {
  console.log('verify-0830-usup-convention.js  s = ' + S + ' on both paths');
  console.log('');
  console.log('S0 THE LATTICES SIDE BY SIDE — LSE = lemmaV-parseval.spectralRecords(z, 3.0); RML = buildTerms(z, z^3) + lattice()');
  console.log('   z   D(RML)   D(LSE)   n(RML)   n(LSE)   M equal   #e RML   #e RML,Vabs>0   #recs LSE   sets equal   max|dVabs|   max e     P(z)      2^pi(z)-1   z^6');
  const LAT = {};
  for (const z of ZS_LATTICE) {
    const ps = primesBelow(z);
    const t = L.buildTerms(z, Math.pow(z, S));
    const SD = A1.spectralRecords(z, S);
    const rows = lattice(t, ps);
    const nz = rows.filter(r => r.vabs > 0);
    const lse = new Map(SD.recs.map(r => [r.e, r.va]));
    let setEq = nz.length === lse.size, dv = 0;
    for (const r of nz) { if (!lse.has(r.e)) { setEq = false; continue; } dv = Math.max(dv, Math.abs(r.vabs - lse.get(r.e))); }
    let P = 1; for (const p of ps) P *= p;
    LAT[z] = { ps, t, rows, P };
    console.log(`  ${pad(z, 2)}   ${pad(Math.pow(z, S), 6)}   ${pad(SD.D, 6)}   ${pad(t.n, 6)}   ${pad(SD.N, 6)}   ${t.M === SD.M ? 'yes' : 'NO '}      ${pad(rows.length, 4)}       ${pad(nz.length, 4)}           ${pad(SD.recs.length, 4)}       ${setEq ? 'yes' : 'NO '}        ${e3(dv)}   ${e3(rows[rows.length - 1].e)}  ${e3(P)}  ${pad(Math.pow(2, ps.length) - 1, 6)}     ${e3(Math.pow(z, 6))}`);
  }
  console.log('  (#e RML counts every e | q_i; LSE drops moduli whose every V(e1,e2) is exactly 0, which carry 0 to Ssat and to CAP alike.)');
  console.log('');

  console.log('S1 THE OBJECTS EVALUATED — Ssat (LSE, H-free) on the RML lattice, against LSE\'s own path and the cited column; CAP (RML) against its cited column');
  console.log('   z   Ssat here      Ssat supBoundTable   Ssat cited   CAP here      CAP cited    Ssat<=CAP   CAP/Ssat   u_sat here   u_sat cited   u_cap here   Theta>Vabs viol');
  for (const z of ZS_EXACT) {
    const { t, rows } = LAT[z], lnz = Math.log(z);
    const ex = exactSsat(t, rows);
    const ref = A1.supBoundTable(z, S, [z * z]);
    const CAP = capOf(rows);
    console.log(`  ${pad(z, 2)}   ${e4(ex.Ssat)}     ${e4(ref.Ssat)}           ${e4(SSAT_CITED[z])}   ${f(CAP, 4)}     ${CAP_CITED[z] ? f(CAP_CITED[z], 4) : '   --    '}    ${ex.Ssat <= CAP ? 'yes' : 'NO '}       ${f(CAP / ex.Ssat, 2)}      ${f(Math.log(ex.Ssat / t.M) / lnz, 4)}      ${f(USAT_CITED[z], 4)}        ${f(Math.log((CAP + 1) / t.M) / lnz, 4)}       ${ex.viol}`);
  }
  console.log('');

  console.log('S2 THE FULL-LEVEL ALTERNATIVE — every Rosser condition vacuous (D_full = P(z) z^3): both supports = all divisors of P(z), the Legendre lattice');
  console.log('   z   level        s_full=ln P/ln z   n_full    M_full       #e     max e     Ssat_full     CAP_full      u_sat_full   u_cap_full   2 s_full   | s=3 column: Ssat  u_sat');
  for (const z of [13, 17]) {
    const ps = primesBelow(z), lnz = Math.log(z);
    let P = 1; for (const p of ps) P *= p;
    const Df = P * Math.pow(z, 3);
    const t = L.buildTerms(z, Df);
    const rows = lattice(t, ps);
    const ex = exactSsat(t, rows);
    const CAP = capOf(rows);
    const sFull = Math.log(P) / lnz;
    console.log(`  ${pad(z, 2)}   ${e3(Df)}    ${f(sFull, 4)}             ${pad(t.n, 6)}   ${e4(t.M)}   ${pad(rows.length, 3)}   ${e3(rows[rows.length - 1].e)}  ${e4(ex.Ssat)}    ${e4(CAP)}    ${f(Math.log(ex.Ssat / t.M) / lnz, 4)}       ${f(Math.log((CAP + 1) / t.M) / lnz, 4)}       ${f(2 * sFull, 4)}    | ${e4(SSAT_CITED[z])}  ${f(USAT_CITED[z], 4)}`);
  }
  console.log('  (n_full = 3 * 4^pi(z) pairs before the CRT filter; at full level the certificate is the exact inclusion-exclusion count.)');
  console.log('');

  console.log('S3 THE CAP AGAINST u_sat AT ALL TEN LEVELS — CAP(z) = sum_e Vabs(e) e (ln e + 1) >= Ssat exactly; bound = z^{2s}(2s ln z + 1) 6 prod_{p<z}(1+2/p)^2');
  console.log('   z   #e RML   #e Vabs>0   #recs cited   set=LSE recs   max e      CAP          u_cap    u_sat cited   u_cap>=u_sat   bound        bound/Ssat_cited   2^pi(z)-1   C^pi(z), C=2.0516');
  for (const z of ZS_ALL) {
    const ps = primesBelow(z), lnz = Math.log(z);
    const t = L.buildTerms(z, Math.pow(z, S));
    const rows = lattice(t, ps);
    const nzRows = rows.filter(r => r.vabs > 0), nz = nzRows.length;
    const SD = A1.spectralRecords(z, S);
    let setEq = nz === SD.recs.length; if (setEq) { const ls = new Set(SD.recs.map(r => r.e)); for (const r of nzRows) if (!ls.has(r.e)) { setEq = false; break; } }
    const CAP = capOf(rows);
    let P2 = 1; for (const p of ps) P2 *= (1 + 2 / p);
    const bound = Math.pow(z, 2 * S) * (2 * S * lnz + 1) * 6 * P2 * P2;
    const ucap = Math.log((CAP + 1) / t.M) / lnz;
    console.log(`  ${pad(z, 2)}   ${pad(rows.length, 5)}     ${pad(nz, 5)}       ${pad(RECS_CITED[z], 5)}        ${setEq ? 'yes' : 'NO '}         ${e3(rows[rows.length - 1].e)}  ${e4(CAP)}   ${f(ucap, 4)}   ${f(USAT_CITED[z], 4)}        ${ucap >= USAT_CITED[z] ? 'yes' : 'NO '}         ${e3(bound)}    ${e3(bound / SSAT_CITED[z])}          ${pad(Math.pow(2, ps.length) - 1, 6)}      ${e3(Math.pow(C_CITED, ps.length))}`);
  }
  console.log('  (#e Vabs>0 against #recs cited is the S0 count convention at the levels S0 does not reach; RML cited #moduli 467, 827, 1527 at z = 29, 31, 37.)');
  console.log('');
  // the arithmetic of the two shapes, no lattice: primes z up to 2000
  let zCount = null, zC = null;
  for (const z of primesBelow(2000)) {
    if (z < 13) continue;
    const ps = primesBelow(z), lnz = Math.log(z);
    let P2 = 1; for (const p of ps) P2 *= (1 + 2 / p);
    const lnBound = 2 * S * lnz + Math.log(2 * S * lnz + 1) + Math.log(6) + 2 * Math.log(P2);
    if (zCount === null && ps.length * Math.log(2) > 2 * S * lnz) zCount = z;
    if (zC === null && ps.length * Math.log(C_CITED) > lnBound) zC = z;
  }
  console.log(`  first prime z with 2^pi(z) > z^{2s} (the modulus COUNT can no longer be all of P(z)'s divisors): z = ${zCount}`);
  console.log(`  first prime z with C^pi(z) > z^{2s}(2s ln z + 1) 6 prod(1+2/p)^2 at C = ${C_CITED} (a fixed per-prime factor would breach the PROVEN cap on Ssat): z = ${zC}`);
  console.log('');
  console.log('DONE');
}
main();

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/verify-0830-usup-convention.js
//   invocation:  node research/history/staging/verify-0830-usup-convention.js
//   code-sha256: 6572562a43c582eed50e87a446044913c4edd45a9c85db2e3b0d62ff31ce3a03
//   out-sha256:  3e959c3e83a0a0bc1115d4b169580b9d075b9d85d89d362be6fa55c69d171a48
//   body-lines:  40
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     15.7 s
// ============================================================================
// verify-0830-usup-convention.js  s = 3 on both paths
//
// S0 THE LATTICES SIDE BY SIDE — LSE = lemmaV-parseval.spectralRecords(z, 3.0); RML = buildTerms(z, z^3) + lattice()
//    z   D(RML)   D(LSE)   n(RML)   n(LSE)   M equal   #e RML   #e RML,Vabs>0   #recs LSE   sets equal   max|dVabs|   max e     P(z)      2^pi(z)-1   z^6
//   13     2197     2197      852      852   yes        31         31             31       yes        3.469e-18   2.310e+3  2.310e+3      31     4.827e+6
//   17     4913     4913     2236     2236   yes        63         63             63       yes        6.939e-18   3.003e+4  3.003e+4      63     2.414e+7
//   19     6859     6859     4764     4764   yes       127        127            127       yes        1.735e-18   5.105e+5  5.105e+5     127     4.705e+7
//   23    12167    12167     9636     9636   yes       243        243            243       yes        1.735e-18   8.818e+5  9.700e+6     255     1.480e+8
//   (#e RML counts every e | q_i; LSE drops moduli whose every V(e1,e2) is exactly 0, which carry 0 to Ssat and to CAP alike.)
//
// S1 THE OBJECTS EVALUATED — Ssat (LSE, H-free) on the RML lattice, against LSE's own path and the cited column; CAP (RML) against its cited column
//    z   Ssat here      Ssat supBoundTable   Ssat cited   CAP here      CAP cited    Ssat<=CAP   CAP/Ssat   u_sat here   u_sat cited   u_cap here   Theta>Vabs viol
//   13   1.9602e+1     1.9602e+1           1.9602e+1   350.4593     350.4593    yes       17.88      2.2850      2.2850        3.4103       0
//   17   5.0314e+1     5.0314e+1           5.0314e+1   1209.9555     1209.9555    yes       24.05      2.4623      2.4623        3.5850       0
//   19   1.2006e+2     1.2006e+2           1.2006e+2   2696.2591        --        yes       22.46      2.7228      2.7228        3.7797       0
//
// S2 THE FULL-LEVEL ALTERNATIVE — every Rosser condition vacuous (D_full = P(z) z^3): both supports = all divisors of P(z), the Legendre lattice
//    z   level        s_full=ln P/ln z   n_full    M_full       #e     max e     Ssat_full     CAP_full      u_sat_full   u_cap_full   2 s_full   | s=3 column: Ssat  u_sat
//   13   5.075e+6    3.0196                972   5.8442e-2    31   2.310e+3  1.9544e+1    4.7171e+2    2.2661       3.5081       6.0391    | 1.9602e+1  2.2850
//   17   1.475e+8    3.6390               2916   4.9451e-2    63   3.003e+4  4.5827e+1    1.6998e+3    2.4113       3.6868       7.2779    | 5.0314e+1  2.4623
//   (n_full = 3 * 4^pi(z) pairs before the CRT filter; at full level the certificate is the exact inclusion-exclusion count.)
//
// S3 THE CAP AGAINST u_sat AT ALL TEN LEVELS — CAP(z) = sum_e Vabs(e) e (ln e + 1) >= Ssat exactly; bound = z^{2s}(2s ln z + 1) 6 prod_{p<z}(1+2/p)^2
//    z   #e RML   #e Vabs>0   #recs cited   set=LSE recs   max e      CAP          u_cap    u_sat cited   u_cap>=u_sat   bound        bound/Ssat_cited   2^pi(z)-1   C^pi(z), C=2.0516
//   13      31        31          31        yes         2.310e+3  3.5046e+2   3.4103   2.2850        yes         2.387e+10    1.218e+9              31      3.635e+1
//   17      63        63          63        yes         3.003e+4  1.2100e+3   3.5850   2.4623        yes         1.745e+11    3.468e+9              63      7.457e+1
//   19     127       127         127        yes         5.105e+5  2.6963e+3   3.7797   2.7228        yes         4.406e+11    3.670e+9             127      1.530e+2
//   23     243       243         243        yes         8.818e+5  5.2959e+3   3.8116   2.8281        yes         1.798e+12    7.413e+9             255      3.139e+2
//   29     467       448         448        yes         3.432e+6  1.1820e+4   3.8086   2.8827        yes         9.133e+12    1.746e+10             511      6.439e+2
//   31     827       763         763        yes         9.700e+6  2.2121e+4   3.9418   3.0259        yes         1.587e+13    1.665e+10            1023      1.321e+3
//   37    1527      1494        1494        yes         3.187e+7  6.5128e+4   4.0593   3.1644        yes         5.453e+13    2.120e+10            2047      2.710e+3
//   41    2535      2501        2501        yes         7.328e+7  1.1857e+5   4.1264   3.2543        yes         1.152e+14    2.478e+10            4095      5.560e+3
//   43    3879      3814        3814        yes         8.365e+7  1.7643e+5   4.1987   3.3448        yes         1.707e+14    2.402e+10            8191      1.141e+4
//   47    6119      6035        6035        yes         2.231e+8  3.1380e+5   4.2652   3.4306        yes         3.260e+14    2.583e+10           16383      2.340e+4
//   (#e Vabs>0 against #recs cited is the S0 count convention at the levels S0 does not reach; RML cited #moduli 467, 827, 1527 at z = 29, 31, 37.)
//
//   first prime z with 2^pi(z) > z^{2s} (the modulus COUNT can no longer be all of P(z)'s divisors): z = 223
//   first prime z with C^pi(z) > z^{2s}(2s ln z + 1) 6 prod(1+2/p)^2 at C = 2.0516 (a fixed per-prime factor would breach the PROVEN cap on Ssat): z = 331
//
// DONE
// ============================================================================
// READINGS
//
