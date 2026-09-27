# Wu 2004 at page level: what `H_θ(2)` actually is, and what the source does and does not say about `θ → 1`

<!-- ledger
id: Q-lit-wu2004
status: ANSWERED
todo: none
question: What is H_theta(2) in Wu 2004, and what does the source say about theta approaching 1?
verdict: The source does not answer it: Wu never parameterises H by a level of distribution at all, so the theta to 1 reading is not in the paper; three defects follow in what attack-lichtman-decomp.md quotes, one of them a wrong inference built on a wrong table row, and the only proven cap is H <= 1.
-->

*(2026-08-27. Staging note. Literature assignment, single deliverable. **No existing
repo file was edited, moved or deleted; no git command was run; no producer was
written and `qc.js` was not run** — the brief permitted exactly one new file, and
running the gate risks writing to the ledgers, so this note is deliberately
outside the gate and must not be quoted from any gated document until someone
with write access re-derives its arithmetic inside an embedded producer.)*

*(Every number below is either **quoted from a page image of a fetched artifact**,
or is hand arithmetic on such quotes, marked `[SCRATCHPAD-GRADE]` with its
inputs and the session script that produced it. The script lives in the session
scratchpad, is not in the repo, is not embedded, is not `qc`-gated.)*

---

## Provenance: exactly what was reached, and how

| artifact | route | sha256 | what was read |
|---|---|---|---|
| **Wu, *Chen's double sieve, Goldbach's conjecture and the twin prime problem*, Acta Arith. **114** (2004) 215–273; arXiv:**0705.1652**v1** | `https://arxiv.org/pdf/0705.1652`, HTTP 200, 373 548 bytes, 48 pp | `41d432dd63da6d1fe7836ba3beda8b601ce6e64420e50501d26d79f7d971043e` | **[SOURCED]** full `pdftotext -layout` extraction of all 48 pp, **plus rendered 200 dpi page images of pp. 9, 22, 26 and 32 read directly**. Every constant and every fraction quoted below was confirmed on the page image, not on the extraction |
| Lichtman, *A modification of the linear sieve, and the count of twin primes*, ANT **19**:1 (2025) 1–36 | `msp.org/ant/2025/19-1/ant-v19-n1-p01-p.pdf`, HTTP 200 | `1b64fc36e8a73993ae221505b8c87e27f6c9d01679efc15ee4b8aedf0a85327c` — **byte-identical to the hash `attack-lichtman-decomp.md` §1 recorded**, so this note and that one read the same object | **[SOURCED]** §6.3 pp. 35–37 in extraction (Lemma 6.4, the two `H` step-functions, the closing paragraph) |
| Wu, *Chen's double sieve … , 2*, Acta Arith. **131**:4 (2008) 367–387; arXiv:**0709.3764**v1 | `arxiv.org/pdf/0709.3764`, HTTP 200 | not hashed | **[SOURCED]** extraction; Table 1 (`H(s_i)`, 29 rows to `s = 4.9`) and Table 2 (`h(s_i)`) read |
| Runbo Li, *On Chen's theorem, Goldbach's conjecture and almost prime twins II*, arXiv:**2405.05727**v4 (2025-05-31) | `arxiv.org/pdf/2405.05727`, HTTP 200 | not hashed | **[SOURCED]** extraction; the `H_ϑ ⩾ H_{1/2}` remark and its `H` table |
| Pascadi, arXiv:**2505.00653**v2 | `arxiv.org/pdf/2505.00653`, HTTP 200 | not hashed | **[SOURCED]** extraction; proof of Corollary 1.4 (the 3.20254 twin bound) |

**Journal-of-record caveat.** The **published** Acta Arith. 114 (2004) 215–273 was
**NOT reached** — no publisher page, no MathSciNet, no zbMATH flip was run this
session. What was read is the author's arXiv deposit of 2007-05-11, whose own
first line prints `Acta Arithmetica 114 (2004), 215–273`. Its internal
pagination runs 1–48, and Lichtman's citation *"Tables 1 and 2 of [Wu 2004,
pages 30–32]"* lands on Table 1 (p. 30) and Table 2 (p. 32) of **this**
pagination, so Lichtman is citing the preprint's page numbers and this note
inherits that convention. Any statement here of the form "Wu p. 32" means
**arXiv:0705.1652v1 p. 32**, not Acta Arith. p. 246.

**The `𝔖 → 5` gotcha the brief warned about did not bite here** (Wu writes
`Θ(N)` and `Π(x)`, no Fraktur), **but a sibling of it did, and it flipped a
sign of reasoning.** `pdftotext -layout` renders Wu's stacked fractions with the
digits in an order that cannot be trusted: p. 32's sentence extracts as
*"replace the factor 52 before the sum by 207"*, which reads as `5/2 → 20/7` and
would mean the switching loss **grows** with `θ`. **The page image says
`2/5 → 7/20`**, which means it **shrinks**. Every fraction in §2 below was
re-read on the image for this reason.

---

## §0. The decisive question, answered first, with the disconfirming half in front

> **Does `H_θ(2)` stay bounded as `θ → 1`, or does it grow toward 1/2?**

**The source does not answer it. [SOURCED — this is a statement about what is
absent from a document read in full.]** Wu 2004 never parameterises `H` by a
level of distribution at all. He writes one symbol `H(s)`, defines it once
(p. 9) against a level `Q` that is fixed before the definition, and instantiates
it at exactly **two** levels: `Q = N^{1/2−δ}` for Goldbach (§§3–7) and
`Q = x^{4/7−δ}` for twins (§8). The strings `Elliott`, `Halberstam` **as a
conjecture**, and any discussion of a conjectural level are **absent from all
48 pages** (`Elliott` 0 hits; `Halberstam` 3 hits, all "Halberstam & Richert" —
two historical sentences on p. 3 and the *Sieve Methods* bibliography entry).
His only forward
sentence about levels is the opposite of hopeful, p. 2, verbatim:

> "Secondly it is hopeless to try to improve the level of distribution `1/2` in
> Bombieri–Vinogradov's theorem."

**No `θ → 1` limit, no bound on `H_θ`, no asymptotic, nowhere.** An honest "the
source does not answer this" is the deliverable here, and it is the deliverable.

**What the derivation does show, which is the closest thing to an answer that
exists in print. [SOURCED for the structure; my inference for the θ-law, marked
below]** The level enters Wu's whole machine at **exactly one place**, and he
says so himself in one sentence (p. 32, page image):

> "As before, we can prove the corresponding Propositions 3 and 4 with the
> following modification: In the definition of `Ψ₁(s)` we add a factor `7/8`
> before `I₁(s)`, and in the definition of `Ψ₂(s)` we replace the factor `2/5`
> before the sum by `7/20`."

`I₁` and `Σ_{i=9}^{21} I_{2,i}` are the **switching-loss integrals**, and they
are the only θ-carrying objects. The recurrence kernels `Ξ₁`, `Ξ₂` (pp. 14–15)
and every other term of `Ψ₁`, `Ψ₂` (pp. 22, 26) are level-free. `7/8 =
(1/2)/(4/7)` and `7/20 = (2/5)·(7/8)`, so **both modifications are the same
scalar `m = (1/2)/θ` applied to the loss terms. [ARITHMETIC on two quoted
fractions; that `m = (1/2)/θ` in general is MY INFERENCE from two instances,
not Wu's statement — see §3 item 3]**

Consequences, and each is calibrated separately:

1. **`H_θ` is a decreasing affine function of `m` for fixed parameter choices,
   because the fixed-point system is linear in `Ψ` with a θ-free matrix.**
   Wu solves `(I − A)X = B` (p. 31) where `A` is built from `Ξ` alone and `B`
   is the vector of `Ψ`; `Ψ = P − m·J` with `P`, `J ⩾ 0` level-free.
   **[DERIVED here from Wu's own §7 linear algebra; not stated by Wu.]** Since
   `s′_i, κ_{j,i}` are re-optimised per level (Table 1 vs Table 2 differ), the
   true `H_θ` is a **supremum of such affine functions**, hence convex and
   non-increasing in `m` — still nothing that diverges.
2. **Nothing in the structure grows as `θ → 1`.** `m` runs `1 → 7/8 → 1/2` over
   `θ = 1/2 → 4/7 → 1`. The whole remaining travel in the mechanism from the
   published record to Elliott–Halberstam is **smaller than a factor 2 on one
   subtracted term.** **[SOURCED structure + inferred θ-law.]**
3. **Numerically, the two published points extrapolate to ≈ 4.8% at `θ = 1`.**
   `[SCRATCHPAD-GRADE]`, session script `wu-extrap.js`, inputs `H(2.2) ⩾
   0.0223939` at `m = 1` and `H(2.1) ⩾ 0.0287118` at `m = 7/8`, both read on
   page images: affine fit `H = 0.0729371 − 0.0505432·m` gives
   `H_1 ≈ 0.0476655`, i.e. `2(1 − H_1) ≈ 1.9047`. The model's ceiling at
   `m = 0` (a fantasy of unlimited level) is `H ≈ 0.0729`, i.e. `2(1 − H) ≈
   1.854`. **HEURISTIC: two data points, one free parameter, at two different
   arguments (2.2 and 2.1) with re-optimised `s′, κ`, and on an inferred θ-law.
   This is a calibration, not an estimate.**

**So the verdict the corpus should carry: bounded, on the mechanism, at roughly
4–8% — but this is HEURISTIC and the source proves nothing of the kind.** The
only cap that is actually *proven* anywhere is the trivial one: `Φ ⩾ 0` forces
`H_θ(s) ⩽ A(s) = 1` for `s ∈ [1,3]`, which does not exclude 50%.
**[ARITHMETIC on Wu's p. 9 definition.]** **Nobody has proved `H_θ(2) < 1/2`,
and nobody has tried.** What is true is that no term in Wu's construction has
any capacity to grow, and that the field's own instrument for pushing it —
a better weighted inequality, not a better level — is the one Wu names (§3
item 5).

**This does not open a route.** It closes the hoped-for one: the route required
`H` to grow with `θ` toward 50%, and Wu's derivation exhibits `θ` entering as a
bounded multiplier on a subtracted loss. **CONJECTURED-to-HEURISTIC that this
is a permanent floor near 3–8%; not proven, and the falsifier is stated in §4.**

---

## §1. The source, and the dictionary

### 1.1 Wu's definition, verbatim from the page image, p. 9

> Let `δ > 0` be a sufficiently small number and `k ∈ ℤ`. Put
> `Q := N^{1/2−δ}`, `d̲ := Q/d`, `L := log N`, `W_k := N^{δ^{1+k}}`.
>
> […] `A(s) := sF(s)/2e^γ` and `a(s) := sf(s)/2e^γ`
>
> `Φ(N, σ, s) := Σ_d σ(d) S(A_d; P(dN), d̲^{1/s})`,
> `Θ(N, σ) := 4 li(N) Σ_d σ(d)C_{dN}/(φ(d) log d̲)`
>
> For `k ∈ ℤ⁺`, `N₀ ⩾ 2` and `s ∈ [1,10]`, we define `H_{k,N₀}(s)` and
> `h_{k,N₀}(s)` as the supremum of `h ⩾ −∞` such that for all `N ⩾ N₀` and
> `σ ∈ 𝔘_k(N)` one has the following inequalities
> `Φ(N, σ, s) ⩽ {A(s) − h} Θ(N, σ)` and `Φ(N, σ, s) ⩾ {a(s) + h} Θ(N, σ)`
> respectively.

and then `H(s) := lim_{k→∞} lim_{N₀→∞} H_{k,N₀}(s)`.

Two things fall out of the definition and are worth stating flatly.

- **`H` is a deficit below `A(s) = sF(s)/2e^γ`, and `A(s) = 1` on `[1,3]`**
  because `F(s) = 2e^γ/s` there. So `H(s)` is literally *the fraction by which
  the linear upper sieve is beaten*, which is exactly the corpus's reading of it
  as a permeability. **[PROVEN from the definition, given `F(s) = 2e^γ/s` on
  `[1,3]`, which Wu's Lemma 2.2 supplies.]**
- **The level `Q` is baked into the definition** through `d̲ = Q/d` (the sieving
  bound) and through `log d̲` (the normaliser in `Θ`), and through `𝔘_k(N)`,
  whose members satisfy `V₁⋯V_{i−1}V_i² ⩽ Q` (3.1). **There is no `θ` symbol.**
  Wu's `θ` (p. 4) is something else entirely — the **short-interval exponent**
  in `π_{1,2}(x, θ) := |{x ⩽ p ⩽ x + x^θ : Ω(p+2) ⩽ 2}|` — and any grep for
  `θ` in this paper lands on that, not on a level of distribution. **This is a
  live trap for the next reader.** **[SOURCED, p. 4.]**

### 1.2 The dictionary

| corpus / Lichtman | Wu 2004 | evidence |
|---|---|---|
| `H_θ(s)` | `H(s)`, defined at `Q = N^{θ−δ}` | Lichtman p. 36: *"The function `H_θ` depends on the known level of distribution `x^θ` (i.e., Wu used `θ = 1/2` for Goldbach, and `θ = 4/7` for twin primes)."* **[SOURCED]** |
| `H_{1/2}(t)` step function, 9 rows | Wu Table 1 (p. 30) + the solution vector `X` (p. 31) | Lichtman p. 36 prints exactly Wu's nine values `0.0223939 … 0.0072943` |
| `H_{4/7}(t)` step function, 10 rows | Wu Table 2 (p. 32) + the analogous vector | same |
| argument `s` | `s = log d̲ / log z`, i.e. **normalised to the LEVEL**, not to `x^{1/2}` | Lichtman (6-23): *"where `z^s = x^θ/p₁p₂`"* **[SOURCED]** |
| `(2/θ)(1 − H_θ(s))` | `Φ ⩽ {A(s) − H(s)}Θ`, with `Θ = (2/θ)Π(x)` at `σ = {1}` | `[SCRATCHPAD-GRADE ARITHMETIC]`: `4li(x)(C/2)/log(x^θ) = (2/θ)Π(x)`; reproduces Wu's `8(1 − 0.0223938)Θ(N) ⩽ 7.82085Θ(N)` at `θ = 1/2` and `3.5(1 − 0.0287117)Π(x) ⩽ 3.39951Π(x)` at `θ = 4/7`, both to the printed digit |
| "the parity permeability" | no counterpart; Wu has no name for it | Lichtman p. 36 calls it *"the percent savings over the (normalized) linear sieve `sF(s)/(2e^γ)`"* **[SOURCED]**. **The owning convention for a literature search is `savings function` / `Chen's double sieve` / `weighted sieve inequality`, per `research/SEARCH-CONVENTIONS.md`'s standing rule; "permeability" is a house term and returns nothing** |

**One reading trap inside Wu, flagged because it cost time.** Wu's final display,
p. 32, prints

> `π₂(x) ⩽ S(B; P(2), x^{(1/2−δ)/2.1}) ⩽ 3.5(1 − 0.0287117) Π(x) ⩽ 3.39951 Π(x)`

The exponent `(1/2−δ)/2.1` is **inconsistent with his own §3 definition**, which
gives `z = d̲^{1/s} = x^{(4/7−δ)/2.1}` once `Q := x^{4/7−δ}` is taken.
Lichtman's `z^s = x^θ/p₁p₂` sides with the definition. **The printed constant is
unaffected**, because `F(s) = 2e^γ/s` makes `X·V(z)·F(log Q/log z)` equal to
`(2/θ)Π(x)` for every admissible `z` — both readings give 3.5.
**[ARITHMETIC, SCRATCHPAD-GRADE; the identification of the slip is MY inference,
not something Wu or Lichtman says.]**

---

## §2. The derivation as read

### 2.1 The recurrence, quoted (Propositions 3 and 4, pp. 14–15)

> **Proposition 3.** For `5 ⩾ s′ ⩾ 3 ⩾ s ⩾ 2` and `s′ − s′/s ⩾ 2`, we have
> `H(s) ⩾ Ψ₁(s) + ∫₁³ H(t) Ξ₁(t; s) dt`, where `Ψ₁(s)` is defined as in
> Lemma 5.1 below and `Ξ₁(t; s) = Ξ₁(t; s, s′)` is given by
> `Ξ₁(t;s) := (σ₀(t)/2t)·log(16/((s−1)(s′−1))) + (1_{[α₂,3]}(t)/2t)·log((t+1)²/((s−1)(s′−1))) + (1_{[α₃,α₂]}(t)/2t)·log((t+1)/((s−1)(s′−1−t)))`
>
> **Proposition 4.** […] `H(s) ⩾ Ψ₂(s) + ∫₁³ H(t) Ξ₂(t; s) dt`, where `Ψ₂(s)`
> is defined as in Lemma 5.2 below, and `Ξ₂(t; s) = Ξ₂(t; s, s′, κ₁, κ₂, κ₃)` is
> given by [ten terms, all of the same shape, with `5t` denominators]

**This is the object the brief asked for.** `H` is not given in closed form
anywhere; Wu says so, p. 30: *"It seems very difficult to give the exact
solutions, because we only know that `H(s)` is decreasing."* The numbers are
obtained by discretising: `s_i := 2 + 0.1×(i+1)`, `i = 1,…,9`, giving a `9×9`
linear system `(I − A)H ⩾ B` solved in Maple. **[SOURCED, pp. 30–31, page
image of p. 32 for the twin table.]**

### 2.2 Where the level enters, quoted (Lemma 5.1, p. 22, page image)

> `Ψ₁(s) := −∫₂^{s′−1} (log(t−1)/t) dt + (1/2)∫_{1−1/s}^{1−1/s′} (log(s′t−1)/(t(1−t))) dt − I₁(s)`
>
> and `I₁(s) = I₁(s, s′)` is given by
> `I₁(s) := max_{φ⩾2} ∭_{1/s′ ⩽ t ⩽ u ⩽ v ⩽ 1/s} ω((φ−t−u−v)/u) · dt du dv/(t u² v)`

and (Lemma 5.2, p. 26, page image) `Ψ₂` ends in `− (2/5) Σ_{i=9}^{21} I_{2,i}(s)`,
with all thirteen `I_{2,i}` of the same `max_{φ⩾2} ∫ ω(·)` shape over explicit
simplices `𝔻_{2,i}`.

`I₁` and the `I_{2,i}` are the **switching-principle** terms: they price the
count of primes in the switched set `B := {b = N − e p₃ : e ∈ E, p₂ < p₃ ⩽
κ(d,e)}` (p. 23), and the Buchstab factor `ω(log(N/dp₁p₂p₃)/log p₂)` is what
becomes `ω((φ−t−u−v)/u)` after `p_i = d̲^{t_i}` (p. 25). **[SOURCED.]**

**So the θ-dependence Wu states is a scalar on the switching loss, and nothing
else.** Both his p. 32 modifications multiply exactly these terms by `7/8`.

### 2.3 The two computed values, verified on the page image

| level | Wu's statement | page |
|---|---|---|
| `Q = N^{1/2−δ}` | `H(2.2) ⩾ 0.0223939`, and `D(N) ⩽ 8(1 − 0.0223938)Θ(N) ⩽ 7.82085 Θ(N)` | p. 31 |
| `Q = x^{4/7−δ}` | **`H(2.1) ⩾ 0.0287118`**, and `π₂(x) ⩽ 3.5(1 − 0.0287117)Π(x) ⩽ 3.39951 Π(x)` | **p. 32, read on the 200 dpi image** |

`[SCRATCHPAD-GRADE ARITHMETIC]` `3.5 × (1 − 0.0287117) = 3.399509` and
`8 × (1 − 0.0223938) = 7.820850`, both reproducing the printed constants exactly.

**Verdict on deliverable 3: the value `0.0287118` is VERIFIED at source, and
three things about how the corpus carries it are wrong.** See §4.1.

### 2.4 What Wu says about improving it

Remark 2, p. 32 (page image), in the Goldbach case:

> "The constant `s₁ = 2.2` comes from the fact that `Ψ₂(s)` attains the maximal
> value at `s = s₁` (approximately). Since `H(s)` is decreasing on `[1, 10]`, we
> have `H(2.1) ⩾ 0.0223939`. In order to obtain a better lower (which leads to a
> smaller constant than 7.82085), **we must look for a new weighted inequality**
> (as in Lemma 4.1 and 4.2) such that the corresponding main term `Ψ(2.1)` has a
> lager lower bound than 0.015826357.
> (ii) If we divide the interval `[2,3]` into more subintervals than 9, it is
> certain that we can obtain a better result. **But the improvement is very
> minuscule.**"

**[SOURCED.]** This is the author's own statement of where the slack is: not in
the discretisation, and — pointedly — **not in the level either**. In a new
weighted inequality.

---

## §3. What is NOT in the source

Stated flatly, because each of these is a place where an inference could be
mistaken for a reading.

1. **No `θ`-parameterised `H`.** Wu writes `H(s)`. The subscript `H_θ` is
   **Lichtman's**, introduced in his Lemma 6.4 (p. 35), and it is Lichtman —
   not Wu — who asserts the family exists for all `θ ∈ [1/2, 1)` and is
   *"monotonically increasing in `θ` for fixed `s`."* His justification is one
   clause: *"the savings function `H_θ(s)` inherits the stated monotonicity
   properties by construction of the iteration."* **[SOURCED. This is the best
   in-print statement of the θ-behaviour and it carries no bound.]**
2. **No Elliott–Halberstam, and no conditional anything.** Zero occurrences
   across 48 pages.
3. **No general formula for the level-multiplier.** Wu gives `7/8` and `7/20`
   for one level. That `m(θ) = (1/2)/θ` is **MY INFERENCE** from `7/8 =
   (1/2)/(4/7)`. It is the only simple law fitting both fractions
   (`2(1−θ)` and `(3/2−θ)` both fail at `θ = 4/7`), and it is what the
   normalisation of the switched count against `log d̲ = θ log x` would predict,
   but **I did not verify it inside the proof of Lemma 5.1** and Wu does not
   state it.
4. **An unresolved reading question that I could not settle, recorded so nobody
   assumes it away.** Every `I` integral carries `max_{φ⩾2}`. Tracing `φ` back
   through p. 25, `φ = log(N/d)/log d̲` with `d̲ = Q/d`, and at `Q = N^{1/2−δ}`
   its range is exactly `φ ⩾ 2`. At `Q = x^{4/7−δ}` the same computation gives
   `φ ⩾ 7/4`, a **strictly larger** range, over which the max can only be
   larger. Wu's p. 32 modification list does not mention it. Either `φ`'s range
   is not what I traced, or the sup is attained at `φ ⩾ 2` anyway, or §8 has a
   second unstated modification. **I did not resolve this and it is MY
   INFERENCE, not a claim about Wu's paper.** Direction of the effect if it is
   real: `H_θ` would grow **more slowly** in `θ` than the `7/8` multiplier alone
   predicts, which sharpens §0's answer rather than softening it.
5. **No upper bound on `H`, of any kind, at any level.** The only cap available
   is `H(s) ⩽ A(s) = 1`, from `Φ ⩾ 0`. Pairing the two halves of the definition
   gives `H(s) + h(s) ⩽ A(s) − a(s) = 1 − log(s−1)`, which at `s = 2` reads
   `H(2) ⩽ 1 − h(2) ⩽ 0.9768` using `h(2.0) ⩾ 0.0232385` from Wu II's Table 2.
   **[ARITHMETIC on two quoted definitions.]** Both are far above the 1/2 the
   certificate needs, so **neither refutes the 50% target; the target is
   unrefuted and unreached at once.**
6. **The published Acta Arith. text.** Not reached (see Provenance).

### 3.1 Deliverable 4: has anyone gone above `θ = 4/7`, or conditioned on EH?

**No, on three independent sources, all read at source this session.** Recorded
with what was actually searched, per `research/SEARCH-CONVENTIONS.md`'s rule
that an absence must name its convention.

| who | what they do with `H_θ` | quote |
|---|---|---|
| **Lichtman 2025**, the record holder | proves Lemma 6.4 valid *"up to level `x^{7/12}`"*, then **declines to compute** and falls back to `θ = 4/7` | p. 36: *"For ease we also use `H_θ(s) ⩾ H_{4/7}(s)`, by monotonicity in `θ`."* And p. 37: *"For slight numerical gains, one may compute `H_θ(s)` when `θ ∈ (4/7, 7/12)`, by tweaking the formulae in [Wu 2004]. […] We leave these to the reader."* **[SOURCED]** |
| **Runbo Li 2025** (arXiv:2405.05727v4) | uses `H_{1/2}` and `h_{1/2}` throughout, higher `ϑ` only as an inequality | *"We remark that we have `H_ϑ(s) ⩾ H_{1/2}(s)` and `h_ϑ(s) ⩾ h_{1/2}(s)` for `ϑ > 1/2`."* **[SOURCED]** |
| **Pascadi 2025** (arXiv:2505.00653v2), the best unrefereed constant | gets `π₂(x) ⩽ 3.20254 Π₂(x)` by re-running **Lichtman's** sieve integrals with a better level; his own words: *"we have omitted various parameter optimizations for simplicity"* | **[SOURCED]**, proof of Cor. 1.4. He does not touch `H` |
| **Wu II 2008** (arXiv:0709.3764) | extends the `H` table to 29 rows, `s` up to 4.9 — **all at `θ = 1/2`**, the Goldbach level; the paper is about `D_{1,2}(N)` only | **[SOURCED]**, its Table 1 |

**So `H_θ` has been computed at exactly two levels since 1978, `1/2` and `4/7`,
and the highest value anyone has ever put in print is 2.87118%.** The
EH-conditional value **does not exist in print**, and the reason is now visible
and is not neglect: computing it requires re-deriving `I₁` and thirteen
`I_{2,i}` under a changed `φ`-range, and the field's own actors (Lichtman
explicitly, Li implicitly) judged even the `(4/7, 7/12)` window not worth the
work.

**Convention note.** These four are the papers that *use the object*, reached by
name-and-citation walking from Lichtman's bibliography — the method
`SEARCH-CONVENTIONS.md` §2 records as the highest-yield one. Two `WebSearch`
flips were run in the literature's convention (`Chen's double sieve`,
`savings function`, `switching principle`, `level of distribution`), channel
calibrated in-session on `Kourbatov maximal gaps between prime k-tuples arXiv
1301.2242` → returned arXiv:1301.2242. **No zbMATH or MathSciNet flip was run,
and no `Cai`, `Cai–Lu` or Chen 1978 primary was opened**, so the negative on
"nobody computed `H_θ` for `θ > 4/7`" is **strong for 2004–2025 and untested
against the 1978–2003 Chinese-language Chen-constant literature.** That
literature all sat at `θ = 1/2` or `θ = 4/7` by the chronology in
`attack-lichtman-decomp.md` §3.1, so the gap is narrow, but it is a gap.

---

## §4. What this does to `attack-lichtman-decomp.md`

That file is HELD, has never been red-teamed, and this note edits nothing.
Below is exactly what a future editor should change, and what survives.

### 4.1 §4.2 carries three defects, one of them a wrong inference built on a wrong table row

The file's §4.2 says:

> `H_{4/7}(2) = 0.0287118` … *"`3.5 × (1 − 0.0287118) = 3.399509`, exactly the
> published constant, whereas `3.5 × (1 − H_{4/7}(2.1)) = 3.5 × (1 − 0.0280509)
> = 3.401822` does not. So the intended argument is `t = 2.0` and the printed
> "(2.1)" is the band label, not the argument."*

**Defect 1 — the inference is wrong, and the source says so twice.** Wu p. 32
writes **`H(2.1) ⩾ 0.0287118`**: `2.1` *is* the argument. Lichtman p. 36 writes
*"Wu [2004, Theorem 3] obtained `π₂(x)/𝔖(x) ≲ (7/2)(1 − H_{4/7}(2.1)) ⩽
3.39951`"* — also `2.1`. **[SOURCED, both.]**

**Defect 2 — the disconfirming arithmetic used the wrong band.** Lichtman's step
function reads `H_{4/7}(t) ⩾ 0.0287118` **if `2.0 ⩽ t ⩽ 2.1`**, and
`0.0280509` **if `2.1 < t ⩽ 2.2`**. The value `0.0280509` therefore *excludes*
`t = 2.1`. The "contradiction" that motivated the band-label theory was an
off-by-one-band read. **[SOURCED, Lichtman p. 36.]**

**Defect 3 — it is `⩾`, not `=`, and 2004 did not "saturate" anything.** Wu's
number is a numerical **lower bound** on a functional inequality with no known
exact solution (*"It seems very difficult to give the exact solutions"*, p. 30),
obtained from a 10-point discretisation. `H_{4/7}(2.1)` may be larger than
0.0287118; nobody knows. The file's phrase *"converging onto the value of one
named function, which the 2004 paper then attains to five decimals"* reads the
ceiling into a floor.

**Proposed replacement text for §4.2's opening claim** (offered, not applied):

> `H_θ(s)` is Wu's savings function, and `H_{4/7}(2.1) ⩾ 0.0287118` is a
> **numerical lower bound** proved in Wu 2004 §8 (arXiv:0705.1652v1 p. 32) by
> discretising a functional inequality that has no known closed form. Wu's own
> constant is `(2/θ)(1 − H_θ(2.1))` at `θ = 4/7`, i.e. `3.5(1 − 0.0287117) ⩽
> 3.39951`. Because `H_θ` is decreasing in `s`, the same bound holds at every
> `s ∈ [2.0, 2.1]`, which is how Lichtman tabulates it. **The 2.87118% is a
> lower bound on the function, not its value, so "2004 saturated it" is not
> supported: what 2004 saturated is the chronology of published constants at
> `θ = 4/7`, which is a different statement.**

### 4.2 §6.1's third tier should be re-anchored, and its number barely moves

The file's tier-3 estimate extrapolates `H` **linearly in `θ`** through
`(1/2, 0.0223939)` and `(4/7, 0.0287118)`, giving `H_1(2) ≈ 0.0666` and a floor
`≈ 1.867`. The mechanism says the right variable is `1/θ`, because `θ` enters as
the multiplier `(1/2)/θ` on a subtracted term. Refitting in `1/θ` gives
`H_1(2) ≈ 0.0477` and a floor `≈ 1.905`. **[SCRATCHPAD-GRADE, `wu-extrap.js`.]**
**The number is unchanged to two significant figures and the conclusion is
unchanged.** What changes is that the extrapolation now has a mechanism under
it instead of being a two-point line, and the file's own falsifier row —
*"`H_1(2) ≈ 0.0666`, floor ≈ 1.867 … NOT RUN"* — can be upgraded from
"not run" to "**partially run: the source's θ-dependence has been located and it
is a bounded scalar; no third tabulated `H_θ` exists to test against, and none
is likely to be computed.**"

### 4.3 §9's top NOT-REACHED item is now reached, and its stated purpose is discharged

> *"**Wu, Acta Arith. 114 (2004) 215–273** (arXiv:0705.1652). … **This is the
> single highest-value unread item here** … because whether `H_θ(2)` is bounded
> as `θ → 1` is decided in Wu's recurrence, not in Lichtman."*

**Reached at page level. The recurrence does not decide it — it does not
address it.** What the recurrence gives is the location of the θ-dependence
(one scalar on the switching loss) and the fact that nothing in it can grow.
The row should be moved out of NOT-REACHED and rewritten to say that, with the
`θ → 1` question re-flagged as **open and unaddressed in the source**, not as
answered.

### 4.4 What survives untouched

- **`3.2995525 = (2e^{−γ})·F(2)·(1/θ)·(F*/F)·(1 − H_θ(2))`** as a decomposition.
  The `(2/θ)(1 − H_θ(s))` factor is confirmed against Wu's own two instances to
  the printed digit, at `θ = 1/2` and `θ = 4/7` (§1.2).
- **`β₂` contributes exactly zero.** Independently re-confirmed one layer
  further back, on Wu rather than on Lichtman. Across all 48 pages of the
  artifact hashed in §Provenance: `4.266` **0**, `sifting limit` **0**,
  `Diamond` **0**, `dimension` **0**, `Elliott` **0**, `beta` **0**.
  `Halberstam` occurs 3 times, all "Halberstam & Richert"; `β` occurs 7 times,
  every one of them a bilinear coefficient sequence `{β_n}` and none of them a
  sifting limit. **The two walls stay separated, and this note trades nothing
  between them.** **[VERIFIED by grep on the artifact of §Provenance, counts
  recorded above.]**
- **The 50% gap.** Best published permeability 2.87118% (Wu), best achieved
  credit 2.9543% (Lichtman), certificate requirement 50%, mechanism-based
  extrapolation to `θ = 1` roughly 4.8%. **Nothing moved toward 50%.**

### 4.5 Falsifiers, and whether each has been run

| claim | what would falsify it | run? |
|---|---|---|
| Wu's `H(2.1) ⩾ 0.0287118` at `θ = 4/7` | a different value on the page image | **run** — read at 200 dpi, p. 32 |
| `θ` enters Wu's machine only as a scalar on the `I`-terms | a second θ-dependent object in `Ψ` or `Ξ` | **partially run** — pp. 14–15, 22, 26 and 32 read; **the `φ ⩾ 2` range is the open item (§3 item 4) and it is NOT run** |
| Wu never addresses `θ → 1` | any occurrence of a conjectural level in the paper | **run** — grep over the full 48-page extraction, zero hits |
| nobody has computed `H_θ` for `θ > 4/7` | a computed table at any higher level | **run for 2004–2025** on the four papers that use the object; **NOT run** on zbMATH, MathSciNet, or the 1978–2003 Chen-constant literature |
| `H_1(2) ≈ 0.0477`, floor `≈ 1.905` | anyone actually computing `H_θ` at a third level | **NOT RUN, and unlikely ever to be** — Lichtman left even the `(4/7, 7/12)` window to the reader |
| `H_θ(2) < 1/2` for all `θ < 1` | — | **NOT RUN, and no proof of it exists.** The only proven cap is `H ⩽ 1`. This is the honest residual: the floor is a mechanism reading, not a theorem |

---

*History layer: process record, staging. See `research/history/CHANGELOG.md` for
the corpus rule. Nothing in this file has been through `qc.js` or `embed.js`.*
