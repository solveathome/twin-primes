# Literature verification against the PDF of record: Banks–Ford–Tao

<!-- ledger
id: Q-lit-pdf-bft
status: ANSWERED
todo: none
question: Do our Banks-Ford-Tao quotations survive checking against the PDFs of record?
verdict: All three quotations VERBATIM, checked by scripted normalised diff rather than by eye; one was misattributed by the brief and not by the document (it is Maier-Pomerance), the demotion resting on their model R stands, and the corrections owed to the record are listed.
-->

*(2026-08-18. Verification pass, read-only. Three quotes checked character by
character against publisher/arXiv PDFs, plus one structural claim about the
paper's model `R`. No repo file was edited except this one.)*

---

## 0. What was obtained, and how

**PDFs OBTAINED.** All five below were downloaded as PDF and text-extracted
locally with `pdftotext` (poppler 24.04.0). None of the verifications below
rests on ar5iv, arXiv HTML, an abstract page, a search snippet, or a
restatement inside a third paper.

| file | what it is | pages | sha256 (first 16) |
|---|---|---|---|
| `arxiv.org/pdf/1908.08613v1` | BFT preprint v1, stamp `arXiv:1908.08613v1 [math.NT] 22 Aug 2019` | 38 | `f5a2e7d6564e1b98` |
| `arxiv.org/pdf/1908.08613v2` | BFT preprint v2, stamp `17 Apr 2023` | 42 | `db1cf0277a9f350a` |
| `arxiv.org/pdf/1908.08613v3` | BFT preprint v3, stamp `12 Aug 2025` (current) | 42 | `ce04b3c9fa9a081b` |
| `ford126.web.illinois.edu/wwwpapers/gaps-model.pdf` | BFT, author's own site, recompiled 23 May 2026 | 42 | `a5d5c6fa74f311f1` |
| `ams.org/.../S0002-9947-1990-0972703-X.pdf` | Maier–Pomerance, TAMS journal PDF (AMS free access, scanned + OCR) | 37 | `5f715ebb96520be0` |

**PDF NOT OBTAINED: the Inventiones typeset version.**
`link.springer.com/content/pdf/10.1007/s00222-023-01199-0.pdf` returns an HTML
paywall page, not a PDF. Journal metadata confirmed via Crossref:
**Invent. Math. 233 (2023), no. 3, 1471–1518**, DOI `10.1007/s00222-023-01199-0`.
No claim below asserts a Springer page number.

**Caution on the `Date:` line.** arXiv's `GenPDF` recompiles LaTeX at download
time, so the `\date` footer is the *generation* date, not the version date: the
v1 PDF footers "December 21, 2024" while its margin stamp reads
`v1 ... 22 Aug 2019`. Use the margin stamp. Ford's site copy carries no stamp
and footers "May 23, 2026"; its text is identical to v2/v3 at every point
checked here.

---

## 1. `research/two-class-lower-bounds.md`:169–176 — §1.7 Open Problems, item (3)

### (a) Verdict: **VERBATIM.**

Section number, item number and wording all check out. The quote matches v2, v3
and the author's site copy character for character (verified by scripted
normalised diff, not by eye).

### (b) Source beside ours

Source, arXiv v3, **PDF page 8 = printed page 8**, under the heading
`1.7. Open Problems.`, item `(3)`:

> Analyze the distribution of large gaps between special elements of R. For
> example, what is the largest gap between elements of {n : n ∈ R, n + 2 ∈ R}
> below x? This should be a good predictor for the maximal gap between pairs of
> twin primes and likely will involve a different extremal sieve problem.

Ours (`two-class-lower-bounds.md`:172–176) is identical string-for-string once
the markdown shell (`> `, backticks, `**`) is stripped.

**The one textual difference across versions, and ours is on the right side of
it.** arXiv **v1** reads `...between pairs of twin primes, and likely will
involve...` — with a comma. v2, v3 and Ford's copy drop that comma. Our quote
has no comma, so it matches the current text and not v1. Item (2) of §1.7 also
differs between v1 ("the statements of Theorem 1.1 and Conjecture 1.2") and
v2/v3 ("the statement of Theorem 1.1"), which is a second, independent
confirmation that our reading came from v2 or later.

**Bolding.** Our block bolds `a different extremal sieve problem`. The PDF sets
that phrase in plain roman. The emphasis is ours and is not marked as ours.
BFT's only typographic emphasis anywhere near it is the italic on the section
title. Same issue at `audit-novelty-postaudit.md`:212, which calls it
"**Open Problem 1.7(3)**" — the bold there is on our own label, which is fine.

### (c) Which version paginates that way

`1.7. Open Problems.` sits on **page 8 in every version checked** — v1, v2, v3
and Ford's site copy — even though v1 has 38 pages and the rest 42. The *item
number* `(3)` and the *section number* `1.7` are likewise stable across all
four. Our document cites section and item, not a page, so the citation is
version-robust. Springer's page number for this paragraph is unknown here (see
§0); it is not claimed.

### (d) Is the surrounding claim supported?

**Partly. The quote is clean; one sentence built on it overstates.**

`two-class-lower-bounds.md`:178 says:

> That is exactly `G2`, posed as open by two of the authors of the machinery we
> are trying to adapt.

- *"two of the authors of the machinery"* — **supported.** The machinery is
  FKMPT (Ford, Konyagin, Maynard, Pomerance, Tao); Ford and Tao are two of the
  five and are authors of BFT.
- *"exactly `G2`"* — **not supported as an identity.** `G2(x#)` is defined at
  `two-class-lower-bounds.md`:42 as an **extremal** quantity: the maximum over
  all choices of `a_p` of the length of an interval covered by
  `{a_p, a_p − 2} mod p`. BFT item (3) asks for the largest gap in
  `{n : n ∈ R, n + 2 ∈ R}`, a **random** set, where the `a_p` are drawn
  uniformly. In BFT's own frame these are two different objects joined by a
  theorem, not by a definition: their random gap `G_R(x)` (Theorem 1.1) is
  *stated in terms of* the extremal quantity `W_y` at (1.11),
  `W_y := min |[0, y] ∩ S_{(y/log y)^{1/2}}|`, the minimum taken over all
  choices of residue classes. `G2` is the two-class analogue of `W_y`, not of
  `G_R`. BFT say as much in the quoted sentence itself: the random question
  "likely will involve a different extremal sieve problem". The honest phrasing
  is that item (3) is the model-`R` sibling of `G2`, and that BFT name the
  two-class extremal sieve problem as the input it will need.
- *"the single best confirmation that the ABSENT rows above are real absences"*
  (line 179) — **supported.** Three authors including two FKMPT authors listing
  the difference-2 object as an open problem, and predicting it needs a sieve
  problem not yet solved, is good evidence the rows are absences and not search
  failure. This survives the correction above, because it only needs item (3) to
  be unanswered, which it is.

---

## 2. `research/two-class-lower-bounds.md`:184–193 — "Their p. 205, verbatim"

### (a) Verdict: **VERBATIM.** But the brief misattributed it, and the document
did not.

**This quote is Maier–Pomerance, not Banks–Ford–Tao.** The section heading two
lines above it, `two-class-lower-bounds.md`:182, is "### 2c. Where Maier and
Pomerance's exponent 2 comes from", and "Their" refers back to that. The
verdict table at line 96 states the source explicitly: `TAMS 322 (1990)
201-237, p. 205`. The document is right; the verification brief that sent me
looking for p. 205 inside BFT was working from a wrong premise. p. 205 cannot
be a BFT page: the Inventiones article runs 1471–1518.

I verified it against Maier–Pomerance anyway, since that is what the document
claims.

### (b) Source beside ours

Source: **H. Maier and C. Pomerance, "Unusually large gaps between consecutive
primes", Trans. Amer. Math. Soc. 322 (1990), no. 1, 201–237**, PDF page 5,
printed page 205 (running head `LARGE GAPS BETWEEN CONSECUTIVE PRIMES   205`),
in §2 "The basic argument". The AMS PDF is a 2009 scan with an OCR layer, so I
also rendered page 205 to a 200 dpi image and read the typeset page directly
rather than trusting the OCR text. Both readings agree.

> ... The traditional argument is to use each prime in (z, x] to delete a
> single member of **R** ∪ **R**′. Since there are (1 + o(1))x/log x primes in
> (z, x], if we had chosen c₀ = 1 so that c″ < 1, then (2.3) and (2.4) show
> that this strategy will succeed. What we will show below is that for a
> certain positive proportion of the primes in (z, x], we can remove two
> members of **R** ∪ **R**′ and so we may choose c₀ somewhat larger than 1.
>
> If **R** ∪ **R**′ can be viewed as a random set of residues mod q for each
> prime q ∈ (z, x] and these are "independent events" for the different values
> of q, then we would expect to be able to remove (log x)^{1+o(1)} members of
> **R**∪**R**′ for a positive proportion of these q's. If such an argument could
> be made rigorous we would have a proof of (1.5).

Differences against ours: **none in the quoted words.** Both ellipses in our
block sit exactly where text was dropped, and what they drop is the
`(1 + o(1))x/log x ... c₀ = 1 ... c″ < 1` sentence and the
`for each prime q ∈ (z, x] and these are "independent events" for the different
values of q,` clause. Neither omission changes the sense.

**Bolding.** Ours bolds three whole sentences. Maier–Pomerance use boldface on
page 205 only for the set symbols **R** and **R**′, never for a sentence. The
sentence-level emphasis is ours and is not marked as ours.

### (c) Which version paginates that way

**The journal, and it is the only version.** Received 21 November 1988,
published TAMS 322 (1990), no. 1, 201–237; this is pre-arXiv and there is no
preprint pagination to confuse it with. "p. 205" is therefore an unambiguous
claim about the journal and it is correct.

### (d) Is the surrounding claim supported?

**Yes, on every checkable part.**

- `(1.5)` is, on printed page 202, `J(x) ≥ log x (log log x)^{2+o(1)}`, and MP
  add "In fact, we conjecture that equality holds in (1.5)." Our §3 line 220
  renders this in the primorial frame as `g(x#) = x (log x)^{2+o(1)}`, which is
  the correct translation, since `log P(x) ~ x` makes `log log P(x) ~ log x`.
  MP make that same substitution themselves at Theorem 2.1.
- `c₀ = 1.31256` — **verified**, abstract and (1.3): `c₀ = 1.31256...` is the
  solution of `4/c₀ − e^{−4/c₀} = 3`.
- "buys the constant `c₀` and nothing in the exponent" — **verified**: (1.4) has
  the identical shape to Rankin's (1.1), only the constant changes from `e^γ` to
  `c₀e^γ`.
- "the conjectured exponent decomposes as 1 + 1" (line 195) — this is our
  reading, not their sentence, and it is a **fair** one: MP's own claim is that
  the `(log x)^{1+o(1)}`-per-large-prime heuristic "supports the assertion
  (1.5)", and multiplying the removal per large prime by `(log x)^{1+o(1)}`
  multiplies the coverable length by the same factor, taking the classical
  `x(log x)^{1+o(1)}` to `x(log x)^{2+o(1)}`. It reads as an interpretation in
  the document and should stay marked that way.

**One reader hazard, not an error.** §2b and §2c sit adjacent and both use the
letter `R` for different objects: BFT's model `R` at (1.10), and MP's
`R = R(1) ∩ second residual set` at (2.1). MP also use `R′` at (2.2), which BFT
do not use at all. A reader arriving at line 184 from line 172 has just been
told what `R` means, and it is not what it means eight lines later.

---

## 3. The model `R`, and whether the demotion stands

### (a) Verdict on the quote at `audit-novelty-postaudit.md`:203–205:
**VERBATIM.**

Found exactly, in all four BFT PDFs, in §1 Introduction, **PDF page 1**:

> In contrast to the well known prime model C of Cramér [6] and the subsequent
> refinement G of Granville [16], in which random sets are formed by including
> positive integers with specific probabilities, **the model R proposed here is
> comprised of integers that survive the sieve when a random residue class is
> selected for every prime modulus below a specific bound.**

Our audit quotes the bolded span with no alteration. (The abstract says the same
thing with "survive the **sieving process**"; our quote is the introduction's
wording, "survive the **sieve**", which is what it claims to be.)

The audit's two other BFT fragments also check out:

- `(1.8)–(1.9)`, **PDF page 5**: `V_H(z) = P(H ⊂ S_z)` (1.8), and
  `S_z := Z \ ⋃_{p⩽z} (a_p mod p)` (1.9), with "P denotes probability over a
  uniform choice of residue classes a_p mod p, for every prime p, with the
  random variables a_p mod p being jointly independent in p". Our audit's
  one-line restatement of this is accurate.
- §1.8, **PDF page 8**: "we prove Theorems 1.3 and 1.4 in Section 4 **using
  first and second moment bounds**. Section 5 and 6 contain **probability
  estimates on |[0, y] ∩ S_w|** for various ranges of w." Both quoted fragments
  verbatim.

### (b) Their actual definition of `R`, and what it is not

Two equations, both on **PDF page 5** of every version:

> `S_z ..= Z \ ⋃_{p⩽z} (a_p mod p)`  (1.9)
>
> `R ..= {n ⩾ e² : n ∈ S_{z(n)}}`  (1.10)

**`R` is one class per prime.** One `a_p`, uniform, independent across `p`. It
is not a two-class model, it is not a difference-2 model, and BFT never define
a two-class ensemble anywhere in the paper. Their only two-class object is the
sentence in Open Problem 1.7(3), which is posed and not answered.

**But the relation is closer than "different model", and the arithmetic matters
here.** For our rotation ensemble (`natal-cap-21` §Setting: `c_j ∈ Z/q_j`
uniform, `r` dies iff `c_j ∈ {r, r+2}`, i.e. the deleted classes are
`{c_j, c_j − 2}`), the identity is exact:

> `n ∈ S_z` and `n + 2 ∈ S_z`  ⟺  `n ∉ (a_p)` and `n ∉ (a_p − 2)` for all `p ⩽ z`
> ⟺ `n` avoids the pair `{a_p, a_p − 2} mod p`.

So the rotation ensemble **is** the difference-2 pair ensemble, and the
difference-2 pair ensemble **is** `{n : n ∈ R, n + 2 ∈ R}` — the *twin subset*
of BFT's model, which is precisely the object of Open Problem 1.7(3). It is not
`R`. Two structural differences from BFT beyond the class count: BFT sieve up to
`z(n)` varying with `n` where our ensemble uses a fixed range `(x, √W]`, and our
ensemble sits on a natal set `N ⊂ Z/W` rather than on `Z`. Also `p = 2`
degenerates, since `{t, t − 2}` is one class mod 2.

### (c) Version and page

Definition at (1.9)–(1.10), **page 5**; introduction sentence, **page 1**;
Open Problem 1.7(3), **page 8**. Identical placement in v1, v2, v3 and the
author's site copy. Springer pagination not obtained and not claimed.

### (d) Does the demotion stand?

**As worded, no. On a corrected ground, partly.**

The demotion at `audit-novelty-postaudit.md`:185–221 rests on two sentences:

1. `:189–192` "Both live on the **rotation ensemble** = a set of integers formed
   by deleting a uniformly random pair of residue classes {t, t−2} mod q for
   every sifting prime q."
2. `:200–201` "**W. Banks, K. Ford and T. Tao** ... define exactly this model".

Sentence 2 is **false against the PDF**. BFT define a one-class model. The audit
half-concedes this itself at `:208` — "That is our rotation ensemble in the
one-class case" — which is a different and weaker statement than "define exactly
this model", and the weaker statement is the true one. The self-criticism at
`:536–540` then re-hardens the false version ("the ensemble is
Banks–Ford–Tao's") and uses it to say item 4 might deserve to drop further.

What survives, and what does not:

- **Survives: BFT is the right citation.** The rotation ensemble is the twin
  subset of `R`, BFT name that subset in Open Problem 1.7(3), and none of
  `natal-cap-19`, `natal-cap-21`, `natal-cap-31`, `anchored-calm.md` cites BFT.
  That gap is real; I re-grepped all four and all four return zero hits on
  "Banks", "Ford" and "1908.08613". The corpus's only BFT citation anywhere in
  the body is `two-class-lower-bounds.md`:169.
- **Survives: the method demotion.** Nothing in this pass touches
  Bertsimas–Popescu, the Christoffel function or the Mertens/Bonferroni
  obstruction. Those grounds for RELATED are untouched by the `R` finding, and
  the "one phrase to fix" at `:257–260` (`natal-cap-21` Theorem 2's "the first
  anywhere") stands on its own.
- **Does not survive: BFT as prior art for the ensemble *bounds*.** BFT do not
  analyze the two-class object. They list it as open, and they predict it "likely
  will involve a different extremal sieve problem", which is the opposite of
  "this is already done". Citing BFT *against* our ensemble bounds inverts what
  BFT actually say about it. The BFT evidence supports "cite them for the
  object" and does not support "they already bounded it".
- **Unresolved, and it is the load-bearing one.** `:513–517` flags that the
  search never covered FKMPT "Long gaps in sieved sets" (JEMS 2021), which
  allows `C₀` classes per prime and "is the closest published home for a
  two-class ensemble". That is where a real demotion would come from, and this
  pass did not go there either. The verdict on item 4 should be read as resting
  on the classical-method grounds only, not on `R`.

---

## Corrections to the record

Proposed only. No repo file was edited.

1. **`research/history/staging/audit-novelty-postaudit.md`:200–201** — "define
   exactly this model" is false against arXiv:1908.08613 (1.9)–(1.10). BFT's `R`
   is one residue class per prime. Correct to: BFT define the one-class model
   `R`; our rotation ensemble is the difference-2 twin subset
   `{n : n ∈ R, n + 2 ∈ R}`, which BFT name in Open Problem 1.7(3) and leave
   open.
2. **`research/history/staging/audit-novelty-postaudit.md`:536–540** — "the
   ensemble is Banks–Ford–Tao's" carries the same error and uses it to argue
   item 4 may deserve PRIOR ART. The BFT evidence does not carry that argument;
   FKMPT (JEMS 2021) is where the question is still open, as `:513–517` already
   says.
3. **`research/two-class-lower-bounds.md`:178** — "That is exactly `G2`"
   overstates. Item (3) asks for the largest gap in the *random* set
   `{n : n ∈ R, n + 2 ∈ R}`; `G2` is the *extremal* quantity, the two-class
   analogue of BFT's `W_y` at (1.11), not of their `G_R(x)`. Suggested wording:
   "That is the model-`R` sibling of `G2`, and BFT name the two-class extremal
   sieve problem as the input it will need." The "single best confirmation of
   the ABSENT rows" sentence at :179 is unaffected.
4. **`research/two-class-lower-bounds.md`:169** — add the identifier. The quote
   matches arXiv:1908.08613 **v2 or later** and not v1 (v1 has a comma after
   "twin primes" and a different item (2)). Suggested: "Banks, Ford and Tao,
   *Large prime gaps and probabilistic models*, arXiv:1908.08613v3, §1.7 Open
   Problems, item (3), p. 8; published Invent. Math. 233 (2023), no. 3,
   1471–1518."
5. **Bolding provenance, two sites.** `two-class-lower-bounds.md`:175–176 and
   :186–193 bold spans that are plain roman in both sources. The house rule that
   added emphasis must not read as the source's should be stated once beside
   each block, or the bolding dropped. Maier–Pomerance do use boldface on p. 205,
   but only on the symbols **R** and **R**′.
6. **`research/two-class-lower-bounds.md`:184** — "Their p. 205" inherits its
   antecedent from the §2c heading, one line and one blank line away, and the
   preceding section's "Their" is Banks–Ford–Tao. Naming Maier–Pomerance in the
   sentence would remove a live misreading; the two sections also use the letter
   `R` for two different sets.

---

## What I read

- `arxiv.org/pdf/1908.08613v1`, `v2`, `v3` — full PDFs, downloaded and text
  extracted locally. Read: page 1 (introduction, model `R` sentence), page 5
  ((1.8), (1.9), (1.10), §1.4 and `W_y` at (1.11)), page 8 (§1.7 Open Problems
  and §1.8 Plan of the paper), page 9 (§2.1).
- `ford126.web.illinois.edu/wwwpapers/gaps-model.pdf` — the author's own copy,
  same pages, as a fourth control on the wording.
- `ams.org/journals/tran/1990-322-01/S0002-9947-1990-0972703-X/S0002-9947-1990-0972703-X.pdf`
  — Maier–Pomerance, printed pages 201–205 read in full, and page 205 also read
  as a 200 dpi rendered image because the AMS file is a scan with an OCR layer.
- Crossref API for both journal records (BFT DOI and page range;
  Maier–Pomerance DOI, which is `...0972703-X`, not `...0972703-6` — the wrong
  suffix 404s on ams.org and cost a first attempt).
- In-repo, for context before judging the claims:
  `research/two-class-lower-bounds.md` (lines 1–240),
  `research/history/staging/audit-novelty-postaudit.md` (lines 170–293,
  500–549), `research/natal-cap-21-beyond-chebyshev.md` §Setting,
  `research/lit-provenance.js`, `research/qc/corpus.js`.

**Not read.** The Inventiones typeset PDF (paywalled; see §0), and
Ford–Konyagin–Maynard–Pomerance–Tao "Long gaps in sieved sets", JEMS 2021, which
is where the open question in §3(d) would actually be settled.

*History and superseded claims: `research/history/CHANGELOG.md`.*
