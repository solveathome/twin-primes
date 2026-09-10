# Attack H (rerun): what NP-completeness licenses, and the Brady reconciliation

<!-- ledger
id: Q-np-licenses
status: ANSWERED
todo: none
question: What does NP-completeness license here, and is Brady's Problem 3 the G2 covering problem?
verdict: The corpus sentence "his Problem 3 IS the G2 covering problem" is false as written and must be withdrawn (one class per prime and an arbitrary finite set, against two classes at locked separation 2 on an interval); NP-completeness licenses four statements about computation and none of the five mathematical ones.
-->

*(2026-08-18. Staging note; the corpus is not edited here. Every correction below
is drafted for the adjudicator to apply. Legend as in `research/covering-dive.md`:
**[PROVEN]** published theorem with source; **[VERIFIED]** checked computationally
in this session; **[MEASURED]** empirical, finite range; **[INFERRED]** our
deduction from sourced facts.)*

## 0. The verdict, before anything else

**Four sentences, in descending order of how much they cost the project.**

1. **The corpus sentence "his Problem 3 (p. 12) IS the G₂ covering problem" is
   false as written and must be withdrawn.** Brady's Problem 3 gives **one**
   congruence class per prime and takes an **arbitrary** finite `A ⊂ Z`; our
   covering problem gives **two** classes per prime at locked separation 2 on an
   **interval**. His twin instance reaches our object only under a reading of
   "`A + c`" that is not the one his own notation carries, and the two readings
   are **numerically different problems** — §2 exhibits the separation at
   `x = 5` and `x = 11`. **[VERIFIED]**
2. **NP-completeness licenses nothing whatever about the exponent, and the
   corpus should stop implying that it does.** Brady's Theorem 9 (p. 13) is a
   reduction from Set Cover whose hardness lives entirely in the freedom to
   choose `A` adversarially; our object is a single fixed sequence of instances,
   which has no complexity. Worse for the corpus reading: his hardness theorem is
   about **partitions**, and our per-prime family is a 2-cover and never a
   partition at any odd prime (**[VERIFIED]**, §3), so his theorem does not even
   quantify over our family. §4 states the four things it does license.
3. **What survives as novelty is one sentence, and it is the one
   `paper/beta2-note.md` line 93 already makes**: the first published upper bound
   of any exponent for the two-class problem. Everything about the covering
   *formulation*, about *posing* the problem, and about the object being
   unnoticed is gone — Brady names the system at his p. 1, Erdős states the
   extension himself at [Er80, p. 106], and A144311 has carried the sequence
   since 2008. §6.
4. **New collision, not previously recorded: `zeb` is Brady.** MathOverflow user
   2363 `zeb`, whose 2011 answer 52890 demoted our *technique* on 2026-08-18,
   publishes `website_url: https://notzeb.com` — the exact host serving the
   thesis PDF — and the thesis Chapter 8 (p. 103) runs the same technique in
   print. **[VERIFIED]**, §5. The technique prior art and the object prior art
   are **one person**, not two independent collisions.

And the brief's own working hypothesis is **stale and should not be carried
forward**: "our greedy oracle degrades with budget rather than with structure"
describes a search defect that `research/two-class-lower-bounds.md` §5a and
`research/G2-STATE.md` already repaired on 2026-08-18. The difference-2 greedy
now reaches ratio **1.000 at thirteen of fourteen exact `G₂` terms**. There is no
degradation on our family left for NP-completeness to explain. §4.3.

---

## 1. Custody

**The document.** *Sieves and Iteration Rules*, **Zarathustra Elessar Brady**,
Stanford University doctoral dissertation, **June 2017**, principal adviser
Kannan Soundararajan (title and signature pages, PDF pages 1–3). Fetched fresh
this session from `https://notzeb.com/phd-thesis.pdf`, 844,620 bytes,
`sha256 792ec8f34434d326b63cc2749a1a61c46a15701c799d6fb679063de3a9d9612c`.
Text by `pdftotext -layout`; **printed page ↔ PDF page offset is +7**, fixed by
locating printed p. 1 (Chapter 1 opening) at PDF page 8. Every page number below
is the **printed** one and was re-extracted page-by-page in this session, not
inherited.

**Extraction caveat, and how it was handled.** `pdftotext` silently drops the
`≪` glyph from this PDF — **zero** occurrences across all 9,046 extracted lines,
while `Jacobsthal` returns 19, which is the known-positive that shows the
extraction is otherwise working. Every quotation below that carries a `≪` was
therefore re-read **off a rendered page image** (`pdftoppm -png -r 150`), not off
the text layer.

**The Erdős sentence Attack J turns on was re-sourced here, not inherited.**
`https://users.renyi.hu/~p_erdos/1980-03.pdf`, 4,233,700 bytes, PDF page 18,
printed page **106** (running head `106  P. Erdős` confirmed on the same page),
§6 "Some problems on sieve methods", Problem 1: *"These problems can of course be
extended if more than one residue is omitted."* — present, one line above the
prize sentence *"I offer max(1000 dollars, ½ my total savings) for clearing up of
this problem."* Attack J's transcription is accurate and its two OCR restorations
(`x²'`→`x^{1/2}`, `z`→`½`) are correct. **[VERIFIED]**

**The dead run of 2026-08-18 is not relied on.** Its transcript
(`agent-a6d4048b682169828.jsonl`, 184 entries) was mined for *which* pages to
open; every quotation, page number and byte count above was re-derived here. Its
negatives are void by its own record (WebSearch 200/200, arXiv zero bytes) and
none are quoted.

---

## 2. Problem 3 beside our covering identity: not the same problem

### 2.1 The two statements, verbatim

**Ours** — `research/two-class-lower-bounds.md` §1, PROVEN, elementary, CRT:

> `G2(x#) - 1` equals the maximum length of an interval `[1,m]` that can be
> covered by choosing, for each prime `p <= x`, the residue pair
> `{a_p, a_p - 2} mod p`.

**Brady, printed p. 12**, quoted exactly:

> **Problem 3 (Shifted Sifting).** Given a finite set A ⊂ Z and a finite set P of
> primes, determine if there exists a constant c ∈ Z such that each element of
> A + c is a multiple of at least one prime in P.

and, immediately following it on the same page:

> In the case A is an interval, we recover the Jacobsthal problem. If A is the set
> of numbers of the form n(n + 2) for n ∈ [z, z² − 2] and P is the set of primes
> below z, then a negative answer to this question (for infinitely many z) implies
> the twin prime conjecture (and in fact would be a much stronger claim than the
> twin prime conjecture).

### 2.2 Three separate reasons the identification fails

**(a) Problem 3 is a decision problem over an arbitrary input; ours is one fixed
instance family.** Problem 3 quantifies over all finite `A ⊂ Z` and all finite
prime sets `P`. `G₂` fixes `A` = an interval and `P` = the primes below `x`, with
no free input at all. "IS" is the wrong verb even before the class count is
examined: at most, our object is *an instance family of* Problem 3. **[INFERRED]**

**(b) Problem 3 supplies one class per prime.** "`a + c` is a multiple of some
`p ∈ P`" is `a ≡ −c (mod p)`: a **single** residue class per prime, free by CRT.
Brady says so himself in the next sentence — with `A` an interval this *is* the
one-class Jacobsthal problem. Our system has **two** classes per prime. The
two-class setting is his **Problem 2** (p. 1), where he asks for bounds and
proves nothing computational. **[PROVEN as quoted]**

**(c) His twin instance is a shift of the VALUE, and ours is a shift of the
ARGUMENT — and they are different problems.** `A + c` with
`A = {n(n+2) : n ∈ [z, z²−2]}` is the set of values `n(n+2) + c`. Then `p` kills
`n` iff `(n+1)² ≡ 1 − c (mod p)`: a fibre `{−1 ± √(1−c)}` of size **2, 1 or 0**
according as `1−c` is a non-zero residue, zero, or a non-residue mod `p`, with the
**same** `c` shared by every prime. That is the Kalmynin–Konyagin shape
(`research/covering-dive.md` §4.2: *"fixed centre, varying separation"*), not
ours. Our shift acts on the argument, giving `{a_p, a_p−2}` — a fibre of size 2
at **every** odd prime, free centre, separation locked.

**These are not two descriptions of one optimum. [VERIFIED]** Run in this session:

```
node -e '...'   # full command in §7.3; ARG = longest run of consecutive j killed by
                # some p|(j+s)(j+s+2); VAL = same over the value-shift family n(n+2)+c
x    ARG = G2(x#)-1 (A144311)   VAL = max over value-shift c   (best c)
2    1                          1                             0
3    5                          5                             0
5    11                         17                            12
7    29                         29                            0
11   41                         65                            630
```

The ARG column reproduces **A144311** exactly (1, 5, 11, 29, 41), which is the
known-positive calibration for the computation. The VAL column **differs at
`x = 5` (17 against 11) and at `x = 11` (65 against 41)** — the value-shift
optimum is the larger, because trading "every prime contributes 2 classes at
separation 2" for "half the primes contribute 2 classes at a free separation"
buys more coverage than it costs. So the literal reading of Brady's sentence
names a **different and strictly better-covering** problem than ours at the first
two `x` where the two differ.

**Verdict on brief item 1: neither "the same problem" nor "merely similar".**
Under the argument-shift reading his twin instance is *exactly* our Gap
Reformulation at length ≈ `z²`; under the reading his notation actually carries it
is a third object. His sentence cannot distinguish them, because `c = 0` lies in
both families and `c = 0` alone already gives TPC — which is why the ambiguity
never mattered to him and matters entirely to us.

### 2.3 The sentence that DOES name our system is his p. 1, not his p. 12

Printed p. 1, quoted exactly and in full, because the corpus quotes it truncated:

> More generally, we may consider choosing several congruence classes modulo each
> prime, say κ_p congruence classes modulo p - in this case, the average number of
> congruence classes to be chosen is referred to as the sifting dimension, and we
> will call this average value κ. When the sifting dimension κ is 2 and the
> congruence classes chosen modulo each prime p_i are 0 and 2, we see that
> sufficiently strong bounds for this problem might imply the twin prime
> conjecture.

Classes **fixed** at `{0, 2}` with `A` a **free** interval is, by the same CRT
collapse as our §1, exactly free centre with separation locked at 2. **This is our
system, and it is the only place in the thesis where it is.** `twin` occurs
**exactly three times** in the whole 9,046-line extraction — once here and twice in
the p. 12 remark. There is no third mention, no bound, no data, no construction.
**[VERIFIED** by grep over the full text, calibrated against `Jacobsthal` = 19
hits in the same pass.**]**

---

## 3. "Much stronger claim than the twin prime conjecture": settled, and it agrees with us

**What his sentence means.** "A negative answer for infinitely many `z`" is: for
infinitely many `z`, **no** shift covers the whole range. Under the argument-shift
reading that is `G2(z#) − 1 < z² − z − 1` for infinitely many `z`.

**Why it implies TPC.** Take the shift `c = 0`. Some `n ∈ [z, z²−2]` then has
`n(n+2)` free of every prime below `z`; as `n + 2 ≤ z²`, both `n` and `n+2` are
prime. Infinitely many `z` gives infinitely many twin pairs.

**Why it is strictly stronger, and it is the ∀-shift quantifier that does it.**
One twin pair falsifies only the windows containing it, and there are `z#`-many
window positions. Ruling out **every** shift is a uniform statement at that `z`;
TPC returns only one uncovered point. This is precisely our own calibration:
`research/G2-STATE.md` §1c and `research/ZONE-POSTULATE.md` §2 record the weak
(zone-occupied, infinitely often) form as **equivalent** to TPC and the strong
(every zone) form as **strictly stronger**, and note that *"every `G₂`-based route
proves the strong form, because a gap bound is uniform by construction."*

**Verdict on brief item 2: no contradiction, and it is independent corroboration
in print from 2017.** Two refinements the corpus should take from it:

- Brady's statement is **not** our weak Zone Postulate. It is the *infinitely
  often in `z`, uniform in the shift* rung — strictly stronger than TPC, strictly
  weaker than our strong form. `research/THE-DIALS.md` §1 dial 4 prices exactly
  that gap as "free slack with no known mechanism"; Brady's sentence gives that
  intermediate rung a **published home**, which it did not have.
- His sentence bears on a bound at exponent **2**, not on ours at 4.26645. It
  therefore does **not** conflict with `paper/beta2-note.md`; it prices the finish
  line that `research/sift-limit-attack.md` line 13 already names.

---

## 4. What NP-completeness licenses, and what it does not

### 4.1 What is actually proved, quoted

Printed **p. 8**:

> As a computational problem, determining whether there exists a shift c such that
> |S(A − c, P)| is greater than a given value (given sets A and P as input) is in
> the complexity class NP, since we can compute the size of |S(A − c, P)| quickly
> for any given value of c. As we will see in Chapter 2, this problem is in fact
> NP-complete.

Printed **p. 13**, the theorem itself:

> **Theorem 9.** There is a polynomial time reduction from Set Cover to Transverse
> Partition Cover, taking an instance (U, k, S) of Set Cover to an instance (A, P)
> of Transverse Partition Cover with |A| = |U| + k|S|, |P| = k|S|, and each element
> of P having size k|S| + 1. In particular, both the Shifted Sifting problem and
> the Transverse Partition Cover problem are NP-complete.

### 4.2 What it does NOT license — five items, each with its reason

1. **It says nothing about the asymptotic size of `G₂`, in either direction.**
   NP-completeness is a statement about uniformly deciding a family whose input
   varies. `G₂(x#)` is a single sequence with no free input; deciding any one term
   is `O(1)` by table lookup, and the growth rate of a fixed sequence is not a
   complexity-theoretic quantity at all. **[INFERRED]**
2. **The hardness lives in the freedom to choose `A`, which we do not have.**
   Theorem 9's reduction builds `A = U ∪ {1,…,k|S|}` from a Set Cover instance and
   then, via Proposition 7 (p. 13), CRT-embeds it into `Z`. Nothing in that
   construction is an interval or a set of shifted products. The instances the
   theorem is about are exactly the instances `G₂` never presents. **[PROVEN as
   quoted]**
3. **The theorem does not quantify over our family even at the level of
   structure.** Problem 4 requires each prime to supply a **partition**. Our
   per-prime family `{ {j : j ≡ a_p or a_p − 2} : a_p ∈ Z/p }` is a **2-cover**:
   every residue lies in exactly two of the `p` sets. **[VERIFIED]** this session —
   multiplicity is `[1]` (a partition) at `p = 2` only, and `[2]` (never a
   partition) at `p = 3, 5, 7, 11, 13, 17`. So the difference-2 family falls
   outside Theorem 9's scope, and whether it is NP-complete is not settled by
   anything in this thesis.
4. **The one approximation-hardness result Brady states is for a different
   objective.** Printed **p. 15**, Theorem 12, quoted exactly:

   > **Theorem 12 ([2], [6]).** Given a set A and a collection of collections of
   > subsets B = {B₁, ..., B_k} of A, there is a randomized polynomial time
   > algorithm which can approximate the quantity max_{A₁∈B₁,...,A_k∈B_k}
   > |A₁ ∪ ··· ∪ A_k| to within a factor of 1 − 1/e − o(1). If P ≠ NP, then 1 − 1/e
   > is the best possible approximation ratio for any polynomial time approximation
   > algorithm.

   Its "arbitrary collections" setting *is* our shape (item 3), but its objective
   is **maximum covered count**, and ours is the **longest fully covered initial
   run**. Brady flags that difference himself, one paragraph above, of his
   Problem 7: *"The following variant is likely to be much harder, but is closer to
   the questions we ask in sieve theory."* He states it as open. **[PROVEN as
   quoted]**
5. **It is not evidence that the problem is mathematically hard.** Brady's own
   Theorem 11 proof (p. 14) contains the counterexample in one clause: *"If
   ((c−1)/c)^k |A| < 1, then a greedy strategy covers A."* An NP-complete family
   can have a completely determined easy regime. His §2.1.2 says the same at a
   higher level — Theorem 10 makes Transverse Partition Cover **fixed-parameter
   tractable** in the number of partitions, `O((k!)²|A|)`, and he draws the moral
   explicitly: *"One reason to believe that Transverse Partition Cover may be
   'easier' in some sense than Set Cover is that, while k-Set Cover ... is
   W[2]-hard, Transverse Partition Cover is fixed-parameter tractable if the
   parameter is taken to be the number of partitions."* **[PROVEN as quoted]**

### 4.3 What it DOES license — four items, all about computation

1. **A negative expectation about the exact ladder.** No general-purpose algorithm
   should be expected to extend A144311 far by cleverness alone. This is the right
   frame for `research/two-class-lower-bounds.md` §5c's finding that the exact
   search budget is unaffordable above `x ≈ 100`, and for the ladder stopping at
   `x = 79` after three independent efforts (Carter 2008, Alekseyev 2009, Wang
   2024). **[INFERRED]**
2. **A negative expectation about optimal certificate construction in general.**
   Finding the optimal `(a_p)` is a search over `∏ p` shifts, and the general
   family is hard, so a construction that is optimal at every level by design is
   not to be expected.
3. **A methodological guard.** Any proposed argument which, if it worked, would
   yield a polynomial-time decision procedure for general Shifted Sifting is dead
   modulo P ≠ NP. Nothing this project runs is of that shape, so the guard binds
   on nothing currently open — but it is the correct use of the result.
4. **Nothing else.** In particular it must not be cited near the exponent, near
   4.2665, near the Zone Postulate, or as an obstruction to any bound.

### 4.4 The brief's hypothesis about the greedy is stale, and the data points the other way

The brief expected NP-completeness to explain a greedy that "degrades with budget
rather than with structure". **It does not, because the degradation was a search
defect and was fixed.** `research/two-class-lower-bounds.md` §5a records that
greedy feasibility is **not monotone in `m`**, so the bisection that produced the
old ladder returned the unbroken feasible prefix rather than the maximum;
`research/G2-STATE.md` records the repair, and with randomised restarts the
unrestricted greedy attains **527 at `x = 37`, the exact optimum**.

The repaired measurements are, if anything, evidence that **the hardness does not
bind on our instances** — which is what §4.2 items 2 and 3 predict. **[MEASURED]**,
from `research/two-class-lower-bounds.md` §5:

| family | greedy ratio to the truth | against Brady's worst-case barrier `1 − 1/e = 0.632120…` |
|---|---|---|
| difference-2 (**ours**) | **1.000** at thirteen of fourteen exact `G₂` terms, **0.990** at `x = 43` | far above |
| free-pair (`h₂`, A072753 ILP optima) | 1.000 at `n = 3..8`, then **0.777 to 0.979**, falling as `1.538 x^{-0.1440}` | above |

The asymmetry is the point: greedy is **exact** on the locked-separation family
and **degrades** on the free-pair family. That is the ordering §4.2 item 3
implies, and it is the opposite of the brief's guess. **[INFERRED]** from the
[MEASURED] rows.

---

## 5. The rest of the thesis: what it demotes, supports, or consolidates

**5.1 `zeb` is Brady, and this consolidates two separate demotions into one
source. [VERIFIED]** MathOverflow answer **52890** (question 37679, score 4,
created 2011-01-22) is owned by `user_id 2363`, `display_name "zeb"`, with
`website_url: "https://notzeb.com"` — read this session through
`api.stackexchange.com/2.3/answers/52890?site=mathoverflow&filter=withbody` and
`.../users/2363?site=mathoverflow`. That is the host serving the thesis. The
answer's own text — *"If we plug in b = 1 and λ = 0.2533, we get that for
sufficiently large n, any interval of size O(n^{4.032}) contains a number
relatively prime to the first n primes"* — is the κ = 1 case of exactly what his
thesis Chapter 8 does at length. **Consequence for the record**: `PRIOR-ART.md`
and `paper/beta2-note.md` currently treat "zeb 2011 owns the technique" and
"Brady's thesis names the object" as two independent collisions. They are one
author, and the stronger statement is that **Brady owns both the technique and the
naming of the object, and still gives no bound at κ = 2.**

**5.2 Chapter 8 is the technique in print, at dimension 1.** Printed p. 103,
"Linear sieve and the Jacobsthal function", sets up the linear sieve as a linear
program *"which gives an upper bound on the Jacobsthal function j(P_z)"*, and
Proposition 42 (p. 107) states `j(P_z) ≤ sqrt( Σ_{d|P_z}|λ_d|d / Σ_{d|P_z} λ_d/d )`
for any lower-bound sieve with a positive main term. This **supports** Attack F's
verdict that the dimension-2 case is an exercise and **strengthens** it: the
dimension-1 case is not merely in a 2011 forum answer, it is a chapter of a
Stanford dissertation.

**5.3 A parity statement aimed directly at exponent 2, which the corpus does not
carry from this source.** Printed **p. 106**, read off the rendered page image
because `pdftotext` drops the `≪`:

> So although this rules out the possibility of showing that j(P_z) ≪ z^{2−ϵ}
> using standard sieve-theoretic methods, it doesn't rule out the possibility of
> showing that, say, j(P_z) ≪ z²/log(log(z)).

This **corroborates** rather than adds — `research/covering-dive.md` entry 2 and
item 4 already carry β₁ = 2 as optimal via the Selberg/Iwaniec parity examples —
but it is the cleanest sourced sentence available stating the barrier *in the
Jacobsthal-exponent currency*, with the loophole (an error-term improvement, worth
a `log log`) named. Worth citing where the corpus states the exponent-2 wall.

**5.4 A cleaner source for the "no ceiling at 4" correction.** Printed **p. 3**:
*"It is known that β_{1/2} = 1, β₁ = 2, and that β_κ < 2κ for ½ < κ < 1"*, then
*"It is currently not known whether there is any κ > 1 with β_κ < 2κ"*, then
Theorem 2 (Selberg): *"β_κ < 2κ + 0.4454 for κ sufficiently large"*, then
Conjecture 1: *"There is some ϵ > 0 such that β_κ ≤ 2κ − ϵ∛κ for all κ
sufficiently large."* `research/sift-limit-attack.md` §7c's downgrade box already
reads this correctly, including the "for large κ" scope on Conjecture 1. The one
upgrade available: Brady's *"currently not known whether there is any κ > 1 with
β_κ < 2κ"* is a stronger and more direct source sentence for that box than
Blight's, and should be quoted beside it.

**5.5 Nothing else in the thesis touches our objects.** `primorial` occurs **0**
times, `Rankin` **1** time (p. 4-region, "Rankin's trick" for an error term),
`twin` **3** times (all quoted above), and there is no mention of OEIS in
connection with any of this (the single `OEIS` hit, at his §on flexible numbers,
is unrelated: *"surprisingly, this sequence doesn't seem to show up on OEIS"*).
**[VERIFIED]** by grep over the full extraction, calibrated in the same pass
against `Jacobsthal` = 19 hits.

---

## 6. The three-way reconciliation, in one paragraph

**Brady names our system and declines to bound it; Erdős states the extension and
does not pose it; A144311 has the numbers and no theory — so the covering
formulation, the problem statement and the data are all somebody else's, and the
only thing left that is ours is an exponent.** Brady's p. 1 sets out the κ = 2,
classes-`{0, 2}` system exactly and says only that *"sufficiently strong bounds
for this problem might imply the twin prime conjecture"*; his p. 12 remark names
the twin instance and prices a bound at the `z²` scale as *"a much stronger claim
than the twin prime conjecture"* — a sentence that presupposes no such bound
exists, and he gives none, at any exponent, anywhere in 154 pages. Erdős, at
[Er80, p. 106], writes *"These problems can of course be extended if more than one
residue is omitted"* one line above the $1000 offer, which makes `G₂` the `r = 2`,
difference-2 instance of his own stated extension of #687 — though, as Attack J
correctly qualifies, that clause is a licence and not a posed problem, and it
describes the free-two-classes object `h₂` of which ours is a sub-case. His
Problem 3 is NP-complete but is a *different* problem from ours in class count,
in shift, and in the freedom of `A`, and NP-completeness in any case constrains
only the computation of instances and never the asymptotics of a fixed sequence.
**What therefore remains available to claim is exactly one sentence — that
`G2(x#) ≪_ε x^{4.26645+ε}` is the first published upper bound of any exponent for
the two-class problem — plus the reconciliation ledger itself; and what is no
longer available is any claim that the covering formulation is ours, that the
problem was unposed or unnoticed, that the exact ladder is ours, or that a
complexity result bears on the exponent.**

---

## 7. Corrections drafted for the adjudicator

### 7.1 `research/PRIOR-ART.md`, the Brady bullet (currently around line 264)

**Replace** the sentence *"His **Problem 3 (p. 12) IS the G₂ covering problem**,
he proves it **NP-complete**"* with:

> His **p. 1 names our exact system** — *"When the sifting dimension κ is 2 and the
> congruence classes chosen modulo each prime p_i are 0 and 2, we see that
> sufficiently strong bounds for this problem might imply the twin prime
> conjecture"* — and **gives no bound at any exponent, anywhere in the thesis**
> (`twin` occurs exactly three times in the whole document). **His Problem 3
> (p. 12) is NOT our covering problem**, on three counts established
> 2026-08-18: it is a decision problem over an **arbitrary** finite `A ⊂ Z`, it
> supplies **one** class per prime (he says so: with `A` an interval "we recover
> the Jacobsthal problem"), and his twin instance shifts the **value** `n(n+2)+c`
> rather than the argument, which is a genuinely different optimum — the two
> disagree at `x = 5` (17 against 11) and `x = 11` (65 against 41),
> [VERIFIED]. **His NP-completeness (Theorem 9, p. 13) does not reach our
> family either**: Problem 4 requires each prime to supply a **partition**, and
> our `{a_p, a_p−2}` family is a 2-cover at every odd prime, never a partition
> [VERIFIED]. **The result licenses nothing about the exponent.** See
> `history/staging/attack-np-licenses.md`. The reconciliation instruction is
> discharged.

**Add**, to the same bullet or to the zeb/MO 52890 row:

> **`zeb` is Brady.** MathOverflow user 2363 `zeb` publishes
> `website_url: https://notzeb.com`, the host of this thesis; his 2011 answer
> 52890 and this thesis's Chapter 8 (p. 103, *Linear sieve and the Jacobsthal
> function*) are the same author running the same technique. The technique
> demotion and the object collision are **one source, not two**. [VERIFIED
> 2026-08-18 via the Stack Exchange API.]

### 7.2 `research/sift-limit-attack.md` §7c (currently around line 726)

**Replace** *"his **Problem 3 (p. 12) IS the G₂ covering problem**, he proves it
**NP-complete**, and he writes that a bound there …"* with:

> his **p. 1 names our exact system** and he **gives no bound at any exponent**;
> his Problem 3 (p. 12) is a **one-class, arbitrary-`A` decision problem** and is
> **not** ours, and its NP-completeness (Theorem 9, p. 13) is about **partitions**
> and does not reach our 2-cover family. What does carry over is his p. 12
> sentence that a bound at the `z²` scale *"would be a much stronger claim than
> the twin prime conjecture"*, which **corroborates** `G2-STATE.md` §1c's strong
> form. See `history/staging/attack-np-licenses.md`.

**Also**, in the same file's downgrade box: quote Brady p. 3, *"It is currently
not known whether there is any κ > 1 with β_κ < 2κ"*, beside the Blight reading —
it is the more direct source for "2κ is a target, not a floor".

### 7.3 `research/history/CHANGELOG.md` — new entry, retired reading

> **Brady's Problem 3 is not our covering problem (corrected 2026-08-18, same
> day).** The entry added earlier that day read *"His **Problem 3 (p. 12) IS our
> G2 covering problem**, he proves it **NP-complete**"*. **Three things are wrong
> with that.** (i) Problem 3 quantifies over an arbitrary finite `A ⊂ Z`; `G₂` is
> a single fixed instance family with no free input. (ii) Problem 3 gives **one**
> class per prime — Brady states that with `A` an interval it *is* the Jacobsthal
> problem — while ours gives two at locked separation 2; the two-class setting is
> his Problem 2 (p. 1), about which he proves nothing computational. (iii) His
> twin instance is written `A + c` with `A = {n(n+2)}`, a shift of the **value**,
> giving the fibre `{−1 ± √(1−c)}`; ours shifts the **argument**. These are
> different optima, verified: the value-shift maximum is 17 against our 11 at
> `x = 5` and 65 against our 41 at `x = 11`, while the argument-shift column
> reproduces A144311 exactly. **The NP-completeness (Theorem 9, p. 13) is also
> out of scope for us**, since Problem 4 requires each prime to supply a
> partition and `{a_p, a_p−2}` is a 2-cover at every odd prime, never a
> partition. **What survives** is that Brady's p. 1 names our system, gives no
> bound at any exponent, and that his p. 12 sentence about a `z²`-scale bound
> being *"a much stronger claim than the twin prime conjecture"* corroborates the
> strong Zone Postulate reading in `G2-STATE.md` §1c. Also recorded the same day:
> **`zeb` (MathOverflow 2363, answer 52890) is Brady** — same `notzeb.com` — so
> the technique demotion and the object collision are one source.

### 7.4 The verification commands, for replay

```
# 2-cover, not a partition
node -e 'function mult(p){const c=new Array(p).fill(0);for(let a=0;a<p;a++){const s=new Set([a%p,((a-2)%p+p)%p]);for(const r of s)c[r]++;}return c;}
for(const p of [2,3,5,7,11,13,17]){const c=mult(p);const set=[...new Set(c)];console.log("p="+p+"  "+JSON.stringify(set)+"  partition? "+(set.length===1&&set[0]===1));}'

# argument-shift (= A144311) against value-shift
node -e 'function primesTo(x){const s=[];for(let n=2;n<=x;n++){let ok=true;for(const p of s){if(p*p>n)break;if(n%p===0){ok=false;break;}}if(ok)s.push(n);}return s;}
function longestRunCirc(cov){const P=cov.length;if(cov.every(v=>v))return P;let best=0,run=0;for(let i=0;i<2*P;i++){if(cov[i%P]){run++;if(run>best)best=run;}else run=0;}return Math.min(best,P);}
function ARG(x){const ps=primesTo(x);const P=ps.reduce((a,b)=>a*b,1);const cov=new Array(P).fill(false);
  for(let n=0;n<P;n++){for(const p of ps){if((n%p===0)||(((n+2)%p)===0)){cov[n]=true;break;}}}return longestRunCirc(cov);}
function VAL(x){const ps=primesTo(x);const P=ps.reduce((a,b)=>a*b,1);let best=0,bestc=-1;
  for(let c=0;c<P;c++){const cov=new Array(P).fill(false);
    for(const p of ps){const roots=[];for(let r=0;r<p;r++)if((((r*(r+2)+c)%p)+p)%p===0)roots.push(r);
      if(roots.length===0)continue;for(let n=0;n<P;n++){if(roots.includes(n%p))cov[n]=true;}}
    const L=longestRunCirc(cov);if(L>best){best=L;bestc=c;}}return [best,bestc];}
for(const x of [2,3,5,7,11]){const a=ARG(x);const [v,c]=VAL(x);console.log(x,a,v,c);}'
```

No new script was added under `research/`; both checks are one-liners run in
session and reproduced above, so the gate's script-citation rule is not engaged.

---

## 8. Gate

`node research/qc.js` read **TOTAL 0** across all ten checks before this note was
written and again after. Nothing in the corpus was edited; §7 is a draft for the
adjudicator.
