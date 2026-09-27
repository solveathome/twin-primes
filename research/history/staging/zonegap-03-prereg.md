# PREREGISTRATION — Z2(p) in the unswept decade X in (1e11, 1e12], sealed before the ~1 h sweep runs on the incoming box

<!-- ledger
id: Q-zonegap-03-prereg
status: OPEN
todo: none
question: What is Z2(p) in the unswept decade X in (1e11, 1e12]?
verdict: Pre-registration only, sealed before any sweep past X = 1e11 exists: five theorem-grade predictions at sigma = 0 (resting on Z2(p) = env(p) identically, a two-line theorem conditional on the adopted ladder being the true running max) and five blind statistical ones with sigma models and kill rules, scored by the stage-3 embedded output with misses stated first.
-->

*(2026-08-21, committed BEFORE any sweep past X = 1e11 exists anywhere in
this repository. Model and every number below: `research/zonegap-03-model.js`
(code-sha256 `94361acf23fa9c5a9265581f5cb499a4a7c3a33c37dc9785918057865657c59c`,
out-sha256 `805cbcbeda6fdbfbb7ce522e1165492cb902cf7e9b5844fce25866c57787dffc`,
embedded 2026-08-21), fitted on the X <= 1e11 sweep
(`research/zonegap-01.js`, embedded, 27,292 zones) plus the ADOPTED tables
only — A113274/A113275 (82 records, `research/a113274-gap-records.js`) and
the Oliveira e Silva first-occurrence table
(`research/tos-twin-gaps-1e16.txt`). Nothing here touches unpublished data,
and no sweep beyond 1e11 was run, priced (315.7 s at 1e11, ~1 h at 1e12), or
peeked at. Scoring document: the embedded OUTPUT of the stage-3 sweep at
X = 1e12, no re-interpretation; misses stated first in the scoring note.)*

## The model this prereg comes from, in one paragraph

zonegap-01's per-zone series Z2(p) is not statistically correlated with the
record ladder — it IS the record ladder: Z2(p) = env(p) (the largest A113274
record wholly below p'^2) IDENTICALLY, a two-line theorem conditional only on
the adopted ladder being the true running max. The premise (the env record's
start exceeds p) holds at all 27,292 swept zones and, via s_k^2 > e_{k+1} at
every ladder transition from record 3 on, at every zone of every sweep the
published ladder covers (to e_82 = 7.05e16). The model reproduced every Z2
aggregate in zonegap-01's embedded output digit for digit — 204 equality
assertions, zero free parameters, no twin data. Consequence, and the honest
headline of this prereg: **every Z2 quantity the brief asked to predict is
custody, not statistics — its sigma is 0** and a miss is a custody event
(engine defect or a wrong published record), never model noise. The residual
statistical objects are the record process (KW-null-calibrated in the model
script, controls in-pass) and the boundary fields (head; run-correlation
handled). Predictions are grouped accordingly.

## Group T — theorem-grade, sigma = 0 (adopted tables + primes, nothing else)

- **T1. Zones.** 78,497 zones at X = 1e12 (p = 2 .. 999,979); 51,205 new
  zones, p in [316,223, 999,979]. Kill: any other count.
- **T2. Records and envelope.** The running-max ladder at 1e12 equals
  A113274 records 1..49: exactly **8 new records** (42..49) enter, and the
  envelope value at the sweep top is **11,388**. The 8 new envelope-step rows
  are, exactly (p, Z2, gapStart, u, rec#):

      366103    8994  134037421667   0.9999   42
      445321    9312  198311685749   0.9999   43
      472319    9318  223093059731   1.0000   44
      594551   10200  353503437239   1.0000   45
      696271   10338  484797803249   1.0000   46
      799003   10668  638432376191   1.0000   47
      885679   10710  784468515221   1.0000   48
      891409   11388  794623899269   1.0000   49

  Kill: any deviation in any field. Z2 > env at any zone = a missed
  published record (adoption void, report upstream); Z2 < env is impossible
  while s_42 = 1.34e11 >> p_max = 1e6.
- **T3. Z2 = env fraction: 1.0000 at all 78,497 zones.** Sigma = 0 by the
  theorem. Kill: one zone off.
- **T4. Whole-sweep staircase functionals at 1e12** (zones with p >= 100,
  n = 78,472): power-fit exponent **e = 3.332** (same estimator as
  zonegap-01; match to 3 decimals), mean u = **0.7913** (4 decimals),
  u deciles exactly **[0 0 1767 2105 1935 3878 8013 14607 23082 23085]**.
  Kill: any digit.
- **T5. Bands at 1e12.** The `1e5-p.5` band is NOT an identical reprint:
  zone p = 316,223 joins it (17,701 zones; printed c3 stays 3.930 ± 0.219).
  New band [316228, 1e6): 51,204 zones, c3 = **4.182 ± 0.132**, mean
  u = 0.836, frac u>0.8 = 0.690, worst Z2/width = 1/1.24e+7. Full decade
  [1e5, 1e6): 68,905 zones, c3 = 4.117 ± 0.193, mean u = 0.808,
  frac u>0.8 = 0.631. (zonegap-01.js hard-codes its band edges at e = 5, so
  a 1e12 run of THAT producer prints no [316228, 1e6) row; these numbers
  score against whichever producer prints the band, else through T4.)
  Kill: any value off at the printed precision.

## Group S — statistical, blind, each with its sigma model and kill rule

The head field is run-correlated (~10.1 consecutive zones share their first
pair), so every sigma below uses n_eff = 5,076 pairs, not 51,205 zones — the
correlation zonegap-01's misses paid for is priced in, not assumed away.

- **S1. New-band head.** Mean head/ln^2 p over the new band [316228, 1e6):
  **0.7275 ± 0.0155** (deficit model (1/(2C2) - h)·ln p = 0.398 ± 0.150
  fitted on bands 10^4 and 1e5-p.5; sampling on n_eff). Sealed band
  (3-sigma): **[0.681, 0.774]**. Kill: outside.
- **S2. Whole-sweep head at 1e12** (p >= 100; scores against the printed
  HEAD line of the current producer): mean head/ln^2 p = **0.7259 ± 0.0101**,
  sealed 3-sigma **[0.696, 0.756]**. Kill: outside.
- **S3. Worst head vs the 0.76 ln^3 p ceiling at height p.** New-zone max
  (Exp-head model, run-corrected): median 0.640, 95% band [0.520, 0.879].
  Whole-sweep worst at 1e12 = max(0.7218, new-zone max): **P(stays 0.7218)
  = 0.80**; sealed: whole-sweep worst in **[0.7218, 0.90]** and the guard
  (< 1) holds. Kill: outside [0.7218, 0.90] kills the Exp-head model; >= 1
  kills the guard (a publishable event on its own).
- **S4. Twin pairs to 1e12: 1,870,593,490 ± 26,264** (two-point HL
  calibration, ratio 1.000046 at 1e10 -> 1.000032 at 1e11, extrapolated
  1.000018). Sealed 4-sigma: **[1,870,488,435, 1,870,698,545]**. Honesty
  note: pi2(1e12) is published in the literature but sits in no adopted
  table of this corpus; this seal tests the sigma machinery, and scores
  only against the sweep's own printed count. Kill: outside.
- **S5. Postulate, refined.** Minimum in-zone pair count stays 2 (at p = 2);
  single-pair zones stay 0. Conjecture-grade; a miss is mathematics news,
  not model noise.

## What is deliberately NOT predicted

No blind record-process prediction exists below e_82 = 7.05e16: the
published ladder covers the whole reachable range (that is Group T's whole
point). The record-process statistics (rate 2.562 per ln x vs null
2.356 ± 0.304; trend-load location deficit A = 0.9295 vs null
0.9895 ± 0.0182; records-per-decade sigma 5.33 ± 2.11 with the observed 8 in
(1e11, 1e12] at 1.3 null-sd) are calibration, validatable only beyond 1e17.
The tail field has no per-zone data in the embedded corpus and is not
predicted.

## Scoring rule

T1-T5 and S1-S5 each score pass/fail against the stage-3 embedded OUTPUT at
X = 1e12, no re-interpretation; conditional rows (T5's new band) score only
if a producer prints them. Group T misses are CUSTODY events and trigger the
named diagnosis paths, not band widening. Result goes in a
`research/history/staging/zonegap-03-*.md` scoring note with misses first.
