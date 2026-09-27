# Scoping: Brady and Li fractional retention rules at κ = 2

<!-- ledger
id: Q-fractional-retention
status: CLOSED
todo: none
question: Do Brady and Li's fractional retention rules at kappa = 2 open the adjacent door sift-limit-attack section 7c named?
verdict: Do not pursue: the door is real, applies to our system and carries no regress, but half the rule family cannot be applied at kappa = 2 and the applicability window there is empty, both settled from the sources; the unlooked-for find is that Brady's thesis is prior art for our object.
-->

*(2026-08-18. Staging note, scoping pass only, no proof attempted. Target from
`research/sift-limit-attack.md` §7c, "One live adjacent door, and it is new".
Companion computation: `research/scope-fractional-retention.js`
(`node research/scope-fractional-retention.js`, instant). Legend as in
`research/covering-dive.md`: **[PROVEN]** published theorem with source;
**[VERIFIED]** checked computationally in this repository; **[MEASURED]**
empirical, finite range; **[INFERRED]** deduction from sourced facts.)*

## 0. Verdict, first

**Do not pursue.** The door is real, it applies to our system, and it carries no
regress — every optimistic thing §7c recorded about it is true. It is still not
worth walking through, for two reasons that were both settled from the sources
rather than argued:

1. **Half the rule family cannot be applied at κ = 2 at all**, and the obstruction
   is a theorem this repository already holds. Brady's applicability window for
   his upper-bound retention rule is `(α_κ, β_κ + 1)`. Diamond–Halberstam prove
   `α_κ ≥ β_κ + 1` for κ ≥ 2, so that window is **empty at every κ ≥ 2**, ours
   included. The rule works at κ = 3/2 because 3/2 is below the crossover.
2. **The half that does survive was measured by its own author, and it is worth
   1 part in 10⁴.** Brady ran these rules at the one dimension where he could,
   and moved the sifting limit from 3.11582 to 3.11549. Transferred at the same
   relative yield, κ = 2 gets about **4 × 10⁻⁴ of exponent** — 0.02 % of the
   distance from 4.2665 to twin-prime strength.

| quantity | value | status |
|---|---|---|
| Corollary 10 window at κ = 3/2, `(α, β+1)` | (3.9114, 4.11582), width **+0.2044** | [VERIFIED] this script §1 |
| Corollary 10 window at κ = 2, `(α, β+1)` | (5.35773, 5.26645), width **−0.09128**, **EMPTY** | [VERIFIED] this script §1 |
| Brady's realised gain at κ = 3/2, both rules | 3.11582 → **3.11549** | [PROVEN] Brady §9.6 p. 133 |
| same, as a relative improvement in β | **1.059 × 10⁻⁴** | [VERIFIED] this script §2 |
| projected gain at κ = 2, surviving half only | **3.83 × 10⁻⁴** of exponent | [INFERRED] this script §3 |
| that, as a fraction of the 4.2665 → 2 gap | **0.017 %** | [INFERRED] this script §4 |

The trip was still worth taking, because it found something larger than the door.
**Brady's thesis is uncited prior art for this project's central object**, names
our exact configuration on page 1, proves our search problem NP-complete, and
carries the κ = 1 analogue of our own method in its Chapter 8. §8 below.

---

## 1. The artifacts, and which fact came from which

All four read as PDFs, downloaded and text-extracted locally. No HTML renderer
was used, and no abstract was treated as a source.

| artifact | URL fetched | pages | what it settled |
|---|---|---|---|
| Brady, *Sieves and iteration rules*, Stanford PhD, June 2017 | `notzeb.com/phd-thesis.pdf` (also `purl.stanford.edu/gk881hk9239`) | 164 | the retention rule itself, its applicability window, its realised yield, and the prior art of §8 |
| Runbo Li, *A note on variants of Buchstab's identity*, arXiv:2504.07974v1, 26 Mar 2025 | `arxiv.org/pdf/2504.07974` | 8 | the generalised rule family and the open-problem statement |
| Blight, *Refinements of Selberg's Sieve*, Rutgers PhD, May 2010 | `rucore.libraries.rutgers.edu/rutgers-lib/27420/PDF/1/play/` | 76 | both claims under audit in item 5 |
| Brady, *Sieves of dimension 1 + ε* | `notzeb.com/linear-sieve.pdf` | — | consulted, not load-bearing; the thesis supersedes it here |

Page numbers below are **printed** page numbers, read off the running headers,
not PDF page indices. Where a formula is quoted, the outer absolute-value
delimiters of tall `\left|…\right|` pairs do not survive text extraction from
either Brady or Li; the two-sided reading is fixed by Brady's own preceding
display, which writes the bound out as a pair of inequalities.

---

## 2. The retention rule, as it appears in the source

**Origin, Brady p. 109.** Chapter 9 is titled *Sifting Iterations* and opens with:

> **Theorem 34.** For any `w ≤ z`, we have
> `S(A, z) ≤ S(A, w) − (2/3) Σ_{w≤p<z} S(A_p, w) + (1/3) Σ_{w≤q<p<z} S(A_pq, w)`,
> where `p, q` run over primes.

The proof is four lines and entirely combinatorial. It counts each `a ∈ A` by its
number `k` of prime factors in `[w, z)` and needs only
`0 ≤ 1 − (2/3)k + (1/3)C(k,2)`, which holds by the identity
`1 − (2/3)k + (1/3)C(k,2) = (1 − k/2)(1 − k/3)`.

**Generalisation, Li p. 3, Theorem 2.3**, verbatim:

> For any `m₁, m₂` such that `(m₁, m₂) ∈ U` and `w ⩽ z`, we have
> `S(A, z) ⩽ S(A, w) − ((m₁+m₂−1)/(m₁m₂)) Σ_{w⩽p₁<z} S(A_{p₁}, w) + (2/(m₁m₂)) Σ_{w⩽p₂<p₁<z} S(A_{p₁p₂}, w).`

with, from the same page,

> `U = {(x₁, x₂) : x₁, x₂ ∈ (0,1] ∪ [2,3] ∪ ⋯ ∪ [k−1,k] with all odd k, |x₁ − x₂| ⩽ 1}`

and the same one-line proof from `1 − ((m₁+m₂−1)/(m₁m₂))n + (2/(m₁m₂))C(n,2) = (1 − n/m₁)(1 − n/m₂) ≥ 0`.
Brady's Theorem 34 is the case `(m₁, m₂) = (2, 3)`; Li says so twice.

**This is what "fractional retention" means, and §7c's characterisation of it was
right.** The classical Buchstab truncation discards the two-prime term outright
or prices it at the envelope. This family keeps it, at coefficient `2/(m₁m₂)`,
and pays for it by weakening the one-prime term from coefficient 1 to
`(m₁+m₂−1)/(m₁m₂)`. The whole content is a pointwise inequality in the number of
prime factors, so it holds for any `A` whatsoever. [PROVEN]

**Hypotheses.** Exactly two: `w ≤ z`, and `(m₁, m₂) ∈ U`. `U` is the condition
that no integer lies strictly between `m₁` and `m₂`, which is what makes the two
factors `(1 − n/m₁)`, `(1 − n/m₂)` share a sign at every integer `n ≥ 1`. There
is no arithmetic hypothesis, no level of distribution, and no condition on `A`.

Li carries the family further: Theorem 2.1 (odd `k`, a `k`-term alternating rule),
Theorem 2.5 (four parameters), and a lower-bound counterpart in his §3 with
Corollary 3.4 running to a fivefold integral. Brady's Theorem 35 (p. 110) is the
lower-bound rule, quoted in full as Li's Theorem 4.1.

**Custody note on Li.** arXiv:2504.07974v1 is an unrefereed seven-page note from
the International Curriculum Center, The High School Affiliated to Renmin
University of China. It carries visible production defects: equation (10)
references an empty `()`, the sentence establishing `U` reads "and `(x₁, x₂) ∈ U`,
which means that , we know that", and the proof of Theorem 2.3 points at "(4)"
where it means (12). None of that touches the mathematics, which is elementary
and was checked here by expanding the identity. The substance is Brady's, and
Brady's is a Stanford dissertation under Soundararajan, Fox and Venkatesh.

---

## 3. The question that decides it: κ = 2, ω(p) = 2, and regress

### 3a. Does the rule apply at κ = 2 to a system with ω(p) = 2 exactly?

**Yes, and the source names our configuration on its first page.** Brady p. 1,
verbatim:

> "More generally, we may consider choosing several congruence classes modulo each
> prime, say `κ_p` congruence classes modulo `p` - in this case, the average number
> of congruence classes to be chosen is referred to as the sifting dimension, and
> we will call this average value `κ`. **When the sifting dimension `κ` is 2 and the
> congruence classes chosen modulo each prime `p_i` are 0 and 2, we see that
> sufficiently strong bounds for this problem might imply the twin prime
> conjecture.**"

That is our two-class interval sift, stated as the motivating case of the thesis
the retention rules live in. [PROVEN as quoted]

The axiom the sieve functions are defined against is Brady's (1.1), p. 2:

> `|A_d| − κ(d)·|A|/d ≤ κ(d)`,  where `κ(d) = ∏_{p|d} κ_p`

with `F_κ, f_κ` defined on p. 2 as the optimal constants for which
`(1+o(1)) f_κ(s)|A| ∏_{p<z}(1 − κ_p/p) ≤ S(A, P_z) ≤ (1+o(1)) F_κ(s)|A| ∏_{p<z}(1 − κ_p/p)`
holds for **all** weighted sets `A` satisfying (1.1). Our two-class interval sift
satisfies (1.1) with `κ_p = 2` and remainder at most `2^{ω(d)} = κ(d)`, free of
charge, which is the same observation `paper/beta2-note.md` makes about the DH
book's Example 1.2. Li's (1), p. 1, is the same axiom with the density written
`κ^{ω(d)} y/d` and the remainder written `⩽ 1`.

So the answer is unambiguous. Our system is not merely *an* instance of the
hypothesis; it is the instance the author chose to name. [PROVEN]

### 3b. Does it carry a regress?

**No, and the reason is structural rather than lucky.** §7c's guess was correct.

Exact re-insertion regresses because `max_x Str_i` is an object about a *dilated
tile one level down*, and the only proven bound for it is `F₂` — a new,
strictly-lower sub-problem appears at each step. The retention rules never
produce one. Brady's Corollary 10 (p. 109) converts Theorem 34 into

> `s^κ F_κ(s) ≤ t^κ F_κ(t) − (2/3)κ ∫ t^κ f_κ(t(1−x)) dx/x + (1/3)κ ∫∫ t^κ F_κ(t(1−x−y)) dx dy/(xy)`

and the right-hand side is `F_κ` and `f_κ` **themselves**, at smaller arguments of
the same functions. It is a coupled system of functional inequalities in the pair
`(F_κ, f_κ)` — the same shape as the β-sieve and the DHR system — solved as a
simultaneous fixed point and bottoming out on the known boundary data
`F_κ(s) = 1/σ_κ(s)` for `s ≤ α_κ`, `f_κ(s) = 0` for `s ≤ β_κ`. Nothing descends
into a sub-problem. Brady's Appendix B is titled *Solution to system of
functional inequalities* and exists precisely to close that system. [PROVEN]

**So both of §7c's optimistic readings hold.** The rule applies to us, and it
carries no regress. What closes the door is neither of those.

---

## 4. What closes it: the applicability window is empty at κ = 2

Brady §9.6, p. 133, *Numerical computations at κ = 3/2*, opens:

> "When `κ = 3/2`, we have `α^D_κ = 3.9114...`, `β^D_κ = 3.11582...` [3]. **In
> particular, we have `α^D_κ < β^D_κ + 1`, so Corollary 10 can be applied to `s` in
> the range `α^D_κ < s < β^D_κ + 1`** with `t = s/(s − β^D_κ)`."

The upper end comes from his Remark 4, p. 109: the optimal `w` is `z^β`, "thus
this upper bound iteration tends to be useful only for `2 ≤ s ≤ β + 1`". The
lower end is `α_κ`, below which `F_κ` is pinned to its boundary value and there
is nothing for the iteration to improve.

**At κ = 2 that interval is empty.** `research/dhr-verification.md` §1.1 quotes
the Booker–Browning ancillary table for the DHR system:
"`κ = 2:  α = 5.35772744559446184227,  β = 4.26645028414864191641`". So
`β₂ + 1 = 5.26645…` and `α₂ = 5.35773…`, and

`α₂ − (β₂ + 1) = 0.09127716144581992586 > 0`. [VERIFIED, `research/scope-fractional-retention.js` §1]

**And this is a theorem, not a numerical accident.** `paper/beta2-note.md` records
from the DH book that "`α_κ ≥ β_κ+1 for κ ≥ 2`" (p. 77). The window
`(α_κ, β_κ + 1)` is therefore empty at **every** κ ≥ 2. The crossover sits
between 3/2 and 2, which is exactly why Brady could run the rule and we cannot:
his dimension is on the live side of it and ours is not. [INFERRED from two
quoted sources; Brady does not state the κ ≥ 2 consequence himself]

**The lower-bound half is not closed by this.** Brady's Remark 5, p. 110, gives
its window as "`β + 1 ≤ s ≤ β + 2`", with no `α` condition. At κ = 2 that is
`5.26645 ≤ s ≤ 6.26645`, non-empty, and `α₂ = 5.35773` sits inside it — which is
benign, since `F_κ` below `α_κ` is known exactly and feeding exact values in is
an advantage. So Corollary 11 and Li's §3 family **can** be applied at κ = 2.
That is the live remnant, and §5 prices it.

---

## 5. What the rules actually bought where they were run

Brady §9.6, p. 133, is the only place in either source where a retention rule is
carried to a number. All three figures are his:

| rule | β(3/2) | absolute gain | relative gain |
|---|---|---|---|
| DHR baseline | 3.11582 | — | — |
| Corollary 10 alone (upper) | 3.11570 | 0.00012 | 3.85 × 10⁻⁵ |
| Corollary 11 alone (lower) | 3.11554 | 0.00028 | 8.99 × 10⁻⁵ |
| both, iteratively combined | **3.11549** | 0.00033 | **1.06 × 10⁻⁴** |

His own words on the upper rule: "The improvement to the value of `F_κ(s)` in this
range is nonzero, but **very small**." [PROVEN as quoted]

Transferring the surviving half at the same relative yield gives
`4.26645 × 8.99 × 10⁻⁵ = 3.83 × 10⁻⁴` of exponent, i.e. `β₂ → 4.26607`.
Against the 2.2665 that separates 4.2665 from twin-prime strength, that closes
**0.017 %**. Against the 0.2665 band down to Selberg's conjectured 4, **0.14 %**.
[VERIFIED, `research/scope-fractional-retention.js` §§3–4]

Two honest caveats, both pointing the same way. Li's family is wider than
Brady's single `(2,3)` rule, so optimising over `(m₁, m₂) ∈ U` and over the
four- and five-parameter variants could beat the straight transfer — but there is
no indication in either source of an order-of-magnitude effect, and the rules are
perturbations of a truncation by construction. Against that, κ = 2 **loses**
Corollary 10 entirely: it was worth 0.00012 on its own, and 0.00005 of the
combined 0.00033 as a marginal contribution on top of Corollary 11. The expected
direction of the error is down.

---

## 6. Item 4 audit: is the κ > 1 case open?

**CONFIRMED, and a sharper second source was found.**

`sift-limit-attack.md` §7c records that "Li states that bounding `β_κ` for `κ > 1`
by that route is open". Li §4 *Further prospect*, p. 6, verbatim:

> "In this note, we only give some sieve inequalities and do not mention any
> possible application of these inequalities. In fact, these may be helpful in
> bounding the ”sifting limits” `β_κ` for `κ > 1`. The bounds for `β_κ` are quite
> important in many high–dimensional sieve problems. **We hope someone can
> accomplish this work.**"

The record is accurate. [PROVEN as quoted]

Brady p. 3 states the underlying open problem in a much stronger form, and this
is the sentence the record should carry instead:

> "**It is currently not known whether there is any `κ > 1` with `β_κ < 2κ`.**"

[PROVEN as quoted]

---

## 7. Item 5 audit: the two Blight claims

### 7a. "The DHR sieve is the infinite iteration of Ankeny–Onishi" — CONFIRMED

Blight, printed **p. 8**, §2.2.2 *Diamond-Halberstam Sieve*, verbatim:

> "The Diamond-Halberstam sieve is an infinite iteration of the Ankeny-Onishi
> sieve[1]. Therefore, it is believed that the sifting limit `β_κ ∼ cκ` as `κ → ∞`,
> where `c = 2.445...`."

The quotation, the page and the attribution in `sift-limit-attack.md` §7c and in
`history/staging/attack-beta2-03-exact-strata.md` §7 are all exact. The same page
carries the DHR sifting-limit table, which prints `κ = 2.0, β_κ = 4.266450` — an
independent corroboration of our β₂ to six decimals from a source other than
Booker–Browning. [PROVEN as quoted]

### 7b. "Selberg's conjectured κ = 2 sifting limit is 4" — CONFIRMED in substance, with one calibration correction

Blight, printed **p. 6**, §2.1 (not §2.2 as the record has it — §2.2 begins lower
on the same printed page), verbatim:

> "By the sifting limit `β_κ` for a sifting dimension `κ`, we mean the greatest lower
> bound of the `β_{κ,Λ}` over all possible lower bound sieves `Λ` of level `D`."

and, in the next paragraph:

> "**Selberg proposed that the sifting limit is `2κ`.** He was able to prove this
> result asymptotically as `κ` approached infinity. For `1/2 < κ < 1`, Iwaniec and
> Rosser constructed a sieve with `β_κ < 2κ`. However, at this time, **a lower bound
> sieve with a sieving limit of `2κ` has not been found for `κ > 1`**. The sifting
> limit problem is to find lower bound sieves that give `β_κ ≤ 2κ` for each `κ > 1`."

So Blight gives `2κ`, and `2κ = 4` at `κ = 2`. The record's substance is right.
Three calibrations are needed, and the third matters. [PROVEN as quoted]

1. **The section is §2.1, not §2.2.** Cosmetic.
2. **Blight never writes the number 4.** `2κ` at `κ = 2` is our arithmetic. Cite
   it as "Selberg's proposed `2κ`, which is 4 at `κ = 2`", not as a figure in her
   text.
3. **`2κ` is a conjectured *target*, and the sources do not support treating it as
   a proven floor.** §7c's boxed paragraph reads "no approach living inside the
   sieve axioms reaches the TPC-equivalent exponent 2 — the whole distance from 4
   to 2 must come from structure the axioms cannot see." That conclusion needs
   `β₂ ≥ 4` to be a theorem, and it is not one. Blight's own framing is that the
   problem is "to find lower bound sieves that give `β_κ ≤ 2κ`" — `2κ` as a goal to
   reach from above. Her own p. 7 records `β_κ < 2κ` already achieved for
   `1/2 < κ < 1`, so `2κ` is not a universal floor. And Brady goes further, p. 3:

   > "Based on an analysis of a simplified version of the sifting problem,
   > described later, I've found an approach which seems likely to prove a bound
   > of the following form.
   > **Conjecture 1.** There is some `ε > 0` such that `β_κ ≤ 2κ − ε·κ^{1/3}` for all
   > `κ` sufficiently large."

   and p. 11, after his Theorem 8: "I expect that this method should allow one to
   show that when the sifting dimension is sufficiently high, the sifting limit
   `β_κ` is strictly less than twice the sifting dimension."

   The proven lower bounds on `β_κ` in these sources are far below 4 at κ = 2:
   Brady's Corollary 1 (p. 11) gives `β_κ ≥ (1 + o(1))·2κ/e`, which reads 1.47 at
   κ = 2 and is asymptotic anyway, and his Corollary 3 (p. 51) is stated only for
   `κ ≥ 3` and is numerically vacuous there.

   **The correct statement is therefore weaker and should replace the boxed one:**
   Selberg's conjecture puts `β₂` at 4, the best proven bound is 4.26645, and
   nothing in the literature proves `β₂` is bounded away from 2. The claim "the
   axiom class cannot reach exponent 2" is **conjectural**, resting on Selberg's
   proposal, not a theorem. It remains the right working assumption — no sieve at
   any dimension has ever come near `2κ/2` — but it must not be quoted as a
   ceiling that has been established. [INFERRED, and this is a downgrade of a
   claim currently carried at a higher strength]

Note that the practical consequence for the programme is unchanged: the band
worth competing for is still `(β₂^true, 4.26645]`, and this door reaches
`4 × 10⁻⁴` of it.

---

## 8. The unlooked-for find: Brady's thesis is prior art for our object

This is worth more than the door was, and none of it is in the repository's
record. Searched in the owning convention of `research/SEARCH-CONVENTIONS.md` §1
— sifting dimension, congruence classes per prime, Jacobsthal at primorials —
rather than in house vocabulary.

**(a) Our covering problem is Brady's Problem 3, and it is NP-complete.** Chapter
2, *Computational aspects of sieving*, p. 12:

> "**Problem 3 (Shifted Sifting).** Given a finite set `A ⊂ Z` and a finite set `P`
> of primes, determine if there exists a constant `c ∈ Z` such that each element of
> `A + c` is a multiple of at least one prime in `P`."

with, immediately after:

> "In the case `A` is an interval, we recover the Jacobsthal problem. **If `A` is the
> set of numbers of the form `n(n + 2)` for `n ∈ [z, z² − 2]` and `P` is the set of
> primes below `z`, then a negative answer to this question (for infinitely many
> `z`) implies the twin prime conjecture (and in fact would be a much stronger
> claim than the twin prime conjecture).**"

That is our `G₂` covering optimum, in print, with its relation to TPC stated by
the author. He proves it equivalent to a set-cover variant (Problem 4,
*Transverse Partition Cover*, Proposition 7, pp. 12–13) and states at p. 8 that
"this problem is in fact NP-complete". The repository runs branch-and-bound and
LP searches over exactly this problem, so the complexity result is directly about
our instrument. [PROVEN as quoted]

**Note the strength direction, because the repository has been wrong about it
before.** Brady says a bound of this shape is *stronger* than TPC, not equivalent
to it. That corroborates the correction already recorded in `research/qc/README.md`
as adjudicator error 3, "exponent 2 is TPC-equivalent".

**(b) Chapter 8 is *Linear sieve and the Jacobsthal function* (p. 103).** Brady
sets up the linear sieve as a linear program to bound `j(P_z)`, which is the
κ = 1 analogue of this project's method, and gets explicit results including
"Every interval of length `1.95 × 10¹⁸` contains an integer which has no prime
divisor below `10¹⁰`" (Corollary 9) and Conjecture 6, `j(P_z) ≤ z²/50` for large
`z`. `SEARCH-CONVENTIONS.md` §3's live claim is about a published **upper bound on
`G₂`**, the two-class object, and Brady bounds the one-class `j(P_z)`, so that
claim is not overturned here. But he is by a wide margin the closest published
relative, he uses our method at the neighbouring dimension, and the table would
be misleading without him. [PROVEN as quoted]

**(c) Brady's own summary of the state of the sifting functions**, p. 2, worth
having on the record:

> "Selberg has outlined an algorithm to compute `f_κ(s), F_κ(s)` to any desired
> accuracy in [28]. Despite this, as far as I am aware no one has ever implemented
> this algorithm, and even the value of `F_κ(2)` is unknown for any `κ` other than
> `κ = 1/2, 1`."

---

## 9. If it were pursued anyway: the first step and its cost

Stated so the estimate is on the record, not because it is recommended.

**Step.** Take Li's lower-bound family (his §3, Corollary 3.4) and Brady's
Corollary 11, instantiate at κ = 2 on the window `β₂ + 1 ≤ s ≤ β₂ + 2`, and solve
the coupled `(F₂, f₂)` system numerically with the extra multiple-integral terms,
optimising over `(m₁, m₂) ∈ U` and over `(s, t)`. Read off the new `β₂`.

**Cost.** The DDE machinery exists here — `sift-limit-attack.md` §7 recovers β₂ by
shooting to `4.26660` against `4.26645`. What does not exist is a solver for a
system carrying threefold to fivefold integral terms with the retention
coefficients as free parameters, which is what Brady needed his Appendix B for.
Estimate several days, with a numerically delicate optimisation, against an
expected return of `4 × 10⁻⁴` of exponent.

**A cheaper falsification, if anyone wants one before spending that.** Evaluate
Brady's Corollary 11 once at κ = 2 with `(m₁, m₂) = (2, 3)` and `(s, t)` at the
analogue of his `(4.85, 5.52)`, against DHR's `F₂, f₂`, and read the single-shot
improvement in `s^κ f_κ(s)`. That is hours, not days, and it settles whether the
yield at κ = 2 is even the same order as at κ = 3/2. If it is, the answer is the
4 × 10⁻⁴ above and the full solve is pointless. Only a surprise of two orders of
magnitude would reopen this, and nothing in either source suggests one.

---

## 10. Corrections and additions to the record

Not applied. `research/scope-fractional-retention.js` and this note are the only
files written.

1. **`research/sift-limit-attack.md` §7c, the last paragraph, should be closed.**
   It currently reads that the retention rules are "One live adjacent door, and it
   is new". Proposed replacement: *"Scoped 2026-08-18 and closed. The rules apply
   to us and carry no regress, both as predicted; but Brady's upper-bound rule has
   applicability window `(α_κ, β_κ+1)`, which `α_κ ≥ β_κ+1 for κ ≥ 2` (DH p. 77)
   makes empty at every κ ≥ 2, and the lower-bound rule that survives bought
   `1.06 × 10⁻⁴` of relative β where its author ran it. Projects to `4 × 10⁻⁴` of
   exponent, 0.017 % of the 4.2665 → 2 gap.
   `research/scope-fractional-retention.js`."*
2. **`research/sift-limit-attack.md` §7c's boxed "ceiling that reframes the
   programme" must be downgraded from a ceiling to a conjecture.** See §7b.3
   above. It presently reads as though `β₂ ≥ 4` were established; no source
   supports that, and Brady expects `2κ` to be beaten at high dimension.
3. **`history/staging/attack-beta2-03-exact-strata.md` §7 should carry the
   corrected Blight section number (§2.1, not §2.2)** and the note that "4" is our
   arithmetic on her `2κ`.
4. **`research/SEARCH-CONVENTIONS.md` §4's table row "Brady 2017 — improves
   κ = 3/2 only" is right and is much too thin.** It should record that the same
   thesis names our κ = 2, classes `{0, 2}` configuration on p. 1, contains our
   covering problem as Problem 3 with its TPC relation, proves it NP-complete, and
   bounds the one-class Jacobsthal by our own method in Chapter 8.
5. **`research/PRIOR-ART.md` should gain Brady's thesis** as the nearest published
   relative of this project's programme, with §8's three items.
6. **`research/dhr-verification.md` could record that Blight p. 8 prints
   `β₂ = 4.266450`**, a second independent source for the value at six decimals.

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in
[../CHANGELOG.md](../CHANGELOG.md), indexed by document.*
