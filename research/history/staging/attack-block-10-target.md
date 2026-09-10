# Attack block 10: what the squaring ladder actually needs

<!-- ledger
id: Q-block-target
status: CLOSED
todo: none
question: What exponent does the squaring ladder v -> v^2 actually need, and do the steps get easier up the ladder?
verdict: The required exponent is exactly 2 with a constant below 1, which by the p^2 rule is TPC-equivalent, and the requirement is exponent-invariant at every step, so as a route to a theorem weaker than TPC the ladder is dead.
-->

Target of the block campaign of 2026-08-18. This file establishes the number the
other nine attacks are aiming at, before anyone spends effort trying to hit it.

## HEADLINE, up front

**The required exponent is 2. Exactly 2, and with a constant below 1.**

In slot units the requirement on the block v -> v² is

>   combined L(v) + 1  <=  (v⁴ − v²) / m̄(T_v)   ≈   0.4162 · v⁴ / ln²v,

which is the same statement as G₂(x#) < x² − x at x = v². That is the lower
endpoint of the open band (2, 4.2665], not a point inside it. By the p² rule
(Ziller–Morack Prop. 3.2/3.5, `research/covering-dive.md` line 47) it is
TPC-equivalent. **As a route to a theorem weaker than TPC, dead.**

**Easier or harder up the ladder: neither, in exponent.** The requirement is
exponent-invariant. Every step asks for the same exponent 2 at its own scale, so
there is no k past which the steps become soft. In *margin* the ladder is a
doubly-exponential amplifier of whichever side of 2 the truth is on: it squares
the margin every step if the true exponent is below 2, freezes it at 1/A if the
exponent is exactly 2, and squares the deficit every step if it is above 2. The
ladder cannot manufacture the sign. It only magnifies it.

---

## 1. The per-step requirement, in three forms

### Setup and the mean gap

m̄(T_v) = v#/D_v = 6 · ∏_{5≤p≤v} p/(p−2). Its limit is Mertens plus the twin
constant:

  ∏_{2<p≤v}(1−2/p) = ∏_{2<p≤v}(1−1/(p−1)²) · ∏_{2<p≤v}(1−1/p)²
                   ~ C₂ · 4e^{−2γ}/ln²v,   C₂ = 0.6601618,

so D_v/v# ~ 2C₂e^{−2γ}/ln²v and

>   **m̄(T_v) → C·ln²v,  C = e^{2γ}/(2C₂) = 2.402607120…**

Checked against the exact product: m̄(T_5) = 10 against 6.22 (ratio 1.607, small-v
Mertens drag), m̄(T_23) = 28.054 against 23.62 (1.188), m̄(T_619) = 100.84 against
99.28 (1.016), m̄(T_390607) = 398.38 against 398.30 (**1.0002**). The constant is
exact and the drag is gone by v ≈ 10⁵.

### Form A, slot units (the form an L-bound must meet)

Block k folds v_k -> v_{k+1} = v_k². The step that the block certifies is the
*next* window, (v_{k+1}, v_{k+1}²), of length v_k⁴ − v_k². A new gap that spans a
run of L deleted slots is a sum of L+1 old gaps, so

>   **L_k + 1  ≤  (v_k⁴ − v_k²) / m̄(T_{v_k})  ≈  0.4162 · v_k⁴ / ln²v_k.**

At block 0: 600/10 = **60** allowed, measured L+1 = **20**. Margin 3.00.

### Form B, integers

>   **G₂(q#) < v_{k+1}² − v_{k+1},  q = largest prime ≤ v_{k+1}.**

At block 0: **204 < 600**. Margin 2.94. (The two margins differ by 204/200, the
maxsum concentration factor of §1c.) The conservative window v² − v is used
throughout; the true zone of q is (q, q′²), which at block 0 is 818 rather than
600, worth 1.36x once and nothing asymptotically.

### Form C, exponent

log(x#) = θ(x) ~ x, so an upper bound G₂ ≪ (log q)^t on the primorial q = x# is
G₂(x#) ≪ x^t in integers. Setting x^t against the window x² − x:

>   **t < 2, or t = 2 with constant A < 1.**

*Independent check on θ, prompted by a mid-run correction to the campaign.* The
relevant quantity is θ(x) at the level's own top prime, never 2·θ(v). Measured
θ(v²)/v²: 0.769, 0.885, 0.952, 0.991, 0.997, 0.998 at v = 5, 11, 31, 101, 331,
997. θ(v²) ~ v², confirmed here from a sieve to 10⁶, and this derivation never
used 2v at any step.

### 1c. The identity G₂(new) = maxsum_{L+1}(T_v): sharp, and not an accident

The inequality half is proven and is the two-sided statement of U-FRAME §5a,
maxsum₂(old) ≤ G₂(new) ≤ maxsum_{L+1}(old). Equality needs the extremal run to
sit where the (L+1)-gap sum is maximal.

At block 0 that is checkable by hand. The T_5 gap word is 6,12,12 with period 3
and sum 30. Twenty consecutive gaps are six full periods (180) plus two more, and
the cyclic adjacent pairs are (6,12), (12,12), (12,6) = 18, 24, 18. So the three
alignment classes give 198, 204, 198, and maxsum₂₀(T_5) = 204 = G₂(23#).

One alignment class in three is extremal, and there are of order 10⁶ candidate
positions in the 22,309,287-slot period. **The equality is expected to persist**,
not because of anything special about 5, but because the max over many extremal
runs will find the best alignment class whenever the number of maximal runs
exceeds the number of alignment classes. There is no small-number accident here,
and, more to the point, **no hidden slack**: nothing discounts the step from "L
slots die" to "the gap is (L+1)·m̄".

The residual conversion factor is bounded and vanishing. §4d of `G2-STATE.md`
gives maxsum_m = m·m̄ + σ√(2m ln D) with σ/m̄ ≈ 0.95, hence

  R = maxsum_{L+1}/((L+1)m̄) = 1 + 0.95·√(2 ln D_v/(L+1)).

Since ln D_v ≈ θ(v) ~ v while the required L+1 ~ v⁴/ln²v, R = 1 + O(ln v /
v^{3/2}) -> 1. Numerically: 1.169 at block 1, 1.039 at block 2, 1.0016 at block 3.
The conversion is asymptotically free and is not an exponent-level cost.

---

## 2. The compounding question, which is the real content

### The recursion

Let β_k = ln G₂(v_k#)/ln v_k be the *local* exponent at level k, and let φ_k be
the block's growth exponent, G₂(v_{k+1}#) = G₂(v_k#)·v_k^{φ_k}. Since
ln v_{k+1} = 2 ln v_k,

>   **β_{k+1} = (β_k + φ_k)/2.**

Verified at the one real block: β₀ = ln12/ln5 = 1.5440, φ₀ = ln(204/12)/ln5 =
1.7604, and (1.5440+1.7604)/2 = 1.65217 = ln204/ln25 exactly.

This is an *averaging* recursion, and it is the one genuinely encouraging
structural fact in this file. The ladder forgets its starting exponent at rate
2^{−k}: β_k → φ if the per-block exponent settles. A bad first level cannot poison
the ladder. The requirement β_{k+1} < 2 reduces, given β_k < 2, to **φ_k ≤ 2**:
the block may *square* the max gap and still close.

But β → φ means the exponent to be proved per block is the same exponent as the
global one. **The recursion buys forgetting of the constant, not of the
exponent.** There is no k at which the exponent requirement relaxes.

### Which wins, the doubling window or the ln²v mean gap

The window at level k+1 is v_k⁴, the old mean gap is C ln²v_k, so the allowance in
slots is v_k⁴/(C ln²v_k). The mean gap contributes only a logarithm and never
competes with a fourth power. The window wins outright at every step. That is why
the allowance in *slots* explodes, and it is also why the explosion is
uninformative: the object being bounded, G₂(v_k⁴ ...), grows with the same window.

The margin is the only thing that moves, and it moves according to the truth:

| k | v_{k+1} | window W | margin if G₂ = 0.386x² | margin if G₂ = 1.09·x ln²x | margin under proven x^{4.2665} |
|---|---|---|---|---|---|
| 0 | 25 | 6.00e2 | 2.49 | 2.13 | 10^−3.2 |
| 1 | 625 | 3.90e5 | 2.59 | 13.8 | 10^−6.3 |
| 2 | 3.906e5 | 1.526e11 | 2.59 | 2.16e3 | 10^−12.7 |
| 3 | 1.526e11 | 2.328e22 | 2.59 | 2.11e8 | 10^−25.3 |
| 4 | 2.328e22 | 5.421e44 | 2.59 | 8.05e18 | 10^−50.7 |
| 5 | 5.421e44 | 2.939e89 | 2.59 | 4.69e40 | 10^−101.4 |
| 6 | 2.939e89 | — | 2.59 | 6.35e84 | 10^−202.8 |

Read the three columns as the trichotomy:

- **exponent < 2** (the x ln²x law, which is what `G2-STATE.md` §5a's certified
  construction actually measures, Y₂/(x ln²x) flat at 1.0 to 1.3 over a 108-fold
  range in x while Y₂/x² falls 11.6x): the margin squares every step. 2.1, 13.8,
  2162, 2.1e8. Self-sustaining after roughly two steps, in margin.
- **exponent = 2** (the small-x fit G₂ ≈ 0.386x², which holds to 37): the margin
  is frozen at 1/A = 2.59 forever. Knife edge. The ladder closes at every step
  and never gains, and its truth rests on a constant, which no exponent method
  produces.
- **exponent > 2** (everything currently proven): the deficit doubles in the
  logarithm every step. The proven bound already misses block 0 by 1600x, and it
  misses block 6 by 10²⁰².

Required L in slots, for orientation, against the same three models:

| k | v_k | required L+1 | L+1 if G₂ = 0.386x² | L+1 if G₂ = 1.09 x ln²x | L+1 under proven bound |
|---|---|---|---|---|---|
| 0 | 5 | 60 | 24.1 | 28.2 | 9.21e4 |
| 1 | 25 | 1.39e4 | 5.38e3 | 1.01e3 | 3.02e10 |
| 2 | 625 | 1.51e9 | 5.84e8 | 7.00e5 | 7.13e21 |
| 3 | 3.906e5 | 5.84e19 | 2.26e19 | 2.77e11 | 1.30e45 |
| 4 | 1.526e11 | 3.40e41 | 1.31e41 | 4.23e22 | 1.68e92 |

**Verdict on the compounding question: the requirement neither loosens nor
tightens in exponent. It is scale-invariant, fixed at 2 at every rung. The claim
"only the first few steps are hard" is FALSE.** What is true, and worth keeping,
is the weaker statement: *if* the exponent is below 2 by any fixed amount, the
margin grows doubly exponentially, so the ladder needs the exponent fact once and
then never asks for anything sharper. The hardness is entirely in step zero of the
proof, not step zero of the ladder.

---

## 3. The exponent translation, and where it lands

Required f: **f(v) = (v⁴ − v²)/m̄(T_v) − 1 ≈ 0.4162 · v⁴/ln²v**, using
m̄(T_v) → 2.402607 ln²v. Written as f(v) = c·v⁴/ln²v, any c < 0.4162 suffices, and
f(v) = v^{4−δ} would give the global exponent 2 − δ/2.

Conversion. Combined L is measured in T_v slots; the integer length it certifies
is (L+1)·m̄(T_v). At the new level x = v²:

  G₂(x#) ≈ f(v)·m̄(T_v) = v⁴ = x².

**Global exponent required: t = 2.**

Against the three landmarks:

| landmark | value | relation to the requirement |
|---|---|---|
| proven upper bound (DHR β₂, `paper/beta2-note.md`) | 4.2665 | misses by 2.2665 in the exponent; misses block 0 by 1600x |
| open band | (2, 4.2665] | **the requirement is not inside it** |
| TPC-equivalent (p² rule) | 2 | **the requirement is exactly this point** |

So, loudly, in the direction the brief asked for it: **the requirement is exponent
2 or below, the approach is TPC-equivalent, and it is dead as a route to anything
short of TPC.** No arrangement of the ladder moves it into the open band, because
the ladder's per-step condition is pointwise in x and the open band is a statement
about the exponent, which is pointwise-in-x too.

Three loophole checks, all closed before writing this:

1. *Sparseness.* The ladder needs the condition only at v_k = 5^{2^k}, not at all
   x. Does a sparse set weaken the exponent requirement? No. The condition is
   pointwise: G₂(q#) < q²−q at one q. Trap 2 of the brief is exactly this, and it
   is right. A twin found in (v_k, v_k²) exceeds v_k and v_k -> ∞, so any infinite
   family gives TPC. Choosing a slower ladder (v -> v^{1+c} for c < 1) does not
   help either, since the p² rule fixes the window at the square regardless of how
   far the ladder steps.
2. *Origin instead of max gap.* The ladder only needs the *first* slot above v_k
   to be below v_k², not the max gap anywhere in the period. That would be a
   weaker requirement if the origin were a favoured position. It is not:
   `research/origin-excess.md` §2/§5, quoted at `G2-STATE.md` §4e, has this
   REFUTED and reversed. At the zone width, origin/mean = ρ(2) -> e^{2γ}/4 =
   0.79305, so the origin carries 21% *less* than the mean density, and §6c's
   Collision Proposition puts the informative and origin-distinguished regimes in
   disjoint ranges. G₂ is the right object and there is no discount for asking at
   the origin.
3. *Does the previous step's certification help the next?* No. What step k
   certifies is the existence of one twin prime in (v_k, v_k²). The tile
   T_{v_{k+1}} and its covering optimum are determined by which primes exist, not
   by where twins sit, so a single located twin is worth nothing to the next
   step's bound. The only real coupling is the recursion of §2, which is a
   restatement, not new information.

What the ladder *does* buy, stated fairly so the negative is not overread: it
converts "prove G₂(x#) < x²−x for all x" into "prove one block never multiplies
G₂ by more than v²", a local and relative statement about one prime range
(v, v²] acting on a tile whose gap structure is already known. That is a
different *shape* of theorem at the same exponent. Whether that shape is easier
is the open question the other nine attacks exist to answer, and the one datum on
it is discouraging: the only compositional method in the repo, per-fold Theorem B
composed across the block, returns 7776 against a truth of 19, a 409x overshoot
in L, and 77,760 against a window of 600 in integers, failing by 130x at block 0
where the truth passes by 2.9x. Any per-block method must beat the existing one
by more than two orders of magnitude at the very first rung.

---

## 4. The starting cost

The ladder: 5, 25, 625, 390625, 1.5259e11, 2.3283e22, 5.421e44, 2.939e89.

**How many steps to comfort.** Under the believed x·polylog law, margins run 2.13,
13.8, 2162, 2.11e8. Comfort by k = 2, three steps. Under the flat x²/4 fit,
comfort never arrives and never departs, 2.59 at every k.

**Can the early hard steps be computed instead of proved?** No, and the wall is at
block 1, not somewhere out in the ladder.

| block | tile to build | period | slots | status |
|---|---|---|---|---|
| 0: 5 -> 25 | T_23 | 23# = 2.2309e8 | 2.2309e7 | **DONE**, full period, exact |
| 1: 25 -> 625 | T_619 | 10^258.4 | 10^256.4 | impossible by enumeration |
| 2: 625 -> 390625 | T_390607 | 10^169299.5 | 10^169296.9 | impossible |

Enumeration is out at block 1 by 250 orders of magnitude. Neither is the covering
route open: combined L for block 1 is a two-class covering optimum over the 102
primes in (25, 625], and the exact two-class optimum has been solved by ILP only
to 21 primes (Ziller–Morack, OEIS A288815, top term h₂(73#) = 2622). Block 1 needs
five times that many free residue choices.

**What computation has actually bought, in ladder terms.** The Zone Postulate is
verified exhaustively for every prime below 10¹¹, four billion primes, zero
failures. That certifies every ladder step whose base is below 10¹¹, which is
k = 0, 1, 2, 3 (bases 5, 25, 625, 390625). Step 4 has base 1.5259e11 and sits
1.53x past the verified range. So the ladder's first four rungs are already free,
step 4 is nearly free and would be bought by extending verification to 1.6e11,
and step 5 requires verification to 2.33e22, which is the verified range squared.

**The arithmetic that ends the section.** Each extra free step costs the square of
the previous verification range, so the number of free steps is
log₂log₅(range): range 10¹¹ gives 4 steps, and reaching 10 free steps would need
5^{2^10} ≈ 10^{489}. Since the requirement never loosens in exponent, no finite
prefix of computed steps ever completes the ladder. **Computation buys log log.
The ladder needs all k.**

---

## 5. Traps, checked

**Trap 1, capacity counting: confirmed vacuous, independently.** Within a run of L
consecutive T_v slots, a prime p kills at most 2(L/p + 1) of them, so total
capacity is 2L·Σ_{v<p≤v²} 1/p + 2π(v²) = 2L ln2 + O(v²/ln v), and 2 ln 2 = 1.3863
> 1. Capacity exceeds need for every L, at every v, forever. Any attack reducing
to capacity is dead on arrival.

**The block is exactly a CRT product, with no correlation loss.** Measured survivor
fraction at block 0 is 7952175/22309287 = 0.35645132899137477; the product
∏_{7≤p≤23}(1−2/p) = 0.3564513289913747. Agreement to 15 digits. The limit is 1/4,
so 3/4 of slots die asymptotically and 0.356 die at block 0, and the difference is
Mertens drag, not structure. This is a fresh check made here, and it is the reason
capacity counting cannot be rescued by a correlation correction: there is no
correlation to correct.

**Trap 2, TPC: the attack hits it.** Reported as the result, per the brief. See §3.

---

## 6. Where the belief sits, so the verdict is not misread

The requirement is believed true with room. The repo's bias-corrected exponent
estimate for G₂ is 1.57, practical bracket 1.3 to 1.9, proven floor 1, with
exponent 2 disfavoured by the one-sided direction of the control's bias
(`paper/beta2-note.md` §5, `research/exponent-control.md` §1). Local exponents
ln G₂/ln x on the twelve exact terms:

  1.544, 1.748, 1.559, 1.633, 1.653, 1.702, 1.696, 1.649, 1.704, 1.736
  at x = 5, 7, 11, 13, 17, 19, 23, 29, 31, 37.

Every one below 2, drifting up slowly, consistent with a limit anywhere in
[1.5, 2]. The certified construction side is safer still: Y₂/x² falls 11.6x over a
108-fold range while Y₂/(x ln²x) rises only 1.76x and is flat above x = 229.

So the honest statement is not "the ladder is wrong". It is: **the ladder asks for
a true thing whose proof is TPC**. The verdict of §3 is about the price, not the
fact.

---

## COVERAGE, blunt

**What this file did not reach.**

- No bound on combined L was proved or improved. This file only fixes the target.
- The maxsum concentration factor R was taken from `G2-STATE.md` §4d's measured
  law, which was calibrated at x = 997 to 16001 and in the regime m ≥ 2 ln D. At
  block 0, m = 20 < 2 ln D = 33.8, so the law is *outside* its stated regime
  there, and the law predicts R ≈ 2.17 where the truth is 1.02. I used the law
  only for blocks 1 and up, where the regime condition holds by a wide margin, but
  I did not verify the law at any block-scale point. The R values 1.169, 1.039,
  1.0016 are therefore extrapolations, not measurements. They are not
  exponent-relevant, so a factor-2 error in them changes nothing in the verdict,
  but they should not be quoted as data.
- The margin table's three models each carry a hand-set constant (0.386, 1.09,
  and 1 for the proven bound's C(ε), which is inexplicit and could be enormous).
  The proven-bound column is therefore a shape, not a number: with C(ε) unknown
  the row values could shift by many orders of magnitude, though not by enough to
  change the sign of a 10^−202 deficit.
- I did not check whether a *non-squaring* ladder with a different certification
  mechanism (something other than the p² rule) escapes the exponent-2 conclusion.
  I checked only that varying the step size within the p² mechanism does not.

**What I suspect but could not prove.**

- That the equality G₂(new) = maxsum_{L+1}(T_v) holds at every block, not just
  block 0. The counting argument (many extremal runs, few alignment classes) is a
  heuristic; the number of maximal runs at higher levels is not known here. The
  proven direction is the one the requirement needs, so this does not affect the
  target, only its sharpness.
- That β_k is increasing and converging to something strictly below 2. The
  ten-term local exponent column looks like it, and it is exactly the pattern that
  a limit *at* 2 with a small constant would also produce (see
  `research/theta-ladder.md` §0 on why reading a limit off a rising short column
  is the wrong measurement). I did not do the corrected-estimator work; I quoted
  it.

**Where I think I am wrong.**

- The strongest candidate for an error is the treatment of the sparse-family
  loophole in §3.1. I argued the pointwise condition cannot be weakened by
  sparseness, which is correct as stated, but the ladder's real freedom is that
  the *base* v_{k+1} may be chosen anywhere in (v_k, v_k²] rather than at the
  endpoint. If there is a way to choose bases adaptively so that only levels where
  G₂ happens to be small are ever visited, the exponent-2 requirement becomes an
  infinitely-often statement about small G₂ rather than a bound. I believe that
  still implies TPC, by the same trap-2 argument, but I did not derive it and the
  argument would need the choice rule to be effective. This is the one place I
  would look first for a hole in the verdict.
- Secondary: I treated the window as v² − v throughout, where the true zone of the
  post-block tile T_q is (q, q′²) with q′ the next prime after q. At block 0 that
  is 818 rather than 600, a 1.36x gain. If prime gaps near v² were somehow
  exploitable the window could be enlarged by more, but any such gain is
  polylogarithmic against a fourth power and cannot move an exponent.

**Calibration of the one absence claim in this file.** I state that the squaring
ladder v -> v² -> v⁴ as an object, and its target, are not derived anywhere in the
repo. The grep for `390625|iterated squar|v -> v^2|squaring ladder` over
`research/`, `paper/` and the root returned nothing; the calibration positive,
`maxsum_20|maxsum_{L+1}` over the same paths, returned ten files. The pattern
machinery works. Caveat on the claim itself: "ladder" is an overloaded word here,
and `G2-STATE.md` §2 ("The ladder") and `research/theta-ladder.md` both use it for
different objects. Neither is this one, but the reader should not take the grep as
evidence that the *requirement* is new. It is not: `G2-STATE.md` §1b and §4e carry
the same requirement in the repo's own language, and Ziller–Morack Prop. 3.2/3.5
carries it in the literature's.
