// derive-0904-L7-transfer.js — THE UNION-BOUND BUDGET OF THE ONE-CLASS TO
// TWO-CLASS TRANSFER (legal target L7), CHECKED BY ENUMERATION AT x = 7, 11, 13
// ---------------------------------------------------------------------------
// QUESTION. derive-0904-L7-transfer.md section 2 claims, by CRT, that among the
// holes of the tile T_x (residues coprime to W = x#) exactly phi(W)/(p - 1) sit
// in the class -2 mod p for each odd prime p <= x, so the union bound's budget
// for "hole h with h + 2 not a hole" is B(x) = sum_{3 <= p <= x} 1/(p - 1) of
// the holes, and B passes 1 at x = 11. This script enumerates the period and
// checks both the per-prime counts and the sum. It also prints the EXACT
// fraction of holes that are not twin slots, which the union bound is trying
// to bound, so the reader sees the bound against its target.
// Calibration: VERIFIED (exact enumeration) at these three levels only.
'use strict';
const levels = [7, 11, 13];
const primesTo = n => { const s = []; for (let i = 2; i <= n; i++) { if (s.every(p => i % p)) s.push(i); } return s; };
for (const x of levels) {
  const P = primesTo(x); const W = P.reduce((a, b) => a * b, 1);
  const hole = new Uint8Array(W);
  let holes = 0; for (let r = 0; r < W; r++) { if (P.every(p => r % p)) { hole[r] = 1; holes++; } }
  let notTwin = 0; for (let r = 0; r < W; r++) if (hole[r] && !hole[(r + 2) % W]) notTwin++;
  let B = 0; const rows = [];
  for (const p of P) { if (p === 2) continue;
    let c = 0; for (let r = 0; r < W; r++) if (hole[r] && (r + 2) % p === 0) c++;
    const crt = holes / (p - 1); B += 1 / (p - 1);
    rows.push(`p=${p}: count ${c}, phi(W)/(p-1) = ${crt}, ${c === crt ? 'EQUAL' : 'MISMATCH'}`); }
  console.log(`x = ${x}, W = ${W}, holes = ${holes}, holes that are not twin slots = ${notTwin} (${(notTwin / holes).toFixed(4)} of holes)`);
  for (const r of rows) console.log('  ' + r);
  console.log(`  union-bound budget B(${x}) = ${B.toFixed(4)} of holes; ${B > 1 ? 'VACUOUS (B > 1)' : 'non-vacuous (B <= 1)'}`);
}
// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/history/staging/derive-0904-L7-transfer.js
//   invocation:  node research/history/staging/derive-0904-L7-transfer.js
//   code-sha256: e4b0995e01c18756f037b477f886d37be927e7f90d676c03cd148bab48e8a90e
//   out-sha256:  7b850a9b299c49404736626e42b322f3b5aa269e680b74f8cb7549924ebdc85c
//   body-lines:  18
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-09-04
//   elapsed:     0.1 s
// ============================================================================
// x = 7, W = 210, holes = 48, holes that are not twin slots = 33 (0.6875 of holes)
//   p=3: count 24, phi(W)/(p-1) = 24, EQUAL
//   p=5: count 12, phi(W)/(p-1) = 12, EQUAL
//   p=7: count 8, phi(W)/(p-1) = 8, EQUAL
//   union-bound budget B(7) = 0.9167 of holes; non-vacuous (B <= 1)
// x = 11, W = 2310, holes = 480, holes that are not twin slots = 345 (0.7188 of holes)
//   p=3: count 240, phi(W)/(p-1) = 240, EQUAL
//   p=5: count 120, phi(W)/(p-1) = 120, EQUAL
//   p=7: count 80, phi(W)/(p-1) = 80, EQUAL
//   p=11: count 48, phi(W)/(p-1) = 48, EQUAL
//   union-bound budget B(11) = 1.0167 of holes; VACUOUS (B > 1)
// x = 13, W = 30030, holes = 5760, holes that are not twin slots = 4275 (0.7422 of holes)
//   p=3: count 2880, phi(W)/(p-1) = 2880, EQUAL
//   p=5: count 1440, phi(W)/(p-1) = 1440, EQUAL
//   p=7: count 960, phi(W)/(p-1) = 960, EQUAL
//   p=11: count 576, phi(W)/(p-1) = 576, EQUAL
//   p=13: count 480, phi(W)/(p-1) = 480, EQUAL
//   union-bound budget B(13) = 1.1000 of holes; VACUOUS (B > 1)
// ============================================================================
// READINGS
// 1. Per-prime counts of holes in class -2 mod p equal phi(W)/(p-1) at every
//    odd p at x = 7, 11, 13 (VERIFIED by enumeration): the CRT count stands.
// 2. The union-bound budget B(x) reads 0.9167, 1.0167, 1.1000: it passes 1
//    at x = 11, as the note's section 2 says.
// 3. The exact fraction of holes that are not twin slots is printed beside
//    it; the bound exceeds its target from x = 11 on, which is what vacuous
//    means here.
