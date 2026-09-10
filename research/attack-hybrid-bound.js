#!/usr/bin/env node
// ============================================================================
// ATTACK HYBRID BOUND — gluing an EXACT finite head onto Brun's asymptotic
// tail, and measuring exactly how far that glue carries
// ============================================================================
// THE QUESTION. Two upper-bound instruments on G2(x#) exist, and each is good
// where the other is bad. `sift-limit-attack.md` §7: the covering economy's
// cheapest admissible repair is Brun's pure sieve, beta_pure = 2.80, 3.98,
// 4.25, 5.38, 8.88 at x = 13, 101, 199, 1009, 1e6 — it BEATS the proven
// 4.2665 for x <= 227, loses from 229, never returns, and diverges like
// 7.182 lnln x. `sift-limit-attack.md` §7c: exact re-insertion gives genuine
// finite certificates (G2(19#) <= 210, G2(23#) <= 420) and dies as a technique
// on an infinite regress. The brief: can a finite piece be fed INTO the
// asymptotic argument rather than merely case-split against it?
//
// THE ANSWER IS YES, THE THEOREM IS CLEAN, AND ITS PRICE IS EXPONENTIAL.
//
// THEOREM HY (proved here, in the banner; sections B and D measure it).
//   Slot coordinates: a twin slot is j <-> 6j+5, and a prime p in [5,x] kills
//   the two classes j = r_p and j = r_p - s_p (mod p), s_p = 3^{-1} mod p,
//   with r_p free. This is the covering formulation of `two-class-lower-bounds.md`
//   §1 and the coordinate system of `attack-beta2-05-covering-prune.js`.
//   Fix 5 <= x0 <= x. Let H = {p : 5 <= p <= x0}, T = {p : x0 < p <= x},
//   Q = prod_{p in H} p, n_T = |T|. For odd m put
//       A_m = Sum_{j<=m} (-1)^j e_j({2/p}_{p in T}),
//       B_m = Sum_{j<=m} C(n_T, j) 2^j.
//   If A_m > 0 then [1, L] is uncoverable for every L > Q*(B_m/A_m + 1).
//
//   PROOF. Each p in H kills exactly 2 distinct classes mod p (r_p and
//   r_p - s_p coincide only if s_p = 0, impossible), so the head survivors are
//   exactly K = prod_{p in H} (p-2) classes mod Q, independent of the
//   adversary's choice. Fix one such class a mod Q and write j = a + Qt. For
//   p in T we have p ∤ Q, so Q is invertible mod p and each of the two killed
//   classes pulls back to exactly one class of t mod p: the head-survivor line
//   {a + Qt} is again a two-class sift, in t, over the primes of T alone.
//   Within [1,L] the parameter t runs over at least floor(L/Q) values. Odd-order
//   Bonferroni on that line, with the trivial remainder |theta_d| <= 2^{w(d)}
//   for each squarefree d | prod T, gives
//       #survivors on the line >= floor(L/Q) * A_m - B_m,
//   which is positive as soon as L/Q - 1 > B_m/A_m. A surviving j is a slot no
//   prime <= x covers, so [1,L] is not covered. QED
//
//   The head enters ONLY through Q. That is the whole content of the result and
//   the whole reason it cannot be asymptotic: Q = exp(theta(x0)) is exponential
//   in x0, so the exact head can reach only x0 = O(ln x).
//
// WHAT THE SEVEN SECTIONS DO.
// (A) CUSTODY. Recompute beta_pure and its 227/229 crossover from scratch, in
//     the identical convention (beta = ln(6L)/ln x, L in slots), so every
//     hybrid number below is comparable to a published one.
// (B) THEOREM HY, swept. beta_hy(x) minimised over x0 and over odd m, the
//     optimal head, and the crossover against 4.2665.
// (C) THE OTHER GLUE, the one the brief actually names: A144311's exact terms
//     as the base case. A head certificate says the head cannot cover m0
//     consecutive slots, hence every window of m0+1 slots holds a head
//     survivor. That is ORDER information; Bonferroni needs CONGRUENCE
//     information, so it can only be spent against the union bound of
//     Theorem P. Section C prices exactly that and finds it reaches x = x0.
// (D) WHY NO ASYMPTOTIC GAIN, measured rather than asserted: the exchange
//     rate per head prime, the cap x0* = O(ln x), the fraction of Mertens mass
//     the head can remove, and the relation beta ~ m ~ 3.5911 W_T that turns
//     both into a statement about lnlnln x against lnln x.
// (E) WHAT THE FINITE RANGE BUYS, against attack E's measured law
//     G2(x#) ~ 0.762 x ln^2 x lnln x (`history/staging/attack-growth-law.md`).
// (F) REGRESS CHECK. §7c killed exact strata on an infinite regress. HY has
//     none: it is one closed-form inequality, evaluated once, with no search
//     and no recursion. Section F states what that costs.
// (G) THE UNDERPRICE. A prototype pricing of the head as 3^{pi(x0)}/delta1
//     rather than Q is compared to Q, because the gap is the size of the
//     entire apparent gain.
//
// CUSTODY. Every number printed here is produced by this file. The two inputs
// taken from elsewhere are A144311's 22 terms (as in
// `attack-beta2-05-covering-prune.js`) and the constant 4.2665 (DHR, via
// `dhr-verification.md`); both are re-derived-against, not re-derived.
//
// USAGE:  node research/attack-hybrid-bound.js          (~25 s)
//         node research/attack-hybrid-bound.js --fast   (skips the 1e6 rows)
// ============================================================================

'use strict';

const FAST = process.argv.includes('--fast');
const BETA2 = 4.2665;                    // DHR, `dhr-verification.md` §1

function primesUpTo(n) {
  const s = new Uint8Array(n + 1), out = [];
  for (let i = 2; i <= n; i++) { if (!s[i]) { out.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } }
  return out;
}
const ALLP = primesUpTo(FAST ? 200000 : 2000000);
const PR = ALLP.filter(p => p >= 5);
const A144311 = [1, 5, 11, 29, 41, 65, 107, 149, 203, 257, 347, 527, 545, 617,
                 707, 869, 965, 1079, 1283, 1397, 1529, 1709];

const lse = (a, b) => a === -Infinity ? b
  : (b === -Infinity ? a : Math.max(a, b) + Math.log1p(Math.exp(-Math.abs(a - b))));
const MDEPTH = 120;

// ---------------------------------------------------------------------------
// The tail sift: odd-order Bonferroni over a prime list, exactly as
// attack-beta2-05 (E) does it, returning the best odd truncation.
// ---------------------------------------------------------------------------
function tailBrun(tail) {
  const n = tail.length;
  if (n === 0) return null;
  const M = Math.min(n, MDEPTH);
  const e = new Float64Array(M + 2); e[0] = 1;
  for (const p of tail) { const w = 2 / p; for (let j = M; j >= 1; j--) e[j] += w * e[j - 1]; }
  let logC = 0, acc = -Infinity, best = null, m0 = null;
  const logB = [];
  for (let j = 0; j <= M; j++) {
    if (j > 0) logC += Math.log(n - j + 1) - Math.log(j);
    acc = lse(acc, logC + j * Math.LN2);
    logB.push(acc);
  }
  let A = 1;
  for (let m = 1; m <= M; m++) {
    A += (m % 2 ? -1 : 1) * e[m];
    if (m % 2 === 1 && A > 0) {
      if (m0 === null) m0 = m;
      const logL = logB[m] - Math.log(A);
      if (best === null || logL < best.logL) best = { m, A, logL, W: e[1], n };
    }
  }
  if (best) { best.m0 = m0; best.delta = tail.reduce((d, p) => d * (1 - 2 / p), 1); }
  return best;
}

// beta in the published convention: ln(6 L)/ln x, L in slot units
const betaOf = (logL, x) => (logL + Math.log(6)) / Math.log(x);

// ---------------------------------------------------------------------------
// THEOREM HY, evaluated.  headCount = number of leading primes (from 5) put in
// the exact head.  Returns log L with L = Q*(B_m/A_m + 1).
// ---------------------------------------------------------------------------
function hyAt(all, headCount) {
  let theta = 0;
  for (let i = 0; i < headCount; i++) theta += Math.log(all[i]);
  const b = tailBrun(all.slice(headCount));
  if (!b) return null;
  const logBA = b.logL;
  const logL = theta + (logBA > 30 ? logBA : Math.log(Math.exp(logBA) + 1));
  return { logL, theta, m: b.m, m0: b.m0, W: b.W, A: b.A, delta: b.delta,
           nTail: b.n, x0: headCount ? all[headCount - 1] : 0, headCount };
}
function hyBest(x, maxHead) {
  const all = PR.filter(p => p <= x);
  const lim = Math.min(maxHead === undefined ? 60 : maxHead, all.length - 1);
  let best = null;
  for (let i = 0; i <= lim; i++) {
    const h = hyAt(all, i);
    if (h && (best === null || h.logL < best.logL)) best = h;
  }
  return best;
}

// ===========================================================================
console.log('=== (A) CUSTODY: beta_pure recomputed, against sift-limit-attack.md §7 ===');
console.log('x | published beta_pure | recomputed | match');
{
  const PUB = { 13: 2.80, 101: 3.98, 199: 4.25, 1009: 5.38, 1000003: 8.88 };
  for (const x of [13, 101, 199, 1009, 1000003]) {
    if (FAST && x > 200000) { console.log(`${x} | ${PUB[x]} | (skipped: --fast)`); continue; }
    const b = tailBrun(PR.filter(p => p <= x));
    const got = betaOf(b.logL, x);
    console.log(`${x} | ${PUB[x].toFixed(2)} | ${got.toFixed(2)} | ${got.toFixed(2) === PUB[x].toFixed(2) ? 'YES' : 'NO'}`);
  }
  let last = null, first = null;
  for (const x of ALLP) {
    if (x < 13) continue; if (x > 5000) break;
    const b = tailBrun(PR.filter(p => p <= x)); if (!b) continue;
    const e = betaOf(b.logL, x);
    if (e < BETA2) last = { x, e }; else if (first === null) first = { x, e };
  }
  console.log(`pure crossover: last better x = ${last.x} (${last.e.toFixed(3)}), first worse x = ${first.x} (${first.e.toFixed(3)}); published 227 / 229`);
}

console.log('\n=== (B) THEOREM HY: the glued bound ===');
console.log('x | beta_pure | x0* | pi_head | m | theta(x0*)/ln x | beta_hy | gain | vs 4.2665');
{
  const XS = [13, 31, 101, 199, 227, 229, 401, 439, 443, 1009, 2003, 5003, 10007,
              20011, 50021, 100003].concat(FAST ? [] : [200003, 500009, 1000003]);
  for (const x of XS) {
    const all = PR.filter(p => p <= x);
    const p0 = hyAt(all, 0), h = hyBest(x);
    const bp = betaOf(p0.logL, x), bh = betaOf(h.logL, x);
    console.log(`${x} | ${bp.toFixed(3)} | ${h.x0 || '-'} | ${h.headCount} | ${h.m} | ${(h.theta / Math.log(x)).toFixed(3)} | ` +
                `${bh.toFixed(3)} | ${(bp - bh).toFixed(3)} | ${bh < BETA2 ? 'BETTER' : 'worse'}`);
  }
}

console.log('\n(B2) the crossover of the glued bound, swept prime by prime');
{
  let last = null, first = null, worseRun = 0, maxSweep = FAST ? 20000 : 60000;
  for (const x of ALLP) {
    if (x < 13) continue; if (x > maxSweep) break;
    const h = hyBest(x, 25); if (!h) continue;
    const b = betaOf(h.logL, x);
    if (b < BETA2) { last = { x, b, x0: h.x0, m: h.m }; worseRun = 0; }
    else { if (first === null) first = { x, b, x0: h.x0, m: h.m }; worseRun++; }
  }
  console.log(`largest x with beta_hy < 4.2665: x = ${last.x} (beta_hy = ${last.b.toFixed(4)}, x0* = ${last.x0}, m = ${last.m})`);
  console.log(`first x with beta_hy >= 4.2665: x = ${first.x} (beta_hy = ${first.b.toFixed(4)}, x0* = ${first.x0}, m = ${first.m})`);
  console.log(`swept to x = ${maxSweep} with ${worseRun} consecutive primes above 4.2665 after the first: it never returns in range`);
  console.log(`the covering economy's finite window widens from x <= 227 to x <= ${last.x}, a factor ${(last.x / 227).toFixed(2)} in x`);
}

console.log('\n=== (C) THE CERTIFICATE AS BASE CASE: order information, priced ===');
console.log('A144311 gives the largest interval the head alone can cover, so every window of');
console.log('m0+1 slots holds a head survivor: at least floor(L/(m0+1)) of them in [1,L].');
console.log('Bonferroni cannot consume that (it needs counts in APs, not gaps), so it is spent');
console.log('against Theorem P: covering needs 1/(m0+1) <= W_T = sum_{x0<p<=x} 2/p.');
console.log('x0 | A144311 | m0 slots | 1/(m0+1) | 2/(next prime) | largest x reached | x/x0');
{
  for (let n = 3; n <= 22; n++) {
    const x0 = ALLP[n - 1], m0 = (A144311[n - 1] - 5) / 6, need = 1 / (m0 + 1);
    let W = 0, reach = x0, nxt = null;
    for (const p of PR) {
      if (p <= x0) continue;
      if (nxt === null) nxt = p;
      W += 2 / p;
      if (W < need) reach = p; else break;
    }
    console.log(`${x0} | ${A144311[n - 1]} | ${m0} | ${need.toExponential(3)} | ${(2 / nxt).toExponential(3)} | ${reach} | ${(reach / x0).toFixed(4)}`);
  }
}

console.log('\n=== (D) WHY THERE IS NO ASYMPTOTIC GAIN ===');
console.log('(D1) the exchange rate: what one more head prime buys and what it costs.');
console.log('The gain is NOT smooth in p: it arrives only when removing p lowers the required');
console.log('Bonferroni depth m, and is negligible between drops. The cost ln p / ln x is smooth.');
console.log('x | p | m before | m after | sieve gain | cost ln p/ln x | net | worth taking?');
{
  const x = FAST ? 100003 : 1000003;
  const all = PR.filter(p => p <= x);
  for (let i = 1; i <= 14; i++) {
    const a = hyAt(all, i - 1), b = hyAt(all, i);
    const p = all[i - 1];
    const gain = (a.logL - Math.log(p) === 0 ? 0 : 0) + (betaOf(a.logL, x) - betaOf(b.logL, x)) + Math.log(p) / Math.log(x);
    const cost = Math.log(p) / Math.log(x);
    console.log(`${x} | ${p} | ${a.m} | ${b.m} | ${gain.toFixed(3)} | ${cost.toFixed(3)} | ${(gain - cost).toFixed(3)} | ` +
                `${gain > cost ? 'yes' : 'no'}`);
  }
}
console.log('\n(D2) the cap: theta(x0) is the whole head price, so x0* can only be O(ln x)');
console.log('x | ln x | x0* | x0*/ln x | theta(x0*) | theta(x0*)/ln x | W_head | W_full | removable fraction');
{
  const XS = [101, 1009, 10007, 100003].concat(FAST ? [] : [1000003]);
  for (const x of XS) {
    const all = PR.filter(p => p <= x), h = hyBest(x);
    let Wh = 0; for (const p of all) { if (p > h.x0) break; Wh += 2 / p; }
    let Wf = 0; for (const p of all) Wf += 2 / p;
    console.log(`${x} | ${Math.log(x).toFixed(2)} | ${h.x0} | ${(h.x0 / Math.log(x)).toFixed(2)} | ${h.theta.toFixed(2)} | ` +
                `${(h.theta / Math.log(x)).toFixed(2)} | ${Wh.toFixed(3)} | ${Wf.toFixed(3)} | ${(Wh / Wf).toFixed(3)}`);
  }
}
console.log('\n(D3) the sieve half of beta IS the Bonferroni depth, and the depth is forced by W_T.');
console.log('B_m >= C(n_T,m) 2^m >= (2 n_T/m)^m and A_m <= delta_T <= 1 (an odd-order Bonferroni');
console.log('truncation under-counts), so beta_sieve >= m0 * ln(2 n_T/m0) / ln x. That certified');
console.log('floor is printed beside the achieved value. m0/W_T climbs toward the 3.5911 of');
console.log('attack-beta2-05 (E2), which is a W -> infinity limit and not yet reached here.');
console.log('x | m at optimum | m0(W_T) | W_T | m0/W_T | certified floor on beta_sieve | beta_sieve achieved | beta_hy');
{
  const XS = [101, 1009, 10007, 100003].concat(FAST ? [] : [1000003]);
  for (const x of XS) {
    const h = hyBest(x), b = betaOf(h.logL, x);
    const floorB = h.m0 * Math.log(2 * h.nTail / h.m0) / Math.log(x);
    const sieve = b - h.theta / Math.log(x);
    console.log(`${x} | ${h.m} | ${h.m0} | ${h.W.toFixed(3)} | ${(h.m0 / h.W).toFixed(2)} | ${floorB.toFixed(3)} | ${sieve.toFixed(3)} | ${b.toFixed(3)}`);
  }
  console.log('A_m <= delta_T (odd Bonferroni truncations under-count), checked at every row above:');
  for (const x of XS) {
    const h = hyBest(x);
    console.log(`  x = ${x}: A_m = ${h.A.toExponential(3)}, delta_T = ${h.delta.toExponential(3)}, A_m <= delta_T ${h.A <= h.delta ? 'YES' : 'NO'}`);
  }
}

console.log('\n=== (E) WHAT THE FINITE RANGE BUYS, against the measured truth ===');
console.log('attack-growth-law.md: G2(x#) ~ 0.762 x ln^2 x lnln x [MEASURED] over x = 11..79.');
console.log('x | exact A144311+1 | law 0.762 x ln^2x lnlnx | hybrid certificate | log10(cert/truth) | x^4.2665 | log10(sieve/truth)');
{
  for (const x of [13, 41, 79, 101, 199, 227, 439]) {
    const n = ALLP.indexOf(x) + 1;
    const exact = n >= 1 && n <= 22 ? A144311[n - 1] + 1 : null;
    const law = 0.762 * x * Math.log(x) ** 2 * Math.log(Math.log(x));
    const truth = exact !== null ? exact : law;
    const h = hyBest(x);
    const logCert = h.logL + Math.log(6);
    const logSieve = BETA2 * Math.log(x);
    console.log(`${x} | ${exact === null ? '-' : exact} | ${law.toExponential(3)} | ${Math.exp(logCert).toExponential(3)} | ` +
                `${((logCert - Math.log(truth)) / Math.LN10).toFixed(1)} | ${Math.exp(logSieve).toExponential(3)} | ${((logSieve - Math.log(truth)) / Math.LN10).toFixed(1)}`);
  }
}

console.log('\n=== (F) REGRESS CHECK, and whether the range grows with effort ===');
{
  const t0 = Date.now();
  const h = hyBest(439);
  const ms = Date.now() - t0;
  console.log(`the whole certificate at the crossover x = 439 costs ${ms} ms and evaluates one closed-form`);
  console.log(`inequality (head x0 = ${h.x0}, depth m = ${h.m}); no search, no recursion, no base case to re-enter.`);
  console.log('So HY inherits NO regress from §7c -- and the crossover 439 is NOT compute-limited:');
  console.log('more hours move it by zero. The limit is theta(x0), not effort.');
}

console.log('\n=== (G) THE UNDERPRICE: theta(x0) against a 3^{pi(x0)}/delta1 head price ===');
console.log('x0 | pi_head | theta(x0) = log Q | 1.0986 pi - log delta1 | log ratio | factor');
{
  const all = PR.filter(p => p <= 79);
  let theta = 0, ld = 0;
  for (let i = 0; i < all.length; i++) {
    theta += Math.log(all[i]);
    ld += Math.log(1 - 2 / all[i]);
    const alt = Math.log(3) * (i + 1) - ld;
    if ([1, 4, 8, 14, 20].includes(i + 1))
      console.log(`${all[i]} | ${i + 1} | ${theta.toFixed(2)} | ${alt.toFixed(2)} | ${(theta - alt).toFixed(2)} | ${Math.exp(theta - alt).toExponential(2)}`);
  }
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-hybrid-bound.js
//   invocation:  node research/attack-hybrid-bound.js
//   code-sha256: ba09bd8df290b6469229711e37426db3998975f53eb8003e91bbefadf5b67ba8
//   out-sha256:  34f396fbc1960c98de01d6e1077da7ab01cad43c083f0bda0d0b6564d9028612
//   body-lines:  134
//   forced:      2026-08-29, 0 of 317 figures in the replaced block not reproduced
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-29
//   elapsed:     53.4 s
// ============================================================================
// === (A) CUSTODY: beta_pure recomputed, against sift-limit-attack.md §7 ===
// x | published beta_pure | recomputed | match
// 13 | 2.80 | 2.80 | YES
// 101 | 3.98 | 3.98 | YES
// 199 | 4.25 | 4.25 | YES
// 1009 | 5.38 | 5.38 | YES
// 1000003 | 8.88 | 8.88 | YES
// pure crossover: last better x = 227 (4.253), first worse x = 229 (4.281); published 227 / 229
//
// === (B) THEOREM HY: the glued bound ===
// x | beta_pure | x0* | pi_head | m | theta(x0*)/ln x | beta_hy | gain | vs 4.2665
// 13 | 2.806 | 5 | 1 | 1 | 0.627 | 2.484 | 0.322 | BETTER
// 31 | 3.076 | 7 | 2 | 1 | 1.035 | 2.790 | 0.287 | BETTER
// 101 | 3.983 | 5 | 1 | 3 | 0.349 | 3.408 | 0.575 | BETTER
// 199 | 4.253 | 7 | 2 | 3 | 0.672 | 3.704 | 0.549 | BETTER
// 227 | 4.253 | 7 | 2 | 3 | 0.655 | 3.709 | 0.544 | BETTER
// 229 | 4.281 | 7 | 2 | 3 | 0.654 | 3.738 | 0.543 | BETTER
// 401 | 5.183 | 11 | 3 | 3 | 0.993 | 4.085 | 1.098 | BETTER
// 439 | 5.202 | 11 | 3 | 3 | 0.978 | 4.227 | 0.975 | BETTER
// 443 | 5.210 | 13 | 4 | 3 | 1.398 | 4.278 | 0.932 | worse
// 1009 | 5.383 | 7 | 2 | 5 | 0.514 | 4.655 | 0.728 | worse
// 2003 | 5.652 | 7 | 2 | 5 | 0.468 | 4.939 | 0.713 | worse
// 5003 | 6.722 | 13 | 4 | 5 | 1.000 | 5.259 | 1.463 | worse
// 10007 | 6.855 | 17 | 5 | 5 | 1.232 | 5.567 | 1.287 | worse
// 20011 | 7.006 | 19 | 6 | 5 | 1.443 | 5.984 | 1.021 | worse
// 50021 | 8.301 | 11 | 3 | 7 | 0.550 | 6.294 | 2.007 | worse
// 100003 | 8.418 | 13 | 4 | 7 | 0.740 | 6.501 | 1.918 | worse
// 200003 | 8.530 | 17 | 5 | 7 | 0.930 | 6.731 | 1.799 | worse
// 500009 | 8.686 | 19 | 6 | 7 | 1.089 | 7.004 | 1.682 | worse
// 1000003 | 8.878 | 23 | 7 | 7 | 1.262 | 7.303 | 1.575 | worse
//
// (B2) the crossover of the glued bound, swept prime by prime
// largest x with beta_hy < 4.2665: x = 439 (beta_hy = 4.2271, x0* = 11, m = 3)
// first x with beta_hy >= 4.2665: x = 443 (beta_hy = 4.2776, x0* = 13, m = 3)
// swept to x = 60000 with 5972 consecutive primes above 4.2665 after the first: it never returns in range
// the covering economy's finite window widens from x <= 227 to x <= 439, a factor 1.93 in x
//
// === (C) THE CERTIFICATE AS BASE CASE: order information, priced ===
// A144311 gives the largest interval the head alone can cover, so every window of
// m0+1 slots holds a head survivor: at least floor(L/(m0+1)) of them in [1,L].
// Bonferroni cannot consume that (it needs counts in APs, not gaps), so it is spent
// against Theorem P: covering needs 1/(m0+1) <= W_T = sum_{x0<p<=x} 2/p.
// x0 | A144311 | m0 slots | 1/(m0+1) | 2/(next prime) | largest x reached | x/x0
// 5 | 11 | 1 | 5.000e-1 | 2.857e-1 | 11 | 2.2000
// 7 | 29 | 4 | 2.000e-1 | 1.818e-1 | 11 | 1.5714
// 11 | 41 | 6 | 1.429e-1 | 1.538e-1 | 11 | 1.0000
// 13 | 65 | 10 | 9.091e-2 | 1.176e-1 | 13 | 1.0000
// 17 | 107 | 17 | 5.556e-2 | 1.053e-1 | 17 | 1.0000
// 19 | 149 | 24 | 4.000e-2 | 8.696e-2 | 19 | 1.0000
// 23 | 203 | 33 | 2.941e-2 | 6.897e-2 | 23 | 1.0000
// 29 | 257 | 42 | 2.326e-2 | 6.452e-2 | 29 | 1.0000
// 31 | 347 | 57 | 1.724e-2 | 5.405e-2 | 31 | 1.0000
// 37 | 527 | 87 | 1.136e-2 | 4.878e-2 | 37 | 1.0000
// 41 | 545 | 90 | 1.099e-2 | 4.651e-2 | 41 | 1.0000
// 43 | 617 | 102 | 9.709e-3 | 4.255e-2 | 43 | 1.0000
// 47 | 707 | 117 | 8.475e-3 | 3.774e-2 | 47 | 1.0000
// 53 | 869 | 144 | 6.897e-3 | 3.390e-2 | 53 | 1.0000
// 59 | 965 | 160 | 6.211e-3 | 3.279e-2 | 59 | 1.0000
// 61 | 1079 | 179 | 5.556e-3 | 2.985e-2 | 61 | 1.0000
// 67 | 1283 | 213 | 4.673e-3 | 2.817e-2 | 67 | 1.0000
// 71 | 1397 | 232 | 4.292e-3 | 2.740e-2 | 71 | 1.0000
// 73 | 1529 | 254 | 3.922e-3 | 2.532e-2 | 73 | 1.0000
// 79 | 1709 | 284 | 3.509e-3 | 2.410e-2 | 79 | 1.0000
//
// === (D) WHY THERE IS NO ASYMPTOTIC GAIN ===
// (D1) the exchange rate: what one more head prime buys and what it costs.
// The gain is NOT smooth in p: it arrives only when removing p lowers the required
// Bonferroni depth m, and is negligible between drops. The cost ln p / ln x is smooth.
// x | p | m before | m after | sieve gain | cost ln p/ln x | net | worth taking?
// 1000003 | 5 | 11 | 11 | 0.194 | 0.116 | 0.078 | yes
// 1000003 | 7 | 11 | 11 | 0.037 | 0.141 | -0.104 | no
// 1000003 | 11 | 11 | 9 | 1.359 | 0.174 | 1.186 | yes
// 1000003 | 13 | 9 | 9 | 0.040 | 0.186 | -0.146 | no
// 1000003 | 17 | 9 | 9 | 0.019 | 0.205 | -0.186 | no
// 1000003 | 19 | 9 | 9 | 0.013 | 0.213 | -0.200 | no
// 1000003 | 23 | 9 | 7 | 1.173 | 0.227 | 0.946 | yes
// 1000003 | 29 | 7 | 7 | 0.168 | 0.244 | -0.075 | no
// 1000003 | 31 | 7 | 7 | 0.042 | 0.249 | -0.207 | no
// 1000003 | 37 | 7 | 7 | 0.021 | 0.261 | -0.240 | no
// 1000003 | 41 | 7 | 7 | 0.014 | 0.269 | -0.254 | no
// 1000003 | 43 | 7 | 7 | 0.011 | 0.272 | -0.261 | no
// 1000003 | 47 | 7 | 7 | 0.009 | 0.279 | -0.270 | no
// 1000003 | 53 | 7 | 7 | 0.007 | 0.287 | -0.281 | no
//
// (D2) the cap: theta(x0) is the whole head price, so x0* can only be O(ln x)
// x | ln x | x0* | x0*/ln x | theta(x0*) | theta(x0*)/ln x | W_head | W_full | removable fraction
// 101 | 4.62 | 5 | 1.08 | 1.61 | 0.35 | 0.400 | 1.959 | 0.204
// 1009 | 6.92 | 7 | 1.01 | 3.56 | 0.51 | 0.686 | 2.731 | 0.251
// 10007 | 9.21 | 17 | 1.85 | 11.35 | 1.23 | 1.139 | 3.300 | 0.345
// 100003 | 11.51 | 13 | 1.13 | 8.52 | 0.74 | 1.021 | 3.744 | 0.273
// 1000003 | 13.82 | 23 | 1.66 | 17.43 | 1.26 | 1.331 | 4.108 | 0.324
//
// (D3) the sieve half of beta IS the Bonferroni depth, and the depth is forced by W_T.
// B_m >= C(n_T,m) 2^m >= (2 n_T/m)^m and A_m <= delta_T <= 1 (an odd-order Bonferroni
// truncation under-counts), so beta_sieve >= m0 * ln(2 n_T/m0) / ln x. That certified
// floor is printed beside the achieved value. m0/W_T climbs toward the 3.5911 of
// attack-beta2-05 (E2), which is a W -> infinity limit and not yet reached here.
// x | m at optimum | m0(W_T) | W_T | m0/W_T | certified floor on beta_sieve | beta_sieve achieved | beta_hy
// 101 | 3 | 3 | 1.559 | 1.92 | 1.775 | 3.059 | 3.408
// 1009 | 5 | 5 | 2.046 | 2.44 | 3.029 | 4.141 | 4.655
// 10007 | 5 | 5 | 2.161 | 2.31 | 3.362 | 4.335 | 5.567
// 100003 | 7 | 7 | 2.723 | 2.57 | 4.813 | 5.761 | 6.501
// 1000003 | 7 | 7 | 2.777 | 2.52 | 5.076 | 6.041 | 7.303
// A_m <= delta_T (odd Bonferroni truncations under-count), checked at every row above:
//   x = 101: A_m = 6.752e-2, delta_T = 1.877e-1, A_m <= delta_T YES
//   x = 1009: A_m = 6.808e-2, delta_T = 1.209e-1, A_m <= delta_T YES
//   x = 10007: A_m = 1.983e-2, delta_T = 1.122e-1, A_m <= delta_T YES
//   x = 100003: A_m = 1.775e-2, delta_T = 6.346e-2, A_m <= delta_T YES
//   x = 1000003: A_m = 1.579e-3, delta_T = 6.117e-2, A_m <= delta_T YES
//
// === (E) WHAT THE FINITE RANGE BUYS, against the measured truth ===
// attack-growth-law.md: G2(x#) ~ 0.762 x ln^2 x lnln x [MEASURED] over x = 11..79.
// x | exact A144311+1 | law 0.762 x ln^2x lnlnx | hybrid certificate | log10(cert/truth) | x^4.2665 | log10(sieve/truth)
// 13 | 66 | 6.139e+1 | 5.846e+2 | 0.9 | 5.658e+4 | 2.9
// 41 | 546 | 5.653e+2 | 3.398e+4 | 1.8 | 7.602e+6 | 4.1
// 79 | 1710 | 1.695e+3 | 2.239e+6 | 3.1 | 1.248e+8 | 4.9
// 101 | - | 2.507e+3 | 6.766e+6 | 3.4 | 3.560e+8 | 5.2
// 199 | - | 7.080e+3 | 3.267e+8 | 4.7 | 6.428e+9 | 6.0
// 227 | - | 8.608e+3 | 5.472e+8 | 4.8 | 1.127e+10 | 6.1
// 439 | - | 2.236e+4 | 1.479e+11 | 6.8 | 1.880e+11 | 6.9
//
// === (F) REGRESS CHECK, and whether the range grows with effort ===
// the whole certificate at the crossover x = 439 costs 1 ms and evaluates one closed-form
// inequality (head x0 = 11, depth m = 3); no search, no recursion, no base case to re-enter.
// So HY inherits NO regress from §7c -- and the crossover 439 is NOT compute-limited:
// more hours move it by zero. The limit is theta(x0), not effort.
//
// === (G) THE UNDERPRICE: theta(x0) against a 3^{pi(x0)}/delta1 head price ===
// x0 | pi_head | theta(x0) = log Q | 1.0986 pi - log delta1 | log ratio | factor
// 5 | 1 | 1.61 | 1.61 | 0.00 | 1.00e+0
// 13 | 4 | 8.52 | 5.61 | 2.91 | 1.83e+1
// 29 | 8 | 20.80 | 10.40 | 10.40 | 3.27e+4
// 53 | 14 | 43.14 | 17.30 | 25.84 | 1.67e+11
// 79 | 20 | 68.45 | 24.07 | 44.39 | 1.89e+19
// ============================================================================
// READINGS
// ============================================================================
// 1. THE GLUE CLOSES, AND IT IS ONE INEQUALITY. Theorem HY is stated and proved
//    in the banner and every number here is an evaluation of it. The exact head
//    enters the asymptotic argument through a SINGLE quantity, Q = exp(theta(x0)),
//    and through nothing else: the head-survivor line a + Qt is again a two-class
//    interval sift over the tail primes alone, so Brun's truncation applies to it
//    verbatim. This is the "feeds the finite result INTO the asymptotic argument"
//    the brief asked for, and it is not a case split -- HY is one inequality,
//    valid at every x, with x0 a free parameter.
//
// 2. WHAT IT BUYS: A FACTOR OF 1.93 IN x, AND NOTHING ELSE. The covering
//    economy's window against 4.2665 widens from x <= 227 (section A, the
//    published crossover, reproduced here) to x <= 439. First loss at x = 443,
//    and it never returns over 5972 further primes swept to x = 60000. The
//    exponent gain is 0.29 to 2.01 across x = 13 .. 1e6, and beta_hy still
//    diverges: 3.408, 4.655, 6.501, 7.303 at x = 101, 1009, 1e5, 1e6.
//
// 3. THE CAP IS theta(x0), AND IT IS EXPONENTIAL IN THE HEAD'S REACH. The whole
//    price of exactness is the primorial, because the crude "one error per
//    residue class" is the only bound available for a Q-periodic set inside an
//    interval shorter than Q. Hence theta(x0) <= beta * ln x forces
//    x0 = O(ln x) -- measured x0*/ln x = 1.01 to 1.85 across five decades, never
//    drifting -- and the primes below O(ln x) carry only 2 lnlnln x + O(1) of
//    Mertens mass against the 2 lnln x that sets the depth. The removable
//    fraction is lnlnln x / lnln x -> 0. Over the accessible range it has not
//    turned over yet (0.204 -> 0.324 across x = 101 .. 1e6), which is exactly
//    what a lnlnln x / lnln x looks like below x = 1e6, and is flagged as such
//    rather than read as growth.
//
// 4. THE GAIN ARRIVES ALMOST ONLY AT DEPTH DROPS. (D1) at x = 1e6: removing 11
//    and removing 23 each cut the required Bonferroni depth by 2 and pay 1.19
//    and 0.95 of net exponent. ONE head prime pays positive without a drop:
//    p = 5, net +0.078 and marked "yes" in the table, whose sieve gain 0.194 is
//    much the largest of the no-drop gains (next is 0.168 at p = 29). The other
//    ten pay between -0.075 (p = 29) and -0.281 (p = 53).
//    The cost ln p/ln x is smooth in p and the gain is a staircase, so the
//    optimum sits at whichever prime last triggered a drop. That is why x0*
//    jumps around (5, 7, 11, 13, 17, 19, 23) instead of tracking a smooth curve.
//
// 5. THE CERTIFICATE ROUTE -- the literal "A144311 as base case" -- IS DEAD, AND
//    THE REASON IS A TYPE MISMATCH. A head certificate is ORDER information (the
//    head cannot cover m0 consecutive slots). Bonferroni consumes CONGRUENCE
//    information (counts in arithmetic progressions). The only mechanism that
//    eats a gap bound is the Theorem P union count of attack-beta2-05, which
//    needs 1/(m0+1) > W_T. Section C: at every x0 from 11 to 79 the FIRST tail
//    prime alone already has 2/p larger than 1/(m0+1) -- 2.41e-2 against 3.51e-3
//    at x0 = 79 -- so the route reaches x = x0 and does not admit one further
//    prime. It buys strictly nothing beyond the exact term it starts from.
//    This is the same wall as sift-limit-attack.md §7c, seen from the other
//    side: there the dilation was an isomorphism of congruence structure and
//    not of order, and the sieve wanted order; here the certificate carries
//    order and the sieve wants congruence.
//
// 6. NO REGRESS, AND THAT IS THE TRADE. §7c killed exact strata on an infinite
//    regress: exactness at level j needs the upper sieve function of a dilated
//    tile at level j-1. HY has no regress at all -- one closed form, evaluated
//    in under a millisecond, no recursion, no re-entry. It escapes the regress
//    precisely BECAUSE it buys exactness at one scale outright and pays cash
//    (theta(x0)) instead of borrowing. Bounded price, bounded gain. The two
//    facts are the same fact.
//
// 7. THE RANGE DOES NOT GROW WITH EFFORT. Section F: the certificate at the
//    crossover costs 0 ms. There is no search to deepen and no ladder to
//    extend; x = 439 is where theta(x0) overtakes the depth saving, not where
//    the compute ran out. "N reachable by C hours" is not the shape of this
//    result -- N is closed form and C is zero.
//
// 8. WHAT THE FINITE WINDOW IS WORTH AGAINST THE MEASURED TRUTH, AND THIS IS
//    THE VERDICT. attack-growth-law.md measures G2(x#) ~ 0.762 x ln^2 x lnln x
//    over x = 11..79 [MEASURED]. Section E puts the three objects side by side.
//    At the crossover x = 439 the hybrid certificate is 1.479e11 and the
//    idealised x^4.2665 is 1.880e11: the whole improvement is a factor 1.27 in
//    a bound that stands 6.8 orders of magnitude above the measured law's
//    2.24e4. At x = 79, where the truth is EXACT (1710), the hybrid says
//    2.24e6. So the window (79, 439] where the hybrid is both the best bound
//    and the truth is unknown is a window in which the bound is wrong by four
//    to seven orders of magnitude and the measured law already describes the
//    object to within a factor of two.
//
// 9. THE HONEST PRICE COMPARISON. Section G exists because the head price is
//    the entire result and it is easy to get wrong. Pricing the head at
//    3^{pi(x0)}/prod(1-2/p) instead of at Q under-prices it by a factor
//    1.83e1 at x0 = 13, 3.27e4 at x0 = 29 and 1.89e19 at x0 = 79, because
//    theta(x0) ~ x0 and 1.0986 pi(x0) ~ 1.0986 x0/ln x0. Any hybrid whose head
//    cost grows slower than the primorial is not bounding the CRT error of a
//    Q-periodic set inside a window shorter than Q, and there is no such bound.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. The banner's CUSTODY note already covers the printed
// numbers and the two external inputs, A144311's terms and the constant
// 4.2665; this covers only the readings' restatements of them. No number
// above was changed.
//
// ROUNDINGS of a value this file's own OUTPUT prints (printed value first):
//   0.287 -> 0.29 and 2.007 -> 2.01, the low and high of the "gain" column of
//   table (B), reading 2. The low sits at x = 31, inside the quoted span.
//   1.186 -> 1.19 and 0.946 -> 0.95, the "net" column of table (D1) at p = 11
//   and p = 23, reading 4.
//   3.509e-3 -> 3.51e-3, the 1/(m0+1) entry at x0 = 79 in table (C).
//   2.236e+4 -> 2.24e4, the measured-law column of table (E) at x = 439, and
//   2.239e+6 -> 2.24e6, the hybrid certificate at x = 79 in the same table.
//
// SAME VALUE, DIFFERENT NOTATION:
//   2.41e-2 for the printed 2.410e-2 in table (C) at x0 = 79; 1.479e11 and
//   1.880e11 for the printed 1.479e+11 and 1.880e+11 in table (E) at x = 439;
//   1.83e1, 3.27e4 and 1.89e19 for the printed 1.83e+1, 3.27e+4 and 1.89e+19
//   in the "factor" column of table (G) at x0 = 13, 29 and 79.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   the factor 1.27 of reading 8 is 1.880e+11 / 1.479e+11, both from the
//   x = 439 row of table (E).
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// CORRECTED 2026-08-20 (mismatch adjudication #12). Reading 4 said "every other
// head prime pays between -0.07 and -0.28" of the eleven head primes that are
// not 11 or 23. Table (D1) above has p = 5 paying +0.078 with the verdict
// "yes", inside the stated scope and on the wrong side of zero, so the claim
// was false as an "every". The two endpoints themselves are legitimate
// roundings of printed values: -0.075 at p = 29 and -0.281 at p = 53. Reading 4
// now names p = 5 explicitly and its headline is softened from "ONLY at depth
// drops" to "ALMOST only", which is what the table shows: p = 5's sieve gain
// 0.194 clears its cost 0.116 without lowering m at all. Old -> new: "every
// other head prime pays between -0.07 and -0.28" -> "one pays positive without
// a drop (p = 5, +0.078); the other ten pay between -0.075 and -0.281". The
// staircase conclusion and the x0* jumping are unaffected.
// ---------------------------------------------------------------------------
