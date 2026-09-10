// attack-0c-holesweep-01.js
//
// TODO 0c, the hole-sweep probe Chris asked for (2026-08-20): at the fold from
// level 5 to level 7, track how maxsum degrades COPY BY COPY as the two deleted
// residues sweep through their possible positions -- and produce the full
// curve, embedded, at every fold this method can reach (5->7 through 31->37).
//
// BRIEF CORRECTION, recorded per the corpus-wins rule. The brief wrote
// "natal@5->7". In the corpus natal@p is a COHORT, not a frame: the born-at-p
// slots { kW-1 : 1 <= k <= p-1, k != +-W^{-1} (mod p) } (GLOSSARY "Natal set
// @p", FOLD-PROFILE.md sec on the cohort). The frame in which two holes sweep
// is the COPY decomposition of a fold (U-FRAME.md 5a step 1, PROVEN): folding
// T_x by p lays p copies of the old tile, and copy k deletes exactly the old
// slots whose residue mod p lies in the 2-set {a(k), a(k)-2}, a(k) = -k*(W mod
// p) mod p. So "natal@5->7" is read here as THE FOLD 5->7 (T_5 -> T_7) SEEN
// COPY BY COPY -- and the reading turns out to be the right one to keep the
// word "natal" in: the probe finds that the one symmetry-breaking point of the
// sweep curve is the seam/edge slot W-1, which is exactly the natal cohort's
// birth canal (readings 4-6).
//
// THE OBJECT. Delta_m(x, p, a) = maxsum_m(T_x with every slot = a or a-2
// (mod p) deleted), read cyclically at width W_x -- the residue-deleted maxsum
// of TODO 0c, sieve form (qc/units.js sec 5), identical to
// research/attack-0c0e-01-deleted-family.js. The per-copy curve of a fold is
// C_m(k) = Delta_m(x, p, a(k)), k = 0..p-1; the copy theorem (U-FRAME 5a step
// 2, VERIFIED 40/40) says maxsum_m(T_p) = max_k C_m(k). The DEGRADATION per
// copy is C_1(k) - G2(x#) >= 0 (deletion only merges gaps). This curve is the
// fingerprint any kill-count-free bound on Delta must reproduce.
//
// HONEST DOUBT, stated before the run. (1) This file MEASURES a fingerprint;
// it BOUNDS nothing, so TODO 0c's actual ask (a PROVEN upper bound on Delta
// with no kill count) is untouched here. (2) Per the PRICE RIDER (TODO 0c,
// 2026-08-19) nothing below re-prices the exact levels: the bridge floors at
// ~0.183x whatever this curve shows, and the 0cx0e composition is CLOSED --
// no level-selection claim is made or implied. (3) The corpus killed a fitted
// summary of exactly this kind of curve twice blind (the linear-in-ln D rule,
// scanstat2/scanstat-t37), so NOTHING here is fitted: the deliverable is the
// values, a proven symmetry that halves them, and words.
//
// WHAT IS NEW HERE. (a) The full per-copy curves, all alignments printed, at
// nine folds 5->7 .. 31->37 -- attack-0c0e-01 embedded only min/mean/max and
// its levels started at 7->11. (b) The Mirror-Sweep Lemma (proof in sec 3
// below): the tile's known mirror (GLOSSARY "Mirror", r <-> W-2-r on twin
// slots) conjugates alignment a into w - a (w = W mod p), EXCEPT at the edge
// slot W-1, the mirror's unique fixed slot, whose residue breaks the
// conjugation. Hence Delta_m(a) = Delta_m(w-a) for every a outside the four
// specials {1, w-1, w+1, p-1}; in copy order the curve is a PALINDROME
// C(k) = C(p-1-k) broken only at the seam-striking copies; and at the specials
// the exact anomaly Delta_m(a) = maxsum_m(config(w-a) minus the edge slot)
// holds, giving Delta_m(a) >= Delta_m(w-a) one-sidedly. All of it is verified
// exhaustively below. (c) A one-pass simultaneous-alignment walker (m = 1)
// that computes a whole fold's family in a single stream, validated against
// the naive per-alignment engine at six folds, then run at 29->31 and 31->37;
// 31->37 is a NEW exact family level for the deleted object (the previous
// deepest was 29->31, attack-0c0e-01).
//
// CUSTODY. D = prod(q-2) and the G2 ladder are self-tested; the min/mean/max
// rows at m = 1 must reproduce attack-0c0e-01's embedded figures figure for
// figure at the six folds it reached; max_a Delta_1 must equal G2(31#) = 348
// (eleventh ladder term) at 29->31 and G2(37#) = 528 (twelfth term, exhaustive
// maximality certificate, history/staging/scanstat-t37.md) at 31->37.
//
// usage: node research/attack-0c-holesweep-01.js [maxFoldPrime]
//        default 37 (full run, ~4-8 min). Pass 31 to skip the 31->37 stream.

'use strict';

const ARGV_MAX = Number(process.argv[2] || 37);
const PRIMES = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
const MMAX = 8;

const T0 = Date.now();
const log = (s) => process.stderr.write('[' + ((Date.now() - T0) / 1000).toFixed(1) + 's] ' + s + '\n');
const F = (v, d = 4) => (Number.isFinite(v) ? v.toFixed(d) : '   -');
const pad = (s, n) => String(s).padStart(n);

let FAILS = 0;
function check(label, ok, detail) {
  if (!ok) { FAILS++; console.log('  FAIL  ' + label + (detail ? '   ' + detail : '')); }
  else console.log('  ok    ' + label + (detail ? '   ' + detail : ''));
}

// ------------------------------------------------------------------ tiles
// Generation identical to attack-0c0e-01-deleted-family.js: T_3 = {5} mod 6,
// fold = p copies minus the 2-set per copy (U-FRAME 5a step 1). Never sieves.
function baseTile() { return { slots: Float64Array.from([5]), W: 6, x: 3 }; }

function foldTile(tile, p) {
  const { slots, W } = tile, D = slots.length;
  const rs = new Int32Array(D);
  for (let i = 0; i < D; i++) rs[i] = slots[i] % p;
  const wp = W % p;
  const out = new Float64Array(D * (p - 2));
  let n = 0;
  for (let k = 0; k < p; k++) {
    const off = k * W, kw = (k * wp) % p;
    const d0 = (p - kw) % p, d2 = (2 * p - 2 - kw) % p;
    for (let i = 0; i < D; i++) if (rs[i] !== d0 && rs[i] !== d2) out[n++] = slots[i] + off;
  }
  if (n !== out.length) throw new Error('kill count wrong at p=' + p);
  return { slots: out, W: W * p, x: p };
}

// maxsum_m, m = 1..MMAX, over a cyclic slot list (ring buffer; power-of-two
// mask, same as attack-0c0e-01). Only m <= (number of slots) is meaningful.
const RING = 16, MASK = RING - 1;
function maxsumsOfSequence(pushAll, W) {
  const buf = new Float64Array(RING);
  let cnt = 0;
  const best = new Float64Array(MMAX + 1);
  const firstFew = [];
  const push = (v) => {
    if (firstFew.length < MMAX) firstFew.push(v);
    buf[cnt & MASK] = v; cnt++;
    const lim = cnt - 1 < MMAX ? cnt - 1 : MMAX;
    for (let m = 1; m <= lim; m++) {
      const s = v - buf[(cnt - 1 - m) & MASK];
      if (s > best[m]) best[m] = s;
    }
  };
  pushAll(push);
  for (const v of firstFew) push(v + W);
  return { best, n: cnt };
}
function maxsumsOfTile(tile) {
  return maxsumsOfSequence((push) => { const s = tile.slots; for (let i = 0; i < s.length; i++) push(s[i]); }, tile.W);
}

// per-copy family of a fold, naive per-alignment engine, m <= MMAX.
// Returns rows in COPY order k = 0..p-1 with the alignment a(k) attached.
function holeSweepNaive(tile, p) {
  const { slots, W } = tile, D = slots.length;
  const rs = new Int32Array(D);
  for (let i = 0; i < D; i++) rs[i] = slots[i] % p;
  const wp = W % p;
  const edgeRes = (W - 1) % p;
  const rows = [];
  for (let k = 0; k < p; k++) {
    const kw = (k * wp) % p;
    const a = (p - kw) % p, d2 = (a - 2 + p) % p;
    let alive = 0;
    const r = maxsumsOfSequence((push) => {
      for (let i = 0; i < D; i++) { const q = rs[i]; if (q !== a && q !== d2) { alive++; push(slots[i]); } }
    }, W);
    const seam = (edgeRes === a || edgeRes === d2);   // this copy strikes W-1
    rows.push({ k, a, alive, seam, best: Array.from(r.best) });
  }
  return rows;
}

// winning-window anatomy at m = 1 for one alignment (from attack-0c0e-01).
function anatomy(tile, p, aStar) {
  const { slots, W } = tile, D = slots.length;
  const d0 = aStar, d2 = (aStar - 2 + p) % p;
  const keep = [];
  for (let i = 0; i < D; i++) { const q = slots[i] % p; if (q !== d0 && q !== d2) keep.push(i); }
  const n = keep.length;
  if (n === 0) return { bestGap: W, merges: D, touchesOldRecord: true };
  let bestGap = -1, bi = -1;
  for (let j = 0; j < n; j++) {
    const i0 = keep[j], i1 = keep[(j + 1) % n];
    const g = (j + 1 < n) ? slots[i1] - slots[i0] : W - slots[i0] + slots[i1];
    if (g > bestGap) { bestGap = g; bi = j; }
  }
  const i0 = keep[bi], i1 = keep[(bi + 1) % n];
  const span = (bi + 1 < n) ? (i1 - i0) : (D - i0 + i1);
  let oldMax = -1, oldIdx = -1;
  for (let i = 0; i < D; i++) {
    const g = (i + 1 < D) ? slots[i + 1] - slots[i] : W - slots[i] + slots[0];
    if (g > oldMax) { oldMax = g; oldIdx = i; }
  }
  let touchesOldRecord = false;
  for (let t = 0; t < span; t++) if ((i0 + t) % D === oldIdx) touchesOldRecord = true;
  return { bestGap, merges: span, touchesOldRecord, oldMax };
}

// ------------------------------------------------ one-pass sweep walker, m=1
// Computes Delta_1(x, p, a) for ALL p alignments in a single ascending pass
// over the old tile's slots. Mechanism: a slot with residue r (mod p) is
// deleted for exactly the two alignments a in {r, r+2}; so at any moment at
// most TWO alignments are "inside a run" of consecutively deleted slots, and
// every other alignment's gaps are plain base gaps between adjacent slots.
// best[a] = max( closed-run gaps for a, largest base gap whose four endpoint
// exclusions avoid a ). Base gaps are kept in a top-K list (K = 512); each
// base gap excludes at most 4 alignments, so the list would have to be
// pathologically aligned to starve any a -- and sufficiency is ASSERTED, plus
// the whole walker is validated against the naive engine at six folds.
// Cyclic wrap: the first BUFN slots are buffered and replayed at +W until all
// open runs close.
function sweepWalkerFactory(p, W) {
  const runBest = new Float64Array(p);
  const open = [];              // at most a handful of {a, start}
  const K = 512;
  const topG = [], topE = [];   // parallel: gap value, [e0,e1,e2,e3]
  let vPrev = -1, rPrev = -1;
  const BUFN = 8192;
  const bufV = new Float64Array(BUFN), bufR = new Int32Array(BUFN);
  let bufN = 0;

  function addTop(g, e0, e1, e2, e3) {
    if (topG.length >= K && g <= topG[topG.length - 1]) return;
    let lo = 0, hi = topG.length;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (topG[mid] >= g) lo = mid + 1; else hi = mid; }
    topG.splice(lo, 0, g); topE.splice(lo, 0, [e0, e1, e2, e3]);
    if (topG.length > K) { topG.pop(); topE.pop(); }
  }
  function step(v, r, replay) {
    if (vPrev < 0) { vPrev = v; rPrev = r; return; }
    const r2 = (r + 2) % p;
    for (let j = open.length - 1; j >= 0; j--) {
      const o = open[j];
      if (o.a !== r && o.a !== r2) {
        const g = v - o.start;
        if (g > runBest[o.a]) runBest[o.a] = g;
        open.splice(j, 1);
      }
    }
    addTop(v - vPrev, rPrev, (rPrev + 2) % p, r, r2);
    // During the wrap replay (except its first slot) only CLOSE runs: a run
    // opening at replayed slot j >= 1 also opened at main-pass slot j with the
    // same start, so it is already counted, and re-opening it could outlive
    // the buffer. The FIRST replayed slot is the exception: a run beginning at
    // the tile's first slot has its left boundary at the last pre-wrap alive
    // slot, which the main pass could not see (vPrev was null at slot 0), so
    // opens are allowed there.
    if (!replay) {
      let h0 = false, h2 = false;
      for (let j = 0; j < open.length; j++) { if (open[j].a === r) h0 = true; if (open[j].a === r2) h2 = true; }
      if (!h0) open.push({ a: r, start: vPrev });
      if (!h2) open.push({ a: r2, start: vPrev });
    }
    vPrev = v; rPrev = r;
  }
  return {
    push(v, r) {
      if (bufN < BUFN) { bufV[bufN] = v; bufR[bufN] = r; bufN++; }
      step(v, r);
    },
    finish() {
      let i = 0;
      while (i < bufN && (open.length > 0 || i < 4)) { step(bufV[i] + W, bufR[i], i > 0); i++; }
      if (open.length > 0) throw new Error('sweep walker: run still open after replaying ' + i + ' slots');
      const best = new Float64Array(p);
      for (let a = 0; a < p; a++) {
        let base = -1;
        for (let t = 0; t < topG.length; t++) {
          const e = topE[t];
          if (e[0] !== a && e[1] !== a && e[2] !== a && e[3] !== a) { base = topG[t]; break; }
        }
        if (base < 0 && runBest[a] === 0) throw new Error('sweep walker: alignment ' + a + ' starved');
        best[a] = Math.max(base, runBest[a]);
      }
      return best;
    },
  };
}

// ================================================================== the run
console.log('='.repeat(78));
console.log('ATTACK 0c HOLE-SWEEP: THE PER-COPY DEGRADATION CURVE OF A FOLD');
console.log('='.repeat(78));
console.log('C_m(k) = Delta_m(x, p, a(k)), a(k) = -k*(W mod p) mod p: copy k of the fold');
console.log('T_x -> T_p, with its two holes at residues {a(k), a(k)-2}. Sieve form.');
console.log('');

const tiles = [];
{
  let t = baseTile();
  tiles.push(t);
  for (let i = 1; i < PRIMES.length; i++) {
    const p = PRIMES[i];
    if (p > 23) break;                 // T_23 is the last in-memory tile
    t = foldTile(t, p);
    tiles.push(t);
    log('built T_' + p + '  D = ' + t.slots.length);
  }
}
const byX = {}; for (const t of tiles) byX[t.x] = t;

console.log('-'.repeat(78));
console.log('SELF-TESTS');
console.log('-'.repeat(78));
const G2rec = { 3: 6, 5: 12, 7: 30, 11: 42, 13: 66, 17: 108, 19: 150, 23: 204, 29: 258, 31: 348, 37: 528 };
{
  let D = 1;
  for (const t of tiles) {
    if (t.x > 3) D *= (t.x - 2);
    check('D(T_' + t.x + ') = prod (q-2)', t.slots.length === D, 'D = ' + t.slots.length);
  }
  for (const t of tiles) {
    const r = maxsumsOfTile(t);
    check('G2(' + t.x + '#) = ' + G2rec[t.x], r.best[1] === G2rec[t.x], 'maxsum_1 = ' + r.best[1]);
  }
}

// ------------------------------------------------------- the named probe: 5->7
console.log('');
console.log('='.repeat(78));
console.log('SEC 1. THE NAMED PROBE: FOLD 5->7, EVERY COPY, EVERY MEANINGFUL m');
console.log('='.repeat(78));
{
  const t5 = byX[5], p = 7, w = t5.W % p;
  console.log('T_5 = {' + Array.from(t5.slots).join(', ') + '} mod ' + t5.W + ';  fold prime 7;  w = W mod 7 = ' + w);
  console.log('G2(5#) = 12; the edge slot is W-1 = 29, residue mod 7 = ' + ((t5.W - 1) % p));
  console.log('natal@7 (FOLD-PROFILE): edge-slot copies that survive; the fold strikes the');
  console.log('edge slot in exactly the copies whose 2-set contains ' + ((t5.W - 1) % p) + ', i.e. a in {w-1, w+1} = {' + ((w - 1 + p) % p) + ', ' + ((w + 1) % p) + '}.');
  console.log('');
  const rows = holeSweepNaive(t5, p);
  console.log('  k   a(k)  holes {a,a-2}  killed slots        alive  D_1  D_2  D_3   deg1  seam?  merges  hitsOldRec');
  const rs = Array.from(t5.slots, (s) => s % p);
  for (const row of rows) {
    const d2 = (row.a - 2 + p) % p;
    const killed = [];
    for (let i = 0; i < t5.slots.length; i++) if (rs[i] === row.a || rs[i] === d2) killed.push(t5.slots[i]);
    const an = anatomy(t5, p, row.a);
    const cells = [];
    for (let m = 1; m <= 3; m++) cells.push(pad(m <= row.alive ? row.best[m] : '-', 4));
    console.log('  ' + row.k + '   ' + pad(row.a, 3) + '    {' + row.a + ',' + d2 + '}' +
      '         ' + pad('{' + killed.join(',') + '}', 12) + '    ' + pad(row.alive, 4) +
      ' ' + cells.join(' ') + '   ' + pad(row.best[1] - G2rec[5], 4) +
      '   ' + (row.seam ? 'SEAM' : '  - ') + '    ' + pad(an.merges, 4) + '      ' + (an.touchesOldRecord ? 'yes' : 'no'));
  }
  let mx = 0; for (const r of rows) if (r.best[1] > mx) mx = r.best[1];
  check('copy theorem at 5->7: max_k C_1(k) = G2(7#) = 30', mx === 30, 'max = ' + mx);
  const inA = rows.slice().sort((u, v) => u.a - v.a).map((r) => r.best[1]);
  console.log('');
  console.log('the curve in hole-position order a = 0..6:  ' + inA.join(', '));
  console.log('the curve in copy order        k = 0..6:  ' + rows.map((r) => r.best[1]).join(', '));
}

// ------------------------------------------------------------ the mirror law
console.log('');
console.log('='.repeat(78));
console.log('SEC 2. THE MIRROR-SWEEP LEMMA, STATED AND VERIFIED EXHAUSTIVELY');
console.log('='.repeat(78));
console.log('The tile mirror sigma(s) = W-2-s maps T_x to itself (GLOSSARY "Mirror"),');
console.log('reverses cyclic order (every maxsum_m invariant), and fixes exactly one');
console.log('slot: the edge W-1. On every NON-edge slot it is integer-exact, so it maps');
console.log('the deletion classes {a, a-2} (mod p) to {w-a, w-a-2}, w = W mod p. Hence');
console.log('  (i)  Delta_m(a) = Delta_m((w-a) mod p) for all m, for every a outside');
console.log('       the specials {1, w-1, w+1, p-1};');
console.log('  (ii) in copy order, C(k) = C(p-1-k) away from the specials (a palindrome:');
console.log('       a(k)+a(p-1-k) = w since a(k) = -k*w);');
console.log('  (iii) at a in {w-1, w+1} (the copies that STRIKE the edge slot) the exact');
console.log('       anomaly Delta_m(a) = maxsum_m(config(w-a) MINUS the edge slot) holds,');
console.log('       so Delta_m(a) >= Delta_m(w-a): the seam side never loses.');
console.log('Proof of (iii): sigma(del_a) = del_{w-a} on non-edge slots, plus the edge');
console.log('slot iff a strikes it; apply sigma-invariance of maxsum. Deleting one more');
console.log('slot only merges gaps, hence the inequality.');
console.log('');
console.log('  fold      w   mirror pairs equal (all m)   specials    anomaly exact?  strict breaks');
const SWEEPS = [];   // keep naive families for later sections
for (const x of [5, 7, 11, 13, 17, 19, 23]) {
  const t = byX[x];
  const p = PRIMES[PRIMES.indexOf(x) + 1];
  const rows = holeSweepNaive(t, p);
  SWEEPS.push({ x, p, t, rows });
  const w = t.W % p;
  const byA = {}; for (const r of rows) byA[r.a] = r;
  const spec = new Set([1 % p, (w - 1 + p) % p, (w + 1) % p, (p - 1) % p]);
  let pairsOK = 0, pairsAll = 0, bad = 0;
  for (let a = 0; a < p; a++) {
    const am = (w - a + p * 2) % p;
    if (spec.has(a) || spec.has(am) || am < a) continue;
    pairsAll++;
    const mTop = Math.min(MMAX, byA[a].alive, byA[am].alive);
    let ok = true;
    for (let m = 1; m <= mTop; m++) if (byA[a].best[m] !== byA[am].best[m]) ok = false;
    if (ok) pairsOK++; else bad++;
  }
  // (iii) exact anomaly at the edge-striking specials
  let anomOK = true, strict = 0;
  for (const a of [(w - 1 + p) % p, (w + 1) % p]) {
    const am = (w - a + p * 2) % p;      // 1 or p-1
    if (a === am) continue;
    // config(am) minus the edge slot, maxsums:
    const d0 = am, d2 = (am - 2 + p) % p, W = t.W;
    let alive = 0;
    const r = maxsumsOfSequence((push) => {
      const s = t.slots;
      for (let i = 0; i < s.length; i++) {
        const q = s[i] % p;
        if (q !== d0 && q !== d2 && s[i] !== W - 1) { alive++; push(s[i]); }
      }
    }, W);
    const mTop = Math.min(MMAX, byA[a].alive, alive);
    for (let m = 1; m <= mTop; m++) if (byA[a].best[m] !== r.best[m]) anomOK = false;
    if (byA[a].best[1] > byA[am].best[1]) strict++;
    if (byA[a].best[1] < byA[am].best[1]) anomOK = false;   // (iii) forbids this
  }
  if (bad > 0 || !anomOK) FAILS++;
  console.log('  ' + pad(x + '->' + p, 7) + '  ' + pad(w, 3) + '   ' + pad(pairsOK + ' of ' + pairsAll, 15) +
    '              {' + Array.from(spec).sort((u, v) => u - v).join(',') + '}' +
    '     ' + (anomOK ? 'yes' : 'NO') + '            ' + strict + ' of 2');
}

// ------------------------------------------- full curves, in-memory folds
console.log('');
console.log('='.repeat(78));
console.log('SEC 3. FULL m=1 CURVES, FOLDS 7->11 .. 23->29 (in copy order)');
console.log('='.repeat(78));
// custody: attack-0c0e-01-deleted-family.js embedded min/mean/max at m=1
const CUSTODY = {
  11: { min: 48, mean: 64.62, max: 66 }, 13: { min: 90, mean: 102.71, max: 108 },
  17: { min: 138, mean: 144.95, max: 150 }, 19: { min: 180, mean: 189.91, max: 204 },
  23: { min: 222, mean: 234.00, max: 258 },
};
for (const S of SWEEPS) {
  if (S.x < 7) continue;
  const { x, p, t, rows } = S;
  const g2 = G2rec[x];
  let mx = 0, mn = Infinity, sum = 0;
  for (const r of rows) { if (r.best[1] > mx) mx = r.best[1]; if (r.best[1] < mn) mn = r.best[1]; sum += r.best[1]; }
  const mean = sum / p;
  console.log('');
  console.log('fold ' + x + '->' + p + '   w = ' + (t.W % p) + '   G2(old) = ' + g2 +
    '   curve min/mean/max = ' + mn + '/' + F(mean, 2) + '/' + mx);
  let line1 = '  k    : ', line2 = '  a(k) : ', line3 = '  C_1  : ', line4 = '  deg  : ', line5 = '  mark : ';
  for (const r of rows) {
    const wdt = Math.max(String(r.best[1]).length, 4);
    line1 += pad(r.k, wdt); line2 += pad(r.a, wdt); line3 += pad(r.best[1], wdt);
    line4 += pad(r.best[1] - g2, wdt);
    line5 += pad((r.best[1] === mx ? '*' : '') + (r.seam ? 'S' : ''), wdt);
  }
  console.log(line1); console.log(line2); console.log(line3); console.log(line4); console.log(line5);
  console.log('  (* attains the fold maximum; S strikes the seam/edge slot)');
  // alive total = D(p-2), the kill law
  let aliveSum = 0; for (const r of rows) aliveSum += r.alive;
  check('kill law: sum_k alive = D*(p-2)', aliveSum === t.slots.length * (p - 2), aliveSum + ' vs ' + t.slots.length * (p - 2));
  if (CUSTODY[x]) {
    const c = CUSTODY[x];
    check('custody vs 0c0e-01 embedded (min/mean/max at m=1)',
      mn === c.min && mx === c.max && Math.abs(mean - c.mean) < 0.005,
      mn + '/' + F(mean, 2) + '/' + mx + ' vs ' + c.min + '/' + c.mean.toFixed(2) + '/' + c.max);
  }
  // copy theorem, m <= 8, against the next tile (in memory or streamed once)
  let target;
  if (byX[p]) target = maxsumsOfTile(byX[p]).best;
  else {
    log('streaming maxsum family of T_' + p + ' for the copy-theorem check');
    target = maxsumsOfSequence((push) => {
      const { slots, W } = t, D = slots.length;
      const rs = new Int32Array(D);
      for (let i = 0; i < D; i++) rs[i] = slots[i] % p;
      const wp = W % p;
      for (let k = 0; k < p; k++) {
        const off = k * W, kw = (k * wp) % p;
        const d0 = (p - kw) % p, d2 = (2 * p - 2 - kw) % p;
        for (let i = 0; i < D; i++) if (rs[i] !== d0 && rs[i] !== d2) push(slots[i] + off);
      }
    }, t.W * p).best;
  }
  let allEq = true;
  for (let m = 1; m <= MMAX; m++) {
    let mxm = 0; for (const r of rows) if (r.best[m] > mxm) mxm = r.best[m];
    if (mxm !== target[m]) allEq = false;
  }
  check('copy theorem all m <= 8: max_k C_m(k) = maxsum_m(T_' + p + ')', allEq);
  log('fold ' + x + '->' + p + ' done');
}

// ------------------------------------------------- walker validation + streams
console.log('');
console.log('='.repeat(78));
console.log('SEC 4. THE ONE-PASS WALKER: VALIDATION, THEN 29->31 AND 31->37');
console.log('='.repeat(78));
for (const S of SWEEPS) {
  const { x, p, t, rows } = S;
  const wk = sweepWalkerFactory(p, t.W);
  const s = t.slots;
  for (let i = 0; i < s.length; i++) wk.push(s[i], s[i] % p);
  const best = wk.finish();
  let ok = true;
  for (const r of rows) if (best[r.a] !== r.best[1]) ok = false;
  check('walker = naive engine at fold ' + x + '->' + p + ' (all ' + p + ' alignments)', ok);
}

const t23 = byX[23];
const s23 = t23.slots, D23 = s23.length, W23 = t23.W;
const r23_29 = new Int32Array(D23), r23_31 = new Int32Array(D23), r23_37 = new Int32Array(D23);
for (let i = 0; i < D23; i++) { r23_29[i] = s23[i] % 29; r23_31[i] = s23[i] % 31; r23_37[i] = s23[i] % 37; }
const W29 = W23 * 29, W31 = W29 * 31;
if (W31 >= 2 ** 53) throw new Error('W31 exceeds 2^53');

function printCurve(x, p, w, best, g2old) {
  const p1 = PRIMES[PRIMES.indexOf(x) + 1];
  const wp = w;
  let mx = 0, mn = Infinity, sum = 0;
  for (let a = 0; a < p; a++) { const v = best[a]; if (v > mx) mx = v; if (v < mn) mn = v; sum += v; }
  const mean = sum / p;
  console.log('');
  console.log('fold ' + x + '->' + p + '   w = ' + wp + '   G2(old) = ' + g2old +
    '   curve min/mean/max = ' + mn + '/' + F(mean, 2) + '/' + mx);
  const edgeRes = (x === 29 ? (W29 - 1) % p : (W31 - 1) % p);
  let line1 = '  k    : ', line2 = '  a(k) : ', line3 = '  C_1  : ', line4 = '  deg  : ', line5 = '  mark : ';
  for (let k = 0; k < p; k++) {
    const a = (p - (k * (wp % p)) % p) % p;
    const d2 = (a - 2 + p) % p;
    const v = best[a];
    const wdt = Math.max(String(v).length, 4);
    line1 += pad(k, wdt); line2 += pad(a, wdt); line3 += pad(v, wdt); line4 += pad(v - g2old, wdt);
    line5 += pad((v === mx ? '*' : '') + ((edgeRes === a || edgeRes === d2) ? 'S' : ''), wdt);
  }
  console.log(line1); console.log(line2); console.log(line3); console.log(line4); console.log(line5);
  console.log('  (* attains the fold maximum; S strikes the seam/edge slot)');
  // mirror law on the streamed curve
  const spec = new Set([1 % p, (wp - 1 + p) % p, (wp + 1) % p, (p - 1) % p]);
  let pairsOK = 0, pairsAll = 0;
  for (let a = 0; a < p; a++) {
    const am = (wp - a + 2 * p) % p;
    if (spec.has(a) || spec.has(am) || am < a) continue;
    pairsAll++;
    if (best[a] === best[am]) pairsOK++;
  }
  check('mirror pairs equal at ' + x + '->' + p, pairsOK === pairsAll, pairsOK + ' of ' + pairsAll);
  let seamOK = true;
  for (const a of [(wp - 1 + p) % p, (wp + 1) % p]) {
    const am = (wp - a + 2 * p) % p;
    if (a !== am && best[a] < best[am]) seamOK = false;
  }
  check('seam side never loses at ' + x + '->' + p, seamOK);
  return { mn, mean, mx };
}

// fold 29->31: one pass over T_29 = 29 filtered copies of T_23
{
  log('streaming fold 29->31 (one pass, all 31 alignments)');
  const p = 31, wk = sweepWalkerFactory(p, W29);
  const wp23_29 = W23 % 29;
  for (let k29 = 0; k29 < 29; k29++) {
    const off = k29 * W23, kw = (k29 * wp23_29) % 29;
    const d0 = (29 - kw) % 29, d2 = (2 * 29 - 2 - kw) % 29;
    const shift31 = (k29 * (W23 % 31)) % 31;
    for (let i = 0; i < D23; i++) {
      const q = r23_29[i];
      if (q === d0 || q === d2) continue;
      let r = r23_31[i] + shift31; if (r >= 31) r -= 31;
      wk.push(s23[i] + off, r);
    }
    if (k29 % 8 === 0) log('  29->31 copy-of-23 ' + k29 + '/29');
  }
  const best = wk.finish();
  const st = printCurve(29, p, W29 % p, best, G2rec[29]);
  check('copy theorem at 29->31: max_a Delta_1 = G2(31#) = 348', st.mx === 348, 'max = ' + st.mx);
  check('custody vs 0c0e-01 embedded: 318/328.45/348',
    st.mn === 318 && st.mx === 348 && Math.abs(st.mean - 328.45) < 0.005,
    st.mn + '/' + F(st.mean, 2) + '/' + st.mx);
  log('fold 29->31 done');
}

// fold 31->37: one pass over T_31 = 31 filtered copies of (29 filtered copies of T_23)
if (ARGV_MAX >= 37) {
  log('streaming fold 31->37 (one pass over 6.23e9 slots, all 37 alignments)');
  const p = 37, wk = sweepWalkerFactory(p, W31);
  const wp23_29 = W23 % 29, wp29_31 = W29 % 31;
  const w23_31 = W23 % 31, w23_37 = W23 % 37, w29_37 = W29 % 37;
  for (let k31 = 0; k31 < 31; k31++) {
    const off31 = k31 * W29;
    const kw31 = (k31 * wp29_31) % 31;
    const e0 = (31 - kw31) % 31, e2 = (2 * 31 - 2 - kw31) % 31;   // kill classes on s29 mod 31
    for (let k29 = 0; k29 < 29; k29++) {
      const off = off31 + k29 * W23;
      const kw = (k29 * wp23_29) % 29;
      const d0 = (29 - kw) % 29, d2 = (2 * 29 - 2 - kw) % 29;
      // s29 mod 31 = (r23_31 + k29*w23_31) mod 31; compare against e0/e2 by
      // pre-shifting the kill classes onto r23_31 directly:
      const sh31 = (k29 * w23_31) % 31;
      const c0 = (e0 - sh31 + 31) % 31, c2 = (e2 - sh31 + 31) % 31;
      const sh37 = (k29 * w23_37 + k31 * w29_37) % 37;
      for (let i = 0; i < D23; i++) {
        const q = r23_29[i];
        if (q === d0 || q === d2) continue;
        const u = r23_31[i];
        if (u === c0 || u === c2) continue;
        let r = r23_37[i] + sh37; if (r >= 37) r -= 37;
        wk.push(s23[i] + off, r);
      }
    }
    log('  31->37 copy-of-29 ' + (k31 + 1) + '/31');
  }
  const best = wk.finish();
  const st = printCurve(31, p, W31 % p, best, G2rec[31]);
  check('copy theorem at 31->37: max_a Delta_1 = G2(37#) = 528 (scanstat-t37 exhaustive cert)',
    st.mx === 528, 'max = ' + st.mx);
  log('fold 31->37 done');
}

// --------------------------------------------------------- shape descriptors
console.log('');
console.log('='.repeat(78));
console.log('SEC 5. SHAPE DESCRIPTORS ACROSS THE LADDER (m = 1, no fits)');
console.log('='.repeat(78));
console.log('  fold     p   min/G2old  mean/G2old  max/G2old  max/min  #atMax  #distinct  seam@max?  kills~Delta?');
for (const S of SWEEPS) {
  const { x, p, rows, t } = S;
  const g2 = G2rec[x];
  let mx = 0, mn = Infinity, sum = 0;
  for (const r of rows) { if (r.best[1] > mx) mx = r.best[1]; if (r.best[1] < mn) mn = r.best[1]; sum += r.best[1]; }
  const mean = sum / p;
  const distinct = new Set(rows.map((r) => r.best[1])).size;
  const atMax = rows.filter((r) => r.best[1] === mx);
  const seamAtMax = atMax.some((r) => r.seam);
  // do copies with more kills degrade more? split at the median kill count
  const kills = rows.map((r) => ({ kk: t.slots.length - r.alive, v: r.best[1] })).sort((u, v) => u.kk - v.kk);
  const half = Math.floor(p / 2);
  const lo = kills.slice(0, half).reduce((s2, e) => s2 + e.v, 0) / half;
  const hi = kills.slice(p - half).reduce((s2, e) => s2 + e.v, 0) / half;
  console.log('  ' + pad(x + '->' + p, 7) + ' ' + pad(p, 3) + '   ' + pad(F(mn / g2), 8) + '   ' + pad(F(mean / g2), 8) +
    '   ' + pad(F(mx / g2), 8) + '  ' + pad(F(mx / mn), 7) + '  ' + pad(atMax.length + ' of ' + p, 6) +
    '  ' + pad(distinct, 8) + '   ' + pad(seamAtMax ? 'yes' : 'no', 7) +
    '   hi-kill mean ' + F(hi, 1) + ' vs lo-kill ' + F(lo, 1));
}
console.log('  (29->31 and 31->37 rows are in sec 4; their min/mean/max print there)');

console.log('');
console.log('='.repeat(78));
console.log(FAILS === 0 ? 'ALL SELF-TESTS PASS' : FAILS + ' CHECK(S) FAILED');
console.log('='.repeat(78));
if (FAILS > 0) process.exitCode = 1;

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/attack-0c-holesweep-01.js -- 37
//   invocation:  node research/attack-0c-holesweep-01.js 37
//   code-sha256: e24f53e70d590428e46b8595e54014e1e0f94ab85232075f9f36af5b48387cd8
//   out-sha256:  df91c7b0c9939777bfac1a45637b22f19d9d2490cb294a13144acea3b00e63aa
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     617.9 s
// ============================================================================
// ==============================================================================
// ATTACK 0c HOLE-SWEEP: THE PER-COPY DEGRADATION CURVE OF A FOLD
// ==============================================================================
// C_m(k) = Delta_m(x, p, a(k)), a(k) = -k*(W mod p) mod p: copy k of the fold
// T_x -> T_p, with its two holes at residues {a(k), a(k)-2}. Sieve form.
//
// ------------------------------------------------------------------------------
// SELF-TESTS
// ------------------------------------------------------------------------------
//   ok    D(T_3) = prod (q-2)   D = 1
//   ok    D(T_5) = prod (q-2)   D = 3
//   ok    D(T_7) = prod (q-2)   D = 15
//   ok    D(T_11) = prod (q-2)   D = 135
//   ok    D(T_13) = prod (q-2)   D = 1485
//   ok    D(T_17) = prod (q-2)   D = 22275
//   ok    D(T_19) = prod (q-2)   D = 378675
//   ok    D(T_23) = prod (q-2)   D = 7952175
//   ok    G2(3#) = 6   maxsum_1 = 6
//   ok    G2(5#) = 12   maxsum_1 = 12
//   ok    G2(7#) = 30   maxsum_1 = 30
//   ok    G2(11#) = 42   maxsum_1 = 42
//   ok    G2(13#) = 66   maxsum_1 = 66
//   ok    G2(17#) = 108   maxsum_1 = 108
//   ok    G2(19#) = 150   maxsum_1 = 150
//   ok    G2(23#) = 204   maxsum_1 = 204
//
// ==============================================================================
// SEC 1. THE NAMED PROBE: FOLD 5->7, EVERY COPY, EVERY MEANINGFUL m
// ==============================================================================
// T_5 = {11, 17, 29} mod 30;  fold prime 7;  w = W mod 7 = 2
// G2(5#) = 12; the edge slot is W-1 = 29, residue mod 7 = 1
// natal@7 (FOLD-PROFILE): edge-slot copies that survive; the fold strikes the
// edge slot in exactly the copies whose 2-set contains 1, i.e. a in {w-1, w+1} = {1, 3}.
//
//   k   a(k)  holes {a,a-2}  killed slots        alive  D_1  D_2  D_3   deg1  seam?  merges  hitsOldRec
//   0     0    {0,5}                   {}       3   12   24   30      0     -        1      yes
//   1     5    {5,3}                 {17}       2   18   30    -      6     -        2      yes
//   2     3    {3,1}              {17,29}       1   30    -    -     18   SEAM       3      yes
//   3     1    {1,6}                 {29}       2   24   30    -     12   SEAM       2      yes
//   4     6    {6,4}                 {11}       2   18   30    -      6     -        2      no
//   5     4    {4,2}                 {11}       2   18   30    -      6     -        2      no
//   6     2    {2,0}                   {}       3   12   24   30      0     -        1      yes
//   ok    copy theorem at 5->7: max_k C_1(k) = G2(7#) = 30   max = 30
//
// the curve in hole-position order a = 0..6:  12, 24, 12, 30, 18, 18, 18
// the curve in copy order        k = 0..6:  12, 18, 30, 24, 18, 18, 12
//
// ==============================================================================
// SEC 2. THE MIRROR-SWEEP LEMMA, STATED AND VERIFIED EXHAUSTIVELY
// ==============================================================================
// The tile mirror sigma(s) = W-2-s maps T_x to itself (GLOSSARY "Mirror"),
// reverses cyclic order (every maxsum_m invariant), and fixes exactly one
// slot: the edge W-1. On every NON-edge slot it is integer-exact, so it maps
// the deletion classes {a, a-2} (mod p) to {w-a, w-a-2}, w = W mod p. Hence
//   (i)  Delta_m(a) = Delta_m((w-a) mod p) for all m, for every a outside
//        the specials {1, w-1, w+1, p-1};
//   (ii) in copy order, C(k) = C(p-1-k) away from the specials (a palindrome:
//        a(k)+a(p-1-k) = w since a(k) = -k*w);
//   (iii) at a in {w-1, w+1} (the copies that STRIKE the edge slot) the exact
//        anomaly Delta_m(a) = maxsum_m(config(w-a) MINUS the edge slot) holds,
//        so Delta_m(a) >= Delta_m(w-a): the seam side never loses.
// Proof of (iii): sigma(del_a) = del_{w-a} on non-edge slots, plus the edge
// slot iff a strikes it; apply sigma-invariance of maxsum. Deleting one more
// slot only merges gaps, hence the inequality.
//
//   fold      w   mirror pairs equal (all m)   specials    anomaly exact?  strict breaks
//      5->7    2            2 of 2              {1,3,6}     yes            1 of 2
//     7->11    1            4 of 4              {0,1,2,10}     yes            0 of 2
//    11->13    9            5 of 5              {1,8,10,12}     yes            0 of 2
//    13->17    8            7 of 7              {1,7,9,16}     yes            0 of 2
//    17->19   18            8 of 8              {0,1,17,18}     yes            0 of 2
//    19->23   15          10 of 10              {1,14,16,22}     yes            0 of 2
//    23->29   17          13 of 13              {1,16,18,28}     yes            0 of 2
//
// ==============================================================================
// SEC 3. FULL m=1 CURVES, FOLDS 7->11 .. 23->29 (in copy order)
// ==============================================================================
//
// fold 7->11   w = 1   G2(old) = 30   curve min/mean/max = 30/34.36/42
//   k    :    0   1   2   3   4   5   6   7   8   9  10
//   a(k) :    0  10   9   8   7   6   5   4   3   2   1
//   C_1  :   30  36  30  36  42  30  42  36  30  36  30
//   deg  :    0   6   0   6  12   0  12   6   0   6   0
//   mark :    S               *       *           S
//   (* attains the fold maximum; S strikes the seam/edge slot)
//   ok    kill law: sum_k alive = D*(p-2)   135 vs 135
//   ok    copy theorem all m <= 8: max_k C_m(k) = maxsum_m(T_11)
//
// fold 11->13   w = 9   G2(old) = 42   curve min/mean/max = 48/64.62/66
//   k    :    0   1   2   3   4   5   6   7   8   9  10  11  12
//   a(k) :    0   4   8  12   3   7  11   2   6  10   1   5   9
//   C_1  :   66  66  66  66  66  66  48  66  66  66  66  66  66
//   deg  :   24  24  24  24  24  24   6  24  24  24  24  24  24
//   mark :    *   *  *S   *   *   *       *   *  *S   *   *   *
//   (* attains the fold maximum; S strikes the seam/edge slot)
//   ok    kill law: sum_k alive = D*(p-2)   1485 vs 1485
//   ok    custody vs 0c0e-01 embedded (min/mean/max at m=1)   48/64.62/66 vs 48/64.62/66
//   ok    copy theorem all m <= 8: max_k C_m(k) = maxsum_m(T_13)
//
// fold 13->17   w = 8   G2(old) = 66   curve min/mean/max = 90/102.71/108
//   k    :    0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16
//   a(k) :    0   9   1  10   2  11   3  12   4  13   5  14   6  15   7  16   8
//   C_1  :  108 108  96  96 108  96 108 108  90 108 108  96 108  96  96 108 108
//   deg  :   42  42  30  30  42  30  42  42  24  42  42  30  42  30  30  42  42
//   mark :    *  *S           *       *   *       *   *       *       S   *   *
//   (* attains the fold maximum; S strikes the seam/edge slot)
//   ok    kill law: sum_k alive = D*(p-2)   22275 vs 22275
//   ok    custody vs 0c0e-01 embedded (min/mean/max at m=1)   90/102.71/108 vs 90/102.71/108
//   ok    copy theorem all m <= 8: max_k C_m(k) = maxsum_m(T_17)
//
// fold 17->19   w = 18   G2(old) = 108   curve min/mean/max = 138/144.95/150
//   k    :    0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18
//   a(k) :    0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18
//   C_1  :  150 150 150 138 150 150 138 138 138 150 138 138 138 150 150 138 150 150 150
//   deg  :   42  42  42  30  42  42  30  30  30  42  30  30  30  42  42  30  42  42  42
//   mark :   *S   *   *       *   *               *               *   *       *  *S   *
//   (* attains the fold maximum; S strikes the seam/edge slot)
//   ok    kill law: sum_k alive = D*(p-2)   378675 vs 378675
//   ok    custody vs 0c0e-01 embedded (min/mean/max at m=1)   138/144.95/150 vs 138/144.95/150
//   ok    copy theorem all m <= 8: max_k C_m(k) = maxsum_m(T_19)
//
// fold 19->23   w = 15   G2(old) = 150   curve min/mean/max = 180/189.91/204
//   k    :    0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22
//   a(k) :    0   8  16   1   9  17   2  10  18   3  11  19   4  12  20   5  13  21   6  14  22   7  15
//   C_1  :  186 192 186 198 186 186 180 204 192 192 180 204 180 192 192 204 180 186 186 198 186 192 186
//   deg  :   36  42  36  48  36  36  30  54  42  42  30  54  30  42  42  54  30  36  36  48  36  42  36
//   mark :            S                   *               *               *               S
//   (* attains the fold maximum; S strikes the seam/edge slot)
//   ok    kill law: sum_k alive = D*(p-2)   7952175 vs 7952175
//   ok    custody vs 0c0e-01 embedded (min/mean/max at m=1)   180/189.91/204 vs 180/189.91/204
//   ok    copy theorem all m <= 8: max_k C_m(k) = maxsum_m(T_23)
//
// fold 23->29   w = 17   G2(old) = 204   curve min/mean/max = 222/234.00/258
//   k    :    0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26  27  28
//   a(k) :    0  12  24   7  19   2  14  26   9  21   4  16  28  11  23   6  18   1  13  25   8  20   3  15  27  10  22   5  17
//   C_1  :  228 228 228 240 240 258 234 234 228 240 234 228 234 222 234 222 234 228 234 240 228 234 234 258 240 240 228 228 228
//   deg  :   24  24  24  36  36  54  30  30  24  36  30  24  30  18  30  18  30  24  30  36  24  30  30  54  36  36  24  24  24
//   mark :                        *                       S                   S                           *
//   (* attains the fold maximum; S strikes the seam/edge slot)
//   ok    kill law: sum_k alive = D*(p-2)   214708725 vs 214708725
//   ok    custody vs 0c0e-01 embedded (min/mean/max at m=1)   222/234.00/258 vs 222/234.00/258
//   ok    copy theorem all m <= 8: max_k C_m(k) = maxsum_m(T_29)
//
// ==============================================================================
// SEC 4. THE ONE-PASS WALKER: VALIDATION, THEN 29->31 AND 31->37
// ==============================================================================
//   ok    walker = naive engine at fold 5->7 (all 7 alignments)
//   ok    walker = naive engine at fold 7->11 (all 11 alignments)
//   ok    walker = naive engine at fold 11->13 (all 13 alignments)
//   ok    walker = naive engine at fold 13->17 (all 17 alignments)
//   ok    walker = naive engine at fold 17->19 (all 19 alignments)
//   ok    walker = naive engine at fold 19->23 (all 23 alignments)
//   ok    walker = naive engine at fold 23->29 (all 29 alignments)
//
// fold 29->31   w = 19   G2(old) = 258   curve min/mean/max = 318/328.45/348
//   k    :    0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26  27  28  29  30
//   a(k) :    0  12  24   5  17  29  10  22   3  15  27   8  20   1  13  25   6  18  30  11  23   4  16  28   9  21   2  14  26   7  19
//   C_1  :  330 348 330 318 330 330 330 330 330 318 348 318 330 318 318 330 318 318 330 318 348 318 330 330 330 330 330 318 330 348 330
//   deg  :   72  90  72  60  72  72  72  72  72  60  90  60  72  60  60  72  60  60  72  60  90  60  72  72  72  72  72  60  72  90  72
//   mark :        *                                   *       S                   S           *                                   *
//   (* attains the fold maximum; S strikes the seam/edge slot)
//   ok    mirror pairs equal at 29->31   14 of 14
//   ok    seam side never loses at 29->31
//   ok    copy theorem at 29->31: max_a Delta_1 = G2(31#) = 348   max = 348
//   ok    custody vs 0c0e-01 embedded: 318/328.45/348   318/328.45/348
//
// fold 31->37   w = 11   G2(old) = 348   curve min/mean/max = 402/436.70/528
//   k    :    0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26  27  28  29  30  31  32  33  34  35  36
//   a(k) :    0  26  15   4  30  19   8  34  23  12   1  27  16   5  31  20   9  35  24  13   2  28  17   6  32  21  10  36  25  14   3  29  18   7  33  22  11
//   C_1  :  408 420 528 426 402 432 420 510 426 510 420 420 408 426 420 408 420 462 426 462 420 408 420 426 408 420 420 510 426 510 420 432 402 426 528 420 408
//   deg  :   60  72 180  78  54  84  72 162  78 162  72  72  60  78  72  60  72 114  78 114  72  60  72  78  60  72  72 162  78 162  72  84  54  78 180  72  60
//   mark :            *                           S                                                                   S                               *
//   (* attains the fold maximum; S strikes the seam/edge slot)
//   ok    mirror pairs equal at 31->37   17 of 17
//   ok    seam side never loses at 31->37
//   ok    copy theorem at 31->37: max_a Delta_1 = G2(37#) = 528 (scanstat-t37 exhaustive cert)   max = 528
//
// ==============================================================================
// SEC 5. SHAPE DESCRIPTORS ACROSS THE LADDER (m = 1, no fits)
// ==============================================================================
//   fold     p   min/G2old  mean/G2old  max/G2old  max/min  #atMax  #distinct  seam@max?  kills~Delta?
//      5->7   7     1.0000     1.5714     2.5000   2.5000  1 of 7         4       yes   hi-kill mean 22.0 vs lo-kill 14.0
//     7->11  11     1.0000     1.1455     1.4000   1.4000  2 of 11         3        no   hi-kill mean 36.0 vs lo-kill 31.2
//    11->13  13     1.1429     1.5385     1.5714   1.3750  12 of 13         2       yes   hi-kill mean 66.0 vs lo-kill 63.0
//    13->17  17     1.3636     1.5561     1.6364   1.2000  10 of 17         3       yes   hi-kill mean 105.0 vs lo-kill 102.0
//    17->19  19     1.2778     1.3421     1.3889   1.0870  11 of 19         2       yes   hi-kill mean 144.7 vs lo-kill 144.7
//    19->23  23     1.2000     1.2661     1.3600   1.1333  3 of 23         5        no   hi-kill mean 189.3 vs lo-kill 189.3
//    23->29  29     1.0882     1.1471     1.2647   1.1622  2 of 29         5        no   hi-kill mean 232.3 vs lo-kill 235.7
//   (29->31 and 31->37 rows are in sec 4; their min/mean/max print there)
//
// ==============================================================================
// ALL SELF-TESTS PASS
// ==============================================================================
// ───── stderr ─────
// [0.0s] built T_5  D = 3
// [0.0s] built T_7  D = 15
// [0.0s] built T_11  D = 135
// [0.0s] built T_13  D = 1485
// [0.0s] built T_17  D = 22275
// [0.0s] built T_19  D = 378675
// [0.0s] built T_23  D = 7952175
// [4.6s] fold 7->11 done
// [4.6s] fold 11->13 done
// [4.6s] fold 13->17 done
// [4.6s] fold 17->19 done
// [4.7s] fold 19->23 done
// [4.7s] streaming maxsum family of T_29 for the copy-theorem check
// [7.4s] fold 23->29 done
// [9.6s] streaming fold 29->31 (one pass, all 31 alignments)
// [10.2s]   29->31 copy-of-23 0/29
// [15.4s]   29->31 copy-of-23 8/29
// [20.9s]   29->31 copy-of-23 16/29
// [26.6s]   29->31 copy-of-23 24/29
// [29.4s] fold 29->31 done
// [29.4s] streaming fold 31->37 (one pass over 6.23e9 slots, all 37 alignments)
// [47.8s]   31->37 copy-of-29 1/31
// [66.9s]   31->37 copy-of-29 2/31
// [85.9s]   31->37 copy-of-29 3/31
// [105.1s]   31->37 copy-of-29 4/31
// [124.4s]   31->37 copy-of-29 5/31
// [143.4s]   31->37 copy-of-29 6/31
// [162.3s]   31->37 copy-of-29 7/31
// [181.2s]   31->37 copy-of-29 8/31
// [200.3s]   31->37 copy-of-29 9/31
// [219.5s]   31->37 copy-of-29 10/31
// [238.4s]   31->37 copy-of-29 11/31
// [257.3s]   31->37 copy-of-29 12/31
// [276.2s]   31->37 copy-of-29 13/31
// [295.4s]   31->37 copy-of-29 14/31
// [314.5s]   31->37 copy-of-29 15/31
// [333.4s]   31->37 copy-of-29 16/31
// [352.3s]   31->37 copy-of-29 17/31
// [371.4s]   31->37 copy-of-29 18/31
// [390.6s]   31->37 copy-of-29 19/31
// [409.7s]   31->37 copy-of-29 20/31
// [428.6s]   31->37 copy-of-29 21/31
// [447.5s]   31->37 copy-of-29 22/31
// [466.7s]   31->37 copy-of-29 23/31
// [485.8s]   31->37 copy-of-29 24/31
// [504.7s]   31->37 copy-of-29 25/31
// [523.4s]   31->37 copy-of-29 26/31
// [542.1s]   31->37 copy-of-29 27/31
// [561.1s]   31->37 copy-of-29 28/31
// [580.1s]   31->37 copy-of-29 29/31
// [598.9s]   31->37 copy-of-29 30/31
// [617.8s]   31->37 copy-of-29 31/31
// [617.8s] fold 31->37 done
// ============================================================================
// READINGS
// ============================================================================

// 1. THE NAMED CURVE, FOLD 5->7. In copy order the per-copy maxsum reads
//    12, 18, 30, 24, 18, 18, 12 -- degradation 0, 6, 18, 12, 6, 6, 0 over
//    G2(5#) = 12. Two copies are UNDEGRADED (their 2-set catches no slot,
//    possible only while D < p: D = 3 here against p = 7), and the unique
//    argmax is copy k = 2, whose holes {3,1} kill both 17 and the edge slot
//    29, leaving the single survivor 11 and the record 30 = G2(7#). At this
//    fold the record is a seam-strike event, and the curve is the palindrome
//    C(k) = C(6-k) at k = 0<->6 and 1<->5, broken exactly at the seam pair
//    k = 2<->4 (30 against 18).
//
// 2. THE MIRROR-SWEEP LEMMA HOLDS EXHAUSTIVELY, AND IT HALVES THE
//    FINGERPRINT. Every non-special mirror pair Delta_m(a) = Delta_m(w-a) is
//    equal at every m <= 8 at all seven in-memory folds (2 of 2, 4 of 4,
//    5 of 5, 7 of 7, 8 of 8, 10 of 10, 13 of 13 pairs), the exact edge-slot
//    anomaly Delta_m(a) = maxsum_m(config(w-a) minus the edge slot) verifies
//    at every fold, and the streamed folds read 14 of 14 and 17 of 17
//    mirror-equal at m = 1. The seam side never loses, as proven.
//
// 3. THE SEAM BREAK IS RARE. Exactly one strict break in the whole nine-fold
//    run, at 5->7 itself (30 against 18). At 29->31 the seam copies read
//    330 and 318, equal to their mirrors; at 31->37 they read 510 and 420,
//    equal to their mirrors. Up the ladder the edge-slot anomaly degrades to
//    equality at m = 1 rather than past it.
//
// 4. THE CURVE IS A QUANTIZED PLATEAU WITH RARE SPIKES. Distinct values per
//    fold: 4, 3, 2, 3, 2, 5, 5 at the in-memory folds, 3 at 29->31 (values
//    318, 330, 348) and 8 at 31->37 (bulk 402-432, tiers 462 and 510, spike
//    528). Every value is a multiple of 6. The spike amplitude carries no
//    trend: max/min falls 2.5000, 1.4000, 1.3750, 1.2000, 1.0870, 1.1333,
//    1.1622 over the in-memory folds, reads 348/318 at 29->31, then jumps
//    back to 528/402 at 31->37.
//
// 5. THE FLOOR SITS STRICTLY ABOVE THE OLD RECORD FROM 11->13 ON.
//    min/G2old = 1.1429, 1.3636, 1.2778, 1.2000, 1.0882 at the in-memory
//    folds, 318/258 at 29->31, 402/348 at 31->37. Zero degradation exists
//    only at 5->7 and 7->11, where D < p lets a 2-set be empty; from 11->13
//    every copy's holes merge enough somewhere to beat G2(old) outright.
//
// 6. THE KILL COUNT DECOUPLES FROM THE DEGRADATION AT DEPTH. Splitting each
//    fold's copies at the median kill count, hi-kill against lo-kill mean
//    Delta_1 reads 22.0 vs 14.0 at 5->7 and 36.0 vs 31.2 at 7->11, narrows
//    to 105.0 vs 102.0 at 13->17, is exactly flat at 17->19 and 19->23
//    (144.7 vs 144.7, 189.3 vs 189.3), and REVERSES at 23->29 (232.3 vs
//    235.7). At depth the per-copy kill count concentrates and predicts
//    nothing; what moves Delta_1 is where the holes land, not how many die.
//    Measured support for 0c's premise that the kill count is the wrong
//    conditioning variable.
//
// 7. 31->37 IS A NEW DEEPEST EXACT LEVEL FOR THE DELETED FAMILY, AND ITS
//    MAXIMUM IS THE TWELFTH LADDER TERM. max_a Delta_1 = 528 = G2(37#),
//    whose exhaustive maximality certificate is scanstat-t37's; the whole
//    37-alignment family cost a single pass of the one-pass walker, from
//    29.4s to 617.8s in the stderr log, validated against the naive
//    per-alignment engine at all seven in-memory folds before either
//    streamed fold was trusted.
//
// 8. CUSTODY LANDED. min/mean/max reproduce attack-0c0e-01's embedded
//    figures figure for figure at all six folds it reached (48/64.62/66
//    through 318/328.45/348), the copy theorem is EQUAL at all m <= 8 at
//    every in-memory fold, and the kill law sum_k alive = D(p-2) is exact
//    at every fold.
//
// 9. THE ARGMAX IS NOT THE SEAM, AND THE SEAM IS NOT THE ARGMAX -- EXCEPT
//    ONCE. seam@max reads yes at 5->7, 11->13, 13->17, 17->19 and no at
//    7->11, 19->23, 23->29; at 29->31 the seam copies sit at 330 against a
//    348 record and at 31->37 at 510 and 420 against 528. Only at 5->7 is
//    the record itself a seam strike. Do not build an argument that needs
//    the extremal alignment to be the seam-striking one, or to be special
//    at all: #atMax runs 1, 2, 12, 10, 11, 3, 2 in memory, then 4 and 2 --
//    no law, though every argmax set from 7->11 up is mirror-closed
//    (reading 2; at 5->7 the unique argmax is itself the seam special, the
//    licensed exception).
//
// 10. WHAT THIS FILE DOES NOT SHOW. It bounds nothing: TODO 0c's ask, a
//    proven kill-count-free upper bound on Delta_m, is the target these
//    curves calibrate, not a result here. The streamed folds are m = 1
//    only. Nothing is fitted, per the twice-blind kill of the exponent rule
//    (scanstat2, scanstat-t37); per the PRICE RIDER nothing here re-prices
//    the exact levels; and the 0c x 0e composition stays CLOSED -- the
//    mirror law halves the alignment set, it does not select levels.
