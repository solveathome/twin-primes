# Pre-registration — the kill shadow's drift AMPLITUDE

<!-- ledger
id: Q-shadow-amplitude
status: OPEN
todo: 5 (retired)
question: Where does the kill shadow's drift amplitude come from, and does the record's counting floor explain it?
verdict: Pre-registration of a corrected prediction and explicitly not a blind one - the ten measured cluster depths and their slot counts were already embedded before this file was written - so the frozen B_corr column scores a stated hypothesis rather than a sealed forecast, under three verdict rules fixed in advance.
-->

**Written 2026-08-19, TODO item 5's one remaining open number, BEFORE any new
measurement was run.** Committed alone, before either producer existed
(`research/shadow-amplitude-01-derivation.js`,
`research/shadow-amplitude-02-measure.js`).

## Custody, stated plainly

This is not a blind pre-registration and must not be read as one. The ten
measured cluster depths and their slot counts were **already embedded** in
`research/shadow-buchstab-02-instrument.js` and re-verified in
`research/adversary-wave2-01-shadow.js` before this file was written, and they
were read. Under the standing compute rule they are cited here, not
re-measured.

What is therefore fixed in advance and *cannot* be tuned:

1. the **form** of the correction — it has no free parameter, it is a product
   over primes, and it is written out in full below;
2. the **corrected prediction per cluster**, frozen as a table of ten numbers;
3. the **scoring rules**, including the error model and the tolerances;
4. two quantities that have **never been measured anywhere in this corpus** and
   are genuinely blind here: the pooled pre-band depth `[y²/2, y²)` over a whole
   cluster, and the exact number of *distinct* pairs a cluster's overlapping
   bands actually sample.

The frozen numbers in §2 and §3 were computed in a scratchpad script before
this file was committed; `shadow-amplitude-01-derivation.js` reproduces them
digit for digit from committed code, and no measured band datum enters that
producer.

## 0. The object

`adversary-wave2.md` §1 correction 2: the shadow's depth SHAPE is right (drift
coefficient `2 − 1/ln 2`, D3 10 of 10) but the drift's AMPLITUDE is not.
Measured drift `−0.03207` against a predicted `−0.01211` on the independent
ladder binning (ratio **2.648**), `−0.02726` against `−0.01188` on the record's
own clusters (**2.295**), `1.186` restricted to `y ≥ 2000`.
`shadow-buchstab.md` §4's candidate explanation is that "the local pair density
is still approaching its Hardy–Littlewood form at `x ~ 10⁶`", with the note that
the residual "decays too fast for a `1/ln y` or `1/ln²y` term".

## 1. The hypothesis, derived

The instrument normalises every count by the **exact** tile density

    delta(y) = (1/2) prod_{2<p<=y} (1 - 2/p).

The predicted curve `rho(u) = (e^gamma omega(u))^2` is normalised against the
**asymptotic** one. Write `M(y) = prod_{p<=y}(1 - 1/p)`,
`A(y) = prod_{p>y}(1 - 1/(p-1)^2)`, `C2 = prod_{p>2}(1 - 1/(p-1)^2)`. From
`(1 - 2/p) = (1 - 1/(p-1)^2)(1 - 1/p)^2`,

    delta(y) = 2 C2 M(y)^2 / A(y),
    delta_inf(y) := 2 C2 e^{-2 gamma} / (ln y)^2,
    K(y) := delta(y)/delta_inf(y) = (e^gamma M(y) ln y)^2 / A(y).

`K` is exactly the second-order content of the pair-Mertens product over the
prime range the band sieves: the squared Mertens partial-product error, divided
by the twin-constant tail. The normalisation `delta_inf . rho` is the exact
Hardy–Littlewood local pair density — at `u = 2`,
`delta_inf . e^{2 gamma}/4 = 2 C2 / (2 ln y)^2 = 2 C2 / (ln x)^2`. So

    measured(y) = lambda(y) . B_x(y) / K(y),

where `lambda(y)` is the ratio of the true local pair density in the band to its
Hardy–Littlewood form. **The corrected prediction is `B_x(y)/K(y)`, and
`lambda` is the only remaining freedom.** `K < 1` at every level reached, so the
correction is positive, which is the sign of the observed residual.

Two corollaries that the correction must not disturb: `1/K` is a level-wide
factor, so it cannot touch D3 (which passes 10 of 10) and it cannot touch the
coefficient `2 - 1/ln 2` (a first moment inside the band).

## 2. The corrected prediction, frozen

Clusters, level lists and `B_x` are those of
`shadow-buchstab-02-instrument.js` part (B) (centres `y0`, pool `[0.88 y0,
1.12 y0]`, budget `4e8`). `measured` is that file's embedded column, cited.

| y0 | levels | range | B_x | mean 1/K | **B_corr** | measured | measured − B_corr |
|---|---|---|---|---|---|---|---|
| 1000 | 36 | 881–1117 | 0.83365 | 1.00967 | **0.84171** | 0.85004 | +0.00833 |
| 1400 | 45 | 1237–1567 | 0.83192 | 1.00728 | **0.83797** | 0.84124 | +0.00327 |
| 2000 | 59 | 1777–2239 | 0.83025 | 1.00584 | **0.83510** | 0.83285 | −0.00225 |
| 2900 | 53 | 2557–2963 | 0.82886 | 1.00520 | **0.83317** | 0.83212 | −0.00105 |
| 4200 | 28 | 3697–3919 | 0.82756 | 1.00429 | **0.83111** | 0.82830 | −0.00281 |
| 6000 | 14 | 5281–5413 | 0.82629 | 1.00218 | **0.82809** | 0.82690 | −0.00119 |
| 8500 | 8 | 7481–7529 | 0.82512 | 1.00163 | **0.82647** | 0.82741 | +0.00094 |
| 12000 | 4 | 10567–10601 | 0.82401 | 1.00223 | **0.82585** | 0.82325 | −0.00260 |
| 18000 | 2 | 15859–15877 | 0.82279 | 1.00207 | **0.82449** | 0.82315 | −0.00134 |
| 26000 | 1 | 22901 | 0.82177 | 1.00138 | **0.82290** | 0.82279 | −0.00011 |

Ladder binning (`adversary-wave2-01-shadow.js` part C, one prime per rung):
`1/K = 1.00704` at `y = 1009` and `1.00111` at `y = 25409`, so `B_corr` runs
`0.83947 → 0.82241` and the corrected ladder drift is **−0.01707** against a
measured `−0.03207`.

## 3. The error model, fixed in advance

The record's `se(Poisson) = measured/sqrt(Ntot)` is computed on the **pooled**
slot total, and the pooling oversamples: at `y0 = 1000` thirty-six bands
`[y², 2y²]` covering `[776161, 2495378]` are summed, so the same pair is counted
up to eighteen times and `Ntot = 266735` counts about 13,000 distinct pairs.
The counting floor used for scoring is therefore

    sigma_eff = measured / sqrt(N_dist),

with `N_dist` the **exact** count of pairs the cluster's bands sample at least
once. A pair `n` is sampled iff `n` is `y_lo`-rough where `y_lo` is the smallest
cluster level with `n < 2 y_lo^2` (roughness is decreasing in `y`, so the
smallest covering level is the weakest test), which makes `N_dist` one segmented
pass over the union interval. Provisional estimates
`N_dist ~ delta(y_min) . |union| . measured` give

    sigma_eff ~ 0.00743, 0.00553, 0.00405, 0.00335, 0.00281,
                0.00218, 0.00166, 0.00123, 0.00086, 0.00062

for the ten clusters; the exact counts replace them at scoring. Poisson is
declared as a **floor**, not an estimate: prime pairs in long intervals are not
Poisson, and the correlation between overlapping bands can only widen the bar.

## 4. Criteria

**C1 — amplitude (the object).** `R = (measured drift)/(B_corr drift)` over the
full cluster span. PASS iff `1` lies inside the 2-sigma interval of `R`
propagated from the two endpoint clusters' `sigma_eff`. Reported for the full
span, for `y >= 2000`, and for the ladder. Frozen: the same test on the
**uncorrected** prediction gives `R = 2.294` with 2-sigma interval
`[1.039, 3.549]`, which excludes 1; on the corrected prediction `R = 1.449`
with `[0.656, 2.242]`.

**C2 — per-cluster residuals.** PASS iff `|measured − B_corr| <= 2 sigma_eff` at
all ten clusters AND the mean of `(measured − B_corr)/sigma_eff` lies in
`[−1, +1]`.

**C3 — route (a) meets route (b), and this one is blind.** The pre-band
`[y²/2, y²)` is pooled over every level of every cluster. Below `y²` a level-`y`
slot is a twin prime and nothing else, so the pre-band's model is the `u <= 2`
branch `e^{2 gamma}/u²` — exact Hardy–Littlewood, no independence conjecture in
it. Then `lambda_pre := measured_pre / pred_pre = lambda_twin / K`. Prediction:
`lambda_pre` equals the frozen `mean 1/K` column of §2 at every cluster.
PASS iff that holds within `2 sigma_eff(pre-band)` at 8 or more of 10 clusters.

**C4 — adjudicating the record's own explanation, blind.** Set
`lambda_twin = lambda_pre . K`, the measured local twin density over its
Hardy–Littlewood form at each cluster's scale.
- *"still approaching HL"* (the record's reading) predicts `lambda_twin > 1` at
  every cluster with a monotone decay toward 1.
- *"oscillates about HL"* predicts mixed signs and a mean within `2 sigma` of 1.
PASS for the correction hypothesis iff the second holds; the first would mean a
second systematic term survives and its size and decay must be stated.

**C5 — kill.** The hypothesis is WRONG if C1 fails, or if `measured − B_corr`
carries a trend in `y` significant at 2 sigma, or if `lambda_pre` differs from
`1/K` in the same direction at 8 or more clusters beyond `2 sigma`.

## 5. Verdicts

- **AMPLITUDE DERIVED** — C1, C2, C3 and C4 all pass. The drift's amplitude is
  the pair-Mertens finite-`y` factor `1/K(y)`; the shadow closes entirely, and
  the residual is counting noise whose true scale the record understated.
- **PARTIALLY EXPLAINED** — C1 passes, one of C2/C3/C4 fails. State the
  remaining term's size at `y ~ 1000` and its decay, and say what it correlates
  with.
- **HYPOTHESIS WRONG** — C1 fails or C5 triggers. The residual is structure;
  name what it correlates with.

No statistic outside C1–C5 will be promoted to a verdict after the fact. The
`[2,3]` branch of the survival curve remains the independence-squared
conjecture of `attack2-05` throughout; nothing scored here is a theorem about
it.
