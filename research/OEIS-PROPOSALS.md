# OEIS proposals: current disposition and evidence

<!-- ledger
id: Q-oeis-proposals
status: PARTIAL
todo: none
question: Which sequence proposals and OEIS contribution ideas survive the corpus-wide meta-research assessment?
verdict: G2 is retired as A144311+1; the 83# certificate reproduces Wang's 2024 witness and is not an exact next term. The seam count remains a draft with novelty and primality certification open. Other candidates are exploratory or comments on known objects; none was submitted to OEIS.
parity: sequence identification and finite certificate validation; no new asymptotic prime-distribution input
-->

**Updated 27 September 2026. Contributions:** [Benjaminsen](https://solveathome.org/@Benjaminsen)
directed and authorized publication. **Codex (AI assistant)** performed this
reconciliation, searches, checks and drafting; exact model variant not recorded.
Original sequence authors and the recorded workers behind project returns
retain their own credit. See [who did the research](RESEARCH-CONTRIBUTIONS-2026-09-27.md)
for both tasks. This is an author assessment, not an independent review.

The site's **Proposed OEIS sequences** section reads the two structured drafts
below. This register also covers exploratory suggestions in the research
index, glossary, paper plan, attack boards and observation notes. Historical
reviews and recorded script output remain evidence of what was said at the
time; their old readiness or absence language does not override this register.

## Disposition

| Object / owning record | Current status | Evidence and remaining work |
|---|---|---|
| [Twin Jacobsthal G2](oeis-G2-submission.md) | **RETIRED: duplicate** | G2(p_n#)=A144311(n)+1. Carter (2008), Alekseyev (2009) and Wang (2024) own the recorded sequence and extensions. Existing b-file already contains 22 exact terms. |
| 83# covered interval / [checker](verify-prime-cover-83.py) | **KNOWN lower bound, reproduced** | Wang's 26 November 2024 revision-18 discussion supplies the identical start and length. A144311(23)>=1859, hence G2(83#)>=1860. Do not add either bound as an exact term or a new discovery. Maximality remains open. |
| [Closed-cutoff seam twin count](oeis-seam-submission.md) | **DRAFT: novelty unestablished** | No match in this pass's calibrated prefix queries. The family is already studied in A087732, A087904 and A367739. Twenty DATA terms plus ten supplementary terms have probable-prime cross-checks; proof-producing certification remains required. |
| Minimum seam multiplier / [ladder](a060256-seam-ladder.js) | **KNOWN: A060256** | No new sequence. A proposed growth scale and exponential waiting-time model are heuristic comments supported by finite measurements, not a proved asymptotic or distribution law. Source comparison is required before offering a comment. |
| Twin gap word / grain, [glossary](GLOSSARY.md) | **EXPLORATORY** | Fix cyclic starting point, wrap gap, row order, flattening and offset before a sequence search. Compare the one-class gap word A049296 and the sieve-gap literature. No priority or submission-readiness claim survives merely from an earlier negative search. |
| Number of distinct one-class gap sizes per level, [observation](OBSERVATIONS.md) | **EXPLORATORY** | The observation's finite prefix is not an OEIS-ready specification. Establish exact indexing, reproduce terms and search in the reduced-residue gap convention, including shifts and transforms. |
| Natal@5 restricted minimal diameters, [packing note](natal-cap-04-packing-notes.md) | **EXPLORATORY, no submission draft** | Distinct constraints from A008407(2k), not proof of global absence. Preserve the two-class skeleton and distinguish start-span from the union-of-pairs diameter. The packing producer records exact values and separate brackets; its clock-dependence was repaired and the seventeen diameters reproduced (history/staging/defect-repairs.md, item 2). Preserve that exactness scope and specify the full sequence before creating a card. |
| Two-class admissible-word complexity / [source record](history/staging/klz-forward-walk.md) | **EXPLORATORY, dated search only** | One-class comparison is A023192; the historical search tested three indexings. Define combinatorial admissibility separately from actual recurring prime patterns, and establish exact terms before any proposal. The present pass does not revalidate the old broader literature-absence claim. |
| H* Shearer-threshold ladder / [identification record](history/staging/identifications-prior-art.md) | **EXPLORATORY, dated search only** | Preserve the original object's definition and its semiprime-cofactor indexing; do not conflate it with the packing diameter. The historical six-query negative is not a new search or proof of novelty. |
| A059861 asymptotic and [d=2/d=4 bijection](d2-d4-bijection.md) | **EXPOSITION on an existing object** | The census is classical. The d=2/d=4 equality was already recorded by Labos in 2001; the local note supplies a proof and bijection. Its twin-grain analogue is refuted. Any comment must distinguish a supplied derivation from a newly discovered equality. |

## Correcting the 83# attribution

The initial 27 September meta-assessment missed a source already recorded in
this corpus's prior-art notes. Direct retrieval of
[OEIS A144311's revision history](https://oeis.org/history?seq=A144311)
confirms that Jinyuan Wang gave the start
`162791254787456816384305457582341` and length `1859` in the discussion
attached to revision 18, 26 November 2024 at 10:42. The displayed DATA and
b-file still stop at n=22; their omission of a bound does not make that bound new.

Project returns [#1563](https://solveathome.org/projects/twin-primes/return/1563)
(maxime-fleury; deepseek-v4-flash), [#1632](https://solveathome.org/projects/twin-primes/return/1632)
(nielsegberts; gpt-6-astra), and [#1896](https://solveathome.org/projects/twin-primes/return/1896)
(Benjaminsen; claude-opus-5-5) retain credit for their respective certificate work, explicit
interval and translation/provenance analysis. They do not take priority over
Wang's already recorded interval. The meta-assessment's direct modular check
is independent validation of known data. The current assessment, consolidated
manuscript, prior-art summary and outcome register now make this explicit.

## Bounded OEIS search, 27 September 2026

The following queries were sent to OEIS's JSON search endpoint during the
same pass. Every response was HTTP 200; the two positive controls returned
A144311. Empty responses are scoped negatives only.

| Query | Outcome |
|---|---|
| `id:A144311` | A144311; positive control |
| `1,5,11,29,41,65,107,149` | A144311; value-search positive control |
| `2,4,4,3,4,6,2,1,7,1,1,2` | No match: closed-cutoff seam prefix |
| `1,3,4,2,4,6,2,1,7,1,1,2` | No match: open-cutoff seam prefix |
| `4,3,4,6,2,1,7,1,1,2` | No match: closed prefix starting at n=3 |
| `primorial twin count` | Related entries, including A060255 and A088328; no identification of this count |

Direct primary-entry comparisons:

- [A087732](https://oeis.org/A087732), Cami (2003), lists the smaller twin
  members with 0<k<p_(n+1). Our count uses k<=p_(n+1). Its relation to row
  lengths needs the endpoint correction already specified in the draft.
- [A087904](https://oeis.org/A087904), Cami (2003), counts twin pairs at the
  different cutoff 1<=k<p_(n+1)^2, with offset 0. It is related, not identical.
- [A367739](https://oeis.org/A367739), Schoenfield (2023), counts multipliers
  in bit-length bins. This is another existing counting convention for the family.
- [A060256](https://oeis.org/A060256) is the least multiplier, not a count.
- [A144311](https://oeis.org/A144311) already links its 22-term b-file and
  A048670. Those are no longer proposed missing additions. Its dated
  revision discussion supplies the 83# lower bound separately from DATA.

No exhaustive OEIS transform search, MathSciNet/zbMATH review or new primality
certification was performed in this pass. No OEIS edit or submission was made.
The public source links resolve the drafts' old missing-URL obstacle; they do
not resolve correctness, novelty or editorial acceptance.
