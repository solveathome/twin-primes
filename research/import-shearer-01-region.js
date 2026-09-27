#!/usr/bin/env node
'use strict';
// ============================================================================
// IMPORT-SHEARER 01 — SHEARER'S REGION FOR THE TWO-CLASS DELETION EVENTS
// (2026-08-19, foreign-import attack 3 of 5: the repulsive lattice gas,
//  research/IMPORT-MAP.md row 3)
// ============================================================================
// PRE-REGISTRATION. research/history/staging/import-shearer-prereg.md, written
// and committed (e481061) BEFORE this file existed. P1..P6 below refer to it.
// Nothing in this header may be changed after the run; corrections go in the
// record, research/history/staging/import-shearer.md.
//
// THE MODEL, taken from research/history/staging/import-suen.md §3 and §8 by
// definition and not re-derived. Level x, scour primes 5 ≤ p ≤ x (Natal@5;
// p = 3 is carried by the comb), K = π(x) − 2 of them. Two bad events per
// prime, A_p^L = {p | r} and A_p^R = {p | r+2}, each of probability EXACTLY
// 1/p, mutually exclusive because p | r and p | r+2 would force p | 2.
// Dependency graph, parameterised by the window length H:
//     A_p^• ∼ A_p^•   always (same prime);
//     A_p^• ∼ A_q^•   for p ≠ q iff the window fails to equidistribute mod pq,
//                     i.e. iff p·q > H          (import-suen.md §8's rule).
// H ≥ x² makes every cross-prime edge vanish and leaves a PERFECT MATCHING;
// refusing to verify any cross-prime conditioning makes the graph COMPLETE on
// the 2K events. Both extremes and the whole interpolation are computed here.
//
// SHEARER'S CRITERION, as used. For a graph G on V with probabilities p,
//     Z_{G[S]}(−p) = Σ_{I independent in G[S]} ∏_{v∈I} (−p_v),
// and p lies in Shearer's region R(G) iff Z_{G[S]}(−p) > 0 for EVERY S ⊆ V.
// Statement taken from Scott–Sokal Theorem 4.1 as recorded in
// research/history/staging/import-map-construction.md §3. Computed here by the
// deletion recursion Z[S] = Z[S∖v] − p_v·Z[S∖N[v]] over all 2^n subsets, with
// v the lowest set bit — exact, not sampled.
//
// EXACT ARITHMETIC. Z[S]·D is an integer for D = ∏_{5≤p≤x} p, because every
// term of Z has denominator ∏_{p∈I} p | D, and in the recursion the factor
// M[S∖N[v]] is divisible by p_v since no term of it carries p_v. So the DP runs
// in BigInt with exact division and the sign of every Z[S] is exact, with no
// floating-point tolerance anywhere in the verdicts. A float DP runs alongside
// up to the size ceiling and the two are compared.
//
// WHAT IS NOT COMPUTED HERE. Nothing in this file is a bound on G₂. The graph
// rule p ∼ q iff pq > H is import-suen §8's MODELLING CHOICE about which
// conditioning a window of length H can verify, not a theorem, and the numbers
// below measure how badly the pairwise-drawn dependency graph over-certifies.
// ============================================================================

// ---------------------------------------------------------------------------
// primes and level sets
// ---------------------------------------------------------------------------
function primesUpTo(n) {
  const s = new Uint8Array(n + 1); const out = [];
  for (let i = 2; i <= n; i++) { if (!s[i]) { out.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } }
  return out;
}
const scour = (x) => primesUpTo(x).filter(p => p >= 5);

// ---------------------------------------------------------------------------
// Shearer's criterion, exact (BigInt) and float, on an arbitrary graph
// ---------------------------------------------------------------------------
// verts: array of {num, den} with p_v = num/den, den a product of distinct
// primes dividing D. adj: array of neighbour bitmasks (not including self).
function shearerExact(pnum, pden, adj, D) {
  const n = adj.length;
  const size = 1 << n;
  const M = new Array(size);
  M[0] = D;                                   // Z[∅] = 1
  let minS = null, argmin = -1;
  for (let S = 1; S < size; S++) {
    const v = 31 - Math.clz32(S & -S);        // lowest set bit index
    const rest = S & ~(1 << v);
    const closed = S & ~((1 << v) | adj[v]);
    // M[S] = M[rest] − (num_v/den_v)·M[closed], and den_v | M[closed]
    const t = M[closed] / BigInt(pden[v]);
    if (t * BigInt(pden[v]) !== M[closed]) throw new Error('exactness violated');
    M[S] = M[rest] - BigInt(pnum[v]) * t;
    if (minS === null || M[S] < minS) { minS = M[S]; argmin = S; }
  }
  return { feasible: minS > 0n, minS, argmin, ZfullOverD: Number(M[size - 1]) / Number(D) };
}
function shearerFloat(p, adj) {
  const n = adj.length, size = 1 << n;
  const Z = new Float64Array(size); Z[0] = 1;
  let mn = Infinity;
  for (let S = 1; S < size; S++) {
    const v = 31 - Math.clz32(S & -S);
    Z[S] = Z[S & ~(1 << v)] - p[v] * Z[S & ~((1 << v) | adj[v])];
    if (Z[S] < mn) mn = Z[S];
  }
  return { feasible: mn > 0, min: mn, Zfull: Z[size - 1] };
}

// graph builders -------------------------------------------------------------
function completeAdj(n) { const a = []; for (let i = 0; i < n; i++) a.push(((1 << n) - 1) & ~(1 << i)); return a; }
// one vertex per prime, marginal 2/p, cross edge iff p·q > H
function primeGraph(ps, H) {
  const n = ps.length, a = new Array(n).fill(0);
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (i !== j && ps[i] * ps[j] > H) a[i] |= (1 << j);
  return a;
}
// two vertices per prime (L,R), marginal 1/p, matching edge always, cross edge iff p·q > H
function twoClassGraph(ps, H) {
  const n = 2 * ps.length, a = new Array(n).fill(0);
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    if (i === j) continue;
    const pi = ps[i >> 1], pj = ps[j >> 1];
    if ((i >> 1) === (j >> 1) || pi * pj > H) a[i] |= (1 << j);
  }
  return a;
}
const prod = (ps) => ps.reduce((a, p) => a * BigInt(p), 1n);

// ---------------------------------------------------------------------------
// the asymmetric local lemma on a COMPLETE graph, over ALL weight vectors
// ---------------------------------------------------------------------------
// ∃x_v ∈ [0,1): p_v ≤ x_v ∏_{w≠v}(1−x_w). With Q = ∏_w(1−x_w) the condition is
// 1−x_v ≤ Q/(Q+p_v) for every v, and consistency of Q needs
//     ∏_v (Q + p_v) ≤ Q^{n−1}   for some Q ∈ (0,1].
// (Derivation in the record. For n = 2 equal p it returns p ≤ 1/4, the textbook
// value, against Shearer's p < 1/2 — checked in PART A.)
function lllCompleteFeasible(p) {
  const n = p.length;
  let best = -Infinity, bestQ = 0;
  for (let k = 0; k <= 200000; k++) {
    const Q = k / 200000; if (Q <= 0) continue;
    let g = (n - 1) * Math.log(Q);
    for (const pv of p) g -= Math.log(Q + pv);
    if (g > best) { best = g; bestQ = Q; }
  }
  return { feasible: best >= 0, slack: best, Q: bestQ };
}
// critical scale along the ray t·p
function critScale(test, p, lo, hi) {
  for (let it = 0; it < 60; it++) { const m = (lo + hi) / 2; if (test(p.map(v => v * m))) lo = m; else hi = m; }
  return lo;
}

const LEVELS = [5, 7, 11, 13, 17, 19, 23, 29];
const EXT = [31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79];

console.log('IMPORT-SHEARER 01 — Shearer\'s region for the two-class deletion events');
console.log('pre-registration: research/history/staging/import-shearer-prereg.md (commit e481061)');
console.log('model: research/history/staging/import-suen.md §3 (marginals, matching) and §8 (graph rule)');
console.log('');

// ===========================================================================
console.log('=== PART A — instrument: does the DP reproduce what is already known? ===');
// A1. K_n with equal p: Shearer boundary must be p < 1/n, LLL boundary p ≤ 1/4 at n = 2.
{
  const rows = [];
  for (const n of [2, 3, 4, 5, 6, 8]) {
    const adj = completeAdj(n);
    const t = critScale((pp) => shearerFloat(pp, adj).feasible, new Array(n).fill(1), 0, 2);
    const tl = critScale((pp) => lllCompleteFeasible(pp).feasible, new Array(n).fill(1), 0, 2);
    rows.push([n, t, 1 / n, tl, 1 / (Math.E * n)]);
  }
  console.log('A1. complete graph K_n, all p equal: exact Shearer boundary vs 1/n, LLL boundary vs 1/(e·n)');
  console.log('  n | Shearer p* | 1/n      | LLL p*   | 1/(e·n)  | Shearer/LLL');
  for (const [n, t, inv, tl, el] of rows)
    console.log(`  ${String(n).padStart(1)} | ${t.toFixed(8)} | ${inv.toFixed(6)} | ${tl.toFixed(6)} | ${el.toFixed(6)} | ${(t / tl).toFixed(4)}`);
}
// A2. the matching graph factorises: Z must equal ∏(1−2/p) exactly.
{
  console.log('A2. matching graph (H ≥ x²): Z_full against ∏(1−2/p), and the exact verdict');
  console.log('  x  | K | Z_full (DP)        | ∏(1−2/p)           | feasible');
  for (const x of LEVELS) {
    const ps = scour(x), D = prod(ps);
    const adj = twoClassGraph(ps, x * x);
    const pn = [], pd = [];
    for (const p of ps) { pn.push(1, 1); pd.push(p, p); }
    const e = shearerExact(pn, pd, adj, D);
    const direct = ps.reduce((a, p) => a * (1 - 2 / p), 1);
    console.log(`  ${String(x).padStart(2)} | ${String(ps.length).padStart(1)} | ${e.ZfullOverD.toExponential(12)} | ${direct.toExponential(12)} | ${e.feasible ? 'YES' : 'no'}`);
  }
}
// A3. P1, the 2K → K reduction, by brute force on all 2^{2K} subsets.
{
  console.log('A3. P1 (reduction): 2K-vertex two-class criterion vs K-vertex 2/p criterion, all subsets,');
  console.log('    at the complete graph, at H = x², and at three intermediate H per level');
  let agree = 0, tested = 0, disagree = [];
  for (const x of LEVELS) {
    const ps = scour(x), D = prod(ps);
    const Hs = [0, x * x];
    for (const h of [ps[0] * ps[1], ps[ps.length - 1] * ps[0], Math.round(x * x / 3)]) if (!Hs.includes(h)) Hs.push(h);
    for (const H of Hs) {
      const a2 = twoClassGraph(ps, H), pn2 = [], pd2 = [];
      for (const p of ps) { pn2.push(1, 1); pd2.push(p, p); }
      const a1 = primeGraph(ps, H), pn1 = ps.map(() => 2), pd1 = ps.slice();
      const r2 = shearerExact(pn2, pd2, a2, D), r1 = shearerExact(pn1, pd1, a1, D);
      tested++;
      if (r2.feasible === r1.feasible) agree++; else disagree.push([x, H, r2.feasible, r1.feasible]);
    }
  }
  console.log(`    ${tested} (level, H) pairs tested, ${agree} agree, ${tested - agree} disagree` +
    (disagree.length ? ` :: ${JSON.stringify(disagree)}` : ''));
}
// A4. exact vs float
{
  const ps = scour(29), D = prod(ps);
  const adj = primeGraph(ps, 200), pn = ps.map(() => 2), pd = ps.slice();
  const e = shearerExact(pn, pd, adj, D), f = shearerFloat(ps.map(p => 2 / p), adj);
  console.log(`A4. exact vs float at x = 29, H = 200: verdicts ${e.feasible} / ${f.feasible}; Z_full ${e.ZfullOverD.toExponential(12)} / ${f.Zfull.toExponential(12)}`);
}
console.log('');

// ===========================================================================
console.log('=== PART B — the region at each level, on the two extreme graphs ===');
console.log('Σ2/p is recomputed here only as an instrument check against the value already embedded');
console.log('in research/import-suen-01-transfer.js PART D (0.4000, 0.6857, 0.8675, 1.0214, 1.1390,');
console.log('1.2443, 1.3312, 1.4002 at x = 5..29); it is not a new measurement.');
console.log('');
console.log('  x  | K | Σ_{5≤p≤x}2/p | COMPLETE graph                    | MATCHING graph (H ≥ x²)');
console.log('     |   |              | Shearer | t*_Sh  | LLL | t*_LLL  | Shearer | t*_Sh');
{
  for (const x of LEVELS) {
    const ps = scour(x), D = prod(ps), n = ps.length;
    const S = ps.reduce((a, p) => a + 2 / p, 0);
    const pC = ps.map(p => 2 / p);
    const adjC = completeAdj(n), adjM = primeGraph(ps, x * x);
    const rC = shearerExact(ps.map(() => 2), ps.slice(), adjC, D);
    const rM = shearerExact(ps.map(() => 2), ps.slice(), adjM, D);
    const tC = critScale((pp) => shearerFloat(pp, adjC).feasible, pC, 0, 40);
    const tM = critScale((pp) => shearerFloat(pp, adjM).feasible, pC, 0, 40);
    const L = lllCompleteFeasible(pC);
    const tL = critScale((pp) => lllCompleteFeasible(pp).feasible, pC, 0, 40);
    console.log(`  ${String(x).padStart(2)} | ${String(n).padStart(1)} |       ${S.toFixed(6)} |   ${(rC.feasible ? 'YES' : ' no')}   | ${tC.toFixed(4)} | ${(L.feasible ? 'YES' : ' no')} | ${tL.toFixed(4)}  |   ${(rM.feasible ? 'YES' : ' no')}   | ${tM.toFixed(4)}`);
  }
}
console.log('');
console.log('t* is the exact critical scale along the ray t·(2/p): the true marginals lie in the region');
console.log('iff t* > 1, so t* is the region boundary in the one coordinate the problem moves along.');
console.log('');

// ===========================================================================
console.log('=== PART C — the exact Shearer threshold on the true H-graph ===');
console.log('H*(x) = min{H : the marginals lie in R(G(H))}; θ = ln H*/ln x; the p² rule is θ = 2.');
console.log('The candidate set is {p·q} since the edge set only changes there. Monotonicity in H is');
console.log('verified by full scan, not assumed.');
console.log('');
console.log('  x  |  K | H*(x)   | θ = lnH*/lnx | x²      | H*/x²   | clique-only H_c | θ_c');
{
  const all = LEVELS.concat(EXT);
  for (const x of all) {
    const ps = scour(x), D = prod(ps), n = ps.length;
    const cands = new Set([0]);
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) cands.add(ps[i] * ps[j]);
    const C = [...cands].sort((a, b) => a - b);
    const feas = (H) => (n <= 12 ? shearerExact(ps.map(() => 2), ps.slice(), primeGraph(ps, H), D).feasible
      : shearerFloat(ps.map(p => 2 / p), primeGraph(ps, H)).feasible);
    // full scan for monotonicity when cheap, binary search otherwise
    let Hstar = null, mono = true;
    if (n <= 10) {
      const v = C.map(feas);
      for (let i = 1; i < v.length; i++) if (v[i - 1] && !v[i]) mono = false;
      Hstar = C[v.findIndex(t => t)];
    } else {
      let lo = 0, hi = C.length - 1;
      if (!feas(C[hi])) { Hstar = null; } else {
        while (lo < hi) { const m = (lo + hi) >> 1; if (feas(C[m])) hi = m; else lo = m + 1; }
        Hstar = C[lo];
      }
    }
    // clique-only necessary condition: the primes in (√H, x] are pairwise adjacent, so they
    // form a clique, and PART B's identity makes Σ_{p>√H} 2/p < 1 NECESSARY. That condition
    // only changes at H = p², so the {p²} grid carries its exact continuum threshold.
    let Hc = null;
    for (const H of ps.map(p => p * p).sort((a, b) => a - b)) {
      let s = 0; for (const p of ps) if (p * p > H) s += 2 / p; if (s < 1) { Hc = H; break; }
    }
    const th = Hstar > 0 ? Math.log(Hstar) / Math.log(x) : null;
    const thc = Hc > 0 ? Math.log(Hc) / Math.log(x) : null;
    console.log(`  ${String(x).padStart(2)} | ${String(n).padStart(2)} | ${String(Hstar).padStart(7)} | ${th === null ? '   (complete)' : th.toFixed(10).padStart(12)} | ${String(x * x).padStart(7)} | ${Hstar > 0 ? (Hstar / (x * x)).toFixed(5) : '  —  '} | ${String(Hc).padStart(15)} | ${thc === null ? '(complete)' : thc.toFixed(6)}${mono ? '' : '  [NON-MONOTONE]'}`);
  }
}
console.log('');
console.log('2/√e = ' + (2 / Math.sqrt(Math.E)).toFixed(10) + '  (the asymptotic floor: the primes in (√H, x] are a clique,');
console.log('a clique needs Σ2/p < 1 by PART B, and Mertens turns that into ln H > 2e^{−1/2} ln x)');
console.log('');
// the clique-only exponent far out, arithmetic only, past the DP ceiling
console.log('clique-only exponent θ_c at large x (arithmetic, no DP; a LOWER bound on θ_Shearer):');
{
  const out = [];
  for (const x of [101, 1009, 10007, 100003, 1000003, 10000019]) {
    const ps = scour(x);
    let Hc = null;
    const C = [];
    for (const p of ps) C.push(p * p);
    C.sort((a, b) => a - b);
    for (const H of C) { let s = 0; for (const p of ps) if (p * p > H) s += 2 / p; if (s < 1) { Hc = H; break; } }
    out.push(`x=${x}: θ_c=${(Math.log(Hc) / Math.log(x)).toFixed(6)}`);
  }
  console.log('  ' + out.join('   '));
}
console.log('');

// ===========================================================================
console.log('=== PART D — what the two extremes mean, as numbers ===');
{
  const x = 29, ps = scour(x);
  const S = ps.reduce((a, p) => a + 2 / p, 0);
  console.log(`at x = 29: Σ2/p = ${S.toFixed(6)}, so the complete graph fails by a factor ${(S).toFixed(4)} on the`);
  console.log(`union-bound coordinate, while the matching graph passes with Z = ${ps.reduce((a, p) => a * (1 - 2 / p), 1).toExponential(6)} > 0.`);
  console.log('The whole distance between the two verdicts is which conditioning sets the window can verify.');
}

// ===========================================================================
console.log('');
console.log('=== PART E — the tightness witness on the complete graph, constructed explicitly ===');
console.log('Shearer\'s tightness is a general theorem. On a COMPLETE dependency graph it needs no');
console.log('theorem at all, and the witness is written out here so that the closure below does not');
console.log('rest on a paper this corpus has not opened. A complete dependency graph imposes NO');
console.log('independence requirement, so every probability space with the right marginals is');
console.log('admissible. Take Ω = [0,1) with Lebesgue measure and lay the 2K events out as DISJOINT');
console.log('intervals of lengths 1/p, 1/p. That realises the marginals exactly AND respects the');
console.log('within-prime mutual exclusion that import-suen.md §3 proves. Their union has measure');
console.log('Σ2/p, so whenever Σ2/p ≥ 1 the intervals cover Ω and P(no bad event) = 0 EXACTLY.');
console.log('');
console.log('  x  | Σ2/p     | Σ2/p − 1  | witness with P(survive) = 0 exists | P(survive) on the witness');
{
  for (const x of LEVELS) {
    const ps = scour(x);
    const S = ps.reduce((a, p) => a + 2 / p, 0);
    const surv = Math.max(0, 1 - S);
    console.log(`  ${String(x).padStart(2)} | ${S.toFixed(6)} | ${(S - 1).toFixed(6).padStart(9)} |                ${S >= 1 ? 'YES' : ' no'}                 | ${surv.toFixed(6)}`);
  }
}
console.log('');
console.log('The witness is a probability space, not a set of residue classes. It says no argument');
console.log('that uses only the dependency graph and the marginals can certify a survivor from');
console.log('x = 13 on. It says NOTHING about whether the arithmetic instance has a survivor.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/import-shearer-01-region.js
//   invocation:  node research/import-shearer-01-region.js
//   code-sha256: 596c3e1c9bc54b5450283aa0b4ec29c2aeb424943134804503ef8efb0ee1233a
//   out-sha256:  4cfdd602419c11e94b441e4acf198e30cc417262c44824ef27b41cd5868aad8d
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     15.9 s
// ============================================================================
// IMPORT-SHEARER 01 — Shearer's region for the two-class deletion events
// pre-registration: research/history/staging/import-shearer-prereg.md (commit e481061)
// model: research/history/staging/import-suen.md §3 (marginals, matching) and §8 (graph rule)
//
// === PART A — instrument: does the DP reproduce what is already known? ===
// A1. complete graph K_n, all p equal: exact Shearer boundary vs 1/n, LLL boundary vs 1/(e·n)
//   n | Shearer p* | 1/n      | LLL p*   | 1/(e·n)  | Shearer/LLL
//   2 | 0.50000000 | 0.500000 | 0.250000 | 0.183940 | 2.0000
//   3 | 0.33333333 | 0.333333 | 0.148148 | 0.122626 | 2.2500
//   4 | 0.25000000 | 0.250000 | 0.105469 | 0.091970 | 2.3704
//   5 | 0.20000000 | 0.200000 | 0.081920 | 0.073576 | 2.4414
//   6 | 0.16666667 | 0.166667 | 0.066980 | 0.061313 | 2.4883
//   8 | 0.12500000 | 0.125000 | 0.049087 | 0.045985 | 2.5465
// A2. matching graph (H ≥ x²): Z_full against ∏(1−2/p), and the exact verdict
//   x  | K | Z_full (DP)        | ∏(1−2/p)           | feasible
//    5 | 1 | 6.000000000000e-1 | 6.000000000000e-1 | YES
//    7 | 2 | 4.285714285714e-1 | 4.285714285714e-1 | YES
//   11 | 3 | 3.506493506494e-1 | 3.506493506494e-1 | YES
//   13 | 4 | 2.967032967033e-1 | 2.967032967033e-1 | YES
//   17 | 5 | 2.617970265029e-1 | 2.617970265029e-1 | YES
//   19 | 6 | 2.342394447658e-1 | 2.342394447658e-1 | YES
//   23 | 7 | 2.138707973948e-1 | 2.138707973948e-1 | YES
//   29 | 8 | 1.991210872297e-1 | 1.991210872297e-1 | YES
// A3. P1 (reduction): 2K-vertex two-class criterion vs K-vertex 2/p criterion, all subsets,
//     at the complete graph, at H = x², and at three intermediate H per level
//     38 (level, H) pairs tested, 38 agree, 0 disagree
// A4. exact vs float at x = 29, H = 200: verdicts true / true; Z_full 1.316912588760e-1 / 1.316912588760e-1
//
// === PART B — the region at each level, on the two extreme graphs ===
// Σ2/p is recomputed here only as an instrument check against the value already embedded
// in research/import-suen-01-transfer.js PART D (0.4000, 0.6857, 0.8675, 1.0214, 1.1390,
// 1.2443, 1.3312, 1.4002 at x = 5..29); it is not a new measurement.
//
//   x  | K | Σ_{5≤p≤x}2/p | COMPLETE graph                    | MATCHING graph (H ≥ x²)
//      |   |              | Shearer | t*_Sh  | LLL | t*_LLL  | Shearer | t*_Sh
//    5 | 1 |       0.400000 |   YES   | 2.5000 | YES | 2.5000  |   YES   | 2.5000
//    7 | 2 |       0.685714 |   YES   | 1.4583 |  no | 0.7343  |   YES   | 2.5000
//   11 | 3 |       0.867532 |   YES   | 1.1527 |  no | 0.5207  |   YES   | 2.5000
//   13 | 4 |       1.021379 |    no   | 0.9791 |  no | 0.4206  |   YES   | 2.5000
//   17 | 5 |       1.139026 |    no   | 0.8779 |  no | 0.3670  |   YES   | 2.5000
//   19 | 6 |       1.244289 |    no   | 0.8037 |  no | 0.3298  |   YES   | 2.5000
//   23 | 7 |       1.331245 |    no   | 0.7512 |  no | 0.3044  |   YES   | 2.5000
//   29 | 8 |       1.400211 |    no   | 0.7142 |  no | 0.2869  |   YES   | 2.5000
//
// t* is the exact critical scale along the ray t·(2/p): the true marginals lie in the region
// iff t* > 1, so t* is the region boundary in the one coordinate the problem moves along.
//
// === PART C — the exact Shearer threshold on the true H-graph ===
// H*(x) = min{H : the marginals lie in R(G(H))}; θ = ln H*/ln x; the p² rule is θ = 2.
// The candidate set is {p·q} since the edge set only changes there. Monotonicity in H is
// verified by full scan, not assumed.
//
//   x  |  K | H*(x)   | θ = lnH*/lnx | x²      | H*/x²   | clique-only H_c | θ_c
//    5 |  1 |       0 |    (complete) |      25 |   —   |              25 | 2.000000
//    7 |  2 |       0 |    (complete) |      49 |   —   |              25 | 1.654175
//   11 |  3 |       0 |    (complete) |     121 |   —   |              25 | 1.342375
//   13 |  4 |      35 | 1.3861279760 |     169 | 0.20710 |              25 | 1.254947
//   17 |  5 |      55 | 1.4144127881 |     289 | 0.19031 |              25 | 1.136122
//   19 |  6 |      65 | 1.4177190628 |     361 | 0.18006 |              25 | 1.093205
//   23 |  7 |      91 | 1.4386438615 |     529 | 0.17202 |              25 | 1.026593
//   29 |  8 |     115 | 1.4091224436 |     841 | 0.13674 |              49 | 1.155770
//   31 |  9 |     133 | 1.4241023152 |     961 | 0.13840 |              49 | 1.133324
//   37 | 10 |     155 | 1.3967155274 |    1369 | 0.11322 |              49 | 1.077793
//   41 | 11 |     185 | 1.4057505096 |    1681 | 0.11005 |              49 | 1.047999
//   43 | 12 |     209 | 1.4203802211 |    1849 | 0.11303 |              49 | 1.034728
//   47 | 13 |     235 | 1.4180197953 |    2209 | 0.10638 |              49 | 1.010824
//   53 | 14 |     265 | 1.4053701711 |    2809 | 0.09434 |             121 | 1.207919
//   59 | 15 |     295 | 1.3947083098 |    3481 | 0.08475 |             121 | 1.176149
//   61 | 16 |     319 | 1.4024247139 |    3721 | 0.08573 |             121 | 1.166611
//   67 | 17 |     371 | 1.4070474582 |    4489 | 0.08265 |             121 | 1.140581
//   71 | 18 |     407 | 1.4096327566 |    5041 | 0.08074 |             121 | 1.125065
//   73 | 19 |     437 | 1.4170820814 |    5329 | 0.08200 |             121 | 1.117780
//   79 | 20 |     481 | 1.4134205233 |    6241 | 0.07707 |             169 | 1.174038
//
// 2/√e = 1.2130613194  (the asymptotic floor: the primes in (√H, x] are a clique,
// a clique needs Σ2/p < 1 by PART B, and Mertens turns that into ln H > 2e^{−1/2} ln x)
//
// clique-only exponent θ_c at large x (arithmetic, no DP; a LOWER bound on θ_Shearer):
//   x=101: θ_c=1.111542   x=1009: θ_c=1.188678   x=10007: θ_c=1.199746   x=100003: θ_c=1.208307   x=1000003: θ_c=1.210244   x=10000019: θ_c=1.212133
//
// === PART D — what the two extremes mean, as numbers ===
// at x = 29: Σ2/p = 1.400211, so the complete graph fails by a factor 1.4002 on the
// union-bound coordinate, while the matching graph passes with Z = 1.991211e-1 > 0.
// The whole distance between the two verdicts is which conditioning sets the window can verify.
//
// === PART E — the tightness witness on the complete graph, constructed explicitly ===
// Shearer's tightness is a general theorem. On a COMPLETE dependency graph it needs no
// theorem at all, and the witness is written out here so that the closure below does not
// rest on a paper this corpus has not opened. A complete dependency graph imposes NO
// independence requirement, so every probability space with the right marginals is
// admissible. Take Ω = [0,1) with Lebesgue measure and lay the 2K events out as DISJOINT
// intervals of lengths 1/p, 1/p. That realises the marginals exactly AND respects the
// within-prime mutual exclusion that import-suen.md §3 proves. Their union has measure
// Σ2/p, so whenever Σ2/p ≥ 1 the intervals cover Ω and P(no bad event) = 0 EXACTLY.
//
//   x  | Σ2/p     | Σ2/p − 1  | witness with P(survive) = 0 exists | P(survive) on the witness
//    5 | 0.400000 | -0.600000 |                 no                 | 0.600000
//    7 | 0.685714 | -0.314286 |                 no                 | 0.314286
//   11 | 0.867532 | -0.132468 |                 no                 | 0.132468
//   13 | 1.021379 |  0.021379 |                YES                 | 0.000000
//   17 | 1.139026 |  0.139026 |                YES                 | 0.000000
//   19 | 1.244289 |  0.244289 |                YES                 | 0.000000
//   23 | 1.331245 |  0.331245 |                YES                 | 0.000000
//   29 | 1.400211 |  0.400211 |                YES                 | 0.000000
//
// The witness is a probability space, not a set of residue classes. It says no argument
// that uses only the dependency graph and the marginals can certify a survivor from
// x = 13 on. It says NOTHING about whether the arithmetic instance has a survivor.
// ============================================================================
// READINGS
//
// 1. THE INSTRUMENT REPRODUCES THE TWO THINGS IT MUST. On the complete graph
//    K_n with equal probabilities the exact Shearer boundary is 0.50000000,
//    0.33333333, 0.25000000, 0.20000000, 0.16666667, 0.12500000 at
//    n = 2, 3, 4, 5, 6, 8, i.e. exactly 1/n, which is the identity PART B rests
//    on. On the matching graph the DP's Z_full equals ∏(1−2/p) to every printed
//    digit at all eight levels. Exact BigInt and float agree at x = 29,
//    H = 200, both returning Z_full 1.316912588760e-1.
//
// 2. THE TWO-CLASS MODEL AND THE ONE-EVENT-PER-PRIME MODEL ARE THE SAME
//    SHEARER PROBLEM (pre-registered P1). Brute force over all 2^{2K} subsets
//    of the 2K-vertex two-class graph, against all 2^K subsets of the K-vertex
//    graph with marginals 2/p: 38 (level, H) pairs tested, 38 agree,
//    0 disagree. So every table below may be read in either model, and the
//    corpus's "two classes per prime" and "one kill event per prime" phrasings
//    are interchangeable for this criterion.
//
// 3. ON A COMPLETE DEPENDENCY GRAPH SHEARER'S EXACT CRITERION IS THE UNION
//    BOUND. The only independent sets of K_n are the empty set and the
//    singletons, so Z_{K_n[S]}(−p) = 1 − Σ_{v∈S} p_v and the region is exactly
//    the simplex Σ p_v < 1. The computed critical scale t*_Sh is 2.5000,
//    1.4583, 1.1527, 0.9791, 0.8779, 0.8037, 0.7512, 0.7142 at
//    x = 5..29, which is 1/Σ2/p at every level to four decimals. This is not a
//    coincidence of the numbers: PART E constructs the extremal space.
//
// 4. SO THE LAST FEASIBLE LEVEL IS x = 11 AND THE WALL IS AT x = 13, NOT AT
//    x = 7. The complete-graph column reads YES, YES, YES at x = 5, 7, 11 and
//    no from x = 13 on, tracking Σ2/p = 0.867532 against 1.021379. The
//    pre-registered claim that the boundary IS the Mertens threshold is
//    confirmed as an identity; the pre-registered rider that the wall arrives
//    at x = 7 is refuted by two levels.
//
// 5. WHERE x = 7 COMES FROM (pre-registered P4). The asymmetric local lemma
//    optimised over ALL weight vectors, not just the ansatz x_q = c/q, is
//    feasible at x = 5 and fails from x = 7, with critical scales 2.5000,
//    0.7343, 0.5207, 0.4206, 0.3670, 0.3298, 0.3044, 0.2869. The two levels
//    Shearer buys are exactly the gap between the local lemma's sufficient
//    condition and the exact criterion, and they cost no hypothesis. The gap's
//    size is the classical one: on K_n the ratio Shearer/LLL runs 2.0000,
//    2.2500, 2.3704, 2.4414, 2.4883, 2.5465, climbing toward e.
//
// 6. THE MATCHING GRAPH PASSES AT EVERY LEVEL WITH THE SAME MARGIN, AND THE
//    MARGIN IS SET BY THE SMALLEST PRIME. t*_Sh on the matching graph is
//    2.5000 at every level from x = 5 to x = 29, because the binding component
//    is the single edge at p = 5 and 1 − t·(2/5) > 0 needs t < 2.5. Adding
//    primes does not touch it. That is import-suen.md §8(i)'s wrong proof of
//    the twin prime conjecture, seen in the exact criterion: the pairwise-drawn
//    graph is not merely feasible, it is feasible with a margin that never
//    degrades.
//
// 7. AND THE PAIRWISE-DRAWN GRAPH OVER-CERTIFIES BELOW THE p² RULE. The exact
//    threshold H*(x) is 35, 55, 65, 91, 115 at x = 13, 17, 19, 23, 29 and
//    reaches 481 at x = 79, against x² = 169, 289, 361, 529, 841 and 6241. The
//    ratio H*/x² falls from 0.20710 to 0.07707, not monotonically: it steps up
//    at 0.13840 and again at 0.11303 as a level adds a prime without moving the
//    threshold product. So the exact
//    criterion on this graph rule certifies a survivor in a window a tenth of
//    the p² rule's length, which is a sharper diagnosis than the empty-graph
//    reading gives: the defect is not that the argument reaches exactly the
//    conjecture, it is that it reaches far past it.
//
// 8. THE OVER-CERTIFICATION EXPONENT IS FLAT AT ABOUT 1.41 AND ITS PROVEN
//    FLOOR IS 2/√e. θ = ln H*/ln x reads 1.3861279760, 1.4144127881,
//    1.4177190628, 1.4386438615, 1.4091224436 at x = 13..29 and
//    1.4134205233 at x = 79, with no trend over the seventeen levels from
//    x = 13 to x = 79. The
//    pre-registered prediction that it would decrease toward 2/√e is NOT
//    confirmed in the computable range. What is confirmed is the floor itself,
//    which is a proof rather than a fit: the clique-only necessary condition
//    gives θ_c = 1.111542, 1.188678, 1.199746, 1.208307, 1.210244, 1.212133 at
//    x = 101 to 10⁷, converging to 2/√e = 1.2130613194 as Mertens says it must.
//    The gap between 1.41 and 1.21 is the part of the criterion the clique
//    condition does not see, and it does not close in this range.
//
// 9. TIGHTNESS ON THE COMPLETE GRAPH NEEDS NO THEOREM AND NO PAPER. PART E
//    writes the extremal space out: disjoint intervals of lengths 1/p, 1/p in
//    [0,1). It has the right marginals, it respects the within-prime mutual
//    exclusion, a complete dependency graph admits it, and its survival
//    probability is 0.000000 at x = 13, 17, 19, 23, 29 because Σ2/p − 1 is
//    0.021379, 0.139026, 0.244289, 0.331245, 0.400211 there. So the closure of
//    the graph-plus-marginals family at this reading does not depend on
//    Shearer's Combinatorica paper, which this corpus has still not opened.
//    Shearer's theorem is what makes the same statement for the SPARSE graphs,
//    where no such elementary witness is available.
//
// 10. WHAT THIS FILE DOES NOT SHOW. The witness of reading 9 is a probability
//    space, not a covering of an interval by residue classes. Nothing here
//    bounds G₂ from either side. The content is a statement about a class of
//    arguments: from x = 13 on, no argument whose only inputs are the
//    dependency graph and the per-event marginals can certify a survivor, and
//    the only way past that is to verify conditioning on sets, which is
//    import-suen.md §8's admissible conditioning-set modulus and prices out at
//    Bonferroni depth.
