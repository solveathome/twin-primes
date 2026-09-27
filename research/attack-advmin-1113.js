'use strict';
// ============================================================================
// ATTACK ADVMIN-11/13 — THE EXACT ADVERSARIAL MINIMUM OF THE SCOUR
// (2026-08-20; prices the joint caps against paper/staircase-note.md Thm 8)
// ============================================================================
//
// QUESTION (Chris). The staircase certifies survivors >= 34 @11 and >= 110 @13
// (paper/staircase-note.md Theorem 8), against anchored truths 45 and 307.
// What is the EXACT minimum of survivors when every scour prime q may choose
// its class pair {a, a-2} mod q freely — the adversarial minimum over ALL
// scour classes? That number prices the joint caps: it is the exact ceiling
// for any bound that quantifies over all class choices, as every history-blind
// per-prime cap family does. staircase floor -> advmin is proof slack that
// joint caps could in principle recover; advmin -> anchored truth is anchored
// structure that NO class-blind bound can ever reach (the anchored march is
// one point of the product space, and the bound must also hold at the
// adversarial point). NOTE: the staircase floor is NOT a lower bound on
// advmin — Cofactor Rigidity is a theorem about the anchored classes {0,-2} —
// so a priori advmin could land on either side of 34/110. That comparison is
// half the point of computing it.
//
// MODEL. Tile @x, W = x#. Natal@5 comb N_x = { r in [0,W) : r = 11 or 17
// (mod 30), r mod p not in {0, p-2} for 7 <= p <= x }; |N| = 90 @11, 990 @13.
// Scour primes q in (x, sqrt(W)]: 10 @11 (13..47), 34 @13 (17..173). The
// adversary picks a_q in Z/q per prime; q strikes slot r iff r = a_q or
// a_q - 2 (mod q). survivors(a) = #slots struck by no q. advmin = min over
// the full product space: 266,186,053,068,611 choices @11, ~5.5e63 @13
// (BigInt throughout for these). The anchored march is the single point
// a_q = 0 for all q; the GLOSSARY's rotation ensemble is the diagonal
// a_q = t mod q, W points; this space is the whole product.
//
// METHOD. Equivalent max-coverage form: maximize #struck slots. Branch and
// bound with a PROVEN pruning bound and no monotonicity assumption anywhere
// (greedy feasibility is NOT monotone in the target — that exact mistake
// fired twice in this repo, incl. two-class-lower-bounds.js's maxM; nothing
// below assumes it):
//   PRUNE (union bound, proven): from a node with uncovered set U, every
//   remaining prime contributes one class, and that class's fresh coverage
//   on any descendant U' (a subset of U) is <= max_a |K_q(a) ∩ U|. So
//   additional coverage <= sum over remaining primes of that max. Cut when
//   covered + sum cannot STRICTLY beat the incumbent. The incumbent is only
//   ever replaced by an actually evaluated leaf.
//   BRANCH: on the remaining prime with the largest current max; classes in
//   descending fresh-coverage order; the sorted early-break uses the same
//   proven bound with the parent's maxes (valid: maxes only shrink down).
//   CHILD DEDUP (proven state identity, not a heuristic): two classes of the
//   branching prime with the SAME fresh set K ∩ U produce byte-identical
//   engine states (covered flags, counts, uSize are functions of which slots
//   got newly covered), hence identical subtree minima — one representative
//   per distinct fresh set is tried, keyed by the exact slot list, never by
//   a lossy hash. Zero-coverage classes are the empty-set case of this rule.
//   DUAL-WEIGHT BOUND (second proven prune, used as min with the union bound).
//   Fix any integer weights 0 <= p_s <= D on the slots, set mu_s = D - p_s and
//   lambda_i = max_a sum_{s in K_i(a) ∩ U0} p_s over prime i's classes, all
//   computed exactly in integers at the search root U0. PROOF that for every
//   node with uncovered set U ⊆ U0 and remaining prime set R, the additional
//   coverage C (slots of U newly covered by any completion of R) obeys
//   |C| <= (sum_{i in R} lambda_i + sum_{s in U} mu_s) / D:
//     D·|C| = sum_{s in C} (p_s + mu_s)
//           <= sum_{i in R} sum_{s in K_i(a_i) ∩ C} p_s  +  sum_{s in U} mu_s
//              (each s in C lies in at least one chosen class, p, mu >= 0)
//           <= sum_{i in R} lambda_i + sum_{s in U} mu_s
//              (K ∩ C ⊆ K ∩ U0 and lambda_i is the max over i's classes).
//   Elementary and exact — integer arithmetic throughout, no epsilon, no LP
//   solver trusted. The weights p are TUNED by subgradient descent (heuristic,
//   affects only tightness, never validity: lambda is recomputed exactly from
//   the final rounded p). mu-sums over U are maintained incrementally on the
//   cover trail.
//   HEAD-k MODE: only the first k primes (ascending q) are branched; the tail
//   stays union-bounded, so the leaf value |U| - sum_tail max_a|K_q(a) ∩ U|
//   is a PROVEN lower bound on survivors for EVERY completion of that head
//   choice, and the exact min of the leaf value over all head choices is a
//   certified lower bound on advmin. k = all primes (empty tail) is the exact
//   answer. One engine, two uses; the exact runs quote only the empty-tail
//   form.
//
// HONEST DOUBT, up front. (1) The engine must be CALIBRATED before @11/@13
// are trusted: a prune-free exhaustive enumerator (independent code path,
// plain bitset unions, no counts machinery) runs @7 full (143 assignments),
// @11 head-4 (96,577) and @11 head-6 (86,822,723), and the run ABORTS unless
// branch-and-bound agrees EXACTLY on all three. (2) Every optimum is
// re-verified from scratch: the witness assignment is replayed by a direct
// residue test over the whole comb, independent of the incremental state.
// (3) The @13 full tree might still be unaffordable; head-k ladders price it
// first, and a tripped node budget prints NOT COMPLETED rather than a number.
// (4) All counts that could exceed 2^53 (search-space sizes) are BigInt; node
// counters are Numbers asserted < 2^53. No 32-bit shifts touch any count.
//
// Usage: node research/attack-advmin-1113.js [--phase=cal|at11|at13|all]
//        [--head13=8,12,16] [--full13] [--budget=N] [--restarts=N]
// ============================================================================

// ---------------------------------------------------------------- utilities
function primesUpTo(n) {
  const s = new Uint8Array(n + 1), P = [];
  for (let i = 2; i <= n; i++) { if (!s[i]) { P.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } }
  return P;
}
// mulberry32 — standard 32-bit PRNG; randomness here only affects incumbent
// quality (a better or worse starting bound), never correctness.
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const popc32 = (v) => { v -= (v >>> 1) & 0x55555555; v = (v & 0x33333333) + ((v >>> 2) & 0x33333333); return (Math.imul((v + (v >>> 4)) & 0x0f0f0f0f, 0x01010101) >>> 24); };

// ---------------------------------------------------------------- the level
function buildLevel(x) {
  const wheel = primesUpTo(x);
  let W = 1; for (const p of wheel) W *= p;
  const scour = primesUpTo(Math.floor(Math.sqrt(W)) + 2).filter(q => q > x && q * q <= W);
  const slots = [];
  for (let r = 0; r < W; r++) {
    const m = r % 30; if (m !== 11 && m !== 17) continue;
    let ok = true;
    for (const p of wheel) { if (p < 7) continue; const rp = r % p; if (rp === 0 || rp === p - 2) { ok = false; break; } }
    if (ok) slots.push(r);
  }
  let space = 1n; for (const q of scour) space *= BigInt(q);
  return { x, W, wheel, scour, slots, space };
}
function anchoredSurvivors(level) {
  let s = 0;
  for (const r of level.slots) {
    let alive = true;
    for (const q of level.scour) { const rq = r % q; if (rq === 0 || rq === q - 2) { alive = false; break; } }
    if (alive) s++;
  }
  return s;
}

// ------------------------------------------------------------- the instance
// branchQ: primes the search assigns; tailQ: primes held at the union bound.
function makeInstance(level, branchQ, tailQ) {
  const n = level.slots.length;
  const all = branchQ.concat(tailQ), P = all.length;
  const off = new Int32Array(P + 1);
  for (let i = 0; i < P; i++) off[i + 1] = off[i] + all[i];
  const total = off[P];
  const cnt0 = new Int32Array(total);
  const slotInc = new Int32Array(n * 2 * P);
  for (let s = 0; s < n; s++) {
    const r = level.slots[s];
    for (let i = 0; i < P; i++) {
      const q = all[i], a1 = r % q, a2 = (r + 2) % q; // distinct since q > 2
      slotInc[s * 2 * P + 2 * i] = off[i] + a1;
      slotInc[s * 2 * P + 2 * i + 1] = off[i] + a2;
      cnt0[off[i] + a1]++; cnt0[off[i] + a2]++;
    }
  }
  const classSlots = new Array(total);
  { const fill = new Int32Array(total);
    for (let g = 0; g < total; g++) classSlots[g] = new Int32Array(cnt0[g]);
    for (let s = 0; s < n; s++) for (let j = 0; j < 2 * P; j++) {
      const g = slotInc[s * 2 * P + j]; classSlots[g][fill[g]++] = s;
    } }
  return { level, n, all, P, nBranch: branchQ.length, off, cnt0, slotInc, classSlots };
}

// ------------------------------------------- exhaustive enumerator (control)
// Independent code path: plain bitset unions, no counts, no pruning of any
// kind. Full product over the first k primes of the instance's branch list.
function enumerateExact(level, branchQ) {
  const n = level.slots.length, words = (n + 31) >> 5;
  const k = branchQ.length;
  const bits = branchQ.map(q => {
    const b = new Uint32Array(q * words);
    for (let s = 0; s < n; s++) {
      const r = level.slots[s], a1 = r % q, a2 = (r + 2) % q;
      b[a1 * words + (s >> 5)] |= (1 << (s & 31));
      b[a2 * words + (s >> 5)] |= (1 << (s & 31));
    }
    return b;
  });
  const cover = []; for (let d = 0; d <= k; d++) cover.push(new Uint32Array(words));
  let best = Infinity; let argmin = 0n; let leaves = 0n;
  const t0 = Date.now(); let lastP = t0;
  (function rec(d) {
    if (d === k) {
      leaves++;
      let c = 0; const cw = cover[k];
      for (let w = 0; w < words; w++) c += popc32(cw[w]);
      const surv = n - c;
      if (surv < best) { best = surv; argmin = 1n; } else if (surv === best) argmin++;
      if ((leaves & 0xFFFFFn) === 0n) { const now = Date.now(); if (now - lastP > 30000) { lastP = now; process.stderr.write(`  [enum] leaves=${leaves} best=${best}\n`); } }
      return;
    }
    const q = branchQ[d], b = bits[d], src = cover[d], dst = cover[d + 1];
    for (let a = 0; a < q; a++) {
      const o = a * words;
      for (let w = 0; w < words; w++) dst[w] = src[w] | b[o + w];
      rec(d + 1);
    }
  })(0);
  let expect = 1n; for (const q of branchQ) expect *= BigInt(q);
  if (leaves !== expect) throw new Error(`enumerator leaf count ${leaves} != product ${expect}`);
  return { best, argmin, leaves };
}

// --------------------------------------------------------- branch and bound
function solve(inst, opts = {}) {
  const { n, P, nBranch, off, all, slotInc, classSlots } = inst;
  const restarts = opts.restarts ?? 64;
  const budget = opts.budget ?? Infinity;
  const covered = new Uint8Array(n);
  const cnt = Int32Array.from(inst.cnt0);
  const trail = new Int32Array(n);
  let trailTop = 0, uSize = n;
  const twoP = 2 * P;
  const primeOf = new Int32Array(off[P]);
  for (let i = 0; i < P; i++) for (let g = off[i]; g < off[i + 1]; g++) primeOf[g] = i;
  // cachedMax invariant: dirty[i]=0 -> exact; dirty[i]=1 -> cachedMax[i] >= true max
  const cachedMax = new Int32Array(P), dirty = new Uint8Array(P).fill(1);

  function apply(i, a) {
    const list = classSlots[off[i] + a], prev = trailTop;
    for (let j = 0; j < list.length; j++) {
      const s = list[j];
      if (!covered[s]) {
        covered[s] = 1; trail[trailTop++] = s; uSize--; muSumU -= muInt[s];
        const base = s * twoP;
        for (let t = 0; t < twoP; t++) {
          const g = slotInc[base + t]; cnt[g]--;
          const pi = primeOf[g];
          if (!dirty[pi] && cnt[g] + 1 === cachedMax[pi]) dirty[pi] = 1;
        }
      }
    }
    return prev;
  }
  function undo(prev) {
    while (trailTop > prev) {
      const s = trail[--trailTop]; covered[s] = 0; uSize++; muSumU += muInt[s];
      const base = s * twoP;
      for (let t = 0; t < twoP; t++) {
        const g = slotInc[base + t]; cnt[g]++;
        const pi = primeOf[g];
        if (cnt[g] > cachedMax[pi]) { cachedMax[pi] = cnt[g]; dirty[pi] = 0; }
        else if (dirty[pi] && cnt[g] === cachedMax[pi]) dirty[pi] = 0;
      }
    }
  }
  function maxOf(i) {
    if (dirty[i]) {
      let m = 0; const a0 = off[i], a1 = off[i + 1];
      for (let g = a0; g < a1; g++) if (cnt[g] > m) m = cnt[g];
      cachedMax[i] = m; dirty[i] = 0;
    }
    return cachedMax[i];
  }
  function argmaxOf(i) {
    let m = -1, arg = 0; const a0 = off[i], a1 = off[i + 1];
    for (let g = a0; g < a1; g++) if (cnt[g] > m) { m = cnt[g]; arg = g - a0; }
    return arg;
  }
  function tailSum() {
    let s = 0; for (let i = nBranch; i < P; i++) s += maxOf(i);
    return s;
  }

  // ---- dual weights (see header proof). D scales to integers; p tuned by
  // subgradient (tightness only), lambda recomputed exactly from final p.
  const D = 1 << 20;
  const pW = new Float64Array(n).fill(D);
  {
    const iters = opts.dualIters ?? 400;
    const grad = new Float64Array(n);
    let bestG = Infinity; const bestP = new Float64Array(n).fill(D);
    for (let it = 0; it < iters; it++) {
      grad.fill(-1); // d/dp of sum_s (D - p_s)
      let g = 0;
      for (let i = 0; i < P; i++) {
        let bm = -Infinity, ba = 0;
        for (let a = 0; a < all[i]; a++) {
          const list = classSlots[off[i] + a];
          let s0 = 0;
          for (let j = 0; j < list.length; j++) s0 += pW[list[j]];
          if (s0 > bm) { bm = s0; ba = a; }
        }
        g += bm;
        const list = classSlots[off[i] + ba];
        for (let j = 0; j < list.length; j++) grad[list[j]] += 1;
      }
      for (let s = 0; s < n; s++) g += D - pW[s];
      if (g < bestG) { bestG = g; bestP.set(pW); }
      const eta = D / (8 + it);
      for (let s = 0; s < n; s++) {
        let v = pW[s] - eta * grad[s];
        pW[s] = v < 0 ? 0 : (v > D ? D : v);
      }
    }
    pW.set(bestP);
  }
  const pInt = new Int32Array(n), muInt = new Int32Array(n);
  for (let s = 0; s < n; s++) { pInt[s] = Math.round(pW[s]); muInt[s] = D - pInt[s]; }
  const lambda = new Float64Array(P); // exact integers, < 2^53 by far
  for (let i = 0; i < P; i++) {
    let m = 0;
    for (let a = 0; a < all[i]; a++) {
      const list = classSlots[off[i] + a];
      let s0 = 0;
      for (let j = 0; j < list.length; j++) s0 += pInt[list[j]];
      if (s0 > m) m = s0;
    }
    lambda[i] = m;
  }
  let muSumU = 0; for (let s = 0; s < n; s++) muSumU += muInt[s];
  let lamBranch = 0; for (let i = 0; i < nBranch; i++) lamBranch += lambda[i];
  let lamTail = 0; for (let i = nBranch; i < P; i++) lamTail += lambda[i];
  const rootUnion = (() => { let s = 0; for (let i = 0; i < P; i++) s += maxOf(i); return s; })();
  const rootDual = Math.floor((lamBranch + lamTail + muSumU) / D);
  if (opts.verboseBounds) console.log(`    root coverage bounds: union ${rootUnion}, dual ${rootDual}, |N| ${n}`);

  const chosen = new Int32Array(nBranch).fill(-1);
  const bestChosen = new Int32Array(nBranch).fill(-1);
  let bestF = Infinity, nodes = 0, aborted = false, leafFound = false;
  const active = new Uint8Array(nBranch).fill(1);
  // shard mode: pre-assign classes before any search; the shard's result is
  // exact for the sub-space with those classes fixed, and the min over all
  // shards of a prime equals the unrestricted exact minimum.
  let lamPre = 0;
  if (opts.preassign) for (const [pi, pa] of opts.preassign) {
    apply(pi, pa); active[pi] = 0; chosen[pi] = pa; lamPre += lambda[pi];
  }

  function recordLeaf() {
    const f = uSize - tailSum();
    if (f < bestF) {
      bestF = f; leafFound = true;
      for (let i = 0; i < nBranch; i++) bestChosen[i] = chosen[i] >= 0 ? chosen[i] : argmaxOf(i);
    }
    return f;
  }

  // ---- incumbent: greedy + randomized restarts (value correctness is
  // guaranteed by recordLeaf evaluating the actual state; rng only steers).
  function greedyOnce(rng) {
    const mark = trailTop, savedChosen = Int32Array.from(chosen);
    const done = new Uint8Array(nBranch);
    for (let step = 0; step < nBranch; step++) {
      let bi = -1, bm = -1;
      for (let i = 0; i < nBranch; i++) if (!done[i] && active[i]) {
        const m = maxOf(i);
        if (m > bm || (m === bm && rng && rng() < 0.5)) { bm = m; bi = i; }
      }
      if (bi < 0) break;
      let a;
      if (!rng || bm === 0) a = argmaxOf(bi);
      else { // pick among classes within 2 of the max, uniformly
        const cands = []; const a0 = off[bi];
        for (let g = a0; g < off[bi + 1]; g++) if (cnt[g] >= bm - 2) cands.push(g - a0);
        a = cands[Math.floor(rng() * cands.length)];
      }
      chosen[bi] = a; done[bi] = 1; apply(bi, a);
    }
    recordLeaf();
    undo(mark); chosen.set(savedChosen);
  }
  if (opts.bar === undefined) {
    greedyOnce(null);
    for (let r = 1; r <= restarts; r++) greedyOnce(mulberry32(r));
    if (opts.incumbent && opts.incumbent.f < bestF) {
      bestF = opts.incumbent.f;               // externally VERIFIED leaf value
      bestChosen.set(opts.incumbent.witness);
    }
  }
  // BAR MODE: preset bestF to a hypothetical bar B (no witness). The search
  // then enumerates exactly the assignments with value < B (pruning still
  // uses only the two proven bounds), so COMPLETING with no leaf found is a
  // PROOF that the minimum is >= B; finding a leaf refutes the bar and hands
  // back a verified witness. leafFound distinguishes the two outcomes.
  if (opts.bar !== undefined) { bestF = opts.bar; leafFound = false; }
  const seedF = bestF;

  // ---- the search
  const t0 = Date.now(); let lastP = t0;
  let lamActive = lamBranch - lamPre;
  const MAXQ = all.reduce((x, y) => Math.max(x, y), 0);
  // WIDTH GUARD (2026-08-21). `keys` packs the fresh-coverage count c and the
  // residue class a into one Int32Array element and recovers them by shifting.
  // The pack width used to be the literal 12 bits (`(c << 12) | a`, read back as
  // `key & 4095`), which is a constant that was never derived from the instance:
  // a is a residue mod the scour prime q, so the field holds only q <= 4096. That
  // is comfortable at @11 (max q = 43) and @13 (max q = 199), the two levels this
  // script has ever been run at, and it FIRES AT @23, where the largest scour
  // prime is 14929 — three and a half times the field. Past the edge a and c
  // overlap silently, the branch-and-bound would explore the wrong classes, and
  // every node/leaf COUNT identity in this file would still pass, exactly as the
  // count identities did through the 2026-08-21 la/lb alias. AW is now derived
  // from MAXQ so the field always fits the instance, and both halves are checked
  // against the int32 the container actually holds. Storage-only: the pack is an
  // internal sort key, the recovered (c, a) pair is unchanged, and the ordering
  // (c ascending, then a) is unchanged, so no figure moves.
  const AW = Math.max(1, 32 - Math.clz32(Math.max(1, MAXQ - 1)));  // bits to hold a in 0..MAXQ-1
  if (n * 2 ** AW + MAXQ >= 2 ** 31)
    throw new Error(`advmin: the (c,a) sort key needs ${AW} bits for a class mod ${MAXQ} `
      + `plus a count up to ${n}, which overflows the Int32Array keys buffer at level ${inst.level}`);
  const AMASK = 2 ** AW - 1;
  const keyBuf = [], muBuf = [];
  for (let d = 0; d <= nBranch; d++) { keyBuf.push(new Int32Array(MAXQ)); muBuf.push(new Int32Array(MAXQ)); }
  function rec(depth) {
    if (aborted) return;
    nodes++;
    if ((nodes & 0xFFFFF) === 0) {
      if (nodes > budget) { aborted = true; return; }
      if (nodes >= 9e15) throw new Error('node counter nearing 2^53');
      const now = Date.now();
      if (now - lastP > 30000) { lastP = now; process.stderr.write(`  [bb] nodes=${nodes} bestF=${bestF} uSize=${uSize} depth=${depth}\n`); }
    }
    let sumMax = 0, bi = -1, bm = -1;
    for (let i = 0; i < nBranch; i++) if (active[i]) {
      const m = maxOf(i); sumMax += m;
      if (m > bm) { bm = m; bi = i; }
    }
    const ts = tailSum();
    if (bi < 0 || bm === 0) { recordLeaf(); return; }
    // PROVEN prune: additional branch coverage <= min(union, dual) — both
    // bounds proven in the header; min of two valid bounds is valid.
    const dualAdd = Math.floor((lamActive + muSumU) / D);
    const add = sumMax < dualAdd ? sumMax : dualAdd;
    if (uSize - add - ts >= bestF) return;
    const others = sumMax - bm;
    // children of bi: one representative per distinct fresh set (proven state
    // identity), filtered by per-child union and dual bounds, iterated in
    // descending fresh coverage.
    const a0 = off[bi], q = all[bi];
    const keys = keyBuf[depth], muByA = muBuf[depth];
    const lamRest = lamActive - lambda[bi];
    let m = 0;
    const seen = new Set();
    for (let a = 0; a < q; a++) {
      const c = cnt[a0 + a];
      if (uSize - c - others - ts >= bestF) continue;    // per-child union cut
      let fmu = 0;
      if (c <= 8) {
        // small fresh sets: exact dedup (proven state identity) + exact fmu.
        // For larger sets the walk is skipped: dedup is an optimization only,
        // and fmu = 0 just weakens a valid bound — soundness is unaffected.
        const list = classSlots[a0 + a];
        let sig = '';
        for (let j = 0; j < list.length; j++) { const s = list[j]; if (!covered[s]) { sig += s + ','; fmu += muInt[s]; } }
        if (seen.has(sig)) continue;
        seen.add(sig);
      }
      const childDual = Math.floor((lamRest + muSumU - fmu) / D);
      const addC = others < childDual ? others : childDual;
      if (uSize - c - addC - ts >= bestF) continue;      // per-child dual cut
      muByA[a] = fmu;
      keys[m++] = c * 2 ** AW + a;                        // exact pack, AW derived from MAXQ above
    }
    const sorted = keys.subarray(0, m).sort();            // ascending; walk backwards
    active[bi] = 0; lamActive = lamRest;
    for (let idx = m - 1; idx >= 0; idx--) {
      const key = sorted[idx], a = key & AMASK, c = (key - a) / 2 ** AW;
      if (uSize - c - others - ts >= bestF) break;        // sorted early-break (union)
      const childDual = Math.floor((lamRest + muSumU - muByA[a]) / D);
      const addC = others < childDual ? others : childDual;
      if (uSize - c - addC - ts >= bestF) continue;       // dual re-check vs current bestF
      chosen[bi] = a;
      const mk = apply(bi, a);
      rec(depth + 1);
      undo(mk);
      if (aborted) break;
    }
    lamActive = lamRest + lambda[bi]; active[bi] = 1; chosen[bi] = -1;
  }
  rec(0);
  return { bestF, witness: Array.from(bestChosen), nodes, aborted, seedF, leafFound };
}

// -------------------------------------------- construction search (upper bd)
// Multi-start coordinate ascent on FULL assignments (every scour prime gets a
// class): minimizes actual survivors. Pure heuristic for finding strong
// incumbents/constructions — every result is re-verified by verifyWitness
// before it is trusted, so correctness never rests on this code.
function ascentConstruct(level, primesQ, opts = {}) {
  const n = level.slots.length, K = primesQ.length;
  const restarts = opts.restarts ?? 400, seed0 = opts.seed ?? 1;
  // class slot lists per prime
  const lists = primesQ.map(q => {
    const L = Array.from({ length: q }, () => []);
    for (let s = 0; s < n; s++) { const r = level.slots[s]; L[r % q].push(s); L[(r + 2) % q].push(s); }
    return L.map(a => Int32Array.from(a));
  });
  const hits = new Int32Array(n);
  const asg = new Int32Array(K);
  let bestSurv = Infinity, bestAsg = null;
  for (let rs = 0; rs < restarts; rs++) {
    const rng = mulberry32(seed0 + rs);
    hits.fill(0); let surv = n;
    for (let i = 0; i < K; i++) {
      // greedy-random init: uniform among classes within 2 of the best fresh
      // coverage (rng only diversifies restarts; correctness is downstream)
      const q = primesQ[i]; let bc = -1;
      const cs = new Int32Array(q);
      for (let a = 0; a < q; a++) {
        let c = 0; const L = lists[i][a];
        for (let j = 0; j < L.length; j++) if (hits[L[j]] === 0) c++;
        cs[a] = c; if (c > bc) bc = c;
      }
      const cands = [];
      for (let a = 0; a < q; a++) if (cs[a] >= bc - 2) cands.push(a);
      const ba = cands[Math.floor(rng() * cands.length)];
      asg[i] = ba;
      const L = lists[i][ba];
      for (let j = 0; j < L.length; j++) { if (hits[L[j]] === 0) surv--; hits[L[j]]++; }
    }
    // coordinate ascent to a local optimum
    let improved = true;
    while (improved) {
      improved = false;
      for (let i = 0; i < K; i++) {
        const q = primesQ[i], cur = asg[i], Lc = lists[i][cur];
        for (let j = 0; j < Lc.length; j++) { hits[Lc[j]]--; if (hits[Lc[j]] === 0) surv++; }
        let bc = -1, ba = cur;
        for (let a = 0; a < q; a++) {
          let c = 0; const L = lists[i][a];
          for (let j = 0; j < L.length; j++) if (hits[L[j]] === 0) c++;
          if (c > bc) { bc = c; ba = a; }
        }
        if (ba !== cur) improved = true;
        asg[i] = ba;
        const L = lists[i][ba];
        for (let j = 0; j < L.length; j++) { if (hits[L[j]] === 0) surv--; hits[L[j]]++; }
      }
    }
    if (surv < bestSurv) { bestSurv = surv; bestAsg = Int32Array.from(asg); }
  }
  return { survivors: bestSurv, witness: Array.from(bestAsg) };
}

// ------------------------------------------------- independent verification
// Replays a witness by direct residue tests over the whole comb — shares no
// state with the incremental engine.
function verifyWitness(level, branchQ, tailQ, witness) {
  const U = [];
  for (const r of level.slots) {
    let struck = false;
    for (let i = 0; i < branchQ.length; i++) {
      const q = branchQ[i], a = witness[i];
      if (r % q === a || (r + 2) % q === a) { struck = true; break; }
    }
    if (!struck) U.push(r);
  }
  let ts = 0;
  for (const q of tailQ) {
    const c = new Int32Array(q);
    for (const r of U) { c[r % q]++; c[(r + 2) % q]++; }
    let m = 0; for (let a = 0; a < q; a++) if (c[a] > m) m = c[a];
    ts += m;
  }
  return { survivors: U.length, tailAllowance: ts, f: U.length - ts };
}

// ============================================================================
// PHASES
// ============================================================================
const args = process.argv.slice(2);
const getArg = (name, dflt) => {
  const hit = args.find(a => a.startsWith(`--${name}=`));
  return hit ? hit.split('=')[1] : dflt;
};
const phase = getArg('phase', 'all');
const restarts = parseInt(getArg('restarts', '64'), 10);
const ascentR = parseInt(getArg('ascentR', '2000'), 10);
const budget = getArg('budget', null) ? parseInt(getArg('budget', ''), 10) : Infinity;
const head13 = getArg('head13', '4,6').split(',').map(Number).filter(Boolean);
const bars13 = getArg('bars13', '').split(',').map(Number).filter(Boolean);
const full13 = args.includes('--full13');

const L7 = buildLevel(7), L11 = buildLevel(11), L13 = buildLevel(13);
console.log('INSTANCES');
for (const L of [L7, L11, L13]) {
  console.log(`  @${L.x}: W=${L.W}  |N|=${L.slots.length}  scour ${L.scour.length} primes [${L.scour[0]}..${L.scour[L.scour.length - 1]}]  product space = ${L.space}`);
}
const anch11 = anchoredSurvivors(L11), anch13 = anchoredSurvivors(L13);
console.log(`  anchored survivors: @11 = ${anch11} (staircase-note truth 45), @13 = ${anch13} (truth 307)`);
if (anch11 !== 45 || anch13 !== 307) throw new Error('anchored survivors disagree with the embedded artifact — instrument defect');

function runExact(tag, level, branchQ, opts) {
  const inst = makeInstance(level, branchQ, []);
  // construction first: multi-start coordinate ascent, then an independent
  // replay — a certified UPPER bound on advmin before any search runs
  const con = ascentConstruct(level, branchQ, { restarts: opts.ascentRestarts ?? ascentR });
  const cv = verifyWitness(level, branchQ, [], con.witness);
  if (cv.survivors !== con.survivors) throw new Error(`${tag}: construction replay ${cv.survivors} != ascent ${con.survivors}`);
  console.log(`  ${tag}: construction (coordinate ascent, replay-verified): survivors = ${con.survivors}  => advmin <= ${con.survivors}`);
  const res = solve(inst, { ...opts, verboseBounds: true, incumbent: { f: con.survivors, witness: con.witness } });
  if (res.aborted) { console.log(`  ${tag}: NOT COMPLETED — node budget ${budget} tripped at nodes=${res.nodes}, incumbent (upper bound only) ${res.bestF}`); return null; }
  const v = verifyWitness(level, branchQ, [], res.witness);
  if (v.survivors !== res.bestF) throw new Error(`${tag}: witness replay ${v.survivors} != engine ${res.bestF}`);
  console.log(`  ${tag}: min survivors = ${res.bestF}  nodes=${res.nodes}  greedy-seed=${res.seedF}  witness a_q: ${branchQ.map((q, i) => `${q}:${res.witness[i]}`).join(' ')}`);
  return res;
}
function runHead(tag, level, k, opts) {
  const branchQ = level.scour.slice(0, k), tailQ = level.scour.slice(k);
  const inst = makeInstance(level, branchQ, tailQ);
  const res = solve(inst, opts);
  if (res.aborted) { console.log(`  ${tag}: NOT COMPLETED — node budget tripped at nodes=${res.nodes}`); return null; }
  const v = verifyWitness(level, branchQ, tailQ, res.witness);
  if (v.f !== res.bestF) throw new Error(`${tag}: witness replay f=${v.f} != engine ${res.bestF}`);
  console.log(`  ${tag}: certified lower bound advmin >= ${res.bestF}  (head |U|=${v.survivors}, tail allowance ${v.tailAllowance})  nodes=${res.nodes}`);
  return res;
}

// bar-mode calibration against the known @11 exact answer: bar 16 must
// complete EMPTY (proving advmin >= 16), bar 17 must FIND the 16-leaf.
function runBarCal11() {
  const i16 = makeInstance(L11, L11.scour, []);
  const r16 = solve(i16, { restarts, bar: 16 });
  const i17 = makeInstance(L11, L11.scour, []);
  const r17 = solve(i17, { restarts, bar: 17 });
  const ok = !r16.leafFound && r17.leafFound && r17.bestF === 16 &&
    verifyWitness(L11, L11.scour, [], r17.witness).survivors === 16;
  console.log(`  bar calibration @11: bar16 ${r16.leafFound ? 'FOUND (defect)' : 'empty => advmin >= 16'} (nodes=${r16.nodes}), bar17 found ${r17.bestF} (nodes=${r17.nodes}, replay ok) ${ok ? 'AGREEMENT' : 'MISMATCH'}`);
  if (!ok) throw new Error('bar calibration failed on @11');
}

if (phase === 'cal' || phase === 'all') {
  console.log('\nPHASE 1 — CALIBRATION: branch-and-bound vs prune-free exhaustive enumeration');
  const cases = [
    ['@7 full (2 primes, 143 assignments)', L7, L7.scour],
    ['@11 head-4 (96,577 assignments)', L11, L11.scour.slice(0, 4)],
    ['@11 head-6 (86,822,723 assignments)', L11, L11.scour.slice(0, 6)],
  ];
  for (const [tag, level, bq] of cases) {
    const e = enumerateExact(level, bq);
    const inst = makeInstance(level, bq, []);
    const b = solve(inst, { restarts });
    const v = verifyWitness(level, bq, [], b.witness);
    const ok = (e.best === b.bestF) && (v.survivors === b.bestF);
    console.log(`  ${tag}: enum min=${e.best} (argmin count ${e.argmin} of ${e.leaves})  bb min=${b.bestF}  witness replay=${v.survivors}  ${ok ? 'EXACT AGREEMENT' : 'MISMATCH'}`);
    if (!ok) throw new Error(`CALIBRATION FAILED on ${tag} — do not trust anything below`);
  }
}

if (phase === 'at11' || phase === 'all') {
  console.log('\nPHASE 2 — @11 EXACT (all 10 scour primes, space 266,186,053,068,611)');
  const r = runExact('@11 exact', L11, L11.scour, { restarts, budget });
  if (r) {
    console.log(`  compare: staircase certified floor 34  <->  advmin ${r.bestF}  <->  anchored truth 45`);
    console.log('\n  @11 head-k ladder (certified lower bounds from the truncated instrument, must all be <= advmin):');
    for (const k of [2, 4, 6, 8]) {
      const h = runHead(`@11 head-${k}`, L11, k, { restarts, budget });
      if (h && h.bestF > r.bestF) throw new Error(`head-${k} lower bound ${h.bestF} exceeds the exact advmin ${r.bestF} — instrument defect`);
    }
    // shard calibration: fixing the first prime's class and taking the min
    // over its 13 shards must reproduce the exact minimum
    const shardMins = [];
    for (let a = 0; a < 13; a++) {
      const inst = makeInstance(L11, L11.scour, []);
      const s = solve(inst, { restarts, preassign: [[0, a]] });
      shardMins.push(s.bestF);
    }
    const shardMin = Math.min(...shardMins);
    console.log(`  @11 shard calibration (q=13 fixed to a=0..12): minima [${shardMins.join(',')}], min ${shardMin} ${shardMin === r.bestF ? '= exact advmin, AGREEMENT' : 'MISMATCH'}`);
    if (shardMin !== r.bestF) throw new Error('shard calibration failed');
    runBarCal11();
  }
}

if (phase === 'bar13') {
  // BAR RUN: prove advmin@13 >= B by completing the search with bestF preset
  // to B and finding no leaf. Calibrated on @11 first, where the exact answer
  // is known: bar 16 must complete EMPTY, bar 17 must FIND the 16-leaf.
  const B = parseInt(getArg('bar', '111'), 10);
  runBarCal11();
  const inst = makeInstance(L13, L13.scour, []);
  const res = solve(inst, { restarts, budget, bar: B });
  if (res.aborted) console.log(`  @13 bar ${B}: NOT COMPLETED — budget tripped at nodes=${res.nodes}${res.leafFound ? `, but a leaf ${res.bestF} WAS found (advmin <= ${res.bestF})` : ''}`);
  else if (!res.leafFound) console.log(`  @13 bar ${B}: COMPLETED with no leaf below ${B}  => PROVEN advmin@13 >= ${B}  nodes=${res.nodes}`);
  else {
    const v = verifyWitness(L13, L13.scour, [], res.witness);
    if (v.survivors !== res.bestF) throw new Error('bar witness replay mismatch');
    console.log(`  @13 bar ${B}: FOUND leaf ${res.bestF} (replay-verified)  => advmin@13 <= ${res.bestF}  nodes=${res.nodes}  witness: ${L13.scour.map((q, i) => `${q}:${res.witness[i]}`).join(' ')}`);
  }
}

if (phase === 'shard13') {
  // one shard of the full @13 exact search: q=17 (branch index 0) fixed to a.
  const a = parseInt(getArg('a', '0'), 10);
  console.log(`@13 shard: q=17 class fixed to a=${a} (space ~3.3e62), seeded by the global construction`);
  let con;
  const seedPath = getArg('seedjson', null);
  if (seedPath) {
    const j = JSON.parse(require('fs').readFileSync(seedPath, 'utf8'));
    con = { survivors: j.f, witness: j.witness };
  } else con = ascentConstruct(L13, L13.scour, { restarts: 200000 });
  const cv = verifyWitness(L13, L13.scour, [], con.witness);
  if (cv.survivors !== con.survivors) throw new Error('construction replay mismatch');
  console.log(`  seed construction: ${con.survivors}`);
  const inst = makeInstance(L13, L13.scour, []);
  const res = solve(inst, { restarts, budget, preassign: [[0, a]], incumbent: { f: con.survivors, witness: con.witness } });
  if (res.aborted) console.log(`  shard a=${a}: NOT COMPLETED — budget tripped at nodes=${res.nodes}, incumbent ${res.bestF}`);
  else {
    const v = verifyWitness(L13, L13.scour, [], res.witness);
    if (v.survivors !== res.bestF) throw new Error('shard witness replay mismatch');
    console.log(`  shard a=${a}: min-in-shard-or-seed = ${res.bestF}  nodes=${res.nodes}  (${res.bestF < con.survivors ? 'IMPROVED below seed; witness ' + L13.scour.map((q, i) => `${q}:${res.witness[i]}`).join(' ') : 'no leaf below the seed in this shard'})`);
  }
}

if (phase === 'con13') {
  const R = parseInt(getArg('ascent', '4000'), 10);
  const con = ascentConstruct(L13, L13.scour, { restarts: R });
  const cv = verifyWitness(L13, L13.scour, [], con.witness);
  if (cv.survivors !== con.survivors) throw new Error('construction replay mismatch');
  console.log(`@13 construction (${R} ascent restarts, replay-verified): survivors = ${con.survivors}  witness: ${L13.scour.map((q, i) => `${q}:${con.witness[i]}`).join(' ')}`);
}

// The best @13 construction found by this attack: 1,000,000-restart coordinate
// ascent, 2026-08-20 (log preserved in the session record; the run took ~20
// minutes and is NOT repeated here). The heuristic search is not the
// certificate — THIS WITNESS is, and the replay below re-proves survivors =
// 152 from scratch on every run. Copied programmatically from the run's
// output, never by hand.
const ADV13_WITNESS = [16, 14, 14, 28, 28, 9, 21, 19, 18, 18, 54, 31, 19, 17, 33, 27, 39, 21, 1, 34, 57, 78, 27, 90, 15, 40, 8, 29, 94, 56, 20, 153, 22, 48];

if (phase === 'at13' || phase === 'all') {
  console.log('\nPHASE 3 — @13 (34 scour primes, space ~5.5e63)');
  // recorded witness first: the certified upper bound, replay-proven each run
  const rec = verifyWitness(L13, L13.scour, [], ADV13_WITNESS);
  console.log(`  @13 recorded construction witness (1e6-restart ascent, 2026-08-20), replay: survivors = ${rec.survivors}  => advmin@13 <= ${rec.survivors}`);
  console.log(`    witness a_q: ${L13.scour.map((q, i) => `${q}:${ADV13_WITNESS[i]}`).join(' ')}`);
  if (rec.survivors !== 152) throw new Error('recorded @13 witness no longer replays to 152 — transcription defect');
  // fresh in-run construction (small restart count): shows the instrument
  // lands in the same basin without paying the 1e6-restart price
  const con13 = ascentConstruct(L13, L13.scour, { restarts: ascentR });
  const cv13 = verifyWitness(L13, L13.scour, [], con13.witness);
  if (cv13.survivors !== con13.survivors) throw new Error('@13 construction replay mismatch');
  console.log(`  @13 fresh construction (coordinate ascent, ${ascentR} restarts, replay-verified): survivors = ${con13.survivors}`);
  const ub13 = Math.min(rec.survivors, con13.survivors);
  let lb13 = 0; // certified floor: survivors >= 0 trivially
  console.log('  head-k ladder (each completed line is a PROVEN lower bound on advmin@13):');
  for (const k of head13) {
    const h = runHead(`@13 head-${k}`, L13, k, { restarts, budget });
    if (h && h.bestF > lb13) lb13 = h.bestF;
  }
  for (const B of bars13) {
    const inst = makeInstance(L13, L13.scour, []);
    const res = solve(inst, { restarts, budget, bar: B });
    if (res.aborted) console.log(`  @13 bar ${B}: NOT COMPLETED — budget tripped at nodes=${res.nodes}${res.leafFound ? `, but a leaf ${res.bestF} WAS found (advmin <= ${res.bestF})` : ''}`);
    else if (!res.leafFound) {
      console.log(`  @13 bar ${B}: COMPLETED with no leaf below ${B}  => PROVEN advmin@13 >= ${B}  nodes=${res.nodes}`);
      if (B > lb13) lb13 = B;
    } else {
      const v = verifyWitness(L13, L13.scour, [], res.witness);
      if (v.survivors !== res.bestF) throw new Error('bar witness replay mismatch');
      console.log(`  @13 bar ${B}: FOUND leaf ${res.bestF} (replay-verified)  => advmin@13 <= ${res.bestF}  nodes=${res.nodes}`);
    }
  }
  console.log(`  SUMMARY @13: certified bracket advmin in [${lb13}, ${ub13}]  <->  staircase floor 110  <->  anchored truth 307`);
  console.log(`    class-blind ceiling <= ${ub13}: at most ${ub13 - 110} of the ${307 - 110} floor-to-truth points are class-blind recoverable; at least ${307 - ub13} are anchored-only`);
  if (full13) {
    console.log('  full 34-prime exact search:');
    const r = runExact('@13 exact', L13, L13.scour, { restarts, budget });
    if (r) console.log(`  compare: staircase certified floor 110  <->  advmin ${r.bestF}  <->  anchored truth 307`);
  }
}
console.log('\ndone.');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-advmin-1113.js
//   invocation:  node research/attack-advmin-1113.js
//   code-sha256: bd8923112f9ce042e008f74db2fcfb878bef0befa54d47a9b3ebc9509bfefe64
//   out-sha256:  9a80b6f4cce3c429c78660129c8cee81b1145b5a9b6ec7d41097d60c1f871ccc
//   body-lines:  36
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-21
//   elapsed:     227.2 s
// ============================================================================
// INSTANCES
//   @7: W=210  |N|=10  scour 2 primes [11..13]  product space = 143
//   @11: W=2310  |N|=90  scour 10 primes [13..47]  product space = 266186053068611
//   @13: W=30030  |N|=990  scour 34 primes [17..173]  product space = 5547449343567273372655734110918956252113903083412416318580142657
//   anchored survivors: @11 = 45 (staircase-note truth 45), @13 = 307 (truth 307)
//
// PHASE 1 — CALIBRATION: branch-and-bound vs prune-free exhaustive enumeration
//   @7 full (2 primes, 143 assignments): enum min=4 (argmin count 4 of 143)  bb min=4  witness replay=4  EXACT AGREEMENT
//   @11 head-4 (96,577 assignments): enum min=45 (argmin count 10 of 96577)  bb min=45  witness replay=45  EXACT AGREEMENT
//   @11 head-6 (86,822,723 assignments): enum min=33 (argmin count 2 of 86822723)  bb min=33  witness replay=33  EXACT AGREEMENT
//
// PHASE 2 — @11 EXACT (all 10 scour primes, space 266,186,053,068,611)
//   @11 exact: construction (coordinate ascent, replay-verified): survivors = 16  => advmin <= 16
//     root coverage bounds: union 91, dual 85, |N| 90
//   @11 exact: min survivors = 16  nodes=6782  greedy-seed=16  witness a_q: 13:10 17:4 19:14 23:15 29:24 31:17 37:34 41:39 43:10 47:40
//   compare: staircase certified floor 34  <->  advmin 16  <->  anchored truth 45
//
//   @11 head-k ladder (certified lower bounds from the truncated instrument, must all be <= advmin):
//   @11 head-2: certified lower bound advmin >= 7  (head |U|=64, tail allowance 57)  nodes=86
//   @11 head-4: certified lower bound advmin >= 13  (head |U|=47, tail allowance 34)  nodes=1172
//   @11 head-6: certified lower bound advmin >= 14  (head |U|=35, tail allowance 21)  nodes=1995
//   @11 head-8: certified lower bound advmin >= 16  (head |U|=24, tail allowance 8)  nodes=6848
//   @11 shard calibration (q=13 fixed to a=0..12): minima [20,17,18,18,18,18,18,18,17,20,16,21,16], min 16 = exact advmin, AGREEMENT
//   bar calibration @11: bar16 empty => advmin >= 16 (nodes=6782), bar17 found 16 (nodes=6818, replay ok) AGREEMENT
//
// PHASE 3 — @13 (34 scour primes, space ~5.5e63)
//   @13 recorded construction witness (1e6-restart ascent, 2026-08-20), replay: survivors = 152  => advmin@13 <= 152
//     witness a_q: 17:16 19:14 23:14 29:28 31:28 37:9 41:21 43:19 47:18 53:18 59:54 61:31 67:19 71:17 73:33 79:27 83:39 89:21 97:1 101:34 103:57 107:78 109:27 113:90 127:15 131:40 137:8 139:29 149:94 151:56 157:20 163:153 167:22 173:48
//   @13 fresh construction (coordinate ascent, 2000 restarts, replay-verified): survivors = 159
//   head-k ladder (each completed line is a PROVEN lower bound on advmin@13):
//   @13 head-4: certified lower bound advmin >= -30  (head |U|=655, tail allowance 685)  nodes=200511
//   @13 head-6: certified lower bound advmin >= 21  (head |U|=573, tail allowance 552)  nodes=10249654
//   SUMMARY @13: certified bracket advmin in [21, 152]  <->  staircase floor 110  <->  anchored truth 307
//     class-blind ceiling <= 152: at most 42 of the 197 floor-to-truth points are class-blind recoverable; at least 155 are anchored-only
//
// done.
// ============================================================================
// READINGS
// (2026-08-20)
//
// 1. CALIBRATION HOLDS, THREE FOR THREE. The prune-free enumerator and the
//    branch-and-bound agree EXACTLY on @7 full (min 4, 4 optima of 143),
//    @11 head-4 (min 45, 10 optima of 96577) and @11 head-6 (min 33,
//    2 optima of 86822723); enumeration leaf counts equal the BigInt products.
//    Anchored replays hit the embedded artifacts on the digit: 45 @11 and
//    307 @13. Only after these five agreements is anything below quoted.
//
// 2. MAIN RESULT @11 — THE EXACT ADVERSARIAL MINIMUM IS 16. An explicit
//    witness (13:10 17:4 19:14 23:15 29:24 31:17 37:34 41:39 43:10 47:40,
//    re-proven by from-scratch replay every run) kills all but 16 of the 90
//    comb slots. Three independent instruments corroborate at the same value:
//    the head-8 ladder certifies >= 16, the 13-shard minimum is 16, and a
//    bar-16 run completes EMPTY while bar-17 finds the 16-leaf. The search
//    itself needed 6782 nodes against the space of 266,186,053,068,611.
//
// 3. THE PRICING VERDICT @11 — THE STAIRCASE FLOOR IS 18 ABOVE THE
//    CLASS-BLIND CEILING. Any bound quantified over all scour classes is
//    valid at the witness, so its ceiling is 16. The staircase's certified
//    floor is 34 and the truth is 45. The "adversarial slack" that joint
//    caps quantified over classes could recover is NEGATIVE: such caps
//    cannot even re-certify the existing floor, let alone close 34 -> 45.
//    Cofactor Rigidity's use of the anchored classes {0, -2} is load-bearing,
//    not decorative. Class-blind first order sees none of this: the union
//    capacity is 91 > 90 (certifies nothing) and the tuned dual root bound 85
//    certifies only >= 5.
//
// 4. @13 IS BRACKETED, NOT SOLVED: advmin in [21, 152]. The upper end is the
//    recorded 1e6-restart construction witness, re-proven by replay each run
//    (the heuristic that found it is not the certificate; the witness is).
//    The lower end is the head-6 ladder rung (>= 21, 10249654 nodes);
//    head-4 is vacuous (tail allowance 685 exceeds head survivors 655, bound
//    -30, printed as the honest face of the truncated instrument), and
//    head-8 tripped its node budget without completing. A fresh 2000-restart
//    ascent lands at 159, five above the recorded 152 — the basin is easy to
//    reach and expensive to polish.
//
// 5. THE PRICING VERDICT @13, FROM THE UPPER END ALONE: the class-blind
//    ceiling is <= 152, so at most 42 of the 197 points between the
//    staircase floor 110 and the truth 307 are recoverable by ANY bound
//    quantified over classes; at least 155 points — 79% — are anchored
//    structure. This conclusion needs only the witness and survives the
//    unfinished exact search.
//
// 6. WHAT WAS NOT REACHED, AND ITS MEASURED PRICE (wind-down decision,
//    Chris, 2026-08-20: not worth the CPU; no multi-day runs). The exact
//    @13 minimum and the decision "does advmin@13 exceed the floor 110" are
//    both OPEN. The killed searches and their terminal node counts are in
//    the staging report (research/history/staging/attack-advmin-1113.md):
//    a seeded 1/17-shard of the exact search passed 1.6e9 nodes without
//    finishing, pricing the full proof at plausibly 2e10-5e10 nodes; five
//    bar runs (50..100) each passed 0.3-0.55e9 nodes without completing,
//    because every @13 bar must first traverse the cross product of the six
//    smallest scour primes before its bound differentiates. None of those
//    runs found any leaf below its bar — consistent with a minimum near 152,
//    but that is an observation, not a certificate.
//
// 7. REFUTATION LOGGED AGAINST OUR OWN FIRST FRAMING: the task expected the
//    adversarial minimum to sit BETWEEN the staircase floor and the truth,
//    making the gap "adversarial slack plus anchored remainder". At @11 the
//    ordering is inverted (16 < 34 < 45): there is no adversarial slack at
//    all, and the joint-caps-over-classes route is closed, not merely
//    bounded. Only anchored-aware caps remain live for raising floors.
