# Attack 2: the 35 per cent of square-root cancellation, priced in its owning convention

<!-- ledger
id: Q-sqrt-cancellation
status: CLOSED
todo: none
question: Can the 35 per cent of square-root cancellation be bought from the literature that owns the sum?
verdict: Not reached, and the best in print is one sixth of the way: the sum is a trilinear form with Kloosterman fractions, Duke-Friedlander-Iwaniec 1997 evaluates at gamma = 1.009638 (worse than trivial) and Bettin-Chandee 2015 at 0.970624 against the needed 0.824975, and feeding Bettin-Chandee into the vector sieve returns exponent 5.090707, worse than the 4.266450 already held.
-->

**HEADLINE. The 35 per cent is not reached and the best in print is 5.88 per
cent, one sixth of the way. The sum has a name in the literature — it is a
trilinear form with Kloosterman fractions — and the two theorems that own it,
Duke–Friedlander–Iwaniec 1997 and Bettin–Chandee 2015, evaluate in our exact
configuration at `γ = 1.009638` (worse than trivial) and `γ = 0.970624` against
the needed `γ ≤ 0.824975`. In `θ_total` currency the whole family buys
`1.000000 → 1.030303` of the `1.000000 → 1.208983` that is needed. Feeding
Bettin–Chandee into the vector sieve gives exponent `5.090707`, which is worse
than the `4.266450` the corpus already has, so this is not a route below 4.2665.
Three things are new and load-bearing: the reduction of the remainder to a
Kloosterman-fraction form is now VERIFIED exactly rather than asserted; the
h-sum is shown to be free, which is what makes the trilinear theorem the right
one; and the position-uniformity gap is priced by the source itself —
Bettin–Chandee's own Remark 1 admits our window phase and charges
`(1 + hx/MN)^{1/2}`, which is `O(1)` only while `x ≪ H^{1.212157}`, whereas our
`x` runs to `exp(H^{0.2344})`.**

Script: `research/attack-sqrt-cancellation.js` — 100.5 s, exit 0, OUTPUT block
written by `research/qc/embed.js` (code-sha256 `2f3fa924e30f5079…`, out-sha256
`af65922672ac6eba…`), re-verified with `--check` after the readings were
written. Every figure below is the machine's.

---

## 1. The sum, with every quantifier fixed

This project's errors are quantifier errors, so the statement is given in the
order fixed / for-all / summed, and nothing is left implicit.

> **FIXED.** `z ≥ 2`; `P(z) = ∏_{2 < p < z} p`; `H = z^{β₂}` with
> `β₂ = 4.26645028414864191641`; the shift is 2.
>
> **FIXED.** `λ⁺, λ⁻` the Rosser–Iwaniec linear-sieve weights, `|λ| ≤ 1`,
> supported on squarefree `d | P(z)`, of levels `D⁺ = H^a` and `D⁻ = H^b`.
>
> **FOR ALL** `x`, the window position. The window is the `H` integers
> `(x, x+H]`, and `x` ranges over `[0, P(z))`.
>
> **SUMMED OVER** `d₁ ≤ D⁺` and `d₂ ≤ D⁻`, both dividing `P(z)`. Coprimality is
> automatic and is not a hypothesis: `g | n` and `g | n+2` with `g` odd forces
> `g = 1`, so a pair with a common factor carries no term at all.
>
> **THE SUM.**
> `R(x) = Σ_{d₁,d₂} λ^A_{d₁} λ^B_{d₂} · r_{d₁,d₂}(x)`, where
> `r_{d₁,d₂}(x) = #{n ∈ (x, x+H] : d₁ | n, d₂ | n+2} − H/(d₁d₂)`.
>
> **NEEDED.** `sup_x |R(x)| ≪ H/log³H`, for `(A,B) ∈ {(−,+), (+,−)}`. The
> `(+,+)` diagonal is free at `a = 1/2` (`attack-theta-last-gap.md` §2), which
> fixes the working point.

**The working point, re-derived here and not inherited [VERIFIED, §A]:**
`D⁺ = H^{0.500000}`, `D⁻ = H^{0.712157}`, `θ_total = 1.212157`; the
unconstrained break-even re-derives at `1.208983` with `K = 5.1580646803` at
`b/a = 1.3130863738`. Modulus product `m = d₁d₂ ≤ H^{1.212157}`, **longer than
the window by `H^{0.212157}`**. Pair count `H^{1.212157}`, requirement `≪ H`, so
`γ = log|R|/log(pair count) ≤ 0.824975`, a saving of `H^{0.212157}` against the
square-root saving `H^{0.606079}`: **35.0 per cent of square root**.

**Two facts about the shape that decide which theorems can be quoted.**

- **The h-sum is free [VERIFIED, §A].** For `m > H` the class holds 0 or 1
  point, so the sawtooth needs harmonics to `h ~ m/H` and its coefficients are
  flat at `H/m` there. With `A := m/H ≤ H^{0.212157}` and `‖ν‖ = A^{−1/2}`,
  `‖α‖‖β‖‖ν‖(AMN)^{1/2} = MN = H^{1.212157}` **exactly** — the `L²`-normalised
  trivial bound of the *trilinear* form is the pair count, with no bookkeeping
  loss. An average over `h` therefore costs nothing, which is why the trilinear
  theorem and not the bilinear one is the right instrument.
- **The support's sparsity is a constant, not a power.** `attack-theta-margin.js`
  §F measures `#smooth ≤ D⁺ / D⁺ = 0.0695` and `#smooth ≤ D⁻ / D⁻ = 0.0100` at
  `z = 307`, both rising to positive limits (Dickman `ρ` at fixed `u·a = 2.13`,
  `u·b = 3.04`). So `‖α‖² = c₁M`, `‖β‖² = c₂N` and no exponent is bought from
  the sieve support.

**And the size of `x`, which is the number that kills the citations.** The
certificate is needed at every position up to `P(z)`, and `log P(z) = θ(z) ~ z`,
not `log z` (`research/qc/units.js` §1). Measured ratios `log x_max / log H`:
`2.116, 5.129, 12.565, 34.192` at `z = 31, 101, 307, 1009` **[VERIFIED, §A]**.
So `x ~ exp(H^{1/β₂}) = exp(H^{0.2344})`.

## 2. The reduction to a Kloosterman fraction, verified rather than asserted

`attack-theta-last-gap.md` §6(C1) asserted a reciprocity step. It is now checked
exactly, in BigInt, over **2655 random squarefree coprime pairs and window
positions** built from the odd primes below 20 **[VERIFIED, §B]**:

| claim | result |
|---|---|
| `c_w/(d₁d₂) ≡ −w/(d₁d₂) − 2·inv(d₁ mod d₂)/d₂ (mod 1)` | 2655 exact, **0 failures** |
| closed-form window count = brute force | 2655 exact, **0 failures** |
| at `w ≡ 0 (mod d₁d₂)` the phase is the pure fraction | 2655 exact, **0 failures** |

Hence, with `c_h` the Vaaler coefficients,

    R(x) = Σ_{0<|h|≤A} c_h · Σ_{d₁,d₂} λλ · e(−h x/(d₁d₂)) · e(−2h·inv(d₁)/d₂).

**The Kloosterman-fraction numerator is `2h ≤ 2H^{0.212157}`, which is small.
All of the position dependence is the single factor `e(−hx/(d₁d₂))`, and at the
positions `x ≡ 0 (mod d₁d₂)` — which exist for every `z`, take `x = 0` or any
multiple of `P(z)²` — it is identically 1.** So a bound on the pure trilinear
Kloosterman-fraction sum is **necessary**, and the published theorems apply to
that sub-case verbatim. That is what makes this a checkable comparison rather
than an analogy.

## 3. Searching the owning convention, not ours

Per `research/SEARCH-CONVENTIONS.md` §1, the object is not searched under our
words. **Its owning convention is "bilinear (trilinear) forms with Kloosterman
fractions"** — the phrase `Σ α_m β_n e(a·m̄/n)` — with the level-of-distribution
literature as the neighbouring convention. §1's table carries no row for this
object, and that is stated rather than hidden; this report proposes one in §7.
House terms translated before searching: window position → the shift `a` in a
Kloosterman fraction / uniformity in the residue class; sieve remainder at level
beyond the window → moduli exceeding the length of the sum.

**Channels and calibration probes, all run in this session.**

| channel | calibration (known positive) | result |
|---|---|---|
| WebSearch | `Duke Friedlander Iwaniec "Bilinear forms with Kloosterman fractions" Inventiones 1997` | returns `link.springer.com/article/10.1007/s002220050135`, Invent. Math. **128** (1997) 23–43, as first hit. **PASS** |
| arXiv API `export.arxiv.org/api/query` | `id_list=1407.4897` | returns *Variants of the Selberg sieve, and bounded intervals containing many primes*. **PASS**. (`http://` returns 301; the channel is only alive over `https`, which is why an earlier session read it as broken.) |
| arXiv API, search | `all:"Kloosterman fractions"`, 15 results | returns 1502.00769, 2601.00292, 2604.25177, 1811.08672 among others. **PASS** |
| OpenAlex API | `/works/W2581797856` | returns *Le crible à vecteurs*, 1996, 10 citations — the same known positive the previous report calibrated on. **PASS** |
| OpenAlex, citation filter | `cites:W2075483325` (DFI 1997) | **77 citing works enumerated**, titles read. **PASS** |
| PDF of record | arXiv:1502.00769v1, downloaded (310,909 bytes, 31 pp., PDF 1.4), pp. 1–2 read with `pdftotext` | (1.1), Theorem 1 and Remark 1 read verbatim. **PASS** |

**A published result retracted, and it matters here.** arXiv:2601.00292,
*Bilinear forms with Kloosterman fractions and applications* (submitted 1 Jan
2026), claimed a balanced-case saving of `N^{1/12}` against DFI's `N^{1/48}`.
Its v2 comment, read from the arXiv API this session, is: *"We accidentally
missed a factor of L^2 in equation (2.53), which turns L^5 into L^7. The rest of
the argument is still valid, but does not lead to an improved bound as
claimed."* **So DFI 1997 and Bettin–Chandee 2015 are still the record, and any
future reader tempted by that abstract should stop at the comment.**
**[PROVEN, the authors' own withdrawal notice; provenance: arXiv API entry for
2601.00292v2.]**

## 4. The candidates, reported as exponents

All evaluated at the working point `M = H^{0.5}` (the inverted variable `d₁`),
`N = H^{0.712157}` (the modulus `d₂`), `A = MN/H = H^{0.212157}`, `|ϑ| = 2`, so
the source's own `|ϑ|A/MN = 2/H = O(1)`.

| bound | exponent of `H` | `γ` | saving | % of √ | verdict |
|---|---|---|---|---|---|
| trivial, `|r| ≤ 1` | 1.212157 | 1.000000 | — | 0.00 | `θ_total ≤ 1` |
| **DFI 1997 (1.1)** | 1.223840 | 1.009638 | −0.011683 | −1.93 | **worse than trivial here** |
| **Bettin–Chandee 2015 Thm 1** | **1.176550** | **0.970624** | **0.035608** | **5.88** | nontrivial, short |
| **needed** | **1.000000** | **0.824975** | **0.212157** | **35.00** | break-even |
| square-root cancellation | 0.606079 | 0.500000 | 0.606079 | 100.00 | far more than needed |

**[VERIFIED, §C.]** The two source statements, read from the PDF of record
(arXiv:1502.00769v1, pp. 1–2):

- DFI, quoted there as (1.1):
  `B_a(M,N) ≪ ‖α‖‖β‖(a + MN)^{3/8}(M+N)^{11/48+ε}`.
- Bettin–Chandee, Theorem 1:
  `B(M,N,A) ≪ ‖α‖‖β‖‖ν‖(1 + |ϑ|A/MN)^{1/2}[(AMN)^{7/20+ε}(M+N)^{1/4} + (AMN)^{3/8+ε}(AN+AM)^{1/8}]`.

**Configuration match, item by item.** Arbitrary bounded coefficients in all
three variables: **match** (this is exactly why DFI/BC and not Deshouillers–
Iwaniec, whose spectral bounds want smoothness or special structure in the
weights — BC's own p. 1 says so). Coprimality `(m,n)=1`: **match**, and forced
rather than assumed. Dyadic ranges: **match** after a `log³` decomposition, and
the top block is the worst because `A' = M'N'/H` shrinks with the block.
Numerator `a`: **match at the aligned positions** (`a = 2h ≪ MN`), **mismatch in
general** (§5). Interval length versus modulus: **not a hypothesis of these
theorems at all**, which is the reason they are quotable here while the
level-of-distribution literature is not.

**Why DFI is worse than trivial, named.** DFI beats `‖α‖‖β‖(MN)^{1/2}` exactly
when `(M+N)^{11/48} < (MN)^{1/8}`, i.e. when `b/a < 6/5 = 1.2`. Our splits are
`b/a = 1.313090` at the optimum and `1.424315` with the diagonal freed. **The
mismatch is the unbalance of the two sieve levels, not the coefficients and not
the phase.** Bettin–Chandee carries no such restriction and does save.

**The same table in `θ_total` currency — the largest level product each bound
supports [VERIFIED, §C]:**

| bound | balanced `b/a = 1` | optimal split `b/a = 1.3131` |
|---|---|---|
| trivial | 1.000000 | 1.000000 |
| DFI 1997 | 1.010526 | 0.994933 |
| **Bettin–Chandee 2015** | **1.030303** | 1.009598 |
| needed | 1.208983 | 1.208983 |
| square-root | 2.000000 | 2.000000 |

A balanced split is not free: at `b/a = 1` the threshold constant is
`2(1+√e) = 5.297443` and the break-even rises to `1.241651`.

**The neighbouring convention, for completeness, and it is all below the window
length.** Best levels of distribution in the well-factorable line, abstracts read
from the arXiv API this session: Bombieri–Friedlander–Iwaniec `x^{4/7−ε}`;
Maynard, *Primes in arithmetic progressions to large moduli II*, arXiv:2006.07088,
`x^{3/5−ε}` with well-factorable weights, *"This has consequences for the level
of distribution for sieve weights coming from the linear sieve"* (superseded
2026-08-19: Pascadi arXiv:2505.00653 Thm 1.3 gives `x^{5/8−ε}`
triply-well-factorable, `x^{3/5−ε}` for upper-bound linear-sieve weights —
preprint; every level is still below `x¹` so this file's conclusion stands;
`lemmaV-neighbours.md`); Fouvry–
Radziwiłł, *Level of distribution of unbalanced convolutions*, arXiv:1811.08672,
`x^{1/2+1/66−ε}`; arXiv:2604.25177 (2026) improving the `N`-range there and the
`Q`-range to `X^{45/89−ε}`. **Every one of these is a level below `x^1`, i.e.
modulus below the length of the sum. Our requirement is modulus at
length^{1.2122}. Even Elliott–Halberstam is `length^{1−ε}`, so the level/length
currency puts our need strictly beyond EH** — which is why the correct home is
the Kloosterman-fraction convention, where the modulus is not constrained by the
length, and not the level-of-distribution convention.

## 5. The quantifier, priced by the source itself

This is the part that is genuinely new and it comes from the paper, not from us.
**Bettin–Chandee's Remark 1** (same PDF, p. 2) states that the argument of the
exponential may be perturbed by `f_{a,ϑ}(x,y) ∈ C¹` with
`∂f/∂x ≪ X/(x²y)` and `∂f/∂y ≪ X/(xy²)`, and the same bound (1.2) holds with
`(1+|ϑ|A/MN)^{1/2}` replaced by `(1 + (|ϑ|A + X)/MN)^{1/2}`.

**Our window factor `e(−hx/(d₁d₂))` is exactly that shape, with `X = h·x`.** So
the published theorem covers the position-uniform sum verbatim and charges

    (1 + h x / MN)^{1/2} ,   which is O(1) only while  x ≪ H^{1.212157}/h .

Our `x` runs to `P(z)`, so the factor is `exp(H^{0.2344}/2)` **[VERIFIED, §C]**.

**Consequence, and it revises the corpus's framing.** The gap is not one gap. It
is an exponent gap of `H^{0.176550}` at the aligned positions, and separately a
quantifier gap that the owning convention already knows how to state and prices
at an exponential of a power of `H`. **The quantifier is the larger of the two,
and `attack-theta-last-gap.md` §6(C1)'s "the quantifier is discharged at no
cost" is too optimistic**: it is discharged at no cost only in the sense that
absolute values in `x` are available, which returns the trivial bound. Charged
inside a nontrivial estimate, it costs what Remark 1 says it costs.

## 6. Does anything reach `γ ≤ 0.824975`? No, and here is the price of the miss

**Nothing does.** The best available is `γ = 0.970624` (Bettin–Chandee, aligned
positions only), delivering **16.8 per cent of the required saving**. The
residual gap is `H^{0.176550}`, and the mismatch is **structural on the
quantifier and technical on the exponent**:

- *technical*: the exponent shortfall is a matter of the constants `7/20` and
  `1/4` in a theorem whose whole history is people improving exactly those. DFI's
  `3/8 → 7/20` was a 6.7 per cent cut in 18 years, and a further **33.8 per cent**
  cut is needed to reach break-even.
- *structural*: the uniformity in `x`. No amount of improving `7/20` touches
  `(1 + hx/MN)^{1/2}`.

**What it would take, stated as an exponent in a published shape [VERIFIED, §E].**
For a bound `‖α‖‖β‖‖ν‖(AMN)^κ (M+N)^λ`, the requirement at split ratio `r` is
`1/2 + κ(2θ−1) + λθ·r/(1+r) ≤ 1`. Then:

| `κ` | `λ` | `θ` at `b/a = 1` | `θ` at `b/a = 1.313` | source |
|---|---|---|---|---|
| 3/8 | 11/48 | 1.012048 | 0.994213 | DFI exponents forced into this shape |
| **7/20** | **1/4** | **1.030303** | 1.009598 | **Bettin–Chandee 2015** |
| 1/4 | 1/4 | 1.200000 | 1.168371 | hypothetical |
| 1/4 | 0 | 1.500000 | 1.500000 | hypothetical |
| 0 | 0 | ∞ | ∞ | pure `L²` / random signs |

Holding `λ = 1/4`, break-even needs `κ ≤ 0.231615`. **And note the third row: a
clean quarter-power main term with the `(M+N)^{1/4}` factor left alone reaches
`θ = 1.200000`, which is `0.041651` short of the balanced break-even
`1.241651`. So the `(M+N)` factor has to move too — the main exponent alone
does not close it even at `1/4`.**

**And the decisive row: what the route would produce if we used the best in
print.** Minimising the vector-sieve threshold `u` subject to each bound, with
the linear sieve's validity ranges enforced **[VERIFIED, §D]**:

| bound | best `u` | at | verdict |
|---|---|---|---|
| trivial | 5.158065 | `θ = 1.000000` | worse than `β₂` |
| DFI 1997 | 5.173497 | `θ = 0.999150` | worse than `β₂` |
| **Bettin–Chandee 2015** | **5.090707** | `θ = 1.017000` | **worse than `β₂ = 4.266450`** |
| square-root | 2.579033 | `θ = 2.000000` | beats `β₂` |

**Said plainly, as the brief asks: this is not a route to an exponent below
4.2665. Loaded with the best published bilinear/trilinear Kloosterman-fraction
estimate, the vector sieve returns 5.090707, worse than the 4.266450 the corpus
already has.** What remains, precisely: (i) a main exponent `κ ≤ 0.231615` in the
Bettin–Chandee shape, or an equivalent trade against `λ`; and (ii) a version
valid for `X = hx` unbounded, which Remark 1 shows is a real and separate
requirement rather than a technicality.

**The one direction this report opens.** The Rosser–Iwaniec weights are not
themselves well-factorable, but Iwaniec (*A new form of the error term in the
linear sieve*, Acta Arith. **37** (1980) 307–320) constructs a well-factorable
variant, and Maynard's `x^{3/5}` is built on exactly that. Well-factorability
would let `d₁` and `d₂` each be split, turning our trilinear form into a five-fold
one — and Bettin–Chandee's gain over DFI came precisely from *one* extra
average. **[INFERRED; not attempted here, and the honest caveat is that the
extra averages are inside each sieve system, so they cannot rebalance `b/a`,
which is the parameter DFI actually needed.]**

**[ABSENT: no published bound for a bilinear or trilinear remainder over an
interval at modulus product exceeding the interval length, uniformly in the
interval's position.]** Owning convention searched: "bilinear/trilinear forms
with Kloosterman fractions" per §3 above, not our vocabulary; channels
WebSearch, arXiv API and OpenAlex, each with a known-positive calibration probe
recorded in §3's table; the OpenAlex citation sweep of DFI 1997 enumerated all
77 citing works and read their titles, and the nearest neighbours are
*Correlations of sieve weights and distributions of zeros* (2022), *On the
Correlations, Selberg Integral and Symmetry of Sieve Functions in Short
Intervals III* (2010), *Almost primes in almost all very short intervals*
(2022) and *Bombieri–Vinogradov for multiplicative functions, and beyond the
`x^{1/2}`-barrier* — all of them either averaged over the interval's position or
below level `x^1`, and none both position-uniform and beyond the length.
`SEARCH-CONVENTIONS.md` §1 has no row for this object; §7 proposes one.

**Lead recorded, not checked.** Meijie Lu, *Correlations of fractions whose
denominators are products of primes*, Math. Nachr. **298** (2025) 2263–2281, DOI
`10.1002/mana.12027` — a pair-correlation existence result for exactly our
denominators, with no power saving and no sieve weights, so a different class,
but the closest support match found. Not on arXiv; the paper itself was not read.

## 7. Draft corrections and additions, for a human to place

This report edits nothing. Four items.

1. **`research/SEARCH-CONVENTIONS.md` §1, new row.**
   | object | our name | canonical | **OWNING convention** | where it lives |
   |---|---|---|---|---|
   | the vector-sieve bilinear remainder | "the missing lemma", Lemma V | bilinear sieve remainder at level beyond the window | **"bilinear forms with Kloosterman fractions"**, `Σ α_m β_n e(a·m̄/n)`; trilinear when an average over `a` is present | DFI, Invent. Math. 128 (1997) 23–43; Bettin–Chandee, arXiv:1502.00769 |

2. **`research/SEARCH-CONVENTIONS.md` §3, replace the row** "Position-uniform
   interval version of the Brüdern–Fouvry bilinear remainder beyond product
   level `H`? — None found — searched: Iwaniec 1980, Brüdern–Fouvry with DI".
   That row's "what was actually searched" column is now wrong by omission: the
   object's owning convention is the Kloosterman-fraction one, it was searched
   here with three calibrated channels, and the answer is sharper than "none
   found" — **the aligned-position case is covered in print at `γ = 0.970624`,
   and the position-uniform case is covered with an explicit price by
   Bettin–Chandee's Remark 1.**

3. **`research/sift-limit-attack.md` §4.7.** The `[ABSENT]` beside Lemma V should
   be downgraded from an absence to a *priced* statement, and the sentence "what
   does not exist in print is the position-uniform interval version at product
   level beyond `H`" should read "what does not exist in print is a *nontrivial*
   position-uniform bound; the trivial one is Bettin–Chandee's Remark 1 charged
   at `(1+hx/MN)^{1/2}`". Add: the best published estimate in our configuration
   is `γ = 0.970624` and drives the route to `u = 5.090707`, still worse than
   `β₂`.

4. **`attack-theta-last-gap.md` §6(C1).** "the quantifier is discharged at no
   cost" is too strong. It is discharged at no cost only into the trivial bound.
   Inside a nontrivial estimate the price is Remark 1's, and this report's §5
   computes it.

**Draft CHANGELOG entry.**
> `research/attack-sqrt-cancellation.js` (2026-08-18). The 35 per cent of
> square-root cancellation is priced against the convention that owns it. The
> remainder reduces, verified exactly in BigInt over 2655 pairs, to a trilinear
> form with Kloosterman fractions times a single window factor. Duke–Friedlander–
> Iwaniec 1997 reads `γ = 1.009638` in our configuration (worse than trivial: our
> level split `b/a = 1.4243` exceeds their `6/5` threshold) and Bettin–Chandee
> 2015 reads `γ = 0.970624`, against the needed `0.824975`; in `θ_total` currency
> `1.030303` against the needed `1.208983`, and the route returns exponent
> `5.090707`, worse than `β₂ = 4.266450`. Bettin–Chandee's Remark 1 admits our
> window phase and prices position-uniformity at `(1+hx/MN)^{1/2}`, which is
> `O(1)` only for `x ≪ H^{1.212157}` while our `x` reaches `exp(H^{0.2344})`.
> arXiv:2601.00292, which claimed to improve DFI, was withdrawn by its authors
> on 5 Jan 2026.
