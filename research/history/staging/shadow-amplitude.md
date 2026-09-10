# The kill shadow's drift amplitude: a derived finite-y factor, and a floor the record printed four times too small

<!-- ledger
id: Q-shadow-amplitude
status: PARTIAL
todo: 5 (retired)
question: Where does the kill shadow's drift amplitude come from, and does the record's counting floor explain it?
verdict: The finite-y correction is an identity with no free parameter and both measurement routes agree 10 of 10, but the record's own counting floor is four to six times too small and its candidate explanation is the wrong half, so the label stays PARTIALLY EXPLAINED.
-->

**2026-08-19, TODO item 5's last open number.** Pre-registration:
[shadow-amplitude-prereg.md](shadow-amplitude-prereg.md), **committed alone**
(`6c49f5f`) before either producer existed — the first git-provable
pre-registration in this thread. Producers, both formally embedded:
[`../../shadow-amplitude-01-derivation.js`](../../shadow-amplitude-01-derivation.js)
(0.1 s, pure computation, no measured datum in it) and
[`../../shadow-amplitude-02-measure.js`](../../shadow-amplitude-02-measure.js)
(17.4 s). The ten cluster depths and slot counts are **cited** from
`../../shadow-buchstab-02-instrument.js` and `../../adversary-wave2-01-shadow.js`
under the standing compute rule, never re-measured. **No live document was
edited. Proposals only.**

**VERDICT: PARTIALLY EXPLAINED**, by the pre-registration's own rule — C1, C3
and C4 pass, C2 fails at one cluster of ten, C5 is clear. The amplitude is not a
defect of the law. What is left is stated in §5 with its size and its sign.

---

## 0. The scorecard

| criterion | result |
|---|---|
| **C1** amplitude: 1 inside the 2σ interval of (measured drift)/(predicted drift) | **PASS** on all three binnings with the correction; **FAIL** on two of three without it |
| **C2** every cluster within 2σ of the corrected prediction, mean z in [−1,+1] | **FAIL** — nine of ten inside, `y ~ 12000` at z = −2.12; mean z −0.401 |
| **C3** the derived `1/K` equals the independently measured `λ_pre` | **PASS, 10 of 10** |
| **C4** is the local pair density approaching HL, or oscillating about it? | **PASS** — oscillating; 4 of 10 clusters above 1, mean 0.31σ |
| **C5** kill (surviving trend, or one-sided `λ_pre − 1/K`) | **not tripped** — trend 1.98σ against a 2σ bar, 0 clusters one-sided |

Amplitude ratios, before and after, with the exact-`N_dist` 2σ intervals:

| binning | uncorrected | 2σ | corrected | 2σ |
|---|---|---|---|---|
| ten clusters, `y ~ 1000 → 26000` | **2.294** | [1.034, 3.555] ✗ | **1.449** | [0.653, 2.245] ✓ |
| ladder, `y = 1009 → 25409` | **2.648** | [1.018, 4.278] ✗ | **1.879** | [0.722, 3.036] ✓ |
| `y ≥ 2000` | 1.186 | [0.221, 2.151] ✓ | 0.825 | [0.154, 1.496] ✓ |

## 1. The correction is an identity, and it has no free parameter

`shadow-buchstab-02-instrument.js` normalises every count by the **exact** tile
density `δ(y) = ½ ∏_{2<p≤y}(1 − 2/p)`. The curve it scores against,
`ρ(u) = (e^γ ω(u))²`, is normalised against the **asymptotic** one. From
`(1 − 2/p) = (1 − 1/(p−1)²)(1 − 1/p)²`, with `M(y) = ∏_{p≤y}(1 − 1/p)`,
`A(y) = ∏_{p>y}(1 − 1/(p−1)²)` and `C₂` the twin-prime constant:

    δ(y)   = 2 C₂ M(y)² / A(y)                       (identity, checked to 2e-14)
    δ_∞(y) = 2 C₂ e^{−2γ} / (ln y)²
    K(y)  := δ(y)/δ_∞(y) = (e^γ M(y) ln y)² / A(y)

and `δ_∞·ρ` is the exact Hardy–Littlewood local pair density — at `u = 2`,
`δ_∞ · e^{2γ}/4 = 2C₂/(2 ln y)² = 2C₂/(ln x)²`. Therefore

    measured(y) = λ(y) · B_x(y) / K(y),

`λ` being the true local pair density over its HL form. **The corrected
prediction is `B_x(y)/K(y)`.** `K < 1` at every level reached, so the correction
is positive, which is the sign of the observed residual. It is level-wide, so it
cannot disturb D3 (which passed 10 of 10) nor the coefficient `2 − 1/ln 2`
(a first moment *inside* the band).

`K` is almost entirely the Mertens partial product: at `y = 1009` its two halves
are `(e^γ M ln y)² = 0.992885390` and `1/A = 1.000126148`, so the twin-constant
tail carries under 2% of the correction, and by `y = 22901` that tail is
`1.000003971`. This is precisely route (a) of the task — the second-order term of
the pair-Mertens product over the prime range the band sieves — and it is the
whole of the derived term.

Frozen corrected predictions (prereg §2, reproduced by producer 01):

| y0 | B_x | 1/K | **B_corr** | measured | res |
|---|---|---|---|---|---|
| 1000 | 0.83365 | 1.00967 | **0.84171** | 0.85004 | +0.00833 |
| 1400 | 0.83192 | 1.00728 | **0.83797** | 0.84124 | +0.00327 |
| 2000 | 0.83025 | 1.00584 | **0.83510** | 0.83285 | −0.00225 |
| 2900 | 0.82886 | 1.00520 | **0.83317** | 0.83212 | −0.00105 |
| 4200 | 0.82756 | 1.00429 | **0.83111** | 0.82830 | −0.00281 |
| 6000 | 0.82629 | 1.00218 | **0.82809** | 0.82690 | −0.00119 |
| 8500 | 0.82512 | 1.00163 | **0.82647** | 0.82741 | +0.00094 |
| 12000 | 0.82401 | 1.00223 | **0.82585** | 0.82325 | −0.00260 |
| 18000 | 0.82279 | 1.00207 | **0.82449** | 0.82315 | −0.00134 |
| 26000 | 0.82177 | 1.00138 | **0.82290** | 0.82279 | −0.00011 |

## 2. The measurement half: routes (a) and (b) agree, 10 of 10

Below `y²` a level-`y` slot is a twin prime and nothing else (a `y`-rough
composite needs two factors above `y` and so exceeds `y²`), so the pre-band
`[y²/2, y²)` is scored against the `u ≤ 2` branch `e^{2γ}/u²`, which is exact HL
with **no independence conjecture in it**. Pooled over every level of every
cluster — a measurement this corpus had never made — it gives
`λ_pre := measured_pre/pred_pre`, which the derivation says must equal `1/K`.

It does, within 2σ at all ten clusters: 1.00748 against 1.00967 at `y ~ 1000`,
0.99983 against 1.00163 at `y ~ 8500`, 1.00096 against 1.00138 at `y ~ 26000`.
A derivation and a measurement that never touch the same integers return the
same finite-`y` factor.

The identity behind it is checkable from raw counts and is: at `y = 1009` the
pre-band's measured depth 0.83771 over its prediction 0.82998, times `K`, is
**1.00226**, and the window's 3684 twin primes over the Hardy–Littlewood sum
3675.7 is **1.00226**. The sieve count and the prime count agree to five
decimals. (The pre-band's slot count equals its twin-prime count exactly: 81 and
81 at `y = 101`, 3684 and 3684 at `y = 1009`.)

## 3. The record's counting floor is four to six times too small

`shadow-buchstab-02` prints `se(Poisson) = measured/√Ntot` on the **pooled**
slot total. The pooling oversamples: at `y0 = 2900` the 53 bands `[y², 2y²]`
cover one interval `[6538249, 17558738]`, and `Ntot = 2219418` counts **61931**
distinct pairs — a 35.84× oversample. A pair `n` is sampled iff `n` is
`y_lo`-rough for the *smallest* cluster level with `n < 2y_lo²` (roughness
decreases in `y`, so the smallest covering level is the weakest test), which
makes the exact count one segmented pass.

| y0 | Ntot pooled | N_dist exact | oversample | se printed | se true |
|---|---|---|---|---|---|
| 1000 | 266735 | 12981 | 20.55× | 0.00165 | 0.00746 |
| 2000 | 1417269 | 42351 | 33.46× | 0.00070 | 0.00405 |
| 2900 | 2219418 | 61931 | 35.84× | 0.00056 | 0.00334 |
| 8500 | 1945202 | 248328 | 7.83× | 0.00059 | 0.00166 |
| 26000 | 1779677 | 1779677 | 1.00× | 0.00062 | 0.00062 |

The understatement is worst — 4.5× to 6× — at exactly the clusters where the
residual is largest. This is a defect in the record's error column, not in its
measurement. Poisson is used here as a **floor**, not an estimate: prime pairs
in long intervals are not Poisson and the residual correlation between
overlapping bands can only widen the bar.

## 4. The record's own candidate explanation is the wrong half

`shadow-buchstab.md` §4 reads the small-`y` excess as "the local pair density is
still approaching its Hardy–Littlewood form at `x ~ 10⁶`". Measured directly,
`λ_twin = λ_pre · K` — the local twin density over its HL form at each cluster's
own scale — reads

    0.99784  1.01926  1.00574  0.99912  1.00229  0.99934  0.99820  1.00078
    0.99833  0.99959

**above 1 at 4 of 10 clusters, mean 0.31σ, and its largest excursion is at
`y ~ 1400`, not at the smallest scale.** The local pair density oscillates about
its HL form at these scales; it is not walking up to it. What has not reached
its asymptote is the **fair share the instrument divides by**, and that is
derivable rather than empirical. The §4 reading should be replaced, not
softened.

The same correction dissolves §4's other claim. Subtract `1/K` from the eleven
points of `shadow-buchstab-02` part (D) and the column reads +0.00922 +0.01130
+0.00107 +0.00105 +0.00474 −0.00144 −0.00376 −0.00292 +0.00209 −0.00217
−0.00036: it changes sign three times and is not a decay at all. The apparent
eleven-fold fall from `y ~ 1000` to `y ~ 2000` was a smooth 1.7-fold fall in
`1/K` plus scatter of the size §3 gives. "Far too steep a decay for a `1/ln y`
or `1/ln²y` term" was true and pointed the wrong way: the derived term is not a
power of `1/ln y` at all, it is the prime-counting fluctuation inside `M(y)`.

## 5. What is left, and why the label is PARTIALLY EXPLAINED

Two residues survive the correction, and they point opposite ways.

- At `y ~ 1000` the correction leaves **+0.00833 ± 0.00746** (1.12σ). It is gone
  by `y ~ 2000` (−0.00225 ± 0.00405). So the steep small-`y` excess is explained
  to 1.1σ and there is no term left to name there.
- Across the eight clusters at `y ≥ 2000` the inverse-variance mean of the
  corrected residual is **−0.00079 ± 0.00043**, a **1.85σ over-correction**, and
  the corrected residual's trend on `ln y` is **−0.523 ± 0.264 = 1.98σ**, which
  missed C5's 2σ bar by a hair. One cluster, `y ~ 12000`, sits at z = −2.12 and
  is what fails C2.

Both are consistent with zero at 2σ and neither is worth naming yet. The honest
arithmetic: **45.1% of the missing drift is the derived `1/K`**, and the
remaining −0.00844 is 1.13σ of the endpoint clusters' own floor. Under the
pre-registration's rule DERIVED needs C1 **and** C2 **and** C3 **and** C4, so
the label is PARTIALLY EXPLAINED. Grading it higher would repeat exactly the
error `adversary-wave2.md` §1 correction 1 caught in the parent record.

What would settle the remainder is more **distinct** pairs. At `y ~ 1000` that
means a wider pool, not a longer run: the 36 bands there already exhaust the
`x`-range they cover, and 12981 pairs is all the arithmetic in
`[776161, 2495378]` contains. A ±40% pool at each centre, or centres chosen so
the unions do not overlap, would roughly halve every floor in §3.

## 6. Proposed disposition of TODO item 5

The item's remaining open number is answered as far as the data can answer it.
Proposed: **item 5 leaves the file**, with these carried into the record it
points at.

1. `shadow-buchstab.md` §2's drift law gains its amplitude clause:
   `0.793055·(1 + (2 − 1/ln2)·ln2/ln y + …)/K(y)`, with `K` defined as in §1 and
   the note that `1/K` is the pair-Mertens partial-product factor and supplies
   45.1% of the drift the raw law under-predicts.
2. `shadow-buchstab.md` §4's reading is **replaced**: the local pair density
   oscillates about HL at these scales (4 of 10 clusters above, mean 0.31σ);
   what has not converged is the fair share.
3. `shadow-buchstab-02-instrument.js`'s `se(Poisson)` column is **wrong by 4× to
   6×** at every pooled cluster and should be recomputed on distinct pairs, or
   labelled as what it is. This is the correction with the widest blast radius:
   any conclusion in the corpus that priced a pooled-band residual against
   `measured/√Ntot` priced it against the wrong floor.
4. The verdict label on the kill shadow stays **SHAPE-ONLY** as
   `adversary-wave2.md` set it. Nothing here promotes it; what changes is that
   the amplitude gap now has a derived first term and a measured error bar
   instead of an unexplained factor 2.6.

Absence: no prior treatment of this correction to a band-averaged Buchstab depth
is claimed. `../../SEARCH-CONVENTIONS.md` §1 carries no owning convention for
the shadow constant, and the pieces used here — Mertens' third theorem's error
term, the singular-series partial product — are textbook and are cited as such,
not as findings.
