# Reading-path audit: can a cold reader reach every live result in two hops?

<!-- ledger
id: Q-audit-reading-path
status: ANSWERED
todo: none
question: Can a cold reader reach every live result in two hops?
verdict: The two-hop test passes for eight of the ten headline results of 2026-08-19/20 and no staging record is orphaned; what fails is narrower, the front door being three days behind and contradicting REFUTED.md on u_sup, G2-STATE's section 10 table still the 2026-08-17 list, and kappa-not-L carrying nothing from the L wave.
-->

*(2026-08-20. REPORT ONLY — no live document was edited by this pass. Every
item below is a proposal for someone else to apply. `node research/qc.js` was
clean before this file was written and clean after.)*

**Scope.** The canonical path is `README.md` → `research/G2-STATE.md` §0 →
the router table in `research/README.md` → `TODO.md` + `research/REFUTED.md`.
The registries are `research/IMPORT-MAP.md`, `paper/proposals/PROPOSALS.md`,
`research/SEARCH-CONVENTIONS.md`, `research/PRIOR-ART.md`.

**Headline.** The path works better than the file count suggests. `G2-STATE.md`
§0 was rewritten 2026-08-20 and now carries eight of the ten headline results of
2026-08-19/20 by name, each with its record path, so the two-hop test passes for
those eight. What fails is narrower and fixable: the front door
(`README.md` §Status) is three days behind and contradicts `REFUTED.md` on
`u_sup`; the router's designated navigation aid inside `G2-STATE.md` is its §10
table, which is still the 2026-08-17 eleven-file list; and `kappa-not-L.md`, the
router's destination for the programme's stated gap, carries nothing from the
2026-08-19 L wave.

**Orphan sweep result.** Eighty-four staging records carry an 2026-08-19 or
2026-08-20 timestamp. None is unreachable. Four reach the prose layer only
through `research/SCRIPTS.md`, which is generated from script headers and keyed
by filename rather than by result, so a reader who does not already know the
script name cannot find them. One, `custody-overnight.md`, is untracked in git,
which is why it has no pointer at all.

---

## 1. Router table against the disk

Thirteen `research/*.md` files are not named individually in the router's file
table; twelve of them are the `natal-cap-NN-*.md` companions covered by the
collective row, which says "twelve" and is exact, and the thirteenth is
`research/README.md` itself. **No router row points at a missing or renamed
file, and no live file lacks a row.** The `REFUTED.md`, `IMPORT-MAP.md`,
`f-decays.md` and `kappa-not-L.md` rows are all present.

Three row descriptions no longer describe their file.

**R1. `theta-ladder.md` is classed LIVE and is not.** Router line 77 puts it in
the LIVE block, where LIVE is defined two lines above as "the question it was
written to answer is still open". Its own description on the same line ends "the
route is retired via the sharp maximal law", and `REFUTED.md` row 10 records
"the certificate route (the θ ladder) as a road to TPC | RETIRED | 2026-08-18".
The class column contradicts its own description cell.

**R2. `f-decays.md`'s description predates the defect it now leads with.** Router
line 74 reads "f on 42 exact points, the singular-series comb, the twin-pair
staircase". The file's first content block is a DEFECT banner dated 2026-08-19
saying every census point from `x = 37` up is wrong by a factor 0.62 to 1.05 and
that the table, both regressions, the halves, the factor of 170 and the
`x = 1000` extrapolation must all be re-read against
`research/fdecay-deep-01-census-defect.js`. A reader routed by the current
sentence has no warning.

**R3. `kappa-not-L.md`'s description is true and its file is stale.** See §4.

## 2. Orphan sweep, 2026-08-19 and 2026-08-20 staging records

Eighty-four records. Reachability was tested against the prose layer
(`research/*.md` minus `SCRIPTS.md`, `paper/*.md`, `paper/proposals/*.md`,
`README.md`, `TODO.md`, `research/qc/README.md`), then against `SCRIPTS.md`,
then against `research/history/CHANGELOG.md`, by full path and by bare filename.

**Reachable from the prose layer: 80 of 84.** No record is reachable only
through `CHANGELOG.md`.

**Half-orphaned — prose-unreachable, findable only by knowing a script name:**

| record | what it holds | suggested pointer |
|---|---|---|
| `adversary-wave2.md` | the refute-first pass over the four same-evening headlines of 2026-08-19 (shadow-buchstab, import-scanstat, import-sofic, import-shearer) | `IMPORT-MAP.md` rows 1, 2 and 3, appended to each status cell |
| `import-bridge.md` | Ojaroudi's two elementary lemmas verified true, and the chain shown to buy nothing | `PRIOR-ART.md`, the Ojaroudi 2026 section, beside `history/staging/ojaroudi-read.md` |
| `custody-embed-migration.md` | the embed migration ledger | `TODO.md` item 1, which is the custody-migration item |
| `custody-overnight.md` | five artefacts priced over budget, run serially | untracked in git; commit it, then cite from `TODO.md` item 1 |

**Pre-registrations.** Nineteen of the 2026-08-19 preregs reach prose only
through `SCRIPTS.md`. That is the house pattern and each is named by its own
record, so this is not flagged as a defect. Three are named by neither their
record's prose nor `SCRIPTS.md` — `fdecay-deep-prereg.md`,
`import-shearer-prereg.md`, `xchan-at29-prereg.md` — and each is named by its
producer script and by its record, so a reader arrives one hop later than usual.

## 3. The crosslink web among the registries

**C1. `IMPORT-MAP.md` and `PROPOSALS.md` do not know about each other.** Neither
file contains the other's name. Four of the seven proposals came out of imports:
`prop-suen-import.md` from row 4, `prop-thinning-null.md` from the thinning
import, `prop-exact-fold-L.md` and `prop-tailcount-transport.md` from the
max-plus import. A reader who lands on a LANDED import row cannot see that a
paper proposal grew from it, and a reader on a proposal cannot see which import
row priced it.

**C2. `REFUTED.md`'s header names two of the six standing documents.** Its scope
note names `../TODO.md` and `G2-STATE.md` only. Its own rows cite
"import-map row 11" and "import-map rows 5 and 6" in prose with no link, cite
`SEARCH-CONVENTIONS.md` §4 in two rows, and cite `PRIOR-ART.md` in one.

**C3. `paper/PAPERS.md`'s pointer paragraph is generically accurate and states no
current fact.** Line 177 describes the registry as carrying "a grade, its
records, an honest prior-art position and pre-registered upgrade and downgrade
triggers". It does not say that one proposal is now WEAKENED, that its two
scored triggers (Neudecker, fifth-window) were both scored on 2026-08-19 night
and neither fired, or that one entry sits at QUICK-DRAFT with a draft beside it.

**C4. The router does not route to the paper queue.** `research/README.md` has no
row for `paper/proposals/PROPOSALS.md` in either table. `README.md`'s Map does
(row added during this audit by another pass), and `paper/PAPERS.md` links it, so
the queue is reachable — but not from the router, which is the file every
question-specific path is supposed to start at.

## 4. The two-hop test, run literally

Hop 0 is `README.md`. A result is reachable in two hops if a reader lands on the
document that states it after two file openings.

| headline | hop sequence | verdict |
|---|---|---|
| fifth-window HIT (the extinction law lands one decade blind at `W = 2·10¹¹`) | README → `G2-STATE.md` §0 MEASURED bullet 1 → `history/staging/foldL-window5.md` | 2 hops, PASS |
| the ~3.8 constant's two spent blind tests (@29 hit at `z = −0.90`, @31 shows the form is not exact) | README → `G2-STATE.md` §0 MEASURED bullet 2 → `history/staging/xchan-at29.md`; also README → `TODO.md` item 7 | 2 hops, PASS |
| T₃₇ certificate, and the exponent rule killed twice blind | README → `G2-STATE.md` §0 PROVEN last bullet and MEASURED bullet 4 → `history/staging/scanstat-t37.md`; also via `IMPORT-MAP.md` row 1 | 2 hops, PASS |
| the census defect and the corrected f-law | README → `G2-STATE.md` §0 MEASURED bullet 5 → `history/staging/fdecay-deep.md`; also README → router → `f-decays.md` DEFECT banner | 2 hops, PASS |
| the shadow drift law and its derived amplitude | README → `G2-STATE.md` §0 MEASURED bullet 3 → `history/staging/shadow-amplitude.md` | 2 hops, PASS |
| the Shearer identity (the exact criterion on a complete graph IS the union bound) | README → `G2-STATE.md` §0 PROVEN bullet → `history/staging/import-shearer.md` §4; also router → `REFUTED.md` row | 2 hops, PASS |
| the ℓ¹/ℓ² closure | README → `G2-STATE.md` §0 DEAD paragraph; also router → `REFUTED.md` row → `history/staging/import-l1l2.md` | 2 hops, PASS |
| Hawkins ownership of the thinning null | README → `PRIOR-ART.md` §"The Hawkins random sieve" → `history/staging/hawkins-read.md` | 2 hops, PASS |
| the Lonely Rabbit anchor | README → `PRIOR-ART.md` §"The Lonely Rabbit problem" → `history/staging/row12-recon.md` §5 | 2 hops, PASS |
| the K–K quick draft | the RESULT: README → `G2-STATE.md` §0 PROVEN bullet 2 → `two-class-lower-bounds.md` §4c, 2 hops. The DRAFT: README → `PROPOSALS.md` → `prop-kk-lower-bound.md` → `draft-kk-lower-bound.md`, **3 hops**, and `two-class-lower-bounds.md` §4c contains no pointer to either | mixed, FLAG |

**No headline needs CHANGELOG archaeology.** The one 3-hop path is the K–K
draft, and it is 3 hops only because the mathematics and the publication status
live in two subtrees that do not cross-reference.

**The router's own instruction is the weak link.** Router line 34 sends a reader
to "`G2-STATE.md` §0, then the section its §10 table names". §0 is current to
2026-08-20 and is the best page in the corpus for this. §10's table is the
2026-08-17 eleven-file source list and names none of `sift-limit-attack.md`,
`f-decays.md`, `kappa-not-L.md`, `operator-and-pair-count.md`, `REFUTED.md`,
`IMPORT-MAP.md`, `level-ledger-tight.md` or `bv-import-survey.md`. The second
half of the router's two-step instruction points at a stale index.

## 5. Dead relative paths and stale section references

**Markdown links.** Zero dead `](path)` links across the whole live layer.

**Backticked paths with a directory component.** The house convention is
repo-root-relative and it holds everywhere except three places, all of which are
self-flagged in their own text as unreachable and are therefore not defects:
`research/anchored-windows.md` line 14 and `research/maier-matrix.md` line 557
both name a lost session scratchpad and say so; `research/qc/README.md` uses
`qc/<file>.js` for its own siblings.

**Bare staging filenames.** Thirty-seven backticked `*.md` names in the live
layer resolve only under `research/history/staging/` and are written without the
path. Most sit in a comma list whose first member carries the prefix, so context
recovers them. Two do not: `identifications-prior-art.md` at
`research/IMPORT-MAP.md` lines 120 and 122 is the record's only appearance
anywhere in the live layer, and it is bare in both. Six sit in `REFUTED.md`,
which is the reading-path surface and the file most likely to be read by
someone who does not know the corpus: `attack-tail-maximal.md` (line 30),
`attack-hm-basis.md` (31), `attack-beta2-05-covering-pruning-bound.md` (39),
`verify-ab-coupling.md` (46), `verify-monotone-depth.md` (53),
`verify-tailcount-transport.md` (55).

**Section numbers that moved.** `node research/qc.js`'s refs check resolves file
paths and not `§` numbers. Four survive a targeted sweep of the last two days'
edits:

- `research/SEARCH-CONVENTIONS.md` line 143 cites `sift-limit-attack.md` §4.7.
  That file's §4 runs 4.1 through 4.6 and there is no 4.7 anywhere in it. The
  row is about the Brüdern–Fouvry bilinear remainder and Bettin–Chandee's
  Remark 1, which is §4.5 (lines 251 to 355, the Bettin–Chandee passage at 324
  to 328). The row itself is dated "corrected 2026-08-19", so the pointer was
  written in the same pass.
- `research/theta-ladder.md` line 3 reads "Feeds TODO items 00 and 0." `TODO.md`
  has no item 00; it runs 0, 0b, 0c, 1, 1c, 1d, 1e.
- `covering-dive.md` §3 and §4 are cited from `paper/wall-note.md` line 147,
  `research/IMPORT-MAP.md` lines 127, 391 and 396, and
  `research/SEARCH-CONVENTIONS.md` line 144. That file's top-level headings are
  `Q3.` and `Q4.`; only its subsections carry bare 3.x and 4.x numbers.
- `research/natal-cap-10-sieve-cap.md` lines 179 and 316 cite
  `paper/beta2-note.md` §6.5. `beta2-note.md` has sections 1 through 8 and no
  6.5; the §6.5 in play is Diamond–Halberstam–Richert's, which `beta2-note.md`
  line 24 quotes as "p. 79, §6.5 Notes".

## 6. Two housekeeping items

`research/research/history/` is an empty untracked directory tree, the residue of
a path written relative to the wrong working directory. It holds nothing.

`research/history/CHRONICLE.md`'s last dated entry is 2026-08-13/14/15/17;
`README.md`'s Map calls it "The dated discovery log (what was found, when, and
what was refuted)". Three days of discovery are not in it. `CHANGELOG.md` runs
through 2026-08-20 and carries the material, so nothing is lost, but the Map's
description over-promises.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed by document.*
