# Foreign import, IMPORT-MAP row 1: extreme value theory of scan statistics against the disputed √m

<!-- ledger
id: Q-import-scanstat
status: ANSWERED
todo: none
question: Does the extreme-value theory of scan statistics settle the disputed sqrt(m) claim of IMPORT-MAP row 1?
verdict: The identity offered for adjudication is true and its conclusion is false - Sum gamma(k) = 0 is trivial while the step to Var(S_m)/m tending to 0 is refuted by a free permutation counterexample - the Leadbetter half of the row is confirmed as written and the pre-registered kill criterion passes at both target levels, one of them blind; the adversary pass corrected the claim that T29 had never been computed here to a reproduction.
-->


**ADVERSARIAL OUTCOME, 2026-08-19 (`adversary-wave2.md`): SURVIVES WITH
CORRECTIONS.** The duality is a theorem exact at every m — integer deviation
zero at all 1484 values on T₁₃ (this record checked twelve) — and corpus
maxsum is cyclic in every producer, so the duality applies as stated. The
corrections: (1) **"T₂₉ had never been computed here for any moving-sum
statistic" is FALSE** — `a3-04-maxsum-recursion.js` (2026-08-16) publishes
maxsum_m(T₂₉) at m = 1..8 and `attack-foldL-02-bridge.js` re-verified m = 1..6
hours before this run; maxsum₁ = 258 is therefore a REPRODUCTION, not an
independent anchor. The blind claim survives on substance: H backed out of
that published row is 0.2100 ± 0.0274 against the measured 0.3367, so the
prior rows could not have leaked the answer. (2) Precision oversold: the
3-point fit has ONE residual df, its own 95% band at T₂₉ is [0.281, 0.396],
and dropping T₁₃ moves the prediction from 0.20 to 0.94 s.e. — the KILL of
√m is safe; "a fifth of a standard error" priced the measurement, not the
prediction. (3) The duality is the standard circular-max-subarray complement
identity and no prior-art search was run on it — the banked THEOREM line must
carry that flag. (4) The sealed kill criterion named T₂₃ only; citation
slips: "fifteen values of m" (twelve printed), G₂(23#) = 204 lives in
`05-twin-jacobsthal.js`. (5) Pre-registration custody DECLARED (machine-
written by an embedded producer, but same-commit with the record).

*Staging note, 2026-08-19. Proposal only; nothing here is integrated into a live
document, and neither [../../TODO.md](../../TODO.md) nor
[../../U-FRAME.md](../../U-FRAME.md) was touched, since TODO 0c and U-FRAME §5a
are a paired transfer under the fingerprint ledgers. Producers, all four formally
embedded: [`../../import-scanstat-01-identity.js`](../../import-scanstat-01-identity.js)
(0.9 s), [`../../import-scanstat-02-leadbetter.js`](../../import-scanstat-02-leadbetter.js)
(1.5 s), [`../../import-scanstat-03-prereg.js`](../../import-scanstat-03-prereg.js)
(0.5 s), [`../../import-scanstat-04-score.js`](../../import-scanstat-04-score.js)
(38.2 s). The frozen predictions are at
[import-scanstat-prereg.md](import-scanstat-prereg.md), written to disk by the
third script before the fourth was run. Calibration is marked on every claim:
PROVEN, VERIFIED by exact computation, MEASURED, INFERRED, REFUTED.*

## 0. The answer

**The identity offered for adjudication is true and its conclusion is false, the
Leadbetter half of the row is confirmed as written, and the pre-registered kill
criterion is passed at both target levels, one of them blind.**

The one-line argument in [import-map-construction.md](import-map-construction.md)
§4(a) has two halves. `Σ_{k=0}^{D−1} γ(k) = 0` is **PROVEN** and trivial: it is
`(1/D)(Σ_i c_i)²` with `Σ_i c_i = W − D·m̄ = 0`. The step from there to
`Var(S_m)/m → 0` is **REFUTED**, and the counterexample is free. The hypothesis
depends on the gap word only through `Σ_i c_i`, so it is invariant under every
permutation of the word, while `sd_m` is not. Reshuffling the same multiset of
real tile gaps therefore produces a word that satisfies the hypothesis exactly
and measures the exponent 0.4989, 0.4974, 0.5021 at T₁₉ against the real word's
0.3001 ± 0.0130. A hypothesis obeyed by every ordering cannot forbid a
conclusion that one ordering satisfies exactly.

What the identity does prove is a **complementary-window duality**, exact, and
not previously written in this corpus: on the cyclic word
`S_m(i) + S_{D−m}(i+m) = W`, hence

> **`maxsum_m + minsum_{D−m} = W`  and  `sd_m = sd_{D−m}`,**

so the variance curve is symmetric about `m = D/2` and vanishes at both ends,
and the γ-sum identity is its `m = D` endpoint. **PROVEN**, and **VERIFIED** at
fifteen values of `m` on T₁₃, where every `maxsum_m + minsum_{D−m}` reads
30030 = `W` exactly and each `sd` pair agrees to 3.23e-11 or better.

The Leadbetter machinery lands where the row said it would. `D′(u_n)` fails at
lags inside the window and nowhere else, the extremal index is below 1 and
tracks `1/m`, and its effect on the maxsum level is smaller than the exponent
dispute by a factor of about twenty. And the pre-registered test is decisive:
fitting `c·m^H` on T₁₃, T₁₇, T₁₉ alone predicts `H = 0.3383` at T₂₉, where the
measured value is **0.3367 ± 0.0080**, a miss of one fifth of a standard error,
while `σ√m` is out by a factor of two at the top of the grid.

**The route's payoff is a settled exponent, not a law.** The replacement still
carries a 30% worst-case error on `excess_m`, because the m-dependence has moved
out of the `sd` factor and into the tail factor, which is not `√(2 ln D)`.

---

## 1. The identity, adjudicated

Producer: [`../../import-scanstat-01-identity.js`](../../import-scanstat-01-identity.js).

**(a) The identity. PROVEN.** With `c_i = g_i − m̄`,

> `Σ_{k=0}^{D−1} γ(k) = (1/D) Σ_i c_i · Σ_k c_{i+k} = (1/D)(Σ_i c_i)² = 0`.

Measured residuals are 6.040e-14, 1.151e-12, 4.986e-11, -9.551e-10 at T₁₁ to
T₁₉ against `γ(0)` = 88.2765, 144.7829, 212.7601, 294.5268, and the `O(D²)`
confirmation over every lag reads 8.509e-13 at T₁₁ and 7.292e-12 at T₁₃. This is
the cyclic Parseval statement that the periodogram vanishes at frequency zero,
and it holds for every word of `D` gaps summing to `W`, in every order.

**(b) The implication. REFUTED, twice over.**

*By permutation invariance.* The hypothesis is a function of `Σ_i c_i` alone and
the conclusion is not a function of the multiset alone. For a uniformly random
permutation the exact finite-population variance is
`Var(S_m) = m σ² (D−m)/(D−1)`, so `Var(S_m)/m → σ²` whenever `m/D → 0`. That law
predicts the grid slope 0.5000 at T₁₉ and the three seeded shuffles of the real
gap word land on 0.4989, 0.4974, 0.5021.

*By size.* The identity's own content, spent uniformly, is the factor
`(D−m)/(D−1)`. At `m = 64` that forces a variance deficit of 4.25e+0%, 2.83e-1%,
1.66e-2% at T₁₃, T₁₇, T₁₉, against measured deficits of 82.93%, 82.39%, 78.78%.
The ratio is 20x, 291x, 4735x and **grows by an order of magnitude per level**.
An explanation whose share of the effect falls tenfold per level is not the
explanation.

**(c) What is actually anticorrelated. MEASURED.** `Λ(K) = 2 Σ_{k≤K} γ(k)/γ(0)`
reaches -0.4839, -0.9182, -0.9886 by `K = 64` at T₁₃, T₁₇, T₁₉, where the
uniform spend would be -8.63e-2, -5.75e-3, -3.38e-4. The tile word carries a
genuine short-range anticorrelation at lags of order ten. That is a fact about
this word, and the identity is not evidence for it.

**(d) The repair, and why it is not available. MEASURED.** The exact split is

> `Var(S_m) = m·P(m) − Q(m)`, `P(m) = γ(0) + 2Σ_{k<m} γ(k)`, `Q(m) = 2Σ_{k<m} k γ(k)`,

reproduced to `check = 1.0000` at all 30 rows tabulated. The identity says
`P(D) = 0`. **If** γ also decays on a lag scale `L`, then `P(m) ≈ 0` already for
`m ≫ L`, the linear term dies, and `Var(S_m)` plateaus, which is exponent 0 and
not 0.5. On T₁₉ that collapse is visible exactly where the corpus measures:
`P(m)/γ(0)` runs 0.9159, 0.4812, 0.2482, 0.1384, 0.0293, -0.0104 across
`m = 2..64`. But it does not stay collapsed, reaching -0.1522 at `m = 512`, and γ
has no decay scale on this word, so there is no single `L` and no plateau inside
`m ≤ 1024` at T₁₇ or T₁₉. Only T₁₃, whose grid reaches a fixed fraction of `D`,
shows one: `sd_m` sits between 29.867 and 40.771 across `m = 128..512` while
`√m` doubles. **The correct sufficient hypothesis is the identity plus a lag
scale, and supplying that scale is a separate unsolved problem.**

**(e) The duality. PROVEN, VERIFIED.** Section 0 states it. Its consequences
worth carrying: `sd_m` peaks at `m = 742` on T₁₃, one off `D/2`, at 3.554 times
`sd_1`; and `maxsum_m` is not monotone in the sense a growth law would want,
since `maxsum_{D−1} = 30024` is `W − 6`. Any candidate law for `maxsum_m` must
reduce to `W − minsum_{D−m}` under `m ↦ D − m`, which is a constraint no
`m·m̄ + c·m^H·√(2 ln D)` form satisfies. **INFERRED**: the growth law is a
small-`m` asymptotic and cannot be stated uniformly in `m`.

---

## 2. Leadbetter's conditions on the tile gap words

Producer: [`../../import-scanstat-02-leadbetter.js`](../../import-scanstat-02-leadbetter.js).
The object is `X_i = S_m(i)` on the cyclic word, `n = D`; the owning convention
is **scan statistic** in probability and **MOSUM** in change-point analysis
(Glaz, Naus and Wallenstein, *Scan Statistics*, Springer 2001), recorded at
[../../SEARCH-CONVENTIONS.md](../../SEARCH-CONVENTIONS.md) §1.

**`D′(u_n)` fails inside the window and nowhere else. MEASURED.** Writing
`R_in` for the D′ mass at lags `2..m` and `R_out` for the mass at lags
`m+1..D/10`, both normalised by their value for an independent word: at T₂₃,
`R_in` = 7.17 at `m = 8` and 10.89 at `m = 32` on a `p = 1e-2` threshold, and
36.81 and 66.22 at `p = 1e-3`, while `R_out` reads 1.000, 1.000, 0.999, 0.996.
At `m = 1` there is no failure at all, `R_in` = 0.06 and 0.00. T₁₇ and T₁₉ give
the same shape. So the shared `m−1` summands are the whole of the failure, and
there is no second, longer range of dependence behind it.

**The failure belongs to the moving sum, not to the primes. MEASURED.** The
reshuffled control fails harder: `R_in` = 14.75 and 20.82 at T₂₃ against the real
word's 7.17 and 10.89, and 92.77 and 142.22 against 36.81 and 66.22 at the deeper
level. The tile's own anticorrelation *reduces* the clustering.

**The extremal index. MEASURED.** The runs estimator at `r = m` gives 0.9998,
0.5188, 0.2350 at `m = 1, 8, 32` on T₂₃, with `runs(2m)` at 0.9994, 0.5098,
0.2257 and `blocks(4m)` at 0.9988, 0.5292, 0.2334; T₁₉ gives 1.0000, 0.5598,
0.2471 and T₁₇ gives 1.0000, 0.6075, 0.2169. Three estimators agree to within
3%, and `θ = 1` at `m = 1` to four figures is the consistency check.

**And θ is lower order, by a factor of about twenty. MEASURED.** In units of
`sd_m` the θ correction `|ln θ|/√(2 ln D)` is 0.1164 and 0.2569 at `m = 8, 32`
on T₂₃, while the gap between the two candidate laws,
`√(2 ln D)·(m^{0.5−H} − 1)`, is 2.5921 and 4.9528. The ratios are 22.3x and
19.3x at T₂₃, 22.9x and 18.5x at T₁₉, 23.0x and 14.8x at T₁₇. **The row's claim
that the extremal index enters only at lower order is CONFIRMED and quantified:
θ moves the maxsum by a quarter of one `sd_m`, the exponent moves it by five.**

**Berman's condition, as far as finite data can speak. MEASURED.** On the
`m = 32` process `r_h` falls from 0.9114 at `h = 1` through 0.2804 at `h = 16`
to -0.2999 at `h = 32`, the window's own edge, then stays inside `|r_h| ≤ 0.15`
at T₂₃ out to `h = 4096`, so `r_h ln h` reads -0.3392, -0.6972, 0.2649, -0.6340,
-0.5996 at `h = 64..4096`: bounded and drifting toward zero. `r_h = o(1/log h)`
is asymptotic and no finite tile settles it; this is the honest finite evidence,
not a verification.

**T₁₃ cannot carry this test.** `D = 1485` yields 12, 2, 2 exceedances at
`p = 1e-2` and θ measures exactly 1.0000 because no two exceedances are ever
adjacent. Every T₁₃ row is flagged UNDERPOWERED in the producer and none is used.

---

## 3. The pre-registration, and the out-of-sample score

Producers: [`../../import-scanstat-03-prereg.js`](../../import-scanstat-03-prereg.js)
(the freeze) and [`../../import-scanstat-04-score.js`](../../import-scanstat-04-score.js)
(the test). The frozen file is [import-scanstat-prereg.md](import-scanstat-prereg.md).

**The rule, fixed before any target level was computed.** Grid
`M = [1,2,3,4,6,8,12,16,24,32,48,64]`. Per level, OLS of `ln sd_m` on `ln m`
gives `(ln c_l, H_l)`. Both are extrapolated by OLS in `ln D` over
`l = 13, 17, 19`. Model A is `sd_m = c* m^{H*}`, Model B is
`sd_m = sd_1* √m`, and both give `maxsum_m = m·m̄ + sd_m·√(2 ln D)` with `D` and
`W` in closed form. Neither model reads anything from the target tile. The frozen
laws are

> `H(lnD) = 0.220511 + 0.006140·lnD`, `ln c(lnD) = 2.266792 + 0.052776·lnD`,
> `ln sd_1(lnD) = 2.026484 + 0.064025·lnD`.

**Disclosed leak.** The T₂₃ exponent and its `sd_m/(sd_1 √m)` column are already
published in this corpus, in the embedded output of
[`../../import-chaining-03.js`](../../import-chaining-03.js) (d). T₂₃ is out of
sample for the fit and not blind to the author. **T₂₉ had never been computed
here for any moving-sum statistic, so T₂₉ is the blind level**, and it carries
the same pre-registration.

**The compute lever.** T₂₉ was taken by a segmented streaming sieve over
`W = 6469693230` positions with a ring buffer of depth 64: no gap word is ever
materialised, memory is constant, and the run is 38.9 s. **VERIFIED** on two
independent anchors: `maxsum_1` returns 204 at T₂₃ and 258 at T₂₉, which are
`G₂(23#)` and `G₂(29#)` as carried by
[`../../exact-g2-ladder.js`](../../exact-g2-ladder.js) and
[`../../05b-twin-jacobsthal-segmented.js`](../../05b-twin-jacobsthal-segmented.js),
and the slot counts return `∏(p−2)` = 7952175 and 214708725 exactly. The T₂₃
exponent reproduces `import-chaining-03.js`'s 0.3216 ± 0.0096 from a different
code path.

**The result. MEASURED.**

| level | measured `H` | pre-registered `H*` | miss |
|---|---|---|---|
| T₂₃ | 0.3216 ± 0.0096 | 0.3181 | 0.0036 = 0.37 s.e. |
| T₂₉ (blind) | 0.3367 ± 0.0080 | 0.3383 | 0.0016 = 0.21 s.e. |

| level | quantity | Model A `c* m^{H*}` | Model B `sd_1* √m` |
|---|---|---|---|
| T₂₃ | `sd_m`, ln-RMS | **0.0592** | 0.4532 |
| T₂₃ | `excess_m`, ln-RMS | **0.1952** | 0.5013 |
| T₂₃ | `excess_m`, worst rel. err. | **29.6%** | 159.6% |
| T₂₉ | `sd_m`, ln-RMS | **0.1496** | 0.5275 |
| T₂₉ | `excess_m`, ln-RMS | **0.1998** | 0.5136 |
| T₂₉ | `excess_m`, worst rel. err. | **33.8%** | 150.1% |

The anchored riders, which differ from each other in exactly one number, give
A′ 0.2669 against B′ 0.4612 at T₂₃ and A′ 0.3044 against B′ 0.4211 at T₂₉.
**Every comparison goes the same way. The pre-registered kill criterion is
passed at both levels.**

**But the replacement is not a law. MEASURED.** Model A still misses by 29.6%
and 33.8% in the worst case, because `excess/sd_m` runs 9.039 down to 4.707 at
T₂₃ and 10.628 down to 5.747 at T₂₉ against `√(2 ln D)` = 5.6372 and 6.1943. The
m-dependence has moved out of the `sd` factor and into the tail factor. What is
established is the exponent, not the law.

**The exponent series, five exact levels.** 0.2661, 0.2804, 0.3001, 0.3216,
0.3367 at T₁₃, T₁₇, T₁₉, T₂₃, T₂₉. Still rising, still below 0.5, and the
linear-in-`ln D` rule predicts one level ahead to within a fifth of a standard
error. Extrapolating that rule to `H = 0.5` is **not** licensed: §1(d) shows the
true `m`-dependence is a crossover with no fitted scale, and §1(e) shows the
exponent must eventually turn negative.

---

## 4. Corrections and additions to the record

Proposals only. No live document was edited by this pass.

1. **[import-map-construction.md](import-map-construction.md) §4(a) should be
   marked adjudicated and half-refuted.** Its identity stands; its conclusion
   "autocovariances summing to exactly zero force `Var(S_m)/m → 0`" does not,
   per §1(b) above. Its practical instruction, fit `H` as a function of `D` and
   `m`, survives and is now backed by a prediction that worked.

2. **[../../TODO.md](../../TODO.md) item 0c, proposed edit, not made here** (0c
   is paired with U-FRAME §5a under `../../qc/ledgers.js`). The disputed clause
   should be rewritten to: the `√m` factor is **REFUTED** out of sample at T₂₃
   and at the blind level T₂₉, measuring 0.3216 ± 0.0096 and 0.3367 ± 0.0080
   against 0.5; the replacement exponent is level-dependent, `H` rising 0.2661
   to 0.3367 across five exact levels, and the pre-registered rule
   `H = 0.220511 + 0.006140 ln D` predicted T₂₉ to a fifth of a standard error.
   The `√(2 ln D)` factor is not confirmed either: `excess/sd_m` falls from
   9.039 to 4.707 across the grid at T₂₃. And the growth law cannot be stated
   uniformly in `m`, because `maxsum_m = W − minsum_{D−m}` forces it to turn
   over at `m = D/2` (§1(e)).

3. **The complementary-window duality belongs in the live layer.** It is one
   line, it is proven, it is exact, and it constrains every candidate maxsum
   law. It also gives a free upper bound in the other direction:
   `maxsum_m ≤ W − (D−m)·g_min` with `g_min` the smallest gap, which is 6 on
   every twin-admissible tile.

4. **[../../SEARCH-CONVENTIONS.md](../../SEARCH-CONVENTIONS.md) §1 already
   carries the scan-statistic row** proposed by
   [import-map-construction.md](import-map-construction.md) §5.1; nothing
   further is needed from this pass. No prior-art search was run here, so this
   note makes no absence claim.

## 5. Proposed regrade of IMPORT-MAP row 1

Report only; [../../IMPORT-MAP.md](../../IMPORT-MAP.md) was not edited.

| field | proposed |
|---|---|
| status | **LANDED, exponent settled, law still open** |
| fit | EXACT-IDENTITY, confirmed: the `D′`/θ machinery applies verbatim |
| circularity | CLEAN, confirmed: nothing here needs a hypothesis of postulate strength |
| payoff banked | **THEOREM** (the complementary-window duality) + **DERIVED-CONSTANT** (the exponent law `H = 0.2205 + 0.0061 ln D`, pre-registered and validated one level out) + **PUBLISHED-ANCHOR** (scan statistic / MOSUM as the owning convention) + a **REFUTATION** of the row's own offered identity |
| what the row must lose | the sentence "autocovariances summing to exactly zero force `Var(S_m)/m → 0`" and the phrase "it is impossible at the top of the range", which is true only in the `m ≍ D` sense the duality makes precise, not in the sense the row uses it |
| what the row keeps | `D′` fails below `m`, θ is below 1, θ is lower order, and `sd_m = σ√m` is what breaks. All three now MEASURED rather than asserted |

Calibration of the whole row, in one line: the import's **hole-fix survives its
own kill criterion**, and it delivers an exponent rather than the bound TODO 0c
needs, so the price rider on 0c is unchanged.

## 6. Not reached

- **No prior-art search was run**, on the duality, on the exponent law, or on
  the identification of `maxsum_m` with a scan statistic. The row's own
  construction note flagged the last of these as unsearched and it remains so.
- **The scan-statistics literature was still not read.** Leadbetter's conditions
  were applied from their statements as recorded during map construction; no
  Glaz-Naus-Wallenstein theorem was opened, and no published asymptotic for a
  moving-sum maximum over a *dependent* integer word was located or sought.
- **The tail factor is unexplained.** `excess/sd_m` is not `√(2 ln D)` and its
  m-dependence is now the whole residual. The natural next object is the
  extremal-index-corrected level `√(2 ln(θD))`, which θ from §2 makes computable,
  and it was not tested.
- **T₃₁ was not computed.** The streaming lever costs roughly thirty times the
  T₂₉ run, which is affordable, and a sixth exact level would decide whether the
  linear-in-`ln D` rule is a description or a coincidence.
