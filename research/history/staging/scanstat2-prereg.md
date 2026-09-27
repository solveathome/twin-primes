# Pre-registration: scanstat2 — T₃₁, and whether the tail factor is the extremal index

<!-- ledger
id: Q-scanstat2-prereg
status: CLOSED
todo: none
question: Does the linear-in-ln D exponent rule predict H(T31), and is the tail factor the extremal index?
verdict: Sealed and committed alone before any producer for the pass was written; scored in scanstat2.md, where both follow-ups come back negative: T31 missed the pre-registered band from outside, so the linear law describes five points and is not a law, and the tail factor is not the extremal index, with the correction pointing the wrong way at seven of nine.
-->

**Sealed before any producer for this pass was written, and committed alone.** The
previous pass (`import-scanstat.md`) declared its pre-registration but shipped it in
the same commit as the record it scored; the adversarial review flagged that as the
weakest link in its custody. This file is committed by itself, with message
`prereg: scanstat2`, and nothing else is in that commit. `git log --stat` is the
proof.

Every number in §1 and §3 below was computed from **already embedded** corpus
figures by a throwaway script kept outside the repository, so that no producer file
existed when the predictions were fixed. The producer
`research/scanstat2-01-t31.js` recomputes each of them from the same published
inputs and aborts on any mismatch, so the freeze is machine-checkable after the
fact as well as commit-ordered.

## 0. The two follow-ups this pass registers

`import-scanstat.md` §6 named exactly two things it did not reach: T₃₁ was not
computed, and the tail factor was not explained. This file registers a prediction
for the first and a decision rule for the second. A third item, the crossover curve
at T₁₃, is descriptive and carries no numeric prediction; §4 registers only the
comparison that would make it adversarial.

## 1. Prediction: H(T₃₁)

### Inputs, all embedded, none recomputed

The exponent H at a level is the OLS slope of `ln sd_m` on `ln m` over the frozen
grid `M = [1,2,3,4,6,8,12,16,24,32,48,64]`, where `sd_m` is the exact standard
deviation of `slot[i+m] − slot[i]` over `i ∈ Z/D`. Five levels are already exact
and published:

| level | D = ∏_{5≤p≤x}(p−2) | ln D | H (published) | sd₁ (published) |
|---|---|---|---|---|
| T₁₃ | 1485 | 7.303170 | 0.2661 | 12.0326 |
| T₁₇ | 22275 | 10.011220 | 0.2804 | 14.5863 |
| T₁₉ | 378675 | 12.844434 | 0.3001 | 17.1618 |
| T₂₃ | 7952175 | 15.888956 | 0.3216 | 19.4656 |
| T₂₉ | 214708725 | 19.184793 | 0.3367 | 21.4409 |

T₁₃, T₁₇, T₁₉ and their sd₁ are the embedded output of
`research/import-scanstat-03-prereg.js` (1); T₂₃ and T₂₉ and their sd₁ are the
embedded output of `research/import-scanstat-04-score.js` (1), (2), (3). The four
decimal places printed there are the inputs used here, so this refit is reproducible
by anyone holding only the embedded record.

The target level is T₃₁: `D = ∏_{5≤p≤31}(p−2) = 6226553025`,
`W = 6·∏_{5≤p≤31} p = 200560490130`, `ln D = 22.552089`, `mbar = W/D = 32.21058`,
`√(2 ln D) = 6.7160`.

### The rule

OLS of `H` on `ln D` over **all five** levels. The 3-point law frozen in the previous
pass was `H = 0.220511 + 0.006140 ln D`; refitting on five points gives

```
H = 0.220795 + 0.006146 * lnD          s = 2.4468e-3,  se(slope) = 2.6083e-4
residuals (T13..T29): +4.191e-4  -1.925e-3  +3.620e-4  +3.150e-3  -2.006e-3
```

Evaluated at `ln D = 22.552089`:

> **H\*(T₃₁) = 0.359402**

### The band, and why this one

The adversarial review priced the 3-point fit's band at T₂₉ as **[0.281, 0.396]**.
That interval is reproduced here exactly, to the digits quoted, by the 95%
**confidence band on the fitted line** (mean response),
`ŷ ± t_{n−2,0.975} · s · √(1/n + (x₀−x̄)²/Sxx)`, with `n = 3`, `t₁ = 12.7062`: it
returns `[0.2806, 0.3960]`. So the same construction is used here, with `n = 5` and
`t₃ = 3.1824`, which is the point of adding two levels: three degrees of freedom
instead of one.

> **95% confidence band on the line at T₃₁: [0.350777, 0.368027]** (half-width
> 0.008625, `se_mean = 0.002710`)
>
> 95% prediction band, for reference only, not the criterion:
> **[0.347782, 0.371022]**

### The criterion, and what each outcome supports

Let `Ĥ` be the measured OLS slope at T₃₁ on the same grid, with its own regression
standard error `se(Ĥ)` (0.0096 at T₂₃ and 0.0080 at T₂₉, so ~0.008 is expected).

- **INSIDE [0.350777, 0.368027]**: the linear-in-`ln D` rule is a *description* that
  holds over six exact levels spanning `ln D` from 7.30 to 22.55, three of them out
  of sample and two of them blind. It remains a description and not a law: §1(d) and
  §1(e) of `import-scanstat.md` still forbid extrapolating it to `H = 0.5`, and the
  crossover of §4 below is a second reason.
- **OUTSIDE the band**: the linear-in-`ln D` rule was a coincidence of a short
  ladder. Five points on a smooth monotone series can be fitted by many curves, and
  a sixth point at `ln D = 22.55` is a 3.4-unit extrapolation past the last one; a
  miss falsifies the specific functional form, not the finding that `H < 0.5`.
- **Either way**, the `√m` kill stands or falls only on whether `Ĥ` is far from 0.5.
  `√m` is refuted at T₃₁ if `Ĥ + 3·se(Ĥ) < 0.5`. This is registered separately
  because it is a different claim from the shape of `H(ln D)`, and the previous pass
  conflated their strengths once already.

### Secondary, weak, and registered as weak

The same five-level refit on `ln sd₁`:

```
ln sd_1 = 2.177678 + 0.048380 * lnD      s = 4.5636e-2
ln sd_1*(T31) = 3.268747   ->   sd_1* = 26.2784
95% confidence band on the line: [3.107883, 3.429610]  ->  [22.3736, 30.8646]
```

That band is ±18%, so this prediction can barely be failed and is registered only so
that a wild miss is on the record. `sd₁` is a property of the gap multiset, not of
the word's order, and there is no reason on file to expect it linear in `ln D`.

### Custody gates the producer must pass before it reports anything

1. slot count at T₃₁ = **6226553025** exactly (`= ∏_{5≤p≤31}(p−2)`).
2. `maxsum₁(T₃₁) = 348 = G₂(31#)`, the eleventh exact ladder entry, as carried by
   `research/exact-g2-ladder.js` and reproduced by `research/a3-09-histogram-operator.js`
   and `research/a3-10-lower-tightness.js`.
3. `Σ gaps = W = 200560490130`, i.e. `mbar·D = W` exactly.
4. The same engine, run first at T₂₃ and T₂₉, must return `maxsum₁` = 204 and 258
   and `D` = 7952175 and 214708725, and must reproduce H = 0.3216 and 0.3367 to four
   decimals. This is a deliberate recomputation of embedded artifacts, permitted
   under the standing compute rule as validation of a success before it is extended;
   it is also the only way to check the five-level refit's inputs from inside a
   producer.

Any gate failing aborts the run. A partial green is a defect.

## 2. Not predicted here

The T₃₁ `maxsum_m` values themselves, and the ln-RMS scores of Models A′ and B′
against them, are **not** given a numeric prediction. Model A′ = `sd₁·m^{H*}` and
Model B′ = `sd₁·√m` are both anchored at the measured `sd₁(T₃₁)`, which is unknown
until the run; what is registered is the comparison rule, unchanged from the previous
pass: **A′ must beat B′ on the ln-RMS of `excess_m = maxsum_m − m·mbar` over the
frozen grid**, using `excess_m = sd_m·√(2 ln D)` in both cases.

## 3. The tail-factor test

### What is being tested

`import-scanstat.md` §0 and §6 leave the residual entirely in the tail factor:
`excess_m/sd_m` is not the constant `√(2 ln D)` but falls from 9.039 to 4.707 across
the grid at T₂₃ and from 10.628 to 5.747 at T₂₉. The named candidate explanation is
Leadbetter's extremal-index correction: replace the level `√(2 ln D)` with
`√(2 ln(θ_m D))`, where `θ_m < 1` is the extremal index of the moving-sum process at
window `m`, measured in `research/import-scanstat-02-leadbetter.js`.

### Definitions, fixed here

For a level with `D`, `W`, `mbar = W/D`, and for `m` in the θ-grid
**`M_θ = {1, 8, 32}`** (the three windows at which the extremal index is estimated
in the embedded producer, and the only ones for which θ is defined in this corpus):

```
R_m      = (maxsum_m − m·mbar) / sd_m            the measured tail factor, exact
τ⁰       = √(2 ln D)                              the incumbent, constant in m
τ^θ_m    = √(2 ln(θ_m · D))                       the θ-corrected level
ρ_m      = R_m / τ_m                              1 for every m iff the level is right
S(τ)     = population s.d. of { ln ρ_m : m ∈ M_θ }
Δ        = 1 − S(τ^θ) / S(τ⁰)                     the flattening achieved
```

`θ_m` is the runs estimator at `r = m` on the `p = 1e-2` threshold (`u` = smallest
integer with `#{X_i > u} ≤ round(D·p)`), which is the primary column of
`import-scanstat-02-leadbetter.js`. The blocks estimator at `b = 4m` is carried
alongside as a robustness column; the verdict is read off the runs column and the
blocks column must agree in sign and to within 0.05 in Δ or the test is reported
as unstable.

### What "flatten" means, quantitatively

Registered in advance, on Δ, at each level:

| Δ (runs column) | verdict at that level |
|---|---|
| Δ ≥ 0.50 | **FLATTENS.** The θ-corrected level is the tail factor. |
| 0.20 ≤ Δ < 0.50 | **PARTIAL.** θ is a real part of the tail factor and not the whole. |
| Δ < 0.20 | **DOES NOT FLATTEN.** The m-dependence of the tail factor is not the extremal index. |

The overall verdict is the *worst* of the levels tested, and a level qualifies only
if its own θ is measured there rather than borrowed.

### The sign gate, registered separately

`θ_m ≤ 1` forces `τ^θ_m ≤ τ⁰` at every m. So at any m where the measurement already
has `R_m > τ⁰`, the θ correction moves the predicted level **away** from the data,
and no value of `θ_m ∈ (0,1]` can close that gap. Equivalently, the θ that would be
needed is `θ_needed = exp(R_m²/2)/D`, and `θ_needed > 1` is a hard impossibility.
This is recorded as a **SIGN FAILURE at that (level, m)** and is reported whatever Δ
says, because Δ is a spread statistic and can improve while the fit at individual
points gets worse.

### Disclosed non-blindness, in full

At **T₂₃ every input to this test is already embedded**: `R_m` = 9.039, 7.452, 4.894
at m = 1, 8, 32 from `import-scanstat-04-score.js` (1), and θ_runs = 0.9998, 0.5188,
0.2350 with θ_blocks = 0.9988, 0.5292, 0.2334 from `import-scanstat-02-leadbetter.js`.
The T₂₃ outcome was therefore computed before this file was sealed, and it is
disclosed here rather than presented later as a result:

```
T_23  τ⁰ = 5.6372
      ρ⁰ = 1.6035, 1.3219, 0.8682          S(τ⁰)   = 0.2561
      runs:   τ^θ = 5.6372, 5.5196, 5.3742;  ρ = 1.6035, 1.3501, 0.9107
              S(τ^θ) = 0.2368   Δ = 0.0755
      blocks: S(τ^θ) = 0.2367   Δ = 0.0761
      θ_needed = 6.938e+10, 1.439e+05, 1.997e-02  ->  SIGN FAILURE at m = 1 and m = 8
```

So T₂₃ is **not blind and is not evidence**; it is the calibration that shows the
criterion is discriminating rather than rigged, since Δ = 0.076 sits well below the
0.20 threshold and not at it.

At **T₂₉** the `R_m` are embedded but **θ has never been measured at T₂₉ in this
corpus**, in any producer; the owning convention for that object is *scan statistic*
in probability and *MOSUM* in change-point analysis, recorded at
`research/SEARCH-CONVENTIONS.md` §1, and nothing under that convention has been read
here. At **T₃₁** neither `R_m` nor `θ_m` exists anywhere. So T₂₉ is half-blind and
T₃₁ is fully blind, and the verdict rests on those two.

### How θ is to be measured at T₂₉ and T₃₁, fixed here

The estimator definitions are copied verbatim from
`import-scanstat-02-leadbetter.js`: the threshold is the smallest integer `u` with
`#{X_i > u} ≤ round(D·p)` at `p = 1e-2`; `θ_runs(r) = #{i : X_i > u and
X_{i+1..i+r} all ≤ u} / #{i : X_i > u}`; `θ_blocks(b) = #{blocks of length b, index
< ⌊D/b⌋, containing an exceedance} / #{i : X_i > u}`. At T₂₉ and T₃₁ the word cannot
be materialised, so these are accumulated from histograms in the single streaming
pass, using the identity

> `#{i : X_i > u, max(X_{i+1..i+r}) ≤ u} = #{i : max(X_{i..i+r}) > u} − #{i : max(X_{i+1..i+r}) > u}`,

that is, the difference of the exceedance counts of the sliding maxima at window
lengths `r+1` and `r`. The blocks estimator needs only the histogram of
block maxima. The engine is required to reproduce the embedded T₂₃ values
0.9998 / 0.5188 / 0.2350 and 0.9988 / 0.5292 / 0.2334 exactly before its T₂₉ and
T₃₁ outputs are used; a mismatch aborts.

## 4. The crossover rider, and the one adversarial comparison it registers

`import-scanstat.md` §1(e) proves `sd_m = sd_{D−m}`, so the exponent must turn over
and the growth law cannot hold uniformly in `m`. The peak is recorded (m = 742 at
T₁₃, at 3.554·sd₁) but the curve is not. This pass charts `sd_m` for every
`m = 1..D−1` at T₁₃, exactly, and reports the local exponent
`d ln sd_m / d ln m`.

No numeric prediction is registered for the curve. One comparison is:

> If the local exponent is already measurably below its small-`m` value at
> `m = 64`, then the T₁₃ grid exponent 0.2661 is **depressed by proximity to the
> turnover**, because `m/D = 64/1485 = 4.3%` at T₁₃ against `1.0e−8` at T₃₁. The
> rising series 0.2661 → 0.3367 would then be partly an artifact of the grid
> occupying a shrinking fraction of the circle, not purely a fact about `D`.

Registered in advance: **the producer will refit H at T₁₃ on the truncated grids
m ≤ 16 and m ≤ 32 as well as the full m ≤ 64.** If H(m≤16) > H(m≤64) at T₁₃ by more
than one regression standard error, the grid-fraction artifact is REAL and every
level's H must be read as grid-dependent, which weakens §1's description claim
whether or not T₃₁ lands inside the band. If the truncated fits agree, the artifact
is excluded at the size the ladder can see.

## 5. Calibration vocabulary

PROVEN, VERIFIED by exact computation, MEASURED, INFERRED, REFUTED, as in the
previous pass. Nothing in this file is a result; it is all criterion.
