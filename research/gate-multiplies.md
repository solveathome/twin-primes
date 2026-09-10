# Does "the gate multiplies" close the u-frame branch?

<!-- ledger
id: Q-gate-multiplies
status: ANSWERED
todo: 0b
question: Does "the gate multiplies" close the entire u-frame recursion branch, or only the merge chain?
verdict: Only the merge chain and one relative of it: the no-fixed-point argument does not reach TODO 0b at all, though 0b is wrong as stated for an unrelated reason and the error is a factor of ln u; what survives is the copy theorem for maxsum (VERIFIED 40 of 40), which needs a residue-deleted maxsum bound that does not pass through a kill count.
-->

*(2026-08-17 late. The question: the Localized Merge Lemma died this afternoon on
a no-fixed-point argument, and the line recorded was "the obstruction is not the
size of the gate, it is that the gate multiplies." Does that close the ENTIRE
u-frame recursion branch, or only the merge chain? Calibration marked throughout:
PROVEN, VERIFIED, MEASURED, REFUTED, INFERRED. Scripts
`research/gate-multiplies-01.js`, `-02.js` and `-03.js`, 22 seconds for all
three, deepest object T_29 at 214,708,725 twin slots.)*

## 1. The hard part first, and the answer

**No. The no-fixed-point argument closes the merge chain and one relative of it,
and it does not reach TODO 0b at all.** Its hypothesis is an *accumulating
index*, and 0b has none: 0b carries a single number forward and re-bases at every
fold, so the running bound cancels out of the cost rather than compounding.

That is the good news and it is thin, because **TODO 0b is wrong as stated, for
an unrelated and more elementary reason, and the error is a factor of ln u.**

> **REFUTED (PROVEN, and VERIFIED numerically below).** The inequality
> `ln c <~ 2 ln^2 u / u` does **not** imply `G2(u) < u^2`. Read as a uniform
> constant, no c > 1 satisfies it, since the right side tends to 0; the item is
> then vacuous. Read as a per-level rate in the product telescope, the telescope
> gives `12 * prod_{p<=x} c(p)`, and `sum_{p<=x} 2 ln^2 p / p ~ ln^2 x`, against
> a budget of `2 ln x`. It overspends by a factor `ln x / 2`. Numerically the
> bound it certifies exceeds u^2 by 4.6x at u = 37, 149x at u = 100, and
> **1.6e10 at u = 1000**.
>
> **The sharp per-fold requirement is `ln c(p) <= 2 ln p / p`**, obtained by
> differentiating the partial-sum condition `sum_{p<=x} ln c(p) <= 2 ln x - ln 12`
> rather than dividing it by pi(u). That is a factor ln p tighter.

And the measured multiplier is already spending that budget in full. **MEASURED,
and this is the model-free statement**: `ln c(p)` against the sharp rate
`2 ln p / p` on Ziller and Morack's 21 exact terms runs 1.39, 0.97, 1.36, 0.75,
1.15, 1.10, 1.18, 1.00, 0.61 at p = 41 to 73, **mean 1.06**, and on our own ladder
0.77 to 2.14. The multiplier is at the allowed rate or over it, and it is not
trending down. No exponent fit enters that reading.

**What the asymptotic headroom is, stated exactly.** If `G2 ~ C (ln W)^alpha`
then `c_true = (theta(p')/theta(p))^alpha ~ 1 + alpha ln p / p`, so the fraction
of the sharp budget the truth consumes is **alpha/2 and nothing else**: 100% at
alpha = 2, 92% at 1.847, 75% at the calibrated central 1.50, 65% at the bottom of
the 1.3 bracket. **So whether there is asymptotic headroom is exactly the exponent
question, and that is not settled** (`U-FRAME.md` §3, `exponent-control.md` §5).
What is settled is that the constant is worth a total lifetime slack of **0.88 to
1.19 nats as measured**, summed over every fold from here to infinity. The 0.598
below is a predicted asymptote and not a measurement, so it is not the figure to
quote for the slack. MEASURED: the slack
`ln(x^2 / G2(x#))` reads 1.06, 0.94, 0.98, 0.88, 0.95, 1.18, 1.02, 0.95 across
x = 11 to 37. Flat, with a predicted asymptote of ln(1/0.55) = 0.598 if
alpha = 2.

Everything else follows from those two facts. What survives is named in section 9
and it is not a bound, it is an exact object.

## 2. The no-fixed-point argument in its most general form

State it as a hypothesis on a proof strategy, not on the objects. The argument is
about what is *provable*, not about what is true, and that distinction turns out
to decide three of the verdicts below.

> **NFP (no fixed point).** Let a chain seek `Q(x) <= B(x)` by telescoping N(x)
> folds down to a fixed base, and suppose:
>
> **(NFP1) Accumulating index.** The conclusion has the form
> `Q(x) <= Phi_J(base)`, where `J = sum_j kappa_j` accumulates a per-fold index
> cost and the base is *not* re-established at each fold.
>
> **(NFP2) Deficit.** `Phi_J >= J * delta` for some delta > 0: the functional
> cannot return less than delta per unit of index. For maxsum, delta = mbar, by
> averaging (LOCALIZED-GAP's Deficit Lemma).
>
> **(NFP3) Linear cost feedback.** The best *provable* per-fold cost is
> `kappa_j >= c1 * B(x) / p`. This is not an accident of any one lemma: it is
> what every spacing argument gives, because a window of length B admits B/p
> kills whenever the only tool limiting kills is that they sit at least ~p apart.
>
> **(NFP4)** `N(x) * c1 * delta / x > 1`.
>
> Then the chain's own hypothesis is unsatisfiable for every B. B cancels between
> (NFP2) and (NFP3), leaving the linear map `B -> (N c1 delta / x) * B`, whose
> multiplier is B-free and exceeds 1.

The localized merge chain satisfies all four: NFP1 (`M(x_n,Y) <= maxsum_{n+1}(T_{x0},Y)`,
base x0 fixed), NFP2 (Deficit Lemma), NFP3 (Fact B: `kappa <= G/(p-2) + 1`),
NFP4 (`N = pi(x)`, delta = mbar ~ 2.4 ln^2 x, giving 2.4 ln x). That is
localized-04-maxsum.md section 10, restated without any reference to gates.

**What escapes, precisely.** Failing any one of the four is an escape, and the
three interesting escapes are:

1. **No accumulating index (NFP1 fails).** A chain that collapses back to a
   single number at every fold pays a *relative* cost per fold, and the running
   bound cancels the other way: cost/B is B-free. TODO 0b is exactly this.
2. **Exactness (NFP2 fails).** An identity returns the truth, not a floor. There
   is no gate to stay under and no bootstrap.
3. **B-free cost (NFP3 fails).** If the per-fold cost is bounded by anything that
   does not mention the running bound, the map `B -> const` is constant, not
   expanding, and has a fixed point whenever the constant clears the target.

Chris's honest doubt on the record was that an additive per-fold cost would
escape entirely. **That is confirmed, and it is escape 3.** The Localized Merge
Lemma tried to buy exactly that (cost 1 per fold) and failed only because its
*gate* re-introduced B: the cost is 1 only while `M <= (p-2)/4`, so the honest
cost is `max(1, B/p)` and the chain reverts to NFP3 the moment it leaves the
gate. That is the whole content of the Traverse Bound.

## 3. The Traverse Bound is not localized, and it is the same crossover

Writing the cost as `kappa(m) ~ max(1, m*mbar/p)` unifies the two regimes:

| regime | condition | index behaviour |
|---|---|---|
| additive | `m <= p/mbar` | cost 1 per fold, J grows by 1 |
| multiplicative | `m > p/mbar` | cost proportional to m, J multiplies by (1 + mbar/p) |

The crossover sits at `m ~ p/mbar ~ x/(2.4 ln^2 x)`, and with the gate's
alpha = 1/4 it is `x/(9.6 ln^2 x)`. **That is the Traverse Bound, and it is a
general crossover, not a feature of the localized window.** The localized chain
gets `pi(x)` folds' worth of demand against `x/(9.6 ln^2 x)` folds' worth of
additive supply, short by 9.6 ln x.

**Why the tile version is milder.** Same crossover, different target. The
localized chain must stay under `x/4`; the tile chain must stay under `x^2`. The
deficit budget is `target/mbar`, so the tile chain has 4x times more index to
spend and the shortfall degrades from `9.6 ln x` to a constant. Section 5 prices
that constant. **So the mechanism transfers and the verdict weakens.**

## 4. MEASURED: the cost is not proportional, and the counting bound is loose

NFP3 is a claim about the best available bound. It is worth knowing how far that
bound is from the truth, because the whole family stands or falls on closing that
gap. `research/gate-multiplies-02.js` measures kappa(m), the maximum kill count
inside a window of m consecutive NEW gaps, directly, by walking all `D*p`
positions of the new tile in order. Four folds, the deepest being T_23 folded by
29 at 230,613,075 positions, in 17 seconds.

```
=== fold T_19 by p = 23 ===
  old: D = 378675  mbar = 25.615  G2 = 150   new: G2 = 204
  true longest kill run L = 3
  kappa(m)        = 1:3  2:4  3:4  4:4  6:5  8:5  12:5  16:6  24:8  32:9
  kappa(m)/m      = 1:3.000  2:2.000  3:1.333  4:1.000  6:0.833  8:0.625  12:0.417  16:0.375  24:0.333  32:0.281
  counting bound  = 1:10.7  2:12.1  3:15.3  4:17.6  6:23.0  8:26.1  12:30.1  16:36.7  24:48.1  32:59.0

=== fold T_23 by p = 29 ===
  old: D = 7952175  mbar = 28.054  G2 = 204   new: G2 = 258
  true longest kill run L = 2
  kappa(m)        = 1:2  2:3  3:3  4:3  6:4  8:4  12:5  16:5  24:8  32:8
  kappa(m)/m      = 1:2.000  2:1.500  3:1.000  4:0.750  6:0.667  8:0.500  12:0.417  16:0.313  24:0.333  32:0.250
  counting bound  = 1:10.6  2:13.2  3:15.4  4:16.6  6:21.0  8:22.6  12:27.9  16:33.7  24:43.0  32:53.9
```

Two readings, both MEASURED at all four folds (13, 17, 19, 23 by 17, 19, 23, 29):

1. **kappa(m) is strongly sublinear in m.** `kappa(m)/m` falls monotonically from
   2 or 3 at m = 1 to 0.25 to 0.28 at m = 32, at every fold. If NFP3 held as a
   *fact* the ratio would be flat at `mbar_new/(p-2)`, measured 1.84, 1.53, 1.51,
   1.12. It is not flat and it is not at that level.
2. **The counting bound is loose by 3.5x to 6.7x, and the looseness grows with
   m.** At fold 29 it gives 10.6 against a true kappa(1) = 2, and 53.9 against a
   true kappa(32) = 8.

**So NFP3 is a statement about our tools and not about the tile.** The tile's
kills are far rarer than their spacing permits. That is the same fact A9's tail
measurement reports from the other side, and it is why "L is polylog" is
believable while unprovable.

## 5. The general obstruction that DOES bind: the Overshoot Budget

The no-fixed-point argument is a special case of something simpler and harder to
escape, which applies to every chain in the family including the ones where NFP3
fails.

> **Overshoot Budget (PROVEN, given the measured law for G2).** Any valid chain
> of upper bounds ending in `G2(x#) < x^2` passes through quantities that are all
> at least `G2(x#)`. Its total multiplicative overshoot over the truth is
> therefore capped at `x^2 / G2(x#)`. With `G2 ~ 0.55 (ln W)^2` and
> `ln W = theta(x)`, that cap tends to `1/0.55 = 1.82`, i.e. **0.598 nats, spread
> across the entire ladder to infinity.**

MEASURED, and it is the single most useful number in this note. The slack
`ln(x^2 / G2(x#))`:

| x | 11 | 13 | 17 | 19 | 23 | 29 | 31 | 37 |
|---|---|---|---|---|---|---|---|---|
| slack, nats | 1.058 | 0.940 | 0.984 | 0.878 | 0.953 | 1.182 | 1.016 | 0.953 |

Flat over the whole reachable ladder, predicted 1.042 at x = 37 from
`ln(1/0.55) + 2 ln(x/theta(x))` with theta(37)/37 = 0.801, measured 0.953.
**There is no growing margin anywhere in this route, at any level, in any
formulation.** Every per-fold statement inherits it: a chain of pi(x) folds may
overshoot the true per-fold multiplier by a total of 0.88 to 1.19 nats as
measured, which is `0.9 to 1.2 ln x / x` per fold on average.

**For accumulating-index chains this is fatal in one line.** Such a chain ends at
`G2(T_x) <= maxsum_J(T_{x0})`. Once `J >> D(T_{x0})` the word repeats and
`maxsum_J = J * mbar_0 * (1 + O(D_0/J))`, so the conclusion is *equivalent* to a
statement about J, and J must be pinned to within a factor 1.82 of
`G2(T_x)/mbar_0`. Base-independent: choosing a larger base scales both sides by
`1/mbar_0`, and cutting the ladder into blocks multiplies the per-block
overshoots, so the 1.82 is a lifetime total however the chain is decomposed.

> **Consequence.** An accumulating-index chain must bound the cumulative index to
> within a factor under 2 of the truth, over pi(x) folds. That is not a bound on
> the answer, it is the answer. The only unconditional tool available, the
> spacing bound of section 4, is loose by 3.5x to 6.7x at a single fold.

**This closes the accumulating-index family on the tile**, where NFP4 gives only
a constant rather than a log, and it closes it for the same reason NFP does: not
because the constant is wrong, but because no counting argument is exact.

## 6. Every recursion in the repo, tested one at a time

| where | object | NFP1 index | NFP2 deficit | NFP3 feedback | verdict |
|---|---|---|---|---|---|
| 5a step 1-2 | kill law, copy reformulation | no | no (exact) | no | **SURVIVES** |
| 5a step 3 | `maxsum_2 <= G2(new) <= maxsum_{L+1}` | no (one fold) | n/a | n/a | **SURVIVES**, conditional on L |
| 5a step 4 | `G2(new) <= G2(old) + L*mbar` | - | - | - | already REFUTED (A2) |
| 5a step 7 | `sum L*mbar ~ x ln^3 x` | - | - | - | dead with step 4 |
| 5a step 3a (A4) | `maxsum_m(new) <= maxsum_{m+kappa(m)}(old)` | **yes** | **yes** | **yes** | **CLOSED** |
| 5a step 3 (A4) | `maxsum_{m+1}(old) <= maxsum_m(new)` | yes | yes | n/a (lower) | SURVIVES, useless |
| 5a step 2 (A4) | copy theorem for the family, exact | **no (m stays m)** | no (exact) | no | **SURVIVES** |
| 10 (A5) | Theorem A, Run Cost | no | no | no | SURVIVES |
| 10 (A5) | Theorem B, C | no (one-shot) | no | **supplies it** | SURVIVES as a theorem, CLOSED as a supplier |
| 11 (A9) | transfer operator | no | no (exact) | no | **SURVIVES** |
| 10 (A10) | effective run length m_eff | yes | yes | no | CLOSED, by step 4's refutation |
| TODO 0b | `G2(u) <= 12 c^{pi(u)}` | **no (re-bases)** | no | no | **SURVIVES NFP**, but see section 7 |

Item by item, with the reason rather than the label.

**5a steps 1 and 2, the copy theorem for the whole family.** These read as
identities and are **VERIFIED 40 of 40, over five folds and m ≤ 8** (`U-FRAME.md`
§5a step 2), not proven.
`maxsum_m(new) = max over the p 2-sets {a, a-2} of maxsum_m(old minus
those classes)` is the one object in the family whose **index does not grow under
folding**: m stays m. There is no accumulating index, no floor to stay above, and
no gate. NFP cannot touch it and neither can the Overshoot Budget, because an
identity overshoots by nothing. That immunity is exactly as strong as the
identity, and the identity rests on a measured clause the corpus has not proved:
no straddling window ever beats a single-copy one. **This is the strongest
survivor in the branch**, and what would make it the safest is a proof of that
clause.
Its price is that the difficulty moves out of index bookkeeping and into
evaluating a residue-deleted maxsum, which is a two-dimensional sieve question.

**5a step 3's lower recursion.** `maxsum_{m+1}(old) <= maxsum_m(new)`, verified
40 of 40.
A lower chain has no gate and nothing to bootstrap, so NFP is silent. It is also
silent on TPC: it can only produce lower bounds on G2, and the Zone Postulate
needs an upper one.

**5a step 3a's upper recursion, A4's chain.** This is the tile analogue of the localized
merge chain and it satisfies all four NFP conditions: the index accumulates
(`J_{n+1} = J_n + kappa_n(J_n)`), the Deficit Lemma applies to maxsum at the base,
and A5 Theorem C's structural cap supplies the feedback `kappa >= maxsum_m/(3p)`.
NFP4 gives only a constant here rather than the localized 9.6 ln x, because the
target is x^2 and not x/4. **It is section 5 that closes it, not section 2:** the
chain must certify the cumulative index to within a factor 1.82, and the only
unconditional tool is loose by 3.5x to 6.7x at a single fold.

**10's A5.** Theorem A is attained with equality at every fold and is not a chain.
Theorems B and C are one-shot bounds and survive as theorems. But **A5's
structural cap is exactly NFP3**, discovered a day earlier in different
vocabulary: "Theorem B can never prove L below G2/(3p) ~ 0.18x, which is LINEAR,
the failing branch." That is `kappa >= c1 * B / p` with c1 = 1/3. So A5 is the
supplier of the hypothesis that kills every chain fed by it, and redirecting L to
kappa via Theorem C inherits the cap, as U-FRAME already records.

**11's A9.** The transfer operator is exact and it iterates arbitrarily far: from
the T_7 word alone it walked to T_23, T_29 and T_31 with D and G2 both correct. No
gate, no index, no deficit. It survives everything in this note. The honest limit
is that it is closed on the gap **word**, not on the histogram, so it is an exact
simulator rather than a source of bounds; reading G2 off it still requires
running it.

**10's A10.** The negative result stands and needs no help. Its live successor,
the effective run length m_eff, was priced as "constant at 3 would close 5a from
the upper side, since telescoping gives sum ~ x ln^2 x, well under x^2". **That
projection inherits step 4's refutation**, and worse, it contradicts the measured
G2 law: `sum_{p<=x} 3*mbar(p) ~ 7.2 x (ln x - 1)` falls **below** 0.55 x^2 from
x = 37 onward on the exact `mbar = W/D`, and from x = 29 on the Mertens
asymptotic, so it would certify a bound smaller than the truth. A constant m_eff
is therefore impossible, and the branch was already closed by its own arithmetic.

## 7. The required rate is `2 ln p / p`, and why `2 ln^2 u / u` busts the budget by `ln u`

The telescoped programme is `G2(u) <= 12 * prod_{p<=u} c(p) < u^2`, and it reads
two ways. The algebra from a **uniform** c is correct; the algebra from a
per-level rate is a different inequality, and neither delivers `2 ln^2 u / u`.

**Read as a uniform constant, it is vacuous.** `12 c^{pi(u)} < u^2` must hold
at every u, and the permitted `2 ln^2 u / u` tends to 0, so the only admissible
constant is c = 1.

**Read as a per-level rate, it does not imply the Zone Postulate.** The telescope
gives `12 * prod_{p<=x} c(p)`, not `12 * c(x)^{pi(x)}`. VERIFIED:

```
TEST: does  ln c(p) <= 2 ln^2 p / p  at every level imply G2 < u^2 ?
       running 12 * prod_{5<p<=x} (1 + 2 ln^2 p / p)  against  x^2

     x        12*prod c        x^2        ratio
        37       6.346e+3     1.369e+3      4.64e+0
       100       1.490e+6     1.000e+4      1.49e+2
      1000      1.591e+16     1.000e+6     1.59e+10
     10000      6.335e+31     1.000e+8     6.33e+23
    100000      2.309e+52    1.000e+10     2.31e+42

TEST: the SHARP per-fold rate.  ln c(p) <= 2 ln p / p
        37       1.766e+2     1.369e+3      1.29e-1
       100       8.165e+2     1.000e+4      8.16e-2
      1000       6.107e+4     1.000e+6      6.11e-2
     10000       5.706e+6     1.000e+8      5.71e-2
    100000       5.584e+8    1.000e+10      5.58e-2
```

The mechanism is `sum_{p<=x} 2 ln^2 p / p ~ ln^2 x` against a budget of
`2 ln x`. Overspends by a factor `ln x / 2` and the certified bound diverges like
`x^{ln x - 2}`.

> **The required rate (PROVEN).** Differentiating the partial-sum condition
> `sum_{p<=x} ln c(p) <= 2 ln x - ln 12`, which must hold at every x, gives
>
> **`ln c(p) <= 2 ln p / p`**, with a **total** lifetime slack of `ln(x^2/G2(x#))`
> nats, measured 0.88 to 1.19 and tending to ln(1/0.55) = 0.598.

**And the measured multiplier is already spending that budget in full.** MEASURED,
our own ladder against the sharp rate:

| fold p | 7 | 11 | 13 | 17 | 19 | 23 | 29 | 31 | 37 |
|---|---|---|---|---|---|---|---|---|---|
| ln c | 0.916 | 0.337 | 0.452 | 0.493 | 0.329 | 0.308 | 0.235 | 0.299 | 0.417 |
| sharp `2 ln p/p` | 0.556 | 0.436 | 0.395 | 0.333 | 0.310 | 0.273 | 0.232 | 0.222 | 0.195 |
| **ln c / sharp** | 1.65 | 0.77 | 1.15 | 1.48 | 1.06 | 1.13 | 1.01 | 1.35 | **2.14** |
| against 0b's `2 ln^2 p/p` | 0.85 | 0.32 | 0.45 | 0.52 | 0.36 | 0.36 | 0.30 | 0.39 | 0.59 |

The bottom row is the same data read against the softer `2 ln^2 p/p`, and it is
where the impression comes from that the multiplier spends only 15 to 45 percent
of its budget on a falling trend. Read against the sharp budget, which is the row
above it, **the multiplier uses 77 to 214 percent of its budget and it is not
trending down** — the reading `U-FRAME.md` §4 carries. Ziller and
Morack's adversarial terms, recomputed the same way, run 1.39, 0.97, 1.36, 0.75,
1.15, 1.10, 1.18, 1.00, 0.61 at p = 41 to 73, mean 1.06. Their sequence is
spending at exactly the allowed rate, not at a fifth of it.

**The asymptotic version of the same statement, and it is an open question rather
than a fact.** With `G2 ~ C (ln W)^alpha` and `ln W = theta(x)`,
`c_true = (theta(p')/theta(p))^alpha ~ 1 + alpha ln p / p`, so the truth consumes
exactly `alpha/2` of the sharp budget:

| alpha | 2.000 | 1.847 | 1.500 | 1.300 |
|---|---|---|---|---|
| fraction of budget spent | 100% | 92.3% | 75.0% | 65.0% |

At alpha = 2 there is no headroom at all; at the calibrated central 1.50 there is
25%, and at the bottom of the practical bracket about 35%. **So asymptotic
headroom in 0b is exactly the exponent question and is not settled**
(`U-FRAME.md` §3, `exponent-control.md` §5). What is measured, and what does not
depend on any fit, is the table above: over every fold we can compute, the
multiplier spends 77% to 214% of the budget with a mean at 1.06 and no downward
trend. The constant is worth 0.88 to 1.19 nats in total as measured, and no more.

## 8. What the surviving form needs, priced

The route is 5a step 3, `G2(new) <= maxsum_{1+L}(old)`. Write
`rho = (maxsum_m - G2)/((m-1)*mbar)`, whose value depends on both the tile and
m. MEASURED over every cell with T_11 <= T_x <= T_23 and 2 <= m <= 8: **1.02 to
1.84**, the extremes at (T_19, m=4) and (T_23, m=6). Per-level typical values,
the median over m, run 1.33, 1.26, 1.15, 1.27, 1.71 at T_11 to T_23, so rho is
higher at the top of the reachable ladder than at the bottom but **does not rise
level by level**; see the T_29 reading below and section 10. Then the per-fold
**burn** is `rho*mbar*L/G2` against a per-fold **replenishment** of
`2 ln p / p`, and

> **burn / replenish = rho * mbar * L * p / (2 * ln p * G2) ~ 3.27 * L * ln p / p**,
> using `mbar = 2.4 ln^2 p`, `G2 = 0.55 p^2`, rho = 1.5.

Two branches, and they are the same two branches the repo has been on all along:

- **L at A5 Theorem B's provable ceiling, `L >= G2/(3p) = 0.18 p`:** the ratio is
  `0.4 * rho * ln p ~ 0.6 ln p`, which **diverges**. Dead by exactly one log.
- **L at A9's measured polylog, `L <~ 0.8 ln^2 p`:** the ratio is
  `~2.6 ln^3 p / p`, which **tends to 0**, crossing 1 near p ~ 800 and clearing
  thereafter with a margin growing like `p / ln^3 p`.

> **The survivor, stated as a threshold (PROVEN, given the measured G2, mbar and
> rho laws).** The surviving form goes through iff
> **`L <= 0.19 to 0.31 p / ln p`**, on average over the ladder. A5 Theorem B
> proves `L <= 0.18 p`. The gap is a factor **`0.58 to 0.95 ln p`**, and it is the
> only gap. (The favourable end is rho = 1.5, the central reading; the tight end
> is T_29's rho = 2.4. rho is measured on six tiles and has no trend, §10, so
> neither end may be quoted as the one the ladder is heading for.)

MEASURED, the chain run with the **true** L at every fold, which is the most
favourable reading the proven machinery allows:

| fold p | 13 | 17 | 19 | 23 | 29 |
|---|---|---|---|---|---|
| true L | 2 | 2 | 2 | 3 | 2 |
| bound `maxsum_{1+L}(old)` | 96 | 138 | 168 | 228 | 300 |
| true `G2(new)` | 66 | 108 | 150 | 204 | 258 |
| burn, nats | 0.827 | 0.738 | 0.442 | 0.419 | 0.386 |
| replenish `2 ln(p'/p)` | 0.334 | 0.536 | 0.222 | 0.382 | 0.462 |

Chained from `G2(T_11) = 42`, the bound reaches **698.3 at x = 29 against a target
of 841**. Running slack `ln(x^2 / bound)` falls **1.058 -> 0.186 over five folds**,
a net loss of 0.175 nats per fold. The next fold replenishes only
`2 ln(31/29) = 0.133` nats, so the chain survives fold 31 only if
`maxsum_5(T_29)/G2(T_29) < 1.376`.

**It does not. VERIFIED.** `research/gate-multiplies-03.js` streams T_29, all
214,708,725 twin slots of it, out of T_23 in 4.3 seconds without storing the tile:

```
=== T_29 ===
  D = 214708725   W = 6.469693e+9   mbar = 30.1324
  G2 = maxsum_1 = 258   (recorded value 258)
  maxsum_ 2 =    330   / G2 = 1.2791   rho = 2.389
  maxsum_ 3 =    390   / G2 = 1.5116   rho = 2.190
  maxsum_ 4 =    420   / G2 = 1.6279   rho = 1.792
  maxsum_ 5 =    510   / G2 = 1.9767   rho = 2.091
  maxsum_ 6 =    540   / G2 = 2.0930   rho = 1.872
  ...
  step-3 chain at fold 31 needs maxsum_5(T_29)/G2 < 1.376  ->  measured 1.9767   BUSTS
```

> **The step-3 chain dies at fold 31 (VERIFIED).** L(T_29, 31) = 4, so the bound
> is `maxsum_5(T_29) = 510` and the chain's value at x = 31 is
> `698.3 * 510/258 = 1380.5` **against a target of 31^2 = 961**. Running slack
> goes 0.186 -> **-0.363**. Six folds from a base of T_11, with the true L at
> every step and no slack given away anywhere.

Two custody checks pass on the way: D(T_29) = 214,708,725 is exactly
`prod_{3<=p<=29}(p-2)`, and G2(T_29) = 258 reproduces the published ladder from a
generator that never touches a sieve.

**And rho is largest at the deepest tile, which is the unhelpful direction.**
`max_{m<=8} rho(m)` reads 1.58, 1.78, 1.83, 1.41, 1.84, **2.39** at T_11 to T_29:
larger at T_29 than anywhere below it, but not monotone, since it dips to 1.41 at
T_19. Section 8's threshold `L <= 0.31 p / ln p` used rho = 1.5; at rho = 2.4 it
tightens to `L <= 0.19 p / ln p`.

The asymptotics above say the burn turns around near p ~ 800 if and only if L is
polylog. **That is the entire u-frame branch, and it is the L question with
nothing added.**

## 9. What survives, precisely, and what it needs

Three things survive, and they are not the same kind of thing.

**1. The exact copy theorem for the whole maxsum family (U-FRAME section 5a,
step 2).** `maxsum_m(new) = max over the p 2-sets {a, a-2} of maxsum_m(old minus those
classes)`, **VERIFIED 40 of 40, over five folds and m ≤ 8**, and resting on the
measured clause that no straddling window ever beats a single-copy one. **The only
object in the branch whose index cost is
zero**: m stays m under folding. It is immune to NFP (no accumulating index, no
deficit, no gate) and immune to the Overshoot Budget (an identity overshoots by
nothing), for as long as the identity holds outside the range it was checked in.
What it needs is a way to bound a residue-deleted maxsum without going
through a kill count, which is a genuinely different question from anything the
branch has attacked. Nobody has tried it directly, meaning no branch here has; that is an internal absence, not a literature one (`SEARCH-CONVENTIONS.md`).

**2. A9's transfer operator (U-FRAME section 11).** Exact, iterates arbitrarily
far, and PRIOR ART (Holt and Rudd 2014 section 5). It survives everything here.
What it needs to become a proof rather than a simulator is closure at the
histogram level: it is currently a function of the old gap **word**, and reading
G2 off it means running it.

**3. The per-fold multiplier bound, which is the one surviving form of the L
question.**

> Bound the per-fold multiplier by `ln c(p) <= 2 ln p / p`, with a total lifetime
> slack measured at 0.88 to 1.19 nats. Via 5a step 3 this is exactly
> `L <= 0.19 to 0.31 * p / ln p` on average over the ladder. A5 Theorem B proves
> `L <= 0.18 p`. **The gap is a factor 0.58 to 0.95 ln p (0.18/0.31 and
> 0.18/0.19), and it is the only gap.** The two ends are rho = 1.5 and rho = 2.4,
> and since rho is not monotone in the level neither end is the one a trend
> favours.

**A proof that c decays at any rate is worth nothing here.** It must decay at
`2 ln p / p`, and the measured multiplier is already at that rate, mean 1.06 of
budget over Ziller and Morack's 21 terms with no downward trend. Any asymptotic
room is the factor `alpha/2` and nothing else, which makes it the exponent
question rather than a new lever. The u-frame reformulation buys
form, as U-FRAME section 6 says. It buys no measured slack at all.

## 10. Honest limits

**The Overshoot Budget is conditional on the measured G2 law.** `G2 ~ 0.55(ln W)^2`
is MEASURED over 12 levels, with fitted exponents running 1.48 to 2.17 depending
on the window. Every reading used here is a whole-period one, which is the
diagonal of `maxgap-law.md` §4, so the constant is stable in the sense that note
establishes and must not be carried to a localized window, where the same object
reads about twice as large. If the exponent is genuinely above 2 the Zone
Postulate is false and the budget is negative; if the constant is smaller the
budget is larger. What
is not conditional is that the budget is a **constant number of nats spread over
an infinite ladder**, whatever that constant is, and that no per-fold reformulation
can create more of it.

**Section 8's threshold uses three measured laws at once** (G2, mbar, rho), so its
constants 0.19 to 0.31 should be read as one significant figure. What does not
depend on them is the BRANCH of the answer: a factor of order `ln p` against a
target of O(1). The constant in front of it is the range `0.58 to 0.95`, and the
branch argument holds at either end, which is the reason it is worth making
separately from the constant.

**rho is measured on six tiles and it has no trend.** Its per-level median runs
1.33, 1.26, 1.15, 1.27, 1.71 at T_11 to T_23 and its per-level max 1.58, 1.78,
1.83, 1.41, 1.84, 2.39 to T_29: neither is monotone, and the high readings sit at
the deepest tile rather than on a rise. We have no model for why, and the
extreme-value argument that would predict rho -> 1 assumes an exponential gap
tail, while the tile is measurably under-dispersed (sd/mbar = 0.51, 0.55, 0.60,
0.64, 0.67, 0.69 at T_7 to T_23, rising toward 1 but not there). Do not
extrapolate rho in either direction.

**Nothing here touches the parity wall or the sifting parameter.** Every argument
above is bookkeeping about budgets. That is a strength as far as it goes, and it
means none of it can be evidence about whether the L question is provable, only
about what a proof of it would have to deliver.

## 11. Reproduction

```
node research/gate-multiplies-01.js 23     # 0.2 s, ladder to T_23, maxsum + budgets
node research/gate-multiplies-02.js 29     # 17 s,  kappa(m) at four folds, true L
node research/gate-multiplies-03.js        # 4.3 s, streams T_29, maxsum_m to m = 12
```

Custody: `gate-multiplies-01` reproduces the G2 ladder 12, 30, 42, 66, 108, 150,
204 and `-03` reproduces 258, from a copy-theorem generator that never sieves.
`maxsum_2(T_19) = 186`, `maxsum_3(T_23) = 300`, `maxsum_4(T_23) = 348`,
`maxsum_8(T_23) = 528` and `maxsum_10(T_13) = 282` all match the values recorded
independently in U-FRAME sections 5a and 8. D(T_29) = 214,708,725 equals
`prod_{3<=p<=29}(p-2)` exactly.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
