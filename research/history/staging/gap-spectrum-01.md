# The gap spectrum of the twin-slot tile, the excess-length functional, and the empirical sifting curve

<!-- ledger
id: Q-gap-spectrum
status: ANSWERED
todo: 0
question: What is the full gap-length distribution of twin slots over one period of the tile, what does the excess functional |B_N| = sum_{g>N}(g-N) read on an x^s grid, and where does the empirical minimum window count leave zero?
verdict: The distribution is exact at nine levels to x = 31 and the pre-registered renewal null FAILS in the light direction at every one: the tail is uniformly steeper than exponential (body slope -1.3302 against -1), no power law survives (the power-law slope moves by a factor 17), the maximum is 2.087 to 2.241 BELOW the renewal maximum, and |B_N| sits at 0.0245 to 0.7436 of the null and is exactly zero at s = 1.75 where the null predicts 6.5262e+5 empty windows; so no heavy-tail mechanism for a super-linear G2 exponent exists at any computable level, the identity G2 <= N + |B_N| is proven but degenerates to G2 <= N on this grid, and the sifting onset is flat at 1.63 to 1.70 against a sieve bound f2 that is zero everywhere the grid reaches.
-->

*2026-08-28. Producer: `research/gap-spectrum-01.js`, formally embedded.
Legend as in `research/sift-limit-attack.md`: **[PROVEN]** derived here;
**[VERIFIED]** checked computationally here; **[MEASURED]** empirical, finite
range; **[INFERRED]** deduction from sourced facts.*

---

## 0. Price, and what already existed

**Price, written before the run** (Chris's compute rule; scan cost of the tile,
`W = x#` positions). The engine walks the mod-6 wheel, so it touches `W/6`
cells per level:

| level | `W = x#` | cells `W/6` | slots `D_x` |
|---|---|---|---|
| @19 | 9,699,690 | 1.6e6 | 378,675 |
| @23 | 223,092,870 | 3.7e7 | 7,952,175 |
| @29 | 6,469,693,230 | 1.08e9 | 214,708,725 |
| @31 | 200,560,490,130 | 3.34e10 | 6,226,553,025 |
| @37 | 7,420,738,134,810 | 1.24e12 | OUT OF BUDGET |

@29 is minutes and @31 is priced here at roughly an hour by the corpus's own
segmented precedent (`G2-STATE.md` §2: `G2(31#)` came from a segmented walk over
2.0e11 positions in about 80 minutes). @37 is out. The measured runtimes are in
§6.

**What already existed in the corpus, checked before writing anything.** Neither
object is on disk. Two partial overlaps, both named so the novelty claim stays
small:

- The **tail-count profile** `N(theta) = #{i : g_i >= theta}` is already an
  object here — `research/attack-foldL-03-transport.js` computes it, but at
  three thresholds (60, 120, 180) and as an input to the Tail-Count Transport,
  not as a distribution. Its shape was never read.
- `maxsum_m`, the scan statistic, is tabulated at `T_23`, `T_29`, `T_31` on the
  grid m in {1,2,3,4,6,8,12,16,24,32,48,64}
  (`history/staging/scanstat2.md`). §5's empirical sifting curve is an exact
  re-encoding of that object — see the identity in §5.1 — so §5 is a
  reparametrisation of a known instrument onto a new grid, not a new
  measurement in kind.

Nothing in the corpus carries the gap histogram, the excess functional, or the
min-count-over-mean curve.

---

## 1. PRE-REGISTRATION — the renewal null, written before any number

The null is fixed here, analytically, before the producer was run. Only its
evaluation is a measurement.

**The null.** `D = D_x` gaps, i.i.d. Exponential with mean `mbar = W/D`,
conditioned to sum to `W`. (The conditioning is negligible at every level
computed: the relative correction is `O(1/D)` and `D >= 15`.)

**N1 — tail counts.** `#{g > t} = D * exp(-t/mbar)`, so
`ln(#{g>t}/D) = -t/mbar`: on the abscissa `t/mbar` the log-tail slope is
exactly **-1**, at every level, with no free parameter.

**N2 — the excess functional.**
`|B_N| = sum_{g>N}(g-N) = D * integral_N^inf exp(-u/mbar) du / mbar * mbar`
`= D * mbar * exp(-N/mbar) = W * exp(-N/mbar)`. So the null's prediction is
**`|B_N|/W = exp(-N/mbar)`**, and
**`beta'_null(s) = (ln W - x^s/mbar)/ln x`** with `N = x^s`.

**N3 — the maximum.** `G2_null = mbar * ln D`, the renewal extreme value.

**Bands for a hold.** A tail point HOLDS if the measured count sits within a
factor 2 of N1's prediction (`|ln ratio| <= ln 2`) and the deviation is under
`3*sqrt(count)` in Poisson terms; the two are quoted separately because at the
far tail the counting error dominates and in the body the factor does. A
`beta'(s)` point HOLDS if `|beta'_measured - beta'_null| <= ln 2 / ln x`, i.e.
the same factor-2 band carried through the logarithm.

**The direction the null is expected to fail in, and the tension in that
expectation — both registered.** The task's framing is that a `G2` exponent
above the renewal value 1 requires a tail HEAVIER than renewal, so N1 should
fail with slope shallower than -1 and N2 with an excess at large `N`. The
corpus's own arithmetic points the other way at every level in reach: N3 gives
`G2_null = mbar * ln D`, which at @29 is `30.1324 * 19.185 = 578.1` against a
true `G2(29#) = 258` (`G2-STATE.md` §2), a factor **2.241 BELOW** the null, and
at @31 `32.2105 * 22.552 = 726.4` against `348`, a factor **2.087 below**. So the
registered primary prediction here is the arithmetic one:

> **P1 [registered].** The far tail is LIGHTER than exponential and carries a
> visible cut-off near `G2`; the log-tail slope steepens (goes below -1) as `t`
> grows, and `|B_N|` sits BELOW `W*exp(-N/mbar)` at every `N` above about
> `4*mbar`.
>
> **P2 [registered].** The two statements are not in conflict, and the
> resolution is that the exponent 1.50 is an asymptotic fit contaminated by log
> factors (`G2-STATE.md` §3b calls the fits untrustworthy for exactly this
> reason): renewal's own `G2 ~ mbar*ln D ~ 2.40 ln^2(x) * theta(x)` is already
> exponent 1 times `ln^2 x`, and at x <= 31 the log factors are the whole
> signal. If P1 holds, the correct reading is that the tail is NOT the place a
> super-linear `G2` exponent could come from at these levels, and any
> heavier-than-renewal behaviour must appear asymptotically or not at all.
>
> **What would falsify P1.** A slope above -1 in the top decade of counts, or
> `|B_N|` above the null at large `N`, at any level. That check runs in §4.

**What a systematic failure would mean, at its rung.** A measured deficit
against the null is [MEASURED] over `x <= 31` and says nothing about the
asymptotic exponent; it is a statement about nine levels. A measured EXCESS at
large `N` would be the first direct evidence in the corpus for the tail
mechanism the 1.50 exponent would need, and would still be [MEASURED], not a
route.

---

## 2. The identity `G2 <= N + |B_N|` [PROVEN]

> **Lemma.** Let the twin slots of `T_x` be `p_0 < p_1 < ... < p_{D-1}` in
> `[0, W)`, cyclically, with gaps `g_i = p_{i+1} - p_i` (indices mod `D`, the
> last gap wrapping through `W`). For any integer `N >= 1`,
>
> **`|B_N| := sum_i max(0, g_i - N) = #{s in [0,W) : [s, s+N) holds no slot}`,**
>
> and consequently **`G2(x#) <= N + |B_N|` for every `N`**, with equality of the
> two sides exactly when at most one gap exceeds `N`.

*Proof.* A window `[s, s+N)` holds no slot iff it lies strictly between two
consecutive slots, i.e. iff there is an `i` with `p_i < s` and `s + N <= p_{i+1}`,
which pins `s` to the `max(0, g_i - N)` values `p_i + 1, ..., p_i + g_i - N`.
Distinct `i` give disjoint sets of `s` and every empty window arises this way,
so the count is the sum. For the consequence: let `g* = G2` be the largest gap.
If `g* <= N` then `G2 <= N <= N + |B_N|`. If `g* > N` then the single term
`i = argmax` already gives `|B_N| >= g* - N`, so `G2 = g* <= N + |B_N|`. The
equality case is the statement that no second term contributes. QED

The identity is elementary and is recorded because it makes `|B_N|` a
*certificate object*: any upper bound on the number of empty windows of length
`N` is an upper bound on `G2 - N`, with no sieve in it. Its cost is stated
plainly in §4: `|B_N|` is only small when `N` is already close to `G2`, so the
identity converts a good bound and not a cheap one.

---

## 3. The gap spectrum

**The caveat first.** Everything below is [MEASURED] over `x <= 31`, nine
levels, and the whole reading is about a regime in which `max/mean` has only
reached 9 and the distribution has not converged to anything. Nothing here
constrains the asymptotic `G2` exponent, and §3d says so in the one place a
reader might think otherwise.

### 3a. The summary, and where it sits against the null

Every gap is a multiple of 6, the number of gaps is `D_x` and their sum is `W`,
both asserted rather than fitted; the maximum is asserted equal to the ladder's
`G2(x#)` at every level and matches at all nine. The four shape statistics:

| x | #gaps `D` | mean `= W/D` | max `= G2` | max/mean | ln D | sd/mean | skew |
|---|---|---|---|---|---|---|---|
| 13 | 1,485 | 20.2222 | 66 | 3.264 | 7.303 | 0.5950 | 1.109 |
| 17 | 22,275 | 22.9185 | 108 | 4.712 | 10.011 | 0.6364 | 1.378 |
| 19 | 378,675 | 25.6148 | 150 | 5.856 | 12.844 | 0.6700 | 1.522 |
| 23 | 7,952,175 | 28.0543 | 204 | 7.272 | 15.889 | 0.6939 | 1.579 |
| 29 | 214,708,725 | 30.1324 | 258 | 8.562 | 19.185 | 0.7116 | 1.607 |
| 31 | 6,226,553,025 | 32.2105 | 348 | 10.804 | 22.552 | 0.7270 | 1.626 |

The renewal null has `sd/mean = 1`, `skew = 2` and `max/mean = ln D` exactly.
The tile is **under-dispersed** against renewal at every level and closing
slowly (0.5950 to 0.7270 over six levels), and its maximum is a factor 2.087 to
2.241 short of renewal's rather than equal to it — a ratio that is flat, not
drifting, over x = 13..31. The modal gap is **12 at every
level**, not 6: two twin slots six apart are rarer than two twelve apart, which
is the alternation constraint showing up in the first bin.

### 3b. The tail, read before anything is fitted

The three candidate shapes and the statistic that separates them are printed in
the producer's §1d. What the tail counts say, at @29, on the `t/mbar` grid:

| t/mbar | `#{g > t}` | measured/D | null `exp(-t/mbar)` | meas/null |
|---|---|---|---|---|
| 0.50 | 150,519,600 | 7.01041e-1 | 6.06531e-1 | 1.1558 |
| 1.00 | 69,421,588 | 3.23329e-1 | 3.67879e-1 | 0.8789 |
| 2.00 | 17,692,114 | 8.24005e-2 | 1.35335e-1 | 0.6089 |
| 3.00 | 3,661,622 | 1.70539e-2 | 4.97871e-2 | 0.3425 |
| 4.00 | 812,930 | 3.78620e-3 | 1.83156e-2 | 0.2067 |
| 5.00 | 88,988 | 4.14459e-4 | 6.73795e-3 | 0.0615 |
| 6.00 | 6,758 | 3.14752e-5 | 2.47875e-3 | 0.0127 |
| 7.00 | 166 | 7.73140e-7 | 9.11882e-4 | 0.0008 |
| 8.00 | 2 | 9.31495e-9 | 3.35463e-4 | 0.0000 |
| 9.00 | 0 | 0.00000e+0 | 1.23410e-4 | 0 |

The same at @31, which resolves three more decades because `D` is 29 times
larger: `#{g>t}` = 2,219,321,470 / 636,577,674 / 119,983,472 / 31,805,298 /
4,438,018 / 266,574 / 20,388 / 2,126 / 218 / 38 / 0 at
`t/mbar` = 1 / 2 / 3 / 4 / 5 / 6 / 7 / 8 / 9 / 10 / 12, with `meas/null`
= 0.9689 / 0.7554 / 0.3870 / 0.2789 / 0.1058 / 0.0173 / 0.0036 / 0.0010 /
0.0003 / 0.0001 / 0.

**The ratio to the null is monotone decreasing across the whole tail** and falls
by four orders of magnitude between `t = mbar` and `t = 7*mbar`. The tail is
lighter than exponential, everywhere above the mean.

### 3c. The shape verdict: sub-exponential, no power law, and a far tail that
### steepens and then relaxes

The log-tail slope in units of `t/mbar`, over the range where the count exceeds
100, by decade of tail fraction. Renewal's value is `-1` in the left column at
every decade; a power law would hold the RIGHT column fixed.

@29 (36 qualifying points, `t/mbar` 0.20 to 7.17) and @31 (50 points, 0.19 to
9.31):

| decade of `#{g>t}/D` | @29 slope | @29 power-law slope | @31 slope | @31 power-law slope |
|---|---|---|---|---|
| 1e0..1e-1 | -1.3638 | -0.973 | -1.3302 | -0.961 |
| 1e-1..1e-2 | -1.4672 | -3.872 | -1.4748 | -3.900 |
| 1e-2..1e-3 | -1.3558 | -5.360 | -1.9839 | -8.062 |
| 1e-3..1e-4 | -1.9567 | -9.701 | -2.3766 | -12.347 |
| 1e-4..1e-5 | -2.6486 | -15.516 | -2.6126 | -15.836 |
| 1e-5..1e-6 | -2.8664 | -18.816 | -2.3992 | -16.510 |
| 1e-6..end | (fewer than 3 points) | | -1.9126 | -15.944 |

**Power law: refuted at both levels.** The right column moves by a factor 19
(@29, -0.973 to -18.816) and 17 (@31, -0.961 to -15.944), monotonically. No
constant fits it and no fit was attempted.

**Exponential: refuted, in the steep direction.** The left column sits at -1.33
to -1.36 in the body — already a third steeper than renewal — and never returns
to -1.

**The cut-off reading is the surviving one, and it is NOT clean.** The slope
steepens to -2.8664 (@29) and -2.6126 (@31) and then **relaxes**: at @31 the
last two decades read -2.3992 and -1.9126, back toward the body value, over 16 points
spanning `t/mbar` 6.52 to 9.31. So "the local slope steepens without bound as
`t -> G2`" — the cut-off signature as stated — is **not** what the deepest level
shows. What @31 shows is a tail that is uniformly steeper than exponential, is
steepest around `t/mbar` ~ 6, and then flattens over the last stretch before the
hard endpoint at `max/mean = 10.804`. @29 cannot resolve that stretch (2 gaps
above `8*mbar`); @31 has 2126. **The flattening is a one-level observation and
is [MEASURED] at one level only** — it is exactly the kind of finding this file
should NOT bank, and it is written here so the next level can check it rather
than rediscover it.

The whole-range OLS slope, which averages over all of the above and should not
be read as a shape parameter: **-1.5484 (@13), -1.7251 (@17), -1.6988 (@19),
-1.7871 (@23), -1.9448 (@29), -2.0283 (@31)**, on `R^2` between 0.969 and 0.992,
steepening with the level at every step but one.

### 3d. What this does NOT say

The pre-registered tension in §1 resolves in the direction the arithmetic
predicted and **against** the task's framing: the tail at `x <= 31` is lighter
than renewal, not heavier, so the super-linear `G2` exponent that a fit over 22
ladder terms reads (1.50 +/- 0.05 stat, `G2-STATE.md` §3a, with the control
caveat of §3b) is **not** coming from a heavy gap tail at these levels. It
cannot be: the maximum is a factor 2.087 (@31) to 2.241 (@29) BELOW the renewal
maximum and the tail above it is empty. Either the heavy behaviour is asymptotic and invisible below
x = 31, or the 1.50 is log-factor contamination of an exponent that is really 1.
**This measurement does not separate those two and is not evidence for either.**
What it does establish, at [MEASURED], is that no route through "the gap
distribution is heavy-tailed at computable levels" exists, because it is not.

---

## 4. The excess functional

**The caveat first.** `|B_N|` collapses to exactly 0 at `s = 1.75` at every
level from x = 13 up, because `G2 < x^1.75` at every level from x = 13 up. So
the `s`-grid the brief fixed resolves the functional at **three points**
(s = 1.00, 1.25, 1.50) and reads `-inf` at the other four. The exponent
`beta'(s)` is therefore a three-point object on this grid — at @31 it reads
7.2119 / 6.6596 / 4.9341 and then `-inf` — and no trend in `s` can be fitted
from it. That is a property of the grid against this tile, not a
defect of the run, and it is itself the first finding.

### 4a. The table, @31 and @29, with the null beside it

`N = round(x^s)`; `beta'(s) = ln|B_N| / ln x`; the null is `W*exp(-N/mbar)` from
§1 N2; HOLD means within a factor 2 of the null.

| s | N | `\|B_N\|` | `\|B_N\|/W` | `beta'(s)` | null `\|B_N\|` | null `beta'` | meas/null | hold? |
|---|---|---|---|---|---|---|---|---|
| 1.00 | 29 | 1,809,313,450 | 2.7966e-1 | 6.3304 | 2.4712e+9 | 6.4230 | 0.7322 | HOLD |
| 1.25 | 67 | 272,871,576 | 4.2177e-2 | 5.7686 | 7.0020e+8 | 6.0484 | 0.3897 | FAIL |
| 1.50 | 156 | 936,720 | 1.4479e-4 | 4.0834 | 3.6515e+7 | 5.1713 | 0.0257 | FAIL |
| 1.75 | 362 | 0 | 0 | -inf | 3.9213e+4 | 3.1410 | 0 | FAIL |
| 2.00 | 841 | 0 | 0 | -inf | 4.8940e-3 | -1.5798 | 0 | HOLD |
| 2.25 | 1952 | 0 | 0 | -inf | 4.7530e-19 | -12.5294 | 0 | HOLD |
| 2.50 | 4529 | 0 | 0 | -inf | 3.4278e-56 | -37.9274 | 0 | HOLD |

And @31, the deepest level:

| s | N | `\|B_N\|` | `\|B_N\|/W` | `beta'(s)` | null `\|B_N\|` | null `beta'` | meas/null | hold? |
|---|---|---|---|---|---|---|---|---|
| 1.00 | 31 | 56,965,647,110 | 2.8403e-1 | 7.2119 | 7.6608e+10 | 7.2982 | 0.7436 | HOLD |
| 1.25 | 73 | 8,548,548,018 | 4.2623e-2 | 6.6596 | 2.0796e+10 | 6.9185 | 0.4111 | FAIL |
| 1.50 | 173 | 22,832,300 | 1.1384e-4 | 4.9341 | 9.3258e+8 | 6.0144 | 0.0245 | FAIL |
| 1.75 | 407 | 0 | 0 | -inf | 6.5262e+5 | 3.8989 | 0 | FAIL |
| 2.00 | 961 | 0 | 0 | -inf | 2.2135e-2 | -1.1097 | 0 | HOLD |
| 2.25 | 2268 | 0 | 0 | -inf | 5.2820e-20 | -12.9259 | 0 | HOLD |
| 2.50 | 5351 | 0 | 0 | -inf | 1.4279e-61 | -40.7985 | 0 | HOLD |

The same at @23: `|B_N|` = 77,938,280 / 17,672,652 / 471,508 at s = 1.00 / 1.25
/ 1.50, `beta'` = 5.7954 / 5.3221 / 4.1664, `meas/null` = 0.7931 / 0.4708 /
0.1066, and 0 from s = 1.75 on. The last three HOLDs in the table are vacuous:
the null itself is below 1 there, so both sides are zero and the band is met by
arithmetic rather than by agreement.

### 4b. The direction of the failure, which is the reading

**The deficit is systematic, monotone in `s`, and grows with the level.**
`meas/null` at s = 1.00, 1.25, 1.50 reads 0.7931 / 0.4708 / 0.1066 at @23,
0.7322 / 0.3897 / 0.0257 at @29 and 0.7436 / 0.4111 / 0.0245 at @31 — the same
shape at every level, and **flat rather than deepening between @29 and @31**,
which is the one place a trend could have been read and is not there. At
`s = 1.75` the null still predicts 3.9213e+4 empty windows at @29 and 6.5262e+5 at @31,
and the truth is **exactly zero** at both.
This is the excess functional saying what §3c said in the tail-count basis: the
tile's long gaps are rarer than renewal's, by a factor that grows with `N`.

At its rung, this is [MEASURED] over five resolvable levels and says nothing
about the exponent. Its content is negative and specific: **`|B_N|` gives no
room above the renewal prediction anywhere it can be measured**, so the
mechanism a super-linear `G2` exponent would need is not visible in the excess
functional at `x <= 31` either.

### 4c. The price of the identity `G2 <= N + |B_N|`

The identity of §2 is exact and unconditional, so it is worth asking what it
would certify if `|B_N|` were known. On this grid, the best `N + |B_N|` over the
seven `s` values:

| x | best `N + \|B_N\|` | at N | `G2` | ratio to `G2` |
|---|---|---|---|---|
| 13 | 89 | 89 | 66 | 1.3485 |
| 17 | 142 | 142 | 108 | 1.3148 |
| 19 | 173 | 173 | 150 | 1.1533 |
| 23 | 242 | 242 | 204 | 1.1863 |
| 29 | 362 | 362 | 258 | 1.4031 |
| 31 | 407 | 407 | 348 | 1.1695 |

**The optimum is always attained at the smallest grid `N` with `|B_N| = 0`**,
i.e. the identity degenerates to `G2 <= N` and buys nothing beyond the empty
window it was already given. That is the honest price: `|B_N|` is only small
when `N` is already past `G2`, so the identity converts a bound that is already
good and never manufactures one. It is a certificate object, not a route, and
recording it that way is the point of §2.

---

## 5. The empirical sifting curve

**The caveat first, twice.** (i) This object is not new in kind — see §5.1 — it
is the corpus's own `maxsum_m` on a different grid. (ii) The comparison with
`f_2(s)` is a comparison against zero: `f_2(s) = 0` for every `s <= 4.26645`,
and the whole grid stops at `s = 2.5`. So §5 does not test the sieve bound; it
measures how far the truth sits above a bound that is vacuous, which is the
Face-4 question restated and not answered.

### 5.1 The object is the scan statistic, exactly [PROVEN]

> With `mincount(N) = min_{s in [0,W)} #{slots in [s, s+N)}` and
> `maxsum_m = max_i (p_{i+m} - p_i)`,
> **`mincount(N) = max{m >= 0 : maxsum_m <= N}`**.

*Proof.* `mincount(N) >= m+1` iff every length-`N` window holds at least `m+1`
slots, iff no `m+1` consecutive gaps span more than `N`, iff
`maxsum_{m+1} <= N`. QED. In particular `mincount(N) >= 1` iff `N >= G2`, the
`m = 1` case, which is the gate §3's `|B_N| = 0` edge also enforces. So §5 is a
reparametrisation of `history/staging/scanstat2.md`'s instrument onto the `x^s`
grid, and the novelty claim here is the grid and the min/mean normalisation,
nothing more.

### 5.2 The curve

`mean count = N*D/W`. `f_2` and `f_1` are the DHR `kappa = 2` and `kappa = 1`
retention functions, solved here and validated against the `kappa = 1` closed
forms.

@31 (`D` = 6,226,553,025, `G2` = 348, `ln G2 / ln x` = 1.7042):

| s | N | mincount | mean count | min/mean | `f_2(s)` | `f_1(s)` |
|---|---|---|---|---|---|---|
| 1.00 | 31 | 0 | 0.9624 | 0.0000 | 0 | 0 |
| 1.25 | 73 | 0 | 2.2663 | 0.0000 | 0 | 0 |
| 1.50 | 173 | 0 | 5.3709 | 0.0000 | 0 | 0 |
| 1.75 | 407 | 1 | 12.6356 | 0.0791 | 0 | 0 |
| 2.00 | 961 | 14 | 29.8350 | 0.4692 | 0 | 0 |
| 2.25 | 2268 | 51 | 70.4118 | 0.7243 | 0 | 0.353 |
| 2.50 | 5351 | 141 | 166.1259 | 0.8488 | 0 | 0.578 |

@29 (`D` = 214,708,725, `G2` = 258, `ln G2 / ln x` = 1.6491):

| s | N | mincount | mean count | min/mean | `f_2(s)` | `f_1(s)` |
|---|---|---|---|---|---|---|
| 1.00 | 29 | 0 | 0.9624 | 0.0000 | 0 | 0 |
| 1.25 | 67 | 0 | 2.2235 | 0.0000 | 0 | 0 |
| 1.50 | 156 | 0 | 5.1771 | 0.0000 | 0 | 0 |
| 1.75 | 362 | 2 | 12.0136 | 0.1665 | 0 | 0 |
| 2.00 | 841 | 15 | 27.9101 | 0.5374 | 0 | 0 |
| 2.25 | 1952 | 49 | 64.7807 | 0.7564 | 0 | 0.353 |
| 2.50 | 4529 | 130 | 150.3032 | 0.8649 | 0 | 0.578 |

@23: mincount 0 / 0 / 0 / 2 / 8 / 29 / 77 on the same grid, min/mean 0 / 0 / 0 /
0.2319 / 0.4243 / 0.7026 / 0.8515. @19: 0 / 0 / 0 / 1 / 7 / 21 / 51, min/mean 0
/ 0 / 0 / 0.1481 / 0.4967 / 0.7134 / 0.8300.

Three anchors off the grid. At @31: `N = G2 - 1 = 347` gives mincount 0;
`N = G2 = 348` gives mincount 1 with min/mean 0.0926; `N = 2*G2 = 696` gives
mincount 9, min/mean 0.4165; `N = 4*G2 = 1392` gives mincount 26, min/mean
0.6016. At @29: `N = 257` gives 0; `N = 258` gives 1 with min/mean 0.1168;
`N = 516` gives 5, min/mean 0.2920; `N = 1032` gives 20, min/mean 0.5840. **The `N = G2` column carries no information beyond §3a**: mincount is 1
there by definition, so min/mean is exactly `mbar/G2`, the reciprocal of the
max/mean column. It is printed so that nobody reads it as a second measurement.
The `2*G2` and `4*G2` rows are real: the worst window still sits at 29% and 58%
of its mean at @29, and 42% and 60% at @31, at two and four times the maximal
gap. Those two levels do not agree closely enough at `2*G2` (0.2920 against
0.4165) for a trend to be claimed from them.

### 5.3 The onset, and the barrier restated

`mincount(N) > 0` exactly when `N >= G2`, so the onset exponent is
`ln G2 / ln x` by identity, not by measurement:

| x | `ln G2 / ln x` | first grid `s` with mincount > 0 | min/mean there |
|---|---|---|---|
| 13 | 1.6334 | 1.75 | 0.2272 |
| 17 | 1.6526 | 1.75 | 0.1614 |
| 19 | 1.7017 | 1.75 | 0.1481 |
| 23 | 1.6961 | 1.75 | 0.2319 |
| 29 | 1.6491 | 1.75 | 0.1665 |
| 31 | 1.7042 | 1.75 | 0.0791 |

The onset is **flat at 1.63 to 1.70 over six levels** (1.5440 and 1.5587 at the
two smallest, x = 5 and 11, sit below that band) and shows no drift; the
`s`-grid is too coarse to resolve it (every level's first positive entry is the
same grid point) and the exact column beside it is the one to read. Two
reference lines sit above it: `beta_1 = 2`, the proven one-class sifting limit,
and `beta_2 = 4.26645`, the proven two-class one. The truth is below both, at
about 1.65, and the min/mean ratio at the first grid point past the onset is
0.0791 to 0.2319, the smallest value at the deepest level.

**The barrier, in one line.** `f_2(s) = 0` on the entire grid this file can
reach, so the sieve's lower bound on the worst window is *zero* exactly where
the measured worst window is a sixth of its mean and rising. The distance
between "the sieve proves 0" and "the tile delivers 0.0791" at `s = 1.75`, @31,
is the whole of the Face-4 gap, and this run measures its size at five levels without
narrowing it by anything. Nothing here is a route; the exponent gap 4.26645
against 2 is untouched.

---

## 6. Custody, runtimes, and what this does not say

### 6a. Custody

One producer, `research/gap-spectrum-01.js`, formally embedded
(`node research/qc/embed.js --timeout 3600 research/gap-spectrum-01.js`; 744
lines of output, 1322.1 s, code-sha256 `f0adb3ad63c5dbdd…`, out-sha256
`74304758d757e03c…`). **Assertion failures: 0.** No number in this note was
typed from a run that is not the embedded one.

The gates, each of which aborts: the slot count against `prod(p-2)` = A059861;
the gap count against `D`; the sum of gaps against `W` exactly; the maximum
against the exact ladder `G2(x#)` (`G2-STATE.md` §2), which is the strongest
gate here because it is an independent object computed by a different engine;
every gap `0 mod 6`; the histogram's first moment against `W`; `|B_{G2}| = 0`
and `|B_{G2-1}|` equal to the maximum gap's multiplicity; `mincount(G2-1) = 0`
and `mincount(G2) >= 1`; the ring buffer never overrun; and, for the sieve
column, the DHR `kappa = 1` closed forms `F = 2e^g/u` on [1,3] and
`f = 2e^g ln(u-1)/u` on [2,4] to a maximum relative error of 2.47e-5, with the
`kappa = 2` far field `f2(20) = 0.99999783`.

**The engine is not independent of the ladder in the way the corpus's other
producers are** — it is a straight segmented sieve, and the ladder agreement is
a check on the scan, not a second derivation of `G2`. What it does certify
independently is the whole multiset below the maximum, which nothing in the
corpus had.

### 6b. Runtimes, against the price written in §0

| level | cells `W/6` | slots | scan seconds |
|---|---|---|---|
| @19 | 1,616,615 | 378,675 | 0.1 |
| @23 | 37,182,145 | 7,952,175 | 1.4 |
| @29 | 1,078,282,205 | 214,708,725 | 39.6 |
| @31 | 33,426,748,355 | 6,226,553,025 | 1280.5 |

Total elapsed 1322.0 s, 22 minutes, against a 4-hour budget. @31 came in at
21.3 minutes against the ~1 hour §0 priced from the corpus's own segmented
precedent, so the mod-6 wheel plus the pattern copy bought roughly a factor 3.
@37 would be 1.237e12 cells, about 37 times @31 on the same engine, roughly 13
hours: out of budget, and not attempted.

### 6c. What this does not say

- **Nothing here moves the exponent.** `G2 <<_eps x^{4.26645+eps}` stands, the
  target is 2, and none of the three objects touches either.
- **Nine levels is nine levels.** Every reading is [MEASURED] over `x <= 31`, a
  range in which `max/mean` reaches 10.8 and `sd/mean` reaches 0.727 against a
  renewal value of 1. Nothing has converged.
- **The one-level finding is flagged as one-level.** §3c's relaxation of the
  far-tail slope over the last two decades exists only at @31 and must not be
  banked before @37 or an independent deep instrument sees it.
- **§5 is not a test of the sieve bound.** `f_2(s) = 0` on the whole grid; the
  comparison is against zero, and the gap it measures is the Face-4 barrier
  restated, not narrowed.
- **The negative is the load-bearing part.** The pre-registered direction P1
  held: the gap tail at computable levels is lighter than renewal, the excess
  functional sits below the null everywhere it is resolvable, and the maximum is
  a factor 2.1 short of renewal's. So the route "the twin-slot gap distribution
  is heavy-tailed, and that is where a super-linear `G2` exponent comes from" is
  **closed at every level in reach** — which is a statement about `x <= 31` and
  not about the asymptotics.
