'use strict';
// ============================================================================
// ATTACK HISTORY-DIAL-01 — PRICING THE ANCHOR IN BITS:
// HOW MUCH SURVIVOR FLOOR DOES A GIVEN AMOUNT OF CLASS INFORMATION BUY?
// (2026-08-26)
// ============================================================================
//
// STATE OF THE QUESTION BEFORE THIS SCRIPT RUNS — read this first, it is the
// reason most of what follows is a REPRODUCTION and not a new measurement.
//
//   The prefix version of the asked-for curve ALREADY EXISTS in this repo and
//   is canonical state. `research/attack-anchored-01-unify.js` SEC 5 computes
//   "the forcing ladder": the exact adversarial minimum at @11 with the first
//   j scour primes anchored, j = 0..10, reading
//       16 -> 20 -> 20 -> 22 -> 23 -> 25 -> 30 -> 35 -> 38 -> 42 -> 45,
//   quoted in research/G2-STATE.md §5a and re-derived once by a red team
//   ("fully reproduced by an independent branch-and-bound"). Its SEC 5 also
//   computes every SINGLE-prime anchoring (j = 1 over all ten choices).
//   So deliverable (1) of this attack is not new; this script is a THIRD
//   independent engine on it, and its own contribution is the three things
//   the forcing ladder does not contain:
//     (i)   the FULL SUBSET LATTICE (all 1024 anchor sets, not the 11 prefixes
//           and 10 singletons) — hence the exact upper envelope "best j
//           primes", which is what the shape question actually needs;
//     (ii)  the BIT re-indexing — a scour prime's class costs log2(q) bits,
//           not "one prime", so the prefix curve's x-axis is not the
//           information axis and the two orderings disagree;
//     (iii) the SUB-PRIME dial — partial revelations (the class is known to
//           lie in a set S, 0 in S), where the exact minimum over a
//           single restricted prime decomposes and is computable in closed
//           form from a 300-entry table.
//
// THE OBJECT (unchanged from attack-advmin-1113 / attack-anchored-01).
//   Level x = 11: W = 2310, the Natal@5 comb has N = 90 slots (r = 11,17 mod
//   30 with r !=  0,-2 mod 7 and mod 11). The Scour is the 10 primes
//   13..47 (q > x, q^2 <= W). Each scour prime q strikes the two classes
//   {a_q, a_q - 2} mod q. The ANCHOR is a_q = 0 for every q (the arithmetic
//   scour: q strikes multiples of q and multiples-minus-2). Survivors at the
//   anchor = 45 = truth. The free-class adversarial minimum is advmin@11 = 16
//   (exact, two disjoint proof stacks, REFUTED.md row 77).
//
// THE DIAL, DEFINED.
//   A REVELATION is R = (S_1,...,S_n) with 0 in S_i subset Z/q_i: the
//   certificate is told that prime i's class lies in S_i. Its INFORMATION
//   COST is  I(R) = sum_i log2(q_i / |S_i|)  bits: 0 bits when every S_i is
//   everything (the class-blind case, floor advmin = 16) and
//   I_max = sum_i log2(q_i) = 47.9 bits when every S_i = {0} (full anchoring,
//   floor 45 = truth). The FLOOR of a revelation is
//       F(R) = min over class vectors in the product of S_i, of survivors.
//   F is monotone under shrinking S. The DIAL is D(B) = max{F(R) : I(R) <= B}.
//
//   HONEST SCOPE, stated before any number. D(B) is a maximum over an
//   astronomically large family (prod 2^(q_i - 1) revelations) and this
//   script does NOT compute it. It computes two exact sub-families whose
//   values are LOWER bounds on D(B):
//     - the ALL-OR-NOTHING lattice (each S_i is {0} or everything): 1024
//       revelations, every floor exact;
//     - a GREEDY-CHOICE partial family (S_i = {0} + the classes with the
//       highest single-prime floor), evaluated exactly.
//   Every "D >= " statement below is therefore a certified lower bound and
//   every claim about the SHAPE of the dial is a claim about these families,
//   not about the unconstrained maximum. The one exact statement about the
//   unconstrained dial is at a single prime, where the minimum decomposes
//   (SEC 3): there the sub-family IS the family and the numbers are exact.
//
// WHAT WOULD FALSIFY THE HEADLINE. The route this attack is testing wants a
// CONCAVE dial: most of the 16 -> 45 gap bought by the first few bits, so
// that a bounded amount of class information (supplied by an argument rather
// than an enumeration) carries most of the floor. The falsifier is a dial
// that is linear or convex — gain proportional to bits, or back-loaded. The
// diagnostics are pre-registered in SEC 2: normalized area under the
// envelope (0.5 = linear, > 0.5 = concave/front-loaded, < 0.5 = convex), and
// the bit cost of reaching 50% / 75% / 90% of the 16 -> 45 gap.
//
// CALIBRATION GATES (the run ABORTS on any failure, before anything is
// reported):
//   G1  N = 90, scour = [13..47], anchored survivors = 45.
//   G2  the cited adversarial witness replays to 16 survivors.
//   G3  the engine's own free-class minimum is 16 (this is the calibration
//       the task names: if j = 0 does not read 16 the engine is wrong).
//   G4  the engine reproduces the published forcing ladder, all 11 entries.
//   G5  the engine reproduces the published single-prime anchorings, 10/10.
//   G6  a prune-free exhaustive enumerator (separate code path, no bound, no
//       dedup) agrees with the B&B on four sub-instances up to 3.07e6 leaves.
//
// Usage: node research/attack-history-dial-01.js       (one process)
// ============================================================================

// ------------------------------------------------------------- cited inputs
// Standing compute rule: cite embedded artifacts, do not recompute them.
//   [ADV] research/attack-advmin-1113.js embedded OUTPUT (219 s run) and
//         research/history/staging/attack-advmin-1113.md.
//   [UNI] research/attack-anchored-01-unify.js embedded OUTPUT and
//         research/history/staging/attack-anchored-01.md.
//   [STC] paper/staircase-note.md Thm 8 (floors 34/110, truths 45/307).
const CITED = {
  witness11: [10, 4, 14, 15, 24, 17, 34, 39, 10, 40],              // [ADV] q=13..47
  advmin11: 16,                                                    // [ADV]
  truth11: 45, floor11: 34, truth13: 307, floor13: 110,            // [STC]
  forcingLadder11: [16, 20, 20, 22, 23, 25, 30, 35, 38, 42, 45],   // [UNI] SEC 5
  singles11: [20, 17, 18, 17, 17, 18, 18, 17, 18, 17],             // [UNI] SEC 5
  // [UNI] SEC 3: the unified-cap ladder's floor at depth K, @11 and @13.
  // This is the OTHER dial (freshness depth, Face 3's own axis) and is quoted
  // here for the side-by-side in SEC 5; not recomputed.
  unifiedK11: [36, 40, 43, 44, 44, 44, 44, 44, 45, 45, 45],
  unifiedK13: [115, 159, 192, 215, 228, 243, 253, 263, 268, 275, 281, 282, 284,
    289, 295, 298, 300, 300, 300, 301, 303, 303, 305, 305, 305, 305, 305, 306,
    307, 307, 307, 307, 307, 307, 307],
};

let failures = 0;
function check(name, ok) { console.log(`  ${ok ? 'ok   ' : 'FAIL '} ${name}`); if (!ok) failures++; }
function gate(name, ok) {
  if (!ok) { console.log(`  ABORT calibration gate failed: ${name}`); process.exit(1); }
  console.log(`  ok    GATE ${name}`);
}
// No wall-clock figure is printed anywhere: the output must be byte-identical
// across runs so `embed.js --check` binds it. Node counts are deterministic.

// ---------------------------------------------------------------- utilities
function primesUpTo(n) {
  const s = new Uint8Array(n + 1), P = [];
  for (let i = 2; i <= n; i++) if (!s[i]) { P.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; }
  return P;
}
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6D2B79F5) >>> 0; let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function popcount32(v) {
  v = v - ((v >>> 1) & 0x55555555);
  v = (v & 0x33333333) + ((v >>> 2) & 0x33333333);
  v = (v + (v >>> 4)) & 0x0f0f0f0f;
  return (v * 0x01010101) >>> 24;
}

// ---------------------------------------------------------------- the level
// Natal@5 comb over one tile W = x#, and the Scour (x < q, q^2 <= W).
function buildLevel(x) {
  const wheelAll = primesUpTo(x);
  let W = 1; for (const p of wheelAll) W *= p;
  const scour = primesUpTo(Math.floor(Math.sqrt(W)) + 2).filter(q => q > x && q * q <= W);
  const wheel = wheelAll.filter(p => p >= 7);
  const slots = [];
  for (let r = 0; r < W; r++) {
    const m = r % 30; if (m !== 11 && m !== 17) continue;
    let ok = true;
    for (const p of wheel) { const rp = r % p; if (rp === 0 || rp === p - 2) { ok = false; break; } }
    if (ok) slots.push(r);
  }
  const N = slots.length, WORDS = (N + 31) >> 5;
  // KILL[i][a] = bitmask over slot indices struck by prime i at class a.
  const KILL = scour.map(q => {
    const arr = [];
    for (let a = 0; a < q; a++) {
      const b = (a - 2 + q) % q, m = new Uint32Array(WORDS);
      for (let j = 0; j < N; j++) { const rq = slots[j] % q; if (rq === a || rq === b) m[j >> 5] |= (1 << (j & 31)); }
      arr.push(m);
    }
    return arr;
  });
  return { x, W, wheel, scour, slots, N, WORDS, KILL };
}

// The plain march (independent of the B&B): apply the classes in order,
// count fresh kills and survivors. Used for witness replay and anchoring.
function march(L, cls) {
  const struck = new Uint8Array(L.N); const fresh = [];
  for (let i = 0; i < L.scour.length; i++) {
    const q = L.scour[i], a = ((cls[i] % q) + q) % q, b = (a - 2 + q) % q; let f = 0;
    for (let j = 0; j < L.N; j++) {
      if (struck[j]) continue;
      const rq = L.slots[j] % q; if (rq === a || rq === b) { struck[j] = 1; f++; }
    }
    fresh.push(f);
  }
  let s = 0; for (let j = 0; j < L.N; j++) if (!struck[j]) s++;
  return { fresh, survivors: s };
}

// ============================================================================
// THE ENGINE — branch-and-bound maximization of coverage over a product of
// PERMITTED CLASS SETS, one per free prime. survivors = N - coverage.
//
// PROVEN PRUNING ONLY, two ingredients, both one line:
//  (B1) union bound: any completion adds at most, for each remaining prime,
//       the largest number of currently-uncovered slots any of its PERMITTED
//       classes covers. Valid because coverage is a union and the uncovered
//       set only shrinks as we descend.
//  (B2) fresh-set dedup: two permitted classes of the branching prime whose
//       fresh sets (kill set minus current cover) are equal produce
//       identical engine states; keep one. This is a state identity, not a
//       heuristic.
// No monotonicity assumption of any kind. The greedy incumbent only seeds
// `best`; correctness never depends on it.
// ============================================================================
function makeSolver(L) {
  const { N, WORDS, KILL, scour } = L;
  const n = scour.length;
  const scratch = new Uint32Array(WORDS);

  function gainOf(mask, cover) {
    let g = 0;
    for (let w = 0; w < WORDS; w++) g += popcount32(mask[w] & ~cover[w]);
    return g;
  }
  // allowed: array (length n) of arrays of permitted class indices, or null
  //          for "prime is fixed", in which case fixedAt[i] is its class.
  function solveMin(allowed, fixedAt, nodeBudget) {
    const cover = new Uint32Array(WORDS);
    let covered = 0;
    const free = [];
    for (let i = 0; i < n; i++) {
      if (allowed[i] === null) {
        const m = KILL[i][fixedAt[i]];
        for (let w = 0; w < WORDS; w++) { covered += popcount32(m[w] & ~cover[w]); cover[w] |= m[w]; }
      } else free.push(i);
    }
    // greedy incumbent
    let best;
    {
      const c2 = cover.slice(); let cov2 = covered; const rem = free.slice();
      while (rem.length) {
        let bi = -1, ba = 0, bg = -1;
        for (const i of rem) for (const a of allowed[i]) { const g = gainOf(KILL[i][a], c2); if (g > bg) { bg = g; bi = i; ba = a; } }
        const m = KILL[bi][ba];
        for (let w = 0; w < WORDS; w++) c2[w] |= m[w];
        cov2 += bg; rem.splice(rem.indexOf(bi), 1);
      }
      best = cov2;
    }
    let nodes = 0, tripped = false;
    function rec(remFree) {
      if (tripped) return;
      nodes++;
      if (nodes > nodeBudget) { tripped = true; return; }
      if (!remFree.length) { if (covered > best) best = covered; return; }
      // (B1) union bound, and pick the branching prime with the largest max gain
      let bound = covered, bi = 0, bmax = -1;
      const maxes = new Array(remFree.length);
      for (let t = 0; t < remFree.length; t++) {
        const i = remFree[t]; let m = 0;
        for (const a of allowed[i]) { const g = gainOf(KILL[i][a], cover); if (g > m) m = g; }
        maxes[t] = m; bound += m; if (m > bmax) { bmax = m; bi = t; }
      }
      if (bound <= best) return;
      const i = remFree[bi];
      const rest = []; let restBound = 0;
      for (let t = 0; t < remFree.length; t++) if (t !== bi) { rest.push(remFree[t]); restBound += maxes[t]; }
      // (B2) dedup on the exact fresh set
      const seen = new Set(), opts = [];
      for (const a of allowed[i]) {
        let key = '', g = 0;
        for (let w = 0; w < WORDS; w++) { const f = KILL[i][a][w] & ~cover[w]; scratch[w] = f; g += popcount32(f); key += f.toString(36) + '.'; }
        if (seen.has(key)) continue; seen.add(key);
        opts.push({ f: scratch.slice(), g });
      }
      opts.sort((u, v) => v.g - u.g);
      for (const o of opts) {
        if (covered + o.g + restBound <= best) break;   // sorted early break
        for (let w = 0; w < WORDS; w++) cover[w] |= o.f[w];
        covered += o.g;
        rec(rest);
        covered -= o.g;
        for (let w = 0; w < WORDS; w++) cover[w] &= ~o.f[w];
        if (tripped) return;
      }
    }
    rec(free);
    return { minSurv: tripped ? null : N - best, nodes, tripped };
  }
  // Convenience: anchor the primes in `set` at class 0, free the rest.
  function minWithAnchored(set, nodeBudget = 2e6) {
    const allowed = [], fixedAt = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      if (set.has(i)) allowed.push(null);
      else { const arr = []; for (let a = 0; a < scour[i]; a++) arr.push(a); allowed.push(arr); }
    }
    return solveMin(allowed, fixedAt, nodeBudget);
  }
  // Convenience: pin prime i to class a, free the rest.
  function minWithPinned(i, a, nodeBudget = 2e6) {
    const allowed = [], fixedAt = new Array(n).fill(0);
    for (let k = 0; k < n; k++) {
      if (k === i) { allowed.push(null); fixedAt[k] = a; }
      else { const arr = []; for (let b = 0; b < scour[k]; b++) arr.push(b); allowed.push(arr); }
    }
    return solveMin(allowed, fixedAt, nodeBudget);
  }
  return { solveMin, minWithAnchored, minWithPinned };
}

// A prune-free exhaustive enumerator: a separate code path with NO bound, NO
// dedup, NO incumbent. Used only to calibrate the B&B on small sub-instances.
function exhaustiveMin(L, allowed, fixedAt) {
  const { N, WORDS, KILL, scour } = L;
  const base = new Uint32Array(WORDS);
  const free = [];
  for (let i = 0; i < scour.length; i++) {
    if (allowed[i] === null) { const m = KILL[i][fixedAt[i]]; for (let w = 0; w < WORDS; w++) base[w] |= m[w]; }
    else free.push(i);
  }
  let leaves = 0, best = -1;
  const stack = [base];
  function rec(d) {
    if (d === free.length) {
      leaves++;
      const c = stack[d]; let cov = 0;
      for (let w = 0; w < WORDS; w++) cov += popcount32(c[w]);
      if (cov > best) best = cov;
      return;
    }
    const i = free[d];
    for (const a of allowed[i]) {
      const nxt = new Uint32Array(WORDS), m = KILL[i][a], c = stack[d];
      for (let w = 0; w < WORDS; w++) nxt[w] = c[w] | m[w];
      stack[d + 1] = nxt; rec(d + 1);
    }
  }
  rec(0);
  return { minSurv: N - best, leaves };
}

// ============================================================================
console.log('SEC 0. CALIBRATION — nothing below is reported unless all six gates pass');
// ============================================================================
const L11 = buildLevel(11);
const S11 = makeSolver(L11);
const n11 = L11.scour.length;
console.log(`  @11: W = ${L11.W}, comb N = ${L11.N}, scour = [${L11.scour.join(',')}] (${n11} primes)`);
gate('G1a  N = 90', L11.N === 90);
gate('G1b  scour = 13..47, ten primes', L11.scour.join(',') === '13,17,19,23,29,31,37,41,43,47');
const anchored11 = march(L11, new Array(n11).fill(0));
gate(`G1c  anchored survivors = ${anchored11.survivors} = truth 45 [STC]`, anchored11.survivors === CITED.truth11);
const wRep = march(L11, CITED.witness11);
gate(`G2   cited adversarial witness replays to ${wRep.survivors} = advmin 16 [ADV]`, wRep.survivors === CITED.advmin11);
const free0 = S11.minWithAnchored(new Set(), 5e6);
gate(`G3   engine free-class minimum = ${free0.minSurv} = advmin@11 = 16 [ADV] (${free0.nodes} nodes)`,
  free0.minSurv === CITED.advmin11);

const prefix = [];
for (let j = 0; j <= n11; j++) {
  const set = new Set(); for (let t = 0; t < j; t++) set.add(t);
  prefix.push(S11.minWithAnchored(set, 5e6).minSurv);
}
gate(`G4   forcing ladder reproduced: ${prefix.join('->')}`,
  prefix.join(',') === CITED.forcingLadder11.join(','));
const singles = [];
for (let i = 0; i < n11; i++) singles.push(S11.minWithAnchored(new Set([i]), 5e6).minSurv);
gate(`G5   single-prime anchorings reproduced 10/10: ${singles.join(',')}`,
  singles.join(',') === CITED.singles11.join(','));

// G6: prune-free exhaustive agreement on four sub-instances.
function allowedFor(freeSet, restrictFn) {
  const allowed = [], fixedAt = new Array(n11).fill(0);
  for (let i = 0; i < n11; i++) {
    if (!freeSet.has(i)) allowed.push(null);
    else { const arr = []; for (let a = 0; a < L11.scour[i]; a++) if (!restrictFn || restrictFn(i, a)) arr.push(a); allowed.push(arr); }
  }
  return { allowed, fixedAt };
}
const subInstances = [
  { name: 'primes {13,17,19} free, rest anchored', idx: [0, 1, 2] },
  { name: 'primes {13,17,19,23} free, rest anchored', idx: [0, 1, 2, 3] },
  { name: 'primes {29,31,37,41} free, rest anchored', idx: [4, 5, 6, 7] },
  { name: 'primes {37,41,43,47} free, rest anchored', idx: [6, 7, 8, 9] },
];
let g6ok = true;
for (const si of subInstances) {
  const { allowed, fixedAt } = allowedFor(new Set(si.idx), null);
  const ex = exhaustiveMin(L11, allowed, fixedAt);
  const bb = S11.solveMin(allowed, fixedAt, 5e6);
  const ok = ex.minSurv === bb.minSurv;
  if (!ok) g6ok = false;
  console.log(`     ${si.name}: exhaustive ${ex.minSurv} over ${ex.leaves} leaves | B&B ${bb.minSurv} in ${bb.nodes} nodes  ${ok ? 'AGREE' : 'DISAGREE'}`);
}
gate('G6   prune-free exhaustive agrees with the B&B on 4 of 4 sub-instances', g6ok);
console.log(`  all six gates pass; the engine is the third independent one on advmin@11 = 16.`);

// ============================================================================
console.log('\nSEC 1. THE FULL ANCHOR LATTICE @11 — all 1024 subsets, exact minima');
// ============================================================================
// The forcing ladder walks ONE chain of this lattice (the prefixes, smallest
// prime first). The envelope over all subsets of a given size is the object
// the shape question needs: the BEST j primes, not the FIRST j.
const NSUB = 1 << n11;
const latF = new Int16Array(NSUB);
let latNodes = 0;
for (let mask = 0; mask < NSUB; mask++) {
  const set = new Set(); for (let i = 0; i < n11; i++) if (mask & (1 << i)) set.add(i);
  const r = S11.minWithAnchored(set, 5e6);
  if (r.minSurv === null) { console.log(`  ABORT: lattice node ${mask} tripped its budget`); process.exit(1); }
  latF[mask] = r.minSurv; latNodes += r.nodes;
}
console.log(`  1024 exact minima computed in ${latNodes} B&B nodes`);
check('lattice is monotone: adding an anchored prime never lowers the floor',
  (() => { for (let m = 0; m < NSUB; m++) for (let i = 0; i < n11; i++) if (!(m & (1 << i))) if (latF[m | (1 << i)] < latF[m]) return false; return true; })());
check('lattice endpoints: empty set = 16 [ADV], full set = 45 [STC]',
  latF[0] === CITED.advmin11 && latF[NSUB - 1] === CITED.truth11);
check('lattice agrees with the published forcing ladder on all 11 prefixes',
  (() => { for (let j = 0; j <= n11; j++) { let m = 0; for (let t = 0; t < j; t++) m |= (1 << t); if (latF[m] !== CITED.forcingLadder11[j]) return false; } return true; })());

const bySize = Array.from({ length: n11 + 1 }, () => []);
for (let m = 0; m < NSUB; m++) bySize[popcount32(m)].push(m);
console.log('\n   j  #sets   min  mean   MAX   best set (the j primes that buy the most)   prefix');
const envJ = [];
for (let j = 0; j <= n11; j++) {
  const ms = bySize[j];
  let mn = 999, mx = -1, sum = 0, arg = 0;
  for (const m of ms) { const v = latF[m]; sum += v; if (v < mn) mn = v; if (v > mx) { mx = v; arg = m; } }
  envJ.push(mx);
  const names = []; for (let i = 0; i < n11; i++) if (arg & (1 << i)) names.push(L11.scour[i]);
  let pm = 0; for (let t = 0; t < j; t++) pm |= (1 << t);
  console.log(`  ${String(j).padStart(2)}  ${String(ms.length).padStart(5)}   ${String(mn).padStart(3)}  ${(sum / ms.length).toFixed(2).padStart(5)}   ${String(mx).padStart(3)}   {${names.join(',')}}`.padEnd(72) + `  ${latF[pm]}`);
}
console.log(`  BEST-j ENVELOPE: ${envJ.join(' -> ')}`);
console.log(`  PREFIX (forcing ladder): ${CITED.forcingLadder11.join(' -> ')}`);
check('the best-j envelope dominates the prefix chain at every j (it is a max over a superset)',
  envJ.every((v, j) => v >= CITED.forcingLadder11[j]));
const gapSum = envJ.reduce((s, v, j) => s + (v - CITED.forcingLadder11[j]), 0);
console.log(`  envelope minus prefix, summed over j = 0..10: ${gapSum} (how much the prefix ordering gives away)`);

// --------------------------------------------------------------------------
// THE TOUCH-COUNT CEILING [PROVEN here, and TIGHT] — the one exact statement
// this script makes about the UNCONSTRAINED dial D, not about a sub-family.
//
//   Let R = (S_1..S_n) be any revelation (0 in S_i for every i, because a
//   revelation is TRUE information about the anchor) and let
//   T(R) = { i : S_i != Z/q_i } be the set of primes R says anything at all
//   about. Then
//        F(R)  <=  latF[T(R)]  <=  envJ[ |T(R)| ].
//   PROOF. The class vectors with cls_i = 0 for i in T(R) and cls_i free for
//   i outside T(R) all lie in the product of the S_i (0 is admissible inside
//   T, everything is admissible outside it). The minimum over that
//   sub-family is by definition latF[T(R)]. A minimum over a subset is at
//   least the minimum over the whole, so F(R) <= latF[T(R)]. QED.
//   TIGHT: S_i = {0} for i in T attains it.
//
// Consequence: envJ is not a lower bound on anything. It is the EXACT
// maximum survivor floor available to any argument, of any strength, that
// reads the strike classes of at most j scour primes and is silent about the
// rest. No amount of information about j primes beats envJ[j].
// --------------------------------------------------------------------------
console.log('\n  THE TOUCH-COUNT CEILING [PROVEN, tight]: any revelation naming at most j primes');
console.log('  has floor at most envJ[j], because anchoring those j and freeing the rest is a');
console.log('  sub-family of it. So envJ is the EXACT ceiling per prime-count, not a lower bound.');
console.log('   floor V   minimum number of scour primes any argument must read to certify V');
for (const V of [17, 21, 23, 25, 28, 31, 35, 37, 41, 43, 45]) {
  let jn = null; for (let j = 0; j <= n11; j++) if (envJ[j] >= V) { jn = j; break; }
  const tag = V === 35 ? '   <- first value above the published staircase floor 34 [STC]'
    : V === 45 ? '   <- the truth' : V === 17 ? '   <- first value above the class-blind ceiling 16 [ADV]' : '';
  console.log(`     >= ${String(V).padStart(2)}      ${jn === null ? 'impossible' : String(jn).padStart(2) + ' of ' + n11}${tag}`);
}
const incs = envJ.slice(1).map((v, t) => v - envJ[t]);
const mean = incs.reduce((a, b) => a + b, 0) / incs.length;
console.log(`\n  PER-PRIME PRICE, the shape statement in prime units: envelope increments ${incs.join(',')}`);
console.log(`    mean ${mean.toFixed(2)} survivors per prime read, range [${Math.min(...incs)}, ${Math.max(...incs)}], no downward trend.`);
let maxdev = 0; for (let j = 0; j <= n11; j++) maxdev = Math.max(maxdev, Math.abs(envJ[j] - (CITED.advmin11 + j * (CITED.truth11 - CITED.advmin11) / n11)));
console.log(`    max deviation of the envelope from the straight line 16 + 2.9j: ${maxdev.toFixed(2)} survivors.`);
console.log('    A concave dial would show large early increments decaying to near zero. It does not.');

// ============================================================================
console.log('\nSEC 2. THE BIT AXIS — cost log2(q) per prime, and the shape of the dial');
// ============================================================================
const BITS = L11.scour.map(q => Math.log2(q));
const TOTBITS = BITS.reduce((a, b) => a + b, 0);
console.log('  per-prime information cost (bits to name a class mod q):');
console.log('   ' + L11.scour.map((q, i) => `${q}:${BITS[i].toFixed(3)}`).join('  '));
console.log(`  full anchoring costs I_max = ${TOTBITS.toFixed(3)} bits; the whole floor gap is ${CITED.truth11 - CITED.advmin11} survivors.`);
console.log(`  naive linear price: ${((CITED.truth11 - CITED.advmin11) / TOTBITS).toFixed(4)} survivors per bit.`);

// Exact Pareto frontier of the all-or-nothing family: for each floor value V,
// the cheapest subset (in bits) achieving F >= V.
const cheapest = new Map();   // V -> {bits, mask}
for (let m = 0; m < NSUB; m++) {
  let b = 0; for (let i = 0; i < n11; i++) if (m & (1 << i)) b += BITS[i];
  const V = latF[m];
  for (let v = CITED.advmin11; v <= V; v++) {
    const cur = cheapest.get(v);
    if (!cur || b < cur.bits - 1e-12) cheapest.set(v, { bits: b, mask: m });
  }
}
console.log('\n  CHEAPEST ALL-OR-NOTHING REVELATION REACHING EACH FLOOR (exact over the 1024):');
console.log('   floor  bits   frac of I_max   frac of the 16->45 gap   the anchored set');
const frontier = [];
for (let v = CITED.advmin11; v <= CITED.truth11; v++) {
  const c = cheapest.get(v); if (!c) continue;
  const names = []; for (let i = 0; i < n11; i++) if (c.mask & (1 << i)) names.push(L11.scour[i]);
  const fb = c.bits / TOTBITS, fg = (v - CITED.advmin11) / (CITED.truth11 - CITED.advmin11);
  frontier.push({ v, bits: c.bits, fb, fg, names });
  console.log(`    ${String(v).padStart(3)}  ${c.bits.toFixed(3).padStart(6)}   ${fb.toFixed(4).padStart(6)}          ${fg.toFixed(4).padStart(6)}          {${names.join(',')}}`);
}
// Pre-registered shape diagnostics.
function fracAt(target) {   // bits needed for >= target fraction of the gap
  const need = CITED.advmin11 + target * (CITED.truth11 - CITED.advmin11);
  let bestB = Infinity;
  for (const f of frontier) if (f.v >= need - 1e-12 && f.bits < bestB) bestB = f.bits;
  return bestB;
}
console.log('\n  PRE-REGISTERED SHAPE DIAGNOSTICS (concave/front-loaded is the route\'s hypothesis):');
for (const t of [0.25, 0.5, 0.75, 0.9, 1.0]) {
  const b = fracAt(t);
  console.log(`    to buy ${(t * 100).toFixed(0).padStart(3)}% of the 16->45 gap costs ${b.toFixed(3).padStart(6)} bits = ${(b / TOTBITS * 100).toFixed(1).padStart(5)}% of I_max   (linear dial would cost ${(t * 100).toFixed(1)}%)`);
}
// Normalized area under the envelope E(b)/gap over b in [0, I_max].
// E is a step function: sort the 1024 subsets by bits, take the running max.
const pts = [];
for (let m = 0; m < NSUB; m++) { let b = 0; for (let i = 0; i < n11; i++) if (m & (1 << i)) b += BITS[i]; pts.push([b, latF[m]]); }
pts.sort((u, v) => u[0] - v[0]);
let run = -1; const steps = [];
for (const [b, v] of pts) { if (v > run) { run = v; steps.push([b, v]); } }
let auc = 0;
for (let t = 0; t < steps.length; t++) {
  const b0 = steps[t][0], b1 = (t + 1 < steps.length) ? steps[t + 1][0] : TOTBITS;
  auc += (steps[t][1] - CITED.advmin11) / (CITED.truth11 - CITED.advmin11) * (b1 - b0) / TOTBITS;
}
console.log(`\n  NORMALIZED AREA under the exact all-or-nothing envelope: AUC = ${auc.toFixed(4)}`);
console.log('    0.5 = linear dial; > 0.5 = concave (front-loaded, the lemma-shaped case); < 0.5 = convex (back-loaded).');
console.log(`    VERDICT on the all-or-nothing family: ${auc > 0.55 ? 'CONCAVE' : auc < 0.45 ? 'CONVEX (back-loaded)' : 'LINEAR to within +-0.05'}`);

// The same diagnostic on the prefix chain (the published forcing ladder), for
// contrast, and on the OTHER dial (freshness depth K, cited not recomputed).
function aucOfCurve(vals, costs, lo, hi) {
  const tot = costs[costs.length - 1];
  let a = 0;
  for (let t = 0; t < vals.length; t++) {
    const c0 = t === 0 ? 0 : costs[t - 1], c1 = costs[t];
    a += (vals[t] - lo) / (hi - lo) * (c1 - c0) / tot;
  }
  return a;
}
const prefCosts = []; { let s = 0; for (let i = 0; i < n11; i++) { s += BITS[i]; prefCosts.push(s); } }
const aucPrefix = aucOfCurve(CITED.forcingLadder11.slice(1), prefCosts, CITED.advmin11, CITED.truth11);
console.log(`  AUC of the published prefix chain on the same bit axis: ${aucPrefix.toFixed(4)}`);
// Depth dial: cost measured in rungs (each rung is one more freshness modulus).
const kCosts11 = CITED.unifiedK11.map((_, i) => i + 1);
const aucK11 = aucOfCurve(CITED.unifiedK11, kCosts11, CITED.floor11, CITED.truth11);
const kCosts13 = CITED.unifiedK13.map((_, i) => i + 1);
const aucK13 = aucOfCurve(CITED.unifiedK13, kCosts13, CITED.floor13, CITED.truth13);
console.log(`  [UNI] the OTHER dial for contrast — unified-cap floor vs freshness depth K, normalized on its own`);
console.log(`        34->45 (@11) and 110->307 (@13) range: AUC = ${aucK11.toFixed(4)} @11 and ${aucK13.toFixed(4)} @13.`);

// ============================================================================
console.log('\nSEC 3. THE SUB-PRIME DIAL — partial revelations, exact at one prime');
// ============================================================================
// KEY IDENTITY (proven, one line). If only prime i is restricted (to S_i) and
// every other prime is free, the minimum over the product factorizes:
//     F = min_{a in S_i} f_i(a),   f_i(a) = min survivors with prime i pinned
//                                          at class a and all others free.
// So the ENTIRE unconstrained sub-prime dial at one prime is a function of the
// 300-entry table f_i(a) — no search over subsets is needed, and the optimum
// over all S_i of a given size is exact: keep class 0 (the anchor must remain
// admissible: a revelation is TRUE information) plus the |S|-1 classes with
// the largest f_i.
const F = L11.scour.map(() => null);
let pinNodes = 0;
for (let i = 0; i < n11; i++) {
  const row = [];
  for (let a = 0; a < L11.scour[i]; a++) { const r = S11.minWithPinned(i, a, 5e6); if (r.minSurv === null) { console.log('  ABORT: pin budget tripped'); process.exit(1); } row.push(r.minSurv); pinNodes += r.nodes; }
  F[i] = row;
}
console.log(`  f_i(a) table: ${L11.scour.reduce((a, q) => a + q, 0)} exact minima in ${pinNodes} nodes`);
check('f_i(0) = the published single-prime anchoring, 10/10 [UNI]',
  F.every((row, i) => row[0] === CITED.singles11[i]));
check('min_a f_i(a) = advmin@11 = 16 at every prime (the free adversary pins somewhere)',
  F.every(row => Math.min(...row) === CITED.advmin11));
console.log('\n   q   f(0)=anchor   max_a f   argmax classes        full row f_i(a), a = 0..q-1');
for (let i = 0; i < n11; i++) {
  const row = F[i], mx = Math.max(...row), arg = row.map((v, a) => v === mx ? a : -1).filter(a => a >= 0);
  console.log(`  ${String(L11.scour[i]).padStart(2)}      ${String(row[0]).padStart(2)}          ${String(mx).padStart(2)}     {${arg.join(',')}}`.padEnd(50) + ` [${row.join(',')}]`);
}
console.log('\n  THE CEILING ON ONE PRIME [PROVEN, exact]. A revelation is TRUE information, so 0 must');
console.log('  stay admissible: the strongest one-prime revelation is S_i = {0}, and its floor is');
console.log(`  max over i of f_i(0) = ${Math.max(...F.map(r => r[0]))} survivors against the truth ${CITED.truth11} — ${(100 * (Math.max(...F.map(r => r[0])) - CITED.advmin11) / (CITED.truth11 - CITED.advmin11)).toFixed(1)}% of the 16->45 gap.`);
console.log(`  (An UNTRUE revelation could do marginally better: max over i,a of f_i(a) = ${Math.max(...F.map(r => Math.max(...r)))}, at q = 13 class 11.`);
console.log('  Knowing where the anchor is NOT is worth as much as knowing where it is; neither is worth much.)');

// The exact single-prime fine dial: floor as a function of bits revealed.
console.log('\n  EXACT SUB-PRIME DIAL AT EACH PRIME (S = {0} + the top |S|-1 classes by f):');
console.log('   q   |S|=1        |S|=2        |S|=q/4      |S|=q/2      |S|=q (0 bits)');
for (let i = 0; i < n11; i++) {
  const q = L11.scour[i], row = F[i];
  const rest = row.map((v, a) => [v, a]).filter(([, a]) => a !== 0).sort((u, v) => v[0] - u[0]);
  const dial = s => s === 1 ? row[0] : Math.min(row[0], rest[s - 2][0]);
  const cells = [1, 2, Math.max(1, Math.round(q / 4)), Math.max(1, Math.round(q / 2)), q]
    .map(s => `${dial(s)}@${(Math.log2(q / s)).toFixed(2)}b`);
  console.log(`  ${String(q).padStart(2)}   ` + cells.map(c => c.padEnd(12)).join(''));
}
// Where does the single-prime dial saturate? Bits to reach its own ceiling.
console.log('\n  SATURATION: bits at which each prime\'s own dial first reaches its own ceiling f(0):');
let satBits = 0, satOne = [];
for (let i = 0; i < n11; i++) {
  const q = L11.scour[i], row = F[i];
  const rest = row.map((v, a) => [v, a]).filter(([, a]) => a !== 0).sort((u, v) => v[0] - u[0]);
  let s = 1;
  for (let t = q; t >= 1; t--) { const v = t === 1 ? row[0] : Math.min(row[0], rest[t - 2][0]); if (v >= row[0]) { s = t; break; } }
  const b = Math.log2(q / s);
  satOne.push({ q, s, b, v: row[0] });
  satBits += b;
  console.log(`    q=${String(q).padStart(2)}: |S| = ${String(s).padStart(2)} of ${q} suffices for floor ${row[0]} — ${b.toFixed(3)} bits, not ${BITS[i].toFixed(3)}`);
}
console.log(`  Sum of the per-prime saturation costs: ${satBits.toFixed(3)} bits vs I_max ${TOTBITS.toFixed(3)} — a ${(100 * (1 - satBits / TOTBITS)).toFixed(1)}% discount IF the dial were separable, which it is not (SEC 3b).`);

// SEC 3b. Multi-prime partial revelations, evaluated exactly (the CHOICE of
// revelation is greedy, the FLOOR of the chosen revelation is exact).
console.log('\n  SEC 3b. MULTI-PRIME PARTIAL REVELATIONS (greedy choice, exact floor).');
console.log('  Family: at every prime keep class 0 plus the top (ceil(phi*q)-1) classes by f_i.');
console.log('  This is a certified LOWER bound on D(B), never the max over all revelations.');
console.log('   phi      bits I(R)   frac I_max   floor F(R)   frac of the 16->45 gap');
const phiRows = [];
for (const phi of [1.0, 0.9, 0.8, 0.75, 0.6, 0.5, 0.45, 0.4, 0.35, 0.3, 0.25, 0.2, 0.15, 0.12, 0.1, 0.08, 0.05, 0.03, 0.0]) {
  const allowed = [], fixedAt = new Array(n11).fill(0);
  let bits = 0;
  for (let i = 0; i < n11; i++) {
    const q = L11.scour[i], row = F[i];
    const s = Math.max(1, Math.min(q, Math.ceil(phi * q)));
    if (s === q) { const arr = []; for (let a = 0; a < q; a++) arr.push(a); allowed.push(arr); }
    else if (s === 1) { allowed.push(null); fixedAt[i] = 0; bits += BITS[i]; }
    else {
      const rest = row.map((v, a) => [v, a]).filter(([, a]) => a !== 0).sort((u, v) => v[0] - u[0]);
      const arr = [0]; for (let t = 0; t < s - 1; t++) arr.push(rest[t][1]);
      allowed.push(arr); bits += Math.log2(q / s);
    }
  }
  const r = S11.solveMin(allowed, fixedAt, 5e6);
  if (r.minSurv === null) { console.log(`    phi=${phi}: BUDGET TRIPPED — NOT COMPLETED`); continue; }
  const fg = (r.minSurv - CITED.advmin11) / (CITED.truth11 - CITED.advmin11);
  phiRows.push({ phi, bits, v: r.minSurv, fg });
  console.log(`   ${phi.toFixed(2)}    ${bits.toFixed(3).padStart(7)}     ${(bits / TOTBITS).toFixed(4).padStart(6)}       ${String(r.minSurv).padStart(3)}         ${fg.toFixed(4)}`);
}
// Control: the same |S| sizes but with random admissible classes (0 always in).
console.log('  CONTROL — identical bit costs, classes chosen at random (seeded) instead of by f:');
const rnd = mulberry32(20260826);
for (const phi of [0.5, 0.25, 0.1]) {
  let bestSeen = 999, worstSeen = -1, sumv = 0; const TR = 12;
  let bits = 0;
  for (let tr = 0; tr < TR; tr++) {
    const allowed = [], fixedAt = new Array(n11).fill(0); bits = 0;
    for (let i = 0; i < n11; i++) {
      const q = L11.scour[i], s = Math.max(1, Math.min(q, Math.ceil(phi * q)));
      if (s === q) { const arr = []; for (let a = 0; a < q; a++) arr.push(a); allowed.push(arr); }
      else if (s === 1) { allowed.push(null); fixedAt[i] = 0; bits += BITS[i]; }
      else {
        const pool = []; for (let a = 1; a < q; a++) pool.push(a);
        for (let t = pool.length - 1; t > 0; t--) { const j = Math.floor(rnd() * (t + 1)); const tmp = pool[t]; pool[t] = pool[j]; pool[j] = tmp; }
        allowed.push([0, ...pool.slice(0, s - 1)]); bits += Math.log2(q / s);
      }
    }
    const r = S11.solveMin(allowed, fixedAt, 5e6);
    const v = r.minSurv === null ? -1 : r.minSurv;
    if (v < bestSeen) bestSeen = v; if (v > worstSeen) worstSeen = v; sumv += v;
  }
  const gr = phiRows.find(p => Math.abs(p.phi - phi) < 1e-9);
  console.log(`   phi=${phi.toFixed(2)} at ${bits.toFixed(3)} bits: random ${TR} trials min ${bestSeen}, mean ${(sumv / TR).toFixed(2)}, max ${worstSeen}   | f-greedy ${gr ? gr.v : 'n/a'}`);
}

// SEC 3c. The MIXED family: fully anchor the best k-subset, phi-partial the
// rest. Strictly richer than either family alone; still a lower bound on D.
console.log('\n  SEC 3c. MIXED FAMILY (best-k subset fully anchored + phi-partial on the rest).');
const mixedRows = [];
for (let k = 0; k <= n11; k++) {
  // the best k-subset from the lattice
  let arg = 0, mx = -1;
  for (const m of bySize[k]) if (latF[m] > mx) { mx = latF[m]; arg = m; }
  for (const phi of [1.0, 0.6, 0.4, 0.25, 0.15, 0.08, 0.0]) {
    const allowed = [], fixedAt = new Array(n11).fill(0); let bits = 0;
    for (let i = 0; i < n11; i++) {
      const q = L11.scour[i], row = F[i];
      const anchored = (arg & (1 << i)) !== 0;
      const s = anchored ? 1 : Math.max(1, Math.min(q, Math.ceil(phi * q)));
      if (s === q) { const arr = []; for (let a = 0; a < q; a++) arr.push(a); allowed.push(arr); }
      else if (s === 1) { allowed.push(null); fixedAt[i] = 0; bits += BITS[i]; }
      else {
        const rest = row.map((v, a) => [v, a]).filter(([, a]) => a !== 0).sort((u, v) => v[0] - u[0]);
        const brr = [0]; for (let t = 0; t < s - 1; t++) brr.push(rest[t][1]);
        allowed.push(brr); bits += Math.log2(q / s);
      }
    }
    const r = S11.solveMin(allowed, fixedAt, 5e6);
    if (r.minSurv !== null) mixedRows.push({ bits, v: r.minSurv });
  }
}
console.log(`  ${mixedRows.length} mixed revelations evaluated exactly`);

// The COMBINED envelope over every family evaluated in this script.
const ALL = [];
for (let m = 0; m < NSUB; m++) { let b = 0; for (let i = 0; i < n11; i++) if (m & (1 << i)) b += BITS[i]; ALL.push([b, latF[m]]); }
for (const r of phiRows) ALL.push([r.bits, r.v]);
for (const r of mixedRows) ALL.push([r.bits, r.v]);
ALL.sort((u, v) => u[0] - v[0]);
let run2 = -1; const steps2 = [];
for (const [b, v] of ALL) { if (v > run2) { run2 = v; steps2.push([b, v]); } }
let auc2 = 0;
for (let t = 0; t < steps2.length; t++) {
  const b0 = steps2[t][0], b1 = (t + 1 < steps2.length) ? steps2[t + 1][0] : TOTBITS;
  auc2 += (steps2[t][1] - CITED.advmin11) / (CITED.truth11 - CITED.advmin11) * (b1 - b0) / TOTBITS;
}
console.log('\n  COMBINED ENVELOPE over all three families (the best certified lower bound on D(B)):');
console.log('   bits   frac I_max   floor   frac of the 16->45 gap');
for (const [b, v] of steps2) console.log(`   ${b.toFixed(3).padStart(7)}   ${(b / TOTBITS).toFixed(4).padStart(6)}     ${String(v).padStart(3)}     ${((v - CITED.advmin11) / (CITED.truth11 - CITED.advmin11)).toFixed(4)}`);
console.log(`  COMBINED AUC = ${auc2.toFixed(4)}   (0.5 linear, > 0.5 concave/front-loaded, < 0.5 convex)`);
function comb(fracBits) {
  const B = fracBits * TOTBITS; let bv = CITED.advmin11;
  for (const [b, v] of steps2) if (b <= B + 1e-9 && v > bv) bv = v;
  return bv;
}
console.log('  the diagonal test — floor bought at each fraction of I_max, against the linear dial:');
for (const fb of [0.1, 0.25, 0.5, 0.75, 0.9]) {
  const v = comb(fb), fg = (v - CITED.advmin11) / (CITED.truth11 - CITED.advmin11);
  console.log(`    ${(fb * 100).toFixed(0).padStart(3)}% of the bits buys floor ${String(v).padStart(3)} = ${(fg * 100).toFixed(1).padStart(5)}% of the gap   ${fg > fb ? 'ABOVE' : 'AT OR BELOW'} the diagonal`);
}

// ============================================================================
console.log('\nSEC 4. @13 — the TOP of the forcing ladder, which is the affordable end');
// ============================================================================
// The task's instruction: do NOT attempt the full @13 exact adversarial
// minimum (parked at an estimated 2e10-5e10 nodes, 1.5-4 days). The
// CONDITIONED problem gets cheaper as j RISES, so the computable end of the
// @13 curve is the top, not the bottom — the opposite end from @11's cheap
// j = 0. That is still the end the shape question needs: it says whether the
// last few primes carry a large share of the 110 -> 307 climb.
const L13 = buildLevel(13);
const S13 = makeSolver(L13);
const n13 = L13.scour.length;
console.log(`  @13: W = ${L13.W}, comb N = ${L13.N}, scour = ${n13} primes [${L13.scour[0]}..${L13.scour[n13 - 1]}]`);
check('@13 level rebuild: N = 990 and 34 scour primes', L13.N === 990 && n13 === 34);
const anch13 = march(L13, new Array(n13).fill(0));
check(`@13 anchored survivors = ${anch13.survivors} = truth 307 [STC]`, anch13.survivors === CITED.truth13);
const BITS13 = L13.scour.map(q => Math.log2(q));
const TOT13 = BITS13.reduce((a, b) => a + b, 0);
console.log(`  full anchoring @13 costs I_max = ${TOT13.toFixed(3)} bits over ${n13} primes.`);
// Node budget chosen so the whole run stays a few minutes: the @13 engine
// carries 31-word bitsets, and the descent's cost roughly triples per rung
// once j drops below ~20. The budget is a REPORTING limit, never a bound on
// anything claimed: a rung that trips is printed NOT COMPLETED and the
// descent stops there.
const NODE13 = 8e5;
console.log(`  prefix minima from the top down, node budget ${NODE13.toExponential(0)} each; the run stops at the first trip.`);
console.log('    j   anchored prefix                     advmin_j   bits spent  frac I_max   nodes');
const lad13 = new Array(n13 + 1).fill(null);
let firstTrip = null;
for (let j = n13; j >= 0; j--) {
  const set = new Set(); for (let t = 0; t < j; t++) set.add(t);
  const r = S13.minWithAnchored(set, NODE13);
  let bits = 0; for (let t = 0; t < j; t++) bits += BITS13[t];
  if (r.minSurv === null) {
    console.log(`    ${String(j).padStart(2)}   first ${j} primes anchored`.padEnd(42) + `NOT COMPLETED at ${r.nodes} nodes — stopping the descent`);
    firstTrip = j; break;
  }
  lad13[j] = r.minSurv;
  console.log(`    ${String(j).padStart(2)}   first ${j} primes anchored`.padEnd(42) + `${String(r.minSurv).padStart(6)}   ${bits.toFixed(2).padStart(8)}    ${(bits / TOT13).toFixed(4)}     ${r.nodes}`);
}
const done13 = lad13.map((v, j) => v === null ? null : j).filter(j => j !== null);
if (done13.length) {
  const jmin = Math.min(...done13);
  let bmin = 0; for (let t = 0; t < jmin; t++) bmin += BITS13[t];
  console.log(`  @13 computed range: j = ${jmin}..${n13}, floors ${lad13.slice(jmin).join(' -> ')}`);
  console.log(`  at j = ${jmin} the certificate has been handed ${bmin.toFixed(2)} of ${TOT13.toFixed(2)} bits (${(100 * bmin / TOT13).toFixed(1)}%)`);
  console.log(`  and stands at ${lad13[jmin]} of the truth ${CITED.truth13}; the staircase floor without any class information is ${CITED.floor13} [STC].`);
  const gapCovered = (lad13[jmin] - CITED.floor13) / (CITED.truth13 - CITED.floor13);
  console.log(`  fraction of the published floor-to-truth gap standing at that point: ${gapCovered.toFixed(4)}`);
  // The @13 shape is INDETERMINATE because the dial's own bottom, advmin@13,
  // is unknown; only the certified bracket [21, 152] [ADV] is available. Both
  // ends are reported and they disagree about concavity, which is the honest
  // reading and the reason no @13 shape verdict is offered.
  console.log('  SHAPE AT @13 IS INDETERMINATE — the dial\'s own bottom is advmin@13, PARKED at [21, 152] [ADV].');
  console.log('   j    bits frac   floor    frac of gap if advmin@13 = 21    if advmin@13 = 152');
  for (let j = n13; j >= jmin; j--) {
    if (lad13[j] === null) continue;
    let b = 0; for (let t = 0; t < j; t++) b += BITS13[t];
    const lo = (lad13[j] - 21) / (CITED.truth13 - 21), hi = (lad13[j] - 152) / (CITED.truth13 - 152);
    if (j % 3 === jmin % 3 || j === n13) console.log(`   ${String(j).padStart(2)}    ${(b / TOT13).toFixed(4)}      ${String(lad13[j]).padStart(3)}          ${lo.toFixed(4)}                     ${hi.toFixed(4)}`);
  }
  console.log('   Read the two right-hand columns against the bits column: the low-bracket end reads');
  console.log('   concave and the high-bracket end reads convex, so the LEVEL of the @13 curve decides nothing.');
  // ...but its SHAPE in the computed range does not need advmin@13. Concavity
  // in j means the increments DECAY as j rises. Test that directly on the
  // computed range, where no unknown enters.
  const inc13 = [];
  for (let j = jmin; j < n13; j++) inc13.push(lad13[j + 1] - lad13[j]);
  const m13 = inc13.reduce((a, b) => a + b, 0) / inc13.length;
  const lowHalf = inc13.slice(0, Math.floor(inc13.length / 2)), hiHalf = inc13.slice(Math.ceil(inc13.length / 2));
  const mLo = lowHalf.reduce((a, b) => a + b, 0) / lowHalf.length, mHi = hiHalf.reduce((a, b) => a + b, 0) / hiHalf.length;
  console.log(`  SHAPE TEST THAT NEEDS NO UNKNOWN: increments over j = ${jmin}..${n13} are ${inc13.join(',')}`);
  console.log(`    mean ${m13.toFixed(2)} survivors per prime; lower-j half ${mLo.toFixed(2)}, upper-j half ${mHi.toFixed(2)}.`);
  console.log(`    A CONCAVE dial decays toward the top (upper-j half much smaller). Measured ratio upper/lower = ${(mHi / mLo).toFixed(3)}.`);
  console.log(`    Compare @11, where the same ratio over the exact envelope's ten increments is ${((incs.slice(5).reduce((a, b) => a + b, 0) / 5) / (incs.slice(0, 5).reduce((a, b) => a + b, 0) / 5)).toFixed(3)}.`);
  check('@13 top prefix is monotone non-decreasing in j', (() => { for (let j = jmin; j < n13; j++) if (lad13[j + 1] < lad13[j]) return false; return true; })());
  check('@13 j = 34 (full anchoring) = truth 307 [STC]', lad13[n13] === CITED.truth13);
} else {
  console.log('  @13: no prefix completed inside budget — nothing reported.');
}
console.log(`  NOT ATTEMPTED, by instruction: advmin@13 exact (j = 0). It stays PARKED at [21, 152] [ADV].`);

// ============================================================================
console.log('\nSEC 5. THE TWO DIALS SIDE BY SIDE, and the circularity test');
// ============================================================================
console.log('  Face 3\'s "history-blind" and this attack\'s "class-blind" are DIFFERENT axes,');
console.log('  and the repo already carries a curve for each. Stated plainly so the report');
console.log('  cannot conflate them:');
console.log(`    CLASS axis (this script, and [UNI] SEC 5): what the cap's conclusion is allowed to`);
console.log(`      read about WHICH residue class each prime strikes. 16 (blind) -> 45 (full).`);
console.log(`      Exact all-or-nothing envelope AUC = ${auc.toFixed(4)}; combined-family AUC = ${auc2.toFixed(4)};`);
console.log(`      exact touch-count ceiling ${envJ.join(',')} — mean ${mean.toFixed(2)} survivors per prime read.`);
console.log(`    DEPTH axis (Face 3's own K, [UNI] SEC 3): how many earlier primes enter the cap as`);
console.log(`      freshness moduli. 36 (K = 0) -> 45 (K = 8) @11; 115 -> 307 (K = 28) @13.`);
console.log(`      AUC = ${aucK11.toFixed(4)} @11, ${aucK13.toFixed(4)} @13 on the rung axis.`);
console.log('  Neither axis is "where the strikes landed" in the sense Face 3 warns about; the');
console.log('  class of a scour prime at the anchor is NOT unknown — it is 0 by definition of the');
console.log('  anchored scour. See the report\'s circularity section.');

// The concrete circularity probe: is the floor gain concentrated on the slots
// cofactor rigidity already protects (the low comb, below the protection
// radius), i.e. on the part of the count the staircase already gets for free?
const R0 = L11.scour[0] * L11.scour[0] - 2;
const lowComb = L11.slots.filter(r => r < R0);
console.log(`\n  CIRCULARITY PROBE — where the bought survivors live. Protection radius ${R0}, low comb ${lowComb.length} slots.`);
function survivorSlots(cls) {
  const struck = new Uint8Array(L11.N);
  for (let i = 0; i < n11; i++) {
    const q = L11.scour[i], a = ((cls[i] % q) + q) % q, b = (a - 2 + q) % q;
    for (let j = 0; j < L11.N; j++) if (!struck[j]) { const rq = L11.slots[j] % q; if (rq === a || rq === b) struck[j] = 1; }
  }
  return L11.slots.filter((r, j) => !struck[j]);
}
const anchSurv = survivorSlots(new Array(n11).fill(0));
const witSurv = survivorSlots(CITED.witness11);
console.log(`    anchored keeps ${anchSurv.length}, of which ${anchSurv.filter(r => r < R0).length} below the radius (of ${lowComb.length} there)`);
console.log(`    witness  keeps ${witSurv.length}, of which ${witSurv.filter(r => r < R0).length} below the radius`);
console.log(`    so the 16 -> 45 gap of ${CITED.truth11 - CITED.advmin11} splits ${anchSurv.filter(r => r < R0).length - witSurv.filter(r => r < R0).length} below the radius and ${(anchSurv.length - anchSurv.filter(r => r < R0).length) - (witSurv.length - witSurv.filter(r => r < R0).length)} above it.`);
console.log('    The part above the radius is the part cofactor rigidity does NOT already hand over.');

if (failures === 0) console.log(`\nALL SELF-TESTS PASS`);
else { console.log(`\n${failures} SELF-TEST FAILURE(S)`); process.exit(1); }

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-history-dial-01.js
//   invocation:  node research/attack-history-dial-01.js
//   code-sha256: a85ad1679382539d6cfaebbe4e01b1fae7fdf55fc0924f9e374f132c4a5ddca7
//   out-sha256:  cce0f6978c18f286c3c95bfe55edd18df3170b712a6ab776f87a5ad1a947f161
//   body-lines:  295
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-26
//   elapsed:     231.4 s
// ============================================================================
// SEC 0. CALIBRATION — nothing below is reported unless all six gates pass
//   @11: W = 2310, comb N = 90, scour = [13,17,19,23,29,31,37,41,43,47] (10 primes)
//   ok    GATE G1a  N = 90
//   ok    GATE G1b  scour = 13..47, ten primes
//   ok    GATE G1c  anchored survivors = 45 = truth 45 [STC]
//   ok    GATE G2   cited adversarial witness replays to 16 = advmin 16 [ADV]
//   ok    GATE G3   engine free-class minimum = 16 = advmin@11 = 16 [ADV] (6836 nodes)
//   ok    GATE G4   forcing ladder reproduced: 16->20->20->22->23->25->30->35->38->42->45
//   ok    GATE G5   single-prime anchorings reproduced 10/10: 20,17,18,17,17,18,18,17,18,17
//      primes {13,17,19} free, rest anchored: exhaustive 32 over 4199 leaves | B&B 32 in 9 nodes  AGREE
//      primes {13,17,19,23} free, rest anchored: exhaustive 28 over 96577 leaves | B&B 28 in 21 nodes  AGREE
//      primes {29,31,37,41} free, rest anchored: exhaustive 29 over 1363783 leaves | B&B 29 in 7 nodes  AGREE
//      primes {37,41,43,47} free, rest anchored: exhaustive 30 over 3065857 leaves | B&B 30 in 6 nodes  AGREE
//   ok    GATE G6   prune-free exhaustive agrees with the B&B on 4 of 4 sub-instances
//   all six gates pass; the engine is the third independent one on advmin@11 = 16.
//
// SEC 1. THE FULL ANCHOR LATTICE @11 — all 1024 subsets, exact minima
//   1024 exact minima computed in 104114 B&B nodes
//   ok    lattice is monotone: adding an anchored prime never lowers the floor
//   ok    lattice endpoints: empty set = 16 [ADV], full set = 45 [STC]
//   ok    lattice agrees with the published forcing ladder on all 11 prefixes
//
//    j  #sets   min  mean   MAX   best set (the j primes that buy the most)   prefix
//    0      1    16  16.00    16   {}                                       16
//    1     10    17  17.70    20   {13}                                     20
//    2     45    17  19.53    22   {13,43}                                  20
//    3    120    19  21.60    24   {17,23,37}                               22
//    4    210    20  24.08    27   {13,17,23,37}                            23
//    5    252    23  26.82    30   {17,19,23,31,37}                         25
//    6    210    25  29.80    34   {13,17,19,23,31,37}                      30
//    7    120    30  33.05    36   {13,17,19,23,31,37,41}                   35
//    8     45    34  36.64    40   {13,17,19,29,31,41,43,47}                38
//    9     10    38  40.60    42   {13,17,19,23,29,31,37,41,43}             42
//   10      1    45  45.00    45   {13,17,19,23,29,31,37,41,43,47}          45
//   BEST-j ENVELOPE: 16 -> 20 -> 22 -> 24 -> 27 -> 30 -> 34 -> 36 -> 40 -> 42 -> 45
//   PREFIX (forcing ladder): 16 -> 20 -> 20 -> 22 -> 23 -> 25 -> 30 -> 35 -> 38 -> 42 -> 45
//   ok    the best-j envelope dominates the prefix chain at every j (it is a max over a superset)
//   envelope minus prefix, summed over j = 0..10: 20 (how much the prefix ordering gives away)
//
//   THE TOUCH-COUNT CEILING [PROVEN, tight]: any revelation naming at most j primes
//   has floor at most envJ[j], because anchoring those j and freeing the rest is a
//   sub-family of it. So envJ is the EXACT ceiling per prime-count, not a lower bound.
//    floor V   minimum number of scour primes any argument must read to certify V
//      >= 17       1 of 10   <- first value above the class-blind ceiling 16 [ADV]
//      >= 21       2 of 10
//      >= 23       3 of 10
//      >= 25       4 of 10
//      >= 28       5 of 10
//      >= 31       6 of 10
//      >= 35       7 of 10   <- first value above the published staircase floor 34 [STC]
//      >= 37       8 of 10
//      >= 41       9 of 10
//      >= 43      10 of 10
//      >= 45      10 of 10   <- the truth
//
//   PER-PRIME PRICE, the shape statement in prime units: envelope increments 4,2,2,3,3,4,2,4,2,3
//     mean 2.90 survivors per prime read, range [2, 4], no downward trend.
//     max deviation of the envelope from the straight line 16 + 2.9j: 1.10 survivors.
//     A concave dial would show large early increments decaying to near zero. It does not.
//
// SEC 2. THE BIT AXIS — cost log2(q) per prime, and the shape of the dial
//   per-prime information cost (bits to name a class mod q):
//    13:3.700  17:4.087  19:4.248  23:4.524  29:4.858  31:4.954  37:5.209  41:5.358  43:5.426  47:5.555
//   full anchoring costs I_max = 47.919 bits; the whole floor gap is 29 survivors.
//   naive linear price: 0.6052 survivors per bit.
//
//   CHEAPEST ALL-OR-NOTHING REVELATION REACHING EACH FLOOR (exact over the 1024):
//    floor  bits   frac of I_max   frac of the 16->45 gap   the anchored set
//      16   0.000   0.0000          0.0000          {}
//      17   3.700   0.0772          0.0345          {13}
//      18   3.700   0.0772          0.0690          {13}
//      19   3.700   0.0772          0.1034          {13}
//      20   3.700   0.0772          0.1379          {13}
//      21   8.558   0.1786          0.1724          {13,29}
//      22   9.127   0.1905          0.2069          {13,43}
//      23  12.646   0.2639          0.2414          {13,17,29}
//      24  13.820   0.2884          0.2759          {17,23,37}
//      25  16.894   0.3525          0.3103          {13,17,19,29}
//      26  17.521   0.3656          0.3448          {13,17,23,37}
//      27  17.521   0.3656          0.3793          {13,17,23,37}
//      28  21.514   0.4490          0.4138          {13,17,19,23,31}
//      29  21.514   0.4490          0.4483          {13,17,19,23,31}
//      30  23.023   0.4804          0.4828          {17,19,23,31,37}
//      31  26.723   0.5577          0.5172          {13,17,19,23,31,37}
//      32  26.723   0.5577          0.5517          {13,17,19,23,31,37}
//      33  26.723   0.5577          0.5862          {13,17,19,23,31,37}
//      34  26.723   0.5577          0.6207          {13,17,19,23,31,37}
//      35  31.581   0.6590          0.6552          {13,17,19,23,29,31,37}
//      36  32.081   0.6695          0.6897          {13,17,19,23,31,37,41}
//      37  36.939   0.7708          0.7241          {13,17,19,23,29,31,37,41}
//      38  36.939   0.7708          0.7586          {13,17,19,23,29,31,37,41}
//      39  38.186   0.7969          0.7931          {13,17,19,29,31,41,43,47}
//      40  38.186   0.7969          0.8276          {13,17,19,29,31,41,43,47}
//      41  42.365   0.8841          0.8621          {13,17,19,23,29,31,37,41,43}
//      42  42.365   0.8841          0.8966          {13,17,19,23,29,31,37,41,43}
//      43  47.919   1.0000          0.9310          {13,17,19,23,29,31,37,41,43,47}
//      44  47.919   1.0000          0.9655          {13,17,19,23,29,31,37,41,43,47}
//      45  47.919   1.0000          1.0000          {13,17,19,23,29,31,37,41,43,47}
//
//   PRE-REGISTERED SHAPE DIAGNOSTICS (concave/front-loaded is the route's hypothesis):
//     to buy  25% of the 16->45 gap costs 13.820 bits =  28.8% of I_max   (linear dial would cost 25.0%)
//     to buy  50% of the 16->45 gap costs 26.723 bits =  55.8% of I_max   (linear dial would cost 50.0%)
//     to buy  75% of the 16->45 gap costs 36.939 bits =  77.1% of I_max   (linear dial would cost 75.0%)
//     to buy  90% of the 16->45 gap costs 47.919 bits = 100.0% of I_max   (linear dial would cost 90.0%)
//     to buy 100% of the 16->45 gap costs 47.919 bits = 100.0% of I_max   (linear dial would cost 100.0%)
//
//   NORMALIZED AREA under the exact all-or-nothing envelope: AUC = 0.4774
//     0.5 = linear dial; > 0.5 = concave (front-loaded, the lemma-shaped case); < 0.5 = convex (back-loaded).
//     VERDICT on the all-or-nothing family: LINEAR to within +-0.05
//   AUC of the published prefix chain on the same bit axis: 0.5184
//   [UNI] the OTHER dial for contrast — unified-cap floor vs freshness depth K, normalized on its own
//         34->45 (@11) and 110->307 (@13) range: AUC = 0.8264 @11 and 0.8524 @13.
//
// SEC 3. THE SUB-PRIME DIAL — partial revelations, exact at one prime
//   f_i(a) table: 300 exact minima in 710238 nodes
//   ok    f_i(0) = the published single-prime anchoring, 10/10 [UNI]
//   ok    min_a f_i(a) = advmin@11 = 16 at every prime (the free adversary pins somewhere)
//
//    q   f(0)=anchor   max_a f   argmax classes        full row f_i(a), a = 0..q-1
//   13      20          21     {11}                  [20,17,18,18,18,18,18,18,17,20,16,21,16]
//   17      17          18     {5,10,16}             [17,17,17,16,16,18,17,17,17,17,18,16,16,17,17,17,18]
//   19      18          19     {1,3,8,10,15}         [18,19,17,19,17,18,18,17,19,17,19,18,16,17,16,19,16,17,16]
//   23      17          20     {5}                   [17,18,18,19,19,20,19,19,18,18,17,17,17,17,18,16,17,17,16,18,17,17,17]
//   29      17          19     {3,16}                [17,18,18,19,17,18,18,18,18,17,17,18,18,18,18,17,19,18,18,17,17,18,16,18,16,18,16,18,17]
//   31      18          20     {21,26}               [18,19,18,19,17,17,17,18,18,18,17,17,17,19,18,19,18,16,19,18,19,20,17,18,18,17,20,19,18,19,16]
//   37      18          19     {1,15,23,30}          [18,19,17,18,17,17,17,17,18,17,17,17,17,18,17,19,18,18,18,16,18,17,18,19,18,18,17,17,18,18,19,18,17,18,16,18,18]
//   41      17          20     {1,7,13,15,17,38,40}  [17,20,19,19,17,19,19,20,19,19,17,19,19,20,17,20,16,20,17,19,18,18,19,19,17,18,16,18,18,16,18,17,19,19,18,18,19,17,20,16,20]
//   43      18          20     {37}                  [18,18,19,16,18,18,17,19,17,19,16,18,17,19,17,18,18,17,19,17,18,16,19,17,19,17,18,18,16,19,18,18,19,17,17,18,17,20,17,18,17,17,19]
//   47      17          18     {2,5,13,15,16,17,18,19,20,21,22,23,24,25,27,29,30,31,32,33,34,35,36,37,38,39,41} [17,17,18,17,17,18,17,17,17,17,17,17,17,18,16,18,18,18,18,18,18,18,18,18,18,18,16,18,16,18,18,18,18,18,18,18,18,18,18,18,16,18,17,17,17,17,17]
//
//   THE CEILING ON ONE PRIME [PROVEN, exact]. A revelation is TRUE information, so 0 must
//   stay admissible: the strongest one-prime revelation is S_i = {0}, and its floor is
//   max over i of f_i(0) = 20 survivors against the truth 45 — 13.8% of the 16->45 gap.
//   (An UNTRUE revelation could do marginally better: max over i,a of f_i(a) = 21, at q = 13 class 11.
//   Knowing where the anchor is NOT is worth as much as knowing where it is; neither is worth much.)
//
//   EXACT SUB-PRIME DIAL AT EACH PRIME (S = {0} + the top |S|-1 classes by f):
//    q   |S|=1        |S|=2        |S|=q/4      |S|=q/2      |S|=q (0 bits)
//   13   20@3.70b    20@2.70b    20@2.12b    18@0.89b    16@0.00b
//   17   17@4.09b    17@3.09b    17@2.09b    17@0.92b    16@0.00b
//   19   18@4.25b    18@3.25b    18@1.93b    17@0.93b    16@0.00b
//   23   17@4.52b    17@3.52b    17@1.94b    17@0.94b    16@0.00b
//   29   17@4.86b    17@3.86b    17@2.05b    17@0.95b    16@0.00b
//   31   18@4.95b    18@3.95b    18@1.95b    18@0.95b    16@0.00b
//   37   18@5.21b    18@4.21b    18@2.04b    18@0.96b    16@0.00b
//   41   17@5.36b    17@4.36b    17@2.04b    17@0.97b    16@0.00b
//   43   18@5.43b    18@4.43b    18@1.97b    18@0.97b    16@0.00b
//   47   17@5.55b    17@4.55b    17@1.97b    17@0.97b    16@0.00b
//
//   SATURATION: bits at which each prime's own dial first reaches its own ceiling f(0):
//     q=13: |S| =  3 of 13 suffices for floor 20 — 2.115 bits, not 3.700
//     q=17: |S| = 13 of 17 suffices for floor 17 — 0.387 bits, not 4.087
//     q=19: |S| =  9 of 19 suffices for floor 18 — 1.078 bits, not 4.248
//     q=23: |S| = 21 of 23 suffices for floor 17 — 0.131 bits, not 4.524
//     q=29: |S| = 26 of 29 suffices for floor 17 — 0.158 bits, not 4.858
//     q=31: |S| = 21 of 31 suffices for floor 18 — 0.562 bits, not 4.954
//     q=37: |S| = 21 of 37 suffices for floor 18 — 0.817 bits, not 5.209
//     q=41: |S| = 37 of 41 suffices for floor 17 — 0.148 bits, not 5.358
//     q=43: |S| = 25 of 43 suffices for floor 18 — 0.782 bits, not 5.426
//     q=47: |S| = 43 of 47 suffices for floor 17 — 0.128 bits, not 5.555
//   Sum of the per-prime saturation costs: 6.307 bits vs I_max 47.919 — a 86.8% discount IF the dial were separable, which it is not (SEC 3b).
//
//   SEC 3b. MULTI-PRIME PARTIAL REVELATIONS (greedy choice, exact floor).
//   Family: at every prime keep class 0 plus the top (ceil(phi*q)-1) classes by f_i.
//   This is a certified LOWER bound on D(B), never the max over all revelations.
//    phi      bits I(R)   frac I_max   floor F(R)   frac of the 16->45 gap
//    1.00      0.000     0.0000        16         0.0000
//    0.90      1.201     0.0251        18         0.0690
//    0.80      2.847     0.0594        20         0.1379
//    0.75      3.800     0.0793        20         0.1379
//    0.60      6.924     0.1445        22         0.2069
//    0.50      9.444     0.1971        23         0.2414
//    0.45     10.974     0.2290        23         0.2414
//    0.40     12.508     0.2610        24         0.2759
//    0.35     14.422     0.3010        26         0.3448
//    0.30     16.558     0.3455        28         0.4138
//    0.25     18.865     0.3937        29         0.4483
//    0.20     21.958     0.4582        29         0.4483
//    0.15     25.906     0.5406        31         0.5172
//    0.12     28.351     0.5916        32         0.5517
//    0.10     30.784     0.6424        32         0.5517
//    0.08     33.165     0.6921        33         0.5862
//    0.05     39.165     0.8173        40         0.8276
//    0.03     43.919     0.9165        42         0.8966
//    0.00     47.919     1.0000        45         1.0000
//   CONTROL — identical bit costs, classes chosen at random (seeded) instead of by f:
//    phi=0.50 at 9.444 bits: random 12 trials min 17, mean 18.50, max 20   | f-greedy 23
//    phi=0.25 at 18.865 bits: random 12 trials min 20, mean 22.83, max 25   | f-greedy 29
//    phi=0.10 at 30.784 bits: random 12 trials min 28, mean 29.58, max 32   | f-greedy 32
//
//   SEC 3c. MIXED FAMILY (best-k subset fully anchored + phi-partial on the rest).
//   77 mixed revelations evaluated exactly
//
//   COMBINED ENVELOPE over all three families (the best certified lower bound on D(B)):
//    bits   frac I_max   floor   frac of the 16->45 gap
//      0.000   0.0000      16     0.0000
//      1.201   0.0251      18     0.0690
//      2.847   0.0594      20     0.1379
//      6.924   0.1445      22     0.2069
//      9.444   0.1971      23     0.2414
//     12.508   0.2610      24     0.2759
//     14.422   0.3010      26     0.3448
//     16.558   0.3455      28     0.4138
//     18.865   0.3937      29     0.4483
//     22.544   0.4705      30     0.4828
//     25.129   0.5244      32     0.5517
//     26.547   0.5540      33     0.5862
//     26.723   0.5577      34     0.6207
//     29.094   0.6071      35     0.6552
//     31.829   0.6642      36     0.6897
//     34.416   0.7182      38     0.7586
//     37.875   0.7904      39     0.7931
//     38.186   0.7969      40     0.8276
//     42.013   0.8767      41     0.8621
//     42.365   0.8841      42     0.8966
//     45.334   0.9461      43     0.9310
//     47.919   1.0000      45     1.0000
//   COMBINED AUC = 0.5091   (0.5 linear, > 0.5 concave/front-loaded, < 0.5 convex)
//   the diagonal test — floor bought at each fraction of I_max, against the linear dial:
//      10% of the bits buys floor  20 =  13.8% of the gap   ABOVE the diagonal
//      25% of the bits buys floor  23 =  24.1% of the gap   AT OR BELOW the diagonal
//      50% of the bits buys floor  30 =  48.3% of the gap   AT OR BELOW the diagonal
//      75% of the bits buys floor  38 =  75.9% of the gap   ABOVE the diagonal
//      90% of the bits buys floor  42 =  89.7% of the gap   AT OR BELOW the diagonal
//
// SEC 4. @13 — the TOP of the forcing ladder, which is the affordable end
//   @13: W = 30030, comb N = 990, scour = 34 primes [17..173]
//   ok    @13 level rebuild: N = 990 and 34 scour primes
//   ok    @13 anchored survivors = 307 = truth 307 [STC]
//   full anchoring @13 costs I_max = 211.753 bits over 34 primes.
//   prefix minima from the top down, node budget 8e+5 each; the run stops at the first trip.
//     j   anchored prefix                     advmin_j   bits spent  frac I_max   nodes
//     34   first 34 primes anchored            307     211.75    1.0000     1
//     33   first 33 primes anchored            300     204.32    0.9649     1
//     32   first 32 primes anchored            291     196.93    0.9300     1
//     31   first 31 primes anchored            285     189.59    0.8953     1
//     30   first 30 primes anchored            278     182.29    0.8609     1
//     29   first 29 primes anchored            272     175.05    0.8267     16
//     28   first 28 primes anchored            265     167.83    0.7926     10
//     27   first 27 primes anchored            259     160.72    0.7590     81
//     26   first 26 primes anchored            255     153.62    0.7255     46
//     25   first 25 primes anchored            246     146.58    0.6922     206
//     24   first 24 primes anchored            238     139.59    0.6592     216
//     23   first 23 primes anchored            229     132.77    0.6270     311
//     22   first 22 primes anchored            225     126.01    0.5951     4046
//     21   first 21 primes anchored            221     119.27    0.5632     21941
//     20   first 20 primes anchored            217     112.58    0.5316     92555
//     19   first 19 primes anchored            213     105.92    0.5002     77421
//     18   first 18 primes anchored            205      99.32    0.4690     271984
//     17   first 17 primes anchored         NOT COMPLETED at 800001 nodes — stopping the descent
//   @13 computed range: j = 18..34, floors 205 -> 213 -> 217 -> 221 -> 225 -> 229 -> 238 -> 246 -> 255 -> 259 -> 265 -> 272 -> 278 -> 285 -> 291 -> 300 -> 307
//   at j = 18 the certificate has been handed 99.32 of 211.75 bits (46.9%)
//   and stands at 205 of the truth 307; the staircase floor without any class information is 110 [STC].
//   fraction of the published floor-to-truth gap standing at that point: 0.4822
//   SHAPE AT @13 IS INDETERMINATE — the dial's own bottom is advmin@13, PARKED at [21, 152] [ADV].
//    j    bits frac   floor    frac of gap if advmin@13 = 21    if advmin@13 = 152
//    34    1.0000      307          1.0000                     1.0000
//    33    0.9649      300          0.9755                     0.9548
//    30    0.8609      278          0.8986                     0.8129
//    27    0.7590      259          0.8322                     0.6903
//    24    0.6592      238          0.7587                     0.5548
//    21    0.5632      221          0.6993                     0.4452
//    18    0.4690      205          0.6434                     0.3419
//    Read the two right-hand columns against the bits column: the low-bracket end reads
//    concave and the high-bracket end reads convex, so the LEVEL of the @13 curve decides nothing.
//   SHAPE TEST THAT NEEDS NO UNKNOWN: increments over j = 18..34 are 8,4,4,4,4,9,8,9,4,6,7,6,7,6,9,7
//     mean 6.38 survivors per prime; lower-j half 6.25, upper-j half 6.50.
//     A CONCAVE dial decays toward the top (upper-j half much smaller). Measured ratio upper/lower = 1.040.
//     Compare @11, where the same ratio over the exact envelope's ten increments is 1.071.
//   ok    @13 top prefix is monotone non-decreasing in j
//   ok    @13 j = 34 (full anchoring) = truth 307 [STC]
//   NOT ATTEMPTED, by instruction: advmin@13 exact (j = 0). It stays PARKED at [21, 152] [ADV].
//
// SEC 5. THE TWO DIALS SIDE BY SIDE, and the circularity test
//   Face 3's "history-blind" and this attack's "class-blind" are DIFFERENT axes,
//   and the repo already carries a curve for each. Stated plainly so the report
//   cannot conflate them:
//     CLASS axis (this script, and [UNI] SEC 5): what the cap's conclusion is allowed to
//       read about WHICH residue class each prime strikes. 16 (blind) -> 45 (full).
//       Exact all-or-nothing envelope AUC = 0.4774; combined-family AUC = 0.5091;
//       exact touch-count ceiling 16,20,22,24,27,30,34,36,40,42,45 — mean 2.90 survivors per prime read.
//     DEPTH axis (Face 3's own K, [UNI] SEC 3): how many earlier primes enter the cap as
//       freshness moduli. 36 (K = 0) -> 45 (K = 8) @11; 115 -> 307 (K = 28) @13.
//       AUC = 0.8264 @11, 0.8524 @13 on the rung axis.
//   Neither axis is "where the strikes landed" in the sense Face 3 warns about; the
//   class of a scour prime at the anchor is NOT unknown — it is 0 by definition of the
//   anchored scour. See the report's circularity section.
//
//   CIRCULARITY PROBE — where the bought survivors live. Protection radius 167, low comb 6 slots.
//     anchored keeps 45, of which 4 below the radius (of 6 there)
//     witness  keeps 16, of which 1 below the radius
//     so the 16 -> 45 gap of 29 splits 3 below the radius and 26 above it.
//     The part above the radius is the part cofactor rigidity does NOT already hand over.
//
// ALL SELF-TESTS PASS
// ============================================================================
// READINGS
// ============================================================================
// (Written after the run; every figure quoted here appears in the OUTPUT
// block above. Legend: [PROVEN] derived; [VERIFIED] checked here;
// [MEASURED] empirical, finite range; [CITED] quoted from an embedded
// artifact per the standing compute rule.)
//
// The full readings live in research/history/staging/attack-history-dial.md.
// The four that decide the attack, in the order the house asks for them
// (disconfirming first):
//
// 1. DELIVERABLE (1) IS NOT NEW. The exact floor-vs-anchored-prefix curve at
//    @11 already exists as canonical state — the forcing ladder,
//    16 -> 20 -> 20 -> 22 -> 23 -> 25 -> 30 -> 35 -> 38 -> 42 -> 45, in attack-anchored-01-unify.js SEC 5
//    and G2-STATE §5a. GATE G4 reproduces all eleven entries on a third,
//    independently written engine (bitset B&B, different branching, prune-free
//    exhaustive cross-check on 4 sub-instances up to 3065857 leaves), and GATE
//    G3 reads 16 at j = 0 as the brief requires. That is a verification, not
//    a measurement, and it is recorded as one.
//
// 2. THE SHAPE IS LINEAR, WHICH IS THE FALSIFIER PRE-REGISTERED IN THE
//    HEADER. The exact best-j envelope over all 1024 anchor sets is
//    16,20,22,24,27,30,34,36,40,42,45: increments 4,2,2,3,3,4,2,4,2,3, mean
//    2.90 survivors per prime read, no downward trend, and the envelope never
//    leaves the straight line 16 + 2.9j by more than 1.10 survivors on a
//    29-survivor range. On the bit axis the exact all-or-nothing AUC is
//    0.4774 and the combined three-family AUC is 0.5091 against 0.5 for a
//    linear dial. [MEASURED, exact, one level]
//
// 3. THE TOUCH-COUNT CEILING [PROVEN, tight] IS WHAT KILLS THE LEMMA SHAPE.
//    Any argument valid for all classes of the primes it does not name has
//    floor at most envJ[j], j = the number of primes it does name. So three
//    primes' locations cap the certifiable floor at 24 — ten BELOW the
//    published staircase floor 34 — six of ten are needed to reach 34, seven
//    to pass it, and ten to reach the truth 45. One prime's full class buys
//    20, which is 13.8% of the 16 -> 45 gap. This is REFUTED.md row 77's
//    argument at j > 0; row 77 is its j = 0 case.
//
// 4. THE CONCAVE DIAL EXISTS ON THE OTHER AXIS, AND WAS ALREADY JUDGED.
//    Face 3's own axis is freshness DEPTH K, not class knowledge. The
//    unified-cap floor against K [CITED, UNI] has AUC 0.8264 @11 and 0.8524
//    @13 — front-loaded, 8 of the 9 points of 36 -> 45 bought by
//    K = 3 of 10. That curve was measured on 2026-08-20 and its own producer
//    records the reason it is not a route (at full depth capU = fresh: the
//    family degenerates into the march).
// ============================================================================
