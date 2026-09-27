# Foreign import 13: hypergraph covering (Pippenger–Spencer / FGKMT) on the adversary's construction

<!-- ledger
id: Q-import-hypergraph
status: ANSWERED
todo: none
question: Does hypergraph covering (Pippenger-Spencer / FGKMT) apply to the adversary's construction?
verdict: The covering theorem is class-count-agnostic and the analogy is EXACT at the hypothesis level, leaking at exactly one named place, the edges the machine needs as input; Branch A landed a theorem-provenance lower bound G2(x#) >> x ln x (HELD), Branch B died as predicted with a sharper wall than the registered one, and none of the three pre-registered kill lines fired.
-->

**HELD FOR ONE ADVERSARIAL PASS.** Nothing below enters a live corpus document
until that pass reports; the one genuinely new positive (§4's theorem) is
flagged HELD where it is stated.

*2026-08-20. IMPORT-MAP row 13, the last UNTRIED row. Pre-registration:
[import-hypergraph-prereg.md](import-hypergraph-prereg.md), committed ALONE
(469aaa3) before any producer or report existed — the first row-13-wave prereg
whose custody is PROVABLE, not merely declared. Producer:
`research/import-hypergraph-01-instance.js` (3.9 s, `code-sha256 a3c2257f`,
`out-sha256 d257d7ca`, formal embed, seven numbered readings). Legend as in
`research/sift-limit-attack.md`: **[PROVEN]** published theorem or a proof
given here; **[VERIFIED]** checked computationally here; **[MEASURED]**
empirical, finite range; **[CITED]** taken from an embedded artifact or a
corpus-verified source and not recomputed; **[SOURCED, page images]** read at
rendered page images this session.*

**Assignment.** Row 13: import the Pippenger–Spencer covering theorem (JCTA 51
(1989) 24–42) and its FGKMT generalisation (JAMS 31 (2018) 65–105) against the
adversary's construction; payoff priced THEOREM, aimed at `covering-dive.md`
§Q4's K–K residual — replacing a reading of a published proof with a theorem.
Grade in: STRONG-ANALOGY, so the mapping is the work: the dictionary must be
written cell by cell, with the exact cells and the leaks named.

---

## 0. The verdict, up front

> **The covering theorem itself is class-count-agnostic — its hypotheses are
> purely probabilistic (sizes, marginals, codegrees, a degree recursion), and
> the two-class instance satisfies the marginal hypothesis more exactly than
> FGKMT's own application does. The analogy is EXACT at the hypothesis level
> and leaks at exactly one named place: the edges the machine needs as INPUT.
> The K–K residual is NOT dischargeable by this import — the covering engine
> and the K–K reading live on disjoint mechanisms and disjoint scales.**
>
> 1. **The dictionary's strongest cell is exact [VERIFIED]:** the two-class
>    marginal is `2/q` at every survivor–prime cell, 1,602,018 of 1,602,018 by
>    direct enumeration, with an EMPTY exceptional set where FGKMT's (4.18)
>    tolerates `#Q′/(log₂x)²` exceptions.
> 2. **Corollary 4's C-window kills raw two-progression traces at every scale
>    [PROVEN, closed form]:** sparsity (4.17) forces covering primes past
>    `2x^{3/5}`, capping the covering sum at `2 ln(5/3) = 1.0217` against the
>    required `(5/4)ln 5 = 2.0118` — short by a factor 1.97, at every `x`. On
>    FGKMT's own range `(x/2, x]` the raw-trace sum is `(2 ln 2)/ln x → 0`:
>    the missing factor `≍ ln x` is exactly the Maynard–Tao concentration
>    boost, which is primality-specific and has no published two-class
>    analogue. **That is the wall, and it has an address.**
> 3. **The engine's own yield cap [PROVEN from the source's quantifiers]:**
>    with polynomially-bounded marginals, (4.1)'s `10^{m+2}` exponent caps the
>    nibble depth at `m ≍ log₃x`, flooring the leftover fraction at
>    `1/log₂x`. The machine converts lnln-scale losses (FGKMT's own Theorem 1
>    gains `log₄X` over their (1.1)); it can never carry a `ln`-power. **Row
>    13's priced THEOREM against the K–K residual was mispriced at map
>    construction.**
> 4. **What lands instead, and it is real [PROVEN here, HELD]:** the
>    first-moment half of the dictionary closes a theorem the corpus did not
>    have at this provenance grade — `G₂(x#) ≫ x ln x` from published
>    ingredients only (K–K Corollary 1 + Mertens + PNT + the §1 CRT identity),
>    §4 below. Asymptotically ABOVE the free FGKMT transfer
>    (`x ln x·lll x/ll x`) and two logs BELOW the unrefereed K–K reading: the
>    trade the prereg registered as A1, landed as registered.
> 5. **Pre-registration scored without overgrade:** N1, N2, N4, N5 PASS as
>    registered; N3's max threshold PASSES (0.2192 vs 0.25) and its
>    99.9th-percentile prediction FAILS (0.1496 vs 0.02) — a wrong prereg
>    prediction, recorded in §3 with its mechanism. No kill line fires.

---

## 1. The sources, read — full hypothesis lists

**FGKMT, arXiv:1412.5029v3 (= JAMS 31 (2018) 65–105), pages 5, 9–19 read at
rendered page images this session [SOURCED, page images].** The paper's own
summary of Pippenger–Spencer (p. 5, p. 11): PS applies to a hypergraph
"uniform both in the sense of edges having constant cardinality, and also in
the sense of the degrees being close to constant", and FGKMT state verbatim
that PS "does not have edges of constant cardinality" in their application, so
they generalise it; their informal PS hypothesis list (p. 11) is (i) near-
constant degrees, (ii) the hypergraphs do not depend on `i`, (iii) small
normalized codegrees, (iv) constant edge size `k`.

**Theorem 3 (Probabilistic covering), p. 12, hypotheses in full:** constants
`D, r, A ≥ 1`, `0 < κ ≤ 1/2`, integer `m ≥ 0`, and `δ > 0` with the smallness
bound (4.1) `δ ≤ (κ^A/(C₀ exp(AD)))^{10^{m+2}}`; disjoint finite non-empty
index sets `I₁,…,I_m`; for each `i ∈ I_j` a random finite subset `e_i` of `V`
with: (4.2) `#e_i ≤ r` almost surely; (4.3) `P(v ∈ e_i) ≤ δ/(#I_j)^{1/2}`;
(4.4) `Σ_{i∈I_j} P(v₁,v₂ ∈ e_i) ≤ δ` for distinct `v₁,v₂`; and, with
`d_{I_j}(v) = Σ_{i∈I_j} P(v ∈ e_i)` and the recursion `P₀ = 1`,
`P_{j+1}(v) = P_j(v)·exp(−d_{I_{j+1}}(v)/P_j(v))`: (4.8) `d_{I_j}(v) ≤
D·P_{j−1}(v)` and (4.9) `P_j(v) ≥ κ`. Conclusion: random `e′_i` supported
inside the `e_i` (plus `∅`) with, for any `J ≤ m` and `#e ≤ A − 2rJ`,
`P(e ⊂ V \ ∪∪e′_i) = (1 + O_≤(δ^{1/10^{J+1}}))·∏_{v∈e} P_J(v)`. The text
below the theorem notes `r` enters only through `2r < A`.

**Corollary 2 (Combinatorial covering), p. 13:** the one-hypergraph
specialisation, `A := 2rm + 1`; leftover `≪ Σ_v P_m(v)` using
`l ≤ n₁ + … + n_m` edges. **Corollary 3 (Generalized Pippenger–Spencer),
p. 14:** `d = o(#E)`, all edges of cardinality `O(1)`, `d ≤ deg(v) ≪ d`
uniformly, `codeg = o(d)`; conclusion: `l ≲ #E/d` edges covering all but
`o(#V)` — "an essentially optimal number of edges".

**Corollary 4 (the arithmetic packaging), pp. 15–16, hypotheses in full:**
`#P′ ≤ x`, `#Q′ > (log₂x)³`; (4.16) `#e_p ≤ r = O(log x·log₃x/log₂²x)`
a.s.; (4.17) `P(q ∈ e_p) ≤ x^{−1/2−1/10}`; (4.18) for all but
`#Q′/(log₂x)²` of `q`: `Σ_p P(q ∈ e_p) = C + O_≤(1/(log₂x)²)` with `C`
independent of `q`; (4.19) `(5/4)log 5 ≤ C ≪ 1`; (4.20)
`Σ_p P(q₁,q₂ ∈ e_p) ≤ x^{−1/20}`. Conclusion: for any `m ≤ log₃x/log 5`,
leftover `∼ 5^{−m}#Q′` whp, uniformly down to subsets `#Q″ ≥ #Q′/√(log₂x)`.
Their deduction (p. 16) instantiates Theorem 3 with `δ = x^{−1/20}`,
nibble intervals `|I_j| = 5^{1−j}log 5/C` — whose disjointness in `[0,1]`
is exactly what forces `C ≥ (5/4)log 5` — and `κ ≫ 5^{−m}`, `A = 2rm + 2`.

**Their codegree verification (p. 19), which transfers to us verbatim:** for
distinct `q₁, q₂`, `q₁ − q₂` is a nonzero integer of size `≤ x log x`, hence
divisible by at most one prime `p₀ ∈ P′`, so the codegree sum is at most one
term `≤ x^{−1/2−1/10}`.

**Pippenger–Spencer 1989 itself: NOT REACHED at source.** Routes tried this
session: the ScienceDirect PDF endpoint (both PII spellings) returns a bot
interstitial; the Claremont scholarship pages (hmc_fac_pub 585 and 1041) carry
no full text, only a link back to ScienceDirect; CORE returns empty. Its
statement is consumed here only through FGKMT's restatement above, and nothing
in this record depends on PS beyond what FGKMT prove themselves — Theorem 3
supersedes PS for every use this import makes. The map's **[SOURCED-BIB]** for
PS therefore stands unimproved; the FGKMT items above upgrade to
**[SOURCED, verbatim, page images]**.

---

## 2. The dictionary, scored cell by cell

| their object | our object | scored |
|---|---|---|
| vertex set `V` | stage-1 twin-slot survivors of `[1,y]` (`gcd(r(r+2), P(z)) = 1`) | **EXACT** by construction |
| random edge `e_i ⊆ V` | the two-progression trace `e_q(a) = {r ∈ V : r ≡ a, a−2 (mod q)}`, `a` uniform, independent across `q` (CRT, `two-class-lower-bounds.md` §1 [CITED, PROVEN there]) | **EXACT** |
| degree `Σ P(v ∈ e_i)` | `Σ_q 2/q`, identical for every vertex | **EXACT [VERIFIED]** — N1, zero exceptions in 1,602,018 cells; stronger than (4.18) needs |
| codegree `Σ P(u,v ∈ e_i)` | supported on `q | (r−r′)(r−r′−2)(r−r′+2)`, values `2/q` and `1/q` | **EXACT support [VERIFIED]**; the source's one-prime argument (p. 19) transfers verbatim to our three linear forms, so (4.20) holds by arithmetic at asymptotic ranges |
| sparsity (4.17)/(4.3) | `2/q` at `q ≍ x`: passes with room | **EXACT-fit at the top range; the RANGE it forces is the leak** — see below |
| a.s. edge size (4.16)/(4.2) | `max_a #(trace ∩ V)`; measured 1.0–2.4× the exact mean `2#V/q` (N4) | **fits** at FGKMT-shaped pipelines (`#V/q < 1` at the mop-up range); not the leak |
| the C-window (4.19) | `Σ_q 2/q` over the covering range | **THE LEAK.** Raw traces cannot reach it at any scale — §5 |
| edges as INPUT distributions | the theorem takes the edge laws as given; FGKMT manufacture theirs with Maynard–Tao | **THE OTHER HALF OF THE SAME LEAK** — the concentration boost is primality-specific |
| one class per prime | two classes at separation 2 | **class-count-agnostic, CONFIRMED** (prereg P-MEM1): no hypothesis anywhere in Theorem 3 / Cor 2 / Cor 3 / Cor 4 mentions the arithmetic shape of the edges |

**Where the prereg's predicted leaks actually landed.** L1 (edge size):
predicted the leak, measured NOT the leak — the a.s. bound is generous at the
ranges that matter (N4). L2 (conclusion adds nothing at lnln degree scale):
CONFIRMED for Branch A — the chain in §4 needs no covering theorem at all —
but the mechanism is sharper than the prereg guessed: the nibble genuinely
beats the first moment (`exp(−d)` → near-linear decline, finite total degree
reaches any fixed `κ`), and what caps it is (4.1)'s `10^{m+2}` against
polynomial marginals, not the degree scale per se. L3 (structured-leftover
input): CONFIRMED and sharpened into the C-window arithmetic of §5.

---

## 3. The pre-registered checks, scored

| check | registered | measured | verdict |
|---|---|---|---|
| N1 degree exactness | zero exceptions | 0 of 1,602,018 cells | **PASS** |
| N2 first moment | within 3 s.e. of `|V|·0.1750499` | mean 1730.83 vs 1731.07, `z = −0.12` | **PASS** |
| N3 codegrees, max | `≤ 0.25` of degree | 0.2192 | **PASS** |
| N3 codegrees, 99.9 pct | `≤ 0.02` of degree | **0.1496** | **PREDICTION FAILED** |
| N4 edge sizes | means at `2|V|/q` (3 s.e.) | exact to all printed digits (forced by N1); maxima 1.0–2.4× | **PASS** |
| N5 certificate | replay-clean cover, `y/(x′ln x′) ≥ 1.0` | uncovered 0 of 200,000 on independent replay; ratio **1.98** | **PASS** |

Also as registered: `|V| = 9889` inside the band [9790, 9990]; best trial
1654 ≤ E = 1731.

**The N3 miss, owned.** The 99.9th-percentile prediction was calibrated
against random-distance pairs and the registered population is dominated by
the 4,762,138 short pairs (`d ≤ 10⁴`), where `d` and `d±2` pick up the small
covering primes 17..31 far more often. The dictionary is untouched — the
codegree support formula is exact and the SOURCE hypothesis is asymptotic and
passes by the one-prime argument — but the prereg's toy-scale number was
wrong, and it stays wrong on the record. Two side sightings, logged not used:
the trial variance is 0.43 of Poisson (the two progressions of one prime are
mutually exclusive per slot — negative association concentrates the
leftover), and the greedy mop-up covers 1.43 leftover slots per prime
(adjacent leftovers `r, r+2` fall together to `a_q = r` — a small free
two-class bonus).

---

## 4. Branch A, landed: the theorem-provenance lower bound `G₂(x#) ≫ x ln x` — HELD

**THEOREM (this record; every ingredient published or elementary). There is an
effective `c > 0` such that `G₂(x#) ≥ (c + o(1))·x ln x`.**

*Proof.* Let `y = c₀ x ln x` with `c₀` fixed below, and `z = y^{1/2}`.

1. *Survivor count, by a published theorem consumed as a theorem.* K–K
   Corollary 1 (Izv. Math. 88:2 (2024) 225–235; statement read at page images
   twice by this corpus, quoted verbatim in `covering-dive.md` §4.2 [CITED]):
   if `Ω_p ⊂ Z/pZ` has `g(p)` elements for `p ≤ z`, the count of `n ≤ X`
   avoiding all `Ω_p` is `≪ X·V(z)`, `V(z) = ∏_{p≤z}(1 − g(p)/p)`. Apply with
   `X = y`, `Ω₂ = {0}`, `Ω_p = {0, −2 mod p}` (`g(p) = 2`, the two classes
   distinct for odd `p`): the stage-1 survivors `V` (twin slots of `[1,y]`
   for the primes `≤ z`) number `#V ≤ C₁·y·V(z)`. It is consumed at
   `z = √y`, inside the range every κ = 2 upper sieve certifies; the corpus
   already consumes this corollary at κ = 4 in the §4c substitution.
2. *The product, by Mertens.* `∏_{2<p≤z}(1 − 2/p) = (C₂ + o(1))/ln²z`
   (elementary from Mertens' third theorem: the factor against
   `(1 − 1/p)²` is the convergent twin-type product). With `z = √y`:
   `#V ≤ (4C₃ + o(1))·y/ln²y`.
3. *Greedy mop-up, one prime per survivor.* `π(x) − π(√y) = (1 + o(1))x/ln x`
   by PNT, and `#V ≤ 4C₃c₀(1 + o(1))·x/ln x`. Choose `c₀ = 1/(8C₃)`: for
   large `x` there is an injection `V → {primes in (√y, x]}`, `r ↦ p_r`. Set
   `a_{p_r} = r mod p_r`, `a_p = 0` for every other `p ≤ x`.
4. *Every `r ∈ [1, y]` is covered:* a non-survivor has `p ≤ √y` with `p | r`
   or `p | r+2`, i.e. `r ≡ a_p` or `a_p − 2 (mod p)` at `a_p = 0`; a survivor
   is covered by its own prime. By the CRT identity of
   `two-class-lower-bounds.md` §1 [CITED, PROVEN there], a full cover of
   `[1,y]` by pairs `{a_p, a_p − 2}` over `p ≤ x` exhibits a window of `x#`
   with no twin slot among `y` consecutive integers, so
   `G₂(x#) ≥ y − O(1) = (c + o(1))·x ln x`. ∎

**Placement, exactly as pre-registered (A1).** Above the free FGKMT transfer
`x ln x·lll x/ll x` by `ll x/lll x → ∞`; below the corpus's unrefereed K–K
reading `x ln³x·(lll x)²/(ll x)⁴` by `≈ ln²x`. The trade is provenance for
strength: every step here is a published theorem read at source or elementary
and written out, where §4c is a reading of a published *proof*. The prereg's
honesty note stands: `two-class-lower-bounds.md` §4b sketched this accounting
(INFERRED); what is new is the proof grade, the explicit chain of custody,
and the finite end-to-end echo (N5: a replay-clean cover of `[1, 200000]`
with `x′ = 10861`, `y/(x′ ln x′) = 1.98`). **HELD for the adversarial pass;
enters no live document until then.**

---

## 5. Branch B, dead as predicted, with a sharper wall than the registered one

Registered B1: FAIL, predicted on a remainder-term/CRT-ambient mechanism.
**Outcome: FAIL, but earlier and cleaner — the registered mechanism was never
reached.** Three nested caps, each written with its arithmetic:

1. **Raw traces die on the C-window at every scale [PROVEN, closed form].**
   Corollary 4 needs `C ≥ (5/4)ln 5 = 2.0118` (forced by the disjointness of
   the nibble intervals `|I_j| = 5^{1−j}log5/C` in `[0,1]`, p. 16) alongside
   (4.17) `P(q ∈ e_p) ≤ x^{−3/5}`. The two-class marginal is exactly `2/p`
   (N1), so (4.17) forces `p > 2x^{3/5}`, and with `#P′ ≤ x` (so
   `p ≤ (1+o(1))x ln x`), `C = Σ 2/p ≤ 2 ln(ln(x ln x)/ln(2x^{3/5})) → 2 ln(5/3)
   = 1.0217`: **short of the window by a factor 1.9692 at every `x`**. On
   FGKMT's own mop-up range `(x/2, x]`, raw traces give
   `C = 2 ln(ln x/ln(x/2)) = (2 ln 2 + o(1))/ln x → 0` — short by `≍ ln x`.
   That `ln x` is precisely the concentration boost FGKMT buy with
   Maynard–Tao (edges sparse in the translate, dense on survivors: their
   marginal `≍ ln x/x` carries `C ≍ 1` where the uniform translate carries
   `C ≍ 1/ln x`). The boost's engine is primality — survivors that are primes
   `> x` pass every `0 mod p` sieve for free and cluster in bounded patterns
   by the multidimensional sieve. Two-class survivors are `z`-rough twin
   slots: nothing certifies their joint survival in prescribed bounded
   patterns, and the needed input — "bounded intervals with many jointly
   `z`-rough twin slots at chosen translates, with marginal `≤ x^{−1/2−1/10}`"
   — exists nowhere in print. FKMPT Remark 7's one-dimensionality concession
   ([CITED], `covering-dive.md` §2.3) is this same absence seen from the
   sifting side.
2. **Theorem 3 on raw traces yields a constant, not a log [PROVEN from the
   quantifiers].** Theorem 3 drops the C-window, and raw traces do satisfy
   its (4.2)–(4.4) over ranges `(x^θ, x]`. But (4.3) with polynomial block
   sizes (`m ≤ O(log₃x)` blocks forced by (4.1), so some `#I_j ≫ x^{1−o(1)}/log₃x`)
   needs `2/x^θ ≤ δ·(#I_j)^{−1/2}` with `δ < 1`, forcing `θ > 1/2`; the
   total degree then caps at `Σ_{x^{1/2+ε}<p≤x·ln x} 2/p ≤ 2 ln 2 + o(1) = 1.386`.
   The nibble recursion converts degree `1.386` into leftover `≈ e^{−2.05}`
   where independent sieving gives `e^{−1.386}` — a gain of `×0.52`, a
   constant.
3. **Even ideal edges cap at one lnln [PROVEN from (4.1)].** Any edge family
   with polynomially-bounded marginals forces polynomial `δ`, and (4.1)'s
   `10^{m+2}` then caps `m ≍ log₃x`, flooring the leftover fraction at
   `κ ∼ 5^{−m} ≥ 1/log₂x`. The engine's whole yield is ONE factor of
   `lnln`: FGKMT's Theorem 1 improves their own (1.1) by exactly `log₄X`.
   The Maier–Pomerance `+1 log` this row's pricing aimed at was never inside
   this machine's reach, in either dimension.

**Consequence for the K–K residual (the row's stated target).** The covering
theorem addresses the OVERLAP loss of a mop-up stage — a lnln-scale loss.
The K–K reading's strength lives in the smooth-band seeding (`M(f) = 2`,
band 2) — a ln-scale gain. Disjoint mechanisms: no application of
Theorem 3 / Corollary 4, with any edges the two-class system can currently
feed it, reproduces or replaces the §4c substitution. The residual stands,
and it now has a precise reason to stand.

---

## 6. Verdict against the prereg, and the row

**Kill lines.** K1 does NOT fire: Corollary 4's C-window is unreachable for
raw traces, but Theorem 3 — the same paper — is the stated variant without
it, and the prereg's K1 required that no variant exist. K2 does NOT fire:
Branch A's chain completed from published + elementary steps. K3 does NOT
fire: N1 and N2 passed.

**Grade, stated without overgrading.** The prereg's grammar conditions
LANDED-THEOREM on "N1–N5 pass". Four checks passed in full; N3 passed its
max threshold and missed its 99.9th-percentile figure, which the prereg's own
§3 words as a *prediction* rather than a PASS-gate. Under the
prediction-reading the THEOREM grade is met; under the strict all-gates
reading it is not self-certifiable by this record. **This record therefore
grades itself LANDED, banks WALL-ADDRESS unconditionally (§5's three caps,
the C-window arithmetic, and the named missing two-class concentration
input), and carries §4's THEOREM as HELD, its grade to be settled by the
adversarial pass together with the N3 reading.** The priced payoff (THEOREM
against the K–K residual) is NOT banked and could not have been: §5(3).

**Proposed IMPORT-MAP row 13 status cell** (the orchestrator edits the map):

> **LANDED 2026-08-20** — the covering theorem is class-count-agnostic
> (Theorem 3 / Cor 4 hypotheses read at page images: sizes, marginals,
> codegrees, a degree recursion — no arithmetic shape anywhere), and the
> two-class dictionary is EXACT at the hypothesis level (marginal exactly
> `2/q` at all 1.6M cells, empty exceptional set where (4.18) tolerates
> `#Q′/log₂²x`; codegree support on `q | d(d−2)(d+2)`, FGKMT's own one-prime
> argument transferring verbatim); the priced THEOREM-against-K–K-residual is
> unreachable IN PRINCIPLE — Cor 4's C-window `(5/4)ln5` is missed by raw
> two-progression traces by a factor 1.97 at every scale (sup `C = 2ln(5/3)`
> under (4.17)), the `ln x` concentration boost that closes the gap is
> Maynard–Tao primality machinery with no two-class analogue in print, and
> the engine's own (4.1) caps its total yield at one `lnln` (leftover floor
> `1/log₂x`; FGKMT's Theorem 1 gains exactly `log₄X`), so the covering side
> and the K–K smooth-band side are disjoint mechanisms at disjoint scales;
> banked: WALL-ADDRESS (the C-window arithmetic + the named missing input)
> + a HELD theorem-provenance chain `G₂(x#) ≫ x ln x` from published
> ingredients only (K–K Cor 1 + Mertens + PNT + §1's CRT identity — above
> the free FGKMT transfer, two logs below the unrefereed §4c reading),
> awaiting one adversarial pass; prereg committed alone (469aaa3, custody
> PROVABLE); N3's 99.9-pct toy-scale prediction failed and is recorded;
> `history/staging/import-hypergraph.md`

**What was NOT reached.** Pippenger–Spencer 1989 at source (paywalled at
every route tried; consumed only via FGKMT's restatement, on which nothing
here leans). FGKMT §§5–8 (the proof of Theorem 3 and the sieve estimates)
were not read beyond the statements — this import consumes the theorems, not
the proofs, which is its point. The sub-Poisson leftover variance (0.43) and
the 1.43-per-prime mop-up bonus are logged sightings, unchased. And the one
live question this record deliberately leaves open: whether a base-`(1+ε)`
re-derivation of Corollary 4 (the nibble-interval budget gives
`C ≥ b·log b/(b−1) → 1⁺` as `b → 1⁺`) could accept the raw-trace supremum
`2 ln(5/3) = 1.0217 > 1` — that would be a MODIFICATION of a published proof,
exactly what this row's payoff was scoped to avoid, its yield would still be
capped at `1/log₂x` by (4.1), and it is recorded here so nobody prices it as
an import again.

---

*This record states the import's outcome. The pre-registration it is scored
against is [import-hypergraph-prereg.md](import-hypergraph-prereg.md),
committed alone at 469aaa3 before any producer existed.*
