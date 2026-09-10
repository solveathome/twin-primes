// What actually produces the new maximum gap at each fold?
// A LONE kill sitting between two already-large gaps, or a RUN of adjacent kills?
// Stream the folded tile in position order, track the stretch between consecutive
// survivors, and record how many kills and which sub-gaps made the winning stretch.
'use strict';
let P = 30, slots = [11, 17, 29];
const FOLDS = [7, 11, 13, 17, 19, 23, 29];

console.log('  fold |  new G2 | kills that made it | merged sub-gaps                    | old G2 | biggest sub-gap / old G2');
for (const p of FOLDS) {
  const D = slots.length, W = P;
  let oldMax = 0;
  for (let i = 0; i < D; i++) { const g = (i + 1 < D ? slots[i + 1] : slots[0] + W) - slots[i]; if (g > oldMax) oldMax = g; }

  // stream folded tile, find max survivor-to-survivor gap and what filled it
  let lastSurv = -1, firstSurv = -1, kills = 0, subs = [], prevPos = -1;
  let best = { gap: -1, kills: 0, subs: [] };
  const push = (pos) => {
    if (prevPos >= 0) subs.push(pos - prevPos);
    prevPos = pos;
  };
  const LAST = (p === FOLDS[FOLDS.length-1]);
  let nCount = 0;
  const newSlots = LAST ? null : new Float64Array(D * (p - 2));
  for (let k = 0; k < p; k++) for (let i = 0; i < D; i++) {
    const pos = slots[i] + k * W;
    const killed = (pos % p === 0 || (pos + 2) % p === 0);
    push(pos);
    if (!killed) {
      if (newSlots) newSlots[nCount] = pos;
      nCount++;
      if (lastSurv >= 0) {
        const gap = pos - lastSurv;
        if (gap > best.gap) best = { gap, kills, subs: subs.slice() };
      } else firstSurv = pos;
      lastSurv = pos; kills = 0; subs = []; prevPos = pos;
    } else kills++;
  }
  // cyclic wrap
  { const gap = firstSurv + p * W - lastSurv; if (gap > best.gap) best = { gap, kills, subs: subs.slice() }; }

  const shown = best.subs.length <= 6 ? best.subs.join('+') : best.subs.slice(0, 5).join('+') + '+...';
  const bigsub = Math.max(...best.subs);
  console.log(`  ${String(p).padStart(4)} | ${String(best.gap).padStart(7)} | ${String(best.kills).padStart(19)} | ${shown.padEnd(34)} | ${String(oldMax).padStart(6)} | ${(bigsub / oldMax).toFixed(3)}`);

  P *= p; if (newSlots) slots = newSlots;
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/whatmadeit.js
//   invocation:  node research/whatmadeit.js
//   code-sha256: 3f5b774570d7d25199a7d89774fe9a3d8112b807ed2d36c27ea4c4d47cdab38e
//   out-sha256:  dd98d0bc3ccc55ff1ff6cb11781ecc1dfa30bb2dc15f859b58dca178c50d42a4
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     24.2 s
// ============================================================================
//   fold |  new G2 | kills that made it | merged sub-gaps                    | old G2 | biggest sub-gap / old G2
//      7 |      30 |                   2 | 6+12+12                            |     12 | 1.000
//     11 |      42 |                   1 | 12+30                              |     30 | 1.000
//     13 |      66 |                   1 | 36+30                              |     42 | 0.857
//     17 |     108 |                   2 | 30+66+12                           |     66 | 1.000
//     19 |     150 |                   1 | 42+108                             |    108 | 1.000
//     23 |     204 |                   3 | 24+48+90+42                        |    150 | 0.600
//     29 |     258 |                   2 | 60+60+138                          |    204 | 0.676
// READINGS.
// 1. THE ANSWER TO THE QUESTION IN LINE 2: BOTH, AND NEITHER DOMINATES. The
//    winning stretch is made by 1, 2 or 3 adjacent kills across seven folds,
//    and the count is not monotone in the fold. A lone kill between two large
//    gaps does it at folds 11, 13 and 19; two kills at 7, 17 and 29; three at
//    23. So the record is not a single-kill phenomenon and it is not a long-run
//    phenomenon either.
// 2. THE KILLS COLUMN NEVER EXCEEDS 3, AND THAT IS THE POINT FOR U-FRAME. The
//    longest adjacent-kill run L available at these folds runs 2, 1, 2, 2, 2,
//    3, 2 (research/a3-08-adjacent-pairs.js), so the record gap never spends
//    the whole run even where a longer one exists. Bounding L bounds something
//    strictly larger than what the record actually uses.
// 3. THE BIGGEST SUB-GAP IS THE OLD RECORD AT FOUR FOLDS OF SEVEN, AND THEN
//    STOPS BEING IT. The ratio column reads 1.000 at folds 7, 11, 17 and 19
//    and 0.857, 0.600, 0.676 at 13, 23 and 29, so the record stops descending
//    from the previous record at the deep end. research/a3-01-misalignment-
//    ledger.js quantifies that over all tied sites and adds fold 31, where the
//    ratio is 0.581.
// 4. CUSTODY, BOTH WAYS. This table is what a3-01 reproduces "column for
//    column" in its table A, verified on 2026-08-17 by running both: a3-01
//    carries the tile as its gap word and does the same seven folds in 4 s
//    against the 23.4 s here, which is what buys it the eighth fold,
//    G2(31#) = 348 from 138+60+150.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded run of this file does not
// contain verbatim actually is. No number above was changed.
//
// BORROWED, verified present in the named producer's embedded output: the
// fold-31 ratio 0.581 and G2(31#) = 348 from 138+60+150 both come from
// research/a3-01-misalignment-ledger.js, whose ledger row reads
// "31 | 348 | 2 | 138+60+150 | 258 | 0.581". This file stops at fold 29, which
// is exactly the point reading 4 makes.
// ---------------------------------------------------------------------------
