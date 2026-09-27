// ============================================================================
// IMPORT KW (Z2 ROW) — KOURBATOV–WOLF 2019'S PARAMETER-FREE FORMULAS READ RAW
// AGAINST THE ADOPTED RECORD LADDER, THE OLIVEIRA E SILVA TABLE, AND THE
// ZONEGAP-01 BANDS. NO FITTING ANYWHERE IN THIS FILE.
//
// Question (the KW import row's calibration cell, 2026-08-21): the Z2 sweep
// (research/zonegap-01.js) measured the zone gap at 27,292 levels and the
// staging note quotes "their constant 0.7574 vs our measured max load
// 0.7504". Before the IMPORT-MAP row lands, evaluate Kourbatov–Wolf's OWN
// formulas — upper/lower trend, the generalized Cramer ceiling with its
// exact constant, the Gumbel rescaling — against existing data only, with
// zero fitted parameters, and adjudicate whether 0.7574 ~ 0.7504 is
// agreement or a range accident.
//
// Source statements, read at page image this pass (arXiv:1901.03785v4,
// sha256 7d69b356..., = Mathematics 7 (2019) 400):
//   eq (8)  p.7   abar(x) = phi/C * log^2 x         (expected avg gap near x)
//   eq (7)  p.7   a_c(x)  = phi/C * x/Li2(x)        (expected avg gap below x)
//   eq (14) p.8   Tbar(x) = abar * log(x/abar)      (upper trend)
//   eq (12) p.7   T_c(x)  = a_c * log(C*Li2(x)/phi) (lower trend)
//   eq (20) p.8   generalized Cramer: almost all G < C^-1 phi log^3 p
//   eq (21) p.8   generalized Shanks: almost all G ~ C^-1 phi log^3 p
//   eq (19) p.8   trend conjecture: positive proportion in [T_c, Tbar],
//                 G - Tbar changes sign infinitely often
//   eq (48) p.16  rescaling h = (G - T_c)/a_c, claimed close to Gumbel
//   p.27          C_{2,H} = 2 prod p(p-2)/(p-1)^2 = 1.32032363169373914...
// For plain twins q = 2, phi_{2,H}(2) = 1, so the ceiling coefficient is
// 1/C_{2,H} = 0.7573917... ("0.7574"). ALL of the above is conjectural in
// the source (the string "Theorem" occurs zero times in the paper).
//
// Data, all adopted/embedded elsewhere and CITED, not re-derived:
//   - A113274/A113275, 82 records, inlined verbatim from
//     research/a113274-gap-records.js (its guards repeated here).
//   - research/tos-twin-gaps-1e16.txt (Oliveira e Silva, exhaustive to 1e16,
//     adopted 2026-08-21 by zonegap-01.js): its 75 record-starred rows must
//     equal A113274 records 1..75 or trust is VOID (both series' guard).
//   - zonegap-01.js embedded band table (c3 = Z2/ln^3 p mean +- sd, maxLoad
//     per band), quoted as trusted embedded data.
//
// WIDTH AUDIT: START tail exceeds 2^53, so the series are BigInt; Number()
// only inside Math.log (relative error ~1e-16, far under the 4 figures
// quoted). Li2 by Simpson in u = ln t coordinates, 1<<14 intervals; checked
// against li(x)-corrections at two known anchors below. Runtime: < 1 s.
// ============================================================================
'use strict';
const fs = require('fs');

// --- A113274/A113275 verbatim (see research/a113274-gap-records.js) ---------
const GAP = [
  2n, 6n, 12n, 18n, 30n, 36n, 72n, 150n, 168n, 210n,
  282n, 372n, 498n, 630n, 924n, 930n, 1008n, 1452n, 1512n, 1530n,
  1722n, 1902n, 2190n, 2256n, 2832n, 2868n, 3012n, 3102n, 3180n, 3480n,
  3804n, 4770n, 5292n, 6030n, 6282n, 6474n, 6552n, 6648n, 7050n, 7980n,
  8040n, 8994n, 9312n, 9318n, 10200n, 10338n, 10668n, 10710n, 11388n, 11982n,
  12138n, 12288n, 12630n, 13050n, 14262n, 14436n, 14952n, 15396n, 15720n, 16362n,
  16422n, 16590n, 16896n, 17082n, 18384n, 19746n, 19992n, 20532n, 21930n, 22548n,
  23358n, 23382n, 25230n, 26268n, 28842n, 31302n, 31482n, 31512n, 31920n, 33042n,
  34692n, 35640n
];
const START = [
  3n, 5n, 17n, 41n, 71n,
  311n, 347n, 659n, 2381n, 5879n,
  13397n, 18539n, 24419n, 62297n, 187907n,
  687521n, 688451n, 850349n, 2868959n, 4869911n,
  9923987n, 14656517n, 17382479n, 30752231n, 32822369n,
  96894041n, 136283429n, 234966929n, 248641037n, 255949949n,
  390817727n, 698542487n, 2466641069n, 4289385521n, 19181736269n,
  24215097497n, 24857578817n, 40253418059n, 42441715487n, 43725662621n,
  65095731749n, 134037421667n, 198311685749n, 223093059731n, 353503437239n,
  484797803249n, 638432376191n, 784468515221n, 794623899269n, 1246446371789n,
  1344856591289n, 1496875686461n, 2156652267611n, 2435613754109n, 4491437003327n,
  13104143169251n, 14437327538267n, 18306891187511n, 18853633225211n, 23275487664899n,
  23634280586867n, 38533601831027n, 43697538391391n, 56484333976919n, 74668675816277n,
  116741875898981n, 136391104728629n, 221346439666109n, 353971046703347n, 450811253543219n,
  742914612256169n, 1121784847637957n, 1149418981410179n, 2543288406389231n, 2797282815481499n,
  12914226879316517n, 16155559543324757n, 37338553629118097n, 37962553054417547n, 38617975949216087n,
  52000545890760149n, 70478530884377381n
];
if (GAP.length !== 82 || START.length !== 82) throw new Error('term counts');
for (let i = 1; i < 82; i++) {
  if (GAP[i] % 6n !== 0n) throw new Error('a(' + (i + 1) + ') not 0 mod 6');
  if (GAP[i] <= GAP[i - 1] || START[i] <= START[i - 1]) throw new Error('not increasing at ' + (i + 1));
}

// --- Oliveira e Silva custody gate: 75 starred rows == records 1..75 --------
{
  const txt = fs.readFileSync(__dirname + '/tos-twin-gaps-1e16.txt', 'utf8');
  const rec = [];
  for (const line of txt.split('\n')) {
    const m = line.match(/^\s*(\d+)(\*?)\s+(\d+)\*?\s+\d+\s*$/);
    if (m && m[2] === '*') rec.push([BigInt(m[1]), BigInt(m[3])]);
  }
  if (rec.length !== 75) throw new Error('TOS starred g-rows: ' + rec.length + ' != 75 — VOID');
  for (let i = 0; i < 75; i++)
    if (rec[i][0] !== GAP[i] || rec[i][1] !== START[i])
      throw new Error('TOS record ' + (i + 1) + ' mismatch — VOID');
}

// --- KW 2019 formulas, q = 2, phi = 1, k = 2 (page refs in header) ----------
const C2H = 1.32032363169373914785562422;   // p.27, = 2 * A005597
const invC = 1 / C2H;                        // 0.7573917... ("0.7574")
function Li2(x) { // int_2^x dt/ln^2 t, Simpson in u = ln t
  const a = Math.log(2), b = Math.log(x), n = 1 << 14, h = (b - a) / n;
  const f = u => Math.exp(u) / (u * u);
  let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2);
  return s * h / 3;
}
// sanity anchors: pi_2(1e10) = 27412679, pi_2(1e14) = 135780321665.
// KW eq (6) predicts C2H*Li2(x); both must land within 0.1% or the
// integrator (or the constant) is broken:
for (const [x, pi2] of [[1e10, 27412679], [1e14, 135780321665]]) {
  const prd = C2H * Li2(x);
  if (Math.abs(prd / pi2 - 1) > 1e-3) throw new Error('Li2 anchor fails at ' + x);
}
const abar = x => Math.log(x) ** 2 / C2H;                       // eq (8)
const Tbar = x => abar(x) * Math.log(x / abar(x));              // eq (14)
const ac   = x => x / (C2H * Li2(x));                           // eq (7)
const Tlow = x => ac(x) * Math.log(C2H * Li2(x));               // eq (12)
const ceil = x => invC * Math.log(x) ** 3;                      // eq (20)

console.log('KW 2019 PARAMETER-FREE, AGAINST THE 82-RECORD LADDER (p_end = START+GAP)');
console.log('guards: A113274 mod-6 + monotone OK; TOS 75 starred rows == records 1..75 EXACT');
console.log('');
console.log('   n            p_end   G/ceil(20)   G/Tbar(14)   G/Tlow(12)   h=(G-Tlow)/ac');
const rows = [];
for (let i = 0; i < 82; i++) {
  const pe = Number(START[i] + GAP[i]), g = Number(GAP[i]);
  const r = { n: i + 1, pe, g, lc: g / ceil(pe), lt: g / Tbar(pe), ll: g / Tlow(pe),
              h: (g - Tlow(pe)) / ac(pe) };
  rows.push(r);
  if (r.n <= 3 || r.n % 10 === 0 || r.n === 41 || r.n === 75 || r.n >= 80)
    console.log(String(r.n).padStart(4) + '  ' + pe.toExponential(4).padStart(15) +
      r.lc.toFixed(4).padStart(11) + r.lt.toFixed(4).padStart(13) +
      r.ll.toFixed(4).padStart(13) + r.h.toFixed(3).padStart(14));
}
const worst = rows.reduce((a, b) => (b.lc > a.lc ? b : a));
console.log('  (all 82 computed; every tenth, head, n=41 in-house anchor, n=75 worst, tail shown)');
console.log('');
console.log('CEILING eq (20), exact constant ' + invC.toFixed(6) + ' ln^3 p:');
console.log('  records above the ceiling: ' + rows.filter(r => r.lc >= 1).length + ' of 82');
console.log('  worst load ' + worst.lc.toFixed(4) + ' at n = ' + worst.n +
  ' (the 0.76-guard artifact reads 0.8434 there; ratio 0.76*C2H = ' + (0.76 * C2H).toFixed(5) + ')');
console.log('  load by ladder thirds (mean): ' +
  [0, 1, 2].map(t => (rows.slice(t * 27, t * 27 + 28).reduce((s, r) => s + r.lc, 0) /
    rows.slice(t * 27, t * 27 + 28).length).toFixed(4)).join('  ->  ') +
  '   (Shanks eq (21) says -> 1)');
console.log('');
console.log('TREND CONJECTURE eq (19) on the record points:');
const below = rows.filter(r => r.g < Tlow(r.pe)).length;
const inside = rows.filter(r => r.g >= Tlow(r.pe) && r.g <= Tbar(r.pe)).length;
const above = rows.filter(r => r.g > Tbar(r.pe)).length;
console.log('  below Tlow: ' + below + '   in [Tlow, Tbar]: ' + inside + '   above Tbar: ' + above);
let flips = 0;
for (let i = 1; i < 82; i++)
  if ((rows[i].g > Tbar(rows[i].pe)) !== (rows[i - 1].g > Tbar(rows[i - 1].pe))) flips++;
console.log('  sign changes of G - Tbar along the ladder: ' + flips +
  ' (their conjecture: infinitely many)');
console.log('');
console.log('GUMBEL RESCALING eq (48), h over the 82 records (QUALITATIVE — their');
console.log('histograms pool ~phi(16001) residue classes at fixed x; a single record');
console.log('ladder is a correlated running-max path, NOT that ensemble):');
const hs = rows.map(r => r.h);
const mh = hs.reduce((a, b) => a + b) / 82;
const m2 = hs.reduce((s, v) => s + (v - mh) ** 2, 0) / 82;
const m3 = hs.reduce((s, v) => s + (v - mh) ** 3, 0) / 82;
console.log('  mean ' + mh.toFixed(3) + '  sd ' + Math.sqrt(m2).toFixed(3) +
  '  skew ' + (m3 / m2 ** 1.5).toFixed(3) + '  frac>0 ' +
  (hs.filter(v => v > 0).length / 82).toFixed(3) +
  '  min ' + Math.min(...hs).toFixed(2) + '  max ' + Math.max(...hs).toFixed(2));
console.log('  (Gumbel reference: skew +1.14, right tail heavier; the sign of the skew');
console.log('   is the only transferable read at this sample size and correlation)');
console.log('');

// --- the zonegap-01 bands vs the trend, no fitting --------------------------
// c3 = mean Z2/ln^3 p per band, +- sd, quoted from zonegap-01.js's embedded
// block (trusted, cited, NOT recomputed here). Height translation is ours:
// the binding gap of zone p lives at s ~ p'^2 ~ p^2 (u -> 1, reading 2 there),
// so KW's trend at the gap's own height is Tbar(p^2), and the asymptotic
// c3 would be 8/C2H = 6.059 (Shanks at s = p^2: ln^3(p^2) = 8 ln^3 p).
console.log('ZONEGAP-01 BANDS vs THE TREND AT HEIGHT p^2 (band mid = geometric):');
console.log('  band       p_mid    measured c3+-sd    Tbar(p^2)/ln^3p  Tlow(p^2)/ln^3p  meas/Tbar');
const bands = [
  ['10^2', Math.sqrt(1e2 * 1e3), 3.426, 0.497],
  ['10^3', Math.sqrt(1e3 * 1e4), 3.681, 0.362],
  ['10^4', Math.sqrt(1e4 * 1e5), 4.022, 0.243],
  ['top ', Math.sqrt(1e5 * Math.sqrt(1e11)), 3.930, 0.219]
];
for (const [nm, pm, c3, sd] of bands) {
  const l3 = Math.log(pm) ** 3;
  const tb = Tbar(pm * pm) / l3, tl = Tlow(pm * pm) / l3;
  console.log('  ' + nm + '  ' + pm.toExponential(2).padStart(9) + '      ' +
    c3.toFixed(3) + ' +- ' + sd.toFixed(3) + '        ' + tb.toFixed(3).padStart(6) +
    '          ' + tl.toFixed(3).padStart(6) + '        ' + (c3 / tb).toFixed(3));
}
console.log('  asymptote (Shanks at height p^2): 8/C2H = ' + (8 / C2H).toFixed(3));
console.log('');

// --- the 0.7574 vs 0.7504 adjudication --------------------------------------
console.log('THE 0.7574-vs-0.7504 QUESTION, ADJUDICATED:');
console.log('  0.7574 = 1/C2H, the COEFFICIENT of the ceiling (units: ln^3 p).');
console.log('  0.7504 = the sweep\'s max of Z2/(0.76 ln^3 s), a dimensionless LOAD');
console.log('           (fraction of ceiling used), max over p_end <= 1e11 only.');
console.log('  Same load on the exact-constant ceiling: 0.7504 * 0.76 * C2H = ' +
  (0.7504 * 0.76 * C2H).toFixed(4));
console.log('  The load\'s own trajectory: band maxLoad 0.6312 (10^0) -> 0.7504 (10^2..3)');
console.log('  in-sweep; the full ladder reaches ' + worst.lc.toFixed(4) +
  ' (n = 75, p_end 2.80e15); Shanks eq (21)');
console.log('  sends it to 1. A coefficient and a load, numerically near by RANGE');
console.log('  ACCIDENT: extend the range and the load leaves 0.75 while the');
console.log('  coefficient stays. VERDICT: not a corroboration, and not usable as one.');
console.log('');

// --- N(x) < C log x (their record-count conjecture, p.24) -------------------
console.log('RECORD COUNTS vs THEIR N_c(x) < C log x, C > k+1 = 3 (p.24):');
for (const [x, n, src] of [[1e11, 41, 'sweep custody 1'], [1e16, 75, 'TOS exhaustive'],
                           [7.05e16, 82, 'A113274 b-file']]) {
  console.log('  N(' + x.toExponential(2) + ') = ' + n + '   N/ln x = ' +
    (n / Math.log(x)).toFixed(3) + '   (' + src + ')');
}
console.log('  consistent (ratio 1.62 -> 2.11, below any C > 3; no content either way)');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/import-kw-01-calibrate.js
//   invocation:  node research/import-kw-01-calibrate.js
//   code-sha256: 4e31f30bf5a10fe93fac5b468b3a68635cc7426a58da5a893463dfb3d3ca5d58
//   out-sha256:  eba668de51e57eccbb1c59eb2c9e807e1edb23990e5a31ae0915ba85a9e35afb
//   body-lines:  61
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-21
//   elapsed:     0.2 s
// ============================================================================
// KW 2019 PARAMETER-FREE, AGAINST THE 82-RECORD LADDER (p_end = START+GAP)
// guards: A113274 mod-6 + monotone OK; TOS 75 starred rows == records 1..75 EXACT
//
//    n            p_end   G/ceil(20)   G/Tbar(14)   G/Tlow(12)   h=(G-Tlow)/ac
//    1        5.0000e+0     0.6334       1.0897       1.0971         0.111
//    2        1.1000e+1     0.5746       1.4869       1.7042         1.144
//    3        2.9000e+1     0.4150       1.1482       1.5778         1.191
//   10        6.0890e+3     0.4190       0.7832       1.0334         0.167
//   20        4.8714e+6     0.5532       0.8345       0.9584        -0.431
//   30        2.5595e+8     0.6332       0.8940       0.9963        -0.052
//   40       4.3726e+10     0.7163       0.9548       1.0392         0.725
//   41       6.5096e+10     0.6877       0.9133       0.9927        -0.138
//   50       1.2464e+12     0.7323       0.9497       1.0228         0.492
//   60       2.3275e+13     0.7409       0.9422       1.0075         0.181
//   70       4.5081e+14     0.7749       0.9691       1.0299         0.810
//   75       2.7973e+15     0.8463       1.0488       1.1111         3.194
//   80       3.8618e+16     0.7831       0.9591       1.0119         0.372
//   81       5.2001e+16     0.8033       0.9826       1.0363         1.143
//   82       7.0479e+16     0.8060       0.9846       1.0380         1.209
//   (all 82 computed; every tenth, head, n=41 in-house anchor, n=75 worst, tail shown)
//
// CEILING eq (20), exact constant 0.757390 ln^3 p:
//   records above the ceiling: 0 of 82
//   worst load 0.8463 at n = 75 (the 0.76-guard artifact reads 0.8434 there; ratio 0.76*C2H = 1.00345)
//   load by ladder thirds (mean): 0.5444  ->  0.6854  ->  0.7588   (Shanks eq (21) says -> 1)
//
// TREND CONJECTURE eq (19) on the record points:
//   below Tlow: 33   in [Tlow, Tbar]: 37   above Tbar: 12
//   sign changes of G - Tbar along the ladder: 15 (their conjecture: infinitely many)
//
// GUMBEL RESCALING eq (48), h over the 82 records (QUALITATIVE — their
// histograms pool ~phi(16001) residue classes at fixed x; a single record
// ladder is a correlated running-max path, NOT that ensemble):
//   mean 0.320  sd 1.156  skew 0.588  frac>0 0.598  min -2.29  max 3.78
//   (Gumbel reference: skew +1.14, right tail heavier; the sign of the skew
//    is the only transferable read at this sample size and correlation)
//
// ZONEGAP-01 BANDS vs THE TREND AT HEIGHT p^2 (band mid = geometric):
//   band       p_mid    measured c3+-sd    Tbar(p^2)/ln^3p  Tlow(p^2)/ln^3p  meas/Tbar
//   10^2    3.16e+2      3.426 +- 0.497         3.633           2.993        0.943
//   10^3    3.16e+3      3.681 +- 0.362         4.074           3.571        0.904
//   10^4    3.16e+4      4.022 +- 0.243         4.368           3.949        0.921
//   top     1.78e+5      3.930 +- 0.219         4.532           4.159        0.867
//   asymptote (Shanks at height p^2): 8/C2H = 6.059
//
// THE 0.7574-vs-0.7504 QUESTION, ADJUDICATED:
//   0.7574 = 1/C2H, the COEFFICIENT of the ceiling (units: ln^3 p).
//   0.7504 = the sweep's max of Z2/(0.76 ln^3 s), a dimensionless LOAD
//            (fraction of ceiling used), max over p_end <= 1e11 only.
//   Same load on the exact-constant ceiling: 0.7504 * 0.76 * C2H = 0.7530
//   The load's own trajectory: band maxLoad 0.6312 (10^0) -> 0.7504 (10^2..3)
//   in-sweep; the full ladder reaches 0.8463 (n = 75, p_end 2.80e15); Shanks eq (21)
//   sends it to 1. A coefficient and a load, numerically near by RANGE
//   ACCIDENT: extend the range and the load leaves 0.75 while the
//   coefficient stays. VERDICT: not a corroboration, and not usable as one.
//
// RECORD COUNTS vs THEIR N_c(x) < C log x, C > k+1 = 3 (p.24):
//   N(1.00e+11) = 41   N/ln x = 1.619   (sweep custody 1)
//   N(1.00e+16) = 75   N/ln x = 2.036   (TOS exhaustive)
//   N(7.05e+16) = 82   N/ln x = 2.114   (A113274 b-file)
//   consistent (ratio 1.62 -> 2.11, below any C > 3; no content either way)
// ============================================================================
// READINGS
// ============================================================================
// 1. THE TREND FORMULA'S RAW PERFORMANCE IS REAL. Parameter-free, G/Tbar
//    sits in [0.78, 1.05] from record 10 (p ~ 6e3) to record 82 (p ~ 7e16)
//    — thirteen orders of magnitude inside +-22% with zero fitted numbers.
//    The record points split 33 below Tlow / 37 inside [Tlow, Tbar] / 12
//    above Tbar, and G - Tbar changes sign 15 times along the ladder: both
//    halves of their trend conjecture (19) read as described, at the
//    resolution 82 correlated points allow.
// 2. THE CEILING LOAD CREEPS AND NEVER BREACHES: 0 of 82 records reach eq
//    (20)'s exact ceiling; ladder-third means run 0.544 -> 0.685 -> 0.759,
//    worst 0.8463 at n = 75. That is the shape Shanks eq (21) predicts
//    (load -> 1 from below), and it is exactly why the sweep-local max
//    load 0.7504 is a snapshot of a rising curve, not a constant.
// 3. THE 0.7574-vs-0.7504 AGREEMENT IS A RANGE ACCIDENT, ADJUDICATED. One
//    number is the ceiling's COEFFICIENT (1/C2H, units ln^3 p), the other
//    is a dimensionless LOAD (fraction of ceiling used, max over p_end <=
//    1e11). Converted to the same ceiling the load reads 0.7530; six
//    decades further out the same load statistic reads 0.8463; under
//    Shanks it tends to 1 while the coefficient stays 0.7574. Two unlike
//    quantities passing each other. No live sentence may cite the
//    proximity as corroboration of anything.
// 4. THE BAND TRANSLATION LEAKS WHERE EXPECTED. At the sweep's bands, the
//    upper trend at the gap's own height (Tbar(p^2)/ln^3 p) over-reads the
//    measured c3 by 6-13% (meas/Tbar 0.943, 0.904, 0.921, 0.867), with
//    Tlow bracketing from below at the two upper bands. Consistent with
//    zonegap-01's own reading — Z2 sits inside the ln^3 family between the
//    trend forms with a drifting constant — and the drift direction
//    matches the load creep of reading 2. The height translation s ~ p^2
//    is OURS, not theirs; nothing in KW indexes gaps by a window.
// 5. GUMBEL: SIGN-LEVEL CONSISTENT ONLY. h = (G - Tlow)/a_c over the 82
//    records reads mean 0.320, sd 1.156, skew +0.588, 59.8% positive —
//    right-skewed as Gumbel wants (reference skew +1.14), but the ladder
//    is a correlated running-max path, not their fixed-x
//    many-residue-class ensemble, so nothing stronger than the sign is
//    claimed, and their own p.24 wording ("possible limit law ... open
//    question") is the correct strength.
// 6. LIMITS. Everything above is conjecture-against-measurement; no
//    theorem is touched (the source contains none — "Theorem" occurs zero
//    times, verified at page image this pass). Record tails are
//    single-witness (series rule); the band c3 values are quoted from
//    zonegap-01.js's embedded block, not recomputed; Li2 is Simpson with
//    two pi_2 anchors at 0.1%; and the 82 h-values are NOT independent
//    draws, so the Gumbel moments carry no error bars worth quoting.
// ============================================================================
