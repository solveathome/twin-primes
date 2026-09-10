// import-sofic-01-graph.js
//
// FOREIGN IMPORT (IMPORT-MAP row 2), stage 1: CONSTRAINED CODING AND SYMBOLIC
// DYNAMICS. Build the Alternation Lemma's labelled graph explicitly, classify
// the shift it presents, and check the presentation against real tiles.
//
// THE IMPORT. A constrained system in the coding sense is the set of bi-infinite
// label sequences of a finite labelled directed graph; its capacity is
// log of the Perron root of the graph's adjacency matrix (Shannon, BSTJ 27,
// 1948; Lind and Marcus, "An Introduction to Symbolic Dynamics and Coding",
// CUP 1995, ch. 4; Marcus, Roth and Siegel, "Constrained systems and coding for
// recording channels"). A shift space is SOFIC iff it has such a presentation,
// and OF FINITE TYPE iff a FINITE forbidden list presents it. Right-resolving
// means the labels on the edges leaving a state are distinct.
//
// THE OBJECT. research/kappa-not-L.md's Alternation Lemma. The fold at p deletes
// a slot whose residue r satisfies r = 0 or r = -2 (mod p). Along a run of
// adjacent deleted slots the state is which of the two it is, and the letter is
// the gap class g mod p. From Z (r = 0) only g = 0 (stay Z) and g = -2 (go M)
// are legal; from M (r = -2) only g = 0 (stay M) and g = +2 (go Z).
//
// WHAT THIS FILE DOES. It states the presentation, classifies the shift, and
// runs the four VERIFIED-or-refuted criteria fixed in
// research/history/staging/import-sofic-prereg.md section 6. It computes NO
// exact L for citation: the exact per-fold L series is cited from
// research/U-FRAME.md section 5 and research/a3-10-lower-tightness.js, and the
// run scan here is a validation of the graph that also happens to agree with it.
//
// CUSTODY. Tiles T_3..T_23 are built here by iterated folding, which is cheap
// (sum over levels of p*D, about 8.7M slot writes). T_29 and T_31 are not built;
// their pair census is cited from research/operator-and-pair-count.md section 11.
'use strict';

const PRIMES = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];

// ---------------------------------------------------------------------------
// 0. The presentation.
// ---------------------------------------------------------------------------
// States 0 = Z (r = 0 mod p), 1 = M (r = -2 mod p).
// Edge labels live in {0, +2, -2}, the class of the gap mod p.
const EDGES = [
  { from: 0, to: 0, label: 0 },
  { from: 0, to: 1, label: -2 },
  { from: 1, to: 1, label: 0 },
  { from: 1, to: 0, label: +2 },
];
const ADJ = [[1, 1], [1, 1]];

function rightResolving() {
  for (const s of [0, 1]) {
    const ls = EDGES.filter(e => e.from === s).map(e => e.label);
    if (new Set(ls).size !== ls.length) return false;
  }
  return true;
}

// Accept a label word from a given start state; returns the set of start states
// from which it is accepted (as a count 0, 1 or 2).
function acceptFrom(word, start) {
  let s = start;
  for (const c of word) {
    const e = EDGES.find(x => x.from === s && x.label === c);
    if (!e) return false;
    s = e.to;
  }
  return true;
}
function acceptCount(word) {
  return (acceptFrom(word, 0) ? 1 : 0) + (acceptFrom(word, 1) ? 1 : 0);
}

// Perron root of a 2x2 non-negative integer matrix, by the characteristic poly.
function perron2(A) {
  const tr = A[0][0] + A[1][1], det = A[0][0] * A[1][1] - A[0][1] * A[1][0];
  return (tr + Math.sqrt(tr * tr - 4 * det)) / 2;
}

// ---------------------------------------------------------------------------
// 1. Tiles by iterated folding.
// ---------------------------------------------------------------------------
// T_3 = {5} mod 6. Fold by p: replicate p times, delete r = 0, -2 (mod p).
function buildTiles(xmax) {
  let W = 6, slots = [5];
  const out = { 3: { W, slots } };
  for (const p of PRIMES) {
    if (p === 3) continue;
    if (p > xmax) break;
    const nw = [];
    for (let k = 0; k < p; k++) {
      const off = k * W;
      for (let i = 0; i < slots.length; i++) {
        const s = slots[i] + off;
        const r = s % p;
        if (r === 0 || r === p - 2) continue;
        nw.push(s);
      }
    }
    nw.sort((a, b) => a - b);
    W = W * p; slots = nw;
    out[p] = { W, slots };
  }
  return out;
}

// Cyclic gap word of a tile: g_i = s_{i+1} - s_i, with the wrap gap closing it.
function gapWord(t) {
  const s = t.slots, D = s.length, g = new Float64Array(D);
  for (let i = 0; i < D - 1; i++) g[i] = s[i + 1] - s[i];
  g[D - 1] = t.W - s[D - 1] + s[0];
  return g;
}

// ---------------------------------------------------------------------------
// 2. The four criteria of the pre-registration, section 6.
// ---------------------------------------------------------------------------
const DIAG = [
  { x: 5,  p: 7  }, { x: 7,  p: 11 }, { x: 11, p: 13 }, { x: 13, p: 17 },
  { x: 17, p: 19 }, { x: 19, p: 23 }, { x: 23, p: 29 },
  { x: 29, p: 31 }, { x: 31, p: 37 },
];
// CITED, research/operator-and-pair-count.md section 11 (the weighted census:
// weight 2 on the p-divisible size, weight 1 on each of the two +-2 sizes).
const PAIRS_CITED = [2, 0, 6, 72, 1088, 11870, 243822, 8025014, 114874436];
// CITED, research/U-FRAME.md section 5 / a3-10-lower-tightness.js reading 1.
const L_CITED = [2, 1, 2, 2, 2, 3, 2, 4, 4];

function classOf(d, p) {                    // gap class mod p, or null
  const r = ((d % p) + p) % p;
  if (r === 0) return 0;
  if (r === 2) return 2;
  if (r === p - 2) return -2;
  return null;
}

// (b) weighted length-2 legal-window count from the graph = sum_i acceptCount([c_i]).
function windowCount(g, p, len) {           // len = number of SLOTS in the window
  const D = g.length;
  if (len === 1) return 2 * D;              // each slot is killed in exactly 2 copies
  let tot = 0;
  const word = new Array(len - 1);
  for (let i = 0; i < D; i++) {
    let ok = true;
    for (let j = 0; j < len - 1; j++) {
      const c = classOf(g[(i + j) % D], p);
      if (c === null) { ok = false; break; }
      word[j] = c;
    }
    if (ok) tot += acceptCount(word);
  }
  return tot;
}

// Direct scan of the FULL period (p copies), the only correct scan: W is not
// divisible by p, so the strike class shifts by W mod p at every copy boundary
// (research/import-maxplus-01-mapping.js reading 8).
function directScan(t, p, maxLen) {
  const s = t.slots, D = s.length, Wp = t.W % p;
  const counts = new Float64Array(maxLen + 2);   // counts[l] = # windows of l slots
  let run = 0, best = 0, firstRun = -1, sawGap = false;
  const runWords = [];                           // class words of maximal runs
  let cur = [];
  let prevKilled = false, prevRes = -1;
  const runLens = [];
  for (let k = 0; k < p; k++) {
    const shift = (k * Wp) % p;
    for (let i = 0; i < D; i++) {
      const r = (s[i] % p + shift) % p;
      const kill = (r === 0) || (r === p - 2);
      if (kill) {
        if (prevKilled) {
          const d = (i === 0) ? (t.W - s[D - 1] + s[0]) : (s[i] - s[i - 1]);
          cur.push(classOf(d, p));
        }
        run++;
        if (run > best) best = run;
      } else {
        if (!sawGap) { firstRun = run; sawGap = true; }
        if (run > 0) { runLens.push(run); if (run >= 2) runWords.push(cur.slice()); }
        run = 0; cur = [];
      }
      prevKilled = kill; prevRes = r;
    }
  }
  if (run > 0) { runLens.push(run); if (run >= 2) runWords.push(cur.slice()); }
  if (sawGap && run > 0 && firstRun > 0) {
    const joined = run + firstRun;
    if (joined > best) best = joined;
  }
  // window counts of each length from the run-length multiset
  for (const rl of runLens) for (let l = 1; l <= Math.min(rl, maxLen); l++) counts[l] += rl - l + 1;
  return { L: best, counts, runWords, runLens };
}

// ---------------------------------------------------------------------------
const out = [];
const say = (s) => out.push(s);

say('=== 1. THE PRESENTATION ===');
say('states: Z (r = 0 mod p), M (r = -2 mod p); alphabet {0, +2, -2} = gap class mod p');
for (const e of EDGES) say(`  ${e.from === 0 ? 'Z' : 'M'} --(${e.label >= 0 ? '+' : ''}${e.label})--> ${e.to === 0 ? 'Z' : 'M'}`);
say(`right-resolving: ${rightResolving()}`);
say(`adjacency matrix [[${ADJ[0]}],[${ADJ[1]}]]  Perron root = ${perron2(ADJ).toFixed(6)}`);
say(`capacity = ln(Perron) = ${Math.log(perron2(ADJ)).toFixed(6)} nats/symbol` +
    `  (= ${(Math.log(perron2(ADJ)) / Math.log(2)).toFixed(6)} bits)`);
say(`unconstrained ternary alphabet would be ln 3 = ${Math.log(3).toFixed(6)} nats`);
say(`capacity is INDEPENDENT of p: the alternation costs ln(3/2) = ${Math.log(1.5).toFixed(6)} nats/symbol`);

say('');
say('=== 2. CLASSIFICATION: strictly sofic, not of finite type ===');
// closed form for the number of legal words of length n, checked by brute force
let bruteOK = true, closedOK = true;
for (let n = 1; n <= 12; n++) {
  let cnt = 0;
  const alpha = [0, 2, -2];
  const rec = (w) => {
    if (w.length === n) { if (acceptCount(w) > 0) cnt++; return; }
    for (const a of alpha) { w.push(a); rec(w); w.pop(); }
  };
  if (n <= 12) rec([]);
  const closed = Math.pow(2, n + 1) - 1;
  if (cnt !== closed) closedOK = false;
  if (n <= 4) say(`  legal words of length ${n}: ${cnt}   closed form 2^(n+1)-1 = ${closed}`);
}
say(`  closed form 2^(n+1)-1 matches brute force at every n = 1..12: ${closedOK}`);
say(`  growth rate of the word count -> 2, so capacity ln 2, consistent with the Perron root`);
// not of finite type: -2 0^k -2 is forbidden for every k, but both halves are legal
let sfType = true;
for (let k = 0; k <= 40; k++) {
  const zeros = new Array(k).fill(0);
  const bad = [-2, ...zeros, -2];
  const halfL = [-2, ...zeros], halfR = [...zeros, -2];
  if (acceptCount(bad) !== 0 || acceptCount(halfL) === 0 || acceptCount(halfR) === 0) sfType = false;
  const bad2 = [2, ...zeros, 2];
  if (acceptCount(bad2) !== 0) sfType = false;
}
say(`  for every k = 0..40: (-2) 0^k (-2) and (+2) 0^k (+2) are FORBIDDEN while`);
say(`  (-2) 0^k and 0^k (-2) are both LEGAL: ${sfType}`);
say('  => no M-step forbidden list presents this shift (take k = M and glue the two legal');
say('     halves on their common 0^M): the shift is STRICTLY SOFIC, not an SFT.');
say('  owning convention: this is the bounded-charge / DC-free (bounded running');
say('  digital sum) constraint of magnetic recording, charge window {0,-2},');
say('  which is the standard textbook example of a strictly sofic constraint.');

say('');
say('=== 3. THE PRESENTATION AGAINST REAL TILES ===');
const tiles = buildTiles(23);
say('tile   D            W');
for (const x of [3, 5, 7, 11, 13, 17, 19, 23]) say(`T_${String(x).padEnd(4)} ${String(tiles[x].slots.length).padEnd(12)} ${tiles[x].W}`);

say('');
say('(b) weighted legal 2-windows from the graph vs the cited PAIRS census');
say('fold p  tile   graph sum_i acceptCount(c_i)   PAIRS cited   match');
const built = DIAG.filter(d => d.x <= 23);
const gw = {};
let bOK = true;
for (let i = 0; i < built.length; i++) {
  const { x, p } = built[i];
  const g = gapWord(tiles[x]); gw[x] = g;
  const w2 = windowCount(g, p, 2);
  const ok = (w2 === PAIRS_CITED[i]);
  if (!ok) bOK = false;
  say(`  ${String(p).padEnd(6)}T_${String(x).padEnd(5)}${String(w2).padEnd(30)}${String(PAIRS_CITED[i]).padEnd(14)}${ok}`);
}
say(`(b) verdict on the seven buildable folds: ${bOK ? 'MATCH at all seven' : 'MISMATCH'}`);
say('  folds 31 and 37 are not built here; their PAIRS are cited, not checked.');

say('');
say('(a)+(c) full-period scan vs the graph, folds 7..29');
say('fold p  L(scan)  L(cited)  agree   all run class words graph-legal   window counts l=1..5 agree');
let aOK = true, cOK = true;
const scanRows = [];
for (let i = 0; i < built.length; i++) {
  const { x, p } = built[i];
  const MAXL = 5;
  const sc = directScan(tiles[x], p, MAXL);
  let legal = true;
  for (const w of sc.runWords) if (acceptCount(w) === 0) legal = false;
  if (!legal) aOK = false;
  const pred = [];
  let wok = true;
  for (let l = 1; l <= MAXL; l++) {
    const gpred = windowCount(gw[x], p, l);
    pred.push(gpred);
    if (gpred !== sc.counts[l]) wok = false;
  }
  if (!wok) cOK = false;
  const agree = (sc.L === L_CITED[i]);
  say(`  ${String(p).padEnd(6)}${String(sc.L).padEnd(9)}${String(L_CITED[i]).padEnd(10)}${String(agree).padEnd(8)}${String(legal).padEnd(31)}${wok}`);
  scanRows.push({ p, pred, direct: Array.from(sc.counts.slice(1, MAXL + 1)) });
}
say(`(a) verdict: every maximal run class word accepted by the graph: ${aOK}`);
say(`(c) verdict: graph window counts = direct full-period counts, l = 1..5: ${cOK}`);

say('');
say('the window-count ladder, graph = direct (both columns identical where (c) holds)');
say('fold p   l=1           l=2           l=3        l=4     l=5');
for (const r of scanRows) {
  say(`  ${String(r.p).padEnd(7)}${r.pred.map((v, j) => String(v).padEnd([14, 14, 11, 8, 8][j])).join('')}`);
}

say('');
say('=== 4. THE PER-STEP RATE THE GRAPH GIVES, AND WHY IT IS 2/p AND NOT 3/p ===');
say('from Z the legal classes are {0, -2}; from M they are {0, +2}. The QUALIFYING');
say('fraction is 3 residues in p (kappa-not-L.md), but the CONTINUATION probability');
say('from a state is 2 residues in p. Under uniform gap residues the graph therefore');
say('runs at 2/p per step, not 3/p; equivalently sum_i acceptCount(c_i) = 4D/p, which');
say('is the weight-(1,1,2) census with its weight 2 on the p-divisible class.');
say('');
say('fold p  D           kills=2D      PAIRS        f_edge=PAIRS/2D   uniform 2/p    ratio meas/unif');
const DTAB = [3, 15, 135, 1485, 22275, 378675, 7952175, 214708725, 6226553025];
for (let i = 0; i < DIAG.length; i++) {
  const p = DIAG[i].p, D = DTAB[i], pr = PAIRS_CITED[i];
  const fe = pr / (2 * D), fu = 2 / p;
  say(`  ${String(p).padEnd(6)}${String(D).padEnd(12)}${String(2 * D).padEnd(14)}${String(pr).padEnd(13)}` +
      `${fe.toExponential(4).padEnd(18)}${fu.toExponential(4).padEnd(15)}${(fe / fu).toFixed(4)}`);
}
say('D at folds 31 and 37 is the closed form prod_{3<=q<=x}(q-2); 6,226,553,025 for T_31');
say('agrees with research/operator-and-pair-count.md.');

console.log(out.join('\n'));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/import-sofic-01-graph.js
//   invocation:  node research/import-sofic-01-graph.js
//   code-sha256: 96745e67f1346d99814d53a97cb673e53ab49e371f70baaee36f3fce45c24e68
//   out-sha256:  cc11bc034d906373d18eb7682bad1c201ad180fdf09c88c36f724e50f8b08683
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     2.7 s
// ============================================================================
// === 1. THE PRESENTATION ===
// states: Z (r = 0 mod p), M (r = -2 mod p); alphabet {0, +2, -2} = gap class mod p
//   Z --(+0)--> Z
//   Z --(-2)--> M
//   M --(+0)--> M
//   M --(+2)--> Z
// right-resolving: true
// adjacency matrix [[1,1],[1,1]]  Perron root = 2.000000
// capacity = ln(Perron) = 0.693147 nats/symbol  (= 1.000000 bits)
// unconstrained ternary alphabet would be ln 3 = 1.098612 nats
// capacity is INDEPENDENT of p: the alternation costs ln(3/2) = 0.405465 nats/symbol
//
// === 2. CLASSIFICATION: strictly sofic, not of finite type ===
//   legal words of length 1: 3   closed form 2^(n+1)-1 = 3
//   legal words of length 2: 7   closed form 2^(n+1)-1 = 7
//   legal words of length 3: 15   closed form 2^(n+1)-1 = 15
//   legal words of length 4: 31   closed form 2^(n+1)-1 = 31
//   closed form 2^(n+1)-1 matches brute force at every n = 1..12: true
//   growth rate of the word count -> 2, so capacity ln 2, consistent with the Perron root
//   for every k = 0..40: (-2) 0^k (-2) and (+2) 0^k (+2) are FORBIDDEN while
//   (-2) 0^k and 0^k (-2) are both LEGAL: true
//   => no M-step forbidden list presents this shift (take k = M and glue the two legal
//      halves on their common 0^M): the shift is STRICTLY SOFIC, not an SFT.
//   owning convention: this is the bounded-charge / DC-free (bounded running
//   digital sum) constraint of magnetic recording, charge window {0,-2},
//   which is the standard textbook example of a strictly sofic constraint.
//
// === 3. THE PRESENTATION AGAINST REAL TILES ===
// tile   D            W
// T_3    1            6
// T_5    3            30
// T_7    15           210
// T_11   135          2310
// T_13   1485         30030
// T_17   22275        510510
// T_19   378675       9699690
// T_23   7952175      223092870
//
// (b) weighted legal 2-windows from the graph vs the cited PAIRS census
// fold p  tile   graph sum_i acceptCount(c_i)   PAIRS cited   match
//   7     T_5    2                             2             true
//   11    T_7    0                             0             true
//   13    T_11   6                             6             true
//   17    T_13   72                            72            true
//   19    T_17   1088                          1088          true
//   23    T_19   11870                         11870         true
//   29    T_23   243822                        243822        true
// (b) verdict on the seven buildable folds: MATCH at all seven
//   folds 31 and 37 are not built here; their PAIRS are cited, not checked.
//
// (a)+(c) full-period scan vs the graph, folds 7..29
// fold p  L(scan)  L(cited)  agree   all run class words graph-legal   window counts l=1..5 agree
//   7     2        2         true    true                           true
//   11    1        1         true    true                           true
//   13    2        2         true    true                           true
//   17    2        2         true    true                           true
//   19    2        2         true    true                           true
//   23    3        3         true    true                           true
//   29    2        2         true    true                           true
// (a) verdict: every maximal run class word accepted by the graph: true
// (c) verdict: graph window counts = direct full-period counts, l = 1..5: true
//
// the window-count ladder, graph = direct (both columns identical where (c) holds)
// fold p   l=1           l=2           l=3        l=4     l=5
//   7      6             2             0          0       0
//   11     30            0             0          0       0
//   13     270           6             0          0       0
//   17     2970          72            0          0       0
//   19     44550         1088          0          0       0
//   23     757350        11870         62         0       0
//   29     15904350      243822        0          0       0
//
// === 4. THE PER-STEP RATE THE GRAPH GIVES, AND WHY IT IS 2/p AND NOT 3/p ===
// from Z the legal classes are {0, -2}; from M they are {0, +2}. The QUALIFYING
// fraction is 3 residues in p (kappa-not-L.md), but the CONTINUATION probability
// from a state is 2 residues in p. Under uniform gap residues the graph therefore
// runs at 2/p per step, not 3/p; equivalently sum_i acceptCount(c_i) = 4D/p, which
// is the weight-(1,1,2) census with its weight 2 on the p-divisible class.
//
// fold p  D           kills=2D      PAIRS        f_edge=PAIRS/2D   uniform 2/p    ratio meas/unif
//   7     3           6             2            3.3333e-1         2.8571e-1      1.1667
//   11    15          30            0            0.0000e+0         1.8182e-1      0.0000
//   13    135         270           6            2.2222e-2         1.5385e-1      0.1444
//   17    1485        2970          72           2.4242e-2         1.1765e-1      0.2061
//   19    22275       44550         1088         2.4422e-2         1.0526e-1      0.2320
//   23    378675      757350        11870        1.5673e-2         8.6957e-2      0.1802
//   29    7952175     15904350      243822       1.5331e-2         6.8966e-2      0.2223
//   31    214708725   429417450     8025014      1.8688e-2         6.4516e-2      0.2897
//   37    6226553025  12453106050   114874436    9.2246e-3         5.4054e-2      0.1707
// D at folds 31 and 37 is the closed form prod_{3<=q<=x}(q-2); 6,226,553,025 for T_31
// agrees with research/operator-and-pair-count.md.
// ============================================================================
// READINGS
//
// 1. THE PRESENTATION IS EXACT AND RIGHT-RESOLVING, AND IT IS ONE GRAPH FOR
//    EVERY p. Two states Z and M, four edges, labels {0, +2, -2} = the gap class
//    mod p. The two labels leaving each state are distinct, so the presentation
//    is right-resolving as IMPORT-MAP row 2 claims. The unlabelled adjacency
//    matrix is [[1,1],[1,1]], Perron root exactly 2, capacity ln 2 = 0.693147
//    nats = 1 bit per symbol. The capacity does NOT depend on p: p enters only
//    through the measure on the letters, never through the graph. That is the
//    first thing the import settles and it settles it in the negative direction
//    for anyone hoping capacity would carry the p-dependence.
//
// 2. THE SHIFT IS STRICTLY SOFIC, NOT OF FINITE TYPE. VERIFIED constructively:
//    for every k = 0..40, (-2) 0^k (-2) and (+2) 0^k (+2) are rejected while both
//    (-2) 0^k and 0^k (-2) are accepted. An M-step SFT containing both halves
//    must contain their overlap-glue at k = M, so no finite forbidden list
//    presents this language. The Alternation Lemma is therefore genuinely a
//    sofic constraint and not a local rule, which is the technically correct
//    version of "the class word is a two-state walk rather than a word avoiding
//    three residues".
//
// 3. THE LEGAL-WORD COUNT HAS A CLOSED FORM: 2^(n+1) - 1 words of length n over
//    the three letters, VERIFIED against brute-force enumeration at n = 1..12.
//    The count is a word count and not a window length, which is exactly the
//    caution IMPORT-MAP row 2 already carries: capacity bounds how MANY legal
//    words there are, never how LONG the longest legal factor of a given
//    periodic word is.
//
// 4. THE OWNING CONVENTION, NAMED. Letters 0 and +-2 whose running sum is
//    confined to {0, -2} is the bounded running digital sum, i.e. the
//    bounded-charge or DC-free constraint of magnetic recording (Lind and
//    Marcus 1995 ch. 4; Marcus, Roth and Siegel). That is the textbook family
//    to search, and it is the row's PUBLISHED-ANCHOR content.
//
// 5. CRITERION (b) VERIFIED AT ALL SEVEN BUILDABLE FOLDS. The graph's weighted
//    count of legal 2-windows, sum_i acceptCount(class of d_i), reproduces the
//    cited PAIRS census 2, 0, 6, 72, 1088, 11870, 243822 exactly at folds
//    7..29. The weight-(1,1,2) multiplicity of kappa-not-L.md is not an extra
//    rule: it IS acceptCount, 2 for the all-zero word because both start states
//    accept it and 1 for a word with a nonzero letter because only one does.
//
// 6. CRITERIA (a) AND (c) VERIFIED. Every maximal adjacent-kill run found by a
//    full-period scan at folds 7..29 has a class word the graph accepts, and the
//    graph's window counts equal the direct full-period counts at every length
//    l = 1..5, at every one of the seven folds. The full ladder is printed:
//    for example fold 23 has 757350 kills, 11870 legal 2-windows and 62 legal
//    3-windows, and fold 29 has 243822 2-windows and ZERO 3-windows, which is
//    the alternation-forced dip of kappa-not-L.md seen as a window count.
//
// 7. THE SCAN AGREES WITH THE CITED EXACT L AT ALL SEVEN, row by row in the
//    L(scan)/L(cited) columns above. That is
//    a by-product used as validation of the instrument, not a new measurement:
//    the scored L series is CITED from U-FRAME section 5 and
//    a3-10-lower-tightness.js, and folds 31 and 37 are not scanned here.
//
// 8. THE RATE THE GRAPH GIVES IS 2/p, NOT 3/p, AND THAT IS A CORRECTION TO THE
//    MAP'S FORMULA. The qualifying fraction is 3 residues in p, but from a given
//    state only 2 of the 3 are legal: 0 and one of +-2. So the graph's per-step
//    continuation probability under uniform gap residues is 2/p, and the
//    expected weighted 2-window count is 4D/p. The map's ln(1/f) with f = 3/p is
//    the wrong denominator for a first-moment run law on this graph.
//
// 9. AND THE UNIFORM RATE IS NOT THE OBJECT'S RATE. The measured edge weight
//    f_edge = PAIRS/2D runs 0.1444, 0.2061, 0.2320, 0.1802, 0.2223, 0.2897, 0.1707
//    times the uniform 2/p at folds 13..37: the object's gaps are five to seven
//    times less likely to qualify than uniform residues would make them, because
//    the smallest qualifying gap is 2p-2 and sits in the tail. f_edge is exactly
//    half the independently measured f of U-FRAME section 5a step 7 at every
//    fold, which is the consistency check between this graph and that census.
//
// 10. WHAT THIS FILE DOES NOT SHOW. It proves no bound on L, on kappa(m) or on
//    G2. It does not build T_29 or T_31 and it does not verify the PAIRS census
//    at folds 31 and 37. Capacity is computed for the graph, not for the
//    measure, and the capacity of a constrained system says nothing about the
//    longest legal factor of one given periodic word, which remains the gap
//    IMPORT-MAP row 2 names and which this file does not close.
