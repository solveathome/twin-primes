// ============================================================================
// ATTACK 6 — DIFFERENCE HIERARCHY: is difference 2 the hardest pair?
// ============================================================================
// For even difference d, the d-pair slots mod P_n# avoid {0, -d mod p} per odd
// prime p. If p | d the two classes COINCIDE — one forbidden class only — so
// the pattern is RICHER: density gains a factor (p-1)/(p-2) per p | d.
// (This is the Hardy–Littlewood constant hierarchy: d=6 pairs are ~2x denser
// than twins.) Ziller–Morack's h2 takes the worst case over ALL two-class
// choices; our G2 is d=2 specifically. Questions:
//   * How does G_d (max gap for difference d) vary across d = 2..30?
//   * Is d=2 the hardest fixed difference? Which d attains the worst gap?
//   * How much headroom between max_d G_d and Ziller–Morack's h2?
// ============================================================================

const PR = [2,3,5,7,11,13,17,19];
function level(upto){
  const idx = PR.indexOf(upto);
  let P = 1; for (let i = 0; i <= idx; i++) P *= PR[i];
  const out = [];
  for (let d = 2; d <= 30; d += 2){
    const bad = new Uint8Array(P);
    for (let i = 0; i <= idx; i++){
      const p = PR[i];
      for (let j = 0; j < P; j += p) bad[j] = 1;
      const r2 = ((p - (d % p)) % p + p) % p;      // class -d mod p (may equal 0)
      for (let j = r2; j < P; j += p) bad[j] = 1;
    }
    let first=-1, prev=-1, maxGap=0, count=0;
    for (let r = 0; r < P; r++) if (!bad[r]) {
      count++;
      if (first<0) first=r; else maxGap = Math.max(maxGap, r-prev);
      prev = r;
    }
    maxGap = Math.max(maxGap, first + P - prev);
    out.push({d, count, maxGap});
  }
  console.log(`p=${upto}  P#=${P}`);
  console.log('  d:      ' + out.map(o=>String(o.d).padStart(6)).join(''));
  console.log('  slots:  ' + out.map(o=>String(o.count).padStart(6)).join(''));
  console.log('  G_d:    ' + out.map(o=>String(o.maxGap).padStart(6)).join(''));
  const worst = out.reduce((a,b)=>b.maxGap>a.maxGap?b:a);
  console.log(`  hardest difference: d=${worst.d} with G_d=${worst.maxGap}  (G_2=${out[0].maxGap})`);
}
for (const p of [13, 17, 19]) level(p);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-06-difference-hierarchy.js
//   invocation:  node research/attack-06-difference-hierarchy.js
//   code-sha256: ac73e74bf086e82de17ce0e76e39588bde329fdf0861a4384fa0f3367c1b5363
//   out-sha256:  b33c06bbde1a7346b75c9fa5453aedba5760ff24fb126af41b8e324ed297854f
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     0.6 s
// ============================================================================
// p=13  P#=30030
//   d:           2     4     6     8    10    12    14    16    18    20    22    24    26    28    30
//   slots:    1485  1485  2970  1485  1980  2970  1782  1485  2970  1980  1650  2970  1620  1782  3960
//   G_d:        66    84    56    78    60    66    60    78    50    60    60    58    60    60    34
//   hardest difference: d=4 with G_d=84  (G_2=66)
// p=17  P#=510510
//   d:           2     4     6     8    10    12    14    16    18    20    22    24    26    28    30
//   slots:   22275 22275 44550 22275 29700 44550 26730 22275 44550 29700 24750 44550 24300 26730 59400
//   G_d:       108    96    78   114    78    72    90    96    66    84   102    66   108    90    54
//   hardest difference: d=8 with G_d=114  (G_2=108)
// p=19  P#=9699690
//   d:           2     4     6     8    10    12    14    16    18    20    22    24    26    28    30
//   slots:  3786753786757573503786755049007573504544103786757573505049004207507573504131004544101009800
//   G_d:       150   150   114   198   132    98   150   198   110   120   150    96   144   126    78
//   hardest difference: d=8 with G_d=198  (G_2=150)
// READINGS.
// 1. SLOT COUNTS follow the Hardy–Littlewood hierarchy exactly: d with more
//    odd prime factors is denser ((p-1)/(p-2) per p | d): d=6 twice d=2,
//    d=30 is 8/3 of d=2. Verified at three levels.
// 2. SURPRISE: G_d does NOT follow density alone. Among the EQUAL-density
//    differences {2,4,8,16} (no odd factors), the worst gaps split: at p=19,
//    G_8 = G_16 = 198 vs G_2 = G_4 = 150. Same number of slots, 30% worse
//    worst-gap for d=8,16. The arithmetic of the offset -d mod p (not just
//    how many classes it kills) shapes the extremal structure. NEW OBJECT:
//    the map d -> G_d and its dependence on d's residue structure. Unstudied
//    as far as our audit found.
// 3. Difference 2 is NOT the hardest difference — mildly good news for TPC's
//    specific case, and headroom vs Ziller–Morack confirmed: max_d<=30 G_d =
//    198 at p=19 vs their all-class h2 = 258 (A288815).
// 4. d=30 (the densest) has the smallest gaps (34/54/78) — density does set
//    the overall scale; the surprise in (2) is the fine structure on top.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded run of this file does not
// contain verbatim actually is. No number above was changed.
//
// TOKENIZER ARTIFACTS, none of them a measurement:
//   2,4,8,16 and 8,16 in reading 2 are sets of difference values d, each one a
//   printed column header of the three tables above.
//   288815 in reading 3 is the OEIS identifier A288815.
//
// LITERATURE constant:
//   258 in reading 3 is Ziller-Morack's all-class h2, quoted for comparison
//   against this run's max_d G_d = 198 at p=19. Nothing here computes it. It
//   coincides numerically with G2(29#) elsewhere in the corpus; the two are
//   different objects and the reading means the published h2.
// ---------------------------------------------------------------------------
