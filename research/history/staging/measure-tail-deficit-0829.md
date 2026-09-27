# The tail-deficit factor from zero parameters: CRT-constrained thinning against independent thinning

<!-- ledger
id: Q-tail-deficit-model
status: ANSWERED
todo: 0
question: Does the exact compound-geometric thinning of the previous level's own gap histogram, with the qualifying-gap constraint g = 0, +/-2 (mod q) carried through the ladder, predict the tile's tail-deficit factor G2/(mbar ln D) at zero parameters, and does that make object-models-read-0829's D5 residue-level classification constructive rather than inferred?
verdict: NO. The zero-parameter CRT-constrained thinning predicts a tail HEAVIER than the tile's at every level, delta_M2 = 0.6461, 0.6746, 0.7021 against a measured 0.4577, 0.4463, 0.4791, so the pre-registered "classification was wrong" arm fires and D5 returns to OPEN with C3's constructive route REFUTED; the constraint is informative but small, carrying 4.0 to 10.0 percent of ln(null/truth) at the far tail, or 7.7 to 14.4 percent read against a rate-matched control, against the grain's ORDER at 39.4 to 54.6 percent at the deepest abscissa each level resolves; at shallow abscissae the ordering reverses (B 8.7 against C 4.8 at x = 23, u = 4), which the exact operator on a shuffled true grain confirms without any model (maximum 276, 354, 426 against the true 204, 258, 348), and the order effect is now localised (sections 7 and 9): a first-order Markov word from the true adjacent-pair statistics carries 32.3, 34.2 and 60.8 percent of ln(shuffled/truth) at the deepest abscissa of the three folds, and a SECOND-order word from the true adjacent-triple statistics carries 97.3, 97.9 and 102.6 percent there, r = 0.972, 1.061 and 1.000 on draw-mean maxima over 40, 20 and 10 draws, so the folded tile's tail is MEASURED to be a function of the previous grain's three-consecutive-gap statistics and of essentially nothing longer-range; that surrogate is seeded on the true previous grain at one fold, is not iterated, predicts no delta and does not revive C3, and the 348.0 sd 0.0 at 29->31 rests on ten draws.
-->

*2026-08-29. Producer: `research/measure-tail-deficit-0829.js`, formally embedded.
Internal, HELD, publication moratorium in force. Calibration is marked on every
claim: [PROVEN], [VERIFIED] by exact computation here, [MEASURED] empirical over
a finite range, [HEURISTIC] model output, [OPEN].*

*Label, carried throughout as `object-models-read-0829.md` requires: everything
below is a statement of type **(i)**, about the SIZE distribution of the tile's
gaps, and is silent about PLACEMENT. Nothing here bounds `G2` from above; the
extreme-value reading of a fitted tail as an upper bound is type (ii) and is not
used.*

---

## 0. What is open first

**Open, and this note does not close it.** The exponent gap is untouched:
`G2 <<_eps x^{4.26645+eps}` stands against a target of 2, and no object here is a
bound. The whole computation is a model comparison over `x <= 31`, nine levels,
in a regime where `max/mean` has reached 10.8 and nothing has converged
(`gap-spectrum-01.md` §6c). A model that reproduces a measured ratio at six
levels is [HEURISTIC] and stays [HEURISTIC].

**Open, and it is the structural weakness of the question as posed.** The
deficit factor `delta(x) = G2(x#)/(mbar ln D)` is already 0.4468 at `x = 13`,
the level any iterated model must be seeded from, and the measured factor is
flat at 0.446 to 0.479 from `x = 13` to `x = 31`. A model seeded on the exact
`T_13` histogram therefore starts at the answer. **Reproducing 0.446 and 0.479 is
consequently weak evidence on its own**, and §1 pre-registers the discriminating
comparison instead: whether the qualifying-gap constraint changes the answer at
all, measured as the separation between the constrained model and the
unconstrained one run from the same seed. If the two agree, the test is vacuous
whatever either of them hits.

**Open: custody.** Timestamped by disk order, not sealed. The pre-registration in
§1 was written into this file before the producer existed and before any number
below it was computed, and the file's own git history is the only evidence of
that ordering.

**What already existed, checked before writing anything.**

- `research/a3-09-histogram-operator.js` carries the exact histogram transfer
  operator (`U-FRAME.md` §11, `operator-and-pair-count.md`), [PROVEN] and
  [VERIFIED] at six folds, and iterates from the `T_7` grain to `T_31` with `D`
  and `G2` both correct. That instrument gives the TRUE next histogram from the
  true grain and is used here as a custody check, not as a prediction.
- `research/import-thinning-01-nullmodel.js` and `import-thinning.md` §2.2 carry
  the unconstrained reference law `f = q h + r (h * f)` on the measured old
  histogram. That is the independent-thinning model, reproduced here as the
  control.
- `research/gap-spectrum-01.js` carries the exact gap histogram of `T_x` at
  x = 5..31 and the renewal null `G2_null = mbar ln D`, with `null/true` read
  2.238, 2.124, 2.193, 2.185, 2.241, 2.087 at x = 13..31.

Nothing in the corpus joins them. `Q-gap-spectrum` is ANSWERED and derives
nothing (its verdict measures the deficit); `Q-import-thinning` is ANSWERED with
the CRT deviation given as the moment `Psi - Phi^2`, which is not a tail
prediction; `Q-a9-histogram-operator` is ANSWERED and is an exact simulator, not
a model. No question id joins the three, which is the gap
`object-models-read-0829.md` §7 C3 names.

---

## 1. PRE-REGISTRATION, written before the producer existed

*(Everything in this section was committed to disk before
`research/measure-tail-deficit-0829.js` was written. No number below §1 existed
when §1 was written.)*

### 1a. The two models, both at zero free parameters

Folding `T_x` by the next prime `q` copies the tile `q` times and strikes the
positions `v = 0, -2 (mod q)`; each old slot has exactly two of its `q` copies
struck, so the per-slot death rate is exactly `2/q` in both models below. The
models differ only in the CORRELATION between adjacent deaths.

**M1, independent thinning (the control, the reference law of
`import-thinning.md` §2.2).** Each slot copy dies independently with probability
`r = 2/q`. A new gap is the span of a maximal run of deaths, so the run length is
Geometric and the new histogram solves `f = (1-r) h + r (h * f)` exactly. This is
the law that, by `import-thinning.md` §2.2, "merges bulk gaps at random and
manufactures a tail out of nothing".

**M2, CRT-constrained thinning (the model under test).** The exact multiplicity
of `a3-09-histogram-operator.js` is used instead. Writing `G_j` for the partial
sum of the old gaps from the run's left survivor, the number of the `q` copies in
which a run of `L` deaths occurs is

`nu_q = #{ a' in Z/q : G_j = a' or a'-2 (mod q) for j = 1..L; a' not in {0,2}; a' not in {G_{L+1}, G_{L+1}+2} }`

which is [PROVEN] in `U-FRAME.md` §5a and §11. Since `G_j` is the accumulated new
gap so far, the run-continuation condition is a condition on the accumulated gap
modulo `q` alone, and the qualifying-gap constraint enters exactly here: a run of
length `L >= 2` forces every interior old gap to be `0, +/-2 (mod q)`, which is
the Merge Rate Identity's qualifying set, and the least qualifying gap is
`theta = 2q - 2 eta`. So M2 keeps the per-slot death rate at `2/q` and suppresses
long runs by the factor `f`, the qualifying-gap fraction (`U-FRAME.md` §12).

**The single approximation in M2, stated plainly.** The old grain is replaced by
an i.i.d. word drawn from the old histogram. Everything else is exact. M2 is
therefore not a bound and not a theorem; it is the exact CRT thinning of the
wrong word, and the residual against truth is the word's own correlation.

### 1b. The registered numbers

`delta(x) = G2(x#) / (mbar(x) ln D(x))`, measured 0.4577 (@23), 0.4463 (@29),
0.4791 (@31), computed exactly from `W`, `D` and the ladder and agreeing with the
reciprocals of `gap-spectrum-01.js`'s `null/true` column to that column's own
rounding (the reciprocals read 0.4577, 0.4462, 0.4792),
verified against that OUTPUT before this line was written. Both models are seeded
on the exact `T_13` histogram and iterated 13 -> 17 -> 19 -> 23 -> 29 -> 31 with
no parameter touched. `delta_model` is read at the same convention that returns
the true `G2` on the true histogram: the largest `d` at which the predicted count
of gaps at least `d` is at least 1.

**R1 [registered]. M1, the unconstrained control, predicts a deficit factor near
the geometric fixed point and well above the measurement.** The composed
independent thinning has the geometric law of `import-thinning.md` §1.2 as its
fixed point, whose count-1 threshold is `6(1 + ln D / ln(1/rho))` with
`rho = 1 - 6/mbar`; evaluated by hand that is 0.902 (@23), 0.907 (@29), 0.912
(@31) of the renewal maximum. Seeding on `h_13` rather than on the comb should
pull those down. **Registered point predictions 0.90, and a band [0.72, 0.95] at
each of @23, @29, @31.**

**R2 [registered]. M2, the constrained model, predicts a deficit factor flat near
the seed's 0.4468 and inside the measured band.** **Registered point predictions
0.45 (@23), 0.44 (@29), 0.44 (@31), band [0.38, 0.55] at each.** The direction
is registered more strongly than the size: M2 must sit BELOW M1 at every level
and the separation must widen with the level, because the suppression factor is
`f` and `f` falls with `x`.

**R3 [registered]. M2 cannot reproduce the level-to-level jitter.** The measured
`delta` moves 0.4577 -> 0.4463 -> 0.4791 over @23, @29, @31, a rise of 0.033 at
the last step driven by a single ladder value (`G2(31#) = 348` against 258).
M2 produces a smooth expected-count curve, so a hit on the mean level is the most
that can be claimed and the jitter is registered in advance as out of reach.

**R4 [registered]. The one-step residual has a sign.** M2 run one fold from the
TRUE previous histogram (23 -> 29, 29 -> 31) should OVERSHOOT the true far-tail
counts, because the i.i.d. word discards the grain's anti-correlation (the mode
at 12 rather than 6, and the word rule that the grain never contains "6,6",
`GLOSSARY.md`). **Registered overshoot factor in [1, 3] at the far tail, and the
sign is the part registered.**

**R5 [registered, a validation not a prediction].** The exact operator applied to
a SHUFFLED true grain is a Monte Carlo realisation of M2's i.i.d. assumption, so
the two must agree at every bin whose count exceeds 100, to within sampling
error. If they do not, M2 is implemented wrongly and nothing else in this note
may be read.

### 1c. The falsifier, as the brief fixes it, with one addition

- If M2 reproduces the measured 0.446 and 0.479 to within its own dispersion,
  D5's residue-level classification is **CONSTRUCTIVE**.
- If M2 reproduces the DIRECTION but not the SIZE, the classification is
  **PARTIAL** and the residual `delta_measured - delta_M2` is the number to
  carry forward.
- If M2 predicts a tail HEAVIER than measured (a deficit factor above the
  measurement, at either level), the residue-level classification was wrong and
  **D5 returns to open**.

**The addition, and it dominates the other three.** If M1 and M2 agree to within
0.05 in `delta` at @29 and @31, then the qualifying-gap constraint carries no
discriminating information at these levels, the test is **VACUOUS**, and D5's
classification stays INFERRED whatever M2 hits. This is registered because §0
names the reason: the seed already carries the answer.

### 1d. Price, written before the run

From `gap-spectrum-01.js`'s embedded runtimes: the direct segmented sieve costs
1.4 s at @23, 39.6 s at @29 and 1280.5 s at @31, 1322.0 s in total for the whole
ladder. The transfer operator costs 201 s to walk the ladder on words
(`a3-09-histogram-operator.js` header), with the `T_29` grain a 215 MB typed
array. Both models are `O(n^2)` convolutions on histograms of at most a few
hundred bins and cost seconds. **Priced at under 40 minutes total, against a
4-hour budget.** Anything over 20 minutes is detached.

---

## 2. Custody

**The caveat first.** Custody here is timestamped by disk order, not sealed. The
producer is formally embedded (`node research/qc/embed.js --timeout 7200
research/measure-tail-deficit-0829.js --force`; 268 lines of output, 141.0 s by
the header and 140.9 s by the script's own clock, assertion
failures 0) and no figure in this note was typed from a run that is not the
embedded one, but nothing prevents a reader from doubting that §1 preceded the
producer other than the file's own history.

### 2a. The tile, by a second engine

The producer carries its own segmented mod-6 wheel sieve, written from the
residue rule `n = 6j+5` and independent line by line of both
`gap-spectrum-01.js` and `a3-09-histogram-operator.js`. Four gates abort the
run at every level: the slot count against `prod(p-2)` (A059861), the gap count
against `D`, the sum of gaps against `W` exactly, and the maximum against the
exact ladder `G2(x#)` (`G2-STATE.md` §2). All four pass at all nine levels,
x = 5 to 31 [VERIFIED].

Runtime: **141.0 s for the whole run**, per the embed header, of which 113.4 s
is the sieve, against the
4-hour budget §1d priced and against the 1322.0 s `gap-spectrum-01.js` records
for the tile alone. The per-level seconds are printed in the block under a
`secs` column, which is printed in full and is a wall clock, so a re-embed on
different hardware needs `--force`; that is what the header's `forced` line
records, and the one figure it names, 112.6, is the previous run's sieve total.
The per-level seconds are not quoted here. The @31 sieve dominates. The difference from
`gap-spectrum-01.js` is that this engine keeps only the histogram and the grain
and carries no scan-statistic state; it is not a better instrument, it computes
less.

**The `--force`, disclosed.** The embed header carries `forced: 2026-08-29,
1 of 433 figures in the replaced block not reproduced (first: 112.6)`. One figure
in 433 changed between runs and it is the sieve's total wall clock.
`node research/qc/embed.js --check` on the file as it stands returns code-sha256,
body and out-sha256 all matching, so the block is bit-honest against the code on
disk [VERIFIED, red team C].

The deficit factor recomputed from `W`, `D` and the ladder rather than
transcribed:

| x | `mbar` | `ln D` | `mbar ln D` | `G2` | `delta = G2/(mbar ln D)` |
|---|---|---|---|---|---|
| 13 | 20.2222 | 7.303 | 147.686 | 66 | 0.4469 |
| 17 | 22.9185 | 10.011 | 229.442 | 108 | 0.4707 |
| 19 | 25.6148 | 12.844 | 329.008 | 150 | 0.4559 |
| 23 | 28.0543 | 15.889 | 445.754 | 204 | 0.4577 |
| 29 | 30.1324 | 19.185 | 578.084 | 258 | 0.4463 |
| 31 | 32.2105 | 22.552 | 726.414 | 348 | 0.4791 |

(§1 quotes the seed's factor as 0.4468, computed by hand from the record's
rounded `null/true` = 2.238 before this producer existed; the exact value is
0.4469 and the difference is the rounding of the column §1 was read from.)

These are the reciprocals of `gap-spectrum-01.js`'s `null/true` column (2.238,
2.124, 2.193, 2.185, 2.241, 2.087), checked against that OUTPUT before §1 was
written, and 0.4463 and 0.4791 are the 0.446 and 0.479 the models note quotes
[VERIFIED].

### 2b. The exact transfer operator against the disk

`U-FRAME.md` §11's operator is [PROVEN] there and is used here only as an exact
simulator and a custody check. Run on the sieve's own grain it must reproduce
the sieve's next histogram bin for bin:

| fold | bins compared | bins disagreeing | max abs diff | mass `= D(q-2)` | max gap | longest run `L` |
|---|---|---|---|---|---|---|
| 13 -> 17 | 4096 | 0 | 0 | exact | 108 | 2 |
| 17 -> 19 | 4096 | 0 | 0 | exact | 150 | 2 |
| 19 -> 23 | 4096 | 0 | 0 | exact | 204 | 3 |
| 23 -> 29 | 4096 | 0 | 0 | exact | 258 | 2 |
| 29 -> 31 | 4096 | 0 | 0 | exact | 348 | 4 |

Five folds, zero disagreeing bins, the mass identity exact at each, and the
operator's maximum equal to the ladder at each [VERIFIED]. The 29 -> 31 row is
the one that was not on disk before: it runs the operator over the 214,708,725
gaps of the `T_29` grain and lands on the same 6,226,553,025-gap histogram the
independent sieve produces.

**What this does not certify.** The operator is not independent of the sieve in
the sense that matters for `G2`: it is fed the sieve's grain. What it certifies
is that two different pieces of arithmetic agree on the whole multiset, which
is what §3 then compares the models against.

---

## 3. The models against the measurement, per level

**The caveat first, and it is the finding.** Neither model reaches the measured
deficit. M2, the CRT-constrained one, predicts a tail HEAVIER than the tile's at
every level, by 0.188 to 0.228 in `delta`, which is the arm §1c registered as
"the classification was wrong". Everything else in this section is subordinate
to that.

### 3a. R5 first: the model is implemented correctly

A shuffled true grain has the same histogram and no correlation, so the EXACT
operator applied to it is one Monte Carlo draw of exactly what M2 computes in
closed form. If they disagreed, nothing further could be read.

| fold | bins with count > 100 | max abs `M2/shuffle - 1` | max Poisson `z` | max gap shuffle | M2 count-1 | true `G2` |
|---|---|---|---|---|---|---|
| 19 -> 23 | 31 | 0.15309 | 2.713 | 276 | 264 | 204 |
| 23 -> 29 | 42 | 0.15735 | 2.670 | 354 | 318 | 258 |
| 29 -> 31 | 57 | 0.09408 | 2.107 | 426 | 432 | 348 |

The relative deviations look large and are not: at a bin carrying 100 counts the
Poisson width is 10 percent, and the worst `z` over 130 bins is 2.713 [VERIFIED].
The mass and first-moment gates on every model fold also pass, so each model
histogram carries mass 1 and mean `W/D` by computation, not by construction.

**The shuffle column is a measurement in its own right and carries no model.**
The exact operator on a shuffled true grain returns 276, 354 and 426 against the
true 204, 258 and 348. The shuffle preserves the histogram exactly and destroys
only the order [MEASURED].

### 3b. The deficit factor, both models iterated from the exact `T_13` histogram

`delta_model` is the count-1 threshold divided by `mbar ln D`, the same
convention that returns the true `G2` on the true histogram.

| x | true `G2` | `delta` truth | M1 count-1 | `delta` M1 | M2 count-1 | `delta` M2 | M1 - M2 | M2 - truth |
|---|---|---|---|---|---|---|---|---|
| 17 | 108 | 0.4707 | 144 | 0.6276 | 138 | 0.6015 | 0.0262 | 0.1308 |
| 19 | 150 | 0.4559 | 222 | 0.6748 | 204 | 0.6200 | 0.0547 | 0.1641 |
| 23 | 204 | 0.4577 | 318 | 0.7134 | 288 | 0.6461 | 0.0673 | 0.1884 |
| 29 | 258 | 0.4463 | 426 | 0.7369 | 390 | 0.6746 | 0.0623 | 0.2283 |
| 31 | 348 | 0.4791 | 552 | 0.7599 | 510 | 0.7021 | 0.0578 | 0.2230 |

**M2 misses the measured band at every level, in the heavy direction, and the
miss grows with the level.** M1 - M2, the separation the dominating falsifier is
read against, is 0.0673, 0.0623 and 0.0578 at @23, @29 and @31, above the 0.05
vacuity threshold at all three [MEASURED].

Seed sensitivity, which is the model's own dispersion in `delta`:

| x | `delta` truth | seed 13 | seed 17 | seed 19 | seed 23 | spread |
|---|---|---|---|---|---|---|
| 19 | 0.4559 | 0.6200 | 0.6018 | . | . | 0.0182 |
| 23 | 0.4577 | 0.6461 | 0.6461 | 0.6461 | . | 0.0000 |
| 29 | 0.4463 | 0.6746 | 0.6643 | 0.6643 | 0.5709 | 0.1038 |
| 31 | 0.4791 | 0.7021 | 0.6938 | 0.6938 | 0.6608 | 0.0413 |

The most favourable variant in the record, seed 23 read at @29, still returns
0.5709 against a measured 0.4463 [MEASURED]. The dispersion is smaller than the
miss at @29 and at @31.

### 3c. One fold at a time, so the residual is one fold's worth

Iterating from `T_13` accumulates five folds of model error. Started from the
TRUE previous histogram instead, each row is a single fold, and the count-1
threshold is read continuously so the split is not quantised to the 6-unit bin.

| fold | M1 | M2 | true `G2` | `delta` M1 | `delta` M2 | `delta` truth | constraint's share of M1 to truth |
|---|---|---|---|---|---|---|---|
| 13 -> 17 | 146.1 | 142.0 | 108 | 0.6367 | 0.6188 | 0.4707 | 10.8 % |
| 17 -> 19 | 215.8 | 198.8 | 150 | 0.6560 | 0.6042 | 0.4559 | 25.9 % |
| 19 -> 23 | 293.7 | 290.3 | 204 | 0.6589 | 0.6512 | 0.4577 | 3.8 % |
| 23 -> 29 | 377.2 | 335.8 | 258 | 0.6525 | 0.5809 | 0.4463 | 34.7 % |
| 29 -> 31 | 473.9 | 457.2 | 348 | 0.6524 | 0.6294 | 0.4791 | 13.3 % |

The share column has no trend and a spread of a factor 9 over five folds
[MEASURED]. Five points do not establish a level for it and none is claimed.

### 3d. Tail counts on `gap-spectrum-01`'s grid

`#{g > t}` on the abscissa `t/mbar`, one fold from the true previous histogram,
at the deepest level:

| `t/mbar` | truth | M1 | M2 | renewal null | M2/truth | M1/truth |
|---|---|---|---|---|---|---|
| 1 | 2,219,321,470 | 2.2185e+9 | 2.2283e+9 | 2.2906e+9 | 1.0040 | 0.9996 |
| 2 | 636,577,674 | 6.4239e+8 | 6.3273e+8 | 8.4267e+8 | 0.9940 | 1.0091 |
| 3 | 119,983,472 | 1.2420e+8 | 1.2161e+8 | 3.1000e+8 | 1.0135 | 1.0351 |
| 4 | 31,805,298 | 3.2703e+7 | 3.1600e+7 | 1.1404e+8 | 0.9936 | 1.0282 |
| 5 | 4,438,018 | 6.3548e+6 | 5.9108e+6 | 4.1954e+7 | 1.3318 | 1.4319 |
| 6 | 266,574 | 1.0005e+6 | 8.4108e+5 | 1.5434e+7 | 3.1552 | 3.7531 |
| 7 | 20,388 | 2.2652e+5 | 1.8083e+5 | 5.6779e+6 | 8.8695 | 11.1103 |
| 8 | 2,126 | 5.2132e+4 | 3.8705e+4 | 2.0888e+6 | 18.2057 | 24.5211 |
| 9 | 218 | 8.2830e+3 | 5.4522e+3 | 7.6842e+5 | 25.0102 | 37.9955 |
| 10 | 38 | 1.8324e+3 | 1.1242e+3 | 2.8269e+5 | 29.5839 | 48.2207 |

The same shape at @23 and @29 (the producer prints all three). **Both models
reproduce the body and fail the tail.** `M2/truth` stays within 0.9773 to 1.0375
out to `t = 3 mbar` at all three levels and then rises to 30.6441 (@23, u = 7),
308.7045 (@29, u = 8) and 29.5839 (@31, u = 10) [MEASURED].

### 3e. The log-tail deficit, split into three stages

At a fixed abscissa the whole distance from the renewal null down to the truth
is `ln(null/truth)`, and it splits into three consecutive stages: **A** null to
M1, the shape already carried by the previous level's histogram and therefore
inherited rather than explained by this fold; **B** M1 to M2, what the
qualifying-gap constraint buys at fixed histogram; **C** M2 to truth, what the
grain's own order buys and no histogram-only model can see.

| x | u | `ln(null/truth)` | A share | B share | C share |
|---|---|---|---|---|---|
| 23 | 4 | 1.836 | 86.5 % | 8.7 % | 4.8 % |
| 23 | 5 | 3.123 | 73.1 % | 10.0 % | 16.9 % |
| 23 | 6 | 4.865 | 61.4 % | 6.8 % | 31.7 % |
| 23 | 7 | 7.097 | 46.9 % | 4.8 % | 48.2 % |
| 29 | 5 | 2.789 | 81.4 % | 4.6 % | 14.0 % |
| 29 | 6 | 4.366 | 66.5 % | 6.3 % | 27.2 % |
| 29 | 7 | 7.073 | 49.2 % | 6.1 % | 44.7 % |
| 29 | 8 | 10.492 | 38.8 % | 6.6 % | 54.6 % |
| 31 | 6 | 4.059 | 67.4 % | 4.3 % | 28.3 % |
| 31 | 7 | 5.629 | 57.2 % | 4.0 % | 38.8 % |
| 31 | 8 | 6.890 | 53.6 % | 4.3 % | 42.1 % |
| 31 | 9 | 8.168 | 55.5 % | 5.1 % | 39.4 % |

**B never exceeds 10.0 percent anywhere in the table and sits at 4.0 to 6.6
percent everywhere past `u = 5`** [MEASURED]. C rises with the abscissa at
x = 23 and x = 29 and is non-monotone at x = 31 (28.3, 38.8, 42.1, 39.4 over
u = 6..9), so it rises at two of the three levels, reaching 39.4 to 54.6 percent
at the deepest resolvable point. Those two endpoints rest on truth tail counts of
218 (x = 31, u = 9) and **2** (x = 29, u = 8), and the second moves to 57.4 or
50.3 percent if that count is 1 or 5, so the top of the range is a two-gap row
[MEASURED, red team C]. The
qualifying-gap constraint is not where the deficit is.

**What B is and is not.** M1's run recursion uses the unconditional death rate
2/q; the exact CRT thinning's death rate conditional on a surviving predecessor
is 2/(q-2). So B is a NET of the qualifying-gap suppression and an elementary
rate difference of the opposite sign. Against a conditional-rate-matched
uncorrelated control (independent thinning at r = 2/(q-2), which fails the
mean-gap identity by 0.6 to 0.9 percent and is therefore a diagnostic and not a
model), the rate term is -1.5 to -4.4 percent of ln(null/truth) and the
correlation term is +7.7 to +14.4 percent, so the constraint's own suppression is
1.3 to 1.6 times the reported B [MEASURED, red team C]. C still dominates at the
far tail and the verdict is unchanged.

---

## 4. Readings against the pre-registration

| | registered | outcome |
|---|---|---|
| **R1** M1 in [0.72, 0.95], point 0.90 | the control sits near the geometric fixed point | **HELD at @29 and @31** (0.7369, 0.7599), **MISSED low at @23** (0.7134) |
| **R2** M2 in [0.38, 0.55], point 0.44 to 0.45 | the constrained model reproduces the measurement | **MISSED at all three**, in the HEAVY direction: 0.6461, 0.6746, 0.7021 |
| **R2b** M2 below M1 at every level, separation widening | | **HELD on the sign, REFUTED on the trend**: M1 - M2 = 0.0673, 0.0623, 0.0578, narrowing rather than widening over @23, @29, @31 |
| **R3** the jitter is out of reach | | **HELD as written**; M2 moves 0.6461, 0.6746, 0.7021 monotonically and the truth moves 0.4577, 0.4463, 0.4791 |
| **R4** one-step overshoot in [1, 3], sign registered | | **SIGN HELD, SIZE REFUTED**: 30.6441, 308.7045, 29.5839 at the deepest resolvable abscissa, an order of magnitude or two outside the band |
| **R5** shuffle agrees with M2 at counts > 100 | validation | **HELD**, max Poisson `z` 2.713, 2.670, 2.107 over 130 bins |
| **Dominating falsifier** M1 and M2 within 0.05 means VACUOUS | | **DOES NOT FIRE**: 0.0673, 0.0623, 0.0578, all above 0.05. The comparison carries information, and what it says is that M2 is wrong |

**The one place the pre-registration was too generous to the model.** R1's point
prediction of 0.90 came from the geometric fixed point and the band [0.72, 0.95]
was written expecting the seed to pull it down; the seed pulled it down further
than the band's floor at @23. That is a miss on the control, and it means the
band was not wide enough at the shallow end rather than that the control
misbehaved: M1's `delta` rises monotonically 0.6276, 0.6748, 0.7134, 0.7369,
0.7599 with the level, which is the fixed point being approached from below, as
R1's reasoning said.

**R2b's trend prediction failed and the direction matters.** The registered
reasoning was that the suppression factor is `f`, the qualifying-gap fraction,
and `f` falls with `x` (`U-FRAME.md` §12), so the separation should widen. It
narrows: 0.0673, 0.0623, 0.0578. At its rung this is [MEASURED] over three
levels and no mechanism is offered for it here; the natural reading, unchecked,
is that as `f` falls the constraint has less and less left to suppress, because
runs of length two or more are already almost absent (the operator's longest run
is `L = 2, 2, 3, 2, 4` across the five folds), so the constraint's marginal
effect shrinks with the same `f` that motivates it. **That reading is
[CONJECTURED] and no computation here tests it.**

---

## 5. D5's classification, restated at its rung

### 5a. The registered outcome, taken literally

§1c's third arm reads: *if M2 predicts a tail HEAVIER than measured (a deficit
factor above the measurement, at either level), the residue-level classification
was wrong and D5 returns to open.* M2 predicts 0.6461, 0.6746 and 0.7021 against
a measured 0.4577, 0.4463 and 0.4791. **The arm fires at every level.** Taken as
the pre-registration wrote it, **D5's classification returns to OPEN**, and the
constructive route `object-models-read-0829.md` §7 C3 proposed is **REFUTED**:
the exact compound-geometric thinning of the previous level's own histogram,
with the qualifying-gap constraint carried through the ladder, does not predict
the tail-deficit factor at zero parameters. It predicts a factor 0.19 to 0.23
too high in `delta`, and it misses the far-tail counts by one to two orders of
magnitude.

The residual to carry forward, which §1c names as the number a PARTIAL verdict
would leave: **`delta_measured - delta_M2` = -0.1884 (@23), -0.2283 (@29),
-0.2230 (@31)**, and in the tail-count basis the constraint's share of
`ln(null/truth)` is **4.0 to 10.0 percent** wherever the truth resolves.

### 5b. What the run measured about WHERE the deficit is, flagged as post hoc

Everything in this subsection is **post hoc**. None of it was registered, and it
does not restore the classification the arm just retired.

The producer measures the deficit's location without any model in the way.
Applying the exact transfer operator to a SHUFFLED true grain, which preserves
the histogram exactly and destroys only the order, returns a maximum of 276, 354
and 426 against the true 204, 258 and 348 at the folds 19 -> 23, 23 -> 29 and
29 -> 31 [MEASURED, exact arithmetic on an exactly specified word]. The log-tail
split says the same thing continuously: stage C, the grain's order, carries 39.4
to 54.6 percent of `ln(null/truth)` at the deepest abscissa each level resolves,
against stage B's 4.0 to 6.6 percent for the qualifying-gap constraint.

So the mechanism `object-models-read-0829.md` §5 names as the structural cause of
the steepness (CRT merging only at qualifying gaps, against independent thinning
"manufacturing a tail out of nothing") is **real, measured, and small**. It is
the smaller of the two effects that a histogram-only account can see, and the
larger one is not in the histogram at all.

**Why this does not restore the classification.** The grain is the ordered gap
sequence of the CRT product over one full period; it is a function of the residue
pattern mod `x#` and needs no interval input, so by `THE-LENS.md` §5's criterion
the object now carrying the deficit is residue-level too. That observation is an
INFERENCE of exactly the kind C3 was written to replace with a computation, and
this run supplies no computation for it. Reclassifying D5 on the strength of it
would repeat the move the item was raised to fix. **D5 stands as OPEN, with the
inferred residue-level reading unchanged in status and its named mechanism now
measured at 4 to 10 percent of the effect it was invoked to explain.**

### 5c. The label, carried

Every statement above is type **(i)**: the SIZE distribution of the tile's gaps,
and now also the ORDER of the grain, both silent about PLACEMENT. No object in
this note bounds `G2`, and the count-1 threshold used throughout is an
expected-count crossing, not an extreme-value upper bound; reading it as one
would be type (ii) and is not done here.

---

## 6. Defects, and what would falsify this

**D1. The model's single approximation is exactly the thing that carries the
effect.** M2 replaces the grain by an i.i.d. word from its own histogram, and
§5b measures the order as the larger contributor. So M2 was never in a position
to reproduce `delta`, and the run's informative content is the SIZE of that
mismatch rather than a surprise about its sign. This is a defect of the question
C3 posed, not of the producer, and it should be read that way.

**D2. Three levels for the headline, five folds for the split.** `delta_M2` is
compared at @23, @29 and @31 only, the constraint share at five folds, and the
share column has no trend and a spread of a factor 9 (3.8 to 34.7 percent).
Nothing has converged and no limit is claimed for any column here.

**D3. The count-1 threshold is an expectation and `G2` is one realisation.** For
the true histogram the convention returns `G2` exactly, so the comparison is
consistent, but the model side is a mean crossing. The shuffle experiment bounds
the realisation scatter: 276, 354 and 426 for the draw against 264, 318 and 432
for M2's expectation, so between one and two bins. That is small next to a miss
of 0.19 to 0.23 in `delta`, and the conclusion does not turn on it.

**D4. The truncation loss is gated but not printed.** The model support is
capped at gap 7200 and the mass gate passes at `1e-9`; at `D = 6.2e9` that
tolerance would admit a handful of lost counts in principle. The count-1
threshold sits at 510, more than an order of magnitude inside the cap, so the
actual loss is far below the tolerance, but the actual figure is not in the
OUTPUT block and should be if this file is ever extended past x = 31.

**D5. No prior-art search was run.** M2 is the corpus's own transfer operator
(`U-FRAME.md` §11, itself PRIOR ART, Holt and Rudd 2014 §5) evaluated against an
i.i.d. word, and M1 is the textbook compound-geometric thinning
(`import-thinning.md` §1.1). Nothing here is claimed novel and
`SEARCH-CONVENTIONS.md` was not exercised, because no claim needs it.

**D6. The custody is by disk order.** §1 was on disk before the producer
existed and nothing seals that ordering.

### What would falsify the reading of §5

- **The direct check that would revive a constructive route, NOT RUN.** Replace
  the i.i.d. word by a first-order Markov chain on consecutive gaps whose
  transition matrix is the true adjacent-pair histogram of the previous level,
  and push that through the same exact operator. The adjacent-pair histogram is
  already an object here (`import-thinning.md` §2.3's `Psi`,
  `research/a3-08-adjacent-pairs.js`). If that model reproduced `delta` at zero
  further parameters, the deficit would be constructively located in a
  residue-level object and C3's question would be answered in the affirmative by
  a different instrument. **Cost:** the pair histogram is free from the grains
  this producer already builds, and the operator run is the 133 s already
  measured, so under 10 minutes total. **This is the single check this note most
  wants and did not run.**
- If a Markov model on pairs also missed by 0.2, the order effect would be
  higher than second order and the next object would be `L`-gap windows, which
  the corpus already knows is where the Tail-Count Transport lives
  (`U-FRAME.md` §11).
- If the constraint's share B rose above 20 percent at fold 37, §5b's "small"
  would be wrong outside the measured range. Fold 37 is out of budget on this
  engine (the tile is 37 times @31) and was not attempted.
- If `delta_M2` at @37 fell toward 0.45 while the truth stayed flat, the
  narrowing of M1 - M2 in §4 would be reading a transient rather than a trend.

---

## 7. The first-order Markov word

*(§7a was written into this file, and `qc.js` run over it, BEFORE the producer's
section 8 existed and before any figure in §7b was computed. The custody is
still disk order, not a seal.)*

### 7a. PRE-REGISTRATION

**The question.** §5b measures the grain's ORDER as carrying 39.4 to 54.6
percent of `ln(null/truth)` at the deepest resolvable abscissa, and §6 names the
check that would say WHICH order: replace the i.i.d. word by a first-order
Markov chain on consecutive gaps whose transition matrix is the true
adjacent-pair histogram of the same level, and push that through the same exact
transfer operator. Does first-order adjacent-gap correlation carry most of that
order share, or is higher-order structure needed?

**The instrument.** For each fold `xo -> q` in {19 -> 23, 23 -> 29, 29 -> 31},
count the true grain's adjacent pairs `N[a][b]` cyclically, normalise to a
transition matrix, sample a word of the same length `D_xo` from it starting in
the true marginal, and run `foldHistExact` on the sampled word. The chain's
stationary distribution is the true marginal by construction, so the histogram
is preserved in expectation and the pair structure is preserved in expectation;
everything of order three and above is destroyed. Zero fitted parameters: the
matrix is a count, not a fit.

**The bracket already measured.** True `G2` = 204, 258, 348; the plain shuffled
word, which preserves the histogram and destroys all order, gives 276, 354, 426.
The Markov word must land between them if first-order correlation carries any of
the effect.

**M-P1 [registered].** The Markov maximum sits STRICTLY between the true `G2` and
the shuffled maximum at all three folds.

**M-P2 [registered], with numbers.** Writing the captured order share as
`c = (shuffled - markov)/(shuffled - true)`, **the registered point is
`c = 40 percent` and the band is `[10, 80] percent` at each fold**, which in
maxima is:

| fold | true `G2` | shuffled | registered point | registered band |
|---|---|---|---|---|
| 19 -> 23 | 204 | 276 | 247 | [218, 269] |
| 23 -> 29 | 258 | 354 | 316 | [277, 344] |
| 29 -> 31 | 348 | 426 | 395 | [364, 418] |

In `delta` at @31 that is a point of 0.5438 inside a band [0.5011, 0.5754],
against a measured 0.4791 and a shuffled 0.5864.

**M-P3 [registered], a gate not a prediction.** The sampled word's marginal must
reproduce the true histogram to within sampling error, and its gap sum must sit
within `1e-3` relative of `W`. Both are printed. If either fails the section is
not read.

**The falsifier, three arms.**

- If `c >= 90 percent` at all three folds, or the Markov maximum reaches the true
  `G2` to within one bin, **first-order adjacent-gap correlation carries
  essentially the whole order effect**, the deficit is constructively located in
  an object that is a direct count on the grain, and the residue-level reading of
  D5 becomes CONSTRUCTIVE by a route C3 did not name.
- If `10 <= c < 90 percent`, first-order correlation carries **part** of it and
  higher-order structure is needed for the rest; the residual `1 - c` is the
  number to carry, and the next object is the `L`-gap window of the Tail-Count
  Transport (`U-FRAME.md` §11).
- If `c < 10 percent`, or the Markov maximum is at or above the shuffled one,
  **adjacent-pair correlation carries none of the effect**, §5b's "order" is
  entirely of order three or higher, and this route is closed rather than
  narrowed.

**Price.** Three word generations (378,675 / 7,952,175 / 214,708,725 gaps) and
three operator runs, the deepest of which the producer already measures inside
its 133 s total. Priced at under 10 minutes, well inside budget, not detached.

### 7b. Result

**The caveat first.** The registered statistic, the single maximum, is dominated
by draw scatter: at 19 -> 23 the Markov word's maximum is 288 against a shuffled
276, which no positive share can produce, so **M-P1 fails on that single draw**
and its
share reads -16.7 percent. That fold's bracket is 72 units wide and two bins of
scatter swamp it. The reading below therefore rests on tail COUNTS, which
average over the far tail instead of resting on one gap, and the maximum column
is reported so that nobody reads it as a second measurement.

**M-P3, the gates, hold** [VERIFIED]. Sampled gap sum against `W`: 7.318e-4,
3.270e-4, -2.822e-5 relative. Sampled marginal against the true histogram, worst
ratio over bins above 1000 counts: 0.01626, 0.02290, 0.01801. Sampled
adjacent-pair counts against the true ones, same footing: 0.04241, 0.05745,
0.06777. Assertion failures 0 for the run as a whole.

**The maximum, with the bracket:**

| fold | true `G2` | Markov | shuffled | `delta` true | `delta` Markov | `delta` shuffled | share `c` | M-P2 band |
|---|---|---|---|---|---|---|---|---|
| 19 -> 23 | 204 | 288 | 276 | 0.4577 | 0.6461 | 0.6192 | -16.7 % | [218, 269] MISSED high |
| 23 -> 29 | 258 | 294 | 354 | 0.4463 | 0.5086 | 0.6124 | 62.5 % | [277, 344] HELD |
| 29 -> 31 | 348 | 390 | 426 | 0.4791 | 0.5369 | 0.5864 | 46.2 % | [364, 418] HELD |

**The 19 -> 23 failure is a draw artefact, measured in this note's own OUTPUT
block.** The producer's section 9 takes 40 draws of each word at that fold: the
shuffled maximum is **292.5 with sd 22.5 over [258, 354]** and the first-order
Markov maximum **263.1 with sd 17.4 over [228, 312]**, so this note's single 276
sits at the **30.0th percentile** of the shuffled law and its 288 at the
**87.5th** of the Markov law, and the share from the two draw means is
**33.2 percent**, inside the registered band [10, 80] and beside the registered
point 40. **M-P1 and M-P2 hold at all three folds once the statistic is averaged
over draws** [MEASURED, 40 draws, this note's OUTPUT block section 9].
Red team C's independently written sampler reported 296.1 sd 29.1, 264.0 sd 18.4,
32.5th and 90.0th percentiles and a 34.9 percent share; the two agree at
**0.12 and 0.05 sd** on the means, which is the test §9a registered. The
tail-count column, which is what this section reads, is unaffected: the
producer's 40-draw aggregates give **70.7, 44.0 and 32.3 percent** at u = 5, 6, 7
against this note's single-pair 69.9, 41.1 and 27.8.

**One correction the draws force on the table above.** The shuffled maxima in
that table are single draws and they are LOW: at 29 -> 31 the draw mean is 469.2
(sd 23.8) against the single 426, which is 1.8 sd below it. Recomputed on draw
means the maximum-based first-order share reads **33.2, 47.1 and 35.1 percent**
rather than -16.7, 62.5 and 46.2 [MEASURED, §9b]. The tail-count share is not
affected at that size, which is the reason §7b reads the tail column and not the
maximum.

**The tail-count share, which is the reading.** `c_tail = ln(shuffled/markov) /
ln(shuffled/truth)` at `t = u mbar`, on the folded histograms:

| fold | u = 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|
| 19 -> 23 | 59.9 % | 69.9 % | 41.1 % | 27.8 % | | |
| 23 -> 29 | 92.1 % | 91.0 % | 84.4 % | 56.2 % | 34.6 % | |
| 29 -> 31 | -30.8 % | 95.5 % | 84.9 % | 72.4 % | 62.2 % | 62.0 % |

The `u = 4` entry at 29 -> 31 is not a measurement: `ln(shuffled/truth)` there is
-0.0065, so the ratio divides by a number consistent with zero and the sign is
arbitrary. It is printed because the producer prints every row where the truth
resolves.

**The middle arm fires** [MEASURED]. `c_tail` declines with the abscissa from u = 5 inside
every fold, from 69.9 to 27.8 percent (19 -> 23), 92.1 to 34.6 percent
(23 -> 29) and 95.5 to 62.0 percent (29 -> 31). At the deepest abscissa each fold
resolves it reads **27.8, 34.6 and 62.0 percent**. Neither registered extreme is
reached: `c` is not at or above 90 percent in the far tail, so first-order
correlation does not carry the whole order effect and the route is not completed;
and it is not below 10 percent anywhere the truth resolves past `u = 4`, so the
route is not closed either.

**What that leaves.** At the deepest resolvable abscissa, 72.2, 65.4 and 38.0
percent of `ln(shuffled/truth)` is carried by structure of order three or higher
in the grain, which nothing here identifies [OPEN]. The share also rises across
the three folds at their deepest points, 27.8 to 34.6 to 62.0, which is three
points and establishes no trend [MEASURED].

**Not run, and it is the cheap one.** A second Markov draw at a different seed
would price the scatter that §7b blames for the 19 -> 23 failure, and was not
taken. Beyond that, the next object is the `L`-gap window of the Tail-Count
Transport (`U-FRAME.md` §11), which is where order three and above lives.

**D5's classification is unchanged by this section.** The middle arm neither
makes the residue-level reading constructive nor retires it. §5's verdict stands:
D5 is OPEN, C3's route is refuted, and the deficit is now located, at
[MEASURED], partly in first-order adjacent-gap correlation and mostly, at the
far tail, in something of higher order.

---

## 9. Second order, and the scratchpad figures brought inside output custody

*(§9a was written into this file, and `qc.js` run over it, BEFORE the producer's
sections 9 and 10 existed and before any figure in §9b or §9c was computed.
Custody is still disk order, not a seal.)*

### 9a. PRE-REGISTRATION

**Two questions, one producer.**

**Q-A, second order.** §7b leaves 72.2, 65.4 and 38.0 percent of
`ln(shuffled/truth)` to structure of order three or higher at the deepest
abscissa of the three folds. Build the word from the true adjacent-TRIPLE
statistics instead, `P(g_{i+2} | g_i, g_{i+1})` counted cyclically on the true
grain, sample from it, and push it through the same exact operator. Does second
order carry MOST of that remainder?

**Q-B, custody.** Red team C's 40-draw figures at 19 -> 23 (shuffled maximum
296.1 sd 29.1, Markov maximum 264.0 sd 18.4, share 34.9 percent) and the 0.5438
that `applied-0829-measure-c.md` wrote into §7a at E11 currently stand on
scratchpad authority: nothing in this note's own OUTPUT block computes them.
Recompute both inside the producer so the note cites itself.

**The instrument for Q-A.** State space is the ordered pair `(g_i, g_{i+1})`;
the chain starts from a true adjacent pair and steps by the observed conditional,
so it never leaves the set of observed pairs and needs no fallback. Zero fitted
parameters: the table is a count. Draws are taken in bulk rather than singly,
because red team C showed the single maximum is noise-dominated: **40 draws at
19 -> 23, 20 at 23 -> 29, 10 at 29 -> 31**, of each of the three word types
(shuffled, first-order, second-order), so every bracket is a draw mean with an
sd beside it.

**The registered prediction, stated as a fraction of what first order left.**
Write `r = (c2 - c1)/(1 - c1)`, the share of the FIRST-ORDER RESIDUAL that second
order closes.

> **A-P1 [registered]. `r` has point 0.30 and band [0.15, 0.55] at each of the
> three folds. Second order is predicted to carry a MINORITY of the remainder,
> not most of it.**

The reasoning, registered with it: the grain's known pair-local constraints (the
mode at 12 rather than 6, the word rule that the grain never contains "6,6", the
alternation constraint) were already available to a first-order chain, so what
first order missed is by construction the part that needs three or more gaps at
once. The operator's own longest-run column reads `L = 2, 2, 3, 2, 4` across the
five folds, and a run of `L = 4` spans five consecutive gaps while a second-order
chain controls only three. Partial capture follows; majority capture does not.

In absolute `c_tail` at the deepest abscissa each fold resolves, taking the
first-order 27.8, 34.6 and 62.0 percent as given, A-P1 is:

| fold | `c1` | registered `c2` point | registered `c2` band |
|---|---|---|---|
| 19 -> 23 | 27.8 % | 49.5 % | [38.6, 67.5] % |
| 23 -> 29 | 34.6 % | 54.2 % | [44.4, 70.6] % |
| 29 -> 31 | 62.0 % | 73.4 % | [67.7, 82.9] % |

> **A-P2 [registered].** `c2 > c1` at every fold on the draw-mean maximum and on
> `c_tail`. Second order cannot help in expectation and hurt at the same time;
> if it does, the sampler is wrong.
>
> **A-P3 [registered], a gate not a prediction.** The sampled word's marginal,
> adjacent-pair and adjacent-TRIPLE counts must each reproduce the true ones to
> sampling error, and the gap sum must sit within `1e-3` relative of `W`. Printed;
> if any fails the section is not read.

**The falsifier for Q-A, three arms.**

- If `r >= 0.5` at all three folds, **second order carries most of the
  remainder**, the deficit is a short-range object in the grain, and A-P1 is
  refuted in the direction that matters.
- If `0.05 <= r < 0.5`, second order carries **part**; the residual `1 - c2` is
  the number to carry and the object is longer-range than three gaps.
- If `r < 0.05`, or `c2 <= c1`, second order carries **none** and the effect is
  not a low-order Markov property of the grain at all.

**The falsifier for Q-B.** The producer's own 40-draw figures at 19 -> 23 must
agree with red team C's to within the sd's each reports; the two samplers are
independently written and differently seeded, so exact agreement is not expected
and is not the test. **If they disagree by more than one sd, the scratchpad
figures are not confirmed and §7's citation of them must say so rather than be
replaced.** The `0.5438` is arithmetic, not a draw: it either equals
`395/726.414` to four places or it does not.

**Price.** Sixty draws at 19 -> 23 in section 9 and 210 draws across the three
folds in section 10, the deepest of which folds a 214,708,725-gap word the
producer already folds in under ten seconds. Priced at under 15 minutes on top
of the existing run, inside the 3600 s timeout, not detached.

### 9b. Result: second order

**The caveat first, and it is the one to hold onto.** At 29 -> 31 the
second-order word's maximum is **348.0 with sd 0.0 over 10 draws**: every draw
returned exactly the true `G2`. A standard deviation of exactly zero is the kind
of number to distrust before believing, and 10 draws is 10. What argues against
its being a copy of the true grain is the gate: that word's marginal, pair and
triple counts differ from the true ones by up to 0.04661, 0.07143 and 0.07350,
which is multinomial sampling noise at counts near 1000 and not zero. It is a
genuinely random word. But the reading below rests on a statistic that pinned
itself at one fold, and **more draws at 29 -> 31 were NOT taken.**

**A-P3, the gates, hold, and they also show each surrogate destroying exactly
what it should** [VERIFIED]. Worst ratio against the true counts, on the first
draw of each kind:

| fold | word | sum/W - 1 | marginal | pair | triple |
|---|---|---|---|---|---|
| 19 -> 23 | shuffled | 0 | 0.00000 | 1.61370 | 0.97866 |
| 19 -> 23 | markov1 | 9.081e-4 | 0.04122 | 0.05314 | 0.95431 |
| 19 -> 23 | markov2 | 8.425e-4 | 0.04935 | 0.05611 | 0.06942 |
| 23 -> 29 | shuffled | 0 | 0.00000 | 2.93189 | 4.26068 |
| 23 -> 29 | markov1 | 2.381e-4 | 0.02429 | 0.06816 | 2.16383 |
| 23 -> 29 | markov2 | 2.215e-4 | 0.02372 | 0.05491 | 0.07043 |
| 29 -> 31 | shuffled | 0 | 0.00000 | 16.83270 | 11.76346 |
| 29 -> 31 | markov1 | -1.638e-5 | 0.03644 | 0.06801 | 16.22297 |
| 29 -> 31 | markov2 | -1.963e-5 | 0.04661 | 0.07143 | 0.07350 |

The shuffled word keeps the histogram exactly and destroys pairs and triples; the
first-order word keeps pairs and destroys triples; the second-order word keeps
all three. That is the ladder the section needs and it is visible in the table.

**The maximum, as a draw mean:**

| fold | draws | true `G2` | shuffled | markov1 | markov2 | `c1` | `c2` | `r` | A-P1 | A-P2 |
|---|---|---|---|---|---|---|---|---|---|---|
| 19 -> 23 | 40 | 204 | 292.5 (22.5) | 263.1 (17.4) | 205.7 (4.5) | 33.2 % | 98.1 % | 0.972 | MISSED | HELD |
| 23 -> 29 | 20 | 258 | 341.4 (18.1) | 302.1 (9.2) | 255.3 (6.6) | 47.1 % | 103.2 % | 1.061 | MISSED | HELD |
| 29 -> 31 | 10 | 348 | 469.2 (23.8) | 426.6 (20.7) | 348.0 (0.0) | 35.1 % | 100.0 % | 1.000 | MISSED | HELD |

**The tail-count share, on histograms aggregated over all draws:**

| fold | u | `c1_tail` | `c2_tail` | `r` |
|---|---|---|---|---|
| 19 -> 23 | 5 | 70.7 % | 100.8 % | 1.026 |
| 19 -> 23 | 6 | 44.0 % | 94.3 % | 0.897 |
| 19 -> 23 | 7 | 32.3 % | 97.3 % | 0.961 |
| 23 -> 29 | 5 | 92.3 % | 99.2 % | 0.896 |
| 23 -> 29 | 6 | 84.4 % | 100.6 % | 1.036 |
| 23 -> 29 | 7 | 55.7 % | 100.2 % | 1.005 |
| 23 -> 29 | 8 | 34.2 % | 97.9 % | 0.969 |
| 29 -> 31 | 5 | 94.8 % | 99.7 % | 0.946 |
| 29 -> 31 | 6 | 85.3 % | 99.9 % | 0.993 |
| 29 -> 31 | 7 | 72.6 % | 100.3 % | 1.010 |
| 29 -> 31 | 8 | 61.8 % | 100.1 % | 1.003 |
| 29 -> 31 | 9 | 60.8 % | 102.6 % | 1.067 |

**A-P1 is REFUTED, and in the direction that matters** [MEASURED]. The registered
point was `r = 0.30` in a band [0.15, 0.55], reasoning that a run of `L = 4` spans
five consecutive gaps while a second-order chain controls only three. Measured
`r` is **0.972, 1.061 and 1.000** on the maximum and **0.896 to 1.067** on every
one of the twelve tail rows. The first falsifier arm fires: **second order
carries essentially all of what first order left, at all three folds and at every
abscissa the truth resolves.** A-P2 held everywhere, which is the weaker claim.

Values of `c2` above 100 percent (103.2 on the maximum at 23 -> 29, and 100.1 to
102.6 on five tail rows) mean the second-order word undershoots the truth
slightly. That is a sign, not a size: it is within the sd of the maxima and
within the row-to-row scatter of the tail column, and nothing here separates it
from noise.

**What this does and does not say.** It says, at [MEASURED] over three folds:
**the tail of the folded tile is a function of the previous grain's
three-consecutive-gap statistics, and of essentially nothing longer-range.** The
order effect §5b measured is now localised to a specific, countable object.

It does **not** give a predictive model of the ladder. Every row above is a
surrogate for ONE fold seeded on the TRUE previous grain, so it consumes the
truth it is compared against; it is not iterated, it predicts no `delta` at zero
parameters, and it does **not** revive C3, whose failure was that a histogram-only
model iterated from `T_13` misses `delta` by 0.19 to 0.23. Whether a second-order
surrogate ITERATED up the ladder reproduces `delta` is **OPEN and NOT RUN**, and
it is the obvious next question: the triple table would have to be re-fitted at
each level from the previous surrogate rather than from the truth, and nothing
here says it would survive that.

**D5 is unchanged.** The grain's triple statistics are a count on the CRT product
over one period and need no interval input, so the object is residue-level by
`THE-LENS.md` §5's criterion, as §5b already said of the order effect in general.
The classification stays where §5 left it: OPEN, with C3 refuted.

### 9c. Result: the scratchpad figures, recomputed

**Q-B is confirmed** [VERIFIED, 40 draws in this note's own OUTPUT block]. Red
team C's figures were computed on a scratchpad with an independently written
sampler and were not in output custody. The producer now takes its own 40 draws
at 19 -> 23, differently seeded:

| word | draws | mean max | sd | range | red team C mean | red team C sd | abs diff in sd |
|---|---|---|---|---|---|---|---|
| shuffled | 40 | 292.5 | 22.5 | [258, 354] | 296.1 | 29.1 | 0.12 |
| markov1 | 40 | 263.1 | 17.4 | [228, 312] | 264.0 | 18.4 | 0.05 |

The percentile of this note's single 276 in the producer's shuffled law is
**30.0** against red team C's 32.5, and of its 288 in the Markov law **87.5**
against 90.0. The share from the two draw means is **33.2 percent** against 34.9,
inside the registered band [10, 80]. M-P1 on draw means HOLDS: the Markov mean
263.1 sits strictly between the true 204 and the shuffled 292.5.

§9a registered the test as agreement to within one sd of each figure. The
agreement is **0.12 and 0.05 sd**, so the scratchpad figures are confirmed and
§7's citation of them is replaced above by the producer's own, with red team C's
kept beside as the independent corroboration it is.

**E11 is confirmed** [VERIFIED]. `applied-0829-measure-c.md` wrote 0.5438 into
§7a for the registered M-P2 point maximum at 29 -> 31. The producer computes
`395 / 726.414 = 0.5438`.

**What is still on scratchpad authority after this section.** Red team C's own
40-draw run remains outside this file's custody; what §9c establishes is that an
independent implementation reproduces it, not that the original run is itself
bound. The two agree, and that is all a second implementation can ever say.

