# A lower bound G₂(x#) ≫ x ln x for the twin Jacobsthal function from published ingredients only

*Draft 2, 2026-09-19, revising Draft 1 (return #32, 2026-09-11) after referee report 15 (reject with specific corrections; Proposition 1, Theorem 1 with its coefficient, and the verified N5 cover preserved). What changed: the §6 placement table no longer promotes the all-constants-one estimate 10^{134.1} into a sufficient threshold and no longer revives a withdrawn Selberg support-parameter condition (item A); the finite instance of §5 is identified as the old-cutoff greedy variant and the revised theorem's own choices are run beside it, with the referee's four-row table reproduced (item B); the Rosser–Schoenfeld locators are corrected and the claims they support narrowed (item C); the representative repair for [KK]'s Corollary 1 proof is fixed in sign and the direct sequence n(n+2) is given as the shorter interface, with Halberstam–Richert 1971 as an accessible published source (item D); the Mertens check's stable stdout is hashed separately from its timing lines (item E); the novelty language is scoped to the searches run and the unlocated Tao attribution is withdrawn (item F); the smaller corrections of the report's §3 are applied (§2 monotonicity, §1.3 survivor count, the falsification table, the integer endpoint via a separate constant, nonpositive c₀). Internal to the primeoire repository; the publication moratorium is in force and this document is not submission copy. Prose follows `paper/writing-style-math.md`. Grade and triggers are carried by `paper/proposals/prop-xlnx-lower-bound.md` (QUICK-DRAFT, regraded 2026-08-28); the suite architecture is `paper/PAPERS.md`. The mathematics is the record's, `research/history/staging/import-hypergraph.md` §4, first written out as a proof in `paper/kk-lower-bound.md` §9 (Theorem A there) and adversarially confirmed in `research/history/staging/redteam-0820-math.md` §3.3 to §3.4. This note is the paper case the proposal's first upgrade trigger asked for: the provenance trade, stated on its own.*

**Author.** Chris Benjaminsen.

**Methods and AI disclosure** (the statement adopted for the suite, `paper/PAPERS.md`, adapted to this note): the framework, vocabulary, and driving questions are the author's, developed over six years of independent work. Formal derivations, literature audits, computations, and manuscript drafting were carried out using AI assistants operating under the author's direction; computations have reproducible code and recorded outputs, asymptotic arguments require their stated mathematical inputs and are not proved by finite checks, and all refuted intermediate claims are retained in the record.

---

## Abstract

Let G₂(x#) be the largest gap between consecutive twin slots modulo x#, the product of the primes at most x: a twin slot is an n with gcd(n(n+2), x#) = 1, and G₂(x#) − 1 is the length of the longest run of consecutive integers none of which is a twin slot. We prove that for every

> c₀ < 1 / (8 C₁ C₂ e^{−2γ})

there is an x₀(c₀) with G₂(x#) ≥ c₀ x ln x + 1 for all x ≥ x₀, where C₂ is the twin prime constant and C₁ the implied constant of the dimension-two upper-bound sieve. In the record's shorthand, G₂(x#) ≥ (c + o(1)) x ln x with c effective. The proof consumes three published statements (the fundamental lemma of sieve theory in its residue-class form, as printed in Kalmynin and Konyagin's Corollary 1 and in Halberstam and Richert's Theorem 2.2, reached at OCR, with Theorem 3 of their 1971 memoir read at the page beside it; Mertens' third theorem; the prime number theorem) and one elementary identity of this corpus, and composes them in four steps written out in full. The composition is the author's and has not been refereed. The constant is effective and not computed. The bound sits above the lower bound G₂(x#) ≫ x ln x · lll x/ll x that transfers for free from Ford, Green, Konyagin, Maynard and Tao through G₂ ≥ g, by a factor ll x/lll x, and below the corpus's unrefereed reading of Kalmynin and Konyagin at x ln³x (lll x)²/(ll x)⁴ by about ln²x. The point of the note is the provenance trade: this chain never enters a published proof, where the stronger reading re-derives the inside of one. A finite construction of the same shape covers [1, 200000] with primes up to 10861 and replays clean in three seconds on one thread; it is the registered three-stage greedy pipeline, not the theorem's own two-stage construction, whose choices give x′ = 61871 at y = 2·10⁵ and 461183 at y = 2·10⁶. The pipeline cover checks the construction at one scale; neither run says anything about the limit. Nothing here bears on the twin prime conjecture or on the upper side of G₂.

---

## 1. Introduction

### 1.1 The object

Fix x ≥ 2 and write W = x# = ∏_{p ≤ x} p. An integer n is a **twin slot** for W when gcd(n(n+2), W) = 1: neither n nor n + 2 has a prime factor at most x. Twin slots exist for every x, since W − 1 is one. The **twin Jacobsthal function** is

> G₂(x#) = max { b − a : a < b consecutive twin slots for W },

the largest gap between consecutive twin slots modulo W (`paper/kk-lower-bound.md` §1.2, where the same function is written G₂(P(y)) with y the sieving level; `paper/beta2-note.md` indexes it by n as G₂(n) at p_n#; we write G₂(x#) as `research/G2-STATE.md` does). The run of non-slots strictly between two consecutive slots has length G₂(x#) − 1. The first values are G₂(x#) = 2, 6, 12, 30, 42, 66, 108 for x = 2, 3, 5, 7, 11, 13, 17 (`paper/beta2-note.md`; the ladder is verified to x = 43 in `research/two-class-lower-bounds.md` §5).

The question the record works on is the upper side, and this note does not touch it. The wall first: the twin-relevant statement is G₂(x#) < p²_{next} infinitely often, the best proven upper bound in this corpus is G₂(x#) ≪_ε x^{β₂+ε} with β₂ = 4.26645… (`paper/beta2-note.md`; the twenty-digit value is Booker and Browning's, `research/SEARCH-CONVENTIONS.md` §4), the distance from β₂ to 2 is a dimension-two sifting-limit problem, and exponent 2 itself is parity (`research/covering-dive.md`, synthesis items 3 and 4). A lower bound on G₂ says that twin slots can be absent from long runs. It says nothing about twin primes.

**Proposition 1 (covering form; `research/two-class-lower-bounds.md` §1, proven there, elementary).** G₂(x#) − 1 equals the largest m such that [1, m] can be covered by choosing, for each prime p ≤ x, one residue a_p mod p and deleting the pair {a_p, a_p − 2} mod p.

*Proof, as in the record.* Let s < s′ be consecutive twin slots and m = s′ − s − 1, so s+1, …, s+m are non-slots. For t = s + j the prime p kills t when p | t or p | t + 2, that is when j ≡ −s or j ≡ −s − 2 (mod p): the deleted pair is {a_p, a_p − 2} with a_p = −s mod p, and [1, m] is covered. Conversely, given residues (a_p)_p covering [1, m], CRT gives an s with s ≡ −a_p (mod p) for all p ≤ x; then j ≡ a_p forces p | s + j and j ≡ a_p − 2 forces p | s + j + 2, so s+1, …, s+m are non-slots. The run is bounded on both sides by twin slots, since twin slots exist, so some gap is at least m + 1. ∎

The consequence used in §3: **a full cover of [1, y] by pairs {a_p, a_p − 2}, p ≤ x, gives G₂(x#) ≥ y + 1.** The proposal words this step as "G₂(x#) ≥ y − O(1)" (`prop-xlnx-lower-bound.md` §1); the identity gives + 1, and at every level we could exhaust (x ≤ 17) the constructed window is the global maximal run and the loss is exactly zero (§5, Appendix A).

The covering optimum G₂(x#) − 1 is the sequence OEIS A144311 (Carter 2008, Alekseyev 2009, Wang 2024; 22 terms to x = 79), whose wording, "the length of the longest sequence of consecutive integers, each equal to 1 or −1 modulo at least one of the first n primes", is the same object in the fixed-classes form. A144311 carries no formula line and no reference line (`paper/kk-lower-bound.md` §1.2).

### 1.2 The one-class history and the free transfer

Jacobsthal's function g(x#) is the same object with one deleted class a_p per prime. Every twin slot is a reduced residue, so G₂(x#) ≥ g(x#) pointwise (`research/two-class-lower-bounds.md` §1, proven, elementary), and every lower bound for g transfers. The classical chain runs Westzynthius, Erdős, Rankin [Ra], Pintz [Pi], and Ford, Green, Konyagin, Maynard and Tao [FGKMT], whose bound in this normalisation reads

> g(x#) ≫ x · ln x · lll x / ll x,   (1.1)

with ll = ln ln and lll = ln ln ln (`research/two-class-lower-bounds.md` §3; `paper/kk-lower-bound.md` §1.1, eq. (1.1)). This is the **free transfer**: G₂(x#) ≫ x ln x · lll x/ll x, graded proven in `research/G2-STATE.md` §3a, with nothing two-class in it.

Every construction in that chain has two stages. Small primes sieve an interval with a fixed residue; the survivors are then mopped up one at a time by the large primes. In the one-class problem the sieving stage is one-dimensional, the survivors of [1, y] number about y/ln y, and mopping them up with the x/ln x primes below x allows only y ≍ x: the trivial bound. Rankin and his successors gain their logarithm by choosing the sieving residues cleverly, so that the survivors are the smooth numbers of the interval and are few. The dimension of the sieve is the whole difference between that history and the argument below.

### 1.3 What this note does

Run the same two stages with the pair {0, −2} instead of the single class {0}. The sieving stage is now two-dimensional, the survivors of [1, y] number at most a constant times y/ln²y by the upper-bound half of the fundamental lemma (the upper bound is all that is used), and one prime per survivor fits with y ≍ x ln x. Nothing else is needed: no smooth-number seeding, no reading of any published proof. The result is Theorem 1 of §3,

> G₂(x#) ≥ c₀ x ln x + 1 for x ≥ x₀(c₀), for every c₀ < 1/(8 C₁ C₂ e^{−2γ}),

a factor ll x/lll x above (1.1) and two logarithms, up to ll factors, below the corpus's stronger reading of Kalmynin and Konyagin (§6). The stronger reading is derived in the record and not refereed. Theorem 1 is the strongest two-class lower bound found in this corpus's searches (§7, §8.3) whose provenance is entirely published statements plus one page of elementary composition, and that is what the note is about; the mechanism is standard, and a bounded negative search is not a novelty proof. Section 4 grades every step, §5 replays the finite instance and says what it does and does not check, §6 places the bound, §7 states the prior-art position as the registry files it, and §8 lists what would break the theorem.

### 1.4 Attribution

The mechanism is the standard one. The dimension-κ fundamental lemma, Mertens' theorem and the prime number theorem belong to their authors; the Erdős–Rankin shape belongs to that literature; the two-class covering identity is the corpus's restatement of a fact its own scripts record under the name PAIRED (`research/two-class-lower-bounds.md` §1). The two-stage accounting for the pair {0, −2} was first sketched in `research/two-class-lower-bounds.md` §4b at INFERRED grade, with two survivors per mop-up prime; the chain was written out as a proof, with one survivor per prime, in `research/history/staging/import-hypergraph.md` §4 on 2026-08-20 and carried into `paper/kk-lower-bound.md` §9 as Theorem A. Kalmynin and Konyagin's Remark 1 records the same shape, j_f(P(y)) ≫ y ln y, for their value-shifted polynomial analogue at every f of degree at least two (§7). What this note claims is the composition for G₂ at this provenance grade, the corrected constant, and the replayed finite instance, and nothing more.

---

## 2. Ingredients

Every ingredient is a published statement consumed as a statement, or an elementary identity written out here. No published proof is entered.

**Ingredient A (the fundamental lemma, residue-class form).** Let κ > 0 and z ≥ 2. For each prime p ≤ z let Ω_p ⊂ Z/pZ have g(p) elements, where g extends multiplicatively, g(p) ≤ κ and g(p) < p for every prime p. Let S(X, Ω) be the number of n ≤ X with n mod p ∉ Ω_p for all p ≤ z, and V(z) = ∏_{p ≤ z}(1 − g(p)/p). Then for z ≪ X,

> S(X, Ω) ≤ C₁(κ) · X · V(z),

with C₁(κ) depending on κ only.

This is Kalmynin and Konyagin's Corollary 1 [KK, p. 4], quoted verbatim in `research/covering-dive.md` §4.2 and re-read for this note at the arXiv v2 PDF (md5 in §10). It is the residue-class instance of Halberstam and Richert's Theorem 2.2 [HR], the upper-bound half of the fundamental lemma of sieve theory: with A = {n ≤ X} and A_d the elements of A lying in a deleted class modulo each prime dividing d, CRT gives |A_d| = g(d) X/d + r_d with |r_d| ≤ g(d), which is the hypothesis list of [KK] Lemma 1 and of [HR] Theorem 2.2. For the instantiation of §3 the shortest interface is the divisibility sequence A = {n(n+2) : 1 ≤ n ≤ ⌊y⌋} sifted by the primes up to z, with one deleted class at 2 and two at every odd prime; an accessible independent published source for the resulting upper bound is Halberstam and Richert's 1971 memoir [HR71], where the example n(n+2) is treated on printed p. 99 and Theorem 3 on p. 100 gives the applicable bound in a fixed polynomial range (referee report 15 §1, read there at the page). We write C₁ = C₁(2). It is effective, because the constant in [HR] Theorem 2.2 is, and we do not compute it.

Two provenance facts travel with this ingredient and are stated here rather than implied away. First, [KK]'s printed proof of Corollary 1 does not work as written: it builds an auxiliary integer m from factors P(z; p′) n + r′ Q(z; p′) with r′ running over representatives of Ω_{p′}, and for p ≠ p′ that factor is congruent to −r′ modulo p, so whenever 0 ∈ Ω_{p′} every other prime up to z divides m and the asserted (m, P(z)) = 1 fails (at z = 5 with Ω₂ = {0}, Ω₃ = {0, 1}, Ω₅ = {0, 3}, gcd(m, 30) = 30 for n = 1, …, 5). The statement is unaffected. The one-line repair has to be made with the right sign: at the selected prime p′ the factor is proportional to n + r′ and deletes the class −r′, so the representatives must run over −Ω_{p′} (with r′ ≡ 1 modulo the other primes to kill the cross-prime zero factors); Draft 1 indexed representatives of Ω_{p′} and had the sign wrong (referee report 15 §2 D). Shorter still, the direct sequence n(n+2) above avoids the auxiliary product altogether, and [HR] Theorem 2.2 or [HR71] Theorem 3 applies to it as printed. `paper/kk-lower-bound.md` §11.2 records the slip and the repair; `research/covering-dive.md` §4.2 and `redteam-0820-math.md` §3.3 still carry the unqualified "consumed as a theorem" for it. Second, nobody in this project has read [HR] Theorem 2.2 at a page image; its statement was reached at OCR (`paper/kk-lower-bound.md` §12). The ingredient is therefore a published statement, printed twice, whose corpus provenance is one PDF read at source and one OCR read.

**Ingredient B (Mertens).** ∏_{p ≤ z}(1 − 1/p) = e^{−γ}(1 + o(1))/ln z, Mertens' third theorem [Me], with explicit two-sided bounds in Rosser and Schoenfeld [RS, Theorem 7, (3.25)–(3.26)]; Draft 1 cited Theorem 5, (3.17)–(3.18), which on printed p. 70 are the reciprocal-prime sums and not the products (referee report 15 §2 C, checked at the page).

**Ingredient C (the prime number theorem).** π(x) = (1 + o(1)) x/ln x. For the capacity count of Step 3 only a fixed-factor bound is needed and [RS, Corollary 1, (3.5)–(3.6)] with π(z) ≤ z suffices; the two-sided relative error tending to zero is [RS, Theorem 1, (3.1)–(3.2)] or Theorem 2, (3.3)–(3.4).

**Ingredient D (the covering identity).** Proposition 1 of §1.1, elementary, from the record.

One constant is needed. Let C₂ = ∏_{p > 2}(1 − 1/(p − 1)²) = 0.6601618… be the twin prime constant. For odd p,

> (1 − 2/p) / (1 − 1/p)² = (p² − 2p)/(p − 1)² = 1 − 1/(p − 1)²,

so ∏_{2 < p ≤ z}(1 − 2/p) = ∏_{2 < p ≤ z}(1 − 1/p)² · ∏_{2 < p ≤ z}(1 − 1/(p − 1)²); the second product decreases to C₂ (each factor is below 1) and the first is 4 ∏_{p ≤ z}(1 − 1/p)². By Ingredient B,

> ∏_{2 < p ≤ z}(1 − 2/p) = 4 C₂ e^{−2γ}(1 + o(1)) / ln²z,   (2.1)

and with g(2) = 1, g(p) = 2 for odd p,

> V(z) = (1/2) ∏_{2 < p ≤ z}(1 − 2/p) = 2 C₂ e^{−2γ}(1 + o(1)) / ln²z = (0.41621… + o(1)) / ln²z.   (2.2)

The constant is checked numerically in `mertens-check.py`: V(z) ln²z = 0.4162027 at z = 2·10⁷ against 0.4162145 predicted (Appendix A). The record's shorthand "(C₂ + o(1))/ln²z" for the product (2.1) (`import-hypergraph.md` §4 step 2; `redteam-0820-math.md` §3.3 item 2; `paper/kk-lower-bound.md` §9 step 2, where C₂ then becomes an undefined C₃) omits the factor 4 e^{−2γ} = 1.26095…. The slip touches the unnamed constant only, not the shape and not effectivity, and (2.2) is the form used below.

---

## 3. The theorem

**Theorem 1.** Let C₁ = C₁(2) be the constant of Ingredient A at κ = 2 and C₂ the twin prime constant. For every c₀ with

> c₀ < 1 / (8 C₁ C₂ e^{−2γ})

there is an x₀ = x₀(c₀) such that for all x ≥ x₀,

> G₂(x#) ≥ c₀ · x ln x + 1.

In particular G₂(x#) ≥ (c + o(1)) x ln x with c = 1/(8 C₁ C₂ e^{−2γ}), and c is effective.

*Proof.* For c₀ ≤ 0 the statement is trivial (G₂ ≥ 1), so let 0 < c₀ < 1/(8 C₁ C₂ e^{−2γ}) and fix c₁ strictly between c₀ and that threshold. Put y = c₁ x ln x. We construct residues a_p for every prime p ≤ x such that the pairs {a_p, a_p − 2} mod p cover [1, ⌊y⌋]; Proposition 1 then gives G₂(x#) ≥ ⌊y⌋ + 1 ≥ c₁ x ln x, and enlarging x until (c₁ − c₀) x ln x ≥ 1 gives G₂(x#) ≥ c₀ x ln x + 1, the statement. Set

> z = y^{1/2} / ln y.

(The record takes z = √y. Ingredient A asks only z ≪ X, so √y is admissible at the letter; the extra 1/ln y keeps the fundamental lemma comfortably inside its range at no cost, since ln z = (1/2) ln y (1 + o(1)) and the constant of (2.2) is unchanged.)

*Step 1: the survivors of the small primes, counted by Ingredient A.* Take Ω₂ = {0} and Ω_p = {0, −2 mod p} for odd p ≤ z, so g(2) = 1 and g(p) = 2 for odd p. The hypotheses of Ingredient A hold at κ = 2: g is multiplicative by construction, g(p) ≤ 2, g(p) < p at every prime (1 < 2 at p = 2, and 2 < p for odd p, where the classes 0 and −2 are distinct), and z ≤ y = X. Let V be the set of n ∈ [1, y] with n mod p ∉ Ω_p for all p ≤ z: the odd n ≤ y such that no odd prime at most z divides n or n + 2. Ingredient A gives

> #V ≤ C₁ · y · V(z).

*Step 2: the product, by Mertens.* By (2.2) and ln z = (1/2) ln y (1 + o(1)),

> #V ≤ 8 C₁ C₂ e^{−2γ} (1 + o(1)) · y / ln²y.

*Step 3: one prime per survivor, by the prime number theorem.* Since y = c₁ x ln x, ln y = (1 + o(1)) ln x, so y/ln²y = (1 + o(1)) c₁ x/ln x and

> #V ≤ 8 C₁ C₂ e^{−2γ} c₁ (1 + o(1)) · x / ln x.

The primes in (z, x] number π(x) − π(z) = (1 + o(1)) x/ln x by Ingredient C, because z = o(x/ln x). The choice of c₁ says 8 C₁ C₂ e^{−2γ} c₁ < 1, so for all x beyond some x₀ the primes of (z, x] outnumber the survivors, and we fix an injection r ↦ p_r from V into the primes of (z, x]. Set a_{p_r} = r mod p_r for r ∈ V, and a_p = 0 for every other prime p ≤ x: every p ≤ z, and every prime of (z, x] not in the image.

*Step 4: every r ∈ [1, y] is covered.* If r ∉ V, some prime p ≤ z has p | r or p | r + 2 (or r is even, in which case p = 2 and both classes coincide), so r ≡ 0 = a_p or r ≡ −2 = a_p − 2 (mod p). If r ∈ V then r ≡ a_{p_r} (mod p_r). So the pairs {a_p, a_p − 2}, p ≤ x, cover [1, ⌊y⌋], and Proposition 1 gives G₂(x#) ≥ ⌊y⌋ + 1. ∎

**Effectivity.** Each o(1) above is an explicit function of x once the error terms of Ingredients B and C are taken from [RS] and the constant C₁ from [HR] Theorem 2.2. x₀(c₀) is therefore computable in principle. We have not computed it, and this note claims no numerical value for c or for x₀. The one measurement we have is that at y = 200000 the survivor count of Step 1 with z = √y ≈ 447 is 2137 against a main term 200000 · V(447) = 2203.6, a ratio 0.9698, and with the theorem's z = √y/ln y ≈ 36.6 it is 6210 (Appendix A, §5); each is one instance and not a value of C₁.

**Where the logarithm comes from.** Run the same four steps with one class, Ω_p = {0}: Ingredient A at κ = 1 gives #V ≪ y/ln y, and y/ln y ≤ x/ln x forces y ≪ x. The one-class version of this argument proves only g(x#) ≫ x, the trivial bound. The pair {0, −2} makes the sieve two-dimensional, the survivor count drops from y/ln y to y/ln²y, and y = c₀ x ln x fits. That factor ln x is the whole content of Theorem 1 relative to the trivial bound. Only an upper-bound sieve is used, so the dimension-two sifting limit β₂ that governs the upper side of G₂ never enters; that observation is §4b's (`research/two-class-lower-bounds.md`) and it is the one-line answer to a referee who asks why dimension two is not an obstruction here.

**Two classes per mop-up prime.** §4b's sketch spends each mop-up prime on two survivors, using both a_p and a_p − 2, and states the capacity as 2x/ln x. That doubles the admissible c₀ if two survivors at distance exactly 2 can always be paired, which needs an argument the sketch does not give. Theorem 1 uses one survivor per prime and forgoes the factor 2.

---

## 4. Calibration

The corpus grades on the ladder proven > verified > certified > measured > inferred > conjectured > refuted (`paper/proposals/PROPOSALS.md`, legend), where PROVEN is "a proof is in hand, or it is a published theorem cited to its source" and INFERRED is "our deduction from sourced facts, complete but not refereed". Applied to §3:

| step | what is consumed | rung |
|---|---|---|
| Proposition 1 | elementary CRT, proof written out in `two-class-lower-bounds.md` §1 and in §1.1 | proven |
| Ingredient A | [KK] Corollary 1 = [HR] Theorem 2.2 in residue-class form, at its statement; hypotheses discharged in Step 1 | published theorem, cited to source; the [KK] proof slip and the OCR-only [HR] read are stated in §2 |
| (2.1), (2.2) | Mertens plus a two-line identity, written out in §2; constant checked numerically | proven |
| Step 3 | the prime number theorem at its statement | published theorem, cited to source |
| the composition | Steps 1 to 4 | inferred: written out here and in `kk-lower-bound.md` §9, re-derived independently by the adversarial pass of 2026-08-20 and again for this note, not refereed |

Theorem 1 is proven in the ordinary sense conditional on nothing. The rider the record attaches, and we keep, is that the composition is the corpus's own and has been checked by the corpus's own adversary and by this note's independent re-derivation, not by an outside referee. The one import the chain cannot survive losing is Ingredient A's hypothesis list at κ = 2; Step 1 discharges it clause by clause, the proposal prices this trigger low (`prop-xlnx-lower-bound.md` §5), and we found nothing on our own re-read of [KK] pp. 3 to 4.

---

## 5. The finite instance

The record carries a finite cover of the shape y ≍ x′ ln x′, pre-registered as N5 (`research/history/staging/import-hypergraph-prereg.md`), produced by `research/import-hypergraph-01-instance.js`, and rebuilt from the prereg text alone by the adversarial pass with its own sieve and mop-up (`redteam-0820-math.md` §3.4). For this note it was run again, its embedded OUTPUT block checked against the served file with the record's own gate, the assembled cover exported, and the cover verified by a script sharing no code with the producer. Recipe, hashes and timings are in `n5-recipe.md` (Appendix A lists the sha256 of every file named here).

**What the instance is.** y = 200000. Three stages, not the theorem's two:

1. a_p = 0 fixed for p ∈ {2, 3, 5, 7, 11, 13}: cutoff z = 13, leaving |V| = 9889 survivors (density 9/182 predicts 9890.1);
2. a_q random for the 162 primes 17 ≤ q ≤ 997 (splitmix64, seed 13, 200 trials, best trial kept), leaving 1654 survivors against an exact first moment 1731.07 and a mean over trials of 1730.83;
3. greedy mop-up, one fresh ascending prime per remaining survivor with a_q = r mod q: 1153 primes, 1.43 survivors per prime, largest prime x′ = 10861.

**What was checked.** The producer's stdout is byte-identical to the block embedded in the served file (2.29 s, one thread, 240 MB). The independent verifier confirms from scratch: 1321 moduli, all prime, pairwise distinct; stage 1 exactly as stated at a_p = 0; the middle stage exactly the 162 primes in [17, 997]; the mop-up exactly the first 1153 primes above 997 with maximum 10861; every mop-up class anchored on a genuine survivor; and, from the residues alone, **zero uncovered n in [1, 200000]**. Two deliberate corruptions are caught (dropping the class at 10861 leaves 1 uncovered, shifting a₁₇ by one leaves 119), so the check is not vacuous. Ratio y/(x′ ln x′) = 200000/100930.55 = 1.98156, the record's 1.9816.

**The theorem's construction at the same scale, and what Draft 1 actually ran.** Draft 1 reported "the theorem run literally" as |V| = 2137, 1220 mop-up primes, x′ = 10711, ratio 2.0123 (`n5-theorem-literal.txt`). Those numbers belong to the old cutoff z = √y ≈ 447 with a greedy mop-up that skips survivors already covered incidentally, not to the theorem as stated (z = √y/ln y, one distinct prime injected per original survivor); referee report 15 §2 B identified the mismatch and supplied a standard-library checker, reproduced here (`check-constructions.py`, `check-constructions.out`):

| initial cutoff | original survivors | mop-up rule | new primes | largest prime x′ | y/(x′ ln x′) |
|---|---|---|---|---|---|
| √y ≈ 447.21 | 2137 | skip covered survivors (greedy) | 1220 | 10711 | 2.0123 |
| √y | 2137 | inject every original survivor | 2137 | 19597 | 1.0326 |
| √y/ln y ≈ 36.64 | 6210 | skip covered survivors (greedy) | 1331 | 11071 | 1.9400 |
| √y/ln y | 6210 | inject every original survivor | 6210 | 61871 | 0.2930 |

All four cover [1, 200000] with distinct primes and zero uncovered positions. The theorem's literal choices (last row) give ratio 0.29 at this scale, and at y = 2·10⁶ (z = ⌊√y/ln y⌋ = 97, π(z) = 25) the same two stages give |V| = 38523 survivors, 38523 injected primes, x′ = 461183 = p_{π(z)+|V|} (with one prime injected per survivor the largest prime is a pure counting quantity, return #1007), ratio 0.3325274 and zero uncovered (return #1536's `cert1902.py`, `cert1902.json`, `cert1902.run1.txt`); the greedy improvement, which is valid (a survivor already covered needs no prime), is what the 2.0 figures measure, and it is identified as such. Pure ascending greedy above z = 13 with no random stage gives x′ = 10301, ratio 2.1013. The random middle stage of the registered pipeline costs about six percent of the ratio (2.1013 → 1.9816) rather than buying it, and the prereg's own prediction for the pipeline (x′ ≈ 16400, ratio ≈ 1.2) was pessimistic. None of these finite ratios contradicts the asymptotic theorem or determines its unnamed constant.

**The CRT step at small scale.** For x ∈ {5, 7, 11, 13, 17} the verifier exhausts every choice of residues, takes the largest fully covered [1, y], solves s ≡ −a_p (mod p), and measures the true maximal twin-slot-free run modulo x# by direct sieve. At every level the constructed window is the global maximal run, the loss is zero, and run + 1 reproduces the ladder 12, 30, 42, 66, 108 (`n5-verify-out.txt`). The record's "G₂(x#) ≥ y − O(1)" is conservative by exactly + 1 at these levels.

**What the instance does not check.** Anything about the limit. The ratio 1.98 at one scale is a measurement of one greedy instance; the theorem's admissible c₀ is a small unnamed constant, and the finite ratio is not a lower bound on it and not evidence for it. The record says so (`redteam-0820-math.md` §3.4; `prop-xlnx-lower-bound.md` §6) and we repeat it.

**Recipe** (a reviewer with only the served files; write `<project base>` for the host; one thread, under ten seconds in all).

```
curl -sS -H "Authorization: Bearer $TOKEN" <project base>/docs/research/import-hypergraph-01-instance.js -o research/import-hypergraph-01-instance.js
curl -sS -H "Authorization: Bearer $TOKEN" <project base>/docs/research/qc/embed.js   -o research/qc/embed.js
curl -sS -H "Authorization: Bearer $TOKEN" <project base>/docs/research/qc/tailfmt.js -o research/qc/tailfmt.js
node research/import-hypergraph-01-instance.js > stdout-original.txt        # sha256 cdcdf4ac…, 2.3 s
node research/qc/embed.js --check research/import-hypergraph-01-instance.js  # code-sha256 and out-sha256 match
# insert the one inert dump line after line 256 as in n5-recipe.md §3, then:
COVER_OUT=$PWD/cover.json node instance-with-dump.js > stdout-dump.txt      # diff against stdout-original.txt is empty
python3 verify-cover.py cover.json > verify-out.txt                          # uncovered = 0; sha256 cf7bc45c…
python3 mertens-check.py 20000000 > mertens-check-out.txt                    # V(z) ln²z at 2·10⁷ = 0.4162027; stable stdout sha256 1a02897f…; the Draft 1 file 985f9f3b… carried three timing lines that this command does not emit
python3 check-constructions.py > check-constructions.out                     # the four-row table of §5 (referee report 15's checker), standard library, seconds
```

---

## 6. Placement

Three lower bounds for G₂(x#) stand in this corpus. With ll = ln ln, lll = ln ln ln:

| bound | source | grade |
|---|---|---|
| G₂(x#) ≫ x ln x · lll x/ll x | G₂ ≥ g pointwise and [FGKMT] | proven, free transfer, nothing two-class |
| G₂(x#) ≥ c₀ x ln x + 1 for x ≥ x₀(c₀), every c₀ < 1/(8 C₁ C₂ e^{−2γ}) | Theorem 1 | published ingredients at their statements; composition inferred, unrefereed |
| G₂(x#) ≫ x ln³x (lll x)²/(ll x)⁴ for x beyond an unspecified eventual threshold (the record's 10^{134.1} is the estimate obtained by setting every implied constant to 1, a floor on the actual onset and not a certified sufficient range) | `two-class-lower-bounds.md` §4c; `paper/kk-lower-bound.md` Theorem B | derived in the record, not refereed; the remaining obligations are the unrefereed substitution into [KK]'s §2, the page-image read of [HR] Theorem 2.2, and a certified threshold |

The middle line is above the first by ll x/lll x → ∞ and below the third by ln²x (lll x)²/(ll x)⁴, which is ln²x up to ll factors. Both comparisons are asymptotic with the constants unnamed: at x = 10¹⁰⁰, ll x/lll x = 3.21, so the improvement over the free transfer is a factor of three against two unevaluated constants, and a referee is entitled to call "above FGKMT" unverified until both constants are computed. We state it as the asymptotic comparison it is.

A referee will ask why the weaker of the two two-class bounds deserves a note. The answer is provenance. The §4c reading substitutes the pair {a_p, a_p − 2} into the interior of [KK]'s §2 construction and re-derives their case trichotomy for it; what remains for it is the unrefereed substitution, the unread [HR] Theorem 2.2 page, and a certified threshold (Draft 1 cited a Selberg support-parameter condition at κ = 4 as a live obstacle; the record marked that discussion superseded on 2026-09-07 and the companion paper's §6.2 makes it a remark, since the consumed Brun-form statement has no such parameter). The chain of §3 consumes the fundamental lemma at its statement and never enters a proof. A reader who grants three published statements and one page of composition has Theorem 1; a reader of §4c has to referee a substitution. Theorem 1 also runs at accessible scale and replays clean (§5), whereas the §4c bound has no certified practical threshold at which to run it.

The trade has a cost and it is stated: two logarithms, up to the ll factors. We do not argue that the weaker bound is preferable. We argue that it is the strongest two-class lower bound of that provenance grade found in this corpus's searches, and that the searches run (§7, §8.3) found no bound of that grade for this object; the searches are bounded and their omissions are listed.

---

## 7. Prior art

The registry's position is the one stated here; we have not softened it and we have not improved on it.

- **No published two-class lower bound of any shape was found** in the owning convention (`paper/proposals/PROPOSALS.md`; `research/SEARCH-CONVENTIONS.md` §1 and §3). The owning convention for this object is A144311's own wording and the "bounded number of residue classes per prime" phrasing of MathOverflow 88323, not the corpus's vocabulary; the rule that a clean negative proves nothing until the owning convention has been searched is `SEARCH-CONVENTIONS.md`'s and it was applied. A144311 carries no formula and no reference lines. Of the 1217 problems on erdosproblems.com exactly two mention Jacobsthal (#687, #970) and neither poses the two-class variant; Ford, Konyagin, Maynard, Pollack and Tao's Remark 7 states the twin sifting system as ground their one-dimensional method does not reach (`research/covering-dive.md` §4.2 and Q5).
- **The shape is in print for the nearest cousin.** [KK] Remark 1 (p. 3) records j_f(P(y)) ≫ y ln y for every polynomial f of degree at least two, as a consequence of their Theorem 1. Their j_f shifts the value, G₂ shifts the argument, and the two are not the same family of sets even at f(i) = i(i + 2) (`research/covering-dive.md` §4.2, Correction 2), so their theorem does not apply to G₂ as stated. But the shape y ln y for a two-element sifting system is theirs in print, by a far heavier route, and a referee will say that the argument of §3 is the standard fundamental-lemma-plus-mop-up mechanism and very likely folklore. We agree that the mechanism is standard; that is the point of consuming it at its statements. The claim is the object and the grade, not the shape.
- **The one-class exposition places the two-class object outside its method, without naming it.** Tao's 2014 post on the four-author paper ("Large gaps between consecutive prime numbers", 21 August 2014, announcing Ford, Green, Konyagin and Tao, arXiv:1408.4505; not the five-author [FGKMT]) contains three passages that bear on this note, quoted at their wording: the Jacobsthal function is introduced as "the largest y one can take for a given x", i.e. the one-gap object; the Erdős–Rankin constructions are said to stop "well short of the Cramer prediction", with the conjecture "out of reach of current methods"; and Maynard's route is described as "a variant of his result on admissible prime tuples that can catch many primes but are also allowed to catch composites". The post does not contain the phrases "shifted sifting", "translated finite set" or "n(n+2)" that an earlier draft of this note and its search record (`lit-check-2026-09-11.md` §5) attributed to it (0 occurrences on the page as fetched on 2026-09-18 by return #1004 and again on 2026-09-22); that attribution is withdrawn. What the located passages support is narrower and sufficient: the public exposition of the one-class method neither states nor claims a two-class bound, which is consistent with the registry's negative.
- **[KK] has no citations recorded in the databases the corpus swept** (`prop-kk-lower-bound.md` §4, inherited by `prop-xlnx-lower-bound.md` §4). That finding expires the day someone cites them for a two-class bound, and this note would then compare against that paper.
- **Holt's cycle-of-gaps corpus** (`research/PRIOR-ART.md`) owns most of the corpus's frame and gives a constructive one-class lower-bound technique; it never studies the spacing between consecutive occurrences of the gap 2, which is G₂, and proves no bound on any maximum gap.
- **The standing assumption of the registry**, that prior art exists for more of the corpus than has been found, applies here with less force than anywhere else in it, because the claim is mostly made of other people's theorems and says so first (`prop-xlnx-lower-bound.md` §4). It still applies, and Remark 1 of [KK] is the nearest thing to it that we know.

---

## 8. Residuals, and what would break the theorem

### 8.1 Load-bearing readings of the source

[KK] Corollary 1 and Lemma 1 were re-read for this note at the arXiv v2 PDF (12 pages, md5 b5d7d2a23ffd902415057adebfe430b1, matching the record's artifact). The statement quoted in `covering-dive.md` §4.2 is exact word for word. Lemma 1's hypothesis list as rendered in `redteam-0820-math.md` §3.3 (g multiplicative, g(p) ≤ κ, g(p) < p for all primes, z ≪ X, constant depending on κ) omits one clause, |r_d| ≤ g(d), which is invisible at the Corollary 1 interface and is what makes z near X^{1/2} admissible; Step 1 satisfies it by CRT. Remark 1 on p. 3 was read for §7.

### 8.2 The unread dependency

[HR] Theorem 2.2 has been reached in this project at OCR only (`paper/kk-lower-bound.md` §12). [KK] Lemma 1 cites it and proves nothing else; [KK]'s own Corollary 1 proof has the representative slip of §2. So the statement Theorem 1 consumes is printed in two places, one of which this project has read at source and one of which it has not, and the printed derivation connecting them is repaired here in one line rather than read. A referee who wants the ingredient on firmer footing reads [HR] pp. 68 to 69 or any textbook form of the Selberg upper bound sieve of dimension two; the theorem does not change.

### 8.3 Prior art residuals

What was not searched travels with the negative. The corpus's sweeps ran in A144311's wording, in the MathOverflow 88323 phrasing, over erdosproblems.com, and over OpenAlex and Semantic Scholar citation graphs for [KK]. A further twenty-minute web search for this note (terms "twin Jacobsthal", "Jacobsthal function" with "two residue classes", "shifted", "twin", "pair", "n(n+2)"; Hagedorn's Jacobsthal papers; OEIS A144311; Tao's 2014 exposition of the four-author paper (arXiv:1408.4505)) found no published lower bound for the two-class object (`lit-check-2026-09-11.md`). Neither sweep ran over the Russian-language literature around [KK], nor over lecture notes and problem collections where a folklore bound of this shape would live if it lives anywhere. [KK] Remark 1 is the closest published statement we know and it is about a different object.

### 8.4 Falsification table

| claim | what would falsify it | has the check run |
|---|---|---|
| Ingredient A applies at κ = 2 to Ω₂ = {0}, Ω_p = {0, −2} | a hypothesis of [KK] Lemma 1 or [HR] Theorem 2.2 that the instantiation violates | yes, at [KK] pp. 3 to 4, three times in the record and once here; [HR] at OCR only |
| (2.2), the constant 2 C₂ e^{−2γ} | an error in the two-line identity or in Mertens' theorem; a finite product differing from its limit cannot refute convergence, and the numerical check is a consistency check only | identity checked; `mertens-check.py` to z = 2·10⁷ gives 0.4162027 as a consistency check |
| Step 3, the injection exists for large x | a c₀ below the threshold with survivors outnumbering primes for arbitrarily large x | no explicit x₀; the inequality is asymptotic and its constants are unnamed |
| Proposition 1 and the + 1 | a full cover of [1, y] with G₂(x#) ≤ y | brute force at x ≤ 17: loss 0 at every level |
| the finite cover at x′ = 10861 | an n ∈ [1, 200000] hit by no class | yes, independent verifier, 0 uncovered; negative controls catch corruptions |
| "above the free transfer" | the asymptotic comparison is a statement about limits; a finite observed ratio cannot refute it, and only computed constants could locate a crossover range | no; both constants unevaluated |
| the implied constant C₁ is effective | a non-effective step in [HR] Theorem 2.2 at κ = 2 | no explicit pass; not expected |

### 8.5 What would move the grade

**Toward submission.** One outside number theorist confirming that Ingredient A applies at κ = 2 to the pair (the proposal's second upgrade trigger); a numerical C₁ from [HR] Theorem 2.2 and an explicit x₀, which would also settle the "above FGKMT" row of §8.4; a page-image read of [HR] Theorem 2.2. **Against.** A published two-class lower bound of this or greater strength in the owning convention, which retires the note; a refereed publication of the §4c reading at its stronger exponent, which the proposal names as its retire trigger since a refereed x ln³x bound makes an x ln x note pointless; a hypothesis of the fundamental lemma the instantiation violates, which the proposal registers as its WEAKENED trigger.

---

## 9. Record

- 2026-08-19: `research/two-class-lower-bounds.md` §4b sketches the two-stage accounting at INFERRED grade, two survivors per mop-up prime, superseded in strength the same day by §4c.
- 2026-08-20: the chain is written out as a proof and flagged HELD in `import-hypergraph.md` §4, entering no live document; the pre-registration is committed alone at 469aaa3 before any producer or report (`import-hypergraph-prereg.md`).
- 2026-08-20: the adversarial pass confirms every ingredient at its source and re-derives the composition (`redteam-0820-math.md` §3.3), and rebuilds the finite instance from the prereg text (§3.4). The same pass records that the prereg's N3 prediction failed at toy scale (99.9th-percentile short-pair codegree 0.1496 against the registered 0.02) and that the chain never uses N3. That failure is part of the record and is not repaired here.
- 2026-08-28: `paper/kk-lower-bound.md` states the bound as Theorem A beside the §4c reading as Theorem B; the proposal is regraded QUICK-DRAFT. Its §11.2 records the [KK] Corollary 1 proof slip and the representative repair.
- 2026-09-11: Draft 1. Changes against the record: the Mertens constant is written as 4 C₂ e^{−2γ} in (2.1) and 2 C₂ e^{−2γ} in (2.2) in place of the record's C₂ and undefined C₃, and checked numerically; the theorem is stated with the explicit threshold c₀ < 1/(8 C₁ C₂ e^{−2γ}) and the form "for x ≥ x₀(c₀)"; z is taken as y^{1/2}/ln y; the consequence of a full cover is stated as G₂ ≥ y + 1 following Proposition 1, replacing the proposal's y − O(1); Ingredient A is cited to [HR] Theorem 2.2 with [KK] Corollary 1 as the printed instance, and the [KK] proof slip is stated in the ingredient rather than in a residual; the finite instance is replayed, exported, independently verified and hashed, and identified as a three-stage construction distinct from the theorem's two-stage one, with the theorem's construction run literally at the same scale beside it; [KK] Remark 1 is added to the prior-art position.
- 2026-09-19: Draft 2, the corrections of referee report 15 (items A to F and the smaller ones), listed in the status line; the finite-construction table of §5 reproduced from the referee's checker.
- 2026-09-25: this revision, answering findings #558 and #559 of review #346 (return #1181). The pipeline cost of §5 is corrected to about six percent (2.1013 → 1.9816, #558); the Abstract identifies the finite cover as the registered three-stage pipeline rather than the theorem's own construction and names the theorem's own x′ at y = 2·10⁵ and 2·10⁶ (#559a), and cites [HR71] Theorem 3 at the page beside the OCR read of [HR] (#559b); the §6 comparison is written as ln²x up to ll factors (#559c); the record entries are in date order (#559d); and the two residuals of the revision recipe are recorded (#559e): `patch1430.py` (return #1181) rebuilds this file from Draft 1 except for one trailing newline — its output is 53021 bytes against this file's 53022, the two agreeing after the final newline is stripped — and its leftover-count line reads (0, 2, 0, 0, 0) for the five strings it checks, the 2 being `Theorem 5, (3.17)` inside quoted Draft-1 wording (§2's Ingredient B and the [RS] entry), which is expected and not a leftover. The §5 certificate at y = 2·10⁶ and the re-pointed Tao passage of §7 are merged from return #1536 (#559f). Replaying the §5 recipe on 2026-09-25 reproduces the producer's stdout byte for byte (`out-sha256` cdcdf4acbf71ca6c16b29f7b363ef970cb1b552add563a3bb31df310e4442c72, 62 lines, 4.8 s on node v22.23.3, the record's own gate reporting `code-sha256` and `out-sha256` matching) and finds the sha Appendix A records for the served `research/qc/embed.js` stale (measured in Appendix A).

---

## 10. References

House form: authors, title, identifiers, then an italic provenance sentence naming what was actually read for this note or in the record. Entries marked [RECORD] are carried from `paper/kk-lower-bound.md` §12 and were not re-read for this note; [MEMORY] entries carry bibliographic details this project holds without a page image.

**The sieve input.**

- [KK] A. Kalmynin and S. Konyagin, *A polynomial analogue of Jacobsthal function*, arXiv:2302.00459 (v1 1 Feb 2023, v2 3 Dec 2023); Izvestiya: Mathematics **88**:2 (2024) 225–235, DOI 10.4213/im9467e, MR4727548. *Publisher record verified in the record 2026-08-18. Re-read for this note 2026-09-11 at the arXiv v2 PDF, 12 pages, md5 b5d7d2a23ffd902415057adebfe430b1: Remark 1 (p. 3), Lemma 1 and Corollary 1 with its proof (p. 4), and the application of Corollary 1 in §2 (p. 6).*
- [HR71] H. Halberstam and H.-E. Richert, *A new look at Brun's sieve*, Mémoires de la S.M.F. 25 (1971), numdam 10.24033/msmf.39: the example n(n+2) on printed p. 99 and Theorem 3 on p. 100 (read at the page by referee report 15; cited here on that reading).
- [HR] H. Halberstam and H.-E. Richert, *Sieve Methods*, London Mathematical Society Monographs 4, Academic Press, London and New York, 1974 (Dover reprint 2011), Theorem 2.2, Chapter 2 §5, pp. 68 to 69. *[RECORD, OCR ONLY] Statement reached at the Dover search-inside index on 2026-09-07 and 2026-09-08 (`paper/kk-lower-bound.md` §12); no page image has been read in this project.*

**The one-class lower bounds.**

- [FGKMT] K. Ford, B. Green, S. Konyagin, J. Maynard and T. Tao, *Long gaps between primes*, arXiv:1412.5029; J. Amer. Math. Soc. **31** (2018), no. 1, 65–105. *[RECORD] PDF read in the record for `paper/kk-lower-bound.md`; bibliographic data re-confirmed at the arXiv record on 2026-09-11; not re-read for this note. The Jacobsthal-function form of the bound is quoted in [KK]'s introduction, p. 2.* The 2014 four-author post announces arXiv:1408.4505, which this paper supersedes; it is cited only for the three passages quoted in §7.
- [Ra] R. A. Rankin, *The difference between consecutive prime numbers*, J. London Math. Soc. **13** (1938) 242–247, DOI 10.1112/jlms/s1-13.4.242. *Bibliographic data confirmed at the journal record (Oxford Academic and Wiley) on 2026-09-11; the paper itself was not read. Listed as reference [3] of [KK].*
- [Pi] J. Pintz, *Very large gaps between consecutive primes*, J. Number Theory **63** (1997), no. 2, 286–301. *Bibliographic data confirmed at the ScienceDirect record on 2026-09-11; the paper itself was not read. Not among the nine references of [KK].*

**Analytic inputs.**

- [Me] F. Mertens, *Ein Beitrag zur analytischen Zahlentheorie*, J. reine angew. Math. **78** (1874) 46–62. *[MEMORY] The theorem is consumed at its standard statement; the explicit form used for effectivity is [RS].*
- [RS] J. B. Rosser and L. Schoenfeld, *Approximate formulas for some functions of prime numbers*, Illinois J. Math. **6** (1962) 64–94. *[RECORD] Read at page images pp. 69–70 in the record on 2026-09-08 (Project Euclid, md5 357d126e8d5e498a74e750f2c3ff83cd): Corollary 1, (3.5) and (3.6) for π(x) (fixed-factor bounds); Theorem 1, (3.1)–(3.2), and Theorem 2, (3.3)–(3.4), for the relative error; Theorem 7, (3.25)–(3.26), for the Mertens product. Draft 1's "Theorem 5, (3.17)–(3.18)" named the reciprocal-prime sums of p. 70 and is corrected (referee report 15 §2 C, page checked there).*

**The object.**

- OEIS A144311, *The length of the longest sequence of consecutive integers, each equal to 1 or −1 modulo at least one of the first n primes* (Carter 2008, a(1) to a(7); Alekseyev 2009, a(8) to a(16); Wang 2024, a(17) to a(22)). *Entry fetched directly on 2026-09-11: 22 terms 1, 5, 11, 29, 41, 65, 107, 149, 203, 257, 347, 527, 545, 617, 707, 869, 965, 1079, 1283, 1397, 1529, 1709; no formula line and no reference line; links to a StackExchange note and a C++ program; cross-references A048670, A049300, A058989. Equal to G₂(p_n#) − 1.*
- OEIS A048670, Jacobsthal's function at the primorials. *[RECORD]*

**Platform records.** Referee report 15 on return #32 (its standalone checker is `check-constructions.py` here).

**This corpus.** `research/two-class-lower-bounds.md` §1, §3, §4b, §4c, §5; `research/history/staging/import-hypergraph.md` §4; `research/history/staging/import-hypergraph-prereg.md`; `research/history/staging/redteam-0820-math.md` §3.3 to §3.4; `research/covering-dive.md` §4.2; `research/G2-STATE.md` §3a; `research/SEARCH-CONVENTIONS.md` §1, §3, §4; `research/PRIOR-ART.md`; `paper/kk-lower-bound.md` §1, §3, §9, §11, §12; `paper/beta2-note.md`; `paper/proposals/prop-xlnx-lower-bound.md`; `paper/proposals/prop-kk-lower-bound.md`; `paper/proposals/PROPOSALS.md`.

---

## Appendix A. Provenance of every number

| number | where it appears | source |
|---|---|---|
| 2, 6, 12, 30, 42, 66, 108 | §1.1 | G₂ ladder, `paper/beta2-note.md`; rebuilt from scratch for x = 5 to 17 in `n5-verify-out.txt` |
| 4.26645… | §1.1 | `paper/beta2-note.md`; twenty-digit value Booker and Browning per `research/SEARCH-CONVENTIONS.md` §4 |
| 22 terms to x = 79 | §1.1 | OEIS A144311 via `paper/kk-lower-bound.md` §1.2 |
| C₂ = 0.6601618 | §2 | partial product to 2·10⁷ in `mertens-check-out.txt`, agreeing with the literature value |
| e^{−2γ} = 0.31524, 4 e^{−2γ} = 1.26095 | §2 | `mertens-check-out.txt` |
| 2 C₂ e^{−2γ} = 0.4162145; observed V(z) ln²z = 0.4162027 at z = 2·10⁷ | §2, §8.4 | `mertens-check.py`, `mertens-check-out.txt` |
| 8 C₂ e^{−2γ} = 1.66486 | §3 | `mertens-check-out.txt` |
| 2137 survivors at z = √y, main term 2203.6, ratio 0.9698; 6210 survivors at z = √y/ln y | §3, §5 | `n5-theorem-literal.txt`, `check-constructions.out`, `mertens-check-out.txt` |
| y = 200000; z = 13; 9889; 9/182 → 9890.1; 162 primes in [17, 997]; seed 13; 200 trials; 1654; 1731.07; 1730.83; 1153; 1.43; x′ = 10861; 1321 classes; 0 uncovered | §5 | `n5-recipe.md`, `n5-verify-out.txt`; every figure equals `redteam-0820-math.md` §3.4's |
| 1.98156 = 200000/100930.55 | §5 | `n5-recipe.md` §6 |
| 1220 primes, x′ = 10711, ratio 2.0123 (greedy, z = √y); 2137, 19597, 1.0326 (injective, z = √y); 1331, 11071, 1.9400 (greedy, z = √y/ln y); 6210, 61871, 0.2930 (injective, z = √y/ln y); 1257 primes, x′ = 10301, ratio 2.1013 (greedy above z = 13) | §5 | `check-constructions.out` (referee report 15's checker, reproduced), `n5-theorem-literal.txt` |
| y = 2000000; z = 97; π(z) = 25; 38523 survivors; 38523 injected primes; x′ = 461183; ratio 0.3325274; 0 uncovered, the theorem's own choices | §5 | `cert1902.py`, `cert1902.json`, `cert1902.run1.txt` (return #1536) |
| x′ ≈ 16400, ratio ≈ 1.2 | §5 | `import-hypergraph-prereg.md`, the N5 prediction |
| 1 and 119 uncovered under corruption | §5 | `n5-negative-control.txt` |
| 2.29 s, 240 MB, 0.30 s, 1.1 s | §5 | `n5-recipe.md`, `mertens-check-out.txt` |
| 10^{134.1} (all-constants-one estimate, a floor on the onset) | §6 | `research/two-class-lower-bounds.md` §4c; `paper/kk-lower-bound.md` §8 |
| ll x/lll x = 3.21 at x = 10¹⁰⁰ | §6 | `mertens-check-out.txt` |
| 0.1496 against 0.02 | §9 | `redteam-0820-math.md` §3.4 |
| 1217 problems, #687, #970 | §7 | `research/covering-dive.md` Q5 |
| 469aaa3 | §9 | `import-hypergraph-prereg.md` custody line, `prop-xlnx-lower-bound.md` §2 |

Files produced for this note and their sha256:

| file | sha256 |
|---|---|
| `verify-cover.py` | ece0d1548d3c8c43889154f5ba0471a208ea1f3b60999eca513e8c7b8e844fa1 |
| `n5-recipe.md` | 3fe9830ec7f6ae8d6515ed04392d0a4c49ac91a104eaa5cb4678ddec982db75a |
| `n5-cover.json` | 1b73e1d4a574bab9c98d7e611869611f2c504428cc7f68a479c4b8a3b646f7b1 |
| `n5-verify-out.txt` | cf7bc45c24d74f91c2821cc135b8f048df46bedf95f3523391bfe96150e61571 |
| `n5-negative-control.txt` | 73ddd8d2d536cbdc4028737a0521a819b8c43eeb9e7715e10c915606c8be1be0 |
| `n5-theorem-literal.txt` | d12599a84a6f4f2fd32008d5c0d089ce261288b2eb857592c1f1ae9cb5cccf36 |
| `n5-embed-check.txt` | b4726e7f6683c357698fa9e3458e5e7ed4657354622dd5ddcb4de55ec17abafd |
| `mertens-check.py` | e7f25abe8031c3a6959ae2bfa59e6183dd503202469dcefecbfe97c2cc2791f6 |
| `mertens-check-out.txt` (Draft 1 file, with three timing lines) | 985f9f3b07e1f158e4dfb9d1c6d25d567a6bf22ed6b7ac2a49866eb6d68ec713 |
| stable stdout of `python3 mertens-check.py 20000000` (no timing lines; referee report 15 §2 E) | 1a02897ff5a033866ba120837119a8a2c2cae2183e5dc182260a41e3688020d5 |
| `check-constructions.py` (referee report 15 §5, saved verbatim) and `check-constructions.out` | uploaded with this revision |

Cited from return #1536 and not produced for this note: `cert1902.py` 129673996ded2fa85b4b7350d0ec062a94e07bc9e55fa780ee9b3f537385522b; `cert1902.json` cf17bec173d30e86e73ad6e5c48917cb3d071ee119e6f6c7ee8ce8c8236f5c6d; `cert1902.run1.txt` 1da3b01453e62bcd52384f5ceb0d20a7cc2d87231d26fd19244bf4bdf8e09dac.

Served inputs: `research/import-hypergraph-01-instance.js` c186818de4ebf28edba158ad816667f8b01c9dea07c1f15b87f21260bba19370; `research/qc/embed.js` eedf53eb0c6ecda0aa8aee0eebe1533d60d07e923fce52b3bd1cb4a3b43c2a3a; `research/qc/tailfmt.js` ad688e4769b535c0b5cc27c526c1df7c091e9cb9ad4f4fc8beca975b5d6578b7. Replayed 2026-09-25: the producer's stdout is unchanged byte for byte (`out-sha256` cdcdf4acbf71ca6c16b29f7b363ef970cb1b552add563a3bb31df310e4442c72, 62 lines, 4.8 s on node v22.23.3), 
`embed.js --check` reports both `code-sha256` and `out-sha256` matching, `research/import-hypergraph-01-instance.js` and `research/qc/tailfmt.js` still hash to the values above, and the served `research/qc/embed.js` now hashes to c7b5c213931371265065b159c3e2cc25d170578cc2199c6725735b26cb84679a: the recorded value is stale and a replay takes the served bytes.

## Appendix B. Custody residuals in the underlying records

Listed, not silently fixed.

1. `import-hypergraph.md` §4 step 2 and `redteam-0820-math.md` §3.3 item 2 write the two-class Mertens product as (C₂ + o(1))/ln²z; the constant is 4 C₂ e^{−2γ} (§2). `paper/kk-lower-bound.md` §9 step 2 repeats it and then names the constant C₃ without defining it.
2. `prop-xlnx-lower-bound.md` §1 states the CRT consequence as G₂(x#) ≥ y − O(1); Proposition 1 gives y + 1.
3. `redteam-0820-math.md` §3.4 describes the finite rebuild as "seed 13, 200 trials, greedy mop-up" without stating that its fixed stage stops at z = 13, so a reader takes the echo for the theorem's two-stage construction; it is a three-stage one (§5).
4. `covering-dive.md` §4.2, `redteam-0820-math.md` §3.3 and `prop-xlnx-lower-bound.md` §1 to §2 carry "published theorem consumed as a theorem, read at source" for [KK] Corollary 1 without the proof slip that `paper/kk-lower-bound.md` §11.2 records.
5. `redteam-0820-math.md` §3.3's rendering of [KK] Lemma 1's hypotheses omits |r_d| ≤ g(d) (§8.1).
6. `two-class-lower-bounds.md` §4b's mop-up capacity 2x/ln x assumes two survivors per prime without an argument; the proof as written out uses one (§3).

## Appendix C. Registry updates this draft implies

Proposed, not made, since this note is written under a fence that permits no edits to existing files.

- `paper/proposals/PROPOSALS.md`, row `prop-xlnx-lower-bound.md`: the draft now exists as its own file; the row's parenthetical should point here as well as at `kk-lower-bound.md` §§3, 9, 10.
- `paper/proposals/prop-xlnx-lower-bound.md` §1: replace "G₂(x#) ≥ y − O(1)" with "G₂(x#) ≥ y + 1"; §1 to §2: qualify "consumed as a theorem" for [KK] Corollary 1 with the proof slip and the [HR] citation; §4: add [KK] Remark 1 to the prior-art position.
- `research/G2-STATE.md` §3a, the x ln x row: the constant threshold 1/(8 C₁ C₂ e^{−2γ}) and the citation to [HR] Theorem 2.2 with [KK] as printed instance.
- `research/history/staging/import-hypergraph.md` §4 and `research/history/staging/redteam-0820-math.md` §3.3: frozen staging files; the Mertens constant slip is recorded here (Appendix B item 1) and in `research/history/CHANGELOG.md` if the owner wishes, not edited in place.

*Superseded claims are recorded in `research/history/CHANGELOG.md`.*

