# Import row 15, proof complexity: the collision is on the word "parity", the barrier Face 4 wants does not exist in any convention, and Tao 2014 is now read

<!-- ledger
id: Q-import-proof-complexity
status: CLOSED
todo: none
question: Does proof complexity supply the barrier that wall-note Face 4 wants?
verdict: The row is VOCABULARY-ONLY and is recommended for rejection at the gate: the shared word is parity naming two different objects, a degree bound is a pseudo-expectation whose finite exact instance the corpus already refuted, and any unconditional barrier would imply Siegel-zero finiteness; the payoff is Tao and Brady 2014 read at source as a published anchor and a wall address, not a theorem.
-->

*(2026-08-27. Staging note. Nothing here is integrated into a live document and
**no existing repo file was edited, moved or deleted**. No git command was run.
No producer was written to `research/` and none was embedded, so **every number
below is either quoted from an artifact fetched at source this session (with its
sha256 recorded in §1.3), quoted from a repo document under its own custody, or
a count produced by `grep` on a fetched artifact in the session scratchpad**.
Counts of the third kind are marked `[SCRATCHPAD-GRADE]` per the
`attack-lichtman-decomp.md` / `quadpoint-prior-art.md` §2.2 precedent: they live
in the session scratchpad, are not embedded, are not `qc`-gated, and are not
repo numbers. Nothing here may be quoted outside this file until it is
re-derived inside an embedded producer.*

*Calibration legend as in `research/sift-limit-attack.md`: **[PROVEN]**
published theorem with source; **[VERIFIED]** checked computationally in this
repository, under an existing embed; **[MEASURED]** empirical, finite range;
**[ABSENT]** searched and found nothing, with the channel and a same-session
calibration probe named; **[INFERRED]** our deduction from sourced facts.
Provenance legend as in `research/IMPORT-MAP.md` §0: **[SOURCED]** statement
read at source this pass; **[SOURCED-BIB]** bibliographic record verified,
statement not opened; **[MEMORY]** not reached at any source this pass.)*

**My numeric confidence, at the top, as the brief requires.**

| question | my number | basis |
|---|---|---|
| the grade VOCABULARY-ONLY survives an adversarial pass | **0.85** | four independent structural failures, §2; one of them is a measured disconfirmation already in the corpus |
| this field ever yields the corpus a THEOREM or DERIVED-CONSTANT | **0.03** | no named theorem in the field has a hypothesis our object satisfies, §2.5; the field's own survey has zero number-theoretic content, §1.3 |
| Face 4's *old* sentence was wrong as written | **0.97** | it was a lower-bound claim with no lower-bound source, contradicting `sift-limit-attack.md` §2's sourced Ford quote. **It has already been replaced, today, by a sibling agent in this wave; see §4.0.** My §4.2 text is now an offered supplement, not a replacement |
| **no** unconditional parity barrier theorem exists in print for twins | **0.93** | three calibrated channels, §1.3; and §3.2 gives a reason one cannot exist without first eliminating Siegel zeros |
| the Tao–Brady 2014 reading in §3 is faithful to the post | **0.97** | fetched at 200, sha256 recorded, quoted verbatim |

---

## 0. The verdict, disconfirming half first

**The row is VOCABULARY-ONLY and I recommend it be rejected at the gate, before
any experiment. It joins the twelve in `import-map-construction.md` §1.** (Not
"as the thirteenth": `history/staging/import-transference.md` from this same
wave also grades VOCABULARY-ONLY, so the integrator counts, not this note.)
The brief anticipated the failure mode correctly and it is worse
than the brief guessed: it is not only that the instance families do not match,
it is that **the word "parity" names two unrelated objects on the two sides**,
and that is the entire apparent fit.

Five things that do not hold, in the order they kill the row.

1. **"Parity" in proof complexity is the MOD-2 counting principle, not the
   Liouville function.** Grigoriev's linear degree lower bound, the single
   result the brief names as the field's flagship for this shape, is a bound on
   Positivstellensatz-calculus refutations of *the parity principle*: that a
   complete graph on an odd number of vertices has no perfect matching
   (Grigoriev, *Theoretical Computer Science* **259** (2001) 613–622, DOI
   `10.1016/s0304-3975(00)00157-2` **[SOURCED-BIB]**, Crossref record verified
   this session). The sieve's parity problem is about the sign of `λ(n)`, that
   is `Ω(n) mod 2` on *the integers being sifted*. The two share the syllable
   and nothing else: one is a counting principle over a finite hypergraph, the
   other is a multiplicative arithmetic function. **A row built on that
   coincidence is the `SEARCH-CONVENTIONS.md` failure mode inverted — not a
   negative in the wrong vocabulary, but a positive in the wrong vocabulary.**

2. **The parity obstruction is not a degree lower bound and cannot be made
   into one.** Read at source this session (§3): Tao and Brady's reweighting
   `w(n) = 1 + Q(λ(L_1(n)), …, λ(L_k(n)))` defeats the sieve at *every* choice
   of sieve weight `ν`, at every Bonferroni depth, at every level, and for
   every admissible arithmetic input `f`. It bounds no complexity measure. In
   proof-complexity vocabulary it is not a lower bound at all: it is the
   observation that **the axiom set has a second model**, which is an
   independence statement relative to a theory, not a degree or size bound. The
   two technologies produce different kinds of object and the field's
   technology bounds the wrong one.

3. **A degree lower bound would be vacuous here even if it existed, because the
   proof system does not contain the proofs we care about.** SoS over `{0,1}^n`
   is refutationally complete at degree `≈ n` (Fleming–Kothari–Pitassi 2019
   §3.2.3, read at source, §1.3). A finite instance of our object — the tile at
   level `x` — is *decided* by full enumeration, so a certificate exists at full
   degree and any lower bound is confined to `d ≪ n`. Meanwhile the argument
   Face 4 actually needs to bar, the DHR `β`-sieve, is a continuous
   optimisation over differential-difference functions with no bounded-degree
   representation over any finite variable set at all. **Barring low-degree SoS
   would bar nothing anyone is doing.**

4. **The corpus already ran the two-model construction on finite grids one day
   ago, and it FAILED.** `history/staging/attack-parity-adversary.md`
   (2026-08-26, producer `research/attack-parity-adversary-01.js`, embedded)
   built exactly the object a degree lower bound is proved with: a non-negative
   measure matching the true count in every sieve-accessible statistic to level
   `D` and giving twins zero mass. **It does not exist.** The killing level has
   `ln D*/ln Q = 1.181` mean over 43 anchors `Q ≤ 200`, and `D*/width = 0.321`,
   so the pseudo-expectation dies *inside* the interval's own length
   **[VERIFIED, that note's embed]**. The barrier is not in the degree and not
   in the information; it is in the remainder, priced at `0.3018` of one count
   per modulus against a sieve remainder running `5.3×` to `30.4×` that budget.
   That is a direct measured disconfirmation of this row's premise, produced
   inside this corpus, before the row was proposed.

5. **The corpus already owns the one genuine degree lower bound in this
   territory, and it owns it in a strictly better convention.** THEOREM A of
   `history/staging/attack-bonferroni-degree.md` §5.2 proves
   `k* ≥ (θ(x) − O(1)) / (log G₂(x#) + O(1))`, hence `k* ≥ (1+o(1))·x/(B log x)`
   under any polynomial `G₂(x#) = O(x^B)` **[VERIFIED]**. That is a degree lower
   bound for a degree-`k` nonnegativity certificate, which is what a
   Positivstellensatz degree lower bound is. But the certificate lives in **one**
   variable on a finite interval, where nonnegativity and sum-of-squares
   coincide by Markov–Lukács, so the SoS degree and the plain degree are equal
   and the field has no gap to exploit. The corpus's own notes already name that
   convention correctly (`attack-multiplicity3.md` §4: "the Markov–Lukács form
   makes the optimum exact and computable as a Christoffel function"). Importing
   proof complexity here would replace a sharp classical tool with a coarser
   modern one.

**What the row is nonetheless worth, and it is not nothing.** Three things
banked, none of them the priced payoff:

- **Tao and Brady's 2014 formalisation of the parity obstruction is now READ AT
  SOURCE** (§3). It had returned HTTP 403 twice to this corpus and returned 403
  to `WebFetch` again this session; a plain `curl` with a browser user-agent
  returns 200 (§1.3). The post is the closest thing in print to what Face 4
  wants, and it is explicitly not a theorem. **Credit where it is due: a sibling
  agent in this same wave reached the same artifact independently
  (`history/staging/lit-tao-parity.md`, 08:12 today) and records the identical
  sha256 `7867a797…ded27e`. That is a two-agent custody match on the same bytes,
  which is worth more than either read alone. Its §4 also drafts Face 4 text;
  whoever integrates should read the two together and not twice.**
- **A `SEARCH-CONVENTIONS.md` §1 row for the parity obstruction**, which
  `attack-parity-adversary.md` §5 records as OWED and never run. Drafted in §6.
- **The Face 4 correction the brief asked for had already landed** from another
  agent an hour before this note was written (§4.0), which downgrades that
  deliverable from "the priority correction" to "an independent arrival plus two
  additions" (§5 C1). Recorded rather than quietly dropped, because the arrival
  is itself the confirmation.
- **A mirrored circularity finding** (§3.2): any *unconditional* parity barrier
  for twins implies that Siegel zeros are finite in number, because Heath-Brown's
  sieve-theoretic argument proves TPC when they are not. So the barrier Face 4
  asks for is not merely missing; it is at least as hard as a named open problem
  in the same field. **[INFERRED, from Tao 2014's own remark read at source]**

**Nothing moved on the exponent. Nothing moved on the conjecture. No producer
was written and no repo number changed.**

---

## 1. The grade

### 1.1 The three gate verdicts

| gate | verdict | one clause |
|---|---|---|
| **structural fit** | **VOCABULARY-ONLY** | the shared word is "parity" and it names the MOD-2 counting principle on one side and `Ω(n) mod 2` on the other; no named theorem of the field has a hypothesis our object satisfies |
| **circularity** | **TPC-STRENGTH, mirrored** | not "the hypothesis implies TPC" but "the conclusion implies a comparably open theorem": an unconditional barrier implies Siegel-zero finiteness (§3.2) |
| **payoff, realised** | **PUBLISHED-ANCHOR + WALL-ADDRESS**, priced as neither THEOREM nor CLOSURE-of-a-family | Tao 2014 at source; the owed convention row; the mirrored circularity |

**The theorem that would have been imported, named as the map's regrade rule
requires.** Grigoriev's degree lower bound in the form Fleming–Kothari–Pitassi
survey it: *for a set `P` of polynomial inequalities over `{0,1}^n`, there is a
degree-`2d` SoS refutation of `P` if and only if there is no degree-`2d`
pseudo-expectation for `P`* (FKP 2019 Theorem 3.60, p. 89, read at source,
verbatim in §2.2), instantiated at the parity principle to give `d = Ω(n)`
(Grigoriev 2001). **Re-entry cost, per `IMPORT-MAP.md` §0a: a statement of the
form "the sieve's certificate at Bonferroni depth `J` IS a degree-`J` refutation
of an explicitly written finite system `P_x`, and the parity obstruction IS a
degree-`d(x)` pseudo-expectation for `P_x`, here it is." Neither half exists,
and §2.3 argues the second half cannot.**

### 1.2 How the circularity check runs differently for a negative result, since the brief asks

The map's check asks *does the import's needed hypothesis, written honestly,
imply the Zone Postulate?* For a barrier the import needs no hypothesis about
the primes at all, so the check as written returns CLEAN and is uninformative.
The correct mirror, and it is new to the map, is:

> **For a NEGATIVE result, run the check on the CONCLUSION, not the hypothesis:
> does the barrier, written honestly, imply a statement of TPC-comparable
> difficulty?**

Here it does, and by a short argument (§3.2). The general rule is worth keeping,
because a barrier theorem is exactly as strong as the class of proofs it
excludes, and if that class contains a known conditional proof of the target
then the barrier inherits the difficulty of refuting the condition. **A barrier
that excludes nothing anyone can do is worthless; a barrier that excludes what
people can do is at least as hard as the thing they cannot do.** That dilemma is
this row's real content and it applies beyond proof complexity.

### 1.3 Channels, calibration, and custody

**Artifacts fetched at source this session, in the session scratchpad, sha256
recorded.**

| artifact | sha256 | how |
|---|---|---|
| Tao, *A general parity problem obstruction*, terrytao.wordpress.com, 2014-11-21, full page | `7867a797ee33d1a5d370f2263a076f03718f32da8bdfaaad7a143cc4c6ded27e` | `curl` with browser UA, HTTP 200, 295,372 bytes. **`WebFetch` returned 403 on the same URL in the same session**, which reproduces the corpus's two earlier 403s and identifies the cause as user-agent filtering, not access control |
| Fleming–Kothari–Pitassi, *Semialgebraic Proofs and Efficient Algorithm Design*, ECCC TR19-106, 221 pp. | `e15b5e455bc278434a5e93badd68f43112a5fb3eb53272f976fd4c98799f5dfd` | `curl`, HTTP 200, 1,466,355 bytes, `pdftotext -layout` |

**Bibliographic records verified on the Crossref API this session
[SOURCED-BIB], statements not opened except where §2 says otherwise.**

| item | record |
|---|---|
| Grigoriev, *Linear lower bound on degrees of Positivstellensatz calculus proofs for the parity* | *Theor. Comput. Sci.* **259** (2001) 613–622, DOI `10.1016/s0304-3975(00)00157-2` |
| Grigoriev, *Complexity of Positivstellensatz proofs for the knapsack* | *Comput. Complexity* **10** (2001) 139–154, DOI `10.1007/s00037-001-8192-0` |
| Buss–Impagliazzo–Krajíček–Pudlák–Razborov–Sgall | *Comput. Complexity* **6** (1996) 256–298, DOI `10.1007/bf01294258` |
| Schoenebeck, *Linear Level Lasserre Lower Bounds for Certain k-CSPs* | FOCS 2008, 593–602, DOI `10.1109/focs.2008.74` |
| Barak–Brandão–Harrow–Kelner–Steurer–Zhou | STOC 2012, 307–326, DOI `10.1145/2213977.2214006` |
| Fleming–Kothari–Pitassi | *Found. Trends Theor. Comput. Sci.* **14** (2019) 1–221, DOI `10.1561/0400000086` |
| Heath-Brown, *Prime Twins and Siegel Zeros* | *Proc. LMS* **s3-47** (1983) 193–224, DOI `10.1112/plms/s3-47.2.193` |
| Paris–Wilkie–Woods, *Provability of the pigeonhole principle and the existence of infinitely many primes* | *J. Symbolic Logic* **53** (1988) 1235–1244 — **[SOURCED-BIB via WebSearch only; Cambridge Core record not opened]** |

**The decisive internal negative: the field's own survey has no number theory in
it.** Full-text `grep` on the extracted FKP 2019 text, all case-insensitive,
`[SCRATCHPAD-GRADE]`:

| term | occurrences in 221 pages |
|---|---|
| `sieve` | **0** |
| `number theory` | **0** |
| `Liouville` | **0** |
| `Möbius` / `Mobius` | **0** / **0** |
| `arithmetic progression` | **0** |
| `twin` | **0** |
| `prime` | **3**, and all three are non-instances: "Proof Complexity **Primer**" twice (ToC and §1.1 heading) and one bibliography entry title about polynomial calculus modulo distinct primes |

**External channels, each with a same-pass calibration probe, per
`SEARCH-CONVENTIONS.md` §6.**

- **OpenAlex works API, `title_and_abstract.search`, conjunctive (comma) form.**
  Calibration, same pass: `"sum of squares"` + `"lower bound"` → 381;
  `"sieve"` + `"twin primes"` → 913; `"proof complexity"` → 969;
  `"parity problem"` → 779. PASS.
  Targets: **`"proof complexity"` + `"sieve"` → 0**;
  **`"Nullstellensatz"` + `"sieve"` → 0**; `"Positivstellensatz"` + `"prime"` → 4,
  every one a real-algebra or proof-complexity paper with no number theory
  (*Maximal Quadratic Modules on ∗-rings*; *The Surprising Power of Constant
  Depth Algebraic Proofs*; *Orderings on noncommutative rings*; *Real Algebra*);
  `"sieve axioms"` → 3, all three records of one 2026 preprint on quartic
  factorisations in `Z[i]`, unrelated.
  **Recorded gotcha for the next wave, because it produced four false zeros
  before it was caught: OpenAlex does NOT accept `filter=a:"x" AND a:"y"`.**
  That form silently returns 0 — it returned 0 on the calibration probe
  `"sum of squares"` AND `"lower bound"`, which is how it was caught. The
  conjunctive form is the comma: `filter=a:"x",a:"y"`.
- **zbMATH open API.** Calibration, same pass: `sifting limit sieve` → 7,
  including Franze's *Sifting limits for the Λ²Λ⁻ sieve*, which the corpus
  already holds; `sum of squares proof complexity` → 112, including FKP 2019.
  PASS. Targets, and per the corpus's own recorded gotcha a 404 there is a
  negative and not a broken channel: **`Positivstellensatz sieve` → 0**;
  **`sum of squares degree lower bound prime numbers` → 0**;
  **`parity problem sieve degree lower bound` → 0**;
  **`sieve axioms proof system` → 0**. `proof complexity sieve theory` → 15,
  every retrieved hit a computational-number-theory or cryptography record
  (the top hit is a 1972 note on *proving* a program that implements the sieve
  of Eratosthenes), none a proof system for sieve arguments.
- **arXiv Atom API: CHANNEL FAILED, and no negative from it is counted.** The
  calibration probe `all:electron` returned 0 entries on the first pass and the
  host then returned HTTP 429 for the rest of the session; a background retry
  loop with backoff produced no output in roughly fifteen minutes. Per
  `SEARCH-CONVENTIONS.md` §2, a day on which calibration fails voids that day's
  negatives on that channel. **Owed to a future wave: the arXiv sweep, which is
  the one channel where a recent unindexed preprint would show up.**

**So the absence claim I am willing to sign, and its exact scope.** [ABSENT] for
*a formalisation of sieve theory as a proof system with a degree or size
measure*, and [ABSENT] for *any degree or size lower bound in an algebraic or
semialgebraic proof system whose instance is a number-theoretic sifting
statement* — searched on OpenAlex and zbMATH in the owning convention (proof
complexity's own words: Positivstellensatz, Nullstellensatz, sum-of-squares,
degree lower bound, proof complexity), both calibrated in-pass, plus the field's
221-page survey read in full text. **NOT [ABSENT] on arXiv**, which failed
calibration. **NOT [ABSENT] for the parity obstruction itself**, which is
present in print and is §3.

---

## 2. The working: four structural failures, each independent

### 2.1 The "parity" collision, stated precisely

Grigoriev's theorem bounds the degree of Positivstellensatz-calculus refutations
of `MOD_2`: encode "the complete graph on `2n+1` vertices has a perfect
matching" as polynomial equations in edge indicators, and the theorem is that
any refutation needs degree `Ω(n)`. The variables are edges; the counting is
mod 2; the obstruction is that a fractional matching exists.

The sieve's parity problem is Selberg's: a sieve given only the divisor-class
counts `|A_d|` cannot separate `{n : λ(n) = +1}` from `{n : λ(n) = −1}`. The
variables are integers; the "parity" is `Ω(n) mod 2`; the obstruction is that the
Liouville function is equidistributed against every divisor sum.

There is no map between these. **The corpus was burned by exactly this class of
merge one day ago**: `attack-lichtman-decomp.md` §0 item 3 found that
`β₂ = 4.26645` and Lichtman's `3.29956` "share no ingredient" and "must never be
added, ratioed, or traded against each other". This is the same error one level
up, on a word instead of a number, and it is the reason the row must be graded
before it is run.

### 2.2 The measure is wrong: degree bounds a thing the obstruction does not touch

FKP 2019 §3.2.3, read at source. The setting is fixed: variables `x_1, …, x_n`
with the Boolean axioms `x_i² − x_i = 0`, a finite set `P` of polynomial
inequalities, and

> **Definition 3.55 (Sum-of-Squares Refutation)** (p. 85, verbatim). *A degree
> `d` SoS refutation of a set of polynomial inequalities `P` is a degree `d`
> derivation of the constant `−1` from `P`.*

with the survey's own statement of why degree is the measure (p. 85, verbatim):
*"Because the connection between the proof system and hierarchy perspectives of
SoS is parameterized only by the degree of the polynomials involved, the degree
is the primary measure of complexity studied for SoS."* And the duality that is
the lower-bound method:

> **Theorem 3.60 (Soundness and Refutational Completeness of SoS)** (p. 89,
> verbatim). *Let `P` be a set of polynomial inequalities. There exists a degree
> `2d` SoS refutation of `P` if and only if the following equivalent conditions
> hold: 1. The level `d` SoS spectahedron `SOS_d(P)` is empty. 2. There is no
> degree `2d` pseudo-expectation for `P`.*

Three consequences, and each is fatal on its own.

**(a) Completeness at full degree.** The survey states in the same section that
level `n + deg(P)/2` suffices. So over `n` variables every true statement has a
certificate at degree `≈ n`, and "degree lower bound" always means `d ≪ n`. The
parity obstruction blocks at every degree including full degree. **A statement
that holds at all degrees is not a degree lower bound in a complete system; it
is a statement that the system is the wrong system.**

**(b) The axiom set must be fixed and finite. Ours cannot be.** Tao 2014, read
at source, is explicit that the "sieve axioms" are the available asymptotics for
`Σ_n ν(n)`, `Σ_n ν(n) 1_{L_i(n) prime}` and `Σ_n ν(n) f(L_i(n))`, and equally
explicit that he cannot pin `f` down: *"we will be a bit vague about what this
means precisely"* (verbatim). More damagingly he names the escape hatch:

> *"The obstruction also does not prevent the establishment of an `n` such that
> `P(L_1(n),…,L_k(n))` holds by introducing additional sieve axioms beyond upper
> and lower bounds on quantities such as (1), (2), (3). The proof of the
> Friedlander-Iwaniec theorem is a good example of this latter scenario."*
> (verbatim)

An axiom set that grows whenever somebody proves a new estimate is not a proof
system. Any formalisation has to *choose* the axiom set, and every barrier
proved afterwards is a theorem about the choice. That is why the 2014 statement
is a Claim and not a Theorem, and no amount of proof-complexity technique
changes it.

**(c) The proofs Face 4 needs barred are not in the system.** Our published
exponent comes from the DHR `β`-sieve, an optimisation over solutions of
differential-difference equations at dimension `κ = 2`. It has no bounded-degree
representation over any finite Boolean variable set. `sift-limit-attack.md`'s
five discard points are analytic reductions, not polynomial derivations. **A
degree lower bound in a system that excludes the `β`-sieve bars nothing that is
being done.**

### 2.3 The instance-family mismatch, in the sharper form

The brief's anticipated killer is right and admits a sharper statement.

The corpus has exactly one object with a genuine finite search space over which
a refutation could be graded: `G₂(x#) ≤ L`, quantified over the adversary's free
translate `a_p ∈ Z/p` per prime `p ≤ x`. Written as a polynomial system over
`Π_p Z/p`, "the classes `{a_p, a_p − 2}` cover `[1, L]`" is a covering CSP, and
its refutation degree is a well-posed proof-complexity question. That is the
best available fit and it is not enough, for two reasons:

1. **The lower-bound technology does not apply to a deterministic arithmetic
   instance.** Every SoS degree lower bound the brief names — Grigoriev on
   parity and knapsack, Schoenebeck on `k`-CSPs, BBHKSZ — proves its bound by
   constructing a pseudo-expectation from a *distribution* over instances, with
   pairwise or `t`-wise independence and a symmetry group doing the work.
   `IMPORT-MAP.md` rows 3, 4 and 10 all closed in this corpus on the *same*
   mechanism from the other side: the moiré object's events all depend on **one
   shared uniform residue draw**, so product-space hypotheses are void here
   (row 4's cell: *"both objects share ONE uniform residue draw … the same
   product-space hypothesis that closed rows 3/10"*). **The pseudo-calibration
   machinery is a product-space method and dies on the same rock. This is the
   fourth arrival of that mechanism, and it is why the closure is by mechanism
   and not by search.**
2. **A refutation-degree bound for the covering CSP is not the exponent.** The
   exponent is asymptotic in `x`; a degree bound at each `x` is a per-level
   fact. `REFUTED.md` row 42 (exact-strata re-insertion) and
   `attack-multiplicity3.md` §3's own flag name this class exactly: *"a finite
   theorem at every level, a growing depth, no uniform statement"*. A
   proof-complexity row would land in that class, which is already closed.

### 2.4 The corpus's own experiment already refuted the premise

This is the strongest single argument and it costs nothing to state, because the
work is done and embedded.

A degree lower bound *is* a pseudo-expectation (FKP Thm 3.60(2)). The finite,
exact-count instance of that object for our problem was built and solved on
2026-08-26 in `attack-parity-adversary.md`, whose §0 reads, of its own plan to
build a non-negative measure matching every sieve-accessible statistic to level
`y` and giving twins zero mass: *"On our own finite grids that measure does not
exist."* **[VERIFIED, that note's embed]** The numbers:

| quantity | value | scope |
|---|---|---|
| mean `ln D*/ln Q` (the level at which the adversary dies) | **1.181** | 43 anchors, `Q ≤ 200`, min 0.812, max 1.439 |
| mean `D*/width` | **0.321** | the pseudo-expectation dies *inside* the interval's own length |
| level-`D = Q²` data determines the twin count exactly | **42 of 43** anchors | — |
| `θ_min`, the per-modulus tolerance that destroys the certificate | **0.3018** of one count | mean over `Q ≥ 79` |
| the worst-case remainder a level-`Q²` sieve must survive | **5.3× T** at `Q = 23` to **20.8× T** at `Q = 149`, max 30.4 | 27 anchors, growing in `Q` |

Read in this row's language: **at the scales the corpus can compute, the degree
lower bound is false and the pseudo-expectation does not exist.** The barrier is
in error control, at a price the same note quantifies. That is a measured
disconfirmation of the row's central hypothesis, and it was produced before the
row was proposed. Its own §5 says so in the classical convention and refuses the
transfer: *"this LP does not reproduce the classical parity obstruction, and it
must not be cited as a finite version of it."*

### 2.5 What the corpus already has that proof complexity would only weaken

`attack-bonferroni-degree.md` THEOREM A, restated in the foreign convention so
the comparison is legible: it is a degree lower bound for a Positivstellensatz
certificate. The certificate is a polynomial `P` with `deg P ≤ k`, `P(0) ≥ 1`,
`P ≥ 0` on the integer points `{1, …, L}`, and the theorem is

> `k* ≥ (θ(x) − O(1)) / (log G₂(x#) + O(1))`, hence `k* ≥ (1+o(1))·x/(B log x)`
> under `G₂(x#) = O(x^B)` **[VERIFIED]**

with the proved floors sitting under the measured `k*` at eight levels
(`k_low = 1,2,3,4,5,6,7,8` against `k* = 2,4,5,8,10,12,14,16` at `x = 5..29`),
and `d log k_low/d log x = 1.021 ± 0.051` over `x = 7..29`.

**Why proof complexity is the wrong home for it.** The variable is
one-dimensional and the domain is an interval, where every nonnegative
polynomial is a sum of squares by Markov–Lukács. So the SoS degree equals the
plain degree, the spectahedron is a Hankel moment cone, and there is no
degree-versus-truth gap for the field's technology to measure. The corpus is
already in the right convention (`attack-multiplicity3.md` §4 names Markov–Lukács
and Christoffel functions explicitly). **The owning convention for THEOREM A is
the truncated moment problem, not proof complexity, and §6 drafts that
`SEARCH-CONVENTIONS.md` row too.**

There is also a directional lesson worth keeping: THEOREM A is **self-defeating
as a barrier** — the better the `G₂` bound you assume, the higher the degree the
certificate needs. Any barrier built from a certificate's own degree will have
this shape, which is a second reason to expect nothing from the route.

### 2.6 The bounded-arithmetic branch, priced and dropped

The brief asks for bounded-arithmetic treatments of sieve bounds. The
calibration of that field against our object is one line and it is decisive.

Paris–Wilkie–Woods (1988) showed that `IΔ₀` plus the weak pigeonhole principle
for `Δ₀`-definable functions proves the infinitude of primes; **whether `IΔ₀`
alone proves Euclid's theorem has been open since, and is the field's own stated
open problem** **[SOURCED-BIB, WebSearch; the JSL record was not opened]**. A
convention that cannot yet settle Euclid in its weakest theory is not going to
deliver an independence result for the twin prime conjecture, and no
independence result for any statement of this kind exists. `zbMATH` returns 4
records for `bounded arithmetic twin primes` and every one is an analytic
number theory item that happens to contain the word "bounded"
(Maynard/Zhang-era survey material, Weissman's *An Illustrated Theory of
Numbers*, Cojocaru–Murty's sieve book). **Dropped, with the reason, so it is not
re-proposed.**

---

## 3. Tao and Brady 2014, read at source: what a real wall address looks like

This section is the session's actual deliverable. The post had returned HTTP 403
to this corpus twice and returned 403 to `WebFetch` again this session; a plain
`curl` with a browser user-agent returns 200. Everything below is verbatim or a
close paraphrase from the fetched artifact whose sha256 is in §1.3.

### 3.1 The statement

Setup: affine-linear forms `L_1(n), …, L_k(n)`, none a multiple of another, and
a property `P(l_1, …, l_k)`. A *sign pattern* is an element of `{−1,+1}^k`. A
sign pattern is **forbidden by `P`** if no `l_1, …, l_k` obeying `P` has
`(λ(l_1), …, λ(l_k))` equal to it.

> **Claim 1 (Parity obstruction)** (verbatim). *Suppose `P(l_1,…,l_k)` is such
> that that the convex hull of the forbidden sign patterns of `P` contains the
> origin. Then one cannot use the above sieve-theoretic approach to establish
> the existence of an `n` such that `P(L_1(n),…,L_k(n))` holds.*

**Our case is Example 3, verbatim: "Let `P(l_1,l_2)` be the property that `l_1`
and `l_2` are both prime. Then `(+1,+1), (+1,−1), (−1,+1)` are all forbidden
sign patterns."** The origin is the midpoint of `(+1,−1)` and `(−1,+1)`, so twins
are obstructed, by a two-point convex combination. The general corollary the post
states: *"the largest number of elements of a `k`-tuple that one can force to be
prime by purely sieve-theoretic methods is `k/2`, rounded up."*

**The proof is a model separation, and this is the part that looks like proof
complexity and is not.** From the convex combination, produce non-negative
`p_ε` summing to 1, supported on forbidden patterns, with `Σ_ε p_ε ε_i = 0` for
each `i`. Fourier expansion on the cube writes `p_ε = 1 + Q(ε_1,…,ε_k)` where `Q`
is a combination of squarefree monomials of degree `≥ 2` — *"The point is that
the mean zero condition allows one to eliminate the linear terms."* Set

`w(n) := 1 + Q(λ(L_1(n)), …, λ(L_k(n)))`.

Then `w ≥ 0`, `w` is supported only on `n` whose Liouville sign pattern is
forbidden, and Liouville pseudorandomness predicts that replacing `ν` by `ν·w`
changes none of the sieve's accessible sums. So any sieve-theoretic argument
producing an `n` in `supp(ν)` with `P` would also produce one in `supp(ν·w)`,
where `P` never holds. Contradiction.

**The sharpness half is Hahn–Banach**: if the origin is *not* in the convex hull,
separate with coefficients `c_1,…,c_k`, and pseudorandomness makes
`Σ_n ν(n)(c_1λ(L_1(n)) + … + c_kλ(L_k(n)))` negligible, so some `n` in the
support has a non-forbidden pattern.

**Two things to carry, because both are corpus-relevant.** Example 4 shows the
obstruction is exactly two-colourability of a graph in the "some edge has both
endpoints prime" family. Example 5, credited in the post to **Zeb Brady**, gives
an obstructed property that does *not* come from two-colourability. Brady is the
author of `arXiv:2112.02722`, the semidefinite framework for the sieve the corpus
already carries (`attack-bonferroni-degree.md` §8.2). **Its arXiv abstract page,
fetched this session, contains zero occurrences of "parity"**, so the corpus's
two Brady items are genuinely disjoint and neither subsumes the other.

### 3.2 Why this is not a theorem, and why no unconditional version can exist yet

Three qualifications, all in the post, all verbatim or near.

1. *"This claim is not precisely a theorem, because it presumes a certain
   'Liouville pseudorandomness conjecture' … which is a bit difficult to
   formalise precisely."* The obstruction is **conditional on an unformalised
   conjecture**, by its authors' own statement.
2. *"there are scenarios, most notably the 'Siegel zero' scenario, in which
   there is a severe breakdown of this pseudorandomness conjecture, and the
   parity obstruction then disappears. A typical instance of this is
   Heath-Brown's proof of the twin prime conjecture (which would ordinarily be
   subject to the parity obstruction) under the hypothesis of a Siegel zero."*
3. The escape hatch quoted in §2.2(b): additional axioms defeat it, and
   Friedlander–Iwaniec is the worked example.

**The mirrored circularity, in three lines. [INFERRED]** Heath-Brown's argument
(*Proc. LMS* **s3-47** (1983) 193–224, **[SOURCED-BIB]**) is sieve-theoretic in
the sense Claim 1 quantifies over, and it proves TPC given infinitely many
Siegel zeros. So an *unconditional* barrier of Claim 1's kind — "no
sieve-theoretic argument establishes TPC" — is inconsistent with there being
infinitely many Siegel zeros, and therefore implies there are only finitely many.
Siegel-zero elimination is open and is of comparable standing. **Hence: the
barrier theorem Face 4 asks for is not merely absent from the literature; it
cannot be produced without settling a named open problem first, and this is why
the field's best statement is conditional on something strictly stronger.** The
one caveat, and it is real: the deduction leans on Heath-Brown's argument
counting as "sieve-theoretic" in Claim 1's sense, which the post's parenthetical
asserts but does not define. Flagged as [INFERRED], not [PROVEN].

### 3.3 What this is worth to the corpus

The corpus's live parity citation is Tao's **2007** post (`PRIOR-ART.md`;
`natal-cap-10-sieve-cap.md`; `paper/moire-primes.md` References; `qc-refs.md`
§C7). The 2007 post is the informal statement; the 2014 post is the
**formalisation with a decidable criterion**, and it is the correct citation for
any sentence of the form "twins are parity-obstructed". Corrections drafted in
§5. **No novelty of any kind is claimed here: this is reading, not result.**

---

## 4. What the honest replacement for Face 4 is

### 4.0 The correction has ALREADY LANDED, today, from another agent in this wave

**Read this before §4.1 and §4.2, both of which were drafted against the old
text.** `paper/wall-note.md` was modified at 08:04 today and its Face 4 no
longer contains the sentence this row was briefed against. The live text now
reads, in part:

> *"β₂ = 4.26645 is an **upper bound on the sifting limit that the DHR
> dimension-2 sieve attains** … It is **not** a proven lower bound on what the
> sieve axioms permit, and no such lower bound is known … **The programme has no
> barrier result on this face.** Saying otherwise would be a lower-bound claim
> with no lower-bound source."*

attributed to `history/staging/attack-lichtman-decomp.md` §8, dated 2026-08-27.
**So the priority correction I was briefed to deliver is done, and §4.2's short
form is now redundant with what is in the file.** I am recording it anyway, and
recording the timestamp, for two reasons. First, it is an **independent
arrival**: this row reached the same verdict from the proof-complexity side
without seeing that edit, which is a cheap confirmation of a correction that
went into a paper draft the same day. Second, §4.1 and §4.2 carry **two things
the landed text does not**, and those are my only live-doc deliverable on this
face; they are collected at C1 in §5.

*Session hygiene note, and it is the reason this subsection exists at all: I
drafted §4.1 and §4.2 as a replacement, then checked the file's modification
time before reporting. Had I not checked, this note would have claimed a live
document was wrong when it had already been fixed an hour earlier — the
"headline held for one adversarial pass" rule earning its keep inside a single
session.*

### 4.1 Why the OLD sentence was wrong, in three independent ways

Old text, `paper/wall-note.md` §2 Face 4, superseded 2026-08-27:

> *"What does sit inside it is the κ = 2 sifting limit itself: β₂ = 4.26645 is a
> proven barrier for any argument that uses the sieve axioms alone, so closing
> the band means consuming structure the axioms discard rather than importing
> better arithmetic inputs."*

1. **Direction.** `β₂ = 4.26645` is an **upper** bound on the dimension-2
   sifting limit, attained by the DHR `β`-sieve. It certifies that the sieve
   *works* above that level. A barrier is the lower bound `β(2) ≥ 4.26645`, and
   that requires an extremal example. There is none: `sift-limit-attack.md` §2
   quotes Ford's 2023 notes at source — *"The exact value of `β(κ)` is unknown
   in all cases `κ > 1/2` except for `κ = 1`"* — and records
   `SEARCH-CONVENTIONS.md` §3's own row, *"Published `κ = 2` extremal example …
   None found. The band is a proof gap, not a truth gap."* **The live sentence
   contradicts two documents in its own repo.**
2. **No source.** "Proven barrier" carries no citation anywhere in the corpus,
   and none exists (§1.3's three channels).
3. **Object confusion, and the corpus has been burned by this exact class in the
   last 48 hours.** Even granted a lower bound `β(2) ≥ 4.26645`, it would bar
   *the sifting-limit pipeline*, not "any argument that uses the sieve axioms
   alone". And the sifting limit is a **level** exponent `s` in `D = z^s`, while
   the Gap Reformulation's finish line is a **size** exponent `B` in
   `G₂(x#) = O(x^B)`. They are numerically equal here only because the corpus's
   pipeline passes one straight into the other. `attack-lichtman-decomp.md` §0
   closed the same merge for `β₂` against Lichtman's constant on
   2026-08-26. **Guard, worth stating once in the live layer: three different
   "2"s are in play on this face — the parity floor 2 (a multiplicative constant
   on a `κ = 1` upper bound), `β(1) = 2` (a level exponent), and the Gap
   Reformulation's target exponent 2 (a size exponent). None implies another.**
   **This point is NOT in the landed correction and is my §5 C1 deliverable.**

### 4.2 The replacement sentence, as drafted before §4.0 was discovered

**Short form, a drop-in for the two sentences above.**

> What sits inside the band is our own bound's ingredient, and it is not a
> barrier. `β₂ = 4.26645` is the best published **upper** bound on the
> dimension-2 sifting limit (Diamond–Halberstam 2008, Table 17.1): it certifies
> that the `β`-sieve delivers above that level and says nothing about levels
> below it. `β(κ)` is known exactly only for `κ ∈ [0, 1/2] ∪ {1}` (Ford, 2023
> course notes §3.1), no lower bound on `β(2)` is in print, and no extremal
> example blocking any exponent in `(2, 4.2665]` has been found
> (`research/sift-limit-attack.md` §2; `research/SEARCH-CONVENTIONS.md` §3).
> **No barrier theorem is known for this band, in any convention.** So closing
> it is open in both directions: nothing certifies that consuming the structure
> the axioms discard is necessary, and nothing certifies that it is sufficient.

**Long form, if the face is willing to carry the parity statement properly.**
Append to the short form:

> The nearest thing to a barrier in print is the parity obstruction in the form
> Tao and Brady gave it in 2014: a property `P` of `k` linear forms is
> obstructed when the origin lies in the convex hull of `P`'s forbidden Liouville
> sign patterns, and for `P` = "both prime" it does, as the midpoint of `(+1,−1)`
> and `(−1,+1)`. That statement is explicitly not a theorem. It is conditional
> on a Liouville pseudorandomness conjecture its authors describe as difficult
> to formalise; it fails outright in the Siegel-zero scenario, where
> Heath-Brown's sieve-theoretic argument proves the conjecture; and it
> constrains which *axioms* a sieve may use, never an exponent. An unconditional
> version would imply that Siegel zeros are finite in number, which is why none
> exists.

**Falsifier for the replacement text, since the corpus requires one.** Produce
either (i) a published lower bound on `β(2)`, or (ii) a `κ = 2` extremal example
blocking an exponent in `(2, 4.2665]`, or (iii) an unconditional theorem barring
a named class of arguments from proving TPC. Any of the three falsifies "no
barrier theorem is known" and the sentence must be rewritten. **The check has
been run on three channels for (i) and (ii) (`SEARCH-CONVENTIONS.md` §3, §4, and
this note §1.3) and on three channels for (iii) (this note §1.3). All negative.
The arXiv channel is owed on all three.**

---

## 5. Live-doc corrections, drafted here and NOT applied

Per the corpus's standing rule, nothing below was written to a live document.
Each carries the exact text.

**C1. `paper/wall-note.md` §2 Face 4 — the barrier sentence. ALREADY CORRECTED
by a sibling agent at 08:04 today; see §4.0.** Two things the landed text does
not carry, and they are my only live-doc deliverable on this face.

*C1a, the exponent-type guard.* Append to the corrected Face 4 paragraph:

> Note also that a lower bound on `β(2)`, if one ever existed, would still not
> be a barrier for this face's finish line. The sifting limit is a **level**
> exponent `s` in `D = z^s`; the Gap Reformulation's target is a **size**
> exponent `B` in `G₂(x#) = O(x^B)`. They are numerically equal here only
> because our pipeline passes one straight into the other, so a floor on the
> first would bar that pipeline and not "any argument that uses the sieve
> axioms alone". Three different 2s are in play on this face and none implies
> another: the parity floor 2 (a multiplicative constant on a `κ = 1` upper
> bound), `β(1) = 2` (a level exponent), and the target exponent 2 (a size
> exponent).

*C1b, the parity statement, if the face is willing to carry it.* The long form
in §4.2, which names Tao and Brady 2014, the twin instance, and the three
reasons it is not a theorem. **The landed correction says "no barrier theorem"
without saying what the nearest thing in print is, which leaves the next reader
to rediscover it.**

**C2. `research/PRIOR-ART.md`, the parity row.** The row currently cites
"Selberg 1949; Tao's 2007 exposition". Proposed addition, after the 2007 item:

> Tao and Brady's 2014 formalisation, *A general parity problem obstruction*
> (terrytao.wordpress.com, 2014-11-21), is the version with a decidable
> criterion and is the correct citation for "twins are parity-obstructed": the
> origin lies in the convex hull of the forbidden Liouville sign patterns, for
> twins as the midpoint of `(+1,−1)` and `(−1,+1)`. It is **not a theorem** — it
> presumes a Liouville pseudorandomness conjecture the authors say is "a bit
> difficult to formalise precisely", and it fails in the Siegel-zero scenario,
> where Heath-Brown (*Proc. LMS* **s3-47** (1983) 193–224) proves TPC by a
> sieve-theoretic argument. Read at source 2026-08-27.

**C3. `research/SEARCH-CONVENTIONS.md` §1 — the row `attack-parity-adversary.md`
§5 records as OWED.** Proposed row:

> | the parity obstruction, as a criterion rather than a slogan | "the parity problem", "the parity barrier" | Selberg's parity example | **"forbidden sign patterns"** of the Liouville function, and whether **the origin lies in their convex hull**; the conditional input is **"Liouville pseudorandomness"** (never "Möbius randomness", which returns the Sarnak-conjecture literature instead); the escape route is **"additional sieve axioms"**; the failure scenario is **"Siegel zero"** | Tao, *A general parity problem obstruction*, terrytao.wordpress.com 2014-11-21 (formalisation, with Zeb Brady); Tao 2007-06-05 (the informal statement); Selberg 1949; Friedlander–Iwaniec, *Opera de Cribro*, AMS Coll. Publ. **57** (2010). **Fetch gotcha: `WebFetch` returns HTTP 403 on terrytao.wordpress.com; `curl` with a browser user-agent returns 200.** |

**C4. `research/SEARCH-CONVENTIONS.md` §1 — the degree-`k` certificate's owning
convention, which the corpus uses correctly and has never tabled.** Proposed
row:

> | the sharp bound on `P(S = 0)` from `k` moments; `V_k(L)`, the degree-`k` Boole–Fréchet certificate | "Bonferroni depth", "certificate degree", "the degree-`k` certificate" | generalised Chebyshev inequality | **the truncated moment problem**; **Markov–Krein**; the **Markov–Lukács** representation of polynomials nonnegative on an interval; **Christoffel function**. NOT "sum-of-squares" or "Positivstellensatz", whose degree lower bounds live in the many-variable regime where SoS is a strict relaxation; in one variable on an interval the two coincide and the classical convention is sharp | Akhiezer, *The Classical Moment Problem*; Karlin–Studden; Galambos–Simonelli, *Bonferroni-type Inequalities with Applications*, Springer 1996 (advertises prime-number applications, **still unopened** per `attack-bonferroni-degree.md` §8.3) |

**C5. `research/SEARCH-CONVENTIONS.md` §3 — two new "already run" rows.**

> | Is sieve theory formalised anywhere as a proof system with a degree or size measure? | **None found.** Proof complexity's own 221-page survey (Fleming–Kothari–Pitassi 2019) contains zero occurrences of `sieve`, `number theory`, `Liouville`, `Möbius`, `twin`, `arithmetic progression`; OpenAlex `"proof complexity"`+`"sieve"` → 0 and `"Nullstellensatz"`+`"sieve"` → 0, calibrated in-pass; zbMATH `Positivstellensatz sieve`, `sieve axioms proof system` → 0, calibrated in-pass. **arXiv not reached** (429) | redo the arXiv leg only |
> | Is "parity" the same object in proof complexity and in sieve theory? | **No.** Grigoriev's degree lower bound is for the MOD-2 counting principle; the sieve's is `Ω(n) mod 2`. A vocabulary collision, not a fit | settled |

**C6. `research/SEARCH-CONVENTIONS.md` §2 — a new "search moves that silently
fail" entry, because it cost four false zeros here.**

> **OpenAlex's conjunctive filter is a comma, not the word AND.**
> `filter=title_and_abstract.search:"x" AND title_and_abstract.search:"y"`
> silently returns **0** for every query, including known positives. It was
> caught here only because the in-pass calibration probe (`"sum of squares"` and
> `"lower bound"`, which must be in the hundreds) also returned 0. The correct
> form is `filter=title_and_abstract.search:"x",title_and_abstract.search:"y"`.
> **This is the fifth channel gotcha in this file and the argument for the rule
> that produced them: never accept a zero without a same-pass positive.**

**C7. `research/history/staging/attack-parity-adversary.md` §5 and §9 — the OWED
search is now partly run.** Its §5 says *"A page-level search in the owning
convention for the finite, exact-count instance is OWED and has not been run;
`SEARCH-CONVENTIONS.md` carries no row for the parity obstruction and one is
proposed in §9."* The convention row is drafted at C3 above and the primary
source is now read. **What remains owed is narrower and should be restated as
such: a search for the FINITE, EXACT-COUNT instance of the parity LP, which this
note did not run.** That note is HELD and I am not editing it; the correction is
recorded here for whoever integrates.

---

## 6. Drafted rows, for whoever integrates. All drafts, applied nowhere.

### 6.1 DRAFTED entry for `history/staging/import-map-construction.md` §1, the VOCABULARY-ONLY table

> | candidate | the theorem that would have been imported | why it is not a fit |
> |---|---|---|
> | proof complexity: degree and size lower bounds for algebraic and semialgebraic proof systems (NS, PC, Sherali–Adams, SoS/Lasserre) | Grigoriev, *Theor. Comput. Sci.* **259** (2001) 613–622, the linear degree lower bound for Positivstellensatz-calculus refutations of the parity principle, via the duality of Fleming–Kothari–Pitassi, *Found. Trends TCS* **14** (2019) 1–221, Thm 3.60 p. 89: *a degree-`2d` SoS refutation exists iff no degree-`2d` pseudo-expectation exists* | **The shared word is "parity" and it names two unrelated objects**: the MOD-2 counting principle on one side, `Ω(n) mod 2` on the other. Four further failures, each independent. (i) The parity obstruction bounds no complexity measure — it says the axiom set has a second model, at every degree, which in a system complete at degree `n` is not a degree lower bound. (ii) The axiom set cannot be fixed: Tao 2014 is explicit that additional sieve axioms defeat the obstruction (Friedlander–Iwaniec) and that its own scope is deliberately vague. (iii) The proofs Face 4 needs barred, the DHR `β`-sieve, have no bounded-degree representation over any finite variable set, so a degree lower bound would bar nothing anyone does. (iv) The lower-bound machinery is product-space (pseudo-calibration from a distribution over instances), and this corpus's shared-uniform-residue-draw mechanism has already voided that hypothesis three times, at rows 3, 4 and 10. And the corpus's own finite two-model experiment already **refuted** the premise: the pseudo-expectation does not exist on 43 anchors `Q ≤ 200` (`attack-parity-adversary.md`). Detail: `history/staging/import-proof-complexity.md` |

### 6.2 DRAFTED row for `research/IMPORT-MAP.md` §2, IF the map keeps a rejected row visible

*(Recount warning for the integrator: `IMPORT-MAP.md`'s "Counts (recounted
2026-08-21)" paragraph says fourteen rows and **zero VOCABULARY-ONLY in the
table**. Adding this row breaks that sentence and the twelve-rejected count in
`import-map-construction.md` §1, which becomes thirteen. Both must move
together, and at least three other notes from today's wave touch the same two
counts.)*

The map's §0 says VOCABULARY-ONLY rows *"are rejected and do not appear in this
table"*, so my recommendation is **§6.1's rejection entry and no numbered row at
all**. Offered only if the integrator judges the wall address reason enough to
keep it visible. **Number left as `N`: `history/staging/import-entropy-decrement.md`
from this same wave has already drafted a row 15, and at least four import notes
landed in `history/staging/` today, so the integrator assigns numbers, not the
notes.**

> | N | proof complexity: algebraic and semialgebraic proof systems | Grigoriev, *TCS* **259** (2001) 613–622 **[SOURCED-BIB]**; Fleming–Kothari–Pitassi, *Found. Trends TCS* **14** (2019) 1–221, Def 3.55 / Thm 3.60 **[SOURCED, verbatim, pp. 85, 89]**; Buss–Impagliazzo–Krajíček–Pudlák–Razborov–Sgall, *Comput. Complexity* **6** (1996) 256–298 **[SOURCED-BIB]**; Schoenebeck FOCS 2008 **[SOURCED-BIB]**; BBHKSZ STOC 2012 **[SOURCED-BIB]** | Bonferroni depth as certificate degree; the corpus's `V_k(L)` certificate | Face 4's missing barrier theorem | **VOCABULARY-ONLY** | **TPC-STRENGTH, mirrored** (the check runs on the CONCLUSION for a negative result: an unconditional barrier implies Siegel-zero finiteness) | PUBLISHED-ANCHOR + WALL-ADDRESS realised; THEOREM structurally unavailable | 0 h (rejected at the gate) | **REJECTED AT THE GATE 2026-08-27, no experiment run** — the shared word is "parity" and it names two different objects; the obstruction bounds no complexity measure; the axiom set cannot be fixed (Tao 2014, read at source); the `β`-sieve is not in any bounded-degree system; the lower-bound machinery is product-space and dies on the shared residue draw that closed rows 3/4/10; and the corpus's own finite two-model construction already failed (`attack-parity-adversary.md`, 43 anchors). Banked instead: Tao and Brady 2014 READ AT SOURCE after two 403s (the criterion, the twin instance, the `w(n)` separation, the Siegel-zero exception), the owed `SEARCH-CONVENTIONS.md` row for the parity obstruction, and the correction to Face 4 — the honest replacement is "no barrier theorem is known". `history/staging/import-proof-complexity.md` |

### 6.3 DRAFTED row for `research/REFUTED.md`

The route closed is the family, not the field, and the line should say so:

> | formalising "the sieve axioms" as a proof system, so the parity obstruction becomes a degree or size lower bound (import-map candidate: proof complexity) | REJECTED AT THE GATE | the obstruction bounds no complexity measure — it says the axiom set has a second model, at every degree, in systems complete at degree `n`; the axiom set cannot be fixed (Tao 2014: additional axioms defeat it, Friedlander–Iwaniec the example); the `β`-sieve has no bounded-degree representation; the SoS lower-bound machinery is product-space and dies on the shared residue draw that closed rows 3/4/10; and the corpus's own finite two-model construction already failed at 43 anchors. The shared word "parity" names the MOD-2 counting principle on one side and `Ω(n) mod 2` on the other | 2026-08-27 | `history/staging/import-proof-complexity.md`; `history/staging/attack-parity-adversary.md` |

---

## 7. NOT REACHED, and what a future wave is owed

- **The arXiv Atom API leg.** Calibration failed (`all:electron` → 0, then 429
  for the session). Every negative in §1.3 rests on OpenAlex and zbMATH only.
  A recent unindexed preprint would not show up in either. **This is the one
  hole in the [ABSENT] claim and it should be closed cheaply on a fresh day.**
- **MathSciNet.** Reachable via `mrlookup` per `SEARCH-CONVENTIONS.md` §5 and
  not used here. Bibliographic fields only, so it would confirm records rather
  than absences.
- **Grigoriev's, Schoenebeck's and BBHKSZ's statements were not opened**, only
  their Crossref records. Nothing in this note's argument depends on their
  content beyond the standard shape, which FKP 2019 supplies at source. If any
  future note quotes one of them, it must be opened first.
- **Galambos–Simonelli, *Bonferroni-type Inequalities with Applications*,
  Springer 1996 is still unopened**, as `attack-bonferroni-degree.md` §8.3
  recorded. It advertises prime-number applications and is the one book that
  could carry a degree-`k` Bonferroni result on a sifted set. It remains the
  highest-value unopened item adjacent to this row.
- **The finite, exact-count instance of the parity LP was not searched for in
  the owning convention.** C7 restates what `attack-parity-adversary.md` §5 is
  still owed after this note.
- **Whether Claim 1's "sieve-theoretic approach" formally includes
  Heath-Brown's Siegel-zero argument** is asserted by Tao's parenthetical and
  not defined. §3.2's mirrored circularity rests on it and is marked [INFERRED]
  for that reason. Reading Heath-Brown 1983 would settle it.
- **No producer was written.** If any number in this note is ever to leave it,
  it needs one. The only numbers that would need one are the `grep` counts on
  the FKP text and the search-channel counts, all marked `[SCRATCHPAD-GRADE]`.
