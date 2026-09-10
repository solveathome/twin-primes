# The reduction's price, G2(x#)/Z2(x), measured at every level where both objects exist, with the tile's record gap located against zone, stratum, seam and mirror

<!-- ledger
id: Q-measure-g2z2
status: ANSWERED
todo: none
question: What is G2(x#)/Z2(x) at every level where both exist, where does the tile's least attaining position sit, and how often does a zone hold exactly two pairs?
verdict: MEASURED at 22 levels: G2/Z2 rises 1.00 to 8.1429 with its maximum 8.3214 at x = 71, is lossless only at x <= 7, and no gap of length G2 lies inside the zone for x = 11..79 (PROVEN there from Z2 < G2 plus the Zone Restriction Lemma); R0's tight case k = 2 occurs at 0 of 27,291 zones above the degenerate first one; the fourteen custody ratios reproduce digit for digit and Z2 = env at 27,292 of 27,292 zones; the pre-registration scored three of five with one pre-registered theorem refuted (the Poisson miss is 1.518e-1 over p >= 3, corrected from a mislabelled 4.177e-1); no upper bound on G2/Z2 is claimed or in evidence.
-->

*(2026-08-29. Staging note, HELD under the publication moratorium; nothing here
is integrated into a live document. Producer, formally embedded:
`research/measure-g2z2-0829.js` (X = 1e11, 320.6 s, code-sha256 29c00df6...,
out-sha256 93f0fbe5..., FAILS: 0; the embed carries a `forced` stamp, see §6 D7
and D9). The question is the bridge note's top unasked
one, `object-bridge-read-0829.md` §7 Q1, Q2, Q4, and the G2 note's
`object-g2-read-0829.md` §8 Q2, Q7. Custody caveat, stated once and applying to
every number below: this note and its pre-registration are timestamped by disk
order only, not sealed by a commit, and no git command was run this session.)*

## 0. What is open first, and what this measures

**The wall is unchanged and nothing here moves it.** The G2 exponent band stays
(2, 4.26645]; Z2 has no band below the zone width that is not TPC. Every number
in this note is label **(i)** in the bridge note's scheme: a measurement of an
object the corpus already holds, at levels where both objects exist. It is not a
bound, it does not become one, and it carries no TPC content on its own.

**The one thing that would carry content, stated so it cannot be misread.** An
UPPER bound on G2(x#)/Z2(x), holding for all x and combined with any bound on
Z2(x) below the zone width, would be **(ii)**, TPC-strength, because it would
transport a zone statement to the tile. **No such bound is claimed here, none is
attempted, and the measured ratio below is rising over the trusted range, which
is evidence against any small constant ceiling existing at all.**

What is measured, in three pieces:

- **(a)** The fourteen exact G2/Z2 values of `zonegap-01.md` §5 reproduced digit
  for digit by an engine written for this note, before any new number is
  computed, and cross-checked a second way against the adopted A113274 record
  ladder through the envelope identity.
- **(b)** At each of the 22 trusted G2 terms to x = 79
  (`research/a144311-full-ladder.js`): Z2(x), the zone's pair count k, head,
  tail, G2/Z2, and the zone-realised fraction Z2/G2. At the fourteen levels where
  the least attaining position is known (`research/exact-g2-ladder.js` LADDER,
  x <= 43): whether that position lies in the zone (x, x'^2), in the stratum
  [x^2, 2x^2], or elsewhere, with its distance to the nearest seam (a multiple of
  the previous primorial) and to the mirror centre.
- **(c)** The count of zones holding exactly two pairs, R0's tight case where
  head + Z2 + tail = width exactly (`zonegap-02-reduction.md` §2), by decade of p
  in a sweep, against the Hardy-Littlewood Poisson prediction from the zone's
  mean pair count.

**Conventions are `zonegap-01.js` §0's verbatim, not restated by paraphrase.**
A pair (a, a+2) is named by its opener a; a pair is in zone p iff p < a and
a + 2 < p'^2, both strict; gaps are opener to opener; Z2(p) is their maximum,
defined when the zone holds at least two pairs; head = a_first - p and
tail = p'^2 - a_last are counted separately and never inside Z2.

**What is read, not re-run.** The `Q-zonegap-*` family in `QUESTIONS.md` is
ANSWERED or PARTIAL and its results are cited, not recomputed: `Q-zonegap-Z2`
(the 1e11 sweep), `Q-zonegap-model` (Z2(p) = env(p) with the correction field
identically zero, PROVEN conditional on the adopted ladder, VERIFIED 204 ways),
`Q-zonegap-reduction` (the Zone Restriction Lemma and R0), `Q-zonegap-witnesses`
(the record table's two independent witnesses, 82 of 82 rows).

## 1. Pre-registration, written before the producer existed

*(Written 2026-08-29 before `research/measure-g2z2-0829.js` was created; custody
is disk order, not a git object. Disclosures of non-blindness are given inline
and are the point of this section, not an apology for it.)*

**P1. The ratio over x = 47..79. NOT BLIND, and disclosed as such.** The corpus
already proves, conditional on the adopted record ladder, that Z2(p) = env(p),
the largest published twin-gap record wholly below p'^2 (`Q-zonegap-model`). The
ladder is adopted data. So Z2 at the eight trusted levels above the custody
range is derivable by hand, and it was so derived while this section was written.
The hand values are sealed here as an engine check rather than as a test: **Z2 =
168 at x = 47, 53, 59, 61, 67, 71 (the gap 168 opening at 2381) and Z2 = 210 at
x = 73, 79 (the gap 210 opening at 5879)**, giving G2/Z2 = **4.2143, 5.1786,
5.7500, 6.4286, 7.6429, 8.3214, 7.2857, 8.1429**. Predicted trend: rising overall
from about 4.2 to about 8.1, with exactly one fall, at x = 73, where a new record
first fits inside the zone. **Falsifier: any disagreement between the engine and
these eight numbers, in either direction, voids one of the two and is reported as
a defect before anything else.**

**P2. Zones holding exactly two pairs. BLIND.** Predicted: **0 zones with
p >= 3**, and 1 in total over the sweep, the degenerate first zone p = 2 where
the zone (2, 9) holds the pairs 3 and 5. Predicted further: the Poisson
expectation sum over all zones with p >= 3 to the sweep top is **below 1e-6**,
and the minimum pair count over zones with p >= 3 is attained at the smallest p
and rises with no return. **Falsifier: any zone with p >= 3 and k = 2; or a
Poisson sum above 1e-6; or a min-k series that is not monotone after its first
few terms.**

**P3a. The seam distances. BLIND.** For the fourteen least attaining positions,
d_seam / (previous primorial), the normalized distance to the nearest multiple of
the previous primorial, lies in [0, 0.5] by construction. Predicted: **mean in
[0.20, 0.30]** (the uniform expectation is 0.25) and **no value below 0.01**.
**Falsifier: a mean outside the band, or any value below 0.01.**

**P3b. The position inside the tile. NOT BLIND, and part of it is a theorem.**
The Mirror-Sweep Lemma forces the attaining multiset to be symmetric under
sigma(s) = x# - 2 - s, so the LEAST attaining position satisfies
pos <= (x# - 2)/2 identically: pos/x# <= 0.5 is proven, not predicted, and is
used here only as an engine assertion. The blind part was compromised by a hand
estimate made while drafting, so it is recorded as a consistency check:
**pos/x# clusters low, with at least 4 of the 6 terms x = 23..43 below 0.25.**

**P3c. Zone and stratum membership. NOT BLIND for x <= 19.** The four positions
899, 731, 701, 659 were checked by hand against the zones (11, 169), (13, 289),
(17, 361), (19, 529) and the strata [121, 242], [169, 338], [289, 578],
[361, 722] while this section was written: none is in its zone, and exactly one,
659 at x = 19, is in its stratum. Sealed as a consistency check. The blind part
is x = 23..43, where predicted: **no position lies in its zone, and none lies in
its stratum**, both because the positions are astronomically larger than 2x^2.
**Falsifier: either membership occurring at x >= 23.**

**P4. Model calibration. BLIND.** The measured total pair count over all swept
zones divided by the Hardy-Littlewood expectation
2*C2*integral(dt/ln^2 t) over each zone, summed, lies in **[0.97, 1.03]**.
**Falsifier: a ratio outside that band, which would indict the Poisson arm of P2
rather than the primes.**

## 2. Custody reproduction

**Nothing new is claimed in this section: its whole content is that an engine
written today reproduces numbers the corpus already holds.** Two independent
routes to Z2 are run before any new level is touched.

**Route 1, from prime data.** A sieve to 7000, the twin openers of that range,
and the zone convention applied literally. At the fourteen custody levels
x = 2..43 the resulting G2(x#)/Z2(x), printed to two decimals, is compared
character by character against the fourteen values quoted in `zonegap-01.md` §5.
**Result: 14 of 14 identical, VERIFIED** (`measure-g2z2-0829.js` SECTION A, the
`match` column). The underlying Z2 values are 2, 6, 12, 30, 30, 30, 36, 72, and
then 150 at every level from x = 23 through x = 43.

**Route 2, from the record ladder.** `zonegap-03-model.md` proves, conditional on
the adopted A113274 ladder being the true running maximum, that Z2(p) = env(p),
the largest record gap lying wholly inside the zone. The producer inlines the 41
records with p_end <= 1e11 from `research/a113274-gap-records.js` and computes
env(x) independently of the sieve. **Result: env = Z2 at 14 of 14 custody levels
and at every swept zone of section 4's sweep, VERIFIED** (the `env=Z2` column and
the sweep's second-witness line). This is a check on the engine, not a rederivation
of the identity.

**Three further assertions run inside the producer and none fires.** R0's
inequality head + Z2 + tail <= width holds at every level and every swept zone;
the sweep's per-zone k, Z2, head and tail reproduce section A at the fourteen
custody levels, 14 of 14; and the deque that carries the sliding-window maximum
never overflows its guard.

## 3. The table

### 3a. The reduction's price at all 22 trusted levels

Eight of these rows are new to the corpus: x = 47..79, where G2 is A144311's
trusted extension. **The doubt those rows carry, stated before the numbers:
terms 15 to 22 of A144311 are single-witness (Alekseyev 2009 for 8 to 16, Wang
2024 for 17 to 22), adopted under the series rule on 2026-08-20, and no
independent computation of them exists here. Z2 on the same rows is exact and
carries no such doubt, so every ratio above x = 43 inherits exactly the
numerator's trust and nothing worse.**

| x | x′² | k | head | Z2(x) | tail | G2(x#) | G2/Z2 | Z2/G2 | width | Z2/width |
|---|---|---|---|---|---|---|---|---|---|---|
| 2 | 9 | 2 | 1 | 2 | 4 | 2 | 1.0000 | 1.0000 | 7 | 0.2857 |
| 3 | 25 | 3 | 2 | 6 | 8 | 6 | 1.0000 | 1.0000 | 22 | 0.2727 |
| 5 | 49 | 4 | 6 | 12 | 8 | 12 | 1.0000 | 1.0000 | 44 | 0.2727 |
| 7 | 121 | 8 | 4 | 30 | 14 | 30 | 1.0000 | 1.0000 | 114 | 0.2632 |
| 11 | 169 | 9 | 6 | 30 | 20 | 42 | 1.4000 | 0.7143 | 158 | 0.1899 |
| 13 | 289 | 16 | 4 | 30 | 8 | 66 | 2.2000 | 0.4545 | 276 | 0.1087 |
| 17 | 361 | 17 | 12 | 36 | 14 | 108 | 3.0000 | 0.3333 | 344 | 0.1047 |
| 19 | 529 | 21 | 10 | 72 | 8 | 150 | 2.0833 | 0.4800 | 510 | 0.1412 |
| 23 | 841 | 29 | 6 | 150 | 14 | 204 | 1.3600 | 0.7353 | 818 | 0.1834 |
| 29 | 961 | 30 | 12 | 150 | 80 | 258 | 1.7200 | 0.5814 | 932 | 0.1609 |
| 31 | 1369 | 41 | 10 | 150 | 50 | 348 | 2.3200 | 0.4310 | 1338 | 0.1121 |
| 37 | 1681 | 48 | 4 | 150 | 14 | 528 | 3.5200 | 0.2841 | 1644 | 0.0912 |
| 41 | 1849 | 50 | 18 | 150 | 62 | 546 | 3.6400 | 0.2747 | 1808 | 0.0830 |
| 43 | 2209 | 61 | 16 | 150 | 68 | 618 | 4.1200 | 0.2427 | 2166 | 0.0693 |
| 47 | 2809 | 74 | 12 | 168 | 8 | 708 | 4.2143 | 0.2373 | 2762 | 0.0608 |
| 53 | 3481 | 87 | 6 | 168 | 14 | 870 | 5.1786 | 0.1931 | 3428 | 0.0490 |
| 59 | 3721 | 91 | 12 | 168 | 50 | 966 | 5.7500 | 0.1739 | 3662 | 0.0459 |
| 61 | 4489 | 110 | 10 | 168 | 8 | 1080 | 6.4286 | 0.1556 | 4428 | 0.0379 |
| 67 | 5041 | 121 | 4 | 168 | 20 | 1284 | 7.6429 | 0.1308 | 4974 | 0.0338 |
| 71 | 5329 | 123 | 30 | 168 | 50 | 1398 | 8.3214 | 0.1202 | 5258 | 0.0320 |
| 73 | 6241 | 138 | 28 | 210 | 44 | 1530 | 7.2857 | 0.1373 | 6168 | 0.0340 |
| 79 | 6889 | 152 | 22 | 210 | 20 | 1710 | 8.1429 | 0.1228 | 6810 | 0.0308 |

Falls over all 22 terms: 3 (at x = 19, 23, 73). Falls over x = 47..79: 1, at
x = 73. Maximum ratio over the 22 terms: **8.3214 at x = 71, not at the last
term**; the value at x = 79 is 8.1429.

### 3b. Where the tile's least attaining position sits

Known only at the fourteen custody levels (`research/exact-g2-ladder.js`
LADDER). `pos` is the LEAST position at which G2(x#) is attained, `mult` its
multiplicity over the period, `S` the previous primorial (the seam spacing),
`partner` the mirror image of the attaining gap.

| x | pos | mult | in zone (x, x′²) | in stratum [x², 2x²] | pos/x# | d_seam | d_seam/S | d_mirror/x# |
|---|---|---|---|---|---|---|---|---|
| 2 | 1 | 1 | no | no | 0.500000 | 0 | 0.0000 | 0.5000 |
| 3 | 5 | 1 | **YES** | no | 0.833333 | 1 | 0.5000 | 0.5000 |
| 5 | 17 | 2 | **YES** | no | 0.566667 | 1 | 0.1667 | 0.1000 |
| 7 | 71 | 2 | **YES** | **YES** | 0.338095 | 11 | 0.3667 | 0.1571 |
| 11 | 899 | 4 | no | no | 0.389177 | 59 | 0.2810 | 0.1104 |
| 13 | 731 | 12 | no | no | 0.024342 | 731 | 0.3165 | 0.4756 |
| 17 | 701 | 20 | no | no | 0.001373 | 701 | 0.0233 | 0.4986 |
| 19 | 659 | 20 | no | **YES** | 0.000068 | 659 | 0.0013 | 0.4999 |
| 23 | 76166567 | 4 | no | no | 0.341412 | 1430953 | 0.1475 | 0.1586 |
| 29 | 1205437109 | 2 | no | no | 0.186321 | 89972759 | 0.4033 | 0.3137 |
| 31 | 8813641451 | 4 | no | no | 0.043945 | 2343948221 | 0.3623 | 0.4561 |
| 37 | 544899485411 | 2 | no | no | 0.073429 | 56781984979 | 0.2831 | 0.4266 |
| 41 | 3784200788231 | 4 | no | no | 0.012438 | 3636537346579 | 0.4901 | 0.4876 |
| 43 | 830330079152051 | 8 | no | no | 0.063467 | 82420711429579 | 0.2709 | 0.4365 |

d_seam/S: mean 0.2580 over all fourteen, with minimum 0.0000 and maximum
0.5000 there; over the ten non-degenerate levels x = 11..43 the mean is 0.2579,
the minimum 0.0013 (at x = 19) and the maximum 0.4901 (at x = 41). Of the six
levels x = 23..43, five have pos/x# below 0.25.

**A certificate that had to be repaired mid-run, reported here and not buried.**
The producer asserts that the mirror image of the attaining gap is itself an
attaining gap, by exhibiting it: `partner = (x# - 2 - G2 - pos) mod x#` must be a
twin slot whose next twin slot is exactly G2 above. **That assertion passes at
14 of 14 levels, VERIFIED by trial division inside the producer**, and
`partner >= pos` holds at all fourteen, consistent with `pos` being the least
attaining position. The first version of the assertion, taken from the
pre-registration, was the different and FALSE statement `pos <= (x# - 2)/2`; it
failed at x = 2, 3, 5 on the first run. See §6.


### 3c. How the price grows, with no single form quoted

**The caveat is the reading and not a footnote.** Twenty-two terms over a
quantity whose denominator is a staircase cannot separate these forms, no
confidence interval is attached to any of them, the drift figures are two-point
slopes rather than trend estimates, and the matched control that would calibrate
them (the same normalisations on a synthetic staircase with the same step
positions) was not run. `zonegap-01.md` §4's lesson, that a fitted exponent on
this family is a range summary and not a law, applies verbatim.

| x | G2/Z2 | r/(x²/ln³x) | r/(x²/ln⁴x) | r/x | G2/x² | Z2/ln³(x′²) |
|---|---|---|---|---|---|---|
| 11 | 1.4000 | 0.1595 | 0.3825 | 0.1273 | 0.3471 | 0.2222 |
| 13 | 2.2000 | 0.2197 | 0.5634 | 0.1692 | 0.3905 | 0.1649 |
| 17 | 3.0000 | 0.2361 | 0.6689 | 0.1765 | 0.3737 | 0.1763 |
| 19 | 2.0833 | 0.1473 | 0.4338 | 0.1096 | 0.4155 | 0.2920 |
| 23 | 1.3600 | 0.0793 | 0.2485 | 0.0591 | 0.3856 | 0.4911 |
| 29 | 1.7200 | 0.0781 | 0.2629 | 0.0593 | 0.3068 | 0.4630 |
| 31 | 2.3200 | 0.0978 | 0.3357 | 0.0748 | 0.3621 | 0.3982 |
| 37 | 3.5200 | 0.1211 | 0.4371 | 0.0951 | 0.3857 | 0.3661 |
| 41 | 3.6400 | 0.1109 | 0.4118 | 0.0888 | 0.3248 | 0.3524 |
| 43 | 4.1200 | 0.1186 | 0.4459 | 0.0958 | 0.3342 | 0.3285 |
| 47 | 4.2143 | 0.1089 | 0.4192 | 0.0897 | 0.3205 | 0.3355 |
| 53 | 5.1786 | 0.1154 | 0.4581 | 0.0977 | 0.3097 | 0.3098 |
| 59 | 5.7500 | 0.1120 | 0.4566 | 0.0975 | 0.2775 | 0.3023 |
| 61 | 6.4286 | 0.1200 | 0.4934 | 0.1054 | 0.2902 | 0.2825 |
| 67 | 7.6429 | 0.1266 | 0.5322 | 0.1141 | 0.2860 | 0.2711 |
| 71 | 8.3214 | 0.1279 | 0.5450 | 0.1172 | 0.2773 | 0.2659 |
| 73 | 7.2857 | 0.1080 | 0.4633 | 0.0998 | 0.2871 | 0.3147 |
| 79 | 8.1429 | 0.1088 | 0.4756 | 0.1031 | 0.2740 | 0.3042 |

Over x = 11..79: r/(x²/ln³x) drifts **-31.8%**, r/(x²/ln⁴x) **+24.3%**, r/x
**-19.0%**. Dropping the four-term head, over x = 23..79 all three rise:
**+37.3%**, **+91.4%**, **+74.3%**. The head therefore sets the sign of the
whole-range drift, and the truth sits between the ln³ and ln⁴ corrections.
Levels at which the reduction is lossless (Z2 = G2): x = 2, 3, 5, 7.

## 4. Readings against the pre-registration

*(All figures from the embedded OUTPUT block of `research/measure-g2z2-0829.js`,
X = 1e11, elapsed 320.5 s, 27,292 zones. Misses first, per the house rule.)*

### Misses

**M1. A pre-registered "theorem" was false, and its own assertion caught it.
REFUTED.** §1 P3b stated, as proven from the Mirror-Sweep Lemma, that the least
attaining position satisfies `pos <= (x# - 2)/2`. The producer asserted it and
the assertion fired at x = 2, 3 and 5 on the first run. The error is that the
Mirror-Sweep Lemma acts on SLOTS, and the map it induces on GAPS carries the gap
length with it: the mirror image of the gap `[s, s + G2]` starts at
`(x# - 2 - G2 - s) mod x#`, and the reduction mod x# destroys any ordering claim
about which of a mirror pair is smaller. **The corrected statement is VERIFIED at
14 of 14 levels by exhibition inside the producer**: the partner position is a
twin slot whose next twin slot is exactly G2 above, checked by trial division,
and `partner >= pos` at all fourteen. This is the one thing the pre-registration
bought, and it is a correction to this note, not to the corpus, which never
carried the false form.

**M2. The Poisson arm of P2 MISSES, by a threshold set carelessly.** Predicted:
the summed Poisson probability of a zone holding exactly two pairs, over p >= 3,
below 1e-6. Measured: **1.518e-1 over p >= 3, and 4.649e-4 restricted to
p >= 11, of which a single zone, p = 11, contributes 4.579e-4.** (The all-p sum
is 4.177e-1; the degenerate p = 2 alone contributes 2.6586e-1 of it at
lambda = 2.2801. The first version of this note quoted the all-p sum under the
p >= 3 label; see §6 D9.) The miss is
entirely in the smallest zones, where the mean pair count is of order 10 rather
than astronomical, and the threshold was written without looking at them. The
direction is worth one sentence and no more: the model does not say the tight
case is impossible at the bottom of the ladder, only that it is not there.

**M3. The floor arm of P3a MISSES, and the pass beside it is confounded.**
Predicted: no `d_seam/S` below 0.01. Measured: **0.0013 at x = 19** and 0.0000 at
the degenerate x = 2. The mean arm passes, 0.2580 over all fourteen levels and
0.2579 over the ten non-degenerate ones, both inside the pre-registered
[0.20, 0.30] against a uniform expectation of 0.25. **That pass should not be
read as evidence about seams.** `pos` is the LEAST attaining position, selected
toward small values by definition, and at x = 13, 17 and 19 it is smaller than
the previous primorial outright, so its nearest seam is the origin and `d_seam`
is just `pos` again. The un-confounded statistic needs the full argmax set, which
the corpus does not hold. **CONFOUNDED, and the seam reading is withdrawn.**

### Passes

**P1 PASSES exactly, and it was not blind.** The engine returns
Z2 = 168 at x = 47, 53, 59, 61, 67, 71 and Z2 = 210 at x = 73, 79, with
G2/Z2 = 4.2143, 5.1786, 5.7500, 6.4286, 7.6429, 8.3214, 7.2857, 8.1429, and
exactly one fall, at x = 73. Every digit matches the values sealed in §1 by hand
from the envelope identity. **Calibration: this is two routes to the same
numbers agreeing, MEASURED, and it is not independent evidence about anything.**

**P2's count arm PASSES.** **Zones with p >= 3 holding exactly two pairs: 0 of
27,291, to X = 1e11.** The only tight zone is the degenerate p = 2, where
head + Z2 + tail = 1 + 2 + 4 = 7 = width exactly. Two by-products not
pre-registered, both MEASURED: the minimum pair count over p >= 3 is **3**, at
p = 3; and **k is non-decreasing across all 27,292 zones** (zones whose k falls
below the previous zone's: 0 of 27,292).

**P3c PASSES on its blind half.** No least attaining position at x = 23..43 lies
in its zone or in its stratum. The disclosed half holds too: the only in-zone
positions are x = 3, 5, 7, and the only in-stratum positions are x = 7 (71 in
[49, 98]) and x = 19 (659 in [361, 722]).

**P3b's consistency half holds:** 5 of the 6 terms x = 23..43 have pos/x# below
0.25, against the disclosed "at least 4".

**P4 PASSES.** Measured total pair count over expected:
**sum k / sum lambda = 0.9991** over 27,292 zones, sum k = 2,033,900,685,914
against sum lambda = 2,035,818,961,113.3, inside the pre-registered
[0.97, 1.03]. Per decade the ratio reads 0.7285, 0.9595, 0.9900, 1.0000, 0.9992,
0.9991; the low first cell is four zones.

**Score: three of five pre-registered items pass, one misses on a carelessly set
threshold, one misses on its floor with its pass confounded, and one
pre-registered "theorem" is refuted.**

### Two custody facts that were not predicted at all

- **Z2(p) = env(p) at 27,292 of 27,292 swept zones**, computed from the adopted
  A113274 record ladder by code that shares nothing with the sieve. VERIFIED, and
  it is a check on this engine rather than a rederivation of
  `zonegap-03-model.md`'s identity.
- **The sweep closes 27,292 zones at X = 1e11, the same count `zonegap-01.md`
  reports.** VERIFIED.

### The price, and how it grows

The ratio is not flat and does not settle. §3c carries the three
normalisations. Over x = 11..79 they drift in different directions, -31.8%,
+24.3% and -19.0%; dropping the four-term head, over x = 23..79 all three rise,
+37.3%, +91.4% and +74.3%, so the head sets the sign of the whole-range drift
and the truth sits between the ln^3 and ln^4 corrections. **MEASURED, and no
single form is quoted**: 22 terms over a quantity whose denominator is a
staircase cannot separate these, and `zonegap-01.md` §4's lesson, that a fitted
exponent on this family is a range summary and not a law, applies here verbatim.
What the numbers do support, at the MEASURED rung only, is that the price rises
and shows no ceiling on the range where both objects exist: 1.40 at x = 11 to
8.1429 at x = 79, with the maximum 8.3214 at x = 71 and not at the last term.


## 5. What this says about the bridge's §3, and nothing more

**The wall is unchanged. The G2 exponent band stays (2, 4.26645] and Z2 has no
band below the zone width that is not TPC.** Nothing in §3 or §4 touches either.

`object-bridge-read-0829.md` §3 carries a row reading
"G2/Z2, the reduction's loss, measured exactly: 1.00 at p = 2..7, then 1.40 to
4.12 at p = 11..43". **That row now runs to 22 levels and reads 1.00 to 8.1429,
with its maximum 8.3214 at x = 71 rather than at the last term.** The corpus
figure was not wrong; it was the whole of the ladder that existed.

**The mechanism behind the shape is measured and mundane, and saying so is the
point.** Z2(p) = env(p) is a staircase that steps only when a twin-gap record
first fits wholly below x′², while G2(x#) rises at every level. Between steps of
the staircase the ratio must rise; at a step it can fall. Over x = 11..79 the
staircase takes five steps (30 to 36 at x = 17, 36 to 72 at x = 19, 72 to 150 at
x = 23, 150 to 168 at x = 47, 168 to 210 at x = 73) and the ratio's three falls
sit at three of them, x = 19, 23 and 73; at the other two the step is too small
to overturn G2's own rise. **MEASURED; the statement is an observation about the
table and not a law about either object.**

**The reduction is lossless at exactly four levels, x <= 7, and there is a
one-line reason.** By the Zone Restriction Lemma (`zonegap-02-reduction.md` §1,
PROVEN) the in-zone twin slots of the tile are the in-zone twin primes, so a gap
of length G2 lying wholly inside the zone forces Z2 = G2. Those four levels are
also, up to the degenerate x = 2 whose least attaining position 1 sits below the
zone's left end, exactly the levels whose least attaining position lies inside
(x, x′²): x = 3, 5, 7.

**The bridge's §7 Q2 answers in its strong form, and it needs no argmax data.**
For every x in 11..79 the table gives Z2(x) < G2(x#) strictly, and every in-zone
gap is at most Z2, so **no gap of length G2(x#) lies wholly inside the zone at
any of the eighteen levels x = 11..79. PROVEN at those levels, given the Zone
Restriction Lemma and the tabulated inequality.** The positional version is
weaker and is what §3b measures: the least attaining position leaves the interval
(x, x′²) at x = 11 and does not return over the fourteen levels where it is
known. That version is MEASURED and is confounded by the "least" selection; the
proven statement above does not depend on it.

**The bridge's §7 Q4 answers flatly. R0's tight case is not observed.** Over
27,292 zones to X = 1e11 the only zone with exactly two pairs is the degenerate
p = 2, and the pair count is non-decreasing across the whole sweep. So
head + Z2 + tail = width is an equality nowhere in the measured range above the
first zone, and the slack in the decomposition is the sum of the non-maximal
gaps, which grows with k. **MEASURED. It closes the descriptive question and
supplies nothing to (R0)'s strict form beyond the observation that its
hypothesis k >= 3 holds everywhere measured.**

**What this does NOT say, stated because the temptation is obvious.** No upper
bound on G2/Z2 is claimed, attempted, or in evidence. The measured trend is
rising with no ceiling on its range, which is if anything the wrong direction for
any bounded-ratio hope; but 22 terms cannot establish divergence either, and §4
declines to quote a form. The bridge's structural statement is untouched: the
Gap Reformulation restores rotation invariance and pays this ratio, and the
information it discards is information the proven bound never used, because the
DHR sieve is position-uniform (`Q-anchored-vs-global-gap`, CLOSED). **Every
number in this note is label (i). An UPPER bound on G2/Z2 combined with any Z2
bound below the zone width would be (ii); no such bound is claimed.**

## 6. Defects, and what would falsify

**D1. Eight of the 22 rows are single-witness.** A144311 terms 15 to 22
(x = 47..79) are Alekseyev 2009 and Wang 2024, adopted under the series rule, with
no independent computation on disk; the in-house exact ladder stops at x = 43.
Every ratio above x = 43 inherits exactly that doubt. *Falsifier: an independent
recomputation of G2(x#) at any x in 47..79 disagreeing with A144311 + 1. Not run
here.*

**D2. `pos` is the least attaining position, not the argmax set.** The
multiplicity column runs to 20 (x = 17, 19), so every positional statement in
§3b is about one selected member of a set. **The seam reading is withdrawn on
this ground in §4 M3 and should not be quoted.** *Falsifier: enumerating the full
argmax set at any level and finding the seam or mirror distribution unlike the
least member's. Not run; the corpus holds no argmax set.*

**D3. The Poisson arm is a model and its only calibration is the first
moment.** Twin pairs inside a zone are not independent, and k/lambda = 0.9991 is
a first-moment agreement that says nothing about the tail at k = 2. *Falsifier: a
variance or dispersion check against the same model. Not run, and it is the
cheapest missing control here.*

**D4. The env cross-check has a hard reach.** Z2 = env is verified at 27,292 of
27,292 zones only because all of them satisfy p′² <= 1e11, the reach of the 41
inlined A113274 records. Past that the check does not exist, and the identity
itself is PROVEN only conditional on the adopted ladder being the true running
maximum (`zonegap-03-model.md`).

**D5. Custody is disk order.** §1 was written before the producer existed and no
git command was run this session, so nothing seals the ordering. A reader who
does not accept disk order should read §1 as written after the fact, in which
case P1's pass carries no weight at all (it was disclosed as non-blind anyway)
and M1, M2, M3 are the only items with content.

**D6. Prose-reformatting advisory.** Every figure in §2 to §5 is transcribed
from the embedded OUTPUT block of `research/measure-g2z2-0829.js`. The drift
percentages in §4 are the script's own arithmetic on its endpoint values, which
is a two-point slope and not a trend estimate; no confidence interval is
attached to any of the three normalisations, and the matched control that would
calibrate them (the same normalisations run on a synthetic staircase with the
same step positions) was not run.

**D7. The embed was FORCED, and the reason is disclosed.** The first embed
carried wall-clock progress lines, which are not reproducible; the gate refused
the replacement and named 21 of 269 figures it could not reproduce, all of them
progress-line figures from the superseded block. The producer now prints progress
on deterministic 5%-of-X milestones instead, so future embeds are byte-stable,
and the `forced` stamp is in the OUTPUT block's fingerprint.

**D9. One figure in this note was wrong and is corrected here.** The producer
accumulated the Poisson sum over every decade, p = 2 included, and printed it
under the label "p >= 3"; the label was wrong, not the arithmetic. §4 M2, the
ledger verdict and this section quoted **4.177e-1** where the p >= 3 figure is
**1.518e-1**, the difference being the degenerate first zone's own 2.6586e-1.
The producer now prints the all-p and p >= 3 sums separately and was re-embedded
(forced, on an intended code change). **The MISS verdict is unchanged: 1.518e-1
is as far above the pre-registered 1e-6 as 4.177e-1 was.** Source of the
correction: `research/history/staging/redteam-0829-measure-a.md` §1, item M2,
REFUTED.

**D8. The sweep measures zones, not tiles.** Section C says nothing about G2 and
is joined to sections A and B only through R0 and the shared conventions.

**What would falsify the note's own claims.**

- *Custody (§2):* any level where G2/Z2 computed from prime data differs from
  `zonegap-01.md` §5's quoted value. Checked at 14 of 14, none found.
- *The tight case (§4, §5):* one zone with p >= 3 and k = 2, at any X. Checked
  to X = 1e11 over 27,292 zones, none found.
- *The lossless levels (§5):* a level x >= 11 with Z2(x) = G2(x#). Checked at
  eighteen levels x = 11..79, none found; and any such level would also refute
  the proven statement that no G2-length gap lies inside the zone there.
- *The price (§4, §5):* a level x > 79 where G2/Z2 falls back below 4, or a
  proof of any upper bound on G2/Z2. Neither is checked, and the second is the
  only one that would matter.
