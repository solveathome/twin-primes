# Which obstruction binds the tile-side target: an audit of the word "parity"

<!-- ledger
id: Q-obstruction-audit
status: ANSWERED
todo: none
question: Is the wall named parity the right name for what blocks G2(x#) < x'^2 - 2?
verdict: The attractive conclusion does not survive: the target is indeed a finite combinatorial statement on a cyclic group, but it asks for sieve positivity at u = 2 ln x'/ln x, which converges to the parity boundary from above with margin tending to zero, so attacks aimed at parity are not aimed at the wrong wall.
-->

*(Staging note, 2026-08-26. Asks whether "the wall (parity)" is the right name
for what blocks `G₂(x#) < x′² − 2`. No script was run. Nothing here is a route,
a bound, or a new mathematical statement. Every load-bearing technical claim
below was already in this corpus before this session; the audit's own
contribution is scoping and one literature row.)*

---

## 0. The verdict, with the disconfirming half first

**The attractive conclusion does not survive.** The hypothesis handed to this
run was: `G₂(x#) < x′² − 2` is a purely combinatorial statement on a finite
cyclic group, so the parity obstruction — a statement about sieve *methods* —
does not apply, and every attack aimed at parity is aimed at the wrong wall.
The first half is right and the second half does not follow, for a reason that
is sharper than the hypothesis anticipated and that this corpus already holds:

> The tile-side target asks for sieve positivity at
> `u = ln(x′²)/ln x = 2·ln x′/ln x`, which exceeds 2 by
> `2(ln x′ − ln x)/ln x → 0`. The target does not sit comfortably away from the
> parity boundary. **It converges to it from above, with margin tending to
> zero.**

`u = 2` is exactly where a sieve survivor becomes a prime, and exactly where
the κ = 1 lower-bound function `f(u) = 2e^γ log(u−1)/u` vanishes. Granville's
account, already transcribed verbatim in `research/covering-dive.md` §1.2,
records both facts in one line: *"S(x,y,z) ≫ y/log y · f(u) fails at u = 2
since f(2) = 0."* So any argument that reaches the target through a sieve is
attempting positivity at the boundary the parity examples define, and the
available margin above that boundary vanishes as x grows. That is a real
constraint and it is not what "the wall is not parity" would suggest.

**What is nevertheless true, and is the correction this run delivers.** The
word "parity" is doing work at the top of the corpus that the corpus's own
fine-grained files refuse to let it do. Parity is an obstruction to a *method
class* — axiom-only sieves, whose entire input is `|A_d| = g(d)X + r_d`. It is
not an obstruction to a statement, and the corpus's four finest files say so
explicitly, in four different instances, while `README.md` §Status and
`paper/moire-primes.md` §7 compress all five doors and all four faces into the
one word.

**Calibration of the whole note.** The technical content is **already known,
here, in these words** — §1 lists where, and the list is long enough that this
run's honest headline is "the corpus already says this at grain, and does not
say it at the top." The proposed edits in §5 are editorial scoping, not a
mathematical result. Nothing here moves any exponent, opens any route, or
changes any number. My confidence, stated as asked:

| claim | confidence |
|---|---|
| Parity, as a stated theorem, does not apply to the *statement* `G₂(x#) < x′² − 2` | ~0.9 |
| Parity does constrain any axiom-only-sieve *proof* of it, at `u = 2 + o(1)` | ~0.6 unconditional; higher conditional on Chowla, via this repo's own κ = 2 extremizer sketch |
| The top-level label is a compression that misdirects | ~0.85 |
| This reallocates any effort worth reallocating | ~0.3 |
| This opens a route | ~0.05 |

No `REFUTED.md` row collides with an obstruction audit. All 83 rows were read.

---

## 1. Does the repo already say this? Yes, in five places, at grain

Answering task item 1 first, because it is the largest part of the deliverable.

**1.1 `research/sift-limit-attack.md` §1 DP5 — the general point, stated flatly.**

> "**DP5, the method is not the wall.** β₂ = 4.2665 is the best certificate
> price achieved by known methods, not a proven property of the axiom class.
> This is a literature fact, not our hope; §2 documents it."

**1.2 `research/sift-limit-attack.md` §2 — the κ = 2 extremal question, with
the Ford quote.** Ford's 2023 notes, read from the PDF and quoted there:
*"The exact value of β(κ) is known only for κ ∈ [0, 1/2] ∪ {1} … The lower
bound β(1) ⩾ 2 is clear from Selberg's examples."* The file's own reading:

> "No published example blocks any exponent in (2, 4.2665] even for axiom-only
> sieves at our (full) level … So the wall our theorem sits behind is
> methodological."

**1.3 `research/sift-limit-attack.md` §3, on the Brüdern–Fouvry target.**

> "Parity does not forbid it: the target 2.649 sits above 2, and the
> conditional κ = 2 extremizer of §2 constrains axiom-level inputs, not this
> explicit exponential-sum estimate about the fixed lattice of divisor pairs."

That is the exact form of the point this run was sent to test, already written,
for one instance.

**1.4 `research/natal-cap-10-sieve-cap.md` §2 — the scope condition, named.**
Regime 1: *"the achievable upper constant is 1 + o(1), **parity is irrelevant**
(parity constrains sieves whose range reaches ~√ℓ)."* Regime 2: *"**Parity-barred**,
with the gap → factor 2 exactly."* The same file's §1.5 also flags the floor's
own status honestly: *"we found no theorem formalizing 'no sieve can beat 2'
for this specific problem: the floor is rigorous folklore, flag as such."*

**1.5 `research/SEARCH-CONVENTIONS.md` §3, row on the κ = 2 extremal example.**

> "Published κ = 2 **extremal example** — a set that blocks an exponent in
> (2, 4.2665]? **None found.** The band is a proof gap, not a truth gap."

**1.6 `research/covering-dive.md` §1.3, entry point 2.** The cleanest statement
of what actually separates one class from two, and it names no obstruction at
all where the difference lives:

> "the sifting limit is exactly the critical exponent only for κ = 1 … the
> miracle of the one-class problem is: sifting limit (2) = twin-critical
> exponent (2). **[PROVEN]**"

**1.7 `research/G2-STATE.md` §5, Route A — two difficulty floors, neither
parity.** The canonical file already prices the tile-side route with (1)
TPC-hardness and (2) the Jacobsthal shadow (`G₂ < x′²−2 ⟹ g(x#) < x′²−2`, an
explicit-constant one-class bound the literature does not supply). Parity is
not among them. It appears in that section only under **Route C, counting with
a certificate** — which is exactly where it belongs.

**What the repo does *not* say anywhere.** Two things, and they are the gap
this note fills:

- The **general** statement that obstructions attach to methods and do not
  travel along implications. The corpus has four instances and no principle,
  which is why the top-level label survived four instances of its own
  refutation.
- Any note that the top-level label is a compression. `README.md` §145 reads
  "Open: the wall (parity)" with no scope, and `paper/moire-primes.md` §7 opens
  "The obstruction is the *parity problem*" and then frames all five doors as
  "five routes to the same wall".

---

## 2. The logic, settled properly

### 2.1 The transfer question (task item 2a): does TPC-implication inherit the obstruction?

**No, and the reason has to be stated precisely rather than waved at.**

An obstruction of the form *"no argument in class M proves S"* transfers from S
to a stronger statement S′ only if M is closed under composing with the
reduction `S′ ⟹ S`. Here M is the axiom-only sieve: arguments whose entire
input about the sifted set is the congruence data `|A_d| = g(d)X + r_d`.

The reduction `G₂(x#) < x′² − 2 ⟹ TPC` (proven, `research/ZONE-POSTULATE.md`
§3) runs through two steps: (i) `x# ± 1` are coprime to `x#`, so the tile
carries a twin slot at its edge; (ii) an x-rough number below `x′²` is prime.
Step (ii) is a primality-detection step, and it is precisely the thing an
axiom-only sieve does not possess: the sieve knows counts of `A_d`, not that a
survivor of the sift is prime. **That observation is not an escape the source
names**, and this note earlier treated it as one (read at source 2026-08-27,
`history/staging/lit-tao-parity.md` §0). The escape Tao states is enlarging the
sieve's *input* past upper and lower bounds on the sifting axioms; a primality
test appended *after* the sieve has produced an `n` is not an input and does not
appear in the sums the reweighting argument leaves invariant.

The reason that does survive at source is narrower, and it is about the tile
statement rather than about the reduction. Tao's "forbidden" is extensional,
computed from which tuples satisfy the property and never from how the property
is written, so a property defined by congruences alone forbids no Liouville sign
pattern at all, every reduced class carrying numbers of both signs.
`G₂(x#) < x′² − 2` is such a property, so it does not satisfy the obstruction's
hypothesis and no parity theorem names it. **The transfer fails for the bare
tile statement, and it fails only there.** The reduction uses the tile inside
the zone, where an `x`-rough number is prime, and the zone form's extension *is*
the set of twin prime pairs, carrying the forbidden "both prime" set in full, so
any route that proves the zone statement by bounding sums against a non-negative
sieve weight sits inside the obstructed class. §3(a) is unaffected and stands.

This is not a technicality dressed up. Three checkable precedents:

- **PNT.** `Σ_{n≤x} λ(n) = o(x)` is the canonical parity-flavoured statement
  and it is a theorem — proven by zero-free regions, not by sieves. No
  axiom-only sieve gives it. "Parity-obstructed" has never meant "unprovable".
- **Friedlander–Iwaniec `x² + y⁴` (Annals 148, 1998) and Heath-Brown
  `x³ + 2y³`.** Parity is routinely broken when a method sees bilinear (Type
  II) information beyond congruence sums. This corpus already prices that
  precedent: `sift-limit-attack.md` §4.1 calls FI "the precedent for §4.5
  (structure beyond the axioms, inserted at the remainder, breaks a 'limit' of
  the axiom class)".
- **The repo's own DP5.** If β₂ = 4.2665 were an information-theoretic
  property of the axiom class rather than of DHR's method, `sift-limit-attack.md`
  §§1–2 would be wrong, and it cites Ford at source for the fact that β(κ) is
  unknown for every κ > 1/2 except κ = 1.

**What does transfer, and it is not nothing.** The *difficulty* transfers: a
TPC-implying statement is at least TPC-hard. `G2-STATE.md` §5 already carries
that as difficulty floor 1, correctly, and separately from any method claim.
Difficulty-hardness and method-obstruction are different objects and the corpus
should not let one word carry both.

### 2.2 The case that parity DOES bind, made as hard as I can

Per the brief, this was pushed at least as hard as the other side. The
strongest chain:

- **P1.** Every published upper bound on a Jacobsthal-type function is a sieve
  argument — Iwaniec 1971/1978, Vaughan 1977, and our own DHR bound. The
  elementary line (Kanold `2^{√k}`, Stevens `k^{Θ(log k)}`, Paseman
  `k^{O(log log k)}`) does not reach exponent 2 at all
  (`covering-dive.md` §1.1). **So in practice, "prove a Jacobsthal bound" has
  only ever meant "run a sieve".**
- **P2.** A sieve proof of `G₂(x#) < x′² − 2` needs positivity at
  `u = 2·ln x′/ln x`, i.e. at `2 + o(1)`, with the margin above 2 tending to 0.
- **P3.** At `u ≤ 2` the κ = 1 axiom class is provably empty of positivity, by
  Selberg's / Iwaniec's Liouville examples `A± = {n ≤ x : λ(n) = ∓1}` —
  Granville's *"the so-called parity phenomenon"*, and Ford's `β(1) ⩾ 2`.
- **P4.** At κ = 2 this corpus's own §2 sketch, the mixed-sign twin example
  `C = {n(n+2) : λ(n) = −1, λ(n+2) = +1}`, pins the κ = 2 axiom-only limit at
  `≥ 2` conditionally on Chowla-strength two-point λ-equidistribution.
- **P5.** Therefore, conditionally, the best an axiom-only κ = 2 sieve could
  ever do is *exactly critical*, and sifting limits are thresholds at which
  positivity is lost. A margin tending to zero above a critical threshold is
  not a proof strategy.

**Verdict on P1–P5.** The chain is sound as far as it goes and it is the reason
the honest answer here is "reallocate the label, not the effort". Where it
stops:

- P4 is conditional (Chowla) and is this repo's sketch, not a published
  example. `SEARCH-CONVENTIONS.md` §3 records that nothing analogous to
  Selberg's κ = 1 extremizers is in print at κ = 2.
- P4 blocks `u < 2` **strictly**; the target sits at `u > 2` strictly. The
  margin is infinitesimal but the sign is right, and nothing in print closes
  the endpoint.
- P1 is an observation about the historical record, not a theorem. It is the
  honest reason to expect difficulty, and it is *not* parity: see §3.

So the corrected reading is not "parity is the wrong wall". It is: **parity is
a boundary the tile-side target approaches from outside, and it binds every
route that crosses into the axiom-only sieve to get there — which is every
route anyone has ever taken.**

### 2.3 One place the label is loose inside the corpus too

`research/sift-limit-attack.md` §3 calls the sub-Gaussian maximal law for the
sawtooth *"the parity wall in concentration clothing"*, and §4.5 and
`theta-ladder.md` §5b repeat it. The reason the file gives for the phrase is
the *measure-versus-single-point* problem — an almost-all bound cannot decide
the one anchored position, `natal5-variance.js` reading 6. That is a
quantifier problem, not a parity problem; they share a shape ("the expected
count is astronomical and the certificate is zero") and nothing else. This is a
metaphor doing the work of a diagnosis, and it propagates: `covering-dive.md`
line 185's *"so no 'pure sieve' route can get there (parity obstruction)"* is
marked `[synthesis INFERRED]` and reaches the right conclusion by the wrong
inference — the implication-transfer move of §2.1. The direct argument is
available and correct (at `u = 2`, sieve positivity *is* prime detection, which
Selberg's examples block at κ = 1), so the conclusion survives with a repaired
reason. Recommended, but outside this run's edit scope.

---

## 3. What actually binds, with coordinates (task item 3)

Four obstructions, and they are not the same object. Naming them separately is
the whole content of this note.

**(a) Parity — binds the counting routes, and binds them tightly.** Every zone
twin slot **is** a twin prime (crystallization, `ZONE-POSTULATE.md` §3). So a
lower bound on the zone's twin-slot count is a lower bound on twin primes in a
short interval, which is the canonical parity-blocked quantity. This covers
Doors 1–4, Faces 1–3, Route B and Route C. The pricing is already exact in the
corpus: parity floor 2 against 1.44 needed @13 and 1.28 @17
(`natal-cap-10-sieve-cap.md` §2, Regime 2). **Nothing in this note weakens
this.**

**(b) The κ = 2 sifting limit — binds the exponent route.** `β₂ = 4.26645`
(Diamond–Halberstam–Galway 2008, Table 17.1). It is the barrier for the method
we use, not for the axiom class: β(κ) is known exactly only for
κ ∈ [0, 1/2] ∪ {1} (Ford 2023), the band (2, 4.2665] carries no published
blocking example, and improving β₂ itself is closed (`REFUTED.md`). Note the
arithmetic that makes this the cleanest statement of the gap: **our proven
exponent *is* the sifting limit** — 4.2665 = β₂ exactly, and the needed 2 is
what a κ = 1 sieve delivers because β₁ = 2. "Get the exponent from 4.2665 to 2"
is, in sieve currency, "make a two-class sieve perform like a one-class sieve".

**(c) The absence of any non-sieve upper-bound technology — binds the covering
route (Door 5).** This is the answer to "what is the actual barrier in the
extremal combinatorics", and it is an absence rather than an obstruction. The
covering-systems literature produces **lower** bounds (Rankin, FGKT, FGKMT,
Kalmynin–Konyagin) and min-modulus theorems about covering all of ℤ; it
produces no upper bound on the length of a finite interval coverable at
polynomial scale, at one class or two. `SEARCH-CONVENTIONS.md` §3 records the
negative; `wall-note.md` §1 Door 5 records that its infinite half rests on KKL
2024 with no constant computed at multiplicity 2, and its finite half on a
measured construction law. **So the extremal route's barrier is not a loss in
the greedy step and not a missing construction technique — it is that no
technique for upper-bounding a Jacobsthal-type function exists outside the
sieve at all.** That is a strictly weaker kind of barrier than (a) or (b): it
records what nobody has built, not what cannot be built.

**(d) Siegel zeros — the one obstruction in print for this exact problem
family, and it does not reach us.** Answering task item 2(b): the identified
reason the one-class Jacobsthal technology stalls, in print, is exceptional
zeros, not parity. Granville, *Sieving intervals and Siegel zeros*, Acta Arith.
205 (2022) 1–19 = arXiv:2010.01211 — **already cited in `covering-dive.md`
§1.2**, though this consequence is not drawn there. Abstract, verbatim:

> "Assuming that there exist (infinitely many) Siegel zeros, we show that the
> (Rosser-)Jurkat-Richert bounds in the linear sieve cannot be improved, and
> similarly look at Iwaniec's lower bound on Jacobsthal's problem…"

Read at ar5iv this session: if Siegel zeros exist with `1 − β < 1/(log q)^B`
for an integer `B ≥ 1`, then there exist `m` with `J(m) ≫ ω(m)(log ω(m))^B` —
which falsifies the Maier–Pomerance shape `ω(m)(log ω(m))^{2+o(1)}` that the
field expects. **Three readings, in order of importance:**

1. *It does not obstruct our target.* `k·log^B k = k^{1+o(1)} < k²` for every
   fixed B, so no Siegel-zero construction of this shape approaches the zone
   width. A conditional lower bound of that size would sit far below `x′²`.
2. *It is the right model for what a real obstruction to this problem looks
   like.* Granville's examples are **actual intervals sifted by actual
   primes** — instances of the problem. Selberg's parity examples are sets
   defined by `Ω` parity and are **not instances of the Jacobsthal problem at
   all**; they constrain what the axioms determine, nothing more. That
   distinction is the cleanest available reason why "parity" cannot be the name
   of an obstruction to a statement about `Z/x#`.
3. *The corpus already holds the mirror of this.* `bv-import-survey.md` §2
   records Heath-Brown 1983: if Siegel zeros exist (quantified), twin primes
   are infinite. So the exceptional-zero axis pinches from both sides and is
   not a route either way.

**A search negative, in the owning convention.** Task item 2(c) asked whether
any published source states that Jacobsthal-type problems are parity-obstructed.
**None found.** Searched in the conventions `SEARCH-CONVENTIONS.md` §1 assigns
to this object — "Jacobsthal function", "polynomial analogue of Jacobsthal"
(Kalmynin–Konyagin arXiv:2302.00459), "bounded number of residue classes per
prime" — plus the parity side's own convention ("parity problem in sieve
theory"). Findings: the Wikipedia parity-problem article does not mention
Jacobsthal at all (fetched, checked); the one paper that names an obstruction
for the Jacobsthal problem is Granville's, and it names Siegel zeros; Granville
uses "parity phenomenon" only for the `u ≤ 2` prime-detection statement, never
for the Jacobsthal bound. **This negative is worth less than it looks** — an
absence of the sentence "Jacobsthal is parity-obstructed" is weak evidence,
because nobody had reason to write it. It is recorded so the row is not
re-searched, not as a result. Suggested new row for `SEARCH-CONVENTIONS.md` §3:

| question | answer | do not redo |
|---|---|---|
| Does any published source call Jacobsthal-type problems parity-obstructed? | **No.** Granville arXiv:2010.01211 names **Siegel zeros** as the obstruction for `J(m)`, and uses "parity phenomenon" only for the `u ≤ 2` detection statement | settled 2026-08-26; the absence is weak evidence, see `attack-obstruction-audit.md` §3(d) |

---

## 4. What this changes, and what it does not

**Does not change.** Any number, any exponent, any calibration, any route
status. Faces 1–3 and Doors 1–4 keep parity as their obstruction, correctly and
with the pricing already recorded. The programme's target is exactly as hard
today as yesterday.

**Changes, if the orchestrator accepts §5.** One word at the top of two
documents, so that a reader arriving at `README.md` does not conclude that the
exponent route and the covering route are blocked by a theorem that does not
name them. The practical cost of the current label is small but real: it makes
"the wall" look like one object with one door, when the corpus's own §7A
already says the faces "are not disjoint from the doors" and Face 4 already
says its need is "an unproven cancellation law for the sawtooth, not a
distribution hypothesis" — a sentence that is *already* not-parity and reads as
an exception rather than as a second obstruction.

**One thing worth watching, flagged not claimed.** §2.2's P5 — if the κ = 2
axiom-only limit is exactly 2, an axiom-only sieve is critical rather than
positive at our `u`, and the boundary degeneration costs logs. At κ = 1 that
degeneration is exactly what turns `f(2) = 0` into Iwaniec's `(k log k)²`, and
the `k = π(x) ~ x/ln x` conversion absorbs the `log²` to land at `x²` with an
inexplicit constant. The κ = 2 analogue, if it existed, would land at `x²` with
an inexplicit constant too — and our target needs the constant strictly below
1. **That is `G2-STATE.md` §5's Jacobsthal shadow arriving by a second road**,
and it says the same thing: the constant is the whole question and no explicit
one exists. Not new; a second derivation of a floor already on the books.

---

## 5. Proposed replacement text (for the orchestrator; not applied here)

No repository file was edited by this run except the creation of this note.

### 5.1 `README.md` §Status

**Current** (line 145 ff.):

> Open: the wall (parity). It is surveyed at five doors and located on four
> faces with coordinates (`paper/moire-primes.md` §7A).

**Proposed:**

> Open: the wall, and it is not one obstruction. Parity binds the counting
> routes, where the zone's twin-slot count *is* the twin-prime count, so a
> sieve lower bound on it is the blocked quantity exactly. The two routes with
> a defined finish line carry different ones: the exponent route is bound by
> the κ = 2 sifting limit β₂ = 4.26645 against a needed 2, which the corpus
> prices as a property of the best known method rather than of the axiom class
> (`research/sift-limit-attack.md` §1 DP5, §2; β(κ) is known exactly only for
> κ ∈ [0, 1/2] ∪ {1}), and the covering route is bound by the absence of any
> upper-bound technology for a Jacobsthal-type function outside the sieve. The
> target sits at u = 2·ln x′/ln x, above the parity boundary with margin
> tending to zero, so the three converge rather than compete. Surveyed at five
> doors and located on four faces with coordinates
> (`paper/moire-primes.md` §7A).

*(The rest of §Status — the compressed β statement onward — is unchanged.)*

### 5.2 `paper/moire-primes.md` §7, opening paragraph

**Current:**

> Why can't counting finish? The obstruction is the *parity problem* (Selberg
> 1949; Tao 2007): sieve-type arguments cannot distinguish numbers with an odd
> number of prime factors from an even number, hence cannot lower-bound
> populations defined by exact primality of both members. What this project
> adds is a *surveyed perimeter*: five routes to the same wall, each carried as
> far as it goes, each meeting the wall at a different door, and each with the
> toll measured.

**Proposed:**

> Why can't counting finish? The obstruction is the *parity problem* (Selberg
> 1949; Tao 2007): sieve-type arguments cannot distinguish numbers with an odd
> number of prime factors from an even number, hence cannot lower-bound
> populations defined by exact primality of both members. It applies here with
> no slack, because every twin slot in a zone is a twin prime, so the count a
> counting route would bound is the twin-prime count itself. Two scope
> statements belong beside it and are easy to lose. First, parity obstructs a
> *method* — arguments whose whole input is the congruence data |A_d| = g(d)X +
> r_d — and not a *statement*; the conjecture's tile-side form, G₂(x#) < x′² −
> 2, mentions no prime and is a covering question on Z/x#, so no parity theorem
> names it. Second, that buys less than it appears to, because the tile-side
> form asks for positivity at u = 2·ln x′/ln x, which exceeds the parity
> boundary u = 2 by a margin tending to zero: any route that reaches the target
> through a sieve arrives at the boundary asymptotically. What this project
> adds is a *surveyed perimeter*: five routes to the same region, each carried
> as far as it goes, each with the toll measured. Doors 1 through 4 meet parity
> proper. Door 5 does not, and neither does Face 4 — those two are bound by the
> κ = 2 sifting limit β₂ = 4.26645 and by the absence of any non-sieve
> upper-bound technology for a Jacobsthal-type function, priced in
> `research/sift-limit-attack.md` §§1–2 and `research/covering-dive.md` §1.3.

### 5.3 `paper/wall-note.md`, header paragraph

**Current:**

> **Parent: `paper/moire-primes.md` §7 (the doors) and §7A (the faces).** Those
> two sections say what this note establishes and at what calibration; this
> note is the working out, and it holds every number. The obstruction itself,
> the parity problem, is stated in the parent and is not repeated here, and
> every author cited below resolves against the parent's References.

**Proposed:**

> **Parent: `paper/moire-primes.md` §7 (the doors) and §7A (the faces).** Those
> two sections say what this note establishes and at what calibration; this
> note is the working out, and it holds every number. The obstructions are
> stated in the parent and are not repeated here, and every author cited below
> resolves against the parent's References. One scope note travels with every
> door and face below, because "the wall" is not one object: parity proper
> binds Doors 1 through 4 and Faces 1 through 3, where the quantity being
> bounded is a twin-prime count; Door 5 and Face 4 are bound instead by the
> κ = 2 sifting limit and by the absence of non-sieve upper-bound technology,
> and no parity theorem names either.

### 5.4 Optional, outside the brief's edit list

- `research/covering-dive.md` line 185: replace the inference *"would … prove
  the twin prime conjecture — so no 'pure sieve' route can get there (parity
  obstruction …)"* with the direct reason — at u = 2 a sieve lower bound *is*
  prime detection, which Selberg's examples block at κ = 1 — since the
  implication-transfer form of the argument is invalid even though its
  conclusion holds.
- `research/sift-limit-attack.md` §3, `§4.5`, `research/theta-ladder.md` §5b:
  the phrase "the parity wall in concentration clothing" describes a
  quantifier problem (almost-all versus the one anchored position). Recommend
  renaming it to what it is, e.g. "the anchored-quantifier wall", and keeping
  the parity comparison as an explicit analogy rather than as the name.
- `research/THE-DIALS.md` §1, dial 1: *"That is the exact statement of why the
  parity obstruction sits where it does"* sits immediately before the β₂
  sentence, and reads as though the band (2, 4.26645) were parity's. The
  u = 2 half is right; the band belongs to the sifting limit. Recommend
  splitting the two sentences with a clause that says so.

---

## 6. What would falsify this note

- A published κ = 2 extremal example blocking an exponent in (2, 4.2665] would
  make §3(b) wrong and would move the exponent route's obstruction onto the
  axiom class where it currently is not. `SEARCH-CONVENTIONS.md` §3 records the
  negative; that row is the check, and it has been run.
- A published upper bound on a Jacobsthal-type function by a non-sieve method
  would make §3(c) wrong and would be far more valuable than this note. None
  found in the owning convention.
- A proof that the κ = 2 axiom-only limit exceeds 2 unconditionally would
  strengthen §2.2's chain from conditional to unconditional and would make
  "parity binds the sieve half of every route" the plain reading. This corpus's
  §2 sketch is Chowla-conditional and is the only candidate on record.
- The whole scoping argument would collapse if some general obstruction theorem
  applied to statements rather than methods. Tao's 2014 "A general parity
  problem obstruction" is the place to check, and **it is now read at source**
  (2026-08-27, `history/staging/lit-tao-parity.md`), closing what this note
  recorded as its largest hole. The two sentences a search summary had reported
  are accurate: the obstruction is scoped to what sieve theory can do *"without
  injecting additional ingredients"*, and it *"does not prevent the
  establishment of an `n` such that `P(L₁(n),…,L_k(n))` holds by introducing
  additional sieve axioms beyond upper and lower bounds on quantities such as
  (1), (2), (3)"*. **The check closes only halfway.** The escape those sentences
  name is enlarging the *input* class, not appending a *deduction*, so §2.1's
  primality-detection step is not an instance of it and §2.1 is corrected in
  place. What survives is that the obstruction's forbidden set is extensional,
  which exempts the bare congruence-defined tile statement and does not exempt
  the zone form the reduction uses. **The scoping argument is therefore live for
  the tile statement and dead for the zone statement**, and §3(a), which already
  said a lower bound on the zone's twin-slot count is the canonical
  parity-blocked quantity, is the section that carries the weight.
- A trap worth recording, because it nearly entered §3(d): the first web search
  of this session returned a summary asserting that Jacobsthal's function
  appears in the Wikipedia parity-problem article and that the
  Maier–Pomerance conjecture is discussed there. **Both articles were then
  fetched and neither mentions Jacobsthal at all.** The summary was a synthesis
  across unrelated results. The negative in §3(d) rests on the fetched
  articles, not on that summary.

---

*Staging note. Nothing here is a result. Under the doc convention, if any
proposal in §5 is applied, the closure narrative stays with this record and the
live layer takes only the replacement text.*
