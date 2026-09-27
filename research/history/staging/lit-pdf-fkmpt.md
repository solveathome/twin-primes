# lit-pdf-fkmpt — FKMPT verified against the PDFs of record

<!-- ledger
id: Q-lit-fkmpt-quotes
status: ANSWERED
todo: none
question: Do the corpus's FKMPT quotations hold against the journal PDFs of record?
verdict: All three quotations are VERBATIM or CONFIRMED and two of the three surrounding claims are supported; the third is not, the cited section 1.3 does not exist (the passage is 1.1) and the connective overreaches, and five corrections are drafted including one silent elision inside a block labelled verbatim.
-->

Read-only literature verification, 2026-08-18. No repo file edited except this one.
Nothing committed, nothing pushed.

## PDF OBTAINED — four of them, including both journal PDFs of record

This task's honesty clause does not need to be invoked. The journal versions are
Open Access under CC BY at EMS Press and both were pulled directly as PDF
(`content-type: application/pdf`), not as HTML.

| artifact | what it is | provenance | pages |
|---|---|---|---|
| **journal PDF of record** | J. Eur. Math. Soc. **23**, 667–700 (2021), DOI 10.4171/JEMS/1020 | `ems.press/content/serial-article-files/32526`, CC BY, pdfTeX-1.40.21, created 2021-03-04 | 35 |
| **corrigendum PDF of record** | J. Eur. Math. Soc. **25**, 2483–2485 (2023), DOI 10.4171/JEMS/1305 | `ems.press/content/serial-article-files/32884`, CC BY, pdfTeX-1.40.24, created 2023-04-21, "Received September 19, 2022" | 3 |
| arXiv **v4** | corrigendum-incorporated preprint, arXiv stamp `arXiv:1802.07604v4`, dvips+Ghostscript, created 2022-09-20 | `arxiv.org/pdf/1802.07604v4` | 34 |
| arXiv **v2**, **v3** | pulled only to date the constant change and the remark renumbering | `arxiv.org/pdf/1802.07604v{2,3}` | — |

Text taken with `pdftotext -layout`; the one superscript/subscript question was
settled from glyph bounding boxes (`pdftotext -bbox-layout`), not from the flattened
text. No ar5iv, no arXiv abstract page, no HTML rendering, and no third-party
restatement was used for any verdict below.

## Verdicts

| # | quote | verbatim? | our surrounding claim |
|---|---|---|---|
| 1 | `two-class-lower-bounds.md:146` Remark 7 | **VERBATIM** | **SUPPORTED** |
| 2 | `two-class-lower-bounds.md:159` smooth numbers | **VERBATIM** | **SECTION NUMBER WRONG, and the connective is not supported** |
| 3 | `paper/moire-primes.md:763` corrigendum constant 6 | **CONFIRMED** | **SUPPORTED** |

---

## Quote 1 — `research/two-class-lower-bounds.md:146`, Remark 7

**(a) VERBATIM.** Diffed word by word against the journal PDF after restoring our
marked ellipsis and stripping our backtick/subscript markup. Exactly one token
differs, and it is disclosed by our own document (see (b)).

**(c) Location.** Published: **Remark 7, p. 674**, inside **§1.1 "Comparisons of
methods"**. arXiv v4: PDF p. 7, same remark number.

**(b) The one difference: `[6]` in the journal, `[7]` on arXiv.**

- Journal text of record: `a sieve upper bound (e.g., [6, Cor. 2.4.1])`
- Our document, and arXiv v2/v3/v4: `a sieve upper bound (e.g., [7, Cor. 2.4.1])`

This is **not an error**. `two-class-lower-bounds.md:142-144` explicitly states it is
using "v3/v4 text and v3/v4 bibliography numbering, in which `[7]` is Halberstam and
Richert, *Sieve Methods*, Academic Press, London, 1974", and that identification is
correct. Confirmed in four bibliographies:

- arXiv v2, v3, v4 all print `[7] H. Halberstam and H.-E. Richert, Sieve Methods, Academic Press, London, 1974.` (v4: PDF p. 31)
- journal, p. 700: `[6] Halberstam, H., Richert, H.-E.: Sieve Methods. Academic Press, London (1974)`; the journal's `[7]` is **Hooley**, *Applications of Sieve Methods to the Theory of Numbers*.

The shift is one slot from `[3]` onward: the arXiv bibliography carries
`[3] N. Tschebotareff` and `[13] B. L. van der Waerden`, which the journal list does
not. So the *target* is right in both numbering schemes and our disclosure is
accurate. The hazard is only for a reader who takes the `[7]` to the JEMS 23 PDF that
`two-class-lower-bounds.md:93` also cites; there `[7]` resolves to Hooley.

**Also checked and exact.** The remark body is **byte-identical across v2, v3 and v4**
and identical to the journal text. `log^2 X` is genuinely a **superscript**: in v4 the
`2` glyph sits raised (yMin 496.10, yMax 504.07) against `log` (yMin 498.34,
yMax 509.25), i.e. `log² X`, not the iterated `log₂ X`. This matters because the
Dartmouth preprint uses `log₂` for the iterated log elsewhere in the same sentence;
v4 and the journal both spell the other one out as `log log X`, so there is no
ambiguity left.

**Version history in the same parenthesis, all confirmed:** the remark is **Remark 8
in v2** and **Remark 7 from v3 on**, and its text is unchanged — verified by direct
diff, not inferred.

**(d) Surrounding claim: SUPPORTED.** The three assertions the quote is placed under
all hold at source:

- "two classes per prime on half the primes is inside a published theorem" — journal **Example 3** (`n²+1`) is one-dimensional with `ρ = 1/2` and Theorem 1 applies. Confirmed.
- "Two classes on *all* primes is not" — Remark 7 itself calls `I_p = {0, 2}` for all `p` a **two-dimensional** system and says their methods do worse than trivial there. Confirmed.
- "the forced relation `ρ >= 1/B`" — journal **Remark 1**: "since `I` is one-dimensional, we must have that `ρ ⩾ 1/B`". Confirmed verbatim.

---

## Quote 2 — `research/two-class-lower-bounds.md:159`, the smooth-number obstruction

**(a) VERBATIM.** Exact match to the journal text, character for character, once
end-of-line hyphenation (`ele-ments`) is undone.

**(c) Location.** Published: **p. 673**, inside **§1.1 "Comparisons of methods"**.
arXiv v4: PDF p. 7. It is the paragraph immediately preceding the one that ends
"...discussed in more detail in the next section", which is itself immediately
followed by Remark 7.

**(d) TWO PROBLEMS WITH THE SURROUNDING CLAIM.**

### Problem 1 — `research/two-class-lower-bounds.md:157` cites a section that does not exist

Our line reads "And the structural reason, from their **§1.3**, verbatim:".

**There is no §1.3 in this paper, in any version.** Section 1 has exactly two
subsections:

- journal (2021): `1.1. Comparisons of methods` and `1.2. Notation` — a grep for `1.3.` over the whole 34-page journal PDF returns nothing
- arXiv v4 and the Dartmouth Revision 2: `1.1. Comparisons of methods`, `1.2. Notation`
- Dartmouth preprint `longgaps.pdf`: `1.1. Discussion of methods`, `1.2. Notation`

The correct citation is **§1.1**, p. 673. This is exactly the class of defect this
verification exists to catch: the quotation is perfect and the pointer beside it is
dead.

### Problem 2 — the opening ellipsis removes the mechanism, and the mechanism is a different one

Our document elides the head of the sentence. The full sentence at source is:

> Unfortunately, when considering the more general sieving systems of Definition 1
> **in which the cardinalities `|I_p|` are allowed to vanish for many primes `p`**,
> bounds for smooth numbers cannot be used to show that `S_{z,x}` contains an interval
> with unusually few elements. Without this crucial step the existing methods only
> yield the trivial lower bound of `≫ x` for the gap size.

and the sentence immediately after it, which our document does not quote:

> Moreover, for a general sieving system which is **ρ-supported with ρ < 1**, we expect
> that no such reasonably long interval containing so few elements will exist in
> `S_{z,x}`, meaning that this feature is genuinely unique to the Eratosthenes sieving
> system.

Our document introduces the quote as "**the structural reason**", following directly
from Remark 7 about the *two-dimensional* twin-prime system. But the reason the
authors actually give is about `|I_p|` **vanishing** for many primes — sparse support,
`ρ < 1` — which is the **other** axis of generalisation, not `|I_p| = 2`. The
Erdős–Rankin smooth-number step is described here as failing for one-dimensional
systems with `ρ < 1`; the paper does not offer this passage as the reason the
two-dimensional case fails. So the connective "the structural reason [for Remark 7]"
is **not supported by the quote in its own context**.

The gloss two lines later — "The smooth-number step is the whole Erdős-Rankin lineage
and it is **specific to `I_p = {0}`**" — *is* supported, but by the unquoted "genuinely
unique to the Eratosthenes sieving system" sentence rather than by the quoted span.
The Eratosthenes system is `I_p = {0}` by the paper's own Example 1 (p. 669).

**Net effect:** the conclusion survives; the stated reason for it does not. A minimal
repair is to fix `§1.3` to `§1.1`, extend the quotation by the following sentence so
the "unique to Eratosthenes" clause is actually present, and soften "the structural
reason" to something that does not claim Remark 7's two-dimensional failure is what
this passage explains.

---

## Quote 3 — `paper/moire-primes.md:763`, "the corrigendum's constant 6 is the one to use"

**(a) CONFIRMED**, from the standalone published corrigendum PDF.

**(c) Location.** J. Eur. Math. Soc. **25**, 2483–2485 (2023), DOI 10.4171/JEMS/1305,
opening paragraph on p. 2483 and its item (1).

**What the corrigendum actually changed.** Its opening paragraph, verbatim:

> The authors are grateful to Mikhail Gabdullin for pointing out a number of
> errors/typos in the paper. The most serious are errors in the exponents of `H` on
> pages 685–686, which, when corrected, force the parameter `M` to be somewhat larger
> than claimed, namely `M > 6`. This affects the numerical estimates for the exponents
> of `log log x` in Theorem 1 and corollaries. Below we enumerate the specific errors and
> corrections. A version of the paper incorporating all of these corrections is posted
> at arXiv:1802.07604.

Twenty-two numbered items follow. The ones that carry constants:

| item | correction |
|---|---|
| (1) p. 669 | in Theorem 1, the factor `4 + δ` **should be 6**; corrected lower bound `C(ρ) > e^{−1−6/ρ}`; corrected asymptotic `C(ρ) ~ ½ e^{−6/ρ}` as `ρ → 0⁺` |
| (2) p. 669 | Example 1: `C(1) > 1/835` |
| (3) p. 670 | Corollary 1: `C(1/d) > e^{−(6d+1)}` |
| (4) p. 671 | (1.7) and Corollary 2: `C(1/2) > 1/325565` |
| (5) p. 675 | `M` is a fixed number slightly larger than 6 |
| (6) p. 678 | in (2.10), write `6 < M ⩽ 7`; "M sufficiently close to 6" |
| (7) p. 680 | `ε` satisfying `M < 6 + 6ε` |

**The corrected constant is 6**, replacing `4 + δ`, in `C(ρ) := sup{δ ∈ (0,1/2) :
6·10^{2δ}/log(1/(2δ)) < ρ}` and in `C(ρ) > e^{−1−6/ρ}`. Both read directly off arXiv
v4 Theorem 1 (PDF p. 2). The journal 2021 text is the pre-correction one: it prints
`(4 + δ)·10^{2δ}`, `C(ρ) > e^{−1−4/ρ}`, and `4 + δ < M ≤ 5` at (2.10).

**(d) Surrounding claim: SUPPORTED.** `paper/moire-primes.md:763` is accurate,
including the bibliographic detail `ibid. 25 (2023), 2483–2485`, which matches the
running heads of the corrigendum PDF exactly.

**Everything `two-class-lower-bounds.md:124-137` says about the constant is also
correct**, verified against all four PDFs:

- v2 and v3 print `(4 + δ)·10^{2δ}` and `C(ρ) > e^{−1−4/ρ}` — confirmed in both
- v4 prints `6·10^{2δ}` and `C(ρ) > e^{−1−6/ρ}` — confirmed
- `C(1/2) > 1/325565` appears at v4 (1.7), Corollary 2 and Example 3 — confirmed, and it is corrigendum item (4)
- the retired `1/6001` is the value printed in the journal's Example 3 and Corollary 2 — confirmed, and `325565/6001 = 54.25`, so "54x larger" is right

---

## Corrections to the record

### C1 — `research/two-class-lower-bounds.md:157`: `§1.3` does not exist, the passage is `§1.1`

Highest-value finding. The quotation is verbatim but the section pointer is dead in
every version of the paper. Should read **§1.1 "Comparisons of methods", p. 673**.

### C2 — `research/two-class-lower-bounds.md:157`: "the structural reason" overreaches

The quoted passage gives the obstruction for systems where `|I_p|` **vanishes** for
many primes (`ρ < 1`), not for two-dimensional systems. See Quote 2, Problem 2 above
for the minimal repair.

### C3 — `research/covering-dive.md:85` dismisses the corrigendum's own wording as "the publisher's blurb"

That line records a challenge, refused, whose refusal reasoning is **factually wrong**.
It says of the phrasing "errors in the exponents of `H` on pages 685–686":
"**Change refused; the page-number form is the publisher's blurb, not the paper's.**"

It is not the blurb. It is the **body text of the published corrigendum**, first
paragraph, p. 2483, quoted in full under Quote 3 above. The corrigendum's actual
abstract is a different and shorter sentence that contains no page numbers at all:

> This corrigendum fixes a number of small errors/omissions in [J. Eur. Math. Soc. 23,
> 667–700 (2021)], which in particular affect the numerical values of the exponents of
> `log log x` in Theorem 1 and its corollaries.

The true situation is that **the two documents word it differently and both are the
authors'**:

| document | wording |
|---|---|
| published corrigendum, JEMS 25, p. 2483 | "The **most serious** are errors in the exponents of `H` **on pages 685–686**, which, when corrected, force the parameter `M` to be somewhat larger than claimed, namely `M > 6`." |
| arXiv v4, Appendix A, PDF p. 32 | "The **only** error which affect the results of the paper are are errors in the exponents of `H` **in the deduction of Theorem 2 from Theorem 3**. When corrected, these force the parameter `M` to be somewhat larger than claimed, namely `M > 6`." |

Note also the substantive difference beyond the locator: "the **only** error which
affect the results" (v4) versus "the **most serious**" (published). The `are are` typo
is in v4 as the corpus records. `covering-dive.md`'s *quotation* of v4 is exact; only
its parenthetical explanation of where the page-number form came from is wrong, and it
was used to refuse a correction that was in fact citing the paper.

### C4 — `research/two-class-lower-bounds.md:116-122`, a silent elision inside a block labelled "verbatim"

Our ρ-supportedness bullet reads "we say that the sieving system is *ρ-supported* if
`lim_{x→∞} |{p<=x : |I_p| >= 1}| / (x/log x) = ρ`". The source (journal p. 669;
v4 PDF p. 2) reads:

> (ρ-supportedness) Given `ρ > 0`, we say that the sieving system system is
> `ρ`-supported if **the density of primes with `|I_p| ≥ 1` equals `ρ`, that is,**
> `lim_{x→∞} |{p ≤ x : |I_p| ≥ 1}|/(x/log x) = ρ`.

The bolded clause is dropped with **no ellipsis**. Style defect, not a correctness
defect — the meaning is unchanged and the displayed limit is the same. The
one-dimensionality bullet above it is exact. (The duplicated "system system" is a typo
present in both the journal and v4; normalising it is harmless.)

### C5 — `research/two-class-lower-bounds.md:130-132`, the `n²+1` paraphrase misses `I_2`

Ours: "there `I_p = {ι_p, -ι_p}` for `p ≡ 1 (mod 4)` and `I_p = ∅` **otherwise**".
Source, Example 3 (journal p. 671–672): "`I_2 = {1}`, `I_p = ∅` is empty for
`p ≡ 3 (mod 4)`, and `I_p = {ι_p, −ι_p}` for `p ≡ 1 (mod 4)`". So `I_2 = {1}`, not `∅`.
This sits outside the quote block, so it is a paraphrase slip. It does not touch the
conclusion: `B = 2` and `ρ = 1/2` both stand.

## Checked and clean, no action

- `paper/beta2-note.md:186` cites "FKMPT, J. Eur. Math. Soc. 23 (2021), **Remark 7**; corrigendum ibid. 25 (2023), 2483–2485". Remark 7 is Remark 7 in the published version. Correct as written.
- `research/covering-dive.md:73-75` on Theorem 1's hypotheses and the `6` constant: matches v4 Theorem 1 exactly.
- `research/covering-dive.md:83` on the Dartmouth preprint numbering (`Remark 4`, marker `[9]`): the divergence between drafts is real, and the note's core point stands — Halberstam–Richert is the target under every numbering scheme. Now confirmed in **four** bibliographies rather than two, and extended by the journal's `[6]`.
- `research/two-class-lower-bounds.md:139-144`: `ρ ⩾ 1/B` is journal Remark 1, verbatim.

---

Process record. Working documents carry current understanding only; this file is the
staging note behind the entries above. See `research/history/CHANGELOG.md`.
