# The provenance split of the 1.50 exponent, and what flags x = 37 without G₂ in it

<!-- ledger
id: Q-g2-provenance-x37
status: ANSWERED
todo: 0
question: Does the headline G2 exponent depend on the eight terms this repository has never reproduced, and does any instrument without G2(37#) inside it flag x = 37?
verdict: MEASURED, both largely negative: the custody-only refit lands at 1.533 against the headline 1.498 and no provenance-block drop moves the corrected central by more than 0.035 (Ghat(64) alone moves it 0.002), while no G2-free instrument flags 37 in the high direction, the one |z| past 2 being h(37#) at -2.20 in the low direction and range-dependent; the blind extreme-value forecast of G2(37#) does overshoot at z = +6.58, unexplained.
-->

*(2026-08-29. HELD. Producers: `research/measure-g2-provenance-0829.js`,
`research/measure-x37-0829.js`. Internal note under the publication moratorium.)*

## 0. What is open first

Neither half of this note touches the exponent band. The band on the two-class
exponent is `(2, 4.26645]` as a proof gap (`G2-STATE.md` §3a) and every number
below is a MEASURED refit of the same 22-term ladder that already produced the
headline, so the strongest possible outcome here is a statement about how much of
a measurement rests on unreproduced data. Both questions were labelled (i) in
`object-g2-read-0829.md` §6 C4 and §8 Q4/Q6: descriptive measurements of a finite
ladder with no bearing on the exponent.

Three limits that travel with everything below.

- **The estimator is known to be wrong at these sizes.** The same log-log slope
  run on 58 terms of the one-class control, whose true exponent is 1, reports
  1.282 (`exponent-control.md` §1). Every corrected central below is a raw fit
  minus a control bias measured at matched window width, and the systematic on
  that transfer is unquantified.
- **The blocks are not the sizes the brief carried.** Reading A144311's own
  provenance line (`a144311-full-ladder.js` header), Carter 2008 owns a(1)-a(7),
  Alekseyev 2009 owns a(8)-a(16) and Wang 2024 owns a(17)-a(22). The custody
  ladder (`exact-g2-ladder.js`) independently covers a(1)-a(14), x = 2..43. So
  the split by what this repository has NOT reproduced is 14 custody, 2
  Alekseyev-only (x = 47, 53) and 6 Wang-only (x = 59..79), not six and six.
- **The x = 37 instruments are not independent and were never claimed to be.**
  All three signs in `G2-STATE.md` §2 are ratios carrying G₂(37#) = 528, so the
  question is only whether anything without 528 in it also reads high at 37.

## 1. Pre-registration, written before either producer ran

Registered on disk before `measure-g2-provenance-0829.js` and
`measure-x37-0829.js` existed. Custody caveat: timestamped by disk order within
this session, not sealed.

**P1 (provenance split).** The custody-only corrected central lands within
±0.15 of the headline 1.50, and dropping any single provenance block moves the
corrected central by less than 0.26, the control's own bias at these widths.
*Falsifier:* a block-dependent corrected central outside that band, which would
say the headline depends on terms this repository has never reproduced.

**P2 (Ĝ(64)).** Dropping x = 61 alone, the term Ĝ(64) = 1080 that rests on
Wang's a(18) and that carries item D's eventual-form trap window
(`G2-STATE.md` §3a), moves the corrected central by less than 0.05.
*Falsifier:* a move of 0.05 or more from one term.

**P3 (x = 37).** No instrument free of G₂(37#) flags x = 37 beyond |z| = 2,
where z is the standardised residual of that instrument at 37 against a fit or a
local neighbour window declared in the producer.
*Falsifier:* any G₂-free instrument reading |z| ≥ 2 at x = 37, which would make
the coincidence arithmetic rather than one high draw seen three ways.

**P4 (Poisson window).** The blind extreme-value forecast of G₂(37#) from terms
x ≤ 31 alone brackets the true 528, by the machinery that bracketed G₂(41#) at
476 to 633 (`G2-STATE.md` §9 item 6, `maxgap-law.md` §4).
*Falsifier:* 528 outside the forecast band, which would make 37 anomalous
against the law rather than against its neighbours.

## 2. Custody: the headline reproduced digit for digit

Nothing new was computed until `exponent-control.md`'s own figures came back
from a fresh implementation of its estimator. `measure-g2-provenance-0829.js`
S1 reproduces all of them.

| quantity | `exponent-control.md` | here |
|---|---|---|
| pilot fits h[5,37], h[5,271], G2[5,37] | 1.191, 1.282, 1.801 | 1.191, 1.282, 1.801 |
| S11 raw fit, 22 terms, x-frame | 1.777 ± 0.029 | 1.777 ± 0.029 |
| S11 raw fit, theta-frame | 1.647 ± 0.021 | 1.647 ± 0.021 |
| control, width 20, 64-term h, x-frame | 45 windows, mean 1.279, sd 0.052 | 45 windows, mean 1.279, sd 0.052 |
| control, width 20, theta-frame | 45 windows, mean 1.218, sd 0.046 | 45 windows, mean 1.218, sd 0.046 |
| corrected, x-frame / theta-frame | 1.498 / 1.429 | 1.498 / 1.429 |
| practical bracket | [1.39, 1.78] | [1.39, 1.78] |

So the quoted 1.50 ± 0.05 is the rounding of a corrected central 1.498 with the
control's own window sd 0.052, and it is reproducible from the arrays alone.
`measure-x37-0829.js` S4 adds a second custody gate on the other half: the
eight-term c₂′ set x = 11..37 forecasts G₂(41#) at band [476, 633] with central
513, which is `G2-STATE.md` §9 item 6's published band digit for digit.

Two transcription guards are hard asserts in the producers and both pass: the
22-term trusted ladder agrees with the 14-term custody ladder term for term, and
every applicable A144311 term satisfies the entry's own a(n) = 5 mod 6.

## 3. The provenance split

MEASURED, `measure-g2-provenance-0829.js` S2. The estimator, the exclusion of
p = 2 and p = 3, and the control correction (the mean of every contiguous
sliding window of the matched point count over the 64-term h ladder) are
`exponent-control.md`'s, unchanged.

| set | n | contiguous | raw a | control bias | corrected | vs headline |
|---|---|---|---|---|---|---|
| custody only, x = 5..43 | 12 | yes | 1.801 ± 0.056 | +0.268 | **1.533** | +0.035 |
| custody + Alekseyev, x = 5..53 | 14 | yes | 1.798 ± 0.045 | +0.273 | **1.525** | +0.027 |
| all 22 trusted, x = 5..79 (headline) | 20 | yes | 1.777 ± 0.029 | +0.279 | **1.498** | 0 |
| drop custody block, x = 47..79 | 8 | yes | 1.725 ± 0.067 | +0.260 | 1.465 | −0.033 |
| drop Alekseyev block | 18 | no | 1.775 ± 0.031 | +0.278 | 1.498 | −0.000 |
| drop Wang block (= custody + Alekseyev) | 14 | yes | 1.798 ± 0.045 | +0.273 | 1.525 | +0.027 |
| drop x = 61 only, Ĝ(64) = 1080 | 19 | no | 1.778 ± 0.030 | +0.278 | 1.500 | +0.002 |
| the briefing's split, drop last six | 17 | yes | 1.781 ± 0.035 | +0.278 | 1.503 | +0.006 |

Leave-one-term-out over all twenty fitted terms, corrected at matched width 19:
the correcteds run 1.478 to 1.536 and the largest single-term move from the
headline is +0.038, at x = 7. Dropping Ĝ(64) alone moves it by +0.002, so item
D's eventual-form trap window and the headline exponent do not share a
dependence on Wang's a(18).

**The caveat that limits the whole table, and it is larger than the table's own
spread.** The same eight index sets run on the one-class control, whose true
exponent is 1, return corrected values from 0.932 to 1.233 (S5). The G₂ rows
return 1.465 to 1.533. The estimator's sensitivity to which range it is handed
is therefore wider than the entire provenance effect, and provenance block and
fitted range are confounded on twenty points. What this measures is that no
provenance effect is visible above that floor, not that none exists.

A convention cost, recorded because it is bigger than the effect: correcting
with the single control window over the same index range instead of the
matched-width distribution mean gives 1.601 custody-only, 1.532 for the headline
set and 1.232 for the eight external terms. `exponent-control.md` §1 already
rules that a single window is one draw from a distribution and the distribution
mean is the central, so the width-matched column is the one quoted here.

## 4. x = 37 without G₂ in the instrument

MEASURED, `measure-x37-0829.js`. Standardisation is declared in the producer:
for each instrument the log-linear trend in ln x is fitted over all available
levels **excluding** x = 37, and z is the residual at 37 divided by the rms
residual of that leave-37-out fit. Fitting without the point under test is what
stops one outlier inflating its own denominator.

**The three instruments already on record, all carrying G₂(37#) = 528:**

| instrument | value at 37 | n | z |
|---|---|---|---|
| G₂/h | 8.0000 | 19 | **+3.01** |
| c₂′ = G₂/(m₂·lnD) | 0.5939 | 17 | **+4.57** |
| h₂/G₂ | 1.3409 | 18 | −1.65 |

**Everything free of G₂(37#):**

| instrument | value at 37 | n | z |
|---|---|---|---|
| h(37#) itself, x ∈ [5, 79] | 66 | 19 | −1.08 |
| h(37#) itself, x ∈ [5, 311] | 66 | 61 | **−2.20** |
| h₂(37#) itself, x ∈ [5, 73] | 708 | 18 | −0.63 |
| c₁ = h/(m₁·lnD₁), x ∈ [11, 79] | 0.3540 | 17 | −0.82 |
| c₁, x ∈ [11, 311] | 0.3540 | 59 | −1.35 |
| c₂ = h₂/(m₂·lnD), x ∈ [11, 73] | 0.7964 | 16 | −0.98 |
| h₂/h | 10.7273 | 18 | +0.07 |
| step exponent into 37, h | 0.730 | 19 | −0.85 |
| step exponent into 37, h₂ | 1.225 | 18 | −0.90 |
| fold-37 transport ratio (CITED, `Q-frontier37`) | 0.9477 | 8 folds | on the trend, no spike |

Nothing G₂-free reads high at 37. The single reading past |z| = 2 is h(37#)
itself at −2.20, in the **low** direction, and it is range-dependent: the same
reading against the range-matched ladder x ≤ 79 is −1.08. Nine instruments were
read with no multiple-comparison correction, so a single 2.20 is not a flag.

Two consequences for how the record should read. First, G₂/h = 8.00 is a ratio
with a low denominator as well as a high numerator: c₂′ puts G₂ at +4.57 against
its own census normaliser while c₁ puts h at −0.82 to −1.35 against its own. So
the 8.00 overstates a G₂-side effect. Second, at the neighbour scale nothing is
discontinuous: the step exponents into 37 are 0.730, 1.225 and 2.356 for h, h₂
and G₂ against ladder means 1.718, 2.236 and 1.994, which reproduces
`exponent-control.md` §7 item 2 (37 is an outlier in c₂′, not in the local
exponent).

**The blind Poisson forecast, and it is the one reading that does flag 37.**
Run from the seven trailing levels only, the extreme-value window of
`maxgap-law.md` §4 predicts G₂(37#) in [397, 445] with central 414 against an
actual 528, z = +6.58. x = 37 is the only level outside its own band among the
eleven that carry one, rank 1 of 11 by |z|; the seven-term trailing window means
the other eleven levels of the 22-term ladder have no band at all.

Three things hold that reading down.

- The band is not calibrated. The identical rolling forecast breaks its band at
  four of ten levels on h₂ and five of eleven on h. What the controls do not
  produce is a residual near +6.58: their largest are +2.96 (h₂ at x = 47) and
  +2.40 (h at x = 71).
- c₂′ drifts upward (`Q-c2prime-drift`, PARTIAL), so a trailing forecast
  under-predicts by construction. The post-37 G₂ rows centre above zero (+0.65,
  +0.07, −0.13, +0.47, +0.05, −0.26, +0.50, +1.00, +0.59, +0.97). The size of
  that effect is computable, and the red team computed it: the seven-term window
  has mean 0.4653 and sd 0.0196, the ten post-37 levels have mean 0.5118 and sd
  0.0159, which puts 37 at z = +5.18, and all seventeen non-37 levels x = 11..79
  have mean 0.4926 and sd 0.0290, which puts it at z = +3.49. Drift and window
  width together account for about half the 6.58, and about 3.5 survives
  (MEASURED on independent code, `redteam-0829-measure-a.md` §5 M4).
- The instrument is not independent of the three above. Its residual **is**
  G₂(37#) against a census-normalised prediction, which is the c₂′ spike with a
  sharper denominator, not a second witness.

## 5. Readings against the pre-registration

Two of the four registered predictions held, one is falsified on its letter and
held on its substance, and one is falsified outright.

**P1 HELD.** MEASURED. The custody-only corrected central is 1.533 against the
headline 1.498, a move of +0.035 where ±0.15 was registered, and the largest
block-drop move is 0.035 where 0.26 was the registered threshold, the control's
own bias at these widths measuring 0.279.
The headline exponent does not depend on the eight terms this repository has
never reproduced, at the resolution this estimator has. The qualification that
travels with it: the same index sets on the one-class control spread 0.932 to
1.233, so the instrument cannot resolve a provenance effect smaller than about
0.3 in any case.

**P2 HELD.** MEASURED. Dropping x = 61, the term Ĝ(64) = 1080 that rests on
Wang's a(18) and carries item D's eventual-form trap window, moves the corrected
central by +0.002 where 0.05 was registered.

**P3 FALSIFIED ON ITS LETTER, HELD ON ITS SUBSTANCE.** The registered falsifier
was any G₂-free instrument at |z| ≥ 2, and h(37#) = 66 reads −2.20 against the
61-term one-class ladder, so the falsifier fires as written. What it fires on is
the opposite sign to the question: 37 is flagged as a level where the *one-class*
gap is small, not where a two-class object is large, and the same instrument
reads −1.08 on the range-matched ladder, so the 2.20 is a choice of comparison
range as much as a signal. Nine instruments were read without a
multiple-comparison correction. The substantive claim, that nothing G₂-free
flags 37 in the high direction, stands: the other six G₂-free readings run
−1.35 to +0.07.

**P4 FALSIFIED.** MEASURED. The blind seven-term extreme-value forecast puts
G₂(37#) in [397, 445] and the actual is 528, z = +6.58, the only level outside
its own band among the eleven that carry one; the seven-term trailing window
means the other eleven levels of the 22-term ladder have no band at all. The
pre-registration was wrong about this and the record should say so. What it does not license is calling 37 an
arithmetic irregularity: the instrument's residual is G₂(37#) itself against a
census normaliser, which is the c₂′ spike restated, and the same forecast is
uncalibrated on both control ladders.

**The verdict on Q4, calibrated.** MEASURED: the three signs at x = 37 are one
high draw of G₂ seen three ways, sharpened in one of the three views by a low
h(37#). No instrument free of G₂(37#) flags 37 in the high direction, and the
fold-L instruments at fold 37 sit on their own trend (CITED, `Q-frontier37`).
What stays OPEN is the size of the draw: +6.58 against the extreme-value law
fitted on its own predecessors is larger than anything the two control ladders
produce, and nothing here explains it.

## 6. Proposed edits to G2-STATE (HOLD for the orchestrator)

Nothing below is applied. Both edits are one sentence each.

**§2, the sentence after the h₂/G₂ bullet.** The current text names x = 37 as
the low outlier of the h₂/G₂ column at 1.341, then adds that it is the same
level spiking G₂/h and c₂′, and concludes that three instruments now point at
x = 37 as a G₂-side anomaly. Proposed replacement for everything after "1.341":

> the same level that spikes G₂/h and c₂′. The three are not independent: all
> three are ratios carrying G₂(37#) = 528, and of nine instruments free of that
> value none reads high at 37, the largest being h(37#) itself at z = −2.20 in
> the low direction and −1.08 on the range-matched ladder (MEASURED,
> `history/staging/measure-g2-provenance-0829.md` §4). What survives is one
> object: G₂(37#) overshoots a blind seven-term extreme-value forecast by
> z = +6.58, the largest such residual on any of the three ladders, and that
> overshoot is unexplained.

**§6.1, after the reading table.** Proposed addition:

> The headline does not rest on the eight trusted terms this repository has not
> reproduced. Refitting by provenance block with the same estimator and the same
> matched-width control gives 1.533 on custody terms alone, 1.525 on custody
> plus Alekseyev, 1.465 on the eight external terms alone and 1.500 dropping
> Ĝ(64), against 1.498 on all 22 (MEASURED,
> `history/staging/measure-g2-provenance-0829.md` §3). The same index sets run
> on the one-class control spread 0.932 to 1.233, so the split is a null against
> a floor set by the estimator's own range sensitivity, not a demonstration of
> independence.

§9 item 6's Poisson band machinery is reproduced exactly and needs no edit. No
change is proposed to §3a.

## 7. Defects, and what would falsify

**Defects in what is above.**

1. **Provenance and range are confounded.** Every block is also a range, and the
   control shows the estimator moving 0.30 across the same ranges on an object
   whose exponent is 1. No design on twenty points separates them. This is the
   binding limit on §3.
2. **Non-contiguous corrections are approximate.** Two rows of §3 fit index sets
   that are not contiguous in p while every control window is, so those two are
   matched on point count only. Both land within 0.002 of the headline, so
   nothing turns on it here.
3. **The rolling forecast's windows overlap the point they later test.** The
   trailing windows for x = 41 through 61 contain x = 37, so the post-37 z
   column in §4 is deflated by the very draw under test.
4. **No multiple-comparison correction anywhere.** Nine instruments at x = 37,
   eight provenance sets, twenty leave-one-out fits. A single |z| = 2.2 in that
   family is expected.
5. **The n = 8 external-only fit is an orientation, not a reading.** Its own
   control row reads 1.233 against a truth of 1.
6. **The provenance blocks are not the briefing's.** A144311's entry gives
   Carter a(1)–a(7), Alekseyev a(8)–a(16) and Wang a(17)–a(22), and the custody
   ladder independently covers a(1)–a(14), so the never-reproduced set is 2
   Alekseyev-only terms and 6 Wang-only terms, not six and six. Both splits are
   in the table.

**What would falsify the claims made here.**

- *That the headline is provenance-independent:* a corrected central on any
  provenance block outside 1.3 to 1.8, or an in-house exact G₂(47#) that
  disagrees with A144311's a(15) = 707. The second is the only decisive test and
  it is priced at 1.49 days per run (`Q-g2-43-term`), out of session reach.
- *That nothing G₂-free flags 37:* any instrument constructed without G₂(37#)
  reading |z| ≥ 2 in the **high** direction, on a comparison range fixed before
  the reading. The candidates not tried here are the fold ledger's own columns
  at fold 37 beyond the transport ratio, and the discrepancy channel at 37.
- *That the +6.58 overshoot is a draw rather than structure:* an exact G₂(47#)
  or G₂(53#) landing outside its own blind band would say the law's residuals
  are heavier than the two control ladders suggest; ten trusted terms landing
  inside, which is what §4 already shows for x = 41..79, is the evidence that it
  is a draw and it is not conclusive.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed by document.*
