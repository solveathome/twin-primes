// ============================================================================
// ATTACK FOLD-L 01 — THE CHANNEL-COMPATIBLE RUN CENSUS, AND THE FORCED CEILING
//
// THE QUESTION. L, the longest adjacent-kill run at a fold, is bounded in
// `research/kappa-not-L.md` by two things that both live in the OLD gap word:
// condition (i), every run gap is at least the minimum qualifying value, and
// condition (ii), the Alternation Lemma, every adjacent PAIR costs 6p'. Both
// throw away the ALPHABET: they charge the abstract class minima 2p'-+2 and
// 4p'+-2 whether or not those values occur as gaps of T_x at all. This script
// puts the alphabet back and asks what it is worth.
//
// THE OBJECTS, RE-DERIVED HERE AND NOT INHERITED.
//   Tile T_x = { r mod P_x : r !== 0 and r !== -2 (mod p) for every p <= x }.
//   Folding by p' > x: copy k sits at offset k*P_x. With w = P_x mod p' and
//   a = -k*w, the slot with residue r_i mod p' dies in copy k iff
//        r_i === a      (CHANNEL A: p' divides r), or
//        r_i === a - 2  (CHANNEL B: p' divides r+2).
//   w is invertible mod p', so as k runs over 0..p'-1, a runs over all of
//   Z_{p'}: a fold is exactly one two-class deletion per ALIGNMENT a.
//
// THE COMPATIBILITY LEMMA, derived in code below and checked by brute force.
//   Two slots at gap g both die at alignment a iff both land in {a, a-2}:
//        (A,A) and (B,B)  need  g === 0   (mod p')
//        (A,B)            needs g === -2  (mod p')
//        (B,A)            needs g === +2  (mod p')
//   so the STATE WALK is: from A the legal classes are {Z, M} = {0, -2},
//   from B they are {Z, P} = {0, +2}. Non-zero classes strictly alternate.
//   Because a can be recovered from the first slot of a run (a = r_i for a
//   start in state A, a = r_i + 2 for a start in state B), EVERY
//   alternation-legal window of the real gap word is realised by a real copy.
//   Hence the longest alternation-legal window of the word IS the true L,
//   exactly, with no slack. That identity is checked below against the
//   published diagonal L = 2,1,2,2,2,3,2,4 at p' = 7..31.
//
// THE FOUR COLUMNS OF THE TABLE.
//   TRUE L      the longest alternation-legal window of the real gap word.
//               Exact on a full tile; a window LOWER bound on a segment.
//   FORCED      1 + max{k : cminAlpha(k) <= maxsum_k(T_x)}, where cminAlpha(k)
//               is the cheapest alternation-legal word of k gaps built only
//               from values that ACTUALLY OCCUR in T_x's alphabet. This is the
//               forced ceiling: it relaxes "consecutive in the word" to "sum
//               fits inside some window of k consecutive gaps", and keeps the
//               alphabet and the alternation.
//   THEOREM B   1 + max{k : cminAbs(k) <= maxsum_k}, the same with the
//               ABSTRACT class minima {6p', 2p'-+2, 4p'+-2}, i.e. A5's proven
//               bound. FORCED <= THEOREM B by construction.
//   BRIDGE      1 + max{k : maxsum_k >= k*c1}, condition (i) alone, c1 the
//               minimum qualifying value. Reported in the brief's literal form
//               k*(2p'-2) AND in the corrected form k*(2p'-+2), because
//               2p'-2 is the minimum only for p' === 1 (mod 6); for
//               p' === 5 (mod 6) it is 2p'+2 and the literal form inflates.
//
// WHY FORCED IS A GENUINE UPPER BOUND ON L. A run of L slots has L-1
// consecutive gaps of T_x. Their sum is at most maxsum_{L-1} by definition.
// Each is a value present in the alphabet, and the class word alternates, so
// the sum is at least cminAlpha(L-1). Hence cminAlpha(L-1) <= maxsum_{L-1}.
// Nothing is assumed about multiplicities beyond presence; where a multiplicity
// would bind (only the tiniest tiles) the run is flagged.
//
// COVERAGE. Exact full-period tiles T_5..T_29 (T_29 is streamed, never stored:
// 2.15e8 slots over a period of 6.47e9). Then segmented windows [0, N) at
// x = 31, 37, 41, 43, whose every column is a LOWER bound and is labelled so.
// ============================================================================
'use strict';

const PRIMES = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67];
const K = 32;              // maxsum window depth
const REPLAY = 96;         // gaps replayed to close the cycle on a full tile
const NFOLDS = 6;          // how many future primes per level
const pad = (s, n) => String(s).padEnd(n);
const lpad = (s, n) => String(s).padStart(n);

// ---------------------------------------------------------------------------
// 0. THE COMPATIBILITY LEMMA, BY BRUTE FORCE
// Derive, rather than assume, which gaps admit a joint kill and in which
// channel combination. For every odd prime p' and every gap g in a wide range,
// test all p' alignments directly.
// ---------------------------------------------------------------------------
function bruteCombos(p, g) {
  // returns the set of channel combos (s0,s1) realisable at some alignment a
  const out = new Set();
  for (let a = 0; a < p; a++) {
    for (let r = 0; r < p; r++) {
      const s0 = (r === a) ? 'A' : (r === ((a - 2) % p + p) % p) ? 'B' : null;
      if (!s0) continue;
      const r1 = (r + g) % p;
      const s1 = (r1 === a) ? 'A' : (r1 === ((a - 2) % p + p) % p) ? 'B' : null;
      if (!s1) continue;
      out.add(s0 + s1);
    }
  }
  return out;
}
function predictedCombos(p, g) {
  const m = ((g % p) + p) % p;
  const out = new Set();
  if (m === 0) { out.add('AA'); out.add('BB'); }
  if (m === (p - 2) % p) out.add('AB');
  if (m === 2 % p) out.add('BA');
  return out;
}

console.log('=== 0. THE COMPATIBILITY LEMMA, DERIVED BY BRUTE FORCE ==============');
{
  let cells = 0, bad = 0, firstBad = null;
  for (const p of PRIMES) {
    if (p < 5) continue;
    for (let g = 6; g <= 12 * p + 12; g += 6) {
      const B = bruteCombos(p, g), P = predictedCombos(p, g);
      cells++;
      const eq = B.size === P.size && [...B].every(c => P.has(c));
      if (!eq) { bad++; if (!firstBad) firstBad = { p, g, B: [...B], P: [...P] }; }
    }
  }
  console.log('cells tested (p\' in 5..67, g = 6..12p\'+12 step 6): ' + cells);
  console.log('mismatches between brute force and the predicted combo rule: ' + bad);
  if (firstBad) console.log('first mismatch: ' + JSON.stringify(firstBad));
  // minimum qualifying gap, both residue branches
  console.log('');
  console.log("p'   p' mod 6   min qualifying gap   2p'-2   2p'+2   class(min)   the 3 minima  {Z, P, M}");
  for (const p of PRIMES) {
    if (p < 5) continue;
    let gmin = null;
    for (let g = 6; g <= 12 * p; g += 6) { if (predictedCombos(p, g).size) { gmin = g; break; } }
    let zmin = null, pmin = null, mmin = null;
    for (let g = 6; g <= 20 * p; g += 6) {
      const m = g % p;
      if (m === 0 && zmin === null) zmin = g;
      if (m === 2 && pmin === null) pmin = g;
      if (m === p - 2 && mmin === null) mmin = g;
    }
    const cls = (gmin % p === 2) ? 'P (+2)' : (gmin % p === p - 2) ? 'M (-2)' : 'Z (0)';
    console.log(lpad(p, 4) + lpad(p % 6, 10) + lpad(gmin, 21) + lpad(2 * p - 2, 8) +
      lpad(2 * p + 2, 8) + '   ' + pad(cls, 13) + '{' + zmin + ', ' + pmin + ', ' + mmin + '}' +
      '   pmin+mmin = ' + (pmin + mmin) + (pmin + mmin === 6 * p ? ' = 6p\'' : ' <-- NOT 6p\''));
  }
}

// ---------------------------------------------------------------------------
// 1. TILES. Built by folding; T_5..T_23 stored as gap words, T_29 streamed.
// ---------------------------------------------------------------------------
function seedTile() { return { x: 3, P: 6, D: 1, first: 5, gaps: Int32Array.from([6]) }; }

function foldStored(tile, p) {
  const newP = tile.P * p, D = tile.D, out = [];
  let pos = tile.first;
  const total = D * p;
  for (let i = 0; i < total; i++) {
    const r = pos % p;
    if (r !== 0 && r !== p - 2) out.push(pos);
    pos += tile.gaps[i % D];
  }
  const nD = out.length;
  const gaps = new Int32Array(nD);
  for (let i = 0; i + 1 < nD; i++) gaps[i] = out[i + 1] - out[i];
  gaps[nD - 1] = newP + out[0] - out[nD - 1];
  return { x: p, P: newP, D: nD, first: out[0], gaps };
}

// Stream the gaps of fold(tile, p) without materialising them.
function foldStream(tile, p, emit) {
  const D = tile.D, total = D * p, newP = tile.P * p;
  let pos = tile.first, prev = -1, firstAlive = -1, n = 0;
  for (let i = 0; i < total; i++) {
    const r = pos % p;
    if (r !== 0 && r !== p - 2) {
      if (prev < 0) firstAlive = pos; else emit(pos - prev);
      prev = pos; n++;
    }
    pos += tile.gaps[i % D];
  }
  emit(newP + firstAlive - prev);
  return { D: n + 0, P: newP, first: firstAlive };
}

// ---------------------------------------------------------------------------
// 2. THE CONSUMER: one streaming pass yields the alphabet, the maxsum table,
// and the true L (with its extremal word) at every fold at once.
// ---------------------------------------------------------------------------
function makeConsumer(folds) {
  // WIDTH GUARD (2026-08-21). `hist` is indexed by gap/6, and 4096 is a bare
  // literal with no relation to the data: an index at or above hist.length is an
  // OUT-OF-BOUNDS typed-array write, which JavaScript DISCARDS in silence rather
  // than throwing, so the failure mode is an alphabet that quietly loses its own
  // tail while nGaps and every other count stays right. The container fits any
  // gap below 6*4096 = 24576; the largest G2 anywhere in this corpus is 1710 at
  // x = 79 (index 285), so the margin at every level run is 14x and no embedded
  // figure is affected. The throw below is what makes the edge loud if this
  // census is ever pointed at a level whose maximum gap reaches 24576.
  const hist = new Int32Array(4096);          // index = gap/6
  const ps = new Float64Array(K + 1);         // circular prefix sums
  const best = new Float64Array(K + 1);
  const ring = new Int32Array(REPLAY + 4);
  let cum = 0, idx = 0, nGaps = 0;
  const F = folds.length;
  const bA = new Int32Array(F).fill(1), bB = new Int32Array(F).fill(1);
  const maxL = new Int32Array(F).fill(1);
  const words = folds.map(() => []);
  return {
    push(g) {
      const hi = g / 6;
      if (!(hi >= 0 && hi < hist.length))
        throw new Error(`foldL census: gap ${g} lands at histogram index ${hi}, outside the `
          + `${hist.length}-bucket alphabet (gaps to ${6 * hist.length - 6}); the write would be discarded in silence`);
      hist[hi]++; nGaps++;
      ring[nGaps % (REPLAY + 4)] = g;
      cum += g; idx++;
      ps[idx % (K + 1)] = cum;
      const kmax = idx < K ? idx : K;
      for (let k = 1; k <= kmax; k++) {
        const c = cum - ps[(idx - k + K + 1) % (K + 1)];
        if (c > best[k]) best[k] = c;
      }
      for (let f = 0; f < F; f++) {
        const p = folds[f], m = g % p;
        let nA, nB;
        if (m === 0) { nA = bA[f] + 1; nB = bB[f] + 1; }
        else if (m === 2) { nA = bB[f] + 1; nB = 1; }
        else if (m === p - 2) { nA = 1; nB = bA[f] + 1; }
        else { nA = 1; nB = 1; }
        bA[f] = nA; bB[f] = nB;
        const b = nA > nB ? nA : nB;
        if (b > maxL[f]) {
          maxL[f] = b;
          const w = [];
          for (let j = b - 1; j >= 1; j--) w.push(ring[(nGaps - j + 1 + 10 * (REPLAY + 4)) % (REPLAY + 4)]);
          words[f] = w;
        }
      }
    },
    // gaps pushed during replay must not be counted again in the alphabet
    pushReplay(g) { if (g / 6 < hist.length) hist[g / 6]--; this.push(g); },
    result() {
      const alphabet = [];
      for (let i = 0; i < hist.length; i++) if (hist[i] > 0) alphabet.push([i * 6, hist[i]]);
      const maxsum = new Array(K + 1).fill(0);
      for (let k = 1; k <= K; k++) maxsum[k] = best[k];
      return { alphabet, maxsum, nGaps, trueL: Array.from(maxL), words };
    }
  };
}

// ---------------------------------------------------------------------------
// 3. THE LEGAL-WORD DP. cmin(k) = cheapest alternation-legal word of k gaps.
// h(k, A) = min(Z + h(k-1,A), M + h(k-1,B));  h(k, B) = min(Z + h(k-1,B), P + h(k-1,A))
// Values are the class minima available; INF for a class with no representative.
// ---------------------------------------------------------------------------
const INF = Infinity;
function cminTable(Z, P, M, kmax) {
  const hA = new Array(kmax + 1).fill(INF), hB = new Array(kmax + 1).fill(INF);
  const wA = new Array(kmax + 1).fill(null), wB = new Array(kmax + 1).fill(null);
  hA[0] = 0; hB[0] = 0; wA[0] = []; wB[0] = [];
  for (let k = 1; k <= kmax; k++) {
    let a = INF, aw = null;
    if (Z < INF && hA[k - 1] < INF && Z + hA[k - 1] < a) { a = Z + hA[k - 1]; aw = [['Z', Z]].concat(wA[k - 1]); }
    if (M < INF && hB[k - 1] < INF && M + hB[k - 1] < a) { a = M + hB[k - 1]; aw = [['M', M]].concat(wB[k - 1]); }
    let b = INF, bw = null;
    if (Z < INF && hB[k - 1] < INF && Z + hB[k - 1] < b) { b = Z + hB[k - 1]; bw = [['Z', Z]].concat(wB[k - 1]); }
    if (P < INF && hA[k - 1] < INF && P + hA[k - 1] < b) { b = P + hA[k - 1]; bw = [['P', P]].concat(wA[k - 1]); }
    hA[k] = a; wA[k] = aw; hB[k] = b; wB[k] = bw;
  }
  const cmin = new Array(kmax + 1), word = new Array(kmax + 1);
  for (let k = 0; k <= kmax; k++) {
    if (hA[k] <= hB[k]) { cmin[k] = hA[k]; word[k] = wA[k]; }
    else { cmin[k] = hB[k]; word[k] = wB[k]; }
  }
  return { cmin, word };
}

function ceilingFrom(cmin, maxsum, kmax) {
  let bestK = 0, gaps = [];
  for (let k = 1; k <= kmax; k++) {
    if (cmin[k] <= maxsum[k]) { bestK = k; } else gaps.push(k);
  }
  // is the feasible set an initial segment?
  let initial = true;
  for (let k = 1; k <= bestK; k++) if (!(cmin[k] <= maxsum[k])) initial = false;
  return { ceiling: bestK + 1, initialSegment: initial };
}

// ---------------------------------------------------------------------------
// 4. SEGMENTED WINDOW for x beyond the walkable period.
// r = 6t + 5. r === 0 (mod p) <=> t === -5/6, r === -2 (mod p) <=> t === -7/6.
// ---------------------------------------------------------------------------
function inv(a, m) { let g = m, x = 0, x1 = 1, aa = ((a % m) + m) % m; while (aa) { const q = (g / aa) | 0; [g, aa] = [aa, g - q * aa]; [x, x1] = [x1, x - q * x1]; } return ((x % m) + m) % m; }

function windowStream(x, TMAX, consumer) {
  const ps = PRIMES.filter(p => p >= 5 && p <= x);
  const starts = ps.map(p => {
    const i6 = inv(6, p);
    return [p, (((-5 * i6) % p) + p) % p, (((-7 * i6) % p) + p) % p];
  });
  const SEG = 1 << 22;
  const seg = new Uint8Array(SEG);
  let prev = -1, first = -1, n = 0;
  for (let base = 0; base < TMAX; base += SEG) {
    const len = Math.min(SEG, TMAX - base);
    seg.fill(0, 0, len);
    for (const [p, s1, s2] of starts) {
      for (const s of [s1, s2]) {
        let j = (s - (base % p) + p) % p;
        for (; j < len; j += p) seg[j] = 1;
      }
    }
    for (let j = 0; j < len; j++) {
      if (seg[j]) continue;
      const r = 6 * (base + j) + 5;
      if (prev < 0) first = r; else consumer.push(r - prev);
      prev = r; n++;
    }
  }
  return { n, span: 6 * TMAX, first, last: prev };
}

// ---------------------------------------------------------------------------
// 5. RUN THE CENSUS
// ---------------------------------------------------------------------------
function nextPrimes(x, howMany) { return PRIMES.filter(p => p > x).slice(0, howMany); }

const LEVELS = [];   // { x, D, P, mbar, alphabet, maxsum, trueL, folds, exact }

console.log('');
console.log('=== 1. EXACT TILES: BUILD AND CENSUS ================================');
let t = seedTile();
const stored = {};
for (const p of [5, 7, 11, 13, 17, 19, 23]) { t = foldStored(t, p); stored[p] = t; }

for (const x of [5, 7, 11, 13, 17, 19, 23]) {
  const tile = stored[x];
  const folds = nextPrimes(x, NFOLDS);
  const C = makeConsumer(folds);
  for (let i = 0; i < tile.D; i++) C.push(tile.gaps[i]);
  for (let i = 0; i < Math.min(REPLAY, tile.D); i++) C.pushReplay(tile.gaps[i]);
  const R = C.result();
  LEVELS.push({ x, D: tile.D, P: tile.P, folds, exact: true, ...R });
  console.log('T_' + x + ': D = ' + tile.D + ', P = ' + tile.P + ', mbar = ' + (tile.P / tile.D).toFixed(3) +
    ', G2 = ' + R.maxsum[1] + ', distinct gap values = ' + R.alphabet.length);
  console.log('   alphabet {value: count} = ' + R.alphabet.map(([v, c]) => v + ':' + c).join(' '));
}

// T_29 streamed from T_23
{
  const x = 29, folds = nextPrimes(29, NFOLDS);
  const C = makeConsumer(folds);
  const head = [];
  let seen = 0;
  const meta = foldStream(stored[23], 29, g => { if (seen < REPLAY) head.push(g); seen++; C.push(g); });
  for (const g of head) C.pushReplay(g);
  const R = C.result();
  LEVELS.push({ x, D: meta.D, P: meta.P, folds, exact: true, ...R });
  console.log('T_29: D = ' + meta.D + ', P = ' + meta.P + ', mbar = ' + (meta.P / meta.D).toFixed(3) +
    ', G2 = ' + R.maxsum[1] + ', distinct gap values = ' + R.alphabet.length);
  console.log('   alphabet {value: count} = ' + R.alphabet.map(([v, c]) => v + ':' + c).join(' '));
}

console.log('');
console.log('=== 2. SEGMENTED WINDOWS [0, N) FOR x BEYOND THE WALKABLE PERIOD ====');
console.log('every column from these rows is a WINDOW LOWER BOUND, never a tile value');
const TMAX = Number(process.env.FOLDL_TMAX || 1e9);
for (const x of [31, 37, 41, 43]) {
  const folds = nextPrimes(x, NFOLDS);
  const C = makeConsumer(folds);
  const meta = windowStream(x, TMAX, C);
  const R = C.result();
  LEVELS.push({ x, D: meta.n, P: meta.span, folds, exact: false, ...R });
  console.log('W_' + x + ': slots in [0, ' + meta.span.toExponential(3) + ') = ' + meta.n +
    ', mbar = ' + (meta.span / meta.n).toFixed(3) + ', max gap seen = ' + R.maxsum[1] +
    ', distinct gap values = ' + R.alphabet.length);
  console.log('   alphabet {value: count} = ' + R.alphabet.map(([v, c]) => v + ':' + c).join(' '));
}

// ---------------------------------------------------------------------------
console.log('');
console.log('=== 3. PER (LEVEL, FOLD): QUALIFYING VALUES, CHANNELS, MULTIPLICITY =');
const CELLS = [];
for (const lv of LEVELS) {
  for (const p of lv.folds) {
    const Zabs = 6 * p;
    const Pabs = (() => { for (let g = 6; ; g += 6) if (g % p === 2) return g; })();
    const Mabs = (() => { for (let g = 6; ; g += 6) if (g % p === p - 2) return g; })();
    const c1 = Math.min(Pabs, Mabs);
    let zMin = INF, pMin = INF, mMin = INF;
    const qual = [];
    for (const [v, c] of lv.alphabet) {
      const m = v % p;
      let cls = null;
      if (m === 0) cls = 'Z'; else if (m === 2) cls = 'P'; else if (m === p - 2) cls = 'M';
      if (!cls) continue;
      qual.push([v, c, cls]);
      if (cls === 'Z' && v < zMin) zMin = v;
      if (cls === 'P' && v < pMin) pMin = v;
      if (cls === 'M' && v < mMin) mMin = v;
    }
    const nq = qual.reduce((a, q) => a + q[1], 0);
    CELLS.push({ lv, p, Zabs, Pabs, Mabs, c1, zMin, pMin, mMin, qual, nq });
  }
}
for (const lv of LEVELS) {
  console.log('');
  console.log((lv.exact ? 'T_' : 'W_') + lv.x + '   (gaps = ' + lv.D + ')');
  console.log("  p'  abstract {Z,P,M}        present qualifying values (value x count, class)                 f = qual/all");
  for (const c of CELLS.filter(c => c.lv === lv)) {
    const list = c.qual.length ? c.qual.map(q => q[0] + 'x' + q[1] + '(' + q[2] + ')').join(' ') : '-- NONE --';
    console.log(lpad(c.p, 4) + '  ' + pad('{' + c.Zabs + ',' + c.Pabs + ',' + c.Mabs + '}', 22) +
      pad(list.length > 68 ? list.slice(0, 65) + '...' : list, 70) + (c.nq / lv.D).toExponential(3));
  }
}

console.log('');
console.log('=== 4. THE ALTERNATION-LEGAL WORDS, AND THE FORCED CEILING ==========');
for (const c of CELLS) {
  const abs = cminTable(c.Zabs, c.Pabs, c.Mabs, K);
  const alp = cminTable(c.zMin, c.pMin, c.mMin, K);
  c.absT = abs; c.alpT = alp;
  c.thmB = ceilingFrom(abs.cmin, c.lv.maxsum, K);
  c.forced = ceilingFrom(alp.cmin, c.lv.maxsum, K);
  // bridges
  const bridgeLit = [], bridgeCor = [];
  for (let k = 1; k <= K; k++) { bridgeLit[k] = k * (2 * c.p - 2); bridgeCor[k] = k * c.c1; }
  bridgeLit[0] = 0; bridgeCor[0] = 0;
  c.bLit = ceilingFrom(bridgeLit, c.lv.maxsum, K);
  c.bCor = ceilingFrom(bridgeCor, c.lv.maxsum, K);
}
// show the cheapest legal words at the diagonal folds
for (const lv of LEVELS) {
  const c = CELLS.filter(q => q.lv === lv)[0];
  const fmt = (t, k) => t.word[k] ? t.word[k].map(([cl, v]) => v + '(' + cl + ')').join(' + ') + ' = ' + t.cmin[k] : 'IMPOSSIBLE';
  console.log('');
  console.log((lv.exact ? 'T_' : 'W_') + lv.x + " -> fold " + c.p + '   maxsum_1..6 = ' + [1, 2, 3, 4, 5, 6].map(k => lv.maxsum[k]).join(', '));
  for (const k of [1, 2, 3, 4]) {
    console.log('   k=' + k + '  abstract cheapest: ' + pad(fmt(c.absT, k), 42) + ' | alphabet cheapest: ' + fmt(c.alpT, k));
  }
  console.log('   observed extremal run word (true L = ' + lv.trueL[0] + '): ' + (lv.words[0].length ? lv.words[0].join(' + ') : '(single slot, no run)'));
}

console.log('');
console.log('=== 5. THE TABLE ===================================================');
console.log('forced  = 1 + max{k : cheapest ALPHABET legal word of k gaps <= maxsum_k}');
console.log('thmB    = 1 + max{k : cheapest ABSTRACT legal word of k gaps <= maxsum_k}   (A5 Theorem B)');
console.log("bLit    = 1 + max{k : maxsum_k >= k(2p'-2)}     the brief's literal bridge");
console.log("bCor    = 1 + max{k : maxsum_k >= k*c1}, c1 = 2p'-+2   the corrected bridge");
console.log("A5lin   = 0.18 p'      req19/req31 = 0.19 and 0.31 * p'/ln p'");
console.log('');
console.log("level   p'   forced  thmB  bLit  bCor  trueL   A5lin  G2/(3p')  req31   req19   forced/req31  init");
const ROWS = [];
for (const c of CELLS) {
  const lv = c.lv, i = lv.folds.indexOf(c.p);
  const A5lin = 0.18 * c.p, floorB = lv.maxsum[1] / (3 * c.p);
  const r31 = 0.31 * c.p / Math.log(c.p), r19 = 0.19 * c.p / Math.log(c.p);
  const row = {
    tag: (lv.exact ? 'T_' : 'W_') + lv.x, x: lv.x, exact: lv.exact, p: c.p,
    forced: c.forced.ceiling, thmB: c.thmB.ceiling, bLit: c.bLit.ceiling, bCor: c.bCor.ceiling,
    trueL: lv.trueL[i], A5lin, floorB, r31, r19, init: c.forced.initialSegment && c.thmB.initialSegment
  };
  ROWS.push(row);
  console.log(pad(row.tag, 8) + lpad(c.p, 4) + lpad(row.forced, 8) + lpad(row.thmB, 6) + lpad(row.bLit, 6) +
    lpad(row.bCor, 6) + lpad(row.trueL, 7) + lpad(A5lin.toFixed(2), 8) + lpad(floorB.toFixed(2), 10) +
    lpad(r31.toFixed(2), 8) + lpad(r19.toFixed(2), 8) + lpad((row.forced / r31).toFixed(2), 14) +
    lpad(row.init ? 'yes' : 'NO', 6));
}

console.log('');
console.log('=== 6. DIAGONAL CHECK AGAINST THE PUBLISHED L ======================');
const PUB = { 7: 2, 11: 1, 13: 2, 17: 2, 19: 2, 23: 3, 29: 2, 31: 4 };
console.log("tile  fold p'  true L here  published  agree");
for (const lv of LEVELS) {
  if (!lv.exact) continue;
  const p = lv.folds[0];
  if (!(p in PUB)) continue;
  console.log(pad('T_' + lv.x, 6) + lpad(p, 8) + lpad(lv.trueL[0], 13) + lpad(PUB[p], 11) +
    lpad(lv.trueL[0] === PUB[p] ? 'YES' : 'NO <-- MISMATCH', 8));
}

console.log('');
console.log('=== 6b. THE WORD IDENTITY, CHECKED BY DIRECT ENUMERATION OF THE FOLD =');
console.log("L above is read off the GAPS MOD p' alone, by the two-state walk, and nothing");
console.log('is ever folded. Here it is recomputed the other way round: enumerate every');
console.log("old-slot position v = s_i + k*P_x across the whole new period [0, p'*P_x),");
console.log("test the ACTUAL kill condition p' | v or p' | v+2 on the absolute position,");
console.log('and take the longest run of consecutive deleted positions, cyclically.');
console.log('That route never looks at a gap modulo anything. Agreement is the claim');
console.log('that every alternation-legal window of the word is realised by a real copy.');
console.log('');
console.log("tile   p'   L from the gap word   L from the folded period   agree");
{
  let allAgree = true, cells = 0;
  for (const x of [5, 7, 11, 13, 17, 19]) {
    const tile = stored[x];
    const lv = LEVELS.find(l => l.x === x);
    for (const p of lv.folds) {
      const D = tile.D, total = D * p, tail = Math.min(total, 128);
      // pos runs over the old-slot positions of [0, p'*P_x) and then keeps going
      // into the next period; since p'*P_x === 0 (mod p'), those extra steps test
      // exactly the positions at the start of the period again, which is how a run
      // straddling the origin is caught. No residue is ever taken of a gap.
      let best = 1, run = 0, pos = tile.first;
      for (let t = 0; t < total + tail; t++) {
        const m = pos % p;
        if (m === 0 || m === p - 2) { run++; if (run > best) best = run; } else run = 0;
        pos += tile.gaps[t % D];
      }
      const mine = lv.trueL[lv.folds.indexOf(p)];
      const ok = mine === best;
      if (!ok) allAgree = false;
      cells++;
      console.log(pad('T_' + x, 7) + lpad(p, 4) + lpad(mine, 22) + lpad(best, 27) + '   ' + (ok ? 'YES' : 'NO <-- MISMATCH'));
    }
  }
  console.log('cells: ' + cells + '   all agree: ' + allAgree);
}

console.log('');
console.log('=== 7. FOLD 7 OVER T_5: IS L = 2 ARITHMETICALLY FORCED? ============');
{
  const lv = LEVELS[0], p = 7;
  console.log('T_5 slots: ' + (() => { const s = []; let pos = stored[5].first; for (let i = 0; i < stored[5].D; i++) { s.push(pos); pos += stored[5].gaps[i]; } return s.join(', '); })());
  console.log('T_5 cyclic gap word: ' + Array.from(stored[5].gaps).join(', '));
  console.log("qualifying test at p' = 7 (need g === 0, +2 or -2 mod 7):");
  for (const [v, cnt] of lv.alphabet) {
    const m = v % p;
    const cls = m === 0 ? 'Z' : m === 2 ? 'P (+2)' : m === p - 2 ? 'M (-2)' : 'does NOT qualify';
    console.log('   g = ' + v + ' (x' + cnt + '): ' + v + ' mod 7 = ' + m + '  -> ' + cls);
  }
  console.log('every cyclically adjacent pair of gaps, and whether a run of 3 can sit on it:');
  const g = Array.from(stored[5].gaps);
  for (let i = 0; i < g.length; i++) {
    const a = g[i], b = g[(i + 1) % g.length];
    const ca = a % p === 0 ? 'Z' : a % p === 2 ? 'P' : a % p === p - 2 ? 'M' : 'X';
    const cb = b % p === 0 ? 'Z' : b % p === 2 ? 'P' : b % p === p - 2 ? 'M' : 'X';
    let ok = 'NO';
    if (ca !== 'X' && cb !== 'X') {
      // legal iff the two-step walk is consistent from some start state
      const step = (s, c) => c === 'Z' ? s : (s === 'A' && c === 'M') ? 'B' : (s === 'B' && c === 'P') ? 'A' : null;
      for (const s0 of ['A', 'B']) { const s1 = step(s0, ca); if (s1 && step(s1, cb)) ok = 'YES (start ' + s0 + ')'; }
    }
    console.log('   (' + a + ', ' + b + ') classes (' + ca + ', ' + cb + ')  run of 3 legal: ' + ok);
  }
  console.log('conclusion: true L at fold 7 over T_5 = ' + lv.trueL[0] +
    ', forced ceiling = ' + CELLS.find(c => c.lv === lv && c.p === 7).forced.ceiling);
}

console.log('');
console.log('=== 8. THE TWO DECISION QUESTIONS ==================================');
{
  // (a) forced vs bridge
  let eqLit = 0, eqCor = 0, eqB = 0, n = 0, sumRatioLit = 0, sumRatioCor = 0;
  let ltB = 0;
  for (const r of ROWS) {
    n++;
    if (r.forced === r.bLit) eqLit++;
    if (r.forced === r.bCor) eqCor++;
    if (r.forced === r.thmB) eqB++;
    if (r.forced < r.thmB) ltB++;
    sumRatioLit += r.forced / r.bLit; sumRatioCor += r.forced / r.bCor;
  }
  console.log('cells: ' + n);
  console.log('forced == literal bridge:   ' + eqLit + '/' + n + '   mean ratio forced/bLit = ' + (sumRatioLit / n).toFixed(3));
  console.log('forced == corrected bridge: ' + eqCor + '/' + n + '   mean ratio forced/bCor = ' + (sumRatioCor / n).toFixed(3));
  console.log('forced == Theorem B:        ' + eqB + '/' + n + ';  forced STRICTLY below Theorem B: ' + ltB + '/' + n);
  console.log('cells where the alphabet fact bites (forced < thmB):');
  for (const r of ROWS) if (r.forced < r.thmB) console.log('   ' + r.tag + ' fold ' + r.p + ': forced ' + r.forced + ' vs thmB ' + r.thmB + ' vs bLit ' + r.bLit + ' (true L ' + r.trueL + ')');
  console.log('');
  // (b) average forced ceiling vs the requirement line, per level
  console.log('average forced ceiling over the ' + NFOLDS + " folds of each level, against the requirement line at the mean p'");
  console.log("level   mean p'   mean forced   mean thmB   mean trueL   0.31 p/ln p   0.19 p/ln p   forced/req31   forced/req19");
  for (const lv of LEVELS) {
    const rs = ROWS.filter(r => r.tag === (lv.exact ? 'T_' : 'W_') + lv.x);
    const mp = rs.reduce((a, r) => a + r.p, 0) / rs.length;
    const mf = rs.reduce((a, r) => a + r.forced, 0) / rs.length;
    const mb = rs.reduce((a, r) => a + r.thmB, 0) / rs.length;
    const mt = rs.reduce((a, r) => a + r.trueL, 0) / rs.length;
    const q31 = rs.reduce((a, r) => a + r.r31, 0) / rs.length;
    const q19 = rs.reduce((a, r) => a + r.r19, 0) / rs.length;
    console.log(pad((lv.exact ? 'T_' : 'W_') + lv.x, 8) + lpad(mp.toFixed(1), 8) + lpad(mf.toFixed(2), 14) +
      lpad(mb.toFixed(2), 12) + lpad(mt.toFixed(2), 13) + lpad(q31.toFixed(2), 14) + lpad(q19.toFixed(2), 14) +
      lpad((mf / q31).toFixed(2), 15) + lpad((mf / q19).toFixed(2), 15));
  }
  console.log('');
  console.log('and the same for the true L, which is what the requirement is actually about:');
  console.log("level   mean p'   mean trueL   trueL/req31   trueL/req19");
  for (const lv of LEVELS) {
    const rs = ROWS.filter(r => r.tag === (lv.exact ? 'T_' : 'W_') + lv.x);
    const mp = rs.reduce((a, r) => a + r.p, 0) / rs.length;
    const mt = rs.reduce((a, r) => a + r.trueL, 0) / rs.length;
    const q31 = rs.reduce((a, r) => a + r.r31, 0) / rs.length;
    const q19 = rs.reduce((a, r) => a + r.r19, 0) / rs.length;
    console.log(pad((lv.exact ? 'T_' : 'W_') + lv.x, 8) + lpad(mp.toFixed(1), 8) + lpad(mt.toFixed(2), 13) +
      lpad((mt / q31).toFixed(2), 14) + lpad((mt / q19).toFixed(2), 14));
  }
}

console.log('');
console.log('=== 9. CROSS-CHECK AGAINST THE BOUND ARTIFACTS OF THE REPOSITORY ====');
console.log('nothing below is recomputed FOR its own sake; these are the same numbers');
console.log('this run produced anyway, held against what the repository already carries.');
{
  const G2pub = { 5: 12, 7: 30, 11: 42, 13: 66, 17: 108, 19: 150, 23: 204, 29: 258 }; // research/exact-g2-ladder.js LADDER
  let ok = true;
  console.log('G2(x#) vs research/exact-g2-ladder.js:');
  for (const lv of LEVELS) {
    if (!lv.exact) continue;
    const a = lv.maxsum[1], b = G2pub[lv.x];
    if (a !== b) ok = false;
    console.log('   T_' + pad(lv.x, 3) + ' here ' + lpad(a, 4) + '   ladder ' + lpad(b, 4) + '   ' + (a === b ? 'agree' : 'DISAGREE'));
  }
  const ms29pub = [null, 258, 330, 390, 420, 510, 540];  // research/gate-multiplies.md section 8 block
  const lv29 = LEVELS.find(l => l.x === 29);
  console.log('maxsum_m(T_29) vs research/gate-multiplies-03.js tail (m <= 6):');
  let s1 = '   here  ', s2 = '   there ';
  for (let m = 1; m <= 6; m++) { s1 += lpad(lv29.maxsum[m], 7); s2 += lpad(ms29pub[m], 7); if (lv29.maxsum[m] !== ms29pub[m]) ok = false; }
  console.log(s1); console.log(s2);
  // A5 Theorem B and condition (i), diagonal, research/a3-05-bound-L.md section 5 reading 5
  const thmBpub = [2, 2, 2, 4, 4, 4, 5, 6];
  const condIpub = [3, 2, 8, 5, 11, 8, 10, 13];
  const Lpub = [2, 1, 2, 2, 2, 3, 2, 4];
  const diag = ROWS.filter(r => r.exact && r.p === PRIMES[PRIMES.indexOf(r.x) + 1]);
  console.log('the diagonal, against research/a3-05-bound-L.md section 5:');
  console.log('   fold p\'          ' + diag.map(r => lpad(r.p, 5)).join(''));
  console.log('   Theorem B here  ' + diag.map(r => lpad(r.thmB, 5)).join(''));
  console.log('   Theorem B there ' + thmBpub.map(v => lpad(v, 5)).join(''));
  console.log('   cond (i) bCor   ' + diag.map(r => lpad(r.bCor, 5)).join(''));
  console.log('   cond (i) bLit   ' + diag.map(r => lpad(r.bLit, 5)).join(''));
  console.log('   cond (i) there  ' + condIpub.map(v => lpad(v, 5)).join(''));
  console.log('   true L here     ' + diag.map(r => lpad(r.trueL, 5)).join(''));
  console.log('   true L there    ' + Lpub.map(v => lpad(v, 5)).join(''));
  const eqB = diag.every((r, i) => r.thmB === thmBpub[i]);
  const eqCor = diag.every((r, i) => r.bCor === condIpub[i]);
  const eqLit = diag.every((r, i) => r.bLit === condIpub[i]);
  const eqL = diag.every((r, i) => r.trueL === Lpub[i]);
  console.log('   Theorem B reproduced: ' + eqB + ';  true L reproduced: ' + eqL);
  console.log('   condition (i) reproduced by the CORRECTED bridge k*c1: ' + eqCor);
  console.log('   condition (i) reproduced by the LITERAL bridge k*(2p\'-2): ' + eqLit);
  console.log('   all artifact cross-checks agree: ' + (ok && eqB && eqL && eqCor));
}

console.log('');
console.log('=== 10. WHERE THE ALPHABET FACT BITES, AND WHETHER IT IS REAL ======');
console.log("a cell has forced < thmB exactly when a class minimum that A5 charges is");
console.log("ABSENT from the tile's gap alphabet. Below: which value is missing, and");
console.log('whether it is smaller than the largest gap present (a census accident,');
console.log('real) or larger (mere size, and the row is then uninformative).');
console.log('');
console.log("cell            forced  thmB  trueL   missing class minima          G2 here   verdict");
for (const c of CELLS) {
  const lv = c.lv, i = lv.folds.indexOf(c.p);
  if (c.forced.ceiling >= c.thmB.ceiling) continue;
  const miss = [];
  if (c.zMin === INF) miss.push('Z=' + c.Zabs);
  if (c.pMin === INF) miss.push('P=' + c.Pabs);
  if (c.mMin === INF) miss.push('M=' + c.Mabs);
  const G2 = lv.maxsum[1];
  const below = miss.filter(m => Number(m.split('=')[1]) <= G2);
  const verdict = !lv.exact ? 'WINDOW: not a tile fact' :
    (below.length ? 'CENSUS ACCIDENT (' + below.join(',') + ' fits under G2 but does not occur)' : 'size only, not an accident');
  console.log(pad((lv.exact ? 'T_' : 'W_') + lv.x + ' @ ' + c.p, 16) + lpad(c.forced.ceiling, 6) + lpad(c.thmB.ceiling, 6) +
    lpad(lv.trueL[i], 7) + '   ' + pad(miss.join(' '), 28) + lpad(G2, 7) + '   ' + verdict);
}
console.log('');
console.log('cells where the feasible set {k : cmin(k) <= maxsum_k} is NOT an initial segment');
console.log('(the ceiling is still valid: L-1 must lie in the set, so L <= 1 + max of it)');
for (const c of CELLS) {
  if (c.forced.initialSegment && c.thmB.initialSegment) continue;
  const lv = c.lv;
  const row = [];
  for (let k = 1; k <= 6; k++) row.push('k=' + k + ':' + (c.absT.cmin[k] <= lv.maxsum[k] ? 'ok' : 'no') + '(' + c.absT.cmin[k] + ' vs ' + lv.maxsum[k] + ')');
  console.log('   ' + (lv.exact ? 'T_' : 'W_') + lv.x + ' @ ' + c.p + '   ' + row.join('  '));
}

console.log('');
console.log('=== 11. THE LADDER DIAGONAL ALONE, AGAINST THE REQUIREMENT LINE ====');
console.log('the u-frame requirement is a statement about the FOLD LADDER: tile T_x');
console.log('folded by the next prime. That is the diagonal, and it is the row that');
console.log('decides. Off-diagonal cells are included in the full average below it.');
console.log('');
console.log("tile   p'   forced  trueL   0.31p/lnp   0.19p/lnp   forced/req31  forced/req19  trueL/req31");
{
  const diag = ROWS.filter(r => r.exact && r.p === PRIMES[PRIMES.indexOf(r.x) + 1]);
  let sf = 0, st = 0, s31 = 0, s19 = 0;
  for (const r of diag) {
    sf += r.forced; st += r.trueL; s31 += r.r31; s19 += r.r19;
    console.log(pad('T_' + r.x, 7) + lpad(r.p, 4) + lpad(r.forced, 8) + lpad(r.trueL, 7) +
      lpad(r.r31.toFixed(2), 12) + lpad(r.r19.toFixed(2), 12) + lpad((r.forced / r.r31).toFixed(2), 14) +
      lpad((r.forced / r.r19).toFixed(2), 14) + lpad((r.trueL / r.r31).toFixed(2), 13));
  }
  const n = diag.length;
  console.log('MEAN   ' + lpad('', 4) + lpad((sf / n).toFixed(2), 8) + lpad((st / n).toFixed(2), 7) +
    lpad((s31 / n).toFixed(2), 12) + lpad((s19 / n).toFixed(2), 12) +
    lpad((sf / n / (s31 / n)).toFixed(2), 14) + lpad((sf / n / (s19 / n)).toFixed(2), 14) +
    lpad((st / n / (s31 / n)).toFixed(2), 13));
  console.log('');
  console.log('ANSWER to the decision question, on the ladder diagonal:');
  console.log('  mean forced ceiling  = ' + (sf / n).toFixed(3));
  console.log('  mean 0.31 p/ln p     = ' + (s31 / n).toFixed(3) + '   ratio ' + (sf / s31).toFixed(3));
  console.log('  mean 0.19 p/ln p     = ' + (s19 / n).toFixed(3) + '   ratio ' + (sf / s19).toFixed(3));
  console.log('  forced sits BELOW the 0.31 line at ' + diag.filter(r => r.forced <= r.r31).length + ' of ' + n + ' folds');
  console.log('  forced sits BELOW the 0.19 line at ' + diag.filter(r => r.forced <= r.r19).length + ' of ' + n + ' folds');
  console.log('  true L sits BELOW the 0.31 line at ' + diag.filter(r => r.trueL <= r.r31).length + ' of ' + n + ' folds');
  console.log('  true L sits BELOW the 0.19 line at ' + diag.filter(r => r.trueL <= r.r19).length + ' of ' + n + ' folds');
  // trend in the ratio
  const xs = diag.map(r => Math.log(r.p)), ys = diag.map(r => r.forced / r.r31);
  const mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n;
  let num = 0, den = 0;
  for (let i = 0; i < n; i++) { num += (xs[i] - mx) * (ys[i] - my); den += (xs[i] - mx) ** 2; }
  console.log('  trend of forced/req31 against ln p\': slope ' + (num / den).toFixed(3) +
    ' (positive = the bound is losing ground as the ladder deepens)');
  const ys2 = diag.map(r => r.trueL / r.r31);
  const my2 = ys2.reduce((a, b) => a + b) / n;
  let num2 = 0;
  for (let i = 0; i < n; i++) num2 += (xs[i] - mx) * (ys2[i] - my2);
  console.log('  trend of trueL/req31  against ln p\': slope ' + (num2 / den).toFixed(3) +
    ' (this is the TRUTH, not a bound: negative means the requirement is not being');
  console.log('   violated by L itself over the computable range, only by what can be proved)');
  console.log('  mean trueL/req31 = ' + my2.toFixed(3) + ',  mean forced/req31 = ' + my.toFixed(3) +
    ',  the bound pays a factor ' + (my / my2).toFixed(2) + ' over the truth');
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/attack-foldL-01-census.js
//   invocation:  node research/attack-foldL-01-census.js
//   code-sha256: ccfb8a7a83ecf350fec0a4ba29591498b7df07b17056be79ee819d428b9bae6d
//   out-sha256:  1b0e5deb4d9fc60b7bc9cf6dd83cc1292c8b084dc5c355f8b34255e6bd23a01d
//   body-lines:  510
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-21
//   elapsed:     150.2 s
// ============================================================================
// === 0. THE COMPATIBILITY LEMMA, DERIVED BY BRUTE FORCE ==============
// cells tested (p' in 5..67, g = 6..12p'+12 step 6): 1160
// mismatches between brute force and the predicted combo rule: 0
//
// p'   p' mod 6   min qualifying gap   2p'-2   2p'+2   class(min)   the 3 minima  {Z, P, M}
//    5         5                   12       8      12   P (+2)       {30, 12, 18}   pmin+mmin = 30 = 6p'
//    7         1                   12      12      16   M (-2)       {42, 30, 12}   pmin+mmin = 42 = 6p'
//   11         5                   24      20      24   P (+2)       {66, 24, 42}   pmin+mmin = 66 = 6p'
//   13         1                   24      24      28   M (-2)       {78, 54, 24}   pmin+mmin = 78 = 6p'
//   17         5                   36      32      36   P (+2)       {102, 36, 66}   pmin+mmin = 102 = 6p'
//   19         1                   36      36      40   M (-2)       {114, 78, 36}   pmin+mmin = 114 = 6p'
//   23         5                   48      44      48   P (+2)       {138, 48, 90}   pmin+mmin = 138 = 6p'
//   29         5                   60      56      60   P (+2)       {174, 60, 114}   pmin+mmin = 174 = 6p'
//   31         1                   60      60      64   M (-2)       {186, 126, 60}   pmin+mmin = 186 = 6p'
//   37         1                   72      72      76   M (-2)       {222, 150, 72}   pmin+mmin = 222 = 6p'
//   41         5                   84      80      84   P (+2)       {246, 84, 162}   pmin+mmin = 246 = 6p'
//   43         1                   84      84      88   M (-2)       {258, 174, 84}   pmin+mmin = 258 = 6p'
//   47         5                   96      92      96   P (+2)       {282, 96, 186}   pmin+mmin = 282 = 6p'
//   53         5                  108     104     108   P (+2)       {318, 108, 210}   pmin+mmin = 318 = 6p'
//   59         5                  120     116     120   P (+2)       {354, 120, 234}   pmin+mmin = 354 = 6p'
//   61         1                  120     120     124   M (-2)       {366, 246, 120}   pmin+mmin = 366 = 6p'
//   67         1                  132     132     136   M (-2)       {402, 270, 132}   pmin+mmin = 402 = 6p'
//
// === 1. EXACT TILES: BUILD AND CENSUS ================================
// T_5: D = 3, P = 30, mbar = 10.000, G2 = 12, distinct gap values = 2
//    alphabet {value: count} = 6:1 12:2
// T_7: D = 15, P = 210, mbar = 14.000, G2 = 30, distinct gap values = 4
//    alphabet {value: count} = 6:3 12:8 18:2 30:2
// T_11: D = 135, P = 2310, mbar = 17.111, G2 = 42, distinct gap values = 7
//    alphabet {value: count} = 6:21 12:56 18:22 24:6 30:22 36:4 42:4
// T_13: D = 1485, P = 30030, mbar = 20.222, G2 = 66, distinct gap values = 10
//    alphabet {value: count} = 6:189 12:504 18:238 24:96 30:270 36:60 42:84 48:20 60:12 66:12
// T_17: D = 22275, P = 510510, mbar = 22.919, G2 = 108, distinct gap values = 17
//    alphabet {value: count} = 6:2457 12:6552 18:3374 24:1536 30:4230 36:1022 42:1716 48:474 54:40 60:380 66:286 72:64 78:66 84:12 90:24 96:22 108:20
// T_19: D = 378675, P = 9699690, mbar = 25.615, G2 = 150, distinct gap values = 23
//    alphabet {value: count} = 6:36855 12:98280 18:53690 24:26208 30:72378 36:18776 42:34812 48:10462 54:1968 60:9452 66:6322 72:2816 78:2620 84:632 90:1236 96:876 102:16 108:954 120:142 126:48 132:26 138:86 150:20
// T_23: D = 7952175, P = 223092870, mbar = 28.054, G2 = 204, distinct gap values = 33
//    alphabet {value: count} = 6:700245 12:1867320 18:1060150 24:539136 30:1500318 36:393464 42:801540 48:275040 54:69288 60:243370 66:166526 72:94492 78:83712 84:26956 90:43542 96:27136 102:4384 108:32326 114:440 120:7852 126:4668 132:2314 138:5598 150:1404 156:310 162:170 168:322 174:6 180:112 186:20 192:8 198:2 204:4
// T_29: D = 214708725, P = 6469693230, mbar = 30.132, G2 = 258, distinct gap values = 41
//    alphabet {value: count} = 6:17506125 12:46683000 18:27184430 24:14178528 30:39735054 36:10497320 42:22680468 48:8256720 54:2479200 60:7815766 66:5067262 72:3197558 78:3028200 84:1026404 90:1711068 96:948278 102:264346 108:1194016 114:54546 120:387506 126:205068 132:150588 138:278558 144:1180 150:88548 156:29724 162:15172 168:24418 174:2054 180:10862 186:2090 192:2764 198:748 204:548 210:442 216:38 222:84 228:22 234:12 240:8 258:2
//
// === 2. SEGMENTED WINDOWS [0, N) FOR x BEYOND THE WALKABLE PERIOD ====
// every column from these rows is a WINDOW LOWER BOUND, never a tile value
// W_31: slots in [0, 6.000e+9) = 186274577, mbar = 32.211, max gap seen = 330, distinct gap values = 53
//    alphabet {value: count} = 6:14140283 12:37707573 18:22426346 24:11934304 30:33672719 36:8951051 42:20258651 48:7721079 54:2623165 60:7795361 66:4767024 72:3287510 78:3259037 84:1150665 90:1972409 96:1017658 102:387367 108:1338516 114:112343 120:530362 126:269749 132:231781 138:380228 144:5265 150:147908 156:53528 162:34032 168:45747 174:6471 180:25337 186:5328 192:7841 198:2774 204:1559 210:2136 216:94 222:732 228:175 234:144 240:205 246:5 252:52 258:28 264:4 270:12 276:3 282:4 288:4 294:1 300:1 306:3 312:1 330:1
// W_37: slots in [0, 6.000e+9) = 176205680, mbar = 34.051, max gap seen = 378, distinct gap values = 58
//    alphabet {value: count} = 6:12611547 12:33631146 18:20318438 24:10969586 30:31123057 36:8312584 42:19449024 48:7658023 54:2825001 60:7949051 66:4792512 72:3687260 78:3536793 84:1310633 90:2290855 96:1145025 102:508944 108:1521340 114:163126 120:675871 126:362401 132:316335 138:488513 144:11629 150:221773 156:89663 162:54947 168:74430 174:12019 180:46366 186:11067 192:14863 198:7622 204:3312 210:5900 216:353 222:2238 228:698 234:376 240:649 246:55 252:251 258:115 264:41 270:81 276:29 282:35 288:41 294:11 300:12 306:9 312:6 318:11 330:4 342:2 348:3 360:1 378:2
// W_41: slots in [0, 6.000e+9) = 167610229, mbar = 35.797, max gap seen = 390, distinct gap values = 62
//    alphabet {value: count} = 6:11381166 12:30349923 18:18575196 24:10145449 30:28926429 36:7756279 42:18635174 48:7529946 54:2955808 60:8003304 66:4757064 72:3922766 78:3758320 84:1497642 90:2555815 96:1249249 102:638988 108:1689247 114:214647 120:811526 126:447801 132:390500 138:608827 144:18941 150:295008 156:126977 162:82124 168:108556 174:18500 180:72518 186:18450 192:23905 198:15073 204:5619 210:11971 216:927 222:4435 228:1583 234:804 240:1705 246:186 252:668 258:333 264:107 270:200 276:101 282:119 288:120 294:26 300:63 306:41 312:17 318:26 324:5 330:25 336:1 342:7 348:10 360:6 372:1 378:3 390:1
// W_43: slots in [0, 6.000e+9) = 159814370, mbar = 37.544, max gap seen = 420, distinct gap values = 65
//    alphabet {value: count} = 6:10322242 12:27526677 18:17042199 24:9401904 30:26928629 36:7245742 42:17811317 48:7357448 54:3039575 60:7990285 66:4682199 72:4098584 78:3925761 84:1666470 90:2784268 96:1338077 102:766217 108:1835309 114:267161 120:942830 126:531868 132:467025 138:730459 144:28491 150:374616 156:169091 162:112943 168:150864 174:27434 180:105984 186:27597 192:35696 198:26004 204:8793 210:21400 216:1860 222:8059 228:3200 234:1484 240:3603 246:479 252:1428 258:842 264:237 270:460 276:285 282:317 288:327 294:88 300:150 306:110 312:40 318:67 324:19 330:64 336:5 342:15 348:36 360:15 366:3 372:5 378:5 390:4 402:1 420:2
//
// === 3. PER (LEVEL, FOLD): QUALIFYING VALUES, CHANNELS, MULTIPLICITY =
//
// T_5   (gaps = 3)
//   p'  abstract {Z,P,M}        present qualifying values (value x count, class)                 f = qual/all
//    7  {42,30,12}            12x2(M)                                                               6.667e-1
//   11  {66,24,42}            -- NONE --                                                            0.000e+0
//   13  {78,54,24}            -- NONE --                                                            0.000e+0
//   17  {102,36,66}           -- NONE --                                                            0.000e+0
//   19  {114,78,36}           -- NONE --                                                            0.000e+0
//   23  {138,48,90}           -- NONE --                                                            0.000e+0
//
// T_7   (gaps = 15)
//   p'  abstract {Z,P,M}        present qualifying values (value x count, class)                 f = qual/all
//   11  {66,24,42}            -- NONE --                                                            0.000e+0
//   13  {78,54,24}            -- NONE --                                                            0.000e+0
//   17  {102,36,66}           -- NONE --                                                            0.000e+0
//   19  {114,78,36}           -- NONE --                                                            0.000e+0
//   23  {138,48,90}           -- NONE --                                                            0.000e+0
//   29  {174,60,114}          -- NONE --                                                            0.000e+0
//
// T_11   (gaps = 135)
//   p'  abstract {Z,P,M}        present qualifying values (value x count, class)                 f = qual/all
//   13  {78,54,24}            24x6(M)                                                               4.444e-2
//   17  {102,36,66}           36x4(P)                                                               2.963e-2
//   19  {114,78,36}           36x4(M)                                                               2.963e-2
//   23  {138,48,90}           -- NONE --                                                            0.000e+0
//   29  {174,60,114}          -- NONE --                                                            0.000e+0
//   31  {186,126,60}          -- NONE --                                                            0.000e+0
//
// T_13   (gaps = 1485)
//   p'  abstract {Z,P,M}        present qualifying values (value x count, class)                 f = qual/all
//   17  {102,36,66}           36x60(P) 66x12(M)                                                     4.848e-2
//   19  {114,78,36}           36x60(M)                                                              4.040e-2
//   23  {138,48,90}           48x20(P)                                                              1.347e-2
//   29  {174,60,114}          60x12(P)                                                              8.081e-3
//   31  {186,126,60}          60x12(M)                                                              8.081e-3
//   37  {222,150,72}          -- NONE --                                                            0.000e+0
//
// T_17   (gaps = 22275)
//   p'  abstract {Z,P,M}        present qualifying values (value x count, class)                 f = qual/all
//   19  {114,78,36}           36x1022(M) 78x66(P)                                                   4.884e-2
//   23  {138,48,90}           48x474(P) 90x24(M)                                                    2.236e-2
//   29  {174,60,114}          60x380(P)                                                             1.706e-2
//   31  {186,126,60}          60x380(M)                                                             1.706e-2
//   37  {222,150,72}          72x64(M)                                                              2.873e-3
//   41  {246,84,162}          84x12(P)                                                              5.387e-4
//
// T_19   (gaps = 378675)
//   p'  abstract {Z,P,M}        present qualifying values (value x count, class)                 f = qual/all
//   23  {138,48,90}           48x10462(P) 90x1236(M) 138x86(Z)                                      3.112e-2
//   29  {174,60,114}          60x9452(P)                                                            2.496e-2
//   31  {186,126,60}          60x9452(M) 126x48(P)                                                  2.509e-2
//   37  {222,150,72}          72x2816(M) 150x20(P)                                                  7.489e-3
//   41  {246,84,162}          84x632(P)                                                             1.669e-3
//   43  {258,174,84}          84x632(M)                                                             1.669e-3
//
// T_23   (gaps = 7952175)
//   p'  abstract {Z,P,M}        present qualifying values (value x count, class)                 f = qual/all
//   29  {174,60,114}          60x243370(P) 114x440(M) 174x6(Z)                                      3.066e-2
//   31  {186,126,60}          60x243370(M) 126x4668(P) 186x20(Z)                                    3.119e-2
//   37  {222,150,72}          72x94492(M) 150x1404(P)                                               1.206e-2
//   41  {246,84,162}          84x26956(P) 162x170(M)                                                3.411e-3
//   43  {258,174,84}          84x26956(M) 174x6(P)                                                  3.391e-3
//   47  {282,96,186}          96x27136(P) 186x20(M)                                                 3.415e-3
//
// T_29   (gaps = 214708725)
//   p'  abstract {Z,P,M}        present qualifying values (value x count, class)                 f = qual/all
//   31  {186,126,60}          60x7815766(M) 126x205068(P) 186x2090(Z)                               3.737e-2
//   37  {222,150,72}          72x3197558(M) 150x88548(P) 222x84(Z)                                  1.531e-2
//   41  {246,84,162}          84x1026404(P) 162x15172(M)                                            4.851e-3
//   43  {258,174,84}          84x1026404(M) 174x2054(P) 258x2(Z)                                    4.790e-3
//   47  {282,96,186}          96x948278(P) 186x2090(M)                                              4.426e-3
//   53  {318,108,210}         108x1194016(P) 210x442(M)                                             5.563e-3
//
// W_31   (gaps = 186274577)
//   p'  abstract {Z,P,M}        present qualifying values (value x count, class)                 f = qual/all
//   37  {222,150,72}          72x3287510(M) 150x147908(P) 222x732(Z) 294x1(M)                       1.845e-2
//   41  {246,84,162}          84x1150665(P) 162x34032(M) 246x5(Z) 330x1(P)                          6.360e-3
//   43  {258,174,84}          84x1150665(M) 174x6471(P) 258x28(Z)                                   6.212e-3
//   47  {282,96,186}          96x1017658(P) 186x5328(M) 282x4(Z)                                    5.492e-3
//   53  {318,108,210}         108x1338516(P) 210x2136(M)                                            7.197e-3
//   59  {354,120,234}         120x530362(P) 234x144(M)                                              2.848e-3
//
// W_37   (gaps = 176205680)
//   p'  abstract {Z,P,M}        present qualifying values (value x count, class)                 f = qual/all
//   41  {246,84,162}          84x1310633(P) 162x54947(M) 246x55(Z) 330x4(P)                         7.750e-3
//   43  {258,174,84}          84x1310633(M) 174x12019(P) 258x115(Z) 342x2(M)                        7.507e-3
//   47  {282,96,186}          96x1145025(P) 186x11067(M) 282x35(Z) 378x2(P)                         6.561e-3
//   53  {318,108,210}         108x1521340(P) 210x5900(M) 318x11(Z)                                  8.667e-3
//   59  {354,120,234}         120x675871(P) 234x376(M)                                              3.838e-3
//   61  {366,246,120}         120x675871(M) 246x55(P)                                               3.836e-3
//
// W_41   (gaps = 167610229)
//   p'  abstract {Z,P,M}        present qualifying values (value x count, class)                 f = qual/all
//   43  {258,174,84}          84x1497642(M) 174x18500(P) 258x333(Z) 342x7(M)                        9.048e-3
//   47  {282,96,186}          96x1249249(P) 186x18450(M) 282x119(Z) 378x3(P)                        7.564e-3
//   53  {318,108,210}         108x1689247(P) 210x11971(M) 318x26(Z)                                 1.015e-2
//   59  {354,120,234}         120x811526(P) 234x804(M)                                              4.847e-3
//   61  {366,246,120}         120x811526(M) 246x186(P)                                              4.843e-3
//   67  {402,270,132}         132x390500(M) 270x200(P)                                              2.331e-3
//
// W_43   (gaps = 159814370)
//   p'  abstract {Z,P,M}        present qualifying values (value x count, class)                 f = qual/all
//   47  {282,96,186}          96x1338077(P) 186x27597(M) 282x317(Z) 378x5(P)                        8.547e-3
//   53  {318,108,210}         108x1835309(P) 210x21400(M) 318x67(Z)                                 1.162e-2
//   59  {354,120,234}         120x942830(P) 234x1484(M)                                             5.909e-3
//   61  {366,246,120}         120x942830(M) 246x479(P) 366x3(Z)                                     5.903e-3
//   67  {402,270,132}         132x467025(M) 270x460(P) 402x1(Z)                                     2.925e-3
//
// === 4. THE ALTERNATION-LEGAL WORDS, AND THE FORCED CEILING ==========
//
// T_5 -> fold 7   maxsum_1..6 = 12, 24, 30, 42, 54, 60
//    k=1  abstract cheapest: 12(M) = 12                                 | alphabet cheapest: 12(M) = 12
//    k=2  abstract cheapest: 12(M) + 30(P) = 42                         | alphabet cheapest: IMPOSSIBLE
//    k=3  abstract cheapest: 12(M) + 30(P) + 12(M) = 54                 | alphabet cheapest: IMPOSSIBLE
//    k=4  abstract cheapest: 12(M) + 30(P) + 12(M) + 30(P) = 84         | alphabet cheapest: IMPOSSIBLE
//    observed extremal run word (true L = 2): 12
//
// T_7 -> fold 11   maxsum_1..6 = 30, 42, 66, 78, 96, 108
//    k=1  abstract cheapest: 24(P) = 24                                 | alphabet cheapest: IMPOSSIBLE
//    k=2  abstract cheapest: 42(M) + 24(P) = 66                         | alphabet cheapest: IMPOSSIBLE
//    k=3  abstract cheapest: 24(P) + 42(M) + 24(P) = 90                 | alphabet cheapest: IMPOSSIBLE
//    k=4  abstract cheapest: 42(M) + 24(P) + 42(M) + 24(P) = 132        | alphabet cheapest: IMPOSSIBLE
//    observed extremal run word (true L = 1): (single slot, no run)
//
// T_11 -> fold 13   maxsum_1..6 = 42, 66, 96, 108, 138, 156
//    k=1  abstract cheapest: 24(M) = 24                                 | alphabet cheapest: 24(M) = 24
//    k=2  abstract cheapest: 24(M) + 54(P) = 78                         | alphabet cheapest: IMPOSSIBLE
//    k=3  abstract cheapest: 24(M) + 54(P) + 24(M) = 102                | alphabet cheapest: IMPOSSIBLE
//    k=4  abstract cheapest: 24(M) + 54(P) + 24(M) + 54(P) = 156        | alphabet cheapest: IMPOSSIBLE
//    observed extremal run word (true L = 2): 24
//
// T_13 -> fold 17   maxsum_1..6 = 66, 96, 138, 156, 168, 186
//    k=1  abstract cheapest: 36(P) = 36                                 | alphabet cheapest: 36(P) = 36
//    k=2  abstract cheapest: 66(M) + 36(P) = 102                        | alphabet cheapest: 66(M) + 36(P) = 102
//    k=3  abstract cheapest: 36(P) + 66(M) + 36(P) = 138                | alphabet cheapest: 36(P) + 66(M) + 36(P) = 138
//    k=4  abstract cheapest: 66(M) + 36(P) + 66(M) + 36(P) = 204        | alphabet cheapest: 66(M) + 36(P) + 66(M) + 36(P) = 204
//    observed extremal run word (true L = 2): 36
//
// T_17 -> fold 19   maxsum_1..6 = 108, 150, 168, 198, 210, 240
//    k=1  abstract cheapest: 36(M) = 36                                 | alphabet cheapest: 36(M) = 36
//    k=2  abstract cheapest: 36(M) + 78(P) = 114                        | alphabet cheapest: 36(M) + 78(P) = 114
//    k=3  abstract cheapest: 36(M) + 78(P) + 36(M) = 150                | alphabet cheapest: 36(M) + 78(P) + 36(M) = 150
//    k=4  abstract cheapest: 36(M) + 78(P) + 36(M) + 78(P) = 228        | alphabet cheapest: 36(M) + 78(P) + 36(M) + 78(P) = 228
//    observed extremal run word (true L = 2): 36
//
// T_19 -> fold 23   maxsum_1..6 = 150, 186, 210, 228, 282, 300
//    k=1  abstract cheapest: 48(P) = 48                                 | alphabet cheapest: 48(P) = 48
//    k=2  abstract cheapest: 90(M) + 48(P) = 138                        | alphabet cheapest: 90(M) + 48(P) = 138
//    k=3  abstract cheapest: 48(P) + 90(M) + 48(P) = 186                | alphabet cheapest: 48(P) + 90(M) + 48(P) = 186
//    k=4  abstract cheapest: 90(M) + 48(P) + 90(M) + 48(P) = 276        | alphabet cheapest: 90(M) + 48(P) + 90(M) + 48(P) = 276
//    observed extremal run word (true L = 3): 48 + 90
//
// T_23 -> fold 29   maxsum_1..6 = 204, 234, 300, 348, 390, 462
//    k=1  abstract cheapest: 60(P) = 60                                 | alphabet cheapest: 60(P) = 60
//    k=2  abstract cheapest: 114(M) + 60(P) = 174                       | alphabet cheapest: 114(M) + 60(P) = 174
//    k=3  abstract cheapest: 60(P) + 114(M) + 60(P) = 234               | alphabet cheapest: 60(P) + 114(M) + 60(P) = 234
//    k=4  abstract cheapest: 114(M) + 60(P) + 114(M) + 60(P) = 348      | alphabet cheapest: 114(M) + 60(P) + 114(M) + 60(P) = 348
//    observed extremal run word (true L = 2): 60
//
// T_29 -> fold 31   maxsum_1..6 = 258, 330, 390, 420, 510, 540
//    k=1  abstract cheapest: 60(M) = 60                                 | alphabet cheapest: 60(M) = 60
//    k=2  abstract cheapest: 60(M) + 126(P) = 186                       | alphabet cheapest: 60(M) + 126(P) = 186
//    k=3  abstract cheapest: 60(M) + 126(P) + 60(M) = 246               | alphabet cheapest: 60(M) + 126(P) + 60(M) = 246
//    k=4  abstract cheapest: 60(M) + 126(P) + 60(M) + 126(P) = 372      | alphabet cheapest: 60(M) + 126(P) + 60(M) + 126(P) = 372
//    observed extremal run word (true L = 4): 60 + 126 + 60
//
// W_31 -> fold 37   maxsum_1..6 = 330, 372, 420, 510, 540, 552
//    k=1  abstract cheapest: 72(M) = 72                                 | alphabet cheapest: 72(M) = 72
//    k=2  abstract cheapest: 72(M) + 150(P) = 222                       | alphabet cheapest: 72(M) + 150(P) = 222
//    k=3  abstract cheapest: 72(M) + 150(P) + 72(M) = 294               | alphabet cheapest: 72(M) + 150(P) + 72(M) = 294
//    k=4  abstract cheapest: 72(M) + 150(P) + 72(M) + 150(P) = 444      | alphabet cheapest: 72(M) + 150(P) + 72(M) + 150(P) = 444
//    observed extremal run word (true L = 4): 150 + 72 + 150
//
// W_37 -> fold 41   maxsum_1..6 = 378, 456, 528, 570, 588, 630
//    k=1  abstract cheapest: 84(P) = 84                                 | alphabet cheapest: 84(P) = 84
//    k=2  abstract cheapest: 162(M) + 84(P) = 246                       | alphabet cheapest: 162(M) + 84(P) = 246
//    k=3  abstract cheapest: 84(P) + 162(M) + 84(P) = 330               | alphabet cheapest: 84(P) + 162(M) + 84(P) = 330
//    k=4  abstract cheapest: 162(M) + 84(P) + 162(M) + 84(P) = 492      | alphabet cheapest: 162(M) + 84(P) + 162(M) + 84(P) = 492
//    observed extremal run word (true L = 3): 84 + 246
//
// W_41 -> fold 43   maxsum_1..6 = 390, 456, 540, 582, 660, 672
//    k=1  abstract cheapest: 84(M) = 84                                 | alphabet cheapest: 84(M) = 84
//    k=2  abstract cheapest: 84(M) + 174(P) = 258                       | alphabet cheapest: 84(M) + 174(P) = 258
//    k=3  abstract cheapest: 84(M) + 174(P) + 84(M) = 342               | alphabet cheapest: 84(M) + 174(P) + 84(M) = 342
//    k=4  abstract cheapest: 84(M) + 174(P) + 84(M) + 174(P) = 516      | alphabet cheapest: 84(M) + 174(P) + 84(M) + 174(P) = 516
//    observed extremal run word (true L = 3): 84 + 258
//
// W_43 -> fold 47   maxsum_1..6 = 420, 528, 588, 666, 678, 768
//    k=1  abstract cheapest: 96(P) = 96                                 | alphabet cheapest: 96(P) = 96
//    k=2  abstract cheapest: 186(M) + 96(P) = 282                       | alphabet cheapest: 186(M) + 96(P) = 282
//    k=3  abstract cheapest: 96(P) + 186(M) + 96(P) = 378               | alphabet cheapest: 96(P) + 186(M) + 96(P) = 378
//    k=4  abstract cheapest: 186(M) + 96(P) + 186(M) + 96(P) = 564      | alphabet cheapest: 186(M) + 96(P) + 186(M) + 96(P) = 564
//    observed extremal run word (true L = 3): 282 + 96
//
// === 5. THE TABLE ===================================================
// forced  = 1 + max{k : cheapest ALPHABET legal word of k gaps <= maxsum_k}
// thmB    = 1 + max{k : cheapest ABSTRACT legal word of k gaps <= maxsum_k}   (A5 Theorem B)
// bLit    = 1 + max{k : maxsum_k >= k(2p'-2)}     the brief's literal bridge
// bCor    = 1 + max{k : maxsum_k >= k*c1}, c1 = 2p'-+2   the corrected bridge
// A5lin   = 0.18 p'      req19/req31 = 0.19 and 0.31 * p'/ln p'
//
// level   p'   forced  thmB  bLit  bCor  trueL   A5lin  G2/(3p')  req31   req19   forced/req31  init
// T_5        7       2     2     3     3      2    1.26      0.57    1.12    0.68          1.79   yes
// T_5       11       1     1     1     1      1    1.98      0.36    1.42    0.87          0.70   yes
// T_5       13       1     1     1     1      1    2.34      0.31    1.57    0.96          0.64   yes
// T_5       17       1     1     1     1      1    3.06      0.24    1.86    1.14          0.54   yes
// T_5       19       1     1     1     1      1    3.42      0.21    2.00    1.23          0.50   yes
// T_5       23       1     1     1     1      1    4.14      0.17    2.27    1.39          0.44   yes
// T_7       11       1     2     4     2      1    1.98      0.91    1.42    0.87          0.70   yes
// T_7       13       1     2     2     2      1    2.34      0.77    1.57    0.96          0.64   yes
// T_7       17       1     1     1     1      1    3.06      0.59    1.86    1.14          0.54   yes
// T_7       19       1     1     1     1      1    3.42      0.53    2.00    1.23          0.50   yes
// T_7       23       1     1     1     1      1    4.14      0.43    2.27    1.39          0.44   yes
// T_7       29       1     1     1     1      1    5.22      0.34    2.67    1.64          0.37   yes
// T_11      13       2     2     8     8      2    2.34      1.08    1.57    0.96          1.27   yes
// T_11      17       2     2     4     2      2    3.06      0.82    1.86    1.14          1.08   yes
// T_11      19       2     2     2     2      2    3.42      0.74    2.00    1.23          1.00   yes
// T_11      23       1     1     1     1      1    4.14      0.61    2.27    1.39          0.44   yes
// T_11      29       1     1     1     1      1    5.22      0.48    2.67    1.64          0.37   yes
// T_11      31       1     1     1     1      1    5.58      0.45    2.80    1.72          0.36   yes
// T_13      17       4     4     6     5      2    3.06      1.29    1.86    1.14          2.15    NO
// T_13      19       2     2     5     5      2    3.42      1.16    2.00    1.23          1.00   yes
// T_13      23       2     2     4     3      2    4.14      0.96    2.27    1.39          0.88   yes
// T_13      29       2     2     2     2      2    5.22      0.76    2.67    1.64          0.75   yes
// T_13      31       2     2     2     2      2    5.58      0.71    2.80    1.72          0.71   yes
// T_13      37       1     1     1     1      1    6.66      0.59    3.18    1.95          0.31   yes
// T_17      19       4     4    11    11      2    3.42      1.89    2.00    1.23          2.00   yes
// T_17      23       3     3     5     5      2    4.14      1.57    2.27    1.39          1.32   yes
// T_17      29       2     2     4     3      2    5.22      1.24    2.67    1.64          0.75   yes
// T_17      31       2     2     3     3      2    5.58      1.16    2.80    1.72          0.71   yes
// T_17      37       2     2     3     3      2    6.66      0.97    3.18    1.95          0.63   yes
// T_17      41       2     2     2     2      2    7.38      0.88    3.42    2.10          0.58   yes
// T_19      23       4     4    13     8      3    4.14      2.17    2.27    1.39          1.76   yes
// T_19      29       2     3     6     4      2    5.22      1.72    2.67    1.64          0.75   yes
// T_19      31       3     3     4     4      3    5.58      1.61    2.80    1.72          1.07   yes
// T_19      37       2     2     3     3      2    6.66      1.35    3.18    1.95          0.63   yes
// T_19      41       2     2     3     3      2    7.38      1.22    3.42    2.10          0.58   yes
// T_19      43       2     2     3     3      2    7.74      1.16    3.54    2.17          0.56   yes
// T_23      29       5     5    11    10      2    5.22      2.34    2.67    1.64          1.87   yes
// T_23      31       4     4    10    10      3    5.58      2.19    2.80    1.72          1.43   yes
// T_23      37       4     4     7     7      2    6.66      1.84    3.18    1.95          1.26   yes
// T_23      41       2     2     5     5      2    7.38      1.66    3.42    2.10          0.58   yes
// T_23      43       2     2     5     5      2    7.74      1.58    3.54    2.17          0.56   yes
// T_23      47       2     2     4     4      2    8.46      1.45    3.78    2.32          0.53   yes
// T_29      31       6     6    13    13      4    5.58      2.77    2.80    1.72          2.14   yes
// T_29      37       4     4     9     9      3    6.66      2.32    3.18    1.95          1.26   yes
// T_29      41       4     4     7     7      2    7.38      2.10    3.42    2.10          1.17   yes
// T_29      43       4     4     7     7      2    7.74      2.00    3.54    2.17          1.13   yes
// T_29      47       4     4     6     6      2    8.46      1.83    3.78    2.32          1.06   yes
// T_29      53       3     3     5     4      2    9.54      1.62    4.14    2.54          0.72   yes
// W_31      37       6     6    11    11      4    6.66      2.97    3.18    1.95          1.89   yes
// W_31      41       5     5     8     7      2    7.38      2.68    3.42    2.10          1.46   yes
// W_31      43       4     4     7     7      2    7.74      2.56    3.54    2.17          1.13   yes
// W_31      47       4     4     7     6      2    8.46      2.34    3.78    2.32          1.06   yes
// W_31      53       3     3     6     6      3    9.54      2.08    4.14    2.54          0.72   yes
// W_31      59       3     3     5     5      2   10.62      1.86    4.49    2.75          0.67   yes
// W_37      41       6     6    12    11      3    7.38      3.07    3.42    2.10          1.75   yes
// W_37      43       5     5    11    11      2    7.74      2.93    3.54    2.17          1.41   yes
// W_37      47       5     5     9     9      2    8.46      2.68    3.78    2.32          1.32   yes
// W_37      53       4     4     7     6      3    9.54      2.38    4.14    2.54          0.97   yes
// W_37      59       4     4     6     5      2   10.62      2.14    4.49    2.75          0.89   yes
// W_37      61       4     4     5     5      2   10.98      2.07    4.60    2.82          0.87   yes
// W_41      43       6     6    11    11      3    7.74      3.02    3.54    2.17          1.69   yes
// W_41      47       6     6    10    10      3    8.46      2.77    3.78    2.32          1.59   yes
// W_41      53       4     4     7     7      3    9.54      2.45    4.14    2.54          0.97   yes
// W_41      59       4     4     6     6      3   10.62      2.20    4.49    2.75          0.89   yes
// W_41      61       4     4     6     6      3   10.98      2.13    4.60    2.82          0.87   yes
// W_41      67       4     4     6     6      3   12.06      1.94    4.94    3.03          0.81   yes
// W_43      47       6     6    11    10      3    8.46      2.98    3.78    2.32          1.59   yes
// W_43      53       5     5     9     9      3    9.54      2.64    4.14    2.54          1.21   yes
// W_43      59       4     4     8     8      3   10.62      2.37    4.49    2.75          0.89   yes
// W_43      61       4     4     8     8      3   10.98      2.30    4.60    2.82          0.87   yes
// W_43      67       4     4     6     6      3   12.06      2.09    4.94    3.03          0.81   yes
//
// === 6. DIAGONAL CHECK AGAINST THE PUBLISHED L ======================
// tile  fold p'  true L here  published  agree
// T_5          7            2          2     YES
// T_7         11            1          1     YES
// T_11        13            2          2     YES
// T_13        17            2          2     YES
// T_17        19            2          2     YES
// T_19        23            3          3     YES
// T_23        29            2          2     YES
// T_29        31            4          4     YES
//
// === 6b. THE WORD IDENTITY, CHECKED BY DIRECT ENUMERATION OF THE FOLD =
// L above is read off the GAPS MOD p' alone, by the two-state walk, and nothing
// is ever folded. Here it is recomputed the other way round: enumerate every
// old-slot position v = s_i + k*P_x across the whole new period [0, p'*P_x),
// test the ACTUAL kill condition p' | v or p' | v+2 on the absolute position,
// and take the longest run of consecutive deleted positions, cyclically.
// That route never looks at a gap modulo anything. Agreement is the claim
// that every alternation-legal window of the word is realised by a real copy.
//
// tile   p'   L from the gap word   L from the folded period   agree
// T_5       7                     2                          2   YES
// T_5      11                     1                          1   YES
// T_5      13                     1                          1   YES
// T_5      17                     1                          1   YES
// T_5      19                     1                          1   YES
// T_5      23                     1                          1   YES
// T_7      11                     1                          1   YES
// T_7      13                     1                          1   YES
// T_7      17                     1                          1   YES
// T_7      19                     1                          1   YES
// T_7      23                     1                          1   YES
// T_7      29                     1                          1   YES
// T_11     13                     2                          2   YES
// T_11     17                     2                          2   YES
// T_11     19                     2                          2   YES
// T_11     23                     1                          1   YES
// T_11     29                     1                          1   YES
// T_11     31                     1                          1   YES
// T_13     17                     2                          2   YES
// T_13     19                     2                          2   YES
// T_13     23                     2                          2   YES
// T_13     29                     2                          2   YES
// T_13     31                     2                          2   YES
// T_13     37                     1                          1   YES
// T_17     19                     2                          2   YES
// T_17     23                     2                          2   YES
// T_17     29                     2                          2   YES
// T_17     31                     2                          2   YES
// T_17     37                     2                          2   YES
// T_17     41                     2                          2   YES
// T_19     23                     3                          3   YES
// T_19     29                     2                          2   YES
// T_19     31                     3                          3   YES
// T_19     37                     2                          2   YES
// T_19     41                     2                          2   YES
// T_19     43                     2                          2   YES
// cells: 36   all agree: true
//
// === 7. FOLD 7 OVER T_5: IS L = 2 ARITHMETICALLY FORCED? ============
// T_5 slots: 11, 17, 29
// T_5 cyclic gap word: 6, 12, 12
// qualifying test at p' = 7 (need g === 0, +2 or -2 mod 7):
//    g = 6 (x1): 6 mod 7 = 6  -> does NOT qualify
//    g = 12 (x2): 12 mod 7 = 5  -> M (-2)
// every cyclically adjacent pair of gaps, and whether a run of 3 can sit on it:
//    (6, 12) classes (X, M)  run of 3 legal: NO
//    (12, 12) classes (M, M)  run of 3 legal: NO
//    (12, 6) classes (M, X)  run of 3 legal: NO
// conclusion: true L at fold 7 over T_5 = 2, forced ceiling = 2
//
// === 8. THE TWO DECISION QUESTIONS ==================================
// cells: 71
// forced == literal bridge:   17/71   mean ratio forced/bLit = 0.654
// forced == corrected bridge: 18/71   mean ratio forced/bCor = 0.686
// forced == Theorem B:        68/71;  forced STRICTLY below Theorem B: 3/71
// cells where the alphabet fact bites (forced < thmB):
//    T_7 fold 11: forced 1 vs thmB 2 vs bLit 4 (true L 1)
//    T_7 fold 13: forced 1 vs thmB 2 vs bLit 2 (true L 1)
//    T_19 fold 29: forced 2 vs thmB 3 vs bLit 6 (true L 2)
//
// average forced ceiling over the 6 folds of each level, against the requirement line at the mean p'
// level   mean p'   mean forced   mean thmB   mean trueL   0.31 p/ln p   0.19 p/ln p   forced/req31   forced/req19
// T_5         15.0          1.17        1.17         1.17          1.71          1.05           0.68           1.12
// T_7         18.7          1.00        1.33         1.00          1.97          1.21           0.51           0.83
// T_11        22.0          1.50        1.50         1.50          2.20          1.35           0.68           1.11
// T_13        26.0          2.17        2.17         1.83          2.46          1.51           0.88           1.44
// T_17        30.0          2.50        2.50         2.00          2.72          1.67           0.92           1.50
// T_19        34.0          2.50        2.67         2.33          2.98          1.83           0.84           1.37
// T_23        38.0          3.17        3.17         2.17          3.23          1.98           0.98           1.60
// T_29        42.0          4.17        4.17         2.50          3.48          2.13           1.20           1.96
// W_31        46.7          4.17        4.17         2.50          3.76          2.30           1.11           1.81
// W_37        50.7          4.67        4.67         2.33          4.00          2.45           1.17           1.91
// W_41        55.0          4.67        4.67         3.00          4.25          2.60           1.10           1.79
// W_43        57.4          4.60        4.60         3.00          4.39          2.69           1.05           1.71
//
// and the same for the true L, which is what the requirement is actually about:
// level   mean p'   mean trueL   trueL/req31   trueL/req19
// T_5         15.0         1.17          0.68          1.12
// T_7         18.7         1.00          0.51          0.83
// T_11        22.0         1.50          0.68          1.11
// T_13        26.0         1.83          0.74          1.21
// T_17        30.0         2.00          0.73          1.20
// T_19        34.0         2.33          0.78          1.28
// T_23        38.0         2.17          0.67          1.09
// T_29        42.0         2.50          0.72          1.17
// W_31        46.7         2.50          0.67          1.09
// W_37        50.7         2.33          0.58          0.95
// W_41        55.0         3.00          0.71          1.15
// W_43        57.4         3.00          0.68          1.12
//
// === 9. CROSS-CHECK AGAINST THE BOUND ARTIFACTS OF THE REPOSITORY ====
// nothing below is recomputed FOR its own sake; these are the same numbers
// this run produced anyway, held against what the repository already carries.
// G2(x#) vs research/exact-g2-ladder.js:
//    T_5   here   12   ladder   12   agree
//    T_7   here   30   ladder   30   agree
//    T_11  here   42   ladder   42   agree
//    T_13  here   66   ladder   66   agree
//    T_17  here  108   ladder  108   agree
//    T_19  here  150   ladder  150   agree
//    T_23  here  204   ladder  204   agree
//    T_29  here  258   ladder  258   agree
// maxsum_m(T_29) vs research/gate-multiplies-03.js tail (m <= 6):
//    here      258    330    390    420    510    540
//    there     258    330    390    420    510    540
// the diagonal, against research/a3-05-bound-L.md section 5:
//    fold p'              7   11   13   17   19   23   29   31
//    Theorem B here      2    2    2    4    4    4    5    6
//    Theorem B there     2    2    2    4    4    4    5    6
//    cond (i) bCor       3    2    8    5   11    8   10   13
//    cond (i) bLit       3    4    8    6   11   13   11   13
//    cond (i) there      3    2    8    5   11    8   10   13
//    true L here         2    1    2    2    2    3    2    4
//    true L there        2    1    2    2    2    3    2    4
//    Theorem B reproduced: true;  true L reproduced: true
//    condition (i) reproduced by the CORRECTED bridge k*c1: true
//    condition (i) reproduced by the LITERAL bridge k*(2p'-2): false
//    all artifact cross-checks agree: true
//
// === 10. WHERE THE ALPHABET FACT BITES, AND WHETHER IT IS REAL ======
// a cell has forced < thmB exactly when a class minimum that A5 charges is
// ABSENT from the tile's gap alphabet. Below: which value is missing, and
// whether it is smaller than the largest gap present (a census accident,
// real) or larger (mere size, and the row is then uninformative).
//
// cell            forced  thmB  trueL   missing class minima          G2 here   verdict
// T_7 @ 11             1     2      1   Z=66 P=24 M=42                   30   CENSUS ACCIDENT (P=24 fits under G2 but does not occur)
// T_7 @ 13             1     2      1   Z=78 P=54 M=24                   30   CENSUS ACCIDENT (M=24 fits under G2 but does not occur)
// T_19 @ 29            2     3      2   Z=174 M=114                     150   CENSUS ACCIDENT (M=114 fits under G2 but does not occur)
//
// cells where the feasible set {k : cmin(k) <= maxsum_k} is NOT an initial segment
// (the ceiling is still valid: L-1 must lie in the set, so L <= 1 + max of it)
//    T_13 @ 17   k=1:ok(36 vs 66)  k=2:no(102 vs 96)  k=3:ok(138 vs 138)  k=4:no(204 vs 156)  k=5:no(240 vs 168)  k=6:no(306 vs 186)
//
// === 11. THE LADDER DIAGONAL ALONE, AGAINST THE REQUIREMENT LINE ====
// the u-frame requirement is a statement about the FOLD LADDER: tile T_x
// folded by the next prime. That is the diagonal, and it is the row that
// decides. Off-diagonal cells are included in the full average below it.
//
// tile   p'   forced  trueL   0.31p/lnp   0.19p/lnp   forced/req31  forced/req19  trueL/req31
// T_5       7       2      2        1.12        0.68          1.79          2.93         1.79
// T_7      11       1      1        1.42        0.87          0.70          1.15         0.70
// T_11     13       2      2        1.57        0.96          1.27          2.08         1.27
// T_13     17       4      2        1.86        1.14          2.15          3.51         1.08
// T_17     19       4      2        2.00        1.23          2.00          3.26         1.00
// T_19     23       4      3        2.27        1.39          1.76          2.87         1.32
// T_23     29       5      2        2.67        1.64          1.87          3.06         0.75
// T_29     31       6      4        2.80        1.72          2.14          3.50         1.43
// MEAN           3.50   2.25        1.96        1.20          1.78          2.91         1.15
//
// ANSWER to the decision question, on the ladder diagonal:
//   mean forced ceiling  = 3.500
//   mean 0.31 p/ln p     = 1.964   ratio 1.782
//   mean 0.19 p/ln p     = 1.204   ratio 2.908
//   forced sits BELOW the 0.31 line at 1 of 8 folds
//   forced sits BELOW the 0.19 line at 0 of 8 folds
//   true L sits BELOW the 0.31 line at 3 of 8 folds
//   true L sits BELOW the 0.19 line at 0 of 8 folds
//   trend of forced/req31 against ln p': slope 0.487 (positive = the bound is losing ground as the ladder deepens)
//   trend of trueL/req31  against ln p': slope -0.234 (this is the TRUTH, not a bound: negative means the requirement is not being
//    violated by L itself over the computable range, only by what can be proved)
//   mean trueL/req31 = 1.168,  mean forced/req31 = 1.712,  the bound pays a factor 1.47 over the truth
// ============================================================================
// READINGS
//
//
//  1. THE COMPATIBILITY LEMMA IS EXACTLY AS STATED, AND ITS MINIMUM IS NOT.
//     Brute force over 1160 (p', g) cells at p' = 5..67 finds 0 mismatches with
//     the rule "g === 0 gives (A,A) and (B,B), g === -2 gives (A,B), g === +2
//     gives (B,A)". But the smallest qualifying gap is 2p' -+ 2, not 2p' - 2:
//     it is 12 at p' = 7 and 12 at p' = 5, 24 at p' = 11 against 2p'-2 = 20,
//     and the table's last column shows min(class P) + min(class M) = 6p'
//     at every one of the seventeen primes, which is Theorem A's identity
//     recomputed from scratch.
//
//  2. THE CORRECTED CONSTANT IS THE ONE THE REPOSITORY ALREADY USES. On the
//     diagonal the corrected bridge reads 3, 2, 8, 5, 11, 8, 10, 13 and
//     `research/a3-05-bound-L.md` section 5's condition (i) row reads
//     3, 2, 8, 5, 11, 8, 10, 13. The literal form k(2p'-2) reads
//     3, 4, 8, 6, 11, 13, 11, 13 and reproduces it at only 5 of 8 folds.
//     So the brief's 2p'-2 is a transcription slip and not a live error in
//     the corpus, and using it would have inflated the bridge at fold 23 from
//     8 to 13.
//
//  3. THE WORD IS THE WHOLE STORY: THE LONGEST ALTERNATION-LEGAL WINDOW OF
//     THE OLD GAP WORD IS L EXACTLY. Section 6b recomputes L by enumerating
//     every old-slot position across the whole new period and testing the
//     absolute kill condition, which never takes a gap modulo anything, and
//     agrees at 36 of 36 cells. Section 6 then matches the published diagonal
//     2, 1, 2, 2, 2, 3, 2, 4 at all eight folds. There is no slack between
//     "alternation-legal in the word" and "realised by a copy", because the
//     alignment is recoverable from the first slot of the run.
//
//  4. FOLD 7 OVER T_5: L = 2 IS FORCED, AND BY ALTERNATION, NOT BY SCARCITY.
//     T_5's word is 6, 12, 12; 6 mod 7 = 6 does not qualify and 12 mod 7 = 5
//     is class M. The three cyclically adjacent pairs are (6,12), (12,12),
//     (12,6) and section 7 finds a legal run of 3 on none of them: the only
//     pair of qualifying neighbours is (M, M), and from state A a class-M gap
//     lands in B, from which another class-M gap is illegal. The candidate
//     fact is confirmed with its mechanism named.
//
//  5. THE FORCED CEILING IS A LITTLE UNDER TWO THIRDS OF THE BRIDGE, ON MEAN
//     RATIO 0.686 against the corrected bridge and 0.654 against the literal
//     one, over 71 cells, equal at only 18 and 17 of them. At T_29 folded by
//     31 it is 6 against a bridge of 13, and at T_19 folded by 23 it is 4
//     against 8. The census does NOT compress onto condition (i).
//
//  6. BUT IT COMPRESSES ALMOST EXACTLY ONTO A5 THEOREM B, WHICH IS THE ANSWER
//     TO THE ANGLE. forced == Theorem B at 68 of 71 cells and is strictly
//     below at 3, always by exactly 1. The whole distance between the forced
//     ceiling and the bridge is the Alternation Lemma, which A5 already has.
//     Compatibility adds one unit, three times in seventy-one cells.
//
//  7. WHERE IT DOES BITE, IT BITES FOR ONE REASON, AND THAT REASON IS A
//     CENSUS ACCIDENT. The three cells are T_7 @ 11 (P = 24 absent, G2 = 30),
//     T_7 @ 13 (M = 24 absent, G2 = 30) and T_19 @ 29 (M = 114 absent,
//     G2 = 150). In every case the missing class minimum is SMALLER than the
//     tile's largest gap, so it is not excluded by size: the value is legal
//     and simply does not occur. This is the same mechanism
//     `research/kappa-not-L.md` records for the fold-11 anomaly, and it now
//     has two more instances and a name.
//
//  8. AND AT THOSE THREE CELLS THE FORCED CEILING IS EXACT. forced = 1, 1, 2
//     against true L = 1, 1, 2. Compatibility does not merely improve the
//     bound there, it closes it. That is the only place in the whole census
//     where anything closes.
//
//  9. THE FEASIBLE SET IS NOT DOWNWARD CLOSED, AND ONE CELL PROVES IT.
//     T_13 @ 17 has cmin(2) = 102 > maxsum_2 = 96 but cmin(3) = 138 =
//     maxsum_3 = 138, so k = 2 fails while k = 3 holds. Any implementation
//     that bisects on k, or that stops at the first failure, would report a
//     ceiling of 3 where the correct one is 4. The ceiling is still valid,
//     because L-1 must lie in the set and the bound takes its maximum.
//
// 10. THE DECISION QUESTION, ON THE LADDER DIAGONAL: NO. Mean forced ceiling
//     3.500 against mean 0.31 p/ln p = 1.964, ratio 1.782, and against mean
//     0.19 p/ln p = 1.204, ratio 2.908. The forced ceiling sits below the
//     0.31 line at 1 of 8 folds and below the 0.19 line at 0 of 8. Averaged
//     over all six folds of each level the same crossing happens once and
//     never comes back: forced/req31 runs 0.68, 0.51, 0.68, 0.88, 0.92, 0.84,
//     0.98, 1.20 at T_5 to T_29 and stays above 1 at every window level.
//
// 11. AND IT IS GETTING WORSE, MEASURABLY. The trend of forced/req31 against
//     ln p' on the diagonal has slope +0.487. The bound is not merely above
//     the requirement line, it is diverging from it, which is the linear-
//     versus-polylog branch showing up directly in the eight computable
//     points rather than as an asymptotic argument.
//
// 12. THE TRUTH IS NOT DOING THAT. trueL/req31 on the diagonal has slope
//     -0.234 and mean 1.168, and trueL/req31 averaged over all folds sits at
//     0.68, 0.51, 0.68, 0.74, 0.73, 0.78, 0.67, 0.72 across T_5 to T_29 with
//     no trend at all. So L itself is compatible with the requirement over
//     the computable range and the bound is not: the bound pays a factor 1.47
//     over the truth on the diagonal, and that factor is what grows. The
//     obstruction is in the proof, not in the object.
//
// 13. THE STRUCTURAL CAP IS VISIBLE IN THE TABLE AS A COLUMN. G2/(3p')
//     crosses 1 at T_11 @ 13 and reaches 2.77 at T_29 @ 31 and 3.07 at
//     W_37 @ 41, and the forced ceiling never falls below it, because
//     maxsum_1 = G2 alone already licenses a run whenever G2 >= 3p'. Nothing
//     in the alphabet or the channel structure can go under that floor, which
//     is A5's cap re-derived from the census side.
//
// 14. THE WINDOW ROWS BEHAVE, AND ONE OF THEM WAS A TRAP. Every W column is a
//     lower bound: the window's alphabet is a subset of the tile's and its
//     maxsum is at most the tile's. A short pilot window on this same code
//     put W_43 @ 61 among the cells where the alphabet fact bites, because
//     the class minimum 246 had not yet occurred inside it. At the window of
//     6.000e+9 recorded here that value is present and the cell reads forced
//     4 against thmB 4, off the list. Absence in a window is not absence in a
//     tile, which is why the three surviving accidents in reading 7 are all
//     on exact full-period tiles and no W row is counted as one.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). One figure
// here is not in the OUTPUT block. No number above was changed.
//
// TOKENIZER ARTIFACT, not a figure: the cyclically adjacent pair "(12,12)"
//   reads as a single number "12,12". Both gaps are printed.
// ---------------------------------------------------------------------------
