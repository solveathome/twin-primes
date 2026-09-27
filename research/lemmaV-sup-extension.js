// ============================================================================
// THE FOURIER SUP BOUND, EXTENDED — plateau or slow divergence?
// (2026-08-18. Follow-up to research/lemmaV-parseval.js S5 and its report
//  research/history/staging/attack-beta2-01-lemmaV-meansquare.md sec.5.
//  Write-up: research/history/staging/lemmaV-sup-extension.md.
//  Parent: research/sift-limit-attack.md sec.4.5, sec.6 item (i), sec.7b/7c.)
// ============================================================================
// THE OBJECT. Attack 1 proved the pointwise spectral identity (its L5)
//
//   R_H(x) = sum_{e | P(z), e>1} sum*_{a mod e} Theta_e(a) S_H(a/e) e(ax/e),
//
// and observed that taking absolute values THERE — in the Fourier variables,
// where the sieve's own cancellation already sits inside Theta_e(a) — gives an
// UNCONDITIONAL WORST-POSITION bound with no maximal law and no quantifier over
// positions:
//
//   sup_x |R_H(x)| <= Ssup(H) := sum_{e>1} sum*_a |Theta_e(a)| |S_H(a/e)|
//                    <= Ssat  := sum_{e>1} sum*_a |Theta_e(a)| / |sin(pi a/e)|.
//
// So T(x) > 0 at EVERY x as soon as H*M > Ssup(H), and a fortiori as soon as
// H*M > Ssat. Write u_sup = ln(H_sup)/ln z for the first window that closes and
// u_sat = ln(Ssat/M)/ln z for the H-free version. Attack 1 measured u_sup at
// FOUR levels — 2.0617, 2.3036, 2.5518, 2.6666 at z = 13, 17, 19, 23 — all
// below beta_2 = 4.26645, but RISING, with increments +0.242, +0.248, +0.115.
// Its own verdict: "Four points cannot decide whether it plateaus, and this is
// the single most important thing left undone in this attack."
//
// THIS FILE ADDS LEVELS AND FITS THE TREND. Nothing here is a new inequality;
// the chain is attack 1's, re-implemented so that it runs at z = 29..47 rather
// than stopping at 23, and then read adversarially.
//
// WHAT MAKES THE EXTENSION AFFORDABLE. The cost of Ssup as written in
// lemmaV-parseval.js is sum_e phi(e) * 2^omega(e) evaluations of Theta_e(a),
// each costing a cosine and a sine: 1.7e7 at z = 23 but 2.8e10 at z = 43. Two
// changes remove the exponential factor and almost all of the trigonometry.
//
//   (P1) THE PHASE IS A PRODUCT OVER PRIMES. Attack 1's Theorem B gives
//        c_i = 0 mod e1, c_i = -2 mod e2 with (e1,e2) = (gcd(e,d1), e/gcd(e,d1)).
//        Splitting 1/e = sum_{p|e} b_p/p mod 1 with b_p = inverse(e/p) mod p,
//        every prime of e1 contributes 0 to a*c_i/e and every prime of e2
//        contributes 2 a b_p / p, so
//            e(-a c_i / e) = prod_{p | e2} e(2 a b_p / p),
//        a factor depending on a ONLY through a mod p. Hence
//            Theta_e(a) = sum_{T subset of primes(e)} V(e/e_T, e_T)
//                         prod_{p in T} e(2 a b_p / p),
//        a multilinear form in omega(e) unit roots drawn from tables of size p.
//   (P2) A MULTILINEAR FORM IS EVALUATED ON A WHOLE GRID BY PEELING. Fixing
//        a mod p_1, ..., a mod p_j collapses the 2^omega array to 2^(omega-j).
//        Summed over the mixed-radix enumeration of (Z/e)*, the total is
//            sum_j prod_{i<=j}(p_i - 1) * 2^(omega-j)  ~  phi(e)
//        when the primes are peeled in ASCENDING order, against phi(e)2^omega
//        for term-by-term evaluation. Measured saving 5.3x to 7.8x in count and
//        far more in time, since (P1) replaces every cos/sin by a table lookup.
//
// The remaining trigonometry is |sin(pi a/e)| and |sin(pi H a/e)|, one and K per
// (e,a). Both are taken with a degree-13 odd polynomial for sin(pi t) on
// [0, 1/2] (S0a measures its error against Math.sin: 1.6e-10 relative), and
// (Ha mod e) is carried along the innermost loop by a modular increment.
//
// WHAT IS COMPUTED
//   S0  CUSTODY. The fast sine against Math.sin; the peeled Theta_e(a) against
//       lemmaV-parseval.js's own factorisation sum; Ssup/Ssat/SCS/Var(c) against
//       its supBoundTable; the spectral mean square against the repository's
//       INDEPENDENT O(N^2) divisor-pair meanSquare(); and attack 1's four
//       published H_sup values reproduced by the same protocol it used.
//   S1  THE FLOORS. A sup BOUND that dips under the true sup is a bug, not a
//       win. Three floors are printed at every level that has them.
//   S2  COST per level, printed BEFORE the expensive levels run.
//   S3  THE LADDER: u_sup and u_sat at z = 13..47.
//   S4  THE TREND: five models fitted, each with its extrapolated crossing of
//       beta_2 = 4.26645 and a leave-one-out band. This is the deliverable.
//   S5  THE TWO REPRESENTATIONS: attack 2's absolute-value ceiling (sec.7b of
//       sift-limit-attack.md) against attack 1's 80x, measured at every level.
//   S6  s-ROBUSTNESS: is the trend an artifact of the level s = 3.0?
//
//   node research/lemmaV-sup-extension.js            (full ladder, ~40 min)
//   node research/lemmaV-sup-extension.js --quick    (stop at z = 31, ~1 min)
//   node research/lemmaV-sup-extension.js S0 S1      (named sections; S0..S6)
// ============================================================================
'use strict';
const path = require('path');
const T0 = Date.now(); const el = () => ((Date.now() - T0) / 1000).toFixed(1) + 's';

// CUSTODY: the term list, the exact mean square and the full-period walk are
// the repository's own; the reference Ssup/Ssat implementation is attack 1's
// own. Both are imported, never recopied, so every number below runs back
// through sift-limit-lemmaV.js to the 2026-08-14 pilot.
const REPO = require(path.join(__dirname, 'sift-limit-lemmaV.js'));
const A1 = require(path.join(__dirname, 'lemmaV-parseval.js'));

const QUICK = process.argv.includes('--quick');
const BETA2 = 4.26645;                    // paper/beta2-note.md
const S_LEVEL = 3.0;                      // the level attack 1 measured at
const PI = Math.PI;

// z with the full H-scan (u_sup), and z with the H-free bound only (u_sat).
const ZS_SUP = QUICK ? [13, 17, 19, 23, 29, 31] : [13, 17, 19, 23, 29, 31, 37, 41, 43];
const ZS_SAT = QUICK ? [37] : [47];
// attack 1's exhaustive thresholds (phase1-T4-maximal-law.md sec.4, reproduced
// in lemmaV-parseval.js S0b): the smallest H with min_x T(x) >= 1.
const NP = { 13: 60, 17: 126, 19: 198, 23: 258 };

function gcd(a, b) { while (b) { const t = a % b; a = b; b = t; } return a; }
function modinv(a, m) {
  if (m === 1) return 0;
  let g = a % m, x = 1, y = 0, b = m, u = 0, v = 1;
  while (b) { const q = Math.floor(g / b); let t = b; b = g - q * b; g = t; t = u; u = x - q * u; x = t; t = v; v = y - q * v; y = t; }
  return ((x % m) + m) % m;
}
// exact for a,b,m below 2^53; the BigInt branch fires only at z >= 47, where
// e can exceed 2e8 and e*H would leave the exactly-representable integers.
function mulmod(a, b, m) { const p = a * b; if (p <= 9007199254740991) return p % m; return Number((BigInt(a) * BigInt(b)) % BigInt(m)); }
function primesBelow(n) { const s = new Uint8Array(n), o = []; for (let i = 2; i < n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j < n; j += i) s[j] = 1; } } return o; }
function thetaOf(z) { let t = 0; for (const p of primesBelow(z)) t += Math.log(p); return t; }

// |sin(pi t)| for t in [0,1). Odd Taylor to x^13 on [0, pi/2]; S0a measures the
// error. The polynomial exists because the H-scan needs ~1e11 of these.
function sp(t0) {
  const t = t0 < 0.5 ? t0 : 1 - t0;
  const x = PI * t, x2 = x * x;
  return x * (1 + x2 * (-1 / 6 + x2 * (1 / 120 + x2 * (-1 / 5040 + x2 * (1 / 362880
    + x2 * (-1 / 39916800 + x2 * (1 / 6227020800)))))));
}

// ---------------------------------------------------------------------------
// (P1) the multilinear plan for one modulus e: the 2^omega coefficient array,
// the per-prime unit-root tables, and the CRT weights that rebuild a mod e.
// ---------------------------------------------------------------------------
function planOf(rec, ps) {
  const e = rec.e, pf = []; for (const p of ps) if (e % p === 0) pf.push(p);   // ASCENDING
  const k = pf.length, A = new Float64Array(1 << k);
  for (const f of rec.fac) {                       // f = [e2, phase numerator, V(e1,e2)]
    let mask = 0; const e2 = f[0];
    for (let j = 0; j < k; j++) if (e2 % pf[j] === 0) mask |= (1 << j);
    A[mask] += f[2];
  }
  const zr = [], zi = [], m = new Float64Array(k);
  for (let j = 0; j < k; j++) {
    const p = pf[j], ep = e / p, b = modinv(ep % p, p);
    const cr = new Float64Array(p), ci = new Float64Array(p);
    for (let a = 0; a < p; a++) { const th = 2 * PI * ((2 * a * b) % p) / p; cr[a] = Math.cos(th); ci[a] = Math.sin(th); }
    zr.push(cr); zi.push(ci);
    m[j] = mulmod(ep % e, b, e);                   // a = sum_j (a mod p_j) m_j  mod e
  }
  return { e, pf, k, A, zr, zi, m, pfArr: Int32Array.from(pf) };
}

// ---------------------------------------------------------------------------
// (P2) the peel. ACC[0] += sum_a |Theta|/|sin(pi a/e)|, ACC[1] += sum_a |Theta|^2,
// ACC[2] += #(e,a); out[t] += Ssup contribution at H = HSf[t]; ssq[t] the same
// squared, which is the exact spectral mean square <R^2>_{H_t} by attack 1's L3.
// ---------------------------------------------------------------------------
function innerLoop(e, invE, p, zrT, ziT, r0, i0, r1, i1, aStart, mLast,
                   K, HSf, out, ssq, hAcc, hstep, ACC) {
  let a = aStart, S = 0, Q = 0, n = 0;
  for (let t = 0; t < K; t++) { const hm = HSf[t] % e; hAcc[t] = mulmod(hm, a, e); hstep[t] = mulmod(hm, mLast, e); }
  for (let aj = 1; aj < p; aj++) {
    const zr0 = zrT[aj], zi0 = ziT[aj];
    const re = r0 + zr0 * r1 - zi0 * i1, im = i0 + zr0 * i1 + zi0 * r1;
    const th2 = re * re + im * im;
    if (th2 > 0) {
      const G = Math.sqrt(th2) / sp(a * invE);
      S += G; Q += th2; n++;
      for (let t = 0; t < K; t++) {
        const h = hAcc[t], c = G * sp(h * invE);
        out[t] += c; ssq[t] += c * c;
        const v = h + hstep[t]; hAcc[t] = v >= e ? v - e : v;
      }
      a += mLast; if (a >= e) a -= e;
      continue;
    }
    a += mLast; if (a >= e) a -= e;
    for (let t = 0; t < K; t++) { const v = hAcc[t] + hstep[t]; hAcc[t] = v >= e ? v - e : v; }
  }
  ACC[0] += S; ACC[1] += Q; ACC[2] += n;
}
function peel(d, aPart, pl, LR, LI, K, HSf, out, ssq, hAcc, hstep, ACC) {
  const k = pl.k, e = pl.e, p = pl.pfArr[d], zrT = pl.zr[d], ziT = pl.zi[d], md = pl.m[d];
  if (d === k - 1) {
    const cr = LR[d], ci = LI[d];
    let aStart = aPart + md; if (aStart >= e) aStart -= e;
    innerLoop(e, 1 / e, p, zrT, ziT, cr[0], ci[0], cr[1], ci[1], aStart, md, K, HSf, out, ssq, hAcc, hstep, ACC);
    return;
  }
  const cr = LR[d], ci = LI[d], nr = LR[d + 1], ni = LI[d + 1], L = nr.length;
  let ap = aPart;
  for (let aj = 1; aj < p; aj++) {
    const zr0 = zrT[aj], zi0 = ziT[aj];
    for (let t = 0, u = 0; t < L; t++, u += 2) {
      const rr = cr[u + 1], ii = ci[u + 1];
      nr[t] = cr[u] + zr0 * rr - zi0 * ii; ni[t] = ci[u] + zr0 * ii + zi0 * rr;
    }
    ap += md; if (ap >= e) ap -= e;
    peel(d + 1, ap, pl, LR, LI, K, HSf, out, ssq, hAcc, hstep, ACC);
  }
}
// One sweep over every (e,a) of the spectrum. HS may be empty (Ssat only).
function sweep(SD, HS) {
  const K = HS.length, out = new Float64Array(K), ssq = new Float64Array(K);
  const HSf = Float64Array.from(HS), hAcc = new Float64Array(K), hstep = new Float64Array(K);
  const ACC = new Float64Array(3);
  let Ssat = 0, VarC = 0, SCS = 0, nPts = 0;
  for (const rec of SD.recs) {
    const pl = planOf(rec, SD.t.ps), k = pl.k;
    const LR = [], LI = [];
    for (let d = 0; d <= k; d++) { LR.push(new Float64Array(1 << (k - d))); LI.push(new Float64Array(1 << (k - d))); }
    LR[0].set(pl.A);
    ACC[0] = 0; ACC[1] = 0; ACC[2] = 0;
    peel(0, 0, pl, LR, LI, K, HSf, out, ssq, hAcc, hstep, ACC);
    Ssat += ACC[0]; nPts += ACC[2]; VarC += ACC[1];
    SCS += Math.sqrt(ACC[1] * (pl.e * pl.e - 1) / 3);
  }
  return { Ssat, out, ssq, VarC, SCS, nPts };
}

// Many H at once: the per-point inner loop carries K modular accumulators, so K
// is chunked to keep them in cache. Only the exhaustive up-set test needs this.
function sweepChunked(SD, HS, chunk) {
  const out = new Float64Array(HS.length);
  for (let i = 0; i < HS.length; i += chunk) {
    const part = HS.slice(i, i + chunk), r = sweep(SD, part);
    out.set(r.out, i);
  }
  return out;
}

// ---------------------------------------------------------------------------
// THE PROTOCOL FOR H_sup. NOT a bisection: a geometric grid is scanned upward
// and the FIRST grid point that closes is taken, with the previous grid point
// printed beside it as the bracket. If the lowest grid point already closes the
// grid is widened downward and rescanned; if none closes it is widened upward.
// At z <= 23 the last gap is then swept integer by integer, which is exactly
// attack 1's protocol and reproduces its published H_sup.
// ---------------------------------------------------------------------------
function scanGrid(SD, M, HS) {
  const r = sweep(SD, HS);
  let i = -1; for (let k = 0; k < HS.length; k++) if (HS[k] * M > r.out[k]) { i = k; break; }
  return { r, i };
}
function findHsup(SD, z, Ssat, K, refineInts) {
  const M = SD.M, Hsat = Ssat / M;
  let lo = 0.18, hi = 0.99, pass = 0, res = null, HS = null, widened = [];
  while (pass < 4) {
    HS = [];
    for (let k = 0; k < K; k++) HS.push(Math.max(2, Math.round(Hsat * lo * Math.pow(hi / lo, k / (K - 1)))));
    HS = [...new Set(HS)].sort((a, b) => a - b);
    res = scanGrid(SD, M, HS);
    if (res.i === 0) { widened.push(`down from ${lo.toFixed(3)}`); hi = lo * 1.02; lo = lo / 4; pass++; continue; }
    if (res.i < 0) { widened.push(`up from ${hi.toFixed(3)}`); lo = hi * 0.98; hi = hi * 2; pass++; continue; }
    break;
  }
  if (res.i <= 0) { console.log(`      *** z=${z}: the grid never bracketed the crossing after ${pass} widenings; u_sup not reported`); return null; }
  let Hhi = HS[res.i], Hlo = HS[res.i - 1], Ssup = res.r.out[res.i], msq = res.r.ssq[res.i], exact = false;
  if (refineInts && Hhi - Hlo <= 4096) {           // z <= 23: every integer in the gap
    const RS = []; for (let H = Hlo + 1; H < Hhi; H++) RS.push(H);
    if (RS.length) {
      const r2 = sweep(SD, RS);
      for (let k = 0; k < RS.length; k++) if (RS[k] * M > r2.out[k]) { Hhi = RS[k]; Hlo = k ? RS[k - 1] : Hlo; Ssup = r2.out[k]; msq = r2.ssq[k]; break; }
    }
    exact = true;
  }
  return { Hsup: Hhi, Hlo, Ssup, msq, exact, widened, grid: HS.length, ratio: Math.pow(hi / lo, 1 / (K - 1)) };
}

// ---------------------------------------------------------------------------
// least squares y = a x + b, plus the constant model
// ---------------------------------------------------------------------------
function lsq(xs, ys) {
  const n = xs.length; let sx = 0, sy = 0, sxx = 0, sxy = 0;
  for (let i = 0; i < n; i++) { sx += xs[i]; sy += ys[i]; sxx += xs[i] * xs[i]; sxy += xs[i] * ys[i]; }
  const den = n * sxx - sx * sx, a = (n * sxy - sx * sy) / den, b = (sy - a * sx) / n;
  let rss = 0, mx = 0;
  for (let i = 0; i < n; i++) { const r = ys[i] - (a * xs[i] + b); rss += r * r; mx = Math.max(mx, Math.abs(r)); }
  return { a, b, rss, mx };
}
function constFit(ys) { const c = ys.reduce((p, q) => p + q, 0) / ys.length; let rss = 0, mx = 0; for (const y of ys) { rss += (y - c) * (y - c); mx = Math.max(mx, Math.abs(y - c)); } return { a: 0, b: c, rss, mx }; }
// the z at which a fitted model reaches TARGET, searched over primes (never
// interpolated off the end of a table).
const PRIMES_FAR = primesBelow(4000000);
function crossZ(kind, f, target) {
  // u = a/ln z + b with a < 0 RISES to the asymptote b. It is bounded, and it
  // still crosses the target at a finite z whenever that asymptote is ABOVE the
  // target. Treating "bounded" as "never crosses" was wrong and is the trap this
  // branch exists to avoid.
  if (kind === 'invlnz') {
    if (f.a >= 0) return null;                     // decreasing in z
    if (f.b <= target) return null;                // asymptote at or below target
    return Math.exp(f.a / (target - f.b));
  }
  if (f.a <= 0) return null;
  if (kind === 'lnz') return Math.exp((target - f.b) / f.a);
  if (kind === 'lnlnz') { const v = (target - f.b) / f.a; return v > 700 ? Infinity : Math.exp(Math.exp(v)); }
  if (kind === 'theta') {
    const need = (target - f.b) / f.a; let th = 0;
    for (let i = 0; i < PRIMES_FAR.length - 1; i++) {
      th += Math.log(PRIMES_FAR[i]); const zz = PRIMES_FAR[i + 1];
      if (th / Math.log(zz) >= need) return zz;
    }
    return Infinity;
  }
  return null;
}
function showZ(c) {
  if (c === null) return 'never (fitted slope <= 0)';
  if (!Number.isFinite(c)) return '> 4e6 (beyond the prime search)';
  return c >= 1e5 ? c.toExponential(3) : c.toFixed(1);
}
const MODELS = [
  ['constant  u = c', 'const', null],
  ['u = a ln z + b', 'lnz', z => Math.log(z)],
  ['u = a lnln z + b', 'lnlnz', z => Math.log(Math.log(z))],
  ['u = a th(z)/ln z + c', 'theta', z => thetaOf(z) / Math.log(z)],
  ['u = A - B/ln z', 'invlnz', z => 1 / Math.log(z)],
];
function fitAll(zs, us) {
  const out = [];
  for (const [name, kind, fx] of MODELS) {
    const f = kind === 'const' ? constFit(us) : lsq(zs.map(fx), us);
    out.push({ name, kind, f, cross: kind === 'const' ? null : crossZ(kind, f, BETA2) });
  }
  return out;
}

// ===========================================================================
// S0  CUSTODY
// ===========================================================================
function S0() {
  console.log('S0 CUSTODY --- five reproductions before a single new level is run\n');

  console.log('  (a) the fast |sin(pi t)| against Math.sin, over 2.4e6 arguments m/e:');
  { let wr = 0, wa = 0;
    for (let e = 2; e <= 20000; e += 3) for (let m = 0; m < e; m += Math.max(1, (e / 200) | 0)) {
      const x = sp(m / e), y = Math.abs(Math.sin(PI * m / e));
      wa = Math.max(wa, Math.abs(x - y)); if (y > 1e-13) wr = Math.max(wr, Math.abs(x - y) / y);
    }
    console.log(`      worst absolute error ${wa.toExponential(2)}, worst RELATIVE error ${wr.toExponential(2)}` +
      `   (relative is what matters: G = |Theta|/|sin(pi a/e)| divides by it)   [${el()}]`);
  }

  console.log('\n  (b) the PEELED Theta_e(a) against lemmaV-parseval.js\'s own factorisation sum');
  console.log('      Theta_e(a) = sum_{e1e2=e} e(2a inv(e1)/e2) V(e1,e2), term by term:');
  for (const z of [13, 17, 19, 23]) {
    const SD = A1.spectralRecords(z, S_LEVEL);
    let worst = 0, nchk = 0, crtBad = 0;
    for (const rec of SD.recs) {
      const pl = planOf(rec, SD.t.ps);
      for (let a = 1; a < rec.e && nchk < 3000; a++) {
        if (gcd(a, rec.e) !== 1) continue;
        let dr = 0, di = 0;
        for (const f of rec.fac) {
          if (f[0] === 1) { dr += f[2]; continue; }
          const th = 2 * PI * ((a * f[1]) % f[0]) / f[0]; dr += f[2] * Math.cos(th); di += f[2] * Math.sin(th);
        }
        let cur = Array.from(pl.A, v => [v, 0]);
        for (let j = 0; j < pl.k; j++) {
          const aj = a % pl.pf[j], zr = pl.zr[j][aj], zi = pl.zi[j][aj], nx = new Array(cur.length >> 1);
          for (let t = 0; t < nx.length; t++) { const [r0, i0] = cur[2 * t], [r1, i1] = cur[2 * t + 1]; nx[t] = [r0 + zr * r1 - zi * i1, i0 + zr * i1 + zi * r1]; }
          cur = nx;
        }
        worst = Math.max(worst, Math.hypot(dr - cur[0][0], di - cur[0][1])); nchk++;
        let sm = 0; for (let j = 0; j < pl.k; j++) sm = (sm + (a % pl.pf[j]) * pl.m[j]) % pl.e;
        if (sm !== a % pl.e) crtBad++;
      }
      if (nchk >= 3000) break;
    }
    console.log(`      z=${z}: worst |peeled - direct| over ${nchk} pairs (e,a) = ${worst.toExponential(2)}, CRT-weight mismatches = ${crtBad}`);
  }

  console.log(`\n  (c) Ssup(nP), Ssat, SCS and Var(c) against lemmaV-parseval.js supBoundTable(),`);
  console.log('      which evaluates the same sums term by term at cost phi(e)*2^omega(e):');
  for (const z of [13, 17, 19, 23]) {
    const SD = A1.spectralRecords(z, S_LEVEL), ref = A1.supBoundTable(z, S_LEVEL, [NP[z]]), mine = sweep(SD, [NP[z]]);
    const rel = (x, y) => (Math.abs(x - y) / Math.abs(y)).toExponential(2);
    console.log(`      z=${z}: Ssup(nP) ${mine.out[0].toFixed(6)} vs ${ref.out[0].toFixed(6)} rel ${rel(mine.out[0], ref.out[0])}` +
      ` | Ssat rel ${rel(mine.Ssat, ref.Ssat)} | SCS rel ${rel(mine.SCS, ref.SCS)} | Var(c) rel ${rel(mine.VarC, ref.VarC)}   [${el()}]`);
  }

  console.log('\n  (d) the spectral mean square from the SAME sweep against the repository\'s');
  console.log('      INDEPENDENT O(N^2) divisor-pair meanSquare(). Attack 1 L3 says');
  console.log('      <R^2>_H = sum_{e,a} |Theta_e(a)|^2 F_H(a/e); the sweep accumulates it as');
  console.log('      sum of (G |sin(pi H a/e)|)^2, so a match validates the whole Theta path:');
  for (const z of [13, 17, 19, 23, 29]) {
    const SD = A1.spectralRecords(z, S_LEVEL), H = Math.round(z * z), r = sweep(SD, [H]);
    const ref = REPO.meanSquare(SD.t, H).ms;
    console.log(`      z=${z} H=${H}: sweep ${r.ssq[0].toFixed(9)}  meanSquare() ${ref.toFixed(9)}  rel ${(Math.abs(r.ssq[0] - ref) / ref).toExponential(2)}   [${el()}]`);
  }

  console.log('\n  (e) attack 1 sec.5 published H_sup = 198, 683, 1833, 4278 and');
  console.log('      u_sup = 2.0617, 2.3036, 2.5518, 2.6666 at z = 13, 17, 19, 23.');
  console.log('      Reproduced here by grid-then-every-integer, the protocol it used:');
  const A1H = { 13: 198, 17: 683, 19: 1833, 23: 4278 };
  for (const z of [13, 17, 19, 23]) {
    const SD = A1.spectralRecords(z, S_LEVEL), sat = sweep(SD, []).Ssat;
    const f = findHsup(SD, z, sat, 24, true);
    console.log(`      z=${z}: H_sup = ${f.Hsup} (attack 1: ${A1H[z]})  u_sup = ${(Math.log(f.Hsup) / Math.log(z)).toFixed(4)}` +
      `   ${f.Hsup === A1H[z] ? 'CONFIRMED' : 'MISMATCH'}   [${el()}]`);
  }

  console.log('\n  (f) IS THE PREDICATE AN UP-SET IN H? Both attack 1\'s protocol and this file\'s');
  console.log('      report the first GRID point at which H*M > Ssup(H), refining the last gap');
  console.log('      where that is affordable. That equals the true minimum only if closure is');
  console.log('      monotone in H. Below, EVERY integer H from 8 to 2*H_sup is tested at the');
  console.log('      three levels where exhaustion is affordable. H_min is the true minimum of');
  console.log('      the instrument; the overshoot of the published/protocol value is the bias');
  console.log('      carried by every grid row of S3, and it is one-signed (upward).');
  console.log('      z    H_min   H_sup(protocol)   overshoot   u(H_min)  u(H_sup)  d u    later failures');
  for (const z of [13, 17, 19]) {
    const SD = A1.spectralRecords(z, S_LEVEL), M = SD.M, top = 2 * A1H[z], lz = Math.log(z);
    const HS = []; for (let H = 8; H <= top; H++) HS.push(H);
    const out = sweepChunked(SD, HS, 400);
    let first = null, holes = 0;
    for (let k = 0; k < HS.length; k++) {
      const ok = HS[k] * M > out[k];
      if (ok && first === null) first = HS[k];
      if (!ok && first !== null) holes++;
    }
    console.log(`      ${String(z).padStart(2)} ${String(first).padStart(7)} ${String(A1H[z]).padStart(15)}   ${((A1H[z] / first - 1) * 100).toFixed(2).padStart(7)}%   ` +
      `${(Math.log(first) / lz).toFixed(4)}   ${(Math.log(A1H[z]) / lz).toFixed(4)}  ${(Math.log(A1H[z] / first) / lz).toFixed(4)}   ${String(holes).padStart(5)}` +
      `   ${holes === 0 ? 'UP-SET' : 'NOT AN UP-SET'}   [${el()}]`);
  }
  console.log('      So closure is NOT monotone in H, and the grid protocol overshoots the true');
  console.log('      minimum by a small one-signed amount. Every u_sup in S3 is therefore an');
  console.log('      UPPER estimate of the instrument\'s own best exponent. That bias works');
  console.log('      AGAINST a plateau reading and FOR a divergence reading, so S4\'s verdict');
  console.log('      must be read with it in mind, not against it.');
}

// ===========================================================================
// S1  THE FLOORS A SUP BOUND MUST NOT BREAK
// ===========================================================================
function S1() {
  console.log('\nS1 FLOORS --- a bound that dips under the truth is a bug, not a win\n');
  console.log('  Three floors, in decreasing order of how far up the ladder they reach.');
  console.log('  (i)   Ssup(H) >= rms(R_H) at EVERY level, because Ssup is the l1 norm and');
  console.log('        the mean square is the l2 norm of the SAME non-negative spectral terms.');
  console.log('        It is automatic, so it is a wiring check, and it reaches z = 47.');
  console.log('  (ii)  Ssup(nP) >= true sup_x |R| at z <= 23, from the exhaustive period walk.');
  console.log('  (iii) u_sup >= u_true = ln(nP)/ln z at z <= 23, nP the exhaustive threshold.');
  console.log('  Plus u_max = ln W/ln z, since R_W == 0 identically: a window approaching the');
  console.log('  period degenerates and nothing may be read off there.\n');
  console.log('  z    H=nP   Ssup(nP)     rms(R_nP)   true sup|R|   Ssup/sup   Ssup/rms   sup/rms   u_true   u_max   nP/W');
  for (const z of [13, 17, 19, 23]) {
    const SD = A1.spectralRecords(z, S_LEVEL), H = NP[z], r = sweep(SD, [H]);
    const fp = REPO.fullPeriodArray(z, Math.log(H) / Math.log(z), S_LEVEL);
    const rms = Math.sqrt(r.ssq[0]), lz = Math.log(z);
    console.log(`  ${String(z).padStart(2)} ${String(H).padStart(5)} ${r.out[0].toFixed(4).padStart(11)} ${rms.toFixed(4).padStart(11)} ${fp.sup.toFixed(4).padStart(12)}` +
      ` ${(r.out[0] / fp.sup).toFixed(2).padStart(10)} ${(r.out[0] / rms).toFixed(2).padStart(10)} ${(fp.sup / rms).toFixed(2).padStart(9)}` +
      `  ${(Math.log(H) / lz).toFixed(4)}  ${(fp.lnW / lz).toFixed(4)}  ${(H / fp.W).toExponential(1)}   [${el()}]`);
  }
  console.log('\n  WHAT ATTACK 1\'S SOUNDNESS FLAG MEANS, AND WHY IT IS THE WHOLE POINT HERE.');
  console.log('  Attack 1 sec.4(ii) found its mean-square exponent u_1 sitting BELOW beta_2 at');
  console.log('  z = 13, 17, 19, 23 and crossing at z = 29, and refused to call that a result:');
  console.log('  u_1 = theta(z)/(2 ln z) + 1.45 DIVERGES, so "below beta_2" at toy z says only');
  console.log('  that theta(z)/(2 ln z) has not got there yet. The crossing landed exactly where');
  console.log('  the law puts it (theta/(2 ln z) passes beta_2 - 1.45 = 2.8165 between z = 23 and');
  console.log('  29), which is what proved it was a law and not a coincidence.');
  console.log('  u_sup is in EXACTLY the same position: four points below beta_2 prove nothing');
  console.log('  unless the shape is known. Attack 1\'s own endpoint fit for it has the SAME');
  console.log('  divergent shape, u_sup = 0.2865 theta(z)/ln z + 1.197, just with a smaller');
  console.log('  constant. S4 is the test of that shape, and it is the deliverable of this file.');
}

// ===========================================================================
// S2  COST, printed before the expensive levels run
// ===========================================================================
function S2() {
  console.log('\nS2 COST --- what each level costs, before any of it is spent\n');
  console.log('  #(e,a) is the exact size of the spectral sum: sum over e | P(z) that actually');
  console.log('  occur, of phi(e). "term-by-term" is what lemmaV-parseval.js would pay,');
  console.log('  sum_e phi(e) 2^omega(e), with a cos and a sin at every one of them.\n');
  console.log('  z    N(terms)  #recs   max e        #(e,a)      term-by-term  saving   plan');
  for (const z of [...ZS_SUP, ...ZS_SAT]) {
    const SD = A1.spectralRecords(z, S_LEVEL);
    let sphi = 0, sphif = 0, maxE = 0;
    for (const r of SD.recs) {
      let ph = r.e; for (const p of SD.t.ps) if (r.e % p === 0) ph = ph / p * (p - 1);
      sphi += ph; sphif += ph * r.fac.length; maxE = Math.max(maxE, r.e);
    }
    const sup = ZS_SUP.includes(z);
    console.log(`  ${String(z).padStart(2)}  ${String(SD.N).padStart(7)}  ${String(SD.recs.length).padStart(5)}  ${maxE.toExponential(3)}  ${sphi.toExponential(4)}  ${sphif.toExponential(4)}` +
      `  ${(sphif / sphi).toFixed(1).padStart(5)}x  ${sup ? 'u_sup + u_sat' : 'u_sat only (H-scan too dear)'}   [${el()}]`);
  }
}

// ===========================================================================
// S3  THE LADDER
// ===========================================================================
const LADDER = [];
function ensureLadder() {
  if (LADDER.length) return LADDER;
  for (const z of [...ZS_SUP, ...ZS_SAT]) {
    const SD = A1.spectralRecords(z, S_LEVEL), M = SD.M, lz = Math.log(z);
    const base = sweep(SD, []);                       // Ssat, Var(c), SCS, #(e,a)
    const row = { z, M, lz, N: SD.N, Ssat: base.Ssat, VarC: base.VarC, SCS: base.SCS, nPts: base.nPts,
      u_sat: Math.log(base.Ssat / M) / lz, lnW: thetaOf(z), sup: null };
    if (ZS_SUP.includes(z)) {
      const K = z >= 41 ? 14 : (z >= 29 ? 20 : 24);
      const f = findHsup(SD, z, base.Ssat, K, z <= 23);
      if (f) {
        row.sup = f;
        row.u_sup = Math.log(f.Hsup) / lz;
        row.u_lo = Math.log(f.Hlo) / lz;
        row.rms = Math.sqrt(f.msq);
      }
    }
    LADDER.push(row);
    console.log(`  built z=${z}  #(e,a)=${base.nPts.toExponential(3)}  u_sat=${row.u_sat.toFixed(4)}` +
      `${row.sup ? '  u_sup=' + row.u_sup.toFixed(4) + ' [' + row.u_lo.toFixed(4) + ',' + row.u_sup.toFixed(4) + ']' + (row.sup.exact ? ' exact' : '') : ''}   [${el()}]`);
  }
  return LADDER;
}
function S3() {
  console.log('\nS3 THE LADDER --- u_sup and u_sat as far as the machine reaches\n');
  console.log('  Both exponents are LEGAL unconditional worst-position statements at each z:');
  console.log('  H*M > Ssup(H) and a fortiori H*M > Ssat put T(x) > 0 at EVERY position, with');
  console.log('  no maximal law and no averaging. u_sat is the H-free one and is an upper bound');
  console.log('  for u_sup by construction. beta_2 = 4.26645.\n');
  ensureLadder();
  console.log('\n  z    #(e,a)     Ssat        u_sat    H_sup     u_sup [bracket]        u_sat-u_sup  0.51/ln z   u_max    H_sup/W');
  for (const r of LADDER) {
    const W = Math.exp(r.lnW), umax = r.lnW / r.lz;
    if (!r.sup) { console.log(`  ${String(r.z).padStart(2)}  ${r.nPts.toExponential(3)}  ${r.Ssat.toExponential(4)}  ${r.u_sat.toFixed(4)}      --        --                        --        ${(0.51 / r.lz).toFixed(4)}   ${umax.toFixed(3)}      --`); continue; }
    console.log(`  ${String(r.z).padStart(2)}  ${r.nPts.toExponential(3)}  ${r.Ssat.toExponential(4)}  ${r.u_sat.toFixed(4)}  ${String(r.sup.Hsup).padStart(8)}  ${r.u_sup.toFixed(4)} [${r.u_lo.toFixed(4)},${r.u_sup.toFixed(4)}]${r.sup.exact ? ' exact' : '      '}` +
      `   ${(r.u_sat - r.u_sup).toFixed(4)}     ${(0.51 / r.lz).toFixed(4)}   ${umax.toFixed(3)}   ${(r.sup.Hsup / W).toExponential(1)}`);
  }
  console.log('\n  The two exponents differ by ln(Ssat/Ssup(H_sup))/ln z, and the column beside it');
  console.log('  is 0.51/ln z, the prediction from Ssup(H_sup)/Ssat being flat near 0.6: they');
  console.log('  CONVERGE as z grows, so u_sat is a faithful and cheaper stand-in at large z.');

  console.log('\n  Increments, which is the form the plateau question actually takes:');
  console.log('  step        d u_sup   d u_sat   d ln z    d(th/ln z)   du_sup/dlnz   du_sup/d(th/lnz)');
  for (let i = 1; i < LADDER.length; i++) {
    const a = LADDER[i - 1], b = LADDER[i];
    const dth = (b.lnW / b.lz) - (a.lnW / a.lz), dl = b.lz - a.lz;
    const dsup = (a.sup && b.sup) ? (b.u_sup - a.u_sup) : null;
    console.log(`  ${String(a.z).padStart(2)} -> ${String(b.z).padStart(2)}   ${dsup === null ? '   --  ' : dsup.toFixed(4).padStart(7)}   ${(b.u_sat - a.u_sat).toFixed(4).padStart(7)}   ${dl.toFixed(4)}    ${dth.toFixed(4).padStart(7)}      ${dsup === null ? '  --  ' : (dsup / dl).toFixed(3).padStart(6)}         ${dsup === null ? '  --  ' : (dsup / dth).toFixed(3).padStart(6)}`);
  }

  console.log('\n  TIGHTNESS. Ssup(H) against the rms of the same field at the same H (exact,');
  console.log('  from the spectral mean square in the same sweep). sup|R| >= rms always, so');
  console.log('  Ssup/rms is an upper bound for the loss, measurable at EVERY level; at z <= 23');
  console.log('  S1 splits it into Ssup/sup times sup/rms. sqrt(2 ln W) is the maximal-law size');
  console.log('  of sup/rms, so Ssup/rms growing faster than that means the BOUND is loosening.');
  console.log('  z    H_sup    Ssup(H_sup)   rms(R_Hsup)   Ssup/rms   sqrt(2 lnW)   ratio');
  for (const r of LADDER) {
    if (!r.sup) continue;
    const g = Math.sqrt(2 * r.lnW);
    console.log(`  ${String(r.z).padStart(2)} ${String(r.sup.Hsup).padStart(8)} ${r.sup.Ssup.toFixed(4).padStart(13)} ${r.rms.toFixed(4).padStart(13)} ${(r.sup.Ssup / r.rms).toFixed(2).padStart(10)} ${g.toFixed(3).padStart(13)}   ${((r.sup.Ssup / r.rms) / g).toFixed(2)}`);
  }
}

// ===========================================================================
// S4  THE TREND, WHICH IS THE DELIVERABLE
// ===========================================================================
function S4() {
  console.log('\nS4 THE TREND --- plateau, slow divergence, or undetermined\n');
  ensureLadder();
  const rowsSup = LADDER.filter(r => r.sup), rowsSat = LADDER;
  const report = (label, rows, key) => {
    const zs = rows.map(r => r.z), us = rows.map(r => r[key]);
    console.log(`\n  ${label}  (${zs.length} points, z = ${zs.join(', ')})`);
    console.log('  model                    a          b        RSS        max|res|   crosses beta_2 at z');
    const fits = fitAll(zs, us);
    for (const F of fits) {
      const c = F.cross;
      console.log(`  ${F.name.padEnd(22)} ${F.f.a.toFixed(5).padStart(9)} ${F.f.b.toFixed(5).padStart(9)} ${F.f.rss.toExponential(2).padStart(10)} ${F.f.mx.toFixed(4).padStart(10)}   ` +
        (F.kind === 'const' ? 'never (constant)' :
          F.kind === 'invlnz' ? `bounded, A = ${F.f.b.toFixed(4)}; ` + (c === null ? 'never crosses' : showZ(c)) :
            showZ(c)));
    }
    // leave-one-out band on the crossing point
    console.log('  leave-one-out bands on the crossing (refit dropping each level in turn):');
    for (const [name, kind, fx] of MODELS) {
      if (kind === 'const') continue;
      const cs = [];
      for (let i = 0; i < zs.length; i++) {
        const zz = zs.filter((_, j) => j !== i), uu = us.filter((_, j) => j !== i);
        const f = lsq(zz.map(fx), uu), c = crossZ(kind, f, BETA2);
        cs.push(c === null ? Infinity : c);
      }
      const fin = cs.filter(Number.isFinite);
      console.log(`    ${name.padEnd(22)} ${fin.length === cs.length ? `[${showZ(Math.min(...cs))}, ${showZ(Math.max(...cs))}]` : `${cs.length - fin.length} of ${cs.length} refits never cross` + (fin.length ? `; the rest [${showZ(Math.min(...fin))}, ${showZ(Math.max(...fin))}]` : '')}`);
    }
    // the same fits on the upper half only
    const h = Math.floor(zs.length / 2);
    if (zs.length - h >= 3) {
      const zt = zs.slice(h), ut = us.slice(h);
      console.log(`  the same models on the TOP ${zt.length} levels only (z = ${zt.join(', ')}):`);
      for (const F of fitAll(zt, ut)) {
        const c = F.cross;
        console.log(`    ${F.name.padEnd(22)} a=${F.f.a.toFixed(5).padStart(9)} b=${F.f.b.toFixed(5).padStart(9)} RSS=${F.f.rss.toExponential(2)}   ` +
          (F.kind === 'const' ? 'never' : F.kind === 'invlnz' ? `A = ${F.f.b.toFixed(4)}; ` + (c === null ? 'never' : showZ(c)) : showZ(c)));
      }
    }
    // PROFILE OVER THE ASYMPTOTE. The decision-relevant question is not which
    // model wins but which LIMITS the data still permit. Fix a candidate
    // asymptote A in the bounded family u = A - B/ln z and minimise over B only;
    // RSS(A) then prices each candidate limit directly. B is unconstrained, so a
    // candidate A below the data returns B < 0, i.e. a DECREASING curve; the
    // best-B column is printed so that case is visible rather than hidden.
    console.log('  profile over the asymptote in the bounded family u = A - B/ln z:');
    console.log('    A          best B     RSS         RSS/RSS_min   verdict at beta_2 = 4.26645');
    const xs = zs.map(z => 1 / Math.log(z));
    const rssAt = (A) => { let sn = 0, sd = 0; for (let i = 0; i < xs.length; i++) { sn += (A - us[i]) * xs[i]; sd += xs[i] * xs[i]; }
      const B = sn / sd; let r = 0; for (let i = 0; i < xs.length; i++) { const d = us[i] - (A - B * xs[i]); r += d * d; } return { B, rss: r }; };
    let bestA = 0, bestR = Infinity;
    for (let A = us[us.length - 1]; A <= 12; A += 0.001) { const q = rssAt(A); if (q.rss < bestR) { bestR = q.rss; bestA = A; } }
    for (const A of [3.0, 3.5, 4.0, BETA2, 4.5, 5.0, 6.0, 8.0, bestA]) {
      const q = rssAt(A);
      console.log(`    ${A.toFixed(5).padStart(8)} ${q.B.toFixed(4).padStart(10)}  ${q.rss.toExponential(3)}  ${(q.rss / bestR).toFixed(2).padStart(10)}    ` +
        (A === bestA ? 'best-fitting asymptote' : A <= BETA2 ? 'the bound would stay under beta_2' : 'the bound would cross beta_2'));
    }
    return fits;
  };
  report('u_sup', rowsSup, 'u_sup');
  report('u_sat  (the H-free bound; an upper bound for u_sup at every z)', rowsSat, 'u_sat');

  console.log('\n  ATTACK 1\'S OWN ENDPOINT FIT, EXTENDED AND CHECKED.');
  console.log('  It fitted u_sup = alpha theta(z)/ln z + c to the z = 13 and z = 23 endpoints,');
  console.log('  got alpha = 0.2865, c = 1.197, and said it "would cross beta_2 near z = 45".');
  const A = 0.2865, C = 1.197;
  console.log('  z     theta(z)/ln z   that fit predicts   measured u_sup   residual');
  for (const r of LADDER) {
    const x = r.lnW / r.lz, p = A * x + C;
    console.log(`  ${String(r.z).padStart(2)}    ${x.toFixed(4).padStart(9)}       ${p.toFixed(4).padStart(9)}        ${r.sup ? r.u_sup.toFixed(4).padStart(9) : '   --    '}     ${r.sup ? (r.u_sup - p).toFixed(4).padStart(8) : '  --  '}`);
  }
  { const need = (BETA2 - C) / A; let th = 0, hit = null;
    for (let i = 0; i < PRIMES_FAR.length - 1 && !hit; i++) { th += Math.log(PRIMES_FAR[i]); if (th / Math.log(PRIMES_FAR[i + 1]) >= need) hit = PRIMES_FAR[i + 1]; }
    console.log(`  That fit needs theta(z)/ln z = ${need.toFixed(4)} to reach beta_2, which first happens at`);
    console.log(`  z = ${hit}, NOT z = 45 (there theta(z)/ln z = ${(thetaOf(45) / Math.log(45)).toFixed(4)}, giving u = ${(A * thetaOf(45) / Math.log(45) + C).toFixed(4)}).`);
    console.log('  So attack 1 sec.5(c) and its READING 6 put their own fit\'s crossing 24 percent');
    console.log('  low in z. A small slip, corrected here; the shape claim is unaffected, and');
    console.log('  the residual column above is the finding that actually bears on it.');
  }
}

// ===========================================================================
// S5  THE TWO REPRESENTATIONS
// ===========================================================================
function S5() {
  console.log('\nS5 THE TWO REPRESENTATIONS --- attack 2\'s ceiling against attack 1\'s 80x\n');
  console.log('  sift-limit-attack.md sec.7b (attack 2) measured sum|r| reaching 0.978 of the');
  console.log('  trivial pair-count bound at a CRT-constructed worst position and concluded');
  console.log('  "theta_total <= 1 is a genuine ceiling on any absolute-value method". Attack 1');
  console.log('  sec.5(a) answered that the ceiling is on the divisor-pair REPRESENTATION: the');
  console.log('  same absolute-value step in the Fourier basis is 74x to 81x smaller.');
  console.log('  The clean comparison is between the two H-FREE absolute-value bounds:');
  console.log('    divisor-pair basis  sup|R| <= sum_i |w_i| |Delta_i| <= N, the term count;');
  console.log('    Fourier basis       sup|R| <= Ssat.');
  console.log('  Both are what taking absolute values gives, with no H in either.\n');
  ensureLadder();
  console.log('  z     N        Ssat        N/Ssat    Ssup(nP)   N/Ssup(nP)   Var(c)      SCS/Ssat');
  for (const r of LADDER) {
    let np = '   --   ', nsn = '   --  ';
    if (NP[r.z]) { const q = sweep(A1.spectralRecords(r.z, S_LEVEL), [NP[r.z]]).out[0]; np = q.toFixed(4).padStart(9); nsn = (r.N / q).toFixed(0).padStart(8); }
    console.log(`  ${String(r.z).padStart(2)} ${String(r.N).padStart(7)}  ${r.Ssat.toExponential(4)}  ${(r.N / r.Ssat).toFixed(1).padStart(7)}  ${np}  ${nsn}     ${r.VarC.toExponential(3)}   ${(r.SCS / r.Ssat).toExponential(2)}`);
  }
  console.log('\n  The SCS column is attack 1\'s Cauchy-Schwarz relaxation of Ssat, kept here');
  console.log('  because its ratio to Ssat is the one number in the chain that was clearly');
  console.log('  DIVERGING at four levels (4.26, 10.0, 20.5, 31.4). Whether it keeps doubling');
  console.log('  decides whether the L2 target is dead or merely lossy.');
}

// ===========================================================================
// S6  s-ROBUSTNESS
// ===========================================================================
function S6() {
  console.log('\nS6 s-ROBUSTNESS --- is the trend an artifact of the level s = 3.0?\n');
  console.log('  u_sat = ln(Ssat/M)/ln z at three levels s. The vector sieve needs s > 1+sqrt(e)');
  console.log('  = 2.6487 for the main term to be asymptotically positive, so s = 2.6 sits just');
  console.log('  BELOW the threshold and is included only as a stress test of the shape, not as');
  console.log('  a usable level; 3.0 is attack 1\'s and 3.4 is well inside. If the z-trend has');
  console.log('  the same shape at all three, the trend is not an artifact of s.\n');
  console.log('  z     s=2.6     s=3.0     s=3.4');
  const SS = [2.6, 3.0, 3.4], tab = [];
  for (const z of (QUICK ? [13, 17, 19, 23] : [13, 17, 19, 23, 29, 31])) {
    const row = SS.map(s => { const SD = A1.spectralRecords(z, s); return Math.log(sweep(SD, []).Ssat / SD.M) / Math.log(z); });
    tab.push({ z, row });
    console.log(`  ${String(z).padStart(2)}  ${row.map(v => v.toFixed(4).padStart(8)).join('  ')}   [${el()}]`);
  }
  console.log('  fit u_sat = a theta(z)/ln z + c at each s:');
  for (let j = 0; j < SS.length; j++) {
    const f = lsq(tab.map(t => thetaOf(t.z) / Math.log(t.z)), tab.map(t => t.row[j]));
    console.log(`    s=${SS[j]}: a = ${f.a.toFixed(5)}, c = ${f.b.toFixed(5)}, RSS = ${f.rss.toExponential(2)}`);
  }
}

function main() {
  const only = process.argv.slice(2).filter(a => /^S[0-6]$/.test(a));
  const run = { S0, S1, S2, S3, S4, S5, S6 };
  for (const k of ['S0', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6']) if (!only.length || only.includes(k)) run[k]();
  console.log('\nDONE ' + el());
}
if (require.main === module) main();
module.exports = { sweep, planOf, findHsup, sp };

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/lemmaV-sup-extension.js
//   invocation:  node research/lemmaV-sup-extension.js
//   code-sha256: 870cd2e0556a7d8714a5a2cf2244c7d2fdc358c3859eb18c01136cd4b9945b36
//   out-sha256:  22498dce27fd15c3d94b5ff9d0b7458b6a9b8f5328239268791a857ef2df115c
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     1303.4 s
// ============================================================================
// S0 CUSTODY --- five reproductions before a single new level is run
//
//   (a) the fast |sin(pi t)| against Math.sin, over 2.4e6 arguments m/e:
//       worst absolute error 6.63e-10, worst RELATIVE error 6.63e-10   (relative is what matters: G = |Theta|/|sin(pi a/e)| divides by it)   [0.1s]
//
//   (b) the PEELED Theta_e(a) against lemmaV-parseval.js's own factorisation sum
//       Theta_e(a) = sum_{e1e2=e} e(2a inv(e1)/e2) V(e1,e2), term by term:
//       z=13: worst |peeled - direct| over 2309 pairs (e,a) = 1.96e-17, CRT-weight mismatches = 0
//       z=17: worst |peeled - direct| over 3000 pairs (e,a) = 1.64e-17, CRT-weight mismatches = 0
//       z=19: worst |peeled - direct| over 3000 pairs (e,a) = 1.25e-17, CRT-weight mismatches = 0
//       z=23: worst |peeled - direct| over 3000 pairs (e,a) = 9.22e-18, CRT-weight mismatches = 0
//
//   (c) Ssup(nP), Ssat, SCS and Var(c) against lemmaV-parseval.js supBoundTable(),
//       which evaluates the same sums term by term at cost phi(e)*2^omega(e):
//       z=13: Ssup(nP) 11.446659 vs 11.446659 rel 4.81e-11 | Ssat rel 1.14e-11 | SCS rel 0.00e+0 | Var(c) rel 2.40e-16   [0.2s]
//       z=17: Ssup(nP) 28.411760 vs 28.411760 rel 4.29e-11 | Ssat rel 8.99e-12 | SCS rel 1.13e-16 | Var(c) rel 2.78e-16   [0.2s]
//       z=19: Ssup(nP) 60.038210 vs 60.038210 rel 4.92e-11 | Ssat rel 7.05e-12 | SCS rel 5.54e-16 | Var(c) rel 1.49e-16   [0.6s]
//       z=23: Ssup(nP) 118.327993 vs 118.327993 rel 4.80e-11 | Ssat rel 5.99e-12 | SCS rel 1.19e-16 | Var(c) rel 0.00e+0   [2.4s]
//
//   (d) the spectral mean square from the SAME sweep against the repository's
//       INDEPENDENT O(N^2) divisor-pair meanSquare(). Attack 1 L3 says
//       <R^2>_H = sum_{e,a} |Theta_e(a)|^2 F_H(a/e); the sweep accumulates it as
//       sum of (G |sin(pi H a/e)|)^2, so a match validates the whole Theta path:
//       z=13 H=169: sweep 1.161265531  meanSquare() 1.161265531  rel 1.46e-10   [2.4s]
//       z=17 H=289: sweep 3.013047790  meanSquare() 3.013047790  rel 5.64e-11   [2.5s]
//       z=19 H=361: sweep 4.217260880  meanSquare() 4.217260880  rel 5.07e-11   [2.9s]
//       z=23 H=529: sweep 5.049384489  meanSquare() 5.049384488  rel 1.79e-10   [5.0s]
//       z=29 H=841: sweep 6.769446539  meanSquare() 6.769446539  rel 8.72e-11   [14.9s]
//
//   (e) attack 1 sec.5 published H_sup = 198, 683, 1833, 4278 and
//       u_sup = 2.0617, 2.3036, 2.5518, 2.6666 at z = 13, 17, 19, 23.
//       Reproduced here by grid-then-every-integer, the protocol it used:
//       z=13: H_sup = 198 (attack 1: 198)  u_sup = 2.0617   CONFIRMED   [14.9s]
//       z=17: H_sup = 683 (attack 1: 683)  u_sup = 2.3036   CONFIRMED   [14.9s]
//       z=19: H_sup = 1833 (attack 1: 1833)  u_sup = 2.5518   CONFIRMED   [15.6s]
//       z=23: H_sup = 4278 (attack 1: 4278)  u_sup = 2.6666   CONFIRMED   [23.0s]
//
//   (f) IS THE PREDICATE AN UP-SET IN H? Both attack 1's protocol and this file's
//       report the first GRID point at which H*M > Ssup(H), refining the last gap
//       where that is affordable. That equals the true minimum only if closure is
//       monotone in H. Below, EVERY integer H from 8 to 2*H_sup is tested at the
//       three levels where exhaustion is affordable. H_min is the true minimum of
//       the instrument; the overshoot of the published/protocol value is the bias
//       carried by every grid row of S3, and it is one-signed (upward).
//       z    H_min   H_sup(protocol)   overshoot   u(H_min)  u(H_sup)  d u    later failures
//       13     198             198      0.00%   2.0617   2.0617  0.0000       0   UP-SET   [23.0s]
//       17     659             683      3.64%   2.2909   2.3036  0.0126      21   NOT AN UP-SET   [23.4s]
//       19    1833            1833      0.00%   2.5518   2.5518  0.0000       0   UP-SET   [38.0s]
//       So closure is NOT monotone in H, and the grid protocol overshoots the true
//       minimum by a small one-signed amount. Every u_sup in S3 is therefore an
//       UPPER estimate of the instrument's own best exponent. That bias works
//       AGAINST a plateau reading and FOR a divergence reading, so S4's verdict
//       must be read with it in mind, not against it.
//
// S1 FLOORS --- a bound that dips under the truth is a bug, not a win
//
//   Three floors, in decreasing order of how far up the ladder they reach.
//   (i)   Ssup(H) >= rms(R_H) at EVERY level, because Ssup is the l1 norm and
//         the mean square is the l2 norm of the SAME non-negative spectral terms.
//         It is automatic, so it is a wiring check, and it reaches z = 47.
//   (ii)  Ssup(nP) >= true sup_x |R| at z <= 23, from the exhaustive period walk.
//   (iii) u_sup >= u_true = ln(nP)/ln z at z <= 23, nP the exhaustive threshold.
//   Plus u_max = ln W/ln z, since R_W == 0 identically: a window approaching the
//   period degenerates and nothing may be read off there.
//
//   z    H=nP   Ssup(nP)     rms(R_nP)   true sup|R|   Ssup/sup   Ssup/rms   sup/rms   u_true   u_max   nP/W
//   13    60     11.4467      1.1949       2.6494       4.32       9.58      2.22  1.5963  3.0196  2.6e-2   [38.0s]
//   17   126     28.4118      1.4885       4.9203       5.77      19.09      3.31  1.7070  3.6390  4.2e-3   [38.1s]
//   19   198     60.0382      1.4478       6.8403       8.78      41.47      4.72  1.7960  4.4637  3.9e-4   [38.1s]
//   23   258    118.3280      1.7365       7.8157      15.14      68.14      4.50  1.7710  5.1308  2.7e-5   [38.3s]
//
//   WHAT ATTACK 1'S SOUNDNESS FLAG MEANS, AND WHY IT IS THE WHOLE POINT HERE.
//   Attack 1 sec.4(ii) found its mean-square exponent u_1 sitting BELOW beta_2 at
//   z = 13, 17, 19, 23 and crossing at z = 29, and refused to call that a result:
//   u_1 = theta(z)/(2 ln z) + 1.45 DIVERGES, so "below beta_2" at toy z says only
//   that theta(z)/(2 ln z) has not got there yet. The crossing landed exactly where
//   the law puts it (theta/(2 ln z) passes beta_2 - 1.45 = 2.8165 between z = 23 and
//   29), which is what proved it was a law and not a coincidence.
//   u_sup is in EXACTLY the same position: four points below beta_2 prove nothing
//   unless the shape is known. Attack 1's own endpoint fit for it has the SAME
//   divergent shape, u_sup = 0.2865 theta(z)/ln z + 1.197, just with a smaller
//   constant. S4 is the test of that shape, and it is the deliverable of this file.
//
// S2 COST --- what each level costs, before any of it is spent
//
//   #(e,a) is the exact size of the spectral sum: sum over e | P(z) that actually
//   occur, of phi(e). "term-by-term" is what lemmaV-parseval.js would pay,
//   sum_e phi(e) 2^omega(e), with a cos and a sin at every one of them.
//
//   z    N(terms)  #recs   max e        #(e,a)      term-by-term  saving   plan
//   13      852     31  2.310e+3  2.3090e+3  1.3903e+4    6.0x  u_sup + u_sat   [38.3s]
//   17     2236     63  3.003e+4  3.0029e+4  2.8369e+5    9.4x  u_sup + u_sat   [38.3s]
//   19     4764    127  5.105e+5  5.1051e+5  3.6742e+6    7.2x  u_sup + u_sat   [38.3s]
//   23     9636    243  8.818e+5  2.6494e+6  1.7493e+7    6.6x  u_sup + u_sat   [38.3s]
//   29    20700    448  3.432e+6  1.7193e+7  9.1850e+7    5.3x  u_sup + u_sat   [38.3s]
//   31    35868    763  9.700e+6  6.0577e+7  3.4427e+8    5.7x  u_sup + u_sat   [38.5s]
//   37    76484   1494  3.187e+7  5.2512e+8  3.9789e+9    7.6x  u_sup + u_sat   [39.0s]
//   41   125884   2501  7.328e+7  1.7951e+9  1.3648e+10    7.6x  u_sup + u_sat   [40.0s]
//   43   183084   3814  8.365e+7  3.7441e+9  2.8070e+10    7.5x  u_sup + u_sat   [41.7s]
//   47   293980   6035  2.231e+8  1.0915e+10  8.5411e+10    7.8x  u_sat only (H-scan too dear)   [45.3s]
//
// S3 THE LADDER --- u_sup and u_sat as far as the machine reaches
//
//   Both exponents are LEGAL unconditional worst-position statements at each z:
//   H*M > Ssup(H) and a fortiori H*M > Ssat put T(x) > 0 at EVERY position, with
//   no maximal law and no averaging. u_sat is the H-free one and is an upper bound
//   for u_sup by construction. beta_2 = 4.26645.
//
//   built z=13  #(e,a)=2.309e+3  u_sat=2.2850  u_sup=2.0617 [2.0598,2.0617] exact   [45.3s]
//   built z=17  #(e,a)=3.003e+4  u_sat=2.4623  u_sup=2.3036 [2.3030,2.3036] exact   [45.3s]
//   built z=19  #(e,a)=5.105e+5  u_sat=2.7228  u_sup=2.5518 [2.5516,2.5518] exact   [46.1s]
//   built z=23  #(e,a)=2.649e+6  u_sat=2.8281  u_sup=2.6666 [2.6666,2.6666] exact   [53.5s]
//   built z=29  #(e,a)=1.719e+7  u_sat=2.8827  u_sup=2.7464 [2.7198,2.7464]   [58.1s]
//   built z=31  #(e,a)=6.058e+7  u_sat=3.0259  u_sup=2.8924 [2.8662,2.8924]   [73.6s]
//   built z=37  #(e,a)=5.251e+8  u_sat=3.1644  u_sup=3.0125 [2.9876,3.0125]   [205.1s]
//   built z=41  #(e,a)=1.795e+9  u_sat=3.2543  u_sup=3.1103 [3.0750,3.1103]   [524.6s]
//   built z=43  #(e,a)=3.744e+9  u_sat=3.3448  u_sup=3.2026 [3.1678,3.2026]   [1178.3s]
//   built z=47  #(e,a)=1.091e+10  u_sat=3.4306   [1289.4s]
//
//   z    #(e,a)     Ssat        u_sat    H_sup     u_sup [bracket]        u_sat-u_sup  0.51/ln z   u_max    H_sup/W
//   13  2.309e+3  1.9602e+1  2.2850       198  2.0617 [2.0598,2.0617] exact   0.2232     0.1988   3.020   8.6e-2
//   17  3.003e+4  5.0314e+1  2.4623       683  2.3036 [2.3030,2.3036] exact   0.1587     0.1800   3.639   2.3e-2
//   19  5.105e+5  1.2006e+2  2.7228      1833  2.5518 [2.5516,2.5518] exact   0.1709     0.1732   4.464   3.6e-3
//   23  2.649e+6  2.4250e+2  2.8281      4278  2.6666 [2.6666,2.6666] exact   0.1614     0.1627   5.131   4.4e-4
//   29  1.719e+7  5.2311e+2  2.8827     10384  2.7464 [2.7198,2.7464]         0.1362     0.1515   5.709   4.7e-5
//   31  6.058e+7  9.5263e+2  3.0259     20586  2.8924 [2.8662,2.8924]         0.1336     0.1485   6.578   3.2e-6
//   37  5.251e+8  2.5727e+3  3.1644     52989  3.0125 [2.9876,3.0125]         0.1519     0.1412   7.207   2.6e-7
//   41  1.795e+9  4.6495e+3  3.2543    103823  3.1103 [3.0750,3.1103]         0.1440     0.1373   7.980   1.4e-8
//   43  3.744e+9  7.1072e+3  3.3448    170378  3.2026 [3.1678,3.2026]         0.1421     0.1356   8.867   5.6e-10
//   47  1.091e+10  1.2623e+4  3.4306      --        --                        --        0.1325   9.639      --
//
//   The two exponents differ by ln(Ssat/Ssup(H_sup))/ln z, and the column beside it
//   is 0.51/ln z, the prediction from Ssup(H_sup)/Ssat being flat near 0.6: they
//   CONVERGE as z grows, so u_sat is a faithful and cheaper stand-in at large z.
//
//   Increments, which is the form the plateau question actually takes:
//   step        d u_sup   d u_sat   d ln z    d(th/ln z)   du_sup/dlnz   du_sup/d(th/lnz)
//   13 -> 17    0.2418    0.1773   0.2683     0.6194       0.901          0.390
//   17 -> 19    0.2483    0.2605   0.1112     0.8248       2.232          0.301
//   19 -> 23    0.1148    0.1053   0.1911     0.6671       0.601          0.172
//   23 -> 29    0.0798    0.0546   0.2318     0.5780       0.344          0.138
//   29 -> 31    0.1459    0.1433   0.0667     0.8697       2.188          0.168
//   31 -> 37    0.1201    0.1384   0.1769     0.6287       0.679          0.191
//   37 -> 41    0.0978    0.0899   0.1027     0.7731       0.953          0.127
//   41 -> 43    0.0923    0.0905   0.0476     0.8863       1.938          0.104
//   43 -> 47      --      0.0858   0.0889     0.7721        --             --
//
//   TIGHTNESS. Ssup(H) against the rms of the same field at the same H (exact,
//   from the spectral mean square in the same sweep). sup|R| >= rms always, so
//   Ssup/rms is an upper bound for the loss, measurable at EVERY level; at z <= 23
//   S1 splits it into Ssup/sup times sup/rms. sqrt(2 ln W) is the maximal-law size
//   of sup/rms, so Ssup/rms growing faster than that means the BOUND is loosening.
//   z    H_sup    Ssup(H_sup)   rms(R_Hsup)   Ssup/rms   sqrt(2 lnW)   ratio
//   13      198       10.4063        0.8006      13.00         3.936   3.30
//   17      683       32.0666        2.2635      14.17         4.541   3.12
//   19     1833       72.5791        2.7877      26.04         5.127   5.08
//   23     4278      146.1371        3.3467      43.67         5.672   7.70
//   29    10384      309.6710        4.2195      73.39         6.200   11.84
//   31    20586      563.0990        5.4216     103.86         6.722   15.45
//   37    52989     1459.4064        8.4046     173.64         7.214   24.07
//   41   103823     2644.7690       10.1577     260.37         7.699   33.82
//   43   170378     4096.3370       13.2210     309.84         8.167   37.94
//
// S4 THE TREND --- plateau, slow divergence, or undetermined
//
//
//   u_sup  (9 points, z = 13, 17, 19, 23, 29, 31, 37, 41, 43)
//   model                    a          b        RSS        max|res|   crosses beta_2 at z
//   constant  u = c          0.00000   2.72756    1.14e+0     0.6658   never (constant)
//   u = a ln z + b           0.89093  -0.17935    2.57e-2     0.1079   146.9
//   u = a lnln z + b         2.81952  -0.58524    2.34e-2     0.0922   267.4
//   u = a th(z)/ln z + c     0.18687   1.63550    4.31e-2     0.1380   73.0
//   u = A - B/ln z          -8.78899   5.46353    2.72e-2     0.1070   bounded, A = 5.4635; 1543.9
//   leave-one-out bands on the crossing (refit dropping each level in turn):
//     u = a ln z + b         [141.1, 157.9]
//     u = a lnln z + b       [252.9, 296.5]
//     u = a th(z)/ln z + c   [71.0, 79.0]
//     u = A - B/ln z         [1189.4, 2437.9]
//   the same models on the TOP 5 levels only (z = 29, 31, 37, 41, 43):
//     constant  u = c        a=  0.00000 b=  2.99285 RSS=1.29e-1   never
//     u = a ln z + b         a=  1.02743 b= -0.68267 RSS=4.29e-3   123.6
//     u = a lnln z + b       a=  3.65749 b= -1.66571 RSS=4.27e-3   158.0
//     u = a th(z)/ln z + c   a=  0.14588 b=  1.93254 RSS=1.90e-3   89.0
//     u = A - B/ln z         a=-13.00565 b=  6.63515 RSS=4.27e-3   A = 6.6351; 242.4
//   profile over the asymptote in the bounded family u = A - B/ln z:
//     A          best B     RSS         RSS/RSS_min   verdict at beta_2 = 4.26645
//      3.00000     1.0036  9.136e-1       33.62    the bound would stay under beta_2
//      3.50000     2.5837  5.903e-1       21.72    the bound would stay under beta_2
//      4.00000     4.1639  3.400e-1       12.51    the bound would stay under beta_2
//      4.26645     5.0059  2.365e-1        8.70    the bound would stay under beta_2
//      4.50000     5.7440  1.628e-1        5.99    the bound would cross beta_2
//      5.00000     7.3241  5.856e-2        2.15    the bound would cross beta_2
//      6.00000    10.4844  6.922e-2        2.55    the bound would cross beta_2
//      8.00000    16.8049  9.669e-1       35.58    the bound would cross beta_2
//      5.46364     8.7894  2.718e-2        1.00    best-fitting asymptote
//
//   u_sat  (the H-free bound; an upper bound for u_sup at every z)  (10 points, z = 13, 17, 19, 23, 29, 31, 37, 41, 43, 47)
//   model                    a          b        RSS        max|res|   crosses beta_2 at z
//   constant  u = c          0.00000   2.94007    1.28e+0     0.6551   never (constant)
//   u = a ln z + b           0.85489   0.10053    2.97e-2     0.1051   130.7
//   u = a lnln z + b         2.72962  -0.31437    3.50e-2     0.1170   211.8
//   u = a th(z)/ln z + c     0.16730   1.89894    4.06e-2     0.1191   73.0
//   u = A - B/ln z          -8.57390   5.56487    4.77e-2     0.1360   bounded, A = 5.5649; 737.6
//   leave-one-out bands on the crossing (refit dropping each level in turn):
//     u = a ln z + b         [126.2, 135.5]
//     u = a lnln z + b       [198.8, 233.5]
//     u = a th(z)/ln z + c   [73.0, 79.0]
//     u = A - B/ln z         [499.7, 1049.9]
//   the same models on the TOP 5 levels only (z = 31, 37, 41, 43, 47):
//     constant  u = c        a=  0.00000 b=  3.24399 RSS=9.90e-2   never
//     u = a ln z + b         a=  0.97684 b= -0.34489 RSS=1.85e-3   112.2
//     u = a lnln z + b       a=  3.53974 b= -1.35947 RSS=2.26e-3   134.4
//     u = a th(z)/ln z + c   a=  0.12618 b=  2.22774 RSS=2.32e-3   89.0
//     u = A - B/ln z         a=-12.80673 b=  6.73518 RSS=2.71e-3   A = 6.7352; 179.0
//   profile over the asymptote in the bounded family u = A - B/ln z:
//     A          best B     RSS         RSS/RSS_min   verdict at beta_2 = 4.26645
//      3.00000     0.3431  1.205e+0       25.25    the bound would stay under beta_2
//      3.50000     1.9477  7.977e-1       16.72    the bound would stay under beta_2
//      4.00000     3.5522  4.785e-1       10.03    the bound would stay under beta_2
//      4.26645     4.4072  3.443e-1        7.21    the bound would stay under beta_2
//      4.50000     5.1567  2.472e-1        5.18    the bound would cross beta_2
//      5.00000     6.7612  1.039e-1        2.18    the bound would cross beta_2
//      6.00000     9.9703  8.103e-2        1.70    the bound would cross beta_2
//      8.00000    16.3883  1.091e+0       22.86    the bound would cross beta_2
//      5.56460     8.5730  4.772e-2        1.00    best-fitting asymptote
//
//   ATTACK 1'S OWN ENDPOINT FIT, EXTENDED AND CHECKED.
//   It fitted u_sup = alpha theta(z)/ln z + c to the z = 13 and z = 23 endpoints,
//   got alpha = 0.2865, c = 1.197, and said it "would cross beta_2 near z = 45".
//   z     theta(z)/ln z   that fit predicts   measured u_sup   residual
//   13       3.0196          2.0621           2.0617      -0.0004
//   17       3.6390          2.2396           2.3036       0.0640
//   19       4.4637          2.4759           2.5518       0.0760
//   23       5.1308          2.6670           2.6666      -0.0003
//   29       5.7088          2.8326           2.7464      -0.0861
//   31       6.5785          3.0817           2.8924      -0.1894
//   37       7.2071          3.2618           3.0125      -0.2494
//   41       7.9803          3.4833           3.1103      -0.3730
//   43       8.8666          3.7373           3.2026      -0.5346
//   47       9.6386          3.9585           --           --
//   That fit needs theta(z)/ln z = 10.7136 to reach beta_2, which first happens at
//   z = 59, NOT z = 45 (there theta(z)/ln z = 9.7487, giving u = 3.9900).
//   So attack 1 sec.5(c) and its READING 6 put their own fit's crossing 24 percent
//   low in z. A small slip, corrected here; the shape claim is unaffected, and
//   the residual column above is the finding that actually bears on it.
//
// S5 THE TWO REPRESENTATIONS --- attack 2's ceiling against attack 1's 80x
//
//   sift-limit-attack.md sec.7b (attack 2) measured sum|r| reaching 0.978 of the
//   trivial pair-count bound at a CRT-constructed worst position and concluded
//   "theta_total <= 1 is a genuine ceiling on any absolute-value method". Attack 1
//   sec.5(a) answered that the ceiling is on the divisor-pair REPRESENTATION: the
//   same absolute-value step in the Fourier basis is 74x to 81x smaller.
//   The clean comparison is between the two H-FREE absolute-value bounds:
//     divisor-pair basis  sup|R| <= sum_i |w_i| |Delta_i| <= N, the term count;
//     Fourier basis       sup|R| <= Ssat.
//   Both are what taking absolute values gives, with no H in either.
//
//   z     N        Ssat        N/Ssat    Ssup(nP)   N/Ssup(nP)   Var(c)      SCS/Ssat
//   13     852  1.9602e+1     43.5    11.4467        74     5.792e-2   4.26e+0
//   17    2236  5.0314e+1     44.4    28.4118        79     4.984e-2   1.00e+1
//   19    4764  1.2006e+2     39.7    60.0382        79     4.652e-2   2.05e+1
//   23    9636  2.4250e+2     39.7   118.3280        81     4.328e-2   3.14e+1
//   29   20700  5.2311e+2     39.6     --        --       3.878e-2   4.82e+1
//   31   35868  9.5263e+2     37.7     --        --       3.665e-2   6.62e+1
//   37   76484  2.5727e+3     29.7     --        --       3.365e-2   1.35e+2
//   41  125884  4.6495e+3     27.1     --        --       3.237e-2   1.87e+2
//   43  183084  7.1072e+3     25.8     --        --       3.148e-2   2.13e+2
//   47  293980  1.2623e+4     23.3     --        --       3.040e-2   2.79e+2
//
//   The SCS column is attack 1's Cauchy-Schwarz relaxation of Ssat, kept here
//   because its ratio to Ssat is the one number in the chain that was clearly
//   DIVERGING at four levels (4.26, 10.0, 20.5, 31.4). Whether it keeps doubling
//   decides whether the L2 target is dead or merely lossy.
//
// S6 s-ROBUSTNESS --- is the trend an artifact of the level s = 3.0?
//
//   u_sat = ln(Ssat/M)/ln z at three levels s. The vector sieve needs s > 1+sqrt(e)
//   = 2.6487 for the main term to be asymptotically positive, so s = 2.6 sits just
//   BELOW the threshold and is included only as a stress test of the shape, not as
//   a usable level; 3.0 is attack 1's and 3.4 is well inside. If the z-trend has
//   the same shape at all three, the trend is not an artifact of s.
//
//   z     s=2.6     s=3.0     s=3.4
//   13    2.4875    2.2850    2.3298   [1289.5s]
//   17    2.5134    2.4623    2.4187   [1289.5s]
//   19    2.6452    2.7228    2.6954   [1289.5s]
//   23    2.7727    2.8281    2.9145   [1289.8s]
//   29    2.8012    2.8827    3.0049   [1291.9s]
//   31    2.9664    3.0259    3.1924   [1303.3s]
//   fit u_sat = a theta(z)/ln z + c at each s:
//     s=2.6: a = 0.13794, c = 2.04159, RSS = 3.54e-3
//     s=3: a = 0.20596, c = 1.72140, RSS = 1.54e-2
//     s=3.4: a = 0.25537, c = 1.54454, RSS = 7.96e-3
//
// DONE 1303.3s
// ============================================================================
// READINGS (honestly calibrated)
// ============================================================================
// 1. THE VERDICT, AND IT IS NOT THE ONE EITHER SIDE WANTED. u_sup RISES at every
//    added level, 2.0617 to 3.2026 over z = 13 to 43. A strict plateau is
//    rejected (RSS 49x the best model). Attack 1's theta(z)/ln z shape is
//    rejected too, in the conservative direction, its residuals reaching -0.535.
//    The truth sits between a ln z and a lnln z, which is precisely the region
//    where nine points cannot choose. NOBODY SHOULD QUOTE A CROSSING z FROM THIS
//    FILE: the models cross beta_2 at 73, 147, 267 and 1544 and fit equally
//    well. The interval is the result.
//
// 2. AND THE ANSWER TO THE ACTUAL QUESTION IS SHARPER THAN "UNDETERMINED".
//    "Does u_sup stay below beta_2" does NOT need the crossing point. The
//    bounded family u = A - B/ln z fits as well as anything and its best
//    asymptote is 5.4635, ABOVE beta_2; forcing the asymptote to beta_2 costs
//    8.70x in RSS. Model-free, u_sat converges to d ln Ssat/d ln z, measured at
//    4.987 over ten levels and 6.197 over the top five, above beta_2 in every
//    window and rising. So: if it plateaus, it plateaus above beta_2. Plateau
//    and divergence are the SAME verdict for this route.
//
// 3. THE MECHANISM OUTRANKS THE EXTRAPOLATION, AND IT IS THE PRICE OF HAVING NO
//    QUANTIFIER PROBLEM. Ssat grows by 2.05 per added prime (geometric mean over
//    nine steps; 2.27 over the first four, 1.91 over the last four, so the
//    decline is real and slow). With M log^2 z flat in [0.336, 0.377], a fixed
//    per-prime factor C > 1 forces u_sat ~ (ln C) pi(z)/ln z, which diverges.
//    The step that costs it is exactly the step that removes the position x:
//    |e(ax/e)| = 1 discards x for free, and taking absolute values in a discards
//    every cancellation among phi(e) frequencies across 2^pi(z) moduli. Keeping
//    the phase to recover that cancellation puts x back and makes the estimate
//    uniform-in-x. Mean value or maximal inequality: this route must pick one,
//    and neither finishes. That dichotomy is MEASURED here, not argued.
//
// 4. THE TWO REPRESENTATIONS, RESOLVED. Attack 1 wins on the constant and
//    sift-limit-attack.md sec.7b wins on the rate. The Fourier basis is 23x to
//    44x below the divisor-pair term count H-free, so sec.7b's 0.978 is a fact
//    about the divisor-pair representation, not the problem. But the ratio FALLS
//    (44.4 -> 23.3) rather than staying flat, and the two losses against the true
//    sup grow at nearly the same rate (1.52x against 1.56x per added prime). A
//    better constant, not a better rate, and the rate sets the exponent.
//
// 5. CUSTODY, AND ONE DEFECT IN THE PROTOCOL ITSELF. Six reproductions pass,
//    including the spectral mean square against the repository's independent
//    O(N^2) divisor-pair computation. But closure is NOT an up-set in H: at
//    z = 17 the true minimum is 659 and the published grid answer is 683, with
//    21 later failures. Every u_sup in this corpus is an UPPER estimate, by
//    0.0126 in u where that is measurable. The bias is one-signed and works
//    AGAINST a plateau reading, so it does not rescue one.
//
// 6. HONEST LIMITS. (a) Nine points over a factor 3.3 in z, extrapolated one to
//    three orders of magnitude. (b) pi(z) and ln^2 z agree to 9 percent at
//    z = 43 and part company only past z ~ 60, which is exactly why the models
//    cannot be separated; separating them needs z ~ 200, about 1e17 spectral
//    points. BRUTE FORCE CANNOT SETTLE THIS. (c) The per-prime factor of Ssat is
//    declining (2.27 -> 1.91) and nine steps cannot see whether it reaches 1.
//    (d) True sup|R| is known only to z = 23; above that the only floor is the
//    exact rms from the same sweep. (e) u_sup at s = 3.0 only. (f) No claim here
//    is a bound below beta_2 that survives z -> infinity, and no floor at 4 is
//    invoked anywhere.
//
// Context notes carried out of the pre-embed OUTPUT block (2026-08-19):
//
// S0 CUSTODY. The fast |sin(pi t)| has worst RELATIVE error 6.63e-10 against
//   Math.sin over 2.4e6 arguments. The PEELED Theta_e(a) against
//   lemmaV-parseval.js's own term-by-term factorisation sum: worst difference
//   1.96e-17 / 1.64e-17 / 1.25e-17 / 9.22e-18 at z = 13/17/19/23, and zero
//   CRT-weight mismatches. Against supBoundTable(): Ssup rel 4.8e-11 or better,
//   Ssat rel 1.1e-11 or better, SCS and Var(c) at machine epsilon. The spectral
//   mean square against the repository's INDEPENDENT O(N^2) divisor-pair
//   meanSquare(): rel 1.8e-10 or better at z = 13, 17, 19, 23, 29 — the
//   strongest item, because it validates the whole Theta path from the other
//   basis. Attack 1's H_sup = 198 / 683 / 1833 / 4278 and u_sup = 2.0617 /
//   2.3036 / 2.5518 / 2.6666 CONFIRMED at all four.
//   AND ONE NEW FACT: closure is NOT an up-set in H. Testing every integer H
//   from 8 to 2*H_sup, the true minimum is 198 / 659 / 1833 at z = 13/17/19, so
//   the published 683 at z = 17 overshoots by 3.64 percent (0.0126 in u) and
//   closure fails again at 21 larger H. Every u_sup quoted anywhere in this
//   corpus is therefore an UPPER estimate of the instrument's own best exponent.
//
// S1 FLOORS. Ssup(nP) / true sup|R| = 4.32, 5.77, 8.78, 15.14 (attack 1's
//   tightness column, reproduced) and never below 1: the bound never dips under
//   the truth. Ssup(nP)/rms = 9.58, 19.09, 41.47, 68.14 with sup/rms = 2.22,
//   3.31, 4.72, 4.50. u_sup clears the exhaustive u_true by 0.47 to 0.90.
//   nP/W runs 2.6e-2 down to 2.7e-5 and u_max stays above u_sup everywhere, so
//   no row sits near the degeneracy R_W == 0.
//
// S2 COST. #(e,a) = 2.3e3 to 1.09e10 at z = 13 to 47, against the term-by-term
//   1.4e4 to 8.5e10: the peel saves 5.3x to 7.8x in COUNT and much more in time,
//   since (P1) turns every cos/sin pair into a lookup in a table of size p <= z.
//   max e is 3.432e6 at z = 29, not P(29) = 2.23e8, because e | [d1,d2] with both
//   d1, d2 <= z^s. Attack 1's "prod(2p-1) = 7.8e10 evaluations, an overnight run
//   as written" for z = 29 over-prices its own next step by about 550x, which is
//   why the ladder stopped at 23.
//
// S3 THE LADDER.  u_sup = 2.0617, 2.3036, 2.5518, 2.6666, 2.7464, 2.8924,
//   3.0125, 3.1103, 3.2026 at z = 13, 17, 19, 23, 29, 31, 37, 41, 43, and
//   u_sat = 2.2850, 2.4623, 2.7228, 2.8281, 2.8827, 3.0259, 3.1644, 3.2543,
//   3.3448, 3.4306 out to z = 47. RISING at every one of the eight steps.
//   H_sup = 198, 683, 1833, 4278, 10384, 20586, 52989, 103823, 170378, i.e. at
//   z = 43 every window of 170,378 consecutive integers holds an r with r and
//   r+2 both 43-rough, unconditionally. u_sat - u_sup falls 0.2232 to 0.1421
//   against the prediction 0.51/ln z, since Ssup(H_sup)/Ssat is flat near 0.58
//   (2/pi = 0.6366 would be equidistribution). H_sup/W falls to 5.6e-10 and
//   u_max exceeds u_sup by 1.0 to 5.7 everywhere: no row is degenerate.
//   TIGHTNESS, which is the mechanism: Ssup(H_sup)/rms = 13.0, 14.2, 26.0, 43.7,
//   73.4, 103.9, 173.6, 260.4, 309.8, against sqrt(2 lnW) = 3.94 to 8.17. The
//   quotient — 3.30, 3.12, 5.08, 7.70, 11.84, 15.45, 24.07, 33.82, 37.94 — is
//   the part of the loss the field's own extreme-value behaviour does not
//   explain, and it grows about 1.35x per added prime. The BOUND is loosening;
//   the truth is not moving.
//
// S4 THE TREND.  The constant model is dead: RSS 1.14 against 2.34e-2 for the
//   best, max residual 0.666. Attack 1's own theta(z)/ln z endpoint fit is dead
//   too, and in the CONSERVATIVE direction: its residuals go -0.086, -0.189,
//   -0.249, -0.373, -0.535 at the five new levels, monotonically negative. The
//   four rising models are statistically indistinguishable (RSS 2.34e-2,
//   2.57e-2, 2.72e-2, 4.31e-2) and cross beta_2 at z = 267, 147, 1544, 73 with
//   leave-one-out bands [253,297], [141,158], [1189,2438], [71,79]. EVERY ONE
//   CROSSES. The decisive test is the profile over the asymptote in the bounded
//   family u = A - B/ln z: the best-fitting limit is A = 5.4635 for u_sup and
//   5.5649 for u_sat, and forcing A down to beta_2 costs 8.70x and 7.21x in RSS
//   (to 4.00, 12.5x; to 3.50, 21.7x). So if this instrument plateaus it plateaus
//   ABOVE beta_2. The model-free version agrees: d ln Ssat/d ln z = 4.987 over
//   all ten levels and 6.197 over the top five, and the cumulative slope from
//   each start to z = 47 reads 5.03, 5.43, 5.14, 5.53, 6.59, 6.21, 6.65, 7.31,
//   6.46 — above beta_2 in every window, and rising. Attack 1's fit needs
//   theta(z)/ln z = 10.7136 for beta_2, first at z = 59 rather than its stated
//   z = 45 (where the same fit gives 3.9900).
//
// S5 REPRESENTATIONS.  The H-free comparison is N against Ssat, and N/Ssat =
//   43.5, 44.4, 39.7, 39.7, 39.6, 37.7, 29.7, 27.1, 25.8, 23.3 at z = 13..47:
//   large, and FALLING by a factor 1.9 across the range. Attack 1's 74/79/79/81
//   is reproduced but it was measured at H = nP, a window that moves with z; the
//   H-free ratio is not flat, so the word "flat" does not survive. The rate is
//   what decides the exponent, and at z = 13..23 the two losses against the true
//   sup|R| grow at nearly the SAME rate: Ssup(nP)/sup = 4.32, 5.77, 8.78, 15.14
//   (1.52x per added prime) against N/sup = 322, 454, 697, 1233 (1.56x). The
//   change of basis buys a constant of 30 to 80, not a better rate. Var(c) falls
//   5.792e-2 to 3.040e-2; SCS/Ssat runs 4.26 to 279, 1.60x per step overall but
//   1.20x over the last four, so the L2 relaxation is decelerating and still
//   hopeless.
//
// S6 s-ROBUSTNESS.  u_sat rises in z at all three levels s = 2.6, 3.0, 3.4, with
//   fitted slope in theta(z)/ln z of 0.13794, 0.20596, 0.25537 (c = 2.04159,
//   1.72140, 1.54454). s = 2.6 sits just below 1+sqrt(e) = 2.6487 and is a
//   stress test only; even there the slope is positive. No usable s flattens the
//   trend.
// ============================================================================

// ============================================================================
// CORRECTION, 2026-08-19, appended below the tail so the embed fingerprint is
// untouched (this text is READINGS; it is not part of the hashed block above).
//
// READING 2 ABOVE IS NARROWED. Its sentence "if it plateaus, it plateaus above
// beta_2" rests on the bounded family u = A - B/ln z, whose best asymptote is
// 5.4635 and which costs 8.70x in RSS when forced to beta_2. That argument is
// FAMILY-DEPENDENT and was retired on 2026-08-19: the better-fitting bounded
// family u = A - B/pi(z) lands BELOW beta_2, and pi(z) is the natural abscissa
// for a mechanism that prices one added prime at a time. Asymptote fits now
// carry no weight in either direction.
//
// WHAT THE CLOSURE RESTS ON INSTEAD is reading 3's mechanism, which is measured
// and not fitted: Ssat grows by a flat factor of about 2.05 per added prime, so
// with M log^2 z flat, u_sat grows like pi(z)/ln z and diverges. The model-free
// derivative d ln Ssat / d ln z carries the same verdict. Nothing in reading 2's
// second half changes, and the route stays closed; what changes is which of the
// two arguments is load-bearing.
//
// On record in research/history/CHANGELOG.md, the 2026-08-19 second-pass block,
// section "u_sup: the bounded-asymptote argument retired as family-dependent",
// which also names sift-limit-attack.md sec.7e and TODO.md item B as the sites
// already carrying the narrowed form. The per-prime factors 2.05, 2.27 and 1.91
// and the derivative values 4.987 and 6.197 quoted in readings 2, 3 and 6 come
// from the fuller tables in research/history/staging/lemmaV-sup-extension.md,
// not from the block above, which is why the backlog advisory lists them as
// untraceable.
// ============================================================================

// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure above that the OUTPUT block does not contain verbatim actually is.
// No number above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   -0.5346 -> -0.535     146.9 -> 147        1543.9 -> 1544
//   2.309e+3 -> 2.3e3     1.091e+10 -> 1.09e10
//   1.3903e+4 -> 1.4e4    8.5411e+10 -> 8.5e10
//   4.81e-11 -> 4.8e-11   1.14e-11 -> 1.1e-11   1.79e-10 -> 1.8e-10
//   0.6671 -> 0.666 (max residual of the constant model)
//   the tightness row Ssup(H_sup)/rms 13.00, 14.17, 26.0x, 43.67, 73.39,
//     103.86, 173.64, 260.37, 309.84 -> 13.0, 14.2, 26.0, 43.7, 73.4, 103.9,
//     173.6, 260.4, 309.8, and sqrt(2 lnW) 3.936..8.167 -> 3.94 to 8.17.
//   the leave-one-out bands, which are printed with a decimal and quoted as
//     integers: [252.9, 296.5] -> [253,297], [141.1, 157.9] -> [141,158],
//     [1189.4, 2437.9] -> [1189,2438], [71.0, 79.0] -> [71,79]. Those four
//     also trip the tokenizer, which reads "253,297" as one figure — the same
//     comma-inside-a-number class recorded in qc/tailfmt.js on 2026-08-19.
//
// DERIVED IN THIS READING by arithmetic over printed columns (inputs printed,
// results not):
//   N/sup = 322, 454, 697, 1233 (the printed N column over the printed true
//     sup|R| column), and with it the 1.52x and 1.56x per-added-prime rates,
//     which are the cube roots of 15.14/4.32 and 1233/322.
//   0.47 to 0.90 — u_sup minus the printed u_true column.
//   M log^2 z flat in [0.336, 0.377], from the printed M.
//
// BORROWED, with the source stated in the reading itself and verified here:
//   4.987, 6.197, the per-added-prime factors 2.05 / 2.27 / 1.91 (printed
//     there as 2.0516 / 2.2729 / 1.9079, so those three are roundings too) and
//     the cumulative-slope row 5.03, 5.43, 5.14, 5.53, 6.59, 6.21, 6.65, 7.31,
//     6.46 all come from research/history/staging/lemmaV-sup-extension.md
//     (its sections 5 and the per-prime table), which the correction block
//     above already says. Confirmed present there 2026-08-20. That report is
//     the record of a fuller run of THIS script; it is not an embedded OUTPUT,
//     so the custody is one step weaker than a script tail.
//   7.8e10 is ATTACK 1's figure, not one measured here: it is quoted from
//     research/history/staging/attack-beta2-01-lemmaV-meansquare.md, section 5
//     ("z = 29 needs prod(2p-1) = 7.8e10"), verified present there. The
//     reading is calling it wrong, which is its point.
//
// DEFINITION / LITERATURE constants: 2/pi = 0.6366 (the equidistribution
//   reference), beta_2 = 4.26645 (printed), 1+sqrt(e) = 2.6487.
//
// [UNTRACED — verify before quoting]:
//   1e17 spectral points at z ~ 200 — an order-of-magnitude estimate made in
//     the reading, not computed anywhere.
//   CORRECTED 2026-08-20 (mismatch adjudication #30): reading S2's P(29) read
//     6.5e8 and now reads 2.23e8. P(z) IS PINNED BY THE TABLE ABOVE, not by
//     guesswork: this file's spectral records come from
//     sift-limit-lemmaV.js's primesBelow(z), the primes STRICTLY below z, so
//     P(z) = prod_{p<z} p; and the S2 table's max-e column equals it exactly
//     at the first three levels -- 2.310e3 = 2310 = P(13), 3.003e4 = 30030 =
//     P(17), 5.105e5 = 510510 = P(19) -- which is what an e ranging over all
//     divisors of P(z) must do before the [d1,d2] cap bites. At z = 29 that
//     product is 2 x 3 x ... x 23 = 223,092,870 = 2.23e8 (recomputed here),
//     and the same prime set gives prod_{p<29}(2p-1) = 5.062e10, which is the
//     5.06e10 the staging report quotes beside it. Nothing in the corpus
//     produces 6.5e8; the nearest candidates are 29# = 6.47e9 (an
//     order-of-magnitude slip away) and the odd primorial to 29, 3.23e9. The
//     sentence's point was always safe -- 3.432e6 is far below every
//     candidate -- and is now 77x rather than 190x. The same figure is carried
//     in research/history/staging/lemmaV-sup-extension.md at lines 180 and
//     621; both are corrected.
// ---------------------------------------------------------------------------
