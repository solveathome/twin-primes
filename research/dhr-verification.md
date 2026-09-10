# DHR sieve verification dive

<!-- ledger
id: Q-dhr-verification
status: ANSWERED
todo: none
question: Does the beta2 note's use of the Diamond-Halberstam-Richert dimension-2 sieve survive verification against the primary sources?
verdict: The note's Theorem survives: every mismatch found is a remainder-weight convention absorbed by the z^{eps/2} slack, beta2 = 4.26645028414864191641 on Booker-Browning's rigorous table, and the fundamental-lemma fallback exponent corrects to about 19+eps rather than 18+eps.
-->

**APPLIED: all seven recommendations of §6 are in `paper/beta2-note.md`.
OUTSTANDING: none.** This file is the audit trail `paper/beta2-note.md`:26 names, kept for its
sourcing rather than for anything it still asks for. Its §0 table records what the note said
**before** the audit; §§1–5 and §7 are the source ledger, and they are what the file is for now.

**Target:** the load-bearing citations in `paper/beta2-note.md` (§2 sieve input, §6 honesty
section). Method: WebSearch/WebFetch + curl + pdftotext on primary and near-primary sources,
triangulating the book-internal statements through four independent published restatements,
each quoted verbatim with links. The Diamond–Halberstam book itself was not obtainable when
this dive ran; **it has since been obtained and read line-level**, which closed the one residual
this file opened — see §5.

## 0. Executive verdicts

**This table is the 2026-08-14 audit trail. Every correction below has been applied to
`paper/beta2-note.md`; the middle column records what the note said before, not what it says
now.**

| # | Claim as originally drafted in beta2-note.md | Verdict |
|---|---|---|
| 1a | β₂ = 4.2665… is the DHR dimension-2 sifting limit | **VERIFIED, decimals corrected.** True value β₂ = 4.26645028414864191641 (rigorous, Booker–Browning). "4.2665" is the correct 4-d.p. *rounding* but "4.2665…" as a decimal expansion is wrong (next digits are not ≥5xxx; expansion is 4.266450…). |
| 1b | Attribution "Franze's Table 1 … giving β₂ = 4.2665" | **CONVENTION-MISMATCH (citation).** Franze's Table 1 prints **4.266** (3 d.p.), not 4.2665. Likewise Franze prints Λ²Λ⁻ **4.516**, not the note's "4.5161" — the string "4.5161" appears nowhere in Franze's paper (grep-verified). Cite Booker–Browning's ancillary table for the precise value. |
| 1c | Theorem shape: remainder weighted by μ²(d)·3^ν(d) at level D | **CONVENTION-MISMATCH (harmless).** The DH 2008 book's Theorem 9.1 carries the remainder **2·Σ_{m\|P(z), m<y} 4^ω(m)\|r_A(m)\|** — weight 4^ν, ×2, level y = z^u the *same* y as in f_κ(log y/log z). The 3^ν(d) form is the older HR-1974 condition R(κ,α). With trivial \|r_d\| ≤ 2^ν(d) the note's §3 goes through verbatim with 8^ν in place of 6^ν (D log⁷D instead of D log⁵D) — still crushed by z^{ε/2}. Exactly the outcome §6.2 of the note predicted. |
| 1d | The o(1) in the main term | **VERIFIED and improved:** it is explicit in Thm 9.1: O((log log y)²/(log y)^{1/(2κ+2)}) = O((log log y)²/(log y)^{1/6}) at κ=2, uniform given the Ω-condition constants. |
| 1e | Line-by-line check of DH book Thm 9.1 hypotheses | **CLOSED.** Could not be accessed in this dive, and the hypotheses were triangulated from three independent restatements with residual risk assessed as low. The book has since been read line-level and the triangulation held — see §5. |
| 2 | Density: ω(2)=1, ω(p)=2 satisfies the dimension-2 condition | **VERIFIED.** Both the sum-form Ω₂(κ) (which the note checks) and the product-form Ω(κ,L) that DHR formulations actually use follow from Mertens with absolute constants; the twin/g-tuple sequence is the book's own motivating example (§1.3 "Prime g-tuples"). One nit: take z = pₙ+1, not z = pₙ (S(A,P,z) sifts p **<** z; z = pₙ would fail to sift pₙ itself). |
| 3 | Fundamental-Lemma fallback, "u ≳ 9κ, exponent ≈ 18+ε" | **VERIFIED in substance, constant corrected.** FI *Opera de Cribro* Lemma 6.8 form: level D = z^s requires **s ≥ 9κ+1** (= 19 at κ=2) and gives main-term factor 1 − e^{9κ−s}K^{10}; positivity needs s > 9κ + 10 log K. So the fallback exponent is ≈ **19+ε** (plus a K-dependence), not 18+ε; HR-1974-type forms (Thm 2.5 area) give positivity at a u₀(κ) that is absolute but not explicit. Either way "first upper bound at some finite explicit exponent" stands. |

Bottom line: **the note's Theorem survives verification.** Every mismatch found is of the
kind §6.2 anticipated (remainder-weight convention), and every one is absorbed by the
z^{ε/2} slack. The step this dive left open — the literal wording of DH Thm 9.1's hypothesis
block — has since been closed against the book itself (§5).

---

## 1. The value of β₂ — primary numerical sources

### 1.1 Booker–Browning rigorous table (best available source)

A. Booker & T. D. Browning, *Square-free values of reducible polynomials*, Discrete
Analysis 2016:8, arXiv:[1511.00601](https://arxiv.org/abs/1511.00601). Their ancillary
files (fetched and verified directly):

- Table: <https://arxiv.org/src/1511.00601v2/anc/dhr.html>
- Interval-arithmetic C code (Arb): <https://arxiv.org/src/1511.00601v3/anc/dhr.c>

Verbatim from `dhr.html`:

> "Finally, we record the values of the sieve parameters α and β that were computed along
> the way. Each value has been correctly truncated at the 20th decimal place, so that the
> displayed number is a lower bound, and an upper bound is obtained by adding 10⁻²⁰."
>
> κ = 2:  α = 5.35772744559446184227,  **β = 4.26645028414864191641**

So rigorously 4.26645028414864191641 ≤ β₂ ≤ 4.26645028414864191642.
Consequences for the note:

- "β₂ = 4.2665…" should be "β₂ = 4.26645…" (or "β₂ < 4.2665").
- The headline exponent 4.267 is safe (β₂ + ε < 4.267 for small ε... more precisely any
  exponent > 4.26646 works; 4.267 has margin).
- The interval in §5 "(1+o(1), 4.267]" is fine.

Their Theorem 3.1 (attributed to "Diamond, Halberstam and Richert [8, 9, 10]" = the
*Boundary value problem* papers I–III) is the cleanest published definition of α, β,
quoted verbatim from the paper (p. 5–6):

> "Let κ > 1 be a real number, and let σ : R>0 → R be the continuous solution of the system
> u^{−κ}σ(u) = (2e^γ)^{−κ}/Γ(1+κ) for u ∈ (0,2],
> (d/du)(u^{−κ}σ(u)) = −κu^{−κ−1}σ(u−2) for u > 2.
> Then there are real numbers α > β > 2 such that the system
> F(u) = 1/σ(u) for u ∈ (0,α],  f(u) = 0 for u ∈ (0,β],
> (d/du)(u^κ F(u)) = κu^{κ−1} f(u−1) for u > α,
> (d/du)(u^κ f(u)) = κu^{κ−1} F(u−1) for u > β
> has continuous solutions F, f : R>0 → R such that F(u) decreases monotonically, f(u)
> increases monotonically, and F(u) = 1 + O(e^{−u}), f(u) = 1 + O(e^{−u})."

This nails the positivity property the note needs: f₂ ≡ 0 on (0, β₂], f₂ increasing and
→ 1, hence **f₂(u) ≥ f₂(β₂+ε/2) =: c(ε) > 0 for all u ≥ β₂+ε/2**. (Johnston–Thomas,
arXiv:2503.04045, §3: "f₂ increases monotonically towards 1 [7, Theorem 6.1]", [7] = the
DH book; they also confirm "the sifting limit β₂ = 4.266… is given to 20 decimal places
in [5]" — [5] = Booker–Browning, *Square-free values of reducible polynomials*,
Discrete Anal.; the Booker–Browning **table** above is their **[4]**, and the
**code** is [3]. *(Corrected 2026-08-18, JT bibliography read: this said "[5] =
the Booker–Browning table", which is [4]. The sentence JT attach [5] to points
at the paper.)*

### 1.2 Franze's Table 1 (the note's cited source)

C. S. Franze, *Sifting limits for the Λ²Λ⁻ sieve*, J. Number Theory 131 (2011) 1962–1982,
arXiv:[1012.3809](https://arxiv.org/abs/1012.3809). PDF downloaded, text extracted.
Verbatim:

> "An important parameter in a sieve is the sifting limit β_κ, beyond which the lower
> bound sieve yields a positive lower bound. The calculations in Chapter 17 of [4] show
> that for the DHR sieves, β_κ ≲ 2.44κ."
>
> Table 1. Sifting Limit Comparison
> κ:        2      3      4      5       6       7       8       9       10
> DHR β_κ:  **4.266**  6.640  9.072  11.534  14.014  16.504  18.998  21.495  23.992
> Λ²Λ⁻ β_κ: **4.516**  6.520  8.522  10.523  12.524  14.524  16.524  18.525  20.525

Also verbatim, Franze's normalization for the sifting-limit statement (Λ²Λ⁻ section, same
conventions): "Letting |A| = x, and z = x^{1/β_κ}, we have S(A,P,z) ≫ x/log^κ x", under
the density condition "Σ_{p<s} f(p)/p · log p = κ log s + O(1)" (his eq. (4) — the
sum-form dimension condition, same as the note's Ω₂(κ)).

Grep-verified: the strings `4.2665` and `4.5161` do **not occur anywhere** in Franze's
paper. The note's §2 sentence "Franze's Table 1 … giving β₂ = 4.2665 … (Selberg's Λ²Λ⁻
gives the weaker 4.5161 there…)" over-reports the table's precision. Fix: cite Franze for
4.266/4.516 (3 d.p.) and Booker–Browning for full precision. (Both roundings are
*consistent* with the true 4.26645028…, so nothing downstream changes.)

### 1.3 Where the value historically comes from

- DHR, *A boundary value problem for a pair of differential delay equations related to
  sieve theory* I: Analytic Number Theory (Allerton Park 1989), Birkhäuser 1990;
  II: [J. Number Theory 45 (1993) 129–185](https://doi.org/10.1006/jnth.1993.1069);
  III: [J. Number Theory 47 (1994) 300–328](https://doi.org/10.1006/jnth.1994.1041).
  (Elsevier pages Cloudflare-blocked to automation — COULD-NOT-ACCESS full text; cited by
  Booker–Browning as the source of Theorem 3.1 above.)
- DHR, *Combinatorial sieves of dimension exceeding one*,
  [J. Number Theory 28 (1988) 306–346](https://doi.org/10.1016/0022-314X(88)90046-7)
  (same access status).
- DH book Chapter 17 "The parameters α_κ and β_κ", §17.2 "The cases κ = 2, 2.5, 3, …"
  (location confirmed from the book's table of contents, freely available:
  [ETH TOC scan](https://toc.library.ethz.ch/objects/pdf/e01_978-0-521-89487-6_01.pdf)).
- Appendix A1.9 of the book: "Computing α_κ and β_κ" (Galway's Mathematica procedures).

## 2. The DHR theorem itself — what the primary statement actually says

### 2.1 The book and its structure (verified from the ETH TOC scan)

H. G. Diamond, H. Halberstam, *A Higher-Dimensional Sieve Method: With Procedures for
Computing Sieve Functions by William F. Galway*, Cambridge Tracts in Mathematics 177,
CUP 2008. (Note: Richert died in 1993; the book is Diamond–Halberstam + Galway appendix,
building on the three DHR papers. The note's §2 reference line "Diamond, Halberstam,
Richert, *A Higher-Dimensional Sieve Method*" mis-states the book's authorship — minor.)

Relevant structure: Ch.1 §1.2 "Some basic hypotheses", §1.4 "The Ω(κ) condition";
Ch.4 "The Fundamental Lemma"; Ch.9 "A sieve method for κ > 1" — §9.1 "The main theorem
[Theorem 9.1] and start of the proof" (p. 103); Ch.10 "Some applications of Theorem 9.1";
Ch.11 "A weighted sieve method" (Theorem 11.1); Ch.17 "The parameters α_κ and β_κ".

### 2.2 Theorem 9.1's conclusion, quoted verbatim through Franze–Kao

C. S. Franze & P. H. Kao, *Almost-prime values of reducible polynomials at prime
arguments*, arXiv:[1812.11280](https://arxiv.org/abs/1812.11280) (note the first author
is the same Franze as §1.2 — good provenance). Their §4, verbatim (their (19)/(20),
"[4]" = the DH book):

> "Recall from Theorem 9.1 of [4] that for any 2 ⩽ z ⩽ y,
>
> S(A, z) ⩽ XV(z) [ F_g( log y / log z ) + O( (log log y)² / (log y)^{1/(2g+2)} ) ]
>            + 2 Σ_{m|P(z), m<y} 4^{ω(m)} |r_A(m)|,      (19)
>
> S(A, z) ⩾ XV(z) [ f_g( log y / log z ) − O( (log log y)² / (log y)^{1/(2g+2)} ) ]
>            − 2 Σ_{m|P(z), m<y} 4^{ω(m)} |r_A(m)|.      (20)
>
> The functions F_g and f_g are defined by the unique solutions to the differential-delay
> equations (u^g F_g(u))′ = g u^{g−1} f_g(u−1), u > α_g; (u^g f_g(u))′ = g u^{g−1} F_g(u−1),
> u > β_g, with initial conditions F_g(u) = 1/σ_g(u), 0 < u ⩽ α_g; f_g(u) = 0,
> 0 < u ⩽ β_g, where σ_g is the Ankeny–Onishi function, and α₁ = β₁ = 2 and
> α_g > β_g > 2 for g > 1. … The sifting limit β_g satisfies β_g ≲ cg, where c ≈ 2.445.
> … F_g decreases monotonically, while f_g increases monotonically on (0, ∞)."

(Here ω(m) = ν(m) = number of prime factors of squarefree m; their density normalization
upstream is the sum form "Σ_{p⩽x} (ρ₁(p)/p) log p = g log x + O(1)", their **(8)**, with
V(z) := Π_{p<z}(1 − ρ₁(p)/**φ(p)**) ≫ (log z)^{−g}.)
*(Corrected 2026-08-18, PDF read. This cited "(14)" with denominator `p` and the
ρ subscript dropped. Franze–Kao's (14) and (15) are the SHIFTED sequence
A′ = {nH(n)}, of dimension **g + 1**, not the base sequence: the old sentence
paired (8)'s right-hand side with (14)'s number and (9)'s exponent with (15)'s
denominator. Context only — this file uses Franze–Kao for the shape of Theorem
9.1, which is now verified against the book's own page photographs.)*

Compare the note's §2 "shape of the theorem": identical except the note wrote the
remainder as Σ μ²(d) 3^{ν(d)}|r_d| ≤ level D. **Actual: factor 2 and weight 4^{ν(m)},
level y, with u = log y/log z the same y.** See §3 below for the (null) impact.

### 2.3 The hypotheses — triangulated from two more independent restatements

(a) G. Marasingha, *On the representation of almost primes by sets of quadratic forms*,
arXiv:[math/0607494](https://arxiv.org/abs/math/0607494), Theorem 3.1, attributed to
Diamond–Halberstam (their 1997 survey *Some applications of sieves of dimension exceeding
1*, in: Sieve Methods, Exponential Sums, and their Applications in Number Theory,
LMS Lecture Notes 237, CUP 1997 — the "Theorem 1" Booker–Browning also invoke). Extracted
hypotheses, verbatim. **Read from the arXiv LaTeX source `marsrc/almostprime.tex` (the
equation labelled `eqn:omega2star`), and checked against the arXiv PDF, page 11**, where
the `\alpheqn` macro renders it as `(B)`; verified 2026-08-18,
`research/history/staging/lit-pdf-halberstam-richert.md` §2:

> Condition (B) [density]:  Π_{z₁≤p<z} (1 − ω(p)/p)^{−1} ≤ (log z / log z₁)^κ
> (1 + A₁/log z₁),  2 ≤ z₁ < z.
>
> Condition (C) [remainder]: R_d := |A_d| − (ω(d)/d)·Y for μ(d) ≠ 0, and
> Σ_{d < Y^α/(log Y)^{A₃}, (d,P̄)=1} μ²(d) **4^{ν(d)}** |R_d| ≤ A₂ Y / log^{κ+1} Y.

(b) D. R. Johnston & S. N. Thomas, *The sum of a prime power and an almost prime*,
arXiv:[2503.04045](https://arxiv.org/abs/2503.04045), Lemma 2.5 = book's Theorem 11.1
(weighted version), with condition Ω(κ,L):

> Π_{z₁≤p<z₂, p∈P} (1 − g(p)/p)^{−1} < (log z₂/log z₁)^κ {1 + L/log z₁}

and remainder condition R₀(κ,τ): Σ_{d<X^τ/(log X)^B} μ²(d) **4^{ω(d)}** |r(d)| ≪
X/(log X)^{κ+1}. (Their Q₀ and M₀ conditions are specific to the *weighted* almost-prime
sieve, Thm 11.1, and are irrelevant to the note's use of Thm 9.1.)

So: **all modern DHR formulations state the density hypothesis in the one-sided product
form Ω(κ)/Ω(κ,L)** (an upper bound on V(z₁)/V(z₂)), and **all carry the 4^ν remainder
weight.** The note instead verified the sum form Ω₂(κ) (Mertens: Σ ω(p)log p/p =
2 log(z/w) + O(1)). The two are interchangeable here: for ω(2)=1, ω(p)=2 the product form
follows directly from Mertens' theorem for Π(1−2/p) with an absolute L (equivalently,
HR *Sieve Methods* Lemma 5.3 derives the product bound from Ω₂(κ) + Ω₁ in general).
Also required: 0 ≤ ω(p) < p — holds (ω(2)=1<2, ω(p)=2<p for odd p). It is not a gap in
substance: the DH book's own §1.3 ("Prime g-tuples") is precisely the sequence n(n+2)
(g=2), so the note's A is the book's motivating example restricted to an interval.

## 3. Re-running the note's §3 against the actual statement

With Theorem 9.1 as in §2.2 (κ=2, A = {r(r+2) : x < r ≤ x+H}, X = H, z = pₙ+1,
y = D = z^{β₂+ε/2}, so u = log y/log z = β₂+ε/2):

- Trivial remainder: |r_d| ≤ ω(d) ≤ 2^{ν(d)} (each of the ω(d) classes mod d meets the
  interval in H/d + θ points, |θ|<1). Verified — the note's (∗) is correct.
- Actual remainder term: 2 Σ_{m|P(z), m<y} 4^{ν(m)} |r_m| ≤ 2 Σ_{m<y} μ²(m) 8^{ν(m)}
  ≪ y (log y)⁷ = z^{β₂+ε/2} log⁷z  [mean value of y^{ν}: Σ_{m≤Y} μ²(m) k^{ν(m)} ≍
  Y (log Y)^{k−1}].
- Main term: H·V(z)·[f₂(β₂+ε/2) − O((log log y)²/(log y)^{1/6})] ≥ c(ε)·z^{β₂+ε}/log²z
  for z ≥ z₀(ε), using f₂ increasing, f₂ > 0 past β₂ (§1.1) and the explicit o(1).
- Domination: z^{β₂+ε}/log²z vs z^{β₂+ε/2}log⁷z — margin z^{ε/2}/log⁹z → ∞. S(A,z) > 0.

So the note's chain is intact; only the bookkeeping changes (6^ν→8^ν, log⁵→log⁷, an extra
factor 2, and the o(1) made explicit). The note's uniformity remark also survives: (∗)
holds for every x with the same constants, and the O(·) in Thm 9.1 depends only on the
Ω-condition constants. Finitely many n with pₙ < z₀(ε) are absorbed into C(ε).

Residual honest caveats (unchanged from the note's §6): the exact hypothesis wording of
Thm 9.1 (see §5), and the precise dependence of Thm 9.1's implied O-constant on the
Ω-condition constants, remain book-verification items.

## 4. The Fundamental-Lemma fallback (note §6.5)

### 4.1 Friedlander–Iwaniec form (explicit constants)

*Opera de Cribro* (AMS Colloq. Publ. 57, 2010) **Lemma 6.8** — quoted verbatim as
Lemma 9.1 of K. Matomäki & J. Teräväinen, *Products of primes in arithmetic
progressions*, arXiv:[2301.07679](https://arxiv.org/abs/2301.07679) ("see e.g.
[5, Lemma 6.8]"). **The artifact of record is that arXiv PDF, page 33, read there
2026-08-18** — not the book, which was not opened
(`research/history/staging/lit-pdf-halberstam-richert.md` §3). Our compression drops
one quantifier from (iii), "for some K ≥ 1, one has", which the source carries:

> "Let κ ≥ 1 be fixed. Let z ≥ 2 and let D = z^s with **s ≥ 9κ + 1**. There exist
> coefficients λ±_d such that: (i) |λ±_d| ≤ 1, supported on {d ≤ D : d | P(z)};
> (ii) Σ_{d|n} λ−_d ≤ 1_{(n,P(z))=1} ≤ Σ_{d|n} λ+_d; (iii) if h : N → [0,1) is
> multiplicative and Π_{w₁≤p<z₁}(1−h(p))^{−1} ≤ K (log z₁/log w₁)^κ for all
> z₁ ≥ w₁ ≥ 2, then
> Σ_{d|P(z)} λ+_d h(d) ≤ (1 + e^{9κ−s} K^{10}) Π_{p<z}(1−h(p)),
> Σ_{d|P(z)} λ−_d h(d) ≥ (1 − e^{9κ−s} K^{10}) Π_{p<z}(1−h(p))."

Application to the twin sequence (κ=2, h(p)=ω(p)/p): S(A,z) ≥ Σ_d λ−_d |A_d| ≥
H·V(z)(1 − e^{18−s}K^{10}) − Σ_{d≤D} 2^{ν(d)} and Σ_{d≤D} μ²(d) 2^{ν(d)} ≪ D log D.
Positivity needs **s ≥ max(9κ+1, 9κ + 10 log K + δ) = 19 ∨ (18 + 10 log K)** and then
H = z^{s+ε} works. So the fallback theorem is: **G₂(n) ≪ pₙ^{s₀+ε} with s₀ = max(19,
18 + 10 log K), K the absolute Mertens constant for Π(1−2/p)^{−1}** — explicit and finite.
The note's "roughly u ≳ 9κ … ≈ 18 + ε" should be adjusted to "s ≥ 9κ+1 = 19 (FI Lemma
6.8 normalization), plus a 10 log K term for positivity" — same substance, slightly worse
constant. (The note wisely declined to pin the constant; this confirms that caution was
warranted and that ANY such version yields a finite exponent.)

### 4.2 Halberstam–Richert forms (for cross-reference)

Per [Wikipedia, "Fundamental lemma of sieve theory"](https://en.wikipedia.org/wiki/Fundamental_lemma_of_sieve_theory)
(citing HR *Sieve Methods* 1974 — combinatorial version ≈ HR Theorem 2.5):

> Combinatorial: density Π_{η≤p≤ξ}(1−w(p)/p)^{−1} < (ln ξ/ln η)^κ (1 + C/ln η); then for
> u ≥ 1: S(A,P,z) = X·Π_{p≤z}(1−w(p)/p)·{1 + O(u^{−u/2})} + O(Σ_{d≤z^u, d|P(z)} |R_d|).
>
> Selberg-sieve version: assumptions Σ_{η≤p≤ξ} w(p)ln p/p < κ ln(ξ/η) + C; w(p)/p ≤ 1−c;
> |R_d| ≤ w(d); conclusion S = X·Π(1−w/p)·{1 + O(e^{−u/2})}, u = ln X/ln z.

Both give positivity for u ≥ u₀ with u₀ absolute given (κ, C, c) but not written
explicitly — consistent with the note's decision to call the constant
"formulation-dependent". Free lecture-notes statement also checked: J.-H. Evertse,
[Ch. 10, *The Fundamental Lemma of Sieve Theory*](https://pub.math.leidenuniv.nl/~evertsejh/Fundamental%20Lemma.pdf)
(Leiden), same architecture. The DH book has its own Fundamental Lemma as Chapter 4.

## 5. Access: what this dive could not reach, and what has since been read

**The DH book text: SETTLED, and the triangulation held.** This dive could not reach it —
Internet Archive's scan ([higherdimensiona0000diam](https://archive.org/details/higherdimensiona0000diam))
is lending-locked, and Cambridge Core and Google Books are paywalled or no-preview. The book was
obtained afterwards and read line-level, and `paper/beta2-note.md`'s status header records the
result with page numbers: Theorem 9.1 at pp. 103–112 carrying the remainder
`2·Σ_{m|P(z),m<y} 4^{ν(m)}|r_A(m)|` (9.9/9.10) and the error `O((log log y)²/(log y)^{1/(2κ+2)})`
exactly as §2.2 predicted from Franze–Kao; the Ω(κ) working product form (5.2) at p. 44;
Theorem 6.1 at pp. 67–68 for the F_κ/f_κ system; **β₂ ≈ 4.266 in print at p. 79**, with the
book's own comparison against 4.42 (Ankeny–Onishi) and 4.834 (Rosser–Iwaniec); and
α_κ ≥ β_κ+1 for κ ≥ 2 at p. 77. Every prediction this section made was borne out, which is the
useful thing to know about the triangulation method: it was accurate on all of it.

Still not accessed, and not load-bearing:
- **DHR 1988 + boundary-value papers I–III** (ScienceDirect/Springer: Cloudflare-blocked
  to curl; AMS Transactions likewise). Not load-bearing: Booker–Browning restate the
  needed theorem and recompute the needed constants rigorously.
- HR *Sieve Methods* 1974 scan ([sievemethods0000halb](https://archive.org/details/sievemethods0000halb)):
  also lending-locked; the "3^ν is the HR form" claim is consistent with the standard
  condition R(κ,α) but was not verified against the 1974 text. It does not matter: the note
  uses the 4^ν form of the 2008 book, which is verified.

## 6. The seven edits this audit produced, all since applied

Kept as the record of what changed and why. Verified applied 7/7 against
`paper/beta2-note.md`, most recently 2026-08-17.

1. §2: replace "β₂ = 4.2665" by "β₂ = 4.26645…" and cite: Franze Table 1 (4.266) for the
   comparison, Booker–Browning arXiv:1511.00601 ancillary table for
   4.26645028414864191641 (rigorous truncation), DHR boundary-value papers I–III + DH
   book Ch. 17 as the underlying theory. Replace "4.5161" by "4.516".
2. §2: fix the book's authorship (Diamond & Halberstam, with an appendix by Galway;
   Richert is in the 1988–1994 papers, not on the book).
3. §2–3: restate the invoked theorem as Thm 9.1 actually reads (conclusion (19)/(20) of
   §2.2 above): remainder 2Σ_{m|P(z), m<y} 4^{ν(m)}|r_m|, error
   O((log log y)²/(log y)^{1/6}), u = log y/log z; rerun the (already-written) §3
   arithmetic with 8^ν / log⁷ — conclusion unchanged.
4. §2: state the density hypothesis in the product form Ω(κ,L) and note it holds for
   ω(2)=1, ω(p)=2 by Mertens with absolute L (sum form Ω₂(2) as a corollary/equivalent).
5. §3: set z = pₙ + 1 (or "sift all p ≤ pₙ"), since S(A,P,z) conventionally sifts p < z.
6. §6.5: adjust the fallback constant to "s ≥ 9κ+1 = 19 in the Opera de Cribro Lemma 6.8
   normalization (positivity for s > 9κ + 10 log K)".
7. §6.1 can be upgraded from "cited, not verified" to "verified against four independent
   published restatements of Thm 9.1/Thm 11.1 and a rigorous 20-decimal computation of
   β₂; line-by-line check against the book text still outstanding" — with this file as
   the audit trail.

## 7. Source ledger

| Source | Role | Access | Link |
|---|---|---|---|
| Booker–Browning ancillary table + code (arXiv 1511.00601) | β₂ to 20 d.p., rigorous; Thm 3.1 = DDE definition of β | fetched, quoted | [table](https://arxiv.org/src/1511.00601v2/anc/dhr.html), [code](https://arxiv.org/src/1511.00601v3/anc/dhr.c), [paper](https://arxiv.org/abs/1511.00601) |
| Franze, JNT 131 (2011) | Table 1 (DHR 4.266 / Λ²Λ⁻ 4.516); sifting-limit definition | PDF fetched, grepped | [arXiv:1012.3809](https://arxiv.org/abs/1012.3809) |
| Franze–Kao (arXiv 1812.11280) | verbatim Thm 9.1 conclusion (4^ω weight, explicit o(1)) | PDF fetched, quoted | [arXiv:1812.11280](https://arxiv.org/abs/1812.11280) |
| Johnston–Thomas (arXiv 2503.04045) | Thm 11.1 restatement, Ω(κ,L), R₀ with 4^ω; f₂ monotone; pointer to 20-d.p. β₂ | PDF fetched, quoted | [arXiv:2503.04045](https://arxiv.org/abs/2503.04045) |
| Marasingha (arXiv math/0607494) | DH-1997 survey Thm 1 hypotheses (B)/(C) with 4^ν | fetched, quoted | [arXiv:math/0607494](https://arxiv.org/abs/math/0607494) |
| DH book TOC (ETH scan) | chapter/theorem geography (Thm 9.1 p.103, Ch.17, Fund. Lemma Ch.4) | PDF fetched | [ETH TOC](https://toc.library.ethz.ch/objects/pdf/e01_978-0-521-89487-6_01.pdf) |
| Matomäki–Teräväinen (arXiv 2301.07679) Lemma 9.1 | verbatim FI Opera Lemma 6.8 (s ≥ 9κ+1, e^{9κ−s}K^{10}) | PDF fetched, quoted | [arXiv:2301.07679](https://arxiv.org/abs/2301.07679) |
| Wikipedia, Fundamental lemma of sieve theory | HR-1974 fundamental-lemma forms | fetched, quoted | [wiki](https://en.wikipedia.org/wiki/Fundamental_lemma_of_sieve_theory) |
| Evertse, Leiden lecture notes Ch. 10 | independent fundamental-lemma statement | PDF fetched | [pdf](https://pub.math.leidenuniv.nl/~evertsejh/Fundamental%20Lemma.pdf) |
| Irving (arXiv 1410.3333) | β-sieve comparison: FI β₂ = 4.8333 > DHR 4.266 (context) | fetched | [arXiv:1410.3333](https://arxiv.org/abs/1410.3333) |
| DH book (CUP 2008) | the primary text | not reachable in this dive; **since obtained and read line-level** (§5), screenshots archived | [archive.org scan, lending-locked](https://archive.org/details/higherdimensiona0000diam) |
| HR, Sieve Methods (1974), IA scan | 3^ν convention check | lending-locked | [archive.org](https://archive.org/details/sievemethods0000halb) |
| DHR JNT papers 1988/1993/1994 | original construction + numerics | Cloudflare-blocked | DOIs in §1.3 |
