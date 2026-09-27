// ============================================================================
// FOLD PROFILE 11 — LINEAGE YIELD: survivors against opportunities
// ============================================================================
// Chris, 2026-08-17: natal@5 dominates the raw counts simply because there are so
// many more of them. How do the lineages compare once normalised by how many
// could have existed?
//
// Two normalisations, and they answer different questions.
//
//   (a) AGAINST RAW INTEGERS. Lineage y occupies exactly y-3 residue classes
//       modulo y#, so below N it has (y-3)*N/y# candidate positions. How many of
//       those are genuine twin primes?
//
//   (b) AGAINST TWIN SLOTS. Lineage y is a fixed fraction (y-3)/D_y of the slots
//       at every level. Its share of the twin primes is the same fraction, so
//       this ratio is flat by construction and carries no information.
//
// Normalisation (a) is the live one, and the prediction is exact:
//
//        yield_y(N) = 2*C_2 * (y#/D_y) / ln^2 N = 2*C_2 * mbar(y) / ln^2 N
//
// where mbar(y) = y#/D_y is the tile's MEAN TWIN-SLOT GAP at level y. A lineage
// born at level y has already passed the sieve by every prime up to y, so its
// members are enriched over raw integers by exactly that factor. So later-born
// lineages should be individually BETTER, not worse.
//
//   S1  opportunities, survivors and yield per lineage, below 1e8
//   S2  the yield law: is yield_y / yield_5 equal to mbar(y) / mbar(5)?
//   S3  the exact trade: rarity times quality
//
// Run:  node --max-old-space-size=6000 fold-profile-11-lineage-yield.js
// ============================================================================
'use strict';

const t0 = Date.now();
const el = () => ((Date.now() - t0) / 1000).toFixed(1) + 's';
const log = (s) => process.stderr.write('   [' + el() + '] ' + s + '\n');

const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23];
const PRIMORIAL = []; { let w = 1; for (const q of PRIMES) { w *= q; PRIMORIAL.push(w); } }
const DENS = []; { let d = 1; for (const q of PRIMES) { if (q > 2) d *= (q - 2); DENS.push(d); } }
const C2x2 = 1.3203236316;

function birthIndex(r) {
  for (let i = 2; i < PRIMORIAL.length; i++) if (r % PRIMORIAL[i] !== PRIMORIAL[i] - 1) return i;
  return -1;
}

const N = 1e8;
console.log('='.repeat(98));
console.log('FOLD PROFILE 11 — lineage yield: survivors against how many could have existed');
console.log('='.repeat(98));

log('sieving to 1e8 ...');
const comp = new Uint8Array(N + 3);
comp[0] = comp[1] = 1;
for (let i = 2; i * i <= N + 2; i++) if (!comp[i]) for (let j = i * i; j <= N + 2; j += i) comp[j] = 1;

const surv = new Array(PRIMES.length).fill(0);
let total = 0;
for (let n = 5; n + 2 <= N; n++) {
  if (!comp[n] && !comp[n + 2]) { const i = birthIndex(n); if (i >= 0) surv[i]++; total++; }
}

console.log('');
console.log(`   twin pairs below 1e8: ${total.toLocaleString()}`);
console.log('');
console.log('S1. OPPORTUNITIES, SURVIVORS AND YIELD');
console.log('-'.repeat(98));
console.log(' level y | classes y-3 |          y# |  opportunities (y-3)N/y# |  survivors |     yield |  share of all twins');
const rows = [];
for (let i = 2; i < PRIMES.length; i++) {
  const y = PRIMES[i], W = PRIMORIAL[i], Dy = DENS[i];
  const opp = ((y - 3) * N) / W;
  const yld = surv[i] / opp;
  rows.push({ y, W, Dy, opp, s: surv[i], yld, mbar: W / Dy });
  console.log(` ${String(y).padStart(7)} | ${String(y - 3).padStart(11)} | ${String(W).padStart(11)} | ` +
    `${opp.toExponential(3).padStart(24)} | ${String(surv[i]).padStart(10)} | ${yld.toFixed(5).padStart(9)} | ` +
    `${(surv[i] / total).toExponential(4)}`);
}

console.log('');
console.log('S2. THE YIELD LAW — yield should scale like mbar(y) = y#/D_y, the mean twin-slot gap');
console.log('-'.repeat(98));
console.log(' level y |  mbar(y) = y#/D_y |  mbar(y)/mbar(5) |  yield_y/yield_5 |  ratio |  predicted yield 2C2*mbar/ln^2 N');
const base = rows[0];
for (const r of rows) {
  const pred = C2x2 * r.mbar / (Math.log(N) ** 2);
  console.log(` ${String(r.y).padStart(7)} | ${r.mbar.toFixed(3).padStart(17)} | ${(r.mbar / base.mbar).toFixed(4).padStart(16)} | ` +
    `${(r.yld / base.yld).toFixed(4).padStart(16)} | ${((r.yld / base.yld) / (r.mbar / base.mbar)).toFixed(4).padStart(6)} | ` +
    `${pred.toFixed(5).padStart(32)}`);
}
console.log('');
console.log('   The predicted column omits the finite-size Hardy-Littlewood factor, measured');
console.log(`   independently at ${(total / (C2x2 * N / Math.log(N) ** 2)).toFixed(4)} here; multiply through by it to compare with the yield column.`);

console.log('');
console.log('S3. THE EXACT TRADE — rarity times quality is the share');
console.log('-'.repeat(98));
console.log('   density of lineage y among integers = (y-3)/y#');
console.log('   yield of lineage y                  = 2C2 * (y#/D_y) / ln^2 N');
console.log('   product                             = (y-3)/D_y * 2C2/ln^2 N   <-- the share, exactly');
console.log('');
console.log(' level y |  rarity (y-3)/y# |  quality mbar(y) |  product/(2C2/ln^2N) |  share (y-3)/D_y |  match');
for (const r of rows) {
  const rarity = (r.y - 3) / r.W;
  const prod = rarity * r.mbar;
  const share = (r.y - 3) / r.Dy;
  console.log(` ${String(r.y).padStart(7)} | ${rarity.toExponential(4).padStart(16)} | ${r.mbar.toFixed(3).padStart(16)} | ` +
    `${prod.toExponential(4).padStart(20)} | ${share.toExponential(4).padStart(16)} | ${Math.abs(prod / share - 1) < 1e-12 ? 'EXACT' : 'no'}`);
}
console.log('');
console.log('   So a later-born lineage is individually BETTER by the factor mbar(y) ~ 2.7 ln^2 y,');
console.log('   and rarer by the factor y#, which is e^y. Rarity wins overwhelmingly, and the');
console.log('   product is the share (y-3)/D_y measured in fold-profile-10.');

console.log('');
console.log('   done in ' + el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/fold-profile-11-lineage-yield.js
//   invocation:  node research/fold-profile-11-lineage-yield.js
//   code-sha256: fbd8aa19186b7e295c7e8e2014a41a8eeaefb389b5b4734234b7cf9f52c9405e
//   out-sha256:  c0c3a53c387367090d84f73d7df74a6367aba8e0f9aa3edd45fe13ded88c4e00
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     0.6 s
// ============================================================================
// ==================================================================================================
// FOLD PROFILE 11 — lineage yield: survivors against how many could have existed
// ==================================================================================================
//
//    twin pairs below 1e8: 440,311
//
// S1. OPPORTUNITIES, SURVIVORS AND YIELD
// --------------------------------------------------------------------------------------------------
//  level y | classes y-3 |          y# |  opportunities (y-3)N/y# |  survivors |     yield |  share of all twins
//        5 |           2 |          30 |                 6.667e+6 |     293795 |   0.04407 | 6.6724e-1
//        7 |           4 |         210 |                 1.905e+6 |     117287 |   0.06158 | 2.6637e-1
//       11 |           8 |        2310 |                 3.463e+5 |      25974 |   0.07500 | 5.8990e-2
//       13 |          10 |       30030 |                 3.330e+4 |       2977 |   0.08940 | 6.7611e-3
//       17 |          14 |      510510 |                 2.742e+3 |        259 |   0.09444 | 5.8822e-4
//       19 |          16 |     9699690 |                 1.650e+2 |         19 |   0.11518 | 4.3151e-5
//       23 |          20 |   223092870 |                 8.965e+0 |          0 |   0.00000 | 0.0000e+0
//
// S2. THE YIELD LAW — yield should scale like mbar(y) = y#/D_y, the mean twin-slot gap
// --------------------------------------------------------------------------------------------------
//  level y |  mbar(y) = y#/D_y |  mbar(y)/mbar(5) |  yield_y/yield_5 |  ratio |  predicted yield 2C2*mbar/ln^2 N
//        5 |            10.000 |           1.0000 |           1.0000 | 1.0000 |                          0.03891
//        7 |            14.000 |           1.4000 |           1.3972 | 0.9980 |                          0.05447
//       11 |            17.111 |           1.7111 |           1.7019 | 0.9946 |                          0.06658
//       13 |            20.222 |           2.0222 |           2.0286 | 1.0032 |                          0.07869
//       17 |            22.919 |           2.2919 |           2.1431 | 0.9351 |                          0.08918
//       19 |            25.615 |           2.5615 |           2.6137 | 1.0204 |                          0.09967
//       23 |            28.054 |           2.8054 |           0.0000 | 0.0000 |                          0.10916
//
//    The predicted column omits the finite-size Hardy-Littlewood factor, measured
//    independently at 1.1316 here; multiply through by it to compare with the yield column.
//
// S3. THE EXACT TRADE — rarity times quality is the share
// --------------------------------------------------------------------------------------------------
//    density of lineage y among integers = (y-3)/y#
//    yield of lineage y                  = 2C2 * (y#/D_y) / ln^2 N
//    product                             = (y-3)/D_y * 2C2/ln^2 N   <-- the share, exactly
//
//  level y |  rarity (y-3)/y# |  quality mbar(y) |  product/(2C2/ln^2N) |  share (y-3)/D_y |  match
//        5 |        6.6667e-2 |           10.000 |            6.6667e-1 |        6.6667e-1 | EXACT
//        7 |        1.9048e-2 |           14.000 |            2.6667e-1 |        2.6667e-1 | EXACT
//       11 |        3.4632e-3 |           17.111 |            5.9259e-2 |        5.9259e-2 | EXACT
//       13 |        3.3300e-4 |           20.222 |            6.7340e-3 |        6.7340e-3 | EXACT
//       17 |        2.7424e-5 |           22.919 |            6.2851e-4 |        6.2851e-4 | EXACT
//       19 |        1.6495e-6 |           25.615 |            4.2253e-5 |        4.2253e-5 | EXACT
//       23 |        8.9649e-8 |           28.054 |            2.5150e-6 |        2.5150e-6 | EXACT
//
//    So a later-born lineage is individually BETTER by the factor mbar(y) ~ 2.7 ln^2 y,
//    and rarer by the factor y#, which is e^y. Rarity wins overwhelmingly, and the
//    product is the share (y-3)/D_y measured in fold-profile-10.
//
//    done in 0.6s
// ============================================================================
// READINGS (2026-08-18) — honestly calibrated
// ============================================================================
// 1. THE YIELD LAW HOLDS WHERE THERE IS DATA. yield_y / yield_5 against
//    mbar(y) / mbar(5) gives ratios 1.0000, 0.9980, 0.9946, 1.0032, 0.9351,
//    1.0204, 0.0000 at levels 5 to 23. The four rows with thousands of pairs
//    (levels 5, 7, 11, 13) agree to 0.5%. Level 17 rests on 259 pairs (Poisson
//    noise 6.2%, observed miss -6.5%, about one sigma) and level 19 on 19 pairs
//    (noise 23%). So the law is confirmed over a 2x range in mbar and untested
//    above that. Later-born lineages ARE individually better, which is the
//    counterintuitive half of the file and it is established.
// 2. THE LEVEL-23 ROW IS AN EMPTY DRAW, NOT A FAILURE, AND THE TABLE DOES NOT
//    SAY SO. S1 gives level 23 8.965 opportunities and 0 survivors, so S2
//    prints yield_23/yield_5 = 0.0000 and ratio 0.0000. The expected survivor
//    count is 8.965 * 0.109 = 0.98, so zero is the single most likely outcome
//    of a Poisson(1) draw (probability 0.37). A reader scanning the ratio
//    column sees the law collapse in its last row. It does not; the sample ran
//    out. That row should carry no weight in either direction.
// 3. THE PREDICTED-YIELD COLUMN NEEDS A MULTIPLICATION THE SCRIPT DECLINES TO
//    DO, AND IT LANDS WHEN YOU DO IT. The file prints predicted 2C2*mbar/ln^2 N
//    and then says "multiply through by" the finite-size Hardy-Littlewood
//    factor 1.1316. Doing that: 0.04403, 0.06164, 0.07534, 0.08905, 0.10091,
//    0.11279 against measured 0.04407, 0.06158, 0.07500, 0.08940, 0.09444,
//    0.11518. Four of six agree to 0.5% and the two loose ones are the small-N
//    levels of reading 1. Leaving the correction to the reader is a real
//    usability defect in a file whose whole point is a quantitative prediction.
// 4. S3 IS AN IDENTITY PRINTED AS A VERIFICATION, SEVEN TIMES. The "match"
//    column reads EXACT at every row because rarity x quality is
//    ((y-3)/y#) * (y#/D_y) = (y-3)/D_y, with y# cancelling. Nothing is
//    measured, nothing could disagree, and the word EXACT invites the opposite
//    reading. The section is a good explanation of WHY rarity wins; it is not
//    evidence that it does.
// 5. THE CLOSING CONSTANT IS FITTED AT SMALL y AND IS 12% HIGH IN THE LIMIT.
//    The last paragraph says "a later-born lineage is individually BETTER by
//    the factor mbar(y) ~ 2.7 ln^2 y". Measured mbar/ln^2 y (scratch
//    computation, not this script): 2.8536 at y = 23, then 2.5014, 2.4195,
//    2.4086, 2.4041, 2.4028 at y = 101, 1009, 10007, 1e5, 1e6. The limit is
//    e^{2gamma}/(2*C_2) = 2.4026, which the numbers reach to four places. So
//    2.7 is the value near y = 23-50, not the constant, and quoting it as the
//    law overstates the enrichment by 12% asymptotically. The qualitative
//    conclusion (mbar grows like ln^2 y, y# grows like e^y, rarity wins
//    overwhelmingly) is untouched.
// 6. CUSTODY. The survivor column sums to 293,795 + 117,287 + 25,974 + 2,977 +
//    259 + 19 + 0 = 440,311, the printed twin total, with nothing unclassified.
//    That total is one below the standard count of twin pairs under 1e8
//    (440,312) because (3,5) is not in the mod-6 comb; see fold-profile-10
//    reading 4 and FOLD-PROFILE.md:320-321.
// 7. SCOPE. One bound, N = 1e8, one normalisation actually computed (the header
//    correctly says normalisation (b) is flat by construction and it is not
//    printed). Seven levels, of which the top two are noise-limited and the top
//    one is empty. Runtime 0.6 s, plain node; the header's
//    --max-old-space-size=6000 was not needed.
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// TOKENIZER ARTIFACT, not a figure: 320 and -321 in reading 6 are the line
//   range of the FOLD-PROFILE.md citation, and 101, 1009 and 10007 in reading
//   5 are the y values the series is evaluated at, not measurements.
//
// DERIVED IN THIS READING by arithmetic over printed values:
//   0.98 in reading 2 is S1's 8.965 opportunities times S2's predicted yield
//     0.10916 at level 23, which is 0.9786.
//   The six corrected predictions of reading 3, 0.04403, 0.06164, 0.07534,
//     0.08905, 0.10091 and 0.11279, are S2's predicted-yield column 0.03891,
//     0.05447, 0.06658, 0.07869, 0.08918 and 0.09967 each multiplied by the
//     1.1316 finite-size factor S2 names but declines to apply.
//   2.8536 in reading 5 is S2's printed mbar(23) = 28.054 divided by ln^2 23.
//
// BORROWED, verified present in the named producer's embedded OUTPUT:
//   2.4086, 2.4041 and 2.4028 in reading 5 are null-limsup-01-score.js's
//     mbar/ln^2 x column, printed there as 2.408622 at x = 10007, 2.404103 at
//     x = 100003 and 2.402798 at x = 1000003.
//   440,312 in reading 6 is fold-profile-12-anatomy-survival.js's count of
//     twin pairs in [0, 1e8), which includes (3,5).
//
// DEFINITION / LITERATURE constants:
//   0.37 in reading 2 is e^-1 = 0.3679, the Poisson(1) probability of zero.
//   2.4026 in reading 5 is e^{2 gamma}/(2 C_2), printed to six places as
//     2.402607 by null-limsup-01-score.js.
//
// IN-CODE: 6000 in reading 7 is the --max-old-space-size value in this file's
//   own header invocation line.
//
// [UNTRACED — verify before quoting]: 2.5014 at y = 101 and 2.4195 at y = 1009
//   in reading 5, the two interior points of the scratch series the reading
//   itself declares is not this script's. They are not in any embedded OUTPUT.
//   Recomputing mbar = 6/prod_{5<=q<=y}(1-2/q) over ln^2 y reproduces both to
//   the printed digits, so they are sound, but nothing in the corpus holds
//   custody of them.
// ---------------------------------------------------------------------------
