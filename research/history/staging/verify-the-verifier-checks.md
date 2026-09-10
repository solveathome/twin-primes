# Verify the verifier: mutation-testing the QC gate

<!-- ledger
id: Q-verify-the-verifier
status: ANSWERED
todo: none
question: Does the QC gate's alarm ring when a defect of each real class is present, rather than merely reading green?
verdict: Of the 31 blind mutations the existing selftest covers zero: it is a reachability test proving each alarm can ring, never a sensitivity test asking how far a defect must move before the alarm stops, and its fourteen controls are all obvious silences; the ranked blind spots are listed with a proposed fix each, led by out-sha256 being written and never read.
-->

**Date:** 2026-08-20. **Question asked:** not "is the gate green" but "does the
alarm ring when a defect of each real class is present".

**Custody.** Every mutation ran on a copy under the session scratchpad
(`scratchpad/mut/base`, an rsync of the working tree with binaries excluded,
16 MB, which reproduces `TOTAL 0` on its own). Nothing in this repository was
edited except this file. `node research/qc.js` read `TOTAL 0` before the pass
and `TOTAL 0` after it.

**One thing to know before reading the numbers.** A sibling session was editing
this repository throughout the pass (`TODO.md` 07:55, `research/qc/ledgers.js`
07:56, `research/scanstat2-01-t31.js` 07:57, plus about thirty more). None of
those edits are this pass's, none were reverted, and the mutation results are
all relative to the frozen scratchpad snapshot, so they are internally
consistent. The live-defect findings in §5 were re-verified against the tree as
it stood at the end of the pass.

**Headline.** 44 mutations were injected. **11 fired. 31 were invisible to all
eleven gated checks. 2 fired when they should not have.** Three defects that
were never injected at all are sitting in the corpus right now, under a green
gate, and are described in §5.

---

## 1. What each check's name promises, against what its code tests

| check | what the name promises | what the code actually tests | the gap |
|---|---|---|---|
| `refs` | internal references resolve to a file and a section | a path exists on disk; and, for `<file>.md §N`, that the **integer prefix** `N` is in the set of headings whose text begins with a digit | a section label is truncated at the first non-alphanumeric character. `§6.5`, `§6.9` and `§6` are the same token to this check. `§P6`, `§Theorem B`, `§stratum` match no pattern at all and are never tested. A `§` reference into a file with **no** numbered headings returns early and clears silently (`if (!secs.size) return`). Prose form needs a resolvable token immediately before the word "section", so one stopword ("in section 47") disables it |
| `quotes` | attributed quotations still present in the document they cite | a quoted span clears if the target contains the exact normalised string **or if 95% of its words longer than three characters appear anywhere in the target file** | the fallback is a bag-of-long-words test. Word order is invisible. Every word of three characters or fewer is invisible, so `not`, `no`, `all`, `any`, `one`, `two`, `≤`, `≥` can be inserted or deleted freely. The words need not be adjacent, in the same sentence, or in the same section. Coverage is **14 of 205 quoted spans (6.8%)**; 106 are dropped for carrying no attribution cue, 41 for sitting in a paragraph containing a word like "corrected" |
| `crosslinks` | every working document is reachable from an entry point | some other body document's raw text **contains the basename, or the basename with `.md` stripped, as a substring** | reachability is substring collision. A file named `G2.md` is reachable from every document in the corpus that mentions G2, which is nearly all of them, without a single link existing. The transitive walk over the same predicate inherits the flaw |
| `scripts` | every script parses, is titled, and is referenced | `new vm.Script` compiles; some line in the first 16 is a comment that is not a rule; some `.md` in the repo **including history** contains the basename or stem | "referenced" is satisfied by a spent staging report. Compiling is not running. A title is any comment line, true or false |
| `transfers` | near-duplicate passages that differ, where hypotheses go missing | pairs of paragraphs from different files with 5-gram Jaccard ≥ 0.45 **or** containment ≥ 0.7, excluding pairs above 0.995, minus a fingerprint ledger | it detects a dropped hypothesis by measuring similarity, and **dropping a hypothesis lowers similarity**. Measured below: removing a four-token scope from one side took a real pair from `c=0.89` to `c=0.57` and out of the check entirely. It also cannot see a claim that exists in only one place, and it never says *what* differs |
| `calibration` | the same named object carried at the same strength everywhere | a Title-Case name ending in Lemma/Theorem/… followed within 50 characters by one of twelve ALL-CAPS markers, in **two or more files**, with at least one settled and one unsettled marker | an object named in one file only is unconstrained, which is where most overstatement happens. Any word outside the twelve-word vocabulary is invisible: `ESTABLISHED` is not a marker. A marker 51 characters after the name is invisible. It compares a document against a document, never against the artifact |
| `absence` | claims that an artifact does NOT exist | enumerates absence phrases whose paragraph also names a resolvable artifact and that carry no dated ledger entry | states its own limit honestly. Two further narrowings are not stated: a paragraph naming **no** artifact is dropped unchecked, and a dated ledger entry never lapses, so the check is silent by construction on exactly the event that falsifies it |
| `sourcing` | our numbers name the script that produced them | **per file**: if the file's text matches `/[A-Za-z0-9_.\-]+\.js\b/` anywhere, or matches a literature marker anywhere, every number in it is exempt | one script mention anywhere in a document sources every number in that document, including numbers no script produced. The words `et al.` exempt a whole file. Nothing binds a number to a producer |
| `embeds` | a script's pasted output belongs to the code above it | **one** comparison: `code-sha256` against the hash of the bytes above the banner | the header of this very check names three findings; the code implements one. `out-sha256` is written into every tail and **never read by any static check**. So the code is bound to the tail and the tail is not bound to itself: a digit hand-edited inside the OUTPUT block passes. A script with no tail, or whose tail the parser cannot find, is skipped by `if (!loc) continue` and carries no obligation at all |
| `provenance` | quotations of external work name the artifact they were read from | for quotations the extractor classifies as attributed **and** matching `/verbatim|quotes?|writes|states|says/`: a note is present, and if a disqualifying word is present a qualifying word is absent | one qualifying token anywhere in ten lines of context beats every disqualifying one. Adding `p. 4` beside "read from the ar5iv HTML rendering" clears it. The check is a keyword test on the sentence introducing the quote, not on the quote |
| `search-convention` | claims that a RESULT is absent from the literature say where they looked | within the paragraph, either the conventions file is named or a phrase from its §1 table appears | the vocabulary is global, not per-object: a convention phrase naming object A clears an ABSENT verdict about object B in the same paragraph. And the paragraph is the one `C.paragraphIndex` builds, which brings the next row in |
| `tailfmt.locate` | the one definition of what a tail is | scans **backward** from end of file for the last line matching `^\s*//\s*OUTPUT\b` | any later line beginning `// OUTPUT` steals the tail. The genuine fingerprint then falls above the new `outHead`, `fingerprint()` returns null, `outputText()` returns an empty body, and both `embeds` and `embed-backlog` skip the file with `continue`. The script silently leaves the provenance system |
| `ledgers.js` | which findings a human already ruled on, and why | three lookup tables consulted by `refs`, `transfers` and `absence` | nothing verifies that a key corresponds to anything, that a reason is true, or that an entry was ever earned. An adjudicated key that no longer matches any live pair is not reported. Measured below: one hand-written line converts a live finding into `TOTAL 0` |
| `paragraphIndex` | the paragraph a line belongs to | a run of contiguous lines, kept **line by line** if any line in the block starts with `-`, `*`, `+`, a digit-dot, or `|` | `**Bold lead.**` starts with `*`. So any paragraph with a bold-opened line anywhere in it is scoped line-by-line for `quotes` and `search-convention`, and a citation on the adjacent line does not count. This is the confirmed quirk, and its cause is that the list test and the bold syntax share a character |

Two further facts about the surrounding gate, since `qc.js` prints all three
commands as one:

- `research/qc/selftest.js` builds a synthetic fixture and asserts that each
  finding *kind* is reachable. It never runs against this corpus and cannot see
  a defect here.
- `research/audit-numbers.js` recomputes numbers against **string literals held
  inside itself**. Apart from a handful of `readFileSync` calls on named `.js`
  and `.txt` artifacts, it does not read the corpus. No `.md` document is ever
  compared against a producer. A wrong constant in a document is outside its
  scope by construction, not by oversight.

---

## 2. The detection matrix

44 mutations, each applied to a fresh copy of the frozen snapshot and scored by
the delta in findings. `ADV` means the advisory tier only, which is outside
`TOTAL` by design.

### 2a. Numbers and custody

| # | mutation | should fire | fired | verdict |
|---|---|---|---|---|
| M01 | a wrong digit inside a READINGS figure (`exact-g2-ladder.js`, `618` → `619`) | `embeds` | `ADV readings-not-traceable` only, TOTAL 0 | **BLIND (gate)** |
| M02 | a wrong digit hand-edited inside a **fingerprinted** OUTPUT block (`01-zone-twin-share.js`, `"cand":440666` → `440866`) | `embeds` via `out-sha256` | **nothing, anywhere** | **BLIND — most severe** |
| M03 | a wrong digit inside a **legacy** OUTPUT block (`natal-cap-33-overnight.js`) | `embed-backlog` | **nothing, anywhere** | **BLIND** |
| M04 | a stale count in prose ("eight consecutive folds" where the artifact table says another number) | nothing structural | nothing | confirmed **structurally unverifiable** |
| M13 | one wrong constant, **consistent in two documents** (β₂ `4.26645` → `4.36645` in `a3-05-bound-L.md` and `ATTACKS3.md`) | `audit-numbers` | **nothing** in any of the three gates | **BLIND — the 0.41625 class** |
| M10 | a borrowed literature row pasted into READINGS with no provenance line | `embeds` or `provenance` | `ADV` only, TOTAL 0 | **BLIND (gate)** |
| M32 | code edited **and** `code-sha256` recomputed and hand-written; `out-sha256` left stale | `embeds` | **nothing** | **BLIND — structural** |
| M15b | the whole OUTPUT tail deleted, then the code changed | `embeds` | nothing (one advisory row disappears) | **BLIND** |
| M17 | a line beginning `// OUTPUT` appended after READINGS, then the code changed | `embeds` | nothing (advisory row disappears) | **BLIND — `locate` backward scan** |
| M14 | code edited after embed, tail untouched | `embeds` | `tail-does-not-belong-to-this-code` | control **OK** |
| M15f | a script header with no title at all | `scripts` | `no-banner-title` | control **OK** |

### 2b. Quotations

| # | mutation | should fire | fired | verdict |
|---|---|---|---|---|
| M05 | a quotation gains the word **"not"**: `"are genuinely comparable"` → `"are not genuinely comparable"` | `quotes` | **nothing** | **BLIND — short words are not content words** |
| M05c | a number changed inside a quoted external theorem: Iwaniec `(k log k)²` → `³`, still in quote marks | `quotes` | **nothing** | **BLIND** |
| M22 | a verbatim quote re-sourced to an ar5iv rendering, with `p. 4` added to the context | `provenance` | **nothing** | **BLIND — one qualifying token beats every disqualifying one** |
| M05b | the same quotation reworded so its long words differ | `quotes` | `dead-quotation` | control **OK** |
| M28 | a dead quotation in a paragraph containing the word "corrected" | `quotes` | `dead-quotation` | the REFUTING guard did **not** swallow it here; the hypothesis did not reproduce on this target |

### 2c. References and reachability

| # | mutation | should fire | fired | verdict |
|---|---|---|---|---|
| M06 | dead **dotted** subsection: `beta2-note.md §6.5` → `§6.9` (that file has §§1–8) | `refs` | **nothing** | **BLIND — this is a live defect, see §5** |
| M27 | dead **non-numeric** section: `natal-cap-36-skeleton-door.md §P9` | `refs` | **nothing** | **BLIND — live defect, see §5** |
| M24 | a `§7` reference into a file with **no numbered headings** | `refs` | **nothing** | **BLIND** |
| M07 | prose section reference behind a stopword: "`U-FRAME.md` in section 47" | `refs` | **nothing** | **BLIND** |
| M11 | a live document citing `research/history/staging/applied-D.md` as if live | a layer rule | **nothing** | **BLIND — no such rule exists** |
| M25 | an orphan named `research/G2.md`, nothing linking to it | `crosslinks` | **nothing** | **BLIND — stem collision** |
| M06b | dead integer section `§47` | `refs` | `dead-section` | control **OK** |
| M07b | canonical prose form "`U-FRAME.md` section 47" | `refs` | `dead-section` | control **OK** |
| M25b | an orphan named `zzz-orphan-note.md` | `crosslinks` | `unreachable` | control **OK** |
| M33 | a live document moved into `history/staging/`, citations left in place | `refs` | 10 × `dead-path` | control **OK** |
| M34 | a cited script deleted | `refs` | 2 × `dead-path` | control **OK** |
| M26 | a dead path inside a fenced ```sh code block | nothing (it is an example) | `dead-path` | **FALSE POSITIVE** |

### 2d. Transferred claims

| # | mutation | should fire | fired | verdict |
|---|---|---|---|---|
| M09f | one side of an **adjudicated** pair loses a scope: `G2-STATE.md` Traverse Bound drops "at Y = 10⁹" | `transfers` (the fingerprint lapses) | **nothing** | **BLIND, and perverse — see below** |
| M09b | a hypothesis dropped from a claim that exists in only one place | `transfers` | **nothing** | **BLIND by design** |
| M09c | both sides made identical and wrong | `transfers` | `transferred-claim` | fires, but only because the key re-keyed |
| M13b | the same wrong number in both halves of a pair | `transfers` | `transferred-claim` | fires, and names the pair without saying what changed |
| M23 | M13b, then its fingerprint pair hand-added to `ADJUDICATED` with an invented reason | nothing (unpoliced) | **TOTAL back to 0** | **BLIND — one line suppresses a live finding** |

M09f is the sharpest result in the pass and is worth stating on its own.
`transfers` exists to catch a copied claim that silently loses a hypothesis. It
finds candidates by similarity. Removing the four-token scope "at Y = 10⁹" from
one side of the `G2-STATE.md` / `LOCALIZED-GAP.md` Traverse Bound pair moved it
from `j=0.30 c=0.89` to `j=0.18 c=0.57`, below both thresholds (0.45 and 0.70).
The pair left the candidate set, the adjudicated key stopped matching anything,
and nothing was reported in either direction. **The bigger the hypothesis
dropped, the less likely this check is to see it**, and a vanished adjudicated
key is currently indistinguishable from a settled one.

### 2e. Calibration, absence, search convention, sourcing

| # | mutation | should fire | fired | verdict |
|---|---|---|---|---|
| M12b | a lemma carried PROVEN in the **only** document that names it, its own text saying otherwise | `calibration` | **nothing** | **BLIND** |
| M12c | `OPEN` → `ESTABLISHED` (a word outside the marker vocabulary) | `calibration` | **nothing** | **BLIND** |
| M19 | a new artifact that falsifies a dated `ABSENCE_VERIFIED` entry | `absence` | **nothing** | **BLIND — the documented trap, confirmed live** |
| M30 | an absence claim whose paragraph names no artifact | `absence` | **nothing** | **BLIND by design, undeclared** |
| M08b | an ABSENT verdict about object B cleared by a convention phrase about object A in the same paragraph | `search-convention` | **nothing** | **BLIND** |
| M21 | fabricated numbers added to a document that names some script elsewhere | `sourcing` | **nothing** | **BLIND** |
| M21b | fabricated numbers in a document containing "et al." | `sourcing` | **nothing** | **BLIND** |
| M12 | a marker overstated where the object is named in two files | `calibration` | `calibration-disagreement` | control **OK** |
| M08 | an ABSENT verdict with the owning convention on the **adjacent line**, in a bold-opened block | should stay silent | `unconventioned-absence` | **FALSE POSITIVE — paragraph-scope defeat confirmed** |

---

## 3. Scoring the existing selftest against this suite

`node research/qc/selftest.js` passes: 24 known positives fire, 14 controls stay
silent. It is doing real work and it caught three genuine instrument blind spots
when it was written. What it is not is what its own name suggests.

**What it covers.** Exactly one known positive per *finding kind*: `dead-path`,
`dead-section` (§ form and prose form), `dead-shorthand`, `dead-quotation`,
`unreachable`, `off-the-path`, `no-banner-title`, `uncited-script`,
`does-not-parse`, `transferred-claim`, `calibration-disagreement`,
`unverified-absence-claim`, `unsourced-measurement`, `unprovenanced-quotation`,
`disqualified-provenance`, `unconventioned-absence`, `extractor-uncalibrated`,
`hand-pasted-tail`, `tail-does-not-belong-to-this-code`, plus six `tailfmt`
normalisation cases. Every one of its positives is the **easiest instance of its
kind**. Of the 31 blind mutations above, the selftest covers **zero**: each is a
near-miss variant of a kind it already exercises in the form that fires.

**The correlated blind spot, stated plainly.** The selftest is a *reachability*
test, not a *sensitivity* test. It proves each alarm can ring. It never asks how
far a defect has to move before the alarm stops ringing, and the fourteen
controls are all obvious silences ("a section reference that resolves", "prose
with no quotation in it"). Not one control is a defect deliberately shaped to
slip through. A suite written by the checkers' authors will contain the cases
the authors thought of, and this one does.

**Two structural gaps in the selftest itself, both visible in its own source.**

1. The fixture writes `ledgers.js` as three empty Maps by construction. That is
   the right call for isolation, and it means **no selftest case can ever
   exercise a suppression**. M23 above is invisible to the selftest by design.
2. The honest embed fixture, `research/embed-honest.js`, carries
   `out-sha256: 0000000000…0000`. It is a **passing control**. That the fixture
   can carry an all-zeros output hash and be scored clean is proof inside the
   selftest that no static check ever reads `out-sha256`.

---

## 4. Ranked blind spots, with a proposed fix for each

Ranked by how much of the corpus's own burn history the class covers, times how
cheap the defect is to introduce.

### B1. `out-sha256` is written and never read (M02, M03, M10, M32)

Every fingerprinted tail carries a hash of its own output and no static check
compares it. A digit changed inside an OUTPUT block by hand, or by an agent
"tidying" a table, passes every gate. This is the direct descendant of the
`attack-lower-bound.js` fabricated-tail incident, and the mechanism built to
stop it only binds one of the two directions.

**Fix (check repair, small).** `embed.js` already knows the file it just wrote.
Have it also record `body-sha256: T.sha(T.normalize(T.outputText(written)))`,
and have `embeds()` recompute that from the file and compare. This is fully
static, costs microseconds, and catches every hand-edit of a bound block. Note
the one edge: `outputText` drops lines that are pure `=` rules, so a script
whose own stdout prints such a line needs its rule recorded; document it rather
than silently normalising it away.

A forged `code-sha256` (M32) is **not** fixable this way and should be recorded
as such: any hash a tool computes, a hand can compute. Binding it needs a signal
outside the file, which means `embed.js --check` (a re-run) or a pre-commit hook
that re-embeds. Honest classification: **structurally unverifiable by a static
check**.

### B2. `refs` truncates section labels and gives up on unsectioned files (M06, M27, M24, and three live defects)

Three real dead references are in the corpus right now under a green gate, all
of the same shape.

**Fix (check repair).** Capture the whole label, not the integer prefix:
`§\s*([A-Za-z0-9][A-Za-z0-9.\-]*)`, and build the target's label set the same
way, from the full heading text up to the first sentence break, so `6.5`, `P6`,
`Theorem B` and `7a-bis` are all comparable tokens. When a `§` reference points
at a file with **no** parseable labels, report a distinct kind
(`section-into-unsectioned-file`) rather than returning early; the corpus has
real instances and they are all defects.

### B3. `transfers` is anti-correlated with the defect it is named for (M09f, M09b, M23)

Dropping a hypothesis lowers similarity, and a large enough drop removes the
pair from the check. Separately, an adjudicated key that matches nothing is
never reported, so a suppression can outlive the pair it settled.

**Fix (new check, small).** On every run, compute the set of live candidate
fingerprint pairs and report every `ADJUDICATED` key that matches none of them
as `adjudicated-pair-vanished`. That single finding covers both failure modes:
a passage edited past the threshold, and a stale or invented ledger entry. It
also gives the ledger the lapse property `absence` has never had. Additionally,
record beside each ledger entry the two file paths and an anchor phrase, so the
report can say which passage went missing rather than only which hash did.

Detecting the dropped hypothesis itself is a harder problem and should not be
promised: the honest scope of `transfers` is "pairs that are still similar
enough to compare". Say so in its description, and stop describing it as the
check that catches dropped hypotheses.

### B4. `quotes` clears on a bag of long words (M05, M05c) and reaches 6.8% of spans

The fallback ignores word order, ignores every word of three characters or
fewer, and does not require the matched words to be adjacent or even in the same
section. Inserting "not" into a quotation is invisible. Changing an exponent
inside a quoted theorem is invisible. The corpus has burned on paraphrase-inside-
quote-marks twice in the recorded history.

**Fix (check repair, two parts).** (a) Replace the 95%-of-long-words test with a
contiguity requirement: the normalised span must appear in the target with at
most a small normalised edit distance, or with at most one contiguous gap. (b)
Report `cleared-by-fuzzy-match` as its own advisory category with a count, so
the description stops reading as "these were verified" when it means "these were
approximately matched". The denominator is already printed, which is the right
instinct; the fuzzy tier needs the same treatment.

### B5. `sourcing` is per file, not per number (M21, M21b)

One `.js` mention anywhere exempts every number in a document. The words `et al.`
exempt the whole file. The corpus's own burn history has the "25× with no
producer" case and the "MEASURED n=13 deficit inside an output block whose code
never printed an n=13 row" case, and neither would be caught today.

**Fix (check repair).** Scope the exemption to the **section** a number sits in,
using the heading index `corpus.js` already builds, and report
`unsourced-measurement` per section rather than per file. The literature
exemption should require the marker in the same section too. This will fire on
real documents at first; that is the point, and the queue is bounded by the
heading count.

### B6. `calibration` cannot see a single-sited overstatement or a synonym (M12b, M12c)

It compares documents against documents. The two incidents it was written for
were caught by a human opening the artifact, and the check cannot do that.

**Fix (partly a new check, partly honest scoping).** Widen the marker
vocabulary from a closed list to a list plus a warning: report
`unmarked-strength-word` when a named object is followed by a settled-sounding
word that is *not* in the vocabulary (`established`, `settled`, `demonstrated`,
`confirmed`), so the vocabulary grows from evidence. The single-sited case is
**structurally unverifiable by a cross-document check** and should be labelled
so: it needs the artifact read, which is an audit concern, and `calibration`'s
description should stop implying otherwise.

### B7. `crosslinks` treats substring collision as reachability (M25)

**Fix (check repair, small).** Require a real pointer: the basename with its
extension, a markdown link target, or a backticked stem. A bare stem match
should count only if the stem is at least, say, eight characters and contains a
hyphen, which is what this corpus's filenames look like. Report short-stemmed
documents as `reachability-unprovable` rather than clearing them.

### B8. The ledgers are unpoliced (M23)

One hand-written line in `ledgers.js` turned a live `transferred-claim` finding
into `TOTAL 0`. Nothing checks that a key matches a live pair, that a reason is
true, or that an entry was earned. The file's own header says the reasons are
the asset; nothing enforces it. B3's `adjudicated-pair-vanished` covers the
transfers ledger. `ABSENCE_VERIFIED` cannot be covered mechanically, which the
file already says, and should therefore carry a **review-by date** per entry and
a check that reports any entry older than a set interval as `absence-stale`.

### B9. `paragraphIndex` reads bold as a list (M08)

`**Bold lead.**` starts with `*`, so the block is scoped line by line, and a
convention or a citation on the adjacent line stops counting. This produces
false positives in `search-convention` and false negatives in `quotes`.

**Fix (check repair, one character class).** Test for list syntax with
`/^\s*(?:[-+]\s|\*\s|\d+\.\s|\|)/` so a bullet needs its trailing space and
`**` does not qualify. The selftest needs a case in both directions.

### B10. `search-convention` clears on any convention phrase in the paragraph (M08b)

A phrase owning object A clears an ABSENT verdict about object B.

**Fix (check repair).** Prefer table-row scoping where the claim is in a table
(the corpus's literature verdicts nearly always are), and require the clearing
phrase to be in the same cell or row. Outside tables, this is a real limit and
should be stated.

### B11. `provenance` is a keyword race in a ten-line window (M22)

One qualifying token beats every disqualifying token. **Fix:** require the
qualifying token to be in the same sentence as the disqualifying one, or report
`mixed-provenance` when both are present rather than silently clearing.

### B12. Classes that no check can hold, and should be named as such

- **A stale count in prose** (M04). No producer is named for a count word, and
  the artifact tables it should be read against are unstructured. Audit concern.
- **The same wrong constant in two or more documents** (M13). Nothing diffs a
  document against a producer. `audit-numbers.js` compares computed values to
  literals it carries itself, so a corpus-wide consistent error is outside every
  gate. The only mechanical route is the one the corpus has not built: a
  registry of load-bearing constants read **from** the documents and recomputed.
  Until that exists, this is the corpus's largest unguarded class and should be
  written down as such.
- **A dated absence falsified by a new artifact** (M19). The ledger says this,
  and this pass confirms it end to end.
- **A live document citing a spent staging file** (M11). No layer rule exists
  in code. The doc convention says closure narratives leave the live layer; a
  check could enforce it in five lines (`refs` already resolves the path, so
  flag any body document naming `research/history/`), and it should.
- **A range or band drawn from a subset of the rows it claims to summarise.**
  Named in the corpus's own history as a surface with no instrument. Confirmed
  here by absence: nothing in the eleven checks looks at it.

---

## 5. Three live defects found while calibrating, no mutation required

These are in the tree now, with the gate reading `TOTAL 0`. All three are the
B2 class.

1. `research/SEARCH-CONVENTIONS.md`:143 cites `sift-limit-attack.md` **§4.7**.
   That file's §4 has no subsections; its labels run 1, 2, 3, 4, 5, 6, 7, 7e,
   7d, 7c, 7a-bis, 7a-ter, 7a. `refs` reads the token as `4`, finds `4`, clears.
2. `research/anchored-calm.md`:31 cites `natal-cap-36-skeleton-door.md` **§P6**
   and `natal-cap-30-skeleton-bound.md` **§Theorem B**. The first does not exist
   (that file's headings are Theorem A, Corollary B, Proposition C, Measurement
   D, Proposition E, and a decay-law section). Neither label matches any pattern
   `refs` tests.
3. `research/natal-cap-10-sieve-cap.md`:179 and :316 cite `paper/beta2-note.md`
   **§6.5**. That file has §§1–8 and no subsections. `refs` reads `6`, finds
   `6`, clears.

Item 1 and item 3 are both recorded in earlier audit reports as found by human
reading. They are still there, which is the point: a defect a human found and a
check cannot see does not stay fixed.

---

## 6. Drafted selftest cases for the top five blind spots

Not applied. Each is written to drop into `research/qc/selftest.js` beside the
existing fixtures, and each assumes the corresponding fix from §4 is made first;
without the fix, the case fails, which is the correct behaviour for a case
written before its repair.

### 6.1 B1 — a hand-edited digit inside a bound OUTPUT block

Add to the embed fixture block, after `research/embed-broken.js`:

```js
  // A tail whose code hash is HONEST and whose OUTPUT BODY was hand-edited.
  // This is the defect `out-sha256` was written for and that no static check
  // has ever read: the code above the banner is untouched, so `code-sha256`
  // matches, and one digit inside the block is wrong. Requires the
  // `body-sha256` field written by qc/embed.js.
  {
    const mkBody = (headline, codeHash, bodyHash, value) => `// ${'='.repeat(76)}
// ${headline}
// ${'='.repeat(76)}
const answer = 41;
console.log('answer = ' + answer);
// ${'='.repeat(76)}
// OUTPUT — EMBEDDED, do not hand-edit. Regenerate:
//   node research/qc/embed.js research/embed-body.js
//   invocation:  node research/embed-body.js
//   code-sha256: ${codeHash}
//   out-sha256:  ${'0'.repeat(64)}
//   body-sha256: ${bodyHash}
//   node:        v22.21.0
//   embedded:    2026-08-20
//   elapsed:     0.1 s
// ${'='.repeat(76)}
// answer = ${value}
// ${'='.repeat(76)}
// READINGS
// 1. The answer is ${value}.
`;
    // Build the honest file first so both hashes describe it, then corrupt
    // ONLY the digit inside the block.
    const honest = mkBody('EMBED BODY — the block is the run', 'X', 'Y', 41);
    const codeHash = T.sha(T.headText(honest));
    const bodyHash = T.sha(T.normalize(T.outputText(honest)));
    w('research/embed-body-ok.js',
      mkBody('EMBED BODY OK — the block is the run', codeHash, bodyHash, 41));
    w('research/embed-body-edited.js',
      mkBody('EMBED BODY EDITED — one digit changed by hand', codeHash, bodyHash, 47));
    w('research/embed-body-cites.md', `# A note citing the body fixtures

research/embed-body-ok.js and research/embed-body-edited.js are cited here so
the scripts check stays quiet about them.

Linked from research/home-frame.md.
`);
  }
```

and to `EXPECT` / `FORBID`:

```js
  ['output-block-hand-edited', 'embed-body-edited.js',
   'a digit changed inside a BOUND output block: code-sha256 still matches, and until 2026-08-20 nothing read the body'],
  // FORBID
  ['output-block-hand-edited', 'embed-body-ok.js',
   'an untouched bound block must stay silent'],
```

### 6.2 B2 — dotted, non-numeric, and unsectioned section references

```js
w('research/sectioned-home.md', `# A home with dotted and lettered sections

## 6. The exponent

### 6.1 The exact ladders

## Theorem A (the collapse)

Linked from research/summary-badrefs.md.
`);
w('research/unsectioned-home.md', `# A home with no numbered headings

## What this file owns

## Next

Linked from research/summary-badrefs.md.
`);
w('research/summary-dotted-refs.md', `# Section references of three shapes

The statement is \`sectioned-home.md\` §6.9, a subsection that does not exist.
The certificate is \`sectioned-home.md\` §P6, a label that is not a number.
The measurement is \`unsectioned-home.md\` §7, in a file with no numbered sections.
For control, \`sectioned-home.md\` §6.1 exists and must NOT fire, and so must
\`sectioned-home.md\` §6.
`);
```

`EXPECT`:

```js
  ['dead-section', 'research/summary-dotted-refs.md:3',
   'SEARCH-CONVENTIONS.md citing sift-limit-attack.md §4.7 — the integer prefix cleared it for two audit waves'],
  ['dead-section', 'research/summary-dotted-refs.md:4',
   'anchored-calm.md citing natal-cap-36-skeleton-door.md §P6 — a non-numeric label matched no pattern at all'],
  ['section-into-unsectioned-file', 'research/summary-dotted-refs.md:5',
   'a § reference into a file with no parseable labels, which returned early and cleared silently'],
```

`FORBID`:

```js
  ['dead-section', 'summary-dotted-refs.md:6',
   'the two control references that resolve, one dotted and one plain, must stay silent'],
```

### 6.3 B3 — an adjudicated pair that vanishes below the threshold

This one needs the fixture's ledger to be non-empty, which is a deliberate
change to the selftest's isolation rule. Write a *second* fixture ledger rather
than editing the first, so the empty-ledger guarantee for every other case is
untouched:

```js
// A SECOND FIXTURE, run on its own ledger. Every other case keeps the empty
// ledger; this one needs an entry, because the failure being tested is a
// suppression that outlives the pair it settled.
{
  const root2 = fs.mkdtempSync(path.join(os.tmpdir(), 'qc-selftest-led-'));
  const w2 = (rel, body) => { const p = path.join(root2, rel);
    fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, body); };
  for (const f of ['checks.js', 'corpus.js', 'lit-extract.js', 'tailfmt.js'])
    w2(path.join('research', 'qc', f), fs.readFileSync(path.join(__dirname, f), 'utf8'));

  // Two passages that are NO LONGER near-duplicates, and a ledger entry that
  // still claims to have settled them. This is what a passage edited past the
  // similarity threshold leaves behind: a suppression matching nothing.
  w2('README.md', '# entry\nRead research/pair-a.md and research/pair-b.md.\n');
  w2('research/pair-a.md', `# Side A

The Traverse Bound telescopes the merge lemma and forces the fold count below
the level the route needs, at every computed level of the ladder.
`);
  w2('research/pair-b.md', `# Side B

An entirely unrelated paragraph about the discrepancy channel, sharing no
five-word window with side A, so no candidate pair exists at all.
`);
  w2(path.join('research', 'qc', 'ledgers.js'),
    "module.exports = { INTENDED_MISSING: new Map(), ABSENCE_VERIFIED: new Map(),\n"
    + "  ADJUDICATED: new Map([['aaaaaa:bbbbbb', 'KEEP. Settled 2026-08-19.']]) };\n");

  const chk2 = require(path.join(root2, 'research', 'qc', 'checks.js'));
  const kinds = new Set(chk2.transfers().findings.map(f => f.kind));
  const ok = kinds.has('adjudicated-pair-vanished');
  if (!ok) bad++;
  console.log(`  ${ok ? 'FIRES ' : '*MISS*'}  adjudicated-pair-vanished  `
    + `a ledger key matching no live pair — a dropped scope took a real pair from c=0.89 to c=0.57 and out of the check`);
  fs.rmSync(root2, { recursive: true, force: true });
}
```

### 6.4 B4 — a quotation that gains a negation

```js
// The home says the two methods ARE comparable. The summary quotes it with
// "not" inserted. Every word longer than three characters is unchanged, so the
// 95%-of-long-words fallback cleared this until 2026-08-20.
w('research/quote-home.md', `# The home that owns the verdict

The settled verdict is that the two methods are genuinely comparable rather
than one dominating, and the elementary column is void.

Linked from research/quote-negated.md.
`);
w('research/quote-negated.md', `# A summary quoting it with one word inserted

quote-home.md says "the two methods are not genuinely comparable rather than
one dominating", which is the reverse of what that file records.
`);
w('research/quote-exponent.md', `# A summary quoting an exponent wrongly

quote-home.md records that Iwaniec "proved h(k) is bounded by (k log k) cubed
for every admissible k", where the home says squared.
`);
```

`EXPECT`:

```js
  ['dead-quotation', 'research/quote-negated.md',
   'a quotation that gains the word "not": short words are not content words, so the fuzzy tier cleared it'],
  ['dead-quotation', 'research/quote-exponent.md',
   'a number changed inside a quoted external theorem, still in quote marks'],
```

`FORBID` (guard the repair against over-firing):

```js
  ['dead-quotation', 'quote-home', 'the home stating its own sentence is not a quotation of anyone'],
```

### 6.5 B5 — one script mention exempting a whole document

```js
// Chris's rule of 2026-08-18 is per NUMBER, and the check was per FILE: one
// .js anywhere exempted every figure in the document, including figures no
// script produced.
w('research/mixed-sourcing.md', `# A note with one sourced section and one unsourced

## 1. What the engine measured

Measured 0.7361 and 0.8148 by research/broken-syntax.js over 22309287 slots.

## 2. What the summary adds

The retention then reaches 0.94118 and the census 41552903 slots, with the
band running 0.4462 to 0.5941.
`);
w('research/etal-exempt.md', `# A note exempted by two words

The retention is 0.73612 and 0.81487 over 22309287 slots, in the regime that
Ford et al. describe, though none of these figures is theirs.

Linked from research/home-frame.md.
`);
```

`EXPECT`:

```js
  ['unsourced-measurement', 'research/mixed-sourcing.md:8',
   'section 2 names no producer; the .js in section 1 exempted the whole file until 2026-08-20'],
  ['unsourced-measurement', 'research/etal-exempt.md',
   '"et al." exempting figures that are ours, which is the shape of the 25x seam number with no producer'],
```

`FORBID`:

```js
  ['unsourced-measurement', 'mixed-sourcing.md:4',
   'the section that DOES name its script must stay silent'],
```

---

## 7. What `TOTAL 0` actually certifies

`TOTAL 0` certifies that eleven pattern matchers, run over the body documents
and the scripts, found no instance of the eleven **shapes** they can express,
after subtracting three hand-maintained suppression lists that nothing audits.
It is a statement about syntax and about pointers: every path resolves, every
`§` **integer prefix** exists somewhere in its target, every document's basename
occurs as a substring in some other document, every script compiles and carries
a comment, every fingerprinted tail's *code* matches its hash, and every
document containing a four-digit number also contains the string `.js`
somewhere. It certifies nothing whatever about whether a number is right,
whether a quotation reproduces its source, whether a claim is carried at the
strength its artifact supports, whether the output pasted under a script is what
that script printed, or whether an absence is still true: 31 of the 44 defects
injected here, drawn from classes this corpus has actually burned on, produced
`TOTAL 0` untouched, including a hand-edited digit inside a bound output block,
a wrong constant agreed on by two documents, a negation inserted into a quoted
sentence, and a hypothesis dropped from one side of a pair the ledger claims was
adjudicated. The honest reading of a green gate is the one `qc.js` almost gives
in its own closing note: it is a fast **syntactic** gate, it is genuinely good
at the pointer classes, and it is silent by construction on every class where
meaning, arithmetic or custody is the thing at stake. Those remain a human and
audit concern, and the gate should say so on every run rather than printing a
zero that reads like a verdict on the corpus.
