// ============================================================================
// FOLD PROFILE 15 — THE VARIANCE DEFICIT: what law does it follow?
// ============================================================================
// 14 settled that the sub-binomial dispersion is real: the synthetic control,
// fake twins drawn binomially at the real smooth rate, disperses at 1.009,
// 0.994, 0.960 (mean of five replicates at widths 8, 80, 800) through the
// identical pipeline while the real data gives 0.962, 0.921, 0.838. The deficit
// is in the arithmetic, not the estimator.
// ⚠ CORRECTED 2026-08-17: this line read "disperses at 0.993-1.014". That range
// came from one unseeded run and no later run reproduced it. 14's generator is
// now seeded, so the figures above are the reproducible ones. Note also that
// the control's own replicate scatter widens with width, running 0.886 to 1.020
// at 800 bins, so the 800-bin comparison is the weakest of the three. The
// widths 8 and 80 carry the finding.
//
// This file asks what law it follows, because the shape names the cause.
//
//   IF the deficit is the classical SHORT-INTERVAL VARIANCE DEFICIT for primes
//   (Montgomery-Soundararajan), then in an interval of length h at height X the
//   variance sits below the Poisson value by a factor
//        Fano  ~  1 - (ln h + c) / ln X
//   so the deficit is LINEAR IN ln h with slope 1/ln X, and at fixed h it should
//   SHRINK from tile to tile like 1/ln W.
//
//   IF instead it is local repulsion between twin primes, the deficit would be
//   flat in h and would not scale with ln W. That would be a new object.
//
// METHOD, and it needs no smoother at all. Take adjacent disjoint windows A and B
// of equal width and form
//        d = t_A/s_A - t_B/s_B,      Var_null(d) = p(1-p)(1/s_A + 1/s_B).
// A smooth trend contributes (2h/(y ln y))^2 to this, which is 0.3% of the noise
// variance at the largest h used, so the statistic is trend-free by construction
// and is its own control. Synthetic replicates confirm the null lands at 1.
//
//   S1  the deficit against ln h, per tile, with the fitted slope
//   S2  the slope against the prediction 1/ln W
//   S3  the deficit at fixed h across tiles, against the prediction 1/ln W
//
// Run:  node --max-old-space-size=7000 fold-profile-15-variance-law.js
// ============================================================================
'use strict';

const t0 = Date.now();
const el = () => ((Date.now() - t0) / 1000).toFixed(1) + 's';
const log = (s) => process.stderr.write('   [' + el() + '] ' + s + '\n');

const TILES = [
  { x: 17, primes: [2, 3, 5, 7, 11, 13, 17] },
  { x: 19, primes: [2, 3, 5, 7, 11, 13, 17, 19] },
  { x: 23, primes: [2, 3, 5, 7, 11, 13, 17, 19, 23] },
];
for (const T of TILES) T.W = T.primes.reduce((a, b) => a * b, 1);
const MAXW = Math.max(...TILES.map((T) => T.W));

log(`sieving to ${(MAXW + 2).toExponential(2)} ...`);
const comp = new Uint8Array(MAXW + 3);
comp[0] = comp[1] = 1;
for (let i = 2; i * i <= MAXW + 2; i++) if (!comp[i]) for (let j = i * i; j <= MAXW + 2; j += i) comp[j] = 1;

console.log('='.repeat(100));
console.log('FOLD PROFILE 15 — the variance deficit: linear in ln h with slope 1/ln W?');
console.log('='.repeat(100));

// SEEDED 2026-08-18. The synthetic control below drew from Math.random(), so its
// whole column was a different number on every run and nothing in it could be
// cited or checked. This is the same defect fold-profile-14 carried and had
// fixed on 2026-08-17 (that file's SEEDED note explains why it matters); the
// instance here and the one in fold-profile-16 were not caught then. Same
// generator and same seed as 14, so the three files draw from one convention.
// BEFORE: `if (rough[r] && rough[r + 2] && Math.random() < MEAN) t++;`
// AFTER:  `if (rough[r] && rough[r + 2] && rnd() < MEAN) t++;`
// Nothing else changed. The REAL columns are untouched and were already
// deterministic; only the SYNTH columns become reproducible.
let RNGSTATE = 20260817;
function rnd() {
  RNGSTATE = (RNGSTATE + 0x6D2B79F5) | 0;
  let t = Math.imul(RNGSTATE ^ (RNGSTATE >>> 15), 1 | RNGSTATE);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

// pair-difference Fano over disjoint window pairs of width h (in integers)
function fanoPairs(CS, CT, W, h, start) {
  const S = (a, b) => CS[b] - CS[a];
  const Tw = (a, b) => CT[b] - CT[a];
  let acc = 0, n = 0, sT = 0, sS = 0;
  for (let a = start; a + 2 * h <= W; a += 2 * h) {
    const sA = S(a, a + h), sB = S(a + h, a + 2 * h);
    if (sA < 40 || sB < 40) continue;
    const tA = Tw(a, a + h), tB = Tw(a + h, a + 2 * h);
    sT += tA + tB; sS += sA + sB;
    const d = tA / sA - tB / sB;
    acc += d * d * (sA * sB) / (sA + sB);        // normalised by 1/(1/sA+1/sB)
    n++;
  }
  const p = sT / sS;
  return { f: acc / n / (p * (1 - p)), n, p };
}

const perTile = [];
for (const T of TILES) {
  const { W, primes } = T;
  log(`building T${T.x} ...`);
  const rough = new Uint8Array(W + 3).fill(1);
  rough[0] = 0;
  for (const q of primes) for (let m = q; m <= W + 2; m += q) rough[m] = 0;
  const CS = new Int32Array(W + 1), CT = new Int32Array(W + 1);
  { let s = 0, t = 0;
    for (let r = 0; r < W; r++) { CS[r] = s; CT[r] = t; if (rough[r] && rough[r + 2]) s++; if (!comp[r] && !comp[r + 2]) t++; }
    CS[W] = s; CT[W] = t; }
  const D = CS[W], TT = CT[W];
  const MEAN = TT / D;
  const START = Math.ceil(W / 20);       // skip the head, where the trend is steep

  // synthetic control: rebuild CT by drawing each slot as a twin with prob MEAN
  const CTS = new Int32Array(W + 1);
  { let t = 0;
    for (let r = 0; r < W; r++) { CTS[r] = t; if (rough[r] && rough[r + 2] && rnd() < MEAN) t++; }
    CTS[W] = t; }

  console.log('');
  console.log(`T${T.x}:  W = ${W.toLocaleString()},  ln W = ${Math.log(W).toFixed(3)},  slots ${D.toLocaleString()},  ` +
    `twins ${TT.toLocaleString()},  mean survival ${MEAN.toFixed(5)}`);
  console.log('-'.repeat(100));
  console.log('        h |     ln h |  pairs |  REAL Fano |  deficit |  SYNTH Fano |  synth deficit');
  const pts = [];
  for (const h of [2000, 5000, 12000, 30000, 75000, 200000, 500000, 1200000]) {
    if (h * 8 > W - START) continue;
    const r = fanoPairs(CS, CT, W, h, START);
    const sy = fanoPairs(CS, CTS, W, h, START);
    if (r.n < 20) continue;
    pts.push({ h, lh: Math.log(h), def: 1 - r.f, n: r.n });
    console.log(`   ${String(h).padStart(7)} | ${Math.log(h).toFixed(3).padStart(8)} | ${String(r.n).padStart(6)} | ` +
      `${r.f.toFixed(4).padStart(10)} | ${(1 - r.f).toFixed(4).padStart(8)} | ${sy.f.toFixed(4).padStart(11)} | ` +
      `${(1 - sy.f).toFixed(4).padStart(14)}`);
  }
  // least squares deficit = a + b*ln h
  const n = pts.length;
  const mx = pts.reduce((a, q) => a + q.lh, 0) / n, my = pts.reduce((a, q) => a + q.def, 0) / n;
  let sxy = 0, sxx = 0;
  for (const q of pts) { sxy += (q.lh - mx) * (q.def - my); sxx += (q.lh - mx) * (q.lh - mx); }
  const b = sxy / sxx, a = my - b * mx;
  let ss = 0, st = 0;
  for (const q of pts) { const pr = a + b * q.lh; ss += (q.def - pr) ** 2; st += (q.def - my) ** 2; }
  console.log(`   FIT: deficit = ${a.toFixed(4)} + ${b.toFixed(5)}*ln h,  R^2 = ${(1 - ss / st).toFixed(4)}`);
  console.log(`   predicted slope 1/ln W = ${(1 / Math.log(W)).toFixed(5)},  ratio measured/predicted = ${(b * Math.log(W)).toFixed(3)}`);
  perTile.push({ x: T.x, W, lnW: Math.log(W), a, b, pts, MEAN });
}

console.log('');
console.log('S2. THE SLOPE AGAINST 1/ln W');
console.log('-'.repeat(100));
console.log(' tile |      ln W |  fitted slope |  1/ln W |  ratio');
for (const p of perTile) {
  console.log(` T${String(p.x).padEnd(3)} | ${p.lnW.toFixed(3).padStart(9)} | ${p.b.toFixed(5).padStart(13)} | ` +
    `${(1 / p.lnW).toFixed(5).padStart(7)} | ${(p.b * p.lnW).toFixed(3)}`);
}

console.log('');
console.log('S3. THE DEFICIT AT FIXED h ACROSS TILES — should shrink like 1/ln W');
console.log('-'.repeat(100));
console.log('        h |  T17 deficit |  T19 deficit |  T23 deficit |  T17/T23 measured |  predicted lnW23/lnW17');
// ⚠ CORRECTED 2026-08-17: this loop asked for h = 30000, 75000, 200000. T17's
// whole window is 510,510 wide, so it never has a point at any of those, the
// `some(q => !q)` guard skipped every row, and S3 printed its header and
// nothing else on every run since the file was written. The comparison needs h
// values present in all three tiles, which is T17's own grid.
for (const h of [2000, 5000, 12000]) {
  const g = perTile.map((p) => p.pts.find((q) => q.h === h));
  if (g.some((q) => !q)) continue;
  const pred = perTile[2].lnW / perTile[0].lnW;
  console.log(`   ${String(h).padStart(7)} | ${g[0].def.toFixed(4).padStart(12)} | ${g[1].def.toFixed(4).padStart(12)} | ` +
    `${g[2].def.toFixed(4).padStart(12)} | ${(g[0].def / g[2].def).toFixed(3).padStart(17)} | ${pred.toFixed(3)}`);
}
console.log('');
console.log('   (a deficit ~ (ln h + c)/ln W predicts deficit_T17/deficit_T23 = ln W23 / ln W17 at fixed h)');

console.log('');
console.log('   done in ' + el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js --streams both research/fold-profile-15-variance-law.js
//   invocation:  node research/fold-profile-15-variance-law.js
//   code-sha256: 850a00b54098648f8addfddd84d89ff48fffd5c308f374970517069d1699a0c3
//   out-sha256:  a240280c26096e9e2b693db4b149e57cd3b87c1982dabf39514c5e31a9a23850
//   streams:     stdout+stderr
//   node:        v22.21.0
//   embedded:    2026-08-19
//   elapsed:     3.0 s
// ============================================================================
// ====================================================================================================
// FOLD PROFILE 15 — the variance deficit: linear in ln h with slope 1/ln W?
// ====================================================================================================
//
// T17:  W = 510,510,  ln W = 13.143,  slots 22,275,  twins 4,636,  mean survival 0.20813
// ----------------------------------------------------------------------------------------------------
//         h |     ln h |  pairs |  REAL Fano |  deficit |  SYNTH Fano |  synth deficit
//       2000 |    7.601 |    121 |     0.9475 |   0.0525 |      0.9483 |         0.0517
//       5000 |    8.517 |     48 |     0.8212 |   0.1788 |      0.5169 |         0.4831
//      12000 |    9.393 |     20 |     0.5566 |   0.4434 |      0.9733 |         0.0267
//    FIT: deficit = -1.6247 + 0.21750*ln h,  R^2 = 0.9546
//    predicted slope 1/ln W = 0.07609,  ratio measured/predicted = 2.859
//
// T19:  W = 9,699,690,  ln W = 16.088,  slots 378,675,  twins 57,453,  mean survival 0.15172
// ----------------------------------------------------------------------------------------------------
//         h |     ln h |  pairs |  REAL Fano |  deficit |  SYNTH Fano |  synth deficit
//       2000 |    7.601 |   2303 |     0.8753 |   0.1247 |      0.9842 |         0.0158
//       5000 |    8.517 |    921 |     0.8721 |   0.1279 |      0.9892 |         0.0108
//      12000 |    9.393 |    383 |     0.8778 |   0.1222 |      1.0145 |        -0.0145
//      30000 |   10.309 |    153 |     0.8317 |   0.1683 |      0.9688 |         0.0312
//      75000 |   11.225 |     61 |     0.6483 |   0.3517 |      0.6260 |         0.3740
//     200000 |   12.206 |     23 |     0.8682 |   0.1318 |      0.7405 |         0.2595
//    FIT: deficit = -0.0565 + 0.02305*ln h,  R^2 = 0.1925
//    predicted slope 1/ln W = 0.06216,  ratio measured/predicted = 0.371
//
// T23:  W = 223,092,870,  ln W = 19.223,  slots 7,952,175,  twins 896,062,  mean survival 0.11268
// ----------------------------------------------------------------------------------------------------
//         h |     ln h |  pairs |  REAL Fano |  deficit |  SYNTH Fano |  synth deficit
//       2000 |    7.601 |  52984 |     0.9541 |   0.0459 |      0.9998 |         0.0002
//       5000 |    8.517 |  21193 |     0.9336 |   0.0664 |      0.9967 |         0.0033
//      12000 |    9.393 |   8830 |     0.9066 |   0.0934 |      0.9884 |         0.0116
//      30000 |   10.309 |   3532 |     0.8512 |   0.1488 |      1.0196 |        -0.0196
//      75000 |   11.225 |   1412 |     0.8531 |   0.1469 |      1.0082 |        -0.0082
//     200000 |   12.206 |    529 |     0.8681 |   0.1319 |      1.0428 |        -0.0428
//     500000 |   13.122 |    211 |     0.7931 |   0.2069 |      0.9721 |         0.0279
//    1200000 |   13.998 |     88 |     0.6502 |   0.3498 |      0.8479 |         0.1521
//    FIT: deficit = -0.2621 + 0.03805*ln h,  R^2 = 0.7951
//    predicted slope 1/ln W = 0.05202,  ratio measured/predicted = 0.731
//
// S2. THE SLOPE AGAINST 1/ln W
// ----------------------------------------------------------------------------------------------------
//  tile |      ln W |  fitted slope |  1/ln W |  ratio
//  T17  |    13.143 |       0.21750 | 0.07609 | 2.859
//  T19  |    16.088 |       0.02305 | 0.06216 | 0.371
//  T23  |    19.223 |       0.03805 | 0.05202 | 0.731
//
// S3. THE DEFICIT AT FIXED h ACROSS TILES — should shrink like 1/ln W
// ----------------------------------------------------------------------------------------------------
//         h |  T17 deficit |  T19 deficit |  T23 deficit |  T17/T23 measured |  predicted lnW23/lnW17
//       2000 |       0.0525 |       0.1247 |       0.0459 |             1.145 | 1.463
//       5000 |       0.1788 |       0.1279 |       0.0664 |             2.694 | 1.463
//      12000 |       0.4434 |       0.1222 |       0.0934 |             4.747 | 1.463
//
//    (a deficit ~ (ln h + c)/ln W predicts deficit_T17/deficit_T23 = ln W23 / ln W17 at fixed h)
//
//    done in 2.9s
// ───── stderr ─────
//    [0.0s] sieving to 2.23e+8 ...
//    [0.9s] building T17 ...
//    [0.9s] building T19 ...
//    [1.0s] building T23 ...
// ============================================================================
// READINGS (2026-08-18) — honestly calibrated
// ============================================================================
// 0. THE CONTROL IN THIS FILE WAS UNSEEDED UNTIL TODAY, AND THE OUTPUT ABOVE IS
//    THE FIRST REPRODUCIBLE ONE. Line 118 drew the synthetic twin set from
//    Math.random(), so every SYNTH column ever printed by this file was a
//    one-off. This is the same defect wave 5 found and fixed in
//    fold-profile-14 (S2-12); the instances here and in fold-profile-16 were
//    missed then and are fixed now, same generator, same seed 20260817. Two
//    consecutive runs after the fix are byte-identical apart from the elapsed
//    timer. The REAL columns were always deterministic and are unchanged: the
//    pre-fix run of 2026-08-18 gave exactly the same REAL Fano values to four
//    decimals, so nothing measured moved.
// 1. THE HEADER'S METHOD CLAIM IS CONTRADICTED BY THE CONTROL COLUMN BESIDE IT.
//    The method paragraph closes "the statistic is trend-free by construction
//    and is its own control. Synthetic replicates confirm the null lands at 1."
//    The SYNTH Fano column lands at 0.9483, 0.5169, 0.9733 (T17), 0.9842,
//    0.9892, 1.0145, 0.9688, 0.6260, 0.7405 (T19) and 0.9998, 0.9967, 0.9884,
//    1.0196, 1.0082, 1.0428, 0.9721, 0.8479 (T23). It lands at 1 exactly where
//    the pair count is large and nowhere else. At T17 with 48 pairs the control
//    reports a 48% deficit; at T19 with 61 pairs it reports 37%; at T19 with 23
//    pairs, 26%.
// 2. THE ESTIMATOR NEEDS A FEW HUNDRED PAIRS AND THE INTERESTING ROWS DO NOT
//    HAVE THEM. The Fano ratio over N window pairs has sampling sd about
//    sqrt(2/N) (from the printed pair counts): 0.13, 0.20, 0.32 at T17's three rows (121, 48, 20 pairs), 0.18
//    and 0.30 at T19's last two (61, 23), 0.15 at T23's last (88). Every row
//    where the printed deficit exceeds 0.20 is a row with under 100 pairs, and
//    in each of those the control shows a deficit of the same order.
// 3. SUBTRACTING THE CONTROL CHANGES THE ANSWER AT TWO OF THREE TILES. Row by
//    row, real deficit minus synth deficit:
//      T17  0.0008, -0.3043,  0.4167                          slope 0.228, R2 0.32
//      T19  0.1089,  0.1171,  0.1367, 0.1371, -0.0223, -0.1277 slope -0.050, R2 0.63
//      T23  0.0457,  0.0631,  0.0818, 0.1684, 0.1551, 0.1747,
//           0.1790,  0.1977                                    slope 0.0247, R2 0.87
//    T19's corrected slope is NEGATIVE where the printed fit reports +0.02305,
//    and T17's corrected series is not a line at all (R2 0.32 against the
//    printed 0.9546). Only T23 survives correction with its sign and shape
//    intact, and its corrected slope 0.0247 is 0.475 of the predicted 1/ln W,
//    where the uncorrected fit reports 0.731. Every fit in the file is OLS on
//    the REAL column alone, unweighted, so a point with sd 0.32 counts as much
//    as one with sd 0.006.
// 4. THE PREDICTED LAW slope = 1/ln W IS NOT ESTABLISHED. Printed
//    measured/predicted: 2.859, 0.371, 0.731 — a factor of 7.7 across three
//    tiles with no trend in W, on fits with R2 = 0.9546, 0.1925, 0.7951. The
//    one defensible comparison in the file is T23's clean rows: its first four
//    (52,984 down to 3,532 pairs, control within 2% of 1 throughout) give
//    slope 0.0373 uncorrected and 0.0430 corrected, against a predicted 0.0520,
//    i.e. 0.72 and 0.83 of the prediction. Right shape, constant low by 20-30%,
//    ONE tile. That is the honest state of the Montgomery-Soundararajan
//    identification from this file.
// 5. S3 IS A CLEAN NEGATIVE AND THE FILE PRINTS NO VERDICT FOR IT. At fixed h
//    the deficit should shrink like 1/ln W, so the T17/T23 ratio should be flat
//    at ln W23 / ln W17 = 1.463. Measured 1.145, 2.694, 4.747 at h = 2,000,
//    5,000, 12,000 — rising by a factor of four over three points. The deficit
//    is not even monotone in W at fixed h: 0.0525 (T17), 0.1247 (T19), 0.0459
//    (T23) at h = 2,000, with the MIDDLE tile largest. Both T17 rows that drive
//    the rise (0.1788 and 0.4434) are the 48-pair and 20-pair rows of reading
//    2, so the negative is soft: the prediction is unsupported, not refuted.
// 6. THE SECTION EXISTS ONLY BECAUSE OF A WAVE-5 REPAIR. S3's h grid originally
//    asked for 30,000, 75,000 and 200,000 and skipped any tile missing them;
//    T17's window is 510,510 wide, its grid tops out at 12,000, and every row
//    was skipped on every run since the file was written (wave 5, S2-9). The
//    grid is now 2,000, 5,000, 12,000, which all three tiles carry.
// 7. WHAT SURVIVES, ACROSS THE THREE FILES. The deficit is real — that is
//    fold-profile-14, on disjoint windows with no flank estimator and five
//    replicates. It grows with h — T23's clean rows here, and 14's independent
//    series. What THIS file set out to do, pin the growth to slope 1/ln W and
//    thereby name the mechanism, is not done. fold-profile-16 then answers the
//    causal question a different way, by removing the tile normalisation
//    entirely, and finds the deficit unchanged.
// 8. SCOPE. Three tiles, h grids of 3, 6 and 8 points, ONE synthetic
//    realisation per tile (fold-profile-14 uses five), drawn once and reused at
//    every h so the control values within a tile are correlated. No error bars
//    printed anywhere and no weighting in any fit. Runtime 2.9 s, plain node;
//    the header's --max-old-space-size=7000 was not needed.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure above that the OUTPUT block does not contain verbatim actually is.
// No number above was changed. This file's readings are almost entirely a
// RE-ANALYSIS of the printed table, so almost everything here is arithmetic
// done in the reading rather than a figure from anywhere else.
//
// DERIVED IN THIS READING by arithmetic over printed columns, and the reading
// says so at each site:
//   reading 2: the sampling sd row 0.13, 0.20, 0.32, 0.18, 0.30, 0.15, which
//     is sqrt(2/N) over the printed pair counts 121, 48, 20, 61, 23, 88.
//   reading 3: the whole control-subtracted table — T17 0.0008, -0.3043,
//     0.4167; T19 0.1089, 0.1171, 0.1367, 0.1371, -0.0223, -0.1277; T23
//     0.0457, 0.0631, 0.0818, 0.1684, 0.1551, 0.1747, 0.1790, 0.1977 — each
//     entry being the printed REAL deficit minus the printed SYNTH deficit on
//     the same row, together with the OLS refits of those columns (slope
//     0.228 / R2 0.32, slope -0.050 / R2 0.63, slope 0.0247 / R2 0.87) and the
//     ratio 0.475 of the predicted 1/ln W.
//   reading 3's "sd 0.006", from the printed 52,984-pair row.
//   reading 4: the four-row T23 refits, slope 0.0373 uncorrected and 0.0430
//     corrected, and the ratios 0.72 and 0.83 against the printed 0.0520.
//   The uncorrected counterparts these are compared against — 0.02305, 0.9546,
//     0.1925, 0.7951, 0.731, 2.859, 0.371, 1.463 — are printed above.
//
// ROUNDINGS of a printed value: 0.1788 -> 0.18, 0.0459 -> 0.0457 is NOT a
//   rounding but a control-subtracted figure (see above); 0.6260 and 0.7405
//   appear in reading 1 verbatim and are printed.
//
// IN-CODE: the seed 20260817 and the --max-old-space-size=7000 of reading 6
//   are both in the code and header above the banner; "line 118" is a line
//   reference, not a measurement.
// ---------------------------------------------------------------------------
