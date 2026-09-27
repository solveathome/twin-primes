# qc-slopes-K: the 1.06 / 1.45 / 1.30 slopes, settled by computation

<!-- ledger
id: Q-qc-slopes-K
status: ANSWERED
todo: none
question: Are the three fits at slopes 1.062, 1.451 and 1.2992 numerically inconsistent?
verdict: There is no numerical inconsistency: the seven tile points are seven of the 42 census points with f agreeing to printed precision, restricting the 42 to the seven's x reproduces 1.062 exactly, and the two estimates are statistically indistinguishable (seven-point 95 per cent interval [0.32, 1.81]); but the corpus's stated reason is wrong, the comb does not explain it, and the coefficient is range-dependent under every specification, so no single slope exists.
-->

Wave 3, partition K. Question raised by partition B in wave 2: three fits of
apparently the same shape sit at slopes 1.062, 1.451 and 1.2992, and nobody had
checked the first two on their shared points. This note checks them.

**Verdict in one line.** There is no numerical inconsistency and there never
was: the seven tile points are seven of the forty-two census points, with f
agreeing to the printed precision of both scripts, so restricting the 42 to the
seven's x reproduces 1.062 exactly. The two slope estimates are statistically
indistinguishable, the seven-point 95 percent interval being [0.32, 1.81], which
contains 1.451. But the *reason* the corpus gives for the difference is wrong on
one specific clause, the comb correction does not explain it, and a stronger
result falls out of the check: **the coefficient on 2p/m̄ is range-dependent
under every specification tried, so no single number is "the" slope.** The
1.2992 fit is a genuinely different object and the prose that compares it to the
f fits does not say so.

---

## 1. What was regenerated, and by which script

Nothing below is transcribed from prose. Every point set was recomputed on this
machine, 2026-08-17, node.

| point set | script | invocation | wall time | what it is |
|---|---|---|---|---|
| 7 tile points, x = 11..31 | `research/a3-02-diagonal-f.js` | `node a3-02-diagonal-f.js fast` then `deep` | 35 s + 131 s | f from the actual gap word: T₁₁ to T₂₃ sieved, T₂₉ and T₃₁ streamed (6,226,553,025 slots, never stored) |
| 42 census points, x = 11..199 | `research/a3-03-f-from-census.js` | `node a3-03-f-from-census.js 210 3e9` | 434 s | f from the grain census inclusion-exclusion, no tile ever built |
| 31 tail points, p = 7..139 | `research/a3-09-histogram-operator.js` | `node a3-09-histogram-operator.js` | 201 s | P(gap ≥ 2p′) from the head engine |

`research/localized-04-maxsum.js` was **not** run and is not a source for any of
the three fits. Its 1.06 is a different quantity, see §7.

All three regenerations reproduce the recorded numbers digit for digit:

- a3-03 §5B: `ln(1/f) = 1.001 + 1.451·(2p/m̄)  R2=0.9020`, and §5E
  `ln(1/f) = 1.529 + 1.482·(2p/m̄) − 1.025·ln s(d_min)  R2=0.9639`, and §5D
  `ln L_indep = -1.884 + 2.892·ln ln x  R2=0.9719`, and the quarter ratios
  1.829, 1.801, 1.740, 1.582.
- a3-09 §7: `all 31 points (p=7..139): a=-0.235  b=1.2992  R2=0.99292`, and the
  last 23 alone `b=1.3550  R2=0.99355` (the child note rounds that to 1.36).
- a3-02 deep: T₃₁ folded by 37, D = 6,226,553,025, W = 200,560,490,130,
  m̄ = 32.2105, G₂ = 348, f = 1.844e−2, ln(1/f) = 3.9930, L = 4.

## 2. The f values agree, so there is no data defect (brief item 4)

This was the priority check: a disagreement in f between the tile route and the
census route would matter far more than a slope disagreement.

```
  x | p | f (tile, a3-02) | f (census, a3-03) | relative difference
  11 | 13 | 4.4400e-2 | 4.4444e-2 | 9.90e-4
  13 | 17 | 4.8500e-2 | 4.8485e-2 | 3.09e-4
  17 | 19 | 4.8800e-2 | 4.8844e-2 | 9.01e-4
  19 | 23 | 3.1100e-2 | 3.1119e-2 | 6.11e-4
  23 | 29 | 3.0700e-2 | 3.0660e-2 | 1.30e-3
  29 | 31 | 3.7400e-2 | 3.7367e-2 | 8.83e-4
  31 | 37 | 1.8400e-2 | 1.8445e-2 | 2.44e-3
```

a3-02 prints f to three significant figures, so the residual 1e−3 is print
precision. a3-03 §3 compares the two routes at full precision on the five
enumerable folds and gets relative errors 1.56e−16, 7.16e−16, 7.10e−16,
4.46e−16, 3.39e−16. a3-09 §9 gets the same seven f values independently from the
transfer operator. Three routes, one set of numbers.

**Consequence, and it is the whole answer to the question as posed.** The seven
tile points are not a separate measurement that could disagree with the 42. They
are the first seven of the 42. Restricting the census set to the tile x values
and refitting is therefore not a test of agreement, it returns the tile fit by
construction:

```
  SEVEN shared points (census f) : ln(1/f) = 1.358 + 1.062·(2p/m̄)  R² 0.7298  n=7
  SEVEN shared points (tile f)   : ln(1/f) = 1.364 + 1.057·(2p/m̄)  R² 0.7350  n=7
  ALL 42 census points           : ln(1/f) = 1.001 + 1.450·(2p/m̄)  R² 0.9020  n=42
```

The recorded 1.062 / 1.357 / 0.730 is reproduced. The 1.057 from the tile f is
the same fit run on three-significant-figure inputs.

## 3. The two estimates are statistically indistinguishable (brief item 3)

```
  SEVEN : slope 1.062  SE 0.289  95% CI [0.319, 1.805]  residual s 0.197
  ALL 42: slope 1.450  SE 0.076  95% CI [1.298, 1.603]  residual s 0.650
  the 35 NON-shared points: slope 1.309  SE 0.103  95% CI [1.098, 1.521]
```

Three tests, all agreeing:

- (a) t = (1.062 − 1.450)/0.289 = **−1.345** on 5 df against t(.025,5) = 2.571.
  The seven points do not reject slope 1.451. Nor do they reject slope 1: 1.451
  and 1.000 both sit inside [0.319, 1.805], which is why seven points at R² 0.73
  settle nothing about the exponent.
- (b) the seven against the other 35, which are disjoint and therefore
  independent: t = **−0.807** on 38 df, crit 2.024. Indistinguishable.
- (c) Chow-style interaction on all 42, `ln(1/f) = a + b·thr + c·1{x>31} +
  d·1{x>31}·thr`: slope shift d = **0.248 (SE 0.921)**, t = 0.269 on 38 df. Not
  significant.

The 42-point law evaluated at the seven shared points has mean residual −0.369
and rms 0.417, against the 42-fit's own residual s = 0.650. So the seven points
sit *inside* the 42-point law's scatter, low but not anomalously low.

**Extending the seven, which is where 1.06 stops being interesting:**

```
  n | x up to | 2p/m̄ up to | slope | SE | 95% CI | R²
   7 |  31 | 2.297 | 1.062 | 0.289 | [0.319, 1.805] | 0.7298
   9 |  41 | 2.402 | 1.881 | 0.363 | [1.023, 2.739] | 0.7933
  11 |  47 | 2.703 | 1.648 | 0.292 | [0.987, 2.309] | 0.7796
  14 |  61 | 3.073 | 1.465 | 0.184 | [1.064, 1.866] | 0.8406
  18 |  79 | 3.402 | 1.842 | 0.257 | [1.295, 2.390] | 0.7624
  22 | 101 | 3.866 | 1.720 | 0.185 | [1.335, 2.106] | 0.8126
  26 | 113 | 4.424 | 1.733 | 0.149 | [1.422, 2.044] | 0.8493
  30 | 139 | 4.885 | 1.677 | 0.115 | [1.441, 1.913] | 0.8843
  34 | 163 | 5.198 | 1.592 | 0.093 | [1.402, 1.783] | 0.9008
  38 | 181 | 5.678 | 1.492 | 0.084 | [1.321, 1.662] | 0.8979
  42 | 199 | 6.019 | 1.450 | 0.076 | [1.298, 1.603] | 0.9020
```

Two more points move 1.062 to 1.881. That is the size of the sampling noise at
n = 7, stated as a fact rather than as a caveat.

## 4. The comb does not explain the difference (brief item 6)

The corpus attributes part of the gap to the 42 points carrying the comb
correction. Fitting the comb-corrected form on the seven shared points:

```
  all 42: ln(1/f) = 1.530 + 1.482·(2p/m̄) − 1.025·ln s(d_min)  R² 0.9639  SE(thr) 0.047
  seven : ln(1/f) = 1.209 + 1.161·(2p/m̄) − 0.062·ln s(d_min)  R² 0.7317  SE(thr) 0.669
  ln s(d_min) over the seven: 0.134, 0.000, 0.074, 0.693, 1.099, 1.138, 0.981
  ln s(d_min) over all 42   : 0.000 to 1.808
```

Adding the comb moves the seven-point slope from 1.062 to **1.161**, and the
42-point slope from 1.450 to 1.482. So the comb accounts for about 0.10 of the
0.39 difference and moves the 42-point end further away at the same time. It
does not close the gap. (The two comb-corrected slopes remain indistinguishable,
t = −0.479 on 4 df, but only because the seven-point SE has grown to 0.669: with
seven points and two regressors the comb term is unidentified, its coefficient
reading −0.062 against −1.025 on the full set.)

**So the clause "carry the comb correction below" is not a valid reason for the
difference.** The valid reason is that seven points over a threshold range of
[1.52, 2.30] carry almost no information about a slope.

## 5. Truncation is not the cause either

36 of the 42 census rows are truncated, all with x ≥ 31: the later qualifying
gaps are unaffordable, which removes positive mass and therefore overstates
ln(1/f) at large x only. Refitting with the **first qualifying term alone at
every x**, which makes the bias uniform instead of range-dependent:

```
  all 42, first term only: slope 1.436 (SE 0.076) R² 0.8999   against 1.450 summed
  the seven, first term  : slope 0.994 (SE 0.305) R² 0.6805   against 1.062 summed
  missing mass ln(f/f_first) over the seven: 0.0001, 0.1824, 0.0626, 0.1189, 0.0020, 0.0262, 0.0441
```

The 42-point slope moves by 0.014. a3-03 §4b's own claim that truncation is a
constant offset and not a trend is confirmed on the fit itself, not just on the
term shares.

## 6. The real finding: no single slope exists (the shape test nobody ran)

This is the part that is not in the corpus at all.

```
  RAW FIT, ln(1/f) on 2p/m̄
  lower half (21 pts, x 11..97) : slope 1.695 (SE 0.201) R² 0.7894
  upper half (21 pts, x 101..199): slope 0.906 (SE 0.181) R² 0.5684
  whole      (42 pts)            : slope 1.450 (SE 0.076) R² 0.9020
  halves differ: t = 2.92 on 38 df, crit 2.024 => NOT one straight line

  sliding window of 10 consecutive points
  window x | 2p/m̄ range | slope | SE | R²
  11..43  | [1.52, 2.50] | 1.925 | 0.304 | 0.834
  23..61  | [2.07, 3.07] | 1.479 | 0.376 | 0.659
  41..79  | [2.40, 3.40] | 1.871 | 0.856 | 0.374
  59..101 | [2.89, 3.87] | 1.325 | 0.851 | 0.233
  73..113 | [3.32, 4.42] | 2.074 | 0.634 | 0.572
  97..139 | [3.87, 4.88] | 0.737 | 0.360 | 0.345
  109..163| [4.01, 5.20] | 1.253 | 0.373 | 0.586
  137..181| [4.62, 5.68] | 1.112 | 0.567 | 0.325
  157..199| [5.14, 6.02] | 0.818 | 0.835 | 0.107

  quadratic: ln(1/f) = -1.002 + 2.661·thr − 0.160·thr²  R² 0.9172, t on thr² = -2.68 (crit 2.023)
```

The curvature is significant and negative: the local slope falls across the
range. And the comb correction, which is the one specification with R² 0.96,
does not repair it:

```
  COMB-CORRECTED, ln(1/f) on 2p/m̄ and ln s(d_min)
  lower half: thr 1.866 (SE 0.134), lnS -1.059 (SE 0.201), R² 0.9170
  upper half: thr 1.115 (SE 0.054), lnS -0.991 (SE 0.068), R² 0.9661
  all 42    : thr 1.482 (SE 0.047), lnS -1.025 (SE 0.125), R² 0.9639
  halves differ: t = 5.21 on 36 df, crit 2.03 => range-dependent even with the comb in
```

The comb *coefficient* is stable and equal to −1 in both halves, which is the
claim the corpus actually cares about and it survives. The threshold
*coefficient* is not stable: 1.87 at the low end, 1.12 at the high end. The
whole-range 1.482 is a chord across a curve, not a rate.

**What this costs downstream.** The extrapolation `f ≈ 2.3e−12 at x = 1000,
ln(1/f) ≈ 26.8, L ≈ 35.5 against ln²x = 47.7` is reproduced exactly with
b = 1.482. Re-anchoring the same comb form at the last exact point (x = 199,
ln(1/f) = 8.2346) and swapping in the two half-range slopes gives, at x = 1000:

```
  b = 1.482 (all 42)   : ln(1/f) = 26.81, f = 2.3e-12, L = 35.5
  b = 1.115 (upper half): ln(1/f) = 22.20, f = 2.3e-10, L = 42.9
  b = 1.866 (lower half): ln(1/f) = 30.88, f = 3.9e-14, L = 30.8
```

L stays below ln²x = 47.7 on all three, so the branch call is unaffected, which
is the honest and reassuring part. But the number 35.5 carries a range
sensitivity of roughly ±7 that is currently invisible.

## 7. The third fit is a different object (brief item 5)

`research/a3-09-histogram-operator.js` §7 fits

    ln(1/TAIL) = −0.235 + 1.2992·(2p′/m̄),  R² 0.99292, 31 points, p = 7..139

where **TAIL = P(gap ≥ 2p′)**, the unconditional gap tail at the diagonal
threshold. That is not f. f = P(gap ≡ 0, ±2 mod p), a comb of spacing 2p
starting at d_min = 2p ∓ 2, so f is the *comb-restricted* sub-tail. The x-axis
is the same variable, 2·nextprime(x)/m̄; the y is not.

At the 30 diagonal levels the two sets share:

```
  f/TAIL runs 0.200, 0.383, 0.351, 0.313, 0.327, 0.454, 0.313 at x = 11..31,
  then 0.142, 0.158, 0.173, 0.295, 0.228, 0.286, 0.204, 0.032, 0.033, 0.188,
  0.233, 0.297, 0.207, 0.092, 0.098, 0.062, 0.064, 0.138, 0.236, 0.098, 0.081,
  0.085, 0.187 at x = 37..139.
  regress ln(1/f) − ln(1/TAIL) on 2p/m̄ over those 30: slope 0.366 (SE 0.114), R² 0.270
```

The ratio is not constant, and the difference of the two log-quantities trends
with the threshold at 0.366 per unit, significantly non-zero. So the two are not
the same law up to an additive constant, and 1.2992 is not comparable with 1.062
or 1.451. Consistency check on the arithmetic, and it closes exactly: over those
same 30 levels the tail fit gives slope 1.311 (SE 0.020, R² 0.9935), and
1.311 + 0.366 = 1.677, which is the f slope on the same 30 levels to three
decimals (the n = 30 row of §3's table reads 1.677, SE 0.115). So
**ln(1/f) = ln(1/TAIL) + ln(TAIL/f)**, and the whole of the difference between
the tail's clean 1.30 and f's noisy 1.68 is the drift of the comb's share of the
tail. The three numbers hang together once the objects are kept apart.

Two further notes on the 31 points:

- The tail fit is by far the tightest of the three (R² 0.993, SE 0.020) and its
  own halves are close, 1.2992 on all 31 and 1.3550 on the last 23. Whatever is
  bending the f relation is in the comb restriction, not in the gap tail.
- The point count is **machine-dependent**. a3-09 stops when a level costs more
  than 33 s. On this machine it stopped at p = 139 after 75.6 s, giving 31
  points, which matches the record. A slower machine gives fewer. The "31" is
  not a property of the mathematics and should not be relied on as an identifier.

## 8. The prose that needs to change

The wave-3 restructure has moved §11 and §12's detail out of `research/U-FRAME.md`
into two child notes. Locations below are given by quoted text, in the file that
currently holds it.

**(a) `research/f-decays.md`, section "f decays, on 42 exact points". WRONG in
one clause, incomplete in another.**

> The 42 points span a far wider range and carry the comb correction below,
> while the seven points are the tile-verified end of the same relation, so the
> two are measurements of one law over different ranges rather than competing
> estimates of one slope.

Three defects. First, "carry the comb correction" is offered as a reason and is
not one: comb-correcting the seven moves them 1.062 to 1.161, not to 1.45.
Second, "the same relation" understates the position: the seven points *are*
seven of the 42, with f identical to 1e−16 on five of them and to four figures
on the two streamed ones, so this is one dataset and a nested subset, not two
measurements. Third, the sentence never says the difference is not statistically
detectable, which is the actual answer: the seven-point 95 percent interval is
[0.32, 1.81] and contains 1.451. Suggested replacement content, not wording: the
seven tile points are the first seven of these 42 and carry the same f, so the
1.06 and the 1.45 are one fit and a seven-point subfit rather than competing
measurements; the subfit's 95 percent interval is [0.32, 1.81] and contains
1.45, so the difference is sampling noise at n = 7; and the comb does not
account for it.

**(b) `research/f-decays.md`, same section. MISSING, and it is the stronger
statement.**

> Neither pins the exponent of the threshold law.

True but weaker than what the data now say. The halves of the raw fit differ at
t = 2.92, the quadratic term is significant at t = −2.68, and the
*comb-corrected* threshold coefficient still moves from 1.866 to 1.115 between
halves at t = 5.21. There is no stable slope at any specification. This should be
stated, because the sentence immediately following it presents 1.482 as a closed
form and then extrapolates 800-fold on it.

**(c) `research/f-decays.md`, the extrapolation sentence. NEEDS A RANGE
CAVEAT.**

> at x = 1000, f ≈ 2.3e−12, ln(1/f) ≈ 26.8, L ≈ 35.5 against ln²x = 47.7.

Reproduced exactly, so the number is right for the fit it uses. Refitting the
same form on either half of the range and re-anchoring at x = 199 gives L
between 30.8 and 42.9 at x = 1000. The branch call survives all three; the
number 35.5 should carry that band.

**(d) `research/operator-and-pair-count.md`, section "The tail at any level, and
the fit that goes with it". TWO defects, one stale and one substantive.**

> yields **31 exact diagonal tail points over a range of 20 in x** against the
> five U-FRAME §5a step 7 has from tiles.

Stale: §5a step 7 has **seven** tile points, not five, and has since a3-02's
streamed T₂₉ and T₃₁. The same "five" appears correctly a few lines above in
`research/f-decays.md` ("the five published diagonal values to about 1e−16"),
where it means the five folds a3-03 §3 checks at full precision, so only the
operator note's occurrence is wrong.

Substantive: the sentence sets 31 tail points against §5a's f points as if they
were the same measurement, and then quotes slope 1.2992 where §5a quotes 1.062.
They are different objects: `tail` is P(gap ≥ 2p′), f is the comb-restricted
P(gap ≡ 0, ±2 mod p). f/TAIL runs 0.03 to 0.45 and drifts with the threshold at
slope 0.366, so the slopes are not comparable. One clause naming the difference
fixes it.

**(e) `research/U-FRAME.md` §5a step 7. THE NUMBER IS RIGHT, THE HEADING IS
OVER-CLAIMED.**

> **MEASURED, on seven points: ln(1/f) tracks 2p/m̄ with slope 1.**

and

> Regressing ln(1/f) on 2p/m̄ over the seven points gives slope 1.062 and
> intercept 1.357 with R² 0.730

The regression is reproduced (1.062, 1.358, 0.7298 from the census f; 1.057,
1.364, 0.7350 from the three-figure tile f). But no uncertainty is stated, and
the interval is [0.32, 1.81]. "Tracks 2p/m̄ with slope 1" is not a measurement
that seven points can make: the same seven are equally consistent with 1.45, and
adding two more points moves the estimate to 1.88. The heading should say the
seven points are *consistent with* slope 1 and do not exclude 1.45, and the
regression line should carry SE 0.289. The paragraph's own next sentence, "Over
this range the comb noise is the same size as the decay, which is why five points
could not separate the branches", is exactly right and should be extended to
seven.

**(f) `research/operator-and-pair-count.md`, the transfer caution. A NUMBER
COLLISION WORTH FLAGGING, NOT AN ERROR.**

> the head's exponential rate is ≈ 1.06/m̄ against 1.2992/m̄ here

This 1.06 comes from `research/localized-04-maxsum.js` and is the localized
head's exponential tail rate. It is not §5a step 7's slope 1.062, which is a
coincidence of two digits between unrelated quantities. Both live in the same
corpus a few sections apart. Worth one word of disambiguation so a later reader
does not connect them.

## 9. What was not done, and why

- **`research/localized-04-maxsum.js` was not run.** Its 1.06 is the head's tail
  rate, not a fit of ln(1/f) on 2p/m̄, so it is not a fourth estimate of this
  slope and running it would not have added a point set. The reason it is not
  the same object is stated in §7 and (f) above and was established by reading
  the script's own definition, not by running it.
- **No f point beyond x = 199 was computed.** a3-03's own cost model puts
  x = 1000 at count(2016), about 4·10⁴¹ terms. The range dependence found in §6
  therefore cannot be resolved by more data on this route, which is itself the
  reason it matters.
- **No correction was applied to any corpus file.** This partition is read-only
  on `research/` and `paper/` by its brief; §8 lists the sentences for whoever
  owns them.
- **The tail fit's within-level cross-check ("cross-checked within each level to
  3%") was not re-verified.** a3-09 §8 does it and the section was regenerated,
  but it was outside this partition's question.

---

## Appendix: the analysis code

Run after the three regenerations above, reading their stdout. Full file kept
at the partition scratchpad; the load-bearing parts inline:

```js
// OLS with standard errors; X columns include the intercept.
function ols(X, y) {
  const n = y.length, k = X[0].length;
  const A = []; for (let a = 0; a < k; a++) A.push(new Array(k + 1).fill(0));
  for (let i = 0; i < n; i++) for (let a = 0; a < k; a++) {
    for (let b = 0; b < k; b++) A[a][b] += X[i][a] * X[i][b];
    A[a][k] += X[i][a] * y[i];
  }
  const M = []; for (let a = 0; a < k; a++) M.push(A[a].slice(0, k));
  const aug = M.map((r, i) => r.concat(Array.from({length: k}, (_, j) => i === j ? 1 : 0)));
  for (let c = 0; c < k; c++) {
    let piv = c; for (let r = c + 1; r < k; r++) if (Math.abs(aug[r][c]) > Math.abs(aug[piv][c])) piv = r;
    [aug[c], aug[piv]] = [aug[piv], aug[c]];
    const d = aug[c][c]; for (let j = 0; j < 2 * k; j++) aug[c][j] /= d;
    for (let r = 0; r < k; r++) { if (r === c) continue; const f = aug[r][c];
      for (let j = 0; j < 2 * k; j++) aug[r][j] -= f * aug[c][j]; }
  }
  const inv = aug.map(r => r.slice(k));
  const beta = new Array(k).fill(0);
  for (let a = 0; a < k; a++) for (let b = 0; b < k; b++) beta[a] += inv[a][b] * A[b][k];
  let ssr = 0, sst = 0; const mn = y.reduce((s, v) => s + v, 0) / n;
  for (let i = 0; i < n; i++) { let yh = 0; for (let a = 0; a < k; a++) yh += beta[a] * X[i][a];
    ssr += (y[i] - yh) ** 2; sst += (y[i] - mn) ** 2; }
  const df = n - k, s2 = ssr / df;
  return { beta, se: beta.map((_, a) => Math.sqrt(s2 * inv[a][a])), r2: 1 - ssr / sst, n, df, s: Math.sqrt(s2) };
}
const lin = (xs, ys) => ols(xs.map(v => [1, v]), ys);

// the singular-series comb, recomputed rather than read from a3-03's output
const rho = (q, d) => d % q === 0 ? q - 2 : (d % q === 2 || d % q === q - 2 ? q - 3 : q - 4);
function lnS(x, d) { let s = 0; for (const q of PR) { if (q > x) break; if (q >= 5) s += Math.log(rho(q, d) / (q - 4)); } return s; }

// C = the 42 census rows {x, p, dmin, mbar, thr = 2p/mbar, f, L = ln(1/f)} parsed
//     from a3-03 section 4; T = the 7 tile rows from a3-02 phases D and E;
//     H = the 31 tail rows {p, thr, tail, L = ln(1/tail)} from a3-09 section 7.
const SH  = T.map(t => C.find(r => r.x === t.x));          // the shared support
const f7  = lin(SH.map(r => r.thr), SH.map(r => r.L));     // 1.062
const f42 = lin(C.map(r => r.thr),  C.map(r => r.L));      // 1.450
const rest = C.filter(r => !T.some(t => t.x === r.x));     // the disjoint 35

// (a) does the seven reject the 42-point slope?
const t1 = (f7.beta[1] - f42.beta[1]) / f7.se[1];                       // -1.345, crit 2.571
// (b) disjoint split, so independent
const fR = lin(rest.map(r => r.thr), rest.map(r => r.L));
const t2 = (f7.beta[1] - fR.beta[1]) / Math.hypot(f7.se[1], fR.se[1]);  // -0.807, crit 2.024
// (c) Chow interaction on all 42
const D = C.map(r => T.some(t => t.x === r.x) ? 0 : 1);
const chow = ols(C.map((r, i) => [1, r.thr, D[i], D[i] * r.thr]), C.map(r => r.L));
// chow.beta[3] = 0.248, se 0.921

// comb-corrected, seven versus 42
for (const r of C) r.lnS = lnS(r.x, r.dmin);
const c7  = ols(SH.map(r => [1, r.thr, r.lnS]), SH.map(r => r.L));  // thr 1.161, lnS -0.062
const c42 = ols(C.map(r => [1, r.thr, r.lnS]),  C.map(r => r.L));   // thr 1.482, lnS -1.025

// the shape test: halves, sliding windows, curvature
const half = C.length >> 1;
const lo = lin(C.slice(0, half).map(r => r.thr), C.slice(0, half).map(r => r.L));   // 1.695
const hi = lin(C.slice(half).map(r => r.thr),   C.slice(half).map(r => r.L));       // 0.906
const tHalf = (lo.beta[1] - hi.beta[1]) / Math.hypot(lo.se[1], hi.se[1]);           // 2.92
const quad = ols(C.map(r => [1, r.thr, r.thr * r.thr]), C.map(r => r.L));           // t on thr^2 = -2.68
const cLo = ols(C.slice(0, half).map(r => [1, r.thr, r.lnS]), C.slice(0, half).map(r => r.L)); // 1.866
const cHi = ols(C.slice(half).map(r => [1, r.thr, r.lnS]),   C.slice(half).map(r => r.L));     // 1.115

// truncation: refit on the first qualifying term alone at every x
// r.f1 comes from a3-03 section 4b's per-row term lists; equals r.f on one-term rows
const fTr = lin(C.map(r => r.thr), C.map(r => Math.log(1 / r.f1)));                 // 1.436

// the third object: is ln(1/f) - ln(1/TAIL) flat in the threshold?
const pair = C.map(c => [c, H.find(h => h.p === c.x)]).filter(a => a[1]);           // 30 levels
const diff = lin(pair.map(a => a[0].thr), pair.map(a => a[0].L - a[1].L));          // slope 0.366, se 0.114
```
