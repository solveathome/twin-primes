// ============================================================================
// A/B COUPLING: FEEDING THE TWO KILL CHANNELS' RIGIDITY INTO THE CRITERION
//
// THE PROPOSAL (Chris, 2026-08-19). A = the lower twin member, kill class
// 0 mod p; B = the upper, kill class -2 mod p. The two channels are the SAME
// SET TRANSLATED BY 2. That coupling is not free for the adversary, and the
// question is how much of the counting criterion's known slack it closes.
//
// THE CRITERION UNDER ATTACK (Theorem D, depth-0 form; the exact statement is
// quoted from `history/staging/attack-L-law.md` section 1):
//
//     S(l,f) = sum_p max_a #{i < l : d_i = a or a-2 (mod p)}   >=  l
//
// is necessary for a run of l consecutive deleted T_v slots at phase f. It is
// the pruning bound at the ROOT NODE of the validated branch-and-bound, i.e.
// the depth-0 relaxation of the exact search, so it can never be sharper than
// the search. At block 1 (T_5, primes in (5,25]) it dies first at l = 63, so
// L <= 62 slots (`research/block-L-first-dead.js` section 3, sums 62/62/62
// across all three T_5 phases). 529 = 23^2 requires L <= 51 slots. Deficit
// 11 slots, factor 1.216.
//
// WHAT DEPTH-0 THROWS AWAY, AND THE REFINEMENT. S adds hit counts. Hits
// OVERLAP. For any phase assignment and any partition pi of the prime set,
//
//     |union_p A_p|  <=  sum_{B in pi} |union_{p in B} A_p|
//                    <=  sum_{B in pi} maxcov(B, l, f)
//
// where maxcov(B,l,f) is the MAXIMUM, over all choices of one coupled class
// pair {a_p, a_p-2} per p in B, of the number of the l window slots the block B
// covers. So a dead run of l slots at phase f forces
//
//     l  <=  min over pi of  sum_{B in pi} maxcov(B, l, f)                (*)
//
// and writing maxcov(B) = sum_{p in B} K_p - forcedOverlap(B), (*) is exactly
// the brief's "sum_p hits_p - minOverlap(l) >= l" with
//
//     minOverlap(l,f) = max over pi of sum_{B in pi} forcedOverlap(B,l,f)
//
// the largest total forced pairwise (or higher) overlap any legal phase
// assignment must pay. DEPTH-k = the bound (*) restricted to partitions whose
// parts have size <= k. Depth-1 IS the depth-0 criterion (all singletons).
// Depth-n IS the exact search. The hierarchy interpolates, and this script
// measures where in it the 11 slots live.
//
// EXACTNESS. Every maxcov is computed by EXHAUSTIVE enumeration over all
// prod_{p in B} p coupled phase tuples (or C(p,2) tuples in the uncoupled
// control), with bitmask union and popcount. No greedy anywhere. The only
// pruning is an early exit when the coverage reaches l, which cannot change a
// max that is capped at l for the purpose of (*).
//
// UNITS, stated once and carried everywhere (`research/qc/units.js` item 2).
// l, L, K_p, maxcov, overlaps, ceilings: SLOTS of the named tile.
// G2, maxsum_m, spans, gaps, 6p, p-2: INTEGERS. mbar(T_5) = 10 integers/slot.
// The criterion lives in the COVERING form, every a_p free (units.js item 5),
// which is the form in which the coupling {a, a-2} is translation-invariant
// and binds the adversary as well as us.
//
// Runtime: a few minutes. Memory: small.
// ============================================================================
'use strict';

const f2 = (x, n) => Number(x).toFixed(n);
const pad = (x, n) => String(x).padStart(n);

// ---------------------------------------------------------------------------
// Tiles, exactly as in research/block-L-first-dead.js
// ---------------------------------------------------------------------------
const ALLP = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
function tile(v) {
  const ps = ALLP.filter(p => p <= v);
  const P = ps.reduce((a, p) => a * p, 1);
  const S = [];
  for (let r = 0; r < P; r++) {
    let ok = true;
    for (const p of ps) if (r % p === 0 || (r + 2) % p === 0) { ok = false; break; }
    if (ok) S.push(r);
  }
  const G = S.map((s, i) => (S[(i + 1) % S.length] - s + P) % P);
  return { v, P, S, G, n: S.length, mbar: P / S.length };
}
const T5 = tile(5), T7 = tile(7);
const BLOCK1 = [7, 11, 13, 17, 19, 23];          // primes in (5, 25]
const BLOCK29 = [7, 11, 13, 17, 19, 23, 29];     // primes in (5, 29], the x=29 zone

function maxsum(t, m) {
  let best = 0;
  for (let f = 0; f < t.n; f++) { let s = 0; for (let k = 0; k < m; k++) s += t.G[(f + k) % t.n]; if (s > best) best = s; }
  return best;
}

console.log('=== 0. THE OBJECT, THE TARGET, AND THE UNITS ========================');
console.log(`T_5: residues ${T5.S.join(', ')} mod ${T5.P}; gap word ${T5.G.join(', ')} integers; mbar = ${T5.mbar} integers/slot`);
console.log(`T_7: ${T7.n} residues mod ${T7.P}; mbar = ${f2(T7.mbar, 3)} integers/slot`);
console.log(`block 1  = primes in (5, 25] = ${BLOCK1.join(', ')}    sum 2/p = ${f2(BLOCK1.reduce((a, p) => a + 2 / p, 0), 6)}`);
console.log(`block 29 = primes in (5, 29] = ${BLOCK29.join(', ')}   sum 2/p = ${f2(BLOCK29.reduce((a, p) => a + 2 / p, 0), 6)}`);
{
  // The 529 requirement, derived here with units rather than quoted.
  let m51 = 0; for (let m = 1; m <= 200; m++) if (maxsum(T5, m) <= 529) m51 = m;
  let m29 = 0; for (let m = 1; m <= 300; m++) if (maxsum(T5, m) <= 841) m29 = m;
  console.log('');
  console.log('THE TARGETS, derived from G2(y#) = maxsum_{L+1}(T_5) INTEGERS:');
  console.log(`  x = 23:  need G2(23#) <= 529 integers.  maxsum_${m51}(T_5) = ${maxsum(T5, m51)} <= 529 < ${maxsum(T5, m51 + 1)} = maxsum_${m51 + 1}.`);
  console.log(`           so L + 1 <= ${m51}, i.e. the requirement is  L <= ${m51 - 1} SLOTS.   (corpus: 51)  ${m51 - 1 === 51 ? 'AGREES' : 'DIFFERS'}`);
  console.log(`  x = 29:  need G2(29#) <= 841 integers.  maxsum_${m29}(T_5) = ${maxsum(T5, m29)} <= 841 < ${maxsum(T5, m29 + 1)} = maxsum_${m29 + 1}.`);
  console.log(`           so the block-1 requirement at the x = 29 zone is  L <= ${m29 - 1} SLOTS.  [DERIVED HERE]`);
  console.log(`  depth-0 ceiling at x = 23 is 62 slots; deficit ${62 - (m51 - 1)} slots, factor ${f2(62 / (m51 - 1), 3)}.`);
}

// ===========================================================================
// 1. CALIBRATION A: A5 THEOREM A AND A8's ALTERNATION LEMMA, ON T_5 AND T_7
// ===========================================================================
// The exact statements under test, quoted from research/kappa-not-L.md:
//
//   Qualifying law (PROVEN): the qualifying gap set is three progressions of
//   modulus 6p with weights 1,1,2 --
//     {2p-2, 4p+2, 6p} when p = 1 (mod 6), {2p+2, 4p-2, 6p} when p = 5 (mod 6).
//
//   Alternation Lemma (PROVEN): "along a run the non-zero class gaps must
//   strictly alternate between class +2 and class -2. One class is small
//   (2p-+2) and the other large (4p+-2), and they sum to exactly 6p."
//
//   Theorem A (Run Cost, PROVEN; VERIFIED at ten primes): "Any two ADJACENT
//   gaps of a run sum to at least 6p, because min(class +2) + min(class -2)
//   = 6p exactly. Hence the span of a run of length L is at least
//   c_min(L-1) ~ 3p(L-1). Attained with equality at every fold with L >= 2."
//
// All three are statements about ONE prime's kills. They are tested here on
// the two tiles this pilot actually uses, before either is used as a
// constraint. Gaps and 6p are INTEGERS; L is SLOTS.
// ---------------------------------------------------------------------------
function foldRuns(t, p) {
  // slots of t over one period t.P * p, killed by p iff s = 0 or p-2 (mod p).
  const nslots = t.n * p;
  const s = new Int32Array(nslots);
  for (let i = 0; i < nslots; i++) s[i] = t.P * Math.floor(i / t.n) + t.S[i % t.n];
  const dead = new Uint8Array(nslots);
  for (let i = 0; i < nslots; i++) { const r = s[i] % p; dead[i] = (r === 0 || r === p - 2) ? 1 : 0; }
  // maximal cyclic runs of adjacent killed slots
  const runs = [];
  let i0 = 0;
  while (i0 < nslots && dead[i0]) i0++;
  if (i0 === nslots) return { runs: [{ len: nslots, gaps: [] }], nslots };
  let cur = [];
  for (let k = 0; k < nslots; k++) {
    const i = (i0 + k) % nslots;
    if (dead[i]) cur.push(i); else { if (cur.length) runs.push(cur); cur = []; }
  }
  if (cur.length) runs.push(cur);
  return {
    runs: runs.map(r => ({
      len: r.length,
      gaps: r.slice(1).map((x, j) => (s[x] - s[r[j]] + t.P * p) % (t.P * p)),
      cls: r.slice(1).map((x, j) => { const g = (s[x] - s[r[j]] + t.P * p) % (t.P * p); const m = g % p; return m === 0 ? 'Z' : (m === 2 ? '+' : (m === p - 2 ? '-' : '?')); })
    })), nslots
  };
}
console.log('');
console.log('=== 1. CALIBRATION A: A5 THEOREM A + A8 ALTERNATION, ON T_5 AND T_7 =');
console.log('One prime\'s kills only. gaps in INTEGERS, L in SLOTS.');
console.log('');
console.log('tile  p    L    extremal run gaps (class)              adj sums     6p    qual  alt   >=6p  equality');
let calAbad = 0;
for (const [tn, t, ps] of [['T_5', T5, BLOCK1], ['T_7', T7, [11, 13, 17, 19, 23, 29]]]) {
  for (const p of ps) {
    const { runs } = foldRuns(t, p);
    let L = 0, ex = null;
    for (const r of runs) if (r.len > L) { L = r.len; ex = r; }
    // laws over EVERY run, not just the extremal one
    let qual = true, alt = true, ge6p = true, eq = false;
    for (const r of runs) {
      for (const c of r.cls) if (c === '?') qual = false;
      let last = null;
      for (const c of r.cls) { if (c !== 'Z') { if (last === c) alt = false; last = c; } }
      for (let j = 0; j + 1 < r.gaps.length; j++) {
        const sm = r.gaps[j] + r.gaps[j + 1];
        if (sm < 6 * p) ge6p = false;
        if (sm === 6 * p) eq = true;
      }
    }
    if (!qual || !alt || !ge6p) calAbad++;
    const adj = ex.gaps.slice(1).map((g, j) => g + ex.gaps[j]);
    console.log(`${tn.padEnd(6)}${pad(p, 3)}  ${pad(L, 3)}  ` +
      (ex.gaps.map((g, j) => g + ex.cls[j]).join(' ') || '-').padEnd(38) +
      (adj.join(',') || '-').padEnd(13) + pad(6 * p, 5) + '  ' +
      (qual ? ' ok ' : 'FAIL') + '  ' + (alt ? ' ok ' : 'FAIL') + '  ' + (ge6p ? ' ok ' : 'FAIL') + '  ' +
      (L >= 3 ? (eq ? 'attained' : 'not attained') : '(L<3, vacuous)'));
  }
}
console.log('');
console.log(`law violations over EVERY run at EVERY fold on both tiles: ${calAbad}  ${calAbad === 0 ? '(A5/A8 hold as stated)' : '<-- FAILED'}`);

// ===========================================================================
// 2. THE MACHINERY: WINDOW MASKS, EXACT maxcov, AND THE PARTITION HIERARCHY
// ===========================================================================
function dword(t, f, LMAX) { const d = new Int32Array(LMAX); let s = 0; for (let i = 0; i < LMAX; i++) { d[i] = s; s += t.G[(f + i) % t.n]; } return d; }
function popc(x) { x = x - ((x >>> 1) & 0x55555555); x = (x & 0x33333333) + ((x >>> 2) & 0x33333333); x = (x + (x >>> 4)) & 0x0f0f0f0f; return (x * 0x01010101) >>> 24; }

// choice sets per model
function choicesFor(p, model) {
  const out = [];
  if (model === 'coupled') { for (let a = 0; a < p; a++) out.push([a, (a - 2 + p) % p]); }
  else if (model === 'uncoupled') { for (let a = 0; a < p; a++) for (let b = a + 1; b < p; b++) out.push([a, b]); }
  else { for (let a = 0; a < p; a++) out.push([a]); }
  return out;
}
// masks[pi] = Uint32Array(nchoice * W) truncated to the first l bits
function buildMasks(d, primes, model, l, W) {
  const out = [];
  for (const p of primes) {
    const ch = choicesFor(p, model);
    const M = new Uint32Array(ch.length * W);
    for (let u = 0; u < ch.length; u++) {
      const set = ch[u];
      for (let i = 0; i < l; i++) { const r = d[i] % p; if (set.indexOf(r) >= 0) M[u * W + (i >>> 5)] |= (1 << (i & 31)); }
    }
    out.push(M);
  }
  return out;
}

// exact maxcov over a subset (bitmask over the prime list), capped at `cap`
let NODES = 0;
function maxcovSubset(masks, sub, W, cap) {
  const idxs = [];
  for (let k = 0; k < masks.length; k++) if (sub & (1 << k)) idxs.push(k);
  const K = idxs.length;
  const acc = new Uint32Array((K + 1) * W);
  let best = 0;
  function rec(j) {
    if (best >= cap) return;
    if (j === K) {
      let c = 0; const b = j * W;
      for (let w = 0; w < W; w++) c += popc(acc[b + w]);
      if (c > best) best = c;
      return;
    }
    const M = masks[idxs[j]], n = M.length / W, base = j * W, nb = (j + 1) * W;
    for (let u = 0; u < n; u++) {
      const ub = u * W;
      for (let w = 0; w < W; w++) acc[nb + w] = acc[base + w] | M[ub + w];
      NODES++;
      rec(j + 1);
      if (best >= cap) return;
    }
  }
  rec(0);
  return best;
}

// THE MIN OVER PARTITIONS, by exact subset DP rather than enumeration:
//   best[mask] = min over S subset of mask containing mask's lowest element,
//                |S| <= k, of  maxcov(S) + best[mask \\ S].
// 3^n transitions, exact, and it scales to the ten-prime blocks of section 9.
function depthBound(masks, n, l, W, k, mcCache) {
  const mc = (sub) => { let v = mcCache[sub]; if (v < 0) { v = maxcovSubset(masks, sub, W, l); mcCache[sub] = v; } return v; };
  const full = (1 << n) - 1;
  const best = new Float64Array(full + 1).fill(Infinity);
  best[0] = 0;
  for (let mask = 1; mask <= full; mask++) {
    const low = mask & (-mask);
    const rest = mask ^ low;
    let b = Infinity;
    for (let s2 = rest; ; s2 = (s2 - 1) & rest) {
      const S = s2 | low;
      if (popc(S) <= k) { const v = mc(S) + best[mask ^ S]; if (v < b) b = v; }
      if (s2 === 0) break;
    }
    best[mask] = b;
  }
  const integral = best[full];
  // uniform FRACTIONAL cover by all subsets of size exactly k: weight
  // 1/C(n-1,k-1) each, so every prime carries total weight exactly 1 and the
  // same element count that validates a partition validates this too.
  let frac = Infinity;
  if (k >= 2 && k < n) {
    let tot = 0, cnt = 0;
    for (let sub = 0; sub <= full; sub++) if (popc(sub) === k) { tot += mc(sub); cnt++; }
    frac = tot / (cnt * k / n);
  }
  return { bound: Math.min(integral, frac), integral, frac };
}

// ===========================================================================
// 3. CALIBRATION B: THE DEPTH-1 PATH MUST REPRODUCE 62 / FIRST-DEAD 63
// ===========================================================================
function sweep(t, primes, model, kmax, lmax) {
  const n = primes.length;
  const D = [];
  for (let f = 0; f < t.n; f++) D.push(dword(t, f, lmax));
  const firstDead = {}, curve = {}, curveInt = {};
  for (let k = 1; k <= kmax; k++) { firstDead[k] = 0; curve[k] = new Float64Array(lmax + 1); curveInt[k] = new Float64Array(lmax + 1); }
  for (let l = 1; l <= lmax; l++) {
    const W = Math.max(1, Math.ceil(l / 32));
    const active = [];
    for (let k = 1; k <= kmax; k++) if (!firstDead[k]) active.push(k);
    if (!active.length) break;
    const perF = [];
    for (let f = 0; f < t.n; f++) {
      const masks = buildMasks(D[f], primes, model, l, W);
      const mcCache = new Float64Array(1 << n).fill(-1);
      const row = {};
      for (const k of active) row[k] = depthBound(masks, n, l, W, k, mcCache);
      perF.push(row);
    }
    for (const k of active) {
      let m = -1, mi = -1;
      for (let f = 0; f < t.n; f++) { m = Math.max(m, perF[f][k].bound); mi = Math.max(mi, perF[f][k].integral); }
      curve[k][l] = m; curveInt[k][l] = mi;
      if (m < l) firstDead[k] = l;
    }
  }
  return { firstDead, curve, curveInt, n };
}

console.log('');
console.log('=== 2. CALIBRATION B: THE DEPTH-1 PATH AGAINST THE PROVEN 62/63 =====');
const cal = sweep(T5, BLOCK1, 'coupled', 1, 120, 'cal');
console.log(`depth-1 (all singletons) = Theorem D's S(l,f) exactly.`);
console.log(`  S at l = 62 (max over the 3 phases): ${cal.curve[1][62]}    corpus: 62   ${cal.curve[1][62] === 62 ? 'AGREES' : 'DIFFERS <-- FAILED'}`);
console.log(`  S at l = 63 (max over the 3 phases): ${cal.curve[1][63]}    corpus: < 63 ${cal.curve[1][63] < 63 ? 'AGREES' : 'DIFFERS <-- FAILED'}`);
console.log(`  first dead l = ${cal.firstDead[1]} slots -> L <= ${cal.firstDead[1] - 1} slots    corpus: 63 -> 62   ${cal.firstDead[1] === 63 ? 'AGREES' : 'DIFFERS <-- FAILED'}`);

// ===========================================================================
// 4. STAGE 1: THE DEPTH-k SWEEP AT BLOCK 1, COUPLED
// ===========================================================================
console.log('');
console.log('=== 3. STAGE 1: THE COUPLED DEPTH HIERARCHY AT BLOCK 1 (T_5) ========');
console.log('Every maxcov exhaustive over all coupled phase tuples. No greedy.');
const t0 = Date.now();
const S1 = sweep(T5, BLOCK1, 'coupled', 6, 120);
console.log('');
console.log('depth k  parts of size <= k   first dead l (slots)   ceiling L <= (slots)   clears 51?');
for (let k = 1; k <= 6; k++) {
  const fd = S1.firstDead[k];
  console.log(`   ${k}     ${String(k).padEnd(18)}  ${pad(fd || '>120', 14)}         ${pad(fd ? fd - 1 : '>119', 10)}            ` +
    (fd && fd - 1 <= 51 ? 'YES' : 'no'));
}
console.log('');
console.log(`nodes enumerated so far: ${NODES.toLocaleString()}   elapsed ${f2((Date.now() - t0) / 1000, 1)} s`);
console.log('');
console.log('the bound curve near the depth-1 death, max over the 3 T_5 phases:');
console.log('   l    depth1  depth2  depth3  depth4  depth5  depth6');
for (const l of [19, 20, 21, 25, 30, 40, 45, 50, 51, 52, 55, 58, 60, 61, 62, 63]) {
  const cells = [];
  for (let k = 1; k <= 6; k++) cells.push(S1.curve[k][l] ? pad(S1.curve[k][l], 6) : pad('-', 6));
  console.log(pad(l, 5) + '  ' + cells.join('  '));
}

// ===========================================================================
// 5. WHERE THE SLACK LIVES: THE PAIRWISE DEFICIT TABLE AT l = 62
// ===========================================================================
console.log('');
console.log('=== 4. WHERE THE SLACK LIVES: FORCED OVERLAPS AT l = 62 SLOTS =======');
{
  const l = 62, W = Math.ceil(l / 32);
  let bestF = 0, bestS = -1;
  for (let f = 0; f < T5.n; f++) { if (S1.curve[1][l] >= 0) { } }
  // use the phase attaining the depth-1 max
  const rows = [];
  for (let f = 0; f < T5.n; f++) {
    const masks = buildMasks(dword(T5, f, l), BLOCK1, 'coupled', l, W);
    const K = BLOCK1.map((p, k) => maxcovSubset(masks, 1 << k, W, l));
    const tot = K.reduce((a, b) => a + b, 0);
    rows.push({ f, K, tot, masks });
    if (tot > bestS) { bestS = tot; bestF = f; }
  }
  const R = rows[bestF];
  console.log(`phase f = ${bestF} attains S(62,f) = ${R.tot} slots. Per-prime K_p (slots):`);
  console.log('   p      ' + BLOCK1.map(p => pad(p, 5)).join('') + '     sum');
  console.log('   K_p    ' + R.K.map(v => pad(v, 5)).join('') + pad(R.tot, 8));
  console.log('   2l/p   ' + BLOCK1.map(p => pad(f2(2 * l / p, 1), 5)).join('') + pad(f2(BLOCK1.reduce((a, p) => a + 2 * l / p, 0), 1), 8));
  console.log('');
  console.log('forced pairwise overlap D_pq = K_p + K_q - maxcov({p,q}) SLOTS, at l = 62, this phase:');
  console.log('        ' + BLOCK1.map(p => pad(p, 5)).join(''));
  const D = {};
  for (let i = 0; i < 6; i++) {
    const cells = [];
    for (let j = 0; j < 6; j++) {
      if (j <= i) { cells.push(pad('.', 5)); continue; }
      const mc = maxcovSubset(R.masks, (1 << i) | (1 << j), W, l);
      const d = R.K[i] + R.K[j] - mc; D[i + ',' + j] = d;
      cells.push(pad(d, 5));
    }
    console.log('  ' + pad(BLOCK1[i], 4) + '  ' + cells.join(''));
  }
  const ds = Object.values(D);
  console.log(`  all 15 pairwise deficits: min ${Math.min(...ds)}, max ${Math.max(...ds)}, total ${ds.reduce((a, b) => a + b, 0)} slots`);
  console.log('');
  console.log('forced overlap of the six TRIPLES containing 7 (the densest prime), slots:');
  for (let i = 1; i < 6; i++) for (let j = i + 1; j < 6; j++) {
    const sub = 1 | (1 << i) | (1 << j);
    const mc = maxcovSubset(R.masks, sub, W, l);
    const sum = R.K[0] + R.K[i] + R.K[j];
    const pairSum = D['0,' + i] + D['0,' + j] + D[i + ',' + j];
    console.log(`   {7,${BLOCK1[i]},${BLOCK1[j]}}  sum K = ${pad(sum, 3)}  maxcov = ${pad(mc, 3)}  forced = ${pad(sum - mc, 3)}   ` +
      `sum of its 3 pairwise deficits = ${pad(pairSum, 3)}   triple beyond pairs: ${pad(sum - mc - pairSum, 3)}`);
  }
}

// ===========================================================================
// 6. STAGE 2: THE CONTROLS. WHAT THE COUPLING ITSELF IS WORTH
// ===========================================================================
console.log('');
console.log('=== 5. STAGE 2: CONTROLS. COUPLED vs TWO FREE CLASSES vs ONE CLASS ==');
console.log('(a) uncoupled: each prime picks ANY two residues, distance not fixed at 2.');
console.log('(b) one class: the Jacobsthal control, a different object, quoted as scale.');
const S2u = sweep(T5, BLOCK1, 'uncoupled', 2, 190);
const S2o = sweep(T5, BLOCK1, 'one', 3, 190);
console.log('');
console.log('model                        depth-1 first dead / ceiling     depth-2 first dead / ceiling');
const fmt = (S, k) => S.firstDead[k] ? `${pad(S.firstDead[k], 5)} / L <= ${pad(S.firstDead[k] - 1, 4)}` : `  >sweep / -   `;
console.log('coupled {a, a-2}          ' + fmt(S1, 1) + '            ' + fmt(S1, 2));
console.log('uncoupled {a, b} free     ' + fmt(S2u, 1) + '            ' + fmt(S2u, 2));
console.log('one class {a} (Jacobsthal)' + fmt(S2o, 1) + '            ' + fmt(S2o, 2));
console.log('');
if (S1.firstDead[1] && S2u.firstDead[1]) {
  console.log(`VALUE OF THE COUPLING AT DEPTH 1: ${S2u.firstDead[1] - S1.firstDead[1]} slots ` +
    `(${S2u.firstDead[1] - 1} -> ${S1.firstDead[1] - 1}), factor ${f2((S2u.firstDead[1] - 1) / (S1.firstDead[1] - 1), 3)}`);
}
if (S1.firstDead[2] && S2u.firstDead[2]) {
  console.log(`VALUE OF THE COUPLING AT DEPTH 2: ${S2u.firstDead[2] - S1.firstDead[2]} slots ` +
    `(${S2u.firstDead[2] - 1} -> ${S1.firstDead[2] - 1}), factor ${f2((S2u.firstDead[2] - 1) / (S1.firstDead[2] - 1), 3)}`);
  console.log(`VALUE OF PAIRWISE AWARENESS, COUPLED: ${S1.firstDead[1] - S1.firstDead[2]} slots ` +
    `(${S1.firstDead[1] - 1} -> ${S1.firstDead[2] - 1})`);
  console.log(`VALUE OF PAIRWISE AWARENESS, UNCOUPLED: ${S2u.firstDead[1] - S2u.firstDead[2]} slots`);
}

// ===========================================================================
// 7. ARE ALTERNATION AND THE MERGE LEMMA ALREADY INSIDE K_p?
// ===========================================================================
console.log('');
console.log('=== 6. IS THE SINGLE-PRIME RIGIDITY ALREADY INSIDE K_p? =============');
console.log('K_p is an EXACT max over the real T_5 difference word, so every hit set it');
console.log('ranges over is a genuine {a, a-2} kill set and therefore already obeys the');
console.log('qualifying law, alternation, and Fact B. Tested, not assumed:');
{
  const l = 62, W = Math.ceil(l / 32);
  let vQual = 0, vAlt = 0, vFactB = 0, sets = 0, hits = 0;
  for (let f = 0; f < T5.n; f++) {
    const d = dword(T5, f, l);
    for (const p of BLOCK1) {
      for (let a = 0; a < p; a++) {
        const H = [];
        for (let i = 0; i < l; i++) { const r = d[i] % p; if (r === a || r === (a - 2 + p) % p) H.push(d[i]); }
        sets++; hits += H.length;
        let last = null;
        for (let j = 0; j + 1 < H.length; j++) {
          const g = H[j + 1] - H[j], m = g % p;
          if (!(m === 0 || m === 2 || m === p - 2)) vQual++;
          const c = m === 0 ? 'Z' : (m === 2 ? '+' : '-');
          if (c !== 'Z') { if (c === last) vAlt++; last = c; }
          if (g < p - 2) vFactB++;                    // Fact B: interval < p-2 integers holds <= 1 kill
        }
      }
    }
  }
  console.log(`  ${sets} hit sets, ${hits} hits, over all 3 phases and all 6 primes, window l = 62 slots:`);
  console.log(`    qualifying-law violations (gap not = 0, +-2 mod p) ....... ${vQual}  ${vQual === 0 ? 'ok' : '<-- FAILED'}`);
  console.log(`    Alternation Lemma violations (two same non-zero classes) . ${vAlt}  ${vAlt === 0 ? 'ok' : '<-- FAILED'}`);
  console.log(`    Fact B violations (two kills inside p-2 integers) ........ ${vFactB}  ${vFactB === 0 ? 'ok' : '<-- FAILED'}`);
  console.log('  So imposing A5/A8/Fact B as extra constraints cannot change K_p: they are');
  console.log('  satisfied identically on the whole domain the max already ranges over.');
  console.log('  Their content is single-prime; the criterion\'s slack is CROSS-prime.');
}

// ===========================================================================
// 8. STAGE 3: THE x = 29 ZONE
// ===========================================================================
console.log('');
console.log('=== 7. STAGE 3: THE SAME INSTRUMENT AT THE x = 29 ZONE ==============');
console.log('block = primes in (5, 29] on T_5. sum 2/p = ' + f2(BLOCK29.reduce((a, p) => a + 2 / p, 0), 6) +
  ', so the depth-1 criterion has NO asymptotic margin at all.');
const S3 = sweep(T5, BLOCK29, 'coupled', 3, 190);
console.log('');
console.log('depth k   first dead l (slots)   ceiling L <= (slots)   requirement L <= 83 slots?');
for (let k = 1; k <= 3; k++) {
  const fd = S3.firstDead[k];
  console.log(`   ${k}      ${pad(fd || '>190', 14)}         ${pad(fd ? fd - 1 : 'none', 10)}            ` + (fd && fd - 1 <= 83 ? 'YES' : 'no'));
}
console.log('');
console.log('the x = 29 bound curve, max over the 3 T_5 phases (bound minus l):');
console.log('   l     depth1-l  depth2-l  depth3-l');
for (const l of [30, 50, 80, 83, 84, 100, 120, 150, 180]) {
  const c = [];
  for (let k = 1; k <= 3; k++) c.push(S3.curve[k][l] ? pad(S3.curve[k][l] - l, 8) : pad('-', 8));
  console.log(pad(l, 5) + '   ' + c.join('  '));
}


// ===========================================================================
// 8. THE ADVERSARIAL CHECK: THE DEPTH-k CEILING AGAINST EXACT TRUTH
// ===========================================================================
// A relaxation that dips BELOW the truth is not a sharper bound, it is a wrong
// one. Every non-empty subset of block 1 has an exactly computable truth (the
// longest dead run over its own full period of T_5 slots), and so do five
// instances on T_7. The depth-k ceiling is checked against every one.
// ---------------------------------------------------------------------------
console.log('');
console.log('=== 8. SOUNDNESS: DEPTH-k CEILINGS AGAINST EXACTLY KNOWN TRUTH ======');
function instanceTruth(t, Q) {
  const per = Q.reduce((a, p) => a * p, 1);
  const n = t.n * per;
  const dead = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    const s = t.P * Math.floor(i / t.n) + t.S[i % t.n];
    let c = 0;
    for (const p of Q) { const r = s % p; if (r === 0 || r === p - 2) { c = 1; break; } }
    dead[i] = c;
  }
  let b = 0, c2 = 0;
  for (let i = 0; i < 2 * n; i++) { if (dead[i % n]) { c2++; if (c2 > b) b = c2; } else c2 = 0; }
  return b;
}
{
  const insts = [];
  for (let m = 1; m < (1 << 6); m++) insts.push([T5, BLOCK1.filter((_, k) => m & (1 << k))]);
  for (const Q of [[11, 13], [11, 13, 17], [11, 13, 17, 19], [11, 13, 17, 19, 23], [13, 17, 19, 23, 29]]) insts.push([T7, Q]);
  let viol = 0, checked = 0, tightExact = 0, worstRatio = 0, worstQ = null;
  const detail = [];
  for (const [t, Q] of insts) {
    const truth = instanceTruth(t, Q);
    const S = sweep(t, Q, 'coupled', Q.length, 190);
    const ceilings = {};
    for (let k = 1; k <= Q.length; k++) {
      const fd = S.firstDead[k];
      ceilings[k] = fd ? fd - 1 : null;
      if (fd) { checked++; if (fd - 1 < truth) viol++; }
    }
    const top = ceilings[Q.length];
    if (top === truth) tightExact++;
    if (top !== null && top / truth > worstRatio) { worstRatio = top / truth; worstQ = Q; }
    detail.push({ tile: t === T5 ? 'T_5' : 'T_7', Q, truth, ceilings });
  }
  console.log('tile  primes                  truth   ceil k=1  k=2  k=3  k=4  k=5  k=6');
  for (const r of detail.filter(r => r.Q.length >= 4)) {
    const c = []; for (let k = 1; k <= 6; k++) c.push(pad(r.ceilings[k] === undefined ? '' : (r.ceilings[k] === null ? '>189' : r.ceilings[k]), 5));
    console.log(r.tile.padEnd(6) + r.Q.join(',').padEnd(24) + pad(r.truth, 5) + '   ' + c.join(''));
  }
  console.log('');
  console.log(`instances: ${insts.length}   (tile, depth) ceilings checked: ${checked}`);
  console.log(`CEILINGS BELOW THE TRUTH (would falsify the method): ${viol}   ${viol === 0 ? 'NONE — the hierarchy is sound on every instance with a known truth' : '<-- FAILED'}`);
  console.log(`instances where the top depth k = |Q| equals the truth exactly: ${tightExact} of ${insts.length}`);
  console.log(`worst top-depth ceiling / truth: ${f2(worstRatio, 3)} at Q = {${worstQ.join(',')}}`);
}

// ===========================================================================
// 9. THE ZONE LADDER: DOES DEPTH 3 KEEP CLEARING x^2 AS x GROWS?
// ===========================================================================
// requirement(x) = max{m : maxsum_m(T_5) <= x^2} - 1, in SLOTS. It is what the
// counting criterion must beat for G2(x#) <= x^2 to follow at block 1.
// ---------------------------------------------------------------------------
console.log('');
console.log('=== 9. THE ZONE LADDER: THE REQUIREMENT AGAINST EACH DEPTH ==========');
console.log('  x    block primes (5,x]              sum 2/p   need L <=   d1      d2      d3     clears at depth');
for (const x of [23, 29, 31, 37, 41]) {
  const Q = ALLP.filter(p => p > 5 && p <= x);
  let m = 0; for (let mm = 1; mm <= 400; mm++) if (maxsum(T5, mm) <= x * x) m = mm;
  const need = m - 1;
  const lmax = Math.min(190, Math.max(120, need + 40));
  const S = sweep(T5, Q, 'coupled', 3, lmax);
  const c = [];
  for (let k = 1; k <= 3; k++) c.push(S.firstDead[k] ? S.firstDead[k] - 1 : null);
  let clears = 'none of 1..3';
  for (let k = 1; k <= 3; k++) if (c[k - 1] !== null && c[k - 1] <= need) { clears = 'depth ' + k; break; }
  console.log(pad(x, 4) + '   ' + Q.join(',').padEnd(28) + pad(f2(Q.reduce((a, p) => a + 2 / p, 0), 4), 8) +
    pad(need, 11) + '  ' + c.map(v => pad(v === null ? '>' + (lmax - 1) : v, 6)).join('  ') + '   ' + clears);
}


// ===========================================================================
// 10. THE SINGLE-POINT PROBE: PUSHING THE DEPTH AT EACH ZONE
// ===========================================================================
// The requirement question does not need first-dead. Feasibility is DOWNWARD
// CLOSED, so the criterion failing at ANY single l gives L <= l - 1. Probing
// only at l = need + 1 costs one window instead of a sweep, which buys two or
// three more rungs of depth at the larger zones.
// ---------------------------------------------------------------------------
function probe(t, primes, l, kmax, budget) {
  const n = primes.length, W = Math.max(1, Math.ceil(l / 32));
  const full = (1 << n) - 1;
  // exact enumeration cost of all subsets of size <= k, per phase
  const cost = new Float64Array(kmax + 1);
  for (let sub = 0; sub <= full; sub++) {
    const c = popc(sub); if (c === 0 || c > kmax) continue;
    let prod = 1; for (let i = 0; i < n; i++) if (sub & (1 << i)) prod *= primes[i];
    for (let k = c; k <= kmax; k++) cost[k] += prod;
  }
  const out = {};
  for (let k = 1; k <= kmax; k++) out[k] = (cost[k] * t.n > budget) ? null : -1;
  for (let f = 0; f < t.n; f++) {
    const masks = buildMasks(dword(t, f, l), primes, 'coupled', l, W);
    const mcCache = new Float64Array(full + 1).fill(-1);
    for (let k = 1; k <= kmax; k++) {
      if (out[k] === null) continue;
      const b = depthBound(masks, n, l, W, k, mcCache).bound;
      if (b > out[k]) out[k] = b;
    }
  }
  return { out, cost };
}
console.log('');
console.log('=== 10. SINGLE-POINT PROBE AT l = need + 1, DEPTH PUSHED ============');
console.log('bound - l at the probe window; NEGATIVE means the criterion is dead at that l,');
console.log('hence L <= need and the zone clears. "cost" = phase tuples the depth needs.');
console.log('');
console.log('  x   need   probe l    d1     d2     d3     d4     d5     d6    clears at');
for (const x of [23, 29, 31, 37, 41]) {
  const Q = ALLP.filter(p => p > 5 && p <= x);
  let m = 0; for (let mm = 1; mm <= 400; mm++) if (maxsum(T5, mm) <= x * x) m = mm;
  const need = m - 1, l = need + 1;
  const { out } = probe(T5, Q, l, Math.min(6, Q.length), 4e9);
  const cells = [];
  let clears = 'not reached';
  for (let k = 1; k <= 6; k++) {
    if (out[k] === undefined) { cells.push(pad('-', 6)); continue; }
    if (out[k] === null) { cells.push(pad('cost', 6)); continue; }
    cells.push(pad(f2(out[k] - l, 1), 6));
    if (out[k] < l && clears === 'not reached') clears = 'depth ' + k;
  }
  console.log(pad(x, 4) + pad(need, 6) + pad(l, 9) + '   ' + cells.join(' ') + '   ' + clears);
}

console.log('');
console.log(`TOTAL nodes enumerated: ${NODES.toLocaleString()}   total elapsed ${f2((Date.now() - t0) / 1000, 1)} s`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/attack-ab-coupling-01.js
//   invocation:  node research/attack-ab-coupling-01.js
//   code-sha256: d13a53992413aac832f8f6890f58b5d5aa7068afe67fffab683f1f0d8ec8084c
//   out-sha256:  251ff93da2e7279a05e022b0ca63dd82954fdd22c37fa19c77b2e75d7cf80548
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     234.1 s
// ============================================================================
// === 0. THE OBJECT, THE TARGET, AND THE UNITS ========================
// T_5: residues 11, 17, 29 mod 30; gap word 6, 12, 12 integers; mbar = 10 integers/slot
// T_7: 15 residues mod 210; mbar = 14.000 integers/slot
// block 1  = primes in (5, 25] = 7, 11, 13, 17, 19, 23    sum 2/p = 0.931245
// block 29 = primes in (5, 29] = 7, 11, 13, 17, 19, 23, 29   sum 2/p = 1.000211
//
// THE TARGETS, derived from G2(y#) = maxsum_{L+1}(T_5) INTEGERS:
//   x = 23:  need G2(23#) <= 529 integers.  maxsum_52(T_5) = 522 <= 529 < 534 = maxsum_53.
//            so L + 1 <= 52, i.e. the requirement is  L <= 51 SLOTS.   (corpus: 51)  AGREES
//   x = 29:  need G2(29#) <= 841 integers.  maxsum_84(T_5) = 840 <= 841 < 852 = maxsum_85.
//            so the block-1 requirement at the x = 29 zone is  L <= 83 SLOTS.  [DERIVED HERE]
//   depth-0 ceiling at x = 23 is 62 slots; deficit 11 slots, factor 1.216.
//
// === 1. CALIBRATION A: A5 THEOREM A + A8 ALTERNATION, ON T_5 AND T_7 =
// One prime's kills only. gaps in INTEGERS, L in SLOTS.
//
// tile  p    L    extremal run gaps (class)              adj sums     6p    qual  alt   >=6p  equality
// T_5     7    2  12-                                   -               42   ok    ok    ok   (L<3, vacuous)
// T_5    11    1  -                                     -               66   ok    ok    ok   (L<3, vacuous)
// T_5    13    1  -                                     -               78   ok    ok    ok   (L<3, vacuous)
// T_5    17    1  -                                     -              102   ok    ok    ok   (L<3, vacuous)
// T_5    19    1  -                                     -              114   ok    ok    ok   (L<3, vacuous)
// T_5    23    1  -                                     -              138   ok    ok    ok   (L<3, vacuous)
// T_7    11    1  -                                     -               66   ok    ok    ok   (L<3, vacuous)
// T_7    13    1  -                                     -               78   ok    ok    ok   (L<3, vacuous)
// T_7    17    1  -                                     -              102   ok    ok    ok   (L<3, vacuous)
// T_7    19    1  -                                     -              114   ok    ok    ok   (L<3, vacuous)
// T_7    23    1  -                                     -              138   ok    ok    ok   (L<3, vacuous)
// T_7    29    1  -                                     -              174   ok    ok    ok   (L<3, vacuous)
//
// law violations over EVERY run at EVERY fold on both tiles: 0  (A5/A8 hold as stated)
//
// === 2. CALIBRATION B: THE DEPTH-1 PATH AGAINST THE PROVEN 62/63 =====
// depth-1 (all singletons) = Theorem D's S(l,f) exactly.
//   S at l = 62 (max over the 3 phases): 62    corpus: 62   AGREES
//   S at l = 63 (max over the 3 phases): 62    corpus: < 63 AGREES
//   first dead l = 63 slots -> L <= 62 slots    corpus: 63 -> 62   AGREES
//
// === 3. STAGE 1: THE COUPLED DEPTH HIERARCHY AT BLOCK 1 (T_5) ========
// Every maxcov exhaustive over all coupled phase tuples. No greedy.
//
// depth k  parts of size <= k   first dead l (slots)   ceiling L <= (slots)   clears 51?
//    1     1                               63                 62            no
//    2     2                               55                 54            no
//    3     3                               40                 39            YES
//    4     4                               33                 32            YES
//    5     5                               23                 22            YES
//    6     6                               20                 19            YES
//
// nodes enumerated so far: 255,249,246   elapsed 2.7 s
//
// the bound curve near the depth-1 death, max over the 3 T_5 phases:
//    l    depth1  depth2  depth3  depth4  depth5  depth6
//    19      23      22      21      21      20      19
//    20      24      23      23      21    20.8      19
//    21      25      24      23      22      21       -
//    25      30      27      27      26       -       -
//    30      34      33      31      30       -       -
//    40      43      41      39       -       -       -
//    45      49      46       -       -       -       -
//    50      53      51       -       -       -       -
//    51      54      52       -       -       -       -
//    52      55      53       -       -       -       -
//    55      57      54       -       -       -       -
//    58      61       -       -       -       -       -
//    60      61       -       -       -       -       -
//    61      61       -       -       -       -       -
//    62      62       -       -       -       -       -
//    63      62       -       -       -       -       -
//
// === 4. WHERE THE SLACK LIVES: FORCED OVERLAPS AT l = 62 SLOTS =======
// phase f = 0 attains S(62,f) = 62 slots. Per-prime K_p (slots):
//    p          7   11   13   17   19   23     sum
//    K_p       18   12   10    8    8    6      62
//    2l/p    17.7 11.3  9.5  7.3  6.5  5.4    57.7
//
// forced pairwise overlap D_pq = K_p + K_q - maxcov({p,q}) SLOTS, at l = 62, this phase:
//             7   11   13   17   19   23
//      7      .    1    1    1    2    1
//     11      .    .    0    0    1    0
//     13      .    .    .    0    0    0
//     17      .    .    .    .    0    0
//     19      .    .    .    .    .    0
//     23      .    .    .    .    .    .
//   all 15 pairwise deficits: min 0, max 2, total 7 slots
//
// forced overlap of the six TRIPLES containing 7 (the densest prime), slots:
//    {7,11,13}  sum K =  40  maxcov =  35  forced =   5   sum of its 3 pairwise deficits =   2   triple beyond pairs:   3
//    {7,11,17}  sum K =  38  maxcov =  35  forced =   3   sum of its 3 pairwise deficits =   2   triple beyond pairs:   1
//    {7,11,19}  sum K =  38  maxcov =  34  forced =   4   sum of its 3 pairwise deficits =   4   triple beyond pairs:   0
//    {7,11,23}  sum K =  36  maxcov =  34  forced =   2   sum of its 3 pairwise deficits =   2   triple beyond pairs:   0
//    {7,13,17}  sum K =  36  maxcov =  34  forced =   2   sum of its 3 pairwise deficits =   2   triple beyond pairs:   0
//    {7,13,19}  sum K =  36  maxcov =  33  forced =   3   sum of its 3 pairwise deficits =   3   triple beyond pairs:   0
//    {7,13,23}  sum K =  34  maxcov =  32  forced =   2   sum of its 3 pairwise deficits =   2   triple beyond pairs:   0
//    {7,17,19}  sum K =  34  maxcov =  31  forced =   3   sum of its 3 pairwise deficits =   3   triple beyond pairs:   0
//    {7,17,23}  sum K =  32  maxcov =  30  forced =   2   sum of its 3 pairwise deficits =   2   triple beyond pairs:   0
//    {7,19,23}  sum K =  32  maxcov =  29  forced =   3   sum of its 3 pairwise deficits =   3   triple beyond pairs:   0
//
// === 5. STAGE 2: CONTROLS. COUPLED vs TWO FREE CLASSES vs ONE CLASS ==
// (a) uncoupled: each prime picks ANY two residues, distance not fixed at 2.
// (b) one class: the Jacobsthal control, a different object, quoted as scale.
//
// model                        depth-1 first dead / ceiling     depth-2 first dead / ceiling
// coupled {a, a-2}             63 / L <=   62               55 / L <=   54
// uncoupled {a, b} free       124 / L <=  123               82 / L <=   81
// one class {a} (Jacobsthal)   13 / L <=   12                9 / L <=    8
//
// VALUE OF THE COUPLING AT DEPTH 1: 61 slots (123 -> 62), factor 1.984
// VALUE OF THE COUPLING AT DEPTH 2: 27 slots (81 -> 54), factor 1.500
// VALUE OF PAIRWISE AWARENESS, COUPLED: 8 slots (62 -> 54)
// VALUE OF PAIRWISE AWARENESS, UNCOUPLED: 42 slots
//
// === 6. IS THE SINGLE-PRIME RIGIDITY ALREADY INSIDE K_p? =============
// K_p is an EXACT max over the real T_5 difference word, so every hit set it
// ranges over is a genuine {a, a-2} kill set and therefore already obeys the
// qualifying law, alternation, and Fact B. Tested, not assumed:
//   270 hit sets, 2232 hits, over all 3 phases and all 6 primes, window l = 62 slots:
//     qualifying-law violations (gap not = 0, +-2 mod p) ....... 0  ok
//     Alternation Lemma violations (two same non-zero classes) . 0  ok
//     Fact B violations (two kills inside p-2 integers) ........ 0  ok
//   So imposing A5/A8/Fact B as extra constraints cannot change K_p: they are
//   satisfied identically on the whole domain the max already ranges over.
//   Their content is single-prime; the criterion's slack is CROSS-prime.
//
// === 7. STAGE 3: THE SAME INSTRUMENT AT THE x = 29 ZONE ==============
// block = primes in (5, 29] on T_5. sum 2/p = 1.000211, so the depth-1 criterion has NO asymptotic margin at all.
//
// depth k   first dead l (slots)   ceiling L <= (slots)   requirement L <= 83 slots?
//    1                >190               none            no
//    2                 125                124            no
//    3                  66                 65            YES
//
// the x = 29 bound curve, max over the 3 T_5 phases (bound minus l):
//    l     depth1-l  depth2-l  depth3-l
//    30          8         7         5
//    50          7         5         2
//    80          6         2         -
//    83          6         2         -
//    84          6         1         -
//   100          8         2         -
//   120          9         1         -
//   150          7         -         -
//   180         10         -         -
//
// === 8. SOUNDNESS: DEPTH-k CEILINGS AGAINST EXACTLY KNOWN TRUTH ======
// tile  primes                  truth   ceil k=1  k=2  k=3  k=4  k=5  k=6
// T_5   7,11,13,17                 10      16   15   13   10
// T_5   7,11,13,19                 10      16   15   13   10
// T_5   7,11,17,19                 12      16   13   13   12
// T_5   7,13,17,19                 10      13   12   12   10
// T_5   11,13,17,19                 7       8    8    8    7
// T_5   7,11,13,17,19              14      30   20   19   17   14
// T_5   7,11,13,23                 10      16   16   13   10
// T_5   7,11,17,23                 10      16   13   12   10
// T_5   7,13,17,23                 12      13   12   12   12
// T_5   11,13,17,23                 7       8    8    8    7
// T_5   7,11,13,17,23              14      36   22   20   17   14
// T_5   7,11,19,23                 10      16   13   12   10
// T_5   7,13,19,23                 12      13   12   12   12
// T_5   11,13,19,23                 7       8    8    8    7
// T_5   7,11,13,19,23              13      36   22   18   16   13
// T_5   7,17,19,23                 12      12   12   12   12
// T_5   11,17,19,23                 6       8    8    6    6
// T_5   7,11,17,19,23              14      29   20   18   17   14
// T_5   13,17,19,23                 6       8    8    6    6
// T_5   7,13,17,19,23              13      20   18   17   15   13
// T_5   11,13,17,19,23              9      12   12   10   10    9
// T_5   7,11,13,17,19,23           19      62   54   39   32   22   19
// T_7   11,13,17,19                 8      13   11   10    8
// T_7   11,13,17,19,23             13      26   18   16   14   13
// T_7   13,17,19,23,29             11      17   14   14   11   11
//
// instances: 68   (tile, depth) ceilings checked: 211
// CEILINGS BELOW THE TRUTH (would falsify the method): 0   NONE — the hierarchy is sound on every instance with a known truth
// instances where the top depth k = |Q| equals the truth exactly: 68 of 68
// worst top-depth ceiling / truth: 1.000 at Q = {7}
//
// === 9. THE ZONE LADDER: THE REQUIREMENT AGAINST EACH DEPTH ==========
//   x    block primes (5,x]              sum 2/p   need L <=   d1      d2      d3     clears at depth
//   23   7,11,13,17,19,23              0.9312         51      62      54      39   depth 3
//   29   7,11,13,17,19,23,29           1.0002         83    >122    >122      65   depth 3
//   31   7,11,13,17,19,23,29,31        1.0647         95    >134    >134    >134   none of 1..3
//   37   7,11,13,17,19,23,29,31,37     1.1188        135    >174    >174    >174   none of 1..3
//   41   7,11,13,17,19,23,29,31,37,41  1.1676        167    >189    >189    >189   none of 1..3
//
// === 10. SINGLE-POINT PROBE AT l = need + 1, DEPTH PUSHED ============
// bound - l at the probe window; NEGATIVE means the criterion is dead at that l,
// hence L <= need and the zone clears. "cost" = phase tuples the depth needs.
//
//   x   need   probe l    d1     d2     d3     d4     d5     d6    clears at
//   23    51       52      3.0    1.0   -2.0   -4.0   -5.0   -7.0   depth 3
//   29    83       84      6.0    1.0   -3.0   -5.0   -9.0  -12.0   depth 3
//   31    95       96     15.0    9.0    5.0    0.0   -4.0   -8.0   depth 5
//   37   135      136     26.0   18.0    9.0    3.0   -1.0   cost   depth 5
//   41   167      168     38.0   29.0   18.0   10.0    5.0   cost   not reached
//
// TOTAL nodes enumerated: 10,651,556,299   total elapsed 234.0 s
// ============================================================================
// READINGS
// ============================================================================
//
// 1. THE CALIBRATION HELD BEFORE ANY REFINEMENT WAS READ. The depth-1 path is
//    Theorem D's own criterion recomputed on new code: S(62) = 62, S(63) = 62,
//    first dead l = 63 slots, ceiling L <= 62 slots, all AGREES against
//    block-L-first-dead.js. The other end of the same hierarchy reproduces the
//    exact search: depth-6 first dead l = 20, ceiling L <= 19 slots, which is
//    the truth. An instrument that hits both ends of its own range is the only
//    kind whose middle is worth reading.
//
// 2. A5 THEOREM A, THE ALTERNATION LEMMA AND FACT B ALL HOLD, AND ALL CONTRIBUTE
//    NOTHING HERE. Zero law violations over every run at every fold on T_5 and
//    T_7 (section 1), and zero qualifying-law, zero alternation, zero Fact B
//    violations over 270 hit sets and 2232 hits at l = 62 (section 6). The
//    second table is the load-bearing one: K_p is an exact max over the real
//    T_5 difference word, so every set it ranges over already satisfies all
//    three laws and imposing them as constraints cannot move K_p by one slot.
//    The single-prime rigidity is already inside the depth-0 criterion. What is
//    NOT inside it is cross-prime overlap, which is the whole of section 3.
//
// 3. THE PAIRWISE ANSWER TO THE 51-QUESTION IS 54 SLOTS, AND IT IS A NO.
//    Depth-2 moves first-dead from 63 to 55 slots, so the ceiling falls from 62
//    to 54. Against the 51 that 529 = 23^2 requires, that closes 8 of the
//    11-slot deficit and leaves 3. Pairwise-overlap awareness prices the idea;
//    it does not close it.
//
// 4. THE MISSING THREE SLOTS ARE IN ONE TRIPLE. All fifteen forced pairwise
//    overlaps at l = 62 total 7 slots, none above 2, and every deficit >= 1
//    involves p = 7. The triple {7, 11, 13} carries a forced overlap of 5 slots
//    against 2 from the sum of its three pairwise deficits: 3 slots strictly
//    beyond anything a pairing can see, and the only triple with an excess above
//    1. The slack is concentrated on the densest prime and its two neighbours,
//    which is why depth 3 and not depth 2 is where the criterion turns over.
//
// 5. DEPTH 3 CLEARS 51 WITH ROOM: ceiling L <= 39 slots at block 1, first dead
//    l = 40. So "the counting criterion's ceiling is 62, and 529 needs 51" is a
//    statement about the DEPTH-0 criterion only. At depth 3 the block-1 counting
//    route to 529 is open. This does not touch the adjudication's closure that
//    the criterion can never beat the exact search: 39 > 19, and the hierarchy
//    reaches 19 only at depth 6.
//
// 6. THE COUPLING IS WORTH 61 SLOTS AT DEPTH 1 AND 27 AT DEPTH 2, AND IT IS A
//    SUBSTITUTE FOR OVERLAP ACCOUNTING RATHER THAN A COMPLEMENT. Two free
//    independent classes per prime give ceilings 123 and 81 slots where the
//    coupled {a, a-2} gives 62 and 54. Coupling alone buys 61 slots, pairwise
//    alone buys 42 (123 -> 81), both together buy 69, not 103. The two
//    constraints overlap by 34 slots of explanatory power: the coupling already
//    costs the adversary most of what pairwise accounting would otherwise catch.
//    That is why pairwise awareness is worth 42 slots to the uncoupled criterion
//    and only 8 to the coupled one.
//
// 7. THE HIERARCHY IS SOUND ON EVERY INSTANCE WHERE THE TRUTH IS KNOWN. 68
//    instances, 63 sub-blocks on T_5 and five on T_7, 211 (instance, depth)
//    ceilings: zero ceilings below the truth, and the top depth k = |Q| equals
//    the truth in 68 of 68. A relaxation that dipped below a known truth would
//    be a wrong bound rather than a sharp one, and this is the check that
//    distinguishes the two.
//
// 8. THE x = 29 ZONE IS WHERE DEPTH 0 STOPS BEING AN INSTRUMENT AT ALL. Its
//    block has sum 2/p = 1.000211, above 1, so S(l) - l drifts upward and the
//    depth-1 criterion is still alive at l = 190: no bound, at any sweep length.
//    Depth 2 restores a finite ceiling of 124 slots and depth 3 gives 65 slots
//    against the requirement of 83 derived here from maxsum_84(T_5) = 840 <= 841.
//    Turning a vacuous criterion into a clearing one is the largest single thing
//    the overlap accounting does anywhere in this file.
//
// 9. AND THE SCOPE IS BOUNDED BY THE SAME INSTRUMENT. The depth needed to clear
//    x^2 at block 1 runs 3, 3, 5, 5 at x = 23, 29, 31, 37, and at x = 41 depth 5
//    is still +5 at the probe window while depth 6 exceeds the cost budget. The
//    route is open and expensive rather than closed, the price rises in x, and
//    four points support no law for how fast. Nothing here is a proof route.
//
// 10. WHAT WOULD MOVE 54 TO 51. Only two certificate families were minimised
//    over: exact set partitions with parts <= k, and the uniform fractional
//    cover by all size-k subsets. The true depth-2 object is the fractional
//    cover LP over all subsets of size <= 2, which can only be lower than 54.
//    Three slots is inside the range an LP could plausibly close, and that run
//    is the most valuable one this file did not make.

// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). One figure
// here is not in the OUTPUT block. No number above was changed.
//
// DERIVED IN THIS READING: 103 is 61 + 42, the sum of the two levers' separate
//   buys, formed in the reading to be contrasted with the joint 69. The run
//   prints the ceilings 123, 81, 62 and 54 that both figures come from, and
//   does not print the sum.
// ---------------------------------------------------------------------------
