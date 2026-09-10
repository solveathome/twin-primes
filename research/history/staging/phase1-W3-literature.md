# Phase 1, W3: four literature targets

<!-- ledger
id: Q-W3-literature
status: ANSWERED
todo: none
question: What do the four literature targets give: the Omega(kappa, L) quantifier, the Kalmynin-Konyagin transfer, Erdos-Ruzsa 1980, and the two-class upper bound?
verdict: The quantifier is over all pairs, confirmed verbatim in two independent sources, and every page and section citation in beta2-note checks out; the higher-consequence find is that covering-dive's stated reason for dismissing Kalmynin-Konyagin is false, since the proof only sees the size of Omega_p, and the two-class upper bound survives a second independent attempt as ABSENT.
-->

*(2026-08-18. Read-only pass over primary sources. Calibration marked
throughout: VERIFIED at source, INFERRED, ABSENT (searched and not found).)*

**Headline, one sentence.** The Ω(κ,L) quantifier that attack 5 rests on is
correct — it is over **all** pairs, confirmed verbatim in two independent
sources that cite the Diamond–Halberstam book itself, and every page and
section number in `paper/beta2-note.md` checks out against the book's own
contents page and notation index; but the higher-consequence find is Target 2,
where **`research/covering-dive.md`'s reason for dismissing Kalmynin–Konyagin
is wrong**, and their construction does transfer to G₂.

Ranked by consequence: **T2 (changes a written verdict) > T1 (confirms the
load-bearing item, and finds one internal contradiction) > T3 (names a $1000
neighbour and a 46-year-old open problem for the block requirement) > T4
(survives a second, independent attempt)**. T1 is second only because its
verdict is "unchanged".

---

## 1. TARGET 2 — Kalmynin–Konyagin DOES transfer, and the stated reason it does not is false

**Source, read in full:** A. Kalmynin, S. Konyagin, *A polynomial analogue of
Jacobsthal function*, **arXiv:2302.00459v2**, stamped `3 Dec 2023`
(<https://arxiv.org/abs/2302.00459>); Izvestiya: Mathematics **88**:2 (2024)
225–235, DOI 10.4213/im9467e. All three sections read from the PDF.

### 1a. The blocking claim in this repo, quoted

`research/covering-dive.md:130` (and `:160`, `:168`):

> "their two classes are a *varying* fibre f^{-1}(−x_p), whereas our system
> I_p = {0, −2} is a **fixed pair the same for every p** and is not of the form
> x + f(i), so **no Erdős–Rankin construction for the fixed pair {0, −2}
> exists**."

That sentence is about the wrong object. `research/two-class-lower-bounds.md`
§1 **proves** (elementary, CRT) that

> "`G2(x#) - 1` equals the maximum length of an interval `[1,m]` that can be
> covered by choosing, for each prime `p <= x`, the residue pair
> `{a_p, a_p - 2} mod p`."

The pair is a **free translate**, one free parameter per prime. `I_p = {0,−2}`
fixed for every p is the *sifting* picture of twin primes (FKMPT Remark 7), not
the *covering* picture that defines G₂. The two files disagree, and §1 of
`two-class-lower-bounds.md` is the one with a proof. **[the covering-dive
dismissal is REFUTED]**

### 1b. (a) Does the construction transfer? Yes, because the proof only sees |Ω_p|

Their proof (§2) is three bands plus a greedy mop-up, all four steps stated
purely in terms of sets Ω_p ⊆ Z/p:

| band | K–K choice | size | the G₂ analogue |
|---|---|---|---|
| p ≤ z₀ = (ln y)^A | x_p = 0, so Ω_p = roots of f | ℓ_f | a_p = 0, Ω_p = {0,−2}, size 2 |
| z₀ < p ≤ z₁ = exp(lll y·ln y/(A ll y)) | x_p = −y_p with y_p ≠ 0 chosen to make the fibre maximal | M_p(f) | any a_p ∉ {0, 2, −2}; size 2, disjoint from {0,−2} |
| z₁ < p < y/2 | x_p = 0 again | ℓ_f | a_p = 0 again |
| y/2 < p ≤ y | greedy, ≥ 1 survivor per prime | — | identical |

The counting is their Corollary 1, which bounds `S(m,Ω) ≪ m ∏_{p≤√y}(1 −
g(p)/p)` with **g(p) = |Ω_p|** and nothing else about Ω_p; and their Cases 1–3
dichotomy ("either k(i) = ±p, or |k(i)| is z₁-smooth, or i was already sifted")
uses only that the outer bands sift the roots of the linear factors. Nothing in
the proof looks at the *shape* of the middle-band set. A translate pair
{a, a−2} and a K–K fibre f^{-1}(y_p) are different families of 2-element sets,
but both have two elements, both contain {0,−2}, and both can avoid {0,−2}.

Applying their Theorem 1 to **f(x) = x(x+2)** — ℓ_f = 2, h_f = 0, and
M(x(x+2)) = 2 because x(x+2) = (x+1)²−1 so the fibre over y ≠ 0 has the two
roots of (x+1)² = 1+y — gives

  j_f(P(y)) ≫ y (ln y)^{ℓ_f −1} (ln y·lll y/(ll y)²)^{M(f)}
            = **y (ln y)³ (lll y)² / (ll y)⁴**,

and the band-by-band table above reproduces the same bound for **G₂(P(y))**.
Sanity check that the machine is right: ℓ = 1, M = 1 (f = x, the classical
case) returns y·ln y·lll y/(ll y)², which is exactly Rankin 1938. So K–K is
Rankin-level, not FGKMT-level, and the M(f) exponent squares the Rankin factor.

**Consequence for `two-class-lower-bounds.md` §4b.** That section's "honest
analogue" is `G2(x#) >> x (log x)² lll x / ll x`, tagged INFERRED and reached by
*stacking* one extra log onto the one-class record. The band accounting above
says the two-class Rankin exponent is **3 logs, not 2**: the outer bands force
*both* i and i+2 to be prime-or-smooth (that is the (ln y)^{ℓ−1} with ℓ = 2)
*and* the middle band squares the Rankin factor (that is the exponent M = 2).
§4b squares one of the two and stacks the other. Their own §4b table reaches
exponent 3 as well — but lists it as **CONJ**, contingent on Maier–Pomerance.
The reading here is that **exponent 3 is reachable unconditionally at
Rankin quality**, i.e. `G2(x#) ≫ x(log x)³(lllog x)²/(llog x)⁴`.
**[INFERRED — mine, from a published theorem plus a mechanical change of Ω_p;
not yet written out as a proof. This is the item most worth an adjudicator's
hour.]**

Two things this does **not** disturb: `x(log x)³ ≪ x²`, so the Zone Postulate is
still safe against the construction side; and the ordering versus the current
record is asymptotic only — at x = 4001 the new form is numerically *smaller*
than §4b's, so no measured curve moves.

The check that would confirm or kill it: re-run K–K §2 line by line with
Ω_p = {a_p, a_p−2}, and verify in particular that their "Case 1" smoothness
dichotomy survives with the two linear factors i and i+2 (their A-is-large
argument needs z₀·(y/2) > m, and m has grown to y(ln y)³, so A > 3 suffices).

### 1c. (b) M(f) = τ(d) versus M(x²) = 2 — consistent, VERIFIED

Their Theorem 3(i), §3: "We have M(x^d) = τ(d), where τ(d) is the divisor
function", proved via M_p(x^d) = (p−1, d) and Σ_{d₁|d} 1 = τ(d). Their
introduction states independently "M(f₁) = 1 and M(f₂) = M(f₃) = 2". τ(2) = 2.
**No conflict; M(x²) = 2 as this repo has it.** **[VERIFIED at source]**

### 1d. (c) What the method gives on a restricted alphabet (v, v²] — nothing

All three of their gain-producing bands live **below y^{o(1)}**:
z₀ = (ln y)^A and z₁ = exp(lll y·ln y/(A ll y)) = y^{lll y/(A ll y)}. With
y = v², the alphabet (v, v²] = (y^{1/2}, y] contains **none** of them; only the
mop-up band (y/2, y] survives, and greedy mop-up alone is the trivial capacity
count. So the Erdős–Rankin/K–K mechanism is entirely a small-prime phenomenon
and range restriction deletes it. This is the construction-side mirror of the
block campaign's sieve-side conclusion: the restriction buys nothing on the
upper-bound side and costs everything on the lower-bound side. **[INFERRED,
one line from their band definitions]**

### 1e. (d) Techniques worth importing

1. **Their Corollary 1** — an explicit CRT re-indexing that turns "count n ≤ X
   avoiding an *arbitrary* set Ω_p mod each p" into a plain divisibility sieve,
   so the fundamental lemma applies with g(p) = |Ω_p|. This repo already quotes
   it (`research/history/staging/qc-wave6-X.md:109`) but has not used it; it is
   the exact tool for any two-class survivor count.
2. **The four-band template with the arithmetic of the mop-up written out**
   (`R ≤ y/(3 ln y)` against `π(y) − π(y/2) ~ y/(2 ln y)` — note the factor-2
   slack they carry, and that they get it by choosing B large rather than by
   optimising).
3. **Remark 1's shift invariance** j_f = j_{f+n}: the object depends on f only
   up to an affine change, which is why x(x+2) and x² are the same problem for
   M but not for ℓ.

---

## 2. TARGET 1 — the Ω(κ,L) quantifier: attack 5 is right

**Verdict: the condition is quantified over ALL pairs, not averaged. Attack 5's
argument stands.** Confirmed at two independent sources, both citing the book.

**Source A, verbatim, citing [7] = the DH book, Ch. 11.1.** D. R. Johnston and
S. N. Thomas, *The sum of a prime power and an almost prime*,
**arXiv:2503.04045v3, 14 May 2025** (<https://arxiv.org/abs/2503.04045>), §2.3,
p. 6:

> ∏_{z₁ ≤ p < z₂, p ∈ P} (1 − g(p)/p)^{−1} < (log z₂/log z₁)^κ {1 + L/log z₁},
> **for z₂ > z₁ ≥ 2.**   (Ω(κ, L))
> "Here, L > 0 and κ is called the dimension of the sieve."

Their reference [7] is verbatim "H. G. Diamond, H. Halberstam, and W. F.
Galway. *A Higher-Dimensional Sieve Method: with Procedures for Computing Sieve
Functions*. Cambridge University Press, New York, 2008."

**Source B, an independent formulation.** K. Ford, *Sieve methods lecture notes,
Spring 2023*, <https://ford126.web.illinois.edu/sieve2023.pdf>, p. 18:

> ∏_{y ≤ p ≤ w} (1 − g(p))^{−1} ≤ (log w/log y)^κ exp(B/log y)   **(2 ≤ y ≤ w ≤ z)**
> … "Although B, κ are not uniquely defined by (Ω), **the smallest admissible
> value of κ (with B remaining bounded)** is sometimes referred to as the
> 'dimension' or 'sifting density'."

Ford's parenthesis is the exact statement attack 5 needs and marks [INFERRED]:
κ is the smallest value admissible **at every pair with a bounded constant**,
so a κ that only works by letting the constant grow with v is not a κ.

**Bonus that strengthens the block case.** Johnston–Thomas's product is
restricted to **p ∈ P**, the sifting set. The book itself licenses this: eq.
(1.3), p. 4, read verbatim from the publisher's own preview PDF, is
`0 < ω(p) < p (p ∈ P), ω(p) = 0 (p ∉ P)`. So a block sieve whose ω vanishes
below v is inside the book's own formalism, and the pair (w₁, w) = (v, v²) is
inside the block's range, so the forcing κ ≥ 2 happens exactly where attack 5
puts it. Checking the other pairs: (2, v) gives an empty product, (2, v²) gives
LHS < 4 against an enormous RHS, and (v^a, v^b) for 1 ≤ a < b ≤ 2 gives
(b/a)² on both sides. So the block satisfies Ω(2, L) with bounded L and κ = 2
is the smallest such. **[VERIFIED]**

### 2a. Every page and section citation in `beta2-note.md` checks out

From the book's own front matter — the publisher preview PDF at
`https://api.pageplace.de/preview/DT0400.9780511434365_A23678332/preview-9780511434365_A23678332.pdf`
(29 pp., Cambridge/Kobo, contents pages + notation index + pp. 3–5):

| the note's claim | the book's own contents / notation index |
|---|---|
| §1.4 "The Ω(κ) condition", p. 8 | contents: "1.4 The Ω(κ) condition … 8" ✓ |
| Definition 1.3, p. 8, constant A | notation, *Constants/parameters*: "κ, A — p. 8 Definition 1.3" ✓ |
| §1.3 "Prime g-tuples", Example 1.2 pp. 7–8 | contents: "1.3 Prime g-tuples … 6" ✓ |
| product form at p. 44 | notation, *Basic conditions*: **"Ω*(κ) — p. 44"** — a **starred** variant, see below |
| Theorem 6.1, p. 67; α_κ, β_κ | contents "6.1 Statement of the main analytic theorem … 67"; notation "F_κ(u), f_κ(u) — pp. 67 Theorem 6.1" and "α_κ, β_κ — p. 67 Theorem 6.1" ✓ |
| β₂ ≈ 4.266 at p. 79, §6.5 Notes | contents: "6.5 Notes on Chapter 6 … 79" ✓ — a Notes section, so a forward reference to Theorem 9.1 is ordinary |
| Theorem 9.1 at pp. 103ff | contents: "9 A sieve method for κ > 1 … 103", "9.1 The main theorem and start of the proof … 103" ✓ |
| Ch. 11 weighted sieve, additional conditions | contents "11.1 Introduction and additional conditions … 135" — and that is exactly the "[7, Chapter 11.1]" Johnston–Thomas cite for Ω(κ,L) ✓ |

**One correction.** `beta2-note.md:12` calls the p. 44 object "Ω(κ) working
product form (5.2), p. 44". The book's notation index lists it under *Basic
conditions* as **Ω\*(κ)** — a starred condition distinct from the Ω(κ) of
Definition 1.3. (OCR of the index renders Ω as "O"/"n", so read this as
high-but-not-certain; the *entry* is unambiguous, the *glyph* is not.)

### 2b. The internal contradiction to fix

`paper/beta2-note.md` says both of these:

- header, `:14-15` — "(Formal Ω(κ) = Definition 1.3, Ch. 1, **not photographed**;
  the product restatement we actually use IS captured.)"
- §6.1, `:247-249` — "the formal **Ω(κ) condition, Definition 1.3, eq. (1.5),
  p. 8** — ∏_{w₁≤p<w}(1−ω(p)/p)⁻¹ ≤ (log w/log w₁)^κ(1+A/log w₁)…"

and the same header opens with "all content read directly from the
Diamond–Halberstam book". One of those is wrong. The p. 8 statement in §6.1
matches the two secondary sources above in every respect except that it omits
the quantifier `(2 ≤ w₁ < w)` that both of them carry — and the quantifier is
the load-bearing part. **Recommend: add the quantifier explicitly to §6.1,
cite Johnston–Thomas v3 §2.3 and Ford p. 18 alongside the page-8 reference, and
delete whichever of the two "photographed / not photographed" clauses is false.**

### 2c. The "DH p. 79 gives only the trivial bound" claim — structurally sound, text not reached

p. 79 is §6.5, Notes on Chapter 6, confirmed from the contents page. Franze
(arXiv:1012.3809, p. 1) states the same mechanism independently — "An important
parameter in a sieve is the sifting limit β_κ, **beyond which the lower bound
sieve yields a positive lower bound**" — and confirms the book's Ch. 17 gives
β_κ ≲ 2.44κ, which `covering-dive.md` already cites. The *quoted sentence* on
p. 79 was not reached. **[the mechanism VERIFIED independently; the verbatim
p. 79 wording NOT reached — see COVERAGE]**

---

## 3. TARGET 3 — Erdős–Ruzsa 1980, and Erdős #688

**Erdős–Ruzsa read in full.** P. Erdős and I. Z. Ruzsa, *On the small sieve. I.
Sifting by primes*, **J. Number Theory 12 (1980) 385–394**, free at
<https://static.renyi.hu/~p_erdos/1980-29.pdf>.

Two items partly overturn "the range-restricted covering variant is unstudied":

1. **Their Problem 2, p. 386, verbatim** — "What happens if we sift by other
   residue classes? Suppose p₁,…,p_k < x are primes with sum of reciprocals
   ≤ K and to each p_i corresponds a residue class a_i (mod p_i). Is it true
   that the number of natural numbers n < x satisfying n ≢ a_i (mod p_i) for
   all i is at least cx, c = c(K) > 0?" That is the one-class covering question
   with a bounded reciprocal-sum alphabet, posed in 1980 and still open; it is
   the converse of **Erdős #1200**.
2. **Their Theorem 2 is itself a range-restricted theorem** — if A ⊆ [2, x^{1−δ}]
   with Σ1/a ≤ K then F(x,A) > c₁ δ e^{−K} x. And their §1 says in print that
   "the sieves of Brun and Selberg give this result only if the sifting primes
   all lie below x^a, a < 1". Their **Problem 1** asks whether the extremal
   sifting set is the *top range* (x e^{−K}, x). So range restriction is an
   explicit theme of the paper. But everything proved there is **class 0 only**
   (divisibility); the arbitrary-class version is exactly the Problem 2 that is
   still open.

**The number that makes this bite.** Σ_{v<p≤v²} 1/p → ln 2 = 0.693, and with two
classes Σ 2/p → 2 ln 2 = 1.386 — **bounded**. So the block's alphabet is a
bounded-reciprocal-sum alphabet in exactly Erdős–Ruzsa's sense, and the block
covering requirement is a two-class instance of Erdős #1200 / #688. For the
one-class version, Erdős–Ruzsa Theorem 1 proves a positive proportion always
survives when the alphabet is *primes with class 0*, and Problem 2 (arbitrary
classes) is open. **[VERIFIED at source]**

**Erdős #688, fetched 2026-08-18** (<https://www.erdosproblems.com/688>, page
last edited **07 April 2026**):

- **Still OPEN. 0 comments, 0 claimed proofs. No prize attached.** Nothing has
  moved.
- Only known partial result, verbatim: "Erdős could prove ε_n ≫ log log log n /
  log log n."
- Sources [Er79d], [Er80, p.106]. Cross-refs [687], [689], [1200].
- **The neighbour with the money is #687**, not #688: Y(x) = the same covering
  with *all* primes p ≤ x, carrying **$1000** ("I offer the maximum of $1000
  dollars and 1/2 my total savings"). Best upper bound Y(x) ≪ x² (Iwaniec 1978);
  best lower Y(x) ≫ x log x lll x / ll x (FGKMT); Maier–Pomerance conjecture
  Y(x) ≪ x(log x)^{2+o(1)}.
- **#1200** records that Erdős called the Erdős–Ruzsa bounded-Σ1/p covering
  conjecture "surprising", and that "certainly proving ε_n ≥ c would prove this
  conjecture (taking P to be all primes in [x^c, x])".
- Incidental: **#689** (cover every integer *twice*) shows **30 comments and 1
  claimed proof** — the only one of the four with any activity. Not our problem,
  but worth knowing before anyone cites #689 as quiet.

**Consequence.** The block ladder at ε = 1/2 needs, in its one-class shadow,
ε_n ≥ 1/2 where the record is ε_n ≫ lll n/ll n and Erdős's own question is
whether ε_n = o(1). That is corroboration of the closed block verdict, from a
direction the campaign did not use: a named, 46-year-old, still-open problem
with a $1000 sibling.

---

## 4. TARGET 4 — the two-class upper bound survives a second, independent attempt

`research/covering-dive.md:61-69` already ran the citation-graph attack (all 82
citers of Iwaniec 1978), a zbMATH `ti: Jacobsthal` sweep and an arXiv
title/abstract sweep. This pass deliberately used **different entry points**.

**Calibration first (trap 6).** Two queries with known positives, both hit:
`all:"polynomial analogue of Jacobsthal"` on the arXiv API returns exactly
2302.00459v2; `all:"Jacobsthal function"` returns 17 records including
Ziller–Morack 1611.03310, Ziller 1903.11973 and 2007.01808, and K–K. The
search stack works.

**New direction 1 — the citation graph of FKMPT, which had not been run.** The
repo's line says "citation graphs of Iwaniec 1978 / Ziller–Morack / **FGKMT**".
FKMPT (*Long gaps in sieved sets*, arXiv:1802.07604) is a different paper and
is the natural home for |I_p| = 2. OpenAlex W2788886212 + its corrigendum
W4368341456 have **4 distinct citers in total**: *Longer Gaps Between Values of
Binary Quadratic Forms* (IMRN 2022), *Prime avoiding numbers form a basis of
order 2* (Sb. Math. 2024, both language versions), *Long strings of consecutive
composite values of polynomials* (Trans. AMS 2024). None states a multi-class
Jacobsthal upper bound. Also checked: Ziller–Morack 1706.00317 has exactly
**1** citer (its own companion note), and Banks–Ford–Tao *Large prime gaps and
probabilistic models* has 7+3, none relevant.

**New direction 2 — search by the object, four more vocabularies, all empty.**
arXiv API: `all:"Jacobsthal" AND all:"k-tuple"` → 0;
`abs:"residue classes" AND abs:"largest gap" AND abs:"primorial"` → 0;
`all:"two residue classes" AND all:"each prime"` → 0;
`abs:"twin prime" AND abs:"Jacobsthal"` → 0; `all:"sifted set" AND all:"gap"`
→ 1, which is FKMPT itself. Web queries in the "prime k-tuple candidates /
admissible / largest gap", "consecutive integers none coprime to n and n+2 /
primorial" and Russian ("функция Якобсталя") vocabularies returned only the
one-class line already in the corpus.

**Verdict: ABSENT, confidence stays HIGH; a second independent attempt did not
move it.** What would still be needed to be sure, and a referee will ask:

1. **The four unsearchable books.** Unchanged and unreachable here:
   Diamond–Halberstam–Galway Ch. 10, Greaves *Sieves in Number Theory*,
   Halberstam–Richert, Holt *Patterns among the Primes*. If the claim is wrong
   it is wrong inside one of those, as an unnumbered remark.
2. **A full-text index, not a title/abstract index.** Every sweep run here and
   in `covering-dive.md` searches titles, abstracts and citation graphs.
   Nobody has run a genuine full-text search (Google Scholar full text,
   MathSciNet full text, or arXiv bulk full text) for the *statement*
   "j ≪ (log N)^C for two classes per prime". That is the single remaining
   cheap-and-decisive check.
3. **A direct question to a specialist.** Konyagin is the sharpest available
   point and he is alive and publishing; K–K state only the κ = 1 upper bound
   and prove none for their own j_f.

Note the asymmetry the referee will actually attack: **the upper bound is
plausibly first, the lower bound is not**, because §1 above shows K–K's
published theorem covers the multi-class Rankin construction and only needs a
change of Ω_p to reach G₂.

---

## COVERAGE — what was not reached, and where this is most likely wrong

**Not reached.**
- **The text of DH Definition 1.3 itself.** The publisher preview stops at p. 5;
  archive.org's scan (`higherdimensiona0000diam`) is a print-disabled lending
  item and its search-inside endpoints return "Item not available"; HathiTrust
  returned 403; zbMATH is behind a JS challenge; Google Books returned a
  redirect shell. What I have is the book's own contents page and notation
  index (primary, and they confirm every location), plus two independent
  verbatim statements of the condition from works citing the book. **The
  quantifier is verified; the page-8 glyphs are not.**
- **The verbatim p. 79 sentence.** Structure confirmed, wording not.
- **Erdős #689's claimed proof.** 30 comments, 1 claim; not read.

**Suspected but not proved.**
- The §1 transfer of K–K to G₂ is my own reading of their proof, not a written
  argument. I believe it is right and I have checked each of their four steps
  against the {a_p, a_p−2} family, but it is exactly the kind of "mechanical
  adaptation" that hides a condition. **If one thing in this file is wrong, it
  is most likely this.** The specific place to look: whether the middle-band
  choice a_p can always be made simultaneously (i) disjoint from {0,−2} and
  (ii) genuinely two classes, at every p in (z₀, z₁] — I claim yes for p ≥ 5,
  but I have not checked whether their Corollary 1 needs the Ω_p to be
  independent across p in any stronger sense.
- The two-class Rankin exponent 3 versus `two-class-lower-bounds.md` §4b's 2. I
  located the discrepancy (§4b squares the middle band but not the
  outer-band roughness) but did not re-derive §4b's route to see whether it has
  a reason I am missing.

**Where I am most likely wrong overall.** Second most likely after the above:
the reading of the notation-index entry "Ω\*(κ) — p. 44" as a *distinct*
starred condition. That comes off OCR of a scanned index and I did not see the
p. 44 text.
