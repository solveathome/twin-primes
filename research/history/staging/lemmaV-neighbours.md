# lemmaV-neighbours — the five Lemma-V-adjacent instruments, read at source

<!-- ledger
id: Q-lemmaV-neighbours
status: ANSWERED
todo: none
question: What do the five Lemma-V-adjacent instruments give when read at source, and which hypothesis do we violate?
verdict: The right instrument is Maynard's Lemma 6.12, owned by Deshouillers-Iwaniec 1982 Theorem 12 and sharpened by Pascadi's Corollary 18 in exactly the term that binds us; the hypothesis violated is narrower and sharper than the corpus expected, since all three papers allow arbitrary rough coefficients in three of five variables and what they require is smoothness where we have none.
-->

*(2026-08-19. Read-only literature pass on the five items `ojaroudi-read.md` §8
named as unread neighbours of the Lemma V row. No repo file was edited except
this one; nothing was committed and nothing was pushed. Calibration legend:
**[READ-AT-SOURCE]** the PDF of record was opened and the statement copied off
it; **[SECOND-HAND]** the statement reached this file through another paper;
**[NOT REACHED]** not opened; **[DERIVED HERE]** an exponent computation done in
this pass, in a scratchpad calculator that is not a custody-bound artifact —
§9 proposes the repo script that would make it one.)*

---

## 1. HEADLINE

**The right instrument in the family is Maynard's Lemma 6.12, its true owner is
Deshouillers–Iwaniec 1982 Theorem 12, and Pascadi's Corollary 18 is a 2026
sharpening of exactly that theorem in exactly the term that binds us. The
hypothesis we violate is now nameable and priced, and it is not the one the
corpus expected.**

The corpus expected the obstruction to be coefficient roughness in general. It
is narrower and sharper than that. Both DI Theorem 12 and Pascadi Corollary 18
allow arbitrary rough coefficients in three of their five variables. What they
require is that the **modulus** and the **inverted variable** each carry one
factor with a *fixed smooth profile* `g(c/C, d/D)` — not a well-factorable
1-bounded factor, a smooth one. Our Rosser weights are arbitrary functions of the
whole modulus and supply no smooth factor at all.

Priced in the working point of `attack-sqrt-cancellation.md` §1, where the
inverted variable `d₁` runs to `H^{0.500000}`, the modulus `d₂` to
`H^{0.712157}` and the free `h`-sum to `H^{0.212157}` **[DERIVED HERE]**:

| configuration | DI Thm 12 / Maynard Lemma 6.12 | Pascadi Cor 18 |
|---|---|---|
| our object (both moduli fully rough) | `H^{1.818235}`, `γ = 1.500000` | `H^{1.818235}`, `γ = 1.500000` |
| both moduli smooth (unavailable) | `H^{0.962157}`, `γ = 0.793756` | `H^{0.867941}`, `γ = 0.716030` |
| largest rough mass that still clears `H^1` | `H^{0.151372}` | `H^{0.354437}` |

Read the middle row first: **if both `d₁` and `d₂` carried fixed smooth
profiles, either theorem would already clear Lemma V's `≪ H^{1−o(1)}` outright.** The whole gap is the
roughness, and the bottom row says how much roughness is affordable — 12.49 per
cent of ours for DI, 29.24 per cent for Pascadi, against the `H^{1.212157}` we
actually carry. Pascadi's exceptional-spectrum work more than doubles the
affordable roughness and leaves a shortfall of `H^{0.857720}`.

**Nothing reopens the CLOSED verdict on IMPORT-MAP rows 5 and 6, and the reason
is worth the whole read (§6).** These instruments do act on a different
decomposition — the `(h, d₁, d₂)` index of the Vaaler-completed, reciprocity-split
remainder, which is not orthogonal and to which `import-l1l2.md`'s Parseval
identity does not apply. That difference does not reopen a closed row: it
relocates them into a row that was never closed, `attack-sqrt-cancellation.md`'s,
where they are now priced beside DFI and Bettin–Chandee.

**Two of the five are off-branch and one is a stale-record find.** Jutila 2000 is
a spectral large sieve for `L`-function moments whose 23 citers are moments and
`L⁴`-norms, not bilinear Kloosterman remainders; neither Maynard nor Pascadi
cites it. Matomäki–Shao II is additive combinatorics (Bleichenbacher's theorem)
about one class per prime and certifies nothing for two. And the forward walk out
of Maynard II found that this corpus's twin-prime upper-bound record is stale by
two steps (§8).

---

## 2. BIBLIOGRAPHY, AND WHAT WAS READ

All five PDFs were fetched over `export.arxiv.org` (`arxiv.org` itself returns an
interstitial HTML page to this session's client, which is why an earlier session
read that channel as broken) and, for Maynard II, from Oxford ORA.

| # | item | full bibliographic data | status |
|---|---|---|---|
| 1 | Maynard, *Primes in arithmetic progressions to large moduli II: well-factorable estimates* | **Mem. Amer. Math. Soc. 306 (1543), 2025**, DOI 10.1090/memo/1543, ISSN 0065-9266, EISBN 9781470480516; accepted 2022-08-01, published 2025-01-24; ORA uuid `d75350eb-1358-474a-b070-0b4b5ad720b2`, file `s9c67wn95k`, accepted manuscript 27 pp., CC BY-NC-ND. arXiv:2006.07088v1, 26 pp. **Peer reviewed.** | **[READ-AT-SOURCE]** — ORA accepted-manuscript PDF read end to end; Lemma 6.12 read off a 300 dpi image of p. 13; arXiv v1 diffed against it |
| 2 | Maynard, *Primes in arithmetic progressions to large moduli I: fixed residue classes* | **Mem. Amer. Math. Soc. 306 (1542):1–132, 2025**; arXiv:2006.06572v2 (5 Apr 2021), 102 pp. **Peer reviewed.** | **[READ-AT-SOURCE]** — arXiv v2 PDF; §1 and Lemmas 15.1, 18.1, 18.2 read; the bulk of the 102 pp. **[NOT REACHED]** |
| 3 | Pascadi, *Large sieve inequalities for exceptional Maass forms and the greatest prime factor of `n²+1`* | **Forum of Mathematics, Pi 14 (2026) e8**; arXiv:2404.04239v3 (15 Jan 2026), 51 pp. **Peer reviewed** (v3 incorporates referees' comments) | **[READ-AT-SOURCE]** — arXiv v3 PDF; Assumption 14 (p. 31), Corollaries 15, 17, 18 (pp. 31–38) read off 200 dpi page images; §§4, 6 **[NOT REACHED]** |
| 4 | Jutila, *On spectral large sieve inequalities* | **Funct. Approx. Comment. Math. 28 (2000) 7–18**, DOI 10.7169/facm/1538186680, ISSN 0208-6573, Adam Mickiewicz University; MR1823989, Zbl 1007.11027; dedicated to Włodzimierz Staś | **[NOT REACHED]** — Project Euclid paywalls the full text ($25 / subscription) and every download endpoint returns the HTML shell. Abstract and metadata read from the publisher's article page |
| 5 | Matomäki & Shao, *When the sieve works II* | arXiv:1509.02371v1 (8 Sep 2015), 23 pp.; **no journal reference on the arXiv record** | **[READ-AT-SOURCE]** — arXiv v1 PDF; §1 read, §§2–6 skimmed for any two-class statement |

**Provenance discipline.** Every displayed formula quoted below was read off a
rendered page image, not off `pdftotext`. That was not caution: `pdftotext`
silently drops the inverse bar in Maynard's Lemma 6.12, turning
`e(n·\overline{dr}/(cs))` — a Kloosterman fraction — into `e(ndr/(cs))`, which is
not one. A text-layer reading of that lemma would have mis-identified the whole
instrument.

**One arXiv identifier in the corpus needs no correction and one does.**
`attack-sqrt-cancellation.md` §4 already carries Maynard II as arXiv:2006.07088,
which is right; `SEARCH-CONVENTIONS.md` §1 and `ojaroudi-read.md` §8 give only
the ORA uuid for II and 2006.06572 for I, which is also right. There is a third
paper in the series, **Maynard, *Primes in AP to large moduli III: uniform
residue classes*, Mem. Amer. Math. Soc. 306 (1544):1–98, 2025** — the
`a`-uniform case — which no corpus file names. **[NOT REACHED]**

---

## 3. WHAT OUR LEMMA V SLOT ACTUALLY NEEDS

Restated from `attack-sqrt-cancellation.md` §1 and §2 so the comparison below is
checkable, with every quantifier fixed and nothing inherited:

> **FIXED.** `H = z^{β₂}`, `β₂ = 4.26645028414864191641`; the shift is 2; `λ⁺,
> λ⁻` the Rosser–Iwaniec weights, `|λ| ≤ 1`, supported on squarefree `d | P(z)`.
> The inverted variable `d₁` runs to `D⁺ = H^{0.500000}`, the modulus `d₂` to
> `D⁻ = H^{0.712157}`, and the completed `h`-sum to `A = H^{0.212157}`.
>
> **THE SUM**, after Vaaler completion and the reciprocity split verified in
> `attack-sqrt-cancellation.md` §2:
> `R(x) = Σ_{0<|h|≤A} c_h Σ_{d₁,d₂} λλ · e(−h x/(d₁d₂)) · e(−2h·\overline{d₁}/d₂)`.
>
> **NEEDED.** `sup_x |R(x)| ≪ H/log³H`. The trivial bound is the pair count
> `H^{1.212157}`, so the required saving is `H^{0.212157}`, which is 35.00 per
> cent of a square root.

Three features of this decide everything below. **Both** coefficient sequences
are rough — arbitrary sign-varying functions of `d₁` and of `d₂` respectively.
The `h`-sum is **free**, which is what makes a trilinear theorem rather than a
bilinear one the instrument, exactly as `SEARCH-CONVENTIONS.md` §1's Lemma V row
says. And the modulus product `H^{1.212157}` **exceeds the length of the sum**,
which is why the level-of-distribution convention cannot own this object at all:
even Elliott–Halberstam is `length^{1−ε}`.

In `z`-currency the same statement reads: the window is `z^{4.266450}` and the
moduli run to `z^{5.171608}` **[DERIVED HERE]**. The brief's `D = z³` is §7e's
per-side Rosser level in the mean-square setting; the Kloosterman instruments
live in the `H`-parameterisation above, and the two must not be mixed.

---

## 4. PER-PAPER VERDICTS

### 4.1 Maynard II — the instrument is real, and it is Lemma 6.12

**The paper's own results are level-of-distribution statements about primes and
transfer to us not at all.** Theorem 1.1 gives, for `λ_q` *triply well
factorable* of level `Q ≤ x^{3/5−ε}`, that `Σ_{q≤Q} λ_q(π(x;q,a) − π(x)/φ(q)) ≪
x/(log x)^A`; Theorem 1.2 gives the same for the well-factorable upper-bound
linear sieve weights of level `D ≤ x^{7/12−ε}` (ORA accepted manuscript pp. 2–3).
Two hypotheses kill the transfer outright: the summand is `π(x;q,a)`, so one of
the two sequences is the **primes** and not a rough weight; and the level is
`x^{3/5}` against our `length^{1.212157}`. Maynard says so himself about our
problem, on p. 3 of the same PDF:

> "It is likely Theorem 1.2 directly improves several results based on sieves. It
> doesn't directly improve upon estimates such as the upper bound for the number
> of twin primes, but we expect the underlying methods to give a suitable
> improvement for several such applications when combined with technique such as
> Chen's switching principle or Harman's sieve."

*(Verbatim, ORA accepted-manuscript PDF `s9c67wn95k`, p. 3.)*

**Lemma 6.12 is a different matter, and it is the reason the row pointed here.**
Verbatim from a 300 dpi image of p. 13 of the same PDF, with the inverse bar the
text layer drops:

> **Lemma 6.12 (Deshouillers-Iwaniec estimate).** *Let `b_{n,r,s}` be a 1-bounded
> sequence and `R, S, N, D, C ≪ x^{O(1)}`. Let `g(c,d) = g₀(c/C, d/D)` where `g₀`
> is a smooth function supported on `[1/2,5/2] × [1/2,5/2]`. Then we have*
>
> `Σ_{r∼R} Σ_{s∼S, (r,s)=1} Σ_{n∼N} b_{n,r,s} Σ_{d∼D} Σ_{c∼C, (rd,sc)=1} g(c,d) e(n·\overline{dr}/(cs)) ≪_{g₀} x^ε (Σ_{r∼R}Σ_{s∼S}Σ_{n∼N} |b_{n,r,s}|²)^{1/2} J`
>
> *where* `J² = CS(RS+N)(C+DR) + C²DS√((RS+N)R) + D²NR`.
>
> *Proof. This is [5, Theorem 12] (correcting a minor typo in the last term of
> `J²`).*

*(Verbatim, ORA accepted-manuscript PDF `s9c67wn95k`, p. 13. `[5]` is
Deshouillers–Iwaniec, "Kloosterman sums and Fourier coefficients of cusp forms",
Invent. Math. 70 (1982). Maynard I Lemma 15.1, arXiv:2006.06572v2 PDF p. 54, is
the same lemma with the typo spelled out: "which is written as `D²NR/S`".)*

**Hypotheses, item by item, against our configuration.**

| hypothesis | what it demands | our object |
|---|---|---|
| `b_{n,r,s}` 1-bounded, arbitrary in three variables | rough coefficients allowed on the numerator `n` and on `r`, `s` | **match** — our `c_h λ λ` is 1-bounded after normalisation, and the free `h`-sum lands on `n` |
| `(r,s) = 1`, `(rd,sc) = 1` | coprimality of the two modulus factors | **match, and forced** — `g|n`, `g|n+2`, `g` odd forces `g = 1` |
| phase `e(n·\overline{dr}/(cs))` | numerator free, denominator `cs`, inverted variable `dr` | **exact match** with `d₁ = dr`, `d₂ = cs`, `n = 2h` |
| `g(c,d) = g₀(c/C, d/D)` smooth | one factor of the modulus **and** one factor of the inverted variable carry a **fixed smooth profile** | **VIOLATED, and this is the whole gap** |
| moduli versus length | no hypothesis at all | **match** — and this is why the Kloosterman convention owns the object and the level-of-distribution convention does not |

The violation is not repaired by well-factorability. Iwaniec's theorem — quoted
by Maynard on p. 3 — makes the linear sieve weights a linear combination of
sequences well-factorable of level `D`, i.e. `λ_q = Σ_{q=q₁q₂} γ^{(1)}_{q₁}
γ^{(2)}_{q₂}` with `γ` **1-bounded**. Lemma 6.12 wants `g₀`, a fixed smooth
profile. A 1-bounded arbitrary factor is not a smooth one, and the gap between
them is the whole content of the lemma: the smoothness in `c` and `d` is what the
Poisson and Kuznetsov steps consume.

**Verdict: the closest live neighbour of the five, and the first instrument the
corpus has held whose failing hypothesis is a single named property rather than a
range mismatch.**

### 4.2 Maynard I — the fixed-residue case, and one extra lemma worth naming

Theorem 1.1 (arXiv:2006.06572v2 PDF p. 3) bounds `Σ_{q₁≤Q₁}Σ_{q₂≤Q₂}
|π(x;q₁q₂,a) − π(x)/φ(q₁q₂)| ≪ x/(log x)^A` subject to three side conditions,
`Q₁Q₂² < x^{1−100ε}`, `Q₁^{12}Q₂^7 < x^{4−100ε}` and `Q₁^{20}Q₂^{19} <
x^{10−100ε}`; the moduli reach `x^{11/21−ε}` and the error is taken in absolute
value rather than against a well-factorable weight. **Same two killers as II**:
the summand is the primes, and `11/21 = 0.5238` is far below `length^1`, let
alone `length^{1.212157}`. It carries the same Deshouillers–Iwaniec Theorem 12 as
its Lemma 15.1, so it adds no new instrument on that side.

**It does carry one instrument the corpus has never named.** Lemma 18.1
("Deshouillers–Iwaniec Bound", arXiv:2006.06572v2 PDF pp. 68–69) is DI's
**Theorem 9**, a bilinear form in Kloosterman *sums* rather than fractions:
`Σ_{m∼M} b_m Σ_{n∼N} a_n Σ_{(c,r)=1} g(c/C) S(mr, n; sc)`, with **both** `b_m`
and `a_n` arbitrary complex sequences, `r ∈ [R,2R]` and `s ∈ [S,2S]` **fixed**
rather than averaged, only `c` smooth, and an explicit exceptional-spectrum
factor `(1 + S²C²R/(MN))^{θ_{rs}}` with `θ_q ≤ 7/32` by Kim–Sarnak (his Lemma
18.2). Maynard notes there that DI's own Theorem 9 carries a typo,
`(1+S²CR/(MN))^{θ_{rs}}` for `(1+S²C²R/(MN))^{θ_{rs}}`. This is the only member
of the family read in this pass that tolerates two rough sequences with **one**
smooth variable, and it is a Kloosterman-sum statement, so reaching it from our
fraction sum would need a completion step this pass did not attempt. **Flagged
as the one unexplored direction, not claimed as a route.**

### 4.3 Pascadi — a 2026 sharpening of the exact lemma, in the exact term

Pascadi's Corollary 18 is announced in his own words as improving DI Theorem 12,
i.e. Maynard's Lemma 6.12. Verbatim from 200 dpi images of arXiv:2404.04239v3
PDF pp. 37–38:

> **Corollary 18 (Incomplete Kloosterman bounds with averaging over `r, s, n, c,
> d`).** *Let `R, S, N ≥ 1/2`, `C, D, Z ≫ 1`, `Y_N > 0`, and `ε > 0`. For each
> `r ∼ R`, `s ∼ S` with `gcd(r,s) = 1`, let the tuple `(rs, N, Z,
> (a_{n,r,s})_{n∼N}, A_{N,r,s}, Y_N)` satisfy Assumption 14, `w_{r,s} ∈ C`, and
> `Φ_{r,s} : (0,∞)³ → C` be a smooth function, with `Φ_{r,s}(x,y,z)` supported in
> `x, y, z ≍ 1`, and `∂ˣ∂ʸ∂ᶻΦ_q(x,y,z) ≪ Z^{jε}` for `j,k,ℓ ≥ 0. Then with a
> consistent choice of the ± sign, one has*
>
> `Σ_{r∼R, s∼S, (r,s)=1} w_{r,s} Σ_{n∼N} a_{n,r,s} Σ_{c,d, (rd,sc)=1} Φ_{r,s}(n/N, d/D, c/C) e(±n·\overline{rd}/(sc)) ≪_ε (RSNCDZ)^{O(ε)} ‖w_{r,s}A_{N,r,s}‖₂ · I`
>
> *where* `I² := D²NR + (1 + C²/(R²SY_N))^{2θ_max} · CS(C+DR)(RS+N)`.

*(Verbatim, arXiv:2404.04239v3 PDF, statement on p. 37 and display (5.35) with
`I²` on p. 38. `θ_max := sup_q θ(q)` with `θ(q) = max(0, 1/4 − λ₁(q))^{1/2}`, and
`θ_max ≤ 7/64` by Kim–Sarnak, his Theorem C, p. 30 — so `2θ_max ≤ 7/32`, the same
constant as Maynard I's Lemma 18.2.)*

**What changed, and it is precisely the term that binds us.** Set Pascadi's `I²`
beside Maynard's `J²`. The first and third of DI's terms survive; **the middle
term `C²DS√((RS+N)R)` — the exceptional-spectrum term — is gone**, replaced by a
multiplicative factor `(1 + C²/(R²SY_N))^{2θ_max}` on the surviving main term. In
our configuration the middle term is exactly the binding constraint (§5), so the
sharpening lands where we need it.

**The hypothesis that lets him do it, and how much of it we get.** Assumption 14
(p. 31) is a large-sieve condition on the Fourier coefficients of exceptional
Maass forms weighted by `(a_n)`, parameterised by `Y_N`. Pascadi's own note on
the same page settles our case:

> "For example, Theorem A shows that the tuple `(q, N, 1, (a_n)_{n∼N}, ‖a_n‖₂²,
> 1)` satisfies Assumption 14 for any `q ∈ Z₊`, `N ≥ 1/2` and any complex
> sequence `(a_n)_{n∼N}`; attaining higher values of `Y_N` requires more
> information about `(a_n)`."

*(Verbatim, arXiv:2404.04239v3 PDF p. 31.)*

So **Corollary 18 applies to our arbitrary `h`-coefficients with `Y_N = 1`** and
no additional structural hypothesis, which is the generous reading. The larger
`Y_N` values in his (5.18) and (5.19) need the sequence to be additively
structured — `a_n = e(nα)`, or a two-parameter shifted-convolution shape — and
the Vaaler coefficients are neither. **All the numbers in §5 are computed at
`Y_N = 1`.** A future pass that found additive structure in our `h`-coefficients
would get more; this pass claims none.

**The smoothness hypothesis is inherited unchanged.** `Φ_{r,s}(n/N, d/D, c/C)` is
smooth in `d` and `c` exactly as `g₀(c/C, d/D)` is. Pascadi removes the
exceptional spectrum; he does not remove the smooth profile. **So the hypothesis
we violate is the same hypothesis in both papers, and it is the only one.**

**Verdict: the sharpest instrument in print for our slot, and it does not
reach.**

### 4.4 Jutila — off-branch, and the citation walk says so

**[NOT REACHED]** at the text; Project Euclid returns the HTML shell for
`.pdf`, `.full` and the `journalArticle/Download` endpoint alike, and the article
is behind a $25 paywall or a subscription. From the publisher's article page for
DOI 10.7169/facm/1538186680, the abstract as printed there:

> "The spectral large sieve inequality due to H. Iwaniec, that is an estimate for
> the mean square over a spectral interval of a linear form in the Fourier
> coefficients of Maass wave forms is reported by use of a formula of Y.
> Motohashi and the 'hybrid' large sieve inequality. Then the result is
> generalized to the case, where the coefficients of the linear form may depend
> on the respective eigenvalue of the hyperbolic Laplacian, and also on a
> well-spaced set of points."

*(Abstract only, from the publisher's article page; the full text is paywalled
and was not opened, so nothing here is a reading of the theorem.)*

**Two independent signals put it off our branch.** First, neither Maynard I,
Maynard II nor Pascadi 2404.04239 cites Jutila at all. Second, its 23 citing
works, enumerated from OpenAlex `W2894748914`, are moments of `L`-functions,
shifted convolutions, `L⁴`-norms of Maass forms and Kuznetsov-formula
generalisations — with exactly one item touching bilinear Kloosterman objects,
**"Bilinear Forms with GL₃ Kloosterman Sums and the Spectral Large Sieve", IMRN
2015**, which is a `GL₃` object and not ours. **[NOT REACHED]** on that item too.

**Verdict: the row's Kuznetsov line does need a citation, and Jutila 2000 is not
the one it wants.** The statement `IMPORT-MAP.md` §5 gestures at is the
Deshouillers–Iwaniec spectral large sieve as used by Bombieri–Friedlander–Iwaniec
— DI 1982 Theorems 9, 11 and 12 — and §9 proposes that as the citation.

### 4.5 Matomäki–Shao II — a different subject, and the answer to the two-class
question is nothing

Theorem 1.1 (arXiv:1509.02371v1 PDF p. 2) is about `Ψ(x; P) = |{n ≤ x : p|n ⇒ p ∈
P}|`: if there are `1 ≤ u ≤ v ≤ 1000 log x/log log x` with `Σ_{x^{1/v} < p ≤
x^{1/u}, p∈P} 1/p ≥ (1+ε)/u`, then `Ψ(x;P)/x ≥ A_v ∏_{p∈P^c}(1 − 1/p)` with `A_v
= v^{−v(1+o_ε(1))}`. It settles the main conjecture of Granville–Koukoulopoulos–
Matomäki, and the machine is additive-combinatorial: Hypothesis A, a discrete
Bleichenbacher theorem about subsets `A` with `Σ_{a∈A} 1/a > 1/u` containing a
`k`-term sum landing in `(N−k, N]`.

**What it certifies for two residue classes per prime: nothing.** The sieve is
`p | n` — one class per prime, dimension `κ = 1`, and the paper says so in its
own words on p. 1, "the sieving limit `β = 2` for `κ = 1`". There is no bilinear
remainder anywhere in it, no Kloosterman sum, and no statement that survives
replacing `{0 mod p}` by `{0, −2 mod p}`. It is not a Lemma V instrument and it
is not a `G₂` instrument.

**Verdict: off-branch. It reaches the corpus only as a neighbour of
`sift-limit-attack.md` §2's extremal question at `κ = 2`, and even there it is
the `κ = 1` case of a different question — when the *count* is of expected order,
not when the *maximal gap* is.**

---

## 5. THE DECIDING COMPARISON, AND THE PRICE OF THE HYPOTHESIS WE VIOLATE

### 5.1 The identification, stated so it can be checked

Take the aligned positions `x ≡ 0 (mod d₁d₂)`, where
`attack-sqrt-cancellation.md` §2 verified that the window factor `e(−hx/(d₁d₂))`
is identically 1, so a bound on the pure trilinear Kloosterman-fraction sum is
**necessary** and the published theorems apply to that sub-case verbatim.
Decompose dyadically in `h ∼ A′ ≤ A = H^{0.212157}`, using `|c_h| ≪ 1/A′` for the
Vaaler coefficients, and factor `d₁ = d·r` with `r ∼ R = H^ρ` rough and `d ∼ D =
H^{0.500000−ρ}` smooth, `d₂ = c·s` with `s ∼ S = H^σ` rough and `c ∼ C =
H^{0.712157−σ}` smooth. Then `n = 2h`, `N = A′`, and both theorems apply with
`‖b‖₂² ≈ R·S·A′`, giving a bound of `(1/A′)·(RSA′)^{1/2}·J` on each dyadic block
against a per-block trivial bound of `H^{1.212157}`. **Lemma V needs every block
`≪ H^{1−o(1)}`.** **[DERIVED HERE]**

The parameters `(ρ, σ) = (0.500000, 0.712157)` are our actual object — no smooth
factor anywhere. `(ρ, σ) = (0, 0)` is the fantasy in which both moduli are pure
smooth profiles.

### 5.2 The frontier

Maximum `σ` (rough part of the modulus `d₂`) for which the bound stays `≤ H^1`,
as a function of `ρ` (rough part of the inverted variable `d₁`), at `Y_N = 1` and
`2θ_max = 7/32` **[DERIVED HERE]**:

| `ρ` | DI Thm 12: max `σ` | Pascadi Cor 18: max `σ` |
|---|---|---|
| 0.000000 | **0.151372** | **0.354437** |
| 0.050000 | 0.051372 | 0.296297 |
| 0.100000 | infeasible | 0.238158 |
| 0.150000 | infeasible | 0.086523 |
| ≥ 0.200000 | infeasible | infeasible |
| **needed: 0.500000** | **needed: 0.712157** | **needed: 0.712157** |

`ρ = 0` is optimal for both, so the largest affordable total rough mass is
`H^{0.151372}` and `H^{0.354437}` respectively. The binding constraint for DI is
the middle term `C²DS√((RS+N)R)`, which is precisely the term Pascadi's
exceptional-spectrum work deletes — that is why his frontier is 2.34 times
further out in exponent.

### 5.3 The comparison table, in the corpus's own currency

`γ = log|R| / log(pair count)`, pair count `H^{1.212157}`, following
`attack-sqrt-cancellation.md` §4. The first four rows are that file's, cited and
not recomputed per the standing compute rule; the last three are new.

| bound | exponent of `H` | `γ` | % of `√` | verdict |
|---|---|---|---|---|
| trivial, `|r| ≤ 1` | 1.212157 | 1.000000 | 0.00 | `θ_total ≤ 1` |
| DFI 1997 (1.1) | 1.223840 | 1.009638 | −1.93 | worse than trivial here |
| **Bettin–Chandee 2015 Thm 1** | **1.176550** | **0.970624** | **5.88** | best in print, short |
| **needed** | **1.000000** | **0.824975** | **35.00** | break-even |
| **DI Thm 12 / Maynard Lemma 6.12, our roughness** | **1.818235** | **1.500000** | **−100.00** | far worse than trivial |
| **Pascadi Cor 18, our roughness** | **1.818235** | **1.500000** | **−100.00** | far worse than trivial |
| **either, with a smooth modulus profile** | **0.962157 / 0.867941** | **0.793756 / 0.716030** | **>35** | **would clear Lemma V** |

**[DERIVED HERE]** for the last three rows.

The exact `γ = 1.500000` at our roughness is not a coincidence and is worth
keeping: with no smooth variable the Cauchy–Schwarz onto `‖b‖₂` costs exactly
half a square root more than the trivial bound, whatever `J` then does. That is
the signature of using a theorem outside the hypothesis it was built for, and it
is why DFI 1997 — a *derived* consequence tailored to all-rough coefficients —
beats the raw spectral input it is derived from, in our configuration, by
`H^{0.594395}`.

### 5.4 The one-line answer to "which gets closest, and what do we violate"

**Pascadi's Corollary 18 gets closest.** It matches every hypothesis of ours
except one: it requires the modulus `d₂` and the inverted variable `d₁` each to
carry a factor with a **fixed smooth profile**, and permits at most `H^{0.354437}`
of the `H^{1.212157}` we carry to be rough. Well-factorability of the Rosser
weights does not supply smoothness, and no amount of it can: the well-factorable
decomposition produces 1-bounded arbitrary factors, and the smooth profile is the
hypothesis the Poisson and Kuznetsov steps consume.

---

## 6. THE CLOSED ROWS: NO, AND WHY THE "NO" IS THE USEFUL ANSWER

`import-l1l2.md` §5 retired IMPORT-MAP rows 5 (spectral theory of automorphic
forms) and 6 (discrepancy theory) with one mechanism: on the family `Θ_e(a)`, the
`ℓ²` end of any `ℓ¹ → ℓ²√log` conversion is `‖Θ·S_H‖₂ = rms(R_H)` **exactly**, by
the Parseval identity L3, so the conversion's output is `sup_x|R_H(x)| ≤
C·rms(R_H)·√(2 ln W)` — the sharp maximal law — which is TPC-implying at every
constant at which it is both true and useful.

**Do these five act on a different decomposition? YES, and it is a real
difference.** L5's decomposition indexes by `(e, a)`: moduli `e | P(z)` and
reduced frequencies `a mod e`, the additive characters mod `W = P(z)`. These are
**orthogonal**, which is what makes the Parseval identity an identity. The
Deshouillers–Iwaniec instruments act on the `(h, d₁, d₂)` index of the
Vaaler-completed, reciprocity-split remainder. That index is **not orthogonal**:
distinct triples `(h, d₁, d₂)` collide onto the same frequency `h/(d₁d₂)`, so an
`ℓ²` norm over `(h, d₁, d₂)` is strictly larger than `rms(R_H)` and the closure's
identity does not compute it. `attack-hm-basis.md` compared `(e,a)` against the
`(h,m)` basis with `m = [d₁,d₂]` and found them the same instrument with one
summation moved; the `(h, d₁, d₂)` index is finer than `(h,m)` and that
comparison does not reach it.

**Does that reopen rows 5 or 6? NO, on two independent grounds, and neither is
"the tool is too weak".**

*First, they are not conversions.* Rows 5 and 6 are about a specific missing
statement — an `ℓ¹ → ℓ²√log` bound on the arithmetic of `Θ_e(a)`. Lemma 6.12 and
Corollary 18 are not statements of that shape at all. They are direct bilinear
estimates: they bound the sum by `‖coefficients‖₂ × J`, where all the arithmetic
sits in `J` and there is no `√log` and no maximal law anywhere. A theorem that is
not of the closed shape cannot reopen the closure of that shape.

*Second, and this is the decisive one, they aim at a strictly weaker target.* The
closed conversion delivers `sup|R_H| ≈ H^{1/2+o(1)}`, since `rms ≤ √(B·H)` with
`B ∈ [1.27, 1.68]` (`sift-limit-attack.md` §7e) and the log factor is
`√(2 ln W)`. That is enormously stronger than Lemma V, which asks only for
`≪ H/log³H = H^{1−o(1)}`. **The closure's mechanism — "the conversion's output IS
the sharp maximal law, hence TPC-implying" — has no purchase on a bound that
stops at `H^{1−o(1)}`.** Lemma V at the working point buys `θ_total` from
1.000000 up past the break-even 1.208983 and improves the exponent below `β₂`; it
does not imply the postulate.

**So the correct placement is: rows 5 and 6 stay CLOSED, unchanged, and none of
the five belongs to them.** All five belong to the row
`attack-sqrt-cancellation.md` opened — bilinear and trilinear forms with
Kloosterman fractions on the `(h, d₁, d₂)` index — which was never closed and is
now populated with two more members and one quantified hypothesis. `IMPORT-MAP.md`
§5's sentence "The one published machine that extracts cancellation from an `ℓ¹`
sum over moduli is spectral: Deshouillers–Iwaniec via the Kuznetsov formula" is
**confirmed at source** by this read; what it did not say, and what §9 proposes it
should, is that the machine is a *different row's* instrument when it acts on the
divisor-pair index rather than on `Θ_e(a)`.

**The NO is worth as much as a YES would have been.** It converts row 5's
`[SOURCED-BIB]` provenance — statements named but not opened — into a reading, and
it says that opening them changes nothing about the closure. The row can now be
regraded from "an address and an anchor" to "read, and correctly closed", without
anybody re-proposing the spectral family for the `Θ_e(a)` slot again.

---

## 7. CITATION SPOT-CHECKS

**Backward from Maynard II.** `[2]` Bombieri–Friedlander–Iwaniec, Theorem 10 —
well-factorable level `x^{4/7−ε}`, already in the corpus. `[5]`
Deshouillers–Iwaniec, Invent. Math. 70 (1982), **Theorems 9, 11 and 12** — the
true owners of Lemmas 15.1, 18.1 and 6.12. `[15]/[16]` Iwaniec, the
well-factorability of the linear sieve weights. **[NOT REACHED]** on the DI 1982
paper itself; every statement above is Maynard's or Pascadi's restatement of it,
and both restatements carry explicit typo corrections to the original, which is a
reason to read DI directly before anybody quotes `J²` as DI's own.

**Forward from Maynard II, and this is where the read paid.** Two items sit
strictly closer to us than any of the five:

| item | why it is closer |
|---|---|
| **Pascadi, *On the exponents of distribution of primes and smooth numbers*, arXiv:2505.00653v2 (29 Jun 2025), 42 pp., preprint** | supersedes Maynard II's own headline: level `x^{5/8−ε}` for triply-well-factorable weights and `x^{3/5−ε}` for the upper-bound well-factorable linear sieve weights, both unconditional, against Maynard's `3/5` and `7/12`. **[READ-AT-SOURCE]**, §1 |
| **Lichtman, *Primes in arithmetic progressions to large moduli, and Goldbach beyond the square-root barrier*, arXiv:2309.08522v1 (30 Aug 2023), 55 pp., appendix with Sary Drappeau, preprint** | the intermediate step: level `66/107 ≈ 0.617` unconditional, `5/8` conditional on Selberg's eigenvalue conjecture. **[READ-AT-SOURCE]**, §1 |

Neither transfers to Lemma V — both are level-of-distribution results about
primes, both below `length^1` — but both change what the corpus should say about
the state of the art, and one of them corrects a live number (§8).

**Two more names in the bilinear-Kloosterman convention that no corpus file
carries**, both from Pascadi's bibliography: **Kowalski–Michel–Sawin, "Bilinear
forms with Kloosterman sums and applications", Ann. of Math. (2) 186 (2017)
413–500**, and their **"Stratification and averaging for exponential sums:
bilinear forms with generalized Kloosterman sums", Ann. Sc. Norm. Super. Pisa Cl.
Sci. (5) 21 (2020) 1453–1530**. **[NOT REACHED]**. These are the algebraic-geometry
branch of the same convention — Deligne-type rather than spectral — and they are
the obvious next read after this one.

**Forward from Pascadi 2404.04239.** OpenAlex records zero citing works for the
Forum of Mathematics Pi version as of this session, which is what a paper
published in 2026 looks like and is not evidence of anything.

**Channel calibration, run this session.** `export.arxiv.org/api/query` with
`id_list=1512.03213,1509.02371,2404.04239,2505.00653` returned all four with
correct titles, authors and journal references — **PASS**. Crossref
`api.crossref.org/works` on a bibliographic query returned Jutila's DOI as the
first hit — **PASS**. OpenAlex `/works/doi:10.7169/facm/1538186680` and
`?filter=cites:W2894748914` returned the record and all 23 citers — **PASS**.
`zbmath.org` returned a JavaScript challenge and Google Scholar was not reachable
— **channel dead, and no negative was drawn on either**. WebSearch was exhausted
before this pass began, so every search above ran on the API channels named.

---

## 8. CORRECTIONS TO THE RECORD

*(Proposed, for a human to place. Nothing outside this file was edited.)*

**(1) `natal-cap-10-sieve-cap.md` §1.2 and §1.4 and `sift-limit-attack.md`:229
carry a stale twin-prime record, by two steps.** The corpus states the record as
`π₂(x) ≲ 3.29956·Π(x)`, Lichtman ANT 19 (2025) Theorem 1.2. Lichtman's own
chronology table lists that value as his 2022 result, and two later results beat
it:

| year | source | `π₂(x)/Π₂(x) ≲` | status |
|---|---|---|---|
| 2022/2025 | Lichtman, Algebra Number Theory 19 (1):1–38, 2025 | 3.29956 | peer reviewed — **the corpus's current number** |
| 2023 | Lichtman, arXiv:2309.08522v1 Theorem 1.1, p. 2 | **3.2290** | preprint |
| 2025 | Pascadi, arXiv:2505.00653v2 Corollary 1.4, p. 3 | **3.203** | preprint |

Both new values are from preprints, so the peer-reviewed record is unchanged and
the corpus's sentence is not wrong so much as incomplete. The suggested wording
is "3.29956 (Lichtman 2025, the peer-reviewed record); 3.2290 and 3.203 claimed
in the preprints Lichtman arXiv:2309.08522 and Pascadi arXiv:2505.00653". Read at
source: `π₂(x) . 3.2290 Π₂(x)` on p. 2 of the arXiv:2309.08522v1 PDF, and
`#{p ≤ x : p, p+2 are prime} ≤ (3.203 + o(1))Π₂(x)` on p. 3 of the
arXiv:2505.00653v2 PDF. **[READ-AT-SOURCE]**

**(2) `attack-sqrt-cancellation.md` §4's "neighbouring convention" list names
Maynard's `x^{3/5−ε}` as the well-factorable record.** It is now `x^{5/8−ε}`
(Pascadi arXiv:2505.00653 Theorem 1.3(i), p. 2), with `x^{3/5−ε}` for the
upper-bound linear sieve weights (Theorem 1.3(ii), same page) against Maynard's
`x^{7/12−ε}`. The file's conclusion is untouched — every one of these is still a
level below `x^1`, and our need is `length^{1.212157}` — but the numbers should
move.

**(3) `ojaroudi-read.md` §8's identification of the corpus's existing
Matomäki–Shao is right and the note beside it can be sharpened.** arXiv:1512.03213
is *Vinogradov's three primes theorem with almost twin primes*, Compositio Math.
153 (2017) 1220–1256 — a published paper on a different subject from 1509.02371,
which has no journal reference. Neither is a Lemma V instrument.

**(4) `IMPORT-MAP.md` §5's Kuznetsov line still lacks its citation, and Jutila is
not it.** Proposed citation: Deshouillers–Iwaniec, *Kloosterman sums and Fourier
coefficients of cusp forms*, Invent. Math. 70 (1982), Theorems 9, 11 and 12, as
restated in Maynard, Mem. AMS 306 (1543) Lemma 6.12 and Mem. AMS 306 (1542)
Lemmas 15.1 and 18.1, and sharpened in Pascadi, Forum Math. Pi 14 (2026) e8
Corollary 18.

---

## 9. PROPOSED ADDITIONS

*(Report only. No file outside this one was touched.)*

**(a) `SEARCH-CONVENTIONS.md` §1, Lemma V row — replace the trailing "also live
and unread" clause.** The two Maynard papers are now read and are not the
instrument; the instrument is the lemma inside them and its 2026 sharpening.
Suggested replacement for that clause:

> …**the trilinear theorem is the instrument here because our `h`-sum is free** |
> Duke–Friedlander–Iwaniec, *Invent. Math.* **128** (1997) 23–43; Bettin–Chandee,
> arXiv:1502.00769 — the all-rough branch, best in print for us. The **smooth-modulus
> branch** is Deshouillers–Iwaniec, *Invent. Math.* **70** (1982), **Theorems 9,
> 11, 12**, quotable through Maynard, Mem. AMS **306** (1543) **Lemma 6.12** and
> Mem. AMS **306** (1542) **Lemmas 15.1, 18.1**, and sharpened by Pascadi, *Forum
> Math. Pi* **14** (2026) e8 **Corollary 18**. **It is not available to us**: it
> requires a *fixed smooth profile* `g₀(c/C, d/D)` on one factor of the modulus
> and one of the inverted variable, and well-factorability supplies 1-bounded
> factors, not smooth ones. Unexplored: the algebraic-geometry branch,
> Kowalski–Michel–Sawin, *Ann. of Math.* **186** (2017) 413–500 and *Ann. SNS
> Pisa* **21** (2020) 1453–1530.

**(b) `SEARCH-CONVENTIONS.md` §1, one new row** — the corpus has no row for the
level-of-distribution convention, and `attack-sqrt-cancellation.md` §4 had to
explain in prose why that convention cannot own our object:

> | a sieve remainder summed over moduli larger than the sum's length | Lemma V's modulus range | — | **"level of distribution"** and **"exponent of distribution"**, `Σ_{q≤x^θ} λ_q(π(x;q,a) − π(x)/φ(q))`; **`θ` is always `< 1` in this convention and ours is `1.212157`, so a clean negative here is guaranteed and worthless** — search the Kloosterman-fraction row instead | BFI `x^{4/7−ε}`; Maynard, Mem. AMS **306** (1542)/(1543), `x^{11/21−ε}` and `x^{3/5−ε}`; Lichtman arXiv:2309.08522 `x^{66/107}`; Pascadi arXiv:2505.00653 `x^{5/8−ε}` |

**(c) `PRIOR-ART.md`** — five items with full bibliographic data from §2 above,
each with its READ/NOT-REACHED status, plus Maynard III (Mem. AMS 306 (1544)),
Pascadi arXiv:2505.00653, Lichtman arXiv:2309.08522 and the two
Kowalski–Michel–Sawin papers.

**(d) A repo script, `research/lemmaV-neighbours-01.js`, to put §5's numbers
under custody.** Everything in §5 marked **[DERIVED HERE]** came out of a
scratchpad exponent calculator and has no OUTPUT block, no code hash and no
`embed.js` run. The script should take `J²` and `I²` verbatim from the two
theorems, evaluate the dyadic-block bound over a grid in `(ρ, σ, a′)`, and print
the frontier table of §5.2 and the last three rows of §5.3. Until it exists,
those numbers are a reading aid and should not be quoted as corpus constants.
Two independent checks it should carry: at `(ρ, σ) = (0.500000, 0.712157)` both
theorems must return exactly `γ = 1.500000`, and the `(ρ, σ) = (0, 0)` column
must reproduce `0.962157` and `0.867941`.

**(e) `IMPORT-MAP.md` §5 regrade.** The row's family is now read at source rather
than `[SOURCED-BIB]`. The row stays CLOSED for the `Θ_e(a)` slot, with the added
sentence that the same machine is a live instrument on the `(h, d₁, d₂)` index,
where it fails on a smoothness hypothesis rather than on strength.

---

## 10. NOT REACHED

- **Jutila's text** — paywalled at Project Euclid; only the abstract and metadata
  were read. Any claim about what his generalisation gives is therefore
  unavailable, and none is made here.
- **Deshouillers–Iwaniec, Invent. Math. 70 (1982)** — the source of Theorems 9,
  11 and 12. Every version of `J²` in this file is a restatement by Maynard or
  Pascadi, and both flag typos in the original, so the primary must be opened
  before `J²` is attributed to DI directly.
- **Maynard I §§5–20 and Maynard III entirely**; **Pascadi 2404.04239 §§4 and 6**;
  **Pascadi 2505.00653 §§2–7**; **Lichtman 2309.08522 §§2–10 and its appendix**;
  **Matomäki–Shao II §§2–6** beyond a skim for two-class statements.
- **Kowalski–Michel–Sawin 2017 and 2020**, and **"Bilinear Forms with GL₃
  Kloosterman Sums and the Spectral Large Sieve", IMRN 2015** — identified, not
  fetched.
- **Whether the Vaaler coefficients `c_h` carry enough additive structure to
  reach a `Y_N > 1` in Pascadi's Assumption 14.** All numbers here are at
  `Y_N = 1`. This is the one place where a further reading could improve the
  frontier of §5.2 without needing smoothness, and it was not attempted.
- **Any completion step from our Kloosterman-fraction sum to the
  Kloosterman-*sum* form of Maynard I's Lemma 18.1**, which is the only statement
  found in this pass tolerating two rough sequences against a single smooth
  variable.

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed
by document.*
