# The sharp sieve functions moved the scope of the two empty equidistribution theorems from x = 263 to @37 and from level 131 to @23, and made both of them worse: the fundamental lemma's error factor is explicit and reachable, Diamond–Halberstam Theorem 9.1's is unwritten and its bare shape does not fall below 1 until log y ≈ 10^11

<!-- ledger
id: Q-sharp-sieve-range
status: CLOSED
todo: 8
question: Do the sharp sieve functions (Jurkat-Richert, DHR) make the two empty certificate-engine theorems non-empty at run levels?
verdict: NO at finite level: DH Thm 9.1 carries no written constant and the crude fundamental lemma is strictly better; as limit statements kappa=1 is first non-empty @37 (a 19.8-wide bracket; @53 is the first narrow one, 1.656) and kappa=2 @23.
-->

*(2026-08-28. **Staging note. HELD.** No existing repo file was edited, moved or
deleted. No git command of any kind was run. One producer was written and it
lives beside this note in staging, not in `research/`:
`research/history/staging/thm-sharp-sieve-range.js`. It is **not** embedded,
**not** `qc`-gated, and every number it prints is marked `[SCRATCHPAD-GRADE]`
with the command that produced it. Nothing below may be quoted outside this file
until it is re-derived inside an embedded producer in `research/`. Under the
house publication moratorium.)*

**Command for every `[SCRATCHPAD-GRADE]` number below:**
`node research/history/staging/thm-sharp-sieve-range.js` (0.11 s, node v22, no
data files, nothing written), code-sha256
`92a22c21cf1bca1eb4b112f0929bdc3a76af10ee9c782be228f2692fac9e41e8`.

**Tags.** `[CITED]` = a repo artifact quoted, not recomputed, per the standing
compute rule. `[CITED-REPO-PAGE]` = a literature statement quoted from a repo
file that recorded reading it at a page image or PDF page; not re-read this
session. `[MEMORY]` = from memory, not verified at any page this session.
`[NOT REACHED]` = named, not seen. `[SCRATCHPAD-GRADE]` = this note's producer.
`[DERIVED]` = argument or arithmetic carried out here.

**Siblings, read in full before this note was started and carried:**
`research/history/staging/thm-capK-bv.md` (κ = 1) and
`research/history/staging/thm-buchstab-transfer-shallow.md` (κ = 2). Both are
`[CITED]` throughout and neither was edited.

---

## 0. Verdict, and the disconfirming half is the larger half

**The brief's premise fails on its central claim, and it fails in the direction
that matters.** The premise was that the crude fundamental lemma is the wrong
instrument at bounded `s`, and that the sharp Jurkat–Richert and DHR functions
would turn one or both empty theorems into something non-empty at a level the
repo has data for. They do not, because the sharp instrument's own error term is
worse than the crude one at every finite level. Seven findings, disconfirming
first.

1. **The sharp sieve does not produce a finite-level statement either, and it is
   further from one than the fundamental lemma.** The only κ ≥ 1 sharp sieve
   this repo has at a page is Diamond–Halberstam Theorem 9.1, read at the book's
   p. 104 from an `attestation/` photograph
   (`lit-pdf-halberstam-richert.md` §6.1, `[CITED-REPO-PAGE]`). Its error is
   `O((log log y)²/(log y)^{1/(2κ+2)})` with "the constants implied by the
   O-notation depend at most on κ and A", and **the constant is not written**.
   The bare shape of that error, taking the unwritten constant to be exactly 1,
   reads `1.05 / 1.66 / 4.32` at @17 / @23 / @97 at κ = 1 and
   `3.66 / 4.82 / 9.22` at κ = 2. It **rises** across the whole reachable range,
   peaks at `8.66` (κ = 1) and `19.49` (κ = 2), and first falls below 1 at
   `log y ≈ 2.1·10¹¹` and `8.8·10¹⁹` respectively. `[SCRATCHPAD-GRADE]`, SEC 4.
   Against that, the fundamental lemma's factor `e^{9κ−s}K^{10}` is explicit and
   crosses 1 at `s ≥ 10.82` (κ = 1) and `s ≥ 21.37` (κ = 2), which the siblings
   locate at reachable levels `x = 263` and `x = 127`; the κ = 2 sibling's
   tabled level 131 is its `δ = 0.5` figure, at `s* = 22.06`. **For a
   finite-level statement the crude fundamental lemma is strictly the better
   instrument.**
   That is the reverse of the premise. `[DERIVED]` against `[CITED-REPO-PAGE]`.
2. **The premise's own worked example is refuted by the factor it forgot.** The
   brief says that at `s = 1.68` (@29, κ = 1) `F(s) = 2e^γ/1.68 ≈ 2.12` is
   "useless as an asymptotic, but a valid explicit bound". `F` is not the bound.
   The bound is `X·V(z)·F(s)`, and `V(z) = ∏_{7≤p≤29}(1 − 1/(p−1)) = 0.56030`,
   so `V·F = 1.19001 > 1`: the sieve bound exceeds the trivial `S ≤ X`. The same
   holds at @13 (2.437), @17 (1.980), @19 (1.587) and @23 (1.350).
   `[SCRATCHPAD-GRADE]`, SEC 1. The κ = 1 statement is not merely non-asymptotic
   at those levels; it is worse than counting the whole sequence.
3. **The premise misstates `f₂` at @23 by an order of magnitude.** The brief
   says that at `s = 4.709` "`f₂` is barely positive". Measured
   `f₂(4.7088) = 0.4056` against `F₂ = 1.4878`, a bracket of width `3.67×`.
   `f₂` leaves `β₂` steeply, not shallowly; the repo's own embedded artifact
   already carried `f₂(4.5) = 0.240280` and `f₂(5.0) = 0.578997`
   (`attack-beta2-04-loss-budget.js` OUTPUT §3c, `[CITED]`).
4. **The brief mis-attributes the `2.393×` figure and mis-describes what it
   is.** It is not in `attack-roughpair-error.md` §5. It is in
   `attack-wrongdirection-audit.md` §3.8, tagged there `[ARITHMETIC, unstamped,
   no adversarial pass]`, and it is `β₂/(u*/2) = 4.26645/1.7829 = 2.3930`, a
   **ratio of sieve coordinates**, not a shortfall in a count. `[CITED]`,
   reproduced `[SCRATCHPAD-GRADE]` SEC 5. `attack-roughpair-error.md` §5's own
   numbers are different objects: slack `1.056` at the crossing, `Xmain/T =
   5.631` at `s = β₂`, and the window `s ≲ 2.317` drifting to `1.7829`.
5. **The two siblings define `s` on different sifting depths, and the two
   columns must never be tabled together.** Both write `s = ln D/ln z`, but
   `thm-capK-bv.md` §3 Step 2 takes `z = q_K + 1`, the largest *freshness*
   prime, which at `K = 0` is the level `x` itself; and
   `thm-buchstab-transfer-shallow.md` §3.1 takes `z = q`, the *scour* prime,
   because `P⁻(m) ≥ q` sifts to depth `q`. Same formula, incomparable `z`. The
   κ = 1 column runs `0.81 … 4.58` over @11..@97 and the κ = 2 column runs
   `2.639 … 17.142` over @13..@97, and these describe different sieves of
   different sequences. `[DERIVED]` from both siblings' §1/§3.1.
6. **The sharp instrument costs a hypothesis the siblings did not need.** DH
   Theorem 9.1's remainder is `2 Σ_{m|P(z), m<y} 4^{ν(m)}|r_A(m)|`
   (`[CITED-REPO-PAGE]`, p. 104). At κ = 2 that is free, since `|r_d| ≤ ω(d) ≤
   2^{ν(d)}` and `Σ_{m<y} 8^{ν(m)} ≪ y log⁷ y`, exactly as
   `dhr-verification.md` §3 already worked out `[CITED]`. At κ = 1 it is not
   free: `thm-capK-bv.md`'s remainder is a Bombieri–Vinogradov sum, and BV with
   a `4^ν` divisor weight is not the plain BV that note uses. That is the
   divisor-weight machinery the same note's §7 says belongs "to the linear sieve
   at level `T^{1/2}`, not here". **Its §7 line is confirmed and its scope is
   now visible: the machinery is precisely the price of switching to the sharp
   sieve.** `[DERIVED]`. The standard Cauchy–Schwarz route through BV is
   believed to absorb the weight at a slightly reduced level `[MEMORY]`; no
   source for it was read here.
7. **`β₂` is not touched and is not touchable.** Improving `β₂` is CLOSED
   (`research/REFUTED.md`, 2026-08-18: unimproved since Diamond–Halberstam 2008,
   everything after worse at κ = 2). Nothing below moves it, and no claim here
   bears on twin primes.

**The confirming half, and it is a scope statement about limit theorems only.**
Read as a limit at fixed `s`, the sharp functions widen the range of `s` at
which the two sibling theorems say something non-vacuous, and by a lot:

| | fundamental lemma | sharp sieve | what changed |
|---|---|---|---|
| κ = 1 (`thm-capK-bv`) first non-empty level | `x = 263` `[CITED]` | **@37**, bracket 19.8 wide (**@53** is the first bracket narrower than 2) | 263 → 37 |
| κ = 2 (`thm-buchstab`) first non-empty band | level **131** `[CITED]` | **@23** | 131 → 23 |
| κ = 1 bracket at @97 | none (`s = 4.58 < 10.82`) | **[0.99473, 1.00534]**, width `1.0107×` | vacuous → 1.07% |
| κ = 2 bracket at @97, head prime | none (`s = 17.14 < 22.06`) | **[1.000018, 1.00002]**, at the solver's `10⁻⁶` floor | vacuous → indistinguishable from 1 |

`[SCRATCHPAD-GRADE]`, SEC 1, SEC 2, SEC 3. **Rung: the brackets themselves are
PROVEN, conditional on DH Theorem 9.1 as read at p. 104, and the `s` values are
reproductions of the siblings' own measured columns. The verdict "non-empty" is
a statement about the limit at fixed `s`, and finding 1 says that at every one
of these levels the limit's error term is not yet small.**

**Numeric confidence.**

| claim | confidence | rung |
|---|---|---|
| DH Thm 9.1's error is unwritten and its bare shape exceeds 1 at every reachable level | 0.95 | DERIVED from a page-verified quotation |
| `V·F₁ ≥ 1` at @13..@29, so the κ = 1 upper bound is worse than trivial there | 0.93 | SCRATCHPAD-GRADE, elementary arithmetic |
| the first non-empty κ = 1 level is @37 and the first non-empty κ = 2 band is @23 | 0.85 | SCRATCHPAD-GRADE, the κ = 1 figure from a full sweep of prime levels @11..@103 in `redteam-0828-engine.md` §5.5 on this note's own conventions; moves if the F/f grid or the `s` convention moves |
| the sharp sieve reproduces, and does not disturb, the 2.393 reading | 0.90 | DERIVED; `f₂ = 0` below `β₂` is the whole content |
| this note opens any route | 0.01 | it narrows the scope of two theorems that were already closed as empty |

---

## 1. The two sieve problems, as the siblings state them

Both are taken as given from the siblings and neither is re-derived. Only the
places where the sharp instrument needs something the siblings did not state are
flagged.

**κ = 1, from `thm-capK-bv.md` §1** `[CITED]`. Level `x`, `W = x#`, scour prime
`q` in the prime regime `q³ > W + 1`, `T = ⌊(W∓1)/q⌋`. Sequence
`𝒜 = {m prime : q ≤ m ≤ A, m ≡ c (mod 30)}`, `X = |𝒜|`. Sifting set
`𝒫 = {p prime : 7 ≤ p ≤ x} ∪ {q₁,…,q_K}`, which by that note's fact 1 is exactly
the primes in `[7, q_K]`; one excluded class `ω_p = −2q⁻¹ (mod p)` per prime, so
`κ = 1` and `h(p) = 1/(p−1)`. Level `D` from Bombieri–Vinogradov, at most
`T^{1/2}/(ln T)^B`. Sifting variable `s = ln D/ln q_K`, with `q_0 := x`.
`V(z) = ∏_{7≤p≤q_K}(1 − 1/(p−1)) = 4δ_K`.

**κ = 2, from `thm-buchstab-transfer-shallow.md` §3.1** `[CITED]`. Same level and
tile, scour prime `q` with `x < q ≤ √W`, `T = ⌊(W−1)/q⌋`,
`A_a = {m ≤ T : m ≡ a (mod 30)}`, and for each prime `7 ≤ p < q` the excluded set
`Ω_p = {0, −2q⁻¹}` for `p ≤ y_K` and `{0}` for `p > y_K`. So `z = q`,
`V(z) = ∏_{7≤p≤y_K}(1−2/p)·∏_{y_K<p<q}(1−1/p)`, and
`s = ln D/ln q` with `D = T^{1−ε}`. **The remainder is trivial only in the
formulation that puts the comb inside the sieve;** conditioned on the natal comb
as an ambient set the repo's own bound is `2·3^k` per Legendre term (Comb
Discrepancy Lemma, `natal-cap-25-excess-law.js`). That qualifier is the κ = 2
sibling's §3.3 and it is carried here unchanged. `[CITED]`

**The one place the two must be kept apart.** `z = q_K` in the first and `z = q`
in the second. At `K = 0` the first has `z = x` while the second has `z ≥
nextprime(x)` and runs up to `√W`. Finding 5 of §0.

---

## 2. The instruments, and what this repo actually holds at a page

**What is held.** Diamond–Halberstam, *A Higher-Dimensional Sieve Method*, CUP
Tracts 177, 2008, **Theorem 9.1, p. 104**, `[CITED-REPO-PAGE]` through
`research/history/staging/lit-pdf-halberstam-richert.md` §6.1, which transcribes
an `attestation/` photograph of the page and records the transcription as
VERBATIM:

> **Theorem 9.1.** *Suppose that κ ≥ 1 and that 2κ is an integer. If Ω(κ) holds
> and y is a parameter such that 2 ≤ z ≤ y, then we have*
> (9.9) `S(A,P,z) ≤ XV(z){F_κ(log y/log z) + O((log log y)²/(log y)^{1/(2κ+2)})} + 2 Σ_{m|P(z), m<y} 4^{ν(m)}|r_A(m)|`,
> *and*
> (9.10) `S(A,P,z) ≥ XV(z){f_κ(log y/log z) − O((log log y)²/(log y)^{1/(2κ+2)})} − 2 Σ_{m|P(z), m<y} 4^{ν(m)}|r_A(m)|`,
> *where F_κ and f_κ are the functions in Theorem 6.1, and the constants implied
> by the O-notation depend at most on κ and A.*

This is the right instrument for both halves of the brief, and it removes the
need for the sources the brief named. `κ = 1` satisfies its hypothesis (`2κ = 2`
is an integer), `α₁ = β₁ = 2`, and `F₁, f₁` are the Jurkat–Richert linear-sieve
functions, so `F₁(u) = 2e^γ/u` on `[1,3]` and `f₁(u) = 2e^γ ln(u−1)/u` on
`[2,4]` fall out of the same system. **Halberstam–Richert Thm 8.3/8.4 and
Friedlander–Iwaniec *Opera de Cribro* Thm 11.12/11.13 are `[NOT REACHED]`; they
are named in the brief and neither was opened here, and `lit-pdf-halberstam-
richert.md` §9 records HR 1974 as unreachable by any legal route tried.** The
linear sieve's own sharper error terms (Iwaniec, *Acta Arith.* 37 (1980)
307–320; Iwaniec 1971 Thm 2) are `[NOT REACHED]` and their constants are not
written in any source read in this repo (`dhr-verification.md` §4.2 reads the
`1 + O(u^{−u/2})` form from Wikipedia, not from a book). Anything better than DH
Thm 9.1's error at κ = 1 is therefore outside what this repo can currently
assert.

**The functions.** The `(F_κ, f_κ)` system is Booker–Browning Theorem 3.1,
quoted verbatim in `research/dhr-verification.md` §1.1 `[CITED]`, with
`α₂ = 5.35772744559446184227` and `β₂ = 4.26645028414864191641` rigorous to 20
places (Booker–Browning ancillary table, arXiv:1511.00601, `[CITED]`). The book
prints `β₂ ≈ 4.266` at p. 79, `[CITED-REPO-PAGE]`.

**How the numbers below were got, and the compute rule.** The delay-differential
solver is **copied verbatim** from `research/attack-beta2-04-loss-budget.js` §3,
which is an embedded, `qc`-gated producer (code-sha256 `b289acea0b62b1bc…`,
out-sha256 `b657ec20a0f407bd…`, embedded 2026-08-19). Per the standing compute
rule the artifact's own figures are cited and the copy is recomputed only to
validate itself against them. SEC 0 checks 18 of that artifact's printed
figures; worst absolute disagreement `5.90e−5`, and it sits on the one row where
disagreement is expected, `f₂` evaluated at `β₂` itself, where the two grids read
`1.18e−4` and `5.90e−5` on a quantity that is exactly zero. **Nothing in this
note is read off `f₂` within about 0.02 of `β₂`; the shallowest level column used
is `s = 4.7088`, which is 0.44 clear of the floor.** `[SCRATCHPAD-GRADE]`, SEC 0.

**Two closed forms, and the absence of a third.** `F₁(u) = 2e^γ/u` on `(0,3]`
and `f₁(u) = 2e^γ ln(u−1)/u` on `[2,4]` reproduce from the march to `2.2e−16`
and `1.1e−9`. `F₂(u) = Γ(3)(2e^γ/u)² = 2(2e^γ/u)²` holds **only on `(0,2]`**,
where it reproduces exactly; above `u = 2` the Ankeny–Onishi `σ₂` leaves its
initial data and `F₂ = 1/σ₂` exceeds the naive formula, checked at four points.
`f₂` has **no** elementary closed form anywhere it is positive: the integral
`u²f₂(u) = 2∫_{β₂}^{u} t F₂(t−1) dt` is elementary only while `t − 1 ≤ 2`, that
is `u ≤ 3`, and `β₂ = 4.266 > 3`. Every `f₂` figure below is marched.
`[SCRATCHPAD-GRADE]`, SEC 0. *(This corrects an error made and caught inside
this session: a closed form was written for `f₂` on `(β₂, α₂+1]` using the naive
`F₂`, and it was 6.6% to 20.6% low. It is not in the producer.)*

---

## 3. κ = 1: the `cap_K` sieve at its own `s`

`s = ln W/(4 ln x)` at `K = 0`, `D = T^{1/2}`, worst tail case `T = √W`. The
`sib s` column is `thm-capK-bv.md` §4's table, reproduced to the digit it prints.
`V(z) = ∏_{7≤p≤x}(1 − 1/(p−1))`. `[SCRATCHPAD-GRADE]`, SEC 1, except the @31 and
@37 rows, which are from `redteam-0828-engine.md` §5.5's sweep of every prime
level @11..@103 on these same conventions, where the crossing sits.

| level | `s` | sib `s` | `V(z)` | `F₁(s)` | `V·F₁` | `f₁(s)` | `F/f` | verdict |
|---|---|---|---|---|---|---|---|---|
| @11 | 0.8075 | 0.81 | 0.75000 | n/a | n/a | n/a | n/a | **EMPTY**, `s < 1`, Thm 9.1 needs `z ≤ y` |
| @13 | 1.0049 | 1.00 | 0.68750 | 3.54482 | 2.43706 | 0 | n/a | **EMPTY**, worse than trivial |
| @17 | 1.1597 | 1.16 | 0.64453 | 3.07150 | 1.97968 | 0 | n/a | **EMPTY**, worse than trivial |
| @19 | 1.3659 | 1.37 | 0.60872 | 2.60785 | 1.58746 | 0 | n/a | **EMPTY**, worse than trivial |
| @23 | 1.5327 | 1.53 | 0.58105 | 2.32410 | 1.35043 | 0 | n/a | **EMPTY**, worse than trivial |
| @29 | 1.6772 | 1.68 | 0.56030 | 2.12388 | 1.19001 | 0 | n/a | **EMPTY**, worse than trivial |
| @31 | 1.8946 | n/a | 0.54163 | 1.88014 | 1.01833 | 0 | n/a | **EMPTY**, worse than trivial, by a hair |
| @37 | 2.0518 | n/a | 0.52658 | 1.73612 | 0.91421 | 0.08765 | 19.81 | **BRACKETED**, and the bracket is 19.8 wide |
| @53 | 2.8292 | n/a | 0.48087 | 1.25908 | 0.60545 | 0.76031 | 1.6560 | **BRACKETED** |
| @97 | 4.5756 | 4.58 | 0.42440 | 1.00534 | 0.42667 | 0.99473 | **1.0107** | **ASYMPTOTIC-grade** |
| @199 | 8.9058 | 8.91 | 0.36607 | 1.00000 | 0.36607 | 1.00000 | 1.0000 | ASYMPTOTIC-grade |
| @401 | 15.7128 | 15.71 | 0.32701 | 1.00000 | 0.32701 | 1.00000 | 1.0000 | ASYMPTOTIC-grade |
| @1009 | 34.8128 | 34.81 | 0.28482 | 1.00000 | 0.28482 | 1.00000 | 1.0000 | ASYMPTOTIC-grade |

Four readings.

- **First non-empty level: @37** (`s = 2.0518`, `V·F₁ = 0.914`,
  `f₁ = 0.0877`), the first level above the `V·F₁ < 1` crossing at @31 and above
  `f₁`'s positivity threshold `s = 2`. Against `thm-capK-bv.md` §4's `x = 263`
  for the fundamental lemma's own factor-below-1 threshold, so scope moves from
  `W ≈ 10^105.6` to `W ≈ 10^12.9`. The bracket at @37 is `F₁/f₁ = 19.8` wide and
  is not an asymptotic; @53, at `1.656`, is the first level where the bracket is
  narrower than a factor 2, and it is the level §5's verdict table samples.
- **The @13..@29 rows are the refutation of the brief's premise, in the brief's
  own example.** `V·F₁ ≥ 1` means the certified upper bound exceeds `X`, which
  is the count of the whole sequence. The measured truth at these levels is
  about `X·V` (`thm-capK-bv.md` §5 Block 4 measures `exact/pred1` between 0.9986
  and 1.0050, `[CITED]`), so at @29 the trivial bound is `1/V = 1.785×` the truth
  and the sharp sieve bound is `F₁ = 2.124×` the truth. `[DERIVED]`
- **The bracket at @97 is 1.07% wide** and is the widest ASYMPTOTIC-grade row.
  It is a limit statement; finding 1 of §0 says the limit has not arrived.
- **The deep ladder is untouched, exactly as the sibling says.** At @97's own
  `K*`, `ln q_{K*}/ln T = 0.562` (`natal-cap-28` READINGS via
  `thm-capK-bv.md` §0, `[CITED]`), so under BV `s = 0.890 < 1` and Theorem 9.1
  has no statement whatever; at the 90% depth `s = 0.614`. Under EH the levels
  become `s = 1.779` and `1.227`, giving upper bounds with factors `F₁ = 2.002`
  and `2.903` and still no lower bound, since `f₁ = 0` below `u = 2`.
  `[SCRATCHPAD-GRADE]`, SEC 1.

---

## 4. κ = 2: the conditioned freshness sieve

`s_head = ln(W/q₀)/ln q₀` at the shallowest scour prime `q₀ = nextprime(x)`, the
best case for the hypothesis; `D = T^{1−ε}`, `z = q`. The `sib` column is
`thm-buchstab-transfer-shallow.md` §4's table.
`V(z) = ∏_{7≤p≤x}(1 − 2/p)` at `K = 0`, `q = q₀` (the one-class product is
empty there). `[SCRATCHPAD-GRADE]`, SEC 2.

| level | `q₀` | `s_head` | sib | `V(z)` | `F₂` | `V·F₂` | `f₂` | `F/f` | verdict at `q₀` |
|---|---|---|---|---|---|---|---|---|---|
| @13 | 17 | 2.6390 | 2.639 | 0.49451 | 3.68684 | 1.82316 | 0 | n/a | **EMPTY**, worse than trivial |
| @17 | 19 | 3.4637 | 3.464 | 0.43633 | 2.28589 | 0.99740 | 0 | n/a | UPPER ONLY, and by 0.26% |
| @19 | 23 | 4.1308 | 4.131 | 0.39040 | 1.75570 | 0.68542 | 0 | n/a | UPPER ONLY (`s ≤ β₂`) |
| @23 | 29 | 4.7088 | 4.709 | 0.35645 | 1.48779 | 0.53032 | **0.405614** | 3.6680 | **BRACKETED** |
| @29 | 31 | 5.5785 | 5.578 | 0.33187 | 1.21681 | 0.40382 | 0.794049 | 1.5324 | **BRACKETED** |
| @53 | 59 | 10.0190 | 10.019 | 0.24540 | 1.00004 | 0.24541 | 0.999996 | 1.0000 | ASYMPTOTIC-grade |
| @97 | 101 | 17.1422 | 17.142 | 0.19149 | 1.00002 | 0.19149 | 1.000018 | 1.0000 | ASYMPTOTIC-grade |

**At @97 the bracket is `[1.000018, 1.00002]`, which is the solver's `10⁻⁶`
floor and not a measurement of the true width.** The true width there is
`1 + O(e^{−17})`, below `10⁻⁷` `[MEMORY, from `F, f = 1 + O(e^{−u})` in
Booker–Browning Thm 3.1's own statement, `[CITED]`]`. The honest reading is
"indistinguishable from 1 at the resolution available here".

**`s_head` is the best case, and the scour is mostly not at its head.** `s(q) =
ln W/ln q − 1`, which falls to exactly 1 at `q = √W` at every level. There
`f₂ = 0` and `F₂(1) = 2(2e^γ)² = 25.37775`. Whether the upper bound is still
worth anything at the deep end is a race between `V(q)`, falling like
`ln x/ln q`, and `F₂(s(q))`, rising like `2(2e^γ/s)²`. Swept:
`[SCRATCHPAD-GRADE]`, SEC 2b. `V(q)` is exact to `q ≤ 2·10⁵` and Mertens-
continued above, flagged.

| level | `√W` | deepest `q` with `V·F₂ < 1` | `s` there | log-depth coverage | tail |
|---|---|---|---|---|---|
| @13 | 173 | none | n/a | 0.00% | exact |
| @17 | 714 | 21 | 3.346 | 5.10% | exact |
| @19 | 3114 | 75 | 2.724 | 26.97% | exact |
| @23 | 14936 | 337 | 2.302 | 41.48% | exact |
| @29 | 80434 | 1922 | 1.988 | 52.90% | exact |
| @53 | 5.71e9 | 2.07e9 | 1.094 | 94.52% | [MERTENS-TAIL] |
| @97 | 1.52e18 | 1.52e18 | 1.000 | 100.00% | [MERTENS-TAIL] |

The nontrivial **upper-bound** band therefore behaves the opposite way from the
lower-bound band: it is a head at @13..@29 and essentially the whole scour by
@53. None of it is a lower bound; `f₂ = 0` at every `q` in those rows except the
`q₀` column of the previous table at @23 and above.

**The lower-bound band, which is what the sibling's "level 131" figure names.**
The hypothesis `s(q) ≥ s*` is `ln q ≤ ln W/(1 + s*)`. `[SCRATCHPAD-GRADE]`,
SEC 3.

| `s*` | least level with a non-empty band | band at @23 | band at @97 |
|---|---|---|---|
| 22.06 (fundamental lemma, `δ = 0.5`) | **@131**, reproducing the sibling | 0 primes, 0.00% | 0 primes, 0.00% |
| `β₂ = 4.26645` (DHR lower bound) | **@23** | 3 primes (29, 31, 37), 7.95% | >17959 primes, 30.37% |
| `1` (DHR upper bound) | @7 | 1739 primes, 100% | 100% |

The `s* = 22.06` row reproduces `thm-buchstab-transfer-shallow.md` §4's "least
level with a non-empty band `x = 131`" exactly, which is the cross-check that
the band computation here is the same one. `[SCRATCHPAD-GRADE]`, SEC 3.

---

## 5. Verdict per theorem per level

Two readings are needed and they disagree, which is the point of §0 finding 1.

**Reading (L), the limit at fixed `s`.** This is what both sibling theorems are.
The verdicts are the tables of §3 and §4: κ = 1 first non-empty at **@37**,
with a 19.8-wide bracket, against the sibling's `x = 263`; κ = 2 first non-empty
at **@23** against the sibling's level **131**. At @97 the κ = 1 bracket is `[0.99473, 1.00534]` and
the κ = 2 bracket at the head prime is `1 ± 10⁻⁶` at the solver's floor.

**Reading (F), a statement at a finite level.** **EMPTY at every level, for both
theorems, under both instruments.** DH Thm 9.1's `O(·)` constant is not written
in the book's own statement, and its bare shape exceeds 1 at every level in the
tables and does not fall below 1 until `log y ≈ 2.1·10¹¹` (κ = 1) or `8.8·10¹⁹`
(κ = 2). `[SCRATCHPAD-GRADE]`, SEC 4. The fundamental lemma at least reaches a
finite-level statement, at `x = 263` and `x = 131` respectively, which is why
the siblings' verdicts stand unchanged as finite-level verdicts and this note
does not repair them.

| level | κ = 1 (L) | κ = 1 (F) | κ = 2 (L), at `q₀` | κ = 2 (F) |
|---|---|---|---|---|
| @13 | EMPTY | EMPTY | EMPTY | EMPTY |
| @17 | EMPTY | EMPTY | UPPER ONLY (0.9974) | EMPTY |
| @19 | EMPTY | EMPTY | UPPER ONLY | EMPTY |
| @23 | EMPTY | EMPTY | BRACKETED, `3.67×` | EMPTY |
| @29 | EMPTY | EMPTY | BRACKETED, `1.53×` | EMPTY |
| @37 | BRACKETED, `19.8×` | EMPTY | not computed | EMPTY |
| @53 | BRACKETED, `1.66×` | EMPTY | ASYMPTOTIC | EMPTY |
| @97 | ASYMPTOTIC, `1.0107×` | EMPTY | ASYMPTOTIC | EMPTY |
| @131 | ASYMPTOTIC | EMPTY | ASYMPTOTIC | EMPTY (FL band opens) |
| @263 | ASYMPTOTIC | EMPTY (FL factor crosses 1) | ASYMPTOTIC | EMPTY |

---

## 6. Consistency with the standing wall figures

**The `2.393` is reproduced and the sharp sieve adds nothing to it.**
`β₂/1.7829 = 2.3930` `[SCRATCHPAD-GRADE]`, SEC 5, against
`attack-wrongdirection-audit.md` §3.8's `2.393` `[CITED]`. The reason the sharp
sieve cannot disturb it is that the sharp sieve **is** the instrument that makes
it true: `f₂(s) = 0` identically for `s ≤ β₂`, so at `s = 1.7829` there is no
κ = 2 lower bound of any size, and at `s = 2.317` (the B8 crossing of
`attack-roughpair-error.md` §5, `[CITED]`) there is still none. **Agreement, not
disagreement, and no new number on that axis.**

| `s` | `F₂(s)` | `f₂(s)` | `F₁(s)` | `f₁(s)` | what it is |
|---|---|---|---|---|---|
| 1.0000 | 25.37775 | 0 | 3.56214 | 0 | deep end of the scour; the "4.266" comparison |
| 1.7829 | 7.98361 | 0 | 1.99795 | 0 | `u*/2`, the census target |
| 2.0000 | 6.34444 | 0 | 1.78107 | 0 | the identity point, TPC at κ = 2 |
| 2.3170 | 4.73619 | 0 | 1.53740 | 0.423332 | B8 crossing, `attack-roughpair-error.md` §5 |
| 4.26645 | 1.68096 | (floor) | 1.01155 | 0.988661 | `β₂` |

**One number the wall notes do not carry, offered without a claim.** The κ = 2
**upper** bound at those coordinates is `F₂(1.7829) = 7.9836` and
`F₂(2.317) = 4.7362`, against `attack-roughpair-error.md` §5's permitted slack of
`1.056` at the crossing. So even the upper-bound half of the sharp sieve, at the
operative `s`, is looser than the slack by a factor `4.49` to `7.56`.
`[SCRATCHPAD-GRADE]`, SEC 5. This is consistent with that note's reading 3
(`Xmain/T = 5.631` at `s = β₂`, on the wrong side already), and it is a second,
independent way of saying the same thing: the wall is the depth, and both sieve
functions confirm it from opposite sides.

---

## 7. What this buys and what it does not

**Buys.**

1. A correct scope line for `thm-capK-bv.md`: as a limit statement at fixed `s`,
   its Theorem C is non-vacuous from **@37**, not from `x = 263`, though the
   bracket there is 19.8 wide and the first bracket narrower than a factor 2 is
   at **@53**; its asymptotic form (bracket within 1.1%) is available at
   **@97**. The `x = 263` figure is a property of the fundamental lemma, not of
   the theorem.
2. A correct scope line for `thm-buchstab-transfer-shallow.md`: its Theorem 1's
   band is non-empty from **@23**, not from level 131, and covers 30% of the
   log-depth at @97 rather than 0%. Its "`q ≤ W^{1/23}`" is a property of the
   fundamental lemma; the sieve-theoretic threshold is `q ≤ W^{1/5.26645}`.
3. The instrument ledger, which is the disconfirming half and the more useful
   one: for a **finite-level** statement the fundamental lemma is better than
   anything sharp this repo can currently cite, because its constants are
   written and the sharp theorem's are not. Any future attempt to price a
   finite-level envelope should go to the fundamental lemma or to an explicit
   Selberg upper bound, not to `F_κ` and `f_κ`.
4. Three corrections to the brief and one to the corpus, §0 findings 2, 3, 4 and
   §8.

**Does not buy.**

1. **Anything finite.** §5, reading (F). Both theorems stay EMPTY at every level
   as finite-level statements.
2. **Anything in the deep ladder.** At @97's `K*`, κ = 1 has `s = 0.890 < 1`
   under BV and Theorem 9.1 has no statement at all. At the deep end of the
   scour, κ = 2 has `s = 1`, far below `β₂`, and `f₂ = 0`.
3. **Anything about `β₂`.** CLOSED in `REFUTED.md` and untouched here.
4. **Anything about the twin question.** `cap_K` is an upper bound on comb-slot
   kills and `B(q,K)` is a correction to a ratio. No statement here bears on
   infinitude and none is claimed.
5. **Any repair of the κ = 1 remainder.** The `4^ν` weight (§0 finding 6) is an
   unpaid bill; the Cauchy–Schwarz route through BV is `[MEMORY]` and no source
   was read.

---

## 8. Defects noticed in passing

- The brief attributes the `2.393×` figure to `attack-roughpair-error.md` §5. It
  is in `attack-wrongdirection-audit.md` §3.8, and it is a ratio of sieve
  coordinates, not a shortfall in a count.
- `research/dhr-verification.md` §4.1's application line writes "Positivity needs
  `s ≥ max(9κ+1, 9κ + 10 log K + δ)`", and the same file's §0 row 3 rounds it to
  "`≈ 19+ε`". At κ = 2 with `K = 7/5` the second branch is `21.365`, above
  `9κ+1 = 19`, so `19+ε` understates the binding threshold by more than 2. The
  κ = 2 sibling has this right at `22.06` for `δ = 0.5`; the standing file does
  not. One line, not audited further.
- `research/covering-dive.md` §1.3 says that for κ = 2 "the linear sieve's `f`,
  `F` functions and their `u > 2` positivity threshold simply do not apply". True
  of `F₁, f₁`, but the sentence reads as if no `F, f` pair exists at κ = 2, which
  is the opposite of the DHR situation the same repo documents at
  `dhr-verification.md`. Wording only.
- `attack-wrongdirection-audit.md` §3.8's `2.393` is tagged `[ARITHMETIC,
  unstamped, no adversarial pass]` in its own text. It reproduces here to four
  digits, which is one pass, and the tag can be softened by whoever owns that
  file. This note edits nothing.
- The κ = 1 sibling's §7 first bullet says unweighted BV suffices "and the
  divisor-weight machinery belongs to the linear sieve at level `T^{1/2}`, not
  here". Correct as written and confirmed. Worth adding there that switching to
  the linear sieve is exactly what makes the bill come due, per §0 finding 6.

---

## 9. What would falsify this, and whether that check has run

| claim | what would falsify it | has the check run |
|---|---|---|
| DH Thm 9.1's error constant is unwritten, so reading (F) is EMPTY at every level | the book carrying an explicit constant elsewhere (Ch. 9's proof, or an appendix), or a published explicit-constant restatement of `F_κ, f_κ` at finite level | **NOT RUN.** Only p. 103, 104, 106 and 79 of the book are photographed in `attestation/`; the rest is `[NOT REACHED]` |
| the bare shape `(loglog y)²/(log y)^{1/(2κ+2)}` first drops below 1 at `log y ≈ 2.1e11 / 8.8e19` | an arithmetic error in the bisection | **RUN**, `[SCRATCHPAD-GRADE]` SEC 4, and the peak location `log y = e^{4κ+4}` is a one-line derivative check that agrees |
| `V·F₁ ≥ 1` at @13..@29, so the κ = 1 bound is worse than trivial | a different `V(z)`, i.e. a different `K` or a different `z` convention than `thm-capK-bv.md` §3 Step 2's `z = q_K + 1` | **RUN at `K = 0` only.** At larger `K`, `V` falls and `s` falls, and both move `V·F` in opposite directions; the sweep was not done |
| first non-empty κ = 1 level @37, first non-empty κ = 2 band @23 | a different `D` (the κ = 1 row uses BV's `T^{1/2}`; EH would raise `s` by a factor 2), a different worst-case `T`, or a non-emptiness criterion other than this note's own (`V·F₁ < 1` and `f₁ > 0`) | **PARTIALLY RUN.** The `T^{1/2}` and worst-tail choices are the siblings' own; no sensitivity sweep in `D` was done. The level sweep itself is RUN at every prime level @11..@103 (`redteam-0828-engine.md` §5.5), which is what moved this row from @53 to @37: this note's own §3 table skipped @31..@47, where the crossing sits |
| the `F/f` brackets themselves | a solver error | **RUN**, 18 figures against an embedded, `qc`-gated artifact, worst absolute disagreement `5.9e−5` on the one row where zero is the true value; plus three independent closed-form checks |
| `f₂` figures near `β₂` | the numerical floor being mistaken for a value | **RUN and the floor is stated.** The two grids disagree by a factor 2 at `β₂`; nothing is read within 0.02 of it |
| the Mertens continuation of `V(q)` above `q = 2e5` (the @53 and @97 rows of §4's second and third tables) | the true product departing from `V(2e5)·ln(2e5)/ln q` by enough to move a crossing | **NOT RUN.** Mertens' error is `O(1/log)` and the crossings at @53 and @97 are not close, but no bound was computed |
| the κ = 1 remainder under the `4^ν` weight | a demonstration that divisor-weighted BV at level `T^{1/2}/(ln T)^B` fails, or a source giving it | **NOT RUN**, and this is the largest unpaid item; §0 finding 6 |
| that `κ = 1` is the right dimension for the `cap_K` sieve at all | the sibling's §1 classification failing | **RUN there**, not re-checked here; taken as given per the brief |
| that this note opens no route | a κ = 2 lower bound below `β₂` | **CLOSED, not open.** `REFUTED.md`, "improving β₂ itself", 2026-08-18 |

---

## 10. Source ledger

| item | tag | where |
|---|---|---|
| DH Thm 9.1, p. 104, with `F_κ`, `f_κ`, the `4^ν` remainder and the `(loglog y)²/(log y)^{1/(2κ+2)}` error | `[CITED-REPO-PAGE]` | `history/staging/lit-pdf-halberstam-richert.md` §6.1, transcribing an `attestation/` photograph, read 2026-08-14 |
| `β₂ ≈ 4.266` in print, p. 79 | `[CITED-REPO-PAGE]` | same file §6.2 |
| `(F_κ, f_κ, σ_κ)` system; `α₂`, `β₂` to 20 places | `[CITED]` | `research/dhr-verification.md` §1.1, Booker–Browning arXiv:1511.00601 ancillary table |
| `F₁(20)`, `f₁(20)`, `F₂(20)`, `f₂(20)`, the retention curve at `u = 4.2665 … 8` | `[CITED]`, embedded artifact | `research/attack-beta2-04-loss-budget.js` OUTPUT §3a/3b/3c, embedded 2026-08-19 |
| the DDE solver | copied verbatim from the same artifact, re-validated | `research/attack-beta2-04-loss-budget.js` §3 `solveDDE` |
| κ = 1 sieve problem, `s` table, `x = 263`, `K_dim = 1.2000`, `ln q_{K*}/ln T = 0.562` | `[CITED]` | `history/staging/thm-capK-bv.md` §1, §4, §5, §0 |
| the @31 and @37 rows of §3, and the `x = 263` crossing | `[CITED]`, adversarial re-derivation | `history/staging/redteam-0828-engine.md` §3.2, §5.5 |
| κ = 2 sieve problem, `s_head` table, level 131, `K = 7/5`, `s ≥ 22.06`, the `2·3^k` comb qualifier | `[CITED]` | `history/staging/thm-buchstab-transfer-shallow.md` §3.1, §3.4, §4, §3.3 |
| `2.393 = β₂/(u*/2)` | `[CITED]`, tagged unstamped at source | `history/staging/attack-wrongdirection-audit.md` §3.8 |
| slack 1.056, `Xmain/T = 5.631` at `β₂`, window `s ≲ 2.317` drifting to 1.7829 | `[CITED]` | `history/staging/attack-roughpair-error.md` §5 |
| Jurkat–Richert / Rosser–Iwaniec linear sieve, `f(u) = 2e^γ ln(u−1)/u`, positivity iff `u > 2` | `[CITED]` through Granville, *Acta Arith.* 205 (2022) 1–19 | `research/covering-dive.md` §1.2 |
| "improving `β₂` itself" is CLOSED | `[CITED]` | `research/REFUTED.md`, 2026-08-18 |
| HR *Sieve Methods* Thm 8.3/8.4; FI *Opera de Cribro* Thm 11.12/11.13; Iwaniec 1971/1980 error terms | `[NOT REACHED]` | named in the brief, not opened here; `lit-pdf-halberstam-richert.md` §9 records HR 1974 unreachable |
| every table in §3, §4, §5, §6 | `[SCRATCHPAD-GRADE]` | `history/staging/thm-sharp-sieve-range.js`, SEC 0–5 |
