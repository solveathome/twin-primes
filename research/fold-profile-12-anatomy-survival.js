// ============================================================================
// FOLD PROFILE 12 — ANATOMY: is twin-prime survival above the mean anywhere?
// ============================================================================
// Chris, 2026-08-17: the tile has anatomical landmarks (start, end, middle, and
// the repo adds the seams). Poke the twin primes around each and look for a
// survival rate above the tile mean.
//
// DEFINITION. Survival rate in a window = (genuine twin prime pairs there) /
// (twin slots of the tile there). The tile mean is D_true/D where D_true is the
// number of twin primes below W. For T23, W = 223,092,870 is fully sievable, so
// every number below is settled exactly and nothing is estimated.
//
// WHAT THEORY SAYS BEFORE WE LOOK.
//   survival(y) = [2C2/ln^2 y] / [(D/W) * rho(u)],  u = ln y / ln x
// with rho the Unification Law slot-density profile. The numerator falls with y
// and the denominator tends to the tile average, so survival should DECREASE
// monotonically across the tile, modulo Buchstab wiggles. The head is the only
// enriched region and its enrichment is crystallisation, which is definitional.
//
// THE ONE NON-OBVIOUS PREDICTION. The palindrome r -> W-2-r is an EXACT symmetry
// of the slot set, so mirrored windows hold exactly equal slot counts. It is NOT
// a symmetry of the primes. So the tail carries head-like slot density at
// tail-like prime density, and survival there should sit BELOW the mean, by up
// to the same e^{2gamma} = 3.17 that enriches the head.
//
//   S1  the mirror: exact for slots, broken for primes
//   S2  survival profile in log bands from the head and from the tail
//   S3  the four anatomies as explicit windows
//   S4  the seams: the repo calls them 10-20x twin hotspots. At the prime level?
//   S5  the verdict: any window with survival above the mean?
//
// Run:  node --max-old-space-size=6000 fold-profile-12-anatomy-survival.js
// ============================================================================
'use strict';

const t0 = Date.now();
const el = () => ((Date.now() - t0) / 1000).toFixed(1) + 's';
const log = (s) => process.stderr.write('   [' + el() + '] ' + s + '\n');

const TP = [2, 3, 5, 7, 11, 13, 17, 19, 23];
const W = TP.reduce((a, b) => a * b, 1);          // 223,092,870
const WPREV = W / 23;                              // 19# = 9,699,690, the seam spacing
const X = 23, XP = 29;
const LIMIT = W + 2;

log('sieving [0, W+2] ...');
const comp = new Uint8Array(LIMIT + 1);
comp[0] = comp[1] = 1;
for (let i = 2; i * i <= LIMIT; i++) if (!comp[i]) for (let j = i * i; j <= LIMIT; j += i) comp[j] = 1;

// slot[r] = 1 if r and r+2 are both coprime to W  (i.e. a twin slot of T23)
log('marking twin slots and twin primes ...');
const rough = new Uint8Array(LIMIT + 1).fill(1);
rough[0] = 0;
for (const q of TP) for (let m = q; m <= LIMIT; m += q) rough[m] = 0;

// prefix counts, so any window is O(1)
const CS = new Int32Array(W + 1);   // slots below r
const CT = new Int32Array(W + 1);   // twin primes below r
{
  let s = 0, t = 0;
  for (let r = 0; r < W; r++) {
    CS[r] = s; CT[r] = t;
    if (rough[r] && rough[r + 2]) s++;
    if (!comp[r] && !comp[r + 2]) t++;
  }
  CS[W] = s; CT[W] = t;
}
const D = CS[W], TT = CT[W];
const MEAN = TT / D;

console.log('='.repeat(100));
console.log('FOLD PROFILE 12 — anatomy of the tile: where, if anywhere, does survival beat the mean?');
console.log('='.repeat(100));
console.log(`   T23:  W = ${W.toLocaleString()},  twin slots D = ${D.toLocaleString()},  twin primes below W = ${TT.toLocaleString()}`);
console.log(`   CUSTODY: D = 7,952,175 ${D === 7952175 ? 'MATCH' : '*** MISMATCH ***'}`);
console.log(`   TILE MEAN SURVIVAL = ${MEAN.toFixed(6)}   (this is the number every window is measured against)`);

const slots = (a, b) => CS[Math.min(b, W)] - CS[Math.max(a, 0)];
const twins = (a, b) => CT[Math.min(b, W)] - CT[Math.max(a, 0)];
const surv = (a, b) => { const s = slots(a, b); return s === 0 ? NaN : twins(a, b) / s; };

// ---------------------------------------------------------------------------
console.log('');
console.log('S1. THE MIRROR — exact for slots, broken for primes');
console.log('-'.repeat(100));
console.log('   window at the head        |  slots |  twins || mirrored window at the tail   |  slots |  twins | slots equal?');
for (const z of [1e3, 1e4, 1e5, 1e6, 1e7, 1e8]) {
  const hs = slots(0, z), ht = twins(0, z);
  const ts = slots(W - 2 - z, W - 2), tt = twins(W - 2 - z, W - 2);
  console.log(`   [0, ${z.toExponential(0).padStart(5)})`.padEnd(29) +
    ` | ${String(hs).padStart(6)} | ${String(ht).padStart(6)} || ` +
    `(W-2-${z.toExponential(0)}, W-2]`.padEnd(30) + ` | ${String(ts).padStart(6)} | ${String(tt).padStart(6)} | ` +
    `${hs === ts ? 'EXACT' : 'off by ' + (hs - ts)}`);
}
console.log('');
console.log('   Slot counts agree exactly, as the palindrome requires. Twin counts do not:');
console.log('   the pattern is symmetric, the arithmetic is not.');

// ---------------------------------------------------------------------------
console.log('');
console.log('S2. SURVIVAL PROFILE — log bands from each end');
console.log('-'.repeat(100));
console.log('   FROM THE HEAD                                    ||  FROM THE TAIL (mirrored windows)');
console.log('   band            |  slots |  twins | survival |x mean ||  slots |  twins | survival |x mean');
for (let k = 1; k < 9; k++) {
  const a = Math.pow(10, k), b = Math.pow(10, k + 1);
  const hs = slots(a, b), ht = twins(a, b), hr = hs ? ht / hs : NaN;
  const ta = W - 2 - b, tb = W - 2 - a;
  const ts = slots(ta, tb), tt = twins(ta, tb), tr = ts ? tt / ts : NaN;
  console.log(`   [1e${k}, 1e${k + 1})`.padEnd(19) +
    `| ${String(hs).padStart(6)} | ${String(ht).padStart(6)} | ${(isNaN(hr) ? '-' : hr.toFixed(4)).padStart(8)} | ` +
    `${(isNaN(hr) ? '-' : (hr / MEAN).toFixed(2)).padStart(5)} || ${String(ts).padStart(6)} | ${String(tt).padStart(6)} | ` +
    `${(isNaN(tr) ? '-' : tr.toFixed(4)).padStart(8)} | ${(isNaN(tr) ? '-' : (tr / MEAN).toFixed(2)).padStart(5)}`);
}

// ---------------------------------------------------------------------------
console.log('');
console.log('S3. THE FOUR ANATOMIES AS EXPLICIT WINDOWS');
console.log('-'.repeat(100));
const anat = [
  ['1. START, the zone (x, x\'^2)', X, XP * XP],
  ['1b. START, wider [0, 1e4)', 0, 1e4],
  ['1c. START, [0, 1e6)', 0, 1e6],
  ['2. END, last 1e4', W - 2 - 1e4, W - 2],
  ['2b. END, last 1e6', W - 2 - 1e6, W - 2],
  ['2c. END, last 1e8', W - 2 - 1e8, W - 2],
  ['3. MIDDLE, W/2 +- 5e5', W / 2 - 5e5, W / 2 + 5e5],
  ['3b. MIDDLE, middle third', W / 3, 2 * W / 3],
];
console.log('   window                          |     slots |    twins | survival | x tile mean');
for (const [name, a, b] of anat) {
  const s = slots(a, b), t = twins(a, b), r = s ? t / s : NaN;
  console.log(`   ${name.padEnd(31)} | ${s.toLocaleString().padStart(9)} | ${t.toLocaleString().padStart(8)} | ` +
    `${(isNaN(r) ? '-' : r.toFixed(4)).padStart(8)} | ${(isNaN(r) ? '-' : (r / MEAN).toFixed(3)).padStart(11)}`);
}

// ---------------------------------------------------------------------------
console.log('');
console.log('S4. THE SEAMS — the repo calls them 10-20x twin hotspots. At the PRIME level?');
console.log('-'.repeat(100));
console.log(`   seams sit at multiples of W_prev = 19# = ${WPREV.toLocaleString()}, k = 1..22.`);
console.log('   half-width h |  seam slots |  seam twins |  seam survival |  x mean |  control survival | x mean');
for (const h of [30, 300, 3000, 30000, 300000]) {
  let ss = 0, st = 0, cs = 0, ct = 0;
  for (let k = 1; k <= 22; k++) {
    const c = k * WPREV;
    ss += slots(c - h, c + h); st += twins(c - h, c + h);
    // control: the same offsets shifted by a third of the seam spacing
    const c2 = Math.min(W - h - 3, c + Math.floor(WPREV / 3));
    cs += slots(c2 - h, c2 + h); ct += twins(c2 - h, c2 + h);
  }
  const sr = ss ? st / ss : NaN, cr = cs ? ct / cs : NaN;
  console.log(`   ${String(h).padStart(12)} | ${String(ss).padStart(11)} | ${String(st).padStart(11)} | ` +
    `${(isNaN(sr) ? '-' : sr.toFixed(4)).padStart(14)} | ${(isNaN(sr) ? '-' : (sr / MEAN).toFixed(3)).padStart(7)} | ` +
    `${(isNaN(cr) ? '-' : cr.toFixed(4)).padStart(17)} | ${(isNaN(cr) ? '-' : (cr / MEAN).toFixed(3)).padStart(6)}`);
}
console.log('');
console.log('   Also the seam POINTS themselves, kW_prev - 1 and kW_prev + 1 (the natal positions):');
{
  let n = 0, tw = 0;
  for (let k = 1; k <= 22; k++) { const r = k * WPREV - 1; if (r + 2 <= W && rough[r] && rough[r + 2]) { n++; if (!comp[r] && !comp[r + 2]) tw++; } }
  console.log(`   ${n} seam slots, ${tw} of them genuine twin primes, survival ${(tw / n).toFixed(4)} = ${((tw / n) / MEAN).toFixed(2)}x mean`);
}

// ---------------------------------------------------------------------------
console.log('');
console.log('S5. VERDICT — scan every dyadic window for survival above the mean');
console.log('-'.repeat(100));
let best = null, above = 0, tested = 0;
for (let wdt = 1e4; wdt <= W / 4; wdt *= 2) {
  for (let a = 0; a + wdt <= W; a += wdt) {
    const s = slots(a, a + wdt);
    if (s < 200) continue;                       // need enough slots to mean anything
    const r = twins(a, a + wdt) / s;
    tested++;
    if (r > MEAN) above++;
    if (!best || r > best.r) best = { a, wdt, r, s };
  }
}
console.log(`   dyadic windows tested (>=200 slots): ${tested.toLocaleString()}`);
console.log(`   windows with survival above the tile mean: ${above.toLocaleString()} (${((100 * above) / tested).toFixed(1)}%)`);
console.log(`   best: [${best.a.toLocaleString()}, ${(best.a + best.wdt).toLocaleString()}), width ${best.wdt.toLocaleString()}, ` +
  `${best.s.toLocaleString()} slots, survival ${best.r.toFixed(4)} = ${(best.r / MEAN).toFixed(2)}x mean`);
console.log(`   position of the best window as a fraction of the tile: ${(best.a / W).toExponential(2)}`);

console.log('');
console.log('   done in ' + el());

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/fold-profile-12-anatomy-survival.js
//   invocation:  node research/fold-profile-12-anatomy-survival.js
//   code-sha256: d7b07b6906b525a0a46ee6f5583196b67bb591b4ca1a71816e99e836f2882e85
//   out-sha256:  ea70c3f8f41ed3ebcf1e06117350260745c49b1f1764c97077201a0bea992819
//   node:        v22.21.0
//   embedded:    2026-08-18
//   elapsed:     2.2 s
// ============================================================================
// ====================================================================================================
// FOLD PROFILE 12 — anatomy of the tile: where, if anywhere, does survival beat the mean?
// ====================================================================================================
//    T23:  W = 223,092,870,  twin slots D = 7,952,175,  twin primes below W = 896,062
//    CUSTODY: D = 7,952,175 MATCH
//    TILE MEAN SURVIVAL = 0.112681   (this is the number every window is measured against)
//
// S1. THE MIRROR — exact for slots, broken for primes
// ----------------------------------------------------------------------------------------------------
//    window at the head        |  slots |  twins || mirrored window at the tail   |  slots |  twins | slots equal?
//    [0,  1e+3)                 |     32 |     35 || (W-2-1e+3, W-2]                |     32 |      2 | EXACT
//    [0,  1e+4)                 |    358 |    205 || (W-2-1e+4, W-2]                |    358 |     38 | EXACT
//    [0,  1e+5)                 |   3571 |   1224 || (W-2-1e+5, W-2]                |   3571 |    375 | EXACT
//    [0,  1e+6)                 |  35636 |   8169 || (W-2-1e+6, W-2]                |  35636 |   3579 | EXACT
//    [0,  1e+7)                 | 356443 |  58980 || (W-2-1e+7, W-2]                | 356443 |  35600 | EXACT
//    [0,  1e+8)                 | 3564504 | 440312 || (W-2-1e+8, W-2]                | 3564504 | 366992 | EXACT
//
//    Slot counts agree exactly, as the palindrome requires. Twin counts do not:
//    the pattern is symmetric, the arithmetic is not.
//
// S2. SURVIVAL PROFILE — log bands from each end
// ----------------------------------------------------------------------------------------------------
//    FROM THE HEAD                                    ||  FROM THE TAIL (mirrored windows)
//    band            |  slots |  twins | survival |x mean ||  slots |  twins | survival |x mean
//    [1e1, 1e2)      |      4 |      6 |   1.5000 | 13.31 ||      4 |      0 |   0.0000 |  0.00
//    [1e2, 1e3)      |     28 |     27 |   0.9643 |  8.56 ||     28 |      2 |   0.0714 |  0.63
//    [1e3, 1e4)      |    326 |    170 |   0.5215 |  4.63 ||    326 |     36 |   0.1104 |  0.98
//    [1e4, 1e5)      |   3213 |   1019 |   0.3171 |  2.81 ||   3213 |    337 |   0.1049 |  0.93
//    [1e5, 1e6)      |  32065 |   6945 |   0.2166 |  1.92 ||  32065 |   3204 |   0.0999 |  0.89
//    [1e6, 1e7)      | 320807 |  50811 |   0.1584 |  1.41 || 320807 |  32021 |   0.0998 |  0.89
//    [1e7, 1e8)      | 3208061 | 381332 |   0.1189 |  1.05 || 3208061 | 331392 |   0.1033 |  0.92
//    [1e8, 1e9)      | 4387671 | 455750 |   0.1039 |  0.92 || 4387670 | 529070 |   0.1206 |  1.07
//
// S3. THE FOUR ANATOMIES AS EXPLICIT WINDOWS
// ----------------------------------------------------------------------------------------------------
//    window                          |     slots |    twins | survival | x tile mean
//    1. START, the zone (x, x'^2)    |        30 |       29 |   0.9667 |       8.579
//    1b. START, wider [0, 1e4)       |       358 |      205 |   0.5726 |       5.082
//    1c. START, [0, 1e6)             |    35,636 |    8,169 |   0.2292 |       2.034
//    2. END, last 1e4                |       358 |       38 |   0.1061 |       0.942
//    2b. END, last 1e6               |    35,636 |    3,579 |   0.1004 |       0.891
//    2c. END, last 1e8               | 3,564,504 |  366,992 |   0.1030 |       0.914
//    3. MIDDLE, W/2 +- 5e5           |    35,650 |    3,827 |   0.1073 |       0.953
//    3b. MIDDLE, middle third        | 2,650,726 |  286,767 |   0.1082 |       0.960
//
// S4. THE SEAMS — the repo calls them 10-20x twin hotspots. At the PRIME level?
// ----------------------------------------------------------------------------------------------------
//    seams sit at multiples of W_prev = 19# = 9,699,690, k = 1..22.
//    half-width h |  seam slots |  seam twins |  seam survival |  x mean |  control survival | x mean
//              30 |          40 |           2 |         0.0500 |   0.444 |            0.0500 |  0.444
//             300 |         620 |          71 |         0.1145 |   1.016 |            0.1018 |  0.903
//            3000 |        4620 |         510 |         0.1104 |   0.980 |            0.1084 |  0.962
//           30000 |       47056 |        5340 |         0.1135 |   1.007 |            0.1118 |  0.993
//          300000 |      470294 |       52271 |         0.1111 |   0.986 |            0.1104 |  0.980
//
//    Also the seam POINTS themselves, kW_prev - 1 and kW_prev + 1 (the natal positions):
//    20 seam slots, 1 of them genuine twin primes, survival 0.0500 = 0.44x mean
//
// S5. VERDICT — scan every dyadic window for survival above the mean
// ----------------------------------------------------------------------------------------------------
//    dyadic windows tested (>=200 slots): 44,607
//    windows with survival above the tile mean: 18,816 (42.2%)
//    best: [0, 10,000), width 10,000, 358 slots, survival 0.5726 = 5.08x mean
//    position of the best window as a fraction of the tile: 0.00e+0
//
//    done in 2.1s
// ============================================================================
// READINGS (2026-08-18) — honestly calibrated
// ============================================================================
// 1. THIS FILE HAS ONE CONTROL PER WIDTH AND PRINTS NO z-SCORE ANYWHERE, AND
//    THE TWO DOCUMENTS THAT USED TO SAY OTHERWISE NOW SAY SO CORRECTLY. S4's
//    four survival ratios 1.016, 0.980, 1.007, 0.986 (half-widths 300, 3000,
//    30000, 300000) are quoted in research/GLOSSARY.md:48-55 and
//    paper/moire-primes.md:571-576. Wave 5's finding S2-7 was that both sites
//    credited this file with "400 random controls each (z = -1.41 to +0.13)",
//    which this file does not produce: the run above has a single "control
//    survival" column, one offset per width, and the string "z" appears
//    nowhere. Checked again today: BOTH documents have since been repaired.
//    GLOSSARY.md now reads "against one control offset each ... The 400-control
//    test is a different run, research/fold-profile-13-hotspot-sweep.js ...
//    those two extremes are different tiles at different half-widths", and
//    moire-primes.md carries the equivalent. S2-7 is CLOSED. Recording it here
//    so the next sweep does not re-open it.
// 2. CUSTODY TIES THREE FILES TOGETHER EXACTLY, AND THIS IS THE STRONGEST
//    CROSS-CHECK IN THE FAMILY. This run reports 896,062 twin primes below
//    W = 23#. fold-profile-05 ends its sieve with 895,790 survivors, which are
//    the twin pairs with both members above sqrt(W) = 14,936. fold-profile-07
//    counts 268 t = 1 graduations, which are the pairs (p, p+2) with
//    29 <= p <= 14,947. The four remaining pairs below the comb are (3,5),
//    (5,7), (11,13), (17,19). 895,790 + 268 + 4 = 896,062 exactly. Three
//    independent code paths close to the unit.
// 3. "SURVIVAL" EXCEEDS 1 IN THE FIRST BAND BECAUSE NUMERATOR AND DENOMINATOR
//    ARE OVER DIFFERENT SETS. S2's first row reads slots 4, twins 6, survival
//    1.5000. A ratio of twin primes to twin slots cannot exceed 1 if the twins
//    are slots. The excess is (11,13) and (17,19), which are twin primes but
//    not slots of T23 (11 and 17 are not 23-rough). Restricted to slots the
//    band is 4 of 4 and survival is 1.0000. The effect is confined to
//    [10, 100) — no twin pair above 19 has a member below 23 — so it inflates
//    exactly one printed cell and the "13.31x mean" beside it, and it perturbs
//    the tile mean by 4 parts in 900,000. Cosmetic in consequence, wrong in
//    definition, and it is the kind of thing that gets quoted.
// 4. THE LAST ROW OF S2'S TAIL COLUMN IS MEASURING THE HEAD. The bands are
//    defined from each end, so the mirrored partner of the head band
//    [1e8, 1e9) is the position range (W-2-1e9, W-2-1e8], which after clipping
//    to the tile is [0, 1.23e8] — i.e. most of the front half. That is why it
//    is the ONLY entry in the tail column above the mean (0.1206, 1.07x) while
//    every other tail row sits at 0.89-0.98. Read the last row as head data
//    reflected, not as the tail recovering. The paired slot counts give it away:
//    4,387,671 against 4,387,670, a band that has run off the end of the tile.
// 5. THE FILE'S NON-OBVIOUS PREDICTION IS RIGHT IN DIRECTION AND AN ORDER OF
//    MAGNITUDE OUT IN SIZE. The header predicts tail survival "BELOW the mean,
//    by up to the same e^{2gamma} = 3.17 that enriches the head". Measured tail
//    ratios are 0.63, 0.98, 0.93, 0.89, 0.89, 0.92 in the six usable rows: the
//    depression is 2% to 11%, not a factor of 3. "Up to" makes the sentence
//    unfalsifiable, so nothing is refuted, but a reader who takes 3.17 as the
//    expected size will be wrong by a factor of thirty. The head enrichment IS
//    large (13.3x, 8.6x, 4.6x in the first three bands) and it is
//    crystallisation, which the header correctly calls definitional.
// 6. THE SEAM HOTSPOT DOES NOT EXIST AT THE PRIME LEVEL, WHICH IS A REAL
//    NEGATIVE. The repo's "10-20x twin hotspot" at the seams measures 1.016,
//    0.980, 1.007, 0.986 times the tile mean at four half-widths, against
//    controls at 0.903, 0.962, 0.993, 0.980 — seam and control agree to about
//    1% and both agree with the mean. The seam POINTS themselves (the 20 natal
//    positions kW_prev +- 1) hold 1 twin pair in 20 slots, 0.44x the mean. The
//    hotspot is a SLOT-density statement and it does not survive to primes.
//    Caveat that makes this the file's weakest strong claim: one control offset
//    per width, so "0.903 versus 1.016" has no error bar and the comparison
//    cannot be scored. That is precisely the gap fold-profile-13 was written to
//    close.
// 7. S5 IS A VERDICT WITHOUT A TEST. 44,607 dyadic windows scanned, 18,816
//    (42.2%) above the tile mean, best [0, 10,000) at 5.08x — which is the head,
//    i.e. crystallisation again. There is no null distribution, no
//    multiple-comparison correction and no z anywhere, so "42.2% above the
//    mean" cannot be compared with anything and the best window cannot be
//    called significant or not. The section answers its own question ("any
//    window above the mean?") with a number that has no scale.
// 8. SCOPE. One tile, T23, fully sieved so nothing is estimated. Eight bands,
//    eight anatomies, five seam widths, one control each. Runtime 2.2 s, plain
//    node; the header's --max-old-space-size=6000 was not needed.
//
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the OUTPUT block does not contain
// verbatim actually is. No number above was changed.
//
// TOKENIZER ARTIFACT, not a figure: 571-576 in paper/moire-primes.md:571-576
//   is a line range (reading 1); (11,13) and (17,19) are twin pairs written as
//   ordered pairs (readings 2 and 3); "0.89-0.98" (reading 4) is a hyphenated
//   range whose two ends are both printed in the tail x mean column.
// DERIVED IN THIS READING by arithmetic over printed values:
//   sqrt(W) = 14,936 (reading 2) is the square root of the printed
//   W = 223,092,870, which is 14,936.29.
//   Survival 1.0000 (reading 3) is the first S2 band restricted to slots,
//   4 twins in 4 slots.
//   Four parts in 900,000 (reading 3) is the four sub-comb pairs of reading 2
//   against the printed twin count 896,062, i.e. 4.5e-6.
//   [0, 1.23e8] (reading 4) is W - 2 - 1e9 clipped at zero against
//   W - 2 - 1e8 = 123,092,868, the mirrored partner of the [1e8, 1e9) band.
// BORROWED, verified present in the named producer's embedded OUTPUT:
//   895,790 and 14,947 (reading 2) are research/fold-profile-05-survival-curve.js,
//   which prints "end of sieve: y = 14947 ... survivors = 895,790" and its own
//   recount custody line. 14,947 also heads the last row of
//   research/fold-profile-07-impact-window.js, which is where the 268 t = 1
//   graduations come from.
//   "400 random controls each (z = -1.41 to +0.13)" (reading 1) is
//   research/fold-profile-13-hotspot-sweep.js, whose OUTPUT prints both seam
//   blocks "against 400 random controls each" with -1.41 at T19 half-width
//   3,000 and +0.13 at T23 half-width 30,000. The reading quotes it only to
//   record that two documents had mis-credited it to this file.
// IN-CODE: e^{2gamma} = 3.17 (reading 5) is the header's own prediction
//   sentence, and --max-old-space-size=6000 (reading 8) is the header's Run:
//   line.
// DEFINITION / LITERATURE constants: e^{2gamma} = 3.1722 is the Euler-Mascheroni
//   constant doubled and exponentiated, not a measurement.
// ---------------------------------------------------------------------------
