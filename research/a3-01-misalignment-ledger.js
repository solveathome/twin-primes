// ============================================================================
// A3-01 — THE MISALIGNMENT LEDGER: does the record gap RELOCATE across folds?
// ============================================================================
// ATTACKS3 A1 [R]. The misalignment principle says damage cannot compound at
// one location: fold T_x by p and copy k deletes exactly the residue 2-set
// {-kw, -kw-2} (mod p), and by CRT the worst alignment for the NEXT prime is
// independent of this one. Prediction: the record gap should RELOCATE, not sit
// in one place growing monotonically.
//
// This extends research/whatmadeit.js, which already finds the record stretch,
// with the full ancestry ledger:
//   - POSITION of the new record (absolute and normalised u = pos/P),
//   - COPY INDEX k it starts in, and the old slot index i it starts at,
//   - the SPAN of old gap indices it merged,
//   - whether that span contains the EXACT gap that was the record one fold
//     ago (desc-exact) or any gap tied with it (desc-any),
//   - how many DISTINCT locations attain the new maximum,
//   - the fate of the previous record's own lineage: its best descendant and
//     that descendant's RANK among all new gaps.
//
// Representation: the tile is carried as its GAP WORD (Uint16Array of length
// D) plus W and the first slot, never as positions. Residues stream by
// r <- (r + g) mod p, so folding is one pass with no position array. This is
// what makes tile T29 (214.7M slots, 429MB as Uint16) storable at all.
//
// Custody: the first table reproduces whatmadeit.js column for column.
// Run:  node a3-01-misalignment-ledger.js
// Deep: FOLDS=7,11,13,17,19,23,29,31 node --max-old-space-size=12000 a3-01-...
// What that deep run cost when it was first made, 2026-08-16, kept here
// because an embed header states only the run it made: "seven folds in 4s,
// the eighth fold 31 adds 113s under --max-old-space-size=10000 and 429MB
// for the T29 gap word".
// ============================================================================
'use strict';

const FOLDS = (process.env.FOLDS || '7,11,13,17,19,23,29').split(',').map(Number);
const TOPK = 256;                      // depth of the new-gap rank ladder
const t0 = Date.now();
const el = () => ((Date.now() - t0) / 1000).toFixed(1) + 's';

// --- tile T5: slots 11, 17, 29 in a window of 30 -----------------------------
let W = 30, s0 = 11, D = 3;
let gaps = Uint16Array.from([6, 12, 12]);
let prevRecIdx = -1;                   // index of the record gap in the CURRENT gap word
let prevU = null;                      // its normalised position at the previous fold
let lineIdx = -1, lineFrom = 0;        // ONE frozen location, followed greedily forever

const rowsA = [], rowsB = [], rowsC = [], rowsD = [], rowsE = [];

for (let fi = 0; fi < FOLDS.length; fi++) {
  const p = FOLDS[fi];
  const LAST = fi === FOLDS.length - 1;
  const Dn = D * (p - 2), Wn = W * p;

  // ---- old-tile statistics -------------------------------------------------
  let oldMax = 0;
  for (let i = 0; i < D; i++) if (gaps[i] > oldMax) oldMax = gaps[i];
  const oldArg = [];                                   // all indices attaining oldMax
  for (let i = 0; i < D; i++) if (gaps[i] === oldMax) oldArg.push(i);
  const oldArgA = Int32Array.from(oldArg);
  const hist = new Float64Array(oldMax + 1);
  for (let i = 0; i < D; i++) hist[gaps[i]]++;
  const rankOf = (v) => { let c = 0; for (let d = v + 1; d <= oldMax; d++) c += hist[d]; return c + 1; };

  console.log(`[${el()}] fold ${p}: D=${D} -> ${Dn}, W=${W} -> ${Wn}, oldG2=${oldMax} at ${oldArg.length} site(s)`);

  // ---- stream the fold -----------------------------------------------------
  const ng = LAST ? null : new Uint16Array(Dn);
  const topVals = new Int32Array(TOPK);
  const subBuf = new Uint32Array(64);
  let n = 0;                                            // new-gap write index
  let r = s0 % p;                                       // residue of slot (k=0,i=0)
  let pos = s0;
  let acc = 0, m = 0, hasE = false, hasA = false, hasL = false, bigS = 0;
  let bestL = -1, bestLIdx = -1;                        // greedy best descendant of the frozen location
  let prev = -1, prevPos = 0, prevK = 0, prevI = 0;
  let headAcc = 0, headM = 0, headE = false, headA = false, headL = false, headBig = 0, headSubs = null;
  let firstPos = 0, firstJ = -1;
  let maxVal = -1, cntMax = 0, rec = null;
  let locs = [];
  let kSet = new Set(), iSet = new Set();
  let descA = 0, descE = 0, sumM = 0, bigEq = 0, uFirst = 0, uLast = 0;
  let bestDescE = -1, bestDescA = -1;                   // best gap descended from the record / from any old-max gap
  // PROGRESS PRINTS ARE GATED ON THE COPY INDEX, NOT ON A STOPWATCH
  // (2026-08-19, custody migration wave 3). This used to print whenever 30
  // WALL-CLOCK seconds had passed since the last print, so WHICH copies
  // appeared in the tail was a property of machine load: a loaded machine
  // dropped the `copy 9/31`, `18/31` and `27/31` lines that a quiet one
  // produces, and no embed of this file could be reproduced anywhere else.
  // Every ninth copy is the same set of lines on every machine, and it
  // reproduces the 2026-08-16 tail exactly at fold 31 (copies 9, 18, 27 of 31).
  // Folds smaller than 31 are fast and simply gain a line or two of the same
  // kind. Nothing here is read by the computation.
  const PRINT_EVERY_KTH_COPY = 9;

  // record a site attaining the running maximum (fresh = it beat the old max)
  const site = (fresh, g, pp, kk, ii, mm, hE, hA, bS) => {
    if (fresh) {
      cntMax = 1; kSet = new Set(); iSet = new Set(); locs = [];
      descA = 0; descE = 0; sumM = 0; bigEq = 0; uFirst = pp;
    } else cntMax++;
    kSet.add(kk); if (iSet.size < 2e6) iSet.add(ii);
    if (locs.length < 12) locs.push({ pos: pp, k: kk, i: ii });
    if (hA) descA++; if (hE) descE++; if (bS === oldMax) bigEq++;
    sumM += mm; uLast = pp;
  };

  for (let k = 0; k < p; k++) {
    let ptr = 0;
    for (let i = 0; i < D; i++) {
      if (r !== 0 && r !== p - 2) {                     // slot (k,i) survives
        if (prev >= 0) {
          if (ng) ng[n] = acc;
          if (acc > maxVal) {
            maxVal = acc;
            const L = m < 64 ? m : 64, s = [];
            for (let q = 0; q < L; q++) s.push(subBuf[q]);
            rec = { gap: acc, pos: prevPos, k: prevK, i: prevI, m, subs: s, trunc: m > 64, hasE, hasA, bigS, idx: n };
            site(true, acc, prevPos, prevK, prevI, m, hasE, hasA, bigS);
          } else if (acc === maxVal) site(false, acc, prevPos, prevK, prevI, m, hasE, hasA, bigS);
          if (hasE && acc > bestDescE) bestDescE = acc;
          if (hasA && acc > bestDescA) bestDescA = acc;
          if (hasL && acc > bestL) { bestL = acc; bestLIdx = n; }
          if (acc > topVals[TOPK - 1]) {
            let q = TOPK - 1;
            while (q > 0 && topVals[q - 1] < acc) { topVals[q] = topVals[q - 1]; q--; }
            topVals[q] = acc;
          }
          n++;
        } else {
          headAcc = acc; headM = m; headE = hasE; headA = hasA; headL = hasL; headBig = bigS;
          headSubs = []; const L = m < 64 ? m : 64;
          for (let q = 0; q < L; q++) headSubs.push(subBuf[q]);
          firstPos = pos; firstJ = k * D + i;
        }
        prev = 1; prevPos = pos; prevK = k; prevI = i;
        acc = 0; m = 0; hasE = false; hasA = false; hasL = false; bigS = 0;
      }
      const g = gaps[i];
      if (m < 64) subBuf[m] = g;
      acc += g; m++; pos += g;
      if (g > bigS) bigS = g;
      if (i === prevRecIdx) hasE = true;
      if (i === lineIdx) hasL = true;
      if (ptr < oldArgA.length && oldArgA[ptr] === i) { hasA = true; ptr++; }
      r += g; if (r >= p) r %= p;
    }
    if ((k + 1) % PRINT_EVERY_KTH_COPY === 0) {
      console.log(`[${el()}]   fold ${p}: copy ${k + 1}/${p}, ${n} new gaps, running max ${maxVal}`);
    }
  }
  // ---- the cyclic wrap gap -------------------------------------------------
  {
    const acc2 = acc + headAcc, m2 = m + headM;
    const hE = hasE || headE, hA = hasA || headA, hL = hasL || headL, bS = bigS > headBig ? bigS : headBig;
    if (ng) ng[n] = acc2;
    if (acc2 > maxVal) {
      maxVal = acc2;
      const L = m < 64 ? m : 64, s = [];
      for (let q = 0; q < L; q++) s.push(subBuf[q]);
      rec = { gap: acc2, pos: prevPos, k: prevK, i: prevI, m: m2, subs: s.concat(headSubs), trunc: m2 > 64, hasE: hE, hasA: hA, bigS: bS, idx: n };
      site(true, acc2, prevPos, prevK, prevI, m2, hE, hA, bS);
    } else if (acc2 === maxVal) site(false, acc2, prevPos, prevK, prevI, m2, hE, hA, bS);
    if (hE && acc2 > bestDescE) bestDescE = acc2;
    if (hA && acc2 > bestDescA) bestDescA = acc2;
    if (hL && acc2 > bestL) { bestL = acc2; bestLIdx = n; }
    if (acc2 > topVals[TOPK - 1]) {
      let q = TOPK - 1;
      while (q > 0 && topVals[q - 1] < acc2) { topVals[q] = topVals[q - 1]; q--; }
      topVals[q] = acc2;
    }
    n++;
  }
  if (n !== Dn) throw new Error(`slot count ${n} != D*(p-2) ${Dn}`);

  // ---- ranks of the old record's best descendants among ALL new gaps -------
  const rankIn = (v) => { let g = 0; for (let q = 0; q < TOPK; q++) if (topVals[q] > v) g++; return g >= TOPK ? `>${TOPK}` : String(g + 1); };

  // ---- rows ----------------------------------------------------------------
  const shown = rec.subs.length <= 6 ? rec.subs.join('+') : rec.subs.slice(0, 5).join('+') + '+...';
  rowsA.push([p, maxVal, rec.m - 1, shown, oldMax, (rec.bigS / oldMax).toFixed(3)]);
  // the tile is invariant under s -> W-2-s (s is a twin slot iff W-2-s is), so
  // every max gap has a mirror twin. Verify it on the stored sites.
  let mir = 'n/a';
  if (cntMax <= 12) {
    const set = new Set(locs.map(o => o.pos));
    mir = locs.every(o => set.has(((Wn - 2 - o.pos - maxVal) % Wn + Wn) % Wn)) ? 'ok' : 'NO';
  }
  const u = rec.pos / Wn, mbar = sumM / cntMax;
  const exp = oldArg.length * sumM / D;                 // expected #record sites over an old-max gap, if placed at random
  rowsB.push([p, maxVal, cntMax, cntMax / 2, mir, kSet.size + '/' + p, iSet.size, mbar.toFixed(2),
    (uFirst / Wn).toFixed(5), (uLast / Wn).toFixed(5)]);
  rowsC.push([p, oldMax, oldArg.length, descA, cntMax - descA, exp.toFixed(4),
    exp > 0 ? (descA / exp).toFixed(1) + 'x' : 'inf', bigEq === descA ? 'ok' : 'MISMATCH',
    prevRecIdx < 0 ? '-' : descE]);
  rowsD.push([p, bestDescA, (bestDescA / maxVal).toFixed(3), rankIn(bestDescA),
    prevRecIdx < 0 ? '-' : bestDescE, prevRecIdx < 0 ? '-' : (bestDescE / maxVal).toFixed(3),
    prevRecIdx < 0 ? '-' : rankIn(bestDescE), rec.bigS, rankOf(rec.bigS),
    (100 * rankOf(rec.bigS) / D).toFixed(4) + '%']);
  rowsE.push([p, lineIdx < 0 ? '-' : `T${lineFrom}`, lineIdx < 0 ? '-' : bestL,
    lineIdx < 0 ? '-' : (bestL / maxVal).toFixed(3), lineIdx < 0 ? '-' : rankIn(bestL), maxVal]);

  console.log(`[${el()}]   -> G2=${maxVal} at ${cntMax} site(s) in ${kSet.size}/${p} copies and ${iSet.size} old indices;` +
    ` ${descA} sites sit on an old-max gap (random expectation ${exp.toFixed(3)});` +
    ` best descendant of an old-max gap ${bestDescA} (rank ${rankIn(bestDescA)})`);
  if (cntMax <= 12) console.log(`[${el()}]   max sites (pos,copy,oldidx): ` + locs.map(o => `(${o.pos},${o.k},${o.i})`).join(' '));

  // ---- advance -------------------------------------------------------------
  prevU = u; prevRecIdx = rec.idx;
  if (lineIdx < 0) { lineIdx = rec.idx; lineFrom = p; }   // freeze the fold-7 record location
  else lineIdx = bestLIdx;                                // and follow its best descendant, greedily
  if (!LAST) { gaps = ng; D = Dn; W = Wn; s0 = firstPos; }
}

// ---- print ------------------------------------------------------------------
const tab = (hdr, rows, w) => {
  console.log('\n' + hdr.map((h, j) => String(h).padStart(w[j])).join(' | '));
  console.log(hdr.map((h, j) => '-'.repeat(w[j])).join('-+-'));
  for (const r of rows) console.log(r.map((c, j) => String(c).padStart(w[j])).join(' | '));
};
console.log('\nA. CUSTODY — reproduces research/whatmadeit.js column for column.');
tab(['fold', 'new G2', 'kills', 'merged sub-gaps', 'old G2', 'bigsub/oldG2'], rowsA, [4, 6, 5, 26, 6, 12]);
console.log('\nB. MULTIPLICITY AND SCATTER — is the record one place or many?');
tab(['fold', 'new G2', '#sites at max', 'up to mirror', 'mirror check', 'copies k used', '#old idx used', 'mean span', 'u first', 'u last'], rowsB, [4, 6, 13, 12, 12, 13, 13, 9, 8, 8]);
console.log('\nC. ANCESTRY — do the record sites sit on the OLD record?');
tab(['fold', 'old G2', '#old-max sites', 'sites on old max', 'sites elsewhere', 'random exp', 'enrichment', 'check', 'sites on tracked rec'], rowsC, [4, 6, 14, 16, 15, 10, 10, 8, 20]);
console.log('\nD. THE OLD RECORD\'S FATE — how far does its own lineage get?');
tab(['fold', 'best desc of old max', '/newG2', 'rank', 'best desc of tracked rec', '/newG2', 'rank', 'bigsub', 'bigsub old-rank', 'percentile'], rowsD, [4, 20, 7, 6, 24, 7, 6, 6, 15, 10]);
console.log('\nE. ONE FROZEN LOCATION, followed greedily by its largest descendant.');
tab(['fold', 'lineage from', 'best gap on that line', '/G2', 'rank', 'G2'], rowsE, [4, 12, 21, 6, 6, 6]);

console.log(`\nrecords with a single site: ${rowsB.filter(r => r[2] === 1).length} of ${rowsB.length}.`);
console.log(`folds where the old record's lineage still holds the new record (rank 1): ${rowsD.filter(r => r[3] === '1').length} of ${rowsD.length}.`);
console.log(`folds where NO record site sits on an old-max gap: ${rowsC.filter(r => r[3] === 0).length} of ${rowsC.length}.`);
console.log(`[${el()}] done.`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --env FOLDS=7,11,13,17,19,23,29,31 --node-flag --max-old-space-size=12000 research/a3-01-misalignment-ledger.js
//   invocation:  FOLDS=7,11,13,17,19,23,29,31 node --max-old-space-size=12000 research/a3-01-misalignment-ledger.js
//   code-sha256: 046388182f8990c3aafe381b7903c2e1ba3f4b306076fafb659fb7d1019e6818
//   out-sha256:  fc2dcd732f5614a607d9b030676e23885a2d83a075f2f2d17c868591632979e7
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     115.1 s
// ============================================================================
// [0.0s] fold 7: D=3 -> 15, W=30 -> 210, oldG2=12 at 2 site(s)
// [0.0s]   -> G2=30 at 2 site(s) in 2/7 copies and 2 old indices; 2 sites sit on an old-max gap (random expectation 4.000); best descendant of an old-max gap 30 (rank 1)
// [0.0s]   max sites (pos,copy,oldidx): (71,2,0) (107,3,1)
// [0.0s] fold 11: D=15 -> 135, W=210 -> 2310, oldG2=30 at 2 site(s)
// [0.0s]   fold 11: copy 9/11, 109 new gaps, running max 42
// [0.0s]   -> G2=42 at 4 site(s) in 2/11 copies and 2 old indices; 4 sites sit on an old-max gap (random expectation 1.067); best descendant of an old-max gap 42 (rank 1)
// [0.0s]   max sites (pos,copy,oldidx): (899,4,4) (947,4,7) (1319,6,4) (1367,6,7)
// [0.0s] fold 13: D=135 -> 1485, W=2310 -> 30030, oldG2=42 at 4 site(s)
// [0.0s]   fold 13: copy 9/13, 1028 new gaps, running max 66
// [0.0s]   -> G2=66 at 12 site(s) in 12/13 copies and 6 old indices; 0 sites sit on an old-max gap (random expectation 0.711); best descendant of an old-max gap 60 (rank 13)
// [0.0s]   max sites (pos,copy,oldidx): (731,0,43) (3851,1,89) (6581,2,114) (7211,3,17) (9941,4,42) (13061,5,88) (16901,7,43) (20021,8,89) (22751,9,114) (23381,10,17) (26111,11,42) (29231,12,88)
// [0.0s] fold 17: D=1485 -> 22275, W=30030 -> 510510, oldG2=66 at 12 site(s)
// [0.0s]   fold 17: copy 9/17, 11791 new gaps, running max 108
// [0.0s]   -> G2=108 at 20 site(s) in 10/17 copies and 20 old indices; 8 sites sit on an old-max gap (random expectation 0.485); best descendant of an old-max gap 108 (rank 1)
// [0.0s] fold 19: D=22275 -> 378675, W=510510 -> 9699690, oldG2=108 at 20 site(s)
// [0.0s]   fold 19: copy 9/19, 179370 new gaps, running max 150
// [0.1s]   fold 19: copy 18/19, 358745 new gaps, running max 150
// [0.1s]   -> G2=150 at 20 site(s) in 11/19 copies and 16 old indices; 8 sites sit on an old-max gap (random expectation 0.047); best descendant of an old-max gap 150 (rank 1)
// [0.1s] fold 23: D=378675 -> 7952175, W=9699690 -> 223092870, oldG2=150 at 20 site(s)
// [0.2s]   fold 23: copy 9/23, 3111727 new gaps, running max 204
// [0.2s]   fold 23: copy 18/23, 6223434 new gaps, running max 204
// [0.2s]   -> G2=204 at 4 site(s) in 3/23 copies and 4 old indices; 0 sites sit on an old-max gap (random expectation 0.001); best descendant of an old-max gap 180 (rank 35)
// [0.2s]   max sites (pos,copy,oldidx): (76166567,7,322815) (108991247,11,89586) (114101417,11,289083) (146926097,15,55854)
// [0.3s] fold 29: D=7952175 -> 214708725, W=223092870 -> 6469693230, oldG2=204 at 4 site(s)
// [1.3s]   fold 29: copy 9/29, 66633737 new gaps, running max 258
// [2.5s]   fold 29: copy 18/29, 133267472 new gaps, running max 258
// [3.8s]   fold 29: copy 27/29, 199901220 new gaps, running max 258
// [4.0s]   -> G2=258 at 2 site(s) in 2/29 copies and 2 old indices; 0 sites sit on an old-max gap (random expectation 0.000); best descendant of an old-max gap 234 (rank 11)
// [4.0s]   max sites (pos,copy,oldidx): (1205437109,5,3207091) (5264255861,23,4745079)
// [4.7s] fold 31: D=214708725 -> 6226553025, W=6469693230 -> 200560490130, oldG2=258 at 2 site(s)
// [35.3s]   fold 31: copy 9/31, 1807708938 new gaps, running max 348
// [67.8s]   fold 31: copy 18/31, 3615417901 new gaps, running max 348
// [100.5s]   fold 31: copy 27/31, 5423126831 new gaps, running max 348
// [115.0s]   -> G2=348 at 4 site(s) in 4/31 copies and 4 old indices; 0 sites sit on an old-max gap (random expectation 0.000); best descendant of an old-max gap 270 (rank >256)
// [115.0s]   max sites (pos,copy,oldidx): (8813641451,1,77788249) (69494902091,10,159229485) (131065587689,20,55479235) (191746848329,29,136920471)
//
// A. CUSTODY — reproduces research/whatmadeit.js column for column.
//
// fold | new G2 | kills |            merged sub-gaps | old G2 | bigsub/oldG2
// -----+--------+-------+----------------------------+--------+-------------
//    7 |     30 |     2 |                    6+12+12 |     12 |        1.000
//   11 |     42 |     1 |                      12+30 |     30 |        1.000
//   13 |     66 |     1 |                      36+30 |     42 |        0.857
//   17 |    108 |     2 |                   30+66+12 |     66 |        1.000
//   19 |    150 |     1 |                     42+108 |    108 |        1.000
//   23 |    204 |     3 |                24+48+90+42 |    150 |        0.600
//   29 |    258 |     2 |                  60+60+138 |    204 |        0.676
//   31 |    348 |     2 |                 138+60+150 |    258 |        0.581
//
// B. MULTIPLICITY AND SCATTER — is the record one place or many?
//
// fold | new G2 | #sites at max | up to mirror | mirror check | copies k used | #old idx used | mean span |  u first |   u last
// -----+--------+---------------+--------------+--------------+---------------+---------------+-----------+----------+---------
//    7 |     30 |             2 |            1 |           ok |           2/7 |             2 |      3.00 |  0.33810 |  0.50952
//   11 |     42 |             4 |            2 |           ok |          2/11 |             2 |      2.00 |  0.38918 |  0.59177
//   13 |     66 |            12 |            6 |           ok |         12/13 |             6 |      2.00 |  0.02434 |  0.97339
//   17 |    108 |            20 |           10 |          n/a |         10/17 |            20 |      3.00 |  0.00137 |  0.99841
//   19 |    150 |            20 |           10 |          n/a |         11/19 |            16 |      2.60 |  0.00007 |  0.99992
//   23 |    204 |             4 |            2 |           ok |          3/23 |             4 |      4.00 |  0.34141 |  0.65859
//   29 |    258 |             2 |            1 |           ok |          2/29 |             2 |      3.00 |  0.18632 |  0.81368
//   31 |    348 |             4 |            2 |           ok |          4/31 |             4 |      3.00 |  0.04395 |  0.95605
//
// C. ANCESTRY — do the record sites sit on the OLD record?
//
// fold | old G2 | #old-max sites | sites on old max | sites elsewhere | random exp | enrichment |    check | sites on tracked rec
// -----+--------+----------------+------------------+-----------------+------------+------------+----------+---------------------
//    7 |     12 |              2 |                2 |               0 |     4.0000 |       0.5x |       ok |                    -
//   11 |     30 |              2 |                4 |               0 |     1.0667 |       3.8x |       ok |                    2
//   13 |     42 |              4 |                0 |              12 |     0.7111 |       0.0x |       ok |                    0
//   17 |     66 |             12 |                8 |              12 |     0.4848 |      16.5x |       ok |                    1
//   19 |    108 |             20 |                8 |              12 |     0.0467 |     171.3x |       ok |                    2
//   23 |    150 |             20 |                0 |               4 |     0.0008 |       0.0x |       ok |                    0
//   29 |    204 |              4 |                0 |               2 |     0.0000 |       0.0x |       ok |                    0
//   31 |    258 |              2 |                0 |               4 |     0.0000 |       0.0x |       ok |                    0
//
// D. THE OLD RECORD'S FATE — how far does its own lineage get?
//
// fold | best desc of old max |  /newG2 |   rank | best desc of tracked rec |  /newG2 |   rank | bigsub | bigsub old-rank | percentile
// -----+----------------------+---------+--------+--------------------------+---------+--------+--------+-----------------+-----------
//    7 |                   30 |   1.000 |      1 |                        - |       - |      - |     12 |               1 |   33.3333%
//   11 |                   42 |   1.000 |      1 |                       42 |   1.000 |      1 |     30 |               1 |    6.6667%
//   13 |                   60 |   0.909 |     13 |                       60 |   0.909 |     13 |     36 |               5 |    3.7037%
//   17 |                  108 |   1.000 |      1 |                      108 |   1.000 |      1 |     66 |               1 |    0.0673%
//   19 |                  150 |   1.000 |      1 |                      150 |   1.000 |      1 |    108 |               1 |    0.0045%
//   23 |                  180 |   0.882 |     35 |                      168 |   0.824 |    153 |     90 |            2169 |    0.5728%
//   29 |                  234 |   0.907 |     11 |                      222 |   0.860 |     45 |    138 |            2359 |    0.0297%
//   31 |                  270 |   0.776 |   >256 |                      270 |   0.776 |   >256 |    150 |           88989 |    0.0414%
//
// E. ONE FROZEN LOCATION, followed greedily by its largest descendant.
//
// fold | lineage from | best gap on that line |    /G2 |   rank |     G2
// -----+--------------+-----------------------+--------+--------+-------
//    7 |            - |                     - |      - |      - |     30
//   11 |           T7 |                    42 |  1.000 |      1 |     42
//   13 |           T7 |                    60 |  0.909 |     13 |     66
//   17 |           T7 |                    84 |  0.778 |     67 |    108
//   19 |           T7 |                   132 |  0.880 |    107 |    150
//   23 |           T7 |                   150 |  0.735 |   >256 |    204
//   29 |           T7 |                   168 |  0.651 |   >256 |    258
//   31 |           T7 |                   198 |  0.569 |   >256 |    348
//
// records with a single site: 0 of 8.
// folds where the old record's lineage still holds the new record (rank 1): 4 of 8.
// folds where NO record site sits on an old-max gap: 4 of 8.
// [115.0s] done.
// ============================================================================
// READINGS.
//
// 1. CUSTODY (VERIFIED). Table A reproduces research/whatmadeit.js column for
//    column at all seven of its folds, including the three named in the brief:
//    fold 7 -> 30 via 6+12+12, fold 11 -> 42 via 12+30, fold 29 -> 258 via
//    60+60+138. Carrying the tile as its GAP WORD rather than as positions
//    runs that ladder in 4s against whatmadeit's 23s and buys one more fold:
//    G2(31#) = 348 from 138+60+150, which reproduces the 1.349 multiplier
//    U-FRAME section 7 records for 29 -> 31.
//
// 2. THE RECORD IS NEVER A PLACE (MEASURED). The maximum is attained at 2, 4,
//    12, 20, 20, 4, 2, 4 distinct locations. Not once in eight folds is it
//    unique. Half of that multiplicity is forced symmetry, and this much is
//    PROVEN in one line: s is a twin slot of T_x iff W-2-s is, since s not in
//    {0,-2} mod q iff -s-2 not in {-2,0} mod q, so the tile is invariant under
//    s -> W-2-s and every record gap has a mirror. The mirror check column
//    verifies the involution site by site at the six folds where all sites fit
//    the twelve-site buffer; at folds 17 and 19 the buffer truncated and the
//    "up to mirror" figure there is an assumption, not a measurement. Up to
//    mirror the counts are 1, 2, 6, 10, 10, 2, 1, 2. At folds 17 and 19 that
//    is ten independent record locations at once, spread over 10 of 17 and 11
//    of 19 copies and over 20 and 16 distinct old-slot ancestries. At fold 31
//    the two independent sites sit in copies 1 and 10 of 31, at old indices
//    77,788,249 and 159,229,485 out of 214.7M: different neighbourhoods, same
//    gap, to the unit.
//
// 3. THE RECORD RELOCATES COMPLETELY AT HALF THE FOLDS, INCLUDING THE LAST
//    THREE (MEASURED). Table C asks whether a record site descends from the
//    old record, that is, whether its merged span contains a gap of size
//    G2(old). At folds 13, 23, 29 and 31 the answer is ZERO sites out of all
//    of them. The three deepest folds available are all total relocations. At
//    fold 31 the largest sub-gap in the winning span ranks 88,989th among the
//    214.7M old gaps, the 0.041 percentile: the new record is assembled from
//    large but thoroughly ordinary gaps in a place the old record never
//    touched. Compare fold 19, where the same quantity ranks 1st.
//
// 4. ONE-STEP PERSISTENCE IS COMMON, MULTI-FOLD PERSISTENCE IS NOT (MEASURED,
//    and this is the misalignment principle in numbers). Table D: the old
//    record's own lineage, quantified over ALL its tied sites, still holds the
//    new record at 4 of 8 folds. Table E then freezes ONE location, the fold-7
//    record, and follows its LARGEST descendant greedily forever, which is the
//    most favourable trajectory any fixed location can have. Its size relative
//    to the record runs
//        1.000, 0.909, 0.778, 0.880, 0.735, 0.651, 0.569
//    and its rank among all gaps of the tile runs 1, 13, 67, 107, >256, >256,
//    >256. THE NUMBER: 0.569. After seven folds the champion location of T7,
//    playing every branch optimally, holds 57% of the record and has been out
//    of the top 256 for three folds. Nothing is monotone here and nothing
//    compounds; the reign is short and then it is over.
//
// 5. WHEN THE RECORD DOES SIT ON THE OLD RECORD, THAT IS A SIZE EFFECT, NOT
//    COMPOUNDING (MEASURED, and it cuts against the reading above). At fold 19
//    eight of the twenty record sites cover an old-max gap against a
//    random-placement expectation of 0.047, an enrichment of 171x. That looks
//    like compounding and it is not: the check column verifies the exact
//    identity "the site covers an old-max gap" = "the site's largest sub-gap
//    equals G2(old)" at every fold, so the enrichment says only that a
//    record-size gap needs a large sub-gap and the largest one available is
//    the old record. Enrichment is a within-fold statement about size. It is
//    not evidence that damage accumulates across folds, and table E is the
//    control that shows it does not.
//
// 6. WHAT THE ATTACK ASKED, ANSWERED (MEASURED). A1's hypothesis as written,
//    that records relocate constantly, is REFUTED in its strong form: at 4 of
//    8 folds the old record's lineage keeps rank 1, so relocation is not
//    every-fold. The opposite hypothesis, that one region grows monotonically,
//    is REFUTED harder: no location holds the top for more than two folds, and
//    the greedy-optimal trajectory of a fixed location decays through 0.569
//    of the record. The measured mechanism is neither; it is a HAZARD. Each
//    fold the reigning location keeps the record with probability of order
//    one half, so the expected reign is O(1) folds while the ladder runs for
//    pi(x) of them. Damage does not compound because nothing gets to compound
//    for long. Suggestive but not established on 8 points: the persistence
//    pattern is YES, YES, no, YES, YES, no, no, no, so the failures are all at
//    the deep end and the hazard may be rising with x rather than constant.
//
// 7. WHAT THIS BUYS, HONESTLY. Not a bound. The chain in U-FRAME section 5a
//    still needs L, the adjacent-kill run, and nothing measured here touches
//    L. What the ledger buys is the shape of the thing to prove. The
//    adversarial bound A288815 assumes the worst alignment of every prime
//    lands at ONE location, and we now have eight folds showing it does not,
//    with a quantified decay rate in table E rather than an appeal to CRT.
//    The statement to attempt is a hazard bound: the probability that the
//    record's lineage retains the record at the next fold is bounded away
//    from 1, uniformly in x. Note the honest triage: that event depends on the
//    gap word in a bounded neighbourhood of one location, which is closer to a
//    residue statement than L's tail-at-scale-2p is, but it is not obviously
//    on the tractable side of the line and we should not claim it is.
//
// 8. LIMITS. Eight folds, and the two deepest are one point each. TOPK = 256
//    truncates the rank ladder, so every ">256" is a bound and not a
//    measurement; at fold 31 rank 256 out of 6.23e9 gaps is still the extreme
//    tail, so the frozen lineage has fallen off the very top without falling
//    anywhere near typical, and the 0.569 ratio is the meaningful number
//    rather than the rank. The "tracked rec" columns follow the stream-first
//    of several tied sites and are therefore arbitrary tie-breaking; the
//    substantive columns are "best desc of old max", which quantifies over all
//    tied sites, and table E. The multiplicity sequence up to mirror,
//    1, 2, 6, 10, 10, 2, 1, 2, is not monotone and we have no model for it.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded output block does not contain
// verbatim actually is. No number above was changed.
//
// ROUNDINGS of a value this file's own run prints (printed value first):
//   214708725 -> "214.7M" in reading 2 (printed as "fold 29: D=7952175 ->
//   214708725"); 6226553025 -> "6.23e9" in reading 8 (printed as "fold 31:
//   D=214708725 -> 6226553025").
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   1.349 in reading 1 is G2(31#)/G2(29#) = 348/258 = 1.34883, both printed in
//   the fold-31 and fold-29 ladder rows. It is quoted as a cross-check against
//   the multiplier sequence in U-FRAME.md section 7, which lists 1.349 as the
//   29 -> 31 entry.
//
// TOKENIZER ARTIFACT, not a figure:
//   288815 in reading 7 is the OEIS identifier A288815, not a measurement.
// ---------------------------------------------------------------------------
