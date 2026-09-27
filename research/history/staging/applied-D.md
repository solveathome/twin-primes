# Applied: wave 2, partition D — the entry path

<!-- ledger
id: Q-applied-wave2-D
status: ANSWERED
todo: none
question: Were wave-2 partition D's findings applied to the eight entry-path documents?
verdict: Applied across all eight files with qc total 22 to 21 and one refs finding of its own (a framework bug), two transfers pairs word-diffed; the em-dash scope question and one GLOSSARY entry are flagged as judgement calls rather than omissions, and other partitions were live in the same tree so the deltas are not all this partition's.
-->

*(Eight files: `README.md`, `research/README.md`, `research/GLOSSARY.md`,
`TODO.md`, `research/THE-DIALS.md`, `research/THE-LENS.md`,
`research/ZONE-POSTULATE.md`, `research/FOLD-PROFILE.md`. Nothing outside those
eight was edited, created or deleted, except the three staging files this
partition was asked to write. Nothing was committed and nothing was pushed.)*

## qc.js, before and after

| check | before | after | my partition's share |
|---|---|---|---|
| refs | 7 | 5 | **1** (`THE-DIALS.md`:121, and it is a framework bug — see Handoffs) |
| quotes | 1 | 1 | **0** |
| crosslinks | 0 | 0 | **0** |
| scripts | 2 | 2 | **0** |
| transfers | 12 | 13 | **2**, both benign and both word-diffed below |
| **total** | **22** | **21** | |

Other partitions were live in the same tree throughout, so the deltas are not all
mine. What is mine: refs lost the two `dead-section` hits only because partition A
fixed `origin-excess.md` §6c; my own files contributed no refs finding before or
after except the one below. Transfers rose by one net, and the composition changed
under partitions A and B; the two pairs with an endpoint in my files are analysed
at the end of this file.

## File by file

### `README.md` — the repo's front door

- **New §"Where to start"** before the Map, naming the one reading path in three
  numbered steps. This is the canonical statement; every other entry document now
  points at it rather than naming its own first read. (`qc-arch.md` (a), rec 6.)
- **Map, first row.** "`research/GLOSSARY.md` — Read this first" RETIRED; the
  router is the first row. The Map gained `ZONE-POSTULATE.md`, `U-FRAME.md`,
  `THE-DIALS.md`, `THE-LENS.md`, `FOLD-PROFILE.md`, `TODO.md`, `SCRIPTS.md` and
  `qc/README.md`, every one of which was absent — including the document TODO
  calls "THE PROGRAMME'S FOCUS".
- **Map, `beta2-note.md` row.** "with the matching lower bound" → the two bounds
  named, with "not matching; the band between them is the whole problem". It
  contradicted §Status eleven lines below. (`qc-status.md` B-4.)
- **§Status gained a scope line** naming what it owns and what it does not.
- **The "Proven:" list, rewritten.** Classical spine marked inline (Holt and Rudd
  Thm 2.3, Pritchard 1982, Euclid IX.20, Schemmel 1869 / A059861 / Smith 1857);
  **Zone Equivalence removed from the list**, with one sentence saying why and
  where the content lives (`ZONE-POSTULATE.md` §2) — Chris's ruling.
  (`qc-status.md` C-1, C-3.)
- **"nine more" → eight proven results**, and the Fused-Window Calm Lemma is out
  of the list. The replacement sentence states all four calibrations, **including
  the refutation of the uniform-in-q form, which had never reached any summary**,
  and points at `research/anchored-calm.md`. (`qc-status.md` B-2,
  `qc-compound.md` CC-1.)
- **"ensemble bounds" → "ensemble bound (at @11, singular — @13 and @17 are not
  run)"**, and the X-limitation Theorem gained its "from x = 13 up" floor.
  (`qc-CAMPAIGN.md` Decision 2, `qc-status.md` B-3.)
- **§Status, β.** "the whole conjecture is the positivity of β" → sufficiency,
  one-way, with the weakest sufficient statement named. (`qc-compound.md` CC-2.)

### `research/README.md` — rebuilt as the router

Rewritten end to end. It now holds: a scope line saying it holds no mathematics;
the three-step reading path, identical to `README.md`'s; a **question-to-file
table** with fifteen rows; a **file table with a live/spent/register/submission
status column** covering every `research/*.md`; the naming convention in one
paragraph with the three known family-head exceptions and an explicit "no
renames"; the house rule and the `history/` warning, both kept because they were
correct; the vocabulary-drift paragraph, kept **because `qc-history.md` U3 makes
GLOSSARY's adoption dates depend on it**; and the six-script measurement table
**with the script filenames added**, which is what makes "script 05" resolvable
and was the reason five scripts read as orphans.

**The displaced prose is not deleted.** It is preserved in full in
`research/history/staging/changelog-add-D-readme-prose.md`, with a table naming
the current owner of each displaced section, for the parent to file into
`research/history/`. Two campaign notes are attached to it rather than to the
body: that spine items 1-3 are classical and item 5 is a framing device, and that
the attack-4 bullet's two numbers come from the column
`attack-04-fourier-budget.js`'s own banner invalidated (`qc-papers2.md` P-1).

**The stale 18% Fourier figure is gone from the body.** It lived at
`research/README.md`:120, inside the ten-attacks section the rebuild removed, and
a grep of all eight of my files for "18%" now returns nothing. It survives only
in the displaced-prose file, where it is explicitly marked as a retraction:
`attack-04-fourier-budget.js`'s column is "NOT a valid certificate",
`natal-cap-02-fourier-budget.js` reverses the conclusion (at x = 11 even an
oracle fails, cap 117.3 against N = 90), and the real near-miss is 15% at x = 7
and moot. (Partition C's handoff; `qc-papers2.md` P-1.)

I did **not** take up `qc-arch.md`'s open question A1 (whether the proven-spine
prose could be kept). `qc-CAMPAIGN.md` records Chris approving the router with the
prose moved to history, and that ruling governs.

### `research/GLOSSARY.md`

- **Header.** "read THE-LENS.md first" RETIRED, replaced by a declared scope: a
  lookup document, not a first read, owning no route's status, with pointers to
  the four documents that own what it kept drifting into.
- **Lemma V, JOB 1.** Replaced with `qc-status.md` A-1's text: NEEDED NOT PROVEN,
  and explicitly **not the operative assumption at the measured working point**,
  where s/u ≈ 1.2 sits outside the range s ≤ u it is stated in. A **new entry
  coins and defines the Gaussian Maximal Law for the interval sawtooth**, which
  `qc-papers2.md` P-3 found appears in no paper file at all. The Gap
  Reformulation entry's "which is why Lemma V is item 0" repointed to the
  exponent road.
- **Hyperuniformity, JOB 7 / Q1.1.** The three spliced objects separated: the
  comb ladder, the full process's scaling law with its own u = 2 drift
  0.251 → 0.321, and 0.611 marked as the comb's **hypothesis** with the 10:1
  odds, the demoted 0.44 and the 0.295-0.343 lever arm.
- **Unification Law** gained "(MEASURED to ~1%, Hardy-Littlewood-conditional;
  ω(u) is Buchstab's survival function)". (`qc-status.md` C-5, B-1.)
- **The skeleton** split into three named objects at three calibrations, and
  "@11 through @23" → **six levels, @11 through @29**.
- **The anchored calm / Fused window** now name their sub-claims, record that the
  calm is a phenomenon and never a claim, state that there is no "Fused-Window
  Calm Lemma", and point at `research/anchored-calm.md`.
- **β and Assumption A**: identity → sufficiency, plus the rule that "Assumption
  A" is never written without a form. **X-channel**: "@13 on" → "from x = 13 up".
- **Anchored-layer heading**: campaign narrative dropped, adoption date kept.
- **Three new entries from partition A's handoff**: the Origin Excess Lemma with
  its one hypothesis and its three companions, pointing at `maier-matrix.md` §4a
  as the canonical enumeration rather than restating it; the two-class
  discrepancy with its ×3 ceiling; and the driving term, with the lemma PROVEN
  and the route REFUTED held apart.

### `TODO.md`

- **Header** gained the reading path, so TODO no longer names a different first
  read from `README.md`.
- **Item 000b LEFT the file, CLOSED by inspection**, per the charter. Its premise
  is false for all three authors; the k^{2+ε} result is Vaughan 1977, with
  Iwaniec 1971 Thm 2 at the primorial, both inexplicit. Closure recorded in the
  changelog staging file, and the consequence applied at the two other sites I
  own. (`qc-refs.md` W7.)
- **G₂(41#) repriced and PROMOTED out of Parked to item 1b.** ~6 h by the
  streaming leg (519 s × 35 = 5.05 h, 5.6 h with the 41/37 deletion-state
  factor), with the 37 h named as the lattice-walk cost. Written as a
  pre-registered test against the Poisson law's 476-633 window, with the first
  move being the memory profile at 2.2e11 slots rather than the launch. Matches
  partition A's G2-STATE wording and U-FRAME §7's already-applied repricing.
- **Item 6**: "the @13 gate is MET" → "the @13 **PRECISION** gate is MET; the @13
  bound itself does not exist", and the Remaining list now names the @13 bound
  with its expected value alongside the @17 rerun, closing with "exactly one
  beyond-Chebyshev bound exists today, at @11".
- **Item 0b**: "0.58 ln p" → "**0.58 to 0.95 ln p**", both ends named with their
  ρ, plus the sentence that ρ is measured non-monotone so neither end may be
  presented as favoured. (`qc-numbers.md` Q5.1 as amended.)
- **Item 0c**: "U-FRAME §10" → "§5a Step 2" after partition B's restructure, and
  the two dropped hypotheses restored ("40 of 40 over five folds and m ≤ 8", "no
  straddling window ever beats a single-copy one").
- **Item 4** renamed to the Skeleton Equidistribution Conjecture.
- **Moratorium item (iii)** now names both objects on the exponent road.

Nothing else was pruned. I checked every remaining item against the reports for
"closed but still live" and found none; `qc-status.md` class (e) came back empty
and `qc-shepherd.md` independently found the forward-only charter being kept.

### `research/THE-DIALS.md`

- **Scope line** added.
- **Dial 7, JOB 5, and it recovers work.** The flat "inert … Do not spend effort
  here" replaced by the survey's actual split verdict: inert on the two target
  legs it names (weak Assumption A, the Buchstab transfer at bounded u) and live
  on the machinery (Siegel-Walfisz at fixed modulus and depth, Bombieri-
  Vinogradov on the full wheel in the tail regime, one item provable now and
  elementarily), with the closing sentence that a triage reading the dial as
  flatly inert kills TODO item 11. §3's summary row rewritten to match.
- **§3 dial-2 row** gained "(bracket 1.3-1.9, floor 1)"; the caveat had been 99
  lines away in the file's most quotable line. (`qc-numbers.md` Q2.1.)
- **§6** loose end replaced by the W7 closure, wording aligned with partition A's
  G2-STATE §9 and carrying "the constant is the whole question".
- **§0** reworded from the adjudication to the conclusion. (`qc-history.md`.)

### `research/THE-LENS.md`

- **Scope line** added, stating that §5's triage rule is the corpus's canonical
  statement of it. §5 keeps its number, per partition A's handoff.
- **§4 table**: the u-frame row **decomposed into two**, because the file said
  CLOSED about the object the router calls the live route. The multiplier form is
  closed; the copy-theorem form is open and is TODO 0c. Lead-in and follow-on
  sentences adjusted to match. **This was a live contradiction between two
  documents I own and is not in any report.**
- §3's date stamp dropped, Chris's attribution kept; "still" dropped at :123.
  (`qc-history.md` U3.)
- The adjacent-kill run now names L, matching `ATTACKS3.md`.

### `research/ZONE-POSTULATE.md`

- **Scope line and a "Where this stands" block** after the title, in G2-STATE
  §0's shape. The 10¹¹ verification, the single most useful sentence in the file
  for a fresh reader, sat at line 90. No content moved. (`qc-arch.md` rec 3, C4.)
- **§6 route A, JOB 1**: the Lemma V qualifier applied as written in A-1.
- **§6** loose end → the W7 closure, aligned with G2-STATE.
- **§7**: the triage rule repointed from `OBSERVATIONS.md` to `THE-LENS.md` §5,
  which owns it and says so. (`qc-arch.md` rec 1, (d) D2.)

### `research/FOLD-PROFILE.md` — JOB 8

**§8 created, "The natal cohort: dispersion, and the lineage identity"**, in the
empty slot before §9 Survival, with zero inbound references to break.

I re-ran all three scripts rather than transcribing the session record, and
**that caught a number.** The session record's "99.94% of twin primes born at
level ≤ 13" is the figure for real twin primes below 10⁸; on the tile the
cumulative share is **99.93%**. Both are now stated with the object each belongs
to. The run also explains a second apparent discrepancy: the census counts
440,311 pairs, not the familiar 440,312, because it starts at (5,7) and (3,5)
sits below the comb. Reproduced numbers now in the body: all 7,952,175 slots of
T₂₃ classify with ratios 1.000000 at every level; the natal share of D_new falls
to 4.50e−9 by fold 31; the dispersion bound of 2 is never exceeded on the ladder
p = 7…31; the cohort's half-lives are q = 59, 23, 31, 89, 43, 67, 89, 149; the
rarity × quality identity reads EXACT at all seven levels.

§8 also carries the **two reasons the natal creation engine is CLOSED** — the
lemma's reach expires at u ~ x/ln x, far above β₂, and the cohort is
asymptotically empty — so the session's closure verdict now has a citable basis
in a working document.

Also: the header's script enumeration "01..04" → "01..16" with a pointer to §10;
§10 gained the three scripts with their custody lines; §12c's unnamed lemma named
the **Head Monotonicity Lemma**, which three other documents already cite by name.

## The reading path, as implemented

**One path, stated once in `README.md` §"Where to start", and pointed at from
everywhere else.**

1. `README.md` §Status — the central object, the proven bound, the gap, and that
   nothing has moved it.
2. `research/G2-STATE.md` §0 — what is hard here, before any derivation.
3. `research/README.md` — the router: which file answers which question.

Then read for the question, not in file order. Enforcement: `README.md` states
it; `research/README.md` repeats the three steps and then routes; `GLOSSARY.md`
says it is not a first read and points at the router; `TODO.md` says do not start
here and names all three steps. The old three-hop chain README → GLOSSARY →
THE-LENS, which cost ~540 lines and never reached G2-STATE, is gone.

## What I left, and why

- **`qc-arch.md` rec 9, moving GLOSSARY's 48-line pane block to `THE-DIALS.md`
  §0.** NOT DONE, deliberately, and I recommend it stay not done.
  `research/a3-07-pane-overlap.js`:728 cites GLOSSARY for a pane number from
  inside a pasted output block that the script exemption forbids editing. Moving
  the numbers out would strand a pointer that cannot be repaired. The altitude
  cost is real but the scope lines now warn the reader instead.
- **`ZONE-POSTULATE.md`:150's pointer to `two-class-lower-bounds.md` §10.**
  Untouched. `qc-history.md` records partition E moving that content into §5, and
  `qc-arch.md` rec 17 requires one combined reference sweep at the very end. Left
  for that sweep.
- **`GLOSSARY.md`'s long status-bearing entries** (Seam, Overlap credit, G₂).
  Each was checked against `qc-numbers.md`; all carry their caveats and none is
  stale. The altitude complaint is real and the scope line addresses it; cutting
  them would lose content nothing else holds.
- **Every number** in all eight files, unless a report supplied a verified
  replacement. The three replacements applied are the G₂(41#) price, the 0.58 →
  0.58-0.95 range, and @23 → @29 on the skeleton ladder. The one number I
  corrected on my own evidence is the 99.94/99.93 split, and I re-ran the script
  to do it.

## Handoffs to other partitions

1. **`THE-DIALS.md`:121's `attack-06b` is a FRAMEWORK BUG, not a defect in my
   file, and the brief and `qc-CAMPAIGN.md` are both wrong about it.**
   `research/attack-06b-difference-map.js` **exists**, and the line cites it by
   its full correct filename. The cause: `qc/checks.js`'s `SHORT_RE` accepts an
   optional trailing letter, `(\d{1,2})[a-z]?`, while `qc/corpus.js`'s
   `resolveRef` does not, `^(fold-profile|attack|a3|localized)-(\d+)$`. So any
   reference to a script with a lettered ordinal false-positives, and there is no
   prose fix. **Owner: partition G (`qc/`). One-line patch:** in `resolveRef`,
   make the pattern `^(fold-profile|attack|a3|localized)-(\d+)([a-z]?)$` and test
   `^${m[1]}-0*${Number(m[2])}${m[3]}-`. Verified this resolves `attack-06b` to
   the file. **Until it lands, `qc.js --strict` cannot go clean.**
2. **`research/G2-STATE.md` is the seventh of the seven summary documents and is
   the only one without a declared scope line.** I gave the other six theirs. It
   is also step 2 of the reading path, so its §0 must keep both its number and
   its role as the first thing after `README.md` §Status. Owner: partition A.
3. **`research/ATTACKS2.md`:24 — the Unification Law's ω(u) is Buchstab's and is
   unattributed there** (`qc-status.md` C-4). I applied the calibration and the
   attribution in GLOSSARY; ATTACKS2 is partition G's.
4. **`paper/PAPERS.md`:18 lists Zone Equivalence among "the spine theorems"**
   (`qc-status.md` C-3, third site). Removed from README and never in the router;
   the paper site is partition C's.
5. **`paper/moire-primes.md`:39's "the matching lower bound"** — the second of the
   two sites in B-4. Partition C.
6. **`research/OBSERVATIONS.md`'s 33-line triage statement** should shrink to two
   sentences plus a pointer to `THE-LENS.md` §5, now that ZONE-POSTULATE's
   citation is repointed. Partition G. `maier-matrix.md`:428, :579 and
   `G2-STATE.md`:473 are the other three citations to repoint.
7. **The router's file table must be re-checked at campaign close.** Two new
   documents appeared while I was working, `research/anchored-calm.md` (F) and
   `research/certificate-engine.md`, and both are now in the table. Any file
   created after this message is missing from it. A `ls research/*.md` diff
   against the table is a thirty-second check and is the only thing that keeps
   the router honest.
8. **`research/SCRIPTS.md` needs regenerating** after this wave;
   `fold-profile-09/10/11` now have a prose home and the index should say so.
   `node research/gen-scripts-index.js`. Owner: whoever closes the campaign.

## Unresolved

- **Transfers pair `TODO.md`:98-115 vs `U-FRAME.md`:260-261 (j=0.05 c=0.90).**
  Word-diffed: nothing is dropped, and TODO's copy is now *better* than before —
  it gained "over five folds and m ≤ 8" and the no-straddling clause, which it
  previously lacked. The pair fires because a short theorem statement quoted in
  full is necessarily contained. It appeared when partition B moved the copy
  theorem into §5a Step 2. Recommend accepting it as a true restatement under
  Chris's rule; deleting the statement from TODO would leave item 0c naming an
  object the reader cannot see.
- **Transfers pair `G2-STATE.md`:546-555 vs `ZONE-POSTULATE.md`:263-273
  (j=0.60 c=0.81).** This is the W7 closure, and it is deliberate: the coordinator
  asked me to match partition A's wording. Word-diffed, nothing dropped either
  way. Same pair, at the same two documents, was in the wave-1 baseline at
  j=0.50. If one copy must go, the ZONE-POSTULATE one is the one that must stay,
  because that is where route A's price is quoted.
- **The X-limitation Theorem's scope: RESOLVED mid-pass, and the resolution went
  against the reports.** I first applied "from x = 13 up" as three documents
  state it. Partition C then opened `natal-cap-31-calm-vs-kill.js`, whose reading
  3 marks the theorem proven **per level** from L2 plus the *enumerated* max VR,
  at @11, @13 and @17, with **no level-uniform bound on VRmax**. All three of my
  sites — `README.md`, `GLOSSARY.md` and `TODO.md` item X — now state the
  per-level scope with the all-x case open and the missing ingredient named.
  **`qc-status.md` B-3's HIGH confidence is downgraded**, and the reason is worth
  keeping: three summaries agreeing on a scope is not evidence about a proof when
  all three descend from the same home. `qc-compound.md` CC-11 predicted exactly
  this and was right.
- **`research/anchored-calm.md` landed from partition F while I was working**, and
  its opening wording matches what I wrote into `README.md` and `GLOSSARY.md`
  independently ("names a phenomenon, never a claim"; "There is no Fused-Window
  Calm Lemma"). Checked, consistent, no action.
- **Em dashes, and it is a scope question for Chris.**
  `paper/writing-style-math.md` bans them and says it governs "the primeoire
  papers, **notes**, and any prose that behaves like mathematics", but every one
  of my eight files used them densely before I touched it, including as
  `GLOSSARY.md`'s term-definition separator. I matched each host document rather
  than stripping only my own sentences, which would have made the files
  internally inconsistent. `TODO.md` item 12 scopes the mechanical sweep to
  `paper/moire-primes.md` alone. **Decide whether the ban reaches `research/`**;
  if it does, that is one mechanical pass across the corpus, not a partition job.
- **`qc-status.md` D-1 says the Natal Dispersion Lemma should also get a
  one-line GLOSSARY entry.** Not done: the lemma is a fold-profile result whose
  statement needs its cohort definition, and GLOSSARY's altitude problem is the
  thing this partition was fixing. §8 is one pointer away via the router's
  question table. Flagging it as a judgement call rather than an omission.
