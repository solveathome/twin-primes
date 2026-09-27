# Attack E: the growth law of G₂, measured

<!-- ledger
id: Q-growth-law
status: ANSWERED
todo: none
question: What does G2(x#) actually grow like?
verdict: MEASURED about 0.762 * x ln^2 x * lnln x over x = 11..79 (18 terms, ten log-linear families AICc-ranked), with the honest statement being the band and not the winner; the pure power law is excluded against a control that knows its own answer, and G2/h costs one further logarithm.
-->

*2026-08-18. Attack E of 10 on the 4.2665 exponent. Producer:
`research/attack-growth-law.js` (0.05 s, ten instruments, pasted output and
fourteen numbered readings in the script's own tail). Legend as in
`research/sift-limit-attack.md`: **[PROVEN]** published theorem with source;
**[VERIFIED]** checked computationally here; **[MEASURED]** empirical, finite
range; **[INFERRED]** deduction from sourced facts.*

**Assignment.** Nobody knows what G₂ actually grows like, and every claim about
how loose the proven 4.26645 is depends on it. `research/sift-limit-attack.md`
§7d prices the whole loss budget against a truth exponent of 1, and that 1 was
an assumption carried into a table rather than a measurement. This file measures
it, with model selection instead of eye-fitting, and reports what the data
cannot decide.

**Why now.** Until this morning the exact ladder stopped at x = 43, fourteen
terms. The object is OEIS **A144311** under the `a(n) = G₂ − 1` convention and
carries **22 terms to x = 79**, proven maximal rather than best-found, because
the branch-and-bound's pruning test is an admissible union bound on the residual
(`research/sift-limit-attack.md` §7,
`history/staging/attack-beta2-05-covering-pruning-bound.md`). The ladder grew by
eight terms and by a factor 1.84 in x in one day, which is exactly the size of
increment that kills a law fitted to the old range.

**Nothing here is a proof and nothing here moves 4.26645.** The deliverable is a
measurement with an honest band on it, plus the calibration that says how much
of the band to believe.

---

## 1. The answer

> **G₂(x#) ≈ 0.762 · x ln²x · lnln x** over x = 11..79 **[MEASURED]**, and the
> honest statement is the band around it, not the winner.

Ten families, log-space least squares on the primary window x = 11..79 (18
terms), AICc-ranked. Every family is log-linear in {1, ln x, lnln x, lnlnln x},
so each fit is one normal-equation solve with no optimiser to fail.

| model | form | k | RSS | ΔAICc | fitted | verdict |
|---|---|---|---|---|---|---|
| **MP2LL** | `c x ln²x lnln x` | 1 | 0.0671 | **0.0** | c = 0.762 | best |
| MP2LLb | `c x ln²x (lnln x)^b` | 2 | 0.0624 | 1.2 | b = 0.893 | indistinguishable |
| XLA | `c x ln^a x` | 2 | 0.0643 | 1.8 | a = 2.758 | indistinguishable |
| XLALLb | `c x ln^a x (lnln x)^b` | 3 | 0.0624 | 4.2 | a = 1.952, b = 0.950 | weaker |
| PWL | `c x^a (ln x)^b` | 3 | 0.0631 | 4.4 | a = 0.833, b = 3.316 | weaker |
| MP3 | `c x ln³x` | 1 | 0.0978 | 6.8 | c = 0.2691 | weaker |
| PW | `c x^a` | 2 | 0.1048 | **10.6** | a = 1.818 | **excluded** |
| SQ | `c x²` | 1 | 0.3175 | 28.0 | c = 0.3276 | excluded |
| MP2 | `c x ln²x` | 1 | 0.3926 | 31.8 | c = 0.956 | excluded |
| X | `c x` | 1 | 4.4105 | 75.3 | c = 12.05 | excluded |

Three families sit inside 2 AICc units and six inside 7. **Every one of the six
has x-exponent → 1.** All six sit between `x ln²x` and `x ln³x`, which is where
the two raw normalisations already pointed: `G₂/x²` falls 0.386 → 0.274 across
x = 37..79 while `G₂/ln³x` rises 11.2 → 20.5.

## 2. The pure power law is excluded, and the control is what makes that mean something

`c x^a` at a = 1.818 is **10.6 AICc units behind**. Taken alone that would be
worth little, because `research/exponent-control.md` §1 established this
estimator's affection for power laws: on 58 control terms it beats the family
containing the truth by 47 AIC units.

The calibration settles it. **At the identical window, on the one-class control,
the ranking inverts.**

| model | G₂ ΔAICc | h ΔAICc | reading |
|---|---|---|---|
| PW `c x^a` | 10.6 | **0.0** | wins on the control, excluded on G₂ |
| MP2LL `c x ln²x lnln x` | **0.0** | 51.9 | wins on G₂, excluded on the control |
| MP3 `c x ln³x` | 6.8 | 54.4 | |
| XLA `c x ln^a x` | 1.8 | 2.0 | |
| MP2 `c x ln²x` | 31.8 | 33.2 | excluded on both |
| SQ `c x²` | 28.0 | 59.5 | excluded on both |

Baselines over the candidate laws only in both columns, so the two are the same
question. The estimator takes a pure power **whenever the data will let it**, and
throws out every log family by 27 to 60 units when it does. G₂'s data will not
let it. So the log families winning on G₂ is a property of G₂ rather than of the
instrument, and that is the strongest single result here.

### 2b. And the converse, which is the harder half

**`x ln²x` is not refuted.** MP2 loses by 31.8 units on G₂. It loses by **33.2**
on the control, whose conjectured truth *is* `x ln²x`. A frozen one-parameter law
is beaten at this range whether or not it is true. So the eight new terms'
rejection of the morning's fitted `c x ln²x` law is a rejection of **that
constant at that range**, not of the shape, and it must be quoted that way.

## 3. The holdouts

Both are retrospective replays of a real state of knowledge. Out-of-sample rms
per cent error, and the sign pattern, which is the diagnosis.

| model | train ≤ 43 → 47..79 | train ≤ 61 → 67..79 | sign pattern at both |
|---|---|---|---|
| MP2LLb | **3.3%** | 3.4% | mixed / all under |
| XLALLb | 3.5% | 5.6% | mixed / all under |
| PWL | 3.6% | 6.2% | mixed / all under |
| XLA | 4.4% | **2.2%** | mixed |
| MP2LL | 4.4% | **1.7%** | mixed |
| MP3 | 9.0% | 5.2% | all over |
| PW | 16.0% | 6.5% | **all over** |
| MP2 | 18.1% | 17.6% | **all under** |
| SQ | 25.6% | 21.9% | **all over** |
| X `c x` | 52.5% | 49.0% | all under |

The out-of-sample order reproduces the in-sample AICc order, which is luck worth
recording. The signs are the real content: a law wrong in shape misses with one
sign, and only the live band misses mixed.

**The morning's law under-predicted; the pure power law over-predicted by more.**
That asymmetry is the whole reason the truth sits between the two shapes.

## 4. The control, in full

`h(x#)` is A048670. Iwaniec 1978 **[PROVEN]** gives exponent ≤ 2, Rankin and
Erdős give ≥ 1, and Maier and Pomerance conjecture `x(log x)^{2+o(1)}`, so the
x-exponent is 1 **[CONJ]**.

| window | n | PW reads | bias vs 1 | XLA reads | bias vs 2 |
|---|---|---|---|---|---|
| **x = 11..79 (matched)** | 18 | **1.272** | **+0.272** | 0.901 | −1.099 |
| x = 11..229 | 46 | 1.297 | +0.297 | 1.161 | −0.839 |
| x = 11..271 (all 58) | 54 | 1.296 | +0.296 | 1.188 | −0.812 |

**The matched bias is +0.272, not the house +0.282, and the window is why.**
Subtracting the matched bias from G₂'s 1.818 gives **1.546**; the long-ladder
correction would give 1.522. The two differ by 0.023 and the matched one is
correct, because the bias is a function of the window. 1.546 lands on top of
`research/G2-STATE.md` §6.1's **1.54** from ten exact terms, by a different route
on eight more terms.

> **Methodological finding: do not quote a log-frame exponent at this range.**
> The control's log-frame bias is **−1.099**, four times the x-frame's +0.272 and
> of the opposite sign, and it recovers only to −0.812 by x = 271. G₂'s fitted
> a = 2.758 corrected the same way would read 3.857, and that number should not
> be quoted: the correction exceeds the quantity's own plausible range. **The
> x-frame exponent is the one this data can carry.** This applies to every
> log-power reading in the repo, not only to this one.

**The same holdout on the control fails in the opposite direction**, which is the
sharpest single line in the run. `c x ln²x` fitted on x ≤ 43 and asked for
47..79 misses by **+20.2% to +43.4% on h** and by **−11.0% to −23.0% on G₂**.

## 5. The ratio G₂/h: the second class costs one logarithm

G₂ and h are the same construction at sieve dimension 2 and 1, measured on the
same primes, so their ratio cancels window, range, curvature and the estimator's
own upward pull. This is the only instrument here whose bias largely cancels.

The ratio fits `c (ln x)^a` far better than `c x^a`, by 7.8 AICc units. The
exponent:

| window | n | a |
|---|---|---|
| [11, 79] | 18 | 1.857 |
| [23, 79] | 14 | 1.478 |
| [31, 79] | 12 | **1.095** |
| [41, 79] | 10 | **1.104** |
| [53, 79] | 7 | 0.178 (noise) |

**The two instruments meet at their junction.** The certificate ladder measures
the same ratio on the greedy construction over x = 37..5003, a range 60 times
longer, and reads **1.08** on the whole ladder, 1.14 top twelve, 1.15 top eight,
1.21 top five (`research/two-class-lower-bounds.md` §5d reading 2, the ladder as
repaired on 2026-08-18). Their ladder starts at x = 37 and reads 1.08; ours ends
at x = 79 and reads 1.095 and 1.104 on its two comparable windows. Exact terms
and a certified greedy, no shared code, agreeing to a hundredth where their
ranges abut.

With `h = x ln^{2+o(1)} x`, one log gives **`G₂ = x ln^{3+o(1)} x`**, which is
the dimension-2 Maier-Pomerance accounting of
`research/two-class-lower-bounds.md` §4b **[INFERRED]** arrived at from data
rather than from the ledger.

> **⚠ A CORPUS DEFECT FOUND HERE AND NOT FIXED HERE.** `research/G2-STATE.md`
> §3d still reports this same quantity as "1.39 on the whole ladder, 1.17 from
> x = 229, 1.09 from x = 773, and 0.88 on the top five points". That is the
> **pre-repair** ladder: different values and the **opposite direction** of
> drift from the numbers now in the home document, which read 1.08 → 1.21
> **rising**. §3d's plateau figure 2.18 survives the repair (the home reads
> 2.1877 at x = 5003) and its exponent list does not. This is the summary layer
> asserting the old thing after the research layer moved, which is the exact
> defect class the QC framework exists to catch, and it is invisible to every
> gated check because both documents are internally consistent. **Recommended
> fix: replace §3d's exponent list with §5d reading 2's, and add this file's
> exact-ladder junction reading beside it.**

## 6. Two candidate families are not families

**Checked before fitting, not fitted and found flat.**

1. **`c x ln²x (ln x)^{b/lnln x}` is exactly `(c e^b) x ln²x`.** Because
   `(ln x)^{b/lnln x} = exp(b · lnln x / lnln x) = exp(b)` for every x. The
   second parameter is absorbed into the first at any sample size, exactly, not
   merely to within the noise. Verified numerically: the factor reads
   2.718281828 at x = 11, 29, 79 and 10⁶ alike. It was dropped rather than
   fitted.
2. **Any factor carrying `lnlnln x` linearly cannot be fitted on this range at
   all.** `lnlnln x` changes sign at `x = e^e = 15.15`, one third of the way
   through the window, running −0.134 at x = 11 to +0.388 at x = 79. That kills
   the Rankin / FGKMT shape `x ln²x · lnlnln x / lnln x` as a fittable family
   here. The `(lnln x)^b` form is the same correction rewritten so that it is
   estimable, and it returns **b = 0.893** with a leave-one-out band of
   [0.835, 0.932].

**And the collinearity that is the whole difficulty**, in one number:
`corr(ln x, lnln x) = 0.99668` over x = 11..79. Across two decades of x, "a
power of x" and "a power of ln x" are the same shape, and only the extrapolation
tells them apart.

## 7. What is distinguishable, and what is not

**Separable.** `c x^a` against the log families: 8.79 AICc units between PW and
XLA, and they differ by a factor 100 at x = 10⁶ and 2.9·10³⁵ at x = 10⁵⁰. In
`research/G2-STATE.md` §3b the same collision on h₂ read **0.1 AIC units**; here
it reads 8.79. The extra data did something.

**Not separable, and not separable in principle on this range.** `MP2LL` and
`MP3` differ by the factor `ln x / lnln x`, which moves from **2.74 to 2.96**
across the entire ladder: 9% of shape over 100% of the data. Their 6.8 AICc
units are measuring the constant, not the shape. In the limit the same factor
diverges. No computable extension separates them, because at x = 10⁶ the factor
is still only 5.7 and the ladder cannot be extended past about x = 100 by any
known method.

**The data is exhausted, and that is measurable.** A cubic in ln x, four free
parameters and free to bend any way it likes, reaches log-space rms 0.0576 on
the eighteen points. The best one-parameter law reaches 0.0611, within **6.1%**
of it; the best two-parameter law reaches 0.0589, within 2.3%. Essentially all
the residual is the ladder's own jitter: the seventeen two-point local exponents
have sd 1.040, min 0.33 (at 37 → 41, where G₂ rises only 528 → 546) and max 4.49
(at 29 → 31). So `sd/√17 = 0.252` is the standard error the ladder supports on a
single exponent **before** any model bias, and the entire spread between the live
families is smaller than it.

**Pre-registered: one more exact term buys nothing.** The families inside 7 AICc
units predict G₂(83#) between **1801 and 1927**, a spread of 7.0%. The observed
step from 73 to 79 was 11.8%. A single new term is inside the ladder's own
jitter. That is a reason not to spend compute on the twenty-third term for the
sake of the exponent, and it prices `research/G2-STATE.md` §9 item 6's logic one
level further out than that item does.

## 8. The consequence for the bound

> **`sift-limit-attack.md` §7d's truth = 1 basis line is SUPPORTED, and it is
> now measured rather than assumed.**

Every family inside 7 AICc units has x-exponent → 1. The only two that do not,
PW at 1.818 and SQ at 2, are the two the data excludes at 10.6 and 28.0 units.
Where the live families put `log_x G₂` as x grows:

| x | MP2 | MP2LL | XLA | MP3 | PW |
|---|---|---|---|---|---|
| 79 | 1.665 | 1.702 | 1.701 | 1.712 | 1.713 |
| 10⁶ | 1.377 | 1.430 | 1.451 | 1.475 | 1.785 |
| 10⁵⁰ | 1.082 | 1.094 | 1.105 | 1.112 | 1.814 |
| 10²⁰⁰ | 1.027 | 1.030 | 1.035 | 1.037 | 1.817 |

Two refinements §7d should carry.

**(a) The split is asymmetric in the truth, and DP1 absorbs all of it.** β₂ =
4.26645 and the LP floor 3.3152 are both measured without reference to the
truth, so `DP2+DP3 = β₂ − floor = 0.951` is **fixed whatever the truth is**, and
`DP1 = floor − truth` carries the entire uncertainty.

| truth exponent | total gap | DP1 = floor − truth | DP2+DP3 | DP1 share |
|---|---|---|---|---|
| 1 (asymptotic, the §7d basis) | 3.266 | 2.315 | 0.951 | **70.9%** |
| 1.70 (`log_x G₂` at x = 79) | 2.563 | 1.611 | 0.951 | **62.9%** |
| 1.818 (raw power fit) | 2.448 | 1.497 | 0.951 | 61.1% |
| 2 (the zone target) | 2.266 | 1.315 | 0.951 | 58.0% |

DP1 is the master cost on every reading, which is §7d's point and it survives.
Its **share** is not a constant of the problem, and quoting 71% without the
truth it was computed at is the same error class as quoting c without its
coordinates.

**(b) The floor and the truth are read at different scales.** The 3.3152 is
pooled from 33 readings at x ≤ 43, where `log_x G₂` reads 1.71 rather than 1.
Comparing it against a truth of 1 mixes an asymptotic with a finite-x
measurement. Both readings are correct and they are the same ledger at two
scales, which is exactly the confusion §7d's own resolved box settled between
§7c and §7d. It should be said once in §7d rather than rediscovered.

**An independent check improved without anyone aiming at it.** §7d records
`β_floor/θ_max = 3.195/2 = 1.597` against the measured `log_x G₂ = 1.70`, "6.2%
apart with no shared code". With the raised floor 3.3152 the same check reads
**1.6576 against 1.7037, 2.7% apart**. The agreement got better when the floor
moved for unrelated reasons. Worth recording, not worth resting on.

## 9. Custody

Every input reproduced against its home before anything was fitted, in
`attack-growth-law.js` §A:

- `G₂ = A144311(n) + 1` at all 22 terms **[VERIFIED]**.
- Provenance split held explicit: x ≤ 43 ours (14 terms,
  `research/exact-g2-ladder.js`), x = 47..79 A144311 only (8 terms), never
  silently mixed.
- `h ≤ G₂` at all 22 shared terms, the PROVEN `G₂ ≥ g` **[VERIFIED]**.
- The three exponents the brief carried in reproduce: 1.919 (x = 11..43), 1.818
  (x = 11..79), 1.725 (x = 47..79 alone). The first is the **x = 11..43** window,
  not x = 2..43, which reads 1.808.

**The −14.0% figure reconciled, and it is not the house estimator.** The worst
`c x ln²x` miss on 47..79 depends on which least-squares is meant:

| window | estimator | c | worst miss | monotone |
|---|---|---|---|---|
| 2..43 | log-space LS | 0.9976 | −12.4% | **NO** |
| 11..43 | log-space LS | 0.8764 | −23.0% | **NO** |
| 2..43 | **linear-space LS** | 0.9788 | **−14.0%** | **NO** |

The −14.0% is the **linear-space** fit, and it is nearly window-free: the same
c = 0.9788 comes out of x = 2..43, 5..43, 7..43 and 11..43 alike, because a
linear-space fit on a growing sequence is owned by its largest terms. The house
log-space estimator is window-sensitive and reads −12.4% to −23.0% over the same
windows. Both are defensible and they are not the same measurement. **And in no
version is the miss monotone**: x = 59 and x = 79 both step back.

## 10. What is not established

- **The control's truth = 1 is a conjecture.** What is PROVEN for h is exponent
  in [1, 2]: Rankin and Erdős below, Iwaniec 1978 above. The measured 1.272 sits
  inside that proven band, so the +0.272 is a bias only if Maier-Pomerance holds.
  Every bias-corrected number here inherits that, including the 1.546.
- **The ratio exponent's fall in §5 is on shrinking windows**, and the shortest
  ([53, 79], seven points) reads 0.178, which is noise rather than a trend
  continuing. What carries that reading is the junction agreement with the
  certificate ladder, not the fall on its own.
- **Log-space unweighted least squares is one estimator among several**, as §9
  shows. Nothing here tests weighted, robust or Bayesian alternatives.
- **A144311's term count and the control's exactness disagree inside the repo.**
  This file used the 58-term A048670 array that `research/exponent-control.js`
  and `research/maxgap-law.js` both carry as exact, while
  `research/G2-STATE.md` §5 says "all 50 exact terms of A048670 ... to 0.0145 at
  x = 229". The fits were run at x ≤ 79, x ≤ 229 and x ≤ 271 and the reading
  moves by 0.001 between the last two, so **nothing here turns on it**. It is
  recorded because it is a live disagreement about what is exact, and those are
  worth more than they cost.
- **No prior-art search was run in this attack**: the session's web budget was
  exhausted before the question was reached. The standing negative is
  `research/SEARCH-CONVENTIONS.md` §3, "Published asymptotic growth law for
  A144311? None", run in the convention that **owns** the object (A144311's own
  wording, "the longest sequence of consecutive integers, each equal to 1 or −1
  modulo at least one of the first n primes") rather than in ours, and marked
  settled there with an explicit instruction not to repeat it. Nothing in this
  file claims novelty beyond what that row already licenses, and the growth law
  measured here is a measurement of a published sequence, not a new object.

## 11. Recommendations

1. **Quote the band, not the winner.** `G₂(x#) = x ln^{2+o(1)}x` with the o(1)
   positive and measured at about `+lnln x` over x ≤ 79. The single best
   description is `0.762 x ln²x lnln x`; the honest statement is that six
   families fit and all six tend to exponent 1.
2. **Retire the log-frame exponent from quotable status** at this range, per §4.
   The x-frame reading with the matched control correction, **1.546**, is the
   number this repo can defend, and it agrees with §6.1's 1.54.
3. **Fix `G2-STATE.md` §3d's certificate-ladder exponent list** (§5 above). It
   carries the pre-repair values and the wrong direction of drift.
4. **Add the truth-dependence of the DP1 share to `sift-limit-attack.md` §7d**
   (§8a above). DP2+DP3 = 0.95 is truth-independent; the 71% is not.
5. **Do not compute G₂(83#) for the exponent's sake** (§7). It cannot separate
   the live band. Any other reason for it stands on its own.

---

*Producer for every number above: `research/attack-growth-law.js`, whose header
carries the question, whose tail carries the pasted output verbatim and fourteen
numbered readings. Third-party numbers (β₂, A048670, A144311, the DHR and
Iwaniec statements) are cited to their sources and are not this script's.*
