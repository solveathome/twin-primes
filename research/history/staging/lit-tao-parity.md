# lit-tao-parity — Tao's general parity obstruction, read at source: its hypotheses are extensional, which moves where the wall sits on our own reduction

<!-- ledger
id: Q-obstruction-audit
status: ANSWERED
todo: none
question: Is the wall named parity the right name for what blocks G2(x#) < x'^2 - 2?
verdict: Read at source, the audit's central reason does not survive: Tao's forbidden is defined extensionally rather than intensionally, so the primality-detection step in the reduction does not put the method class outside the obstruction, and where the wall sits on our own reduction moves accordingly; the proposed text for paper/wall-note.md is left unapplied.
-->

> **RIDER 2026-09-04 (orchestrator, from `derive-0904-r0-extension.md` and
> its red team `redteam-0904-r0-extension.md`).** The zone property at line
> ~313 bounds one coordinate, `x < l₁ < x′²`. Tao's H4 quantifies over the
> `l_i` independently and the forms never enter the property, so as written
> this is his Example 2 (one forced prime), forbidden set {(+1,+1), (+1,−1)},
> origin outside the hull, and H5 FAILS. The verdict this note draws is right;
> the property that carries it bounds both coordinates: `x < l₁, l₂ < x′²`.
> The alternative repair "keep l₂ = l₁ + 2 and bound only l₁" does not work
> (the verdict flips 27 times over p = 7..199 on the red team's producer).

*(Staging note, 2026-08-27. A literature read, not an attack. No script was run,
no repo file outside this one was touched, no git command was issued. Every
claim carries a calibration marker (PROVEN / VERIFIED / MEASURED / HEURISTIC /
CONJECTURED / REFUTED) and every source statement a provenance marker
([SOURCED] = read at a real page this session; [SOURCED-BIB] = bibliography
entry verified, statement not opened; [MEMORY] = not reached at any source).
Proposed text for `paper/wall-note.md` is in §4 and is **not applied**.)*

---

## Provenance

**Reached at source, in full, this session:**

| artifact | route | sha256 |
|---|---|---|
| Tao, *A general parity problem obstruction*, What's new, 21 Nov 2014 (post + all 12 comments) | `curl` from Bash, `https://terrytao.wordpress.com/2014/11/21/a-general-parity-problem-obstruction/` | `7867a797ee33d1a5d370f2263a076f03718f32da8bdfaaad7a143cc4c6ded27e` (HTML as served) |
| Tao, *Open question: The parity problem in sieve theory*, What's new, 5 Jun 2007 (post + comments through 2022) | `curl` from Bash, same host | `6ad7a8e4d28a853552537b9d1369a5c5eecfde9f20694835e778a0b64ca2eb67` |
| Friedlander–Iwaniec, *Asymptotic sieve for primes*, Ann. of Math. **148** (1998) 1041–1065 | arXiv `math/9811186v1`, PDF, `pdftotext -layout` | `d39f5249d9003a8a7ce121c93e785dcffa2dfb5ccc9e728820a705826d953d1f` |

Text was pulled from the HTML by a local script that rewrites Tao's LaTeX
`<img alt="...">` tags back into their alt text, then read end to end, both
posts and both comment threads. The FI paper was read at §1 in full (pp.
1041–1046, the hypotheses and Theorem 1) and its reference list.

**The 403 is a fetcher problem, not a paywall, and this is a channel finding
worth keeping.** The corpus recorded two prior HTTP 403s on this URL. This
session reproduced the 403 through the `WebFetch` tool and then got **HTTP 200,
295,372 bytes** from `curl` in Bash on the identical URL — with a browser
user-agent, with `curl/8.7.1` as the user-agent, and with **no** user-agent at
all. All three returned 200. So `terrytao.wordpress.com` is not blocking on
user-agent; it is blocking whatever egress or header set `WebFetch` presents.
**Rule for the next wave: a 403 from `WebFetch` on a wordpress.com host is not
evidence the page is unreachable — retry with `curl` from Bash before recording
a negative.** Wayback was not needed (it answered 302 to its own snapshot
chain); no search-engine cache, mirror, or citing-paper fallback was used,
because the primary was in hand within one call.

**Not reached, and not needed for anything claimed below:** Selberg, *On
elementary methods in prime number theory and their limitations*, Proc. 11th
Scand. Math. Cong. Trondheim (1949), Collected Works I 388–397 [SOURCED-BIB —
verified in FI's reference list as `[S]`]; Bombieri, *The asymptotic sieve*,
Mem. Acad. Naz. dei XL **1/2** (1976) 243–269 [SOURCED-BIB — FI's `[B]`].
Selberg's parity example itself **was** reached, in Friedlander and Iwaniec's
own words on p. 1045, quoted in §3 below, so nothing here rests on the 1949
volume.

**Search-convention note.** No absence is asserted in this note except two, and
both are absences *inside artifacts read at source* — the string "dimension"
does not occur in the 2014 post, and neither post mentions a sifting parameter.
Those are file-level facts about documents in hand, not literature negatives, so
`research/SEARCH-CONVENTIONS.md` §1 does not apply to them. No new
owning-convention search was run this session.

---

## 0. The verdict, disconfirming half first

**The disconfirming half, and it is the main finding.**
`attack-obstruction-audit.md` §2.1 rests its central move on a specific reason:
the reduction `G₂(x#) < x′² − 2 ⟹ TPC` "runs through … a **primality-detection
step**, and it is precisely the thing an axiom-only sieve does not possess", so
the method class is not closed under the reduction and the obstruction does not
transfer. **Read against the actual text, that reason does not survive, for two
independent reasons.** [PROVEN, in the sense that both are one-line checks
against quoted text; the consequences drawn from them are lower-rung and marked
where they occur.]

1. **Tao's "forbidden" is defined extensionally, not intensionally.** [SOURCED]
   A sign pattern is forbidden by `P` "if there does not exist any natural
   numbers `l₁,…,l_k` obeying `P(l₁,…,l_k)`" with that Liouville pattern. The
   test is run on the *extension* of `P` — which tuples satisfy it — and never
   on how `P` is written. A property defined by congruences that happens to
   *coincide* with a primality property on its own domain therefore carries the
   primality property's forbidden set exactly. §2 works this through for the
   zone.
2. **The escape Tao names is enlarging the *input*, not appending a
   *deduction*.** [SOURCED] The post's sentence is: the obstruction "does not
   prevent the establishment of an `n` such that `P(…)` holds **by introducing
   additional sieve axioms beyond upper and lower bounds on quantities such as
   (1), (2), (3)**". A primality-detection step applied *after* the sieve has
   produced an `n` is not an axiom, is not an input, and does not appear in the
   sums the reweighting argument leaves invariant. The audit invoked an escape
   the source does not name.

The audit's *conclusion* for the counting routes was already right and is
unmoved — its own §3(a) says "Every zone twin slot **is** a twin prime … a lower
bound on the zone's twin-slot count is a lower bound on twin primes in a short
interval, which is the canonical parity-blocked quantity. **Nothing in this note
weakens this.**" What this note corrects is that §2.1's exemption argument
cannot be used to lift §3(a) off the tile-side route. The two sections of that
audit were in tension and the source settles it in §3(a)'s favour.

**Second disconfirming item, on question 4.** The 2014 post contains **no**
occurrence of the word "dimension", names **no** sifting parameter, and has no
parameter in Claim 1 at all — the hypothesis is a purely convex-geometric
condition on a finite set of sign patterns. [SOURCED, by exhaustive grep of the
extracted post text plus a full read.] There is therefore **no distinguished
behaviour at depth 2 for a dimension-2 sieve in this source**, and the corpus's
`u = 2` arrival gets no support from it. Worse for the tidy story: the escape
hatch, Friedlander–Iwaniec Theorem 1, is a **κ = 1 instrument as stated** — its
hypothesis (1.9) is `Σ_{p≤y} g(p) = log log y + c + O((log y)^{-10})`, which
pins the sieve dimension at exactly 1. [SOURCED, FI p. 1042.] §5 works out what
that costs a κ = 2 frame.

**Third, on question 3.** Bilinear input is **not** the only escape the sources
name. Across the two posts they name six distinct ones, of which two are
explicitly available in the 2014 post beside the Friedlander–Iwaniec route. §3
lists all six with the source's own wording and the source's own pricing of
each. This does not open anything — five of the six are already priced in this
corpus and the sixth is priced *by Tao himself* as dead for the primes.

**What actually moved.** Three things, all documentary: an exact sourced
statement of the hypotheses replacing five paraphrases (§1); a definite answer
on the finite-periodic question that is *narrower* than the corpus's current one
(§2); a complete escape list with the norm-form constraint attached (§3).

**Confidence that anything in this note opens a route: 0.02.** Lower than the
audit's 0.05, because this note's net effect is to close the audit's exemption
rather than to widen it. Nothing here moves an exponent, a constant, or a
certificate.

---

## 1. The obstruction's hypotheses, as sourced

All quotations [SOURCED], Tao 2014, read at the page. Backslash-escaping is
Tao's own LaTeX, rendered here in plain notation.

### 1.1 The setting

> "given a collection of (affine-)linear forms `L₁(n),…,L_k(n)`, **none of which
> is a multiple of any other**, find a number `n` such that a certain property
> `P(L₁(n),…,L_k(n))` of the linear forms … are true."

**H1 (forms).** `k` affine-linear forms, none a constant multiple of another.
This is load-bearing: Remark 1 of the same post is the escape that comes from
*violating* it.

**H2 (target shape).** The goal is existential: find *an* `n` with
`P(L₁(n),…,L_k(n))`.

### 1.2 The method class — this is what the obstruction is about

> "First, one chooses a carefully selected sieve weight `ν: N → R⁺`, which could
> for instance be a non-negative function having a divisor sum form
> `ν(n) := Σ_{d₁|L₁(n),…,d_k|L_k(n); d₁…d_k ≤ x^{1−ε}} λ_{d₁,…,d_k}` …
> Next, one uses tools from analytic number theory (such as the
> Bombieri-Vinogradov theorem) to obtain upper and lower bounds for sums such as
> `Σ_n ν(n)` (1) or `Σ_n ν(n) 1_{L_i(n) prime}` (2) or more generally of the
> form `Σ_n ν(n) f(L_i(n))` (3) … Using some combinatorial arguments, one
> manipulates these upper and lower bounds, together with the non-negative
> nature of `ν`, to conclude the existence of an `n` in the support of `ν` …
> for which `P(L₁(n),…,L_k(n))` holds"

**H3 (method).** The argument's entire arithmetic input is upper and lower
bounds on (1), (2), (3) for one or more non-negative sieve weights, and its
conclusion is reached by combinatorial manipulation of those bounds plus
`ν ≥ 0`. **The conclusion produced is "there exists `n` in the support of `ν`
with `P`".** [SOURCED]

Note what H3 is *wider* than the corpus's `M`. `attack-obstruction-audit.md`
§2.1 defines the obstructed class as "arguments whose entire input about the
sifted set is the congruence data `|A_d| = g(d)X + r_d`". Tao's H3 admits (2)
and (3) as well — sums of `ν` against `1_{L_i prime}` and against arbitrary
arithmetic `f` such as a Dirichlet convolution. **The corpus's `M` is a proper
subset of Tao's obstructed class**, so "not in `M`" is weaker than "not
obstructed", and the audit's exemption test was run against the wrong boundary.
[PROVEN — comparison of two written definitions.]

### 1.3 The forbidden-pattern definition — extensional

> "Given a property `P(l₁,…,l_k)` of `k` natural numbers `l₁,…,l_k`, we say that
> a sign pattern `(ε₁,…,ε_k)` is **forbidden** by `P` if **there does not exist
> any natural numbers `l₁,…,l_k` obeying `P(l₁,…,l_k)`** for which
> `(λ(l₁),…,λ(l_k)) = (ε₁,…,ε_k)`."

**H4 (forbidden set).** Computed from the extension of `P`. §0's item 1 and §2
turn on exactly this word "obeying".

### 1.4 Claim 1, verbatim

> **"Claim 1 (Parity obstruction)** Suppose `P(l₁,…,l_k)` is such that that
> [sic] the convex hull of the forbidden sign patterns of `P` contains the
> origin. Then one cannot use the above sieve-theoretic approach to establish
> the existence of an `n` such that `P(L₁(n),…,L_k(n))` holds."

**H5 (the hypothesis proper).** `0 ∈ conv{forbidden sign patterns}`.

### 1.5 What Claim 1 is not

> "This claim is **not precisely a theorem**, because it presumes a certain
> 'Liouville pseudorandomness conjecture' (a very close cousin of the more well
> known 'Möbius pseudorandomness conjecture') which is a bit difficult to
> formalise precisely."

**H6 (the standing conjecture).** Liouville pseudorandomness, in the form: the
sums `Σ_n ν(n) Q(λ(L₁(n)),…,λ(L_k(n)))`, `Σ_n ν(n) Q(…) 1_{L_i(n) prime}` and
`Σ_n ν(n) Q(…) f(L_i(n))` are asymptotically negligible for `Q` a linear
combination of squarefree monomials of degree ≥ 2. [SOURCED, from the proof.]

**Calibration for our use.** Claim 1 is at rung **CONJECTURED**, by its author's
own sentence, and its status is exactly that of a widely believed unformalised
principle. It is not a theorem and this corpus may not cite it as one. What it
*is*, and this is the useful part, is a **decision procedure**: given a target
property, compute its forbidden sign patterns and test whether the origin lies
in their convex hull. That test is a finite computation and it is checkable.

### 1.6 The proof, and the sharpness converse

The proof is the reweighting: from `H5`, build non-negative `p_ε` supported on
forbidden patterns, summing to 1, with `Σ_ε p_ε ε_i = 0` for every `i` (the
mean-zero condition is what kills the linear terms); Fourier-expand
`p_ε = 1 + Q(ε)` with `Q` carrying only squarefree monomials of degree ≥ 2; set
`w(n) := 1 + Q(λ(L₁(n)),…,λ(L_k(n)))`. Then `w ≥ 0`, `w` is supported **only**
on `n` whose Liouville pattern is forbidden, and by `H6` all of (1), (2), (3)
are unchanged when `ν` is replaced by `νw`. So any H3-argument producing an `n`
in `supp(ν)` with `P` also produces one in `supp(νw)` with `P` — and there is
none. [SOURCED.]

**The converse, which the post also gives.** If `0 ∉ conv{forbidden}`, then by
Hahn–Banach in hyperplane-separation form there are reals `c₁,…,c_k` with
`c₁ε₁ + … + c_kε_k < −c` for all forbidden patterns and some `c > 0`; Liouville
pseudorandomness makes `Σ_n ν(n)(c₁λ(L₁(n)) + … + c_kλ(L_k(n)))` negligible, so
some `n ∈ supp(ν)` has a non-forbidden pattern. "This does not actually imply
that `P(…)` holds, but it does not prevent `P(…)` from holding purely from
parity considerations." [SOURCED] So H5 is **sharp** for this style of
obstruction.

### 1.7 The worked cases, and the twin case

[SOURCED] Example 3 is ours: `P(l₁,l₂)` = both prime; forbidden are
`(+1,+1)`, `(+1,−1)`, `(−1,+1)`; the origin is `½(+1,−1) + ½(−1,+1)`; H5 holds;
obstructed. The explicit `w` is `w(n) = 1 − λ(L₁(n))λ(L₂(n))`, which vanishes
on twin primes and is 2 whenever the two Liouville values disagree.
[PROVEN — the `p_ε` construction of §1.6 carried out for `k = 2`.]

And the general count, in Tao's words:

> "the property 'at least `j` of the `k` numbers `l₁,…,l_k` is prime' is subject
> to the parity obstruction as soon as `j ≥ k/2 + 1`. Thus, **the largest number
> of elements of a `k`-tuple that one can force to be prime by purely
> sieve-theoretic methods is `k/2`, rounded up.**"

**Three different 2s, and this corpus mixes them.** [PROVEN — they are three
distinct quantities.] Naming them separately is a documentary deliverable of
this note:

| the 2 | what it is | where it comes from | where the corpus uses it |
|---|---|---|---|
| **the parity factor 2** | a sieve upper bound is off by ≥ 2; equivalently only `⌈k/2⌉` of `k` forms can be forced prime | Selberg 1949 via Tao 2007 and 2014 [SOURCED] | `natal-cap-10-sieve-cap.md` §2 Regime 2, "floor 2 against 1.28 needed @17"; `wall-note.md` §2 Face 1 |
| **the sifting depth `u = 2`** | sifting up to `N^{1/2}`, where a survivor becomes a prime and where `f(u) = 2e^γ log(u−1)/u` vanishes | Granville, transcribed in `covering-dive.md` §1.2 [MEMORY for the original; corpus-internal quote] | `attack-obstruction-audit.md` §0; the four-object `u = 2` arrival |
| **the sieve dimension `κ = 2`** | two residue classes struck per prime; `β₂ = 4.26645` | Diamond–Halberstam Table 17.1 | `wall-note.md` §2 Face 4 |

**None of the three is derivable from either of the others**, and Tao 2014
speaks only to the first. Any sentence that lets one of these three numbers
carry the authority of another is a compression, and `wall-note.md` §2 Face 1
currently has the first and Face 4 the third with nothing between them saying
they are different objects.

---

## 2. The finite-periodic question

This is the section `paper/wall-note.md` does not own, and the answer is in two
halves that point opposite ways. **The disconfirming half is second and it is
the one that binds.**

### 2.1 The bare tile statement is not obstructed, for a reason sharper than the corpus's

Take `P_tile(l₁,l₂)` := "`l₁` and `l₂` are both coprime to `x#`" — the property
of a twin-admissible slot in the tile, as a property of natural numbers, which
is what H4 requires. Its forbidden set is **empty**: for any target pattern
`(ε₁,ε₂) ∈ {±1}²` one can exhibit `l₁, l₂` coprime to `x#` realising it,
choosing each independently as a prime `> x` (`λ = −1`) or a product of two such
(`λ = +1`). The convex hull of the empty set contains nothing, so H5 fails.
[PROVEN — two lines, given H4.]

The same holds for any property defined by congruence conditions alone: every
reduced residue class mod `q` contains numbers of both Liouville signs, so a
congruence-defined `P` has no forbidden patterns and Claim 1 is vacuous on it.
[PROVEN, modulo Dirichlet.] **This is a stronger and cleaner version of the
corpus's current answer** — the audit reasoned that the method class is not
closed under the reduction; the real reason is that the hypothesis of Claim 1 is
not satisfiable by a congruence-defined target at all. The obstruction is not
"inapplicable in practice" to a finite periodic object; its hypothesis is
**unsatisfiable** there.

Two independent confirmations that this is the right reading. First, Tao's own
converse (§1.6): with the forbidden set empty, `0 ∉ conv{}` trivially, and Tao
says "we do not expect a parity obstruction of the type in Claim 1 to hold"
there. [SOURCED] Second, Friedlander–Iwaniec's diagnostic (§3.2 below): Selberg's
parity example fails their hypothesis (B) because `μ(d)r_d(x)` has constant sign
in long intervals; a periodic sequence's remainder is bounded and does not have
that behaviour, so no periodic sequence is a parity example in their sense
either. [SOURCED, FI p. 1045.]

### 2.2 And the reduction destroys that, because H4 is extensional

Now take the property the reduction actually uses. The corpus's route needs a
twin-admissible slot **in the zone**, i.e.

> `P_zone(l₁,l₂)` := "`l₁, l₂` are both coprime to `x#`, and `x < l₁ < x′²`".

Its forbidden set is **not** empty. On the zone, an `x`-rough number below `x′²`
is prime (`ZONE-POSTULATE.md` §3), so the extension of `P_zone` is exactly the
set of twin-prime pairs in `(x, x′²)`. By H4 the forbidden set is computed from
that extension. It is Example 3's: `(+1,+1)`, `(+1,−1)`, `(−1,+1)`. The origin
is in its convex hull. **H5 holds and Claim 1 applies.** [PROVEN, given H4 and
the zone-crystallization theorem — the only step with content is that H4 reads
the extension, and §1.3 quotes it.]

So the finite-periodic exemption is real and it evaporates at exactly the point
where the reduction bites. The obstruction does not care that `P_zone` is
*written* with no prime in it. This is the precise, sourced form of the audit's
"relabel, don't reallocate", and it puts the relabelling one step earlier than
the audit put it.

**What survives, and it is not nothing.** The obstruction attaches to H3
arguments — those whose whole arithmetic input is (1), (2), (3) against a
non-negative weight. A proof of `G₂(x#) < x′² − 2` that is **extremal or
combinatorial** — a covering argument, an explicit construction, a pigeonhole
over `Z/x#` with no sieve weight anywhere — has no `ν` to reweight and Claim 1's
proof has no purchase on it. That is Door 5, and `attack-obstruction-audit.md`
§3(c) already names its true barrier as an absence of technology rather than an
obstruction. **This note's net effect on the corpus's map is to move Face 1's
route from "exempt by scoping" to "obstructed, with the exemption living only at
Door 5".** [HEURISTIC for the map-level statement; the two component claims are
at PROVEN.]

### 2.3 Is the obstruction inherently asymptotic? Yes, and this cuts both ways

Claim 1's *statement* has no asymptotic parameter. Its *proof* has one
everywhere: H6's negligibility is an asymptotic in the sieve's scale parameter
`x`, and the sieve weight's own truncation is `d₁…d_k ≤ x^{1−ε}`. [SOURCED.]
There is no form of Claim 1 that says anything about a single finite level.

**Consequence, and it is a wall-address worth having.** Every computation this
corpus performs is at one finite level, and is therefore neither obstructed by
parity nor evidence against parity. A tile at level `x` that is populated with
survivors is not a parity-evading object; it is an object about which the
obstruction is silent by type. **`β(x) > 0` measured at ten levels through
`x = 41` is not, and can never be, evidence that the obstruction is soft.**
[PROVEN — the obstruction quantifies over the asymptotic and the measurements do
not reach it.] The corpus does not currently say this anywhere, and Face 1's
table of ten `β` values sits without it.

### 2.4 One sourced item on Face 1's "infinitely often" formulation

`wall-note.md` §2 Face 1 carries a second sufficient statement: "if `S(x) ≥ 1`
for infinitely many `x`, twin primes are infinite. No density, no positivity,
only non-annihilation infinitely often." Tao addressed the general shape of that
formulation in a comment on the 2007 post, 22 April 2022, replying to a
questioner who asked whether the parity argument really rules out a very weak
lower bound [SOURCED, comment thread read at the page]:

> "Now it is true that this obstruction still does not rule out the possibility
> that one could maybe introduce a sieve that has a non-trivial, non-uniform
> bound that holds for infinitely many `N` but not all `N`, but this would be a
> **very unusual species of sieve that does not resemble any existing sieve**
> (which, if it works at all, would work for all sufficiently large `N`, rather
> than for just a subset of `N`). Furthermore, such a sieve by its nature would
> have to be **sensitive to the fluctuations of the Liouville function** and so
> controlling such a sieve seems to be of **comparable difficulty to the type of
> problem one is trying to attack in the first place**."

**Reading, calibrated.** This neither opens nor closes Face 1's second
statement. It says the infinitely-often quantifier is a genuine gap in the
obstruction's coverage, and prices closing it as no easier than the original
problem. [SOURCED for the quotation; the reading is HEURISTIC.] Face 1 currently
presents the infinitely-often form as a *weakening* of the requirement, and this
is the first sourced statement in the corpus that the weakening buys a
qualitatively different and not obviously easier kind of argument.

---

## 3. Every escape the sources name

Six, and bilinear input is one of them. Tao 2014 names three; Tao 2007 names
three more.

### 3.1 Named in the 2014 post

**E1 — Siegel zeros.** [SOURCED]

> "there are scenarios, most notably the 'Siegel zero' scenario, in which there
> is a **severe breakdown of this pseudorandomness conjecture, and the parity
> obstruction then disappears**. A typical instance of this is Heath-Brown's
> proof of the twin prime conjecture (which would ordinarily be subject to the
> parity obstruction) under the hypothesis of a Siegel zero."

Corpus status: already held. `attack-obstruction-audit.md` §3(d) has Heath-Brown
1983 via `bv-import-survey.md` §2, and Granville arXiv:2010.01211 on the other
side. Not a route either way; the axis pinches from both directions.

**E2 — additional sieve axioms.** [SOURCED]

> "The obstruction also **does not prevent** the establishment of an `n` such
> that `P(L₁(n),…,L_k(n))` holds **by introducing additional sieve axioms beyond
> upper and lower bounds on quantities such as (1), (2), (3)**. The proof of the
> Friedlander-Iwaniec theorem is a good example of this latter scenario."

This is the escape, stated generally: enlarge the *input class*, so that the
reweighting `ν → νw` no longer leaves the argument's data invariant. FI's
hypothesis (B) is one instance, not the definition of the escape. **It also
settles the check `attack-obstruction-audit.md` §6 left open** — that note
recorded a search-engine summary reporting these two sentences, flagged that a
summary is not a reading, and called it "the largest hole in this note". The
summary was accurate. The general form is scoped to the method class and is
explicitly stated to be bypassable by enlarging it. [SOURCED — hole closed.]

**E3 — linear forms that are constant multiples of each other.** [SOURCED,
Remark 1]

> "Another way to get past the parity problem in some cases is to take advantage
> of **linear forms that are constant multiples of each other** (which
> correlates the Liouville functions to each other). For instance, on GEH we can
> find two `E₃` numbers … that differ by exactly 60; a direct sieve approach
> using the linear forms `n, n+60` fails due to the parity obstruction, but
> instead one can first find `n` such that two of `n, n+4, n+10` are prime, and
> then among the pairs `(15n, 15n+60)`, `(6n, 6n+60)`, `(10n+40, 10n+100)` one
> can find a pair of `E₃` numbers that differ by exactly 60."

This is the escape by violating H1. Goldston–Graham–Pintz–Yıldırım is the
reference given. **Tao closes it himself for the primes**, in a comment dated 19
December 2018 [SOURCED]:

> "The trick of using reducible linear forms can only generate almost primes
> that contain **very small prime factors** such as 2, 3, 5, and these are a
> **zero density subset** of the almost primes and so cannot be picked up by
> sieves such as the Bombieri sieve (indeed one of the very first things such
> sieves do is throw out all numbers that are divisible by very small primes).
> Basically, numbers which are divisible by very small primes are totally
> unhelpful for finding primes … which is why the Remark 1 loophole around the
> parity problem can be used for problems involving such classes of numbers, but
> **not for the primes themselves**."

Corpus status: **new to the corpus as a named escape, and dead on arrival for
us.** Our forms are `n` and `n+2`, neither a multiple of the other, and the
whole tile construction is built on coprimality to `x#`, i.e. on *excluding*
exactly the small-prime-divisible numbers this loophole needs. Recording it so
nobody re-derives it. [SOURCED for both quotations; the "dead for us" reading is
PROVEN, since the tile's defining condition and the loophole's requirement are
complementary.]

### 3.2 Named in the 2007 post

**E4 — the multiplicative structure of primes inside the almost primes.**
[SOURCED] The Erdős–Selberg elementary PNT. Tao's own verdict, in the same
sentence: "This method unfortunately does not seem to generalise well; **for
instance, the product of twin primes is not a twin almost prime.**" Closed for
us by the source.

**E5 — bilinear / Type-II information.** [SOURCED] Friedlander–Iwaniec on
`a² + b⁴`, via Vaughan's identity, "which is sort of like an exact sieve, but
with a (non-smooth) error term which has the form of a **bilinear sum, which
captures correlation with the Liouville function**"; Heath-Brown on `a³ + 2b³`;
Heath-Brown–Moroz; Helfgott; Iwaniec on quadratic forms. **And the constraint,
in Tao's words and worth carrying:**

> "These methods all seem to require that **the form be representable as a norm
> over some number field** and so it does not seem as yet to yield a general
> procedure to resolve the parity problem."

`attack-bilinear-transplant.md` closed this family for our frame yesterday on
the ground that every bilinear object the corpus owns is bilinear over *moduli*.
The norm-form constraint is a **second, independent** reason, from the source,
and it is not in that note: `n(n+2)` is not a norm form over any number field,
so even a frame that did host a genuine element-bilinear object would not be in
the family that has ever broken parity in print. [SOURCED for the constraint;
the application to `n(n+2)` is HEURISTIC — I did not verify that no
representation exists, only that none is in the cited family.]

**E6 — combinatorial parlay from almost-prime asymptotics.** [SOURCED] Precise
asymptotics on almost primes plus lower bounds on primes plus pigeonhole:
GPY/Goldston–Yıldırım–Pintz, and Tao explicitly notes the parity-compatible
arithmetic — "the parity problem predicts that one cannot hope to do any better
than showing that `|A₁|, |A₂|, |A₃| ≥ |A|/2`, so the above inequality
`|A₁|+|A₂|+|A₃| > |A|` is not ruled out". Green–Tao's relative Szemerédi is
described as the same shape with the relative-density theorem replacing the
pigeonhole. This is the `⌈k/2⌉` statement of §1.7 in its constructive form:
**it does not reach `k = 2, j = 2`, which is ours.**

### 3.3 Friedlander–Iwaniec's own hypotheses, since E2/E5 point there

[SOURCED, FI 1998 §1, pp. 1041–1046.] For `A = (a_n)` non-negative, supported on
squarefree `n` (1.16), with `A(x) = Σ_{n≤x} a_n ≫ A(√x)(log x)²` (1.4):

- `A_d(x) ≪ d^{-1} τ(d)⁸ A(x)` uniformly for `d ≤ x^{1/3}` (1.6);
- `A_d(x) = g(d)A(x) + r_d(x)` with `g` multiplicative, `0 ≤ g(p) < 1`,
  `g(p) ≪ p^{-1}` (1.8);
- **`Σ_{p≤y} g(p) = log log y + c + O((log y)^{-10})` (1.9)**;
- **(R)** `Σ_{d≤D} μ²(d)|r_d(t)| ≤ A(x)(log x)^{-2^{22}}` for all `t ≤ x`, with
  **(R1)** `x^{2/3} < D(x) < x`;
- **(B)** `Σ_m |Σ_{N<n≤2N, mn≤x} γ(n)μ(mn)a_{mn}| ≤ A(x)(log x)^{-2^{22}}` for
  every `N` with **(B1)** `Δ^{-1}√D < N < δ^{-1}√x`, where
  **(B2)** `γ(n,C) = Σ_{d|n, d≤C} μ(d)` and **(B3)** `1 ≤ C ≤ xD^{-1}`.

**Theorem 1.** Under those, `Σ_{p≤x} a_p log p = HA(x)(1 + O(log δ / log Δ))`,
with `H = Π_p (1−g(p))(1−1/p)^{-1}`.

Four things in that list matter to this corpus and three of them are new here.

1. **(1.9) fixes the dimension at κ = 1.** `Σ_{p≤y} g(p) = κ log log y + c` is
   the definition of a dimension-`κ` sieve; FI's constant is 1. [PROVEN, given
   the standard definition.] FI say "some of the information about the
   multiplicative function `g` is stronger than necessary" and that (1.9) "is
   not crucial for breaking the parity problem" — but they say that about its
   *strength*, and the published theorem is the κ = 1 statement. Whether a κ = 2
   analogue exists is **not addressed in this paper**. [SOURCED for the
   statement; CONJECTURED for anything beyond it.]
2. **The level required is above `x^{2/3}`.** (R1) demands `D > x^{2/3}`, and FI
   add that "(B) can be realistic only if `D` is somewhat larger than
   `x^{2/3+ε}`". That is above Bombieri–Vinogradov and inside
   Elliott–Halberstam territory. [SOURCED]
3. **FI name the twin problem and say what stops them.** [SOURCED, p. 1045]
   > "we certainly expect that the sieve given here is quite capable of settling,
   > for instance, the twin prime problem. The stumbling block is that in this
   > case we **have no idea how to prove that the relevant sequence satisfies the
   > condition (B)**. Even proving (R) to such a high level is currently beyond
   > reach."
   This is the escape hatch's authors saying the hatch is not open for twins, in
   1998, and naming both hypotheses as unreachable.
4. **(B)'s content is Möbius sign cancellation, which is exactly what a signless
   object cannot supply.** [SOURCED, p. 1045]
   > "the **source of cancellation** in the bilinear form in (B) comes from **the
   > sign changes of the Möbius function `μ(mn)`** in the inner sum"
   `attack-bilinear-transplant.md` (N2) found that our candidate product map
   "carries no signs, which is why it counts and does not cancel". FI's sentence
   is the source-side confirmation of that closure: an object with no signs
   cannot satisfy (B), because (B) *is* the assertion that the signs cancel.
   [SOURCED for FI; the join to (N2) is PROVEN as a matching of two statements,
   and it strengthens an existing closure rather than opening anything.]

**And Selberg's parity example, in FI's own words** [SOURCED, p. 1045] — this is
the closest to a primary the session reached, and it makes the 1949 volume
unnecessary:

> "Let `A = (a_n)` with `a_n = ½(1 + λ(n))` where `λ` is the Liouville function
> so `a_n` is the characteristic function of the integers having an even number
> of prime factors, in particular `a_p = 0` for every `p`. This sequence
> satisfies (R) with `D = x^{1−ε}` but **fails to satisfy (B)** … Indeed we have
> `2r_d(x) = λ(d) Σ_{ℓ ≤ x/d} λ(ℓ) + O(1)`. Thus `μ(d)r_d(x)` has **constant
> sign in long intervals**, namely for all `d` satisfying `x/(L+1) < d ≤ x/L`
> with any integer `L < √x`."

Note the parenthetical FI attach: "Of course such a sequence is rather
artificial". That is the same observation `attack-obstruction-audit.md` §3(d)
made independently — Selberg's examples are not instances of the problem, they
constrain what the axioms determine. The audit's reading is confirmed by the
source. [SOURCED]

---

## 4. What changes in `paper/wall-note.md`

Two insertions and one correction. **All proposed, none applied.** They are
documentary; no number, exponent, or route status changes.

### 4.1 New, at the head of §2 (the four faces) — the finite-periodic address

`wall-note.md` does not currently own a sentence on whether the obstruction can
even be stated about a finite periodic object. Proposed insertion, immediately
after the paragraph "**How to read a door and a face**":

> **What the obstruction can and cannot be stated about.** Tao's general form of
> the parity obstruction (2014, read at source) is a test on a target property
> `P` of `k` numbers: compute the Liouville sign patterns that no tuple
> satisfying `P` realises, and ask whether the origin lies in their convex hull.
> The test is run on `P`'s *extension* — which tuples satisfy it — and never on
> how `P` is written. Two consequences fix where the obstruction sits on this
> programme, and they point opposite ways. A property defined by congruences
> alone forbids no sign pattern at all, because every reduced class carries
> numbers of both Liouville signs; so the bare tile statement, `G₂(x#) < x′² −
> 2`, does not satisfy the obstruction's hypothesis, and no parity theorem
> names it. But the reduction to the conjecture uses the tile only inside the
> zone, where an `x`-rough number is prime, and there the property's extension
> *is* the set of twin-prime pairs — so the zone form carries exactly the
> forbidden set of "both prime" and the obstruction applies to it in full. The
> exemption is real and it is one step narrower than it looks: it covers Door 5,
> which uses no sieve weight to reweight, and it does not cover any route that
> proves the zone statement by bounding sums against a non-negative sieve
> weight. Separately, the obstruction is asymptotic in its mechanism and silent
> at every finite level, so no computed level — not the ten `β` values below,
> not any tile — is evidence about it in either direction.

### 4.2 New, in §2 Face 1, after the `β` table's three results

Proposed insertion after "the floor is 2 against the constant 1.28 the weak form
needs at x = 17":

> Three different 2s meet in this programme and they are not the same object.
> The **parity factor 2** is Selberg's: a sieve upper bound is off by at least
> that factor, equivalently only `⌈k/2⌉` of `k` linear forms can be forced prime
> by sieve methods alone (Tao 2014, Claim 1 and the `j ≥ k/2 + 1` corollary).
> The **sifting depth `u = 2`** is where a survivor of the sift becomes a prime
> and where the `κ = 1` lower-bound function vanishes. The **sieve dimension
> `κ = 2`** is our two classes per prime, and carries `β₂ = 4.26645`. None of
> the three implies either of the others, the general obstruction speaks only to
> the first, and Friedlander–Iwaniec's asymptotic sieve — the instrument that
> defeats the first, given a bilinear hypothesis — is stated at `κ = 1` (its
> hypothesis (1.9) reads `Σ_{p≤y} g(p) = log log y + c`), so it is not an
> instrument our dimension can pick up as published.

### 4.3 Correction, in §2 Face 1, on the infinitely-often statement

**Current:** "Second, a weaker sufficient statement (proven): if `S(x) ≥ 1` for
infinitely many `x`, twin primes are infinite. No density, no positivity, only
non-annihilation infinitely often."

**Proposed:** unchanged, with one sentence appended:

> The weakening is real as a logical requirement and it is not obviously a
> weakening as a proof target: Tao's own reply to this exact question (2007
> post, comment of 22 April 2022) is that the obstruction does not rule out a
> sieve giving a non-uniform bound for infinitely many `N` but not all, while
> pricing such a thing as "a very unusual species of sieve that does not
> resemble any existing sieve", one that "would have to be sensitive to the
> fluctuations of the Liouville function", and therefore "of comparable
> difficulty to the type of problem one is trying to attack in the first place".

### 4.4 Outside this note's scope, flagged for the orchestrator

`attack-obstruction-audit.md` §2.1's exemption argument — that the reduction's
primality-detection step takes the composite out of the obstructed class — is
not supported by the source and should not be carried into any live file. Its
§5.2 and §5.3 proposed texts both lean on the phrase "parity obstructs a
*method* … and not a *statement*"; that phrasing is fine, but the sentence in
§5.2 that follows it — "the conjecture's tile-side form … mentions no prime and
is a covering question on `Z/x#`, so no parity theorem names it" — is true only
of the *bare* tile form and false of the zone instance the reduction uses. If
that text is applied, §4.1 above is the clause it needs beside it. The audit's
§3(a), §3(c) and §3(d) are all confirmed by the source and need no change.

---

## 5. What would falsify this note

- **§0/§2.2 falls** if H4 is not extensional after all — i.e. if some later
  formulation of the obstruction computes forbidden patterns from `P`'s
  definition rather than its extension. The 2014 post's wording is quoted at
  §1.3 and admits no other reading; a published formalisation of the claim (none
  is cited in the post, and none was searched for this session) could differ.
  **This check has not been run: no attempt was made to find a formal version of
  Claim 1 in the literature.**
- **§3.3's κ = 1 reading falls** if a dimension-`κ` version of FI's asymptotic
  sieve exists in print. FI's own hedge ("some of the information about `g` is
  stronger than necessary") leaves this open and this session did **not** search
  for a higher-dimensional asymptotic sieve for primes. That search is the
  single highest-value follow-up in this note, it has not been run, and the
  owning convention for it has not been identified.
- **§2.1's "congruence-defined properties forbid nothing" falls** if some
  reduced residue class mod `x#` fails to contain integers of both Liouville
  signs. It does not, but the argument leans on Dirichlet plus the observation
  that a product of two primes in suitable classes lands in any target class,
  and that second step is stated here without being written out.
- **§3.2's norm-form application to `n(n+2)` is the weakest claim in the note.**
  Tao's sentence is about the methods in that family, not a theorem that no
  other representation exists. Marked HEURISTIC and should not be quoted harder
  than that.
- Nothing here would be falsified by a new measurement, at any level, of
  anything in this corpus. That is §2.3's point restated: this note is about a
  quantifier that no finite computation reaches.

---

*Staging note. Nothing here is a result. Under the doc convention, if §4 is
applied, the closure narrative stays with this record and the live layer takes
only the replacement text.*
