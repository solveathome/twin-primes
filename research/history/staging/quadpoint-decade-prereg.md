# PREREG — the depth-cost decade extension (Z1): registered readings, trend line, and kill rule, sealed before the segmented engine exists

<!-- ledger
id: Q-quadpoint-transplant
status: ANSWERED
todo: Z1 (retired)
question: Does the anchored-cap family transplanted onto the stretch window S_Q certify every anchor, and what does the depth cost do with height?
verdict: Pre-registration for the decade extension, committed ALONE before the segmented producer existed: it fixes the FALL trend line, the registered band readings, the kill rule and a digit-exact calibration gate that must abort before any new figure prints, and states that a falling K*/pool over two decades would still be only a measurement.
-->

*(2026-08-22. This prereg is committed ALONE, before any line of the
producer `research/attack-quadpoint-02.js` is written — the standing rule.
Everything numeric below is cited from the embedded OUTPUT block of
`research/attack-quadpoint-01.js` (code-sha256 6cdada1c..., out-sha256
805f870b...) or derived from those figures by the stated arithmetic.
No new computation was run to write this.)*

## The question

Does the depth-cost fraction K*/pool of the transplanted unified-cap
certificate keep falling over the next decade of anchors, or does it bend
upward — the first signature of a second death of the certificate family?
(`attack-quadpoint-01.md` §4; TODO item Z1.)

## Fixed definitions (identical to the v1 producer's)

- Anchors: primes Q, stretch S_Q = [Q², Q′²); pool = actives 7..Q below
  the cap's prime; K*(Q) = least K with floor_K ≥ 1; K*/pool with
  pool = π(Q) − 3.
- Bands, geometric, fixed now: B6 = (1499, 3163], B7 = (3163, 5623],
  B8 = (5623, 10007]. Band statistic: mean and max of K*/pool over the
  band's anchors, exactly as v1's SEC 3 computed them for
  B3 = [101, 313], B4 = [317, 997], B5 = [1009, 1499].
- Baseline, cited from the embedded v1 output: band means
  m3 = 0.093, m4 = 0.075, m5 = 0.061; band maxes 0.179, 0.128, 0.090;
  absolute K* means 3.88, 8.42, 12.20; max K* anywhere = 21.
- Engine cap, disclosed now: the segmented producer will cap the
  per-candidate pool scan at KCAP = 64 for Q > 1499 (exact floors for all
  K ≤ 64). Any anchor with K* > 64 is therefore reported as a bound, and
  fires READ-3 automatically.

## Registered trend line (FALL hypothesis)

Linear-in-ln Q extrapolation of the three cited band means against
geometric band centers (ln 178, ln 562, ln 1230 → slope −0.0166 per unit
ln Q). This is a trend line, not a model:

- m6 forecast 0.051 ± 0.012 (center 2178)
- m7 forecast 0.041 ± 0.012 (center 4217)
- m8 forecast 0.031 ± 0.012 (center 7500)

## Registered readings and the kill rule

- **READ-1 (shape).** BEND fires if m_{i} > m_{i−1} for two consecutive
  bands in {B6, B7, B8} against their predecessors, OR if m8 ≥ m5
  (= 0.061). BEND = the depth-family's promise is dying; Z2's analytic
  investment is re-scoped to wall-location only.
- **READ-2 (trend).** FALL-consistent fires if all of m6, m7, m8 land
  inside their ± bands above AND the shape is monotone non-increasing
  within bands' own spread. FALL-consistent = proceed to Z2 with these
  constants as the reproduction target.
- **READ-3 (sup / second-death detector).** Cited baseline: band maxes
  fell 0.179 → 0.128 → 0.090. A band max RISING above its predecessor,
  any K* > 64 (KCAP), or any anchor with no K ≤ pool achieving floor ≥ 1
  is a flagged second-death signal, reported separately from READ-1 and
  not averaged away.
- **READ-4 (the hard subfamily).** Twin-Q anchors (Q′ = Q + 2, width
  4Q + 4) own the measured worst cases (Q = 809: K* = 16). Their band
  means and maxes are computed separately; a divergence between the
  twin-Q trend and the all-band trend is a named finding either way.
- **Ambiguity + escalation, pre-committed.** If neither READ-1 nor READ-2
  fires cleanly (e.g. monotone fall but outside the trend bands), the
  SAME session extends to QMAX = 31607 with bands B9 = (10007, 17783],
  B10 = (17783, 31607] under these same rules — no new prereg, no other
  new readings. Past 31607 nothing runs without a fresh width audit and a
  fresh prereg.

## Calibration gate (abort before any new figure prints)

The segmented engine must reproduce, digit-exact, from the embedded v1
block: the 24 shown per-anchor rows (C, T, pool, floor0, K*, floor@K*),
the three band means and maxes above, the K = 0 certificate list
{7, 11, 13, 19, 23, 31, 37, 43}, max K* = 21, and the full-depth
floor = T bijection at every anchor Q ≤ 1499. Hand anchors 121 → 127,
169 → 173, and S_7 (C = 6, T = 4, fresh(7) = 2) carry over. A second,
independently-coded window sieve must reproduce T at every anchor.

## Riders

No reading of this prereg is a TPC claim or a Z₂ bound; Route B stays
closed, ρ(2) stays adverse; a falling K*/pool over two decades is still
only a measurement. The producer's results are HELD for the end-of-day
roundup like everything else (the 2026-08-22 cadence rule).
