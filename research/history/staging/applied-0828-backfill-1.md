# Backfill wave, chunk 1: eighty-six legacy notes given ledger blocks

<!-- ledger
id: Q-applied-0828-backfill-1
status: ANSWERED
todo: none
question: Which legacy notes in chunk 1 received ledger blocks?
verdict: All 86 notes in the chunk received a block and none was skipped; 85 distinct question ids were minted, no id was reused from QUESTIONS.md section 2, and two notes were chained onto one shared id.
-->

*(2026-08-28. Applier note for chunk 1 of the question-ledger backfill. The only
files edited are the 86 listed below, and the only edit to each is the insertion
of a `<!-- ledger -->` block after its H1 and a blank line. No other byte of any
note was changed, no live document outside the chunk was touched, `TODO.md` and
`research/QUESTIONS.md` were not edited, no script was edited or run beyond
`node -e` parse checks against the regex in `research/qc/questions.js`, and no git
command was issued.)*

## What this pass did not settle, first

Every `status` and every `verdict` line below is a summary of what the note
itself says, at the note's own rung, read from its title, its opening paragraph
and its verdict or headline section. Where a long note was not read end to end, a
claim buried outside those sections is not represented in its block. Nothing here
is a re-adjudication: a note whose bottom line is wrong keeps its wrong bottom
line, restated rather than corrected. Twenty-eight staging notes remain HELD, and
a block's status is the QUESTION's status, never a review grade.

**The TODO side of the gate is also not settled.** Twelve blocks name a live TODO
item (`0`, `0b`, `0c`, `1d`, `2`, `9`, `X`, `Z2`). None of those items carries a
`Ledger:` line yet, because this pass may not edit `TODO.md`. Until the
orchestrator adds them, `node research/qc.js` will report those items as not
acknowledging the notes that name them. Seven further blocks name an item that
has left `TODO.md` and are marked `(retired)`: `A9`, `1b`, `3`, `5`, `0d`, `Z`.

**What moved.** 86 of 86 notes in the chunk now carry a block; 0 skipped, 0
unclassifiable. 85 distinct ids. Statuses: ANSWERED 52, CLOSED 12, OPEN 7, PARTIAL 15.

## Ids reused, and the one chain

**No id was reused from `research/QUESTIONS.md` section 2.** Every id in the
existing index was checked against every id minted here and none collided; no
note in this chunk plainly answered a question already carrying an id there. The
nearest calls, all declined as distinct questions:

- `attack-hsub-01.md` was NOT given `Q-hsubpow-K` (Can (H-sub-pow) be proven with
  an explicit K in the legal zone?). It asks the prior question, whether (H-sub)
  itself can be proven or refuted, and its own contribution is the reduction TO
  (H-sub-pow). It got `Q-hsub-reductions`.
- `research/certificate-engine.md` was NOT given `Q-buchstab-transfer` or
  `Q-sharp-sieve-range`. Those name two of its inputs; the file's own question is
  the engine's calibration.
- `var41-prereg.md` was NOT given `Q-varE-limit`. It registers a prediction for
  one new point and states in its own text that one more point cannot separate a
  limit from a drift.

**One chain, two notes on one id.** `attack-obstruction-audit.md` and
`lit-tao-parity.md` share `Q-obstruction-audit` with identical question text.
Both ask whether the wall named parity is the right name for what blocks
`G2(x#) < x'^2 - 2`; the second reads Tao at source and refutes the first's
central *reason* while leaving its verdict standing, so both are ANSWERED and the
index will show the later note's verdict. This is the only shared id in the chunk.

## Notes that could not be classified

**None.** Every note in the chunk carried a stated question and a stated bottom
line in its title, its opening paragraph, or a verdict / headline / answer
section. One judgement call is recorded rather than hidden:
`research/REFUTED.md` is a registry, not an attack note, and the header of
`research/qc/questions.js` says registries never carry a block. It is in the
chunk, so it got one (`Q-refuted-index`, ANSWERED), with a verdict line saying it
is a registry rather than a result. If registries are meant to stay unindexed,
that is the one block to remove.

## The table

| note | id | status | todo |
|---|---|---|---|
| `research/ATTACKS.md` | `Q-attacks-wall-ten` | ANSWERED | none |
| `research/G2-STATE.md` | `Q-g2-state` | PARTIAL | none |
| `research/NATAL-CAP-CAMPAIGN.md` | `Q-natal-cap-campaign` | ANSWERED | none |
| `research/REFUTED.md` | `Q-refuted-index` | ANSWERED | none |
| `research/U-FRAME.md` | `Q-u-frame` | PARTIAL | none |
| `research/a3-09-histogram-operator.md` | `Q-a9-histogram-operator` | ANSWERED | A9 (retired) |
| `research/certificate-engine.md` | `Q-certificate-engine` | PARTIAL | none |
| `research/discrepancy-two-class.md` | `Q-discrepancy-two-class` | ANSWERED | none |
| `research/h2-scoping.md` | `Q-h2-extension` | CLOSED | none |
| `research/history/staging/applied-B.md` | `Q-applied-wave2-B` | ANSWERED | none |
| `research/history/staging/applied-F.md` | `Q-applied-wave2-F` | ANSWERED | none |
| `research/history/staging/applied-P.md` | `Q-applied-wave4-P` | ANSWERED | none |
| `research/history/staging/attack-AB-bounded.md` | `Q-beta2-AB-bounded` | ANSWERED | none |
| `research/history/staging/attack-ab-coupling.md` | `Q-ab-coupling` | PARTIAL | none |
| `research/history/staging/attack-b2mean-01.md` | `Q-b2mean` | ANSWERED | none |
| `research/history/staging/attack-beta2-03-exact-strata.md` | `Q-beta2-exact-strata` | CLOSED | none |
| `research/history/staging/attack-bilinear-transplant.md` | `Q-bilinear-transplant` | CLOSED | none |
| `research/history/staging/attack-block-03-alternation.md` | `Q-block-alternation` | CLOSED | none |
| `research/history/staging/attack-block-07-kappa.md` | `Q-block-kappa` | CLOSED | none |
| `research/history/staging/attack-bonferroni-degree.md` | `Q-bonferroni-degree` | CLOSED | none |
| `research/history/staging/attack-erdos-map.md` | `Q-erdos-map` | ANSWERED | none |
| `research/history/staging/attack-foldL-03-transport.md` | `Q-foldL-transport` | ANSWERED | none |
| `research/history/staging/attack-ford-halberstam.md` | `Q-ford-halberstam` | CLOSED | none |
| `research/history/staging/attack-hsub-01.md` | `Q-hsub-reductions` | PARTIAL | 1d |
| `research/history/staging/attack-kstar-01.md` | `Q-kstar-drift` | ANSWERED | none |
| `research/history/staging/attack-lower-bound.md` | `Q-two-class-lower-bound` | PARTIAL | none |
| `research/history/staging/attack-obstruction-audit.md` | `Q-obstruction-audit` | ANSWERED | none |
| `research/history/staging/attack-roughpair-error.md` | `Q-roughpair-error` | PARTIAL | Z2 |
| `research/history/staging/attack-tau-repricing.md` | `Q-tau-repricing` | CLOSED | none |
| `research/history/staging/audit-campaign.md` | `Q-audit-campaign` | ANSWERED | none |
| `research/history/staging/audit-new1.md` | `Q-audit-new1` | ANSWERED | none |
| `research/history/staging/audit-oeis-14term.md` | `Q-oeis-g2-absence` | ANSWERED | none |
| `research/history/staging/audit-spine.md` | `Q-audit-spine` | ANSWERED | none |
| `research/history/staging/changelog-add-A.md` | `Q-changelog-wave2-A` | ANSWERED | none |
| `research/history/staging/changelog-add-E.md` | `Q-changelog-wave2-E` | ANSWERED | none |
| `research/history/staging/changelog-add-I.md` | `Q-changelog-wave3-I` | ANSWERED | none |
| `research/history/staging/constants-audit-2.md` | `Q-constants-audit-2` | ANSWERED | none |
| `research/history/staging/custody-wave3.md` | `Q-custody-wave3` | ANSWERED | none |
| `research/history/staging/fdecay-deep-prereg.md` | `Q-fdecay-out-of-sample` | OPEN | none |
| `research/history/staging/foldL-window5-prereg.md` | `Q-foldL-window5` | OPEN | none |
| `research/history/staging/greedy-oracle-validation.md` | `Q-greedy-oracle` | ANSWERED | 1b (retired) |
| `research/history/staging/import-bfree.md` | `Q-import-bfree` | ANSWERED | none |
| `research/history/staging/import-chaining.md` | `Q-import-chaining` | CLOSED | 0c |
| `research/history/staging/import-hypergraph-prereg.md` | `Q-import-hypergraph` | OPEN | none |
| `research/history/staging/import-kw-zonegap.md` | `Q-import-kw-zonegap` | ANSWERED | none |
| `research/history/staging/import-maxplus.md` | `Q-import-maxplus` | ANSWERED | none |
| `research/history/staging/import-scanstat.md` | `Q-import-scanstat` | ANSWERED | none |
| `research/history/staging/import-sofic.md` | `Q-import-sofic` | ANSWERED | none |
| `research/history/staging/import-thinning.md` | `Q-import-thinning` | ANSWERED | 0b |
| `research/history/staging/item-x-offset.md` | `Q-xchannel-offset` | PARTIAL | X |
| `research/history/staging/lit-evans.md` | `Q-lit-evans` | ANSWERED | none |
| `research/history/staging/lit-pdf-halberstam-richert.md` | `Q-lit-halberstam-richert` | ANSWERED | none |
| `research/history/staging/lit-tao-parity.md` | `Q-obstruction-audit` | ANSWERED | none |
| `research/history/staging/monotonicity-sweep.md` | `Q-monotonicity-sweep` | ANSWERED | 3 (retired) |
| `research/history/staging/null-limsup-prereg.md` | `Q-null-limsup` | OPEN | none |
| `research/history/staging/perfold-window-prereg.md` | `Q-perfold-window` | OPEN | none |
| `research/history/staging/phase1-T3prep-decision-rule.md` | `Q-g2-falls-decision-rule` | PARTIAL | 1d |
| `research/history/staging/phase1-W2-cal4-routing.md` | `Q-cal4-routing` | ANSWERED | none |
| `research/history/staging/qc-arch.md` | `Q-qc-arch` | ANSWERED | none |
| `research/history/staging/qc-numbers.md` | `Q-qc-numbers` | ANSWERED | none |
| `research/history/staging/qc-scope-R.md` | `Q-qc-scope-R` | ANSWERED | none |
| `research/history/staging/qc-scripts-S3.md` | `Q-qc-scripts-S3` | ANSWERED | none |
| `research/history/staging/qc-transfers-J.md` | `Q-qc-transfers-J` | ANSWERED | none |
| `research/history/staging/qc-wave6-X.md` | `Q-qc-wave6-absence` | ANSWERED | none |
| `research/history/staging/reconcile-bind.md` | `Q-reconcile-bind` | ANSWERED | none |
| `research/history/staging/redteam-0820-night-empirical.md` | `Q-redteam-0820-night` | ANSWERED | none |
| `research/history/staging/redteam-0821-structure.md` | `Q-redteam-0821-structure` | ANSWERED | none |
| `research/history/staging/redteam-at37-score.md` | `Q-redteam-at37-score` | ANSWERED | none |
| `research/history/staging/row11-closure.md` | `Q-row11-closure` | CLOSED | none |
| `research/history/staging/scanstat-t37.md` | `Q-scanstat-t37` | ANSWERED | none |
| `research/history/staging/shadow-amplitude-prereg.md` | `Q-shadow-amplitude` | OPEN | 5 (retired) |
| `research/history/staging/smoothness-front.md` | `Q-smoothness-front` | PARTIAL | none |
| `research/history/staging/var41-prereg.md` | `Q-var41` | OPEN | 2, 9 |
| `research/history/staging/verify-k4direct-swap.md` | `Q-k4direct-swap` | ANSWERED | none |
| `research/history/staging/verify-the-verifier-checks.md` | `Q-verify-the-verifier` | ANSWERED | none |
| `research/history/staging/width-repairs.md` | `Q-width-repairs` | ANSWERED | none |
| `research/history/staging/xchan-at29.md` | `Q-xchannel-closedform` | PARTIAL | X |
| `research/history/staging/xchannel-triples.md` | `Q-xchannel-triples` | ANSWERED | X |
| `research/history/staging/zonegap-02-reduction.md` | `Q-zonegap-reduction` | PARTIAL | Z (retired) |
| `research/history/staging/zonegap-witnesses.md` | `Q-zonegap-witnesses` | ANSWERED | none |
| `research/localized-single-alignment.md` | `Q-single-alignment` | CLOSED | 0d (retired) |
| `research/natal-cap-10-sieve-cap.md` | `Q-natal-cap-sieve-cap` | ANSWERED | none |
| `research/natal-cap-21-beyond-chebyshev.md` | `Q-beyond-chebyshev` | PARTIAL | none |
| `research/natal-cap-31-calm-vs-kill.md` | `Q-calm-vs-kill` | PARTIAL | none |
| `research/oeis-seam-submission.md` | `Q-oeis-seam-submission` | PARTIAL | none |
| `research/theta-ladder.md` | `Q-theta-ladder` | CLOSED | 0 |
