# Foreign import 2 of 5: correlation inequalities against the anchored δ

<!-- ledger
id: Q-import-suen
status: ANSWERED
todo: none
question: Do Suen's inequality, Janson's inequality and the Lovász Local Lemma family supply the missing proof for the anchored delta?
verdict: No inequality can: the import lands and what it certifies is that the target was never a lemma, the NOT-REACHED item being the Twin Prime Conjecture wearing a percentage; what it does deliver is the constant in the sharp form and the wall's address in local-lemma coordinates.
-->

*(2026-08-19. Suen's inequality, Janson's inequality and the Lovász Local Lemma
family, imported against the anchored dependence term δ of
`research/history/staging/verify-cofactor-convolution.md` §7 and §9. Companion
computation `research/import-suen-01-transfer.js`, bound to its own output by
`research/qc/embed.js`; every figure below is in that file's OUTPUT block.
Legend as in `research/sift-limit-attack.md`: **[PROVEN]** published theorem with
source; **[VERIFIED]** checked computationally here; **[MEASURED]** empirical,
finite range; **[INFERRED]** our deduction from sourced facts; **[ABSENT]**
searched and found nothing, with the channel named.)*

---

## 1. The headline

**The import lands, and what it certifies is that the target was never a lemma.**
Four results, in decreasing order of how much they change the record.

1. **The NOT-REACHED item is the Twin Prime Conjecture wearing a percentage
   sign.** `verify-cofactor-convolution.md` §9 asks for a proof that
   `δ = O(Σ_{q>x} q^{−2})`. But `1 + δ = S(0)·N̄/(L0·R0)` is an identity, so
   `δ > −1` **is** `S(0) > 0`, and by `paper/anchored-note.md` Proposition 2
   that at infinitely many levels is TPC. Any bound `|δ| ≤ c < 1` at infinitely
   many x therefore proves the conjecture. There is no weaker version of the
   ask: the O(Σq^{−2}) form is not a strengthening of a reachable statement,
   it is the whole problem with a rate attached. [INFERRED, §6]
2. **The forced scale is not a bound on δ, it is the Hardy–Littlewood
   prediction for δ, with the opposite sign and no free constant.** Exactly,
   with `F = ∏(1−1/q)²/∏(1−2/q) − 1` the forced scale and
   `ρ = β/(π_L·π_R) − 1`:
   > **(1 + δ)(1 + F) = 1 + ρ.**
   Under Hardy–Littlewood `ρ → 0`, so `δ → −F/(1+F)`: minus the forced scale.
   The measured δ is not "bounded by" F, it is `ρ − F` to second order, a
   difference of two same-order positive numbers. That is why it is small,
   why it is non-monotone, and why it changes sign. [VERIFIED §4, INFERRED §6]
3. **The value `e^{2γ}/4` in the conjectured sharp form of β is a theorem, not
   a conjecture.** `π_L → e^γ/2` and `π_R → e^γ/2` follow unconditionally from
   Bombieri–Vinogradov plus the fundamental lemma of the sieve, so
   `π_L·π_R → e^{2γ}/4 = 0.793055` with no hypothesis. `anchored-note.md` §7's
   "Conjectured sharp form β(x) → e^{2γ}/4" therefore has exactly one
   conjectural half, `ρ → 0`, and the constant is not it. [INFERRED §7]

4. **The wall has an address in this field's coordinates, and it is `H = x²`.**
   Draw the local lemma's dependency graph the way one draws it — join two primes
   when the window fails to equidistribute modulo their product — and at
   `H ≥ x²` the graph is **empty**, so the lemma certifies exactly the p² rule.
   The step that fails is the quantifier: lopsidependency is asked of **all**
   subsets of the non-neighbours, and verifying it at `|S| = π(x)` needs the
   window to equidistribute modulo `x#`, not `x²`. **The distance between the
   local lemma's pairwise-drawn graph and its set-wise hypothesis is exactly the
   distance from the p² rule to what is provable**, which in this corpus's
   coordinates is the exponent gap 2 → 4.2665. [INFERRED, §8]

And the import's own verdict on the tools: **on the only measure where Janson,
Suen and the local lemma apply, they are exactly vacuous**, because the
dependency graph is a perfect matching whose every edge is a mutual exclusion,
so the Δ of Janson's inequality is 0 identically and every bound in the family
collapses to the exact product `∏(1−2/q)`. Worse for Janson: its events must be
increasing, and two disjoint nonempty increasing events cannot exist, so the two
strike orientations **cannot be put in Janson form at all** (§3). On the measure
that matters — r uniform on the natal comb inside `[0, W)` — the ground set is
not independent, and Suen, the one member that tolerates that, is vacuous from
@13 on by a factor reaching 10^18.7 (§5).

**Seven levels, @11 through @31, all recomputed from the definitions.** The
instrument reproduces `verify-cofactor-convolution.md` §7's β, π_L and π_R to
five digits at all five of its levels, reproduces `anchored-note.md` §3's
S(19) = 38,380, S(29) = 12,307,838 and S(31) = 283,449,187 to the unit,
reproduces the verify report's own `1,784,710 at @23` as L0, and extends the δ
series two levels past the verify report.

---

## 2. Instrument

`research/import-suen-01-transfer.js`. It builds W = x#, the Natal@5 comb, the
scour primes and the anchored survivor counts straight from
`paper/anchored-note.md` §1, by an odd-only segmented sieve that shares no code
with `research/natal-cap-35-x-multiplicity.js` or with any `natal-cap-*` file.
Seven levels @11..@31 in one run, 576.1 s.

One trap is recorded in the file's header because the wrong version looks right.
`ω_s(r) = 0` is **not** "r is prime": a natal prime `r ≤ y` is itself a scour
prime and the strike `q = r` kills it (`anchored-note.md` Lemma 2's self-strike).
The first draft omitted the `r > y` clause and returned S(11) = 47 against the
published 45 — a 4% error that no ratio in the report would have flagged, since
every derived quantity moved together.

---

## 3. Stage 1: the mapping, and the exact dependency structure

**The ground set, precisely.** For each scour prime q let `X_q = r mod q`. The
bad events are

> `A_q^L = {X_q = 0}` (q strikes r), `A_q^R = {X_q = −2}` (q strikes r+2).

For r uniform modulo `∏_q q` the vector `(X_q)_q` is **exactly** independent by
CRT, and — this is the part worth saying out loud — the natal condition lives
modulo `x#`, which is coprime to every scour prime, so **comb membership is
exactly independent of the entire scour vector**. The model measure ν = (uniform
on the comb) × (independent uniform residues) is a genuine product measure and
the whole correlation-inequality family applies to it without qualification.
[PROVEN, one line of CRT]

**The dependency graph, exactly.** Two bad events are dependent iff they share a
**prime**, never a slot. So the graph on the 2K bad events is a **perfect
matching**: K components, each a single edge `{A_q^L, A_q^R}`, maximum degree 1.
Every edge is a *mutual exclusion*, since `q | r` and `q | r+2` would force
`q | 2` and every scour prime exceeds 2. Hence

> **The quantity Janson's inequality calls Δ = Σ_{i∼j} P(B_i ∧ B_j) is 0,
> exactly, at every level.**
> [VERIFIED at seven levels; the OUTPUT block's Δ_match column]

**Which inequality is sharpest, and the answer nobody wants.** With Δ = 0 and a
degree-1 graph:

- **Janson does not apply at all**, and the reason is sharper than vacuity.
  Alon–Spencer Theorem 8.1.1 asserts `∏Pr[B̄_i] ≤ Pr[∧B̄_i] ≤ ∏Pr[B̄_i]·e^{Δ/2(1−ε)}`
  for `B_i = {A_i ⊆ R}`, i.e. for **increasing** events, and its lower half is
  Harris/FKG. Here the lower half is **false**: `Pr[∧B̄] = ∏(1−2/q)` is *smaller*
  than `∏Pr[B̄_i] = ∏(1−1/q)²`, by exactly the factor `1/(1+F)`. The obstruction
  is one line. **Two nonempty up-sets in a finite product lattice always share
  the top element, so two disjoint nonempty increasing events cannot exist.**
  `A_q^L` and `A_q^R` are disjoint and nonempty. **No choice of ground set puts
  the two strike orientations into Janson form.** The mutual exclusion that makes
  this problem's arithmetic pleasant is precisely what puts it outside the
  theorem. Per coordinate the survival indicators are *negatively* correlated,
  `Cov(1_{Ā_q}, 1_{B̄_q}) = (1−2/q) − (1−1/q)² = −1/q²`: the lopsided
  configuration, not the FKG one. [PROVEN]
- **The lopsided LLL** applies, with the matching graph, and returns the exact
  product because a degree-1 graph with independent components factorises.
- **Suen** is the one member that needs no product space, so it is the one that
  can be pointed at the anchored measure. §5 does that, with numbers.

> **The forced scale is that covariance summed.**
> `F = ∏(1+1/(q(q−2))) − 1 = Σ_q 1/q² + O(Σ 1/q³)`, and
> `1/(1+F) = ∏_q (1 − 1/(q−1)²)` is the exact ν-value of `1 + δ`.
> [VERIFIED: F = 2.1086%, 1.7084%, 1.3856%, 1.0878%, 0.8819%, 0.7537%, 0.6419%
> at @11..@31, reproducing the verify report's 2.109, 1.708, 1.386, 1.088, 0.882
> and extending it two levels]

So on ν the family is exactly tight and adds nothing, because everything is a
product and there is nothing left to bound. **The import's best friend — CRT
independence of the residues — is also the reason the import is empty**: where
the ground set is independent the answer is already closed-form, and where the
answer is open the ground set is not independent. That is not a failure of
technique. It is the shape of the problem, and it is worth having in the record
in this vocabulary, since `research/PRIOR-ART.md` and the corpus carried no
mention of Janson, Suen, Harris or the local lemma before this pass. [ABSENT:
`grep -ril "local lemma|lovász|Janson|Suen"` over every `.md` and `.js` in the
repository returns nothing]

---

## 4. Stage 2: the transfer, pre-registration, and what Δ actually is

**Pre-registration.** Written into the script's header before PART B or PART C
was executed, and reproduced here verbatim from the file:

- (PR1) Δ on the true (matching) graph is 0, not F, because F is a sum of
  per-coordinate *covariances* and Δ is a sum of pair *probabilities*.
- (PR2) Forcing one event per prime, `A_q = {q | r(r+2)}`, makes the graph
  complete and `Δ = (Σ2/q)² − Σ4/q²`, two to three orders of magnitude **above**
  F. Neither reading of Δ matches the forced scale.
- (PR3) ρ will be of the same order as F but not bounded by it at every level
  and not monotone.
- (PR4) Under Hardy–Littlewood, `1 + δ → ∏_{p>x}(1 − 1/(p−1)²)`, i.e.
  `δ → −F/(1+F)`: the forced scale with a minus sign and no free constant.

**Result: all four hold**, with one calibration note against PR2: the mismatch is
1.4 orders of magnitude at @11, not two, and reaches three only at @31.
[VERIFIED]

Δ against the forced scale, the direct answer to the pre-registered question:

| x | 11 | 13 | 17 | 19 | 23 | 29 | 31 |
|---|---|---|---|---|---|---|---|
| Δ_match (true graph) | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Δ_complete | 0.5483 | 1.2525 | 2.1798 | 3.1475 | 4.1795 | 5.2859 | 6.3438 |
| Δ_complete / F | 26.0× | 73.3× | 157.3× | 289.3× | 473.9× | 701.3× | 988.3× |

**Δ does not match the forced scale under either reading, and the mismatch
grows.** Janson's `e^{−Δ/2}` is a constant-factor instrument here — at @31,
where `Δ_complete = 6.3438`, it would discard 96% of the count — and the target
is a correction of `F = 0.6419%`. The tool is off by a factor 988 at @31 in the only sense that
matters. [VERIFIED]

**The exact split.** Nothing in the family gives a one-sided
`S(0) ≥ ∏(1−2/q)·e^{−Δ}` that is worth writing, but the *decomposition* the
question was reaching for exists and is an identity:

> **(1 + δ)(1 + F) = 1 + ρ**, with `ρ = β/(π_L·π_R) − 1`,
> `β = S(0)/(N̄∏(1−2/q))`, `π_L = p₀/∏(1−1/q)`, `π_R = q₀/∏(1−1/q)`.

F is exactly the ν-part of δ, and ρ is exactly everything else: the failure of
the anchored measure to be ν, which is the failure of `[0, W)` to equidistribute
modulo `∏_{x<q≤y} q ≈ e^{y}`. Measured, at seven levels:

| x | δ | F | ρ | ρ/F | δ under HL, `−F/(1+F)` |
|---|---|---|---|---|---|
| 11 | **+2.0665%** | 2.1086% | 4.2187% | 2.001 | −2.0651% |
| 13 | −0.4246% | 1.7084% | 1.2765% | 0.747 | −1.6797% |
| 17 | −0.2988% | 1.3856% | 1.0827% | 0.781 | −1.3667% |
| 19 | **+0.2859%** | 1.0878% | 1.3767% | 1.266 | −1.0761% |
| 23 | −0.5149% | 0.8819% | 0.3625% | 0.411 | −0.8742% |
| 29 | −0.4770% | 0.7537% | 0.2732% | 0.362 | −0.7481% |
| 31 | −0.4428% | 0.6419% | 0.1963% | 0.306 | −0.6378% |

The δ column reproduces `verify-cofactor-convolution.md` §6's five-level series
exactly (its table prints the n₀-model error `1/(1+δ) − 1`; +2.0665% here is its
−2.0247% there, and so on down), and β, π_L, π_R reproduce that report's §7
table to five digits at all five of its levels. [VERIFIED]

**The reading. ρ/F is not bounded by 1** — it is 2.001 at @11 and 1.266 at @19 —
**so "δ is bounded by the forced scale" is false as stated**, twice in seven levels. What is true, and is the honest replacement, is that δ and F are the same
order because δ = ρ − F + O(ρF) with ρ of the same order as F, and ρ is falling
faster than F from @19 on (ρ/F = 1.266, 0.411, 0.362, 0.306, four consecutive levels). [MEASURED]

---

## 5. Suen's inequality, actually applied

Suen's is the only member of the family stated for a **superdependency digraph**
with no product-space structure (Alon–Spencer Theorem 8.7.1; sharpened in
S. Janson, *New versions of Suen's correlation inequality*, Random Structures &
Algorithms 13 (1998) 467–483). So it is the one tool that can be pointed at the
anchored measure directly. It was, with one event per scour prime,
`I_q = 1{q | r(r+2)}`, `p_q = 2/q`.

**The graph must be complete, and that is not a modelling choice.** Janson's
Remark 3 requires a dependency graph in the *strong* sense and gives an explicit
pairwise-independent counterexample showing the weak notion makes the bounds
catastrophically false. On the anchored measure the residues `(r mod q)` of
`r ∈ [0, W)` are jointly dependent for every subset of scour primes whose product
exceeds W, so no proper subgraph is admissible. With the complete graph
`∏_{k∼{i,j}}(1−p_k)^{−1} = (1−p_i)(1−p_j)/∏_k(1−p_k)`, and that is what detonates.

| x | μ = Σ2/q | Δ (unordered) | Δ* | Thm 2 exponent | Thm 3 bound | Thm 8 bracket | truth S(0)/N̄ |
|---|---|---|---|---|---|---|---|
| 11 | 0.78909 | 0.2742 | 0.518 | +0.4 | 0.83848 | +1.31e-1 | 0.500000 |
| 13 | 1.14676 | 0.6263 | 1.826 | +4.9 | 0.84505 | −1.03e+1 | 0.310101 |
| 17 | 1.49379 | 1.0899 | 4.654 | +20.0 | 0.84621 | −4.88e+2 | 0.208687 |
| 19 | 1.78566 | 1.5737 | 9.157 | +54.1 | 0.84643 | −8.68e+4 | 0.152030 |
| 23 | 2.05259 | 2.0897 | 16.027 | +124.7 | 0.84647 | −1.46e+8 | 0.112700 |
| 29 | 2.30539 | 2.6429 | 26.235 | +263.5 | 0.84648 | −6.50e+12 | 0.085985 |
| 31 | 2.52361 | 3.1719 | 39.292 | +491.0 | 0.84648 | −4.56e+18 | 0.068284 |

- **Theorem 2** (`P(S=0) ≤ e^{−μ + Δe^{2δ}}`): the exponent is **positive at
  every level**, so the bound exceeds 1 and asserts nothing.
- **Theorem 3** (`P(S=0) ≤ e^{−min(μ²/8Δ, μ/6δ, μ/2)}`): 0.83848 to 0.84648. It
  is an *upper* bound on survival, the wrong direction for Assumption A, and it
  is loose by 1.68×, 2.73×, 4.05×, 5.57×, 7.51×, 9.84×, 12.40×.
- **Theorem 8** (`P(S=0) ≥ (1 − Δ₀*e^{Δ*})∏(1−p_k)`), the lower bound the
  programme actually needs: the bracket is positive only at @11, where it reads
  `+1.31e-1`, and is negative from @13 on, reaching −4.56·10¹⁸ at
  @31. [VERIFIED]

**Verdict on the tool the brief named first: exactly one level of content, and
it is the smallest one.** The mechanism is `Δ* ≈ Δ/∏(1−2/q)`, and `∏(1−2/q)`
decays like `1/ln²W` while Δ grows like `(2 lnln y)²`, so `Δ*` diverges like
`ln²W·lnln²W` and `e^{Δ*}` is hopeless by @13. Suen's inequality is an
independence-with-pair-correction tool, and this problem's correction is not
pairwise-small once the ground set stops being independent.

---

## 6. Stage 2 continued: why no inequality can supply the missing proof

Two facts, and they close the route.

**(a) δ > −1 is S(0) > 0.** `1 + δ = S(0)·N̄/(L0·R0)` is an identity, and
`L0, R0 > 0` is not an assumption: §7's Bombieri–Vinogradov plus fundamental-lemma
argument gives `L0, R0 → ∞` unconditionally (measured 1,087,136,413 and
1,087,113,427 at @31). So a bound `|δ| ≤ c` with **any** `c < 1` gives
`S(0) ≥ 1`, and at infinitely many x `anchored-note.md` Proposition 2 turns that
into infinitely many twin primes. The requested `δ = O(Σ_{q>x} q^{−2})` is
therefore strictly stronger than TPC, and so is every weakening of it down to
"δ is bounded away from −1". [INFERRED from PROVEN inputs]

**(b) The other side of the target is already free.** Because `δ ≤ c` for an
explicit constant follows from the dimension-2 upper-bound sieve applied to
S(0), the target's *upper* half is a theorem and its *lower* half is the
conjecture. So `|δ| = O(F)` is one-sided-trivial and one-sided-TPC, with nothing
in between for a correlation inequality to occupy. [INFERRED; the upper-bound
constant is not computed here, see §10]

**Consequence for `verify-cofactor-convolution.md` §9 and §3.** Its third bullet
reads the smallness of |δ| as evidence that "the room for dependence in the cell
X can see is a priori O(Σ_{q>x} q^{−2}) and vanishing". The word *a priori* does
not survive. F is a priori; δ is not bounded by F, and the agreement between
|δ| and F is the numerical shadow of Hardy–Littlewood holding at these levels,
not of any independence structure. §9 lists the correction.

---

## 7. What the import does deliver: the constant in the sharp form

The one place standard machinery reaches, and it reaches cleanly.

> **[INFERRED from PROVEN inputs] `π_L(x) → e^γ/2` and `π_R(x) → e^γ/2`
> unconditionally, hence `π_L·π_R → e^{2γ}/4 = 0.793055`.**

*Sketch.* `L0/N̄ = π(W)/φ(W)·(1 + o(1))`: the count of primes `r < W` with
`r ≡ 11, 17 (mod 30)` and `r + 2` free of prime factors `≤ x` is a
dimension-1 sieve of the primes by the primes up to `z = x`, with level of
distribution `D = W^{1/2−ε}` from Bombieri–Vinogradov. Its sieve parameter is
`s = ln D/ln z ≈ x/(2 ln x) → ∞`, so the fundamental lemma applies with error
`O(e^{−s})` and the BV error `W(ln W)^{−A}` is below the main term
`≍ W/(x ln x)` for `A ≥ 2`. Mertens then gives
`π(W)/φ(W) ~ e^γ ln x/ln W` and `∏_{x<q≤y}(1−1/q) ~ ln x/ln y` with
`ln y ~ (1/2) ln W`, so `π_L ~ e^γ/2`. ∎

Measured convergence, seven levels: π_L = 1.03202, 1.00809, 0.97464, 0.95626,
0.94350, 0.93424, 0.92786 against the limit 0.890536, and π_L·π_R = 1.09943,
0.99622, 0.94463, 0.91355, 0.88982, 0.87277, 0.86090 against 0.793055.
[VERIFIED]

**Why this matters.** `anchored-note.md` §7 records "Conjectured sharp form
β(x) → e^{2γ}/4 = 0.793055" and §5 marks the Unification-Law constants
HL-conditional. Since `β = π_L·π_R·(1+ρ)` identically and the first two factors
converge to `e^{2γ}/4` with no hypothesis, **the conjecture's entire content is
`ρ → 0`, and the value `e^{2γ}/4` is not part of it.** That is a real narrowing
of the target: the sharp form is not a claim about a constant, it is the claim
that the two strike orientations decorrelate. And by §6(a) even the crude version
of that claim is TPC.

---

## 8. Stage 4: the wall's address in local-lemma coordinates

The covering question in this field's vocabulary: *does some slot in a window of
length H survive both strike classes of every prime `q ≤ x`, for every choice of
those classes?* That is `G₂(x#) ≤ H`. Three thresholds, and the middle one is
new cartography.

**(i) The pairwise horizon is exactly `H = x²`.** Draw the dependency graph the
way one draws it: join `q ∼ q'` iff a window of length H fails to equidistribute
modulo `q·q'`, i.e. iff `q·q' > H`. With `H ≥ x²` **no pair of primes `≤ x` is
joined and the graph is empty**, and with an empty graph the local lemma's
condition degenerates to `P(A_q) < 1`, i.e. `2/q < 1`, which every prime `q ≥ 3`
satisfies. It would certify a survivor at `H = x²` with the whole condition
costing nothing. `H = x²` is exactly the p² rule, i.e. the target of the whole
programme. [VERIFIED, arithmetic]

**This is the finding, and it is a diagnosis rather than a proof.** An argument
that proves the twin prime conjecture is wrong, and the exact step that is wrong
is worth naming: the lopsidependency hypothesis is
`P(A_q | ∩_{q'∈S} Ā_{q'}) ≤ x_q ∏_{q'∼q}(1−x_{q'})` quantified over **all
subsets S of the non-neighbours of q**, not over single non-neighbours.
Verifying it needs the window to equidistribute modulo `∏_{q'∈S} q'`, which for
`|S| = π(x)` is `e^{θ(x)} = x#`, not `x²`. **The gap between the LLL's
pairwise-drawn graph (`θ = 2`) and its set-wise hypothesis is the entire
distance from the p² rule to what is provable.** In this corpus's coordinates
that is the exponent gap 2 → 4.2665. [INFERRED]

**(ii) Taking the graph complete kills it at once, at the Mertens wall.** If no
conditioning set beyond a pair can be verified, the graph must be complete, and
the asymmetric LLL with weights `x_q = c/q` needs
`2 ≤ c·∏_{5≤p≤x, p≠q}(1−c/p)` for every q. Feasible at x = 5 and **at no larger
level**: `max_c` runs 5.00000, 1.25000, 0.85832, 0.71831, 0.63031, 0.57626,
0.53495, 0.50497, 0.36180 at x = 5, 7, 11, 13, 17, 19, 23, 29, 101 against the
required 2. [VERIFIED] This is the
same Mertens wall `Σ_{5≤p≤x} 2/p < 1` that `research/sift-limit-attack.md` §7
reaches, which that file records as the sixth independent arrival; this is the
seventh — it arrives *earlier* here (x = 7 rather than x = 13) because the
LLL's SUFFICIENT condition is strictly stronger than the union bound, while
the EXACT criterion is the union bound itself: Shearer's region on a complete
graph is `Σ marginals < 1` (Scott–Sokal Ex. 3.1; the eighth arrival, as an
identity — `history/staging/import-shearer.md`, 2026-08-19). Nothing in
`research/REFUTED.md`'s covering-economy row is re-opened; this is that row's
address in a new vocabulary.

**(iii) The admissible repair is Bonferroni, and it is Brun's pure sieve.**
Verify the hypothesis only for sets S with `∏_{q∈S} q ≤ H`, i.e. `|S| ≤ m` with
`x^m ≤ H`. That truncation *is* Bonferroni at depth m. The depth the main term
needs, computed exactly from the elementary symmetric functions of `{2/p}`
rather than by Stirling, and the exponent it buys:

| x | 11 | 13 | 17 | 19 | 23 | 29 | 101 | 199 | 439 | 1009 | 10⁶ |
|---|---|---|---|---|---|---|---|---|---|---|---|
| depth m₀ | 2 | 2 | 2 | 2 | 2 | 4 | 4 | 6 | 6 | 8 | 12 |
| `θ_pure = ln H/ln x` | 2.213 | 2.418 | 2.488 | 2.750 | 3.444 | 3.322 | 3.864 | 4.672 | 4.836 | 5.915 | 9.442 |

**So the local-lemma family lands at `H = x^{Θ(lnln x)}`**, and it crosses
`β₂ = 4.2665` between x = 101 and x = 199 and never returns. This is the same
object `sift-limit-attack.md` §7 tables as `β_pure` (2.80, 3.98, 4.25, 5.38,
8.88 at x = 13, 101, 199, 1009, 10⁶) — a cruder accounting of the error term
here, agreeing to within about 10% and diverging identically. [VERIFIED,
INFERRED for the identification]

**The wall's address, stated once.** The blocking quantity is **neither the
dependency degree nor the expected number of kills**. Degree is 0 at the
pairwise horizon and the expected kill count `Σ 2/q = 2.05259` at @23 is
comfortable. What blocks it is the **admissible conditioning-set modulus**:
`∏_{q∈S} q ≤ H` caps `|S|` at `ln H/ln x`, and every exponent in the table is
that cap priced. `H ~ x²` needs `|S| ≤ 2` and the hypothesis needs
`|S| = π(x)`.

---

## 9. Corrections to the record

Proposed, not applied; no live document was touched.

1. `research/history/staging/verify-cofactor-convolution.md` §3, third bullet
   and §7, second MEASURED claim: "the room for dependence in the cell X can see
   is a priori O(Σ_{q>x} q^{−2})" and "|δ| = 0.29% to 2.02% against a
   mutual-exclusion scale of 0.88% to 2.11%" read as a bound. ρ/F = 2.001 at @11
   and 1.266 at @19, so δ exceeds the forced scale at two of seven levels. The
   defensible statement is the identity `(1+δ)(1+F) = 1+ρ` with F exact and ρ
   measured.
2. Same file, §9 bullet 4 ("No proof that δ = O(Σ_{q>x} q^{−2})"): this is not
   an open lemma but a statement strictly stronger than TPC, and should be
   labelled so rather than queued.
3. `paper/anchored-note.md` §7, "Conjectured sharp form β(x) → e^{2γ}/4": the
   constant is unconditional (§7 above); only `ρ → 0` is conjectural. §5's
   blanket "the law's constants are HL-conditional" is too strong for the
   zone-edge value `e^{2γ}/4` specifically.
4. `research/REFUTED.md`: candidate row — *the correlation-inequality family
   (Suen, Janson, lopsided LLL) as a route to δ* | CLOSED | the family is exactly
   tight on the only measure where its ground set is independent, and the
   anchored measure's ground set is not | 2026-08-19 |
   `history/staging/import-suen.md`.
5. `research/PRIOR-ART.md` / `SEARCH-CONVENTIONS.md`: the corpus carried no entry
   for the probabilistic-combinatorics owning convention (Alon–Spencer,
   Janson–Łuczak–Ruciński). §3's negative and the search that produced it belong
   in the search-convention table.

---

## 10. What this pass did not reach

- **No @37.** The instrument is `O(W loglog W)`; the seven-level run takes
  576.1 s, nearly all of it @31 (`W = 2.0·10¹¹`), and @37 is 37× that. The δ
  series stops at seven levels, two past the verify report and two short of
  `anchored-note.md` §3's ten.
- **The upper-bound constant in §6(b) is not computed.** That `δ` is bounded
  above by an explicit constant follows from the dimension-2 upper-bound sieve,
  but the constant is asserted from the shape of the argument and not run
  through this corpus's comb normalisation.
- **§7 is a sketch, not a written proof.** The Bombieri–Vinogradov plus
  fundamental-lemma assembly is standard and each input is a published theorem,
  but it is assembled here and has not been checked against a referee or against
  the corpus's own sieve conventions. It is calibrated INFERRED for that reason.
- **No mechanism for ρ.** Its sign is positive at all seven levels and it is not
  monotone (1.0827% at @17, 1.3767% at @19). Whether that is structure or the
  ordinary fluctuation of a prime-counting error term is not decided here, and
  seven levels is not a series. **Pre-registered for the next pass:** ρ/F has
  fallen at four consecutive levels (1.266, 0.411, 0.362, 0.306), so δ should
  stay negative at @37 and @41 and approach −F. A positive δ at either level
  falsifies that.
- **Erdős–Spencer 1991 was not fetched at source.** The Discrete Applied Math
  original is paywalled with no open repository copy; §11's lopsidependency
  statement comes from three secondary sources that reproduce it.
- **No live document was edited.** `research/OBSERVATIONS.md`,
  `paper/anchored-note.md`, `research/moire-theorems.md` and
  `research/REFUTED.md` are untouched; §9 is a proposal queue.

---

## 11. The inequalities, with provenance, and the prior-art sweep

**Provenance discipline.** Each statement below was read from a source fetched in
this pass, except where marked. Alon–Spencer was read as page images from a full
text of the 2nd edition; Janson 1998 was read in full from the author's own
Uppsala page (`https://www2.math.uu.se/~svantejs/papers/sj121.pdf`).

**Janson's inequality** — N. Alon and J. Spencer, *The Probabilistic Method*,
Theorem 8.1.1. Ω a ground set, R ⊆ Ω random with independent inclusions
`Pr[r ∈ R] = p_r`; `A_i ⊆ Ω`; `B_i` the event `A_i ⊆ R`; `i ∼ j` iff `i ≠ j` and
`A_i ∩ A_j ≠ ∅`; `Δ = Σ_{i∼j} Pr[B_i ∧ B_j]` over ordered pairs;
`M = ∏ Pr[B̄_i]`; `μ = E[X]`; all `Pr[B_i] ≤ ε`. Then

> `M ≤ Pr[∧ B̄_i] ≤ M·e^{Δ/(2(1−ε))}`, and `Pr[∧ B̄_i] ≤ e^{−μ + Δ/2}`.

Theorem 8.1.2 adds the hypothesis `Δ ≥ μ` and gives `Pr[∧B̄_i] ≤ e^{−μ²/(2Δ)}`.
§8.2's proof (Boppana–Spencer) uses only two conditional correlation facts, both
from the **FKG/Harris** Theorem 6.3.2, which is why §8.7 can abstract the
theorems to arbitrary spaces carrying those two inequalities. Riordan and Warnke
(arXiv:1203.1024) extended Janson to arbitrary up-sets in a product space.
[fetched and read]

**Suen's inequality** — Alon–Spencer Theorem 8.7.1 gives Suen's original 1990
form on a **superdependency digraph**, with no product-space structure:
`|Pr[∧B̄_i] − M| ≤ M(e^{Σ_{i∼j} y(i,j)} − 1)`, `y(i,j) = (Pr[B_i∧B_j] +
Pr[B_i]Pr[B_j])·∏_{l∼i or l∼j}(1−Pr[B_l])^{−1}`. S. Janson, *New versions of
Suen's correlation inequality*, RSA 13 (1998) 467–483, sharpens it. With Γ a
dependency graph, `μ = Σp_i`, `Δ = Σ_{{i,j}: i∼j} E(I_iI_j)` over **unordered**
pairs (Remark 4 warns about the factor-2 convention), `δ = max_i Σ_{j∼i} p_j`:

> Thm 1: `P(S=0) ≤ exp(Σ_{i∼j} E(I_iI_j)·∏_{k∼{i,j}}(1−p_k)^{−1})·∏_l(1−p_l)`
> Thm 2: `P(S=0) ≤ e^{−μ + Δe^{2δ}}`
> Thm 3: `P(S=0) ≤ e^{−min(μ²/8Δ, μ/6δ, μ/2)}` — this is the form quoted as
> Janson–Łuczak–Ruciński, *Random Graphs* (2000), Theorem 2.23
> Thm 8: `P(S=0) ≥ (1 − Δ₀*·e^{Δ*})·∏(1−p_k)`, with `Δ*`, `Δ₀*` the `Δ`, `Δ₀`
> sums weighted by `∏_{k∼{i,j}}(1−p_k)^{−1}`

Two caveats matter here and both are in the text. **Remark 3: a dependency graph
in the strong sense is required**, with an explicit pairwise-independent
`K_n`-colouring counterexample where the weak notion makes every upper bound
catastrophically false. **Remark 2: the results are not known to hold under the
weaker LLL-style dependency notion.** §5 is governed by Remark 3. [fetched and
read in full]

**The lopsided local lemma** — Erdős and Spencer, *Lopsided Lovász Local Lemma
and Latin transversals*, Discrete Appl. Math. 30 (1991) 151–154. **The original
was not fetched: Elsevier paywalled, `is_oa: false` in OpenAlex, no repository
copy.** The statement below is reproduced from three secondary sources that were
fetched — Alon–Spencer §5.6 and the strengthening after Corollary 5.1.2, Zhao's
MIT notes Theorem 6.5.1, and Harvey–Vondrák arXiv:1504.02044 §1.3 — which agree:

> for each i there is `N(i)` with
> `Pr(A_i | ∧_{j∈S} Ā_j) ≤ x_i·∏_{j∈N(i)}(1−x_j)` for **all**
> `S ⊆ [n]∖(N(i) ∪ {i})`; then `Pr(∧Ā_i) ≥ ∏(1−x_i) > 0`.

**That "for all S" is the quantifier §8 turns on.** Harvey–Vondrák show the
hierarchy (Dep) ⇒ (LopA) ⇒ (Lop) and that every known lopsided application in
fact satisfies the stronger lopsided-association condition
`Pr(A_i ∩ F) ≥ Pr(A_i)Pr(F)` for monotone F over non-neighbours; Lu–Székely
(EJC 2007, #R63) give the canonical negative-dependency-graph construction for
random injections and matchings. [statement not fetched at source; three
concordant secondary sources fetched]

**Harris/FKG** — Alon–Spencer Theorem 6.3.2, used as the engine of §8.2's proof
of Janson. [fetched]

### The prior-art sweep

**[ABSENT, with the channel named] The correlation-inequality family has never
been imported into the sieve / prime-gaps literature.** Full texts of
Ford–Green–Konyagin–Maynard–Tao *Long gaps between primes* (arXiv:1412.5029),
Ford–Green–Konyagin–Tao (1408.4505), Maynard (1408.5110), *Long gaps in sieved
sets* (1802.07604) and Banks–Ford–Tao (1908.08613) were downloaded and searched:
**zero occurrences of Janson, Suen, local lemma or FKG** in any of them. Their
probabilistic toolkit is Chebyshev / Hoeffding / Bennett plus the Rödl nibble.
No paper applies the local lemma to admissible tuples or to the Jacobsthal
function. An arXiv math.NT abstract search for Suen's inequality returns **0
hits**.

Three near-misses are worth the record:

1. **Covering systems is where the local lemma did land.** Hough's Annals 2015
   minimum-modulus solution uses a relative LLL, and Hough–Nielsen (Duke 2019)
   use the Bissacot–Fernández–Procacci–Scoppola cluster-expansion form — but
   Balister–Bollobás–Morris–Sahasrabudhe–Tiba (Invent. Math. 2022) then removed
   the LLL from the argument. The corpus already carries BBMST via
   `history/staging/verify-fkmpt-corrigendum.md` §4.
2. **FKMPT already wrote a Suen-shaped lemma without the name.**
   Filaseta–Ford–Konyagin–Pomerance–Yu (JAMS 2007) Lemma 2.1 lower-bounds a
   sieving density by `∏(1−1/n_i)` minus a sum over non-coprime *pairs* — a
   pair-correlation-corrected independence heuristic derived independently, and
   their referee noted the resemblance in print. This is the same FKMPT the
   corpus tracks in `research/covering-dive.md` §2.3. **So the shape of this
   import is already in the corpus's own prior-art file, under another name.**
3. **Peres–Schlag (BLMS 2010)** had to write a bespoke one-sided local lemma to
   reach lacunary Diophantine approximation results: the closest methodological
   precedent for importing this family into a new arithmetic setting, and it
   required a new variant rather than a citation.
4. **Peres–Yang (arXiv:2606.28860, June 2026)** cites Janson 1998 for a
   maximal-gap problem — a nearer methodological neighbour than Peres–Schlag.
   *(Added 2026-08-19 from the officer pass's citation-graph walk: 97 OpenAlex
   and 99 Semantic Scholar citing works, zero applications to coprimality or
   the Jacobsthal function; `proposals-prior-art.md`.)*

---

## 12. Files touched

- `research/import-suen-01-transfer.js` — new, embedded by `research/qc/embed.js`.
- `research/history/staging/import-suen.md` — this file.

Nothing else in the repository was edited.
