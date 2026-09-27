# PREREG — the records 76–82 placement probe (Z6): the uniform band sealed before any fraction is computed

<!-- ledger
id: Q-records-placement
status: ANSWERED
todo: Z6 (retired)
question: Do the seven unswept twin-gap records 76-82, above 2^53, land uniformly inside their stretches, or is there square-anchor coupling in record-start placement?
verdict: Sealed alone before the producer existed: the uniform band, the fixed definitions, the registered readings, the calibration abort gate and the riders are all fixed here and no placement fraction, q or stretch boundary was evaluated; scored in records-placement-01.md.
-->

*(2026-08-22. Committed ALONE before the producer
`research/records-placement-01.js` exists. Nothing below was computed:
the seven record starts were READ from the adopted ladder
(`research/a113274-gap-records.js`, A113275 b-file, series rule) to
confirm they exceed 2^53; no placement fraction, no q, no stretch
boundary has been evaluated. Frame: stretch-01 §5's cheapest falsifiable
probe — extend SEC C3's placement measurement to the seven records the
2^53 cutoff excluded.)*

## The question

Do the seven unswept record gaps (records 76–82, starts 1.29e16..7.05e16)
sit uniformly inside their stretches, like the 75 records already
measured (mean placement fraction 0.479 vs null 0.5, stretch-01 §4), or
do they cluster against the stretch boundaries — which would be the first
measured square-anchor coupling anywhere in this corpus?

## Fixed definitions

- For record start F (the lesser twin opening the record gap, A113275):
  q = the largest prime with q² ≤ F, q′ the next prime; the placement
  fraction is f = (F − q²)/(q′² − q²) ∈ [0, 1). Identical to stretch-01
  SEC C3's convention.
- The null: f uniform on [0, 1), independent across records.

## Registered readings

- **READ-1 (mean of the 7).** Null: 0.5, sd of the mean 1/√84 = 0.109.
  MEAN-SHIFT flags iff the mean lands outside 0.5 ± 2·0.109 =
  [0.282, 0.718].
- **READ-2 (boundary clustering).** Count of the 7 fractions in the outer
  deciles [0, 0.1) ∪ [0.9, 1). Null: Binomial(7, 0.2), expectation 1.4.
  CLUSTERING flags iff the count is ≥ 4 (null tail P ≈ 0.033). The side
  split (low vs high decile) is reported descriptively either way.
- **READ-3 (the pooled decade).** Pooled mean over all 82 records. Null
  band 0.5 ± 2/√(12·82) = [0.436, 0.564]. Inside with no READ-2 flag =
  the square-blindness measurement closes its fourth decade
  (heights to 7.05e16).
- **Descriptive only, no flag:** the prime-square containment count for
  records 76–82 (a record interval [F, F + gap] containing a prime
  square) against its computed null expectation — at these heights the
  expectation is near zero and the statistic has no power; it is reported
  because SEC C3 reported its analogue, not scored.

## Calibration gate (abort before any new figure prints)

The producer must first recompute the 75 known placement fractions and
reproduce stretch-01 §4's cited mean 0.479 (3 decimals); assert record 41
= gap 8040 at start 65095731749 (the in-house custody anchor); assert all
seven new starts exceed 2^53 (the reason they were unswept); assert every
computed fraction lies in [0, 1) and that q² ≤ F < q′² holds in BigInt at
every record.

## Riders

Whatever fires, no reading here is a Z₂ bound or a TPC claim; the record
ladder tail is single-witness and trusted under the series rule
(in-house verification is a paper-phase deliverable); Route B stays
closed. Results are HELD for the end-of-day roundup.
