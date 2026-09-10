# Prior art & novelty audit (2026-08-13)

<!-- ledger
id: Q-prior-art-audit
status: PARTIAL
todo: none
question: What in this programme is rediscovery, and what might be new?
verdict: Rediscovery, prolific and correct, spanning 170 years (Smith 1857 to Tafula 2015); three candidate novelties survived the 2026-08-13 audit and item 1 was cut back on 2026-08-18 by OEIS A144311 (Carter 2008), and several negatives were run in our own wording rather than the owning convention, which is worth little. The 2026-09-06 global smooth majorant uses an explicitly matched prior-art finite-difference mechanism; literature novelty of the complete application is unestablished.
-->

**Current arithmetic qualification (2026-09-06):** the full absolute O(x)
bound in [global-smooth-majorant.md](global-smooth-majorant.md) is a derived
application, with literature novelty unestablished. Its section 7 matches
the finite-difference mechanism to Granville--Koukoulopoulos--Maynard and
distinguishes it from the subsequent application of Henriot's upper theorem.
The candidate-novelty list below does not grade this arithmetic result.
The [detailed source follow-up](smooth-sieve-literature.md) records
existing concentration, optimization and shifted-divisor machinery.
Its shifted small-prime localization is an application of the matched
upper theorem; literature novelty of that application is unestablished.
The [switching source match](switching-negative-mass.md) additionally
reads Matomäki--Zuniga Alterman's 2025 framework and applies classical
BV/linear-sieve bounds to a signed factor family. Its negative-mass
lower bound rejects one current strategy; literature novelty is
unestablished. The factor-count decomposition and switching mechanism
themselves are existing methods. The [paired budget](paired-factor-budget.md)
now uses Wu's published Pan--Ding statement for aggregation before the
progression bound. Its matched application improves the available level
and prices the two-family failure; the machinery is prior art and
literature novelty of the application remains unestablished.

The [supported-coefficient audit](supported-coefficient-dickman.md)
reuses the classical Dickman integral identity recorded by Soundararajan
to evaluate the signed harmonic main term. It matches the 2026
Drappeau--Mounier integration method before considering a new numerical
engine and records a scoped correction to their v1 Dickman display.
Matomäki--Zuniga Alterman section 4 already uses sign-aware upper/lower
sieving. Bharadwaj--Rodgers's 2026 prime-factor theorem has an explicit
support restriction for shifted primes that a direct large-cofactor
test does not satisfy. These are positive prior-art matches and a
checked interface limitation; literature novelty of the application is
unestablished, and the joint signed arithmetic estimate is still OPEN.

The [joint-correction audit](joint-correction-source-audit.md) reads
Ford--Maynard Definition 7.1 and the proof's Type II step, Mounier's
signed smooth-number condition D_theta, and Friedlander--Iwaniec's
asymptotic-sieve hypotheses before reconstructing the local weights.
Whole-subset convolution and complementary-sum bookkeeping are prior
art. The unrestricted logarithmic weight is an existing Vaughan
approximant; the selected branch does not inherit its support.
Full reassembly supplies no new signed estimate. The checked source
hypotheses do not directly fill the gap, and literature novelty of the
local application remains unestablished.

The [moving-cutoff audit](moving-cutoff-parity.md) rereads Murty--Vatwani
at proof level and retrieves Vatwani's 2018 author preprint for the
Math. Z. follow-up. The squarefree switch, centering on an unknown
Mobius total and fixed-residue reduction are already published.
A missing inner endpoint in the 2017 PDF has an exact counterexample;
the local dyadic repair and explicit tolerance are checked without
claiming priority or refuting the conditional theorem. The unfilled
arithmetic estimate is distinct from the validated formula. The 2019
source's one-odd-exponent results do not supply the shifted-prime twist.

Three independent literature sweeps (framing / spine theorems / gap-and-variance
front) to answer honestly: *what here is rediscovery, and what might be new?*
Verdicts: **classical** (must cite, cannot claim) · **known-obscure** (in print,
rarely stated) · **possibly novel** (no prior art found — not proof of novelty,
but searched and not found). A **possibly novel** verdict is worth exactly the
search behind it, and `SEARCH-CONVENTIONS.md` §1 holds the owning convention for
each object: a clean negative run in our own wording does not earn the verdict,
because that is what five waves produced against a sequence published in 2008.

## Verdict table

| Item | Verdict | Closest prior art |
|---|---|---|
| Primes as holes of stacked periodic waves | **classical** (even physically realized) | Petersen et al., *Phys. Rev. Lett.* 122, 090201 (2019) — optical wave superpositions as prime sieves, twins included; optical Eratosthenes gratings (arXiv:1910.10751); Jason Davies "El Patrón de los Números Primos" (2012, after Omar E. Pol); Ventrella, *Divisor Drips and Square Root Waves* |
| Growing wheel: each prime multiplies pattern width by p | **classical** | Sieve of Pritchard, the "dynamic wheel sieve" (1979); "Explaining the wheel sieve", *Acta Informatica* 17 (1982) |
| Crystallization (below p², possible = actual, final forever) | **classical** | The sieve p² rule; Pritchard 1982's correctness lemma is nearly verbatim. Older than that: Dickson, *History*, vol. I, p. 436 credits the same 1857 Smith paper with "a theoretical method of finding the primes between the xth prime P_x and P²_{x+1}, given the first x primes" — which is the zone (p, p′²), stated as a method |
| Copying Theorem, D_{n+1} = Dₙ(p−2) | **classical** | OEIS A059861; Schemmel totient (1869); periodicity remarked by **H. J. S. Smith, *Proc. Ashmolean Soc.* 3 (1857) 128–131 = Coll. Math. Papers I, p. 37** (Dickson, *History*, vol. I, p. 439: after deleting the multiples of 2, 3, …, p the survivors "form a periodic series of period 2·3…p; and similar theorems. Like remarks had been made previously by H. J. S. Smith"); standard CRT argument |
| Mirror/palindrome of the wheel | **known-obscure, and in print earlier than we recorded** | Dickson, *History*, vol. I, p. 439, on A. de Polignac's "diatomic series" (Comptes Rendus Paris 29 (1849) 397–401; Nouv. Ann. Math. 8 (1849) 423–9): "That series is periodic and the terms after 1 of the period are symmetrically distributed (two terms equidistant from the ends are equal), while the middle term is 3", with φ(πₙ) terms in the period. That is the palindrome and the census, stated together, in 1849. Also one line in Wikipedia (wheel factorization, storage symmetry); folklore gcd(r,n)=gcd(n−r,n). What we can still claim is the *use* as an organizing device, not the observation |
| Euclid-in-moiré (survivor ⇒ new prime factor) | **classical** | Euclid IX.20; primorial variants catalogued in Meštrović's survey of 180+ proofs (arXiv:1202.3670) |
| Zone Equivalence (TPC ⟺ zones occupied i.o.) | **possibly novel as stated, logically lightweight** | Not found as a stated biconditional, searched under **twin-Legendre**; `SEARCH-CONVENTIONS.md` §1 carries no owning convention for the biconditional form itself, so read that negative as our framing rather than as a calibrated search. Stronger open conjectures published: twin-Legendre (A192870 is the n-tuplet generalisation, whose n = 2 entry is the twin case; the twin-specific sequences are OEIS A091591/A091592), twin-between-(pₙ−2)²-and-pₙ² (arXiv:2210.15487) |
| e^{2γ}/4 ≈ 0.7931 twin Mertens-bias constant | **known-obscure** | Explicit in Táfula, arXiv:1508.05702 (v1 2015, v5 2019; published São Paulo J. Math. Sci. 2020) — his §2 says the growth order agrees with Hardy and Littlewood's conjecture, "missing its constant only by a factor of" 4e^{−2γ}; mechanism = Hardy–Littlewood 1923 §4; single-prime e^γ/2 version in Granville's Cramér essay |
| Empirical HL-accuracy of twin counts | **classical tradition** | Brent, *Math. Comp.* 29 (1975) — fluctuations of π₂ − L₂ to 8·10¹⁰; Nicely to 10¹⁴⁺ (the Pentium-bug computation); tabulated to 10¹⁹ |
| Iwaniec bound g(q) ≪ ln²q (one class per prime) | **classical** | Iwaniec, *Demonstratio Math.* 11 (1978): h(k) ≤ C(k ln k)², constant inexplicit; see Erdős Problem **#970**, which carries the h(k) form. #687 is the same theorem in the Y(x) ≪ x² currency and carries the $1000 |
| Lower bounds / true order of g(P#) | **classical** | Rankin 1938; Pintz 1997; Ford–Green–Konyagin–Maynard–Tao, *JAMS* 31 (2018): Y(x) ≫ x·ln x·lnlnln x/lnln x; Maier–Pomerance conjecture Y(x) = x(ln x)^{2+o(1)} |
| **G₂ (difference-2 twin Jacobsthal) as a studied object** | **rediscovery — it is OEIS A144311, published 2008** | This row read *possibly novel*, with the sequence 12, 30, 42, 66, 108, 150, 204, 258 listed as **not in OEIS**, for five waves; that verdict is withdrawn. The ladder is absent at *our* convention, which is a real negative and a worthless one; the shifted ladder `G₂ − 1` returns **A144311** (Carter 2008, 22 terms) immediately — see the A144311 bullet below and `SEARCH-CONVENTIONS.md` §2. Also close: Ziller–Morack's *paired* Jacobsthal h₂ (arXiv:1706.00317/1706.03668, 2017; OEIS A288815 = 6·A072753+6) which takes the worst case over ALL even differences; G₂ ≤ h₂ confirmed by our data at every level |
| Reduction "gap bound ⇒ TPC" | **published in stronger form; our refinement unpublished** | Ziller–Morack Thm 4.1 (2017): h₂(n) < pₙ²−pₙ for ALL n ⇒ Goldbach + prime pairs of every even difference. Our version needs only difference 2 and only infinitely often — strictly weaker hypothesis; that refinement is not in either of their papers or in their OEIS entries, searched under the **paired Jacobsthal function** (arXiv:1706.00317, A288815), which is the convention that owns the reduction |
| Iwaniec-type upper bound for 2 omitted classes per prime | **OPEN — no published bound found** | Ziller–Morack prove no unconditional bound (theirs is conjectural); FKMPT "Long gaps in sieved sets" (JEMS 2021) needs ~1 class per prime on average — does not cover 2 per prime. The open problem behind our Gap Reformulation. Searched in the owning convention, **bounded number of residue classes per prime** (MathOverflow 88323) and A144311's wording, 2026-08-18; `SEARCH-CONVENTIONS.md` §3 carries the negative |
| Exact window-variance formula, one class | **classical** | Hausman–Shapiro, *CPAM* 26 (1973); Montgomery–Vaughan, *Ann. of Math.* 123 (1986) — moments at Poisson scale, "almost all intervals" for totatives |
| **Exact two-class (twin) variance formula + sub-Poisson scaling law + *almost all length-p² windows contain a twin slot*** | **possibly novel as stated, on an uncalibrated search** | Aryan arXiv:1302.2296 (k-tuples of reduced residues, order-of-magnitude only); Bloom–Kuperberg arXiv:2312.09021. Exact finite-primorial formula and the window statement: not found — but `SEARCH-CONVENTIONS.md` §1 records no owning convention for the two-class window variance, so the search was run in our own wording and the negative carries the weight that entails, which is little |
| Parity problem (why sieves can't finish this) | **classical** | Selberg 1949; Tao's 2007 exposition: sieves "unable to provide non-trivial lower bounds" for fixed-parity sets; Friedlander–Iwaniec, *Opera de Cribro* (2010). A 2026 unrefereed Zenodo deposit (Ojaroudi, 10.5281/zenodo.18509488) claims an unconditional twin-prime theorem by importing a Selberg quadratic-form LOWER bound from Opera de Cribro Ch. 7, where none exists; its §8 heading says "the remaining parity barrier" and the word parity appears nowhere in its body. Read at source; full record in the Ojaroudi section below |
| "Prime detection as beats/aliasing" | **apparently unworked** | Nearest: coprime-sampling arrays in signal processing (never turned around to detect primes). Searched in that field's own convention, **coprime sampling / coprime sensor arrays**, not in ours; `SEARCH-CONVENTIONS.md` §1 has no row for the reverse direction, so nothing calibrates the negative |

## Bottom line

**Rediscovery, prolific and correct, spanning 170 years** — from H.J.S. Smith
(1857) through Iwaniec (1978) to Táfula (2015). Every load-bearing classical
fact was independently refound; that is the paper's credential, not its flaw.

**Three candidate novelties survived the audit** — as the audit stood on
2026-08-13. Item 1 was cut back on 2026-08-18 by A144311; read it as amended:
1. **G₂, the difference-2 twin Jacobsthal function.** The object and its values
   are **not** ours: they are **OEIS A144311**, published by Carter in September
   2008 and carrying `G₂ − 1` to 22 terms. What survives is the measured growth
   exponent (1.50 ± 0.05 for G₂ on the 22 trusted terms, 1.57 ± 0.06 for h₂,
   bracket 1.3 to 1.8, floor 1), the "difference 2 + infinitely often" weakening of Ziller-Morack's
   reduction, and the covering identity read as an identity rather than as an
   algorithm. Search the object under A144311's own wording, never ours;
   `SEARCH-CONVENTIONS.md` §1 gives it.
2. **The exact two-class variance formula** (script 06) and the certified
   "almost all windows" bounds. Var/E drifts rather than sitting at a constant;
   the stable law is ln(Var/E) ≈ −(0.24u² + 0.13u).
3. **The synthesis**: moiré vocabulary + primorial period + palindrome-as-
   centerpiece as one pedagogical unit; plus the untouched beats/aliasing angle.

**Required honesty when publishing:** cite Petersen et al. (PRL 2019), Pritchard,
Davies/Pol, Ziller–Morack, A288815/A072753, Hausman–Shapiro, Montgomery–Vaughan,
Aryan, Táfula, Brent, and Tao's parity exposition. Present Zone Equivalence as a
framing device, not a result. Never imply the wave framing is new — physicists
put it in PRL; we bring the vocabulary, the twin-gap object, and the audit.

## Before you search: read `research/SEARCH-CONVENTIONS.md`

**Mandatory, and it is the most expensive lesson in this file.** Every search
this project ran for five waves was calibrated, was a genuine clean negative,
and was worthless, because it was run in *our* vocabulary. `SEARCH-CONVENTIONS.md`
holds the map from our terms to the wording the literature actually uses, the
search moves that work against the ones that silently fail, the questions
already settled so they are not re-asked, and the `β₂` literature so it is not
re-derived. It also lists what is still open, so coverage is not confused with
absence.

## Provenance: what artifact was actually read

**The standing rule, adopted 2026-08-18.** A quotation attributed to external
work must record **which artifact it was read from**, beside the quotation. The
PDF of record — arXiv's or the publisher's — is the only thing that counts as
verification. These do not:

- an **ar5iv or arXiv HTML rendering**, which is a machine translation of the
  LaTeX; it drops, reflows and renumbers, and it is the layer that produced the
  FKMPT constant this repo carried and later retracted at source;
- an **abstract page or a search snippet**, never sufficient for a theorem
  statement and always sufficient-looking;
- a **restatement inside a third paper**, where the citation says A and the
  reading was B quoting A.

A quote from any of those is not wrong. It is **unverified**, which is a
different claim from the one a document makes when it writes "verbatim".

`research/lit-provenance.js` inventories every attributed quotation in the
corpus, resolves what it is attributed to, and reports which carry a provenance
note. Its output is a work queue, not a verdict. It carries five hand-read
known positives from `two-class-lower-bounds.md` and **exits non-zero if it
cannot find them**, because the first version of it matched only surnames and
arXiv ids, missed every quote introduced by possessive ("Their Definition 1,
verbatim:"), and undercounted the corpus by 61%. A sweep that cannot find what
is known to be there is worse than no sweep, because it reads as coverage.

Two things the inventory reports that are findings in themselves. A source that
resolves only to a bare surname cannot be followed mechanically. And an
**inherited** attribution — a possessive whose subject is whatever the document
last named further up — cannot be followed without reading the document in
order, which no future reader will do.

**One primary source is already on disk and was being cited as if remote.**
`attestation/book-ch5-6/` holds page photographs of Diamond and Halberstam,
*A Higher-Dimensional Sieve Method*, Cambridge Tracts 177. **Theorem 9.1
(p. 104) and the sifting limit at p. 79 were checked against the pages
themselves** on 2026-08-18 and match the corpus word for word — with the one
correction that p. 79 prints **`β₂ ≈ 4.266`**, three decimals. Our 4.2665 is a
correct four-decimal rounding and `dhr-verification.md` §1 blesses it, but the
digits may not be **attributed** to that page, nor to Franze's Table 1, which
also prints three. The twenty-decimal value is Booker and Browning,
*Square-free values of reducible polynomials*, Discrete Anal.

**Halberstam and Richert, *Sieve Methods* (1974), Corollary 2.4.1 is
UNREACHABLE** and is recorded as such rather than as verified. Fourteen routes
were tried, none legitimate and available: Internet Archive search-inside
returns "Item not available", OpenLibrary 500s, HathiTrust and zbMATH 403, and
Google Books serves no snippets. A full-text grep for "2.4.1" across thirteen
downloaded papers likely to cite it returns **zero hits**. What corroborates it:
Perlego publishes the chapter list, and Chapter 2 is "The Combinatorial Sieve",
so a Brun-sieve corollary giving `π₂ ≪ X/log²X` is coherent there; Ford's course
notes state that content independently as their Cor. 2.6. **Corroborated, not
verified** — and the distinction is the whole point of this section.

## Search-coverage caveats
US-English web search; YouTube transcripts, non-English math-art, and exhaustive
arXiv/zbMATH sweeps not performed. "Not found" ≠ "does not exist" — but the
searches were specific and multi-angle (three independent agents, ~90 queries).

---

## Ziller and Morack 2017: the paired Jacobsthal, and our Zone Postulate (found 2026-08-16)

OEIS **A288815** "Paired Jacobsthal function applied to the product of the
first n primes" (Mario Ziller 2017, 21 terms, keyword `hard,more`) carries the
comment: *"If a(n) < p_n^2 - p_n holds for n>=3 then Goldbach's conjecture and
the twin prime conjecture hold as well."* That is exactly the Zone Postulate
condition of research/ZONE-POSTULATE.md, published nine years before we
reached it, and in the STRONGER adversarial form (max over all choices of two
residues per prime, against our single arithmetic choice {0, -2}).

Papers: Ziller and Morack, arXiv:1706.00317 and arXiv:1706.03668.
Companion sequence: A072753, maximum gap in two-stage prime sieves, 19 terms,
already known to this repo through the 2D-Rankin work; a(n) = 6*A072753(n)+6.

Our own G2 ladder (2,6,12,30,42,66,108,150,204,258,348,528) is in OEIS one
offset away: it is **A144311 + 1**, published 2008. The "checked at three
offsets" that once stood here was wrong about its own coverage — the −1 offset
returns A144311 at once, and `SEARCH-CONVENTIONS.md` §2 is the record of how
that was missed. The ladder is a strictly smaller quantity than A288815,
verified at all twelve shared terms. Full discussion and the numbers in
research/U-FRAME.md section 6a.

DO NOT claim the reduction. Cite them.

---

## Holt and Rudd, 2007 to 2026: the cycle of gaps (found 2026-08-17)

The largest prior-art finding this repo has made. Fred B. Holt, with Helgi Rudd
on the earlier papers, has run a programme since 2007 that independently
occupies most of our frame. About fifteen manuscripts, listed at
primegaps.info, code and data at github.com/fbholt/Primegaps-v2.

**We found this by searching before publishing, not before working.** The repo
built its version of these objects from the corpus and from first principles
over 2020 to 2026, and reached the same structures without knowing the
programme existed. That is the same credential the 2026-08-13 audit already
recorded for Smith, Schemmel, Iwaniec and Tafula, and it is worth saying that
several of these results reached print only in the late 2010s and some only in
2025 and 2026, so a corpus written in parallel could not have absorbed them. Independent arrival is the credential. Priority is theirs, and we cite it.

### The correspondence

| our object | Holt's | source |
|---|---|---|
| the tile T_x | cycle of gaps G(p#) among generators of Z mod p# | 1408.6002 §2 |
| the fold | R1/R2/R3: identify next prime, concatenate p copies, close adjacent gaps | Lemma 2.1 |
| kills, closures | **fusions** | 2603.25915 §1 |
| Copying + Redundancy Lemma | Thm 2.3, each possible closure of adjacent gaps occurs exactly once, by CRT | 1408.6002 |
| twin-slot census prod(q-2) | N2(p#) = prod(q-2), "Twin Generators" | 1408.6002 §4 |
| **A9 histogram transfer operator** | transfer matrix M_J, binomial eigenvectors, closed-form eigenvalues a_j, "driving terms" | 1408.6002 §5 and §5.1 Table 1, **2014** |
| the zone (p, p'^2) | **Delta-H(p_k) = [p_k^2, p_{k+1}^2], the "interval of survival"** | 2603.25915 |
| crystallization frontier | **"horizon of survival"** p_{k+1}^2 | 2603.25915 |
| HL Conjecture B recovered from tile structure | w_{g,1}(inf) = prod (q-1)/(q-2) | 1408.6002 §6 |

### Consequences for our record

**A9 is demoted.** The histogram transfer operator of `research/U-FRAME.md` §11,
stated in full in `research/operator-and-pair-count.md`, is a rediscovery of Holt
and Rudd's 2014 discrete dynamic system, including the eigenstructure with
binomial left and right eigenvectors. The A9 engine and its 42 exact diagonal
points are still ours as computation; the operator is not ours as an idea. Both
documents carry the demotion in terms and instruct that nothing there be
presented as new structure. The eigenvalues are theirs as well, not only the
eigenvectors: §5.1 and Table 1 of 1408.6002 print the whole spectrum in closed
form, `a_j = prod_{17<=q<=p} (q-j-1)/(q-2)`, with `a_2 = 0.10206751799779` at
`p = 999,999,999,989`, so the operator's mixing rate `a_2 ~ 2.82/ln p`
**[SCRATCHPAD-GRADE**, the constant flat to four decimal places across four
decades `z = 10^4` to `10^7`, and extrapolating to the printed value at a
relative `1.8e-5`; measured twice, never inside an embedded producer**]** is a
consequence of a published formula and priority for it is Holt and Rudd's, as it
is for the eigenvectors, while what this corpus held beforehand was the
per-prime `(p-j-1)/(p-2)` of the bidiagonal form and not the product over primes
(`history/staging/lit-pdf-holt-rudd.md` line 259;
`history/staging/recon-0829-farfields2.md` §3e, corrected at
`history/staging/redteam-0829-measure-c.md` §1h).

**The Localized Merge Lemma's mechanism is his.** Lemma 3.1 of 1408.6002,
restated in 2603.25915 §1: *"the minimum span between fusions is 2p_{k+1}. So
provided that |s| < 2p_{k+1}, the possible fusions in s all occur in separate
images of s."* See `research/LOCALIZED-GAP.md` §9 for what remains ours, which
is the two-class form and the application to a maximum gap.

**His stated open problem is our question.** From 2603.25915: *"We propose to
develop primorial coordinates for Hagedorn's examples, to see how the instances
of large gaps are situated within the cycles of gaps G(p_k#) relative to the
horizon of survival p_{k+1}^2."* And *"If Legendre's conjecture holds, then the
largest gaps g >= 4p+6 have to occur beyond the horizon of survival."* He does
not pursue either. He also records that Hagedorn's Jacobsthal values
*"consistently exceed the bound 2p_k"*, which is the same observation as our
"the merge condition never turns on for G2 on the full tile".

### The warning, and it is the useful part

Holt's Legendre result (2603.25915 Theorem 3.3, the quadratic density of a gap
increases across all later stages) rests on **Conjecture 2.1, "approximate
uniformity", explicitly a conjecture supported by samples and not proved.** That
is exactly the failure mode `research/ZONE-POSTULATE.md` §7 named in advance:
"the most likely failure mode is an argument that silently assumes the tile's
slots are equidistributed in the zone, which is the conjecture." A published
programme with two decades behind it walked into it. Our triage rule caught it
before we found the example, which is the strongest evidence the rule is worth
keeping.

### Also checked, same sweep

- **Grob and Schmitt**, arXiv:1905.03117 "Cycles and Patterns in the Sieve of
  Eratosthenes" (2019), and **Grob alone**, arXiv:2107.06950, the twin-primes
  sequel (2021): a two-class "Sieve of Twins" with the prod(p-2) count. Same
  census, no gap recursion, no maximum-gap work.
  *Two citation traps, verified against the arXiv abs pages, the arXiv API and
  both PDF title pages, 2026-08-18.* The 2021 paper is **single-authored** —
  Schmitt appears in it only as "this author and M. Schmitt" describing the
  earlier paper. And its "Part 2" is printed on the PDF title page but is **not**
  in arXiv's metadata title, which reads "Cycles and Patterns in the Sieve of
  Eratosthenes, Potential Twin Primes"; a search on the printed title can miss
  it. Neither paper has a journal version, only the auto-assigned arXiv DOIs.
- **Kourbatov**, "Maximal Gaps Between Prime k-Tuples: A Statistical Approach",
  J. Integer Seq. 16 (2013) 13.5.2 = arXiv:1301.2242. **Owns the maximal-twin-gap
  law outright.** Table 1 fits record twin gaps against log³p by decade —
  slopes 0.4576, 0.4756, 0.5203, 0.5628 below 10⁶, 10⁹, 10¹², 10¹⁵ — with the
  stated ceiling *"Maximal gaps between twin primes are less than 0.76 log³ p"*.
  Credits **Rodriguez and Rivera's Conjecture 66** for the linear-in-log³p
  shape; the non-linear refinements go to **Fischer [6]**, *Maximale Intervalle
  von Primzahlenpaaren*, **2006**, with Wolf — *not* to the 2008 *Maximale
  Lücken* preprint, which is his **[5]** and is cited for computation instead.
  Wolf's "G₂(x) in terms of π₂(x)" is a **personal communication**. This is
  **OEIS A113274**, listed one bullet down since 2026-08-17.
  *`0.76 = 1/(2C₂)` is OUR inference and he never writes it.* It holds —
  `1/(2 × 0.6601618) = 0.75739`, via his statement (B) and note 5 — but `C₂` is
  0.6601618 in our notation and 0.75739 in his, so it is true only read in ours.
  **Verified against the JIS published article**, all four items verbatim
  (`history/staging/lit-pdf-kourbatov-grob.md`). The "one-slope-fits-all"
  sentence was rewritten twice and only v3 and JIS read as we quote it.
  *Collides with ours:* the block campaign's anchored `max A = (0.49 ±
  0.09)·ln³v` re-measures his Table 1 on a range he covers, and the "flat over
  nine decades" reading is refuted by his own sentence under that table ("This
  is not a 'one-slope-fits-all' situation!"). Retracted in `ZONE-POSTULATE.md`
  2026-08-18; the guard now cites his 0.76 instead, which is stronger than what
  it replaced, and since 2026-08-20 it is checked record-exact at all 82
  published records — worst load 0.8434, no breach
  (`research/a113274-gap-records.js`). His 0.76-ceiling constant also appears
  on Luhn's live record page as the merit normalization 1.32032363 = 2C₂ —
  the record-tracking community operates inside the same HL normalization the
  corpus adopted.
- **Kourbatov–Wolf**, *Predicting maximal gaps in sets of primes*,
  arXiv:1901.03785 = Mathematics 7 (2019) 400 — **the 2013 paper's own
  successor, and it sharpens what "the law" is** (read at page image twice,
  sha256-matched: `history/staging/zonegap-prior-art.md`,
  `import-kw-zonegap.md`). Trend `G_c(x) ∼ (x/π_c(x))·(log π_c(x) + O_k(1))`;
  the **Generalized Cramér conjecture** makes the ln^{k+1} ceiling an
  *almost-all* statement (zero proportion of a record sequence they themselves
  conjecture is log-sparse — it tolerates infinitely many breaching records,
  so even granted in full it cannot say "every zone"); Generalized Shanks as
  the asymptote; Gumbel-distributed rescaled records; `C_{2,H} = 1.32032363`.
  **"Theorem" occurs zero times in the paper** — everything is conditional on
  their k-tuple infinitude + equidistribution conjectures (the latter stronger
  than Hardy–Littlewood by their own Remark 3(ii)), so the framework may
  consume our data and may never feed a derivation
  (`history/staging/import-kw-zonegap.md`, the circularity cell). Data to
  10¹⁴.
  **The 2013 predecessor also owns the location statistic, not only the law**
  (`history/staging/lit-kourbatov-shortfall.md`, read at page image): JIS 16
  (2013) 13.5.2 §5.1 sets `b ≈ 1.2597` for twin primes as the value making
  `E_1 = a log(p/a) − ba` median-unbiased for maximal gaps below 10¹⁵, and §5.2
  refines it as `−b = µ* + γ` from the Gumbel fit with mode `µ* = −1.659`. The
  repo's record-location deficit is that `b`: the 6.0% shortfall is
  **documented in print, and explained in neither corpus**, so the novelty word
  available for it is "independently measured", never "first".
- **The Legendre-type twin conjectures — the square-window neighborhood of
  the Zone Postulate is owned; the zone's lower end and the per-zone gap
  object are not.** Kourbatov 2013 §7 (refereed, conditional on his (B)):
  twins between n² and (n+1)² for n > 122 and between consecutive cubes —
  the closest refereed statement. OEIS **A192870** (Kourbatov 2011), the
  threshold form, whose comment states a constructive proof would give TPC +
  Legendre "with a trivial additional step". **A091592**'s first terms trace
  to a de.sci.mathematik newsgroup thread on twins between (2x−1)² and
  (2x+1)². **Majid's Conjecture 86** (primepuzzles, Azimi 2020): a twin pair
  between consecutive odd squares, tested to 10⁹. Sharpest neighbor: the
  **withdrawn** Oehlschlägel "Twin recursion conjecture" (arXiv:1411.6582v1,
  2014; withdrawn 9 Aug 2015 for "a crucial error in Lemma 8.4"): a twin pair
  between p² and p′² of successive primes — which strictly implies the strong
  Zone Postulate (statement verified verbatim at page image, twice). All five
  are squares-to-squares forms; none uses (p, p′²)'s lower end and none
  studies a per-zone gap function (`history/staging/zonegap-prior-art.md` §§2–3).
- **The OEIS twin-count-per-window family owns the zone's COUNT object.**
  **A057767** (2000): twin pairs between consecutive prime squares, with
  Hasler's 2019 TPC-equivalence comment, a conjectured record-low ladder, and
  empirical a(n)/n ≳ 1/11. **A273257** (2016): twin pairs in
  (prime(n), prime(n)²) — equal to the zone (p, p′²) pair count up to one
  index shift (no prime lies in (p, p′)), b-file to n = 10⁴. Also A308777
  (members, 2019, + Birdsey–Schay arXiv:1906.09220), A143738 (all n, 2008).
  The per-zone MAX-GAP object Z₂, the head/tail slacks, and the envelope-step
  ladder remain absent from OEIS at the flip-search discipline (33 calibrated
  queries, `history/staging/zonegap-witnesses.md` §2).
- **Data carriers for the twin-gap records**: Luhn's pzktupel.de GAP02 is
  A113274's live continuation channel, cross-checked record-exact 82/82
  against A113274/A113275 with its merit column reproduced as 2C₂·∫dt/ln²t
  (`research/twin-gap-witnesses-01.js`); certifies "below 1.00·10¹⁷"; carries
  the discoverer ledger Rathbun/Wolf/Fischer/Oliveira e Silva/Smith/Ritschel/
  Raab 1998–2021. Kourbatov's tables paper arXiv:1309.4053 Table 2 is a
  second witness for records 1..72, exact. Oliveira e Silva's first-occurrence
  twin-gap table (exhaustive to 1.6·10¹⁶) is adopted at
  `research/tos-twin-gaps-1e16.txt`.
- **Brady, thesis — UNCITED PRIOR ART, found 2026-08-18, and it names our
  problem. The reconciliation instruction attached to this bullet was
  discharged the same day, and it withdrew half of what the bullet claimed.**
  *Sieves and Iteration Rules*, Zarathustra Elessar Brady, Stanford doctoral
  dissertation, June 2017, adviser Soundararajan, **MathSciNet MR4239958**
  (verified by the adjudicator 2026-08-19 via MR Lookup, so this thesis IS
  indexed and the earlier reading that it was not is withdrawn); fetched from
  `notzeb.com/phd-thesis.pdf`, sha256 `792ec8f3…`, printed↔PDF page offset +7.
  **His p. 1 names our exact system**: *"When the sifting dimension κ is 2 and
  the congruence classes chosen modulo each prime p_i are 0 and 2, we see that
  sufficiently strong bounds for this problem might imply the twin prime
  conjecture."* He **gives no bound at any exponent, anywhere in the thesis**;
  `twin` occurs exactly three times in the whole document.
  **His Problem 3 (p. 12) is NOT our covering problem**, on three counts
  [VERIFIED 2026-08-18]: it is a decision problem over an **arbitrary** finite
  `A ⊂ ℤ`, it supplies **one** class per prime (he says so himself — with `A` an
  interval it is the Jacobsthal problem), and his twin instance `A + c` shifts
  the **value** `n(n+2)+c` rather than the argument, which is a genuinely
  different optimum: the two disagree at `x = 5` (17 against 11) and at `x = 11`
  (65 against 41), while the argument-shift column reproduces A144311 exactly.
  The two-class setting is his **Problem 2** (p. 1), about which he proves
  nothing computational.
  **His NP-completeness (Theorem 9, p. 13) does not reach our family either**:
  Problem 4 requires each prime to supply a **partition**, and `{a_p, a_p−2}` is
  a 2-cover at every odd prime and never a partition [VERIFIED]. **It licenses
  nothing about the exponent** — the hardness lives in the adversarial choice of
  `A`, and our object is a single fixed sequence of instances, which has no
  complexity. What does carry over is his p. 12 sentence that a bound at the
  `z²` scale *"would be a much stronger claim than the twin prime conjecture"*,
  which corroborates `G2-STATE.md` §1c's strong form. Full reconciliation in
  `history/staging/attack-np-licenses.md`.
  **And `zeb` is Brady.** MathOverflow user 2363 `zeb`, whose 2011 answer 52890
  demoted our *technique*, publishes `website_url: https://notzeb.com`, the host
  serving this thesis, and the thesis's Chapter 8 (p. 103, *Linear sieve and the
  Jacobsthal function*) runs that same technique in print. The technique demotion
  and the object collision are **one source, not two independent ones**
  [VERIFIED via the Stack Exchange API].
  His §9.6 (p. 133) also supplies the fractional-retention window
  `(α_κ, β_κ+1)` that closes that lead — see `sift-limit-attack.md`.
- **FKMPT's 2023 corrigendum: read, checked, and CLEAN.** `Corrigendum: Long gaps
  in sieved sets`, J. Eur. Math. Soc. **25** (2023) 2483–2485, DOI
  10.4171/JEMS/1305, MathSciNet MR4592874. **It was already read on 2026-08-18**
  — `covering-dive.md` §2.3 carries its Appendix A verbatim — and a dedicated
  verification pass on 2026-08-19 confirmed that **nothing load-bearing in this
  corpus is affected**. What it changes: `4+δ → 6` in `C(ρ)`, `C(ρ) > e^{−1−6/ρ}`,
  `C(1) > 1/835`, `C(1/d) > e^{−(6d+1)}`, **`C(1/2) > 1/325565`** and
  `6 < M ⩽ 7`; the rest is proof-internal. Every one of those corrected constants
  is already the value this corpus uses. Of 25 FKMPT citations audited, 22 are
  clean. **Do NOT "correct" Remark 7 to Remark 4**: 7 is the number in the
  published text, 4 is the same passage in the Dartmouth preprint, and
  `covering-dive.md` §2.3 records that trap. *(Residual: two page numbers rest on
  an earlier session and are UNVERIFIED; the standalone JEMS PDF and MathSciNet
  were not retrievable in the verifying session.)*
- **Maier and Pomerance 1990 is the earliest two-classes-per-prime sieve device
  in print**, found 2026-08-19 via the zbMATH review. It is a **lower**-bound
  device, so it does not touch the upper-bound novelty sentence, but it does
  retire any suggestion that the *configuration* of two residue classes per
  prime is itself new here. Nothing in this corpus should describe the
  two-class setting as unexplored.
- **Blight, thesis — a second independent source for β₂, and a correction.**
  Her p. 8 §2.2.2 states verbatim that *"The Diamond-Halberstam sieve is an
  infinite iteration of the Ankeny-Onishi sieve"*, and the same page prints
  `β₂ = 4.266450`. Her p. 6 §2.1 is the source of the "Selberg's limit is `2κ`"
  reading — but she writes `2κ`, never 4, and calls it a proposal: *"a lower
  bound sieve with a sieving limit of 2κ has not been found for κ > 1."* Her
  p. 7 records `β_κ < 2κ` already achieved for `½ < κ < 1`. **So `2κ` is a
  target, not a floor**, and any claim of a ceiling at 4 for `κ = 2` is
  unsupported.
- **Kalmynin and Konyagin**, *A polynomial analogue of Jacobsthal function*,
  arXiv:2302.00459, **Izv. Math. 88:2 (2024) 225–235**, DOI 10.4213/im9467e.
  **Added 2026-08-18; this file had no row for it while `covering-dive.md` §4.2
  had recorded it since the 17th and handed the correction back by name.** They
  publish a **multi-class Erdős–Rankin construction** and run the **dimension-2
  Mertens ledger**, which refutes two blanket "ABSENT" rows that stood in
  `two-class-lower-bounds.md` §2. Theorem 1 verified identical across arXiv v1,
  v2 and the publisher PDF.
  *What still separates it from G₂.* Their object `j_f` is a shift of the
  **value**; G₂'s covering formulation is a shift of the **argument**. At
  f = x(x+2) their fibre is {−1 ± √(1−x_p)} — fixed centre, varying separation
  — against our {a_p, a_p−2} — varying centre, separation fixed at 2. So
  Theorem 1 may not be evaluated at f = x(x+2) and read off as a G₂ bound. The
  words "twin", "dimension", "two classes" and "k-tuple" occur zero times in
  all three versions.
- **Banks, Ford and Tao**, *Large prime gaps and probabilistic models*,
  arXiv:1908.08613. **Their model R is ONE class per prime** — (1.9)–(1.10),
  p. 5: `S_z := Z \ ⋃_{p⩽z}(a_p mod p)`. A same-day audit demoted our
  Beyond-Chebyshev ensemble work as "the ensemble is Banks–Ford–Tao's model R";
  **that demotion does not stand as worded.** Our rotation ensemble is the twin
  subset {n ∈ R, n+2 ∈ R}, which is precisely their **§1.7 Open Problem (3)**,
  posed as open, and which they say "likely will involve a different extremal
  sieve problem". Citing them against our bounds inverts what they wrote. They
  are nonetheless the right uncited reference for the model, and were absent
  from `natal-cap-19`, `-21`, `-31` and `anchored-calm`.
- **OEIS A144311 — Andrew Carter, September 2008 — IS our G₂ ladder, and this
  file said it was absent for five waves.** *"The length of the longest sequence
  of consecutive integers, each equal to 1 or −1 modulo at least one of the
  first n primes."* Their `m` is our `r + 1`, so `m ≡ ±1 (mod p)` is exactly
  `p | r(r+2)`; the object is `G₂ − 1`, the covering optimum, with the same
  fixed classes `{0, −2}` and no free translate. **The same object, not an
  analogue.** Terms: 1, 5, 11, 29, 41, 65, 107, 149, 203, 257, 347, 527, 545,
  617, 707, 869, 965, 1079, 1283, 1397, 1529, 1709 — **22 of them**, agreeing
  with all fourteen of ours and carrying eight more, which put the exact ladder
  at x = 79 rather than 43.
  **Why five waves missed it, which is the transferable part.** Every search was
  run on `G₂`, never on `G₂ − 1`, and the searches on `G₂` genuinely do return
  nothing — the fourteen-term ladder and both offset variants still do. A144311's
  text contains no "Jacobsthal", no "twin", no "primorial" and no "gap".
  **Correction, 2026-08-18, checked at the record rather than relayed: it DOES
  cross-reference A048670**, which this corpus cites. What saved it from us is
  that the citation is **one-directional** — A048670's own `%Y` reads A048669,
  A002110, A005867, A049300, A058989, A072752, A331118, and does not point back.
  Every walk we ran followed xrefs *forward*. The route that would have worked is
  OEIS's reverse-citation search, "sequences referencing A048670", which we never
  ran. **A calibrated search of the wrong convention is a clean negative every
  time, and a forward-only neighbour-walk is not a neighbourhood search.**
  **Provenance of the 22 terms, and it is three separate efforts.** a(1)–a(7)
  Andrew Carter, 17 Sep 2008; **a(8)–a(16) Max Alekseyev, 18 Nov 2009**;
  **a(17)–a(22) Jinyuan Wang, 26 Nov 2024**. The b-file carries 22 and no more.
  So for most of this project's life the published ladder stopped at a(16),
  x = 53; the extension to x = 79 is nine months old.
  Consequences: `oeis-G2-submission.md` is a duplicate and must not be sent;
  G₂(47#) = 708 is already published, so our 35.8 h price for it buys
  verification, not discovery.
- **A144311's terms are OUR IDENTITY, run as an algorithm — and that is the
  substantive hit, not the data.** Wang's C++ program, linked from the entry and
  read here 2026-08-18, is **not** a period enumeration. It reduces mod 6 (which
  is why the entry states `a(n) ≡ 5 (mod 6)` for n > 1), takes `plist` from 5 up
  with `pskip[i]` defined by `6·pskip[i] ≡ 2 (mod p_i)`, and runs a depth-first
  search over the **choice of residue per prime**, marking two classes at each —
  `j ≡ i` and `j ≡ i − skip` — under an optimistic bound `s ≥ num1` that prunes.
  That is exactly `two-class-lower-bounds.md` §1: choose one pair
  `{a_p, a_p − 2}` per prime, `a_p` free, and cover a maximal interval. **The
  CRT covering identity we proved is the operational definition somebody has
  been computing against since 2009.**
  *Which is why our terms are not redundant.* The two methods are disjoint and
  fail differently. A branch-and-bound's maximality rests on its pruning bound
  being admissible; a full-period enumeration rests on nothing but the sieve.
  Exhaustive enumeration at n = 22 would take **2.8 × 10¹⁰ years** at our
  measured 43# rate, so their terms are unreachable our way, and ours were
  produced without their bound. Fourteen levels of agreement tests both — in
  particular our 41# and 43# independently confirm **Alekseyev's 2009 a(13) and
  a(14)**. We also carry what OEIS does not: least position, multiplicity, and a
  trial-division certificate.
- **The A144311 discussion thread, Mathematica StackExchange 114758 (2016),
  reaches for our vocabulary unprompted.** The asker defines the object as gaps
  between "**relative twin primes**" — consecutive odds coprime to the first n
  primes — which is our twin slot in all but name, arrived at independently by
  someone with no connection to this work. Its top answers enumerate ranges and
  stall exactly where we would: one reports "the answer is incorrect for m
  greater than 9", the classic defect of **searching a range shorter than the
  period**, and another reduces to `≡ 3 (mod 6)` and removes `2` and `4` mod each
  prime ≥ 5 — our natal-set reduction — then asks for help chunking it, which is
  our segmented sieve. **Nobody in the thread finds the covering formulation.**
  They are all still enumerating, and the wall they hit is the one the identity
  removes. That is the clearest outside evidence of what the identity is worth.
- **The theory, searched in A144311's vocabulary at last (2026-08-18), and the
  upper bound SURVIVES.** Finding the sequence made it possible to search the
  literature in the convention that owns the object rather than in ours. Result:
  in MathOverflow 88323's "bounded number of residue classes per prime", and in
  A144311's own wording, **no published upper bound on G₂ exists at any exponent**.
  That negative was produced in those conventions and not in ours, which is the
  only reason it is worth anything; `SEARCH-CONVENTIONS.md` §3 carries it. The
  nearest thing
  is Ziller and Morack's **"paired Jacobsthal function"** (arXiv:1706.00317, PDF
  read): their `h₂(n) = j₂(pₙ#)` quantifies over *all* even differences, so
  `h₂ ≥ G₂`, and their `h₂(n) < pₙ² − pₙ` is **Conjecture 6**, one of three they
  explicitly call "alleged". Their Theorem 4.1 is an implication, not a bound.
  Nothing analytic in the paper or its 31-page ancillary.
- **β₂ = 4.26645028414864191641… has NOT been improved since Diamond–Halberstam
  2008, and the post-2008 literature is WORSE at κ = 2.** Blight 2010 gives
  < 4.45, Franze 2011 gives 4.516, *Opera de Cribro*'s β-sieve about 4.83; Brady
  2017 improves only κ = 3/2. Booker and Browning state superior sieves become
  available "once κ ⩾ 3" — not at 2. Ford's 2023 course notes still table 4.2665
  as best known. **So "improve β₂" is a closed route for us**, and our constant
  is the best available rather than a lazy choice.
- **MathOverflow 88323 (Foo, 2012) is the only other place anyone has posed this
  problem**, and it took the A144311 vocabulary to find — five waves and four
  fresh MO queries in our words missed it. It sets up the bounded-classes-per-
  prime question and defines a `g_f(n)` whose **f(x) = x(x+2) case is exactly
  G₂**. Paseman's reply is the single bound-shaped claim in this literature and
  it opens *"I have no proofs to offer"*: a heuristic `O(2^{C log n log log n})`
  sketch, never carried out. **[Whether that shape is weaker than our
  x^{4.2665} depends on reading their n; not yet checked, and it should be.]**
  **RESOLVED 2026-08-18: Paseman's heuristic is WEAKER than ours.** His `n` is
  `ω(m)`, confirmed four ways and decisively by his own **arXiv:1311.5944**,
  which cites MO 88323 and gives `g(n) < k^{3 + 3.81 log log k}` for `k` the
  number of distinct prime divisors. So his shape is
  `k^{0.693·C·ln ln k}` — **exponent unbounded** — against our
  `x^{4.2665} = k^{4.2665+o(1)}` — **exponent fixed**. Ours wins asymptotically
  under every log base and every reading of `n`. The crossover is undeterminable
  because `C` is unspecified and base-2 against natural differs by eight orders.
- **⚠ MathOverflow 37679, answer 52890 (zeb, 2011) — THE UNWELCOME FIND, and it
  narrows our novelty.** It already derives **`j(x#) ≪ x^{4.032}`** from a
  sieve's error exponent: **our exact shape, at dimension one.** The arithmetic
  was re-verified here and the exponent sits on `pₙ`, as ours does. **So the
  technique — reading a Jacobsthal-type bound off a sieve's error exponent — is
  not ours.** What remains ours is the **dimension-2 instantiation**, and every
  claim about the β₂ theorem should be phrased that way.
  **The closeness of 4.032 to 4.2665 is a COINCIDENCE and must never be
  tabled beside it** — different dimension, different sieve, different constant.
- **Fischer and Rivera do not study our object.** Their pages were retrieved in
  full 2026-08-18. Both concern maximal gaps between **actual twin primes**,
  which shares the symbol `G₂` with ours and is a different object. No bound in
  either. Recorded because the symbol collision is exactly the kind of thing that
  produces a false prior-art hit or a false all-clear.
- **Max Alekseyev, who extended A144311 in 2009, wrote nothing on it.** This was
  the highest-risk lead in the sweep — a professional who had touched the object
  — and it is closed hard: zero hits for "prime" across 158 publications.
- **Jinyuan Wang holds an unpublished A144311 `a(23) ≥ 1859` with a witness**,
  recoverable only from that entry's OEIS revision log. Not in the b-file, not
  in the DATA.
- **Coverage gap, disclosed:** the 2009 SeqFan archive thread was not read, blocked
  by four Internet Archive 503s. That is the one place a bound could still hide.
- **OEIS, otherwise.** The localized ladder (150,204,300,318,378,402,432)
  returns nothing. Existing relevant entries stay A048670 (Jacobsthal h(p#)),
  A288815 and A072753 (Ziller-Morack paired), A091592 and A113274. A288815 is
  unchanged at 21 terms ending 2622 (its 2026-04-12 revisions touched only link
  lines); A072753 unchanged at 19 terms ending 436, last edited 2017.
- **Hagedorn** is the computational prior art for maximum gaps in the cycle.

### Full corpus sweep, 2026-08-17, completed 2026-08-19 (FIFTEEN OF FIFTEEN)

All fourteen arXiv manuscripts known on 2026-08-17 were downloaded, converted
to text and searched, and `github.com/fbholt/Primegaps-v2` was cloned. A
fifteenth manuscript, arXiv:2605.19165, surfaced in the 2026-08-19 officer
pass and was swept in full the same evening (page images pp. 7-12;
`history/staging/holt-2605-sweep.md`). Per-paper verdict:

| paper | year | what it holds | touches our G2? |
|---|---|---|---|
| 0706.0889 Expected gaps between prime numbers | 2007 | the programme's opening; twin only as motivation | no |
| 1312.2165 Estimating constellations I: Uniformity | 2013 | count estimates for s=2 and others, the 8% correction | no |
| 1312.7569 On small gaps among primes | 2013 | small-gap populations | no |
| **1402.1970 On Polignac's Conjecture** | 2014 | **the max-gap table and the Jacobsthal connection** | **closest, see below** |
| 1408.6002 Eratosthenes sieve and the gaps between primes | 2014 | the cycle, the recursion, Lemma 3.1, the transfer matrix | no |
| 1503.00231 Constellations of gaps | 2015 | extends the model to constellations; strong Polignac on APs | no |
| 1510.00743 Combinatorics of the gaps between primes | 2015 | the consolidated version; Table 1 of sieve analogues; CPAP | no |
| 1604.02443 On the last digits of consecutive primes | 2016 | the Lemke Oliver-Soundararajan bias | no |
| 2308.07570 On the counts of p-rough numbers | 2023 | **the discrepancy DeltaPhi(x,p) and its extremes** | no |
| 2309.16833 Models for gaps g = 2p1 | 2023 | pushes the exact model to the boundary case g = 2p1 | no |
| 2405.03540 Expected biases in consecutive primes | 2024 | Wr(gmax, p#) | no |
| 2502.20470 Eratosthenes sieve supports the k-tuple conjecture | 2025 | every admissible constellation arises and persists | no |
| 2603.25896 On nonconvex constellations I | 2026 | the Engelsma (459, 3242) counterexamples, none before 9.7e73 | no |
| 2603.25915 Surviving Eratosthenes sieve I | 2026 | quadratic density, Legendre, the interval of survival | no |
| 2605.19165 On nonconvex constellations II: (458, 3240) (Holt alone) | 2026 | the 116 Engelsma (458,3240) counterexamples as heads/tails of the 58 parents; Lemma 2's in/out population matrix; the \|s\|/2 threshold restated with mechanism and used in eq. (1) — the SAME inequality as 2603.25915 §1 p. 6's "minimum span between fusions is 2p_{k+1}" (cite that as primary) | no — no max-gap bound, "twin" absent |

### THE NOVELTY BOUNDARY, drawn sharply

Across the whole corpus the word "twin" appears only in three roles: the twin
prime conjecture as motivation, the population n_{2,1}(p#) = prod(q-2) of the
gap g = 2, and estimates for the twin prime count. Four of the papers
(2502.20470, 2308.07570, 2309.16833, 2605.19165) do not contain the word at
all.

**He never studies the spacing between consecutive occurrences of the gap
g = 2.** That spacing is our G2, and its localized form is our M(x, x^k). His
objects are populations of constellations. His machinery is NOT bounded by
|s| < 2p1: 1408.6002 §6.1, Corollary 6.3 (pp. 25–26, read as page images in the
2026-08-19 officer pass) carries the q − 2 driving-term transport for gaps of
every size, with no span hypothesis. What a maximum gap leaves open is the
question, not the regime: the spacing between occurrences of g = 2, and any
upper bound on it.

So the boundary is: **the cycle, the recursion, the fusions, the closure
theorem, the transfer matrix, the population models and the interval of
survival are all his. The twin-slot spacing is not in his corpus, and neither
is any upper bound on a maximum gap, and neither is the adjacency run: his
coincidence count (J+1) − ν_p(s) is blind to where in the word the coincidences
sit (officer pass, `history/staging/proposals-prior-art.md`).**

### What 1402.1970 does have, and what it gives us

This paper is Holt **and Rudd**, not Holt alone. Section 4 tabulates the maximum
gap actually occurring in G(p#), which is Jacobsthal h(p#) and is OEIS A048670,
matching term for term. They record the empirical law **h(p#) is roughly
2*p_{k-1}**, with g = 2p_{k-1} always occurring by Holt's earlier work. They also
give a constructive LOWER bound technique through driving terms ("the maximum gap
in G(41#) is at least 74"). **They prove no upper bound**, and connect the
question to Jacobsthal's problem rather than resolving it.

Placed against our ladder this is a calibration we did not have, and it is free:

| x | h(x#), one class (theirs) | G2(x#), two classes (ours) | ratio |
|---|---|---|---|
| 5 | 6 | 12 | 2.00 |
| 7 | 10 | 30 | 3.00 |
| 11 | 14 | 42 | 3.00 |
| 13 | 22 | 66 | 3.00 |
| 17 | 26 | 108 | 4.15 |
| 19 | 34 | 150 | 4.41 |
| 23 | 40 | 204 | 5.10 |
| 29 | 46 | 258 | 5.61 |
| 31 | 58 | 348 | 6.00 |
| 37 | 66 | 528 | 8.00 |

The ratio grows without settling across the computed range. That is the price of
the second residue class measured directly on the objects.

It also explains why the merge condition is marginal even for him: his machinery
needs |s| < 2p and the one-class maximum gap sits right at 2p, which is why he
notes Hagedorn's values exceed it. For two classes the maximum gap is a factor
of about 0.2x above that line, so the condition fails by a growing margin, and
only localization recovers it. See `research/LOCALIZED-GAP.md` §3.

### Second overlap found: the discrepancy front

2308.07570 studies DeltaPhi(x, p) = Phi(x,p) - (phi(p#)/p#)*x, the signed
discrepancy of the p-rough counting function, and tabulates its extremes:

| x | mean gap mu | max abs DeltaPhi | rising zeroes as share of phi(p#) |
|---|---|---|---|
| 5 | 3.750 | 0.9333 | 100% |
| 7 | 4.375 | 1.5143 | 66.67% |
| 11 | 4.813 | 2.5195 | 54.58% |
| 13 | 5.214 | 3.5475 | 38.47% |
| 17 | 5.539 | 5.4388 | 28.16% |
| 19 | 5.847 | 8.6592 | 20.76% |
| 23 | 6.113 | 14.4180 | 14.90% |
| 29 | 6.331 | 20.9128 | 10.74% |

This is the one-class neighbour of our variance and hyperuniformity front
(FOLD-PROFILE §2's Level Ledger, natal-cap-29's spectral mass, the 2*3^k bound).
The comparison has since been made and settled: one object, three norms. His
max abs DeltaPhi is the sup of the k = 1 case of the same discrepancy whose
k = 2 variance natal-cap-29 measures and whose sup the Level Ledger bounds
(`research/discrepancy-two-class.md` §5), and the identification is proven, not
measured: the Level Ledger is exactly the worst dilated-interval discrepancy of
the tile (`research/level-ledger-tight.md` Theorem 1), so any bound on one
channel transfers to the other.

### The data, which is free instrumentation

`github.com/fbholt/Primegaps-v2`, 73 MB, twenty Jupyter notebooks plus:
cycles G(11#), G(17#), G(19#) as uint arrays; `nG37.csv`, the driving-term
counts at level 37; `wginf510510.npy`; nine DeltaH datasets; primes to 19#.
G(23#) and G(29#) must be regenerated from his code. His notebook 33 is the
quadratic density and 12/13/21/22 are the DeltaH machinery.

### Coverage, and the one gap left

**Fourteen** arXiv manuscripts read or searched in full text, plus the
repository. The only item not covered is the 2022 book **"Patterns among the
Primes: a study of Eratosthenes sieve"**, which is not on arXiv. Buy or borrow
it before any publication decision that leans on the fold recursion.

*(Corrected 2026-08-18: this sentence read **"Twelve** arXiv manuscripts read or
searched in full text" and was the last surviving twelve of five. The count is
fourteen at every other site — `TODO.md`:39, `paper/moire-primes.md`:654, and
this file at :167 ("All fourteen arXiv manuscripts were downloaded, converted to
text and searched") and :283 ("Every bibliography in the fourteen manuscripts")
— and the per-paper verdict table above has fourteen rows, each with its own
verdict, which is the positive evidence that fourteen were opened rather than
twelve. This sentence matters more than the other four because it is the one
that converts the count into the coverage guarantee the novelty boundary below
rests on: at twelve of fourteen the guarantee is false and two papers are
unswept. Flagged in wave 4 and again in wave 6; four of the five sites were
repaired and this one was not.)*

---

## The Lonely Rabbit problem: the wheel as a published extremal object (found 2026-08-20)

The integer-time lonely runner (Perarnau–Serra survey §11.5): Rab(n) = 1/w(n)
with w(n) = max{z : φ(z)/2 + h(z) ≤ n}, conjectured by Cusick (Acta Arith. 22
(1972) 1–9) and PROVED by Schark (Monatsh. Math. 78 (1974) 131–146), with the
asymptotic Rab(n) ~ e^{−2γ}/(n log log n) (Schark–Wills, Acta Arith. 22 (1973)
129–136; all three SOURCED-BIB, texts not reached). A closed-form Diophantine
extremal problem in this family whose extremal modulus is the largest z with
totient ≲ 2n — a primorial wheel — and whose constant is Mertens. The corpus
had zero mentions before this pass. Priced honestly: a PUBLISHED-ANCHOR for
the wheel-is-extremal intuition, not a bound on G₂
(`history/staging/row12-recon.md` §5).

## The Hawkins random sieve, 1957 to 2008: the tradition that owns the thinning null (read 2026-08-19)

Six primary papers read at source, full verdicts and verbatim quotations in
`history/staging/hawkins-read.md`. What is THEIRS: the exactly-geometric null
law (Hawkins 1957, formalised by Neudecker–Williams, Compositio Math. 29
(1974) 197–200 — the corpus's earlier "1979" was a date error); the exact
stage-to-stage moment-recursion technique (Wunderlich, Acta Arith. 26 (1974)
eq. (5); Lorch 2007 Lem. 3.3; Bui–Keating, JNT 119 (2006) eqs. (4)/(7)); a
joint-minus-product expansion for the null (Bui–Keating p. 2); the
general-rate family ("Hawkins' p-primes", Lorch 2007 — our rate 2/n is a
member); the random-sieve twin theorem, held since 1974 with no singular
series (Wunderlich Thm 4, extended to all l-tuples by Bui–Keating); and the
null's maximal gap at the constant — Neudecker 1975, lim sup gap/log²p = 1
a.s. (second-hand via Rivoal p. 808; the 1975 paper itself is closed-access,
NOT REACHED). What is NOT theirs, asked by them and unanswered: any identity
for the deviation of the true sieve from the random one — Bui–Keating p. 2
and Neudecker–Williams p. 199 both name the missing arithmetic ("the rather
tantalising feature of the real Mertens Theorem") and answer it only as
constants. That deviation identity is the Fold Moment Identity's Ψ − Φ²,
which remains not found. No two-class or residue-class variant exists
anywhere in the tradition: residue/congruence/modulus return calibrated
zeros across all six full texts, and Rivoal p. 802 states the structural
reason ("Hawkins' sieve cannot detect arithmetical facts such as
coprimality").

## Ojaroudi 2026: the same frame, a different attack (found 2026-08-19)

An unrefereed Zenodo self-deposit (Javid Ojaroudi, 10.5281/zenodo.18509488 v4,
Feb 2026; v5 = 10.5281/zenodo.18528635), read end to end at source,
`history/staging/ojaroudi-read.md`; the two importable lemmas were then
verified and priced in `history/staging/import-bridge.md` (zero new certified
numbers, by identity). **The frame is ours to the digit**: his
T_i is our tile (T_i = T_x at x = p_i), his "each class lifts to p_{i+1}
fibers and exactly two fibers are deleted" is our fold, his
|T_{i+1}| = (p−2)|T_i| is our Copying Theorem, and his |T_i| column
(3, 15, 135, 1485, 22275, 378675) is our D_x — reproduced from independent
code cell for cell, so custody runs clean in both directions. **His theorem
is not proved**: the load-bearing step asserts a Selberg quadratic-form lower
bound S(A,Z) ≥ (1−κ)U/G(D), imported "as a proven theorem" from Opera de
Cribro Ch. 7, which contains no such bound — the Λ² sieve is one-sided by
construction, and the same book's Ch. 16 proves why no such bound can exist.
A second independent gap: his imported Kloosterman inequality needs
M, N ≤ 4C^{1/2} with C ≍ ℓ, applied where it holds only at the top of his
range. His Lemma-V-adjacent instrument is BFI Acta Math. 156 Lemma 1
(bilinear classical Kloosterman sums averaged over the modulus), NOT the
Kloosterman-fractions branch our Lemma V row names; DFI and Bettin–Chandee
appear in neither version's bibliography, so that row stands unchallenged.
**Two of his lemmas are elementary, fully proved, upstream of the false step,
and importable**: the Bridge inequality |B_q − (2/q)|U_i|| ≤
2√(p−1)·√(D_i(q)) (an L²→L∞ conversion per prime), and the universal
collision bound Σ_r c_{j,ℓ}(r)² ≤ p_{i+1}(D_i(ℓ) + |T_i|²/ℓ). His v5
bibliography also hands over four unread Lemma-V-adjacent instruments, led by
Maynard's "Primes in AP to large moduli II: well-factorable estimates"
(Oxford ORA, Lemma 6.12, a Deshouillers–Iwaniec estimate) — the closest live
neighbour found so far that is neither DFI nor Bettin–Chandee.

## The reference sweep (2026-08-17): where Holt's bibliography leads

Every bibliography in the fourteen manuscripts was extracted and deduped, then
checked against this repository. Most of it we already carry: Brent,
Hardy-Littlewood, Cramer, Erdos-Turan, Granville, Montgomery-Vaughan, Nicely,
Goldston-Pintz-Yildirim, Soundararajan, Hensley-Richards, Engelsma, Sutherland,
Pomerance, the Maier-Pomerance conjecture, Green-Tao, Riesel, Ribenboim.

Five references were new to us. One of them closes a loop.

### THE MAIER CHAIN, and it is the most important thing in this audit

Three facts, each classical, which together sit directly under this programme.

**1. The tile is Maier's matrix.** Maier's matrix method (Maier 1985) constructs
its intervals by *first selecting a primorial and then using the distribution of
integers coprime to that primorial*. That is our tile, used as a proof technique
since 1985. Granville and Soundararajan's Annals paper (below) exhibits the
matrix explicitly with (r,s) entry (R+r)q + s*l and sums it two ways. **Rows are
short intervals**, since row r runs over s and spans an interval of length l*S
counted inside a progression mod l, **and columns are arithmetic progressions**,
since column s runs over r with common difference q (gs.txt line 557: "the r-th
row contributes A((R+r)q + lS; l, (R+r)q) - A((R+r)q; l, (R+r)q)"). So our
Copying Theorem, which is a residue statement, is the **column** sum, and our
window statistics are the **row** sum.

The wheel is classical as a sieve, credited to Pritchard in the verdict table
above. What that entry does not capture is the wheel as a matrix, which is this.

**2. Maier's theorem is an irregularity theorem at exactly our window scale.**
For Phi(x) = (log x)^lambda with lambda > 1,

> limsup [pi(x + Phi(x)) - pi(x)] / [Phi(x)/log x] > 1, and liminf < 1.

Primes in intervals of length (log x)^lambda are NOT uniformly distributed, and
Cramer's model gives the wrong answer there. In the tile frame ln W = theta(x) ~ x,
so **the zone's width x^2 is (ln W)^2, which is lambda = 2**, inside the proven
range. Iwaniec's exponent, Maier's lambda and our window are the same number
seen three ways.

**3. Our survival curve is the input to Maier's theorem.** Cheer and Goldston
(Math. Comp. 55, 1990) study the Buchstab delay equation, omega(u) = 1/u on
[1,2] with (u omega(u))' = omega(u-1), *"introduced by Buchstab in connection
with an asymptotic formula for the number of uncanceled terms in the sieve of
Eratosthenes"* (verbatim), and state that **Maier used this result to show
there is unexpected irregularity in the distribution of primes in short
intervals**, applying their numerics to the constants in Maier's theorem. That
second statement is a paraphrase and is not inside quotation marks for a
reason: the source reads "Maier *has recently* used this result to show there
is unexpected irregularity in the distribution of primes in short intervals."

FOLD-PROFILE §9a proved our survival law S/P is a function of u = ln W / ln y and
of nothing else, and called that the day's decisive finding. It is the Buchstab
function. natal-cap-28 already identified omega(u) in the Buchstab correction
without connecting it to Maier.

**So the loop closes: our scale-free survival law is the exact analytic input to
the theorem that says our window scale is irregular.** Nothing in the repo knew
this chain, and the three pieces were sitting in three different notes.

### Granville and Soundararajan, "An uncertainty principle for arithmetic sequences"

Annals of Math 2007, arXiv:math/0406018. Corollary 1.4 is a proven dichotomy:
for a suitable arithmetic sequence, either the count in some interval of length
at least (log x)^u deviates from its density, or the count in some arithmetic
progression to a small modulus does. **You cannot have both distributions clean.**
Their Example 5 and their §1a apply this to *any subset of the integers with no
prime factor in a band below log x*, which is the sifted setting, and they note
that Maier-type irregularities *"seem to depend on the subset having some
arithmetic structure"*, so they take subsets of a set that already has it.

Our twin slots are exactly such a subset. Whether their condition (1.7) admits a
density as thin as 1/ln^2 W is NOT checked and is the piece of work this points
at. Stated honestly: if it applies, it is a proven obstruction sitting on top of
the assumption both we and Holt keep needing.

### What this does and does not say about the Zone Postulate

**Does not.** Maier's theorem is about intervals somewhere in [x/4, x]. The zone
sits at the ORIGIN of the tile, at a single distinguished position, and the Zone
Postulate is an existence statement rather than a count. None of this refutes it,
and none of it refutes our reduction.

**Does.** Every heuristic in this programme of the form "the zone should behave
like a typical window" is now known to be false for the analogous prime statement
at the analogous scale. That is the ensemble half of the anchored-versus-ensemble
split which `research/ZONE-POSTULATE.md` §5 calls "the same phenomenon rediscovered
three times". It has a name and a theorem: the ensemble is provably irregular at
our window width. The anchored half is untouched, and is the whole game.

**And it raises the burden on Holt.** His Conjecture 2.1, the "approximate
uniformity" that Theorem 3.3 and his Legendre argument rest on, is exactly the
hypothesis Maier's theorem breaks for primes at this scale. He samples gaps in
Delta-H(p_k) and treats them as approximately uniform draws from w_g(p_k#). We do
not claim his conjecture is false, since his statement is about the sieve's gap
populations rather than about pi(x), but the analogous prime statement is a known
counterexample and his paper does not address it.

### The other four new references

- **Erdos, "On the integers relatively prime to n and on a number-theoretic
  function considered by Jacobsthal", Math. Scand. 10 (1962) 163-170.** The
  one-class ancestor of our G2, cited by Holt and Rudd in 1402.1970. (Distinct
  from the [Er65b] source Erdos Problem #970 lists; both references are real and
  neither should be merged into the other.) **DONE — it is now cited at five
  sites**, verified 2026-08-18 by grep over the whole corpus:
  `research/two-class-lower-bounds.md`:90 (a numbered prior-art row with a live
  URL), `research/exponent-control.md`:20, `paper/beta2-note.md`:313,
  `paper/moire-primes.md`:686 and `paper/moire-primes.md`:761. *(This bullet
  used to read "We reached Iwaniec 1978 without ever citing Erdos 1962. Should
  be cited." That was true when written and stopped being true when the papers
  layer took the instruction; the correction landed there and never came back to
  the home that issues it. Its three siblings below are still live and still
  worth acting on, which is exactly why a reader would act on this dead one
  too.)*
- **Clement, "Congruences for sets of primes", AMM 56 (1949) 23-25.** The
  congruence criterion for twin primes. Not in this repo at all.
- **Fan and Pomerance, "An inequality related to the sieve of Eratosthenes",
  JNT 254 (2024) 169-183, arXiv:2306.03339.** Their abstract, from the LaTeX
  source via the arXiv API: "We show that but for a few small cases,
  **Phi(x,y) < .6x/log y when y <= sqrt(x)**." Note the constant is **0.6, not
  6**, and the range is **y <= sqrt(x), not y <= x**. An explicit unconditional
  bound on the rough-number count, in the regime our survival curve lives in.
  A comparison against our closed form is available and has not been made; if
  anyone makes it, start from those two figures.
- **Weingartner, arXiv:2604.22058 (April 2026).** Links the error terms for
  smooth and rough counting functions and turns Fan's explicit rough bound into
  an explicit bound for de Bruijn's smooth approximation. Current state of the
  art on the error term our Level Ledger bounds by 2*3^{pi(x)-1}. A comparison
  is available and has not been made.

### Net

The audit did not find our objects. It found the *technique* our objects are,
in Maier's hands since 1985, and it found that the analytic function we proved
governs our survival curve is the engine of the theorem that limits what any
uniformity heuristic can claim at our window scale. Priority for the technique
is Maier's. The twin-slot spacing is still nobody's.

### Three clerical errors in arXiv:2308.07570 Table 2 (found 2026-08-17, VERIFIED)

Custody work for `research/discrepancy-two-class.md` reproduced every analytic
column of Holt's Table 2 from our own engine at all eight levels x = 5 to 29.
The reproduction is exact. Three printed cells are not:

| cell | Holt prints | correct | check |
|---|---|---|---|
| phi(23#) | 36,595,360 | **36,495,360** | his own phi(29#) = 1,021,870,080 = 36,495,360 x 28, so his table contradicts itself one row later |
| N_0+(19) | 344,337 | **344,338** | exact-integer certified, and satisfies his own theorem N_0- = N_0+ |
| N_0+(23) | 5,438,505 | **5,438,506** | same |

Verified independently in the parent session: prod(p-1) over p <= 23 is
36,495,360, and 36,595,360 x 28 = 1,024,670,080, which is not the phi(29#) he
prints.

**None of these touch his conclusions**, which is why they are recorded here as
clerical rather than as a refutation. If we ever correspond with him, lead with
the reproduction and mention the typos as a footnote, not as a finding.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
