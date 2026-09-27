'use strict';
// ATTACK 7 — THE tau(m) RE-PRICING: what does the cheaper quantifier price buy?
/* ============================================================================
   attack-tau-repricing.js  (2026-08-18)

   QUESTION
   research/history/staging/attack-theta-last-gap.md section 6 (C1) established
   that all of the x-dependence in the step that removes the position quantifier
   sits in a single factor e(-hx/m), concluded that the quantifier is therefore
   separable, and its section 7 stated the consequence as "its price is tau(m),
   not C^{pi(z)}". research/sift-limit-attack.md section 4.5 and TODO.md item B
   were corrected to say so hours later. Nothing downstream was recomputed.

   This script does three things, in this order and no other:
     1. Derives the separability claim here, from scratch, against brute force,
        instead of inheriting it. If it is wrong, that is the report.
     2. Recomputes the all-positions exponent u_1^prov under every reading of a
        per-modulus price, including a price of exactly 1, over z = 13..47.
     3. Tests whether u_sup's closure used the price that changed.
   Then it prices the worst-case against the average-case reading of tau(m),
   which is the distinction the brief names and the one this project has been
   killed by three times.

   THE TWO OBJECTS THAT MUST NOT BE CONFLATED, stated before any number
   The chain has one absolute-value step and it does two things at once:

       sup_x | sum_{e,a} Theta_e(a) S_H(a/e) e(a x/e) |
         <= sum_{e,a} |Theta_e(a)| |S_H(a/e)|                 (Ssat, H-free)

   (i) |e(a x /e)| = 1 discharges the position quantifier. Free, pointwise.
   (ii) the triangle inequality over the pair (e,a) is what makes the result
        x-free at all, and it discards every cancellation ACROSS moduli.
   You cannot do (i) without (ii): a bound that still contains a sum over e is
   still a function of x. So "the quantifier is discharged at no cost" is a
   claim about (i) alone, and the cost lives in (ii). tau(m) bounds the number
   of terms INSIDE one Theta_e(a); it says nothing about (ii). Section C
   measures both and shows they are the same quantity at two granularities, not
   two competing prices.

   METHOD AND CUSTODY
   Everything is computed at s = 3.0, the level this corpus's B/B2 ladder runs
   at (research/attack-beta2-A-B-bounded.js S6(c)). Four published anchors are
   reproduced before anything new is computed: u_sup at z = 13..23, u_sat at
   z = 13..47, u_1^prov at z = 19, 23, 29, and Ssup(nP)/sup|R| at z = 13..23.
   The spectrum comes from research/lemmaV-parseval.js (attack 1's L3/L5), the
   Vabs profile from research/attack-beta2-A-B-bounded.js, the reference sweep
   from research/lemmaV-sup-extension.js. The peel in section 0 is this file's
   own and is checked against the reference sweep at every level.

   LEGEND. [VERIFIED] computed here. [MEASURED] finite range, no extrapolation.
   [PROVEN] with a source. [INFERRED] argued from the above.

   node research/attack-tau-repricing.js
   ============================================================================ */

const path = require('path');
const REPO = require(path.join(__dirname, 'sift-limit-lemmaV.js'));
const A1 = require(path.join(__dirname, 'lemmaV-parseval.js'));
const EXT = require(path.join(__dirname, 'lemmaV-sup-extension.js'));
const AB = require(path.join(__dirname, 'attack-beta2-A-B-bounded.js'));

const PI = Math.PI;
const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1) + 's';
const L = (s) => console.log(s);
const rule = () => L('-'.repeat(76));
const banner = (s) => { L(''); L('='.repeat(76)); L(s); L('='.repeat(76)); };
const f4 = (x) => x.toFixed(4);
const pad = (x, n) => String(x).padStart(n);

const BETA2 = 4.26645028;                 // DHR, paper/beta2-note.md
const THETA = 1.212157;                   // attack-theta-last-gap.md sec.2 working point
let SHAREOUT = [];
const NEEDEXP = (THETA - 1) / THETA;      // 0.17502..., the per-modulus saving asked for

function gcd(a, b) { while (b) { const t = a % b; a = b; b = t; } return a; }
function modinv(a, m) { if (m === 1) return 0; let g = m, x = 0, x1 = 1, a1 = ((a % m) + m) % m;
  while (a1) { const q = Math.floor(g / a1); [g, a1] = [a1, g - q * a1]; [x, x1] = [x1, x - q * x1]; }
  return ((x % m) + m) % m; }
function mulmod(a, b, m) { const p = a * b; if (p <= 9007199254740991) return p % m; return Number((BigInt(a) * BigInt(b)) % BigInt(m)); }
function primesBelow(n) { const s = new Uint8Array(n), o = []; for (let i = 2; i < n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j < n; j += i) s[j] = 1; } } return o; }
function thetaOf(z) { let t = 0; for (const p of primesBelow(z)) t += Math.log(p); return t; }
// |sin(pi t)| to relative 1e-9, the reference implementation's series
function sp(t0) { const t = t0 < 0.5 ? t0 : 1 - t0; const x = PI * t, x2 = x * x;
  return x * (1 + x2 * (-1 / 6 + x2 * (1 / 120 + x2 * (-1 / 5040 + x2 * (1 / 362880
    + x2 * (-1 / 39916800 + x2 * (1 / 6227020800))))))); }

// ---------------------------------------------------------------------------
// THIS FILE'S OWN PEEL. Same multilinear enumeration of every coprime (e,a) as
// research/lemmaV-sup-extension.js, with four accumulators it does not carry:
//   ACC0 sum_a |Theta_e(a)| / |sin(pi a/e)|              (Ssat, exact)
//   ACC1 sum_a |Theta_e(a)|^2                            (Parseval mass)
//   ACC2 count of a with Theta != 0
//   ACC3 sum_a 1 / |sin(pi a/e)|                         (the tau-trivial shell)
//   ACC4 sum_a |Theta_e(a)|^2 / (4 sin^2(pi a/e))        (the exact H-free B2)
//   ACC5 max_a |Theta_e(a)|^2                            (Theta*(e)^2)
//   ACC6 count of all coprime a
// ---------------------------------------------------------------------------
function planOf(rec, ps) {
  const e = rec.e, pf = []; for (const p of ps) if (e % p === 0) pf.push(p);
  const k = pf.length, A = new Float64Array(1 << k);
  for (const f of rec.fac) { let mask = 0; const e2 = f[0];
    for (let j = 0; j < k; j++) if (e2 % pf[j] === 0) mask |= (1 << j);
    A[mask] += f[2]; }
  const zr = [], zi = [], m = new Float64Array(k);
  for (let j = 0; j < k; j++) {
    const p = pf[j], ep = e / p, b = modinv(ep % p, p);
    const cr = new Float64Array(p), ci = new Float64Array(p);
    for (let a = 0; a < p; a++) { const th = 2 * PI * ((2 * a * b) % p) / p; cr[a] = Math.cos(th); ci[a] = Math.sin(th); }
    zr.push(cr); zi.push(ci); m[j] = mulmod(ep % e, b, e);
  }
  return { e, pf, k, A, zr, zi, m, pfArr: Int32Array.from(pf) };
}
function inner(e, invE, p, zrT, ziT, r0, i0, r1, i1, aStart, mLast, ACC) {
  let a = aStart, S = 0, Q = 0, n = 0, Rc = 0, B2 = 0, mx = 0, nall = 0;
  for (let aj = 1; aj < p; aj++) {
    const zr0 = zrT[aj], zi0 = ziT[aj];
    const re = r0 + zr0 * r1 - zi0 * i1, im = i0 + zr0 * i1 + zi0 * r1;
    const th2 = re * re + im * im;
    const s = sp(a * invE), is = 1 / s;
    nall++; Rc += is;
    if (th2 > 0) { const t = Math.sqrt(th2); S += t * is; Q += th2; n++; B2 += th2 * is * is / 4; if (th2 > mx) mx = th2; }
    a += mLast; if (a >= e) a -= e;
  }
  ACC[0] += S; ACC[1] += Q; ACC[2] += n; ACC[3] += Rc; ACC[4] += B2;
  if (mx > ACC[5]) ACC[5] = mx; ACC[6] += nall;
}
function peel(d, aPart, pl, LR, LI, ACC) {
  const k = pl.k, e = pl.e, p = pl.pfArr[d], zrT = pl.zr[d], ziT = pl.zi[d], md = pl.m[d];
  if (d === k - 1) {
    const cr = LR[d], ci = LI[d];
    let aStart = aPart + md; if (aStart >= e) aStart -= e;
    inner(e, 1 / e, p, zrT, ziT, cr[0], ci[0], cr[1], ci[1], aStart, md, ACC);
    return;
  }
  const cr = LR[d], ci = LI[d], nr = LR[d + 1], ni = LI[d + 1], LN = nr.length;
  let ap = aPart;
  for (let aj = 1; aj < p; aj++) {
    const zr0 = zrT[aj], zi0 = ziT[aj];
    for (let t = 0, u = 0; t < LN; t++, u += 2) {
      const rr = cr[u + 1], ii = ci[u + 1];
      nr[t] = cr[u] + zr0 * rr - zi0 * ii; ni[t] = ci[u] + zr0 * ii + zi0 * rr;
    }
    ap += md; if (ap >= e) ap -= e;
    peel(d + 1, ap, pl, LR, LI, ACC);
  }
}
// One pass over the whole spectrum of one z.
function fullSweep(SD) {
  const ACC = new Float64Array(7);
  let Ssat = 0, VarC = 0, B2ex = 0, B2star = 0, B2vabs = 0, SsatTriv = 0;
  let nNZ = 0, nAll = 0, tauSum = 0, tauMax = 0, ne = 0;
  for (const rec of SD.recs) {
    const pl = planOf(rec, SD.t.ps), k = pl.k;
    const LR = [], LI = [];
    for (let d = 0; d <= k; d++) { LR.push(new Float64Array(1 << (k - d))); LI.push(new Float64Array(1 << (k - d))); }
    LR[0].set(pl.A);
    for (let i = 0; i < 7; i++) ACC[i] = 0;
    peel(0, 0, pl, LR, LI, ACC);
    Ssat += ACC[0]; VarC += ACC[1]; nNZ += ACC[2]; nAll += ACC[6];
    B2ex += ACC[4];
    B2star += rec.e * rec.e * ACC[5] / 4;
    B2vabs += rec.e * rec.e * rec.va * rec.va / 4;
    SsatTriv += rec.va * ACC[3];
    tauSum += rec.fac.length; if (rec.fac.length > tauMax) tauMax = rec.fac.length;
    ne++;
  }
  return { Ssat, VarC, B2ex, B2star, B2vabs, SsatTriv, nNZ, nAll, tauSum, tauMax, ne };
}

// ---------------------------------------------------------------------------
// the divisor-pair basis, for the tau bookkeeping of section C
// ---------------------------------------------------------------------------
function pairCensus(z, s) {
  const D = Math.round(Math.pow(z, s));
  const t = REPO.buildTerms(z, D);
  const byQ = new Map();
  for (let i = 0; i < t.n; i++) byQ.set(t.q[i], (byQ.get(t.q[i]) || 0) + 1);
  let maxPair = 0, sumPair = 0, qmax = 0;
  for (const [q, c] of byQ) { sumPair += c; if (c > maxPair) maxPair = c; if (q > qmax) qmax = q; }
  return { t, N: t.n, nQ: byQ.size, maxPair, sumPair, qmax, byQ, M: t.M };
}

// ---------------------------------------------------------------------------
// fits used in section E: least squares in the stated regressor
// ---------------------------------------------------------------------------
function lsq(xs, ys) { const n = xs.length; let sx = 0, sy = 0, sxx = 0, sxy = 0;
  for (let i = 0; i < n; i++) { sx += xs[i]; sy += ys[i]; sxx += xs[i] * xs[i]; sxy += xs[i] * ys[i]; }
  const a = (n * sxy - sx * sy) / (n * sxx - sx * sx), b = (sy - a * sx) / n;
  let rss = 0; for (let i = 0; i < n; i++) { const r = ys[i] - (a * xs[i] + b); rss += r * r; }
  return { a, b, rss }; }

// ===========================================================================
banner('A. CUSTODY — four published anchors, reproduced before anything new');
// ===========================================================================
const ZS_FULL = [13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
const ZS_WALK = [13, 17, 19, 23];
const NP = { 13: 60, 17: 126, 19: 198, 23: 258 };
const SRC_USUP = { 13: '2.0617', 17: '2.3036', 19: '2.5518', 23: '2.6666' };
const SRC_USAT = { 13: '2.2850', 17: '2.4623', 19: '2.7228', 23: '2.8281', 29: '2.8827',
                   31: '3.0259', 37: '3.1644', 41: '3.2543', 43: '3.3448', 47: '3.4306' };
const SRC_U1P = { 19: '4.3604', 23: '4.7087', 29: '5.0021' };
const SRC_SSUPR = { 13: '4.32', 17: '5.77', 19: '8.78', 23: '15.14' };

L('  (a) u_sup and the measured price of the position quantifier, z = 13..23.');
L('      Ssup(nP)/sup_x|R| is what the triangle inequality over (e,a) actually');
L('      costs at the corpus\'s own floor window nP. Source for both columns:');
L('      research/history/staging/lemmaV-sup-extension.md sec.0.');
L('');
L('  z   H_sup   u_sup    src      Ssup(nP)   true sup|R|   ratio   src');
const WALKROW = {};
for (const z of ZS_WALK) {
  const SD = A1.spectralRecords(z, 3.0);
  const sw = EXT.sweep(SD, []);
  const fh = EXT.findHsup(SD, z, sw.Ssat, 60, true);
  const H = NP[z];
  const st = A1.supBoundTable(z, 3.0, [H]);
  const w = A1.walk(z, 3.0, H);
  const us = Math.log(fh.Hsup) / Math.log(z), rat = st.out[0] / w.sup;
  WALKROW[z] = { us, rat, Ssup: st.out[0], sup: w.sup, Hsup: fh.Hsup };
  L(`  ${pad(z, 2)}  ${pad(fh.Hsup, 6)}  ${f4(us)}  ${SRC_USUP[z]}  ${pad(st.out[0].toFixed(4), 10)}  ${pad(w.sup.toFixed(4), 12)}   ${pad(rat.toFixed(2), 5)}   ${SRC_SSUPR[z]}   [${el()}]`);
}

L('');
L('  (b) the exact spectrum, this file\'s peel against the reference sweep, and');
L('      u_sat = ln(Ssat/M)/ln z against lemmaV-sup-extension.md\'s ladder.');
L('');
L('  z    Ssat (mine)     Ssat (ref)     rel diff    u_sat    src      N        #(e,a)');
const SW = {};
for (const z of ZS_FULL) {
  const SD = A1.spectralRecords(z, 3.0);
  const mine = fullSweep(SD);
  const ref = z <= 41 ? EXT.sweep(SD, []) : null;
  const lz = Math.log(z), M = SD.M;
  const usat = Math.log(mine.Ssat / M) / lz;
  let lnW = 0; for (const p of SD.t.ps) lnW += Math.log(p);
  SW[z] = Object.assign(mine, { M, lz, lnW, N: SD.N, nrec: SD.recs.length });
  const rd = ref ? Math.abs(mine.Ssat - ref.Ssat) / ref.Ssat : null;
  L(`  ${pad(z, 2)}  ${mine.Ssat.toExponential(6)}  ${ref ? ref.Ssat.toExponential(6) : '   (not run) '}  ${ref ? rd.toExponential(2) : '   --   '}  ${f4(usat)}  ${(SRC_USAT[z] || '--')}  ${pad(SD.N, 7)}  ${pad(mine.nAll, 12)}   [${el()}]`);
}

L('');
L('  (c) u_1^prov, the all-positions exponent, reproduced against');
L('      research/history/staging/attack-AB-bounded.md sec.5 (the min(B*H, B2)');
L('      branch selection corrected there on 2026-08-18).');
L('');
L('  z   theta/lnz   B          B2 (Vabs)    u(B*H)    u(B2)    u_1^prov   src');
const U1P = {};
for (const z of ZS_FULL) {
  const P = AB.profile(z, 3.0), lz = Math.log(z), M = P.M;
  let lnW = 0; for (const p of P.ps) lnW += Math.log(p);
  let B2 = 0; for (const r of P.rec.values()) B2 += r.e * r.e * r.va * r.va; B2 /= 4;
  const uBH = (lnW + Math.log(P.B / (M * M))) / lz;
  const uB2 = (lnW / 2 + Math.log(B2) / 2 - Math.log(M)) / lz;
  U1P[z] = { lnW, M, lz, B: P.B, B2, uBH, uB2, u: Math.min(uBH, uB2) };
  L(`  ${pad(z, 2)}   ${f4(lnW / lz)}    ${P.B.toFixed(4)}   ${B2.toExponential(3)}   ${pad(f4(uBH), 7)}  ${pad(f4(uB2), 7)}  ${pad(f4(Math.min(uBH, uB2)), 8)}   ${(SRC_U1P[z] || '--')}   [${el()}]`);
}
L('');
L('  All four anchors reproduce. Everything below is computed from these same');
L('  objects, so a disagreement downstream is a disagreement about pricing and');
L('  not about arithmetic.');

// ===========================================================================
banner('B. SEPARABILITY, DERIVED HERE AND NOT INHERITED');
// ===========================================================================
L('');
L('  The claim under test (attack-theta-last-gap.md sec.6 C1): all of the');
L('  x-dependence in the remainder sits in a single factor e(-h x/m).');
L('');
L('  DERIVATION. For one joint class, exactly and with no approximation:');
L('    1[y = c mod q] - 1/q = (1/q) sum_{a=1}^{q-1} e(a(y-c)/q).');
L('  Write a = g a\', g = gcd(a,q), e = q/g > 1, so each divisor e > 1 of q and');
L('  each a\' coprime to e occurs exactly once. Summing y = x+1..x+H:');
L('    R(x) = sum_{e|P(z), e>1} sum*_{a mod e} Theta_e(a) S_H(a/e) e(a x/e),');
L('    Theta_e(a) = sum_{i : e | q_i} (w_i/q_i) e(-a c_i/e),  S_H(t) = sum_{m<=H} e(mt).');
L('  x appears once, in e(a x/e), and nowhere else. THE CLAIM IS TRUE.');
L('');
L('  Four independent checks follow, none of them a re-reading of the corpus.');
L('');
rule();
L('  (i) the one-class finite Fourier identity against a brute-force count');
{
  const z = 13, s = 3.0, H = 169;
  const c = pairCensus(z, s);
  const t = c.t;
  let worst = 0, tested = 0;
  const seen = new Set();
  for (let i = 0; i < t.n && tested < 12; i++) {
    const q = t.q[i]; if (q < 3 || seen.has(q)) continue;
    seen.add(q);
    const cc = t.c[i];
    for (const x of [0, 1, 7, 12345, 98765]) {
      let brute = 0;
      for (let m = 1; m <= H; m++) { const y = x + m; if (((y - cc) % q + q) % q === 0) brute++; }
      let re = H / q;
      for (let j = 1; j < q; j++) {
        // sum_{m<=H} e(jm/q) = e^{i w (H+1)/2} sin(wH/2)/sin(w/2),  w = 2 pi j/q
        const w = 2 * PI * j / q;
        const S = Math.sin(w * H / 2) / Math.sin(w / 2);
        const ang = w * (H + 1) / 2 + 2 * PI * j * (((x - cc) % q + q) % q) / q;
        re += S * Math.cos(ang) / q;
      }
      worst = Math.max(worst, Math.abs(re - brute));
    }
    tested++;
  }
  L(`      ${tested} distinct moduli x 5 positions at z = 13, H = 169`);
  L(`      worst |Fourier - brute force| = ${worst.toExponential(2)}   [${el()}]`);
}
rule();
L('  (ii) reciprocity: c(d1,d2)/(d1 d2) = -2 * inverse(d1)/d2 mod 1');
for (const z of [13, 17, 19, 23]) {
  const D = Math.round(Math.pow(z, 3.0));
  const t = REPO.buildTerms(z, D);
  let n = 0, bad = 0, worst = 0, skipped = 0;
  for (let i = 0; i < t.n; i++) {
    const d1 = t.d1[i], d2 = t.d2[i], q = t.q[i], c = t.c[i];
    if (gcd(d1, d2) !== 1) { skipped++; continue; }
    const lhs = c / q;
    const rhs = ((-2 * modinv(d1 % d2, d2)) % d2 + d2 * 2) % d2 / d2;
    const d = Math.abs(((lhs - rhs) % 1 + 1) % 1);
    const dd = Math.min(d, 1 - d);
    if (dd > 1e-12) bad++;
    worst = Math.max(worst, dd); n++;
  }
  L(`      z = ${pad(z, 2)}   ${pad(n, 7)} coprime pairs checked, ${pad(skipped, 6)} with gcd(d1,d2) = 2 skipped, ` +
    `violations ${bad}, worst ${worst.toExponential(2)}   [${el()}]`);
}
rule();
L('  (iii) the aggregate identity R(x) = sum_e sum*_a Theta_e(a) S_H(a/e) e(ax/e)');
L('        against a direct count over the full period, at every x in a sample');
{
  const z = 13, s = 3.0, H = 169;
  const SD = A1.spectralRecords(z, s);
  const D = Math.round(Math.pow(z, s));
  const t = REPO.buildTerms(z, D);
  let W = 1; for (const p of t.ps) W *= p;
  // direct: c(y) = sum_i w_i 1[y = c_i mod q_i]; R(x) = sum_{m<=H} (c(x+m) - M)
  const cnt = new Float64Array(W);
  for (let i = 0; i < t.n; i++) {
    const q = t.q[i], c0 = ((t.c[i] % q) + q) % q, w = t.w[i];
    for (let y = c0; y < W; y += q) cnt[y] += w;
  }
  const M = t.M;
  const xs = [0, 1, 2, 17, 100, 501, 1234, 2000, 2309];
  let worst = 0;
  for (const x of xs) {
    let direct = 0;
    for (let m = 1; m <= H; m++) direct += cnt[(x + m) % W] - M;
    let spec = 0;
    for (const rec of SD.recs) {
      const e = rec.e;
      for (let a = 1; a < e; a++) {
        if (gcd(a, e) !== 1) continue;
        let tr = 0, ti = 0;
        for (const fc of rec.fac) {
          if (fc[0] === 1) { tr += fc[2]; continue; }
          const th = 2 * PI * ((a * fc[1]) % fc[0]) / fc[0];
          tr += fc[2] * Math.cos(th); ti += fc[2] * Math.sin(th);
        }
        // S_H(a/e) e(ax/e), both as complex numbers
        const w1 = 2 * PI * a / e;
        const mag = Math.sin(w1 * H / 2) / Math.sin(w1 / 2);
        const ang = w1 * (H + 1) / 2;
        const sr = mag * Math.cos(ang), si = mag * Math.sin(ang);
        const px = 2 * PI * a * (x % e) / e;
        const pr = Math.cos(px), pi2 = Math.sin(px);
        const ur = sr * pr - si * pi2, ui = sr * pi2 + si * pr;
        spec += tr * ur - ti * ui;
      }
    }
    worst = Math.max(worst, Math.abs(spec - direct));
  }
  L(`      z = 13, H = 169, ${xs.length} positions, full period W = ${W}`);
  L(`      worst |spectral - direct| = ${worst.toExponential(2)}   [${el()}]`);
}
rule();
L('  (iv) the per-modulus term count is at most 3 tau(m) -- the three sign');
L('       combinations (-,+), (+,-), (+,+) of the vector sieve times the tau(m)');
L('       factorisations m = d1 d2 -- with EQUALITY at z = 13 and cut below it');
L('       from z = 17 on, because the level truncation d1, d2 <= z^s forbids');
L('       some factorisations. Its SUM over the modulus set is the divisor-pair');
L('       term count N, by definition, at every z. The last column is a');
L('       different object and is printed to keep them apart: the number of');
L('       NONZERO V(e1,e2) inside one Theta_e, which the truncation cuts far');
L('       further still.');
L('');
L('  z    N        #distinct m   max #pairs at one m   3*tau(P(z))   max #nonzero V in a Theta_e');
for (const z of [13, 17, 19, 23, 29]) {
  const c = pairCensus(z, 3.0);
  let om = 0; for (const p of primesBelow(z)) om++;
  L(`  ${pad(z, 2)}  ${pad(c.N, 7)}  ${pad(c.nQ, 11)}   ${pad(c.maxPair, 19)}   ${pad(3 * Math.pow(2, om), 11)}   ${pad(SW[z].tauMax, 27)}   [${el()}]`);
}
L('');
L('  VERDICT ON THE CLAIM. Separability holds, exactly, and is [VERIFIED] four');
L('  ways here. It is also NOT new: it is L5 of attack 1, written into');
L('  research/lemmaV-parseval.js lines 55-62 with the sentence "The window');
L('  position enters ONLY as the unimodular phase e(ax/e)". What was new on');
L('  2026-08-18 is the tau(m) reading of what that buys, and that is section C.');

// ===========================================================================
banner('C. THE TWO PRICES ARE ONE QUANTITY AT TWO GRANULARITIES');
// ===========================================================================
L('');
L('  Three x-free bounds on sup_x|R|, in increasing order of how much structure');
L('  they keep. All three are the SAME triangle inequality over (e,a); they');
L('  differ only in what is kept inside one modulus.');
L('');
L('    N          = #divisor pairs. |r_{d1,d2}| <= 1 termwise. Keeps nothing.');
L('    Ssat_triv  = sum_e Vabs(e) sum*_a 1/|sin(pi a/e)|,  Vabs = sum_{e1e2=e}|V|.');
L('                 tau(e) terms, each bounded. THIS IS THE tau(m) PRICE.');
L('    Ssat       = sum_e sum*_a |Theta_e(a)|/|sin(pi a/e)|. Keeps every');
L('                 cancellation inside one modulus. THIS IS WHAT THE CORPUS');
L('                 ALREADY COMPUTES, and what u_sup and u_sat are built from.');
L('');
L('  z    N          Ssat_triv     Ssat         N/Ssat   Striv/Ssat   u(N)     u_triv   u_sat');
for (const z of ZS_FULL) {
  const r = SW[z];
  const uN = Math.log(r.N / r.M) / r.lz;
  const ut = Math.log(r.SsatTriv / r.M) / r.lz;
  const us = Math.log(r.Ssat / r.M) / r.lz;
  L(`  ${pad(z, 2)}  ${pad(r.N, 9)}  ${r.SsatTriv.toExponential(4)}  ${r.Ssat.toExponential(4)}  ${pad((r.N / r.Ssat).toFixed(2), 7)}  ${pad((r.SsatTriv / r.Ssat).toFixed(2), 10)}   ${f4(uN)}   ${f4(ut)}   ${f4(us)}   [${el()}]`);
}
L('');
L('  GROWTH, per added prime (the ratio between consecutive z of each column):');
L('');
L('  z    N ratio   Striv ratio   Ssat ratio   (Striv/Ssat) ratio');
for (let i = 1; i < ZS_FULL.length; i++) {
  const a = SW[ZS_FULL[i - 1]], b = SW[ZS_FULL[i]];
  L(`  ${pad(ZS_FULL[i], 2)}   ${pad((b.N / a.N).toFixed(4), 7)}   ${pad((b.SsatTriv / a.SsatTriv).toFixed(4), 11)}   ${pad((b.Ssat / a.Ssat).toFixed(4), 10)}   ${pad(((b.SsatTriv / b.Ssat) / (a.SsatTriv / a.Ssat)).toFixed(4), 18)}`);
}
{
  const g = (k) => { const xs = [], ys = []; for (const z of ZS_FULL) { xs.push(Math.log(z)); ys.push(Math.log(SW[z][k])); } return lsq(xs, ys); };
  const gN = g('N'), gT = g('SsatTriv'), gS = g('Ssat');
  const xs = [], ys = []; for (const z of ZS_FULL) { xs.push(Math.log(z)); ys.push(Math.log(SW[z].SsatTriv / SW[z].Ssat)); }
  const gR = lsq(xs, ys);
  L('');
  L(`  log-log slope d ln(.)/d ln z over z = 13..47:  N ${gN.a.toFixed(4)}   Ssat_triv ${gT.a.toFixed(4)}   Ssat ${gS.a.toFixed(4)}`);
  L(`  and of the RATIO Ssat_triv/Ssat:  ${gR.a.toFixed(4)}   (RSS ${gR.rss.toExponential(3)})`);
  L(`  geometric mean per-added-prime factor:  N ${Math.pow(SW[47].N / SW[13].N, 1 / 9).toFixed(4)}   ` +
    `Ssat_triv ${Math.pow(SW[47].SsatTriv / SW[13].SsatTriv, 1 / 9).toFixed(4)}   Ssat ${Math.pow(SW[47].Ssat / SW[13].Ssat, 1 / 9).toFixed(4)}`);
  L(`  ratio Ssat_triv/Ssat at z = 13 and z = 47:  ${(SW[13].SsatTriv / SW[13].Ssat).toFixed(3)} and ${(SW[47].SsatTriv / SW[47].Ssat).toFixed(3)}`);
}
L('');
L('  THE READING. sum over the modulus set of tau(m) IS the divisor-pair count');
L('  N, by definition, and N grows geometrically in pi(z). So "the price is');
L('  tau(m)" and "the price is C^{pi(z)}" are the same statement, one written');
L('  per modulus and one written for the whole spectrum. They are not');
L('  alternatives, and the second is not replaced by the first.');

// ===========================================================================
banner('D. THE ALL-POSITIONS EXPONENT u_1^prov, RE-PRICED');
// ===========================================================================
L('');
L('  u_1^prov is the smallest u with H M >= sqrt(W min(B H, B2)), H = z^u,');
L('  W = P(z). The B2 branch wins at every z = 13..47 (attack-AB-bounded sec.5),');
L('  so u_1^prov = (theta(z)/2 + ln(B2)/2 - ln M)/ln z and B2 is the ONLY place');
L('  a per-modulus price enters. Four prices for B2, cheapest last:');
L('');
L('    B2_Vabs = (1/4) sum_e e^2 Vabs(e)^2         tau(e) terms each bounded');
L('    B2_star = (1/4) sum_e e^2 Theta*(e)^2       exact max over a');
L('    B2_ex   = sum_e sum*_a |Theta_e(a)|^2/(4 sin^2(pi a/e))   exact in a too');
L('    B2 = 1                                      a price of literally nothing');
L('');
L('  z    B2_Vabs      B2_star     B2_ex       Vabs/ex   u(Vabs)   u(star)   u(ex)    u(B2=1)');
const UROWS = [];
for (const z of ZS_FULL) {
  const r = SW[z], q = U1P[z];
  const uOf = (B2) => (q.lnW / 2 + Math.log(B2) / 2 - Math.log(q.M)) / q.lz;
  const row = { z, uV: uOf(r.B2vabs), uS: uOf(r.B2star), uE: uOf(r.B2ex), uF: uOf(1),
                B2vabs: r.B2vabs, B2star: r.B2star, B2ex: r.B2ex };
  UROWS.push(row);
  L(`  ${pad(z, 2)}  ${r.B2vabs.toExponential(4)}  ${r.B2star.toExponential(3)}  ${r.B2ex.toExponential(3)}  ${pad((r.B2vabs / r.B2ex).toFixed(2), 8)}  ${pad(f4(row.uV), 8)}  ${pad(f4(row.uS), 8)}  ${pad(f4(row.uE), 7)}  ${pad(f4(row.uF), 8)}   [${el()}]`);
}
L('');
L('  the saving the re-pricing actually delivers, in units of window exponent:');
L('');
L('  z    u(Vabs) - u(ex)   u(ex) - u(B2=1)   u(B2=1)          gap to theta < 2');
for (const r of UROWS) {
  L(`  ${pad(r.z, 2)}   ${pad((r.uV - r.uE).toFixed(4), 14)}   ${pad((r.uE - r.uF).toFixed(4), 15)}   ${pad(f4(r.uF), 14)}   ${pad((r.uF - 2).toFixed(4), 16)}`);
}
{
  const xs = [], ys = [], y2 = [];
  for (const r of UROWS) { xs.push(Math.log(r.z)); ys.push(r.uV - r.uE); y2.push(r.uF); }
  const g1 = lsq(xs, ys), g2 = lsq(xs, y2);
  L('');
  L(`  d(u(Vabs)-u(ex))/d ln z = ${g1.a.toFixed(4)}   (RSS ${g1.rss.toExponential(3)})   -- the re-pricing's slope`);
  L(`  d u(B2=1)/d ln z        = ${g2.a.toFixed(4)}   (RSS ${g2.rss.toExponential(3)})   -- the floor's slope`);
  L('');
  L('  and the floor in closed form. With B2 = 1 the exponent is exactly');
  L('    u_floor(z) = (theta(z)/2 - ln M)/ln z,  theta(z) = sum_{p<z} ln p.');
  L('  theta(z) ~ z, so u_floor diverges like z/(2 ln z) whatever the price is.');
  L('');
  L('  z      theta(z)   theta(z)/(2 ln z)   -ln M / ln z   u_floor   u_floor - 2');
  for (const z of ZS_FULL) {
    const q = U1P[z];
    L(`  ${pad(z, 3)}   ${pad(q.lnW.toFixed(3), 8)}   ${pad((q.lnW / (2 * q.lz)).toFixed(4), 17)}   ${pad((-Math.log(q.M) / q.lz).toFixed(4), 12)}   ${pad(f4((q.lnW / 2 - Math.log(q.M)) / q.lz), 7)}   ${pad(((q.lnW / 2 - Math.log(q.M)) / q.lz - 2).toFixed(4), 11)}`);
  }
}

// ===========================================================================
banner('E. DOES u_sup\'s CLOSURE DEPEND ON THE PRICE THAT CHANGED?');
// ===========================================================================
L('');
L('  u_sup was closed on three measurements (lemmaV-sup-extension.md sec.0-4):');
L('    (1) S_sat rises at every added level, constant model RSS 49x the best fit');
L('    (2) the bounded family A - B/ln z has asymptote A = 5.46, above beta_2');
L('    (3) model-free d ln S_sat/d ln z = 4.99 over ten levels, 6.20 over five');
L('  Each is a statement about S_sat. So the only way the tau(m) re-pricing can');
L('  reopen the closure is if S_sat was computed with the price that changed.');
L('  It was not: S_sat carries the EXACT |Theta_e(a)|, so all of the cancellation');
L('  tau(m) bounds is already inside it. Section C measured the unspent part at');
L('  Ssat_triv/Ssat. Here are the three closure numbers re-derived from scratch.');
L('');
{
  const zs = ZS_FULL, us = zs.map((z) => Math.log(SW[z].Ssat / SW[z].M) / Math.log(z));
  // model-free log-log slope of Ssat
  const xs = zs.map((z) => Math.log(z)), ys = zs.map((z) => Math.log(SW[z].Ssat));
  const g10 = lsq(xs, ys);
  const g5 = lsq(xs.slice(5), ys.slice(5));
  L(`  (3) d ln S_sat/d ln z  = ${g10.a.toFixed(4)} over all ten levels, ${g5.a.toFixed(4)} over the top five`);
  L(`      source figures: 4.99 and 6.20.   beta_2 = ${BETA2}`);
  // constant model vs A - B/ln z on u_sat
  const cbar = us.reduce((a, b) => a + b, 0) / us.length;
  let rssC = 0; for (const v of us) rssC += (v - cbar) * (v - cbar);
  const gb = lsq(zs.map((z) => 1 / Math.log(z)), us);   // u = A + B*(1/ln z), A the asymptote
  L(`  (1) constant model RSS ${rssC.toExponential(4)} against bounded-family RSS ${gb.rss.toExponential(4)}  =  ${(rssC / gb.rss).toFixed(1)}x`);
  L(`  (2) bounded family u_sat = A - B/ln z has asymptote A = ${gb.b.toFixed(4)}   (source 5.46 for u_sup, 5.56 for u_sat)`);
  L(`      forcing A = beta_2 costs RSS ${(function () { let r = 0; for (let i = 0; i < zs.length; i++) { const x = 1 / Math.log(zs[i]); r += 0; }
    // best B with A pinned at beta_2
    let sxy = 0, sxx = 0; for (let i = 0; i < zs.length; i++) { const x = 1 / Math.log(zs[i]), y = us[i] - BETA2; sxy += x * y; sxx += x * x; }
    const B = sxy / sxx; let rss = 0; for (let i = 0; i < zs.length; i++) { const x = 1 / Math.log(zs[i]); const r2 = us[i] - (BETA2 + B * x); rss += r2 * r2; }
    return (rss / gb.rss).toFixed(2); })()}x    (source 8.70x)`);
  L('');
  L('  every one of the three is a property of the EXACT S_sat. None takes a');
  L('  per-modulus price as an input, so none can move when that price is');
  L('  renamed. [VERIFIED]');
}
L('');
L('  And the direction, stated as a number rather than an argument: what would');
L('  the ladder read if the tau(m) price were used INSTEAD of the exact one?');
L('');
L('  z    u_sat (exact, the corpus)   u_sat under the tau(m) price   difference');
for (const z of ZS_FULL) {
  const r = SW[z];
  const ue = Math.log(r.Ssat / r.M) / r.lz, ut = Math.log(r.SsatTriv / r.M) / r.lz;
  L(`  ${pad(z, 2)}   ${pad(f4(ue), 25)}   ${pad(f4(ut), 28)}   ${pad('+' + (ut - ue).toFixed(4), 10)}`);
}
L('');
L('  The tau(m) price is WORSE at every level. It cannot reopen a closure it');
L('  makes harder. u_sup stays closed, and the closure never used C^{pi(z)} as');
L('  an input in the first place: that name was a DESCRIPTION of the measured');
L('  growth of S_sat, not a step in the computation.');

// ===========================================================================
banner('F. WORST CASE AGAINST AVERAGE — which one does the argument need?');
// ===========================================================================
L('');
L(`  The requirement (attack-theta-last-gap.md sec.2, sec.6): a saving of`);
L(`  H^{theta-1} on a sum of H^{theta} terms, theta = ${THETA}, i.e. a factor`);
L(`  m^{(theta-1)/theta} = m^{${NEEDEXP.toFixed(5)}} per modulus m.`);
L('');
L('  The route C1 bound is sum_m |K_h(m)| with |K_h(m)| <= tau(m). What has to');
L('  be small is the TOTAL over the modulus set, so the saving has to be there');
L('  ON AVERAGE. The worst case bounds only what is available at one m.');
L('');
L('  A TRAP THAT HAS TO BE SAID FIRST. The textbook average, sum_{m<=M} tau(m)');
L('  ~ M ln M, DOES NOT APPLY here: every modulus is a squarefree z-smooth');
L('  number, so tau(m) = 2^{omega(m)} and it is far larger than ln m on this');
L('  set. The average has to be measured on the actual set, and it is below.');
L('');
L('  THE ACTUAL SET, at the true working point of attack-theta-last-gap.md');
L('  sec.2: H = z^beta_2, D+ = H^{1/2}, D- = H^{0.712157}, d1 <= D+ and');
L('  d2 <= D- squarefree z-smooth and coprime, m = d1 d2. Exhaustive, not');
L('  sampled: every pair is enumerated and every product counted.');
L('');
L('  z     H          N pairs    #moduli    mean tau   max tau   need H^{th-1}   mean/need   max/need   mass share tau >= m^0.175');
{
  const smoothMask = (ps, D) => { const out = [];
    (function rec(i, pr, mk) { out.push([pr, mk]); for (let j = i; j < ps.length; j++) { if (pr * ps[j] > D) break; rec(j + 1, pr * ps[j], mk | (1 << j)); } })(0, 1, 0);
    return out; };
  const MEANS = [], NEEDS = [], SHARE = [], ZS = [31, 43, 61, 101, 113, 127];
  for (const z of ZS) {
    const ps = primesBelow(z).filter((p) => p > 2);
    const H = Math.pow(z, BETA2), Dp = Math.pow(H, 0.5), Dm = Math.pow(H, 0.712157);
    const A = smoothMask(ps, Dp), Bv = smoothMask(ps, Dm);
    const buf = [];
    for (const [d1, m1] of A) for (const [d2, m2] of Bv) { if (m1 & m2) continue; buf.push(d1 * d2); }
    const arr = Float64Array.from(buf); arr.sort();
    let nd = 0, run = 0, mx = 0, good = 0, goodMass = 0;
    for (let i = 0; i < arr.length; i++) { run++;
      if (i === arr.length - 1 || arr[i + 1] !== arr[i]) { nd++; if (run > mx) mx = run;
        if (run >= Math.pow(arr[i], NEEDEXP)) { good++; goodMass += run; } run = 0; } }
    const need = Math.pow(H, THETA - 1), mean = arr.length / nd;
    MEANS.push(mean); NEEDS.push(need); SHARE.push(goodMass / arr.length);
    L(`  ${pad(z, 3)}  ${H.toExponential(3)}  ${pad(arr.length, 9)}  ${pad(nd, 9)}   ${pad(mean.toFixed(3), 8)}   ${pad(mx, 7)}   ${pad(need.toFixed(2), 13)}   ${pad((mean / need).toFixed(4), 9)}   ${pad((mx / need).toFixed(4), 8)}   ${pad((goodMass / arr.length).toExponential(3), 24)}   [${el()}]`);
  }
  const xs = ZS.map((z) => Math.log(z));
  const gM = lsq(xs, MEANS.map(Math.log)), gN = lsq(xs, NEEDS.map(Math.log));
  L('');
  L(`  d ln(mean tau)/d ln z = ${gM.a.toFixed(4)}  (RSS ${gM.rss.toExponential(3)})   -- what the average supplies`);
  L(`  d ln(need)/d ln z     = ${gN.a.toFixed(4)}  (RSS ${gN.rss.toExponential(3)})   -- exactly beta_2*(theta-1) = ${(BETA2 * (THETA - 1)).toFixed(4)}`);
  L(`  mean tau over z = 31..127: ${MEANS.map((v) => v.toFixed(2)).join(', ')}  -- flat, and below the need at EVERY level`);
  SHAREOUT = SHARE;
}
L('');
L('  AND THE WORST CASE, for comparison: attack-theta-last-gap.md sec.6(ii)');
L('  reproduced, which uses max tau throughout.');
L('');
function maxOmega(M) { const ps = primesBelow(4000).filter((p) => p > 2); let pr = 1, k = 0; for (const p of ps) { if (pr * p > M) break; pr *= p; k++; } return k; }
L('  z          M = H^theta      need = H^{theta-1}   max tau(m)      verdict');
for (const z of [307, 1e6, 1e8, 1e10, 1e11, 1e12, 3e12, 1e13, 1e15]) {
  const H = Math.pow(z, BETA2), M = Math.pow(H, THETA), need = Math.pow(H, THETA - 1);
  const tw = Math.pow(2, maxOmega(M));
  L(`  ${pad(z.toExponential(0), 8)}   ${pad(M.toExponential(3), 12)}     ${pad(need.toExponential(3), 12)}     ${pad(tw.toExponential(3), 12)}    ${tw > need ? 'route still open' : 'ROUTE CLOSED'}`);
}
{
  let a = 3, b = 1e300;
  for (let i = 0; i < 400; i++) { const mid = Math.exp((Math.log(a) + Math.log(b)) / 2);
    if (Math.pow(2, maxOmega(mid)) > Math.pow(mid, NEEDEXP)) a = mid; else b = mid; }
  const mW = Math.exp((Math.log(a) + Math.log(b)) / 2);
  const zW = Math.pow(Math.pow(mW, 1 / THETA), 1 / BETA2);
  L('');
  L(`  worst-case crossover: m = ${mW.toExponential(3)}, i.e. z = ${zW.toExponential(3)}   (source: open to 1e11, dead from 1e12)`);
}
L('');
L('  THE READING. The route needs the average and the average is FLAT at about');
L('  17 while the requirement is a power of z. The two have already crossed at');
L('  z = 31, the lowest level tested, and the gap widens at every level after.');
L('  Route C1 is closed in the average from the start, not from z = 1e12; the');
L('  1e12 figure is the worst-case crossover and the worst case is not what the');
L(`  sum needs. The share of the total that even LOOKS like it could pay falls`);
L(`  from ${SHAREOUT[0].toFixed(3)} at z = 31 to ${SHAREOUT[SHAREOUT.length - 1].toFixed(3)} at z = 127 and is still falling.`);
L('');
L('='.repeat(76));
L(`done.  ${el()}`);
L('='.repeat(76));


// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-tau-repricing.js
//   invocation:  node research/attack-tau-repricing.js
//   code-sha256: c530633ee76b46fe5423124aa4b959c4826c1ffaeabc4b1ce11f36e44d1e06fb
//   out-sha256:  6a1e02a8f95dd2256dcb7099a7d696ef18a5a2871c664ce3fc14bd1855620673
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     224.6 s
// ============================================================================
//
// ============================================================================
// A. CUSTODY — four published anchors, reproduced before anything new
// ============================================================================
//   (a) u_sup and the measured price of the position quantifier, z = 13..23.
//       Ssup(nP)/sup_x|R| is what the triangle inequality over (e,a) actually
//       costs at the corpus's own floor window nP. Source for both columns:
//       research/history/staging/lemmaV-sup-extension.md sec.0.
//
//   z   H_sup   u_sup    src      Ssup(nP)   true sup|R|   ratio   src
//   13     198  2.0617  2.0617     11.4467        2.6494    4.32   4.32   [0.0s]
//   17     683  2.3036  2.3036     28.4118        4.9203    5.77   5.77   [0.1s]
//   19    1833  2.5518  2.5518     60.0382        6.8403    8.78   8.78   [1.7s]
//   23    4278  2.6666  2.6666    118.3280        7.8157   15.14   15.14   [11.5s]
//
//   (b) the exact spectrum, this file's peel against the reference sweep, and
//       u_sat = ln(Ssat/M)/ln z against lemmaV-sup-extension.md's ladder.
//
//   z    Ssat (mine)     Ssat (ref)     rel diff    u_sat    src      N        #(e,a)
//   13  1.960178e+1  1.960178e+1  1.81e-16  2.2850  2.2850      852          2309   [11.5s]
//   17  5.031362e+1  5.031362e+1  0.00e+0  2.4623  2.4623     2236         30029   [11.5s]
//   19  1.200616e+2  1.200616e+2  0.00e+0  2.7228  2.7228     4764        510509   [11.5s]
//   23  2.424993e+2  2.424993e+2  0.00e+0  2.8281  2.8281     9636       2649449   [11.6s]
//   29  5.231094e+2  5.231094e+2  0.00e+0  2.8827  2.8827    20700      17193029   [12.2s]
//   31  9.526275e+2  9.526275e+2  0.00e+0  3.0259  3.0259    35868      60577325   [14.0s]
//   37  2.572676e+3  2.572676e+3  0.00e+0  3.1644  3.1644    76484     525116753   [28.3s]
//   41  4.649518e+3  4.649518e+3  0.00e+0  3.2543  3.2543   125884    1795146521   [75.2s]
//   43  7.107210e+3     (not run)      --     3.3448  3.3448   183084    3744103465   [112.3s]
//   47  1.262266e+4     (not run)      --     3.4306  3.4306   293980   10914562829   [207.7s]
//
//   (c) u_1^prov, the all-positions exponent, reproduced against
//       research/history/staging/attack-AB-bounded.md sec.5 (the min(B*H, B2)
//       branch selection corrected there on 2026-08-18).
//
//   z   theta/lnz   B          B2 (Vabs)    u(B*H)    u(B2)    u_1^prov   src
//   13   3.0196    1.3833   5.913e+1    5.3958   3.4299    3.4299   --   [207.7s]
//   17   3.6390    1.4214   2.318e+2    5.9217   3.8598    3.8598   --   [207.8s]
//   19   4.4637    1.4348   4.357e+2    6.7796   4.3604    4.3604   4.3604   [207.8s]
//   23   5.1308    1.4503   8.024e+2    7.4030   4.7087    4.7087   4.7087   [207.9s]
//   29   5.7088    1.4660   1.939e+3    7.8697   5.0021    5.0021   5.0021   [208.1s]
//   31   6.5785    1.4764   3.487e+3    8.7489   5.5054    5.5054   --   [208.4s]
//   37   7.2071    1.4883   1.109e+4    9.2966   5.8829    5.8829   --   [209.3s]
//   41   7.9803    1.4963   1.939e+4   10.0494   6.2997    6.2997   --   [211.1s]
//   43   8.8666    1.5057   2.675e+4   10.9489   6.7752    6.7752   --   [213.9s]
//   47   9.6386    1.5135   4.786e+4   11.7021   7.1966    7.1966   --   [218.5s]
//
//   All four anchors reproduce. Everything below is computed from these same
//   objects, so a disagreement downstream is a disagreement about pricing and
//   not about arithmetic.
//
// ============================================================================
// B. SEPARABILITY, DERIVED HERE AND NOT INHERITED
// ============================================================================
//
//   The claim under test (attack-theta-last-gap.md sec.6 C1): all of the
//   x-dependence in the remainder sits in a single factor e(-h x/m).
//
//   DERIVATION. For one joint class, exactly and with no approximation:
//     1[y = c mod q] - 1/q = (1/q) sum_{a=1}^{q-1} e(a(y-c)/q).
//   Write a = g a', g = gcd(a,q), e = q/g > 1, so each divisor e > 1 of q and
//   each a' coprime to e occurs exactly once. Summing y = x+1..x+H:
//     R(x) = sum_{e|P(z), e>1} sum*_{a mod e} Theta_e(a) S_H(a/e) e(a x/e),
//     Theta_e(a) = sum_{i : e | q_i} (w_i/q_i) e(-a c_i/e),  S_H(t) = sum_{m<=H} e(mt).
//   x appears once, in e(a x/e), and nowhere else. THE CLAIM IS TRUE.
//
//   Four independent checks follow, none of them a re-reading of the corpus.
//
// ----------------------------------------------------------------------------
//   (i) the one-class finite Fourier identity against a brute-force count
//       12 distinct moduli x 5 positions at z = 13, H = 169
//       worst |Fourier - brute force| = 5.08e-14   [218.5s]
// ----------------------------------------------------------------------------
//   (ii) reciprocity: c(d1,d2)/(d1 d2) = -2 * inverse(d1)/d2 mod 1
//       z = 13       639 coprime pairs checked,    213 with gcd(d1,d2) = 2 skipped, violations 0, worst 0.00e+0   [218.5s]
//       z = 17      1677 coprime pairs checked,    559 with gcd(d1,d2) = 2 skipped, violations 0, worst 0.00e+0   [218.5s]
//       z = 19      3573 coprime pairs checked,   1191 with gcd(d1,d2) = 2 skipped, violations 0, worst 0.00e+0   [218.5s]
//       z = 23      7227 coprime pairs checked,   2409 with gcd(d1,d2) = 2 skipped, violations 0, worst 0.00e+0   [218.5s]
// ----------------------------------------------------------------------------
//   (iii) the aggregate identity R(x) = sum_e sum*_a Theta_e(a) S_H(a/e) e(ax/e)
//         against a direct count over the full period, at every x in a sample
//       z = 13, H = 169, 9 positions, full period W = 2310
//       worst |spectral - direct| = 2.52e-13   [218.6s]
// ----------------------------------------------------------------------------
//   (iv) the per-modulus term count is at most 3 tau(m) -- the three sign
//        combinations (-,+), (+,-), (+,+) of the vector sieve times the tau(m)
//        factorisations m = d1 d2 -- with EQUALITY at z = 13 and cut below it
//        from z = 17 on, because the level truncation d1, d2 <= z^s forbids
//        some factorisations. Its SUM over the modulus set is the divisor-pair
//        term count N, by definition, at every z. The last column is a
//        different object and is printed to keep them apart: the number of
//        NONZERO V(e1,e2) inside one Theta_e, which the truncation cuts far
//        further still.
//
//   z    N        #distinct m   max #pairs at one m   3*tau(P(z))   max #nonzero V in a Theta_e
//   13      852           32                    96            96                             8   [218.6s]
//   17     2236           64                   114           192                            14   [218.6s]
//   19     4764          128                   114           384                            14   [218.6s]
//   23     9636          244                   162           768                            18   [218.6s]
//   29    20700          468                   222          1536                            26   [218.6s]
//
//   VERDICT ON THE CLAIM. Separability holds, exactly, and is [VERIFIED] four
//   ways here. It is also NOT new: it is L5 of attack 1, written into
//   research/lemmaV-parseval.js lines 55-62 with the sentence "The window
//   position enters ONLY as the unimodular phase e(ax/e)". What was new on
//   2026-08-18 is the tau(m) reading of what that buys, and that is section C.
//
// ============================================================================
// C. THE TWO PRICES ARE ONE QUANTITY AT TWO GRANULARITIES
// ============================================================================
//
//   Three x-free bounds on sup_x|R|, in increasing order of how much structure
//   they keep. All three are the SAME triangle inequality over (e,a); they
//   differ only in what is kept inside one modulus.
//
//     N          = #divisor pairs. |r_{d1,d2}| <= 1 termwise. Keeps nothing.
//     Ssat_triv  = sum_e Vabs(e) sum*_a 1/|sin(pi a/e)|,  Vabs = sum_{e1e2=e}|V|.
//                  tau(e) terms, each bounded. THIS IS THE tau(m) PRICE.
//     Ssat       = sum_e sum*_a |Theta_e(a)|/|sin(pi a/e)|. Keeps every
//                  cancellation inside one modulus. THIS IS WHAT THE CORPUS
//                  ALREADY COMPUTES, and what u_sup and u_sat are built from.
//
//   z    N          Ssat_triv     Ssat         N/Ssat   Striv/Ssat   u(N)     u_triv   u_sat
//   13        852  7.9693e+1  1.9602e+1    43.47        4.07   3.7555   2.8318   2.2850   [218.6s]
//   17       2236  2.6389e+2  5.0314e+1    44.44        5.24   3.8015   3.0472   2.4623   [218.6s]
//   19       4764  5.8248e+2  1.2006e+2    39.68        4.85   3.9729   3.2591   2.7228   [218.6s]
//   23       9636  1.1438e+3  2.4250e+2    39.74        4.72   4.0025   3.3228   2.8281   [218.6s]
//   29      20700  2.5353e+3  5.2311e+2    39.57        4.85   3.9750   3.3514   2.8827   [218.6s]
//   31      35868  4.7730e+3  9.5263e+2    37.65        5.01   4.0825   3.4952   3.0259   [218.6s]
//   37      76484  1.3722e+4  2.5727e+3    29.73        5.33   4.1038   3.6280   3.1644   [218.6s]
//   41     125884  2.5096e+4  4.6495e+3    27.07        5.40   4.1425   3.7083   3.2543   [218.6s]
//   43     183084  3.7608e+4  7.1072e+3    25.76        5.29   4.2085   3.7877   3.3448   [218.6s]
//   47     293980  6.7104e+4  1.2623e+4    23.29        5.32   4.2482   3.8645   3.4306   [218.6s]
//
//   GROWTH, per added prime (the ratio between consecutive z of each column):
//
//   z    N ratio   Striv ratio   Ssat ratio   (Striv/Ssat) ratio
//   17    2.6244        3.3114       2.5668               1.2901
//   19    2.1306        2.2073       2.3863               0.9250
//   23    2.0227        1.9637       2.0198               0.9722
//   29    2.1482        2.2166       2.1572               1.0275
//   31    1.7328        1.8826       1.8211               1.0338
//   37    2.1324        2.8750       2.7006               1.0646
//   41    1.6459        1.8288       1.8073               1.0119
//   43    1.4544        1.4986       1.5286               0.9804
//   47    1.6057        1.7843       1.7760               1.0046
//
//   log-log slope d ln(.)/d ln z over z = 13..47:  N 4.4993   Ssat_triv 5.1391   Ssat 4.9872
//   and of the RATIO Ssat_triv/Ssat:  0.1519   (RSS 2.780e-2)
//   geometric mean per-added-prime factor:  N 1.9142   Ssat_triv 2.1137   Ssat 2.0516
//   ratio Ssat_triv/Ssat at z = 13 and z = 47:  4.066 and 5.316
//
//   THE READING. sum over the modulus set of tau(m) IS the divisor-pair count
//   N, by definition, and N grows geometrically in pi(z). So "the price is
//   tau(m)" and "the price is C^{pi(z)}" are the same statement, one written
//   per modulus and one written for the whole spectrum. They are not
//   alternatives, and the second is not replaced by the first.
//
// ============================================================================
// D. THE ALL-POSITIONS EXPONENT u_1^prov, RE-PRICED
// ============================================================================
//
//   u_1^prov is the smallest u with H M >= sqrt(W min(B H, B2)), H = z^u,
//   W = P(z). The B2 branch wins at every z = 13..47 (attack-AB-bounded sec.5),
//   so u_1^prov = (theta(z)/2 + ln(B2)/2 - ln M)/ln z and B2 is the ONLY place
//   a per-modulus price enters. Four prices for B2, cheapest last:
//
//     B2_Vabs = (1/4) sum_e e^2 Vabs(e)^2         tau(e) terms each bounded
//     B2_star = (1/4) sum_e e^2 Theta*(e)^2       exact max over a
//     B2_ex   = sum_e sum*_a |Theta_e(a)|^2/(4 sin^2(pi a/e))   exact in a too
//     B2 = 1                                      a price of literally nothing
//
//   z    B2_Vabs      B2_star     B2_ex       Vabs/ex   u(Vabs)   u(star)   u(ex)    u(B2=1)
//   13  5.9130e+1  1.002e+1  1.095e+0     54.00    3.4299    3.0839   2.6523    2.6346   [218.6s]
//   17  2.3176e+2  6.699e+1  2.497e+0     92.83    3.8598    3.6408   3.0602    2.8988   [218.6s]
//   19  4.3570e+2  1.482e+2  4.952e+0     87.98    4.3604    4.1773   3.6002    3.3285   [218.6s]
//   23  8.0239e+2  2.464e+2  7.982e+0    100.52    4.7087    4.5204   3.9735    3.6422   [218.6s]
//   29  1.9388e+3  4.575e+2  1.360e+1    142.60    5.0021    4.7876   4.2656    3.8780   [218.6s]
//   31  3.4874e+3  7.597e+2  2.474e+1    140.97    5.5054    5.2835   4.7849    4.3177   [218.6s]
//   37  1.1093e+4  3.046e+3  8.568e+1    129.47    5.8829    5.7039   5.2095    4.5932   [218.6s]
//   41  1.9393e+4  5.458e+3  1.439e+2    134.74    6.2997    6.1290   5.6395    4.9705   [218.6s]
//   43  2.6747e+4  6.993e+3  2.015e+2    132.77    6.7752    6.5969   6.1254    5.4201   [218.6s]
//   47  4.7864e+4  1.352e+4  3.609e+2    132.62    7.1966    7.0324   6.5619    5.7972   [218.6s]
//
//   the saving the re-pricing actually delivers, in units of window exponent:
//
//   z    u(Vabs) - u(ex)   u(ex) - u(B2=1)   u(B2=1)          gap to theta < 2
//   13           0.7776            0.0177           2.6346             0.6346
//   17           0.7996            0.1615           2.8988             0.8988
//   19           0.7603            0.2717           3.3285             1.3285
//   23           0.7352            0.3312           3.6422             1.6422
//   29           0.7365            0.3875           3.8780             1.8780
//   31           0.7205            0.4671           4.3177             2.3177
//   37           0.6734            0.6163           4.5932             2.5932
//   41           0.6602            0.6691           4.9705             2.9705
//   43           0.6499            0.7053           5.4201             3.4201
//   47           0.6347            0.7647           5.7972             3.7972
//
//   d(u(Vabs)-u(ex))/d ln z = -0.1241   (RSS 3.081e-3)   -- the re-pricing's slope
//   d u(B2=1)/d ln z        = 2.3632   (RSS 5.282e-1)   -- the floor's slope
//
//   and the floor in closed form. With B2 = 1 the exponent is exactly
//     u_floor(z) = (theta(z)/2 - ln M)/ln z,  theta(z) = sum_{p<z} ln p.
//   theta(z) ~ z, so u_floor diverges like z/(2 ln z) whatever the price is.
//
//   z      theta(z)   theta(z)/(2 ln z)   -ln M / ln z   u_floor   u_floor - 2
//    13      7.745              1.5098         1.1249    2.6346        0.6346
//    17     10.310              1.8195         1.0793    2.8988        0.8988
//    19     13.143              2.2319         1.0966    3.3285        1.3285
//    23     16.088              2.5654         1.0768    3.6422        1.6422
//    29     19.223              2.8544         1.0237    3.8780        1.8780
//    31     22.590              3.2892         1.0285    4.3177        2.3177
//    37     26.024              3.6036         0.9896    4.5932        2.5932
//    41     29.635              3.9901         0.9803    4.9705        2.9705
//    43     33.349              4.4333         0.9868    5.4201        3.4201
//    47     37.110              4.8193         0.9779    5.7972        3.7972
//
// ============================================================================
// E. DOES u_sup's CLOSURE DEPEND ON THE PRICE THAT CHANGED?
// ============================================================================
//
//   u_sup was closed on three measurements (lemmaV-sup-extension.md sec.0-4):
//     (1) S_sat rises at every added level, constant model RSS 49x the best fit
//     (2) the bounded family A - B/ln z has asymptote A = 5.46, above beta_2
//     (3) model-free d ln S_sat/d ln z = 4.99 over ten levels, 6.20 over five
//   Each is a statement about S_sat. So the only way the tau(m) re-pricing can
//   reopen the closure is if S_sat was computed with the price that changed.
//   It was not: S_sat carries the EXACT |Theta_e(a)|, so all of the cancellation
//   tau(m) bounds is already inside it. Section C measured the unspent part at
//   Ssat_triv/Ssat. Here are the three closure numbers re-derived from scratch.
//
//   (3) d ln S_sat/d ln z  = 4.9872 over all ten levels, 6.1967 over the top five
//       source figures: 4.99 and 6.20.   beta_2 = 4.26645028
//   (1) constant model RSS 1.2813e+0 against bounded-family RSS 4.7724e-2  =  26.8x
//   (2) bounded family u_sat = A - B/ln z has asymptote A = 5.5649   (source 5.46 for u_sup, 5.56 for u_sat)
//       forcing A = beta_2 costs RSS 7.21x    (source 8.70x)
//
//   every one of the three is a property of the EXACT S_sat. None takes a
//   per-modulus price as an input, so none can move when that price is
//   renamed. [VERIFIED]
//
//   And the direction, stated as a number rather than an argument: what would
//   the ladder read if the tau(m) price were used INSTEAD of the exact one?
//
//   z    u_sat (exact, the corpus)   u_sat under the tau(m) price   difference
//   13                      2.2850                         2.8318      +0.5468
//   17                      2.4623                         3.0472      +0.5849
//   19                      2.7228                         3.2591      +0.5364
//   23                      2.8281                         3.3228      +0.4947
//   29                      2.8827                         3.3514      +0.4687
//   31                      3.0259                         3.4952      +0.4693
//   37                      3.1644                         3.6280      +0.4636
//   41                      3.2543                         3.7083      +0.4540
//   43                      3.3448                         3.7877      +0.4430
//   47                      3.4306                         3.8645      +0.4339
//
//   The tau(m) price is WORSE at every level. It cannot reopen a closure it
//   makes harder. u_sup stays closed, and the closure never used C^{pi(z)} as
//   an input in the first place: that name was a DESCRIPTION of the measured
//   growth of S_sat, not a step in the computation.
//
// ============================================================================
// F. WORST CASE AGAINST AVERAGE — which one does the argument need?
// ============================================================================
//
//   The requirement (attack-theta-last-gap.md sec.2, sec.6): a saving of
//   H^{theta-1} on a sum of H^{theta} terms, theta = 1.212157, i.e. a factor
//   m^{(theta-1)/theta} = m^{0.17502} per modulus m.
//
//   The route C1 bound is sum_m |K_h(m)| with |K_h(m)| <= tau(m). What has to
//   be small is the TOTAL over the modulus set, so the saving has to be there
//   ON AVERAGE. The worst case bounds only what is available at one m.
//
//   A TRAP THAT HAS TO BE SAID FIRST. The textbook average, sum_{m<=M} tau(m)
//   ~ M ln M, DOES NOT APPLY here: every modulus is a squarefree z-smooth
//   number, so tau(m) = 2^{omega(m)} and it is far larger than ln m on this
//   set. The average has to be measured on the actual set, and it is below.
//
//   THE ACTUAL SET, at the true working point of attack-theta-last-gap.md
//   sec.2: H = z^beta_2, D+ = H^{1/2}, D- = H^{0.712157}, d1 <= D+ and
//   d2 <= D- squarefree z-smooth and coprime, m = d1 d2. Exhaustive, not
//   sampled: every pair is enumerated and every product counted.
//
//   z     H          N pairs    #moduli    mean tau   max tau   need H^{th-1}   mean/need   max/need   mass share tau >= m^0.175
//    31  2.306e+6       6966        493     14.130        38           22.38      0.6313     1.6977                   9.459e-1   [218.6s]
//    43  9.313e+6      47757       2943     16.227        55           30.10      0.5391     1.8273                   7.976e-1   [218.6s]
//    61  4.140e+7     352076      20477     17.194        72           41.31      0.4163     1.7431                   5.977e-1   [218.7s]
//   101  3.559e+8    6025096     342495     17.592       122           65.20      0.2698     1.8713                   3.354e-1   [219.5s]
//   113  5.746e+8   14507542     874975     16.581       134           72.17      0.2297     1.8567                   2.558e-1   [221.3s]
//   127  9.457e+8   22247827    1266333     17.569       145           80.22      0.2190     1.8076                   2.427e-1   [224.4s]
//
//   d ln(mean tau)/d ln z = 0.1172  (RSS 1.160e-2)   -- what the average supplies
//   d ln(need)/d ln z     = 0.9052  (RSS 5.640e-29)   -- exactly beta_2*(theta-1) = 0.9052
//   mean tau over z = 31..127: 14.13, 16.23, 17.19, 17.59, 16.58, 17.57  -- flat, and below the need at EVERY level
//
//   AND THE WORST CASE, for comparison: attack-theta-last-gap.md sec.6(ii)
//   reproduced, which uses max tau throughout.
//
//   z          M = H^theta      need = H^{theta-1}   max tau(m)      verdict
//       3e+2      7.286e+12         1.783e+2         2.048e+3    route still open
//       1e+6      1.071e+31         2.697e+5         2.097e+6    route still open
//       1e+8      2.360e+41         1.743e+7         6.711e+7    route still open
//      1e+10      5.201e+51         1.126e+9         2.147e+9    route still open
//      1e+11      7.721e+56         9.052e+9        1.718e+10    route still open
//      1e+12      1.146e+62        7.276e+10        6.872e+10    ROUTE CLOSED
//      3e+12      3.363e+64        1.967e+11        1.374e+11    ROUTE CLOSED
//      1e+13      1.702e+67        5.849e+11        2.749e+11    ROUTE CLOSED
//      1e+15      3.751e+77        3.779e+13        8.796e+12    ROUTE CLOSED
//
//   worst-case crossover: m = 8.271e+61, i.e. z = 9.388e+11   (source: open to 1e11, dead from 1e12)
//
//   THE READING. The route needs the average and the average is FLAT at about
//   17 while the requirement is a power of z. The two have already crossed at
//   z = 31, the lowest level tested, and the gap widens at every level after.
//   Route C1 is closed in the average from the start, not from z = 1e12; the
//   1e12 figure is the worst-case crossover and the worst case is not what the
//   sum needs. The share of the total that even LOOKS like it could pay falls
//   from 0.946 at z = 31 to 0.243 at z = 127 and is still falling.
//
// ============================================================================
// done.  224.4s
// ============================================================================
// ============================================================================
// READINGS
//
// 1. THE SEPARABILITY CLAIM IS TRUE, AND IT IS L5 OF ATTACK 1 RATHER THAN NEW.
//    x enters the remainder exactly once, in e(ax/e). Four checks, none of them
//    a re-reading of the corpus: the one-class Fourier identity against brute
//    force to 5.08e-14; reciprocity c/(d1 d2) = -2 dbar1/d2 over 639 + 1677 +
//    3573 + 7227 coprime pairs with 0 violations and worst 0.00e+0; the
//    aggregate identity against a direct count over the full period to
//    2.52e-13; and the term-count bound, 852 pairs over 32 moduli at z = 13
//    rising to 20700 over 468 at z = 29. The claim survives being derived.
//
// 2. AND THE PRICE DRAWN FROM IT DOES NOT. tau(m) counts the terms inside ONE
//    modulus; C^{pi(z)} is the size of the whole x-free bound; and the sum of
//    tau(m) over the modulus set IS the divisor-pair count N. They are the same
//    quantity at two granularities. N grows at a geometric-mean 1.9142 per
//    added prime, S_sat at 2.0516 -- which is the corpus's own "2.05x per added
//    prime", reproduced here from the exact object. Nothing was made cheaper.
//
// 3. USED AS A BOUND, THE tau(m) PRICE IS A REGRESSION, AND THE NUMBER IS 4 TO
//    44. Ssat_triv/Ssat runs 4.07 at z = 13 to 5.32 at z = 47, and N/Ssat runs
//    43.47 to 23.29. The corpus already banks every saving tau(m) could name,
//    because Ssat carries the exact |Theta_e(a)|. The unspent remainder is not
//    even bounded: the ratio's log-log slope is +0.1519 over ten levels.
//
// 4. u_1^prov MOVES BY A CONSTANT AND THE CONSTANT SHRINKS. Re-pricing B2 from
//    Vabs (tau(e) terms, each bounded) to the exact spectral sum takes the
//    all-positions exponent from 3.4299..7.1966 to 2.6523..6.5619 -- a gain of
//    0.7776 at z = 13 falling to 0.6347 at z = 47, slope -0.1241 per unit ln z.
//    The intermediate Theta* price buys about a fifth of that. This is a
//    constant in window exponent, not an exponent, and it is going the wrong
//    way.
//
// 5. THE FLOOR IS THE ANSWER TO WHETHER ANY PRICE COULD REACH theta < 2, AND IT
//    IS NO. Setting B2 = 1 -- a per-modulus price of literally nothing -- gives
//    u_floor = (theta(z)/2 - ln M)/ln z = 2.6346 at z = 13 rising to 5.7972 at
//    z = 47, fitted slope +2.3632, exceeding 2 by 0.6346 to 3.7972. theta(z)/2
//    alone is 1.5098 to 4.8193 and diverges like z/2. No statement about what
//    happens inside a modulus touches it, because it is the union bound over
//    the period and contains no divisor-pair structure at all.
//
// 6. u_sup's CLOSURE NEVER USED THE PRICE, SO IT CANNOT REOPEN. The three
//    closure numbers re-derive from the exact S_sat: d ln S_sat/d ln z = 4.9872
//    over ten levels and 6.1967 over the top five, against the published 4.99
//    and 6.20; the bounded family's asymptote is 5.5649 against the published
//    5.56. (The 7.21x and 26.8x RSS ratios are the u_sat analogues of u_sup
//    figures and are not offered as reproductions of 8.70x and 49x.) Under the
//    tau(m) price the ladder reads 2.8318..3.8645 instead of 2.2850..3.4306:
//    worse by +0.5468 falling to +0.4339 at every one of ten levels.
//
// 7. THE ROUTE NEEDS THE AVERAGE, AND THE AVERAGE IS FLAT. On the actual
//    working-point modulus set -- squarefree z-smooth, d1 <= H^{1/2},
//    d2 <= H^{0.712157}, coprime, every pair enumerated -- the mean tau is
//    14.130, 16.227, 17.194, 17.592, 16.581, 17.569 at z = 31..127, log-log
//    slope 0.1172, while the requirement H^{theta-1} is 22.38 rising to 80.22,
//    slope 0.9052 = beta_2 (theta - 1) exactly. mean/need falls 0.6313 to
//    0.2190. They crossed at z = 31, the lowest level tested.
//
// 8. SO ROUTE C1's CROSSOVER IS z = 31 AND NOT z = 9.388e+11, AND THE DIFFERENCE
//    IS THE STATISTIC. The worst-case table reproduces exactly -- open to 1e11,
//    ROUTE CLOSED from 1e12, crossover m = 8.271e+61 at z = 9.388e+11 -- but
//    max tau is available at one modulus and a sum needs the mean. The share of
//    the total carried by moduli that individually meet tau >= m^0.17502 falls
//    from 9.459e-1 at z = 31 to 2.427e-1 at z = 127 and is still falling. This
//    is the same worst-case-against-average distinction that has closed three
//    earlier routes here; the trap this time is that the textbook average
//    ln m does NOT apply, because every modulus is z-smooth, and using it gets
//    the crossover wrong in the optimistic direction.
