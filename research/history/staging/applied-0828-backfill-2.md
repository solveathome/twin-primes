# Backfill wave 2: ledger blocks for 85 legacy notes

<!-- ledger
id: Q-applied-0828-backfill-2
status: ANSWERED
todo: none
question: Which legacy notes in chunk 2 received ledger blocks?
verdict: 85 of the 86 notes in chunk 2 carry a block; only GLOSSARY.md was left unindexed, as a vocabulary registry that poses no question, and one id (Q-records-placement) was reused from QUESTIONS.md section 2 with its question text copied exactly.
-->

*(2026-08-28. Process record. Nothing was changed in any note except the
insertion of the block after its H1; no live document outside the chunk, no
`TODO.md`, no `QUESTIONS.md`, no `.js` and no git command. The gate and the
index are the primary agent's to regenerate.)*

## What was done

Each note in the chunk was read for its title, its opening statement and its own
verdict or summary section, and a `<!-- ledger -->` block was inserted
immediately after the H1 line. Ids are derived from the filename except where
`QUESTIONS.md` section 2 already owned the question. Statuses are the
**question's**, not the note's review grade: every staging note here remains HELD.

## Four blocks name a live TODO item that does not yet acknowledge them

The gate flags a block whose `todo:` names an item with no matching `Ledger:`
line. These four are correct as written and the acknowledgement is owed by
`TODO.md`, which this pass may not edit:

| note | item | why the item is named |
|---|---|---|
| `staging/attack-parity-adversary.md` | **Z2** | its own header says the note answers Z2's first move (b), and section 8 is titled as the verdict on it |
| `staging/y2-recompute.md` | **1d** | section 6 is headed "Item 1d: does Y2/x² fall over the corrected ladder?" and scores it |
| `staging/xchan-at37-offset-prereg.md` | **X** | the prereg fixes what each verdict does to item X's offset clause, and item X cites this file by name |
| `staging/phase1-T4-maximal-law.md` | **0** | section 5 states "TODO item 0's first move is answered: NO"; item 0 has been rewritten since 2026-08-18, so this attribution is the one worth a second look |

`staging/records-placement-prereg.md` also names **Z6**, and Z6's `Ledger:` line
already carries `Q-records-placement`, so it needs nothing. Two blocks name a
retired item: `adjudicate-L-bound.md` names `G (retired)` and
`shadow-amplitude.md` names `5 (retired)`.

## Ids reused from QUESTIONS.md section 2

One: `Q-records-placement`, on `staging/records-placement-prereg.md`, question
text copied character for character from the generated index. Its status
(ANSWERED) and `todo` (Z6) agree with `records-placement-01.md`, so the index
will report a single status rather than MIXED. No other note in this chunk poses
a question that section 2 already owned; the section is almost entirely
2026-08-22 to 2026-08-28 material and this chunk is older.

## Not classified

| note | why |
|---|---|
| `research/GLOSSARY.md` | A vocabulary registry: one term per object, explicitly owning "the vocabulary and nothing else" and "not the status of any route". It answers no research question, and `qc/questions.js` says registries never carry a block. Left without one, so it lists under "unindexed" in the generated index and a grep still finds it. |

## Every note, with the id and status given to it

| note | id | status | todo |
|---|---|---|---|
| `ATTACKS2.md` | `Q-attacks2` | ANSWERED | none |
| `OBSERVATIONS.md` | `Q-observations` | PARTIAL | none |
| `SEARCH-CONVENTIONS.md` | `Q-search-conventions` | ANSWERED | none |
| `ZONE-POSTULATE.md` | `Q-zone-postulate` | OPEN | none |
| `anchored-calm.md` | `Q-anchored-calm` | PARTIAL | none |
| `covering-dive.md` | `Q-covering-dive` | ANSWERED | none |
| `exponent-control.md` | `Q-exponent-control` | PARTIAL | none |
| `staging/adjudicate-L-bound.md` | `Q-block-L-first-dead` | ANSWERED | G (retired) |
| `staging/applied-C.md` | `Q-applied-C` | ANSWERED | none |
| `staging/applied-G.md` | `Q-applied-G` | ANSWERED | none |
| `staging/applied-Q.md` | `Q-applied-Q` | ANSWERED | none |
| `staging/attack-DP1-mechanism.md` | `Q-DP1-mechanism` | ANSWERED | none |
| `staging/attack-advmin-1113.md` | `Q-advmin-1113` | CLOSED | none |
| `staging/attack-bc-parity-floor.md` | `Q-bc-parity-floor` | CLOSED | none |
| `staging/attack-beta2-04-loss-budget.md` | `Q-beta2-loss-budget` | ANSWERED | none |
| `staging/attack-block-00-ADJUDICATION.md` | `Q-block-reformulation` | CLOSED | none |
| `staging/attack-block-04-greedy.md` | `Q-block-greedy` | ANSWERED | none |
| `staging/attack-block-08-secondmoment.md` | `Q-block-secondmoment` | CLOSED | none |
| `staging/attack-delta37-01.md` | `Q-delta37` | ANSWERED | none |
| `staging/attack-f4weak-01.md` | `Q-f4weak` | PARTIAL | none |
| `staging/attack-foldL-04-amortized.md` | `Q-foldL-amortized` | CLOSED | none |
| `staging/attack-growth-law.md` | `Q-growth-law` | ANSWERED | none |
| `staging/attack-hybrid-bound.md` | `Q-hybrid-bound` | CLOSED | none |
| `staging/attack-l1-residue.md` | `Q-l1-residue` | CLOSED | none |
| `staging/attack-maxvr-uniform.md` | `Q-maxvr-uniform` | CLOSED | none |
| `staging/attack-parity-adversary.md` | `Q-parity-adversary` | ANSWERED | Z2 |
| `staging/attack-sigma31-01.md` | `Q-sigma31-calibration` | ANSWERED | none |
| `staging/attack-theta-last-gap.md` | `Q-theta-last-gap` | CLOSED | none |
| `staging/audit-cross-document-constants.md` | `Q-audit-cross-doc` | ANSWERED | none |
| `staging/audit-new2.md` | `Q-audit-new2` | ANSWERED | none |
| `staging/audit-papers.md` | `Q-audit-papers` | ANSWERED | none |
| `staging/audit-staleness.md` | `Q-audit-staleness` | ANSWERED | none |
| `staging/changelog-add-B.md` | `Q-changelog-add-B` | ANSWERED | none |
| `staging/changelog-add-F.md` | `Q-changelog-add-F` | ANSWERED | none |
| `staging/changelog-add-P.md` | `Q-changelog-add-P` | ANSWERED | none |
| `staging/custody-embed-migration.md` | `Q-custody-embed-migration` | ANSWERED | none |
| `staging/defect-class-hunt.md` | `Q-defect-class-hunt` | ANSWERED | none |
| `staging/fdecay-deep.md` | `Q-fdecay-deep` | ANSWERED | none |
| `staging/foldL-window5.md` | `Q-foldL-window5` | ANSWERED | none |
| `staging/hawkins-read.md` | `Q-hawkins-read` | ANSWERED | none |
| `staging/import-boolean-analysis.md` | `Q-import-boolean-analysis` | CLOSED | none |
| `staging/import-distortion-prereg.md` | `Q-import-distortion-prereg` | ANSWERED | none |
| `staging/import-hypergraph.md` | `Q-import-hypergraph` | ANSWERED | none |
| `staging/import-l1l2-prereg.md` | `Q-import-l1l2-prereg` | CLOSED | none |
| `staging/import-proof-complexity.md` | `Q-import-proof-complexity` | CLOSED | none |
| `staging/import-shearer-prereg.md` | `Q-import-shearer-prereg` | ANSWERED | none |
| `staging/import-stein-prereg.md` | `Q-import-stein-prereg` | CLOSED | none |
| `staging/import-transference.md` | `Q-import-transference` | CLOSED | none |
| `staging/klz-forward-walk.md` | `Q-klz-forward-walk` | ANSWERED | none |
| `staging/lit-pdf-banks-ford-tao.md` | `Q-lit-pdf-bft` | ANSWERED | none |
| `staging/lit-pdf-holt-rudd.md` | `Q-lit-pdf-holt-rudd` | ANSWERED | none |
| `staging/lit-wu2004.md` | `Q-lit-wu2004` | ANSWERED | none |
| `staging/mp-derivation.md` | `Q-mp-derivation` | ANSWERED | none |
| `staging/null-limsup.md` | `Q-null-limsup` | ANSWERED | none |
| `staging/phase1-T1-greedy-oracle.md` | `Q-greedy-oracle` | ANSWERED | none |
| `staging/phase1-T4-maximal-law.md` | `Q-maximal-law-tpc` | ANSWERED | 0 |
| `staging/phase1-W3-literature.md` | `Q-W3-literature` | ANSWERED | none |
| `staging/qc-checks-9-10.md` | `Q-qc-checks-9-10` | ANSWERED | none |
| `staging/qc-papers2.md` | `Q-qc-papers2` | ANSWERED | none |
| `staging/qc-scope-T.md` | `Q-qc-scope-T` | ANSWERED | none |
| `staging/qc-shepherd.md` | `Q-qc-shepherd` | ANSWERED | none |
| `staging/qc-wave6-U.md` | `Q-qc-wave6-U` | ANSWERED | none |
| `staging/qc-wave6-Y.md` | `Q-qc-wave6-Y` | ANSWERED | none |
| `staging/records-placement-prereg.md` | `Q-records-placement` | ANSWERED | Z6 |
| `staging/redteam-0820-night-proofs.md` | `Q-redteam-0820-night-proofs` | ANSWERED | none |
| `staging/redteam-0821-wave2-analytic.md` | `Q-redteam-0821-wave2` | ANSWERED | none |
| `staging/redteam-zonegap-foundation.md` | `Q-redteam-zonegap-foundation` | ANSWERED | none |
| `staging/row12-recon.md` | `Q-row12-lonely-runner` | CLOSED | none |
| `staging/scanstat2-prereg.md` | `Q-scanstat2-prereg` | CLOSED | none |
| `staging/shadow-amplitude.md` | `Q-shadow-amplitude` | PARTIAL | 5 (retired) |
| `staging/special-levels-recon.md` | `Q-special-levels-recon` | CLOSED | none |
| `staging/verify-ab-coupling.md` | `Q-ab-coupling` | ANSWERED | none |
| `staging/verify-kk-substitution.md` | `Q-kk-substitution` | ANSWERED | none |
| `staging/verify-the-verifier-embeds.md` | `Q-embed-binding` | ANSWERED | none |
| `staging/width-sweep-attacks.md` | `Q-width-sweep-attacks` | ANSWERED | none |
| `staging/xchan-at37-offset-prereg.md` | `Q-xchan-at37-offset` | ANSWERED | X |
| `staging/y2-recompute.md` | `Q-y2-recompute` | ANSWERED | 1d |
| `staging/zonegap-03-model.md` | `Q-zonegap-model` | ANSWERED | none |
| `kappa-not-L.md` | `Q-kappa-not-L` | CLOSED | none |
| `maier-matrix.md` | `Q-maier-matrix` | CLOSED | none |
| `natal-cap-12-overlap-sign.md` | `Q-natal-cap-overlap-sign` | CLOSED | none |
| `natal-cap-23-covadj-proof.md` | `Q-covadj-sign` | PARTIAL | none |
| `natal-cap-32-wrap-identity.md` | `Q-wrap-identity` | ANSWERED | none |
| `operator-and-pair-count.md` | `Q-operator-pair-count` | ANSWERED | none |
| `two-class-lower-bounds.md` | `Q-two-class-lower-bounds` | PARTIAL | none |

---

*History layer: process record, staging. See `research/history/CHANGELOG.md` for
the corpus rule.*
