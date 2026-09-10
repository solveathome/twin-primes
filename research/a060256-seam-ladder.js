// ============================================================================
// THE SEAM LADDER ON 500 TRUSTED TERMS — A060256 ADOPTED, THE GROWTH SCALE
// READ AT FOURTEEN TIMES THE OLD DEPTH
//
// Question: ATTACKS2 row 7 reads the seam-ladder growth law m(n) ~
// (p_n/(e^gamma ln p_n))^2 on 35 in-house terms and flags its own verdict:
// "m/predictedScale fluctuates 0.01 to 4.1 ... 'Matches' overstates a ratio
// spanning two and a half orders of magnitude." A060256 carries a 500-term
// b-file the corpus cited only to disclaim novelty. What does the scale
// reading say on 500 trusted terms instead of 35?
//
// Provenance of the trusted series, read at the OEIS entry 2026-08-20:
//   A060256   "Smallest multiple a(n) of n-th primorial q(n) such that
//             a(n)*q(n)-1 and a(n)*q(n)+1 are a pair of twin primes."
//             Labos Elemer, Mar 22 2001; corrected and extended by Ray
//             Chandler, Apr 03 2009; record frozen at #15, Nov 09 2024.
//             B-file: Pierre Cami, n = 1..500 (p_500 = 3571, the primorial
//             q(500) ~ 10^1490).
// Convention: identical object to our m(n) = min{k >= 1 : k*P_n# +- 1 both
// prime} (research/attack2-05-07-integral-ladder.js part B), same offset
// (n = 1 is p = 2). No shift, no +-1: the 35-term overlap is asserted
// exactly below, and a single mismatch voids the adoption.
//
// Honest doubt: the b-file is single-witness (Cami), and at these heights
// primality is probable-prime, not certified (the entry's own PARI line uses
// ispseudoprime). The series rule of 2026-08-20 trusts it during research;
// in-house verification is a paper-phase deliverable. The scale being tested
// is OURS (HL heuristic for the two linear forms k*P +- 1, derivation in
// attack2-05-07's header); the terms are theirs.
//
// The model under test, stated as a distribution and not only a scale: if
// seam pairs at level n are HL-independent trials with success density
// 1/scale(n), scale(n) = (ln P_n#/(e^gamma ln p_n))^2, then m(n)/scale(n)
// is asymptotically Exp(1): mean 1, median ln 2 = 0.6931, mean log = -gamma.
// A wide ratio range is then the MODEL's own prediction, not scatter around
// a failed fit — which is exactly what the 35-term caveat could not decide.
// Logs are doubles over small integers (relative error ~1e-15). Runtime:
// instant.
// ============================================================================
'use strict';

// A060256 verbatim, b-file terms n = 1..500 (fetched 2026-08-20):
const M = [
  2,1,1,2,1,6,8,11,4,16,22,4,74,24,37,28,14,11,242,11,91,20,83,91,35,80,48,47,
  226,2,12,203,30,38,356,54,266,108,305,227,173,1185,738,13,382,277,455,433,
  173,1303,926,1162,164,298,69,121,702,1670,36,570,170,204,285,908,247,1529,
  931,1285,105,1675,3170,983,701,711,586,642,3091,192,3103,552,1003,4317,1598,
  545,375,471,176,6466,769,4504,3067,2226,2220,568,521,1246,673,685,415,2010,
  3057,1828,153,131,1656,2201,2363,134,577,2026,919,546,34594,295,5307,404,
  3520,44,3739,3671,804,461,1263,6338,8071,6893,1953,5421,4572,872,476,5559,
  5433,817,6659,9880,2362,222,110,4704,1072,11139,1401,894,3321,12466,1288,2,
  6718,6192,19729,2696,15749,1291,2105,4963,732,6589,9513,3060,6098,908,4032,
  5590,965,4666,513,12398,8317,9343,2576,4400,5565,1939,15943,5689,14182,5314,
  1644,363,1050,1785,4069,1988,103,2235,4088,1053,1367,1673,3922,4683,6295,
  5314,7977,950,4053,2536,13390,29455,2717,17096,10350,1186,8837,19801,6851,
  787,2410,403,6686,16695,1731,14912,11880,9570,13931,7166,25274,1342,4226,
  21613,12276,13123,1580,3615,19018,4980,7172,429,8297,4802,417,13591,25821,
  2371,23879,2853,19132,740,3427,29882,1352,6987,10279,3230,9580,20661,2673,
  22223,14781,17808,10957,428,17189,6017,37781,32458,7114,5748,2571,3849,
  17171,28771,7543,3720,4969,356,5391,11110,8043,9184,1466,9629,10445,125,
  20904,12507,2321,20099,15822,12926,574,382,8002,23278,14472,28374,26769,
  2610,1918,2427,70868,19216,54035,36930,3674,2617,4777,85772,25588,3767,
  50602,37954,2130,14999,21378,23400,399,14367,34055,4779,7542,61724,32801,
  5649,20678,9440,12337,38709,17427,22064,14085,28338,3629,46256,14372,11403,
  6795,78191,48240,5244,13255,7486,4140,18835,40012,17472,3535,10567,26290,
  2720,41956,15635,19791,55920,49032,10847,56750,48747,40678,69940,32467,2108,
  3776,57692,31564,84779,4600,28372,14111,52827,7052,393,10999,22608,7826,
  119754,14587,4079,12368,82449,58245,43425,303,8784,9183,8844,12388,53502,
  3948,182,15790,1198,30451,80183,33649,4870,46391,13520,52299,30525,56357,
  20560,54703,19691,54243,72209,29109,46224,54867,45689,18286,61499,9606,
  20603,13691,84635,44707,11764,24493,20592,17372,36732,133218,118431,2517,
  5280,63998,7594,18323,73652,15261,62236,30386,4662,99207,36078,15248,23576,
  57096,2195,1997,4716,53048,88709,106237,118683,4072,6961,44617,97392,21050,
  17248,14809,12187,5119,80672,145262,55418,20907,101387,8215,160036,74543,
  9920,13361,4436,55597,2663,11805,84528,19211,27472,102129,5108,107333,63990,
  25482,1037,282841,69498,63964,19050,48770,100630,133750,71545,742,112599,
  22153,6311,37186,121825,239416,56282,34616,15708,40326,15091,3140,49087,
  29059,69002,35302,172012,28196,195796,16723,45593
];

// Our exact custody ladder, attack2-05-07-integral-ladder.js part B, 35 terms:
const CUSTODY = [2, 1, 1, 2, 1, 6, 8, 11, 4, 16, 22, 4, 74, 24, 37, 28, 14,
  11, 242, 11, 91, 20, 83, 91, 35, 80, 48, 47, 226, 2, 12, 203, 30, 38, 356];

// --- transcription and convention guards ------------------------------------
if (M.length !== 500) throw new Error('term count ' + M.length);
for (let i = 0; i < 35; i++) {
  if (M[i] !== CUSTODY[i]) throw new Error(
    'custody overlap FAILED at n=' + (i + 1) + ' — convention mismatch, adoption void');
}

function primesUpTo(n) { const s = new Uint8Array(n + 1), o = []; for (let i = 2; i <= n; i++) { if (!s[i]) { o.push(i); for (let j = i * i; j <= n; j += i) s[j] = 1; } } return o; }
const P = primesUpTo(4000);
if (P[499] !== 3571) throw new Error('p_500 sieve failure');

// --- the scale, the ratios, the distribution --------------------------------
const GAMMA = 0.5772156649015329;
let lnP = 0;
const ratio = [], lratio = [], lnScale = [];
for (let n = 1; n <= 500; n++) {
  lnP += Math.log(P[n - 1]);
  const scale = Math.pow(lnP / (Math.exp(GAMMA) * Math.log(P[n - 1])), 2);
  ratio.push(M[n - 1] / scale);
  lratio.push(Math.log(M[n - 1] / scale));
  lnScale.push(Math.log(scale));
}

function slope(xs, ys) {
  const n = xs.length, mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n;
  let sxy = 0, sxx = 0;
  for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; }
  const a = sxy / sxx, b = my - a * mx;
  let ss = 0;
  for (let i = 0; i < n; i++) { const r = ys[i] - (b + a * xs[i]); ss += r * r; }
  return { a, se: Math.sqrt(ss / (n - 2) / sxx) };
}

console.log('THE SEAM LADDER m(n) ON 500 TRUSTED TERMS (A060256, Cami b-file)');
console.log('custody overlap n = 1..35: EXACT, 35/35 terms');
console.log('');
console.log('    n     p       m(n)      scale    m/scale');
const SHOW = [1, 10, 35, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500];
for (const n of SHOW) {
  const sc = Math.exp(lnScale[n - 1]);
  console.log(String(n).padStart(5) + '  ' + String(P[n - 1]).padStart(4) + '  ' +
    String(M[n - 1]).padStart(9) + '  ' + sc.toFixed(1).padStart(9) + '  ' +
    ratio[n - 1].toFixed(4).padStart(9));
}
console.log('');
const sorted = [...ratio].sort((a, b) => a - b);
const q = (p) => sorted[Math.floor(p * (sorted.length - 1))];
const mean = ratio.reduce((a, b) => a + b) / 500;
const mlog = lratio.reduce((a, b) => a + b) / 500;
console.log("ratio m/scale over 500 terms   vs Exp(1), the model's own law:");
console.log('  mean            ' + mean.toFixed(3).padStart(8) + '   (Exp(1): 1.000)');
console.log('  median          ' + q(0.5).toFixed(3).padStart(8) + '   (Exp(1): ln 2 = 0.693)');
console.log('  mean of ln      ' + mlog.toFixed(3).padStart(8) + '   (Exp(1): -gamma = -0.577)');
console.log('  below ln 2      ' + (ratio.filter(x => x < Math.LN2).length / 500).toFixed(3).padStart(8) + '   (Exp(1): 0.500)');
console.log('  p05 / p95        ' + q(0.05).toFixed(3) + ' / ' + q(0.95).toFixed(2));
console.log('  min / max        ' + sorted[0].toFixed(4) + ' / ' + sorted[499].toFixed(2) +
  '   (' + Math.log10(sorted[499] / sorted[0]).toFixed(1) + ' orders — the tail Exp(1) predicts)');
console.log('');
const sPow = slope(lnScale, M.map(Math.log));
console.log('slope of ln m vs ln scale, 500 terms: ' + sPow.a.toFixed(4) + ' +- ' + sPow.se.toFixed(4) + '   (scale law predicts 1)');
const idx = Array.from({ length: 500 }, (_, i) => i + 1);
const sDrift = slope(idx, lratio);
console.log('drift of ln(m/scale) per level:       ' + (sDrift.a >= 0 ? '+' : '') + sDrift.a.toFixed(5) + ' +- ' + sDrift.se.toFixed(5) + '   (zero = the scale exponent is exact)');
const s35 = [...ratio.slice(0, 35)].sort((a, b) => a - b);
console.log('');
console.log('the 35-term reading, recomputed here: median ' + s35[17].toFixed(2) +
  ', range ' + s35[0].toFixed(2) + ' to ' + s35[34].toFixed(2));

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/a060256-seam-ladder.js
//   invocation:  node research/a060256-seam-ladder.js
//   code-sha256: 417c5151905400769ab57bcd9b58eb62e73bec6d279a42b65a1d8b2d84c469f1
//   out-sha256:  4c206fb7779c056926595d12e3d86f479d50ce98fed01bb889f7a6beec54d15b
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     0.1 s
// ============================================================================
// THE SEAM LADDER m(n) ON 500 TRUSTED TERMS (A060256, Cami b-file)
// custody overlap n = 1..35: EXACT, 35/35 terms
//
//     n     p       m(n)      scale    m/scale
//     1     2          2        0.3     6.3444
//    10    29         16       14.2     1.1277
//    35   149        356      218.2     1.6316
//    50   229       1303      471.7     2.7626
//   100   541       2010     2036.3     0.9871
//   150   863       6192     4787.2     1.2934
//   200  1223      29455     8692.8     3.3884
//   250  1583      22223    13827.9     1.6071
//   300  1987      85772    20087.0     4.2700
//   350  2357      48747    27683.8     1.7608
//   400  2741      46224    36497.6     1.2665
//   450  3181      55418    46366.8     1.1952
//   500  3571      45593    57682.0     0.7904
//
// ratio m/scale over 500 terms   vs Exp(1), the model's own law:
//   mean               0.992   (Exp(1): 1.000)
//   median             0.692   (Exp(1): ln 2 = 0.693)
//   mean of ln        -0.596   (Exp(1): -gamma = -0.577)
//   below ln 2         0.504   (Exp(1): 0.500)
//   p05 / p95        0.053 / 2.78
//   min / max        0.0004 / 13.07   (4.5 orders — the tail Exp(1) predicts)
//
// slope of ln m vs ln scale, 500 terms: 0.9756 +- 0.0281   (scale law predicts 1)
// drift of ln(m/scale) per level:       +0.00004 +- 0.00040   (zero = the scale exponent is exact)
//
// the 35-term reading, recomputed here: median 0.78, range 0.01 to 6.34
// ============================================================================
// READINGS
//
// 1. THE TRUST'S HARD GATE PASSED. All 35 in-house terms
//    (attack2-05-07-integral-ladder.js, BigInt Miller-Rabin) match Cami's
//    b-file EXACTLY, same offset, no shift. Two independent computations
//    agreeing on 35 levels is the calibration that makes trusting the rest
//    rational. Had any term differed the script throws and nothing below
//    exists.
// 2. THE GROWTH SCALE IS VALIDATED, AND THE OLD CAVEAT DISSOLVES RATHER THAN
//    SURVIVES. On 500 trusted terms the slope of ln m against ln scale is
//    0.9756 +- 0.0281 (the law predicts 1), and the per-level drift of
//    ln(m/scale) is +0.00004 +- 0.00040 — zero to half a se. ATTACKS2 row 7's
//    own flag ("'Matches' overstates a ratio spanning two and a half orders")
//    was the honest reading of 35 waiting times; at 500 terms the exponent
//    question no longer rests on the scatter at all.
// 3. THE SCATTER IS THE MODEL'S OWN LAW, MEASURED, NOT EXCUSED. If the scale
//    is right, m/scale should be Exp(1). It is, on every moment checked:
//    mean 0.992 against 1, median 0.692 against ln 2 = 0.693, mean log
//    -0.596 against -gamma = -0.577, mass below ln 2 = 0.504 against 0.500.
//    The 4.5-order min-to-max spread (0.0004 to 13.07) is what 500 draws of
//    Exp(1) look like, so the two-and-a-half-order spread at 35 terms was
//    never evidence against the scale — it was the distribution showing.
// 4. WHAT THIS SETTLES FOR THE QUEUED OEIS COMMENT (TODO's contributions
//    block): the contributable line "a(n) ~ (p_n/(e^gamma log p_n))^2, with
//    a(n)/scale asymptotically exponential" now stands on the entry's own
//    500 published terms, not on our 35. The entry carries no formula and no
//    comment (verified at the record 2026-08-18, frozen at #15 Nov 09 2024),
//    so the contribution remains open and is now fully instrumented.
// 5. LIMITS. The b-file is single-witness (Cami) and probable-prime at large
//    n; trusted under the series rule of 2026-08-20, with in-house
//    verification a paper-phase deliverable. No term was recomputed here
//    beyond the 35 custody levels already on disk. Neighbour A384545
//    (Clements, smooth-multiplier variant, 1000-term b-file; both figures
//    from covering-dive.md, not this output) is a second unused dataset for
//    this family and stays unused today.
// ============================================================================
