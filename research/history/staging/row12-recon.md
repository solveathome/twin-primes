# Row 12 recon: the lonely runner conjecture, and the Birkhoff / bounded-remainder branch

<!-- ledger
id: Q-row12-lonely-runner
status: CLOSED
todo: none
question: Does the lonely runner conjecture, or the Birkhoff and bounded-remainder branch, transfer to the Zone Postulate or to G2?
verdict: CLOSED WITH MECHANISM on two independent grounds, either sufficient: the general two-class problem is settled at the trivial bound, and the obstruction Tao names is our own configuration; the Birkhoff branch is subsumed and strictly worse from x = 13, and the row's payoff is a wall address rather than the published anchor the map priced.
-->

**2026-08-20. Literature reconnaissance only; no experiment was run and no live
document was edited. Every claim below carries its source label.**

**Verdict: CLOSED WITH MECHANISM as an import, with two positives banked.**
No theorem from this family transfers to the postulate or to `G₂`, and the
reason is structural rather than a search failure. What the row does deliver is
the calibration the map priced it for, and it delivers it harder than the map
expected: the lonely runner literature contains its own diagnosis of why the
first-moment bound resists improvement, and **the configuration it names as the
obstruction is our configuration** — velocities that are primes, whose Bohr sets
overlap only in a kernel of negligible measure. The payoff class is
**WALL-ADDRESS**, not PUBLISHED-ANCHOR for the exponent; a separate and
unexpected PUBLISHED-ANCHOR candidate turned up in the same family (§5) and is
about wheels, not about `G₂`.

---

## 0. What was read, and at what source

| artifact | label |
|---|---|
| Tao, *Some remarks on the lonely runner conjecture*, arXiv:1701.02048v4, *Contrib. Discrete Math.* 13 (2018) 1–31 | **[SOURCED]** — LaTeX source of v4 pulled from `arxiv.org/e-print`, §1 read in full, statements quoted verbatim below |
| Perarnau–Serra, *The Lonely Runner Conjecture turns 60*, arXiv:2409.20160v3 (2025) | **[SOURCED]** — LaTeX source pulled from `arxiv.org/e-print`; §§1–3, 6, 9, 10, 11 and the open-problem list read in full |
| Grepstad–Lev, *Sets of bounded discrepancy for multi-dimensional irrational rotation*, arXiv:1404.0165v2, *GAFA* 25 (2015) | **[SOURCED]** — LaTeX source, §1 read in full (BRS definition, Hecke–Ostrowski, Kesten, Theorem 1, the measure constraint) |
| Denjoy–Koksma inequality | **[SOURCED via a secondary carrier]** — displayed statement in Carrand, arXiv:2012.07481v2, *Qual. Theory Dyn. Syst.* (2022), DOI 10.1007/s12346-022-00632-8, which attributes it to Herman, *Publ. Math. IHÉS* 49 (1979), Theorem VI.3.1. Herman himself **NOT REACHED** |
| Blanco–Criado–Santos, arXiv:2603.24784v2; Alcántara–Criado–Santos, arXiv:2506.13379 (*Experimental Math.*, prepub. May 2026); Malikiosis–Santos–Schymura, arXiv:2411.06903v2, *Forum Math. Sigma* 13 (2025) e164; Jensen, arXiv:2605.27941v1; Bedert, arXiv:2511.16636v1; Sungkawichai–Trakulthongchai, arXiv:2604.23906v1 | **[SOURCED, abstract only]** — arXiv API metadata, abstracts read verbatim, bodies not opened |
| Furno–Haynes–Koivusalo, arXiv:1803.10559; Das–Furno–Haynes, arXiv:2002.04444, *Moscow J. Comb. Number Th.* 10 (2021) 111–120; Haynes–Koivusalo, arXiv:1402.2125; Etkind–Grepstad–Kolountzakis–Lev, arXiv:2511.21148 | **[SOURCED, abstract only]** |
| Cusick, *View-obstruction problems*, *Aequationes Math.* 9 (1973) 165–170 | **NOT REACHED.** Springer redirects to an authorisation endpoint; zbMATH holds the record (Zbl id 3418244, MSC 52A20/52A30/11J99/11H06) with **no review text**. Its content is carried here only through Perarnau–Serra §3.2, which is read at source |
| Schoenberg, *Extremum problems for the motions of a billiard ball II*, *Indag. Math.* 38 (1976) 263–279 | **NOT REACHED**, carried through Perarnau–Serra §11.3 |
| Chen 1994; Chen–Cusick 1999; Schark 1974; Schark–Wills 1973; Wills 1968 | **[SOURCED-BIB]** only, through Perarnau–Serra's bibliography |

**Channel note, and it limits every absence below.** The session's WebSearch
budget was exhausted (200 of 200) before this recon started, so **no keyword web
search was available at all**. Everything here ran on three programmatic
channels: the arXiv API (`https`, per `SEARCH-CONVENTIONS.md` §3), the zbMATH
Open API, and Crossref. MathSciNet remains unreached, as it has been for every
wave. Calibration on the same channels in the same session, per
`SEARCH-CONVENTIONS.md` §2: the arXiv API returned `1701.02048` with the exact
*Contrib. Discrete Math.* journal reference the map carries, and zbMATH returned
Cusick's *Aequationes Math.* **9 (1973) 165–170** at the exact volume and pages
the map carries. Both known positives came back, so the channels were working.

---

## 1. What the conjecture controls

Tao's normalisation, quoted from §1 of arXiv:1701.02048v4 **[SOURCED]**. For an
`n`-tuple of non-zero integers `v_1,…,v_n`, `δ(v_1,…,v_n)` is the maximal value
of `min(‖tv_1‖, …, ‖tv_n‖)` over `t ∈ R/Z`, and `δ_n` is the infimum of that
over tuples of distinct non-zero integers.

> **Conjecture (Lonely runner conjecture).** For every `n ≥ 1`, one has
> `δ_n = 1/(n+1)`.

The upper bound `δ_n ≤ 1/(n+1)` is Dirichlet applied to `(1,2,…,n)`, so the
conjecture is the assertion that the Dirichlet bound is sharp. The whole content
is the lower bound.

**The formulation that matters to us is Tao's (ii), and it is a covering
statement.** With `B(v; δ) = {t ∈ R/Z : ‖tv‖ ≤ δ}` the rank-one Bohr set, `δ_n`
is the least number for which there exists a covering
`R/Z = ⋃_{i=1}^n B(v_i; δ_n)` of the circle by `n` rank-one Bohr sets. Each
`B(v_i; δ)` has measure exactly `2δ`, so at `δ = 1/(2n)` the total measure is
exactly 1 and the union bound gives

> **Proposition (Wills 1968; Tao's Prop. 1.3).** For every `n ≥ 1`,
> `δ_n ≥ 1/(2n)`.

**So the object is: `n` arithmetically-structured periodic subsets of a circle,
of total measure exactly 1, and the question is whether they can cover.** That
is our covering question with one class per modulus, stated in the continuum.
Cusick's view-obstruction form is the same statement geometrically: with
`Δ(K,λ) = λK + N^n − ½·1`, `λ(n)` is the least dilation of the unit cube for
which every positive ray meets the family, and `λ(n) = 1 − 2κ(n)`
(Cusick 1973 Lemma 1, carried through Perarnau–Serra §3.2, **Cusick NOT
REACHED**).

---

## 2. What the partial results give

The lower-bound ladder, in the order the literature built it. All statements
through Tao §1 **[SOURCED]** except the last two.

| bound | who | strength over `1/(2n)` |
|---|---|---|
| `δ_n ≥ 1/(2n)` | Wills 1968, union bound | baseline |
| `δ_n ≥ 1/(2n − 1 + 1/(2n−3))` | Chen 1994 | factor `1 + O(1/n)` |
| `δ_n ≥ 1/(2n−3)`, when `2n−3` is prime | Chen–Cusick 1999 | factor `1 + O(1/n)`, conditional on primality |
| `δ_n ≥ 1/(2n − 2 + o(1))` | Perarnau–Serra 2016 | factor `1 + O(1/n)` |
| `δ_n ≥ 1/(2n) + c log n / (n² (log log n)²)` | Tao 2018, Theorem 1.5 | factor `1 + Θ̃(1/n)` |
| `δ_n ≥ 1/(2n) + 1/n^{5/3 + o(1)}` | Bedert, arXiv:2511.16636 (Nov 2025), abstract **[SOURCED]**, preprint, unrefereed | factor `1 + Θ(n^{−2/3})` |

**Every one of these is a `1 + o(1)` multiplicative improvement on the union
bound. Sixty years, and the constant 2 has not moved.** The field states this
itself: Perarnau–Serra's open-problem list, Problem 2, asks

> "we ask if for every `ε>0`, there exists `n₀ ∈ N` such that for all `n ≥ n₀`,
> `κ(n) ≥ (1+ε)/(2n)`."

That is, **whether the union-bound constant can be improved by any fixed factor
at all is an open problem**, and Bedert's polynomial gain does not settle it,
since `1/(2n) + n^{−5/3+o(1)} = (1/(2n))(1 + O(n^{−2/3}))`.

**Small `n` moved a great deal in the last twelve months, and entirely by
compute.** Perarnau–Serra (2025) records the conjecture as known for `n ≤ 6`
(seven runners). Since then, at abstract level **[SOURCED]**: Rosenfeld
arXiv:2509.14111 (eight runners) and arXiv:2512.01912 (nine);
Trakulthongchai arXiv:2511.22427 (nine and ten); Sungkawichai–Trakulthongchai
arXiv:2604.23906 (`k ∈ {10,11,12}`, that is eleven, twelve and thirteen
runners). All are computer-assisted, and all rest on the finite-checking
reduction — Tao's Theorem 1.6 (`|v_i| ≤ n^{C₀n²}`) as sharpened by
Malikiosis–Santos–Schymura to `C(n+1,2)^{n−1} ≤ n^{2n}`, *Forum Math. Sigma* 13
(2025) e164.

**The calibration statement for the map, corrected in both directions.** It is
not "thirteen cases settled in sixty years" as a slow trickle: it is *seven*
cases in fifty-seven years and *six more in twelve months*, every one of the six
a verification rather than an idea, and no general-`n` progress accompanying
them. And the general lower bound is no longer stuck at a `log`-factor nudge:
Bedert's `n^{−5/3}` is a polynomial gain over `n^{−2}`. The map's paragraph
predates it.

---

## 3. Tao's own obstruction is our configuration, and this is the row's real payoff

Tao §1 explains why the improvements are all `1 + O(1/n)`, and the example he
gives is a set of prime velocities. Quoted verbatim from arXiv:1701.02048v4
**[SOURCED]**:

> "Let `n` be a large integer, and let `p_1,…,p_s` denote the primes between
> `n/4` and `n/2`, thus by the prime number theorem `s = (1+o(1)) n/(4 log n)`
> … This makes this collection of Bohr sets behave like a 'sunflower' … with a
> very small 'kernel'."

He splits `B(p_i;δ) = [−δ/p_i, δ/p_i] ∪ B'(p_i;δ)`, shows the petals
`B'(p_i;δ)` are pairwise **disjoint** — because for distinct primes and
`a,b` not divisible by them, `‖a/p_i − b/p_j‖ ≥ 1/(p_i p_j)`, Farey spacing —
and concludes:

> "the union bound … is only off from the truth by a multiplicative factor of
> `1 + O(1/n)`."

Then the diagnosis, which is the sentence to carry:

> "the primes are a logarithmically sparse set, and standard sieve theory bounds
> tell us that most numbers of size comparable to `n` will not only be
> composite, but in fact contain a medium-sized prime factor (e.g. a factor
> between `log^10 n` and `n^{1/10}`). One can use these medium-sized prime
> factors to show that many of the rank one Bohr sets will intersect other rank
> one Bohr sets in various disjoint (and reasonably large) 'major arcs', which
> can then be used to improve upon the union bound."

**What this says about us.** The published mechanism for beating the first
moment in this family is *composite* velocities with medium-sized prime factors,
which force the periodic sets to overlap in large arcs. Our moduli are the
primes up to `x`, by construction and irremovably: they are the sifting primes.
The mechanism is void on our configuration by definition. **The lonely runner
literature's own account of its stuck factor of 2 names, as the obstruction, the
exact configuration our covering problem has.**

This is a wall address of the same class as `SEARCH-CONVENTIONS.md` §4's
`β₂` entry: it does not prove that `4.2665 → 2` is unreachable, it says the gap
will not be closed by refining a union bound over prime moduli, because a
sixty-year effort against the identical geometric obstruction has not moved a
factor of 2 either. The numerical coincidence is worth stating without leaning
on it: LRC's gap is a factor of exactly 2 (`1/(2n)` against `1/(n+1)`), ours is a
factor of `4.2665/2 = 2.13` in the exponent. Same shape, and the shape is the
point, not the digits.

**One honest demotion of the map's own analogy.** The map says the postulate and
the LRC differ because "the lonely runner asks for one good time while the
postulate asks that every window of `H` contain a survivor". That is not a
mismatch in kind: the windowed form is in print as Rifford's **Timely LRC**
(*Acta Appl. Math.* 180 (2022) P15, through Perarnau–Serra §11.4
**[SOURCED-BIB]**) — there is `N = N(n)` such that the origin is lonely before
the slowest runner completes `N` laps — proved only for `n ≤ 5`, and
Perarnau–Serra's Problem 8 asks the density version: does
`B(v_1,…,v_n; 1/(n+1)) ∩ [−N/v_1, N/v_1]` have density bounded below by a
function of `n` alone? **That is the postulate's shape, and it is open there
too.** The escalation from "one survivor" to "a survivor in every window" is the
same escalation in both problems, and it is unsolved in both.

---

## 4. The two-class question, settled: there is no such variant, and there is a published reason not to want one

**The deciding question was whether a multi-obstacle-per-speed lonely runner is
in print. It is not, and the near-miss that is in print says the general version
is worthless.**

**What is in print, as studied variants.** Perarnau–Serra §11 is the field's own
enumeration of variations: invisible runners (Czerwiński–Grytczuk 2008), the
loneliness spectrum (Kravitz 2021; Fan–Sun; Giri–Kravitz; Jain–Kravitz), the
**shifted LRC**, time to get lonely (Rifford), the **lonely rabbit problem**,
and function fields (Chow–Rimanić). Two of these touch our shape and neither is
it:

- **Shifted LRC.** Each runner starts at an arbitrary point of the track: one
  obstacle per speed, with a **free shift**. This is the map's mismatch (1)
  removed, and it is a well-developed line — Beck–Hoşten–Schymura, *Integers* 19
  (2019) A29 formulate it; Henze–Malikiosis, *Aequationes Math.* 91 (2017)
  331–352 give the covering-radius-of-zonotopes restatement; MSS 2025 give
  finite checking conditional on the Lonely Vector Property; Alcántara–Criado–
  Santos verify `n = 4`. **And it is FALSE.** Blanco–Criado–Santos,
  arXiv:2603.24784v2 (2026), abstract **[SOURCED]**: *"We show explicit
  counterexamples to both the shifted Lonely Runner Conjecture (starting at
  `n=5`) and to the Lonely Vector Property (starting at `n=12`)."* So the moment
  the adversary is given the shift — which is exactly what our adversary has in
  `a_p` — the sharp constant `1/(n+1)` dies at five runners.
- **Mixed thresholds.** Jensen, arXiv:2605.27941v1 (2026), abstract
  **[SOURCED]**: different required distances `d_i` per runner. Still one
  obstacle per speed. The view-obstruction ancestor is Dumir–Hans-Gill, *The
  view obstruction problems for boxes*, *J. Indian Math. Soc.* (1991).

**Nothing anywhere gives a speed more than one obstacle.** The view-obstruction
literature's entire generalisation axis is the *shape of the single body*
attached to each lattice point — cubes, spheres, ellipsoids, boxes, `ℓ_p` balls,
polygons, general convex bodies (Cusick 1974; Dumir–Hans-Gill–Wilker's
"Contributions to a general theory of view-obstruction problems" I/II; Chen's
series) — plus the codimension of the trajectory. Never the multiplicity per
coordinate.

**ABSENT, and the owning conventions are named on this line: no lonely-runner or
view-obstruction variant assigning two or more obstacles to a single speed, or
two or more residue classes to a single modulus, exists in the literature,
searched as "lonely runner" and as "view-obstruction"/"view obstruction" —
the conventions `SEARCH-CONVENTIONS.md` §2 already identifies for the covering
question — on the arXiv API (39 records for "lonely runner", 12 for each
view-obstruction spelling, every title read) and on the zbMATH Open API (65 and
46 records respectively, every title and author list read), both calibrated
in-session as recorded in §0, and cross-checked against the field's own 2025
survey, whose §11 enumerates the studied variants and contains no such entry.
MathSciNet unreached; WebSearch unavailable this session.**

**The one published statement about our exact shape, and it closes the route.**
Perarnau–Serra §11.3, read at source **[SOURCED]**, on why the shifted
conjecture must insist on distinct speeds:

> "In the shifted version it is important to insist that the speeds are pairwise
> distinct, in contrast to Conjecture 3. If the condition on distinct speeds is
> lifted, then the trivial lower bound `1/(2n)` becomes tight, as witnessed by
> the set of speeds all equal to one and starting points
> `{0, 1/n, ⋯, (n−1)/n}`. The lower bound in this case was found by Schoenberg
> in the equivalent context of billiard trajectories".

Lifting distinct speeds while keeping free shifts **is** several obstacles per
speed: that is what repeated speeds with different starting points means. So the
multi-obstacle-per-speed problem is not un-posed, it is posed and answered, and
the answer is that **in that generality the union bound is exactly tight and
nothing better than the first moment is true** (Schoenberg 1976,
`Indag. Math.` 38 (1976) 263–279, **NOT REACHED**, carried through the survey).

**Consequence, and it is the mechanism that closes row 12 as an import.** Our
kill set is two classes per prime, `{a_p, a_p − 2}`, with `a_p` adversarial:
a translate of a *fixed* pattern, so a proper sub-case of the repeated-speed
shifted problem rather than the general one. A general theorem for that problem
cannot exist, because the general problem is settled at the trivial bound. Any
improvement for `G₂` must therefore come from the two structural facts the
general problem does not have — that the speeds are **primes** and that the two
obstacles are locked at **offset 2** — and §3 says the first of those two is
precisely the case the literature identifies as hardest. **There is no theorem
to import. The import question is answered, not deferred.**

---

## 5. The nearest published relative in the family is a wheel problem, and the corpus does not know it

Unexpected, and worth more than the rest of §4. Perarnau–Serra §11.5, read at
source **[SOURCED]**, on the **Lonely Rabbit Problem** — the same problem with
time restricted to the integers, `ξ(V) = sup_{t ∈ Z} min_{v∈V} ‖tv‖`, speeds
non-integral, `Rab(n) = inf_{|V|=n} ξ(V)`:

- Wills 1968 determined `Rab(n)` for `n ≤ 3`; Cusick, *Simultaneous diophantine
  approximation of rational numbers*, *Acta Arith.* 22 (1972) 1–9, for `n ≤ 7`,
  conjecturing `Rab(n) = 1/w(n)` where
  `w(n) = max{z ∈ N : ½φ(z) + h(z) ≤ n}`, with `h(z) = 0` for `z` prime and
  `h(z) = ω(z)` for `z` composite;
- Schark, *Monatsh. Math.* 78 (1974) 131–146, **proved the conjecture**;
- Schark–Wills, *Acta Arith.* 22 (1973) 129–136, gave
  `Rab(n) ∼ e^{−2γ} / (n log log n)`.

All four **[SOURCED-BIB]** through the survey's bibliography; none opened.

**Why this matters here.** This is a Diophantine extremal problem, in the same
family as the LRC, whose answer is *exactly known*, whose extremal modulus is
"the largest `z` whose totient is at most about `2n`" — a primorial wheel — and
whose asymptotic constant is `e^{−2γ}`, a Mertens constant. It is the one place
in this literature where the extremal instance is a wheel and the answer is
closed-form. The corpus has no mention of it: `grep` over `research/*.md` for
`Schoenberg`, `Wills`, `lonely rabbit` and `view.obstruction` returns nothing,
and the only occurrence of "view obstruction" anywhere in the repository is one
line of `history/staging/import-map-construction.md`.

**Priced honestly: this is a PUBLISHED-ANCHOR candidate for the corpus's
"the wheel is the extremal object" intuition, and nothing more.** `Rab` is one
obstacle per modulus and its `t` ranges over all of `Z` rather than over a
window, so it does not bound `G₂`. It is an analogy with a proof attached, which
is a better class of analogy than the corpus usually gets, and it should be
recorded before it is lost again.

---

## 6. The Birkhoff / bounded-remainder branch: subsumed, and strictly worse from `x = 13`

The comb read as a `Z`-rotation on the CRT torus is translation by 1 on
`Z/x#Z`, and the object is `ΔΦ₂(y,x) = Ψ(y,x) − (D_x/x#)·y` of
`research/discrepancy-two-class.md`. Three published instruments were priced.

**Denjoy–Koksma.** Statement read at source **[SOURCED via Carrand
arXiv:2012.07481v2, quoting Herman Thm VI.3.1]**:

> "Let `f` be a homeomorphism of the circle with an **irrational rotation
> number** `ρ(f)`. Let `μ` be a measure invariant by `f`, and let `p/q` be such
> that `gcd(p,q)=1` and `|qρ(f) − p| < 1/q`. Then for all potential `φ` of
> bounded variation and all `x ∈ S¹`,
> `|Σ_{k=0}^{q−1} φ∘f^k(x) − q∫φ dμ| < Var(φ)`."

**Read all the hypotheses and it fails twice.** Our rotation number is `1/x#`,
**rational**, so the hypothesis fails at the first clause. And the route by
which Denjoy–Koksma yields a bound at general `N` — Carrand's Lemma, decomposing
`N` over convergent denominators — needs `α` of **constant type**, bounded
partial quotients. The continued fraction of `1/x#` is `[0; x#]`: one partial
quotient, equal to `x#`. The constant-type hypothesis fails as badly as it can.

**Bounded remainder sets.** Definitions and results read at source in
Grepstad–Lev §1 **[SOURCED]**. `S` is a BRS if there is `C = C(S,α)` with
`|D_n(S,x)| ≤ C` for every `n` and a.e. `x`, where
`D_n(S,x) = Σ_{k<n} χ_S(x + kα) − n·mes S`. In dimension one, Hecke and
Ostrowski showed an interval of length in `Zα + Z` has bounded discrepancy, and
**Kesten** (*Acta Arith.* 12 (1966) 193–212, the Erdős–Szüsz conjecture)
proved the converse. Grepstad–Lev's Theorem 1 extends this: any parallelepiped
in `R^d` spanned by vectors in `Zα + Z^d` is a BRS, hence so is any zonotope with
vertices there; and the measure of any BRS must be `n_0 + n_1α_1 + ⋯ + n_dα_d`.
Haynes–Koivusalo (arXiv:1402.2125) construct an infinite family via Rauzy's
criterion, and the adelic branch (Furno–Haynes–Koivusalo arXiv:1803.10559;
Das–Furno–Haynes, *Moscow J. Comb. Number Th.* 10 (2021) 111–120) does the same
on `A/Q` and `A^d/Q^d`, all abstracts **[SOURCED]**.

**Every one of them hypothesises a totally irrational `α`** — Grepstad–Lev
require `1, α_1, …, α_d` linearly independent over `Q`; the adelic papers say
"for any **irrational** rotation on the adelic torus". Our translation is by 1,
an integer, on a finite cyclic group. The adelic branch looked like the closest
fit because it carries finite components, and it is not: on `A/Q` a rational
translation is trivial.

**And the mechanism, which is why no repair helps.** Translation by 1 on
`Z/x#Z` has a single orbit that visits every point exactly once per period. A
union of `k` residue classes mod `m` is therefore hit once per `m` steps by each
class, so its counting function deviates by less than `k`: **every subset of the
CRT torus is a bounded remainder set, trivially, with constant at most its
number of components.** There is no dynamics to extract. The entire content of
our object is how that constant grows with `x`, and BRS theory is a theory of
which sets have a bounded constant at a *fixed* rotation, not of how the
constant moves along a family. It answers a question we do not have.

**Quantitatively, it is worse than what the corpus already owns.** Twin slots
are all `≡ 2 (mod 3)`, so they are isolated and the indicator of `T_x` has total
variation `2D_x` and exactly `D_x` components. Both the Denjoy–Koksma bound and
the trivial BRS bound are therefore of size `D_x = ∏_{3≤q≤x}(q−2)`. Against the
corpus's own two instruments — the Level Ledger majorant `2·3^{π(x)−1}` proven
in `FOLD-PROFILE.md` §2 and re-derived as a term count in
`discrepancy-two-class.md` §3, and the measured half-range
`(max ΔΦ₂ − min ΔΦ₂)/2` from `discrepancy-two-class.md` §2 — the arithmetic over
those cited values reads:

| `x` | `D_x` (BV / trivial-BRS bound) | `2·3^{π(x)−1}` (Level Ledger) | half-range, measured | `D_x` ÷ Level Ledger |
|---|---|---|---|---|
| 5 | 3 | 18 | 0.700 | 0.2 |
| 7 | 15 | 54 | 1.500 | 0.3 |
| 11 | 135 | 162 | 2.980 | 0.8 |
| 13 | 1 485 | 486 | 3.918 | 3.1 |
| 17 | 22 275 | 1 458 | 7.843 | 15.3 |
| 19 | 378 675 | 4 374 | 17.078 | 86.6 |
| 23 | 7 952 175 | 13 122 | 27.368 | 606.0 |
| 29 | 214 708 725 | 39 366 | 49.152 | 5 454.2 |

(The Level-Ledger-to-measured column reproduces `discrepancy-two-class.md` §5's
looseness ratios 25.7, 36.0, 54.4, 124, 186, 256, 479, 801 exactly, which is the
custody check on this table's inputs.)

**So the bounded-variation family crosses the corpus's own bound at `x = 13` and
is 5 454× worse by `x = 29`, and the gap widens by a factor `(q−2)/3` at every
fold.** Nothing in the branch is unsubsumed. The reason is one sentence: a
bounded-variation instrument prices this set by its component count, which grows
like the census itself, while the corpus's Möbius term count prices it by
`3^{π(x)}`, and `discrepancy-two-class.md` §5 has already shown even that is
`√3` per fold too generous.

**Zorich-style deviation spectra were rejected in `import-map-construction.md`
§1 and are not re-proposed.** This section is the answer to what was left: the
two remaining legs, Denjoy–Koksma and bounded remainder sets, both fail on a
named hypothesis and both are dominated by an instrument the corpus already has.

---

## 7. Pricing row 12 against the wall map

| what the row can deliver | verdict |
|---|---|
| a theorem bounding `G₂` or the postulate | **nothing.** No two-class variant exists, and the general repeated-speed version is settled at the union bound (§4) |
| **WALL-ADDRESS** | **yes, and it is the strongest thing here.** Tao's sunflower example names prime velocities as the configuration where the union bound is tight to `1 + O(1/n)`, and names composite velocities with medium-sized prime factors as the only published route past it. Our moduli are primes. Sixty years have not moved the factor of 2, and Perarnau–Serra's Problem 2 asks whether *any* constant-factor improvement exists |
| **PUBLISHED-ANCHOR** for `4.2665 → 2` | **no.** The gaps have the same shape (a stuck factor of ≈ 2 against a first-moment bound) but `β₂` is a sifting limit, not a union bound, and the analogy is structural rather than quantitative. Writing it as an anchor would be the numerology error `import-map-construction.md` §1 caught in the KPZ row |
| **PUBLISHED-ANCHOR**, unexpected | **yes, for a different claim.** The Lonely Rabbit problem is a solved Diophantine extremal problem whose extremal moduli are primorial wheels and whose constant is `e^{−2γ}` (§5) |
| the Birkhoff / bounded-remainder branch | **closed with mechanism**, dominated by the corpus's own instruments from `x = 13` (§6) |

---

## 8. Verdict and recommendation

**CLOSED WITH MECHANISM. No experiment is pre-registered, and none is warranted.**

Row 12 should be regraded from `UNTRIED` to landed-and-closed, with the payoff
recorded as WALL-ADDRESS rather than the PUBLISHED-ANCHOR the map priced. The
closure rests on two independent grounds, either of which suffices:

1. **The general two-class problem is settled at the trivial bound.** Repeated
   speeds with free shifts make `1/(2n)` exactly tight (Schoenberg 1976 through
   Perarnau–Serra §11.3), so no general theorem of this family can beat a first
   moment on an object of our shape.
2. **The specialisation that could beat it is the one the field names as its own
   obstruction.** Tao §1: prime velocities form a sunflower whose petals are
   disjoint by Farey spacing, the union bound is tight to `1 + O(1/n)` there, and
   the published escape route needs medium-sized prime factors that prime moduli
   do not have.

Neither ground is a search negative, which is why the closure does not depend on
the WebSearch channel being unavailable this session.

---

## 9. Corrections and additions to the record

Proposals only. No live document was edited by this pass.

1. **`research/IMPORT-MAP.md` row 12 and its §3.12 paragraph.** Regrade to
   landed/closed with the WALL-ADDRESS payoff. Three factual repairs to the
   paragraph: the general lower bound is now `1/(2n) + n^{−5/3+o(1)}`
   (Bedert, arXiv:2511.16636, preprint) and not a `log`-factor nudge; the
   conjecture is verified to thirteen runners, six of those in the last twelve
   months and every one by computer; and the "one good time versus every window"
   mismatch is not a mismatch, since the windowed form is Rifford's Timely LRC
   and Perarnau–Serra's Problem 8, both open.
2. **`research/SEARCH-CONVENTIONS.md` §1 gains a row.** Object: *an interval or
   circle covered by one or two residue classes per prime, read on the torus*.
   Owning conventions: **"lonely runner conjecture"**, **"view-obstruction
   problem"**, **"shifted lonely runner conjecture"**, and **"covering radius of
   lattice zonotopes"** (Henze–Malikiosis, *Aequationes Math.* 91 (2017)
   331–352, is the dictionary between them). The house phrase "one class per
   prime" reaches Banks–Ford–Tao's model `R` and does **not** reach this family;
   the flip that does is *torus covering by rank-one Bohr sets*.
3. **`research/SEARCH-CONVENTIONS.md` §3 gains two settled rows.** "Is there a
   multi-class lonely runner / view-obstruction variant?" — **No**, channels and
   counts in §4 above, do not redo. "Does bounded-remainder-set theory bound our
   window discrepancy?" — **No, by hypothesis failure and by domination**, §6
   above, do not redo.
4. **`research/PRIOR-ART.md` gains the Lonely Rabbit line.** `Rab(n) = 1/w(n)`
   with `w(n) = max{z : ½φ(z) + h(z) ≤ n}` (Cusick 1972, proved Schark 1974) and
   `Rab(n) ∼ e^{−2γ}/(n log log n)` (Schark–Wills 1973): the closest published
   relative in which a Diophantine extremal problem's extremal modulus is a
   primorial wheel with a Mertens constant.
5. **A misprint in the field's survey, flagged so it is not propagated.**
   Perarnau–Serra arXiv:2409.20160v3 states Tao's bound as
   `1/(2n) + c log n/(n² log log n)`. Tao's own Theorem 1.5 and abstract read
   `c log n / (n² (log log n)²)`. The map's paragraph already has the correct
   form; cite Tao, not the survey, for this bound.
6. **Two secondary statements of Chen's 1994 bound disagree.** Tao §1 prints
   `δ_n ≥ 1/(2n − 1 + 1/(2n−3))`; Perarnau–Serra §6 prints
   `κ(n) ≥ 1/(2n − 1 − 1/(2n−3))`. Chen, *Acta Math. Sinica* 37 (1994) 551–562,
   was not reached and the sign is unresolved. Not load-bearing anywhere here;
   recorded so nobody quotes it as settled.
7. **A bibliographic item the map does not carry.** Crossref holds a second
   Cusick item titled *View-obstruction problems*, *Aequationes Math.* **8**
   (1972) 197–198, DOI `10.1007/bf01832753`, author confirmed as T. W. Cusick.
   It is distinct from the 1973 paper the map cites and is not the *Acta Arith.*
   22 (1972) paper the survey cites for the Rabbit problem. Metadata only; the
   text was not reached and its content is unknown.

---

## 10. NOT REACHED

- **Cusick 1973 itself.** Springer 303s to an authorisation endpoint; zbMATH
  carries the record with no review text; no open copy was located on the
  channels available. Its content here is entirely second-hand through
  Perarnau–Serra §3.2. The map's `[SOURCED-BIB]` label for it is correct and
  should not be upgraded.
- **Schoenberg 1976**, which is the load-bearing citation for §4's closure. The
  statement is carried through Perarnau–Serra §11.3, read at source. If the
  closure is ever written into `REFUTED.md` as a mechanism, Schoenberg should be
  read first, exactly as `SEARCH-CONVENTIONS.md` §3 required for Shearer.
- **Chen 1994, Chen–Cusick 1999, Schark 1974, Schark–Wills 1973, Wills 1968.**
  Bibliography only.
- **Bodies of the 2025–2026 preprints.** Bedert, Blanco–Criado–Santos, Jensen,
  Sungkawichai–Trakulthongchai and the Rosenfeld pair are read at abstract level
  only. Bedert's `n^{−5/3+o(1)}` in particular is an unrefereed preprint claim
  and is labelled as such wherever it is used.
- **MathSciNet**, unreached as in every previous wave. **WebSearch**,
  unavailable this session (budget exhausted before the recon began), so no
  keyword-web channel corroborates the §4 absence; the arXiv and zbMATH
  enumerations and the field's own survey do.
- **No experiment was run**, and none is proposed.
