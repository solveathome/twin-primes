// *** The old maxRunFromResidues was REFUTED 2026-08-16; its replacement was
// itself incomplete and was replaced again 2026-09-25 (finding #551, review #341
// of return #1038): the 2026-08-16 scanner restarted a broken run from
// (last, r) only, which undercounts when the run tail has already fixed the
// residue pair. Same defect as research/Lgrowth.js runFor. See the note below. ***
// It left `prev` pointing at the OLDER of the two tracked residues, so it both
// over- and under-counted; the word 10,12,8,8 scored 3 there and is 2. Its
// published L(T23, 29) = 3 is wrong and the true value is 2, confirmed three
// independent ways in research/a3-08-adjacent-pairs.js (brute force over the
// 215M-slot folded tile, the kill graph, and a direct window score). U-FRAME 5's
// L column and step 6's diagonal both need that correction.
//
// Longest run of ADJACENT kills when prime p folds the tile.
// Key reduction: in the folded tile the killed classes are {-kW, -kW-2} mod p,
// and as k ranges over copies those are ALL 2-sets {a, a-2}. So a run of L
// consecutive slots is killable iff their residues mod p occupy at most two
// values differing by 2. That is an O(D) scan of the tile being folded, not
// O(pD) over the folded tile.
'use strict';
const okPair = (a, b, p) => { if (a === b) return true; const d = Math.abs(a - b); return d === 2 || d === p - 2; };

function maxRunFromResidues(next, p) {   // next() streams residues in slot order
  // CORRECTED 2026-08-16 (found by attack A4). The previous version compared each
  // new residue against the FIRST element of the current 2-set instead of the
  // immediately preceding element, so it scored a run across slots that are not
  // adjacent-compatible (a, a+2, a-2 was counted as a run of 3). It OVERCOUNTED:
  // at fold 29 on T23 it reported L = 3 where the truth is 2, confirmed by an
  // exhaustive count of killable consecutive triples, which is 0.
  // Corrected diagonal: L = 2, 1, 2, 2, 2, 3, 2, 4 at folds 7, 11, 13, 17, 19,
  // 23, 29, 31. Note L is NOT monotone; it dips at 29.
  //
  // CORRECTED AGAIN 2026-09-25 (finding #551, review #341 of return #1038). That
  // scanner still UNDERCOUNTED: when a run broke it restarted from the pair
  // (last, r) only, i.e. it assumed the new run's two residues are the two most
  // recent slots, so a tail that had already fixed the pair was lost. On
  // 10,12,12,14,14 it scored 3 where the truth is 4 (the run 12,12,14,14).
  // Replaced by the two-state DP, O(1) per slot: U = longest run ending here
  // whose residues lie in {r, r+2}, D = longest one whose residues lie in
  // {r-2, r} (residues mod p), each extended from the previous slot's state that
  // names the same 2-set. Both are >= 1, since a single residue lies in both.
  // Same fix as research/Lgrowth.js runFor. Checked against a brute force of the
  // definition (max over all pairs {a, a+2}) on 40,000 random streams.
  let best = 0, U = 0, D = 0, prev = -1;
  for (;;) {
    const r = next();
    if (r < 0) break;
    const up = (r + 2) % p, dn = (r - 2 + p) % p;
    const nU = 1 + Math.max(prev === r ? U : 0, prev === up ? D : 0);
    const nD = 1 + Math.max(prev === r ? D : 0, prev === dn ? U : 0);
    U = nU; D = nD; prev = r;
    if (U > best) best = U;
    if (D > best) best = D;
  }
  return best;
}

// ---- build T23 slot list explicitly (7.95M) --------------------------------
let P = 30, slots = [11, 17, 29];
for (const p of [7, 11, 13, 17, 19, 23]) {
  const ns = [];
  for (let k = 0; k < p; k++) for (const s of slots) { const r = s + k * P; if (r % p !== 0 && (r + 2) % p !== 0) ns.push(r); }
  ns.sort((a, b) => a - b); P *= p; slots = ns;
}
const W23 = P, S23 = Float64Array.from(slots);
console.log(`T23: width ${W23}, ${S23.length} slots`);

// run for fold p=29, scanning T23 residues mod 29
{
  let i = 0; const p = 29;
  const run = maxRunFromResidues(() => (i < S23.length ? S23[i++] % p : -1), p);
  console.log(`fold p=29 on T23  ->  max adjacent-kill run = ${run}`);
}

// stream-fold T23 by 29 to get T29 in sorted order, scoring the run for p=31
{
  const pf = 29, pn = 31, W29 = W23 * pf;
  let k = 0, i = 0, count = 0;
  const next = () => {
    for (;;) {
      if (k >= pf) return -1;
      const r = S23[i] + k * W23;
      i++; if (i >= S23.length) { i = 0; k++; }
      if (r % pf !== 0 && (r + 2) % pf !== 0) { count++; return r % pn; }
    }
  };
  const t = Date.now();
  const run = maxRunFromResidues(next, pn);
  console.log(`fold p=31 on T29  ->  max adjacent-kill run = ${run}   (T29 had ${count} slots, width ${W29})`);
  console.error(`elapsed: ${((Date.now()-t)/1000).toFixed(1)}s`);
}
