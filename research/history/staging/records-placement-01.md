# The seven unswept records land uniform: the square-blindness measurement extends by a factor 25 into the decade above 1e16, and a transcription defect dies at the calibration gate

<!-- ledger
id: Q-records-placement
status: ANSWERED
todo: Z6 (retired)
question: Do the seven unswept twin-gap records 76-82, above 2^53, land uniformly inside their stretches, or is there square-anchor coupling in record-start placement?
verdict: Uniform-consistent on the two registered readings that had power; READ-3 is vacuous (its reachable range sat inside its own band), so the probe's content is READ-1 and READ-2.
-->

*(2026-08-22. Staging note; nothing here is integrated into a live document.
HELD for the end-of-day adversarial roundup. Producer, formally embedded:
`research/records-placement-01.js` (0.0 s; `--check` passes bit-honest; the
tail carries a forced re-embed stamp from a readings rephrase, disclosed
there). Prereg: `records-placement-prereg.md`, SEALED ALONE at `1bc0dd8`
before the producer existed. This executes TODO item Z6, stretch-01 §5's
cheapest falsifiable probe.)*

## 1. The sealed verdict [MEASURED, scored against `1bc0dd8`]

**UNIFORM-CONSISTENT on the two registered readings that had power.** The
seven fresh placement fractions (records 76–82, starts 1.29e16..7.05e16,
all above 2^53): 0.5000, 0.5054, 0.3285, 0.6944, 0.0763, 0.8320, 0.2728.
READ-1's mean-of-seven is 0.4585, inside [0.282, 0.718]; READ-2 finds one
outer-decile point (record 80, low side) against an expectation of 1.4, no
clustering. READ-3, the pooled 82-record mean, reads 0.4773 inside
[0.436, 0.564], but its reachable range over all possible fresh data was
[0.4381, 0.5235]: it could not have fired and is reported as descriptive,
not as a third passed test. The confinement is arithmetic: 75 of the 82
fractions were fixed before the seal and sum to 35.925, and a placement
fraction lies in [0, 1) by construction. The prereg's own conclusion clause
is gated on READ-3, which cannot fail, and on READ-2, so it reduces to
READ-2 alone. **Seven fresh placements are consistent with uniform on both
readings that could have flagged; no square-anchor coupling is detected in
record-start placement at heights 1.29e16 to 7.05e16**, which extends
stretch-01 §4's square-blindness reach by a factor 25, from 2.8e15 to
7.05e16, into the decade above 1e16. The descriptive prime-square
containment count is 0 against an expectation of 3.44e-5 (no power;
unscored, as sealed).

## 2. Calibration and custody [VERIFIED]

The 75 swept records reproduce stretch-01's cited mean 0.479 digit-exact
on the BigInt path; ladder guards pass; records 1..75 starts equal the
sha-checked TOS table's starred rows (independent second witness); record
41 anchors; the seven new starts confirmed above 2^53. All 82 rows of the
extracted GAP and START arrays match the OEIS b-files b113274 and b113275
(fetched 2026-08-28, zero mismatches), so records 76–82 carry a page-level
second witness. The three sealed bands re-derive exactly from the prereg's
own stated nulls ([0.282, 0.718], [0.436, 0.564], P(X >= 4) = 0.0333): no
band moved after the seal. Custody residual, on record: the producer first
exists in git 10m56s after the seal `1bc0dd8`, so "the producer did not
exist at the seal" is unverifiable from git: mitigated, not proven, by the
bands re-deriving from the prereg's own nulls and by the producer
extracting the record arrays from `a113274-gap-records.js` at runtime.

## 3. The defect the gate caught [process, worth its own line]

The first draft transcribed the A113275 array by hand and mistyped record
45's start. The calibration gate failed against the cited 0.479, the diff
located the row, and the producer was rewritten to EXTRACT the arrays from
`a113274-gap-records.js` source at runtime — the two-document wrong
constant (the QC framework's named biggest unguarded class,
`primeoire-qc-framework`) now has no channel in this producer. The
defective draft never printed a result.

## 4. NO CLAIM / NOT REACHED

Seven points close a measurement decade; nothing more. The ladder tail now
carries a page-level second witness (the OEIS b-files, §2) and is no longer
single-witness under the series rule; in-house verification is still
paper-phase. The conditional-null offset test on stretches
q ∈ [10⁴, 3.16·10⁴] (stretch-01 §5's second probe, same cost class)
remains unrun. Route B closed; ρ(2) adverse; no Z₂ bound, no TPC content.

---

*Producer and custody: `research/records-placement-01.js`, embedded,
`--check` bit-honest. Cited, never recomputed: stretch-01 §4's 0.479 and
its 2.8e15 reach, the record-41 anchor, the adopted TOS/A113274 custody.
History layer: process record, staging. See
`research/history/CHANGELOG.md` for the corpus rule.*
