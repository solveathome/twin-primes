# Does fold succession damp the multiplier? Measured, calibrated, and the answer is no

<!-- ledger
id: Q-fold-succession
status: CLOSED
todo: none
question: Does folding in succession damp the multiplier, giving a lower L than the sum of per-fold jumps?
verdict: No: the succession-damping route closes empirically at both reachable scales against a calibrated null, the only damping present is what level-tracking forces and the only extra structure present is cooperative, matching the structural closure by super-additivity.
-->

*(2026-08-19, Fable session. Producer: `research/fold-succession-autocorr.js`,
embedded, deterministic seed, 2.9 s. Question: Chris's proposal that "folding
multiple times can generate a lower L than the sum of upper-bound L jumps due
to the moiré nature that a series of folds must have in succession." Legend:
**[MEASURED]** empirical, finite range; **[VERIFIED]** checked computationally.)*

## Pre-registration

Stated in-session before the first run: moiré-damping predicts (i) lag-1
autocorrelation of per-fold budget deviations negative BEYOND the level-noise
control, and (ii) anti-correlated per-fold kill damage. The
cooperative/independent reading predicts both ≥ 0 after calibration.

## The two instruments

**A. The exact `G₂(x#)` ladder** (14 terms through `G₂(43#) = 618`):
deviations `d_k = ln(G₂_{k+1}/G₂_k) − 2 ln(x_{k+1}/x_k)`, their lag-1
autocorrelation, and — the part that decides everything — a calibrated null:
synthetic ladders `G₂ = C·θ(x)²·e^ε`, `ε` i.i.d. at the measured residual
sd 0.598, quantised to multiples of 6. Differencing independent level noise
forces autocorr ≈ −0.5 with no succession mechanism at all, so the raw
statistic alone cannot answer the question (the campaign's
calibrate-before-fitting rule, applied before reporting this time).

**B. The localized series `M(x, x²)`** by spf sieve of `[0, 10⁸)`, 1226 folds
to x = 9973 — the zone-scale object, with the statistical power the ladder
lacks. Jump statistics, kill-driven vs window-driven record growth, and the
succession autocorrelation of per-fold kill damage `D_p` (max merged gap
created below `p²`), detrended on `ln p`.

## Findings

1. **The ladder's anti-correlation is level-tracking, not interference.
   [MEASURED]** Observed lag-1 = −0.632 (perm p = 0.005) rejects memoryless
   increments; the level-noise null already sits at median −0.460, band
   [−0.726, −0.113], and the observation is inside it (P = 0.16). The data
   say `G₂` hugs `C·θ²` and excursions self-correct — consistent with the
   Overshoot Budget's flat ~1-nat slack — and say nothing more.
2. **Kill succession is memoryless. [MEASURED]** Detrended `D_p` autocorrs
   −0.07 / −0.02 / +0.05 at lags 1–3 over 256 folds, all inside ±0.12.
3. **Record structure is cooperative:** jump sizes cluster (+0.47, p = 0.012,
   n = 20), matching U-FRAME §7's assembled-maximum observation.
4. **Frozen zones reproduced blind. [VERIFIED]** The record was kill-driven at
   2 of 1226 folds; below `p²` the only killable slot member is `p` itself
   (least-factor argument), which is A6's mechanism arrived at independently
   by this instrument.

## Verdict

The succession-damping route is closed empirically at both reachable scales,
matching the structural closure (super-additivity on disjoint sets plus the
translate-buys-zero identity, `sift-limit-attack.md` §7a-bis): the only
damping present is what level-tracking forces, and the only extra structure
present is cooperative. What survives of the intuition is what survived
structurally: prime REUSE sub-additivity (irrelevant to the ladder, which
never reuses a prime) and the possibility of a localized joint statement
inside a single zone, where CRT completeness is broken — the ground item 0c
already names.

## What this does not show

The ladder test has n = 13 and its null band is wide; a damping signal below
~0.2 in autocorrelation units would be invisible there. The localized test
measures the zone-scale object, not `G₂` itself, and its kill-damage series
only exists at the ~2-kills-per-window rate the frozen-zone mechanism allows.
Neither instrument reaches the covering-form combined `L`, which is where the
super-additivity theorem already gives the exact (and opposite-signed) answer.
