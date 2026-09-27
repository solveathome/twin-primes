# Attack BF-split: is Brüdern–Fouvry's level split optimal for their own theorem?

<!-- ledger
id: Q-bf-split
status: ANSWERED
todo: none
question: Is Brüdern-Fouvry's level split optimal for their own theorem, or is there unclaimed exponent in it?
verdict: It was 99.3 per cent a trap: their condition (iii) binds at the published split and the proposed re-split violates it by x^{0.040403}, leaving 0.0000120536 in theta of the claimed 0.0295482779, real but invisible at the four decimals they print.
-->

**HEADLINE. It was a trap, and it was 99.3 per cent a trap. Brüdern–Fouvry's
Proposition 2 carries four side conditions, and only ONE of them constrains the
product `D₁D₂`. Condition (iii), `q^{C₀}D₁²D₂³ ≤ x^{3−cε}`, is asymmetric, it
BINDS at their published split, and attack C's re-split violates it by a factor
`x^{0.040403}`. The claimed `0.0295482779` of unclaimed exponent evaporates.
What survives, after a full optimisation over all four conditions, is
`0.0000120536` in `θ` (`0.000208183964` in `1/θ`) — 0.70 per cent of the claim,
real, and invisible at the four decimals they print: `0,2406` either way.** Two
corrections to the corpus fall out: the split `(1/2, 3/4)` is `(majorant,
minorant)` as attack C said, but the mapping onto Proposition 2's slots is the
REVERSE of what was assumed, and their point is the vertex where (iii) and (iv)
bind together, not a point on (iv) alone — the signature of an optimisation
already performed.

Script: `research/attack-bf-split.js` — 198.2 s, exit 0, OUTPUT block written by
`research/qc/embed.js` (code-sha256 `ff1b5857d10e3db3…`, out-sha256
`0964bffc4f94f107…`), so every figure below is the machine's. Thirteen READINGS
in the tail.

---

## 1. The four side conditions, transcribed

Numdam `CM_1996__102_3_337_0`, **PDF page 10 = journal page 345**, the four
displays immediately under *"dès qu'on a les relations"*, read from a 600 dpi
rendered page image because the numdam text layer for this paper drops every
display formula:

    q^{C₀} D₁        ≤ x^{1−cε}        (i)
    q^{C₀} D₁ D₂²    ≤ x^{2−cε}        (ii)
    q^{C₀} D₁² D₂³   ≤ x^{3−cε}        (iii)
    q^{C₀} D₁⁴ D₂⁴   ≤ x^{5−cε}        (iv)

**[PROVEN, their Proposition 2, p. 345.]**

What each constrains:

| condition | shape | constrains |
|---|---|---|
| (i) | `D₁ ≤ x` | **`D₁` ALONE** |
| (ii) | `D₁D₂² ≤ x²` | asymmetric, `D₂` weighted 2× |
| (iii) | `D₁²D₂³ ≤ x³` | asymmetric, `D₂` weighted 1.5× |
| (iv) | `D₁⁴D₂⁴ ≤ x⁵` | the product, `D₁D₂ ≤ x^{5/4}` |

Attack C quoted (iv) and inferred "their side condition constrains only the
PRODUCT `D₁D₂`, so the split is free inside it". **Three of the four are not
product conditions.** The premise of the claimed gain is false as stated.

Proposition 2's statement, same page image, journal p. 344: *"Soient λ₁ de
niveau D₁ vérifiant ‖λ₁‖_∞ ≤ 1 et λ₂ **bien factorisable** de niveau D₂."* The
two slots are not interchangeable in the hypothesis either — slot 2 must be well
factorable, slot 1 need not be.

Their levels, journal p. 353 §3.4, verbatim: *"On choisit alors
D = x^{(1/2)−100cε}q^{−C₀} et Δ = x^{(3/4)−100cε}q^{−C₀}"*, with *"D et Δ sont
respectivement attachés aux fonctions ψ⁺ et ψ⁻"*. So **majorant level `x^{1/2}`,
minorant level `x^{3/4}`** — attack C's `(a,b) = (1/2, 3/4)` as (majorant,
minorant) is confirmed from the page.

**The objective optimised below is theirs verbatim.** Journal p. 355, read from
a 500 dpi image, the last display of the paper: *"0,2406 est strictement
inférieur à 3/4(1+exp 0,75), qui est l'unique racine de l'équation en ξ:"*

    2 f( log x^{3/4} / log x^ξ )  −  F( log x^{1/2} / log x^ξ )  =  0.

With `F(s) = 2e^γ/s` and `f(s) = 2e^γ ln(s−1)/s`, `2f(β/ξ) = F(α/ξ)` rearranges
to `2α ln(β/ξ − 1) = β`, i.e. `ξ = β/(1 + e^{β/(2α)})`, and at
`(α,β) = (1/2, 3/4)` that is `3/(4(1+e^{3/4})) = 0.2406159756`. Their printed
equation also settles the orientation independently of p. 353: **the `3/4` sits
inside `f` (the minorant function) and the `1/2` inside `F` (the majorant
function)**. The maximisation below is of that `ξ`. **[PROVEN, their p. 355.]**

## 2. Which conditions hold at the re-split, and which do not

**At BF's own split.** Two slot assignments are arithmetically possible and only
one is feasible **[VERIFIED, §A]**:

| assignment | (i) | (ii) | (iii) | (iv) | verdict |
|---|---|---|---|---|---|
| A: `D₁ = x^{1/2}` (majorant), `D₂ = x^{3/4}` | +0.25 | **0.00** | **−0.25** | **0.00** | **INFEASIBLE** |
| B: `D₁ = x^{3/4}` (minorant), `D₂ = x^{1/2}` | +0.25 | +0.25 | **0.00** | **0.00** | FEASIBLE |

(slacks in `log_x`). **The corpus had the slot mapping backwards.** Only
assignment B is legal, and at it **(iii) and (iv) bind simultaneously**. A choice
that saturates two conditions at once is what an optimisation looks like from the
outside, not an oversight.

**At attack C's re-split.** Its optimum on the line `α+β = 5/4` re-derives here
as `θ = 0.2423389541` at `(α,β) = (0.54040344, 0.70959656)`, ratio
`β/α = 1.3130866928` — reproducing attack C's `K = 5.1580646803` and
`1.3130863738` to seven places, so the two computations agree about what was
claimed. Tested against all four **[VERIFIED, §E]**:

| assignment | (i) | (ii) | (iii) | (iv) |
|---|---|---|---|---|
| A | +0.45959656 | +0.04040344 | **−0.20959656 VIOLATED** | 0.00000000 |
| B | +0.29040344 | +0.20959656 | **−0.04040344 VIOLATED** | 0.00000000 |

**It fails (iii) under both.** In the only assignment BF can use it overshoots
`D₁²D₂³ ≤ x³` by a factor `x^{0.040403}`. Re-splitting leaves their hypothesis.
**The `0.0295482779` is not available.**

## 3. The best split that satisfies all four, and what it is worth

Maximising `θ(α,β) = β/(1+e^{β/(2α)})` over the full polytope, by exact vertex
enumeration, an independent dense grid (seven refinement passes), and finally a
bisection of the analytic derivative along the binding edge **[VERIFIED, §D]**:

    d(θ)/d(β) at BF's β = 3/4        = −0.006021189818     (their corner is NOT stationary)
    stationary point on edge (iii)   β* = 0.745989568179,  α* = 0.502673621214
    θ*                               = 0.240628029251      1/θ* = 4.155791838187
    BF                               = 0.2406159756        1/θ  = 4.1560000222

    GAIN in theta   0.00001205363249      GAIN in 1/theta   0.00020818396360
    fraction of attack C's 0.001722978518 that survives:  0.006995811242

At the true optimum **(iii) binds exactly and (iv) has slack `0.0053472424`** —
the reverse of attack C's picture, which pinned (iv) and ignored (iii).

**It does not change their printed constant.** Four decimals: `0,2406` theirs,
`0,2406` ours **[VERIFIED, §G]**. The improvement is to the exact constant
`3/(4(1+e^{3/4})) = 0.2406159756 → 0.2406280293`, from the fifth decimal on.
The Théorème as stated is untouched.

The other slot order is far worse and settles why BF chose theirs: assignment A
tops out at `θ = 0.2279431830` against B's `0.2406280293`, a gap of
`0.0126848463` (`0.2406280293 − 0.2279431830`) — a thousand times the whole re-split question.

## 4. The proof, not only the statement

Two ways the gain could have been larger than the statement allows, both checked.

**(a) Is the statement looser than the proof?** No. Journal p. 348 needs
`q^{C₀}max(D₂D₂'', D₁^{1/2}D₂^{1/2}D₂''^{3/2}, D₁^{1/2}D₂D₂''^{1/2}, D₁) ≤
x^{1−20cε}` and then fixes `D₂' = q^{−C₀}D₁^{−1}x^{1−10ε}`, whence
`D₂'' = q^{C₀}D₁D₂x^{−1+10ε}`. Substituting `log_x D₂'' = d₁+d₂−1` returns
**(ii), (iv), (iii), (i) in that order, exactly** **[VERIFIED, §B]**. The four
printed conditions are the proof's four terms rescaled, with nothing rounded off.

**(b) Is `D₂'` itself a free parameter worth re-choosing?** It is free, and BF's
choice is optimal. Before p. 348 fixes it, the requirement is a three-variable
polytope in `(d₁, d₂, s = log_x D₂')`: (2.15) `d₁+s ≤ 1` caps `s`, and all four
remaining conditions are non-increasing in `s`, so `s = 1−d₁` dominates. The
grid finds **0 pairs `(d₁,d₂)` feasible for some `s` but not for
`s = min(1−d₁, d₂)`** **[VERIFIED, §C]**. No slack hides behind that choice.

**Where the two levels enter, and whether the proof needs them comparable.** It
does not need them comparable; it needs them in the right slots. The asymmetry is
structural and traceable through the proof: at (2.9) the Cauchy–Schwarz is
applied over `d₁` after squaring in `d₂, d₂'`, which is why `Δ₁` appears as
`Δ₁^{1/2}` and `Δ₂` as `Δ₂^{3/2}` in Proposition 1's final bound
`R ≪ q^{C₀}(x^{1/2}Δ₁^{1/2} + Δ₁ + Δ₁^{1/2}Δ₂^{3/2})x^ε` (p. 344); and at the
Deshouillers–Iwaniec input, Lemme 2 is applied with **`C = Δ₂'`, `D = Δ₁`,
`N = HΔ₂''`, `R = q`, `S = Δ₂''²`** (p. 346), so `Δ₁` is the smooth `d`-variable
and `Δ₂` is the one split by well-factorability into the `c` and `s` variables.
Nothing in that chain asks `D₁ ≍ D₂`. **[PROVEN, their pp. 343–348.]**

**One reading, flagged as a reading.** Proposition 2's `d₁` divides the first
component and `d₂` the second, so a fixed labelling of components forces
`(D₁,D₂) = (majorant, minorant)` in the term `Λ₁⁺Λ₂⁻` — which §A2 reports
INFEASIBLE at BF's own levels, failing (iii). The paper is correct, so the
exchange symmetry `n ↔ n+2` of the sifted sequence, which BF invoke by name at
p. 354 (*"la symétrie du problème"*), must be what puts the level-`x^{3/4}`
weight in slot 1 for both cross terms. **[INFERRED, from the paper being
correct.]** Every optimisation above grants that freedom, which is the assumption
most favourable to a re-split, and the surviving gain is still `0.0000120536`.

**Independent levels per component buy nothing here either**, and that was worth
testing because the constraint set is asymmetric where attack C §C's was not.
Four free levels, each of the three vector-sieve terms free to choose its slot,
linear-sieve validity ranges `1 ≤ s⁺ ≤ 3` and `2 ≤ s⁻ ≤ 4` enforced: 3000 seeded
restarts reach `0.2406257516`, and a 4·10⁵-step polish seeded at the two-level
optimum returns `0.240628029251` at `P = R = 0.50267362`, `Q = T = 0.74598957`
— the symmetric point, difference `0.00000000000000` **[VERIFIED, §F]**. The
asymmetry lives in the two SLOTS, not in the two COMPONENTS, so independent
levels have nothing to exploit.

Validity: at BF's point `s⁺ = 2.078000`, `s⁻ = 3.117000`; at the new optimum
`s⁺ = 2.08900693`, `s⁻ = 3.10017736`. Both inside `[1,3]` and `[2,4]`, so attack
C's recorded trap does not bite.

## 5. The result, stated at the right strength

**It is their problem, their hypotheses, our arithmetic, and it is small.**

> Let `θ(κ)` be as in Brüdern–Fouvry, *Le crible à vecteurs*, Compositio Math.
> **102** (1996) 337–355. Their proof takes majorant level `x^{1/2}` and minorant
> level `x^{3/4}` (p. 353) and obtains `θ(0⁺) = 3/(4(1+e^{3/4})) =
> 0.2406159756`. Optimising the level pair over the full feasible region of
> their Proposition 2 — all four side conditions of p. 345, in the only slot
> assignment their own levels admit — gives majorant `x^{0.502673621214}` and
> minorant `x^{0.745989568179}`, and `θ(0⁺) = 0.240628029251`. The gain is
> `1.205×10⁻⁵`, the binding condition at the optimum is
> `q^{C₀}D₁²D₂³ ≤ x^{3−cε}` rather than `q^{C₀}D₁⁴D₂⁴ ≤ x^{5−cε}`, and the
> published constant `0,2406` is unchanged at the precision they print it.

**Scope.** Everything above is the `κ → 0` limit, which is where BF state their
constant ("*une fonction θ(κ) tendant vers 0,2406 pour κ tendant vers 0*", p. 339).
For `κ > 0` the factor `q^{C₀} ≤ x^{C₀κ}` shifts all four right-hand sides by
`−C₀κ`, which moves the polytope and so the optimal split; that is not computed
here and the `1.2×10⁻⁵` is not claimed for it. The shift also has an unquantified
constant `C₀` in it, so nothing about `θ(κ)` for fixed `κ > 0` follows.

That is the whole of it. It is not a new theorem, it is not a new method, and it
does not alter any statement in their paper. **It should be written up, if at
all, as a remark.**

The honest way to read the whole exercise: **their split was already optimal to
within `1.2 × 10⁻⁵`, and they landed on a vertex where two of their four
conditions bind at once. That is not an oversight with `0.03` on the table; it is
a choice that had been made carefully, and what is left over is the gap between
picking a vertex and picking the nearby stationary point on one of its edges.**

**IT DOES NOT TRANSFER TO `G₂`.** `research/sift-limit-attack.md` §7b: by
reciprocity `e(hρ/(d₁d₂)) = e(−hN/(d₁d₂))·e(−2h·d̄₁/d₂)`; the right factor is
theirs verbatim, the left is `O(x^ε)` for them because their window length equals
their element size, and `O(N/H)` for us with `N` running to `P(z)`. Everything
above is an optimisation inside their level polytope and touches nothing on that
factor. **Nobody should read `0.0000120536` as an exponent gain for us — and
nobody should read `0.0295482779` that way either, because it does not exist.**

## 6. Prior art

**The owning convention.** `research/SEARCH-CONVENTIONS.md` §1's rule applies to
their object, not ours: the paper's own object is the pair `(n, n+2)` with both
least prime factors above `x^θ` and `n ≡ 1 (mod q)`, and the literature's wording
for the machinery is **"vector sieve"** / **"crible à vecteurs"**. Both were
searched.

**[ABSENT: no published re-optimisation of the level split, no published
improvement to `0,2406`, and no published sharpening of Proposition 2's side
conditions.]** Calibrated channels, all this session:

| channel | calibration probe, this session | result | negative claimable? |
|---|---|---|---|
| Semantic Scholar `/citations` | `/paper/search/match?query=Le crible a vecteurs` → 200, `corpusId 125534041`, `citationCount 13` | all 13 citing works enumerated; **none touches the `(n, n+2)` rough problem** | **yes**, for the citation graph |
| Semantic Scholar `/search` | — | HTTP 429 on 3 calls with 5 s and 30 s sleeps | **NO** |
| OpenAlex citation graph | `works/W2581797856` returns the record; `title.search:crible a vecteurs` → count 1, so no duplicate record | `cites:W2581797856` → 10 works, a strict subset of Scholar's 13 | **yes** |
| OpenAlex full text | `fulltext.search:"crible à vecteurs"` → count 2, one of them the paper's own text | `"Brüdern and Fouvry"` + math field → 28 works, all applications elsewhere; `"vector sieve of Brüdern"` → 6, same | **yes**, for the OA index |
| OpenAlex numeric probe | — | `fulltext.search:"0.2406"` → 2162 hits, all agronomy/statistics: decimals are not tokenised exactly | **NO** |
| WebSearch | a query containing `0.2406` returns the numdam PDF as top hit and the summariser identifies the constant in it | ~10 queries incl. two domain-restricted passes; every hit is the paper, an application, or an unrelated sibling | **yes** |
| arXiv metadata API | `all:"vector sieve"` → 4 papers | arXiv has no public full-text index | **NO** for "no arXiv paper mentions 0.2406" |
| arXiv, hand-grepped | — | 12 full texts downloaded and `pdftotext`-grepped for `fouvry\|br.dern\|vector sieve\|crible\|0.2406\|0.234`: **no occurrence of `0.2406` in any** | yes, for those 12 only |
| zbMATH metadata | `search_string=crible a vecteurs` → **Zbl 0860.11057**, id 929704, Compos. Math. 102 (3) 337–355 | `search_string="vector sieve"` → 24 records, all applications elsewhere | metadata yes, **citations NO** (endpoint 404, UI Cloudflare-gated) |
| Google Scholar | the record renders, **Cited by 17**, cluster `cites=10369719633457703172` | cited-by listing returned only 3 of 17 across four attempts, two of which hit `/sorry/` captcha | **NO** |

**Where a negative genuinely cannot be claimed, recorded so nobody later reads
this as more than it is.** MathSciNet was not consulted (paywalled) and is the
authoritative list; Scholar's 17 against the 14 distinct works actually
enumerated says roughly three citing works were seen by no channel here. zbMATH's
citation graph has no API. arXiv has no full-text index. Semantic Scholar keyword
search was 429 throughout. And **one item was not read at all**: Liping Li, *An
asymptotic formula in vector sieves*, Pure and Applied Mathematics (2004),
OpenAlex `W2357693457`, CNKI `CJFDTOTAL-CCSX200403014`, no DOI, 0 recorded
citations — the title suggests an asymptotic-formula variant of the inequality
rather than anything about the `(n,n+2)` constant, **but that is a guess, not a
finding**, and it is the one document to obtain if this is ever written up.

**A data defect worth carrying forward.** The zbMATH record Zbl 0860.11057
carries a **mismatched review** — Dieter Wolke's review of an exceptional-set
result on `E_k(N) ≪ N^{1−1/25k}`, prime plus a `k`-th power. Do not quote "the
zbMATH review of BF96".

**What the downstream literature actually does with this paper, and it is uniform
across all 14 works enumerated: it borrows the vector-sieve INEQUALITY and
applies it to a different sequence. Not one of them re-derives their constant.**
Lagrange four squares (Brüdern–Fouvry 1994, Tsang–Zhao 2014), Waring–Goldbach
(Kumchev, CJM 2005), Diophantine inequalities with special primes (Dimitrov,
Todorova, Ge–Zhang–Li), Gaussian primes (Harman, QJM 2019), Sarnak saturation
(Schindler–Sofos, Mathematika 2018), almost-prime triples (Heath-Brown–Li, JNT
2016), `p₁+p₂=2p₃` with `pᵢ+2` almost prime (Tolev, Acta Arith. 88 (1999)),
mixed-dimension vector sieves (Nath–Xie, arXiv 2501.16723). Grimmelt–Teräväinen
(arXiv 2207.08805) go the other way and deliberately avoid it. **That uniformity
is itself the finding: the level split has had no readers, which is consistent
both with it being optimal and with nobody having looked.**

**And the search turned up one thing worth more than the absence.** Ford and
Halberstam, *The Brun–Hooley Sieve*, J. Number Theory **81** (2000) 335–350,
derive a dual lower-bound decomposition for `k`-tuples and then write, verbatim:

> "This seems to us superior to Lemma 13 of [BF1] or (2.6) of [BF2] in the
> treatment of the '`y_ℓ − x_ℓ`' terms, and should lead to better results."

with `[BF2]` = *Le crible à vecteurs*; their introduction also flags the dual form
as "probably has relevance to the multi-dimensional vector sieve of Brüdern and
Fouvry". **They never carry it out, and no work in any citation list enumerated
here carries it out.** That is an explicit, published, never-executed claim that
the vector-sieve inequality (2.6) — the *pointwise* inequality, not the level
split — can be beaten. It does not collide with anything above, because it
attacks a different object. It is a live and independent lead, and it is a better
one than the re-split ever was. **[MEASURED: quoted from the author copy at
`ford126.web.illinois.edu/wwwpapers/hooleysieve.pdf`; not read here beyond the
quoted sentences, so its strength is not assessed.]**

## 7. Corrections to draft into the corpus (this report edits nothing)

**(1) `research/sift-limit-attack.md` §7b, the parenthetical CLOSED block.**
Currently: *"Their side condition constrains only `D₁D₂`, so re-splitting stays
inside their own hypothesis and gains `0.0295482779` of exponent that their
theorem does not claim. Caveat kept deliberately: their other three side
conditions were not checked for split-sensitivity."* The caveat has now been
discharged and it fires. Replace with:

> Their four side conditions (p. 345) are `q^{C₀}D₁ ≤ x^{1−cε}`,
> `q^{C₀}D₁D₂² ≤ x^{2−cε}`, `q^{C₀}D₁²D₂³ ≤ x^{3−cε}`, `q^{C₀}D₁⁴D₂⁴ ≤ x^{5−cε}`,
> and only the last constrains the product. At their split, (iii) and (iv) bind
> together; re-splitting violates (iii) by `x^{0.040403}`, so the `0.0295482779`
> is not available. Optimising over all four leaves `0.0000120536` in `θ`
> (`0.000208183964` in `1/θ`), at majorant `x^{0.502674}`, minorant `x^{0.745990}`,
> which does not change their printed `0,2406`.
> `research/attack-bf-split.js`, `history/staging/attack-bf-split.md`.

**(2) Same file, §7b(1).** *"Their choice `(upper, lower) = (x^{1/2}, x^{3/4})`
saturates it"* — it saturates (iv) **and** (iii), and the two together are what
pin the choice. Add the second condition.

**(3) `history/staging/attack-theta-last-gap.md` §4.** The sentence *"Their
`(x^{1/2}, x^{3/4})` is `(majorant, minorant)`"* is right and sourced; the
implied mapping onto Proposition 2's `(D₁, D₂)` is the reverse of the only
feasible one. Add: with `D₁ = x^{1/2}`, `D₂ = x^{3/4}`, condition (iii) reads
`3.25` against `3`. The feasible reading is `D₁ = x^{3/4}`, `D₂ = x^{1/2}`.

**(4) Draft CHANGELOG entry, for a human to place:**

> `sift-limit-attack.md` §7b and `attack-theta-last-gap.md` §4 — the deliberately
> recorded caveat FIRES. Brüdern–Fouvry's Proposition 2 has four side conditions,
> not one product condition; (iii) `q^{C₀}D₁²D₂³ ≤ x^{3−cε}` binds at their split
> and the proposed re-split violates it by `x^{0.040403}`. The claimed
> `0.0295482779` of unclaimed exponent is void. A full optimisation over all four
> conditions leaves `0.0000120536` in `θ`, which does not move their printed
> `0,2406`. Their split is a vertex where (iii) and (iv) bind together, and the
> slot mapping in the corpus was reversed. `research/attack-bf-split.js`.

**(5) The method lesson, for `primeoire-campaign-lessons`.** A caveat recorded
honestly is worth exactly as much as the session that discharges it. Attack C
flagged this one and the flag was correct; the finding it guarded was 99.3 per
cent wrong. **Quoting one side condition of four and inferring the shape of the
constraint set is the defect, and it looks identical to a real result until
someone reads the other three from the page.**

**(6) A new lead for `research/PRIOR-ART.md`, found while looking for something
else.** Ford–Halberstam, *The Brun–Hooley Sieve*, J. Number Theory **81** (2000)
335–350, state in print that their dual decomposition "should lead to better
results" than Brüdern–Fouvry's vector-sieve inequality (2.6), and never carry it
out; no citing work enumerated here carries it out either. That attacks the
POINTWISE inequality, which is the object attack C's §1 chain rests on, and it is
independent of everything in this report. Worth a session.

## 8. Custody

Every figure is from the OUTPUT block of `research/attack-bf-split.js`, which
`research/qc/embed.js` wrote from a completed 198.2 s run (code-sha256
`ff1b5857d10e3db3c9d9cdb7d0830065150bc5bffe3c40190676182fdb185497`, out-sha256
`0964bffc4f94f1073f73842d82060dce681e13edcb630ebafd1c01724e1bebb8`, node
v22.21.0). Nothing was hand-pasted.

Every published statement is transcribed from a **rendered page image** of the
numdam PDF `CM_1996__102_3_337_0`, not from its text layer, which drops every
display formula. The PDF carries a numdam cover sheet, so **journal page N is
PDF page N − 335**:

| journal page | PDF page | dpi | what was read |
|---|---|---|---|
| 343 | 8 | 220 | (2.8), (2.9), Lemme 1 — where `Δ₁`, `Δ₂` first enter asymmetrically |
| 344 | 9 | 220 | Proposition 1's final bound; **Proposition 2's statement** |
| 345 | 10 | **600** | **the four side conditions**, re-read magnified |
| 346 | 11 | 220 | Lemme 2, and its parameters `C = Δ₂'`, `D = Δ₁`, `N = HΔ₂''`, `R = q`, `S = Δ₂''²` |
| 347 | 12 | 200 | (2.13), (2.14), (2.15) |
| 348 | 13 | 200 | the max of four terms, and `D₂' = q^{−C₀}D₁^{−1}x^{1−10ε}` |
| 353 | 18 | **500** | the level choice, the `ψ±` attachment, the `Λ₁⁺Λ₂⁺` remark |
| 355 | 20 | **500** | the root equation `2f(log x^{3/4}/log x^ξ) − F(log x^{1/2}/log x^ξ) = 0` |

Iwaniec, *A new form of the error term in the linear sieve*, Acta Arith. **37**
(1980) 307–320, matwbn `aa37127`, is their `[Iw2]` and was fetched in the same
session (8 pages, title verified) as the source of the sieve functions `F`, `f`
and their exact ranges.
