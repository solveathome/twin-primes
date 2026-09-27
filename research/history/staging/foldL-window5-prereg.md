# Fold-L window 5 — pre-registration of the extinction test at W = 2·10¹¹

<!-- ledger
id: Q-foldL-window5
status: OPEN
todo: none
question: Does the fold extinction law score one decade blind at W = 2e11?
verdict: Pre-registration only, committed alone before the producer existed: the predictions apply the recorded rate law E[X_p] = kills(Y,p)*A*exp(-c*theta_p/mbar_before(p)) unchanged, and nothing here is a measurement.
-->

*Staging note, pre-registration only. Nothing here is a measurement and nothing
here is integrated into a live document. Written and committed alone, before the
producer `research/foldL-window5-01-extinction.js` existed, so that the commit
graph carries the order. Calibration marked on every claim: PROVEN, VERIFIED by
exact computation, MEASURED, PREDICTED.*

## 0. What fires, and why this window

`attack-foldL-06-scaling.md` measured the rate law

> `E[X_p] = kills(Y,p) · A · exp(−c·θ_p/m̄_before(p))`

at four window lengths, `Y = 2·10⁷, 2·10⁸, 2·10⁹, 2·10¹⁰`, with the last fold
carrying a kill run of length two or more reading 181, 331, 421, 457. Three of
those windows were out of sample against a pre-registration and the verdict was
CONFIRMED on all four of its criteria.

`paper/proposals/prop-thinning-null.md` §5 carries the standing clause:
**"Downgrade toward RETIRED if the rate law misses at a fifth window."** The same
paragraph names the two reasons the clause exists: the model runs between 0.75
and 0.87 of prediction on the counts at all four windows, always in the same
direction, and the largest window's extinction fold landed exactly on the floor
of its band. Neither is a failure and both are the shape a law takes shortly
before it stops working.

This note fixes the fifth window at `W = 2·10¹¹`, one decade above the largest
window measured, and writes down every number the run will be scored against
before the run exists.

`import-stein.md` §2.4 has since DERIVED the pair `(A, c) = (2.2091e−2, 1.0701)`
from a first-moment computation with no fitting, against the record's fitted
`(2.4312e−2, 1.0818 ± 0.0317)`. Both pairs are pre-registered here, labelled,
with what their difference can and cannot decide at this window stated in §3.5
before the data exists.

## 1. The instrument, and its validation

The producing instrument is `research/attack-foldL-06-scaling.js`, whose
chunked streaming engine re-derives the fold history from the key sequence with
a stack of strictly decreasing keys, exactly and without boundary
approximation. The fifth window is run by a copy of that engine in
`research/foldL-window5-01-extinction.js`, which does not yet exist as this note
is committed.

**VERIFIED, 2026-08-19, before this note was written.** The whole embedded tail
of `research/attack-foldL-06-scaling.js` reproduces byte for byte on this
machine:

```
node research/qc/embed.js --check --streams both --timeout 600 research/attack-foldL-06-scaling.js
  code-sha256  matches
  out-sha256   matches
```

That is a stronger check than re-running the smallest window alone, because it
covers Stage A's thirty digit-for-digit assertions against angle 4, the
`Y = 2·10⁷` window whose numbers are 181, N2 = 8, S1 = 8, 29 folds with L ≥ 2,
Σ(L−1) = 31, max L = 3, last θ ≤ G₂ at 463, G₂ = 1458 at fold 1499, and the
`Y = 2·10⁸`, `2·10⁹`, `2·10¹⁰` windows and the offset window with them. The
engine on this machine and the engine that produced the record are the same
engine producing the same numbers.

**Runtime, priced from the record's own timings.** The record states
`Y = 2·10¹⁰` sieves 3,333,333,333 slots in 78.7 s inside 548 MB, and the
`Y = 2·10⁹` calibration in 8.0 s. That is 4.24e7 and 4.17e7 slots per second,
so the engine is linear in `Y` at fixed chunk size, as its memory argument says
it must be. `W = 2·10¹¹` holds 33,333,333,333 slots, so the core measurement
prices at about 790 s at the record's fold ceiling, about 840 s at the extended
ceiling of §4. The calibration stage adds 9 s. **PREDICTED wall time 15 min at
an idle machine, and up to about 45 min under `nice -n 15` on a machine shared
with eleven other agents.** Memory is unchanged from the record at about 550 MB,
because the chunk size is unchanged.

## 2. The anchor, stated before the run

**The anchor is `A = 0`**, which is the anchor of all four windows in the
record. The engine throws unless the anchor is a multiple of 6, and 0 is.

This is the choice that keeps the fifth point comparable with the four, and it
is also the choice that carries the record's own caveat, so the caveat is
restated here rather than discovered later. `attack-foldL-06-scaling.md` §5
moved the `Y = 2·10⁹` window to `[10000000002, 10000000002 + 2·10⁹)` and the
extinction fold moved from 421 to 349, **a swing of 72 in p at identical window
length**, while m̄ and the kill count moved by two parts in a thousand or less.
That 72 is the only empirical measurement the corpus has of the sampling spread
of this extreme statistic, and it is the same order as the per-decade increments
90 and 36 that the record already refuses to read as deceleration.

**So the following is pre-registered about anchors.** The fifth window is run at
anchor 0 and scored at anchor 0. No second anchor is run before the verdict is
written, and no second anchor may be run after a miss and then used to overturn
it. If criterion (d) of §5 fails, that is a licensed reason to run a second
anchor at the same length, and the result of that run is reported as a
measurement of the sampling spread, not as a re-score of the fifth window. A
second anchor is registered here in advance as an explanation, never as a
repair.

## 3. The predictions

### 3.1 The machinery, reproduced from the record's description

All of it is `attack-foldL-06-scaling.md` §3.2 and Stage B of its producer, and
nothing in it is new here.

- `kills(Y,p) = (Y / m̄_before(p)) · (2/p)`, with `m̄_before(p)` the measured
  `Y = 2·10⁹` value. Legitimate because `m̄(p)` carries no `Y` dependence and no
  drift with height (PROVEN: `key(n)` depends only on `n` mod the product of the
  folds, so the level-p density is exactly periodic).
- `E[X_p] = kills(Y,p) · A · exp(−c·θ_p/m̄_before(p))`, with
  `θ_p = 2p − 2η`, `η = +1` for `p ≡ 1 (mod 6)` and `η = −1` for `p ≡ 5 (mod 6)`.
- **Crossing prediction of the extinction fold**, the law's own literal §8
  arithmetic: the last fold with `2c·p/m̄(p) ≤ ln kills(Y,p)` at the record's
  `c = 1.22`, using `m̄_after`.
- **Survival prediction and band**: `P(last ≥ p) = 1 − exp(−Σ_{q≥p} E[X_q])`.
  Median at tail sum `ln 2`, 10th percentile at tail sum `ln 10 = 2.302585`,
  90th at `−ln 0.9 = 0.105361`. The band is the union over
  `c ∈ {c−3se, c−2se, c, c+2se, c+3se}` with `A` profiled at each `c`, exactly
  the five-point set the record used.
- **Counts**: `N2(Y)` = number of folds `p ≥ 100` with `L ≥ 2`, predicted by
  `Σ (1 − exp(−E[X_p]))`; `S1(Y) = Σ_{p≥100}(L−1)`, predicted **equal to N2**
  because the alternation constraint caps runs at length 2 above `p = 100`, a
  clause the record pre-registered as REFUTED for the geometric chain and which
  held at all four windows. Acceptance band on both: prediction × [0.7, 1.3],
  then widened by ±2 Poisson standard deviations.
- Predictions are computed on the record's own fold set, the 237 primes from 5
  to 1499. Recomputing them on the extended sweep of §4 moves no headline figure
  below, which was checked before this note was written.

### 3.2 PREDICTION 1, from the record's fitted pair

`A = 2.4312e−2`, `c = 1.0818 ± 0.0317`. This is the pair the record's own kill
criterion is written against, and it is **the pair that decides the verdict**.

| statistic | prediction at W = 2·10¹¹ |
|---|---|
| crossing fold `p*`, at the record's literal `c = 1.22` | **653** |
| survival median last-pair fold | **683** |
| 10–90% band, unioned over `c ± 3se` with `A` profiled | **[571, 877]** |
| 10–90% band, this pair alone with no `c` union | [617, 809] |
| `N2(p ≥ 100)` | **80.1**, accept **51.2 – 108.9** |
| `S1(p ≥ 100)` | **80.1**, accept **51.2 – 108.9** |
| `S1` under the geometric chain (REFUTED contrast, not a prediction) | 112.8 |

Predicted count of folds with `L ≥ 2` by decade of p:

| decade | prediction |
|---|---|
| [5, 10) | 2.0 (no prediction, printed for completeness) |
| [10, 30) | 6.0 (no prediction) |
| [30, 100) | 15.0 (no prediction) |
| [100, 300) | **37.0**, saturated: all 37 folds of the decade |
| [300, 1000) | **43.0** |
| [1000, 1500) | **0.0** |

Predicted `Σ E[X_p]` by decade: 7.518e7, 3.103e7, 4.374e6, 1.996e5, 8.534e2,
5.223e−3.

### 3.3 PREDICTION 2, from the Stein-derived pair

`A = 2.2091e−2`, `c = 1.0701`, the zero-parameter first-moment values of
`import-stein.md` §2.4, which that note labels a first-moment computation and
not a Stein-derived result, its prereg §5 having voided the Stein label.

| statistic | prediction at W = 2·10¹¹ |
|---|---|
| survival median last-pair fold | **683** |
| 10–90% band, this pair alone (it carries no standard error) | **[619, 811]** |
| `N2(p ≥ 100)` | **80.4**, accept **51.4 – 109.4** |
| `S1(p ≥ 100)` | **80.4**, accept **51.4 – 109.4** |
| crossing fold at `c = 1.0701` (labelled, a category mix, see below) | 761 |
| `S1` geometric contrast (REFUTED) | 113.5 |

Decade counts: 2.0, 6.0, 15.0, 37.0, **43.4**, **0.0**.

The crossing row is labelled and is not scored. The crossing arithmetic is the
one-parameter form calibrated at `c = 1.22` against a different statistic, and
substituting a two-parameter `c` into it mixes two calibrations. It is printed
because the number is cheap and a reader will otherwise compute it and wonder.

### 3.4 Per-fold bands

The per-fold clause is `import-stein.md` §2.4 P1's form, `|X_p − λ| ≤ 3√λ`,
applied here to the model mean `λ = E[X_p]`, because the derived `λ_p` of that
note is computed from the window's own qualifying gaps and therefore does not
exist until the window is measured. Selected folds, both pairs:

| p | θ | θ/m̄ | kills(2·10¹¹) | E[X] fitted, ±3√λ | E[X] Stein, ±3√λ |
|---|---|---|---|---|---|
| 307 | 612 | 7.670 | 1.6330e7 | 98.88 [69.05, 128.71] | 98.29 [68.54, 128.03] |
| 331 | 660 | 8.062 | 1.4761e7 | 58.53 [35.58, 81.49] | 58.45 [35.51, 81.38] |
| 379 | 756 | 8.824 | 1.2318e7 | 21.42 [7.53, 35.30] | 21.58 [7.64, 35.51] |
| 421 | 840 | 9.467 | 1.0708e7 | 9.29 [0.15, 18.43] | 9.43 [0.22, 18.64] |
| 457 | 912 | 10.002 | 9.5996e6 | 4.66 [0, 11.14] | 4.76 [0, 11.31] |
| 523 | 1044 | 10.952 | 8.0230e6 | 1.40 [0, 4.94] | 1.44 [0, 5.04] |
| 601 | 1200 | 12.122 | 6.7232e6 | 0.330 [0, 2.05] | 0.345 [0, 2.11] |
| 653 | 1308 | 12.851 | 6.0185e6 | 0.134 [0, 1.23] | 0.142 [0, 1.27] |
| 683 | 1368 | 13.249 | 5.6719e6 | 0.082 [0, 0.94] | 0.087 [0, 0.97] |

The producer prints the whole table for every fold `p ≥ 300` with
`E[X_p] ≥ 0.05`, and the pre-registered per-fold clause is: **at folds
`p ≥ 100` with `E[X_p] ≥ 1`, at least 90% of measured `X_p` lie inside
`E[X_p] ± 3√E[X_p]`.** This is a count clause on the body of the distribution
and it is deliberately separate from the extinction clause, which is an extreme.

Cumulative tail `Σ_{q≥p} E[X_q]`, fitted pair then Stein pair, which is what the
band arithmetic is made of:

| p | 457 | 571 | 653 | 683 | 877 | 1009 | 1201 | 1499 |
|---|---|---|---|---|---|---|---|---|
| fitted | 42.75 | 5.440 | 1.266 | 0.694 | 3.424e−2 | 5.223e−3 | 2.756e−4 | 4.506e−7 |
| Stein | 44.03 | 5.720 | 1.349 | 0.744 | 3.782e−2 | 5.881e−3 | 3.193e−4 | 5.392e−7 |

### 3.5 What this window cannot decide, registered before it runs

**The fifth window cannot separate the fitted pair from the derived pair, and
any later claim that it did is an artifact.** Both put the survival median at
the same fold, 683. Their 10–90% bands are [617, 809] and [619, 811], which
differ by one fold at each end, and the fold spacing near 683 is 6 to 12. Their
count predictions are 80.1 and 80.4 against an acceptance band 58 wide. The two
pairs differ by 9% in amplitude and 1.1% in rate, and at this window that
difference is far below the resolution of every statistic being measured.

What the fifth window does decide is whether either pair works at all, one
decade above where either was calibrated. That is the whole of its power and it
is worth having, but the amplitude question is untouched by it.

## 4. The sweep ceiling

**The fold sweep runs to `p ≤ 2999`, 428 folds, against the record's 237 folds
to 1499.** Scoring is on the restriction to `p ≤ 1499`, which is the record's
object exactly. The extension exists to kill one objection and one only.

The extension is sound because the level-p object depends only on keys strictly
below p, so raising the ceiling adds folds and changes no statistic of the folds
below it. **VERIFIED, before this note was written:** the `Y = 2·10⁹`
calibration run at ceiling 2999 reproduces every figure of the record, kills at
folds 5, 7, 23, 421 and 1451, and the aggregates `N2 = 58`, `Σ(L−1) = 64`,
`ΣX = 20,317,943`, max L = 3, last L ≥ 2 fold 421, both restricted to `p ≤ 1499`
and unrestricted. The extra folds cost about 6% more sieve time.

The objection it kills is `attack-foldL-06-scaling.md` §7's own. At `Y = 2·10¹⁰`
the last fold whose `θ_p` still fits under the window's record gap `G₂` was 1021,
comfortably below the ceiling 1499. At `W = 2·10¹¹` the level-1499 set holds
about 1.59e9 slots at spacing 126, so its record gap should land near 2700 and
the last fold with `θ ≤ G₂` should land near 1300, which is close enough to 1499
that a reader is entitled to ask whether the ceiling and not the arithmetic is
what stopped the runs. At ceiling 2999 the question is answered by measurement.

Nothing about the extinction fold itself needs the extension: the predicted
cumulative tail above fold 1009 is 5.2e−3, so the chance the law puts any pair
above fold 1009 is about half a percent, and above 1499 it is 5e−7.

## 5. The scoring rule, stated before the data exists

The verdict is read off the restriction to `p ≤ 1499` at anchor 0, against
PREDICTION 1 of §3.2. Four criteria, the record's own:

- **(a)** the measured last fold with `L ≥ 2` lies inside **[571, 877]**;
- **(b)** measured `N2(p ≥ 100)` lies inside **[51.2, 108.9]**;
- **(c)** measured `S1(p ≥ 100)` lies inside **[51.2, 108.9]**;
- **(d)** the extinction sequence **181, 331, 421, 457, p\*₅ is strictly
  increasing**, that is `p*₅ > 457`.

**HIT** requires all four. **MISS** is any one of the four failing, except that
a failure of (a) alone, in the direction the model's known bias predicts, with
(b), (c) and (d) all holding and with `p*₅` inside a factor 1.5 of the median
683, that is `p*₅ ≥ 456`, is **PARTIAL** in the record's own §3.4 language and
is not a MISS.

### What HIT does

- The rate law's out-of-sample support goes from three windows to four, spanning
  four decades of `Y`. Its calibration stays MEASURED. It does not become
  PROVEN, and H″ underneath it stays UNPROVEN, which is where
  `attack-foldL-06-scaling.md` §6 already puts it.
- `prop-thinning-null.md` §5's "Downgrade toward RETIRED if the rate law misses
  at a fifth window" does **not** fire. **The grade does not improve.** WEAKENED
  was set by found prior art, Hawkins 1957 and Neudecker–Williams 1974 and Bunge
  1996, and a fifth window says nothing about prior art. A HIT that is written
  up as an upgrade is a misreading of why the grade is where it is.
- The hot bias gets a fifth reading. Measured over predicted `N2(p ≥ 100)` has
  read 0.75, 0.82, 0.87, 0.82. **If the fifth reading is again inside [0.70,
  0.90], the systematic is confirmed at five windows and should be written into
  the law as a known 20% overprediction on counts, not absorbed by the band for
  a fifth time.** A band that has absorbed the same one-directional miss five
  times is a band that is doing the law's work for it.

### What MISS does

- `prop-thinning-null.md` §5's downgrade trigger **fires**, and the extinction
  half of that proposal moves toward RETIRED. The law drops from "MEASURED and
  predictive" to an observation with a fitted scaling that does not extrapolate
  past `2·10¹⁰`.
- The identity half of the proposal, `(p−2)Φ_new = (p−4)Φ + Ω + 2Ψ + Δ`, is
  PROVEN and is untouched by any outcome here. So is the group law, and so is
  the Y-independence of `m̄`. A MISS retires an empirical law, not a theorem, and
  a write-up that lets the miss spread past the extinction half is wrong.
- Which criterion fails changes what the miss means, and the readings are fixed
  here so they cannot be chosen afterwards:
  - **(d) fails**, `p*₅ ≤ 457`: the first suspect is the anchor, because the
    measured swing at fixed length is 72 in p and the predicted increment from
    457 is about 226. A `p*₅` below 457 is more than the anchor noise can
    explain on its own, so this is a real miss, and it also fires
    `prop-thinning-null.md` §5's separate clause about the 72 swing dominating
    the increments. A second anchor is then licensed, as a measurement of spread
    only, under §2.
  - **(a) fails low with (b), (c), (d) holding**: the hot bias appearing as an
    extreme, which is exactly what happened at `2·10¹⁰` where the measurement
    landed on the band floor. PARTIAL, and the correct repair is to fix the bias
    in the model rather than widen the band.
  - **(a) fails high**, `p*₅ > 877`: the law underpredicts the tail, which no
    window has yet shown, and the whole direction of the systematic would be
    wrong. That is a stronger falsification than a low miss and should be
    reported as such.
  - **(b) or (c) fails**: the counts are the better-powered statistic and a
    count miss is not absorbable. The shape of the rate law is wrong, not its
    constants.
- A MISS says nothing about the derived pair versus the fitted pair, by §3.5.
  Both fail together or neither does.

### What is registered as not scored

The folds below `p = 100`, which the record refuses to predict because
alternation caps run lengths there. The crossing folds 653 and 761, which are
point predictions from a different calibration and are reported for interest.
The geometric-chain `S1` values 112.8 and 113.5, which are REFUTED and carried
as contrast. The full-sweep statistics above `p = 1499`, which are a range check
and not a test.

## 6. Reproduction

```
node research/qc/embed.js --check --streams both --timeout 600 research/attack-foldL-06-scaling.js
BIGY=2e11 STAGE=predict node research/attack-foldL-06-scaling.js
node research/foldL-window5-01-extinction.js
```

The second command reproduces the fitted-pair rows of §3.2 from the record's own
instrument, without touching any window other than the `2·10⁹` calibration. The
third is the producer this note pre-registers, which does not exist at the
moment this note is committed, and which reproduces §3.2, §3.3 and §3.4 in its
own Stage B before measuring anything.

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed
by document.*
