# PREREGISTRATION — Z2(p) in the unswept half-decade p in [1e5, 316228)

<!-- ledger
id: Q-zonegap-01-prereg
status: SUPERSEDED
todo: none
question: What is Z2(p) in the unswept half-decade p in [1e5, 316228)?
verdict: Pre-registration only, committed before the X = 1e11 sweep ran: five predictions are sealed on the per-zone distributional structure the published record ladders do NOT determine, with the records excluded from scoring and used as custody instead; the scoring document is the stage-2 embedded output, in zonegap-01.md.
-->

*(2026-08-21, committed BEFORE the X = 1e11 sweep runs. Producer:
`research/zonegap-01.js`. Stage 1 swept X = 1e10, closing every zone with
p < 1e5; the zones with p in [1e5, 316228) — about 17,700 of them — are
untouched by any measurement in this repository. The predictions below are
derived from stage 1 alone and are scored by the stage-2 sweep at X = 1e11,
whose embedded OUTPUT is the scoring document. Stage-1 output sha256:
`15d8e3e38140f1bcc1a51551c5705c2d8bdf378fcb122cb32afee04d56142560`
(`node research/zonegap-01.js 1e10`, 26.5 s, 27,412,679 twin pairs,
9,592 zones).)*

## What is blind and what is not

The A113274 record ladder and the adopted Oliveira e Silva first-occurrence
table cover the target range, so anything the records determine — the
envelope, the maximum Z2, the worst published load — is NOT blind and is
excluded from scoring (it serves as custody instead). What the records do
NOT determine is the per-zone distributional structure: the mean normalized
law constant, the position of the max gap inside its zone, the head slack,
and the estimator's exponent read. Those are the predictions.

## Stage-1 anchors (from the sha-bound output above)

| band | zones | mean c3 = Z2/ln^3 p | mean u | frac u>0.8 | head/ln^2 p | max load |
|---|---|---|---|---|---|---|
| 10^2 | 143 | 3.426 ± 0.497 | 0.623 | 0.315 | 0.942 | 0.7504 |
| 10^3 | 1,061 | 3.681 ± 0.362 | 0.672 | 0.308 | 0.684 | 0.7504 |
| 10^4 | 8,362 | 4.022 ± 0.243 | 0.668 | 0.274 | 0.720 | 0.7432 |

Full-sweep power fit at X = 1e10: measured e = 3.411; the deterministic
E-form truth (a·ln(w/a), a = ln^2(p^2)/2C2) reads e = 3.281 on the same
grid; matched-noise ln^3 control reads 3.000 ± 0.006.

## Predictions, each scored pass/fail in-band

For the band p in [1e5, 316228), as printed by the stage-2 per-band row
`1e5-p.5`, plus one whole-sweep quantity (P5):

- **P1. Mean c3 = Z2/ln^3 p in-band: [4.05, 4.35].** Mechanism: the c3
  drift is the E-form's own ln(w/a) growth (decade increments +0.255,
  +0.341 measured; E-form predicts c3 ≈ 4.53 at the band mid with the
  measured/E-form ratio sitting at 0.90–0.92, giving ≈ 4.2).
- **P2. Mean u in-band: [0.63, 0.71]; fraction with u > 0.8: [0.21, 0.33].**
  The position distribution is right-loaded and roughly band-stable at
  stage 1.
- **P3. Mean head/ln^2 p in-band: [0.64, 0.80].** The head is a mean-gap
  object (HL coefficient 1/(2C2) = 0.757), not a max object.
- **P4. Max Kourbatov load in-band: [0.66, 0.80]** (in particular < 1; the
  guard holds). Record loads creep toward 0.84 six decades up; in-band
  maxima at stage 1 sit at 0.74–0.75.
- **P5. Whole-sweep power exponent at X = 1e11: [3.38, 3.48]**, and it
  reads ABOVE the same-grid E-form control by at least 0.08 (at 1e10 the
  excess is 0.130; at 1e8 it was 0.000 — the excess is predicted to
  persist, i.e. the measured law is steeper than the E-form family, the
  Kourbatov "steeper trendline" creep in zone coordinates).

## Scoring rule

Each of P1–P5 scores pass/fail against the stage-2 embedded OUTPUT of
`research/zonegap-01.js -- 1e11`, no re-interpretation. P2 counts as one
prediction (both halves must land). Result goes in
`research/history/staging/zonegap-01.md` with misses stated first.
