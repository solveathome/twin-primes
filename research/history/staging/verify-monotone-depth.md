# Adversarial verification of the Monotone Depth obstruction

<!-- ledger
id: Q-verify-monotone-depth
status: ANSWERED
todo: 0e (retired)
question: Does the Monotone Depth obstruction, which retires dial 4, survive an adversarial re-derivation?
verdict: NARROWED: every measurement in the record reproduces, several to the last digit, but the mechanism as named is false as a general law and the corpus already holds a counterexample to it; what survives is an accounting of three channels priced in tenths of a nat against a need of 6.700, 8.191 and 9.637 nats, so dial 4 becomes priced slack with one channel open and unpriced.
-->

*2026-08-19. Independent check of the held closure in
`research/history/staging/attack-0c0e-level-selection.md` (producers
`research/attack-0c0e-01-deleted-family.js`, `research/attack-0c0e-02-level-selection.js`).
Brief: break it if possible; the closure retires `THE-DIALS.md` dial 4 and
TODO item 0e. Everything below was recomputed from scratch in scratch code that
does not share a line with either producer, except where marked. Legend as in
the record. Gate `node research/qc.js` TOTAL = 2 before and after this file, both
findings pre-existing and in `uframe-repro-01/02`, neither touching 0c×0e.*

**Verdict: NARROWED.** Every measurement in the record reproduces, several to
the last digit. The mechanism as *named* does not survive: "an infinitely-often
licence is worth the oscillation amplitude of the quantity it licenses" is false
as a general law, and the corpus already contains a counterexample to it. What
survives is an accounting of three channels, each priced in tenths of a nat,
against a need of 6.700, 8.191, 9.637 nats at x = 23, 43, 79. Dial 4 stops being
"free slack with no known mechanism" and becomes "priced slack, three channels
closed, one channel open and unpriced".

---

## 1. What reproduced exactly

Recomputed here, independent code, no shared lines with the producers:

| record's claim | recomputed | agree |
|---|---|---|
| `max_a Δ_1 = G₂(x'#)` at folds 7, 11, 13, 17, 19, 23 | 42, 66, 108, 150, 204, 258 | YES, 6 of 6 |
| max/mean at `T_11..T_23` | 1.0214, 1.0515, 1.0349, 1.0742, 1.1026 | YES, all five |
| argmax counts 2, 12, 10, 11, 3, 2 and the sets {5,7}, all-but-11, {5,10,19}, {2,15} | identical | YES |
| the floor table `min_a/G₂`, `mean_a/G₂`, `max_a/G₂` | identical to four places | YES |
| `Δ_1 ≥ G₂(x#)` for every alignment | holds at every cell | YES |
| amplitude `inf 3.1837 @ x=37`, `sup 4.3788 @ x=13`, 0.3187 nats | identical | YES |
| five-level windows 0.2700 … 0.0865 | identical, all fourteen | YES |
| control detrended 0.2175 (x = 11..79) and 0.1372 (x = 83..271) | identical | YES |
| G₂ ladder detrended the same way, 0.2744 | identical | YES |
| oracle ceiling 0.1467 above trend, span 0.3293 | identical | YES |
| `x'−x ≥ 6` scores +0.0543 nats | identical; exact enumeration of all 18564 six-subsets gives p = 0.0232 against the record's Monte-Carlo 0.0239 | YES |
| `(4.2665−2)·ln θ(x)` = 6.700, 8.191, 9.637 | identical | YES |
| the 14 in-repo ladder terms against A144311 + 1 | agree at every term | YES |

Nothing in the arithmetic is wrong. The corrections below are all about what the
numbers are allowed to mean.

---

## 2. Probe (a): the licence-value argument is about the TRUTH only, and its
## general form is refuted by an instrument already in the corpus

**The formalization the record needs, written out.** A route is a proof scheme
that supplies, at levels `x` in some set `S`, a bound `B(x) ≥ G₂(x#)`. Write
`thr(x) = x'² − 2` and split

> `B/thr = C(x) · T(x)`, where `C = B/G₂ ≥ 1` is the **instrument slack** and
> `T = G₂/thr` is the **truth**.

A uniform route needs `sup_S ln(C·T) < 0`; an i.o. route needs `inf_S ln(C·T) < 0`.
The licence is therefore worth

> `amp( ln C + ln T )`, which is `amp(ln T)` **only when `C` is constant in `x`**,
> and which is bounded by `amp(ln C) + amp(ln T)` in general.

The record measures `amp(ln T) = 0.3187` nats and calls that the value of the
licence. That is the value **for a route whose looseness does not vary with the
level**. It is not an upper bound over routes. [PROVEN, one line]

**A counterexample is on file.** `U-FRAME.md` §5a step 3 carries the instrument
`G₂(new) ≤ maxsum_{L+1}(old)`, verified at 329 cells. Its slack at the seven
ladder folds (`a3-10-lower-tightness.js` §1 custody table) is

> `C = 1.0000, 1.0000, 1.4545, 1.2778, 1.1200, 1.1176, 1.1628` at p = 7..29,

so `amp(ln C) = ln(1.4545) = 0.3747` nats, **larger than the truth's 0.3187**.
An argument spending the licence on that instrument, selecting the folds where
its own bound is exact, gains 0.37 nats over its own uniform version, and that
gain has nothing to do with where the truth is generous. The record's own §4.3
measures a second instrument slack (the alignment max over the mean, 2 to 11
percent, 0.076 nats of spread across `T_11..T_23`) and never adds it to the
price either. **The two entrances of §1.4 are priced separately and the total is
never taken.** [VERIFIED, from corpus numbers]

**The smooth-instrument case comes out the record's way.** For `B = c·x^β` the
i.o. gain is the range of `ln(x'²/x^β)` after its own trend, which is `2·range
ln(x'/x)`, 0.2931 nats over x = 11..79 and tending to 0 by the prime number
theorem. That is exactly the already-dead large-gap mechanism, re-derived from a
different direction, and it confirms the record: no power-law instrument gains
anything asymptotically. [VERIFIED]

**So what is closed and what is not.** Closed: spending the licence on the
oscillation of the truth (priced, 0.3187 nats, falling); spending it on a
power-law instrument (vanishing); spending it on the alignment max (§4.3, and
see §5 below for what that fit does and does not show). Open, and untouched by
anything in the run: **a method whose bound is sharp at infinitely many levels
and loose elsewhere.** The licence is what makes such a method admissible at
all, so its value is not a number of nats and cannot be measured by looking at
`G₂`. The record has an instance of exactly this shape on file and classifies it
as "not a mechanism for dial 4": Heath-Brown's dichotomy selects the levels
where its instrument (a Siegel zero) exists, not the levels where the truth is
generous. That is the class the obstruction does not reach.

---

## 3. Probe (b): the amplitude survives, the convention was the right one, and
## the falling half rests on imported terms

**Convention.** Link A puts the zone at `(x, x'²)`, so `x'²` is the correct
denominator and the producer states it in the header. Priced three ways:

| threshold | inf | sup | nats, x ≥ 11 |
|---|---|---|---|
| `x'²` (the record) | 3.1837 @ 37 | 4.3788 @ 13 | **0.3187** |
| `x'² − 2` (Link A's literal form) | 3.1799 @ 37 | 4.3485 @ 13 | 0.3130 |
| `x²` (the `qc/units.js` §3 trap) | 2.4067 @ 19 | 3.6497 @ 79 | 0.4164 |

The wrong convention would have inflated dial 4 by 31 percent and put the
extreme at the top of the ladder, which would have read as a rising amplitude.
The record picked the right one and the number is robust to the `−2`. [VERIFIED]

**The falling trend is real within range and not a quantisation artifact.** One
step of `G₂` is 6, worth 0.0870 nats of margin at x = 13 and 0.0043 at x = 71,
so the top windows read about 20 quanta and the bottom about 3: coarseness
cannot manufacture the fall. Residual variance about the common trend falls by a
factor 5.68 between x = 11..43 and x = 47..79 (sd 0.1038 against 0.0436),
permutation p = 0.0054 over 100000 shuffles, and the fall is steeper than the
growth law's `1/√(ln D)` expectation (observed sd ratio 2.38 against a predicted
1.68). [VERIFIED]

**Three things the trend does not establish.** First, the last three five-level
windows are the *same two levels*: the sup is x = 61 and the inf is x = 71 in
all of 53..71, 59..73 and 61..79, so "0.0865 nats at the top" is one pair, not
three readings. Second, every window above x = 43 is built entirely from
A144311's terms 15 to 22, which `G2-STATE.md` line 902 records as "ours to
verify, not to claim". The static headline 0.3187 comes from our own terms
(x = 13 and x = 37) and is clean; **the falling half of the closure inherits
A144311's custody**, and should carry that tag. Third, 18 levels with
overlapping windows exclude nothing asymptotic: the data are equally consistent
with an amplitude decaying like `1/√(ln D)` and with a small constant one. What
the range does establish is a ceiling: over every exactly-known level the
amplitude never exceeded 0.35 nats.

---

## 4. Probe (c): the circularity is conditional, and the route dies either way

Link B is **VERIFIED 40/40**, not proven, and it carries the measured clause "no
straddling window ever beats a single-copy one" (`U-FRAME.md` §5a step 2,
`a3-04-maxsum-recursion.js` reading 8). The record's §1.4 tags the circularity
`[PROVEN, immediate from Link B]`, which is right as a deduction and reads as
unconditional. It should read `[PROVEN given Link B, which is VERIFIED with a
measured no-straddling clause]`.

The conclusion is robust to the clause failing, and it is worth writing down why.
The chain needs `G₂(x'#) ≤ max_a Δ_1`, which is the no-straddling direction; the
circularity needs the reverse as well. If the reverse fails, `(H)` is *strictly
stronger* than the conclusion and the route is worse than circular. If the
forward direction fails, Link B fails and the chain does not close at all. Both
failure modes kill the route, so the leg stands under either outcome. [PROVEN]

---

## 5. Probes (d) and (e): the rule hunt, honestly corrected, and depth

**Multiple comparisons.** Eleven rules were tried. Re-scored here by exact
enumeration rather than sampling, under four detrendings (least squares on
`ln x`, on `x`, on `ln G₂`, and no detrending at all), `x'−x ≥ 6` gains 0.0525
to 0.0562 nats at p = 0.0182 to 0.0269: the effect is not an artifact of the
detrending choice. But the family-wise null (20000 permutations, best-of-eleven
statistic, sets fixed) gives **p_FWE = 0.1396 on the G₂ ladder**, so the single
p = 0.0239 does *not* survive the eleven rules that were tried. On the 54-level
one-class control the same statistic gives **p_FWE = 0.0072**, so the effect is
real, and the record's reading is right for the wrong reason: what carries the
finding is the control's length, not the G₂ ladder's p-value. [VERIFIED]

This cuts in the closure's favour twice over. The one rule with a signal is
still the already-dead large-gap mechanism, and its honest size is 0.033 nats on
the long ladder against `ln 3`.

**The oracle ceiling reproduces** at 0.1467 nats above trend, span 0.3293, and
it does bound the whole rule space on the measured column, cheating included.

**One correction to leg 2 of the verdict.** The record reads prediction (a) as
"SHAPE RIGHT, LEVEL WRONG". On the tile the shape is not right: max/mean over
`T_11..T_29` correlates with `ln x` at **r = +0.657** (and +0.857 over
`T_11..T_23`), that is it **rises** over the exact range, while the predicted
extreme-value share falls from 1.2614 to 1.0895. The claim that the alignment
advantage vanishes like `ln x / x` on the tile rests entirely on the localized
census fit of §4.3, which is off-diagonal, has coefficient 1.7965 rather than 1
and intercept −0.1347 rather than 0, and which the record itself calls "a shape
and not a law". The honest statement of leg 2 is: **worth 2 to 11 percent over
the exact range, direction on the tile not established, direction in the census
falling at 10 of 13 levels.** The leg still closes its question, because 11
percent is 0.10 nats against 6.7, but the wording overstates its support.

**Depth is not a modulus, and the argument can be made stronger than
[INFERRED].** For an upper bound the modulus set carries no freedom at all, and
this is a one-line proof rather than an inference: deleting the classes of one
more prime can only merge gaps, so the max gap is **non-decreasing under
inclusion of the sieve set**. A bound proved for any proper subset of the primes
`≤ x` is therefore a bound on a *smaller* quantity and says nothing about
`G₂(x#)`. The same one line proves the monotonicity of `G₂` in `x` that §5
obstacle 2 asserts from the data. The variant "sieve different moduli subsets
per level" is dead on arrival for upper bounds, and the surviving
modulus-selecting technology (well-factorable, smooth, densely divisible moduli)
selects moduli of a distribution estimate rather than depths of our sieve, which
is dials 6 and 7 exactly as the record says. No overclaim found in §5, and the
[INFERRED] tag on obstacle 1 undersells it. [PROVEN]

**The name oversells one leg.** Monotonicity of `G₂` is not what bounds the
licence. A monotone `G₂` against a monotone `x'²` is compatible with an
arbitrarily large oscillation of the ratio; what bounds the licence is the
measured flatness of that ratio, 18 exact terms and a 54-term control. The
monotonicity leg is load-bearing only against the pigeonhole-on-an-average
import, which is where §5 puts it. In the headline it reads as though
monotonicity implies the price, and it does not.

---

## 6. What dial 4 and TODO 0e should say

Dial 4 stops being free slack and stops being a general obstruction. It is
**priced slack with one unpriced channel left**. Priced and closed: the truth's
own oscillation, 0.3187 nats over the exact ladder, falling to 0.0865 in the top
windows on imported terms, with a 54-term control agreeing at 0.2175 and 0.1372;
the alignment max over the mean, 2 to 11 percent, whose census carrier is
`1/ln S`; any power-law instrument, whose gain is `2·range ln(x'/x) → 0`, which
is the large-gap mechanism already dead; and the BV-shaped import, which cannot
be built because the depth of a sieve carries no freedom for an upper bound.
Open: a method whose bound is sharp at infinitely many levels and loose
elsewhere. Nothing here prices that, because its value is not an amplitude of
`G₂`; the only known instance of the shape is Heath-Brown's dichotomy, and the
corpus's own `maxsum_{L+1}` instrument already oscillates by 0.3747 nats, more
than the truth does, which is the proof that instrument slack is a separate and
larger channel than truth slack.

---

## 7. NOT REACHED

- `T_29` and `T_31` of the deleted family were not recomputed here. The
  independent reproduction covers folds 7 through 23; the `T_29` row of the
  record's table (a) and its `max_a Δ_1 = 348` are unchecked by this pass.
- No level above `T_23` and no `m > 1` were computed independently.
- The A144311 terms 15 to 22 were not verified, here or anywhere in the repo.
  They are the whole support of the "and it falls" half of the closure.
- The literature residual the record itself records (MathSciNet and zbMATH
  channels of `SEARCH-CONVENTIONS.md` §5 not run on the exceptional-set query)
  was not closed here either.
- The instrument-slack channel is identified and exemplified, not surveyed. No
  attempt was made to enumerate methods whose slack oscillates, or to bound how
  much such a method could gain.
- Scratch code lived outside the repo and is not embedded; every number above is
  either reproduced from an embedded producer or recomputed from the ladder and
  the tile, both of which are reconstructible from `research/exact-g2-ladder.js`
  and the fold construction in `U-FRAME.md` §5a step 1.
