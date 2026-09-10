# The u-frame: the Zone Postulate as one inequality in one variable

<!-- ledger
id: Q-u-frame
status: PARTIAL
todo: none
question: Does restating the Zone Postulate as one inequality in u, stepping on odd numbers rather than on primes, buy anything against the wall?
verdict: It buys form and closes off a class of dead ends, but no difficulty and no slack: the requirement ln c(p) <= 2 ln p/p is exactly what the per-prime analysis already gave and the measured ladders run at about the full rate, so this is a change of coordinates rather than of terrain.
-->

*(Adopted 2026-08-16, from Chris's proposal to step forward on u rather than on
p. This note holds the frame, its proofs, the measurements that go with it, and
an honest account of what the reframing does and does not buy. Calibration
marked throughout: PROVEN, VERIFIED by exact computation, MEASURED, REFUTED.)*

## 1. The problem with stepping on p

The Gap Reformulation compares G₂(p#), the largest gap between twin slots,
with the zone (p,p′²). It can be useful to index the process by all integers
instead of successive primes. The u-frame makes that change of coordinates
without changing the survivor condition.

Dependence on the next prime is not itself an impossibility result for a
formula or a proof. The earlier claim that no one can write p′ as a function
of p was too strong; the issue is obtaining a useful estimate, not defining
the function. The current arithmetic campaign is in
`chen-fold-benchmark.md` and `chen-signed-target.md`; the u-frame remains a
separate sufficient reformulation.

## 2. Fold on the odd numbers

Fold the twin-slot comb by every odd number in turn, 3, 5, 7, 9, 11, 13, 15,
17, and so on. A fold by U lays U copies of the tile and strikes the residues
0 and −2 modulo U.

**Inertness Lemma (PROVEN, one line).** If U is composite then the fold by U
kills nothing.

*Proof.* Let q be the least prime factor of U. Then q < U, so q was already
stacked at an earlier fold. If U divides r then q divides r, so r was already
dead; likewise if U divides r+2. Hence no slot is removed. ∎

The lemma needs no primality test and no table. It says every composite fold is
a no-op by construction, which is what lets the fold index be closed-form while
the productive folds remain exactly the primes.

**VERIFIED.** Folding 3, 5, 7, 9, 11, 13, 15, 17 from the mod-2 comb:

| fold U | composite | kills | G₂ after |
|---|---|---|---|
| 3 | no | 2 | 6 |
| 5 | no | 2 | 12 |
| 7 | no | 6 | 30 |
| 9 | **yes** | **0** | 30 |
| 11 | no | 270 | 42 |
| 13 | no | 2,430 | 66 |
| 15 | **yes** | **0** | 66 |
| 17 | no | 400,950 | 108 |

The ladder 6, 12, 30, 42, 66, 108 reproduces the prime-fold ladder exactly, with
flat steps at the composites. Also verified for folds by 4, 6, 8, 9, 25, which
kill nothing and leave G₂ at 12: the tile width balloons from 30 to 1,296,000 with
no change to the hole pattern, because repeating a pattern cannot change its
maximum gap. The waste is real and entirely harmless.

## 3. The frame

G₂(u) is a step function of u, constant between primes and jumping only where a
new prime enters. The Zone Postulate route becomes

> **G₂(u) < u² for every integer u**,

binding immediately after each jump, that is at u = p. By the Inertness Lemma
only the prime folds contribute, so with c(p) the multiplier at the fold by p
the telescope is

> **G₂(u) ≤ 12 · Π_{p ≤ u} c(p)**,

and π(u), the number of folds that are not no-ops, is closed-form by the prime
number theorem.

**The requirement is on the partial sums, not on a uniform constant (PROVEN,
VERIFIED in `research/gate-multiplies.md` §7).** Read as a uniform c the
statement is vacuous, since 12·c^{π(u)} < u² at every u forces c = 1: the
permitted per-fold budget 2 ln u/π(u) tends to 0. Read correctly the condition is

> **Σ_{p ≤ u} ln c(p) ≤ 2 ln u − ln 12 at every u**,

and differentiating it along the primes, one fold at a time, gives the sharp
per-fold rate

> **ln c(p) ≤ 2 ln p / p**.

Everything is now expressed in u alone. No prime locations appear anywhere.

**That rate is a factor ln u tighter than dividing the budget by π(u).** The
softer form ln c ≲ 2 ln²u/u does not telescope: Σ_{p≤x} ln²p/p ~ ln²x/2 against
a budget of 2 ln x, so it overspends by ln x/4 per unit and certifies
x^{ln x − 2}. VERIFIED numerically, the bound it licenses exceeds u² by 4.6× at
u = 37, 149× at u = 100 and 1.6e10 at u = 1000.

**And the sharp rate is where the truth already sits (MEASURED).** If
G₂ ≍ (ln W)^α with ln W = θ(x), then c_true = (θ(p′)/θ(p))^α ~ 1 + α·ln p/p, so
the entire asymptotic headroom is the factor α/2 and nothing else. §4 measures
both ladders against 2 ln p/p and finds them spending at about the full rate.
There is no room to be had here unless α is genuinely below 2, which is the
exponent question of §4 and is not settled.

**The Inertness Lemma is load-bearing, not decorative.** If we paid the
multiplier at every odd fold rather than only at the primes, the same budget
would be spread over u/2 folds instead of π(u) and the rate would tighten to
ln c ≲ 4/u, harder by a factor of ln u / 2. The lemma is what buys that factor
back.

## 4. What is measured

**Both ladders spend their budget at about the allowed rate (MEASURED).**
Per-fold multipliers of G₂ at @5→@7 through @31→@37:

  2.50, 1.40, 1.571, 1.636, 1.389, 1.360, 1.265, 1.349, 1.517

geometric mean 1.43 over the last eight, with no trend across nine folds. Read
against §3's sharp rate, that is ln c(p) as a fraction of 2 ln p/p:

  1.65, 0.77, 1.15, 1.48, 1.06, 1.13, 1.01, 1.35, 2.14

so our multiplier uses 77 to 214 percent of its budget, and the fraction is not
falling. Ziller and Morack's adversarial multiplier (§6a), which dominates ours
at every level, extends the reading nine folds further. At p = 41 to 73 it reads

  1.39, 0.97, 1.36, 0.75, 1.15, 1.10, 1.18, 1.00, 0.61,   mean 1.06

so their sequence is spending at exactly the allowed rate. Their raw
multipliers do fall, geometric mean 1.611 over p ≤ 37 against 1.157 over
p = 41 to 73, but the budget falls with them and the ratio does not improve.
**Neither ladder shows the decay the route needs.**

**The lifetime slack, which is the sharpest way to say it (MEASURED).** Any
chain of upper bounds ending in G₂(x#) < x² passes through quantities that are
all at least G₂(x#), so its total multiplicative overshoot over the truth is
capped by x²/G₂(x#). As ln(x²/G₂(x#)) that is 1.058, 0.940, 0.984, 0.878,
0.953, 1.182, 1.016, 0.953 nats at x = 11 to 37: flat across the whole
reachable ladder, with no growing margin anywhere. **About one nat, spread over
an infinite ladder, is the entire budget for every approximation a proof would
make** (`research/gate-multiplies.md` §5).

**As a single exponent (MEASURED, and the estimator is biased).** Writing
G₂ ≍ (ln W)^α, the route needs α < 2. Fitted on our twelve levels:

| fit window | α |
|---|---|
| all 12 levels | 1.476 |
| from x = 7 | 1.674 |
| from x = 13 | 1.861 |
| from x = 19 | 1.983 |
| last four (23 to 37) | 2.170 |

Those numbers cannot be read at face value. `research/exponent-control.md` runs
the same estimator on the one-class Jacobsthal h(p#) = A048670, where the answer
is known: **58 terms, true exponent 1, measured 1.282 ± 0.008, positive bias in
all 40 sliding windows, no drift toward the truth anywhere.** The bias grows
with ladder length and then sticks at +0.28, and the pure power law wins the
model comparison by 47 AIC units with white residuals while getting the exponent
wrong by 0.28. So a clean fit here carries no evidence about the asymptote, and
lengthening the ladder does not repair it.

Corrected by the control's bias at matched width, the readings are **α = 1.57 ±
0.06 for the adversarial h₂ on 19 terms and 1.50 ± 0.05 for our own G₂ on the
22 trusted terms** (the 22-term refit, `research/exponent-control.md` §5),
with a hard floor α ≥ 1 from h₂ ≥ h pointwise. **Central estimate 1.50 for
G₂ (h₂'s figure stays 1.57), practical bracket 1.3 to 1.8, floor 1**, and
α = 2 disfavoured by the one-sidedness of the bias rather than excluded by the
data.

Caveat, and it matters: our local slopes are 1.16, 1.08, 2.03, 0.91, 1.58,
2.03, 1.63, 1.73, 1.45, 2.11, 3.21. The final 3.21 at x = 37, where G₂ jumped
348 to 528, drags every recent fit upward. Drop it and the fit from x = 19 is
1.716. One data point is doing most of the work, which is the same small-sample
disease the control diagnoses.

**What the exponent question is for, and what it is not for.** The proven bound
is G₂ ≪ (log q)^{4.2665+ε}, from the two-dimensional sieve limit β₂ = 4.26645;
the Zone Postulate needs exponent 2. **The job is an exponent reduction,
4.2665 → 2, not a fight over a constant.** Measuring our own α more precisely
says whether the target is true. It does nothing about the 2.27 of exponent
between what is proven and what is needed.

**So G₂(41#) is not the decisive measurement.** Measured on 48 control cases,
adding an eleventh term to a ten-term fit moves the exponent by 0.022 on average
and 0.078 at worst, against a bias of +0.262. Its real value is as a falsifiable
test of the Poisson law, which predicts **476 to 633 with centre 513**
(`research/G2-STATE.md` §6.2), against Ziller and Morack's free-choice ceiling
of 894.

## 5. What makes the maximum gap (MEASURED)

For each fold, the stretch that became the new record, and what filled it:

| fold | new G₂ | kills that made it | merged sub-gaps | old G₂ |
|---|---|---|---|---|
| 7 | 30 | 2 | 6+12+**12** | 12 |
| 11 | 42 | 1 | 12+**30** | 30 |
| 13 | 66 | 1 | 36+30 | 42 |
| 17 | 108 | 2 | 30+**66**+12 | 66 |
| 19 | 150 | 1 | 42+**108** | 108 |
| 23 | 204 | 3 | 24+48+90+42 | 150 |
| 29 | 258 | 2 | 60+60+138 | 204 |

In four of seven folds the winning stretch contains the old maximum gap itself,
so the record is made by killing a slot at the end of the current worst gap and
absorbing its neighbour. Chris's original mechanism was right. What was wrong
was the arithmetic: the absorbed piece is a neighbouring gap of one or two mean
gaps, not another copy of the maximum, so the multiplier is 1 + absorbed/G₂ and
not 2. **REFUTED on the way in:** the guess that the maximum doubles fails at
the first fold, 12 to 30 rather than 24.

**Adjacent kills, and why they are not the lever.** Two slots at distance g can
both be killed by p only if g ≡ 0 or ±2 (mod p), which is PROVEN in one line
from the strike classes {0, −2}. Because grain gaps are multiples of 6 bounded
by G₂, only a few gap values qualify, and they are the large rare ones:

| fold p | qualifying gaps | share of all gaps | longest adjacent-kill run |
|---|---|---|---|
| 7 | {12} | 66.7% | 2 |
| 11 | **none** | 0% | **1** |
| 13 | {24} | 4.4% | 2 |
| 17 | {36, 66} | 4.85% | 2 |
| 19 | {36, 78} | 4.9% | 2 |
| 23 | {48, 90, 138} | 3.1% | 3 |
| 29 | {60, 114, 174} | 3.1% | **2** |
| 31 | | | 4 |
| 37 | | | 4 |

The last column is **L, the longest adjacent-kill run**, whose diagonal is
L = 2, 1, 2, 2, 2, 3, 2, 4, 4 at folds 7 to 37. §10 holds its definition, its
proven bounds, and the reason it is not the quantity to aim at; §8 holds its
custody.

At p = 11 no gap qualifies, so that fold provably cannot make a single adjacent
kill, which is why the run series dips. But the kills column of the previous
table never exceeds 3 even where longer runs were available, so **bounding the
adjacent-kill run bounds the wrong quantity.** The record gap is assembled from
a few large gaps, not from a long run of typical ones.

## 5a. The copy-theorem reformulation, and where the decay comes from

*(2026-08-16, from Chris's proposal to attack the multiplier through the copy
structure. This is the session's main result and every step below is either
proven or verified; the final extrapolation is flagged as such.)*

**Step 1, the kill law (PROVEN).** Fold T_x by p. Each old slot s sits at p
positions s + kW, and gcd(W,p) = 1 makes those p residues mod p distinct, so
**every old slot loses exactly 2 of its p copies**. Read by copy instead of by
slot, with w = W mod p and r_i = s_i mod p, the slot at index i in copy k dies
iff r_i + kw ≡ 0 or −2 (mod p). Hence:

> **Copy k deletes exactly the slots whose residue mod p lies in the 2-set
> {−kw, −kw−2}.**

The fold is not p mysterious operations. It is p residue-class deletions
applied to one fixed pattern.

**Step 2, the exact reformulation (VERIFIED at six folds).**

> G₂(new) = max over the p 2-sets {a, a−2} of the largest gap left after
> deleting those residue classes from the old tile.

Checked against the actual fold at p = 7, 11, 13, 17, 19, 23: exact equality
every time.

**And it holds for the whole maxsum family, exactly (VERIFIED 40 of 40, over
five folds and m ≤ 8):**

> maxsum_m(new) = max over the p 2-sets {a, a−2} of maxsum_m(old minus those
> classes).

No straddling window ever beats a single-copy one, and the reformulation above
is the m = 1 case. This is the real closure, and it lives at the residue level
rather than at the level of the numbers maxsum_j(old). It is also **the one
object in the branch whose index cost is zero**, since m stays m under folding,
which is why `research/gate-multiplies.md` §9 finds it immune both to the
no-fixed-point argument and to the Overshoot Budget. What it needs is a way to
bound a residue-deleted maxsum without going through a kill count, which is TODO
item 0c and which nobody has tried directly. That "nobody" is this repository
and not the literature: no script in `research/` bounds a residue-deleted
maxsum — the thirty-one that compute maxsum, every one checked, go through a
kill count. It is an internal absence, and the literature form of the claim
would have to meet `SEARCH-CONVENTIONS.md`.

**The one identity the maxsum family does have is PRIOR ART, and it must not be
presented as new.** On a cyclic gap word of D gaps summing to W,

> **maxsum_m + minsum_{D−m} = W**, and hence `sd_m = sd_{D−m}`,

verified EXACT at all 1484 m on T₁₃. It is the complement identity of the
circular scan statistic (Cressie, *J. Appl. Probab.* 14 (1977); Naus;
Wallenstein–Naus; Glaz–Naus–Wallenstein 2001 chs. 8–10, 17), so it is OWNED and
no sentence here may claim it (`IMPORT-MAP.md` row 1,
`history/staging/identifications-prior-art.md`). What it buys is a constraint
rather than a bound: any growth law for maxsum_m must be consistent with its
own mirror at D − m, which is what killed the `√m` fluctuation factor's reading
at large m.

**Step 3, a two-sided bound in the old gap word alone — the LOWER half is now
PROVEN (2026-08-19), the upper half VERIFIED at 329 (tile, prime) cells, folds
7 to 37.** A maximal run of L deleted slots merges L+1 consecutive gaps, and
every single slot dies in exactly 2 of its p copies (CRT), so the record
adjacent pair merges somewhere in the big tile — that one line proves the
lower half (`history/staging/attack-l1-residue.md`, Lemma C). Hence

> **maxsum₂(old) ≤ G₂(new) ≤ maxsum_{L+1}(old)**

where maxsum_m is the largest sum of m consecutive gaps and L is the longest
adjacent-kill run. Both halves hold at every cell tested
(`research/a3-10-lower-tightness.js`): the lower bound is exact at 3 of the 9
ladder folds, the upper at 2. The upper bound beats the naive (L+1)·G₂
everywhere, overshooting by 0 to 45% against 20 to 216%.

**The lower half does not become exact with depth.** Its excess runs 6, 0, 0,
12, 0, 18, 24, 18, 120 at folds 7 to 37, so the recursion is not determined by
maxsum₂ and cannot be made so; §10 gives the two mechanisms that break it, one
of them arithmetic and permanent.

**A lower recursion that chains, for the whole family (VERIFIED 40/40).**
maxsum_{m+1}(old) ≤ maxsum_m(new), with ratios 1.000 to 1.354, so
G₂(T₂₃) = 204 ≥ maxsum₂(T₁₉) = 186 ≥ … ≥ maxsum₆(T₇) = 108, one index per fold.
It is a lower chain, so it bounds G₂ from below where the Zone Postulate needs
an upper bound (`research/gate-multiplies.md` §6).

**The upper half is LOOSE, and the strategic verdict follows: aim at κ(m), not
at L.** Write j\*(m) for the sharp shift, the smallest j with
maxsum_m(new) ≤ maxsum_{m+j}(old). Then 1 + j\*(1) is the EFFECTIVE run length,
the smallest window of old gaps that covers the new record, and it measures
3, 2, 2, 3, 2, 3, 3, 3, 4 at
folds 7 to 37 against L + 1 = 3, 2, 3, 3, 3, 4, 3, 5, 5: never larger, strictly
smaller at three folds, and at fold 31 it is 3 where L + 1 = 5. **A proof aimed
at L is therefore aiming past the target.** The object to aim at is κ(m), the
maximum kill count in a window of m consecutive new gaps, which step 3a defines
and which generalises L to the whole family. The effective run length is the
tighter coordinate and a strictly weaker thing to bound than L, but it is not a
shortcut: §10 shows that a constant value for it is impossible, and fold 37 is
where 3 stops holding in any case.

**Step 3a, the family closes and L generalises to κ(m) (VERIFIED 40 of 40, over
five folds and m ≤ 8).** Any m consecutive new gaps are exactly m + (kills
inside) consecutive old gaps, so

> **maxsum_m(new) ≤ maxsum_{m+κ(m)}(old)**, with κ(1) = L.

Closure is real, and the price is that the parameter generalises from the number
L to the sequence κ(m). **The strong forms are REFUTED, and they are left
visible.** maxsum_m(new) ≤ maxsum_{m+L}(old) fails at every fold from m = 4 to 6
(T₁₉→T₂₃, L = 3, m = 6: 462 against maxsum₉ = 390), so κ(m) ≤ L is refuted.
κ(m) ≤ L + 2 holds for all m ≤ 8 at those five folds but is not universal
either: it fails at fold 11, where L = 1 and κ(6) = 4, precisely the fold where
no gap value qualifies, so L collapses to its floor while κ does not, and it
fails by 2 at fold 7, where L = 2 and κ(7) = κ(8) = 6. *(The fold-7
counter-example was added 2026-08-18. It had been hidden by a truncated cyclic
replay in `research/a3-05-bound-L.js`, which printed the fold-7 κ row as
2, 2, 2, 1, 0, 0, 0, 0; the corrected row is 2, 2, 4, 4, 5, 5, 6, 6.)* The L-free
form maxsum_m(new) ≤ maxsum_{m+1}(old) + G₂(old) holds for m ≤ 8 and dies at
m = 10 (maxsum₁₀(T₁₃) = 282 against 210 + 42). Empirically
maxsum_m(new) ≤ maxsum_{m+4}(old) covers every measured case with no L in it at
all, and equality with maxsum_{m+j\*} occurs in 20 of 40 cases. maxsum_m/m is
not monotone, though maxsum is subadditive with zero violations, so Fekete gives
convergence without monotonicity.

**What κ(m) buys, and what it does not.** It has far better tail structure than a
longest run: `research/gate-multiplies.md` §4 measures κ(m)/m falling
monotonically from 2 or 3 at m = 1 to 0.25 to 0.28 at m = 32, at every fold. And
it is the exact statement of what has to be bounded, with about L + 2 of
headroom to spend. What it does not do is remove the dependence on a run
parameter: the L dependence moves into κ(m) and stays, and §10's Theorem C
carries A5's structural cap over to κ, so redirecting L to κ does not move the
wall either.

**Step 4, the additive form of the recursion, is FALSE.** The tempting move is
to write maxsum_{L+1} ≈ G₂ + L·m̄ with m̄ the mean gap, giving

> G₂(new) ≤ G₂(old) + L·m̄, hence G₂(x#) ≲ 12 + Σ_{p≤x} L(p)·m̄(p),

so that the recursion becomes a sum rather than a product. Checked fold by fold
in `research/a3-02-diagonal-f.js` with the measured L, it fails at two of the
seven folds:

| fold | G₂(old) + L·m̄ | true G₂(new) | verdict |
|---|---|---|---|
| 13 | 76 | 66 | holds |
| 17 | 106 | 108 | **fails** |
| 19 | 154 | 150 | holds |
| 23 | 227 | 204 | holds |
| 29 | 260 | 258 | holds |
| 31 | 379 | 348 | holds |
| 37 | 477 | 528 | **fails** |

At T₁₃ folded by 17 the approximation gives 106.4 against the true 108, and at
T₃₁ folded by 37 it gives 476.8 against the true 528. Both are clean failures,
not rounding, and step 3's proven two-sided bound holds at both of them.

The reason is the one §5 already recorded and this step ignored: **the absorbed
neighbour is not a mean gap.** It is drawn from the same fat tail as the record
itself. At fold 29 the merged sub-gaps were 60 + 60 + 138 against a mean of
28.1. Substituting m̄ for a tail draw understates the merge.

**The coefficient is wrong as well as the tail draw.** The step is written with
an implicit slope of 1 in ρ = (maxsum_j − G₂)/((j−1)·m̄). Taken as the median
over j ≤ 8 that slope measures 1.33 at T₁₁ and 1.71 at T₂₃, and over individual
(tile, j) cells it ranges 1.02 to 1.84 across that span, reaching 2.39 at T₂₉.
It is larger at the top of the reachable ladder than at the bottom but not
monotone in the level: the median reads 1.33, 1.26, 1.15, 1.27, 1.71 at T₁₁ to
T₂₃. Whichever reading is taken it is not 1
(`research/gate-multiplies.md` §8).

**Consequence, and it is the important one.** Every argument of the form
"Σ L·m̄ ~ x·ln³x ≪ x², so the route closes" runs through this step and therefore
does not stand. That includes step 7's own dichotomy below and §11's tail
argument. What survives is step 3, the PROVEN two-sided bound, verified to fold
37. **Any asymptotic must be carried by maxsum_{L+1} directly**, and
`research/gate-multiplies.md` §8 prices exactly that: the sharp per-fold budget
of §3 goes through step 3 iff L ≤ 0.19 to 0.31·p/ln p on average over the
ladder, against §10 Theorem B's proven L ≤ 0.18 p. We have no valid asymptotic
in either direction, and the gap is a factor 0.58 to 0.95 ln p.

**Step 5, why the lower bound decays (MEASURED).** maxsum₂ = G₂ + (the gap
adjacent to the maximum), and the neighbour is a typical gap while the maximum
grows. Measured maxsum₂/G₂ = 2.00, 1.40, 1.571, 1.455, 1.389, 1.240, 1.147
across the seven folds. That is the decay mechanism, exactly stated.

**Step 6, what controls L (PROVEN criterion, MEASURED behaviour).** Two
adjacent slots at distance g can both be deleted only if g ≡ 0 or ±2 (mod p),
so L is governed by f, the fraction of gaps meeting that condition, via
roughly L ≈ ln D / ln(1/f). Since gaps are multiples of 6, the smallest
qualifying value is about 2p. Sweeping L(T_x, p) over tiles T₇ to T₂₃ and
primes 7 to 200 shows L falling to 1 as p grows at fixed tile, and rising with
the tile at fixed p; the fold ladder rides the diagonal, where L = 1, 2, 2, 2,
3, 2, 4, 4 at folds 11 to 37, so **L is not monotone**: it steps back to 2 at
fold 29 before reaching 4 at fold 31, and §10 gives the mechanism. Fold 37 is
measured in research/a3-10-lower-tightness.js by streaming T₃₁, all
6,226,553,025 slots of it.

**Step 7, the dichotomy, and which branch we are on.** L ≈ ln D/ln(1/f) with
ln D ≈ x gives:

- f roughly constant ⇒ L ~ x/3.2, which is linear;
- f decaying ⇒ L polylog.

The branch matters because step 3, priced against §3's per-fold budget, needs
L ≤ 0.19 to 0.31·p/ln p (`research/gate-multiplies.md` §8). Linear L misses that
by a log; polylog L clears it with room. **The old shortcut through Σ L·m̄ is not
available**: that sum is step 4, and step 4 is false.

**MEASURED, and it is the second branch.** The qualifying threshold 2p grows
linearly in x while the mean gap grows only like ln²x, so the threshold recedes
into the tail of the gap distribution:

| tile | fold p | mean gap | threshold 2p | 2p/mean | f | ln(1/f) | L |
|---|---|---|---|---|---|---|---|
| T₁₁ | 13 | 17.1 | 26 | 1.52 | 4.44e−2 | 3.11 | 2 |
| T₁₃ | 17 | 20.2 | 34 | 1.68 | 4.85e−2 | 3.03 | 2 |
| T₁₇ | 19 | 22.9 | 38 | 1.66 | 4.88e−2 | 3.02 | 2 |
| T₁₉ | 23 | 25.6 | 46 | 1.80 | 3.11e−2 | 3.47 | 3 |
| T₂₃ | 29 | 28.1 | 58 | 2.07 | 3.07e−2 | 3.48 | 2 |
| T₂₉ | 31 | 30.1 | 62 | 2.06 | 3.74e−2 | 3.29 | 4 |
| T₃₁ | 37 | 32.2 | 74 | 2.30 | 1.84e−2 | 3.99 | 4 |

The last two rows come from streaming T₂₉ and T₃₁ without ever storing either
tile (`research/a3-02-diagonal-f.js`, attack A2); §8 holds the custody for all
seven rows.

Off the diagonal the collapse is unmistakable: for T₂₃, f runs 0.041, 0.031,
0.031, 0.012, 0.0034, 0.0010, 0.0003, then exactly 0 from p = 71.

**MEASURED, on seven points: ln(1/f) tracks 2p/m̄, and seven points cannot pin
the slope.** The raw
diagonal is not monotone, since T₂₉ steps back up. It is not flat either.
Regressing ln(1/f) on 2p/m̄ over the seven points gives slope 1.062 and
intercept 1.357 with R² 0.730, **but SE 0.289, so the 95% interval is [0.32,
1.81]**. That contains 1, which is why the exponential-tail model is not
contradicted here, and it equally contains the 1.4016 of the alias-free
recomputation, since the published 42-point census fit was defective from
x = 37 (`research/f-decays.md` header, `history/staging/fdecay-deep.md`). Two
extra points move this slope to 1.881. Do not quote 1.06 as a measured exponent.
The exponential-tail model predicts slope
exactly 1 with intercept ln(m̄/6), which runs 1.05 to 1.68 over this range.
As a parameter-free forward prediction rather than a fit,
ln(1/f) ≈ 2p/m̄ + ln(m̄/6) lands within 11% at six of the seven points. So f is
a tail probability at a receding threshold, as claimed, and that is now
measured.

The wobble has a cause. Almost all of f sits in one histogram bin, the
smallest multiple of 6 that is ≡ 0, ±2 (mod p): 24, 36, 36, 48, 60, 60, 72 at
p = 13 to 37. That value tracks 2p to within 8% but repeats across consecutive
folds, and the bin also carries a Hardy-Littlewood comb weight, measured
between 0.73 and 1.94 with no trend. Over this range the comb noise is the
same size as the decay, which is why five points could not separate the
branches.

**And the repeats are not accidents: twin folds share a threshold, so the
diagonal is a staircase whose treads are the twin pairs** (PROVEN, §12). Both
members of a twin pair give the same minimal qualifying gap 2(p+1), so f cannot
advance across a twin fold. That is the whole of the wobble at 17 and 19 and at
29 and 31.

**Consequence for L.** Since 2p grows linearly and m̄/ln²x is measured flat at
2.7 to 3.1, the threshold recedes without limit, so ln(1/f) → ∞ and
L ≈ ln D/ln(1/f) ≈ m̄/2 ≈ 1.4 ln²x, which is polylog. **The shape check is
weaker than this section used to claim**, and the correction of L(T₂₃, 29) from
3 to 2 on 2026-08-17 is why. L/ln²x runs 0.348, 0.304, 0.249, 0.346, 0.203,
0.353, 0.339 across the seven folds: a factor of 1.7 between its ends and not
flat. L/lnD runs 0.408, 0.274, 0.200, 0.234, 0.126, 0.208, 0.177, which falls
overall but not monotonically, reversing twice. Neither ratio is steady enough to
call the branch on its own, and **the two regressions no longer separate the
branches at all**: L on lnD gives R² 0.683 and L on (ln lnD)² gives R² 0.627,
where before the fix they read 0.904 and 0.867
(`research/a3-02-diagonal-f.js`). If L were linear in x the second ratio would
be the flat one, and it is the less flat of the two, so the reading still points
the same way. So the evidence favours the branch the route needs on the ratio
comparison and the mechanism rather than on any fit, and it does
so because **the prime grows linearly while the mean gap grows
logarithmically**, which is the structural asymmetry the lens is built on. A
polylog L clears the 0.19 to 0.31·p/ln p threshold with a margin growing like
p/ln³p, crossing 1 near p ≈ 800. It is evidence for a branch, not a proof of
one.

**Honest limits.** 2p/m̄ still only moves from 1.52 to 2.30, so the lever arm
is short and a true slope near 0.7 is not excluded by seven points. The
independence model overestimates L by a factor of about four, predicting 8 to
16 where we measure 2 to 4, so the shape of L ~ c ln²x is supported but the
constant is not. The exponential-density model is also better than it deserves
to be, since the grain at T₂₃ is still markedly more regular than exponential.
The mechanism is identified and every link is checkable; the asymptotic claim
is not established.

**Where this leaves the question.** It is no longer whether f decays, which is
settled in the direction the route needs (§12 settles it on 42 exact points).
The open question is the valid replacement for step 4, carried on step 3a's
κ(m) rather than on L. Two suggestive coincidences pointed the way to the family:
maxsum₄(T₂₃) = 348 = G₂(T₃₁) and maxsum₈(T₂₃) = 528 = G₂(37#), two and three
folds ahead respectively.

## 6. What the reframing buys, stated honestly

**It buys form.** The statement is now closed-form in one variable, the fold
index is the odd numbers, which folds bite is settled by a one-line lemma rather
than a lookup, and the count of productive folds comes from PNT. Any attack that
would have needed to know where the next prime sits is now unnecessary, and a
whole class of dead ends is closed off.

**It does not buy difficulty, and it buys no slack either.** The requirement
ln c(p) ≤ 2 ln p/p is exactly what the per-prime analysis already gave. The
reframing moves no arithmetic, and the entire problem now sits in one place:
**is the per-fold multiplier bounded by 1 + O(ln p/p), with the constant 2?**
Nothing in this note bounds it, and §4's measurements put both our ladder and
the adversarial one at about the full rate rather than under it. Note what that
does to the win condition: a proof that c decays at *any* rate is worth nothing
here. It has to decay at 2 ln p/p, which is the rate the truth already runs at.

This is a change of coordinates rather than a change of terrain. That is worth
having, since a proof has to be writable before it can be written, but it should
not be mistaken for progress against the wall.

## 6a. PRIOR ART, and it is close: Ziller and Morack 2017

**Our G2 sequence is in OEIS, one offset away: it is A144311 + 1**, Andrew
Carter, September 2008, 22 terms. The 2026-08-16 check recorded here read
"not there — exact-term searches on 2,6,12,30,42,66,108,150,204,258,348,528 at
three offsets all return nothing", and those searches were run in our own
convention; A144311 carries `G2 - 1` under wording containing no "Jacobsthal",
no "twin", no "primorial" and no "gap". `research/SEARCH-CONVENTIONS.md` §2 is
the record of the miss. Consequences: the drafted submission is a **duplicate
and must not be sent**, and G2(41#) = 546 is already published as A144311's
a(13) + 1, so computing it buys verification rather than discovery.

**But the programme of this note is published.** OEIS **A288815**, "Paired
Jacobsthal function applied to the product of the first n primes" (Mario
Ziller, 2017; Ziller and Morack, arXiv:1706.00317, *Divisibility in paired
progressions, Goldbach's conjecture, and the infinitude of prime pairs";
keyword `hard,more`), carries this comment:

> "If a(n) < p_n^2 - p_n holds for n>=3 then Goldbach's conjecture and the twin
> prime conjecture hold as well."

That is the Zone Postulate condition, stated in 2017, in a form STRICTLY
STRONGER than ours. Their a(n) is the ADVERSARIAL paired Jacobsthal, the
maximum over ALL choices of two residues per prime, while our G2 is the single
arithmetic choice {0, -2}. So a(n) >= G2(p_n#) always, VERIFIED at all twelve
shared terms. Their companion A072753 (maximum gap in two-stage prime sieves,
19 terms) is the same object in another normalisation, a(n) = 6*A072753(n) + 6,
and is already known to this repo through the 2D-Rankin work.

**Their 21 terms are free data, and they extend every reading we have.** The
adversarial ratio a(n)/(lnW)^2 decays monotonically from n = 6: 1.411, 1.111,
0.997, 0.990, 0.882, 0.842, 0.806, 0.804, 0.758, 0.765, 0.704, 0.689, 0.674,
0.666, 0.649, 0.604.

**The fitted exponent is 1.62 in the theta frame and 1.924 against x, and the
Zone Postulate threshold is an x-frame quantity.** Fitting a(n) against ln W
gives 1.653 on all 21 terms, 1.613 from n = 6, 1.623 on the last eight; the
same 21 terms fitted against x give **1.924**. Quoting the theta-frame number
against the critical exponent 2 compares two different frames. The control's
bias is +0.282 in x and +0.220 in theta, so after correction the two frames land
at **1.567 and 1.493** and most of the disagreement cancels
(`research/exponent-control.md` §6). The corrected reading is section 4's:
1.57 for h₂ and 1.50 for G₂, bracket 1.3 to 1.8, floor 1, with 2 disfavoured
rather than excluded.

**What their data does settle.** Their 21 points with no outlier are a far
better ladder than our twelve, and our sequence lives underneath theirs at every
shared term. It also hands us G2(41#) <= 894 for free, which is a ceiling rather
than a prediction; the Poisson law's 476 to 633 is the prediction (section 4).

**And the verification of the target extends further than ours.** a(n) < p^2 - p
holds at all 21 computed terms. The margin (p_n^2 - p_n)/a(n) reads 1.11, 1.40, 1.67,
1.04, 1.42, 1.33, 1.38, 1.80, 1.63, 1.88, 1.83, 1.73, 1.68, 1.94, 2.07, 1.92,
2.02, 2.02, 2.00, and against p_{n+1}^2 it reads 2.72, 4.03, 2.56, 1.93, 1.88,
2.05, 2.30, 2.14, 2.40, 2.37, 2.07, 2.12, 2.19, 2.45, 2.25, 2.36, 2.30, 2.17,
2.38. **The two conventions disagree on the trend and agree asymptotically**,
because the OLS slope of log p_{n+1} on log p_n is 0.88 rather than 1 over this
range: with p_{n+1}^2 the trend is -0.084 +- 0.045 and with p_n^2 it is
+0.154 +- 0.035. Against x'^2, which is the Zone Postulate's own threshold, the
margin is **flat at 2.2** with slope +0.018 +- 0.045 over [23, 73], minimum
1.880 at x = 17 and never revisited. Our G2 sits above that at 3.2 to 4.4. So
the route is verified to the 21st prime in the adversarial form, hence a
fortiori for our G2, and the margin is flat rather than growing.

**Second prior art, and it is not close, it is the same object: Holt and Rudd
2014.** Fred B. Holt and Helgi Rudd, arXiv:1408.6002 §5, build the transfer
matrix M_J on the cycle of gaps, eigenstructure and binomial eigenvectors
included. §11's histogram transfer operator is a rediscovery of it in two-class
vocabulary. Their "fusions" are our kills, their cycle of gaps G(p#) is our
tile, and their R1/R2/R3 recursion (Lemma 2.1) is our fold. What is not in their
corpus is the spacing between consecutive g = 2 occurrences, which is our G₂:
their machinery is bounded by |s| < 2p throughout, which is exactly the regime a
maximum gap leaves. See `research/PRIOR-ART.md` §"Holt and Rudd".
**Nothing in §11 may be presented as new structure.** What is ours there is the
exact head engine of the tail paragraph and the numbers it produces.

**Positioning consequence.** We must not claim the reduction; it is Ziller and
Morack's, and we must not claim the operator; it is Holt and Rudd's. What remains
ours, pending a proper read of all three papers, is the u-frame presentation of
section 3, the Inertness Lemma, the mechanism results of section 5, and the
specific arithmetic sequence G2, which is a smaller quantity than theirs and is
**A144311 + 1** in OEIS, published by Carter in 2008 and extended twice since.
Any writeup must cite them and Carter up front.

**First move before any more work here: read arXiv:1706.00317 and
arXiv:1706.03668.** They have thought about this exact inequality for nine
years and their notes on the computation will say what is hard about extending
the ladder.

## 7. Next

1. **The L question, priced — and re-scoped by the 2026-08-19 wave.** Step 3
   goes through iff L ≤ 0.19 to 0.31·p/ln p on average; §10 Theorem B proves
   L ≤ 0.18 p. The wave settled what can and cannot close that factor of 0.58
   to 0.95 ln p: the true per-fold L is EXACTLY the longest alternation-legal
   window of the old gap word (zero slack at all nine computable folds), but the maxsum route to proving it FLOORS at ≈ 0.183x
   (`maxsum_k ≥ G₂`, `a3-05-bound-L.md` §7), so the only object left is the
   window statistic's own growth — and even a perfect L cannot save the tile
   chain below p ≈ 800 (the true-L chain busts at fold 31, `gate-multiplies.md`
   §8). The live ground moved to the ZONE frame, where multi-kills extinguish
   (a measured law, five windows and four decades of Y, out-of-sample validated
   one decade blind at W = 2·10¹¹, where the last multi-kill fold measured 631
   against the sealed band [571, 877],
   `history/staging/attack-foldL-06-scaling.md`,
   `history/staging/foldL-window5.md`; and the law's amplitude is no longer
   fitted — the Arratia–Goldstein–Gordon first moment DERIVES A = 2.2091e−2
   against the record's fitted 2.4312e−2, with c at 0.37σ, beating the geometric
   null on both, `history/staging/import-stein.md`) and the transport chain's
   killer factor collapses (`verify-tailcount-transport.md`); what remains
   there was, briefly, one counting hypothesis at L = 1, stated on residues —
   and it is REFUTED AS A HYPOTHESIS: the residue condition is the kill
   condition with zero slack, the threshold above which the sum vanishes is
   provably ≤ G₂ (measured EQUAL at four of four windows), and the chain sum
   is zero iff G₂ < θ — the statement is the Zone Postulate in residue
   notation (`history/staging/attack-l1-residue.md`, Lemmas A/B/D). The
   relocation to the zone frame is real and its instruments stand; the
   destination is not a smaller problem. The open object remains H″ — the
   window statistic's growth.
2. **The copy theorem for the whole maxsum family (§5a step 2, VERIFIED 40 of 40
   over five folds and m ≤ 8, not proven).** It is the
   one object in the branch whose index cost is zero, m stays m under folding, so
   it is immune both to the no-fixed-point argument and to the Overshoot Budget,
   for as long as the identity holds beyond the range it was checked in.
   What it needs is a way to bound a residue-deleted maxsum without going
   through a kill count. Nobody has tried it directly, meaning no branch here has; that is an internal absence, not a literature one (`SEARCH-CONVENTIONS.md`).
3. **DONE: G₂(41#) = 546 and G₂(43#) = 618 are exact terms** (the run cost
   2m31s against the 37-hour pricing above — the cost-estimates-err-cheap
   rule's best exhibit), both inside their pre-registered Poisson windows.
   §4's fits are on the first twelve levels and predate them; a 14-term refit
   is pending (`research/exact-g2-ladder.js` holds the ladder).
4. The mechanism question is ANSWERED at the record level: the last FOUR
   record-setting folds (23, 29, 31, 37) assembled fresh maxima rather than
   extending the old one — read directly off the genealogy tree, which gives
   G₂(T₂₉) = 258 = 60 + 138 + 60 born @23/@19/@23 with the old record 204
   absent from the ancestry (`history/staging/attack-foldL-04-amortized.md`).
   And the per-fold L question underneath it is settled exactly: L equals the
   longest alternation-legal window of the old gap word, zero slack at all
   NINE computable folds — eight twice independently, the ninth
   (L(T₃₁, 37) = 4, extremal word 150+72+150) by both routes in
   `history/staging/frontier37.md` — see also `attack-foldL-01-census.md`,
   `attack-foldL-02-bridge.md`.

## 8. Reproduction and custody

The fold ladders and the max-gap forensics of §§2, 4 and 5 are regenerated
from nothing by `research/uframe-repro-01-fold-ladder.js` and
`research/uframe-repro-02-maxgap-forensics.js` (both embedded), which checked
150 printed figures and corrected three (§2's tile width 1,296,000; §4's
drop-x37 fit 1.716; §5's fold-17 share 4.85%) — the record is
`history/staging/consolidation-wave.md`. The tables are quotable. What
follows is the part that had custody all along.

**L(T₂₃, 29) = 2, and this is the value the whole fold-29 row rests on.**
Confirmed independently five times: by A4, by A5, by A8
(`research/a3-08-adjacent-pairs.js`, itself three routes — brute force over the
folded 215M-slot tile, the kill graph, and a direct window score), by A9's
operator spectrum, and by A10 (`research/a3-10-lower-tightness.js`, three more
routes, among them a direct triple test finding 243,816 deletable adjacent pairs
and exactly zero deletable triples). That direct window score sits exactly 6
below §11's exact PAIRS(T₂₃, 29) = 243,822, and the 6 is the weight-2 term:
d = 174 = 6p occurs 6 times and is realised by two copies rather than one. So the
upper bound at fold 29 is
maxsum₃ = 300 rather than maxsum₄ = 348, an overshoot of 16% over the true 258.

**`research/Lgrowth.js` was corrected on 2026-08-16 and may be quoted.** Its run
finder, shared with `research/killrun.js`, used to compare the incoming
residue against the older member of the live pair rather than against the
immediately preceding slot, so it accepted residue words like (r, r+2, r−2) whose
last two entries differ by 4, and it reported 3 at fold 29. Both are fixed, and
the corrected diagonal L = 2, 1, 2, 2, 2, 3, 2, 4 at folds 7 to 31 agrees with
`research/a3-08-adjacent-pairs.js`, which found the same bug independently. The same routine
generates its whole off-diagonal sweep.

**The streaming custody, which is what the deep folds rest on.** T₂₉ was
streamed out of T₂₃ in 34 s and T₃₁ out of T₂₉ in 126 s, and neither tile was
ever stored. The streaming leg recovers G₂(31#) = 348 from T₂₉ in 10 s and
G₂(37#) = 528 from T₃₁'s 6,226,553,025 slots in 519 s, both matching the
published sequence, and the streamed 258 and 348 are the recorded 10th and 11th
entries of a G₂ ladder built by an unrelated lattice walk. The generator
reproduces T₂₃ bit for bit from T₁₉, and the five original diagonal rows of §5a
step 7 reproduce exactly.

**And G₂(37#) = 528 has a second, INDEPENDENT EXHAUSTIVE certificate** (2026-08-19,
forty-third pass): `maxsum₁ = 528` over all 217,929,355,875 gaps of T₃₇, computed
by the scan-statistic engine, which shares no code with either exact-ladder
producer. That is a maximality certificate rather than an agreement — it is the
maximum over the whole tile, not a match against a published term — and it is the
strongest custody this corpus holds on its own central object
(`history/staging/scanstat-t37.md`).

## 9. Honest status

Asked directly whether this line is in a good spot. The calibrated answer is
**better in understanding, not meaningfully closer to a proof.**

**Solid.** Folding by p is exactly p residue-class deletions on one fixed
pattern (PROVEN; VERIFIED at six folds). The two-sided bound
maxsum₂ ≤ G₂(new) ≤ maxsum_{L+1} holds in the old gap word alone (VERIFIED at
329 cells over folds 7 to 37), and §5a step 2's copy theorem lifts it to the
whole maxsum family exactly. The per-fold budget is sharp rather than
approximate: §3's
ln c(p) ≤ 2 ln p/p, with the whole route's lifetime slack measured at about one
nat. The difficulty is localized to one named, cheaply measurable quantity.

**Solid, and a hole that has since closed.** The growth law of maxsum_m is no
longer missing. `research/localized-04-maxsum.md` measures
**maxsum_m = m·m̄ + σ·√(2m·ln D)**, unfitted, holding to 12 percent over
m ∈ [2 ln D, 1024] and over three decades of window size, with σ/m̄ ≈ 0.89 to
0.95. *(CORRECTED 2026-08-18 from "6 percent", which was the home's figure and
which the home's own printed intervals refute: R/EV runs to 1.119 at x = 3499.
This site is not independent corroboration, it cites the home in the same
sentence.)* So R(m) = maxsum_m/(m·m̄) falls to 1 from above and never plateaus, and
sup_m R(m) = R(1) ≈ ln D. That is measured in the head, on a segmented sieve of
[0, Y); on the tile the related ratio ρ = (maxsum_m − G₂)/((m−1)·m̄) is larger
and does not fall, reading 1.58, 1.78, 1.83, 1.41, 1.84, 2.39 at T₁₁ to T₂₉ as
the maximum over m ≤ 8, which is not monotone in the level (see §5a step 4 for
the central reading). The extreme-value model that predicts ρ → 1 assumes an
exponential gap tail while the tile is measurably under-dispersed. Do not
transfer the constant between the two settings, and do not extrapolate ρ in
either direction. *(Settled 2026-08-20: these are TWO OBJECTS sharing a
formula, not a contradiction with the seven-level refutation — that
refutation is measured on the cyclic TILE family (`scanstat2.md`,
`scanstat-t37.md`); the head/anchored window setting has its own constants,
and this paragraph's no-transfer rule is exactly why the two sets of
statements can both stand.)*

**Not solid.** Nothing is proven about L. We have nine integers, 2, 1, 2, 2,
2, 3, 2, 4, 4, and a heuristic. The upper half of the bound is inert without an L
bound, so the chain has a hole at exactly one point and everything rests there.
Steps 1 and 2 of §5a are probably folklore: "folding a wheel by p deletes two
residue classes" is what folding means, and a specialist would call it obvious.
The clarity is useful to us; it is not a discovery.

**The hole, priced.** `research/gate-multiplies.md` §8 runs step 3 with the true
L at every fold, the most favourable reading the proven machinery allows, and
chains it from G₂(T₁₁) = 42. The running slack ln(x²/bound) falls 1.058 → 0.186
over five folds, and **the chain dies at fold 31**: L(T₂₉, 31) = 4 forces
maxsum₅(T₂₉) = 510, giving 1,380.5 against a target of 31² = 961, slack
−0.363. VERIFIED by streaming all 214,708,725 slots of T₂₉. So the branch goes
through iff **L ≤ 0.19 to 0.31·p/ln p** on average over the ladder, against §10
Theorem B's proven **L ≤ 0.18 p**. The gap is a factor **0.58 to 0.95 ln p**
(0.18/0.31 and 0.18/0.19), and it is the only gap. The two ends are the two
readings of ρ, 1.5 and 2.4, and since ρ is not monotone in the level neither end
can be presented as the one the trend favours.

**The structural warning, which should carry the most weight.** The chain, if
completed, proves G₂ < x², which is the Gap Reformulation, which proves TPC.
So by construction it must contain something at least TPC-hard. The only
question is where, and the answer is L. Bounding L means showing that long runs
of LARGE gaps do not occur in the grain at the scale ~2p, inside a tile of
width p#. That is a statement about the tail of the gap distribution at a
specific scale, which is an INTERVAL statement, not a residue one. Our own
triage rule says that is the hard kind, and it is the same place the parity
obstruction lives. The work here relocated the difficulty precisely; it did not
dissolve it.

Ziller and Morack have had the adversarial version since 2017 and have not
closed it either.

**Compute guidance.** Extending the diagonal f is minutes and discriminates the
two branches, so it is worth doing on curiosity alone. It will show which
branch the data favours, not which is true, since the branches separate only
asymptotically. Do not budget serious compute against this line until L has a
proof strategy that is not "measure it further."

## 10. L and κ(m): the proven bounds, and why L is not the target

L is the longest adjacent-kill run, κ(m) its generalisation to the whole family,
κ(1) = L. Both are governed by the criterion that two adjacent slots at distance
g die together only if g ≡ 0, ±2 (mod p), whose closed form is three progressions
of modulus 6p with weights 1, 1, 2, putting the smallest qualifying gap at exactly
2p ∓ 2 rather than "about 2p". **PROVEN:** the Alternation Lemma, which makes a
run a two-state walk, raises the floor from 2p on a single gap to 3p on a window
and forces the fold-29 dip; Theorem A, the Run Cost; **Theorem B, the first
unconditional bound on L, L ≤ 0.18 p**; and Theorem C, which carries the argument
to κ(m). **The wall:** Theorem B can never prove L below G₂/(3p), which is
LINEAR, the failing branch, and Theorem C inherits the ceiling, so redirecting L
to κ does not move it. **PROVEN, and it closes a route:** exactness of the lower
bound can never hold from some level on, one of its two mechanisms being the
permanent arithmetic event p | G₂, G₂ ± 2; and no constant can replace the
effective run length either. The target is κ(m), and inside it the rarer ±2 class
at 4p.

**PRIOR ART on the Alternation Lemma's LANGUAGE, not on the lemma.** The
two-state walk is the B = 1 charge constraint / alternate-mark-inversion of
Marcus–Roth–Siegel §2.3 p. 47, its capacity in their §3.2 p. 75, so the
constraint graph's strict soficity and its capacity ln 2 are reproductions and
**nothing there may be presented as new structure**. Ours is the arithmetic:
that the fold imposes this constraint, the 3/p → 2/p rate correction, the
weight-(1,1,2) multiplicity, and the wall address (`IMPORT-MAP.md` row 2).

Derivation, tables, the wall located precisely and the honest limits:
[research/kappa-not-L.md](kappa-not-L.md).

## 11. The exact machinery: the histogram transfer operator and the pair count

Two exact instruments, neither of which needs a tile in memory, are what make the
f and L questions measurable at any level in reach. **PROVEN, VERIFIED exactly at
six folds:** the new gap histogram is generated from the old
gap word and q **and from nothing else**, which is the misalignment principle in
its sharpest form. Its honest limit is that the operator is closed on the gap
word rather than on the histogram, so it is an exact simulator and not a source
of bounds. **PROVEN, VERIFIED at every fold to 37:** the exact pair count
PAIRS(T, p), whose weight 2 on the p-divisible sizes is §10's multiplicity, and
the alternation check at fold 37, the deepest the lemma has. The head engine
gives the tail at any level and 31 exact diagonal points, carrying a FIT that
must not be used past the range it was fitted on. The operator is PRIOR ART
(Holt and Rudd 2014, **§5**, pp. 17-19, where M_J is built as a bidiagonal
matrix; see this file's own **§6a**) and **nothing there may be presented as new
structure**. *(Corrected 2026-08-18, PDF read: this said "Holt and Rudd 2014,
§6a". Their paper has no §6a — its §6 is "Polignac's conjecture and beyond" and
is not subdivided — and the "§6a" was this document's own section all along, as
`operator-and-pair-count.md`:13 makes explicit. As written it read as a
citation into their paper and sent a reader nowhere.)*

Statements, tables, the fit and its caution:
[research/operator-and-pair-count.md](operator-and-pair-count.md).

**The Tail-Count Transport [PROVEN, 2026-08-19].** Read as an inequality
through its own multiplicity bounds (`ν_q(i,0) ≤ q−2`, `ν_q(i,L) ≤ 2`), the
operator transports the whole tail-count profile: folding `T_x` by `q`, the
count of new windows with sum ≥ θ satisfies
`N_new(θ) ≤ (q−2)·N(θ) + 2·Σ_{L≥1} Q_L(θ)`, where `Q_L(θ)` counts old windows
of L+1 gaps with sum ≥ θ whose L−1 interior gaps admit a legal walk on a 2-set
mod q — so `G₂(new)` is at most the largest such window sum. Exact at folds 11
through 37 (eight folds; at 37 even the loose form is exact,
`history/staging/frontier37.md`), and the exactness is structural: keeping the
endpoint-live conditions as well turns the certificate into `G₂(new)` itself.
The inequality's own margin narrows monotonically (max N_new/RHS 0.888 → 0.948
across folds 17..37, +0.012 per step) — it is proven, so the rise means the
evaluator approaches tightness; fold 41 is the cheap check. A sharp
per-level evaluator, not a source of a chained bound: on the tile the (q−2)
factor forbids chaining, and the same alignment sum that forbids it is what
makes the evaluator exact (`history/staging/attack-foldL-03-transport.md`,
independently verified in `verify-tailcount-transport.md`).

## 12. f, the qualifying-gap fraction: 42 exact points and the staircase

f is the fraction of gaps that qualify, ≡ 0, ±2 (mod p), and it governs L through
roughly L ≈ ln D/ln(1/f) (§5a step 6). **MEASURED on 42 exact points, x = 11 to
199, with no tile ever built:** f falls by a factor of 170 over that range (the census behind that figure is DEFECTIVE from x = 37 — shift-alias, `history/staging/fdecay-deep.md` — and the corrected factor is LARGER, so the reading strengthens; §5a step 7's seven-row table is x ≤ 31 and unaffected), which
is the polylog branch, the one the route needs. It is the branch, not the route.
The scatter is arithmetic, a singular-series comb on the minimal qualifying gap.
**PROVEN:** both members of a twin pair share d_min = 2(p+1), so the qualifying
threshold cannot advance across a twin fold and **the diagonal is a staircase
whose treads are the twin pairs**, which is the whole of the apparent
non-monotonicity; and Lemma B, the structural negative, which puts the cheap half
of the grain census law out of reach exactly where f lives and caps the CENSUS at
x ≈ 200; the deep-window instrument measures f to x = 829, and L_win = 2 at every
level 97..829, so a window can measure f but never L. The corrected growth law is
a fit over 51 window levels, not a theorem
(`history/staging/fdecay-deep.md`).

The census, both regressions, the comb and the caveats kept visible:
[research/f-decays.md](f-decays.md).

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
