# The sifting limit floor at kappa = 2: what a lower bound on beta(kappa) would have to be, and why the corpus already owns a measured barrier inside the band

<!-- ledger
id: Q-recon-0904-sifting-limit-floor
status: PARTIAL
todo: 0
question: What is actually known, in the owning convention and at the page, about LOWER bounds on sifting limits at dimension kappa > 1, and is the class-blind cap at beta_2 = 4.26645 a barrier or a method artefact?
verdict: Both. The corpus's [ABSENT] is wrong for lower bounds and right for extremal examples: Selberg's Lectures section 17 and Brady's 2017 Corollaries 1 and 3 ARE lower bounds on beta(kappa) at kappa > 1, invisible because Selberg's convention is the reciprocal a_k = 1/beta_kappa so his lower bounds are titled "upper bounds for sifting limits", while no kappa > 1 extremal example exists and Halberstam's own 2003 review says so; the best floor on beta(2) resting on a citation is 1.8394 from Brady's reduction evaluated at kappa = 2, unconditional and below the band, and beta(2) >= 2 follows from monotonicity by a padding argument DERIVED here and probably folklore; the cap at 4.26645 is a METHOD ARTEFACT at rung MEASURED, since the level-D LP is exactly the axiom-only information class and its calibrated floor of 3.3152 sits about 18 per cent below the DHR value and passed, 0 of 15, its first external test against the published beta_3 and beta_4; the band (2, 4.26645] is untouched by anything proven.
-->

> **RIDER 2026-09-04 (orchestrator, from `redteam-0904-sifting-limit.md`).**
> Four of five claims survive with corrections; the headline does not. The
> "METHOD ARTEFACT at rung MEASURED" verdict is REFUTED as stated on four
> grounds, each sufficient: the level-D LP fixes one ω-profile out of a class
> Ford defines by a one-sided inequality, and a legal profile inside the
> classical budget at x = 13 reads 5.0113 calibrated, above β₂, firing this
> note's own pre-registered refutation; the 1.72 calibration is fitted at one
> point and misses the second proven anchor β(1/2) = 1 by 66 to 82 per cent;
> the pooled 3.3152 averages four statistics of which only s* is the
> definitional analogue, and that route reads 3.9487 at x = 43 and is still
> climbing (+0.43 per ln x, reaching 4.26645 at x ≈ 104 on the fit); and
> 3.3152 is 22.3 per cent below 4.26645, not 18. The calibrated sentence: no
> barrier theorem, no exhibited axiom-only argument inside the band, the LP
> number is a finite-level measurement for one profile. Claim a CONFIRMED with
> a second source off the OCR channel (Ford 2023 p. 37); Halberstam is p. 117,
> not 116. Claim b CONFIRMED and strengthened: Brady's class (his p. 10) is the
> axiom-only interval class Face 4 needs, and 1.819592 rests on proved facts
> alone; quote it, not 1.8394. Claim c CONFIRMED but demoted: β(2) ≥ 2 is two
> lines from Ford's one-sided (Ω) plus β(1) ≥ 2, so the padding construction is
> correct and unnecessary. Of the eight live proposals two survived verbatim,
> five were reworded and one (the LP floor as a statement about the class) was
> refuted; the applied versions are in the live layer dated 2026-09-04.

*(2026-09-04. Recon note, HELD. No existing file edited, no git command run
beyond read-only status and log. Proposed live-layer changes are listed in the
last section and are NOT applied. Legend as in `research/covering-dive.md`:
**[PROVEN]** published theorem with source; **[VERIFIED]** checked
computationally here; **[MEASURED]** empirical, finite range; **[DERIVED]**
this note's own deduction from sourced facts, not reviewed; **[CONJ]**
published conjecture; **[ABSENT]** searched and found nothing, with the
convention named.)*

---

## 0. Verdict

**The disconfirming half first, and it is most of the note.** Nothing here moves
an exponent. The open band `(2, 4.26645]` is untouched: no proven statement,
located or derived, reaches into it from below, and the strongest thing that
sits inside it is still the corpus's own calibrated LP floor, which is a
finite-`x` measurement with a wide reading range and not a theorem. The one
derivation in this note that reaches the value `2` reaches the band's endpoint
and stops there, and it is almost certainly folklore rather than anything new.

**The corpus's `[ABSENT]` on this face is wrong as written, and wrong in a way
`SEARCH-CONVENTIONS.md` predicts.** `research/sift-limit-attack.md`:143 records
`[ABSENT — in sieve-theory vocabulary]` for the whole object and
`SEARCH-CONVENTIONS.md`:162 records "None found" for a `κ = 2` extremal example.
The second is right and is now calibrated by a better source than our own
search. The first is not: **lower bounds on `β(κ)` for `κ > 1` are in print, and
have been since 1991.** They were invisible because of a convention inversion.
Selberg's *Lectures on Sieves* works with the reciprocal `a_k = 1/β_κ`, so his
§17 is titled **"Some upper bounds for sifting limits for constant sifting
density"** and its content is a **lower** bound on `β_κ`. A search for "lower
bound for the sifting limit" is therefore a guaranteed clean negative against a
section whose title says the opposite. That is exactly the failure mode
`SEARCH-CONVENTIONS.md` exists to name, and §1's table carries no row for this
object.

**What is actually proven, and the best floor on `β(2)`.**

| statement | value at `κ = 2` | rung |
|---|---|---|
| Selberg, *Lectures on Sieves* §17, in the reciprocal convention | `β_2 > 1.213` | **[PROVEN]** in print; read only through Google Books OCR snippets, constant uncertain |
| Brady 2017 Cor. 1, `β_κ ≥ (1+o(1))·2κ/e` | `1.472` asymptotically, nothing effective at `κ = 2` | **[PROVEN]** in a deposited thesis, read at the page |
| Brady 2017 Cor. 3, effective, stated for `κ ≥ 3` | vacuous at `κ = 3` (`0.6196`), first exceeds 1 at `κ = 4` (`1.1157`) | **[PROVEN]**, read at the page |
| **Brady's own reduction evaluated at `κ = 2`, which he does not do** | **`β_2 ≥ 3e^{-1/2} = 1.81959`** from his Theorem 22 at `R = 1`; **`5/e = 1.83940`** using his computed `v_3 = 2` | **[DERIVED]** here, one step from his printed proof, unreviewed |
| monotonicity of `β` in `κ`, by padding a `κ = 1` extremal problem | **`β(2) ≥ β(1) = 2`** | **[DERIVED]** here, §2; hypotheses listed, almost certainly folklore |
| Granville's exceptional character, interval form | `β_interval(2) ≥ 2` | **[CONDITIONAL]** on Siegel zeros, `attack-barrier-kappa2.md` |
| the corpus's calibrated one-point LP floor | `3.3152` pooled, individual readings `2.669` to `3.949` | **[MEASURED]**, `lp-push-x43.md`, and independently re-run here |

So the best **unconditional** floor on `β(2)` is `2`, and it rests on a
derivation in this note rather than on a citation; the best floor resting on a
citation alone is `1.8394`, which is below the band. Under a Siegel-zero
hypothesis the floor is also `2`, and that hypothesis implies the target.

**Is the cap at 4.26645 a barrier or a method artefact? Method artefact, at
rung MEASURED, with the class's own floor unknown.** The level-`D` linear
program is the exact information-theoretic limit of every argument that reads
only the divisor-class counts, which is exactly what "axiom-only" means, and
this note's independent re-implementation of it reproduces all twelve of the
corpus's published cells to `4.23e-5` and then puts the calibration through a
test it had never faced: the calibrated reading must not exceed the published
DHR value at its own `κ`, because the DHR sieve is itself inside the class.
**0 of 15 readings exceed it**, and the headroom ratio at `κ = 2` is `0.7442` to
`0.8344`. So `4.26645` sits about 18 per cent above the one-point floor at the
levels reachable, and is not the limit of what the axioms permit. What the
class's own limit **is** remains open: measured at about `3.3` with readings
from `2.669` to `3.949`, proven only to be at least `2`.

**The band that matters, restated.** `(2, 4.26645]` is the open band for a
theorem. `(2, ~3.3)` is the band in which the measured one-point floor and the
truth cannot be told apart on present evidence, and inside which any axiom-only
argument would have to beat the corpus's own LP measurement to exist at all.

---

## 1. Sub-question 1: lower bounds on `β(κ)` for `κ > 1`, in the owning convention

**The convention, first, because it decides the answer.** Selberg's sifting
limit is written `a_k` and is the **reciprocal** of `β_κ`: `a_{1/2} = 1`,
`a_1 = 1/2`. An upper bound on `a_k` is a lower bound on `β_κ`. His table of
contents, read at a Google Books snippet of *Collected Papers* II
(vol. id `JswcQj2B1HIC`, ISBN 9783540506263), lists

> "14. The sifting limit for constant sifting density … 16. Two examples in
> connection with the B2R method 17. Some upper bounds for sifting limits for
> constant sifting density 18. A historical digression, the parity principle
> and a further example"

so the lower-bound content of the *Lectures* lives in a section whose title
reads as its opposite in our convention. §16 is the examples section and its
own opening sentence, read at a snippet, scopes it: "We shall in this Section
construct some particular examples or models in connection with the sifting
problem for constant density **when k = 1/2 and when k = 1**." **[PROVEN scope,
read at OCR snippet]**

**The bound itself.** §17 p. 201, at an OCR-degraded snippet in which the
fraction bars are lost, reads `a_k < e^{(h-1)/k}/h`, optimised at `h = k` for
integer `k` to `a_k < e^{1-1/k}/k`, that is `β_κ > κ·e^{1/κ-1}`, and a variant
"for all `k > 1`". At `κ = 2` that is `β_2 > 2e^{-1/2} = 1.213`. **[PROVEN in
print; the constant is OCR-uncertain, the direction and the `k > 1` scope are
not, and the asymptotic size `κ/e` is corroborated independently below.]**

**The corroboration, and the effective form, read at the page.** Brady's 2017
Stanford dissertation (*Sieves and iteration rules*, Stanford Digital
Repository `druid:gk881hk9239`, PDF text layer, and an identical copy at
`notzeb.com/phd-thesis.pdf`) says at printed p. 11, immediately after his
Theorem 7:

> "From this, one can improve a lower bound Selberg gave for the sifting limit
> β_κ by a factor of 2. **Corollary 1.** β_κ ≥ (1 + o(1)) 2κ/e."

and at printed p. 51:

> "**Corollary 3.** If β_κ is the sifting limit of a sieve of dimension κ ≥ 3,
> then β_κ > (2⌊κ − √κ⌋ + 1) / e^{1 + 1/√κ}."

Evaluated: `0.6196` at `κ = 3` (vacuous), `1.1157` at `κ = 4`, `1.1761` at
`κ = 5`, `1.7120` at `κ = 6`, `3.4859` at `κ = 10`. So a bound above 1 is in
print for every `κ ≥ 4`. **[PROVEN, read at the page; a deposited dissertation,
not a refereed journal paper, and the derivation was read but not re-derived
independently here.]**

**The mechanism, which is the part that matters for this programme.** Neither
bound is an exhibited arithmetic sequence. Both come from Selberg's **model
problem** (*Lectures* §13, described in Brady's §1.3), in which all sifting
primes are assumed the same size, so a sieve depends only on the number of
prime factors and the whole question collapses to: for which `v` does there
exist `λ_0 = 1, …, λ_R` with `θ(n) = Σ λ_i C(n,i) ≤ 0` at every positive
integer `n` and `Σ_n θ(n) v^n/n! > 0`? `v_R` is the largest such `v`. Brady's
Theorem 22, `v_R ≤ d + 2√d + 1` for `R = 2d+1`, is an upper bound on `v_R`, and
an upper bound on `v_R` is a lower bound on `β_κ`. **This is the LP/obstruction
route of §3 in a different notation, and it is why no `κ > 1` example exists
while `κ > 1` lower bounds do: at `κ > 1` the field bounds the sieve, not the
sequence.**

**Brady's reduction, evaluated at `κ = 2`, which he does not do.** His proof of
Corollary 3 runs: suppose `β_κ < 2d+3`; take `P` the primes between `y^{1/(2d+3)}`
and `y^{1/β_κ}`; then `v = Σ_{p∈P} κ/p = (κ+o(1))log((2d+3)/β_κ)`; the product of
any `2d+3` of them exceeds the level, so a nontrivial lower bound sieve forces
`κ·log((2d+3)/β_κ) ≤ v_{2d+2} = v_{2d+1}`. For each `d` this gives
`β_κ ≥ (2d+3)·exp(-v_{2d+1}/κ)` whether or not the supposition holds, since if
`β_κ ≥ 2d+3` the conclusion is stronger still. At `κ = 2`:

- `d = 0`, `v_1 ≤ 1` by his Theorem 22: `β_2 ≥ 3e^{-1/2} = 1.81959`.
- `d = 1`, `v_3 = 2` from his computed `v_R` table, printed p. 46:
  `β_2 ≥ 5/e = 1.83940`.
- `d = 2`, `v_5 = 3.11714` from the same table: `β_2 ≥ 1.4730`, worse.

The `d = 1` and `d = 2` values rest on a table Brady computes by his Algorithm 1
rather than on a theorem, so only the `d = 0` value `1.81959` rests on a proved
inequality (his Theorem 22 at `R = 1`).

**[DERIVED]**, one substitution from a printed proof, not reviewed. Corollary 3
is stated for `κ ≥ 3` only because its optimised `d = ⌊κ−√κ⌋−1` is negative at
`κ = 2`; the underlying inequality has no such restriction. Neither value
reaches 2, so **nothing in print, and nothing one step from print, enters the
band or even reaches its lower endpoint.**

**What is genuinely absent, now calibrated by a better source than our own
search.** No extremal example at any `κ > 1`. The best evidence for that is not
our negative but Halberstam's own, in his review of Greaves, *Bull. AMS* **40**
(2003) p. 116, read at the PDF text layer:

> "Concrete examples like Selberg's when κ = 1 and Iwaniec's when κ = ½ are not
> known and greatly to be desired."

**[PROVEN as a statement of the field's own state as of 2003; nothing located
after 2003 changes it.]** The DHR book states the `Ω(n) mod 2` example only in
its `κ = 1` chapter (p. 95, Google Books snippet), and its index lists "sieving
limit" at pp. 79, 135, 144, 226, 228 with no lower bound and no optimality claim
above `κ = 1`.

**Two published statements that look like lower bounds and are not.**
Grupp–Richert's `ν(κ) > 2κ + 1` for `κ ≥ 7/2` (zbMATH review) bounds the
**Ankeny–Onishi sieve's own** limit, and the DHR book's `α_κ > β_κ > 2` bounds
**its own** delay-differential parameters. Both say a particular method cannot
do better. Neither is a statement about the axiom class. The corpus already uses
`α_2 ≥ β_2 + 1` correctly in that method-specific sense
(`sift-limit-attack.md`, the fractional-retention entry) and must not promote it.

**Ford's notes, re-read for this question.** `sieve2023.pdf` from
`ford126.web.illinois.edu`, §3.1 p. 37, text layer and rendered page agreeing.
His Definition 2 gives the class-level `β(κ)` this note uses. His Table 1 is
captioned **"Known upper bounds on the sieving limit β(κ)"**, and the only lower
bound anywhere in the 129 pages is `β(1) ≥ 2`. He also prints "Selberg [137,
eq. (14.40)] showed that β(κ) ⩽ 2κ + 0.4454 for sufficiently large κ", a
constant the corpus does not carry: `sift-limit-attack.md` §2 quotes Franze's
`2κ + 19/36 = 2κ + 0.5278` for the same Selberg result. Both are at source; they
are not the same number and the corpus should carry both or neither.
**Ford does not say that no lower bound is known. He is silent, and the corpus
has been reading that silence as an absence.**

**One quotation correction owed to Franze.** `sift-limit-attack.md` §2 reports
Franze as recording "Selberg's asymptotic `β_κ ≲ 2κ + 19/36`, approached rapidly
from below: two independent technologies plateau near 2κ". Read at the arXiv
v1 PDF text layer and confirmed in the TeX source (`siftinglimitspaper.tex`,
the only version), Franze's line 73 is `\beta_\kappa \lesssim 2\kappa + 19/36`
and his "approached rapidly from below" refers to **his own Λ²Λ⁻ table**
approaching that asymptotic, not to the truth. His line 272 writes
`\beta_{\kappa}\gtrsim2u+1=2\kappa+\frac{19}{36}`, which contradicts his line 73
and his abstract and is an apparent typo for `\lesssim`; **it must not be
quoted as a lower bound.** Also at source, and not in the corpus: "The
calculations in Chapter 17 of [4] show that for the DHR sieves, `β_κ ≲ 2.44κ`."
The DHR table itself confirms the growth: `β_κ − 2κ` runs `0.266, 0.641, 1.072,
1.535, …, 6.453` at `κ = 2 … 15`, so the DHR values do **not** plateau near `2κ`
and the corpus's "two independent technologies plateau near 2κ" holds at small
`κ` only.

---

## 2. Sub-question 2: is `β(κ)` non-decreasing, and does that give `β(2) ≥ 2`?

**Not stated in any source read for this note.** Ford, Franze, Blight, Brady,
the DHR book and Halberstam's review all define `β` and none of the six asserts
monotonicity in `κ`. **[ABSENT in the six sources read; a weaker claim than
"absent from the literature", and it should be read as the reach of this
search.]**

**The argument, attempted here.** Take a dimension-`κ` sieve problem `A` with
level `y`, sifting parameter `z`, `s = log y/log z`, and normalised sifted
density `S(A,z)/(|A|V_κ(z)) → 0`. Take an auxiliary sequence `B` of dimension
`κ_B` with level at least `y`, and form the product sequence
`A' = {ab : a ∈ A, b ∈ B}` with multiplicity. Then:

1. **Dimension adds.** For squarefree `d`, `p | ab` iff `p | a` or `p | b`, so
   `ω'(p)/p = ω_A(p)/p + ω_B(p)/p − ω_A(p)ω_B(p)/p²`, giving
   `Σ_p ω'(p) log p / p = (κ + κ_B) log z + O(1)`. The one-sided `Ω(κ,L)`
   envelope follows from `ω'(p) ≤ ω_A(p) + ω_B(p)`.
2. **The sifted count multiplies.** `ab` is `z`-rough iff both `a` and `b` are,
   so `S(A',z) = S(A,z)·S(B,z)`, and since `V_{κ+κ_B} = V_κ V_{κ_B}` the
   normalised densities multiply. A factor tending to 0 times a factor bounded
   by 1 tends to 0.
3. **The level survives.** `|A'_d| = Σ` over the at most `3^{ν(d)}` ways of
   splitting `d` across the two factors, each term `|A_e||B_f|` with `ef | d`.
   So `Σ_{d ≤ y} 4^{ν(d)}|r'_d|` is controlled by the corresponding sums for
   `A` and `B` with a divisor-function weight, which the DHR Theorem 9.1
   remainder condition already carries.
4. **`s` is unchanged**, because `s = log y / log z` makes no reference to `|A|`.

So `β(κ + κ_B) ≥ β(κ)` whenever an auxiliary sequence of dimension `κ_B` with
level at least `y` exists, and `B = {m ≤ M}` with `M = y^{1+ε}` supplies
`κ_B = 1` with a trivial remainder. **Hence `β(κ+1) ≥ β(κ)` and in particular
`β(2) ≥ β(1) = 2`.** **[DERIVED. Unreviewed. Almost certainly folklore: the
construction is three lines and the padding idea is standard, so this must not
be recorded as new, only as located nowhere in the six sources read.]**

**Instantiated, so the hypotheses are visible.** Take `A⁺ = {n ≤ x : λ(n) = +1}`,
Ford §1.7.4 pp. 7–8: `X = x/2`, `g(d) = 1/d`, level `x^{1−o(1)}`, and
`S(A⁺, √x) = 1`. The level is not a Bombieri–Vinogradov statement: writing
`n = dm` gives `r_d = (λ(d)/2)L(x/d)` with `L` the Liouville summatory function,
and the prime number theorem for `λ` alone gives
`Σ_{d ≤ x^{1−ε}}|r_d| ≪ x/log^A x`. Pad with `B = {m ≤ x}`. Then `A'` has
dimension 2, level `x^{1−ε}`, `z = √x`, `u = 2 − 2ε`, and normalised sifted
density `≪ log z / x → 0`. So `β(2) ≥ 2`.

**Where it could fail, stated rather than hidden.** (a) The remainder bookkeeping
in step 3 is sketched, not written out; the `3^{ν(d)}` splitting count and the
cross terms `|A_e||B_f|` need the two remainder sums to be uniform in the
splitting, which is routine but is not checked here. (b) Some conventions tie
the level to `|A|` rather than to `z`; under such a convention padding dilutes
`θ` and the argument gives nothing. Ford's Definition 2 does not, and it is the
definition this note uses. (c) The conclusion is about the class-level `β(κ)`,
not about Brady's `inf{s : f_κ(s) > 0}`, which is a property of the DHR
delay-differential pair; the two share a symbol and are different objects.

**What it buys, which is little.** `β(2) ≥ 2` is the band's lower endpoint. It
says the Zone Postulate's target exponent of 2 sits **exactly at** the axiom
class's floor, so no axiom-only argument can go below 2, and an axiom-only
argument that reached 2 would be attaining the class limit exactly. It says
nothing about `(2, 4.26645]`.

---

## 3. Sub-question 3: the LP dual, written out, and its finite barrier

### 3.1 The primal, the dual, and what each one is

Fix sifting primes `p < z` with `ω(p)` residue classes removed per prime
(`κ = 2` interval problem: `ω(2) = 1`, `ω(p) = 2` for `2 < p < z`, the classes
being `0` and `−2`). For a sequence `A`, let `y_S` be the density of elements
whose prime support below `z` is exactly `S`. Then

- **primal:** `min y_∅` subject to `Σ_{S ⊇ T} y_S = g(T)` for every `T` with
  `∏T ≤ D`, and `y ≥ 0`, where `g(T) = ∏_{p ∈ T} ω(p)/p`.

`y` ranges over non-negative measures on divisor patterns that satisfy every
axiom the sieve can read at level `D`. **That is precisely the abstract extremal
problem the brief describes, and no integer set need realise it.**

- **dual:** `max Σ_{T : ∏T ≤ D} π_T g(T)` subject to `Σ_{T ⊆ S, ∏T ≤ D} π_T ≤ [S = ∅]`
  for every `S`.

Setting `λ_d = π_T` for `d = ∏T`, the dual constraint is exactly the minorant
condition `Σ_{d | n, d ≤ D} λ_d ≤ [n = 1]` and the dual objective is exactly the
main term `Σ_{d ≤ D} λ_d ω(d)/d`. **So the dual of the abstract extremal problem
is the general lower-bound sieve, with no restriction to `Λ²` form, to
combinatorial weights, or to any construction at all**, and strong duality says
the two values coincide: the best main term any level-`D` lower-bound sieve can
carry equals the least sifted density consistent with the level-`D` data. A
value of 0 is a barrier for the whole class; a positive value is a sieve.

This is not new and must not be presented as such: it is the linear-programming
formulation of the sieve, and Selberg's model problem of §1 is the same object
with all primes assumed the same size.

### 3.2 Has anyone computed it at `κ = 2`? Yes, in this corpus, and it was not recorded as a barrier

`research/attack-beta2-04-loss-budget.js` §7 and `research/lp-push-x43.js` solve
exactly this program at `κ = 1` and `κ = 2` out to `x = 43`, with duality gaps
to `3.7e-13`, and turn it into the DP1 line of `sift-limit-attack.md` §7d: the
calibrated one-point floor **3.3152**, individual readings **2.669 to 3.949**
(`lp-push-x43.md` §4). In the literature: nothing. `recon-0828-sieve.md` §2
searched zbMATH for *sifting limit best possible*, *lower bound for the sifting
limit* and *optimality of the combinatorial sieve* and found the only optimality
statement in print to be at `κ = 1`. This note adds Halberstam's 2003 review as
the authority for that, and Selberg's §17 and Brady's Corollaries as the
model-problem analogue of the LP at large `κ`.

**The point this section exists to make.** `paper/wall-note.md`:429 says "Inside
`(2, 4.2665]` there is still no barrier result." The corpus's own LP floor at
`3.3152` **is** a barrier statement inside the band, for exactly the class Face 4
names ("an axiom-only argument"), and `recon-0828-sieve.md` §5 already uses it as
one: "Any method reading only `|A_d|` is bounded below by the LP floor 3.3152".
Face 4 and that row disagree. The reconciliation is that one is a theorem-level
claim and the other is a finite-`x` measurement with a calibration, and Face 4's
sentence is true of theorems and silent about the measurement it should mention.

### 3.3 Pre-registration, sealed before the companion script was written

*(Written 2026-09-04 before `recon-0904-sifting-limit-floor.js` existed, and
placed in this note before the script was written. The script's own output is
embedded by `research/qc/embed.js`; the scoring sits in section 3.4.)*

The companion re-implements, in independent code, the level-`D` linear program
that `research/lp-push-x43.js` solves, and extends it along one axis that
program never ran: the dimension `kappa` itself.

- **P1, the control.** The independent solver reproduces the twelve published
  raw `s*` cells of `lp-push-x43.js` section 1 (`x = 7, 11, 13, 17, 19, 23` at
  `kappa = 1` and `kappa = 2`) to within `5e-4`, which is the printing
  precision there. A miss on any cell means my implementation, not theirs, and
  nothing below may be quoted.
- **P2, monotonicity at the LP level.** The raw threshold `s*(kappa)` is
  **strictly increasing** in `kappa` across `kappa in {0.5, 1, 1.5, 2, 3, 4}`
  at every `x in {11, 13, 17, 19, 23}`, with no exception. A single inversion
  is a finding against the LP analogue of "beta is non-decreasing in kappa" and
  must be reported as such.
- **P3, the hard consistency test, and the one that can refute the corpus's
  floor.** DHR's own sieve reads only divisor-class counts, so it lives inside
  the LP's information class, so the calibrated LP reading at any `kappa`
  **must not exceed** the DHR value `beta_kappa` at that `kappa`. Booker and
  Browning's rigorous table gives `beta_3 = 6.64085945080065843931` and
  `beta_4 = 9.07224868172113415960`. Forecast: the `beta_1 = 2` calibrated
  `s*`-route reading lands in `[4.5, 6.0]` at `kappa = 3` and in `[5.5, 8.0]`
  at `kappa = 4`, that is below the DHR value with margin at both. **If any
  calibrated reading exceeds the DHR value at its own `kappa`, the calibration
  that produces the 3.3152 floor is refuted and that floor may not be quoted
  again in this corpus.**
- **P4, the calibration reproduced.** The calibrated `kappa = 2` reading via
  `s*` at `x = 23` reproduces `lp-push-x43.md` section 3's `3.4889` to within
  `0.01`.


### 3.4 Scoring

Companion: `research/history/staging/recon-0904-sifting-limit-floor.js`, output
embedded by `research/qc/embed.js`, 458.4 s, 343 LP solves, worst primal
residual `1.51e-14`, zero solves failing to certify.

- **P1, the control: PASS.** All twelve published raw `s*` cells reproduced,
  worst disagreement `4.23e-5` against a printing precision of `1e-4`. The two
  solvers share no code.
- **P2, monotonicity in `κ`: PASS, 25 of 25 strict increases**, zero inversions,
  zero ties, across `κ = 0.5, 1, 1.5, 2, 3, 4` at `x = 11, 13, 17, 19, 23`.
  **[MEASURED]** at five small levels. It is the LP-class analogue of §2's
  derivation and it is not a proof of anything about `β`.
  *A first pass reported one inversion, `s*(1.5) = 6.1308` at `x = 23`. It was a
  solver failure silently read as a zero. The harness now retries under Bland's
  rule and reports failures; the embedded run has none. The first pass's number
  is recorded here because a defect found and fixed is part of the reading.*
- **P3, the calibration scored against DHR: PASS, and this is the load-bearing
  one.** 0 of 15 calibrated readings exceed the published `β_κ` at their own
  `κ`. Headroom ratio reading/DHR: `0.7442`–`0.8344` at `κ = 2`,
  `0.5813`–`0.7159` at `κ = 3`, `0.4844`–`0.6613` at `κ = 4`. The test could
  have refuted the 3.3152 floor outright and did not.
- **P4, the published cell: PASS.** `3.4889` at `x = 23` via `s*`, exactly.

**The disconfirming reading inside P3.** The ratio **falls** with `κ`. A floor
that tracked the truth would hold its ratio; one that drifts down with `κ` is
a floor that is loosening, which means the instrument is conservative and the
one-point limit could be higher than 3.3152, not lower. That direction is the
one that helps the corpus's inversion claim and hurts any hope of the band.

### 3.5 The barrier made explicit

At `x = 7`, `κ = 2`, level `D = 21`, `s = 1.5646`, the LP returns a
non-negative measure on ten divisor patterns, total mass `1.0000000000`,
matching every axiom the sieve can read at that level, with
`0.000000000000` on the empty pattern. One constraint higher the same program
returns `0.004761904762`. So at that level **no argument reading only the
divisor-class counts can prove a survivor exists**, and the certificate is a
ten-line table rather than an abstraction. **[VERIFIED]**, and it is a barrier
for the method at that finite level, not for the truth: `G₂(7#) = 30` is known
exactly and the phantom does not contradict it.

---

## 4. Sub-question 4: the best unconditional interval barrier

**Answer: nothing above `β_interval(2) ≥ 3e^{-1/2} = 1.81959`, and that number
is below 1 only in the sense that it is below 2 and therefore below the band.**

**The route the brief proposes, priced, and it lands at 1.** Take
`A = {n(n+2) : n ≤ x, λ(n) = +1}`. Two classes per prime, so `ω(p) = 2` and the
dimension is 2. Level: `#{n ≤ x : λ(n) = +1, n ≡ a mod d}` for `a ≠ 0` is a
Liouville-in-progressions count, and Bombieri–Vinogradov for `λ` gives level
`x^{1/2−ε}`, not more. Sifted count: a survivor needs `n` and `n+2` both
`z`-rough and `λ(n) = +1`, and a `z`-rough integer with `λ = +1` is `1` or
exceeds `z²`, so the set is empty once `z² ≥ x`, that is `u ≤ 2`. But
`s = log y / log z = u/2 < 1`. **So the construction gives `β(2) ≥ 1`, which is
trivial.** **[DERIVED]** The level is the binding constraint, and it is the same
constraint that made the corpus's "product example, half level"
(`sift-limit-attack.md` §2) land outside the operative regime.

**Why the `n ≡ 0` half is not the obstruction.** For `d | n` the count is
`#{m ≤ x/d : λ(m) = λ(d)}` and the prime number theorem for `λ` alone gives
level `x^{1−o(1)}`, as in §2. It is the second class, `n ≡ −2 mod p`, that needs
`λ` in a progression to a modulus coprime to `n`, and that is where
Bombieri–Vinogradov caps the level at `1/2`. **The two-class structure is
exactly what halves the level here**, which is a cleaner statement of the same
obstruction the corpus records at `sift-limit-attack.md` §2's mixed-sign sketch.

**What would lift it.** An Elliott–Halberstam-strength level for `λ` in
progressions, `x^{1−ε}`, would give `s = u < 2` and hence `β(2) ≥ 2`
unconditionally on intervals. Granville's exceptional character replaces `λ` by
a periodic `χ`, which is why `attack-barrier-kappa2.md` reaches `θ → 1` and
`β_interval(2) ≥ 2` under a Siegel-zero hypothesis. Neither is unconditional and
both stop at 2.

**The only unconditional interval barrier located is method-side, not
sequence-side.** Brady's model-problem reduction bounds any lower-bound sieve
regardless of which `A` it is applied to, so `β_interval(2) ≥ 3e^{-1/2}` holds
unconditionally with no distributional input at all. It is below 2 and therefore
below the band, and it is weaker than §2's padding derivation, which is
conditional on nothing but is unreviewed. **Neither reaches into `(2, 4.26645]`.**

---

## 5. Sub-question 5: the proposed SEARCH-CONVENTIONS row and the corrections

### 5.1 Proposed §1 row (text only, not applied)

| object | our name | canonical | **OWNING convention, search THIS** | where it lives |
|---|---|---|---|---|
| a floor on what any lower-bound sieve of dimension `κ` can do | "the barrier on Face 4", "is 4.2665 a method artefact" | lower bound on the sifting limit `β_κ` | **Selberg's RECIPROCAL convention `a_k = 1/β_κ`**, in which a lower bound on `β` is titled an **"upper bound for the sifting limit"**: search `a_k`, *"upper bounds for sifting limits"*, *"sifting density"*; and the mechanism convention **"Selberg's model problem"**, all sifting primes the same size, parameters `v = Σ_{p∈P} κ/p` and `R`, the quantity to search being **`v_R`**. NOT "extremal example", which at `κ > 1` does not exist and is a guaranteed clean negative | Selberg, *Lectures on Sieves*, Collected Papers II (Springer 1991) §§13, 14, 17; Brady, *Sieves and iteration rules*, Stanford PhD 2017, `purl.stanford.edu/gk881hk9239`, Thm 7 and Cor. 1 (p. 11), Thm 22 and Cor. 3 (p. 51), the `v_R` table (p. 46). Ford's 2023 notes Table 1 is captioned "**Known upper bounds**" and carries no lower bound. Method-specific limits that must NOT be counted: Grupp–Richert's `ν(κ) > 2κ+1` (Ankeny–Onishi's own), DHR's `α_κ > β_κ > 2` (its own DDE pair) |

A companion line for §3's table: the "`κ = 2` extremal example" row's "None
found" should gain its authority, Halberstam's *Bull. AMS* **40** (2003) p. 116.

### 5.2 Proposed corrections, listed, not applied

1. **`paper/wall-note.md`:422–429, Face 4.** Current: "no barrier theorem in the
   corpus or in print … **Inside (2, 4.2665] there is still no barrier result.**"
   Proposed insertion after that sentence: *"No barrier theorem. The corpus's own
   level-`D` LP does put a measured floor inside the band, at 3.3152 with
   individual readings 2.669 to 3.949 (`lp-push-x43.md` §4), and that floor is a
   statement about exactly this class, so the honest reading of the face is that
   the band is open to a theorem and already contested by a measurement."*
2. **`paper/wall-note.md`:419–421.** Current: "`β(κ) is unknown in all cases
   κ > 1/2 except κ = 1` … and no such lower bound is known." Proposed: *"…and no
   lower bound on `β(2)` above 2 is known. Lower bounds below 2 are in print:
   Selberg's *Lectures* §17 in his reciprocal convention, and Brady 2017 Cor. 1
   and Cor. 3, giving `β_2 ≥ 1.8394` when his reduction is evaluated at `κ = 2`.
   `β(2) ≥ 2` follows from monotonicity in `κ` by a padding argument
   (`recon-0904-sifting-limit-floor.md` §2), which is unreviewed and probably
   folklore."*
3. **`research/sift-limit-attack.md`:143.** The `[ABSENT — in sieve-theory
   vocabulary]` marker currently covers the whole object. Proposed: keep it for
   the **extremal example**, cite Halberstam 2003 as its authority, and remove it
   for **lower bounds on `β(κ)`**, which are in print under the reciprocal
   convention.
4. **`research/sift-limit-attack.md`:169.** "No published example blocks any
   exponent in (2, 4.2665]" is correct as written; propose adding *"and no
   published lower bound on `β(2)` reaches 2 either, the best located being
   1.8394"*, so the sentence stops being read as "nothing is known in that
   direction".
5. **`research/sift-limit-attack.md` §2, the Franze paragraph.** Add that
   Franze's "approached rapidly from below" describes his own Λ²Λ⁻ table, not the
   truth; that his line 272 `\gtrsim` contradicts his line 73 `\lesssim` and is an
   apparent typo; that his printed "`β_κ ≲ 2.44κ` for the DHR sieves" is the
   growth rate the corpus lacks; and that Ford's notes give the same Selberg
   asymptotic with the constant `0.4454` rather than `19/36 = 0.5278`.
6. **`research/history/staging/object-g2-read-0829.md`:532–534.** Same edit as
   item 2, since the paragraph reproduces Face 4 verbatim.
7. **`research/SEARCH-CONVENTIONS.md` §1.** Add the row in 5.1. §1 is parsed at
   run time by the `search-convention` check, so this is a live change to what
   clears the gate and should be reviewed as such.

---

## 6. Provenance

| source | what was read | how | what it carried |
|---|---|---|---|
| Booker–Browning ancillary `dhr.html`, arXiv:1511.00601v2/v3 | the `α`, `β` table, full | HTML text layer, `curl` with a browser user agent, and independently by a second fetcher | `β_2 = 4.26645028414864191641`, `β_3 = 6.64085945080065843931`, `β_4 = 9.07224868172113415960` |
| Franze, arXiv:1012.3809**v1** | introduction, §3, and the LaTeX source `siftinglimitspaper.tex` | PDF text layer via `pdftotext -layout`, plus the e-print source | `β_κ ≲ 2κ + 19/36` for Λ²Λ⁻; "for the DHR sieves, `β_κ ≲ 2.44κ`"; the `\gtrsim`/`\lesssim` contradiction; no lower bound anywhere |
| Brady, *Sieves and iteration rules*, Stanford 2017 | pp. 3, 11, 46, 51 and the model-problem chapter | PDF text layer of the Stanford Digital Repository deposit `druid:gk881hk9239`, and a second identical copy at `notzeb.com` | Cor. 1 `β_κ ≥ (1+o(1))2κ/e`; Cor. 3; Thm 22 `v_R ≤ d+2√d+1`; the computed `v_R` table (p. 46) `v_1 = 1`, `v_3 = 2`, `v_5 = 3.11714`; "It is currently not known whether there is any κ > 1 with β_κ < 2κ" |
| Ford, *Sieve Methods Lecture Notes*, `ford126.web.illinois.edu/sieve2023.pdf` | §1.7.4 pp. 7–8, §3.1 p. 37, §4.2 pp. 46–47 | PDF text layer and a rendered page image, agreeing | Definition 2 of `β(κ)`; Table 1 captioned "Known **upper** bounds"; `β(κ) ≤ 2κ + 0.4454`; the Liouville example at dimension 1 with level `x^{1−o(1)}` |
| Blight, Rutgers PhD 2010, RUcore 27420 | printed pp. 6–7, §2.6 pp. 28–29 | PDF text layer, page-isolated | "a lower bound sieve with a sieving limit of 2κ has not been found for κ > 1"; `β_κ ∼ cκ`, `c = 3.591…`; upper bounds only |
| Selberg, *Lectures on Sieves*, Collected Papers II | table of contents p. 65, §14 pp. 165, 179–180, §16 p. 183, §17 p. 201 | **Google Books OCR snippets only**, vol. id `JswcQj2B1HIC`; no page images; fraction bars lost in OCR | §17's title; `a_k = 1/β_κ`; `β_κ = 2κ` as a **conjecture** he himself doubted for large `κ`; §16's examples scoped to `k = 1/2` and `k = 1`; `a_k < e^{1−1/k}/k` |
| Halberstam, review of Greaves, *Bull. AMS* **40** (2003) | p. 116 | PDF text layer, `curl` with a browser user agent after a 403 to a plain fetch | "Concrete examples like Selberg's when κ = 1 and Iwaniec's when κ = ½ are not known and greatly to be desired" |
| Diamond–Halberstam(–Galway), *A Higher-Dimensional Sieve Method* | pp. 79, 95, 228, index p. 266 | Google Books snippets, vol. id `vnG0S7jMjeYC` | the p. 79 "trivial lower bound" sentence verified verbatim; the `Ω(n) mod 2` example stated in the `κ = 1` chapter only |
| Halberstam–Richert, *Sieve Methods*, Dover reprint | pp. 238–239, 269 | Google Books snippets, vol. id `keKvAAAAQBAJ` | the corpus's p. 239 citation sits in the Notes to Ch. 8, "The linear sieve", i.e. `κ = 1`; p. 269 "When κ > 1 we have at our disposal no result that compares in quality with the main results of Chapter 8" |
| Grupp–Richert, *Analysis* **8** (1988) 1–23 | zbMATH review abstract only | zbMATH open API | `ν(κ) > 2κ + 1` for `κ ≥ 7/2`, for the **Ankeny–Onishi** sieve |
| `research/lp-push-x43.js`, `lp-push-x43.md` | §§0–4 and the embedded output block | in-repo, read | the twelve control cells; the pooled floor 3.3152; readings 2.669–3.949 |

**Channels that failed, exactly.** Selberg's *Collected Papers* Vol. II full
text was not reached: `publications.ias.edu/selberg` returns 403 to both a plain
fetch and `curl` with a desktop Chrome user agent; archive.org's
`collectedpapers0001selb` is Vol. 1 and lending-restricted; Google Books
`VgzmnQEACAAJ` (ISBN 9783642410222) has no preview. The working channel was ISBN
9783540506263, snippet view with search-inside. **Every Selberg quotation in this
note is an OCR snippet and none is a page image.** Halberstam–Richert p. 239
itself was not surfaced: the archive.org item `sievemethods0000halb` is
lending-restricted and its search-inside endpoint answered 403; about eighteen
targeted phrase queries against the Dover volume on Google Books did not reach
the page. The Google Books JSON API answers 429 with `quota_limit_value 0`
without a key; the `books.google.dk/books?jscmd=SearchWithinVolume` endpoint
works. arXiv's API searches titles and abstracts only, and `all:"sifting limit"`
returns exactly one paper, Franze.

---

## 7. What this note contradicts in the live layer

1. **`research/sift-limit-attack.md`:143**, the marker `[ABSENT — in sieve-theory
   vocabulary, which is where this object lives]`. **Contradicted for lower
   bounds.** Selberg's *Lectures* §17 and Brady's Corollaries 1 and 3 are lower
   bounds on `β_κ` at `κ > 1`, in print. The absence survives for the extremal
   example only. The search that produced the `[ABSENT]` did read Selberg
   "through Franze's account" and did read Brady, so this is not a reach failure
   but a convention failure and a page failure: Brady p. 11 and p. 51 were never
   opened, though pp. 1, 3, 12 and 133 were.
2. **`research/SEARCH-CONVENTIONS.md`:162**. The row's answer, "None found. The
   band is a proof gap, not a truth gap", is right about the example and about
   the band, and its "what was actually searched" column lists Brady 2017. It
   should record that Brady contains a lower bound and that the searched
   vocabulary was ours, not Selberg's.
3. **`paper/wall-note.md`:429**, the sentence "Inside (2, 4.2665] there is still no barrier
   result." **In tension with `recon-0828-sieve.md` §5's last table row**, which
   uses the corpus's own LP floor of 3.3152 as a barrier for exactly this class.
   Both can stand only if "barrier result" is read as "theorem"; the sentence
   should say so and should name the measurement.
4. **`research/history/staging/object-g2-read-0829.md`:532–534** reproduces
   Face 4's sentence and inherits both issues.
5. **`research/sift-limit-attack.md` §2, the Franze paragraph.** "Two independent
   technologies plateau near 2κ, the community's implicit guess for the
   axiom-class truth at integer κ" is `[INFERRED]` and is now contradicted by the
   DHR table itself: `β_κ − 2κ` grows without bound over `κ = 2 … 15`, and
   Franze's own printed reading of Chapter 17 is `β_κ ≲ 2.44κ`. The plateau
   holds at small `κ` and the inference does not generalise.
6. **`research/THE-DIALS.md`:276–279.** The table's `sieve limit β_κ` column
   prints `2` and `4.2665` without saying that the first is a proven two-sided
   value and the second an upper bound only. A footnote is owed.

Nothing in this note contradicts `README.md` §Status or `research/G2-STATE.md`
§0, which were re-read and which do not speak to this face.

---

## 8. What would falsify this note

1. **A published extremal example at `κ = 2`.** It would turn the band from a
   proof gap into a truth gap and would falsify §1's absence. The check that ran
   is Halberstam's 2003 review plus the four theses and note sets of §6; the
   check that has **not** run is the post-2003 literature searched in the
   reciprocal convention, and Selberg's *Lectures* at anything better than OCR
   snippets.
2. **The Selberg §17 constant being different from `e^{1−1/k}/k`.** Every
   Selberg quotation here is an OCR snippet with the fraction bars lost. The
   direction and scope are corroborated by Brady's sentence; the constant is not.
   A page image of *Lectures* pp. 199–203 settles it and was not obtained.
3. **An error in the padding argument of §2.** The remainder bookkeeping in step
   3 is sketched. If the `3^{ν(d)}` splitting cannot be absorbed uniformly, or if
   the intended convention ties the level to `|A|`, `β(2) ≥ 2` falls back to the
   `1.8394` that rests on Brady. Nobody has reviewed step 3.
4. **The `κ = 2` evaluation of Brady's reduction being outside its hypotheses.**
   His Corollary 3 is stated for `κ ≥ 3`. This note re-runs his own displayed
   chain at `d = 0` and `d = 1`, which requires `v_2 = v_1` and `v_4 = v_3`, an
   identity he asserts inside the proof and this note does not verify.
5. **The LP calibration failing at a `κ` not tested.** P3 passed at `κ = 3` and
   `κ = 4` at `x ≤ 23`. It has not been run at `κ = 5` or above, where the DHR
   values are larger and the primorial gives the LP less room, nor at `x` beyond
   23 where the corpus's own solver reaches 43. A calibrated reading above
   `β_κ` at any `(x, κ)` refutes the 3.3152 floor.
6. **The falling headroom ratio in P3 turning out to be a finite-`x` artefact.**
   If it is, the `κ`-dependence of the calibration is not evidence about the
   floor's tightness in either direction and §3.4's disconfirming reading is
   void.
