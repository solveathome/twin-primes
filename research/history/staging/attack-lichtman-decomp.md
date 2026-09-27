# Decomposing the wall's published number: what 3.29956 is made of, and why category (b) is empty

<!-- ledger
id: Q-lichtman-decomp
status: ANSWERED
todo: none
question: What is the wall's published constant 3.29956 made of, and is there technique slack a method of this class could spend?
verdict: The split is multiplicative, 3.2995525 = 2 x 1.649776 with the second factor an equidistribution deficit, so the brief's "remaining 1.65 of technique" has no referent and category (b) is empty; the floor for this class is 2 on Type-I data and still 1.122919 at unlimited level, all arithmetic SCRATCHPAD-GRADE.
-->

*(2026-08-26. Staging note; nothing here is integrated into a live document and
no existing repo file was edited. No producer was written and none was run, so
**every number below is either quoted from an artifact read at source this
session, or is hand arithmetic on cited constants**, marked `[ARITHMETIC]` with
its inputs. Per the `quadpoint-prior-art.md` §2.2 precedent, the arithmetic is
**scratchpad-grade**: it was checked in a session script that lives in the
session scratchpad, is not embedded, is not `qc`-gated, and is not a repo
number. Nothing here may be quoted outside this file until it is re-derived
inside an embedded producer.)*

**UNVERIFIED PREMISE, flagged as the brief requires.**
`research/history/staging/quadpoint-prior-art.md` is HELD and has never been
red-teamed. Its §4.1 is the sentence under test: *"the best published constant
… is Lichtman 2025's `π₂(x) ≲ 3.299 56 𝔖(x)` — a factor `3.3` off, after 106
years."* This note does not lean on that file. The paper was fetched
independently, the sha256 matched, and the constant was read in its own
Theorem 1.2 and then **reproduced from the paper's own printed components**
(§2.3). That premise survives; the framing built on it does not, in three
places.

---

## 0. The verdict, disconfirming half first

**Four things the brief assumed that do not hold.**

1. **The split is multiplicative, not additive.** The brief's hypothesis —
   *"if the parity floor accounts for exactly 2 of the 3.29956 and the
   remaining 1.65 is technique"* — has no referent. The identity is
   `3.2995525 = 2 × 1.649776`, and the second factor is `1/θ_eff`, an
   equidistribution deficit, not a pile of technique that can be subtracted.
   There is no "remaining 1.65" anywhere in the chain. **[ARITHMETIC]**

2. **"Selberg's dimension-2 sieve gives ≈ 4 by the parity floor for
   dimension 2" is wrong twice.** Selberg's `Λ²` at dimension 2 gives **8**, and
   the dimension-2 value of the sieve function at the maximal accessible
   parameter is `F₂(2) = 2e^{2γ} = 6.344438`, reproducing that 8 exactly (§5).
   The **4** is Bombieri–Davenport 1966 and is a **dimension-1** bound, bought
   with Bombieri–Vinogradov on `A = {p+2 : p ⩽ x}`. The two numbers are in
   different sieve dimensions and the brief's sentence merges them.

3. **Category (b) — the `κ = 2` sifting limit `β₂` — contributes exactly
   zero.** Lichtman's argument is a linear (dimension-1) sieve from end to end.
   Across the 42-page published PDF: `4.266` occurs **0** times, `sifting limit`
   **0**, `Diamond` **0**; `dimension` occurs twice (a "3-dimensional
   projection" on p. 21, and Siebert's title in the bibliography) and
   `Halberstam` twice, both inside "Elliott and Halberstam". So the wall's
   published constant and the programme's exponent wall `β₂ = 4.26645…` share
   no ingredient. **They must never be added, ratioed, or traded against each
   other**, and the natural-looking sentence "3.3 against a needed 1, and
   4.2665 against a needed 2" pairs two objects that do not live in the same
   sieve. **[VERIFIED by grep on the artifact of §1]**

4. **The parity floor 2 is still not a theorem, and this note does not
   promote it.** Its two supports are (i) Selberg's `B_ν = {n ⩽ x : Ω(n) ≡ ν
   (2)}` examples, which are rigorous and which make the linear sieve's `F`
   and `f` both attained, hence optimal *given the linear-sieve axioms*; and
   (ii) the extension to all sieve-theoretic methods, whose best published
   statement is Polymath8b §8 (§6.2 below) and whose authors write in the same
   paragraph *"Our discussion will be somewhat informal and heuristic in
   nature"*, resting the argument on the Möbius randomness law, itself
   conjectural. `research/natal-cap-10-sieve-cap.md` §5 item 5 already carries
   this as **rigorous folklore**. That flag stays.

**What did move.** The number now decomposes, exactly, into three named
factors, and the decomposition answers the programme's question in a way that
is worse for the programme than the opaque number was (§6):

> `3.2995525 = 2 × (1/0.606142)`, and in named factors
> `3.2995525 = [2/θ] × (1 − H_θ)` with `θ` the level of distribution and `H_θ`
> a **published, named, tabulated function** — Wu's savings function — whose
> two known values are `2.24%` and `2.87%`.

The distance from 3.3 to 1 is not a stack of technique losses. It is one factor
of `1/θ ⩾ 1` that Elliott–Halberstam would close, and one factor of 2 that is
the parity barrier, against which the entire 106-year effort has bought a
measured **2.87–2.95%**.

---

## 1. The artifact, and one extraction gotcha

| artifact | source | sha256 | pages |
|---|---|---|---|
| Lichtman, *A modification of the linear sieve, and the count of twin primes*, Algebra & Number Theory **19**:1 (2025) 1–36, doi 10.2140/ant.2025.19.1 | `msp.org/ant/2025/19-1/ant-v19-n1-p01-p.pdf` | `1b64fc36e8a73993ae221505b8c87e27f6c9d01679efc15ee4b8aedf0a85327c` | 42 |
| Polymath (D.H.J.), *Variants of the Selberg sieve, and bounded intervals containing many primes*, arXiv:1407.4897 (= Res. Math. Sci. 1 (2014) Art. 12) | `arxiv.org/pdf/1407.4897` | `4085a675d4716db2b22e672d083d4e38262b88b37b8d05b06bcdceb7cb4086a7` | 80 |
| Friedlander–Iwaniec, *Opera de Cribro*, AMS Colloq. 57 — **table of contents only** | ETH library scan `toc.library.ethz.ch/.../e01_978-0-8218-4970-5_01.pdf` | (fetched, not hashed) | TOC |

The Lichtman sha256 is **byte-identical** to the one
`quadpoint-prior-art.md` §5 recorded on 2026-08-22, so that file's reading and
this one are of the same object. Both were extracted with `pdftotext -layout`
and read in extraction.

**Gotcha, recorded so the next reader does not lose an hour.** `pdftotext` maps
the Fraktur `𝔖` to the digit **5**. Theorem 1.2 extracts as
`π2 (x) ≲ 3.299565(x)` and Proposition 6.3 as `𝔖(x)/(5eγ)` where the **first**
5 is `𝔖` and the **second** is a literal 5 (Wu's weighted-inequality
normaliser, visible as `Γ₁ := 4S(A,x^{ρ'}) + S(A,x^{τ1})`, coefficients summing
to 5). Any grep for `3.29956` in an extraction of this paper returns nothing;
the string is `3.299565`. The reading was settled numerically rather than
typographically (§2.3), which is the only way to settle it from an extraction.

---

## 2. Normalization — stated explicitly, and checked against three independent sources

This is the step the brief warned about, and it is where a wrong decomposition
would come from.

### 2.1 The convention, from the paper itself

Lichtman (1-5), p. 3, verbatim:

> "Recall Hardy and Littlewood [1923] conjectured the asymptotic formula
> `π₂(x) ∼ 2x/(log x)² ∏_{p>2} (1 − 2/p)/(1 − 1/p)² =: 𝔖(x)`."

So **`𝔖(x)` is the whole conjectured main term, not the singular series**. In
this normalization `c = 1` *is* the Hardy–Littlewood conjecture, `c = 2` is the
parity floor, and every entry of the paper's Table 1 is a `c`. The
Goldbach-problem constants in the same tradition are exactly double
(`natal-cap-10-sieve-cap.md` §1.1, citing Wu 2004 p. 3), and none of them
appear here.

### 2.2 Two independent confirmations of the same constant

- **Riesel–Vaughan, Ark. Mat. 21 (1983) 45–74, Lemma 5** (read at source in
  this repo on 2026-08-18, `natal-cap-10-sieve-cap.md` §1.4) sets
  `C = 2∏_{p>2} p(p−2)/(p−1)²` with `1.320323 < C < 1.320324`. Lichtman's
  `𝔖₂ = 2∏_{p>2}(1−2/p)/(1−1/p)²` is the same product written the other way,
  and equals the same 1.320323…. Same normalization.
- **Halberstam–Richert, *Sieve Methods*, Theorem 5.3**, quoted verbatim by
  Bordignon–Lee arXiv:2211.11012 (via `natal-cap-10-sieve-cap.md` §1.4):
  `π_F(y) ≤ 2^g g! ∏_p ((p−ρ_F(p))/(p−1))(1−1/p)^{1−g} · y/log^g y`. At `g = 2`,
  `ρ(2) = 1`, `ρ(p) = 2`, the product telescopes to `2∏_{p>2} p(p−2)/(p−1)² =
  𝔖₂` and the prefactor is `2²·2! = 8`, giving `8𝔖(y)` — which is Table 1's
  Selberg row. **[ARITHMETIC on the quoted formula]** So the interval
  literature and Lichtman's table agree on the normalization to the digit.

### 2.3 The headline number reproduced from the paper's own components

The strongest available check, and it is not a citation. Lichtman's
Proposition 6.3 (p. 34) reads

> `S(A, x^ρ) ≲ (𝔖(x)/5e^γ)(Σ_{1⩽n⩽8} G_n + G_{1/5} Σ_{9⩽n⩽21} I_n)`

and his Table 2 (p. 37) prints all 21 components. Summing them by hand:

| quantity | from Table 2 | printed elsewhere in the paper |
|---|---|---|
| `Σ_{1⩽n⩽8} G_n` | 28.346282 | `⩽ 28.34581` (p. 34) |
| `Σ_{9⩽n⩽21} I_n` | 0.1744047 | `⩽ 0.174404` (p. 34) |
| `G_{1/5}·Σ I_n` | 1.045098 | — (`G_{1/5} ⩽ 5.99237`, p. 34) |
| bracket / `5e^γ` | **3.300414** | **`⩽ 3.300425 𝔖(x)`** (6-22) |
| after swapping `G₂ = −5.591009 → G₂^{Wu} ⩽ −5.598667` | **3.2995538** | **`⩽ 3.2995525 𝔖(x)`** (6-24) |

**[ARITHMETIC, inputs = Table 2 and the constants on p. 34]** Agreement to five
significant figures, the residual being the rounding of Table 2's printed
values. Two things follow that a citation alone could not give:

- The reading `𝔖(x)/(5e^γ)` — `𝔖` on top, literal 5 below — is **forced**;
  no other reading reproduces 3.300425.
- The final Wu-iteration step moves the constant by exactly
  `(5.598667 − 5.591009)/(5e^γ) = 0.0008599`, i.e. **0.026%** of 3.2995. That
  one refinement, which the abstract's "2.94% refinement" language might
  suggest is where the gain lives, is 1/34th of the gain.

---

## 3. The one exact identity in the chain: `2/θ`

Lichtman p. 3, verbatim:

> "Bombieri and Davenport obtained `π₂(x)/𝔖(x) ≲ 4` as a consequence of the
> Bombieri–Vinogradov theorem (1-2) and a standard sieve upper bound of level
> `x^{1/2−ε}`. **More generally, if one proves level of distribution `x^{θ−ε}`
> then one immediately obtains `π₂(x)/𝔖(x) ≲ 2/θ`.**"

Derived here rather than taken, because the whole decomposition hangs on it.
**[ARITHMETIC, four lines, inputs all quoted from the same paper]**

- `A = {p+2 : p ⩽ x}`, `|A| = π(x) ∼ x/log x`.
- Sift to `z = x^{1/2}`; survivors are twins up to a negligible set (a
  non-twin survivor needs `p+2 = q₁q₂` with both `q_i ⩾ x^{1/2}`, hence
  `p+2 ⩾ x`).
- `V(z) ∼ 𝔖₂/(e^γ log z)` — Lichtman's own sentence, p. 27 — so at
  `log z = (log x)/2`, `|A|V(z) = 2𝔖₂x/(e^γ log²x) = (2e^{−γ})·𝔖(x) =
  1.122919·𝔖(x)`.
- Level `D = x^θ` gives `s = log D/log z = 2θ`, and `F(s) = 2e^γ/s` for
  `s ∈ [1,3]` (Lichtman (2-5), and stated again on p. 29), so
  `F(2θ) = e^γ/θ`.
- Product: `(2e^{−γ})(e^γ/θ)·𝔖(x) = (2/θ)·𝔖(x)`. ∎

**Two structural facts fall straight out, and they are the spine of §6.**

- `θ ⩽ 1` is forced by the length of the sum (`π(x; q, a)` is `O(1)` once
  `q ⩾ x`), so `s = 2θ ⩽ 2` and `F(s) ⩾ F(2) = e^γ = 1.781072`.
- `F(s) > 1` for every finite `s`, with `F ↓ 1`. So **even a fantasy
  upper-bound sieve of unlimited level cannot get below `2e^{−γ} = 1.122919`
  on this route.** That residue is the Buchstab-vs-Mertens deficit at `u = 2`:
  `ω(2) = 1/2` against `e^{−γ} = 0.561459`, ratio `e^γ/2 = 0.890536`. At
  `u = 2` the rough numbers *are* the primes, and their count sitting 11% below
  the Mertens prediction is the parity phenomenon in its smallest form.

So the parity 2 itself splits: **`2 = (2e^{−γ}) × F(2) = 1.122919 ×
1.781072`**, the first factor irreducible at any level, the second the value
of the sieve function at the maximal accessible parameter.

### 3.1 The identity reproduces four rows of the chronology exactly

Table 1 of the paper, converted by `θ_eff := 2/c`. **[ARITHMETIC]**

| year | author(s) | `c` | `θ_eff = 2/c` | reads as |
|---|---|---|---|---|
| 1919 | Brun | `O(1)` | — | — |
| 1947 | Selberg [1952] | 8 | 0.25000 | dimension-2 `Λ²`, no AP input (§5) |
| 1964 | Pan | 6 | 0.33333 | large sieve |
| 1966 | Bombieri–Davenport | 4 | **0.50000 = 1/2** | **exactly `2/θ` at BV** |
| 1978 | Chen | 3.9171 | 0.51058 | `θ = 1/2` + switching |
| 1983 | Fouvry–Iwaniec | 34/9 | **0.52941 = 9/17** | **exactly `2/θ`** |
| 1984 | Fouvry | 64/17 | **0.53125 = 17/32** | **exactly `2/θ`** |
| 1986 | Bombieri–Friedlander–Iwaniec | 3.5 | **0.57143 = 4/7** | **exactly `2/θ`** |
| 1986 | Fouvry–Grupp | 3.454 | 0.57904 | `θ = 4/7` + switching |
| 1990 | Wu | 3.418 | 0.58514 | `θ = 4/7` + switching |
| 2003 | Cai–Lu | 3.406 | 0.58720 | `θ = 4/7` + switching |
| 2004 | Wu | 3.39951 | 0.58832 | `θ = 4/7` + switching; the standing record at that level (§4.2) |
| 2025 | Lichtman | 3.2995525 | **0.606142** | `θ ≈ 10/17` + switching |

Four rows are `2/θ` on the nose at a level of distribution. That `9/17` and
`17/32` are in fact the levels Fouvry–Iwaniec 1983 and Fouvry 1984 proved is
**NOT VERIFIED at source in this session** — two WebSearch flips returned the
papers but not the exponents, and neither primary was opened. The arithmetic
identity stands regardless; the attribution is an inference.

That `θ = 4/7` was the standing record level from BFI 1986 until Maynard 2020
is what pins the 1986–2004 rows to one level. **[INFERRED from the chronology
Lichtman's own §1 gives; no better level existed in that window.]**

**The reframing this buys.** In `θ_eff` coordinates the whole 106-year effort
reads as a walk from `0.25` to `0.6061`, against a target of `θ = 1` at which
the answer is still **2**. The finish line of the entire visible programme is
not 1.

---

## 4. The decomposition table

Multiplicative ladder from the truth up to the record. Every row is a factor,
and the running product is the constant at that stage.

| # | named loss | factor | running `c` | class | source |
|---|---|---|---|---|---|
| 0 | Hardy–Littlewood truth | — | 1.000000 | — | Lichtman (1-5) p. 3 |
| 1 | **Buchstab-vs-Mertens deficit at `u = 2`**, `2e^{−γ}` — the sieve's own density prediction sits above the truth because at `u = 2` the rough numbers are exactly the primes | ×1.122919 | 1.122919 | **(a) parity-forced**, and irreducible at *every* level since `F > 1` always | §3, from `V(z) ∼ 𝔖₂/e^γ log z` (Lichtman p. 27) |
| 2 | **`F(2) = e^γ`**, the linear upper-sieve function at the maximal accessible parameter `s = 2θ ⩽ 2` | ×1.781072 | **2.000000** | **(a) parity-forced** given the linear-sieve axioms: Selberg's `B_ν` examples attain both `F` and `f`, so `F` cannot be lowered | Lichtman (2-5); Wu 2004 p. 2 quoting HR p. 239 (via `natal-cap-10-sieve-cap.md` §1.5) |
| 3 | **level deficit `1/θ`**, `θ = 10/17` against the Elliott–Halberstam target `θ = 1` | ×1.700000 | 3.400000 | **(c) technique slack**, but of equidistribution technology, not of sieve weights; conjecturally closable to 1 by EH, and by nothing else | Lichtman Thm 1.1, p. 3 |
| 4 | Lichtman's modified-weight main-term loss, `F*(s) ⩽ 1.000081·F(s)` on `1 ⩽ s ⩽ 3` | ×1.000081 | 3.400276 | **(c) technique slack**, self-priced by the author | Lichtman Thm 1.1(2), p. 3 |
| 5 | **switching + Buchstab machinery credit** (Chen's switching principle, Wu's weighted sieve inequality, positivity discards) | ×0.970457 | **3.2995525** | a **credit against (a)** — the measured permeability of parity | Lichtman Lemma 6.2 (= Wu 2004 Lemma 4.2), §6.2–6.3 |

**[ARITHMETIC; rows 1, 2, 5 checked in §2.3 and §3]**

Reading the table in one line: `3.2995525 = 2 × 1.7 × 1.000081 × 0.970457`,
and `2 × 1.649776` with everything after row 2 collapsed.

### 4.1 The one component that is nobody's slack

Row 3 is 82% of the excess over the parity floor
(`1.7/(3.2995525/2) = 1.0304`; put the other way, of the total factor 3.2996,
the level deficit contributes 1.7 and parity contributes 2). It is the only
row that a *conjecture* — Elliott–Halberstam — closes completely, and it is
the only row the field has actually been moving: `0.25 → 0.6061` in `θ_eff`
over 106 years, of which `0.5 → 0.6061` since 1966.

### 4.2 Row 5 is a published, named, tabulated function, and its published values are lower bounds

This is the finding that most changes the picture, and it is entirely from
Lichtman's §6.3, pp. 35–36, where he prints Wu's savings function `H_θ(t)` in
full:

| `θ` | `H_θ(t)`, `t ∈ [2.0, 2.1]` | source |
|---|---|---|
| 1/2 | 0.0223939 | Lichtman p. 36, table for `H_{1/2}`, first row |
| 4/7 | 0.0287118 | Lichtman p. 36, table for `H_{4/7}`, first row |

and states, p. 36: *"Wu [2004, Theorem 3] obtained `π₂(x)/𝔖(x) ≲ (7/2)(1 −
H_{4/7}(2.1)) ⩽ 3.39951`."* **[ARITHMETIC]** `3.5 × (1 − 0.0287118) =
3.399509`, exactly the published constant. **The argument is `2.1`, and both
sources print it as the argument.** Wu's own p. 32 reads `H(2.1) ⩾ 0.0287118`,
and Lichtman's step function assigns `0.0287118` to the band `2.0 ⩽ t ⩽ 2.1`,
so the neighbouring value `0.0280509` belongs to `2.1 < t ⩽ 2.2` and excludes
`t = 2.1`; an arithmetic disagreement built on `0.0280509` is an
off-by-one-band read (both read at page image,
`history/staging/lit-wu2004.md` §§2.3, 4.1). Wu 2004's constant is
`(2/θ)(1 − H_θ(2.1))` at `θ = 4/7`, and because `H_θ` is decreasing in `s` the
same bound holds at every `s ∈ [2.0, 2.1]`, which is how Lichtman tabulates it.
Read the table above as `H_θ` on that band, not at the single point `2`.

Now read the four `θ = 4/7` rows of the chronology as credits against 3.5:

| year | `c` | credit `1 − c/3.5` | increment |
|---|---|---|---|
| 1986 Fouvry–Grupp | 3.454 | 1.3143% | — |
| 1990 Wu | 3.418 | 2.3429% | +1.029 pp |
| 2003 Cai–Lu | 3.406 | 2.6857% | +0.343 pp |
| 2004 Wu | 3.39951 | **2.8712%** | +0.186 pp |
| — | — | `H_{4/7}(2.1) ⩾ 2.87118%` | a **lower bound**, not a ceiling |

**[ARITHMETIC]** Eighteen years of work at one fixed level, each paper's credit
landing on the numerical lower bound its own method proves; the 2004 credit
agrees with the 2004 lower bound to five decimals because the constant *is*
`(2/θ)(1 − H)`. **That is not saturation of the function.** `H_{4/7}(2.1) ⩾
0.0287118` is a numerical lower bound obtained by discretising a functional
inequality with no known closed form, per Wu p. 30, *"It seems very difficult to
give the exact solutions, because we only know that `H(s)` is decreasing"* — so
the true value may be larger and nobody has bounded it above at any level
(`history/staging/lit-wu2004.md` §§3 item 5, 4.1). What 2004 saturates is the
chronology of published constants at `θ = 4/7`, which is a different statement.
And at `θ = 1/2`, Chen's 1978 credit is `1 − 3.9171/4 = 2.0725%` against
`H_{1/2} ⩾ 2.23939%`, below the best published lower bound at its own level.
Lichtman's own credit is `1 − 3.2995525/3.4 = 2.9543%`, consistent with
`H_θ` being monotone increasing in `θ` (Lemma 6.4).

**So row 5 is not open-ended technique slack. It is a credit against a named
function whose only two published points, 2.24% at `θ = 1/2` and 2.87% at
`θ = 4/7`, are lower bounds, with no upper bound known at any level.** Whether
it can grow to the 50% the programme needs is §6.

### 4.3 Slack the author names and does not spend

Lichtman, p. 37, verbatim, closing the paper:

> "For slight numerical gains, one may compute `H_θ(s)` when `θ ∈ (4/7, 7/12)`,
> by tweaking the formulae in [Wu 2004]. More substantially, Wu defined a lower
> bound savings `h_θ(s)`, for a substitution of `f(s)` by `f(s) + (2e^γ/s)h_θ(s)`.
> But in practice, to compute `h` would require derivations (analogous to `H`)
> of as yet undetermined formulae. We leave these to the reader."

and, p. 35: *"we have chosen simplicity over full optimization."* This is
class **(c)**, admitted by the author, and **unquantified by him**. It is the
only part of the 3.29956 that a purely computational effort could move without
new input, and by his own word ordering the first item is "slight".

---

## 5. Why category (b) is empty, and what the dimension-2 analogue of the 2 actually is

`β₂ = 4.26645028414864191641` does not appear in the chain at any point (§0
item 3, verified by grep). The reason is structural, not incidental: **the
whole modern chronology left dimension 2 in 1966.** Bombieri–Davenport's step
from Selberg's 8 to 4 is precisely the step from sifting `n(n+2)` over `n ⩽ x`
(dimension 2, `ρ(p) = 2`) to sifting `p+2` over primes `p ⩽ x` (dimension 1,
`g(d) = 1/φ(d)`, Lichtman p. 27), paid for with Bombieri–Vinogradov.

The dimension-2 route has its own parity number, and it is not 2. Running §3's
computation at `κ = 2` **[ARITHMETIC; `σ_κ` from the Booker–Browning statement
of the DHR system quoted verbatim in `research/dhr-verification.md` §1.1]**:

- `σ₂(u) = (2e^γ)^{−2}u²/Γ(3)` on `(0,2]`, so `σ₂(2) = 1/(2e^{2γ})` and
  `F₂(2) = 2e^{2γ} = 6.344438`.
- With `ω(2) = 1`, `ω(p) = 2`: `V(z) = 𝔖₂e^{−2γ}/log²z`, so at `z = x^{1/2}`,
  `|A|V(z) = 4e^{−2γ}·𝔖(x) = 1.260947·𝔖(x)`.
- Product: `6.344438 × 1.260947 = 8.000000`.

**Exactly 8**, and independently exactly the `2^g g! ∏(…) = 8𝔖` of
Halberstam–Richert Theorem 5.3 (§2.2). Two derivations from disjoint inputs
landing on the same integer is the check that the convention is right.

So the honest statement of the dimension-2 side is:

> **The dimension-2 parity floor is 8, not 2**, in the sense that `s = 2θ ⩽ 2`
> is forced there too and `F₂(2) = 2e^{2γ}` is the sieve function's value at
> that point. Getting from 8 down to 2 is not a dimension-2 improvement at
> all; it is the change of problem that Bombieri–Davenport made, and it costs
> equidistribution of primes in arithmetic progressions.

And one caveat that must travel with this, because it is exactly the kind of
overclaim this corpus records: **`F₂` is not known to be optimal.** At `κ = 1`
Selberg's Liouville sets are extremal and pin `β₁ = 2`; at `κ = 2` no analogous
example is in print. `research/sift-limit-attack.md` §2 quotes Ford's 2023
notes at source: *"The exact value of `β(κ)` is known only for
`κ ∈ [0, 1/2] ∪ {1}`."* The search for a `κ = 2` extremal example was run in
the owning sieve-theory convention and is tabled in
`research/SEARCH-CONVENTIONS.md` §3 as **none found**. So the dimension-2 "8"
is *best known*, not *proven floor* — weaker than the dimension-1 "2", which at
least has Selberg's examples behind it.

---

## 6. The programme's question, answered

**Q: our certificate needs `1 + O(1/ln²h)`. Given the decomposition, what is
the theoretical floor for methods of this class, and is the gap bridgeable?**

### 6.1 The floor, in three tiers

| tier | floor | what it assumes | status |
|---|---|---|---|
| linear sieve, Type-I data only, level `θ ⩽ 1` | **2** | the sieve axioms and `θ ⩽ 1` | rigorous *given the linear-sieve axiom set* (Selberg's `B_ν` attain `F` and `f`) |
| linear sieve, unlimited level (fantasy `θ = ∞`) | **1.122919 = 2e^{−γ}** | `F ⩾ 1`, which every upper-bound sieve satisfies | **[ARITHMETIC]**, §3 |
| linear sieve + switching, `θ → 1` | `2(1 − H_1(2))` | `H_θ(2)` continues its trend | **HEURISTIC, mine, two data points**: linear in `θ` through `(1/2, 0.0223939)` and `(4/7, 0.0287118)` gives `H_1(2) ≈ 0.0666`, hence **≈ 1.867**. Extrapolating a 6× range extension from two points; this is a calibration, not an estimate |

The middle row is worth pausing on: it says that even granting a sieve
*unlimited* level of distribution, a `1 + o(1)` upper bound on `π₂` is out of
reach on this route by 12.3%, because at `u = 2` the sieve's density model
overcounts the primes. The `1 + O(1/ln²h)` the certificate needs is a factor
`~1/ln²h` **inside** that 12.3%.

### 6.2 The class-level statement, at source, with its own hedge

Polymath8b §8, arXiv:1407.4897, pp. 68–70, read at source this session:

> "In this section we argue why the 'parity barrier' of Selberg [57] prohibits
> sieve-theoretic methods, such as the ones in this paper, from obtaining any
> bound on `H₁` that is stronger than `H₁ ⩽ 6`, even on the assumption of
> strong distributional conjectures such as the generalized Elliott-Halberstam
> conjecture GEH[ϑ], and even if one uses sieves other than the Selberg sieve.
> **Our discussion will be somewhat informal and heuristic in nature.**"

and, p. 70:

> "The same arguments of course also prohibit a sieve-theoretic proof of the
> twin prime conjecture `H₁ = 2`. In this case one can use the simpler weight
> `ω(n) = 1 − λ(n)λ(n+2)` to rule out such a proof, and the argument is
> essentially due to Selberg [57]."

Their mechanism is exactly the weight our certificate would have to survive: if
a sieve-theoretic argument establishes `Σ_n ν(n)1_A(n) > 0` from control on the
discrepancies (142) and main terms (143), the same argument establishes
`Σ_n ν(n)1_A(n)ω(n) > 0` for any non-negative `ω`, and `ω(n) = 1 −
λ(n)λ(n+2)` vanishes on every twin. The obstruction is not a size gap; it is
that the argument *does not see* the difference between the twin set and the
empty set. And its hedge is explicit: "informal and heuristic", resting on the
Möbius randomness law.

Friedlander–Iwaniec, *Opera de Cribro*, **Chapter 16, "Asymptotic Sieve and the
Parity Principle"**, §16.4 "The Parity Phenomenon" (p. 337) and §16.5 "The
Dichotomy in Action" (p. 338) is the book treatment. **Chapter and section
titles confirmed at the ETH library's TOC scan; the chapter itself is NOT
REACHED** and no statement is attributed to it here.

### 6.3 The answer

**The gap from 3.3 to 1 is not bridgeable by anything visible, and the
decomposition says so more sharply than the raw number did.**

- Of the factor 3.2995525, **1.7 is a level deficit** that Elliott–Halberstam
  closes completely, and **2 is the parity barrier**, which EH does not touch
  by its own authors' statement (§6.2: "even on the assumption of … GEH").
- The programme's certificate needs the constant at `1 + O(1/ln²h)`. That is
  **below the parity floor by a factor 2**, below the unlimited-level fantasy
  floor by a factor 1.1229, and it is in the direction the parity argument
  specifically forbids: a sieve upper bound sharp enough to force `T ⩾ 1` is a
  sieve-theoretic lower bound on twins, which is Selberg's own `ω(n) = 1 −
  λ(n)λ(n+2)` case.
- **The best published permeability of the barrier is 2.87%**
  (`H_{4/7}(2.1) ⩾ 0.0287118`, Wu 2004) **to 2.95%** (Lichtman 2025), against
  the **50%** the certificate needs. The permeability is a published function,
  not an open-ended margin, and its only two published values, 2.24% and 2.87%,
  are lower bounds on it; `H_θ(2) < 1/2` is unproven at every level and the
  only proven cap is the trivial `H ⩽ 1` (`history/staging/lit-wu2004.md` §3
  item 5).

So the honest restatement the brief asked for, with its calibration attached:

> **Not "we are a factor 3.3 away".** The 3.3 is `2 × 1.65`, the 1.65 is a
> level deficit that a conjecture closes, and the 2 is the parity barrier. The
> class-level statement that no sieve-theoretic method crosses that 2 is
> **HEURISTIC, not proven** — Polymath8b say so of their own argument — but it
> is the same heuristic that has held for 77 years, and the only thing anyone
> has extracted against it in 47 years of dedicated work is 2.9%.

This does **not** license writing "no method of this class can ever arrive" as
a proven statement. It licenses writing: *the remaining gap is the parity
barrier itself, not a stack of technique losses, and no member of this method
class has moved it by more than 2.95%.*

### 6.4 The direction our certificate actually needs, and the other half of the price

The upper-bound constant is only half of what the certificate consumes. The
same-day staging note `attack-wrongdirection-audit.md` §3.8 (untracked,
2026-08-26, another agent's file, cited here and not edited) prices the
**lower**-bound half in the sieve's own currency: the census route needs
dimension-2 lower-bound positivity at `s = u*/2 = 1.7829` against
`β₂ = 4.26645…`, short by a factor 2.393. The two halves are independent
obstructions in two different sieve dimensions, and the certificate needs both.
Neither is priced by the other's number, which is the same warning as §0 item 3
from the other side.

---

## 7. Sanity check against `paper/wall-note.md` §2 Face 1 — the floors agree, the application is loose by 4×

Face 1 says the weak form of Assumption A *"is a positive-proportion lower
bound of exactly the kind the parity floor 2 blocks for a two-class sieve, and
the block is quantified: the floor is 2 against the constant 1.28 the weak form
needs at x = 17."*

**The 2 is the same 2 I derive**, and it traces to the same place: it is
`natal-cap-10-sieve-cap.md` §2 Regime 2, whose own §1.5 sources it to Tao 2007
plus `2/θ` at `θ = 1`. No disagreement on the number.

**But it is applied in the wrong sieve dimension, and the effect is to
understate the barrier by a factor 4.** Regime 2's object is, in that file's own
words, *"a pattern sifted by all primes `< q` … in a position-uniform window —
precisely π₂-in-intervals"*, i.e. a **dimension-2, position-uniform** problem.
The floor 2 is the **dimension-1, whole-range** number, reachable only through
`A = {p+2}` plus equidistribution of primes in arithmetic progressions, which
is exactly the input that is not available uniformly in the window's position
(`natal-cap-10-sieve-cap.md` §1.4). In Regime 2's own setting:

- the parity floor of the sieve actually in play is **8** (§5),
- the best constant in print that survives the position quantifier is also
  **8** (Riesel–Vaughan Lemma 5, read at source in this repo 2026-08-18),
- and the needed constant is **1.28**.

So the true margin at `x = 17` is `8/1.28 = 6.25×`, not `2/1.28 = 1.56×`.

**This strengthens Face 1's conclusion and does not weaken it**, since 2 is a
valid *a fortiori* lower bound on any sieve constant for any prime-pair count
in any window. But the sentence as written invites a reader to think the route
is barred by a factor 1.56 and might be recovered by a 22% improvement. It is
barred by a factor 6.25 in its own setting, with no published route to even the
1.56 version. Recommend the wording be tightened by whoever owns
`paper/wall-note.md`; this note edits nothing.

---

## 8. One wording flag in `paper/wall-note.md` §2 Face 4, stated loudly because it is a lower-bound claim with no lower-bound source

Face 4 reads: *"β₂ = 4.26645 is a proven barrier for any argument that uses the
sieve axioms alone."*

`research/sift-limit-attack.md` §2 says the opposite, quoting Ford's 2023 notes
at source: *"The exact value of `β(κ)` is unknown in all cases `κ > 1/2` except
for `κ = 1`,"* and records **[ABSENT]** for a `κ = 2` extremal example, searched
in the owning sieve-theory convention and tabled in
`research/SEARCH-CONVENTIONS.md` §3. `REFUTED.md`'s own row for *"a floor at 4",
and the band (4, 4.2665]* closes the idea that a `κ = 2` floor below 4.2665 has
been exhibited **in either direction**.

`β₂ = 4.26645…` is an **upper bound on the sifting limit that the DHR sieve
attains**, not a proven lower bound on what the axioms permit. Face 4's
sentence asserts the latter. The two files disagree, one of them is wrong, and
on the evidence in the corpus it is Face 4's wording. **Flagged, not fixed** —
this note edits no other file, and the owner of `paper/wall-note.md` should
decide whether the intended reading was "the barrier our own theorem sits
behind", which is fine, or the literal one, which is not sourced.

---

## 9. NOT REACHED, and what would falsify each claim

**NOT REACHED at source, this session:**

- **Wu, Acta Arith. 114 (2004) 215–273**: the *published* text is still not
  reached. The arXiv deposit (0705.1652v1, 48 pp.) was read at page level on
  2026-08-27, definition, recurrence, both computed values and the p. 32
  modification list (`history/staging/lit-wu2004.md`), and that read supplied
  §4.2's correction. What it did not supply is an answer on `θ → 1`: Wu never
  parameterises `H` by a level, the strings `Elliott` and a conjectural level
  are absent from all 48 pages, and the level enters as a bounded scalar on the
  switching-loss integrals only. So **whether `H_θ(2)` stays bounded as
  `θ → 1` is open and unaddressed in the source**, not decided in the
  recurrence as this note previously assumed.
- **Friedlander–Iwaniec, *Opera de Cribro*, Ch. 16.** TOC only. No statement
  attributed.
- **Halberstam–Richert, *Sieve Methods* (1974), p. 239 and Theorem 5.3.**
  Cited through Wu 2004's verbatim sentence and Bordignon–Lee's verbatim quote
  respectively; the book stays lending-locked, as `natal-cap-10-sieve-cap.md`
  §5 item 2 records.
- **Fouvry–Iwaniec 1983 and Fouvry 1984**, for the levels `9/17` and `17/32`.
  Two WebSearch flips (channel calibrated in-session on
  `Kourbatov maximal gaps between twin primes arXiv 1301.2242`, which returned
  arXiv:1301.2242) returned the papers but not the exponents. Neither primary
  opened.
- **An EH-conditional twin upper-bound constant.** Two WebSearch flips, one
  channel, nothing returned. **This is a weak negative and must not be quoted
  as an absence**: it was not run in an owning convention that
  `research/SEARCH-CONVENTIONS.md` §1 carries, since §1 has no row for
  "conditional constants in the `π₂` upper-bound chronology", and no
  zbMATH/MathSciNet flip was run. Recorded only so the next wave knows the
  budget was not spent here.
- **Lichtman arXiv:2309.08522 (3.2290) and Pascadi arXiv:2505.00653 (3.203)**,
  the two unrefereed preprints ahead of the record. Read in this repo on
  2026-08-19 (`lemmaV-neighbours.md`), not re-read here.
  **[ARITHMETIC]** their `θ_eff` are 0.61939 and 0.62441, so the same ladder
  continues and neither approaches 1.

**Falsifiers, and whether each has been run:**

| claim | what would falsify it | run? |
|---|---|---|
| `3.2995525 = 2 × 1.7 × 1.000081 × 0.970457` | any component of Lichtman's Table 2 misread | **run** — §2.3 reproduces both (6-22) and (6-24) to 5 s.f. |
| category (b) contributes zero | any `β_κ`, `κ = 2`, or DHR apparatus in the Lichtman chain | **run** — grep of the 42-page PDF, 0 hits on three keys |
| the credit is `H_θ(2.1)` and 2004 is the standing record at `θ = 4/7`, not a saturation of the function | `3.5(1 − H_{4/7}(2.1))` ≠ 3.39951, or an upper bound on `H_θ` in print | **run** for the arithmetic, equals 3.399509; **run and negative** for the upper bound, none exists at any level (`history/staging/lit-wu2004.md` §3 item 5) |
| the dimension-2 parity number is 8 | `F₂(2)·4e^{−2γ}` ≠ 8, or HR Thm 5.3's prefactor ≠ 8 | **run** — both give 8 exactly, from disjoint inputs |
| `H_1(2) ≈ 0.0666`, floor ≈ 1.867 | Wu's recurrence bounding `H_θ(2)` away from that, or any third tabulated `H_θ` | **NOT RUN** — two points, linear, 6× extrapolation. Treat as a calibration only |
| "no sieve-theoretic method reaches `1 + o(1)`" | a sieve-theoretic proof of a twin lower bound | **unfalsifiable in practice**; Polymath8b's argument for it is self-labelled heuristic |
| Face 1's floor is loose by 4× | a sub-8 constant that survives the position-uniformity quantifier | **NOT RUN** — and `natal-cap-10-sieve-cap.md` §5 item 7 already holds this open for Pan's 6 |

**Scratchpad-grade, per the `quadpoint-prior-art.md` §2.2 precedent.** Every
`[ARITHMETIC]` number here was checked in a session script that is not in the
repo, is not embedded, and is not `qc`-gated. There is no producer for this
note. `research/attack-parity-adversary-01.js` (untracked, 2026-08-26, another
agent's file, empty OUTPUT block, never embedded) attacks the same question
from the LP side and is the obvious next move; it was **not run here** and
nothing above depends on it.

---

## Summary

**Still open, and made sharper rather than closed.** The certificate needs
`1 + O(1/ln²h)`. The decomposition puts the parity barrier — not a stack of
technique losses — squarely between the record and 1, in the direction the
barrier specifically forbids, and prices the barrier's best published
permeability (a lower bound on the savings function, not its value) at
2.87–2.95% against the 50% required. The class-level statement that no
sieve-theoretic method crosses it is **heuristic**, by its own authors'
sentence, and this note does not promote it.

**What moved.** `3.29956` is no longer opaque. It is
`2 × (1/0.606142)`, or in named factors
`(2e^{−γ}) × F(2) × (1/θ) × (F*/F) × (1 − H_θ(2.1))`, and the classification is
**(a) parity-forced: the factor 2, itself `1.122919 × 1.781072`; (b) `κ = 2`
sifting limit: exactly zero, verified by grep, because the whole chronology
left dimension 2 in 1966; (c) technique slack: the factor `1/θ = 1.7`, which
only Elliott–Halberstam closes, plus 0.0081% of weight loss and an
un-quantified optimisation residue the author names and declines to spend.**

**Two flags for the owners of `paper/wall-note.md`.** Face 1's parity floor 2
is applied in the wrong sieve dimension and understates its own barrier by 4×
(the number for its setting is 8); Face 4's "β₂ is a proven barrier for any
argument that uses the sieve axioms alone" is a lower-bound claim that
`sift-limit-attack.md` §2 and `SEARCH-CONVENTIONS.md` §3 both contradict.
Neither file was edited.

---

*History layer: process record, staging. See `research/history/CHANGELOG.md` for the corpus rule.*
