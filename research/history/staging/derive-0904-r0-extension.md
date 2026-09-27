# The forbidden extension across R0: which pieces of head + Z2 + tail carry the parity obstruction, and the one place in this frame that does not

<!-- ledger
id: Q-derive-0904-r0-extension
status: ANSWERED
todo: Z2
question: Which pieces of the R0 decomposition (the tile form, the zone form, head, tail, Z2, and the composites R0/R1/R2/stretch) carry the parity obstruction's forbidden extension, and is any single piece both legal on the TPC-strength axis and exempt from it?
verdict: No piece of R0 is both legal and exempt with content: the criterion reduces to a coordinate count (Proposition A) under which every statement forcing a twin pair into a range where roughness implies primality is covered, and the exempt residue is exactly the statements that assert no such forcing (R0's identity, lower bounds, boundary artefacts) plus the tile form, whose exemption is a property of the statement and provably does not close under deduction (Proposition B), so it survives only for routes with no sieve weight anywhere.
-->

> **RIDER 2026-09-04 (orchestrator, from `redteam-0904-r0-extension.md`).**
> Six of seven claims survive at their rung, one is refuted. CONFIRMED:
> Proposition A (with a witness that its converse fails outside the product
> class: a confined-rough property with |S| = 1 whose R reads λ has forbidden
> set {(+1,+1), (+1,−1), (−1,−1)}, origin inside the hull); the scope slip,
> strengthened, since the one-coordinate property is Tao's own Example 2 and
> the repair "l₂ = l₁ + 2, bound l₁ only" flips 27 times over p = 7..199;
> row (e″); the equivariance transfer by restriction. WEAKENED: Proposition B's
> stated mechanism proves too much and the proposed wall-note insertion drops
> the qualifier "only if the argument locates an n in supp(ν)" that §1d
> supplies, and carries no H6 conditional; the insertion is not needed, the
> conclusion being live at `paper/wall-note.md` already. Proposition D's "same
> trigger" is near-definitional and its causal reading of the exponent band
> does not hold. REFUTED: "no corpus artifact certifies the window-count
> variance at width p′²": `research/06-variance-theorem.js` computes exactly
> that, brute-force verified at two levels, and the z-score is now measured at
> 43 levels (see the z2-state-draft rider). Two wordings owed here: EXEMPT
> throughout means "Claim 1's H5 fails", which is not the parity statement
> `paper/wall-note.md` Face 1 is priced against (the k = 1 case "l₁ is prime"
> has H5 failing while the 2007 parity problem plainly bites on it); the §5
> column "parity" reads "Claim 1 (H5)", and §1c's one-liner "two forced primes
> trigger the obstruction; one does not" is refuted by Tao's Examples 4 and 5
> and holds only in the product class.

*(2026-09-04. Staging note, HELD. It edits no live document. It runs no
producer and computes nothing new: every number below is cited to the artifact
that measured it, and the new content is derivation, marked DERIVED where it
has had no adversarial pass. Calibration per claim: PROVEN, VERIFIED, MEASURED,
HEURISTIC, DERIVED, SOURCED, OPEN, REFUTED. Two axes are used throughout and
they are different axes: the **TPC-strength axis** with the wrong-direction
audit's labels (i)/(ii)/(iii) (`history/staging/attack-wrongdirection-audit.md`
§2), and the **parity axis** COVERED / EXEMPT / UNDETERMINED, meaning whether
Tao's Claim 1 hypothesis H5 holds for the statement's target property. A
statement can be (ii) and EXEMPT; §2a is the witness.)*

## 0. The verdict, disconfirming half first

**Nothing here opens a route, and the negative is the deliverable.** The
decisive question the brief poses is whether any single piece of R0 is both
legal on the TPC-strength axis and exempt from the parity obstruction's
forbidden extension. The answer is **no, with content**: the exempt set among
R0's own pieces is non-empty but every member of it is either already a theorem,
asserts nothing existential, or is a two-integer boundary artefact. The one
statement
that is genuinely both exempt and useful is not a piece of R0 at all, it is
the tile form and its exponent band, which is TODO item 0, the top of the
programme's own board. So the search ends where the programme already stands.

**The second disconfirming item, and it is the sharper one.** The exemption
does **not close under deduction** (Proposition B, §1d). H5-failure is a
property of a statement's target property, not of its consequences: an
argument establishing an H5-exempt statement also establishes every consequence
of it, including consequences whose properties do satisfy H5. So "the tile form
is exempt" cannot be read as "a sieve route to the tile form is unobstructed".
The exemption survives only for routes that have no non-negative sieve weight
anywhere, which is `paper/wall-note.md`'s Door 5 and nothing else. The
wall-note's own scoping sentence lands in the same place by naming Door 5
directly; what §1d adds is the reason, and the reason is that H5 is a test on
statements while Claim 1's proof is a test on argument shapes, and the two are
run together in one paragraph in the live text (§8, proposed change 1).

**Third, a scope slip found in two notes and it changes a forbidden set.**
`history/staging/lit-tao-parity.md` §2.2 and `paper/wall-note.md` §2 both
compute the zone property's forbidden set from
`P_zone(l1, l2) := "l1, l2 both coprime to x#, and x < l1 < x'^2"`. That
property confines only **one** coordinate. Under Proposition A its forbidden
set is `{(+1,+1), (+1,-1)}`, whose convex hull is the segment `{+1} x [-1,1]`
and does **not** contain the origin: H5 **fails** on the property as written.
The conclusion both notes draw is nevertheless correct, because the property
the reduction actually needs confines both coordinates
(`x < l_i < x'^2` for i = 1, 2), and then H5 holds. The correction is one
subscript wide and it is load-bearing for exactly the question this note asks,
since "how many coordinates are confined" is the whole criterion. [DERIVED, one
adversarial pass by re-derivation only; §8, proposed change 2.]

**What is genuinely new here, at its rung.** Proposition A (§1c), which
reduces Claim 1's convex-hull test on this whole family of properties to a
count of Liouville-monochromatic coordinates and makes the classification
mechanical; Proposition B (§1d), the non-closure of the exemption; Proposition C
(§6), the negative written once; Proposition D (§6b), that the two axes separate
at exactly one point in this frame and that point is the Gap Reformulation.
All four are DERIVED: written arguments, checked here by re-derivation, with no
adversarial pass. Proposition A's converse half is scoped to product-form
properties and stated as such.

**What this note does not do.** It computes nothing, it promotes nothing, it
closes no TODO item, it edits no live file. It does not claim novelty against
the literature: Proposition A is a one-page consequence of Tao's own
definitions and is very likely folklore to anyone who has run the test twice;
the corpus's rule against calling a rediscovery a discovery applies
(`research/PRIOR-ART.md`, `research/SEARCH-CONVENTIONS.md`). And per
`lit-tao-parity.md` §1.5, Claim 1 is at rung **CONJECTURED** by its author's
own sentence, it presumes Liouville pseudorandomness and is not a theorem, so
every "COVERED" verdict below is conditional on that, and no COVERED verdict
may be quoted as a proof that a route is impossible.

---

## 1. The criterion, stated with its hypotheses

### 1a. The source statement

All quotations below are Tao, *A general parity problem obstruction*, What's
new, 21 Nov 2014, read at source on 2026-08-27 and transcribed with a sha256 of
the served HTML in `history/staging/lit-tao-parity.md` §Provenance. They are
quoted here from that transcription, not re-fetched. [SOURCED via the corpus's
own custody record; per the standing compute rule the custody-bound artifact is
cited rather than the page re-opened.]

The obstruction is a test on a target property with five hypotheses and one
standing conjecture, numbered as in `lit-tao-parity.md` §1:

- **H1 (forms).** `k` affine-linear forms `L_1, ..., L_k`, none a constant
  multiple of another.
- **H2 (target shape).** The goal is existential: find *an* `n` with
  `P(L_1(n), ..., L_k(n))`.
- **H3 (method class).** The argument's entire arithmetic input is upper and
  lower bounds on `Sum_n nu(n)` (1), `Sum_n nu(n) 1_{L_i(n) prime}` (2), and
  `Sum_n nu(n) f(L_i(n))` (3), for one or more **non-negative** weights `nu`,
  and its conclusion is reached by combinatorial manipulation of those bounds
  together with `nu >= 0`. The conclusion produced is "there exists `n` in the
  support of `nu` for which `P` holds".
- **H4 (forbidden set, extensional).** "a sign pattern `(e_1, ..., e_k)` is
  **forbidden** by `P` if there does not exist any natural numbers
  `l_1, ..., l_k` **obeying** `P(l_1, ..., l_k)` for which
  `(lambda(l_1), ..., lambda(l_k)) = (e_1, ..., e_k)`." The `l_i` range over
  all natural numbers **independently**, subject only to `P`; the linear forms
  do not enter this computation.
- **H5 (the hypothesis proper).** `0` lies in the convex hull of the forbidden
  sign patterns.
- **H6 (the standing conjecture).** Liouville pseudorandomness, in the form
  that `Sum_n nu(n) Q(lambda(L_1(n)), ..., lambda(L_k(n)))` and its (2)- and
  (3)-analogues are negligible for `Q` a linear combination of squarefree
  monomials of degree at least 2.

**Claim 1, verbatim.** "Suppose `P(l_1,...,l_k)` is such that that [sic] the
convex hull of the forbidden sign patterns of `P` contains the origin. Then one
cannot use the above sieve-theoretic approach to establish the existence of an
`n` such that `P(L_1(n), ..., L_k(n))` holds."

**Its rung is CONJECTURED, by its author.** "This claim is **not precisely a
theorem**, because it presumes a certain 'Liouville pseudorandomness
conjecture'". So the obstruction is a decision procedure whose output is a
prediction about what a method class can reach, not a theorem that a route is
impossible. Everything marked COVERED below inherits that rung.

**What "extension" means, and the two equivalent formulations the brief
names.** H4 computes the forbidden set from `P`'s extension, the set of tuples
satisfying it. The Selberg/Chowla sign-pattern formulation is the same test in
the older language: an axiom-only sieve cannot separate the `lambda = +1` part
of a sifted set from the `lambda = -1` part, so "replace prime by
`lambda = -1` and `z`-rough" is the substitution that leaves every sieve axiom
invariant while changing the target's truth value. The corpus's own worked
instance of that substitution is
`history/staging/attack-barrier-kappa2.md` §5, where the substitution is made
with an exceptional character in place of `lambda` and the resulting set is
computed exactly.

**Provenance of the classical citations, stated so nobody re-reaches for
them.** Selberg's parity examples are conventionally cited at Halberstam and
Richert, *Sieve Methods*, p. 239. **That page is UNREACHABLE in this corpus**
and every site citing it says "cited through"
(`history/staging/lit-pdf-halberstam-richert.md` §D4 and its closing table).
The reachable primary is Friedlander and Iwaniec 1998 p. 1045, read at source
and quoted in `lit-tao-parity.md` §3.3, which gives Selberg's example in full:
`a_n = (1 + lambda(n))/2` satisfies the remainder axiom (R) at level
`D = x^{1-eps}` and fails the bilinear axiom (B), because `mu(d) r_d(x)` has
constant sign in long intervals. Friedlander and Iwaniec's parity discussion in
*Opera de Cribro* is the standard chapter-length treatment; this note did not
open it, and no claim below rests on it. [BIB, not opened.]

### 1b. The class of properties this note tests

Every piece of R0 has a target property of one shape, and naming the shape is
what makes the classification mechanical.

> **Definition (confined-rough property).** A property `P` of `k` natural
> numbers is **confined-rough** if it has the form
> `P(l_1,...,l_k)  =  AND_i [ l_i in C_i ]  AND  AND_i [ l_i in I_i ]  AND  R`,
> where each `C_i` is a union of reduced residue classes to some modulus, each
> `I_i` is an interval (possibly all of `N`), and `R` is any further condition.
> Write `A_i = C_i ∩ I_i` and `Lambda_i = lambda(A_i) ⊆ {+1, -1}` for the set of
> Liouville values realised on `A_i`. Call coordinate `i` **monochromatic** if
> `|Lambda_i| = 1`.

**The two ways a coordinate becomes monochromatic in this frame**, both PROVEN:

1. **Confinement below the square of the sifting level.** If `C_i` is the
   reduced classes mod `x#` (i.e. `l_i` is `x`-rough) and `I_i ⊆ (x, x'^2)`,
   then every element of `A_i` is prime, so `Lambda_i = {-1}`. [PROVEN, this is
   the Zone Restriction Lemma's `(⊆)` direction, `zonegap-02-reduction.md` §1:
   a hole of `T_x` below `x'^2` has no prime factor `<= x`, and if composite its
   least prime factor would exceed `x`, forcing it to be at least `x'^2`.]
2. **The parity-forced empty case.** If `l_i` is `z`-rough, `l_i <= x = z^u`
   with `u <= 2`, and `lambda(l_i) = +1`, then `l_i = 1`: an even number of
   prime factors each above `z` gives `l_i > z^2 >= x`. This is
   `attack-barrier-kappa2.md` §5's vanishing direction, and it is the same
   mechanism as (1) written in the sifting parameter. [PROVEN there; quoted, not
   re-derived.]

**A coordinate is NOT monochromatic when the interval is dropped.** If `A_i` is
a union of reduced classes mod `q` with no interval constraint, both Liouville
values are realised: Dirichlet gives infinitely many primes in each reduced
class (`lambda = -1`), and for a target class `c` choose primes `q_1 ≡ 1` and
`q_2 ≡ c` mod `q`, so `q_1 q_2 ≡ c` with `lambda = +1`. [PROVEN modulo
Dirichlet; this is `lit-tao-parity.md` §2.1's argument, stated here per
coordinate because that is the form the classification needs.]

### 1c. Proposition A, the criterion is a coordinate count

> **Proposition A.** Let `P` be confined-rough with `Lambda_1, ..., Lambda_k` as
> above, and let `S = { i : |Lambda_i| = 1 }`.
>
> **(A1)** If `P` is a pure product, `P(l_1,...,l_k) = AND_i [ l_i in A_i ]`
> with every `A_i` non-empty and no further condition `R`, then the forbidden
> set is exactly the complement of `Lambda_1 x ... x Lambda_k` in `{+1,-1}^k`,
> and **H5 holds if and only if `|S| >= 2`**.
>
> **(A2)** In general (any `R`), the extension is contained in
> `A_1 x ... x A_k`, so the forbidden set **contains** that complement, and
> **`|S| >= 2` implies H5 holds**. The converse half fails in general, because
> a smaller extension forbids more.

*Proof.* (A1), forbidden set. For a pure product the extension's set of
realised sign patterns is `Lambda_1 x ... x Lambda_k`, since the `l_i` are
chosen independently under H4 and each `A_i` is non-empty. Its complement is
the forbidden set by H4.

(A1), `|S| >= 2 ⟹ H5`, and this also proves (A2). Pick `i ≠ j` in `S`, with
`Lambda_i = {e_i}` and `Lambda_j = {e_j}`. Choose any signs `d_m` for
`m ≠ i, j` and set

  `u = (..., u_i = -e_i, ..., u_j = e_j, ...)` with `u_m = d_m` otherwise,
  `v = (..., v_i = e_i, ..., v_j = -e_j, ...)` with `v_m = -d_m` otherwise.

`u` disagrees with `Lambda_i` in coordinate `i`, so `u` lies outside
`A_1 x ... x A_k`'s pattern set and is forbidden; `v` disagrees in coordinate
`j` and is forbidden. Their midpoint is `0` in every coordinate: coordinate `i`
gives `(-e_i + e_i)/2 = 0`, coordinate `j` gives `(e_j - e_j)/2 = 0`, and
coordinate `m` gives `(d_m - d_m)/2 = 0`. So `0 ∈ conv{forbidden}` and H5
holds. Under (A2) the forbidden set only grows, so the same two patterns are
still forbidden and the same midpoint works.

(A1), `|S| <= 1 ⟹ not H5`. If `S` is empty the forbidden set is empty and its
convex hull contains nothing. If `S = {i}` with `Lambda_i = {e_i}`, then
`Lambda_m = {+1,-1}` for every `m ≠ i`, so the pattern set is
`{e_i}` in coordinate `i` and free elsewhere, and its complement is exactly
`{ eps : eps_i = -e_i }`. Every forbidden pattern has `i`-th coordinate
`-e_i`, so every convex combination of forbidden patterns has `i`-th coordinate
`-e_i ≠ 0`, and the origin is not among them. ∎

[DERIVED. The argument is four lines of convex geometry on Tao's own
definitions and has had no adversarial pass. Its correctness check is that it
reproduces the source's two worked cases exactly: Example 3's "both prime" has
`k = 2`, `Lambda_1 = Lambda_2 = {-1}`, `|S| = 2`, H5 holds, forbidden set
`{(+1,+1), (+1,-1), (-1,+1)}`, the source's list verbatim; and the
congruence-only property has `S` empty, H5 fails, which is the source's own
converse remark that "we do not expect a parity obstruction of the type in
Claim 1 to hold" there.]

**Consistency with Tao's `ceil(k/2)` count, which is the second check.** The
source states that "at least `j` of the `k` numbers is prime" is obstructed as
soon as `j >= k/2 + 1`, so at `k = 2` the obstructed case is `j = 2` and the
free case is `j = 1`. Proposition A at `k = 2` says H5 holds iff both
coordinates are monochromatic, i.e. iff both are forced prime. The two agree at
`k = 2`. They are not the same statement in general: "at least `j` of `k`" is a
disjunction and is not confined-rough, so Proposition A does not cover it, and
Proposition A covers product properties the `j`-of-`k` count does not reach
(mixed monochromatic signs, `+1`-forced coordinates). Neither subsumes the
other. [DERIVED.]

**The one-line reading, and it is the whole classification tool.** *Two forced
primes trigger the obstruction; one does not.* Every verdict in §§2-5 is that
sentence applied.

### 1d. Proposition B, the exemption does not close under deduction

> **Proposition B.** Let `S` be a statement whose target property `P_S` fails
> H5, and let `S'` be a consequence of `S` whose target property `P_{S'}`
> satisfies H5. Then an H3 argument establishing `S` also establishes `S'`, and
> the composite argument establishes the existence forbidden by Claim 1 applied
> to `P_{S'}`. Hence H5-failure for `S` is **not** a licence for a sieve route
> to `S`. What survives H5-failure is only the class of routes whose conclusion
> is not of the form "there exists `n` in `supp(nu)` with `P`", that is, routes
> with no non-negative sieve weight anywhere.

*Argument.* Claim 1's proof (`lit-tao-parity.md` §1.6) builds `w >= 0` from the
forbidden set, supported only on `n` whose Liouville pattern is forbidden, and
uses H6 to leave (1), (2), (3) invariant under `nu -> nu w`. The contradiction
it derives is that the argument's conclusion, "there exists `n in supp(nu w)`
with `P`", is false because `supp(nu w)` carries only forbidden patterns. That
contradiction is available whenever the argument's conclusion is of that shape,
and it is not available when the conclusion is a fixed arithmetic fact whose
truth value does not depend on `nu` at all. The tile form
`G_2(x#) < x'^2 - 2` is such a fact: it is a finite decidable statement about
`Z/x#`, and reweighting cannot falsify it. So the reweighting has no purchase
on an argument that concludes it, **but only if the argument concludes it
without ever locating an `n` in the support of a weight.** An H3 argument that
proves the tile form by exhibiting, for each window, a surviving `n` in
`supp(nu)`, has proven the zone instances too, since a window inside `(x, x'^2)`
makes that `n` a twin prime opener, and Claim 1 applies to those instances. ∎

[DERIVED, and it is a reading of Claim 1's proof rather than a new theorem. It
agrees with `paper/wall-note.md` §2's own scoping, "it covers Door 5, which
uses no sieve weight to reweight, and it does not cover any route that proves
the zone statement by bounding sums against a non-negative sieve weight", and
supplies the mechanism that sentence asserts. The live text runs the H5 test
and the method scoping together in one paragraph without saying they are two
different tests; §8 proposes the separation.]

**Consequence, and it is the reason §6's negative is strong.** A piece of R0
being EXEMPT is worth something only in company: it must also be legal on the
TPC axis, and the route to it must be `nu`-free. Two of the three are cheap and
the third is Door 5, whose status is that no covering-systems result in print
reaches a window of length `p^2` with two classes per prime, searched and not
found (`paper/wall-note.md` §1 Door 5, `research/covering-dive.md` §§Q3, Q4).

---

## 2. The two ends of the chain

### 2a. (a) The tile form `G_2(x#) < x'^2 - 2`, EXEMPT, and (ii) on the other axis

**The target property, stated so the interval is not smuggled in.** `G_2(x#)` is
the largest gap between twin-admissible **residues** mod `x#`, so the statement
`G_2(x#) < H` is equivalent to a finite statement about `Z/x#`: for every
residue `t`, some residue `a` with `t < a <= t + H` in a fixed fundamental
domain has `a` and `a+2` both coprime to `x#`. The existential instance at `t`
therefore has target property

  `P_tile,t(l_1, l_2) = [ l_1, l_2 coprime to x# ] AND [ l_1 mod x# ∈ (t, t+H] ]`,

in which the second clause is a union of `H` reduced residue classes mod `x#`,
**not** an interval of integers. Both `A_1` and `A_2` are unions of reduced
classes, so by §1b both realise both Liouville values, `S` is empty, the
forbidden set is empty, and H5 fails.

**Verdict: EXEMPT.** [DERIVED, and it re-derives `paper/wall-note.md` §2 and
`lit-tao-parity.md` §2.1 with the mechanism made explicit: the exemption is not
that the property is "written without primes", it is that the tile statement's
**periodicity lets the window be expressed as a congruence condition**, so no
coordinate is confined to an interval and no coordinate is monochromatic.]

**Why the periodicity is load-bearing, and where it would be lost.** The same
sentence about integers rather than residues, "every integer window of length
`H` contains a twin-admissible pair", is a different statement whose instances
at `t ∈ (x, x'^2)` do confine both coordinates. The two statements are
equivalent for the tile because the tile is periodic mod `x#`, so a residue
window and an integer window carry the same slot pattern; but the properties
are not the same property, and the criterion tests properties. The equivalence
is exactly what Proposition B says cannot be used to carry the exemption
forward.

**TPC axis: (ii) TPC-strength** for the statement with constant strictly below
1 at exponent 2 (`attack-wrongdirection-audit.md` §1, Axis A, and
`G2-STATE.md` §1b: `G_2(x#) < x'^2 - 2` implies the Zone Postulate at `x`,
which at infinitely many `x` is TPC). **(i) legal** for any unconditional
two-class exponent strictly inside the open band `(2, 4.26645]`, which is the
audit's item 10 and TODO item 0.

**So this piece is the axis separation**, and it is the only one in this frame:
COVERED and (ii) come apart here. See §6b.

### 2b. (b) The zone form, COVERED, (ii)

**The target property, with both coordinates confined.** The reduction needs a
twin-admissible slot **inside** the zone, i.e. an `a` with `a` and `a+2` both
`p`-rough and both in `(p, p'^2)`:

  `P_zone(l_1, l_2) = [ l_1, l_2 coprime to p# ] AND [ p < l_1 < p'^2 ] AND [ p < l_2 < p'^2 ]`.

By §1b mechanism (1) both `A_1` and `A_2` are sets of primes, so
`Lambda_1 = Lambda_2 = {-1}`, `|S| = 2`, and Proposition A gives H5. The
forbidden set is Example 3's, `{(+1,+1), (+1,-1), (-1,+1)}`, and the origin is
`(1/2)(+1,-1) + (1/2)(-1,+1)`.

**Verdict: COVERED.** [DERIVED; the conclusion is `paper/wall-note.md` §2's and
`lit-tao-parity.md` §2.2's, and the derivation differs from theirs in the one
place §0's third item names.]

**The correction, worked.** The property as written in both those notes bounds
only `l_1`. With one coordinate confined, `S = {1}`, and Proposition A's
`|S| <= 1` branch gives forbidden set `{ eps : eps_1 = +1 }`, whose convex hull
is `{+1} x [-1,1]`: the origin is **not** in it and H5 **fails**. The
conclusion "H5 holds" is right and the property that carries it is the
two-coordinate one. Nothing downstream of either note changes, because every
downstream use is about the zone form as the reduction actually uses it.

**Two further readings, and they give the same verdict.** If one instead
computes the forbidden set from the extension "twin prime pairs in
`(x, x'^2)`", which is how both notes phrase it, the pattern `(-1,-1)` is
realised only if a twin pair exists there, which is the Zone Postulate at `x`
itself. If it does not, the extension is empty, **all four** patterns are
forbidden, the convex hull is the whole square, and H5 holds a fortiori. So the
verdict is unconditional either way, but the **unconditional** route is the
"both prime in the zone" reading, whose `(-1,-1)` witness is any prime in
`(x, x'^2)` taken twice, supplied by Bertrand. Prefer that phrasing; it does
not borrow the conjecture. [DERIVED.]

**TPC axis: (ii).** The weak form (infinitely many zones occupied) is
**equivalent** to TPC, both directions, elementary
(`research/ZONE-POSTULATE.md` §2, PROVEN).

---

## 3. The three pieces of R0

Conventions throughout are `zonegap-01.md` §0's, as carried by
`zonegap-02-reduction.md`: pairs named by opener `a`; `a` is in zone `p` iff
`p < a` and `a + 2 < p'^2`, both strict; gaps opener-to-opener; `Z2` their
maximum, defined when the zone holds at least 2 pairs;
`head = a_first - p`, `tail = p'^2 - a_last`, counted separately and never
inside `Z2`.

### 3a. (c) `head(p)`, COVERED in the direction the decomposition uses

**The direction matters and must be stated first.** R0 wants **upper** bounds
on head, `Z2` and tail, since it needs `head + Z2 + tail < width`. Only the
upper-bound direction is existential, and only the existential direction meets
H2 at all.

**Upper bound, `head(p) <= B`.** The statement asserts: there is an `a` with
`p < a <= p + B` such that `a` and `a+2` are both `p`-rough and `a + 2 < p'^2`.
Since `B <= width` whenever the statement has content, both coordinates lie in
`(p, p'^2)` and are `p`-rough, hence prime by §1b(1). `|S| = 2`, H5 holds.
**COVERED.** [DERIVED.]

**Lower bound, `head(p) >= B`.** This asserts that **no** twin pair opens in
`(p, p+B)`, a universally quantified non-existence. It does not meet H2, whose
target shape is existential, so Claim 1's hypothesis is not engaged.
**EXEMPT by type.** It is also useless: it moves R0's left side up, away from
the target inequality. [DERIVED. This is the first of three exempt-and-useless
cells, and the pattern is §6's proposition.]

**TPC axis.** Unconditional `head(p) <= B` with `B < width` at infinitely many
`p` is R2 with a named instrument, hence **(ii)** (`zonegap-02-reduction.md`
§2). *Conditional on occupancy*, `head < width` is free, head is defined only
when the zone holds a pair, and then `head < width` follows from the definition,
so the conditional form is **(i)** and vacuous. The audit's own item-7
rider applies: police the quantifier, because the definedness clause is what
separates the two labels.

**The one proven instrument, and where it lands.** `F(p) <= G_2(p#) - p - 1`
from the tile's edge pair (`zonegap-02-reduction.md` §3.1, PROVEN; VERIFIED at
`p = 7..17`), with `G_2 << p^{4.2665+eps}` missing the needed `p^2` by exactly
the open band. Note what §2a and Proposition B jointly say about that
instrument: its **statement** is tile-side and EXEMPT, its **consequence** at
`p` is head-side and COVERED, and the arrow between them is the elementary
Euclid anchor, not a sieve step. So the instrument is a live example of
Proposition B's shape: the exemption sits on the far side of an arrow that
carries it nowhere.

### 3b. (d) `tail(p)`, COVERED, with one two-integer boundary artefact

**Upper bound, `tail(p) <= B`.** Asserts an `a` with `p'^2 - B <= a` and
`a + 2 < p'^2`, both members `p`-rough. Both coordinates lie in `(p, p'^2)`,
both are prime, `|S| = 2`, H5 holds. **COVERED.** [DERIVED.]

**The boundary artefact, and it is the only place in R0 where a coordinate
escapes.** The zone's right endpoint is `p'^2`, and the closer `a+2` is
required to satisfy `a + 2 < p'^2` by the convention. Drop that clause and ask
only for `a` `p`-rough with `a` and `a+2` both `p`-rough, `a < p'^2`: for
`a ∈ {p'^2 - 2, p'^2 - 1}` the closer is **not** below `p'^2`, so its roughness
does not force primality and `Lambda_2 = {+1,-1}`. Then `|S| = 1` and by
Proposition A's second branch H5 **fails**. **EXEMPT**, and the exemption is
two integers wide and delivers a prime near `p'^2` rather than a twin pair,
which is Bertrand-grade and certifies nothing. [DERIVED. Recorded because it is
the sharpest available illustration that the exemption is a boundary phenomenon
of the confinement, not a property of the object.]

**Lower bound on tail: EXEMPT by type, wrong direction**, exactly as in §3a.

**TPC axis:** same split as head, **(ii)** unconditional, **(i)** and vacuous
conditional on occupancy. The tail is the corpus's least-studied piece
(`zonegap-02-reduction.md` §2's table calls it "unstudied (cheapest piece)")
and this note does not change that: it says only that the parity axis gives it
the same verdict as the head, so cheapness there is not parity-cheapness.

### 3c. (e) `Z2(p)`, COVERED, and the slot reading and the prime reading are one property

This is the piece the brief flags as unwritten, and it has three parts.

**Part 1: the maximum-gap statement is a family of existential statements.**
`Z2(p) <= B` says that no gap between consecutive in-zone twin openers exceeds
`B`, which is equivalent to: for every `t` with `a_first <= t <= a_last - B`,
the interval `(t, t+B]` contains a twin opener. Each instance is existential
with target property

  `P_{Z2,t}(l_1,l_2) = [ l_1, l_2 coprime to p# ] AND [ t < l_1 <= t+B ] AND [ p < l_2 < p'^2 ]`,

and since `t` and `t+B` lie inside `(p, p'^2)` both coordinates are confined,
both monochromatic, `|S| = 2`. **H5 holds for every instance. COVERED.** The
universal quantifier over `t` makes the statement strictly harder, not softer:
Claim 1 blocks even a single instance, and `Z2(p) <= B` requires all of them.
[DERIVED.]

**Part 2: the "gap between two pairs" formalisation gives the same verdict.**
The reading the brief asks about treats `Z2` as an object attached to a
**pair of twin pairs**, so the natural target is a 4-tuple with a
consecutiveness clause:

  `P_{Z2,4}(l_1,l_2,l_3,l_4) = [ all four coprime to p# and in (p, p'^2) ]
     AND [ l_2 = l_1 + 2, l_4 = l_3 + 2 ] AND [ no in-zone opener strictly between l_1 and l_3 ]`.

The last two clauses are the `R` of §1b's definition, so this property is not a
pure product and Proposition A's converse half does not apply. Its forward half
does: all four coordinates are confined to `(p, p'^2)` and are therefore
monochromatic with `Lambda_i = {-1}`, `|S| = 4 >= 2`, and (A2) gives H5. The
explicit witness pair is `u = (+1,-1,+1,-1)` and `v = (-1,+1,-1,+1)`, both
forbidden because each has a `+1`, with midpoint `0`. **COVERED.** [DERIVED.]

So the between-pairs reading is not a different parity object. The reason is
structural and worth stating once: **a consecutiveness clause can only shrink
the extension, and shrinking the extension can only add forbidden patterns**,
so no clause of that kind can move a statement from COVERED to EXEMPT. The only
operation that moves a statement to the exempt side is **removing** a
confinement.

**Part 3: twin slots versus twin primes, the criterion is blind to the
distinction, in the strongest sense.** The Zone Restriction Lemma
(`zonegap-02-reduction.md` §1, PROVEN; VERIFIED at `p = 7, 11, 13, 17, 23`)
states that the in-zone twin-slot openers of `T_p` and the in-zone twin-prime
openers are the **same set**. Read through H4 this is stronger than an equality
of numbers. The slot property's coordinate set is
`A_i^{slot} = { l : gcd(l, p#) = 1, p < l < p'^2 }` and the prime property's is
`A_i^{prime} = { l : l prime, p < l < p'^2 }`, and these are **equal as sets**:
`⊆` because a hole below `p'^2` is prime, `⊇` because a prime above `p` is
coprime to `p#`. H4 computes the forbidden set from the extension alone, and
equal coordinate sets with the same `R` give equal extensions, hence identical
forbidden sets. **The two readings are not two properties the criterion happens
to rate alike; they are one property, and there is no data by which the
criterion could tell them apart.** [PROVEN, given the Zone Restriction Lemma and
H4.]

**Precisely where the two readings become one.** At the conjunction of
roughness with the constraint `l < p'^2` and not before. Drop the upper
constraint and the slot set is a union of reduced classes carrying both
Liouville signs while the prime set is monochromatic: the two readings are then
genuinely different properties with different forbidden sets (empty versus
Example 3's), and that difference is exactly the tile-versus-zone split of §2.
Raise the constraint above `p'^2` and the same separation reappears, because a
`p`-rough number above `p'^2` may be a product of two primes. So the
identification is not a feature of the zone as an interval; it is a feature of
the **coincidence of the sifting level with the square root of the window's
right endpoint**, and that coincidence is the definition of the zone.
[DERIVED. It is the same `u = 2` coordinate that `attack-barrier-kappa2.md`
§5 reaches from Granville's side: `z^2 >= x` is `u <= 2`, and the zone is the
`u = 2` window by construction.]

**TPC axis: (ii)** for any bound placing `Z2` below the window at infinitely
many `p` in the R1 form, per the audit's settled table
(`z2-state-draft-0829.md` §4b, `zonegap-02-reduction.md` §2 (R1)): the
premise's three objects are defined only when the zone holds at least two
pairs, so the premise contains occupancy.

---

## 4. (f) The composites: R0, R1, R2, and the stretch form

### 4a. R0 itself, EXEMPT by type, (i), and empty of content

R0 is the partition identity: when the zone holds `k >= 1` pairs,
`width = head + Sum gaps + tail` exactly, and for `k >= 2`,
`head + Z2 + tail <= width` with equality iff `k = 2`
(`zonegap-02-reduction.md` §2, PROVEN; VERIFIED digit-exact at five levels).

**It asserts no existence.** Its content is an identity conditional on a
premise that supplies the pairs, so it has no target property of H2's shape and
Claim 1's hypothesis is not engaged. **EXEMPT by type.** [DERIVED.]

**TPC axis: (i)**, by the corpus's own operational witness, it is already
PROVEN while TPC is open (`attack-wrongdirection-audit.md` §0's definition of
"strictly weaker").

**So R0 is both (i) and EXEMPT, and it is worth nothing**, because it produces
no occupancy: it is bookkeeping on a premise. This cell is the reason §6's
proposition has to be stated with the word "content" in it rather than as a
bare emptiness claim.

### 4b. R1, COVERED, (ii)

R1 is `Z2(p) + head(p) + tail(p) < p'^2 - p` at infinitely many `p`, implying
TPC. The implication is trivially PROVEN and the difficulty is entirely in
producing the premise. The premise asserts that head, `Z2` and tail are
**defined**, i.e. that the zone holds at least two pairs, and by R0 the strict
inequality is exactly "at least 3 pairs". So the premise's target is the
existence of three twin pairs in `(p, p'^2)`, a 6-tuple all of whose
coordinates are confined: `|S| = 6 >= 2`, H5 holds. **COVERED.** [DERIVED.]

**TPC axis: (ii)**, settled in `z2-state-draft-0829.md` §4b's table.

### 4c. R2, COVERED, (ii)

R2 is `F(p) < p'^2 - p - 2` at infinitely many `p`, implying the weak Zone
Postulate and hence TPC, where `F(p)` is the distance from `p` to the tile's
first twin-slot opener above `p`. The premise asserts an `a` in
`(p, p'^2 - 2)` with `a, a+2` both `p`-rough: both coordinates confined,
`|S| = 2`, H5 holds. **COVERED.** [DERIVED.]

**One asymmetry worth recording.** `F(p)` is a **tile-side** object, the first
twin-slot opener above `p`, with no upper constraint in its definition, so the
bare statement "`F(p) <= B`" for `B` unrestricted is a congruence statement and
is EXEMPT by §2a's argument. It becomes COVERED at exactly the point where `B`
is required to be below `p'^2 - p - 2`, because that is the constraint that
confines the coordinates. **R2's exemption and its usefulness are the same
dial, turned in opposite directions**: the statement is exempt while `B` is
large enough to be useless and covered from the moment `B` is small enough to
imply the postulate. That dial is the cleanest statement of the wall this note
found, and it is a restatement of §2a rather than a new fact. [DERIVED.]

### 4d. The stretch form, COVERED, (ii)

The stretch is `S_Q = [Q^2, Q'^2)` (`stretch-01.md`, `quadpoint-identity-01.md`).
A `Q`-rough integer below `Q'^2` is prime by the same argument as §1b(1), so a
twin-slot statement on the stretch confines both coordinates, `|S| = 2`, H5
holds. **COVERED.** [DERIVED.]

**TPC axis: (ii)**, and above it: SP (every stretch occupied) implies the strong
Zone Postulate by containment, and A091592-completeness implies SP
(`stretch-01.md` §2, `z2-state-draft-0829.md` §4b). The certificate
`Sum_r capU_K(r) <= C - 1` is `(ii)` by the capture identity
(`attack-wrongdirection-audit.md` §3.1).

**The one stretch-side statement that is EXEMPT.** An upper bound on `X(y)`
alone, with no comparison to `T`, the audit's item-1 legal residue,
`z2-state-draft-0829.md` §4b item 1. `X` is the rough-rough census minus
prime-bearing pairs, and an upper bound on it asserts no existence of anything,
so it fails H2 and is EXEMPT by type as well as **(i)** on the TPC axis. It is
also the corpus's own recorded reason that this cell is empty of content: the
comparison against `T` is the wall, and the precision class the comparison needs
is the parity wall's, `1 + O(1/ln^2)`, which no sieve upper bound delivers
(`quadpoint-identity-01.md` §4, quoted through
`object-bridge-read-0829.md` §3). So this is a second (i)+EXEMPT cell, and like
R0 it is content-free, for a reason the corpus had already priced, at a
different coordinate, before this note existed.

---

## 5. The classification, in one table

Two axes, and they are different axes. **TPC** is the wrong-direction audit's
label: (i) strictly weaker than TPC in the corpus's operational sense, (ii)
TPC-strength, (iii) undetermined. **Parity** is whether Claim 1's H5 holds for
the statement's target property: COVERED (H5 holds), EXEMPT (H5 fails, or H2
fails so the hypothesis is not engaged), UNDETERMINED. The **monochromatic coords** column is the count `#S` of
Liouville-monochromatic coordinates, which by Proposition A decides the parity
column.

| # | statement | k | monochromatic coords | parity | TPC | why the parity column reads that way |
|---|---|---|---|---|---|---|
| a | `G_2(x#) < x'^2 - 2` (tile form) | 2 | 0 | **EXEMPT** | (ii) | periodicity states the window as a congruence, so no coordinate is confined to an interval |
| a' | any two-class exponent in `(2, 4.26645]` | 2 | 0 | **EXEMPT** | (i) | same property, weaker conclusion |
| b | zone form: `(p, p'^2)` occupied | 2 | 2 | COVERED | (ii) | roughness below `p'^2` forces both coordinates prime |
| c | `head(p) <= B`, `B < width` | 2 | 2 | COVERED | (ii) uncond. / (i) cond. | both members of the first pair lie in the zone |
| c' | `head(p) >= B` | n/a | n/a | **EXEMPT by type** | (i) | non-existence, fails H2; wrong direction for R0 |
| d | `tail(p) <= B` | 2 | 2 | COVERED | (ii) uncond. / (i) cond. | both members of the last pair lie in the zone |
| d' | the two-integer right-edge case `a >= p'^2 - 2` | 2 | 1 | **EXEMPT** | (i) | the closer escapes the confinement; delivers a prime, not a pair |
| e | `Z2(p) <= B`, gap-family reading | 2 per instance | 2 | COVERED | (ii) | every instance's window sits inside the zone |
| e' | `Z2(p) <= B`, between-pairs 4-tuple reading | 4 | 4 | COVERED | (ii) | consecutiveness only shrinks the extension, which only adds forbidden patterns |
| e'' | `Z2` on twin **slots** versus twin **primes** | n/a | n/a | **one property** | n/a | equal coordinate sets by the Zone Restriction Lemma; H4 reads extensions, so there is no distinction to see |
| f1 | R0, the partition identity | n/a | n/a | **EXEMPT by type** | (i) | asserts no existence; conditional on a premise that supplies the pairs |
| f2 | R1, `head + Z2 + tail < width` i.o. | 6 | 6 | COVERED | (ii) | the premise is "at least 3 pairs in the zone" |
| f3 | R2, `F(p) < p'^2 - p - 2` i.o. | 2 | 2 | COVERED | (ii) | covered from the moment `B` drops below the window |
| f3' | `F(p) <= B` with `B` unrestricted | 2 | 0 | **EXEMPT** | (i) | tile-side, no confinement; useless at that size |
| f4 | stretch form on `[Q^2, Q'^2)` | 2 | 2 | COVERED | (ii) | same `u = 2` confinement one square up |
| f4' | an upper bound on `X(y)` alone | n/a | n/a | **EXEMPT by type** | (i) | asserts no existence; the comparison against `T` is where both axes bite |

**Reading the table in one line.** Every COVERED row is (ii); every EXEMPT row
is (i) **except row a**, and every (i) EXEMPT row is either already proven, in
the wrong direction, two integers wide, or priced dead at a different
coordinate. Row a is the single separation.

---

## 6. The decisive question, answered

### 6a. Proposition C, the negative, written once

> **Proposition C.** Within the R0 frame, the tile form, the zone form, head,
> tail, `Z2` in either reading, and the composites R0, R1, R2 and the stretch
> form, a statement's target property satisfies H5 **if and only if** the
> statement forces at least two coordinates into a range where roughness implies
> primality. Consequently the EXEMPT residue of the frame consists of exactly
> three kinds of statement, and no fourth was found:
>
> 1. **Statements asserting no existence.** R0's identity, lower bounds on
>    head, `Z2` and tail, and an upper bound on `X(y)` with no comparison to
>    `T`. These fail H2, are all (i), and none of them produces occupancy:
>    R0's identity is already a theorem, the lower bounds run the inequality
>    the wrong way, and `X(y)` alone is the audit's own legal residue whose
>    dead end is the precision class of the comparison.
> 2. **Statements forcing at most one member of a pair.** The two-integer
>    right-edge case at `p'^2`, and any single-prime statement in the zone.
>    These deliver a prime rather than a twin pair, which is Bertrand-grade.
> 3. **Statements whose window is a congruence rather than an interval.** The
>    tile form and its exponent band. These are exempt as **statements**, and by
>    Proposition B the exemption does not close under deduction, so it survives
>    only for routes with no non-negative sieve weight anywhere.
>
> **Therefore: no piece of the R0 decomposition is both legal on the
> TPC-strength axis and exempt from the forbidden extension in a way that
> yields zone occupancy.** The exempt side of this frame is non-empty and
> content-free, and the one exempt statement with content is not a piece of R0
> but the object R0's reduction passes through.

[DERIVED. The "if and only if" is Proposition A restricted to this frame, where
every property is confined-rough and every confinement is of §1b's two kinds;
the enumeration of the three kinds is a check of the table in §5 row by row and
is only as complete as that table. What would break it is a piece of R0 whose
target property is not confined-rough, and §9 says what such a piece would have
to look like.]

**Why the corpus has not attacked the one exempt statement with content: it
has, and it is item 0.** Row a', an unconditional two-class exponent strictly
inside `(2, 4.26645]`, is simultaneously **(i) legal** (audit item 10, with the
separation exhibited rather than modelled: `4.26645` is PROVEN while TPC is
open) and **EXEMPT** (§2a). It is not in `research/REFUTED.md`; the nearest rows
are "improving `beta_2` itself" (CLOSED for us, not proven unimprovable) and
"a floor at 4, and the band `(4, 4.2665]`" (REFUTED as a floor claim), neither
of which closes the band. It is TODO item 0, the top of the ranked board, and
`research/ZONE-POSTULATE.md` §8 lists it as the highest-value form of progress
there is. **So the search for an exempt place ends at the place the programme
already occupies**, and this note's contribution on that point is not a new
target but a reason: the exponent band is where the programme stands because it
is the only place in this frame where the obstruction's hypothesis is
unsatisfiable, and the price of standing there is the origin (`G_2/Z_2` measured
at 4.12 by `p = 43`, reaching 8.1429 at `x = 79` over the 22 trusted terms,
`object-bridge-read-0829.md` §3) and Proposition B's rider that the exemption
holds only for `nu`-free routes, which is Door 5.

### 6b. Proposition D, where the two axes separate, and why it is exactly one place

> **Proposition D.** On the R0 frame the TPC-strength axis and the parity axis
> have the same trigger, forcing at least two coordinates into a range where
> roughness implies primality also forces a twin pair into a bounded window,
> which is the occupancy that makes a statement (ii), with **exactly one
> exception**, row a: the tile form is (ii) and EXEMPT. The exception is
> produced by the Gap Reformulation, which converts an interval statement into
> a congruence statement at the cost of the origin, and it is the frame's only
> instance of that conversion.

[DERIVED, and it is an observation about this frame rather than a theorem about
the two notions, which are logically independent in general. Read as a
strategic statement it says: **the Gap Reformulation is the programme's one
parity-evasion move, it is already made, and it buys exemption only for
`nu`-free routes.** That is consistent with, and gives a second reason for,
`object-bridge-read-0829.md` §5's finding that the discarded origin information
is provably not needed for the implication to run.]

**The rider that must travel with Proposition D.** `lit-tao-parity.md` §2.3
establishes that Claim 1 is asymptotic in its proof everywhere, so **no
computed level is evidence about it in either direction**. Nothing in this
note's classification can be checked, confirmed or disconfirmed by a
computation at any finite level, and no measured tile, zone or `beta` value
bears on any row of §5's table. [PROVEN as a scoping statement, cited.]

---

## 7. Part 2: the equivariance wall's zone-side statement

This is `z2-state-draft-0829.md` §8 question 2. It is derived, not measured; no
producer was run, and the one measurement it would want does not exist in the
corpus (§7d).

### 7a. The tile-side statement, quoted

`history/staging/import-boolean-analysis.md` §4, the banked wall address:

> "The rotation ensemble's symmetry group acts transitively on its phases, and
> every theorem in the analysis of Boolean functions is invariant under that
> group. The deep ensemble is `(prod_{p<=y} Z_p, uniform)`, and translation by
> any vector `sigma in prod Z_p` preserves the measure, the degree filtration,
> all `L^q` norms and all influences. So a theorem whose hypotheses are stated
> in those terms and whose conclusion is either a norm inequality or a
> statement holding off an exceptional set of measure `eps` is *equivariant*
> ... No such theorem can distinguish `t = 0`."

[PROVEN as stated there; quoted, not re-derived.]

### 7b. It transfers, and not by analogy, by restriction

**Which group, which ensemble, and is it transitive.** The zone-side ensemble
is `E_p = { [t, t + (p'^2 - p)) : t in Z/p# }`, the `p'^2`-wide windows of the
tile `T_p` with the zone at its own position, and the statistic is the number
of twin slots the window contains. The group is `Z/p#`, acting by translation.
It acts **simply transitively** on `E_p`: the ensemble is a torsor under it,
each window has exactly one translate carrying it to each other window, the
uniform measure is preserved, and every `L^q` norm, degree-filtration level and
influence of the window-count function is preserved. By CRT `Z/p#` is
`prod_{q <= p} Z_q`, so this is the same group as §7a's, not an analogue of it.
**The argument transfers verbatim.** [DERIVED; the transitivity is immediate
and the invariances are §7a's, unchanged.]

**The stronger statement, and it is what question 2 was actually reaching
for.** The zone is not an analogue of the tile's anchor at all. The Zone
Restriction Lemma says `Z2(p)` **is** the whole-tile gap object restricted to
the head window `(p, p'^2)` (`zonegap-02-reduction.md` §1, PROVEN; VERIFIED at
five levels), so the zone window is the tile's own head window read at the tile's
own phase, with its left edge at `p` rather than `0`, a shift of `p` against a
window of width `~ p^2`, i.e. a fraction `~ 1/p` of the window. So the two
anchors are **the same coordinate at two window lengths**, and the equivariance
wall reaches the zone by restriction rather than by import. **§0's third killer
in `z2-state-draft-0829.md` is currently described there as "imported to the
zone side by analogy"; it is not an analogy, and that sentence understates the
transfer.** [DERIVED; §8, proposed change 3.]

**The threshold is identical.** `paper/wall-note.md` Face 1's requirement is
that a bound admitting an exceptional fraction `eps` decides the anchor only if
`eps * |ensemble| < 1`. On the zone side the ensemble is `E_p` with cardinality
`p#`, so the requirement is `eps < 1/p#`, the same threshold as the tile's,
against the same cardinality. Per that face's 2026-08-27 correction the `eps`
and the cardinality must be read against **the same** ensemble, and on the zone
side both are `E_p`'s, so the pairing is self-consistent by construction and no
mixed reading arises. [DERIVED.]

### 7c. Three zone-side differences, and all three are adverse

1. **The payoff is smaller for the same threshold.** `G_2(x#)` is a maximum over
   all positions, an ensemble-level object; the zone statement is the value at
   one named position. So the same `eps < 1/p#` requirement buys a statement
   about one window rather than about the worst window. The equivariance wall
   costs the same and delivers less on the zone side.
2. **The window is exponentially thin in its own ensemble.** The zone's width is
   `~ p^2` against a period of `p#`, so
   `ln(width) / ln(period) ~ 2 ln p / theta(p) ~ 2 ln p / p -> 0`. That is the
   CRT-diagonal statement in its zone coordinate
   (`recon-0828-farfields.md` §0 item 3, via `object-bridge-read-0829.md` §5):
   an interval of length `L` is a diagonal segment in a CRT box of `p#` cells,
   and a box-level theorem sees the segment only once `L` approaches `p#`. On
   the tile the relevant `L` is `p#` itself, so the diagonal problem does not
   arise there and does arise here. [DERIVED, and the closures it has already
   produced are recorded at HEURISTIC in `object-bridge-read-0829.md` §5.]
3. **On the integer ensemble the hypothesis fails, and its replacement is
   worse.** If the ensemble is taken over the integers instead, `t` ranging
   over `[1, X]`, counting twin **primes** in `[t, t+H)`, then translation does
   not preserve the measure of interest, since the twin-prime density falls like
   `1/ln^2 t`, and the transitivity hypothesis of §7a is simply false. So the
   equivariance argument does **not** transfer verbatim to that ensemble. What
   replaces it is not weaker: Maier (1985) shows primes in intervals of length
   `(log x)^lambda` with `lambda > 1` are not uniformly distributed, and the
   zone window is `(ln W)^2`, so every heuristic of the form "the zone behaves
   like a typical window" is known to fail for the analogous prime statement at
   the analogous scale (`paper/wall-note.md` §2 Face 1,
   `paper/moire-primes.md` §9). The one ensemble on which the equivariance
   argument does not apply is the one on which a provable irregularity theorem
   does. [DERIVED, on two cited results.]

**The hypothesis a zone-side localisation would need, and it differs in kind
from the tile's.** On the tile, reaching `t = 0` requires a hypothesis naming
the arithmetic of the phase where every prime's strike classes sit at
`{0, -2}`. On the zone, the anchor is distinguished by a **level-position
coincidence**, the sifting level `p` and the window's right endpoint `p'^2`
satisfy `u = 2`, which is exactly what makes roughness imply primality inside
the window (§3c Part 3). That is not a property of the position alone; it is a
property of the pair (level, position). So a theorem that localised at the zone
anchor would have to name a relation between the sieve's level and the window's
location, where the tile's would have to name a phase. Both are outside the
field of translation-equivariant theorems, and neither is a weaker requirement
than the other; they are different requirements. [DERIVED. This is the one place
where the answer to question 2's "or does the zone anchor sit in an ensemble
where the argument needs a different hypothesis" is **yes**, and the difference
buys nothing.]

### 7d. Is the zone anchor a diverging outlier of its own window ensemble? Not answered here, and one coordinate is measured

**What is measured, and it is adverse.** In the density coordinate the zone
anchor's deviation is known exactly at the zone's own width: the origin's
density advantage **reverses** at `S = x'^2`, where `u = 2` is the minimum of
the survival curve, and the anchor carries about 21% **less** than the ensemble
mean, ceiling `rho(2) = e^{2 gamma}/4 = 0.793055` [PROVEN mechanism, MEASURED
0.79303 at `x = 1487`, `research/origin-excess.md` §2, §5; the same constant
read on the finer stretch grid at 0.7980, 0.7978, 0.8021, 0.7946 across four
`q`-bands to 1e8, `stretch-01.md` §3]. So on the zone side the anchor is not a
favourable outlier and Route B is CLOSED and ADVERSE in `research/REFUTED.md`.

**What is not measured, and it is the actual question.** A density ratio is not
a `z`-score. `paper/wall-note.md` Face 1 prices the tile anchor's deviation as
`z = +1.05` at `x = 7` falling to `z = -22,633` at `x = 37`, across the nine
levels where the **ensemble variance is certified**. No corpus artifact
certifies the variance of the window-count statistic at window width `p'^2`, so
the zone anchor's `z` is **not computed anywhere**, and a constant ratio of
0.793 is consistent with a `z` that diverges, stays bounded, or shrinks,
depending on how the variance scales. **This note does not compute it.** The
brief's 20-minute clause was checked: `research/window-check.js` reproduces
`ZONE-POSTULATE.md` §4's margins and does not produce an ensemble variance at
this window width, and no other producer found does either, so there was no
existing producer to cite and nothing was run. The honest state of question 2's
second half is **OPEN**, with the density half MEASURED and adverse.

**Verdict on question 2.** The argument transfers, verbatim and by restriction
rather than by analogy; the ensemble is `E_p`, the group is `Z/p#`, and the
action is simply transitive; three zone-side differences exist and all three are
adverse; the anchor is not a weaker outlier in the one coordinate that is
measured; and whether it is a diverging outlier in the `z` coordinate is open
for want of a certified variance at window width `p'^2`. **The wall is not
located differently on this object.** [DERIVED, one measured input, one OPEN
half.]

---

## 8. What this note contradicts in the live layer

**Nothing below is applied.** Each item gives the file and line, what stands
there, and proposed replacement text. Three of the four are documentary; none
changes a number, an exponent, a route status or a calibration. The one with
mathematical content is item 2, and it corrects a forbidden set without
changing the verdict that forbidden set supports.

### Change 1, `paper/wall-note.md`:177-187, the two tests are run together

**What stands** (lines 177-187): one paragraph runs the H5 test on the tile
statement ("does not satisfy the obstruction's hypothesis"), then the H5 test on
the zone statement, then the **method** scoping ("it covers Door 5, which uses
no sieve weight to reweight, and it does not cover any route that proves the
zone statement by bounding sums against a non-negative sieve weight"). The
scoping sentence is correct and the paragraph does not say that it is a
different test from the two before it, so the paragraph reads as though H5-failure
were itself the licence.

**Proposed insertion**, after "...bounding sums against a non-negative sieve
weight." on line 187:

> These are two different tests and the second is not a corollary of the first.
> H5 is a test on a statement's target property; Claim 1's *proof* is a test on
> an argument's shape, and its reweighting has purchase only on an argument
> whose conclusion is "there exists n in the support of ν". Exemption therefore
> does not close under deduction: an argument establishing the tile statement
> establishes its zone consequences too, and those satisfy H5. What survives is
> only a route with no non-negative sieve weight anywhere, which is why the
> exemption's whole extent is Door 5.

[Rung of the inserted claim: DERIVED, `history/staging/derive-0904-r0-extension.md`
§1d, no adversarial pass.]

### Change 2, the zone property confines one coordinate where it needs two

**Three sites carry the same property with one coordinate bounded:**

- `paper/wall-note.md`:181-182, "the reduction to the conjecture uses the tile
  only inside the zone, where an x-rough number is prime, and there the
  property's extension *is* the set of twin prime pairs".
- `research/history/staging/lit-tao-parity.md`:313, "`P_zone(l₁,l₂)` :=
  \"`l₁, l₂` are both coprime to `x#`, and `x < l₁ < x′²`\"".
- `research/history/staging/object-bridge-read-0829.md`:471, "The zone property
  \"coprime to x#, and x < l₁ < x′²\" has extension exactly ...".

**Why it matters.** H4 quantifies over the `l_i` **independently**, so a bound
on `l₁` alone leaves `l₂` free, and the extension is then
`{(prime in the zone, any x-rough number)}` rather than a set of pairs. Its
forbidden set is `{(+1,+1), (+1,-1)}`, whose convex hull is `{+1} x [-1,1]`, and
the origin is **not** in it: H5 fails on the property as written. The verdict the
three sites draw is nevertheless correct, because the property the reduction
needs bounds both coordinates.

**Proposed replacement at `lit-tao-parity.md`:313 and, in the same words, at the
other two sites:**

> `P_zone(l₁,l₂)` := "`l₁` and `l₂` are both coprime to `x#`, and both lie in
> `(x, x′²)`". Both bounds are needed: H4 quantifies over `l₁` and `l₂`
> independently, so bounding only `l₁` leaves the second coordinate free and
> the forbidden set is `{(+1,+1), (+1,−1)}`, whose hull misses the origin.

**And a second sentence, proposed at `wall-note.md`:182**, replacing "the
property's extension *is* the set of twin prime pairs":

> the property's extension is the set of pairs of primes in `(x, x′²)`, whose
> forbidden set is Example 3's. Phrasing it as "the set of twin prime pairs" is
> also correct but borrows the conjecture, since the pattern `(−1,−1)` is then
> realised only if the zone is occupied; the pairs-of-primes phrasing gets the
> same forbidden set unconditionally, with Bertrand supplying the witness.

[Rung: DERIVED, §1c and §2b, no adversarial pass.]

### Change 3, `research/history/staging/z2-state-draft-0829.md`:1141, "by analogy"

**What stands:** the equivariance killer is "currently imported to the zone side
by analogy, and an analogy is not a coordinate."

**Proposed replacement:**

> currently described as imported to the zone side by analogy. It is not an
> analogy: by the Zone Restriction Lemma the zone window is the tile's own head
> window read at the tile's own phase, so the transfer is a restriction, the
> group is `Z/p#` acting simply transitively on window positions, and the
> `eps * |ensemble| < 1` threshold is identical. What is genuinely open on the
> zone side is the anchor's `z`-score at window width `p'^2`, for which no
> corpus artifact certifies the variance.

[Rung: DERIVED, §7b and §7d, no adversarial pass. This is a staging draft rather
than a live file; it is listed because the sentence would otherwise be promoted
as written.]

### Change 5, `TODO.md`:287, the ledger gate's one open finding

`node research/qc.js ledger` was run against this note and returns exactly one
finding, which is the gate working as designed:

> `TODO.md:95  item Z2 does not list Q-derive-0904-r0-extension
> (research/history/staging/derive-0904-r0-extension.md, ANSWERED) on its
> Ledger: line`

**Proposed:** append `Q-derive-0904-r0-extension` to item Z2's `Ledger:` line at
`TODO.md`:287. Not applied: this note edits no existing file, and `TODO.md` is
already modified in the working tree by other work in this wave, so an edit here
would collide. The other twelve fast checks return clean against this note
(refs, quotes, crosslinks, transfers, calibration, absence, sourcing, embeds,
provenance and search-convention all read 0; the `scripts` and `widths`
findings in that run belong to other agents' files).

### Change 4, no change proposed to `research/QUESTIONS.md`

`z2-state-draft-0829.md` §8 questions 1 and 2 are answered by §§2-6 and §7
respectively. Both were checked against `research/QUESTIONS.md` before this note
was written (grep for "extension", "parity", "equivariance", "Liouville"): the
nearest rows are `Q-obstruction-audit` (ANSWERED, a different question, whether
parity is the right name for what blocks the tile form) and `Q-parity-adversary`
with `Q-parity-dstar-law-0829n` (ANSWERED and CLOSED, an adversary construction
on the stretches, a different object). No row poses either question, and neither
was re-run. Whether this note's ledger row should join `QUESTIONS.md` is the
orchestrator's call, not this note's; it edits nothing.

---

## 9. What would falsify this note, and whether the check has run

Each item names a specific check and its status. None of the four has run
against an adversary; every proposition here is at rung DERIVED for that
reason.

1. **Proposition A's forward half is false if two forbidden patterns of the
   given shape are not actually forbidden.** The check: for a named property,
   exhibit `l_1, ..., l_k` obeying `P` with pattern `(-e_i, e_j, d)` or
   `(e_i, -e_j, -d)`. That is impossible by construction when coordinates `i`
   and `j` are monochromatic, so falsifying this means falsifying
   monochromaticity, i.e. exhibiting a `p`-rough integer in `(p, p'^2)` that is
   not prime. The Zone Restriction Lemma rules that out and is VERIFIED at five
   levels. **Check has run, at the lemma.**

2. **Proposition A's converse half is false if a confined-rough property with
   `|S| <= 1` nevertheless satisfies H5.** The proof covers pure products only;
   for a property with a further condition `R` the extension can be smaller and
   more patterns forbidden. So the converse is stated for products and is
   **unchecked** outside them. A falsifier would be an R0-frame statement with at
   most one monochromatic coordinate whose extra conditions forbid enough extra
   patterns to capture the origin. §5's table lists three `|S| <= 1` rows and
   none has a condition of that kind; the table's completeness is the exposure.
   **Not run against an adversary.**

3. **Proposition B is false if Claim 1's reweighting does bite an argument
   whose conclusion is a fixed arithmetic fact.** The check is a reading of the
   proof in `lit-tao-parity.md` §1.6 and it turns on whether `nu -> nu w` can
   change the truth value of a statement about `Z/x#`. It cannot, since neither
   `nu` nor `w` appears in that statement. What is **not** checked is whether
   Tao's own scoping would call the composite route an instance of the method
   class anyway; the source does not address a composite of that shape, and this
   note's reading is therefore an extrapolation from the proof rather than a
   quotation. **Not run against the source, and not runnable: the source does
   not speak to it.**

4. **Proposition C is false if a piece of the R0 frame has a target property
   that is not confined-rough.** The shape that would do it: a target whose
   coordinates are constrained by something other than a modulus and an
   interval, for instance a multiplicative or bilinear condition on the pair,
   which is where every published parity break lives (Friedlander-Iwaniec's
   (B), and its norm-form constraint, `lit-tao-parity.md` §3.2 E5). No piece of
   R0 has such a condition, and `history/staging/attack-bilinear-transplant.md`
   closed the family for this frame on the ground that every bilinear object the
   corpus owns is bilinear over **moduli**. **Check has run at that closure, in
   a different context; it has not been re-run against R0's pieces one by one
   beyond §5's table.**

5. **Everything COVERED is conditional on H6.** Claim 1 is at rung CONJECTURED
   by its author. If Liouville pseudorandomness fails, the Siegel-zero
   scenario is the named instance, and `attack-barrier-kappa2.md` §0's caveat
   applies in full, since Heath-Brown 1983 makes that a world where the target
   is already a theorem, then every COVERED verdict is void. **This is not a
   check that can run; it is a standing hypothesis, and it is the reason no row
   of §5 may be quoted as an impossibility.**

6. **Part 2's open half.** A certified variance for the window-count statistic
   at window width `p'^2` would turn §7d's OPEN into a number, and if the
   anchor's `z` there were bounded while the tile's diverges, §7's "the wall is
   not located differently on this object" would need qualifying. **Not run; no
   producer in the corpus delivers it.**

---

*Staging note. `README.md` §Status, `research/G2-STATE.md` §0 and
`research/ZONE-POSTULATE.md` remain canonical and win against anything here.*
