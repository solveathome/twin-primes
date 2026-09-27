# The two-class short-interval variance in the literature: Gorodetsky read at source, the k-tuple object located, its asymptotic absent

<!-- ledger
id: Q-varE-limit
status: PARTIAL
todo: 9
question: Does lim Var/E on the diagonal window exist, and what is it?
verdict: Prior art: not in print at theta = 2 (Gorodetsky is kappa = 1 only, confirmed at source; Aryan 2015 Lemma 1.2 is an upper bound with our main term, its exponent the nested P^{-2^{ks}+ks}); arXiv API, Scholar and Opera de Cribro Prop 6.26 owed.
-->

*Staging note, 2026-08-28. Prior-art pass on `varE-spectral.md` §5 and §9, run
under the fence "one new file, no edits, no git". This note edits nothing and
proposes rows for other files without applying them. Every artifact named in §7
was fetched this session and carries its sha256. Numbers marked
`[SCRATCHPAD-GRADE]` come from an unembedded script in the session scratchpad
and may not be quoted elsewhere until they are produced inside an embedded
producer.*

---

## 0. Verdict, disconfirming half first

**The claim that `varE-spectral.md` §9 was told not to make is still not
available.** Nothing found in six channels states `λ₂`, states `λ_θ` for any
`θ > 1`, or computes the short-interval variance of a two-class sifted set to an
asymptotic. So the honest verdict is **PARTIAL, leaning ABSENT**, and the
absence is worth less than it looks, for three reasons stated before the rest:

1. **The object is not absent. Only its asymptotic is.** Aryan, *Mathematika*
   **61** (2015) 72–88, defines exactly the corpus's statistic, at general
   tuple size, six years before Gorodetsky. He proves an upper bound on it and
   no asymptotic. So this is not virgin ground; it is ground somebody walked
   across without stopping.
2. **The generalized Dickman law `GD(θ)` is published probability**, with the
   density and delay equation `varE-spectral.md` §5 writes down. Calling
   `λ_θ(u) = Pr[GD(θ) > u]` a new function would be wrong. What is not in print
   is the identification of that tail with a sieve variance at `θ > 1`.
3. **One channel that should have decided this is dead by emptiness rather than
   by search.** Gorodetsky's paper has, across three citation indexes, exactly
   one citing work, and it is a statistics paper about bootstrap diagnostics.
   A citation graph with one edge cannot rule out a successor; it can only fail
   to find one. The MathSciNet leg is bibliographic-only and cannot see review
   text, and Google Scholar was never reachable. Both legs are owed.

**A correction this pass owes back to the corpus, and it is the one thing here
that moves a number.** `import-rough-anatomy.md` §0.6 compares the corpus's
measured census dispersion against `λ(s) = e^{−γ}∫_s^∞ρ`, Gorodetsky's `λ`, and
records a factor of 12 to 23. That comparison uses the wrong member of the
family. Gorodetsky's `λ` is `λ₁`, the one-excluded-class case; the corpus's
census counts rough **pairs**, which is two excluded classes per prime, so its
comparand is `λ₂`. Evaluated at the corpus's own band coordinates
`s = 2.317` and `s = 2.608`, `λ₂` reads **0.3403** and **0.2508**
`[SCRATCHPAD-GRADE]` against the cited `χ²/df = 0.718` at B8, a factor of
**2.11 to 2.86**. The like-for-like `λ₁` figures at the same 0.718 are 13.9
and **25.2**; `import-rough-anatomy.md` §0.6's 22.7 is the top of a six-band
range and attaches to a different band's `χ²/df`, so it is not the second
comparand (`redteam-0828-varE.md` §7). The mismatch shrinks by a factor of
about 6.6 to 8.8 and does not close. Nothing here says the residual factor of
two is explicable; it may be a hypothesis violation, a difference between a census
error statistic and a uniform-window variance, or a real disagreement. Two
checks that would separate those are named in §9 and neither has run.

---

## 1. Gorodetsky at source: the exact scope, in one paragraph and then in detail

Ofir Gorodetsky, *The variance of integers without small prime factors in short
intervals*, **Math. Z. 308 (2024) no. 4, Paper No. 59**, DOI
`10.1007/s00209-024-03601-w`, preprint arXiv:2111.00853v3 (21 Oct 2024, 24 pp),
MR4812487, MSC 11N25. **[SOURCED, verbatim, full PDF read this session]**.

**Scope in one sentence.** The paper computes the asymptotic short-interval
variance of the indicator `α_y` of a **single** integer free of prime factors
`≤ y`, that is, one excluded residue class per prime, and it never forms,
states, conjectures or names the two-class or `k`-tuple sifted set as an object
of study.

The detail that matters here:

- **The object.** `V(X,H,y) = (1/X)∫₀^X (Σ_{x<n≤x+H} α_y(n) − H P_y)² dx`, with
  `α_y(n) = 1` iff every prime dividing `n` exceeds `y`, and
  `P_y = ∏_{p≤y}(1 − 1/p)`. One class per prime, `κ = 1`.
- **Theorem 1.1.** Under `y ≥ (2+ε) log H`, `a = log log H/log y ∈ (0,1)` and
  `(1+a) log H/log log H ≤ (1−ε) log X/log y`, one has `V(X,H,y) ∼ M(H,y)` as
  `H → ∞`, where
  `M(H,y) = ∏_{2<p≤y}(1 − 2/p) Σ_{n≥1} g_y(n){H/2n}(1 − {H/2n})`
  and `g_y` is multiplicative, supported on squarefrees, with
  `g_y(p) = p/(p−2)` for `2 < p ≤ y` and `0` otherwise (eqs (1.5), (1.6), (1.7),
  (1.8)).
- **Theorem 1.3(1).** For `y ≥ exp((log log H)^{5/3+ε})` and `u = log H/log y`,
  `M(H,y) ∼ H P_y λ(u)` with `λ(u) = e^{−γ}∫_u^∞ρ(v)dv` (eqs (1.10), (1.14)).
  Parts (2), (3), (4) give the saddle-point forms `e^{−γ}P_yΨ(H,y)/ξ(u)`, the
  `Ψ_{μ²}` form, and the uniform bound `M ≍_ε P_yΨ_{μ²}(H,y)/log(2+u)`. `λ` is
  credited to van Lint–Richert and de Bruijn–van Lint, not claimed as new.
- **Where the two-class arithmetic comes from, and why it is not our two-class
  arithmetic.** The factor `∏_{2<p≤y}(1 − 2/p)` and the weight `p/(p−2)` in his
  main term arise from expanding the square, which produces two-point densities
  for a **one-class** sieve. In `import-rough-anatomy.md` §6 that factor is
  identified with the corpus's `V₂`, and the identification is arithmetically
  right for the right reason: the second moment of a one-class count and the
  first moment of a two-class count are the same local data. It does not follow
  that his variance is the corpus's variance. The second moment of a **two**-class
  count needs three- and four-point densities, that is `ν_p ∈ {2,3,4}` where
  Gorodetsky needs `ν_p ∈ {1,2}`. That step up is the whole of the missing
  result.
- **The general-`k` tool is in his paper; the general-`k` theorem is not.**
  Lemma 1.4 is stated for arbitrary `k ≥ 1` and arbitrary nonnegative shifts
  `h₁,…,h_k`, with main term `X∏_{p≤y}(1 − ν_p(h)/p)`, `ν_p(h)` the number of
  distinct `h_i mod p`. He applies it at `k = 1` (Corollary 2.1) and `k = 2`
  (Proposition 2.2) only, and writes, on p. 5: "Lemma 1.4 with `k ≥ 3` paves the
  way to studying higher moments of `Σ_{x<n≤x+H} α_y(n) − H P_y`, and we hope to
  study such moments in future work." That sentence promises higher moments of
  the **one-class** count, which is a different direction from the variance of a
  two-class count, though both consume the same lemma.
- **What is not in the paper, checked by grep over the full extracted text:**
  `tuple` (0 hits), `twin` (0), `admissible` (0), `generalized` (0),
  `sieve dimension` (0), `dimension` (0), `Poisson` (0), `Dickman` (2 hits, both
  the ordinary `ρ`). So `GD(θ)`, the Dickman–Goncharov family, and sieve
  dimension `κ` appear nowhere.
- **His own claim to priority on the object.** §1.6.1: "As far as we are aware,
  asymptotics of `V(X,H,y)` were not studied previously, except in a very
  particular case", the case being `X = q_y` a primorial, where the sum is
  Hausman–Shapiro's and Montgomery–Vaughan's. His Lemma 1.5 proves
  `V(q_y,H,y) = M(H,y)` from Hausman–Shapiro's closed form (1.21). **The
  corpus's window is a primorial**, so it is Lemma 1.5's case, not the generic
  one, and the closed form the corpus needs at `θ = 2` is an `s`-tuple analogue
  of Hausman–Shapiro (1.21). No such analogue was found in any channel.
- **His stated open problem is elsewhere.** Conjecture 1 asks for the
  almost-all error `min{H,y}^ε Ψ(H,y)^{1/2}` for the one-class count.

**No sequel exists.** His arXiv author listing (14 records, read this session)
contains no follow-up on higher moments, tuples, or sifted sets; the nearest is
the 2020 squarefree-variance paper with Matomäki, Radziwiłł and Rodgers.

---

## 2. The nearest `θ > 1` result found, and what it does and does not give

**Farzad Aryan, *The distribution of `k`-tuples of reduced residues*,
Mathematika 61 (2015) no. 1, 72–88, MR3333962, MSC 11N36 / 11N69, preprint
arXiv:1302.2296v2. [SOURCED, verbatim, full PDF read this session].**

This is the closest thing in print to a `θ > 1` version of the object, and it
was reached through the "reduced residues" convention rather than through
anything containing the word "rough".

- **It forms the object exactly.** His Lemma 1.2 defines, for `q` squarefree and
  `D = {h₁,…,h_s}` admissible,
  `M_k^D(q,h) = Σ_{n=0}^{q−1} | Σ_{m=1}^{h} k_q(n+m+h₁)···k_q(n+m+h_s) −
  h ∏_{p|q}(1 − ν_p(D)/p) |^k`,
  where `k_q` is the coprimality indicator; the paper writes that bracket
  without absolute-value bars, which is the same object at the even `k` used
  here. At `k = 2`, `s = 2`, `D = {0,2}` and
  `q = q_y` this is `q_y` times the corpus's variance of the twin-rough count in
  a window of length `h`, with the corpus's own main term. The excluded-class
  count `ν_p(D)` is the corpus's `θ` and his Remark 1.1 records `ν_p(D) = s` for
  `p > h_s − h₁`, which is the corpus's `α_p = p − 2` for `p ≥ 7`.
- **What he proves is an upper bound only.** `M_k^D(q,h) ≪ q h^{k/2}
  P^{−2^{ks}+ks}` with `P = φ(q)/q`, the implied constant depending on
  `k` and `s`. The exponent is nested, read on a rendered page image of page 5
  (`redteam-0828-varE.md` §7). There is no
  main term, no asymptotic, no `u = log h/log y` coordinate, and grep over the
  full text returns zero hits for `variance`, `Dickman`, and `ρ`. The bound's
  `h^{k/2}` shape is the naive probabilistic one, so at `k = 2` it says the
  variance is `O(h)` and says nothing about the constant, which is the entire
  content of `λ_θ(u)`.
- **His target is a different theorem.** Theorem 0.1 is the `s`-tuple analogue
  of the Erdős–Hooley–Montgomery–Vaughan conjecture on moments of **gaps**
  between reduced residues, `V_λ^D(q) ≪ φ_D(q)P^{−sλ}`. The interval moment is
  machinery, not the result.
- **Nobody followed it.** Two citing works on OpenAlex (`Distribution of Squares
  Modulo a Composite Number`, 2015; `Lemke Oliver and Soundararajan bias for
  consecutive sums of two squares`, 2021), neither on this object.

**Reading.** The `θ = 2` variance has been bounded above with the right main
term subtracted, in a paper from 2015 that Gorodetsky does not cite and that
does not cite anything Dickman-shaped. It has not been evaluated. The gap
between Aryan's `≪ qh` and a constant is the same gap `varE-spectral.md` §2
names as its unproven decoupling step, seen from the other side.

---

## 3. The pieces of a general-`θ` framework that do exist

Stated so the note does not read as "nothing exists", which would be false.

| piece | status | where | what is missing for `θ = 2` |
|---|---|---|---|
| the local densities `∏(1 − ν_p(h)/p)` for arbitrary tuples, with a fundamental-lemma error term | **published, general `k`** | Gorodetsky Lemma 1.4, via Friedlander–Iwaniec Thm 6.12 **[SOURCED, verbatim]** | nothing; this is usable as stated |
| the tuple second moment as an object, with an upper bound | **published, general `s`** | Aryan Lemma 1.2, Mathematika 61 (2015) **[SOURCED, verbatim]** | the asymptotic |
| the exact closed form that makes the primorial case computable at `θ = 1` | **published** | Hausman–Shapiro, *Comm. Pure Appl. Math.* **26** (1973) 539–547, formula (1.21) as quoted by Gorodetsky §1.6.1 **[SOURCED-BIB**, quoted through Gorodetsky, not read**]**; Montgomery–Vaughan, *Ann. of Math.* **123** (1986) 311–333 **[SOURCED-BIB]** | **the `s`-tuple analogue. Not found. This is the single missing identity.** |
| the law `GD(θ)` with density `e^{−θγ}ρ_θ/Γ(θ)` and `xρ_θ'(x) + (1−θ)ρ_θ(x) + θρ_θ(x−1) = 0` | **published probability** | Pinsky, *On the strange domain of attraction to generalized Dickman distributions*, arXiv:1611.07207; Penrose–Wade 2004; Bhattacharjee–Goldstein, *Bernoulli* 25 (2019); Arratia–Barbour–Tavaré tradition **[SOURCED-BIB**, abstracts and secondary statements only**]** | nothing; `varE-spectral.md` §5's `f_θ` is this density verbatim, and its mean `θ` is the published mean |
| sums of a dimension-`κ` multiplicative function over smooth integers, which is what the `θ = 2` decoupled sum is | **published, general `κ`** | Tenenbaum–Wu, *Compos. Math.* **144** (2008) 339–376 and the I/II/IV papers; Hanrot–Tenenbaum–Wu, *Proc. LMS* **96** (2008) 107–135; Smati–Wu 1999; Naimi 2003 **[SOURCED-BIB**, zbMATH review text only**]** | the identification is this note's, and it is untested. See §9 |
| an upper bound on the variance of sieve weights in short intervals at general dimension | **published, unquantified here** | Friedlander–Iwaniec, *Opera de Cribro* §6.10, Prop. 6.26 and Cor. 6.28 **[SOURCED-BIB**, known only through Gorodetsky §1.2's description; the book was not opened**]** | whether it is dimension-general at all is **NOT CHECKED** |

The last row is the one a future pass should open first, because if Prop. 6.26
is stated for a general sieve dimension then the `θ = 2` upper bound is in a
textbook and Aryan is not the nearest neighbour.

---

## 4. Channels, queries, calibration

Per `SEARCH-CONVENTIONS.md`, a negative counts only from a channel calibrated
in the same session on a known positive.

| channel | calibration probe, same session | result | negatives usable |
|---|---|---|---|
| **arXiv abs pages** (`export.arxiv.org/abs/…`) | `2111.00853` returns the Math. Z. journal reference | HTTP 200, correct record | yes |
| **arXiv PDF** (`arxiv.org/pdf/…`) | three PDFs fetched, all `application/pdf`, sha256 in §7 | live | yes |
| **arXiv API** (`export.arxiv.org/api/query`) | not reached | **HTTP 429 "Rate exceeded" on every attempt, `http` and `https`, curl and urllib** | **no. This leg is owed** |
| **arXiv web search** (`arxiv.org/search/`) | `maximal gaps between twin primes` returns exactly arXiv:1901.03785 | 1 of 1, correct | yes, with the caveat below |
| **zbMATH** (`api.zbmath.org`) | `Jacobsthal function primorial` returns 4 records including Ziller–Morack; `variance integers without small prime factors short intervals` returns exactly Gorodetsky | correct on both | yes, remembering that HTTP 404 is a zero and that long queries return unreliable zeros |
| **MathSciNet** (`POST mathscinet.ams.org/mrlookup`) | `au=Gorodetsky, ti=variance` returns MR4812487, MR4349131, MR4244849; `ti=tuples reduced residues` returns MR3333962 (Aryan) | correct on both | yes, **title fields only**; no review text, no abstract, no MSC search |
| **OpenAlex, `cites:` filter** | `cites:W3171452153` returns 23 | live | yes |
| **OpenAlex, topic/title search** | `title.search:reduced residues` does **not** return Aryan's paper in 50 results, though its title contains the phrase | **calibration FAILED** | **no. Count no negative from OpenAlex search** |
| **OpenCitations v2** | `citation-count/doi:10.4007/annals.2015.181.1.7` returns 168 | live | yes |
| **Semantic Scholar graph API** | `/citations` on an unrelated arXiv id returns a populated list; the `/paper` endpoint returned HTTP 429 once | partially live | citations endpoint yes, metadata endpoint owed |
| **WebSearch** | `variance of k-tuples of integers free of small prime factors in short intervals Dickman` returns Gorodetsky's Springer and arXiv pages first | correct | yes |
| **Google Scholar** | not attempted | unreachable by design here | **owed** |

**A caveat that voids several zeros.** The arXiv web search treats a multi-word
query as a conjunction over metadata only, so long queries return zero for
trivial reasons and short ones return noise. `variance rough numbers short
intervals` returns **0** while `variance integers without small prime factors
short intervals` returns exactly Gorodetsky. The word "rough" is in his
introduction, not his abstract. Any negative from this channel on a query
containing "rough" is worthless, and that is a convention lesson, not a
finding.

**Citation graph on Gorodetsky, three channels, calibrated:** OpenAlex 1,
OpenCitations 0, Semantic Scholar 1. The one citing work in both nonzero
channels is Sanyal–Pillai, *Bootstrap Diagnostics for Fixed Factored Integers*,
*Sankhya A* (2026), DOI `10.1007/s13171-026-00450-z`, which is not on this
object.

**Queries run, with their answers.** All 2026-08-28.

| query | channel | answer |
|---|---|---|
| `variance integers without small prime factors short intervals` | arXiv, zbMATH | exactly Gorodetsky, both |
| `variance rough numbers short intervals` / `"rough numbers" variance` | arXiv | 0, and void, see the caveat |
| `rough numbers short intervals variance` | zbMATH | exactly Gorodetsky |
| `variance sifted set short intervals` | zbMATH | 0 (HTTP 404) |
| `variance sifted integers short intervals` | arXiv | 0 |
| `sifted numbers short intervals` | zbMATH | 1, Maier–Sankaranarayanan on exponential sums, not the object |
| `ti = variance sifted` | MathSciNet | 0 records |
| `variance prime k-tuples short intervals` | arXiv | 0 |
| `variance prime tuples short intervals singular series` | zbMATH | 0 |
| `variance coprime tuples short intervals` | zbMATH | 0 |
| `moments of sifted sets short intervals` | arXiv | 0 |
| `generalized Dickman distribution` | arXiv, zbMATH | 18 and 30 records, all probability or smooth-number, none a sieve variance |
| `generalized Dickman function sieve dimension` | zbMATH | 0 |
| `Dickman distribution sieve dimension` | arXiv | 0 |
| `Dickman function generalization` | zbMATH | 3, Smati–Wu 1999, Naimi 2003, Covo 2009 |
| `Poisson approximation rough numbers intervals` | arXiv | 0 |
| `distribution of k-tuples of reduced residues` | zbMATH, MathSciNet | **Aryan 2015**, the §2 hit |
| `Hausman Shapiro reduced residues` | zbMATH | 2, Diamond–Vaaler 1985 and Aryan |
| `distribution of reduced residues Montgomery Vaughan` | zbMATH | 3, none with a tuple asymptotic |
| `twin smooth numbers` | zbMATH | 15, all the cryptographic Prouhet–Tarry–Escott convention. **A false friend: "twin smooth" is owned by isogeny cryptography, Costello–Meyer–Naehrig 2021 and successors, and returns nothing about sieves** |
| `pairs of rough numbers` | zbMATH | 12, all rough-set theory and fluid dynamics. Another false friend |
| `ti = rough numbers intervals` | MathSciNet | 3, all fuzzy-set decision theory |
| `Kuperberg Lalin` | arXiv | 4, all divisor-function symplectic variances, not sifted sets |
| `Montgomery Soundararajan primes in short intervals` | arXiv | located math/0409258, read, see below |
| `Variance of B-free integers in short intervals` | WebSearch, arXiv | Avdeeva arXiv:1512.00149, read, see below |

**Two named checks the brief asked for, both negative at source.**

- **Montgomery–Soundararajan, *Primes in short intervals*, Comm. Math. Phys.
  252 (2004) 589–617, arXiv:math/0409258 [SOURCED, full PDF read].** Grep over
  the full text returns **zero** hits for `sifted`, `sieve`, `Dickman`, `rough`,
  `small prime factors` and `free of prime`. The paper computes moments of
  `ψ(x+h) − ψ(x)` under Hardy–Littlewood and supplies no sieve-level analogue.
  The singular-series moment machinery is there; the sifted-set instance is not.
- **Avdeeva, *Variance of `B`-free integers in short intervals*,
  arXiv:1512.00149 [SOURCED, full PDF read].** Asymptotic variance for `B`-free
  integers, one condition per modulus, `B` a multiplicative semigroup. Grep
  returns zero for `Dickman`, `residue class`, `classes`, `tuple`. Adjacent
  convention, not the object.
- Bloom–Kuperberg, arXiv:2312.09021, *Odd moments and adding fractions*, is odd
  moments of coprime residues in short intervals and averages of the refined
  singular series for **odd** `k`. The variance is the even case they do not
  treat, and the object is coprimality to a general `q`, not `θ` classes per
  prime. **[SOURCED, abstract only]**.

---

## 5. Independent check of `varE-spectral.md` §5's table

The delay equation `xρ_θ'(x) + (1−θ)ρ_θ(x) + θρ_θ(x−1) = 0` with
`ρ_θ(x) = x^{θ−1}` on `(0,1]`, as published for `GD(θ)`, was integrated
numerically at `θ = 2` on a grid of 200000 points to `t = 8`
`[SCRATCHPAD-GRADE]`. Total mass 0.99999078 and mean 1.99992259 against the
published 1 and `θ = 2`. The tail reproduces the note's own table at every
entry: 0.943257, 0.842382, 0.657116, 0.455456, 0.282040, 0.157654 at
`u = 0.6, 1.0, 1.5, 2.0, 2.5, 3.0`, and the closed form
`1 − e^{−2γ}(9/2 − 4 ln 2)` agrees with the numeric `λ₂(2)` to eight decimals.

This is a reproduction, not a validation of the physics. It confirms that the
note's `f₂` is the published `GD(2)` density and that its arithmetic is right.
It says nothing about whether `λ₂` is the limit of the corpus's variance ratio,
which is exactly the step `varE-spectral.md` §2 leaves unproven.

Two further values, for §0's correction: `λ₂(2.317) = 0.340295` and
`λ₂(2.608) = 0.250829` `[SCRATCHPAD-GRADE]`. Both
reproduce in the red team's independent re-derivation (`redteam-0828-varE.md`
§7), so they carry a second witness; the tag stays until they are produced
inside an embedded producer.

---

## 6. Drafted rows, NOT APPLIED

### 6.1 `research/SEARCH-CONVENTIONS.md` §1

| object | our name | canonical | **OWNING convention — search THIS** | where it lives |
|---|---|---|---|---|
| the variance of a `θ`-class sifted count in a window | `Var/E`, `X(L)`, `λ₂(u)`, the twin-rough census dispersion | short-interval variance of a `κ`-dimensional sifted set | **at `θ = 1`: "the variance of integers without small prime factors in short intervals"**, coordinate `u = log H/log y`. **At `θ ≥ 2` the owning convention is not the rough-number one at all: it is "the distribution of `k`-tuples of reduced residues"**, `ν_p(D) = #{h_i mod p}`, `φ_D(q) = ∏_{p|q}(p − ν_p(D))`, and the statistic to search for is the `k`-th moment `M_k^D(q,h)` of the count in an interval of length `h`. Do **not** search "sifted", "sub-Poisson", "dispersion", or "rough". "rough numbers" is in nobody's abstract and "twin smooth" belongs to isogeny cryptography | `θ = 1`: Gorodetsky, *Math. Z.* **308** (2024) Paper 59, Thms 1.1, 1.3. `θ = s`: Aryan, *Mathematika* **61** (2015) 72–88, Lemma 1.2 and Thm 0.1; behind it Montgomery–Vaughan, *Ann. of Math.* **123** (1986) 311–333 and Hausman–Shapiro, *CPAM* **26** (1973) 539–547 |
| the limit law of `log n` for the decoupled divisor | `GD(θ)`, the generalized Dickman law | generalized Dickman distribution | **"generalized Dickman distribution `GD(θ)`"**, density `e^{−θγ}ρ_θ/Γ(θ)`, delay equation `xρ_θ' + (1−θ)ρ_θ + θρ_θ(x−1) = 0`, mean `θ`; the arithmetic-side name is the **dimension-`κ` smooth sum** `Ψ_f(x,y)` with `F(s) = ζ(s)^κ G(s)` | Pinsky arXiv:1611.07207; Penrose–Wade, *Ann. Appl. Probab.* 14 (2004); Bhattacharjee–Goldstein, *Bernoulli* **25** (2019); arithmetic side Tenenbaum–Wu, *Compos. Math.* **144** (2008) 339–376 and Hanrot–Tenenbaum–Wu, *Proc. LMS* **96** (2008) 107–135 |

### 6.2 `research/SEARCH-CONVENTIONS.md` §3 "searches already run"

| question | answer | do not redo |
|---|---|---|
| Is the `θ = 2` short-interval sifted variance asymptotic in print? | **No, in six calibrated channels.** The object is in print with an **upper bound only** (Aryan 2015, Lemma 1.2, general tuple size); the asymptotic and its constant are not. Gorodetsky's Lemma 1.4 supplies the general-`k` local densities but he uses `k = 1, 2` and his stated future work is higher moments of the one-class count | settled at this level; **owed**: the arXiv API leg (429 all session), Google Scholar, MathSciNet review text, and *Opera de Cribro* §6.10 Prop. 6.26's dimension |
| Does Gorodetsky name `GD(θ)`, sieve dimension, or tuples? | **No.** Zero hits for `tuple`, `twin`, `admissible`, `generalized`, `dimension`, `Poisson` in the full text of arXiv:2111.00853v3 | settled, grep over the read PDF |
| Do Montgomery–Soundararajan (CMP 252, 2004) give a sieve-level analogue? | **No.** Zero hits for `sifted`, `sieve`, `Dickman`, `rough` in math/0409258 | settled |
| Has anyone cited Gorodetsky's variance paper on this? | **One citing work across three calibrated citation indexes**, and it is a statistics paper on bootstrap diagnostics | re-run in 12 months, not sooner |
| Is "twin smooth" or "pairs of rough numbers" a usable search term? | **No, both are false friends.** "Twin smooth" is isogeny cryptography (Costello–Meyer–Naehrig 2021); "rough numbers" in a title is fuzzy-set decision theory | never search either again |

### 6.3 The rough-anatomy note's own drafted map row, proposed amendment sentence

**Which row this is.** Not the live map's row 15. `research/IMPORT-MAP.md` row
15 is the fractional-parts row (Saffari–Vaughan, the branch phase
`⌊W/q⌋ mod M_T`), landed 2026-08-28, and it carries no Gorodetsky sentence at
all. The row meant here is the one numbered 15 in
`history/staging/import-rough-anatomy.md` §8.1, DRAFTED there and never applied
to the live map, whose number was taken by the fractional-parts row instead.
Its status cell says "Gorodetsky owns the sub-Poisson convention and shares the
coordinate `s = ln W/ln y` and the factor `∏(1−2/p)` but his `λ(s)` is 12–23×
below the measured `χ²/df`", and the same figure sits in that note's §0.6,
in its §8.4 drafted `SEARCH-CONVENTIONS.md` §3 row, and in the §9 bullet that
points back at §0.6. **All four places were corrected in place on 2026-08-28**
(`history/staging/applied-0828-registries2.md`), so the amendment below is
spent and is kept only as the wording that was applied. The proposed amendment
was: append
"**Corrected 2026-08-28**: his `λ` is the `θ = 1` member of a family and the
corpus's census is a two-class count, so the comparand is `λ₂`, which reads
0.3403 to 0.2508 across the corpus's band coordinates against `χ²/df = 0.718`,
a factor of 2.11 to 2.86 against the like-for-like `λ₁` figures 13.9 and 25.2
at the same `χ²/df = 0.718`; §0.6's 22.7 is a six-band maximum on a
different band and is not the comparand. The mismatch shrinks by 6.6 to 8.8×
and does not close, and the `λ₂` values are `[SCRATCHPAD-GRADE]`."

---

## 7. Artifacts fetched this session

| artifact | source | sha256 | how much was read |
|---|---|---|---|
| Gorodetsky, *The variance of integers without small prime factors in short intervals*, arXiv:2111.00853v3, 24 pp | `arxiv.org/pdf/2111.00853v3` | `069d1a4cd91db35c3ef618c5b64a16ea30e33fe2773d844383f4bb84360ca7a8` | full text extracted; §§1–2 read line by line, remainder grepped |
| the same paper's arXiv abstract page, carrying the Math. Z. journal reference and DOI | `export.arxiv.org/abs/2111.00853` | `33239b4b6a55b40d61caba1c232cc82038719cdedb2a51095598a5af94a9aa8f` | full |
| Aryan, *The distribution of `k`-tuples of reduced residues*, arXiv:1302.2296v2 | `arxiv.org/pdf/1302.2296` | `4a45903af6c1671554fa8c8a89d53640975085db47cf7b2241533ed83e258ae5` | full text extracted; Introduction and §1 read, remainder grepped |
| Montgomery–Soundararajan, *Primes in short intervals*, arXiv:math/0409258 | `arxiv.org/pdf/math/0409258` | `4814387da412faf35d86f7e5d84a789cfa6743b08a6dff1e47fbc7632d7a8176` | full text extracted, grepped for the sieve-analogue question |
| Avdeeva, *Variance of `B`-free integers in short intervals*, arXiv:1512.00149 | `arxiv.org/pdf/1512.00149` | `bba657edf393998a0b9aae1d3d80158d78e442161f233a5894274654ab87df7d` | full text extracted, grepped |

Read as metadata or review text only, never at page image: Aryan's zbMATH
review (Zbl record 6417230, journal and MSC confirmed), Tenenbaum–Wu III and IV
reviews, the OpenAlex and MathSciNet records named above.

**Formula check.** Gorodetsky's `M(H,y)`, `g_y`, `λ(u)` and Theorem 1.3(1) were
read from the `pdftotext -layout` extraction of the PDF, and cross-checked
against the second extraction of the same equations in the arXiv abstract page's
listing and against the independent quotation of `M(H,y)` and `λ` already in
`import-rough-anatomy.md` §6, which was taken from the arXiv HTML. Three
renderings agree. No page image was inspected, which is the residual risk on
subscripted ranges such as `2 < p ≤ y`.

---

## 8. Not reached

- **The arXiv API was 429 for the entire session**, on both schemes and both
  clients. Every arXiv negative here comes from the web search interface, whose
  conjunctive behaviour voids long queries. The API leg is owed.
- **Google Scholar was never attempted**, so the strongest full-text citation
  channel is absent and the "one citing work" figure is a floor, not a count.
- **MathSciNet review text is unreachable** through `mrlookup`, which is
  bibliographic only. A successor stating `λ_θ` in a paper whose title does not
  say so is invisible to every channel used here except WebSearch.
- **Hausman–Shapiro 1973 was not opened.** Formula (1.21) is quoted through
  Gorodetsky §1.6.1. Whether an `s`-tuple analogue of it is derivable, or was
  derived by Montgomery–Vaughan 1986 in passing, is **NOT CHECKED**, and
  Montgomery–Vaughan 1986 was not opened either.
- **Friedlander–Iwaniec, *Opera de Cribro* §6.10 Prop. 6.26** is known here only
  through Gorodetsky's one-sentence description. Whether it is stated at general
  sieve dimension is the cheapest unopened question in this note.
- **Tenenbaum–Wu and Hanrot–Tenenbaum–Wu were not opened.** §3's claim that the
  `θ = 2` decoupled sum is an instance of their dimension-`κ` framework is this
  note's identification from a zbMATH review, and it is untested.
- **The corpus's census convention was not checked against Gorodetsky's.**
  §0's factor 2.11 to 2.86 assumes the corpus's `χ²/df` is a variance-to-mean
  ratio of the same statistic, in the same coordinate, with the same
  normalisation. That assumption is unverified, and if it is wrong the whole
  correction in §0 evaporates.
- **Gorodetsky's hypotheses were still not evaluated at the corpus's `(W, y*)`**,
  which `import-rough-anatomy.md` §9 already recorded as owed. Reading his
  Theorem 1.1 this session does not discharge it, because the corpus's numbers
  were not substituted into `y ≥ (2+ε)log H` and (1.7).

---

## 9. What would falsify this, and whether that check has run

| claim | rung | falsifier | has the check run |
|---|---|---|---|
| Gorodetsky's scope is one excluded class per prime, `k = 1`, second moment | PROVEN from the source | a `k`-tuple or two-class theorem anywhere in arXiv:2111.00853v3 | YES. Full text read, and `tuple`, `twin`, `admissible`, `dimension`, `generalized` return zero hits |
| his `λ(u) = e^{−γ}∫_u^∞ρ` and `M(H,y) ∼ HP_yλ(u)` are as the corpus quotes them | PROVEN from the source | a mismatch against eqs (1.5), (1.10), (1.14) | YES, at three independent renderings; **NO** at page image |
| the `θ = 2` asymptotic is not in print | CONJECTURED, at the strength of a calibrated multi-channel negative | any paper stating `λ_θ`, `GD(θ)` as a sieve variance limit, or an asymptotic for `M_k^D(q,h)` | PARTLY. Six channels calibrated, four legs owed (arXiv API, Google Scholar, MathSciNet reviews, *Opera de Cribro*) |
| Aryan's `M_k^D(q,h)` at `k = s = 2`, `D = {0,2}`, `q = q_y` is the corpus's variance numerator | MEASURED by inspection of two definitions | a normalisation or main-term discrepancy between his `h∏(1−ν_p(D)/p)` and the corpus's `E` | NO. The two definitions were compared by eye, never by evaluating both at one level |
| Aryan supplies no asymptotic | PROVEN from the source | a main term in his Lemma 1.2 or §3 | YES. Full text read; `variance`, `Dickman`, `ρ` return zero hits |
| the corpus's comparand is `λ₂`, not `λ₁` | HEURISTIC | the corpus's census turning out to count single rough integers, or to normalise its `χ²/df` differently | NO. The census's definition was taken from `import-rough-anatomy.md` §6's phrase "rough-pair census" and was not read at its producer |
| `λ₂` at the corpus's bands is 0.3403 to 0.2508, giving a factor 2.11 to 2.86 | MEASURED, `[SCRATCHPAD-GRADE]` | an embedded producer disagreeing | PARTLY. The red team reproduces both values (`redteam-0828-varE.md` §7); this note's own delay-equation integration is an unembedded scratchpad script, and only its `u = 2` value is checkable against a closed form, which it matches to 8 decimals |
| `GD(θ)` is published and `varE-spectral.md` §5's `f_θ` is its density | PROVEN from secondary statements | a discrepancy in the delay equation or the `Γ(θ)` normalisation | YES against two independent secondary statements of the density and the mean; **NO** against a primary |
| the `θ = 2` decoupled sum is a dimension-`κ` smooth sum in Tenenbaum–Wu's sense | CONJECTURED | their hypothesis class excluding `g` with `g(p) ≈ 2/p` | NO. Neither paper opened |
| there is no successor to Gorodetsky on this | MEASURED, weakly | one paper in a full-text index | PARTLY. Three citation indexes calibrated, all returning the same single irrelevant citing work; no full-text index reached |
| this route is novel | **NOT CLAIMED, and it should not be claimed** | Aryan already owns the object; the constant is what is open | the object question is answered NO. The constant question is answered "not found", which is weaker |

*History layer: process record, staging. See `research/history/CHANGELOG.md` for
the corpus rule. This note applied no edit and ran no git command.*
