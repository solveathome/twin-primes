// ============================================================================
// ATTACK 2 — HEAD-BIAS PROFILE: is the start of the period twin-poor?
// ============================================================================
// ⚠ SUPERSEDED IN PART (2026-08-17 audit). Two of the three readings below have
// been overtaken and the file is kept unedited beneath this banner per house
// rule, so the refutations stay visible:
//   READING 1's closing claim "at fixed x the ratio tends to INFINITY with the
//   level" is REFUTED. C(x) is not frozen: once p_n climbs through x the twins
//   below p_n are killed by their own primes. The head ratio is capped at
//   e^{2gamma} ~ 3.17 and then crashes to 0. Corrected in attack-10's own
//   CORRECTION block and formalized in research/anchored-windows.md section 3.
//   The rising trend measured here (1.09 -> 1.42 at x=316) is real; only the
//   limit was wrong.
//   READING 3's open question is CLOSED. The dip constant is e^{2gamma}/4 =
//   0.79305, not the single-prime Mertens constant e^gamma/2 = 0.8905; the
//   0.895-0.899 measured here is a finite-size blend of the crystallized zone
//   with the kill shadow. See research/anchored-windows.md section 4, and
//   attack2-05-07-integral-ladder.js for the curve that produces both.
//   READING 2, the p^3 equidistribution law, stands AS A SCALE and not as a
//   precision: it is the u >= 3 branch of the Unification Law, and the lock-in
//   is at p^3, but the "1.000 to three decimals" the reading claimed is a
//   factor of a few early. Scored against this file's own table on 2026-08-20:
//   the worst checkpoint at or past p^3 is 1.006. Reading 2 is rewritten below
//   with the deviations it actually supports; anyone quoting the 2026-08-17
//   "stands" should carry that qualification with it.
// ============================================================================
// Script 01 showed the zone gets only ~0.79-0.90x its fair share. Here we map
// the whole curve: cumulative twin-slot count C(x) in [0, x] vs the global
// expectation delta*x, for log-spaced x across the period, at several levels.
// Question: where does the head bias live, how deep is it, where does it die?
// ============================================================================

const PR = [2,3,5,7,11,13,17,19,23];
function run(upto) {
  const idx = PR.indexOf(upto);
  let P = 1; for (let i = 0; i <= idx; i++) P *= PR[i];
  const bad = new Uint8Array(P);
  for (let i = 0; i <= idx; i++) {
    const p = PR[i];
    for (let j = 0; j < P; j += p) bad[j] = 1;
    for (let j = ((p-2)%p+p)%p; j < P; j += p) bad[j] = 1;
  }
  let D = 1; for (let i = 1; i <= idx; i++) D *= PR[i] - 2; // prod(p-2)
  const delta = D / P;
  // cumulative ratio at log-spaced checkpoints
  const checks = []; for (let x = 100; x < P; x = Math.ceil(x * 3.16)) checks.push(x);
  checks.push(P);
  let c = 0, ci = 0; const out = [];
  for (let r = 0; r < P; r++) {
    if (!bad[r]) c++;
    if (r + 1 === checks[ci]) { out.push(`x=${checks[ci]}: ${(c/(delta*checks[ci])).toFixed(3)}`); ci++; }
  }
  console.log(`p=${upto}  P#=${P}  delta=${delta.toExponential(3)}\n  C(x)/(delta*x): ${out.join('  ')}`);
}
for (const p of [13, 17, 19, 23]) run(p);

// ============================================================================
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/attack-02-head-bias.js
//   invocation:  node research/attack-02-head-bias.js
//   code-sha256: 849db39f13809ad2251f8fd87296837a6ca2f84e2208013b58ad8cfd89023375
//   out-sha256:  2dcb6d94e61976ee1d9aa93c576e1d958f61676ebc95b00138c8ee0fe1dab7ec
//   streams:     stdout
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     1.3 s
// ============================================================================
// p=13  P#=30030  delta=4.945e-2
//   C(x)/(delta*x): x=100: 1.011  x=316: 1.088  x=999: 0.951  x=3157: 0.999  x=9977: 1.001  x=30030: 1.000
// p=17  P#=510510  delta=4.363e-2
//   C(x)/(delta*x): x=100: 0.917  x=316: 1.160  x=999: 0.895  x=3157: 0.973  x=9977: 1.006  x=31528: 1.000  x=99629: 1.000  x=314828: 1.000  x=510510: 1.000
// p=19  P#=9699690  delta=3.904e-2
//   C(x)/(delta*x): x=100: 1.025  x=316: 1.297  x=999: 0.897  x=3157: 0.966  x=9977: 1.001  x=31528: 0.998  x=99629: 1.000  x=314828: 1.000  x=994857: 1.000  x=3143749: 1.000  x=9699690: 1.000
// p=23  P#=223092870  delta=3.565e-2
//   C(x)/(delta*x): x=100: 1.122  x=316: 1.420  x=999: 0.899  x=3157: 0.951  x=9977: 1.007  x=31528: 1.000  x=99629: 1.001  x=314828: 1.000  x=994857: 1.000  x=3143749: 1.000  x=9934247: 1.000  x=31392221: 1.000  x=99199419: 1.000  x=223092870: 1.000
// READINGS — three new learnings:
// 1. THE HEAD IS ENRICHED, NOT STARVED — AND THE ENRICHMENT GROWS WITH LEVEL.
//    At fixed small x the ratio RISES with n (x=316: 1.09 -> 1.16 -> 1.30 ->
//    1.42): the head holds crystallized actual twins at fixed density while
//    the global average delta keeps diluting by (p-2)/p. Anchoring in action —
//    at fixed x the ratio tends to INFINITY with the level. The origin is the
//    safest place in the pattern, opposite to the conspiracy's needs.
// 2. CUMULATIVE EQUIDISTRIBUTION LOCKS AT ~p^3, TO ABOUT 0.006 — NOT TO THREE
//    DECIMALS (rewritten 2026-08-20 against the table above; see the note at
//    the foot of this file). At the first checkpoint at or past p^3 the ratio
//    reads: p=13 (p^3 = 2197) x=3157: 0.999; p=17 (4913) x=9977: 1.006;
//    p=19 (6859) x=9977: 1.001, then x=31528: 0.998; p=23 (12167) x=31528:
//    1.000. So the ratio is within 0.006 of 1 from x ~ p^3, within 0.002 from
//    ~3p^3, and EVERY printed checkpoint from ~10p^3 upward reads 1.000 at
//    every one of the four levels. The scale of the lock-in is the finding and
//    it is p^3; the three-decimal precision belongs a factor of a few later.
//    Empirical law worth testing at higher levels: head windows [0, x] are
//    fair to O(10^-3) once x >~ p^3 and to the printed precision once
//    x >~ 10 p^3. (For comparison, the provable-by-counting threshold is
//    exponential; p^3 would be a dream.) Prior art: this is the u >= 3 branch
//    of the Unification Law, whose omega(u) is Buchstab's function — the
//    measurement is ours, the curve is not new.
// 3. THE UNIVERSAL DIP: the minimum of the curve sits near x~10^3 with depth
//    stabilizing at ~0.895-0.899 — suspiciously close to e^gamma/2 = 0.8905,
//    the SINGLE-prime Mertens bias, not its square 0.79. Open question: is
//    the cumulative-from-0 dip governed by the single-prime constant (mixture
//    of crystallized + fresh territory), unlike the window-at-p^2 bias of
//    script 01? Unresolved; worth a dedicated derivation.
// ============================================================================
// ---------------------------------------------------------------------------
// FIGURE PROVENANCE (added 2026-08-20, readings-traceability pass). What every
// figure in the readings above that the embedded run does not contain
// verbatim actually is. No number above was changed. The 2026-08-17 banner at
// the top of this file already refutes reading 1's infinite limit and closes
// reading 3's open question; this note is about traceability only and does not
// revisit either.
//
// ROUNDINGS of a value this file's own embedded run prints (printed value
// first):
//   1.088 -> 1.09 and 1.297 -> 1.30, the x=316 column at p=13 and p=19,
//   quoted in reading 1's rising sequence. The other two entries in that
//   sequence, 1.160 and 1.420, are printed as written.
//
// TOKENIZER ARTIFACT, not a figure:
//   -0.899 is the tail of the hyphenated range "0.895-0.899" in reading 3.
//   Both endpoints are printed: 0.895 at p=17 x=999 and 0.899 at p=23 x=999.
//
// DEFINITION / LITERATURE constants:
//   0.8905 is e^gamma/2 = 0.890536, the single-prime Mertens constant, and
//   0.79 is its square e^{2gamma}/4 = 0.793055. Both are also stated in this
//   file's header. Neither is a measurement, and the banner records that the
//   dip constant is the second of the two, not the first.
//   5000 and 12000 in reading 2 are the reading's own round versions of
//   17^3 = 4913 and 23^3 = 12167. Neither is a checkpoint of the run: the
//   checkpoints are log-spaced by a factor 3.16 from x=100 and land at 3157,
//   9977, 31528.
//
// CORRECTED 2026-08-20 (mismatch adjudication #50). Reading 2 used to say the
// ratio "is 1.000 (to 3 decimals) for all x >= ~p^3 at every level". The
// printed table above does not support that at the first checkpoint past p^3
// in three of the four levels, and the claim has been rewritten to what the
// table does support. Scored here, checkpoint by checkpoint:
//   p=13, p^3 = 2197  -> x=3157: 0.999, x=9977: 1.001, x=30030: 1.000
//   p=17, p^3 = 4913  -> x=9977: 1.006, then 1.000 at 31528 and everywhere up
//   p=19, p^3 = 6859  -> x=9977: 1.001, x=31528: 0.998, then 1.000 up
//   p=23, p^3 = 12167 -> x=31528: 1.000, x=99629: 1.001, then 1.000 up
// Worst deviation from x >= p^3: 0.006 (p=17 at x=9977 = 2.03 p^3). Worst
// from x >= 3p^3: 0.002. From x >= 10p^3 every printed value at every level is
// 1.000. Old -> new: "1.000 (to 3 decimals) for all x >= ~p^3" -> "within
// 0.006 of 1 from x ~ p^3, within 0.002 from ~3p^3, 1.000 from ~10p^3". The
// LOCK-IN AND ITS SCALE SURVIVE; the precision does not, and the 2026-08-17
// audit banner that recorded reading 2 as the one leg still standing has been
// requalified in place to say so. ATTACKS.md row 2 carries the same
// qualification. Note also 5000 and 12000 in the old reading were its own
// round versions of 17^3 = 4913 and 23^3 = 12167 and were never checkpoints;
// the rewrite uses the exact cubes and the real checkpoints.
// ---------------------------------------------------------------------------
