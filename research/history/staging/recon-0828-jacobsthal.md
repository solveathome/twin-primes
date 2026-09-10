# Recon 2026-08-28: upper bounds for Jacobsthal-type functions, 1978 to today

<!-- ledger
id: Q-recon-0828-jacobsthal
status: ANSWERED
todo: none
question: Does the 1978-2026 literature on upper bounds for Jacobsthal-type functions and maximal gaps in sieved sets hold anything that lowers G2 or Z2?
verdict: No route. Thirteen angles graded, ten dead on arrival (eight already closed in this corpus, two on their own structure), three surviving and none of them lowers an exponent: a kappa=2 extremal candidate built from an exceptional character rather than from Liouville, which can only close the band faster; an unread 1983 Siebert chapter that could already contain it; and one published anchor. Z2 has no non-TPC band at all.
-->

**Scope.** Area: published upper bounds for Jacobsthal-type functions and for
maximal gaps in sieved sets, 1978 to today, plus the non-sieve routes to the
same object (interval covering, additive combinatorics, the polynomial method).
The question behind it is Chris's, verbatim: a way to lower both `Z₂` and `G₂`.
This note grades candidate angles and records what each channel could and could
not reach. It computes nothing and proves nothing.

---

## 0. Bottom line, caveats first

**No angle found lowers the exponent, and two of the three that survive
grading can only shorten the route by closing it.** The corpus had already run
most of this area on 2026-08-14 and 2026-08-18 ([../covering-dive.md](../covering-dive.md)
§§Q1-Q3, [../sift-limit-attack.md](../sift-limit-attack.md) §2,
[../SEARCH-CONVENTIONS.md](../SEARCH-CONVENTIONS.md) §§3-4), and this pass
confirms those readings rather than overturning them. Eight of the thirteen
angles below are dead by a closure this corpus already owns, and re-proposing
any of them costs a session.

**The one structural asymmetry worth stating before anything else: `Z₂` and
`G₂` are not the same kind of ask.** `G₂` has a band, `(2, 4.26645)`, in which
an improvement would be real and would not be TPC-implying. `Z₂` has no such
band. The zone `(p, p′²)` lies below the frontier, so its interior twin slots
are genuine twin primes ([../GLOSSARY.md](../GLOSSARY.md), zone gap), and any
unconditional statement that `Z₂(p)` stays below the zone's own width, for
infinitely many `p`, is the strong Zone Postulate at those `p` and hence gives
infinitely many twin primes. Every literature angle at `Z₂` is therefore
TPC-STRENGTH before it starts. Nothing in this area is priced for that, and no
angle below is offered for `Z₂`.

**The second thing to have straight: the exponent is `β₂` and there is almost
nothing else in the pipeline to attack.** For the interval problem the level of
distribution is free. Granville states it for the one-class case at his §1, read
at the page: `|r(A,d)| ≤ 1` for every squarefree `d`, so "in our case we can
take any `θ < 1`". Two classes replace `|r| ≤ 1` by `|r| ≤ 2^{ω(d)}`, which
costs a log power and not an exponent. So the whole modern level-of-distribution
axis, the machinery that has been moving in this field since 2020 (Maynard's
`x^{11/21}` and `x^{3/5}`, Lichtman's `x^{66/107}`, Pascadi's `x^{5/8}`), is
structurally irrelevant here: it improves a parameter this problem already has
at its maximum. That kills a whole family of hopeful imports in one line, and it
is why the exponent reduces to the sifting limit and to nothing else.

---

## 1. Channels, calibrated, with what each one could not reach

Calibration ran in-session and on the same channel, per
[../SEARCH-CONVENTIONS.md](../SEARCH-CONVENTIONS.md) §2.

| channel | calibration | verdict |
|---|---|---|
| OpenAlex | `W129012938` returns "ON THE PROBLEM OF JACOBSTHAL", 1978, **82 citing works**, the same count the 2026-08-18 pass recorded | CALIBRATED, used |
| zbMATH | `ti: Jacobsthal` returns **324** records, the number already tabled in `covering-dive.md` §2.2 | CALIBRATED, used; the licence-blocked title rows are the known zbMATH behaviour, not a failure |
| arXiv API | `all:"long gaps in sieved sets"` returned 1 entry on two passes at 12:20-12:21 | CALIBRATED for a window of about two minutes, then HTTP 429 for the rest of the session, through 12 and 25 retry loops. **Every arXiv query after that window returned an empty body and is recorded here as VOID, not as a negative.** The one substantive query that landed inside the good window was `all:"sifting limit"`, which returned exactly one record, Franze 2010 |
| Semantic Scholar | `graph/v1/paper/search` returned HTTP 429 on the first call | DEAD for the session; no negative rests on it |
| WebSearch | returned the expected Franze, DHR and FGKMT anchors on both probes | CALIBRATED, used as a lead generator only |
| De Gruyter / Brill | `10.1515/dema-1978-0121` returns HTTP 202 with a zero-byte body on both the `degruyterbrill.com` and `degruyter.com` hosts, `html` and `pdf` | UNREACHABLE. **Iwaniec 1978 was not read at the page in this session either** |
| Cambridge Core | the Vaughan 1977 PDF path returns HTTP 404 with an HTML error body | UNREACHABLE |
| Springer Link | the Konyagin 2025 article page 303-redirects to `idp.springer.com` | UNREACHABLE beyond the abstract |

**What was read at a page, with its hash.** Granville, *Sieving intervals and
Siegel zeros*, arXiv:2010.01211v1, Acta Arith. 205 (2022) 1-19, fetched from the
author's copy at `dms.umontreal.ca/~andrew/PDF/Sieve.Remark.20.09.26.pdf`,
222,744 bytes, sha256
`a5403b56e7aab8dd2f66bbc776e049e1ac470bc8a948abd65d8fe2b6c250281b`, extracted
with `pdftotext -layout`. Every Granville quotation below is from that file.
Nothing else in this note was opened at a page in this session; the rest is
[SOURCED-BIB] or carried from the corpus with its own pointer.

---

## 2. Iwaniec 1978, at the closest source that opens

The 1978 paper stays unread. What is quotable is Granville's account, and this
pass adds one thing the corpus's reading of it did not carry: the shape of the
result is not "the sieve is positive past the sifting limit" but a quantitative
statement at the boundary. Granville §1, verbatim from the hashed file:

> "The key result in this range is due to Iwaniec [7] who showed that if `y ≫ z²` then
> `S(x, y, z) ≥ 4y/(log y)² · (log(y/z²) − O(1))`."

and, in the same paragraph, the uniform version for `2 < u ≤ 3`:

> "`S(x, y, z) ≥ (f(u) − c/log y) · ∏_{p≤z}(1 − 1/p) · y`, where `f(u) = 2e^γ log(u−1)/u` in this range."

Two consequences for how the corpus states its own bound. First, the one-class
exponent comes out as exactly `2`, not `2 + ε`: the `log(y/z²)` factor means a
large constant multiple of `z²` suffices, so `J(P(z)) ≪ z²` with an inexplicit
constant. The corpus's `G₂(x#) ≪_ε x^{4.26645+ε}` carries an `ε` that the
one-class analogue does not need, and a `κ = 2` version of the same boundary
refinement would remove it. That is a cosmetic gain: it moves no exponent and is
not worth a session.

Second, Granville's own framing of what Iwaniec's deduction to general `m` is:

> "Iwaniec [7] deduced (cleverly) that this upper bound then holds for all integers `m`."

which is the Lemma 1 transfer the corpus already records, and which MathOverflow
245539 has questioned since 2016 with zero answers. Nothing in this pass moved
that.

---

## 3. The angles, graded

Grades follow [../IMPORT-MAP.md](../IMPORT-MAP.md) §0. **DOA** means the angle
reduces to a route this corpus has closed, or dies on its own arithmetic before
any experiment.

### A1. Improve the `κ = 2` sifting limit [DOA]
The theorem it would need does not exist and the corpus has closed the search
for it: `β₂ = 4.26645` is unimproved since Diamond-Halberstam-Galway 2008 and
everything after is worse at `κ = 2` ([../REFUTED.md](../REFUTED.md), row
"improving β₂ itself"; [../SEARCH-CONVENTIONS.md](../SEARCH-CONVENTIONS.md) §4).
The arXiv query `all:"sifting limit"` landed inside this session's one working
window and returned a single record, Franze 2010, which is the corpus's own
worse-at-`κ=2` entry. Nothing has been posted on that phrase in sixteen years.

### A2. The vector sieve, and the Ford-Halberstam dual [DOA, with the number]
The natural non-`β₂` idea is to split `n` and `n+2` into two one-dimensional
sieves and use Iwaniec's vector inequality. It gives an exponent, and the
exponent is worse. The corpus has the arithmetic: `K_BF = 5.158064680330` for
Brüdern-Fouvry's (2.6), and `K_FH = 2(1+√e) = 5.297442541400` for the
Ford-Halberstam dual, both against `β₂ = 4.266450`
(`history/staging/attack-ford-halberstam.md`; [../REFUTED.md](../REFUTED.md)).
The named reason is that `f` is already optimal at `κ = 1`, so a per-component
bound cannot beat the Rosser minorant it declines to use. Anyone re-deriving
`1 + √e = 2.6487` as a promising threshold has forgotten the level: each
component gets half, and the two halves are what turn `2.65` into `5.30`.

### A3. Fractional retention, weighted sieves below the sifting limit [DOA]
Closed 2026-08-18: the upper-bound window `(α_κ, β_κ+1)` is empty at every
`κ ≥ 2`, since `α₂ = 5.35773 > 5.26645`
(`history/staging/scope-fractional-retention.md`).

### A4. Levels of distribution, bilinear and spectral machinery [DOA, structurally]
Priced in §0 above. The interval problem has `θ → 1` free, so BFI, Maynard,
Lichtman and Pascadi improve a parameter that is not binding. This is a
different wall from Lemma V's, where `θ = 1.212157` is the binding number
([../SEARCH-CONVENTIONS.md](../SEARCH-CONVENTIONS.md) §1, row 49); the two
should not be confused, and the Lemma V frontier is closed on its own terms
(`history/staging/smoothness-front.md`).

### A5. Interval covering: Crittenden-Vanden Eynden and its successors [DOA]
CVE (Proc. AMS 24 (1970)) says `n` progressions covering `{1,…,2ⁿ}` cover `ℤ`,
and `2ⁿ` is essentially sharp; BBMST reproved it in three pages (Acta Math.
Hungar. 161 (2020) 197-200). Both are exponential in the number of moduli, and
`G₂` lives at `x^{4.27}`, which is `2^{o(π(x))}`, so the hypothesis is never
met. The direction is also wrong: the theorem converts a long interval covering
into a covering of `ℤ`, which is a statement about the adversary succeeding, not
about the length he can reach. Recorded at `covering-dive.md` §3.4 and §Q3
conclusion 6. A 2024 WebSearch pass on interval covering with prime moduli
returned only minimum-modulus work (Hough; BBMST; Cummings-Filaseta-Trifonov),
which is the same family.

### A6. Erdős covering systems and the distortion method [DOA]
Import row 8, LANDED and closed 2026-08-19: the method does speak at two classes
and its economy `Σ 4/p² < 0.3646` converges, which no other route here manages,
and it dies on the ambient. Its measures live on a CRT product, the certified
window is at least a primorial, and the only interval bridge is exponential in
the progression count; the whole yield is `G₂(x#) ≤ 6·2^{2(π(x)−2)} + 6`
(`history/staging/import-distortion.md`).

### A7. The polynomial method, covering a grid by coordinate slices [DOA]
Under CRT the tile sits in `∏_p ℤ/p` and a residue class mod `p` is a coordinate
slice, so the Alon-Füredi and Clifton-Huang family looks adjacent. It is
VOCABULARY-ONLY at the object: those theorems count hyperplanes needed to cover
a grid or a grid minus a point, and the question here is the length of a
segment, which is not an algebraic subvariety of the product. The nearest thing
with the right shape is the torus reading of the covering question, which is
import row 12, closed 2026-08-20 with the union bound exactly tight in the
multi-obstacle case (`history/staging/row12-recon.md`).

### A8. Additive combinatorics, Bohr sets, the large sieve reversed [DOA]
The Fourier route on this object is closed twice over: generic chaining against
the maximal-law union bound (`history/staging/import-chaining.md`) and the
`ℓ¹ → ℓ²√log` conversion on `Θ_e(a)` (`history/staging/import-l1l2.md`), whose
true constant sits below the TPC line, so every true version of the statement is
TPC-implying. A Bohr-set covering statement is import row 12 again.

### A9. Computational upper bounds: Hagedorn, Costello-Watts [DOA for the exponent]
Costello-Watts, Math. Comp. 84 (2015) 1389-1399, Theorem 4.4 is a recursion for
`π_min(m,k)`, evaluated at `m = 1`, one class per prime
([../SEARCH-CONVENTIONS.md](../SEARCH-CONVENTIONS.md) §1). It certifies finite
levels and states no asymptotic. The corpus already has strictly better finite
certificates from exact strata (`G₂(19#) ≤ 210`, `G₂(23#) ≤ 420`,
`history/staging/attack-beta2-03-exact-strata.md`).

### A10. Vaughan 1977 as an independent route to exponent 2 [DOA-probable, source not opened]
Cambridge Core returned 404, so his method was not read. His own sentence,
quoted in `covering-dive.md` §1.1 from the abstract page, says the purpose is
"to show that in (4) `C` can be taken arbitrarily close to 2", which is the same
sieve inequality with the same limiting mechanism, not a second mechanism. Graded
DOA on that sentence, and the grade is provisional because the paper is unread.

### A11. Konyagin 2025, the general-set gap framework [live as an anchor, not as a route]
S. V. Konyagin, *On the Local Distribution of Elements of Subsets of the Set of
Positive Integers*, Math. Notes (2025), DOI `10.1134/S0001434625605088`
**[SOURCED-BIB, abstract via OpenAlex `W7117111366`; the Springer full text is
paywalled and was not opened]**. He defines `ρ(x,y;A)` as the length of a
maximal interval inside `(y, x+y)` disjoint from `A`, and studies
`ρ_*(x;A) = inf_y ρ(x,y;A)`, determining its order for the squarefree numbers.
**Translation to `G₂`: none.** The statistic is an infimum over windows, so it
lower-bounds how empty every window must be, which is the opposite quantifier
from `G₂`; and squarefree is a convergent-density sieve, not a `κ = 2` one.
What it is worth: it is the general-`A` gaps framework, written in 2025 by the
sharpest living expert on this exact problem, citing Iwaniec 1978, and it
contains no two-class upper bound. That strengthens the corpus's standing
negative by expert silence at the sharpest available point, which is the
argument `covering-dive.md` §2.2 pass 2 already makes about Kalmynin-Konyagin.
This item is absent from the corpus and belongs in
[../SEARCH-CONVENTIONS.md](../SEARCH-CONVENTIONS.md) §1 as the owning convention
for "maximal gap of a general sifted set, uniformly over windows".
Circularity CLEAN. Payoff PUBLISHED-ANCHOR. Cost 1 h.

### A12. A `κ = 2` extremal example from an exceptional character [LIVE, and it cannot lower anything]
This is the one angle in the area with a mechanism the corpus does not already
own, and its honest payoff is a closure, not an exponent.

The state of the extremal question, from [../sift-limit-attack.md](../sift-limit-attack.md)
§2 quoting Ford's 2023 notes: `β(κ)` is known exactly only for
`κ ∈ [0, 1/2] ∪ {1}`, and at `κ = 1` the extremizers are Selberg's Liouville
sets `A± = {n ≤ x : λ(n) = ∓1}`. Nothing analogous is in print at `κ = 2`, so
the band `(2, 4.26645]` is a proof gap and not a known truth gap. The corpus's
own sketch of what a `κ = 2` extremizer would look like is the mixed-sign twin
example `C = {n(n+2) : λ(n) = −1, λ(n+2) = +1}`, and §2 records why it is not
usable: its axioms need two-point `λ`-equidistribution at full level, which is
Chowla-strength and open.

**Granville's paper supplies a published substitute for exactly that missing
input, and the corpus has never read it for its own theorems.** `covering-dive.md`
cites this paper only for its §1 exposition of Iwaniec. Its actual content, from
the hashed file: Proposition 1 and Corollary 1 show that if there are infinitely
many Siegel zeros then the Jurkat-Richert `f` and `F` are attained by the
*interval* sieve problem, answering a question of Selberg's; Corollary 3 shows
that, on the same hypothesis, there are admissible sets of length `y` with
`∼ 2y/log y` elements, so the standard belief about the largest admissible set is
false under Siegel zeros; and the machinery is Theorem 2.1, which runs on an
exceptional quadratic character `χ mod q` in place of `λ`.

The proposal is to substitute `χ` for `λ` in the corpus's own `C`. The reason it
is worth writing down is that the substitution changes the price of the blocking
hypothesis: the two-point input for `λ` is `Σ λ(n)λ(n+2)`, which is
Chowla-strength, while the two-point input for a fixed quadratic character is
`Σ_n χ(n)χ(n+2) = Σ_n χ(n² + 2n)`, a character sum in a quadratic argument, and
those are bounded unconditionally over a full period. **That step is a
suggestion here and not a result: it has not been carried out, the density axiom
for the resulting set at `κ = 2` has not been checked, and Granville's own text
contains zero occurrences of "dimension 2" or any higher-`κ` statement, checked
mechanically across the extracted text.** So the transport is a bet, not a
transfer.

- Structural fit: **STRONG-ANALOGY.** The object is the same (an axiom-satisfying
  set that defeats a sieve of the given dimension); the modification is one
  dimension up, and the source states nothing above `κ = 1`.
- Circularity: **CLEAN, and permanently so.** The output is a hardness statement
  conditional on a hypothesis almost everyone believes false. It cannot appear
  in any proof chain, in either direction, and must never be cited as evidence
  for or against the Zone Postulate. Its only legitimate use is to decide
  whether the band is worth walking.
- Payoff: **WALL-ADDRESS, with CLOSURE available.** If it works it says how much
  of `(2, 4.26645]` no axiom-only sieve can reach, and the corpus stops paying
  for that band. If it fails it says which axiom breaks, which is also worth
  having.
- Exponent implication: **none, in the favourable direction.** This angle cannot
  lower `G₂`. Anyone reporting it otherwise has misread it.
- Cost: 4 h to price, considerably more to execute. Price it against the fact
  that the corpus's §2 already contains two sketches at this target and both
  died on their hypotheses.

### A13. Siebert 1983, the possible predecessor [LIVE, cheap, decisive either way]
H. Siebert, *Sieve methods and Siegel's zeros*, in *Studies in Pure Mathematics*,
Birkhäuser, Basel 1983, 659-668 **[SOURCED-BIB; existence and pagination
confirmed at zbMATH in-session, `au: Siebert & ti: Siegel` returning exactly two
records; full text not reachable, and OpenAlex `title.search` returns zero for
it, so it is a book chapter that indexed channels do not carry]**. Granville
describes it in the hashed file as proving "a similar result though with a
slightly broader sieve problem (he allowed sieving arithmetic progressions)",
with a weaker conclusion only because Siebert did not have the strong estimate
available. **If Siebert's construction is stated for general dimension `κ`, then
the `κ = 2` extremal example already exists in print, A12 is a rediscovery, and
[../SEARCH-CONVENTIONS.md](../SEARCH-CONVENTIONS.md) §3's "no published `κ = 2`
extremal example" row is wrong.** That row currently carries weight in
`sift-limit-attack.md` §2's reading of the band, so the check is load-bearing.
Circularity CLEAN. Payoff PUBLISHED-ANCHOR or CLOSURE. Cost: one interlibrary
retrieval, and no compute at all. **Do this before A12.**

---

## 4. Two items new to this corpus, neither of them a route

1. **Konyagin, Math. Notes 2025** (A11): the general-`A` maximal-gap framework,
   not in the corpus, no two-class content, worth one row in
   [../SEARCH-CONVENTIONS.md](../SEARCH-CONVENTIONS.md) §1 and one sentence of
   expert-silence support in `covering-dive.md` §2.2.
2. **Dura, *IV The Goldbach Survivor-Gap Problem for Two-Cloud Primorial Masks:
   A Finite Jacobsthal-Type Reduction of Binary Goldbach*, Zenodo, 2026, DOI
   `10.5281/zenodo.20660792`** **[SOURCED-BIB, abstract only via OpenAlex
   `W7164490830`; unrefereed, self-deposited]**. The abstract describes a
   two-class survivor mask on primorial tori, an exact CRT product formula, a
   two-cloud recurrence, a survivor-gap problem, and an explicit comparison with
   "classical Jacobsthal-type gap questions", that is this corpus's frame, at
   the Goldbach offset `N − x` rather than the twin offset `x + 2`. It states no
   bound, and its computational content is a verification to `10^{10}`. Recorded
   here so that no future novelty sentence is written without it, on the same
   footing as the Ojaroudi Zenodo item already carried in
   [../SEARCH-CONVENTIONS.md](../SEARCH-CONVENTIONS.md) §1. It is not evidence
   for anything.

A third, smaller correction: `covering-dive.md` §1.1 lists the elementary line
(Kanold, Stevens, Paseman) without noting that those methods are class-count
agnostic. They are, and their two-class instantiations would carry the same
unbounded exponents in `k` that they carry at one class, which is far worse than
`4.2665`. That is why the elementary line is not an angle and never was.

---

## 5. What would falsify this, and whether that check has run

- **"The area holds no two-class upper bound."** Falsified by any published
  bound at any exponent for a `κ ≥ 2` sieving system. The check ran on OpenAlex
  and zbMATH, both calibrated in-session, and on the 2026-08-18 sweep of all 82
  works citing Iwaniec 1978. It did **not** run on arXiv, which returned HTTP 429
  for all but a two-minute window; on Semantic Scholar, which returned 429; on
  MathSciNet review text, which the free `mrlookup` endpoint does not carry; or
  in any language other than English. The books blind spot recorded at
  `covering-dive.md` §2.2 is unchanged: Halberstam-Richert Cor. 2.4.1, the DHR
  book's Ch. 10 and Ch. 17, and Greaves are still not full-text searchable here.
- **"`β₂` is the only parameter left in the pipeline."** Falsified by exhibiting
  a sieve input for this problem that is not a divisor-class count, or by a level
  argument that binds. Neither check is new: the first ran as
  `sift-limit-attack.md` §§1 and 4.6 and found nothing in print; the second is
  the `θ < 1` reading of Granville §1 quoted in §0, which was read at the page
  today and is one sentence, not a proof.
- **"Granville 2022 states nothing above `κ = 1`."** Falsified by any
  higher-dimensional statement in the published Acta Arith. version. The check
  ran on the arXiv v1 text only, by mechanical search for "dimension", "higher",
  "κ = 2" and "two-dimension", all zero. **The published version was not
  obtained**, and the two differ at least in that the published one has a
  journal reference the arXiv record still lacks.
- **"Siebert 1983 does not already contain the `κ = 2` example."** Not checked at
  all. The chapter was not reachable on any channel available here, and the
  claim in A13 is that this is the cheapest decisive check in the area, not that
  it has been made.
- **"`Z₂` has no non-TPC band."** Falsified by a `Z₂` statement that is weaker
  than the strong Zone Postulate and still useful. The argument in §0 is one
  line from the glossary's own definition of the zone and has not been
  adversarially checked.

*This note states current understanding, is HELD pending an adversarial pass,
and opens no route. Its two live items are A13 first, then A11; A12 is priced
and not recommended before A13 answers.*
