# Wave 1, shepherd's own findings (2026-08-17)

<!-- ledger
id: Q-qc-shepherd
status: ANSWERED
todo: none
question: What does the wave-1 shepherd find on the corpus's own structure?
verdict: The largest structural defect is that U-FRAME is organised by campaign rather than by claim, with five whole sections of process record sitting in working documents, a PROVEN lemma quoted without the hypothesis that makes it non-vacuous, and three documents disagreeing about how many hypotheses that lemma has; the claim-status register across named objects was not covered and is named as the highest-value remaining axis.
-->

Produced in the main session rather than by a subagent, because an Anthropic
incident degrading Claude Opus 5 (opened 13:56 UTC, still investigating) killed
ten diagnostic agents mid-run with nothing on disk. Everything below is checked
against the files, and where a suspicion did not survive checking that is
recorded too, because a cleared suspicion is worth as much as a finding here.

Two mechanical instruments were built for this pass and both survive in the
session scratchpad, `dedup.js` and `refcheck.js`. They are worth promoting into
`research/` as permanent quality gates; that is recommendation 7 below.

---

## 1. The largest structural defect: U-FRAME is organised by campaign, not by claim

`research/U-FRAME.md` is the biggest file in the corpus at 967 lines, and
sections 10 through 15 (lines 614 to 967, **37% of the file**) are titled by the
attack that produced them rather than by what is true:

- §10 Attack A4's corrections to this note (2026-08-16)
- §11 Attacks A5 and A9 (2026-08-16)
- §12 Attack A10: the lower bound does not become exact
- §13 Attack A3: f settled on 42 exact points
- §14 Attack A8: the exact pair count, and the Alternation Lemma
- §15 A8's extension: the f diagonal is a staircase

A heading census across the whole body confirms U-FRAME is the outlier: seven
chronology-shaped headings against at most five anywhere else, and the others
(PRIOR-ART, PAPERS) are legitimately historical documents.

**Why this is the worst defect and not merely untidy.** An agent asking the
natural question, "what is the current status of the L question", must read six
attack sections and synthesise them, because no section answers it. The u-frame
is the repository's live route, so this is the question most likely to be asked.

**It has already produced a live contradiction.** §5a Step 3 states the bound
maxsum₂(old) ≤ G₂(new) ≤ maxsum_{L+1}(old), VERIFIED at seven folds, and reads
as an invitation to bound L. §10, four hundred lines later, states that the
sharp shift j\*(1) measures 1, 2, 1, 2, 2 against L = 2, 2, 2, 3, 2, that the
upper bound is therefore LOOSE, and that **"a proof aimed at L is aiming
past the target."** Both passages are current mathematics and they do not
contradict each other on the facts, since a bound can hold without being sharp.
They contradict each other on the strategy, and a reader who stops at §5a takes
away the wrong one. TODO item 0b independently confirms the §10 reading is the
operative one.

**Recommended fix, and it needs mathematical judgement, so it is not a wave-2
mechanical job.** Restructure U-FRAME by claim: one section per object (the
frame, the kill law, the copy theorem and the family, κ(m), L and its proven
bounds, the lower recursion, prior art, honest status). Each attack's surviving
result moves into the section for the object it concerns, the strategic verdict
"aim at κ(m), not at L" is stated once where L is defined, and the attack
chronology goes to `history/`. Do not do this as a rewrite from scratch; do it
section by section with the numbers carried across verbatim.

## 2. Five whole sections of process record sitting in working documents

Each of these is a section whose subject is our own learning, which the
convention places in `history/CHANGELOG.md`. Total **147 lines**.

| File | Section | Lines |
|---|---|---|
| `research/U-FRAME.md` | §10 Attack A4's corrections to this note (2026-08-16) | 43 |
| `research/two-class-lower-bounds.md` | §10 Corrections logged | 37 |
| `research/origin-excess.md` | §9 Corrections to the record | 35 |
| `research/maier-matrix.md` | §10 Corrections to the briefing | 25 |
| `research/gate-multiplies.md` | §10 Where the corrections went | 7 |

**The U-FRAME one is not a simple move**, and it is the trap the convention
names explicitly. §10 carries current mathematics (the closure result VERIFIED
40/40, the κ(m) generalisation, the exact copy theorem, the chaining lower
recursion) alongside its corrections to §5a. Deleting it would destroy proven
results; moving it wholesale would move live mathematics into history. It must
be split: the mathematics merges into the sections that own those objects, the
corrections-to-ourselves go to the changelog. Same caution applies wherever a
"corrections" section contains anything VERIFIED.

## 3. Headings that carry history vocabulary while their content is current

These need rewording, not relocation. The convention calls this a CONVENTION
fix: state the fact, drop the reference to it having been a correction.

- `research/level-ledger-tight.md:29` "§1. Custody, and one correction"
- `research/localized-single-alignment.md:153` "§8. Compute, and one correction to the reach estimate"
- `research/gate-multiplies.md:357` "§8. What the corrected item actually needs, priced"
- `research/maier-matrix.md:503` "§8. Granville-Soundararajan Corollary 1.4: Chris's correction is right"
- `research/natal-cap-23-covadj-proof.md:164` "Consequence: corrected status of the Fused-Window Calm Lemma"
- `research/OBSERVATIONS.md:253` "§3. A closed form for the half word instead of the whole — REFUTED same day" ("same day" is the history vocabulary; REFUTED itself is current status and stays)
- `research/U-FRAME.md` §5a Step 3 carries an inline dated update block, "EXTENDED to folds 31 and 37, and A10 answered NEGATIVELY (2026-08-16, …)", which should be folded into the statement of the bound.

**Correctly left alone**, recorded so the next pass does not churn them: the
REFUTED readings in `maxgap-law.md` §4c and §8, `natal-cap-36`'s refuted decay
shortcut, `h2-scoping.md` §5's three refuted proxies, `d2-d4-bijection.md`'s
refuted grain analog, and `natal-cap-23`'s "what is proven, what is refuted,
what remains". In each case REFUTED is the current status of a route, which the
convention keeps in the body.

## 3b. A PROVEN lemma is quoted without the hypothesis that makes it non-vacuous

**This is the most consequential finding of the pass, and it is a disagreement
between two documents about the content of a proven theorem.**

`research/maier-matrix.md:198` states the canonical form, with the hypothesis
bolded for emphasis:

> **Origin Excess Lemma (PROVEN, VERIFIED 14/14).** Let y < x with **y′² > x**,
> let y′ be the least prime above y, and let S ≤ y′². …

`research/G2-STATE.md:403` quotes the same lemma, cites `maier-matrix.md` §4 as
its source, and **drops `y′² > x`**:

> **PROVEN, VERIFIED 14/14** (`maier-matrix.md` §4). Let y < x, let y′ be the
> least prime above y, and let S ≤ y′². …

The dropped hypothesis is not decorative. `research/origin-excess.md` §6(a)
establishes that it is exactly what keeps the lemma from being empty: an x-rough
integer below x is 1, and 1 is not a slot, so D_x(S) = 0 for every S ≤ x, and
**"at S = y′² ≤ x the lemma says 0 = 0."** Quoted G2-STATE's way, the lemma reads
as applying to every y < x with S ≤ y′², when in the whole regime y′² ≤ x it
asserts nothing at all.

Two things make this worse than a transcription slip. G2-STATE is the document a
fresh agent is pointed at first, described in the repo README as everything known
about the central object with a calibration marker on every line, so it is the
most-trusted statement of the lemma in the corpus. And the fourteen verification
cells that earn the VERIFIED 14/14 all satisfy y′² > x, so the evidence
G2-STATE cites does not support the wider claim its wording makes.

**Fix:** restore `with y′² > x` to the G2-STATE §4e statement. Confidence high;
checked against all three documents and against the 14-cell table.

## 3c. Three documents disagree about how many hypotheses that lemma has

Same lemma, a confusion rather than a falsehood, and it is the kind Chris's rule
puts second only to disagreement.

- `maier-matrix.md` §4 states two conditions: S ≤ y′², and y′² > x.
- `origin-excess.md` §6 is titled "The three hypotheses of the Origin Excess
  Lemma, only one of which was written down", and opens "The lemma as stated in
  `maier-matrix.md` §4 needs S ≤ y′². It needs two more things". That premise is
  now stale, because maier-matrix §4 does state y′² > x, in bold. The heading's
  "only one of which was written down" is therefore no longer true of the file it
  is describing.
- `G2-STATE.md` §4e says "The lemma carries an unstated **third** hypothesis and
  it is the binding one", meaning the x < x\* threshold. The ordinal cannot be
  reconstructed by a reader, and it is doubly wrong inside G2-STATE, which has
  dropped y′² > x and so leaves two hypotheses unstated rather than one.

**Fix:** settle one canonical enumeration in `maier-matrix.md` §4 as the lemma's
home (S ≤ y′²; y′² > x; and the x < x\* positivity threshold, which is where the
advantage actually dies), then have `origin-excess.md` §6 and `G2-STATE.md` §4e
refer to that numbering instead of each maintaining its own count. Retitle
origin-excess §6 to drop "only one of which was written down". NEEDS MATH
JUDGEMENT: whether the collision fact (c) counts as a hypothesis of the lemma or
as a separate theorem about the parameters is a real question, and §6 currently
treats it as both.

## 3d. A second dropped qualifier, same kind, different lemma

`research/ZONE-POSTULATE.md:248` logs the loose end as:

> …whether an explicit elementary bound (Kanold, Stevens, Paseman
> arXiv:1311.5944 …) already delivers g(x#) < x′² **at the needed constant** was
> not checked.

`research/G2-STATE.md:534` absorbs it and drops four words:

> …already delivers g(x#) < x′² was not verified.

The constant is the whole question, not a detail. `TODO.md` item 000b states it
explicitly: the win is "if any of them delivers **the constant-1 form** at
primorials". All three cited papers prove exponent 2 + ε bounds, so the exponent
is not in doubt and only the constant can decide the item. G2-STATE's wording
turns a sharp, cheap, well-posed check into a vague one.

**Fix:** restore "at the needed constant" to G2-STATE §4's loose-end note.
Confidence high; corroborated by TODO 000b independently of ZONE-POSTULATE.

### What the two dropped qualifiers do and do not show

Both 3b and 3d are the same kind of defect: a *condition that limits when a
result applies* was lost in transfer, while the citation, the calibration marker
and every number survived intact. That is the signature to search for.

**But it is not a systematic bias, and I am not going to claim it is.** Across
the nine absorbed passages examined, G2-STATE more often *adds* rigour than
removes it: it supplies the missing concluding step in Fact A, names the map
B ↦ 2.4·R·B·ln x that LOCALIZED-GAP leaves anonymous, embeds a bare measurement
inside the Traverse Bound, labels the discrepancy table's columns more precisely
than the home document does, and, in the passage absorbed from
`exponent-control.md:155`, adds the caveat **"Do not bank it."** together with
the noise explanation, where the home document has neither. Two losses against
roughly seven gains. The lesson is that transfer is where qualifiers die, in
either direction, so transfers are what a standing check should diff.

## 4. Duplication: mostly earning its tokens, and one clear kill

**I am correcting my own earlier framing here.** I first recorded G2-STATE's nine
absorbed passages as a duplication problem to be fixed. Having diffed every pair
word by word against Chris's rule, that was overstated: most of the restatement
adds context or a learning and should stay. The real damage in this cluster is
not the duplication, it is the single dropped hypothesis in item 3b above.

What the word-level diffs actually show:

| Pair | Verdict |
|---|---|
| `LOCALIZED-GAP` 32-33 / `G2-STATE` 314-315 | KEEP. Byte-identical, but it is the notation G2-STATE's own §4b then uses; 30 words is cheaper than forcing a jump to another file |
| `LOCALIZED-GAP` 35 / `G2-STATE` 317-318 | KEEP. G2-STATE's copy adds the source citation, so it is strictly better |
| `LOCALIZED-GAP` 143-144 / `G2-STATE` 383-384 | KEEP. Mathematically identical, differs only in bold and spacing |
| `LOCALIZED-GAP` 20-22 / `G2-STATE` 297-299 | KEEP. G2-STATE adds the concluding step "so one is divisible by 3" |
| `LOCALIZED-GAP` 78-83 / `G2-STATE` 346-351 | KEEP, and backport. G2-STATE's version is the better one: it adds "because the gate feeds back" and names the map B ↦ 2.4·R·B·ln x. LOCALIZED-GAP should gain that naming |
| `LOCALIZED-GAP` 75-76 / `G2-STATE` 339-344 | KEEP. G2-STATE embeds the measurement inside the Traverse Bound, which is more than LOCALIZED-GAP states |
| `maier-matrix` 198-205 / `G2-STATE` 403-407 | **RECONCILE**, see item 3b. The one genuine defect in the cluster |

So the G2-STATE policy question I raised earlier is answered by the evidence as
well as by Chris's rule: G2-STATE is doing its job, and the fix is to make its
restatements faithful, not fewer. **Drift is the risk to manage, not volume.**
Item 3b is what drift looks like when it goes unchecked, and it is the argument
for keeping `dedup.js` as a standing gate rather than for deleting text.

## 4b. The original duplication inventory, retained for the wave-2 appliers

The shingle scan found 45 cross-file near-duplicate pairs after filtering the
intentional per-document changelog footer. `research/G2-STATE.md` accounts for
12 of them, absorbing near-verbatim text from five other documents:

| Source | G2-STATE location | Overlap |
|---|---|---|
| `LOCALIZED-GAP.md` 32-33 | 314-315 | identical |
| `LOCALIZED-GAP.md` 35 | 317-318 | j=0.75 c=0.88 |
| `LOCALIZED-GAP.md` 78-83 | 346-351 | j=0.55 c=0.77 |
| `LOCALIZED-GAP.md` 143-144 | 383-384 | j=0.65 c=0.80 |
| `LOCALIZED-GAP.md` 20-22 | 297-299 | j=0.49 c=0.69 |
| `maier-matrix.md` 198-205 | 403-407 | j=0.60 c=0.77 |
| `discrepancy-two-class.md` 212-215 | 483-486 | j=0.53 c=0.80 |
| `ZONE-POSTULATE.md` 248-252 | 534-538 | j=0.50 c=0.69 |
| `U-FRAME.md` 174-179 | 804-813 | j=0.27 c=0.67 |

The first six rows are adjudicated in item 4 above and need no action beyond one
backport. The `maier-matrix` row is item 3b, the one real defect.

**Still to diff, and they must be diffed rather than assumed**, since the pair
that produced item 3b looked no more suspicious than these before it was opened:
`discrepancy-two-class` 212-215 / `G2-STATE` 483-486; `ZONE-POSTULATE` 248-252 /
`G2-STATE` 534-538; `U-FRAME` 174-179 / `G2-STATE` 804-813; `ATTACKS3` 239-250 /
`U-FRAME` 781-787; `covering-dive` 58-65 / `two-class-lower-bounds` 134-143;
`exponent-control` 155 / `G2-STATE` 613-620; `staircase-note` 26-27 /
`anchored-note` 26-27. Side-by-side text and word diffs for all of them are
prepared in the scratchpad at `pairdiff.txt`, produced by `pairdiff.sh`.

**The method is the transferable lesson.** Item 3b was found by word-diffing a
near-duplicate pair, not by reading either document. A statement can be quoted
with its citation intact, its calibration marker intact and its numbers intact,
and still have lost a hypothesis. Only the diff shows it.

## 5. The six-way paper attribution block: intentional, but a drift risk worth recording

An identical 65-word AI-attribution statement appears in
`paper/anchored-note.md:523-529`, `paper/variance-note.md:330-336`,
`paper/moire-primes.md:883-889`, `paper/beta2-note.md:319-325` and
`paper/PAPERS.md:160-166`, with a tailored longer variant at
`paper/staircase-note.md:529-537`.

**Verdict: keep.** Each paper is a standalone deliverable and needs its own
attribution statement; the staircase variant is correctly tailored to its own
content. Recorded only because an attribution-policy change means six
coordinated edits, and because five of the six being byte-identical means a
divergence would be invisible. If it ever changes, change all six in one commit.

## 6. Reference integrity: much better than expected

A mechanical check of every path mention, every "file.md §N" reference and every
script shorthand (natal-cap-NN, fold-profile-NN, attack-NN, cap-NN, a3-NN)
across all 63 body files found:

- **dead file paths: 2**, and both are false alarms. `web/PROPOSAL.md` lines 452
  and 467 name `web/script.md` and `web/build-data.js` as artifacts the proposal
  *plans to build*. Correct as written; no action.
- **script shorthands resolving to nothing: 0.** Every one of the shorthands in
  the prose resolves to exactly one artifact, with no ambiguous cases. This is
  unusually good discipline for a corpus this size and worth knowing.
- **broken section references: 1, and it is real.**
  `research/maier-matrix.md:282` cites `research/origin-excess.md` §6c. That file
  has sections 0 through 11 and no §6c; §6 is "The three hypotheses of the Origin
  Excess Lemma, only one of which was written down". The citation supports the
  claim that the disjointness y′² < x′² is a fact about the two parameters, so no
  better lemma repairs it. **Fix: repoint to §6, and confirm while doing so that
  §6 actually carries the no-better-lemma statement rather than §7's general
  obstruction subsection**, which is the other candidate.

## 7. Numbers: precision discipline holds, and two suspects cleared

The exponent β₂ appears in eleven distinct renderings (4.26, 4.263, 4.266,
4.26645, 4.266450, 4.26645028, the full 20-digit forms, 4.26646, 4.2665, 4.267)
across 57 sites. Almost all are consistent roundings of 4.26645028414864191641,
and the variation is presentational rather than contradictory.

Two apparent errors were checked and **both are correct as written**, which is
worth recording so nobody "fixes" them:

- `research/dhr-verification.md:47` gives both ...191641 and ...191642. These are
  the two endpoints of a rigorous interval, "so rigorously 4.26645028414864191641
  ≤ β₂ ≤ 4.26645028414864191642". Correct.
- `research/dhr-verification.md:52` says "exponent > 4.26646 works". That is a
  deliberate safe round-up, not a mis-rounding of ...45028. Correct.
- Similarly `0.79303` (8 sites) is not a bad rendering of e^{2γ}/4 = 0.793055.
  It is the *measured* value at x = 1487 after stripping the finite-size
  Hardy-Littlewood factor, a different quantity from the asymptotic constant, and
  both appear correctly side by side in `ZONE-POSTULATE.md:293`.

**Caveat attachment, tested at file level, is also sound.** Every one of the 20
files quoting the 1.57 growth exponent also carries either the 1.3 to 1.9
bracket or the control-corrected/floor language. This is a weak test, since a
caveat 300 lines from its number still passes it, so the paragraph-level check
remains open and is the right target for the numbers agent when Opus recovers.

## 8. What this pass did NOT cover, so it is not mistaken for complete

- Paragraph-level caveat attachment for every load-bearing number.
- The claim-status register across all named objects, which is the highest-value
  remaining axis: whether every theorem carries one status at one scope
  everywhere, and whether anything Holt, Maier or Buchstab owns is still
  presented as ours. That is a publication risk and it needs a full pass.
- External citation verification against sources.
- Semantic duplication that shingles cannot see, especially the route and dial
  descriptions shared between TODO.md, G2-STATE.md, THE-DIALS.md and
  ZONE-POSTULATE.md.
- The 129 research/*.js header comments and READINGS blocks.
- Whole-file architecture: entry path, reading order, and which body files are
  spent artifacts that belong in history.

## Recommendations, ordered

Ordered by damage to a reader who trusts the document, which puts the two
one-line truth fixes above the large structural job.

1. **Restore `with y′² > x` to the Origin Excess Lemma in `G2-STATE.md` §4e**
   (item 3b). One line, high confidence, and it is currently a proven lemma
   quoted in vacuous form in the corpus's most-trusted summary. SAFE to apply.
2. **Restore "at the needed constant" to the loose-end note in `G2-STATE.md` §4**
   (item 3d). One line, high confidence. SAFE.
3. **Settle one canonical enumeration of that lemma's hypotheses** in
   `maier-matrix.md` §4, then align `origin-excess.md` §6 and `G2-STATE.md` §4e
   to it, and retitle origin-excess §6 to drop "only one of which was written
   down", which is now false of the file it describes. NEEDS MATH JUDGEMENT.
4. **Diff the seven remaining near-duplicate transfers** listed in item 4b before
   assuming they are clean. Two of the first nine hid a dropped qualifier that no
   amount of reading either document would have surfaced. SAFE, mechanical.
5. Restructure `U-FRAME.md` by claim rather than by attack, section by section,
   carrying numbers across verbatim. NEEDS MATH JUDGEMENT. Largest single job in
   the campaign.
6. Split U-FRAME §10: mathematics into the sections that own each object,
   corrections into the changelog. NEEDS MATH JUDGEMENT. Do with item 5.
7. Migrate the other four corrections sections (104 lines) to the changelog,
   checking each for VERIFIED content that must stay in the body. Mostly
   mechanical, but each needs the orphaned-claim check.
8. Reword the seven history-carrying headings in item 3. SAFE.
9. Fix the `origin-excess.md` §6c reference in `maier-matrix.md:282` after
   confirming whether §6 or §7's general-obstruction subsection is the right
   target. SAFE once confirmed.
10. Two small backports, both improving the home document from its own copy:
    give `discrepancy-two-class.md:212`'s table the column labels G2-STATE uses
    ("sup, geometric mean per fold", "sd per fold", and ×2 / ×3 rather than bare
    2 / 3, which currently read ambiguously as absolute rather than multiplicative
    ceilings); and give `LOCALIZED-GAP.md:78` the map naming B ↦ 2.4·R·B·ln x.
11. Check one "verbatim" claim in `research/covering-dive.md:58-65`. It labels the
    FKMPT Remark 7 quotation "quoted verbatim from the arXiv v4 PDF" but renders
    the source's bibliography marker `[7]` as `[Halberstam–Richert]`, which
    `two-class-lower-bounds.md:134` keeps as `[7]`. The substitution is helpful
    and almost certainly deliberate, but a quotation labelled verbatim should not
    be silently edited, and this file's neighbouring bullet cites v3 while this
    one cites v4. Given that the earlier audit traced the C(ρ) constant error to
    exactly this kind of version confusion, both points are worth a look before
    anything from this file reaches a paper.
12. Promote `dedup.js`, `refcheck.js` and `pairdiff.sh` into `research/` as
    standing quality gates, so this pass is repeatable rather than a one-off.
    Between them they found the broken section reference, both dropped
    qualifiers, and the U-FRAME chronology problem.

---

This document is wave-1 diagnosis. Nothing here has been applied to any body
file. Findings that conflict with other wave-1 reports are adjudicated in
`qc-CAMPAIGN.md` before wave 2 applies anything.
