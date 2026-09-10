# Row 7 recon: concentration on product spaces (Talagrand), and the combinatorics-on-words re-entry

<!-- ledger
id: Q-row7-talagrand
status: CLOSED
todo: none
question: Does Talagrand's concentration on product spaces (IMPORT-MAP row 7) bound anything the corpus needs?
verdict: CLOSED WITH MECHANISM: the structural fit is better than the map wrote, since Theorem 8 needs no dependence structure and the shared-draw mechanism that closed rows 3, 4 and 10 does not close this one, but the per-coordinate effect c exceeds the largest tolerable value by a factor that DIVERGES (174x at @11 to 70,576x at @23), and the target hole is on the wrong side of the ensemble/anchor divide, so even a perfect bound would be inert.
-->

*(Reconnaissance, 2026-08-20. Target: `research/IMPORT-MAP.md` row 7 and its §3
paragraph. No corpus claim is changed by this file; every proposed edit
elsewhere is listed in §10 and left for the orchestrator. A predecessor recon on
2026-08-19 died mid-flight and left nothing, so this is a fresh pass.)*

**One-line verdict.** The structural fit is real and better than the map wrote —
Talagrand's Theorem 8 needs no dependence structure at all, so the shared-draw
mechanism that closed rows 3, 4 and 10 does **not** close row 7 — but the route
dies twice over: the per-coordinate effect `c` exceeds the largest value the
theorem can tolerate by a factor that **diverges** (174× at `@11` rising to
70,576× at `@23`), and the target hole is on the wrong side of the
ensemble/anchor divide, so even a perfect bound would be inert on Assumption A.
**CLOSED WITH MECHANISM**, with a PUBLISHED-ANCHOR and a WALL-ADDRESS banked.

---

## 0. What was read, and at what level

**[SOURCED, verbatim, read at source.]** Bruhn–Joos, *A stronger bound for the
strong chromatic index*, arXiv:1504.02583, §7. Theorem 8 (p. 14), the two
definitions preceding it (p. 14), Theorem 10 (p. 16), Lemma 9 (p. 15) and Lemma
11 (p. 16). The PDF was fetched, and pages 14 and 15 were **read as images**,
not only text-extracted, because text extraction is not reading and the constants
60 and 8 are load-bearing.

**[SOURCED, verbatim, read at source.]** Banks–Ford–Tao, *Large prime gaps and
probabilistic models*, arXiv:1908.08613, §3.2 (Lemmas 3.1, 3.2, 3.3) and §5
(the five-checkpoint table, Lemmas 5.1, 5.2, 5.3). Full text fetched and read.

**[SOURCED-BIB.]** Talagrand, *Publ. Math. IHÉS* 81 (1995) 73–205 — cited by
Bruhn–Joos as [22] for Theorem 10; the original was not opened. Molloy–Reed,
Springer 2002, p. 234 — the page citation is Bruhn–Joos's, verified as the
attribution attached to Theorem 8; the book was not opened, so the
Molloy–Reed **theorem number is still unknown**, exactly as
`import-map-construction.md` §3 flagged. Warnke, *On the method of typical
bounded differences*, *Combin. Probab. Comput.* 25 (2016) 269–299,
arXiv:1212.5796 — abstract page reached through a summarising fetch, which is
**second-hand**: the statement was not read and the journal name came back
garbled in the fetch, so it is recorded here as bibliographic only.
Adamczewski, *Balances for fixed points of primitive substitutions*, *Theoret.
Comput. Sci.* 307 (2003) 47–75, DOI 10.1016/s0304-3975(03)00092-6 — verified at
Crossref; the statement was **not** opened.

**[MEMORY], flagged.** That Adamczewski's balance function grows like
`n^{θ₂/θ₁}` with `θ₂/θ₁` the eigenvalue ratio of the substitution matrix. This
is written from memory, was not reached at any source this pass, and §8 does not
lean on it.

**Zero-occurrence scans.** Full texts of arXiv:1908.08613, 1412.5029, 1408.4505
and 1802.07604 were downloaded and searched (§7).

**Web search budget was exhausted** partway through this session, so the
prior-art sweep of §7 ran through the arXiv API, Crossref and direct full-text
scans rather than through a search engine. Two channels named in §7 are
therefore weaker than they would otherwise be, and say so on their own lines.

---

## 1. The theorem, verbatim, with every hypothesis

Bruhn–Joos state the two definitions first, and both are hypotheses of the
theorem rather than commentary.

> One common smoothness assumption for a random variable `X : Ω → ℝ` is that
> *each coordinate has effect at most c*: whenever any two `ω, ω′ ∈ Ω` differ in
> exactly one coordinate then `|X(ω) − X(ω′)| ≤ c`.

> We say that `X` has *certificates of size s for exceeding value k* if for any
> `ω ∈ Ω` with `X(ω) ≥ k`, there is a set `I` of at most `s` coordinates such
> that also `X(ω′) ≥ k` for any `ω′ ∈ Ω` with `ω|_I = ω′|_I`.

> **Theorem 8 (Talagrand).** Let `((Ω_i, Σ_i, ℙ_i))^n_{i=1}` be probability
> spaces, and let `(Ω, Σ, ℙ)` be their product space. Let `X : Ω → ℝ` be a
> non-negative random variable with `X ≠ 0` so that each coordinate has effect at
> most `c`, and assume `X` to have, for any `k`, certificates of size at most
> `kℓ` for exceeding `k`. Then for any `0 ≤ t ≤ 𝔼[X]`:
>
> `ℙ[ |X − 𝔼[X]| > t + 60c√(ℓ𝔼[X]) ] ≤ 4e^(−t²/(8c²ℓ𝔼[X]))`.

*(Bruhn–Joos, arXiv:1504.02583, p. 14, attributed there to Molloy–Reed [20,
p. 234].)*

**The seven hypotheses, itemised, because the row is decided by three of them.**

1. `(Ω, Σ, ℙ)` is a **product** of `n` probability spaces. Not a sub-family of
   one, not a diagonal.
2. `X ≥ 0`.
3. `X ≢ 0`.
4. **Worst-case** per-coordinate effect: the bound `|X(ω) − X(ω′)| ≤ c` is
   quantified over *all* pairs `ω, ω′` differing in one coordinate. There is no
   "typical" clause and no exceptional set.
5. **Upward certifiability at rate `ℓ`**, for *every* `k`: the certificate must
   force `X(ω′) ≥ k` for **every** `ω′` agreeing on `I`, whatever the other
   coordinates do.
6. The certificate size grows **linearly in the value**, `s ≤ kℓ`.
7. The conclusion is only claimed in the range `0 ≤ t ≤ 𝔼[X]`, so the largest
   deviation the theorem addresses is a doubling.

And the convex distance inequality itself, which is what Lemma 9 is proved from:

> **Theorem 10 (Talagrand [22]).** Let `((Ω_i, Σ_i, ℙ_i))^n_{i=1}` be probability
> spaces, and let `(Ω, Σ, ℙ)` be their product space. If `A, B ⊆ Ω` are two
> (measurable) sets such that `d(ω, A) ≥ τ` for all `ω ∈ B`, then
> `ℙ[A]ℙ[B] ≤ e^(−τ²/4)`.

*(ibid., p. 16, with `d(ω, A) = sup_α { τ : Σ_{i : ω_i ≠ ω′_i} α_i ≥ τ for all
ω′ ∈ A }` over unit vectors `α` with `α_i ≥ 0`, defined on the same page.)*

**The published repair the map named, also verbatim, and its own hidden price.**
Bruhn–Joos's Lemma 9 replaces hypothesis 4 with a typical-effect version:

> Given an exceptional set `Ω* ⊆ Ω` and `s, c > 0`, we say that `X` has *upward
> `(s,c)`-certificates* if for every `t > 0` and for every `ω ∈ Ω \ Ω*` there is
> an index set `I` of size at most `s` so that `X(ω′) > X(ω) − t` for any
> `ω′ ∈ Ω \ Ω*` for which the restrictions `ω|_I` and `ω′|_I` differ in less than
> `t/c` coordinates.

> **Lemma 9.** … If `X` has upward `(s,c)`-certificates then
> `ℙ[|X − med(X)| ≥ t] ≤ 4e^(−t²/(4c²s)) + 4ℙ[Ω*]`.

**Read all the hypotheses: Lemma 9 concentrates around the MEDIAN, not the
mean.** The conversion is their Lemma 11, and it carries a hypothesis the map's
paragraph does not mention:

> **Lemma 11.** … let `M = max{sup|X|, 1}`, and let `c ≥ 1`. If `X` has upward
> `(s,c)`-certificates, then `|𝔼[X] − med(X)| ≤ 20c√s + 20M²ℙ[Ω*]`.

So the exceptional set must satisfy `ℙ[Ω*] ≪ M⁻²` before the repaired bound says
anything about the mean at all. For the corpus's object `M` is the comb size `N`,
which is `1.45·10¹¹` at `@37`, so the repair silently demands
`ℙ[Ω*] ≲ 5·10⁻²³`. Any use of Bruhn–Joos that quotes Lemma 9 without Lemma 11 is
quoting a median statement as a mean statement.

---

## 2. What certifiability requires, and which corpus statistic has it

Hypothesis 5 is a **one-sided, conjunction-free** requirement: the witness must
be a set of coordinates whose values *by themselves* force `X ≥ k`. That is the
whole content, and it partitions the corpus's statistics cleanly.

**The kill count is certifiable with `ℓ = 1`. DERIVED HERE; the argument is two
lines and should be killed cheaply if it is wrong.** Write
`K = #{ r ∈ N_x : a_q ∈ {r, r+2} (mod q) for some scour prime q }`, the number of
comb slots struck by at least one prime. If `K(ω) ≥ k`, choose `k` struck slots
`r_1, …, r_k` and for each one choose a single prime `q_j` that strikes it. Put
`I = {q_1, …, q_k}`, of size at most `k`. Any `ω′` agreeing with `ω` on `I` still
strikes those `k` slots, so `K(ω′) ≥ k`. Hence certificates of size `k·1`, i.e.
`ℓ = 1`, the smallest value the theorem admits.

**The survivor count is not certifiable at any useful rate, and this is
structural rather than numerical.** `r` survives iff `a_q ∉ {r, r+2}` for
**every** `q`. Survival is a conjunction over all coordinates, so certifying
`S ≥ 1` requires pinning all `n` of them: the smallest legal `ℓ` is `n` itself,
and hypothesis 6's linear-in-`k` growth is then satisfied only vacuously. The
same holds for `𝔼[S] − S` and for any monotone-decreasing function of the strike
pattern.

**The map's sentence is right, and its wording is one word from being wrong.**
Row 7's paragraph says "a witness that the count is at least `k` is a set of
primes, of size proportional to `k`". That is true of the count of **struck**
slots and false of the count of **survivors**. Since the corpus uses "the
anchored survivor deficit" for `β = S(0)/𝔼[S]` in some places
([`../../GLOSSARY.md`](../../GLOSSARY.md), `β` entry) and for the shortfall
`𝔼[S] − S` in others, the row should say *the struck-slot count* explicitly. The
shortfall `𝔼[S] − S` is a survivor count up to sign and is **not** certifiable.

**`maxsum_m` over the gap word: certifiable in shape, but the statistic is
deterministic.** Under the rotation ensemble a witness for `maxsum_m ≥ k` is an
interval of length `k` in which all but `m` comb slots are struck, which needs
about `(N/W)·k` coordinates, so `ℓ ≈ N/W`, the comb density, and hypothesis 6 is
met. Hypothesis 4 is not: moving one prime's class can un-strike a single slot
that was holding a maximal window together and split it, so the worst-case
effect on `maxsum_m` is of the same order as `maxsum_m` itself. More decisively,
`maxsum_m(T_x)` as the corpus measures it is a property of the **anchored**
member — a single deterministic word — and there is no product space underneath
it at all. See §6.

**The window kill count in a short window is the one place `c` is small, and it
is the wrong regime.** For a window of width `w` and every prime `q > w`, one
prime strikes at most two slots inside it, so `c ≤ 2`. But the question a short
window poses is `K_window = m`, every slot struck — the extreme of the upper
tail — and hypothesis 7 confines Theorem 8 to `t ≤ 𝔼[X]`. The theorem is
Gaussian-regime by construction and cannot reach an all-struck event. That
regime is where the Mertens wall already lives
([`../../REFUTED.md`](../../REFUTED.md), rows 3 and 10).

---

## 3. The honest mapping: there are three ensembles and only one is a product space

This is the step the row's paragraph skips, and it changes which targets are
even addressable.

1. **The strike-statistics ensemble.** `t` uniform on `[0, W)`, `W = x#`
   ([`../../../paper/anchored-note.md`](../../../paper/anchored-note.md) §1).
   Exactly `W` members. By CRT the phase vector `(t mod q)_q` is injective on
   `[0, W)`, but `∏_{x<q≤y} q` is astronomically larger than `W`, so this
   ensemble is an exponentially thin **diagonal** inside the product, not the
   product. Hypothesis 1 **fails**. Every `natal-cap` statistic computed over
   `t ∈ [0, W)` — `VR`, `Z2`, the X-channel — lives here, and
   `natal-cap-31-calm-vs-kill.md` already records that its mean differs from the
   other two (`S̄ = 3614.9` against `3245.5` at `@17`).
2. **The window-count ensemble.** `t` uniform modulo `∏_{p≤y} p`, comb phase
   included (ibid. §1, instrument 1, `natal5-variance.js`). By CRT this **is**
   the product space: independent uniform residue classes, one per prime,
   `n = π(y) − 1` coordinates. Hypothesis 1 **holds exactly**. This is the
   ensemble whose `𝔼` and `Var` are tabulated in anchored-note §2, and it is the
   only one Talagrand can address.
3. **The march filtration.** Scour primes in ascending order, an exact
   martingale over ensemble 2 (`natal-cap-07-trajectory.js`). This is where
   McDiarmid was applied and lost.

So the mapping is available and exact — but only onto ensemble 2, and the row's
second named target, "the `S(0)/S̄` variance face", is the X-channel, which lives
on ensemble 1. **Talagrand does not reach the X-channel at all**, because the
X-channel's ensemble is not a product.

---

## 4. Where it breaks: `c`, priced

The map's own instruction is "the experiment should price `c` before anything
else". Here is the price, from the corpus's published quantities plus one exact
scratchpad check.

`c` is the worst-case change in `K` when one coordinate moves, which is at most
the largest number of comb slots one prime can strike:
`d(q) = max_a #{ r ∈ N_x : r ≡ a or a−2 (mod q) }`, maximised over scour primes,
i.e. attained at the smallest one, `q₁ = ` the first prime above `x`. That is the
same quantity `natal-cap-07-trajectory.js` calls the "max pair-count of natal
mod q" in its McDiarmid line.

Define `c*` as the largest `c` for which Theorem 8's **additive slack alone**,
`60c√(ℓ𝔼[K])` at `ℓ = 1`, stays below `𝔼[S]`. Any `c > c*` makes the theorem
vacuous before the exponential factor is even consulted.

| x | N | q₁ | `d(q₁)` exact | `∏(1−2/q)` | `𝔼[S]` | `𝔼[K]` | `c*` | `d(q₁)/c*` | Lemma-9 best-case exponent |
|---|---|---|---|---|---|---|---|---|---|
| 11 | 90 | 13 | 16 | 0.436373 | 39.27 | 50.73 | 0.0919 | 174 | 0.532 |
| 13 | 990 | 17 | 120 | 0.307356 | 304.28 | 685.72 | 0.1937 | 619 | 0.416 |
| 17 | 14,850 | 19 | 1,573 | 0.218553 | 3,245.51 | 11,604.49 | 0.5021 | 3,133 | 0.297 |
| 19 | 252,450 | 23 | 21,965 | 0.164156 | 41,441.19 | 211,008.81 | 1.5036 | 14,608 | 0.258 |
| 23 | 5,301,450 | 29 | 365,630 | 0.126197 | 669,028.80 | 4,632,421.20 | 5.1807 | 70,576 | 0.244 |

*Provenance of the table.* The `𝔼[S]` column reproduces
[`../../../paper/anchored-note.md`](../../../paper/anchored-note.md) §2 to the
published digits at all five levels (39.27, 304.28, 3245.51, 41441.19,
669028.80), which is the calibration that licenses the rest. `d(q₁)` is an exact
enumeration over the comb. **This is a scratchpad check run during this recon,
not an embedded corpus artifact**; §10 proposes where it should go if the
orchestrator wants it kept, and no body document should cite it until then.

**Failure mode 1: the worst-case `c` misses by a diverging factor.** `d(q₁)/c*`
runs 174 → 619 → 3,133 → 14,608 → 70,576, a factor of roughly 4.8 per level.
`c ≈ 2N/q₁` grows like `N` while `c* ≈ √(N)·∏(1−2/q)/60` grows like `√N` times a
decaying product, so the ratio grows like `√N`, i.e. like `e^{x/2}`. Theorem 8 as
stated is not close and gets further away. This is the map's own stated caveat,
confirmed and quantified.

**Failure mode 2: the published repair does not rescue it either, and this is the
new content.** Give Bruhn–Joos's Lemma 9 every benefit: let `Ω*` exclude all the
atypical class choices, so that the per-coordinate drop is the *fluctuation*
scale `c ≈ √(2μ_{q₁})` rather than the worst case, where
`μ_q = (2N/q)·∏_{q′≠q}(1−2/q′)` is the expected number of slots struck by `q`
alone. Take `s = 𝔼[K]` (the certificate size at `ℓ = 1`) and `t = 𝔼[S]` (the
deviation that would have to be excluded to keep any survivors at all). Then
Lemma 9's exponent `t²/(4c²s)` is the last column above: **0.532, 0.416, 0.297,
0.258, 0.244** — below 1 at every level the corpus can compute, and *falling*.

The closed form explains why, and it is the wall address. With `ℓ = 1`,
`s ≈ N`, `𝔼[S] = N·Π` where `Π = ∏_{x<q≤y}(1−2/q)`, and
`c² ≈ 2μ_{q₁} ≈ 4𝔼[S]/q₁`, the exponent collapses to

> `t²/(4c²s) ≈ (N Π)² / (4 · (4NΠ/q₁) · N) = q₁ Π / 16 ≈ x·Π/16`.

and `Π ≍ (ln x / ln y)² ≍ (2 ln x / x)²` by Mertens with `ln W ≍ x`, so the
exponent is `≍ ln²x / x → 0`. **The three quantities lock**: the certificate size
is forced up to the number of struck slots (`≈ N`), the deviation that matters is
only the survivor count (`≈ NΠ`), and the per-coordinate effect can never fall
below one prime's exclusive kills (`≈ NΠ/q`). No choice of exceptional set moves
any of the three. DERIVED HERE, and offered for adjudication rather than
asserted: the exponent formula is an asymptotic reading of five measured points,
and five points are not a series.

**Both failure modes are the McDiarmid failure.** anchored-note §2 records it as
"the first scour prime's worst-case increment is of the same order as `E`". That
is `d(q₁)` again. Talagrand changes the *shape* of the price — a certificate rate
`ℓ` instead of a sum of squared increments — and does not change the fact that
the first scour prime is a single coordinate with an `𝔼`-sized swing.

---

## 5. The deciding question: does Talagrand evade the shared-draw mechanism?

**Yes, and this is the row's one genuinely positive finding, so it should be
recorded even though the route closes.**

The mechanism that closed rows 3, 4 and 10 is that all the events live off one
uniform residue draw per prime, so the "non-neighbourhood" reconstructs the
indicator: Chen–Stein's `b₃` sits at 0.85–0.9998 of its own ceiling at every
window (`import-stein.md`), Shearer's exact criterion degenerates to the union
bound on the complete dependency graph (`import-shearer.md`), and Moser–Tardos's
causality digraph is complete (same record). Every one of those is an argument
about the **dependency structure**.

Theorem 8 has **no dependency hypothesis whatsoever**. Its hypotheses are
product structure, non-negativity, a worst-case coordinate effect, and upward
certificates. A complete dependency graph is not an obstruction to it; a
complete dependency graph is the *normal case* in its intended applications.
So the family that closed three rows does not close this one, and row 7 is
correctly graded as a distinct structural bet.

**What kills it instead is the Lipschitz constant, exactly as the map warned.**
The answer to the map's own either/or is unambiguous: not the dependence
structure, the constant — and the constant fails in both the worst-case form
(diverging, §4 mode 1) and the typical-effect form (bounded but below threshold
and decaying, §4 mode 2).

---

## 6. Payoff pricing: what a Talagrand bound would actually buy

**On `maxsum_m`: nothing.** `maxsum_m(T_x)` is a deterministic function of the
anchored member. The seven measured exponents 0.2661 → 0.3565
(`import-scanstat.md`, `scanstat2.md`, `scanstat-t37.md`) are properties of one
word, not of an ensemble. A concentration inequality is a statement about
measure and has no access to a named point. Worse, the corpus has already
measured that the anchored word is **not** typical: a reshuffled real tile
measures exponent 0.499 against the real word's 0.300
(`../../IMPORT-MAP.md` §3 row 1). Concentration would concentrate on the
reshuffled behaviour.

*(Staleness check, per the brief. Row 7's paragraph quotes no number, so the
forty-fourth and forty-fifth passes do not stale it. But any extension of row 7
toward `maxsum_m` must not use the rule `H = 0.2205 + 0.0061 ln D` — killed
blind twice, at `T₃₁` by 4.96 band-s.e. and at `T₃₇` by 3.63 s.e. — and must not
read `f` at `x ≥ 37` from `a3-03-f-from-census.js`, which carries a 32-bit shift
alias; the alias-free values are in `fdecay-deep-01-census-defect.js`.)*

**On `L`: nothing, and for the same reason twice over.** `L` is a property of the
anchored word, and `L` is now known to be `G₂` divided by the block's own
spacing, so a bound on `L` is a bound on `G₂`
([`../../REFUTED.md`](../../REFUTED.md); `attack-block-00-ADJUDICATION.md`).

**On Assumption A: nothing, and the direction is adverse.** Assumption A is a
statement about the single member `t = 0`. anchored-note §3 is titled "why
measure cannot reach the anchor" and the measurement is decisive:
`β = S(0)/𝔼[S]` descends 1.156 → 0.846 over ten levels while `σ/𝔼` shrinks, so
the anchored deviation in `σ`-units diverges: `z = −4.50, −25.52, −144.9,
−762.1, −4000.9, −22,632.9` at `@17` through `@37`. A **sharper** tail bound
places the anchor in a **smaller** exceptional set. Concentration therefore moves
this target the wrong way by construction, and no version of row 7 can be aimed
at Assumption A.

**On Assumption A's `ρ`: the row's circularity grade is wrong.** `ρ` is defined
by `β = π_L·π_R·(1+ρ)` (`import-suen.md` §7), and that record's conclusion is
that "the conjectural half" of Hardy–Littlewood *is exactly* `ρ → 0`. A route
whose payoff is a bound on `ρ` is therefore **TPC-STRENGTH**, not CLEAN. The row
is graded CLEAN, which is defensible only if the payoff is read as the
DERIVED-CONSTANT the row's own payoff column names (a price for `c`) rather than
as the target hole its target column names.

**What is actually left on the table, and it is real but small.** The one thing a
working concentration bound would buy is an upgrade of anchored-note §2's last
column — the almost-all theorem — from Chebyshev's polynomial `Var/𝔼²`
(2.20e−2 down to 4.22e−11 across nine levels) to something exponential. That
would be a THEOREM the corpus does not have. It would be inert on Assumption A,
inert on `ρ`, inert on `G₂`, and it is the statement Banks–Ford–Tao already prove
for their own model by other means (§7). Priced honestly, that is a
PUBLISHED-ANCHOR, not a THEOREM.

---

## 7. Prior art

**[FOUND, and it is the important one.] The owning convention has already run a
full concentration programme on this exact ensemble, and it does not use
Talagrand.** Banks–Ford–Tao, arXiv:1908.08613 §5, bound the survivor count `S_w`
of `[0, y]` under the model where each prime picks a uniform residue class — the
model `R` that `../../SEARCH-CONVENTIONS.md` §1 already names as the owner of
"rotation ensemble". Their §5 opens with a table of five checkpoints
`w₁ < w₂ < w₃ < w₄ < w₅`, read at source:

> | Range | Estimation technique |
> |---|---|
> | `[2, w₁]` | Lower bound by `W_y` (5.4) |
> | `(w₁, w₂]` | Buchstab identity, sieve upper bound (Lemma 5.1) |
> | `(w₂, w₃]` | Buchstab identity, large sieve, Bennett inequality (Lemma 5.2) |
> | `(w₃, w₄]` | Martingale interpretation, Azuma inequality (Lemma 5.3) |
> | `(w₄, w₅]` | Graph interpretation, combinatorial expansion (Lemma 6.1) |
> | `(w₅, z]` | Combinatorial expansion (Lemmas 6.3, 6.5, Corollary 6.4) |

and then say, in their own words, "The most delicate part of the argument is
dealing with primes `p` near `log x`". **That is the same coordinate that kills
row 7.** Their handling of it is the mechanism the corpus should take away: the
small primes are never given to a concentration inequality at all, they are
absorbed by Buchstab plus an upper-bound sieve (their Lemma 3.1, cited to
Halberstam–Richert Theorem 3.8), and the martingale is only started at
`w₃ = log x (log₂x)²`. Inside the martingale range they normalise,
`X_j = Θ⁻¹_{w₃,p_j} S_{p_j}`, and note "If `p_{j+1} > y`, then
`|X_{j+1} − X_j| ≪ 1`" — the increment is bounded only because the range was cut
first. Lemma 5.2 gets its variance from Montgomery's large sieve and feeds
Bennett's inequality.

This upgrades what the corpus already has on record. `import-suen.md`'s sweep
says their toolkit is "Chebyshev / Hoeffding / Bennett plus the Rödl nibble";
"Hoeffding" appears once in that paper and only as an aside, while **Azuma on a
normalised prime-indexed martingale** and the five-checkpoint decomposition are
the actual structure and are not on the corpus's record anywhere.

**[ABSENT in the random-sieve and prime-gaps convention, with the convention
named.]** Full texts of Banks–Ford–Tao (arXiv:1908.08613),
Ford–Green–Konyagin–Maynard–Tao *Long gaps between primes* (arXiv:1412.5029),
Ford–Green–Konyagin–Tao (arXiv:1408.4505) and Ford–Konyagin–Maynard–Pomerance–Tao
*Long gaps in sieved sets* (arXiv:1802.07604) were downloaded and scanned:
**zero occurrences of "Talagrand", "convex distance", "certifiable", "McDiarmid"
or "bounded differences"** in any of the four. FGKMT's only concentration tool is
a bespoke second-moment lemma stated as "Lemma 2.1 (Chebyshev inequality)"; FKMPT
splits the prime range at `H^M` into two independent blocks rather than
concentrating. So the Talagrand family has never been applied in this
convention. That is an absence of the family, not merely of the word, in the four
papers that own the model.

**[ABSENT, weak channel, stated as weak.]** An arXiv API metadata search for
`abs:"Talagrand" AND abs:"sieve"` returns 0, and
`all:"concentration inequality" AND all:"residue classes"` returns 1 (Aistleitner–Borda–Hauke,
arXiv:2210.14095, on partial quotients of reduced fractions, a different object).
The arXiv API searches metadata only, not full text, and the session's web-search
budget was spent, so these two are **thin negatives** and should not be quoted as
a literature absence. The four full-text scans above are the load-bearing ones.

**[FOUND, and it is the named repair the map should have carried.]** For the
failure mode "worst-case effect huge, typical effect small", the owning
convention is **"typical bounded differences"**: Warnke, *Combin. Probab.
Comput.* 25 (2016) 269–299, arXiv:1212.5796 [SOURCED-BIB only], with Kutin as
the earlier form, and **Kim–Vu polynomial concentration** for the same problem.
Bruhn–Joos name all three on p. 15 and say Warnke's is "still too weak for us"
and Kim–Vu's is "powerful, but technical". The map's row names only Bruhn–Joos
as "the published repair"; there are three, and Bruhn–Joos is the newest rather
than the only one. §4's mode 2 prices the whole family at once, because the
exponent `≍ x·Π/16` is set by the certificate size and the survivor density and
not by which repair supplies the typical effect.

---

## 8. The combinatorics-on-words leads

`import-map-construction.md` §1 rejected combinatorics on words as
VOCABULARY-ONLY on Fine–Wilf and critical factorization, with the reason "it says
nothing about a **union** of periodic sets, whose only period is the lcm". **That
rejection stands and this recon does not disturb it.** Re-entry costs an
identification, per the map's regrade rule, and this pass found one candidate and
one already-open corpus action.

**Candidate identification, offered for adjudication, not asserted.**
`maxsum_m − minsum_m` is the (weighted) **balance function** of the cyclic gap
word at length `m`: the maximum over factors of length `m` of the total letter
weight, minus the minimum. The owning conventions in combinatorics on words are
**"balance function"**, **"`C`-balanced word"** and **"abelian complexity"**,
none of which appears in `../../SEARCH-CONVENTIONS.md`. This is a naming
contribution and it earns its place mainly by saying where **not** to look: the
theory that owns power-law balance exponents is the theory of fixed points of
**primitive substitutions on a fixed finite alphabet** (Adamczewski, *Theoret.
Comput. Sci.* 307 (2003) 47–75, [SOURCED-BIB]; the exponent's form is [MEMORY]
and is not leaned on here). The corpus's own
[`../../OBSERVATIONS.md`](../../OBSERVATIONS.md) §2 already records why that
hypothesis fails here — "the alphabet grows with the level, so it is not a
substitution in the standard sense" — and a single tile is a finite cyclic word,
not the fixed point of anything. **So the identification is real and the theorem
behind it is unavailable, on a hypothesis the corpus had already written down.**
Recommendation: a `SEARCH-CONVENTIONS.md` row, not an `IMPORT-MAP.md` row.

**One corpus action is still open and this pass did not close it.**
`OBSERVATIONS.md` §2's first-moves list carries "Check the cut-and-project
framing against the literature before leaning on it", written 2026-08-15 and
still unticked; the same section conjectures "This is the cut-and-project
construction of quasicrystal theory; the `k = 2` case is the Sturmian words",
explicitly labelled CONJECTURED. That check needs the web-search budget this
session had already spent, so it is left open rather than reported as negative.
It is the only combinatorics-on-words lead this recon believes is still live, and
it is a prior-art question, not an import.

---

## 9. Verdict, and the one experiment left, pre-registered

**Row 7: CLOSED WITH MECHANISM.** Two independent mechanisms, either sufficient.

1. **Arithmetic.** The per-coordinate effect `d(q₁)` exceeds the largest value
   Theorem 8 tolerates by 174× at `@11` rising to 70,576× at `@23`, diverging
   like `√N`; and under the published exceptional-set repair the best-case
   exponent is `≍ x·Π/16 ≍ ln²x/x`, measured at 0.53 → 0.24 over the same five
   levels and falling. Vacuous at every computable level, in both forms.
2. **Target.** The two named target holes are unreachable in principle:
   Assumption A is a single-member statement and the anchor is measured at
   `−22,633σ` at `@37`, so sharper tails make the target worse; and `ρ → 0` is
   the conjectural half of Hardy–Littlewood, i.e. TPC-STRENGTH, not the CLEAN
   the row is graded.

**Banked payoff:** WALL-ADDRESS (the exponent `≍ ln²x/x`, and the identification
of `d(q₁)` as the single coordinate that defeats every member of the
concentration family) + PUBLISHED-ANCHOR (Banks–Ford–Tao §5's five-checkpoint
programme, with Azuma on a normalised prime-indexed martingale, as the owning
convention's own answer to this exact question) + CLOSURE (the whole
worst-case/typical-effect concentration family at once: McDiarmid, Azuma,
Talagrand, Warnke, Kutin, Kim–Vu, Bruhn–Joos).

**Not banked, and the row should not claim it:** the DERIVED-CONSTANT the row's
payoff column promises. `c` is now priced, but a price that kills a route is a
wall address, not a derived constant.

**One optional confirmation, pre-registered in full. Cost: 1 h. Recommendation:
run it only if the orchestrator wants the closure to rest on a committed
artifact rather than on a scratchpad check.**

- **Producer.** A new `research/import-talagrand-01-price-c.js`, computing for
  `x ∈ {11, 13, 17, 19, 23}` — and `29` if it fits the hour — the four exact
  quantities `N`, `d(q) = max_a #{r ∈ N_x : r ≡ a or a−2 (mod q)}` over all
  scour primes, `Π = ∏_{x<q≤y}(1−2/q)`, and `μ_{q₁}`.
- **Sealed predictions, fixed before the run.** (i) `𝔼[S] = N·Π` reproduces
  `paper/anchored-note.md` §2 to the published digits at all five levels — this
  is the calibration and its failure invalidates the run. (ii)
  `d(q₁)/(2N/q₁) ∈ [1.00, 1.10]` at every level. (iii) `d` is maximised at
  `q = q₁` at every level. (iv) `d(q₁)/c*` lies within 5% of
  174 / 619 / 3,133 / 14,608 / 70,576 and is monotone increasing. (v) the
  Lemma-9 exponent `𝔼[S]²/(8μ_{q₁}𝔼[K])` lies within 5% of
  0.532 / 0.416 / 0.297 / 0.258 / 0.244 and is monotone **decreasing**.
- **Kill criterion for the closure, stated so it can fire against me.** The
  closure is WRONG if either the Lemma-9 exponent exceeds 1 at any level, or it
  is non-decreasing across the five levels. Either outcome reopens the row and
  the correct next step is then Bruhn–Joos Lemma 9 with an explicitly
  constructed `Ω*`, together with Lemma 11's `ℙ[Ω*] ≪ N⁻²` requirement.
- **What would still not follow even if the criterion failed.** §6 stands
  independently: an ensemble bound of any strength is inert on the anchored
  member. The experiment can reopen the mathematics; it cannot reopen the target.

**Nothing here needs a source that was not reached**, with two exceptions, both
recorded on their own lines above: the Molloy–Reed theorem number (still
unknown, and still exactly as `import-map-construction.md` §3 flagged), and
`OBSERVATIONS.md` §2's open cut-and-project prior-art check, which needs a
search budget this session did not have.

---

## 10. Proposed edits elsewhere, for the orchestrator

None of these was made; the write scope for this recon was this file alone.

1. **`research/IMPORT-MAP.md` row 7, status column.** UNTRIED → LANDED
   2026-08-20, closed with mechanism; payoff banked WALL-ADDRESS +
   PUBLISHED-ANCHOR + CLOSURE; the DERIVED-CONSTANT claim withdrawn.
2. **`research/IMPORT-MAP.md` row 7, theorem column.** The certifiable-function
   corollary moves from "[SOURCED, verbatim via a citing paper]" to "[SOURCED,
   verbatim, Bruhn–Joos arXiv:1504.02583 Thm 8, p. 14, read as an image]", and
   Talagrand's convex distance inequality itself from [SOURCED-BIB] to the same
   grade via their Theorem 10, p. 16. The Molloy–Reed theorem number stays
   unknown.
3. **`research/IMPORT-MAP.md` row 7, circularity column.** CLEAN is defensible
   only for the `c`-pricing payoff; the `ρ` target is TPC-STRENGTH. Either
   split the cell or drop `ρ` from the target column.
4. **`research/IMPORT-MAP.md` §3 row 7 paragraph.** "the survivor deficit … is
   exactly a certifiable statistic" should read "the count of **struck** slots",
   per §2 — the shortfall `𝔼[S] − S` is not certifiable.
5. **`research/IMPORT-MAP.md` §2 counts line.** Thirteen live rows, and the
   counts of EXACT-IDENTITY / STRONG-ANALOGY and of payoff types, need
   recomputing after this row's regrade.
6. **`research/REFUTED.md`.** One line: the concentration-on-product-spaces
   route, CLOSED with mechanism, pointing here.
7. **`research/SEARCH-CONVENTIONS.md` §1.** Two proposed rows. (a) *object*:
   concentration of the survivor count over the one-class-per-prime ensemble;
   *owning convention*: the five-checkpoint programme of Banks–Ford–Tao
   arXiv:1908.08613 §5 — Buchstab plus an upper-bound sieve for `p ≈ log x`,
   Bennett plus Montgomery's large sieve, Azuma on the normalised
   prime-indexed martingale `Θ⁻¹_{w,p_j}S_{p_j}`, then combinatorial expansion;
   and the note that Talagrand appears in none of the four owning papers.
   (b) *object*: `maxsum_m − minsum_m`; *owning convention*: **balance
   function**, **`C`-balanced word**, **abelian complexity** — with the warning
   that the power-law-exponent theory needs a primitive substitution on a fixed
   alphabet, which `OBSERVATIONS.md` §2 records this object as not having.
8. **`research/PRIOR-ART.md`, the Banks–Ford–Tao entry.** Add §5's structure.
   The entry currently records only their model `R` and their §1.7 Open
   Problem (3).
9. **`research/history/staging/import-suen.md`'s sweep line.** "Chebyshev /
   Hoeffding / Bennett plus the Rödl nibble" understates it: Azuma on a
   normalised martingale and a five-checkpoint range decomposition are the
   structure, and "Hoeffding" is a single aside in that paper. History file, so
   this is a note for the next writer rather than an edit.
10. **`paper/anchored-note.md` §2**, the refutation paragraph that names
    McDiarmid. If §9's optional experiment runs and commits an artifact, that
    paragraph can name the whole family instead of one member. Not before.
11. **The scratchpad check behind §4's table** has no home. If the orchestrator
    wants the numbers citable, §9's producer is where they belong; until
    then no body document should cite them.

---

## §9 OUTCOME: the confirmation ran, 2026-08-20

*(Appended after the fact. Nothing above this line was touched. §9 is the
pre-registration and it has to stay readable exactly as it was sealed, or the
scoring below is worth nothing.)*

**Producer.**
[`../../import-talagrand-01-price-c.js`](../../import-talagrand-01-price-c.js),
with its output bound by `research/qc/embed.js` rather than pasted:

| field | value |
|---|---|
| invocation | `node --max-old-space-size=8192 research/import-talagrand-01-price-c.js` |
| `code-sha256` | `78cf15ab5cf80a48449c0f04df0b431868be31aa8d10f149ad50b738f9d98fb9` |
| `out-sha256` | `0d4d1245a2da4ac8250139402d1bfb55ccc4ea10663f151357b9281f6abababe` |
| streams / node / embedded | stdout / v22.21.0 / 2026-08-20 |
| elapsed | 401.2 s, against the 1 h §9 priced |

Two custody properties are worth naming, because they are what make this a
scoring rather than a retelling. **The five sealed predictions are not typed
into the producer.** It parses them back out of §9 above at run time — the band
`[1.00, 1.10]`, the two five-number sequences, the formula
`𝔼[S]²/(8μ_{q₁}𝔼[K])`, the kill criterion — and aborts if this record does not
carry them, so the scorecard cannot drift from the claim it scores. **The
published `𝔼[S]` digits are read out of `paper/anchored-note.md` §2** and
compared, never recomputed by a second route; a calibration whose target is
re-derived is not a calibration.

**Scope run.** `d(q)` was computed exactly, for **every** scour prime and not a
sample, at `x ∈ {11, 13, 17, 19, 23, 29}` — 10,201 scour primes in total, and
`@29` is §9's "if it fits the hour" level, which fit. Levels 31 and 37 carry the
closed-form quantities only, which is enough for the exponent series and is
labelled as such in the output.

### The scorecard: 4 of 5 confirmed, 1 refuted

| # | sealed prediction | verdict | measured |
|---|---|---|---|
| (i) | `𝔼[S] = N·Π` reproduces anchored-note §2 to the published digits at all five levels | **PASS** | every digit at all five, and at `@7`, `@29`, `@31`, `@37` besides; relative differences 4.4e−4 down to −3.9e−12, all of them the published rounding |
| (ii) | `d(q₁)/(2N/q₁) ∈ [1.00, 1.10]` at every level | **FAIL** | 1.1556 at `@11`, outside the band; 1.0303, 1.0063, 1.0006, 1.0000 at the other four, and 1.0000 at `@29` |
| (iii) | `d` is maximised at `q = q₁` at every level | **PASS** | argmax `= q₁` at all six computed levels, over all 10,201 scour primes |
| (iv) | `d(q₁)/c*` within 5% of 174 / 619 / 3,133 / 14,608 / 70,576, monotone increasing | **PASS** | 174, 620, 3,133, 14,608, 70,575; worst miss 0.10%; increasing |
| (v) | exponent within 5% of 0.532 / 0.416 / 0.297 / 0.258 / 0.244, monotone decreasing | **PASS** | 0.5323, 0.4160, 0.2972, 0.2578, 0.2437; worst miss 0.12%; decreasing |

**The calibration passed first, so the run is valid on its own terms.** §9 made
(i) the licence and said its failure invalidates everything; the producer scores
it before anything else and exits non-zero if it misses.

**The one failure, and which way it cuts.** (ii) is out of band at `@11` and
nowhere else. The cause is granularity, not structure: the whole comb at `@11`
is 90 slots and `q₁ = 13` sorts them into thirteen classes, so one surplus slot
in each of the two classes `q₁` pairs lifts `d(q₁)` to 16 against a mean
`2N/q₁` of 13.8. The band was read off the deep levels and then asserted "at
every level", and the shallowest level does not obey it. **The miss is upward**,
which means the true worst-case coordinate effect there is further out of
Theorem 8's reach than the sealed band claimed, not nearer: the prediction
failed in the direction that strengthens the conclusion it was registered to
test. Scored as written, it is a FAIL, and §4's arithmetic is unaffected because
`d(q₁)` there was already the exact enumerated value, not the mean.

**What the run adds beyond the seal.** `d(q₁) = 9,234,811` at `@29`, still
maximised at `q₁`; `d(q₁)/c*` continues to 447,615, a larger step than any
before it, which is what a ratio growing like `√N` against a decaying `Π`
should do; and the exponent continues 0.1975 at `@29`, 0.1881 at `@31`, 0.1682
at `@37`. §4's closed form `q₁Π/16` sits at 0.3546 against an exact 0.5323 at
`@11` and at 0.1654 against an exact 0.1682 at `@37` — a third low at the
shallow end, within two percent at the deep end. §4 flagged its own asymptotic
as "an asymptotic reading of five measured points, and five points are not a
series". There are eight points now, the sequence is still falling, and the
closed form converges onto it from below.

### The kill criterion: it did not fire

§9 put the closure at risk on two conditions, either sufficient to reopen the
row.

| condition | result |
|---|---|
| Lemma-9 exponent `> 1` at any level | **no** — the largest anywhere is 0.5323, at the shallowest level `@11` |
| exponent non-decreasing across the five levels | **no** — strictly decreasing, 0.532 > 0.416 > 0.297 > 0.258 > 0.244, and strictly decreasing across all eight computed levels |

**VERDICT: the closure stands. Row 7 stays CLOSED WITH MECHANISM.** What this
run changes is custody, not verdict. §4's table was a scratchpad check, §10 item
11 said it "has no home", and no body document was permitted to cite it. It is
now an embedded artifact with four of five sealed predictions confirmed and the
fifth refuted in the direction that hardens the closure.

### What is still not established, and it is §9's own list

1. **The target is untouched.** No outcome here could have reopened the second
   named target: an ensemble bound of any strength is inert on the anchored
   member, and §6 carries that argument alone.
2. **The exponent is measured, not proven asymptotic.** Eight decreasing points
   and a closed form converging onto them are evidence for `≍ ln²x/x`, not a
   proof that the sequence never levels off past `@37`.
3. **Everything is priced at `ℓ = 1`**, the smallest rate Theorem 8 admits and
   the one §2 derived for the struck-slot count. A larger `ℓ` makes both failure
   modes worse, so `ℓ = 1` is the route's best case and the right place to have
   killed it.

### Consequences for §10, still proposals and still not made

The write scope of this pass was the producer and this block, so nothing in
§10's list was executed. Two of its items change state, though:

- **Item 11 is discharged.** The scratchpad numbers now have a home, and body
  documents may cite `import-talagrand-01-price-c.js` for them.
- **Item 10's condition is met.** It said `paper/anchored-note.md` §2's
  McDiarmid paragraph could name the whole concentration family "if §9's
  optional experiment runs and commits an artifact. Not before." It has run and
  the artifact is committed alongside this block.

Items 1 to 9 stand exactly as written, with one amendment: item 1's status line
should record that the confirmation ran and that the closure was tested against
a criterion capable of firing against it.
