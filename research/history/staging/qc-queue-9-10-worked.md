# The `provenance` and `search-convention` queues, worked

<!-- ledger
id: Q-qc-queue-9-10
status: ANSWERED
todo: none
question: Can the provenance and search-convention queues be cleared without suppressing anything?
verdict: TOTAL 84 to 0 with nothing suppressed and every finding resolved in the corpus: all six not in OEIS claims were FALSE, since the G2 ladder is A144311 + 1 and PRIOR-ART.md already recorded the find 270 lines further down; the honest remainder is that five of 75 were resolved by rewording a sentence that was never a literature claim.
-->

**Date:** 2026-08-18. **Start: TOTAL 84** (`provenance` 8, `search-convention` 75,
`scripts` 1 belonging to a concurrent agent). **End: TOTAL 0**, with
`node research/qc/selftest.js` still showing all 21 positives firing and all 12
controls silent, and `node research/audit-numbers.js` at 108/108 in 163.8 s.

**Nothing was suppressed.** Neither new check consults a ledger, so option 3 of
the brief — adjudicate into `qc/ledgers.js` — was not available without editing
`qc/checks.js`, which is the instrument. Every one of the 83 findings was
resolved in the corpus instead. The only two ledger entries added are to
`transfers`, and they exist because *my own* edits re-opened two adjudicated
pairs; both are content-keyed, dated, and carry the word-diff that settled them.

---

## 1. The headline: six false claims, and three more the check never saw

The brief called the six `not in OEIS` claims the highest-value findings. They
were higher than that: **every one of them was false.** The `G₂` ladder is
`A144311 + 1` — a(1)…a(22), Carter 2008, extended by Alekseyev 2009 and Wang
2024 — and the corpus was asserting its absence in six places while, 270 lines
further down its own `PRIOR-ART.md`, recording that it had been found.

Corrected at: `PRIOR-ART.md` (verdict table row, and the "three candidate
novelties" summary), `G2-STATE.md`:174, `U-FRAME.md`:602, `paper/moire-primes.md`:504,
`ATTACKS2.md`:27, `NATAL-CAP-CAMPAIGN.md`:57.

**Three more of the same class were found by reading, not by the check**, because
their paragraphs happened to name an owning convention and so cleared:

| site | what it said | what is true |
|---|---|---|
| `PRIOR-ART.md` §Ziller-Morack | "Our own G2 ladder … is NOT in OEIS, **checked at three offsets**" | the −1 offset returns A144311 at once; the three offsets did not include it |
| `U-FRAME.md` §6a | "**Our G2 sequence itself is not there**: exact-term searches … at three offsets all return nothing" | same, and this is the paragraph the other two cite |
| `PRIOR-ART.md` verdict table | `G₂ as a studied object` = **possibly novel** | rediscovery; the verdict is withdrawn |

Consequences now stated at all three: `oeis-G2-submission.md` is a **duplicate
and must not be sent**, and `G₂(41#) = 546` is already published as A144311's
`a(13) + 1`, so computing it buys verification rather than discovery.

**A fourth false absence, in `two-class-lower-bounds.md` §2 row 12.**
"computational work beyond Resta / Morack / Ziller — **ABSENT**", with an empty
source cell. It is REFUTED: A144311 carries three independent computational
efforts plus Wang's linked C++ branch-and-bound, and Hagedorn is the one-class
computational prior art. Rows 3 and 5 of the same table were refuted and
narrowed earlier the same day; row 12 is the third, and §2's closing sentence
("the single best confirmation that the ABSENT rows above are real absences")
is narrowed accordingly.

**A fifth, in `TODO.md`.** The prior-art item still listed four uncovered
searches. Three had been closed hours earlier: the 2009 SeqFan thread (rebuilt
from Wayback, 142 months, 19,964 messages, zero hits for `144311`, calibrated in
the same pass), Paseman's heuristic (weaker — unbounded exponent), and
zbMATH/non-English (both done). Only Holt's 2022 book and **MathSciNet** remain,
and MathSciNet is still unsearched with no substitute run in its place.

**A sixth, in `anchored-windows.md` §5.** "we found no prior study" for the kill
shadow. That file's own header already says the kill shadow was absorbed into
the Unification Law and "the novelty claim does not stand". The body had not
been told. It has now.

---

## 2. `provenance` 8 → 0: the artifact carried back, never invented

Seven source PDFs were verified earlier today and the results were sitting in
`history/staging/lit-pdf-*.md` without ever reaching the citing document. All
eight findings were closed by carrying that note back.

| citing site | artifact now recorded | report |
|---|---|---|
| `covering-dive.md`:137 | arXiv:2302.00459v2 PDF **p. 3**, checked against the published Izvestiya PDF **p. 226** | `lit-pdf-kalmynin-konyagin.md` §2 |
| `dhr-verification.md`:191 | arXiv LaTeX source `marsrc/almostprime.tex`, checked against the arXiv PDF **p. 11** | `lit-pdf-halberstam-richert.md` §2 |
| `dhr-verification.md`:249 | Matomäki–Teräväinen arXiv PDF **p. 33** — *not* the book, which was not opened | `lit-pdf-halberstam-richert.md` §3 |
| `maier-matrix.md`:550 | Annals **165 (2007) p. 599** = PDF p. 7, and arXiv:math/0406018v1 PDF | `lit-pdf-fgkt-maier.md` item 2 |
| `maxgap-law.md`:363 | arXiv:1408.4505v2 PDF, foot of **p. 3** onto p. 4, glyph bounding boxes for the scripts | `lit-pdf-fgkt-maier.md` item 1 |
| `two-class-lower-bounds.md`:152 | JEMS **23 (2021) 667–700, Remark 7 on p. 674**, `ems.press` CC BY PDF | `lit-pdf-fkmpt.md` quote 1 |
| `two-class-lower-bounds.md`:190 | arXiv:1908.08613v3 PDF **p. 8** | `lit-pdf-banks-ford-tao.md` item 1 |

Three of those notes also record what was **not** obtained — the Springer
typeset BFT article is paywalled, the Halberstam–Richert book is unreachable,
Cheer–Goldston was not read — and those disclaimers travelled back with the
provenance rather than being dropped.

**The eighth was not a literature quotation at all.** `maier-matrix.md`:154 is
our own identity, restated in Maier's language, in a `>` block under a heading
reading "What the identity **says** in Maier's language". The word "says" was
the attribution cue; a reader would have taken the display for a Maier
quotation. The heading now reads "The identity in Maier's language" and the
prose states plainly that the display is ours. That is the finding doing its
job, on a defect nobody had noticed.

Two further corrections rode along, from the same reports: `dhr-verification.md`
now records that our compression of the fundamental lemma drops the quantifier
"for some `K ≥ 1`", and that `maier-matrix.md`'s `scratchpad/holt/gs.txt`
citation points at another session's scratchpad that no reader can reach.

---

## 3. `search-convention` 75 → 0: how each was resolved

Counted by what the fix actually was, not by file.

| resolution | n | examples |
|---|---|---|
| **corrected — the claim was false** | 10 | the six `not in OEIS`; two-class row 12; the `TODO` prior-art item; `anchored-windows` §5 |
| **narrowed — no owning convention exists** | 14 | the two-class window variance (`PRIOR-ART`, `variance-note`); beats/aliasing; the Zone-Equivalence biconditional at three sites; the twin Hensley–Richards question; the seam-count and k-pair-diameter sequences; `two-class` row 9 |
| **named the convention actually searched** | 26 | the β₂ / sieve cluster (`sift-limit-attack` ×8, `G2-STATE` ×3, `THE-DIALS`, `ZONE-POSTULATE`, `TODO` ×3, `wall-note` ×2, `natal-cap-10`); the covering-systems cluster; the A144311 re-runs in `covering-dive` and `PRIOR-ART` |
| **rescoped — an internal absence reading as a literature one** | 7 | "nobody has tried it directly" in `TODO` 0c, `U-FRAME` ×2, `gate-multiplies`; `OBSERVATIONS`; `PROPOSAL` ×2 |
| **reworded — never a literature claim** | 5 | `PAPERS`:82 "no paper may go out"; `writing-style-math`:35 "No paper of ours"; `PROPOSAL`:587 "one no paper can make"; `covering-dive`:55 "nobody has been able to reproduce" (about a citation count); `PRIOR-ART`:163 "not in print until the late 2010s" (a publication date) |
| **annotated — an index row describing another file's job** | 2 | `README.md`:65 and :93 |

The middle two rows are the substantive work and they are 40 of the 75.

**The check's own scan count fell from 89 trigger phrases to 66**, and that gap
is the honest part: 23 phrases no longer exist because the sentence carrying them
was corrected, rescoped or reworded. All 66 that remain now name where they
looked. Nothing was deleted to hide a claim; where a claim was withdrawn, the
withdrawal is written where the claim stood.

### The house phrasing, applied

Where no owning convention exists, the fix was to say so rather than to
manufacture one. The pattern used throughout:

> not found — but `SEARCH-CONVENTIONS.md` §1 records no owning convention for
> this object, so the search was run in our own wording and the negative carries
> the weight that entails, which is little.

`PRIOR-ART.md`'s verdict legend now carries the same rule at the top of the file,
so a future `possibly novel` verdict has to earn it: *"a clean negative run in
our own wording does not earn the verdict, because that is what five waves
produced against a sequence published in 2008."*

---

## 4. `SEARCH-CONVENTIONS.md`: five §3 rows, and §6 rewritten

**§3 gained five rows**, each carrying back a search the corpus already recorded
but had nowhere to point at: the `κ = 2` extremal example, sieves that re-admit
input beyond `|A_d|`, the position-uniform bilinear remainder, the
covering-systems question, and the Erdős-problem sweep (recorded with its own
caveat — the site's `/search` endpoint 404s, so it rests on one agent's one
pass). Nothing in those rows is new research; every one names the document that
ran it.

**This deliberately did not touch §1.** The clearing vocabulary is parsed out of
§1's table at run time, so a row added there changes what the check accepts. The
count before and after is identical — **20 owning conventions and 7 house
terms** — which is the evidence that no suppressor was widened. §3 is read by
people, not by the check, so it is free of that hazard.

**§6 was stale in one word** and is rewritten: it said "Nothing mechanical
enforces §1 yet", which stopped being true when the check went into the gate. It
now records what the check does, what it cannot do, and the warning that a row
added to §1 to make a claim pass is "a suppression wearing a table's clothes".

---

## 5. Adjudications: two, both to `transfers`, both forced by this work

`search-convention` and `provenance` consult no ledger. An entry for either in
`qc/ledgers.js` would be inert, so none was written — recorded here so nobody
later reads the empty section as "nothing needed adjudicating".

What did need it: rescoping "nobody has tried it directly" in `TODO` 0c,
`U-FRAME` §5a and `gate-multiplies` §9 changed all three fingerprints and
re-opened two adjudicated `transfers` pairs — exactly the designed behaviour.
Both were re-read and re-adjudicated KEEP:

- `46d3ce:670601` (was `46d3ce:76b9a4`, F12) — U-FRAME §5a step 2 vs gate-multiplies §9
- `46d3ce:90a9ec` (was `113946:46d3ce`, F13) — TODO 0c vs U-FRAME §5a step 2

What the original verdicts protected — the `VERIFIED 40 of 40` marker, the range
"five folds and `m ≤ 8`", the no-straddling clause — is present on all three
sides, unchanged. The only difference introduced is the scoping sentence.

---

## 6. Four side-effects this work caused, all caught by the gate

Worth recording, because three of them are traps for the next person doing this.

1. **`quotes` 0 → 4.** Naming `SEARCH-CONVENTIONS.md` in a paragraph that also
   contains a quoted span makes `quotes` try to find the quote *in that file*.
   Two of the four were genuine defects it surfaced: our own phrases sitting in
   quotation marks (`"almost all length-p² windows contain a twin slot"`,
   `"one omitted class per arbitrary prime"`), now italics. The other two were
   fixed by naming an owning convention instead of the file.
2. **`absence` 0 → 1.** Writing "CLOSED — it does not exist" about the SeqFan
   thread created a fresh unverifiable absence claim. Replaced with the
   measurement (142 months, 19,964 messages, zero hits, calibrated), which is
   what the verdict actually rests on.
3. **`sourcing` 0 → 1.** Adding "MathOverflow 88323" to `two-moire-argument.md`
   put a bare substantive number in a file with no producing script. Removed.
4. **`transfers` 0 → 2.** §5 above.

**And one mechanical fact that shaped half the edits.** The shared paragraph
builder treats a `**Bold lead-in.**` as a list item, so the whole block is scoped
line by line and the convention has to sit on the *same physical line* as the
trigger phrase. This is `qc-checks-9-10.md` §5.3, and it costs an attempt each
time it is rediscovered. Consequence: several lines in `sift-limit-attack.md`,
`G2-STATE.md` and `TODO.md` are now long. Reflowing them will re-open the
findings.

---

## 7. The honest remainder

Six things this pass did not settle.

1. **No literature search was re-run.** Every convention named in the corpus now
   was carried back from a document that already recorded running it. Where the
   record did not stretch to the claim, the claim was narrowed instead — two
   wordings that asserted a slightly wider search than the record supports
   (`ZONE-POSTULATE.md` route B, `covering-dive.md` §4.2's FKMPT bullet) were
   softened after being written, rather than left standing.

2. **Truth is still unchecked, by construction.** Every claim now says where it
   looked; nothing says the absence is real. Two are flagged uncalibrated and
   stay that way: the **twin Hensley–Richards question** (`TODO`,
   `natal-cap-04`) and the **two-class window variance** (`PRIOR-ART`,
   `variance-note`). Neither has an owning convention in §1, so the negatives
   cannot be calibrated until somebody finds one — which is the whole lesson of
   A144311.

3. **The four documented false-positive shapes were not adjudicated**, because
   there is nowhere to adjudicate them to. `README.md`:65 and :93 are index rows
   annotated in place; `writing-style-math.md`:35 and `PROPOSAL.md`:587 were
   reworded. If a ledger hook is ever added to `search-convention`, these four
   are its first entries, and the reasons are in
   `qc-checks-9-10.md` §5.4.

4. **MathSciNet remains unsearched**, paywalled, with no substitute run in its
   place. Untouched here; it is the largest open channel in §5.

5. **The Erdős-problem absence still rests on one agent's one pass.** The site's
   search endpoint 404s to every automated route. Now tabled in §3 with that
   caveat attached, which is the most that can be done without a browser.

6. **Five findings were resolved by rewording a sentence that was never a
   literature claim.** That is not suppression, but neither is it a mathematical
   improvement, and it is the class most easily abused by a future wave under
   time pressure. All five are named in §3's table so the ratio stays visible:
   five of 75, against 40 that were corrected or narrowed.
