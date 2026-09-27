# The two record nulls that were never run: how much of Kourbatov's b is the trend's own finite-height form, how much is the 6Z lattice, and what is left

<!-- ledger
id: Q-record-null2
status: ANSWERED
todo: Z5
question: How much of Kourbatov's shortfall coefficient b does an inhomogeneous-intensity record null carry, how much does a 6Z-latticed null carry, and what is the residual?
verdict: The inhomogeneous null carries essentially none of b (d b_z = -0.0012 +- 0.0001, MEASURED); the 6Z lattice's share is LAW-DEPENDENT, +0.1113 +- 0.0003 under the memoryless rounding-up law against -0.0060 +- 0.0003 under rounding to nearest, so the null side is a bracket of 16.1 to 25.1 percent of b and three quarters or more stays a residual with no mechanism; record-location-null.md section 8's argued 1.7e-4 lattice bound is wrong but no single number replaces it; the 15 percent estimator disagreement is pinned as an exact weighting identity; and the shape assumption behind every b reading is measured at 1.6 sigma and stays open.
-->

*(2026-08-29. Staging note, HELD; nothing here is integrated into a live
document. Producer: `research/measure-record-null2-0829.js`, formally embedded
by `node research/qc/embed.js` (code-sha256 and out-sha256 in the file's tail),
which makes this family output-custody-bound for the first time: both of its
predecessors, `record-location-null.js` and `lit-kourbatov-shortfall.js`, are
SCRATCHPAD-GRADE and hand-pasted by their own headers. Custody caveat: the
pre-registration in section 1 is timestamped by disk order alone, written and
saved before the producer's first run, and is NOT sealed by a commit; that is a
weaker custody than `zonegap-03-prereg.md`'s and is not presented as equivalent.
No new census, no sieve, no twin data beyond `research/a113274-gap-records.js`,
whose arrays the producer extracts from source at runtime. Calibration marked
per claim.)*

**Category (i) throughout, and this is the whole scope.** Everything below is
null-side calibration of a record-process statistic. Nothing here is a statement
about `T`, about the tile, or about the Zone Postulate, and nothing here is
evidence about the twin prime conjecture in either direction. The quantifier gap
is stated once and stands over every line: Kourbatov-Wolf's strongest conjecture
is an almost-all over a log-sparse record sequence, and an almost-all over a
log-sparse sequence cannot deliver an every-zone statement even if granted in
full (`import-kw-zonegap.md` §0, §2). A number about `b` is a number about a
fitted coefficient in a conjectural model, measured against a simulated null that
is itself a conjecture. The label is this note's own: `attack-wrongdirection-audit.md`
§5 records that Z5 was NOT among the ten items audited, so no audited label exists
for the surrounding item and (i) here is self-assigned.

## 0. What is still open

**The mechanism is untouched, and after both nulls three quarters of `b` is still
a residual.** [MEASURED] Of the data's `b` of 1.2981 in Kourbatov's own
normalisation, the fullest null built here carries 0.3249 and leaves 0.9732, at
4.19 ensemble sd. Neither null run in this pass is a mechanism and neither was
expected to be; what they change is the size of the piece already accounted for,
from about 15% to about 25%, and the whole of that increase is the 6Z lattice.

Still open, unchanged by this note:

- **Why `b > 0` at `k = 2` at all.** No mechanism exists in either corpus.
  Kourbatov's one mechanism argument is stated for `k = 1`
  (`lit-kourbatov-shortfall.md` §1), and this note poses none.
- **Whether the residual is height-dependent** (`A -> 1`, so the effect is a
  low-record artefact). NOT REACHED, as in both predecessors: the top band's
  17 records cannot settle it.
- **Whether either of these two nulls is already run in the owning convention.**
  NOT CHECKED. `lit-kourbatov-shortfall.md` §9's exposure, arXiv:1401.6959's
  Cramer-model ensemble, is still unread.
- **Whether the C2 result survives a different lattice law.** NOT RUN, and it is
  the largest open exposure in this note's own result (§7a).
- **A new exposure this note opens.** The null's `z` distribution is strongly
  right-skewed where the data's is nearly symmetric, `b_med - b_z` reading 0.211
  under the null against 0.018 in the data, and the whole family's location
  comparison assumes the shapes agree. No sigma for that contrast exists.
  FLAGGED, NOT MEASURED.

What moved, with its calibration:

- [ARITHMETIC, exact] The 15% disagreement between the two in-house estimators
  of `b` is pinned: it is a weighted against an unweighted mean of one vector of
  72 numbers and cannot be reduced by more data.
- [MEASURED] C1, the inhomogeneous-intensity null, carries essentially none of
  `b`: `d b_z = -0.0012 +- 0.0001`.
- [MEASURED] C2, the 6Z lattice, carries `d b_z = +0.1113 +- 0.0003`, which is
  13.3% of the 6.0% `A`-deficit against the "two orders below the effect" that
  `record-location-null.md` §8 argues, so that argument is off by about 1.6
  orders; the ratio `0.1113/1.7e-4 = 662` is not the right comparison, because
  the cited figure is a relative gap perturbation and not a `b`-unit shift, and
  in its own units the error is the factor of 15 to 17 between `6/g_record` and
  `3/abar`.
- [VERIFIED] The family is inside output custody for the first time, gating
  34/34 on its two scratchpad-grade predecessors.

## 1. Pre-registration, written before the producer's first run

*(Written and saved to disk before `research/measure-record-null2-0829.js`
existed and before any figure below `b_null = 0.167` was computed this session.
Timestamped by disk order only, not sealed by a commit: the custody is weaker
than a sealed prereg's and is not claimed as equivalent. Everything quoted as
prior in this section comes from `record-location-null.md`,
`lit-kourbatov-shortfall.md` and `zonegap-03-model.md`, all cited, none
recomputed here.)*

### 1a. The fixed quantities, cited

`b` is Kourbatov's shortfall coefficient in `E_1 = a log(p/a) - ba`, which is
`-mean(z)` or `-median(z)` for `z_k = (g_k - T(e_k))/abar(e_k)`
(`lit-kourbatov-shortfall.md` §4). The repo's second summary is the trend load
`A = mean_k g_k/T(e_k)`. The bridge is the identity `1 - A = -mean_k(z_k/L_k)`
with `L_k = ln(e_k/abar(e_k))`, so a constant-`b` model gives
`A(b) = 1 - b*mean_k(1/L_k)`.

Cited, not recomputed: `A_data = 0.9295`, `z mean = -1.298`, `z median = -1.3159`,
`n = 72`, `mean_k(1/L_k) = 0.06269`, `A_null = 0.9895 +- 0.0182`,
`null z mean = -0.212 +- 0.244`.

### 1b. Prediction P1, the estimator identity [ARITHMETIC, pre-declared as an identity check, not as a forecast]

`b_A = (1 - A)/mean_k(1/L_k)` is algebraically equal to
`sum_k(-z_k/L_k)/sum_k(1/L_k)`, a `1/L`-WEIGHTED mean of the same 72 numbers
`-z_k` of which `b_z = -mean(z)` is the UNWEIGHTED mean. If that is right, the
15% disagreement between 1.1251 and 1.2981 that `lit-kourbatov-shortfall.md` §5
records is not two estimates of one number differing by estimation error: it is
exactly `b_A - b_z = -cov(z, w)/mean(w)` with `w_k = 1/L_k`, a deterministic
functional of the ladder, and it is nonzero precisely because `b` varies with
height. **Predicted: the identity reproduces 1.1251 and 1.2981 to 1e-12, and
the covariance term reproduces their difference, -0.173, to the same
tolerance.** If it does not, one of the two published estimates is arithmetically
wrong and this note's first job changes.

### 1c. Prediction P2, the inhomogeneous null C1

C1 replaces the null's gap law (an exponential of mean `abar(x)` frozen at the
gap's LEFT endpoint) with the inhomogeneous Poisson process of intensity
`1/abar(t)` varying continuously across the gap's own span: draw `E ~ Exp(1)`
and solve `integral_x^{x+g} dt/abar(t) = E`.

The arithmetic estimate, written down before the run. To first order,
`g_C1 = g_N0 * (1 + g_N0/(x ln x))`, because `d ln abar/dx = 2/(x ln x)` and the
correction to the exponential's argument is half the drift over the span. At a
record `g ~ abar*L`, so the shift in `z` units is `Delta z = g^2/(abar * x ln x)`.
Evaluated: `+0.018` at `x = 1e4`, `+8e-4` at `1e6`, below `1e-5` from `1e8` up.
Below the window, where the running maximum that the window inherits is built,
it is larger: `+0.117` at `x = 100`, `+0.058` at `1e3`.

**Predicted: `|Delta b| <= 0.05` in both normalisations, point estimate 0.01,
sign NEGATIVE (C1 records sit slightly higher, so `b` falls), so
`b_null,C1 ~ 0.157` on the A route and `~ 0.202` on the z route; and the
ensemble mean record count moves by less than 1.** The stated band is wide
relative to the point estimate on purpose: the sub-window history's effect on
the inherited running maximum is not captured by the first-order estimate and
its sign through the record-sampling bias is not predicted here.

**Falsifier for P2: `|Delta b| > 0.20` in either normalisation.** That would
mean the first-order estimate above is wrong by an order and the note must find
out why before any decomposition is read.

### 1d. Prediction P3, the latticed null C2, and a pre-registered challenge to the cited 1.7e-4

C2 draws gaps on `6Z`: the mean-matched memoryless lattice law is the geometric
`P(G = 6j) = (1-q)q^(j-1)`, `q = 1 - 6/abar`, whose mean is exactly `abar`.

`record-location-null.md` §8 argues this effect is `1.7e-4` relative and "two
orders below the effect", NOT RUN. **That argument is predicted WRONG, and the
prediction is registered here with its reason before the measurement.** The
1.7e-4 is the lattice spacing over the largest RECORD gap, `6/35640`. The
quantity that governs the null is the lattice spacing over the MEAN gap,
`6/abar`, because the mean-matched geometric equals an exponential of scale
`abar - 3` rounded up to the lattice: `P(G > 6j) = q^j` is exponential in `6j`
with scale `-6/ln q = abar - 3 + O(1/abar)`. A record built from a scale
`abar - 3` instead of `abar` shrinks by `3L` in absolute size and gains back
about 3 from the rounding, so

  `Delta z = -3(L - 1)/abar`,

which evaluates to `-0.189` at `x = 1e4`, `-0.139` at `1e8`, `-0.079` at `1e16`.

**Predicted, in two units so the category slip in the cited argument is
visible.** (i) In relative gap size at the top of the ladder the lattice effect
is about `3/abar = 0.29%`, roughly 17 times the quoted 1.7e-4, because the right
denominator is the mean gap and not the record gap. (ii) In `b` units, which is
the unit the effect is measured in, `Delta b = +0.08 to +0.19`, point estimate
`+0.12` on the z route and `+0.10` on the A route: that is 6% to 15% of
`b_data`, and it is COMPARABLE TO OR LARGER THAN the entire fixed-`abar` null's
own `b` of 0.167 to 0.212. Not two orders below the effect; the same order as
the piece the corpus already counts.

Sign: POSITIVE, the lattice null carries MORE `b` than the continuous one, so it
moves the null toward the data and shrinks the residual.

**Falsifier for P3: `|Delta b| < 0.02` in both normalisations**, which would
vindicate the cited "two orders below" reading and refute this section.

### 1e. Prediction P4, the decomposition

Combining P2 and P3: `b_null(C1+C2) ~ 0.28` on the A route and `~ 0.32` on the
z route, so the two nulls together carry roughly 25% of `b_data` against the
15% that `object-models-read-0829.md` §4 D3 computes for the fixed-`abar` null
alone, and roughly three quarters of `b` stays residual:
`b_residual ~ 0.85` (A route), `~ 0.98` (z route).

### 1f. The consequence rule, fixed in advance

Stated before the numbers so the reading cannot be chosen after them.

- **If C1 alone reproduces most of `b`** (`b_null,C1 > 0.6 * b_data`): the line
  carried in `lit-kourbatov-shortfall.md` §1 and TODO Z5, that `b` is
  "unexplained as a mechanism in both corpora", is WEAKENED to "a finite-height
  property of the trend's own form", and the mechanism hunt is off.
- **If C1 adds little** (`|Delta b| < 0.2`): `b` stays a residual on the
  arithmetic, the mechanism question stands unchanged, and the only thing this
  note has moved is the size of the piece that is already accounted for.
- **Either way** the residual is a residual against a conjectural null and
  category (i): it says nothing about `T` and nothing about the Zone Postulate.

## 2. Custody: the reproduction gate

[VERIFIED, 34/34, from the same seeds and digit for digit] The producer runs no
new number until it has reproduced the family's existing ones. Section S1 of the
OUTPUT block reproduces, and prints so that nothing quoted here is absent from
the block:

- all 15 published record-block figures of `zonegap-03-model.js` §(b): data
  `n = 72`, `A = 0.9295`, `z mean = -1.298`, `z sd = 1.021`, `rate = 2.562`,
  `dCV = 0.908`; null `N = 68.4 +- 7.9`, `A = 0.9895 +- 0.0182`,
  `z mean = -0.212 +- 0.244`, `z sd = 1.264`, `rate = 2.356`, `dCV = 0.944`;
- all 13 corrected-null figures of `record-location-null.js`: `N0 z = -3.30`;
  the 5,000-replicate ensemble `A = 0.9891 +- 0.0178` at `z = -3.34`; N2's
  `corr(A, N) = -0.703`, slope `-0.00162`, `E[A | N = 72] = 0.9833`, residual
  sd `0.0127`, `z = -4.24`; N3's marginal-subtracted `0.9413` against
  `1.0014 +- 0.0180`, deficit `6.01%`, `z = -3.33`;
- all 6 `b` figures of `lit-kourbatov-shortfall.md` §5: `mean_k(1/L_k) = 0.06269`,
  `b_A = 1.1251`, `b_z = 1.2981`, `b_med = 1.3159`, and the median-unbiased
  `b_med = 1.2597` at Kourbatov's own cut `e < 1e15` on `n = 71`.

**What this buys, and what it does not.** The producer carries an OUTPUT banner
written by `node research/qc/embed.js` (code-sha256 `b77177d84d961e5a...`,
out-sha256 `b7dfb359c691fe71...`, 129 body lines, one hashed input
`research/a113274-gap-records.js@b64796044e4b`, elapsed 94.9 s), so this is the
FIRST member of the family inside output custody: its two predecessors,
`record-location-null.js` and `lit-kourbatov-shortfall.js`, both say in their
own headers that `embed.js --check` finds no banner and that every figure in
their notes is hand-pasted. The gate does not make those two notes custodial: it
means their numbers are now independently reproduced by a file that is. It also
does not make any of the numbers a proof; they are simulation output and cited
data.

**One correction to the corpus falls out of the gate.** [MEASURED] The cut at
which `lit-kourbatov-shortfall.md` §5 matches Kourbatov's `b = 1.2597` is
`e < 1e15` on the WHOLE ladder, with no lower cut, and ten of those 71 records
sit below this family's window floor `WLO = 1e4`. Taking the cut inside the
window instead gives `n = 61` and `b_med = 1.398`, printed in the producer's S1 so that no
figure here is absent from the block. The published match is
correct as Kourbatov states it; the note does not say which of the two cuts it
used, and a reader applying the family's standing window reproduces 1.398 and
concludes the match fails. The producer therefore states the convention in a
comment at the call site.

## 3. The two nulls and their b

### 3a. What was actually built

Five ensembles, 2,000 seeded replicates each, on the same window
`[1e4, 7.05e16]` with the same estimator, run on COMMON RANDOM NUMBERS: every
variant sees the same two uniform streams at the same indices, one for the
exact regime below `1e7` and one for the block regime above it, so the deltas of
section 4 are PAIRED differences rather than differences of independent means.
That matters: unpaired, the C1 delta of `-0.0012` sits inside the standard error
of the difference and is not resolved from zero; paired, its standard error is
`0.0001`.

| ensemble | gap law | block maximum | intensity |
|---|---|---|---|
| N0 | Exp of mean `abar(x)`, frozen at the gap's left endpoint | the published Gumbel form | fixed within a gap |
| N0e | same | exact inversion of the max of `N` iid Exp | fixed within a gap |
| C1 | inhomogeneous Poisson, `1/abar(t)` integrated across the gap's own span | exact inversion, `N` from the exact integral | varying |
| C2 | mean-matched memoryless law on `6Z` | exact inversion, then lattice | fixed within a gap |
| C12 | both | both | varying |

`b` is read per replicate in all three in-house normalisations: `b_A`, the
`1/L`-weighted mean of `-z` (the A route); `b_z = -mean(z)`, the unweighted mean,
which is Kourbatov's own definition; and `b_med = -median(z)`, which is the one
his `1.2597` is stated in.

### 3b. The C2 law is checked before it is used [VERIFIED analytically to 2e-15, empirically to 0.019%]

The lattice law is the mean-matched memoryless one: `P(G = 6j) = (1-q)q^(j-1)`
with `q = 1 - 6/abar`, mean exactly `abar`. It is realised as an exponential of
scale `s = -6/ln q` rounded UP to the next multiple of 6, which is the same law
exactly. The producer's S3 tabulates `abar`, `q`, `s` and the resulting mean at
five heights from `1e2` to `1e16`: worst relative error `2.0e-15`. Empirically,
`2e6` draws at `x = 1e4` give mean gap 64.2619 against `abar = 64.2497`, 0.019%
against a standard error of 0.071%. Every drawn gap is 0 mod 6 by construction.
So the C2 result below is not a mis-scaled null.

### 3c. The C1 inversion is checked before it is used [MEASURED, 2,000 paired replicates]

The expected pair count on `[100, 1e7]` under the inhomogeneous process is
exactly `2C2 * int dt/ln^2 t = 58,740.28` (Simpson, 200,000 panels). C1 reads
58,738.62, `-0.0028%` off, `-0.32` standard errors. The frozen-endpoint
construction on the SAME uniforms reads 58,741.11, `+0.0014%` off. The paired
difference is `2.489 +- 0.036` pairs on 58,740, `4.24e-5` relative.

That number is the whole answer to C1 in advance: there is almost nothing below
`1e7` for the inhomogeneous correction to correct.

### 3d. C1: the inhomogeneous null carries essentially none of b [MEASURED, 2,000 paired replicates]

`d b_A = -0.0029 +- 0.0003`, `d b_z = -0.0012 +- 0.0001`,
`d b_med = -0.0013 +- 0.0002`, all against the N0e baseline.

Sign negative, as pre-registered. Magnitude an order of magnitude below the
pre-registered band of 0.05 and two below its falsifier of 0.20. **C1 is a
negative result, and it is the decisive one for the item:** the trend's own
continuously varying intensity does not carry Kourbatov's `b`. Under the
consequence rule of §1f this is the second branch, and it is the branch that
leaves the mechanism question standing.

### 3e. C2: the lattice carries about a tenth of b, about one order above the argued bound as a share of the deficit [MEASURED, 2,000 paired replicates]

`d b_A = +0.1273 +- 0.0005`, `d b_z = +0.1113 +- 0.0003`,
`d b_med = +0.1095 +- 0.0007`.

Positive, as pre-registered, and inside the pre-registered `+0.08..+0.19` band
in every normalisation. Relative to `b_data(z) = 1.2981` that is 8.6% of the
effect, and it is 52% of the entire fixed-`abar` null's own `b_z` of 0.2147.

**`record-location-null.md` §8's argued bound on this is wrong by about 1.6
orders as a share of the deficit, and the reason is a category slip.** The ratio
`0.1113/1.7e-4 = 662` compares two different quantities and is not the measure of
the error: the cited figure is a relative gap perturbation, not a `b`-unit shift. [MEASURED against an
ARGUED bound] Its number is `6/35640 = 1.68e-4`, the lattice spacing over the
largest RECORD gap. The quantity that governs the null is the lattice spacing
over the MEAN gap, because the mean-matched lattice law is an exponential of
scale `abar - 3` rounded up: a record built from scale `abar - 3` instead of
`abar` loses `3L` and regains about 3, so `d z = -3(L - 1)/abar`. The producer's
S7 prints both units side by side:

| `x` | `abar` | `L` | `6/g_record` | `3/abar` | predicted `d z` |
|---|---|---|---|---|---|
| 1e4 | 64.2 | 5.05 | 1.85e-2 | 4.67e-2 | -0.1890 |
| 1e8 | 257.0 | 12.87 | 1.81e-3 | 1.17e-2 | -0.1386 |
| 1e12 | 578.2 | 21.27 | 4.88e-4 | 5.19e-3 | -0.1052 |
| 1e16 | 1028.0 | 29.91 | 1.95e-4 | 2.92e-3 | -0.0844 |

The cited `1.7e-4` is the fourth column at the top of the ladder. The measured
effect is the sixth, averaged over the 72 records: `+0.11` in `b` units, not
`1.7e-4`. "Two orders below the effect" becomes "about one order below the
effect and half the size of the piece the corpus already counts". The direction
is the one that helps the null: the lattice moves the null TOWARD the data.

### 3f. Two controls [MEASURED]

- **The block form is not a route to any part of `b`.** On common random
  numbers the published Gumbel block maximum and the exact block-maximum
  inversion select the same records at the same heights: `d b_z` is
  `-7.56e-7 +- 1.58e-8`. This agrees in sign and size with
  `record-location-null.md`'s R2, which found the block approximation carried
  no detectable location bias at `-0.33%` of `A` and 0.59 standard errors.
- **The two effects are exactly additive**, to four decimals:
  `(C1 - N0e) + (C2 - N0e) = 0.1245 = (C12 - N0e)` in the A route, and `0.1101`
  in the z route. There is no interaction term to attribute.

## 4. The decomposition

[MEASURED, 2,000 replicates per ensemble; the `+-` on the null rows is the
standard error of the ensemble mean, not the ensemble sd, which is in the
producer's S5 and is the band a single realisation carries]

| quantity | `b_A` (A route) | `b_z` (Kourbatov's mean) | `b_med` (his median) |
|---|---|---|---|
| **data, the adopted ladder, 72 records** | **1.1251** | **1.2981** | **1.3159** |
| carried by N0, the published null | 0.1639 +- 0.0057 | 0.2147 +- 0.0053 | 0.4255 +- 0.0056 |
| carried by C1 alone | 0.1610 +- 0.0057 | 0.2135 +- 0.0053 | 0.4242 +- 0.0056 |
| carried by C2 alone | 0.2912 +- 0.0056 | 0.3260 +- 0.0052 | 0.5350 +- 0.0055 |
| carried by C12, the fullest null | 0.2884 +- 0.0056 | 0.3249 +- 0.0052 | 0.5335 +- 0.0055 |
| **RESIDUAL, data minus C12** | **0.8367** | **0.9732** | **0.7824** |
| fraction of data `b` carried by C12 | 25.6% | 25.0% | 40.5% |
| fraction carried by N0 alone | 14.6% | 16.5% | 32.3% |
| residual, in ensemble sd of C12 | 3.35 | 4.19 | 3.16 |

Read in the order the calibration rules ask for, caveat first.

- **The residual is still there and is still not small.** After both nulls,
  0.78 to 0.97 of `b` is unaccounted, at 3.16 to 4.19 ensemble sd of the fullest
  null. That is the same 3.3-to-4.3 band `record-location-null.md` already
  carries; adding both nulls does not move the deficit out of significance and
  does not weaken any of that note's conclusions.
- **The whole of the increase is the lattice.** N0 to C12 moves the carried
  fraction from 14.6% to 25.6% in the A route, and every point of that comes
  from C2. C1 subtracts about 0.3 percentage points.
- **The "about 15%" has no single value: it is 14.6% to 40.5% depending on the
  normalisation, and the normalisation must be quoted with it.** The A route
  and the z route agree (14.6% / 16.5%, and 25.6% / 25.0% after the lattice),
  but the MEDIAN normalisation, which is the one Kourbatov's `1.2597` is stated
  in, gives 32.3% and 40.5%. The reason is that the null's `z` distribution is
  right-skewed, so its median sits well below its mean, and `b_med` of the null
  is nearly twice `b_z` of the null while the data's two agree to 1.4%. A
  headline of the form "the null carries X% of `b`" is not well posed without
  its estimator.
- **`object-models-read-0829.md` §4 D3's hand arithmetic is CONFIRMED, not
  corrected.** Its plug-in `b_null = 0.167`, computed from `A_null = 0.9895` and
  the data's `mean_k(1/L_k) = 0.06269`, sits 0.6 standard errors from the
  ensemble mean of the estimator itself, `0.1639 +- 0.0057`. What changes is not
  that number but the answer to the question it was computing: the null-side
  share is 25%, not 15%, once the lattice is in the null.
- **The 15% estimator disagreement survives the subtraction unchanged**, ratio
  `b_z/b_A` = 1.1537 raw and 1.1631 on the residual, which is what §1b predicted:
  it is a weighting choice, not an estimation error, so no null can absorb it.

## 5. Readings against the pre-registration

All four pre-registered predictions land, which is worth stating flatly rather
than as a success: three of them predicted small or arithmetic effects, and the
one that predicted a large one predicted it against a cited argument in the
corpus rather than against a measurement.

| prediction | predicted | measured | verdict |
|---|---|---|---|
| **P1** identity reproduces to 1e-12 | `b_A = 1.1251`, `b_z = 1.2981`, difference `-0.173` | reproduced to `3.8e-15` and `1.1e-15` | **HIT** [ARITHMETIC] |
| **P2** C1: `|d b| <= 0.05`, point 0.01, sign negative | `b_null,C1 ~ 0.157` (A), `~0.202` (z) | `d b_A = -0.0029`, `d b_z = -0.0012`; `b_null,C1 = 0.1610`, `0.2135` | **HIT**, and an order below the point estimate [MEASURED] |
| **P2** falsifier `|d b| > 0.20` | n/a | max `|d b|` is 0.0029 | **did not fire** |
| **P3** C2: `d b = +0.08..+0.19`, point `+0.12` (z), `+0.10` (A), sign positive | the cited `1.7e-4` is wrong by about one order as a share of the deficit, 13.3% against the argued two orders below | `d b_z = +0.1113`, `d b_A = +0.1273`, `d b_med = +0.1095` | **HIT** in all three normalisations [MEASURED] |
| **P3** falsifier `|d b| < 0.02` | n/a | 0.11 to 0.13 | **did not fire** |
| **P4** `b_null(C12) ~ 0.28` (A), `~0.32` (z); about 25% carried; residual `~0.85` (A), `~0.98` (z) | n/a | `0.2884`, `0.3249`; 25.6% and 25.0%; `0.8367` and `0.9732` | **HIT** [MEASURED] |

**The consequence rule of §1f, applied.** `b_null,C1 = 0.161` is 14% of
`b_data`, far below the 60% threshold, so the first branch does not fire: the
line in `lit-kourbatov-shortfall.md` §1 and TODO Z5 that `b` is unexplained as a
mechanism in both corpora is NOT weakened. The second branch fires: `|d b| <
0.2` for C1, so `b` stays a residual on the arithmetic, the mechanism question
stands unchanged, and what this note has moved is the size of the piece already
accounted for, from about 15% to about 25%, all of it lattice.

**One thing was learned that was not pre-registered**, and is flagged as such:
the null-side share depends strongly on which of the three estimators is used,
32.3% under N0 and 40.5% under C12 in the median normalisation against 14.6% and
25.6% in the A route. Post hoc, and reported as a caution about the headline
rather than as a finding.

**Category (i), restated once at the end.** Every line above is a statement
about a simulated record process and a fitted coefficient of a conjectural
heuristic. None of it is a statement about `T`, about the tile, or about the
Zone Postulate, and the quantifier gap of §0's preamble stands: an almost-all
over a log-sparse record sequence cannot deliver an every-zone statement.

## 6. Proposed wording change for TODO Z5 (HOLD for the orchestrator)

Nothing in `TODO.md` is edited by this pass. What follows is the exact text
proposed for the maintainer, and the reason for each change.

**Replace the "First move" paragraph of Z5, currently:**

> First move: pin b before hunting its mechanism. The two in-house
> estimators disagree by 15%, 1.125 from the A-normalisation against 1.298
> from mean z, so the number is not sharp enough yet to test a mechanism
> against; and whatever is posed after that is posed as a mechanism for
> Kourbatov's b, not for a record-location anomaly this corpus owns.

**with:**

> THE TWO UN-RUN NULLS RAN 2026-08-29 (`measure-record-null2-0829.md`,
> HELD, ANSWERED; producer `research/measure-record-null2-0829.js`, the
> first member of this family inside output custody, gating 34/34 on its two
> scratchpad-grade predecessors). b is now pinned on the null side.
> (a) The 15% estimator disagreement is not estimation error and no amount
> of data reduces it: b_A and b_z are the 1/L-WEIGHTED and the UNWEIGHTED
> mean of one vector of 72 numbers, their difference is exactly
> cov(-z, 1/L)/mean(1/L) = -0.1729476625 to 1e-15, and it is nonzero because
> b varies with height. Quote b_z = 1.2981 or b_med = 1.3159, which are
> Kourbatov's own definitions; b_A = 1.1251 is a trend-load summary and is a
> poor estimator of b.
> (b) The inhomogeneous-intensity null carries essentially none of b:
> d b_z = -0.0012 +- 0.0001 on 2,000 paired replicates, because the
> frozen-endpoint construction already reproduces the pair count below 1e7 to
> 4.24e-5. The trend's own varying intensity is NOT the mechanism.
> (c) The 6Z lattice carries d b_z = +0.1113 +- 0.0003, 8.6% of b and half
> the whole fixed-abar null's own b. `record-location-null.md` §8's argued
> 1.7e-4 is wrong because it divides the spacing by the RECORD gap where the
> governing ratio is the spacing over the MEAN gap, a factor of 15 to 17, and
> that ratio enters b multiplied by L; as a share of the deficit the lattice
> moves A by 0.0080 against 0.0600, 13.3%, about one order below the effect
> (clause corrected per redteam-0829-measure-b.md §3c).
> (d) Decomposition: of b_data, the fullest null carries 25.6% (A route),
> 25.0% (z route) and 40.5% (median route), against the 14.6-16.5% the
> published null alone carries; the "about 15%" has no single value and its
> normalisation must be quoted with it. The residual, 0.78 to 0.97 of b, sits
> at 3.2 to 4.2 ensemble sd and has no mechanism in either corpus.
> First move now: the mechanism question is unchanged and is the item. Two
> cheap things are owed first and are named in that note's §7: a second
> lattice law (round-to-nearest against the mean-matched geometric) to check
> that (c) is not a law-choice artefact, and a sigma for the mean-against-
> median contrast, since the data's z distribution is nearly symmetric
> (b_med - b_z = 0.018) where the null's is strongly skewed
> (b_med - b_z = 0.211) and the location comparison assumes shape agreement.

**Also proposed, one word in the item's title.** The title says "b has no
mechanism in either corpus", which stands. No change.

**Also proposed, the Ledger line.** Append `Q-record-null2`:

> Ledger: Q-record-deficit, Q-record-null2, Q-redteam-0828-litimports, Q-applied-0828-litimports, Q-applied-0828-registries

**And one correction owed to `record-location-null.md` §3 and §8**, which this
note does not apply (the fence forbids editing it): the gap-lattice bullet's
"1.7e-4 relative, two orders below the effect" is measured wrong at
`+0.11` in `b` units, about 8.6% of the effect, and its falsifier line "the
deficit is the gap lattice: NOT RUN" is now RUN and does not fire, since the
lattice moves the null toward the data by a tenth of `b` and leaves the deficit
at 3.2 to 4.2 sigma.

## 7. Defects, and what would falsify this

### 7a. Defects in this note and its producer

- **The pre-registration is timestamped by disk order, not sealed.** §1 was
  written and saved before the producer existed, but no commit binds it. That is
  weaker than `zonegap-03-prereg.md`'s custody and is not claimed as equivalent.
  A reader who does not trust the ordering should read §1 as a post-hoc
  rationalisation and the note as a measurement with no blind component.
- **C1 is inhomogeneous only below `1e7` in substance.** Above the exact regime
  the two constructions differ only in how the block's expected count is
  evaluated, a Simpson integral against a midpoint value, which is an
  `O(dLn^2) = O(2.5e-5)` difference at `dLn = 0.005`. So "an intensity varying
  continuously across the window" is realised literally below `1e7` and to that
  tolerance above it. Given that the measured C1 effect is `-0.0012`, tightening
  the block regime cannot change the verdict, but the claim is stated at its
  true scope.
- **The lattice law is one choice among several.** The mean-matched memoryless
  law on `6Z` was fixed because it preserves `abar` exactly and is the lattice
  analogue of the exponential. Round-to-nearest, or rounding up an
  `Exp(abar)` draw and accepting the resulting `abar + 3` mean, are defensible
  alternatives and were NOT run. They could move `d b` by an amount of the order
  of `d b` itself. This is the largest open exposure in the C2 result.
- **A shape difference is visible and carries no sigma.** The null's `z`
  distribution is strongly right-skewed, `b_med - b_z = 0.211` under N0, where
  the data's is nearly symmetric, `b_med - b_z = 0.018`. The location comparison
  this whole family runs assumes the shapes agree. No sigma for that contrast
  exists in this producer, so the disagreement is FLAGGED and NOT MEASURED.
- **2,000 replicates pin only the means.** The ensemble sd of `b_A` is about
  0.25, so a single realisation's `b` is nearly useless; every reading here is
  about ensemble means, whose standard error is 0.005 to 0.006.
- **The gate reproduces the predecessors, it does not validate them.** Any
  defect in `zonegap-03-model.js`'s estimator is inherited here by construction,
  including its `E = START + GAP + 2` endpoint convention and the two comment
  defects `record-location-null.md` §9 already lists.
- **`WLO = 1e4` and the start at `x = 100` are inherited choices**, not re-varied
  in this pass. `record-location-null.md` §3 varies the first at five cuts for
  the deficit; neither is varied here for `b`.

### 7b. What would falsify this, and whether the check has run

- **The C1 inversion is wrong and C1's null result is a bug.** Falsified by S4:
  RUN. The inhomogeneous process reproduces `2C2 * int dt/ln^2 t = 58,740.28` to
  `-0.0028%`, `0.32` standard errors, on 2,000 replicates.
- **The C2 null is mis-scaled and its `+0.11` is a mean shift.** Falsified by
  S3: RUN. The lattice law is mean-matched to `2.0e-15` analytically at five
  heights and to 0.019% on `2e6` draws against a 0.071% standard error.
- **The C2 result is an artefact of the lattice law chosen.** NOT RUN. §7a.
- **The deltas are an artefact of the common-random-numbers pairing.** NOT
  CHECKED INSIDE CUSTODY. The paired and unpaired estimators of the same delta
  should agree, and only the paired one is in the embedded block; an unpaired
  re-run would settle it in minutes and is not claimed here.
- **The block approximation carries part of `b`.** Falsified by the S6 control:
  RUN. `d b_z = -7.56e-7 +- 1.58e-8` between the published Gumbel block maximum
  and the exact inversion on common random numbers.
- **The estimator identity is wrong and one published `b` is arithmetically
  bad.** Falsified by S2: RUN, to `3.8e-15`.
- **The residual has a mechanism.** NOT SETTLED and unchanged by this note; it
  is the item.
- **The whole comparison is against a conjectural null.** Standing, and
  unfalsifiable in this corpus: Kourbatov-Wolf's trend, Gumbel shape and
  `O(log x)` record count are conjectures, and `zonegap-prior-art.md` §1 verified
  the string "Theorem" does not occur in the 2019 paper. A decomposition of `b`
  decomposes a fitted coefficient of a heuristic.
- **Someone has already run these two nulls in the owning convention.** NOT
  CHECKED this pass. `lit-kourbatov-shortfall.md` §9 already names
  arXiv:1401.6959's Cramer-model ensemble as skimmed and not read, and that
  remains the family's largest prior-art exposure. Nothing here is claimed as
  novel.

## 8. The two owed checks: a second lattice law, and a sigma for the shape contrast

*(Second pass, 2026-08-29, same day, same producer. §8a is the pre-registration
and was written and saved to disk BEFORE the two new sections S8 and S9 existed
in `research/measure-record-null2-0829.js` and before either was run. Same
custody caveat as §1: disk order, not a seal. The re-embed is expected to be a
`--force`, since the producer's tail is already bound; the disclosure and the
reproduction check are §8b.)*

### 8a. Pre-registration

**P5. The second lattice law.** C2n draws gaps on `6Z` by rounding to the
NEAREST multiple of 6 with a floor at 6, against C2's rounding UP, each
mean-matched to `abar` by solving for its own continuous scale.

The mechanism proposed for §3e's `+0.1113`, written down before C2n is run:
mean-matching a lattice law fixes the law's MEAN but not its SCALE, and a record
is governed by the scale, not the mean. Rounding up an `Exp(s)` draw adds a mean
of about 3, so mean-matching forces `s = abar - 3`; the record then loses `3L`
from the shrunken scale and regains only about 3 from the rounding, giving
`d z = -3(L - 1)/abar`. Rounding to nearest is approximately unbiased, so
mean-matching forces `s = abar - O(18/abar)` and the record loses almost nothing.

**Predicted: `|d b_z| <= 0.02` for C2n, point estimate 0.003, an order of
magnitude below C2's `+0.1113`.** [Derivation: the scale offset is about
`18/abar`, and `d b_z ~ offset * mean_k(L_k/abar_k)`, which at `abar = 257`,
`L = 12.9` is 0.0035.]

**Predicted, and this is the sharper one [ARITHMETIC]: C2's own measured
`+0.1113` equals `3 * mean_k((L_k - 1)/abar_k)` over the null's records, to
within 10%.** If that holds, §3e's lattice share stops being a measurement and
becomes a derived quantity with a stated mechanism.

**Consequence rule, fixed in advance.** If C2n lands where predicted, the
lattice share of `b` is NOT a property of "twin gaps live on `6Z`": it is a
property of the discretisation convention, the two defensible laws bracket it at
`[about 0, +0.11]`, and §3e, §4 and §6's proposed clause (c) must all be
re-qualified to report a bracket rather than a number. That is a WEAKENING of
this note's own headline and is registered as such before the run.

**Falsifier for P5: `|d b_z(round) - d b_z(ceil)| < 0.02`**, which would make the
lattice share law-robust and leave §3e and §4 standing as written.

**P6. A sigma for the shape contrast.** The statistic is
`D = b_med - b_z = mean(z) - median(z)`, the mean-against-median gap of the
standardized record gaps. The data reads `D = 0.0178`; N0's ensemble mean reads
`0.2108`. No sigma for that contrast exists anywhere in the family, so the
question the check answers is whether the shapes disagree at all once the
ensemble spread of `D` is priced.

**Predicted: `z` between `-1` and `-3`, most likely near `-2`.** Reason: `D` is a
difference of two order-statistic summaries on 72 correlated records and its
ensemble sd should be of the order of 0.1, so a gap of 0.19 is a couple of sigma
and not more. The skew of `z` is reported alongside, data against null with its
own ensemble sigma, as a second shape statistic.

**Falsifiers for P6, both directions.** If `|z| > 3` the shapes genuinely
disagree, the location comparison this whole family runs assumes something false,
and every `b` reading in this note and its two predecessors must be re-qualified
as a mixed location-and-shape statistic. If `|z| < 1` there is no shape problem
and §7a's flagged exposure is CLOSED rather than left open.

**Scope, unchanged.** Category (i). Both checks are null-side calibration and
neither produces a statement about `T` or the Zone Postulate.


### 8b. Custody for this pass

[disclosed] The producer's tail was already bound, so the re-embed is a
`--force` and the override is stamped into the fingerprint, with the date and
what the guard flagged. The guard fired for the right reason: `embed.js`
refused a silent overwrite because the output changed, and it changed because
S5 gained a sixth ensemble row and two sections were appended. The new
fingerprint: code-sha256 `bf88f2a13b464566...`, out-sha256 `67c6b5d30f826def...`,
169 body lines, elapsed 114.5 s, and the stamped override line reads
`forced 2026-08-29, 0 of 173 figures in the replaced block not reproduced`.

**Every previously embedded figure reproduces.** [VERIFIED twice: by `embed.js`'s
own guard, which reports 0 of 173 figures in the replaced block not reproduced,
and independently by diffing the old embedded block against the new run through
the end of S7] The two outputs are
line-for-line identical from the first line to the end of S7, with exactly one
insertion, the C2n row in S5's table. No figure in §2 through §7 of this note
moves: the custody gate is still 34/34, the identity still reads
`1.1251215136` and `-0.1729476625`, C1 still reads `-0.0012 +- 0.0001`, C2 still
reads `+0.1113 +- 0.0003`, and the decomposition table is unchanged.

### 8c. P5, the second lattice law: the lattice share is a law-choice artefact

[MEASURED, 2,000 paired replicates on the same common random numbers]

| law | `d b_A` | `d b_z` | `d b_med` |
|---|---|---|---|
| C2, rounding UP (the law of §3 to §4) | +0.1273 +- 0.0005 | +0.1113 +- 0.0003 | +0.1095 +- 0.0007 |
| C2n, rounding to NEAREST | -0.0077 +- 0.0005 | -0.0060 +- 0.0003 | -0.0065 +- 0.0006 |
| difference between the two laws | 0.1351 +- 0.0005 | 0.1173 +- 0.0003 | 0.1160 +- 0.0007 |

Both laws are mean-matched to `abar`, C2n to `7.7e-9` at worst across five
heights and to `-0.017%` on `2e6` empirical draws, so neither is mis-scaled.
P5 predicted `|d b_z| <= 0.02` for C2n with point estimate 0.003; measured
`-0.0060`, inside the band, with the sign the prediction did not fix. The
falsifier `|d b_z(round) - d b_z(ceil)| < 0.02` did not fire: the two laws
differ by 0.1173.

**The consequence rule of §8a fires, and it weakens this note's own headline.**
[MEASURED] The lattice share of `b` is not a property of "twin gaps live on
`6Z`". Two defensible mean-matched lattice laws bracket it at
`[-0.006, +0.111]`, and the null-side share of `b_data` in the z normalisation
becomes a bracket, **16.1% under C2n against 25.1% under C2**, against the
published null's own 16.5%. §3e's `+0.1113`, §4's 25.6/25.0/40.5% and §6's
proposed clause (c) must all be read as the upper end of a bracket, not as a
number. The proposed replacement text is §8e.

**The mechanism is derived rather than fitted, and it explains the bracket.**
[ARITHMETIC on the ensemble's own record heights; accurate at the large offset,
not at the small one] Mean-matching fixes a lattice law's MEAN but not its
SCALE, and a record is governed by the scale. With rounding gain `r` the
predicted shift is `d b = mean_k[(abar - s)L_k - r]/abar_k` over the null's
136,859 pooled record heights. Rounding up needs scale offset
`abar - s = 3.0105` and `r = 3`, predicting 0.1212 against the measured 0.1113,
ratio 1.089, so the pre-registered "within 10%" holds at the margin. Rounding to
nearest needs offset 0.0563 and `r = 0`, predicting 0.0031 against a measured
`-0.0060`: **the derivation gets the order right and the sign wrong at that
scale, and is not valid there.** Reported as a failure of the approximation, not
as agreement. What survives is the qualitative statement the bracket rests on:
the effect is the half-lattice scale offset the discretisation convention
imposes, 3.01 for rounding up against 0.06 for rounding to nearest, a factor of
53, which is the factor the two deltas differ by within a factor of two.

**Which law is right is not settled here, and the corpus cannot settle it
without saying what the null preserves.** Rounding up gives the memoryless law
on `6Z` (the geometric), which is the lattice analogue of the exponential and
preserves the null's defining property; rounding to nearest preserves the mean
only. If the null is required to be a memoryless process on the lattice, C2's
`+0.11` is the answer and §4 stands. If it is only required to put gaps on `6Z`
with the right mean, the answer is law-dependent and the bracket is the honest
report. This note takes the second position because it is the weaker one.

### 8d. P6, a sigma for the shape contrast: 1.6 sigma, and the exposure stays open

[MEASURED, 2,000 replicates]

| statistic | data | null, ensemble mean +- sd | `z` | MC tail |
|---|---|---|---|---|
| `D = b_med - b_z`, against N0 | 0.0179 | 0.2108 +- 0.1179 | -1.64 | 85/2000 |
| `D`, against C12 | 0.0179 | 0.2086 +- 0.1160 | -1.64 | 81/2000 |
| `D`, against C2n | 0.0179 | 0.2103 +- 0.1184 | -1.62 | 86/2000 |
| `sd(z)`, against N0 | 1.0213 | 1.2487 +- 0.1771 | -1.28 | 170/2000 |
| `skew(z)`, against N0 | 0.5446 | 1.0415 +- 0.5158 | -0.96 | 278/2000 |

P6 predicted `z` between `-1` and `-3`, most likely near `-2`; measured `-1.64`.
Neither falsifier fires. `|z| > 3` would have compromised every `b` reading in
this family and did not happen; `|z| < 1` would have closed §7a's exposure and
also did not happen.

Read caveat first. **The exposure stays OPEN, now with a size on it.** The data's
`z` distribution is less skewed, less dispersed and has a smaller mean-median gap
than the null's, all three in the same direction, but no single contrast reaches
two sigma and the three are not independent of each other (they are three
summaries of one 72-point sample against one ensemble). The honest reading is
that the shapes are consistent at this `n` and that a shape difference of the
size the point estimates suggest cannot be excluded either. What that means for
the rest of the note: the `b` readings are location readings taken under an
assumption that is neither confirmed nor refuted at 1.6 sigma, and they should
carry that caveat rather than be re-qualified as mixed statistics.

### 8e. Proposed replacement for TODO Z5's clause (c), HOLD for the orchestrator

*(TODO.md was rewritten today from §6 with red team B's corrected clause (c) and
is not edited here. What follows is the exact text proposed for whichever clause
now carries the lattice number.)*

> (c) The 6Z lattice's share of b is LAW-DEPENDENT and must be quoted as a
> bracket. Two mean-matched lattice laws on the same common random numbers
> give d b_z = +0.1113 +- 0.0003 (rounding UP, the memoryless geometric) and
> d b_z = -0.0060 +- 0.0003 (rounding to NEAREST), so the null-side share of
> b_data runs 16.1% to 25.1% in the z normalisation against the published
> null's own 16.5%. The mechanism is derived, not fitted: mean-matching fixes
> a lattice law's mean but not its scale, and a record is governed by the
> scale, so the effect is the scale offset the convention imposes, 3.01
> against 0.06. `record-location-null.md` §8's argued 1.7e-4 bound is still
> wrong, but the correct statement is that no single number bounds the
> lattice: it is 1.7e-4 for nothing, about 0.11 for the memoryless law and
> about zero for the nearest-rounding law.

> (e, new) The shape assumption behind every b reading in this family is
> measured at 1.6 sigma and stays open: mean(z) - median(z) reads 0.0179 in
> the data against 0.2108 +- 0.1179 in the null (MC tail 85/2000), with
> sd(z) at -1.28 and skew(z) at -0.96 sigma in the same direction. Not
> significant, not excluded, and it needs records past 1e17 or a different
> statistic rather than more replicates.


---

*History layer: process record, staging. See `research/history/CHANGELOG.md`
for the corpus rule.*
