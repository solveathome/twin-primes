# lit-pdf-halberstam-richert — the books partition, verified where reachable and named where not

<!-- ledger
id: Q-lit-halberstam-richert
status: ANSWERED
todo: none
question: Do the Halberstam-Richert and DHR citations in dhr-verification.md and two-class-lower-bounds.md check out against primary sources?
verdict: Mostly reachable, against the brief's expectation: seven claims verbatim against source including beta2 about 4.266 at the book page itself, one UNREACHABLE (HR Corollary 2.4.1), the meaning of DHR and the Friedlander attribution both settled, and 4 defects among 21 further attributions swept.
-->

Read-only literature check, 2026-08-18. No repo file edited except this one. Nothing committed,
nothing pushed. Every archive.org probe below used only public, unauthenticated endpoints; the
lending-restricted OCR derivative of the Halberstam–Richert scan was **not** requested, and no
pirated copy was sought.

**Partition:** Halberstam–Richert *Sieve Methods* (1974); the "DHR" of `research/dhr-verification.md`;
the source the extractor resolved as "Friedlander" at `dhr-verification.md:239`.

**Headline.** The partition was briefed as the one most likely to be unreachable. It turned out to be
mostly reachable, for two reasons the brief could not have known:

1. **Items 1 and 2 are not book quotations at all.** Both are quotations *of arXiv papers* that our own
   file names in the surrounding sentence. Both are on arXiv, both were pulled as PDF **and LaTeX
   source**, and both are **VERBATIM**.
2. **The Diamond–Halberstam book is in the repo.** `attestation/` holds photographs of its pages. Four
   were read. Theorem 9.1 and the β₂ page are confirmed against the primary text, character for
   character.

Only Halberstam–Richert 1974 itself is genuinely **UNREACHABLE**, and for it this report supplies the
one thing that was missing: a public, non-pirated source for the book's chapter structure, which
settles three chapter-level citations in the corpus and makes a fourth coherent.

Status legend: **VERBATIM** = exact match including punctuation; **DIFFERS** = source says something
else, difference marked; **UNREACHABLE** = the text could not be reached by any legal route tried.

---

## 0. Verdict table

| # | Claim | Verdict |
|---|---|---|
| 1 | `dhr-verification.md:181` Condition (B) | **VERBATIM** against Marasingha arXiv:math/0607494 LaTeX source. κ, A₁, the exponent −1, the direction ≤ and the range 2 ≤ z₁ < z all correct. |
| 2 | `dhr-verification.md:239` **s ≥ 9κ + 1** | **VERBATIM** against Matomäki–Teräväinen arXiv:2301.07679 Lemma 9.1. No off-by-one. One hypothesis silently dropped (see §3). |
| 3 | `two-class-lower-bounds.md:146` HR **Cor. 2.4.1** | **UNREACHABLE.** Existence and statement not confirmed. Chapter structure now sourced publicly, and it makes the citation coherent (§4). |
| 4 | Which work "DHR" means | **SETTLED**, three ways (§5). |
| 5 | The "Friedlander" of `:239` | **SETTLED**: Friedlander–Iwaniec, *Opera de Cribro*, Lemma 6.8, quoted through MT (§3). |
| 6 | DH book Theorem 9.1, its remainder, its error term | **VERBATIM** against the book page itself (§6). |
| 7 | DH book β₂ ≈ 4.266 at p. 79 | **VERBATIM** against the book page itself (§6). |
| 8 | Sweep, 21 further attributions | 14 verified, 5 corroborated only, **4 defects** (§8). |

---

## 1. Artifacts read

Nothing below comes from an HTML rendering, an abstract page, or a search snippet, except where a
line explicitly says so.

| file | source | pages | md5 |
|---|---|---|---|
| `marasingha.pdf` + `marsrc/almostprime.tex` | `arxiv.org/pdf/math/0607494`, `arxiv.org/e-print/math/0607494` | 21 | `0bc1b2e881e45045878ff7d29c3833b0` |
| `mt.pdf` | `arxiv.org/pdf/2301.07679` | 45 | `928904998881ff2abeeb69f80260f886` |
| `1012.3809.pdf` (Franze) | `arxiv.org/pdf/1012.3809` | 19 | `0abc974dce7e96d1a45916b8cbccb680` |
| `1812.11280.pdf` (Franze–Kao) | `arxiv.org/pdf/1812.11280` | 15 | `4a0e66408e8deee488628fd65ce8d66e` |
| `bb.pdf` (Booker–Browning) | `arxiv.org/pdf/1511.00601` | 18 | `019d505bd0a378f4773b40500008c37e` |
| `2503.04045.pdf` (Johnston–Thomas) | `arxiv.org/pdf/2503.04045` | 24 | `98709357345623a9f8024a277c7fb1f7` |
| `2211.11012.pdf` (Bordignon–Lee) | `arxiv.org/pdf/2211.11012` | 18 | `73fd01fb89acd5a612dbce2a3dffe4b2` |
| `wu.pdf` (Wu, Acta Arith. 114) | `arxiv.org/pdf/0705.1652` | 48 | `e7ebd1d4039b99bd7aa27f367617035e` |
| `ethtoc.pdf` (DH book front matter) | `toc.library.ethz.ch/objects/pdf/e01_978-0-521-89487-6_01.pdf` | 5 | `63a9b88b6ebaa5a121d3d5e96848ef15` |
| `ford-sieve.pdf` (Ford, sieve course 2023) | `ford126.web.illinois.edu/sieve2023.pdf` | 129 | `4c2f60a7632fe3279390f1772528839f` |
| `perlego.html` | `perlego.com/book/112261/sieve-methods-pdf` | — | raw HTML, chapter list read out of the markup, not from a summariser |

**Book pages, read as images from this repository** (`attestation/`, photographed 2026-08-14):

| file | what it shows |
|---|---|
| `attestation/Screenshot 2026-08-14 at 11.52.40 AM.png` | DH book **p. 103**, chapter head "9 A sieve method for κ > 1", §9.1 |
| `attestation/Screenshot 2026-08-14 at 11.52.48 AM.png` | DH book **p. 104**, the statement of **Theorem 9.1**, (9.9) and (9.10) |
| `attestation/Screenshot 2026-08-14 at 11.53.03 AM.png` | DH book **p. 106**, (9.14)–(9.19) inside the proof |
| `attestation/book-ch5-6/Screenshot 2026-08-14 at 12.03.26 PM.png` | DH book **p. 79**, §6.5 "Notes on Chapter 6", β₂ ≈ 4.266 and Fig. 6.1 |

(These four filenames contain a macOS-normalised space that defeats `md5` from the shell; they were
read through the file reader, not through a hash. Their content is transcribed below.)

Edition read for the DH book: *A Higher-Dimensional Sieve Method: With Procedures for Computing Sieve
Functions by William F. Galway*, Cambridge Tracts in Mathematics 177, CUP 2008 (ISBN 978-0-521-89487-6),
identified from the ETH title-page scan and consistent with the page numbers on the photographs.

---

## 2. Item 1 — `research/dhr-verification.md:181`, Condition (B) — **VERBATIM**

**What our file says.** §2.3(a), attributing to G. Marasingha, *On the representation of almost primes
by sets of quadratic forms*, arXiv:math/0607494, Theorem 3.1:

> Condition (B) [density]:  Π_{z₁≤p<z} (1 − ω(p)/p)^{−1} ≤ (log z / log z₁)^κ
> (1 + A₁/log z₁),  2 ≤ z₁ < z.

**What the source says.** `marsrc/almostprime.tex`, the equation labelled `eqn:omega2star` inside
`\begin{theorem}\label{thm:hr}`, which the `\alpheqn` macro renders as **(B)** in the PDF (page 11):

```latex
\prod_{z_1 \le p < z} \left( 1 - \frac{\omega(p)}{p} \right)^{-1} \le
\left( \frac{\log z}{\log z_1}\right)^\kappa \left( 1 + \frac{A_1}{\log z_1}
  \right), \quad 2 \le z_1 < z,
```

**Every point the brief asked about:**

- **Is it really their Condition (B)?** Yes, twice over. The equation prints as `(B)` in the PDF, and
  Marasingha's own §3.2 is headed "Condition (B)".
- **κ:** exponent on `(log z / log z₁)`, correct.
- **A₁:** inside `(1 + A₁/log z₁)`, correct.
- **Direction:** `≤`, correct.
- **Exponent −1:** on the product, correct.
- **Range:** `2 ≤ z₁ < z`, correct.

**Companion condition (C), also quoted at `:184–185`, also VERBATIM:**

```latex
R_d := |\fA_d| - \frac{\omega(d)}{d} Y, \quad \text{if } \mu(d) \ne 0,
...
\sum_{\substack{d < Y^\alpha / (\log Y)^{A_3} \\ (d; \fPbar)=1}}
\mu^2(d) 4^{\nu(d)} | R_d| \le A_2 \frac{Y}{\log^{\kappa+1} Y},
```

Our `(d,P̄)=1` is right: `\fPbar` is Marasingha's P-bar, defined a page earlier as "the complement of
P in the set of all primes". The `4^{ν(d)}` weight our file bolds is in the source. Only the
separator differs (source `;`, ours `,`).

**Truncation to note, not a defect but worth recording.** Our file quotes (B) and (C) without the
theorem's opening line, which is: *"Suppose there exist real constants κ > 1, A₁, A₂ ≥ 2, and A₃ ≥ 1
such that…"*. So (B) carries a live hypothesis **A₁ ≥ 2** and **κ > 1 strictly**. Both hold for the
note's use (κ = 2, and A₁ can be enlarged freely), so nothing downstream moves.

**Is the surrounding claim supported?** Two halves, and they split.

- *Attribution.* **Supported, and independently confirmed.** Marasingha writes "we have the following
  theorem of Diamond and Halberstam \cite{DH97}", and his [1] is verbatim "H. Diamond and H.
  Halberstam, *Some applications of sieves of dimension exceeding 1*, Sieve methods, exponential sums,
  and their applications in number theory (Cardiff, 1995), London Math. Soc. Lecture Note Ser., vol.
  237, Cambridge Univ. Press, Cambridge, 1997, pp. 101–107." That is exactly what our file says. Our
  file's parenthetical "the 'Theorem 1' Booker–Browning also invoke" also checks out: Booker–Browning
  p. 5 reads "For κ ⩾ 2 we refer to [5]… all of the hypotheses of **[5, Thm 1]** are met", and their
  [5] is the same 1997 survey.
- *The universal claim at `:197–199`.* **DIFFERS.** Our file concludes "**all modern DHR formulations
  state the density hypothesis in the one-sided product form Ω(κ)/Ω(κ,L)**". Two of the four
  restatements our own file assembles use the **sum** form instead: Franze's eq. (4) (quoted at our
  `:102`) and Franze–Kao's (8) (paraphrased at our `:165`). The word to fix is "all". The substance
  that follows it, that the two forms are interchangeable here, is correct and is argued correctly.

---

## 3. Item 2 — `research/dhr-verification.md:239`, **s ≥ 9κ + 1** — **VERBATIM**

**The "Friedlander" the extractor saw.** Resolved from the document's own context, and it is a
two-layer citation, which our file states honestly at `:234`: the *statement* is Friedlander–Iwaniec,
*Opera de Cribro*, AMS Colloquium Publications **57**, 2010, **Lemma 6.8**; the *words quoted* are
Matomäki–Teräväinen's **Lemma 9.1** in arXiv:2301.07679, who introduce it as "we shall need the
fundamental lemma of the sieve (see e.g. [5, Lemma 6.8])". Their [5] is verbatim "J. Friedlander and
H. Iwaniec. *Opera de cribro*, volume 57 of American Mathematical Society Colloquium Publications.
American Mathematical Society, Providence, RI, 2010." So the extractor's "Friedlander" is correct as
an attribution and wrong as a *source of record*: the artifact of record here is the arXiv paper.

**Source text, MT p. 33, Lemma 9.1, read from the PDF:**

> **Lemma 9.1** (Fundamental lemma of the sieve)**.** Let κ ≥ 1 be fixed. Let z ≥ 2 and let D = z^s
> with **s ≥ 9κ + 1**. There exist coefficients λ±_d such that the following hold.
> (i) |λ±_d| ≤ 1 for every d ∈ N and λ±_d are supported on {d ≤ D : d | P(z)}.
> (ii) For every n ∈ N, Σ_{d|n} λ−_d ≤ 1_{(n,P(z))=1} ≤ Σ_{d|n} λ+_d.
> (iii) If h : N → [0,1) is a multiplicative function such that, **for some K ≥ 1**, one has
> Π_{w₁≤p<z₁}(1 − h(p))^{−1} ≤ K (log z₁/log w₁)^κ for any z₁ ≥ w₁ ≥ 2, then
> Σ_{d|P(z)} λ+_d h(d) ≤ (1 + e^{9κ−s} K^{10}) Π_{p<z}(1 − h(p)),
> Σ_{d|P(z)} λ−_d h(d) ≥ (1 − e^{9κ−s} K^{10}) Π_{p<z}(1 − h(p)).

**The constant.** `s ≥ 9κ + 1`. Not 9κ, not 9κ + 2, not 8κ + 1. **No off-by-one, no different
multiplier.** `e^{9κ−s}` and `K^{10}` are likewise exact. At κ = 2 this is s ≥ 19, which is what our
file's §0 row 3 and §4.1 both say.

**Difference, marked.** Our file's quotation compresses, and one compression drops a quantifier:

| source | ours |
|---|---|
| "for some **K ≥ 1**, one has" | *(absent)* |
| "|λ±_d| ≤ 1 **for every d ∈ N** and λ±_d are supported on" | "|λ±_d| ≤ 1, supported on" |
| "**For every n ∈ N**, Σ…" | "Σ…" |
| "for **any** z₁ ≥ w₁ ≥ 2" | "for **all** z₁ ≥ w₁ ≥ 2" |

The K ≥ 1 omission is the only one with teeth, and it has none in practice: our §4.1 application
already treats K as a parameter ("K the absolute Mertens constant for Π(1−2/p)^{−1}") and the Mertens
constant for the twin density exceeds 1, so the hypothesis holds. Everything material to the quoted
inequalities is verbatim.

**Is the surrounding claim supported?** Yes. §4.1 concludes "positivity needs s ≥ max(9κ+1, 9κ + 10 log
K + δ)", which is exactly what `(1 − e^{9κ−s}K^{10}) > 0` gives. The correction our file made to the
note ("s ≥ 9κ+1 = 19… not 18+ε") is the right correction.

**One calibration to keep.** MT write "see e.g. [5, Lemma 6.8]", not "quoting [5, Lemma 6.8]". So the
*normalisation* `s ≥ 9κ+1` with `e^{9κ−s}K^{10}` is verified as **MT's**; whether *Opera de Cribro*
Lemma 6.8 prints those exact constants is **not** verified. Our file's §4.1 header calls it the
"Friedlander–Iwaniec form" and `:252` calls it the "FI Lemma 6.8 normalization". That is one step
further than the evidence goes. *Opera de Cribro* is a copyrighted AMS book; the AMS ebook page and
Google Books are paywalled, and no public restatement quoting FI Lemma 6.8 with its own constants was
found. Suggested wording: "in the normalisation Matomäki–Teräväinen quote from FI Lemma 6.8".

---

## 4. Item 3 — Halberstam–Richert **Corollary 2.4.1** — **UNREACHABLE**

**What is cited.** `research/two-class-lower-bounds.md:146`, inside the FKMPT Remark 7 block:
"However, a sieve upper bound (e.g., [7, Cor. 2.4.1]) combined with the pigeonhole principle already
gives a bound of >> log² X in this case." Repeated at `covering-dive.md:79`, `natal-cap-10-sieve-cap.md:74`
and `:243`. (The FKMPT quotation itself belongs to another agent's partition and is not re-checked here.)

**What Corollary 2.4.1 has to deliver for the surrounding claim to hold.** An upper bound of the shape
π₂(X) ≪ X/log²X for the count of lower twin primes below X. Pigeonhole over ≪ X/log²X points in
[1, X] then forces a gap ≫ log²X. Nothing stronger is needed and nothing weaker suffices.

### 4.1 Everything tried, and what each returned

| route | result |
|---|---|
| Internet Archive scan `sievemethods0000halb` | Item exists, `access-restricted-item = true`, ISBN `0123182506`, 392 images, i.e. the **1974 Academic Press** edition FKMPT cite. |
| IA public search-inside, `fulltext/inside.php`, both `ia803207` and `ia903207` | HTTP 200 with body **"Item not available"**. The search index is not served for this restricted item. |
| IA `BookReader/BookReaderSearch.php` | 404. |
| `api.archivelab.org/books/…/searchinside` | empty body. |
| IA restricted OCR derivative `_djvu.txt` | **Not requested.** Fetching it would be circumventing the access control, so it was left alone. |
| `openlibrary.org/search/inside` (the cross-corpus snippet search) | HTTP 500, both via fetch tool and via curl. |
| IA advanced search for other copies | exactly one item, the restricted one. |
| Google Books, Dover ebook `keKvAAAAQBAJ`, query `"Corollary 2.4.1"` | SPA shell, zero snippets, zero preview markers. |
| Google Books, 1974 hardcover `pwXvAAAAMAAJ` | same. |
| Google Books API `volumes?q=…` | `totalItems: null`, no results served. |
| HathiTrust catalog and full-text search | **403** to both the fetch tool and curl. |
| zbMATH review page | **403**. |
| ETH TOC scan service, both Dover ISBN patterns | **404** (the service has the 2008 CUP book, not this one). |
| Full-text grep for `2.4.1` across 13 downloaded PDFs likely to cite it (Ford–Green–Konyagin–Maynard–Tao 1412.5029, Ford et al. 1408.4505, Bordignon–Lee, Johnston–Thomas, Kao, Irving, Franze, Franze–Kao, Marasingha, Booker–Browning, Wu, Goldbach-short-intervals 1212.4406, Sarnak-saturation 1705.09133) | **zero hits.** No paper in this repository's reachable literature quotes HR Cor. 2.4.1. |
| Targeted web searches, six phrasings | no paper found restating it. |

**Verdict: UNREACHABLE. The corollary's existence and its text are not confirmed.** Do not write
otherwise anywhere in the corpus. `natal-cap-10-sieve-cap.md:243–248` already says exactly this, and
its wording ("the corollary's statement is still [UNVERIFIED]") is correct and should stay.

### 4.2 What did move: the book's chapter structure, from a public non-pirated source

Perlego's product page for the Dover reprint (9780486320809, an unabridged republication of the 1974
Academic Press text) publishes the chapter list in its markup. Read from the raw HTML, not from a
summary:

> 1: The Sieve of Eratosthenes: Formulation of the Ω problem
> **2: The Combinatorial Sieve**
> 3: The Simplest Selberg Upper Bound Method
> 4: The Selberg Upper Bound Method (continued): O-results
> 5: The Selberg Upper Bound Method: Explicit Estimates
> 6: An Extension of Selberg's Upper Bound Method
> 7: Selberg's Sieve Method (continued): A First Lower Bound
> 8: The Linear Sieve
> 9: A Weighted Sieve: The Linear Case
> 10: Weighted Sieves: The General Case
> 11: Chen's Theorem

This is the first time the corpus has had HR's chapter structure from any source. What it buys:

- **Chapter 2 is "The Combinatorial Sieve", i.e. Brun.** So "Corollary 2.4.1" is a corollary to a
  Theorem 2.4 in the Brun chapter. A Brun-sieve corollary giving π₂(X) ≪ X/log²X is precisely the
  classical result, and it is exactly what FKMPT describe as "a sieve upper bound". **The citation is
  coherent with the book's structure.** That is corroboration, not verification: it says the citation
  points at the right chapter for the claim, and says nothing about whether the corollary number is right.
- Wikipedia's *Fundamental lemma of sieve theory* cites HR **p. 82** for the combinatorial version and
  **pp. 208–209** for the Selberg version (raw wikitext `{{Rp|82}}`, `{{Rp|208–209}}`). A combinatorial
  fundamental lemma at p. 82 sits comfortably inside a Chapter 2 titled "The Combinatorial Sieve".
- Wu's "[14], page 239" for Selberg's parity examples sits in Chapter 8 ("The Linear Sieve") territory,
  which is where a demonstration that the linear-sieve functions F and f are best possible belongs.
  Wikipedia independently cites HR **p. 221** for a Brun-versus-Selberg remark, in the same region.
  Again corroboration of plausibility only.

### 4.3 Corroboration of the mathematical content, from a reachable source

Kevin Ford is an author of the FKMPT remark. His 2023 sieve course notes, **Corollary 2.6**, p. 21,
read verbatim from the PDF:

> Corollary 2.6. We have, for positive m,
> #{p ⩽ x : p, p + 2m both prime} ≪ (2m/φ(2m)) · x/log²x,
> #{p ⩽ x : p, 2p + 1 both prime} ≪ x/log²x,
> #{p, q prime : p + q = 2m} ≪ (σ(m)/m) · m/log²m.

At m = 1 the first line is π₂(x) ≪ x/log²x, which is the input the pigeonhole step needs. So the
**mathematical content** the corpus attributes to HR Cor. 2.4.1 is standard and independently sourced;
only the **book location** is unverified. That distinction should survive into any future edit.

---

## 5. Which work "DHR" means in `research/dhr-verification.md` — **SETTLED**

It means the **book**, not a paper, and the file's own §2.1 says so. Confirmed three independent ways:

1. **ETH title-page scan** (`ethtoc.pdf`, p. 1): "A Higher-Dimensional Sieve Method / HAROLD G. DIAMOND
   / H. HALBERSTAM / With Procedures for Computing Sieve Functions / WILLIAM F. GALWAY / CAMBRIDGE
   UNIVERSITY PRESS". Richert is not on the title page. Our file's authorship correction is right.
2. **Franze–Kao's [4]**: "H. G. Diamond and H. Halberstam. *A higher-dimensional sieve method*, volume
   **177** of Cambridge Tracts in…". Confirms the tract number used at `paper/moire-primes.md:760`,
   `oeis-G2-submission.md:76` and `beta2-note.md:100`.
3. **Johnston–Thomas's [7]**: "H. G. Diamond, H. Halberstam, and W. F. Galway. *A Higher-Dimensional
   Sieve Method*". Confirms `dhr-verification.md:81,188` reading [7] as the book.

The ETH contents scan also confirms, line by line, every structural claim in `dhr-verification.md:137–140`:
§1.2 "Some basic hypotheses" p. 4; §1.3 "Prime g-tuples" p. 6; §1.4 "The Ω(κ) condition" p. 8; Ch. 4
"The Fundamental Lemma" p. 29; Ch. 9 "A sieve method for κ > 1" p. 103 with §9.1 "The main theorem and
start of the proof" p. 103; Ch. 10 "Some applications of Theorem 9.1" p. 125; Ch. 11 "A weighted sieve
method" p. 135; Ch. 17 "The parameters α_κ and β_κ" p. 217 with §17.2 "The cases κ = 2, 2.5, 3, …" p. 220;
Appendix A1.9 "Computing α_κ and β_κ" p. 254. **Nine for nine.**

Separately, the DH book's **Fundamental Lemma is Theorem 4.1** (named as such on the photographed
p. 104), which matches Ch. 4 in the contents and Wikipedia's independent `{{Rp|29}}` citation to DH.

---

## 6. Bonus: the DH book itself, verified from this repository's own photographs

`dhr-verification.md:12` and `:276–286` claim the book "has since been obtained and read line-level".
The artifact backing that claim is real, and four of its pages were read here.

### 6.1 Theorem 9.1 — **VERBATIM**, p. 104

> **Theorem 9.1.** *Suppose that κ ≥ 1 and that 2κ is an integer. If **Ω(κ)** holds and y is a parameter
> such that 2 ≤ z ≤ y, then we have*
>
> (9.9)  S(A,P,z) ≤ XV(z){F_κ(log y/log z) + O((log log y)²/(log y)^{1/(2κ+2)})} + 2 Σ_{m|P(z), m<y} 4^{ν(m)}|r_A(m)|,
>
> *and*
>
> (9.10)  S(A,P,z) ≥ XV(z){f_κ(log y/log z) − O((log log y)²/(log y)^{1/(2κ+2)})} − 2 Σ_{m|P(z), m<y} 4^{ν(m)}|r_A(m)|,
>
> *where F_κ and f_κ are the functions in Theorem 6.1, and the constants implied by the O-notation
> depend at most on κ and A.*

Against `dhr-verification.md` §0 row 1c and §5: the factor **2**, the weight **4^{ν(m)}**, the range
**m|P(z), m<y**, the level **y** shared with `f_κ(log y/log z)`, the equation numbers **(9.9)/(9.10)**,
and the error **O((log log y)²/(log y)^{1/(2κ+2)})** are all exactly as the file states. The file's
row 1d claim that the O-constant is "uniform given the Ω-condition constants" matches the book's
"depend at most on κ and A". Franze–Kao's restatement, which the file used to *predict* this before the
book was in hand, was right in every particular. **The triangulation method is vindicated on the record.**

**One omission, harmless here, worth fixing.** The book's hypothesis opens "Suppose that **κ ≥ 1 and
that 2κ is an integer**." That clause appears **nowhere** in the corpus: grep for it across
`beta2-note.md`, `dhr-verification.md` and `sift-limit-attack.md` returns nothing, and `beta2-note.md`'s
line-level header records the hypothesis as "Ω(κ), 2 ≤ z ≤ y, S sifts p<z". At κ = 2, 2κ = 4 is an
integer, so no result in the corpus is affected, and the corpus uses κ = 2 only. It should still be
written down, because a "confirmed line-level" header that drops a hypothesis is the exact defect the
QC framework exists to catch.

Also on the photographed p. 106: the same `4^{ν(m)}|r_A(m)|` sum over `m|P(z), m<y` appears at (9.14),
(9.17) and (9.18), and the running hypothesis is labelled **Ω(κ)** in bold. p. 104 further names
**Theorem 4.1** as "the Fundamental Lemma" and **Theorem 5.6** as "Selberg's upper bound sieve method".

### 6.2 β₂ ≈ 4.266 — **VERBATIM**, p. 79, §6.5 "Notes on Chapter 6"

> "The lower function f_κ(u) > 0 for u > β_κ (**β₂ ≈ 4.266**), the so-called *sieving limit*. Below this
> point f_κ(u) = 0, and Theorem 9.1 yields only the trivial lower bound S(A,P,z) ≥ 0. Our sieving limit
> of 4.266 is smaller than that of the Ankeny–Onishi sieve (about 4.42 for κ = 2) or the Rosser–Iwaniec
> sieve (about 4.834 for κ = 2), so we can treat some lower bound problems to which the other sieves do
> not apply."

Matches `dhr-verification.md:283–284` and `beta2-note.md:30–34` word for word, including the 4.42 and
4.834 comparisons. The page also carries, at its top, "that when α_κ ≥ β_κ + 1, that is, for all κ ≥ 2",
so that claim is confirmed to be in print, though the sentence begins on the previous page and
`beta2-note.md` dates it to p. 77, which was not photographed.

**The book prints "β₂ ≈ 4.266". It does not print "4.2665".** That makes §8 defect D1 below a hard
finding rather than a suspicion.

**Unrecorded and worth having.** The same p. 79 opens §6.5 with the authors' own note on the name:

> "The combinatorial method for κ > 1 follows from [DH85] and [DHR88], and it has been referred to in
> several subsequent publications by these authors as the DHR sieve method. On reflection, it seems to
> us now more accurate to describe it as an extension of the Rosser–Iwaniec sieve method."

`covering-dive.md:39` asserts that "'DHR sieve' remains the correct name for the sieve". The book's own
authors half-retract that name on the very page the corpus cites for β₂. The corpus should carry the
caveat, because it is the kind of thing a referee notices.

---

## 7. Sweep — every other reachable attribution in the partition

`grep -rn "Halberstam\|Richert\|DHR\|Diamond" --include="*.md" research paper | grep -v history` returns
89 lines. The substantive attributed claims, and what happened to each:

**Verified verbatim against the source of record.**

| where | claim | verdict |
|---|---|---|
| `dhr-verification.md:91–98` | Franze's sifting-limit sentence and Table 1 | **VERBATIM.** "The calculations in Chapter 17 of [4] show that for the DHR sieves, β_κ ≲ 2.44κ." Table 1 row DHR: 4.266 6.640 9.072 11.534 14.014 16.504 18.998 21.495 23.992; row Λ²Λ⁻: 4.516 6.520 8.522 10.523 12.524 14.524 16.524 18.525 20.525. All eighteen figures match. |
| `dhr-verification.md:105–108` | "the strings `4.2665` and `4.5161` do not occur anywhere in Franze's paper" | **VERIFIED, independently re-grepped.** Both counts are 0. |
| `dhr-verification.md:101–103` | Franze's normalisation "Letting \|A\| = x, and z = x^{1/β_κ}, we have S(A,P,z) ≫ x/log^κ x" | **VERBATIM** (his Theorem 1). |
| `dhr-verification.md:149–162` | Franze–Kao's restatement of Theorem 9.1, (19)/(20), and the α_g/β_g/σ_g paragraph | **VERBATIM**, and now also confirmed against the book page itself (§6.1). |
| `dhr-verification.md:191–193` | Johnston–Thomas Ω(κ,L) and R₀(κ,τ) | **VERBATIM.** Source: "Π_{z₁≤p<z₂, p∈P}(1 − g(p)/p)^{−1} < (log z₂/log z₁)^κ (1 + L/log z₁), for z₂ > z₁ ≥ 2" and "Σ_{d<X^τ/(log X)^B, (d,P)=1} μ²(d)4^{ω(d)}\|r(d)\| ≪ X/(log X)^{κ+1}". Ours drops the `(d,P)=1` from R₀; braces for parens in Ω. |
| `dhr-verification.md:188` | "Lemma 2.5 = book's Theorem 11.1" | **VERBATIM.** JT print "Lemma 2.5 ([7, Theorem 11.1])". |
| `dhr-verification.md:80–83` | "f₂ increases monotonically towards 1 [7, Theorem 6.1]" | **VERBATIM.** |
| `dhr-verification.md:69–77` | Booker–Browning Theorem 3.1, the DDE system | **VERBATIM**, and their attribution line reads "Theorem 3.1 (Diamond, Halberstam and Richert [8, 9, 10])", as our file says. |
| `dhr-verification.md:262–266` | the two Wikipedia fundamental-lemma forms | **VERBATIM** (light compression: ours drops "p ∈ P" from the product). |
| `natal-cap-10-sieve-cap.md:93–97` | Bordignon–Lee on HR Thm 5.3 | **VERBATIM**, including the `2^g g!` prefactor and the `O_F(log log 3y/log y)`. Their [6] is "H. Halberstam and H.-E. Richert, *Sieve methods*, Academic Press, London-New York, 1974, London Mathematical Society Monographs, No. 4." |
| `covering-dive.md:39` | Franze Table 1 values; Cambridge Tracts 177 (2008); "with William F. Galway"; "Ch. 17: β_κ ≲ 2.44κ"; "Richert is not an author of it" | **all VERIFIED** (§5 and above). |
| `bv-import-survey.md:189` | fundamental lemma at "Halberstam–Richert, op. cit., **Ch. 2**" | **CORROBORATED at chapter level.** Ch. 2 is "The Combinatorial Sieve"; Wikipedia's HR p. 82 citation for the combinatorial fundamental lemma is consistent. |
| `bv-import-survey.md:196, 253` | Chen's theorem, "textbook account Halberstam–Richert **Ch. 11**" | **VERIFIED at chapter level.** Ch. 11 is "Chen's Theorem". |
| `staircase-note.md:411, 445` | Brun sieve at HR **Ch. 2**; Legendre-style counting at HR **Ch. 1** | **VERIFIED at chapter level.** Ch. 2 "The Combinatorial Sieve", Ch. 1 "The Sieve of Eratosthenes". |

**Corroborated only, source not reached.**

| where | claim | status |
|---|---|---|
| `natal-cap-10:150`, `bv-import-survey.md:60`, `staircase-note.md:461` | Selberg's parity examples at **HR p. 239** | Wu's own sentence is confirmed (see D4), and his [14] is confirmed to be HR 1974. HR p. 239 itself is **UNREACHABLE**. All three sites already say "cited through". |
| `beta2-note.md:107` | HR "**Ch. 10** in older notation" for the κ > 1 sieve | Ch. 10 is "Weighted Sieves: The General Case", which is the right neighbourhood for a general-dimension treatment. **Plausible, unverified.** |
| `dhr-verification.md:202` | "HR *Sieve Methods* **Lemma 5.3** derives the product bound from Ω₂(κ) + Ω₁" | See D3. |
| `dhr-verification.md:113–121` | the DHR 1988 and boundary-value papers I–III | Elsevier and Springer remain closed to automation. Not load-bearing, as the file says. Booker–Browning's bibliography confirms the three boundary-value papers exist as [8],[9],[10] and that their Theorem 3.1 is attributed to them. |

---

## 8. Defects found

Four, none fatal, all precise.

**D1. `research/oeis-G2-submission.md:76` and `:122` still carry the decimal expansion this repo's own
audit retired, and attribute it to a book page that prints something else.**

> `:76` "the dimension-2 lower-bound sieve of Diamond and Halberstam has sifting limit beta_2 =
> **4.2665...** (Cambridge Tracts 177, p. 79)"
> `:122` "…CUP 2008, **p. 79**. [beta_2 = **4.2665...**]"

`dhr-verification.md:23` rules that "'4.2665…' as a decimal expansion is wrong (expansion is
4.266450…)", and fix #1 was applied to `beta2-note.md` but not here. Worse, the book page cited is
p. 79, and p. 79 prints **"β₂ ≈ 4.266"** (§6.2 above). So the OEIS draft misquotes the page it names.
This is the file destined for external publication, which makes it the worst place for the string to
survive. Correct to `beta_2 = 4.26645...` with Booker–Browning for the precision and p. 79 for the
"≈ 4.266" in print.

**D2. `research/sift-limit-attack.md:115` attributes to Franze's Table 1 a figure Franze's Table 1 does
not print.**

> "with his Table 1 listing β(2) ≤ **4.2665** (the DHR value our theorem uses)"

Franze's Table 1 prints **4.266**. The inequality as written is true, so this is a citation defect and
not a mathematical one, but it is verbatim the "CONVENTION-MISMATCH (citation)" of
`dhr-verification.md:24`, applied to `beta2-note.md` and missed here. (The other 30-odd bare `4.2665`
occurrences across the corpus are 4-d.p. roundings with no ellipsis and no source attached, which
`dhr-verification.md:23` explicitly blesses. They are fine. Only `:115` attributes the digits to a source.)

**D3. `research/dhr-verification.md:165` mis-transcribes Franze–Kao's density normalisation: wrong
equation number, wrong dimension, wrong denominator.**

> ours: "their density normalization upstream is the sum form 'Σ_{p⩽x} (ρ(p)/p) log p = **g** log x +
> O(1)', their **(14)**, with V(z) := Π_{p<z}(1 − ρ(p)/**p**) ≫ (log z)^{**−g**}."

Franze–Kao actually print:

- **(8)**: Σ_{p⩽x} (ρ₁(p)/p) log p = **g** log x + O(1)
- **(9)**: V(z) := Π_{p<z}(1 − ρ₁(p)/**φ(p)**) ≫ (log z)^{**−g**}
- **(14)**: Σ_{p⩽x} (ρ₂(p)/p) log p = **(g + 1)** log x + O(1)
- **(15)**: V′(z) := Π_{p<z}(1 − ρ₂(p)/p) ≫ (log z)^{**−(g+1)**}

Their (14)/(15) are the *shifted* sequence A′ = {nH(n)}, of dimension g+1, not the base sequence. Our
sentence pairs (8)'s right-hand side with (14)'s number and (9)'s exponent with (15)'s denominator, and
drops the ρ₁/ρ₂ subscript that distinguishes them. The parenthetical is context, not load-bearing: our
file uses Franze–Kao only for the *shape* of Theorem 9.1, which is now verified against the book itself.
Fix by citing (8) and (9) with ρ₁ and φ(p).

**D4. Two smaller citation slips, one in each direction.**

- `research/dhr-verification.md:83` expands Johnston–Thomas's `[5]` as "the Booker–Browning **table**".
  JT's bibliography reads [3] = Booker–Browning *code*, **[4] = Booker–Browning *table***, [5] =
  Booker–Browning, "Square-free values of reducible polynomials", *Discrete Anal.* The sentence JT
  attach [5] to ("β₂ = 4.266… is given to 20 decimal places in [5]") points at the paper. Ours should
  say [5] = the paper, or [4] = the table.
- `research/natal-cap-10-sieve-cap.md:145–149` labels the Wu 2004 sentence "verbatim" and it is a close
  paraphrase. Source (arXiv:0705.1652 p. 2): "Firstly the linear sieve formulas (see Lemma 2.2 below)
  [display (1.3)] are the best possible in the sense that taking A = B_ν := {n : **1 ⩽ n ⩽ x**, Ω(n) ≡ ν
  (mod 2)}  **(ν = 1, 2)**, the upper and lower bounds in (1.3) are respectively attained by ν = 1 and
  ν = 2 (see [14], page 239)." Ours substitutes "(1.3)" for "(see Lemma 2.2 below)", drops "1 ⩽" and
  drops "(ν = 1, 2)". Nothing changes meaning, and the load-bearing tail "(see [14], page 239)" is exact,
  as is the identification of [14] as HR 1974. Either restore the words or drop the word "verbatim".

**Not a defect, but a live internal inconsistency to resolve.** HR "5.3" is used for two different
things in the corpus. `natal-cap-10-sieve-cap.md:89` has **Theorem 5.3** = the explicit π_F(y) bound,
which is sourced (Bordignon–Lee) and sits correctly in Chapter 5, "The Selberg Upper Bound Method:
Explicit Estimates". `dhr-verification.md:202` has **Lemma 5.3** = the derivation of the product bound
from Ω₂(κ) + Ω₁, which has no source; Bordignon–Lee cite that derivation to HR **(5.2.1)** instead.
Books can number lemmas and theorems separately, so both can be true, but only one is sourced.

Also worth reconciling: `covering-dive.md:39` calls the 2008 book "Diamond–Halberstam–Galway" while
`beta2-note.md:102` calls it "Diamond & Halberstam alone, with an appendix by Galway". The title page
credits Galway for the computing procedures; Johnston–Thomas's bibliography lists all three as authors.
Both readings are defensible, but the corpus should pick one.

---

## 9. What is still unreachable, stated plainly

- **Halberstam–Richert, *Sieve Methods*, Academic Press, London, 1974.** Text unreachable by every legal
  route in §4.1. **Corollary 2.4.1 is neither confirmed nor refuted.** No paper in reach quotes it. What
  is now known: the book's chapter list (public, §4.2), that Chapter 2 is the combinatorial/Brun chapter
  where such a corollary belongs, that the content required of it is standard and independently stated by
  Ford, and that FKMPT's `[7]` is unambiguously this book. Anyone who later reaches the book should check
  three things at once: Corollary 2.4.1, p. 239, and whether "Lemma 5.3" exists alongside "Theorem 5.3".
- **Friedlander–Iwaniec, *Opera de Cribro*, AMS Colloq. Publ. 57, 2010, Lemma 6.8.** Paywalled at AMS and
  Google Books; no public restatement with FI's own constants located. The constants `s ≥ 9κ+1` and
  `e^{9κ−s}K^{10}` are verified as **Matomäki–Teräväinen's**, who cite FI with "see e.g.".
- **DHR, *Combinatorial sieves of dimension exceeding one* (JNT 28, 1988) and the three boundary-value
  papers.** Elsevier and Springer still closed to automation. Not load-bearing.

---

## 10. One line per item, for pasting into a ledger

1. `dhr-verification.md:181` Condition (B) — **VERBATIM**, Marasingha arXiv:math/0607494 LaTeX source, Theorem 3.1 eq. (B). κ, A₁, −1, ≤, range all correct.
2. `dhr-verification.md:239` **s ≥ 9κ + 1** — **VERBATIM**, Matomäki–Teräväinen arXiv:2301.07679 Lemma 9.1 p. 33. No off-by-one. Attribute the normalisation to MT, not to FI.
3. `two-class-lower-bounds.md:146` HR Cor. 2.4.1 — **UNREACHABLE**, and it should keep saying so. Chapter structure now public and consistent with the citation.
4. Bonus — DH book Theorem 9.1 (p. 104) and β₂ ≈ 4.266 (p. 79) **VERBATIM** against `attestation/` photographs. The one hypothesis the corpus never wrote down is "2κ is an integer", harmless at κ = 2.
