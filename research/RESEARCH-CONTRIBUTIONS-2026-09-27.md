# Who did the research: contributions and source ownership

<!-- ledger
id: Q-meta-research-contributions
status: PARTIAL
todo: none
question: Who performed the preceding meta-research and this OEIS reconciliation, and who owns the underlying results?
verdict: Benjaminsen directed and authorized publication; Codex performed these tasks' searches, analysis, checks and drafting. Original results retain named external authors; project returns retain their recorded contributor accounts and models. Earlier sole-author wording is replaced by contribution roles. Complete historical attribution is not established by this audit.
-->

This record covers the 27 September 2026 **prime-corpus meta-assessment and
manuscript corrections**, and the subsequent **OEIS-proposal reconciliation**.
It distinguishes intellectual source ownership, the work performed in these
tasks, and the account publishing the resulting documents.

## These two tasks

| Contribution | Who performed it | Scope |
|---|---|---|
| Research direction, request for the audits, correction of the credit policy and authorization to publish | [Benjaminsen](https://solveathome.org/@Benjaminsen) | Human direction and publication role; not attribution of all research or imported results to this person |
| Literature/OEIS retrieval and comparison, synthesis, the Aryan specialization, direct 83# checker, numerical/identity spot checks, manuscript edits and OEIS draft reconciliation | **Codex, an AI assistant**, working in this conversation | AI-performed analysis, code and writing. The exact model variant was not recorded for this author-publication workflow; no variant or usage award is inferred |
| Newly discovered general law of primes or new 83# record | **None established in these tasks** | The 83# interval is Wang's prior work. The earlier missed attribution was an error in the Codex assessment and is explicitly corrected |

Publishing under the Benjaminsen profile and committing with that account
records project stewardship; it does not make Benjaminsen the performer of
every calculation or the originator of every result. These updates carry no
self-awarded independent-review credit. The earlier phrase “credited to
Benjaminsen, prepared with AI assistance” was insufficiently specific and is
superseded by the roles above.

## Original mathematical sources retained by the assessment

| Result or object used | Original source credited here |
|---|---|
| G2 at primorials, shifted by one | [OEIS A144311](https://oeis.org/A144311): Andrew Carter (2008); listed extensions by Max Alekseyev (2009) and Jinyuan Wang (2024) |
| The identical 83# interval, start 162791254787456816384305457582341, length 1859 | **Jinyuan Wang**, [A144311 revision-18 discussion](https://oeis.org/history?seq=A144311), 26 November 2024, 10:42; not a discovery by Benjaminsen, Codex or the 2026 project returns |
| General reduced-residue tuple gap moment used to deduce qualitative quadratic-window occupancy | [Farzad Aryan, Theorem 0.1](https://arxiv.org/pdf/1302.2296). The substitution and elementary deduction in the assessment were carried out by Codex; the underlying theorem is Aryan's |
| Dimension-two sieve and its sifting limit | Diamond–Halberstam–Richert machinery, with numerical sources cited in [beta2-note](../paper/beta2-note.md). The project application does not acquire ownership of the sieve or exponent |
| Published covering construction adapted in the two-class lower bound | [Kalmynin–Konyagin](https://arxiv.org/pdf/2302.00459). Project adaptation and checking are separate contributions, with priority still unestablished; the manuscript and return history retain their own attribution |
| Sieve-gap recursions and wave precedents | Holt–Rudd and Petersen et al., linked and compared in the [meta-assessment](prime-meta-research-2026-09-27.md). Project vocabulary does not establish priority over those results |
| Related primorial twin families | Cami's [A087732](https://oeis.org/A087732) and [A087904](https://oeis.org/A087904); Schoenfield's [A367739](https://oeis.org/A367739); the existing least-multiplier entry [A060256](https://oeis.org/A060256). The seam-count draft is a candidate cutoff statistic, not ownership of the family |

This is a source map for the claims changed by these tasks, not a claim to have
reconstructed the earliest inventor of every classical fact in the corpus.
The manuscripts' references supply the remaining theorem-by-theorem credit.

## Recorded project contributors

A contributor account identifies the submitted return; the model column
identifies its recorded AI worker. Neither field, by itself, proves that the
account holder personally derived the mathematics. These are selected records
used by the two tasks, not an exhaustive list of all contributors or a grant
of sole authorship of the underlying result.

| Record | Contributor account | Recorded model | Contribution evidenced by the record |
|---|---|---|---|
| [#1563](https://solveathome.org/projects/twin-primes/return/1563) | maxime-fleury | deepseek-v4-flash | Triage identifying the already available 309-position configuration; not original 2024 interval discovery |
| [#1632](https://solveathome.org/projects/twin-primes/return/1632) | nielsegberts | gpt-6-astra | Explicit interval reconstruction and finite verification, reproducing Wang's interval |
| [#1896](https://solveathome.org/projects/twin-primes/return/1896) | Benjaminsen | claude-opus-5-5 | Certificate translation/provenance analysis and clarification of the still-open Lean step |
| Variance: [#1319](https://solveathome.org/projects/twin-primes/return/1319), [#1711](https://solveathome.org/projects/twin-primes/return/1711) | natepac; Benjaminsen | claude-fable-5-1; deepseek-v4-flash | Accepted manuscript revisions preceding this task's source/claim corrections |
| DHR upper bound: [#1245](https://solveathome.org/projects/twin-primes/return/1245), [#1770](https://solveathome.org/projects/twin-primes/return/1770) | natepac; Benjaminsen | claude-fable-5-1; deepseek-v4-flash | Accepted manuscript revisions; not authorship of DHR machinery |
| Lower-bound adaptation: [#1093](https://solveathome.org/projects/twin-primes/return/1093), [#1730](https://solveathome.org/projects/twin-primes/return/1730) | nielsegberts; Benjaminsen | gpt-6-astra; deepseek-v4-flash | Accepted lower-bound manuscript revisions and corrections; not sole-originator attribution for the adaptation or its imported construction |
| Consolidated manuscript: [#1261](https://solveathome.org/projects/twin-primes/return/1261) | natepac | claude-fable-5-1 | Accepted synthesis revision preceding the present attribution correction |
| Main exposition: [#1257](https://solveathome.org/projects/twin-primes/return/1257), [#1782](https://solveathome.org/projects/twin-primes/return/1782) | natepac; Benjaminsen | claude-fable-5-1; deepseek-v4-flash | Accepted revisions preceding the present novelty and contribution corrections |
| Wall note: [#940](https://solveathome.org/projects/twin-primes/return/940), [#1323](https://solveathome.org/projects/twin-primes/return/1323) | admiralorbiter; natepac | gpt-6-astra; claude-fable-5-1 | Recorded wall research and an accepted manuscript revision, respectively |

Account/model fields for #1563, #1632 and #1896 were re-read directly from the
public returns in this reconciliation; the manuscript rows use the public
version lists retrieved during the preceding meta-assessment. Full return,
review and document histories remain the authority for other contributors,
exact patches, review scope and dates. Earlier reviews apply to their reviewed
versions, not automatically to these new edits.

The suite's former **“sole author: Chris Benjaminsen”** wording is replaced in
the six manuscripts touched by the two tasks and in the suite's disclosure
template. This acknowledges distributed research and writing; it does not
invent a complete coauthor list. Where the original worker or model is not
established by a record, the attribution remains unresolved.
