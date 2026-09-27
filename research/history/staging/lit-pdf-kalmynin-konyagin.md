# Literature verification against the PDF of record: Kalmynin–Konyagin

<!-- ledger
id: Q-lit-kalmynin-konyagin
status: ANSWERED
todo: none
question: Do the corpus's Kalmynin-Konyagin citations hold against the PDF of record?
verdict: Item 2 is clean, reproducing their Theorem 1 at l_f = 2, h_f = 0, M(f) = 2 exactly; item 1 is MISROUTED, the quote being FKMPT's Definition 1 rather than K-K; and the word twin appears zero times in every version, with the calibration running opposite to expectation, since they delete two or more residue classes per prime and run a dimension-2 Mertens ledger, which our own absence rows still call ABSENT.
-->

*(2026-08-18. Read-only pass. Nothing in the corpus was edited. Calibration:
VERBATIM (character-checked against the PDF), DIFFERS (with the difference
marked), NOT FOUND, SUPPORTED / OVER-CLAIMED for the surrounding claim.)*

**PDF OBTAINED — four of them.** The assigned arXiv PDF, both of its versions,
the published Izvestiya PDF, and the PDF of the paper that item 1's quote
actually comes from. Nothing below was read from an HTML rendering, an abstract
page, or a restatement inside a third paper.

**Headline, one sentence.** Item 2 is clean — the displayed bound at
`research/covering-dive.md:137` reproduces Kalmynin–Konyagin's Theorem 1 at
`ℓ_f = 2, h_f = 0, M(f) = 2` **exactly**, every exponent and every iterated log
in the right place, and the surrounding INFERRED / "do not quote as proven"
calibration is correct; item 1 is **misrouted** — the quote at
`research/two-class-lower-bounds.md:118` is not in Kalmynin–Konyagin at all and
the file itself never says it is, it is FKMPT's Definition 1, verified at that
PDF instead and found VERBATIM in one bullet and DIFFERS by one elided clause in
the other; item 3 finds the word "twin" appears **zero times** in every version
of Kalmynin–Konyagin, and the calibration that matters is the opposite of the
one expected — they publish an Erdős–Rankin construction that deletes **two or
more residue classes per prime** and run a dimension-2 Mertens ledger to do it,
which `research/two-class-lower-bounds.md` §2 rows 3 and 5 still call ABSENT.

---

## 0. Artifacts read, exactly

| # | artifact | how obtained | identity |
|---|---|---|---|
| A | **arXiv:2302.00459v2**, Kalmynin & Konyagin, *A polynomial analogue of Jacobsthal function* | `curl https://arxiv.org/pdf/2302.00459` | PDF 1.4, 12 pages, 148,566 bytes, md5 `b5d7d2a23ffd902415057adebfe430b1`; left-margin stamp `arXiv:2302.00459v2 [math.NT] 3 Dec 2023`. Byte-identical to `.../pdf/2302.00459v2`, so the bare URL serves v2. |
| B | **arXiv:2302.00459v1** | `curl https://arxiv.org/pdf/2302.00459v1` | PDF 1.4, 12 pages, 175,358 bytes, md5 `a5b69587923ce8e5290823ff81aef68b`, stamp `1 Feb 2023`. |
| C | **Published version**, Izvestiya: Mathematics **88**:2 (2024) 225–235 | mathnet.ru full-text endpoint for `im9467`, English version | PDF 1.5, 11 pages + cover, 631,607 bytes, producer `MiKTeX pdfTeX-1.40.24`, created 3 Apr 2024. Header line: `Izvestiya: Mathematics 88:2 225–235 / Izvestiya RAN : Ser. Mat. 88:2 33–43`, `DOI: https://doi.org/10.4213/im9467e`. 2026-09-07 rider: re-fetched, every recorded field matches, md5 `9e7f3c54b1979cdfb505c14b4576c4e0`; the recorded curl now returns a "page does not exist" stub unless a browser User-Agent (`-A "Mozilla/5.0"`) is sent; the Russian-edition endpoint serves an English-body PDF, md5 `871d344ee9cbb53bfc04e631e8bd8040`. Neither copy is retained on disk. Corollary 1's proof text on p. 228 equals arXiv v2's apart from copy-edits (`research/history/reviews-0907/07`). |
| D | **arXiv:1802.07604v4**, Ford, Konyagin, Maynard, Pomerance, Tao, *Long gaps in sieved sets* | `curl https://arxiv.org/pdf/1802.07604v4` | PDF 1.4, 34 pages, stamp `arXiv:1802.07604v4 [math.NT] 19 Sep 2022`. v1, v2, v3 also pulled for the version diff. |

Artifact D was not in the brief. It was fetched because item 1's quote is not in
A, B or C, and the file that carries the quote attributes it to D.

**Version history, from the arXiv abs record:** v1 Wed, 1 Feb 2023 14:03:58 UTC
(9 KB); v2 Sun, 3 Dec 2023 11:00:18 UTC (10 KB). No third version. The abs page
carries **no `journal-ref` field** — the only DOI shown is the DataCite arXiv
DOI `10.48550/arXiv.2302.00459` — which confirms the parenthetical already in
`research/covering-dive.md:130`.

---

## 1. ITEM 1 — `research/two-class-lower-bounds.md:118`

### Verdict

**NOT FOUND in Kalmynin–Konyagin.** The quote is not their Definition 1, not
any of their definitions, and not anywhere in their paper in any version.

**This is a briefing error, not a corpus error.** The file never claims the
quote is Kalmynin–Konyagin's. The section heading two lines above it,
`research/two-class-lower-bounds.md:114`, reads *"What FKMPT's 'one-dimensional'
actually permits"*, and the "Their" of *"Their Definition 1, verbatim"* at
`:116` resolves to the row directly above in the same section's table, `:93`,
which names *FKMPT "Long gaps in sieved sets" … arXiv:1802.07604 **v4**, JEMS 23
(2021) 667-700 + Corrigendum, JEMS 25 (2023) 2483-2485*. So the quote was
correctly attributed all along and the audit was pointed at the wrong PDF.

### The negative, stated precisely (artifacts A, B and C)

Searched case-insensitively across the full extracted text of all three:

| string | v1 | v2 | published |
|---|---|---|---|
| `twin` | 0 | 0 | 0 |
| `dimension` / `one-dimensional` | 0 | 0 | 0 |
| `Definition 1` | 0 | 0 | **1** (see below) |
| `supported` | acknowledgements only | acknowledgements only | acknowledgements only |
| `Mertens` | 1 (Mertens' theorem, in the proof) | 1 | 1 |
| `ρ-supported`, `C_1`, `one-dimensionality` | 0 | 0 | 0 |

The arXiv versions carry **three unnumbered `Definition.` blocks**. The
published version numbers them **Definition 1, 2, 3**, and its Definition 1
(p. 226) is:

> **Definition 1.** Suppose that f (x) ∈ Z[x]. If p is a prime number, denote by
> M_p(f) the maximal number of solutions x ∈ F_p to the equation f(x) = y for
> fixed y ∈ F_p \ {0}. The quantity M(f) is defined as a unique M with
> Σ_{p⩽X} M_p(f)/p = M ln ln X + O(1) for all real X ⩾ 2, if such a number M
> exists.

That is a definition of the average maximal-fibre size, not of a sieving
system's dimension. There is no overlap with the quoted text.

### Verified instead at artifact D, which is what the file cites

FKMPT v4, **Definition 1 (Sieving System)**, printed **pages 1–2**, four
bullets: (Non-degeneracy), (B-Boundedness), (One-dimensionality), (ρ-supportedness).

**Bullet 3 — VERBATIM.**

| source (v4, p. 2, eq. (1.2)) | ours (`:118`–`:120`) |
|---|---|
| • (One-dimensionality) We say that the sieving system is one-dimensional if we have the weighted Mertens-type product estimate ∏_{p⩽x}(1 − \|I_p\|/p) ∼ C₁/log x (x → ∞), for some constant C₁ > 0. | **(One-dimensionality)** We say that the sieving system is *one-dimensional* if we have the weighted Mertens-type product estimate `∏_{p<=x}(1 - \|I_p\|/p) ~ C_1/log x` (x → ∞), for some constant `C_1 > 0`. |

Identical word for word. Only the ASCII transliterations (`<=` for ⩽, `~` for ∼,
`C_1` for C₁) and the dropped equation tag `(1.2)` differ, which is
transcription, not text.

**Bullet 4 — DIFFERS, by one elided clause.**

| source (v4, p. 2, eq. (1.3)) | ours (`:121`–`:122`) |
|---|---|
| • (ρ-supportedness) Given ρ > 0, we say that the sieving system **system** is ρ-supported **if the density of primes with \|I_p\| ⩾ 1 equals ρ, that is,** lim_{x→∞} \|{p ⩽ x : \|I_p\| ⩾ 1}\|/(x/log x) = ρ. | **(ρ-supportedness)** Given `ρ > 0`, we say that the sieving system is *ρ-supported* if `lim_{x→∞} \|{p<=x : \|I_p\| >= 1}\| / (x/log x) = ρ`. |

Two marked differences, both silent:

1. **The gloss "if the density of primes with |I_p| ⩾ 1 equals ρ, that is," is
   dropped.** Mathematically it is redundant with the limit that follows, so
   nothing is changed; but the quote is presented as verbatim and is not.
2. **The source's duplicated word "the sieving system system" is silently
   corrected to "the sieving system".** That duplication is a typo present in
   v2, v3 and v4 alike. Correcting a source typo inside a verbatim quote is the
   defensible choice, but it should be marked `[sic]` or bracketed.

**Version note, and it cuts the other way for once.** The elided gloss is
**absent from v2** and was **added in v3**. So our text is a verbatim
reproduction of **v2's** bullet 4 and a lightly-cut reproduction of v4's. The
file cites v4, so the correct fix is to restore the clause, not to re-cite v2.
For completeness, **v1's Definition 1 is a different definition entirely** — it
defines one-dimensionality by a weighted prime number theorem
`Σ_{p⩽x}|I_p| = x/log x + O(x/(log x (log₂ x)²))` and has no ρ-supportedness
bullet at all — so v1 is not a candidate source for our text.

**Third difference, structural.** *"Their Definition 1, verbatim:"* introduces
**two of the four bullets** of Definition 1. The opening sentence ("A sieving
system is a collection I of sets I_p ⊂ Z/pZ of residue classes modulo p for each
prime p. Moreover, we have the following definitions.") and the (Non-degeneracy)
and (B-Boundedness) bullets are not shown. A reader is entitled to read
"Definition 1, verbatim" as the whole definition. This matters here more than
usual, because §2a's argument turns on `B = 2` — the (B-Boundedness) bullet is
the one that licenses `B`, and it is the one omitted.

### Is the surrounding claim supported?

**Yes, and it is supported by the bullets as printed.** The claim built on the
quote at `:130`–`:139` is that two classes per prime on half the primes is
inside a published theorem, via `n² + 1` with `I_p = {ι_p, −ι_p}` for
`p ≡ 1 (mod 4)`, `B = 2`, `ρ = 1/2`. Nothing in the quoted-versus-source
difference touches that: the one-dimensionality bullet is exact, and the elided
gloss on ρ-supportedness is a restatement of the limit, not a further condition.
**SUPPORTED.**

---

## 2. ITEM 2 — `research/covering-dive.md:137`, the displayed bound

### Verdict

**VERBATIM as a derivation.** The displayed line

> `G₂(P(y)) ≫ y (ln y)³ (lll y)² / (ll y)⁴`

is the exact instantiation of Kalmynin–Konyagin's Theorem 1 at
`ℓ_f = 2, h_f = 0, M(f) = 2`. Every exponent and every iterated log is in the
right place. The one substitution is the left-hand side, and the file flags it.

### The source, character by character

**Theorem 1** — artifact A **page 3**, artifact B page 2, artifact C
**page 226**. Identical in all three:

> **Theorem 1.** Suppose that for a polynomial f ∈ Z[x] the factorization of f
> contains ℓ_f distinct linear and h_f distinct non-linear factors. Then for
> y ≥ 19 the inequality
>
> j_f(P(y)) ≫ y(ln y)^{ℓ_f −1} ( (ln ln y)² / ln ln ln y )^{h_f} ( ln y ln ln ln y / (ln ln y)² )^{M(f)}
>
> holds.

The same formula stands in the abstract of all three artifacts, and in the
mathnet abstract of the published paper. **Theorem 1 did not change between
v1, v2 and publication.**

### The arithmetic, checked

At `ℓ_f = 2`, `h_f = 0`, `M(f) = 2`:

```
y (ln y)^{2−1} · [ (ll y)²/lll y ]^0 · [ ln y · lll y / (ll y)² ]^2
  = y · (ln y)^1 · 1 · (ln y)² (lll y)² / (ll y)^4
  = y (ln y)^3 (lll y)^2 / (ll y)^4
```

Exponent of `ln y`: **3**. Exponent of `lll y`: **2**, in the **numerator**.
Exponent of `ll y`: **4**, in the **denominator**. All three match `:137`
exactly. The `h_f` factor, which is the one that would move an `ll y` from
denominator to numerator, is correctly switched off by `h_f = 0`.

### What their bound is actually about, and whether our `G₂` is that object

**Their object.** `j_f(N)`, defined at artifact A **page 2** (published p. 225):

> j_f(N) = max_m {For some x ∈ N the inequality (x + f(i), N) > 1 holds for all
> i ≤ m}.

`P(y)` is the product of all primes p below y, so `P(y)` is our `y#` and
`j_f(P(y))` is a primorial-level quantity, matching our frame.

**Their hypotheses.** f ∈ Z[x] non-constant; `ℓ_f` distinct linear and `h_f`
distinct non-linear irreducible factors in its factorization; `y ≥ 19`; and
`M(f)` as in their Definition (published Definition 1), the unique M with
`Σ_{p≤X} M_p(f)/p = M ln ln X + O(1)`, which their Theorem 2 proves always
exists and is rational.

**Is `f = x(x+2)` admissible, and is `M = 2` right?** Yes to both, and this is
worth stating because it makes the displayed formula *stronger* than the file
presents it. `x(x+2)` has two distinct linear factors and no non-linear ones, so
`ℓ_f = 2`, `h_f = 0`. And `x(x+2) = (x+1)² − 1`, so `f(i) = y` is
`(i+1)² = y+1`, which has 2 solutions for any `y ≠ 0` with `y+1` a non-zero
square; such a `y` exists for every `p ≥ 5`, so `M_p(f) = 2` for all `p ≥ 5` and
`M(f) = 2`. This agrees with their own worked case at artifact A page 2, *"if
f_d(x) = x^d, then M(f_1) = 1 and M(f_2) = M(f_3) = 2"*, and with their
Theorem 3(i), `M(x^d) = τ(d)`.

**So the displayed inequality, with `j_{x(x+2)}(P(y))` on the left, is a
published theorem.** It is not a shape, not a template, and not INFERRED. What
is INFERRED is only the replacement of the left-hand side by `G₂(P(y))`.

**Is our `G₂` the same object? NO, and the file says so correctly.** `G₂` is a
shift of the **argument** — the covering formulation of
`research/two-class-lower-bounds.md` §1 puts the pair `{a_p, a_p − 2}` at every
prime with `a_p` free. `j_f` is a shift of the **value**. The file's one-line
algebra at `:134` is correct as printed: `i(i+2) ≡ −x_p (mod p)` is
`(i+1)² ≡ 1 − x_p`, giving the fibre `{−1 ± √(1−x_p)}`, fixed centre `−1`,
varying separation — against `G₂`'s varying centre and separation fixed at 2.
Two different families of 2-element sets, coinciding only at `x_p = 0`. The
verdict *"one may not 'apply Theorem 1 at f = x(x+2)' and read off a G₂ bound;
the theorem is not about G₂"* is **correct**.

### The construction description at `:136`, checked line by line

Artifact A page 5 (published p. 229), *Proof of Theorem 1*:

| ours (`:136`) | source | verdict |
|---|---|---|
| `p ≤ z₀ = (ln y)^A` with `x_p = 0` | `z0 = (ln y)^A`; "For the first step, let us choose x_p = 0 for p ≤ z0 and for z1 < p < y/2." | VERBATIM |
| `z₀ < p ≤ z₁ = exp(lll y·ln y/(A·ll y))` with a maximal fibre | `z1 = exp( ln ln ln y · ln y / (A ln ln y) )`; "For the second step, let us choose x_p for all z0 < p ≤ z1 as follows: … there is a non-zero y_p ∈ F_p\{0} such that the congruence f(i) ≡ y_p (mod p) has M_p(f) solutions. We set x_p ≡ −y_p (mod p)." | VERBATIM |
| `z₁ < p < y/2` with `x_p = 0` again | same first-step sentence | VERBATIM |
| greedy mop-up on `(y/2, y]` | "Since for the third step we have π(y) − π(y/2) = y/((2+o(1)) ln y) primes p ≤ y left, one can sift one of remaining numbers at a time" | VERBATIM in substance; "greedy" is ours, "one … at a time" is theirs |
| "four-band construction" | the paper says **three steps**, the first of which covers two disjoint prime ranges | fair paraphrase, but the source's own word is "steps" and there are three |

**Corollary 1, quoted at `:139` — VERBATIM.** Artifact A **page 4** (published
p. 228). Ours: *"Suppose that for any p ≤ z the set Ω_p ⊂ Z/pZ contains g(p)
elements. Let S(X, Ω) be the number of n ≤ X such that n mod p ∉ Ω_p for all
p ≤ z. Then S(X, Ω) ≪ X V(z)"*. Source, arXiv v2: *"Corollary 1. Let κ, z, g(d),
V (z) and X be as above. Suppose that for any p ≤ z the set Ω_p ⊂ Z/pZ contains
g(p) elements. Let S(X, Ω) be the number of n ≤ X such that n mod p ∉ Ω_p for
all p ≤ z. Then S(X, Ω) ≪ XV (z)."* Word for word from "Suppose". The published
version adds copy-editor commas ("Suppose that, for any p ⩽ z, the set …"), so
ours matches the **arXiv v2** text the file cites, which is the right one.

**"Let g(p) = |Ω_p|" — VERBATIM.** Artifact A **page 6** (published p. 230),
inside the proof of Theorem 1: *"We will now apply Corollary 1 to estimate
S(m, Ω). Let g(p) = |Ω_p|."*

**"Cases 1–3 (§2) are stated in terms of the linear and non-linear irreducible
factors of f and of the condition f(i) ≡ y_p" — SUPPORTED.** Artifact A
page 6: Case 1 is "k(i) is divisible by p for some linear factor k(x) of f";
Case 2 is "for some irreducible non-linear factor q(x) of f(x) we have
q(i) ≡ 0 (mod p)"; Case 3 is "z₀ < p ≤ z₁ and f(i) ≡ y_p". Exactly as described.

**"when m has grown to y(ln y)³" — SUPPORTED.** Their `m` is
`(y/B)(ln y)^{ℓ_f−1}((ll y)²/lll y)^{h_f}(ln y lll y/(ll y)²)^{M(f)}`, which at
`ℓ_f = 2, h_f = 0, M = 2` is `y(ln y)³(lll y)²/(ll y)⁴`, and their smoothness
step is stated with `k(i) ≪ m ≪ y(ln y)^{ℓ_f + M(f)}`, i.e. `y(ln y)⁴` in this
case. The identified pressure point is real.

### Is the surrounding claim supported?

**Yes, and it is if anything under-claimed. SUPPORTED.** The `[INFERRED — not a
theorem, and not written out as a proof anywhere]` tag, the "Do not quote that
as proven", and the named unchecked step (re-deriving the Case 1–3 trichotomy
for an arbitrary 2-element `Ω_p`) are all correct and correctly placed. Two
refinements a future editor may want, neither of which is an error:

- The displayed inequality **is** a theorem of theirs with `j_{x(x+2)}(P(y))` in
  place of `G₂(P(y))`. Only the left-hand side is inferred. Saying "Theorem 1's
  shape reads" undersells what is actually on the page.
- The parenthetical *"`a_p ∉ {0, 2, −2}` in band 2"* is the right adaptation and
  the source explains why: K–K get disjointness of `Ω^I_p`, `Ω^II_p`, `Ω^III_p`
  for free from "any two fixed irreducible polynomials have no common roots
  modulo large enough primes" (artifact A p. 6), which a substituted arbitrary
  pair does not inherit. That excluded set is doing the work their irreducibility
  argument does, and it is worth one sentence saying so.

---

## 3. ITEM 3 — two residue classes per prime, twin primes, difference-2

### The negative, and it is total

**"twin" occurs zero times** in artifact A, artifact B and artifact C. So do
"difference 2", "two classes", "two residue", "prime pair", "constellation",
"k-tuple", "dimension" and "one-dimensional". The bibliography contains no
twin-prime, prime-tuple or Hardy–Littlewood reference; its nine entries are
FGKMT *Long gaps between primes*, Iwaniec *On the problem of Jacobsthal*, Rankin,
Dietmann–Elsholtz–Kalmynin–Konyagin–Maynard *Longer Gaps Between Values of
Binary Quadratic Forms*, Halberstam–Richert, Lagarias–Odlyzko,
Birch–Swinnerton-Dyer, Serre, Hilbert. Their stated motivation (artifact A p. 3)
is sums of two squares: *"Our study of j_f is motivated by Theorem 5 of the work
[4]. This result gives an upper bound for the least integer γ_k > 0 such that
all the numbers γ_k + j^d for 1 ≤ j ≤ k are not sums of two squares."*
Their only application corollary, Corollary 2 (artifact A p. 11, published
p. 234), is about `Ω(n + f(m)) > A(n)`, the number of prime factors — not twins.

**So on the narrow question the corpus asks — is `G₂`, the difference-2 covering
object, in this paper? — the answer is NO, and no sentence of the paper is
about it.**

### But the paper is full of two-classes-per-prime, and that is the calibration

The corpus's absence claims about the two-class object need splitting into two
claims that the corpus currently runs together. Quoting what is actually there:

**(a) Their construction removes ≥ 2 residues per prime, by design, and `M(f)`
is exactly the average count.** Abstract (artifact A p. 1, identical in the
published abstract): *"M(f) is the average size of the maximal preimage of a
point under a map f : F_p → F_p."* Body (p. 2): *"a number M(f), which one can
call an average size of the maximal preimage of a non-zero point under a map
f : F_p → F_p."* The corpus's gloss at `research/covering-dive.md:130`, *"is
exactly the average number of classes deleted per prime"*, is accurate.

**(b) Their sieve input is class-count-agnostic, so nothing in it prefers one
class.** Corollary 1 (p. 4) takes an arbitrary `Ω_p ⊂ Z/pZ` and sees it **only**
through `g(p) = |Ω_p|`. Lemma 1's hypothesis is `g(p) ≤ κ, g(p) < p`, and they
apply it at `κ = 3d`, `d = deg f`: *"notice that all three parts of Ω_p contain
at most d = deg f elements, hence Corollary is applicable for κ = 3d"* (p. 6).

**(c) A fixed pair at difference 2 literally appears inside their proof, without
being named as such.** `Ω^I_p` is defined (p. 6) as *"all residues t mod p such
that k(t) ≡ 0 (mod p) for some linear factor k(x) of f"*, with `|Ω^I_p| = ℓ_f`
for `p > p₀`. At `f = x(x+2)` that set is `{0, −2} mod p`, for every prime — the
twin-prime sieving system of FKMPT's Remark 7 — and it is exactly what their
first step deletes by choosing `x_p = 0`. They never remark on it.

**(d) The dimension-2 Mertens ledger is run, and published.** Their survivor
estimate (pp. 6–7) is
`S(m,Ω) ≪ m ∏_{p≤√y}(1 − g(p)/p) ≪ m exp(−Σ_{p≤√y} g(p)/p)` with the ledger
split into three sums, evaluated as `ℓ_f ln ln y + O(1)` by Mertens, plus
`h_f(ln ln y − ln ln z₁ + ln ln z₀) + O(1)` by their Lemma 2, plus
`M(f)(ln ln z₁ − ln ln z₀) + O(1)`. At `ℓ_f = 2` the leading term is
`2 ln ln y`, so the sieve is **two-dimensional in exactly the Mertens-product
sense** and the survivor density carries `(ln y)^{−2}`.

### What this does to our absence claims

| corpus claim | where | calibration after reading the PDF |
|---|---|---|
| "no Erdős–Rankin construction has been *written down* for G₂" | `research/covering-dive.md:130` | **STANDS.** `G₂` itself is untouched by them. |
| "lower-bound construction for a 2-dimensional sieved set — **ABSENT**" | `research/two-class-lower-bounds.md:95`, §2 row 3 | **OVER-CLAIMED.** K–K's `f = x(x+2)` instance is a published lower-bound construction whose sieved set is two-dimensional in the Mertens sense, ledger and all. What is absent is a construction for the *free-translate* pair `{a_p, a_p−2}`, i.e. for `G₂`. |
| "the same accounting run in dimension 2 — **ABSENT**; done for the first time in §4 here" | `research/two-class-lower-bounds.md:96`, §2 row 5 | **OVER-CLAIMED.** The `Σ g(p)/p` ledger of §4b, three-band structure and all, is K–K's published proof at `ℓ_f = 2, M = 2`. The Maier–Pomerance multi-kill row of our §4b is genuinely not in K–K; the Rankin base and the survivor-density row are. |
| "two-class Rankin adaptation (INFERRED, ours)" | `research/two-class-lower-bounds.md:243` §4b | **NEEDS A CITATION, not a retraction.** §4b's Stage 1 (small primes at `I_p = {0,−2}`, dimension-2 upper-bound sieve) and Stage 2 (one survivor per remaining prime) are K–K's steps 1 and 3. Our §4b lands at `x(log x)²·lllx/llx`; K–K's published theorem at the same `ℓ_f, M` lands one log higher, at `y(ln y)³(lll y)²/(ll y)⁴`. |

**The mechanical fact behind all four rows: `research/two-class-lower-bounds.md`
contains zero occurrences of "Kalmynin".** `research/covering-dive.md:139`
records the handback explicitly — *"That belongs to
`research/two-class-lower-bounds.md` §4b and §6 and is handed back rather than
edited from here"* — and the handback has not landed. Reported, not acted on,
per the brief.

---

## 4. Incidental findings, from reading item 1's quote in its full context

Neither is in the brief. Both were visible in the artifact D pages that item 1
required.

1. **`research/two-class-lower-bounds.md:157` mis-locates a quote's section.**
   The smooth-numbers quote is introduced as *"the structural reason, from their
   §1.3, verbatim"*. The text itself is **VERBATIM** — artifact D, §1.1
   "Comparisons of methods", printed **page 7**: *"bounds for smooth numbers
   cannot be used to show that S_{z,x} contains an interval with unusually few
   elements. Without this crucial step the existing methods only yield the
   trivial lower bound of ≫ x for the gap size."* But **there is no §1.3** in
   v2, v3 or v4; section 1 has exactly two subsections, 1.1 and 1.2. The section
   pointer should read §1.1.

2. **`research/two-class-lower-bounds.md:145` Remark 7 quote — VERBATIM,
   confirmed.** Artifact D printed **page 7**. Checked word for word including
   the bracketed reference `[7, Cor. 2.4.1]` and `≫ log² X`. The one ellipsis in
   our version elides *"(or between the largest such twin prime and X)"*, which
   is marked with `...` as it should be. No defect.

---

## 5. What was NOT verified

- **MR 4727548 and Zbl 07838021** for the published paper. MathSciNet and zbMATH
  are behind authentication from here. The journal reference itself — Izv. Math.
  88:2 (2024) 225–235, DOI 10.4213/im9467e — is confirmed from the publisher's
  own PDF header, artifact C.
- **The Russian-language version**, Izv. RAN Ser. Mat. 88:2, 33–43. Only the
  English translation was pulled.
- **The JEMS published version of FKMPT** and its corrigendum, JEMS 25 (2023)
  2483–2485. Only arXiv v1–v4 were read. The `C(ρ) > e^{−1−6/ρ}` and
  `C(1/2) > 1/325565` figures at `research/two-class-lower-bounds.md:124`–`:136`
  were outside the brief and are not re-verified here.
- **Everything in `research/covering-dive.md` other than the K–K bullet.** The
  Klein–Koukoulopoulos–Lemieux, Cummings–Filaseta–Trifonov,
  Crittenden–Vanden Eynden and BBMST items were not opened on this pass.

---

## 6. Reproduction

```
curl -sSL -o kk_v2.pdf https://arxiv.org/pdf/2302.00459        # md5 b5d7d2a23ffd902415057adebfe430b1
curl -sSL -o kk_v1.pdf https://arxiv.org/pdf/2302.00459v1      # md5 a5b69587923ce8e5290823ff81aef68b
curl -sSL -e https://www.mathnet.ru/eng/im9467 -o izv.pdf \
  "https://www.mathnet.ru/php/getFT.phtml?jrnid=im&paperid=9467&what=fullteng&option_lang=eng"
curl -sSL -o fkmpt_v4.pdf https://arxiv.org/pdf/1802.07604v4
pdftotext -layout kk_v2.pdf -                                  # and each of the others
```

`node research/qc.js` run before and after this file was written: **0 findings
across 8 checks** both times.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed by document.*
