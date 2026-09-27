# T3-prep: the pre-registered decision rule for "does G2(x#)/x² fall?"

<!-- ledger
id: Q-g2-falls-decision-rule
status: PARTIAL
todo: 1d
question: Does G2(x#)/x^2 fall, and what pre-registered decision rule would settle it?
verdict: The instrument is calibrated and sharp, resolving the one-class control at 11.6 sigma on the same nine points where it returns 0.9 sigma on G2, and the honest band on the slope is +/-0.117 at nine terms, so the rule is registered; but the power analysis puts separation at x = 53 only if the falling law is x ln^2 x and at x = 151 if it is x ln^3 x, so phase 1's extra terms settle nothing and no reachable exact ladder does either.
-->

*(2026-08-18, phase 1. Read-only on the corpus; no repo file edited. Scratch
code lives outside the repo. Every number below was recomputed here from
scratch and the calibration reproduces attack 1 digit for digit.)*

**HEADLINE.** The instrument is calibrated and sharp (it resolves the one-class
control at 11.6 σ on the same nine points where it returns 0.9 σ on G2), the
honest band on the slope is **±0.117 at nine terms**, and the decision rule
below is therefore pre-registered; but the power analysis says the two live
hypotheses separate at **x = 53** only if the falling law is x·ln²x, and at
**x = 151** if it is the repo's own conjectural x·ln³x, so **phase 1's extra
terms at 43 and 47 cannot settle anything, and no reachable exact ladder can
settle the version of the question the repo actually believes.**

The reason is one number: on x ∈ [11, 41] the noiseless log-log reading of
**c·x·ln³x is −0.009** where flat reads 0.000. The conjectured truth and the
thing it is being tested against are the same measurement on this range. That
is not a limitation of the estimator. It is a property of the interval.

---

## 1. THE RULE. Apply this mechanically; nothing below is needed to use it.

### 1.1 Inputs

- A set of **exact** G2(x#) values at primes x. Nothing else. Greedy Y2 values
  are excluded here and handled separately in §1.5.
- The primary window is **x ∈ [11, X₁]**, all primes in it, no gaps, minimum
  **n = 9**. X₁ is the largest x with an exact term.
- x_min = 11 is frozen. It is not a tuning knob. See §1.6 for why, and for the
  mandatory robustness row at x_min = 5.

### 1.2 The estimator

Let `b` = the OLS slope of `ln(G2(x#) / x²)` against `ln x` over the window,
and `se_nom` its residual standard error, `se_nom = sqrt(RSS/(n−2)/Sxx)` with
`Sxx = Σ(ln x − mean ln x)²`.

**The denominator is x², and x is the same variable used as the regressor.**
Not x′² (nextprime), not x² − x. Those are legal as *levels* and forbidden as
*trends*: see §5.1, where the artifact is computed exactly and is 0.199.

Equivalently `b = a − 2` with `a` the fitted exponent of G2. Report both.

### 1.3 The band

```
se_honest = max( 1.55 * se_nom ,  1.052 / n )
```

Both terms are measured on the 58-term control, not assumed (§4). At n = 9 they
agree: 0.116 and 0.117. Use the larger. **Never quote se_nom alone**; on the
control it covers the true error in only 8 of 14 nested designs, while
1.55·se_nom covers 14 of 14.

For n > 40 the inflation factor 1.55 is too small. The control's own
sliding-window table gives 2.0 at width 15, 2.2 at width 25 and 2.3 at width
30. Re-measure it before applying the rule at n > 40; do not extrapolate.

### 1.4 The verdict

| condition | verdict |
|---|---|
| `b + 3·se_honest < 0` | **FALLS** |
| `b − 3·se_honest > 0` | **RISES** |
| otherwise | **FLAT / UNRESOLVED** |

Three gates must all pass before FALLS or RISES may be reported:

1. **n ≥ 9** and the window contains every prime in [11, X₁].
2. **Sign agreement.** The same fit over x ∈ [5, X₁] must have the same sign as
   the primary fit. It need not be significant. If the signs differ the verdict
   is FLAT / UNRESOLVED whatever the primary says.
3. **The verdict names its window.** "G2/x² falls" is not a sentence. "b =
   −0.31 ± 0.06 over x ∈ [11, 97], n = 21" is.

Threshold justification: 3 σ with this band gives a measured false-positive
rate of 0.000 under the flat law at every n ≤ 58 in a 20,000-replicate Monte
Carlo with the control's own residual structure (§6). Yesterday's failure was a
false positive. The rule is deliberately asymmetric against that failure.

### 1.5 Greedy / certificate values: the one inference they license

Y2 is a **lower** bound: `G2(x#) ≥ Y2(x) + 1`.

- **Y2 values may never appear in the same fit as exact values.** Pooling the
  four published Y2 levels onto the nine exact terms moves the slope from
  −0.069 to −0.498, which is **5.7 times the object's own standard error**, and
  turns FLAT into a 14.7 σ "FALLS". That is a manufactured verdict.
- A Y2 ladder fitted alone may be reported, with this sentence attached at the
  point of use: *a falling lower bound is consistent with the truth falling,
  being flat, or rising, and therefore carries no verdict.*
- **The one exception, and it is one-directional.** If a certified Y2 ladder
  ever satisfies `Y2/x² − 3·se_honest > 0` with Y2/x² growing without bound,
  the truth rises too, and the Zone Postulate is refuted. **A lower-bound
  ladder can produce a RISES verdict and can never produce a FALLS verdict.**

### 1.6 Forbidden operations

- **No slot-unit ratio across natals.** At fixed b = 37 the quantity L·m̄/G2
  runs 0.985, 0.907, 0.804, 0.695, 0.631, 0.531 across natals 5, 11, 13, 17,
  19, 23 while the object is byte-for-byte identical. A ladder that changes
  natal as it climbs manufactures a 46% fall out of tile geometry. Every fit
  must be at one natal, and the natal must be stated. Working in G2/x² directly
  avoids this entirely, which is the main reason the rule is written in G2 and
  not in combined L.
- **No control-corrected reading as a verdict.** Subtracting the control's bias
  assumes G2 has the control's shape, which is the question. Report it as a
  sensitivity, never as the verdict.
- **No bisection on feasibility unless monotonicity is proved.** For the exact
  covering formulation it *is* provable and here is the proof: if a choice
  (a_p) covers [0, L) then the same choice covers [0, L−1), a subset, so
  feasibility is monotone decreasing in L. A greedy predicate has no such
  proof, which is exactly why `two-class-lower-bounds.js`'s `maxM` is unsafe.
- **No verdict from a comparison of means.** The rule takes a slope and a band.

### 1.7 What the rule returns today

n = 9, x ∈ [11, 41]: b = **−0.0694**, se_nom 0.0747, se_honest **0.1169**,
|b|/se_honest = **0.59 σ**. Sign gate: the [5, 41] fit is −0.2025, same sign,
passes. **Verdict: FLAT / UNRESOLVED.**

---

## 2. The question, restated so it is answerable

The criterion "combined L against the window in slot units" was shown by attack
1 §5 to be G2(x#)/x² at natal 5 to within 1.1% by b = 41, and §7 showed that
criterion is TPC-equivalent. So "does it fall below the threshold" is not
available. The answerable question is:

> **Over the exactly-known range, what is the local logarithmic slope of
> G2(x#)/x², and is it distinguishable from zero at the measured band?**

That is an estimate, not a limit. What each answer licenses:

| verdict | licensed |
|---|---|
| FALLS | "G2/x² is measurably decreasing over [11, X₁]." Nothing about the limit. |
| RISES | The same, upward. If sustained and unbounded this refutes the Zone Postulate, which is the one direction where finite data can be decisive. |
| FLAT | "Over [11, X₁] the object is within the band of x². The asymptotic exponent is untouched." |

**No verdict of this rule is evidence about the asymptotic exponent.** The
control proves the point at full strength: 58 terms of an object whose exponent
is 1 return 1.282 with white residuals and no drift
(`research/exponent-control.md` §1). A clean fit at these sizes carries no
asymptotic information, and no reachable ladder length changes that.

### 2.1 The better parametrisation, and the number to quote

Write the truth as `G2 = c·x·ln^k x`. On design points with
`s = OLS slope of ln ln x on ln x`, the noiseless reading is `b = k·s − 1`. So

```
k_hat = (b + 1)/s        se_k = se_honest/s        k_flat = 1/s
```

`k_flat` is the log-power at which the law is numerically **identical to x²**
on that range. It is the resolving power of the range, in one number.

| range | n | s | k_flat | k_hat measured |
|---|---|---|---|---|
| [11, 41] | 9 | 0.3302 | **3.028** | **2.82 ± 0.35** |
| [5, 41] | 11 | 0.3863 | 2.589 | 2.06 ± 0.26 |

Read the top row. **The repo's conjectural truth k = 3 sits 0.51 σ from the
measurement, and "flat" sits 0.59 σ from it, on the same side.** The two are
not rival readings of this data. They are the same reading.

The bottom row is why x_min is frozen: moving it from 11 to 5 moves k_hat by
0.76 and moves k = 3 from 0.5 σ to 3.65 σ. The range choice is worth more than
the answer, so it must be chosen before the data and never afterwards.

---

## 3. Calibration: the instrument reproduces, term for term

Written from scratch, no repo code reused.

| quantity, x ∈ [11, 41], n = 9 | here | attack 1 |
|---|---|---|
| control h/x², slope | **−0.8209 ± 0.0709** | −0.821 ± 0.071 |
| object G2/x², slope | **−0.0694 ± 0.0747** | −0.069 ± 0.075 |
| control detection | **11.6 σ** | 11.6 σ |
| object detection | **0.9 σ** | 0.9 σ |
| separation | **7.3 σ** | 7.3 σ |
| d ln G2/d ln x | **1.9306 ± 0.0747** | 1.931 ± 0.075 |
| control h/x² on [5, 41], n = 11 | **−0.8163 ± 0.0397** | −0.816 ± 0.040 |

**CALIBRATION VERDICT: PASS.** The instrument resolves a genuine fall at 11.6 σ
on nine points. The absence of signal on G2 is a measurement, not a lack of
power, at any effect size down to about 0.35 in slope units.

### 3.1 Data custody, three independent recomputations

- **The control h(x#) = A048670, eleven terms recomputed from scratch** by
  direct segmented sieve over the whole period, x = 2 to 31 (31# = 2.01·10¹¹).
  Survivor count matched the closed form φ(x#) exactly at every level, and all
  eleven maxima match the repo array `research/exponent-control.js:const H`.
  h(37#) = 66 and h(41#) = 74 are the repo/OEIS values only and are flagged as
  such; they are two of the eleven points in the [11, 41] control fit.
- **G2 itself recomputed by exact covering search**, ten terms, x = 2 to 29:
  2, 6, 12, 30, 42, 66, 108, 150, 204, 258. Every one matches. This is a third
  independent route to the ladder (enumeration, bit-parallel, covering) and it
  is also a direct check of the brief's CRT identity `G2(x#) − 1 = the maximum
  coverable interval`, which the search uses as its definition.
- The sliding-window band constant reproduces the repo's stated 1.05/width at
  **1.052** from a twelve-width least-squares fit.

---

## 4. The band, determined from the data

Four independent routes, all measured.

**(a) Point scatter of the ratio, x ∈ [11, 41].** G2/x²: mean 0.3658, sd
0.0344, **cv 9.4%**, range 0.3068 to 0.4155. This is the level band, not the
slope band, and it is not what a trend must beat.

**(b) Residual scatter about the log-log line**, which is what the slope sees:
object rms(ln) 0.0858, control 0.0814 on the same nine x. The two objects have
the same scatter where both are known, which is what licenses using the
control's long baseline as G2's noise model.

**(c) Sliding-window scatter on the 58-term control**, the honest
between-window band:

| width | windows | sd(win) | mean se_nom | VIF |
|---|---|---|---|---|
| 7 | 50 | 0.1644 | 0.1064 | 1.54 |
| 9 | 48 | 0.1091 | 0.0771 | 1.41 |
| 11 | 46 | 0.0884 | 0.0585 | 1.51 |
| 13 | 44 | 0.0827 | 0.0458 | 1.81 |
| 19 | 38 | 0.0575 | 0.0275 | 2.09 |
| 30 | 27 | 0.0366 | 0.0158 | 2.32 |

Fit: `sd(win) = 1.052/width`. Detrending against the control's own smooth shape
barely changes it (K goes 1.05 to 1.10), so **the between-window scatter is
noise, not the drift of the local exponent.** The nominal se understates by
1.4 to 1.6 at the widths that matter and by more than 2 at width 30.

**(d) Jackknife on the object**, n = 9: se 0.0885 against nominal 0.0747, ratio
1.19. The most influential term is x = 11; dropping it moves the slope to
−0.139.

**(e) How the noise scales with x, measured.** Leave-one-out local residuals of
the control, in four blocks: rms 0.098 at x ≈ 20, 0.049 at 78, 0.024 at 144,
0.018 at 226. Power fit **sd(x) = 0.894·x^−0.711**. Extreme-value theory
predicts 1.2825/θ(x), which decays faster, so the fitted law is the
conservative one. The practical consequence is large and favourable: the
per-point noise at x = 113 is a third of what it is at x = 41.

### 4.1 How many terms for a fall of a given size

`n ≥ 3K/effect` with K = 1.052, where "effect" is the noiseless slope the law
would read on that range.

| effect \|b\| | n for 3 σ | n for 5 σ | a law with that effect |
|---|---|---|---|
| 0.60 | 6 | 9 | k = 1 on [11, 41] |
| 0.34 | 10 | 16 | k = 2 on [11, 41] |
| 0.20 | 16 | 27 | k = 3 on [11, 180] |
| 0.16 | 20 | 33 | k = 3 on [11, 113] |
| 0.05 | 64 | 106 | k = 3 on [11, 55] |
| 0.01 | 316 | 526 | **k = 3 on [11, 41], i.e. today** |

The last row is the whole problem stated as an arithmetic fact. Detecting the
repo's conjectured law against flat on today's range would need 316 exact
terms. There are thirteen.

---

## 5. Trap defences, with the artifacts computed exactly

### 5.1 Trap: the denominator convention. Artifact = 0.199, exactly.

Same nine terms, three denominators:

| quantity | slope | σ from 0 |
|---|---|---|
| G2/x² | **−0.0694** | 0.93 |
| G2/(x² − x) | −0.1216 | 1.66 |
| G2/x′² (nextprime) | **+0.1297** | 1.75 |

**The sign flips.** The cause is exact and needs no statistics: the OLS slope of
ln x′ on ln x over these nine points is **0.9004**, not 1, so using x′² as the
denominator while regressing on ln x subtracts 2 × 0.9004 instead of 2. The
artifact is `2(1 − 0.9004) = 0.199`, and −0.0694 + 0.199 = +0.1296 against the
measured +0.1297, agreeing to one part in 10⁴. The artifact is **1.7 times the
honest band**. This is the same index-convention effect `exponent-control.md` §6
records as flipping the h2 margin trend from −0.084 to +0.154.

Rule: the denominator's variable must be the regressor. x′² is the right
*threshold* for the Zone Postulate and the wrong *denominator* for a trend.

### 5.2 Trap: a falling lower bound. Artifact = 5.7 standard errors.

Y2/x² over the four published levels x = 37, 229, 1009, 4001 falls at
−0.5242 ± 0.0458, an 11.5 σ detection. Pooling those onto the nine exact terms
gives −0.4978 ± 0.0340, 14.7 σ, "FALLS". The pool moves the answer by 0.4284,
**5.7 times the object's own nominal se**. §1.5 forbids it.

### 5.3 Trap: slot units across natals. Artifact = 46%.

Reproduced from attack 1 §5 at fixed b = 37: L·m̄/G2(37#) = 0.985, 0.907,
0.804, 0.695, 0.631, 0.531 at natals 5, 11, 13, 17, 19, 23. The object does not
change. The rule works in G2/x², which has no natal at all.

---

## 6. Power: where the two hypotheses separate

Monte Carlo, 20,000 replicates per cell, noise = the measured heteroscedastic
law `sd(x) = 0.894 x^−0.711` applied to a stationary block bootstrap of the
control's own standardised residuals (mean block 5, lag-1 autocorrelation 0.47
in the standardised residuals, so the correlation structure is real and
carried). Rule as pre-registered in §1: BAND-A, 3 σ.

**P(rule says FALLS), by truth and by largest exact term X₁:**

| X₁ | n | flat | k=2 | k=2.5 | k=2.8 | k=3 | k=3.5 |
|---|---|---|---|---|---|---|---|
| **41 (today)** | 9 | 0.000 | 0.442 | 0.068 | 0.003 | **0.000** | 0.000 |
| **43** | 10 | 0.000 | 0.585 | 0.090 | 0.011 | 0.000 | 0.000 |
| **47 (end of phase 1)** | 11 | 0.000 | 0.699 | 0.137 | 0.019 | **0.000** | 0.000 |
| 53 | 12 | 0.000 | **0.823** | 0.220 | 0.050 | 0.004 | 0.000 |
| 71 | 16 | 0.000 | 1.000 | 0.690 | 0.235 | 0.072 | 0.000 |
| 89 | 20 | 0.000 | 1.000 | 0.957 | 0.651 | 0.243 | 0.000 |
| 113 | 26 | 0.000 | 1.000 | 1.000 | **0.980** | 0.742 | 0.011 |
| 151 | 32 | 0.002 | 1.000 | 1.000 | 1.000 | **0.987** | 0.138 |
| 251 | 50 | 0.000 | 1.000 | 1.000 | 1.000 | 1.000 | **0.952** |

**First X₁ reaching 80% power: k = 2 → 53. k = 2.5 → 79. k = 2.8 → 113.
k = 3 → 151. k = 3.5 → 251.**

False positive under flat: at most **0.003** at every n ≤ 58, and exactly 0.000
at every n ≤ 21, which is the regime phase 1 lives in. At n = 165 it reads 0.025,
but that row recycles a 56-term residual pool through the bootstrap and its
correlation structure is not trustworthy; treat n > 56 as unvalidated.

### 6.1 The forecast for phase 1's own terms, and it is negative

Appending noiseless model values at 43 and 47 to the nine real terms, rescaled
through the real x = 41 point, the rule returns:

| truth | b at n = 11 | se_honest | verdict |
|---|---|---|---|
| c x² | −0.0997 | 0.0872 | FLAT / UNRESOLVED |
| c x ln²x | −0.1202 | 0.0925 | FLAT / UNRESOLVED |
| c x ln³x | −0.1086 | 0.0891 | FLAT / UNRESOLVED |
| c x^1.8 | −0.1084 | 0.0891 | FLAT / UNRESOLVED |

The five hypotheses tested span **0.033 in the fitted slope**, against an
honest band of 0.089. **The two new terms move the answer by a third of the
noise, and they move it by the same amount whatever the truth is.** G2(43#) and
G2(47#) are worth having for the ladder and for the OEIS submission. They
cannot move this question, and the rule above will say so.

This confirms `exponent-control.md` §8's measurement from the other direction:
adding an eleventh term to a ten-term control fit moves the exponent by 0.022
on average and 0.078 at worst.

### 6.2 The largest k a range can call falling

| X₁ | n | s | k_flat | largest k callable at 3 σ |
|---|---|---|---|---|
| 41 | 9 | 0.330 | 3.028 | **1.97** |
| 47 | 11 | 0.322 | 3.106 | 2.22 |
| 53 | 12 | 0.317 | 3.151 | 2.32 |
| 71 | 16 | 0.302 | 3.307 | 2.63 |
| 113 | 26 | 0.279 | 3.578 | 3.11 |
| 151 | 32 | 0.269 | 3.721 | 3.32 |
| 1009 | 165 | 0.202 | 4.943 | 4.80 |

**x = 113 is the first range that can call k = 3 falling at all**, and 151 is
the first that does it with 80% power.

### 6.3 What it costs to get there. Measured, not assumed.

Trap 5 says cost estimates here err cheap, so both routes were probed.

**Enumeration.** Attack 1's measured throughput is 1.188·10¹³ natal-19 slots in
151 s on ten cores, i.e. 7.9·10¹⁰ slots/s, and the slot count is 0.0390·x#. The
period multiplies by x each term:

| x | x# | projected wall, 10 cores |
|---|---|---|
| 43 | 1.31·10¹⁶ | 1.8 h |
| 47 | 6.15·10¹⁷ | 3.5 days |
| 53 | 3.26·10¹⁹ | 186 days |
| 59 | 1.92·10²¹ | 30 years |

**Covering search**, which does not scale with the period. Measured here, naive
implementation, single core, "cover the first uncovered point" branching with
an exact per-prime capacity bound:

| x | wall | nodes to prove the maximum | ratio to previous |
|---|---|---|---|
| 17 | 0.004 s | 137,008 | |
| 19 | 0.060 s | 1,532,047 | 11.2 |
| 23 | 0.882 s | 20,052,980 | 13.1 |
| 29 | 18.8 s | 323,924,673 | 16.2 |
| 31 | **> 390 s, killed unfinished** | — | **> 21** |

Per-term cost ratio **15 to 21 in wall, 11 to 16 in nodes**, and the x = 31
step passed 21 without finishing and was killed, against
enumeration's factor of x. Ziller and Morack's optimised adversarial search
achieves 6.7 per term (`h2-scoping.md` §3, digitised from their figure). Our
fixed pair {0, −2} has p choices per prime rather than ~p²/2, so it should be
strictly cheaper than theirs. `h2-scoping.md` §2's structural finding also
reproduces here independently, and sharper: **almost all of the cost is proving
that no longer interval exists**, not finding the optimum. At x = 23 that is
35,232 nodes to find against 20,052,980 to prove, i.e. 0.18% against 99.8%,
where `h2-scoping.md` measured 2.5% against 97.5% on the h2 solver. The
asymmetry deepens with x in my run, which is the direction that matters: a
lower-bound ladder for G2 stays cheap long after the exact one stops.

Reading, stated as a bracket because the extrapolation is four terms long:
**x = 47 is easy by enumeration, x = 53 is a serious but real commitment,
x = 59 needs the covering route with ZM-quality code, and x = 113 is not
reachable by anything** (113# ≈ 10⁴⁶; ZM's own curve prices their term 30 at
5.6·10⁵ machine-years).

**So the separation point for the repo's own conjecture lies past the end of
every route that exists.** That is the finding this task was built to produce.

---

## 7. Two numbers now in circulation that need correcting

**7.1 "+0.05 ± 0.11 over eleven exact terms" is a nine-term figure.**
`attack-block-00-ADJUDICATION.md`:153-154 and the phase-1 shared brief both
carry that label. Attack 1's own text is explicit: "the fitted slope … over the
**nine** exact levels b = 11 to 41" (`attack-block-01-ladder.md`:22-23), and its
summary table row reads "b >= 11, nine terms". The distinction is not cosmetic.
For the closest computable quantity, G2/x², the nine-term fit is −0.069 ± 0.075
and the eleven-term fit is **−0.203 ± 0.064**, which is 3.2 σ on the nominal se
and 2.0 σ on the honest band. A reader who applies the "eleven terms" label
literally gets a different verdict from the one the sentence reports.

**7.2 "the ratio bounces between roughly 0.24 and 0.32" is G2/x′², not G2/x².**
Over the thirteen exact terms: G2/x′² runs 0.222 to 0.314, G2/x² runs 0.307 to
0.667, and restricted to x ≥ 11 it runs 0.307 to 0.416. The quoted band belongs
to the nextprime convention, which §5.1 shows must not be used for a trend.
Stating a band without its denominator is the same class of slip the campaign's
trap 2 records.

---

## COVERAGE

**What I did not reach.**

- **h(37#) and h(41#) were not recomputed.** Direct sieving stops being cheap
  above 31# (2·10¹¹ in 7 minutes; 37# is 7.4·10¹² and 41# is 3.0·10¹⁴). Those
  two points are two of the eleven in the control fit that produces the 11.6 σ
  calibration, and they come from the repo array and OEIS. Nine of eleven are
  mine. If A048670 is wrong at n = 12 or 13 the calibration figure moves, and I
  did not check it independently.
- **The covering search was not pushed past x = 29 to completion.** The 31 run
  was killed after 390 s without finishing. The per-term ratio is therefore
  measured over four steps and extrapolated over four more. Four-term
  extrapolations of cost curves are exactly what trap 5 is about, and mine is
  no better protected than the ones it corrects. The ratio is *rising*
  (11.2, 13.1, 16.2), which makes my x = 53 and x = 59 figures optimistic.
- **The 1.55 inflation factor is not validated above n = 40.** I say so in the
  rule, but a rule with an unvalidated regime is a rule with a hole in it, and
  the hole is exactly where a future x = 100 campaign would live.
- **No G2 term was computed above 41.** The forecast in §6.1 uses noiseless
  continuations, so it shows where the rule's centre lands, not the spread.

**What I suspect but could not prove.**

- The heteroscedastic noise law sd ∝ x^−0.711 is fitted on four blocks of the
  control and is well below the extreme-value prediction 1.2825/θ(x) ∝ 1/x.
  I think the truth is closer to 1/θ and that my power figures are therefore
  pessimistic, perhaps by one or two primes in X₁. I could not separate the
  two laws on 56 points.
- The covering route probably reaches further than enumeration from x ≈ 47
  onward, but my implementation is naive by a factor I did not measure. A
  faithful reimplementation of the ZM branching is the single highest-value
  engineering item I can see for extending the exact ladder, and **no
  optimality-proving covering search for G2 exists in the corpus to price it
  against.** That absence is calibrated: `research/` was listed (132 scripts),
  the known positive `h2-scoping.md` hits on the ZM cost-curve query, and the
  two candidates are both explicitly lower-bound machinery
  (`two-class-lower-bounds.js` is the greedy; `h2-lower-ladder.js` states in its
  own header that it drops the optimality proof, which is 97.5% of the run, and
  therefore returns a certified lower bound). The cost curve in §6.3 is the
  first one measured for our object, and it is four steps long.

**Where I am most likely wrong.**

1. **The choice of x_min = 11 is the weakest load-bearing decision in the
   rule.** It moves k_hat by 0.76 and it is defended on grounds (band tightness,
   number of folded primes, consistency with attack 1) that are reasonable and
   not decisive. Someone could pre-register x_min = 5 with equal honesty and get
   "falling at 2.0 σ" instead of "flat at 0.6 σ". I have frozen it and stated
   the sensitivity rather than resolved it, and a rule whose answer depends on a
   frozen arbitrary choice is only half a rule.
2. **The k parametrisation assumes the truth is c·x·ln^k x.** If the truth has a
   different shape (a genuine power, a log-log correction, a turnover) then
   k_flat is not the right resolving-power statistic and §6.2 is decoration.
   The family is the repo's own conjecture, which is a reason to use it and not
   a reason to believe it.
3. **The 3 σ threshold buys its zero false-positive rate with power.** Under
   k = 2 at X₁ = 47 the rule fires only 70% of the time; a real fall of that
   size present in the data would be reported as unresolved three times in ten.
   That is the deliberate trade after yesterday, but it is a trade and it should
   be re-argued, not inherited, if the programme's cost of a missed detection
   ever rises above its cost of a false one.

---

*Scratch code: `verify-control.c` (control sieve), `g2cover.c` (exact covering
search), `instrument.js`, `noise.js`, `power.js`, `power2.js`. None is in the
repo. No repo file was edited by this task.*
