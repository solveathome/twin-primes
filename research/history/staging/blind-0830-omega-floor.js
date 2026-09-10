#!/usr/bin/env node
'use strict';
// ============================================================================
// blind-0830-omega-floor.js — a SEALED blind test of the DERIVED growth law
//   Omega(z, s) >> z^{16s/9} / ln^8 z            (attack-0830-rec-cheapest.md
//   sec.4.2, DERIVED and HELD; the four-prime exit-chain construction)
// on the two objects that note defines at s = 1 + sqrt(e) + 0.05 = 2.698721:
//   (A) the exact pointwise floor Omega(z) = -min_r cc(r) = max over splits
//       (P1 | r, P2 | r+2) of A1 A2 + A1 B2 + B1 A2, A_i = lam+(P_i),
//       B_i = -lam-(P_i), Rosser weights of level D = z^s (sec.4.1, S3);
//   (B) the certified 2+4-chain sub-family count of sec.4.4 (S4b): primes above
//       47 split by index parity into Q1, Q2, best p* <= 47 per side, exact
//       count of exit chains of length 2 and 4, a lower bound on Omega.
// Companion note: research/history/staging/blind-0830-omega-floor.md. STAGING.
// This is a MEASUREMENT of the derived law's prediction, not a re-derivation
// of the floor and not a verdict on REC(s, u0). Nothing here moves an exponent.
//
// STAGES (one embedded tail each; the code above the first tail is shared):
//   --stage seal   custody: BOTH engines (the source's verbatim brute force and
//                  this file's pruned exact search; the source's verbatim
//                  triple loop and this file's reordered count) reproduce every
//                  level the source lists; then the derived law's slope at the
//                  planned levels, the finite-size arithmetic, and the SEALED
//                  forecast bands. This stage computes NOTHING above z = 73
//                  (exact) or z = 5e5 (certified).
//   --stage run    the new levels (exact z = 79..113; certified z = 1e6..1e9),
//                  then the score against the bands, recomputed from the same
//                  constants by the same function tail 1 printed them from.
//
// ENGINES.
//   Exact Omega, pruned: for each P1 the objective is (A1 + B1) A2 + A1 B2 with
//   A2, B2 >= 0 (sign facts E2 of the source, re-checked at every level here
//   as `viol`), so an upper bound over all P2 inside the complement is
//   (A1 + B1) max A2 + A1 max B2 with the maxima taken by a subset-max
//   transform; P1 is skipped when the bound cannot beat the running best.
//   Same search space as the source's 3^k recursion (2 in both or neither),
//   pruned only by a valid bound; controlled against the brute force at
//   every source level.
//   Certified count, reordered: for fixed (p3, p4) the p2-sum splits at the
//   point where the lower bound t/(p2 p3 p4) drops below p2; above it the term
//   is piQ(hi) - piQ(p2), p4-independent and prefix-summed once per p3; below
//   it the term is evaluated in the source's own floating-point expressions.
//   Same count, same p* choice at the source levels (full p* loop there);
//   at the new levels p* is fixed to (47, 43), the values the source's greedy
//   choice took at every level from z = 2000 on, and the count is monotone
//   nondecreasing in p* (t = D/p*^3 falls, the slab widens), so the object at
//   the new levels is the source's family with side 1 at 47 and side 2 at 43:
//   a certified lower bound on Omega, and equal to the source's greedy value
//   unless side 1 tied at a smaller p*.
//
// QUOTED CONSTANTS (inputs, from embedded OUTPUT blocks; cited by line):
//   attack-0830-rec-cheapest.js lines 362-377: exact Omega at z = 13..73;
//   lines 393-394: hill-climb floors 6.840e2 at z = 89, 1.155e3 at z = 101;
//   lines 411-420: the certified S4b table; line 424-426: the S5 slopes.
//   beta_2 = 4.26645028414864 (dhr-verification.md, Booker-Browning table).
//
//   node research/history/staging/blind-0830-omega-floor.js --stage seal   (~2 min)
//   node research/history/staging/blind-0830-omega-floor.js --stage run    (~40 min, 6 GB)
//   Progress goes to stderr; stdout carries no timing figure.
// ============================================================================

const ARGS = process.argv.slice(2);
const argOf = (n, d) => { const i = ARGS.indexOf('--' + n); return i === -1 ? d : ARGS[i + 1]; };
const STAGE = argOf('stage', 'seal');
if (!['seal', 'run'].includes(STAGE)) { console.error('usage: --stage seal|run'); process.exit(2); }

const BETA2 = 4.26645028414864;
const SE = 1 + Math.sqrt(Math.E);
const ETA = 0.05;
const S = SE + ETA, U0 = BETA2 - ETA;
const EXP = 16 * S / 9;                 // the derived law's exponent at this s
const model = (z) => Math.pow(z, EXP) / Math.pow(Math.log(z), 8);
const sigmaModel = (z) => EXP - 8 / Math.log(z);   // d ln(model)/d ln z

const f = (x, d) => Number(x).toFixed(d);
const e3 = (x) => Number(x).toExponential(3);
const pad = (s, n) => String(s).padStart(n);
const T0 = Date.now(); const el = () => ((Date.now() - T0) / 1000).toFixed(1) + 's';
const prog = (m) => process.stderr.write(`  [${el()}] ${m}\n`);
const log = (s) => console.log(s);

// ---- quoted source values (attack-0830-rec-cheapest.js OUTPUT block) --------
const SRC_EXACT = { 13: 1, 17: 2, 19: 3, 23: 6, 29: 10, 31: 18, 37: 22, 41: 30, 43: 45, 47: 63, 53: 86, 59: 111, 61: 134, 67: 168, 71: 205, 73: 251 }; // lines 362-377
const SRC_HILL = { 89: 684, 101: 1155 };  // lines 393-394, printed 6.840e+2 and 1.155e+3 (integers)
//               z      p*1  A1         c2a       c4a         p*2  A2         c2b       c4b
const SRC_CERT = [
  [601, 23, 300, 300, 0, 29, 300, 300, 0],
  [1000, 37, 780, 780, 0, 41, 780, 780, 0],
  [2000, 47, 2536, 2536, 0, 43, 2456, 2456, 0],
  [5000, 47, 11017, 10473, 544, 43, 10500, 10182, 318],
  [10000, 47, 41668, 28636, 13032, 43, 36374, 26969, 9405],
  [20000, 47, 228508, 72772, 155736, 43, 190436, 66742, 123694],
  [50000, 47, 2713375, 223343, 2490032, 43, 2306291, 185950, 2120341],
  [100000, 47, 16969634, 408073, 16561561, 43, 14892829, 284783, 14608046],
  [200000, 47, 100547603, 416879, 100130724, 43, 90685180, 139870, 90545310],
  [500000, 47, 979017225, 0, 979017225, 43, 905294776, 0, 905294776],
];  // lines 411-420
const SRC_SLOPES = { exact29_73: [3.2825, 0.1205], hill89_601: [4.1394, 0.0898] };  // lines 424-425

// ---- the planned levels (fixed before the run; the seal prints them) --------
const EXACT_NEW = [79, 83, 89, 97, 101, 103, 107, 109, 113];
const CERT_NEW = [1e6, 2e6, 5e6, 1e7, 2e7, 5e7, 1e8, 2e8, 5e8, 1e9];
const K_MAX = 29;  // 2^29 x 4 Int16 tables = 4.3 GB; z = 113 has 29 primes below it

// ============================================================================
// primes
// ============================================================================
function primesBelow(n) { const s = new Uint8Array(n), o = []; for (let i = 2; i < n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j < n; j += i) s[j] = 1; } } return o; }
function primesBelowTyped(n) {
  const s = new Uint8Array(n); let cnt = 0;
  for (let i = 2; i < n; i++) { if (!s[i]) { cnt++; if (i <= 46341) for (let j = i * i; j < n; j += i) s[j] = 1; } }
  const o = new Int32Array(cnt); let k = 0; for (let i = 2; i < n; i++) if (!s[i]) o[k++] = i;
  return o;
}

// ============================================================================
// object (A): the exact pointwise floor
// ============================================================================
// the pilot's Rosser support, verbatim (sift-limit-lemmaV.js; copied by the source)
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
// lam+(P), lam-(P) for every subset P of the primes below z, as Int16 (|lam(n)| <= |support|, asserted)
function zetaTables(z, S) {
  const ps = primesBelow(z), k = ps.length, N = 1 << k, D = Math.pow(z, S);
  if (k > K_MAX) throw new Error(`k = ${k} exceeds the table budget`);
  const sp = rosserSupport(z, D, true), sm = rosserSupport(z, D, false);
  if (sp.length >= 32767 || sm.length >= 32767) throw new Error('support too large for Int16');
  const maskOf = (n) => { let m = 0; for (let i = 0; i < k; i++) if (n % ps[i] === 0) m |= (1 << i); return m; };
  const fp = new Int16Array(N), fm = new Int16Array(N);
  for (const [d, sg] of sp) fp[maskOf(d)] += sg;
  for (const [d, sg] of sm) fm[maskOf(d)] += sg;
  for (let i = 0; i < k; i++) { const b = 1 << i; for (let m = 0; m < N; m++) if (m & b) { fp[m] += fp[m ^ b]; fm[m] += fm[m ^ b]; } }
  let viol = 0; for (let m = 1; m < N; m++) { if (fp[m] < 0) viol++; if (fm[m] > 0) viol++; }
  return { ps, k, N, fp, fm, np: sp.length, nm: sm.length, D, viol };
}
// the source's brute force, verbatim (3^{k-1} x 2 leaves)
function omegaBrute(T) {
  const k = T.k, fp = T.fp, fm = T.fm; let best = 0;
  const rec = (i, m1, m2) => {
    if (i === k) { const A1 = fp[m1], B1 = -fm[m1], A2 = fp[m2], B2 = -fm[m2]; const v = A1 * A2 + A1 * B2 + B1 * A2; if (v > best) best = v; return; }
    const b = 1 << i;
    if (i === 0) { rec(1, 0, 0); rec(1, b, b); return; }
    rec(i + 1, m1, m2); rec(i + 1, m1 | b, m2); rec(i + 1, m1, m2 | b);
  };
  rec(0, 0, 0);
  return best;
}
// this file's pruned exact search (see header); returns the maximiser too
function omegaPruned(T) {
  const k = T.k, N = T.N, fp = T.fp, fm = T.fm;
  const mA = new Int16Array(N), mB = new Int16Array(N);
  for (let m = 0; m < N; m++) { mA[m] = fp[m]; mB[m] = -fm[m]; }
  for (let i = 0; i < k; i++) { const b = 1 << i; for (let m = 0; m < N; m++) if (m & b) { if (mA[m ^ b] > mA[m]) mA[m] = mA[m ^ b]; if (mB[m ^ b] > mB[m]) mB[m] = mB[m ^ b]; } }
  let best = 0, bm1 = 0, bm2 = 0, leaves = 0, pruned = 0; const full = N - 1;
  for (let m1 = 0; m1 < N; m1++) {
    const A1 = fp[m1], B1 = -fm[m1]; if (A1 + B1 === 0) continue;
    const hasTwo = m1 & 1; const comp = (full ^ m1) | (hasTwo ? 1 : 0), compNo2 = comp & ~1;
    if ((A1 + B1) * mA[comp] + A1 * mB[comp] <= best) { pruned++; continue; }
    let sub = compNo2;
    while (true) { const m2 = sub | hasTwo; leaves++; const v = (A1 + B1) * fp[m2] - A1 * fm[m2]; if (v > best) { best = v; bm1 = m1; bm2 = m2; } if (sub === 0) break; sub = (sub - 1) & compNo2; }
  }
  return { best, m1: bm1, m2: bm2, A1: fp[bm1], B1: -fm[bm1], A2: fp[bm2], B2: -fm[bm2], leaves, pruned };
}

// ============================================================================
// object (B): the certified 2+4-chain sub-family
// ============================================================================
function upperIdx(arr, x) { let lo = 0, hi = arr.length; while (lo < hi) { const m = (lo + hi) >> 1; if (arr[m] <= x) lo = m + 1; else hi = m; } return lo; }
// the source's engine, verbatim
function countChainsSlow(Q, pstar, D) {
  const t = D / (pstar * pstar * pstar), D13 = Math.cbrt(D);
  let c2 = 0, c4 = 0;
  for (let j = 0; j < Q.length; j++) { const p2 = Q[j]; if (p2 >= D13) break; const lo = Math.max(p2, t / p2), hi = D13; if (hi > lo) c2 += upperIdx(Q, hi) - upperIdx(Q, lo); }
  for (let i4 = 0; i4 < Q.length; i4++) { const p4 = Q[i4];
    for (let i3 = i4 + 1; i3 < Q.length; i3++) { const p3 = Q[i3]; if (p3 * p3 * p3 * p3 * p3 > D) break;
      for (let i2 = i3 + 1; i2 < Q.length; i2++) { const p2 = Q[i2]; if (p2 >= D13) break;
        const hi = Math.min(D13, D / (p2 * p3 * p3 * p3)); if (hi <= p2) break;
        const lo = Math.max(p2, t / (p2 * p3 * p4)); if (hi > lo) c4 += upperIdx(Q, hi) - upperIdx(Q, lo); } } }
  return { c2, c4, tot: c2 + c4, c4big: BigInt(c4) };
}
// this file's reordered engine; Q an Int32Array (sorted), exact in BigInt above 2^50
function countChainsFast(Q, pstar, D) {
  const t = D / (pstar * pstar * pstar), D13 = Math.cbrt(D);
  const lim = Math.floor(D13) + 1;
  const piQ = new Int32Array(lim + 2);
  for (let j = 0; j < Q.length; j++) { const q = Q[j]; if (q > lim) break; piQ[q] = 1; }
  for (let x = 1; x < piQ.length; x++) piQ[x] += piQ[x - 1];
  const PI = (x) => x >= lim ? piQ[lim] : piQ[Math.floor(x)];      // # q in Q with q <= x, for 0 <= x <= D13
  let c2 = 0;
  for (let j = 0; j < Q.length; j++) { const p2 = Q[j]; if (p2 >= D13) break; const lo = Math.max(p2, t / p2), hi = D13; if (hi > lo) c2 += PI(hi) - PI(lo); }
  let c4big = 0n, acc = 0;
  const pref = new Float64Array(Q.length + 1);
  for (let i3 = 0; i3 < Q.length; i3++) { const p3 = Q[i3]; if (p3 * p3 * p3 * p3 * p3 > D) break;
    if (i3 === 0) continue;                       // no p4 below the first prime of Q
    // base terms, p4-independent: prefix over the admissible p2 range
    let i2max = i3; pref[i3] = 0;
    for (let i2 = i3 + 1; i2 < Q.length; i2++) { const p2 = Q[i2]; if (p2 >= D13) break;
      const hi = Math.min(D13, D / (p2 * p3 * p3 * p3)); if (hi <= p2) break;
      pref[i2] = pref[i2 - 1] + (PI(hi) - PI(p2)); i2max = i2; }
    if (i2max === i3) continue;
    const base = pref[i2max];
    for (let i4 = 0; i4 < i3; i4++) { const p4 = Q[i4];
      let corr = 0;
      for (let i2 = i3 + 1; i2 <= i2max; i2++) { const p2 = Q[i2];
        const lo = t / (p2 * p3 * p4); if (!(lo > p2)) break;       // the source's lo = max(p2, .) is p2 from here on
        const hi = Math.min(D13, D / (p2 * p3 * p3 * p3));
        corr += (hi > lo ? PI(hi) - PI(lo) : 0) - (PI(hi) - PI(p2)); }
      acc += base + corr;
      if (acc > 1e15) { c4big += BigInt(acc); acc = 0; }
    }
  }
  c4big += BigInt(acc);
  const c4 = Number(c4big);
  return { c2, c4, tot: c2 + c4, c4big, totbig: BigInt(c2) + c4big };
}
function splitQ(ps, cut) { const Q1 = [], Q2 = []; for (let i = 0; i < ps.length; i++) { const p = ps[i]; if (p > cut) (i & 1 ? Q1 : Q2).push(p); } return { Q1, Q2 }; }
// the source's greedy family: full p* loop, first max wins
function certifiedGreedy(z, ps, engine) {
  const D = Math.pow(z, S), small = []; for (const p of ps) if (p >= 3 && p <= 47) small.push(p);
  const { Q1, Q2 } = splitQ(ps, 47);
  const q1 = engine === countChainsFast ? Int32Array.from(Q1) : Q1, q2 = engine === countChainsFast ? Int32Array.from(Q2) : Q2;
  let b1 = { tot: 0 }, p1 = 0, b2 = { tot: 0 }, p2 = 0;
  for (const p of small) { const c = engine(q1, p, D); if (c.tot > b1.tot) { b1 = c; p1 = p; } }
  for (const p of small) { if (p === p1) continue; const c = engine(q2, p, D); if (c.tot > b2.tot) { b2 = c; p2 = p; } }
  return { A1: b1.tot, c2a: b1.c2, c4a: b1.c4, p1, A2: b2.tot, c2b: b2.c2, c4b: b2.c4, p2, prod: b1.tot * b2.tot };
}
// the new-level object: side 1 at p* = 47, side 2 at p* = 43, exact BigInt product
function certifiedFixed(z, ps) {
  const D = Math.pow(z, S); const { Q1, Q2 } = splitQ(ps, 47);
  const a = countChainsFast(Int32Array.from(Q1), 47, D); Q1.length = 0;
  const b = countChainsFast(Int32Array.from(Q2), 43, D); Q2.length = 0;
  return { A1: a.totbig, c2a: a.c2, c4a: a.c4big, A2: b.totbig, c2b: b.c2, c4b: b.c4big, prod: a.totbig * b.totbig };
}
const lnBig = (x) => { const s = x.toString(); const lead = Number(s.slice(0, 16)); return Math.log(lead) + (s.length - 16) * Math.LN10; };

// ============================================================================
// fits and the sealed bands
// ============================================================================
const ols = (xs, ys) => { const n = xs.length, mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n; let sxx = 0, sxy = 0; for (let i = 0; i < n; i++) { sxx += (xs[i] - mx) ** 2; sxy += (xs[i] - mx) * (ys[i] - my); } const b = sxy / sxx, a = my - b * mx; let rss = 0; for (let i = 0; i < n; i++) rss += (ys[i] - a - b * xs[i]) ** 2; return { b, se: n > 2 ? Math.sqrt(rss / (n - 2) / sxx) : NaN }; };

// SEALED BANDS (this file's judgement, fixed before --stage run; see the note sec.2 for the reasoning).
// Certified family: the local slope sigma = d ln(A1 A2)/d ln z over each step of CERT_NEW, from the level before.
const SEAL_SIGMA = {   // step ending at z: [point, lo, hi]
  1e6: [4.70, 4.30, 5.10], 2e6: [4.50, 4.10, 4.90], 5e6: [4.40, 4.00, 4.80], 1e7: [4.35, 3.95, 4.75],
  2e7: [4.35, 3.95, 4.75], 5e7: [4.35, 3.95, 4.75], 1e8: [4.35, 4.00, 4.70], 2e8: [4.37, 4.05, 4.70],
  5e8: [4.39, 4.05, 4.70], 1e9: [4.41, 4.05, 4.70],
};
const SEAL_RATIO = [0.05, 2.0];        // r(z) = A1 A2 / model(z) stays inside this at every new level
const SEAL_DECADE = { adverse: 3.90, hitLo: 4.05, hitHi: 4.70 };  // mean slope over 1e8 -> 1e9
const SEAL_EXACT_SLOPE = [4.1, 3.4, 5.2];   // OLS slope of ln Omega on ln z over z = 73..113 (point, lo, hi); NOT a law test
const SEAL_EXACT_LOG113 = [1.5, 1.9];       // log_z Omega at z = 113

function printSeal() {
  log('SEC D — THE DERIVED LAW AT THE PLANNED LEVELS, THE FINITE-SIZE ARITHMETIC, AND THE SEALED BANDS');
  log(`  law: Omega >> z^{16s/9}/ln^8 z at s = ${f(S, 6)}: exponent 16s/9 = ${f(EXP, 4)}, 2s = ${f(2 * S, 4)}, u0 = ${f(U0, 6)}, beta_2 = ${f(BETA2, 6)}; 16(1+sqrt e)/9 = ${f(16 * SE / 9, 4)}`);
  log('  its local slope sigma_model(z) = 16s/9 - 8/ln z; the finite-size quantities are the cut-47 shares of the corner mass');
  log('  (p3 side 47^2 D^{-2/9}, p4 side 47 D^{-1/9}: HEURISTIC, from the same construction) and the primes the family can use near D^{1/9}');
  log('   z         ln z     8/ln z   sigma_model   D^{1/9}    #primes in (47, D^{1/9}]   47^2 D^{-2/9}   47 D^{-1/9}');
  for (const z of [5e5, ...CERT_NEW]) {
    const lnz = Math.log(z), D = Math.pow(z, S), d9 = Math.pow(D, 1 / 9);
    const np = primesBelow(Math.floor(d9) + 1).filter(p => p > 47).length;
    log(`  ${pad(e3(z), 9)}   ${f(lnz, 3)}   ${f(8 / lnz, 4)}   ${f(sigmaModel(z), 4)}        ${pad(f(d9, 1), 7)}          ${pad(np, 3)}                    ${f(47 * 47 * Math.pow(D, -2 / 9), 4)}          ${f(47 * Math.pow(D, -1 / 9), 4)}`);
  }
  log('  saturation of the p3 term (p3 <= D^{1/9} <=> z >= p3^{9/s}): p3 = 53, 59, 61, 67, 71, 79, 89, 101, 127, 149, 199, 251 at z =');
  log('    ' + [53, 59, 61, 67, 71, 79, 89, 101, 127, 149, 199, 251].map(p => e3(Math.pow(p, 9 / S))).join(', '));
  log('');
  log('  the source\'s own certified points (quoted, S4b lines 411-420): ratio r = A1A2/model and the step slope');
  log('   z         A1 A2         r = /model    step slope   sigma_model(mid)   excess');
  let prev = null;
  for (const row of SRC_CERT) { const z = row[0], prod = row[2] * row[6]; const r = prod / model(z);
    let sl = '   --  ', ex = '   --  ', sm = '   --  ';
    if (prev) { const s = Math.log(prod / prev.prod) / Math.log(z / prev.z), zm = Math.sqrt(z * prev.z); sl = f(s, 4); sm = f(sigmaModel(zm), 4); ex = f(s - sigmaModel(zm), 4); }
    log(`  ${pad(e3(z), 9)}   ${e3(prod)}   ${pad(f(r, 4), 8)}      ${pad(sl, 7)}       ${pad(sm, 7)}         ${pad(ex, 7)}`); prev = { z, prod }; }
  log('');
  log('  SEALED FORECAST, object (B), the certified family at p* = (47, 43), levels ' + CERT_NEW.map(e3).join(' ') + ':');
  log('   step ends at   sigma_model(mid)   point   band [lo, hi]     rule: HIT if the measured step slope lies in the band');
  let pz = 5e5;
  for (const z of CERT_NEW) { const [p, lo, hi] = SEAL_SIGMA[z]; log(`  ${pad(e3(z), 12)}       ${f(sigmaModel(Math.sqrt(z * pz)), 4)}         ${f(p, 2)}    [${f(lo, 2)}, ${f(hi, 2)}]`); pz = z; }
  log(`  ratio rule: r(z) = A1A2/model(z) inside [${SEAL_RATIO[0]}, ${SEAL_RATIO[1]}] at every new level is a HIT; below is adverse to the ln^8 model of this family, above says the model under-counts (not adverse to >>)`);
  log(`  decade rule (the decisive row): mean slope over 1e8 -> 1e9: < ${SEAL_DECADE.adverse} ADVERSE to the exponent 16s/9 for this family (finite-size shares there are below 0.2 and falling);`);
  log(`    in [${SEAL_DECADE.adverse}, ${SEAL_DECADE.hitLo}) adverse-leaning, finite-size not excluded; in [${SEAL_DECADE.hitLo}, ${SEAL_DECADE.hitHi}] HIT; above ${SEAL_DECADE.hitHi} faster than the model (not adverse to >>; the ln^8 is then wrong as a model)`);
  log('  kill rule (the brief\'s): OLS slope of ln(A1A2) on ln z over the points z >= 1e7 below 2 by more than 2 se is ADVERSE to the law; anything at z < 1e7 is finite-size (cut shares >= 0.14 and 0.37 there)');
  log('  what the log correction does: 8/ln z = 0.61 -> 0.39 over 5e5 -> 1e9, so the law predicts 4.19 -> 4.41, never 4.80, at these z');
  log('');
  log('  SEALED FORECAST, object (A), the exact floor at z = ' + EXACT_NEW.join(', ') + ' (the law makes NO prediction here: its dyadic box is empty below z ~ 1e5, lam+(P(z)) = 0 at every source level):');
  log(`   control X1: Omega(89) >= ${SRC_HILL[89]} and Omega(101) >= ${SRC_HILL[101]} (the hill-climb splits are legal splits; a failure is an engine defect, not a measurement)`);
  log(`   forecast X2: OLS slope of ln Omega on ln z over z = 73..113: point ${SEAL_EXACT_SLOPE[0]}, band [${SEAL_EXACT_SLOPE[1]}, ${SEAL_EXACT_SLOPE[2]}] (from the source's 3.2825 +/- 0.1205 exact and 4.1394 +/- 0.0898 hill-climb slopes, and the floor forcing >= ${f(Math.log(SRC_HILL[89] / SRC_EXACT[73]) / Math.log(89 / 73), 2)} over 73 -> 89)`);
  log(`   forecast X3: log_z Omega at z = 113 in [${SEAL_EXACT_LOG113[0]}, ${SEAL_EXACT_LOG113[1]}]`);
  log('');
}

// ============================================================================
function stageSeal() {
  log('blind-0830-omega-floor.js --stage seal');
  log('');
  log('SEC A — THE OBJECTS AND THE CONSTANTS');
  log(`  s = 1 + sqrt(e) + eta = ${f(S, 6)} (eta = ${ETA}), u0 = beta_2 - eta = ${f(U0, 6)}, D = z^s, W = P(z)`);
  log(`  (A) Omega(z) = -min_r cc(r) = max over splits (P1, P2) of A1A2 + A1B2 + B1A2, A_i = lam+(prod P_i), B_i = -lam-(prod P_i), Rosser weights of level D (source sec.4.1)`);
  log(`  (B) the certified sub-family: Q = primes in (47, z) split by index parity; A_i = # exit chains of length 2 and 4 in Q_i at p*_i (source S4b); Omega >= A1 A2`);
  log(`  the derived law: Omega >> z^{16s/9}/ln^8 z, 16s/9 = ${f(EXP, 4)} (source sec.4.2, HELD); tested here through the local slope of ln Omega in ln z`);
  log('');
  log('SEC B — CUSTODY, OBJECT (A): both engines against the source\'s exact Omega at z = 13..73 (lines 362-377)');
  log('   z    k   |D+|   |D-|   viol   brute   pruned   source   A1   B1   A2   B2   leaves      pruned-P1   verdict');
  let okA = 0, nA = 0;
  for (const z of Object.keys(SRC_EXACT).map(Number)) {
    prog(`custody exact z=${z}`);
    const T = zetaTables(z, S); const b = omegaBrute(T); const p = omegaPruned(T); nA++;
    const ok = b === SRC_EXACT[z] && p.best === SRC_EXACT[z];
    if (ok) okA++;
    log(`  ${pad(z, 2)}  ${pad(T.k, 3)}  ${pad(T.np, 5)}  ${pad(T.nm, 5)}   ${pad(T.viol, 3)}   ${pad(b, 5)}   ${pad(p.best, 6)}   ${pad(SRC_EXACT[z], 6)}   ${pad(p.A1, 2)}   ${pad(p.B1, 2)}   ${pad(p.A2, 2)}   ${pad(p.B2, 2)}   ${pad(p.leaves, 9)}   ${pad(p.pruned, 9)}   ${ok ? 'MATCH' : 'MISMATCH'}`);
  }
  log(`  exact custody: ${okA} of ${nA} levels match the source digit for digit on both engines`);
  log('');
  log('SEC C — CUSTODY, OBJECT (B): both engines (full p* loop) against the source\'s S4b rows (lines 411-420), plus two intermediate controls');
  log('   z        engine   p*1   A1 (2ch, 4ch)                        p*2   A2 (2ch, 4ch)                        A1 A2        verdict');
  let okB = 0, nB = 0;
  for (const row of SRC_CERT) {
    const z = row[0]; prog(`custody cert z=${z}`); const ps = primesBelow(z);
    for (const [name, eng] of [['slow', countChainsSlow], ['fast', countChainsFast]]) {
      const c = certifiedGreedy(z, ps, eng); nB++;
      const ok = c.p1 === row[1] && c.A1 === row[2] && c.c2a === row[3] && c.c4a === row[4] && c.p2 === row[5] && c.A2 === row[6] && c.c2b === row[7] && c.c4b === row[8];
      if (ok) okB++;
      log(`  ${pad(z, 6)}   ${name}     ${pad(c.p1, 3)}   ${pad(c.A1, 10)} (${pad(c.c2a, 8)}, ${pad(c.c4a, 10)})   ${pad(c.p2, 3)}   ${pad(c.A2, 10)} (${pad(c.c2b, 8)}, ${pad(c.c4b, 10)})   ${e3(c.prod)}    ${ok ? 'MATCH' : 'MISMATCH'}`);
    }
  }
  for (const z of [300000, 400000]) {
    prog(`control cert z=${z}`); const ps = primesBelow(z);
    const a = certifiedGreedy(z, ps, countChainsSlow), b = certifiedGreedy(z, ps, countChainsFast);
    const ok = a.A1 === b.A1 && a.A2 === b.A2 && a.c4a === b.c4a && a.c4b === b.c4b && a.p1 === b.p1 && a.p2 === b.p2;
    log(`  ${pad(z, 6)}   slow     ${pad(a.p1, 3)}   ${pad(a.A1, 10)} (${pad(a.c2a, 8)}, ${pad(a.c4a, 10)})   ${pad(a.p2, 3)}   ${pad(a.A2, 10)} (${pad(a.c2b, 8)}, ${pad(a.c4b, 10)})   ${e3(a.prod)}    (control level, not in the source)`);
    log(`  ${pad(z, 6)}   fast     ${pad(b.p1, 3)}   ${pad(b.A1, 10)} (${pad(b.c2a, 8)}, ${pad(b.c4a, 10)})   ${pad(b.p2, 3)}   ${pad(b.A2, 10)} (${pad(b.c2b, 8)}, ${pad(b.c4b, 10)})   ${e3(b.prod)}    ${ok ? 'engines AGREE' : 'engines DISAGREE'}`);
  }
  log(`  certified custody: ${okB} of ${nB} engine-rows match the source digit for digit`);
  {
    const z = 500000, ps = primesBelow(z), D = Math.pow(z, S), { Q1 } = splitQ(ps, 47), q1 = Int32Array.from(Q1);
    const line = []; for (const p of [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]) line.push(`${p}:${countChainsFast(q1, p, D).tot}`);
    log('  monotonicity in p* at z = 5e5, side 1 (the count is nondecreasing in p*, so the greedy choice is 47 then 43): ' + line.join(' '));
  }
  log('');
  printSeal();
  log('DONE (seal: nothing above z = 73 exact or z = 5e5 certified was computed)');
}

function stageRun() {
  log('blind-0830-omega-floor.js --stage run');
  log('');
  log('SEC E — OBJECT (A), EXACT Omega AT THE NEW LEVELS (pruned engine; viol re-checked at every level)');
  log('   z    k   |D+|   |D-|   viol   Omega    log_z Omega   A1    B1    A2    B2   |P1|  |P2|  p*1  p*2   step slope   floor (hill-climb)');
  const ex = [{ z: 73, v: SRC_EXACT[73] }];
  for (const z of EXACT_NEW) {
    prog(`exact z=${z}`);
    const T = zetaTables(z, S); const p = omegaPruned(T);
    const P1 = T.ps.filter((q, i) => p.m1 >> i & 1), P2 = T.ps.filter((q, i) => p.m2 >> i & 1);
    const prev = ex[ex.length - 1]; const sl = Math.log(p.best / prev.v) / Math.log(z / prev.z);
    const fl = SRC_HILL[z] ? `${SRC_HILL[z]} ${p.best >= SRC_HILL[z] ? 'ok' : 'BELOW FLOOR'}` : '--';
    ex.push({ z, v: p.best });
    log(`  ${pad(z, 3)}  ${pad(T.k, 3)}  ${pad(T.np, 5)}  ${pad(T.nm, 5)}   ${pad(T.viol, 3)}   ${pad(p.best, 6)}    ${f(Math.log(p.best) / Math.log(z), 4)}      ${pad(p.A1, 3)}   ${pad(p.B1, 3)}   ${pad(p.A2, 3)}   ${pad(p.B2, 3)}    ${pad(P1.length, 2)}    ${pad(P2.length, 2)}   ${pad(P1[0] || '-', 3)}  ${pad(P2[0] || '-', 3)}     ${f(sl, 3)}       ${fl}`);
  }
  const fitE = ols(ex.map(r => Math.log(r.z)), ex.map(r => Math.log(r.v)));
  const all = [...Object.keys(SRC_EXACT).map(Number).filter(z => z >= 29).map(z => ({ z, v: SRC_EXACT[z] })), ...ex.slice(1)];
  const fitAll = ols(all.map(r => Math.log(r.z)), all.map(r => Math.log(r.v)));
  const last = ex[ex.length - 1];
  log(`  OLS slope of ln Omega on ln z, z = 73..${last.z} (${ex.length} points): ${f(fitE.b, 4)} +/- ${f(fitE.se, 4)};  z = 29..${last.z} (${all.length} points): ${f(fitAll.b, 4)} +/- ${f(fitAll.se, 4)};  source 29..73: ${SRC_SLOPES.exact29_73[0]} +/- ${SRC_SLOPES.exact29_73[1]}`);
  log(`  log_z Omega at z = ${last.z}: ${f(Math.log(last.v) / Math.log(last.z), 4)};  sigma_model at z = ${last.z}: ${f(sigmaModel(last.z), 4)} (not a prediction for this object, see SEC D)`);
  log('');
  log('SEC F — OBJECT (B), THE CERTIFIED FAMILY AT p* = (47, 43), NEW LEVELS (exact integers; BigInt product)');
  log('   z        D            A1 (2ch, 4ch)                                 A2 (2ch, 4ch)                                 A1 A2        log_z    r = /model   step slope   sigma_model(mid)   excess');
  const cert = [{ z: 5e5, lnp: Math.log(SRC_CERT[9][2]) + Math.log(SRC_CERT[9][6]), prod: SRC_CERT[9][2] * SRC_CERT[9][6] }];
  for (const z of CERT_NEW) {
    prog(`certified z=${e3(z)} (sieving)`);
    const ps = primesBelowTyped(z); prog(`certified z=${e3(z)} (${ps.length} primes; counting)`);
    const c = certifiedFixed(z, ps);
    const lnp = lnBig(c.prod), prev = cert[cert.length - 1];
    const sl = (lnp - prev.lnp) / Math.log(z / prev.z), zm = Math.sqrt(z * prev.z);
    const r = Math.exp(lnp - Math.log(model(z)));
    cert.push({ z, lnp, sl, r });
    log(`  ${pad(e3(z), 9)}   ${e3(Math.pow(z, S))}   ${pad(c.A1.toString(), 16)} (${pad(c.c2a, 9)}, ${pad(c.c4a.toString(), 16)})   ${pad(c.A2.toString(), 16)} (${pad(c.c2b, 9)}, ${pad(c.c4b.toString(), 16)})   ${e3(Math.exp(lnp))}   ${f(lnp / Math.log(z), 4)}   ${pad(f(r, 4), 8)}     ${f(sl, 4)}        ${f(sigmaModel(zm), 4)}          ${f(sl - sigmaModel(zm), 4)}`);
  }
  log('');
  log('SEC G — SCORE AGAINST THE SEALED BANDS (mechanical; the bands are the constants tail 1 printed)');
  let hit = 0, miss = 0;
  for (const c of cert.slice(1)) { const [p, lo, hi] = SEAL_SIGMA[c.z]; const ok = c.sl >= lo && c.sl <= hi; ok ? hit++ : miss++;
    log(`  step slope ending ${pad(e3(c.z), 9)}: measured ${f(c.sl, 4)}  sealed ${f(p, 2)} [${f(lo, 2)}, ${f(hi, 2)}]  ${ok ? 'HIT' : 'MISS'}   (miss by ${f(ok ? 0 : (c.sl < lo ? c.sl - lo : c.sl - hi), 3)})`); }
  for (const c of cert.slice(1)) { const ok = c.r >= SEAL_RATIO[0] && c.r <= SEAL_RATIO[1]; ok ? hit++ : miss++; log(`  ratio at ${pad(e3(c.z), 9)}: r = ${f(c.r, 4)}  [${SEAL_RATIO[0]}, ${SEAL_RATIO[1]}]  ${ok ? 'HIT' : 'MISS'}`); }
  const c8 = cert.find(c => c.z === 1e8), c9 = cert.find(c => c.z === 1e9);
  if (c8 && c9) { const dec = (c9.lnp - c8.lnp) / Math.log(10); const v = dec < SEAL_DECADE.adverse ? 'ADVERSE to the exponent 16s/9 for this family' : dec < SEAL_DECADE.hitLo ? 'adverse-leaning, finite-size not excluded' : dec <= SEAL_DECADE.hitHi ? 'HIT' : 'faster than the model (not adverse to >>)';
    log(`  decade rule: mean slope over 1e8 -> 1e9 = ${f(dec, 4)} against sigma_model(3.16e8) = ${f(sigmaModel(3.162e8), 4)}: ${v}`); } else log('  decade rule: NOT SCORABLE (a level in 1e8..1e9 was not reached)');
  const hi7 = cert.filter(c => c.z >= 1e7);
  if (hi7.length >= 3) { const fk = ols(hi7.map(c => Math.log(c.z)), hi7.map(c => c.lnp)); log(`  kill rule: OLS slope over z >= 1e7 (${hi7.length} points) = ${f(fk.b, 4)} +/- ${f(fk.se, 4)}: ${fk.b + 2 * fk.se < 2 ? 'BELOW 2 BY MORE THAN 2 SE — ADVERSE' : 'not triggered'}`); } else log('  kill rule: NOT SCORABLE (fewer than 3 points at z >= 1e7)');
  const x1 = EXACT_NEW.filter(z => SRC_HILL[z]).map(z => { const v = ex.find(r => r.z === z).v; return `Omega(${z}) = ${v} >= ${SRC_HILL[z]} ${v >= SRC_HILL[z] ? 'ok' : 'FAIL'}`; });
  log('  X1 control: ' + x1.join('; '));
  { const ok = fitE.b >= SEAL_EXACT_SLOPE[1] && fitE.b <= SEAL_EXACT_SLOPE[2]; ok ? hit++ : miss++; log(`  X2: exact slope 73..${last.z} = ${f(fitE.b, 4)} against [${SEAL_EXACT_SLOPE[1]}, ${SEAL_EXACT_SLOPE[2]}]: ${ok ? 'HIT' : 'MISS'} (not a law test)`); }
  { const lg = Math.log(last.v) / Math.log(last.z); const ok = last.z === 113 && lg >= SEAL_EXACT_LOG113[0] && lg <= SEAL_EXACT_LOG113[1]; ok ? hit++ : miss++; log(`  X3: log_z Omega at z = ${last.z} = ${f(lg, 4)} against [${SEAL_EXACT_LOG113[0]}, ${SEAL_EXACT_LOG113[1]}]: ${ok ? 'HIT' : 'MISS'} (not a law test)`); }
  log(`  tally: ${hit} HIT, ${miss} MISS over ${hit + miss} sealed rows`);
  log('');
  log('DONE');
}

if (STAGE === 'seal') stageSeal(); else stageRun();

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --tail 1 research/history/staging/blind-0830-omega-floor.js -- --stage seal
//   invocation:  node research/history/staging/blind-0830-omega-floor.js --stage seal
//   code-sha256: edf15965594baad7e059680f1f7472a51a8e860c1a08ae05312cd3279abe201b
//   out-sha256:  3615034b6e638718173b2d65efaea4a401e2aa4dc773371556754a23a041cf7a
//   body-lines:  113
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     59.6 s
// ============================================================================
// blind-0830-omega-floor.js --stage seal
//
// SEC A — THE OBJECTS AND THE CONSTANTS
//   s = 1 + sqrt(e) + eta = 2.698721 (eta = 0.05), u0 = beta_2 - eta = 4.216450, D = z^s, W = P(z)
//   (A) Omega(z) = -min_r cc(r) = max over splits (P1, P2) of A1A2 + A1B2 + B1A2, A_i = lam+(prod P_i), B_i = -lam-(prod P_i), Rosser weights of level D (source sec.4.1)
//   (B) the certified sub-family: Q = primes in (47, z) split by index parity; A_i = # exit chains of length 2 and 4 in Q_i at p*_i (source S4b); Omega >= A1 A2
//   the derived law: Omega >> z^{16s/9}/ln^8 z, 16s/9 = 4.7977 (source sec.4.2, HELD); tested here through the local slope of ln Omega in ln z
//
// SEC B — CUSTODY, OBJECT (A): both engines against the source's exact Omega at z = 13..73 (lines 362-377)
//    z    k   |D+|   |D-|   viol   brute   pruned   source   A1   B1   A2   B2   leaves      pruned-P1   verdict
//   13    5     16     20     0       1        1        1    0    1    1   -1          12           2   MATCH
//   17    6     28     32     0       2        2        2    0    2    1   -1          28           4   MATCH
//   19    7     42     40     0       3        3        3    1    2    1    0          96          19   MATCH
//   23    8     44     60     0       6        6        6    3    0    1    1          88          49   MATCH
//   29    9     88     86     0      10       10       10   10    0    1    0         308         118   MATCH
//   31   10     92    102     0      18       18       18    9    0    1    1         424         253   MATCH
//   37   11    132    120     0      22       22       22   11    0    1    1        2824         511   MATCH
//   41   12    140    148     0      30       30       30   10    0    1    2        3616        1127   MATCH
//   43   13    180    180     0      45       45       45   15    0    1    2        6464        2655   MATCH
//   47   14    236    210     0      63       63       63   21    0    1    2       13600        5410   MATCH
//   53   15    252    282     0      86       86       86   21    2    1    3       13504       11015   MATCH
//   59   16    322    344     0     111      111      111   27    3    1    3       28608       22026   MATCH
//   61   17    336    390     0     134      134      134   26    4    1    4       55424       45332   MATCH
//   67   18    490    466     0     168      168      168   28    2    0    6      502144       95934   MATCH
//   71   19    516    546     0     205      205      205   39   10    1    4      935296      197074   MATCH
//   73   20    598    590     0     251      251      251   48   11    1    4     5943808      385651   MATCH
//   exact custody: 16 of 16 levels match the source digit for digit on both engines
//
// SEC C — CUSTODY, OBJECT (B): both engines (full p* loop) against the source's S4b rows (lines 411-420), plus two intermediate controls
//    z        engine   p*1   A1 (2ch, 4ch)                        p*2   A2 (2ch, 4ch)                        A1 A2        verdict
//      601   slow      23          300 (     300,          0)    29          300 (     300,          0)   9.000e+4    MATCH
//      601   fast      23          300 (     300,          0)    29          300 (     300,          0)   9.000e+4    MATCH
//     1000   slow      37          780 (     780,          0)    41          780 (     780,          0)   6.084e+5    MATCH
//     1000   fast      37          780 (     780,          0)    41          780 (     780,          0)   6.084e+5    MATCH
//     2000   slow      47         2536 (    2536,          0)    43         2456 (    2456,          0)   6.228e+6    MATCH
//     2000   fast      47         2536 (    2536,          0)    43         2456 (    2456,          0)   6.228e+6    MATCH
//     5000   slow      47        11017 (   10473,        544)    43        10500 (   10182,        318)   1.157e+8    MATCH
//     5000   fast      47        11017 (   10473,        544)    43        10500 (   10182,        318)   1.157e+8    MATCH
//    10000   slow      47        41668 (   28636,      13032)    43        36374 (   26969,       9405)   1.516e+9    MATCH
//    10000   fast      47        41668 (   28636,      13032)    43        36374 (   26969,       9405)   1.516e+9    MATCH
//    20000   slow      47       228508 (   72772,     155736)    43       190436 (   66742,     123694)   4.352e+10    MATCH
//    20000   fast      47       228508 (   72772,     155736)    43       190436 (   66742,     123694)   4.352e+10    MATCH
//    50000   slow      47      2713375 (  223343,    2490032)    43      2306291 (  185950,    2120341)   6.258e+12    MATCH
//    50000   fast      47      2713375 (  223343,    2490032)    43      2306291 (  185950,    2120341)   6.258e+12    MATCH
//   100000   slow      47     16969634 (  408073,   16561561)    43     14892829 (  284783,   14608046)   2.527e+14    MATCH
//   100000   fast      47     16969634 (  408073,   16561561)    43     14892829 (  284783,   14608046)   2.527e+14    MATCH
//   200000   slow      47    100547603 (  416879,  100130724)    43     90685180 (  139870,   90545310)   9.118e+15    MATCH
//   200000   fast      47    100547603 (  416879,  100130724)    43     90685180 (  139870,   90545310)   9.118e+15    MATCH
//   500000   slow      47    979017225 (       0,  979017225)    43    905294776 (       0,  905294776)   8.863e+17    MATCH
//   500000   fast      47    979017225 (       0,  979017225)    43    905294776 (       0,  905294776)   8.863e+17    MATCH
//   300000   slow      47    277906026 (  130907,  277775119)    43    253922014 (       0,  253922014)   7.057e+16    (control level, not in the source)
//   300000   fast      47    277906026 (  130907,  277775119)    43    253922014 (       0,  253922014)   7.057e+16    engines AGREE
//   400000   slow      47    566431363 (       0,  566431363)    43    521244815 (       0,  521244815)   2.952e+17    (control level, not in the source)
//   400000   fast      47    566431363 (       0,  566431363)    43    521244815 (       0,  521244815)   2.952e+17    engines AGREE
//   certified custody: 20 of 20 engine-rows match the source digit for digit
//   monotonicity in p* at z = 5e5, side 1 (the count is nondecreasing in p*, so the greedy choice is 47 then 43): 3:0 5:14686962 7:176579176 11:597075160 13:727003978 17:864507622 19:899460352 23:938519358 29:962910072 31:967048299 37:974307979 41:976835717 43:977723755 47:979017225
//
// SEC D — THE DERIVED LAW AT THE PLANNED LEVELS, THE FINITE-SIZE ARITHMETIC, AND THE SEALED BANDS
//   law: Omega >> z^{16s/9}/ln^8 z at s = 2.698721: exponent 16s/9 = 4.7977, 2s = 5.3974, u0 = 4.216450, beta_2 = 4.266450; 16(1+sqrt e)/9 = 4.7088
//   its local slope sigma_model(z) = 16s/9 - 8/ln z; the finite-size quantities are the cut-47 shares of the corner mass
//   (p3 side 47^2 D^{-2/9}, p4 side 47 D^{-1/9}: HEURISTIC, from the same construction) and the primes the family can use near D^{1/9}
//    z         ln z     8/ln z   sigma_model   D^{1/9}    #primes in (47, D^{1/9}]   47^2 D^{-2/9}   47 D^{-1/9}
//    5.000e+5   13.122   0.6096   4.1881           51.2            0                    0.8442          0.9188
//    1.000e+6   13.816   0.5791   4.2187           63.0            3                    0.5571          0.7464
//    2.000e+6   14.509   0.5514   4.2463           77.5            6                    0.3676          0.6063
//    5.000e+6   15.425   0.5186   4.2791          102.0           11                    0.2122          0.4606
//    1.000e+7   16.118   0.4963   4.3014          125.6           15                    0.1400          0.3742
//    2.000e+7   16.811   0.4759   4.3219          154.6           21                    0.0924          0.3040
//    5.000e+7   17.728   0.4513   4.3465          203.5           31                    0.0533          0.2309
//    1.000e+8   18.421   0.4343   4.3634          250.5           38                    0.0352          0.1876
//    2.000e+8   19.114   0.4185   4.3792          308.4           48                    0.0232          0.1524
//    5.000e+8   20.030   0.3994   4.3983          405.9           64                    0.0134          0.1158
//    1.000e+9   20.723   0.3860   4.4117          499.7           80                    0.0088          0.0941
//   saturation of the p3 term (p3 <= D^{1/9} <=> z >= p3^{9/s}): p3 = 53, 59, 61, 67, 71, 79, 89, 101, 127, 149, 199, 251 at z =
//     5.627e+5, 8.047e+5, 8.993e+5, 1.230e+6, 1.492e+6, 2.130e+6, 3.170e+6, 4.833e+6, 1.038e+7, 1.768e+7, 4.640e+7, 1.006e+8
//
//   the source's own certified points (quoted, S4b lines 411-420): ratio r = A1A2/model and the step slope
//    z         A1 A2         r = /model    step slope   sigma_model(mid)   excess
//    6.010e+2   9.000e+4     0.0118         --            --              --
//    1.000e+3   6.084e+5     0.0128       3.7533        3.5953          0.1580
//    2.000e+3   6.228e+6     0.0101       3.3558        3.6949         -0.3392
//    5.000e+3   1.157e+8     0.0057       3.1886        3.8051         -0.6164
//    1.000e+4   1.516e+9     0.0051       3.7117        3.8952         -0.1834
//    2.000e+4   4.352e+10     0.0093       4.8436        3.9606          0.8829
//    5.000e+4   6.258e+12     0.0336       5.4224        4.0256          1.3967
//    1.000e+5   2.527e+14     0.0801       5.3358        4.0813          1.2545
//    2.000e+5   9.118e+15     0.1658       5.1731        4.1232          1.0499
//    5.000e+5   8.863e+17     0.3545       4.9949        4.1660          0.8289
//
//   SEALED FORECAST, object (B), the certified family at p* = (47, 43), levels 1.000e+6 2.000e+6 5.000e+6 1.000e+7 2.000e+7 5.000e+7 1.000e+8 2.000e+8 5.000e+8 1.000e+9:
//    step ends at   sigma_model(mid)   point   band [lo, hi]     rule: HIT if the measured step slope lies in the band
//       1.000e+6       4.2038         4.70    [4.30, 5.10]
//       2.000e+6       4.2328         4.50    [4.10, 4.90]
//       5.000e+6       4.2632         4.40    [4.00, 4.80]
//       1.000e+7       4.2905         4.35    [3.95, 4.75]
//       2.000e+7       4.3118         4.35    [3.95, 4.75]
//       5.000e+7       4.3345         4.35    [3.95, 4.75]
//       1.000e+8       4.3551         4.35    [4.00, 4.70]
//       2.000e+8       4.3715         4.37    [4.05, 4.70]
//       5.000e+8       4.3890         4.39    [4.05, 4.70]
//       1.000e+9       4.4051         4.41    [4.05, 4.70]
//   ratio rule: r(z) = A1A2/model(z) inside [0.05, 2] at every new level is a HIT; below is adverse to the ln^8 model of this family, above says the model under-counts (not adverse to >>)
//   decade rule (the decisive row): mean slope over 1e8 -> 1e9: < 3.9 ADVERSE to the exponent 16s/9 for this family (finite-size shares there are below 0.2 and falling);
//     in [3.9, 4.05) adverse-leaning, finite-size not excluded; in [4.05, 4.7] HIT; above 4.7 faster than the model (not adverse to >>; the ln^8 is then wrong as a model)
//   kill rule (the brief's): OLS slope of ln(A1A2) on ln z over the points z >= 1e7 below 2 by more than 2 se is ADVERSE to the law; anything at z < 1e7 is finite-size (cut shares >= 0.14 and 0.37 there)
//   what the log correction does: 8/ln z = 0.61 -> 0.39 over 5e5 -> 1e9, so the law predicts 4.19 -> 4.41, never 4.80, at these z
//
//   SEALED FORECAST, object (A), the exact floor at z = 79, 83, 89, 97, 101, 103, 107, 109, 113 (the law makes NO prediction here: its dyadic box is empty below z ~ 1e5, lam+(P(z)) = 0 at every source level):
//    control X1: Omega(89) >= 684 and Omega(101) >= 1155 (the hill-climb splits are legal splits; a failure is an engine defect, not a measurement)
//    forecast X2: OLS slope of ln Omega on ln z over z = 73..113: point 4.1, band [3.4, 5.2] (from the source's 3.2825 +/- 0.1205 exact and 4.1394 +/- 0.0898 hill-climb slopes, and the floor forcing >= 5.06 over 73 -> 89)
//    forecast X3: log_z Omega at z = 113 in [1.5, 1.9]
//
// DONE (seal: nothing above z = 73 exact or z = 5e5 certified was computed)
// ============================================================================
// READINGS
//
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --node-flag --max-old-space-size=16000 --tail 2 research/history/staging/blind-0830-omega-floor.js -- --stage run
//   invocation:  node --max-old-space-size=16000 research/history/staging/blind-0830-omega-floor.js --stage run
//   code-sha256: edf15965594baad7e059680f1f7472a51a8e860c1a08ae05312cd3279abe201b
//   out-sha256:  1a0d68b1af3d413fd0bb4a39766ef243ed0309882f4728be5cb0b99a8433fcd0
//   body-lines:  58
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-30
//   elapsed:     2183.0 s
// ============================================================================
// blind-0830-omega-floor.js --stage run
//
// SEC E — OBJECT (A), EXACT Omega AT THE NEW LEVELS (pruned engine; viol re-checked at every level)
//    z    k   |D+|   |D-|   viol   Omega    log_z Omega   A1    B1    A2    B2   |P1|  |P2|  p*1  p*2   step slope   floor (hill-climb)
//    79   21    638    678     0      285    1.2936       15     6     0    19     7    12    19    5     1.608       --
//    83   22    756    758     0      441    1.3780       21     7     0    21     8    12    19    5     8.838       --
//    89   23    818    900     0      684    1.4543       36     4     0    19    10    11    17    5     6.289       684 ok
//    97   24   1084   1066     0      990    1.5078       55     4     0    18    12    10    17    5     4.296       --
//   101   25   1140   1154     0     1155    1.5280       55     3     0    21    12    11    17    5     3.815       1155 ok
//   103   26   1152   1224     0     1320    1.5503       55     2     0    24    12    12    17    5     6.810       --
//   107   27   1202   1362     0     1485    1.5629       55     0     0    27    12    13    17    5     3.091       --
//   109   28   1352   1412     0     1782    1.5956       66     1     0    27    13    13    17    5     9.845       --
//   113   29   1404   1514     0     1980    1.6057       66     0     0    30    13    14    17    5     2.923       --
//   OLS slope of ln Omega on ln z, z = 73..113 (10 points): 4.9996 +/- 0.1895;  z = 29..113 (21 points): 3.7961 +/- 0.1071;  source 29..73: 3.2825 +/- 0.1205
//   log_z Omega at z = 113: 1.6057;  sigma_model at z = 113: 3.1055 (not a prediction for this object, see SEC D)
//
// SEC F — OBJECT (B), THE CERTIFIED FAMILY AT p* = (47, 43), NEW LEVELS (exact integers; BigInt product)
//    z        D            A1 (2ch, 4ch)                                 A2 (2ch, 4ch)                                 A1 A2        log_z    r = /model   step slope   sigma_model(mid)   excess
//    1.000e+6   1.557e+16         5216382404 (        0,       5216382404)         4889363473 (        0,       4889363473)   2.550e+19   3.2344     0.5536     4.8468        4.2038          0.6431
//    2.000e+6   1.011e+17        26828586236 (        0,      26828586236)        25416689859 (        0,      25416689859)   6.819e+20   3.3064     0.7873     4.7407        4.2328          0.5079
//    5.000e+6   1.199e+18       224658333904 (        0,     224658333904)       215181948337 (        0,     215181948337)   4.834e+22   3.3862     1.1228     4.6505        4.2632          0.3873
//    1.000e+7   7.781e+18      1096396093883 (        0,    1096396093883)      1056681898949 (        0,    1056681898949)   1.159e+24   3.4377     1.3751     4.5829        4.2905          0.2924
//    2.000e+7   5.052e+19      5274906314049 (        0,    5274906314049)      5101550763864 (        0,    5101550763864)   2.691e+25   3.4831     1.6083     4.5378        4.3118          0.2259
//    5.000e+7   5.989e+20     41309965143494 (        0,   41309965143494)     40012859244604 (        0,   40012859244604)   1.653e+27   3.5353     1.8616     4.4940        4.3345          0.1595
//    1.000e+8   3.888e+21    193920602255711 (        0,  193920602255711)    187648086463950 (        0,  187648086463950)   3.639e+28   3.5701     2.0026     4.4604        4.3551          0.1053
//    2.000e+8   2.524e+22    902937117665387 (        0,  902937117665387)    872147755462119 (        0,  872147755462119)   7.875e+29   3.6015     2.0939     4.4357        4.3715          0.0643
//    5.000e+8   2.993e+23   6826392447256549 (        0, 6826392447256549)   6562672031213581 (        0, 6562672031213581)   4.480e+31   3.6385     2.1353     4.4103        4.3890          0.0213
//    1.000e+9   1.943e+24   31271556429270830 (        0, 31271556429270830)   29903474814165353 (        0, 29903474814165353)   9.351e+32   3.6634     2.1038     4.3836        4.4051          -0.0215
//
// SEC G — SCORE AGAINST THE SEALED BANDS (mechanical; the bands are the constants tail 1 printed)
//   step slope ending  1.000e+6: measured 4.8468  sealed 4.70 [4.30, 5.10]  HIT   (miss by 0.000)
//   step slope ending  2.000e+6: measured 4.7407  sealed 4.50 [4.10, 4.90]  HIT   (miss by 0.000)
//   step slope ending  5.000e+6: measured 4.6505  sealed 4.40 [4.00, 4.80]  HIT   (miss by 0.000)
//   step slope ending  1.000e+7: measured 4.5829  sealed 4.35 [3.95, 4.75]  HIT   (miss by 0.000)
//   step slope ending  2.000e+7: measured 4.5378  sealed 4.35 [3.95, 4.75]  HIT   (miss by 0.000)
//   step slope ending  5.000e+7: measured 4.4940  sealed 4.35 [3.95, 4.75]  HIT   (miss by 0.000)
//   step slope ending  1.000e+8: measured 4.4604  sealed 4.35 [4.00, 4.70]  HIT   (miss by 0.000)
//   step slope ending  2.000e+8: measured 4.4357  sealed 4.37 [4.05, 4.70]  HIT   (miss by 0.000)
//   step slope ending  5.000e+8: measured 4.4103  sealed 4.39 [4.05, 4.70]  HIT   (miss by 0.000)
//   step slope ending  1.000e+9: measured 4.3836  sealed 4.41 [4.05, 4.70]  HIT   (miss by 0.000)
//   ratio at  1.000e+6: r = 0.5536  [0.05, 2]  HIT
//   ratio at  2.000e+6: r = 0.7873  [0.05, 2]  HIT
//   ratio at  5.000e+6: r = 1.1228  [0.05, 2]  HIT
//   ratio at  1.000e+7: r = 1.3751  [0.05, 2]  HIT
//   ratio at  2.000e+7: r = 1.6083  [0.05, 2]  HIT
//   ratio at  5.000e+7: r = 1.8616  [0.05, 2]  HIT
//   ratio at  1.000e+8: r = 2.0026  [0.05, 2]  MISS
//   ratio at  2.000e+8: r = 2.0939  [0.05, 2]  MISS
//   ratio at  5.000e+8: r = 2.1353  [0.05, 2]  MISS
//   ratio at  1.000e+9: r = 2.1038  [0.05, 2]  MISS
//   decade rule: mean slope over 1e8 -> 1e9 = 4.4099 against sigma_model(3.16e8) = 4.3890: HIT
//   kill rule: OLS slope over z >= 1e7 (7 points) = 4.4522 +/- 0.0114: not triggered
//   X1 control: Omega(89) = 684 >= 684 ok; Omega(101) = 1155 >= 1155 ok
//   X2: exact slope 73..113 = 4.9996 against [3.4, 5.2]: HIT (not a law test)
//   X3: log_z Omega at z = 113 = 1.6057 against [1.5, 1.9]: HIT (not a law test)
//   tally: 18 HIT, 4 MISS over 22 sealed rows
//
// DONE
// ============================================================================
// READINGS
// ============================================================================
// (written in blind-0830-omega-floor.md after both tails were bound; the
//  script carries none of its own so that no figure can precede its run)
