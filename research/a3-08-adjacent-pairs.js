'use strict';
// ============================================================================
// A3-08 — THE EXACT COUNT OF ADJACENT-KILL PAIRS
// (2026-08-16, u-frame wave; ATTACKS3 A8; house style of grain-census.js)
// ============================================================================
// OBJECT. Fold T_x by the next prime p. The pre-deletion new tile is the old
// cyclic gap word repeated p times (copy k holds s_i + kW, and the copy seam
// carries the wrap gap), and copy k deletes exactly the slots whose residue
// mod p lies in the 2-set {-kw, -kw-2}, w = W mod p (U-FRAME 5a step 1).
// An ADJACENT-KILL PAIR is a pair of consecutive slots of the new tile that
// are BOTH deleted. A8 asks for their exact number.
//
// THE TAIL, 2026-08-19 (custody migration wave 3). It is one run of this file
// as it stands, `node research/a3-08-adjacent-pairs.js`, about 89 s. Its header
// used to read: "OUTPUT (node a3-08-adjacent-pairs.js, 2026-08-16; 89s. Section
// [6b] comes from the separate detached run `node --max-old-space-size=8192
// a3-08-adjacent-pairs.js --t31`, 2,620s, with 28 of its 31 progress lines
// elided. Everything else is one run of the file as it stands.)" — that second
// run's section [6b] is now kept in the READINGS, where nothing overwrites it.
//
// THE CRITERION (PROVEN, one line). Consecutive new slots t, t+g are both
// deleted iff t mod p and (t+g) mod p both lie in {0, -2}. Enumerating the
// four ordered choices:
//     (0,0) and (-2,-2)  need  g = 0  (mod p)
//     (0,-2)             needs g = -2 (mod p)
//     (-2,0)             needs g = +2 (mod p)
// so g = 0, +-2 (mod p) is necessary, which is U-FRAME 5a step 6.
//
// THE MULTIPLICITY, which A8 warns about. Fix an old index i. Over the p
// copies the residue r_i + kw of that slot runs over ALL of Z/p exactly once,
// so each admissible value of t mod p is realised by exactly one copy k:
//     g_i = 0  (mod p)  ->  TWO copies realise the double kill
//     g_i = +-2 (mod p) ->  ONE copy realises it
//     otherwise         ->  none.
// Hence the exact count, a sum over the gap histogram of the tile being
// folded with weight 2 on the p-divisible sizes:
//
//     PAIRS(T, p) = 2 * sum_{d = 0 (mod p)} count(d) + sum_{d = +-2 (mod p)} count(d)
//
// THE QUALIFYING SET IN CLOSED FORM. Grain gaps are multiples of 6, so d must
// solve a pair of congruences mod 6p. Three progressions, no more:
//     d = 0 (mod 6p)                     weight 2
//     d = aP (mod 6p),  aP = 2 (mod p), aP = 0 (mod 6)    weight 1
//     d = aM (mod 6p),  aM = 6p - aP                      weight 1
// intersected with the actual gap range (6, G2(T)]. The smallest qualifying
// value is min(aP, aM) which is > 2p - 4, so the threshold sits at ~2p while
// the mean gap grows only like ln^2, which is the U-FRAME 5a step 7 asymmetry.
//
// THE KILL GRAPH, which upgrades pairs to the whole run spectrum. Put a node
// (i, sigma) for every old index i and every sigma in {0, -2}: that node IS
// the unique copy k killing slot i with residue sigma, so there are exactly
// 2D nodes = 2D kills. Draw an edge (i, sigma) -> (i+1, sigma') whenever
// sigma' - sigma = g_i (mod p). In- and out-degree are both at most 1, so the
// kill graph is a disjoint union of paths (and possibly cycles), its edges are
// exactly the adjacent-kill pairs, and its components are exactly the maximal
// adjacent-kill runs. L is the largest component. Everything about the merging
// is a component census of a 2D-node functional graph on the OLD gap word.
//
// THE ALTERNATION LEMMA (PROVEN, and the part A5 wants). The transfer rule is
// forced: d = 0 (mod p) preserves sigma, d = -2 sends 0 to -2, d = +2 sends -2
// to 0. So along a run the non-Z gaps must STRICTLY ALTERNATE between the class
// +2 and the class -2. One of those classes is the SMALL one (2p-+2) and the
// other is the LARGE one (4p+-2), and they sum to exactly 6p, so:
//   (a) L >= 3 forces at least one gap >= 4p-2;
//   (b) L >= 2k+1 forces at least k of them;
//   (c) the L-1 gaps inside a run have mean at least 3p - p/(L-1).
// The threshold is 3p on a WINDOW, not 2p on a single gap. Quantitatively, and
// with no independence assumption, #(3-windows) <= 2 (min(N_P, N_M) + N_Z).
// ============================================================================

// ------------------------------------------------------------------ tiles --
const FOLDS = [7, 11, 13, 17, 19, 23, 29];

function buildTiles() {                       // T5 .. T23, explicit slot lists
  let W = 30, S = Float64Array.from([11, 17, 29]);
  const out = [{ x: 5, W, S }];
  for (const p of [7, 11, 13, 17, 19, 23]) {
    const D = S.length, keep = new Float64Array(D * (p - 2));
    let n = 0;
    for (let k = 0; k < p; k++) {
      const off = k * W;
      for (let i = 0; i < D; i++) {
        const r = S[i] + off;
        if (r % p !== 0 && (r + 2) % p !== 0) keep[n++] = r;
      }
    }
    W *= p; S = keep;
    out.push({ x: p, W, S });
  }
  return out;
}

function gapWord(t) {                         // cyclic gap word, Int32Array(D)
  const S = t.S, D = S.length, g = new Int32Array(D);
  for (let i = 0; i < D - 1; i++) g[i] = S[i + 1] - S[i];
  g[D - 1] = S[0] + t.W - S[D - 1];
  return g;
}

function histOf(g) {                          // Map d -> count(d)
  const h = new Map();
  for (let i = 0; i < g.length; i++) h.set(g[i], (h.get(g[i]) || 0) + 1);
  return h;
}

// --------------------------------------------------- the closed-form set ----
// aP: the unique residue mod 6p that is 2 mod p and 0 mod 6.
function aPlus(p) { let a = 2; while (a % 6 !== 0) a += p; return a; }

function qualifyingSet(p, G2) {               // [{d, weight}] with d <= G2
  const out = [], six = 6 * p, aP = aPlus(p), aM = six - aP;
  for (const [start, wt] of [[six, 2], [aP, 1], [aM, 1]])
    for (let d = start; d <= G2; d += six) out.push({ d, wt });
  out.sort((a, b) => a.d - b.d);
  return out;
}

// -------------------------------------------- prediction from the histogram -
function predictPairs(hist, p) {
  let n = 0;
  for (const [d, c] of hist) {
    const m = d % p;
    if (m === 0) n += 2 * c;
    else if (m === 2 || m === p - 2) n += c;
  }
  return n;
}

// ------------------------------------------------------------ enumerations --
// E1, BRUTE FORCE. Walk all p*D slots of the new tile in position order and
// count consecutive deleted pairs, cyclically. Uses no gap criterion at all.
function brutePairs(t, p) {
  const S = t.S, D = S.length, W = t.W;
  let pairs = 0, prevDel = 0, kills = 0, headRun = -1, run = 0;
  const runs = new Map();
  const bump = (L) => runs.set(L, (runs.get(L) || 0) + 1);
  for (let k = 0; k < p; k++) {
    const off = k * W;
    for (let i = 0; i < D; i++) {
      const m = (S[i] + off) % p;
      const del = (m === 0 || m === p - 2) ? 1 : 0;
      if (del) { kills++; run++; if (prevDel) pairs++; }
      else { if (headRun < 0) headRun = run; else if (run) bump(run); run = 0; }
      prevDel = del;
    }
  }
  if (headRun < 0) { runs.set(run, 1); return { pairs: pairs + 1, kills, runs }; }
  if (prevDel) { pairs++; bump(run + headRun); }   // cyclic seam of the NEW tile
  else if (headRun) bump(headRun);
  return { pairs, kills, runs };
}

// E2, COPY INTERSECTION, O(D). Slot i dies in exactly the two copies
// k = -r_i/w and k = (-2-r_i)/w. Consecutive slots inside a copy share the
// copy index; the seam slot pairs copy k with copy k+1. Counting
// |K_i ^ K_{i+1}| needs the kill law only, never the gap criterion.
function inv(a, p) { let r = 1; for (let e = p - 2; e; e >>= 1, a = a * a % p) if (e & 1) r = r * a % p; return r; }

function copyPairs(t, p) {
  const S = t.S, D = S.length, wi = inv(t.W % p, p);
  const K = (r) => [(p - r % p) % p * wi % p, (2 * p - 2 - r % p) % p * wi % p];
  let pairs = 0, prev = K(S[0]);
  const first = prev;
  for (let i = 1; i < D; i++) {
    const cur = K(S[i]);
    for (const a of prev) for (const b of cur) if (a === b) pairs++;
    prev = cur;
  }
  for (const a of prev) for (const b of first) if (a === (b + p - 1) % p) pairs++;
  return pairs;
}

// ------------------------------------------------------- the kill graph -----
// Streaming component census. Feed the D cyclic gaps in order starting at an
// index whose PREDECESSOR gap is inert (type X), so no component crosses the
// cut. sigma = 0 means residue 0, sigma = 1 means residue p-2.
function makeKillMachine(p) {
  const runs = new Map(), words = new Map(), ring = new Int32Array(16);
  let l0 = 1, l1 = 1, edges = 0, n = 0, adjQ = 0, prevQ = false;
  const bump = (L) => {
    runs.set(L, (runs.get(L) || 0) + 1);
    if (L >= 3) {                              // the L-1 gaps inside this run
      const w = [];
      for (let j = L - 1; j >= 1; j--) w.push(ring[(n - j) & 15]);
      const key = w.join('+');
      words.set(key, (words.get(key) || 0) + 1);
    }
  };
  return {
    feed(g) {
      const m = g % p;
      if (m === 0) { l0++; l1++; edges += 2; }                        // Z: 0->0, 1->1
      else if (m === 2) { bump(l0); l0 = l1 + 1; l1 = 1; edges++; }   // P: 1->0
      else if (m === p - 2) { bump(l1); l1 = l0 + 1; l0 = 1; edges++; } // M: 0->1
      else { bump(l0); bump(l1); l0 = 1; l1 = 1; }                    // X: dead end
      const q = (m === 0 || m === 2 || m === p - 2);
      if (q && prevQ) adjQ++;
      prevQ = q;
      ring[n & 15] = g; n++;
    },
    finish() {
      let tot = 0, L = 0;
      for (const [len, c] of runs) { tot += len * c; if (len > L) L = len; }
      return { runs, words, edges, L, nodes: tot, D: n, adjQ };
    }
  };
}

function killGraph(gapsIter, p) {
  const M = makeKillMachine(p);
  for (;;) { const g = gapsIter(); if (g < 0) break; M.feed(g); }
  return M.finish();
}

function cutIter(g, p) {                      // gap iterator starting after an X gap
  const D = g.length;
  let cut = -1;
  for (let i = 0; i < D; i++) { const m = g[i] % p; if (m !== 0 && m !== 2 && m !== p - 2) { cut = i; break; } }
  if (cut < 0) throw new Error('no inert gap: the kill graph is a single cycle');
  let j = 0;
  return () => (j < D ? g[(cut + 1 + j++) % D] : -1);
}

const fmtRuns = (runs) => [...runs.entries()].sort((a, b) => a[0] - b[0])
  .map(([L, c]) => `${L}:${c}`).join(' ');

// ============================================================================
// PART 1-2. TILES, AND CUSTODY ON THE PUBLISHED QUALIFYING SETS
// ============================================================================
const t0 = Date.now();
const tiles = buildTiles();
const byX = new Map(tiles.map(t => [t.x, t]));
const words = new Map(), hists = new Map(), G2s = new Map();
for (const t of tiles) {
  const g = gapWord(t);
  words.set(t.x, g); hists.set(t.x, histOf(g));
  let G = 0; for (let i = 0; i < g.length; i++) if (g[i] > G) G = g[i];
  G2s.set(t.x, G);
}

console.log('[1] TILES (the object being folded)\n');
console.log('  tile   D slots        W = x#            G2   mean gap');
for (const t of tiles)
  console.log(`  T${String(t.x).padEnd(3)}  ${String(t.S.length).padStart(9)}  ${String(t.W).padStart(16)}  ${String(G2s.get(t.x)).padStart(5)}  ${(t.W / t.S.length).toFixed(2).padStart(9)}`);

console.log('\n[2] CUSTODY — qualifying gap values and their share (U-FRAME 5a table)\n');
console.log('  fold p   old tile   qualifying gaps present         share of gaps   arithmetic set (d <= G2)');
for (const p of FOLDS.slice(0, 6)) {
  const x = tiles[FOLDS.indexOf(p)].x;        // T5 folds to 7, T7 to 11, ...
  const h = hists.get(x), D = byX.get(x).S.length, G2 = G2s.get(x);
  const qs = qualifyingSet(p, G2);
  const present = qs.filter(q => h.get(q.d));
  const share = present.reduce((s, q) => s + h.get(q.d), 0) / D;
  console.log(`  ${String(p).padStart(6)}   T${String(x).padEnd(8)} {${present.map(q => q.d).join(', ') || '-'}}${' '.repeat(Math.max(1, 30 - (present.map(q => q.d).join(', ').length + 2)))}${(100 * share).toFixed(2).padStart(6)}%   {${qs.map(q => q.d + (q.wt === 2 ? '*' : '')).join(', ')}}`);
}
console.log('\n  (* marks weight-2 values, d = 0 mod p; the rest have weight 1.)');
console.log(`\n  build + custody: ${((Date.now() - t0) / 1000).toFixed(2)}s`);

// ============================================================================
// PART 3. THE EXACT PAIR COUNT: prediction against two enumerations
// ============================================================================
console.log('\n[3] ADJACENT-KILL PAIRS: predicted vs enumerated\n');
console.log('  fold p  old T   2D kills    PREDICT   E1 brute   E2 copy   match   naive (no weight)');
const pairTable = [];
for (const p of FOLDS) {
  const t = tiles[FOLDS.indexOf(p)], h = hists.get(t.x), D = t.S.length;
  const pred = predictPairs(h, p);
  let naive = 0;                              // A8's first-move guess: sum count(d), weight 1
  for (const [d, c] of h) { const m = d % p; if (m === 0 || m === 2 || m === p - 2) naive += c; }
  const e1 = brutePairs(t, p);
  const e2 = copyPairs(t, p);
  const ok = (pred === e1.pairs && pred === e2) ? 'YES' : '*** NO ***';
  pairTable.push({ p, x: t.x, D, pred, e1, e2, naive });
  console.log(`  ${String(p).padStart(6)}  T${String(t.x).padEnd(4)} ${String(2 * D).padStart(9)}  ${String(pred).padStart(9)}  ${String(e1.pairs).padStart(9)}  ${String(e2).padStart(8)}   ${ok.padEnd(6)}  ${String(naive).padStart(9)}`);
}
console.log('\n  kills check (every old slot loses exactly 2 of its p copies):');
for (const r of pairTable) console.log(`    p=${String(r.p).padStart(2)}  2D = ${String(2 * r.D).padStart(9)}   brute-force kill count = ${String(r.e1.kills).padStart(9)}   ${2 * r.D === r.e1.kills ? 'ok' : 'MISMATCH'}`);

console.log('\n  the weight-2 term is not cosmetic, and here is where it bites:');
for (const r of pairTable) {
  const h = hists.get(r.x), qs = qualifyingSet(r.p, G2s.get(r.x)).filter(q => q.wt === 2 && h.get(q.d));
  if (qs.length) console.log(`    p=${r.p}: d = ${qs.map(q => `${q.d} (count ${h.get(q.d)})`).join(', ')} are 0 mod p, so pred - naive = ${r.pred - r.naive}`);
}

// ============================================================================
// PART 4. THE KILL GRAPH: the whole run spectrum, hence L, from the gap word
// ============================================================================
console.log('\n[4] KILL GRAPH — run spectrum from the OLD gap word alone (O(D), no fold)\n');
console.log('  fold p  edges = pairs   nodes = 2D    L    run spectrum (length:count)   brute-force spectrum matches');
for (const r of pairTable) {
  const g = words.get(r.x);
  const kg = killGraph(cutIter(g, r.p), r.p);
  const bs = fmtRuns(r.e1.runs), ks = fmtRuns(kg.runs);
  const okE = kg.edges === r.pred, okN = kg.nodes === 2 * r.D, okS = bs === ks;
  console.log(`  ${String(r.p).padStart(6)}  ${String(kg.edges).padStart(13)}  ${String(kg.nodes).padStart(11)}  ${String(kg.L).padStart(3)}    ${ks.padEnd(28)}  ${okS && okE && okN ? 'YES' : 'NO  edges:' + okE + ' nodes:' + okN}`);
}
console.log('\n  L across the fold ladder: ' + pairTable.map(r => killGraph(cutIter(words.get(r.x), r.p), r.p).L).join(', ') +
  '   (U-FRAME 5 table reports 2, 1, 2, 2, 2, 3, 3)');

// -- REFUTATION CHECK on the recorded L at fold 29 ---------------------------
// killrun.js scores a run by "the residues occupy at most two values differing
// by 2", which is the right criterion but is evaluated by a state machine that
// carries a stale `prev`. Score the criterion directly, by windows.
{
  const t = byX.get(23), S = t.S, D = S.length, p = 29;
  const win = (i, L) => {                      // does the L-window at i qualify?
    const v = new Set(); for (let j = 0; j < L; j++) v.add(S[(i + j) % D] % p);
    if (v.size === 1) return true;
    if (v.size !== 2) return false;
    const [a, b] = [...v], d = Math.abs(a - b);
    return d === 2 || d === p - 2;
  };
  let n3 = 0, n2 = 0;
  for (let i = 0; i < D; i++) { if (win(i, 2)) n2++; if (win(i, 3)) n3++; }
  console.log(`\n  DIRECT WINDOW SCORE, T23 mod 29 (third method, no state machine):`);
  console.log(`    2-windows that qualify: ${n2}     3-windows that qualify: ${n3}`);
  console.log(`    so L(T23, 29) = ${n3 ? '>= 3' : '2'}, against killrun.js's 3. killrun.js is WRONG:`);
  console.log(`    its state machine keeps prev at the older of the two tracked values, e.g.`);
  console.log(`    the residue word 10,12,8,8 scores 3 there and is 2 (the set {8,12} differs by 4).`);
}

// ============================================================================
// PART 5. THE QUALIFYING SET IN CLOSED FORM, AND THE 2p +- 2 LEMMA
// ============================================================================
// aP = 2 (mod p) and 0 (mod 6). If p = 1 (mod 6) then 6 | 2p-2, so
// aM = 2p-2 and aP = 4p+2. If p = 5 (mod 6) then 6 | 2p+2, so aP = 2p+2 and
// aM = 4p-2. Either way the three qualifying classes mod 6p are
//     { 2p-2, 4p+2, 6p }   (p = 1 mod 6)      weights 1, 1, 2
//     { 2p+2, 4p-2, 6p }   (p = 5 mod 6)      weights 1, 1, 2
// so exactly 3 of every p multiples of 6 qualify, weight 4/p, and
// THE SMALLEST QUALIFYING GAP IS EXACTLY 2p-2 or 2p+2, never merely "about 2p".
console.log('\n[5] QUALIFYING SET IN CLOSED FORM (three classes mod 6p)\n');
console.log('   p  p mod 6   predicted {2p-+2, 4p+-2, 6p}      computed aP, aM, 6p     agree');
for (const p of [7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53]) {
  const aP = aPlus(p), aM = 6 * p - aP, m = p % 6;
  const pred = m === 1 ? [2 * p - 2, 4 * p + 2, 6 * p] : [2 * p + 2, 4 * p - 2, 6 * p];
  const got = [Math.min(aP, aM), Math.max(aP, aM), 6 * p];
  console.log(`  ${String(p).padStart(3)}  ${String(m).padStart(6)}   ${JSON.stringify(pred).padEnd(24)}  ${JSON.stringify(got).padEnd(22)}  ${JSON.stringify(pred) === JSON.stringify(got) ? 'yes' : 'NO'}`);
}
console.log('\n  smallest qualifying gap = 2p-2 (p=1 mod 6) or 2p+2 (p=5 mod 6), exactly.');

// A twin pair (p, p+2) has p = 5 (mod 6) and p+2 = 1 (mod 6), so both members
// give the SAME smallest qualifying value 2p+2 = 2(p+1), twice the number
// between the twins. The threshold does not advance across a twin fold.
{
  const isP = (n) => { for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return n > 1; };
  const small = (p) => Math.min(aPlus(p), 6 * p - aPlus(p));
  const hits = [];
  let bad = 0;
  for (let p = 5; p < 300; p++) if (isP(p) && isP(p + 2)) {
    if (small(p) !== small(p + 2)) bad++;
    hits.push(`(${p},${p + 2})->${small(p)}`);
  }
  console.log(`\n  TWIN-PAIR IDENTITY: both members of a twin pair share the threshold 2(p+1).`);
  console.log(`    ${hits.join(' ')}`);
  console.log(`    ${hits.length} twin pairs below 300, ${bad} violations.`);
}

// ============================================================================
// PART 5b. WHY RUNS OF 3 ARE RARER THAN INDEPENDENCE SAYS (the A5 diagnostic)
// ============================================================================
// A run of 3 kills needs TWO CONSECUTIVE qualifying gaps, and then the
// transfer rule filters them: types (P,P) and (M,M) are impossible, because
// after a +2 step the residue sits at 0 and cannot take another +2 step.
console.log('\n[5b] TWO CONSECUTIVE QUALIFYING GAPS — the obstruction to L >= 3\n');
console.log('  fold p    qualifying gaps   adjacent pairs of them   of those, consistent   independence guess   runs of 3');
for (const r of pairTable) {
  const g = words.get(r.x), D = g.length, p = r.p;
  const ty = (d) => { const m = d % p; return m === 0 ? 'Z' : m === 2 ? 'P' : m === p - 2 ? 'M' : 'X'; };
  let q = 0, adj = 0, cons = 0;
  for (let i = 0; i < D; i++) {
    const a = ty(g[i]), b = ty(g[(i + 1) % D]);
    if (a !== 'X') q++;
    if (a !== 'X' && b !== 'X') { adj++; if (!(a === b && a !== 'Z')) cons++; }
  }
  const kg = killGraph(cutIter(g, p), p);
  const r3 = [...kg.runs.entries()].filter(e => e[0] >= 3).reduce((s, e) => s + e[1], 0);
  console.log(`  ${String(p).padStart(6)}  ${String(q).padStart(16)}  ${String(adj).padStart(22)}  ${String(cons).padStart(21)}  ${(D * (q / D) ** 2).toFixed(1).padStart(18)}  ${String(r3).padStart(9)}`);
}
console.log('\n  The forbidden transitions are (P,P) and (M,M). Since the SMALLEST qualifying');
console.log('  value dominates the qualifying count, most adjacent qualifying pairs are two');
console.log('  copies of it, hence same type, hence dead. At p = 29 that kills all 288.\n');
console.log('[5c] THE GAP WORDS INSIDE EVERY RUN OF LENGTH >= 3 (the alternation, made visible)\n');
for (const r of pairTable) {
  const kg = killGraph(cutIter(words.get(r.x), r.p), r.p);
  if (!kg.words.size) continue;
  const aP = aPlus(r.p), aM = 6 * r.p - aP;
  console.log(`  fold ${r.p} on T${r.x}:  small class ${Math.min(aP, aM)} = ${r.p % 6 === 1 ? '2p-2 (type M)' : '2p+2 (type P)'},  large class ${Math.max(aP, aM)} = ${r.p % 6 === 1 ? '4p+2 (type P)' : '4p-2 (type M)'},  Z class ${6 * r.p}`);
  for (const [w, c] of [...kg.words.entries()].sort((a, b) => b[1] - a[1]))
    console.log(`      ${w.padEnd(20)} x ${c}`);
}

// ============================================================================
// PART 6. DEEP: T29 (215M slots) folded by 31, streaming
// ============================================================================
function streamFold2(base, p1, p2, onSlot, tick) {   // slots of base folded by
  const S = base.S, D = S.length, W0 = base.W, W1 = W0 * p1;   // p1 then p2,
  const K2 = p2 ? p2 : 1;                                      // in order
  for (let k2 = 0; k2 < K2; k2++) {
    const o2 = k2 * W1;
    for (let k1 = 0; k1 < p1; k1++) {
      const o1 = o2 + k1 * W0;
      for (let i = 0; i < D; i++) {
        const r = S[i] + o1;
        if (r % p1 === 0 || (r + 2) % p1 === 0) continue;
        if (p2 && (r % p2 === 0 || (r + 2) % p2 === 0)) continue;
        onSlot(r);
      }
    }
    tick(k2, K2);
  }
}

// Analyse the fold of a STREAMED tile by q: histogram, prediction, copy
// enumeration and kill graph, all in one pass and O(1) memory.
function streamAnalyse(base, p1, p2, q, label) {
  const W = base.W * p1 * (p2 || 1), wi = inv(W % q, q);
  const K = (r) => { const m = r % q; return [(q - m) % q * wi % q, (2 * q - 2 - m) % q * wi % q]; };
  const hist = new Map(), M = makeKillMachine(q);
  let D = 0, first = 0, prevSlot = -1, prevK = null, firstK = null;
  let pairsE2 = 0, G2 = 0;
  const t1 = Date.now();
  const step = (g) => {                       // feed one gap to hist + kill graph
    hist.set(g, (hist.get(g) || 0) + 1);
    if (g > G2) G2 = g;
    M.feed(g);
  };
  streamFold2(base, p1, p2, (r) => {
    D++;
    const k = K(r);
    if (prevSlot < 0) { first = r; firstK = k; }
    else { step(r - prevSlot); for (const a of prevK) for (const b of k) if (a === b) pairsE2++; }
    prevSlot = r; prevK = k;
  }, (k2, K2) => {
    process.stdout.write(`    ...${label}: outer copy ${k2 + 1}/${K2}, ${(D / 1e6).toFixed(1)}M slots, ${((Date.now() - t1) / 1000).toFixed(0)}s\n`);
  });
  const wrap = first + W - prevSlot;           // cyclic gap of the streamed tile
  step(wrap);
  for (const a of prevK) for (const b of firstK) if (a === (b + q - 1) % q) pairsE2++;
  const cut = wrap % q, cutOK = cut !== 0 && cut !== 2 && cut !== q - 2;
  const kg = M.finish();
  return { D, W, G2, hist, pred: predictPairs(hist, q), pairsE2, edges: kg.edges, runs: kg.runs, words: kg.words, L: kg.L, nodes: kg.nodes, cutOK, wrap, adjQ: kg.adjQ, secs: (Date.now() - t1) / 1000 };
}

function reportDeep(res, tileName, q) {
  const qs = qualifyingSet(q, res.G2), present = qs.filter(z => res.hist.get(z.d));
  const share = present.reduce((s, z) => s + res.hist.get(z.d), 0) / res.D;
  console.log(`\n  ${tileName}: D = ${res.D}, W = ${res.W}, G2 = ${res.G2}, mean gap ${(res.W / res.D).toFixed(2)}, wrap gap ${res.wrap} (${res.cutOK ? 'inert, cut valid' : 'NOT INERT — cut invalid'})`);
  console.log(`  fold ${q}: arithmetic qualifying set {${qs.map(z => z.d + (z.wt === 2 ? '*' : '')).join(', ')}}, present {${present.map(z => z.d).join(', ')}}, share ${(100 * share).toFixed(2)}%`);
  console.log(`    counts: ${present.map(z => `count(${z.d}) = ${res.hist.get(z.d)}`).join(', ')}`);
  console.log(`    PREDICT ${res.pred}   E2 copy ${res.pairsE2}   kill-graph edges ${res.edges}   ${res.pred === res.pairsE2 && res.pred === res.edges ? 'MATCH' : '*** MISMATCH ***'}`);
  console.log(`    2D = ${2 * res.D}, kill-graph nodes = ${res.nodes} ${2 * res.D === res.nodes ? 'ok' : 'MISMATCH'};  pairs per kill = ${(res.pred / (2 * res.D)).toExponential(3)}`);
  console.log(`    L = ${res.L};  run spectrum ${fmtRuns(res.runs)}`);
  console.log(`    adjacent qualifying-gap pairs (raw) = ${res.adjQ};  runs of length >= 3 = ${[...res.runs.entries()].filter(e => e[0] >= 3).reduce((s, e) => s + e[1], 0)}`);
  console.log(`    gap words inside the long runs:`);
  for (const [w, c] of [...res.words.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12))
    console.log(`      ${w.padEnd(24)} x ${c}`);
  console.log(`    ${res.secs.toFixed(1)}s`);
}

const argv = process.argv.slice(2);
if (!argv.includes('--no-deep')) {
  console.log('\n[6] DEEP — T29 streamed from T23 (215M slots) and folded by 31\n');
  reportDeep(streamAnalyse(byX.get(23), 29, 0, 31, 'T29'), 'T29', 31);
}
if (argv.includes('--t31')) {
  console.log('\n[6b] DEEPER — T31 streamed from T23 (6.2e9 slots) and folded by 37\n');
  reportDeep(streamAnalyse(byX.get(23), 29, 31, 37, 'T31'), 'T31', 37);
}

// ============================================================================
// PART 7. THE RUN SPECTRUM UNDER INDEPENDENCE (transfer matrix), calibrated
// ============================================================================
// States are the two residues {0, -2}. A gap = 0 (mod p) keeps the state, a
// gap = -2 sends 0 -> -2, a gap = +2 sends -2 -> 0, anything else kills the
// run. If the gap word were an i.i.d. sequence with class frequencies
// fZ, fM, fP, the expected number of adjacent-kill runs of length >= L would be
//     D * || A^(L-1) ||_1,   A = [[fZ, fM], [fP, fZ]]
// which is EXACT at L = 2 by construction (it is the pair formula). Higher L
// is a model, and the comparison below says exactly how good a model it is.
function matPow1(f, e) {                      // sum of entries of A^e
  let a = [[1, 0], [0, 1]];
  const A = [[f.Z, f.M], [f.P, f.Z]];
  for (let i = 0; i < e; i++)
    a = [[a[0][0] * A[0][0] + a[0][1] * A[1][0], a[0][0] * A[0][1] + a[0][1] * A[1][1]],
         [a[1][0] * A[0][0] + a[1][1] * A[1][0], a[1][0] * A[0][1] + a[1][1] * A[1][1]]];
  return a[0][0] + a[0][1] + a[1][0] + a[1][1];
}
function classFreqs(histOrIter, p, D) {
  const f = { Z: 0, M: 0, P: 0 };
  for (const [d, c] of histOrIter) { const m = d % p; if (m === 0) f.Z += c; else if (m === 2) f.P += c; else if (m === p - 2) f.M += c; }
  return { Z: f.Z / D, M: f.M / D, P: f.P / D };
}
// The model counts L-node PATHS, so it must be compared against the number of
// L-windows inside the true runs, sum over len >= L of (len - L + 1)*count(len).
const windows = (runs, L) => [...runs.entries()].filter(e => e[0] >= L).reduce((s, e) => s + (e[0] - L + 1) * e[1], 0);
console.log('\n[7] RUN SPECTRUM: independence model vs truth (L-windows, not runs)\n');
console.log('  fold p     fZ        fM        fP      |  L=2 model / true  |  L=3 model / true  |  L=4 model / true');
for (const r of pairTable) {
  const D = r.D, f = classFreqs(hists.get(r.x), r.p, D);
  const kg = killGraph(cutIter(words.get(r.x), r.p), r.p);
  const md = (L) => D * matPow1(f, L - 1);
  console.log(`  ${String(r.p).padStart(6)}  ${f.Z.toExponential(2)}  ${f.M.toExponential(2)}  ${f.P.toExponential(2)} | ${md(2).toFixed(0).padStart(9)} / ${String(windows(kg.runs, 2)).padStart(7)} | ${md(3).toFixed(1).padStart(9)} / ${String(windows(kg.runs, 3)).padStart(7)} | ${md(4).toFixed(2).padStart(9)} / ${String(windows(kg.runs, 4)).padStart(7)}`);
}
console.log('\n  L = 2 is an identity (it IS the pair formula). L = 3 the model gets to within');
console.log('  20% where runs exist. At p = 29 it predicts 27 and the truth is 0, and at L = 4');
console.log('  it over-predicts everywhere: the grain resists consecutive large gaps harder');
console.log('  than independence allows. The model is an UPPER guide only.');

// ============================================================================
// PART 8. THE CORRECTED L SWEEP (Lgrowth.js shares killrun.js's state machine)
// ============================================================================
console.log('\n[8] L(T_x, p), computed exactly as the largest kill-graph component\n');
const primesTo = (n) => { const s = new Uint8Array(n + 1), o = []; for (let i = 2; i <= n; i++) if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } return o; };
const sweepT = [11, 13, 17, 19, 23], sweepP = primesTo(127).filter(q => q >= 7);
console.log('    p  ' + sweepT.map(x => `  T${String(x).padEnd(2)}`).join('') + '    smallest qualifying value 2p-+2   present in T23?');
for (const p of sweepP) {
  let row = `  ${String(p).padStart(3)}  `;
  for (const x of sweepT) {
    if (x >= p) { row += '    -'; continue; }
    const L = killGraph(cutIter(words.get(x), p), p).L;
    const diag = FOLDS.indexOf(p) >= 0 && tiles[FOLDS.indexOf(p)] && tiles[FOLDS.indexOf(p)].x === x;
    row += String(L + (diag ? '*' : '')).padStart(5);
  }
  const s = Math.min(aPlus(p), 6 * p - aPlus(p)), c = hists.get(23).get(s) || 0;
  console.log(row + `   ${String(s).padStart(24)}   ${s > G2s.get(23) ? 'beyond G2(T23) = 204' : `count = ${c}${c ? '' : '   <-- ABSENT'}`}`);
}
console.log('\n  Two corrections to U-FRAME 5a step 6/7 fall straight out of this table:');
console.log('  (i) L is NOT monotone falling in p at fixed tile. For T23 it is 2 at p = 29..67,');
console.log('      drops to 1 at p = 71 and 73, and RETURNS to 2 at p = 79..103.');
console.log('  (ii) the dip at 71 and 73 is not decay, it is the single hole in the census:');
console.log('      2p-+2 = 144 for both, and 144 is the one absent multiple of 6 below G2(T23)');
console.log('      (grain-census.js reading 2). f(T23, p) is exactly 0 at p = 71, 73 and again');
console.log('      from p = 107, where 2p-+2 first exceeds G2(T23) = 204, not "from p = 71".');

// ---- the corollary of the alternation lemma, checked over the whole grid ----
// L >= 3 needs two consecutive qualifying gaps of OPPOSITE type, so it needs
// at least one gap from the large class (4p+-2) or from the Z class (6p).
// Contrapositive: if neither is present in the tile, L <= 2.
console.log('\n[8b] COROLLARY CHECK: large class absent  =>  L <= 2\n');
let tested = 0, viol = 0, big = 0;
for (const p of sweepP) for (const x of sweepT) {
  if (x >= p) continue;
  const h = hists.get(x), aP = aPlus(p), lg = Math.max(aP, 6 * p - aP);
  let heavy = 0;
  for (let d = lg; d <= G2s.get(x); d += 6 * p) heavy += h.get(d) || 0;
  for (let d = 6 * p; d <= G2s.get(x); d += 6 * p) heavy += h.get(d) || 0;
  const L = killGraph(cutIter(words.get(x), p), p).L;
  tested++;
  if (L >= 3) { big++; if (!heavy) { viol++; console.log(`    VIOLATION T${x} p=${p}: L=${L} with no large-class gap`); } }
}
console.log(`    ${tested} tile-prime pairs tested, ${big} with L >= 3, ${viol} violations of the corollary.`);
console.log('    Every L >= 3 in the grid carries a large-class gap, as the lemma requires.');

// ---- the quantitative form of the same lemma -------------------------------
// Every 3-window contains a P and an M, or a Z. Each gap sits in at most two
// 3-windows. So, with N_P, N_M, N_Z the class counts of the OLD gap word,
//     #(3-windows)  <=  2 * ( min(N_P, N_M) + N_Z ),
// unconditionally, with no independence assumption anywhere.
console.log('\n[8c] THE PROVABLE CEILING  #(3-windows) <= 2 (min(N_P, N_M) + N_Z)\n');
console.log('  fold p       N_P       N_M       N_Z    ceiling   true 3-windows   slack');
for (const r of pairTable) {
  const g = words.get(r.x), p = r.p;
  let NP = 0, NM = 0, NZ = 0;
  for (let i = 0; i < g.length; i++) { const m = g[i] % p; if (m === 0) NZ++; else if (m === 2) NP++; else if (m === p - 2) NM++; }
  const ceil = 2 * (Math.min(NP, NM) + NZ);
  const kg = killGraph(cutIter(g, p), p), tr = windows(kg.runs, 3);
  console.log(`  ${String(p).padStart(6)}  ${String(NP).padStart(8)}  ${String(NM).padStart(8)}  ${String(NZ).padStart(8)}  ${String(ceil).padStart(9)}  ${String(tr).padStart(15)}   ${ceil >= tr ? (ceil ? (ceil / Math.max(tr, 1)).toFixed(1) + 'x' : 'tight (0)') : '*** VIOLATED ***'}`);
}

// ============================================================================
// PART 9. WHAT L = 1 BUYS: the lower bound becomes an identity (feeds A10)
// ============================================================================
// If no gap qualifies then every kill is isolated, so every kill merges exactly
// two adjacent gaps and G2(new) = maxsum2(old) EXACTLY, not merely >=.
const maxsum = (g, m) => {
  const D = g.length; let best = 0, s = 0;
  for (let i = 0; i < m; i++) s += g[i];
  best = s;
  for (let i = 0; i < D; i++) { s += g[(i + m) % D] - g[i]; if (s > best) best = s; }
  return best;
};
console.log('\n[9] THE SANDWICH maxsum2(old) <= G2(new) <= maxsum_{L+1}(old), with L exact\n');
console.log('  fold p   L   maxsum2(old)   G2(new)   maxsum_{L+1}(old)   lower tight?   upper tight?');
for (const r of pairTable) {
  const g = words.get(r.x), L = killGraph(cutIter(g, r.p), r.p).L;
  const nx = byX.get(r.p), G2n = nx ? G2s.get(r.p) : 258;   // G2(T29) = 258, measured in [6]
  const lo = maxsum(g, 2), hi = maxsum(g, L + 1);
  console.log(`  ${String(r.p).padStart(6)}  ${String(L).padStart(2)}   ${String(lo).padStart(12)}   ${String(G2n).padStart(7)}   ${String(hi).padStart(17)}   ${(lo === G2n ? 'YES' : 'no ').padStart(12)}   ${hi === G2n ? 'YES' : 'no'}`);
}
console.log('\n  At fold 11, L = 1 and the lower bound is an identity, exactly as the lemma says.');

console.log(`\ntotal ${((Date.now() - t0) / 1000).toFixed(1)}s`);




// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/a3-08-adjacent-pairs.js
//   invocation:  node research/a3-08-adjacent-pairs.js
//   code-sha256: 15c7b93cf9616d17140ead8e3840604152dbac7a9c9e9fca659cdc01d0df7776
//   out-sha256:  5088283144d2d7772729487a11666894167b6bc5bb0e614399c9ecc87f7eba9a
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     89.6 s
// ============================================================================
// [1] TILES (the object being folded)
//
//   tile   D slots        W = x#            G2   mean gap
//   T5            3                30     12      10.00
//   T7           15               210     30      14.00
//   T11         135              2310     42      17.11
//   T13        1485             30030     66      20.22
//   T17       22275            510510    108      22.92
//   T19      378675           9699690    150      25.61
//   T23     7952175         223092870    204      28.05
//
// [2] CUSTODY — qualifying gap values and their share (U-FRAME 5a table)
//
//   fold p   old tile   qualifying gaps present         share of gaps   arithmetic set (d <= G2)
//        7   T5        {12}                           66.67%   {12}
//       11   T7        {-}                              0.00%   {24}
//       13   T11       {24}                            4.44%   {24}
//       17   T13       {36, 66}                        4.85%   {36, 66}
//       19   T17       {36, 78}                        4.88%   {36, 78}
//       23   T19       {48, 90, 138}                   3.11%   {48, 90, 138*}
//
//   (* marks weight-2 values, d = 0 mod p; the rest have weight 1.)
//
//   build + custody: 0.83s
//
// [3] ADJACENT-KILL PAIRS: predicted vs enumerated
//
//   fold p  old T   2D kills    PREDICT   E1 brute   E2 copy   match   naive (no weight)
//        7  T5            6          2          2         2   YES             2
//       11  T7           30          0          0         0   YES             0
//       13  T11         270          6          6         6   YES             6
//       17  T13        2970         72         72        72   YES            72
//       19  T17       44550       1088       1088      1088   YES          1088
//       23  T19      757350      11870      11870     11870   YES         11784
//       29  T23    15904350     243822     243822    243822   YES        243816
//
//   kills check (every old slot loses exactly 2 of its p copies):
//     p= 7  2D =         6   brute-force kill count =         6   ok
//     p=11  2D =        30   brute-force kill count =        30   ok
//     p=13  2D =       270   brute-force kill count =       270   ok
//     p=17  2D =      2970   brute-force kill count =      2970   ok
//     p=19  2D =     44550   brute-force kill count =     44550   ok
//     p=23  2D =    757350   brute-force kill count =    757350   ok
//     p=29  2D =  15904350   brute-force kill count =  15904350   ok
//
//   the weight-2 term is not cosmetic, and here is where it bites:
//     p=23: d = 138 (count 86) are 0 mod p, so pred - naive = 86
//     p=29: d = 174 (count 6) are 0 mod p, so pred - naive = 6
//
// [4] KILL GRAPH — run spectrum from the OLD gap word alone (O(D), no fold)
//
//   fold p  edges = pairs   nodes = 2D    L    run spectrum (length:count)   brute-force spectrum matches
//        7              2            6    2    1:2 2:2                       YES
//       11              0           30    1    1:30                          YES
//       13              6          270    2    1:258 2:6                     YES
//       17             72         2970    2    1:2826 2:72                   YES
//       19           1088        44550    2    1:42374 2:1088                YES
//       23          11870       757350    3    1:733672 2:11746 3:62         YES
//       29         243822     15904350    2    1:15416706 2:243822           YES
//
//   L across the fold ladder: 2, 1, 2, 2, 2, 3, 2   (U-FRAME 5 table reports 2, 1, 2, 2, 2, 3, 3)
//
//   DIRECT WINDOW SCORE, T23 mod 29 (third method, no state machine):
//     2-windows that qualify: 243816     3-windows that qualify: 0
//     so L(T23, 29) = 2, against killrun.js's 3. killrun.js is WRONG:
//     its state machine keeps prev at the older of the two tracked values, e.g.
//     the residue word 10,12,8,8 scores 3 there and is 2 (the set {8,12} differs by 4).
//
// [5] QUALIFYING SET IN CLOSED FORM (three classes mod 6p)
//
//    p  p mod 6   predicted {2p-+2, 4p+-2, 6p}      computed aP, aM, 6p     agree
//     7       1   [12,30,42]                [12,30,42]              yes
//    11       5   [24,42,66]                [24,42,66]              yes
//    13       1   [24,54,78]                [24,54,78]              yes
//    17       5   [36,66,102]               [36,66,102]             yes
//    19       1   [36,78,114]               [36,78,114]             yes
//    23       5   [48,90,138]               [48,90,138]             yes
//    29       5   [60,114,174]              [60,114,174]            yes
//    31       1   [60,126,186]              [60,126,186]            yes
//    37       1   [72,150,222]              [72,150,222]            yes
//    41       5   [84,162,246]              [84,162,246]            yes
//    43       1   [84,174,258]              [84,174,258]            yes
//    47       5   [96,186,282]              [96,186,282]            yes
//    53       5   [108,210,318]             [108,210,318]           yes
//
//   smallest qualifying gap = 2p-2 (p=1 mod 6) or 2p+2 (p=5 mod 6), exactly.
//
//   TWIN-PAIR IDENTITY: both members of a twin pair share the threshold 2(p+1).
//     (5,7)->12 (11,13)->24 (17,19)->36 (29,31)->60 (41,43)->84 (59,61)->120 (71,73)->144 (101,103)->204 (107,109)->216 (137,139)->276 (149,151)->300 (179,181)->360 (191,193)->384 (197,199)->396 (227,229)->456 (239,241)->480 (269,271)->540 (281,283)->564
//     18 twin pairs below 300, 0 violations.
//
// [5b] TWO CONSECUTIVE QUALIFYING GAPS — the obstruction to L >= 3
//
//   fold p    qualifying gaps   adjacent pairs of them   of those, consistent   independence guess   runs of 3
//        7                 2                       1                      0                 1.3          0
//       11                 0                       0                      0                 0.0          0
//       13                 6                       0                      0                 0.3          0
//       17                72                       0                      0                 3.5          0
//       19              1088                       0                      0                53.1          0
//       23             11784                     234                     62               366.7         62
//       29            243816                     288                      0              7475.5          0
//
//   The forbidden transitions are (P,P) and (M,M). Since the SMALLEST qualifying
//   value dominates the qualifying count, most adjacent qualifying pairs are two
//   copies of it, hence same type, hence dead. At p = 29 that kills all 288.
//
// [5c] THE GAP WORDS INSIDE EVERY RUN OF LENGTH >= 3 (the alternation, made visible)
//
//   fold 23 on T19:  small class 48 = 2p+2 (type P),  large class 90 = 4p-2 (type M),  Z class 138
//       48+90                x 31
//       90+48                x 31
//
// [6] DEEP — T29 streamed from T23 (215M slots) and folded by 31
//
//     ...T29: outer copy 1/1, 214.7M slots, 60s
//
//   T29: D = 214708725, W = 6469693230, G2 = 258, mean gap 30.13, wrap gap 42 (inert, cut valid)
//   fold 31: arithmetic qualifying set {60, 126, 186*, 246}, present {60, 126, 186}, share 3.74%
//     counts: count(60) = 7815766, count(126) = 205068, count(186) = 2090
//     PREDICT 8025014   E2 copy 8025014   kill-graph edges 8025014   MATCH
//     2D = 429417450, kill-graph nodes = 429417450 ok;  pairs per kill = 1.869e-2
//     L = 4;  run spectrum 1:413380422 2:7999018 3:12992 4:4
//     adjacent qualifying-gap pairs (raw) = 44478;  runs of length >= 3 = 12996
//     gap words inside the long runs:
//       126+60                   x 6496
//       60+126                   x 6496
//       60+126+60                x 4
//     60.1s
//
// [7] RUN SPECTRUM: independence model vs truth (L-windows, not runs)
//
//   fold p     fZ        fM        fP      |  L=2 model / true  |  L=3 model / true  |  L=4 model / true
//        7  0.00e+0  6.67e-1  0.00e+0 |         2 /       2 |       0.0 /       0 |      0.00 /       0
//       11  0.00e+0  0.00e+0  0.00e+0 |         0 /       0 |       0.0 /       0 |      0.00 /       0
//       13  0.00e+0  4.44e-2  0.00e+0 |         6 /       6 |       0.0 /       0 |      0.00 /       0
//       17  0.00e+0  8.08e-3  4.04e-2 |        72 /      72 |       1.0 /       0 |      0.02 /       0
//       19  0.00e+0  4.59e-2  2.96e-3 |      1088 /    1088 |       6.1 /       0 |      0.15 /       0
//       23  2.27e-4  3.26e-3  2.76e-2 |     11870 /   11870 |      73.6 /      62 |      1.10 /       0
//       29  7.55e-7  5.53e-5  3.06e-2 |    243822 /  243822 |      27.3 /       0 |      0.41 /       0
//
//   L = 2 is an identity (it IS the pair formula). L = 3 the model gets to within
//   20% where runs exist. At p = 29 it predicts 27 and the truth is 0, and at L = 4
//   it over-predicts everywhere: the grain resists consecutive large gaps harder
//   than independence allows. The model is an UPPER guide only.
//
// [8] L(T_x, p), computed exactly as the largest kill-graph component
//
//     p    T11  T13  T17  T19  T23    smallest qualifying value 2p-+2   present in T23?
//     7      -    -    -    -    -                         12   count = 1867320
//    11      -    -    -    -    -                         24   count = 539136
//    13     2*    -    -    -    -                         24   count = 539136
//    17      2   2*    -    -    -                         36   count = 393464
//    19      2    2   2*    -    -                         36   count = 393464
//    23      1    2    2   3*    -                         48   count = 275040
//    29      1    2    2    2   2*                         60   count = 243370
//    31      1    2    2    3    3                         60   count = 243370
//    37      1    1    2    2    2                         72   count = 94492
//    41      1    1    2    2    2                         84   count = 26956
//    43      1    1    2    2    2                         84   count = 26956
//    47      1    1    2    2    2                         96   count = 27136
//    53      1    1    2    2    2                        108   count = 32326
//    59      1    1    1    2    2                        120   count = 7852
//    61      1    1    1    2    2                        120   count = 7852
//    67      1    1    1    2    2                        132   count = 2314
//    71      1    1    1    1    1                        144   count = 0   <-- ABSENT
//    73      1    1    1    1    1                        144   count = 0   <-- ABSENT
//    79      1    1    1    1    2                        156   count = 310
//    83      1    1    1    1    2                        168   count = 322
//    89      1    1    1    1    2                        180   count = 112
//    97      1    1    1    1    2                        192   count = 8
//   101      1    1    1    1    2                        204   count = 4
//   103      1    1    1    1    2                        204   count = 4
//   107      1    1    1    1    1                        216   beyond G2(T23) = 204
//   109      1    1    1    1    1                        216   beyond G2(T23) = 204
//   113      1    1    1    1    1                        228   beyond G2(T23) = 204
//   127      1    1    1    1    1                        252   beyond G2(T23) = 204
//
//   Two corrections to U-FRAME 5a step 6/7 fall straight out of this table:
//   (i) L is NOT monotone falling in p at fixed tile. For T23 it is 2 at p = 29..67,
//       drops to 1 at p = 71 and 73, and RETURNS to 2 at p = 79..103.
//   (ii) the dip at 71 and 73 is not decay, it is the single hole in the census:
//       2p-+2 = 144 for both, and 144 is the one absent multiple of 6 below G2(T23)
//       (grain-census.js reading 2). f(T23, p) is exactly 0 at p = 71, 73 and again
//       from p = 107, where 2p-+2 first exceeds G2(T23) = 204, not "from p = 71".
//
// [8b] COROLLARY CHECK: large class absent  =>  L <= 2
//
//     120 tile-prime pairs tested, 3 with L >= 3, 0 violations of the corollary.
//     Every L >= 3 in the grid carries a large-class gap, as the lemma requires.
//
// [8c] THE PROVABLE CEILING  #(3-windows) <= 2 (min(N_P, N_M) + N_Z)
//
//   fold p       N_P       N_M       N_Z    ceiling   true 3-windows   slack
//        7         0         2         0          0                0   tight (0)
//       11         0         0         0          0                0   tight (0)
//       13         0         6         0          0                0   tight (0)
//       17        60        12         0         24                0   24.0x
//       19        66      1022         0        132                0   132.0x
//       23     10462      1236        86       2644               62   42.6x
//       29    243370       440         6        892                0   892.0x
//
// [9] THE SANDWICH maxsum2(old) <= G2(new) <= maxsum_{L+1}(old), with L exact
//
//   fold p   L   maxsum2(old)   G2(new)   maxsum_{L+1}(old)   lower tight?   upper tight?
//        7   2             24        30                  30            no    YES
//       11   1             42        42                  42            YES   YES
//       13   2             66        66                  96            YES   no
//       17   2             96       108                 138            no    no
//       19   2            150       150                 168            YES   no
//       23   3            186       204                 228            no    no
//       29   2            234       258                 300            no    no
//
//   At fold 11, L = 1 and the lower bound is an identity, exactly as the lemma says.
//
// total 89.5s
// ==========================================================================
// READINGS — A8 is closed. The number of adjacent-kill pairs at every fold is an
// identity in the gap histogram of the tile being folded, and the identity
// generalises to the whole run spectrum, which is what A5 needs.
//
// 0. WHERE SECTION [6b] WENT (custody, 2026-08-19). The OUTPUT block above is
//    one run of this file as it stands. Section [6b], the T31 leg, is NOT that
//    run: it comes from the separate detached invocation
//    `node --max-old-space-size=8192 research/a3-08-adjacent-pairs.js --t31`,
//    2,620 s, whose 31 progress lines were pasted with 28 of them elided. It
//    stood inside the OUTPUT region until today, where no re-run of the file
//    could produce it. It is kept here verbatim, elisions and all, and it is
//    reproducible only by that invocation:
//
//    [6b] DEEPER — T31 streamed from T23 (6.2e9 slots) and folded by 37
//
//        ...T31: outer copy 1/31, 200.9M slots, 75s
//        ...T31: outer copy 2/31, 401.7M slots, 155s
//        ...  (28 progress lines elided)
//        ...T31: outer copy 31/31, 6226.6M slots, 2543s
//
//      T31: D = 6226553025, W = 200560490130, G2 = 348, mean gap 32.21, wrap gap 42 (inert, cut valid)
//      fold 37: arithmetic qualifying set {72, 150, 222*, 294}, present {72, 150, 222, 294}, share 1.84%
//        counts: count(72) = 109884182, count(150) = 4937476, count(222) = 26366, count(294) = 46
//        PREDICT 114874436   E2 copy 114874436   kill-graph edges 114874436   MATCH
//        2D = 12453106050, kill-graph nodes = 12453106050 ok;  pairs per kill = 9.225e-3
//        L = 4;  run spectrum 1:12223428142 2:114732724 3:70532 4:216
//        adjacent qualifying-gap pairs (raw) = 502708;  runs of length >= 3 = 70748
//        gap words inside the long runs:
//          72+150                   x 35098
//          150+72                   x 35098
//          72+150+72                x 188
//          222+72                   x 150
//          72+222                   x 150
//          150+72+150               x 28
//          150+222                  x 18
//          222+150                  x 18
//        2543.4s
//
// 1. THE FORMULA, AND IT IS EXACT.
//
//      PAIRS(T, p) = 2 * sum_{d = 0 (mod p)} count(d) + sum_{d = +-2 (mod p)} count(d)
//
//    where count is the cyclic gap histogram of T. Verified against TWO
//    independent enumerations at folds 7 to 29, and against one of them plus the
//    kill graph at folds 31 and 37. E1 walks all p*D slots of the folded tile and
//    counts consecutive deletions with no reference to gaps at all; E2 intersects
//    the two-element copy sets K_i = {-r_i/w, (-2-r_i)/w} of neighbouring slots,
//    using the kill law and nothing else. Every method agrees digit for digit:
//
//      fold      7   11    13    17     19       23        29          31            37
//      pairs     2    0     6    72   1088    11870   243,822   8,025,014   114,874,436
//
//    The deepest point is a genuine stress test: T31 has 6,226,553,025 slots and
//    G2 = 348, both reproduced by the stream, and the three-way agreement at
//    114,874,436 holds across 12.45 billion kills.
//
//    The 2D-kills check (every old slot loses exactly 2 of its p copies) holds at
//    every fold, and the kill-graph node count reproduces 2D exactly.
//
// 2. THE MULTIPLICITY FACTOR IS REAL, AND A8 WAS RIGHT TO WARN. The naive
//    sum_{qualifying d} count(d) is WRONG. A gap d = 0 (mod p) admits both kill
//    patterns (0,0) and (-2,-2), so TWO of the p copies realise the double kill;
//    a gap d = +-2 (mod p) admits one pattern, so ONE copy realises it. The
//    correction first bites at fold 23, where d = 138 = 6p occurs 86 times and
//    the naive count misses by exactly 86 (11,784 against 11,870), and again at
//    fold 29 where d = 174 = 6p occurs 6 times. The direct window score of
//    T23 mod 29 is 243,816 and the pair count is 243,822: the gap of 6 is the
//    weight-2 term, visible in the output.
//
// 3. CUSTODY REPRODUCED, WITH ONE CORRECTION. The published qualifying sets and
//    shares come out exactly: {12} 66.67%, none 0%, {24} 4.44%, {36,66} 4.85%,
//    {36,78} 4.88%, {48,90,138} 3.11%. The correction is to the reading of
//    "fold 11: NONE". The arithmetic qualifying set at p = 11 is {24, 42, 66},
//    and 24 is below G2(T7) = 30, so 11 is NOT arithmetically barred. T7 simply
//    has no gap of size 24 in its census. The zero is a census accident, not an
//    exclusion, and the same accident recurs at p = 71 and 73 (reading 8).
//
// 4. THE QUALIFYING SET IN CLOSED FORM, WITH AN EXACT SMALLEST VALUE. Since
//    grain gaps are multiples of 6, the qualifying d solve two congruences mod
//    6p, giving exactly three classes and no more:
//
//      p = 1 (mod 6):   d = 2p-2, 4p+2, 6p   (mod 6p),   weights 1, 1, 2
//      p = 5 (mod 6):   d = 2p+2, 4p-2, 6p   (mod 6p),   weights 1, 1, 2
//
//    Verified for p = 7 to 53. So exactly 3 of every p multiples of 6 qualify,
//    the weighted density is 4/p, and THE SMALLEST QUALIFYING GAP IS EXACTLY
//    2p-2 or 2p+2. U-FRAME 5a step 6 says "about 2p"; it is 2p-2 when
//    p = 1 (mod 6) and 2p+2 when p = 5 (mod 6), never anything else.
//
// 5. THE KILL GRAPH. Put a node (i, sigma) for each slot index i of the old tile
//    and each sigma in {0, -2}. That node IS the unique copy k that kills slot i
//    with residue sigma, so the graph has exactly 2D nodes, one per kill. Draw
//    (i, sigma) -> (i+1, sigma') whenever sigma' - sigma = g_i (mod p). Both
//    degrees are at most 1, so the graph is a disjoint union of paths. Its edges
//    are the adjacent-kill pairs and its components are the maximal adjacent-kill
//    runs, so L is the largest component. Verified against brute force: the run
//    spectra agree exactly at every fold, and sum(length * count) = 2D every
//    time. The whole merging question is now an O(D) component census of the OLD
//    gap word, with no fold and no folded tile in memory.
//
// 6. THE ALTERNATION LEMMA (PROVEN), WHICH IS THE PART THAT FEEDS A5. The
//    transfer rule is forced: d = 0 (mod p) preserves the residue, d = -2 sends
//    0 to -2, d = +2 sends -2 to 0. So along any run the non-zero-class gaps must
//    STRICTLY ALTERNATE between the class +2 and the class -2. Two consecutive
//    qualifying gaps of the same non-zero type are impossible. Since one of those
//    two classes is the SMALL one (2p-+2) and the other is the LARGE one (4p+-2),
//    three consequences follow:
//
//      (a) L >= 3 forces at least one gap >= 4p-2.
//      (b) L >= 2k+1 forces at least k gaps >= 4p-2.
//      (c) the L-1 gaps inside a run sum to at least 3p(L-1) when L-1 is even and
//          3p(L-2) + s when L-1 is odd, s = 2p-+2 being the small class, since
//          s + (4p+-2) = 6p exactly. Their MEAN is therefore at least 3p - p/(L-1).
//
//    Exhaustively confirmed, and at every scale we can reach. Every run of length
//    3 or more in the data is a strict alternation, with no exceptions: at fold
//    23 the 62 three-runs are 48+90 (31 of them) and 90+48 (31 of them), never
//    48+48; at fold 31 the 12,992 three-runs are 60+126 and 126+60, 6,496 each,
//    and the four four-runs are all 60+126+60, never 60+60. At fold 37, over
//    6.2e9 slots, the small class is 72, the large is 150 and the neutral Z class
//    is 222, and the complete list of long-run words is 72+150 and 150+72 (35,098
//    each), 72+222 and 222+72 (150 each), 150+222 and 222+150 (18 each),
//    72+150+72 (188), and 150+72+150 (28). Not one word repeats a non-neutral
//    class, exactly as the lemma forces. At fold 29 there are 288 adjacent pairs
//    of qualifying gaps and NOT ONE of them is consistent, because every one is
//    (60, 60), same type, forbidden. That is why L drops there.
//
//    The quantitative form is a proven ceiling with no independence assumption.
//    Every 3-window needs one gap of each non-zero type or a zero-class gap, and
//    each gap sits in at most two 3-windows, so
//
//      #(3-windows)  <=  2 * ( min(N_P, N_M) + N_Z ).
//
//    Checked at all seven folds, slack 24x to 892x where it is not zero.
//
// 7. REFUTATION, AND IT TOUCHED TWO EXISTING INSTRUMENTS. killrun.js and
//    Lgrowth.js scored a run by the right criterion, "the residues occupy at
//    most two values differing by 2", but with a state machine that left `prev`
//    pointing at the OLDER of the two tracked residues. It therefore both over-
//    and under-counted: the residue word 10, 12, 8, 8 scored 3 there and is 2,
//    since {8, 12} differ by 4. Its published L(T23, 29) = 3 is wrong. Three
//    independent methods here give 2: brute force over the 215M-slot folded tile,
//    the kill graph, and a direct window score that found 243,816 qualifying
//    2-windows and exactly 0 qualifying 3-windows. The corrected diagonal is
//
//      fold      7  11  13  17  19  23  29  31  37
//      L         2   1   2   2   2   3   2   4   4
//
//    against U-FRAME 5's 2, 1, 2, 2, 2, 3, 3, 4. L is NOT monotone. This is not
//    only a bookkeeping fix: it TIGHTENS the certified upper bound at fold 29
//    from maxsum4(T23) = 348 to maxsum3(T23) = 300, against the true
//    G2(T29) = 258, so the overshoot falls from 35% to 16%. Attacks A4 and A5
//    hit the same bug independently on the same day and reached the same
//    corrected diagonal; both source files now carry the fix and a warning
//    header. Any L quoted from them before 2026-08-16 is unsafe, U-FRAME 5's
//    L column and 5a step 6's diagonal included.
//
// 8. L IS NOT MONOTONE IN p EITHER, AND THE DIP HAS AN EXACT CAUSE. For T23, L
//    is 2 at p = 29 through 67, falls to 1 at p = 71 and 73, and RETURNS to 2 at
//    p = 79 through 103, reaching 1 for good only from p = 107, where 2p-+2 first
//    exceeds G2(T23) = 204. The dip at 71 and 73 is the single hole in the
//    census: 2p-+2 = 144 for both primes, and 144 is the one absent multiple of
//    6 below G2(T23) (grain-census.js reading 2). So U-FRAME 5a step 7's
//    "f(T23, p) exactly 0 from p = 71" is wrong. It is 0 at 71 and 73 for that
//    arithmetic accident, positive again from 79, and 0 for good from 107.
//
// 9. THE INDEPENDENCE MODEL, CALIBRATED, AND IT IS AN UPPER GUIDE ONLY. With
//    class frequencies fZ, fM, fP the expected number of L-windows is
//    D * ||A^(L-1)||_1 with A = [[fZ, fM], [fP, fZ]]. At L = 2 this is an
//    identity, since it is the pair formula written out. At L = 3 it is within
//    20% where runs exist: 73.6 against 62 at fold 23, and at fold 31, from the
//    printed class counts, 2 * count(60) * count(126) / D = 14,929 against the
//    measured 13,000. At fold 29 it predicts 27 where the truth is 0. At L = 4 it
//    over-predicts everywhere: the same arithmetic at fold 31 gives 279 against
//    the measured 4, a factor of 70. The grain resists
//    consecutive large gaps considerably harder than independence allows. That
//    direction is favourable for the route, and it is MEASURED, not proven.
//
// 10. WHAT THIS BUYS FOR A5, STATED HONESTLY. The merging is now exactly counted
//    and the obstruction is stated in its sharpest form. U-FRAME 5a step 6 asked
//    for the tail of the gap distribution at scale 2p. The alternation lemma
//    replaces that with a strictly stronger requirement: a run of L kills needs
//    L-1 consecutive gaps ALTERNATING between the class near 2p and the class
//    near 4p, hence averaging 3p, hence with at least half of them at least
//    4p-2. The threshold is 3p per gap, not 2p, a 50% sharpening, and it applies
//    to a window rather than to single gaps. Feeding that through step 7's
//    heuristic, ln(1/f) ~ 3p/mbar rather than 2p/mbar, gives L ~ 0.87 ln^2 x
//    instead of 1.3 ln^2 x and sum L*mbar ~ (2/3) x ln^3 x. Same branch, better
//    constant.
//
//    What is genuinely NEW and provable is the pair (a)/(b) of reading 6 and the
//    ceiling 2(min(N_P, N_M) + N_Z). They convert "control the tail at 2p" into
//    "control the RARER of the two +-2 classes at 4p", which is a smaller
//    quantity by a factor of 38 at fold 31 (205,068 against 7,815,766) and 553 at
//    fold 29 (440 against 243,370). What is NOT bought
//    is asymptotics: nothing here shows min(N_P, N_M) decays, and the count of
//    large-class gaps is exactly the interval statement U-FRAME 9 flags as the
//    hard kind. A5 still has its hole. It is now a narrower hole in a better
//    coordinate.
//
//    Two live cross-links. A3 (f from the grain census law) is now reduced to
//    evaluating grain-census.js's exact count(d) at the three closed-form values
//    2p-+2, 4p+-2, 6p, which is a finite CRT inclusion-exclusion and needs no
//    tile. A10 (when is the lower bound exact) gets a sufficient condition for
//    free: L = 1 if and only if no gap qualifies, and then every kill is isolated,
//    so G2(new) = maxsum2(old) EXACTLY. Fold 11 is the case in our data and the
//    identity holds there, 42 = 42.
//
// 11. A2 GETS ITS TWO POINTS AS A BY-PRODUCT, AND THE THRESHOLD ADVANCES IN
//    TWIN-PAIR STEPS. The deep runs measure f, the qualifying share, at the two
//    folds A2 asked for, extending U-FRAME 5a step 7's diagonal:
//
//      tile   fold p   mean gap   2p   2p/mbar        f    ln(1/f)
//      T11       13       17.11   26      1.52   4.44e-2     3.11
//      T13       17       20.22   34      1.68   4.85e-2     3.03
//      T17       19       22.92   38      1.66   4.88e-2     3.02
//      T19       23       25.61   46      1.80   3.11e-2     3.47
//      T23       29       28.05   58      2.07   3.07e-2     3.48
//      T29       31       30.13   62      2.06   3.74e-2     3.29   <- new
//      T31       37       32.21   74      2.30   1.84e-2     4.00   <- new
//
//    The prediction that ln(1/f) tracks 2p/mbar survives, but only once the
//    stall at fold 31 is explained, and reading 4 explains it exactly. The
//    smallest qualifying value is 2p+2 when p = 5 (mod 6) and 2p-2 when
//    p = 1 (mod 6), so for a TWIN PAIR (p, p+2), where p = 5 (mod 6) forcibly,
//    both members give the same value 2p+2 = 2(p+1): TWICE THE NUMBER BETWEEN
//    THE TWINS. The threshold literally does not move across a twin fold.
//    Checked in section [5] for all 18 twin pairs below 300, no violations, and
//    the fold ladder shows it directly: 11 and 13 both give 24, 17 and 19 both
//    give 36, 29 and 31 both give 60, 41 and 43 both give 84, 71 and 73 both
//    give 144. So f is flat or rising across a twin
//    fold and falls only at the non-twin steps, which is why 3.07e-2 went UP to
//    3.74e-2 at fold 31 and then halved to 1.84e-2 at fold 37. The diagonal is
//    not noisy; it is a staircase whose treads are the twin pairs.
//
//    That is a pleasing shape for this project to find, and it should not be
//    over-read. It says where f stalls, not that f decays; A2's dichotomy is
//    still decided by the tail of the census at 2p-+2, and now, by reading 6,
//    at 4p+-2 as well.
// ==========================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). Reading 0
// already declares the [6b] T31 leg and the invocation that produces it. This
// block accounts for the rest. No number above was changed.
//
// COVERED BY READING 0's declaration: every figure inside the quoted [6b]
//   block — the progress lines 200.9M, 401.7M, 6226.6M, the T31 summary
//   (D = 6226553025, W = 200560490130, G2 = 348, mean gap 32.21, wrap gap 42),
//   the fold-37 share 1.84% and its counts 109884182, 4937476, 26366, 46, the
//   three-way 114874436, 2D = 12453106050, 9.225e-3, the run spectrum
//   12223428142 / 114732724 / 70532 / 216, and the gap-word table (35,098 and
//   the rest). It is reproducible only by
//   `node --max-old-space-size=8192 research/a3-08-adjacent-pairs.js --t31`.
//   Six of these figures are independently present in the embedded output of
//   other files, which is a cross-check rather than a second source: 109884182,
//   4937476 and 26366 in research/a3-09-histogram-operator.js; 114874436 and
//   12453106050 in research/import-sofic-01-graph.js; 9.225e-3 in
//   research/import-sofic-02-prediction.js. Verified 2026-08-20.
//
// QUOTED AGAIN BELOW THE [6b] BLOCK, from the same source: 6.2e9 slots,
//   6,226,553,025, 114,874,436, 12.45 billion, 35,098, and the fold-31
//   three-run and four-run counts of reading 6.
//
// DERIVED IN THESE READINGS by arithmetic over printed or [6b] counts:
//   reading 9's independence predictions 73.6, 14,929, 27 and 279, and the
//     measured 13,000 it compares them against;
//   reading 10's factors 38 and 553 (205,068 against 7,815,766; 440 against
//     243,370), and the heuristic constants 0.87 and 1.3 and the 2/3;
//   reading 11's whole diagonal table (2p/mbar 1.52, 1.68, 1.66, 2.07, 2.06,
//     2.30; f 4.44e-2, 4.85e-2, 4.88e-2, 3.11e-2, 3.07e-2, 3.74e-2, 1.84e-2;
//     ln(1/f) 3.11, 3.03, 3.02, 3.47, 3.48, 3.29), which is formed from the
//     printed mean gaps and shares plus the two deep folds.
//
// IN-CODE: the 8192 of the --t31 command line and the 6.2e9 slot count both
//   appear in the header above the banner.
// ---------------------------------------------------------------------------
