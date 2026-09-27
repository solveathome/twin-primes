# Red team B's corrections applied: what landed in the five staging notes, what is owed to a producer, and what the orchestrator still owns

<!-- ledger
id: Q-applied-0829-measure-b
status: ANSWERED
todo: none
question: Were red team B's corrections applied to the notes it reviewed?
verdict: 17 of 17 APPLY items whose target is a staging note are applied in place, 2 ledger verdict lines rewritten as the red team specified (measure-record-null2-0829 and zone-tail-02-0829), 3 HOLD/DECLINE items deliberately not applied, 5 live-document items left verbatim for the orchestrator, and 3 producer items recorded as OWED without touching any .js; the fast gate returns 0 findings after the pass, the single mid-pass finding having belonged to another agent's file, research/measure-g2z2-0829.js:432, and never to any edit made here.
-->

*(2026-08-29. Staging note; nothing here is integrated into a live document.
HELD. Application pass, no producer of its own and no new measurement: every
figure written into a reviewed note below is the red team's, carried across
verbatim or condensed, and none of it was recomputed here. No .js file was
read for editing, no script was re-run, no git command was run, and no live
document was touched. Calibration of the applied text is the calibration the
red team gave it.)*

---

## 0. Counts

| class | count | where |
|---|---|---|
| APPLY items with a staging-note target, applied | 17 | §1 |
| ledger `verdict:` lines rewritten, as the red team specified | 2 | §1, `measure-record-null2-0829.md` and `zone-tail-02-0829.md` |
| HOLD or DECLINE items, deliberately not applied | 3 | §1 |
| live-document items, left for the orchestrator | 5 | §2 |
| producer items recorded OWED, no code touched | 3 | §3 |
| stale text found while applying and left for the orchestrator | 2 | §2 |

Files edited: `measure-roughpair-null-0829.md`,
`measure-record-null2-0829.md`, `zone-tail-02-0829.md`,
`attack-roughpair-error.md`, `record-location-null.md`,
`object-models-read-0829.md`, and this file. Nothing else.

**Three applications went one place further than the red team's list names,
and each is marked JUDGMENT in §1.** In all three the same corrected claim
sits in a fourth location in the same note, and leaving it would have left a
sentence the red team REFUTED or WEAKENED standing beside its own correction.
Each is recorded so the orchestrator can reverse it in one edit.

---

## 1. Item by item

| id | target | flag | outcome | reason |
|---|---|---|---|---|
| A-EDIT-1 | `measure-roughpair-null-0829.md`:161 | APPLY | done | custody hash replaced with the producer's banner values, `code-sha256 5caaa5173b4c1561...` and `out-sha256 f2907aa4ed30dde5...`; the banner at `research/measure-roughpair-null-0829.js`:548-549 was read, not edited |
| A-EDIT-2 | same file, §3d pooled table | APPLY | done | the red team's rider added below the pooled table verbatim: the measured column is the subsample's, and the full-band pairing gives 1.422, 1.281, 1.229 |
| A-EDIT-2b | same file, §4's third reading | APPLY (direction) | done | the red team's heading names §4's third reading and supplies no string, so one minimal sentence carries the same pairing there and points at §3d's rider |
| A-EDIT-3 | same file, §6 defect 3 | APPLY | done | appended verbatim: the `+-` prices the measured value's sampling sd alone and `N3`'s own 40-anchor, 60-replicate error is not in it |
| A-EDIT-4 | same file, §5 point 2 | APPLY | done | replaced verbatim: `N3` inserts one mechanism carrying two consequences, the exact kill count and the exactly periodic kill positions, and the second does the variance work |
| A-EDIT-5 | same file, §5 point 1 | APPLY | done | replaced verbatim: the null takes its variance form from the per-prime densities and its centring from `Xcorr`, which carries `omega(u) e^gamma` |
| B-EDIT-1 | `measure-record-null2-0829.md`, ledger `verdict:` | APPLY | done | ledger verdict rewritten to the red team's replacement: about one order as a share of the deficit, `A` moved by 0.0080 against 0.0600, 13.3 percent, and a factor of 15 to 17 in relative-perturbation units |
| B-EDIT-1 | same file, §0's third bullet | APPLY | done | replaced verbatim, including the sentence that `0.1113/1.7e-4 = 662` is not the right comparison |
| B-EDIT-1 | same file, §3e heading and §5's P3 row | APPLY (direction) | done | "three orders above the argued bound" becomes "about one order above the argued bound as a share of the deficit" in the heading, and the P3 row's predicted cell now reads one order, 13.3% against the argued two orders below |
| B-EDIT-1b | same file, §3e's opening sentence | APPLY (direction) | done, JUDGMENT | the same "wrong by about three orders of magnitude" stands in the paragraph under the corrected heading; rewritten to 1.6 orders as a share of the deficit with the 662 ratio named as the wrong comparison. §3e's closing sentence, "about one order below the effect", was correct already and is untouched, as the red team says |
| B-EDIT-2 | same file, the "Category (i) throughout" paragraph | APPLY | done | the self-assignment clause added verbatim: `attack-wrongdirection-audit.md` §5 records Z5 as not among the audited items |
| C-EDIT-1 | `zone-tail-02-0829.md`:57-58 | APPLY | done | replaced verbatim, scope corrected to one interval and the inflation stated as the measured 4.10 against the implied `sqrt(9.27) = 3.04` |
| C-EDIT-1 | same file, ledger `verdict:` | APPLY | done | the corpus-wide "about three times too narrow" clause replaced with the one-interval scope, the 4.10 inflation, the corrected [0.6840, 0.7681], and the four files that carry nothing to correct |
| C-EDIT-1 | same file, :612-613 (defect 5) | APPLY | done | appended verbatim, including that §1 (P6)'s registered [0.68, 0.78] survives by 0.004 |
| C-EDIT-1b | same file, §4's last paragraph | APPLY (direction) | done, JUDGMENT | the same sentence stands a third time there and names `destroyer-census-01.md` and `zonegap-01.md` explicitly, which is the scope the red team REFUTED at §1c C16; rewritten to the one-interval scope and the 4.10 inflation |
| C-EDIT-2 | same file, §4's raw-correlation paragraph | APPLY | done | replaced verbatim: 0.016 is the model on the top two bands, 0.0285 on the full 27,292-zone list, 14% low rather than a factor of two |
| C-EDIT-2 | same file, §1 (P7) | APPLY (direction) | done | the red team names §1 (P7) and supplies no string; one minimal parenthetical records that the registered 0.016 is the top-two-band figure and the full-list value is 0.0285 |
| C-EDIT-2b | same file, §5's P7 row | APPLY (direction) | done, JUDGMENT | the row repeated "model figure 0.016 a factor of two low", the reading the red team WEAKENED; the cell now carries the same-zone-set comparison |
| C-EDIT-3 | same file, §3's renewal table caption | APPLY | done | appended verbatim: `t/R_band` is the only column computed on the whole band at 10^2 and 10^3 |
| C-EDIT-4 | same file, §5's P4 row | APPLY | done | the red team's paragraph added below the §5 table verbatim, and the P4 verdict cell now reads HIT on the band with the registered ground failing |
| C-EDIT-5 | same file, the Label paragraph | APPLY | done | the self-assignment clause added verbatim: Z4 is recorded NOT audited |
| §3b-1 | `attack-roughpair-error.md`:167 | APPLY | done | replaced verbatim: 1 is the wrong reference, the binomial null returns `1 - p`, sub-Poisson stands as a direction and 0.176 of the 0.711 shortfall at B5, `u = 5`, is the normalisation |
| §3b-2 | same file, :348-352 | APPLY | done | replaced verbatim: the control RAN on 2026-08-29, neither guessed mechanism is needed, and the measured value sits 1.23 to 1.42 times above the second null's prediction |
| §3b-3 | `record-location-null.md`:126-127 | APPLY | done | replaced verbatim with the unit-consistent figure, not the reviewed note's "three orders"; the note's own `ā`, `±` and `−` glyphs are kept |
| §3b-4 | same file, :212-214 | APPLY | done | replaced verbatim: the lattice falsifier is RUN and does not fire, and the 1.7e-4 argument is wrong by about one order as a share of the deficit |
| §3b-5 | `object-models-read-0829.md` §4's D8 row, §4's summary line, §7's C4 | APPLY | done | D8 reclassified interval-level in form and elementary in content, carrying §1a A19's discount verbatim in substance (40-anchor subsample, not pre-registered, inserts two things, MEASURED-based reasoning and not a theorem); the summary line and C4's status line updated as the red team words them |
| §3b-6 | `destroyer-census-01.md` | HOLD, DECLINE | not applied | the red team is explicit that no edit is owed and none should be made: that note publishes no bootstrap and no interval, so there is nothing there to be too narrow |
| §3b-7 | `head-residual-factor.md` | HOLD, DECLINE | not applied | its companion bootstraps over gaps, so the zone-redundancy defect does not reach it and no edit is owed |
| §3b-8 | `zone-tail-01.md` | HOLD | left for the orchestrator | the red team allows a one-line pointer at :227-232 and says the body should stand; a HELD note is not corrected by a successor's preference, and choosing whether to add the pointer is the maintainer's |

**Two ledger `verdict:` lines were rewritten and nothing else in either
block.** `measure-record-null2-0829.md` under B-EDIT-1 and
`zone-tail-02-0829.md` under C-EDIT-1. The red team specifies a verdict change
for no other note, so `measure-roughpair-null-0829.md`,
`attack-roughpair-error.md`, `record-location-null.md` and
`object-models-read-0829.md` keep their blocks untouched, including their
`status:` lines.

---

## 2. Live-document items, verbatim for the orchestrator

Nothing in this section was applied. No live document was opened for editing.
The text below is the red team's §3c as written.

**1. HOLD, with a required correction before any application. `TODO.md`:227-232,
Z4's tail clause and its Ledger line.**

> `zone-tail-02-0829.md` §6 proposes a replacement whose penultimate paragraph
> carries the scope claim REFUTED in §1c C16 and the size WEAKENED in C15. The
> measurement half of the proposal is CONFIRMED by this pass and can go in as
> written. The defect half must not.
>
> proposed by that note: `One defect discovered in the pass is owed elsewhere: the head field's effective sample size is 1,910 distinct a_first among 17,700 top-band zones, so every head bootstrap in this corpus, destroyer-census-01.md's included, prices about three times more independent draws than the field holds.`
>
> corrected: `One defect discovered in the pass is owed to that note itself: the head field holds 1,910 distinct a_first among 17,700 top-band zones, so its own head interval is priced over 17,700 draws the field does not have. A cluster bootstrap measures the inflation at 4.10 (redteam-0829-measure-b.md §1c C15) and moves the interval to [0.6840, 0.7681], still inside the registered [0.68, 0.78]. The corpus scope is one interval: destroyer-census-01.md publishes no bootstrap, head-residual-factor.js bootstraps over gaps, zonegap-01.js has none, and zone-tail-01.js bootstraps only tail quantities.`
>
> The rest of that §6 block is CONFIRMED at every figure this pass could check
> (0.7522, [0.7410, 0.7630], 0.7574, 1.0298, [1.0156, 1.0443], 1.0157,
> [1.0013, 1.0308], `r = -0.0009`, 0.0061, 0.8920, 0.9990) and may be applied.

**2. APPLY. `TODO.md`:265, Z7's queue item (3).**

> "the per-zone TAIL field data the 1e8 census could not reach" is discharged:
> the 1e11 range ran on 2026-08-29 at 330.9 s inside custody. Strike it from the
> box queue and renumber.

**3. HOLD, with the "three orders" phrase replaced. `TODO.md`:250-255, Z5's
First-move paragraph, and :258, its Ledger line.**

> `measure-record-null2-0829.md` §6 proposes a replacement. Everything in it
> that this pass could check independently is CONFIRMED digit for digit: the
> identity, `cov(-z, 1/L)/mean(1/L) = -0.1729476625`, `b_z = 1.2981`,
> `b_med = 1.3159`, `b_A = 1.1251`, `d b_z = -0.0012` and `+0.1113`, 25.6% /
> 25.0% / 40.5% against 14.6% to 16.5%, and the residual at 3.2 to 4.2 ensemble
> sd. **One clause must change before it lands**, its (c):
>
> proposed: `record-location-null.md §8's argued 1.7e-4 is wrong by about three orders in b units: it divides the spacing by the RECORD gap where the governing ratio is the spacing over the MEAN gap, and that ratio enters b multiplied by L.`
>
> corrected: `record-location-null.md §8's argued 1.7e-4 is wrong because it divides the spacing by the RECORD gap where the governing ratio is the spacing over the MEAN gap, a factor of 15 to 17, and that ratio enters b multiplied by L. In the unit the argument was stated in, a share of the deficit, the lattice moves A by 0.0080 against 0.0600, 13.3%, so "two orders below the effect" should read about one order below it.`
>
> The Ledger append of `Q-record-null2` is APPLY as written.

**4. No edit to `README.md` §Status or `research/G2-STATE.md` §0.**

> Nothing in the three notes moves the certificate, the wall, the exponent or
> any (ii) statement, and all three say so. This pass finds no reason to touch
> either.

**5. No hand edit to `research/QUESTIONS.md`.**

> It is generated from the `<!-- ledger -->` blocks; the two registry moves the
> notes propose (`Q-zone-tail` PARTIAL to ANSWERED, `Q-roughpair-error` staying
> PARTIAL) follow from the blocks and from `research/qc/questions.js`, not from
> an editor. On `Q-zone-tail`, **HOLD with a wording condition**: its verdict
> left the coefficient unsettled, and the coefficient is still unsettled after
> this pass (0.7518, 0.7664, 0.7416, 0.7522, non-monotone). ANSWERED is
> defensible only if the new verdict says the coefficient is MEASURED and not
> converged, which `zone-tail-02-0829.md`'s own ledger does say.

**Two pieces of stale text found while applying, neither flagged by the red
team, neither changed here.**

- `measure-record-null2-0829.md` §6's proposed TODO Z5 block still carries the
  "three orders in b units" clause, because §6 is a verbatim proposal for a live
  document and item 3 above is the red team's ruling on it. The rest of that
  note now reads "about one order as a share of the deficit". Anyone copying §6
  into `TODO.md` must take item 3's corrected clause instead of the block as it
  stands.
- `object-models-read-0829.md`'s ledger `verdict:` still ends "the sub-Poisson
  rough-pair dispersion stays unclassified because its own note's control was
  never run", which its own §4 no longer says after §3b-5. The red team
  specifies no verdict change for that note, so the line is left as found and
  named here rather than edited.

---

## 3. OWED to a producer, no code touched and no re-embed run

No APPLY item required an edit to a `.js` file, so nothing in §1 is blocked.
What follows is the custody debt those applications create: three figures now
stand in HELD notes on the red team's scratchpad authority rather than inside
any producer's output custody. The instructions are the red team's, quoted.

**OWED 1. The cluster bootstrap, `research/zone-tail-02.js`.** The 4.10
inflation and the corrected top-band interval [0.6840, 0.7681] now appear in
`zone-tail-02-0829.md` in four places and are the red team's measurement, not
the producer's.

> The producer already holds the `a_first` vector that yields 1,910; a cluster
> bootstrap over it costs the same seconds as the zone bootstrap already run,
> and it returns 4.10 rather than the `sqrt(9.27) = 3.04` the note asserts from
> the ratio alone (§1c C15). The note published an arithmetic estimate of a
> quantity its own data measures, which is the shape of error the corpus's own
> rules exist to stop. **This is the largest single omission in the three
> notes** [MEASURED here, 2,000 resamples].

The red team's own run is stated as 2,000 resamples, seed 20260829, sd 0.02159
against the zone bootstrap's 0.00527, with one-way ANOVA putting 51.6% of the
head variance between clusters. Until the producer emits those, the figures in
the note are cited to `redteam-0829-measure-b.md` §1c C15 and are outside
`embed.js` custody.

**OWED 2. The P7 model on the note's own zone list, `research/zone-tail-02.js`.**
The 0.0285 now appears in `zone-tail-02-0829.md` §1 (P7), §4 and §5.

> P7's 0.016 is the top two bands; the measured 0.0326 is all 27,292 zones; on
> the same list the model gives 0.0285 (§1c C18). Recomputing the formula on the
> note's own zone list is one line.

**OWED 3. The full-band pairing for the `N3` excess,
`research/measure-roughpair-null-0829.js`.** The 1.422, 1.281 and 1.229 now
appear in `measure-roughpair-null-0829.md` §3d and §4.

> Both numbers are in the producer's SEC 6 block, on adjacent columns. Reading
> the full-band measured against the same `N3` predictions moves the `u = 5`
> ratio from 1.325 to 1.229 (§1a A14). The note printed both columns and read
> only one.

A fourth item is adjacent and is recorded here rather than silently dropped,
because it is a producer change the red team recommends and no APPLY covers it:
`research/zone-tail-02.js`:32-36 points at the prereg section without encoding
the bands, so `zone-tail-02-0829.md`'s ten registered intervals have no custody
beyond the note file. The red team's §5.14 asks that registered bands be placed
above the OUTPUT banner so `code-sha256` binds them. That is a change to a
producer already embedded and is not made here.

---

## 4. The gate

`node research/qc.js`, the fast gate, run after every edit above.

**TOTAL 0 on the run after this note was written. The run immediately after the
last edit to a reviewed note returned TOTAL 1, and that finding was not from
this pass:**

- `EMBEDS`, `tail-does-not-belong-to-this-code`,
  `research/measure-g2z2-0829.js`:432, "code changed since the tail was embedded
  (2026-08-29)". That file is another agent's live work in this wave and was not
  read, run or edited here. It cleared between the two runs, without any action
  from this pass. No `.js` file was touched by this pass at all.

Every check that could see these edits is clean: `refs` 0, `quotes` 0,
`crosslinks` 0, `transfers` 0, `calibration` 0, `absence` 0, `sourcing` 0,
`ledger` 0 (443 of 443 notes carry a block, 416 question ids), `provenance` 0,
`search-convention` 0. The two rewritten ledger verdicts and the new block at
the top of this file pass `ledger` and are counted in the 443.

The gate is syntactic by its own statement, so a zero on `refs` and `quotes`
certifies that the pointers resolve and the quoted spans reproduce, not that
any applied wording is right. The wording is the red team's and its
calibration is the red team's.

---

## 5. Draft CHANGELOG paragraph, for the orchestrator to append

*(Not applied. `research/history/CHANGELOG.md` was not opened.)*

> **2026-08-29, red team B's corrections applied to the notes it reviewed.**
> All 17 APPLY items in `redteam-0829-measure-b.md` §3 whose target was a
> staging note landed in place: five in `measure-roughpair-null-0829.md`
> (the custody hash corrected from the hand-transcribed `4813584b` to the
> producer's `5caaa5173b4c1561`, the `N3` excess re-read against the full-band
> measured value at 1.23 to 1.42, the sigma disclosed as pricing one of two
> sampling terms, and §5's two mechanism sentences corrected), three locations
> in `measure-record-null2-0829.md` plus its ledger verdict (the "three orders
> in b units" headline replaced by about one order as a share of the deficit,
> 13.3 percent, and the (i) label marked self-assigned), seven locations in
> `zone-tail-02-0829.md` plus its ledger verdict (the head-bootstrap defect's
> corpus-wide scope narrowed to that note's own interval, its size raised from
> the implied 3.04 to the measured 4.10 with the corrected interval
> [0.6840, 0.7681], P7's model figure re-read on the matching zone set, the
> renewal caption's mixed zone sets disclosed, P4's registered ground marked
> failed, and Z4 recorded as never audited), two in
> `attack-roughpair-error.md` (the sub-Poisson sentence given its correct
> reference and the unrun control marked RUN), two in `record-location-null.md`
> (the argued 1.7e-4 lattice bound marked measured wrong and its falsifier
> marked RUN and not firing), and the D8 row, summary line and C4 status of
> `object-models-read-0829.md`. Three HOLD or DECLINE items were left alone,
> `destroyer-census-01.md` and `head-residual-factor.md` because neither
> publishes anything the defect reaches and `zone-tail-01.md` because a HELD
> note is not corrected by a successor's preference. Five live-document items
> stayed with the maintainer and are quoted verbatim in
> `applied-0829-measure-b.md` §2, including the corrected clauses TODO Z4 and
> Z5 need before either proposal lands. Three figures now standing in HELD
> notes came from the red team's scratchpad rather than a producer and are
> recorded as owed in §3; no `.js` file was edited and no embed was re-run.
> The fast gate returned zero findings after the pass, the one finding seen
> mid-pass having belonged to another agent's file.

---

*Application pass, no producer. Every figure written into a reviewed note is
carried from `redteam-0829-measure-b.md` and is calibrated there; nothing was
recomputed and no measurement was made here. Files edited are listed in §0.
No live document was touched and no git command was run. History layer:
process record, staging. See `research/history/CHANGELOG.md` for the corpus
rule.*
