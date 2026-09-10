// ============================================================================
// varE-EXACT-LADDER-01 — TWO NEW EXACT LEVELS FOR THE DECOUPLING RATIO
// (x = 29, 31), THE MODEL'S BAND DECOMPOSITION BY CONDUCTOR SUM, AND THE
// PRICE OF THE LEVELS THAT ARE STILL OUT OF REACH
// ============================================================================
// THE QUESTION. `varE-spectral.md` leaves TWO steps open on the road from the
// exact comb variance to lim Var/E = Pr[GD(2) > 2] = 0.45546, and
// `redteam-0828-varE.md` sec.0 confirms both are open:
//
//   STEP 1  the theta = 2 decoupling replacement. `varE-theta2-step.md` prices
//           it exactly at x = 7..23 and stops there ("x = 29 is out of reach
//           for this method: L/6 = 1.1e9 array entries, roughly 35 GB").
//   STEP 2  the model's own limit theorem, whose `n <= L` conductor band
//           `varE-spectral.md` sec.4 states as O(1/ln W) and DOES NOT EVALUATE.
//
// This file does not attack either step. It supplies the two things a proof of
// them would have to agree with: two more exact levels of the step-1 error,
// and an exact size for every conductor band of step 2.
//
// SETTING. The diagonal window of `paper/variance-note.md` sec.7: L = W = x#,
// y = the largest prime <= sqrt(L), u = ln L/ln y (2.0847 at x = 7, 2.000x from
// x = 13; `redteam-0828-varE.md` sec.2). The comb A_5 keeps 11, 17 mod 30 and
// excludes {0,-2} mod p for 7 <= p <= y, so alpha_2 = alpha_3 = 1, alpha_5 = 2,
// alpha_p = p-2, and delta = prod alpha_p/p. Two objects, both exact:
//
//   X     = sum_{|h|<L} (1 - |h|/L)(W(h) - 1),   W(h) = prod_{p<=y} p rho_p(h)/alpha_p^2
//   X_dec = the same sum with W replaced by V(h) = C_y prod_{p|h, 7<=p<=y} (p-1)/(p-3)
//
// (both from `varE-theta2-step.md` sec.1, PROVEN there and re-checked in SEC 0
// below). delta*X is Var/E. X/X_dec and delta*(X - X_dec)*ln y are the price of
// step 1. SEC 0 recomputes theta2's six levels; SEC 1 adds x = 29 and 31.
//
// THE SECOND METHOD, and why it reaches one level further. Under the
// replacement the sum collapses to a single expectation over a random
// conductor (`varE-spectral.md` sec.3, PROVEN there):
//
//   delta*X_dec = E[ (n/L) {L/n} (1 - {L/n}) ],   p | n independently with
//   probability pi_p = (p - alpha_p)/(p - 1):  pi_2 = pi_3 = 1, pi_5 = 3/4,
//   pi_p = 2/(p-1) for 7 <= p <= y.  So n is always a multiple of 6.
//
// The statistic is 0 on n | L, is at most n/4L below L, and is exactly 1 - L/n
// above L. The band below L is a FINITE set — every conductor there is a
// squarefree y-smooth number <= L — so it is enumerable by depth-first descent
// over the primes with the running product as the state, which is the "sum
// over squarefree conductors rather than over positions" the brief asks for.
// The band above L is infinite, but it needs no enumeration:
//
//   E[1/n] = (1/6)(1 - pi_5 + pi_5/5) prod_{7<=p<=y}(1 - pi_p + pi_p/p)
//          = (1/6)(2/5) prod_{7<=p<=y}(p-2)/p = delta        EXACTLY,
//
// the dual of `varE-spectral` sec.3's E[n] = 1/delta, so
//
//   band(n > L) = (1 - P[n <= L]) - ( delta*L - L*E[(1/n) 1{n <= L}] ),
//
// and the two subtracted terms are the SAME descent's by-products. SEC 2 runs
// this and SEC 1's sieve on the same eight levels and requires them to agree.
// The descent costs ~0.0167 nodes per unit of L against the sieve's L/6
// positions, so it reaches x = 37 where the sieve does not.
//
// THE PRICE, computed before anything was started (Chris's 4-hour rule).
// `varE-theta2-step.js` ran x = 7..23 in 1.7 s on one core, and the segmented
// rewrite here measures 12.1 ns per k-position at x = 29, where a level's cost
// is (L/6) positions times sum_{7<=p<=y} 1/p sieve hits:
//
//   SEC 1  x = 29 : L/6 = 1.08e9 positions           -> 13 s    (measured 13 s)
//          x = 31 : L/6 = 3.34e10, 1.08x the hits    -> ~9 min  (measured 551 s)
//          x = 37 : L/6 = 1.24e12, 1.16x the hits    -> 6.1 h   DECLINED, > 4 h
//   SEC 2  x <= 31, descent to 4L: 1.11e10 nodes at 12.6 ns     -> ~2.5 min
//          x = 37,  descent to  L: 1.30e11 nodes at 12.6 ns     -> ~28 min
//          x = 37,  descent to 4L: 5.2e11 nodes                 -> 1.8 h, DECLINED
//          x = 41,  descent to  L: 5.3e12 nodes                 -> 19 h,  DECLINED
//   SEC 3  Monte Carlo, N = 1e8, two seeds, at x = 37 and 41     -> ~4 min
//
// So x = 37's ratio and x = 41's exact model value are NOT computed here, and
// the note says so rather than quoting a fit for them.
//
// WIDTH AUDIT.
//   * L <= 41# = 3.0425e14 < 2^53, and every conductor the descent enumerates
//     satisfies n <= 4L < 2^53, so products and comparisons are exact doubles.
//     The descent tests `n*p > bound` BEFORE pushing, so no product ever
//     exceeds 4L.
//   * L mod n is formed as L - n*floor(L/n) with an explicit +-n correction, so
//     a one-ulp division cannot move it; n*floor(L/n) <= L < 2^53 is exact.
//   * delta*L is a product of up to 198283 rationals and is needed to ~1e-16
//     RELATIVE, because band(n > L) subtracts it from a sum of the same size
//     (9.4e9 at x = 37) to leave 0.09. A double product accumulates ~5e-14
//     relative over that many factors, which would be a 4e-4 error in the band.
//     It is therefore formed EXACTLY, as a BigInt ratio (L/15)*prod(p-2)/prod p
//     shifted by 2^64 and rounded once. SEC 2 prints it against
//     `variance-note.md` sec.7's E[N_W] column.
//   * The conductor sums that feed that cancellation are Kahan-compensated, and
//     the residual floor is MEASURED rather than asserted: SEC 2 prints its
//     total against SEC 1's independent sieve at eight levels, and the gap
//     tracks about 6e-18 * L (1.2e-15 at x = 7, 4.2e-8 at x = 29). So the
//     x = 37 TOTAL carries roughly 5e-5 and is quoted to five decimals only,
//     which is the same order as SEC 3's Monte Carlo there and no better.
//     THE n < L BAND DOES NOT GO THROUGH THAT CANCELLATION. It is a sum of
//     positive terms with sum|terms| <= 0.013, so Kahan bounds its error by
//     3e-18 at every level, x = 37 included. That band is the exact number
//     this file is for; the total at x = 37 is a cross-check, not a headline.
//   * The sieve's four accumulators are Kahan-compensated per 65536-position
//     chunk and Kahan again over chunks; sum|terms| ~ 10*L/6 = 3.3e11 at x = 31
//     bounds the error by 7e-5 on X ~ 236, i.e. 3e-7 relative, well inside the
//     six figures printed.
//   * Monte Carlo uses sfc32 with fixed seeds, so SEC 3 is deterministic and
//     re-runs bit-identically.
// ============================================================================
'use strict';
const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1) + ' s';
let FAIL = 0;
function ck(tag, cond, detail) {
  if (!cond) { FAIL++; console.log('  ASSERT FAIL [' + tag + ']  ' + (detail || '')); }
  return cond;
}
function primesUpTo(n) { const s = new Uint8Array(n + 1), o = []; for (let i = 2; i <= n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } } return o; }
function inv6(p) { let r0 = 6 % p, r1 = p, s0 = 1, s1 = 0; while (r1) { const q = Math.floor(r0 / r1); [r0, r1] = [r1, r0 - q * r1]; [s0, s1] = [s1, s0 - q * s1]; } return ((s0 % p) + p) % p; }
class Kah { constructor() { this.s = 0; this.c = 0; } add(v) { const y = v - this.c, t = this.s + y; this.c = (t - this.s) - y; this.s = t; } get() { return this.s; } }

// ---------------------------------------------------------------------------
// THE LEVEL TABLE. L and y are the diagonal's own definition. `varE` columns
// are READ, not recomputed: X6/Xd6 from `varE-theta2-step.js` PART 0 (its
// embedded OUTPUT block), r from `paper/variance-note.md` sec.7's Var/E column,
// EN from the same table's E[N_W] column.
// ---------------------------------------------------------------------------
const LV = [
  { x: 7,  L: 210,             y: 13,      X6: 4.612929,   Xd6: 5.405185,   r: 0.1521, EN: 6.92 },
  { x: 11, L: 2310,            y: 47,      X6: 15.073187,  Xd6: 15.694986,  r: 0.2563, EN: 39.27 },
  { x: 13, L: 30030,           y: 173,     X6: 29.557928,  Xd6: 29.271013,  r: 0.2995, EN: 304.28 },
  { x: 17, L: 510510,          y: 709,     X6: 51.400255,  Xd6: 51.200849,  r: 0.3268, EN: 3245.51 },
  { x: 19, L: 9699690,         y: 3109,    X6: 81.289135,  Xd6: 81.171615,  r: 0.3473, EN: 41441.19 },
  { x: 23, L: 223092870,       y: 14929,   X6: 121.485245, Xd6: 121.326093, r: 0.3643, EN: 669028.80 },
  { x: 29, L: 6469693230,      y: 80429,   X6: null,       Xd6: null,       r: 0.3774, EN: 14063617.40 },
  { x: 31, L: 200560490130,    y: 447829,  X6: null,       Xd6: null,       r: 0.3876, EN: 328601798.62 },
  { x: 37, L: 7420738134810,   y: 2724079, X6: null,       Xd6: null,       r: 0.3958, EN: 9377228928.76 },
  { x: 41, L: 304250263527210, y: 17442769,X6: null,       Xd6: null,       r: null,   EN: null },
];
const BY = {}; for (const o of LV) BY[o.x] = o;

// ---------------------------------------------------------------------------
// THE SEGMENTED SIEVE. Same four multiplicative pieces as
// `varE-theta2-step.js`, on k = h/6, but in blocks of 2^17 positions with the
// next-hit index of every prime carried across blocks. Memory is 4 MB rather
// than 8*4*(L/6) bytes, which is the whole reason x = 29 and 31 are reachable.
// ---------------------------------------------------------------------------
const BLK = 1 << 17;
function sieveLevel(x) {
  const t0 = Date.now();
  const o = BY[x], L = o.L, y = o.y, KK = L / 6;
  const allp = primesUpTo(y), ps = allp.filter(p => p >= 7), np = ps.length;
  let delta = 1; for (const p of allp) { const a = (p === 2 || p === 3) ? 1 : (p === 5 ? 2 : p - 2); delta *= a / p; }
  let D = 1, C = 1, b1 = 1, b2 = 1;
  for (const p of ps) { const q = (p - 2) * (p - 2); D *= p * (p - 4) / q; C *= 1 - 2 / ((p - 1) * (p - 2)); b1 *= (q - 2) / q; b2 *= (q - 3) / q; }
  const PP_ = new Float64Array(np), AA = new Float64Array(np), BB = new Float64Array(np), CC = new Float64Array(np);
  const n0 = new Float64Array(np), nM = new Float64Array(np), nP = new Float64Array(np);
  for (let i = 0; i < np; i++) {
    const p = ps[i], i6 = inv6(p);
    PP_[i] = p; AA[i] = (p - 2) / (p - 4); BB[i] = (p - 3) / (p - 4); CC[i] = (p - 1) / (p - 3);
    n0[i] = p;
    const rM = (2 * i6) % p; nM[i] = rM === 0 ? p : rM;
    const rP = ((p - 2) * i6) % p; nP[i] = rP === 0 ? p : rP;
  }
  const bs = Math.min(BLK, KK);
  const A0 = new Float64Array(bs), AM = new Float64Array(bs), AP = new Float64Array(bs), AV = new Float64Array(bs);
  const SW = new Kah(), SV = new Kah(), S1 = new Kah(), S2 = new Kah();
  const W0 = 1 / delta;
  let W1z = 15 * D; for (const p of ps) W1z *= (p - 2) / (p - 4);
  const W2z = 15 * D;
  SW.add(W0 - 6); SV.add(W0 - 6); S1.add(W1z - 6 * b1); S2.add(W2z - 6 * b2);
  const invKK = 1 / KK;
  for (let k0 = 1; k0 < KK; k0 += bs) {
    const len = Math.min(bs, KK - k0);
    A0.fill(1, 0, len); AM.fill(1, 0, len); AP.fill(1, 0, len); AV.fill(1, 0, len);
    for (let i = 0; i < np; i++) {
      const p = PP_[i], a = AA[i], b = BB[i], c = CC[i];
      let j = n0[i] - k0; while (j < len) { A0[j] *= a; AV[j] *= c; j += p; } n0[i] = j + k0;
      let jm = nM[i] - k0; while (jm < len) { AM[jm] *= b; jm += p; } nM[i] = jm + k0;
      let jp = nP[i] - k0; while (jp < len) { AP[jp] *= b; jp += p; } nP[i] = jp + k0;
    }
    let cw = 0, cv = 0, c1 = 0, c2 = 0, r5 = k0 % 5;
    for (let j = 0; j < len; j++) {
      const k = k0 + j, w = 2 - 2 * k * invKK;
      const f5 = (r5 === 0) ? 2.5 : ((r5 === 1 || r5 === 4) ? 1.25 : 0);
      const f5v = (r5 === 0) ? 2.5 : 0.625;
      const g0 = 6 * f5 * D * A0[j];
      cw += w * (g0 * AM[j] * AP[j] - 6);
      cv += w * (6 * f5v * C * AV[j] - 6);
      c1 += w * (g0 - 6 * b1);
      c2 += w * (6 * f5 * D * AM[j] - 6 * b2);
      r5++; if (r5 === 5) r5 = 0;
      if ((j & 65535) === 65535) { SW.add(cw); SV.add(cv); S1.add(c1); S2.add(c2); cw = 0; cv = 0; c1 = 0; c2 = 0; }
    }
    SW.add(cw); SV.add(cv); S1.add(c1); S2.add(c2);
  }
  const X = SW.get(), Xd = SV.get(), X1 = S1.get(), X2 = S2.get();
  return { x, y, L, KK, delta, X, Xd, X1, X2, Xmx: X - X1 - 2 * X2, lny: Math.log(y),
           secs: (Date.now() - t0) / 1000, nsPerK: (Date.now() - t0) * 1e6 / KK };
}

// ---------------------------------------------------------------------------
// THE CONDUCTOR DESCENT. Enumerates every squarefree y-smooth n = 6*(subset of
// primes in [5,y]) with n <= bound, in increasing-prime order, each exactly
// once, carrying P*(n) = Q * prod_{p|n} pi_p/(1 - pi_p) with
// Q = prod_{5<=p<=y}(1 - pi_p). delta*L is exact (BigInt).
// ---------------------------------------------------------------------------
function bigProd(a) { while (a.length > 1) { const b = []; for (let i = 0; i < a.length; i += 2) b.push(i + 1 < a.length ? a[i] * a[i + 1] : a[i]); a = b; } return a[0]; }
function deltaLexact(L, ps7) {
  const num = (BigInt(L) / 15n) * bigProd(ps7.map(p => BigInt(p - 2)));
  const den = bigProd(ps7.map(p => BigInt(p)));
  const SH = 64n;
  return Number((num << SH) / den) / Number(1n << SH);
}
function descend(x, mult) {
  const t0 = Date.now();
  const o = BY[x], L = o.L, y = o.y, bound = L * mult;
  const allp = primesUpTo(y), ps5 = allp.filter(p => p >= 5), ps7 = allp.filter(p => p >= 7), np = ps5.length;
  const PA = new Float64Array(np), RR = new Float64Array(np);
  for (let i = 0; i < np; i++) { PA[i] = ps5[i]; RR[i] = ps5[i] === 5 ? 3 : 2 / (ps5[i] - 3); }
  let Q = 0.25; for (const p of ps7) Q *= (p - 3) / (p - 1);
  const dL = deltaLexact(L, ps7);
  const sInv = new Kah(), sMas = new Kah(), sLo = new Kah(), sTr = new Kah();
  let mDiv = 0, mLo = 0, mTr = 0;
  const cap = 4 * np + 4096;
  const SN = new Float64Array(cap), SWt = new Float64Array(cap), SMx = new Float64Array(cap);
  const SIx = new Int32Array(cap);
  let sp = 0, nodes = 0, maxsp = 0;
  SN[0] = 6; SWt[0] = 1; SIx[0] = 0; SMx[0] = 3; sp = 1;
  const L4 = 4 * L;
  while (sp > 0) {
    sp--;
    const n = SN[sp], wt = SWt[sp], i0 = SIx[sp], mx = SMx[sp];
    nodes++;
    const w = Q * wt;
    if (n <= L) { sInv.add(w / n); sMas.add(w); }
    if (mx <= x) { mDiv += w; }
    else if (n < L) {
      const q = Math.floor(L / n); let r = L - n * q; if (r < 0) r += n; if (r >= n) r -= n;
      const f = r / n; sLo.add(w * f * (1 - f) * (n / L)); mLo += w;
    } else if (n > L && n < L4) { sTr.add(w * (1 - L / n)); mTr += w; }
    for (let i = i0; i < np; i++) {
      const p = PA[i], nn = n * p; if (nn > bound) break;
      SN[sp] = nn; SWt[sp] = wt * RR[i]; SIx[sp] = i + 1; SMx[sp] = p; sp++;
    }
    if (sp > maxsp) maxsp = sp;
  }
  const massLE = sMas.get(), invLE = sInv.get();
  const bandHi = (1 - massLE) - (dL - L * invLE);
  return { x, dL, nodes, maxsp, mult,
           bandLo: sLo.get(), bandHi, total: sLo.get() + bandHi,
           bandTr: mult >= 4 ? sTr.get() : null, massTr: mult >= 4 ? mTr : null,
           massDiv: mDiv, massLo: mLo, massLE,
           secs: (Date.now() - t0) / 1000 };
}

// ---------------------------------------------------------------------------
// MONTE CARLO over the same conductor law, by the exponential-race skip: the
// next included prime after index i is the first j with CU[j] > CU[i-1] + Exp(1),
// CU the cumulative -ln(1 - pi_p). Exact, and its cost is the number of primes
// DIVIDING n (about 5) rather than pi(y).
// ---------------------------------------------------------------------------
function sfc32(a, b, c, d) { return function () { a |= 0; b |= 0; c |= 0; d |= 0; const t = (a + b | 0) + d | 0; d = d + 1 | 0; a = b ^ b >>> 9; b = c + (c << 3) | 0; c = c << 21 | c >>> 11; c = c + t | 0; return (t >>> 0) / 4294967296; }; }
function mcLevel(x, N, seed) {
  const t0 = Date.now();
  const o = BY[x], L = o.L, y = o.y;
  const ps = primesUpTo(y).filter(p => p >= 5), np = ps.length;
  const CU = new Float64Array(np), LG = new Float64Array(np);
  let cu = 0;
  for (let i = 0; i < np; i++) { const p = ps[i], pi = p === 5 ? 0.75 : 2 / (p - 1); cu += -Math.log(1 - pi); CU[i] = cu; LG[i] = Math.log(p); }
  const CMAX = cu, lnL = Math.log(L), CAP = 9007199254740992, L4 = 4 * L;
  const rng = sfc32(seed | 0, (seed ^ 0x9e3779b9) | 0, (seed * 2654435761) >>> 0, 0x1234567);
  const S = new Float64Array(4), S2 = new Float64Array(4), M = new Float64Array(4);
  for (let it = 0; it < N; it++) {
    let base = 0, i = 0, n = 6, ln = 1.791759469228055, big = false, mx = 3;
    for (;;) {
      const T = base - Math.log(rng());
      if (T >= CMAX) break;
      let lo = i, hi = np - 1, j = np;
      while (lo <= hi) { const md = (lo + hi) >> 1; if (CU[md] > T) { j = md; hi = md - 1; } else lo = md + 1; }
      if (j >= np) break;
      const p = ps[j]; mx = p; ln += LG[j];
      if (!big) { if (n > CAP / p) big = true; else n *= p; }
      base = CU[j]; i = j + 1; if (i >= np) break;
    }
    let st = 0, band = -1;
    if (mx <= x) { st = 0; }
    else if (!big && n < L) {
      const q = Math.floor(L / n); let r = L - n * q; if (r < 0) r += n; if (r >= n) r -= n;
      const f = r / n; st = f * (1 - f) * (n / L); band = 1;
    } else if (!big && n === L) { st = 0; }
    else { st = 1 - (big ? Math.exp(lnL - ln) : L / n); band = (!big && n < L4) ? 2 : 3; }
    S[0] += st; S2[0] += st * st; M[0] += 1;
    if (band > 0) { S[band] += st; S2[band] += st * st; M[band] += 1; }
  }
  const out = { x, N, seed, secs: (Date.now() - t0) / 1000, b: [] };
  for (let b = 0; b < 4; b++) { const m = S[b] / N, v = S2[b] / N - m * m; out.b.push({ mean: m, se: Math.sqrt(Math.max(v, 0) / N), mass: M[b] / N }); }
  return out;
}

// ============================================================================
// SEC 0 — calibration: the segmented sieve against varE-theta2-step's levels
// ============================================================================
console.log('=== SEC 0: calibration — the segmented sieve reproduces varE-theta2-step ===');
console.log('  X = sum_{|h|<L}(1-|h|/L)(W(h)-1);  X_dec the same with V in place of W');
console.log('   x |        X exact |   theta2 X |    X_dec exact | theta2 X_dec | delta*X | note r');
const SIE = {};
for (const x of [7, 11, 13, 17, 19, 23]) {
  const s = sieveLevel(x); SIE[x] = s;
  const o = BY[x];
  console.log('  ' + String(x).padStart(2) + ' | ' + s.X.toFixed(6).padStart(14) + ' | ' + o.X6.toFixed(6).padStart(10)
    + ' | ' + s.Xd.toFixed(6).padStart(14) + ' | ' + o.Xd6.toFixed(6).padStart(12)
    + ' | ' + (s.delta * s.X).toFixed(6) + ' | ' + o.r.toFixed(4));
  ck('X@' + x, Math.abs(s.X - o.X6) < 1e-6, s.X + ' vs ' + o.X6);
  ck('Xdec@' + x, Math.abs(s.Xd - o.Xd6) < 1e-6, s.Xd + ' vs ' + o.Xd6);
}
console.log('  all six levels reproduced to 1e-6 in a rewritten engine (blocked, 4 MB)  ' + el());

// ============================================================================
// SEC 1 — the exact ratio at two new levels, x = 29 and x = 31
// ============================================================================
console.log('\n=== SEC 1: the exact decoupling ratio at two new levels ===');
for (const x of [29, 31]) SIE[x] = sieveLevel(x);
console.log('   x |   ln y | delta*X (=Var/E) | note r | delta*X_dec | delta*(X-X_dec) |  X/X_dec | d(X-Xd)*lny');
for (const x of [7, 11, 13, 17, 19, 23, 29, 31]) {
  const s = SIE[x], dX = s.delta * s.X, dXd = s.delta * s.Xd;
  console.log('  ' + String(x).padStart(2) + ' | ' + s.lny.toFixed(3).padStart(6) + ' | ' + dX.toFixed(6).padStart(16)
    + ' | ' + BY[x].r.toFixed(4) + ' | ' + dXd.toFixed(6).padStart(11)
    + ' | ' + (dX - dXd).toFixed(6).padStart(15) + ' | ' + (s.X / s.Xd).toFixed(6).padStart(8)
    + ' | ' + (s.delta * (s.X - s.Xd) * s.lny).toFixed(5).padStart(11));
}
console.log('\n  the four-group split (varE-theta2-step sec.3): X = X1 + 2*X2 + Xmix');
console.log('   x | delta*X1 | delta*X2 each | delta*Xmix | (X1-Xdec)*d*lny | (X-X1)*d*lny');
for (const x of [7, 11, 13, 17, 19, 23, 29, 31]) {
  const s = SIE[x], d = s.delta;
  console.log('  ' + String(x).padStart(2) + ' | ' + (d * s.X1).toFixed(6).padStart(8) + ' | ' + (d * s.X2).toFixed(6).padStart(13)
    + ' | ' + (d * s.Xmx).toFixed(6).padStart(10) + ' | ' + (d * (s.X1 - s.Xd) * s.lny).toFixed(5).padStart(15)
    + ' | ' + (d * (s.X - s.X1) * s.lny).toFixed(5).padStart(12));
}
console.log('\n  engine cost, and the price of the level NOT run:');
for (const x of [23, 29, 31]) console.log('    x = ' + String(x).padStart(2) + '  L/6 = ' + SIE[x].KK.toExponential(3)
  + '  wall ' + SIE[x].secs.toFixed(1) + ' s   ->  ' + SIE[x].nsPerK.toFixed(1) + ' s per 1e9 positions');
{
  const s31 = SIE[31], KK37 = 7420738134810 / 6;
  const hits31 = 1.794, hits37 = 1.924;   // sum_{7<=p<=y} 1/p at y = 447829, 2724079
  const est = s31.nsPerK * (hits37 / hits31) * KK37 / 1e9;
  console.log('    x = 37  L/6 = ' + KK37.toExponential(3) + '  ESTIMATE ' + est.toFixed(0) + ' s of wall clock ('
    + (est / 3600).toFixed(2) + ' hours), DECLINED under the 4-hour rule.');
  ck('x=37 sieve really is over budget', est > 4 * 3600, 'estimate ' + est.toFixed(0) + ' s');
}

// ============================================================================
// SEC 2 — the model's conductor bands, exact
// ============================================================================
console.log('\n=== SEC 2: the decoupled model band by band, exact conductor descent ===');
console.log('  bands of delta*X_dec = E[(n/L){L/n}(1-{L/n})], pi_p = (p-alpha_p)/(p-1)');
console.log('   x | delta*L exact  | note E[N_W]    | nodes    | n|L band | n<L band  | n>L band  | of which L<n<4L | n>4L');
const DES = {};
for (const x of [7, 11, 13, 17, 19, 23, 29, 31]) {
  const d = descend(x, 4); DES[x] = d;
  console.log('  ' + String(x).padStart(2) + ' | ' + d.dL.toExponential(8) + ' | ' + BY[x].EN.toExponential(8)
    + ' | ' + d.nodes.toExponential(2) + ' | ' + '0.000000'
    + ' | ' + d.bandLo.toFixed(9).padStart(9) + ' | ' + d.bandHi.toFixed(9).padStart(9)
    + ' | ' + d.bandTr.toFixed(9).padStart(15) + ' | ' + (d.bandHi - d.bandTr).toFixed(9));
  ck('deltaL@' + x, Math.abs(d.dL - BY[x].EN) <= 0.005, d.dL + ' vs ' + BY[x].EN);
}
console.log('\n  the descent against SEC 1\'s independent sieve (the two share no code path):');
console.log('   x | descent total | sieve delta*X_dec | difference | n<L share of total | n<L * ln y');
for (const x of [7, 11, 13, 17, 19, 23, 29, 31]) {
  const d = DES[x], s = SIE[x], sv = s.delta * s.Xd;
  console.log('  ' + String(x).padStart(2) + ' | ' + d.total.toFixed(9) + ' | ' + sv.toFixed(9).padStart(17)
    + ' | ' + (d.total - sv).toExponential(2).padStart(10)
    + ' | ' + (100 * d.bandLo / d.total).toFixed(3).padStart(17) + ' %'
    + ' | ' + (d.bandLo * s.lny).toFixed(5));
  ck('descent=sieve@' + x, Math.abs(d.total - s.delta * s.Xd) < 1e-9 + 4e-17 * BY[x].L, d.total + ' vs ' + s.delta * s.Xd);
}
console.log('\n  the conductor MASS in each band (probability, not contribution):');
console.log('   x | P[n | L] | P[n<L, n!|L] | P[L<n<4L] | P[n>4L]');
for (const x of [7, 11, 13, 17, 19, 23, 29, 31]) {
  const d = DES[x];
  console.log('  ' + String(x).padStart(2) + ' | ' + d.massDiv.toFixed(6) + ' | ' + d.massLo.toFixed(6).padStart(12)
    + ' | ' + d.massTr.toFixed(6).padStart(9) + ' | ' + (1 - d.massLE - d.massTr).toFixed(6));
}
console.log('\n  x = 37, descent to L only (the 4L descent is 2.5 h and was DECLINED):');
{
  const d = descend(37, 1); DES[37] = d;
  console.log('    delta*L = ' + d.dL.toExponential(10) + '   note E[N_W] = ' + BY[37].EN.toExponential(8));
  console.log('    nodes = ' + d.nodes.toExponential(4) + '   max stack = ' + d.maxsp + '   wall ' + d.secs.toFixed(1) + ' s');
  console.log('    n|L band  = 0.000000000 exactly   P[n | L] = ' + d.massDiv.toFixed(6));
  console.log('    n<L band  = ' + d.bandLo.toFixed(9) + '   P[n<L, n!|L] = ' + d.massLo.toFixed(6)
    + '   share of total = ' + (100 * d.bandLo / d.total).toFixed(3) + ' %');
  console.log('    n>L band  = ' + d.bandHi.toFixed(9) + '   P[n>L] = ' + (1 - d.massLE).toFixed(6));
  console.log('    delta*X_dec (identity route) = ' + d.total.toFixed(9) + '   +- ~5e-5, the cancellation');
  console.log('      floor measured against the sieve in the table above; quote five decimals, not nine.');
  console.log('    varE-spectral sec.6a quotes the model here as 0.39643 (MC, N = 4e5);');
  console.log('    redteam-0828-varE sec.4 quotes 0.395567 +- 0.000106 (MC, N = 2e7).');
  ck('deltaL@37', Math.abs(d.dL - BY[37].EN) <= 0.005, String(d.dL));
}

// ============================================================================
// SEC 3 — Monte Carlo: the bands at x = 37 and 41, and the model at x = 41
// ============================================================================
console.log('\n=== SEC 3: Monte Carlo on the same conductor law ===');
console.log('  calibration against SEC 2, N = 1e7, one seed (exact values in parentheses):');
console.log('   x |     MC total | s.e.     |  exact total | MC n<L    | s.e.     | exact n<L');
for (const x of [13, 23, 31]) {
  const m = mcLevel(x, 1e7, 20260828), d = DES[x];
  console.log('  ' + String(x).padStart(2) + ' | ' + m.b[0].mean.toFixed(6).padStart(12) + ' | ' + m.b[0].se.toExponential(2)
    + ' | ' + d.total.toFixed(6).padStart(12) + ' | ' + m.b[1].mean.toFixed(6) + ' | ' + m.b[1].se.toExponential(2)
    + ' | ' + d.bandLo.toFixed(6));
  ck('MC vs exact total@' + x, Math.abs(m.b[0].mean - d.total) < 5 * m.b[0].se, String(m.b[0].mean - d.total));
  ck('MC vs exact n<L@' + x, Math.abs(m.b[1].mean - d.bandLo) < 5 * m.b[1].se, String(m.b[1].mean - d.bandLo));
}
console.log('\n  x = 37 and x = 41, N = 1e8, two seeds each:');
console.log('   x | seed |       total | s.e.       |     n<L | L<n<4L  |    n>4L | wall');
const POOL = {};
for (const x of [37, 41]) {
  const rows = [];
  for (const seed of [20260828, 98765431]) {
    const m = mcLevel(x, 1e8, seed); rows.push(m);
    console.log('  ' + String(x).padStart(2) + ' | ' + String(seed).slice(-4) + ' | ' + m.b[0].mean.toFixed(6).padStart(11)
      + ' | ' + m.b[0].se.toExponential(3) + ' | ' + m.b[1].mean.toFixed(6) + ' | ' + m.b[2].mean.toFixed(6)
      + ' | ' + m.b[3].mean.toFixed(6) + ' | ' + m.secs.toFixed(1) + ' s');
  }
  const mean = b => (rows[0].b[b].mean + rows[1].b[b].mean) / 2;
  const se = b => Math.sqrt(rows[0].b[b].se ** 2 + rows[1].b[b].se ** 2) / 2;
  POOL[x] = { tot: mean(0), totSe: se(0), lo: mean(1), loSe: se(1), tr: mean(2), trSe: se(2), far: mean(3),
              mass: [rows[0].b[1].mass, rows[0].b[2].mass, rows[0].b[3].mass] };
  console.log('  ' + String(x).padStart(2) + ' | POOL | ' + POOL[x].tot.toFixed(6).padStart(11) + ' | ' + POOL[x].totSe.toExponential(3)
    + ' | ' + POOL[x].lo.toFixed(6) + ' | ' + POOL[x].tr.toFixed(6) + ' | ' + POOL[x].far.toFixed(6) + ' |');
}
console.log('\n  x = 37: MC pooled total ' + POOL[37].tot.toFixed(6) + ' +- ' + POOL[37].totSe.toExponential(2)
  + ' against SEC 2\'s exact ' + DES[37].total.toFixed(6)
  + ', gap ' + (POOL[37].tot - DES[37].total).toExponential(2));
ck('MC vs exact total@37', Math.abs(POOL[37].tot - DES[37].total) < 5 * Math.sqrt(POOL[37].totSe ** 2 + 5e-5 ** 2), String(POOL[37].tot - DES[37].total));
console.log('  x = 37: MC n<L ' + POOL[37].lo.toFixed(6) + ' against SEC 2\'s exact ' + DES[37].bandLo.toFixed(6));
console.log('  x = 41: the model is ' + POOL[41].tot.toFixed(6) + ' +- ' + POOL[41].totSe.toExponential(2)
  + '.  redteam-0828-varE sec.4 has 0.402364 +- 0.000075 (N = 2e7, two seeds);');
console.log('          var41-prereg registers [0.4013, 0.4040]; the closed form is lambda_2(2) = 0.455456.');
console.log('  x = 41: n<L band ' + POOL[41].lo.toFixed(6) + ' +- ' + POOL[41].loSe.toExponential(2)
  + '  (' + (100 * POOL[41].lo / POOL[41].tot).toFixed(3) + ' % of the total),  L<n<4L ' + POOL[41].tr.toFixed(6));

// ============================================================================
// SEC 4 — the two ladders, side by side
// ============================================================================
console.log('\n=== SEC 4: the two ladders ===');
console.log('  A. the decoupling error (SEC 1, exact; the last two rows are new)');
console.log('   x | X/X_dec  | delta*(X-X_dec) | * ln y');
for (const x of [7, 11, 13, 17, 19, 23, 29, 31]) {
  const s = SIE[x];
  console.log('  ' + String(x).padStart(2) + ' | ' + (s.X / s.Xd).toFixed(6) + ' | '
    + (s.delta * (s.X - s.Xd)).toFixed(6).padStart(15) + ' | ' + (s.delta * (s.X - s.Xd) * s.lny).toFixed(5).padStart(8));
}
console.log('\n  B. the model\'s n<L band (SEC 2 exact to x = 37, SEC 3 MC at x = 41)');
console.log('   x |  n<L band | share of delta*X_dec | * ln y | rung');
for (const x of [7, 11, 13, 17, 19, 23, 29, 31, 37]) {
  const d = DES[x], lny = Math.log(BY[x].y);
  console.log('  ' + String(x).padStart(2) + ' | ' + d.bandLo.toFixed(7).padStart(9) + ' | '
    + (100 * d.bandLo / d.total).toFixed(3).padStart(18) + ' % | ' + (d.bandLo * lny).toFixed(5) + ' | exact');
}
{
  const lny = Math.log(BY[41].y);
  console.log('  41 | ' + POOL[41].lo.toFixed(7).padStart(9) + ' | ' + (100 * POOL[41].lo / POOL[41].tot).toFixed(3).padStart(18)
    + ' % | ' + (POOL[41].lo * lny).toFixed(5) + ' | MC, s.e. ' + POOL[41].loSe.toExponential(1));
}
console.log('\n  ' + (FAIL === 0 ? 'all assertions passed' : FAIL + ' ASSERTIONS FAILED') + '.  total wall ' + el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/varE-exact-ladder-01.js
//   invocation:  node research/varE-exact-ladder-01.js
//   code-sha256: 210d5e648f6bebd4551b276c7bb1c672ca675c3f0374c852f3ca3e9a41806a7b
//   out-sha256:  384d4a74e21d4ed39665742934a741aeeaac0cf073142b08f6f62f683a02fd65
//   body-lines:  132
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-28
//   elapsed:     2510.3 s
// ============================================================================
// === SEC 0: calibration — the segmented sieve reproduces varE-theta2-step ===
//   X = sum_{|h|<L}(1-|h|/L)(W(h)-1);  X_dec the same with V in place of W
//    x |        X exact |   theta2 X |    X_dec exact | theta2 X_dec | delta*X | note r
//    7 |       4.612929 |   4.612929 |       5.405185 |     5.405185 | 0.152075 | 0.1521
//   11 |      15.073187 |  15.073187 |      15.694986 |    15.694986 | 0.256267 | 0.2563
//   13 |      29.557928 |  29.557928 |      29.271013 |    29.271013 | 0.299499 | 0.2995
//   17 |      51.400255 |  51.400255 |      51.200849 |    51.200849 | 0.326772 | 0.3268
//   19 |      81.289135 |  81.289135 |      81.171615 |    81.171615 | 0.347302 | 0.3473
//   23 |     121.485245 | 121.485245 |     121.326093 |   121.326093 | 0.364320 | 0.3643
//   all six levels reproduced to 1e-6 in a rewritten engine (blocked, 4 MB)  0.5 s
//
// === SEC 1: the exact decoupling ratio at two new levels ===
//    x |   ln y | delta*X (=Var/E) | note r | delta*X_dec | delta*(X-X_dec) |  X/X_dec | d(X-Xd)*lny
//    7 |  2.565 |         0.152075 | 0.1521 |    0.178193 |       -0.026118 | 0.853427 |    -0.06699
//   11 |  3.850 |         0.256267 | 0.2563 |    0.266839 |       -0.010572 | 0.960382 |    -0.04070
//   13 |  5.153 |         0.299499 | 0.2995 |    0.296592 |        0.002907 | 1.009802 |     0.01498
//   17 |  6.564 |         0.326772 | 0.3268 |    0.325504 |        0.001268 | 1.003895 |     0.00832
//   19 |  8.042 |         0.347302 | 0.3473 |    0.346800 |        0.000502 | 1.001448 |     0.00404
//   23 |  9.611 |         0.364320 | 0.3643 |    0.363842 |        0.000477 | 1.001312 |     0.00459
//   29 | 11.295 |         0.377418 | 0.3774 |    0.377144 |        0.000273 | 1.000725 |     0.00309
//   31 | 13.012 |         0.387588 | 0.3876 |    0.387405 |        0.000183 | 1.000471 |     0.00238
//
//   the four-group split (varE-theta2-step sec.3): X = X1 + 2*X2 + Xmix
//    x | delta*X1 | delta*X2 each | delta*Xmix | (X1-Xdec)*d*lny | (X-X1)*d*lny
//    7 | 0.205517 |      0.094199 |  -0.241840 |         0.07008 |     -0.13708
//   11 | 0.293618 |      0.047843 |  -0.133037 |         0.10310 |     -0.14381
//   13 | 0.322208 |      0.027019 |  -0.076748 |         0.13201 |     -0.11703
//   17 | 0.345842 |      0.017012 |  -0.053095 |         0.13350 |     -0.12518
//   19 | 0.363348 |      0.011379 |  -0.038804 |         0.13308 |     -0.12905
//   23 | 0.377724 |      0.007968 |  -0.029342 |         0.13342 |     -0.12883
//   29 | 0.388958 |      0.005759 |  -0.023059 |         0.13344 |     -0.13035
//   31 | 0.397662 |      0.004323 |  -0.018721 |         0.13347 |     -0.13109
//
//   engine cost, and the price of the level NOT run:
//     x = 23  L/6 = 3.718e+7  wall 0.5 s   ->  12.7 s per 1e9 positions
//     x = 29  L/6 = 1.078e+9  wall 12.9 s   ->  12.0 s per 1e9 positions
//     x = 31  L/6 = 3.343e+10  wall 545.7 s   ->  16.3 s per 1e9 positions
//     x = 37  L/6 = 1.237e+12  ESTIMATE 21656 s of wall clock (6.02 hours), DECLINED under the 4-hour rule.
//
// === SEC 2: the decoupled model band by band, exact conductor descent ===
//   bands of delta*X_dec = E[(n/L){L/n}(1-{L/n})], pi_p = (p-alpha_p)/(p-1)
//    x | delta*L exact  | note E[N_W]    | nodes    | n|L band | n<L band  | n>L band  | of which L<n<4L | n>4L
//    7 | 6.92307692e+0 | 6.92000000e+0 | 1.00e+1 | 0.000000 | 0.003056943 | 0.175135975 |     0.075485625 | 0.099650350
//   11 | 3.92735498e+1 | 3.92700000e+1 | 1.07e+2 | 0.000000 | 0.012367138 | 0.254471738 |     0.063202354 | 0.191269383
//   13 | 3.04282142e+2 | 3.04280000e+2 | 1.40e+3 | 0.000000 | 0.012344728 | 0.284246894 |     0.041699091 | 0.242547803
//   17 | 3.24551264e+3 | 3.24551000e+3 | 2.51e+4 | 0.000000 | 0.009853657 | 0.315650254 |     0.034339926 | 0.281310328
//   19 | 4.14411873e+4 | 4.14411900e+4 | 4.97e+5 | 0.000000 | 0.008044066 | 0.338755481 |     0.028190788 | 0.310564693
//   23 | 6.69028799e+5 | 6.69028800e+5 | 1.18e+7 | 0.000000 | 0.006640313 | 0.357202109 |     0.023927028 | 0.333275081
//   29 | 1.40636174e+7 | 1.40636174e+7 | 3.52e+8 | 0.000000 | 0.005616554 | 0.371527981 |     0.020542354 | 0.350985627
//   31 | 3.28601799e+8 | 3.28601799e+8 | 1.11e+10 | 0.000000 | 0.004855050 | 0.382548799 |     0.017963073 | 0.364585726
//
//   the descent against SEC 1's independent sieve (the two share no code path):
//    x | descent total | sieve delta*X_dec | difference | n<L share of total | n<L * ln y
//    7 | 0.178192918 |       0.178192918 |  -1.17e-15 |             1.716 % | 0.00784
//   11 | 0.266838875 |       0.266838875 |  -1.25e-14 |             4.635 % | 0.04762
//   13 | 0.296591623 |       0.296591623 |  -1.58e-13 |             4.162 % | 0.06362
//   17 | 0.325503912 |       0.325503912 |  -6.17e-12 |             3.027 % | 0.06468
//   19 | 0.346799547 |       0.346799547 |  -1.79e-10 |             2.320 % | 0.06469
//   23 | 0.363842421 |       0.363842422 |  -9.50e-10 |             1.825 % | 0.06382
//   29 | 0.377144535 |       0.377144494 |    4.16e-8 |             1.489 % | 0.06344
//   31 | 0.387403848 |       0.387404967 |   -1.12e-6 |             1.253 % | 0.06317
//
//   the conductor MASS in each band (probability, not contribution):
//    x | P[n | L] | P[n<L, n!|L] | P[L<n<4L] | P[n>4L]
//    7 | 0.666667 |     0.050000 |  0.175000 | 0.108333
//   11 | 0.417387 |     0.247088 |  0.129431 | 0.206094
//   13 | 0.296672 |     0.352602 |  0.095205 | 0.255521
//   17 | 0.212415 |     0.419468 |  0.075543 | 0.292574
//   19 | 0.160547 |     0.456832 |  0.062298 | 0.320322
//   23 | 0.123952 |     0.481611 |  0.052637 | 0.341800
//   29 | 0.096759 |     0.499661 |  0.045124 | 0.358456
//   31 | 0.078138 |     0.511254 |  0.039396 | 0.371212
//
//   x = 37, descent to L only (the 4L descent is 2.5 h and was DECLINED):
//     delta*L = 9.3772289288e+9   note E[N_W] = 9.37722893e+9
//     nodes = 1.2190e+11   max stack = 198284   wall 1597.0 s
//     n|L band  = 0.000000000 exactly   P[n | L] = 0.063810
//     n<L band  = 0.004252203   P[n<L, n!|L] = 0.519965   share of total = 1.075 %
//     n>L band  = 0.391414298   P[n>L] = 0.416225
//     delta*X_dec (identity route) = 0.395666500   +- ~5e-5, the cancellation
//       floor measured against the sieve in the table above; quote five decimals, not nine.
//     varE-spectral sec.6a quotes the model here as 0.39643 (MC, N = 4e5);
//     redteam-0828-varE sec.4 quotes 0.395567 +- 0.000106 (MC, N = 2e7).
//
// === SEC 3: Monte Carlo on the same conductor law ===
//   calibration against SEC 2, N = 1e7, one seed (exact values in parentheses):
//    x |     MC total | s.e.     |  exact total | MC n<L    | s.e.     | exact n<L
//   13 |     0.296742 | 1.29e-4 |     0.296592 | 0.012339 | 9.98e-6 | 0.012345
//   23 |     0.363923 | 1.44e-4 |     0.363842 | 0.006629 | 7.47e-6 | 0.006640
//   31 |     0.387416 | 1.48e-4 |     0.387404 | 0.004853 | 6.47e-6 | 0.004855
//
//   x = 37 and x = 41, N = 1e8, two seeds each:
//    x | seed |       total | s.e.       |     n<L | L<n<4L  |    n>4L | wall
//   37 | 0828 |    0.395649 | 4.723e-5 | 0.004252 | 0.015861 | 0.375537 | 43.8 s
//   37 | 5431 |    0.395806 | 4.723e-5 | 0.004251 | 0.015874 | 0.375681 | 46.7 s
//   37 | POOL |    0.395728 | 3.340e-5 | 0.004251 | 0.015868 | 0.375609 |
//   41 | 0828 |    0.402332 | 4.755e-5 | 0.003771 | 0.014171 | 0.384390 | 63.2 s
//   41 | 5431 |    0.402403 | 4.755e-5 | 0.003768 | 0.014182 | 0.384453 | 59.0 s
//   41 | POOL |    0.402368 | 3.362e-5 | 0.003769 | 0.014177 | 0.384422 |
//
//   x = 37: MC pooled total 0.395728 +- 3.34e-5 against SEC 2's exact 0.395667, gap 6.15e-5
//   x = 37: MC n<L 0.004251 against SEC 2's exact 0.004252
//   x = 41: the model is 0.402368 +- 3.36e-5.  redteam-0828-varE sec.4 has 0.402364 +- 0.000075 (N = 2e7, two seeds);
//           var41-prereg registers [0.4013, 0.4040]; the closed form is lambda_2(2) = 0.455456.
//   x = 41: n<L band 0.003769 +- 1.29e-6  (0.937 % of the total),  L<n<4L 0.014177
//
// === SEC 4: the two ladders ===
//   A. the decoupling error (SEC 1, exact; the last two rows are new)
//    x | X/X_dec  | delta*(X-X_dec) | * ln y
//    7 | 0.853427 |       -0.026118 | -0.06699
//   11 | 0.960382 |       -0.010572 | -0.04070
//   13 | 1.009802 |        0.002907 |  0.01498
//   17 | 1.003895 |        0.001268 |  0.00832
//   19 | 1.001448 |        0.000502 |  0.00404
//   23 | 1.001312 |        0.000477 |  0.00459
//   29 | 1.000725 |        0.000273 |  0.00309
//   31 | 1.000471 |        0.000183 |  0.00238
//
//   B. the model's n<L band (SEC 2 exact to x = 37, SEC 3 MC at x = 41)
//    x |  n<L band | share of delta*X_dec | * ln y | rung
//    7 | 0.0030569 |              1.716 % | 0.00784 | exact
//   11 | 0.0123671 |              4.635 % | 0.04762 | exact
//   13 | 0.0123447 |              4.162 % | 0.06362 | exact
//   17 | 0.0098537 |              3.027 % | 0.06468 | exact
//   19 | 0.0080441 |              2.320 % | 0.06469 | exact
//   23 | 0.0066403 |              1.825 % | 0.06382 | exact
//   29 | 0.0056166 |              1.489 % | 0.06344 | exact
//   31 | 0.0048550 |              1.253 % | 0.06317 | exact
//   37 | 0.0042522 |              1.075 % | 0.06301 | exact
//   41 | 0.0037694 |              0.937 % | 0.06285 | MC, s.e. 1.3e-6
//
//   all assertions passed.  total wall 2510.2 s
// ============================================================================
// READINGS
//
// 1. THE TWO NEW LEVELS DO NOT BREAK THE STEP-1 READING, AND DO NOT SHARPEN IT
//    EITHER. X/X_dec now reads 1.009802, 1.003895, 1.001448, 1.001312,
//    1.000725, 1.000471 over x = 13..31, and delta*(X - X_dec)*ln y reads
//    0.01498, 0.00832, 0.00404, 0.00459, 0.00309, 0.00238. Bounded on every
//    level computed, falling rather than settling, exactly as at x = 23. Six
//    levels above the sign change instead of four. The failure mode these
//    levels exclude is still only growth: nothing here distinguishes
//    O(1/ln y) from O(1/ln^2 y) or from a constant times a slower function.
// 2. THE NEAR-CANCELLATION IS STILL A NEAR-CANCELLATION, AND ONE HALF OF IT
//    IS NOW VISIBLY DRIFTING. SEC 1's group split gives
//    delta*(X1 - X_dec)*ln y = 0.13342, 0.13344, 0.13347 at x = 23, 29, 31,
//    which is settled to five figures, against delta*(X - X1)*ln y =
//    -0.12883, -0.13035, -0.13109, which is not. So the net 0.00238 at x = 31
//    is a difference of two numbers fifty times larger of which one is still
//    moving in the third decimal. varE-theta2-step's instruction not to quote
//    the net coefficient stands and is strengthened.
// 3. THE n <= L BAND IS EVALUATED, AT NINE LEVELS, EXACTLY.
//    varE-spectral sec.4 states it as O(1/ln W) and does not evaluate it;
//    redteam-0828-varE sec.0 names that as half of the second open step. SEC 2
//    computes it as an exact sum over squarefree conductors: 0.012344728,
//    0.009853657, 0.008044066, 0.006640313, 0.005616554, 0.004855050,
//    0.004252203 at x = 13..37, and its product with ln y is 0.06362, 0.06468,
//    0.06469, 0.06382, 0.06344, 0.06317, 0.06301 across the same levels. That
//    is a constant to three figures over a factor 500 in y, still creeping
//    down. So the band behaves as c/ln y with c near 0.063, MEASURED, on nine
//    exact levels and no derivation. Its share of delta*X_dec falls 4.162 %,
//    3.027 %, 2.320 %, 1.825 %, 1.489 %, 1.253 %, 1.075 % and is 0.937 % at
//    x = 41 by Monte Carlo.
// 4. THE n | L BAND IS EXACTLY ZERO AT EVERY LEVEL, AND IT IS NOT A SMALL SET.
//    SEC 2's mass table: P[n | L] = 0.666667, 0.417387, 0.296672, 0.212415,
//    0.160547, 0.123952, 0.096759, 0.078138 at x = 7..31 and 0.063810 at
//    x = 37. So 6.4 % of the conductor mass at x = 37 contributes nothing at
//    all, by Fact B, with no estimate involved. That is the diagonal's
//    arithmetic input, and it shrinks like the other 1/ln y corrections.
// 5. TWO INDEPENDENT ROUTES TO THE SAME MODEL, AGREEING TO 1e-15 AT THE BOTTOM
//    AND TO 1e-6 AT THE TOP. SEC 2's conductor descent and SEC 1's real-space
//    sieve share no code path, and their difference runs -1.17e-15, -1.25e-14,
//    -1.58e-13, -6.17e-12, -1.79e-10, -9.50e-10, 4.16e-8, -1.12e-6 over
//    x = 7..31. The growth is the descent's own cancellation floor, about
//    6e-18 * L, which is why the x = 37 total is quoted to five decimals.
// 6. THE MODEL AT x = 37 IS NOW EXACT TO FIVE DECIMALS, AND THE CORPUS'S TWO
//    QUOTED VALUES BRACKET IT. SEC 2's identity route gives 0.395667 and
//    SEC 3's Monte Carlo at N = 1e8 on two seeds gives 0.395728 +- 3.34e-5,
//    a gap of 6.15e-5 against a combined bar of about 6e-5. varE-spectral
//    sec.6a's 0.39643 (N = 4e5) is 7.6e-4 high; redteam-0828-varE sec.4's
//    0.395567 +- 0.000106 is 1.0e-4 low, inside its own bar.
// 7. x = 41 CONFIRMS THE RED TEAM'S FORECAST AND TIGHTENS IT FIVE-FOLD.
//    0.402368 +- 3.36e-5 against 0.402364 +- 0.000075, a difference of 4e-6.
//    It sits inside var41-prereg's [0.4013, 0.4040] and 0.053 below the closed
//    form 0.455456, so the tenth level still does not test the constant.
// 8. WHAT IS NOT SHOWN. No bound is derived on anything here. x = 37's ratio
//    X/X_dec is NOT computed: SEC 1 prices the sieve there at 21656 s of wall
//    clock, over the 4-hour rule, and no cheaper exact route to X (as opposed
//    to X_dec) was found, because W(h) depends on the factorisations of h,
//    h-2 and h+2 jointly and does not factor over conductors. x = 41's model
//    is Monte Carlo only: the descent there is 5.3e12 nodes.
//
// FIGURE PROVENANCE. Every figure in the readings is quoted from the OUTPUT
// block above, with no arithmetic performed on it. The two comparisons in
// reading 6 (7.6e-4 and 1.0e-4) are differences of figures printed there:
//   7.6e-4 = 0.39643   - 0.395667, both in SEC 2's x = 37 block.
//   1.0e-4 = 0.395667  - 0.395567, both in SEC 2's x = 37 block.
//   4e-6   = 0.402368  - 0.402364, both in SEC 3's x = 41 lines.
//   6.15e-5 is printed by SEC 3; the "combined bar of about 6e-5" is
//   sqrt(3.34e-5^2 + 5e-5^2), from SEC 3's s.e. and SEC 2's stated floor.
