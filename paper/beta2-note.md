# An upper bound for the twin Jacobsthal function (draft note)

**Contributions to the 27 September revisions:** [Benjaminsen](https://solveathome.org/@Benjaminsen)
provided direction and publication authorization. Codex (AI assistant; exact
model variant not recorded) performed the meta-research, source checks and
edits in these two tasks. Original mathematical sources and earlier project
contributors retain their credit; the [contribution record](../research/RESEARCH-CONTRIBUTIONS-2026-09-27.md)
names the recorded accounts, AI models and revision links. This is not a
claim of sole research authorship by the publishing account.

**Status: THEOREM. The sieve input is verified against the primary source,
no outstanding item on that input (all content read directly from the
Diamond–Halberstam book, Cambridge Tracts 177; screenshots archived); the
constants are inexplicit (§6.4) and the Halberstam–Richert 1974 page is unread
(§2). The formal Ω(κ) condition
(Definition 1.3 / eq. 1.5, p. 8) is captured, and the book's own worked
example (n(n+2), pp. 7–8, "Ω(κ) holds with κ=g") is our density check.
Confirmed line-level:
• Theorem 9.1 (pp. 103–112): remainder weighted exactly
  2·Σ_{m|P(z),m<y} 4^{ν(m)}|r_A(m)| (9.9/9.10); error O((log log y)²/(log
  y)^{1/(2κ+2)}) = exponent 1/6 at κ=2; hypothesis Ω(κ), 2 ≤ z ≤ y, S sifts p<z.
• Ω(κ) = **Definition 1.3, eq. (1.5), p. 8**, "there exist constants κ ≥ 1,
  A > 1 such that ∏_{w₁≤p<w}(1−ω(p)/p)⁻¹ ≤ (log w/log w₁)^κ(1+A/log w₁),
  2 ≤ w₁ < w", the exact product form this note invokes, quantified over all
  pairs, which is the load-bearing part. Restated at p. 44 as (5.2) in terms of
  g, since 1+g(p)=(1−ω(p)/p)⁻¹ by (5.1), p. 43; "Ω(κ) implies ω(p) ≤ κ on
  average" (p. 46), so our ω(p)=2 gives dimension κ=2. (The book's separate
  **Ω\*(κ)** is (5.6), p. 44: the two-sided condition on the topped-up function
  g\* produced by Lemma 5.1, the Topping-Up Lemma. It is not what this note
  uses, and (5.2) is unstarred, p. 44 introduces it as "condition Ω(κ) can be
  restated in the form".)
• Theorem 6.1 (pp. 67–68): the difference-differential system defining F_κ, f_κ;
  α₁=β₁=2, α_κ>β_κ>2 for κ>1; f_κ(u)=0 for 0<u≤β_κ (6.2), f_κ increasing.
• β₂ ≈ 4.266 in print (p. 79, §6.5 Notes): "f_κ(u) > 0 for u > β_κ (β₂ ≈ 4.266),
  the so-called sieving limit. Below this point f_κ(u)=0, and Theorem 9.1
  yields only the trivial lower bound", the exact positivity mechanism this
  note uses; and it is the smallest published κ=2 sifting limit (the book
  compares 4.42 Ankeny–Onishi, 4.834 Rosser–Iwaniec; Blight's 4.45 is in §2).
• α_κ ≥ β_κ+1 for κ ≥ 2 (p. 77), internal to the book's proof of Theorem 9.1
  (near 9.42), not a hypothesis we owe: Theorem 9.1 as stated on p. 104 assumes
  only Ω(κ). Note α₂'s exact value is not needed (our exponent is β₂, not α₂).
**Where the pages are**, because the folder name misleads: `attestation/`
holds Ch. 9, pp. 103–112 (Theorem 9.1); `attestation/book-ch5-6/` holds
pp. 3–12 (Example 1.2, Definition 1.3) **as well as** pp. 43–79 (Ch. 5–6).
Audit trail: research/dhr-verification.md.**

---

**Abstract.** Let G₂(n) be the largest cyclic gap between consecutive
residues r modulo pₙ# with gcd(r(r+2), pₙ#) = 1, the twin Jacobsthal
function. Relying on the dimension-two lower-bound sieve of
Diamond–Halberstam (Theorem 9.1 of their 2008 book), we prove that for every
ε > 0 there is a constant C(ε) with G₂(n) ≤ C(ε) pₙ^{β₂+ε}, where
β₂ = 4.26645… is the DHR sifting limit; the constant is not explicit. The
pointwise inequality G₂(x#) ≥ g(x#) against the ordinary Jacobsthal function
gives, by Ford–Green–Konyagin–Maynard–Tao,
G₂(x#) ≫ x log x logloglog x / loglog x. The exact values G₂ = 2, 6, …, 618
for pₙ ≤ 43 (OEIS A144311 shifted by one); the largest, 618 at pₙ = 43, sits four orders
of magnitude (1.5 × 10⁴) below 43^{β₂} (the constant C(ε) ignored, as in
§5); a control-corrected power fit of the exponent on 22 terms reads
1.50 ± 0.05 (statistical; the systematic is unquantified),
conditional on the conjectured one-class exponent. Within the searches
recorded in this repository, no upper bound at any exponent was in print
before. If the sieve citation failed, the fundamental lemma gives exponent
19 + ε for a class-fixed sequence. Nothing here bears on the twin prime
conjecture, which would need exponent 2 with a constant below 1.

## 1. Setup and statement

For the primorial P = Pₙ# = ∏_{p ≤ pₙ} p, call r a **twin candidate** mod P if

  gcd(r, P) = gcd(r+2, P) = 1,  equivalently gcd(r(r+2), P) = 1.

These are the "twin slots" of the tile Tₚₙ: for p = 2 the condition forbids one
residue class (r even), and for each odd p ≤ pₙ it forbids the two classes
r ≡ 0 and r ≡ −2 (mod p). The number of twin candidates per period is the
census ∏_{2<p≤pₙ}(p−2) (OEIS A059861; Schemmel), verified in this repository
by direct count through P₁₂# = 37# (217,929,355,875 candidates over a period
of 7.42·10¹²).

Define the **twin Jacobsthal function**

  G₂(n) = the largest gap between consecutive twin candidates mod Pₙ#
          (cyclically).

Computed exactly in this repository (research/05-twin-jacobsthal.js through
23#, 05b-twin-jacobsthal-segmented.js at 29#, exact-g2-ladder.js and the
ladder table of research/G2-STATE.md §2 for 31# to 43#; verify-ladder-big.js
verifies the census, not the gaps, through 37#):

  G₂ = 2, 6, 12, 30, 42, 66, 108, 150, 204, 258, 348, 528, 546, 618
       for pₙ = 2, 3, …, 43.

The last two terms are not new to the literature: OEIS A144311 (Carter,
2008; 22 terms to pₙ = 79, the program on the entry a C++ depth-first search
by Jinyuan Wang) carries the same object shifted by one, with a(13) = 545 and
a(14) = 617, so 546 and 618 were published in that form well before this note
recomputed them. What this note adds is custody. G₂(41#) = 546 was found at
r = 3,784,200,788,231 over a period 41# = 304,250,263,527,210 with
D₄₁ = 8,499,244,879,125 twin candidates, and the maximality search was then
run twice on disjoint natal masks, each pass covering the full period. The
position certificate has been re-checked independently besides: r and
r + 546 are both twin candidates and none of the 545 integers strictly
between them is, so G₂(41#) ≥ 546 is elementary and reproducible in a line.
Agreement with A144311, computed by a search that shares no code with the
enumeration here, makes the term checked from three directions. G₂(43#) = 618
was computed the same day, twice on disjoint natal masks, and agrees with
a(14) = 617 + 1 (research/G2-STATE.md §2). The 2026-09-09 audit re-derived
the ladder through 23# by a direct sieve of each period and re-checked the
41# position certificate in exact integer arithmetic. The exponent estimates
in §5 are the ten-term (pₙ ≤ 37) fits recorded in research/exponent-control.js
(pilot line) and research/exponent-control.md; the 22-term refit of
2026-08-21 (§5 there) is quoted alongside them in §5 below.

No upper bound for G₂ at any exponent appears in the literature (audit, scoped to the searches recorded there:
research/covering-dive.md §2.2, research/PRIOR-ART.md; the only adjacent
statement is Ziller–Morack's *conjectural* h₂(n) < pₙ² − pₙ for their stronger
all-even-differences function, arXiv:1706.00317, Conjecture 6, and Holt's
2007–2026 programme on the cycle of gaps, which studies constellation
populations and, in the papers read for research/PRIOR-ART.md, not the spacing
between consecutive occurrences of the gap 2). The purpose of this note is to
record that standard sieve machinery, run with no new ideas, already yields:

> **Theorem (relying on the cited sieve, Diamond–Halberstam Theorem 9.1; see §6).** Let β₂ = 4.26645… be
> the sifting limit of the Diamond–Halberstam–Richert (DHR) two-dimensional
> lower-bound sieve. For every ε > 0 there is a constant C(ε) such that
>
>   **G₂(n) ≤ C(ε) · pₙ^{β₂+ε}**  for all n.
>
> Equivalently, since log Pₙ# ~ pₙ: writing q = Pₙ#, the gaps between
> consecutive r with gcd(r(r+2), q) = 1 are ≪_ε (log q)^{4.267+ε}.

## 2. The sieve input

We use the lower-bound sieve of dimension κ = 2. References: H. G. Diamond,
H. Halberstam, *A Higher-Dimensional Sieve Method: With Procedures for
Computing Sieve Functions by William F. Galway* (Cambridge Tracts in
Mathematics 177, CUP 2008), note the book is by Diamond & Halberstam alone,
with an appendix by Galway; Richert (d. 1993) is a co-author of the
underlying papers after which the sieve is named (DHR, *Combinatorial sieves
of dimension exceeding one*, J. Number Theory 28 (1988) 306–346, and the
*Boundary value problem* papers I–III: Progress in Mathematics (1990)
133–157, J. Number Theory 45 (1993) 129–185 and 47 (1994) 300–328). Also: H. Halberstam,
H.-E. Richert, *Sieve Methods* (Academic Press, 1974), in older
notation (cited from secondary accounts; the 1974 text has not been read at
the page in this repository, and the chapter is not verified); C. S. Franze, *Sifting limits for the Λ²Λ⁻ sieve*, J. Number Theory
131 (2011), no. 10, 1962–1982, arXiv:1012.3809, Table 1, which tabulates the DHR sifting limits
to 3 d.p., giving **β₂ = 4.266** at κ = 2 (Selberg's Λ²Λ⁻ gives the weaker
4.516 there; either suffices for a theorem of this shape, with the exponent
adjusted). One further κ = 2 sifting limit belongs in this comparison: S. E. Blight, *Refinements of Selberg's Sieve*,
PhD thesis, Rutgers, 2010 (advisor H. Iwaniec),
rucore.libraries.rutgers.edu/rutgers-lib/27420, obtains **β₂ < 4.45** (with
β₃ < 6.458 and β₄ < 8.47) from Selberg weights that account for numbers with
up to three prime factors (the three figures re-read in the thesis PDF on
2026-09-11, each beside its κ and the three-prime-factor weights). That
improves on Franze's 4.516 and is still worse than DHR's 4.26645, so it adds a third independent point to the
superlative in the status block above rather than disturbing it: at κ = 2 the
published field is Rosser–Iwaniec 4.834, Ankeny–Onishi 4.42, Λ²Λ⁻ 4.516,
Blight 4.45, DHR 4.26645, and the exponent this note proves is the smallest of
them. The precise value is due to A. Booker & T. D. Browning,
*Square-free values of reducible polynomials*, Discrete Analysis 2016:8,
arXiv:1511.00601, whose ancillary table (computed by interval arithmetic,
each entry correctly truncated at the 20th decimal place) gives rigorously

  β₂ = 4.26645028414864191641   (lower bound; add 10⁻²⁰ for an upper bound).

Shape of the theorem we invoke (the DH book's Theorem 9.1; conclusion quoted
verbatim through Franze–Kao, arXiv:1812.11280, eqs. (19)/(20)): let A be a
finite integer sequence, and for squarefree d | P(z) suppose

  |A_d| = (ω(d)/d)·X + r_d,     ω multiplicative,  0 ≤ ω(p) < p,

with the dimension condition in the one-sided product form

  (Ω(κ,L)):  ∏_{z₁ ≤ p < z₂} (1 − ω(p)/p)^{−1} ≤ (log z₂ / log z₁)^κ · (1 + L/log z₁)
             (2 ≤ z₁ < z₂),

for κ = 2. Then for any 2 ≤ z ≤ y, with u = log y / log z,

  S(A, z) ≥ X · V(z) · { f₂(u) − O((log log y)² / (log y)^{1/(2κ+2)}) }
            − 2 Σ_{m | P(z), m < y} 4^{ν(m)} |r_m|,

where V(z) = ∏_{p<z}(1 − ω(p)/p), the error exponent is 1/(2κ+2) = 1/6 at
κ = 2, and the DHR lower function f₂ vanishes on (0, β₂], increases
monotonically for u > β₂, and tends to 1, in particular f₂(u) > 0 for
u > β₂. (The 2·4^{ν(m)} weighting at level y is the DH book's remainder form;
the older Halberstam–Richert condition R(κ,α) carries 3^{ν(d)}, and some
formulations need only Σ|r_d|. We take the heaviest form since even it is
harmless here, see §3.)

**Our sieve problem.** Fix an interval (x, x+H] and set
A = { r(r+2) : x < r ≤ x+H }, z = pₙ + 1, X = H. (Not z = pₙ: S(A, P, z)
conventionally sifts the primes p < z, so z = pₙ would fail to sift pₙ
itself; z = pₙ + 1 sifts all p ≤ pₙ, as required.) For squarefree d | P(z), the
condition d | r(r+2) confines r to exactly ω(d) residue classes mod d, where

  ω(2) = 1,  ω(p) = 2 (odd p),  ω(d) = ∏_{p|d} ω(p) = 2^{ν'(d)}

(ν'(d) = number of odd prime factors; the classes are distinct mod odd p
because 0 ≢ −2). Counting each class in an interval of length H:

  |A_d| = (ω(d)/d)·H + r_d,   |r_d| ≤ ω(d) ≤ 2^{ν(d)}.        (∗)

**Dimension check.** By Mertens' theorem applied to ∏(1 − 2/p),

  ∏_{z₁ ≤ p < z₂} (1 − ω(p)/p)^{−1} ≤ (log z₂ / log z₁)² · (1 + L/log z₁)

with an absolute constant L, the product-form condition Ω(κ,L) holds at
κ = 2. (Equivalently, in sum form: Σ_{w≤p<z} ω(p) log p/p =
2 Σ_{w≤p<z} log p/p + O(1) = 2 log(z/w) + O(1), the condition Ω₂(2) with an
absolute A₀; Halberstam–Richert *Sieve Methods* Lemma 5.3 is cited from secondary
accounts as deriving the product bound from Ω₂(κ) + Ω₁ in general; not
verified at the 1974 page.) Also 0 ≤ ω(p) < p holds: ω(2) = 1 < 2 and
ω(p) = 2 < p for odd p. None of this is exotic, and the honest description is
that the setup is quoted rather than built: the DH book's Example 1.2 (§1.3
"Prime g-tuples", pp. 7–8) is L(n) = ∏_{i≤g}(a_i n + b_i) taken **on an
interval**, A = {L(n) : x − y < n ≤ x} with X = y, ω(d) the number of
incongruent solutions of L(n) ≡ 0 mod d, |r_A(d)| ≤ ω(d) and ω(d) ≤ g^{ν(d)}.
Everything in this paragraph and the preceding one is that example at g = 2,
L(n) = n(n+2), Δ = 2. The density product is

  V(z) = (1/2) ∏_{2<p<z} (1 − 2/p) ~ (2C₂ e^{−2γ}) / log² z,

with 2C₂e^{−2γ} = 0.41621…, the constant verified numerically in this
repository (research/genealogy.js: δ·ln²p → 0.4150 at p = 9973 against
0.41621). So V(z) ≍ 1/log²z: genuinely dimension 2, and the linear sieve
(with its sifting limit 2) is unavailable. This is the precise
technical content of "the twin problem is two-dimensional" (cf. FKMPT,
J. Eur. Math. Soc. 23 (2021), 667–700, Remark 7, verified in the arXiv
version 1802.07604, the journal page of the remark not checked; corrigendum
ibid. 25 (2023), 2483–2485).

## 3. The interval application, and why the remainder does not explode

The directive-level worry: with two classes per prime, the per-divisor
remainder is 2^{ν(d)}, not ≤ 1 as in Iwaniec's one-class setting, and the
DH remainder form of Theorem 9.1 weights it by another 4^{ν(m)}, times 2.
Does the remainder sum swamp the main term? It does not, and as far as we
can see this is the only reason the note is easy where Iwaniec's theorem was
hard:

  2 Σ_{m < y, m | P(z)} μ²(m) 4^{ν(m)} |r_m|
    ≤ 2 Σ_{m < y} μ²(m) 4^{ν(m)} 2^{ν(m)}
    = 2 Σ_{m < y} μ²(m) 8^{ν(m)}
    ≪ y (log y)⁷,

by the standard mean value of k^{ν(m)} (Σ_{m≤Y} μ²(m) k^{ν(m)} ≍
Y (log Y)^{k−1}, here k = 8); an elementary form suffices, since
μ²(m) 8^{ν(m)} ≤ τ₈(m) and Σ_{m≤Y} τ₈(m) ≤ Y (1 + log Y)⁷ by counting ordered
factorizations. Polynomial in y with a polylog, an ε in the
exponent absorbs it entirely.
Iwaniec had no ε to spend: at u = 2 exactly, every log matters, which is why
his proof needs the refined error analysis of the linear sieve. At u = β₂ + ε
we are strictly inside the positivity region and can be wasteful.

**Assembling.** Choose H = z^{β₂+ε} and level y = z^{β₂+ε/2}. Then u =
log y/log z = β₂ + ε/2 > β₂, so f₂(u) ≥ f₂(β₂+ε/2) =: c(ε) > 0 (f₂
increasing), and the explicit error O((log log y)²/(log y)^{1/6}) is < c(ε)/2
for z ≥ z₀(ε), so:

- main term:  H · V(z) · { f₂(u) − O(·) } ≫ c(ε) · z^{β₂+ε} / log² z,
- remainder:  ≪ y log⁷ y ≪ z^{β₂+ε/2} · log⁷ z.

The main term dominates by the factor z^{ε/2}/log⁹z → ∞. Hence S(A, z) > 0:
**every interval of length z^{β₂+ε} contains a twin candidate**, uniformly in
the interval's position x (uniformity is free: (∗) holds for every x with the
same constants, and the O(·) in Theorem 9.1 depends only on the Ω-condition
constants). Taking x to range over a period gives G₂(n) ≪_ε pₙ^{β₂+ε}; the
finitely many n with pₙ < z₀(ε) are absorbed into C(ε). ∎ (modulo §6)

## 4. No transfer lemma needed

Iwaniec's 1978 paper needs its Lemma 1, the divisor-bijection transfer
carrying the primorial estimate to arbitrary squarefree moduli, and that
lemma is precisely the step queried in the unanswered
2016 MathOverflow question 245539. One unanswered post is not a controversy and
the lemma is not known to be wrong; what would help is an explicit-constant or
formalised exposition. **The argument avoids it entirely**: G₂ is defined at
primorials, the sifting set is "all primes ≤ pₙ", and the sieve above is run
directly there. (For general squarefree q the analogous statement with z =
P⁺(q) + 1 follows by the same argument sifting only p | q, the dimension
condition Ω₂(2) holds a fortiori with the same constants, but the resulting
bound is in terms of P⁺(q), not ω(q); the sharper ω(q)-form for general q is
exactly where a Lemma-1-style transfer would be needed, and we make no claim
there.)

## 5. Numerical sanity, and the bracket the truth sits in

The bound versus the verified data, at the largest computed level (pₙ = 43):

  bound (ignoring C(ε)): 43^{4.26645} ≈ 9.3 × 10⁶;  actual G₂ = 618.

Slack of four orders of magnitude, a factor of 1.5 × 10⁴, and the data
cannot say how much of it is real. *(Until 2026-09-09 this read "(pₙ = 41):
41^{4.26645} ≈ 7.6 × 10⁶; actual G₂ = 546", a factor of 1.4 × 10⁴; the
fourteenth term was in the repository's ladder since 2026-08-18 and had not
been carried into this note.)* *(Until 2026-08-18 this read "at the largest
computed level (pₙ = 37): 37^{4.26645} ≈ 4.9 × 10⁶; actual G₂ = 528", a factor
of 9.3 × 10³. The new level widens the gap, as it must while the truth sits
near exponent 1.5 and the bound at 4.27.)* On ten terms of G₂ (pₙ in [5, 37]) a power fit in pₙ returns 1.801 ± 0.074
(research/exponent-control.js, OUTPUT table S7), and that number is not the
exponent: the same estimator run on 58 terms of the one-class Jacobsthal
function returns 1.282 ± 0.008 with white residuals and no drift
(research/exponent-control.md §1), against a one-class exponent that is
conjecturally 1 (Maier and Pomerance, g(x#) = x (log x)^{2+o(1)}) and proven
only to lie in [1, 2] (the FGKMT lower bound quoted below, Iwaniec's upper
bound g(x#) ≪ x²; Erdős problem #687 asks for o(x²)). The correction that
follows assumes the conjectured value for the control. On that assumption the
control's bias gives 1.54 ± 0.09 for G₂ (the equal-bias column of the same
table, 1.539 ± 0.094) and 1.57 ± 0.06 for the dominating h₂ of Ziller and
Morack (1.566 ± 0.058 there), whose 19 terms give the longer lever. **Central estimate
1.57, practical bracket 1.3 to 1.9**, with a proven floor of 1 (h₂ ≥ h, and
h(x#) ≫ x log x logloglog x / loglog x by FGKMT, quoted below) and exponent 2
disfavoured by the one-sided direction of
the control's bias rather than excluded by the data. *(Update, 2026-08-21: the
fit has since been re-run on all 22 trusted terms of A144311, pₙ ≤ 79, against
the 64-term control: raw 1.777 ± 0.029, corrected central **1.50 ± 0.05**
statistical with the systematic unquantified, practical bracket 1.3 to 1.8;
h₂'s 1.57 ± 0.06 is unchanged, its ladder did not extend. The ten-term
figures above stand as this note's original record;
`research/exponent-control.md` §5.)*

The object is now bounded from below as well, and that side is free. Twin slots
are a subset of the holes of the
same tile, so G₂(x#) ≥ g(x#) pointwise for the ordinary Jacobsthal function g,
and the Rankin–Pintz–Ford-Green-Konyagin-Maynard-Tao machinery transfers
unchanged:

  G₂(x#) ≫ x · log x · logloglog x / loglog x   (PROVEN, by monotonicity;
  research/two-class-lower-bounds.md §3).

This lower bound is an immediate consequence of monotonicity. The earlier
first-result assertion is withdrawn by the 27 September 2026 Codex
[meta-research assessment](../research/prime-meta-research-2026-09-27.md):
directed by Benjaminsen; the bounded literature search did not establish priority.

This note records a specialization of existing sieve machinery, with no
claim to priority. The upper argument supplies exponent 4.267,
the Ziller–Morack-style conjectural ceiling sits at 2 (h₂(n) < pₙ² − pₙ; a
bound G₂(x#) < x′² − 2 with x′ the prime after x, exponent 2 with constant
below 1, would by the p²-rule imply the twin prime conjecture,
research/G2-STATE.md §1c and §5, and a constant at exponent 2 does not turn
into that on its own), and the open band is therefore (2, β₂] = (2, 4.26645…].

## 6. Every step not fully justified here

1. **The DHR theorem, verified against the primary source (2026-08-14),
   no outstanding items.** Read directly from the Diamond–Halberstam book:
   Theorem 9.1 (pp. 103–112); the formal **Ω(κ) condition, Definition 1.3,
   eq. (1.5), p. 8**, ∏_{w₁≤p<w}(1−ω(p)/p)⁻¹ ≤ (log w/log w₁)^κ(1+A/log w₁)
   **for all pairs 2 ≤ w₁ < w**, the exact product form this note invokes
   (their A = our L); Theorem 6.1
   (pp. 67–68); β₂ ≈ 4.266 (p. 79). Every element confirmed: 2·4^{ν(m)}
   remainder, 1/6 error exponent, S sifting p<z, the difference-differential
   f_κ, the positivity mechanism (f_κ>0 ⟺ u>β_κ; below it the sieve is trivial,
   p. 79 verbatim), β₂ ≈ 4.266 as the smallest published κ=2 sifting limit
   (§2), and
   α_κ ≥ β_κ+1 for κ≥2 (p. 77).
   **The book does our setup and our density check for us.** Its own §1.3–1.4
   motivating example (Example 1.2, pp. 7–8) is A = {L(n) : x − y < n ≤ x},
   already on an interval, with X = y: it defines ω(d) = #{incongruent
   solutions of L(n)≡0 mod d}, notes ω(p) ≤ g with equality for p∤Δ, bounds
   |r_A(d)| ≤ ω(d) ≤ g^{ν(d)}, and states (p. 8) "Ω(κ) holds in Example 1.2 with
   κ = g." For L(n)=n(n+2): g=2, Δ=2, so ω(p)=2 for odd p (the two roots
   n≡0, n≡−2) and ω(2)=1, *precisely our tile's forbidden classes*, giving
   dimension κ=2. The book's check uses only ω(p) ≤ g and nothing about the
   polynomial, so it holds at every dimension. The density hypothesis §2
   verifies by hand is the book's own worked example, and so is the sequence.
   No mathematical item remains open on the sieve input; the theorem rests on
   primary sources for the book's part, on secondary accounts for the
   Halberstam–Richert 1974 page (§2), and its constants are inexplicit (§6.4).
   What is ours is the dimension-2 instantiation, not the method: reading a
   Jacobsthal bound off a sieve's error exponent is on record at dimension one
   (MathOverflow 37679, answer 52890, 2011, j(x#) ≪ x^{4.032};
   research/G2-STATE.md §8), and the closeness of the two exponents is
   coincidence.
   Audit trail: research/dhr-verification.md.
   **Definition 1.3 is sourced primarily and corroborated twice.** The
   quantifier over all pairs (w₁, w) is the load-bearing part: a κ that holds
   only at some pairs, or only by letting A grow, is not a dimension. The book's
   page carries it, together with the constants κ ≥ 1, A > 1. Two independent
   published restatements agree verbatim, and are kept because they were reached
   first and because a second reader's transcription is worth having:
   **D. R. Johnston and S. N. Thomas, *The sum of a prime power and an
   almost prime*, arXiv:2503.04045v3 (14 May 2025), §2.3**, which prints
   ∏_{z₁≤p<z₂, p∈P}(1−g(p)/p)^{−1} < (log z₂/log z₁)^κ{1 + L/log z₁}, **"for
   z₂ > z₁ ≥ 2"**, citing "Diamond, Halberstam, and Galway, *A Higher-
   Dimensional Sieve Method*, CUP 2008", Ch. 11.1; and **K. Ford, *Sieve methods
   lecture notes*, Spring 2023, p. 18**, which gives the same inequality for
   2 ≤ y ≤ w ≤ z and adds that κ is "the smallest admissible value … with B
   remaining bounded". Note Johnston–Thomas restrict the product to p ∈ P, the
   sifting set, which the book's own eq. (1.3) licenses (ω(p) = 0 off P). Our
   ω(p) = 2 for odd p ≤ pₙ satisfies the condition at every pair with an
   absolute A, which is §2's dimension check and is unaffected.
2. **The remainder form, verified.** Theorem 9.1 accepts remainders through
   2 Σ_{m|P(z), m<y} 4^{ν(m)}|r_m| at level y (not the older
   Halberstam–Richert 3^{ν} condition, and not a bilinear/well-factorable
   structure). §3 has been re-run against this actual form (8^{ν}, y log⁷y):
   the conclusion is unchanged, the bound beating the requirement by z^{ε/2},
   exactly the outcome an earlier draft of this section predicted for any
   standard remainder convention.
3. **The o(1) in the sieve's main term, verified and explicit:** it is
   O((log log y)²/(log y)^{1/(2κ+2)}) = O((log log y)²/(log y)^{1/6}) at
   κ = 2, uniform given the Ω-condition constants (Franze–Kao's restatement
   of Thm 9.1). The precise dependence of the implied constant on the
   Ω-condition constants is not made explicit anywhere we have read, which is
   the same inexplicitness item 4 records for C(ε); nothing in §3 needs it,
   since the main term beats the remainder by z^{ε/2}.
4. **Constants are inexplicit** (as in Iwaniec's own theorem, where the constant
   at Erdős #970 is not known). A fully explicit version would need
   explicit dimension-2 sieve bounds (possibly via Franze's Λ²Λ⁻ with the
   worse exponent 4.516 but explicit machinery).
5. **Fallback if the DHR citation fails:** the Fundamental Lemma of sieve
   theory. In the Friedlander–Iwaniec *Opera de Cribro* Lemma 6.8
   normalization (quoted verbatim as Lemma 9.1 of Matomäki–Teräväinen,
   arXiv:2301.07679), the level D = z^s requires **s ≥ 9κ + 1 = 19** at
   κ = 2, with main-term positivity factor 1 − e^{9κ−s}K^{10}, so positivity
   needs s > 9κ + 10 ln K, where K is the constant of the lemma's hypothesis
   (iii): ∏_{w₁≤p<z₁}(1 − h(p))^{−1} ≤ K (ln z₁/ln w₁)² for all
   z₁ ≥ w₁ ≥ 2. For the twin sequence sifted by every prime, h(3) = 2/3
   forces K ≥ 3 (take w₁ = 3 and let z₁ decrease to 3), so the exponent as
   written is **18 + 10 ln K + ε ≥ 28.98 + ε**, not 19 + ε (return #26,
   2026-09-11). The exponent 19 + ε is recovered by fixing the residue class:
   sieve A′ = {r(r + 2) : r ≡ a (mod W), x < r ≤ x + H}, with
   W = ∏_{p<23} p = 9 699 690 and a a class with (a(a + 2), W) = 1, by the
   primes 23 ≤ p ≤ pₙ only. Then h(p) = 0 for p < 23, |r_d| ≤ 2^{ν(d)} still
   holds with X = H/W, and the constant is
   K(23) = sup_{z ≥ w ≥ 23} ∏_{w≤p<z}(1 − 2/p)^{−1} (ln w/ln z)² =
   1.1039848905…, the limit at the block {29, 31}, certified for every z by
   an exact scan over primes 23 ≤ w < 286, w ≤ z < 10⁶, with
   Rosser–Schoenfeld (Illinois J. Math. 6 (1962), Theorem 5, (3.17)-(3.18)) bounds for z ≥ 10⁶ and for w ≥ 286 (return #166, the return for job #371, `k-certificate.py`;
   re-run for this revision, output identical). Since K(23) < e^{0.1},
   s₀ = max(19, 18 + 10 ln K(23)) = 19 and G₂(n) ≪_ε pₙ^{19+ε}, the
   absolute factor W absorbed in the constant. The smallest admissible
   modulus is this one: w₀ = 19 gives K(19) ≥ 19/17 > e^{0.1}. Formulations
   differ in the constant (HR-1974-type forms give positivity at an absolute
   but inexplicit u₀(κ)); any such version yields the same theorem at some
   finite exponent.
6. **Ceiling acknowledged:** exponent 2 with constant below 1 (G₂(x#) <
   x′² − 2) implies the twin prime conjecture by the p²-rule, and the
   zone-occupancy weak form is equivalent to it (research/G2-STATE.md §1c); a
   bound at exponent 2 with an unspecified constant implies neither. That
   threshold is not reachable by known sieve methods alone (parity; Selberg's
   examples). Improving 4.266… toward 2 is
   the recognized dimension-2 sifting-limit problem. Nothing in this note
   moves the wall; it fills the empty shelf in front of it.

## 7. What would make this publishable

The sieve input is verified against the primary source and the derivation is
closed (§6). What remains is presentation and risk control. (i) Add the
explicit-constant variant via Franze's tables; (ii) state the
general-squarefree-q corollary in terms of P⁺(q); (iii) a referee-proof rewrite
of (∗) (the mean-value estimate now has its elementary form in §3; the lower
bound is already folded in, §5);
(iv) an expert sanity pass, since the
result is modest enough that the main risk is not depth but a convention
mismatch in the sieve statement. Companion citations: A059861 (census), A144311 (the ladder, as G₂ − 1;
the OEIS draft research/oeis-G2-submission.md is closed as a duplicate of it),
Erdős, *On the integers
relatively prime to n and on a number-theoretic function considered by
Jacobsthal*, Math. Scand. 10 (1962), 163–170, for the one-class ancestor,
Ziller–Morack for the h₂ contrast, FKMPT Remark 7 for the two-dimensionality
context, Granville's *Sieving intervals and Siegel zeros* for the one-class
mechanism this note deliberately does not need.

## 8. Authorship & AI disclosure

Project direction and publication: Chris Benjaminsen. Research and writing
were performed by AI assistants and the contributors identified in the
[contribution record](../research/RESEARCH-CONTRIBUTIONS-2026-09-27.md) and document history.

Chris Benjaminsen provided project framing, driving questions, direction
and publication stewardship. Formal derivations, literature audits,
computations and manuscript writing were performed by AI assistants and
project contributors; the [contribution record](../research/RESEARCH-CONTRIBUTIONS-2026-09-27.md)
and linked version histories identify the evidenced accounts and models.
These roles do not transfer ownership of the classical objects or cited
results. Unknown historical worker/model details are not assigned to the
publishing account. Computations have reproducible code and recorded outputs;
asymptotic arguments require their stated inputs and independent review.
