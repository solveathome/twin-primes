# Attack block 05: does the block sub-problem have a better exponent?

<!-- ledger
id: Q-block-exponent
status: CLOSED
todo: none
question: Does the block sub-problem have a better exponent than the proven 4.2665?
verdict: The required exponent for the ladder to close is 2, not 4 (the brief's step-3 arithmetic carried a factor error), and 2 is the TPC-equivalent line, so the useful part of the open band (2, 4.2665] is empty; the block's own prime range pins kappa = 2 and starting from T_v does not change the dimension.
-->

*(2026-08-18. Staging note. Object and rules from BLOCK-BRIEF. Legend as in
`research/covering-dive.md`: **[PROVEN]** published theorem with source;
**[VERIFIED]** checked computationally here; **[INFERRED]** our deduction from
sourced facts; **[ABSENT]** searched, found nothing.)*

## 0. THE NUMBER, FIRST

**The required exponent for the v → v² ladder to close is 2.**

Not 4. The brief's step-3 arithmetic contains a factor error, corrected in §1
below; once corrected, the ladder requirement lands exactly on the
TPC-equivalent line, which is where the established facts say it has to land.

| quantity | value |
|---|---|
| required exponent for the ladder | **2** (and at the boundary: see §1c) |
| proven exponent (`paper/beta2-note.md`) | 4.26645028414864191641 + ε |
| off-limits (TPC-equivalent) exponent | 2 |
| open band that is real progress | (2, 4.2665] |
| **useful part of the open band for the ladder** | **empty** |

Verdict in one line: the ladder requirement *is* the TPC line, so **trap 2
fires**. Nothing in the open band closes the ladder, and the block restriction
buys no exponent (§2, §3).

---

## 1. The window arithmetic, done correctly

### 1a. The brief's `log(v²#) ~ 2v` is wrong by a factor ~ v/2

`v²#` is the product of primes ≤ v², so log(v²#) = θ(v²) ~ v², not 2v. The
value 2v is log((v#)²) — the primorial of v, squared — which is a different
modulus with a different (smaller) prime set. **[VERIFIED]**

| v | log(v²#) = θ(v²) | brief's 2v | v² |
|---|---|---|---|
| 5 | 19.22 | 10 | 25 |
| 11 | 107.07 | 22 | 121 |
| 31 | 914.91 | 62 | 961 |
| 101 | 10108.07 | 202 | 10201 |
| 997 | 992434.32 | 1994 | 994009 |

The block itself confirms which reading is intended: block 1 is v = 5 → 25 and
its modulus is 23# = 223,092,870, i.e. the primorial of the primes **≤ v²**,
with log = 19.223 = θ(25). Under `2v` the bound would read C(2v)^4.2665 against
a window v⁴, giving a required exponent of 4 — a number inside the open band
(2, 4.2665], hence NOT TPC-equivalent. That conclusion contradicts the brief's
own established fact that a block window statement implies TPC, and the
contradiction is the tell that the 2v is the error, not the fact.

### 1b. The correct comparison

Set x = v² (more precisely x = the largest prime ≤ v²; the repo's Gap
Reformulation uses x′ = the next prime after x, `G2-STATE.md` §1b). The block
sifts every prime ≤ v², and the window is the zone (v², v⁴], of width
v⁴ − v² — exactly the 600 that block 1 was measured against.

Written in x, the requirement is

  **G₂(x#) ≤ x² − x**,  x = v².

Written in log q with q = x#, log q = θ(x) ~ x, so the requirement is
G₂ ≤ (log q)²·(1 − o(1)). Both readings give **exponent 2**.

The proven bound at that point is G₂(x#) ≪ x^{4.2665+ε} = v^{8.5329+ε}. Against
a window v⁴ the shortfall is a factor v^{4.533}, and it **widens** with v.
**[VERIFIED, arithmetic]**

| v | x = v² | window v⁴−v² | proven bound x^{β₂} | bound / window |
|---|---|---|---|---|
| 5 | 25 | 600 | 9.21·10⁵ | 1.5·10³ |
| 11 | 121 | 14,520 | 7.69·10⁸ | 5.3·10⁴ |
| 31 | 961 | 922,560 | 5.32·10¹² | 5.8·10⁶ |
| 101 | 10,201 | 1.04·10⁸ | 1.27·10¹⁷ | 1.2·10⁹ |
| 1009 | 1,018,081 | 1.04·10¹² | 4.29·10²⁵ | 4.1·10¹³ |

(Constants C(ε) are inexplicit and ignored; they cannot repair a growing
polynomial shortfall.)

### 1c. The requirement is exponent 2 *at the boundary*, and ε is unaffordable

G₂ ≪ x^{2+ε} does **not** close the ladder. A survivor found in a window of
length x^{2+ε} may sit above x², and above x² the p²-rule fails: such a number
can be pq with p, q both in (x, x^{1+ε}). So the ladder needs either

- an exponent strictly below 2, or
- exponent exactly 2 with constant ≤ 1 (a "hard" x² − x, not ≪ x²).

In sieve variables (z = x the sift bound, H = window, u = log H/log z) the
p²-rule caps u at **exactly 2** for any primality-detecting window. That cap is
structural, not a feature of the v → v² step: any rung "sift to z, look in a
window" is capped at u = 2, so no reshaping of the ladder changes the required
exponent. `research/G2-STATE.md` §4e already records the same number from the
other direction ("the Zone Postulate asks for S = x′², that is u_x = 2"), and
§1b already states "the sufficient condition is a two-class Jacobsthal exponent
below 2". This note is not new there; what it adds is §2 and §3.

---

## 2. Q1: where does the prime range enter the 4.2665, and does restricting it help?

The premise offered in the task ("β₂ is a property of the sieve dimension
alone, so the range changes nothing") is **true but for a reason that has to be
checked, not assumed** — because the range is exactly what determines the
dimension. Checked below; the conclusion survives.

### 2a. The three places the prime range appears in `beta2-note.md`

1. **z, the sift bound** (§2, "z = pₙ + 1"). The exponent is applied to z:
   H = z^{β₂+ε}. This is where the *top* of the range enters, and it is the
   only place the answer scales with the range.
2. **The dimension condition Ω(κ,L)** (§2, "Dimension check"). This is where
   the *shape* of the range enters, and it is what selects κ, hence which β_κ
   applies.
3. **V(z) = ∏_{p<z}(1 − ω(p)/p) ≍ 1/log²z** (§2). A density factor in the main
   term. Logarithmic, absorbed by ε — it never touches the exponent.

β₂ itself comes from none of these: it is the sifting limit of the
difference-differential system of DH Theorem 6.1 (pp. 67–68), whose only
parameter is κ. **[PROVEN, quoted in `paper/beta2-note.md` §1 and
`research/dhr-verification.md`]** So the whole question reduces to: **does the
block's range (v, v²] change κ?**

### 2b. Ω(κ,L) is a supremum over sub-ranges, and the block's own range pins κ = 2

The formal condition (DH Definition 1.3, eq. (1.5), p. 8, quoted verbatim in
`beta2-note.md` §6.1) is quantified over **all** pairs 2 ≤ w₁ < w:

  ∏_{w₁ ≤ p < w} (1 − ω(p)/p)^{−1} ≤ (log w / log w₁)^κ · (1 + A/log w₁).

The tempting escape is that the block sets ω(p) = 0 for all p ≤ v (those primes
are already folded out; the ground set is T_v). Averaged over [2, z) the block's
ω is therefore tiny — Σ_{p<z} ω(p) log p / p = 2 log 2 + O(1), *bounded*, where
the full problem has 2 log z. If κ were an average, the block would be
effectively dimension 0 and β would drop toward 1, and the ladder would close.
That escape is closed by the quantifier. Take **w₁ = v, w = v²**:

  LHS = ∏_{v < p ≤ v²} (1 − 2/p)^{−1} → 4  (Mertens),
  RHS = 2^κ (1 + A/log v) → 2^κ,

so 2^κ ≥ 4 and **κ ≥ 2**, forced by the block's own range. **[VERIFIED]**

| v | ∏_{v<p≤v²}(1−2/p)^{−1} | κ forced = log₂(LHS) | V_block = ∏(1−2/p) |
|---|---|---|---|
| 5 | 2.80543 | 1.4882 | 0.3565 |
| 11 | 3.35569 | 1.7466 | 0.2980 |
| 31 | 3.54283 | 1.8249 | 0.2823 |
| 101 | 3.85234 | 1.9457 | 0.2596 |
| 331 | 3.93435 | 1.9761 | 0.2542 |
| 1009 | 3.97254 | 1.9901 | 0.2517 |
| 3001 | 3.97967 | 1.9926 | 0.2513 |

κ_forced → 2 and V_block → 1/4, both from below, exactly as Mertens predicts.
This is the same 1/4 the brief's trap 1 records; here it is doing a second job,
as the *witness* that the block range is genuinely two-dimensional.

The one loophole worth naming: at a single fixed v one can satisfy Ω(κ,A) with
κ < 2 by taking A large (A ≈ (4·2^{−κ} − 1)·log v). But A enters the sieve's
constants, and the ladder needs the statement for infinitely many v with the
same constants. **A non-uniform κ is not a κ.** Ω(κ,A) with an absolute A over
a family v → ∞ forces κ ≥ 2. **[INFERRED from the quoted definition; standard]**

**Answer to Q1: no.** Restricting the primes to (v, v²] changes z (from "all
p ≤ x" to "the top is v²" — same top) and changes V (from ≍ 1/log²z to → 1/4, a
log-power gain worth zero in the exponent), and leaves κ = 2 and therefore
β₂ = 4.2665 exactly as they were. The block sieve, run properly, returns
H = z^{β₂+ε} = v^{8.533+ε}: **numerically identical to the global bound
evaluated at x = v².** Nothing is bought.

### 2c. Where this sits on the five-point discard map

Against `research/sift-limit-attack.md` §1: the block restriction is a **DP2**
change (the density envelope) and only a DP2 change. DP2 is the file's own
"nearly free" discard, and §2b shows the block does not even collect the free
part: the envelope is tight on the block's range for the same Mertens reason it
is tight globally. DP1 (one-point data only), DP3 (worst-case Buchstab
truncation — where β₂ is actually paid), DP4 (remainder signs) and DP5 are
untouched by the restriction. That is consistent with §5 of the same file:
distribution hypotheses enter only at DP4 and our DP4 is already saturated, so
there was never a second lever here either.

---

## 3. Q2: does starting from T_v rather than ℤ change the dimension? Committed answer: NO

Argued both ways, then committed.

**The case for "yes, it is lower."** T_v is already 2-class sieved, so its
density is δ_v = (1/2)∏_{2<p≤v}(1−2/p) ≍ 1/log²v and the surviving structure is
sparse and rigid. Every prime ≤ v has already done its damage; the block sieve
is asked to remove only a further 3/4 of what is left. In the sum-form
dimension test over [2, z) the block's ω-mass is O(1), not 2 log z. A sieve
whose ω vanishes on an initial segment "should" behave like a
fundamental-lemma / small-dimension sieve.

**The case for "no, it is exactly 2," which is the correct one.** Three
independent reasons, any one sufficient:

1. **The quantifier** (§2b). Ω(κ) is not an average over [2, z); it is a bound
   at every scale pair. The block's own range (v, v²] realises log-ratio 2 with
   density product 1/4, i.e. exactly (log w/log w₁)^{−2}. Dimension is a *local*
   property of the sifting range, and the block's range is locally dimension 2
   everywhere in it. The already-sifted prefix contributes slack at scale pairs
   nobody is asking about.
2. **Passing to T_v is a change of X, not of ω.** Writing A = {r(r+2) : r ∈ T_v,
   x < r ≤ x+H} gives |A_d| = (ω(d)/d)·(δ_v H) + r_d for d | ∏_{v<p≤v²}p, by CRT
   between the two coprime modulus ranges: the same multiplicative ω(p) = 2, with
   X rescaled from H to δ_v H. The sieve's dimension is a property of ω, and ω
   is unchanged. The whole effect of the ground set is one constant factor δ_v
   in the main term — and it *hurts*, mildly, since δ_v < 1.
3. **The two-classness is intrinsic to the pattern, not to the range.** ω(p) = 2
   holds because n(n+2) has two roots mod p (DH Example 1.2, pp. 7–8, the book's
   own worked case, quoted in `beta2-note.md` §6.1). Restricting which p are
   used cannot make a quadratic have one root.

**Commit: the block is dimension 2, β₂ = 4.2665 unchanged.**

---

## 4. The verdict that does not depend on 4.2665 at all

This is the strongest statement in the note, and it makes the numerical value
of β₂ irrelevant to the ladder.

Ω(κ,L) with κ implies Ω(κ′,L) for every κ′ ≥ κ, because log w/log w₁ > 1 makes
the right side increase in the exponent. So the axiom class at κ′ = 2 *contains*
the axiom class at κ = 1, and therefore the sifting limit is monotone
nondecreasing in κ:

  **β(2) ≥ β(1) = 2.**  **[INFERRED in one line from the definition; β(1) = 2
  and its optimality are PROVEN — Selberg's Liouville examples A± , Ford's 2023
  sieve notes §1.7.4 and §3.1 Def. 2, quoted in `sift-limit-attack.md` §2]**

Selberg's A± satisfy Ω(1) hence Ω(2), so they are legal κ = 2 sequences and
they block u < 2 at κ = 2 too.

The ladder needs u = 2, at the boundary (§1c). So:

> **Even a complete solution of the dimension-2 sifting-limit problem — driving
> β₂ from 4.2665 all the way down to its proven floor 2 — would leave the ladder
> sitting exactly AT the sifting limit, where DH p. 79 says "Theorem 9.1 yields
> only the trivial lower bound".** The DHR axiom class cannot close the block
> ladder at any value of β₂ it is capable of having.

That is the same statement as "exponent 2 is TPC-equivalent", read through the
sieve rather than through the p²-rule, and the two readings agreeing is the
consistency check on §1a.

The one-class contrast makes the point sharp. There, β(1) = 2 **equals** the
p²-rule cap u = 2, which is the numerical coincidence `covering-dive.md`
§"Where the proof breaks" point 2 names, and Iwaniec still needed refined error
analysis *at* the boundary (S ≥ (4y/log²y)(log(y/z²) − O(1)) for y ≫ z²) rather
than positivity for u > 2. At κ = 2 the coincidence is gone: 2 is the floor of
what β(2) could be, not a value it is known to take.

---

## 5. What the block DOES change, itemised, so the negative is not overstated

| block feature | effect on the exponent | effect elsewhere |
|---|---|---|
| primes restricted to (v, v²] | **none** (§2b: κ = 2 forced by that very range) | V rises from ≍0.416/log²z to → 1/4: a (log z)² gain in the main term |
| ground set T_v not ℤ | **none** (§3 reason 2: rescales X by δ_v) | X shrinks by δ_v ≍ 1/log²v: a mild loss, cancelling the gain above |
| composite folds are the identity | none | removes all primality input from the block's *definition*; a hygiene win, not a sieve win |
| log-ratio of the range is bounded (= 2) | **none** | Buchstab depth is finite: any r ≤ v⁴ has at most 3 prime factors in (v, v²]. See below. |

**The bounded-depth observation, and why it is not a route.** Because the block
range has log w/log w₁ = 2, an element of the window has at most three prime
factors from it, so the Buchstab expansion terminates after three levels rather
than iterating. That looks like an escape from DP3 (worst-case truncation of an
infinite recursion) — the truncation is not a truncation, it is exact. But the
residual after those three levels is precisely: distinguish r prime from
r = p·q with p, q ∈ (v, v²], simultaneously for r and r+2. That is the parity
problem, stated in the block's own variables. So the block converts the
sifting-limit obstruction into the parity obstruction rather than removing it,
which is the expected outcome given that closing the block window implies TPC.
**[INFERRED; the arithmetic of "at most 3 factors" is elementary and
VERIFIED by inspection: four factors each > v give a product > v⁴]**

Also worth recording because it disposes of a whole family of attacks in one
line: the capacity ledger over the block range is Σ_{v<p≤v²} 2/p → 2 ln 2 =
1.3863 and ∏(1 − 2/p) → 1/4, **both constants independent of v**. The table in
§2b measures the second one converging (0.3565 → 0.2513). This is brief trap 1,
confirmed at seven values of v, and it is the same computation as the dimension
test — capacity vacuity and dimension 2 are two readings of one Mertens
product.

---

## 6. Deliverable

- **Required exponent for the v → v² ladder to close: 2**, attained at the
  boundary (constant ≤ 1), or any exponent strictly below 2.
- **Against 4.2665:** short by 2.2665 in the exponent; the proven window is
  v^{8.533} against a required v⁴, a shortfall factor of v^{4.533} that grows.
- **Against 2:** equal. The requirement IS the TPC-equivalent line
  (`covering-dive.md` Q5 Realistic Target 6, "what NOT to attempt"). **Trap 2
  fires.** Any block-window statement of this shape, for any infinite family of
  v, implies TPC and therefore cannot be proved by this route.
- **Does the block restriction buy a better exponent? NO.** κ = 2 is forced by
  the block's own prime range (§2b, measured κ_forced → 2), the ground set
  change is a rescaling of X (§3), and β_κ depends on κ alone (§2a). The block
  sieve returns exactly the global bound evaluated at x = v².
- **The whole open band (2, 4.2665] is useless for the ladder** while remaining
  the correct target for a new theorem. Those are different goals and this note
  separates them: an exponent of, say, 3 would be publishable and would move the
  ladder not at all.

---

## 7. COVERAGE — what this did not reach, and where it may be wrong

**Not reached.**
- I did not read the Diamond–Halberstam book. Every quotation of it here is
  second-hand from `paper/beta2-note.md` §§2, 6 and `research/dhr-verification.md`,
  which do claim line-level verification against the primary source with
  archived screenshots. If Definition 1.3's quantifier is not "for all
  2 ≤ w₁ < w" but something weaker, §2b's argument weakens with it. That
  quantifier is the load-bearing element of this entire note and I verified it
  only against the repo's own transcription (`beta2-note.md` §6.1, which prints
  it as "∏_{w₁≤p<w}(1−ω(p)/p)⁻¹ ≤ (log w/log w₁)^κ(1+A/log w₁)" with the range
  "2 ≤ z₁ < z₂" stated in §2). Two repo files agree; that is one source.
- I did not run the block sieve as an actual sieve. §2's conclusion is that it
  would return H = z^{β₂+ε} with z = v², obtained by tracking where the range
  enters `beta2-note.md` §3's assembly. I did not re-derive the assembly with
  X = δ_v H and the T_v remainder written out. The remainder is the place I am
  least confident: counting T_v ∩ (a residue class mod d) in an interval has a
  discrepancy I asserted is still ≤ ω(d) by CRT between coprime modulus ranges,
  and I did not verify that numerically. If it is worse, the block is *worse*
  than the global run, not better, so the direction of the verdict is safe but
  the "exactly identical" claim in §2b is not.
- I did not survey sieves designed for a sifting range with a gap at the bottom
  (Chen-type switching, the "sieve with small primes removed"). §3 argues on
  first principles that the dimension is local, but if a published theorem
  exists whose hypotheses are indexed by the range rather than by a single κ,
  it would be the thing to read next. I did not search for one.
- `research/theta-ladder.md` is cited by `sift-limit-attack.md` as the file that
  prices the exponent-θ ladder empirically and measures θ above 2 and rising
  (1.9524, 1.9477, 2.0018, 2.0476 at z = 19, 23, 29, 31). I did not open it. It
  is the natural independent check on §1c's "required exponent 2 at the
  boundary" — the measured θ crossing 2 and staying above is the empirical shadow
  of the same statement, and the agreement between two routes is worth
  confirming directly rather than inferring from a quotation.

**Suspected but not proven.**
- I suspect the bounded-Buchstab-depth observation in §5 has been made in this
  repo before under different vocabulary (the "at most 3 factors" structure is
  the same object as an almost-prime count), but the terms I grepped did not
  find it. See the calibration note below.
- I suspect the "block buys a (log z)² in V and loses δ_v ≍ 1/log²v in X" pair
  cancels exactly to first order. I did not check the constants and did not need
  to, since the answer is zero in the exponent either way.

**Where I think I am wrong, or most exposed.**
- The strongest claim, §4's β(2) ≥ β(1) = 2, rests on Ω(κ) ⟹ Ω(κ′) for κ′ ≥ κ
  plus "the sifting limit is the infimum over the axiom class". Both are
  standard, but the second is a definition I am importing rather than quoting,
  and Ford's notes as quoted in `sift-limit-attack.md` §2 say β(κ) is *unknown*
  for κ > 1/2 except κ = 1 without saying it is monotone. Monotonicity is
  immediate from the definition I am using; if the literature's β is defined
  differently (e.g. per-sieve rather than per-axiom-class), the one-line
  argument does not transfer and §4's "no value of β₂ helps" would need the
  Selberg examples checked directly at κ = 2.
- The correction in §1a is a claim that the task brief is wrong. I am confident
  in the arithmetic (θ(v²) ~ v², table in §1a) and in the reading (block 1's
  modulus is 23#, log 19.223 = θ(25)), and the corrected number restores
  consistency with the repo's own G2-STATE §1b. But if the intended object
  really were the modulus (v#)² then the required exponent would be 4 and the
  verdict would flip to "inside the open band, worth attacking". That reading is
  wrong — (v#)² has the same prime support as v#, so it sifts nothing above v
  and the p²-rule certifies only up to v², not v⁴ — but it is the single place
  where the deliverable number could change, so it is named here.

**Grep calibration (per the rules).** Pattern `v\^4|v⁴|u⁴` over `research/` and
`paper/` returned only unrelated fourth-moment code, i.e. no hit for the ladder
window written that way. Calibration on a known positive: `β₂` over the same
tree returns 10+ files (`sift-limit-attack.md`, `dhr-verification.md`,
`covering-dive.md`, `G2-STATE.md`, …), so the grep mechanism works and the
negative is a vocabulary miss, not a tooling failure. Searching the concept
instead of the notation *did* find the prior art: `research/G2-STATE.md` §1b
("the sufficient condition is a two-class Jacobsthal exponent below 2") and §4e
("the Zone Postulate asks for S = x′², that is u_x = 2"), plus
`research/OBSERVATIONS.md` §7, which already records the disjoint window ladder
(u, u²), (u², u⁴), … and its capacity death. **The number 2 is therefore NOT a
new finding of this note; it is the repo's existing Gap Reformulation, restated
in block variables.** What is new here is §2b (the Ω-quantifier argument and the
measured κ_forced → 2 table), §3's commitment, and §4's β(2) ≥ 2 verdict.

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed belong in [history/CHANGELOG.md](../CHANGELOG.md),
indexed by document.*
