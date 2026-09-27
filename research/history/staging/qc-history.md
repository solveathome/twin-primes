# QC: history migration (Wave 1 diagnosis)

<!-- ledger
id: Q-qc-history-migration
status: ANSWERED
todo: none
question: Which body text is history and should move to CHANGELOG.md or history/?
verdict: The headline is a negative and it is the most useful thing in the report: no body file is a session record that should move wholesale, so what moves is per-section, and the pass leaves an ORPHANED-CLAIM list of live errors plus per-file findings over all 63 body files.
-->

STATUS: COMPLETE.
Read-only diagnosis. No existing file edited. Author: history-migration agent, 2026-08-17.
Inherited nothing; this file is new this pass.

Scope: all 63 `*.md` outside `research/history/`, plus `research/*.js` header/READINGS blocks.
Companion: `qc-shepherd.md` (shepherd's own findings, not repeated here except where
this pass corrects or extends them).

**Class key.** MIGRATE (to CHANGELOG, body edited); CURRENT NEGATIVE KEEP (no action, or
reword only); BULK RELOCATE (whole section/file to `history/`); DELETE OUTRIGHT (history
already in `history/`, cited); AMBIGUOUS (Unresolved section).

---

## BULK RELOCATE list

**The headline is negative, and it is the most useful thing in this report: there is no
file in the body that is a session record, campaign log or run diary and should move to
`history/` wholesale.** I went looking for them specifically — every dated heading, every
"session", "campaign", "wave", "log", "diary" heading in all 63 files — and every candidate
survived inspection. The corpus's process record is not concentrated in whole files that can
be lifted out; it is **distributed as framing inside documents whose mathematics is
current**, which is why this job is a sentence-level pass and not a `git mv`. Candidates
examined and cleared, so no later pass re-litigates them:

| candidate | why it stays |
|---|---|
| `research/ATTACKS.md` (23 lines) | A ten-row status table where each row is a result, not a narrative. ~2 lines per attack. `research/README.md:97` points readers at it. **Highest information density per token in the corpus.** Only "Status updated as executed" (line 6) is process; drop that clause. |
| `research/ATTACKS2.md` (34 lines) | Same form, same verdict. Drop "(2026-08-14)" from the title and "all ten complete, 2026-08-14" from the §Campaign-verdict heading. |
| `research/ATTACKS3.md` (250 lines) | **The route-status register for the u-frame wave**, and the corpus's best single artifact for "do not retry this". Ten routes, each with its current verdict stated in the present tense ("Bounding L is therefore no longer the target", "Exactness of the lower bound is a dead end"). Exactly the first-class negative result the campaign is meant to protect. See Unresolved U1 for the one open question about it. |
| `research/NATAL-CAP-CAMPAIGN.md` (100 lines) | A scoreboard plus convergent-findings plus ranked-opens document. The one-paragraph answer at the top is the best summary of that whole line of work anywhere. Drop the date from the title. |
| `research/OBSERVATIONS.md` (688 lines) | A bench notebook with explicit house rules at the top, including "Refuted entries stay, marked", which pre-dates and agrees with the convention. Its `## Reconfirmations` section states its own reason for existing and earns it. See U4. |
| `research/history/` proper | Already correct; `README.md:19-21` tells readers not to load it. No action. |
| `research/theta-ladder.md`, `research/maxgap-law.md` | The two documents that read most like run reports. **Both are load-bearing current mathematics** — theta-ladder settles θ by exact suprema and is cited from TODO 0 and ZONE-POSTULATE; maxgap-law owns the surface/diagonal distinction that four other files now depend on. Reword, never relocate. |

**The one bulk operation that IS warranted is internal, not to `history/`:** U-FRAME §10's
42 lines split across four §5a steps and §9 of the same file. Detail in the U-FRAME entry.
The shepherd's larger recommendation, restructuring U-FRAME by claim rather than by attack,
is the right call and this report's §10 split is its first section.

## ORPHANED-CLAIM list (live errors)

These are the inverse of the danger the brief names, and there are more of them than of
the forward kind: the corrected claim **was** fixed, and the correction block was left
behind, so it now quotes or describes a sister document that no longer says that. Each is
a live error because a reader who follows the citation finds the premise absent.

**O1. `research/gate-multiplies.md:332-334` misquotes U-FRAME as still carrying a retired
reading.** It says "The bottom row is what U-FRAME section 4 and section 6a report as *the
multiplier uses only 15 to 45 percent of its budget and the fraction is TRENDING DOWN*."
`research/U-FRAME.md:115` now reads "so our multiplier uses 77 to 214 percent of its
budget, and the fraction is not [trending down]" — the exact opposite, and the corrected
version. No U-FRAME section says the quoted thing any more. **Fix:** body states the fact
without the attribution — "The bottom row is the same data against the retired ln²-budget,
which is what made the multiplier look as though it used only 15 to 45 percent and
trended down. The row above it is the same data against the real budget: **the true
multiplier uses 77 to 214 percent of its budget and it is not trending down.**"
Confidence high (grepped U-FRAME for both the phrase and the number).

**O2. `research/maier-matrix.md:621-624` asserts a pending correction to PRIOR-ART.md that
was applied.** Detail and citations in the per-file entry; `PRIOR-ART.md:302-303` already
carries the swapped version and `CHANGELOG.md:396-400` already logs it. Confidence high.

**O3. `research/gate-multiplies.md:281-284` and `:451-459` quote TODO 0b's retired
premise as current.** TODO.md:75-101 was rewritten to the corrected rate. Detail in the
per-file entry. Confidence high.

**O4. `research/theta-ladder.md:692-694, 710-724` correct a TODO 00 costing that TODO.md
already carries in corrected form** (TODO.md:71-72 "z = 59 is ~5 h, z = 71 is 36 h"), and
which `CHANGELOG.md:276-277` already logs. Detail in the per-file entry. Confidence high.

**O5. `research/origin-excess.md` §6's title premise is false of the file it describes.**
Confirmed independently of the shepherd (his item 3c): §6 is titled "The three hypotheses
of the Origin Excess Lemma, only one of which was written down" and opens "The lemma as
stated in `maier-matrix.md` §4 needs S ≤ y′². It needs two more things", but
`maier-matrix.md:198` now states `y′² > x` in bold. **Fix:** retitle §6 "The three
hypotheses of the Origin Excess Lemma" and open "The lemma needs three things, of which
`maier-matrix.md` §4 states two". Changelog: origin-excess §6 was written when
maier-matrix §4 stated only one hypothesis; §4 was extended, the §6 premise retired.

**O6. A retired phrase from ZONE-POSTULATE §5 is still quoted as live in three other
files.** `research/ZONE-POSTULATE.md` §5 (lines 128-160) no longer contains the words "a
second sighting worth watching", and no longer frames the window/G₂ flatness as a worry at
all: it now states that "that flatness is a small-number effect, and two independent
measurements say so". The retirement is logged at `CHANGELOG.md:254-260`. Three files still
quote the phrase as though it were there:
- `research/theta-ladder.md:5` lists "`research/ZONE-POSTULATE.md` §5 (\"a second sighting
  worth watching\")" as a companion document. **Fix:** "`research/ZONE-POSTULATE.md` §5,
  which this file settles."
- `research/G2-STATE.md:670` "This answers `ZONE-POSTULATE.md` §5's \"second sighting worth
  watching\", whether …". **Fix:** state the answer without the retired framing — "On
  `ZONE-POSTULATE.md` §5's question, whether …, the answer is …".
- `research/two-class-lower-bounds.md:655` — see that file's §10 item 5 below.
Confidence high; grepped for the phrase across every body file. **This is the class of
error the shepherd's `refcheck.js` cannot see**, because the section number resolves; it is
the *quoted phrase* that is dead. Recommend extending refcheck to quoted fragments.

**O7. `research/two-class-lower-bounds.md:648-650` quotes a question that no longer exists
in `covering-dive.md`.** It cites "`research/covering-dive.md` §Q4.2, realistic target 4"
asking *"does covered length scale like `c·p²/log`? like ZM's ≈ `p²/2` data?"*. Neither
"c·p²/log" nor "realistic target" appears anywhere in `covering-dive.md` today; the change
is logged at `CHANGELOG.md:245`. Confidence high.

**O8. `research/two-class-lower-bounds.md:646-652` quotes U-FRAME §6a's retired reading as
current.** It says "`research/U-FRAME.md` §6a reads the adversarial exponent as *\"STABLE
at about 1.62, comfortably below the critical 2\"*". `U-FRAME.md:487` now reads "**The
fitted exponent is 1.62 in the theta frame and 1.924 against x**" — already frame-matched,
already corrected, and the words "comfortably below the critical 2" appear nowhere in
U-FRAME. Logged at `CHANGELOG.md:222`. Confidence high.

**O9. `research/origin-excess.md:688-691` quotes a phrase retired from ZONE-POSTULATE §6.**
It says "`ZONE-POSTULATE.md` §6 route B says the origin's proven structure is *\"not yet
aimed here\"*". The string "not yet aimed" appears in no body file. Confidence high.

**O13. `research/h2-scoping.md:27-29` says `exponent-control.md` §8 recommends something it
no longer recommends.** h2-scoping states "the recommendation in `research/exponent-control.md`
§8, that extending h2 past 21 terms is *\"the highest-value computation available on this
question\"*, is wrong on both legs". `exponent-control.md:266` now reads "**Extending h2 past
21 terms is not available and would not help**", cites h2-scoping itself, and reproduces
h2-scoping's whole argument (term 22 ≈ 3.4 months, term 25 ≈ 85 years, bias not precision,
three refuted proxies). The two files agree completely; only h2-scoping's framing says
otherwise. Confidence high.

**O14. `research/killrun.js:7` asserts a pending correction to U-FRAME that was applied.**
"U-FRAME 5's L column and step 6's diagonal both need that correction." `U-FRAME.md:330-331`
carries the corrected column, "L = 1, 2, 2, 2, 3, 2, 4, 4 at folds 11 to 37". The rest of
that header must stay — see the `research/*.js` section. Confidence high.

**O15. A live self-contradiction inside one artifact, and the paper already knows about it.**
`research/natal-cap-08-staircase.js:416-417` asserts "exact < RS < PNT at all four levels,
ordering as it should be". Line 343 of the same file prints the counterexample: at @19,
Rosser-Schoenfeld = 854 132 and PNT-style = 835 838, so RS > PNT. `paper/staircase-note.md`
§6 carries the corrected ordering and `:490-494` records the discrepancy explicitly. **This is
not a migration item, it is an error in the artifact of record**, and it is the only case
this pass found where a script's READINGS block states something its own printed output
refutes. Fix: amend the script's reading 6 to "exact < PNT < RS at @19, exact < RS < PNT at
the other three levels; the PNT integral form is a guide and not a bound, and it undercuts
the RS bound at @19", which is what `staircase-note.md` §6 already says. Confidence high,
verified in both files. Note this READINGS block has been edited before, at
`natal-cap-08-staircase.js:371`, so amending it is in keeping with the file's own history.

**O11. `research/maxgap-law.md` §10 "What this note owes other files" lists three debts
that have all been paid, while stating they are "outstanding against files this note does
not own".** Checked one by one:
- Item 1: `localized-04-maxsum.md` §4 "should record the coordinates (x, lnD, lnD/theta(x))
  at which its `c` was measured". **Done** — `localized-04-maxsum.md:127-133` now carries
  "The constant travels with its coordinates, because it is a surface", the surface reading,
  and the explicit statement that every number in the section sits off the diagonal.
- Item 2: "`FOLD-PROFILE.md` §12, localized `M(x, x'^2) ~ 1.2 x ln x` with margin
  `x/(1.2 ln x)`, is refuted … The true margin is `x^2/(3.5 ln^3 x)`". **Done** —
  `FOLD-PROFILE.md:486` now reads "localized: M(x, x′²) ~ 3.5·ln³x against x′², **margin ~
  x²/(3.5 ln³x) → ∞**", and `1.2 x ln x` appears nowhere in that file.
- Item 3: "`exponent-control.md` §2 … **should add** that the `o(1)` is not static: `c1`
  drifts upward at `(log p)^{0.12}`". **Done** — `exponent-control.md:86` carries
  "`c1` … grows like `(log p)^{0.12 ± 0.03}`".
Item 4 is not a debt at all but a durable source check ("checked against the source, so
nobody re-checks it") and must be kept in the body. Confidence high on all four.

**O12. `research/level-ledger-tight.md:47` says "nothing was edited", and everything it
asked for has since been edited.** The block is headed "**Corrections to the record** (for
the parent to apply; nothing was edited)" — an agent-to-parent handoff that was acted on.
- Item 1: FOLD-PROFILE §2's "Möbius bound" column header called ambiguous. **Fixed** —
  `FOLD-PROFILE.md:72` now heads the column "K-level bound 4·3^{π(x)−1}" and `:79` states
  "Both bound columns are K-level, that is twice the corresponding bound on h".
- Item 2: FOLD-PROFILE §3's row quoted at the ladder prime, "REFUTED, a premise of the
  whole ladder". **Fixed** — `FOLD-PROFILE.md:113-114` now states "maximised over p at fixed
  x the same quantity reads **2.87, 5.97, 12.03 at x = 11, 13, 17**, against the 1.62, 3.35,
  3.63 the diagonal [gives]".
- Item 3 is self-marked RESOLVED already.
So a reader is told three edits are pending which are not, and told nothing was edited when
the whole point of the block has been applied. Confidence high.

**O10. `research/origin-excess.md:665` and `:680-684` assert pending actions that have been
completed.** ":665" says "`maier-matrix.md` §4 and its reading 3 **now** state the capped
form" — they do (`maier-matrix.md:243`, `:249`, `:552-553`), so the sentence is a note about
a completed edit. ":680-684" says the ρ(2) identification is "**Worth cross-referencing in
all three**" — it has been: `FOLD-PROFILE.md:300` names it "the Unification Law value" and
`GLOSSARY.md:208` carries the conjectured limit. Both are spent instructions to ourselves.
Confidence high.

---

## Per-file findings

### research/theta-ladder.md (740 lines)

**File-level diagnosis, and it is the largest single item this pass found.**
This document is written as a *reply to a task brief* rather than as a statement of
what is true. "The brief" appears as the grammatical subject at lines 33, 55, 89, 130,
160-161, 220, 309, 336, 433, 467, 527-528, 532, 587, 614, 624, 692, 710 — eighteen sites.
The mathematics in it is current and excellent; the framing is process record of the
2026-08-17 run. Treat as a systematic REWORD pass (see the per-item table), not a
relocation: almost nothing here should leave the body, but almost every "the brief"
sentence should be restated as a fact.

The general rewrite rule for this file: *X is true* replaces *the brief asked/assumed
Y and the answer is X*. Where the brief's wrong assumption is itself informative it goes
to the changelog, not into the sentence.

| line(s) | class | offending text (minimal) | disposition |
|---|---|---|---|
| 3 | MIGRATE | "**Run 2026-08-17. Brief: TODO item 00, feeding TODO item 0.**" | Body keeps "Feeds TODO items 00 and 0." Run date and brief provenance to the changelog's existing theta-ladder entry. |
| 33 | REWORD | "That last one is the measurement that matters, and it was not in the brief." | Body: "That last one is the measurement that matters." The fact that nobody asked for it is not a fact about θ. |
| 55 | REWORD | "**CORRECTION TO THE BRIEF, VERIFIED.** `need` contains no H." | Body: "**VERIFIED: `need` contains no H.**" Rest of paragraph stands; drop "and the u = 3.2 in TODO 00 is a formality" → "u is a formality; the family is set by s alone." |
| 89-90 | REWORD | "reproduce digit for digit against the brief's 2.159, 2.183, …" | Body: "reproduce digit for digit against the four rows on record: 2.159, …". Custody is current content and stays. |
| 105 | MIGRATE | "TODO 00's \"z = 31 took 65.3 s\" came in at 36.7 s here" | Body: "z = 31 costs 36.7 s on this machine." The superseded 65.3 s estimate goes to the changelog. |
| 130 | REWORD | "the drift the brief flagged is real" | Body: "the drift is real and it has not slowed: 2.159, …". |
| 160-161 | REWORD | "The answer to the brief's question 2 is: c grows faster than z^1 … something the brief did not ask about." | Body: "**c grows faster than z¹, by a margin this data can see.** The last two lines matter more." |
| 220, 224 | KEEP | "This is not a defect in the brief's ladder … not a correction to the ladder." | The mathematical content (z = prime is the physically correct convention; the block sweep is a CONTROL) is current. Reword to "This is not a defect in the ladder" / "a CONTROL on how much of θ's value the offset sets, not a correction to the ladder." "correction" here is used mathematically, not historically. |
| 254, 258 | KEEP | "a correctable offset, roughly 0.95 … does not survive its second test" | CURRENT NEGATIVE KEEP. This is a refuted-within-the-document control, and the refutation is the result (§4's noise bound). No action. |
| 309 | REWORD | "for a stronger reason than the brief gives" | Body: "That is the right methodological call, and for a stronger reason: at s = 2.6 …". |
| 336 | REWORD | "and this CORRECTS the brief, the two s = 2.6 points at z = 41, 47 were not badly biased in VALUE" | Body: "Second, the two s = 2.6 points at z = 41, 47 are not materially biased in value: mixing families was a validity error, not the source of the drift." |
| 411-412 | KEEP | "Correcting by that heuristic factor … The correction is a heuristic and is NOT claimed" | Mathematical "correction" (a multiplicative factor). No action. |
| 433 | REWORD | "The brief asks which of three the data supports" | Body: "Three readings are on the table: …". |
| 467 | REWORD | "more nuanced than either the brief's hope or its stated ceiling" | Body: "The honest answer is nuanced, and it is worth stating precisely." |
| 527-530 | REWORD | "the plain answer the brief asked for is (3) … The brief offered three branches; the data picks the third and adds a fourth possibility it did not list" | Body: "**The answer is (3), with an amendment.** θ is above 2, rising, with no evidence of settling within reach — and a fourth possibility is live: θ has no visible asymptote in this range." |
| 532-537 | MIGRATE | "**And a correction to the brief's own expectation.** TODO 00 says this run \"SHARPENS the trend and does not settle it\" … it under-priced what the run could do" | Body drops the paragraph and keeps one sentence where §5b is introduced: "The decisive instrument is the exact supremum, not the fit; the fit cannot separate a limit." Changelog: TODO 00 pre-registered this run as trend-sharpening only; it was under-priced, because the exact supremum removes the conditionality that no laddering of the conditional column could. |
| 574-576 | REWORD | "This is a correction worth carrying into TODO 0: its two open items … are not independent halves." | The mathematics is current AND already applied to TODO.md:63-66 ("the maximal law is not half the price, it is the whole price"). Body: "TODO 0's two open items, (a) the drift and (b) the maximal law, are not independent halves. (b) is the whole price; (a) only tells you what you would be buying." |
| 587 | REWORD | "This is a MISS, not a tie, and the brief's framing understates what is still owed." | Body: "This is a MISS, not a tie, and more is owed than it looks." |
| 614-617 | REWORD | Reading 2 "**VERIFIED, and a correction to the brief.**" … "TODO 00's `row(z, 3.2, 3.0)` is right about the family and irrelevant about the window." | Body: "**VERIFIED.** `need` and θ are H-free … so the family is set by s alone and the window index is irrelevant." VERIFIED status stays. |
| 624 | REWORD | "which is the brief's question 2 answered" | Delete the clause; the sentence before it already states the result. |
| 628-637 | REWORD | Reading 6 "**REFUTED, in part.** TODO 00 attributes the drift partly to the mixing of the s = 2.6 and s = 3.0 families." | REFUTED status is current and stays. Body: "**REFUTED.** Mixing the s = 2.6 and s = 3.0 families is not the source of the drift. Separating them is correct for VALIDITY, since … but reading 5 shows θ is nearly insensitive to s." Drop the attribution to TODO 00. |
| 692-694 | DELETE OUTRIGHT | Reading 13 "**CORRECTION to TODO 00's costing.** z = 59 is about 5 hours, not 1 to 2; z = 71 is 36 hours, not \"several\"." | Already recorded at `research/history/CHANGELOG.md:276-277` verbatim ("Cost estimates corrected: z = 59 is about 5 hours, not 1 to 2; z = 71 is 36 hours, not 'several'"), and TODO.md:71-72 already carries the corrected figures. Body keeps only the forward-looking half: "The upper ladder is 3× to 10× more expensive than the divisor-pair count suggests at first, and by reading 9 it would not separate the hypotheses anyway." |
| 710-724 | MIGRATE (mostly DELETE) | §9's "**CORRECTION TO TODO 00's COSTING.** TODO 00 quotes \"z = 59 is 1 to 2 h, z = 71 several hours, z = 100 is days\"." plus the closing "not 1 to 2 … not 'several hours' … 3x to 10x more expensive than TODO 00 assumed" | Superseded estimate already in the changelog (see above). Body keeps the *measured cost table* (lines 713-720), which is current and reproducible data, under a plain heading: "**Cost.**" followed by the table and "Given §6, none of it is worth buying: …". Delete every comparison against the retired estimate. |

**Line accounting for this file:** ~22 lines leave (the two costing-correction blocks
minus the retained table, plus the §6 brief-expectation paragraph); the remaining ~16
items are single-sentence rewords that shorten the file by roughly another 10 lines.
Confidence high on every row; the mathematics is untouched throughout.

### research/U-FRAME.md (967 lines) — §5a and §10

**Before anything is renumbered, read this.** Deleting or renumbering §10 breaks nine
inbound cross-references from six files, and two of them are load-bearing:
`TODO.md:103` ("the exact copy theorem for the whole maxsum family (U-FRAME §10,
VERIFIED 40/40 …)"), `research/gate-multiplies.md:436` ("§1. The exact copy theorem for
the whole maxsum family (U-FRAME section 10)"), `research/ATTACKS3.md:121` ("Landed: win
condition NOT met (U-FRAME §10)"), plus §11 cited from `gate-multiplies.md:445`,
`localized-04-maxsum.md:291` and `:305`, §12 from `ATTACKS3.md:239`, §15 from
`ATTACKS3.md:84`. Every §10 item below names its destination section so those references
can be repointed in the same edit. **Do not renumber §§11-15 as part of the §10 split**;
leave the numbering gap or do the renumber as a separate, mechanical, all-files pass.

#### §5a header note, line 240-242

Class: MIGRATE. Text: "*(2026-08-16, from Chris's proposal to attack the multiplier
through the copy structure. This is the session's main result and every step below is
either proven or verified; the final extrapolation is flagged as such.)*"
Body: "*(From Chris's proposal to attack the multiplier through the copy structure. Every
step below is proven or verified; the final extrapolation is flagged as such.)*"
Changelog: §5a was produced on 2026-08-16 as that session's main result. Confidence high.

#### §5a Step 3's inline dated block, lines 275-292 (18 lines)

Class: MIGRATE (reword only — **no content leaves**). This is the shepherd's item-3 entry
and he is right that it is a reword, but the block is 18 lines, not a phrase, so here is
the whole disposition. Offending framing: "**EXTENDED to folds 31 and 37, and A10 answered
NEGATIVELY (2026-08-16, `research/a3-10-lower-tightness.js`).**"
Body replaces that sentence with: "**Both bounds hold at all 329 (tile, prime) cells
tested, out to fold 37** (`research/a3-10-lower-tightness.js`). **The lower bound does not
become exact with depth**, so the recursion is not determined by maxsum₂: it is exact at 3
of 9 ladder folds and the excess runs 6, 0, 0, 12, 0, 18, 24, 18, 120 at folds 7 to 37."
Everything from "Two mechanisms break it" (280) to the end of the block is current
mathematics and stays verbatim.
Changelog: Step 3 was verified to fold 29 when written and extended to folds 31 and 37 on
2026-08-16; attack A10's question, whether the lower bound becomes exact with depth, is
answered NEGATIVELY. Confidence high.

#### §5a Step 4, line 304 and line 314

Class: REWORD ×2, one line each.
- 304: "The reason is the one §5 already recorded and this step ignored:" → "The reason is
  the one §5 records:". ("this step ignored" is a note about our own drafting.)
- 314: "the corrected per-fold budget of §3" → "the per-fold budget of §3". (Same defect as
  gate-multiplies: the budget is no longer "corrected", it is just the budget.)
Confidence high.

#### §10, lines 614-655 (42 lines) — THE SPLIT, item by item

Class: MIGRATE, split seven ways. **The section heading "## 10. Attack A4's corrections to
this note (2026-08-16)" is the only thing that is purely history.** Five of the seven items
below are VERIFIED or REFUTED current mathematics and must land in the body.

| §10 lines | what it is | class | destination in the body |
|---|---|---|---|
| 616-620 | "The family IS closed under folding, but L does not disappear." κ(1) = L, maxsum_m(new) ≤ maxsum_{m+κ(m)}(old), **VERIFIED 40 of 40** over five folds and m ≤ 8 | **STAYS (relocate within file)** | New **§5a Step 3a, "the family is closed and L generalises to κ(m)"**, placed immediately after Step 3's bound. Text as written, minus nothing. This is where a reader asking "what is the current status of the L question" must find it. |
| 622-626 | the exact copy theorem for the whole family, **VERIFIED 40/40**: maxsum_m(new) = max over the p 2-sets {a, a−2} of maxsum_m(old minus those classes); "No straddling window ever beats a single-copy one" | **STAYS (relocate within file)** | Merge into **§5a Step 2**, which currently states the same theorem for G₂ only (line 258-259). Add as "Step 2 extends to the whole family, exactly (VERIFIED 40/40): …". **`TODO.md:103` and `gate-multiplies.md:436` both cite §10 for exactly this**; repoint both to §5a Step 2 in the same edit. |
| 628-630 | the chaining lower recursion, **VERIFIED 40/40**: maxsum_{m+1}(old) ≤ maxsum_m(new), ratios 1.000-1.354, G₂(T₂₃) = 204 ≥ maxsum₂(T₁₉) = 186 ≥ … ≥ maxsum₆(T₇) = 108, one index per fold | **STAYS (relocate within file)** | New **§5a Step 5a**, beside Step 5 which owns the lower bound's decay. Text verbatim. |
| 632-638 | "**Refuted, and left visible.**" κ(m) ≤ L refuted at every fold m = 4..6; κ(m) ≤ L+2 for all m ≤ 8; the L-free form dies at m = 10; maxsum_m/m not monotone but subadditive so Fekete gives convergence | **CURRENT NEGATIVE KEEP**, reword the label | Same destination as 616-620 (§5a Step 3a). Label becomes "**Refuted.**" — "and left visible" is a note about our own editorial policy, which the convention now handles globally via the README. Every refutation and every number stays. |
| 640-644 | "**§5a step 3's upper bound is LOOSE.**" j\*(1) = 1, 2, 1, 2, 2 against L = 2, 2, 2, 3, 2; fold 31 j\* = 2 vs L = 4; "**A proof aimed at L is aiming past the target.**" maxsum_{m+4} covers every measured case; equality at maxsum_{m+j\*} in 20 of 40 | **STAYS, and MUST MOVE — this is the fix for the shepherd's item-1 contradiction** | Into **§5a Step 3 itself**, immediately after the bound at line 268, before the verification paragraph. A reader who stops at Step 3 currently takes away "bound L", which the file contradicts 375 lines later. Body text: "**The upper bound is LOOSE, and a proof aimed at L is aiming past the target.** The sharp shift j\*(1) measures 1, 2, 1, 2, 2 against L = 2, 2, 2, 3, 2, strictly below L at three of five folds, and at fold 31 j\*(1) = 2 while L = 4. Empirically maxsum_m(new) ≤ maxsum_{m+4}(old) covers every measured case with no L at all, and equality with maxsum_{m+j\*} occurs in 20 of 40 cases." |
| 646-648 | "**§5a step 4's slope was not 1 either.**" ρ = (maxsum_j − G₂)/((j−1)·m̄) ≈ 1.3 at T₁₁, ≈ 1.7 at T₂₃, rising | **STAYS, reword** | Into **§5a Step 4**, appended after line 307. Body: "The coefficient fails too: the slope ρ = (maxsum_j − G₂)/((j−1)·m̄) measures about 1.3 at T₁₁ and about 1.7 at T₂₃, rising with level, so the additive form is wrong in its constant as well as in its tail draw." Changelog: step 4 was written with an implicit slope of 1. **See Unresolved U2 — this number disagrees with gate-multiplies §8's range for the same quantity.** |
| 650-655 | "**Net.** A4's win condition is not met: the L dependence cannot be removed, it generalises to κ(m). What it buys is …" | **MIGRATE, split** | The win-condition verdict goes to the changelog (and is already stated in `ATTACKS3.md:121`, "Landed: win condition NOT met"). The strategic content goes to **§9 Honest status**, as: "**The L dependence cannot be removed; it generalises to κ(m).** What that buys is the exact statement of what must be bounded — κ(m), the maximum kill count in a window, which has far better tail structure than a longest run — an exact lower recursion for the whole family, and the measurement that the upper bound is not tight, so an attack should target κ(m) and can spend the roughly L + 2 headroom." |

**Net for §10: the heading plus roughly 6 lines of connective process text leave the body;
36 of the 42 lines stay, relocated into the four §5a steps and §9 that own the objects.**
Confidence high on every destination; confidence medium only on whether Step 3a should be
a new step or folded into Step 3, which is a presentation choice for the applier.

### research/gate-multiplies.md (521 lines)

**File-level diagnosis.** This document is organised as a verdict on TODO item 0b as
that item *used to be written*. TODO.md:75-101 has since been rewritten to the corrected
form (it now states `ln c(p) <= 2 ln p / p` and "not 2 ln²p/p, which busts the budget by
a factor ln u / 2", plus the L ≤ 0.19–0.31·p/ln p surviving form and the 0.58 ln p gap).
So every "TODO 0b states X, and X is wrong" passage here now misdescribes the file it
cites. **This is a live staleness defect, not merely a migration**: a reader checking
gate-multiplies §7 against TODO 0b finds the quoted premise absent.

| line(s) | section | class | offending text (minimal) | disposition |
|---|---|---|---|---|
| 279 | §7 heading | MIGRATE (reword) | "## 7. TODO 0b, and why it is wrong by a factor of ln u" | Body: "## 7. The required rate is `2 ln p / p`, and why `2 ln²u/u` busts the budget by `ln u`". Changelog: TODO 0b as originally stated gave the rate as `ln c ≲ 2 ln²u/u` and claimed "bounding c at the required rate IS the Zone Postulate"; RETIRED, the partial-sum differentiation gives `2 ln p / p` and the ln²-rate overspends by `ln x / 2`, certifying a bound that diverges like `x^{ln x − 2}`. |
| 281-284 | §7 | MIGRATE | "TODO 0b states the programme as `G2(u) <= 12 * c^{pi(u)} < u^2`, hence `ln c <~ 2 ln^2 u / u`, and says \"bounding c at the required rate IS the Zone Postulate, hence TPC\"." | Body opens instead on the fact: "The telescoped programme is `G2(u) <= 12·∏_{p<=u} c(p) < u^2`. Read as a **uniform** constant c the algebra is correct but the item is vacuous, because the permitted rate tends to 0 and only c = 1 is admissible. Read as a per-level rate, the telescope gives `12·∏ c(p)`, not `12·c(x)^{π(x)}`." Everything from "**Read as a uniform constant**" (286) onward, including the VERIFIED table at 292-300 and the `ln x / 2` mechanism, is current and stays untouched. |
| 316 | §7 | MIGRATE (reword) | "> **The corrected item (PROVEN).** Differentiating the partial-sum condition…" | Body: "> **The required rate (PROVEN).** Differentiating…". The PROVEN status and all numbers stay. |
| 334-336 | §7 | CURRENT NEGATIVE KEEP | "The row above it is the same data against the correct budget: **the true multiplier uses 77 to 214 percent of its budget and it is not trending down.**" | No action. "correct budget" is a mathematical contrast between two budgets, not a history note, and the sentence is the file's central result. **But see the orphaned-claim list**: the U-FRAME §§4/6a claim it contradicts must be checked. |
| 357 | §8 heading | MIGRATE (reword) | "## 8. What the corrected item actually needs, priced" | Body: "## 8. What the surviving form needs, priced". (Shepherd's item-3 list has this as reword-only; agreed, and the replacement text is given here.) |
| 376 | §8 | MIGRATE (reword) | "> laws).** TODO 0b in its corrected form goes through iff" | Body: "the surviving form goes through iff". |
| 451-459 | §9 item 3 | MIGRATE | "**3. TODO 0b, in corrected form only.** Retire the stated inequality. The item that replaces it is: > **0b (corrected).** Bound the per-fold multiplier by…" | The retirement has already happened in TODO.md. Body: "**3. The per-fold multiplier bound.** The one surviving form of the L question: bound `ln c(p) <= 2 ln p / p`, with a total lifetime slack of about 0.6 nats. Via 5a step 3 this is exactly `L <= 0.19 to 0.31·p/ln p` on average over the ladder, against A5 Theorem B's proven `L <= 0.18 p`. **The gap is a factor 0.58 ln p, and it is the only gap.**" Changelog already carries the rate retirement (CHANGELOG.md:443 "the ln² rate busts the budget"); add the TODO-0b restatement to the same entry. |
| 461-467 | §9 | REWORD | "Note what that does to 0b's stated win condition. TODO 0b says \"A proof that c decays at ANY rate would be…\"" | The mathematics ("a proof that c decays at any rate is worth nothing here") is current and TODO.md:80-81 already states it ("c decays at any rate is worthless as a win condition"). Body: "**A proof that c decays at any rate is worth nothing here.** It must decay at `2 ln p / p`, and the measured multiplier is already at that rate…". Drop the quotation of the retired win condition. |
| 468-474 | §10 | **DELETE OUTRIGHT** | "## 10. Where the corrections went / Every correction this file's first draft listed has been applied to its owning document (TODO.md 0b, U-FRAME §§4, 6a, 11, 12, a3-09, LOCALIZED-GAP §4) and is logged in `research/history/CHANGELOG.md`, indexed by document. Nothing is pending." | Pure process record with no claim behind it, and it duplicates the standing footer at line 521 plus the CHANGELOG's own index-by-document (CHANGELOG.md:232-247). Section removed entirely; §§11, 12 renumber to 10, 11. Nothing to fix in the body. **7 lines.** Confidence high. |
| 264, 283, 499, 632 | — | KEEP | "with D and G2 both correct" / "The algebra from a **uniform** c is correct" / "it is a correct statement" | Ordinary adjectival use of "correct". No action. |

### research/maier-matrix.md (635 lines)

| line(s) | section | class | offending text (minimal) | disposition |
|---|---|---|---|---|
| 19-20 | §1 | MIGRATE (reword) | "Chris's doubt, recorded before the work: *\"I expect this yields almost-all statements…\"* The doubt is correct, and the situation is worse than almost-all." | Borderline; the quoted doubt is not *our own* correction narrative but an attribution of the framing to Chris, and it earns its tokens by naming who called it. Recommended: keep the quotation, drop "recorded before the work" (that is the process half). Body: "Chris's doubt: *\"I expect this yields almost-all statements and therefore does not reach the origin.\"* The doubt is right, and the situation is worse than almost-all." Confidence medium; if the shepherd wants attributions preserved verbatim, no action. |
| 471 | §7 Q3.1 | REWORD | "The briefing is right that Maier's AP input is expensive" | Body: "Maier's AP input is expensive: for primorial moduli it is Gallagher's…". The rest of the paragraph is current and load-bearing. |
| 503 | §8 heading | MIGRATE (reword) | "## 8. Granville-Soundararajan Corollary 1.4: Chris's correction is right" | Body: "## 8. Granville-Soundararajan Corollary 1.4 is vacuous at every computable scale". The verdict belongs in the heading; who was right about it belongs in the changelog. (Shepherd lists this heading; agreed, replacement supplied.) |
| 518-519 | §8 | MIGRATE | "**Chris has it exactly right and the earlier suggestion is correctly withdrawn. Corollary 1.4 is not an obstruction to anything in this repo.**" | Body keeps the second sentence only: "**Corollary 1.4 is not an obstruction to anything in this repo.**" Changelog: the suggestion that GS Corollary 1.4 is a proven obstruction to the zone programme is WITHDRAWN; η = min(α/3, 1/100) caps at 1/100 for every sequence, forcing u ≥ 50,000 and log x ≥ (5·10⁶)^200. Forced by `maier-matrix.md` §8 against `scratchpad/holt/gs.txt` 313-325. |
| 584-585 | §9 reading 8 | MIGRATE | "Chris's correction stands; the earlier suggestion that it is a proven obstruction is withdrawn and should stay withdrawn." | Body: reading 8 keeps "**VERIFIED from source.** GS Corollary 1.4 has η = min(α/3, 1/100)… It cannot apply at u = 2 or at any computable scale. It is not an obstruction here. Section 8." Same changelog entry as above covers it. |
| 600-624 | §10 | **MIGRATE, whole section (25 lines)** | "## 10. Corrections to the briefing" — three bullets | See the three sub-items below. Section removed; §11 renumbers to §10. |
| 602-609 | §10 b1 | MIGRATE | "The briefing suggested q = x# as \"one natural choice worth examining\"…" | The *mathematical* content (the matrix cannot see the prime count; the row-by-row count of prime slots is crystallization below x′² and the twin prime problem above) is worth keeping and is NOT stated in §2 in that form. Body: add two sentences to §2 where q = x# is chosen — "The slot count is identical in every row; the prime count is not, but the matrix cannot see it, because the set being summed is the slot set. Seeing primes would need the row-by-row count of slots that are prime: free below x′² by crystallization, and the twin prime problem above it." Changelog records that the briefing offered q = x# on the prime-count ground and that the ground is empty as a matrix statement. **Do not simply delete this bullet — one of its two halves is mathematics that exists nowhere else in the file.** |
| 610-620 | §10 b2 | MIGRATE | "The briefing framed the asymmetry as \"Maier has to fight for his AP input, ours is exact and free\"." | Content is already in §7 Q3.1 (lines 469-480), which states the GS GRH→unconditional history and the |ρ−1| point at more length. The one sentence not in §7 is the epigram "His fight with the AP input buys unconditionality; his fight with Buchstab buys the theorem" — worth keeping. Body: append that sentence to §7 Q3.1. Changelog: the briefing's "ours is exact and free" asymmetry is RETIRED as an encouraging reading; the premise is true and the inference is wrong. |
| 621-624 | §10 b3 | **DELETE OUTRIGHT** | "`PRIOR-ART.md`'s Maier-chain entry says our Copying Theorem is the row sum and our window statistics the column sum. It is the other way round… the sentence should be corrected." | **Already applied and already logged.** `PRIOR-ART.md:302-303` now reads "our Copying Theorem, which is a residue statement, is the **column** sum, and our window statistics are the **row** sum", and the change is recorded in full at `CHANGELOG.md:396-400` plus the index at `CHANGELOG.md:241`. The bullet asserts a pending action that no longer exists. Delete; nothing to fix. Confidence high, verified in all three files. |

### research/two-class-lower-bounds.md (709 lines) — §10 "Corrections logged", 633-669 (37 lines)

Class: **MIGRATE, whole section, with one item's mathematics kept.** §11 renumbers to §10.
**Four of its five items quote sister documents that no longer say the quoted thing**
(orphans O6, O7, O8 above), so this section is the single densest concentration of stale
cross-quotation in the corpus.

| item | lines | class | disposition |
|---|---|---|---|
| 1. "Briefing, honest doubt (b)" | 635-638 | MIGRATE, body needs nothing | The content — `G2 >= g` is immediate and elementary — is already §1's headline and is called "the single most useful fact in this note" there. Changelog: the briefing doubted that G₂ (gaps between twin slots) could be compared to g (gaps between rough numbers); RETIRED, the comparison is one line, `G2 ≥ g` pointwise, §1. |
| 2. "Briefing framing" | 639-642 | MIGRATE | Content: "stronger by exactly `log x`, derived three ways (§4b Rankin accounting, §5 measurement, §6 Poisson law)". **Applier must confirm §1 or §4b states the "exactly log x" quantification in the present tense before deleting**; if it does not, that sentence moves to §4b. Changelog: the briefing called the two-class lower bound "stronger" by an unspecified amount; SHARPENED to exactly a factor log x, three independent derivations. |
| 3. covering-dive §Q4.2 | 643-648 | MIGRATE, **content STAYS** | The mathematics is current and lives nowhere else in the file in this form: covered length scales like `c·x ln²x`, not `c·p²/log` and not ZM's `≈ p²/2`; the `≈p²/2` reading was a small-numbers artifact, `h2/p²` falling 0.72 → 0.49 across ZM's 21 terms and our certificates continuing to 0.022. Body: move that as a plain paragraph into §5 or §6 where the scaling law is stated — "Covered length scales like `c·x ln²x`. Ziller–Morack's `h2/p² ≈ 1/2` is a small-numbers artifact: the ratio falls from 0.72 to 0.49 across their 21 terms and our certificates continue the fall to 0.022." Drop the quoted dead question (O7). |
| 4. U-FRAME §6a | 649-655 | MIGRATE, **content mostly duplicated** | The frame-mixing resolution is already stated in `U-FRAME.md:487` and in `CHANGELOG.md:222`. The one thing here that exists nowhere else is the certificate-ladder corrected exponent, "about 1.2 for the greedy lower ladder, a different object from `G2` itself (§5)". Body: keep that sentence in §5 beside the ladder. Delete the quotation of U-FRAME's retired wording (O8). |
| 5. ZONE-POSTULATE §5 | 656-669 | **CURRENT NEGATIVE KEEP, relocate** | This is the item to be careful with: after the dead quotation (O6) is stripped, what remains is a live and important *direction-of-inference* warning — "The certificate is a lower bound on `G2`, so `x²/certificate` is an *upper* bound on `x²/G2`, and its growth does not by itself prove `x²/G2` grows" — plus the two number series. `ZONE-POSTULATE.md:150-152` cites exactly this passage ("`research/two-class-lower-bounds.md` §10") for the climbing ladder, so **deleting §10 outright would break an inbound citation from ZONE-POSTULATE**. Body: move the whole item, minus its first clause, into §5 as "**The certificate ladder, and how far it can be pushed**", and repoint `ZONE-POSTULATE.md:150` to the new section. |

**Applier warning for this file:** `ZONE-POSTULATE.md:150` and `research/G2-STATE.md` both
cite "§10" of this file. Fix the citations in the same edit as the renumber.
Confidence high on all five; medium only on where item 3's paragraph best lands.

### research/origin-excess.md (784 lines) — §9 "Corrections to the record", 657-692 (35 lines)

Class: **MIGRATE, whole section, with two items' mathematics kept.** §§10, 11 renumber.
Six bullets. Two of them are spent instructions to ourselves (O10) and one quotes a dead
phrase (O9).

| bullet | lines | class | disposition |
|---|---|---|---|
| "The Origin Excess Lemma carries three hypotheses, not one" | 659-667 | **DELETE OUTRIGHT** | Wholly duplicated by this same file's §6, which is titled for the three hypotheses and derives each; and by `maier-matrix.md:243-249` for the 2.2 cap. Its last two sentences are pure process ("The lemma's arithmetic is correct as far as it goes; the calibration around it was not"; "`maier-matrix.md` §4 and its reading 3 **now** state the capped form"). Nothing to fix in the body — §6 already says it. **Note the interaction with the shepherd's item 3c:** the canonical enumeration he wants settled should be settled in `maier-matrix.md` §4, and this bullet's deletion is part of that same edit. |
| "The disjointness of the two regimes owes nothing to the matrix" | 668-672 | **CURRENT KEEP, relocate** | Current mathematics (y′² < x′² is a one-line consequence of y′ ≤ x < x′; the regimes touch at y = x, which is the fold, closed by A6). **This is the passage `maier-matrix.md:282` is trying to cite when it cites the non-existent §6c** (shepherd item 6). Body: move it into §6 as an explicit sub-item, then repoint `maier-matrix.md:282` at it. This resolves the shepherd's open question of whether §6 or §7 is the right target: **neither as they stand — §9's bullet is the actual statement, and it must be moved into §6 first.** Confidence high; this is a correction to the shepherd's item 6. |
| "Above y′² the origin's advantage is not merely gone, it is negative" | 673-677 | **CURRENT NEGATIVE KEEP, relocate** | Current measurement (trough 0.9343 at S ≈ 3.5 y′², loss to 125% of fair share at v = 8, mechanism is FOLD-PROFILE §5's shoulder). Move to §7 or wherever the above-y′² regime is described; verify it is not already there before moving. |
| "\"The measured factor (ln x/ln y)² is small\" is the weak form" | 678-680 | MIGRATE | This corrects our own earlier phrasing. The surviving fact — the factor is *bounded*, by an absolute constant, and the bound does not improve with scale — is already in §6 and in `maier-matrix.md:249`. Changelog: "the measured factor is small" RETIRED as the weak form; it is bounded by an absolute constant ≈ 2.2, which is stronger and does not improve with scale. |
| "`FOLD-PROFILE.md` §9's trough constant … is the same number as the origin's ceiling" | 680-686 | MIGRATE, **content STAYS** | The identification (both are ρ(2), reached from two directions; also the conjectured limit of β in GLOSSARY) is real mathematics and belongs in the body. The instruction "**Worth cross-referencing in all three**" is spent — `FOLD-PROFILE.md:300` and `GLOSSARY.md:208` already carry it (O10). Body: keep one sentence where the ceiling is stated — "The origin's ceiling at the zone width and `FOLD-PROFILE.md` §9's trough constant e^{2γ}/4 = 0.7931 are the same quantity, ρ(2), reached from two directions; it is also the conjectured limit of β (`GLOSSARY.md`)." Drop the instruction. |
| "`ZONE-POSTULATE.md` §6 route B says … \"not yet aimed here\"" | 687-691 | MIGRATE | Dead quotation (O9). The surviving fact is worth keeping: "Three pieces of the origin's proven structure are aimed at route B and all three miss, for the three distinct reasons in §7. Route B's non-fold half is narrower than it looks." Body: put that in §7's summary. Changelog records the retired ZONE-POSTULATE wording. |

Confidence high throughout; the two "relocate" bullets need a read of §§6-7 before the
move, to avoid creating the duplication the migration is meant to remove.

### research/maxgap-law.md (594 lines)

**File-level diagnosis: the second brief-response document.** Same disease as theta-ladder,
milder. "The briefing" is the grammatical subject at lines 24, 26, 97, 111, 117-118, 393,
and the header itself announces the file as a corrector ("this note reconciles them and
corrects three things"). The mathematics — including every REFUTED reading, which the
shepherd correctly protects — is current.

| line(s) | section | class | offending text (minimal) | disposition |
|---|---|---|---|---|
| 2-7 | header | MIGRATE (reword) | "*(2026-08-17 night. Engine … Read `localized-04-maxsum.md` §4 and `two-class-lower-bounds.md` §6 first; this note reconciles them and **corrects three things**.)*" | Body: "*(Engine `research/maxgap-law.js`, 21 s plain and 147 s with `--big`. Calibration marked throughout … Read `research/localized-04-maxsum.md` §4 and `research/two-class-lower-bounds.md` §6 first; this note reconciles them.)*" Date to the changelog. |
| 24, 26 | §0 | REWORD | "over a lever 41 times longer than the briefing assumed … So the tension in the briefing is real, sharper than stated" | Body: "over a lever 41 times long … So the tension is real, sharper than it looks, and resolved only by an argument that finite data cannot reach." |
| 95, 97-98 | §3 | MIGRATE | Heading "READING 1 (MEASURED). The tightness dispute is a units error" + "The briefing reads: *\"Agent A reports c spanning [0.736, 1.170] … Agent B reports c flat to 7 percent.\"*" | **The comparison table (105-108) and the conclusion are current mathematics and stay**: two different statistics, same size once matched, and "neither number should be quoted without saying which statistic it is". Body: heading becomes "READING 1 (MEASURED). The apparent tightness dispute is a units error", and the quotation of the briefing becomes "Two numbers are in circulation for the same spread: `c` spanning [0.736, 1.170] (±23%) and `c` flat to 7%." Changelog: the two-agent tightness disagreement was a units error, a range against a coefficient of variation; there was never a disagreement to reconcile. |
| 111 | §3 | REWORD | "not by the factor of three the briefing's \"23 percent against 7 percent\" implies" | Body: "not by the factor of three that \"23 percent against 7 percent\" implies". |
| 117-123 | §3 | MIGRATE | "**Correction to the briefing, and to both files.** The one-class lever is much longer than assumed. The briefing says *\"a range where ln D moves by a factor of a few is very weak evidence of flatness\"*." | Body states the fact: "**The one-class lever is long.** On the 58 exact terms `lnD = theta(p) − ln m1` runs 6.17 at p = 11 to 252.12 at p = 271, a factor 41, and `c1` moves by 22% over the whole of it. That is not weak evidence; it is the strongest single fact in this note and it is what makes §5 uncomfortable." Changelog: the briefing's "a factor of a few in ln D is very weak evidence of flatness" RETIRED; the measured lever is a factor 41. |
| 393-394 | §7 | REWORD | "**The briefing's doubt on this point is correct and is now confirmed against the source.**" | Body: "**Confirmed against the source.**" The confirmation is the content; whose doubt it was is not. |
| 516-542 | §10 | **MIGRATE, mostly DELETE — and three live orphans (O11)** | "## 10. What this note owes other files … the rest are outstanding against files this note does not own." Items 1, 2, 3 are debts that have all since been paid. | Items 1-3 → changelog (see O11); item 4 → **STAYS**, relocated into §7 where Maier-Pomerance is discussed, because it is a durable source check explicitly written "so nobody re-checks it" and it is the only place in the corpus that pins FGKMT eq. 1.2, Ford's slides and the proven bound side by side. Section 10 then disappears; §§11, 12 renumber. **27 lines out, ~9 of them relocated.** |
| 231, 461 | §4c, §8 | CURRENT NEGATIVE KEEP | "READING 3 (REFUTED)…", "READING 7 (REFUTED)…" | No action. Confirms the shepherd's protect-list. |
| 493-513 | §9 | CURRENT KEEP | "Which repo extrapolations inherit the error" — the SAFE/REFUTED/UNAFFECTED verdict table | No action. This is a live scoping table for other files' claims, not a record of our learning. It reads as history-adjacent and it is not. Flagged so the next pass does not churn it. |

### research/level-ledger-tight.md (431 lines)

| line(s) | section | class | offending text (minimal) | disposition |
|---|---|---|---|---|
| 29 | §1 heading | MIGRATE (reword) | "## 1. Custody, and one correction" | Body: "## 1. Custody". (Shepherd lists this; replacement supplied.) The custody table itself is current and stays. |
| 47-67 | §1 | **MIGRATE, whole block (21 lines) — and it is a live falsehood (O12)** | "**Corrections to the record** (for the parent to apply; nothing was edited):" followed by three numbered items | See O12. All three have been applied. **Item 2's max-over-p table (55-61) must be checked before deletion**: FOLD-PROFILE.md:113-114 carries the three values 2.87, 5.97, 12.03 but **not** the "at p" column (47, 149, 37) or the search ranges (≤5000, ≤5000, ≤2000). If the applier wants those kept, they move into FOLD-PROFILE §3; otherwise the block goes to the changelog entry in full. Body after: nothing — §1 is custody, and the custody table above stands on its own. |
| 190 | §5 | REWORD | "**(a) Second moment plus extreme value, the briefing's suggested route.**" | Body: "**(a) Second moment plus extreme value.**" |
| 397 | §9 | REWORD | "The best deliverable is a **constant** 81.0. The briefing asked for a growing …" | Body: "The best deliverable is a **constant** 81.0, where a growing bound was wanted." Or state the fact and drop the ask entirely; the applier should read the paragraph. Confidence medium — needs the surrounding sentence. |

### research/exponent-control.md (284 lines)

Four one-line rewords. **"control-corrected" and "proportional-bias correction" are
technical terms for a statistical bias correction, not history vocabulary — do not touch
them anywhere in this file, in `G2-STATE.md`, or in `sift-limit-attack.md`.** That is 12 of
the 16 grep hits in this file and 5 of the 12 in G2-STATE.

| line | class | offending text | disposition |
|---|---|---|---|
| 31 | REWORD | "and so do the briefing's three pilot numbers 1.191, 1.282, 1.801" | "and so do the three pilot numbers on record, 1.191, 1.282, 1.801" |
| 50-53 | REWORD | "The briefing's +0.19 is an unlucky-low draw from a distribution centred on +0.26" | "The +0.19 on record is an unlucky-low draw from a distribution centred on +0.26; the window [5, 37] sits near the bottom of it." Both following sentences (the distribution mean at matched width; 1.610 → 1.539) are current and stay. |
| 144 | REWORD | "which is the briefing's doubt (c)" | delete the clause |
| 177 | REWORD | "Chris's ~1.6 survives; the route to it in the briefing does not." | "Chris's ~1.6 survives; the bias-transfer route to it does not." (The route being rejected is a fact; that a briefing proposed it is not.) |
| 206 | REWORD | "Two corrections to how the margin is being read, then the number." | "Two things about how the margin must be read, then the number." |

### research/h2-scoping.md (409 lines)

| line(s) | class | offending text | disposition |
|---|---|---|---|
| 27-29 | **MIGRATE — live orphan (O13)** | "the recommendation in `research/exponent-control.md` §8, that extending h2 past 21 terms is \"the highest-value computation available on this question\", is wrong on both legs. That correction is the main result of this task." | See O13. Body: "**Extending h2 past 21 terms is not available and would not help, and that is the main result here.**" Then the two legs. |
| 209 | REWORD | "The briefing asked whether the same trick prices h2." | "The question is whether the same trick prices h2." |
| 329 | REWORD | "**READING 5 (MEASURED, and it is the answer to the briefing's question 4).**" | "**READING 5 (MEASURED).**" |
| §5 three refuted proxies | CURRENT NEGATIVE KEEP | — | No action; confirms the shepherd's protect-list. |

### research/localized-single-alignment.md (181 lines)

| line(s) | class | offending text | disposition |
|---|---|---|---|
| 91 | REWORD | "The per-fold cost question the brief asked — is the damage countable? — has a clean yes for the CENSUS" | "The per-fold cost question — is the damage countable? — has a clean yes for the CENSUS" |
| 109 | MIGRATE | "So the crude ln³ constant **was my wrong frame**, the surface law is intact" | Body: "So the crude ln³ constant is the wrong frame; the surface law is intact, and the correct statement stays: …". First person about one's own error is the purest form of what the convention removes. Changelog: P1's registered ln³x constant band was stated in the wrong frame; refuted in that frame, intact in maxgap-law §4's surface frame. (Already partly logged at `CHANGELOG.md:24-26`.) |
| 153 | MIGRATE (reword) | "## 8. Compute, and one correction to the reach estimate" | "## 8. Compute, and the reach" (shepherd lists this; replacement supplied). |
| 157-161 | **CURRENT KEEP, do not touch** | "called \"out of computational reach by four decades\" in LOCALIZED-GAP §3" | This one *looks* like an orphan and is not: `CHANGELOG.md:42-49` records the deliberate decision to leave the LOCALIZED-GAP body unchanged and carry the recontextualisation here instead. Confirmed against both files. Recorded so no future pass "fixes" it. |
| 113 | CURRENT KEEP | "## 6. The mechanism, from the event log" | An event log of *measurements*, not of sessions. No action. |

### Small single-line items, by file

| file:line | class | offending text | replacement |
|---|---|---|---|
| `research/a3-09-histogram-operator.md:78` | REWORD | "This is the brief's skeleton with the multiplicity filled in" | "The multiplicity is exact: of the q copies of a given gap, …" |
| `research/a3-09-histogram-operator.md:167` | REWORD | "priced against the **corrected** budget" | "priced against the sharp budget" (same defect as gate-multiplies and U-FRAME:314; the budget is not "corrected" any more, it is the budget) |
| `research/a3-05-bound-L.md:30` | REWORD | "## 1. Setting, all previously proven" | "## 1. Setting" — the section's own text says what is proven where |
| `research/a3-05-bound-L.md:260` | REWORD | "those are **now** used to the last unit" | drop "now" |
| `research/natal-cap-23-covadj-proof.md:123` | REWORD | "**The brief's** candidate mechanism — \"most lags sweep the generic (p−4)/p classes\" — is correct about the lag-mass" | "The candidate mechanism, that most lags sweep the generic (p−4)/p classes, is correct about the lag-mass …". All numbers and the negative verdict stay. |
| `research/natal-cap-23-covadj-proof.md:164` | REWORD | "## Consequence: **corrected** status of the Fused-Window Calm Lemma" | "## Consequence: the status of the Fused-Window Calm Lemma" (shepherd lists this) |
| `research/OBSERVATIONS.md:253` | REWORD | "— REFUTED **same day**" | "— REFUTED" (shepherd lists this; REFUTED stays) |
| `research/OBSERVATIONS.md:624` | REWORD | "Results **the bench session of 2026-08-15** reached independently, by a different route" | "Results reached independently here, by a different route from the one that first established them." The section's stated reason for existing — "without this list the next session will chase them again" — earns its tokens; only the session stamp goes. |
| `research/OBSERVATIONS.md:655-659` | AMBIGUOUS | "It is not evidence of anything new. The correct reading of **a productive evening that produced no results** is that the framework's easy side is genuinely easy and was already fully worked" | The epistemic point is first-rate and belongs in the corpus; its framing is a session self-assessment. Suggested body: "It is not evidence of anything new. The right reading is that the framework's easy side is genuinely easy and was already fully worked, which is a fact about the corpus rather than about any one session." Confidence medium — see Unresolved U4 on OBSERVATIONS' status generally. |
| `research/discrepancy-two-class.md:243-244` | MIGRATE | "(An earlier 8-draw run to x=19 put the twin set above the whole control range. That was small-sample noise and is corrected here.)" | Delete the parenthesis; §6's refutation two lines above already states the current finding in the present tense. Changelog: an 8-draw run to x = 19 put the twin set above the whole control range and was read as a twin-specific discrepancy law; RETIRED as small-sample noise, refuted by the fuller run in `discrepancy-two-class.md` §6. **Textbook case: nothing in the body needs fixing, because the corrected claim is already stated correctly beside it.** |
| `research/GLOSSARY.md:186-189` | REWORD | "## The anchored layer (adopted 2026-08-15, **after the night run**) / **The campaign of 2026-08-14/15 needed words for** objects that did not exist …" | "## The anchored layer (adopted 2026-08-15)" / "These words describe objects that did not exist when the vocabulary above was fixed." **Adoption dates in the glossary STAY**: `research/README.md:29-31` depends on them ("adopted 2026-08-14; files written earlier use older words, readings stand"). Only the campaign narrative goes. |
| `research/two-moire-argument.md:40` | REWORD | "## The mod-30 refinement and house-blindness (2026-08-14, **later same day**)" | "## The mod-30 refinement and house-blindness" — and see Unresolved U3, since the file's own title carries "(Chris, 2026-08-14)" and attribution dates may be policy. |
| `research/THE-DIALS.md:9` | REWORD | "His call on overlap is CORRECT, **and it retires an old objection**." | "**Dial 1, window width. The zone's redundancy is a feature, not a defect.**" then the existing argument, which is entirely current. |
| `research/THE-LENS.md:123` | REWORD | "Both are **still** correct reformulations." | drop "still" |
| `research/level-ledger-tight.md:190, 397` | REWORD | "the briefing's suggested route", "The briefing asked for a growing …" | in the level-ledger table above |
| `web/bench/README.md:121-123` | MIGRATE | "GLOSSARY.md **still said** the grain census \"awaits a law\", **which was true when written and stale by the time of the grain session**; that line now points at the file that settled it." | Body: "GLOSSARY.md's grain-census entry points at the file that settled the law." Changelog: GLOSSARY's grain census "awaits a law" RETIRED; the law is settled and the entry repointed. |

### research/*.js (129 scripts) — and this corrects an assumption in the brief

**The scripts are the one place in the corpus where a correction block must NOT be
migrated, and treating them like the .md files would destroy the corpus's safety net.**
A script is a dated artifact carrying its own printed output. A header warning that the
output below is wrong is not the narrative of our learning; it is the current status of that
artifact, and it is the only thing standing between a reader and a superseded number they
can run and see. Protect all of these:
- `research/attack-04-fourier-budget.js:4` "⚠ CORRECTION (2026-08-14, natal-cap-02): the local factor below indexes at …"
- `research/attack-10-anchored-origin.js:60` "*** CORRECTION (see anchored-windows.md): the original reading here …"
- `research/natal-cap-07-trajectory.js:6` "CORRECTED: the ensemble variance used here was superseded by the exact …"
- `research/natal-cap-06-bonferroni.js:8` "… are SUPERSEDED. Two later results: …"
- `research/natal-cap-02-fourier-budget.js:18` "NOTE — CORRECTION TO attack-04-fourier-budget.js …"
- `research/a3-07-pane-overlap.js:723` "CORRECTION OF RECORD: the corridor constant is 5*C2 = 3.301/ln^2 n, not …"
- `research/killrun.js:1-7` the REFUTED-and-corrected header (but see below)

**`research/audit-numbers.js` is a regression test against retired numbers and must keep
them.** Line 63 checks "e^{2g}/(4 C2) [ **the retired factor-2-slipped value** ]" and line
348 prints "**retired bands for contrast**: 530-640 → c2' in [0.497,0.601]; 'about 660' →
c2' = 0.619". Those retired numbers are the assertion's subject. Deleting them removes the
guard that stops the numbers coming back. **Protect; and this is the artifact that makes
several of the changelog's retirements enforceable rather than aspirational.**

Two script-level items that *are* the disease:

| file:line | class | disposition |
|---|---|---|
| `research/killrun.js:7` | **MIGRATE — live orphan (O14)** | "U-FRAME 5's L column and step 6's diagonal both **need that correction**." They no longer do: `U-FRAME.md:330-331` carries the corrected column, "L = 1, 2, 2, 2, 3, 2, 4, 4 at folds 11 to 37", with the step back to 2 at fold 29 that the correction produced. Replace with "U-FRAME §5's L column and step 6's diagonal carry the corrected values." **Lines 1-6, the REFUTED warning, stay.** Confidence high. This one matters: the changelog records that `killrun.js` overcounting L was "found independently five times" (`CHANGELOG.md:187`), so this header is a high-traffic hazard sign and must stay accurate. |
| `research/exponent-control.js:20, 102, 293, 533, 544`; `research/maxgap-law.js:17, 514`; `research/level-ledger-tight.js:805` | AMBIGUOUS | "the briefing" inside script READINGS blocks, matching their .md counterparts. These are hand-written comment blocks, not program output, so they *can* be edited — but they are the recorded reading of a dated run, and the .md is the working document. See Unresolved U5. |

### paper/ (7 files) — out of scope, with one exception, and a reason

**Recommendation: exempt `paper/` from this convention, explicitly and in writing.** Papers
are deliverables under a different discipline, in which "an earlier reading of ours was
wrong, and here is the corrected one" is a scholarly virtue rather than clutter, and the
suite has already committed to it: `paper/staircase-note.md:536` states in the AI-disclosure
that "all refuted intermediate claims" live in the repository, and
`paper/moire-primes.md:504` announces that "the campaign's refutations, including four
reversals of our own earlier readings, **stay visible**". `paper/moire-primes.md:592-599`
("We reversed ourselves twice on this face and both reversals stand in the record") is the
strongest single passage of intellectual honesty in the corpus. Migrating it would be a
straight loss. Applies equally to `anchored-note.md:221-222`, `:514-517`,
`staircase-note.md:477-482`, `beta2-note.md`, `variance-note.md:207`.

The one exception worth checking, and it is a paper-versus-artifact discrepancy rather
than a migration: **`paper/staircase-note.md:490-494`** states "the source script's READINGS
§6 states 'exact < RS < PNT at all four levels'; its own OUTPUT refutes the second
inequality at @19 (854 132 > 835 838). Corrected in §6 above." The paper is correct and the
script's READINGS block is, by this account, still wrong. **Someone should confirm whether
`research/natal-cap-08-staircase.js`'s READINGS still carries the false chain**; if it does,
that is a live error in an artifact, not history. Confidence medium — not verified this
pass, and flagged as U6 rather than asserted.

---

## Size table

Reported as evidence, not as the win. Chris's rule governs: a passage earns its tokens if a
reader gains something. **About a third of what the greps flag stays exactly where it is**,
and roughly a quarter of what leaves the *sections* comes back into the body somewhere else,
which is the whole point of the split-item discipline.

| file | lines flagged | net lines leaving the body | of which relocated within the file / to a sister file |
|---|---|---|---|
| `research/U-FRAME.md` | 61 | **~9** | 36 (§10 → §5a Steps 2/3/3a/5a and §9) |
| `research/two-class-lower-bounds.md` | 37 | **~23** | 14 (→ §§5, 6) |
| `research/origin-excess.md` | 36 | **~22** | 14 (→ §§6, 7) |
| `research/maier-matrix.md` | 29 | **~23** | 4 (→ §§2, 7) |
| `research/maxgap-law.md` | 33 | **~24** | 9 (§10 item 4 → §7) |
| `research/theta-ladder.md` | 38 | **~25** | 8 (the measured cost table stays in §9) |
| `research/level-ledger-tight.md` | 25 | **~22** | 0-4 (item 2's "at p" column, optional, → FOLD-PROFILE §3) |
| `research/gate-multiplies.md` | 22 | **~15** | 0 |
| `research/exponent-control.md` | 5 | ~3 | 0 |
| `research/h2-scoping.md` | 4 | ~3 | 0 |
| `research/localized-single-alignment.md` | 5 | ~3 | 0 |
| `research/discrepancy-two-class.md` | 2 | 2 | 0 |
| `research/OBSERVATIONS.md` | 4 | ~2 | 0 |
| `web/bench/README.md` | 3 | ~2 | 0 |
| 8 files × 1-line rewords (`a3-09` ×2, `a3-05` ×2, `natal-cap-23` ×2, `GLOSSARY`, `two-moire-argument`, `THE-DIALS`, `THE-LENS`) | 11 | ~5 | 0 |
| `research/killrun.js`, `research/natal-cap-08-staircase.js` | 2 | 0 (both are amendments in place) | — |
| **total** | **317** | **≈ 183** | **≈ 89 relocated rather than lost** |

Against the shepherd's figure: his five corrections sections total 147 lines and I confirm
all five line ranges. This pass adds four more sections of the same kind (maxgap-law §10 at
27 lines, level-ledger-tight's parent-handoff block at 21, theta-ladder's two costing blocks
at 17, gate-multiplies §7/§9's retired-TODO framing at ~14), plus about 40 single-line
rewords across 20 files.

**The number that matters is not 183.** It is 15 orphaned claims, of which 14 are stale
cross-references to sister documents that were correctly fixed while the note about fixing
them stayed behind, and one (O15) is an artifact whose reading contradicts its own output.

## Unresolved / needs a decision

**U1. Should `ATTACKS3.md`'s Q / First move / Win triplets be compressed now that all ten
have landed?** Each attack carries four blocks: the question, the concrete first move, what a
win would have bought, and where it landed. The "Win:" line is a pre-registration, and
pre-registration is a large part of why this corpus is trustworthy — but once an attack has
landed, "Win: any proven upper bound on L, at any rate, closes the hole in U-FRAME §5a"
(A5) is a statement about what we hoped, not about what is. Against that, the "First move"
lines are the record of what was actually tried, which is what stops a retry. My reading:
**keep First move, keep Landed, and consider folding Win into Landed** where the verdict
already implies it. That is a judgement about the corpus's honesty apparatus, not a cleanup,
so I am not deciding it. Worth roughly 25 lines across the file.

**U2. Two files give different ranges for the same ρ.** `U-FRAME.md:646-647` has
"(maxsum_j − G₂)/((j−1)·m̄) measures about 1.3 at T₁₁ and about 1.7 at T₂₃";
`gate-multiplies.md:359-360` has "`rho = (maxsum_m - G2)/((m-1)*mbar)`, MEASURED at 1.0 to
1.9 across T_11 to T_23 and rising with level". Same formula, same tile range, different
numbers. Most likely gate-multiplies quotes the per-cell extremes over all m while U-FRAME
quotes the endpoints of the trend, in which case both are right and one of them should say
which statistic it is — which is exactly `maxgap-law.md` §3's own lesson about ranges versus
coefficients of variation. **Needs the underlying artifact checked; do not merge the two
sentences until someone has.** If they genuinely disagree it is a numbers defect, not a
migration one, and belongs to the numbers verifier.

**U3. Is attribution-with-date policy, or is it history?** Several titles and headings carry
"(Chris, 2026-08-14)" — `research/two-moire-argument.md:1`, `research/THE-LENS.md:62` ("The
misalignment principle (Chris, 2026-08-16)"), `research/GLOSSARY.md`'s adoption dates,
`paper/PAPERS.md:171` ("Style (Chris, 2026-08-14)"). Attribution to Chris is substantive and
must stay. **The dates are the question.** In GLOSSARY they earn their keep, because
`research/README.md:29-31` explicitly relies on adoption dates to tell readers that older
files use older words. Elsewhere they may be pure stamp. I recommend: keep dates where a
reader uses them to date *other* documents (GLOSSARY), drop them where they only date the
idea (two-moire-argument, THE-LENS §3). One-line decision, applies to about six sites.

**U4. `research/OBSERVATIONS.md`'s status.** It is 688 lines, third-largest in the corpus,
and it is explicitly a *pre*-research notebook: "an item here is a sighting, not a plan".
Its house rules pre-date the convention and agree with it. Nothing in it needs migration
beyond two rewords. **But nobody has asked whether a sightings notebook belongs in the
reading path at all**, and it is not in this pass's remit to decide. Flagging because it is
the largest single block of tokens whose necessity has not been examined by any wave-1 agent.

**U5. May the READINGS blocks of `research/*.js` be edited for framing?** They carry "the
briefing" in `exponent-control.js` (5 sites), `maxgap-law.js` (2) and
`level-ledger-tight.js` (1), matching their .md counterparts. They are hand-written comments,
not program output, so editing them changes no result — but they are the recorded reading of
a dated run and the corpus treats scripts as artifacts. My recommendation: **leave them.** The
.md is the working document and the one a reader loads; the script's reading is its own
provenance. But if the .md rewords land and the scripts do not, the pair will read as
disagreeing, so this needs a stated policy either way. O14 and O15 are different — those are
factual errors in headers, and they should be fixed regardless of the policy chosen here.

**U6. Confirm `paper/` is exempt.** I recommend exempting it in writing, with the reasoning
in the paper/ section above. If the shepherd disagrees, roughly 30 lines across five paper
files come into scope, and `paper/moire-primes.md:592-599` would be the first casualty.
I would argue hard against that one.

**U7. Renumbering discipline.** Four files lose a whole numbered section under this report
(`U-FRAME` §10, `gate-multiplies` §10, `maier-matrix` §10, `two-class-lower-bounds` §10,
`origin-excess` §9, `maxgap-law` §10 — six, in fact), and nine inbound cross-references
point at sections at or after those numbers. **Either leave numbering gaps, or do one
mechanical all-files renumber pass afterwards, but do not renumber file by file as the
migrations land** — that is how the next generation of stale cross-references gets created,
and this report is fifteen counts of evidence for how easily it happens.

---

*Wave 1 diagnosis. Nothing here has been applied to any body file. Findings that conflict
with other wave-1 reports are adjudicated in `qc-CAMPAIGN.md` before wave 2 applies
anything.*
