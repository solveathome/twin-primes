# Foreign import follow-up, IMPORT-MAP row 1: the sixth exact level, and the tail factor

<!-- ledger
id: Q-scanstat2
status: ANSWERED
todo: none
question: Does the scan-statistic exponent law survive a sixth exact level, and is the tail factor the extremal index?
verdict: Both follow-ups come back negative: T_31 missed the pre-registered exponent rule from outside its own 95 per cent band, so the linear-in-ln D law describes five points and is not a law, and the tail factor is not the extremal index, its correction pointing the wrong way at seven of nine tested places; the sixth level confirms the kill on sqrt(m) harder, at H = 0.3460 +/- 0.0068 against 0.5.
-->

*Staging note, 2026-08-19. Proposal only; nothing here is integrated into a live
document, and neither [../../TODO.md](../../TODO.md) nor
[../../U-FRAME.md](../../U-FRAME.md) was touched, since TODO 0c and U-FRAME §5a
are a paired transfer under the fingerprint ledgers. Both producers are formally
embedded: [`../../scanstat2-01-t31.js`](../../scanstat2-01-t31.js) (3029.3 s) and
[`../../scanstat2-02-crossover.js`](../../scanstat2-02-crossover.js) (3.6 s). The
predictions are at [scanstat2-prereg.md](scanstat2-prereg.md), committed **alone**
in commit `cde163a` with message `prereg: scanstat2`, before either producer
existed. That answers the one custody complaint the previous pass could not
answer: `import-scanstat.md`'s pre-registration shipped in the same commit as the
record that scored it. Calibration is marked on every claim: PROVEN, VERIFIED by
exact computation, MEASURED, INFERRED, REFUTED.*

## 0. The answer

**The two follow-ups both come back negative, and the negatives are the useful
kind.** `T₃₁` was computed and the pre-registered exponent rule missed it from
outside its own 95% band, so the linear-in-`ln D` law is a description of five
points and not a law. The tail factor is not the extremal index, and the
correction that was supposed to explain it points the wrong way at seven of nine
tested places. What the sixth level does confirm, harder than before, is the kill:
`√m` is refuted again, at `H = 0.3460 ± 0.0068` against 0.5.

Three sentences, in order of how much they cost to establish:

1. **`H(T₃₁) = 0.3460 ± 0.0068`, pre-registered at `0.359402` with band
   `[0.350777, 0.368027]`. MISS, from outside.** The miss is `−0.013445`, two of
   the measurement's own standard errors and five of the band's. The series
   0.2661, 0.2804, 0.3001, 0.3216, 0.3367, 0.3460 is **bending over**: its last
   two increments in `H` are its smallest while its last two increments in `ln D`
   are its largest.
2. **The tail factor is not `√(2 ln(θ D))`. REFUTED.** The pre-registered
   flattening statistic reads `Δ` = 0.0755, 0.0719, 0.0484 at `T₂₃`, `T₂₉`, `T₃₁`
   against a registered floor of 0.20, and the two estimators agree to 0.0009.
   Worse than small: `θ ≤ 1` forces the corrected level **down**, while the
   measurement sits **above** `√(2 ln D)` at small `m`, and the gap **grows with
   `D`**, from `R₁/√(2 ln D)` = 1.6034 at `T₂₃` to 2.0081 at `T₃₁`.
3. **The turnover that the duality forces is a plateau, not an arch**, and the
   grid effect it was supposed to explain is present at every level, so `H` is a
   grid-dependent summary of a curved function everywhere and not only where the
   circle is small.

---

## 1. `T₃₁`, and what had to be true before it was believed

Producer: [`../../scanstat2-01-t31.js`](../../scanstat2-01-t31.js).

**The engine. VERIFIED, on six checks before the target and four at it.** The
streaming ring-buffer walker of `import-scanstat-04-score.js` was extended with
the extremal-index histograms of §3 and run first at the two levels whose answers
are published. It returns `maxsum₁` = 204 and 258, `D` = 7952175 and 214708725,
`H` = 0.3216 and 0.3367, `sd₁` = 19.4656 and 21.4409, each matching the embedded
record of [`../../import-scanstat-04-score.js`](../../import-scanstat-04-score.js)
to the digits published. That recomputation is deliberate and is the standing
compute rule's validation case: the five-level refit the whole pre-registration
rests on has `T₂₃` and `T₂₉` among its inputs, and a producer that took them on
trust could not check its own premise.

At the target: `D = 6226553025 = ∏_{5≤p≤31}(p−2)`, `W = 200560490130`,
`mbar·D = W` exactly, and `maxsum₁ = 348 = G₂(31#)`, the eleventh exact ladder
entry as carried by [`../../exact-g2-ladder.js`](../../exact-g2-ladder.js). Any
gate failing aborts. 3029.3 s, constant memory, no gap word materialised.

**The family. MEASURED.** `mbar = 32.21052`, `√(2 ln D) = 6.7160`,
`sd₁ = 23.4155`.

| `m` | `maxsum_m` | `excess_m` | `sd_m` | `sd_m/(sd₁√m)` | `excess/sd_m` | `minsum_m` |
|---|---|---|---|---|---|---|
| 1 | 348 | 315.8 | 23.415 | 1.0000 | 13.486 | 6 |
| 2 | 408 | 343.6 | 32.200 | 0.9724 | 10.670 | 18 |
| 4 | 540 | 411.2 | 41.078 | 0.8772 | 10.009 | 36 |
| 8 | 660 | 402.3 | 52.256 | 0.7890 | 7.699 | 102 |
| 16 | 1002 | 486.6 | 66.261 | 0.7074 | 7.344 | 264 |
| 32 | 1638 | 607.3 | 83.562 | 0.6309 | 7.267 | 636 |
| 64 | 2700 | 638.5 | 101.365 | 0.5411 | 6.299 | 1530 |

(the producer's block carries all twelve grid points; seven are shown here)

---

## 2. The six-level series, and the pre-registered score

**The rule, refitted on all five existing levels and frozen before the run.**
`H = 0.220795 + 0.006146 ln D`, giving `H*(T₃₁) = 0.359402` and a 95% confidence
band on the fitted line of `[0.350777, 0.368027]`. That band construction is the
one the adversarial review used: it reproduces its `[0.281, 0.396]` at `T₂₉` from
the 3-point fit exactly, so the two are comparable and the widening from one
residual degree of freedom to three is real.

| level | `ln D` | `sd₁` | measured `H` ± se | `sd₆₄/(sd₁√64)` |
|---|---|---|---|---|
| `T₁₃` | 7.3032 | 12.0326 | 0.2661 ± 0.0230 | 0.4132 |
| `T₁₇` | 10.0112 | 14.5863 | 0.2804 ± 0.0189 | 0.4196 |
| `T₁₉` | 12.8444 | 17.1618 | 0.3001 ± 0.0130 | 0.4607 |
| `T₂₃` | 15.8890 | 19.4656 | 0.3216 ± 0.0096 | 0.4973 |
| `T₂₉` | 19.1848 | 21.4409 | 0.3367 ± 0.0080 | 0.5209 |
| **`T₃₁`** | **22.5521** | **23.4155** | **0.3460 ± 0.0068** | **0.5411** |

**The verdict, on the sealed criterion. REFUTED.** 0.345957 is outside
`[0.350777, 0.368027]`; the miss is `−0.013445`, 1.99 measurement standard errors
and 4.96 band standard errors. Per [scanstat2-prereg.md](scanstat2-prereg.md) §1,
outside the band means the linear-in-`ln D` rule was a coincidence of a short
ladder. **INFERRED, and the shape of the miss says which coincidence**: `H` is
saturating. Its increments shrink exactly where the `ln D` steps grow.

**What the sixth level does not touch. REFUTED, of `√m`.** `H + 3 se = 0.3663`
against 0.5. The model-free reading is the last column above: `σ√m` overstates the
fluctuation at `m = 64` by a factor of nearly two at every level, and while
`sd₆₄/(sd₁√64)` is rising with `D`, 0.5411 at `ln D = 22.55` is not a series about
to reach 1.

**The anchored riders, and a warning inside them. MEASURED.** At `T₃₁`, `A′` beats
`B′` on `sd_m` by 0.0468 against 0.3421, and on `excess_m` by 0.3577 against
0.4264, a ratio of 1.19 where `import-scanstat-04-score.js` measured 1.73 at `T₂₃`
and 1.38 at `T₂₉`. Every comparison still goes the same way. **The margin is
collapsing because the term the two models SHARE, the tail factor, is now the
dominant error.** That is §3.

**Corroborated at a seventh level, independently. MEASURED, cited not
recomputed.** A sibling pass in this repository,
[`../../scanstat-t37-04-run.js`](../../scanstat-t37-04-run.js), computed `T₃₇` at
`ln D = 26.107437` and measured `H = 0.3565 ± 0.0068` against its own five-level
pre-registration of `0.381254` with band `[0.369866, 0.392641]`: outside, missing
by 3.63 of its own standard error, with the line overshooting in the same
direction as here. **Two blind levels, two engines, one verdict.** The joint
series is 0.2661, 0.2804, 0.3001, 0.3216, 0.3367, 0.3460, 0.3565. Between `T₂₉`
and `T₃₁` and again between `T₃₁` and `T₃₇`, the rise per unit `ln D` is close to
half the fitted 0.006146 and roughly flat, so the honest reading is that the slope
has **fallen**, not that it is going to zero. That pass's driver takes `--h31` and
is waiting on this run's 0.345957 for its labelled post-hoc seven-level refit;
that file is not this pass's to embed and the number is handed over rather than
used here.

**The secondary prediction, registered as weak. MEASURED.** `sd₁* = 26.2784` with
band `[22.3736, 30.8646]`; measured 23.4155, inside. The band is ±18% and this
outcome carries almost no information, which is why it was registered as weak.

---

## 3. The tail factor: it is not the extremal index

Producer: [`../../scanstat2-01-t31.js`](../../scanstat2-01-t31.js) §§2, 6.
The object is a scan statistic in probability and a MOSUM in change-point
analysis; the owning convention is recorded at
[../../SEARCH-CONVENTIONS.md](../../SEARCH-CONVENTIONS.md) §1.

**The estimator was verified before it was used anywhere new. VERIFIED.** At
`T₂₉` and `T₃₁` no exceedance position can be stored, so `θ` is accumulated from
histograms of sliding maxima using

> `#{i : X_i > u, max(X_{i+1..i+r}) ≤ u} = #{i : max(X_{i..i+r}) > u} − #{i : max(X_{i+1..i+r}) > u}`,

the difference of the exceedance counts of the sliding maxima at window lengths
`r+1` and `r`. Run at `T₂₃`, that returns 0.9998, 0.5188, 0.2350 on the runs
column and 0.9988, 0.5292, 0.2334 on the blocks column, which are the embedded
values of
[`../../import-scanstat-02-leadbetter.js`](../../import-scanstat-02-leadbetter.js)
to four decimals at all six entries.

**`θ` at two levels where it had never been measured. MEASURED.** Runs estimator
at `r = m`, `p = 1e-2`: 0.9997, 0.4730, 0.2182 at `T₂₉` and 0.9991, 0.4341, 0.2055
at `T₃₁`, for `m = 1, 8, 32`; the blocks estimator at `b = 4m` agrees throughout.

**The test. REFUTED.** With `R_m = excess_m/sd_m`, `ρ_m = R_m/τ_m`, and
`Δ = 1 − S(τ^θ)/S(τ⁰)` where `S` is the population s.d. of `ln ρ` over
`m ∈ {1, 8, 32}`:

| level | `S(√(2 lnD))` | `S(√(2 ln θD))` | `Δ` runs | `Δ` blocks | verdict |
|---|---|---|---|---|---|
| `T₂₃` | 0.2561 | 0.2368 | 0.0755 | 0.0761 | DOES NOT FLATTEN |
| `T₂₉` | 0.2277 | 0.2113 | 0.0719 | 0.0710 | DOES NOT FLATTEN |
| `T₃₁` | 0.2789 | 0.2654 | 0.0484 | 0.0475 | DOES NOT FLATTEN |

The registered thresholds were 0.50 for "flattens" and 0.20 for "partial". The
two estimators never differ by more than 0.0009, so this is not an estimator
artifact, and `T₂₉` and `T₃₁` carry the verdict because their `θ` was blind.

**And the correction has the wrong sign, which is the harder failure. PROVEN,
given the measurements.** `θ ≤ 1` forces `√(2 ln(θD)) ≤ √(2 ln D)`. So at any `m`
where the measurement already exceeds `√(2 ln D)`, the `θ` correction moves the
prediction **away** from the data, and no admissible `θ` can close the gap. That
happens at 7 of the 9 tested `(level, m)` pairs, and at `T₃₁` at all three:
`R₁ = 13.486` against `√(2 ln D) = 6.7160`, `R₈ = 7.699`, `R₃₂ = 7.267`. The `θ`
that would be needed at `T₃₁, m = 1` is `5.022e+29`.

**The residual is widening, not dying. MEASURED.** `R₁/√(2 ln D)` = 1.6034,
1.7157, 2.0081 at `T₂₃`, `T₂₉`, `T₃₁`. Across the grid at `T₃₁` the ratio runs
13.486 down to 6.299 against 6.7160, so the whole `m`-dependence sits above the
incumbent level at small `m` and only crosses it near the top of the grid.

**No prior-art search was run on the `m`-dependence of the tail factor**, whose
owning convention is the scan statistic on the circle
([../../SEARCH-CONVENTIONS.md](../../SEARCH-CONVENTIONS.md) §1); this pass makes
no claim about what is or is not in that literature.

---

## 4. The turnover, charted

Producer: [`../../scanstat2-02-crossover.js`](../../scanstat2-02-crossover.js).

**The duality, at every `m` rather than twelve. VERIFIED.** On `T₁₃`,
`max |sd_m − sd_{D−m}| = 3.025e-9` over all 1484 values of `m`, floating point
only, and `maxsum_m + minsum_{D−m} = W` is exact at 1484 of 1484. The endpoint
case is the free bound the record names: `maxsum_{D−1} = 30024 = W − 6`. Prior art
on the identity is already settled at
[../../SEARCH-CONVENTIONS.md](../../SEARCH-CONVENTIONS.md) §3, which records it as
in print in convention and not verbatim.

**The shape is a plateau with mirrored ramps, not an arch. MEASURED.** Over the
middle band `[124, 1361]` at `T₁₃`, `sd_m` has mean 35.5355 with standard
deviation 4.0131, minimum 21.43 and maximum 42.77. The recorded "peak at
`m = 742`" is 42.7673, which is that maximum: the top of the scatter on a flat
stretch, not a summit. The octave-window local exponent reads within about 0.10 of
zero everywhere from `m = 128` to `m = 1400`, against a fit residual of about
0.12.

**The ramp has a scale, and the frozen grid is on a different part of it at every
level. MEASURED.** The smallest `m` reaching half the plateau is 3 at `T₁₃`, 19 at
`T₁₇`, 372 at `T₁₉`; `sd₆₄/(plateau mean)` is 1.1467, 0.6526, 0.3689. At `T₁₃` the
fitted grid runs past the plateau onset entirely.

**The registered comparison fires, and its attribution is refuted by extending it.
MEASURED.** `H(m≤16) − H(m≤64)`:

| level | difference | in s.e. | `64/D` |
|---|---|---|---|
| `T₁₃` | +0.0260 | 1.13 | 4.310e-2 |
| `T₁₇` | +0.0226 | 1.19 | 2.873e-3 |
| `T₁₉` | +0.0095 | 0.73 | 1.690e-4 |
| `T₂₃` | +0.0200 | 2.09 | 8.048e-6 |
| `T₂₉` | +0.0179 | 2.25 | 2.981e-7 |
| `T₃₁` | +0.0177 | 2.61 | 1.028e-8 |

On the three shallow levels alone this reads as a turnover effect decaying as the
grid retreats. The deep levels kill that reading: the difference is flat in size
and rising in significance while `64/D` falls through eight orders of magnitude.
**INFERRED: `ln sd_m` is concave in `ln m` at small `m` at every level, so `H` is
a grid-dependent summary of a curve everywhere.** That is an independent reason,
beyond §2's failed prediction, not to fit `H(ln D)` with a line: the quantity
being extrapolated is not a level invariant.

---

## 5. Corrections and additions to the record

Proposals only. No live document was edited by this pass.

1. **[../../TODO.md](../../TODO.md) item 0c, proposed edit, not made here** (0c is
   paired with U-FRAME §5a under `../../qc/ledgers.js`). The clause should read:
   the `√m` factor is **REFUTED** at six exact levels, `H` measuring 0.2661,
   0.2804, 0.3001, 0.3216, 0.3367, 0.3460 against 0.5, the last of them out of
   sample and blind. The replacement is **not a law in `D`**: the pre-registered
   rule `H = 0.220795 + 0.006146 ln D`, refitted on all five earlier levels,
   predicted `0.359402` at `T₃₁` with band `[0.350777, 0.368027]` and the measured
   value 0.3460 ± 0.0068 fell outside it, and the same form failed again and
   independently at `T₃₇` (0.3565 against 0.381254, band `[0.369866, 0.392641]`). The `√(2 ln D)` factor is **REFUTED**
   too, and its one named repair, the extremal-index level `√(2 ln(θ D))`, is
   refuted with it: the measured `excess/sd_m` exceeds `√(2 ln D)` at small `m`
   while `θ ≤ 1` can only lower it, and the discrepancy grows with `D`
   (`R₁/√(2 lnD)` = 1.6034, 1.7157, 2.0081 at `T₂₃`, `T₂₉`, `T₃₁`). And no
   single exponent should be quoted at all, because `H(m≤16) − H(m≤64)` is
   positive at all six levels at up to 2.61 s.e.

2. **The previous pass's line "the linear-in-`ln D` rule predicts one level ahead
   to within a fifth of a standard error" must lose its forward-looking force.**
   It did so once and failed the next time, from outside a band with three
   residual degrees of freedom. `import-scanstat.md` §3 already refuses to
   extrapolate it to `H = 0.5`; the correction is stronger, that it should not be
   extrapolated one level either.

3. **The duality's verification can be upgraded.** `import-scanstat.md` §0 says
   VERIFIED at fifteen values of `m` (twelve printed). It is now verified at all
   1484 values of `m` on `T₁₃`, exactly on the `maxsum`/`minsum` pairing and to
   3.025e-9 on the `sd` pairing.

4. **The turnover should be described as a plateau.** `import-scanstat.md` §1(e)
   says `sd_m` peaks at `m = 742`, one off `D/2`, at 3.554 times `sd₁`. True but
   misleading: 42.7673 is the maximum of a flat, scattered stretch whose mean is
   35.5355 and whose standard deviation is 4.0131. There is no arch to fit.

## 6. Proposed regrade of IMPORT-MAP row 1

Report only; [../../IMPORT-MAP.md](../../IMPORT-MAP.md) was not edited.

| field | proposed |
|---|---|
| status | **LANDED, kill confirmed, both candidate laws now refuted** |
| fit | EXACT-IDENTITY, confirmed; the `D′`/θ machinery applies verbatim and has now been measured at three levels |
| circularity | CLEAN, unchanged |
| payoff banked | **THEOREM** (the complementary-window duality, verified at every `m` on `T₁₃`) + **REFUTATION** of `σ√m` at six exact levels + **REFUTATION** of the exponent law `H = a + b ln D`, out of sample at `T₃₁` + **REFUTATION** of `√(2 ln(θD))` as the tail factor, by magnitude and by sign + **METHOD** (the streaming extremal index from sliding-maximum histograms, verified against the stored-position estimator) |
| what the row must lose | the DERIVED-CONSTANT claim. `H = 0.2205 + 0.0061 ln D` was pre-registered, validated one level out, and then failed the next level from outside its own band; it is a fitted description of five points, not a constant |
| what the row keeps | `D′` fails below `m` and nowhere else, θ is below 1 and tracks `1/m` loosely, θ is lower order, and `sd_m = σ√m` is what breaks |

One line of calibration for the whole row: the import **delivered a kill and no
law**, and it has now also killed the replacement law it proposed. `TODO 0c` still
has no bound and its price rider is unchanged.

## 7. Not reached

- **What the tail factor IS.** `excess/sd_m` is above `√(2 ln D)` at small `m`,
  below it at large `m`, not monotone in between (13.486, 10.670, 10.948, 10.009,
  8.434, 7.699, 8.321, 7.344, 6.964, 7.267, 6.048, 6.299 at `T₃₁`), and its
  departure grows with `D`. Nothing here explains that.
- **The shape of `H(ln D)`.** The series is bending, but six points do not
  identify a limit, and §4 says the points are not measurements of the same
  invariant anyway. A grid-free definition of the exponent, for instance the local
  slope at fixed `m`, is the obvious next object and was not built.
- **The seven-level refit.** `T₃₇` was reached by the sibling pass rather than by
  this one, so the joint post-hoc fit over all seven levels, which is that pass's
  registered follow-up step, is still uncomputed. It needs `H(T₃₁) = 0.345957`
  from here and one `--combine-only` invocation there.
- **No literature was read.** No Glaz-Naus-Wallenstein theorem was opened, and no
  published asymptotic for a moving-sum maximum over a dependent integer word was
  sought, under the scan statistic on the circle or any other convention
  ([../../SEARCH-CONVENTIONS.md](../../SEARCH-CONVENTIONS.md) §1).
