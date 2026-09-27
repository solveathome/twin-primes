# The tail field at 27,292 zones, and the head-tail joint law

<!-- ledger
id: Q-zone-tail-02
status: ANSWERED
todo: Z4
question: On the full zonegap-01 range to 1e11, what is the per-zone tail law in both units, is the renewal surplus t/R real at 27,292 zones, and do the head and the tail of a zone have a joint law?
verdict: Resolved DOWN and nothing is derived: zone-tail-01's unresolved t/R = 1.0619 at 782 zones reads 1.0298 on a height-matched comparator at 17,700 zones (bootstrap [1.0156, 1.0443], excluding 1) and 1.0157 against the exactly matched discrete class null (bootstrap [1.0013, 1.0308], clearing 1 by 0.0013), so part of the original figure was the comparator and the pre-registered rule returns MATCH by two parts in ten thousand; c_local = 0.7522 at the top band with bootstrap [0.7410, 0.7630] now CONTAINING HL's 0.7574 and the band drift inside the registered 0.03 per step for the first time but still non-monotone (0.7518, 0.7664, 0.7416, 0.7522), so no convergence is measured; global worst tail/ln^2(p'^2) = 6.840 at p = 15107 with max/mean no longer flat (4.40, 5.36, 8.59, 8.43); Q5 is answered in the negative, head and tail showing no dependence at 27,292 zones (detrended r = -0.0009 against null s.e. 0.0061, permutation p = 0.8920, variance ratio 0.9990, no KS rejection, no chi-square near threshold), so the R0 pieces are a product structure to first and second moments and in the sum's whole law while independence is NOT proven and the simultaneous-extremes regime is untouched; a candidate rough-origin mechanism for the surplus is HEURISTIC and does not fit the head's own excess band by band; the head field's effective sample size is measured at 1,910 distinct a_first among 17,700 top-band zones, so this note's own head interval is priced over draws the field does not hold, a cluster bootstrap over distinct a_first (producer SEC I(a), seed 613009117) measuring the inflation at 4.10 rather than the 3.04 the redundancy alone implies and moving the top-band interval to [0.6848, 0.7692], still inside the registered [0.68, 0.78] (correction originating with redteam-0829-measure-b.md section 1c C15); the scope of that defect is that one interval and not the corpus, since destroyer-census-01.md publishes no bootstrap, head-residual-factor.js bootstraps over gaps, zonegap-01.js has none and zone-tail-01.js bootstraps only tail quantities; ten of ten predictions hit, which is a criticism of the pre-registration; and the R0 shares read 1.40% / 92.80% / 5.81% with the tail's share still falling, so Z2 is more of the obstruction after this pass than before it.
-->

> **RIDER 2026-08-30 (orchestrator, from `verify-0830-record-defects.md` §2, AMENDED on independent
> code).** Where this note's producer prints "R + 1/2" (`zone-tail-02.js`
> lines 500 and 799, code-generated, so the line itself waits for a re-embed):
> c = 1/2 is the all-integer a < o convention and is not the tail's; under
> a + 2 < o the constant is 5/2 for all origins, 3 for odd origins, 5 for
> origins 1 mod 6, and the class null carries the matched value (classNull −
> R_shell = 6.05). t/R re-reads 1.0228 against R + 3 and 1.0181 against R + 5;
> the matched figure is t/classNull = 1.0157. `head-residual-factor.md`:70's
> "R + 1/2, odd origin R + 1" is the head's forward convention and is exact
> there: not amended.

STATUS: HELD, staging. Not integrated, not red-teamed. Producer
`research/zone-tail-02.js`. Custody is disk order only, not sealed by a git
object.

Label: **(i) throughout.** Every statement below is a distributional statement
about measured fields. No bound on any head, on any tail, or on Z2 is claimed
anywhere; a bound below the width on any piece at infinitely many p would be a
(ii) statement and none is made. The label is this note's own:
`attack-wrongdirection-audit.md` §5 records Z4 as NOT audited, so no audited
label exists for the surrounding item.

---

## 0. What is still open

**Nothing is derived.** Every coefficient below is MEASURED on one sweep to
1e11, 27,292 zones, 345.0 s, one engine, no independent reproduction above 1e8.
The tail's 0.7522 ln²(p'²) has no zero-parameter derivation, exactly as the
head's 0.7251 ln²p has none.

**Ten of ten pre-registered predictions hit, and that is a criticism of the
pre-registration.** Most of §1's bands were calibrated on `zone-tail-01`'s own
1e8 measurements of the same object, so they are interpolations rather than
blind forecasts. Only three rows were genuinely at risk (§5).

**The number this pass was commissioned to resolve resolved DOWN, and part of
the original figure was the comparator.** `zone-tail-01`'s t/R = 1.0619 at 782
zones becomes 1.0298 on a height-matched comparator at 17,700 zones and 1.0157
against the exactly matched discrete class null; the class-null bootstrap
[1.0013, 1.0308] clears 1 by 0.0013, which is as thin as a nonzero claim gets.
`zone-tail-01`'s own band-wide convention reads 0.9916, 1.0032, 0.9686, 1.0121
across four decades here, moving around 1 with no pattern, and it should be
retired.

**The pre-registered verdict rule returns MATCH by two parts in ten thousand.**
t/R - 1 = 0.0298 against a threshold of 0.03. The rule's verdict and the
measurement's content disagree: the rule says MATCH, the bootstrap
[1.0156, 1.0443] excludes 1, so there is a small surplus that is below the
threshold anybody chose in advance for caring about it.

**The coefficient still does not converge, it only fits inside the registered
bound now.** 0.7518, 0.7664, 0.7416, 0.7522 over four decades: down, up, down,
up. The registered <= 0.03 per-step drift is met for the first time and four
non-monotone points are not a measured convergence to anything.

**A defect was found in this pass that is owed outside it.** The head field's
effective sample size is 1,910 distinct a_first among the 17,700 zones of the
top band, because zone origins are consecutive primes and are far denser than
twin openers. This note's own head interval prices 17,700 independent draws where
the field holds 1,910 clusters. A cluster bootstrap over those 1,910 distinct
a_first, resampling clusters and not zones (`research/zone-tail-02.js` SEC I(a),
2000 resamples, seed 613009117), gives a 2.5/97.5 width of 0.0843 against the
zone bootstrap's 0.0206, an inflation factor of 4.10, not the sqrt(9.27) = 3.04
the redundancy alone implies: mean cluster size is 9.267 with a maximum of 72,
the clusters are unequal, and cov(cluster size, cluster mean head) = 376.42, so
the design effect exceeds the mean cluster size. The corrected top-band interval
is [0.6848, 0.7692]. The scope of this defect is ONE published interval, this
note's own §5 P6: `destroyer-census-01.md` publishes no bootstrap of any kind,
`head-residual-factor.js` bootstraps over GAPS rather than zones,
`zonegap-01.js` has no bootstrap, and `zone-tail-01.js` bootstraps only tail
quantities. The correction originates with `redteam-0829-measure-b.md` §1c C15
and C16; the figures above are the producer's own SEC I(a) and are computed
inside the same embedded run as everything else in this note.

**What moved.** Q5 of `z2-state-draft-0829.md` §8 is answered in the negative
at the resolution available: detrended pooled correlation of head and tail is
-0.0009 over 27,267 zones against a null standard error of 0.0061, permutation
p = 0.8920, variance ratio of the sum 0.9990 at the top band, no KS rejection,
no chi-square near threshold. Head and tail behave as a product structure to
first and second moments and in the whole law of their sum; independence is
NOT proven, and the simultaneous-extremes regime, the only one a bound would
use, is untouched. And the R0 shares move further the way they already moved:
1.40% head, 92.80% Z2, 5.81% tail at the top band, the tail's share still
falling. Filling the tail row in at twenty-two times the zones does not move
the decomposition's difficulty; Z2 holds more of the sum after this pass than
before it.

## 1. PRE-REGISTRATION (written 2026-08-29, before `research/zone-tail-02.js` existed and before any number on the 1e11 range was computed)

**Custody caveat, first.** No commit is made in this wave, so this section is
timestamped by disk order only and is not sealed by a git object. A reader who
does not accept disk order should read §1 as a hypothesis list, not as a
pre-registration. The same caveat is on `zone-tail-01.md` §1 and it is not
weaker here.

**Conventions.** `zonegap-01.js` §0 verbatim, as `zone-tail-01.md` §1 restates
them. A pair (a, a+2) is named by its OPENER a; the pair is in zone p iff
p < a and a + 2 < p'^2, both strict; head(p) = a_first - p; tail(p) = p'^2 -
a_last, measured to the OPENER, so the tail carries a deterministic +2 the head
does not (stated, not corrected; below the third digit at the predicted scale).

**The range.** `zonegap-01.js`'s own zone list at X = 1e11: every consecutive
prime pair (p, p') with p'^2 <= X, which includes p = 2, 3, 5 that
`zone-tail-01`'s census range excluded. Expected 27,292 zones, p = 2 .. 316219,
224,376,048 twin openers with a + 2 <= X. The producer ASSERTS all three; a
miss voids the file.

**Bands.** `zonegap-01.js`'s own: decades of p, with the last split at
sqrt(1e11), so 10^0, 10^1, 10^2, 10^3, 10^4, 1e5-p.5 with 4, 21, 143, 1061,
8363, 17700 zones. `zone-tail-01`'s census bands B1..B4 are carried too, on the
zones they cover, for the custody comparison and for nothing else.

**Estimators.** Coefficients are ratio of sums, `Sum(tail) / Sum(ln^2(.))`, the
`destroyer-census-01.js` SEC 6(a) estimator; every one is reported in BOTH
units, local `ln^2(p'^2)` and the head's `ln^2 p`, because
`ln^2(p'^2) = 4 ln^2 p'` and a coefficient quoted without its unit is a factor
of four adrift. `zonegap-01.js`'s own `tailM` is a MEAN OF RATIOS, a different
estimator, and it is reproduced under its own definition for custody and never
mixed with the ratio-of-sums column. Intervals are seeded bootstraps over
zones within band, 2000 resamples.

**The renewal comparator.** R = E[g^2] / 2 E[g] over the twin-gap process,
the forward and backward recurrence mean. `zone-tail-01.md` §5 evaluated R over
a whole BAND's height span, which mixes heights: gaps are roughly uniform in n
while zones are roughly uniform in p, so a band two decades wide compares a
zone-weighted mean tail against a gap-weighted R, and the two weightings sit at
different effective heights. This pass replaces it with a height-matched
estimator: a log-binned R profile, 20 bins per decade of height, R(h) taken
from the bin holding h, so the tail at height p'^2 is compared against R at
p'^2 and the head at height p against R at p. `zone-tail-01`'s band-wide
convention is reported alongside for continuity, and the two are expected to
differ by the mixing correction, which is a few per cent. R is the CONTINUUM
functional (`redteam-0828-head.md`); a discrete integer origin sees R + 1/2
exactly and the exactly matched comparator for p'^2 is the class-matched
origin null over the residues {1, 19} mod 30 that p'^2 occupies for p' >= 7.
All three are reported.

### The registered predictions

**(P1) The tail law.** c_local = Sum(tail) / Sum(ln^2(p'^2)) in the top band
[1e5, sqrt(1e11)) lands in [0.73, 0.80], bracketing `zone-tail-01`'s 0.7771 at
its own top band and HL's 1/(2 C2) = 0.7574. In ln^2 p units the same number
reads 4x that, about [2.9, 3.2]. Registered falsifier: outside [0.70, 0.83].

**(P2) Band drift.** |c_local(10^4) - c_local(1e5-p.5)| <= 0.03, and the spread
over 10^2..1e5-p.5 <= 0.05. A larger spread is band composition, not a law,
exactly as `zone-tail-01.md` §3 and `destroyer-census-01.md` §6(b) call it.

**(P3) The renewal ratio, PRIMARY.** On the height-matched binned R, the
pooled t/R over the top band lands in [0.97, 1.03]. Ground: no mechanism for a
tail surplus has been identified, p'^2 is not prime and the class-matched null
removes what structure its residue class carries, and `zone-tail-01`'s +6.19%
at 782 zones is 1.7 standard errors of a mean of a roughly exponential variate
and is therefore what noise looks like at that n. **The competing hypothesis is
registered with its own number:** if the +6.19% is real, the height-matched
t/R reads in [1.04, 1.10] and the bootstrap at 27,292 zones excludes 1.03.
Resolution rule, `zone-tail-01.md` §1 (E2)'s verbatim: SURPLUS if
t/R - 1 >= +0.03 with the bootstrap interval clear of +0.03; DEFICIT if
<= -0.03 likewise; MATCH otherwise. At 27,292 zones the bootstrap half-width is
predicted near 0.015, against 0.069 at 782, so the rule is expected to resolve
either way; if it does not, that is itself the reading.

**(P4) The class-matched null.** The exactly matched comparator (integer
origins in {1, 19} mod 30, backward distance, height-matched by the same bins)
agrees with the binned R to within 2% at the top band, since the discrete
correction R + 1/2 is 0.5 against R near 480 there. Falsifier: a discrepancy
above 5%, which would mean the class of the origin carries something.

**(P5) The worst case.** The global max of tail/ln^2(p'^2) over 27,292 zones
lands in [4.5, 7.5]. Ground: 4.007 was the max over the 1,225 zones of
`zone-tail-01`; a light-tailed extremal law scaling like c ln(n) predicts
4.007 x ln(27292)/ln(1225) = 5.8. The measured value cannot fall below 4.007,
since those 1,225 zones are a subset of these 27,292, and that is an internal
consistency check as well as a prediction. Falsifier: above 10, or below 4.007.

**(P6) The head, same estimator, same zones.** c_head = Sum(head) / Sum(ln^2 p)
in the top band lands in [0.68, 0.78], consistent with `zonegap-01.js`'s own
mean-of-ratios 0.725 there and `destroyer-census-01`'s 0.6693..0.753 half-decade
spread. h/R on the height-matched bins lands in [1.00, 1.06], below
`destroyer-census-01` §6(b)'s h/R = 1.09 -> 1.03 continued.

**(P7) The joint law, raw.** The pooled Pearson correlation of the RAW head
and tail over all 27,292 zones is POSITIVE and small, in [0.00, 0.12]. This is
a confound and is registered as one: both fields scale with ln^2 of their own
heights, which are deterministically linked, so a positive raw correlation is
the common height trend and carries no information about dependence. The
predicted size is small only because 92% of the zones sit in two decades of p:
modelling head and tail as exponentials with means proportional to L = ln^2 p
gives corr = Var(L) / (2 E[L^2] - E[L]^2), which is about 0.016 on this zone
list. (Registered as 0.016; that figure is the formula on the top two bands,
26,063 zones, and on the full 27,292-zone list it reads 0.0285
(`research/zone-tail-02.js` SEC I(b), E[L] = 134.82, E[L²] = 18726.75), so the
model runs 12.53% below the measured 0.0326 rather than a factor of two below
it. Correction originating with `redteam-0829-measure-b.md` §1c C18.)

**(P8) The joint law, PRIMARY.** After normalising each field by ln^2 of its
own height and removing a within-decade linear trend in ln p from both, the
pooled Pearson correlation lands in [-0.02, +0.02]. Ground: with the zone
holding of the order 10^8 pairs at the top band, head and tail are functionals
of the twin-pair process on two intervals separated by about p^2, and every
independence heuristic available puts them asymptotically independent. At
n = 27,292 the null standard error is 1/sqrt(n) = 0.0061, so +-0.02 is 3.3
standard errors and the band is a real test. Registered falsifier: |r| > 0.02
with the within-decade permutation null (2000 permutations) excluding it.
Spearman and the 3x3 tercile chi-square (4 degrees of freedom, per decade) are
registered to agree: chi-square p-values uniform-looking, none below 0.01/6
after the Bonferroni step over six decades.

**(P9) The sum's law.** In normalised units, per decade,
Var(head~ + tail~) / (Var(head~) + Var(tail~)) lands in [0.97, 1.03], the
product-form prediction; and a two-sample Kolmogorov-Smirnov test between the
observed head + tail and the independence-null sums (the same marginals
re-paired by a within-decade permutation) does not reject at 0.01. The
coefficient of the sum, c_sum in ln^2 p units, equals c_head + 4 c_local to
within the third digit, which is an identity and is asserted, not tested.

**(P10) R0.** width = head + Sum(gaps) + tail holds digit-exactly at all
27,292 zones and head + Z2 + tail <= width at all of them, with equality iff
the zone holds exactly 2 pairs. This is a THEOREM (`zonegap-02-reduction.md`
(R0)); it is ASSERTED per zone by the producer, never measured, and a single
failure is an engine defect and not a finding.

**Price.** `zonegap-01.js`'s embedded elapsed is 315.7 s at X = 1e11 on the
same engine. This file adds per-gap moment and class-null accumulation to the
same single sweep, priced at under 20 minutes total, well inside the 4-hour
rule, so it is simply run.

## 2. Custody, before any new number

Producer `research/zone-tail-02.js`, embedded
(`node research/qc/embed.js research/zone-tail-02.js --timeout 1800`), one
sweep to X = 1e11, `elapsed` 345.0 s. It is an independent engine from `zone-tail-01.js`
(that one holds every opener below 1e8 in an array and indexes it; this one
streams a segmented sieve to 1e11 and can hold nothing), so agreement between
them is a check and not a tautology. Custody runs BEFORE any new number and a
miss on any row voids the file; the producer's own verdict line reads
`0 assertion failures`.

| custody row | source | measured here | verdict |
|---|---|---|---|
| zone count, top origin, pair count | `zonegap-01.js` embed at X = 1e11 | 27,292 zones, p = 2 .. 316219, 224,376,048 pairs | asserted, EXACT |
| pi_2(1e8), pi_2(1e9), pi_2(1e10), pi_2(1e11) | A007508 | 440,312 / 3,424,506 / 27,412,679 / 224,376,048 | asserted, EXACT |
| running-max gap ladder | A113274/A113275 records 1..41 | all 41 gaps and first occurrences | asserted, EXACT |
| per-decade `tailM` (mean of ratios, tail/ln^2(p'^2)) | `zonegap-01.js` PER-BAND | 0.684, 0.578, 0.768, 0.766, 0.741, 0.752 | asserted to 3 dp, EXACT |
| per-decade `headM` (mean of ratios, head/ln^2 p) | `zonegap-01.js` PER-BAND | 1.778, 0.872, 0.942, 0.684, 0.720, 0.725 | asserted to 3 dp, EXACT |
| per-decade `headMax` | `zonegap-01.js` PER-BAND | 6, 30, 150, 210, 630, 924 | asserted, EXACT |
| per-decade c3 = mean Z2/ln^3 p | `zonegap-01.js` PER-BAND | 4.370, 2.708, 3.426, 3.681, 4.022, 3.930 | asserted to 3 dp, EXACT |
| per-decade pairs/zone and zone counts | `zonegap-01.js` PER-BAND | 4, 21, 143, 1061, 8363, 17700 | asserted, EXACT |
| B1..B4 mean tail on the 1,225-zone census list | `zone-tail-01.js` SEC B | 33.64, 113.65, 167.56, 237.26 | asserted to 2 dp, EXACT |
| B1..B4 c_local (ratio of sums) | `zone-tail-01.js` SEC B | 0.5740, 0.7518, 0.7288, 0.7771 | asserted to 4 dp, EXACT |
| c_p and head c at B4 | `zone-tail-01.js` SEC B, `destroyer-census-01.md` §6(a) | 3.1096 and 0.6693 | asserted to 4 dp, EXACT |
| every zone with p'^2 < 1e6 | independent brute-force engine in-file | 167 zones, count/head/tail/Z2 | IDENTICAL |
| the five hand-verified levels p = 7,11,13,17,23 | `zonegap-02-reduction.js` | Z2, head, tail | IDENTICAL |

**What custody does NOT cover, stated plainly.** The 1,225-zone overlap is 4.5%
of these zones, so the reproduction pins the engine and the conventions, not
the new range. Above 1e8 nothing in the corpus exists to check the tail
against; the only external witnesses at 1e11 are A007508 and A113274, which
constrain the pair stream and the gap extremes and say nothing about a tail.
The width audit is numeric rather than argued at one point: the densest bin
carries 22,482,280 gaps and a g^2 sum of 1.017e13, below 2^53, asserted in
the producer rather than only in the header.

**The embed carries a `--force` override, disclosed here.** SEC I was added to
the producer after the first embed, so the bound tail changed and `embed.js`
refused to replace it; the refusal itself reported "every old figure
reproduces", and the forced re-embed stamped `0 of 354 figures in the replaced
block not reproduced` into the fingerprint. Every figure quoted in this note
from before SEC I existed is therefore the same figure, re-run and re-verified,
and the override is recorded in the artefact rather than only here. The
producer's own elapsed rose from 330.8 s to 345.0 s with SEC I in it.

**Two figures moved from a red team's scratchpad into this producer.** The
cluster bootstrap on the head interval and the (P7) model figure on the full
zone list were computed off-producer by `redteam-0829-measure-b.md` §1c (C15,
C18) and had no output custody. Both are now computed inside SEC I of the same
embedded run. The inflation factor 4.10 and the model figure 0.0285 reproduce
that note's values exactly; the interval reads [0.6848, 0.7692] here against its
[0.6840, 0.7681], a difference of 0.0008 and 0.0011 at the two ends, which is
the bootstrap seed and nothing else. This note carries its own figures and
credits the red team as the origin of the correction.

**Custody of the pre-registration is disk order only.** §1 was written before
`research/zone-tail-02.js` existed and no commit was made in this wave. That is
the same standing exposure `TODO.md` Z0 already records for the sealed preregs
and it is not discharged here.

## 3. The tail law to 1e11

**The caveat first.** Nothing here is derived. Every coefficient is MEASURED on
one sweep, and the estimator is a ratio of sums with a bootstrap over zones,
which prices sampling error in the zones and prices nothing else: not the
choice of band, not the choice of normaliser, not the single-sweep custody.
The tail's coefficient is still, at 27,292 zones, a number with no
zero-parameter derivation, exactly as the head's is
(`destroyer-census-01.md` §6(b), `head-residual-factor.md` §0).

Every row is reported in both units. `ln^2(p'^2) = 4 ln^2 p'`, so the local
column and the ln^2 p column differ by a factor measured at 4.0000 at the top
band and by nothing else; a tail coefficient quoted without its unit is four
times adrift.

| band | zones | mean tail | c_local = St/Sln²(p'²) | bootstrap | c_p = St/Sln²p | c_local / HL |
|---|---|---|---|---|---|---|
| 10^0 | 4 | 8.50 | 0.6375 | [0.5570, 0.8050] | 4.2161 | 0.8417 |
| 10^1 | 21 | 34.57 | 0.5733 | [0.4275, 0.7332] | 2.4117 | 0.7570 |
| 10^2 | 143 | 113.65 | 0.7518 | [0.6529, 0.8502] | 3.0220 | 0.9926 |
| 10^3 | 1061 | 218.86 | 0.7664 | [0.7241, 0.8087] | 3.0670 | 1.0119 |
| 10^4 | 8363 | 343.05 | 0.7416 | [0.7259, 0.7569] | 2.9667 | 0.9792 |
| 1e5-p.5 | 17700 | 447.26 | 0.7522 | [0.7410, 0.7630] | 3.0088 | 0.9931 |

**The drift is inside the registered bound and is still not a convergence.**
10^3 -> 10^4 falls 0.0247 and 10^4 -> top rises 0.0105, against §1 (P2)'s
registered <= 0.03 per step; the spread over 10^2..top is 0.0247 against a
registered <= 0.05. Both HIT. But the sequence is down then up, the same
non-monotone shape `zone-tail-01.md` §3 called band composition at 1,225
zones, and four points that wobble by 2.5% inside a 0.75 level are consistent
with a constant near 0.75 and equally consistent with a slow drift the range
cannot see. What changed is the interval, not the shape: the top band's
bootstrap is [0.7410, 0.7630], a half-width of 0.011 against 0.049 at
`zone-tail-01`'s 782 zones.

**HL's constant is now inside the top band's interval, and outside the one
below it.** 1/(2 C2) = 0.7574 sits inside [0.7410, 0.7630] at the top band, and
just OUTSIDE [0.7259, 0.7569] at 10^4, above its upper end by 0.0005. Two
adjacent decades that disagree at that resolution are the band drift showing up
again, and the caveat is that the top band's agreement with HL is one decade's
reading and not a trend. At 1,225 zones the tail read 2.6%
above HL and the head 11.6% below it with intervals too wide to say anything;
at 27,292 zones the tail reads 0.7% below HL with an interval that contains it.
That is CONSISTENT WITH the Hardy-Littlewood renewal mean and is not evidence
that the tail equals it: a one-sweep measurement whose interval covers a
constant is weak evidence at best, the band drift is unresolved, and no
derivation of the coefficient exists on either side.

### The worst case

| band | max tail | at p | /ln²(p'²) | /ln²p | /width | max/mean |
|---|---|---|---|---|---|---|
| 10^0 | 14 | 7 | 0.609 | 3.697 | 1.23e-1 | 1.65 |
| 10^1 | 80 | 29 | 1.696 | 7.055 | 8.58e-2 | 2.31 |
| 10^2 | 500 | 743 | 2.851 | 11.441 | 8.88e-4 | 4.40 |
| 10^3 | 1172 | 7643 | 3.664 | 14.659 | 2.00e-5 | 5.36 |
| 10^4 | 2948 | 69259 | 5.933 | 23.731 | 6.15e-7 | 8.59 |
| 1e5-p.5 | 3770 | 245563 | 6.118 | 24.474 | 6.25e-8 | 8.43 |

Global maximum tail/ln²(p'²) = 6.840 at p = 15107, tail 2534, p'² =
228,644,641, width 228,629,534; in ln²p units the same zone reads 27.365, and
it is the same zone in both units. §1 (P5) registered [4.5, 7.5]: HIT, with the
extremal scaling argument that produced 5.8 running 18% low.

**The caveat that matters more than the hit.** max/mean was flat at 4.4, 5.6,
4.9 over `zone-tail-01`'s three usable bands and it is NOT flat here: 4.40,
5.36, 8.59, 8.43. Six order statistics on one sweep support no extremal law,
and the growth is what a light-tailed law over a growing sample looks like as
much as it is what a heavier one looks like. No extremal analysis is offered,
no comparison to the Kourbatov ceiling is made (the tail has no such
comparator in this corpus), and the ratio max tail / width falls to 6.25e-8,
which is a divergence of the margin and is not evidence of anything
(`ZONE-POSTULATE.md` §5a, the square-window lesson).


### The renewal comparator, and the surplus that shrinks when the comparator is matched

`zone-tail-01.md` §0 named one number as what this range was for: t/R = 1.0619
at 782 zones, bootstrap [0.9937, 1.1321], NOT RESOLVED. It resolves, and the
answer depends on which comparator is used, which was the objection
`redteam-0828-head.md` already made against the head's own residual.

| band | zones used | mean tail | R_shell | t/R_shell | R_bin | t/R_bin | R_band | t/R_band | classNull | t/classNull |
|---|---|---|---|---|---|---|---|---|---|---|
| 10^2 | 23 | 125.65 | 123.65 | 1.0162 | 123.79 | 1.0150 | 114.62 | 0.9916 | 129.90 | 0.9673 |
| 10^3 | 924 | 223.27 | 206.81 | 1.0796 | 207.57 | 1.0756 | 218.16 | 1.0032 | 213.60 | 1.0452 |
| 10^4 | 8363 | 343.05 | 335.12 | 1.0237 | 335.22 | 1.0234 | 354.17 | 0.9686 | 341.25 | 1.0053 |
| 1e5-p.5 | 17700 | 447.26 | 434.31 | **1.0298** | 434.33 | 1.0298 | 441.91 | 1.0121 | 440.36 | **1.0157** |

(the "zones used" column is the zones whose height-matched shell and bin both
carry at least 100 twin gaps; the two bottom decades have no such bin at all
and nothing height-matched is computable there. The `t/R_band` column is the
ONLY one computed on the whole band: at 10^2 it is 113.65/114.62 on 143 zones
while every other column of that row uses the 23 the caption names, and at 10^3
it is 218.86/218.16 on 1,061 against the row's 924. The 10^4 and top-band rows
use the whole band throughout.)

**The pre-registered rule returns MATCH, by 0.0002.** §1 (P3) carried
`zone-tail-01.md` §1 (E2)'s rule verbatim: SURPLUS needs t/R - 1 >= +0.03 with
the bootstrap clear of +0.03. Measured t/R_shell - 1 = 0.0298 at the top band,
bootstrap [1.0156, 1.0443]. 0.0298 < 0.03, so the rule reads MATCH, and it does
so by two parts in ten thousand while the bootstrap straddles the threshold.
Anybody quoting "MATCH" without that sentence is quoting an artefact of where
a threshold was put.

**What is actually measured is a small surplus that is not zero.** The
bootstrap [1.0156, 1.0443] excludes 1.0000, so at 17,700 zones the tail runs
about 3% longer than the height-matched renewal functional of the same
window's twin gaps, and that 3% is outside sampling error. The pooled figure
over all 27,010 usable zones is 1.0291, bootstrap [1.0165, 1.0408].

**Under the exactly matched DISCRETE comparator the surplus halves to 1.6%.**
R is the continuum functional; the tail's origin p'^2 is an integer confined to
the classes {1, 19} mod 30. Comparing against the exhaustive class null, the
mean backward distance from EVERY integer of those classes at the same heights
(6.0e9 origins at the top band, computed in closed form inside the same sweep,
never sampled), gives t/classNull = 1.0157 with bootstrap [1.0013, 1.0308].
The interval clears 1.0000 by 0.0013, which is as thin a margin as a
measurement can carry and still be called nonzero. The offset between the two
comparators is 440.36 - 434.31 = 6.05, against the 7.5 that half the spacing of
a class-{1,19} origin grid predicts: §1 (P4) registered agreement within 2% and
the two differ by 1.39%, HIT, and the direction and size are the discreteness
correction and not a finding.

**The band-wide convention, which is what `zone-tail-01` used, is the one that
should be retired.** t/R_band reads 0.9916, 1.0032, 0.9686, 1.0121: it moves
around 1 with no pattern, because a band two decades wide compares a
zone-weighted mean tail against a gap-weighted R sitting at a different
effective height. The 1.0619 that this pass was commissioned to resolve was
computed in that convention at a one-decade band; the height-matched successors
of it read 1.0298 and 1.0157. **The honest summary of the resolution: the
+6.19% was mostly the small sample and partly the comparator, what survives is
+1.6% against the exactly matched null, and it is measured, not derived.**

**A candidate mechanism, HEURISTIC and quantitatively unsettled.** p'^2 is
coprime to every prime q <= p', which is the same coprimality structure a prime
origin has at the same sieve level, so the tail's origin is a "rough" origin in
exactly the sense `destroyer-census-01.md` §6(b) reads the head's h/R excess.
SEC F measures the head's own excess against an exactly matched FORWARD class
null over the eight residues coprime to 30 that a prime >= 7 occupies:
h/fwdNull = 1.0347, 1.0412, 1.0266 over the three top bands, against the tail's
t/classNull = 1.0452, 1.0053, 1.0157 over the same bands. Both are positive,
both are of order a few per cent, both are falling at the top; that is
CONSISTENT WITH one rough-origin mechanism and does not identify one, since
neither sequence is monotone and the two disagree band by band by more than
their own drift. No derivation is offered and none is claimed.

## 4. The joint law of head and tail

`z2-state-draft-0829.md` §8 Q5 asked whether head and tail have a joint law and
recorded that it had never been posed. It is posed here, on 27,292 zones, and
the answer is a null result: **no dependence is detected between the head and
the tail of the same zone, at a resolution of about 0.006 in correlation.**
Label (i): this is a distributional statement about two measured fields. It is
not a bound on either and it is not a theorem of independence.

**The raw correlation is a confound and is reported first so it cannot be
misread.** Pooled over all 27,292 zones, corr(head, tail) = 0.0326, positive.
Both fields scale with ln² of their own heights and the two heights are
deterministically linked, so a positive raw correlation is the common height
trend. §1 (P7) registered [0.00, 0.12] on the exponential-marginal calculation
corr = Var(L)/(2E[L²] - E[L]²) ~ 0.016 with L = ln²p; measured 0.0326, HIT. The 0.016
quoted in §1 is the model evaluated on the TOP TWO BANDS, 26,063 zones; on the
full 27,292-zone list the same formula gives 0.0285 (SEC I(b) of the producer,
E[L] = 134.82, E[L²] = 18726.75), so on the same zone set the model runs 12.53%
below the measurement rather than a factor of two, and the apparent factor of two
was a mismatched zone set (correction originating with
`redteam-0829-measure-b.md` §1c C18). Normalising each field by ln² of its own height takes the
pooled correlation to -0.0011.

| band | zones | Pearson (detrended) | Spearman | chi²(3x3, 4 df) | p | null s.e. |
|---|---|---|---|---|---|---|
| 10^2 | 143 | -0.0459 | -0.1063 | 4.08 | 0.3948 | 0.0836 |
| 10^3 | 1061 | 0.0087 | 0.0148 | 2.50 | 0.6444 | 0.0307 |
| 10^4 | 8363 | 0.0018 | -0.0038 | 2.49 | 0.6461 | 0.0109 |
| 1e5-p.5 | 17700 | -0.0021 | -0.0071 | 3.72 | 0.4455 | 0.0075 |

The statistic is head/ln²p against tail/ln²(p'²), with a linear trend in ln p
removed from both inside each band, so neither the between-decade nor the
within-decade height trend can enter. Pooled over 27,267 zones the detrended
correlation is **r = -0.0009**, against a null standard error of 0.0061: r/s.e.
= -0.15. The within-band permutation null (2000 permutations of the tail
against the head, seed 424242) reads [-0.0118, 0.0123] with a two-sided
p = 0.8920. §1 (P8) registered |r| <= 0.02 with the permutation null not
excluding it: HIT, and by a wide margin. The four chi-square p-values are
0.3948, 0.6444, 0.6461, 0.4455, none anywhere near the registered Bonferroni
threshold 0.01/6.

**The sum's law is the product form, to the resolution available.** head + tail
is the R0 residual, width minus the sum of the interior gaps.

| band | c_head | c_tail (ln²p units) | c_sum | Var(h~+t~)/(Var h~ + Var t~) | cov(h~,t~) | KS vs the re-paired null | p |
|---|---|---|---|---|---|---|---|
| 10^2 | 0.9863 | 3.0220 | 4.0083 | 0.9510 | -0.1743 | 0.0559 | 0.9751 |
| 10^3 | 0.6859 | 3.0670 | 3.7529 | 1.0033 | 0.0142 | 0.0141 | 0.9999 |
| 10^4 | 0.7177 | 2.9667 | 3.6844 | 1.0006 | 0.0027 | 0.0134 | 0.4389 |
| 1e5-p.5 | 0.7251 | 3.0088 | 3.7338 | 0.9990 | -0.0042 | 0.0034 | 0.9999 |

c_sum = c_head + c_tail is an identity of the ratio-of-sums estimator and is
asserted, not tested. The columns that carry information are the variance ratio,
which the product form puts at 1 and which measures 1.0033, 1.0006, 0.9990 on
the three bands with more than a thousand zones (§1 (P9) registered [0.97,
1.03]: HIT; the 0.9510 at 143 zones is noise and is carried only for
completeness), and the Kolmogorov-Smirnov test between the observed sums and
the same two marginals re-paired by a within-band permutation, which rejects
nowhere.

**What the null result is worth, stated at its own size.** It supports
`zonegap-02-reduction.md` §2's "separately attackable" wording at the level of
first and second moments and of the whole distribution of the sum, on this
range, with no dependence visible above 0.006 in correlation. It does not prove
independence, it says nothing about the joint tail behaviour where both pieces
are simultaneously large (the extremal question, which 27,292 zones cannot
address and which is the only regime a bound would care about), and it says
nothing about Z2's relation to either.

**One structural caveat that the zone count hides, and it is new here.** The
head field is far less informative than 27,292 suggests. Zone origins are
consecutive primes, which are much denser than twin openers at the same height,
so many zones share one head-bearing twin gap: SEC F counts 1,910 DISTINCT
a_first among the 17,700 zones of the top band, 1,019 among the 8,363 of
10^4, and 171 among the 1,061 of 10^3. That is 9.3 zones per distinct head at
the top. The permutation test above is still exact, because permuting the tails
is valid whatever structure the head vector carries, and the Pearson
permutation variance is 1/(n-1) regardless. But this note's own head interval carries a
bootstrap over zones that prices 17,700 independent draws where the field holds
about 1,910. A cluster bootstrap over the 1,910 clusters, resampling
clusters and not zones (producer SEC I(a), 2000 resamples, seed 613009117),
measures the inflation at 4.10, not the sqrt(9.27) = 3.04 the redundancy alone
implies, because mean cluster size is 9.267 with a maximum of 72 and
cov(cluster size, cluster mean head) = 376.42; the corrected top-band interval is
[0.6848, 0.7692] and §5 (P6)'s hit survives it by 0.005 at the lower end. The scope is this one published interval: `destroyer-census-01.md`
publishes no bootstrap of any kind, `head-residual-factor.js` bootstraps over
GAPS rather than zones, `zonegap-01.js` has no bootstrap and `zone-tail-01.js`
bootstraps only tail quantities (the correction originates with
`redteam-0829-measure-b.md` §1c C15 and C16; the figures are the producer's SEC
I(a)). The tail has no such redundancy: the top band's 17,700
shells partition the height range [1e10, 1e11], so a shell is about 5.1e6 wide
on average against a mean twin gap of the order of R_shell = 434 there, roughly
11,000 gaps per shell, and essentially every tail sits in a different gap.

## 5. Readings against the pre-registration

| # | registered in §1 | measured | verdict |
|---|---|---|---|
| P1 | c_local at the top band in [0.73, 0.80] | 0.7522, bootstrap [0.7410, 0.7630] | **HIT** |
| P2 | per-step drift <= 0.03, spread <= 0.05 | -0.0247 and +0.0105, spread 0.0247 | **HIT**, and still non-monotone |
| P3 primary | height-matched t/R at the top band in [0.97, 1.03] | 1.0298, bootstrap [1.0156, 1.0443] | **HIT by 0.0002**, and the interval excludes 1 |
| P3 competing | if the +6.19% is real, t/R in [1.04, 1.10] with the interval clear of 1.03 | 1.0298, interval straddling 1.03 | **MISSED** |
| P3 rule | `zone-tail-01.md` §1 (E2) verbatim | t/R - 1 = 0.0298 < 0.03 | **MATCH**, by two parts in ten thousand |
| P4 | class null and binned R agree within 2% | 440.36 against 434.31, 1.39% | **HIT** on the band; the registered ground does not hold, see the note below the table |
| P5 | global max tail/ln²(p'²) in [4.5, 7.5] | 6.840 at p = 15107 | **HIT** |
| P6 | c_head at the top band in [0.68, 0.78]; h/R in [1.00, 1.06] | 0.7251 [0.7147, 0.7353]; h/R = 1.0544 | **HIT** on c_head; the h/R half is NOT SCORED, it is computed on a different estimator from the one registered (§7 defect 6), and both carry the effective-n caveat |
| P7 | raw pooled corr(head, tail) in [0.00, 0.12] | 0.0326 | **HIT**; the registered 0.016 is the model on the top two bands, and on the full zone list it reads 0.0285 (producer SEC I(b)), 12.53% low |
| P8 | detrended pooled \|r\| <= 0.02, permutation null not excluding; no chi² p below 0.01/6 | r = -0.0009, null [-0.0118, 0.0123], p = 0.8920; chi² p 0.3948..0.6461 | **HIT** |
| P9 | Var ratio in [0.97, 1.03]; KS not rejecting at 0.01 | 1.0033, 1.0006, 0.9990; KS p 0.9999, 0.4389, 0.9999 | **HIT** |
| P10 | R0 exact at every zone, equality iff k = 2 | asserted at all 27,292; 1 zone with k = 2 | **HIT** (asserted, not measured) |

P4's BAND holds at 1.39% against a registered 2%; the GROUND registered for it
does not. §1 (P4) grounds the band on `R + 1/2 = 0.5` against `R` near 480, which
predicts 0.1%, fourteen times below the measured offset; §3's 7.5 is a different
mechanism introduced after the run and itself over-predicts the measured 6.05 by
24% (`redteam-0829-measure-b.md` §1c C17).

**Ten hits, one of them half unscored, is a criticism of the pre-registration
rather than a result.** Most of
these bands were calibrated on `zone-tail-01`'s own 1e8 measurements, so they
are interpolations from a smaller sample of the same object rather than blind
forecasts, and a prediction set that scores ten from ten was not risky enough
to have been worth much. Three rows were genuinely at risk and they are the
only ones worth reading as tests: P3, which carried an explicit two-branch fork
with numbers on both branches and where the primary branch won and the
competing branch lost; P5, whose extremal scaling argument produced 5.8 against
a measured 6.840 and would have failed on a slightly heavier tail; and P8,
where a real dependence of the size the "separately attackable" claim would
have to worry about was well inside the detectable range at this n and did not
appear.

**What moved, and by how much.**

1. The unresolved number resolved and shrank. `zone-tail-01`'s t/R = 1.0619
   with a bootstrap containing 1 becomes, on the height-matched comparator at
   17,700 zones, 1.0298 with a bootstrap [1.0156, 1.0443] that excludes 1; and
   on the exactly matched discrete class null, 1.0157 with [1.0013, 1.0308],
   which clears 1 by 0.0013. MEASURED, one sweep, one engine.
2. Q5 is answered in the negative for dependence. r = -0.0009 at 27,292 zones,
   permutation p = 0.8920, variance ratio 1.0006 at 10^4 and 0.9990 at the top
   band, no KS rejection. MEASURED; independence is not proven and the
   simultaneous-extremes regime is untouched.
3. The coefficient's interval tightened by a factor of 4.5 and now contains HL:
   0.7522 [0.7410, 0.7630] against 1/(2 C2) = 0.7574. CONSISTENT WITH, never
   "implies".
4. The head field's effective sample size is measured for the first time:
   1,910 distinct a_first among 17,700 top-band zones. That is a defect
   discovered in this pass which applies to every head interval this corpus
   carries, including `destroyer-census-01.md`'s.
5. The R0 shares move further the way they already moved. head / Z2 / tail of
   the three-piece sum reads 1.94% / 89.37% / 8.69% at 10^3, 1.52% / 92.22% /
   6.26% at 10^4, 1.40% / 92.80% / 5.81% at the top band. The tail's share is
   still falling and Z2's still rising, so filling in the tail row moves the
   decomposition's difficulty nowhere: Z2 was the obstruction before this pass
   and holds more of the sum after it.

**Nothing here is a bound.** No statement in this note constrains any head, any
tail or any Z2 at infinitely many p. The chain's grade is unchanged: TPC-strength
end to end (`zonegap-02-reduction.md` (R1)), and the divergence of
width/(head + Z2 + tail) to 4.3e6 at the top band is the square-window artefact
and is not evidence (`ZONE-POSTULATE.md` §5a).

## 6. Proposed TODO Z4 text (HOLD for the orchestrator)

This note edits nothing. What follows is a proposed replacement for the two
tail clauses of `TODO.md` Z4 (the "First move (tail), half executed" paragraph
and the `Ledger:` line), for the orchestrator to apply or decline.

> The tail field's first per-zone dataset landed 2026-08-28
> (`zone-tail-01.md`, 1,225 zones to 1e8) and the zonegap-01 range followed on
> 2026-08-29 (`zone-tail-02-0829.md`, 27,292 zones to 1e11, HELD;
> `Q-zone-tail-02` ANSWERED). Both halves of Z4's first move have now run and
> neither closes the item. The tail measures c = 0.7522 ln²(p'²) at the top
> band, bootstrap [0.7410, 0.7630], which contains HL's 1/(2 C2) = 0.7574 and
> is CONSISTENT WITH it; the band drift is inside the pre-registered 0.03 per
> step for the first time but is still non-monotone, so no convergence is
> measured. The t/R = 1.0619 surplus that Z4 sent to 1e11 resolves to 1.0298
> on a height-matched comparator, bootstrap [1.0156, 1.0443] excluding 1, and
> to 1.0157 against the exactly matched discrete class null, bootstrap
> [1.0013, 1.0308]: a small measured surplus with a candidate rough-origin
> mechanism that is HEURISTIC and does not fit the head's own excess band by
> band. `z2-state-draft-0829.md` §8 Q5 is answered in the negative: head and
> tail show no dependence at 27,292 zones, detrended r = -0.0009 against a
> null s.e. of 0.0061, permutation p = 0.8920, variance ratio 0.9990 at the
> top band, so the R0 shares are a product structure at the level of first
> and second moments and of the sum's whole distribution, and
> `zonegap-02-reduction.md` §2's "separately attackable" needs no qualifier
> at that level. It says nothing about the simultaneous-extremes regime, which
> is the only regime a bound would use.
>
> What is left on the tail is a derivation, not more zones. One defect
> discovered in the pass is internal to this note and does NOT extend to the
> corpus: the head field's effective sample size is 1,910 distinct a_first
> among 17,700 top-band zones, so this note's own zone bootstrap on c_head
> prices draws the field does not hold. A cluster bootstrap over those 1,910
> clusters (`research/zone-tail-02.js` SEC I(a), seed 613009117) measures the
> inflation at 4.10 and widens the top-band interval from [0.7147, 0.7353] to
> [0.6848, 0.7692], which §1 (P6)'s registered [0.68, 0.78] still contains.
> `destroyer-census-01.md` publishes no bootstrap of any kind,
> `head-residual-factor.js` bootstraps over gaps, `zonegap-01.js` has none and
> `zone-tail-01.js` bootstraps only tail quantities, so no other published
> interval is touched.
>
> Win: unchanged. Two of the three pieces of R0 with DERIVED laws; both now
> have measured laws and neither has a derivation, so the win clause is NOT
> met by either half.
>
> Ledger: Q-head-residual, Q-redteam-0828-census, Q-redteam-0828-head,
> Q-destroyer-census, Q-applied-0828-head, Q-applied-0828-census,
> Q-applied-0828-live, Q-zone-tail, Q-zone-tail-02

Two further registry consequences are proposed and not applied: `Q-zone-tail`
moves from PARTIAL to ANSWERED in `research/QUESTIONS.md`, since the three
things its verdict left open (the unresolved t/R, the unsettled coefficient,
the four order statistics) all have measurements now; and `TODO.md` Z7's queue
item (3), "the per-zone TAIL field data the 1e8 census could not reach", is
discharged by this pass and should be struck from the box queue rather than
waiting for the box.

## 7. Defects, and what would falsify

**Defects in this pass.**

1. **One sweep, one machine, no independent reproduction at 1e11.** Custody
   reproduces `zonegap-01`'s and `zone-tail-01`'s published figures exactly,
   but those cover the 1,225 zones below 1e8, which are 4.5% of these. Above
   1e8 the only external witnesses are A007508 and A113274; neither constrains
   a tail. A second engine at 1e11 is not in the corpus and is the obvious
   red-team target.
2. **The pre-registration is timestamped by disk order, not sealed.** No
   commit was made in this wave. Same standing exposure as `TODO.md` Z0's
   prereg residual.
3. **Ten of ten hits means the bands were too wide.** Stated in §5 and
   repeated here so it is not lost: most of §1's bands were calibrated on
   `zone-tail-01`'s 1e8 measurements of the same object and are interpolations,
   not blind forecasts.
4. **The R comparator is estimated, not exact.** R_shell and R_bin are
   empirical functionals of the same sweep's gaps, so t/R shares its
   numerator's sampling with its denominator's; the bootstrap resamples zones
   and holds the R profile fixed, which understates the interval by an unknown
   amount. The class null does not have this defect (it is exhaustive over
   6.0e9 origins at the top band) and it is the comparator whose interval
   clears 1 by the thinnest margin.
5. **The head columns are over-precise.** See §4's last paragraph: 1,910
   distinct heads at the top band, bootstraps priced at 17,700; a cluster
   bootstrap over distinct a_first (producer SEC I(a), seed 613009117) measures
   the inflation at 4.10 and moves the top-band head interval to
   [0.6848, 0.7692], inside §1 (P6)'s registered [0.68, 0.78] by 0.005.
6. **One estimator deviates from §1, in the head's favour and against the
   note's own precision.** §1 said h/R would be read off the same 20-bins-per-
   decade profile as the tail's. It is not: only about 1,900 twin gaps exist
   across the whole height range [1e5, 3.16e5] that the top band's heads
   occupy, so a single bin there carries a few hundred and the binned h/R would
   have been noise. The producer reads the head's R over the band's whole
   p-range instead, which is the band-wide convention §1 criticised for the
   tail, and the h/R column therefore carries the height-mixing objection that
   the tail's column does not. The forward class null in the same row is
   exhaustive and does not, which is why §3's mechanism paragraph quotes
   h/fwdNull and not h/R.
7. **Bins below 100 gaps are dropped silently in the band totals.** The 10^2
   row of the renewal table uses 23 of 143 zones, and the two lowest decades
   have no usable bin at all. Those rows are carried for continuity and should
   not be read as measurements.
8. **The shell convention omits the gap straddling each zone endpoint.** That
   gap is length-biased (E[g^2 | straddle] = 3 E[g^2] for exponential gaps), so
   R_shell is biased DOWN by about one part in 2 x 11,000, that is 3e-4, at the
   top band; the producer's own header quotes 1.6e-4 from a coarser count of
   gaps per shell, and the two bracket the same order. Either way it is below
   the fourth digit, it is stated rather than corrected, and it pushes t/R UP,
   in the direction of the surplus this note reports.

**What would falsify the readings.**

- The coefficient: a second engine at 1e11 measuring c_local at the top band
  outside [0.7410, 0.7630], or the next decade to 1e12 (`zonegap-03-prereg.md`
  has the sealed apparatus) putting it outside that interval, would refute the
  "consistent with HL" reading. That check has NOT run.
- The surplus: the exactly matched class null clears 1 by 0.0013. A single
  additional decade, or an independent engine, moving t/classNull below 1.000
  refutes it outright; a bootstrap that resamples the gap process as well as
  the zones may do so without any new data, and that check has NOT run.
- The rough-origin mechanism: it predicts the tail's excess and the head's
  excess against their own exactly matched class nulls should agree. They read
  1.0157 and 1.0266 at the top band and disagree in ordering at 10^3 and 10^4.
  A derivation that predicts the observed disagreement would support it; the
  present state is that the mechanism is HEURISTIC and unfitted.
- The joint law: the null result is at the resolution 0.006. A dependence of
  size 0.01 would need about 100,000 zones (X = 1e12) to detect, and the
  simultaneous-extremes question needs an entirely different statistic
  (a joint exceedance count, not a correlation), which this pass does not
  compute.
- R0 and the label: every claim here is (i). Any (ii) reading, a bound below
  the width on head, tail or Z2 at infinitely many p, would be refuted by this
  note's own §5 closing paragraph, which states that none is made.

**NOT REACHED.** No derivation of c_tail. No extremal law and no Kourbatov
comparator for the tail. No joint-exceedance statistic. No forward class null
for the head above height 4e5 (the accumulator is capped there because head
heights never exceed sqrt(X)), so the head's excess cannot be extended past
p = 316219 without a wider sweep. No second engine at 1e11. No red team.
