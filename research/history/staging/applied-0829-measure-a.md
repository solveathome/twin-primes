# Red team A's corrections applied to the three held measurement notes of 2026-08-29

<!-- ledger
id: Q-applied-0829-measure-a
status: ANSWERED
todo: none
question: Were red team A's corrections applied to the notes it reviewed?
verdict: Of the nine APPLY items in redteam-0829-measure-a.md §3a-3c, seven were applied here as exact string edits, two (E1 and E5) were verified as already applied by the producing agent with a producer fix and a forced re-embed, one clause of E1's proposed wording is left unapplied and is recorded as owed, and the four live-document items of §3d plus the QUESTIONS.md regeneration are left for the orchestrator; node research/qc.js returns TOTAL 0 across all thirteen checks after the edits.
-->

*(2026-08-29. Staging note, HELD under the publication moratorium. Application
record only: no new measurement, no producer touched, no re-run, and no git
command run. The three edited files are `measure-g2z2-0829.md`,
`measure-g2-provenance-0829.md` and `measure-g2-generic-0829.md`, all in this
directory. Source of every edit:
[redteam-0829-measure-a.md](redteam-0829-measure-a.md) §3.)*

## 0. Counts

Nine APPLY items in §3a to §3c. **Seven applied here.** **Two
(E1, E5) were already applied by the producing agent** and are verified below,
not re-applied. **One residual is owed**, a clause of E1's proposed replacement
text that the producer's own wording did not carry, and it sits inside the
paragraph this agent was instructed not to re-edit. **Five items are left for the
orchestrator**: the four live-document items of §3d, quoted verbatim in §2, and
the QUESTIONS.md regeneration the review raises at its §2d and §5 M6.

No item required a code change or a re-embed. The one that did, E1, had its code
change and its forced re-embed done by the producing agent before this record
began.

**What is weak here first.** This record certifies that strings were replaced,
nothing more. Every figure carried into the notes by these edits is the red
team's own recomputation, taken on trust from `redteam-0829-measure-a.md`; none
was re-derived here, and E7 in particular imports five statistics
(0.4653, 0.0196, 0.5118, 0.0159, 0.0290) whose only witness in the corpus is
that review. The one figure this agent checked independently is E2's elapsed
time, which had to be changed away from the string the review proposed.

## 1. Item by item

| id | target | status | reason |
|---|---|---|---|
| E1 | `measure-g2z2-0829.md`:292-301 (§4 M2), :8 (ledger verdict), :13 (§0 fingerprint), :481 (§6 D9) | done-by-producer | §4 M2 now reads **1.518e-1 over p >= 3** with the all-p 4.177e-1 and the p = 2 contribution 2.6586e-1 named beside it; the ledger verdict carries the correction; D9 records it and says the producer now prints the two sums separately and was re-embedded. Verified by reading, not re-applied. |
| E2 | `measure-g2z2-0829.md`:274 | done, string changed | The review's `337.7 s` is stale: the E1 re-embed re-ran the producer, and the bound block now reads `elapsed 320.5 s` in its body and `320.6 s` in its fingerprint (`research/measure-g2z2-0829.js`:585 and :442). The stale `331.2 s` was replaced with **320.5 s**, the body figure, which is the one the review's own rule picks. |
| E3 | `measure-g2z2-0829.md`:219-221 | done | The min and max belonged to the ten-term row only; the sentence read as if all four figures shared one population. Both figures for the fourteen-term row (0.0000 at x = 2, 0.5000 at x = 3) are in §3b's own table. |
| E4 | `measure-g2z2-0829.md`:324-325 and :8 (ledger verdict) | done | The p >= 3 denominator excludes the zone p = 2, so 27,292 becomes 27,291 in those two places. The ledger line was changed because E4 names it explicitly; the verdict's substance is unchanged. The other seven uses of 27,292 count all zones and were left. |
| E5 | `measure-g2z2-0829.md`:481-491 (§6 D9) | done-by-producer | D9 exists and carries E5's content plus more: the producer's label was fixed, so the block and the note no longer disagree, which is the state E5's drafted text anticipated but could not assert. |
| E6 | `measure-g2-provenance-0829.md`:183-185 and :237-240 | done | Only eleven of the 22 levels carry a band, since a seven-term trailing window cannot start before x = 37. Both occurrences of the "22-term ladder" clause now say so. |
| E7 | `measure-g2-provenance-0829.md`:192-201 | done | The house rule does not allow "under-predicts by construction" without a number. The recentring figures are the review's, attributed to it in the added sentence and marked MEASURED. |
| E8 | `measure-g2-provenance-0829.md`:213-214 | done | The registered threshold in §1 P1 was 0.26; §5 restated it as 0.279, the control's own bias, which loosens the test after the run. The pass clears both. |
| E9 | `measure-g2-generic-0829.md`:218-224 (§2) | done | The producer's birth equals its mtime, so the inode on disk is not the one the 1874.6 s run executed and §2's two timestamps are transcript claims. Added where §3c says to add it; the review's §5a remark that it belongs in defect 4 instead was not acted on, being a placement preference rather than an APPLY item. |
| R1 | `measure-g2z2-0829.md`:299-300 | owed | E1's proposed replacement retired the clause "where the mean pair count is of order 10 rather than astronomical" (claim 19, WEAKENED: three of the four lambda are 2.28, 4.58 and 6.09). The producer's own rewrite kept the clause. Not applied, because the instruction for this record is not to re-edit the M2 paragraph. Exact edit in §3. |
| L1 | `research/G2-STATE.md`:379-380 | left-for-orchestrator | Live document, §3d, APPLY the substance and HOLD the exact string. |
| L2 | `research/G2-STATE.md` §6.1 | left-for-orchestrator | Live document, §3d, APPLY the text and HOLD the placement. |
| L3 | `README.md`:175-176 | left-for-orchestrator | Live document, §3d verdict is HOLD, needs Chris. |
| L4 | `object-bridge-read-0829.md`:270 | left-for-orchestrator | Staging note outside this agent's scope by instruction; §3d calls it APPLY-class whenever that note is next touched. |
| L5 | `research/QUESTIONS.md` | left-for-orchestrator | Not a §3 item. `Q-measure-g2z2`, `Q-measure-g2-generic` and `Q-g2-provenance-x37` still return zero hits there (re-checked at the time of writing, 0 of 3), so the index has not been regenerated since the three notes were written. Raised by the review at §2d and §5 M6. |

One further item the review raises and proposes no wording for: its §4 finds that
the sentence calling an upper bound on G2(x#)/Z2(x) the carrier of the
TPC-strength implication is misattributed, the (ii) being carried by Z2's
definedness. The review says the sentence originates in
`object-bridge-read-0829.md` §7 Q1 and should be fixed there first. No edit was
made here, in either file.

## 2. The live-document items, verbatim from `redteam-0829-measure-a.md` §3d

```text
### 3d. To live documents

**`research/G2-STATE.md`:379-380, the h2/G2 bullet. Proposed by the provenance
note §6. Verdict: APPLY the substance, HOLD the exact string.**

The substance is verified here: all nine G2-free instruments reproduce, none
reads high at 37, and the live sentence "so three instruments now point at
x = 37 as a G2-side anomaly" is the claim the measurement retires. Two
mechanical objections to the string as drafted. First, the drafted text uses
`G₂`, `c₂′` and `h₂` in unicode subscripts, while the target lines use plain
`G2`, `c2′` and `h2`; a mixed-notation paragraph in the middle of §2 is a defect
the file does not currently carry. Second, the replacement begins after "1.341",
so the file's existing em dash before "the same level" stays in place, which is
correct for that file's own style.

OLD, at `research/G2-STATE.md`:379-380 (everything after "1.341"):
`the same level that spikes G2/h and c2′, so three instruments now point at x = 37 as a G2-side anomaly.`

NEW (notation normalised to the file's own):
`the same level that spikes G2/h and c2′. The three are not independent: all three are ratios carrying G2(37#) = 528, and of nine instruments free of that value none reads high at 37, the largest being h(37#) itself at z = -2.20 in the low direction and -1.08 on the range-matched ladder (MEASURED, history/staging/measure-g2-provenance-0829.md §4). What survives is one object: G2(37#) overshoots a blind seven-term extreme-value forecast by z = +6.58, the largest such residual on any of the three ladders, and that overshoot is unexplained.`

**`research/G2-STATE.md` §6.1, the addition. Verdict: APPLY the text, HOLD the
placement.** Every figure in the drafted paragraph reproduces exactly here
(1.533, 1.525, 1.465, 1.500, 1.498, and the control spread 0.932 to 1.233). The
note says "after the reading table", which is `G2-STATE.md`:1026; inserting
there splits the table from the sentence at :1028 that reads it ("Two measured
effects account for about a third of the difference"). The paragraph belongs
**after the blockquote that ends at :1040**, where it reads as a second
qualification on the same headline rather than as an interruption of the first.
Same notation objection: normalise `Ĝ(64)` and `G₂` to the file's own forms.

**`README.md`:175-176, the constant-shift sentence. Flagged by the generic note
§5. Verdict: HOLD, needs Chris.** The mathematical point is CONFIRMED here:
§1c proves that every census-matched two-class configuration is `S₁ ∩ (S₁ − d)`
for exactly one d up to translation and the per-prime sign group, so the
constant-shift *form* is not structure and only the *value* d = 2 is. But the
README sentence is Chris's own prose in the canonical status section, the three
uses it lists are uses of the value and survive unchanged, and the note itself
calls it a wording matter rather than a correction. It is not mechanical.

**`research/history/staging/object-bridge-read-0829.md`:270, the G2/Z2 row.**
The g2z2 note §5 proposes extending it from fourteen levels to 22. That target
is a staging note rather than a live document, so it falls outside the live-doc
gate; the extension is verified here (1.00 to 8.1429 with the maximum 8.3214 at
x = 71) and is APPLY-class whenever that note is next touched.

**No other live-document edit is proposed by any of the three notes**, and none
should be: `measure-g2z2-0829.md` §5 is explicit that the wall is unchanged, and
`measure-g2-generic-0829.md` proposes none at all.
```

## 3. Owed

**R1, and it is a wording residual, not a code change.** In
`measure-g2z2-0829.md`:299-300, inside the §4 M2 paragraph the producing agent
rewrote for E1.

OLD: `entirely in the smallest zones, where the mean pair count is of order 10 rather`
`than astronomical, and the threshold was written without looking at them.`

NEW: `entirely in the four smallest zones, whose lambda are 2.28, 4.58, 6.09 and`
`10.39, and the threshold was written without looking at them.`

Reason, quoted from the review's claim 19: "the four zones that carry the whole
figure have lambda 2.28, 4.58, 6.09 and 10.39; three of the four are not of
order 10". Verdict there is WEAKENED. The figures are in the note's own decade
table and in the producer's block, so the edit needs nothing re-run.

Nothing else is owed. No APPLY item in §3a to §3c required a code edit or a
re-embed once E1's was done by the producer.

## 4. Gate

`node research/qc.js` after the edits: **TOTAL 0**, all thirteen checks clean
(refs, quotes, crosslinks, scripts, transfers, calibration, absence, sourcing,
embeds, widths, ledger, provenance, search-convention), 0.4 s over 87 working
documents, 395 history documents and 336 scripts. No check named any of the
seven edits. The four standing advisories (embed-backlog, sourcing-backlog,
widths-scan, ledger-backlog) are unchanged by this work and are not part of
TOTAL. The gate is syntactic: it certifies that pointers resolve and bound
blocks hash to their record, and it is silent about whether the replaced
sentences are true.

## 5. CHANGELOG paragraph, for the orchestrator to append

**2026-08-29, red team A's corrections applied to three held measurement
notes.** Seven of the nine APPLY items in
`history/staging/redteam-0829-measure-a.md` §3a to §3c were applied as exact
string edits to `history/staging/measure-g2z2-0829.md`,
`history/staging/measure-g2-provenance-0829.md` and
`history/staging/measure-g2-generic-0829.md`. In the g2z2 note the §4
parenthetical elapsed figure went from a stale 331.2 s to the bound block's
320.5 s, §3b's d_seam/S minimum and maximum were re-attributed to the population
they belong to, and the p >= 3 tight-zone denominator went from 27,292 to 27,291
in §4 and in the ledger verdict. In the provenance note the band population was
corrected from the 22-term ladder to the eleven levels that carry a band, in two
places, the c2-prime drift was quantified at z = +5.18 and z = +3.49 against the
+6.58 headline, and the P1 threshold was restored to the registered 0.26 with
the control's 0.279 named separately. In the generic note §2's two timestamps
were downgraded to transcript claims, with the birth-time evidence that the
producer inode on disk is not the one its 1874.6 s run executed. E1, the
mislabelled Poisson figure, and E5, the defect entry recording it, had already
been applied by the producing agent together with a producer fix and a forced
re-embed, and were verified rather than re-applied. One clause of E1's proposed
wording remains owed. The four live-document items of §3d and the QUESTIONS.md
regeneration were left to the orchestrator. `node research/qc.js` returns
TOTAL 0.

---

*This document states current understanding. Superseded claims, retired numbers
and the reasons they changed are in [../CHANGELOG.md](../CHANGELOG.md), indexed
by document.*
