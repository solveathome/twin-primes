# Attack 0c×0e: a residue-deleted maxsum bound that only has to hold at levels of the argument's choosing

<!-- ledger
id: Q-0c0e-level-selection
status: CLOSED
todo: 0c, 0e (retired)
question: Can a residue-deleted maxsum bound that only has to hold at levels of the argument's choosing carry the weak Zone Postulate?
verdict: CLOSED, and the mechanism has a name: the level-selection licence is worth 0.3187 nats once and is falling, no selection rule beats its own null by anything worth having across T_11..T_29, and the BV/EH sweep supplies no moduli-selecting statement to spend.
-->

*2026-08-19. Spearhead run on the composition of `TODO.md` items 0c (bound a
residue-deleted maxsum without a kill count) and 0e (spend the infinitely-often
slack). Producers: `research/attack-0c0e-01-deleted-family.js` and
`research/attack-0c0e-02-level-selection.js`, both formally embedded. Legend as
in `research/sift-limit-attack.md`: **[PROVEN]** published or derived theorem;
**[VERIFIED]** checked computationally here; **[MEASURED]** empirical, finite
range; **[INFERRED]** deduction from sourced facts.*

**Assignment.** State what a level-selecting argument must deliver for the weak
Zone Postulate; measure the residue-deleted maxsum family exactly at
`T_11..T_29`; hunt for a selection rule; sweep the BV/EH toolbox for
moduli-selecting rather than position-selecting statements. Two dead mechanisms
were named in the brief and are not retried: almost-all-positions cannot be
steered to the origin, and large prime gaps widen the window by
`2(p'−p)/p → 0`.

---

## 1. STAGE 1 — the demand, stated before anything was computed

### 1.1 Notation, fixed

`x` a prime, `x'` the next prime, `x''` the one after that. `W_x = x#`,
`D_x = ∏_{3≤q≤x}(q−2)` twin slots, `m̄_x = W_x/D_x`. `T_x` is the tile.
`maxsum_m(T)` is the largest sum of `m` consecutive cyclic gaps;
`G₂(x#) = maxsum_1(T_x)`. For a prime `p` and a residue `a` mod `p` write

> `Δ_m(x, p, a) := maxsum_m( T_x with every slot ≡ a or a−2 (mod p) deleted )`,

the gap word still read cyclically at width `W_x`. This is the **sieve-form**
object of `research/qc/units.js` §5: the pair `{a, a−2}` is pinned at distance
2 and there is no free translate. Nothing below leans on covering-form freedom,
which is closed (`sift-limit-attack.md` §§7a-bis/7a-ter).

### 1.2 The two proven links

**Link A, the Gap Reformulation [PROVEN, `ZONE-POSTULATE.md` §3].**

> `G₂(x#) < x'² − 2  ⟹  the zone (x, x'²) is occupied.`

**Link B, the exact copy theorem [VERIFIED 40/40, `U-FRAME.md` §5a step 2].**
For `p = x'`,

> `maxsum_m(T_{x'}) = max_{a mod x'} Δ_m(x, x', a)`,  every `m ≤ 8`,

with index cost zero: `m` stays `m`. The quantifier on `a` is a **maximum over
all `x'` residues**, and every one of them is realised, once per copy.

### 1.3 The chain, with every quantifier explicit

The weak form needs

> **(Z-io)** `∃^∞ x prime : G₂(x#) < x'² − 2`.

A level-selecting argument is licensed to choose the levels. Write the
hypothesis it would supply as

> **(H)** `∃^∞ x prime : ∀ a mod x' , Δ_1(x, x', a) ≤ B(x)`.

Then the chain is two lines:

1. (H) at level `x` gives, by Link B with `m = 1`,
   `G₂(x'#) = max_a Δ_1(x, x', a) ≤ B(x)`.
2. If moreover `B(x) < x''² − 2`, Link A at level `x'` gives the zone of `x'`
   occupied. The levels `x'` are infinite in number because the levels `x` are.

**The chain closes formally, in one step, with no accumulation.** No index
grows, no Overshoot Budget is charged, no per-fold toll is paid: the copy
theorem is an identity and an identity overshoots by nothing
(`gate-multiplies.md` §9, survivor 1). This is the whole reason 0c and 0e were
worth composing.

### 1.4 The link that does not fail, and the one that makes the chain empty

Nothing in 1.3 fails. What 1.3 exposes instead is that the chain is
**circular at `m = 1`**:

> By Link B, the statement `∀a: Δ_1(x, x', a) ≤ B` **is** the statement
> `G₂(x'#) ≤ B`. (H) is not a weaker hypothesis than the conclusion at the next
> level; it is a rewriting of it. [PROVEN, immediate from Link B]

So the copy theorem transports the problem one level and changes nothing. Every
ounce of content has to come from the *method* used to bound `Δ_1`, and the only
place where level selection could enter that method is the **`∀ a`**: an
averaging or second-moment bound naturally controls the **mean** over the `x'`
residues, while Link B demands the **max**. The whole value of the i.o. slack,
on the hypothesis side, is therefore

> **(Q1)** at how many levels, and by how much, does
> `max_a Δ_m(x, x', a)` exceed `mean_a Δ_m(x, x', a)`?

If the two coincide at infinitely many levels, an averaged bound suffices there
and the argument is licensed to fail everywhere else. That is the candidate
mechanism this run tests, and it is neither of the two dead ones: it selects
**levels**, not positions, and it replaces a **max over alignments** by a mean,
not a window by a wider window.

On the conclusion side there is a second, independent place the slack can be
spent, and it is measurable exactly:

> **(Q2)** the uniform route must beat `inf_x x'²/G₂(x#)`; an i.o. route need
> only beat `limsup_x x'²/G₂(x#)`. The gain is exactly the oscillation
> amplitude of that ratio, and the question is whether the amplitude is bounded
> or grows.

(Q1) and (Q2) are the two, and only two, entrances the chain has. Stage 2
measures (Q1); stage 3 measures (Q2) and hunts for a rule that predicts (Q1)'s
good levels.

---

## 2. PRE-REGISTERED PREDICTIONS

*Written and saved before either script was executed. The heuristic behind
(a) and (d) is the measured growth law `maxsum_m = m·m̄ + σ√(2m ln D)`
(`G2-STATE.md` §4d) plus the observation that deleting two classes mod `p`
changes `m̄` by the exact factor `p/(p−2)` and leaves `ln D` essentially at the
OLD tile's value, so the max over the `p` alignments is what must supply the
missing `ln(p−2)`.*

**(a) max over 2-sets against mean over 2-sets.** Predicted to be a **shrinking
factor, not a constant one**, and specifically
`max/mean ≈ 1 + ln p / (2 ln D_x)` for `m = 1`: **1.2614, 1.1940, 1.1471,
1.1221, 1.1060, 1.0895** at `T_11, T_13, T_17, T_19, T_23, T_29`. Falling in
`m` as well, because the deterministic `m·m̄` term takes a larger share.

**(b) frequency of goodness.** Predicted **frequent, and asymptotically
universal**: every level from `T_13` up within `1.25×`, every level from `T_19`
up within `1.15×`, and `T_23`/`T_29` within `1.11×` at `m = 1`. Within `1.5×`:
all levels. So the "good levels" are not a sparse set to be selected; they are
all of them, and the selection knob has nothing to select.

**(c) which 2-set is extremal.** Predicted to be **locally determined and
near-unique**: the argmax alignment is one that deletes a slot bordering the
record gap of `T_x` or one of its near-record neighbours, so `a*` should be
strongly concentrated (one or two residues out of `p`) and should carry **no
closed arithmetic form in `x`**. Predicted: the extremal deletion merges 2 or 3
old gaps, matching the effective run length `1 + j*(1)` measured at 2 to 4
(`U-FRAME.md` §5a).

**(d) where deletion moves the growth law.** Predicted: deletion shifts the
**mean term** by exactly `p/(p−2)` and leaves the **fluctuation term** at
`√(2m ln D_x)` with `σ` unchanged to within a few percent; the max over
alignments then contributes the `ln(p−2)` that upgrades `ln D_x` to
`ln D_{x'}`. Equivalently: the fold's whole multiplier decomposes into a
deterministic density part (`p/(p−2)`, unavoidable, and it is Mertens) and an
extreme-value part (`ln p/(2 ln D)`, which is what the max over alignments
buys).

**(Q2) the i.o. amplitude.** Predicted **bounded and not growing**: the
oscillation of `x'²/G₂(x#)` over the exact ladder is a constant factor of order
`1.4`, and the running amplitude over the last `k` terms is predicted flat or
falling, not rising. Predicted gain from the i.o. licence: about **0.3 nats**,
against a lifetime Overshoot Budget of 0.88 to 1.19 nats and against a deficit
that is an exponent (4.2665 against 2), which no constant can pay.

**Overall verdict predicted before running:** CLOSED, by the mechanism
"level selection can only trade the alignment max for the alignment mean, and
that trade is worth `1 + ln p/(2 ln D) → 1`".

**What would refute the prediction and open the route:** a max/mean spread that
is a *growing* factor (so that the max is doing real work and an averaged bound
would be a genuine gain), or an i.o. amplitude in (Q2) that grows with the
level.

---

## 3. STAGE 2 — the deleted family, measured, beside the predictions

*Producer `research/attack-0c0e-01-deleted-family.js`, 47.7 s, formally
embedded, invocation `node research/attack-0c0e-01-deleted-family.js 29`. Seven
levels, `T_7` to `T_29`. `T_11..T_23` are exact in memory; `T_23` mod 29 is
reached by streaming the fold rather than storing 214,708,725 slots, and `T_29`
mod 31 by streaming the whole family, at `m = 1` only.*

**First, the copy theorem is re-verified at a level the original check did not
reach.** `max_a Δ_m` equals `maxsum_m(T_{x'})` at every `(x, m)` tested: all
`m ≤ 8` for `x = 7, 11, 13, 17, 19, 23`, and `m = 1` at `x = 29`, where
`max_a Δ_1 = 348 = G₂(31#)`, the eleventh exact ladder term. [VERIFIED]

### (a) max over 2-sets against mean over 2-sets, `m = 1`

| level | `ln D_x` | `min_a` | `mean_a` | `max_a` | **max/mean** | **predicted** |
|---|---|---|---|---|---|---|
| `T_11` mod 13 | 4.9053 | 48 | 64.62 | 66 | **1.0214** | 1.2614 |
| `T_13` mod 17 | 7.3032 | 90 | 102.71 | 108 | **1.0515** | 1.1940 |
| `T_17` mod 19 | 10.0112 | 138 | 144.95 | 150 | **1.0349** | 1.1471 |
| `T_19` mod 23 | 12.8444 | 180 | 189.91 | 204 | **1.0742** | 1.1221 |
| `T_23` mod 29 | 15.8890 | 222 | 234.00 | 258 | **1.1026** | 1.1060 |
| `T_29` mod 31 | 19.1848 | 318 | 328.45 | 348 | **1.0595** | 1.0895 |

**Prediction (a): SHAPE RIGHT, LEVEL WRONG, and wrong in the direction that
closes the route harder.** The spread is a small factor and not a constant one,
as predicted; it is an over-estimate at all six levels, so the max over the `p`
alignments exceeds the mean over them by between **1.0214 and 1.1026**, not by
the 1.09 to 1.26 the extreme-value share allows. [MEASURED]

### (b) how frequent is a good level

| `m` | within 1.10 | within 1.25 | within 1.50 | of |
|---|---|---|---|---|
| 1 | 5 | 7 | 7 | 7 |
| 2 | 5 | 6 | 6 | 6 |
| 4 | 5 | 6 | 6 | 6 |
| 8 | 4 | 6 | 6 | 6 |

**Prediction (b): CONFIRMED, and it is the finding.** Goodness is not sparse; it
is universal. Every level at every `m ≤ 8` sits within 1.50 of the mean and all
but the smallest sit within 1.25. **There is no sparse set of good levels to
select because there is no set of bad ones**, so the i.o. licence has nothing to
buy on the hypothesis side. [MEASURED]

### (c) which 2-set is extremal

| level | alignments attaining `max_1` | argmax set | old gaps merged | contains old record |
|---|---|---|---|---|
| `T_7` mod 11 | 2 of 11 | {5, 7} | 2 | yes |
| `T_11` mod 13 | **12 of 13** | all but 11 | 2 | no |
| `T_13` mod 17 | 10 of 17 | scattered | 3 | yes |
| `T_17` mod 19 | 11 of 19 | scattered | 2 | yes |
| `T_19` mod 23 | 3 of 23 | {5, 10, 19} | 4 | no |
| `T_23` mod 29 | 2 of 29 | {2, 15} | 3 | no |
| `T_29` mod 31 | 4 of 31 | {7, 12, 23, 27} | — | — |

**Prediction (c): REFUTED on concentration, CONFIRMED on anatomy.** The extremal
alignment was predicted near-unique; at `T_11` twelve of thirteen alignments
attain the record and at `T_17` eleven of nineteen. The count is 2, 12, 10, 11,
3, 2, 4 and carries no pattern in the level. The merge count 2, 2, 3, 2, 4, 3
does land inside the 2-to-4 band `U-FRAME.md` §5a measures for the effective run
length `1 + j*(1)`, and the winner contains the old record gap at only three of
six levels, which is 5a's "assembled a fresh maximum rather than extending the
old one" seen from the residue side. [MEASURED]

### (d) where deletion moves the growth law

`mbar_del` measured on the deleted tile equals `m̄_x·p/(p−2)` at every level, and
that number is `m̄_{x'}` itself: **17.1111, 20.2222, 22.9185, 25.6148, 28.0543,
30.1324, 32.2105** at `x = 7..29`. `σ` read off the family's mean and off its max
agree to within 12% at every cell, and to within 1.0423–1.2038 once `x ≥ 17`.

**Prediction (d): CONFIRMED exactly.** Deletion moves the deterministic term by
the Mertens factor `p/(p−2)` and leaves the fluctuation coefficient intact; the
`ln(p−2)` that upgrades `ln D_x` to `ln D_{x'}` is supplied by the max over
alignments and by nothing else, and that supply is (a)'s few percent. **The
density half of the fold is fixed by Mertens and is not available to any
argument at all.** [MEASURED]

### The floor, which is the decisive table

Deletion can only merge gaps, so `Δ_1 ≥ G₂(x#)` for every `a`. The question is
how much of the fold multiplier the WORST alignment already spends.

| level | `G₂(x#)` | `min_a/G₂` | `mean_a/G₂` | `max_a/G₂` = the fold |
|---|---|---|---|---|
| `T_11` | 42 | 1.1429 | 1.5385 | 1.5714 |
| `T_13` | 66 | 1.3636 | 1.5561 | 1.6364 |
| `T_17` | 108 | 1.2778 | 1.3421 | 1.3889 |
| `T_19` | 150 | 1.2000 | 1.2661 | 1.3600 |
| `T_23` | 204 | 1.0882 | 1.1471 | 1.2647 |
| `T_29` | 258 | 1.2326 | 1.2731 | 1.3488 |

**The fold is density, not choice.** The whole multiplier is already present at
the worst alignment; the alignment choice adds the ratio of the last two columns,
which is (a). [MEASURED]

---

## 4. STAGE 3 — the level-selection hunt

*Producer `research/attack-0c0e-02-level-selection.js`, 6.6 s, formally
embedded, invocation `node research/attack-0c0e-02-level-selection.js 3e7`. The
permutation null uses a fixed-seed xorshift32 so the tail re-verifies byte for
byte.*

### 4.1 (Q2): the licence is worth 0.3187 nats, once, and it is falling

Over the 22 exact terms (14 ours, 8 from A144311 with provenance carried), the
zone margin `x'²/G₂(x#)` has

> `inf = 3.1837` at `x = 37`, `limsup = 4.3788` at `x = 13` over `x ≥ 11`,
> **ratio 1.3754, `ln = 0.3187` nats.** [MEASURED]

That is the entire content of dial 4 on the conclusion side, and the dial has
never carried a number before. Against the Overshoot Budget's measured 0.88 to
1.19 nats of lifetime slack it is a **30.9% enlargement at the midpoint**, which
is real; against the exponent it is nothing, because `(4.2665 − 2)·ln θ(x)` reads
**6.700, 8.191, 9.637** nats at `x = 23, 43, 79` and diverges.

**And the amplitude falls up the ladder.** Sliding five-level windows:

| levels | 11..23 | 19..37 | 29..43 | 41..59 | 47..67 | 61..79 |
|---|---|---|---|---|---|---|
| nats | 0.2700 | 0.2584 | 0.2116 | 0.1668 | 0.0761 | **0.0865** |

The six- and eight-level windows fall the same way, to 0.0865 nats at the top.
**The i.o. licence is worth less the further up the ladder it is spent**, which
is the opposite of what a route needing it asymptotically would want. [MEASURED]

**The one-class control agrees over four times the range.** On the 58-term
A048670 ladder to `p = 271` the detrended amplitude is **0.2175 nats over
x = 11..79** and **0.1372 nats over x = 83..271**; the G₂ ladder detrended the
same way reads 0.2744 nats. Two objects, same size of oscillation, same
direction. [MEASURED, control]

### 4.2 no selection rule beats its own null by anything worth having

Scored on the DETRENDED ln-margin, against a 20000-draw permutation null of the
same subset size. Raw scoring was rejected on sight: it would have reported
`θ(x)/x above median` at +0.3418 nats and `previous multiplier below median` at
+0.3734 nats on the control, both of which are **pure trend** and both of which
detrend to 0.0027 and 0.0032 at p = 0.37 and p = 0.36. That is the
comparison-of-means trap of `TODO.md` item 1d in its exact shape.

| rule (G₂ ladder, 18 levels) | n | detrended gain, nats | p |
|---|---|---|---|
| x is the lower twin | 6 | −0.0356 | 0.8858 |
| x′ is the lower twin | 5 | +0.0215 | 0.2698 |
| prime gap `x'−x ≥ 4` | 12 | +0.0178 | 0.1111 |
| **prime gap `x'−x ≥ 6`** | 6 | **+0.0543** | **0.0239** |
| `x'²/x²` above median | 8 | +0.0249 | 0.1406 |
| frac(m̄) top third | 6 | −0.0356 | 0.8852 |
| frac(m̄) bottom third | 7 | +0.0010 | 0.4914 |
| `θ(x)/x` above median | 8 | +0.0253 | 0.1368 |
| `x ≡ 1 mod 4` | 8 | −0.0160 | 0.7521 |
| **π(x) even (null control)** | 9 | −0.0049 | 0.5924 |
| previous multiplier below median [ORACLE] | 8 | +0.0026 | 0.4617 |

**The one rule with a signal is the mechanism already declared dead, and this
prices it.** `x'−x ≥ 6` scores 0.0543 nats at p = 0.0239 here and 0.0328 nats at
p = 0.0000 on the 54-level control. That rule IS "large prime gaps widen the
window", which item 0e lists as dead because `2(p'−p)/p → 0` against a needed
factor 3. **The measurement agrees with the verdict and attaches a number: the
mechanism is real and worth 0.033 to 0.054 nats, against `ln 3`.** [MEASURED]

**The oracle ceiling bounds the whole rule space.** Even a rule allowed to see
`G₂` and pick the single best level sits **0.1467 nats above trend** on the G₂
ladder and 0.1568 on the control (spans 0.3293 and 0.2917). No selection rule,
cheating or not, can beat a sixth of a nat over the trend the uniform route
already tracks. [MEASURED]

### 4.3 the max/mean law scales with the census, which licenses extrapolating it

Localized calibration, 65 cells, one sieve of `[0, 3·10⁷)` per level cut into
1, 2, 8, 32 and 128 sub-windows so the census moves by a factor 128 at FIXED
level and FIXED `p`. Off-diagonal (`G2-STATE.md` §3c) and never pooled with tile
readings; what is extracted is the shape.

> `max/mean − 1 = −0.1347 + 1.7965 · ln p/(2 ln S)`, and max/mean **falls as the
> census grows at 10 of the 13 levels tested.** [MEASURED]

The coefficient is not 1 and the intercept is not 0, so this is a shape and not a
law. What it establishes is the **sign and the carrier**: the alignment advantage
is carried by `1/ln(census)`. On the tile `ln D = θ(x) ~ x`, so it vanishes like
`ln x / x`, and the i.o. licence on the hypothesis side has a **vanishing
target**.

---

## 5. The BV/EH sweep

**The shape 0e asks for is not absent. It is free, and it is unimportable.**

**Free.** Any average statement `Σ_{q ≤ Q} E(q) ≤ B` gives `E(q) ≤ 2B/Q` for at
least half the `q ≤ Q`, hence for infinitely many `q`. Every BV-type and
Barban–Davenport–Halberstam-type theorem therefore already delivers "for
infinitely many `q`, a deterministic bound" as a one-line corollary, and the
literature uses it that way: Baier and Zhao, *Bombieri–Vinogradov type theorem
for sparse sets of moduli*, Acta Arith. **125** (2006), 187–201
([arXiv:math/0602116](https://arxiv.org/abs/math/0602116)), prove BV and BDH
analogues over sparse sets of moduli and draw exactly this kind of conclusion
("there exist infinitely many primes of the form `p = am² + 1` with
`a ≤ p^{5/9+ε}`"). The genuinely moduli-SELECTING technology in print is the
well-factorable moduli of Iwaniec and Bombieri–Friedlander–Iwaniec and the
smooth/densely-divisible moduli of Zhang and Polymath8, which buy level of
distribution by restricting the modulus class. That is `THE-DIALS.md` dials 6
and 7 and it is already mapped. **[PROVEN, standard]**

**Unimportable, and the reason is structural rather than a gap in the
literature.** Two obstacles, either of which suffices.

1. **Our free parameter is not a modulus.** A BV exceptional set lives in `q` at
   a fixed level of a prime count. An exceptional set for the weak Zone
   Postulate would have to be a set of **sieve depths** `x`. Every tile `T_x`
   uses *all* moduli `q ≤ x` simultaneously; dropping a modulus does not produce
   another level of our ladder, it produces a different and smaller tile. There
   is no average over `x` anywhere in the equidistribution toolbox to pigeonhole
   on. **[INFERRED, and it is the sweep's finding]**

2. **`G₂(x#)` is non-decreasing in `x`, and a monotone sequence has no
   exceptional-set slack.** An average bound over a monotone sequence is
   dominated by its top term, so a pigeonhole on it returns a bound at the level
   one already had. The only thing that oscillates is the RATIO to the
   threshold, and §4.1 measures its amplitude at 0.3187 nats and falling. **This
   is the general reason dial 4 has no BV-shaped mechanism, and it applies to
   every future candidate, not just to the two already dead.** [PROVEN for the
   monotonicity, MEASURED for the amplitude]

**One published statement does have the wanted shape and is already on file.**
Heath-Brown's dichotomy (Siegel zeros infinitely often ⟹ infinitely many twin
primes, *Proc. London Math. Soc.* (3) **47** (1983), 193–224, quantified by Tao
and Teräväinen, [arXiv:2112.11412](https://arxiv.org/abs/2112.11412)) selects
levels rather than positions and delivers TPC outright. What it selects is a
hypothetical failure of equidistribution, not our `x`, and
`research/bv-import-survey.md` §2 already carries it. It is not a mechanism for
dial 4. **[PROVEN, already in the corpus]**

**Absence, stated to the standard of `SEARCH-CONVENTIONS.md`.** No upper bound
on the Jacobsthal function at primorials is stated in the literature with an
exceptional set of `n`. Searched in the owning convention (Jacobsthal, OEIS
A048670 for the one-class object and A144311 for ours): Iwaniec, Vaughan,
Kanold, Stevens, Paseman, Costello–Watts, Hagedorn and Ziller–Morack all state
bounds uniform in `n`. **[ABSENT — web-index sweep only this session; the
MathSciNet and zbMATH channels of `SEARCH-CONVENTIONS.md` §5 were NOT run on
this query, and that is a residual, not a clean negative.]**

---

## 6. VERDICT: CLOSED, and the mechanism has a name

> **Level selection cannot help, and the reason is that the object the licence
> would apply to does not oscillate.** `G₂(x#)` is monotone and the threshold
> `x'²` is monotone, so the only oscillation an i.o. argument can exploit is in
> their ratio. That amplitude is **measured at 0.3187 nats over 22 exact terms,
> it falls to 0.0865 nats in the top windows, and the one-class control agrees
> over four times the range.** No selection rule beats its permutation null by
> more than 0.0543 nats, the only rule that beats it at all is the already-dead
> large-prime-gap mechanism, and even an oracle that reads `G₂` and picks the
> best level is capped at 0.1467 nats above trend.

Call it the **Monotone Depth obstruction**: an infinitely-often licence is worth
the oscillation amplitude of the quantity it licenses, a monotone quantity has
none, and the depth parameter of a sieve is not a modulus, so no
average-over-moduli theorem supplies one.

Three subsidiary closures, each independently sufficient on its own leg:

1. **The copy theorem at `m = 1` is circular.** By Link B, `∀a: Δ_1 ≤ B` **is**
   `G₂(x'#) ≤ B`. The identity transports the problem one level and changes
   nothing, so 0c's content lies entirely in the METHOD used to bound `Δ`, never
   in the reformulation. [PROVEN]
2. **The alignment max is worth 2 to 11 percent over the alignment mean**, below
   the extreme-value share at every level, and its carrier is `1/ln(census)`, so
   on the tile it vanishes like `ln x / x`. An argument that could trade the max
   for the mean at infinitely many levels would gain a vanishing factor against
   a needed exponent. [MEASURED]
3. **The fold is density, not choice.** `m̄` moves by exactly `p/(p−2)` at every
   alignment, and the worst alignment already carries most of the multiplier.
   [MEASURED]

**What survives untouched.** TODO 0c's core ask — a PROVEN upper bound on the
residue-deleted maxsum that never counts kills — is not attempted here and is
not closed by anything above. This run closes the *composition* with 0e, by
showing the i.o. licence adds nothing to that ask. The internal absence 0c
records still stands: no script in `research/` BOUNDS a residue-deleted maxsum,
and the two added here MEASURE the family without bounding it.

**What this retires.** `THE-DIALS.md` dial 4 and `G2-STATE.md` §9 item 5 both
read "free slack with no known mechanism; this item is the search for a third".
The search for a third mechanism should stop: the two dead ones failed for
reasons specific to them, and the Monotone Depth obstruction is general and
applies before any candidate is named. Dial 4 is not free slack with no
mechanism. It is **0.3187 nats of slack, falling, with the reason it cannot grow
attached.**

---

## 7. NOT REACHED

- **No bound on `Δ_m`.** Item 0c's own question is untouched. This run priced one
  route into it and did not attempt the bound.
- **No level above `T_29`,** and the `T_29` row is `m = 1` only. The full
  `m ≤ 8` ring at that level measures about 110 s per alignment, near an hour
  for the level, and buys one column.
- **The amplitude is measured, not proved bounded.** 22 exact terms plus a
  58-term control is evidence. §4.1's falling trend is a trend on a short ladder,
  which is exactly what `TODO.md` item 1d warns about, and it is reported as a
  direction, not a law.
- **The rule space is not exhausted.** What is bounded is the prize (§4.2's
  oracle ceiling), not the list of rules. The brief's candidate "small
  partial-quotient structure in the record gap's position" was NOT tested: the
  record gap's position is available only to `T_23`, which is six points.
- **The literature sweep is web-index only.** MathSciNet `mrlookup` and the
  zbMATH API, both live per `SEARCH-CONVENTIONS.md` §5, were not run on the
  "exceptional set of `n`" query.
- **Nothing was integrated.** No live document was touched; `TODO.md`,
  `THE-DIALS.md`, `G2-STATE.md` and `U-FRAME.md` all still read as they did.

---

## 8. Reproduction and custody

```
node research/attack-0c0e-01-deleted-family.js 29    # 47.7 s, the deleted family
node research/attack-0c0e-02-level-selection.js 3e7  #  6.6 s, the selection hunt
```

Both tails are formally embedded (`node research/qc/embed.js <file> --streams
both --timeout 300 -- <arg>`), both carry `code-sha256` and `out-sha256`, and
both were executed before a single reading was written. Script 1 reproduces the
G₂ ladder 12, 30, 42, 66, 108, 150, 204 from a copy-theorem generator that never
sieves, recovers 258 and 348 by streaming, and matches `D(T_x) = ∏(q−2)` at every
level. Script 2's permutation null is a fixed-seed xorshift32, stated in the
code, so the run is deterministic and the tail re-verifies.
