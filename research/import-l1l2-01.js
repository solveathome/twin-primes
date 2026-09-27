#!/usr/bin/env node
// ============================================================================
// IMPORT-MAP ROW 5 — the l1/l2 measurement on Theta_e(a), and what an
// l1 -> l2 sqrt(log) theorem would actually be
// ============================================================================
// PRE-REGISTERED at research/history/staging/import-l1l2-prereg.md, committed
// before this file was written. Write-up: history/staging/import-l1l2.md.
// Parents: research/sift-limit-attack.md sec.7e (the wall: the triangle
// inequality over the (e,a) sum, priced at C^pi(z)), research/IMPORT-MAP.md
// rows 5 and 6, history/staging/import-chaining.md sec.4.3 (the relocation of
// the loss off the position supremum and onto this family).
//
// THE OBJECT, exactly as lemmaV-parseval.js defines it (its L3 and Theorem B):
//
//   Theta_e(a) = sum_{i : e | q_i} (w_i/q_i) e(-a c_i/e),
//                e | P(z), e > 1, a mod e with (a,e) = 1,
//
// i running over the Brudern-Fouvry divisor pairs (d1,d2), q_i = [d1,d2],
// c_i the CRT class, w_i = +-1 the Rosser weight product at level D = z^s.
// L5:  R_H(x) = sum_{e,a} Theta_e(a) S_H(a/e) e(ax/e), and the wall is
//      sup_x |R_H(x)| <= Ssup(H) = sum_{e,a} |Theta_e(a)| |S_H(a/e)|.
//
// WHAT IS NEW HERE. Exactly one accumulator: the UNWEIGHTED l1 norm
// sum_{e,a} |Theta_e(a)|, which the corpus has never computed. Everything else
// in this file either reproduces a number the corpus already owns (as custody)
// or is arithmetic on numbers already embedded elsewhere. The peel that makes
// the sweep affordable is lemmaV-sup-extension.js's (P1)+(P2), re-implemented
// here so that it can carry the new accumulator; its plan objects are IMPORTED
// from that file rather than recopied, and S0 checks the two implementations
// against each other on every quantity they share.
//
// SECTIONS
//   S0  CUSTODY. Six reproductions before any new number is read.
//   S1  THE PRE-REGISTERED RATIO rho = ||Theta||_1 / (||Theta||_2 sqrt(#)).
//   S2  THE DECAY RATE, which the pre-registration calls the size of the prize.
//   S3  THE MECHANISM: rho split into within-e flatness times across-e spread.
//   S4  THE WEIGHTED FAMILY, which is the one the bound contains, and the prize
//       A(z) = Ssup(H)/(rms(R_H) sqrt(2 ln W)) that a perfect conversion buys.
//   S5  THE CONSTANT WINDOW: what an l1 -> l2 sqrt(log) theorem IS on this
//       family, and the room between "true" and "TPC-implying".
//
//   node research/import-l1l2-01.js            (z = 13..31)
//   node research/import-l1l2-01.js --quick    (z = 13..23)
// ============================================================================
'use strict';
const path = require('path');
const T0 = Date.now(); const el = () => ((Date.now() - T0) / 1000).toFixed(1) + 's';

// CUSTODY: term list and the independent O(N^2) mean square are the corpus's
// own; the spectral records and the peel plan are attack 1's and the
// extension's. Nothing is recopied, so every number runs back through
// sift-limit-lemmaV.js to the 2026-08-14 pilot.
const REPO = require(path.join(__dirname, 'sift-limit-lemmaV.js'));
const A1   = require(path.join(__dirname, 'lemmaV-parseval.js'));
const EXT  = require(path.join(__dirname, 'lemmaV-sup-extension.js'));

const QUICK = process.argv.includes('--quick');
const S_LEVEL = 3.0;                       // attack 1's level, kept throughout
const ZS = QUICK ? [13, 17, 19, 23] : [13, 17, 19, 23, 29, 31, 37, 41];

// ---------------------------------------------------------------------------
// NUMBERS QUOTED FROM EMBEDDED OUTPUT BLOCKS ELSEWHERE IN THE CORPUS.
// Standing compute rule: cite, do not re-derive. Each is used only as a
// reference value or as an input to arithmetic, never re-measured here.
// ---------------------------------------------------------------------------
// phase1-T4-maximal-law.md sec.4, reproduced in lemmaV-parseval.js S0b:
const NP        = { 13: 60, 17: 126, 19: 198, 23: 258 };
// lemmaV-sup-extension.js S3 (embedded), the H at which u_sup is read:
const HSUP      = { 13: 198, 17: 683, 19: 1833, 23: 4278, 29: 10384, 31: 20586, 37: 52989, 41: 103823, 43: 170378 };
// lemmaV-sup-extension.js S1 (embedded), exhaustive full-period walk:
const TRUESUP   = { 13: 2.6494, 17: 4.9203, 19: 6.8403, 23: 7.8157 };
const RMS_NP    = { 13: 1.1949, 17: 1.4885, 19: 1.4478, 23: 1.7365 };
// lemmaV-sup-extension.js S0(c) (embedded), the reference Ssup at H = nP:
const SSUP_NP   = { 13: 11.446659, 17: 28.411760, 19: 60.038210, 23: 118.327993 };
// lemmaV-sup-extension.js S3 TIGHTNESS (embedded):
const SSUP_HSUP = { 13: 10.4063, 17: 32.0666, 19: 72.5791, 23: 146.1371, 29: 309.6710, 31: 563.0990, 37: 1459.4064, 41: 2644.7690, 43: 4096.3370 };
const RMS_HSUP  = { 13: 0.8006, 17: 2.2635, 19: 2.7877, 23: 3.3467, 29: 4.2195, 31: 5.4216, 37: 8.4046, 41: 10.1577, 43: 13.2210 };
// lemmaV-sup-extension.js S5 (embedded): Var(c) = ||Theta||_2^2, and #(e,a):
const VARC_PUB  = { 13: 5.792e-2, 17: 4.984e-2, 19: 4.652e-2, 23: 4.328e-2, 29: 3.878e-2, 31: 3.665e-2, 37: 3.365e-2, 41: 3.237e-2, 43: 3.148e-2 };
const NPTS_PUB  = { 13: 2.3090e3, 17: 3.0029e4, 19: 5.1051e5, 23: 2.6494e6, 29: 1.7193e7, 31: 6.0577e7, 37: 5.2512e8, 41: 1.7951e9, 43: 3.7441e9 };
// phase1-T4-maximal-law.md sec.2(c), quoted in import-chaining.md sec.4.3:
const CCRIT     = { 13: 2.225, 17: 1.720, 19: 1.358, 23: 1.418, 29: 1.660 };
// phase1-T4-maximal-law.md sec.4 tightness row, quoted in import-chaining.md sec.0:
const TRUTHUNION = { 13: 0.5634, 17: 0.7279, 19: 0.9215, 23: 0.7935, 29: 0.8507 };

const PI = Math.PI;
function primesBelow(n) { const s = new Uint8Array(n), o = []; for (let i = 2; i < n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j < n; j += i) s[j] = 1; } } return o; }
function lnWof(z) { let t = 0; for (const p of primesBelow(z)) t += Math.log(p); return t; }
function piOf(z) { return primesBelow(z).length; }
function rel(a, b) { const d = Math.max(Math.abs(a), Math.abs(b)); return d === 0 ? 0 : Math.abs(a - b) / d; }
function fx(v, n) { return v.toFixed(n); }

// ---------------------------------------------------------------------------
// THE SWEEP. One pass over every (e,a) with Theta_e(a) != 0, accumulating
//   L1   = sum |Theta|                    <- the new quantity
//   L2sq = sum |Theta|^2                  ( = Var(c) )
//   n    = #(e,a)
//   Ssat = sum |Theta|/|sin(pi a/e)|
//   out[t] = sum |Theta| |S_H(a/e)|,  ssq[t] = sum |Theta|^2 |S_H(a/e)|^2
// and the same five per modulus e, which S3 needs.
// The plan (the multilinear form and its root-of-unity tables) is EXT.planOf.
// ---------------------------------------------------------------------------
function innerLoop(pl, LR, LI, d, aPart, HS, ACC, out, ssq) {
  const e = pl.e, p = pl.pfArr[d], zrT = pl.zr[d], ziT = pl.zi[d], md = pl.m[d];
  const cr = LR[d], ci = LI[d], K = HS.length;
  let a = aPart + md; if (a >= e) a -= e;
  for (let aj = 1; aj < p; aj++) {
    const zr0 = zrT[aj], zi0 = ziT[aj];
    const re = cr[0] + zr0 * cr[1] - zi0 * ci[1];
    const im = ci[0] + zr0 * ci[1] + zi0 * cr[1];
    const th2 = re * re + im * im;
    if (th2 > 0) {
      const abs = Math.sqrt(th2);
      ACC[0] += abs; ACC[1] += th2; ACC[2] += 1;
      const sden = Math.abs(Math.sin(PI * a / e));
      ACC[3] += abs / sden;
      for (let t = 0; t < K; t++) {
        const m = (HS[t] % e) * a % e;
        const S = Math.abs(Math.sin(PI * m / e)) / sden;
        const c = abs * S;
        out[t] += c; ssq[t] += c * c;
      }
    }
    a += md; if (a >= e) a -= e;
  }
}
function peel(pl, LR, LI, d, aPart, HS, ACC, out, ssq) {
  if (d === pl.k - 1) { innerLoop(pl, LR, LI, d, aPart, HS, ACC, out, ssq); return; }
  const e = pl.e, p = pl.pfArr[d], zrT = pl.zr[d], ziT = pl.zi[d], md = pl.m[d];
  const cr = LR[d], ci = LI[d], nr = LR[d + 1], ni = LI[d + 1], L = nr.length;
  let ap = aPart;
  for (let aj = 1; aj < p; aj++) {
    const zr0 = zrT[aj], zi0 = ziT[aj];
    for (let t = 0, u = 0; t < L; t++, u += 2) {
      const rr = cr[u + 1], ii = ci[u + 1];
      nr[t] = cr[u] + zr0 * rr - zi0 * ii; ni[t] = ci[u] + zr0 * ii + zi0 * rr;
    }
    ap += md; if (ap >= e) ap -= e;
    peel(pl, LR, LI, d + 1, ap, HS, ACC, out, ssq);
  }
}
function sweep(SD, HS) {
  const K = HS.length, out = new Float64Array(K), ssq = new Float64Array(K);
  const ACC = new Float64Array(4);
  let L1 = 0, L2sq = 0, n = 0, Ssat = 0;
  const perE = [];
  for (const rec of SD.recs) {
    const pl = EXT.planOf(rec, SD.t.ps), k = pl.k;
    const LR = [], LI = [];
    for (let d = 0; d <= k; d++) { LR.push(new Float64Array(1 << (k - d))); LI.push(new Float64Array(1 << (k - d))); }
    LR[0].set(pl.A);
    ACC[0] = 0; ACC[1] = 0; ACC[2] = 0; ACC[3] = 0;
    peel(pl, LR, LI, 0, 0, HS, ACC, out, ssq);
    L1 += ACC[0]; L2sq += ACC[1]; n += ACC[2]; Ssat += ACC[3];
    perE.push({ e: pl.e, om: k, L1: ACC[0], P: ACC[1], n: ACC[2] });
  }
  return { L1, L2sq, n, Ssat, out, ssq, perE };
}

// The direct, term-by-term reference implementation of the same three sums,
// written in the shape of lemmaV-parseval.js supBoundTable()'s inner loop
// (cost phi(e) 2^omega(e), no peeling, no plan). Small z only.
function directNorms(SD) {
  let L1 = 0, L2sq = 0, n = 0;
  const gcd = (a, b) => { while (b) { const t = a % b; a = b; b = t; } return a; };
  for (const r of SD.recs) {
    const e = r.e;
    for (let a = 1; a < e; a++) {
      if (gcd(a, e) !== 1) continue;
      let re = 0, im = 0;
      for (const f of r.fac) {
        if (f[0] === 1) { re += f[2]; continue; }
        const th = 2 * PI * ((a * f[1]) % f[0]) / f[0];
        re += f[2] * Math.cos(th); im += f[2] * Math.sin(th);
      }
      const th2 = re * re + im * im; if (th2 === 0) continue;
      L1 += Math.sqrt(th2); L2sq += th2; n++;
    }
  }
  return { L1, L2sq, n };
}

// ---------------------------------------------------------------------------
const ROWS = [];
function buildAll() {
  for (const z of ZS) {
    const SD = A1.spectralRecords(z, S_LEVEL);
    const HS = []; if (NP[z]) HS.push(NP[z]); HS.push(HSUP[z]);
    const r = sweep(SD, HS);
    const iNP = NP[z] ? 0 : -1, iHS = NP[z] ? 1 : 0;
    ROWS.push({
      z, SD, lnW: lnWof(z), pi: piOf(z), M: SD.M,
      L1: r.L1, L2: Math.sqrt(r.L2sq), L2sq: r.L2sq, n: r.n, Ssat: r.Ssat,
      SsupNP: iNP >= 0 ? r.out[iNP] : null, rmsNP: iNP >= 0 ? Math.sqrt(r.ssq[iNP]) : null,
      SsupHS: r.out[iHS], rmsHS: Math.sqrt(r.ssq[iHS]), perE: r.perE
    });
    console.log(`  built z=${z}  #(e,a)=${r.n.toExponential(3)}  ||Theta||_1=${r.L1.toExponential(6)}   [${el()}]`);
  }
}

function S0() {
  console.log('\nS0 CUSTODY --- six reproductions before a single new number is read\n');
  console.log('  (a) the peeled sweep against the direct term-by-term sums (phi(e)2^omega(e),');
  console.log('      Math.cos/Math.sin, no plan), at the two levels where direct is affordable:');
  for (const z of [13, 17]) {
    const SD = A1.spectralRecords(z, S_LEVEL);
    const mine = sweep(SD, []), ref = directNorms(SD);
    console.log(`      z=${z}: ||Theta||_1 ${mine.L1.toFixed(9)} vs ${ref.L1.toFixed(9)} rel ${rel(mine.L1, ref.L1).toExponential(2)}` +
      ` | ||Theta||_2^2 rel ${rel(mine.L2sq, ref.L2sq).toExponential(2)} | #(e,a) ${mine.n} vs ${ref.n}   [${el()}]`);
  }
  console.log('\n  (b) the same sweep against lemmaV-sup-extension.js EXT.sweep(), an independently');
  console.log('      written peel with a polynomial sine, on the four quantities they share.');
  console.log('      Run at z <= 29 only: it is a second full sweep, and the top levels cost more');
  console.log('      than the check is worth once five levels have agreed to 1e-11.');
  for (const r of ROWS) {
    if (r.z > 29) continue;
    const HS = [HSUP[r.z]];
    const x = EXT.sweep(r.SD, HS);
    console.log(`      z=${String(r.z).padStart(2)}: Ssat rel ${rel(r.Ssat, x.Ssat).toExponential(2)} | ||Theta||_2^2 rel ${rel(r.L2sq, x.VarC).toExponential(2)}` +
      ` | #(e,a) ${r.n === x.nPts ? 'EQUAL' : r.n + ' vs ' + x.nPts} | Ssup(H_sup) rel ${rel(r.SsupHS, x.out[0]).toExponential(2)}   [${el()}]`);
  }
  console.log('\n  (c) ||Theta||_2^2 and #(e,a) against the EMBEDDED Var(c) and #(e,a) columns of');
  console.log('      lemmaV-sup-extension.js S5 and S3 (4-digit and 5-digit quotations):');
  for (const r of ROWS)
    console.log(`      z=${String(r.z).padStart(2)}: ||Theta||_2^2 ${r.L2sq.toExponential(4)} vs ${VARC_PUB[r.z].toExponential(3)} rel ${rel(r.L2sq, VARC_PUB[r.z]).toExponential(2)}` +
      ` | #(e,a) ${r.n.toExponential(4)} vs ${NPTS_PUB[r.z].toExponential(4)} rel ${rel(r.n, NPTS_PUB[r.z]).toExponential(2)}`);
  console.log('\n  (d) Ssup(nP) against the embedded reference of lemmaV-sup-extension.js S0(c):');
  for (const r of ROWS) if (r.SsupNP !== null)
    console.log(`      z=${String(r.z).padStart(2)}: H=${NP[r.z]}  ${r.SsupNP.toFixed(6)} vs ${SSUP_NP[r.z].toFixed(6)} rel ${rel(r.SsupNP, SSUP_NP[r.z]).toExponential(2)}`);
  console.log('\n  (e) the spectral mean square sum_{e,a}|Theta|^2|S_H(a/e)|^2 from the SAME sweep');
  console.log('      against the repository\'s INDEPENDENT O(N^2) divisor-pair meanSquare().');
  console.log('      This is L3, and a match validates the whole Theta path at once:');
  for (const r of ROWS) {
    if (!NP[r.z] || r.z > 19) continue;
    const D = Math.round(Math.pow(r.z, S_LEVEL));
    const ms = REPO.meanSquare(REPO.buildTerms(r.z, D), NP[r.z]).ms;
    console.log(`      z=${String(r.z).padStart(2)} H=${NP[r.z]}: sweep ${(r.rmsNP * r.rmsNP).toFixed(9)}  meanSquare() ${ms.toFixed(9)}  rel ${rel(r.rmsNP * r.rmsNP, ms).toExponential(2)}   [${el()}]`);
  }
  console.log('\n  (f) rms(R_nP) and rms(R_Hsup) against the embedded S1 and S3 columns:');
  for (const r of ROWS)
    console.log(`      z=${String(r.z).padStart(2)}: rms(H_sup) ${r.rmsHS.toFixed(4)} vs ${RMS_HSUP[r.z].toFixed(4)} rel ${rel(r.rmsHS, RMS_HSUP[r.z]).toExponential(2)}` +
      (r.rmsNP !== null ? ` | rms(nP) ${r.rmsNP.toFixed(4)} vs ${RMS_NP[r.z].toFixed(4)} rel ${rel(r.rmsNP, RMS_NP[r.z]).toExponential(2)}` : ''));
}

function S1() {
  console.log('\nS1 THE PRE-REGISTERED RATIO --- rho = ||Theta||_1 / (||Theta||_2 sqrt(#))\n');
  console.log('  Cauchy-Schwarz gives rho <= 1, with equality iff every |Theta_e(a)| is the same.');
  console.log('  N_eff = (||Theta||_1/||Theta||_2)^2 = rho^2 # is the participation ratio: the');
  console.log('  number of EQUAL-sized terms that would carry the same l1 mass. The kill line');
  console.log('  pre-registered from IMPORT-MAP row 5 is rho >= 0.5 at every level.\n');
  console.log('  z    #(e,a)       ||Theta||_1   ||Theta||_2   ||Theta||_2 sqrt(#)      rho        N_eff      N_eff/#     ||T||_1/||T||_2');
  for (const r of ROWS) {
    const den = r.L2 * Math.sqrt(r.n), rho = r.L1 / den, neff = (r.L1 / r.L2) ** 2;
    console.log(`  ${String(r.z).padStart(2)}  ${r.n.toExponential(4)}  ${r.L1.toExponential(5)}   ${r.L2.toExponential(5)}   ${den.toExponential(5)}   ${fx(rho, 6)}   ${neff.toExponential(4)}   ${(neff / r.n).toExponential(2)}      ${(r.L1 / r.L2).toFixed(2).padStart(9)}`);
    r.rho = rho; r.neff = neff;
  }
  console.log('\n  Verdict against the pre-registered kill line:');
  const mx = Math.max(...ROWS.map(r => r.rho)), mn = Math.min(...ROWS.map(r => r.rho));
  console.log(`      max rho = ${fx(mx, 6)}, min rho = ${fx(mn, 6)}.  rho >= 0.5 at every level? ${mn >= 0.5 ? 'YES -- criterion FIRES' : 'NO -- criterion does NOT fire'}`);
  let mono = true; for (let i = 1; i < ROWS.length; i++) if (ROWS[i].rho >= ROWS[i - 1].rho) mono = false;
  console.log(`      monotone decreasing in z? ${mono ? 'YES' : 'NO'}   (P1 predicted rho(13) in [0.05,0.40] and monotone decrease)`);
}

function S2() {
  console.log('\nS2 THE DECAY RATE --- which the pre-registration calls the size of the prize\n');
  console.log('  Per added prime: how each factor moves from one level to the next. sqrt(#) is');
  console.log('  what rho fights, and the question is whether ||Theta||_1 keeps up with it.\n');
  console.log('  step        rho ratio   ||Theta||_1 ratio  ||Theta||_2 ratio  sqrt(#) ratio   (||T||_1/||T||_2) ratio   local g');
  for (let i = 1; i < ROWS.length; i++) {
    const a = ROWS[i - 1], b = ROWS[i];
    console.log(`  ${String(a.z).padStart(2)} -> ${String(b.z).padStart(2)}    ${fx(b.rho / a.rho, 4)}      ${fx(b.L1 / a.L1, 4)}             ${fx(b.L2 / a.L2, 4)}             ${fx(Math.sqrt(b.n / a.n), 4)}          ${fx((b.L1 / b.L2) / (a.L1 / a.L2), 4)}             ${fx(-Math.log(b.rho / a.rho) / Math.log(Math.sqrt(b.n / a.n)), 4)}`);
  }
  // rho ~ c A^pi(z) / sqrt(W): regress ln(rho) + 0.5 lnW on pi(z)
  const xs = ROWS.map(r => r.pi), ys = ROWS.map(r => Math.log(r.rho) + 0.5 * r.lnW);
  const n = xs.length; let sx = 0, sy = 0, sxx = 0, sxy = 0;
  for (let i = 0; i < n; i++) { sx += xs[i]; sy += ys[i]; sxx += xs[i] * xs[i]; sxy += xs[i] * ys[i]; }
  const b1 = (n * sxy - sx * sy) / (n * sxx - sx * sx), b0 = (sy - b1 * sx) / n;
  let rss = 0; for (let i = 0; i < n; i++) { const p = b0 + b1 * xs[i]; rss += (ys[i] - p) ** 2; }
  console.log(`\n  Model rho = c A^{pi(z)} / sqrt(W)  (P2's shape, A in [1.5,2.5] predicted):`);
  console.log(`      A = ${fx(Math.exp(b1), 6)}   c = ${Math.exp(b0).toExponential(4)}   RSS = ${rss.toExponential(2)} on ${n} points`);
  console.log('      residuals in ln:  ' + xs.map((x, i) => (ys[i] - (b0 + b1 * x)).toFixed(4)).join('  '));
  // pure power of W
  const xs2 = ROWS.map(r => r.lnW), ys2 = ROWS.map(r => Math.log(r.rho));
  let s2x = 0, s2y = 0, s2xx = 0, s2xy = 0;
  for (let i = 0; i < n; i++) { s2x += xs2[i]; s2y += ys2[i]; s2xx += xs2[i] * xs2[i]; s2xy += xs2[i] * ys2[i]; }
  const c1 = (n * s2xy - s2x * s2y) / (n * s2xx - s2x * s2x), c0 = (s2y - c1 * s2x) / n;
  let rss2 = 0; for (let i = 0; i < n; i++) rss2 += (ys2[i] - (c0 + c1 * xs2[i])) ** 2;
  console.log('\n  local g is the step-by-step decay exponent in rho ~ #^{-g/2}: g = 1 would be a');
  console.log('  family whose l1 mass sits on O(1) terms, g = 0 a flat family. It is NOT constant.');
  console.log('\n  The second-to-last column is the growth of ||Theta||_1/||Theta||_2 per ADDED PRIME. The');
  console.log('  corpus already owns that number in the other basis: sift-limit-attack.md sec.7e');
  console.log('  records S_sat growing by a flat factor 2.05 per added prime, which is the');
  console.log('  mechanism behind the C^pi(z) price. If the column above sits at that value, the');
  console.log('  l1/l2 gap of the RAW coefficient family IS the C^pi(z) loss, not a proxy for it.');
  console.log(`  Model rho = c' W^{-g}:   g = ${fx(-c1, 6)}   c' = ${Math.exp(c0).toExponential(4)}   RSS = ${rss2.toExponential(2)}`);
  console.log('      (g = 1/2 would be "one term carries everything"; g = 0 would be a flat family)');
}

function S3() {
  console.log('\nS3 THE MECHANISM --- rho factors into within-e flatness times across-e spread\n');
  console.log('  Write P(e) = sum*_a |Theta_e(a)|^2 and n_e = #{a}. Then');
  console.log('      rho = [ sum_e r_e sqrt(P(e) n_e) ] / [ sqrt(sum_e P(e)) sqrt(sum_e n_e) ],');
  console.log('      r_e = ||Theta_e||_1 / sqrt(P(e) n_e)  in (0,1], the flatness INSIDE one modulus.');
  console.log('  So rho = F * X with F the n_e-weighted mean of r_e and X the across-e Cauchy-Schwarz');
  console.log('  ratio of the vectors sqrt(P(e)) and sqrt(n_e). F near 1 and X small means the');
  console.log('  unevenness is entirely a mismatch between where the MASS is and where the TERMS are.\n');
  console.log('  z     F (within-e)   X (across-e)   F*X      rho      top-e share of l1   #recs   e* of max l1');
  for (const r of ROWS) {
    let num = 0, sP = 0, sn = 0, bigE = 0, bigL1 = 0;
    for (const q of r.perE) { if (q.n === 0) continue; num += Math.sqrt(q.P * q.n); sP += q.P; sn += q.n; if (q.L1 > bigL1) { bigL1 = q.L1; bigE = q.e; } }
    const X = num / (Math.sqrt(sP) * Math.sqrt(sn));
    const F = r.L1 / num;
    console.log(`  ${String(r.z).padStart(2)}    ${fx(F, 6)}     ${fx(X, 6)}    ${fx(F * X, 6)}  ${fx(r.rho, 6)}      ${fx(bigL1 / r.L1, 6)}          ${r.perE.length}    ${bigE}`);
  }
  console.log('\n  Where the l1 mass sits, by omega(e) (the number of primes dividing the modulus):');
  for (const r of ROWS) {
    const by = new Map();
    for (const q of r.perE) { const o = by.get(q.om) || [0, 0]; o[0] += q.L1; o[1] += q.n; by.set(q.om, o); }
    const ks = [...by.keys()].sort((a, b) => a - b);
    console.log(`  z=${String(r.z).padStart(2)}  ` + ks.map(k => `w=${k}: ${(100 * by.get(k)[0] / r.L1).toFixed(1)}% l1 / ${(100 * by.get(k)[1] / r.n).toFixed(1)}% terms`).join('   '));
  }
}

function S4() {
  console.log('\nS4 THE WEIGHTED FAMILY, AND THE PRIZE\n');
  console.log('  The bound contains Theta_e(a) S_H(a/e), not Theta_e(a). By L3 the l2 norm of THAT');
  console.log('  family is exactly rms(R_H), so the two ends of the conversion are:');
  console.log('      l1 end:  Ssup(H) = sum_{e,a}|Theta_e(a)||S_H(a/e)|      (the current bound)');
  console.log('      l2 end:  rms(R_H) = sqrt(<R^2>_H)                        (the proved mean square)');
  console.log('  rho_W = Ssup/(rms sqrt(#)) is the pre-registered ratio for the weighted family, and');
  console.log('  A = Ssup/(rms sqrt(2 ln W)) is the factor a PERFECT l1 -> l2 sqrt(log) theorem buys.\n');
  console.log('  z    H        Ssup(H)      rms(R_H)   rho_W       A = Ssup/(rms sqrt(2lnW))   sqrt(2 lnW)');
  for (const r of ROWS) {
    const s2 = Math.sqrt(2 * r.lnW);
    if (r.SsupNP !== null) {
      const rw = r.SsupNP / (r.rmsNP * Math.sqrt(r.n)), A = r.SsupNP / (r.rmsNP * s2);
      console.log(`  ${String(r.z).padStart(2)}  ${String(NP[r.z]).padStart(6)}  ${r.SsupNP.toFixed(4).padStart(11)}   ${r.rmsNP.toFixed(4).padStart(8)}   ${rw.toExponential(3)}      ${fx(A, 4).padStart(8)}                ${fx(s2, 3)}   (H = nP, exhaustive)`);
      r.A_NP = A; r.rhoW_NP = rw;
    }
    const rw2 = r.SsupHS / (r.rmsHS * Math.sqrt(r.n)), A2 = r.SsupHS / (r.rmsHS * s2);
    console.log(`  ${String(r.z).padStart(2)}  ${String(HSUP[r.z]).padStart(6)}  ${r.SsupHS.toFixed(4).padStart(11)}   ${r.rmsHS.toFixed(4).padStart(8)}   ${rw2.toExponential(3)}      ${fx(A2, 4).padStart(8)}                ${fx(s2, 3)}   (H = H_sup)`);
    r.A_HS = A2; r.rhoW_HS = rw2;
  }
  console.log('\n  Is the prize big enough? The l1 bound overshoots the TRUTH by Ssup(nP)/sup|R|,');
  console.log('  and a perfect conversion buys A. The route needs A >= overshoot.\n');
  console.log('  z    Ssup(nP)/sup|R|   A at nP    A/overshoot   sup/(rms sqrt(2lnW))   [embedded truth]');
  for (const r of ROWS) {
    if (!TRUESUP[r.z]) continue;
    const ov = r.SsupNP / TRUESUP[r.z];
    console.log(`  ${String(r.z).padStart(2)}       ${fx(ov, 4).padStart(8)}      ${fx(r.A_NP, 4).padStart(7)}     ${fx(r.A_NP / ov, 4).padStart(7)}          ${fx(TRUESUP[r.z] / (r.rmsNP * Math.sqrt(2 * r.lnW)), 4)}              ${TRUESUP[r.z]}`);
  }
  console.log('\n  A/overshoot = (rms sqrt(2 lnW))/sup|R| by construction, i.e. the reciprocal of the');
  console.log('  last column: a perfect conversion lands exactly on the truth divided by that number.');
}

function S5() {
  console.log('\nS5 WHAT THE THEOREM IS, AND THE ROOM IT HAS TO LIVE IN\n');
  console.log('  The l1 -> l2 sqrt(log) statement on this family, written out, is');
  console.log('      sup_x |R_H(x)| <= C * rms(R_H) * sqrt(2 ln W),');
  console.log('  because ||Theta S_H||_2 = rms(R_H) exactly (L3). That is the corpus\'s own sharp');
  console.log('  maximal law. It is TRUE only for C at or above the measured sup/(rms sqrt(2 lnW)),');
  console.log('  and it is TPC-implying below C_crit (phase1-T4-maximal-law.md sec.2(c)).\n');
  console.log('  z     C_true (measured)   C_crit (TPC line)   window width   window');
  for (const r of ROWS) {
    if (!TRUTHUNION[r.z] || !CCRIT[r.z]) continue;
    const lo = TRUTHUNION[r.z], hi = CCRIT[r.z];
    console.log(`  ${String(r.z).padStart(2)}       ${fx(lo, 4)}              ${fx(hi, 4)}              ${fx(hi / lo, 4)}x      [${fx(lo, 4)}, ${fx(hi, 4)}]${hi <= lo ? '  EMPTY' : ''}`);
  }
  console.log('\n  READ THE WINDOW THE RIGHT WAY ROUND, because the pre-registration sec.4 did not.');
  console.log('  C below C_true is FALSE. C in [C_true, C_crit] is TRUE and TPC-IMPLYING. C above');
  console.log('  C_crit is legal and delivers nothing (need >= z^2). Since C_true < C_crit at every');
  console.log('  level measured, the object HAS a constant that would imply the postulate, so every');
  console.log('  useful l1 -> l2 sqrt(log) theorem on this family is TPC-implying, and the width');
  console.log('  above is not room to work in: it is the slack phase1-T4 sec.2(c) means when it says');
  console.log('  "a maximal law that is loose by 50 per cent is still TPC-implying".');
  console.log('\n  Does it matter that the log is over POSITIONS (ln W) and not over the family');
  console.log('  (ln #)? A Salem-Zygmund statement would carry the second. The ratio of the two');
  console.log('  square roots is below 1 at every level, so reading the log over the family makes');
  console.log('  the conversion output SMALLER and the implication stronger, never weaker:');
  console.log('      ' + ROWS.map(r => `z=${r.z}: ${fx(Math.sqrt(Math.log(r.n)) / Math.sqrt(r.lnW), 4)}`).join('  '));
  console.log('\n  C_crit does not fall with z, so this is not a small-z artifact. phase1-T4');
  console.log('  sec.2(c) reports C_crit = 2.23, 1.72, 1.36, 1.42, 1.66, 1.45, 1.56, 1.51, 1.39 at');
  console.log('  z = 13..43, flat near 1.5 with no downward trend. C_true is only measurable');
  console.log('  where the exhaustive walk reaches, z <= 29, and is flat there too.');
  console.log('\n  And the phenomenon itself, which row 5 asks about directly: does the family show');
  console.log('  square-root cancellation at all? C_true IS that measurement, against 1:');
  console.log('      ' + ROWS.filter(r => TRUTHUNION[r.z]).map(r => `z=${r.z}: ${fx(TRUTHUNION[r.z], 4)}`).join('   '));
  console.log('  All below 1, none decaying: the phases DO cancel to the random-sign size at the');
  console.log('  worst position, so the statement an import would have to prove is already');
  console.log('  MEASURED TRUE. What is missing is a proof, and the proof is the maximal law.');
}

function main() {
  console.log('IMPORT-MAP ROW 5 --- the l1/l2 measurement on Theta_e(a).  s = ' + S_LEVEL + (QUICK ? '  [--quick]' : ''));
  console.log('Pre-registration: research/history/staging/import-l1l2-prereg.md, committed first.\n');
  buildAll();
  const secs = process.argv.filter(a => /^S[0-5]$/.test(a));
  const run = { S0, S1, S2, S3, S4, S5 };
  const order = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5'];
  // S1 must run before S2/S3/S4 (it stores rho); S4 before nothing.
  for (const k of order) if (!secs.length || secs.includes(k) || k === 'S1') run[k]();
  console.log(`\ndone  [${el()}]`);
}
main();

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/import-l1l2-01.js
//   invocation:  node research/import-l1l2-01.js
//   code-sha256: 94d985fb6bb8bfac49238e473d3b3412b7b9b7adbb76272aabbda130d4bdae97
//   out-sha256:  62a58e3ad289d93170b9e2bd6e06abaddb6d9bb6b93f6004afeaf9cd2a28f8ab
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     195.1 s
// ============================================================================
// IMPORT-MAP ROW 5 --- the l1/l2 measurement on Theta_e(a).  s = 3
// Pre-registration: research/history/staging/import-l1l2-prereg.md, committed first.
//
//   built z=13  #(e,a)=2.309e+3  ||Theta||_1=5.033054e+0   [0.0s]
//   built z=17  #(e,a)=3.003e+4  ||Theta||_1=1.055840e+1   [0.1s]
//   built z=19  #(e,a)=5.105e+5  ||Theta||_1=2.100775e+1   [0.1s]
//   built z=23  #(e,a)=2.649e+6  ||Theta||_1=3.838140e+1   [0.6s]
//   built z=29  #(e,a)=1.719e+7  ||Theta||_1=7.279948e+1   [2.0s]
//   built z=31  #(e,a)=6.058e+7  ||Theta||_1=1.228344e+2   [6.9s]
//   built z=37  #(e,a)=5.251e+8  ||Theta||_1=2.862821e+2   [49.0s]
//   built z=41  #(e,a)=1.795e+9  ||Theta||_1=4.918471e+2   [194.1s]
//
// S0 CUSTODY --- six reproductions before a single new number is read
//
//   (a) the peeled sweep against the direct term-by-term sums (phi(e)2^omega(e),
//       Math.cos/Math.sin, no plan), at the two levels where direct is affordable:
//       z=13: ||Theta||_1 5.033054091 vs 5.033054091 rel 2.47e-15 | ||Theta||_2^2 rel 2.52e-15 | #(e,a) 2309 vs 2309   [194.1s]
//       z=17: ||Theta||_1 10.558403630 vs 10.558403630 rel 3.35e-14 | ||Theta||_2^2 rel 1.50e-14 | #(e,a) 30029 vs 30029   [194.1s]
//
//   (b) the same sweep against lemmaV-sup-extension.js EXT.sweep(), an independently
//       written peel with a polynomial sine, on the four quantities they share.
//       Run at z <= 29 only: it is a second full sweep, and the top levels cost more
//       than the check is worth once five levels have agreed to 1e-11.
//       z=13: Ssat rel 1.14e-11 | ||Theta||_2^2 rel 2.40e-16 | #(e,a) EQUAL | Ssup(H_sup) rel 3.37e-11   [194.1s]
//       z=17: Ssat rel 8.99e-12 | ||Theta||_2^2 rel 1.39e-16 | #(e,a) EQUAL | Ssup(H_sup) rel 7.24e-11   [194.1s]
//       z=19: Ssat rel 6.98e-12 | ||Theta||_2^2 rel 0.00e+0 | #(e,a) EQUAL | Ssup(H_sup) rel 5.75e-11   [194.1s]
//       z=23: Ssat rel 5.99e-12 | ||Theta||_2^2 rel 1.60e-16 | #(e,a) EQUAL | Ssup(H_sup) rel 5.57e-11   [194.2s]
//       z=29: Ssat rel 4.67e-12 | ||Theta||_2^2 rel 0.00e+0 | #(e,a) EQUAL | Ssup(H_sup) rel 5.61e-11   [194.5s]
//
//   (c) ||Theta||_2^2 and #(e,a) against the EMBEDDED Var(c) and #(e,a) columns of
//       lemmaV-sup-extension.js S5 and S3 (4-digit and 5-digit quotations):
//       z=13: ||Theta||_2^2 5.7920e-2 vs 5.792e-2 rel 6.76e-6 | #(e,a) 2.3090e+3 vs 2.3090e+3 rel 0.00e+0
//       z=17: ||Theta||_2^2 4.9840e-2 vs 4.984e-2 rel 4.72e-6 | #(e,a) 3.0029e+4 vs 3.0029e+4 rel 0.00e+0
//       z=19: ||Theta||_2^2 4.6515e-2 vs 4.652e-2 rel 1.01e-4 | #(e,a) 5.1051e+5 vs 5.1051e+5 rel 1.96e-6
//       z=23: ||Theta||_2^2 4.3278e-2 vs 4.328e-2 rel 3.89e-5 | #(e,a) 2.6494e+6 vs 2.6494e+6 rel 1.85e-5
//       z=29: ||Theta||_2^2 3.8781e-2 vs 3.878e-2 rel 3.36e-5 | #(e,a) 1.7193e+7 vs 1.7193e+7 rel 1.69e-6
//       z=31: ||Theta||_2^2 3.6648e-2 vs 3.665e-2 rel 4.57e-5 | #(e,a) 6.0577e+7 vs 6.0577e+7 rel 5.37e-6
//       z=37: ||Theta||_2^2 3.3651e-2 vs 3.365e-2 rel 3.31e-5 | #(e,a) 5.2512e+8 vs 5.2512e+8 rel 6.18e-6
//       z=41: ||Theta||_2^2 3.2374e-2 vs 3.237e-2 rel 1.26e-4 | #(e,a) 1.7951e+9 vs 1.7951e+9 rel 2.59e-5
//
//   (d) Ssup(nP) against the embedded reference of lemmaV-sup-extension.js S0(c):
//       z=13: H=60  11.446659 vs 11.446659 rel 4.31e-8
//       z=17: H=126  28.411760 vs 28.411760 rel 6.93e-9
//       z=19: H=198  60.038210 vs 60.038210 rel 4.90e-9
//       z=23: H=258  118.327993 vs 118.327993 rel 2.84e-9
//
//   (e) the spectral mean square sum_{e,a}|Theta|^2|S_H(a/e)|^2 from the SAME sweep
//       against the repository's INDEPENDENT O(N^2) divisor-pair meanSquare().
//       This is L3, and a match validates the whole Theta path at once:
//       z=13 H=60: sweep 1.427694384  meanSquare() 1.427694384  rel 1.24e-15   [194.5s]
//       z=17 H=126: sweep 2.215755899  meanSquare() 2.215755899  rel 1.32e-14   [194.6s]
//       z=19 H=198: sweep 2.096107419  meanSquare() 2.096107419  rel 2.95e-13   [195.0s]
//
//   (f) rms(R_nP) and rms(R_Hsup) against the embedded S1 and S3 columns:
//       z=13: rms(H_sup) 0.8006 vs 0.8006 rel 5.45e-5 | rms(nP) 1.1949 vs 1.1949 rel 3.21e-5
//       z=17: rms(H_sup) 2.2635 vs 2.2635 rel 1.32e-5 | rms(nP) 1.4885 vs 1.4885 rel 2.79e-5
//       z=19: rms(H_sup) 2.7877 vs 2.7877 rel 9.24e-6 | rms(nP) 1.4478 vs 1.4478 rel 4.16e-6
//       z=23: rms(H_sup) 3.3467 vs 3.3467 rel 5.21e-6 | rms(nP) 1.7365 vs 1.7365 rel 1.17e-5
//       z=29: rms(H_sup) 4.2195 vs 4.2195 rel 4.61e-6
//       z=31: rms(H_sup) 5.4216 vs 5.4216 rel 6.56e-6
//       z=37: rms(H_sup) 8.4046 vs 8.4046 rel 4.91e-6
//       z=41: rms(H_sup) 10.1577 vs 10.1577 rel 4.54e-6
//
// S1 THE PRE-REGISTERED RATIO --- rho = ||Theta||_1 / (||Theta||_2 sqrt(#))
//
//   Cauchy-Schwarz gives rho <= 1, with equality iff every |Theta_e(a)| is the same.
//   N_eff = (||Theta||_1/||Theta||_2)^2 = rho^2 # is the participation ratio: the
//   number of EQUAL-sized terms that would carry the same l1 mass. The kill line
//   pre-registered from IMPORT-MAP row 5 is rho >= 0.5 at every level.
//
//   z    #(e,a)       ||Theta||_1   ||Theta||_2   ||Theta||_2 sqrt(#)      rho        N_eff      N_eff/#     ||T||_1/||T||_2
//   13  2.3090e+3  5.03305e+0   2.40667e-1   1.15645e+1   0.435215   4.3735e+2   1.89e-1          20.91
//   17  3.0029e+4  1.05584e+1   2.23249e-1   3.86866e+1   0.272922   2.2367e+3   7.45e-2          47.29
//   19  5.1051e+5  2.10078e+1   2.15674e-1   1.54099e+2   0.136326   9.4878e+3   1.86e-2          97.41
//   23  2.6494e+6  3.83814e+1   2.08034e-1   3.38620e+2   0.113346   3.4039e+4   1.28e-2         184.50
//   29  1.7193e+7  7.27995e+1   1.96930e-1   8.16559e+2   0.089154   1.3666e+5   7.95e-3         369.67
//   31  6.0577e+7  1.22834e+2   1.91438e-1   1.48999e+3   0.082440   4.1170e+5   6.80e-3         641.64
//   37  5.2512e+8  2.86282e+2   1.83442e-1   4.20366e+3   0.068103   2.4355e+6   4.64e-3        1560.61
//   41  1.7951e+9  4.91847e+2   1.79928e-1   7.62340e+3   0.064518   7.4724e+6   4.16e-3        2733.58
//
//   Verdict against the pre-registered kill line:
//       max rho = 0.435215, min rho = 0.064518.  rho >= 0.5 at every level? NO -- criterion does NOT fire
//       monotone decreasing in z? YES   (P1 predicted rho(13) in [0.05,0.40] and monotone decrease)
//
// S2 THE DECAY RATE --- which the pre-registration calls the size of the prize
//
//   Per added prime: how each factor moves from one level to the next. sqrt(#) is
//   what rho fights, and the question is whether ||Theta||_1 keeps up with it.
//
//   step        rho ratio   ||Theta||_1 ratio  ||Theta||_2 ratio  sqrt(#) ratio   (||T||_1/||T||_2) ratio   local g
//   13 -> 17    0.6271      2.0978             0.9276             3.6063          2.2615             0.3638
//   17 -> 19    0.4995      1.9897             0.9661             4.1232          2.0596             0.4900
//   19 -> 23    0.8314      1.8270             0.9646             2.2781          1.8941             0.2242
//   23 -> 29    0.7866      1.8967             0.9466             2.5474          2.0037             0.2568
//   29 -> 31    0.9247      1.6873             0.9721             1.8771          1.7357             0.1243
//   31 -> 37    0.8261      2.3306             0.9582             2.9442          2.4322             0.1769
//   37 -> 41    0.9474      1.7181             0.9808             1.8489          1.7516             0.0880
//
//   Model rho = c A^{pi(z)} / sqrt(W)  (P2's shape, A in [1.5,2.5] predicted):
//       A = 3.686311   c = 1.6212e-2   RSS = 1.32e+0 on 8 points
//       residuals in ln:  0.6395  0.1507  -0.4315  -0.4485  -0.4254  -0.1247  0.0966  0.5434
//
//   local g is the step-by-step decay exponent in rho ~ #^{-g/2}: g = 1 would be a
//   family whose l1 mass sits on O(1) terms, g = 0 a flat family. It is NOT constant.
//
//   The second-to-last column is the growth of ||Theta||_1/||Theta||_2 per ADDED PRIME. The
//   corpus already owns that number in the other basis: sift-limit-attack.md sec.7e
//   records S_sat growing by a flat factor 2.05 per added prime, which is the
//   mechanism behind the C^pi(z) price. If the column above sits at that value, the
//   l1/l2 gap of the RAW coefficient family IS the C^pi(z) loss, not a proxy for it.
//   Model rho = c' W^{-g}:   g = 0.081980   c' = 5.5061e-1   RSS = 4.96e-1
//       (g = 1/2 would be "one term carries everything"; g = 0 would be a flat family)
//
// S3 THE MECHANISM --- rho factors into within-e flatness times across-e spread
//
//   Write P(e) = sum*_a |Theta_e(a)|^2 and n_e = #{a}. Then
//       rho = [ sum_e r_e sqrt(P(e) n_e) ] / [ sqrt(sum_e P(e)) sqrt(sum_e n_e) ],
//       r_e = ||Theta_e||_1 / sqrt(P(e) n_e)  in (0,1], the flatness INSIDE one modulus.
//   So rho = F * X with F the n_e-weighted mean of r_e and X the across-e Cauchy-Schwarz
//   ratio of the vectors sqrt(P(e)) and sqrt(n_e). F near 1 and X small means the
//   unevenness is entirely a mismatch between where the MASS is and where the TERMS are.
//
//   z     F (within-e)   X (across-e)   F*X      rho      top-e share of l1   #recs   e* of max l1
//   13    0.864409     0.503483    0.435215  0.435215      0.059241          31    2310
//   17    0.821339     0.332288    0.272922  0.272922      0.034732          63    1365
//   19    0.811138     0.168068    0.136326  0.136326      0.017384          127    510510
//   23    0.813406     0.139348    0.113346  0.113346      0.013184          243    138567
//   29    0.815444     0.109332    0.089154  0.089154      0.007285          448    289731
//   31    0.814070     0.101269    0.082440  0.082440      0.004503          763    646323
//   37    0.802644     0.084848    0.068103  0.068103      0.001984          1494    2357178
//   41    0.799903     0.080657    0.064518  0.064518      0.001185          2501    2295147
//
//   Where the l1 mass sits, by omega(e) (the number of primes dividing the modulus):
//   z=13  w=1: 8.7% l1 / 1.0% terms   w=2: 25.6% l1 / 8.1% terms   w=3: 36.0% l1 / 28.2% terms   w=4: 23.8% l1 / 41.9% terms   w=5: 5.9% l1 / 20.8% terms
//   z=17  w=1: 4.2% l1 / 0.1% terms   w=2: 14.4% l1 / 1.5% terms   w=3: 28.4% l1 / 9.6% terms   w=4: 32.1% l1 / 29.3% terms   w=5: 17.6% l1 / 40.3% terms   w=6: 3.3% l1 / 19.2% terms
//   z=19  w=1: 2.2% l1 / 0.0% terms   w=2: 9.3% l1 / 0.2% terms   w=3: 21.8% l1 / 2.0% terms   w=4: 31.6% l1 / 10.8% terms   w=5: 24.3% l1 / 29.9% terms   w=6: 9.1% l1 / 39.0% terms   w=7: 1.7% l1 / 18.1% terms
//   z=23  w=1: 1.3% l1 / 0.0% terms   w=2: 6.3% l1 / 0.1% terms   w=3: 17.2% l1 / 1.1% terms   w=4: 29.3% l1 / 9.1% terms   w=5: 28.3% l1 / 30.0% terms   w=6: 14.4% l1 / 40.9% terms   w=7: 3.3% l1 / 18.9% terms
//   z=29  w=1: 0.7% l1 / 0.0% terms   w=2: 3.9% l1 / 0.0% terms   w=3: 12.2% l1 / 0.4% terms   w=4: 25.3% l1 / 5.1% terms   w=5: 31.9% l1 / 27.2% terms   w=6: 20.8% l1 / 44.0% terms   w=7: 5.3% l1 / 23.3% terms
//   z=31  w=1: 0.4% l1 / 0.0% terms   w=2: 2.7% l1 / 0.0% terms   w=3: 9.7% l1 / 0.3% terms   w=4: 22.7% l1 / 4.7% terms   w=5: 33.1% l1 / 23.9% terms   w=6: 24.4% l1 / 42.8% terms   w=7: 6.9% l1 / 25.5% terms   w=8: 0.2% l1 / 2.7% terms
//   z=37  w=1: 0.2% l1 / 0.0% terms   w=2: 1.3% l1 / 0.0% terms   w=3: 5.1% l1 / 0.1% terms   w=4: 15.0% l1 / 1.5% terms   w=5: 29.0% l1 / 13.7% terms   w=6: 31.5% l1 / 37.2% terms   w=7: 15.7% l1 / 36.1% terms   w=8: 2.2% l1 / 11.4% terms
//   z=41  w=1: 0.1% l1 / 0.0% terms   w=2: 0.8% l1 / 0.0% terms   w=3: 3.8% l1 / 0.0% terms   w=4: 12.5% l1 / 1.1% terms   w=5: 27.2% l1 / 10.9% terms   w=6: 33.1% l1 / 32.9% terms   w=7: 18.9% l1 / 39.1% terms   w=8: 3.6% l1 / 16.0% terms
//
// S4 THE WEIGHTED FAMILY, AND THE PRIZE
//
//   The bound contains Theta_e(a) S_H(a/e), not Theta_e(a). By L3 the l2 norm of THAT
//   family is exactly rms(R_H), so the two ends of the conversion are:
//       l1 end:  Ssup(H) = sum_{e,a}|Theta_e(a)||S_H(a/e)|      (the current bound)
//       l2 end:  rms(R_H) = sqrt(<R^2>_H)                        (the proved mean square)
//   rho_W = Ssup/(rms sqrt(#)) is the pre-registered ratio for the weighted family, and
//   A = Ssup/(rms sqrt(2 ln W)) is the factor a PERFECT l1 -> l2 sqrt(log) theorem buys.
//
//   z    H        Ssup(H)      rms(R_H)   rho_W       A = Ssup/(rms sqrt(2lnW))   sqrt(2 lnW)
//   13      60      11.4467     1.1949   1.994e-1        2.4341                3.936   (H = nP, exhaustive)
//   13     198      10.4063     0.8006   2.705e-1        3.3028                3.936   (H = H_sup)
//   17     126      28.4118     1.4885   1.101e-1        4.2033                4.541   (H = nP, exhaustive)
//   17     683      32.0666     2.2635   8.175e-2        3.1199                4.541   (H = H_sup)
//   19     198      60.0382     1.4478   5.804e-2        8.0883                5.127   (H = nP, exhaustive)
//   19    1833      72.5791     2.7877   3.644e-2        5.0781                5.127   (H = H_sup)
//   23     258     118.3280     1.7365   4.186e-2       12.0132                5.672   (H = nP, exhaustive)
//   23    4278     146.1371     3.3467   2.683e-2        7.6981                5.672   (H = H_sup)
//   29   10384     309.6710     4.2195   1.770e-2       11.8363                6.200   (H = H_sup)
//   31   20586     563.0990     5.4216   1.334e-2       15.4519                6.722   (H = H_sup)
//   37   52989    1459.4064     8.4046   7.578e-3       24.0689                7.214   (H = H_sup)
//   41  103823    2644.7690    10.1577   6.145e-3       33.8198                7.699   (H = H_sup)
//
//   Is the prize big enough? The l1 bound overshoots the TRUTH by Ssup(nP)/sup|R|,
//   and a perfect conversion buys A. The route needs A >= overshoot.
//
//   z    Ssup(nP)/sup|R|   A at nP    A/overshoot   sup/(rms sqrt(2lnW))   [embedded truth]
//   13         4.3205       2.4341      0.5634          0.5634              2.6494
//   17         5.7744       4.2033      0.7279          0.7279              4.9203
//   19         8.7771       8.0883      0.9215          0.9215              6.8403
//   23        15.1398      12.0132      0.7935          0.7935              7.8157
//
//   A/overshoot = (rms sqrt(2 lnW))/sup|R| by construction, i.e. the reciprocal of the
//   last column: a perfect conversion lands exactly on the truth divided by that number.
//
// S5 WHAT THE THEOREM IS, AND THE ROOM IT HAS TO LIVE IN
//
//   The l1 -> l2 sqrt(log) statement on this family, written out, is
//       sup_x |R_H(x)| <= C * rms(R_H) * sqrt(2 ln W),
//   because ||Theta S_H||_2 = rms(R_H) exactly (L3). That is the corpus's own sharp
//   maximal law. It is TRUE only for C at or above the measured sup/(rms sqrt(2 lnW)),
//   and it is TPC-implying below C_crit (phase1-T4-maximal-law.md sec.2(c)).
//
//   z     C_true (measured)   C_crit (TPC line)   window width   window
//   13       0.5634              2.2250              3.9492x      [0.5634, 2.2250]
//   17       0.7279              1.7200              2.3630x      [0.7279, 1.7200]
//   19       0.9215              1.3580              1.4737x      [0.9215, 1.3580]
//   23       0.7935              1.4180              1.7870x      [0.7935, 1.4180]
//   29       0.8507              1.6600              1.9513x      [0.8507, 1.6600]
//
//   READ THE WINDOW THE RIGHT WAY ROUND, because the pre-registration sec.4 did not.
//   C below C_true is FALSE. C in [C_true, C_crit] is TRUE and TPC-IMPLYING. C above
//   C_crit is legal and delivers nothing (need >= z^2). Since C_true < C_crit at every
//   level measured, the object HAS a constant that would imply the postulate, so every
//   useful l1 -> l2 sqrt(log) theorem on this family is TPC-implying, and the width
//   above is not room to work in: it is the slack phase1-T4 sec.2(c) means when it says
//   "a maximal law that is loose by 50 per cent is still TPC-implying".
//
//   Does it matter that the log is over POSITIONS (ln W) and not over the family
//   (ln #)? A Salem-Zygmund statement would carry the second. The ratio of the two
//   square roots is below 1 at every level, so reading the log over the family makes
//   the conversion output SMALLER and the implication stronger, never weaker:
//       z=13: 1.0000  z=17: 1.0000  z=19: 1.0000  z=23: 0.9588  z=29: 0.9309  z=31: 0.8906  z=37: 0.8784  z=41: 0.8480
//
//   C_crit does not fall with z, so this is not a small-z artifact. phase1-T4
//   sec.2(c) reports C_crit = 2.23, 1.72, 1.36, 1.42, 1.66, 1.45, 1.56, 1.51, 1.39 at
//   z = 13..43, flat near 1.5 with no downward trend. C_true is only measurable
//   where the exhaustive walk reaches, z <= 29, and is flat there too.
//
//   And the phenomenon itself, which row 5 asks about directly: does the family show
//   square-root cancellation at all? C_true IS that measurement, against 1:
//       z=13: 0.5634   z=17: 0.7279   z=19: 0.9215   z=23: 0.7935   z=29: 0.8507
//   All below 1, none decaying: the phases DO cancel to the random-sign size at the
//   worst position, so the statement an import would have to prove is already
//   MEASURED TRUE. What is missing is a proof, and the proof is the maximal law.
//
// done  [195.1s]
// ============================================================================
// READINGS
//
// 1. THE KILL LINE DOES NOT FIRE. rho = 0.435215, 0.272922, 0.136326, 0.113346,
//    0.089154, 0.082440, 0.068103, 0.064518 at z = 13..41, monotone decreasing at
//    all seven steps. The pre-registered line was rho >= 0.5 at EVERY level; the
//    maximum over the ladder is 0.435215, at the smallest level.
//
// 2. AND A LOW rho IS NOT A SURVIVAL. Cauchy-Schwarz makes rho = 1 the case with
//    the MOST to win from an l1 -> l2 conversion (a gain of sqrt(#)) and rho ~
//    1/sqrt(#) the case with nothing to win. The gain actually available is
//    ||Theta||_1/||Theta||_2 = sqrt(N_eff), which reads 20.91 at z = 13 and
//    2733.58 at z = 41.
//
// 3. THAT GAIN IS THE C^pi(z) PRICE ITSELF. Its per-added-prime factors are
//    2.2615, 2.0596, 1.8941, 2.0037, 1.7357, 2.4322, 1.7516, i.e. 20.91 to
//    2733.58 over seven primes, 2.01 per prime. sift-limit-attack.md sec.7e
//    records S_sat growing at a flat 2.0516 per added prime as THE mechanism
//    behind C^pi(z). Two per cent apart, from an independent definition.
//
// 4. THE DECAY HAS NO SINGLE RATE. The local exponent in rho ~ #^{-g/2} is
//    0.3638, 0.4900, 0.2242, 0.2568, 0.1243, 0.1769, 0.0880 -- falling by a
//    factor 4 across the ladder, so the family is becoming FLATTER. The global
//    fits are correspondingly poor (rho = 5.5061e-1 W^{-0.081980}, RSS 4.96e-1).
//
// 5. THE UNEVENNESS IS ACROSS MODULI, NOT INSIDE THEM. F (within-e flatness) is
//    0.864409 to 0.799903, flat, while X (across-e) falls 0.503483 to 0.080657.
//    Inside one modulus the coefficients are of one size, so there is no
//    square-root cancellation there for a conversion to harvest.
//
// 6. THE CONVERSION IS THE SHARP MAXIMAL LAW. ||Theta S_H||_2 = rms(R_H) exactly
//    (S0(e): rel 1.24e-15, 1.32e-14, 2.95e-13 against the independent O(N^2)
//    meanSquare), so the l1 -> l2 sqrt(log) statement IS
//    sup|R_H| <= C rms(R_H) sqrt(2 ln W). A at H_sup reproduces the corpus's own
//    TIGHTNESS column digit for digit: 3.3028, 3.1199, 5.0781, 7.6981, 11.8363,
//    15.4519, 24.0689, 33.8198.
//
// 7. AND EVERY TRUE VERSION OF IT IS TPC-IMPLYING. C_true = 0.5634, 0.7279,
//    0.9215, 0.7935, 0.8507 sits below C_crit = 2.2250, 1.7200, 1.3580, 1.4180,
//    1.6600 at all five levels where the exhaustive walk reaches. Below C_true
//    the theorem is false; above C_crit it delivers nothing; the 1.4737x to
//    3.9492x between them is slack inside the TPC-implying region, not room.
//
// 8. THE PHENOMENON IS ALREADY MEASURED TRUE. C_true against 1 is the answer to
//    row 5's own question, and 0.5634 to 0.9215 with no trend says the arithmetic
//    phases cancel to the random-sign size at the worst position. What an import
//    would supply is not the fact but the proof, and reading the log over the
//    family instead of over positions only shrinks the output further (1.0000 to
//    0.8480).
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded run of this file does not
// contain verbatim actually is. No number above was changed.
//
// SAME VALUE, DIFFERENT NOTATION: the -0.081980 in "rho = 5.5061e-1
// W^{-0.081980}" is the run's own printed decay exponent, "g = 0.081980
// c' = 5.5061e-1 RSS = 4.96e-1"; the minus sign belongs to the model shape
// W^{-g}, not to the value.
//
// BORROWED, verified present in the named producer: the flat 2.0516 per added
// prime is research/sift-limit-attack.md sec.7e, which states "S_sat's
// per-added-prime factor recomputes at 2.0516". This run's own comparable
// figure is the 2.01 per prime derived just above it.
// ---------------------------------------------------------------------------
