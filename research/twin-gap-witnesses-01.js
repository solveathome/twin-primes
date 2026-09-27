// ============================================================================
// SECOND WITNESSES FOR THE TWIN-GAP RECORD LADDER — LUHN'S GAP02 TABLE AND
// KOURBATOV'S 1309.4053 TABLE 2, CROSS-CHECKED RECORD-EXACT AGAINST A113274
//
// Question: research/a113274-gap-records.js adopted the 82-record ladder with
// the honest doubt "single-witness tails, in-house verification a paper-phase
// deliverable". The zonegap-prior-art recon (research/history/staging/
// zonegap-prior-art.md SS4) located two independent carriers: Norman Luhn's
// pzktupel.de GAP02 page (the live continuation channel of A113274, with
// per-record discoverer credits) and Kourbatov's tables paper arXiv:1309.4053
// (all maximal twin gaps to ~1e15, both endpoints printed). Do they agree
// with A113274 record-exact, do they extend it, and who found what?
//
// Provenance, both artifacts fetched and machine-parsed 2026-08-21:
//   LUHN  https://pzktupel.de/RecordGaps/GAP02.php, "Record Gaps Between Twin
//         Primes ... Maximal gaps below 1.00*10^17", HTML sha256
//         d12779fb37c5113bcceb40f238bcff6cc4e6908f2048e42ac85049b42e570028.
//         Columns: rank, gap, gap start, next twin prime, merit, who, when.
//         82 rows, machine-extracted from the table markup (no hand-typing).
//   KO13  arXiv:1309.4053v1, Kourbatov, "Tables of record gaps between prime
//         constellations", PDF sha256
//         733f8e77aba31d7f2bd5dee7da6e42b73f07be49a2bc1f442d3a658b10d108df,
//         Table 2 "Maximal gaps between twin primes {p, p+2} ... OEIS
//         A113274". 72 rows machine-extracted from the pdftotext -layout
//         text with a per-row structural check (next - start = gap) at
//         extraction time; a garbled digit fails that identity or the
//         cross-check below.
//   A113274/A113275 arrays: copied verbatim (awk, not retyped) from the
//         adopted first witness research/a113274-gap-records.js.
//
// Conventions verified, not assumed (the +-2 lesson):
//   - Both witnesses print the LESSER member of both pairs: every row obeys
//     next = start + gap exactly, and row 1 is (3, 5, gap 2) -- the
//     lesser-to-lesser convention of A113274. Guarded row-exact below.
//   - Luhn's merit column is 1.32032363 * INT_start^next dt/ln^2 t, i.e. the
//     expected number of twin pairs in the gap interval under Hardy-
//     Littlewood (his 1.32032363 is 2*C2, the KW2019 C_{2,H}; the notation-
//     collision warning of ZONE-POSTULATE.md SS4 applies -- OUR C2 is
//     0.66016..., his constant is twice ours). Identified numerically this
//     session and enforced at 0.05% relative on all 82 rows: a merit that
//     fails is a transcription error in gap or start.
//
// Honest doubt: agreement of Luhn with A113274 is NOT full independence --
// Luhn's page cites A113274 and the mersenneforum thread (t=24303), so the
// two channels share upstream discoverers. What the cross-check buys is (i)
// transcription custody on a second live channel, (ii) per-record DISCOVERER
// credits absent from OEIS (which credits table CONTRIBUTORS: "terms up to
// a(72) from Kourbatov" while Luhn credits Rathbun/Wolf/Fischer as the
// finders), and (iii) the certified search bound "below 1.00*10^17".
// Kourbatov 1309.4053 is closer to independent for records 1..72: his own
// computation to ~1e15 plus prior published tables. No witness extends the
// ladder beyond 82; the trusted envelope stays "below 1.00*10^17".
//
// All starts, nexts, gaps as BigInt (a(76..82) starts exceed 2^53); logs via
// Number() only inside Math.log (~1e-16 relative, far under the 6-7 printed
// merit digits). Runtime: well under 1 s.
// ============================================================================
'use strict';

// --- A113274 (record gaps) / A113275 (start of each record gap), 82 terms,
// --- copied verbatim from research/a113274-gap-records.js:
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

// --- LUHN: [rank, gap, start, next twin (lesser), merit, who, when] --------
const LUHN = [
  [1, 2n, 3n, 5n, 1.445810, 'Randall L. Rathbun', 1998],
  [2, 6n, 5n, 11n, 1.948453, 'Randall L. Rathbun', 1998],
  [3, 12n, 17n, 29n, 1.635470, 'Randall L. Rathbun', 1998],
  [4, 18n, 41n, 59n, 1.560641, 'Randall L. Rathbun', 1998],
  [5, 30n, 71n, 101n, 2.004066, 'Randall L. Rathbun', 1998],
  [6, 36n, 311n, 347n, 1.415243, 'Randall L. Rathbun', 1998],
  [7, 72n, 347n, 419n, 2.688998, 'Randall L. Rathbun', 1998],
  [8, 150n, 659n, 809n, 4.552129, 'Randall L. Rathbun', 1998],
  [9, 168n, 2381n, 2549n, 3.636832, 'Randall L. Rathbun', 1998],
  [10, 210n, 5879n, 6089n, 3.665921, 'Randall L. Rathbun', 1998],
  [11, 282n, 13397n, 13679n, 4.114085, 'Randall L. Rathbun', 1998],
  [12, 372n, 18539n, 18911n, 5.075111, 'Randall L. Rathbun', 1998],
  [13, 498n, 24419n, 24917n, 6.428788, 'Randall L. Rathbun', 1998],
  [14, 630n, 62297n, 62927n, 6.818872, 'Randall L. Rathbun', 1998],
  [15, 924n, 187907n, 188831n, 8.269411, 'Randall L. Rathbun', 1998],
  [16, 930n, 687521n, 688451n, 6.796202, 'Randall L. Rathbun', 1998],
  [17, 1008n, 688451n, 689459n, 7.364664, 'Randall L. Rathbun', 1998],
  [18, 1452n, 850349n, 851801n, 10.28279, 'Randall L. Rathbun', 1998],
  [19, 1512n, 2868959n, 2870471n, 9.028724, 'Randall L. Rathbun', 1998],
  [20, 1530n, 4869911n, 4871441n, 8.519247, 'Randall L. Rathbun', 1998],
  [21, 1722n, 9923987n, 9925709n, 8.759769, 'Randall L. Rathbun', 1998],
  [22, 1902n, 14656517n, 14658419n, 9.223564, 'Randall L. Rathbun', 1998],
  [23, 2190n, 17382479n, 17384669n, 10.40397, 'Randall L. Rathbun', 1998],
  [24, 2256n, 30752231n, 30754487n, 10.02002, 'Randall L. Rathbun', 1998],
  [25, 2832n, 32822369n, 32825201n, 12.48380, 'Randall L. Rathbun', 1998],
  [26, 2868n, 96894041n, 96896909n, 11.19789, 'Randall L. Rathbun', 1998],
  [27, 3012n, 136283429n, 136286441n, 11.33568, 'Randall L. Rathbun', 1998],
  [28, 3102n, 234966929n, 234970031n, 11.02389, 'Randall L. Rathbun', 1998],
  [29, 3180n, 248641037n, 248644217n, 11.23505, 'Randall L. Rathbun', 1998],
  [30, 3480n, 255949949n, 255953429n, 12.25819, 'Randall L. Rathbun', 1998],
  [31, 3804n, 390817727n, 390821531n, 12.83226, 'Randall L. Rathbun', 1998],
  [32, 4770n, 698542487n, 698547257n, 15.18626, 'Randall L. Rathbun', 1998],
  [33, 5292n, 2466641069n, 2466646361n, 14.93973, 'Randall L. Rathbun', 1998],
  [34, 6030n, 4289385521n, 4289391551n, 16.18444, 'Randall L. Rathbun', 1998],
  [35, 6282n, 19181736269n, 19181742551n, 14.79506, 'Randall L. Rathbun', 1998],
  [36, 6474n, 24215097497n, 24215103971n, 14.95151, 'Randall L. Rathbun', 1998],
  [37, 6552n, 24857578817n, 24857585369n, 15.09856, 'Randall L. Rathbun', 1998],
  [38, 6648n, 40253418059n, 40253424707n, 14.72091, 'Randall L. Rathbun', 1998],
  [39, 7050n, 42441715487n, 42441722537n, 15.54361, 'Randall L. Rathbun', 1998],
  [40, 7980n, 43725662621n, 43725670601n, 17.55126, 'Randall L. Rathbun', 1998],
  [41, 8040n, 65095731749n, 65095739789n, 17.12254, 'Randall L. Rathbun', 1998],
  [42, 8994n, 134037421667n, 134037430661n, 18.08956, 'Marek Wolf', 1999],
  [43, 9312n, 198311685749n, 198311695061n, 18.16933, 'Marek Wolf', 1999],
  [44, 9318n, 223093059731n, 223093069049n, 18.01755, 'Marek Wolf', 1999],
  [45, 10200n, 353503437239n, 353503447439n, 19.04609, 'Marek Wolf', 1999],
  [46, 10338n, 484797803249n, 484797813587n, 18.85325, 'Marek Wolf', 1999],
  [47, 10668n, 638432376191n, 638432386859n, 19.06301, 'Marek Wolf', 1999],
  [48, 10710n, 784468515221n, 784468525931n, 18.85126, 'Marek Wolf', 1999],
  [49, 11388n, 794623899269n, 794623910657n, 20.02584, 'Marek Wolf', 1999],
  [50, 11982n, 1246446371789n, 1246446383771n, 20.39474, 'Marek Wolf', 1999],
  [51, 12138n, 1344856591289n, 1344856603427n, 20.54799, 'Marek Wolf', 1999],
  [52, 12288n, 1496875686461n, 1496875698749n, 20.64329, 'Marek Wolf', 1999],
  [53, 12630n, 2156652267611n, 2156652280241n, 20.67568, 'Marek Wolf', 1999],
  [54, 13050n, 2435613754109n, 2435613767159n, 21.18140, 'Marek Wolf', 1999],
  [55, 14262n, 4491437003327n, 4491437017589n, 22.18628, 'Marek Wolf', 1999],
  [56, 14436n, 13104143169251n, 13104143183687n, 20.89295, 'Marek Wolf', 1999],
  [57, 14952n, 14437327538267n, 14437327553219n, 21.50158, 'Marek Wolf', 1999],
  [58, 15396n, 18306891187511n, 18306891202907n, 21.79709, 'Richard Fischer', 2008],
  [59, 15720n, 18853633225211n, 18853633240931n, 22.21297, 'Richard Fischer', 2008],
  [60, 16362n, 23275487664899n, 23275487681261n, 22.80468, 'Richard Fischer', 2008],
  [61, 16422n, 23634280586867n, 23634280603289n, 22.86557, 'Richard Fischer', 2008],
  [62, 16590n, 38533601831027n, 38533601847617n, 22.38321, 'Richard Fischer', 2008],
  [63, 16896n, 43697538391391n, 43697538408287n, 22.61387, 'Richard Fischer', 2008],
  [64, 17082n, 56484333976919n, 56484333994001n, 22.49368, 'Richard Fischer', 2008],
  [65, 18384n, 74668675816277n, 74668675834661n, 23.78699, 'Richard Fischer', 2008],
  [66, 19746n, 116741875898981n, 116741875918727n, 24.84912, 'Richard Fischer', 2008],
  [67, 19992n, 136391104728629n, 136391104748621n, 24.91878, 'Richard Fischer', 2008],
  [68, 20532n, 221346439666109n, 221346439686641n, 24.84704, 'Richard Fischer', 2008],
  [69, 21930n, 353971046703347n, 353971046725277n, 25.80021, 'Richard Fischer', 2008],
  [70, 22548n, 450811253543219n, 450811253565767n, 26.14839, 'Richard Fischer', 2008],
  [71, 23358n, 742914612256169n, 742914612279527n, 26.30315, 'Richard Fischer', 2008],
  [72, 23382n, 1121784847637957n, 1121784847661339n, 25.70768, 'Richard Fischer', 2008],
  [73, 25230n, 1149418981410179n, 1149418981435409n, 27.70057, 'Richard Fischer', 2008],
  [74, 26268n, 2543288406389231n, 2543288406415499n, 27.56324, 'Tomás Oliveira e Silva', 2013],
  [75, 28842n, 2797282815481499n, 2797282815510341n, 30.10238, 'Tomás Oliveira e Silva', 2013],
  [76, 31302n, 12914226879316517n, 12914226879347819n, 30.03118, 'Robert Smith', 2019],
  [77, 31482n, 16155559543324757n, 16155559543356239n, 29.84250, 'Thomas Ritschel', 2019],
  [78, 31512n, 37338553629118097n, 37338553629149609n, 28.57373, 'Martin Raab', 2019],
  [79, 31920n, 37962553054417547n, 37962553054449467n, 28.91856, 'Martin Raab', 2019],
  [80, 33042n, 38617975949216087n, 38617975949249129n, 29.90823, 'Martin Raab', 2019],
  [81, 34692n, 52000545890760149n, 52000545890794841n, 30.91813, 'Martin Raab', 2020],
  [82, 35640n, 70478530884377381n, 70478530884413021n, 31.26706, 'Martin Raab', 2021],
];

// --- KOURBATOV 1309.4053 Table 2: [start, next (both lesser), gap] ---------
const KO13 = [
  [3n, 5n, 2n],
  [5n, 11n, 6n],
  [17n, 29n, 12n],
  [41n, 59n, 18n],
  [71n, 101n, 30n],
  [311n, 347n, 36n],
  [347n, 419n, 72n],
  [659n, 809n, 150n],
  [2381n, 2549n, 168n],
  [5879n, 6089n, 210n],
  [13397n, 13679n, 282n],
  [18539n, 18911n, 372n],
  [24419n, 24917n, 498n],
  [62297n, 62927n, 630n],
  [187907n, 188831n, 924n],
  [687521n, 688451n, 930n],
  [688451n, 689459n, 1008n],
  [850349n, 851801n, 1452n],
  [2868959n, 2870471n, 1512n],
  [4869911n, 4871441n, 1530n],
  [9923987n, 9925709n, 1722n],
  [14656517n, 14658419n, 1902n],
  [17382479n, 17384669n, 2190n],
  [30752231n, 30754487n, 2256n],
  [32822369n, 32825201n, 2832n],
  [96894041n, 96896909n, 2868n],
  [136283429n, 136286441n, 3012n],
  [234966929n, 234970031n, 3102n],
  [248641037n, 248644217n, 3180n],
  [255949949n, 255953429n, 3480n],
  [390817727n, 390821531n, 3804n],
  [698542487n, 698547257n, 4770n],
  [2466641069n, 2466646361n, 5292n],
  [4289385521n, 4289391551n, 6030n],
  [19181736269n, 19181742551n, 6282n],
  [24215097497n, 24215103971n, 6474n],
  [24857578817n, 24857585369n, 6552n],
  [40253418059n, 40253424707n, 6648n],
  [42441715487n, 42441722537n, 7050n],
  [43725662621n, 43725670601n, 7980n],
  [65095731749n, 65095739789n, 8040n],
  [134037421667n, 134037430661n, 8994n],
  [198311685749n, 198311695061n, 9312n],
  [223093059731n, 223093069049n, 9318n],
  [353503437239n, 353503447439n, 10200n],
  [484797803249n, 484797813587n, 10338n],
  [638432376191n, 638432386859n, 10668n],
  [784468515221n, 784468525931n, 10710n],
  [794623899269n, 794623910657n, 11388n],
  [1246446371789n, 1246446383771n, 11982n],
  [1344856591289n, 1344856603427n, 12138n],
  [1496875686461n, 1496875698749n, 12288n],
  [2156652267611n, 2156652280241n, 12630n],
  [2435613754109n, 2435613767159n, 13050n],
  [4491437003327n, 4491437017589n, 14262n],
  [13104143169251n, 13104143183687n, 14436n],
  [14437327538267n, 14437327553219n, 14952n],
  [18306891187511n, 18306891202907n, 15396n],
  [18853633225211n, 18853633240931n, 15720n],
  [23275487664899n, 23275487681261n, 16362n],
  [23634280586867n, 23634280603289n, 16422n],
  [38533601831027n, 38533601847617n, 16590n],
  [43697538391391n, 43697538408287n, 16896n],
  [56484333976919n, 56484333994001n, 17082n],
  [74668675816277n, 74668675834661n, 18384n],
  [116741875898981n, 116741875918727n, 19746n],
  [136391104728629n, 136391104748621n, 19992n],
  [221346439666109n, 221346439686641n, 20532n],
  [353971046703347n, 353971046725277n, 21930n],
  [450811253543219n, 450811253565767n, 22548n],
  [742914612256169n, 742914612279527n, 23358n],
  [1121784847637957n, 1121784847661339n, 23382n],
];

// --- guards: counts and rank order ------------------------------------------
if (GAP.length !== 82 || START.length !== 82) throw new Error('A113274 term counts');
if (LUHN.length !== 82) throw new Error('Luhn row count ' + LUHN.length + ' != 82');
if (KO13.length !== 72) throw new Error('Kourbatov row count ' + KO13.length + ' != 72');
for (let i = 0; i < 82; i++)
  if (LUHN[i][0] !== i + 1) throw new Error('Luhn rank out of order at row ' + i);

// --- guard: LUHN vs A113274/A113275, every overlapping record ---------------
// (a disagreement is a FINDING and must surface as a throw, never a choice)
for (let i = 0; i < 82; i++) {
  const [rank, gap, start, next] = LUHN[i];
  if (gap !== GAP[i]) throw new Error('LUHN gap != A113274 at record ' + rank +
    ': ' + gap + ' vs ' + GAP[i]);
  if (start !== START[i]) throw new Error('LUHN start != A113275 at record ' + rank +
    ': ' + start + ' vs ' + START[i]);
  if (next !== start + gap) throw new Error('LUHN next != start+gap at record ' + rank);
}

// --- guard: KOURBATOV 1309.4053 Table 2 vs A113274/A113275, records 1..72 ---
for (let i = 0; i < 72; i++) {
  const [start, next, gap] = KO13[i];
  if (gap !== GAP[i]) throw new Error('KO13 gap != A113274 at record ' + (i + 1) +
    ': ' + gap + ' vs ' + GAP[i]);
  if (start !== START[i]) throw new Error('KO13 start != A113275 at record ' + (i + 1) +
    ': ' + start + ' vs ' + START[i]);
  if (next !== start + gap) throw new Error('KO13 next != start+gap at record ' + (i + 1));
}

// --- guard: the merit convention, all 82 rows -------------------------------
// merit = 1.32032363 * INT_start^next dt/ln^2 t  (Simpson, 20000 panels)
const TWO_C2_LUHN = 1.32032363;
function meritInt(a, b) {
  const n = 20000, h = (b - a) / n;
  let s = 0;
  for (let i = 0; i <= n; i++) {
    const t = a + i * h, w = (i === 0 || i === n) ? 1 : (i % 2 ? 4 : 2);
    s += w / Math.pow(Math.log(t), 2);
  }
  return TWO_C2_LUHN * s * h / 3;
}
let worstDev = 0, worstRank = 0;
for (const r of LUHN) {
  const calc = meritInt(Number(r[2]), Number(r[3]));
  const dev = Math.abs(calc - r[4]) / r[4];
  if (dev > worstDev) { worstDev = dev; worstRank = r[0]; }
}
if (worstDev > 5e-4) throw new Error('merit convention broken: dev ' + worstDev +
  ' at rank ' + worstRank);

// --- guard: the credit ledger partitions 1..82 exactly ----------------------
const LEDGER = [
  ['Randall L. Rathbun',      1, 41, 1998, 1998],
  ['Marek Wolf',             42, 57, 1999, 1999],
  ['Richard Fischer',        58, 73, 2008, 2008],
  ['Tomás Oliveira e Silva', 74, 75, 2013, 2013],
  ['Robert Smith',           76, 76, 2019, 2019],
  ['Thomas Ritschel',        77, 77, 2019, 2019],
  ['Martin Raab',            78, 82, 2019, 2021]
];
for (const [who, lo, hi, y0, y1] of LEDGER) {
  for (let n = lo; n <= hi; n++) {
    const r = LUHN[n - 1];
    if (r[5] !== who) throw new Error('credit at record ' + n + ': "' + r[5] +
      '" != ledger "' + who + '"');
    if (r[6] < y0 || r[6] > y1) throw new Error('year at record ' + n + ': ' + r[6]);
  }
}

// --- output -----------------------------------------------------------------
console.log('SECOND WITNESSES FOR THE 82 TWIN-GAP RECORDS');
console.log('');
console.log('WITNESS 1 — Luhn, pzktupel.de GAP02 ("Maximal gaps below 1.00*10^17"):');
console.log('  82 rows vs A113274/A113275: gap, start EXACT 82/82; next = start+gap');
console.log('  82/82 (lesser-to-lesser convention verified row-exact)');
console.log('  merit column = 1.32032363 * INT dt/ln^2 t over the gap, reproduced on');
console.log('  all 82 rows; worst deviation ' + (worstDev * 100).toFixed(4) +
  '% at rank ' + worstRank + ' (guard: 0.05%)');
console.log('  records beyond A113274\'s 82: NONE (his table ends at rank 82; the');
console.log('  trusted envelope stays "below 1.00*10^17")');
console.log('');
console.log('WITNESS 2 — Kourbatov arXiv:1309.4053 Table 2 (all maximal twin gaps');
console.log('  in his computation, both endpoints printed):');
console.log('  72 rows vs A113274 records 1..72: gap, start EXACT 72/72; next =');
console.log('  start+gap 72/72. This is the middle-range second witness the recon');
console.log('  asked for: A113274\'s own attribution says terms up to a(72) are');
console.log('  Kourbatov\'s, and his tables paper (unrefereed, arXiv) reproduces them all.');
console.log('');
console.log('THE DISCOVERER LEDGER (Luhn\'s credits; OEIS credits contributors):');
for (const [who, lo, hi, y0, y1] of LEDGER) {
  const yrs = y0 === y1 ? String(y0) : y0 + '-' + y1;
  console.log('  records ' + String(lo).padStart(2) + '-' + String(hi).padEnd(2) +
    '  ' + who.padEnd(24) + yrs);
}
console.log('  (attribution note: A113274 credits a(73)-a(75) to Oliveira e Silva and');
console.log('   a(76)-a(82) to Raab as CONTRIBUTORS; Luhn\'s finder credits differ at');
console.log('   73 (Fischer), 76 (Smith), 77 (Ritschel) — a provenance nuance, not a');
console.log('   numeric conflict)');
console.log('');
console.log('VERDICT: AGREE on every overlapping record, both witnesses; EXTEND: no;');
console.log('CONFLICT: none. The single-witness-tail caveat of a113274-gap-records.js');
console.log('is retired for records 1..72 (three carriers) and softened for 73..82');
console.log('(A113274 + Luhn, shared upstream; forum-witnessed at mersenneforum');
console.log('t=24303, not independently recomputed here).');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/twin-gap-witnesses-01.js
//   invocation:  node research/twin-gap-witnesses-01.js
//   code-sha256: a1c4c5bcddbe37da18c5aae344e394a4d00850e88849ee539f5f50ce04e5ec01
//   out-sha256:  9e139290e33d46041c1a3b7eee1b4aa2d186991bc04f4ab721ea8ab0457a2e73
//   body-lines:  35
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-21
//   elapsed:     0.1 s
// ============================================================================
// SECOND WITNESSES FOR THE 82 TWIN-GAP RECORDS
//
// WITNESS 1 — Luhn, pzktupel.de GAP02 ("Maximal gaps below 1.00*10^17"):
//   82 rows vs A113274/A113275: gap, start EXACT 82/82; next = start+gap
//   82/82 (lesser-to-lesser convention verified row-exact)
//   merit column = 1.32032363 * INT dt/ln^2 t over the gap, reproduced on
//   all 82 rows; worst deviation 0.0115% at rank 81 (guard: 0.05%)
//   records beyond A113274's 82: NONE (his table ends at rank 82; the
//   trusted envelope stays "below 1.00*10^17")
//
// WITNESS 2 — Kourbatov arXiv:1309.4053 Table 2 (all maximal twin gaps
//   in his computation, both endpoints printed):
//   72 rows vs A113274 records 1..72: gap, start EXACT 72/72; next =
//   start+gap 72/72. This is the middle-range second witness the recon
//   asked for: A113274's own attribution says terms up to a(72) are
//   Kourbatov's, and his tables paper (unrefereed, arXiv) reproduces them all.
//
// THE DISCOVERER LEDGER (Luhn's credits; OEIS credits contributors):
//   records  1-41  Randall L. Rathbun      1998
//   records 42-57  Marek Wolf              1999
//   records 58-73  Richard Fischer         2008
//   records 74-75  Tomás Oliveira e Silva  2013
//   records 76-76  Robert Smith            2019
//   records 77-77  Thomas Ritschel         2019
//   records 78-82  Martin Raab             2019-2021
//   (attribution note: A113274 credits a(73)-a(75) to Oliveira e Silva and
//    a(76)-a(82) to Raab as CONTRIBUTORS; Luhn's finder credits differ at
//    73 (Fischer), 76 (Smith), 77 (Ritschel) — a provenance nuance, not a
//    numeric conflict)
//
// VERDICT: AGREE on every overlapping record, both witnesses; EXTEND: no;
// CONFLICT: none. The single-witness-tail caveat of a113274-gap-records.js
// is retired for records 1..72 (three carriers) and softened for 73..82
// (A113274 + Luhn, shared upstream; forum-witnessed at mersenneforum
// t=24303, not independently recomputed here).
// ============================================================================
// READINGS
//
// 1. BOTH WITNESSES AGREE WITH A113274 ON EVERY OVERLAPPING RECORD. Luhn's
//    live GAP02 table: 82/82 records, gap and start exact, next = start+gap
//    row-exact (the lesser-to-lesser convention verified, not assumed).
//    Kourbatov's 1309.4053 Table 2: 72/72 on the shared range. No witness
//    conflicts, none extends past 82; the trusted envelope stays "below
//    1.00*10^17" on Luhn's own certification line.
// 2. THE MERIT COLUMN IS A CONVENTION FINGERPRINT, NOW A GUARD. Luhn's merit
//    is 1.32032363 * INT_start^next dt/ln^2 t — the HL expected twin-pair
//    count across the gap — reproduced on all 82 rows, worst deviation 0.0115%.
//    His 1.32032363 is 2*C2 (KW2019's C_{2,H}); the ZONE-POSTULATE.md SS4
//    notation collision applies. Any future transcription slip in gap or
//    start now throws twice: against A113274 and against the merit.
// 3. THE DISCOVERER LEDGER IS NEW DATA THE OEIS ENTRY DOES NOT CARRY:
//    Rathbun 1-41 (1998), Wolf 42-57 (1999), Fischer 58-73 (2008), Oliveira
//    e Silva 74-75 (2013), Smith 76 / Ritschel 77 (2019), Raab 78-82
//    (2019-2021). OEIS credits CONTRIBUTORS (Kourbatov to a(72), TOS
//    a(73)-a(75), Raab a(76)-a(82)); the two ledgers disagree at 73, 76, 77
//    as roles, not as numbers.
// 4. WHAT THIS RETIRES AND WHAT IT DOES NOT. The single-witness-tail caveat
//    of a113274-gap-records.js is retired for records 1..72 (A113274 +
//    Kourbatov's table + Luhn; TOS's starred rows make a fourth carrier to
//    75 via zonegap-01 CUSTODY 2). For 73..82 the carriers are A113274 +
//    Luhn with shared upstream (mersenneforum t=24303): transcription
//    custody, not independent recomputation — that stays a paper-phase
//    deliverable. Luhn's page and A113274 cite each other, so "two
//    witnesses" here means two live channels, not two computations.
// ============================================================================
