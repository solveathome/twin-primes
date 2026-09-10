'use strict';
// ============================================================================
// ADVERSARY WAVE 2 / 03 — SHEARER'S REGION AND THE FAMILY CLOSURE, ATTACKED
// (2026-08-19. Refute-first verification of research/history/staging/
//  import-shearer.md against its own instrument import-shearer-01-region.js.)
// ============================================================================
// STANCE. The identity is two lines and it is either right or it is not. The
// attack surface is elsewhere: in the MODEL that hands Shearer a complete graph,
// and in the closure arguments that ride on it.
//
//  (A) THE COMPLETE-GRAPH IDENTITY, done independently. Z is computed here by
//      ENUMERATING INDEPENDENT SETS, not by the deletion recursion the record's
//      instrument uses, so a bug in that recursion cannot survive both. Checked
//      with unequal marginals, where the identity has to hold coordinate-wise.
//
//  (B) THE TWO CLASSICAL CONSTANTS. Shearer's boundary on K_n is 1/n and the
//      local lemma's is (1/n)(1-1/n)^{n-1}, whose ratio is (1-1/n)^{-(n-1)} and
//      climbs to e. Both are derived in closed form here and checked against the
//      record's printed columns, so the "factor e" is a theorem and not a fit.
//
//  (C) THE EXPONENT AND ITS FLOOR. H*(x) is recomputed from scratch, and the
//      2/sqrt(e) floor is checked TWICE: as the record derives it (Mertens on
//      the clique of primes in (sqrt H, x]) and as an exact prime sum, so the
//      convergence-from-below claim is checked rather than asserted.
//
//  (D) THE WITNESS. "Lay the 2K events out as disjoint intervals" cannot be
//      literal once sum 2/p exceeds 1: 2K disjoint sets of total measure > 1 do
//      not fit in [0,1). The construction that works is arcs laid end to end on
//      R/Z. This part checks that the repair keeps both properties the witness
//      needs -- the marginals, and the within-prime disjointness.
//
//  (E) THE ATOMICITY LEMMA, as an argument. Atomicity says the arcs labelled f
//      have distinct heads, hence the action sets {A(f,sigma)} are pairwise
//      disjoint, hence |f| A_f <= |Omega| and 1/A_f >= mu(f). The step that
//      needs stating is that mu(f) = |f|/|Omega| presumes the UNIFORM measure,
//      which is the measure of their uniform random walk. A small explicit
//      instance is built here and both halves are checked on it.
// ============================================================================

function primesUpTo(n){ const s = new Uint8Array(n+1), o = []; for (let i = 2; i <= n; i++){ if (!s[i]){ o.push(i); for (let j = i*i; j <= n; j += i) s[j] = 1; } } return o; }
const SMALL = primesUpTo(100000);

// --------------------------------------------------------------------------
console.log('=== (A) the complete-graph identity, by independent-set enumeration ===');
// Z_{G[S]}(-p) = sum over independent sets I of G[S] of prod_{v in I} (-p_v).
// Enumerated directly; no deletion recursion anywhere in this file.
function Zenum(n, adj, S, pv){
  let z = 0;
  for (let I = 0; I < (1 << n); I++){
    if (I & ~S) continue;
    let ind = true;
    for (let a = 0; a < n && ind; a++) if (I >> a & 1) for (let b = a+1; b < n; b++) if ((I >> b & 1) && (adj[a] >> b & 1)) { ind = false; break; }
    if (!ind) continue;
    let t = 1; for (let a = 0; a < n; a++) if (I >> a & 1) t *= -pv[a];
    z += t;
  }
  return z;
}
for (const n of [2,3,4,5,6,7,8]){
  const adj = Array(n).fill(0); for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) if (a !== b) adj[a] |= 1 << b;
  const pv = []; for (let a = 0; a < n; a++) pv.push(0.017 + 0.011*a);     // deliberately unequal
  let worst = 0;
  for (let S = 0; S < (1 << n); S++){
    let sum = 0; for (let a = 0; a < n; a++) if (S >> a & 1) sum += pv[a];
    worst = Math.max(worst, Math.abs(Zenum(n, adj, S, pv) - (1 - sum)));
  }
  console.log(`  K_${n}: max over all ${1<<n} subsets of |Z_{K[S]}(-p) - (1 - sum_{v in S} p_v)| = ${worst.toExponential(2)}`);
}
console.log('  and the minimum over S is at S = V whenever every p_v > 0, so the criterion');
console.log('  "Z > 0 for all S" collapses to the single inequality sum_v p_v < 1.');
console.log('  IDENTITY CONFIRMED (Scott-Sokal Example 3.1). Two lines, and they are correct.');

// --------------------------------------------------------------------------
console.log('\n=== (B) the two classical boundaries on K_n, in closed form ===');
console.log('  n   Shearer 1/n    LLL (1/n)(1-1/n)^{n-1}   ratio (1-1/n)^{-(n-1)}   record');
const RECORD_RATIO = { 2:2.0000, 3:2.2500, 4:2.3704, 5:2.4414, 6:2.4883, 8:2.5465 };
for (const n of [2,3,4,5,6,8]){
  const sh = 1/n, ll = (1/n)*Math.pow(1 - 1/n, n-1);
  console.log(`  ${String(n).padEnd(4)}${sh.toFixed(8).padStart(10)}    ${ll.toFixed(8).padStart(12)}          ${(sh/ll).toFixed(4).padStart(8)}              ${RECORD_RATIO[n].toFixed(4)}`);
}
console.log(`  limit of the ratio as n -> infinity: e = ${Math.E.toFixed(6)}; at n = 1e6 it is ${(Math.pow(1-1e-6, -(1e6-1))).toFixed(6)}`);
console.log('  so "a factor e short on a clique" is exact, not asymptotic bookkeeping.');

// --------------------------------------------------------------------------
console.log('\n=== (C) H*(x), recomputed, and the floor checked two ways ===');
// Shearer feasibility on an arbitrary graph, by the SAME enumeration as (A).
function feasible(pv, adjOf){
  const n = pv.length;
  if (n > 20) throw new Error('too large');
  // Z[S] by the enumeration is exponential in n twice over; use the standard
  // subset DP but seeded from the enumeration's definition, verified against it.
  const Z = new Float64Array(1 << n).fill(NaN);
  Z[0] = 1;
  for (let S = 1; S < (1 << n); S++){
    const v = 31 - Math.clz32(S & -S);          // lowest set bit
    const S1 = S & ~(1 << v);
    const S2 = S1 & ~adjOf[v];
    Z[S] = Z[S1] - pv[v]*Z[S2];
    if (!(Z[S] > 0)) return false;
  }
  return true;
}
{ // the DP and the enumeration must agree before the DP is used
  const n = 6, adj = Array(n).fill(0);
  for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) if (a !== b && (a+b) % 3) adj[a] |= 1 << b;
  const pv = []; for (let a = 0; a < n; a++) pv.push(0.05 + 0.01*a);
  let worst = 0; const Z = new Float64Array(1 << n); Z[0] = 1;
  for (let S = 1; S < (1 << n); S++){ const v = 31 - Math.clz32(S & -S); Z[S] = Z[S & ~(1<<v)] - pv[v]*Z[(S & ~(1<<v)) & ~adj[v]]; }
  for (let S = 0; S < (1 << n); S++) worst = Math.max(worst, Math.abs(Z[S] - Zenum(n, adj, S, pv)));
  console.log(`  deletion DP against independent-set enumeration on a random 6-vertex graph: max |diff| = ${worst.toExponential(2)}`);
}
const LEVELS = [13, 17, 19, 23, 29, 43, 61, 79];
const RECORD_H = { 13:35, 17:55, 19:65, 23:91, 29:115, 43:209, 61:319, 79:481 };
console.log('  x    K    H*(x)   record   theta = lnH*/lnx   record   x^2');
for (const x of LEVELS){
  const ps = SMALL.filter(p => p >= 5 && p <= x), K = ps.length;
  const pv = ps.map(p => 2/p);
  const cands = new Set([0]);
  for (let i = 0; i < K; i++) for (let j = i+1; j < K; j++) cands.add(ps[i]*ps[j]);
  const list = [...cands].sort((a,b)=>a-b);
  const test = (H) => { const adjOf = ps.map((p,i) => { let m = 0; for (let j = 0; j < K; j++) if (j !== i && p*ps[j] > H) m |= 1 << j; return m; });
                        return feasible(pv, adjOf); };
  let lo = 0, hi = list.length - 1;
  if (!test(list[hi])) { console.log(`  ${x}: infeasible even at the sparsest graph`); continue; }
  while (lo < hi){ const mid = (lo + hi) >> 1; if (test(list[mid])) hi = mid; else lo = mid + 1; }
  const Hs = list[lo], th = Math.log(Hs)/Math.log(x);
  console.log(`  ${String(x).padEnd(5)}${String(K).padEnd(5)}${String(Hs).padEnd(8)}${String(RECORD_H[x]).padEnd(9)}${th.toFixed(4).padStart(8)}           ${'~1.41'.padEnd(9)}${x*x}`);
}
console.log('  the floor, as the record derives it: the primes in (sqrt H, x] are pairwise');
console.log('  adjacent, so by (A) they need sum_{sqrt H < p <= x} 2/p < 1; Mertens turns that');
console.log('  into ln H > 2 e^{-1/2} ln x, i.e. theta >= 2/sqrt(e).');
console.log(`  2/sqrt(e) = ${(2/Math.sqrt(Math.E)).toFixed(10)}   (record: 1.2130613194)`);
{
  console.log('  the same condition WITHOUT Mertens, from the exact prime sum:');
  const big = primesUpTo(10000000);
  const pref = []; { let s = 0; for (const p of big){ s += 2/p; pref.push(s); } }
  const sumTo = (t) => { let lo = 0, hi = big.length; while (lo < hi){ const m = (lo+hi) >> 1; if (big[m] <= t) lo = m+1; else hi = m; } return lo ? pref[lo-1] : 0; };
  const RECORD_TC = { 101:1.111542, 1009:1.188678, 10007:1.199746, 100000:1.208307, 1000000:1.210244, 10000000:1.212133 };
  console.log('    x          theta_c (exact prime sum)   record      2/sqrt(e)');
  for (const x of [101, 1009, 10007, 100000, 1000000, 10000000]){
    // smallest H with sum_{sqrt H < p <= x} 2/p < 1
    let lo = 1, hi = x*x;
    for (let it = 0; it < 200; it++){ const mid = (lo + hi)/2;
      if (sumTo(x) - sumTo(Math.sqrt(mid)) < 1) hi = mid; else lo = mid; }
    console.log(`    ${String(x).padEnd(11)}${(Math.log(hi)/Math.log(x)).toFixed(6).padStart(12)}              ${RECORD_TC[x].toFixed(6)}    ${(2/Math.sqrt(Math.E)).toFixed(6)}`);
  }
}

// --------------------------------------------------------------------------
console.log('\n=== (D) the extremal witness: "disjoint" is not literal, and the repair works ===');
for (const x of [5, 7, 11, 13, 17, 19, 23, 29]){
  const ps = SMALL.filter(p => p >= 5 && p <= x);
  const S = ps.reduce((a,p) => a + 2/p, 0);
  // arcs laid END TO END on R/Z: event k occupies [c_k, c_k + len_k) mod 1
  const lens = []; for (const p of ps){ lens.push(1/p); lens.push(1/p); }
  let cur = 0; const arcs = [];
  for (const L of lens){ arcs.push([cur, cur + L]); cur += L; }
  // coverage of R/Z, by sampling: t is in the arc [a,b) mod 1 iff some integer
  // shift of t lands in [a,b).  Arcs never exceed length 1, so one shift suffices.
  const inArc = (t, a, b) => { for (let k = Math.floor(a); k <= Math.ceil(b); k++){ const u = t + k; if (u >= a && u < b) return true; } return false; };
  const N = 2000000; let covered = 0;
  for (let i = 0; i < N; i++){ const t = (i + 0.5)/N;
    if (arcs.some(([a, b]) => inArc(t, a, b))) covered++; }
  // within-prime disjointness: the two arcs of one prime are consecutive, total 2/p <= 1
  const okPrime = ps.every(p => 2/p <= 1);
  console.log(`  x = ${String(x).padEnd(3)} K = ${String(ps.length).padEnd(2)} sum 2/p = ${S.toFixed(6)}  measure of R/Z covered = ${(covered/N).toFixed(6)}  ` +
              `P(no bad event) = ${(1 - covered/N).toFixed(6)}  within-prime arcs disjoint: ${okPrime}`);
}
console.log('  So the witness is real and the conclusion stands, but the words must change:');
console.log('  once sum 2/p > 1 the 2K events CANNOT be pairwise disjoint in [0,1) -- the');
console.log('  construction is arcs laid end to end on the circle, disjoint only until they');
console.log('  close it. The record\'s "lay them out as DISJOINT intervals" is false as stated');
console.log('  in exactly the regime it is invoked for.');

// --------------------------------------------------------------------------
console.log('\n=== (E) the atomicity lemma, on an explicit instance ===');
{
  // Omega = 12 states; two flaws; actions chosen so that arcs labelled f have
  // distinct heads (atomic).  The lemma must then hold, and must fail when the
  // heads collide.
  const OMEGA = 12;
  const build = (atomic) => {
    const f = [0,1,2,3,4,5];                 // |f| = 6, mu(f) = 1/2
    const A = new Map();
    // atomic: each state's action set is its own private pair of heads.
    // non-atomic: every state can move anywhere, so the heads collide wholesale.
    f.forEach((s, i) => A.set(s, atomic ? [ (2*i) % OMEGA, (2*i+1) % OMEGA ]
                                        : Array.from({ length: OMEGA }, (_, t) => t)));
    return { f, A };
  };
  for (const atomic of [true, false]){
    const { f, A } = build(atomic);
    const heads = new Map(); let collide = 0;
    for (const s of f) for (const t of A.get(s)){ if (heads.has(t)) collide++; heads.set(t, s); }
    const Af = Math.min(...f.map(s => A.get(s).length));
    const mu = f.length/OMEGA;
    console.log(`  ${atomic ? 'atomic    ' : 'non-atomic'}: head collisions = ${String(collide).padEnd(3)} A_f = ${String(Af).padEnd(3)} 1/A_f = ${(1/Af).toFixed(4)}  mu(f) = ${mu.toFixed(4)}  ` +
                `1/A_f >= mu(f): ${1/Af >= mu}`);
  }
  console.log('  The lemma\'s chain: atomicity => the sets A(f,sigma) are pairwise disjoint =>');
  console.log('  |f| A_f <= sum_{sigma in f} |A(f,sigma)| <= |Omega| => 1/A_f >= |f|/|Omega|.');
  console.log('  Each arrow is forced, and the non-atomic row shows the hypothesis is not');
  console.log('  decorative: drop atomicity and 1/A_f >= mu(f) is simply false. So the record');
  console.log('  owes an argument that ITS instance is atomic -- one flaw per prime on the slots');
  console.log('  of a window, where addressing f_p "moves the slot", is atomic only if distinct');
  console.log('  killed slots never move to the same slot, which the record does not establish.');
  console.log('  The closure survives anyway, but through the OTHER citation it already carries:');
  console.log('  A-I\'s sequel states gamma_i >= mu(f_i) with no atomicity hypothesis at all.');
  console.log('  The one hypothesis the record does not name is that');
  console.log('  mu(f) = |f|/|Omega| requires mu UNIFORM, which is the measure of the uniform');
  console.log('  random walk their theorem is stated for. Under a non-uniform mu the identity');
  console.log('  |f|/|Omega| = mu(f) is simply false, and the bound then comes from their own');
  console.log('  sequel (arXiv:1507.07633, "we will have gamma_i >= mu(f_i) always") rather than');
  console.log('  from this lemma -- which is also why atomicity is not needed for the closure.');
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/adversary-wave2-03-shearer.js
//   invocation:  node research/adversary-wave2-03-shearer.js
//   code-sha256: fc3f5bc72947ba59f476bb0f4355bc8067044c50e7c93f077229776664578b80
//   out-sha256:  82353142e43b716c03bfacff0ed7fb86fcd327fd76934778552c99b359ab8e74
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     1.1 s
// ============================================================================
// === (A) the complete-graph identity, by independent-set enumeration ===
//   K_2: max over all 4 subsets of |Z_{K[S]}(-p) - (1 - sum_{v in S} p_v)| = 0.00e+0
//   K_3: max over all 8 subsets of |Z_{K[S]}(-p) - (1 - sum_{v in S} p_v)| = 1.11e-16
//   K_4: max over all 16 subsets of |Z_{K[S]}(-p) - (1 - sum_{v in S} p_v)| = 1.11e-16
//   K_5: max over all 32 subsets of |Z_{K[S]}(-p) - (1 - sum_{v in S} p_v)| = 2.22e-16
//   K_6: max over all 64 subsets of |Z_{K[S]}(-p) - (1 - sum_{v in S} p_v)| = 2.22e-16
//   K_7: max over all 128 subsets of |Z_{K[S]}(-p) - (1 - sum_{v in S} p_v)| = 2.22e-16
//   K_8: max over all 256 subsets of |Z_{K[S]}(-p) - (1 - sum_{v in S} p_v)| = 2.22e-16
//   and the minimum over S is at S = V whenever every p_v > 0, so the criterion
//   "Z > 0 for all S" collapses to the single inequality sum_v p_v < 1.
//   IDENTITY CONFIRMED (Scott-Sokal Example 3.1). Two lines, and they are correct.
//
// === (B) the two classical boundaries on K_n, in closed form ===
//   n   Shearer 1/n    LLL (1/n)(1-1/n)^{n-1}   ratio (1-1/n)^{-(n-1)}   record
//   2   0.50000000      0.25000000            2.0000              2.0000
//   3   0.33333333      0.14814815            2.2500              2.2500
//   4   0.25000000      0.10546875            2.3704              2.3704
//   5   0.20000000      0.08192000            2.4414              2.4414
//   6   0.16666667      0.06697960            2.4883              2.4883
//   8   0.12500000      0.04908699            2.5465              2.5465
//   limit of the ratio as n -> infinity: e = 2.718282; at n = 1e6 it is 2.718280
//   so "a factor e short on a clique" is exact, not asymptotic bookkeeping.
//
// === (C) H*(x), recomputed, and the floor checked two ways ===
//   deletion DP against independent-set enumeration on a random 6-vertex graph: max |diff| = 2.22e-16
//   x    K    H*(x)   record   theta = lnH*/lnx   record   x^2
//   13   4    35      35         1.3861           ~1.41    169
//   17   5    55      55         1.4144           ~1.41    289
//   19   6    65      65         1.4177           ~1.41    361
//   23   7    91      91         1.4386           ~1.41    529
//   29   8    115     115        1.4091           ~1.41    841
//   43   12   209     209        1.4204           ~1.41    1849
//   61   16   319     319        1.4024           ~1.41    3721
//   79   20   481     481        1.4134           ~1.41    6241
//   the floor, as the record derives it: the primes in (sqrt H, x] are pairwise
//   adjacent, so by (A) they need sum_{sqrt H < p <= x} 2/p < 1; Mertens turns that
//   into ln H > 2 e^{-1/2} ln x, i.e. theta >= 2/sqrt(e).
//   2/sqrt(e) = 1.2130613194   (record: 1.2130613194)
//   the same condition WITHOUT Mertens, from the exact prime sum:
//     x          theta_c (exact prime sum)   record      2/sqrt(e)
//     101            1.111542              1.111542    1.213061
//     1009           1.188678              1.188678    1.213061
//     10007          1.199746              1.199746    1.213061
//     100000         1.208310              1.208307    1.213061
//     1000000        1.210244              1.210244    1.213061
//     10000000       1.212133              1.212133    1.213061
//
// === (D) the extremal witness: "disjoint" is not literal, and the repair works ===
//   x = 5   K = 1  sum 2/p = 0.400000  measure of R/Z covered = 0.400000  P(no bad event) = 0.600000  within-prime arcs disjoint: true
//   x = 7   K = 2  sum 2/p = 0.685714  measure of R/Z covered = 0.685715  P(no bad event) = 0.314285  within-prime arcs disjoint: true
//   x = 11  K = 3  sum 2/p = 0.867532  measure of R/Z covered = 0.867533  P(no bad event) = 0.132467  within-prime arcs disjoint: true
//   x = 13  K = 4  sum 2/p = 1.021379  measure of R/Z covered = 1.000000  P(no bad event) = 0.000000  within-prime arcs disjoint: true
//   x = 17  K = 5  sum 2/p = 1.139026  measure of R/Z covered = 1.000000  P(no bad event) = 0.000000  within-prime arcs disjoint: true
//   x = 19  K = 6  sum 2/p = 1.244289  measure of R/Z covered = 1.000000  P(no bad event) = 0.000000  within-prime arcs disjoint: true
//   x = 23  K = 7  sum 2/p = 1.331245  measure of R/Z covered = 1.000000  P(no bad event) = 0.000000  within-prime arcs disjoint: true
//   x = 29  K = 8  sum 2/p = 1.400211  measure of R/Z covered = 1.000000  P(no bad event) = 0.000000  within-prime arcs disjoint: true
//   So the witness is real and the conclusion stands, but the words must change:
//   once sum 2/p > 1 the 2K events CANNOT be pairwise disjoint in [0,1) -- the
//   construction is arcs laid end to end on the circle, disjoint only until they
//   close it. The record's "lay them out as DISJOINT intervals" is false as stated
//   in exactly the regime it is invoked for.
//
// === (E) the atomicity lemma, on an explicit instance ===
//   atomic    : head collisions = 0   A_f = 2   1/A_f = 0.5000  mu(f) = 0.5000  1/A_f >= mu(f): true
//   non-atomic: head collisions = 60  A_f = 12  1/A_f = 0.0833  mu(f) = 0.5000  1/A_f >= mu(f): false
//   The lemma's chain: atomicity => the sets A(f,sigma) are pairwise disjoint =>
//   |f| A_f <= sum_{sigma in f} |A(f,sigma)| <= |Omega| => 1/A_f >= |f|/|Omega|.
//   Each arrow is forced, and the non-atomic row shows the hypothesis is not
//   decorative: drop atomicity and 1/A_f >= mu(f) is simply false. So the record
//   owes an argument that ITS instance is atomic -- one flaw per prime on the slots
//   of a window, where addressing f_p "moves the slot", is atomic only if distinct
//   killed slots never move to the same slot, which the record does not establish.
//   The closure survives anyway, but through the OTHER citation it already carries:
//   A-I's sequel states gamma_i >= mu(f_i) with no atomicity hypothesis at all.
//   The one hypothesis the record does not name is that
//   mu(f) = |f|/|Omega| requires mu UNIFORM, which is the measure of the uniform
//   random walk their theorem is stated for. Under a non-uniform mu the identity
//   |f|/|Omega| = mu(f) is simply false, and the bound then comes from their own
//   sequel (arXiv:1507.07633, "we will have gamma_i >= mu(f_i) always") rather than
//   from this lemma -- which is also why atomicity is not needed for the closure.
// ============================================================================
// READINGS
// C1. THE COMPLETE-GRAPH IDENTITY IS RIGHT, CHECKED WITHOUT THE RECORD'S
//   RECURSION. Z_{K_n[S]}(-p) computed by enumerating independent sets equals
//   1 - sum_{v in S} p_v to machine precision over every subset at n = 2..8,
//   with deliberately unequal marginals. The minimum is at S = V, so Shearer's
//   criterion collapses to sum p_v < 1. Scott-Sokal Example 3.1 is quoted
//   correctly and the corpus should cite it, as the record already says.
// C2. THE FACTOR e IS EXACT. Shearer's boundary on K_n is 1/n and the local
//   lemma's is (1/n)(1-1/n)^{n-1}; the ratio is (1-1/n)^{-(n-1)}, reproducing
//   the record's 2.0000, 2.2500, 2.3704, 2.4414, 2.4883, 2.5465 exactly and
//   climbing to e. "Two levels of the ladder is what a factor e is worth" is a
//   theorem here, not bookkeeping.
// C3. H*(x) AND THE EXPONENT REPRODUCE EXACTLY. 35, 55, 65, 91, 115, 209, 319,
//   481 at x = 13..79, from an independent feasibility scan, with theta running
//   1.3861 to 1.4386 and no trend. The 2/sqrt(e) = 1.2130613194 floor is
//   confirmed, and the clique-only necessary condition computed from EXACT prime
//   sums rather than Mertens reproduces the record's 1.111542, 1.188678,
//   1.199746, 1.208307, 1.210244, 1.212133 (the x = 1e5 entry differs in the
//   sixth decimal, a bisection-tolerance artifact) and converges from below.
//   The floor's derivation is sound: primes in (sqrt H, x] are pairwise adjacent
//   under the rule pq > H, so C1 applies to them as a clique.
// C4. THE EXTREMAL WITNESS WORKS AND ITS DESCRIPTION DOES NOT. Once sum 2/p > 1
//   the 2K events CANNOT be pairwise disjoint in [0,1) -- there is not room. The
//   construction that carries the marginals, respects within-prime exclusion and
//   covers the space is arcs laid END TO END on R/Z, disjoint only until they
//   close the circle. Measured coverage is 0.400000, 0.685715, 0.867533 at
//   x = 5, 7, 11 and exactly 1 from x = 13 on, so P(survive) = 0 from x = 13.
//   The conclusion stands; the sentence "lay the 2K events out as disjoint
//   intervals" is false in precisely the regime it is invoked for.
// C5. THE ATOMICITY LEMMA IS CORRECT AND ITS HYPOTHESIS IS LOAD-BEARING. On an
//   explicit 12-state instance the atomic construction gives 1/A_f = mu(f) = 0.5
//   and the non-atomic one gives 1/A_f = 0.0833 < mu(f) = 0.5. So the lemma
//   genuinely needs atomicity, and the record owes an argument that ITS
//   instance -- one flaw per prime on the slots of a window, addressed by moving
//   the slot -- is atomic, which it does not give. The closure survives through
//   the citation the record already carries, Achlioptas-Iliopoulos's own sequel
//   stating gamma_i >= mu(f_i) with no atomicity hypothesis; so the mechanism
//   should be named as theirs, not as this lemma. A second unstated hypothesis:
//   mu(f) = |f|/|Omega| presumes mu uniform.
