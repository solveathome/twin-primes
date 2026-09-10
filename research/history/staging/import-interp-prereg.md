# Pre-registration — foreign import row 9, the interpolation method (Bayati–Gamarnik–Tetali)

<!-- ledger
id: Q-import-interp-prereg
status: SUPERSEDED
todo: none
question: Does the interpolation method (Bayati-Gamarnik-Tetali, Proposition 5) transfer to the G2 ladder, and in which coordinate?
verdict: Pre-registration only, committed alone before any producer existed, with the source verified at page images first (Proposition 5 is a special case of de Bruijn-Erdos, by the authors' own attribution); the predictions and the meaning of each outcome for the map are fixed here, and the outturn is import-interp.md.
-->

*Written to disk and committed alone before any `research/import-interp-*.js`
existed. What had run when this file closed: the source verification of §1, and
nothing else. Every number in §4 and §5 below is either quoted from an already
embedded corpus artifact (cited on the line) or derived by hand from the
published ladder, and each hand derivation is shown so the producer can be
scored against it rather than tuned to it. No producer had been written.*

## 1. The theorem, verified at source before anything was computed

Opened this pass: Bayati, Gamarnik and Tetali, *Combinatorial approach to the
interpolation method and scaling limits in sparse random graphs*, **Ann. Probab.
41 (2013) 4080–4115**, full text as arXiv:0912.2444v3 (37 pages). Appendix B was
read **as page images** (pages 34 and 35), not by text extraction, because
Proposition 5 is the load-bearing statement of the whole row.

**Appendix B, page 34, verbatim, including the attribution sentence:**

> "To keep the proof of our main results self-contained, we state and prove the
> following proposition, used in proving several of the theorems presented in
> the earlier sections. However, Béla Bollobás and Zoltan Füredi kindly pointed
> out to us that the following proposition is a special case of a more general
> and classical theorem of de Bruijn and Erdös (see Theorem 22 on page 161 in
> [12]), which uses a weaker assumption on the additive term in the near
> super-additivity hypothesis; also see [11] and the Bollobás–Riordan
> percolation book [7] for more recent applications of this useful tool."
>
> "PROPOSITION 5. *Given* `α ∈ (0,1)`, *suppose a nonnegative sequence* `a_N`,
> `N ≥ 1` *satisfies*
>
> (24) `a_N ≥ a_{N_1} + a_{N_2} − O(N^α)`
>
> *for every* `N_1, N_2` *s.t.* `N = N_1 + N_2`. *Then the limit*
> `lim_{N→∞} a_N/N` *exists.*"

References [11] and [12] resolve, in the paper's own bibliography, to de Bruijn,
N. G. and Erdös, P. (1951) *Some linear and some quadratic recursion formulas.
I*, Indag. Math. 13 374–382, MR0047161, and (1952) *… II*, Indag. Math. 14
152–163, MR0047162. So **the deterministic near-Fekete toolbox the task names is
the same object BGT reach for**, and BGT themselves say de Bruijn–Erdős is
strictly more general on the error term. That is recorded here before any
mapping is attempted, because it decides which half of the task is live.

**The interpolation machine itself, verbatim from the same full text** (ar5iv
rendering of the same arXiv source, cross-checked against the PDF's section
text):

> Model: `H(𝔾) = sup_{x∈[q]^N} H(x)`, `H(x) = Σ_{i∈[N]} H_i(x_i) + Σ_{e∈E} H_e(x_e)`
> on a hypergraph `𝔾 = ([N], E)`.
>
> Interpolating ensemble: "The first `r` hyperedges `e_1,…,e_r` are selected
> u.a.r. from all the possible directed hyperedges [namely they are generated as
> hyperedges of `𝔾(N,⌊cN⌋)`]." … "For each `j = r+1,…,⌊cN⌋`, with probability
> `N_1/N`, `e_j` is generated independently u.a.r. from all the possible
> hyperedges on nodes `[N_1]`, and with probability `N_2/N`, it is generated
> u.a.r. from all the possible hyperedges on nodes `[N_2]`."
>
> Proposition 2: "For every `r = 1,…,⌊cN⌋`, `𝔼[H(𝔾(N,⌊cN⌋,r))] ≥
> 𝔼[H(𝔾(N,⌊cN⌋,r−1))]`."
>
> Theorem 5: "`𝔼[H(𝔾(N,⌊cN⌋))] ≥ 𝔼[H(𝔾(N_1,ℳ_1))] + 𝔼[H(𝔾(N_2,ℳ_2))]`" with
> `ℳ_1 ∼ Bi(⌊cN⌋, N_1/N)`.
>
> Theorem 1: "For every `c > 0`, and for every one of the six models … there
> exists (model dependent) `H(c)` such that `lim_{N→∞} N^{−1}H(𝔾(N,⌊cN⌋)) =
> H(c)`, w.h.p."
>
> Closing step: "Namely the sequence `𝔼[H(𝔾(N,⌊cN⌋))]` is 'nearly'
> super-additive, short of the `O(√N)` correction term. Now we use Proposition 5
> in Appendix B for the case `α = 1/2` to conclude that the limit … exists."

The map's row-9 grade therefore moves from **[SOURCED]** to **[SOURCED,
verbatim, Proposition 5 and the interpolation construction read as page images]**.

## 2. The five hypotheses, named, so the mapping can be scored against them

Read off the construction above, in the order they bind:

- **H1, additive ground set.** The size parameter `N` is the cardinality of a
  node set that splits as a disjoint union `[N] = [N_1] ⊔ [N_2]`, and the model
  restricts to each part. Without this there is no `a_{N_1} + a_{N_2}` to write.
- **H2, an ensemble with exchangeable hyperedges.** The edges are drawn u.a.r.
  and independently, so a single edge's law can be moved from "global" to "one
  side" and the two expectations compared. The interpolation parameter `r` is an
  index over *distributions*, not over objects.
- **H3, a local objective over a fixed alphabet.** `H` is a sum of node and edge
  potentials on `[q]`, so one edge's contribution is bounded and the optimizer
  induces an empirical type on `[q]` that the convexity step compares.
- **H4, bounded differences.** Changing one hyperedge moves `H` by `O(1)`, which
  is what turns `𝔼[H]` into `H` w.h.p.
- **H5, fixed density.** Edges number `⌊cN⌋`, so the two halves are members of
  the *same* sequence at the *same* `c`.

Prop 5 needs only: `a_N ≥ 0`, `α ∈ (0,1)`, and (24) for **every** split.

**Sign note, recorded now so it is not "discovered" later.** Our object is
sub-additive, BGT's is super-additive. The conversion is `a_N := CN − b_N`,
which is Prop-5-admissible iff `b_N ≤ CN` for an a priori `C`. Here `b_N = g(u)
= ln Ĝ(e^u)` and the a priori linear bound is the proven sifting exponent
`β₂ = 4.26645028414864191641` (`research/dhr-verification.md` row 1a; DHR,
rigorous to twenty places via Booker–Browning). So the conversion is available
and is not a gap.

## 3. The object, and the two coordinates it can be measured in

`Ĝ(t) = G₂(P(t)#)`, `P(t)` the largest prime `≤ t`; `g(u) = ln Ĝ(e^u)`,
`u = ln x`; and the **slack** `S(x) = ln(x²/Ĝ(x))`, which is the Overshoot
Budget's own column (`research/gate-multiplies.md` §5).

Two candidate additive coordinates, and the prereg commits to testing both:

- **Coordinate A, `u = ln x`.** This is where the exponent lives
  (`β = lim g(u)/u`). Additivity `u = u_1 + u_2` is `x = st`.
- **Coordinate B, `n = π(x)`, the prime count.** This is where the corpus's one
  proven composition lives (`attack-L-subadditivity.md` §1, super-additivity of
  `L` on disjoint prime sets).

**An identity derived here before any code, and pre-registered as a self-test.**
Since `g(u) = 2u − S(e^u)`,

> `D(s,t) := ln Ĝ(st) − ln Ĝ(s) − ln Ĝ(t) = S(s) + S(t) − S(st)`, exactly.

So the submultiplicativity defect **is** the slack's super-additivity defect,
and the linear part of `S` cancels identically: only the *sublinear* part of `S`
can make `D` grow. Under any law `Ĝ ∼ c x^β (ln x)^δ` this gives
`D = −δ ln(u_1u_2/(u_1+u_2)) − ln c`, which is bounded above for every `δ ≥ 0`
and tends to `−∞` along the diagonal when `δ > 0`.

**A second identity, same status.** The candidate `Ĝ(st) ≤ C·Ĝ(s)Ĝ(t)`, iterated
by halving from base `x`, gives `β ≤ (ln C + g(ln x))/ln x`, so

> **the candidate with an explicit `C` implies `β < 2` at base `x` if and only
> if `ln C < S(x)`.**

The TPC-implication threshold is therefore the slack column itself, term by
term, and it is `1.2946` at `x = 79`. For the near-Fekete form
`D ≤ K·u^α` the same halving gives
`β ≤ g(u)/u + K u^{α−1}/(2^{1−α} − 1)`, so the threshold reads
`K·u^α/(2^{1−α} − 1) < S(x)`.

## 4. Pre-registered predictions

Each is falsifiable, each has a number, and each says what outcome would count
as the prediction failing. Hand derivations are shown; a producer that
reproduces them scores a hit, a producer that contradicts them scores a miss
and the miss is reported.

**P1 — BGT's H1 fails in coordinate A, and by a measurable amount.** Under
`x = st` the constraint set is the primes `≤ st`, and `π(st) ≠ π(s) + π(t)`.
Predict: `Δπ(s,t) = π(st) − π(s) − π(t) > 0` at every ladder pair with
`st ≥ 25`, and `max Δπ` over `2 ≤ s ≤ t`, `st ≤ 79` lies in `[10, 18]`.
Fails if `Δπ = 0` at any pair with `st ≥ 25`, which would put H1 back in play.

**P2 — the identity of §3 holds to `1e−12` at every pair.** A miss is a coding
defect, not a finding.

**P3 — coordinate B applies exactly and delivers nothing.** In `n = π(x)` the
disjoint-union structure is real, so Fekete needs no error term at all; predict
that the Fekete limit there is `+∞` (`L_n/n` increasing without bound over the
ladder, ending above `14` at `n = 20`), i.e. a theorem with no content, because
the exponent lives in `ln x` and `π(x) ≍ x/ln x` is not linear in `ln x`.
Fails if `L_n/n` is bounded or non-monotone on the ladder.

**P4 — the real-variable form of the candidate has a much larger constant than
the record's, and the constant is a function of the domain floor.** The
max-plus record states the candidate "for all real `s, t ≥ 2`" and tests it on
**integer** pairs, where `sup R = 2.9333`. `Ĝ` is constant on `[p, p′)`, so the
real form admits `s → p′⁻`, and the sup can only rise. Hand derivations, to be
scored:

| domain floor `s₀` | hand-derived real `sup R` | witness |
|---|---|---|
| 2 | `7.5` (`ln = 2.0149`) | `s, t ∈ [2,3)`, `st ∈ [7,9)`: `30/(2·2)` |
| 3 | `5.6667` (`ln = 1.7346`) | `s, t ∈ [3,5)`, `st ∈ [23,25)`: `204/(6·6)` |
| 5 | `4.8333` (`ln = 1.5755`) | `s ∈ [3,5)`… excluded at this floor; expect `≤ 2.6` |
| 7 | `1.9` (`ln = 0.6419`) | `s, t ∈ [7,11)`, `st ∈ [79,83)`: `1710/(30·30)` |

Predict: real `sup R` at floor 2 is `7.5`; at floor 7 it is `1.9`; and the
integer-pair `2.9333` is **not** an upper bound for the stated real candidate.

**P5 — the explicitness trap survives P4 and tightens.** Applying the §3
threshold `ln C < S(x)`: at floor 7 the real constant gives
`β ≤ (0.6419 + 7.4442)/4.3694 = 1.8506` at base 79, which is **below** the
record's `1.9500`. At floor 2 it gives `(2.0149 + 7.4442)/4.3694 = 2.1650`,
above 2. Predict: **every domain floor a proof would actually use (`s₀ ≥ 5`)
is TPC-implying at base 79, and the escape exists only at the degenerate floor
`s₀ < 5` where `Ĝ(s) ∈ {2, 6}` encodes an empty or near-empty prime set.**
Fails if some floor `≥ 5` gives a best-base ceiling `≥ 2`.

**P6 — the near-Fekete relaxation buys nothing on the explicitness front.**
Predict: with `α = 1/2`, the largest `K` for which
`K·(ln 79)^{1/2}/(2^{1/2} − 1) < S(79) = 1.2946` is `K < 0.2565`, and the
measured defect at floor 7 (`0.6419` nats, constant in `u` on the reachable
range) sits **inside** the TPC-implying region for the constant form and
therefore also for any `K u^α` form dominating it. So an explicit error function
of BGT's shape is TPC-implying by the same arithmetic. Fails if the measured
defect's admissible `(K, α)` region is disjoint from the TPC-implying region.

**P7 — the correction term the data supports, calibrated first (blind).** The
control is the one-class Jacobsthal `h(p#) = A048670`, 58 terms to `p = 271`,
true exponent `1 + o(1)` with a positive log power
(`research/exponent-control.md` §1, §3). Under `h ∼ c x (ln x)^δ` the §3 formula
predicts the control's defect is bounded above and **decreasing** along the
diagonal. Predict, blind: (a) the control's defect is bounded above over all
`58`-term pairs at floor 7; (b) its diagonal defect has a fitted trend in
`ln u` whose 1σ band excludes 0 **and is negative**; (c) `G₂`'s diagonal defect
carries the **same sign**. Predict further that **no `u^α` with `α > 0` is
needed**: the supported correction is `O(1)`, i.e. plain Fekete with a constant,
not de Bruijn–Erdős. Fails if the control's diagonal trend is positive or its
band contains 0 while `G₂`'s does not, in which case the control has not
calibrated the instrument and no reading on `G₂` is reported.

## 5. What each outcome means for the map, decided now

- If P1 and P3 hold, BGT's own machine is **closed** for this object by a named
  hypothesis (H1 in coordinate A; the normalization in coordinate B), and the
  row's payoff is WALL-ADDRESS, not THEOREM.
- If P7 holds, the de Bruijn–Erdős / BGT Prop 5 relaxation is **available but
  idle**: the defect is already `O(1)` under every law the corpus entertains, so
  the weaker hypothesis is not the thing standing between here and a proof.
- If P5 and P6 hold, the route to TODO 1d is **open only constant-free**, and
  the correct statement of that constraint is sharper than the record's: it is
  `ln C < S(x)` against the slack column, not a single number, and the constraint
  **loosens as the ladder grows** because `S` rises. That is a live and
  checkable statement about where the ladder stops, not a permanent barrier.
- If P4 holds, the max-plus record's §4 needs a correction: its candidate is
  stated for reals and evidenced on integers, and its `C = 2.9333` does not bound
  the statement it makes. The repair is to state the candidate at a domain floor.

## 6. Scope and custody

Write scope: `research/import-interp-*.js`, this file,
`research/history/staging/import-interp.md`. No live-doc, TODO or CHANGELOG
edits. Ladders are quoted, not recomputed: `G₂` from `A144311 + 1` with terms
1–14 corpus-exact (`research/G2-STATE.md` §2) and 15–22 from OEIS A144311;
the control `H` from `research/exponent-control.js`; `H2 = A288815` from the
same file. `sup R = 2.9333` on integer pairs is cited from
`research/import-maxplus-02-subadditivity.js` and reproduced as custody, not
re-derived as a finding.
