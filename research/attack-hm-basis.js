// ============================================================================
// THE u_sup LADDER IN THE (h, m) BASIS — the weights attached, both columns
// (2026-08-19, attack E of five. Companion report:
//  research/history/staging/attack-hm-basis.md.
//  Parents: research/lemmaV-parseval.js S5 (the e-basis Ssup/Ssat and u_sup),
//  research/lemmaV-sup-extension.js (the ladder to z = 47 and findHsup),
//  research/history/staging/attack-tail-maximal.md readings 13, 18, 21,
//  research/history/staging/attack-tau-repricing.md sections 1-2,
//  research/sift-limit-lemmaV.js (the term list and the exact mean square).)
// ============================================================================
// THE ABSENCE THIS FILLS, quoted from the ledger it is recorded in.
// research/qc/ledgers.js, ABSENCE_VERIFIED, key 'TODO.md|not run', 2026-08-19:
// "the u_sup ladder in the (h,m) basis. TRUE, and verified at the one file that
// could have done it. research/attack-tail-maximal.js is the only script that
// works in that basis at all, and its own reading 13 says so in its own words:
// 'No total price is computed in the (h,m) basis: that needs the weights
// attached to each m, which are not computed here.'"
//
// So the deliverable is, in order: attach the weights, compute the ladder,
// print it beside the e-basis ladder level by level, and say whether the
// divergence that closed u_sup on 2026-08-18 is a fact about the object or a
// fact about the coordinates.
//
// ---------------------------------------------------------------------------
// THE TWO BASES, written so the only difference is visible on one line.
// ---------------------------------------------------------------------------
// The certificate is  T(x) = H*M + R(x)  with  M = sum_i w_i/q_i, the index i
// running over the vector-sieve divisor pairs (d1,d2), q_i = [d1,d2] and c_i
// the CRT class (sift-limit-lemmaV.js buildTerms). Each term's sawtooth has a
// finite Fourier expansion at its OWN modulus q_i, and that is the natural
// basis: the frequencies are h/m with m = q_i a modulus actually present in the
// certificate and h running over 1..m-1. Writing
//
//   K_h(m) := sum_{i : q_i = m} (w_i / q_i) e(-h c_i / m)          [THE WEIGHTS]
//
// the identity is
//
//   R(x) = sum_m sum_{h=1}^{m-1} K_h(m) S_H(h/m) e(h x / m),   S_H(t)=sum_{j<=H} e(jt).
//
// K_h(m) is exactly "the weights attached to each m" that reading 13 names as
// missing. It is a signed sum of w_i/q_i over the terms whose lcm is m, twisted
// by the phase of that term's CRT class. Its h = 0 value is W(m) = sum_{q_i=m}
// w_i/q_i, and sum_m W(m) = M, the main term itself. Section A checks that.
//
// The e basis is the same identity after the frequencies are put in lowest
// terms. Write h = g*a with g = gcd(h,m) and e = m/g > 1; then h/m = a/e with
// (a,e) = 1, and collecting every (m,h) that reduces to the same a/e gives
// attack 1's L5:
//
//   Theta_e(a) = sum_{i : e | q_i} (w_i/q_i) e(-a c_i/e) = sum_{m : e | m} K_{a m/e}(m),
//   R(x) = sum_{e | P(z), e>1} sum*_{a mod e} Theta_e(a) S_H(a/e) e(a x / e).
//
// ONE LINE IS THE WHOLE DIFFERENCE. The absolute-value step that discharges the
// position quantifier is taken at the same place in both, and the two bases
// differ only in whether the sum over m is inside or outside it:
//
//   e basis     Ssup_e (H)  = sum_e sum*_a | sum_{m : e|m} K_{a m/e}(m) | |S_H(a/e)|
//   (h,m) basis Ssup_hm(H)  = sum_e sum*_a  sum_{m : e|m} |K_{a m/e}(m)| |S_H(a/e)|
//                           = sum_m sum_{h=1}^{m-1} |K_h(m)| |S_H(h/m)|
//
// (T1) THEOREM, one line of triangle inequality: Ssup_hm(H) >= Ssup_e(H) for
// every H, every z and every level s, frequency by frequency. Consequently
// Ssat_hm >= Ssat_e for the H-free saturations, H_hm >= H_sup for the first
// window that closes, and u_hm >= u_sup. Section C verifies the frequency-wise
// inequality directly rather than resting on the derivation.
//
// So the two bases are not rivals whose verdicts might differ. They are nested,
// and the natural one is the outer, weaker member of the pair. What is NOT
// settled by (T1), and is the whole measurement here, is the SIZE and the SHAPE
// of the gap: a bounded factor leaves the growth law untouched, a growing
// factor would mean the e basis flatters the bound by an unbounded amount.
//
// ---------------------------------------------------------------------------
// WHAT THIS FILE DOES NOT DO, stated so no reading overreaches.
// ---------------------------------------------------------------------------
// It does not reopen u_sup. It does not price tau(m) against C^{pi(z)} again:
// attack-tau-repricing.md settled that on 2026-08-19 and section E only checks
// that the basis change does not smuggle the withdrawn re-pricing back in.
// It compares TWO bases, not all bases: (T1) is a statement about the pair
// (e, (h,m)), and nothing here bears on a basis nobody has written down.
//
// ---------------------------------------------------------------------------
// CUSTODY. The term list, the exact mean square and the full-period walk are
// research/sift-limit-lemmaV.js's; the e-basis spectral records are
// research/lemmaV-parseval.js's spectralRecords(); the (e,a) sweep kernel,
// planOf/peel/sweep and the H_sup protocol findHsup() are
// research/lemmaV-sup-extension.js's. All are imported, never recopied, so the
// two columns below are produced by ONE kernel and differ only in whether the
// V-array is aggregated across moduli or kept per modulus. That is the point:
// a basis comparison run on two different implementations would be measuring
// the implementations.
//
//   node research/attack-hm-basis.js            (~10 min at defaults)
//   node research/attack-hm-basis.js --quick    (stop the ladders early)
//   node research/attack-hm-basis.js A C        (one or more sections; A..F)
// ============================================================================
'use strict';
const path = require('path');
const T0 = Date.now(); const el = () => ((Date.now() - T0) / 1000).toFixed(1) + 's';

const REPO = require(path.join(__dirname, 'sift-limit-lemmaV.js'));
const A1   = require(path.join(__dirname, 'lemmaV-parseval.js'));
const EX   = require(path.join(__dirname, 'lemmaV-sup-extension.js'));

const QUICK = process.argv.includes('--quick');
const S_LEVEL = 3.0;                       // the level s the whole ladder uses

// z where the H-free saturation Ssat is computed. The e column runs to 47
// because the published per-added-prime factor 2.0516 is the geometric mean
// over 13..47 and section A has to reproduce it; the (h,m) column runs to 43,
// the range of the published u_sup ladder.
const ZS_E  = QUICK ? [13, 17, 19, 23] : [13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
const ZS_HM = QUICK ? [13, 17, 19, 23] : [13, 17, 19, 23, 29, 31, 37, 41, 43];
// z where the full H-scan is run, in BOTH bases, so u_sup and u_hm are
// comparable level by level with no quoted figure on either side.
const ZS_SUP = QUICK ? [13, 17] : [13, 17, 19, 23, 29, 31];

// Published anchors, quoted here ONLY as targets for section A to hit.
// lemmaV-sup-extension.md section 2 (the ladder table) and
// research/lemmaV-parseval.js S5 header.
const PUB_HSUP = { 13: 198, 17: 683, 19: 1833, 23: 4278, 29: 10384, 31: 20586 };
const PUB_USUP = { 13: 2.0617, 17: 2.3036, 19: 2.5518, 23: 2.6666, 29: 2.7464, 31: 2.8924,
                   37: 3.0125, 41: 3.1103, 43: 3.2026 };
const PUB_SSAT = { 13: 1.9602e+1, 17: 5.0314e+1, 19: 1.2006e+2, 23: 2.4250e+2, 29: 5.2311e+2,
                   31: 9.5263e+2, 37: 2.5727e+3, 41: 4.6495e+3, 43: 7.1072e+3, 47: 1.2623e+4 };
const PUB_PERPRIME = 2.0516;               // attack-tau-repricing.md section 2 reading (a)
// The grid resolution the published ladder used, so the e column reproduces it
// and the (h,m) column is scanned by the identical protocol at the same z.
// lemmaV-sup-extension.js ensureLadder(): K = z >= 41 ? 14 : (z >= 29 ? 20 : 24).
const KOF = (z) => (z >= 41 ? 14 : (z >= 29 ? 20 : 24));

function gcd(a, b) { while (b) { const t = a % b; a = b; b = t; } return a; }
function modinv(a, m) {
  if (m === 1) return 0;
  let g = a % m, x = 1, y = 0, b = m, u = 0, v = 1;
  while (b) { const q = Math.floor(g / b); let t = b; b = g - q * b; g = t; t = u; u = x - q * u; x = t; t = v; v = y - q * v; y = t; }
  return ((x % m) + m) % m;
}
function primesBelow(n) { const s = new Uint8Array(n), o = []; for (let i = 2; i < n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j < n; j += i) s[j] = 1; } } return o; }
function thetaOf(z) { let t = 0; for (const p of primesBelow(z)) t += Math.log(p); return t; }
function geoMean(xs) { let s = 0; for (const x of xs) s += Math.log(x); return Math.exp(s / xs.length); }
function slope(xs, ys) {
  const n = xs.length; let sx = 0, sy = 0, sxx = 0, sxy = 0;
  for (let i = 0; i < n; i++) { sx += xs[i]; sy += ys[i]; sxx += xs[i] * xs[i]; sxy += xs[i] * ys[i]; }
  return (n * sxy - sx * sy) / (n * sxx - sx * sx);
}

// ===========================================================================
// THE WEIGHTS.  hmRecords(z,s) is spectralRecords(z,s) with one index added:
// every V-array is kept PER MODULUS m instead of being summed over the moduli
// divisible by e. Same loop, same phases, same 2^omega factorisation; the only
// change is the extra key. That is the basis change, made once, in one place.
// ===========================================================================
// For a modulus m and a divisor e | m, e > 1, the class c_i mod e depends on i
// only through (e1,e2) = (gcd(e,d1), e/gcd(e,d1)): c_i == 0 mod e1 and == -2
// mod e2, so c_i/e == -2*inv(e1)/e2 mod 1. Hence
//   K_{a m/e}(m) = sum_{e1 e2 = e} e(2 a inv(e1)/e2) * Vm(e1,e2),
//   Vm(e1,e2) = sum_{i : q_i = m, gcd(e,d1_i) = e1} w_i/q_i.
// Dropping the "q_i = m" restriction and summing over all m recovers attack 1's
// V(e1,e2) exactly, which is the identity section A checks.
// ---------------------------------------------------------------------------
const HMCACHE = new Map();
function hmRecords(z, s) {
  const key = z + '|' + s; if (HMCACHE.has(key)) return HMCACHE.get(key);
  const D = Math.round(Math.pow(z, s));
  const t = REPO.buildTerms(z, D), ps = t.ps, N = t.n;
  const byM = new Map();                       // m -> Map("e1|e2" -> Vm)
  const cnt = new Map();                       // m -> number of terms with q_i = m
  const w0  = new Map();                       // m -> W(m) = sum_{q_i=m} w_i/q_i
  for (let i = 0; i < N; i++) {
    const q = t.q[i], d1 = t.d1[i], wq = t.w[i] / q;
    let V = byM.get(q); if (!V) { V = new Map(); byM.set(q, V); }
    cnt.set(q, (cnt.get(q) || 0) + 1);
    w0.set(q, (w0.get(q) || 0) + wq);
    const pf = []; for (const p of ps) if (q % p === 0) pf.push(p);
    for (let mask = 1; mask < (1 << pf.length); mask++) {
      let e = 1; for (let b = 0; b < pf.length; b++) if (mask & (1 << b)) e *= pf[b];
      const e1 = gcd(e, d1);
      const k2 = e1 + '|' + (e / e1);
      V.set(k2, (V.get(k2) || 0) + wq);
    }
  }
  const mods = [];
  for (const [q, V] of byM) {
    const pf = []; for (const p of ps) if (q % p === 0) pf.push(p);
    const nP = pf.length, recs = [];
    for (let mask = 1; mask < (1 << nP); mask++) {
      let e = 1, nu = 0; const f2 = [];
      for (let b = 0; b < nP; b++) if (mask & (1 << b)) { e *= pf[b]; nu++; f2.push(pf[b]); }
      const fac = [];
      for (let k = 0; k < (1 << nu); k++) {
        let e1 = 1; for (let b = 0; b < nu; b++) if (k & (1 << b)) e1 *= f2[b];
        const e2 = e / e1, v = V.get(e1 + '|' + e2);
        if (v === undefined || v === 0) continue;
        fac.push([e2, (e2 === 1) ? 0 : (2 * modinv(e1, e2)) % e2, v]);
      }
      if (!fac.length) continue;
      recs.push({ e, nu, fac });
    }
    mods.push({ m: q, nTerms: cnt.get(q), W: w0.get(q), omega: nP, recs });
  }
  mods.sort((a, b) => a.m - b.m);
  const r = { t, ps, mods, M: t.M, N, D };
  HMCACHE.set(key, r); return r;
}

// One sweep of the (h,m) basis: the shared kernel, called once per modulus, so
// every absolute value is taken inside the m-sum and nowhere else.
function sweepHM(HM, HS) {
  const out = new Float64Array(HS.length);
  let Ssat = 0, nPts = 0;
  for (const md of HM.mods) {
    const r = EX.sweep({ recs: md.recs, t: { ps: HM.ps }, M: HM.M }, HS);
    Ssat += r.Ssat; nPts += r.nPts;
    for (let k = 0; k < HS.length; k++) out[k] += r.out[k];
  }
  return { Ssat, out, nPts };
}
// H_sup in the (h,m) basis, by exactly the protocol findHsup() uses in the e
// basis: a geometric grid scanned upward, the first grid point that closes
// taken, the previous one printed as the bracket, and at z <= 23 every integer
// in the last gap swept so the answer is exact.
function findHsupHM(HM, z, Ssat, K, refineInts) {
  const M = HM.M, Hsat = Ssat / M;
  let lo = 0.18, hi = 0.99, pass = 0, res = null, HS = null;
  while (pass < 4) {
    HS = [];
    for (let k = 0; k < K; k++) HS.push(Math.max(2, Math.round(Hsat * lo * Math.pow(hi / lo, k / (K - 1)))));
    HS = [...new Set(HS)].sort((a, b) => a - b);
    const r = sweepHM(HM, HS);
    let i = -1; for (let k = 0; k < HS.length; k++) if (HS[k] * M > r.out[k]) { i = k; break; }
    res = { r, i };
    if (i === 0) { hi = lo * 1.02; lo = lo / 4; pass++; continue; }
    if (i < 0) { lo = hi * 0.98; hi = hi * 2; pass++; continue; }
    break;
  }
  if (!res || res.i <= 0) return null;
  let Hhi = HS[res.i], Hlo = HS[res.i - 1], Ssup = res.r.out[res.i], exact = false;
  if (refineInts && Hhi - Hlo <= 8192) {
    const RS = []; for (let H = Hlo + 1; H < Hhi; H++) RS.push(H);
    if (RS.length) {
      const r2 = sweepHM(HM, RS);
      for (let k = 0; k < RS.length; k++) if (RS[k] * M > r2.out[k]) { Hhi = RS[k]; Hlo = k ? RS[k - 1] : Hlo; Ssup = r2.out[k]; break; }
    }
    exact = true;
  }
  return { Hsup: Hhi, Hlo, Ssup, exact };
}

// cached H-free saturations, so no z is swept twice
const SATE = new Map(), SATH = new Map();
function satE(z) { if (!SATE.has(z)) { const SD = A1.spectralRecords(z, S_LEVEL); const r = EX.sweep(SD, []); SATE.set(z, { SD, Ssat: r.Ssat, nPts: r.nPts, VarC: r.VarC }); } return SATE.get(z); }
function satH(z) { if (!SATH.has(z)) { const HM = hmRecords(z, S_LEVEL); const r = sweepHM(HM, []); SATH.set(z, { HM, Ssat: r.Ssat, nPts: r.nPts }); } return SATH.get(z); }

// ===========================================================================
// A. CUSTODY — the published anchors, reproduced before anything new
// ===========================================================================
function A() {
  console.log('\nA. CUSTODY: the four published anchors, recomputed here before anything new.\n');

  console.log('  (a) the e-basis H-free saturation Ssat, against lemmaV-sup-extension.md section 2');
  console.log('      z    Ssat (here)   published    rel.diff (the published value is 5-figure)   u_sat (here)');
  for (const z of ZS_E) {
    const r = satE(z), lz = Math.log(z);
    const rel = Math.abs(r.Ssat - PUB_SSAT[z]) / PUB_SSAT[z];
    console.log(`      ${String(z).padStart(2)}  ${r.Ssat.toExponential(4)}  ${PUB_SSAT[z].toExponential(4)}   ${rel.toExponential(1)}      ${(Math.log(r.Ssat / r.SD.M) / lz).toFixed(4)}   [${el()}]`);
  }

  console.log('\n  (b) the u_sup ladder itself: H_sup from the same protocol, against attack 1');
  console.log('      z    H_sup (here)  published   u_sup (here)  published    verdict');
  for (const z of ZS_SUP) {
    const r = satE(z), lz = Math.log(z);
    const f = EX.findHsup(r.SD, z, r.Ssat, KOF(z), z <= 23);
    const u = Math.log(f.Hsup) / lz;
    const ok = (f.Hsup === PUB_HSUP[z]) ? 'CONFIRMED' : (Math.abs(u - PUB_USUP[z]) < 5e-4 ? 'confirmed (u)' : 'MISMATCH');
    console.log(`      ${String(z).padStart(2)}  ${String(f.Hsup).padStart(8)}      ${String(PUB_HSUP[z]).padStart(6)}     ${u.toFixed(4)}      ${PUB_USUP[z].toFixed(4)}     ${ok}${f.exact ? ' exact' : ''}   [${el()}]`);
  }

  console.log('\n  (c) S_sat per-added-prime factor: geometric mean of consecutive ratios over z = 13..47');
  const rs = [];
  for (let i = 1; i < ZS_E.length; i++) rs.push(satE(ZS_E[i]).Ssat / satE(ZS_E[i - 1]).Ssat);
  console.log('      ratios: ' + rs.map(x => x.toFixed(4)).join('  '));
  const gm = geoMean(rs);
  console.log(`      geometric mean = ${gm.toFixed(4)}   published ${PUB_PERPRIME}   rel.diff ${(Math.abs(gm - PUB_PERPRIME) / PUB_PERPRIME).toExponential(1)}   [${el()}]`);

  console.log('\n  (d) THE WEIGHTS ATTACH. Two identities that must hold if K_h(m) is the right object:');
  console.log('      sum_m W(m) = M  (the h = 0 part rebuilds the main term), and');
  console.log('      sum_{m : e|m} K_{a m/e}(m) = Theta_e(a)  at every frequency (e,a).');
  console.log('      z   #moduli  sum_m W(m)      M (buildTerms)   rel.diff   worst |sum_m K - Theta|  #(e,a) checked');
  for (const z of [13, 17]) {                    // O(#(e,a) * N); z = 17 is 30029 x 2236
    const HM = hmRecords(z, S_LEVEL);
    let sw = 0; for (const md of HM.mods) sw += md.W;
    // frequency-wise: rebuild Theta_e(a) from the term list directly and compare
    const t = HM.t, ps = HM.ps;
    let worst = 0, nchk = 0;
    const divs = [1]; for (const p of ps) { const L = divs.length; for (let i = 0; i < L; i++) divs.push(divs[i] * p); }
    for (const e of divs) {
      if (e === 1) continue;
      for (let a = 1; a < e; a++) {
        if (gcd(a, e) !== 1) continue;
        let dr = 0, di = 0;                                   // Theta_e(a), straight from the terms
        for (let i = 0; i < t.n; i++) {
          if (t.q[i] % e !== 0) continue;
          const th = -2 * Math.PI * ((a * (t.c[i] % e)) % e) / e;
          dr += (t.w[i] / t.q[i]) * Math.cos(th); di += (t.w[i] / t.q[i]) * Math.sin(th);
        }
        let hr = 0, hi2 = 0;                                  // sum_m K_{a m/e}(m), from the fac lists
        for (const md of HM.mods) {
          if (md.m % e !== 0) continue;
          const rec = md.recs.find(r => r.e === e); if (!rec) continue;
          for (const f of rec.fac) {
            if (f[0] === 1) { hr += f[2]; continue; }
            const th2 = 2 * Math.PI * ((a * f[1]) % f[0]) / f[0];
            hr += f[2] * Math.cos(th2); hi2 += f[2] * Math.sin(th2);
          }
        }
        worst = Math.max(worst, Math.hypot(dr - hr, di - hi2)); nchk++;
      }
    }
    console.log(`      ${String(z).padStart(2)}  ${String(HM.mods.length).padStart(6)}  ${sw.toExponential(9)}  ${HM.M.toExponential(9)}  ${(Math.abs(sw - HM.M) / Math.abs(HM.M)).toExponential(1)}   ${worst.toExponential(2)}            ${nchk}   [${el()}]`);
  }
}

// ===========================================================================
// B. THE WEIGHTS, PRINTED — what K_h(m) is, modulus by modulus, at z = 13
// ===========================================================================
function B() {
  console.log('\nB. THE WEIGHTS ATTACHED TO EACH m, at z = 13, s = 3.0.  Every modulus of the');
  console.log('   certificate, its term count, its main-term share W(m) = K_0(m), the largest');
  console.log('   |K_h(m)| over h != 0, and what that modulus pays in each basis.\n');
  const HM = hmRecords(13, S_LEVEL);
  console.log('     m     omega  #terms  tau(m)  #terms/tau   W(m)=K_0(m)    max_h |K_h(m)|   sum_h |K_h|/|sin(pi h/m)|');
  let tot = 0, totTerms = 0;
  const rows = [];
  for (const md of HM.mods) {
    const r = EX.sweep({ recs: md.recs, t: { ps: HM.ps }, M: HM.M }, []);
    // max_h |K_h(m)| by direct evaluation over the fac lists
    let mx = 0;
    for (const rec of md.recs) {
      const e = rec.e;
      for (let a = 1; a < e; a++) {
        if (gcd(a, e) !== 1) continue;
        let re = 0, im = 0;
        for (const f of rec.fac) {
          if (f[0] === 1) { re += f[2]; continue; }
          const th = 2 * Math.PI * ((a * f[1]) % f[0]) / f[0];
          re += f[2] * Math.cos(th); im += f[2] * Math.sin(th);
        }
        const v = Math.hypot(re, im); if (v > mx) mx = v;
      }
    }
    rows.push([md.m, md.omega, md.nTerms, 1 << md.omega, mx, r.Ssat, md.W]);
    tot += r.Ssat; totTerms += md.nTerms;
  }
  for (const [m, om, nt, tau, mx, sat, W] of rows)
    console.log(`  ${String(m).padStart(6)}  ${String(om).padStart(3)}  ${String(nt).padStart(6)}  ${String(tau).padStart(6)}   ${(nt / tau).toFixed(2).padStart(6)}   ${W.toExponential(4).padStart(12)}   ${mx.toExponential(4)}      ${sat.toFixed(4).padStart(9)}`);
  console.log(`\n   totals: ${HM.mods.length} moduli, ${totTerms} terms (N = ${HM.N}), Ssat_hm = ${tot.toFixed(4)}`);
  console.log(`   the largest single modulus contributes ${(Math.max(...rows.map(r => r[5])) / tot * 100).toFixed(1)}% of Ssat_hm.`);
}

// ===========================================================================
// C. (T1) VERIFIED FREQUENCY BY FREQUENCY, not inherited from the derivation
// ===========================================================================
function C() {
  console.log('\nC. (T1) CHECKED DIRECTLY.  At every frequency (e,a): |Theta_e(a)| <= sum_{m:e|m}');
  console.log('   |K_{a m/e}(m)|.  The e basis keeps the cancellation ACROSS moduli; the (h,m)');
  console.log('   basis destroys it. The column "collapse" is the ratio of the two, i.e. how');
  console.log('   much cross-modulus cancellation the e basis is buying at that frequency.\n');
  console.log('   z   #(e,a)  violations  worst collapse   mean collapse   #moduli per e (mean, max)');
  for (const z of (QUICK ? [13, 17] : [13, 17, 19])) {
    const HM = hmRecords(z, S_LEVEL), ps = HM.ps;
    const divs = [1]; for (const p of ps) { const L = divs.length; for (let i = 0; i < L; i++) divs.push(divs[i] * p); }
    let viol = 0, worst = 0, sN = 0, sD = 0, n = 0, mulSum = 0, mulMax = 0, nE = 0;
    for (const e of divs) {
      if (e === 1) continue;
      const ms = HM.mods.filter(md => md.m % e === 0 && md.recs.some(r => r.e === e));
      if (!ms.length) continue;
      nE++; mulSum += ms.length; mulMax = Math.max(mulMax, ms.length);
      const recs = ms.map(md => md.recs.find(r => r.e === e));
      for (let a = 1; a < e; a++) {
        if (gcd(a, e) !== 1) continue;
        let tr = 0, ti = 0, sabs = 0;
        for (const rec of recs) {
          let re = 0, im = 0;
          for (const f of rec.fac) {
            if (f[0] === 1) { re += f[2]; continue; }
            const th = 2 * Math.PI * ((a * f[1]) % f[0]) / f[0];
            re += f[2] * Math.cos(th); im += f[2] * Math.sin(th);
          }
          tr += re; ti += im; sabs += Math.hypot(re, im);
        }
        const agg = Math.hypot(tr, ti);
        if (agg > sabs * (1 + 1e-9)) viol++;
        if (sabs > 0) { const c = sabs / Math.max(agg, 1e-300); if (c > worst && agg > 1e-14) worst = c; sN += sabs; sD += agg; n++; }
      }
    }
    console.log(`   ${String(z).padStart(2)}  ${String(n).padStart(6)}     ${String(viol).padStart(6)}    ${worst.toExponential(3)}      ${(sN / sD).toFixed(4)}         ${(mulSum / nE).toFixed(2)}, ${mulMax}   [${el()}]`);
  }
}

// ===========================================================================
// D. THE LADDER, BOTH COLUMNS
// ===========================================================================
const LAD = [];
function ensureLadder() {
  if (LAD.length) return LAD;
  for (const z of ZS_E) {
    const e = satE(z), lz = Math.log(z);
    const row = { z, lz, M: e.SD.M, N: e.SD.N, Ssat_e: e.Ssat, pts_e: e.nPts,
                  u_sat_e: Math.log(e.Ssat / e.SD.M) / lz };
    if (ZS_HM.includes(z)) {
      const h = satH(z);
      row.Ssat_hm = h.Ssat; row.pts_hm = h.nPts;
      row.u_sat_hm = Math.log(h.Ssat / h.HM.M) / lz;
      row.nMod = h.HM.mods.length;
    }
    if (ZS_SUP.includes(z)) {
      const fe = EX.findHsup(e.SD, z, e.Ssat, KOF(z), z <= 23);
      const fh = findHsupHM(satH(z).HM, z, satH(z).Ssat, KOF(z), z <= 23);
      if (fe) { row.H_e = fe.Hsup; row.u_sup_e = Math.log(fe.Hsup) / lz; row.exact_e = fe.exact; row.H_e_lo = fe.Hlo; }
      if (fh) { row.H_hm = fh.Hsup; row.u_sup_hm = Math.log(fh.Hsup) / lz; row.exact_hm = fh.exact; row.H_hm_lo = fh.Hlo; }
    }
    LAD.push(row);
    console.error(`   [ladder] z=${z} done ${el()}`);
  }
  return LAD;
}
function D() {
  const L = ensureLadder();
  console.log('\nD. THE LADDER IN BOTH BASES.  Every row is a legal unconditional worst-position');
  console.log('   statement: H*M > Ssup(H) puts T(x) > 0 at EVERY position, with no maximal law');
  console.log('   and no averaging, in either basis. u = ln(H)/ln z, u_sat = ln(Ssat/M)/ln z.\n');
  console.log('   z    Ssat_e      Ssat_hm     ratio    u_sat_e  u_sat_hm  diff     ln(ratio)/ln z   H_sup_e   H_sup_hm   u_sup_e  u_sup_hm  diff');
  for (const r of L) {
    const rat = r.Ssat_hm ? r.Ssat_hm / r.Ssat_e : null;
    const a = `   ${String(r.z).padStart(2)}  ${r.Ssat_e.toExponential(4)}  ` +
      (r.Ssat_hm ? r.Ssat_hm.toExponential(4) : '    --    ') + '  ' +
      (rat ? rat.toFixed(4).padStart(7) : '   --  ') + '  ' +
      r.u_sat_e.toFixed(4) + '   ' + (r.u_sat_hm ? r.u_sat_hm.toFixed(4) : '  --  ') + '   ' +
      (r.u_sat_hm ? (r.u_sat_hm - r.u_sat_e).toFixed(4) : '  --  ') + '     ' +
      (rat ? (Math.log(rat) / r.lz).toFixed(4) : '  --  ');
    const b = (r.H_e ? `        ${String(r.H_e).padStart(7)}   ${String(r.H_hm).padStart(7)}    ${r.u_sup_e.toFixed(4)}   ${r.u_sup_hm.toFixed(4)}   ${(r.u_sup_hm - r.u_sup_e).toFixed(4)}${r.exact_e && r.exact_hm ? ' exact' : ''}` : '');
    console.log(a + b);
  }
  console.log('\n   brackets on the H-scan (the grid point below the first that closes):');
  for (const r of L) if (r.H_e) console.log(`     z=${String(r.z).padStart(2)}  e basis [${r.H_e_lo}, ${r.H_e}]${r.exact_e ? ' exact' : ''}   (h,m) basis [${r.H_hm_lo}, ${r.H_hm}]${r.exact_hm ? ' exact' : ''}`);
}

// ===========================================================================
// E. DOES THE DIVERGENCE SURVIVE THE CHANGE OF BASIS?
// ===========================================================================
function E() {
  const L = ensureLadder();
  console.log('\nE. THE GROWTH LAW IN BOTH BASES.  This is the question the brief asks: the');
  console.log('   e-basis ladder rises at every step, and the divergence is driven by a factor');
  console.log('   geometric in pi(z). Is that a fact about the object or about the coordinates?\n');

  const eR = [], hR = [];
  const Le = L.filter(r => r.Ssat_e), Lh = L.filter(r => r.Ssat_hm);
  for (let i = 1; i < Le.length; i++) eR.push(Le[i].Ssat_e / Le[i - 1].Ssat_e);
  for (let i = 1; i < Lh.length; i++) hR.push(Lh[i].Ssat_hm / Lh[i - 1].Ssat_hm);
  console.log('   per-added-prime ratios');
  console.log('     e basis    : ' + eR.map(x => x.toFixed(4)).join('  '));
  console.log('     (h,m) basis: ' + hR.map(x => x.toFixed(4)).join('  '));
  console.log(`     geometric means: e ${geoMean(eR).toFixed(4)} over ${eR.length} steps, (h,m) ${geoMean(hR).toFixed(4)} over ${hR.length} steps`);
  const eR2 = eR.slice(0, hR.length);
  console.log(`     on the COMMON range z = ${Lh[0].z}..${Lh[Lh.length - 1].z}: e ${geoMean(eR2).toFixed(4)}, (h,m) ${geoMean(hR).toFixed(4)}, ratio of the two ${(geoMean(hR) / geoMean(eR2)).toFixed(4)}`);

  console.log('\n   log-log slopes d ln Ssat / d ln z');
  const f = (rows, key) => slope(rows.map(r => r.lz), rows.map(r => Math.log(r[key])));
  console.log(`     all levels : e ${f(Le, 'Ssat_e').toFixed(4)}   (h,m) ${f(Lh, 'Ssat_hm').toFixed(4)}`);
  console.log(`     top five   : e ${f(Le.slice(-5), 'Ssat_e').toFixed(4)}   (h,m) ${f(Lh.slice(-5), 'Ssat_hm').toFixed(4)}`);
  console.log(`     top three  : e ${f(Le.slice(-3), 'Ssat_e').toFixed(4)}   (h,m) ${f(Lh.slice(-3), 'Ssat_hm').toFixed(4)}`);
  console.log('     beta_2 = 4.26645');

  console.log('\n   THE GAP BETWEEN THE BASES, which is the whole content of the change:');
  console.log('     z    Ssat_hm/Ssat_e   u_sat_hm - u_sat_e   (that difference) * ln z   step in the ratio');
  let prev = null;
  for (const r of Lh) {
    const rat = r.Ssat_hm / r.Ssat_e;
    console.log(`     ${String(r.z).padStart(2)}   ${rat.toFixed(4).padStart(8)}         ${(r.u_sat_hm - r.u_sat_e).toFixed(4)}              ${Math.log(rat).toFixed(4)}            ${prev === null ? '  --  ' : (rat / prev).toFixed(4)}`);
    prev = rat;
  }
  const rats = Lh.map(r => r.Ssat_hm / r.Ssat_e);
  console.log(`     min ${Math.min(...rats).toFixed(4)}, max ${Math.max(...rats).toFixed(4)}, geometric mean ${geoMean(rats).toFixed(4)},`);
  console.log(`     log-log slope of the ratio against z: ${slope(Lh.map(r => r.lz), rats.map(Math.log)).toFixed(4)} (0 = a flat factor, >0 = the e basis flatters by a growing amount)`);

  console.log('\n   THE SAME QUESTION ON THE u_sup COLUMN, which is the published ladder:');
  const Ls = L.filter(r => r.u_sup_hm);
  console.log('     z    u_sup_e   u_sup_hm   diff     H_hm/H_e   step in u_sup_e   step in u_sup_hm');
  for (let i = 0; i < Ls.length; i++) {
    const r = Ls[i], p = i ? Ls[i - 1] : null;
    console.log(`     ${String(r.z).padStart(2)}   ${r.u_sup_e.toFixed(4)}    ${r.u_sup_hm.toFixed(4)}   ${(r.u_sup_hm - r.u_sup_e).toFixed(4)}   ${(r.H_hm / r.H_e).toFixed(3).padStart(7)}      ${p ? (r.u_sup_e - p.u_sup_e).toFixed(4) : '  --  '}            ${p ? (r.u_sup_hm - p.u_sup_hm).toFixed(4) : '  --  '}`);
  }
  let rise_e = 0, rise_h = 0;
  for (let i = 1; i < Ls.length; i++) { if (Ls[i].u_sup_e > Ls[i - 1].u_sup_e) rise_e++; if (Ls[i].u_sup_hm > Ls[i - 1].u_sup_hm) rise_h++; }
  console.log(`     u_sup rises at ${rise_e} of ${Ls.length - 1} steps in the e basis and ${rise_h} of ${Ls.length - 1} in the (h,m) basis.`);
  const B2 = 4.26645;
  console.log(`     largest u_sup in this range: e ${Math.max(...Ls.map(r => r.u_sup_e)).toFixed(4)}, (h,m) ${Math.max(...Ls.map(r => r.u_sup_hm)).toFixed(4)};  beta_2 = ${B2}.`);
  console.log(`     levels where u_sup exceeds beta_2: e ${Ls.filter(r => r.u_sup_e > B2).length}, (h,m) ${Ls.filter(r => r.u_sup_hm > B2).length}, of ${Ls.length}.`);

  console.log('\n   THE BOUNDED FAMILY, fitted in both bases.  u = A - B/ln z is the one model in');
  console.log('   lemmaV-sup-extension.md section 1 item 3 that is BOUNDED, and its asymptote A is');
  console.log('   the most favourable reading the e-basis instrument admits. Fitted by least');
  console.log('   squares on x = 1/ln z over every level available in each basis:');
  const fitA = (rows, key) => {
    const xs = rows.map(r => 1 / r.lz), ys = rows.map(r => r[key]);
    const a = slope(xs, ys); let mx = 0, my = 0;
    for (let i = 0; i < xs.length; i++) { mx += xs[i]; my += ys[i]; }
    mx /= xs.length; my /= ys.length;
    const A = my - a * mx; let rss = 0;
    for (let i = 0; i < xs.length; i++) { const d = ys[i] - (A + a * xs[i]); rss += d * d; }
    return { A, B: -a, rss, n: xs.length };
  };
  const fe = fitA(Le, 'u_sat_e'), fh = fitA(Lh, 'u_sat_hm'), fse = fitA(Ls, 'u_sup_e'), fsh = fitA(Ls, 'u_sup_hm');
  console.log(`     u_sat, e basis      : A = ${fe.A.toFixed(4)}  B = ${fe.B.toFixed(4)}  RSS = ${fe.rss.toExponential(3)}  (${fe.n} levels, z = ${Le[0].z}..${Le[Le.length - 1].z})`);
  console.log(`     u_sat, (h,m) basis  : A = ${fh.A.toFixed(4)}  B = ${fh.B.toFixed(4)}  RSS = ${fh.rss.toExponential(3)}  (${fh.n} levels, z = ${Lh[0].z}..${Lh[Lh.length - 1].z})`);
  console.log(`     u_sup, e basis      : A = ${fse.A.toFixed(4)}  B = ${fse.B.toFixed(4)}  RSS = ${fse.rss.toExponential(3)}  (${fse.n} levels)`);
  console.log(`     u_sup, (h,m) basis  : A = ${fsh.A.toFixed(4)}  B = ${fsh.B.toFixed(4)}  RSS = ${fsh.rss.toExponential(3)}  (${fsh.n} levels)`);
  const feC = fitA(Le.slice(0, Lh.length), 'u_sat_e');
  console.log(`     u_sat, e basis, RESTRICTED to the (h,m) range so the two fits see the same z:`);
  console.log(`                           A = ${feC.A.toFixed(4)}  B = ${feC.B.toFixed(4)}  RSS = ${feC.rss.toExponential(3)}  (${feC.n} levels, z = ${Le[0].z}..${Le[Lh.length - 1].z})`);
  console.log(`     asymptote above beta_2 = ${B2}?  u_sat: e ${fe.A > B2 ? 'YES' : 'no'}, (h,m) ${fh.A > B2 ? 'YES' : 'no'};  u_sup: e ${fse.A > B2 ? 'YES' : 'no'}, (h,m) ${fsh.A > B2 ? 'YES' : 'no'}.`);
  console.log('     (the e-basis u_sat row is a custody anchor: attack-tau-repricing.md reports the');
  console.log('      bounded-family asymptote as 5.5649 and lemmaV-sup-extension.md as 5.56.)');
}

// ===========================================================================
// F. THE PRICE CHECK — the withdrawn tau(m) re-pricing must not come back in
// ===========================================================================
function F() {
  const L = ensureLadder();
  console.log('\nF. THE TWO PRICES, CHECKED AGAINST EACH OTHER.  attack-tau-repricing.md section 2:');
  console.log('   tau(m) is the number of terms inside ONE modulus and C^{pi(z)} is the size of');
  console.log('   the WHOLE x-free bound, and summed over the modulus set the tau bound IS the');
  console.log('   divisor-pair count N. A basis change that made the total look cheap would be');
  console.log('   that withdrawn re-pricing wearing new coordinates. Three checks.\n');

  console.log('   (a) the bookkeeping identity: sum_m (terms with q_i = m) = N, so the tau bound');
  console.log('       summed over the modulus set IS the divisor-pair count, exactly as');
  console.log('       attack-tau-repricing.md section 2 reading (a) says. The per-modulus ceiling');
  console.log('       is counted here rather than quoted: an ordered pair (d1,d2) with lcm m and');
  console.log('       gcd | 2 sends each ODD prime of m to d1 or to d2 exclusively (2^{omega-[2|m]}');
  console.log('       ways) and, when 2 | m, sends 2 to d1, to d2 or to BOTH (3 ways), and each');
  console.log('       pair carries the vector sieve\'s three sign combinations. So the ceiling is');
  console.log('       3*tau(m) for odd m and 4.5*tau(m) for even m, before the level truncation.');
  console.log('       z   #moduli   sum_m n_m      N     max n_m/tau  at m =   max over ODD m   n/tau at m = 2*3*5*7*11');
  for (const z of (QUICK ? [13, 17] : ZS_HM.slice(0, 6))) {
    const HM = hmRecords(z, S_LEVEL);
    let s = 0, mx = 0, at = 0, mxo = 0, over = 0, top = null;
    for (const md of HM.mods) {
      s += md.nTerms; const r = md.nTerms / (1 << md.omega);
      if (r > mx) { mx = r; at = md.m; }
      if (md.m % 2 === 1 && r > mxo) mxo = r;
      if (r > 4.5 + 1e-12) over++;
      if (md.m === 2310) top = r;
    }
    console.log(`       ${String(z).padStart(2)}  ${String(HM.mods.length).padStart(6)}   ${String(s).padStart(8)}  ${String(HM.N).padStart(7)}    ${mx.toFixed(4)}   ${String(at).padStart(7)}      ${mxo.toFixed(4)}        ${top === null ? '  --  ' : top.toFixed(4)}   (n/tau > 4.5 at ${over} moduli)   [${el()}]`);
  }

  console.log('\n   (b) modulus and frequency counts. The e basis pays 2^{pi(z)} moduli; the (h,m)');
  console.log('       basis pays the certificate\'s own moduli, far fewer -- and that is exactly');
  console.log('       the trade reading 21 describes. What it does NOT buy is a cheaper total.');
  console.log('       z   #(e,a) points   #(h,m) points   ratio    #moduli (h,m)   2^{pi(z)}   ratio   z^{2s}      N');
  for (const r of L) {
    if (!r.pts_hm) continue;
    const pz = primesBelow(r.z).length, cap = Math.pow(2, pz);
    console.log(`       ${String(r.z).padStart(2)}   ${r.pts_e.toExponential(3)}       ${r.pts_hm.toExponential(3)}     ${(r.pts_hm / r.pts_e).toFixed(3)}    ${String(r.nMod).padStart(8)}      ${String(cap).padStart(8)}   ${(r.nMod / cap).toFixed(3)}   ${Math.pow(r.z, 2 * S_LEVEL).toExponential(2)}   ${String(r.N).padStart(7)}`);
  }
  console.log('       Every m here is [d1,d2] with d1,d2 squarefree and z-smooth, so m | P(z) and the');
  console.log('       (h,m) modulus count is capped by 2^{pi(z)} as well -- z^{2s} is the cap on the');
  console.log('       SIZE of m, not on how many there are. The realised count is the ratio column.');

  console.log('\n   (c) the three x-free bounds on sup|R|, nested, all computed here at s = 3.0:');
  console.log('       N (divisor-pair basis, no cancellation)  >=?  Ssat_hm (cancellation inside');
  console.log('       one modulus only)  >=  Ssat_e (cancellation across moduli too).');
  console.log('       z      N       Ssat_hm     Ssat_e     N/Ssat_hm   Ssat_hm/Ssat_e   N/Ssat_e');
  for (const r of L) {
    if (!r.Ssat_hm) continue;
    console.log(`       ${String(r.z).padStart(2)}  ${String(r.N).padStart(7)}  ${r.Ssat_hm.toExponential(4)}  ${r.Ssat_e.toExponential(4)}   ${(r.N / r.Ssat_hm).toFixed(2).padStart(8)}    ${(r.Ssat_hm / r.Ssat_e).toFixed(4).padStart(9)}      ${(r.N / r.Ssat_e).toFixed(2)}`);
  }
  console.log('\n   The middle column is the one nobody had: the (h,m) basis WITH the weights');
  console.log('   attached. Reading 13 asked for a total price in that basis and this is it.');
}

function main() {
  const only = process.argv.slice(2).filter(a => /^[A-F]$/.test(a));
  const run = { A, B, C, D, E, F };
  for (const k of ['A', 'B', 'C', 'D', 'E', 'F']) if (!only.length || only.includes(k)) run[k]();
  console.error(`   [done ${el()}]`);
}
main();

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/attack-hm-basis.js
//   invocation:  node research/attack-hm-basis.js
//   code-sha256: 4860f308a2492571fd37be9c8d745d382df8e5c3b4c61010c12c1a7636f9569c
//   out-sha256:  4bcf7606792c84b31490a59955208ff57d3d5e7bf2bf0b73f2977a56b57374e5
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     594.8 s
// ============================================================================
//
// A. CUSTODY: the four published anchors, recomputed here before anything new.
//
//   (a) the e-basis H-free saturation Ssat, against lemmaV-sup-extension.md section 2
//       z    Ssat (here)   published    rel.diff (the published value is 5-figure)   u_sat (here)
//       13  1.9602e+1  1.9602e+1   1.1e-5      2.2850   [0.0s]
//       17  5.0314e+1  5.0314e+1   7.5e-6      2.4623   [0.0s]
//       19  1.2006e+2  1.2006e+2   1.3e-5      2.7228   [0.1s]
//       23  2.4250e+2  2.4250e+2   2.9e-6      2.8281   [0.1s]
//       29  5.2311e+2  5.2311e+2   1.1e-6      2.8827   [0.4s]
//       31  9.5263e+2  9.5263e+2   2.7e-6      3.0259   [1.2s]
//       37  2.5727e+3  2.5727e+3   9.5e-6      3.1644   [6.8s]
//       41  4.6495e+3  4.6495e+3   3.9e-6      3.2543   [25.1s]
//       43  7.1072e+3  7.1072e+3   1.3e-6      3.3448   [62.7s]
//       47  1.2623e+4  1.2623e+4   2.7e-5      3.4306   [169.3s]
//
//   (b) the u_sup ladder itself: H_sup from the same protocol, against attack 1
//       z    H_sup (here)  published   u_sup (here)  published    verdict
//       13       198         198     2.0617      2.0617     CONFIRMED exact   [169.3s]
//       17       683         683     2.3036      2.3036     CONFIRMED exact   [169.3s]
//       19      1833        1833     2.5518      2.5518     CONFIRMED exact   [170.0s]
//       23      4278        4278     2.6666      2.6666     CONFIRMED exact   [177.2s]
//       29     10384       10384     2.7464      2.7464     CONFIRMED   [181.5s]
//       31     20586       20586     2.8924      2.8924     CONFIRMED   [196.0s]
//
//   (c) S_sat per-added-prime factor: geometric mean of consecutive ratios over z = 13..47
//       ratios: 2.5668  2.3863  2.0198  2.1572  1.8211  2.7006  1.8073  1.5286  1.7760
//       geometric mean = 2.0516   published 2.0516   rel.diff 5.4e-6   [196.0s]
//
//   (d) THE WEIGHTS ATTACH. Two identities that must hold if K_h(m) is the right object:
//       sum_m W(m) = M  (the h = 0 part rebuilds the main term), and
//       sum_{m : e|m} K_{a m/e}(m) = Theta_e(a)  at every frequency (e,a).
//       z   #moduli  sum_m W(m)      M (buildTerms)   rel.diff   worst |sum_m K - Theta|  #(e,a) checked
//       13      32  5.584415584e-2  5.584415584e-2  7.7e-15   3.12e-16            2309   [196.1s]
//       17      64  4.698634699e-2  4.698634699e-2  1.7e-14   5.62e-16            30029   [196.9s]
//
// B. THE WEIGHTS ATTACHED TO EACH m, at z = 13, s = 3.0.  Every modulus of the
//    certificate, its term count, its main-term share W(m) = K_0(m), the largest
//    |K_h(m)| over h != 0, and what that modulus pays in each basis.
//
//      m     omega  #terms  tau(m)  #terms/tau   W(m)=K_0(m)    max_h |K_h(m)|   sum_h |K_h|/|sin(pi h/m)|
//        1    0       3       1     3.00      1.0000e+0   0.0000e+0         0.0000
//        2    1       9       2     4.50     -5.0000e-1   5.0000e-1         0.5000
//        3    1       6       2     3.00     -6.6667e-1   3.3333e-1         0.7698
//        5    1       6       2     3.00     -4.0000e-1   3.2361e-1         1.1011
//        6    2      18       4     4.50      3.3333e-1   3.3333e-1         1.3849
//        7    1       6       2     3.00     -2.8571e-1   2.5742e-1         1.5119
//       10    2      18       4     4.50      2.0000e-1   2.0000e-1         1.9506
//       11    1       6       2     3.00     -1.8182e-1   1.7445e-1         2.0480
//       14    2      18       4     4.50      1.4286e-1   1.4286e-1         2.3553
//       15    2      12       4     3.00      2.6667e-1   2.1574e-1         2.6554
//       21    2      12       4     3.00      1.9048e-1   1.7161e-1         2.7222
//       22    2      18       4     4.50      9.0909e-2   9.0909e-2         2.9161
//       30    3      36       8     4.50     -1.3333e-1   1.3333e-1         3.2385
//       33    2      12       4     3.00      1.2121e-1   1.1630e-1         3.4613
//       35    2      12       4     3.00      1.1429e-1   1.0297e-1         4.0825
//       42    3      36       8     4.50     -9.5238e-2   9.5238e-2         3.7706
//       55    2      12       4     3.00      7.2727e-2   6.9781e-2         3.8776
//       66    3      36       8     4.50     -6.0606e-2   6.0606e-2         4.2374
//       70    3      36       8     4.50     -5.7143e-2   5.7143e-2         4.1521
//       77    2      10       4     2.50      2.5974e-2   2.5952e-2         3.8194
//      105    3      24       8     3.00     -7.6190e-2   6.8645e-2         5.6817
//      110    3      36       8     4.50     -3.6364e-2   3.6364e-2         5.3941
//      154    3      30       8     3.75     -1.2987e-2   1.2987e-2         3.7876
//      165    3      24       8     3.00     -4.8485e-2   4.6521e-2         5.9089
//      210    4      72      16     4.50      3.8095e-2   3.8095e-2         7.3661
//      231    3      20       8     2.50     -1.7316e-2   1.7302e-2         6.4828
//      330    4      72      16     4.50      2.4242e-2   2.4242e-2         7.2895
//      385    3      16       8     2.00     -1.0390e-2   1.0381e-2         5.7496
//      462    4      60      16     3.75      8.6580e-3   8.6580e-3         5.7474
//      770    4      48      16     3.00      5.1948e-3   5.1948e-3         6.4377
//     1155    4      32      16     2.00      6.9264e-3   6.9206e-3         8.7043
//     2310    5      96      32     3.00     -3.4632e-3   3.4632e-3        10.6007
//
//    totals: 32 moduli, 852 terms (N = 852), Ssat_hm = 129.7047
//    the largest single modulus contributes 8.2% of Ssat_hm.
//
// C. (T1) CHECKED DIRECTLY.  At every frequency (e,a): |Theta_e(a)| <= sum_{m:e|m}
//    |K_{a m/e}(m)|.  The e basis keeps the cancellation ACROSS moduli; the (h,m)
//    basis destroys it. The column "collapse" is the ratio of the two, i.e. how
//    much cross-modulus cancellation the e basis is buying at that frequency.
//
//    z   #(e,a)  violations  worst collapse   mean collapse   #moduli per e (mean, max)
//    13    2309          0    4.667e+1      9.2472         6.81, 16   [196.9s]
//    17   30029          0    7.676e+4      10.5341         10.56, 32   [196.9s]
//    19  510509          0    3.069e+5      10.0385         14.30, 62   [197.7s]
//
// D. THE LADDER IN BOTH BASES.  Every row is a legal unconditional worst-position
//    statement: H*M > Ssup(H) puts T(x) > 0 at EVERY position, with no maximal law
//    and no averaging, in either basis. u = ln(H)/ln z, u_sat = ln(Ssat/M)/ln z.
//
//    z    Ssat_e      Ssat_hm     ratio    u_sat_e  u_sat_hm  diff     ln(ratio)/ln z   H_sup_e   H_sup_hm   u_sup_e  u_sup_hm  diff
//    13  1.9602e+1  1.2970e+2   6.6170  2.2850   3.0217   0.7367     0.7367            198      1385    2.0617   2.8201   0.7584 exact
//    17  5.0314e+1  3.9714e+2   7.8932  2.4623   3.1915   0.7292     0.7292            683      5369    2.3036   3.0313   0.7278 exact
//    19  1.2006e+2  8.8374e+2   7.3607  2.7228   3.4007   0.6779     0.6779           1833     14167    2.5518   3.2463   0.6945 exact
//    23  2.4250e+2  1.6936e+3   6.9840  2.8281   3.4480   0.6199     0.6199           4278     31458    2.6666   3.3030   0.6363 exact
//    29  5.2311e+2  3.9344e+3   7.5211  2.8827   3.4819   0.5992     0.5992          10384     85435    2.7464   3.3723   0.6259
//    31  9.5263e+2  7.1676e+3   7.5241  3.0259   3.6136   0.5877     0.5877          20586    169427    2.8924   3.5062   0.6138
//    37  2.5727e+3  1.9062e+4   7.4093  3.1644   3.7190   0.5546     0.5546
//    41  4.6495e+3  3.2992e+4   7.0958  3.2543   3.7819   0.5277     0.5277
//    43  7.1072e+3  4.9847e+4   7.0136  3.3448   3.8627   0.5179     0.5179
//    47  1.2623e+4      --         --    3.4306     --       --         --
//
//    brackets on the H-scan (the grid point below the first that closes):
//      z=13  e basis [197, 198] exact   (h,m) basis [1384, 1385] exact
//      z=17  e basis [682, 683] exact   (h,m) basis [5368, 5369] exact
//      z=19  e basis [1832, 1833] exact   (h,m) basis [14166, 14167] exact
//      z=23  e basis [4277, 4278] exact   (h,m) basis [31457, 31458] exact
//      z=29  e basis [9493, 10384]   (h,m) basis [78103, 85435]
//      z=31  e basis [18819, 20586]   (h,m) basis [154887, 169427]
//
// E. THE GROWTH LAW IN BOTH BASES.  This is the question the brief asks: the
//    e-basis ladder rises at every step, and the divergence is driven by a factor
//    geometric in pi(z). Is that a fact about the object or about the coordinates?
//
//    per-added-prime ratios
//      e basis    : 2.5668  2.3863  2.0198  2.1572  1.8211  2.7006  1.8073  1.5286  1.7760
//      (h,m) basis: 3.0618  2.2253  1.9164  2.3231  1.8218  2.6594  1.7308  1.5109
//      geometric means: e 2.0516 over 9 steps, (h,m) 2.1042 over 8 steps
//      on the COMMON range z = 13..43: e 2.0889, (h,m) 2.1042, ratio of the two 1.0073
//
//    log-log slopes d ln Ssat / d ln z
//      all levels : e 4.9872   (h,m) 4.8678
//      top five   : e 6.1967   (h,m) 6.1204
//      top three  : e 7.2037   (h,m) 6.2285
//      beta_2 = 4.26645
//
//    THE GAP BETWEEN THE BASES, which is the whole content of the change:
//      z    Ssat_hm/Ssat_e   u_sat_hm - u_sat_e   (that difference) * ln z   step in the ratio
//      13     6.6170         0.7367              1.8896              --
//      17     7.8932         0.7292              2.0660            1.1929
//      19     7.3607         0.6779              1.9962            0.9325
//      23     6.9840         0.6199              1.9436            0.9488
//      29     7.5211         0.5992              2.0177            1.0769
//      31     7.5241         0.5877              2.0181            1.0004
//      37     7.4093         0.5546              2.0027            0.9847
//      41     7.0958         0.5277              1.9595            0.9577
//      43     7.0136         0.5179              1.9479            0.9884
//      min 6.6170, max 7.8932, geometric mean 7.2599,
//      log-log slope of the ratio against z: 0.0133 (0 = a flat factor, >0 = the e basis flatters by a growing amount)
//
//    THE SAME QUESTION ON THE u_sup COLUMN, which is the published ladder:
//      z    u_sup_e   u_sup_hm   diff     H_hm/H_e   step in u_sup_e   step in u_sup_hm
//      13   2.0617    2.8201   0.7584     6.995        --                --
//      17   2.3036    3.0313   0.7278     7.861      0.2418            0.2112
//      19   2.5518    3.2463   0.6945     7.729      0.2483            0.2150
//      23   2.6666    3.3030   0.6363     7.353      0.1148            0.0566
//      29   2.7464    3.3723   0.6259     8.228      0.0798            0.0693
//      31   2.8924    3.5062   0.6138     8.230      0.1459            0.1339
//      u_sup rises at 5 of 5 steps in the e basis and 5 of 5 in the (h,m) basis.
//      largest u_sup in this range: e 2.8924, (h,m) 3.5062;  beta_2 = 4.26645.
//      levels where u_sup exceeds beta_2: e 0, (h,m) 0, of 6.
//
//    THE BOUNDED FAMILY, fitted in both bases.  u = A - B/ln z is the one model in
//    lemmaV-sup-extension.md section 1 item 3 that is BOUNDED, and its asymptote A is
//    the most favourable reading the e-basis instrument admits. Fitted by least
//    squares on x = 1/ln z over every level available in each basis:
//      u_sat, e basis      : A = 5.5649  B = 8.5739  RSS = 4.772e-2  (10 levels, z = 13..47)
//      u_sat, (h,m) basis  : A = 5.4823  B = 6.3603  RSS = 2.665e-2  (9 levels, z = 13..43)
//      u_sup, e basis      : A = 5.2163  B = 8.0799  RSS = 1.660e-2  (6 levels)
//      u_sup, (h,m) basis  : A = 5.3737  B = 6.5156  RSS = 1.467e-2  (6 levels)
//      u_sat, e basis, RESTRICTED to the (h,m) range so the two fits see the same z:
//                            A = 5.4512  B = 8.2419  RSS = 3.660e-2  (9 levels, z = 13..43)
//      asymptote above beta_2 = 4.26645?  u_sat: e YES, (h,m) YES;  u_sup: e YES, (h,m) YES.
//      (the e-basis u_sat row is a custody anchor: attack-tau-repricing.md reports the
//       bounded-family asymptote as 5.5649 and lemmaV-sup-extension.md as 5.56.)
//
// F. THE TWO PRICES, CHECKED AGAINST EACH OTHER.  attack-tau-repricing.md section 2:
//    tau(m) is the number of terms inside ONE modulus and C^{pi(z)} is the size of
//    the WHOLE x-free bound, and summed over the modulus set the tau bound IS the
//    divisor-pair count N. A basis change that made the total look cheap would be
//    that withdrawn re-pricing wearing new coordinates. Three checks.
//
//    (a) the bookkeeping identity: sum_m (terms with q_i = m) = N, so the tau bound
//        summed over the modulus set IS the divisor-pair count, exactly as
//        attack-tau-repricing.md section 2 reading (a) says. The per-modulus ceiling
//        is counted here rather than quoted: an ordered pair (d1,d2) with lcm m and
//        gcd | 2 sends each ODD prime of m to d1 or to d2 exclusively (2^{omega-[2|m]}
//        ways) and, when 2 | m, sends 2 to d1, to d2 or to BOTH (3 ways), and each
//        pair carries the vector sieve's three sign combinations. So the ceiling is
//        3*tau(m) for odd m and 4.5*tau(m) for even m, before the level truncation.
//        z   #moduli   sum_m n_m      N     max n_m/tau  at m =   max over ODD m   n/tau at m = 2*3*5*7*11
//        13      32        852      852    4.5000         2      3.0000        3.0000   (n/tau > 4.5 at 0 moduli)   [594.7s]
//        17      64       2236     2236    4.5000         2      3.0000        3.5625   (n/tau > 4.5 at 0 moduli)   [594.7s]
//        19     128       4764     4764    4.5000         2      3.0000        3.5625   (n/tau > 4.5 at 0 moduli)   [594.7s]
//        23     244       9636     9636    4.5000         2      3.0000        4.5000   (n/tau > 4.5 at 0 moduli)   [594.7s]
//        29     468      20700    20700    4.5000         2      3.0000        4.5000   (n/tau > 4.5 at 0 moduli)   [594.7s]
//        31     828      35868    35868    4.5000         2      3.0000        4.5000   (n/tau > 4.5 at 0 moduli)   [594.7s]
//
//    (b) modulus and frequency counts. The e basis pays 2^{pi(z)} moduli; the (h,m)
//        basis pays the certificate's own moduli, far fewer -- and that is exactly
//        the trade reading 21 describes. What it does NOT buy is a cheaper total.
//        z   #(e,a) points   #(h,m) points   ratio    #moduli (h,m)   2^{pi(z)}   ratio   z^{2s}      N
//        13   2.309e+3       6.880e+3     2.980          32            32   1.000   4.83e+6       852
//        17   3.003e+4       9.670e+4     3.220          64            64   1.000   2.41e+7      2236
//        19   5.105e+5       1.383e+6     2.708         128           128   1.000   4.70e+7      4764
//        23   2.649e+6       6.855e+6     2.587         244           256   0.953   1.48e+8      9636
//        29   1.719e+7       4.481e+7     2.607         468           512   0.914   5.95e+8     20700
//        31   6.058e+7       1.685e+8     2.781         828          1024   0.809   8.88e+8     35868
//        37   5.251e+8       1.570e+9     2.990        1528          2048   0.746   2.57e+9     76484
//        41   1.795e+9       5.380e+9     2.997        2536          4096   0.619   4.75e+9    125884
//        43   3.744e+9       1.106e+10     2.954        3880          8192   0.474   6.32e+9    183084
//        Every m here is [d1,d2] with d1,d2 squarefree and z-smooth, so m | P(z) and the
//        (h,m) modulus count is capped by 2^{pi(z)} as well -- z^{2s} is the cap on the
//        SIZE of m, not on how many there are. The realised count is the ratio column.
//
//    (c) the three x-free bounds on sup|R|, nested, all computed here at s = 3.0:
//        N (divisor-pair basis, no cancellation)  >=?  Ssat_hm (cancellation inside
//        one modulus only)  >=  Ssat_e (cancellation across moduli too).
//        z      N       Ssat_hm     Ssat_e     N/Ssat_hm   Ssat_hm/Ssat_e   N/Ssat_e
//        13      852  1.2970e+2  1.9602e+1       6.57       6.6170      43.47
//        17     2236  3.9714e+2  5.0314e+1       5.63       7.8932      44.44
//        19     4764  8.8374e+2  1.2006e+2       5.39       7.3607      39.68
//        23     9636  1.6936e+3  2.4250e+2       5.69       6.9840      39.74
//        29    20700  3.9344e+3  5.2311e+2       5.26       7.5211      39.57
//        31    35868  7.1676e+3  9.5263e+2       5.00       7.5241      37.65
//        37    76484  1.9062e+4  2.5727e+3       4.01       7.4093      29.73
//        41   125884  3.2992e+4  4.6495e+3       3.82       7.0958      27.07
//        43   183084  4.9847e+4  7.1072e+3       3.67       7.0136      25.76
//
//    The middle column is the one nobody had: the (h,m) basis WITH the weights
//    attached. Reading 13 asked for a total price in that basis and this is it.
// ───── stderr ─────
//    [ladder] z=13 done 197.7s
//    [ladder] z=17 done 198.2s
//    [ladder] z=19 done 211.0s
//    [ladder] z=23 done 336.3s
//    [ladder] z=29 done 352.7s
//    [ladder] z=31 done 410.8s
//    [ladder] z=37 done 427.5s
//    [ladder] z=41 done 483.0s
//    [ladder] z=43 done 594.7s
//    [ladder] z=47 done 594.7s
//    [done 594.7s]
// ============================================================================
// READINGS
// ============================================================================
//
//  1. CUSTODY FIRST, AND ALL FOUR ANCHORS LAND. The e-basis saturation
//     reproduces the published ladder at all ten levels to the five figures it
//     is published to, 1.9602e+1 through 1.2623e+4, worst relative difference
//     2.7e-5 and that is the rounding. H_sup reproduces EXACTLY at all six
//     levels scanned -- 198, 683, 1833, 4278, 10384, 20586 -- so u_sup reads
//     2.0617, 2.3036, 2.5518, 2.6666, 2.7464, 2.8924, the published numbers.
//     The per-added-prime factor of S_sat over z = 13..47 recomputes at 2.0516
//     against the published 2.0516, relative difference 5.4e-6. And the
//     bounded-family asymptote for u_sat in the e basis comes out at A = 5.5649,
//     which is attack-tau-repricing.md's figure to four decimals.
//     The reproduction uses the published grid schedule, K = 20 at z >= 29 and
//     24 below, because H_sup off a geometric grid depends on the grid: a finer
//     one returns a smaller and equally legal H_sup. Both bases are scanned on
//     the same grid at the same z throughout, or the comparison would be
//     measuring the grid.
//
//  2. THE WEIGHTS, AND THEY ARE NOT A NEW OBJECT. K_h(m) = sum_{q_i = m}
//     (w_i/q_i) e(-h c_i/m). Its h = 0 value rebuilds the main term:
//     sum_m W(m) = M to 7.7e-15 and 1.7e-14 relative at z = 13 and 17. Its
//     aggregation over the moduli divisible by e rebuilds attack 1's Theta_e(a)
//     at EVERY frequency: worst discrepancy 3.12e-16 over 2309 frequencies at
//     z = 13 and 5.62e-16 over 30029 at z = 17, against a Theta rebuilt
//     independently from the raw term list rather than from the same fac
//     arrays. So "attach the weights" is not an extension of the identity. It
//     is the identity with one summation not yet performed.
//
//  3. (T1) HOLDS AT EVERY FREQUENCY, CHECKED AND NOT ASSUMED. Violations of
//     |Theta_e(a)| <= sum_{m : e|m} |K_{a m/e}(m)|: 0 out of 2309, 0 out of
//     30029, 0 out of 510509 at z = 13, 17, 19. The two bases are nested, and
//     the natural one is the outer member. THIS IS THE MOST IMPORTANT
//     STRUCTURAL FACT IN THE FILE and it decides the shape of the answer before
//     any number is read: the (h,m) basis could not have rescued u_sup, because
//     its bound is pointwise larger. What was open was the SIZE.
//
//  4. THE SIZE, AND IT IS A FLAT FACTOR. Ssat_hm/Ssat_e = 6.6170, 7.8932,
//     7.3607, 6.9840, 7.5211, 7.5241, 7.4093, 7.0958, 7.0136 over z = 13..43.
//     Minimum 6.6170, maximum 7.8932, geometric mean 7.2599, and the log-log
//     slope of the ratio against z is 0.0133. Nine levels, a range of 1.19x,
//     no trend. The change of basis costs a constant.
//
//  5. SO THE DIVERGENCE SURVIVES, AND IT SURVIVES WITH THE SAME LAW. The
//     per-added-prime factor is 2.0889 in the e basis and 2.1042 in the (h,m)
//     basis on the common range z = 13..43, a ratio of 1.0073. The log-log
//     slopes d ln Ssat/d ln z are 4.9872 against 4.8678 over all levels and
//     6.1967 against 6.1204 over the top five. Both are above beta_2 = 4.26645
//     in every window. The 2.05-per-added-prime law that closed u_sup is not a
//     property of the e basis.
//
//  6. AND IT SURVIVES ON THE LADDER ITSELF, NOT ONLY ON THE SATURATION.
//     u_sup_hm = 2.8201, 3.0313, 3.2463, 3.3030, 3.3723, 3.5062 over
//     z = 13..31, rising at 5 of 5 steps, exactly as u_sup_e rises at 5 of 5.
//     H_hm/H_e = 6.995, 7.861, 7.729, 7.353, 8.228, 8.230 -- the same flat
//     factor of about 7 seen in reading 4, now in the window itself.
//
//  7. THE GAP IN WINDOW EXPONENT IS SHRINKING, WHICH IS WHAT A FLAT FACTOR
//     LOOKS LIKE HERE. u_sat_hm - u_sat_e = 0.7367, 0.7292, 0.6779, 0.6199,
//     0.5992, 0.5877, 0.5546, 0.5277, 0.5179, and (u_sat_hm - u_sat_e)*ln z
//     sits between 1.8896 and 2.0660 at all nine levels. The difference IS
//     ln(7.2599)/ln z. Asymptotically the two bases give the same exponent.
//
//  8. THE BOUNDED READING AGREES, IN BOTH BASES. The one model in the family
//     that is bounded, u = A - B/ln z, fits u_sat at A = 5.5649 in the e basis
//     over ten levels and A = 5.4823 in the (h,m) basis over nine. Like for
//     like, on the same nine levels, the e basis reads A = 5.4512 against the
//     (h,m) basis's 5.4823 -- the (h,m) asymptote is the higher of the two, as
//     (T1) requires, and the apparent inversion against 5.5649 is the tenth
//     level and nothing else. On u_sup the same fit gives 5.2163 and 5.3737.
//     All four are above beta_2 = 4.26645. The most favourable reading the
//     natural basis admits still lands above the target.
//
//  9. THE CROSS-MODULUS CANCELLATION IS REAL AND IT IS EXACTLY LARGE ENOUGH TO
//     KEEP THE RATIO FLAT. The mean over frequencies of
//     sum_m |K| / |sum_m K| is 9.2472, 10.5341, 10.0385 at z = 13, 17, 19 while
//     the mean number of moduli sharing one frequency GROWS, 6.81, 10.56,
//     14.30, with maxima 16, 32, 62. More moduli pile onto each frequency and
//     the cancellation among them grows in step. That is why the total ratio in
//     reading 4 does not move.
//
// 10. THE WITHDRAWN tau(m) RE-PRICING DID NOT COME BACK IN, AND THE CHECK IS
//     DECISIVE RATHER THAN RHETORICAL. If the basis change had smuggled it back
//     the (h,m) total would have come out CHEAPER than the e total. It comes out
//     MORE EXPENSIVE at every level, by 6.6170 at the least and 7.8932 at the
//     most. The bookkeeping
//     identity that attack-tau-repricing.md rests on is reproduced here from the
//     modulus side: sum_m n_m = N exactly at all six levels tested, 852 through
//     35868.
//
// 11. A CORRECTION TO THAT FILE'S CEILING, AND IT MOVES ITS CONCLUSION THE WAY
//     IT ALREADY POINTS. "The per-modulus term count is at most 3 tau(m)" is
//     true for ODD m -- measured max 3.0000 over odd m at every level -- and
//     false for even m. The count is 4.5000 tau(m) at m = 2 at all six levels,
//     and at m = 2*3*5*7*11 it is 3.0000 at z = 13, 3.5625 at z = 17 and 19,
//     then 4.5000 from z = 23 on, as the level truncation stops biting. The
//     reason is structural: an ordered pair (d1,d2) with lcm m and gcd | 2 must
//     send each odd prime of m to exactly one of d1, d2, but may send the prime
//     2 to d1, to d2 or to both. So the ceiling is 4.5 tau(m) at even m. Zero
//     moduli exceed 4.5 tau(m) anywhere. This makes the tau price LOOSER than
//     the file assumed, which is the direction its own verdict already runs.
//
// 12. A CORRECTION TO attack-tail-maximal's MODULUS-COUNT COMPARISON. Its
//     reading 21 sets "2^{pi(z)} moduli" in the e basis against "about z^{2s}
//     moduli" in the tau basis and concludes the tau basis is the more
//     expensive of the two below z ~ 200. z^{2s} is the cap on the SIZE of m,
//     not a count: every m = [d1,d2] here is squarefree and z-smooth, so
//     m | P(z) and the (h,m) modulus count is capped by 2^{pi(z)} as well.
//     Measured, it is 32, 64, 128, 244, 468, 828, 1528, 2536, 3880 against
//     2^{pi(z)} = 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, a ratio
//     falling 1.000 to 0.474, while z^{2s} at z = 43 is 6.32e+9. The (h,m)
//     basis has FEWER moduli at every level, not more, and the frequency count
//     it actually pays is 2.587 to 3.220 times the e basis's, flat.
//
// 13. THE THREE-WAY NESTING, WHICH IS THE CLEANEST WAY TO READ THE WHOLE FILE.
//     N (no cancellation) > Ssat_hm (cancellation inside one modulus)
//     > Ssat_e (cancellation across moduli too). N/Ssat_e falls 43.47 to 25.76
//     over z = 13..43, reproducing attack-tau-repricing.md's 43.47 and 25.76 at
//     the ends; N/Ssat_hm falls 6.57 to 3.67; Ssat_hm/Ssat_e is flat at 7.2599.
//     The Fourier gain the corpus records is 25.76x at z = 43, and this file
//     splits it: a factor 3.67 from summing coherently inside a modulus and a
//     factor 7.0136 from summing coherently across moduli.
//
// 14. WHAT THIS DOES NOT ESTABLISH, STATED SO IT IS NOT READ AS COVERAGE.
//     (a) THE (h,m) BASIS IS NOT A SECOND INDEPENDENT INSTRUMENT. By (T1) it is
//         the e basis with one summation moved outside an absolute value, and
//         it agrees because it must. Reading 5 is a statement that the growth
//         law is not an artefact of WHERE that summation sits; it is not
//         corroboration from a different measurement, and citing it as such
//         would repeat the mistake this repository made twice this week.
//     (b) TWO BASES ARE NOT ALL BASES. Nothing here bears on a representation
//         nobody has written down, and (T1) is a statement about this pair.
//     (c) THE u_sup COLUMN STOPS AT z = 31 IN BOTH BASES, not at 43, because
//         the H-scan costs the ladder times the grid and the (h,m) basis pays
//         1.106e+10 frequency points at z = 43 on its own. The saturation
//         u_sat, which lemmaV-sup-extension.md measures as tracking u_sup to
//         0.51/ln z, carries the comparison to 43.
//     (d) NOTHING HERE REOPENS OR RE-CLOSES u_sup. The closure is the e-basis
//         ladder's, and it rests on measurements this file does not repeat.
//         What this file removes is one specific escape route that was named as
//         open, and it removes it by computation rather than by argument.
//     (e) s = 3.0 THROUGHOUT, one level, as the published ladder uses. No claim
//         is made about how the ratio in reading 4 moves with s.
//     (f) NO LITERATURE CHANNEL WAS OPENED IN THIS SESSION and no [ABSENT]
//         claim is made anywhere in this file.
// ============================================================================
