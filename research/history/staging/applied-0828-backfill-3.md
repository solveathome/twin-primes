# Backfill chunk 3: eighty-six legacy notes given ledger blocks

<!-- ledger
id: Q-applied-0828-backfill-3
status: ANSWERED
todo: none
question: Which legacy notes in chunk 3 received ledger blocks?
verdict: All 86 notes in the chunk carry a block; none was skipped, one id (Q-quadpoint-transplant) is reused from QUESTIONS.md section 2 with its question text copied exactly, one id (Q-f-census) is shared by the two notes of the f-from-census chain, and seven blocks name a TODO item whose Ledger line does not yet list them.
-->

*(2026-08-28. Mechanical backfill pass. Nothing but the ledger block was
inserted in any note: each block sits immediately after the H1 and a blank
line, and no other byte of any note was touched. No live document outside the
chunk, no `TODO.md`, no `QUESTIONS.md`, no script and no git command. The gate
and the index were left for the primary agent to regenerate.)*

## 1. What the pass had to decide, and where it could be wrong

- **Reuse from QUESTIONS.md section 2: one.**
  `quadpoint-decade-prereg.md` is the sealed pre-registration for
  `attack-quadpoint-02.md`, which already carries `Q-quadpoint-transplant`, so
  the prereg takes that id with the question text copied character for
  character. Its status is written ANSWERED, the question's status today, not
  OPEN, which is what the prereg alone could say; that is a judgement call and
  the alternative would print MIXED in the index.
- **Shared id inside the chunk: one.** `a3-03-f-from-census.md` and
  `f-decays.md` are the same question on the same producer under the same
  2026-08-19 alias defect, so both carry `Q-f-census` with identical question
  text, both PARTIAL.
- **Chains deliberately NOT merged.** `level-ledger-tight.md` was not given
  `Q-comb-discrepancy`: the Comb Discrepancy Lemma's dilated family and the
  Level Ledger are treated as two objects by `comb-discrepancy-tight.md`
  itself, which compares against this note rather than continuing it.
  `rho-maximal-law.md` was not given `Q-rho2-bound`: that id is the analytic
  upper bound on `<rho^2>(z)`, a different question from the statement and
  sufficiency curve of the maximal law. `import-vc-nets.md` was not given
  `Q-vc-prior-art`, which is the prior-art check ON its finding.
- **Preregs whose outturn note is in another chunk** (`import-bridge-prereg`,
  `import-interp-prereg`, `zonegap-01-prereg`, `zonegap-03-prereg`,
  `mp-window-prereg`) got filename-derived ids rather than a guess at the
  sibling's id, to avoid a shared id with differing question text. If the
  primary wants prereg and outturn indexed as one question, these five are the
  merges to make.
- **TODO items named.** Seven blocks name a live item: `0c` (twice), `A`
  (twice), `1d`, `X` (twice), `0`, `4`, `Z2` via the reused quadpoint id.
  Items `0c`, `A` and `X` carry no `Ledger:` line at all today, and items `0`,
  `1d` and `4` do not list the new ids, so the gate will report
  `ledger-todo-unlisted` until `TODO.md` is updated. That is the re-run guard
  doing its job and is left to the primary agent. Five more blocks name a
  retired item (`Z5b`, `1e`, `0e`, `Z1`) and produce no finding.
- **One note names a TODO item that no longer means what it meant.**
  `natal-cap-14-discrepancy-lemma.md` (2026-08-14) says "TODO item 6"; today's
  item 6 is the wrap engine, a different object, so its block reads
  `todo: none` rather than mis-attributing a move.
- **Registries got question-shaped blocks.** `IMPORT-MAP.md`, `PRIOR-ART.md`,
  `THE-DIALS.md` and `ATTACKS3.md` are standing maps rather than single-answer
  notes; each block states the map's own governing question and its current
  bottom line, and the two that are still live are PARTIAL.

## 2. Notes that could not be classified

None. Every note in the chunk stated a question and a bottom line clearly
enough to write both lines, so no note was left without a block.

## 3. The table

| note | id | status | todo |
|---|---|---|---|
| `ATTACKS3.md` | `Q-attacks3-uframe` | ANSWERED | none |
| `IMPORT-MAP.md` | `Q-import-map` | PARTIAL | none |
| `PRIOR-ART.md` | `Q-prior-art-audit` | PARTIAL | none |
| `THE-DIALS.md` | `Q-the-dials` | ANSWERED | none |
| `a3-03-f-from-census.md` | `Q-f-census` | PARTIAL | none |
| `anchored-windows.md` | `Q-anchored-windows` | SUPERSEDED | none |
| `d2-d4-bijection.md` | `Q-d2-d4-bijection` | ANSWERED | none |
| `f-decays.md` | `Q-f-census` | PARTIAL | none |
| `history/staging/adversary-wave2.md` | `Q-adversary-wave2` | ANSWERED | none |
| `history/staging/applied-D.md` | `Q-applied-wave2-D` | ANSWERED | none |
| `history/staging/applied-H.md` | `Q-applied-wave3-H` | ANSWERED | none |
| `history/staging/attack-0c-holesweep.md` | `Q-0c-holesweep` | ANSWERED | 0c |
| `history/staging/attack-L-law.md` | `Q-L-own-law` | ANSWERED | none |
| `history/staging/attack-anchored-01.md` | `Q-anchored-unify` | ANSWERED | A |
| `history/staging/attack-beta2-01-lemmaV-meansquare.md` | `Q-lemmaV-meansquare` | PARTIAL | none |
| `history/staging/attack-beta2-05-covering-pruning-bound.md` | `Q-covering-pruning` | CLOSED | none |
| `history/staging/attack-block-01-ladder.md` | `Q-block-combined-L` | CLOSED | none |
| `history/staging/attack-block-05-exponent.md` | `Q-block-exponent` | CLOSED | none |
| `history/staging/attack-block-09-anchored.md` | `Q-anchored-vs-global-gap` | CLOSED | none |
| `history/staging/attack-dim2-standalone.md` | `Q-dim2-standalone` | ANSWERED | none |
| `history/staging/attack-foldL-01-census.md` | `Q-foldL-run-census` | PARTIAL | none |
| `history/staging/attack-foldL-05-maxsum-direct.md` | `Q-foldL-maxsum-direct` | CLOSED | 0c |
| `history/staging/attack-history-dial.md` | `Q-history-dial` | ANSWERED | A |
| `history/staging/attack-kk-substitution.md` | `Q-kk-substitution` | ANSWERED | none |
| `history/staging/attack-lambda-ledger.md` | `Q-lambda-ledger` | CLOSED | Z5b (retired) |
| `history/staging/attack-multiplicity3.md` | `Q-multiplicity3` | CLOSED | none |
| `history/staging/attack-prior-art-last-ground.md` | `Q-prior-art-last-ground` | ANSWERED | none |
| `history/staging/attack-sqrt-cancellation.md` | `Q-sqrt-cancellation` | CLOSED | none |
| `history/staging/attack-wrongdirection-audit.md` | `Q-wrongdirection-audit` | ANSWERED | 1e (retired) |
| `history/staging/audit-front-door.md` | `Q-audit-front-door` | ANSWERED | none |
| `history/staging/audit-novelty-postaudit.md` | `Q-novelty-postaudit` | ANSWERED | none |
| `history/staging/audit-reading-path.md` | `Q-audit-reading-path` | ANSWERED | none |
| `history/staging/audit-uframe.md` | `Q-audit-uframe` | ANSWERED | none |
| `history/staging/changelog-add-C.md` | `Q-changelog-add-C` | ANSWERED | none |
| `history/staging/changelog-add-G.md` | `Q-changelog-add-G` | ANSWERED | none |
| `history/staging/changelog-add-Q.md` | `Q-changelog-add-Q` | ANSWERED | none |
| `history/staging/custody-external-evidence.md` | `Q-custody-external` | ANSWERED | none |
| `history/staging/defect-repairs.md` | `Q-defect-repairs` | ANSWERED | none |
| `history/staging/fekete-1d.md` | `Q-fekete-1d-defect47` | PARTIAL | 1d |
| `history/staging/frontier37.md` | `Q-frontier37` | ANSWERED | none |
| `history/staging/holt-2605-sweep.md` | `Q-holt-2605` | ANSWERED | none |
| `history/staging/import-bridge-prereg.md` | `Q-import-bridge-prereg` | SUPERSEDED | none |
| `history/staging/import-distortion.md` | `Q-import-distortion` | CLOSED | none |
| `history/staging/import-interp-prereg.md` | `Q-import-interp-prereg` | SUPERSEDED | none |
| `history/staging/import-l1l2.md` | `Q-import-l1l2` | CLOSED | none |
| `history/staging/import-rough-anatomy.md` | `Q-import-rough-anatomy` | ANSWERED | none |
| `history/staging/import-shearer.md` | `Q-import-shearer` | ANSWERED | none |
| `history/staging/import-stein.md` | `Q-import-stein` | CLOSED | none |
| `history/staging/import-vc-nets.md` | `Q-import-vc-nets` | CLOSED | none |
| `history/staging/lemmaV-neighbours.md` | `Q-lemmaV-neighbours` | ANSWERED | none |
| `history/staging/lit-pdf-fgkt-maier.md` | `Q-lit-fgkt-maier` | ANSWERED | none |
| `history/staging/lit-pdf-kalmynin-konyagin.md` | `Q-lit-kalmynin-konyagin` | ANSWERED | none |
| `history/staging/lp-push-x43.md` | `Q-lp-push-x43` | ANSWERED | none |
| `history/staging/mp-window-prereg.md` | `Q-mp-window-prereg` | OPEN | none |
| `history/staging/ojaroudi-read.md` | `Q-ojaroudi-read` | ANSWERED | none |
| `history/staging/phase1-T2a-prediction.md` | `Q-T2a-prediction` | PARTIAL | none |
| `history/staging/phase1-W1a-applied.md` | `Q-W1a-applied` | ANSWERED | none |
| `history/staging/proposals-prior-art.md` | `Q-proposals-prior-art` | ANSWERED | none |
| `history/staging/qc-compound.md` | `Q-qc-compound` | ANSWERED | none |
| `history/staging/qc-queue-9-10-worked.md` | `Q-qc-queue-9-10` | ANSWERED | none |
| `history/staging/qc-scripts-S1.md` | `Q-qc-scripts-S1` | ANSWERED | none |
| `history/staging/qc-slopes-K.md` | `Q-qc-slopes-K` | ANSWERED | none |
| `history/staging/qc-wave6-V.md` | `Q-qc-wave6-V` | ANSWERED | none |
| `history/staging/quadpoint-decade-prereg.md` | `Q-quadpoint-transplant` | ANSWERED | Z1 (retired) |
| `history/staging/redteam-0820-empirical.md` | `Q-redteam-0820-empirical` | ANSWERED | none |
| `history/staging/redteam-0820-structural.md` | `Q-redteam-0820-structural` | ANSWERED | none |
| `history/staging/redteam-0821-wave2-structural.md` | `Q-redteam-0821-wave2` | ANSWERED | none |
| `history/staging/rho-maximal-law.md` | `Q-rho-maximal-law` | PARTIAL | 0 |
| `history/staging/row7-recon.md` | `Q-row7-talagrand` | CLOSED | none |
| `history/staging/scanstat2.md` | `Q-scanstat2` | ANSWERED | none |
| `history/staging/shadow-buchstab.md` | `Q-shadow-buchstab` | ANSWERED | none |
| `history/staging/theta-selfconsistent.md` | `Q-theta-selfconsistent` | ANSWERED | none |
| `history/staging/verify-cofactor-convolution.md` | `Q-verify-cofactor-convolution` | ANSWERED | X |
| `history/staging/verify-monotone-depth.md` | `Q-verify-monotone-depth` | ANSWERED | 0e (retired) |
| `history/staging/verify-the-verifier-numbers.md` | `Q-verify-audit-numbers` | ANSWERED | none |
| `history/staging/width-sweep-census.md` | `Q-width-sweep` | ANSWERED | none |
| `history/staging/xchan-at37-score.md` | `Q-xchan-at37-score` | ANSWERED | X |
| `history/staging/zonegap-01-prereg.md` | `Q-zonegap-01-prereg` | SUPERSEDED | none |
| `history/staging/zonegap-03-prereg.md` | `Q-zonegap-03-prereg` | OPEN | none |
| `level-ledger-tight.md` | `Q-level-ledger-tight` | PARTIAL | none |
| `maxgap-law.md` | `Q-maxgap-law` | ANSWERED | none |
| `natal-cap-14-discrepancy-lemma.md` | `Q-natal-discrepancy-lemma` | PARTIAL | none |
| `natal-cap-26-minus-half.md` | `Q-minus-half` | ANSWERED | none |
| `natal-cap-36-skeleton-door.md` | `Q-skeleton-door` | ANSWERED | 4 |
| `origin-excess.md` | `Q-origin-excess` | ANSWERED | none |
| `two-moire-argument.md` | `Q-two-moire` | ANSWERED | none |
---

*Status counts: see the table. This is a process record; the index it feeds is
`research/QUESTIONS.md`, generated by `node research/gen-questions-index.js`.
History layer, staging. See `research/history/CHANGELOG.md` for the corpus
rule.*
