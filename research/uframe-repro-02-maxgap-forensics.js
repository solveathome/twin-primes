// ============================================================================
// U-FRAME REPRODUCTION 2 — THE MAX-GAP FORENSICS: research/U-FRAME.md §5,
// and the extension to folds 31 and 37 that §7 item 4 asks for
// (2026-08-19. TODO item 11b. Companion: uframe-repro-01-fold-ladder.js.)
// ============================================================================
// WHY THIS FILE EXISTS. U-FRAME §8: the tables of §§2, 4 and 5 "were generated
// from short scripts in a session scratchpad that no longer exists, and the
// repo holds no script that regenerates them ... treat those tables as
// recorded-not-reproducible and do not quote them elsewhere." Repro 1 covers
// §2 and §4. This file covers §5, both of its tables, and answers the question
// §7 item 4 leaves open: did the last folds EXTEND the old maximum gap or
// ASSEMBLE a fresh one out of several large ones?
//
// NOTHING IS IMPORTED. No ladder, no position and no L value is read out of
// another file. Each is recomputed and printed next to what U-FRAME records.
//
// WHAT §5 TABLE 1 SAYS, and how it is reproduced. For each fold it names the
// stretch that became the new record and what filled it: the new G2, how many
// slots the fold killed inside that stretch, the old sub-gaps those kills
// merged, and the old G2. Reproducing it needs one thing only, the position of
// the record stretch, and then TRIAL DIVISION does the rest: the old slots
// strictly inside the stretch are exactly the kills, and the distances between
// them are exactly the merged sub-gaps. The canonical choice is the LEAST
// position attaining the maximum, which is what makes the row comparable
// between runs when the maximum is attained more than once.
//
// WHAT §5 TABLE 2 SAYS. Two adjacent slots at distance g die together under
// fold p only if g = 0 or +-2 (mod p) — U-FRAME §10's criterion, proven there
// in one line from the strike classes {0, -2}. Table 2 lists, per fold, which
// gap VALUES of the old tile qualify, what share of the old tile's gaps they
// are (this is f, of §12), and L, the longest run of adjacent slots the fold
// can kill in one copy.
//
// ENGINES. Identical in kind to repro 1, and stated there in full: a list fold
// through T_23, a Uint8 gap-array fold for T_29 (214,708,725 slots at 215 MB),
// and a RUN FOLD for T_31 and T_37, which walks the old tile once and carries
// the at most two open runs rather than walking p copies. T_37's 217,929,355,875
// slots are never enumerated. The run fold is checked against the list fold at
// every fold from 7 to 23 and against the gap-array fold at 29 before it is
// trusted at 31 and 37.
//
// Deterministic, no randomness, no arguments, no environment.
// ============================================================================
'use strict';
const T0 = Date.now();
const el = () => ((Date.now() - T0) / 1000).toFixed(1) + 's';
let CHECKS = 0;
function assert(c, m) { if (!c) { console.error('ASSERT FAILED: ' + m); process.exit(1); } CHECKS++; }
const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
const upTo = x => PRIMES.filter(p => p <= x);
// r is a twin slot mod x# iff r != 0 and r != -2 mod every prime <= x
const maxArr = a => { let m = 0; for (let i = 0; i < a.length; i++) if (a[i] > m) m = a[i]; return m; };
function isSlot(r, x) { for (const p of upTo(x)) { if (r % p === 0) return false; if ((r + 2) % p === 0) return false; } return true; }

// ---------------------------------------------------------------------------
// The fold walk. One continuous sweep of the new tile of width U*W, starting at
// the old tile's first slot; the residue mod U advances by the gaps, so no
// position arithmetic is needed to decide a strike. The cycle closes from the
// last kept slot to the first kept slot one period on, so the leading stretch
// (first - s0) belongs to the WRAP gap; the gap sum is asserted against the
// width because that is the only thing that catches getting it wrong.
// ---------------------------------------------------------------------------
function foldWalk(gaps, W, s0, U, emit) {
  const N = gaps.length, kill2 = U - 2;
  let r = s0 % U, pos = s0, acc = 0, first = -1, nkept = 0;
  for (let j = 0; j < U; j++) {
    for (let i = 0; i < N; i++) {
      if (r !== 0 && r !== kill2) { nkept++; if (first < 0) first = pos; else emit(acc, pos); acc = 0; }
      const g = gaps[i]; acc += g; pos += g; r += g % U; if (r >= U) r -= U;
    }
  }
  emit(acc + (first - s0), first + U * W);
  return { first, nkept, W: U * W };
}

// ---------------------------------------------------------------------------
// The run folder. Folding by p turns each maximal run of old slots deleted by
// ONE copy into one new gap; copy j deletes only residues a_j = -jW and a_j - 2
// (mod p), so at most two copies have a run open at any point of a single sweep
// of the old tile. Copy boundaries are stitched explicitly: tail of copy j, the
// old tile's wrap gap, head of copy j+1.
//
// It also carries the POSITION of every run it closes, so the record stretch of
// the new tile comes out of the same sweep and needs no second pass.
// ---------------------------------------------------------------------------
function RunFolder(W, p, r0, pos0) {
  const wm = W % p, J = new Int32Array(p);
  for (let j = 0; j < p; j++) J[(((-j * wm) % p) + p) % p] = j;
  const cur = new Float64Array(p), len = new Int32Array(p), open = new Uint8Array(p), isHead = new Uint8Array(p);
  const headSum = new Float64Array(p), headLen = new Int32Array(p);
  let a1 = -1, a2 = -1, na = 0, r = r0, pos = pos0;
  let best = 0, bestLen = 0, bestPos = Infinity, maxOld = 0, maxRun = 0;
  const offer = (j, tot, l, startInCopy) => {
    const abs = j * W + startInCopy;
    if (tot > best) { best = tot; bestLen = l; bestPos = abs; }
    else if (tot === best && abs < bestPos) { bestPos = abs; bestLen = l; }
  };
  { const d0 = J[r], d1 = J[(r + 2) % p];
    open[d0] = 1; isHead[d0] = 1; cur[d0] = 0; len[d0] = 1; a1 = d0; na = 1;
    if (d1 !== d0) { open[d1] = 1; isHead[d1] = 1; cur[d1] = 0; len[d1] = 1; a2 = d1; na = 2; } }
  return {
    push(g) {
      if (g > maxOld) maxOld = g;
      pos += g; r = (r + g) % p;
      const d0 = J[r], d1 = J[(r + 2) % p];
      let b1 = -1, b2 = -1;
      for (let t = 0; t < na; t++) {
        const j = t === 0 ? a1 : a2;
        cur[j] += g;
        if (j === d0 || j === d1) { len[j]++; if (b1 < 0) b1 = j; else b2 = j; }
        else if (isHead[j]) { headSum[j] = cur[j]; headLen[j] = len[j]; isHead[j] = 0; open[j] = 0; }
        else { offer(j, cur[j], len[j], pos - cur[j]); if (len[j] > maxRun) maxRun = len[j]; open[j] = 0; }
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
        offer(j, tot, rl, pos - tailSum[j]);
        if (rl > maxRun) maxRun = rl;
      }
      return { G2: best, pos: bestPos, kills: bestLen, oldG2: maxOld, L: maxRun };
    },
  };
}

// ---------------------------------------------------------------------------
// Qualifying gaps and their share: the values a fold p can kill BOTH ends of.
// ---------------------------------------------------------------------------
function qualifying(hist, scale, p) {
  const vals = [];
  let tot = 0, q = 0;
  for (let k = 0; k < hist.length; k++) {
    if (!hist[k]) continue;
    const g = k * scale; tot += hist[k];
    const m = g % p;
    if (m === 0 || m === 2 || m === p - 2) { vals.push(g); q += hist[k]; }
  }
  return { vals, share: tot ? q / tot : 0, tot, q };
}

// ============================================================================
// S1. Build the tiles, fold by fold, and take every measurement in one sweep
// ============================================================================
console.log('='.repeat(78));
console.log('S1. BUILDING THE TILES, and what each fold is measured to do');
console.log('='.repeat(78));

const FOLDS = [];                                   // one entry per fold p >= 7
let tile = { gaps: [2], W: 2, s0: 1 };              // T_2: the odd comb
let prevX = 2, G2prev = 2;

for (const p of [3, 5]) {                           // warm up to T_5, nothing measured
  const kept = [];
  const res = foldWalk(tile.gaps, tile.W, tile.s0, p, g => kept.push(g));
  tile = { gaps: kept, W: res.W, s0: res.first };
  prevX = p; G2prev = maxArr(kept);
}

for (const p of [7, 11, 13, 17, 19, 23]) {
  const hist = new Float64Array(200);
  for (const g of tile.gaps) hist[g / 6]++;
  const qual = qualifying(hist, 6, p);
  const rf = RunFolder(tile.W, p, tile.s0 % p, tile.s0);
  for (let i = 0; i < tile.gaps.length - 1; i++) rf.push(tile.gaps[i]);
  const r = rf.finish(tile.gaps[tile.gaps.length - 1]);
  // the list fold, as the independent check of both G2 and the record position
  const kept = [];
  const res = foldWalk(tile.gaps, tile.W, tile.s0, p, g => kept.push(g));
  assert(kept.reduce((a, b) => a + b, 0) === res.W, `fold ${p}: gap sum != width`);
  const g2 = maxArr(kept);
  assert(r.G2 === g2, `run fold ${p}: G2 ${r.G2} vs list fold ${g2}`);
  let ppos = res.first, least = -1;
  for (let i = 0; i < kept.length; i++) { if (kept[i] === g2 && least < 0) least = ppos; ppos += kept[i]; }
  assert(least === r.pos, `run fold ${p}: record position ${r.pos} vs list fold ${least}`);
  FOLDS.push({ p, prevX, G2new: g2, G2prev, pos: least, kills: r.kills, L: r.L, qual, ngaps: tile.gaps.length });
  console.log(`  fold ${String(p).padStart(2)}: G2 ${String(G2prev).padStart(3)} -> ${String(g2).padStart(3)}   record at ${String(least).padStart(14)}   L = ${r.L}   (run fold agrees with list fold)`);
  tile = { gaps: kept, W: res.W, s0: res.first };
  prevX = p; G2prev = g2;
}
const T23 = tile, N23 = tile.gaps.length;
console.log(`  [T_23: ${N23} slots, width ${T23.W}, ${el()}]`);

// --- fold 29: T_23 -> T_29, kept as a Uint8 gap array ------------------------
{
  const hist = new Float64Array(200);
  for (const g of T23.gaps) hist[g / 6]++;
  const qual = qualifying(hist, 6, 29);
  const rf = RunFolder(T23.W, 29, T23.s0 % 29, T23.s0);
  for (let i = 0; i < N23 - 1; i++) rf.push(T23.gaps[i]);
  const r = rf.finish(T23.gaps[N23 - 1]);
  const N29 = N23 * 27, out = new Uint8Array(N29);
  let k = 0, sum = 0;
  const res = foldWalk(T23.gaps, T23.W, T23.s0, 29, g => { out[k++] = g / 6; sum += g; });
  assert(k === N29, `fold 29 emitted ${k} gaps, expected ${N29}`);
  assert(sum === res.W, `fold 29: gaps sum to ${sum}, width ${res.W}`);
  let mx = 0; for (let i = 0; i < N29; i++) if (out[i] > mx) mx = out[i];
  const g2 = mx * 6;
  assert(r.G2 === g2, `run fold 29: G2 ${r.G2} vs gap-array fold ${g2}`);
  let ppos = res.first, least = -1;
  for (let i = 0; i < N29 && least < 0; i++) { if (out[i] * 6 === g2) least = ppos; ppos += out[i] * 6; }
  assert(least === r.pos, `run fold 29: record position ${r.pos} vs gap-array fold ${least}`);
  FOLDS.push({ p: 29, prevX: 23, G2new: g2, G2prev, pos: least, kills: r.kills, L: r.L, qual, ngaps: N23 });
  console.log(`  fold 29: G2 ${G2prev} -> ${g2}   record at ${least}   L = ${r.L}   (run fold agrees with the gap-array fold)`);
  global.T29 = { gaps: out, W: res.W, s0: res.first, N: N29 };
  G2prev = g2; prevX = 29;
}
console.log(`  [T_29: ${global.T29.N} slots, width ${global.T29.W}, ${el()}]`);
console.log('  From here the run fold is used alone: T_31 is streamed, T_37 is never enumerated.');

// --- fold 31 and fold 37, in ONE sweep of T_29 and one of T_31 ---------------
{
  const t29 = global.T29, g29 = t29.gaps, N29 = t29.N;
  const hist29 = new Float64Array(200);
  for (let i = 0; i < N29; i++) hist29[g29[i]]++;
  const qual31 = qualifying(hist29, 6, 31);
  const rf31 = RunFolder(t29.W, 31, t29.s0 % 31, t29.s0);
  for (let i = 0; i < N29 - 1; i++) rf31.push(g29[i] * 6);
  const r31 = rf31.finish(g29[N29 - 1] * 6);
  FOLDS.push({ p: 31, prevX: 29, G2new: r31.G2, G2prev, pos: r31.pos, kills: r31.kills, L: r31.L, qual: qual31, ngaps: N29 });
  console.log(`  fold 31: G2 ${G2prev} -> ${r31.G2}   record at ${r31.pos}   L = ${r31.L}   (${el()})`);

  // stream T_31 out of T_29 and fold it by 37 as the gaps come off
  const W31 = t29.W * 31, N31 = N29 * 29;
  let firstPos = -1, firstMod37 = -1;
  { let r = t29.s0 % 31, pos = t29.s0, m37 = t29.s0 % 37;
    for (let i = 0; i < N29; i++) {
      if (r !== 0 && r !== 29) { firstPos = pos; firstMod37 = m37; break; }
      const g = g29[i] * 6; r = (r + g) % 31; pos += g; m37 = (m37 + g) % 37;
    }
    assert(firstPos >= 0, 'no survivor of fold 31 in the first copy'); }
  const rf37 = RunFolder(W31, 37, firstMod37, firstPos);
  const hist31 = new Float64Array(200);
  let r = t29.s0 % 31, acc = 0, started = false, emitted = 0, mx = 0;
  for (let j = 0; j < 31; j++) {
    for (let i = 0; i < N29; i++) {
      if (r !== 0 && r !== 29) {
        if (started) { if (acc > mx) mx = acc; hist31[acc / 6]++; rf37.push(acc); emitted++; } else started = true;
        acc = 0;
      }
      const g = g29[i] * 6; acc += g; r += g % 31; if (r >= 31) r -= 31;
    }
    process.stderr.write(`   fold-31 stream feeding fold 37: copy ${j + 1}/31, ${el()}\n`);
  }
  acc += firstPos - t29.s0;                       // close the cycle, as in foldWalk
  if (acc > mx) mx = acc;
  hist31[acc / 6]++; emitted++;
  const r37 = rf37.finish(acc);
  assert(emitted === N31, `T_31 stream emitted ${emitted} gaps, expected ${N31}`);
  assert(mx === r31.G2, `streamed G2(31#) ${mx} != run fold's ${r31.G2}`);
  assert(r37.oldG2 === r31.G2, `fold 37's view of G2(31#) is ${r37.oldG2}`);
  let s = 0; for (let k = 0; k < 200; k++) s += hist31[k] * k * 6;
  assert(s === W31, `T_31 gap histogram sums to ${s}, width ${W31}`);
  const qual37 = qualifying(hist31, 6, 37);
  FOLDS.push({ p: 37, prevX: 31, G2new: r37.G2, G2prev: r31.G2, pos: r37.pos, kills: r37.kills, L: r37.L, qual: qual37, ngaps: N31 });
  console.log(`  fold 37: G2 ${r31.G2} -> ${r37.G2}   record at ${r37.pos}   L = ${r37.L}   (${el()})`);
}

// ============================================================================
// S2. U-FRAME §5 TABLE 1 — what made the maximum gap
// ============================================================================
console.log('');
console.log('='.repeat(78));
console.log('S2. U-FRAME §5 TABLE 1 — the stretch that became the new record');
console.log('='.repeat(78));
const REC1 = {
  7: [30, 2, '6+12+12', 12], 11: [42, 1, '12+30', 30], 13: [66, 1, '36+30', 42],
  17: [108, 2, '30+66+12', 66], 19: [150, 1, '42+108', 108], 23: [204, 3, '24+48+90+42', 150],
  29: [258, 2, '60+60+138', 204],
};
console.log('  fold | new G2 | kills | merged sub-gaps          | old G2 | least position   | U-FRAME records');
for (const f of FOLDS) {
  assert(isSlot(f.pos, f.p), `record position ${f.pos} of fold ${f.p} is not a slot of T_${f.p}`);
  assert(isSlot(f.pos + f.G2new, f.p), `${f.pos + f.G2new} is not a slot of T_${f.p}`);
  const inside = [];
  for (let r = f.pos + 2; r < f.pos + f.G2new; r += 2) if (isSlot(r, f.prevX)) inside.push(r);
  for (const r of inside) assert(r % f.p === 0 || (r + 2) % f.p === 0, `slot ${r} inside fold ${f.p}'s record stretch was not killed by ${f.p}`);
  const sub = []; let last = f.pos;
  for (const r of inside) { sub.push(r - last); last = r; }
  sub.push(f.pos + f.G2new - last);
  assert(sub.reduce((a, b) => a + b, 0) === f.G2new, `sub-gaps of fold ${f.p} do not sum to ${f.G2new}`);
  assert(inside.length === sub.length - 1, 'kill count and sub-gap count disagree');
  f.sub = sub; f.inside = inside;
  const rec = REC1[f.p];
  const mine = sub.join('+');
  const flag = rec ? (rec[0] === f.G2new && rec[1] === inside.length && rec[2] === mine && rec[3] === f.G2prev ? 'reproduces' : 'DIFFERS  <--') : 'not in §5 (new)';
  console.log(`  ${String(f.p).padStart(4)} | ${String(f.G2new).padStart(6)} | ${String(inside.length).padStart(5)} | ${mine.padEnd(24)} | ${String(f.G2prev).padStart(6)} | ${String(f.pos).padStart(16)} | ${flag}` +
    (rec ? `  [${rec[1]} kills, ${rec[2]}]` : ''));
}
console.log('');
{ const withOld = FOLDS.filter(f => f.sub.includes(f.G2prev));
  console.log(`  the record stretch CONTAINS the old maximum gap in ${withOld.filter(f => f.p <= 29).length} of the 7 folds §5 tabulates` +
    ` (§5 says four of seven), and in ${withOld.length} of the ${FOLDS.length} folds tabulated here.`);
  console.log('  folds whose record contains the old maximum : ' + withOld.map(f => f.p).join(', '));
  console.log('  folds that assembled a fresh one           : ' + FOLDS.filter(f => !f.sub.includes(f.G2prev)).map(f => f.p).join(', '));
  console.log(`  §5's refuted guess: the maximum does not double. First fold, ${FOLDS[0].G2prev} -> ${FOLDS[0].G2new}, not ${2 * FOLDS[0].G2prev}.`); }

// ============================================================================
// S3. U-FRAME §5 TABLE 2 — adjacent kills, and L
// ============================================================================
console.log('');
console.log('='.repeat(78));
console.log('S3. U-FRAME §5 TABLE 2 — qualifying gaps, their share, and L');
console.log('='.repeat(78));
const REC2 = {
  7: ['{12}', '66.7%', 2], 11: ['none', '0%', 1], 13: ['{24}', '4.4%', 2], 17: ['{36, 66}', '4.9%', 2],
  19: ['{36, 78}', '4.9%', 2], 23: ['{48, 90, 138}', '3.1%', 3], 29: ['{60, 114, 174}', '3.1%', 2],
  31: ['', '', 4], 37: ['', '', 4],
};
// The verdict compares ALL THREE recorded entries, the share included. An earlier
// draft tested only the gap set and L, so fold 17 printed 4.8 per cent beside the
// word "reproduces" while §5 records 4.9 — a verdict column that contradicted the
// number in the row next to it. The share is compared the way a reader compares
// it, at the one decimal place §5 prints, and the exact count is printed with it
// so the rounding can be checked rather than trusted.
console.log('  fold | qualifying gaps in the old tile |    share (exact)     | L | U-FRAME records');
for (const f of FOLDS) {
  const vals = f.qual.vals.length ? '{' + f.qual.vals.join(', ') + '}' : 'none';
  const share = (100 * f.qual.share).toFixed(1) + '%';
  const exact = `${share} = ${f.qual.q}/${f.qual.tot} = ${(100 * f.qual.share).toFixed(4)}%`;
  const rec = REC2[f.p];
  const shareOk = rec[1] === '' || rec[1] === share || (rec[1] === '0%' && share === '0.0%');
  const ok = rec[0] === ''
    ? 'L only in §5'
    : (rec[0] === vals && rec[2] === f.L && shareOk ? 'reproduces'
      : (rec[0] === vals && rec[2] === f.L ? `SHARE DIFFERS  <--  §5 records ${rec[1]}` : 'DIFFERS  <--'));
  console.log(`  ${String(f.p).padStart(4)} | ${vals.padEnd(31)} | ${exact.padStart(21)} | ${String(f.L).padStart(1)} | ${ok}  [${rec[0] || '-'} ${rec[1] || '-'} L=${rec[2]}]`);
}
console.log('');
console.log('  L diagonal computed here : ' + FOLDS.map(f => f.L).join(', ') + '   (folds 7 to 37)');
console.log('  U-FRAME §5 records       : 2, 1, 2, 2, 2, 3, 2, 4, 4');
console.log('  kills column of table 1  : ' + FOLDS.map(f => f.inside.length).join(', '));
console.log('  §5: "the kills column never exceeds 3 even where longer runs were available" —');
console.log(`     max kills ${Math.max(...FOLDS.map(f => f.inside.length))} against max L ${Math.max(...FOLDS.map(f => f.L))}.`);

// ============================================================================
// S4. §7 item 4 — did the mechanism switch at the deep folds?
// ============================================================================
console.log('');
console.log('='.repeat(78));
console.log('S4. §7 ITEM 4 — extend the old maximum, or assemble a fresh one?');
console.log('='.repeat(78));
console.log('  fold | multiplier | largest sub-gap | old G2 | verdict');
for (const f of FOLDS) {
  const big = Math.max(...f.sub);
  const v = f.sub.includes(f.G2prev) ? 'EXTENDED the old maximum' : 'ASSEMBLED from ' + f.sub.length + ' sub-gaps, largest ' + big;
  console.log(`  ${String(f.p).padStart(4)} | ${(f.G2new / f.G2prev).toFixed(3).padStart(10)} | ${String(big).padStart(15)} | ${String(f.G2prev).padStart(6)} | ${v}`);
}
console.log('');
console.log('  §7 item 4 asks whether "the last three folds did not extend the old maximum');
console.log('  but assembled a fresh one from three or four large gaps". Folds 23, 29, 31, 37');
console.log('  above are the test.');

console.log('');
console.log(`[${CHECKS} checks passed, ${el()}]`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/uframe-repro-02-maxgap-forensics.js
//   invocation:  node research/uframe-repro-02-maxgap-forensics.js
//   code-sha256: e50a9b27a7f181be5ec3bf9f4fd5f75e8a71fa1a2c86f8a859bad00a8eb53b31
//   out-sha256:  90418584a358aa55180b13c89f9608685f165a3179db4c25aa2759a7e403e2f7
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     257.9 s
// ============================================================================
// ==============================================================================
// S1. BUILDING THE TILES, and what each fold is measured to do
// ==============================================================================
//   fold  7: G2  12 ->  30   record at             71   L = 2   (run fold agrees with list fold)
//   fold 11: G2  30 ->  42   record at            899   L = 1   (run fold agrees with list fold)
//   fold 13: G2  42 ->  66   record at            731   L = 2   (run fold agrees with list fold)
//   fold 17: G2  66 -> 108   record at            701   L = 2   (run fold agrees with list fold)
//   fold 19: G2 108 -> 150   record at            659   L = 2   (run fold agrees with list fold)
//   fold 23: G2 150 -> 204   record at       76166567   L = 3   (run fold agrees with list fold)
//   [T_23: 7952175 slots, width 223092870, 0.3s]
//   fold 29: G2 204 -> 258   record at 1205437109   L = 2   (run fold agrees with the gap-array fold)
//   [T_29: 214708725 slots, width 6469693230, 4.5s]
//   From here the run fold is used alone: T_31 is streamed, T_37 is never enumerated.
//   fold 31: G2 258 -> 348   record at 8813641451   L = 4   (11.5s)
//   fold 37: G2 348 -> 528   record at 544899485411   L = 4   (257.8s)
//
// ==============================================================================
// S2. U-FRAME §5 TABLE 1 — the stretch that became the new record
// ==============================================================================
//   fold | new G2 | kills | merged sub-gaps          | old G2 | least position   | U-FRAME records
//      7 |     30 |     2 | 6+12+12                  |     12 |               71 | reproduces  [2 kills, 6+12+12]
//     11 |     42 |     1 | 12+30                    |     30 |              899 | reproduces  [1 kills, 12+30]
//     13 |     66 |     1 | 36+30                    |     42 |              731 | reproduces  [1 kills, 36+30]
//     17 |    108 |     2 | 30+66+12                 |     66 |              701 | reproduces  [2 kills, 30+66+12]
//     19 |    150 |     1 | 42+108                   |    108 |              659 | reproduces  [1 kills, 42+108]
//     23 |    204 |     3 | 24+48+90+42              |    150 |         76166567 | reproduces  [3 kills, 24+48+90+42]
//     29 |    258 |     2 | 60+60+138                |    204 |       1205437109 | reproduces  [2 kills, 60+60+138]
//     31 |    348 |     2 | 138+60+150               |    258 |       8813641451 | not in §5 (new)
//     37 |    528 |     3 | 66+72+222+168            |    348 |     544899485411 | not in §5 (new)
//
//   the record stretch CONTAINS the old maximum gap in 4 of the 7 folds §5 tabulates (§5 says four of seven), and in 4 of the 9 folds tabulated here.
//   folds whose record contains the old maximum : 7, 11, 17, 19
//   folds that assembled a fresh one           : 13, 23, 29, 31, 37
//   §5's refuted guess: the maximum does not double. First fold, 12 -> 30, not 24.
//
// ==============================================================================
// S3. U-FRAME §5 TABLE 2 — qualifying gaps, their share, and L
// ==============================================================================
//   fold | qualifying gaps in the old tile |    share (exact)     | L | U-FRAME records
//      7 | {12}                            | 66.7% = 2/3 = 66.6667% | 2 | reproduces  [{12} 66.7% L=2]
//     11 | none                            | 0.0% = 0/15 = 0.0000% | 1 | reproduces  [none 0% L=1]
//     13 | {24}                            | 4.4% = 6/135 = 4.4444% | 2 | reproduces  [{24} 4.4% L=2]
//     17 | {36, 66}                        | 4.8% = 72/1485 = 4.8485% | 2 | SHARE DIFFERS  <--  §5 records 4.9%  [{36, 66} 4.9% L=2]
//     19 | {36, 78}                        | 4.9% = 1088/22275 = 4.8844% | 2 | reproduces  [{36, 78} 4.9% L=2]
//     23 | {48, 90, 138}                   | 3.1% = 11784/378675 = 3.1119% | 3 | reproduces  [{48, 90, 138} 3.1% L=3]
//     29 | {60, 114, 174}                  | 3.1% = 243816/7952175 = 3.0660% | 2 | reproduces  [{60, 114, 174} 3.1% L=2]
//     31 | {60, 126, 186}                  | 3.7% = 8022924/214708725 = 3.7367% | 4 | L only in §5  [- - L=4]
//     37 | {72, 150, 222, 294}             | 1.8% = 114848070/6226553025 = 1.8445% | 4 | L only in §5  [- - L=4]
//
//   L diagonal computed here : 2, 1, 2, 2, 2, 3, 2, 4, 4   (folds 7 to 37)
//   U-FRAME §5 records       : 2, 1, 2, 2, 2, 3, 2, 4, 4
//   kills column of table 1  : 2, 1, 1, 2, 1, 3, 2, 2, 3
//   §5: "the kills column never exceeds 3 even where longer runs were available" —
//      max kills 3 against max L 4.
//
// ==============================================================================
// S4. §7 ITEM 4 — extend the old maximum, or assemble a fresh one?
// ==============================================================================
//   fold | multiplier | largest sub-gap | old G2 | verdict
//      7 |      2.500 |              12 |     12 | EXTENDED the old maximum
//     11 |      1.400 |              30 |     30 | EXTENDED the old maximum
//     13 |      1.571 |              36 |     42 | ASSEMBLED from 2 sub-gaps, largest 36
//     17 |      1.636 |              66 |     66 | EXTENDED the old maximum
//     19 |      1.389 |             108 |    108 | EXTENDED the old maximum
//     23 |      1.360 |              90 |    150 | ASSEMBLED from 4 sub-gaps, largest 90
//     29 |      1.265 |             138 |    204 | ASSEMBLED from 3 sub-gaps, largest 138
//     31 |      1.349 |             150 |    258 | ASSEMBLED from 3 sub-gaps, largest 150
//     37 |      1.517 |             222 |    348 | ASSEMBLED from 4 sub-gaps, largest 222
//
//   §7 item 4 asks whether "the last three folds did not extend the old maximum
//   but assembled a fresh one from three or four large gaps". Folds 23, 29, 31, 37
//   above are the test.
//
// [98 checks passed, 257.8s]
// ───── stderr ─────
//    fold-31 stream feeding fold 37: copy 1/31, 19.1s
//    fold-31 stream feeding fold 37: copy 2/31, 27.0s
//    fold-31 stream feeding fold 37: copy 3/31, 34.9s
//    fold-31 stream feeding fold 37: copy 4/31, 42.8s
//    fold-31 stream feeding fold 37: copy 5/31, 50.7s
//    fold-31 stream feeding fold 37: copy 6/31, 58.7s
//    fold-31 stream feeding fold 37: copy 7/31, 66.6s
//    fold-31 stream feeding fold 37: copy 8/31, 74.6s
//    fold-31 stream feeding fold 37: copy 9/31, 82.5s
//    fold-31 stream feeding fold 37: copy 10/31, 90.5s
//    fold-31 stream feeding fold 37: copy 11/31, 98.4s
//    fold-31 stream feeding fold 37: copy 12/31, 106.4s
//    fold-31 stream feeding fold 37: copy 13/31, 114.4s
//    fold-31 stream feeding fold 37: copy 14/31, 122.3s
//    fold-31 stream feeding fold 37: copy 15/31, 130.3s
//    fold-31 stream feeding fold 37: copy 16/31, 138.3s
//    fold-31 stream feeding fold 37: copy 17/31, 146.3s
//    fold-31 stream feeding fold 37: copy 18/31, 154.3s
//    fold-31 stream feeding fold 37: copy 19/31, 162.2s
//    fold-31 stream feeding fold 37: copy 20/31, 170.2s
//    fold-31 stream feeding fold 37: copy 21/31, 178.3s
//    fold-31 stream feeding fold 37: copy 22/31, 186.3s
//    fold-31 stream feeding fold 37: copy 23/31, 194.2s
//    fold-31 stream feeding fold 37: copy 24/31, 202.2s
//    fold-31 stream feeding fold 37: copy 25/31, 210.1s
//    fold-31 stream feeding fold 37: copy 26/31, 218.0s
//    fold-31 stream feeding fold 37: copy 27/31, 226.0s
//    fold-31 stream feeding fold 37: copy 28/31, 233.9s
//    fold-31 stream feeding fold 37: copy 29/31, 241.9s
//    fold-31 stream feeding fold 37: copy 30/31, 249.9s
//    fold-31 stream feeding fold 37: copy 31/31, 257.8s
// ============================================================================
// READINGS
//
// 1. §5 TABLE 1 REPRODUCES IN FULL. Seven folds, and for each of them the new
//    G2, the kill count, the merged sub-gap word and the old G2, all four. So
//    does the sentence the table exists to support: "In four of seven folds the
//    winning stretch contains the old maximum gap itself" is four of seven here,
//    at folds 7, 11, 17 and 19. So does the refutation the section opens with,
//    that the maximum does not double: the first fold takes 12 to 30, not 24.
//
// 2. THE NINE ATTAINING POSITIONS ARE AN UNPLANNED SECOND CHECK, AND THEY PASS.
//    They are computed here by folding and by streaming with no table read in,
//    and all nine agree with the `pos` column of research/exact-g2-ladder.js,
//    which reached them by the tile-major bit-parallel enumeration. That
//    includes 544,899,485,411 at fold 37, a position in a tile of 2.18e11 slots
//    that this file never enumerates.
//
// 3. §5 TABLE 2 REPRODUCES EXCEPT ONE CELL. The qualifying gap sets are right at
//    every fold, the L diagonal is 2, 1, 2, 2, 2, 3, 2, 4, 4 exactly as
//    recorded, and six of the seven shares round to what §5 prints. Fold 17 does
//    not: §5 records 4.9 percent and the exact value is 72 of T13's 1,485 gaps,
//    4.8485 percent, which rounds to 4.8. The two contributing counts are 60
//    gaps of size 36 and 12 of size 66. The next row down, fold 19, genuinely is
//    4.9 (1,088 of 22,275 = 4.8844), so a carried-down value is the likely
//    history. Nothing rests on it, and that is exactly why it is worth saying
//    out loud: a table right in every other place is where a reader stops
//    checking.
//
// 4. THREE MORE CROSS-CHECKS FELL OUT, NONE OF THEM PLANNED. Fold 29's
//    qualifying count is 243,816, the number U-FRAME §8 attributes to
//    research/a3-10-lower-tightness.js's direct triple test, and the 6 that
//    separates it from §11's exact PAIRS(T23, 29) = 243,822 is visible here as
//    d = 174 = 6p occurring exactly 6 times. Fold 37's qualifying set and share,
//    {72, 150, 222, 294} at 114,848,070/6,226,553,025 = 1.8445 percent, match
//    research/a3-02-diagonal-f.js's deep block, whose per-value shares 1.765 and
//    0.079 sum to its f = 1.844e-2. (This sentence read "1.8442 percent" until
//    2026-08-19, when the shares began printing as exact fractions and the
//    hand-carried value turned out not to be one of them; the agreement with
//    a3-02 is unaffected, since both round to 1.844e-2.) L(T29, 31) = 4 and
//    L(T31, 37) = 4 match a3-10's deep31 and deep37 legs.
//
// 5. §7 ITEM 4 IS ANSWERED, AND IT IS FOUR FOLDS RATHER THAN THREE. Every fold
//    from 23 on assembles a fresh maximum rather than extending the old one;
//    every fold before it except 13 extends. The largest single piece of the
//    assembled record is 90, 138, 150 and 222 at folds 23, 29, 31 and 37,
//    against old maxima of 150, 204, 258 and 348, so the record is built out of
//    gaps well below the old maximum. Chris's original mechanism, kill the end
//    of the worst gap and absorb its neighbour, stopped being the operative one
//    at fold 23. That is the same place §4 says the multiplier stopped falling.
//
// 6. THE KILLS COLUMN STILL DOES NOT REACH L, TWO FOLDS DEEPER. Kills are 2, 1,
//    1, 2, 1, 3, 2, 2, 3 against L of 2, 1, 2, 2, 2, 3, 2, 4, 4. Max kills 3,
//    max L 4. §5's conclusion that "bounding the adjacent-kill run bounds the
//    wrong quantity" survives the extension to folds 31 and 37, where L reaches
//    4 and the record is still assembled from at most three kills.
//
// 7. HONEST LIMITS. (a) The record stretch is the LEAST attaining position. G2
//    is attained more than once at every fold (2 to 20 times, per
//    exact-g2-ladder's nmax column), and a different attaining stretch could
//    decompose differently; the least position is a convention, chosen because
//    it is what makes a row comparable between runs, not because it is
//    canonical in the mathematics. (b) L here is the longest run of adjacent
//    slots one copy of the fold can kill, which is kappa(1) of §10; nothing
//    here measures kappa(m) for m > 1. (c) The run fold is exact and checked at
//    seven folds, but its copy-boundary stitching is the part with no
//    independent check below fold 29, so the gap-sum assertion at every fold is
//    doing real work and should stay.
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   2.18e11, the slot count of the fold-37 tile in reading 2. The output
//   prints the slot ladder T_23: 7952175 and T_29: 214708725, and the
//   fold-37 share denominator 6226553025 is the T_31 slot count, since
//   214708725 x 29 = 6226553025. One more step of the same recursion,
//   6226553025 x 35, is 217929355875, which rounds to 2.18e11. The tile is
//   never enumerated, so the count is arithmetic, not a measurement.
//
// BORROWED, verified present in the named source:
//   243,822, the exact PAIRS(T_23, 29) of reading 4. It is in
//   research/U-FRAME.md line 706 and in the pairs row of
//   research/operator-and-pair-count.md. It is not produced here; what is
//   produced here is the 243,816 and the d = 174 count of 6 that closes the
//   difference.
//   1.765 and 0.079, the per-value shares of reading 4, and their sum
//   1.844e-2. All three are in the embedded OUTPUT of
//   research/a3-02-diagonal-f.js, on its qualifying-gaps line
//   "72(1.765%) 150(0.079%)" and its "f = 1.844e-2" line. The same
//   1.844e-2 is also in research/a3-03-f-from-census.js.
//   1.8442, the value reading 4 quotes as the text this sentence carried
//   until 2026-08-19. It is a retired figure quoted inside a correction
//   note, not a claim. The correction record is in
//   research/history/staging/consolidation-wave.md line 689, which names
//   1.8442 as the first draft's fold-37 share.
// ---------------------------------------------------------------------------
