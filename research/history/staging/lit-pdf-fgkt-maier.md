# lit-pdf-fgkt-maier — arXiv:1408.4505 and the Maier literature, checked against PDFs

<!-- ledger
id: Q-lit-fgkt-maier
status: ANSWERED
todo: none
question: Do the corpus's FGKT and Maier quotations hold against the PDFs of record?
verdict: The quotations are VERBATIM where checked, including at the sub/superscript level HTML destroys, and the defects are in the claims built on them: a Buchstab dimension error at four sites, one of them publication-track and self-contradictory, and two provenance errors (the Maier-Pomerance equality form and the FGKT/FGKMT R-statement); Cheer-Goldston was not obtained, so one quotation stays unverified.
-->

Read-only literature verification, 2026-08-18. **No repo file was edited except this one.** No commit,
no push. Every verdict below comes from a PDF I downloaded and read in this session, not from an
abstract page, an ar5iv/arXiv HTML rendering, a search snippet, or a restatement inside a third paper.

## PDFs obtained (all of them; nothing in this report rests on HTML)

| short | identity confirmed from the PDF itself | pages | how obtained |
|---|---|---|---|
| **FGKT** | arXiv:1408.4505**v2** [math.NT] 9 Nov 2015, *Large gaps between consecutive prime numbers*, **Kevin Ford, Ben Green, Sergei Konyagin, and Terence Tao** (four authors, no Maynard) | 32 | `https://arxiv.org/pdf/1408.4505`, HTTP 200, 346,253 B, `PDF document, version 1.4` |
| **Maier 85** | *Primes in short intervals*, Helmut Maier, **Michigan Math. J. 32 (1985), 221–225**; footer "Received May 11, 1984" | 6 | Project Euclid `journalArticle/Download?urlId=10.1307%2Fmmj%2F1029003189`, HTTP 200, 328,501 B. **Image-only scan, no text layer** — read visually, page by page |
| **MP 90** | *Unusually large gaps between consecutive primes*, Helmut Maier and Carl Pomerance, **Trans. Amer. Math. Soc. 322, Number 1, November 1990, 201–237** | 37 | `ams.org/.../S0002-9947-1990-0972703-X.pdf`, HTTP 200, 2,793,314 B |
| **GS (preprint)** | arXiv:math/0406018**v1**, *An uncertainty principle for arithmetic sequences*, Granville and Soundararajan — this is the file behind `scratchpad/holt/gs.txt` | 21 | already on disk from an earlier session; I re-extracted from the PDF myself |
| **GS (published)** | **Annals of Mathematics 165 (2007), 593–635**, same title and authors | 43 | `annals.math.princeton.edu/wp-content/uploads/annals-v165-n2-p06.pdf`, HTTP 200, 890,630 B |
| **FGKMT** | arXiv:1412.5029**v3** 14 Jul 2016, *Long gaps between primes*, Ford, Green, Konyagin, **Maynard**, Tao | — | `https://arxiv.org/pdf/1412.5029`, HTTP 200 — pulled because item 4 turned up a provenance problem that spans both Ford papers |

**PDF NOT OBTAINED, and therefore not verified here:** Cheer and Goldston, *A differential delay equation
arising from the sieve of Eratosthenes*, Math. Comp. 55 (1990). The `"introduced by Buchstab in connection
with an asymptotic formula for the number of uncanceled terms in the sieve of Eratosthenes"` quotation at
`research/PRIOR-ART.md`:399 is **UNVERIFIED in this pass** — I did not read that paper. What I *can* say
from Maier 85's own reference list is that the phrase closely tracks the title of Maier's reference [1],
de Bruijn, *On the number of uncancelled elements in the sieve of Eratosthenes*, Nederl. Akad. Wetensch.
Proc. 53 (1950), 803–812 — note **"uncancelled … elements"** there against our **"uncanceled … terms"**.
That is a flag for whoever re-checks, not a verdict.

**Note on method.** `pdftotext` flattens superscripts and subscripts, which is precisely the distinction
that decides whether FGKT wrote `log² x` or `log₂ x`. Every such glyph in item 1 was resolved by
`pdftotext -bbox-layout` and comparing the y-coordinate of the digit against the baseline of the adjacent
`log`. Those readings are reported explicitly below.

---

## Item 1 — `research/maxgap-law.md`:363, the `a_p` passage

### (a) Verdict: **VERBATIM**, within its two marked elisions. The common value is confirmed to be **zero**.

### (c) Location
FGKT §1 Introduction, the paragraph beginning "We turn now to a discussion of the proof of Theorem 2."
It starts at the **foot of printed page 3** and runs onto **printed page 4** (printed page n = PDF page n
in this file). Our header at :360 says "arXiv:1408.4505 §1, verbatim" — §1 is correct.

### (b) Source beside ours

Source, transcribed from the PDF:

> Prior authors divided the sieving into different steps, **a key to all of them being to take a common
> value of a_p for "large" p, say a_p = 0 for z < p < δx,** where δ > 0 is a small constant and
> z = x^{c log₃ x / log₂ x} for some constant c > 0. The numbers in [y] surviving this first sieving
> either have all of their prime factors ⩽ z (i.e., they are "z-smooth") or are of the form pm with p
> prime and m ⩽ y/δx. One then appeals to bounds for smooth numbers, e.g. [3], to see that there are very
> few numbers of the first kind, say O(x/log² x). By the prime number theorem there are ∼ y log₂ x / log x
> unsieved numbers of the second kind. By contrast, if one were to take a random choice for a_p for
> z < p < δx, then with high probability, the number of unsifted integers in [y] would be considerably
> larger, about y log z / log x.

A word-level diff against our block at :363–372 returns exactly these differences and no others:

| # | source | ours | reading |
|---|---|---|---|
| 1 | `Prior authors divided the sieving into different steps,` | *(absent, no leading ellipsis)* | our quote opens mid-sentence on a lowercase word, so it reads as a fragment; **unmarked front truncation**, cosmetic |
| 2 | `, where δ > 0 is a small constant and z = x^{c log₃ x/log₂ x} for some constant c > 0.` | `...` | **properly marked elision** |
| 3 | `, e.g. [3],` | `...` | **properly marked elision** |
| 4 | `δ`, `⩽`, `∼` | `delta`, `<=`, `~` | house ASCII transliteration, used consistently corpus-wide |
| 5 | *(no emphasis)* | last sentence set in `**bold**` | **emphasis added, not marked as added** |

### The sub/superscript question, resolved from glyph coordinates (page 4, y increases downward)

| source text | `log` baseline yMin | digit yMin | digit sits | therefore | our rendering |
|---|---|---|---|---|---|
| `O(x/ log 2 x)` | 156.70 | **154.46** | **higher** | **superscript** → `log² x` | `O(x/log^2 x)` ✅ |
| `y log 2 x/ log x` | 156.70 | **161.54** | **lower** | **subscript** → `log₂ x` | `y log_2 x/log x` ✅ |
| `log x/(log 2 x) O(1)` | 515.50 | `2` at **520.34** / `O(1)` at **513.74** | lower / higher | `(log₂ x)^{O(1)}` | `(log_2 x)^{O(1)}` ✅ |
| `z = x c log 3 x/ log 2 x` (p. 3) | exponent block at 682.10 vs baseline 683.86; `3`,`2` at 686.09 | — | whole block raised, digits lowered inside it | `z = x^{c log₃ x/log₂ x}` | `z = x^{c log_3 x/log_2 x}` at :393 ✅ |

**Our document gets all four right.** This is the exact class of error an HTML rendering produces, and the
corpus did not make it here.

### (d) Is the surrounding claim supported? **Yes, and the quantifier the brief flagged is the strong reading.**

The brief asked what the common value is set to, because the covering-identity work turns on `a_p` being a
free translate rather than a fixed pair. The source is unambiguous: **`a_p = 0`**, a single fixed value,
held common across the whole range `z < p < δx`. Not a free translate, not a per-prime choice — zero.
FGKT's own contrast sentence makes the point structural rather than incidental: a *random* `a_p` on that
same range leaves `≈ y log z / log x` survivors instead of `∼ y log₂ x / log x`, and since
`log z = c x log₃ x / log₂ x` while `log x` is the ambient scale, the aligned choice is the entire gain.
Our §7 reading — that `T1 = log z / log₂ x` "is the gain of an ALIGNED `a_p` over a random one" (:390–391) —
is exactly what the source says, in the source's own two numbers.

The arithmetic our document builds on top also closes:
`T1 = log z/log₂ x = (c log₃ x/log₂ x)·log x/log₂ x = c·log x log₃ x/(log₂ x)²`, which is what :393 states.

**Second quote block, :375–378** (`Assuming that V is a "random" subset…`): source is on **printed page 4**,
same paragraph run. Diff returns two differences only — source `V ∩ (a (mod p))` against our
`V n (a mod p)` (dropped inner parenthesis, cosmetic), and source **`≈ |V|/p`** against our **`~ |V|/p`**.
The second is worth one line: our block renders source `∼` and source `≈` with the same `~`, so the two
FGKT blocks use one glyph for two different relations. Immaterial to the claim; noted for exactness.

---

## Item 2 — `research/maier-matrix.md`:550, "(1.7) … α ≥ 60 log log log x / log log x"

### (a) Verdict: **VERBATIM.** Constant 60 confirmed, iterated-log structure confirmed, η-cap confirmed.

### Which paper: **Granville and Soundararajan, not Maier.**

Our §8 heading names it ("Granville-Soundararajan Corollary 1.4") and cites `scratchpad/holt/gs.txt` lines
313–325. I traced that file: it is `pdftotext` output of **arXiv:math/0406018v1**, *An uncertainty
principle for arithmetic sequences*, Granville and Soundararajan. I verified against **that PDF** and,
independently, against the **published Annals of Mathematics 165 (2007), 593–635** version. **The numbering
is identical in both** — (1.7) is (1.7), Corollary 1.4 is Corollary 1.4 — so the corpus is not exposed to a
preprint/published renumbering here.

### (c) Location
**Published: Annals 165 (2007), printed page 599 = PDF page 7** of the Annals reprint, §1b "General
results", immediately after Example 5. Preprint: gs.txt lines 313–325 — our citation is **exact**,
Corollary 1.4 opens at 313 and alternative (ii) ends at 325.

### (b) Source beside ours

Published Annals, p. 599, transcribed from the PDF:

> **Corollary 1.4.** Let A, S, f_q and γ_q be as above. Suppose that 0 ≤ h(n) ≤ 1 for all n. **Suppose that
> (1.7) holds for some α ≥ 60 log log log x/ log log x and set η = min(α/3, 1/100). Then for each
> 5/η² ≤ u ≤ η(log x)^{η/2} at least one of the following two assertions holds:**

Ours (:550–552):

> *"Suppose that (1.7) holds for some α ≥ 60 log log log x/ log log x and set η = min(α/3, 1/100). Then for
> each 5/η² ≤ u ≤ η(log x)^{η/2} at least one of the following two assertions holds …"*

**Character-for-character identical.** The only difference is the trailing `:` replaced by `…`.
The constant is **60**. The structure is **60·log log log x / log log x** — triple log over double log,
exactly as printed.

### What (1.7) is in the source

Stated in **Corollary 1.3**, printed page 598 (preprint gs.txt:262):

> (1.7)  Σ_{p ≤ log x} [(1 − h(p))/p] · log p ≥ α log log x,

where `h` is the non-negative multiplicative function of the setup (1.5), `A_d(x) ≈ (h(d)/d)A(x)`, and `S`
is "a finite set of 'bad' primes". GS's own gloss (p. 598): "The condition (1.7) ensures that h(p) is not
always close to 1; this is essential in order to eliminate the very well behaved Example 1."

### (d) Is the surrounding claim supported? **Yes — the vacuity derivation is correct, and I re-derived it.**

- η = min(α/3, 1/100) ⇒ **η ≤ 1/100 for every sequence, for every α** ✅ (:554)
- ⇒ 5/η² ≥ 5·10⁴ = **50,000 always** ✅ (:555)
- upper bound u ≤ η(log x)^{η/2} ≤ (1/100)(log x)^{1/200}, monotone in η in the right direction ✅
- non-empty range ⇒ (log x)^{1/200} ≥ 5·10⁶ ⇒ **log x ≥ (5·10⁶)²⁰⁰** ✅ (:556)
- (5·10⁶)²⁰⁰: log₁₀ = 200·6.69897 = 1339.79, so **≈ 10^{1340}** ✅ (:557, "roughly x > exp(10^{1340})")

The `α = 1 + o(1)` claim at :565–568 also checks. With `h(p) = 0` for `p ≤ x`, (1.7)'s summand is
`(1−0)·log p/p`, and `Σ_{p ≤ log X} log p/p ~ log log X` by Mertens, giving α = 1. GS themselves write
that Corollary 1.3 "applies to the sequences of primes (with α = 1 + o(1))" — same value, same reason.

### Two things to record against §8, neither of them a quotation defect

1. **The cited source file no longer exists.** `scratchpad/holt/gs.txt` lives in another session's
   ephemeral scratchpad (`/private/tmp/claude-501/.../2a01d02b-…/scratchpad/holt/gs.txt`), not in the repo.
   §8 also never names the paper's title, journal, year or arXiv id — only "Granville-Soundararajan
   Corollary 1.4". The full citation *is* carried at `research/PRIOR-ART.md`:414, but §8 does not point
   there. A reader of `maier-matrix.md` alone cannot reach the source.
2. **GS's own framing of Corollary 1.4 strengthens our §8 conclusion and is not quoted.** Immediately after
   the corollary (p. 600): *"Corollary 1.4 is our general version of Maier's result; it is a weak form of
   the more technical Theorem 2.5."* So the vacuity we compute is the vacuity of the *weak* form, and
   GS's Theorem 2.5 is the sharp one. §8's verdict "Corollary 1.4 is not an obstruction to anything in this
   repo" is correct as written and about the right object, but the sentence "it is a weak form of the more
   technical Theorem 2.5" means the corollary's vacuity does not by itself clear Theorem 2.5. Worth a line
   in the body, since §8 currently reads as though the whole GS obstruction had been disposed of.

---

## Item 3 — `research/maier-matrix.md`:154, `ρ_y(S) := [D_y(S)/S] / [D_y/W_y]`

### (a) Verdict: **OURS-NOT-THEIRS.** This is a house definition, not a quotation from Maier.

It appears in **no** Maier or GS source I read. Maier 85 has no ρ. GS use `γ_q`, `f_q(a)`, `h(d)`, `Φ`.
The `:=` is a definitional colon-equals: our own object, being introduced.

### Is the blockquote reading as attribution? Partly — and the risk is real but structural, not deceptive.

In this corpus `>` carries **two** jobs, and `maier-matrix.md` uses both within a few hundred lines:

- **house result box** — `> **Transfer identity (PROVEN).**` (:107), `> **Origin Excess Lemma…**` (:199),
  `> **Proposition.**` (:422), `> **e^{2γ}/4 = 0.79305.**` (:394)
- **external quotation** — `> *"Suppose that (1.7) holds…"*` (:550), always **italic + double quotes**, and
  always preceded by a naming line ("Checked against … Verbatim:")

Line 154 is `> **bold**` with `:=` and **no italics, no quote marks, no naming line**. By the file's own
convention it is unambiguously a box, and the same convention is honoured at :550 for the one real
quotation in the file. So this is **not** a house definition dressed as an attributed quotation.

**But the surrounding prose does most of the damage the brief was worried about.** The definition sits under
the heading `### 3a. What the identity says in Maier's language` (:150), and the sentence immediately after
it reads `This is Maier's mechanism exactly, with all error terms zero.` (:157). A reader skimming heading →
box → next sentence can carry away that `ρ_y(S)` is Maier's notation. It is not. **Recommended fix (not
applied): leave the box, and change "in Maier's language" to something that does not imply the notation is
his** — the mechanism analogy is fair, the vocabulary attribution is not.

### (d) And there is a substantive over-claim two lines later, which matters more than the formatting

`:157–160` reads: *"ρ_y(S) is the two-dimensional survival function … and its oscillation away from 1 is
the Buchstab oscillation Cheer and Goldston computed and Maier used."*

Against the PDF of record, **Maier's ω and our ρ are different functions.** Maier 85, p. 222:

> **LEMMA 3 (Buchstab).** Let λ > 1. Then lim_{z→∞} z^{−λ} W(z)^{−1} Φ(z^λ, z) = e^γ ω(λ),
> where ω(u) is defined by (2.1) ω(u) = u^{−1}, 1 ≤ u ≤ 2; d/du(u ω(u)) = ω(u−1), u ≥ 2

with `Φ(x,y) = |{n ≤ x : (n, P(y)) = 1}|` and `W(z) = ∏_{p<z}(1 − 1/p)`. That is the **one-dimensional**
sifting function — integers coprime to a primorial, one class per prime. Ours is the **pair** analogue,
two classes per prime. The two are separated by a squaring, and the corpus's own numbers prove it:

- Maier's dimension-1 value at u = 2 is `e^γ ω(2) = e^γ/2 = 0.8905362…`
- our ρ(2), quoted five times in the corpus, is `e^{2γ}/4 = 0.79305…`
- and `(e^γ/2)² = 0.793055…` — **our constant is the exact square of Maier's.**

The corpus mostly knows this and says so correctly: `GLOSSARY.md`:188 "pair-Buchstab square (e^γ ω(u))²",
`paper/moire-primes.md`:303 "ρ(u) = e^{2γ}/u² … continuing as the pair-Buchstab square",
`research/origin-excess.md`:36 "squared-Buchstab form", `FOLD-PROFILE.md`:386 "the pair-Buchstab overshoot".
**Four sites drop the qualifier and assert an identity that is false as stated:**

| site | text | correct statement |
|---|---|---|
| `paper/moire-primes.md`:648–651 | "The survival curve this project measured … **is Buchstab's ω(u)** … which is the analytic input to Maier's theorem" | it is the **pair** analogue `(e^γ ω(u))²`; the input to Maier's theorem is the dimension-1 ω. **Publication-track file, and it contradicts line 303 of the same paper.** |
| `research/PRIOR-ART.md`:409–410 | "our survival law S/P is a function of u … **It is the Buchstab function.**" | same |
| `research/PRIOR-ART.md`:388, 412–414 | "**Our survival curve is the input to Maier's theorem** … the loop closes: our scale-free survival law is the **exact** analytic input" | the **analogue** closes, not the identity; "exact" is the word that fails |
| `research/maier-matrix.md`:157–160 | "its oscillation … **is** the Buchstab oscillation … Maier used" | dimension-2 oscillation, not the dimension-1 one Maier used |

This is the one place in the whole sweep where a quotation is faithful and the claim built on it is not.
The honest form is one word longer and still a good finding: *our survival law is the pair analogue of the
Buchstab function whose dimension-1 form is the analytic input to Maier's theorem, and our trough constant
is the square of his.*

**A chronology note, lower severity.** `maier-matrix.md`:160 "the Buchstab oscillation Cheer and Goldston
computed and Maier used" and `G2-STATE.md`:775 "computed by Cheer and Goldston and used by Maier" both read
as a chain, and the chain is impossible: Maier is 1985, Cheer–Goldston is 1990. Grammatically both clauses
attach independently to the same object, so neither sentence is strictly false, and `PRIOR-ART.md`:396–401
already flags the direction of dependence correctly ("the source reads 'Maier *has recently* used this
result'"). Left as an ambiguity, not a defect.

---

## Item 4 — sweep of `grep -rn "Maier" --include="*.md" research paper | grep -v history`

96 hits across 14 files. Every substantive attributed claim below was checked against a PDF.

### 4.1 Maier's theorem — **VERBATIM, correct, and the strongest result in this sweep**

`research/PRIOR-ART.md`:379–381 states:

> limsup [pi(x + Phi(x)) - pi(x)] / [Phi(x)/log x] > 1, and liminf < 1

Maier 85, **printed page 221**, the paper's only numbered THEOREM:

> **THEOREM.** Let Φ(x) = (log x)^{λ₀}, λ₀ > 1. Then
> lim sup_{x→∞} [π(x+Φ(x)) − π(x)] / [Φ(x)/log x] > 1 and lim inf_{x→∞} [π(x+Φ(x)) − π(x)] / [Φ(x)/log x] < 1.
> For the range 1 < λ₀ < e^γ we have even lim sup_{x→∞} [π(x+Φ(x)) − π(x)] / [Φ(x)/log x] ≥ e^γ/λ₀,
> where γ denotes Euler's constant.

Our statement is **exactly Maier's**, with `λ` for his `λ₀`. `paper/wall-note.md`:210–212 and
`paper/moire-primes.md`:645–648 state the same thing in prose and are equally correct.

**One caveat worth recording.** We repeatedly say our window is "the case λ = 2"
(`PRIOR-ART.md`:384, `moire-primes.md`:647). λ = 2 is inside Maier's **qualitative** range (λ₀ > 1) ✅ but
**outside his quantitative range 1 < λ₀ < e^γ = 1.7811**. So the qualitative irregularity is ours to cite at
λ = 2; the explicit constant `e^γ/λ₀` is **not available at λ = 2** from this theorem. Nothing in the corpus
currently claims the constant, so no live claim breaks — but anyone reaching for `e^γ/2` at λ = 2 would be
reaching past what p. 221 licenses.

### 4.2 The Maier matrix method — **correct, and better sourced than our own citations suggest**

`PRIOR-ART.md`:362–365 says the method "constructs its intervals by *first selecting a primorial and then
using the distribution of integers coprime to that primorial*", and credits the explicit matrix layout to GS.
**Both halves verify, and the matrix is in Maier's own paper, printed page 224, not only in GS:**

> We consider the matrix 𝔐 = (a_{rs}), where a_{rs} = s + rP(z), 1 ≤ s ≤ U, P(z)^{D−1} < r ≤ 2P(z)^{D−1}.
> … The **rows** of 𝔐 are **intervals** of U consecutive integers, whereas the **columns** of 𝔐 are
> **arithmetic progressions** with common difference P(z). Only those columns for which (s, P(z)) = 1
> contain primes. We call such columns **admissible**.

with `P(z) = ∏_{p<z} p` defined on p. 222. Primorial modulus, columns are APs to it, admissible columns are
exactly the residues coprime to the primorial. Our sentence is right on both counts. The rows-are-intervals /
columns-are-APs orientation our corpus uses is Maier's own words, so `PRIOR-ART.md`'s framing of GS as the
source of that orientation understates what Maier 85 already prints — GS generalise the layout, they do not
originate it.

This also settles `maier-matrix.md`:48, "**We take ℓ = 1**, which is Maier's own configuration". **Correct.**
GS's two-modulus entry `(R+r)q + sℓ` collapses at ℓ = 1 to `(R+r)q + s`, which is Maier's `s + rP(z)` with
`q = P(z)`. Exact match.

And `maier-matrix.md`:58 / :497, "GS's restriction of the entries to [x/4, x]". **Correct and verbatim in
the source**, gs.txt:555: *"Note that the n appearing in our 'matrix' all lie between x/4 and x."*, with
`R := [x/(4q)]` in the proof at gs.txt:541. Maier's own analogue is the band `P(z)^{D−1} < r ≤ 2P(z)^{D−1}`,
a factor-2 range — same structural restriction, different constant. Our claim that both "structurally
exclude the origin" is sound.

### 4.3 Every gs.txt line-number citation — **exact**

| our citation | gs.txt line | what is actually there |
|---|---|---|
| `PRIOR-ART.md`:369, "gs.txt line 557" + quoted row formula | **557** ✅ | "The r-th row contributes A((R + r)q + ℓS; ℓ, (R + r)q) − A((R + r)q; ℓ, (R + r)q)." — **VERBATIM**, ℓ→l only |
| `maier-matrix.md`:516, "gs.txt line 386" | **386** ✅ | "Our general framework allows us to substitute a zero-density result of P. X. Gallagher where previously the Generalized Riemann Hypothesis was required." — **VERBATIM** |
| `maier-matrix.md`:548, "lines 313 to 325" | **313–325** ✅ | Corollary 1.4 opens at 313, alternative (ii) closes at 325 |
| `maier-matrix.md`:46, "gs.txt line 542" for entry `(R+r)q + sℓ` | 542 is the matrix's introducing sentence; the **formula itself is at 550** | 8 lines loose, points at the right display; **formula VERBATIM** |
| `PRIOR-ART.md`:416, *"seem to depend on the subset having some arithmetic structure"* | ✅ | verified in **both** the preprint (gs.txt:106) and **Annals p. 595**; VERBATIM |

### 4.4 Gallagher as Maier's AP input — **correct, and the citation is exact**

`maier-matrix.md`:511–515: "Maier's AP input is expensive: for primorial moduli it is Gallagher's
large-sieve zero-density estimate near σ = 1 (**Invent. Math. 11, 1970**)".

Maier 85 p. 222 has **"LEMMA 2 (Gallagher)"** as the prime-counting input, and the reference list on
p. 225 reads: **"3. P. X. Gallagher, *A large sieve density estimate near σ = 1*, Invent. Math. 11 (1970),
329–339."** Journal, volume and year are exact. The mechanism gloss ("keeps the exceptional zeros out") is a
one-step compression — the exceptional-zero control is Lemma 1 plus Page's theorem (p. 222), with Gallagher
supplying the density estimate that Lemma 1 rests on in Maier's [7] — but it is a fair compression and the
conclusion §7 Q3 draws from it (unconditionality is what the AP fight buys) is exactly GS's own point in the
gs.txt:386 sentence.

### 4.5 Maier–Pomerance, exponent 2 — **VERBATIM, page correct, and one hypothesis is hidden by an ellipsis**

`research/two-class-lower-bounds.md`:96 cites "TAMS 322 (1990) 201-237, p. 205", and :184 says "Their p. 205,
verbatim". **Both correct.** Title, authors, volume, issue, month and page range all verify from the PDF;
the passage is on **printed page 205** (PDF page 5).

Source, p. 205:

> The traditional argument is to use each prime in (z, x] to delete a single member of R ∪ R′. … What we
> will show below is that for a certain positive proportion of the primes in (z, x], we can remove two
> members of R ∪ R′ and so we may choose c₀ somewhat larger than 1.
> If R ∪ R′ can be viewed as a random set of residues mod q for each prime q ∈ (z, x] **and these are
> "independent events" for the different values of q**, then we would expect to be able to remove
> (log x)^{1+o(1)} members of R ∪ R′ for a positive proportion of these q's. If such an argument could be
> made rigorous we would have a proof of (1.5).

Ours matches word for word inside the elisions. **One thing to record:** our `...` after "random set of
residues mod `q`" swallows **"for each prime q ∈ (z, x] and these are 'independent events' for the different
values of q"**. That elision removes the *second* of MP's two hypotheses — independence across q, not just
randomness within one q. The `1 + 1` decomposition our §2c builds does not turn on it, so the claim survives;
but a marked elision that drops a hypothesis is worth knowing about in a passage whose whole point is what
the conjecture assumes. Bolding is again added without being marked as added.

Also confirmed from the same PDF: **c₀ = 1.31256…**, "the solution of the equation 4/c₀ − e^{−4/c₀} = 3"
(abstract, p. 201) — the constant our corpus quotes at `maxgap-law.md`:400 and `two-class-lower-bounds.md`
is exact.

### 4.6 The Maier–Pomerance conjecture, and a provenance correction that runs through three files

**FOUND IN THE PRIMARY SOURCE, where our corpus says it is not.** MP 1990, **printed page 202**:

> Thus if J(x) := max_{n ⩽ x} j(n), then it is easy to see that for x ⩾ 7, (1.2) G(x) ⩾ J(x).
> …
> (1.5)  J(x) ≪ log x (log log x)^{2+o(1)}.
> **In fact, we conjecture that equality holds in (1.5).**

So the **equality form is Maier and Pomerance's own, in their own paper, one line after (1.5)**. Three sites
in our corpus attribute the equality form to Ford's 2018 Montreal slides instead:

| site | text | status |
|---|---|---|
| `research/maxgap-law.md`:428 | "The equality form `J(T) = T(log T)^{2+o(1)}` **is Ford's Montreal slides, §6**" | **incomplete** — the primary source is MP 1990 p. 202 |
| `research/oeis-G2-submission.md`:50–53 | "the lower bound quoted here needs the equality form j(P) = p·log(p)^{2+o(1)}, **which is how Ford states it** in his 2018 Montreal lectures" | **incomplete**, and this is an **outward-facing OEIS submission draft** |
| `research/oeis-G2-submission.md`:119–121 | Ford's slides listed as the reference "[the equality form of the Maier-Pomerance conjecture]" | **incomplete** — MP 1990 should carry it |

Note the variable change is legitimate and is *not* the issue: MP's J takes a bound on n, FGKT's Y takes the
prime bound, related by `x_MP ≈ e^{x_FGKT}`, under which MP's `log x (log log x)^{2+o(1)}` becomes
`T (log T)^{2+o(1)}` exactly. Our `J(T) = T(log T)^{2+o(1)}` is the correct translation. The defect is
purely one of provenance: **we route a conjecture to a slide deck when its authors state it in the paper the
corpus already cites and I have now read.** `research/PRIOR-ART.md`:23 already states the equality form
without hedging, which is right; the three sites above should point at MP 1990 p. 202.

`maxgap-law.md`:299 itself is clean — it presents the statement as quoted **from Ford's slides**, which is
what it is.

### 4.7 FGKMT (1412.5029) statements at `maxgap-law.md`:415–425 — **verified, with one real correction**

The document says these were checked on 2026-08-17 against 1412.5029 and "does not need re-checking". I
re-checked them anyway, because item 1's paper (1408.4505) is cited in the same section and the two get
conflated. Results from the 1412.5029v3 PDF:

| our claim | verdict |
|---|---|
| "FGKMT p. 4, verbatim: *It is conjectured by Maier and Pomerance that in fact Y(x) ≪ x(log x)^{2+o(1)}*" | **VERBATIM, and printed page 4 is right** |
| "`Y(x) = j(P(x)) − 1` exactly, their eq. (1.3)" | ✅ exact |
| "`Y` itself is their Definition 1" | ✅ "Definition 1. Let x be a positive integer. Define Y(x) to be the largest integer y for which…" |
| "their eq. (1.2) is … the proven lower bound `Y(x) ≫ x log x log₃ x/log₂ x`" | ✅ exact |
| "*This improves on the bound Y(x) ≫ x log x log₃ x/(log₂ x)² obtained by Rankin.*" | **quote is accurate but is a truncation printed as a full sentence** — the source continues "…obtained by Rankin [37], **and the improvement Y(x) ≫ x log x/log₂ x obtained in unpublished work of the fourth author.**" Our full stop replaces a comma. Denominator confirmed as `(log₂ x)²` by bbox, not by flattened text |
| "Their own Theorem 1 is `G(X) ≫ log X log₂ X log₄ X/log₃ X` with an effective implied constant" | ✅ verbatim, including "The implied constant is effective." |
| "**the arbitrary-constant `R` statements belong to the earlier Rankin-shape literature and not to FGKMT**" | **MISLEADING as written — see below** |

**The correction.** That last sentence is true of 1412.5029. It is **false of 1408.4505**, which the *same
section of the same document* cites as its §1 source three paragraphs earlier. FGKT (1408.4505), printed
page 3:

> **Theorem 2.** For any **R > 0** and for sufficiently large x we have
> (1.1)  Y(x) ⩾ **R · x log x log₃ x / (log₂ x)²**.

So the arbitrary-constant statement **with the squared form** is **FGKT's own Theorem 2 / eq. (1.1)**, not
merely "earlier Rankin-shape literature". A reader of `maxgap-law.md` §7 has both papers live and will read
the sentence as covering both. Recommended (not applied): name the paper — "*FGKMT* print the squared form
only to say they improve on it; the arbitrary-`R` version of the squared form is *FGKT*'s own Theorem 2 in
1408.4505." Note also that **`maxgap-law.md`:396 calls the single-`log₂` bound "FGKMT's eq. (1.2)"** — that
is correct for 1412.5029, and it is the sentence that makes the adjacent 1408.4505 material easy to
misattribute.

### 4.8 The `d = gcd(q, x#)` classification — **stated against the correct original**

`maier-matrix.md`:612–616 (reading 6) and `G2-STATE.md`:469–480 assert that for an exactly W-periodic set
the matrix depends on the column modulus q only through `d = gcd(q, W)`, returning the mean of the window
count over the `W/d` windows at multiples of `d`. The brief asked whether this is stated against the right
original. **It is.** The object being classified is the GS/Maier matrix in its actual printed form — entries
`(R+r)q + sℓ` (gs.txt:550) at ℓ = 1, which is Maier's own `a_{rs} = s + rP(z)` (Maier 85 p. 224). The
classification quantifies over the column modulus `q`, which is exactly the parameter Maier fixes at `P(z)`
and GS leave free. Our d = W case reproduces Maier's own degenerate configuration (`q` a multiple of the
period), and our d = y# case is the non-degenerate one. Nothing in the classification misdescribes either
source.

Two supporting claims also check out:
- `maier-matrix.md`:462–464, "GS's coprimality condition (q, S) = 1 pushes you toward" a modulus coprime to
  the tile. GS's Corollary 1.4(ii) does read "an arithmetic progression a (mod q) with **(q, S) = 1**"
  (Annals p. 600), and `S` is their finite set of bad primes, which for our object is the primes ≤ x. So the
  pressure our sentence describes is real and printed.
- `maier-matrix.md`:538–540, "Maier's corresponding step is confined to S = (log x)^λ with λ bounded and to
  positions in [x/4, x]". Correct in substance: Maier's conclusion window is `Φ(x) = (log x)^{λ₀}` with λ₀ a
  fixed constant > 1 (p. 221), and his entries sit in the factor-2 band of p. 224. The `[x/4, x]` figure is
  GS's constant, not Maier's; the sentence attributes it to Maier. Cosmetic.

### 4.9 Bibliography entries — **all exact**

- `paper/moire-primes.md`:774 "Maier, H. *Primes in short intervals.* Michigan Math. J. 32 (1985)." ✅
  confirmed from the PDF footer, "Michigan Math. J. 32 (1985)", pp. 221–225.
- `paper/moire-primes.md`:775 "Maier, H.; Pomerance, C. *Unusually large gaps between consecutive primes.*
  Trans. AMS 322 (1990)." ✅ confirmed from the title page. (The PDF's *running head* is the shortened
  "LARGE GAPS BETWEEN CONSECUTIVE PRIMES" — anyone verifying from a page image rather than page 1 could be
  misled into thinking the title is wrong. It is not.)
- `research/PRIOR-ART.md`:414 "Annals of Math 2007, arXiv:math/0406018" ✅ both identifiers correct; the
  Annals volume/pages are 165 (2007), 593–635 if the entry is ever expanded.
- `research/exponent-control.md`:19–20 "Maier and Pomerance conjecture p·(log p)^{2+o(1)}, so exponent
  1 + o(1)" ✅ consistent with MP (1.5) in the prime-bound variable.
- `research/covering-dive.md`:125 "Maier–Pomerance conjectured Y(x) ≪ x (log x)^{2+o(1)} (stated in
  FGKT/FGKMT and at #687)" ✅ — and it is the one site that correctly marks the `≪` form as the one FGKT and
  FGKMT state, as distinct from the equality form.
- `research/oeis-G2-submission.md`:116, "their eq. (1.3) **and the line after it**" — imprecise. In
  1412.5029 the MP conjecture is the **third** sentence after (1.3), not the line after it. Harmless in a
  reference note, but this file is an OEIS submission draft.

---

## Summary table

| # | target | verdict |
|---|---|---|
| 1 | `maxgap-law.md`:363, FGKT `a_p` | **VERBATIM.** `a_p = 0` confirmed — a fixed common value, not a free translate. All four sub/superscripts correct against glyph coordinates. Surrounding `T1` claim supported |
| 2 | `maier-matrix.md`:550, GS Cor. 1.4 | **VERBATIM.** Constant **60** confirmed, `60 log log log x / log log x` confirmed, `η = min(α/3, 1/100)` confirmed, in **both** preprint and Annals. (1.7) identified. Vacuity derivation re-derived and correct |
| 3 | `maier-matrix.md`:154, `ρ_y(S)` | **OURS-NOT-THEIRS.** House box, correctly formatted as a box by the file's own convention — but the heading and the next sentence imply Maier's vocabulary, and the identification of ρ with Buchstab's ω is a **dimension error** repeated at 4 sites |
| 4 | Maier sweep, 96 hits | Maier's theorem **VERBATIM**; matrix method **correct and under-credited to Maier**; Gallagher citation **exact**; MP p. 205 **VERBATIM** with a hypothesis inside an ellipsis; `d = gcd(q, x#)` **stated against the correct original**; **MP conjecture equality form mis-routed to Ford's slides at 3 sites**; **FGKT Theorem 2's arbitrary-`R` statement contradicts `maxgap-law.md`:425** |

**Nothing was found wrong with the three quotations the brief named.** All three are faithful to the PDFs,
including at the sub/superscript level that HTML destroys. The findings are in the claims built on top:
the Buchstab dimension error (4 sites, one of them publication-track and self-contradictory), and two
provenance errors (the MP equality form, and the FGKT/FGKMT `R`-statement).

## Gate

`node research/qc.js` was run **before** any writing and returned **1 finding**, not 0:
`unverified-absence-claim` at `research/two-class-lower-bounds.md`:225. That finding is **pre-existing and
not mine** — it is the bookkeeping tail of a correction another agent applied to that line in this same
session (the body sentence now reads "Nobody has run *this* accounting in dimension 2, and §4 does it — but
the blanket form of that sentence was false and is corrected here, 2026-08-18", crediting Kalmynin–Konyagin,
Izv. Math. 88:2 (2024)). The check fires on the surviving phrase "Nobody has run" and clears once the verdict
is recorded in `ABSENCE_VERIFIED` in `research/qc/ledgers.js`. **I did not touch it**, because this brief
permits edits to this report only. The other seven checks were clean before and after.
