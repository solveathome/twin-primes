// ============================================================================
// LADDER VERIFICATION — census of every tile, split into Chris's two columns:
//   "new" = the fold's seam pairs (edge-lineage children, predicted p-2)
//   "survived" = copies of all previous slots (predicted (p-2)*(D_prev - 1))
// Direct counts: T5..T23 materialized here; T29/T31/T37 by segmented scan
// (see verify-ladder-big.js). New-seam counts verified by direct testing of
// the p seam candidates k*P_prev +- 1 at EVERY level (instant, BigInt gcd).
// ============================================================================

const PRIMES = [2,3,5,7,11,13,17,19,23,29,31,37];

// --- Part 1: full materialization T5..T23 ---
console.log('tile | width | census D (counted) | predicted prod(p-2) | new seams (counted) | survived (D - new)');
let P = 6, Dprev = 1;
for (const p of [5,7,11,13,17,19,23]) {
  const Pn = P * p;
  const ps = PRIMES.filter(q => q <= p);
  const bad = new Uint8Array(Pn);
  for (const q of ps) {
    for (let j = 0; j < Pn; j += q) bad[j] = 1;
    for (let j = ((q-2)%q+q)%q; j < Pn; j += q) bad[j] = 1;
  }
  let D = 0, edge = 0;
  for (let r = 0; r < Pn; r++) if (!bad[r]) { D++; if (r % P === P - 1) edge++; }
  const pred = Dprev * (p - 2);
  console.log(`T${p} | ${Pn} | ${D} | ${pred} ${D===pred?'✓':'✗ MISMATCH'} | ${edge} (predicted ${p-2}) ${edge===p-2?'✓':'✗'} | ${D-edge} (predicted ${(p-2)*(Dprev-1)}) ${D-edge===(p-2)*(Dprev-1)?'✓':'✗'}`);
  P = Pn; Dprev = D;
}

// --- Part 2: instant seam verification at ALL levels including 29..37 ---
console.log('\nseam ("new") check by direct gcd on the p candidates k*P_prev±1:');
function gcd(a,b){while(b){[a,b]=[b,a%b]}return a}
let PP = 1n;
for (let i = 0; i < PRIMES.length - 1; i++) {
  PP *= BigInt(PRIMES[i]);
  const p = PRIMES[i+1];
  const Pn = PP * BigInt(p);
  let edge = 0;
  for (let k = 1n; k <= BigInt(p); k++) {
    const a = (k*PP - 1n) % Pn, b = (k*PP + 1n) % Pn;
    // pair survives iff gcd(a, Pn) = 1 and gcd(a+2, Pn) = 1
    const g1 = (x,y)=>{while(y){[x,y]=[y,x%y]}return x};
    if (g1(a, Pn) === 1n && g1((a+2n)%Pn, Pn) === 1n) edge++;
  }
  console.log(`fold by ${String(p).padStart(2)}: seam survivors = ${edge}  (Seam Lemma: ${p-2}) ${edge===p-2?'✓':'✗'}`);
}

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/verify-ladder.js
//   invocation:  node research/verify-ladder.js
//   code-sha256: c37a11f5acff66103009fd5c326dec808f9cfc9a70d19a12b4582e39159482a2
//   out-sha256:  4d228002cc7654de52967e601aa943411df7fb67d10b97e515f667efee72ae1c
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     0.9 s
// ============================================================================
// tile | width | census D (counted) | predicted prod(p-2) | new seams (counted) | survived (D - new)
// T5 | 30 | 3 | 3 ✓ | 3 (predicted 3) ✓ | 0 (predicted 0) ✓
// T7 | 210 | 15 | 15 ✓ | 5 (predicted 5) ✓ | 10 (predicted 10) ✓
// T11 | 2310 | 135 | 135 ✓ | 9 (predicted 9) ✓ | 126 (predicted 126) ✓
// T13 | 30030 | 1485 | 1485 ✓ | 11 (predicted 11) ✓ | 1474 (predicted 1474) ✓
// T17 | 510510 | 22275 | 22275 ✓ | 15 (predicted 15) ✓ | 22260 (predicted 22260) ✓
// T19 | 9699690 | 378675 | 378675 ✓ | 17 (predicted 17) ✓ | 378658 (predicted 378658) ✓
// T23 | 223092870 | 7952175 | 7952175 ✓ | 21 (predicted 21) ✓ | 7952154 (predicted 7952154) ✓
//
// seam ("new") check by direct gcd on the p candidates k*P_prev±1:
// fold by  3: seam survivors = 1  (Seam Lemma: 1) ✓
// fold by  5: seam survivors = 3  (Seam Lemma: 3) ✓
// fold by  7: seam survivors = 5  (Seam Lemma: 5) ✓
// fold by 11: seam survivors = 9  (Seam Lemma: 9) ✓
// fold by 13: seam survivors = 11  (Seam Lemma: 11) ✓
// fold by 17: seam survivors = 15  (Seam Lemma: 15) ✓
// fold by 19: seam survivors = 17  (Seam Lemma: 17) ✓
// fold by 23: seam survivors = 21  (Seam Lemma: 21) ✓
// fold by 29: seam survivors = 27  (Seam Lemma: 27) ✓
// fold by 31: seam survivors = 29  (Seam Lemma: 29) ✓
// fold by 37: seam survivors = 35  (Seam Lemma: 35) ✓
// READINGS.
// 1. THE TWO COLUMNS ARE EXACT AT EVERY LEVEL, 7 of 7. Chris's split of the
//    census into "new" and "survived" is not an approximation: new = p-2 and
//    survived = (p-2)(D_prev - 1) hold to the unit at T5 through T23, and
//    their sum is prod(q-2) each time. That is the Copying Theorem and the
//    Seam Lemma checked together in one table, since 1 + (p-3) = p-2 is what
//    makes the two columns telescope.
// 2. THE SEAM CHECK REACHES THREE LEVELS PAST THE MATERIALISED ONES. Part 2
//    tests only the p candidates k*P_prev +- 1 by BigInt gcd, so it costs
//    nothing and runs to fold 37, where the tile itself has width 7.42e12.
//    All 11 folds give exactly p-2 survivors.
// 3. CUSTODY AGAINST THE SIBLINGS. The census column reproduces
//    research/05-twin-jacobsthal.js's slot counts (3, 15, 135, 1485, 22275,
//    378675, 7952175) and research/grain-census.js's D column, and
//    research/verify-ladder-big.js carries the same ladder on to
//    214,708,725 at T29, 6,226,553,025 at T31 and 217,929,355,875 at T37 by
//    an independent mod-30 lattice scan.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded run of this file does not
// contain verbatim actually is. No number above was changed. This script
// materialises the tile only to T23 and tests the deeper folds by gcd on
// candidates, so every figure below describes the sibling that does build them.
//
// BORROWED, verified present in the named producer's embedded output:
//   214,708,725, 6,226,553,025 and 217,929,355,875 in reading 3 are printed by
//   research/verify-ladder-big.js as "T29: width=6469693230 census=214708725",
//   "T31: width=200560490130 census=6226553025" and "T37:
//   width=7420738134810 census=217929355875", each with its MATCH line. The
//   reading credits that file explicitly.
//   7.42e12 in reading 2 is the T37 tile width, the same 7420738134810 from
//   that file's T37 line, quoted to three figures. This run prints only the
//   fold-37 seam result, "fold by 37: seam survivors = 35 (Seam Lemma: 35)",
//   never the width.
// ---------------------------------------------------------------------------
