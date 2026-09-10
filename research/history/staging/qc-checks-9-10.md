# QC checks 9 and 10: `provenance` and `search-convention`

<!-- ledger
id: Q-qc-checks-9-10
status: ANSWERED
todo: none
question: What do the provenance and search-convention gate checks find, and why are they held out of the default gate?
verdict: Both are built, calibrated and in the selftest but deliberately behind --pending because they fire on live claims an attack agent is mid-flight against: provenance reads 8 findings and search-convention 75 on the 2026-08-18 corpus, the flip to default is one line, and what could not be mechanised is stated.
-->

**Date:** 2026-08-18. **Status:** built, calibrated, in the selftest, and
deliberately OUT of the default gate behind `--pending`.

Both were specified before they were built and both were deferred twice today
for the same honest reason: they fire on live claims that an attack agent is
mid-flight against, and that agent reports against a clean eight-check gate.
This record is the price of that deferral — the full finding counts are here, so
nothing is hidden.

---

## 1. What each check is, and where it was specified

| check | specified in | catches |
|---|---|---|
| `provenance` | `research/PRIOR-ART.md`, "Provenance: what artifact was actually read" | a quotation of external work that never says **which artifact it was read from**; and a provenance note that names only a rendering, an abstract or a third paper |
| `search-convention` | `research/SEARCH-CONVENTIONS.md` §6 | a claim that a **result is absent from the literature** whose paragraph neither cites `SEARCH-CONVENTIONS.md` nor names the convention it searched |

`search-convention` is the check `absence` explicitly declines. `absence` drops
any claim whose paragraph mentions the literature, because settling that means
searching journals rather than listing a directory — so a claim that a *result*
is absent was checked by nothing at all. That is the class that cost five audit
waves.

---

## 2. Calibration, stated before any count

### `provenance`

**Known positives: the five hand-read literature quotations in
`research/two-class-lower-bounds.md`**, carried in `qc/lit-extract.js` and
asserted before the check reports anything. If any is missed, the check reports
**that and nothing else**, because a number from a sweep that cannot find what
is known to be there reads as coverage.

Two things were wrong with the calibration when this work started, and both were
found by running it rather than by reading it.

**(a) The list was keyed on file and line, and had already gone stale.**
`lit-provenance.js` was written at 13:32 today and keyed its five positives to
line numbers in `two-class-lower-bounds.md` as it then stood. Three commits the
same afternoon — 13:48, 14:13, 15:17 — edited the document above those quotes.
Every anchor drifted by 6 to 18 lines and the script began reporting
`CALIBRATION FAILED` on five quotations the extractor was still finding
perfectly well. **The keys are now content anchors**, a distinctive phrase from
inside each quoted block, with the old line numbers kept only as comments. The
framework's own rule for the `transfers` ledger says exactly this and said it
first: key on content, never on position. The failure direction was safe — a
stale key shouts rather than going quiet — but a calibration that cries wolf is
one people learn to skip.

**(b) With content keys, one positive was genuinely missed, and it was a real
blind spot.** Positive #3 stopped being found because a correction pass earlier
today rewrote `from their §1.3, verbatim:` as `from their **§1.1, p. 673** …
verbatim.` — fixing a real citation error. The two asterisks between "their" and
"§" broke the possessive cue, and the full stop after "verbatim" broke the
verbatim cue. Both patterns were widened by exactly one character class each.

**Effect on the inventory, measured rather than asserted:** 51 attributed
quotations under the original regexes, **52** under the widened ones. The single
newly reachable row is `research/two-class-lower-bounds.md:169` — which is
known positive #3 itself. The widening was required by the calibration, not
incidental to it.

### `search-convention`

**Known positives: `research/two-class-lower-bounds.md` §2 rows 3 and 5 as they
stood before today**, recovered with `git show 50f0307:...`:

```
| 3 | lower-bound construction for a 2-dimensional sieved set | **ABSENT** | see queries below |
| 5 | the same accounting run in dimension 2 | **ABSENT**; done for the first time in §4 here | |
```

Both cells name no owning convention and cite no conventions file. **Both were
false**, and both were corrected the same day: row 3 to `REFUTED — it exists`
(Kalmynin–Konyagin, Izv. Math. 88:2 (2024) = arXiv:2302.00459 publish exactly
that construction), row 5 to `NARROWED` (K–K do run a dimension-2 Mertens
ledger; what survives is that *Maier–Pomerance's particular* ledger has not been
run there).

Verified by writing both rows back into a probe file and running the check:
**both fire.** The two neighbouring rows that name `arXiv:1706.00317` and
`A288815` — entries of the §1 table — **stay silent**, so the check discriminates
rather than firing on the word `ABSENT`.

**The negative control is the load-bearing half.** A paragraph reading *"nobody
has published a bound on the fold, the tile or the zone at any level, and the
scour was clean"* fires, and its note names the house terms it found:
`tile, fold, scour, zone`. A calibrated negative in our own vocabulary does not
satisfy the check, because that is precisely what five waves produced.

---

## 3. Live finding counts, 2026-08-18

Measured against the working tree at the time of writing. The corpus is being
edited by a concurrent agent, so these will drift.

### `provenance` — **8 findings**

Description line: *52 attributed quotations, 17 claiming verbatim, 10 carrying a
note. 7 attributions are INHERITED from a source named further up and 3 resolve
to nobody.*

| kind | n | where |
|---|---|---|
| `unprovenanced-quotation` | 8 | `covering-dive.md:137`, `dhr-verification.md:191`, `dhr-verification.md:249`, `maier-matrix.md:154`, `maier-matrix.md:550`, `maxgap-law.md:363`, `two-class-lower-bounds.md:152`, `two-class-lower-bounds.md:190` |
| `disqualified-provenance` | 0 | every one of the 8 quotations that *does* carry a note names a PDF, a page or a page photograph — none rests on an ar5iv rendering, an abstract or a third paper |
| `extractor-uncalibrated` | 0 | calibration passes after the two repairs in §2 |

`lit-provenance.js`'s own work-queue count is 9 rather than 8. The check drops
one of them, `theta-ladder.md:52`, because its attribution resolves to nobody:
it is one of our own custody warnings, not a literature quotation. All three
`unresolved` rows today are ours, which is why that class is **counted in the
description rather than reported as findings** — a kind that is 3-for-3 false
positives fails the framework's own bar.

### `search-convention` — **75 findings**

Description line: *89 literature-absence phrases, 11 name an owning convention or
cite `SEARCH-CONVENTIONS.md`, 3 repeat a phrase already reported for their
paragraph, 75 remain; 20 owning conventions and 7 house terms parsed from §1.*

By document, heaviest first:

| n | document | | n | document |
|---|---|---|---|---|
| 10 | `research/PRIOR-ART.md` | | 2 | `research/README.md` |
| 9 | `research/covering-dive.md` | | 2 | `research/ZONE-POSTULATE.md` |
| 8 | `research/sift-limit-attack.md` | | 2 | `research/natal-cap-04-packing-notes.md` |
| 6 | `TODO.md` | | 1 | `paper/PAPERS.md` |
| 6 | `research/G2-STATE.md` | | 1 | `paper/variance-note.md` |
| 6 | `research/two-class-lower-bounds.md` | | 1 | `paper/writing-style-math.md` |
| 4 | `web/PROPOSAL.md` | | 1 | `research/ATTACKS2.md` |
| 3 | `paper/moire-primes.md` | | 1 | `research/NATAL-CAP-CAMPAIGN.md` |
| 3 | `research/U-FRAME.md` | | 1 | `research/OBSERVATIONS.md` |
| 2 | `paper/wall-note.md` | | 1 | `research/THE-DIALS.md` |
| | | | 1 | `research/anchored-windows.md` |
| | | | 1 | `research/gate-multiplies.md` |
| | | | 1 | `research/h2-scoping.md` |
| | | | 1 | `research/natal-cap-10-sieve-cap.md` |
| | | | 1 | `research/two-moire-argument.md` |

By trigger phrase: `nobody has` 17, `ABSENT` 13, `no published` 9, `unpublished`
7, `nothing published` 6, `not in OEIS` 6, `no paper` 4, `no prior art` 2,
`possibly novel` 2, `not in print` 2, and one each of `no literature`, `not found
in the literature`, `does not exist in the literature`, `apparently unworked`,
`we found no`, `the first published`, `does not exist in print`.

**Six `not in OEIS` findings are the highest-value ones in the list**, because
that is the exact sentence the five waves got wrong: the `G₂` ladder has been in
OEIS as **A144311** since September 2008, under wording containing none of our
words.

---

## 4. The flip, and it is one line

`research/qc.js` **line 73**, immediately above the `PENDING` map:

```js
const PENDING_IN_GATE = false;          // <-- THE FLIP. true promotes both into the gate.
```

`false` → `true` promotes both checks into the default run, into `--full`, and
into `--strict`'s exit code. Do it when the running attack agent lands and its
findings have been applied. Expect the gate to go red until the two queues above
are worked.

**Until then, nothing is hidden.** `--list` prints both under their own heading
with the defect each catches. Every default run prints their names, why they are
out, and a pointer to this file. `node research/qc.js --pending` runs them, and
naming one explicitly (`node research/qc.js provenance`) runs it without the
flag.

---

## 5. What could not be mechanised

1. **Whether an absence claim is TRUE.** The check asks only whether the
   paragraph says where it looked. `two-class-lower-bounds.md` §2 row 3 named no
   convention *and* was false; `research/README.md`'s index row names no
   convention and is merely describing what `PRIOR-ART.md` does. Only a reader
   separates those. This is the same permanent asymmetry `absence` records, one
   layer up.

2. **Whether a provenance note is TRUE.** `provenance` checks that a note exists
   and that it names an artifact of the right *kind*. Nothing checks that the
   PDF was actually opened. Requirement 5's rule applies here as much as to the
   ledgers: this can only be settled by a person, once, with a date.

3. **A one-line bold lead-in is treated as a list item** by the shared paragraph
   builder, so `**The Maier-Pomerance accounting, run in dimension 2 for the
   first time.**` is its own paragraph and its correction on the next line is
   not in scope. Here it happens to give the right verdict for the wrong reason
   — the joined paragraph would have cleared, because the correction names
   `arXiv:2302.00459`. Widening it would change `quotes` too, which is why it was
   left alone and written down instead.

4. **Known false-positive shapes in `search-convention`**, kept here so nobody
   re-fixes them by widening the suppressors:
   - an **index row** describing another document's job
     (`research/README.md:65`, "every claim as classical / obscure / possibly
     novel");
   - a **style guide quoting a phrasing in order to ban it** — suppressed when
     the phrase is inside quotation marks, which handles
     `writing-style-math.md:122` but not the unquoted form at `:35`;
   - an **artifact absence sitting in a literature-shaped paragraph**
     (`TODO.md:255`, "nobody has tried bounding the residue-deleted maxsum"),
     which belongs to `absence` and already carries a dated `ABSENCE_VERIFIED`
     entry there.

5. **`SEARCH-CONVENTIONS.md` §6 is now stale in one word.** It says "Nothing
   mechanical enforces §1 yet". Something does, but it is not in the gate, so
   the sentence is still true of the gate. Left unedited on purpose: that
   document is inside the blast radius of the running attack agent, and the
   honest rewrite is one line at the same moment as the flip.

---

## 6. Suppressions added

**None.** `qc/ledgers.js` is unchanged. Neither check needed an entry, and the
only key either of them uses is content: `search-convention`'s
one-finding-per-paragraph dedupe is keyed on the paragraph's own normalised
text, so an edited paragraph returns rather than staying suppressed.

---

## 7. Files touched

| file | change |
|---|---|
| `research/qc/checks.js` | added `provenance` and `searchConvention`; `quotes` now calls the shared paragraph builder instead of its own inline copy (verified output-identical) |
| `research/qc/corpus.js` | added `paragraphIndex()` (lifted from `quotes`) and `SEARCH_CONVENTIONS` config |
| `research/qc/lit-extract.js` | **new.** The one extractor for attributed quotations, moved out of `research/lit-provenance.js` |
| `research/lit-provenance.js` | now the report over `qc/lit-extract.js`; calibration keyed on content; two cue patterns widened |
| `research/qc/selftest.js` | copies `lit-extract.js` into the fixture; 6 new positives, 5 new controls |
| `research/qc.js` | `PENDING` map, `--pending` flag, `PENDING_IN_GATE` flip, visibility notice on every default run, `--list` section |
| `research/qc/README.md` | documents both checks, the flip, and the `sourcing` row that was missing from the table |

**Why the extractor moved to `qc/`.** `checks.js` first required
`../lit-provenance`, and `selftest.js` builds its fixture from a fixed copy list,
so the import did not resolve inside the fixture and the whole selftest died. The
fix is *not* a tolerant `existsSync` probe: an extractor silently resolving to
nothing makes `provenance` report zero and read as clean while checking nothing —
the exact failure `ledgers.js` was moved off this morning. The shared code now
lives under `qc/`, both callers require it hard, and the fixture copies it.
