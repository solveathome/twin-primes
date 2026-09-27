# T2a — pre-registered prediction for G2(43#) and G2(47#)

<!-- ledger
id: Q-T2a-prediction
status: PARTIAL
todo: none
question: What are G2(43#) and G2(47#), predicted blind from the thirteen exact terms?
verdict: Registered blind: G2(43#) central 630, window 561 to 747, and G2(47#) central 720, window 653 to 868, with the method's calibration PASSING on the eight-term prefix; the 43# term has since been enumerated at 618, inside the window and below the central value, and 47# remains unmeasured, with the report's own largest risk being that c2' may be about to turn down.
-->

**Written blind. No enumeration, no greedy, no partial computation of either term.
The only inputs are the thirteen exact G2 terms, the exact primorial arithmetic,
and two OEIS ladders the repo already holds.**

> **G2(43#) — central 630, window 561 to 747 (mod-6 sharpened: 564 to 744).**
> **G2(47#) — central 720, window 653 to 868 (mod-6 sharpened: 654 to 864).**
> **Calibration verdict: PASSED. The method reproduces the pre-registered
> 476 / 513 / 633 and the 488-vs-633 split digit for digit from the eight-term
> prefix.**

---

## 1. The law, and which statement is load-bearing

**One law is load-bearing.** `research/two-class-lower-bounds.md`:423-424, verbatim:

> **max gap ≈ c · m · (θ(x) − ln m)**, with `m` the exact mean gap of the
> sifted set and `θ(x) = ln x#`.

For our object `m = m₂ = x#/D_x` with `D_x = ∏_{3≤q≤x}(q−2)`, and
`θ(x) − ln m ≡ ln D_x` identically, so the law is
`G2(x#) ≈ c₂′ · m₂ · ln D_x` on the diagonal (window = whole period).
Measured constant `c₂′ = 0.4814 ± 0.0490`, 8 terms, `x ∈ [11, 37]`, cv 10.2%,
range `[0.4463, 0.5939]` (`two-class-lower-bounds.md`:437, `G2-STATE.md`:223).

`G2-STATE.md`:702-703 is the same law stated normatively ("Quote the Poisson form
with its (θ(x) − ln m) factor and the coordinates (x, lnD, lnD/θ(x)), never a bare
constant"). Not a second version.

`G2-STATE.md`:282's `m₂/m₁ ~ e^γ ln x/(2C₂) ~ 1.35 ln x` is **not** an
inequivalent law: it is the ratio of the two *denominators* `m` inside the one
law. Checked: `e^γ/(2C₂) = 1.78107/1.32032 = 1.34897`. Consistent.

**Two forms exist that are NOT usable to predict, and the corpus says so in both
cases. I used neither.**

| form | where | why not |
|---|---|---|
| `G2(x#) ≈ 1.2 x ln²x` | `two-class-lower-bounds.md`:460 | The same data supports 1.2 (asymptotic `θ−ln m → 2 ln x`) or 0.8 (direct finite-range fit), and the corpus says "both are defensible and they are not the same statement" (:466-470). At x = 43 the two read **730** and **487** — a factor 1.5 apart. Unusable. |
| the surface `c(x, lnD)` | `maxgap-law.md` §4 | **REFUTED on the diagonal** (`maxgap-law.md`:230-243): the off-diagonal exponents predict a 32% fall over `p = 101 → 271` where the exact terms deliver a 2.5% rise. |

So: one law, two shorthands the repo has already retired. **Finding: there is no
inequivalent live version.** The single load-bearing constant is the diagonal
`c₂′`, and it must travel with `(x, lnD)`.

---

## 2. Calibration — the known positive, and it passes

Rebuilding the original prediction from the eight terms `x ≤ 37` only, with
independent big-integer primorial arithmetic (no repo script used):

```
  x |     m2 |   lnD2 |  m*lnD |  G2 |   c2'
 11 |  17.11 |  4.905 |   83.9 |  42 | 0.5004
 13 |  20.22 |  7.303 |  147.7 |  66 | 0.4469
 17 |  22.92 | 10.011 |  229.4 | 108 | 0.4707
 19 |  25.61 | 12.844 |  329.0 | 150 | 0.4559
 23 |  28.05 | 15.889 |  445.8 | 204 | 0.4577
 29 |  30.13 | 19.185 |  578.1 | 258 | 0.4463
 31 |  32.21 | 22.552 |  726.4 | 348 | 0.4791
 37 |  34.05 | 26.107 |  889.0 | 528 | 0.5939
```

| quantity | my reconstruction | published | verdict |
|---|---|---|---|
| `c₂′` mean, sd, cv | 0.4814, 0.0490, 10.2% | 0.4814, 0.0490, 10.2% | exact |
| `m·lnD` at x = 41 | 1065.7 | 1065.7 (`:502`) | exact |
| window low | **475.6 → 476** | 476 | exact |
| window centre | **513.0 → 513** | 513 | exact |
| window high | **633.0 → 633** | 633 | exact |
| outlier branch (median `c₂′` over x ≤ 31 = 0.4577) | **487.7 → 488** | 488 (`:514`) | exact |
| level-shift branch | 633 | 633 | exact |

`D_41 = 8,499,244,879,125`, matching the brief. **The model is the right one.**

---

## 3. What the thirteenth term did to the law

`c₂′(41) = 546 / 1065.66 = 0.51234`. **`c₂′(41) = 0.5123` is VERIFIED**, from the
definition at `two-class-lower-bounds.md`:485-495, independently recomputed. Used.

Nine-term state: mean **0.4848**, sd 0.0469, cv **9.7%**, median 0.4707, range
unchanged at `[0.4463, 0.5939]`.

The reading the corpus needs: **546 leaned outlier but the level did not go back
down.** `c₂′(41) = 0.5123` is above the maximum of the seven-term base band
`x = 11..31`, which is 0.5004. The two most recent terms are the two largest of
nine. Under exchangeability that alone is `p = 1/C(9,2) = 1/36 = 2.8%`.
So "37 was an outlier" is not yet the right description either.

Inputs for the two new terms (exact):

```
  D_43 = 348,469,040,044,125      m2(43) = 37.543  lnD = 33.485  m*lnD = 1257.1
  D_47 = 15,681,106,801,985,625   m2(47) = 39.212  lnD = 37.291  m*lnD = 1462.3
```
The deterministic factor grows **+18.0%** at 43 and a further **+16.3%** at 47,
**+37.2%** over the two steps. Any level question is a ~10% question riding on a
37% deterministic rise; state which one you are reading.

---

## 4. THE PREDICTION

### Hard bounds first (these are not predictions)

- **Both values are ≡ 0 mod 6. PROVEN, one line.** For `x ≥ 3` a twin slot `n`
  has `n, n+2` both odd and both coprime to 3, forcing `n ≡ 2 mod 3` and `n` odd,
  so every twin slot is `≡ 5 mod 6` and every gap is a multiple of 6. Holds at all
  twelve terms `x = 3..41` (6,12,30,42,66,108,150,204,258,348,528,546 — all `≡ 0`).
- **Floor 546** at both, by monotonicity of `G2` in `x`, and `G2(43#) ≤ G2(47#)`.
- **Ceiling 1044 at 43# and 1284 at 47#**, from the exact free-choice
  `h₂` (A288815, `maxgap-law.js`:66-67; `G₂ ≤ h₂` "confirmed by our data at every
  level", `PRIOR-ART.md`:24). This is the same channel that gave 894 at x = 41.

### Central values and windows

| | central | window | basis of the window |
|---|---|---|---|
| **G2(43#)** | **630** (`c₂′ = 0.5011`) | **561 – 747** (mod-6: **564 – 744**) | observed range of `c₂′` over all thirteen terms, `[0.4463, 0.5939]`, times `m·lnD = 1257.1` — **the identical basis that produced 476–633** |
| **G2(47#)** | **720** (`c₂′ = 0.4924`) | **653 – 868** (mod-6: **654 – 864**) | same, times `m·lnD = 1462.3` |

**Where the central comes from.** An AR(1) on `ln c₂′` about the nine-term
geometric mean, `ρ = 0.6`. It nests the estimator that produced 513 (`ρ = 0`) and
its one parameter is *not* fitted on the nine target terms — it is the lag-1
autocorrelation of detrended `ln c₁` measured on **54 terms of A048670**, where I
read `ρ₁ = 0.737` over `x = 11..271` and `0.480` over `x = 41..271`. These ladders
are **persistent, not mean-reverting**, so an above-mean level tends to hold.

Rolling one-step-ahead backtest (history ≥ 4 terms, targets x = 23,29,31,37,41):

```
  estimator            bias%   rms%   median%   errors
  AR(1) rho=0.4         -3.8    9.7      1.2     1.2  3.7  -4.8 -20.8  1.9
  AR(1) rho=0.6         -3.1    9.9      0.7     0.7  3.3  -5.5 -20.3  6.4
  flat mean (published) -4.8   10.4     -3.4     2.4  4.5  -3.4 -21.7 -6.0
  ceiling ratio G2/h2   -8.0   11.6     -3.7    -0.4 -3.1  -8.5 -24.1 -3.7
  one-class c2'/c1      -18.3  19.5    -14.2   -12.8 -14.2 -13.9 -31.5 -18.9
```

The AR(1) advantage over the flat mean is small (9.9% vs 10.4% rms on n = 5) and
I do not claim more than that; what is outside the noise is the **one-class
channel's consistent 18% underprediction** (see §5).

**Estimator spread.** The reasonable estimators span **606 to 664** at 43# and
**708 to 773** at 47#. My centre carries roughly ±5% model uncertainty on top of
the ~10% sampling scatter. Stated in advance so it cannot be claimed afterwards.

**A methodological note on the window.** The corpus's "range of `c₂′`" basis is
**not** a 95% interval. Against the measured forecast-error distribution it runs
about −1.1σ to +1.9σ at 43#. It is a *has-this-level-been-seen-before* band, which
is exactly right for the discrimination test below, and wrong if read as a
confidence interval. A ±2 rms interval would be 505–755 and 540–900.

---

## 5. What each outcome means — pre-registered, three tests

### D1. Level shift, or excursion? (the direct successor to the 41# test)

Split at `c₂′ = 0.510`, the midpoint between the base band's top (0.5004,
x = 11..31) and the recent pair's floor (0.5123). Because both values are
multiples of 6, the decision points are exact integers:

| | "excursion" (base level stands) | "level shift" |
|---|---|---|
| G2(43#) | **≤ 636** | **≥ 642** |
| G2(47#) | **≤ 744** | **≥ 750** |

- **Both ≥ threshold.** Four consecutive terms above the entire seven-term base
  band. Distribution-free exchangeability: `p = 1/C(11,4) = 1/330 = 0.3%`.
  **The diagonal `c₂′` is not a constant, it drifts.** That is a real change to
  §6 of `two-class-lower-bounds.md`, and it is the sign Maier-Pomerance needs.
- **Both ≤ threshold.** x = 37's 0.594 was an upward excursion, the base level
  near 0.465–0.485 stands, the diagonal law is a constant on everything
  computable, and the c₂′ row should be re-quoted with the outlier flagged.
- **Split one each.** Unresolved. `p = 0.024` for the weaker "top 3 of 11 among
  the last 4" statement. **Report it as unresolved; do not spin it.**

My centre (630, 720) sits just *below* both thresholds, so I am predicting **"no
confirmed level shift", weakly** — and the estimator's own 10% scatter is larger
than the 19% gap between the two hypothesis centres divided by √2, so a single
term gives ~1.9σ and the pair gives ~2.7σ. **This test needs both terms.**

### D2. Does `G₂(x#)/x²` fall? (the repo's one open empirical question)

Current exact: `546/41² = 0.32481`. The ratio holds at or above that value iff

> **G2(43#) ≥ 606** and **G2(47#) ≥ 720**.

My centrals give `0.3407` at 43 (+4.9%) and `0.3259` at 47 (+0.3%), so
**I predict the ratio does not fall over either step, and lands essentially flat
at 47**, consistent with the corpus's "+0.05 ± 0.11 over eleven exact terms".

Note the flat-law reading is a slightly different prediction: `c₂′` constant
gives 609 and 709, i.e. `G₂/x²` of 0.3294 and 0.3210 — **flat at 43 and down 1.2%
at 47**. So the flat law and my AR(1) centre straddle the D2 threshold at 47#.
**That is the most decision-relevant single bit these two terms carry.**

If `G2(47#) < 653` (the window floor), `G₂/x²` drops to below 0.2956, a 9% fall,
which would be **the first real evidence of a fall inside the exactly-known
range** and would justify reopening the Y2-certificate reading.

### D3. The exponent will not move, and nobody should read one off these terms

Raw nine-term x-frame fit with 546 included: `β = 1.931 ± 0.075`. Adding the two
predicted terms:

| added | β | move |
|---|---|---|
| central 630 / 750 | 1.921 | −0.009 |
| flat law 609 / 709 | 1.900 | −0.030 |
| window floor 561 / 653 | 1.863 | −0.068 |
| window ceiling 747 / 868 | 1.993 | +0.063 |
| free-choice ceiling 1044 / 1284 | 2.160 | +0.229 |

**Pre-registered: whatever the two terms are, the exponent moves by less than the
control bias of +0.262 (`G2-STATE.md` §3b) and therefore carries no evidence.**
The only outcome that moves it materially is both terms landing at the free-choice
ceiling, which the ceiling-ratio channel (see below) makes implausible.

---

## 6. The one-class values (step 4) — they are exact, and they are useless

**h(43#) = 90 and h(47#) = 100 are EXACT, not predictions.** A048670 has 58 exact
terms to `p₅₈ = 271`, indices 14 and 15 (`maxgap-law.js`:62-64,
`audit-numbers.js`:541-544). Likewise `h₂(43#) = 1044` and `h₂(47#) = 1284` are
exact in A288815. I do not present any of these as forecasts.

What I did instead is test whether they *help*, since the Poisson law is a ratio
and the brief is right that the denominator matters. **They do not, and this is
the most surprising finding in the report.**

```
  x  |    c1  |    c2  |   c2'  | G2/h2 | G2/g
 31  | 0.3672 | 0.7847 | 0.4791 | 0.611 | 6.000
 37  | 0.3540 | 0.7964 | 0.5939 | 0.746 | 8.000
 41  | 0.3417 | 0.8389 | 0.5123 | 0.611 | 7.378
 43  | 0.3628 | 0.8305 |    ?   |   ?   |  ?
 47  | 0.3558 | 0.8781 |    ?   |   ?   |  ?
```

**Finding A — our G₂ is orthogonal to both OEIS objects at the level of
level-specific excursions.** Detrended (log-log vs `ln ln x`) residual
correlations, n = 9, `|r| = 0.666` needed for p < 0.05:

```
  corr(res c2', res c1) =  0.247      not significant
  corr(res c2', res c2) = -0.137      not significant
  corr(res c1,  res c2) =  0.734      SIGNIFICANT
```

The two published objects share level-specific structure. Ours shares it with
neither. So the fact that `g(43#) = 90` is a *large* jump (+21.6% on `g(41#) = 74`
against only +14.6% in the law's own factor) **carries no information about
G₂(43#)**, and neither does `c₂(47) = 0.8781` being high.

**Finding B — the ratio channel is worse, not better.** cv over the nine joint
terms: `c₂′` **9.7%**, `G2/h₂` 13.6%, `c₂′/c₁` 18.4%, `G2/g` 34.0%. Dividing by a
same-level known quantity *adds* noise. On the rolling backtest the `c₂′/c₁`
channel is negative at all five targets, bias −18.3%, rms 19.5%.

This matters for the corpus: `two-class-lower-bounds.md`:533-536 says "Both
objects sit at a flat multiple of their own Poisson prediction". Over
`x = 11..41` **`c₂′/c₁` is not flat** — it runs 1.062, 0.917, 1.146, 1.123, 1.218,
1.274, 1.305, 1.678, 1.499, a 41% rise, because `c₁` falls (slope −0.815 vs
`ln ln x`) while `c₂′` rises (+0.243) on the same range. The corpus's sentence is
about the *asymptotic* `o(1)` appearing on both, and it survives in that reading,
but it must not be used to predict — I tried and it is the worst estimator here.

**Ceiling-approach prediction, for the record.** `G2/h₂` at my centrals is
`630/1044 = 0.603` and `750/1284 = 0.584`, against 0.746 at x = 37 and 0.611 at
x = 41. I predict the ratio stays near 0.58–0.61 and does **not** continue toward
the x = 37 spike. `G2(43#) > 780` or `G2(47#) > 900` would mean the difference-2
constraint costs far less than the record suggests.

---

## COVERAGE

**What I did not reach.**
- No certificate exists at `x = 43` or `47`. The published `Y2` ladder
  (`two-class-lower-bounds.md`:337-354) jumps 37 → 73, so the only floor available
  to me is monotonicity at 546. I did **not** run the two-class driving-term lemma
  (`:558-562`) to derive a certified floor, because it needs `maxsum` data on
  `T_41` and building that is a partial computation of the answer. That lemma is
  the one instrument that could have tightened the window's bottom edge honestly,
  and someone not under the blind constraint should run it.
- I made no attempt to model `c₂′` structurally (why 37 is high). Nine terms.
- I did not check whether the sign of `c₂′`'s drift survives on the `h₂` ladder
  past `x = 73`, which is where a longer two-class run-in shape would show.

**What I suspect but cannot prove.**
- The `x = 37` term is a genuine level event, not noise, and 41 is the first term
  of a *decaying* return to base rather than a second high draw. That is why my
  AR(1) leans up at 43 and less at 47. It rests on ρ imported from a different
  object and I would not defend it hard.
- `G₂/x²` is flat rather than falling over these two steps, but flat only because
  `ln²x/x` is nearly stationary at these `x`, not because the object is quadratic.
  The law's own deterministic factor `m·lnD/x²` reads 0.6494, 0.6340, 0.6799,
  0.6620 at x = 37, 41, 43, 47 — **non-monotone**, because 43 is a "tight" prime
  step and 47 a loose one. Anyone reading a trend off two terms will read the
  arithmetic of which primes 43 and 47 are, not a growth law.

**Where I am most likely wrong, ranked.**
1. **Both centrals too low.** *Every* estimator in the backtest has negative bias
   (−1.6% to −8.0% one-step, −7.2% to −11.2% two-step). If that bias is real
   rather than the single `x = 37` outlier driving it (median bias is only −3.4%),
   the right centrals are about 5% higher: **660 and 756**. I applied the
   persistence correction once and declined to bias-correct on top of it. That may
   be the wrong call, and if both terms land near 660 and 760 this is the reason.
2. **The 47# window is too narrow.** I used the same range basis at both terms,
   but the measured two-step forecast error is wider than the one-step (rms 12.3%
   vs 9.9%). A 47# window of roughly 620–900 would be better calibrated. I kept
   the range basis so the two predictions are comparable to the one that was
   scored, and I am flagging the cost.
3. **`c₂′` may be about to turn down.** Over the identical `x` range `c₁` falls
   hard (slope −0.815 vs `ln ln x`) before plateauing near 0.366 from `p = 59`.
   If `c₂′` is a delayed copy of that shape rather than a genuinely rising series,
   both centrals are too high and the truth is nearer the base-band branch,
   582 and 678. I have no instrument that separates these two stories on nine
   terms, and this is the largest structural risk in the report.
4. **ρ = 0.6 is transferred, not measured on the target.** On nine terms `c₂′`'s
   own `ρ₁` reads 0.103 with a 95% band of ±0.653 — completely uninformative. If
   the true `ρ` is 0 the centrals become 606 and 708.
