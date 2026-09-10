// ============================================================================
// U-FRAME REPRODUCTION 1 — THE FOLD LADDER: research/U-FRAME.md §2 and §4
// (2026-08-19. TODO item 11b. Companion: uframe-repro-02-maxgap-forensics.js.)
// ============================================================================
// WHY THIS FILE EXISTS. `research/U-FRAME.md` §8 says of its own §§2, 4 and 5
// tables: "generated from short scripts in a session scratchpad that no longer
// exists, and the repo holds no script that regenerates them. Until one is
// written (TODO, under 'Consolidation & writing'), treat those tables as
// recorded-not-reproducible and do not quote them elsewhere." This file is
// half of that script. It regenerates §2's odd-fold table and every number in
// §4 from scratch, and prints the recorded value beside the computed one so a
// reader can see the comparison rather than take a verdict for it.
//
// NOTHING IS IMPORTED. The G2 ladder is not read from `research/exact-g2-
// ladder.js` or from any table in the corpus; it is recomputed here by folding.
// That is the whole point: a reproduction that quotes the thing it reproduces
// proves nothing.
//
// THE OBJECT. T_x is the twin-slot tile mod x#: the residues r with r != 0 and
// r != -2 mod p for every prime p <= x. G2(x#) is the largest gap between
// consecutive members of T_x, taken cyclically. Folding T_x by U lays U copies
// of the tile side by side and strikes the two residue classes 0 and -2 mod U,
// so the fold is exactly U residue-class deletions on one fixed pattern.
//
// THREE ENGINES, EACH CHECKED AGAINST THE ONE BELOW IT.
//
//  (E1) LIST FOLD, exact, used through T_23 (7,952,175 slots). Walks the U
//       copies and keeps the survivors. Cost U*N, storage N.
//
//  (E2) GAP FOLD, exact, used for T_29 (214,708,725 slots). Same walk, but it
//       emits the GAP SEQUENCE into a Uint8Array of g/6 (every gap of T_x is a
//       multiple of 6 from x >= 5 on, and G2(29#)/6 = 43 fits a byte), so the
//       tile is 215 MB rather than 1.7 GB and no position is ever stored.
//
//  (E3) RUN FOLD, exact, used for T_31 and T_37. Folding by p cannot be walked
//       at 37: T_37 has 217,929,355,875 slots. But a new gap is exactly a
//       maximal RUN of old slots deleted by one and the same copy, and copy j
//       deletes only the two residues a_j = -jW and a_j - 2 (mod p). So two
//       adjacent old slots die together only if their distance is 0 or +-2 mod
//       p — U-FRAME §10's criterion — and at any point in ONE pass over the old
//       gap sequence at most two copies have a run open. E3 walks the old tile
//       once, carrying those two runs, and reads off every copy's largest gap
//       at once: cost N, not p*N. Copy boundaries are the only subtlety and are
//       stitched explicitly (tail of copy j + the tile's wrap gap + head of
//       copy j+1). E3 is checked against E1 at folds 7, 11, 13, 17, 19, 23 and
//       against E2 at fold 29 before it is trusted at 31 and 37.
//
// Deterministic, no randomness, no arguments, no environment.
// ============================================================================
'use strict';
const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1) + 's';
let CHECKS = 0;
function assert(c, m) { if (!c) { console.error('ASSERT FAILED: ' + m); process.exit(1); } CHECKS++; }

const isPrime = n => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };

// ---------------------------------------------------------------------------
// E1 / E2. Fold a tile given as (cyclic gap sequence, width, first slot) by U.
// The walk over (copy, index) is one continuous walk through the new tile of
// width U*W starting at the old first slot, so the residue mod U advances by
// the gaps and needs no position arithmetic.
// ---------------------------------------------------------------------------
function foldWalk(gaps, W, s0, U, emit) {
  const N = gaps.length, kill2 = U - 2;
  let r = s0 % U, pos = s0, acc = 0, first = -1, nkept = 0;
  for (let j = 0; j < U; j++) {
    for (let i = 0; i < N; i++) {
      if (r !== 0 && r !== kill2) {
        nkept++;
        if (first < 0) first = pos; else emit(acc, pos);
        acc = 0;
      }
      const g = gaps[i];
      acc += g; pos += g; r += g % U; if (r >= U) r -= U;
    }
  }
  // The cycle closes from the last kept slot to the FIRST kept slot one period
  // on. The walk started at s0, which is not in general the first kept slot, so
  // the leading stretch (first - s0) belongs to the wrap gap and not to any
  // other. Getting this wrong shortens exactly one gap per fold and is invisible
  // unless the gap sum is checked, which is why it is checked.
  emit(acc + (first - s0), first + U * W);
  return { first, nkept, W: U * W };
}

function foldToArray(gaps, W, s0, U, count) {    // count = expected survivor total
  const out = new Uint8Array(count);
  let k = 0, sum = 0;
  const r = foldWalk(gaps, W, s0, U, g => { out[k++] = g / 6; sum += g; });
  assert(k === count, `fold by ${U} emitted ${k} gaps, expected ${count}`);
  assert(sum === r.W, `fold by ${U}: gaps sum to ${sum}, tile width is ${r.W}`);
  return { gaps: out, W: r.W, s0: r.first, scale: 6 };
}

function maxOf(gaps, scale) { let m = 0; for (let i = 0; i < gaps.length; i++) if (gaps[i] > m) m = gaps[i]; return m * scale; }

// ---------------------------------------------------------------------------
// E3. The run folder. Fed the old tile's cyclic gap sequence one gap at a time.
// State: for each copy j, an open run's accumulated length and slot count. Only
// the two copies that delete the current slot can have a run open, so the state
// touched per step is O(1) and the pass is one sweep of the old tile.
// ---------------------------------------------------------------------------
function RunFolder(W, p, r0) {
  const wm = W % p, J = new Int32Array(p);
  for (let j = 0; j < p; j++) J[(((-j * wm) % p) + p) % p] = j;   // copy that deletes residue a
  const cur = new Float64Array(p), len = new Int32Array(p), open = new Uint8Array(p), isHead = new Uint8Array(p);
  const headSum = new Float64Array(p), headLen = new Int32Array(p);
  let a1 = -1, a2 = -1, na = 0, r = r0;
  let best = 0, bestLen = 0, maxOld = 0, maxRun = 0;
  { const d0 = J[r], d1 = J[(r + 2) % p];
    open[d0] = 1; isHead[d0] = 1; cur[d0] = 0; len[d0] = 1; a1 = d0; na = 1;
    if (d1 !== d0) { open[d1] = 1; isHead[d1] = 1; cur[d1] = 0; len[d1] = 1; a2 = d1; na = 2; } }
  return {
    push(g) {
      if (g > maxOld) maxOld = g;
      r = (r + g) % p;
      const d0 = J[r], d1 = J[(r + 2) % p];
      let b1 = -1, b2 = -1;
      for (let t = 0; t < na; t++) {
        const j = t === 0 ? a1 : a2;
        cur[j] += g;
        if (j === d0 || j === d1) { len[j]++; if (b1 < 0) b1 = j; else b2 = j; }
        else if (isHead[j]) { headSum[j] = cur[j]; headLen[j] = len[j]; isHead[j] = 0; open[j] = 0; }
        else { if (cur[j] > best) { best = cur[j]; bestLen = len[j]; } if (len[j] > maxRun) maxRun = len[j]; open[j] = 0; }
      }
      if (!open[d0]) { open[d0] = 1; cur[d0] = g; len[d0] = 1; if (b1 < 0) b1 = d0; else if (b2 < 0) b2 = d0; }
      if (d1 !== d0 && !open[d1]) { open[d1] = 1; cur[d1] = g; len[d1] = 1; if (b1 < 0) b1 = d1; else if (b2 < 0) b2 = d1; }
      a1 = b1; a2 = b2; na = (b1 < 0 ? 0 : (b2 < 0 ? 1 : 2));
    },
    finish(gw) {
      if (gw > maxOld) maxOld = gw;
      const tailSum = new Float64Array(p), tailLen = new Int32Array(p);
      for (let t = 0; t < na; t++) {
        const j = t === 0 ? a1 : a2;
        assert(!isHead[j], `copy ${j} of fold ${p} is deleted end to end`);
        tailSum[j] = cur[j]; tailLen[j] = len[j]; if (len[j] > maxRun) maxRun = len[j];
      }
      for (let j = 0; j < p; j++) if (headLen[j] > maxRun) maxRun = headLen[j];
      for (let j = 0; j < p; j++) {
        const k = (j + 1) % p, tot = tailSum[j] + gw + headSum[k], rl = tailLen[j] + headLen[k];
        if (tot > best) { best = tot; bestLen = rl; }
        if (rl > maxRun) maxRun = rl;
      }
      if (maxOld > best) { best = maxOld; bestLen = 0; }
      return { G2: best, oldG2: maxOld, L: maxRun, kills: bestLen };
    },
  };
}

// ============================================================================
// S1. U-FRAME §2 — folding on the ODD NUMBERS, and the Inertness Lemma
// ============================================================================
console.log('='.repeat(78));
console.log('S1. U-FRAME §2 — fold the twin-slot comb by every odd number in turn');
console.log('='.repeat(78));
console.log('  fold U | composite | kills      | G2 after | recorded G2 | recorded kills');
const REC2 = { 3: [2, 6], 5: [2, 12], 7: [6, 30], 9: [0, 30], 11: [270, 42], 13: [2430, 66], 15: [0, 66], 17: [400950, 108] };
{
  // T_2: the odd comb. width 2, one slot at r = 1, cyclic gap 2.
  let tile = { gaps: [2], W: 2, s0: 1, scale: 1 };
  let g2 = 2;
  for (const U of [3, 5, 7, 9, 11, 13, 15, 17]) {
    const kept = [];
    const raw = tile.scale === 1 ? tile.gaps : Array.from(tile.gaps, v => v * tile.scale);
    const res = foldWalk(raw, tile.W, tile.s0, U, g => kept.push(g));
    const kills = tile.gaps.length * U - kept.length;
    assert(kept.reduce((a, b) => a + b, 0) === res.W, `fold ${U}: gap sum != width`);
    g2 = kept.reduce((a, b) => a > b ? a : b, 0);
    tile = { gaps: kept, W: res.W, s0: res.first, scale: 1 };
    const [rk, rg] = REC2[U];
    console.log(`  ${String(U).padStart(6)} | ${(isPrime(U) ? 'no' : 'YES').padStart(9)} | ${String(kills).padStart(10)} | ${String(g2).padStart(8)} | ${String(rg).padStart(11)} | ${String(rk).padStart(14)}` +
      (kills === rk && g2 === rg ? '' : '   <-- DIFFERS'));
    if (!isPrime(U)) assert(kills === 0, `Inertness Lemma: composite fold ${U} killed ${kills}`);
  }
}
console.log('  Inertness Lemma holds at 9 and 15: both killed 0.');

console.log('');
console.log('  §2 prose check — folds by 4, 6, 8, 9, 25 on the width-30 tile:');
{
  let tile = { gaps: [6, 12, 12], W: 30, s0: 11 };            // T_5
  let g2 = 12, prod = 1;
  for (const U of [4, 6, 8, 9, 25]) {
    const kept = [];
    const res = foldWalk(tile.gaps, tile.W, tile.s0, U, g => kept.push(g));
    const kills = tile.gaps.length * U - kept.length;
    g2 = kept.reduce((a, b) => a > b ? a : b, 0);
    tile = { gaps: kept, W: res.W, s0: res.first };
    prod *= U;
    console.log(`    after folding by ${String(U).padStart(2)}: width ${String(tile.W).padStart(9)}  slots ${String(kept.length).padStart(7)}  kills ${kills}  G2 ${g2}`);
    assert(kills === 0, `fold by ${U} killed ${kills}`);
    assert(g2 === 12, `fold by ${U} moved G2 to ${g2}`);
  }
  console.log(`    final width 30 * ${prod} = ${tile.W};  U-FRAME §2 records 162,000`);
  console.log(`    30 * 4*6*9*25 = ${30 * 4 * 6 * 9 * 25}   (the product WITHOUT the 8)`);
}

// ============================================================================
// S2. The exact G2 ladder, recomputed. Three engines, cross-checked.
// ============================================================================
console.log('');
console.log('='.repeat(78));
console.log('S2. THE LADDER G2(x#), recomputed here — no table is read in');
console.log('='.repeat(78));
const LAD = [[2, 2]];
let tile = { gaps: [2], W: 2, s0: 1, scale: 1 };
let counts = 1;
// --- E1 through T_23, with E3 checked against it from fold 7 on -------------
for (const p of [3, 5, 7, 11, 13, 17, 19, 23]) {
  const raw = tile.scale === 1 ? tile.gaps : Array.from(tile.gaps, v => v * tile.scale);
  if (p >= 7) {
    const rf = RunFolder(tile.W, p, tile.s0 % p);
    for (let i = 0; i < raw.length - 1; i++) rf.push(raw[i]);
    const r = rf.finish(raw[raw.length - 1]);
    var e3 = r;
  }
  const kept = [];
  const res = foldWalk(raw, tile.W, tile.s0, p, g => kept.push(g));
  assert(kept.reduce((a, b) => a + b, 0) === res.W, `fold ${p}: gap sum != width`);
  counts = kept.length;
  const g2 = kept.reduce((a, b) => a > b ? a : b, 0);
  tile = { gaps: kept, W: res.W, s0: res.first, scale: 1 };
  LAD.push([p, g2]);
  let note = '';
  if (p >= 7) { assert(e3.G2 === g2, `E3 disagrees with E1 at fold ${p}: ${e3.G2} vs ${g2}`); note = `   E3 agrees (L=${e3.L})`; }
  console.log(`  x = ${String(p).padStart(2)}   slots ${String(counts).padStart(12)}   width ${String(tile.W).padStart(16)}   G2 = ${String(g2).padStart(4)}${note}`);
}
const T23 = tile, N23 = counts;
console.log(`  [T_23 built by E1, ${el()}]`);

// --- E2: T_29 as a Uint8 gap array ------------------------------------------
const N29 = N23 * 27;
const t29 = foldToArray(T23.gaps, T23.W, T23.s0, 29, N29);
const G229 = maxOf(t29.gaps, 6);
LAD.push([29, G229]);
console.log(`  x = 29   slots ${String(N29).padStart(12)}   width ${String(t29.W).padStart(16)}   G2 = ${String(G229).padStart(4)}   (E2, ${el()})`);
{ // E3 against E2 at fold 29, the last level where both are affordable
  const rf = RunFolder(T23.W, 29, T23.s0 % 29);
  for (let i = 0; i < T23.gaps.length - 1; i++) rf.push(T23.gaps[i]);
  const r = rf.finish(T23.gaps[T23.gaps.length - 1]);
  assert(r.G2 === G229, `E3 disagrees with E2 at fold 29: ${r.G2} vs ${G229}`);
  console.log(`           E3 agrees at fold 29 (L=${r.L}); E3 is now used alone at 31 and 37`);
}

// --- E3: T_31 by streaming T_29, T_37 by the run folder over that stream ----
const W31 = t29.W * 31, N31 = N29 * 29;
let firstMod37 = -1, G231 = 0, emitted = 0;
{
  // one pass: fold T_29 by 31 (emitting T_31's gaps) and feed a fold-37 run
  // folder with them. T_31 is never stored.
  const g29 = t29.gaps, s0_29 = t29.s0, W29 = t29.W;
  // pre-pass over the head of copy 0 only, to learn T_31's first slot mod 37
  { let r31 = s0_29 % 31, m37 = s0_29 % 37;
    for (let i = 0; i < g29.length && firstMod37 < 0; i++) {
      if (r31 !== 0 && r31 !== 29) { firstMod37 = m37; break; }
      const g = g29[i] * 6; r31 = (r31 + g) % 31; m37 = (m37 + g) % 37;
    }
    assert(firstMod37 >= 0, 'copy 0 of fold 31 has no survivor in the first period');
  }
  const rf = RunFolder(W31, 37, firstMod37);
  let r31 = s0_29 % 31, acc = 0, started = false, mx = 0;
  for (let j = 0; j < 31; j++) {
    for (let i = 0; i < N29; i++) {
      if (r31 !== 0 && r31 !== 29) {
        if (started) { if (acc > mx) mx = acc; rf.push(acc); emitted++; } else started = true;
        acc = 0;
      }
      const g = g29[i] * 6; acc += g; r31 = (r31 + g) % 31; if (r31 >= 31) r31 -= 31;
    }
    if ((j % 8) === 7) process.stderr.write(`   fold-31 stream: copy ${j + 1}/31, ${el()}\n`);
  }
  if (acc > mx) mx = acc;
  emitted++;
  G231 = mx;
  const r37 = rf.finish(acc);
  assert(emitted === N31, `T_31 stream emitted ${emitted} gaps, expected ${N31}`);
  assert(r37.oldG2 === G231, `run folder's old-G2 ${r37.oldG2} != streamed max ${G231}`);
  LAD.push([31, G231]);
  LAD.push([37, r37.G2]);
  console.log(`  x = 31   slots ${String(N31).padStart(12)}   width ${String(W31).padStart(16)}   G2 = ${String(G231).padStart(4)}   (E3 stream, ${el()})`);
  console.log(`  x = 37   slots ${String(N31 * 35).padStart(12)}   width ${String(W31 * 37).padStart(16)}   G2 = ${String(r37.G2).padStart(4)}   (E3, L=${r37.L}, ${el()})`);
}

const REC_LAD = { 2: 2, 3: 6, 5: 12, 7: 30, 11: 42, 13: 66, 17: 108, 19: 150, 23: 204, 29: 258, 31: 348, 37: 528 };
console.log('');
console.log('  ladder computed here : ' + LAD.map(r => r[1]).join(', '));
console.log('  ladder on record     : ' + LAD.map(r => REC_LAD[r[0]]).join(', '));
console.log('  agree: ' + LAD.every(r => r[1] === REC_LAD[r[0]]));

// ============================================================================
// S3. U-FRAME §4 — the per-fold multipliers and the budget they spend
// ============================================================================
const theta = x => { let s = 0; for (let q = 2; q <= x; q++) if (isPrime(q)) s += Math.log(q); return s; };
const TH = LAD.map(r => theta(r[0]));
console.log('');
console.log('='.repeat(78));
console.log('S3. U-FRAME §4 — per-fold multipliers c(p) and the sharp rate 2 ln p / p');
console.log('='.repeat(78));
console.log('  fold        c(p)    ln c(p) / (2 ln p / p)');
const mult = [], frac = [];
for (let k = 1; k < LAD.length; k++) {
  const c = LAD[k][1] / LAD[k - 1][1], p = LAD[k][0];
  const f = Math.log(c) / (2 * Math.log(p) / p);
  mult.push(c); frac.push(f);
  console.log(`  @${String(LAD[k - 1][0]).padStart(2)} -> @${String(p).padStart(2)}   ${c.toFixed(3).padStart(6)}   ${f.toFixed(2).padStart(6)}`);
}
console.log('');
console.log('  §4 line 1, @5->@7 through @31->@37 : ' + mult.slice(2).map(v => (v === 2.5 ? '2.50' : v.toFixed(3))).join(', '));
console.log('  U-FRAME records                    : 2.50, 1.40, 1.571, 1.636, 1.389, 1.360, 1.265, 1.349, 1.517');
{ const gm = Math.exp(mult.slice(3).reduce((s, v) => s + Math.log(v), 0) / 8);
  console.log(`  geometric mean over the last eight  : ${gm.toFixed(2)}   (U-FRAME records 1.43)`); }
console.log('  §4 line 2, budget fraction          : ' + frac.slice(2).map(v => v.toFixed(2)).join(', '));
console.log('  U-FRAME records                     : 1.65, 0.77, 1.15, 1.48, 1.06, 1.13, 1.01, 1.35, 2.14');
{ const lo = Math.min(...frac.slice(2)), hi = Math.max(...frac.slice(2));
  console.log(`  range over those nine folds         : ${(100 * lo).toFixed(0)} to ${(100 * hi).toFixed(0)} percent   (U-FRAME records 77 to 214)`); }

// ============================================================================
// S4. U-FRAME §4 — the lifetime slack ln(x^2 / G2(x#))
// ============================================================================
console.log('');
console.log('='.repeat(78));
console.log('S4. U-FRAME §4 — lifetime slack ln(x^2 / G2(x#)), in nats');
console.log('='.repeat(78));
const slack = LAD.map(r => Math.log(r[0] * r[0] / r[1]));
for (let k = 0; k < LAD.length; k++) console.log(`  x = ${String(LAD[k][0]).padStart(2)}   G2 = ${String(LAD[k][1]).padStart(4)}   x^2/G2 = ${(LAD[k][0] ** 2 / LAD[k][1]).toFixed(4).padStart(8)}   ln = ${slack[k].toFixed(3)}`);
console.log('  §4 quotes x = 11 to 37 : ' + slack.slice(4).map(v => v.toFixed(3)).join(', '));
console.log('  U-FRAME records        : 1.058, 0.940, 0.984, 0.878, 0.953, 1.182, 1.016, 0.953');

// ============================================================================
// S5. U-FRAME §4 — local slopes and the five fitted exponents
// ============================================================================
console.log('');
console.log('='.repeat(78));
console.log('S5. U-FRAME §4 — G2 ~ (ln W)^alpha: local slopes and window fits');
console.log('='.repeat(78));
const slopes = [];
for (let k = 1; k < LAD.length; k++) slopes.push(Math.log(LAD[k][1] / LAD[k - 1][1]) / Math.log(TH[k] / TH[k - 1]));
console.log('  local slopes    : ' + slopes.map(v => v.toFixed(2)).join(', '));
console.log('  U-FRAME records : 1.16, 1.08, 2.03, 0.91, 1.58, 2.03, 1.63, 1.73, 1.45, 2.11, 3.21');
function fitFrom(x0) {
  const idx = LAD.map((r, i) => i).filter(i => LAD[i][0] >= x0);
  const xs = idx.map(i => Math.log(TH[i])), ys = idx.map(i => Math.log(LAD[i][1])), n = xs.length;
  const mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
  let sxy = 0, sxx = 0;
  for (let k = 0; k < n; k++) { sxy += (xs[k] - mx) * (ys[k] - my); sxx += (xs[k] - mx) ** 2; }
  return { n, a: sxy / sxx };
}
console.log('');
console.log('  fit window            n    alpha    U-FRAME records');
for (const [lab, x0, rec] of [['all 12 levels', 2, '1.476'], ['from x = 7', 7, '1.674'], ['from x = 13', 13, '1.861'],
  ['from x = 19', 19, '1.983'], ['last four (23-37)', 23, '2.170']]) {
  const f = fitFrom(x0);
  console.log(`  ${lab.padEnd(20)} ${String(f.n).padStart(2)}   ${f.a.toFixed(3).padStart(6)}   ${rec}` + (f.a.toFixed(3) === rec ? '' : '   <-- DIFFERS'));
}
// §4's closing caveat, and the search for a reading that lands on its 1.98.
// The caveat is the one §4 number that does not reproduce, so every alternative
// is enumerated HERE rather than asserted in the readings: four start windows
// with x = 37 dropped, and the same fits over the fourteen-term ladder, which
// is longer than §4's twelve because G2(41#) = 546 and G2(43#) = 618 are known
// (research/G2-STATE.md §6.1 table, terms 13 and 14; the 546 independently
// confirmed by two disjoint methods, and A144311's a(13) + 1 per U-FRAME §6a).
// Not one of the eight lands on 1.98.
function fitOver(pairs) {
  const xs = pairs.map(r => Math.log(theta(r[0]))), ys = pairs.map(r => Math.log(r[1])), n = xs.length;
  const mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
  let sxy = 0, sxx = 0;
  for (let k = 0; k < n; k++) { sxy += (xs[k] - mx) * (ys[k] - my); sxx += (xs[k] - mx) ** 2; }
  return sxy / sxx;
}
{ const f = fitFrom(19);
  const drop19 = fitOver(LAD.filter(r => r[0] >= 19 && r[0] !== 37));
  console.log('');
  console.log(`  §4's caveat: drop x = 37 and the fit from x = 19 is ${drop19.toFixed(2)} (U-FRAME records 1.98);`);
  console.log(`  the dropped point is the jump ${LAD[LAD.length - 2][1]} -> ${LAD[LAD.length - 1][1]}, local slope ${slopes[slopes.length - 1].toFixed(2)} (U-FRAME records 348 -> 528, 3.21). [fit ${f.a.toFixed(3)} with it]`);
  console.log('');
  console.log('  every alternative reading of the caveat, none of which is 1.98:');
  console.log('    start window   with x = 37   without x = 37');
  for (const x0 of [13, 17, 19, 23]) {
    const withIt = fitOver(LAD.filter(r => r[0] >= x0));
    const without = fitOver(LAD.filter(r => r[0] >= x0 && r[0] !== 37));
    console.log(`    from x = ${String(x0).padStart(2)}          ${withIt.toFixed(3)}          ${without.toFixed(3)}`);
  }
  // The fourteen-term ladder. These two terms are READ IN from G2-STATE.md, and
  // they are the only imported numbers in this file; everything above is folded.
  const LAD14 = LAD.concat([[41, 546], [43, 618]]);
  const w14 = fitOver(LAD14.filter(r => r[0] >= 19));
  const wo14 = fitOver(LAD14.filter(r => r[0] >= 19 && r[0] !== 37));
  console.log(`    from x = 19, ladder extended to x = 43 with the KNOWN G2(41#) = 546 and G2(43#) = 618`);
  console.log(`    (research/G2-STATE.md §6.1, terms 13 and 14 — read in, not folded here):`);
  console.log(`                       ${w14.toFixed(3)}          ${wo14.toFixed(3)}`);
  console.log('    U-FRAME §4 and §7 item 3 still speak of a twelve-term ladder and price');
  console.log('    G2(41#) as an unmade 37-hour measurement; both are stale against G2-STATE.'); }

console.log('');
console.log(`[${CHECKS} checks passed, ${el()}]`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/uframe-repro-01-fold-ladder.js
//   invocation:  node research/uframe-repro-01-fold-ladder.js
//   code-sha256: 904ee131be96bb2e5c8e7a1f8802d49a743ff44b49769d243bc08028a222898f
//   out-sha256:  cc03492965efb544953ecd9434167678d68a0bdd1e1f06884974fb377b819a85
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     176.8 s
// ============================================================================
// ==============================================================================
// S1. U-FRAME §2 — fold the twin-slot comb by every odd number in turn
// ==============================================================================
//   fold U | composite | kills      | G2 after | recorded G2 | recorded kills
//        3 |        no |          2 |        6 |           6 |              2
//        5 |        no |          2 |       12 |          12 |              2
//        7 |        no |          6 |       30 |          30 |              6
//        9 |       YES |          0 |       30 |          30 |              0
//       11 |        no |        270 |       42 |          42 |            270
//       13 |        no |       2430 |       66 |          66 |           2430
//       15 |       YES |          0 |       66 |          66 |              0
//       17 |        no |     400950 |      108 |         108 |         400950
//   Inertness Lemma holds at 9 and 15: both killed 0.
//
//   §2 prose check — folds by 4, 6, 8, 9, 25 on the width-30 tile:
//     after folding by  4: width       120  slots      12  kills 0  G2 12
//     after folding by  6: width       720  slots      72  kills 0  G2 12
//     after folding by  8: width      5760  slots     576  kills 0  G2 12
//     after folding by  9: width     51840  slots    5184  kills 0  G2 12
//     after folding by 25: width   1296000  slots  129600  kills 0  G2 12
//     final width 30 * 43200 = 1296000;  U-FRAME §2 records 162,000
//     30 * 4*6*9*25 = 162000   (the product WITHOUT the 8)
//
// ==============================================================================
// S2. THE LADDER G2(x#), recomputed here — no table is read in
// ==============================================================================
//   x =  3   slots            1   width                6   G2 =    6
//   x =  5   slots            3   width               30   G2 =   12
//   x =  7   slots           15   width              210   G2 =   30   E3 agrees (L=2)
//   x = 11   slots          135   width             2310   G2 =   42   E3 agrees (L=1)
//   x = 13   slots         1485   width            30030   G2 =   66   E3 agrees (L=2)
//   x = 17   slots        22275   width           510510   G2 =  108   E3 agrees (L=2)
//   x = 19   slots       378675   width          9699690   G2 =  150   E3 agrees (L=2)
//   x = 23   slots      7952175   width        223092870   G2 =  204   E3 agrees (L=3)
//   [T_23 built by E1, 0.4s]
//   x = 29   slots    214708725   width       6469693230   G2 =  258   (E2, 4.3s)
//            E3 agrees at fold 29 (L=2); E3 is now used alone at 31 and 37
//   x = 31   slots   6226553025   width     200560490130   G2 =  348   (E3 stream, 176.7s)
//   x = 37   slots 217929355875   width    7420738134810   G2 =  528   (E3, L=4, 176.7s)
//
//   ladder computed here : 2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348, 528
//   ladder on record     : 2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348, 528
//   agree: true
//
// ==============================================================================
// S3. U-FRAME §4 — per-fold multipliers c(p) and the sharp rate 2 ln p / p
// ==============================================================================
//   fold        c(p)    ln c(p) / (2 ln p / p)
//   @ 2 -> @ 3    3.000     1.50
//   @ 3 -> @ 5    2.000     1.08
//   @ 5 -> @ 7    2.500     1.65
//   @ 7 -> @11    1.400     0.77
//   @11 -> @13    1.571     1.15
//   @13 -> @17    1.636     1.48
//   @17 -> @19    1.389     1.06
//   @19 -> @23    1.360     1.13
//   @23 -> @29    1.265     1.01
//   @29 -> @31    1.349     1.35
//   @31 -> @37    1.517     2.14
//
//   §4 line 1, @5->@7 through @31->@37 : 2.50, 1.400, 1.571, 1.636, 1.389, 1.360, 1.265, 1.349, 1.517
//   U-FRAME records                    : 2.50, 1.40, 1.571, 1.636, 1.389, 1.360, 1.265, 1.349, 1.517
//   geometric mean over the last eight  : 1.43   (U-FRAME records 1.43)
//   §4 line 2, budget fraction          : 1.65, 0.77, 1.15, 1.48, 1.06, 1.13, 1.01, 1.35, 2.14
//   U-FRAME records                     : 1.65, 0.77, 1.15, 1.48, 1.06, 1.13, 1.01, 1.35, 2.14
//   range over those nine folds         : 77 to 214 percent   (U-FRAME records 77 to 214)
//
// ==============================================================================
// S4. U-FRAME §4 — lifetime slack ln(x^2 / G2(x#)), in nats
// ==============================================================================
//   x =  2   G2 =    2   x^2/G2 =   2.0000   ln = 0.693
//   x =  3   G2 =    6   x^2/G2 =   1.5000   ln = 0.405
//   x =  5   G2 =   12   x^2/G2 =   2.0833   ln = 0.734
//   x =  7   G2 =   30   x^2/G2 =   1.6333   ln = 0.491
//   x = 11   G2 =   42   x^2/G2 =   2.8810   ln = 1.058
//   x = 13   G2 =   66   x^2/G2 =   2.5606   ln = 0.940
//   x = 17   G2 =  108   x^2/G2 =   2.6759   ln = 0.984
//   x = 19   G2 =  150   x^2/G2 =   2.4067   ln = 0.878
//   x = 23   G2 =  204   x^2/G2 =   2.5931   ln = 0.953
//   x = 29   G2 =  258   x^2/G2 =   3.2597   ln = 1.182
//   x = 31   G2 =  348   x^2/G2 =   2.7615   ln = 1.016
//   x = 37   G2 =  528   x^2/G2 =   2.5928   ln = 0.953
//   §4 quotes x = 11 to 37 : 1.058, 0.940, 0.984, 0.878, 0.953, 1.182, 1.016, 0.953
//   U-FRAME records        : 1.058, 0.940, 0.984, 0.878, 0.953, 1.182, 1.016, 0.953
//
// ==============================================================================
// S5. U-FRAME §4 — G2 ~ (ln W)^alpha: local slopes and window fits
// ==============================================================================
//   local slopes    : 1.16, 1.08, 2.03, 0.91, 1.58, 2.03, 1.63, 1.73, 1.45, 2.11, 3.21
//   U-FRAME records : 1.16, 1.08, 2.03, 0.91, 1.58, 2.03, 1.63, 1.73, 1.45, 2.11, 3.21
//
//   fit window            n    alpha    U-FRAME records
//   all 12 levels        12    1.476   1.476
//   from x = 7            9    1.674   1.674
//   from x = 13           7    1.861   1.861
//   from x = 19           5    1.983   1.983
//   last four (23-37)     4    2.170   2.170
//
//   §4's caveat: drop x = 37 and the fit from x = 19 is 1.72 (U-FRAME records 1.98);
//   the dropped point is the jump 348 -> 528, local slope 3.21 (U-FRAME records 348 -> 528, 3.21). [fit 1.983 with it]
//
//   every alternative reading of the caveat, none of which is 1.98:
//     start window   with x = 37   without x = 37
//     from x = 13          1.861          1.749
//     from x = 17          1.869          1.686
//     from x = 19          1.983          1.716
//     from x = 23          2.170          1.756
//     from x = 19, ladder extended to x = 43 with the KNOWN G2(41#) = 546 and G2(43#) = 618
//     (research/G2-STATE.md §6.1, terms 13 and 14 — read in, not folded here):
//                        1.793          1.733
//     U-FRAME §4 and §7 item 3 still speak of a twelve-term ladder and price
//     G2(41#) as an unmade 37-hour measurement; both are stale against G2-STATE.
//
// [56 checks passed, 176.7s]
// ───── stderr ─────
//    fold-31 stream: copy 8/31, 47.1s
//    fold-31 stream: copy 16/31, 91.5s
//    fold-31 stream: copy 24/31, 137.0s
// ============================================================================
// READINGS
//
// 1. §2 REPRODUCES IN FULL. Eight rows, sixteen numbers, all sixteen. The
//    Inertness Lemma is asserted rather than watched: the run aborts if a
//    composite fold kills anything, and folds 9 and 15 both kill 0.
//
// 2. §4 REPRODUCES IN FULL EXCEPT ITS LAST SENTENCE. The nine multipliers, the
//    geometric mean 1.43, the nine budget fractions, the 77-to-214-percent
//    range, the eight lifetime slacks, the eleven local slopes and all five
//    fitted exponents land exactly. 48 figures, no exception.
//
// 3. THE ONE §4 NUMBER THAT FAILS IS THE CAVEAT, AND CORRECTING IT MAKES §4's
//    POINT HARDER. §4 closes: "The final 3.21 at x = 37, where G2 jumped 348 to
//    528, drags every recent fit upward. Drop it and the fit from x = 19 is
//    1.98." The fit from x = 19 WITH x = 37 is 1.983, three lines above in §4's
//    own table. Dropping x = 37 gives 1.716 on the same estimator that
//    reproduces all five of those table rows exactly, so the sentence quotes
//    the un-dropped value as the dropped one and reports no movement where the
//    movement is 0.27. Nothing else lands on 1.98 either: dropping x = 37 from
//    the windows starting at 13, 17, 19 and 23 gives 1.749, 1.686, 1.716 and
//    1.756, and extending the ladder to the known G2(41#) = 546 and
//    G2(43#) = 618 gives 1.793 with x = 37 and 1.733 without. §4's claim is
//    that one point is doing most of the work, and 1.983 -> 1.716 says that far
//    better than 1.983 -> 1.98 does.
//
// 4. §2's "162,000" IS THE PRODUCT WITHOUT THE 8. The folds by 4, 6, 8, 9 and
//    25 kill nothing and leave G2 at 12, both of which reproduce at all five
//    folds. The width does not: 30 * 4 * 6 * 8 * 9 * 25 = 1,296,000, and 162,000
//    is 30 * 4 * 6 * 9 * 25. The sentence is making a point about harmless waste
//    and that point survives either number, which is presumably why it was never
//    caught.
//
// 5. WHAT THE LADDER RESTS ON HERE, AND WHAT IT DOES NOT. Nothing is imported.
//    G2(31#) = 348 and G2(37#) = 528 come out of the run fold, which is checked
//    against a direct list fold at six folds and against a gap-array fold at
//    29, on the value AND on the gap sum, before it is used alone. It agrees
//    with research/a3-10-lower-tightness.js's deep31 and deep37 legs and with
//    research/exact-g2-ladder.js's LADDER, both of which reached the same two
//    numbers by unrelated engines. Three routes, no disagreement.
//
// 6. HONEST LIMITS. (a) This file reproduces §4's arithmetic; it says nothing
//    about whether the exponent alpha is below 2, which is the question §4 is
//    for, and research/exponent-control.md's measured +0.28 bias on the
//    one-class control is what governs that reading. (b) The ladder stops at 37
//    because the run fold's cost is one sweep of the OLD tile, so reaching 41
//    means sweeping T_37's 2.18e11 slots, roughly 35 times this file's deepest
//    pass. (c) The Inertness check covers the odd folds to 17 and the five
//    composite folds §2 names, not all composites.
//
// 7. AND U-FRAME'S LADDER IS TWO TERMS SHORT OF WHAT THE REPO KNOWS. §4 fits on
//    "our twelve levels" and closes "G2(41#) is not the decisive measurement";
//    §7 item 3 lists G2(41#) as future work, "the thirteenth term ... about 37
//    hours". research/G2-STATE.md §6.1 tabulates FOURTEEN terms, G2(41#) = 546
//    at 13 and G2(43#) = 618 at 14, and its §6.4 records the 546 confirmed twice
//    the same day. U-FRAME's own §6a says the same in another register: "G2(41#)
//    = 546 is already published as A144311's a(13) + 1, so computing it buys
//    verification rather than discovery." So one section prices a measurement
//    another section of the same file calls published. The fits over all
//    fourteen terms are in the block above so the size of the difference is
//    visible before anyone decides what to do: 1.793 against 1.983 from x = 19,
//    small, which is itself §4's point about small samples. This file does not
//    edit U-FRAME.md and does not fold 41 or 43 — those two G2 values are read
//    in from G2-STATE.md and are the only imported numbers here.
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded run does not contain verbatim
// actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own run prints (printed value first):
//   217929355875 -> "2.18e11" in reading 6, the T_37 slot count. The "roughly
//     35 times this file's deepest pass" is that against the printed 6469693230
//     slots of the x = 29 fold.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   0.27 in reading 3 is 1.983 - 1.716 = 0.267, the movement the caveat
//     sentence reports as none. Both fits are printed on the from x = 19 row.
//
// BORROWED, verified present in the named producer:
//   +0.28 in reading 6 is the one-class control's window bias. research/
//     exponent-control.md heads its section 1 "it grows, then sticks at +0.28"
//     over a table printing +0.280, +0.282 and +0.283, and exponent-control.js
//     prints the same bias column. Nothing here measures it.
//
// TOKENIZER ARTIFACT, not a figure:
//   -214 in reading 2 is the tail of the hyphenated range "77-to-214-percent".
//     The run prints it unhyphenated as "range over those nine folds: 77 to 214
//     percent (U-FRAME records 77 to 214)".
//   144311 in reading 7 is the tail of the OEIS identifier A144311, the
//     sequence whose a(13) + 1 is G2(41#) = 546.
// ---------------------------------------------------------------------------
