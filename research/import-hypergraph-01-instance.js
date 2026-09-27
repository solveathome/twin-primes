// import-hypergraph-01-instance.js
//
// FOREIGN IMPORT (IMPORT-MAP row 13), the finite instance: HYPERGRAPH COVERING.
// Pre-registration: research/history/staging/import-hypergraph-prereg.md,
// committed alone (2f32718) before this file existed. Record:
// research/history/staging/import-hypergraph.md.
//
// THE IMPORT. FGKMT, "Long gaps between primes", JAMS 31 (2018) 65-105,
// arXiv:1412.5029v3, Theorem 3 (probabilistic covering) and Corollary 4
// (its arithmetic packaging), generalizing Pippenger-Spencer, JCTA 51 (1989)
// 24-42. Hypotheses read at page-image grade 2026-08-20 (pp. 12-19 of the
// arXiv v3 PDF): (4.16) edge sizes #e_p <= r = O(log x log3 x / log2^2 x)
// almost surely; (4.17) sparsity P(q in e_p) <= x^(-1/2-1/10); (4.18)-(4.19)
// uniform covering sum_p P(q in e_p) = C + O(1/log2^2 x) with
// (5/4) log 5 <= C << 1; (4.20) codegrees sum_p P(q1,q2 in e_p) <= x^(-1/20);
// conclusion: leftover ~ 5^(-m) #Q' for any m <= log3 x / log 5.
//
// THE OBJECT. The two-class covering instance of two-class-lower-bounds.md
// section 1: V = twin slots of [1, y] surviving the stage-1 sieve (a_p = 0
// for p <= z), edges = two-progression traces
// e_q(a) = { r in V : r = a or a-2 (mod q) }, a uniform on Z/q, independent
// across q (CRT, PROVEN there).
//
// WHAT THIS FILE DOES. Runs the five pre-registered numeric checks N1-N5 at
// the registered instance (y = 200000, stage-1 p <= 13, covering primes
// 17..997, T = 200 trials, seed fixed below), and evaluates the closed-form
// C-window arithmetic read from the source. It computes NO exact G2 value:
// A144311's ladder is CITED, never recomputed.
//
// CUSTODY. Everything here is elementary integer arithmetic below 2^32; no
// BigInt needed; no << on shift counts that can reach 32.
'use strict';

const out = [];
const say = s => out.push(s);

// --- primes to 20000 (mop-up headroom) --------------------------------------
const PLIM = 20000;
const isC = new Uint8Array(PLIM + 1);
const PRIMES = [];
for (let i = 2; i <= PLIM; i++) {
  if (!isC[i]) { PRIMES.push(i); for (let j = i * i; j <= PLIM; j += i) isC[j] = 1; }
}

// --- the registered instance -------------------------------------------------
const Y = 200000;
const STAGE1 = [2, 3, 5, 7, 11, 13];          // a_p = 0: covers r = 0 or -2 mod p
const COV = PRIMES.filter(q => q >= 17 && q <= 997); // 162 covering primes
const TRIALS = 200;
const SEED = 13n;                              // fixed before first run

// splitmix64, uniform in [0, q) by rejection
let smState = SEED;
function next64() {
  smState = (smState + 0x9E3779B97F4A7C15n) & 0xFFFFFFFFFFFFFFFFn;
  let z = smState;
  z = ((z ^ (z >> 30n)) * 0xBF58476D1CE4E5B9n) & 0xFFFFFFFFFFFFFFFFn;
  z = ((z ^ (z >> 27n)) * 0x94D049BB133111EBn) & 0xFFFFFFFFFFFFFFFFn;
  return z ^ (z >> 31n);
}
function unif(q) {
  const Q = BigInt(q), LIM = (0xFFFFFFFFFFFFFFFFn / Q) * Q;
  for (;;) { const v = next64(); if (v < LIM) return Number(v % Q); }
}

// --- V: twin slots surviving stage-1 -----------------------------------------
// r in [1, Y] with r != 0 and r != -2 mod p for all p in STAGE1, i.e.
// gcd(r(r+2), 2*3*5*7*11*13) = 1.
const inV = new Uint8Array(Y + 3);
const V = [];
for (let r = 1; r <= Y; r++) {
  let ok = true;
  for (const p of STAGE1) { const m = r % p; if (m === 0 || m === p - 2) { ok = false; break; } }
  if (ok) { inV[r] = 1; V.push(r); }
}

say('=== 0. THE REGISTERED INSTANCE ===');
say(`y = ${Y}; stage-1 primes ${STAGE1.join(', ')} at a_p = 0; covering primes 17..997 (${COV.length}); T = ${TRIALS}; seed ${SEED}`);
say(`|V| = ${V.length}   (prereg band [9790, 9990]; density 9/182 predicts ${(Y * 9 / 182).toFixed(1)})`);
let deg = 0, keep = 1;
for (const q of COV) { deg += 2 / q; keep *= 1 - 2 / q; }
say(`degree sum_q 2/q = ${deg.toFixed(6)} (prereg 1.7081); prod(1-2/q) = ${keep.toFixed(7)} (prereg 0.1750499)`);
const ELEFT = V.length * keep;
say(`E[#uncovered] = |V| * prod = ${ELEFT.toFixed(2)}`);

// --- N1: degree exactness by direct enumeration ------------------------------
say('');
say('=== 1. N1 - DEGREE EXACTNESS, DIRECT ENUMERATION (prereg P-EX1) ===');
{
  let bad = 0, cells = 0;
  for (const r of V) {
    for (const q of COV) {
      let c = 0;
      for (let a = 0; a < q; a++) {
        if ((r - a) % q === 0 || (r + 2 - a) % q === 0) c++;
      }
      cells++;
      if (c !== 2) bad++;
    }
  }
  say(`cells checked: ${cells} (= |V| x ${COV.length}); cells with #{a : r in e_q(a)} != 2: ${bad}`);
  say(`N1 verdict: ${bad === 0 ? 'PASS - the marginal is exactly 2/q at every cell' : 'FAIL'}`);
}

// --- N2 + N5 input: the 200 trials -------------------------------------------
say('');
say('=== 2. N2 - FIRST MOMENT OVER 200 TRIALS (prereg D2) ===');
const stamp = new Int32Array(Y + 3).fill(-1);
const leftovers = [];
let bestLeft = Infinity, bestAssign = null, bestUncovered = null;
for (let t = 0; t < TRIALS; t++) {
  const as = new Array(COV.length);
  for (let k = 0; k < COV.length; k++) {
    const q = COV[k], a = unif(q);
    as[k] = a;
    for (let r = a; r <= Y; r += q) if (r >= 1) stamp[r] = t;
    let b = ((a - 2) % q + q) % q;
    for (let r = b; r <= Y; r += q) if (r >= 1) stamp[r] = t;
  }
  const unc = [];
  for (const r of V) if (stamp[r] !== t) unc.push(r);
  leftovers.push(unc.length);
  if (unc.length < bestLeft) { bestLeft = unc.length; bestAssign = as.slice(); bestUncovered = unc; }
}
{
  const mean = leftovers.reduce((a, b) => a + b, 0) / TRIALS;
  const varr = leftovers.reduce((a, b) => a + (b - mean) ** 2, 0) / (TRIALS - 1);
  const se = Math.sqrt(varr / TRIALS);
  const zdev = (mean - ELEFT) / se;
  say(`mean uncovered = ${mean.toFixed(2)}; expected ${ELEFT.toFixed(2)}; s.e. ${se.toFixed(2)}; z = ${zdev.toFixed(2)}`);
  say(`trial variance = ${varr.toFixed(1)}; Poisson-heuristic variance would be ${ELEFT.toFixed(1)} (ratio ${(varr / ELEFT).toFixed(2)})`);
  say(`N2 verdict: ${Math.abs(zdev) <= 3 ? 'PASS at 3 s.e.' : 'FAIL at 3 s.e.'}`);
  say(`best trial leftover = ${bestLeft} (E = ${ELEFT.toFixed(0)}; prereg expected best <= E)`);
}

// --- N3: codegrees ------------------------------------------------------------
say('');
say('=== 3. N3 - CODEGREE SUMS (prereg P-EX2; source thresholds (4.4)/(4.20)) ===');
// codeg(r, r') depends only on d = r'-r > 0:
//   sum_{cov q | d} 2/q + sum_{cov q | d-2} 1/q + sum_{cov q | d+2} 1/q
const DMAX = 10000;
const f2 = new Float64Array(DMAX + 3), f1 = new Float64Array(DMAX + 3);
for (const q of COV) for (let d = q; d <= DMAX + 2; d += q) { f2[d] += 2 / q; f1[d] += 1 / q; }
function codegBig(d) { // for random pairs at any distance, trial division
  let s = 0;
  for (const q of COV) {
    if (d % q === 0) s += 2 / q;
    if ((d - 2) % q === 0) s += 1 / q;
    if ((d + 2) % q === 0) s += 1 / q;
  }
  return s;
}
{
  // all realized short distances, with pair counts
  const vals = []; // [codeg, count]
  let shortPairs = 0;
  for (let d = 2; d <= DMAX; d += 2) {
    let cnt = 0;
    for (const r of V) { if (r + d <= Y && inV[r + d]) cnt++; }
    if (cnt > 0) {
      const c = f2[d] + (d - 2 >= 1 ? f1[d - 2] : 0) + f1[d + 2];
      vals.push([c, cnt]); shortPairs += cnt;
    }
  }
  // 1e6 random pairs at any distance
  const NR = 1000000;
  let rmax = 0, rvals = new Float64Array(NR);
  for (let i = 0; i < NR; i++) {
    let r1 = V[unif(V.length)], r2 = V[unif(V.length)];
    if (r1 === r2) { i--; continue; }
    const d = Math.abs(r2 - r1);
    const c = codegBig(d);
    rvals[i] = c; if (c > rmax) rmax = c;
  }
  // percentile over the union population
  const all = [];
  for (const [c, cnt] of vals) all.push([c, cnt]);
  for (let i = 0; i < NR; i++) all.push([rvals[i], 1]);
  all.sort((a, b) => a[0] - b[0]);
  const tot = all.reduce((a, b) => a + b[1], 0);
  let acc = 0, p999 = 0, maxAll = all[all.length - 1][0], meanAll = 0;
  for (const [c, cnt] of all) { acc += cnt; meanAll += c * cnt; if (acc <= 0.999 * tot) p999 = c; }
  meanAll /= tot;
  say(`population: ${shortPairs} short pairs (all d <= ${DMAX}) + ${NR} random pairs = ${tot}`);
  say(`max codegree sum = ${maxAll.toFixed(6)}  (${(maxAll / deg).toFixed(4)} of degree; prereg max <= 0.25 of degree)`);
  say(`99.9th pct       = ${p999.toFixed(6)}  (${(p999 / deg).toFixed(4)} of degree; prereg <= 0.02 of degree)`);
  say(`mean             = ${meanAll.toFixed(6)}  (${(meanAll / deg).toFixed(4)} of degree)`);
  say(`N3 verdict: max ${maxAll / deg <= 0.25 ? 'PASS' : 'FAIL'}, 99.9pct ${p999 / deg <= 0.02 ? 'PASS' : 'FAIL'} against the prereg thresholds`);
  say('scoring against the source is in the record: (4.20) needs <= x^(-1/20), an');
  say('ASYMPTOTIC statement; at asymptotic ranges (p > x^(3/5), window y < x^(6/5))');
  say('each of d, d-2, d+2 has AT MOST ONE covering prime factor, the same one-prime');
  say('argument FGKMT run on p. 19, so the pass there is by arithmetic, not by margin.');
}

// --- N4: edge sizes -----------------------------------------------------------
say('');
say('=== 4. N4 - EDGE SIZES AGAINST 2|V|/q (prices leak L1) ===');
{
  const decs = [[17, 99], [101, 499], [503, 997]];
  let gmax = 0, gmaxq = 0;
  for (const [lo, hi] of decs) {
    let n = 0, sMean = 0, sPred = 0, dMax = 0;
    for (const q of COV) {
      if (q < lo || q > hi) continue;
      const h = new Int32Array(q);
      for (const r of V) h[r % q]++;
      let mx = 0, sum = 0;
      for (let a = 0; a < q; a++) {
        const e = h[a] + h[((a - 2) % q + q) % q];
        sum += e; if (e > mx) mx = e;
      }
      n++; sMean += sum / q; sPred += 2 * V.length / q; dMax = Math.max(dMax, mx);
      if (mx > gmax) { gmax = mx; gmaxq = q; }
    }
    say(`q in [${lo}, ${hi}]: primes ${n}; mean |e_q| ${(sMean / n).toFixed(2)} vs 2|V|/q pred ${(sPred / n).toFixed(2)}; max |e_q| ${dMax}`);
  }
  say(`global max |e_q(a)| = ${gmax} at q = ${gmaxq} (mean there ${(2 * V.length / gmaxq).toFixed(1)})`);
  say('exact per-q mean is 2|V|/q identically (each slot is in exactly 2 of the q edges,');
  say('N1); the a.s. bound the source needs is r = O(log x log3 x / log2^2 x), scored');
  say('against these maxima in the record.');
}

// --- N5: the assembled certificate, end to end --------------------------------
say('');
say('=== 5. N5 - ASSEMBLED CERTIFICATE: best trial + greedy mop-up + replay ===');
{
  // greedy mop-up: one fresh prime per still-uncovered slot, ascending from 1009
  const mop = PRIMES.filter(q => q > 997);
  const assign = []; // [q, a_q] beyond stage-1 and covering
  let mi = 0;
  const covered = new Uint8Array(Y + 3);
  // mark best-trial coverage
  for (let k = 0; k < COV.length; k++) {
    const q = COV[k], a = bestAssign[k];
    for (let r = a; r <= Y; r += q) if (r >= 1) covered[r] = 1;
    const b = ((a - 2) % q + q) % q;
    for (let r = b; r <= Y; r += q) if (r >= 1) covered[r] = 1;
  }
  let used = 0, xprime = 0;
  for (const r of bestUncovered) {
    if (covered[r]) continue; // an earlier mop-up prime got it (r'=r+2 or r'=r mod q)
    if (mi >= mop.length) { say('MOP-UP EXHAUSTED - N5 FAIL'); break; }
    const q = mop[mi++];
    const a = r % q;
    assign.push([q, a]);
    used++; xprime = q;
    for (let s = a; s <= Y; s += q) if (s >= 1) covered[s] = 1;
    const b = ((a - 2) % q + q) % q;
    for (let s = b; s <= Y; s += q) if (s >= 1) covered[s] = 1;
  }
  say(`best-trial leftover ${bestLeft}; mop-up primes spent ${used} (${(bestLeft / used).toFixed(2)} leftover slots per prime); x' = ${xprime}`);
  // REPLAY from scratch, different code path: per-r modular checks
  const full = [];
  for (const p of STAGE1) full.push([p, 0]);
  for (let k = 0; k < COV.length; k++) full.push([COV[k], bestAssign[k]]);
  for (const [q, a] of assign) full.push([q, a]);
  let uncoveredReplay = 0, firstBad = -1;
  for (let r = 1; r <= Y; r++) {
    let hit = false;
    for (const [q, a] of full) {
      const m = r % q;
      if (m === a || m === ((a - 2) % q + q) % q) { hit = true; break; }
    }
    if (!hit) { uncoveredReplay++; if (firstBad < 0) firstBad = r; }
  }
  say(`replay (independent per-r modular scan over ${full.length} classes): uncovered in [1, ${Y}] = ${uncoveredReplay}${firstBad >= 0 ? ' (first at ' + firstBad + ')' : ''}`);
  const ratio = Y / (xprime * Math.log(xprime));
  say(`certificate shape: y / (x' ln x') = ${ratio.toFixed(4)}  (prereg PASS >= 1.0)`);
  say(`N5 verdict: ${uncoveredReplay === 0 && ratio >= 1.0 ? 'PASS - replay-clean cover, shape at or above x ln x' : 'FAIL'}`);
  say('conversion to G2 is the CRT identity of two-class-lower-bounds.md section 1');
  say('(PROVEN there): a full cover of [1, y] by pairs {a_p, a_p - 2} over p <= x\'');
  say(`exhibits a window of x'# with no twin slot in y consecutive integers.`);
  say('finite-scale note: shape evidence only; the exact ladder is OEIS A144311, cited.');
}

// --- 6. the closed-form arithmetic read from the source ------------------------
say('');
say('=== 6. THE C-WINDOW ARITHMETIC OF COROLLARY 4, EVALUATED (read at source) ===');
{
  const Cmin = (5 / 4) * Math.log(5);
  const Craw = 2 * Math.log(5 / 3);
  say(`(4.18)-(4.19) require sum_p P(q in e_p) = C + O(1/log2^2 x), C >= (5/4) ln 5 = ${Cmin.toFixed(4)}`);
  say(`raw-trace supremum under (4.17): primes p with 2/p <= x^(-3/5) and #P' <= x`);
  say(`force p in (2x^(3/5), x ln x], so sup C = 2 ln(5/3) = ${Craw.toFixed(4)} as x -> inf`);
  say(`shortfall factor: ${(Cmin / Craw).toFixed(4)}  - raw two-progression traces MISS the`);
  say('C-window of the published corollary by a factor 1.97, at every scale.');
  say('');
  say('FGKMT-shaped range (x/2, x] for raw traces: C = 2 ln(ln x / ln(x/2)), which is');
  for (const lx of [50, 100, 500]) {
    const c = 2 * Math.log(lx / (lx - Math.log(2)));
    say(`  ln x = ${lx}: C = ${c.toFixed(5)}`);
  }
  say('-> 0 like (2 ln 2)/ln x: the ln x boost FGKMT get from Maynard-Tao-weighted');
  say('edges is exactly what raw translates do not have.');
  say('');
  say('the machine\'s total yield cap: leftover ~ 5^(-m), m <= log3 x / log 5, so');
  say('min leftover fraction = exp(-log3 x) = 1/log2 x: ONE factor of lnln x, ever.');
}

console.log(out.join('\n'));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/import-hypergraph-01-instance.js
//   invocation:  node research/import-hypergraph-01-instance.js
//   code-sha256: a3c2257ff09e04fb205398c440cc3c44d7caf36e78500d7b0ece9f3f25956a2c
//   out-sha256:  d257d7cacc38fea50126f5d43947f020a8c255314a145b413a4c3438d6a86743
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     3.9 s
// ============================================================================
// === 0. THE REGISTERED INSTANCE ===
// y = 200000; stage-1 primes 2, 3, 5, 7, 11, 13 at a_p = 0; covering primes 17..997 (162); T = 200; seed 13
// |V| = 9889   (prereg band [9790, 9990]; density 9/182 predicts 9890.1)
// degree sum_q 2/q = 1.708115 (prereg 1.7081); prod(1-2/q) = 0.1750499 (prereg 0.1750499)
// E[#uncovered] = |V| * prod = 1731.07
//
// === 1. N1 - DEGREE EXACTNESS, DIRECT ENUMERATION (prereg P-EX1) ===
// cells checked: 1602018 (= |V| x 162); cells with #{a : r in e_q(a)} != 2: 0
// N1 verdict: PASS - the marginal is exactly 2/q at every cell
//
// === 2. N2 - FIRST MOMENT OVER 200 TRIALS (prereg D2) ===
// mean uncovered = 1730.83; expected 1731.07; s.e. 1.92; z = -0.12
// trial variance = 736.7; Poisson-heuristic variance would be 1731.1 (ratio 0.43)
// N2 verdict: PASS at 3 s.e.
// best trial leftover = 1654 (E = 1731; prereg expected best <= E)
//
// === 3. N3 - CODEGREE SUMS (prereg P-EX2; source thresholds (4.4)/(4.20)) ===
// population: 4762138 short pairs (all d <= 10000) + 1000000 random pairs = 5762138
// max codegree sum = 0.374417  (0.2192 of degree; prereg max <= 0.25 of degree)
// 99.9th pct       = 0.255470  (0.1496 of degree; prereg <= 0.02 of degree)
// mean             = 0.064545  (0.0378 of degree)
// N3 verdict: max PASS, 99.9pct FAIL against the prereg thresholds
// scoring against the source is in the record: (4.20) needs <= x^(-1/20), an
// ASYMPTOTIC statement; at asymptotic ranges (p > x^(3/5), window y < x^(6/5))
// each of d, d-2, d+2 has AT MOST ONE covering prime factor, the same one-prime
// argument FGKMT run on p. 19, so the pass there is by arithmetic, not by margin.
//
// === 4. N4 - EDGE SIZES AGAINST 2|V|/q (prices leak L1) ===
// q in [17, 99]: primes 19; mean |e_q| 477.58 vs 2|V|/q pred 477.58; max |e_q| 1167
// q in [101, 499]: primes 70; mean |e_q| 83.04 vs 2|V|/q pred 83.04; max |e_q| 204
// q in [503, 997]: primes 73; mean |e_q| 27.46 vs 2|V|/q pred 27.46; max |e_q| 48
// global max |e_q(a)| = 1167 at q = 17 (mean there 1163.4)
// exact per-q mean is 2|V|/q identically (each slot is in exactly 2 of the q edges,
// N1); the a.s. bound the source needs is r = O(log x log3 x / log2^2 x), scored
// against these maxima in the record.
//
// === 5. N5 - ASSEMBLED CERTIFICATE: best trial + greedy mop-up + replay ===
// best-trial leftover 1654; mop-up primes spent 1153 (1.43 leftover slots per prime); x' = 10861
// replay (independent per-r modular scan over 1321 classes): uncovered in [1, 200000] = 0
// certificate shape: y / (x' ln x') = 1.9816  (prereg PASS >= 1.0)
// N5 verdict: PASS - replay-clean cover, shape at or above x ln x
// conversion to G2 is the CRT identity of two-class-lower-bounds.md section 1
// (PROVEN there): a full cover of [1, y] by pairs {a_p, a_p - 2} over p <= x'
// exhibits a window of x'# with no twin slot in y consecutive integers.
// finite-scale note: shape evidence only; the exact ladder is OEIS A144311, cited.
//
// === 6. THE C-WINDOW ARITHMETIC OF COROLLARY 4, EVALUATED (read at source) ===
// (4.18)-(4.19) require sum_p P(q in e_p) = C + O(1/log2^2 x), C >= (5/4) ln 5 = 2.0118
// raw-trace supremum under (4.17): primes p with 2/p <= x^(-3/5) and #P' <= x
// force p in (2x^(3/5), x ln x], so sup C = 2 ln(5/3) = 1.0217 as x -> inf
// shortfall factor: 1.9692  - raw two-progression traces MISS the
// C-window of the published corollary by a factor 1.97, at every scale.
//
// FGKMT-shaped range (x/2, x] for raw traces: C = 2 ln(ln x / ln(x/2)), which is
//   ln x = 50: C = 0.02792
//   ln x = 100: C = 0.01391
//   ln x = 500: C = 0.00277
// -> 0 like (2 ln 2)/ln x: the ln x boost FGKMT get from Maynard-Tao-weighted
// edges is exactly what raw translates do not have.
//
// the machine's total yield cap: leftover ~ 5^(-m), m <= log3 x / log 5, so
// min leftover fraction = exp(-log3 x) = 1/log2 x: ONE factor of lnln x, ever.
// ============================================================================
// READINGS
//
// 1. N1 PASSES WITH ZERO EXCEPTIONS OVER ALL 1,602,018 CELLS. The two-class
//    edge marginal is exactly 2/q for every survivor and every covering prime,
//    by direct enumeration of all q translates, not by the formula. This is
//    the dictionary's strongest cell: FGKMT's own application needs sieve
//    machinery to CONSTRUCT near-uniform degrees ((4.18) tolerates an
//    exceptional set of size #Q'/(log2 x)^2); the two-class instance has
//    perfect uniformity with an empty exceptional set, for free.
//
// 2. N2 PASSES AT z = -0.12: mean uncovered 1730.83 against the exact
//    first-moment prediction 1731.07 over 200 seeded trials. The trial
//    variance is 0.43 of the Poisson heuristic - the two progressions of one
//    prime are mutually exclusive on a slot, a negative association that
//    CONCENTRATES the leftover. Nothing in the record leans on that
//    sub-Poisson reading; it is logged as a sighting.
//
// 3. N3: THE PRE-REGISTERED MAX THRESHOLD PASSES (0.2192 of degree against
//    0.25) AND THE PRE-REGISTERED 99.9TH-PERCENTILE PREDICTION FAILS
//    (0.1496 of degree against the registered 0.02). The miss is real and is
//    recorded as a wrong prereg prediction: the registered population is
//    dominated by the 4,762,138 short pairs (d <= 10^4), where d and d+-2 pick up
//    the small covering primes 17..31 far more often than the random-distance
//    pairs the 0.02 was calibrated against. The DICTIONARY is not touched (the
//    codegree support formula is exact; the smallness prediction at toy range
//    was misjudged); the SOURCE hypothesis (4.20) is asymptotic and passes by
//    the one-covering-prime argument at the real ranges (p > x^(3/5) makes
//    p^2 > x^(6/5) > y, so each of d, d-2, d+2 has at most one covering prime
//    factor - the same argument FGKMT print on p. 19 for the single form
//    q1 - q2, transferred verbatim to our three forms).
//
// 4. N4: EDGE-SIZE MEANS MATCH 2|V|/q TO ALL PRINTED DIGITS at every q-decade
//    (they must, given N1: each slot lies in exactly 2 of the q edges), and
//    the almost-sure maxima run 1.0x to 2.4x the mean. The a.s. size bound is
//    NOT the leak at this instance's shape; the leak priced as L1 lands
//    elsewhere - see reading 6.
//
// 5. N5 PASSES END TO END: best trial 1654 leftover, greedy mop-up spends
//    1153 fresh primes (1.43 leftover slots per prime - adjacent leftover
//    pairs r, r+2 are covered together by a_q = r, a small free two-class
//    bonus), x' = 10861, and an independent per-r replay over all 1321
//    classes confirms UNCOVERED = 0 on [1, 200000]. The certificate shape
//    y/(x' ln x') = 1.98 sits above the registered 1.0, the finite echo of
//    the Branch A chain G2(x#) >> x ln x.
//
// 6. THE C-WINDOW ARITHMETIC IS THE IMPORT'S DECISIVE NEGATIVE, AND IT IS
//    CLOSED-FORM. Corollary 4 (read at page-image grade) requires the
//    per-vertex covering sum C >= (5/4) ln 5 = 2.0118 alongside the sparsity
//    (4.17) P(q in e_p) <= x^(-1/2-1/10). Raw two-progression traces have
//    marginal exactly 2/p (reading 1), so (4.17) forces p > 2x^(3/5), and
//    with #P' <= x the covering sum can never exceed 2 ln(5/3) = 1.0217: the
//    published window is missed by a factor 1.97 AT EVERY SCALE. On FGKMT's
//    own range (x/2, x] the raw-trace C is (2 ln 2)/ln x -> 0: short by a
//    factor ~ ln x. The one-class case buys that ln x with Maynard-Tao
//    weighted edges (sparse in translate, concentrated on survivors);
//    no two-class analogue exists in print. And the machine's conclusion caps
//    its own yield: leftover fraction 5^(-m) with m <= log3 x / log 5 floors
//    at 1/log2 x - the engine converts lnln-scale losses, never ln-scale
//    gains, so it could never have carried the K-K reading's ln^2-scale load.
//
// 7. WHAT THIS FILE DOES NOT SHOW. It proves no bound on G2 beyond the finite
//    certificate of reading 5 at y = 200000 (which is far below A144311's
//    exact ladder territory and is CITED as shape evidence only, per the
//    prereg). It does not run the covering theorem's nibble; it verifies
//    hypotheses and evaluates the source's own closed forms. The asymptotic
//    Branch A chain and the Branch B wall are written and scored in
//    research/history/staging/import-hypergraph.md against the prereg.
