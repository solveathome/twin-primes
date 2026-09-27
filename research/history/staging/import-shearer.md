# Foreign import 3 of 5: the repulsive lattice gas, and where Shearer's region actually ends

<!-- ledger
id: Q-import-shearer
status: ANSWERED
todo: none
question: Where does Shearer's region actually end for the fold read as a repulsive lattice gas?
verdict: SURVIVES WITH CORRECTIONS under the 2026-08-19 adversarial pass: the complete-graph identity is verified by independent-set enumeration at n = 2..8, H* = 35..481 reproduce exactly and the 2/sqrt(e) floor is sound, but the tightness witness's disjoint-intervals sentence is false exactly where invoked and the atomicity lemma's hypothesis is load-bearing and not shown, the closure surviving instead on the sequel's gamma_i >= mu(f_i).
-->

**ADVERSARIAL OUTCOME, 2026-08-19 (`adversary-wave2.md`): SURVIVES WITH
CORRECTIONS.** The complete-graph identity verified by independent-set
enumeration at n = 2..8 with unequal marginals; H* = 35..481 reproduce
exactly; the 2/√e floor is sound; completeness IS forced given the frame
(exact pairwise independence on an interval needs pq | H); the matching-graph
reading is correctly quarantined. The corrections: (1) the tightness
witness's "disjoint intervals" sentence is false exactly where invoked — once
Σ2/p > 1 there is no room; the working construction is arcs laid END TO END
on ℝ/ℤ (coverage exactly 1 from x = 13); conclusion untouched. (2) The
atomicity lemma's hypothesis is load-bearing and NOT shown for this object
(a non-atomic instance violates it; μ was presumed uniform) — the A–I closure
survives via the citation already carried: the sequel's γ_i ≥ μ(f_i), which
holds with no atomicity hypothesis. §1's "closed by three mechanisms" reads
as three proofs; §8d's own [INFERRED] tag on that leg is the honest grade.
(3) "At H ≥ x² the cross-prime edges vanish" is too generous — exact
independence for ALL pairs needs the primorial ∏ p | H, not x²; inherited
from `import-suen.md` §8, and it cuts in this record's favour. Pre-
registration custody: PROVABLE — the only one of the four (committed alone,
before the producer existed).

*(2026-08-19. Shearer's exact criterion and the independent-set polynomial,
imported against the local-lemma wall of
`research/history/staging/import-suen.md` §8 and the covering economy of
`research/sift-limit-attack.md` §7. Pre-registration
`import-shearer-prereg.md`, written and committed before the computation
existed. Companion computation `research/import-shearer-01-region.js`, bound to
its own output by `research/qc/embed.js`; every figure below is in that file's
OUTPUT block. Legend as in `research/sift-limit-attack.md`: **[PROVEN]**
published theorem with source, or a proof given here; **[VERIFIED]** checked
computationally here; **[MEASURED]** empirical, finite range; **[INFERRED]** our
deduction from sourced facts; **[ABSENT]** searched and found nothing, with the
channel named.)*

---

## 1. The headline

**The exact criterion says the local lemma is the union bound, and the two
levels it buys over the local lemma's own sufficient condition are the only
thing it buys.** Five results.

1. **On a complete dependency graph Shearer's region is exactly the simplex
   `Σ_v p_v < 1`.** The only independent sets of `K_n` are the empty set and the
   singletons, so `Z_{K_n[S]}(−p) = 1 − Σ_{v∈S} p_v` and Shearer's criterion
   collapses to the union bound, with no slack in either direction. For the
   corpus's kill events that is `Σ_{5≤p≤x} 2/p < 1`, the Mertens threshold, and
   it is an identity rather than a coincidence. [PROVEN, §3]
2. **So the last feasible level is `x = 11` and the wall is at `x = 13`, not at
   `x = 7`.** `IMPORT-MAP.md` row 3 pre-registered the boundary as the Mertens
   threshold *and* the wall as `x = 7`; those two are two levels apart in the
   corpus's own embedded table. The first half is confirmed as an identity, the
   second is refuted. `x = 7` is where the *sufficient* asymmetric local lemma
   dies, and it dies there even when the weight vector is optimised without the
   `x_q = c/q` ansatz. [VERIFIED, §4]
3. **The over-certification of the pairwise-drawn graph is a number, and the
   number is far worse than `x²`.** With the graph rule `p ∼ q` iff `pq > H`,
   the exact Shearer threshold `H*(x)` is 35, 55, 65, 91, 115 at
   `x = 13, 17, 19, 23, 29`, against `x² =` 169, 289, 361, 529, 841. The
   exponent `ln H*/ln x` sits at about **1.41**, flat over seventeen levels, and
   its proven floor is `2/√e = 1.2131` by a clique argument plus Mertens.
   The pairwise-drawn local lemma does not merely prove the twin prime
   conjecture, it proves a statement an order of magnitude stronger, and that is
   the sharper form of the diagnosis. [VERIFIED §5; the floor PROVEN §5]
4. **The tightness this row was bought for needs no theorem at the reading that
   matters.** On a complete dependency graph the extremal probability space is
   the disjoint one and can be written down in a line: disjoint intervals of
   lengths `1/p, 1/p` in `[0,1)`, which carry the right marginals, respect the
   within-prime mutual exclusion, and cover `[0,1)` exactly when `Σ 2/p ≥ 1`. So
   the closure of the graph-plus-marginals family from `x = 13` on is
   self-contained and does not rest on Shearer's *Combinatorica* paper.
   [PROVEN, §6]
5. **The closure the row was bought for survives as a conclusion and fails as a
   mechanism.** Shearer's tightness does **not** close Moser–Tardos, which
   provably exceeds Shearer's bound on any non-chordal dependency graph, and
   does **not** close Achlioptas–Iliopoulos, whose framework never claims
   Shearer and whose causality digraph can be empty where the dependency graph
   is dense. Both are nonetheless closed for *this* object, by two further
   mechanisms: a complete graph is chordal and the corpus's dependent pairs are
   mutually exclusive, which are exactly the two cases those authors name as
   inescapable; and atomicity forces Achlioptas–Iliopoulos's `1/A_f ≥ μ(f)` on a
   causality digraph this object makes complete, which puts their asymmetric
   condition at the local lemma's own wall, `x = 7`, and their symmetric
   corollary at `x = 5`. [§8, sourced]

**And the import's verdict on the tool.** The exact criterion is worth two
levels and no more, because the object it is exact about — a graph and a list of
marginals — is not where this problem's information lives. Everything that
separates `x²` from `x^{4.2665}` is in the conditioning sets, exactly as
`import-suen.md` §8 addressed it, and Shearer's criterion is blind to them by
construction.

---

## 2. Instrument

`research/import-shearer-01-region.js`, 15.9 s. It computes
`Z_{G[S]}(−p) = Σ_{I independent in G[S]} ∏_{v∈I}(−p_v)` for **every** subset
`S` of the vertex set by the deletion recursion
`Z[S] = Z[S∖v] − p_v·Z[S∖N[v]]`, `v` the lowest set bit — exact enumeration of
the criterion, not a sample and not a bound.

**The arithmetic is exact.** `Z[S]·D` is an integer for `D = ∏_{5≤p≤x} p`,
because every term of `Z` has denominator `∏_{p∈I} p | D`, and in the recursion
the factor `Z[S∖N[v]]` carries no `p_v` in any denominator, so the division by
`p_v` is exact. The DP therefore runs in `BigInt` with exact division, and every
feasibility verdict is a sign of an integer with no tolerance anywhere. A
float DP runs alongside to the size ceiling and agrees: at `x = 29`, `H = 200`,
both return `Z_full = 1.316912588760e-1`. [VERIFIED]

The instrument reproduces what it must before it is used. On `K_n` with equal
probabilities the computed Shearer boundary is 0.50000000, 0.33333333,
0.25000000, 0.20000000, 0.16666667, 0.12500000 at `n = 2, 3, 4, 5, 6, 8`, i.e.
exactly `1/n`. On the matching graph the computed `Z_full` equals `∏(1−2/p)` to
every printed digit at all eight levels. `Σ_{5≤p≤x} 2/p` is recomputed only as
an instrument check and reproduces `import-suen-01-transfer.js`'s embedded PART
D column (0.4000, 0.6857, 0.8675, 1.0214, 1.1390, 1.2443, 1.3312, 1.4002) at all
eight levels; it is not a new measurement. [VERIFIED]

---

## 3. The model, and the one identity that decides it

**The model is taken from the Suen import, not re-derived.** Level `x`, scour
primes `5 ≤ p ≤ x` (Natal@5; `p = 3` is carried by the comb), `K = π(x) − 2` of
them. Two bad events per prime, `A_p^L = {p | r}` and `A_p^R = {p | r+2}`, each
of probability exactly `1/p`, mutually exclusive because `p | r` and `p | r+2`
would force `p | 2` (`import-suen.md` §3). The dependency graph, parameterised
by the window length `H`: `A_p^• ∼ A_p^•` always, and `A_p^• ∼ A_q^•` for
`p ≠ q` iff the window fails to equidistribute modulo `pq`, i.e. iff `pq > H`
(`import-suen.md` §8). At `H ≥ x²` the cross-prime edges all vanish and the
graph is a perfect matching; refusing to verify any cross-prime conditioning
makes it complete on the `2K` events.

**The two-class model and the one-event-per-prime model are the same Shearer
problem.** The two events of a prime are adjacent, so an independent set takes
at most one of them, and the two choices carry equal weight `−1/p`; the pair
contributes `−2/p` and the polynomial is that of the `K`-vertex graph with
marginals `2/p`. Verified rather than assumed, by brute force over all `2^{2K}`
subsets of the `2K`-vertex graph against all `2^K` subsets of the `K`-vertex
graph: **38 (level, `H`) pairs tested, 38 agree, 0 disagree**, spanning the
complete graph, `H = x²` and three intermediate `H` per level. [VERIFIED]

**The identity that decides everything below.** For the complete graph `K_n` the
independent sets are `∅` and the singletons, so for every `S ⊆ V`

> `Z_{K_n[S]}(−p) = 1 − Σ_{v∈S} p_v`,

minimised at `S = V`. Hence `R(K_n) = {p : Σ_v p_v < 1}` **exactly**: Shearer's
region on a complete dependency graph is the union bound, no larger and no
smaller.

**This is in print and the corpus should cite it rather than claim it.**
Scott–Sokal, arXiv:cond-mat/0309352v2, Example 3.1, verbatim from the PDF:

> **Example 3.1. The complete graph K_n.** Clearly `Z_{K_n}(w) = 1 + w_1 + … +
> w_n`. In particular, `R(K_n) = {R: R_1 + … + R_n < 1}`.

[PROVEN, published]

That is the whole content of this import in one line, and it inverts the reason
the row was proposed. The row was priced on Shearer's criterion being *stronger*
than the union bound. On the graph the corpus is forced to use, it is *equal* to
it.

---

## 4. The region at each level, and the pre-registered threshold

`t*` is the exact critical scale along the ray `t·(2/p)`: the true marginals lie
in the region iff `t* > 1`, so `t*` is the region's boundary in the one
coordinate the problem moves along. [VERIFIED, all columns]

| x | K | `Σ_{5≤p≤x}2/p` | complete: Shearer | `t*_Sh` | complete: LLL | `t*_LLL` | matching: Shearer | `t*_Sh` |
|---|---|---|---|---|---|---|---|---|
| 5 | 1 | 0.400000 | **YES** | 2.5000 | **YES** | 2.5000 | YES | 2.5000 |
| 7 | 2 | 0.685714 | **YES** | 1.4583 | no | 0.7343 | YES | 2.5000 |
| 11 | 3 | 0.867532 | **YES** | 1.1527 | no | 0.5207 | YES | 2.5000 |
| 13 | 4 | 1.021379 | no | 0.9791 | no | 0.4206 | YES | 2.5000 |
| 17 | 5 | 1.139026 | no | 0.8779 | no | 0.3670 | YES | 2.5000 |
| 19 | 6 | 1.244289 | no | 0.8037 | no | 0.3298 | YES | 2.5000 |
| 23 | 7 | 1.331245 | no | 0.7512 | no | 0.3044 | YES | 2.5000 |
| 29 | 8 | 1.400211 | no | 0.7142 | no | 0.2869 | YES | 2.5000 |

**`t*_Sh` on the complete graph is `1/Σ2/p` at every level to four decimals**,
which is §3's identity read off the machine.

**The matching column reproduces a constant of Shearer's own.** `t*_Sh = 2.5000`
at every level, because the binding component is the single edge at `p = 5` and
`1 − t·(2/5) > 0` needs `t < 2.5`, i.e. the edge tolerates marginals up to `1/2`
each. Shearer's abstract defines `f(d)` as the supremum of `x` such that
marginals `≤ x` and maximum degree `≤ d` force positive avoidance probability,
and states `f(1) = 1/2` (read at the Springer landing page for *Combinatorica* 5
(1985) 241–245; the article text is closed, see §8). The instrument's
`n = 2` boundary is `0.50000000`. That is `f(1)`, recovered from the DP.
[VERIFIED against a published constant]

**The pre-registered claim splits into a confirmed half and a refuted half.**
`IMPORT-MAP.md` §4 registered: *"the feasible boundary coincides with the
Mertens threshold `Σ 2/p < 1`, so that `x = 5` is the last feasible level and
the wall arrives at `x = 7`"*. The first clause is **confirmed, and upgraded
from a coincidence to an identity**. The second clause is **refuted by two
levels**: the boundary is crossed between `x = 11` (0.867532) and `x = 13`
(1.021379), which is exactly where `sift-limit-attack.md` §7 already puts the
Mertens wall. The two clauses were never compatible, and
`import-suen-01-transfer.js`'s own embedded table is what shows it.

**Where `x = 7` comes from, and why dropping the ansatz does not save it.** The
`x = 5 / x = 7` pair is the largest feasible level of the *sufficient*
asymmetric local lemma, `p_v ≤ x_v ∏_{w∼v}(1 − x_w)`. `import-suen.md` §8(ii)
tested it under the ansatz `x_q = c/q`. Optimised over **all** weight vectors it
still succeeds at `x = 5` and fails from `x = 7`, with critical scales 2.5000,
0.7343, 0.5207, 0.4206, 0.3670, 0.3298, 0.3044, 0.2869 at `x = 5..29`. So the
ansatz was not the loss; the sufficient condition is. [VERIFIED]

The size of the loss is the classical one. On `K_n` the ratio of the Shearer
boundary to the LLL boundary runs 2.0000, 2.2500, 2.3704, 2.4414, 2.4883, 2.5465
at `n = 2, 3, 4, 5, 6, 8`, climbing toward `e`: the symmetric local lemma's
`e·p·(d+1) ≤ 1` is exactly a factor `e` short of the truth on a clique.
**Two levels of the corpus's ladder is what a factor `e` is worth here**, and
that is the honest size of the whole import. [VERIFIED] The limit is not a fit:
writing `p = a/n` in the feasibility condition `∏_v(Q + p_v) ≤ Q^{n−1}` gives
`ln Q + a/Q ≤ 0`, maximised at `Q = 1/e` with `a = 1/e`, so the local lemma's
boundary on `K_n` is `p ~ 1/(en)` against Shearer's `1/n`. [PROVEN]

**The kill criterion, on both of its readings.** The map's own kill is *"if
`R(G)` extends past the Mertens threshold at any level, the family is not closed
and Regts's zero-free route is live."* On the complete graph it **cannot** fire,
because `R(G)` *is* the Mertens threshold: the two sets are equal, so there is
nothing to extend past. On the sparse graph it fires vacuously — the matching
graph is feasible at every level with margin 2.5000 — and that is not evidence
for Regts, it is `import-suen.md` §8(i)'s wrong proof of the conjecture with a
sharper number attached (§5). The kill as the experiment's brief restated it,
*"if Shearer's region extends past `x = 5`"*, **does** fire: it extends two
levels, to `x = 11`. What it costs is the honest part of the answer: **nothing**.
No hypothesis is needed, because the two levels are the gap between a sufficient
condition and an exact one. And what transfers is not something the union-bound
reading missed. It is the union bound.

**The eighth arrival at the Mertens wall, and the first that is an identity.**
`sift-limit-attack.md` §7 records the covering-economy arrival as the sixth,
`import-suen.md` §8 its own as the seventh. This is the eighth, and it differs
from all of them in kind: the others reach `Σ 2/p < 1` as the content of an
inequality that happens to degrade there, while Shearer's criterion on a
complete graph *is* that condition, with the extremal space of §6 as the
certificate that nothing weaker exists.

---

## 5. The exact threshold on the true `H`-graph, and the exponent it certifies

With the cross-prime rule `p ∼ q` iff `pq > H`, feasibility is monotone in `H`
(more edges is a smaller region), verified by full scan of the candidate set
`{p·q}` at every level with `K ≤ 10` rather than assumed. Define
`H*(x) = min{H : the marginals lie in R(G(H))}` and `θ = ln H*/ln x`. The `p²`
rule is `θ = 2`.

| x | 13 | 17 | 19 | 23 | 29 | 43 | 61 | 79 |
|---|---|---|---|---|---|---|---|---|
| `H*(x)` | 35 | 55 | 65 | 91 | 115 | 209 | 319 | 481 |
| `θ` | 1.3861 | 1.4144 | 1.4177 | 1.4386 | 1.4091 | 1.4204 | 1.4024 | 1.4134 |
| `x²` | 169 | 289 | 361 | 529 | 841 | 1849 | 3721 | 6241 |
| `H*/x²` | 0.20710 | 0.19031 | 0.18006 | 0.17202 | 0.13674 | 0.11303 | 0.08573 | 0.07707 |

At `x ≤ 11` the complete graph already passes, so `H*` is 0 and the exponent is
undefined. [VERIFIED]

**Reading.** The exact criterion applied to the pairwise-drawn graph certifies a
survivor in a window about a **tenth** of the `p²` rule's length, and the ratio
is still falling. `import-suen.md` §8(i) diagnosed the pairwise-drawn local
lemma as "an argument that proves the twin prime conjecture". The exact
criterion sharpens that: it proves something an order of magnitude stronger than
the conjecture, so the defect is not a near-miss to be repaired but a hypothesis
that is simply not being verified.

**The exponent has a proven floor at `2/√e`.** [PROVEN] The primes in `(√H, x]`
are pairwise adjacent in `G(H)`, so they induce a clique, and by §3's identity a
clique needs `Σ_{√H<p≤x} 2/p < 1`. Mertens turns that into
`ln(ln x / ln√H) < 1/2`, i.e. `ln H > 2e^{−1/2} ln x`, so

> `θ ≥ 2/√e = 1.2130613194` asymptotically.

The clique-only necessary condition, which is arithmetic and needs no DP, reads
`θ_c =` 1.111542, 1.188678, 1.199746, 1.208307, 1.210244, 1.212133 at
`x = 101, 1009, 10007, 10⁵, 10⁶, 10⁷`, converging to that value from below as
Mertens says it must. [VERIFIED]

**The pre-registered prediction that `θ` would drift down to the floor is not
confirmed.** Over the seventeen levels `x = 13` to `x = 79` the measured `θ`
hovers at about 1.41 with no trend, 0.2 above the floor. The gap is the part of
Shearer's criterion that the clique condition does not see, and in the
computable range it does not close. Registering it as a measurement rather than
a trend is the honest reading. [MEASURED]

---

## 6. Tightness, written out rather than cited

The map priced this row on Shearer's tightness clause, and flagged that
Shearer's own paper had not been opened. At the reading that decides the
corpus's question the clause is not needed, because the witness is elementary.

**On a complete dependency graph, the extremal space is the disjoint one.**
[PROVEN] A complete dependency graph imposes no independence requirement at all,
so every probability space with the right marginals is admissible. Take
`Ω = [0,1)` with Lebesgue measure and lay the `2K` events out as **disjoint**
intervals of lengths `1/p, 1/p`. That realises the marginals exactly, and it
respects the within-prime mutual exclusion that `import-suen.md` §3 proves is a
fact about the arithmetic rather than a modelling choice. Their union has
measure `Σ 2/p`, so as soon as `Σ 2/p ≥ 1` the intervals cover `Ω` and

> `P(no bad event) = 0` exactly.

| x | 5 | 7 | 11 | 13 | 17 | 19 | 23 | 29 |
|---|---|---|---|---|---|---|---|---|
| `Σ2/p − 1` | −0.600000 | −0.314286 | −0.132468 | +0.021379 | +0.139026 | +0.244289 | +0.331245 | +0.400211 |
| witness with `P(survive) = 0` | no | no | no | **yes** | **yes** | **yes** | **yes** | **yes** |

**What this does and does not say.** The witness is a probability space, not a
covering of an interval by residue classes. It does not say the arithmetic
instance is bad; the arithmetic instance is `G₂`, and nothing here bounds `G₂`
from either side. What it says is a statement about a class of arguments: **from
`x = 13` on, no argument whose only inputs are the dependency graph and the
per-event marginals can certify a survivor**, because a space consistent with
both inputs has no survivor at all. The only way past it is to verify
conditioning on sets, which is `import-suen.md` §8's admissible
conditioning-set modulus, and which prices out at Bonferroni depth.

Shearer's theorem is what carries the same statement for the **sparse** graphs,
where no such elementary witness is available, and that is where it stays
load-bearing.

**The general clause, sourced.** Scott–Sokal, arXiv:cond-mat/0309352v2, Theorem
4.1(b), verbatim from the PDF, with `R(G)` their Definition 2.14:

> (b) If `p ∉ R(G)`, then there exists a probability space on which there can be
> constructed:
> (i) A family of events `(B_x)_{x∈X}` with probabilities `P(B_x) = p_x` and
> strong dependency graph `G`, satisfying `P(⋂_{x∈X} B̄_x) = 0`;

and their Remark 2 to the same theorem is what makes the clause bite here,
verbatim:

> Though (4.1) is the weak hypothesis of the lopsided Lovász local lemma
> (Theorem 1.2), we will prove in (a) and (b) that the extremal families
> `(B_x)_{x∈X}` and `(B′_x)_{x∈X}` have `G` as a strong dependency graph.
> Therefore, all three dependency hypotheses lead to the same optimal lower
> bound on `P(⋂_{x∈X} Ā_x)`.

**So lopsidependency buys nothing over ordinary dependency at the optimum**,
which retires a hope `import-suen.md` §3 left open: the lopsided local lemma is
the member of the family that applies to these mutually exclusive events, and at
the exact boundary it lands in the same place. [PROVEN, sourced]

Their construction is the one PART E writes out, in their own words, verbatim:
*"An intuitively reasonable way to do this is to make the events `B_x` as
disjoint as possible"*. And their Remark 1 states the monotonicity the
computation checked by scan, verbatim: *"adding more edges reduces `p_x` (since
there are fewer conditional probabilities to control) but also shrinks the set
`R(G)`"*.

**One nuance that must not be dropped: the region is the open one.** The
criterion in the strict form `Z_{G[S]}(−p) > 0 for all S ⊆ V` is the open region
and equals `{p : avoidance probability > 0}`; the non-strict form `q_S ≥ 0`
defines the closed region, whose boundary can carry avoidance probability zero.
Every verdict in this file uses the strict form, computed as the sign of an
exact integer, so the boundary cases are decided rather than assumed. At the
levels that matter nothing sits on the boundary: `Σ2/p − 1` is `+0.021379` at
`x = 13`, comfortably inside the failing side.

---

## 7. The zero-free radius, which is what the map asked for first

`IMPORT-MAP.md` row 3's paragraph ends: *"The first thing to compute is whether
the zero-free radius for the corpus's own structure reaches past the Mertens
threshold `Σ 2/q < 1`."* It does not, and the answer is one line.

Scott–Sokal's equivalence is that the local lemma's conclusion holds for a
dependency graph and probabilities **iff** the independent-set polynomial is
non-vanishing in the corresponding polydisc (recorded verbatim in
`import-map-construction.md` §3). On the complete graph that polynomial is
`Z(z) = 1 + Σ_v z_v`, whose zero set is the hyperplane `Σ_v z_v = −1`, so `Z` is
non-vanishing on the closed polydisc `|z_v| ≤ p_v` **iff** `Σ_v p_v < 1`.

> **The zero-free polydisc reaches exactly to the Mertens threshold and not one
> step past it.** [PROVEN]

So Regts's route — absence of complex zeros implies strong spatial mixing — does
not add reach at this reading; it inherits the identical wall, because the zero
is sitting on the wall. It can only live on the sparse graph, and on the sparse
graph the corpus does not need it: §5 shows feasibility there is free and
absurdly over-generous. The missing ingredient in both directions is the same
one, and it is not decoupling between distant primes. It is verification of the
conditioning sets.

---

## 8. The closure, adjudicated against sources

`IMPORT-MAP.md` row 3 claims that Shearer's tightness *"closes entropy
compression, Moser–Tardos and the resampling-oracle programme as a class, which
is row 10."* **The conclusion holds for this object. The mechanism does not, and
carrying it as written would put a false general statement in the corpus.** Two
of the three family members provably exceed Shearer's bound, and the ones that
are closed here are closed by three different arguments.

### 8a. What tightness closes, and what it cannot

Shearer's tightness is a statement about a specific pair of inputs: an
undirected dependency graph and a vector of marginals, quantified over all
probability spaces. Every family member that beats it does so by consuming
strictly more, and the literature is explicit about the extra input in each
case. He, Li, Liu, Wang and Yin, arXiv:1709.05143, state the point in one
sentence, verbatim:

> As in Theorem 1 and Theorem 2, only dependency graphs and probabilities of
> events are involved in abstract-LLL. However, dependency graphs can only
> capture which events are dependent (more precisely, which events are
> independent), but not how they are dependent.

**So the map's parenthetical is not a qualifier, it is the entire theorem.** A
closure written without it is false.

### 8b. Moser–Tardos: not closed by tightness, closed here by chordality

Moser–Tardos provably escapes Shearer's bound. He, Li, Liu, Wang and Yin,
arXiv:2111.06527, abstract, verbatim from the arXiv abstract page:

> We show that the efficient region of the Moser-Tardos algorithm goes beyond
> the Shearer's bound of the underlying dependency graph, if the graph is not
> chordal. Otherwise, the dependency graph is chordal, and it has been shown
> that Shearer's bound exactly characterizes the efficient region for such
> graphs (Kolipaka and Szegedy, STOC'11; He, Li, Liu, Wang and Xia, FOCS'17).

and, on the mechanism, verbatim from the same abstract:

> Meanwhile, if any two dependent events are mutually exclusive, our criterion
> becomes the Shearer's bound, which is known to be tight in this situation for
> the Moser-Tardos algorithm

**Both of that theorem's exemptions apply to this corpus, and each one alone is
enough.** The complete graph is chordal, so `I_MT = I_a` and Moser–Tardos gains
exactly nothing at the reading where the corpus needs it. And at the other
reading, the matching graph, every dependent pair is mutually exclusive by
`import-suen.md` §3, which is the "extremal" case their sentence names as the
one where Shearer's bound is tight for the algorithm too. **The corpus's
instance is exactly the case where Moser–Tardos cannot escape**, at both ends of
the `H` interpolation. [PROVEN, sourced; the identification of our graphs as
chordal and extremal is INFERRED]

The variable-model existence statement escapes more broadly — the same authors
prove a gap appears whenever the base graph has an induced cycle of length at
least 4, and that deciding the variable-LLL boundary is `#P`-hard — but that
route was already priced out for this corpus on arithmetic: the variable model
needs the window to be a product space over the residues mod every `q ≤ x`,
which is `H ≥ x#` and not `H = x²` (`IMPORT-MAP.md` row 10, `import-suen.md`
§8). A complete graph has no induced cycle of length 4 either.

### 8c. Resampling oracles: closed by tightness, and the map is right about this one

Harvey–Vondrák do not exceed Shearer; they deliberately attain it. From
arXiv:1504.02044, verbatim:

> In fact, Shearer's criterion is the best possible: whenever his criterion is
> violated, there exist a corresponding measure μ and events E₁,…,E_n for which
> Pr_μ[∩_{i=1}^n Ē_i] = 0.

and their algorithmic result is stated *at* Shearer's criterion rather than past
it. Their extra input over a graph and marginals is the resampling oracle
itself, whose existence they prove equivalent to **lopsided association**, a
property of the measure, verbatim:

> (LopA) Pr_μ[E_i ∩ F] ≥ Pr_μ[E_i] · Pr_μ[F] for all i ∈ [n], for all F ∈ F_i,

quantified over all monotone events on the non-neighbours — which is the
set-wise quantifier again, in the form `IMPORT-MAP.md` row 10 already priced as
strictly stronger than all subsets. So this member is closed twice over.
[PROVEN, sourced]

### 8d. Achlioptas–Iliopoulos: not closed by tightness, and closed here by atomicity

This was the map's flagged unresolved item, and the flag was justified: **their
framework is orthogonal to Shearer's tightness, not defeated by it.** They never
claim Shearer's criterion; `Shearer` occurs once in their paper, in a survey
paragraph about Kolipaka–Szegedy. Their causality digraph can be empty where the
dependency graph is dense — their own `Δ+1` colouring example, verbatim from
arXiv:1406.0242v3:

> Thus, as soon as q ≥ Δ+1, the causality digraph becomes empty and rapid
> termination follows trivially.

So Shearer's tightness does not dispose of them, and `IMPORT-MAP.md` row 10's
closure cannot be written as if it did.

**They are nonetheless closed for this object, and the mechanism is their own
atomicity condition.** Their main theorem, verbatim from arXiv:1406.0242v3:

> **Theorem (Main result).** If there exist positive real numbers {μ_f} such
> that for every flaw f ∈ F, (1/A_f) ∏_{g ∈ Γ(f)} (1+μ_g) < μ_f, then for any
> ordering π of F and any σ₁ ∈ Ω, the uniform random walk on D_π starting from
> σ₁ reaches a sink within (T₀+s)/δ steps with probability at least 1−2^{−s}

with, verbatim, *"the **amenability** of a flaw f is A_f = min_{σ∈f}
|A(f,σ)|"*, and the standing structural hypothesis, verbatim:

> **Atomicity.** D is atomic if for every flaw f and state τ there is at most
> one arc incoming to τ labeled by f.

Their own sentence about the shape, verbatim: *"Observe the similarity between
the condition of Theorem [asymmetric] and the condition (1) of the general LLL
with 1/A_f replacing Pr(A_i)."*

**The one-line lemma that closes it.** [PROVEN] Atomicity says the arcs labelled
`f` have distinct heads, so the action sets `{A(f,σ) : σ ∈ f}` are pairwise
disjoint, so `|f|·A_f ≤ Σ_{σ∈f}|A(f,σ)| ≤ |Ω|`. Hence

> **`1/A_f ≥ |f|/|Ω| = μ(f)`, always.**

The quantity that replaces the marginal in their condition can never be smaller
than the marginal. This is not a defect of their framework and they say so
themselves in the sequel, arXiv:1507.07633, verbatim: *"In the general
(non-regenerative) case, we will have γ_i ≥ μ(f_i) always, but a potentially far
sparser causality graph."* **The entire escape is the sparser graph.**

**And this object does not supply a sparser graph.** Take `Ω` = the slots of a
window of length `H`, one flaw per prime, `f_p =` the slots killed by `p`, of
density `2/p`. Addressing `f_p` moves the slot, which changes its residue modulo
**every** other prime, so `f_p` potentially causes `f_q` for every `q`: the
causality digraph is complete. With `Γ(f)` complete and `1/A_f ≥ 2/p`, the main
theorem's condition is **exactly** the asymmetric local lemma on the complete
graph with marginals `2/p`, in the substitution `x_v = μ_v/(1+μ_v)`. §4 computed
that condition: it is feasible at `x = 5` and fails from `x = 7`. Their
symmetric corollary is harsher still — verbatim, *"If for every flaw f ∈ F,
Σ_{g ∈ Γ(f)} 1/A_g < 1/e"* — which on a complete causality digraph needs
`Σ 2/p < 1/e = 0.3679` and fails at `x = 5` already, since `Σ 2/p = 0.400000`
there. **Achlioptas–Iliopoulos does not merely fail to escape the wall; its
asymmetric condition arrives at the local lemma's wall, `x = 7`, two levels
before Shearer's `x = 13`, and its symmetric corollary arrives at `x = 5`.** [INFERRED from their sourced theorem
statements and §4's computed boundary]

To sparsify the causality digraph one needs moves that change the residue modulo
one prime without touching the others. That is the CRT product structure, and it
costs `H ≥ x#`. **The same wall, in the fourth vocabulary of the day.**

### 8e. Entropy compression

**[ABSENT.]** No theorem was found stating that entropy compression as a method
is limited by Shearer's bound, searched in the owning conventions
*entropy compression*, *entropic method*, *algorithmic local lemma* and
*Moser–Tardos*, per `research/SEARCH-CONVENTIONS.md`. What the sources support
is weaker and sufficient here: the published entropic conditions top out below
Shearer, since Achlioptas–Iliopoulos's Theorem 3 is the cluster-expansion form
(`θ_f = (1/(μ_f A_f)) Σ_{S ∈ Ind(Γ(f))} ∏_{g∈S} μ_g < 1`), which is strictly
weaker than Shearer's criterion, and §8d prices the entropic framework's own
condition on this object at `x = 5`. The honest statement for the record is
"entropy compression as published does not reach Shearer's bound here", not
"entropy compression is limited by Shearer's bound".

### 8f. The verdict, in one paragraph

**The family is closed for this route, at `x = 13` and past it, and it takes
three mechanisms rather than one.** Arguments whose only inputs are the
dependency graph and the marginals are closed by Shearer's tightness, and at the
complete-graph reading by §6's elementary witness. Moser–Tardos and the
variable-model family are *not* closed by tightness — they provably exceed it —
but are closed here because a complete graph is chordal and the corpus's
dependent pairs are mutually exclusive, which are precisely the two cases those
authors identify as the ones where no escape exists, and because the variable
model costs `H ≥ x#` anyway. Achlioptas–Iliopoulos is not closed by tightness
either, and is closed by its own atomicity bound `1/A_f ≥ μ(f)` on a causality
digraph that this object makes complete. **The map's closure survives as a
conclusion and must be rewritten as a mechanism.**

---

## 9. Sourcing ledger, and the channel that stayed shut

**Read at source this pass, statement included [SOURCED].** Scott–Sokal,
arXiv:cond-mat/0309352v2 (published *J. Stat. Phys.* 118 (2005) 1151–1261), read
as the arXiv PDF: Theorem 4.1 including part (b)(i) and Remarks 1 and 2,
Definition 2.14, Example 3.1, and the opening line *"The following result is a
development of Shearer [98, Theorem 1]"*. Every quotation of Scott–Sokal in this
file was taken from that PDF's own text.

**Read at source this pass, abstract only.** Shearer, *Combinatorica* 5 (1985)
241–245, abstract read at the Springer landing page for `10.1007/BF02579368`:
it defines `f(d)` and states `f(1) = 1/2`, `f(d) = (d−1)^{d−1} d^{−d}` for
`d ≥ 2`, hence `lim_{d→∞} d f(d) = 1/e`, and closes *"We also find a sharp bound
for ϱ in terms of the ϱ_i and G."* That last sentence is Shearer's own claim of
sharpness.

**Not reached, with the channel named [ABSENT].** Shearer's article text remains
unreadable: Unpaywall reports `oa_status: closed` with no repository copy,
OpenAlex reports no full text at any location, Semantic Scholar reports
`openAccessPdf.status: CLOSED`, and Springer's PDF and full-text URLs return a
bot challenge rather than content. `import-map-construction.md` §6's flag that
**Shearer's own paper was not read** therefore stands, and row 3 stays
`[SOURCED-BIB]`. What has changed is that the flag is no longer load-bearing for
the corpus's own conclusion: §6 proves the clause it needed, at the reading it
needed it, without the paper.

**Also read at source this pass, statement included [SOURCED].**
Achlioptas–Iliopoulos, arXiv:1406.0242v3, LaTeX source: the Main result
(Theorem `asymmetric`), the symmetric corollary `Σ_{g∈Γ(f)} 1/A_g < 1/e`, the
Amenability and Atomicity definitions, and the `Δ+1` colouring remark.
He–Li–Liu–Wang–Yin, arXiv:2111.06527, abstract read at the arXiv abstract page:
the chordal/non-chordal dichotomy for the Moser–Tardos region and the
mutually-exclusive clause. Harvey–Vondrák, arXiv:1504.02044, and
He–Li–Liu–Wang–Yin, arXiv:1709.05143, full LaTeX source, and
Achlioptas–Iliopoulos, arXiv:1507.07633, full LaTeX source, for the quotations
in §8.

**Not opened.** Kolipaka–Szegedy, STOC 2011, doi 10.1145/1993636.1993669: not on
arXiv, ACM's landing page and PDF and the author's page all returned 403,
Unpaywall lists ACM as the sole location. Their result is used here only as
restated verbatim by Harvey–Vondrák and by He et al., both of whom cite it by
name. Achlioptas–Iliopoulos's *JACM* 63 (2016) art. 22 text was not opened
either (ACM 403); the arXiv v3 source is used, and the theorem numbers quoted
are v3's.

**Where the tightness clause is attributed to Shearer himself.** Two independent
expositions pin it inside his Theorem 1 rather than to later work. Temmel,
arXiv:1105.1683, Lemma 11, verbatim: *"Lemma 11 ([19, proof of theorem 1]). Let
G be finite. If p⃗ ∉ P̊_sh^G, then there exists a BRF Z ∈ C_G^strong(p⃗) with
P(Z_V = 1⃗) = 0."* — reference [19] there is Shearer 1985. He–Li–Sun,
arXiv:2111.06527, Theorem 1.2, verbatim: *"For any graph 𝐺_𝐷 = ([𝑚], 𝐸_𝐷) and
any probability vector 𝒑 ∈ (0,1]^𝑚, 𝒑 ∈ I_𝑎(𝐺_𝐷) if and only if 𝒑 is in
Shearer's bound of 𝐺_𝐷"*, cited to [She85].

---

## 10. Corrections to the record

Proposed, not applied; no live document was touched.

1. **`research/IMPORT-MAP.md` §4, row 3's pre-registration.** *"predict that the
   feasible boundary coincides with the Mertens threshold `Σ_{5≤p≤x} 2/p < 1`,
   so that `x = 5` is the last feasible level and the wall arrives at `x = 7`,
   matching the asymmetric-weights computation already on record, which reaches
   the wall six levels earlier than the union bound does."* The "so that" is
   false and the parenthetical is wrong twice. The boundary **is** the Mertens
   threshold, exactly, so the last feasible level is `x = 11` and the wall is at
   `x = 13`. The `x = 5 / x = 7` pair belongs to the *sufficient* asymmetric
   local lemma, which is a factor `e` short of the exact criterion on a clique;
   and that condition reaches the wall **two** levels earlier than the union
   bound (`x = 7` against `x = 13`), not six.

2. **`research/history/staging/import-suen.md` §8(ii), last clause.** *"it
   arrives earlier here (x = 7 rather than x = 13) because the LLL's condition is
   strictly stronger than the union bound."* True of the sufficient condition,
   false of the local lemma. The defensible sentence names which condition:
   *"because the LLL's sufficient condition is strictly stronger than the union
   bound, while the exact criterion (Shearer) on a complete graph is the union
   bound."*

3. **`research/IMPORT-MAP.md` row 3's paragraph, last sentence.** *"The first
   thing to compute is whether the zero-free radius for the corpus's own
   structure reaches past the Mertens threshold."* Computed, §7: it reaches
   exactly to it and not past, because on a complete graph the independent-set
   polynomial is `1 + Σ z_v` and its zero hyperplane sits on the wall. The
   sentence should record the answer.

4. **`research/IMPORT-MAP.md` row 10 and row 3's closure sentence.** Row 3 says
   Shearer's tightness *"closes entropy compression, Moser–Tardos and the
   resampling-oracle programme as a class, which is row 10."* That mechanism is
   false in general (§8b, §8d). Row 10 may close, but the row must carry three
   mechanisms rather than one, and its own unresolved item — *"their main
   theorem's hypotheses were not opened"* — is now resolved: they were opened,
   and Achlioptas–Iliopoulos is closed by atomicity rather than by tightness.

5. **`research/SEARCH-CONVENTIONS.md` §1** has no row for this object, and the
   convention was located during map construction rather than during a search
   pass. Proposed row: *the feasible region of the local lemma given a
   dependency graph and marginals* | our name: none | owning convention:
   **Shearer's region**, **independent-set polynomial**, **hard-core lattice
   gas**, **repulsive lattice gas** | where it lives: Shearer, *Combinatorica* 5
   (1985) 241–245 (text closed, see §9); Scott–Sokal, *J. Stat. Phys.* 118
   (2005) 1151–1261 = arXiv:cond-mat/0309352, Theorem 4.1 and Example 3.1.

---

## 11. Files touched

- `research/history/staging/import-shearer-prereg.md` — pre-registration,
  committed before the computation existed.
- `research/import-shearer-01-region.js` — the computation, embedded.
- `research/history/staging/import-shearer.md` — this record.

No live document was edited. Proposed corrections are in §8 and are proposals
only.

---

*This document states current understanding. Superseded claims and the reasons
they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed by document.*
