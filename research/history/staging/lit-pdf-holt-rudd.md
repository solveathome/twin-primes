# Holt and Rudd, verified against the PDFs of record (2026-08-18)

<!-- ledger
id: Q-lit-pdf-holt-rudd
status: ANSWERED
todo: none
question: Do our Holt and Rudd citations survive checking against the arXiv PDFs of record?
verdict: Every quotation VERBATIM with no misquotation found, but Lemma 3.1 is not the lemma the demotion needs, the 2p spacing result carries no numbered theorem of that name, several attribution defects and two internal conflicts are ours to settle, and the absence claim remains an absence claim.
-->

*(Literature verification. Every quotation below was checked against a PDF
downloaded from arXiv on 2026-08-18 and converted with `pdftotext -layout`.
No ar5iv, no HTML rendering, no search-engine snippet was used for any verdict.
Nothing in the repo was edited. Where our text is wrong it is reported, not
fixed.)*

## Why this ran

`research/history/staging/audit-novelty-postaudit.md` demoted two results on the
strength of quotes it had taken from the ar5iv HTML rendering, and said so in its
own coverage section: *"Holt–Rudd Lemma 3.1 and Theorem 2.3 came from the ar5iv
HTML rendering, not from the PDF. The quotes read as verbatim but I did not
re-verify them against the source PDF, and this repository has been burned by
exactly that gap before."* This closes that gap.

## Headline

**Every quotation the corpus attributes to Holt or Holt and Rudd is verbatim
against the PDF.** Not one is fabricated, not one is a paraphrase inside quote
marks, and the arithmetic table we copied from 1402.1970 matches term for term.
That is the good news and it is the larger part of the finding.

**Both demotions survive, but neither is numbered correctly, and one of the two
is broader than the source supports.** The details are in items 1 and 3.

| demotion | still stands? | correction required |
|---|---|---|
| Exact Invariance Lemma → PRIOR ART | **partially** | Lemma 3.1 does not carry it; Corollary 3.2 carries the recursion, and neither has any sub-interval content. The Smith/Copying-Theorem route carries it and does not need Holt at all. |
| Theorem B → RELATED | **yes** | the sentence relied on is not in Lemma 3.1; it is unnumbered prose on p.11. The heading also states the wrong bound. |

## Provenance of the artifacts

| paper | versions on arXiv | version read | pages | note |
|---|---|---|---|---|
| 1408.6002 *Eratosthenes sieve and the gaps between primes*, Holt and Rudd | **v1 only** (v2 returns 404) | v1, `arXiv:1408.6002v1 [math.NT] 25 Aug 2014` | 34 | **No numbering ambiguity exists for this paper.** Printed page numbers equal PDF page numbers. |
| 1402.1970 *On Polignac's Conjecture*, Holt and Rudd | v1 and v2 | v2 (also diffed against v1) | 13 | Statement numbering **identical** across v1 and v2. Only the reference list shifts: v2 inserts Erdős on Jacobsthal as [1], so every reference number in v1 is one lower. Our citations are by section and statement number, so nothing we cite moves. |
| 2603.25915 *Surviving Eratosthenes sieve I: Quadratic density and Legendre's conjecture*, **Holt alone** | v1 | v1, `arXiv:2603.25915v1 [math.NT] 26 Mar 2026` | 25 | Pulled because our two most load-bearing Holt quotations turn out to cite this paper, not 1408.6002. |
| 2308.07570 *On the counts of p-rough numbers* | v5 latest | v5 | 18 | Pulled for the absence check only. |
| `github.com/fbholt/Primegaps-v2` | — | HEAD, 2026-05-19 | 52 files | Reachable. README, `00_Tbl_of_Contents.ipynb` and `90_notes.ipynb` read. |

## 1. Lemma 3.1 of arXiv:1408.6002 — VERBATIM, but it is not the lemma the demotion needs

**Source, PDF page 11, §3.1, arXiv:1408.6002v1, in full:**

> **Lemma 3.1.** *For p_k ≥ 3, let s be a constellation of sum g and length j,
> such that g < 2 · p_{k+1}. Then for each instance of s in G(p_k#), in forming
> G(p_{k+1}#), in step R2 we create p_{k+1} copies of this instance of s, and the
> j + 1 closures in step R3 occur in distinct copies.*
>
> *Thus, under the recursion at this stage of the sieve, each instance of s in
> G(p_k#) generates p_{k+1} − j − 1 copies of s in G(p_{k+1}#); the interior
> closures generate j − 1 constellations of sum g and length j − 1; and the two
> exterior closures increase the sum of the resulting constellation in two
> distinct copies, removing these from being driving terms for the gap g.*

**Verdict on the audit's quotation: VERBATIM.** The audit quoted *"each instance
of s in 𝒢(p_k#) generates p_{k+1}−j−1 copies of s in 𝒢(p_{k+1}#)"*. That is
word for word the PDF's second paragraph. (The PDF's own typesetting drops the
space in `G(p_k#)generates`; a rendering artifact, not a difference.)

**Verdict on the second half of the audit's quotation: DIFFERS in attribution,
not in content.** The audit gave the population recursion as part of Lemma 3.1:

| audit | PDF |
|---|---|
| *N_s(p_{k+1}#) = (p_{k+1}−j−1)·N_s(p_k#) + n_{s,j+1}(p_k#)* | **Corollary 3.2**, PDF page 12: *N_s(p_{k+1}#) = (p_{k+1} − j − 1) · N_s(p_k#) + **1 ·** n_{s,j+1}(p_k#)* |

Two differences, both minor in substance: the coefficient `1 ·` is written
explicitly in the source, and **the recursion is Corollary 3.2, not Lemma 3.1.**
Corollary 3.2 also carries a hypothesis the audit dropped, `g < 2p_{k+1}`.

**(d) Is the surrounding claim supported?** *Partially, and less than the audit
says.* Our Exact Invariance Lemma (`paper/moire-primes.md`:278) reads: *"The
in-period depth of any band of the tile — its slot density relative to the tile
average — is exactly invariant under folding."* The operative words are **any
band**. That is a statement about a spatial sub-interval of the tile.

Lemma 3.1 and Corollary 3.2 have **no sub-interval content whatsoever**. They
count instances of a constellation type across the whole cycle. Holt and Rudd
are explicit that they cannot localise: the abstract of 1402.1970 (PDF page 1)
says *"Although we don't know where in the cycle of gaps a closure will occur,
we can enumerate exactly how many copies of various constellations will survive
each stage."* Nothing in either statement freezes the share of a band.

What Lemma 3.1 does give, at j = 1, is the factor p − 2 for a single gap, and
1408.6002 equation (2) (PDF page 9) states the pure form with no driving-term
inflow: *N_2(p_{k+1}#) = (p_{k+1} − 2) · N_2(p_k#)*. That is the census law, and
it is unambiguously prior art. **So the census half of our lemma is Holt's (and
older, Schemmel's). The band half is not in Lemma 3.1.**

The demotion is not thereby wrong. The audit's *first* route — that the lemma is
the Copying Theorem restricted to a sub-interval, and the Copying Theorem is
Smith 1857 per `PRIOR-ART.md` — carries the band statement and never mentions
Holt. **The demotion should be re-grounded on that route.** Citing Lemma 3.1 for
a claim about bands overstates what the source says.

## 2. Theorem 2.3 of arXiv:1408.6002 — VERBATIM, and our claim is fully supported

**Source, PDF page 8, §2.2 (whose heading is itself the statement, "Every
possible closure of adjacent gaps occurs exactly once"), arXiv:1408.6002v1:**

> **Theorem 2.3.** *Each possible closure of adjacent gaps in the cycle G(p_k#)
> occurs exactly once in the recursive construction of G(p_{k+1}#).*
>
> *Proof.* *This is an implication of the Chinese Remainder Theorem. Each entry
> in G(p_k#) corresponds to one of the generators of Z mod p_k#. ... For each
> copy, the combination of residues for γ_{k,j} modulo 2, 3, . . . , p_k is
> augmented by a unique residue modulo p_{k+1}. Exactly one of these has residue
> 0 mod p_{k+1}, so we perform g_j + g_{j+1} for this copy and only this copy of
> g_j.*

**Verdict: VERBATIM.** Every place we state it, we state it correctly:

| ours | source | difference |
|---|---|---|
| `PRIOR-ART.md`:140 — *"Thm 2.3, each possible closure of adjacent gaps occurs exactly once, by CRT"* | as above | none; the proof really is CRT and is one paragraph long |
| `paper/moire-primes.md`:162 — *"the same CRT argument shows that each possible closure of adjacent gaps occurs exactly once"* | as above | none |
| `moire-primes.md`:329 — *"the single-hole recursion and its closure theorem are Holt and Rudd's (arXiv:1408.6002, Lemma 2.1 and Theorem 2.3)"* | Lemma 2.1 is the R1/R2/R3 recursion, p.5; Theorem 2.3 is the closure theorem, p.8 | none |

**(d) Supported.** Our Copying Theorem's proof (`moire-primes.md`:150-158) runs
the identical argument: the p lifts occupy each residue class mod p exactly once,
and exactly one lands in each killed class. Holt and Rudd's Corollary 2.4 (p.8)
even extracts the two-copies-of-2p_k consequence. The demotion of the Copying
Theorem and Redundancy Lemma to this source is **correct and correctly numbered**.

One gap in our citation hygiene: **Theorem 2.3 is cited without a section number
in all three places.** It is §2.2, PDF page 8.

## 3. The "2p spacing" result — VERBATIM, but there is no numbered theorem of that name

Our corpus never uses the phrase "2p spacing" (zero hits). Two distinct objects
in Holt's corpus answer to it, and they must not be conflated.

### 3a. The fusion-spacing fact — the one that demotes Theorem B

**It has no theorem number in 1408.6002.** It appears as unnumbered prose in the
discussion immediately following Lemma 3.1, PDF page 11:

> *The proof is a straightforward application of Theorem 2.3, but we do want to
> emphasize the role that the condition g < 2 · p_{k+1} plays. In step R3 of the
> recursion, as we perform closures across the p_{k+1} concatenated copies of
> G(p_k#), the distances between the closures is given by the elementwise product
> p_{k+1} ∗ G(p_k#). Since the minimum gap in G(p#) is 2, **the minimum distance
> between closures is 2 · p_{k+1}**. And the condition g < 2 · p_{k+1} ensures
> that the closures will therefore occur in distinct copies of any instance of the
> constellation in G(p_k#) created in step R2.*

An earlier, worked instance sits on PDF page 9: *"the distances between closures
is governed by the entries in 7 ∗ G(5#), so the minimum distance between closures
in forming G(7#) is 7 ∗ 2 = 14."*

**Audit item 6's quotation, *"the minimum distance between closures is 2·p_{k+1}"*
— VERBATIM.** It is on PDF page 11 exactly as written.

**But its citation, "Lemma 3.1 and its corollary", DIFFERS.** The sentence is in
neither Lemma 3.1 nor Corollary 3.2. It is unnumbered explanatory text between
them. The nearest numbered vehicle is Lemma 3.1's *hypothesis* `g < 2 · p_{k+1}`,
which is the same fact stated as a condition rather than as a conclusion.

**The corpus's own quotation is better sourced than the audit's.**
`LOCALIZED-GAP.md`:180-185, `PRIOR-ART.md`:158-162 and `G2-STATE.md`:772 all
quote the *restatement* in Holt's 2026 paper, and all three correctly say so:

| ours | source, arXiv:2603.25915v1, §1, **PDF page 6** | difference |
|---|---|---|
| *"the minimum span between fusions is 2p_{k+1}. So provided that \|s\| < 2p_{k+1}, the possible fusions in s all occur in separate images of s."* | *"...we know that the minimum span between fusions is 2p_{k+1}. So provided that \|s\| < 2p_{k+1}, the possible fusions in s all occur in separate images of s."* | **none.** Our quote opens mid-sentence after "we know that" and correctly begins lowercase. |

**VERBATIM.** The `§1` citation is also correct: §1 is *"Evolution of populations
of constellations in G(p#)"* and runs across PDF pages 5-8.

**(d) Is the Theorem B demotion supported?** *Yes.* Holt's fact is that in the
single-hole alphabet a span shorter than 2p admits at most one fusion. Our Fact B
(`LOCALIZED-GAP.md`:24-28) is that in the two-class alphabet an interval shorter
than p − 2 admits at most one kill. Same mechanism, different alphabet, and ours
needs Fact A (no two twin slots 2 apart) which has no one-class counterpart.
Calling Theorem B *"the two-class refinement of a published one-class spacing
lemma"* is fair, and `G2-STATE.md`:306-309 and `two-class-lower-bounds.md`:748
already say exactly that. The audit's recommendation — change *"the first
unconditional bound on L"* to *"the first two-class bound"* and cite Holt as the
one-class ancestor — is the right correction and it is not a novelty demotion of
Theorem B itself.

**Two defects in how the demotion is written, neither about the PDF:**

1. **The heading states the wrong bound.** Audit item 6 is headed *"Theorem B,
   L ≤ 0.18p"*. Theorem B does not prove `L ≤ 0.18p`. `a3-05-bound-L.md` §7 and
   `kappa-not-L.md`:65-88 both say the opposite: `0.18x` is the **floor Theorem B
   can never prove below**, because `maxsum_m ≥ G₂` always. The heading inverts a
   ceiling into a bound.
2. **`research/a3-05-bound-L.md` still contains no literature reference at all**
   (grep for Holt, Rudd, prior art, classical: nothing), while asserting *"it is
   the first one"*. The audit flagged this and it is still true.

### 3b. The maximum-gap observation `h(p#) ≈ 2p_{k−1}` — a different object, correctly cited

**Source, arXiv:1402.1970v2, §4 "Data & Observations", PDF page 10:**

> *These results may lend some insight into the Jacobsthal function [1]. The
> Jacobsthal function g(N) is defined as the least integer such that for any g(N)
> consecutive integers there is at least one which is relatively prime to N. We
> observe that this is equivalent to defining g(N) to be the maximum gap in G(N),
> and by Lemma 2.2 g(N) = g(Q), in which Q is the product of the prime factors of
> N. From Lemma 2.2 and Theorem 2.3, letting q̄ be the maximum prime in Q, we know
> that g(Q) ≤ g(q̄#).*
>
> *From our tabulated data, it appears that the maximum gap that actually occurs
> in G(p_k#) is roughly 2p_{k−1}. We know from previous work [4] that the gap
> g = 2p_{k−1} always occurs in G(p_k#). Although this gap is sometimes exceeded
> as the maximum gap, the tables suggest that this value is often the maximum gap.*

**Maximum gap size occurring in G(p#)** — the table as printed, PDF page 10:

| p | 3 | 5 | 7 | 11 | 13 | 17 | 19 | 23 | 29 | 31 | 37 | 41 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| max g | 4 | 6 | 10 | 14 | 22 | 26 | 34 | 40 | 46 | 58 | 66 | 74 |

**(d) Supported, and our wording is more careful than it needed to be.**
`PRIOR-ART.md`:258-266 says they *"record the empirical law h(p#) is roughly
2*p_{k-1}, with g = 2p_{k-1} always occurring by Holt's earlier work"*. That is
right down to the hedging: the source says *"it appears"*, *"sometimes
exceeded"*, *"often the maximum gap"*, and reference [4] in v2 is Holt 2007
alone, so *"Holt's earlier work"* is correct. The two exceedances are visible in
their own table (p = 23 gives 40 against 2·19 = 38; p = 37 gives 66 against
2·31 = 62).

**Our h(x#) column matches the printed table at all ten shared entries** (x = 5
through 37: 6, 10, 14, 22, 26, 34, 40, 46, 58, 66). `PRIOR-ART.md`'s *"which is
Jacobsthal h(p#) and is OEIS A048670, matching term for term"* is **VERIFIED
against the PDF table**, not merely against OEIS.

**One over-claim, small.** We say *"**They prove no upper bound**"*. They prove
one: `g(Q) ≤ g(q̄#)`, quoted above. It is a reduction to the primorial case and
not an upper bound on the maximum gap in any useful sense, so the spirit of our
sentence is right, but as written it is contradicted by a sentence on the same
page. Suggest *"they prove no non-trivial upper bound"*.

## 4. Every other claim attributed to Holt or Holt and Rudd

Checked against the PDFs. Grouped by verdict.

### VERBATIM / correct, no action

| our claim | where | source, verified | verdict |
|---|---|---|---|
| the tile ↔ *cycle of gaps G(p#) among generators of Z mod p#* | `PRIOR-ART.md`:138 | 1408.6002 p.1: *"G(p#) is the cycle of gaps among the generators of Z mod p#"* | **VERBATIM** |
| the fold ↔ R1/R2/R3 | `PRIOR-ART.md`:139, `GLOSSARY.md`:22 | Lemma 2.1, 1408.6002 **§2.1, p.5**: *"R1. Determine the next prime... R2. Concatenate p_{k+1} copies of G(p_k#). R3. Add adjacent gaps as indicated by the elementwise product..."* | **VERBATIM.** Our word *"identify"* matches 2603.25915 §1 R1 (*"identify the next prime"*); 1408.6002 says *"Determine"* in the lemma and *"Identify"* in its worked example on p.7. Both are in Holt's text. |
| kills ↔ **fusions**, cited to 2603.25915 §1 | `PRIOR-ART.md`:140 | 2603.25915v1 §1, p.6: *"R3. Fusions. Add the adjacent gaps (fuse)..."*, *"These additions of adjacent gaps are the fusions in step R3."* Correctly NOT cited to 1408.6002, which calls them *closures*: *"We call the additions in step R3 the closure of the two adjacent gaps"* (p.7) | **VERBATIM**, and the split between the two papers' vocabulary is correctly recorded |
| census ↔ N₂(p#) = ∏(q−2), *"Twin Generators"* | `PRIOR-ART.md`:142, `GLOSSARY.md`:31 | 1408.6002 **§4, p.16**, first bullet, headed *"Twin Generators"*: *"The number of gaps g = 2 in the cycle of gaps G(p_k#) is N₂(p_k#) = ∏_{q=3}^{p_k} (q − 2)."* | **VERBATIM**, §4 correct |
| A9 ↔ transfer matrix M_J, binomial eigenvectors, driving terms, **1408.6002 §5, 2014** | `PRIOR-ART.md`:143, `U-FRAME.md`:586, `ATTACKS3.md`:222, `a3-09-histogram-operator.md`:17, `moire-primes.md`:632 | §5 *"A model for populations across iterations of the sieve"*, **pp.17-19**. M_J written out as a bidiagonal matrix with a_j = (p−j−1)/(p−2), b_j = j/(p−2), p.18. §5.1 *"Eigenstructure of M_J"*, p.19: *"the upper triangular entries of R and L are binomial coefficients, with those in R of alternating sign"* | **VERBATIM and correctly numbered.** M_J is first *named* in §3 (p.9) but *built* in §5. The A9 demotion is sound. |
| HL Conjecture B recovered, 1408.6002 §6 | `PRIOR-ART.md`:146, `moire-primes.md`:636 | §6 is titled *"Polignac's conjecture and Hardy & Littlewood's Conjecture B"*, pp.22-29. p.23: *w_{g,1}(∞) = lim N_g(p#)/N₂(p#) = ∏_{q>2, q\|g} (q−1)/(q−2)* | **VERBATIM**, §6 correct |
| interval of survival ΔH(p_k) = [p_k², p_{k+1}²]; horizon of survival p_{k+1}² | `PRIOR-ART.md`:144-145 | 2603.25915v1 §2, **p.9**: *"We call this range up through p²_{k+1} the horizon of survival H(p_k) for G(p_k#)"*; **p.10**: *"The interval ΔH(p_k) = H(p_k) \ H(p_{k−1}) = [p²_k, p²_{k+1}] is the interval of survival"* | **VERBATIM.** Correctly cited to 2603.25915 and **not** to the 2014 papers — neither phrase occurs in 1408.6002 or 1402.1970. |
| the driving-term lower-bound quotation | `two-class-lower-bounds.md`:731 | 1402.1970v2 §4, **p.11**: *"From the tabled values for G(31#), we see that the driving term of length 3 for g = 74 will advance into an actual gap in two more stages of the sieve. Thus the maximum gap in G(41#) is at least 74, and the maximum gap for G(43#) is at least 90."* | **VERBATIM**, §4 correct. Our quote truncates after *"at least 74."* without an ellipsis; the dropped clause does not alter the retained sense. The same sentence also appears in 1408.6002 p.30. |
| Theorem 3.3 rests on Conjecture 2.1, *"approximate uniformity"*, a conjecture supported by samples | `PRIOR-ART.md`:175-183, `moire-primes.md`:667-670 | 2603.25915v1 **p.10**: *"Assuming a uniform distribution of instances of s in G(p_k#) we have E_s(p_k) = ..."*; **p.11**: quadratic density is *"a normalized version of E_s(p_k)"*; **Conjecture 2.1, p.10**: *"For large enough primes, the populations of the gaps within ΔH(p_k) are approximately uniformly sampled from their populations in G(p_k#)."*; **Theorem 3.3, p.14**: *"For every gap g, once g occurs in G(p_0#) for any p_0 ≥ 3, the quadratic density η_g increases for all primes p_k > p_1."*; **§4.2, p.24**: *"We have Conjecture 2.1 which postulates approximate uniformity"*, *"We trust the Conjecture 2.1 for J ≤ 3"* | **VERBATIM and SUPPORTED.** η is defined through E_s, which is defined under the uniformity assumption. Our warning is accurate and it is the strongest-supported claim in this whole check. |
| Hagedorn's values *"consistently exceed the bound 2p_k"* | `PRIOR-ART.md`:169-171, `localized-04-maxsum.md`:409 | 2603.25915v1 §4.2, **p.24**: *"Hagedorn has produced a few values for Jacobthal's function [3], and these consistently exceed the bound 2p_k from investigating Legendre's conjecture."* | **VERBATIM.** Note the source spells it *"Jacobthal"* throughout §4, missing the s. That is Holt's typo and it falls outside our quotation marks, so we have not misquoted. |
| the corpus's *"twin"* usage is confined to motivation, ∏(q−2), and twin-count estimates | `PRIOR-ART.md`:243-247, `moire-primes.md`:656-658 | 1408.6002: *twin* occurs at pp.1, 2, 3, 7 (TPC as motivation and keyword), pp.3 (twin-count computations, refs [2,15,17,13,14]), pp.3, 16 (*"Twin Generators"*). 2308.07570: **zero** occurrences. 2603.25915: **zero** occurrences. | **SUPPORTED**, with two refinements below |

### The absence claim, tested as hard as a PDF allows

`moire-primes.md`:658 states *"**Holt never studies the spacing between
consecutive occurrences of the gap 2.**"* An absence claim is the one thing no
check can test, so here is exactly what I could establish.

**Positive evidence for it.** Searching 1408.6002 for *spacing*, *distance
between*, *consecutive occurrence*, *between occurrence* and *location* returns
four hits and **all four are about the distance between closures, never about the
distance between occurrences of a gap**: p.9 (*"minimum distance between
closures ... is 7 ∗ 2 = 14"*), p.11 (*"minimum distance between closures is
2 · p_{k+1}"*), p.8 (*"the symmetry of the locations of the closures"*), p.33
(*"it sets the number and location of all the driving terms"*). The same search
over 1402.1970 returns one hit, and it is the abstract's disclaimer quoted in
item 1: *"we don't know where in the cycle of gaps a closure will occur"*.

**The nearest miss, which we do not currently record.** 1408.6002's Conclusion,
PDF page 33: *"This raises the prospect, for example, of finding twin primes
infinitely often in the constellations 242, and 2, 10, 2, and even 2, 10, 2, 10,
2."* The constellation `2,10,2` is two twin slots at spacing 12. Holt is counting
the population of a *fixed short* constellation, not the maximum or typical
spacing between consecutive occurrences, so the boundary holds — but this is the
closest the corpus comes and a referee will find it. **This is a fourth role for
the word *twin* in 1408.6002, and our "only three roles" sentence does not cover
it.** Recommend adding it explicitly and saying why it does not close the gap.

**A second, smaller inaccuracy.** `PRIOR-ART.md`:246 says *"Three of the papers
(2502.20470, 2308.07570, 2309.16833) do not contain the word at all."* I
confirmed 2308.07570 has zero, and additionally found **2603.25915 has zero**.
The count is an undercount, in the conservative direction.

### Attribution defects found (none is a misquotation)

1. **`research/U-FRAME.md`:773** reads *"The operator is PRIOR ART (Holt and Rudd
   2014, §6a)"*. There is no §6a in 1408.6002 — §6 is *"Polignac's conjecture and
   Hardy & Littlewood's Conjecture B"* and has subsections 6.1, 6.2, 6.3. The
   intended referent is U-FRAME's own §6a, as `operator-and-pair-count.md`:13
   makes explicit by writing *"U-FRAME §6a"*. **As written it reads as a section
   of the Holt paper and is wrong.** The operator is 1408.6002 **§5**, which is
   what every other site says.
2. **`research/G2-STATE.md`:104** attributes 1402.1970 to *"Holt"* alone. The
   PDF title page reads **FRED B. HOLT AND HELGI RUDD**. `PRIOR-ART.md`:260
   already corrects this in general terms; this site was missed.
3. **Theorem 2.3 is cited without a section number** at `PRIOR-ART.md`:141,
   `moire-primes.md`:162 and `moire-primes.md`:329. It is §2.2, p.8.
4. **The fusion-spacing sentence is cited as Lemma 3.1** in audit item 6. It is
   unnumbered prose on p.11. Lemma 3.1's hypothesis carries the same fact.
5. **The population recursion is cited as Lemma 3.1** in audit item 3. It is
   Corollary 3.2, p.12.

### Two internal conflicts, visible from the PDF, that are ours to settle

- **Zone vs interval of survival.** `GLOSSARY.md`:63-65 differentiates (*"which
  shares the upper endpoint and **starts higher**"*); `moire-primes.md`:141-143
  identifies (*"the two vocabularies are describing one object"*). The PDF settles
  the fact: 2603.25915 p.10 gives ΔH(p_k) = [p_k², p_{k+1}²], and our zone is
  (p, p'²). **They share the upper endpoint and Holt's starts higher.** GLOSSARY
  is right; `moire-primes.md` is wrong and should be brought into line.
- **Exact Invariance Lemma status.** `moire-primes.md`:707 still lists it under
  *"Not found (candidate novelties)"* while audit item 3 rules it prior art.
  Per item 1 above, the correct resolution is prior art **via Smith and the
  Copying Theorem**, not via Lemma 3.1.

## 5. The open-problem list — it exists, and it says what we say, but not in the paper a reader will look in

**The claim.** `G2-STATE.md`:808 and `LOCALIZED-GAP.md`:10 say the localized-window
application is *"on Holt's own open-problem list"*.

**Where it is not.** arXiv:1408.6002 §1.1 is literally titled *"Some conjectures
and open problems regarding gaps between primes"* (pp.2-3), and its six items are
the Twin Prime Conjecture, Polignac's Conjecture, the Primorial conjecture, HL
Conjecture B, ET Spikes and ET Superlinearity. **None concerns a maximum gap in a
localized window.** §1.2 then says *"We do not resolve any of the open problems as
stated above."* 1402.1970 has no open-problem list; its §5 Conclusion is a recap.
A reader sent to "Holt's open-problem list" and handed the 2014 papers will not
find our question.

**Where it is — arXiv:2603.25915v1, and it is a direct hit.** §4.1 *"Regarding
Legendre's Conjecture"* defines the localized maximum gap and then asks for its
trend, PDF page 23:

> *The discussion above leads us to consider two functions related to Jacobthal's
> function. Jacobthal's function, often denoted h(p_k#) is the largest gap in the
> complete cycle G(p_k#). Let's define a function over intervals I*
>
> *g_max(I, p) = max { g : g ∈ G(p#) ∩ I }.*
>
> *In this notation Jacobthal's function h(p#) = g_max([1, p# + 1], p). **We are
> curious about the restriction of this function to the intervals of survival***
>
> *g_max(ΔH(p), p)*
>
> ***This function is related to Jacobthal's function, but it is restricted to the
> interval of survival. What are the trends of the maximal gaps g that occur within
> ΔH(p)?*** *The second function we're curious about is a refinement of that first
> one, g_max([(p_k + j)², (p_k + j + 1)²], p_k) where 0 ≤ j < g₃.*

And §4.2 *"Future directions"*, PDF page 24, names it as work to be done:

> ***Another direction for future work is a study of where large gaps g ≥ 2p_k + 4
> occur in the cycle.*** *Hagedorn has produced a few values for Jacobthal's
> function [3], and these consistently exceed the bound 2p_k from investigating
> Legendre's conjecture. **We propose to develop primorial coordinates [6, 8] for
> Hagedorn's examples [3], to see how the instances of large gaps are situated
> within the cycles of gaps G(p_k#) relative to the horizon of survival p²_{k+1}.***

**Verdict: VERBATIM on both of our quotations, and the claim is SUPPORTED.**

| ours | source | difference |
|---|---|---|
| *"We propose to develop primorial coordinates for Hagedorn's examples, to see how the instances of large gaps are situated within the cycles of gaps G(p_k#) relative to the horizon of survival p_{k+1}^2."* | as above, p.24 | **the citation markers `[6, 8]` and `[3]` are silently dropped.** Nothing else differs. Unmarked elision, cosmetic. |
| *"If Legendre's conjecture holds, then the largest gaps g >= 4p+6 have to occur beyond the horizon of survival."* | p.22: *"If Legendre's conjecture holds, then the largest gaps g ≥ 4p + 6 have to occur beyond the horizon of survival, and if large gaps g of span g > 2p+4 fell within the horizon of survival, they would have to be misaligned or out of phase with the quadratic intervals."* | **truncated at "survival" with no ellipsis.** The retained clause is exact and its sense is unchanged. |

**Two things to fix, both about precision rather than truth.**

1. **`LOCALIZED-GAP.md`:8-10 sends the reader to the wrong place.** It says *"Read
   `research/PRIOR-ART.md` §"Holt and Rudd" first. The fusion mechanism below is
   theirs, published 2014. ... that application is on Holt's own list of open
   problems."* The 2014 sentence is about the mechanism and is right; the
   open-problem sentence is about a **2026, single-authored** paper and the
   sentence does not say so. PRIOR-ART does source it correctly, so a reader who
   follows the instruction lands in the right place — but the sentence alone
   invites the reader to look for an open-problem list in the 2014 papers, where
   §1.1 is titled *"Some conjectures and open problems"* and does not contain it.
   **Add "(2603.25915 §4.1-4.2, 2026)".** Same for `G2-STATE.md`:808.
2. **The window is not the same window.** Holt asks about `g_max(ΔH(p), p)` on the
   interval of survival `[p_k², p_{k+1}²]` and about the quadratic intervals
   `[(p_k+j)², (p_k+j+1)²]`. Our `M(x, Y)` is the largest twin-slot gap among gaps
   starting below `Y`, for `Y = 10⁷, 10⁸, 10⁹`. Same shape of question, different
   window, and one class against two. That distinction is worth one sentence
   wherever the claim is made, because it is what keeps the claim a differentiation
   rather than a collision.

**A third open problem, which we do not currently record and should.**
1408.6002 §7, PDF pages 31-32, closes with the survival question in as many words:
*"If we had a better characterization of the survival of the gaps in G(p#), or of
the distribution of subsequent closures across this cycle of gaps, we would be
able to make stronger statements about what these exact results on the gaps in
Eratosthenes sieve imply about the gaps between primes."* That is the 2014 paper
asking for the localization its machinery lacks, and it is a better citation for
"his machinery cannot localize" than anything we currently use.

## What I read

- **arXiv:1408.6002v1**, full 34-page PDF, `pdftotext -layout`, read in full:
  abstract, §1.1 and §1.2 (the open-problem list and the analogues), §2.1
  Lemma 2.1 and its proof, §2.2 Theorem 2.3 with proof and Corollary 2.4, §3.1
  Lemma 3.1 with the following discussion and Figure 2 caption, Corollary 3.2,
  §4 in full, §5 with the M_J matrix and §5.1 eigenstructure, Lemma 5.1, §6
  heading and the Conjecture B statement, §6.3 max-gap material and Corollary 6.7,
  §7 in full, §8 Conclusion, references.
- **arXiv:1402.1970 v1 and v2**, full 13-page PDFs, diffed. §4 *"Data &
  Observations"* read in full including both tables and the Jacobsthal passage,
  §5 Conclusion, references, and all eleven numbered statements compared across
  versions.
- **arXiv:2603.25915v1**, full 25-page PDF: §1 recursion and fusion-span passage,
  §2 with Conjecture 2.1 and the E_s definition, §3 with Theorem 3.3 and the η
  definition, §4.1 and §4.2 in full, references.
- **arXiv:2308.07570v5**, full 18-page PDF, searched for the absence check only.
- **github.com/fbholt/Primegaps-v2** at HEAD: file tree (52 files), README,
  `00_Tbl_of_Contents.ipynb` and `90_notes.ipynb` markdown in full. Confirms
  *"intervals of survival ΔH(p)"* and *"horizons of survival"* as live Holt
  vocabulary. **No open-problem list there.** Its ΔΦ table (max ΔΦ 0.9333, 1.5143,
  2.5195, 3.5475, 5.4388, 8.6592, 14.4180, 20.9128 at p = 5…29, with N₀⁺ counts)
  is available and is the natural cross-check for `discrepancy-two-class.md`;
  not checked here, out of scope.
- **Our side, read in context before judging**: `research/LOCALIZED-GAP.md`,
  `research/PRIOR-ART.md` §"Holt and Rudd", `research/G2-STATE.md` §2 and §8,
  `paper/moire-primes.md` §§ around lines 141-166 and 616-713,
  `research/U-FRAME.md`, `research/ATTACKS3.md`, `research/a3-09-histogram-operator.md`,
  `research/two-class-lower-bounds.md` §7, `research/localized-04-maxsum.md`,
  `research/GLOSSARY.md`, `research/a3-05-bound-L.md`, `research/kappa-not-L.md`,
  `research/history/staging/audit-novelty-postaudit.md`.

## Coverage, and where this could still be wrong

- **1408.6002 has exactly one version.** v2 through v5 all return 404. There is no
  version in which the numbering differs, so no citation of ours can be stale.
- **1402.1970's statement numbering is identical in v1 and v2**; only reference
  numbers shift by one. We cite sections and statements, never reference numbers,
  so nothing moves.
- **Not checked**: the ten other arXiv manuscripts in the Holt corpus. This pass
  covered the two named in the brief plus the two that our own quotations turned
  out to depend on. `PRIOR-ART.md`'s per-paper table for the other ten is
  unverified by this check.
- **Still not read, and unchanged from `PRIOR-ART.md`**: Holt's 2022 book
  *Patterns among the Primes*, not on arXiv. It remains the most likely single
  place for the spacing question to have been asked, and it is the one place that
  could overturn the absence claim in item 4.
- **The absence claim remains an absence claim.** Item 4 records what I searched
  for and what came back. It is stronger evidence than we had, and it is not proof.
