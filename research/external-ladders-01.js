// ============================================================================
// THE ONE-CLASS AND ADVERSARIAL LADDERS ADOPTED AS TRUSTED DATA —
// h (A048670) AND h2 (A288815) AGAINST THE FULL G2 LADDER
//
// Question: with G2 trusted to x = 79 (research/a144311-full-ladder.js), what
// do the trusted one-class ladder h = A048670 and the trusted adversarial
// ladder h2 = A288815 settle in G2-STATE §5's three pointwise relations —
// in particular, does the G2/h ratio's "peaks at x = 37 and then falls twice,
// no trend established" reading survive eight more terms?
//
// Provenance (series rule, 2026-08-20; entries read at OEIS 2026-08-20):
//   A048670  h(p_n#), one omitted class per prime. b-file carries 64 terms
//            (p_64 = 311); the corpus already uses 58 in its control fits;
//            terms 59-64 = 978..1110 are queued for the refit (audit M1;
//            tail single-witness — see external-data-audit.md). The 22-term
//            prefix used here overlaps the corpus's own embedded H arrays
//            (attack-0c0e-02, attack-L-law) and is guarded below.
//   A288815  Ziller-Morack h2(p_n#), adversarial two-class, 21 published
//            terms (p_21 = 73), arXiv:1706.00317. Same n-th-prime indexing.
//   A144311+1 = G2, adopted 2026-08-20, guards in a144311-full-ladder.js.
//
// Honest doubt: all three tails are third-party; the value of this artifact
// is that the three series were computed INDEPENDENTLY of one another, so
// the two elementary inequalities (G2 >= h, h2 >= G2) double as a free
// cross-series custody guard: a corrupted term in any series would show as
// an inequality violation. Runtime: instant.
// ============================================================================
'use strict';

const P  = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59,
            61, 67, 71, 73, 79];
// G2 = A144311 + 1 (trusted, research/a144311-full-ladder.js):
const G2 = [2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348, 528, 546, 618,
            708, 870, 966, 1080, 1284, 1398, 1530, 1710];
// h = A048670, b-file terms 1..22:
const H  = [2, 4, 6, 10, 14, 22, 26, 34, 40, 46, 58, 66, 74, 90, 100, 106,
            118, 132, 152, 174, 190, 200];
// h2 = A288815, all 21 published terms:
const H2 = [2, 6, 18, 30, 66, 150, 192, 258, 366, 450, 570, 708, 894, 1044,
            1284, 1422, 1656, 1902, 2190, 2460, 2622];

// --- guards ------------------------------------------------------------------
// The corpus's own embedded 22-term h prefix (attack-0c0e-02-level-selection.js
// line 82); a mismatch means a transcription slip on one side or the other.
const H_CORPUS = [2, 4, 6, 10, 14, 22, 26, 34, 40, 46, 58, 66, 74, 90, 100,
                  106, 118, 132, 152, 174, 190, 200];
if (H.join() !== H_CORPUS.join()) throw new Error('A048670 prefix mismatch vs corpus');
if (G2.length !== 22 || H.length !== 22 || H2.length !== 21) throw new Error('term counts');

// --- the three pointwise relations ------------------------------------------
let g2geH = 0, h2geG2 = 0, h2geH = 0;
const ratios = [], ratios2 = [];
for (let i = 0; i < 22; i++) {
  if (G2[i] >= H[i]) g2geH++;
  ratios.push(G2[i] / H[i]);
}
for (let i = 0; i < 21; i++) {
  if (H2[i] >= G2[i]) h2geG2++;
  if (H2[i] >= H[i]) h2geH++;
  ratios2.push(H2[i] / G2[i]);
}

console.log('THE THREE POINTWISE RELATIONS ON THE FULL TRUSTED LADDERS');
console.log(`G2 >= h  : ${g2geH}/22   h2 >= G2 : ${h2geG2}/21   h2 >= h : ${h2geH}/21`);
console.log('');
console.log('  x    G2     h   G2/h     h2   h2/G2');
for (let i = 0; i < 22; i++) {
  console.log(String(P[i]).padStart(3) + '  ' + String(G2[i]).padStart(4) + '  ' +
    String(H[i]).padStart(4) + '  ' + ratios[i].toFixed(2).padStart(5) + '  ' +
    (i < 21 ? String(H2[i]).padStart(5) + '  ' + ratios2[i].toFixed(3).padStart(6) : '   --      --'));
}
console.log('');
const r37 = ratios[11];
const above37 = P.slice(12).filter((x, k) => ratios[12 + k] > r37);
console.log(`G2/h at x = 37: ${r37.toFixed(2)}  (the old 14-term peak)`);
console.log(`terms x >= 41 with G2/h above it: ${above37.length > 0 ? above37.join(', ') : 'none'}`);
const rmax = Math.max(...ratios);
console.log(`G2/h max over 22 terms: ${rmax.toFixed(2)} at x = ${P[ratios.indexOf(rmax)]}`);
console.log(`G2/h tail x = 47..79: ${ratios.slice(14).map(r => r.toFixed(2)).join(' ')}`);
const r2min = Math.min(...ratios2.slice(14)), r2max = Math.max(...ratios2.slice(14));
console.log(`h2/G2 at the seven new levels x = 47..73: [${r2min.toFixed(2)}, ${r2max.toFixed(2)}]`);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/external-ladders-01.js
//   invocation:  node research/external-ladders-01.js
//   code-sha256: 7041344373155e01656d4b6c9f0483ea0f5c0f147cd12911f4d817be5e276174
//   out-sha256:  9bcfd84d6406d260283f545484be9c4e6f53ba044467c3f07ae6cc813537a648
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     0.1 s
// ============================================================================
// THE THREE POINTWISE RELATIONS ON THE FULL TRUSTED LADDERS
// G2 >= h  : 22/22   h2 >= G2 : 21/21   h2 >= h : 21/21
//
//   x    G2     h   G2/h     h2   h2/G2
//   2     2     2   1.00      2   1.000
//   3     6     4   1.50      6   1.000
//   5    12     6   2.00     18   1.500
//   7    30    10   3.00     30   1.000
//  11    42    14   3.00     66   1.571
//  13    66    22   3.00    150   2.273
//  17   108    26   4.15    192   1.778
//  19   150    34   4.41    258   1.720
//  23   204    40   5.10    366   1.794
//  29   258    46   5.61    450   1.744
//  31   348    58   6.00    570   1.638
//  37   528    66   8.00    708   1.341
//  41   546    74   7.38    894   1.637
//  43   618    90   6.87   1044   1.689
//  47   708   100   7.08   1284   1.814
//  53   870   106   8.21   1422   1.634
//  59   966   118   8.19   1656   1.714
//  61  1080   132   8.18   1902   1.761
//  67  1284   152   8.45   2190   1.706
//  71  1398   174   8.03   2460   1.760
//  73  1530   190   8.05   2622   1.714
//  79  1710   200   8.55     --      --
//
// G2/h at x = 37: 8.00  (the old 14-term peak)
// terms x >= 41 with G2/h above it: 53, 59, 61, 67, 71, 73, 79
// G2/h max over 22 terms: 8.55 at x = 79
// G2/h tail x = 47..79: 7.08 8.21 8.19 8.18 8.45 8.03 8.05 8.55
// h2/G2 at the seven new levels x = 47..73: [1.63, 1.81]
// ============================================================================
// READINGS
//
// 1. ALL THREE POINTWISE RELATIONS HOLD ON THE FULL TRUSTED LADDERS: G2 >= h
//    at 22/22, h2 >= G2 at 21/21, h2 >= h at 21/21. The three series were
//    computed independently (Carter/Alekseyev/Wang; Bozek et al.;
//    Ziller-Morack), so the two inequalities double as a free cross-series
//    custody guard: a corrupted term anywhere would surface as a violation.
// 2. THE "PEAKS AT x = 37 AND THEN FALLS, NO TREND ESTABLISHED" READING ON
//    G2/h IS RETIRED — it was an artifact of the data ending at 43. SEVEN of
//    the eight trusted terms x >= 53 sit ABOVE the old 8.00 peak; the fall at
//    41/43 (7.38, 6.87) was a local dip, the maximum moves to the last term
//    (8.55 at x = 79), and the tail reads as a slow upward drift. The
//    one-class and two-class maximal gaps are separating, slowly.
// 3. h2/G2 STAYS IN A BAND: [1.63, 1.81] at the seven new levels, against
//    1.341 to 2.273 over the custody range. The x = 37 term is the band's low
//    outlier at 1.341 — the SAME level that spikes G2/h and c2' — three
//    instruments now point at x = 37 as a G2-side anomaly, not a ratio
//    artifact.
// 4. LIMITS. A048670's b-file runs to 64 terms; only the 22-term prefix is
//    consumed here (the 58-vs-64 control-fit refresh is audit item M1, queued
//    with an overlap guard). h2 ends at x = 73, so the 79 row has no h2
//    column. No fits performed; readings are ratios of trusted integers.
// ============================================================================
