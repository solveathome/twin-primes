# Analysis of Boolean functions aimed at the anchored bias: the product space is real, the alphabet is √W, and the forced degree saturates at 2

<!-- ledger
id: Q-import-boolean-analysis
status: CLOSED
todo: none
question: Does the analysis of Boolean functions reach the anchored bias?
verdict: Five things that had to hold do not, starting with the product space eating the statement worse than C^pi(x); the forced degree saturates at 2 and the globality hypothesis fails at q1, so the row supplies a wall address rather than a route, and every figure is SCRATCHPAD-GRADE and may not be quoted until re-derived inside an embedded producer.
-->

*(2026-08-27. Staging note. Nothing here is integrated into a live document and
no existing repo file was edited or moved. Three producers were written and run;
all three live in the session scratchpad, none is embedded, none is `qc`-gated,
and every number they printed is marked **`[SCRATCHPAD-GRADE]`** with its
inputs. Nothing here may be quoted outside this file until it is re-derived
inside an embedded producer. Statements read at source this session are marked
**[SOURCED]** with the page; bibliographic-only items **[SOURCED-BIB]**;
anything written from memory **[MEMORY]**, per `research/IMPORT-MAP.md` §0's
legend.)*

**Numeric confidence that this opens a route: below 0.5%.** Not "below 0.5%
before the experiment" — below 0.5% after it, and the residual is not in the
route as briefed. The briefed payoff (a theorem forbidding a degree-≤J function
from deviating by `z` at the anchor) is arithmetically dead: the forced degree
is **2**, at every level from `x = 23` to `x = 37`, and it stays 2 for as long
as `β` stays below 1 and `Var/E` stays bounded. What survives is a wall address
and one live-document correction, both below.

---

## 0. The verdict, disconfirming half first

**Five things that had to hold and do not.**

1. **`C^{π(x)}` eats the statement, exactly as the brief priced it might, and it
   is worse than `C^{π(x)}`.** The brief asked for this to be priced in §0 and
   stopped if it eats the whole thing. It does. The product space here is
   `∏_{p≤y} Z_p` with `y` the largest prime `≤ √W`, so the coordinate alphabets
   run up to `y = 2,724,079` at `x = 37`. Every hypercontractive constant in the
   field carries the minimum atom probability `λ`, and here `λ = 1/y = 3.671e−7`.
   O'Donnell's Theorem 10.21 reads `‖f‖_q ≤ (√(q−1)·λ^{1/q−1/2})^k‖f‖_2`
   **[SOURCED, verbatim, p. 292]**, which at `q = 4` is `(√3·y^{1/4})^k` per
   degree: `70.3` per degree at `x = 37`, not a constant. The loss is not `C^d`
   with `C` absolute, it is `∏_{q∈T}√q`, and `∏_{q∈T}√q` over the whole scour is
   `exp(θ(y)/2) = exp(1.36e6)` at `x = 37`. **[SCRATCHPAD-GRADE, `final.js`]**

2. **The deviation `z = −22,633` forces degree 2, not a large degree.** On
   `∏Z_q` the exact degree-1 ceiling for `sup/‖·‖_2` is `√(y−1)`, attained (proof
   in §3, one line, elementary). At `x = 37` that is `1,650.5`, so degree 1 is
   excluded and degree 2 — ceiling `2.724e6` — is not. Level by level the forced
   degree reads `1, 1, 0, 1, 1, 2, 2, 2, 2` at `x = 7 … 37`. It saturates at 2 and
   the margin grows: `|z|` scales like `√E ≍ √W/ln W` while the degree-2 ceiling
   scales like `y ≍ √W`, so the ratio decays like `1/ln W`. **The forced-degree
   instrument is finished at 2 and will stay there.** **[SCRATCHPAD-GRADE,
   `final.js`; the `|z|` column is quoted from `paper/anchored-note.md` §3, not
   recomputed]**

3. **The general-product-space concentration theorem is not merely weak here, it
   does not apply at the anchor's deviation depth.** O'Donnell Theorem 10.24
   requires `t ≥ (√(2e)/λ)^k` **[SOURCED, verbatim, p. 293]**. At `k = 1` that
   threshold is `√(2e)·y`, which exceeds `|z|` by a factor of `284` at `x = 19`,
   `240` at `x = 23`, `246` at `x = 29`, `261` at `x = 31` and `281` at `x = 37`
   — and the shortfall grows like `ln W`, for the same reason as (2). The
   theorem has no content at any computed level. **[SCRATCHPAD-GRADE, `final.js`]**

4. **The junta half of the field is not degraded here, it is false here.**
   Friedgut's Junta Theorem for general product spaces promises a
   `(1/λ)^{O(I[f]/ε)}`-junta **[SOURCED, verbatim, p. 295]**, which at `λ = 1/y`
   is `y^{O(1)} = W^{O(1)}`, larger than the coordinate count. O'Donnell states
   the breakdown explicitly at p. 305: for `p` as small as `1/n^{Θ(1)}` the
   promised junta size "may be larger than `n`", and "Friedgut's Junta Theorem
   simply isn't true for such small `p`" (Example 10.45) **[SOURCED, verbatim]**.
   Our regime is exactly that one: `λ = 1/y` and `n = π(y) − π(x) ≈ y/ln y`, so
   `λ ≈ n^{−1−o(1)}`. And the published repair for precisely this failure,
   Keevash–Lifshitz–Long–Minzer, opens by conceding it — "simple examples show
   that when `p` is small there is no hypercontractive inequality that is strong
   enough for such applications" **[SOURCED, verbatim at the arXiv abstract page,
   arXiv:1906.05568]** — and buys its way out with a *globality* hypothesis
   (functions "not significantly affected by a restriction of a small set of
   coordinates"), which `S` fails at the same coordinate that closed import-map
   row 7: the first scour prime `q₁`.

5. **The structural claim in the brief is half wrong, and the half that is wrong
   is the half Face 1 measures.** "The rotation ensemble is a genuine product
   measure — a phase is one uniform draw from `∏_p Z_p` by CRT" is true of the
   *deep* ensemble (window start uniform mod `P = ∏_{p≤y}p`, which is what
   `natal5-variance.js` computes moments over, by its own header) and **false of
   the `W`-member ensemble** of `paper/anchored-note.md` §1, whose phase vector
   `(t mod q)_q` for `t ∈ [0, W)` is a `W`-element diagonal inside a product of
   size `P ≫ W`. The two are not close: measured over the full enumeration, the
   `W`-ensemble variance exceeds the deep-ensemble variance by **1.3618× at
   `x = 11` and 6.8744× at `x = 13`**, the means differ (`38.2385` vs `39.2735`;
   `310.8834` vs `304.2821`), and the anchored `z` **changes sign at `x = 13`**
   (`−0.155` on the diagonal against `+0.285` on the product measure).
   **[SCRATCHPAD-GRADE, `ensemble-compare.js`; construction validated by
   reproducing `S(0) = 45` and `S(0) = 307` exactly, and the deep-ensemble
   `E`/`Var` exactly, against `paper/anchored-note.md` §§2–3]**

**What is banked.** One WALL-ADDRESS, stated in the field's own convention
(§4); one live-document correction with exact text (§7); the identification
Bonferroni depth `=` Hoeffding degree, with the reason the swap loses the
inequality (§2); and a confirmation from a second, independent machine that
`d(q₁)` is the defeating coordinate (§5). No theorem. No derived constant. No
route.

**What would falsify this note.** (a) A hypercontractive or low-degree
comparison on `∏Z_q` whose constant does not carry `λ`; §3's extremiser
`∏(q·1[t_q=0] − 1)` is an explicit counterexample to any such statement, so this
is closed rather than open. (b) A demonstration that the corpus's target is a
statement about the deep ensemble's *measure* rather than about the anchor as a
named point; `paper/anchored-note.md` Proposition 1 part (i) says otherwise and
is the reason. (c) A second reader disagreeing with §7's ensemble reading. Only
(c) is genuinely open, and §7 is written as a proposal for that reason.

---

## 1. The grade, run before the experiment

Per the map's standing rule (`research/IMPORT-MAP.md` §0a), the three gates
were priced before anything ran. Both priced verdicts survived contact.

**(a) Structural fit — SPLIT: EXACT-IDENTITY at the ambient, VOCABULARY-ONLY at
every named theorem.** The precedent for a split cell is row 14, which reads
"EXACT-IDENTITY at the object, CONJECTURE-ONLY at every statement."

*Why the ambient is exact.* `natal5-variance.js`'s own header says it: "Over a
uniformly random rotation `t` of a length-`L` window in the deep tile (period
`∏_{p≤y} p`)". That is the uniform product measure on `∏_{p≤y} Z_p`, with no
modification, and `S` is a function on it. The identification of the corpus's
Bonferroni depth with the Hoeffding/Efron–Stein degree is likewise exact and is
proved in §2. The corpus already carries the folklore label for the
decomposition itself: `history/staging/audit-novelty-postaudit.md` §8 records
the Skeleton Collapse expansion as "the **Hoeffding / Sobol–ANOVA**
decomposition of a function on a product space … in Boolean analysis, the
Fourier–Walsh expansion", verdict RELATED, mechanism folklore.

*Why every theorem is vocabulary-only.* The field's theorems are stated for
`{−1,1}^n` or for product spaces with a minimum atom probability `λ` treated as
a constant. Here `λ = 1/y = 1/⌊√W⌋`, which is not a constant and is not close to
one, and §0's items 1, 3 and 4 are the three places the field's own texts say
what happens then: the constant becomes `∏√q`, the tail theorem's hypothesis is
not met, and the junta theorem is false. Not one named theorem transfers with
one stated modification, which is what STRONG-ANALOGY requires. Under the map's
own filing rule a VOCABULARY-ONLY candidate belongs in
`history/staging/import-map-construction.md` §1 rather than in the table; §6
below drafts it both ways and the adjudicator picks.

**(b) Circularity pre-check — SPLIT: CLEAN as an instrument, TPC-STRENGTH at
the target.** Row 7's cell was priced CLEAN and corrected to TPC-STRENGTH on
2026-08-20, and the same trap is here. Written honestly, the hypothesis the
route needs is: *the degree-≤J projection of `S` approximates `S` pointwise, at
the anchor, to within a factor `1 − ε`*. That hypothesis delivers `S(0) > 0`
whenever the depth-`J` certificate is positive, and `S(x) ≥ 1` infinitely often
is the Twin Prime Conjecture by `paper/anchored-note.md` Proposition 2. So the
target is **TPC-STRENGTH**, priced that way before the run, and no independent
reason to think it softly provable was found. The finite computation actually
performed — what degree a deviation of `|z|` forces — carries no hypothesis and
is **CLEAN**; it is also the half that produced nothing.

**(c) Payoff type — WALL-ADDRESS.** Priced as WALL-ADDRESS with a
PUBLISHED-ANCHOR possibility. Banked: WALL-ADDRESS, plus a
`SEARCH-CONVENTIONS`-shaped row (§4) and a live-doc correction (§7). The
briefed THEOREM is unreachable for the reason in §3, and DERIVED-CONSTANT was
never on the table.

**Distinctness from row 7, checked as the brief required.** Row 7 (Talagrand's
convex distance, closed 2026-08-20) is a *deviation* instrument: its hypothesis
is a Lipschitz/certifiability condition on coordinate effects and its conclusion
is a tail bound. This row's instrument is the *degree filtration*: its hypothesis
is a bound on the Hoeffding degree and it has no Lipschitz hypothesis at all. The
two are structurally distinct in exactly the sense the map's §0 asks for, and the
distinctness is real — §5 shows they die at the same coordinate, which is a
convergence of two independent instruments and not a restatement of one.

---

## 2. Bonferroni depth is the Hoeffding degree, and the swap loses the inequality

**PROVEN (elementary; the mechanism is folklore per the audit cited in §1).**

Fix the deep ensemble. Coordinates are the primes `q` with `x < q ≤ y`, each
carrying uniform `Z_q`. For a fixed slot `r`, its survival indicator is

> `V_r(t) = ∏_q u_q(t_q)`, `u_q(a) = 1[a ∉ {r mod q, (r+2) mod q}]`,

because prime `q` at phase `t` strikes `{t, t−2} mod q`, so `r` dies at `q`
exactly when `t ≡ r` or `t ≡ r+2 (mod q)`. Two expansions of the same product:

- writing `u_q = 1 − k_q` with `k_q` the kill indicator gives
  `V_r = Σ_T (−1)^{|T|} ∏_{q∈T} k_q`, which **is** inclusion–exclusion, and
  truncating at `|T| ≤ J` **is** Bonferroni depth `J`;
- writing `u_q = (1−2/q)(1 + h_q)` with `E[h_q] = 0` gives the
  Hoeffding/Efron–Stein decomposition, and truncating at `|T| ≤ J` is
  degree-`J` truncation.

Each `h_q` is an affine function of `k_q`, so for every `J` the two truncations
span **the same subspace**, and *depth `J` and degree `J` are the same
filtration*. They are not the same approximant: the degree-`J` truncation is the
`L²`-orthogonal projection and is therefore the best degree-`≤J` `L²`
approximation, while the Bonferroni truncation is not.

**And that is exactly why the swap is not free.** Bonferroni's whole value is
that its truncation is a one-sided *inequality* at every point, alternating in
`J`. The `L²`-projection carries no sign. So "replace Brun's truncation by the
optimal degree-`J` truncation" trades a pointwise bound for a mean-square bound,
which is the wrong direction for Face 1, whose object is one named point. This
is the structural reason the field's optimality does not convert into sieve
strength, and it is worth writing down once so the idea is not re-proposed.

**Two name collisions to flag before either is quoted.**

- `research/attack-bonferroni-degree.js` uses "degree" for the degree of a
  polynomial certificate `P(X_a)` in the *survivor count* (Door 3's moment
  ladder). That is a different `degree` from this note's, with no known bound
  relating them. The two must never be tabled together.
- "depth" in Face 3 (`K*`, the freshness-modulus ladder) is a third object again.

**Degree of `S`: exactly `n = π(y) − π(x)`.** The top-level Hoeffding
coefficient of `S` has squared norm `Σ_{r,r'} δ_rδ_{r'} ∏_q E[h_q^{(r)}h_q^{(r')}]`;
the off-diagonal factors are `−4/(q−2)²` for all but `O(1)` primes, so their
product over `198,274` coordinates is negligible against the diagonal
`δ²N∏_q (2/q)/(1−2/q) > 0`. So `S` is of full degree, and no low-degree theorem
applies to `S` itself. Any such theorem applies only to a truncation `S_J`,
which is a *different function*; a statement "`S_J` cannot deviate by `z`" says
nothing about `S`. The brief's hoped-for conclusion is available only in the
weaker form "a depth-`J` instrument cannot reproduce the anchor's deviation",
which is §3's computation, and §3's computation returns 2.

---

## 3. The forced degree, level by level

**The degree-1 ceiling on `Z_q` is exactly `√(q−1)`. PROVEN, one line.** Let `f`
on `Z_q` (uniform) have mean zero and `‖f‖_∞ = M`. Minimising `‖f‖_2` subject to
those two constraints puts `f = M` at one point and `−M/(q−1)` elsewhere, giving
`‖f‖_2² = M²/(q−1)`, so `‖f‖_∞/‖f‖_2 ≤ √(q−1)`, attained by
`f = q·1[t_q = 0] − 1`. ∎

**The degree-`J` ceiling is at least `∏_{i≤J} √(q_i − 1)`. PROVEN.** Take the
tensor product of `J` copies of the extremiser on distinct coordinates; the
factors are independent and mean zero, so both norms multiply. ∎

That is all the note needs, and it is what kills the briefed theorem: **no
`sup`-versus-`L²` comparison on `∏Z_q` can have a constant free of the alphabet
sizes**, because the extremiser above is a counterexample at degree 1. Any
version with an absolute `C^d` is false here.

The forced degree is then the least `J` with `∏` of the `J` largest
`√(q−1)` at least `|z|`:

| `x` | `y` | `n` scour | `λ = 1/y` | `\|z\|` | deg-1 ceiling `√(y−1)` | deg-2 ceiling | **forced degree** | Thm 10.24's own `t_min` at `k=1` | `t_min/\|z\|` |
|---|---|---|---|---|---|---|---|---|---|
| 7  | 13 | 2 | 7.692e−2 | 1.05 | 3.5 | 1.095e+1 | 1 | 3.031e+1 | 28.9 |
| 11 | 47 | 10 | 2.128e−2 | 1.81 | 6.8 | 4.395e+1 | 1 | 1.096e+2 | 60.5 |
| 13 | 173 | 34 | 5.780e−3 | 0.28 | 13.1 | 1.690e+2 | 0 | 4.034e+2 | 1440.6 |
| 17 | 709 | 120 | 1.410e−3 | 4.50 | 26.6 | 7.040e+2 | 1 | 1.653e+3 | 367.4 |
| 19 | 3,109 | 435 | 3.216e−4 | 25.52 | 55.7 | 3.098e+3 | 1 | 7.249e+3 | 284.1 |
| 23 | 14,929 | 1,739 | 6.698e−5 | 144.9 | 122.2 | 1.492e+4 | **2** | 3.481e+4 | 240.2 |
| 29 | 80,429 | 7,863 | 1.243e−5 | 762.1 | 283.6 | 8.042e+4 | **2** | 1.875e+5 | 246.1 |
| 31 | 447,829 | 37,534 | 2.233e−6 | 4,000.9 | 669.2 | 4.478e+5 | **2** | 1.044e+6 | 261.0 |
| 37 | 2,724,079 | 198,274 | 3.671e−7 | 22,632.9 | 1,650.5 | 2.724e+6 | **2** | 6.352e+6 | 280.6 |

**[SCRATCHPAD-GRADE, `final.js`. Inputs: `y` and the scour from a sieve to
`⌊√(x#)⌋`; the `|z|` column quoted verbatim from `paper/anchored-note.md` §3,
not recomputed; `t_min = √(2e)·y` from O'Donnell Thm 10.24's stated hypothesis
`t ≥ (√(2e)/λ)^k` at `k = 1`.]**

**Three readings, in decreasing order of how much they hurt the route.**

1. **The forced degree saturates at 2 and stays.** `|z| = (1−β)E/σ ≍ √E ≍
   √W/ln W` while the degree-2 ceiling is `≍ y ≍ √W`, so the ratio `|z|/y`
   decays like `1/ln W` given the two measured trends `β` bounded below 1 and
   `Var/E` bounded — the same two trends `paper/anchored-note.md` Proposition 1
   part (ii) already leans on, and no stronger. **HEURISTIC**, resting on those
   trends, with the arithmetic check at `x = 37`: `|z|/y = 8.3e−3`.
2. **2 is what Door 2 already says.** `paper/wall-note.md` §1 Door 2 states that
   from `x = 13` up "any viable route must credit overlaps at Bonferroni depth 2
   or more". The import reproduces the corpus's own number by a completely
   different argument. That the two land on the same small integer is worth one
   sentence and no more: it is a coincidence of two arguments about the same
   object, not a derivation of either from the other.
3. **The tail theorem is inapplicable, not weak.** Column `t_min/|z|` is above
   240 at every level `≥ 19` and rising, so Theorem 10.24 is not being beaten by
   Chebyshev here in the way McDiarmid was in `paper/anchored-note.md` §2 — it
   has no content at all at these deviations.

---

## 4. The wall address, in the field's convention

This is the payoff, and it is one paragraph.

> **The rotation ensemble's symmetry group acts transitively on its phases, and
> every theorem in the analysis of Boolean functions is invariant under that
> group.** The deep ensemble is `(∏_{p≤y} Z_p, uniform)`, and translation by any
> vector `σ ∈ ∏Z_p` preserves the measure, the degree filtration, all `L^q`
> norms and all influences. So a theorem whose hypotheses are stated in those
> terms and whose conclusion is either a norm inequality or a statement holding
> off an exceptional set of measure `ε` is *equivariant*: applied to `S∘σ` it
> returns the same bound about `σ^{-1}` of the exceptional set. No such theorem
> can distinguish `t = 0`. The anchor is arithmetically distinguished and
> measure-theoretically generic, and every instrument in this field measures
> only the second thing. Reaching the anchor requires a hypothesis that names
> the arithmetic of `t = 0`, which is outside the field by construction.

That is `paper/anchored-note.md` Proposition 1 restated in the owning convention,
and it disposes of the whole surveyed list at once — Bonami/Beckner
hypercontractivity, the degree-`d` tail bounds, KKL, Friedgut, Bohnenblust–Hille
and the global-function repair — because every one of them has a conclusion of
one of those two shapes. It is the same mechanism that closed row 7 ("a sharper
tail bound moves the anchor the WRONG way") and row 12, arriving from a third
direction.

**A `SEARCH-CONVENTIONS.md` §1 row this suggests, offered and not applied.**

| object | our name | canonical | OWNING convention — search THIS | where it lives |
|---|---|---|---|---|
| the depth-`J` truncation of the tile's inclusion–exclusion, read as a function on `∏_{p≤y}Z_p` | Bonferroni depth; Brun's truncation; Face 3's `K*` ladder is a *different* object | Bonferroni inequalities | **"Hoeffding / Sobol–ANOVA decomposition"**, **"Efron–Stein decomposition"**, **"Fourier–Walsh expansion"**, **"low-degree function on a product space"**; the small-alphabet caveat is owned by **"`λ`-biased hypercontractivity"** and **"global functions"** | O'Donnell, *Analysis of Boolean Functions*, CUP 2014 / arXiv edition 2021, chs. 9–10; Keevash–Lifshitz–Long–Minzer arXiv:1906.05568 |

**Two prior-art cautions on that row.** The Hoeffding/ANOVA identification is
already labelled folklore inside this corpus
(`history/staging/audit-novelty-postaudit.md` §8), so nothing in §2 may be
presented as new. And no search was run this session for whether the
Bonferroni-depth-equals-degree identification is in print in the *sieve*
literature; it is natural enough that it probably is, and this note asserts no
absence. Per `research/SEARCH-CONVENTIONS.md`, that is stated rather than hidden.

---

## 5. The globality hypothesis fails at `q₁`, which is row 7's coordinate

**MEASURED elsewhere, not remeasured here.** The one published repair for the
`λ`-degradation is Keevash–Lifshitz–Long–Minzer's hypercontractivity for
*global* functions, where global means "not significantly affected by a
restriction of a small set of coordinates" **[SOURCED, verbatim at the arXiv
abstract page]**. `S` is not global, and the coordinate that breaks it is the
first scour prime `q₁`: `history/staging/row7-recon.md` measured `d(q₁)`, the
worst-case effect of that single coordinate, missing the Talagrand slack by a
factor growing like `√N` (174 at `x = 11` to 70,576 at `x = 23`).

So two structurally distinct machines — a Lipschitz-hypothesis instrument and a
degree-hypothesis instrument — die at the *same single coordinate*. That is the
first independent confirmation of row 7's banked WALL-ADDRESS ("`d(q₁)` as the
single defeating coordinate"), and it upgrades that address from one machine's
failure mode to a property of the object. **No number is claimed here; the
globality defect was not measured this session and should be, if anyone wants
this stated as more than an inference from row 7's `d(q₁)` figure.**

**The KKL branch, priced and closed by arithmetic.** The general-product KKL
reads `MaxInf[f] ≥ Ω(1/log(1/λ))·Var[f]·(log n)/n` **[SOURCED, verbatim,
O'Donnell p. 294]**. With `λ = 1/y`, `log(1/λ) = ln y` and `n = π(y) − π(x)`, so
the promised gain over the trivial Poincaré bound `MaxInf ≥ Var/n` is the factor
`ln n / ln y`, which is **below 1 at every computed level** — `0.755` at
`x = 19`, `0.823` at `x = 37` — and tends to 1 from below. **General-product KKL
is weaker than Poincaré on this object at every level and asymptotically ties
it.** **[SCRATCHPAD-GRADE arithmetic on `final.js`'s `n` and `y` columns]**

---

## 6. The second target: the Fourier budget re-proves, it does not re-price

The brief's fallback was Door 2 of `paper/wall-note.md` §1, where the door dies
on aggregation: gross strike total `22,132` against a census of `14,850` at
`x = 17`.

**The aggregation failure *is* the level-1 Hoeffding mass, and the identification
is exact to measurement precision.** Direct enumeration of the anchored strike
counts reproduces Door 2's own integers and puts them beside `Σ_{x<q≤y} 2/q`:

| `x` | census `N` | gross strikes | gross/`N` | `Σ_{x<q≤y} 2/q` |
|---|---|---|---|---|
| 11 | 90 | 73 | 0.81111 | 0.78909 |
| 13 | 990 | **1,135** | 1.14646 | 1.14676 |
| 17 | 14,850 | **22,132** | 1.49037 | 1.49379 |

**[SCRATCHPAD-GRADE, `door2-levels.js`. The bolded integers are Door 2's own,
reproduced exactly from a fresh enumeration this session.]**

So "Door 2 dies on aggregation" and "the level-1 mass ratio crosses 1" are the
same sentence, and the crossing is at `x = 13`, which is the crossing already
recorded in `REFUTED.md` row 43 ("it dies at `x = 13` where `Σ 2/p` crosses 1").
Hypercontractivity has nothing to add: the level-mass profile is
`∏_q(1 + a_q)` with `a_q = (2/q)/(1−2/q)`, an elementary expansion, and no
hypercontractive statement enters. **The second target re-proves the first
target's closure and re-prices nothing.**

**Bohnenblust–Hille, priced and pre-closed.** BH is the field's ℓ^{2d/(d+1)}
coefficient-versus-sup inequality, and Defant–Mastyło–Pérez established that the
Boolean-cube constants grow subexponentially in the degree (*On the Fourier
spectrum of functions on Boolean cubes*, Math. Ann. 374 (2019) 653–680,
DOI 10.1007/s00208-018-1756-y) **[SOURCED-BIB; the subexponential-growth
statement carried second-hand from two independent secondary readings, the
publisher page not opened]**. It is genuinely the closest published thing to an
`ℓ^{<2} → sup` conversion with a sub-exponential price, which is the shape of
the corpus's `ℓ¹ → ℓ²√log` wall. It is nevertheless closed on arrival, twice
over: (i) its conclusion lower-bounds the sup over *all* points and names none,
so §4's equivariance objection applies unchanged; (ii) `ℓ^p`-coefficient-to-sup
conversions on `Θ_e(a)`'s arithmetic are the family closed by import-map rows 5
and 6 (`REFUTED.md` row 54), whose mechanism — `‖Θ·S_H‖₂ = rms(R_H)` exactly, so
the conversion *is* the sharp maximal law and every true version is TPC-implying
— is machine-independent by row 6's own finding. BH is a new machine for a
target already priced TPC-strength. **No experiment was run on it and none
should be.**

---

## 7. Live-document correction, with exact proposed text

**This is the one thing in the note that touches a live document, and it is a
proposal only. Nothing was edited.**

**The defect.** `paper/anchored-note.md` §1 defines a `W`-member ensemble
("the strike-statistics ensemble has exactly `W` members"), while §2's moments
come from `natal5-variance.js`, whose own header states it averages over the
deep tile of period `∏_{p≤y}p`. Proposition 1 part (i) then pairs the *deep*
ensemble's Chebyshev fraction `ε = Var/E²` with the *`W`* ensemble's cardinality:
"a bound with exceptional fraction `ε` admits up to `εW` exceptional members …
it decides the anchor only if `εW < 1` … measured: `8.38e−6` at @19 against the
decision threshold `1/W = 1.03e−7`, a factor 81 short and growing like `ln²W`."
`paper/wall-note.md` §2 Face 1 carries the same pairing ("misses that threshold
by a factor of 81 at `x = 19` with the gap growing like `ln²W`").

**Why it matters, and why the direction is safe.** Both self-consistent pairings
are *worse* than the quoted 81, so **Proposition 1's conclusion is untouched and
in fact strengthens**:

- Deep `ε` with the deep cardinality `P = ∏_{p≤y}p`: the threshold is `1/P`, and
  `ln P = θ(y)` is `3,036.7` at `x = 19` and `2,722,628.4` at `x = 37` against
  `ln W = 16.088` and `29.635`. The shortfall is `exp(θ(y))`, not 81.
- `W`-ensemble `ε` with `W`: this needs the *diagonal* variance, which was never
  computed. Measured here by full enumeration, it is **1.3618× the deep variance
  at `x = 11` and 6.8744× at `x = 13`**, so `ε` rises by that factor and the
  shortfall rises with it.

**[SCRATCHPAD-GRADE, `ensemble-compare.js` and `final.js`. The producer's
construction is validated by reproducing `S(0) = 45` and `S(0) = 307` and the
published `E`/`Var` at both levels exactly.]**

**A second, smaller reading in the same measurement.** The anchored `z` is
ensemble-dependent and changes sign at `x = 13`: `−0.155` against the diagonal's
own `σ`, `+0.285` against the deep `σ` (the published value). At `x = 11` the two
nearly agree (`1.826` against `1.805`). The published `z` column is the
deep-ensemble one throughout and is internally consistent; what is not safe is
reading any `z` in that column as a rank within the `W`-member ensemble that
§4's calm statistics enumerate.

**Proposed replacement text for `paper/anchored-note.md` §3, Proposition 1,
part (i)** (the sentence beginning "Exact counting logic"):

> *(i) Exact counting logic: the ensemble whose moments §2 computes is the deep
> one, of period `P = ∏_{p≤y}p`, and the anchor is one of its `P` members. A
> bound with exceptional fraction `ε` admits up to `εP` exceptional members and
> says nothing about which they are; it decides the anchor only if `εP < 1`,
> i.e. only if `ε < e^{−θ(y)}`. The second-moment bound gives
> `ε ≈ (Var/E)·(1/E) ≍ ln²W/W` (measured: 8.38e−6 at @19), against a decision
> threshold `e^{−θ(19)} = e^{−3036.7}`. The smaller `W`-member ensemble of §1 is
> a diagonal inside that product and is not a product measure; its own variance
> is larger (measured 1.36× at @11 and 6.87× at @13), so pairing that ensemble's
> cardinality `W` with its own `ε` is also worse than the deep pairing is
> generous. Either way the shortfall is not a constant factor.*

**Proposed replacement for the corresponding clause in `paper/wall-note.md`
§2 Face 1:**

> *and our second-moment bound misses that threshold by more than any fixed
> factor: the ensemble the variance is computed over has period `∏_{p≤y}p`, so
> the decision threshold is `e^{−θ(y)}` and not `1/W`.*

**Calibration on this correction.** The measurement is SCRATCHPAD-GRADE and the
reading of which ensemble each live sentence intends is an interpretation of two
documents plus a script header. It should not be applied until a second reader
agrees the `W`-member ensemble of §1 and the deep ensemble of §2 are as this note
reads them, and until the diagonal variance is reproduced inside an embedded
producer at @11, @13 and, if affordable, @17. **The direction is safe either way,
so nothing standing on Proposition 1 is at risk.**

**Not touched.** The brief's three flagged known-wrong statements (Face 1's
parity floor being dimension-2's 8 rather than 2, Face 4's reversed `β₂` claim,
Face 2's refuted `m ≥ 3` reading) were read and nothing in this note is built on
them.

---

## 8. Drafted rows

**Drafted `research/IMPORT-MAP.md` row 15** (if the adjudicator files this in
the table; §1(a) notes the alternative, which is
`history/staging/import-map-construction.md` §1's rejected list):

| # | field | the importable theorem, and where its statement lives | moiré object | target hole | fit | circularity | payoff | cost | status |
|---|---|---|---|---|---|---|---|---|---|
| 15 | analysis of Boolean functions on product spaces | O'Donnell, *Analysis of Boolean Functions*, CUP 2014 / arXiv edition 2021: General Hypercontractivity Theorem (p. 283), Thm 10.21 (p. 292), Thm 10.24 (p. 293), general-product KKL (p. 294), general-product Friedgut (p. 295), Example 10.45 (p. 305) **[all SOURCED, verbatim]**; Keevash–Lifshitz–Long–Minzer arXiv:1906.05568 **[SOURCED, abstract verbatim]**; Defant–Mastyło–Pérez, *Math. Ann.* 374 (2019) 653–680 **[SOURCED-BIB]** | the deep rotation ensemble as `(∏_{p≤y}Z_p, uniform)`; `S` as a function on it; Bonferroni depth as the Hoeffding degree | Face 1's `z = −22,633` and Door 2's aggregation | **SPLIT: EXACT-IDENTITY at the ambient, VOCABULARY-ONLY at every named theorem** (`λ = 1/y`, not a constant) | **SPLIT: CLEAN as an instrument, TPC-STRENGTH at the target** (pointwise degree-`J` approximation at the anchor gives `S(0) > 0`, which is Prop 2) | WALL-ADDRESS | 4 h | **LANDED 2026-08-27, closed with mechanism** — the forced degree saturates at **2** (`1,1,0,1,1,2,2,2,2` at `x = 7..37`, exact ceiling `∏√(q−1)`) and the margin grows like `ln W`, so the briefed theorem is unreachable and reproduces Door 2's own "depth 2 or more" by a second argument; the field's constants carry `λ = 1/y = 3.671e−7` at @37, Thm 10.24's own hypothesis `t ≥ √(2e)·y` exceeds `\|z\|` by 240–281× at every level `≥ 19` and rising, general-product KKL is weaker than Poincaré here at every level (`ln n/ln y = 0.755 → 0.823`), and general-product Friedgut is FALSE in this regime by the source's own Example 10.45; the one published repair (KLLM globality) fails at `q₁`, row 7's defeating coordinate, from a structurally distinct instrument; BH is pre-closed by rows 5/6; banked WALL-ADDRESS (the equivariance statement: the ensemble's translation group acts transitively, so no measure-or-norm conclusion localises at the anchor) + a `SEARCH-CONVENTIONS` §1 row + one live-doc correction (the `W`-vs-`P` ensemble pairing in Prop 1(i), direction safe); `history/staging/import-boolean-analysis.md` |

**Drafted `research/REFUTED.md` line:**

| route | verdict | why, in one clause | closed | record |
|---|---|---|---|---|
| the low-degree / hypercontractivity family (Bonami–Beckner, the degree-`d` tail bounds, KKL, Friedgut's junta theorem, Bohnenblust–Hille) on the anchored deficit (import-map row 15) | CLOSED | the ensemble's alphabets are the primes up to `√W`, so every constant carries `λ = 1/y` and the field's own texts say what happens then (Thm 10.24 inapplicable by 240–281×, general-product KKL weaker than Poincaré, general-product Friedgut false by Example 10.45); and the deviation `z = −22,633` forces Hoeffding degree only **2**, saturating there with a margin growing like `ln W`, which is Door 2's own "depth 2 or more" reached twice | 2026-08-27 | `history/staging/import-boolean-analysis.md` |

---

## 9. NOT REACHED

- **No producer here is embedded or `qc`-gated.** `final.js`,
  `ensemble-compare.js` and `door2-levels.js` live in the session scratchpad.
  Every number they printed is SCRATCHPAD-GRADE and none may leave this file
  until re-derived inside an embedded producer.
- **The diagonal-versus-product variance was measured at @11 and @13 only.**
  @17 is `510,510 × 120 × 465` word-operations and was not attempted. The
  ratio's growth (1.36 → 6.87) is two points and is not a trend.
- **The globality defect of `S` was not measured.** §5 infers it from row 7's
  `d(q₁)` figure. A direct measurement (the share of `Var(S)` carried by the
  single coordinate `q₁`, and the restriction that maximises it) is the check
  that would turn §5 from an inference into a reading.
- **No prior-art search was run** on whether "Bonferroni depth = Hoeffding
  degree" is in print in the sieve literature, nor on whether anyone has priced
  low-degree analysis against a CRT product of prime alphabets. This note
  asserts no absence, per `research/SEARCH-CONVENTIONS.md`.
- **Defant–Mastyło–Pérez was not opened.** The Springer page redirected to
  authentication; the subexponential-growth statement is carried second-hand.
  Bonami (1970) and Beckner (*Ann. of Math.* 102, 1975) were not reached at any
  source this pass and are named here only as the origin of the inequality
  O'Donnell states, **[MEMORY]**.
- **KKL's and Friedgut's own papers were not opened.** Both statements are taken
  from O'Donnell's book, which is a textbook restatement and not the primary.
