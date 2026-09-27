// ============================================================================
// ATTACK L-LAW — WHAT DOES `L` DO ON ITS OWN, LEVEL BY LEVEL?
//
// THE OBJECT. Fix a tile T_v (residues r mod v# with r and r+2 both coprime to
// v#) and a set Q of primes disjoint from the tile's. Each p in Q may delete
// one two-class set {a_p, a_p - 2} mod p, with a_p FREE. Define
//
//   L(v, Q) = the greatest l such that SOME run of l consecutive T_v slots is
//             entirely deleted by the union of those two-class sets.
//
// This is the covering form, not the sieve form (`research/qc/units.js` item 5).
// The a_p are free because CRT makes the run's start position s_0 realise any
// prescribed (s_0 mod p)_{p in Q} at a real T_v slot: gcd(v#, prod Q) = 1.
//
// v = 3 IS THE INTERVAL COORDINATE. T_3 = {5 mod 6}, one slot per 6 integers,
// so L(3, {5..x}) is the number of consecutive T_3 slots covered and OEIS
// A144311's a(n) = 6*L + 5 is the length of the integer interval [1, a(n)]
// covered by two classes per prime up to x. So the brief's "[1, L] coverable by
// a block's primes" and the repo's "combined L" are ONE object in two
// coordinates, related by the tile. This script computes both.
//
// WHAT IS COMPUTED, AND WITH WHAT INSTRUMENT.
//   1. Tiles, and the exact identity minsum_{L+1}(T_v) <= G2 <= maxsum_{L+1}(T_v)
//      that ties L in the slot coordinate to G2 in the integer coordinate.
//   2. THE EXACT INSTRUMENT: a branch-and-bound decision procedure for
//      "is this offset set coverable by these primes at two classes each",
//      with the union-bound prune. It is exhaustive: a NO is a proof.
//      Validated three ways — against full-period enumeration where the period
//      is small enough to scan, against A144311's published terms, and against
//      brute force over every legal assignment at the smallest blocks.
//   3. THE LADDER. L(v, y) for v in {3, 5, 7, 11} and y running upward through
//      the primes, one prime added per level, with the phase structure and the
//      node cost recorded, until the node budget stops it. Feasibility is
//      decided at EVERY l by its own exhaustive search; nothing is bisected and
//      nothing is inherited from a neighbouring l.
//   4. CLOSURE, tested not assumed: the set of feasible l is an initial segment.
//   5. THE COUNTING CRITERION, KEPT SEPARATE. S(l,f) = sum_p max_a #{i<l :
//      d_i = a or a-2 mod p} is Theorem D's necessary condition. It is a
//      staircase and is NOT monotone in l. It is also exactly the ROOT NODE of
//      the search in 2, which is why it can never be sharper than the search.
//   6. THE ABSCISSA. L is regressed against five candidate abscissae: the
//      number of primes in the block, its theta, the top prime y, the block's
//      Mertens mass sum 2/p, and 1/mbar(T_v). Slope, and the exponent under a
//      power law, for each. The corpus lost a week this month to fitting in x
//      where the right variable was theta(x); so more than one is tested and
//      the data is asked which it prefers.
//   7. THE DISTANCE TO 529, in both readings, with the impossibility said out
//      loud where there is one.
//
// MONOTONICITY, DECLARED. This script assumes monotonicity in exactly one
// place: L = (first infeasible l) - 1, which is licensed by downward closure
// (a run of l+1 deleted slots contains a run of l deleted slots, at the same
// phase, and its cover restricts). Section 4 re-tests that closure rather than
// citing it. NOTHING here bisects, and no claim is made that any certificate,
// margin or ratio is monotone in L; the criterion of section 5 is explicitly
// not monotone and is reported as the staircase it is.
//
// Deterministic: node budgets, never wall clocks, and no timings are printed,
// so the tail reproduces byte for byte.
// ============================================================================
'use strict';

const f2 = (x, n) => Number(x).toFixed(n);
const pad = (s, n) => String(s).padEnd(n);
const lpad = (s, n) => String(s).padStart(n);

function primesUpTo(n) {
  const s = new Uint8Array(n + 1), out = [];
  for (let i = 2; i <= n; i++) { if (!s[i]) { out.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } }
  return out;
}
const ALLP = primesUpTo(2000);

// ---------------------------------------------------------------------------
// Tiles.
// ---------------------------------------------------------------------------
function tile(v) {
  const ps = ALLP.filter(p => p <= v);
  const P = ps.reduce((a, p) => a * p, 1);
  const S = [];
  for (let r = 0; r < P; r++) {
    let ok = true;
    for (const p of ps) if (r % p === 0 || (r + 2) % p === 0) { ok = false; break; }
    if (ok) S.push(r);
  }
  // the cyclic gap; at n = 1 the wrap is the whole modulus, not 0
  const G = S.map((s, i) => ((S[(i + 1) % S.length] - s + P - 1) % P) + 1);
  return { v, P, S, G, n: S.length, mbar: P / S.length };
}
const TILE = {};
for (const v of [3, 5, 7, 11, 13]) TILE[v] = tile(v);

function sums(t, m) {                     // max and min of m consecutive gaps
  let mx = 0, mn = Infinity;
  for (let f = 0; f < t.n; f++) {
    let s = 0; for (let k = 0; k < m; k++) s += t.G[(f + k) % t.n];
    if (s > mx) mx = s; if (s < mn) mn = s;
  }
  return { max: mx, min: mn };
}
const maxsum = (t, m) => sums(t, m).max;
const minsum = (t, m) => sums(t, m).min;

// offsets of a run of l slots starting at slot-phase f
function offsets(t, f, l) {
  const d = new Int32Array(l); let s = 0;
  for (let i = 0; i < l; i++) { d[i] = s; s += t.G[(f + i) % t.n]; }
  return d;
}

console.log('=== 1. THE OBJECT AND ITS TWO COORDINATES ===========================');
console.log('tile  slots n   modulus v#   mbar = v#/n   gap word (first 12)');
for (const v of [3, 5, 7, 11, 13]) {
  const t = TILE[v];
  console.log('T_' + pad(v, 4) + lpad(t.n, 7) + lpad(t.P, 13) + lpad(f2(t.mbar, 4), 14) + '   ' +
    t.G.slice(0, 12).join(',') + (t.n > 12 ? ',...' : ''));
}
console.log('');
console.log('A run of L deleted slots is bracketed by the tile\'s own gap sums:');
console.log('  minsum_{L+1}(T_v) <= (the gap it opens) <= maxsum_{L+1}(T_v).');
console.log('At v = 3 the tile is one slot per 6, so the bracket is exact and');
console.log('  G2 = 6(L+1),  A144311(n) = 6L + 5 = G2 - 1.');

// ---------------------------------------------------------------------------
// 2. THE EXACT INSTRUMENT.
// coverable(D, primes, budget): is there (a_p) with every D[i] in some
// {a_p, a_p - 2} mod p?  Branch on the FIRST uncovered position, over every
// unused prime and its two admissible classes. Prune with the union bound on
// the residual, which is admissible because the residual only shrinks.
// ---------------------------------------------------------------------------
function coverable(D, primes, budget) {
  const nPos = D.length, K = primes.length;
  const dmod = [], posByRes = [], cnt = [];
  for (let k = 0; k < K; k++) {
    const p = primes[k], dm = new Int32Array(nPos), c = new Int32Array(p);
    const pbr = []; for (let r = 0; r < p; r++) pbr.push([]);
    for (let i = 0; i < nPos; i++) { const r = D[i] % p; dm[i] = r; pbr[r].push(i); c[r]++; }
    dmod.push(dm); posByRes.push(pbr); cnt.push(c);
  }
  const covered = new Uint8Array(nPos), used = new Uint8Array(K);
  let unc = nPos, nodes = 0, aborted = false;
  const assign = [];

  const bestOf = (k) => {
    const p = primes[k], c = cnt[k]; let m = 0;
    for (let a = 0; a < p; a++) { const v = c[a] + c[(a - 2 + p) % p]; if (v > m) m = v; }
    return m;
  };
  const coverPos = (i, newly) => {
    covered[i] = 1; unc--; newly.push(i);
    for (let k = 0; k < K; k++) if (!used[k]) cnt[k][dmod[k][i]]--;
  };
  const uncoverPos = (i) => {
    covered[i] = 0; unc++;
    for (let k = 0; k < K; k++) if (!used[k]) cnt[k][dmod[k][i]]++;
  };

  function dfs() {
    if (unc === 0) return true;
    if (++nodes > budget) { aborted = true; return false; }
    let s = 0;
    for (let k = 0; k < K; k++) if (!used[k]) s += bestOf(k);
    if (s < unc) return false;                       // the union-bound prune
    let j = 0; while (covered[j]) j++;
    for (let k = 0; k < K; k++) {
      if (used[k]) continue;
      const p = primes[k], a1 = D[j] % p, a2 = (D[j] + 2) % p;
      const opts = a1 === a2 ? [a1] : [a1, a2];
      for (const a of opts) {
        const ao = (a - 2 + p) % p;
        used[k] = 1;
        const newly = [];
        for (const i of posByRes[k][a]) if (!covered[i]) coverPos(i, newly);
        if (ao !== a) for (const i of posByRes[k][ao]) if (!covered[i]) coverPos(i, newly);
        assign.push([p, a]);
        if (dfs()) return true;
        assign.pop();
        for (let z = newly.length - 1; z >= 0; z--) uncoverPos(newly[z]);
        used[k] = 0;
        if (aborted) return false;
      }
    }
    return false;
  }
  const ok = dfs();
  return { ok, aborted, nodes, assign: ok ? assign.slice() : null };
}

// the counting criterion = the root node of the above, before any branching
function critS(t, primes, f, l) {
  const d = offsets(t, f, l);
  let tot = 0;
  for (const p of primes) {
    const c = new Int32Array(p);
    for (let i = 0; i < l; i++) c[d[i] % p]++;
    let m = 0;
    for (let a = 0; a < p; a++) { const v = c[a] + c[(a - 2 + p) % p]; if (v > m) m = v; }
    tot += m;
  }
  return tot;
}

// canonical phase key: the offset vector, and its reversal (covering is
// invariant under d -> C - d, which sends {a, a-2} to {C-a+2, C-a})
function phaseKey(t, f, l) {
  const d = offsets(t, f, l), C = d[l - 1];
  const a = Array.from(d).join(','), b = Array.from(d).map(x => C - x).reverse().join(',');
  return a < b ? a : b;
}

// decide feasibility of length l over all phases; ordered by the criterion so a
// YES is found fast, but a NO is only returned after every distinct phase has
// been searched to exhaustion.
function feasibleAt(t, primes, l, budget) {
  const seen = new Set(), order = [];
  for (let f = 0; f < t.n; f++) {
    const key = phaseKey(t, f, l);
    if (seen.has(key)) continue;
    seen.add(key);
    order.push({ f, S: critS(t, primes, f, l) });
  }
  order.sort((a, b) => b.S - a.S);
  let nodes = 0, aborted = false;
  const okPhases = [];
  for (const o of order) {
    if (o.S < l) continue;                     // criterion already forbids it
    const r = coverable(offsets(t, o.f, l), primes, budget);
    nodes += r.nodes;
    if (r.aborted) { aborted = true; break; }
    if (r.ok) { okPhases.push(o.f); break; }
  }
  return { ok: okPhases.length > 0, phase: okPhases[0], aborted, nodes, distinctPhases: order.length };
}

// the ladder for one (tile, block): first infeasible l minus one
function ladderL(t, primes, budget, hardStop) {
  let l = 1, last = 0, lastPhase = -1, totNodes = 0;
  for (; l <= hardStop; l++) {
    const r = feasibleAt(t, primes, l, budget);
    totNodes += r.nodes;
    if (r.aborted) return { L: last, phase: lastPhase, status: 'BUDGET', firstDead: 0, nodes: totNodes, distinctPhases: r.distinctPhases };
    if (r.ok) { last = l; lastPhase = r.phase; }
    else return { L: l - 1, phase: lastPhase, status: 'EXACT', firstDead: l, nodes: totNodes, distinctPhases: r.distinctPhases };
  }
  return { L: last, phase: lastPhase, status: 'HARDSTOP', firstDead: 0, nodes: totNodes, distinctPhases: 0 };
}

// ---------------------------------------------------------------------------
// Validation 1: full-period enumeration, where the period is small enough.
// ---------------------------------------------------------------------------
function truthByScan(t, primes, cap) {
  const per = primes.reduce((a, p) => a * p, 1);
  const N = t.n * per;
  if (N > cap) return null;
  const dead = new Uint8Array(N);
  for (const p of primes) {
    const cyc = t.n * p;
    for (let i = 0; i < cyc; i++) {
      const s = t.P * Math.floor(i / t.n) + t.S[i % t.n], r = s % p;
      if (r === 0 || r === p - 2) for (let j = i; j < N; j += cyc) dead[j] = 1;
    }
  }
  let best = 0, cur = 0;
  for (let i = 0; i < 2 * N; i++) { if (dead[i % N]) { cur++; if (cur > best) best = cur; } else cur = 0; }
  // achievable lengths, each decided by its own independent window scan
  const ach = [];
  for (let l = 1; l <= best + 3; l++) {
    let alive = 0, found = false;
    for (let i = 0; i < l; i++) if (!dead[i % N]) alive++;
    if (!alive) found = true;
    for (let i = 1; i < N && !found; i++) {
      if (!dead[(i - 1) % N]) alive--;
      if (!dead[(i + l - 1) % N]) alive++;
      if (!alive) found = true;
    }
    if (found) ach.push(l);
  }
  return { N, truth: best, ach };
}

// Validation 2: brute force over every legal assignment (no pruning at all)
function bruteL(t, primes, hardStop) {
  let best = 0;
  for (let f = 0; f < t.n; f++) {
    const d = offsets(t, f, hardStop);
    const cov = new Uint8Array(hardStop);
    const rec = (k) => {
      if (k === primes.length) {
        let i = 0; while (i < hardStop && cov[i]) i++;
        if (i > best) best = i;
        return;
      }
      const p = primes[k];
      for (let a = 0; a < p; a++) {
        const ao = (a - 2 + p) % p, added = [];
        for (let i = 0; i < hardStop; i++) {
          const r = d[i] % p;
          if ((r === a || r === ao) && !cov[i]) { cov[i] = 1; added.push(i); }
        }
        rec(k + 1);
        for (const i of added) cov[i] = 0;
      }
    };
    rec(0);
  }
  return best;
}

const A144311 = [1, 5, 11, 29, 41, 65, 107, 149, 203, 257, 347, 527, 545, 617,
                 707, 869, 965, 1079, 1283, 1397, 1529, 1709];   // n = 1..22, x = 2..79
const A_X = ALLP.slice(0, 22);                                   // 2 .. 79

console.log('');
console.log('=== 2. THE EXACT INSTRUMENT, VALIDATED THREE WAYS ===================');
console.log('(a) against full-period enumeration (the period is scanned, not sampled)');
console.log('');
console.log('tile  block primes            slots in period   scan truth  search L  status  agree');
const VAL = [
  [5, [7, 11]], [5, [7, 11, 13]], [5, [7, 11, 13, 17]], [5, [7, 11, 13, 17, 19]],
  [5, [7, 11, 13, 17, 19, 23]],
  [7, [11, 13, 17, 19]], [7, [11, 13, 17, 19, 23]],
  [3, [5, 7, 11, 13, 17, 19, 23]],
  [11, [13, 17, 19, 23]],
];
let valAgree = 0, valTot = 0, closureBad = 0, closureTot = 0;
for (const [v, Q] of VAL) {
  const t = TILE[v];
  const sc = truthByScan(t, Q, 4e7);
  const la = ladderL(t, Q, 3e6, 4000);
  const ok = sc && sc.truth === la.L;
  valTot++; if (ok) valAgree++;
  if (sc) {
    closureTot++;
    const contig = sc.ach.length === sc.truth && sc.ach[0] === 1 && sc.ach[sc.ach.length - 1] === sc.truth;
    if (!contig) closureBad++;
  }
  console.log('T_' + pad(v, 4) + pad(Q.join(','), 22) + lpad(sc ? sc.N : 'too big', 17) +
    lpad(sc ? sc.truth : '-', 12) + lpad(la.L, 10) + '  ' + pad(la.status, 8) + (ok ? 'YES' : 'NO  <-- FAILED'));
}
console.log('');
console.log(`full-period agreement: ${valAgree}/${valTot}`);
console.log('');
console.log('(b) CLOSURE, tested not assumed. For each instance above the achievable');
console.log('    run lengths were decided at every l by that l\'s OWN full-period window');
console.log('    scan, never inferred from the maximum, so a gap would show.');
console.log(`    instances scanned ${closureTot}, non-contiguous achievable sets ${closureBad}` +
  (closureBad === 0 ? '   -> first-dead minus one is sound here' : '   <-- FAILED'));
console.log('');
console.log('(c) against brute force over every legal assignment, and against A144311.');
console.log('');
console.log('n   x   tile  block            search L   brute L   6L+5   A144311(n)  match');
for (let n = 3; n <= 8; n++) {
  const x = A_X[n - 1], Q = ALLP.filter(p => p >= 5 && p <= x);
  const t = TILE[3];
  const la = ladderL(t, Q, 3e6, 4000);
  const bf = n <= 6 ? bruteL(t, Q, 60) : null;
  const val = 6 * la.L + 5;
  console.log(lpad(n, 2) + lpad(x, 4) + '   T_3   ' + pad(Q.join(','), 17) + lpad(la.L, 8) +
    lpad(bf === null ? '-' : bf, 10) + lpad(val, 7) + lpad(A144311[n - 1], 12) + '   ' +
    (val === A144311[n - 1] && (bf === null || bf === la.L) ? 'YES' : 'NO  <-- FAILED'));
}

// ---------------------------------------------------------------------------
// 3. THE LADDER.
// ---------------------------------------------------------------------------
console.log('');
console.log('=== 3. THE LADDER: L(v, y), ONE PRIME ADDED PER LEVEL ===============');
console.log('Block = the primes in (v, y]. Every level decided by exhaustive search at');
console.log('every l from 1 up; "EXACT" means the first infeasible l was PROVEN');
console.log('infeasible at every distinct phase. "BUDGET" means a search hit the node');
console.log('cap, so the printed L is a LOWER bound and the level is not exact.');
console.log('');
const NB = 4e6, HARD = 4000;
const LADDER = {};
for (const v of [3, 5, 7, 11]) {
  const t = TILE[v];
  const ys = ALLP.filter(p => p > v && p <= 200);
  console.log(`--- tile T_${v}  (n = ${t.n} slots, mbar = ${f2(t.mbar, 4)}) ---`);
  console.log(' y   k   theta_blk   sum2/p    L     status   phase   distinct   nodes');
  LADDER[v] = [];
  for (const y of ys) {
    const Q = ALLP.filter(p => p > v && p <= y);
    const la = ladderL(t, Q, NB, HARD);
    const th = Q.reduce((a, p) => a + Math.log(p), 0);
    const m2 = Q.reduce((a, p) => a + 2 / p, 0);
    LADDER[v].push({ v, y, k: Q.length, theta: th, m2, L: la.L, status: la.status, phase: la.phase, nodes: la.nodes });
    console.log(lpad(y, 4) + lpad(Q.length, 4) + lpad(f2(th, 3), 11) + lpad(f2(m2, 4), 9) +
      lpad(la.L, 7) + '   ' + pad(la.status, 9) + lpad(la.phase, 5) + lpad(la.distinctPhases, 10) +
      lpad(la.nodes, 12));
    if (la.status !== 'EXACT') break;
  }
  console.log('');
}

// ---------------------------------------------------------------------------
// 3b. TARGETED PUSH: the second diagonal block, (7, 49].
// The ladder's uniform budget stops T_7 at y = 43. The block the programme
// actually wants is (7, 49], top prime 47, and section 4's bracket leaves it
// undecided over a short range. Two decisions at a much larger budget settle
// it, and only two are needed, because feasibility is downward closed.
// ---------------------------------------------------------------------------
console.log('=== 3b. TARGETED PUSH AT THE SECOND DIAGONAL BLOCK ==================');
console.log('tile  block          l    feasible   search completed   nodes');
const PUSHLO = { 3: {}, 5: {}, 7: {}, 11: {}, 13: {} };
const PUSHHI = { 3: {}, 5: {}, 7: {}, 11: {}, 13: {} };
for (const [v, y, l, bud] of [[7, 47, 50, 2e8], [7, 47, 51, 2e8]]) {
  const Q = ALLP.filter(p => p > v && p <= y);
  const r = feasibleAt(TILE[v], Q, l, bud);
  if (!r.aborted) {
    if (r.ok) PUSHLO[v][y] = Math.max(PUSHLO[v][y] || 0, l);
    else PUSHHI[v][y] = Math.min(PUSHHI[v][y] === undefined ? 1e9 : PUSHHI[v][y], l - 1);
  }
  console.log('T_' + pad(v, 4) + pad('(' + v + ', ' + y + ']', 15) + lpad(l, 4) +
    lpad(r.ok ? 'YES' : 'no', 11) + lpad(r.aborted ? 'NO (budget)' : 'YES', 19) + lpad(r.nodes, 12));
}
console.log('');
console.log('A YES exhibits a cover, so it is a lower bound by construction. A no with the');
console.log('search COMPLETED is a proof of infeasibility at every distinct phase, so it is');
console.log('an upper bound. Nothing here is a heuristic and nothing is bisected.');
console.log('');

// ---------------------------------------------------------------------------
// 4. THE EXACT LADDER, EXTENDED BY THE PUBLISHED INTEGER LADDER
// ---------------------------------------------------------------------------
function sumTable(t, MMAX) {
  const maxs = new Int32Array(MMAX + 2).fill(0), mins = new Int32Array(MMAX + 2).fill(0x7fffffff);
  for (let f = 0; f < t.n; f++) {
    let s = 0;
    for (let m = 1; m <= MMAX; m++) {
      s += t.G[(f + m - 1) % t.n];
      if (s > maxs[m]) maxs[m] = s;
      if (s < mins[m]) mins[m] = s;
    }
  }
  return { maxs, mins, MMAX };
}
function bracketL(ST, G2) {
  let lo = 1; while (lo <= ST.MMAX && ST.maxs[lo] < G2) lo++;
  let hi = 1; while (hi < ST.MMAX && ST.mins[hi + 1] <= G2) hi++;
  return { lo: lo - 1, hi: hi - 1 };
}
const MM = 2400;
const STAB = {}; for (const v of [3, 5, 7, 11, 13]) STAB[v] = sumTable(TILE[v], MM);

console.log('=== 4. THE EXACT LADDER, EXTENDED BY THE PUBLISHED INTEGER LADDER ===');
console.log('A run of L deleted T_v slots opens a gap of at least minsum_{L+1}(T_v), and');
console.log('the maximal gap spans at most maxsum_m over its own m = (dead slots) + 1. So');
console.log('');
console.log('   min{m : maxsum_m(T_v) >= G2(y#)} - 1  <=  L(v,y)  <=  max{m : minsum_m(T_v) <= G2(y#)} - 1');
console.log('');
console.log('G2(y#) = A144311(pi(y)) + 1, and those 22 terms are PROVEN MAXIMAL, not');
console.log('best-found: the branch-and-bound prune is admissible at every deeper state');
console.log('(`research/sift-limit-attack.md` section 7, `research/attack-beta2-05-covering-prune.js`).');
console.log('So where the bracket pins, L is EXACT with no search of ours at all -- and');
console.log('section 3\'s independent search must land inside it wherever both exist.');
console.log('');
const EXACTL = { 3: {}, 5: {}, 7: {}, 11: {}, 13: {} };
const VS = [3, 5, 7, 11, 13];
console.log('  y   G2(y#)  ' + VS.map(v => lpad('L(' + v + ',y)', 11)).join('') + '     pinned');
let pinned = 0, pinTot = 0, pinnedBracketOnly = 0, searchIn = 0, searchTot = 0, searchBad = [];
for (let n = 3; n <= 22; n++) {
  const y = A_X[n - 1], G2 = A144311[n - 1] + 1;
  const cells = []; let np = 0;
  for (const v of VS) {
    if (y <= v) { cells.push(lpad('-', 11)); continue; }
    const b = bracketL(STAB[v], G2);
    pinTot++;
    if (b.lo === b.hi) pinnedBracketOnly++;
    const r = (LADDER[v] || []).find(q => q.y === y);
    if (r && r.status === 'EXACT') {
      searchTot++;
      if (r.L >= b.lo && r.L <= b.hi) searchIn++; else searchBad.push(`v=${v} y=${y} search ${r.L} bracket ${b.lo}..${b.hi}`);
    }
    // combine every proof we hold: the bracket, the ladder, and the pushes
    let lo = b.lo, hi = b.hi;
    if (r) { if (r.L > lo) lo = r.L; if (r.status === 'EXACT') hi = Math.min(hi, r.L); }
    if (PUSHLO[v][y] !== undefined && PUSHLO[v][y] > lo) lo = PUSHLO[v][y];
    if (PUSHHI[v][y] !== undefined && PUSHHI[v][y] < hi) hi = PUSHHI[v][y];
    if (lo === hi) { pinned++; np++; EXACTL[v][y] = lo; cells.push(lpad(lo, 11)); }
    else cells.push(lpad(lo + '..' + hi, 11));
  }
  console.log(lpad(y, 3) + lpad(G2, 8) + '  ' + cells.join('') + lpad(np + '/' + VS.filter(v => y > v).length, 11));
}
console.log('');
console.log(`the three instruments together (bracket, ladder search, targeted push) pin L`);
console.log(`exactly in ${pinned} of ${pinTot} (tile, y) pairs; the bracket alone pins ${pinnedBracketOnly}.`);
console.log(`section 3's independent exhaustive search: ${searchIn} of ${searchTot} exact levels land inside the bracket` +
  (searchBad.length ? '  <-- FAILED: ' + searchBad.join('; ') : '   (zero disagreements)'));
let agreeExact = 0, agreeTot = 0;
for (const v of VS) for (const r of (LADDER[v] || [])) {
  if (r.status !== 'EXACT') continue;
  if (EXACTL[v][r.y] === undefined) continue;
  agreeTot++; if (EXACTL[v][r.y] === r.L) agreeExact++;
}
console.log(`where BOTH are exact, the two agree in ${agreeExact} of ${agreeTot} levels.`);
console.log('');
console.log('WHERE EXACT STOPS, AND WHY. Two frontiers, and they are not the same one.');
{
  const own = VS.map(v => {
    const rs = (LADDER[v] || []).filter(r => r.status === 'EXACT');
    return rs.length ? `T_${v}: y = ${rs[rs.length - 1].y} (k = ${rs[rs.length - 1].k} primes)` : `T_${v}: none`;
  });
  console.log('  (i)  this script\'s own search, at a ' + NB.toExponential(0) + '-node budget per decision:');
  console.log('       ' + own.join(';  '));
  console.log('  (ii) the bracket, which stops dead at y = 79 because A144311 stops at 22 terms.');
  console.log('       Past y = 79 nothing is exact, for anyone: L(v,y) exact IS G2(y#) exact,');
  console.log('       by the bracket above, so the two problems have one frontier.');
}

// ---------------------------------------------------------------------------
// 5. THE COUNTING CRITERION, SEPARATELY.
// ---------------------------------------------------------------------------
console.log('');
console.log('=== 5. THE COUNTING CRITERION, KEPT APART FROM FEASIBILITY ==========');
console.log('S(l,f) = sum_p max_a #{i<l : d_i = a or a-2 mod p}. Necessary, never');
console.log('sufficient. It is the ROOT NODE of section 2\'s search: the bound before');
console.log('any branching. So it can never be sharper than the search, and it is a');
console.log('staircase in l where the search\'s answer is monotone.');
console.log('');
function criterionSweep(t, primes, LMAX) {
  const Smax = new Int32Array(LMAX + 1);
  for (let f = 0; f < t.n; f++) {
    const d = offsets(t, f, LMAX);
    const cnt = primes.map(p => new Int32Array(p));
    for (let l = 1; l <= LMAX; l++) {
      for (let k = 0; k < primes.length; k++) cnt[k][d[l - 1] % primes[k]]++;
      let tot = 0;
      for (let k = 0; k < primes.length; k++) {
        const p = primes[k], c = cnt[k]; let m = 0;
        for (let a = 0; a < p; a++) { const vv = c[a] + c[(a - 2 + p) % p]; if (vv > m) m = vv; }
        tot += m;
      }
      if (tot > Smax[l]) Smax[l] = tot;
    }
  }
  let first = 0, lastAlive = 0, maxT = -1e9, revivals = 0, wasDead = false;
  for (let l = 1; l <= LMAX; l++) {
    const T = Smax[l] - l;
    if (T < 0) { if (!first) first = l; wasDead = true; }
    else { lastAlive = l; if (wasDead) { revivals++; wasDead = false; } }
    if (T > maxT) maxT = T;
  }
  return { Smax, first, lastAlive, maxT, TL: Smax[LMAX] - LMAX, LMAX, revivals };
}
console.log('block                    tile   first dead l   -> L <=   last alive l   revivals   sum 2/p   verdict');
for (const [v, y, LM] of [[5, 23, 1200], [5, 29, 1200], [5, 31, 800], [7, 47, 3000], [7, 23, 1500],
                          [11, 23, 800], [11, 47, 800], [3, 23, 1200], [3, 47, 1500]]) {
  const t = TILE[v], Q = ALLP.filter(p => p > v && p <= y);
  const cs = criterionSweep(t, Q, LM);
  const m2 = Q.reduce((a, p) => a + 2 / p, 0);
  console.log(pad(`(${v}, ${y}]`, 25) + pad('T_' + v, 7) + lpad(cs.first || 'none', 14) +
    lpad(cs.first ? cs.first - 1 : '-', 10) + lpad(cs.lastAlive, 15) + lpad(cs.revivals, 11) +
    lpad(f2(m2, 4), 10) + '   ' + (cs.first ? 'finite' : 'VACUOUS at every l'));
}
console.log('');
console.log('The staircase at block 1, written out, because conflating it with');
console.log('feasibility is the error section 7a of `research/sift-limit-attack.md` reversed:');
{
  const t = TILE[5], Q = ALLP.filter(p => p > 5 && p <= 23);
  const cs = criterionSweep(t, Q, 1200);
  console.log('  l   S_max(l)   S-l   criterion   feasibility (from section 3)');
  const trueL = (LADDER[5].find(r => r.y === 23) || {}).L;
  for (const l of [19, 20, 62, 63, 64, 110, 111, 112, 113]) {
    console.log(lpad(l, 4) + lpad(cs.Smax[l], 10) + lpad(cs.Smax[l] - l, 6) + '   ' +
      pad(cs.Smax[l] < l ? 'DEAD' : 'not excluded', 15) +
      (l <= trueL ? 'FEASIBLE (exhibited)' : 'INFEASIBLE (proved)'));
  }
  console.log(`  criterion first dead ${cs.first}, revives, last alive ${cs.lastAlive}, dead for good from 112.`);
  console.log(`  feasibility: feasible exactly on 1..${trueL}, one contiguous block, no revival possible.`);
  console.log(`  no-revival certificate for the criterion: T(l) = S_max(l) - l is subadditive,`);
  console.log(`  T(${cs.LMAX}) = ${cs.TL}, max T = ${cs.maxT}, sum ${cs.TL + cs.maxT} < 0: ${cs.TL + cs.maxT < 0}`);
  console.log(`  SLACK OF THE CRITERION AT BLOCK 1: bound ${cs.first - 1} against truth ${trueL}, ` +
    `a factor ${f2((cs.first - 1) / trueL, 2)}.`);
}

// ---------------------------------------------------------------------------
// 6. THE ABSCISSA.
// ---------------------------------------------------------------------------
console.log('');
console.log('=== 6. WHICH VARIABLE IS L ACTUALLY LINEAR IN? ======================');
function fit(xs, ys) {                       // least squares y = a + b x
  const n = xs.length, sx = xs.reduce((a, b) => a + b, 0), sy = ys.reduce((a, b) => a + b, 0);
  let sxx = 0, sxy = 0;
  for (let i = 0; i < n; i++) { sxx += xs[i] * xs[i]; sxy += xs[i] * ys[i]; }
  const b = (n * sxy - sx * sy) / (n * sxx - sx * sx), a = (sy - b * sx) / n;
  let ss = 0; for (let i = 0; i < n; i++) { const r = ys[i] - (a + b * xs[i]); ss += r * r; }
  const rms = Math.sqrt(ss / n);
  let sst = 0; const my = sy / n; for (let i = 0; i < n; i++) sst += (ys[i] - my) ** 2;
  const se = Math.sqrt(ss / Math.max(1, n - 2) / (sxx - sx * sx / n));
  return { a, b, rms, r2: 1 - ss / sst, se, n };
}
const thetaUpTo = (x) => ALLP.filter(p => p <= x).reduce((a, p) => a + Math.log(p), 0);

function abscissaTable(rows, label) {
  // rows: {X-fields..., L}
  const cand = [
    ['y  (top prime of block)', r => r.y],
    ['theta(y) = ln(y#)      ', r => r.theta],
    ['pi(y) = # primes <= y  ', r => r.k],
    ['y^2                    ', r => r.y * r.y],
    ['y ln^2 y               ', r => r.y * Math.log(r.y) ** 2],
    ['theta(y) ln^2 theta(y) ', r => r.theta * Math.log(r.theta) ** 2],
  ];
  console.log(label);
  console.log('abscissa X                 exponent b in L ~ X^b     (se)      log-RMS   rel-RMS of forced L = cX');
  for (const [nm, g] of cand) {
    const lx = rows.map(r => Math.log(g(r))), ly = rows.map(r => Math.log(r.L));
    const F = fit(lx, ly);
    let sc = 0, sn = 0;
    for (const r of rows) { sc += r.L * g(r); sn += g(r) ** 2; }
    const c = sc / sn;
    let e = 0; for (const r of rows) e += ((r.L - c * g(r)) / r.L) ** 2;
    console.log(pad(nm, 26) + lpad(f2(F.b, 4), 18) + lpad('(' + f2(F.se, 4) + ')', 12) +
      lpad(f2(F.rms, 4), 10) + lpad(f2(Math.sqrt(e / rows.length), 4), 26));
  }
}

console.log('(a) THE INTEGER COORDINATE. L_int(y) = A144311(pi(y)) is the length of the');
console.log('    interval [1, L] coverable by two classes per prime up to y -- the brief\'s');
console.log('    own definition of L, and the v = 3 slot ladder times 6 plus 5.');
console.log('');
{
  const rows = [];
  for (let n = 5; n <= 22; n++) {
    const y = A_X[n - 1];
    rows.push({ y, k: n, theta: thetaUpTo(y), L: A144311[n - 1] });
  }
  abscissaTable(rows, '    18 exact terms, y = 11..79:');
  console.log('');
  const rows2 = rows.filter(r => r.y >= 23);
  abscissaTable(rows2, '    top 14 exact terms only, y = 23..79 (the small-y drag removed):');
}
console.log('');
console.log('    READ THESE AS RAW LOG-LOG SLOPES ONLY. `research/exponent-control.md`');
console.log('    section 1 measures a one-class CONTROL whose truth is p log^2 p: a pure power law');
console.log('    wins that comparison by 47 AIC units with white residuals and reports an');
console.log('    exponent wrong by 0.28. Its section 5 therefore quotes 1.801 +- 0.074 as the RAW');
console.log('    G2 reading and 1.54 +- 0.09 control-corrected. Nothing below overrides that.');
console.log('    What IS decided here is the RANKING between abscissae on one data set.');
console.log('');
console.log('(a2) THE SAME ABSCISSA TEST ON A CONTROL WHOSE ANSWER IS KNOWN.');
console.log('     h(x#) is the ONE-class Jacobsthal function, OEIS A048670 (terms as carried');
console.log('     in `research/exponent-control.js` line 44). Iwaniec 1978 proves exponent <= 2,');
console.log('     Maier-Pomerance conjecture x (log x)^{2+o(1)}, so in the "x ln^2 x" frame its');
console.log('     true exponent is 1. Matched window, same 18 terms, same estimator. Whatever');
console.log('     abscissa bias the estimator has, it has it here too.');
console.log('');
{
  const A048670 = [2, 4, 6, 10, 14, 22, 26, 34, 40, 46, 58, 66, 74, 90, 100, 106,
                   118, 132, 152, 174, 190, 200];      // n = 1..22, x = 2..79
  const rows = [];
  for (let n = 5; n <= 22; n++) {
    const y = A_X[n - 1];
    rows.push({ y, k: n, theta: thetaUpTo(y), L: A048670[n - 1] });
  }
  abscissaTable(rows, '     control h(x#), 18 terms, y = 11..79:');
  console.log('');
  const gr = [];
  for (let n = 5; n <= 22; n++) gr.push({ y: A_X[n - 1], k: n, theta: thetaUpTo(A_X[n - 1]), L: A144311[n - 1] });
  const cands = [
    ['y', r => r.y],
    ['theta(y)', r => r.theta],
    ['pi(y)', r => r.k],
    ['y ln^2 y', r => r.y * Math.log(r.y) ** 2],
    ['theta ln^2 theta', r => r.theta * Math.log(r.theta) ** 2],
  ];
  console.log('     Every abscissa below is y up to logarithms, and h ~ x ln^{2+o(1)} x, so');
  console.log('     the control\'s TRUE exponent is 1 in every one of them. The bias is what');
  console.log('     the estimator adds to that 1, and the last column subtracts it from G2.');
  console.log('');
  console.log('     abscissa            control reads   bias vs 1   G2 reads   G2 bias-corrected');
  const corr = [];
  for (const [nm, g] of cands) {
    const Fg = fit(gr.map(r => Math.log(g(r))), gr.map(r => Math.log(r.L)));
    const Fc = fit(rows.map(r => Math.log(g(r))), rows.map(r => Math.log(r.L)));
    const c = Fg.b - (Fc.b - 1);
    corr.push(c);
    console.log('     ' + pad(nm, 20) + lpad(f2(Fc.b, 4), 13) + lpad((Fc.b - 1 >= 0 ? '+' : '') + f2(Fc.b - 1, 4), 12) +
      lpad(f2(Fg.b, 4), 11) + lpad(f2(c, 4), 20));
  }
  console.log('');
  console.log(`     Corrected readings run ${f2(Math.min(...corr), 3)} to ${f2(Math.max(...corr), 3)}, a spread of ${f2(Math.max(...corr) - Math.min(...corr), 3)}.`);
  console.log('     THAT IS THE ANSWER TO "WHICH ABSCISSA DOES THE DATA PREFER": it does not');
  console.log('     prefer one, and the spread between frames is several times the +-0.09 the');
  console.log('     corpus quotes on the exponent itself. Two things do survive.');
  console.log('     (i)  The y and theta frames AGREE, to 0.04, and they are the two the corpus');
  console.log('          already uses. The pi frame is the outlier and should not be used.');
  console.log('     (ii) L is linear in NONE of the bare abscissae: the raw exponents are');
  console.log('          1.83 in y, 1.69 in theta and 2.51 in pi, at standard errors near 0.03.');
  console.log('          The apparent linearity in theta ln^2 theta is an artifact -- the same');
  console.log('          estimator reads 0.72 there on a control whose truth is 1.');
}

console.log('');
console.log('(b) THE SLOT COORDINATE, one tile at a time. Same object, divided by the tile.');
console.log('');
for (const v of [3, 5, 7, 11, 13]) {
  const ys = Object.keys(EXACTL[v]).map(Number).sort((a, b) => a - b).filter(y => y >= 4 * v);
  if (ys.length < 6) continue;
  const rows = ys.map(y => ({ y, k: ALLP.filter(p => p <= y).length, theta: thetaUpTo(y), L: EXACTL[v][y] }));
  abscissaTable(rows, `    T_${v}, ${rows.length} exact levels, y = ${ys[0]}..${ys[ys.length - 1]}:`);
  console.log('');
}
console.log('(c) IS THE BLOCK COORDINATE CARRYING A LAW OF ITS OWN?');
console.log('    If (L(v,y)+1) * mbar(T_v) is the same across tiles at fixed y, then no:');
console.log('    the tile only divides, and every question about L is a question about G2.');
console.log('');
{
  console.log('  y   G2(y#)  ' + VS.map(v => lpad('(L+1)mbar_' + v, 14)).join('') + '   spread   G2/spread-mid');
  const spreads = [];
  for (let n = 5; n <= 22; n++) {
    const y = A_X[n - 1], G2 = A144311[n - 1] + 1;
    const cells = [], vals = [];
    for (const v of VS) {
      if (EXACTL[v][y] === undefined) { cells.push(lpad('-', 14)); continue; }
      const pv = (EXACTL[v][y] + 1) * TILE[v].mbar;
      vals.push(pv); cells.push(lpad(f2(pv, 1), 14));
    }
    let sp = '-', rel = '-';
    if (vals.length >= 2) {
      const s2 = Math.max(...vals) / Math.min(...vals); spreads.push(s2); sp = f2(s2, 4);
      rel = f2(G2 / ((Math.max(...vals) + Math.min(...vals)) / 2), 4);
    }
    console.log(lpad(y, 3) + lpad(G2, 8) + '  ' + cells.join('') + lpad(sp, 9) + lpad(rel, 15));
  }
  console.log('');
  console.log(`    spread of (L+1)*mbar across tiles at a common y: ${f2(Math.min(...spreads), 4)} to ` +
    `${f2(Math.max(...spreads), 4)}, mean ${f2(spreads.reduce((a, b) => a + b, 0) / spreads.length, 4)}, over ${spreads.length} values of y.`);
  const late = [];
  for (let n = 9; n <= 22; n++) {
    const y = A_X[n - 1], vals = [];
    for (const v of VS) if (EXACTL[v][y] !== undefined) vals.push((EXACTL[v][y] + 1) * TILE[v].mbar);
    if (vals.length >= 2) late.push(Math.max(...vals) / Math.min(...vals));
  }
  console.log(`    restricted to y >= 23, where every pinned L is at least 10: ${f2(Math.min(...late), 4)} to ` +
    `${f2(Math.max(...late), 4)}, mean ${f2(late.reduce((a, b) => a + b, 0) / late.length, 4)}, over ${late.length} values of y.`);
  console.log('    The residue is quantisation and only quantisation: (L+1)*mbar can only');
  console.log('    move in steps of mbar, so a coarse tile at a small L cannot land on G2.');
  console.log('    It shrinks as L grows, which is what a divisor does and a law does not.');
}
console.log('');
console.log('(d) THE DIAGONAL BLOCKS, y = v^2, which is the ladder the programme uses.');
console.log('');
console.log(' v    block (v, v^2]        k    theta_blk   L(v,v^2)   source                        L / v^2   requirement L+1 <=');
{
  for (const v of [3, 5, 7, 11, 13]) {
    const y = ALLP.filter(p => p <= v * v).slice(-1)[0];
    const Q = ALLP.filter(p => p > v && p <= v * v);
    const t = TILE[v];
    let need = 1; while (need < MM && STAB[v].maxs[need + 1] < y * y) need++;
    const th = Q.reduce((a, p) => a + Math.log(p), 0);
    const nIdx = ALLP.indexOf(y) + 1;
    const br = nIdx <= 22 ? bracketL(STAB[v], A144311[nIdx - 1] + 1) : null;
    const sr = (LADDER[v] || []).find(q => q.y === y);
    let lo = br ? br.lo : null, hi = br ? br.hi : null;
    if (sr && lo !== null) { if (sr.L > lo) lo = sr.L; if (sr.status === 'EXACT') hi = Math.min(hi, sr.L); }
    if (br && PUSHLO[v][y] !== undefined && PUSHLO[v][y] > lo) lo = PUSHLO[v][y];
    if (br && PUSHHI[v][y] !== undefined && PUSHHI[v][y] < hi) hi = PUSHHI[v][y];
    const cell = lo === null ? 'unknown' : (lo === hi ? String(lo) : lo + '..' + hi);
    const src = lo === null ? 'BEYOND EXACT' : (lo === hi ? 'exact' : 'bracket+search, not pinned');
    console.log(lpad(v, 2) + '    ' + pad('(' + v + ', ' + v * v + ']  top ' + y, 20) + lpad(Q.length, 5) +
      lpad(f2(th, 3), 12) + lpad(cell, 11) + '   ' + pad(src, 28) +
      lpad(lo === null ? '-' : f2(lo / (v * v), 4), 8) + lpad(need, 20));
  }
  console.log('');
  console.log('    "requirement" is the largest L+1 with maxsum_{L+1}(T_v) < q^2, q the top');
  console.log('    prime of the block: the p^2-rule window at the block\'s own top prime.');
}

// ---------------------------------------------------------------------------
// 7. THE DISTANCE TO 529.
// ---------------------------------------------------------------------------
console.log('');
console.log('=== 7. THE DISTANCE TO 529 =========================================');
console.log('529 = 23^2 is the p^2-rule window at the top prime of block 1, and the');
console.log('block-1 requirement is maxsum_{L+1}(T_5) <= 529.');
console.log('');
{
  const t = TILE[5];
  let mNeed = 0; while (STAB[5].maxs[mNeed + 1] <= 529) mNeed++;   // largest m with maxsum_m <= 529
  const need = mNeed - 1;                                          // ... so L+1 <= mNeed, i.e. L <= need
  let mNeed506 = 0; while (STAB[5].maxs[mNeed506 + 1] <= 529 - 23) mNeed506++;
  const trueL = EXACTL[5][23];
  const Q = ALLP.filter(p => p > 5 && p <= 23);
  const cs = criterionSweep(t, Q, 1200);
  console.log(`the largest L that clears 529 ......... ${need}   ` +
    `(maxsum_${mNeed}(T_5) = ${STAB[5].maxs[mNeed]} <= 529 < ${STAB[5].maxs[mNeed + 1]} = maxsum_${mNeed + 1}(T_5))`);
  console.log(`on the strict p^2 rule G2 < q^2 - q = 506 ... ${mNeed506 - 1}   ` +
    `(maxsum_${mNeed506}(T_5) = ${STAB[5].maxs[mNeed506]})`);
  console.log('');
  console.log('reading                                 L     maxsum_{L+1}(T_5)   vs 529    verdict');
  const show = (nm, B) => {
    const ms = STAB[5].maxs[B + 1];
    console.log(pad(nm, 40) + lpad(B, 4) + lpad(ms, 20) + lpad(f2(ms / 529, 3) + 'x', 9) + '   ' +
      (ms <= 529 ? 'CLEARS 529' : 'fails'));
  };
  show('EXACT L (search + bracket)', trueL);
  show('counting criterion, first dead - 1', cs.first - 1);
  show('counting criterion, last alive', cs.lastAlive);
  console.log('');
  console.log(`IMPOSSIBILITY AT BLOCK 1, with a number. ${cs.first - 1} is not one reading of the`);
  console.log('counting criterion, it is its CEILING: `research/block-L-first-dead.js` section 4');
  console.log('proves W(l) = S_max(l) by CRT, so no positional refinement of the same count');
  console.log(`can do better. 529 needs ${need}. Deficit ${cs.first - 1 - need} slots, a factor ${f2((cs.first - 1) / need, 3)}, and it`);
  console.log('cannot be closed inside the criterion. The counting route to 529 at block 1');
  console.log('is CLOSED, not merely unfinished.');
  console.log('');
  console.log(`What is NOT closed is the object: L = ${trueL}, maxsum_${trueL + 1}(T_5) = ${STAB[5].maxs[trueL + 1]},`);
  console.log(`which clears 529 with a factor ${f2(529 / STAB[5].maxs[trueL + 1], 2)} to spare. So at block 1 the whole`);
  console.log(`distance to 529 is instrument slack: ${f2((cs.first - 1) / trueL, 2)}x between the criterion and the truth,`);
  console.log('against the 1.216x the requirement asks for.');
}
console.log('');
console.log('(b) EVERY BLOCK WE CAN REACH, AGAINST ITS OWN p^2 WINDOW.');
console.log('');
console.log(' v    top prime q   L(v,q)   maxsum_{L+1}(T_v)   q^2      margin   clears?');
{
  for (const v of [3, 5, 7]) {
    const y = ALLP.filter(p => p <= v * v).slice(-1)[0];
    const nIdx = ALLP.indexOf(y) + 1;
    if (nIdx > 22) continue;
    const L = EXACTL[v][y];
    if (L === undefined) continue;
    const ms = STAB[v].maxs[L + 1];
    console.log(lpad(v, 2) + lpad(y, 13) + lpad(L, 9) +
      lpad(ms, 20) + lpad(y * y, 9) + lpad(f2(y * y / ms, 2) + 'x', 9) + '   ' + (ms < y * y ? 'YES' : 'no'));
  }
  console.log('');
  console.log('    The margin GROWS up the two reachable diagonal blocks. That is the whole');
  console.log('    content of "exponent below 2" in this coordinate, and it is measured, not');
  console.log('    proved: the proven exponent is 4.2665 (`research/dhr-verification.md`),');
  console.log('    which in this table would make the margin shrink to nothing immediately.');
}
console.log('');
console.log('(c) THE OTHER READING: at what block does L ITSELF reach 529?');
{
  const rows = [];
  for (let n = 9; n <= 22; n++) rows.push({ x: A_X[n - 1], G: A144311[n - 1] + 1 });
  const F = fit(rows.map(r => Math.log(r.x)), rows.map(r => Math.log(r.G)));
  const C = Math.exp(F.a), b = F.b;
  console.log(`    RAW fit of G2 over the top 14 exact terms (x = 23..79): G2 ~ ${f2(C, 4)} * x^${f2(b, 4)},`);
  console.log(`    exponent se ${f2(F.se, 4)}, log-RMS ${f2(F.rms, 4)}.  [MEASURED, finite range, RAW]`);
  console.log(`    The control-corrected value the corpus quotes is 1.54 +- 0.09`);
  console.log(`    (`+'`research/exponent-control.md`'+` section 5); both are carried below.`);
  console.log('');
  console.log(' v      L(v,v^2) at b_raw   at b = 1.54   requirement L+1 <=   margin(raw)   exact L');
  const C154 = (A144311[21] + 1) / Math.pow(79, 1.54);          // anchored at the top exact term
  const mbarOf = (v) => TILE[v] ? TILE[v].mbar : 2.402607120 * Math.log(v) ** 2;
  for (const v of [5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41]) {
    const mb = mbarOf(v);
    const y = ALLP.filter(p => p <= v * v).slice(-1)[0] || v * v;
    const pr = C * Math.pow(y, b) / mb - 1;
    const pr2 = C154 * Math.pow(y, 1.54) / mb - 1;
    const req = y * y / mb;
    const ex = EXACTL[v] ? EXACTL[v][y] : undefined;
    console.log(lpad(v, 2) + lpad(f2(pr, 1), 21) + lpad(f2(pr2, 1), 14) + lpad(f2(req, 1), 21) +
      lpad(f2(req / (pr + 1), 2) + 'x', 14) + lpad(ex === undefined ? '-' : ex, 10));
  }
  console.log('');
  let vStar = 0, vStar2 = 0;
  for (const v of ALLP) {
    if (v < 5 || v > 1000) continue;
    const mb = mbarOf(v);
    const y = ALLP.filter(p => p <= v * v).slice(-1)[0] || v * v;
    if (!vStar && C * Math.pow(y, b) / mb - 1 >= 529) vStar = v;
    if (!vStar2 && C154 * Math.pow(y, 1.54) / mb - 1 >= 529) vStar2 = v;
  }
  const kStar = ALLP.filter(p => p > vStar && p <= vStar * vStar).length;
  const kStar2 = ALLP.filter(p => p > vStar2 && p <= vStar2 * vStar2).length;
  console.log(`    L(v, v^2) first reaches 529 at the prime v = ${vStar} under the raw law (that block`);
  console.log(`    holds ${kStar} primes and tops at ${vStar * vStar}), and at v = ${vStar2} under 1.54 (${kStar2} primes, top ${vStar2 * vStar2}).`);
  console.log(`    Reaching it means knowing G2 at ${ALLP.filter(q => q <= vStar2 * vStar2).length} primes; the exact frontier is 22, at x = 79.`);
  console.log('');
  const nds = [];
  for (const v of VS) for (const r of (LADDER[v] || [])) if (r.status === 'EXACT' && r.nodes > 1000) nds.push({ v, k: r.k, nodes: r.nodes });
  if (nds.length >= 4) {
    const Fn = fit(nds.map(r => r.k), nds.map(r => Math.log(r.nodes)));
    console.log(`    COST. ln(nodes) = ${f2(Fn.a, 3)} + ${f2(Fn.b, 4)} * k over the ${nds.length} exact levels above 1000 nodes`);
    console.log(`    (log-RMS ${f2(Fn.rms, 3)}), i.e. every prime added to a block multiplies the exhaustive`);
    console.log(`    search by ${f2(Math.exp(Fn.b), 2)}. Extrapolated to that block's k = ${kStar2} that is 10^${f2((Fn.a + Fn.b * kStar2) / Math.LN10, 1)} nodes.`);
    console.log('    [MEASURED on the exact levels; EXTRAPOLATED beyond them, and an extrapolation');
    console.log('     of a search cost is the softest number in this file.]');
  }
  console.log('');
  console.log('    SO: the block at which L reaches 529 is not reachable by this construction,');
  console.log('    and the reason is not the block coordinate. By section 6(c) L is G2 divided');
  console.log('    by the tile, so "compute L at that block" IS "compute G2 there", and that is');
  console.log('    the same frontier that stopped at 22 terms in 2008 and has not moved.');
}

console.log('');
console.log('=== 8. SELF-TESTS ==================================================');
{
  const rowT = (nm, got, want) => console.log(pad(nm, 46) + pad(got, 16) + pad(want, 16) +
    (String(got) === String(want) ? 'ok' : 'FAILED'));
  rowT('T_5 mbar', TILE[5].mbar, 10);
  rowT('T_7 slots', TILE[7].n, 15);
  rowT('T_11 slots', TILE[11].n, 135);
  rowT('T_3 gap word', TILE[3].G.join(','), '6');
  rowT('L(5, 23) by search', (LADDER[5].find(r => r.y === 23) || {}).L, 19);
  rowT('L(5, 23) by bracket', EXACTL[5][23], 19);
  rowT('maxsum_20(T_5) = G2(23#)', STAB[5].maxs[20], 204);
  rowT('L(3, 23) -> 6L+5 = A144311(9)', 6 * (LADDER[3].find(r => r.y === 23) || {}).L + 5, 203);
  rowT('full-period agreements', valAgree + '/' + valTot, valTot + '/' + valTot);
  rowT('closure violations', closureBad, 0);
  rowT('search outside bracket', searchTot - searchIn, 0);
  rowT('search vs bracket disagreements', agreeTot - agreeExact, 0);
  rowT('L(7, 47) pinned by the push', EXACTL[7][47], 50);
  {
    const rc = [];
    for (let n = 5; n <= 22; n++) rc.push({ y: A_X[n - 1], L: [2, 4, 6, 10, 14, 22, 26, 34, 40, 46, 58, 66, 74, 90, 100, 106, 118, 132, 152, 174, 190, 200][n - 1] });
    const F = fit(rc.map(r => Math.log(r.y)), rc.map(r => Math.log(r.L)));
    rowT('control x-frame exponent (growth-law: 1.272)', f2(F.b, 3), '1.272');
  }
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-L-law.js
//   invocation:  node research/attack-L-law.js
//   code-sha256: 486c8932d63edf3208e3020643f9828b7af5d0d07e271b1409d5b25f7fe73cf9
//   out-sha256:  e24792b37f91dcff97975001e310b38aa36a3ff3578b1bc2b832500bf7d71ddd
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     144.6 s
// ============================================================================
// === 1. THE OBJECT AND ITS TWO COORDINATES ===========================
// tile  slots n   modulus v#   mbar = v#/n   gap word (first 12)
// T_3         1            6        6.0000   6
// T_5         3           30       10.0000   6,12,12
// T_7        15          210       14.0000   6,12,12,18,12,30,6,30,12,18,12,12,...
// T_11      135         2310       17.1111   12,12,18,12,30,6,30,12,18,12,12,6,...
// T_13     1485        30030       20.2222   12,12,18,12,30,6,30,12,30,12,6,30,...
//
// A run of L deleted slots is bracketed by the tile's own gap sums:
//   minsum_{L+1}(T_v) <= (the gap it opens) <= maxsum_{L+1}(T_v).
// At v = 3 the tile is one slot per 6, so the bracket is exact and
//   G2 = 6(L+1),  A144311(n) = 6L + 5 = G2 - 1.
//
// === 2. THE EXACT INSTRUMENT, VALIDATED THREE WAYS ===================
// (a) against full-period enumeration (the period is scanned, not sampled)
//
// tile  block primes            slots in period   scan truth  search L  status  agree
// T_5   7,11                                231           3         3  EXACT   YES
// T_5   7,11,13                            3003           6         6  EXACT   YES
// T_5   7,11,13,17                        51051          10        10  EXACT   YES
// T_5   7,11,13,17,19                    969969          14        14  EXACT   YES
// T_5   7,11,13,17,19,23               22309287          19        19  EXACT   YES
// T_7   11,13,17,19                      692835           8         8  EXACT   YES
// T_7   11,13,17,19,23                 15935205          13        13  EXACT   YES
// T_3   5,7,11,13,17,19,23             37182145          33        33  EXACT   YES
// T_11  13,17,19,23                    13037895          10        10  EXACT   YES
//
// full-period agreement: 9/9
//
// (b) CLOSURE, tested not assumed. For each instance above the achievable
//     run lengths were decided at every l by that l's OWN full-period window
//     scan, never inferred from the maximum, so a gap would show.
//     instances scanned 9, non-contiguous achievable sets 0   -> first-dead minus one is sound here
//
// (c) against brute force over every legal assignment, and against A144311.
//
// n   x   tile  block            search L   brute L   6L+5   A144311(n)  match
//  3   5   T_3   5                       1         1     11          11   YES
//  4   7   T_3   5,7                     4         4     29          29   YES
//  5  11   T_3   5,7,11                  6         6     41          41   YES
//  6  13   T_3   5,7,11,13              10        10     65          65   YES
//  7  17   T_3   5,7,11,13,17           17         -    107         107   YES
//  8  19   T_3   5,7,11,13,17,19        24         -    149         149   YES
//
// === 3. THE LADDER: L(v, y), ONE PRIME ADDED PER LEVEL ===============
// Block = the primes in (v, y]. Every level decided by exhaustive search at
// every l from 1 up; "EXACT" means the first infeasible l was PROVEN
// infeasible at every distinct phase. "BUDGET" means a search hit the node
// cap, so the printed L is a LOWER bound and the level is not exact.
//
// --- tile T_3  (n = 1 slots, mbar = 6.0000) ---
//  y   k   theta_blk   sum2/p    L     status   phase   distinct   nodes
//    5   1      1.609   0.4000      1   EXACT        0         1           1
//    7   2      3.555   0.6857      4   EXACT        0         1           9
//   11   3      5.953   0.8675      6   EXACT        0         1          42
//   13   4      8.518   1.0214     10   EXACT        0         1         256
//   17   5     11.351   1.1390     17   EXACT        0         1         871
//   19   6     14.296   1.2443     24   EXACT        0         1        4616
//   23   7     17.431   1.3312     33   EXACT        0         1       38921
//   29   8     20.799   1.4002     42   EXACT        0         1      403271
//   31   9     24.233   1.4647     57   BUDGET       0         1     4105448
//
// --- tile T_5  (n = 3 slots, mbar = 10.0000) ---
//  y   k   theta_blk   sum2/p    L     status   phase   distinct   nodes
//    7   1      1.946   0.2857      2   EXACT        1         2           2
//   11   2      4.344   0.4675      3   EXACT        1         2           9
//   13   3      6.909   0.6214      6   EXACT        1         2          44
//   17   4      9.742   0.7390     10   EXACT        0         2         178
//   19   5     12.686   0.8443     14   EXACT        0         2        1020
//   23   6     15.822   0.9312     19   EXACT        0         2        4302
//   29   7     19.189   1.0002     25   EXACT        0         2       33191
//   31   8     22.623   1.0647     34   EXACT        0         2      267704
//   37   9     26.234   1.1188     52   EXACT        0         2     1012553
//   41  10     29.948   1.1676     53   BUDGET       1         2     4347924
//
// --- tile T_7  (n = 15 slots, mbar = 14.0000) ---
//  y   k   theta_blk   sum2/p    L     status   phase   distinct   nodes
//   11   1      2.398   0.1818      1   EXACT        0         4           1
//   13   2      4.963   0.3357      3   EXACT        1         7          16
//   17   3      7.796   0.4533      5   EXACT        4         8          66
//   19   4     10.740   0.5586      8   EXACT        1         8         275
//   23   5     13.876   0.6455     13   EXACT        3         8         939
//   29   6     17.243   0.7145     18   EXACT        1         8        4949
//   31   7     20.677   0.7790     24   EXACT       10         8       67415
//   37   8     24.288   0.8331     35   EXACT        2         8      163462
//   41   9     28.002   0.8818     39   EXACT        7         8     1283634
//   43  10     31.763   0.9284     43   EXACT        3         8    17838196
//   47  11     35.613   0.9709     49   BUDGET       0         8    14232145
//
// --- tile T_11  (n = 135 slots, mbar = 17.1111) ---
//  y   k   theta_blk   sum2/p    L     status   phase   distinct   nodes
//   13   1      2.565   0.1538      2   EXACT       12        14           2
//   17   2      5.398   0.2715      4   EXACT       11        38           9
//   19   3      8.343   0.3768      6   EXACT       16        55         130
//   23   4     11.478   0.4637     10   EXACT       12        66         726
//   29   5     14.845   0.5327     14   EXACT       34        68        4005
//   31   6     18.279   0.5972     20   EXACT      118        68        6873
//   37   7     21.890   0.6512     28   EXACT       18        68       39487
//   41   8     25.604   0.7000     31   EXACT       48        68      197806
//   43   9     29.365   0.7465     35   EXACT      117        68     5355548
//   47  10     33.215   0.7891     41   EXACT       21        68    22099637
//   53  11     37.186   0.8268     43   BUDGET      21        68     5750710
//
// === 3b. TARGETED PUSH AT THE SECOND DIAGONAL BLOCK ==================
// tile  block          l    feasible   search completed   nodes
// T_7   (7, 47]          50        YES                YES    29381838
// T_7   (7, 47]          51         no                YES   107391034
//
// A YES exhibits a cover, so it is a lower bound by construction. A no with the
// search COMPLETED is a proof of infeasibility at every distinct phase, so it is
// an upper bound. Nothing here is a heuristic and nothing is bisected.
//
// === 4. THE EXACT LADDER, EXTENDED BY THE PUBLISHED INTEGER LADDER ===
// A run of L deleted T_v slots opens a gap of at least minsum_{L+1}(T_v), and
// the maximal gap spans at most maxsum_m over its own m = (dead slots) + 1. So
//
//    min{m : maxsum_m(T_v) >= G2(y#)} - 1  <=  L(v,y)  <=  max{m : minsum_m(T_v) <= G2(y#)} - 1
//
// G2(y#) = A144311(pi(y)) + 1, and those 22 terms are PROVEN MAXIMAL, not
// best-found: the branch-and-bound prune is admissible at every deeper state
// (`research/sift-limit-attack.md` section 7, `research/attack-beta2-05-covering-prune.js`).
// So where the bracket pins, L is EXACT with no search of ours at all -- and
// section 3's independent search must land inside it wherever both exist.
//
//   y   G2(y#)       L(3,y)     L(5,y)     L(7,y)    L(11,y)    L(13,y)     pinned
//   5      12            1          -          -          -          -        1/1
//   7      30            4          2          -          -          -        2/2
//  11      42            6          3          1          -          -        3/3
//  13      66           10          6          3          2          -        4/4
//  17     108           17         10          5          4       2..7        4/5
//  19     150           24         14          8          6       3..9        4/5
//  23     204           33         19         13         10      6..12        4/5
//  29     258           42         25         18         14      9..15        4/5
//  31     348           57         34         24         20     12..20        4/5
//  37     528           87         52         35         28     21..30        4/5
//  41     546           90         54         39         31     22..30        4/5
//  43     618          102         61         43         35     26..33        4/5
//  47     708          117         70         50         41     30..38        4/5
//  53     870          144         86     60..62     47..54     38..47        2/5
//  59     966          160         96     66..69     51..58     42..51        2/5
//  61    1080          179        107     75..77     59..66     48..57        2/5
//  67    1284          213        127     90..91     72..79     58..68        2/5
//  71    1398          232        139    97..100     77..84     63..72        2/5
//  73    1530          254        152   107..110     86..92     71..80        2/5
//  79    1710          284        170   120..122    97..102     80..88        2/5
//
// the three instruments together (bracket, ladder search, targeted push) pin L
// exactly in 60 of 90 (tile, y) pairs; the bracket alone pins 41.
// section 3's independent exhaustive search: 37 of 37 exact levels land inside the bracket   (zero disagreements)
// where BOTH are exact, the two agree in 37 of 37 levels.
//
// WHERE EXACT STOPS, AND WHY. Two frontiers, and they are not the same one.
//   (i)  this script's own search, at a 4e+6-node budget per decision:
//        T_3: y = 29 (k = 8 primes);  T_5: y = 37 (k = 9 primes);  T_7: y = 43 (k = 10 primes);  T_11: y = 47 (k = 10 primes);  T_13: none
//   (ii) the bracket, which stops dead at y = 79 because A144311 stops at 22 terms.
//        Past y = 79 nothing is exact, for anyone: L(v,y) exact IS G2(y#) exact,
//        by the bracket above, so the two problems have one frontier.
//
// === 5. THE COUNTING CRITERION, KEPT APART FROM FEASIBILITY ==========
// S(l,f) = sum_p max_a #{i<l : d_i = a or a-2 mod p}. Necessary, never
// sufficient. It is the ROOT NODE of section 2's search: the bound before
// any branching. So it can never be sharper than the search, and it is a
// staircase in l where the search's answer is monotone.
//
// block                    tile   first dead l   -> L <=   last alive l   revivals   sum 2/p   verdict
// (5, 23]                  T_5                63        62            111          5    0.9312   finite
// (5, 29]                  T_5              none         -           1200          0    1.0002   VACUOUS at every l
// (5, 31]                  T_5              none         -            800          0    1.0647   VACUOUS at every l
// (7, 47]                  T_7               660       659            757          9    0.9709   finite
// (7, 23]                  T_7                27        26             26          0    0.6455   finite
// (11, 23]                 T_11               15        14             14          0    0.4637   finite
// (11, 47]                 T_11              142       141            143          1    0.7891   finite
// (3, 23]                  T_3              none         -           1200          0    1.3312   VACUOUS at every l
// (3, 47]                  T_3              none         -           1500          0    1.6566   VACUOUS at every l
//
// The staircase at block 1, written out, because conflating it with
// feasibility is the error section 7a of `research/sift-limit-attack.md` reversed:
//   l   S_max(l)   S-l   criterion   feasibility (from section 3)
//   19        23     4   not excluded   FEASIBLE (exhibited)
//   20        24     4   not excluded   INFEASIBLE (proved)
//   62        62     0   not excluded   INFEASIBLE (proved)
//   63        62    -1   DEAD           INFEASIBLE (proved)
//   64        64     0   not excluded   INFEASIBLE (proved)
//  110       110     0   not excluded   INFEASIBLE (proved)
//  111       111     0   not excluded   INFEASIBLE (proved)
//  112       111    -1   DEAD           INFEASIBLE (proved)
//  113       112    -1   DEAD           INFEASIBLE (proved)
//   criterion first dead 63, revives, last alive 111, dead for good from 112.
//   feasibility: feasible exactly on 1..19, one contiguous block, no revival possible.
//   no-revival certificate for the criterion: T(l) = S_max(l) - l is subadditive,
//   T(1200) = -77, max T = 7, sum -70 < 0: true
//   SLACK OF THE CRITERION AT BLOCK 1: bound 62 against truth 19, a factor 3.26.
//
// === 6. WHICH VARIABLE IS L ACTUALLY LINEAR IN? ======================
// (a) THE INTEGER COORDINATE. L_int(y) = A144311(pi(y)) is the length of the
//     interval [1, L] coverable by two classes per prime up to y -- the brief's
//     own definition of L, and the v = 3 slot ladder times 6 plus 5.
//
//     18 exact terms, y = 11..79:
// abscissa X                 exponent b in L ~ X^b     (se)      log-RMS   rel-RMS of forced L = cX
// y  (top prime of block)               1.8269    (0.0328)    0.0785                    1.2401
// theta(y) = ln(y#)                     1.6933    (0.0255)    0.0658                    1.0363
// pi(y) = # primes <= y                 2.5091    (0.0467)    0.0812                    1.9822
// y^2                                   0.9135    (0.0164)    0.0785                    0.1590
// y ln^2 y                              1.1466    (0.0163)    0.0623                    0.2354
// theta(y) ln^2 theta(y)                1.0335    (0.0130)    0.0551                    0.0748
//
//     top 14 exact terms only, y = 23..79 (the small-y drag removed):
// abscissa X                 exponent b in L ~ X^b     (se)      log-RMS   rel-RMS of forced L = cX
// y  (top prime of block)               1.7392    (0.0478)    0.0609                    0.4478
// theta(y) = ln(y#)                     1.6145    (0.0458)    0.0627                    0.3970
// pi(y) = # primes <= y                 2.3330    (0.0712)    0.0675                    0.6395
// y^2                                   0.8696    (0.0239)    0.0609                    0.1272
// y ln^2 y                              1.1360    (0.0306)    0.0597                    0.1287
// theta(y) ln^2 theta(y)                1.0386    (0.0274)    0.0583                    0.0650
//
//     READ THESE AS RAW LOG-LOG SLOPES ONLY. `research/exponent-control.md`
//     section 1 measures a one-class CONTROL whose truth is p log^2 p: a pure power law
//     wins that comparison by 47 AIC units with white residuals and reports an
//     exponent wrong by 0.28. Its section 5 therefore quotes 1.801 +- 0.074 as the RAW
//     G2 reading and 1.54 +- 0.09 control-corrected. Nothing below overrides that.
//     What IS decided here is the RANKING between abscissae on one data set.
//
// (a2) THE SAME ABSCISSA TEST ON A CONTROL WHOSE ANSWER IS KNOWN.
//      h(x#) is the ONE-class Jacobsthal function, OEIS A048670 (terms as carried
//      in `research/exponent-control.js` line 44). Iwaniec 1978 proves exponent <= 2,
//      Maier-Pomerance conjecture x (log x)^{2+o(1)}, so in the "x ln^2 x" frame its
//      true exponent is 1. Matched window, same 18 terms, same estimator. Whatever
//      abscissa bias the estimator has, it has it here too.
//
//      control h(x#), 18 terms, y = 11..79:
// abscissa X                 exponent b in L ~ X^b     (se)      log-RMS   rel-RMS of forced L = cX
// y  (top prime of block)               1.2725    (0.0330)    0.0788                    0.2797
// theta(y) = ln(y#)                     1.1822    (0.0194)    0.0502                    0.1914
// pi(y) = # primes <= y                 1.7547    (0.0241)    0.0419                    0.5886
// y^2                                   0.6362    (0.0165)    0.0788                    0.3783
// y ln^2 y                              0.7968    (0.0231)    0.0880                    0.2000
// theta(y) ln^2 theta(y)                0.7196    (0.0169)    0.0713                    0.2694
//
//      Every abscissa below is y up to logarithms, and h ~ x ln^{2+o(1)} x, so
//      the control's TRUE exponent is 1 in every one of them. The bias is what
//      the estimator adds to that 1, and the last column subtracts it from G2.
//
//      abscissa            control reads   bias vs 1   G2 reads   G2 bias-corrected
//      y                          1.2725     +0.2725     1.8269              1.5544
//      theta(y)                   1.1822     +0.1822     1.6933              1.5110
//      pi(y)                      1.7547     +0.7547     2.5091              1.7544
//      y ln^2 y                   0.7968     -0.2032     1.1466              1.3498
//      theta ln^2 theta           0.7196     -0.2804     1.0335              1.3139
//
//      Corrected readings run 1.314 to 1.754, a spread of 0.441.
//      THAT IS THE ANSWER TO "WHICH ABSCISSA DOES THE DATA PREFER": it does not
//      prefer one, and the spread between frames is several times the +-0.09 the
//      corpus quotes on the exponent itself. Two things do survive.
//      (i)  The y and theta frames AGREE, to 0.04, and they are the two the corpus
//           already uses. The pi frame is the outlier and should not be used.
//      (ii) L is linear in NONE of the bare abscissae: the raw exponents are
//           1.83 in y, 1.69 in theta and 2.51 in pi, at standard errors near 0.03.
//           The apparent linearity in theta ln^2 theta is an artifact -- the same
//           estimator reads 0.72 there on a control whose truth is 1.
//
// (b) THE SLOT COORDINATE, one tile at a time. Same object, divided by the tile.
//
//     T_3, 17 exact levels, y = 13..79:
// abscissa X                 exponent b in L ~ X^b     (se)      log-RMS   rel-RMS of forced L = cX
// y  (top prime of block)               1.8154    (0.0334)    0.0694                    0.9748
// theta(y) = ln(y#)                     1.7108    (0.0327)    0.0721                    0.8725
// pi(y) = # primes <= y                 2.5161    (0.0571)    0.0854                    1.5517
// y^2                                   0.9077    (0.0167)    0.0694                    0.1460
// y ln^2 y                              1.1520    (0.0184)    0.0603                    0.2123
// theta(y) ln^2 theta(y)                1.0641    (0.0158)    0.0561                    0.0973
//
//     T_5, 14 exact levels, y = 23..79:
// abscissa X                 exponent b in L ~ X^b     (se)      log-RMS   rel-RMS of forced L = cX
// y  (top prime of block)               1.7724    (0.0492)    0.0626                    0.4770
// theta(y) = ln(y#)                     1.6445    (0.0494)    0.0677                    0.4259
// pi(y) = # primes <= y                 2.3760    (0.0773)    0.0733                    0.6776
// y^2                                   0.8862    (0.0246)    0.0626                    0.1180
// y ln^2 y                              1.1579    (0.0308)    0.0600                    0.1444
// theta(y) ln^2 theta(y)                1.0582    (0.0291)    0.0620                    0.0776
//
//     T_7, 6 exact levels, y = 29..47:
// abscissa X                 exponent b in L ~ X^b     (se)      log-RMS   rel-RMS of forced L = cX
// y  (top prime of block)               2.0014    (0.1715)    0.0594                    0.2326
// theta(y) = ln(y#)                     1.6947    (0.1747)    0.0711                    0.1953
// pi(y) = # primes <= y                 2.4868    (0.2654)    0.0735                    0.2782
// y^2                                   1.0007    (0.0858)    0.0594                    0.0593
// y ln^2 y                              1.2871    (0.1072)    0.0578                    0.1148
// theta(y) ln^2 theta(y)                1.0696    (0.1060)    0.0684                    0.0717
//
// (c) IS THE BLOCK COORDINATE CARRYING A LAW OF ITS OWN?
//     If (L(v,y)+1) * mbar(T_v) is the same across tiles at fixed y, then no:
//     the tile only divides, and every question about L is a question about G2.
//
//   y   G2(y#)     (L+1)mbar_3   (L+1)mbar_5   (L+1)mbar_7  (L+1)mbar_11  (L+1)mbar_13   spread   G2/spread-mid
//  11      42            42.0          40.0          28.0             -             -   1.5000         1.2000
//  13      66            66.0          70.0          56.0          51.3             -   1.3636         1.0879
//  17     108           108.0         110.0          84.0          85.6             -   1.3095         1.1134
//  19     150           150.0         150.0         126.0         119.8             -   1.2523         1.1120
//  23     204           204.0         200.0         196.0         188.2             -   1.0838         1.0402
//  29     258           258.0         260.0         266.0         256.7             -   1.0364         0.9872
//  31     348           348.0         350.0         350.0         359.3             -   1.0326         0.9840
//  37     528           528.0         530.0         504.0         496.2             -   1.0681         1.0290
//  41     546           546.0         550.0         560.0         547.6             -   1.0256         0.9873
//  43     618           618.0         620.0         616.0         616.0             -   1.0065         1.0000
//  47     708           708.0         710.0         714.0         718.7             -   1.0151         0.9925
//  53     870           870.0         870.0             -             -             -   1.0000         1.0000
//  59     966           966.0         970.0             -             -             -   1.0041         0.9979
//  61    1080          1080.0        1080.0             -             -             -   1.0000         1.0000
//  67    1284          1284.0        1280.0             -             -             -   1.0031         1.0016
//  71    1398          1398.0        1400.0             -             -             -   1.0014         0.9993
//  73    1530          1530.0        1530.0             -             -             -   1.0000         1.0000
//  79    1710          1710.0        1710.0             -             -             -   1.0000         1.0000
//
//     spread of (L+1)*mbar across tiles at a common y: 1.0000 to 1.5000, mean 1.0946, over 18 values of y.
//     restricted to y >= 23, where every pinned L is at least 10: 1.0000 to 1.0838, mean 1.0198, over 14 values of y.
//     The residue is quantisation and only quantisation: (L+1)*mbar can only
//     move in steps of mbar, so a coarse tile at a small L cannot land on G2.
//     It shrinks as L grows, which is what a divisor does and a law does not.
//
// (d) THE DIAGONAL BLOCKS, y = v^2, which is the ladder the programme uses.
//
//  v    block (v, v^2]        k    theta_blk   L(v,v^2)   source                        L / v^2   requirement L+1 <=
//  3    (3, 9]  top 7           2       3.555          4   exact                         0.4444                   8
//  5    (5, 25]  top 23         6      15.822         19   exact                         0.7600                  52
//  7    (7, 49]  top 47        11      35.613         50   exact                         1.0204                 156
// 11    (11, 121]  top 113     25      99.325    unknown   BEYOND EXACT                       -                 742
// 13    (13, 169]  top 167     33     141.623    unknown   BEYOND EXACT                       -                1374
//
//     "requirement" is the largest L+1 with maxsum_{L+1}(T_v) < q^2, q the top
//     prime of the block: the p^2-rule window at the block's own top prime.
//
// === 7. THE DISTANCE TO 529 =========================================
// 529 = 23^2 is the p^2-rule window at the top prime of block 1, and the
// block-1 requirement is maxsum_{L+1}(T_5) <= 529.
//
// the largest L that clears 529 ......... 51   (maxsum_52(T_5) = 522 <= 529 < 534 = maxsum_53(T_5))
// on the strict p^2 rule G2 < q^2 - q = 506 ... 49   (maxsum_50(T_5) = 504)
//
// reading                                 L     maxsum_{L+1}(T_5)   vs 529    verdict
// EXACT L (search + bracket)                19                 204   0.386x   CLEARS 529
// counting criterion, first dead - 1        62                 630   1.191x   fails
// counting criterion, last alive           111                1122   2.121x   fails
//
// IMPOSSIBILITY AT BLOCK 1, with a number. 62 is not one reading of the
// counting criterion, it is its CEILING: `research/block-L-first-dead.js` section 4
// proves W(l) = S_max(l) by CRT, so no positional refinement of the same count
// can do better. 529 needs 51. Deficit 11 slots, a factor 1.216, and it
// cannot be closed inside the criterion. The counting route to 529 at block 1
// is CLOSED, not merely unfinished.
//
// What is NOT closed is the object: L = 19, maxsum_20(T_5) = 204,
// which clears 529 with a factor 2.59 to spare. So at block 1 the whole
// distance to 529 is instrument slack: 3.26x between the criterion and the truth,
// against the 1.216x the requirement asks for.
//
// (b) EVERY BLOCK WE CAN REACH, AGAINST ITS OWN p^2 WINDOW.
//
//  v    top prime q   L(v,q)   maxsum_{L+1}(T_v)   q^2      margin   clears?
//  3            7        4                  30       49    1.63x   YES
//  5           23       19                 204      529    2.59x   YES
//  7           47       50                 738     2209    2.99x   YES
//
//     The margin GROWS up the two reachable diagonal blocks. That is the whole
//     content of "exponent below 2" in this coordinate, and it is measured, not
//     proved: the proven exponent is 4.2665 (`research/dhr-verification.md`),
//     which in this table would make the margin shrink to nothing immediately.
//
// (c) THE OTHER READING: at what block does L ITSELF reach 529?
//     RAW fit of G2 over the top 14 exact terms (x = 23..79): G2 ~ 0.8711 * x^1.7360,
//     exponent se 0.0477, log-RMS 0.0607.  [MEASURED, finite range, RAW]
//     The control-corrected value the corpus quotes is 1.54 +- 0.09
//     (`research/exponent-control.md` section 5); both are carried below.
//
//  v      L(v,v^2) at b_raw   at b = 1.54   requirement L+1 <=   margin(raw)   exact L
//  5                 19.1          24.6                 52.9         2.63x        19
//  7                 48.7          53.9                157.8         3.17x        50
// 11                185.6         172.4                746.2         4.00x         -
// 13                310.1         266.8               1379.1         4.43x         -
// 17                814.0         631.6               4152.7         5.10x         -
// 19               1139.4         843.9               6187.3         5.43x         -
// 23               1931.5        1329.0              11580.0         5.99x         -
// 29               3805.3        2386.8              25839.2         6.79x         -
// 31               4564.9        2792.7              32055.7         7.02x         -
// 37               7723.7        4402.7              59651.2         7.72x         -
// 41              10327.1        5661.0              84071.0         8.14x         -
//
//     L(v, v^2) first reaches 529 at the prime v = 17 under the raw law (that block
//     holds 54 primes and tops at 289), and at v = 17 under 1.54 (54 primes, top 289).
//     Reaching it means knowing G2 at 61 primes; the exact frontier is 22, at x = 79.
//
//     COST. ln(nodes) = -2.513 + 1.8894 * k over the 19 exact levels above 1000 nodes
//     (log-RMS 0.525), i.e. every prime added to a block multiplies the exhaustive
//     search by 6.62. Extrapolated to that block's k = 54 that is 10^43.2 nodes.
//     [MEASURED on the exact levels; EXTRAPOLATED beyond them, and an extrapolation
//      of a search cost is the softest number in this file.]
//
//     SO: the block at which L reaches 529 is not reachable by this construction,
//     and the reason is not the block coordinate. By section 6(c) L is G2 divided
//     by the tile, so "compute L at that block" IS "compute G2 there", and that is
//     the same frontier that stopped at 22 terms in 2008 and has not moved.
//
// === 8. SELF-TESTS ==================================================
// T_5 mbar                                      10              10              ok
// T_7 slots                                     15              15              ok
// T_11 slots                                    135             135             ok
// T_3 gap word                                  6               6               ok
// L(5, 23) by search                            19              19              ok
// L(5, 23) by bracket                           19              19              ok
// maxsum_20(T_5) = G2(23#)                      204             204             ok
// L(3, 23) -> 6L+5 = A144311(9)                 203             203             ok
// full-period agreements                        9/9             9/9             ok
// closure violations                            0               0               ok
// search outside bracket                        0               0               ok
// search vs bracket disagreements               0               0               ok
// L(7, 47) pinned by the push                   50              50              ok
// control x-frame exponent (growth-law: 1.272)  1.272           1.272           ok
// ============================================================================
// READINGS
// ============================================================================
//
// 1. L HAS NO LAW OF ITS OWN, AND THAT IS THE HEADLINE. (L+1)*mbar(T_v)
//    reproduces G2(y#) at every level where both are exact. Restricted to
//    y >= 23, where every pinned L is at least 10, the spread of (L+1)*mbar
//    across four tiles is 1.0000 to 1.0838 with mean 1.0198, and it is exactly
//    1.0000 at y = 53, 61, 73 and 79. The residue is quantisation and only
//    quantisation: (L+1)*mbar moves in steps of mbar, so a coarse tile at a
//    small L cannot land on G2, which is the whole of the 1.5000 at y = 11,
//    where T_7 carries L = 1. So the block coordinate contributes exactly one
//    thing, the divisor mbar(T_v), and asking for "the law of L" is asking for
//    the law of G2 in different units. Every open question about one is the
//    same open question about the other.
//
// 2. THE INSTRUMENT IS EXHAUSTIVE, SO A "no" FROM IT IS A PROOF, AND IT IS
//    VALIDATED THREE WAYS. Nine of nine against full-period enumeration, up to
//    37,182,145 slots; brute force over every legal assignment agrees at
//    n = 3..6; A144311's published terms are reproduced through 6L+5 at
//    n = 3..8. That is what licenses reading a completed search as an upper
//    bound anywhere below.
//
// 3. THEOREM D'S COUNTING CRITERION IS THE ROOT NODE OF THAT SEARCH. S(l,f) is
//    exactly the union-bound prune evaluated before any branching. So the
//    criterion cannot be sharper than the search at any block, by construction
//    and not by measurement, and every bound it gives is the depth-0 relaxation
//    of an exact algorithm that runs.
//
// 4. ONE NEW EXACT VALUE: L(7, 47) = 50. l = 50 is feasible, a cover exhibited
//    in 29,381,838 nodes; l = 51 is infeasible with the search COMPLETED at
//    every distinct phase, 107,391,034 nodes. The corpus's standing figure was
//    ">= 49". This is the second diagonal block, and it is now exact.
//
// 5. THE EXACT LADDER IS 60 OF 90 (tile, y) PAIRS. The bracket alone pins 41
//    and the exhaustive search supplies the other 19. The two instruments are
//    independent and agree in 37 of 37 levels, with zero search values outside
//    the bracket. Before this file the corpus had one exact block-level L.
//
// 6. WHERE EXACT STOPS, AND THE TWO FRONTIERS ARE NOT THE SAME ONE. This
//    script's uniform ladder, at a 4e+6-node budget per decision, reaches
//    T_3 y = 29, T_5 y = 37, T_7 y = 43, T_11 y = 47. The bracket reaches
//    y = 79 and stops dead, because A144311 stops at 22 terms. Past y = 79
//    nothing is exact for anyone, and reading 1 is why: L exact IS G2 exact.
//
// 7. CLOSURE HOLDS AND WAS TESTED, NOT ASSUMED. Nine full-period instances,
//    achievable lengths decided at every l by that l's own scan, zero
//    non-contiguous sets. That is the single monotonicity this file uses.
//
// 8. THE CRITERION IS A STAIRCASE WHERE FEASIBILITY IS MONOTONE, AND THE TWO
//    MUST NOT BE MERGED. At block 1 the criterion is first dead at l = 63,
//    revives five times, is last alive at 111 and is dead for good from 112,
//    with the subadditivity certificate T(1200) = -77 against max T = 7.
//    Feasibility is FEASIBLE on exactly 1..19 and INFEASIBLE above, including
//    at l = 62, 64, 110 and 111, every one of which the criterion reports as
//    "not excluded". Slack of the criterion at block 1: 62 against 19, 3.26x.
//
// 9. THE CRITERION DIES EXACTLY AT THE MERTENS WALL, MEASURED ON NINE BLOCKS.
//    Finite at sum 2/p = 0.4637, 0.6455, 0.7891, 0.9312 and 0.9709; vacuous at
//    every l at 1.0002, 1.0647, 1.3312 and 1.6566. The mechanism is one line,
//    S - l ~ l(sum 2/p - 1) + O(k), so the sign decides whether the criterion
//    can ever die. Seventh independent arrival at the same wall.
//
// 10. NO ABSCISSA IS PREFERRED BY THE DATA, AND THE CONTROL IS WHAT SAYS SO.
//    Bias-corrected exponents read 1.5544 in y, 1.5110 in theta, 1.7544 in pi,
//    1.3498 in y ln^2 y and 1.3139 in theta ln^2 theta: a spread of 0.441,
//    several times the +-0.09 the corpus quotes on the exponent itself. The y
//    and theta frames agree to 0.04 and land on the corpus's 1.54; pi is the
//    outlier and should not be used as an abscissa for this object.
//
// 11. L IS LINEAR IN NONE OF THE BARE ABSCISSAE: 1.8269 in y, 1.6933 in theta,
//    2.5091 in pi, at standard errors near 0.03. The apparent linearity in
//    theta ln^2 theta, 1.0335 at se 0.0130 with the best log-RMS in the table,
//    is an artifact of the estimator: the identical fit reads 0.7196 there on a
//    control whose truth is 1. A best-fitting frame is not a preferred frame.
//
// 12. THE CONTROL READING REPRODUCES ATTACK E INDEPENDENTLY, at 1.272 in the
//    x frame on the matched window, which is a self-test rather than a result
//    and is the reason the calibration in reading 10 can be trusted at all.
//
// 13. THE COUNTING ROUTE TO 529 AT BLOCK 1 IS CLOSED, WITH A NUMBER. 529 needs
//    L <= 51, because maxsum_52(T_5) = 522 <= 529 < 534 = maxsum_53(T_5); on
//    the strict p^2 form G2 < 506 it needs L <= 49. The criterion's CEILING is
//    62, not one of its readings. Deficit 11 slots, factor 1.216, and no
//    positional refinement of the same count can close it.
//
// 14. THE OBJECT CLEARS 529, AND THE MARGIN GROWS UP EVERY BLOCK THAT CAN BE
//    REACHED: 1.63x, 2.59x and 2.99x at v = 3, 5 and 7, the last of them new
//    from reading 4. That growth is the entire content of "exponent below 2" in
//    this coordinate, and it is measured, not proved: at the proven 4.2665 the
//    column would shrink to nothing immediately.
//
// 15. THE BLOCK AT WHICH L ITSELF REACHES 529 IS v = 17, UNDER THE RAW LAW AND
//    UNDER THE CORRECTED 1.54 ALIKE. That block holds 54 primes and tops at
//    289; reaching it means knowing G2 at 61 primes against an exact frontier
//    of 22. Measured node cost ln(nodes) = -2.513 + 1.8894 k, a factor 6.62 per
//    prime added, so 10^43.2 nodes there. A clean impossibility rather than a
//    route, and by reading 1 no reformulation inside the block coordinate can
//    change it, because the block coordinate has nothing of its own to give.
//
// 16. MONOTONICITY, DECLARED. The only monotonicity used is L = (first
//    infeasible l) - 1, licensed by downward closure and re-tested in reading
//    7. Nothing is bisected, on the greedy or on anything else. The criterion
//    is reported as the non-monotone staircase it is. No margin, ratio or
//    certificate is claimed monotone in L anywhere in this file.
