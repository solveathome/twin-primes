// ============================================================================
// THE TWIN-GAP RECORD LADDER ADOPTED AS TRUSTED DATA — A113274 + A113275,
// ALL 82 PUBLISHED RECORDS, AND THE 0.76 ln^3 p GUARD READ RECORD-EXACT
//
// Question: ZONE-POSTULATE's guard against the postulate being tight — the
// first-twin distance grows like polylog while the window grows like p^2,
// with Kourbatov's published ceiling "maximal gaps between twin primes are
// less than 0.76 log^3 p" — was argued on eleven in-house decades (largest
// extreme 8,042 at p = 65,095,731,749) plus four decade-slopes quoted to
// 10^15. The full record ladder is published. What does the guard read like
// on every known record, record-exact instead of slope-summarised?
//
// Provenance of the trusted series, read at the OEIS entries 2026-08-20:
//   A113274   record gaps between twin primes (gap = lesser to lesser).
//             B-file: Martin Raab, n = 1..82; terms up to a(72) from Alexei
//             Kourbatov, a(73)-a(75) from Tomas Oliveira e Silva, a(76)-a(82)
//             from Raab. Largest record 35,640.
//   A113275   lesser of the twin pair STARTING each record gap (same n).
//             B-file: Raab, first 75 terms from Max Alekseyev.
// Convention, checked three ways below: the gap is measured lesser-to-lesser
// (a(1) = 2 from 3,5 -> 5,7); a(n) = 0 mod 6 for n > 1 (entry comment); and
// our own eleven-decade run's extreme is record n = 41 — same start prime,
// gap 8,040 = our 8,042 minus 2, because ZONE-POSTULATE measured to the
// UPPER member of the arriving pair. A +-2 convention shift reported as an
// extension would be worse than a miss; it is asserted, not assumed.
//
// Honest doubt: the b-file tails are single-witness per range (Kourbatov /
// Oliveira e Silva / Raab), trusted under the series rule of 2026-08-20;
// in-house verification is a paper-phase deliverable. The first 21 records
// are recomputed here from a direct sieve (an in-house custody anchor, the
// same role the 14-term overlap plays in a144311-full-ladder.js).
//
// Start primes a(76)..a(82) exceed 2^53, so both series are BigInt; logs go
// through Number() only inside Math.log, where the rounding is ~1e-16
// relative and far under the 4 figures quoted. Runtime: ~2 s (the sieve).
// ============================================================================
'use strict';

// A113274 verbatim (record gaps, lesser to lesser), b-file 2026-08-20:
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
// A113275 verbatim (lesser twin starting each record gap):
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

// --- transcription and convention guards ------------------------------------
if (GAP.length !== 82 || START.length !== 82) throw new Error('term counts');
for (let i = 1; i < 82; i++) {
  if (GAP[i] % 6n !== 0n) throw new Error('a(' + (i + 1) + ') not 0 mod 6');
  if (GAP[i] <= GAP[i - 1]) throw new Error('gaps not increasing at n=' + (i + 1));
  if (START[i] <= START[i - 1]) throw new Error('starts not increasing at n=' + (i + 1));
}
// the in-house eleven-decade extreme (ZONE-POSTULATE.md): p = 65,095,731,749,
// distance to the next twin's UPPER member 8,042. Must be record n = 41.
if (START[40] !== 65095731749n || GAP[40] !== 8040n || GAP[40] + 2n !== 8042n)
  throw new Error('in-house extreme does not match record 41 — convention broken');

// recompute the first 21 records from a direct sieve (starts < 1.2e7):
{
  const N = 15000000;
  const s = new Uint8Array(N + 1);
  for (let i = 2; i * i <= N; i++) if (!s[i]) for (let j = i * i; j <= N; j += i) s[j] = 1;
  const lesser = [];
  for (let i = 3; i + 2 <= N; i += 2) if (!s[i] && !s[i + 2]) lesser.push(i);
  let rec = 0, k = 0;
  for (let i = 1; i < lesser.length; i++) {
    const g = lesser[i] - lesser[i - 1];
    if (g > rec) {
      rec = g;
      if (k < 21) {
        if (BigInt(g) !== GAP[k] || BigInt(lesser[i - 1]) !== START[k])
          throw new Error('sieve record ' + (k + 1) + ' mismatch: gap ' + g + ' at ' + lesser[i - 1]);
        k++;
      }
    }
  }
  if (k !== 21) throw new Error('sieve found only ' + k + ' of 21 records');
}

// --- the guard, record by record --------------------------------------------
// Kourbatov's ceiling is evaluated at the prime ENDING the gap; here that is
// the lesser of the arriving pair, p_end = START + GAP.
const rows = [];
for (let i = 0; i < 82; i++) {
  const pEnd = START[i] + GAP[i];
  const ln = Math.log(Number(pEnd));
  const ceil = 0.76 * ln * ln * ln;
  rows.push({ n: i + 1, gap: GAP[i], pEnd, load: Number(GAP[i]) / ceil,
              margin: Number(pEnd) / ceil });
}

console.log('THE 82 TWIN-GAP RECORDS AGAINST THE PUBLISHED GUARD 0.76 ln^3 p');
console.log('guards: mod 6 81/81, strictly increasing 82/82, in-house extreme = record 41,');
console.log('        first 21 records recomputed by direct sieve: EXACT');
console.log('');
console.log('   n         gap                p_end     gap/(0.76 ln^3 p)');
for (const r of rows) {
  if (r.n <= 3 || r.n % 10 === 0 || r.n >= 73 || r.n === 41 || r.n === 75) {
    console.log(String(r.n).padStart(4) + '  ' + String(r.gap).padStart(10) + '  ' +
      String(r.pEnd).padStart(21) + '  ' + r.load.toFixed(4).padStart(12));
  }
}
console.log('  (all 82 checked; table shows every tenth, the head, the in-house');
console.log('   anchor n = 41, and the tail)');
console.log('');
const worst = rows.reduce((a, b) => (b.load > a.load ? b : a));
console.log('records above the ceiling: ' + rows.filter(r => r.load >= 1).length + ' of 82');
console.log('worst load: ' + worst.load.toFixed(4) + ' at n = ' + worst.n +
  ' (gap ' + worst.gap + ', p_end ' + worst.pEnd + ')');
const last = rows[81];
console.log('last record: gap ' + last.gap + ' at p_end ' + last.pEnd +
  ', load ' + last.load.toFixed(4));
console.log('window over guard at the last record: p^2/(0.76 ln^3 p) = ' +
  (Number(last.pEnd) * last.margin).toExponential(2) + '  (the margin that runs away)');
const loads10 = rows.filter(r => r.load > worst.load - 0.1).length;
console.log('records within 0.1 of the worst load: ' + loads10 + ' of 82');

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/a113274-gap-records.js
//   invocation:  node research/a113274-gap-records.js
//   code-sha256: ce36ef40ad2faa0871565627ecca4478eb9cc04e35a81b552bd00f0fcb886eab
//   out-sha256:  008ad4855d217fc2476843c5b3a72b3dbea775e4dc0ceba49682b3c4eccd5b08
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     0.1 s
// ============================================================================
// THE 82 TWIN-GAP RECORDS AGAINST THE PUBLISHED GUARD 0.76 ln^3 p
// guards: mod 6 81/81, strictly increasing 82/82, in-house extreme = record 41,
//         first 21 records recomputed by direct sieve: EXACT
//
//    n         gap                p_end     gap/(0.76 ln^3 p)
//    1           2                      5        0.6312
//    2           6                     11        0.5726
//    3          12                     29        0.4135
//   10         210                   6089        0.4176
//   20        1530                4871441        0.5513
//   30        3480              255953429        0.6310
//   40        7980            43725670601        0.7139
//   41        8040            65095739789        0.6853
//   50       11982          1246446383771        0.7298
//   60       16362         23275487681261        0.7384
//   70       22548        450811253565767        0.7723
//   73       25230       1149418981435409        0.7960
//   74       26268       2543288406415499        0.7744
//   75       28842       2797282815510341        0.8434
//   76       31302      12914226879347819        0.8067
//   77       31482      16155559543356239        0.7969
//   78       31512      37338553629149609        0.7462
//   79       31920      37962553054449467        0.7549
//   80       33042      38617975949249129        0.7804
//   81       34692      52000545890794841        0.8005
//   82       35640      70478530884413021        0.8032
//   (all 82 checked; table shows every tenth, the head, the in-house
//    anchor n = 41, and the tail)
//
// records above the ceiling: 0 of 82
// worst load: 0.8434 at n = 75 (gap 28842, p_end 2797282815510341)
// last record: gap 35640 at p_end 70478530884413021, load 0.8032
// window over guard at the last record: p^2/(0.76 ln^3 p) = 1.12e+29  (the margin that runs away)
// records within 0.1 of the worst load: 18 of 82
// ============================================================================
// READINGS
//
// 1. THE TRUST'S GATES PASSED, THREE OF THEM. The entry's own invariant (all
//    records past the first are 0 mod 6) holds 81/81; both series are
//    strictly increasing as a record ladder must be; the first 21 records
//    are recomputed exactly by a direct sieve; and the eleven-decade run's
//    extreme (ZONE-POSTULATE.md) is record n = 41 with gap 8,040 — our
//    in-house figure differs by exactly 2, the measurement convention
//    (lesser-to-lesser here, lesser-to-upper there), caught at the record
//    instead of shipped as a phantom extension.
// 2. THE GUARD HOLDS AT EVERY RECORD EVER PUBLISHED: 0 of 82 reach
//    Kourbatov's ceiling 0.76 ln^3 p. The worst load is 0.8434 (record 75,
//    gap 28,842) and the last record's is 0.8032. The guard check moves
//    from eleven in-house decades summarised by four slopes to record-exact
//    coverage six decades further, and the postulate-side margin at the
//    last record is p^2/(0.76 ln^3 p) = 1.12e+29.
// 3. THE LOAD CREEPS, WHICH IS KOURBATOV'S OWN READING, NOT A SURPRISE. 18
//    of 82 records sit within 0.1 of the worst load, all in the ladder's
//    upper half, and his two formulas are asymptotically equal, so the load
//    should drift toward 1 from below without crossing. Record-exact data
//    shows exactly that shape: a slow rise with local dips, never a breach.
// 4. WHAT THIS RETIRES: ZONE-POSTULATE's "nothing in eleven decades hints at
//    the postulate being tight" was true and under-sold — nothing in the
//    entire published record ladder does either, and the sentence there now
//    cites this artifact instead of stopping at our own run.
// 5. LIMITS. Record ranges are single-witness per contributor (Kourbatov to
//    a(72), Oliveira e Silva to a(75), Raab beyond); trusted under the
//    series rule of 2026-08-20, in-house verification a paper-phase
//    deliverable. The ceiling itself is a heuristic (HL-derived, no proof —
//    his own framing), so this is a guard on a guard, not a theorem; and a
//    record ladder bounds FIRST-twin distances only through its records, so
//    the postulate-side reading stays an argument from margin, as before.
// ============================================================================
