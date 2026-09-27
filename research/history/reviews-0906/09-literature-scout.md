# 09 — Literature and data scout, wave 2026-09-06

**Read-only with respect to the repository. No repo file was created, edited or
deleted.** Baseline read: `CLAUDE.md`, `research/SEARCH-CONVENTIONS.md` (all),
`research/RESEARCH-HANDOFF.md` (all), `research/structural-literature-audit.md`
§§1,3, and the four wave-1 reports 01–04 in this directory.

**Nothing below closes the residual, supplies the OPEN consumer of handoff §3,
or changes the controlled region.** Twin-prime infinitude remains OPEN; the
sufficient margin `C_2 x + E_dagger >= c_0 x/(log x)^K` remains OPEN. Every row
is an interface reading, a negative, or a data pointer.

**Status vocabulary used in the tables**
- `PRIMARY (byte)` — I downloaded the PDF/text myself and read the statement in
  the extracted text on this machine.
- `PRIMARY (relayed)` — the publisher/arXiv/blog page was fetched, but the
  statement reached me through the fetch tool's summarising model, not a
  byte-level read. Weaker than `PRIMARY (byte)`; treat quoted exponents as
  needing one confirmation before use in a budget.
- `ABSTRACT ONLY` — arXiv API metadata (title/abstract/comment/journal-ref)
  read at byte level; the body was not opened.
- `FETCH FAILED` — I could not open it. This is a statement about the fetcher.

---

## A. The classical reduction of Λ(n)Λ(n+2) to bilinear Möbius forms, and where the remaining form is named as the parity-obstructed piece

| source | exact statement (compressed, hypotheses kept) | mapping to our objects | status |
|---|---|---|---|
| **Tao, "Notes on the Bombieri asymptotic sieve", blog post 2016-07-17** (`https://terrytao.wordpress.com/2016/07/17/notes-on-the-bombieri-asymptotic-sieve/`) | Main theorem: for a sequence `a_n` obeying the axioms — in particular axiom (iv), the EH-type hypothesis `Σ_{d ≤ x^{1-ε}} |Σ_{n≤x, d|n} a_n − C x g(d)/d| ≪_{ε,A} x log^{-A} x` for all `ε,A>0` — one gets `Σ_{n≤x} Λ_{\vec k}(n) a_n = (G(1)+o(1)) (Π k_i!/(|k|−1)!) C x log^{|k|−1}x` **for every tuple `\vec k ≠ (1,…,1)`**, i.e. for every generalised von Mangoldt EXCEPT the one that counts primes. The residual freedom is one scalar `δ_x ∈ [0,2]` with `Σ_{n≤x} Λ(n)Λ(n+2) = (δ_x+o(1))·2Π_2 x`; Tao states that "no additional bound beyond the inequalities `0 ≤ δ_x ≤ 2` provided by the Bombieri asymptotic sieve is known, even if one assumes all other major conjectures in number theory." Further: **on GEH, the twin prime conjecture would follow from `≫ x/log²x` solutions of `p_1p_2 − p_3p_4 = 2` in primes with `p_i ≥ x^α` and `p_1p_2 ≤ x`, for some fixed `α>0`.** | This is the *sharpest published statement of where our object (3) sits*. Our (3) is the corner of `R(x)` where both cofactors `k,t` are essentially prime just above `V,Z`; Tao's `p_1p_2 − p_3p_4 = 2` is exactly the determinant equation with **all four** variables prime and all `≥ x^α`. Difference: our `d,e` carry `µ` and range over `x^{6/25} < d`, `x^{1/20} < e`, not restricted to primes; and our target is an upper bound on a signed error, not a lower bound on a count. The `δ_x ∈ [0,2]` sentence is the exact calibration for handoff §3: the literature has no bound on the twin main-term coefficient beyond the trivial interval, which is what our `C_2 x + E_dagger ≥ c_0 x/log^K x` is asking for. | `PRIMARY (relayed)` — page fetched twice, statements relayed by the fetch model; blog, not refereed |
| **Murty & Vatwani, "Twin primes and the parity problem", J. Number Theory 180 (2017) 643–659**, DOI 10.1016/j.jnt.2017.05.011 (PDF read via Wayback copy of the author page) | Two hypotheses. `EH_Λ(x^θ)`: `Σ_{q≤x^θ} max_{y≤x} max_{(a,q)=1} |Σ_{n≤y, n≡a (q)} Λ(n) − y/φ(q)| ≪_A x/(log x)^A`. **`EH_{µ_h}(x^η)` (their new one):** `Σ_{q≤x^η} max_{y≤x} max_{(a,q)=1} |Σ_{n≤y, n≡a (q)} Λ(n)µ(n+h) − (1/φ(q))Σ_{n≤y} Λ(n)µ(n+h)| ≪_A x/(log x)^A`. **Theorem 1.1**: for fixed even `h ≠ 0`, if `EH_Λ(x^θ (log x)^C)` and `EH_{µ_h}(x^{1−θ})` hold for some fixed `θ<1` and suitably large fixed `C`, then (a) the assertions `Σ Λ(n)Λ(n+h) ∼ S(h)x` and `Σ Λ(n)µ(n+h) = o(x)` are **equivalent**, and (b) `Σ_{n≤x} Λ(n)Λ(n+h) ≥ (1−o(1)) S(h)(1−A(h)) x` with `A(h) = Π_{p∤h, p>2}(1 − 1/(p(p−1)))`. They remark the proof also works with the fixed class `n ≡ −h (mod q)` in place of the max over classes. | This is the closest *named sufficient pair* to our handoff §3 consumer. Comparison: our consumer is a **one-sided lower bound on a single signed sum** at level "every fixed exponent below 19/25 controlled"; theirs is **two equidistribution hypotheses at complementary levels θ and 1−θ**, one of them about `Λ·µ_h` in progressions — an object we do not currently form. Their `EH_{µ_h}` is not implied by anything we have; conversely nothing in their scheme prices `E_dagger`. Their (b) gives a positive proportion `(1−A(h))` of the singular series, which is the same *shape* of conclusion as handoff §3's `c_0 x/(log x)^K` but with `K=0`. | `PRIMARY (byte)` |
| **Vatwani, "Variants of equidistribution in arithmetic progression and the twin prime conjecture", Math. Z. 293 (2019) 285–317**, DOI 10.1007/s00209-018-2177-z | Follow-up to the above; bibliographic data confirmed via Crossref and Semantic Scholar. **Abstract not obtained** (publisher elides it; Springer redirects to an IdP; no preprint located on arXiv under the author's name). | Unknown; presumed to weaken or vary `EH_{µ_h}`. Cannot be priced. | `FETCH FAILED` (Springer 303 → IdP; Crossref/S2 return no abstract) |
| **Friedlander & Iwaniec, "Asymptotic sieve for primes", Ann. of Math. 148 (1998) 1041–1065**, arXiv:math/9811186 | Already priced in `structural-literature-audit.md` §3F: distribution level `x^{2/3}<D<x` plus the bilinear hypothesis (B) on `µ(mn)a_{mn}` yields a prime asymptotic for a nonnegative sequence. | Unchanged from the existing audit. Choosing `a_n = Λ(n−2)` establishes neither hypothesis. Re-reading it did not change the reading. | not re-read; existing audit stands |
| **Heath-Brown, "Prime twins and Siegel zeros", Proc. LMS (3) 47 (1983) 193–224** | If exceptional (Siegel) zeros exist infinitely often, then twin primes are infinite. | Conditional on a hypothesis widely believed false; orthogonal to our unconditional route. It is a *second* known parity-breaking mechanism, alongside FI's bilinear hypothesis, and is worth naming in the repo only as context. | `FETCH FAILED` at the article text (Oxford Academic / Wiley abstract pages only); statement `SNIPPET ONLY` |
| **Bombieri, "The asymptotic sieve", Rend. Accad. Naz. XL (5) 1/2 (1975/76) 243–269** | The origin of the `δ_x ∈ [0,2]` phenomenon. | Not opened. Tao's 2016 post is a faithful modern account and is the usable locator. | `FETCH FAILED` (no open copy located) |

**What this changes for us.** One thing, and it is a calibration rather than a
tool. The literature's own statement of the endgame — Tao's `δ_x ∈ [0,2]` and
his GEH-conditional reduction to `p_1p_2 − p_3p_4 = 2` — is *the same shape* as
handoff §3's OPEN consumer and *the same determinant equation* as our `R(x)`,
with our `µ`-weighted divisor variables in place of two of his primes. That is
evidence that our object is the right object, and simultaneously evidence that
nobody has an unconditional handle on it: Tao's sentence is that no bound
better than `0 ≤ δ_x ≤ 2` is known even under all major conjectures. Murty–
Vatwani supply a concrete alternative sufficient pair; it is not weaker than
ours in any way I can demonstrate, and it requires an object (`Λ·µ_h` in
progressions to level `x^{1−θ}`) that our reduction does not produce. **No
reviewed statement in item A supplies an input to `E_dagger`.**

---

## B. Correlations `µ(an+b)µ(cn+d)` with the coefficients varying or averaged

Our object (3) needs the dilations `r, r'` to be **primes in short ranges and
averaged over**, with the two linear forms carrying *different* dilations.

| source | exact statement | mapping | status |
|---|---|---|---|
| **Tao, "The logarithmically averaged Chowla and Elliott conjectures for two-point correlations", Forum Math. Pi 4 (2016) e8**, arXiv:1509.05422v4 | `Σ_{x/ω(x) < n ≤ x} λ(a_1n+b_1)λ(a_2n+b_2)/n = o(log ω(x))`, for **fixed** naturals `a_1,a_2,b_1,b_2` with `a_1b_2 − a_2b_1 ≠ 0`, any `ω(x)→∞`. Extends to bounded multiplicative `g_i` under a non-pretentiousness hypothesis (Theorem 1.3 / hypothesis (1.6) in the repo's existing reading). | Coefficients **fixed**; the `o(·)` depends on them. Our `r, r' ~ x^w, x^v` grow polynomially. Already recorded as a mismatch in `shifted-prime-decomposition.md` §5; **re-confirmed, no improvement in any later version.** | `PRIMARY (relayed)` (abs page); repo's existing reading unchanged |
| **Matomäki, Radziwiłł & Tao, "An averaged form of Chowla's conjecture", Algebra Number Theory 9 (2015) 2167–2196**, arXiv:1503.05121v3 | `Σ_{h_1,…,h_k ≤ H} |Σ_{n≤X} λ(n+h_1)…λ(n+h_k)| = o(H^k X)` whenever `H=H(X) ≤ X` tends to infinity, `k` fixed; decay rate roughly `log log H/log H`; also `∫_0^X |Σ_{x≤n≤x+H} λ(n)e(αn)| dx = o(HX)` uniformly in `α`. | Averages over **shifts**, not over dilations. Our shifts are effectively determined (`dk−et=2`) and our free average is over the coefficients. **No transfer.** | `ABSTRACT ONLY` (byte-read metadata) |
| **Tao & Teräväinen, "The structure of correlations of multiplicative functions at almost all scales…", Algebra Number Theory 13 (2019) 2103–2150**, arXiv:1809.02518v2 | Studies `E_{n ≤ X/d} g_1(n+ah_1)…g_k(n+ah_k)` **as a function of the dilation parameter `a` and the scale `d`**. Structural result: such correlations vanish asymptotically for almost all `X` unless `g_1…g_k` weakly pretends to be `χ(n)n^{it}`, in which case they behave like a multiple of `d^{-it}χ(a)`. Gives unweighted `k`-point Chowla for `k` odd or `k=2` outside a set of `X` of zero logarithmic density. | **This is the only located result that carries an explicit dilation parameter `a`.** But `a` multiplies the *shifts*, not the argument: the forms are `n + a h_i`, all with leading coefficient 1. Our forms are `c_0 + rm` and `d_0 + r'm` with *different* leading coefficients `r ≠ r'`. So the structure theorem does not cover our shape, and its conclusion is a "for almost all `X`" statement, which is compatible with handoff §3's scale-average alternative but does not supply it. | `ABSTRACT ONLY` (byte-read metadata) |
| **Teräväinen, "On binary correlations of multiplicative functions", Forum Math. Sigma 6 (2018) e10** (41 pp.), arXiv:1710.01195v2 | Logarithmically averaged binary correlations of bounded multiplicative `g_1,g_2` that are *uniformly distributed in arithmetic progressions to fixed moduli*; conclusion: the correlation is asymptotic to the product of the mean values. | Fixed moduli, fixed shift; `µ` is not covered by the "uniformly distributed in APs" class in the way needed, and no dilation average. **No transfer.** | `ABSTRACT ONLY` |
| **Klurman, Mangerel & Teräväinen, "Multiplicative functions in short arithmetic progressions", Proc. LMS 127 (2023) 366–446**, arXiv:1909.12280v5 | Variance of `Σ_{n≤x, n≡a (q)} f(n)` over classes `a mod q` is small as soon as `q = o(x)`, for almost all `q`, with a nearly power-saving exceptional set; a hybrid short-interval + progression version; and for smooth-supported `f`, the **maximal** deviation over all classes is small for `q ≤ x^{1/2−ε}` apart from a nearly power-saving exceptional set. | Growing modulus is handled, growing **dilation of a second linear form** is not. This is a one-point (single `f`) result, not a two-point correlation. Possible relevance to a *different* step (our excluded-prime Möbius means at large moduli) but not to object (3). | `ABSTRACT ONLY` |
| **Klurman, Mangerel & Teräväinen, "On Elliott's conjecture and applications", arXiv:2304.05344v2** (no journal ref as of this read) | For non-pretentious multiplicative `f: N→D`, `(1/x)Σ_{n≤x} f(n+h_1)\bar f(n+h_2) → 0` along a set of `x` of full upper logarithmic density; `k`-point version for odd `k`, real non-pretentious `f`. | Distinct **integer shifts**, leading coefficient 1, no dilation. **No transfer.** | `ABSTRACT ONLY` |
| **Tao & Teräväinen, "Quantitative correlations and some problems on prime factors of consecutive integers", arXiv:2512.01739v2** | Already in the audit (§3E): quantitative two-point correlations of 1-bounded multiplicative functions outside a small set of logarithmic scales; Remark 3.2 covers Liouville correlations for linear forms with **polylogarithmic** coefficients. | Confirmed unchanged. Polylogarithmic ≠ our `x^{6/25}`-scale dilations. | `ABSTRACT ONLY`; audit reading stands |
| **Guo, "Logarithmic Chowla Correlations Across All Shift Scales", arXiv:2608.23500v4** (2026-08-24, v4 by the time of this read; **unrefereed preprint, no journal ref**) | Claims an absolute `c>0` and, for each large `x`, a single exceptional set `E_x ⊆ [1,x]` with `|E_x ∩ [1,H]| ≪_A H(log x)^{-A}` for every fixed `A>0`, such that `max_{h ≤ x, h ∉ E_x} sup_{y ≤ x} |Σ_{n≤y} λ(n)λ(n+h)/n| ≪ (log x)^{1−c}`. Also a GRH-conditional uniform bound. | Growing **shift** `h` up to `x`, uniformly outside a thin set. Still leading coefficient 1 on both forms; still Liouville, log-averaged, and only a `(log x)^{1−c}` saving. Our requirement is a **fixed power** saving on a `µ`-weighted, prime-restricted, dilated sum. **No transfer.** Flagged only because it is the newest thing in this convention; a v4 within three weeks and no refereeing is a reason to hold it at the door. | `ABSTRACT ONLY`; unrefereed |
| **Pilatte, "Improved bounds for the two-point logarithmic Chowla conjecture", arXiv:2310.19357v2** and **Pilatte, "Improved bounds for the Fourier uniformity conjecture", arXiv:2604.26564v1** | Already in the audit (§3E) for the former: `Σ_{n≤x} λ(n)λ(n+1)/n = O((log x)^{1−c})`. The latter: `Σ_{X≤x<2X} sup_α |Σ_{x≤n<x+H} λ(n)e(nα)| = o(HX)` for `H ≥ exp((log X)^{2/5+ε})`. | Neither carries a dilation average nor a prime-restricted coefficient. The Fourier-uniformity paper is a genuine 2026 improvement over Walsh but on an object we do not form. | `ABSTRACT ONLY` |

**What this changes for us: nothing, and the negative is now in the owning
convention.** Searched: "Chowla conjecture for linear forms", "averaged
Chowla", "logarithmically averaged Chowla/Elliott", "correlations of
multiplicative functions", "dilated correlations", the arXiv author trails of
Teräväinen (45 records, every title read), Klurman, Pilatte, and the arXiv
abstract index for `dilate` + `multiplicative`. **I found no result of any kind
that averages over the coefficients `(a,c)` of two linear forms.** The single
result carrying an explicit dilation parameter (Tao–Teräväinen 1809.02518)
dilates the *shifts*, keeping both leading coefficients equal to 1. This is a
clean negative in the right convention; it is not a proof that such a result is
impossible, and it does not bear on whether our object (3) is hard.

---

## C. A citable published statement of Bombieri–Vinogradov for the Möbius function

The repo currently cites an EPFL exercise sheet (`shifted-prime-decomposition.md`
via SEARCH-CONVENTIONS §1). Wave-1 report 02 flags this as the one citation that
should be replaced. **I did not find a published theorem stating it.** What I
did find:

| source | exact statement | mapping | status |
|---|---|---|---|
| **Tao, 254A Notes 3, "The large sieve and the Bombieri–Vinogradov theorem"** (`https://terrytao.wordpress.com/2015/01/10/…`), **Theorem 16 (General Bombieri–Vinogradov theorem)** | For `α` supported on `[1,M]`, `β` on `[1,N]`, `MN ≪ x`, subject to conditions (23)–(25) — namely `Σ_m |α(m)|² ≪ M log^{O(1)}x`, `Σ_n |β(n)|² ≪ N log^{O(1)}x`, and the Siegel–Walfisz property `Δ(β·1_{(·,s)=1}; a(r)) ≪_A N log^{-A}x` for all `A>0`, all primitive `a(r)`, all `1 ≤ s ≤ x` — one has `Σ_{q≤Q} sup_{a∈(Z/qZ)^×} |Δ(α*β; a(q))| ≪_A x log^{-A}x`, valid for `Q ≤ x^{1/2} log^{-B}x` and `M,N ≥ log^B x`, `B = B(A)` large. | **This is the right general theorem, and `µ` is not of the form `α*β`.** To get Möbius BV you must first apply a Vaughan or Heath-Brown identity to `µ` and then apply Theorem 16 to each bilinear piece (plus a Type I treatment of the short pieces). That is a derivation we would own, not a citation. | `PRIMARY (relayed)` — page fetched, statement relayed; **blog, not published** |
| same, **Exercise 14** | Combining Barban–Davenport–Halberstam (their Theorem 13) with Siegel–Walfisz gives `Σ_{q≤Q} Σ_{a∈(Z/qZ)^×} |Δ(Λ1_{[1,x]}; a(q))|² ≪_A x² log^{-A}x` for `Q ≤ x log^{-B}x`, **and "similar result for the Möbius function μ."** | An **`L²`** (BDH) statement for `µ`, at level `Q ≤ x log^{-B}x`. It is *not* the `max`-over-`a`, `L¹`-in-`q` statement the repo uses, and Cauchy–Schwarz does not convert it (the `L²` sum is over all classes, and the max is not controlled). | `PRIMARY (relayed)` |
| **Granville & Shao, "Bombieri–Vinogradov for multiplicative functions, and beyond the `x^{1/2}`-barrier", Adv. Math. 350 (2019) 304–358**, arXiv:1703.06865, p. 2 | Verbatim from the introduction: *"The analogous result is known to hold when f = µ, the Mobius function, and when f is the characteristic function for the y-smooth numbers [16, 23]"*, where the "analogous result" is `Σ_{q∼Q} max_{a:(a,q)=1} |Δ(f,x;q,a)| ≪_A x/(log x)^A`. **References [16] and [23] are Fouvry–Tenenbaum (PLMS 63 (1991) 449–494) and Harper (preprint), both of which are the *smooth-number* references**; no reference is attached to the `µ` half of the sentence. They also point at "the very elegant proof in **Theorems 9.16, 9.17 and 9.18 of [18]**", `[18]` = Friedlander–Iwaniec, *Opera de Cribro*, AMS Colloq. 57 (2010), and at "chapter 28 of [8]", `[8]` = Davenport, *Multiplicative Number Theory*, 3rd ed. | A **published assertion that the result is known**, with no proof locator for `µ`. Usable as evidence that the statement is standard; **not usable as the citation itself.** | `PRIMARY (byte)` — PDF downloaded, line read in extracted text |
| **Iwaniec & Kowalski, *Analytic Number Theory*, AMS Colloq. 53 (2004), Chapter 17 "Primes in Arithmetic Progressions", §17.2 "Bilinear forms in arithmetic progressions", §17.3 "Proof of the Bombieri–Vinogradov Theorem", §17.4 "Proof of the Barban–Davenport–Halberstam Theorem"** | Section titles confirmed byte-level from a front-matter PDF. §17.2 is the textbook home of the general bilinear BV. **I could not open the chapter text**; the only full-book URL I located returned a 6-page front-matter file. One search snippet described "[IK, Theorem 17.4]" as a bilinear result requiring Siegel–Walfisz on one factor, but that is snippet-level and I do not record it as read. | If §17.2's theorem is the general bilinear BV, it is the natural published replacement for the EPFL sheet — **after** someone confirms the theorem number and statement at the page and adds the Vaughan/Heath-Brown decomposition of `µ`. | section titles `PRIMARY (byte)`; theorem statement `FETCH FAILED` |
| **Friedlander & Iwaniec, *Opera de Cribro*, AMS Colloq. 57 (2010), Theorems 9.16–9.18** | Named by Granville–Shao as an "extraordinarily general" proof of BV. **Closed access; not opened.** | Same recommendation as IK. | `FETCH FAILED` |

**What this changes for us.** The honest state: **no published theorem statement
of Möbius BV was located in this session.** Recommendation, in order of
preference: (1) obtain IK Chapter 17 §17.2 or Opera de Cribro §9.16–9.18 at the
page and cite the general bilinear BV there, adding our own one-paragraph
Vaughan/Heath-Brown reduction of `µ` — this is a citation plus a derivation we
own, and it should be labelled that way; (2) failing that, cite Tao 254A Notes 3
Theorem 16 with the same explicit reduction, flagged as a blog source; (3) do
**not** cite Granville–Shao's introductory sentence as the theorem — it is an
unreferenced assertion in a published introduction. Under any of these the
repo's use of the result is safe (nobody doubts it), but the current EPFL
citation and any of these replacements are different rungs and should be
labelled differently.

---

## D. Dispersion, Kloosterman fractions, large moduli, 2023–2026

I did not re-price items the structural audit already priced (Pascadi 2404.04239
Thm 3 and the GAFA non-abelian amplification paper; Blomer–Pascadi 2607.24311
Thm 1.1; Pascadi 2304.11696 and 2505.00653; Fouvry–Radziwiłł 1811.08672; the
trace-function family). Below: **only version checks that came out different
from the repo's record, and items the audit does not carry.**

| source | exact statement | mapping | status |
|---|---|---|---|
| **Dong, Robles & Zeindler, "Bilinear forms with Kloosterman fractions and applications", arXiv:2601.00292 — CORRECTION TO THE REPO'S RECORD** | The paper is **at v2 (2026-01-05) and is NOT withdrawn.** Its v2 comment reads verbatim: *"We accidentally missed a factor of L^2 in equation (2.53), which turns L^5 into L^7. The rest of the argument is still valid, but does not lead to an improved bound as claimed. We acknowlede Alexandru Pascadi for discovering this error so fast"*. The abstract still advertises the (now retracted) `1/12`% saving at `M ≈ N`. | Operationally the repo's conclusion is right — **do not import the improvement** — but `SEARCH-CONVENTIONS.md` §1 (paired-endpoint row) and wave-1 report 03 both say "withdrawn", which is factually wrong: it is a live v2 with an author erratum. That distinction matters, because "the rest of the argument is still valid" leaves the *unimproved* parts citable. | `PRIMARY (byte)` — arXiv API metadata |
| **Wright, "Trilinear Kloosterman fractions I: partially fixed moduli and unbalanced convolutions", arXiv:2604.25177v2 (updated 2026-08-07), Theorem 2.1 — UPGRADED FROM SECONDARY** | Wave-1 report 03 read this "only through a fetched rendering — SECONDARY, unverified". I downloaded the v2 PDF and read Theorem 2.1 in the extracted text: for `B(M,N,A;R) := Σ_{a∼A}Σ_{m∼M}Σ_{n∼N, (m,nR)=1} α_m β_n ν_a e(θ am/(nR))`, with `M ≪ N²` and `R ≪ M^A` for some large `A`, `B(M,N,A;R) ≪ M^ε ‖α‖‖ν‖‖β‖ (AMN)^{1/2} R^{1/4} (1+|θ|A/(MN))^{1/4} × [ N^{-1/8} + R^{1/8}N^{1/8}M^{-1/4} + M^{3/10}R^{-3/20}A^{-3/20}N^{-3/20} + N^{3/20}A^{-3/20}M^{-1/5} + N^{1/8}M^{-1/2} ]`. The paper states that at `R=1` this is exactly (7.2) of Bettin–Chandee. | Confirms report 03's pricing input at byte level. The `R=1` class survives and dominates for us, which is report 03's own finding; nothing changes. | `PRIMARY (byte)` |
| **Wright, "Trilinear Kloosterman fractions II: subdyadic intervals and nearly balanced convolutions", arXiv:2608.27732v1 (2026-08-27) — NOT IN THE REPO** | Abstract: for `α_m`, `β_n` on `m∼M`, `n∼N` with `β_n` equidistributed for small moduli and `Q = X^{1/2+ε}`, the Fouvry–Radziwiłł unbalanced-convolution bound `Σ_{q∼Q}|ΣΣ_{mn≡a (q)} α_mβ_n − (1/φ(q))ΣΣ_{(mn,q)=1} α_mβ_n| ≪ X/log^A X` holds for `N = X^{1/2+δ}`, `M = X^{1/2−δ}` with `0<δ<1/68`, improving Fouvry–Radziwiłł's `0<δ<1/112`. Proved by sharpening Bettin–Chandee **when some of the sums run over subdyadic intervals**. | The **subdyadic-interval** sharpening is the part worth checking against our object (2): our harmonic band `H ⊆ [A,2A]` with `A ≤ x^{3/50}` and the `j∼J` decomposition produce genuinely short ranges, which is exactly the regime Wright II says he improves. This is the one genuinely new instrument located in this sweep. **I have not read the body and have not priced it**; the headline (`δ` from 1/112 to 1/68 in a `Q=X^{1/2+ε}` convolution problem) is not our problem, and a headline saving without a coefficient interface is no bound. | `ABSTRACT ONLY` |
| **Milićević, Robinson & Shupe, "Sums of products of Kloosterman sums to prime power moduli", arXiv:2608.21346v1 (2026-08-21) — NOT IN THE REPO** | Bounds on **complete** sums of products of `k` additively shifted Kloosterman sums to odd high prime power moduli `q = p^n`, with power savings about `q^{-1/⌈k/2⌉}` in generic configurations and a quantification of alignment among the shifts. | Adjacent to `prime-power-dispersion.md`, whose exceptional branch is about prime-power gcd factors. But their object is a *complete* sum of a product of Kloosterman sums with additive shifts, not our rational-frequency incomplete phases; and `q=p^n` with `n` large is not our composite `e q_1 q_2`. **Probably not matched**; flagged so the next wave can dismiss it deliberately rather than by omission. | `ABSTRACT ONLY` |
| **Mohammadi, "Bilinear Kloosterman sums over small boxes and uniformity of a random walk", arXiv:2608.01203v1** | Bilinear Kloosterman sums over boxes **in `F_{p^n}`**, nontrivial for `|B_1||B_2| > p^{n/2+ε}`. | Finite-field setting, not `Z/c`. **No transfer.** Recorded to close the "small boxes" lead. | `ABSTRACT ONLY` |
| **Runbo Li, "Primes in arithmetic progressions to large moduli and refinements of Harman's sieve", arXiv:2602.20917v6** | Mean value theorems for primes with **bilinear** moduli up to `x^{9/17}` and **trilinear** moduli up to `x^{17/32}`; new upper and lower bounds for `π(x;q,a)` for almost all `q`. | The `θ < 1` level-of-distribution convention. `SEARCH-CONVENTIONS.md` §1 already records that a negative in this convention is guaranteed and worthless for our object (our effective `θ` is `1.212157`). Listed so it is not mistaken for an uncovered lead. | `ABSTRACT ONLY` |
| **Lichtman, arXiv:2309.08522v1** (level `66/107`, `5/8` under Selberg's eigenvalue conjecture); **Maynard I/II/III, arXiv:2006.06572 / 2006.07088 / 2006.08250**; **Wright, arXiv:2507.10780v4** (Siegel-zero `θ=2/3−ε` for almost all `a`, resp. almost all `q`) | Level-of-distribution results. | Same convention warning as the row above. Wright 2507.10780 is Siegel-zero-conditional. | `ABSTRACT ONLY` |

**What this changes for us.** Two concrete things, both small. (i) The repo's
"2601.00292 is withdrawn" should read "v2 carries an author erratum retracting
the improvement"; the practical instruction is unchanged. (ii) **Wright II
(2608.27732) is the only new instrument found**, and its selling point —
sharpening Bettin–Chandee when some sums run over **subdyadic** intervals — lands
on the exact regime where report 03 found the `3/50` deficit concentrated
(`j=1`, short `h`-bands). That is a lead, not a saving; the coefficient
dependence is unread and Wright I already priced to `1023/1000 > 1` at this box.

---

## E. Data and numerics

| source | what it contains | URL | status |
|---|---|---|---|
| **OEIS A007508, "Number of twin prime pairs below 10^n"** | 19 terms, byte-read from the OEIS text interface: `2, 8, 35, 205, 1224, 8169, 58980, 440312, 3424506, 27412679, 224376048, 1870585220, 15834664872, 135780321665, 1177209242304, 10304195697298, 90948839353159, 808675888577436, 7237518093734545`. Provenance in the `%E` lines: `π_2(10^15)` Nicely & Szymanski; `π_2(10^16)` Sebah; `a(17)–a(18)` Oliveira e Silva; **`a(19) = 7237518093734545` by Benjamin Chaffin, Jun 2 2026, corrected Jul 8 2026**. A Pfoertner PNG comparing the counts to the Hardy–Littlewood prediction (A152051) using Wolf's 2011 fit was added Jul 8 2026. No b-file. | `https://oeis.org/search?q=id:A007508&fmt=text` | `PRIMARY (byte)` |
| **Oliveira e Silva, "Tables of values of π(x) and of π₂(x)"** | Gzipped text tables. For `π₂`: `π₂(2^k)` first 61 values (`primes/2b00.txt.gz`); `π₂(10^k)` first 18 values (`primes/2d00.txt.gz`); `π₂(k·10^n)` first 10 000 values for `n=1..14` (`primes/2d01.txt.gz`…`2d14.txt.gz`); `π₂(k·10^15)` first 4 000 values (`primes/2d15.txt.gz`). Largest `x` reached: `4·10^18`, computation dated 2012-04-06. 6 152 527 π₂ entries total. | `https://sweet.ua.pt/tos/primes.html` | `PRIMARY (relayed)` — page fetched, file inventory relayed |
| **Nicely, "Enumeration to 10^14 of the twin primes and Brun's constant", Virginia J. Sci. 46:3 (1995) 195–204** | The classical twin enumeration and Brun-constant paper. The author's Lynchburg pages are dead; **OEIS hosts a local PDF copy at `https://oeis.org/A001359/a001359.pdf`.** | as given | not opened; located only |
| **Sebah & Demichel, "Introduction to Twin Primes and Brun's Constant"** | Brun's constant `B_2 ≈ 1.902160583104` from all twin primes to `10^16` (2002). Also the natural home of `C_2` (Hardy–Littlewood twin constant) numerics; Wrench (1961) is the classical high-precision computation of `C_2`. | `http://numbers.computation.free.fr/Constants/Primes/twin.html` | `SNIPPET ONLY` (value relayed by search; page not opened) |
| **Wolf, "The Skewes number for twin primes: counting sign changes of π₂(x) − C₂ Li₂(x)", arXiv:1107.2809** | Sign-change data for the twin remainder against the Hardy–Littlewood prediction. Directly relevant if anyone wants finite evidence about the *sign* of a twin-count remainder — which is the shape of our OPEN consumer. | `https://arxiv.org/abs/1107.2809` | located, not opened |
| **Luo & Ye, "Distribution of neighboring values of the Liouville and Möbius functions", arXiv:2401.18082v1** | A **numerical** study: `λ(n)` and `λ(n+h)` for `n ≤ 10^8` and `1 ≤ h ≤ 1000`; conditional expectations of `λ(n+h)` given `λ(n)=±1`, `χ²` tests of independence; the same for `µ(n)` restricted to squarefree `n`. Reports that the observed conditional expectations differ at finite `X` and that the convergence speed shows no dependence on `h`. | `https://arxiv.org/abs/2401.18082` | `ABSTRACT ONLY` |

**Negative for E, stated explicitly:** I searched for a published numerical study
of **the Vaughan-identity bilinear remainder** and for a **dataset of Möbius or
Liouville correlations along two linear forms with distinct dilations**, in the
owning conventions (`Chowla`+`computation`, `Liouville correlations`+numerics,
OEIS twin-count family). **I found neither.** The only correlation dataset
located is Luo–Ye, which is `λ(n)λ(n+h)` — shift only, `n ≤ 10^8`, `h ≤ 1000`,
leading coefficients 1. Nothing reusable exists for our object (3), so a run
there would be a new run; `data-reuse-audit.md`'s retained prefixes remain the
only reuse candidates.

---

## F. Both cofactors forced prime near the cutoff, in a Vaughan-type twin decomposition

This is the item where the sweep found something.

| source | exact statement | mapping | status |
|---|---|---|---|
| **Bettin & Chandee, "Trilinear forms with Kloosterman fractions", Adv. Math. 328 (2018) 1234–1262**, arXiv:1502.00769v1, **Corollary 1** — *the repo has read Theorem 1 and Remark 1 but, as far as SEARCH-CONVENTIONS records, not this corollary* | Let `Δ ≠ 0` and `T(M_1,M_2,N_1,N_2) := ΣΣΣΣ_{m_1n_2 − m_2n_1 = Δ} f(m_1) g(m_2) α_{n_1} β_{n_2}`, supports `M_i := [M_i/2, M_i]`, `N_i := [N_i/2, N_i]`, with `f^{(j)} ≪ η^j M_1^{-j}`, `g^{(j)} ≪ η^j M_2^{-j}` for all `j ≥ 0` and some `η > 1`. Then `T = Σ_{n_1∈N_1, n_2∈N_2, (n_1,n_2)|Δ} ((n_1,n_2)/(n_1n_2)) α_{n_1}β_{n_2} ∫_R f((x+Δ)/n_2) g(x/n_1) dx + O((ηR)^{3/2} ‖α‖‖β‖ (N_1N_2)^{7/20} (N_1+N_2)^{1/4+ε} (M_1M_2)^ε)`, where `R := M_1N_2/(M_2N_1) + M_2N_1/(M_1N_2)`. Stated to improve **Duke–Friedlander–Iwaniec (1995)**, who had the same result with error `O((ηR)^{19/8} ‖α‖‖β‖ (N_1N_2)^{3/8} (N_1+N_2)^{11/48+ε}(M_1M_2)^ε)`. BC remark that Theorem 1 gives stronger results **when averaging over `Δ`** (citing Bettin–Chandee–Radziwiłł). | **This is our determinant equation, with our arbitrary Möbius coefficients in the right places, and it fails on exactly one hypothesis.** Take `m_1 = k`, `n_2 = d`, `m_2 = t`, `n_1 = e`, `Δ = 2`: `m_1n_2 − m_2n_1 = dk − et = 2`. Then `α_{n_1} = µ(e)`, `β_{n_2} = µ(d)` are arbitrary — allowed. But `f(m_1) = β_V(k)` and `g(m_2) = β_Z(t)` must be **smooth** (`f^{(j)} ≪ η^j M^{-j}`), and ours are the prime-power detectors. So the literature's asymptotic for our determinant sum exists **only when the two cofactor weights are smooth**, i.e. exactly when the parity difficulty is absent. Also: our `Δ = 2` is fixed, so the `Δ`-average escape route BC point at is unavailable. | `PRIMARY (byte)` — PDF downloaded, corollary read in `-layout` extraction |
| **Guria, "An asymptotic formula with power-saving error term for counting prime solutions to a binary additive problem", arXiv:2410.10856v2 (2024-12-19; no journal ref)** | **Theorem 1.2.** For an arbitrary sequence `α(n) = O(n^ε)` and any non-zero integer `r`, with `S_r(X) := Σ_{|a|,|b|,|p|,|d| ≤ X, ad − pb = r} α(a)` where `a,b,d` run over integers and **`p` runs over primes**: `S_r(X) = 8 Σ_{1≤a≤X} (α(a)/a) Σ_{1≤p≤X} ∫_1^X w((|r|+px)/a) dx + O(X^{1+3/4+ε} + r^{1/5} X^{1+11/20+ε})`, `w` a weight satisfying her (3.7)–(3.10); uniform for `0 < |r| ≪ X^{2−ε}`. **Theorem 1.3.** With `p, q` both prime and `b, d` integers, `Σ_{pd − bq = r, |p|,|b|,|q|,|d| ≤ X} 1 = 8 K_r (li X)² + O(X^{1+3/4+ε} + r^{1/5}X^{1+11/20+ε})`, `K_r` explicit. Method: Poisson summation plus "the average of the sums of Kloosterman fractions over primes `p`" (her §1 and the cited Irving, *Average bounds for Kloosterman sums over primes*). She writes: *"This seems to be the only result of this type in the literature in this direction."* She also computes that applying **[BC18, Corollary 1]** in her situation gives the much poorer error `O(X^{1+49/50+ε})`. | **The closest published object to our (1)/(3).** Same determinant equation, prime constraints on two of the four variables, and the method is literally "average of Kloosterman fractions over primes" — the convention item F asked for. The mismatches, all decisive: (i) her box is the cube `[−X,X]^4`, all four variables of comparable size, whereas ours are the unbalanced `d∼x^δ`, `k∼x^{1−δ}` with `dk ∈ (x/2,x]`; (ii) Theorem 1.2 permits **one** arbitrary weight `α(a)` and leaves the remaining two non-prime variables **unweighted**, while our `R(x)` carries weights on all four (`µ(d), µ(e), β_V(k), β_Z(t)`); (iii) Theorem 1.3's main term is `(li X)²`, a *count*, not a signed cancellation. Under the crude dictionary `X² ≈ x` her error `X^{7/4}` reads `x^{7/8}`, better than our `x^{199/200}` — but that is a comparison between two different sums and must not be used as a budget. | `PRIMARY (byte)` — PDF downloaded, Theorems 1.2/1.3 and Remarks 1.1/1.2 read in extracted text |
| **Duke, Friedlander & Iwaniec, "Representations by the determinant and mean values of L-functions" (1995)**, and **DFI, "Bilinear forms with Kloosterman fractions", Invent. Math. 128 (1997) 23–43** | The predecessors of BC Corollary 1, same shape (`two arbitrary + two smooth` on the determinant equation), weaker error. | Same hypothesis failure as BC Corollary 1. | statement via BC's own comparison, `PRIMARY (byte)` for that comparison; DFI not opened |
| **Ganguly & Guria [GG]** (cited by Guria; no arXiv id given in her text) | Asymptotic for the same determinant count with **all four** variables unrestricted integers, error `O(X^{3/2+ε})` for `r = O(X^{1/3})`; and with **one** prime entry, error `O(X^{5/3+ε})` for `r = O(X^{5/3})`. | Shows the price of each prime constraint in this convention: `3/2 → 5/3 → 7/4` as prime constraints are added. Our object adds `µ` on the other two, which this ladder does not reach. | cited-in-`PRIMARY (byte)`; the paper itself not located |

**What this changes for us.** The strongest single finding of this sweep is a
**precisely located hypothesis failure**, not a tool. Bettin–Chandee Corollary 1
and its DFI predecessor prove an asymptotic for *our* determinant equation with
*our* arbitrary Möbius coefficients on the two divisor variables — and require
the two cofactor weights to be smooth. Guria's theorems replace one smooth
weight by a prime constraint and pay a power for it, and she states that hers
appears to be the only result of that type. So: the published frontier on
`x_1x_2 − x_3x_4 = r` is "two arbitrary + two smooth", pushed to "one arbitrary
+ one prime + two free" by Guria. **Our residual needs "two arbitrary Möbius +
two prime-detecting", which is one step past every located statement.** That is
a clean negative in the owning convention, and it is also the sharpest available
description of what our object (3) is asking for.

I searched, and did **not** find, anything treating `Σ_{r,r' prime} Σ_m
µ(d_0 + r'm) µ(c_0 + rm)` or `Σ_p Σ_d µ(d) C(dp − 2)` with `C` a shifted-divisor
coefficient, under the queries "bilinear forms with primes and Möbius", "Type II
sums for the twin prime problem", "linear sieve Type II information",
"parity-breaking Type II estimate", plus the determinant-equation convention
above.

---

## Ranked: the five items that most bear on the next research decision

1. **Bettin–Chandee, Adv. Math. 328 (2018), Corollary 1** — it proves an
   asymptotic for our exact determinant equation with our exact Möbius
   coefficients, and fails only because our two cofactor weights are
   prime-detecting rather than smooth; that is the sharpest one-line statement
   of what object (3) needs, and the repo appears not to have read this
   corollary (only Theorem 1 and Remark 1).
2. **Tao, "Notes on the Bombieri asymptotic sieve" (2016)** — its `δ_x ∈ [0,2]`
   sentence and its GEH-conditional reduction to `p_1p_2 − p_3p_4 = 2` with all
   `p_i ≥ x^α` are the literature's own version of handoff §3's consumer on the
   same determinant equation, and calibrate how little is known there.
3. **Guria, arXiv:2410.10856v2, Theorems 1.2–1.3** — the only located result
   that puts prime constraints on entries of `x_1x_2 − x_3x_4 = r` with a power
   saving, via averaging Kloosterman fractions over primes; it prices what each
   prime constraint costs in that convention and states its own novelty.
4. **Wright, "Trilinear Kloosterman fractions II", arXiv:2608.27732v1** — the
   only new instrument found, and it sharpens Bettin–Chandee precisely for
   **subdyadic intervals**, which is where wave-1 report 03 localised the whole
   `3/50` deficit (`j=1`, short `h`-band); unread body, unpriced.
5. **Murty–Vatwani, JNT 180 (2017), Theorem 1.1** — a concrete, published,
   alternative sufficient pair (`EH_Λ(x^θ)` + `EH_{µ_h}(x^{1−θ})`) that yields
   a positive proportion `S(h)(1−A(h))` of the twin count; worth comparing
   against handoff §3 before any further work on the consumer side, if only to
   confirm that our route asks for less.

---

## Explicit negatives, each in the owning convention

- **Coefficient-averaged Chowla.** No result of any kind averages over the
  coefficients `(a,c)` of two linear forms `µ(an+b)µ(cn+d)`. Channels: arXiv API
  author trails for Teräväinen (45 records, all titles read), Klurman, Pilatte,
  Tao; abstract index on `dilate`+`multiplicative`; WebSearch in the
  "averaged Chowla / logarithmically averaged Elliott / dilated correlations"
  convention. The nearest object is Tao–Teräväinen 1809.02518, which dilates the
  **shifts** (`n + a h_i`) with both leading coefficients equal to 1.
- **Published Möbius Bombieri–Vinogradov.** No published theorem statement
  located. Channels: WebSearch on five phrasings, arXiv API, Kedlaya's notes,
  Tao 254A Notes 3, Granville–Shao's introduction and bibliography. The general
  bilinear BV that would yield it after a Vaughan/Heath-Brown reduction lives in
  IK §17.2 and Opera de Cribro §9.16–9.18, **both of which I failed to open**.
- **Numerics on the Vaughan bilinear remainder, or on Möbius correlations along
  dilated linear forms.** None found. The only correlation dataset located is
  Luo–Ye (shift-only, `n ≤ 10^8`, `h ≤ 1000`).
- **`Σ_{r,r' prime} Σ_m µ(d_0+r'm) µ(c_0+rm)`, or `Σ_p Σ_d µ(d) C(dp−2)`.** Not
  found under "bilinear forms with primes and Möbius", "Type II sums for the
  twin prime problem", "linear sieve Type II information", "parity-breaking
  Type II estimate", or the determinant-equation convention.

## Fetch failures (statements about the fetcher, not the sources)

- Iwaniec–Kowalski, *Analytic Number Theory*, Ch. 17 body — only a 6-page
  front-matter PDF was retrievable; section titles confirmed, theorem text not.
- Friedlander–Iwaniec, *Opera de Cribro*, Theorems 9.16–9.18 — closed access.
- Bombieri, "The asymptotic sieve" (1975/76) — no open copy located.
- Heath-Brown, "Prime twins and Siegel zeros", PLMS 47 (1983) — abstract pages
  only (Oxford Academic, Wiley).
- Vatwani, Math. Z. 293 (2019) 285–317 — Springer 303-redirects to an IdP;
  Crossref and Semantic Scholar both return the record with the abstract elided.
- `https://mast.queensu.ca/~murty/TwinPrimes-Parity.pdf` — HTTP 404 today; the
  Wayback copy (`https://web.archive.org/web/2020/…`) served the full PDF and is
  what I read.
- `https://oeis.org/A007508` via WebFetch — HTTP 403; the text interface
  (`https://oeis.org/search?q=id:A007508&fmt=text`) served it via curl.

## One correction owed to the repo

`research/SEARCH-CONVENTIONS.md` §1, "the difference of two CRT sawtooths"
row, and wave-1 report `03-kernel-separation.md` both state that
**arXiv:2601.00292 is withdrawn**. It is not: it stands at v2 (2026-01-05) with
an author erratum saying a factor of `L^2` was missed in eq. (2.53), that
`L^5` becomes `L^7`, and that the argument is still valid but does not give the
advertised improvement. The instruction "do not import the improvement" is
correct; the word "withdrawn" is not.
