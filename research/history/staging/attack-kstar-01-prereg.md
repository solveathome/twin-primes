# Pre-registration: K* at the three next doubling steps, predicted before any period walk

<!-- ledger
id: Q-kstar-prereg
status: OPEN
todo: D
question: What is K* at the three next doubling steps, predicted before any period walk?
verdict: Pre-registration only, committed alone: the predictions, the scoring rule and the growth-type verdict thresholds are fixed in advance, with the inclusion-exclusion engine validated against an independent scan engine on all eleven known steps first.
-->

*2026-08-21. Committed ALONE, before the first scan of any of the three
periods below was run. Producer of the predictions:
`research/attack-kstar-01.js` sections A–F (tile-only: fold-recursion tiles
to 23#, the inclusion–exclusion N_k engine, the smooth HL models M0/M1 —
no walk over any of the three target periods is executed by those
sections). The I–E engine was validated first against an independent scan
engine on the eleven known steps of `attack-doubling-01.md`: K* equal at
all eleven and the exact window count N_k equal to the scan's run-length
census at all 63 (step, k) cells. Nothing below was measured on the target
periods at commit time.*

## The object

K* at doubling step P#→P′# = the longest run of consecutive level-P slots
(cyclic) all killed by the primes entering (P, P′]; Bridging-Lemma
certificate C₂ ≤ K*+1. N_k = the number of windows of k consecutive
level-P slots, per period of P′#, with all k slots killed — an integer,
computed here on the tile alone as
N_k = Σ_shapes Σ_{J ⊆ window} (−1)^|J| Π_{q∈Q} (q − ν_q(J)),
ν_q(J) = #distinct residues of {x_j, x_j+2 : j ∈ J} mod q (the HL local
count of the 2|J|-tuple — W1's ν-case table one level up). K* = max{k :
N_k ≥ 1}; N_k = 0 at k = K*+1 is the certificate.

## Predictions

**Exact route (integer, falsifiable against the scan census):**

| step | s | Q | predicted K* | cert C₂ ≤ | predicted N_k curve (k = 1..K*+1) |
|---|---|---|---|---|---|
| 13#→29# | 15 | 17,19,23,29 | **10** | 11 | 105221160, 29114520, 6942634, 1470674, 285422, 52048, 9456, 1712, 270, 36, 0 |
| 13#→31# | 16 (chain, the sup row) | 17,19,23,29,31 | **17** | 18 | 3691273410, 1208132640, 357506328, 98048374, 25570726, 6426266, 1601992, 403958, 103170, 25738, 5568, 1180, 296, 80, 18, 6, 2, 0 |
| 17#→31# | 17, 18 | 19,23,29,31 | **13** | 14 | 2524470300, 607806150, 128515868, 25793636, 5037414, 929548, 167144, 29148, 4894, 710, 138, 22, 6, 0 |

Derived (second difference of N_k): the census of maximal killed runs of
length exactly ℓ is hist[ℓ] = N_ℓ − 2N_{ℓ+1} + N_{ℓ+2}. In particular the
scan must find exactly **2 maximal 17-runs** in the 31# period against base
13, exactly **2 maximal 13-runs** against base 17, and exactly **6 maximal
10-runs** in the 29# period against base 13.

**Smooth HL models (scored by crossing − K*):** M0 (iid density product)
crossings 17.61 / 23.29 / 18.42; M1 (pairwise singular-series corrected)
crossings 12 / 16 / 13. On the eleven known steps M0 overshoots K* by
+4.02 mean and M1 by +1.00 mean; the model claim carried into this test is
that **M1 lands within ±2 of K* at all three new steps** while M0 keeps
overshooting by ≥ +3 at the |Q| ≥ 4 steps.

**Custody expectations (not discoveries):** the scans must re-derive
G2(29#) = 258 @ 1205437109 (×2) and G2(31#) = 348 @ 8813641451 (×4) from
scratch, matching `exact-g2-ladder.js`.

## Scoring rule, fixed now

- The exact route PASSES iff the scan's K* equals the predicted K* at all
  three steps and the scan's run census reproduces every predicted N_k
  value (linear check N_k = Σ_{ℓ≥k} (ℓ−k+1)·hist[ℓ]). Any single-cell
  mismatch fails the route and flags one of the two engines defective.
- M1 PASSES iff |crossing − K*| ≤ 2 at all three steps.
- The growth-type verdict (the deliverable of task (b)) will be stated
  from the 14-point ladder: I_eff = ln(D·M)/K* per step. The HL first
  moment predicts I_eff bounded (hence K* near-linear in P(2s), the
  alarm's drift structural); a log-type K* requires I_eff to grow like
  P/ln P, i.e. roughly double from P(2s) = 23 to 31. Predicted I_eff at
  the new steps: 1.96, 1.35, 1.76 — inside the eleven-step range
  [0.55, 2.56], not doubled. If the scans confirm the predicted K*, the
  verdict is **near-linear (alarm structural)** and is so pre-registered.

## Stakes

If confirmed, the certificate at the chain step s = 16 is C₂ ≤ 18 — a
factor 3.41 above the true C₂ = 348/66 = 5.2727 and within 1.25 of the
19.2455 ceiling: the K*-certificate route's crossing, extrapolated at
0.6881 slope from eleven points to "P(2s) ~ 69" by the alarm, would in
fact be nearly consumed already at P(2s) = 31.
