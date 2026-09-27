# QC report: compound claims and their decompositions

<!-- ledger
id: Q-qc-compound
status: ANSWERED
todo: none
question: Which named claims are compounds whose parts carry different calibrations, and how should each be decomposed?
verdict: Twelve compounds decomposed and eight examined and left whole, with about 90 corpus sites needing rewording; the test each decomposition must pass is that Proven: <parent> becomes unwritable rather than merely wrong, and the sharpest finding is that natal-cap-28's fully analytic certificate law has no markdown home at all, which is why its status is unfindable.
-->

Wave-1 design document. Diagnosis and design only; no file in the corpus is edited by
this report. Every proposal here is a draft for Chris to accept, amend or reject.

House rule (research/README.md): body = latest full understanding only; history to
research/history/CHANGELOG.md. This file is a staging report, not corpus body text.

## What a compound claim is, for this report

A single **named** object whose parts carry different calibrations, different scopes, or
different levels of verification, such that no summary can cite the name honestly
without reproducing the whole grading. The defect is structural, not careless: once a
conjunction has one name and the name has no status of its own, every summary must
either reproduce the grading or lie.

The test a decomposition must pass: **after the split, "Proven: <parent>" must be
unwritable, not merely wrong.**

## Contents and ranking

Twelve compound claims decomposed, eight examined and deliberately left whole, about 90
corpus sites needing rewording. Ranked by the brief's criterion: how likely the claim is to
mislead someone deciding what to work on next.

| # | compound claim | why it ranks here | parent's fate | sites |
|---|---|---|---|---|
| [CC-1](#cc-1) | **the Fused-Window Calm Lemma** | in `README.md` under "Proven:", four competing status tables, and a refutation no summary carries | RETIRED as a claim name | ~19 |
| [CC-2](#cc-2) | **Assumption A / "TPC is the positivity of one number"** | in `GLOSSARY.md` in bold; a one-way implication written as an identity, and the framework's weakest sufficient target is unadvertised | kept, but never without a form marker | ~9 |
| [CC-3](#cc-3) | **the fully analytic certificate law** (natal-cap-28) | gates two TODO items, has no markdown home, two unproven ingredients and one refutation under one name | RETIRED; "certificate engine" as umbrella | ~7 |
| [CC-4](#cc-4) | **the Origin Excess Lemma** | the campaign's template; five parts at different hypotheses inside one PROVEN box | kept as a two-leg conjunction | ~9 |
| [CC-5](#cc-5) | **`G2-STATE.md`'s ownership table** | `README.md` promises "a calibration marker on every line"; five lines carry two | table discipline, no renaming | ~3 |
| [CC-6](#cc-6) | **the five doors** of `moire-primes.md` §7 | each door fuses mechanism, toll and failure; Door 2's toll is a retracted number | kept, with internal labels | ~5 |
| [CC-7](#cc-7) | **the exponent road / "the one missing ingredient"** | the glossary hands a planner the wrong open object | phrase retired; the real object named | ~6 |
| [CC-8](#cc-8) | **the Unification Law** | "theorem-grade" in a verdict, no marker in the glossary, four explananda | informal umbrella, barred from status lists | ~9 |
| [CC-9](#cc-9) | **the Staircase Theorem** | a paper title fusing an all-q theorem with six-level computations | narrowed to Theorem 3 | ~7 |
| [CC-10](#cc-10) | **the Overshoot Budget + no-fixed-point** | "PROVEN given the measured G₂ law" shared by two arguments; the compound *understates* one | both kept, unfused | ~5 |
| [CC-11](#cc-11) | **the finite-level family** (seven results) | the corpus's most common compound shape; one case may exceed its proof | a level-stamping convention | ~8 |
| [CC-12](#cc-12) | **the Variance Theorem** | a single item in "the proven spine" containing an empirical law and an open question | narrowed to Theorems 1-2 | ~6 |

Then: [left whole](#left-whole) · [unresolved](#unresolved)

<a id="ranked-decompositions"></a>
## Ranked decompositions

Ranked by how likely the claim is to mislead someone deciding what to work on next.

<a id="cc-1"></a>
### CC-1. The Fused-Window Calm Lemma — four legs, three calibrations, one refuted sub-form, and FOUR competing status tables

**Rank 1.** Sits in `README.md` under the word "Proven:", and the corpus records its
status in four different documents at four different states of knowledge. This is the
exemplar the campaign was opened on (`qc-status.md` B-2, adjudicated ACCEPTED in
`qc-CAMPAIGN.md`); what follows is the decomposition rather than the one-site fix.

**The parent as it stands.** `research/natal-cap-19-calm-lemma.md`:90 states it as a
four-leg conjunction "for every scour prime q at level x", legs graded
PROVEN / PROVEN / MEASURED / MEASURED. Three later documents each restate the same
four-leg table with a different grading:

| status table | date-state | grading it records |
|---|---|---|
| `natal-cap-19-calm-lemma.md`:90-111 | first | (i)(ii) PROVEN, (iii)(iv) MEASURED |
| `natal-cap-23-covadj-proof.md`:164-187 | second | (iii) split into iii-a PROVEN / iii-b CERTIFIED @11–@19 / iii-c OPEN; **and the uniform-in-q form of (iii) is REFUTED** |
| `natal-cap-26-minus-half.md`:154-176 | third | iii-c reduced to "G30_agg(x) < 1/2" |
| `natal-cap-30-skeleton-bound.md`:110-123 | current | (iii) THEOREM at listed levels, all-x OPEN at Prop C; (iv) MEASURED, "no proof mechanism in sight" |

**The naming failure, stated exactly.** Four separately-proved objects
(Mirror-Sibling Identity, Fusion Identity, the W/2 doubling lemma, the Minus-Half
Theorem, the Skeleton Collapse Theorem) already have their own names in the corpus and
their own proofs. The parent name adds nothing but a conjunction, and the conjunction is
the only thing a summary can copy. So the summary copies a name whose weakest leg is
MEASURED and whose second-weakest leg contains a REFUTATION, and puts it under "Proven".

**Correction to the brief and to `qc-status.md`.** The brief and
`natal-cap-30-skeleton-bound.md` both say leg (iii) is a theorem at `x = 11..23`
(five levels). `qc-CAMPAIGN.md` records that `natal-cap-36-skeleton-door.js --at29` was
re-run and reproduces G30_agg = 0.1176 at @29, so the correct scope is **six levels,
@11 through @29**. The decomposition below uses the six-level scope. Note also that the
brief's phrase "anchored typicality about 0.94" is right, and its four-leg summary
omits the most decision-relevant fact in the whole object: **the uniform-in-q form of
leg (iii) is refuted, not open** (`natal-cap-23-covadj-proof.md`:178). Nobody reading
`README.md`, `GLOSSARY.md` or `TODO.md` can currently learn that.

#### (a) The sub-claims

| # | proposed name | calibration | exact scope | home |
|---|---|---|---|---|
| 1 | **Mirror-Sibling Identity** (exists) | PROVEN | every scour prime q, every level x | `research/natal-cap-19-calm-lemma.md` §Lemma 1 |
| 2 | **Fusion Identity** (exists) | PROVEN | every scour prime q, every level x: dev(0,q) is ONE cyclic window of length L_q ≈ 2W/q | `research/natal-cap-19-calm-lemma.md` §Lemma 2 |
| 3 | **Mirror-Phase Doubling Lemma** (coined; currently "Lemma 3", unnamed) | PROVEN | every scour prime q, every level x: dev(W/2,q) = 2 × one window | `research/natal-cap-19-calm-lemma.md` §Lemma 3 |
| 4 | **Minus-Half Theorem** (exists) | PROVEN, exact | the −1/2 anticorrelation constant is exact; deviation from it is a closed two-class correlation sum with non-skeleton mass q-uniformly bounded | `research/natal-cap-26-minus-half.md` §Thm 2, Props 3–4 |
| 5 | **Skeleton Collapse Theorem** (exists) | PROVEN | all x, all q: the 2ⁿ branch ledger reduces to one kernel K = 15C − 2P | `research/natal-cap-30-skeleton-bound.md` §Theorem A |
| 6 | **Aggregate 30-Skeleton Bound** (exists as "Thm B") | CERTIFIED (exact integer inequality, finite) | G30_agg < 1/2 at SIX levels @11 @13 @17 @19 @23 @29; values 0.2132, 0.1113, 0.1011, 0.1259, 0.0945, 0.1176; margins 0.29–0.41 at @11..@23 and 0.3824 at @29 | `research/natal-cap-30-skeleton-bound.md` §Theorem B + `natal-cap-36-skeleton-door.js` |
| 7 | **Skeleton Equidistribution Conjecture** (coined; currently "Prop C's blocking term" / "iii-c") | OPEN, door named | the all-x form of #6: equidistribution of ⌈W/q⌉ mod 30 over the scour primes | `research/natal-cap-30-skeleton-bound.md` §Prop C, `natal-cap-36-skeleton-door.md` |
| 8 | **Uniform-in-q Anticorrelation** | **REFUTED** | per-prime Cov_adj < 0 for *every* scour q is false: 4 exceptions in 599 primes @11–@19, one more (q = 2339) at @23, cataloged as skeleton resonances | `research/natal-cap-23-covadj-proof.md`:175-179, `natal-cap-30-skeleton-bound.md` §Prop D |
| 9 | **Anchored Typicality Measurement** (coined; currently leg (iv), unnamed) | MEASURED, no proof mechanism | Σdev(0,q)²/ΣV_fused = 0.935 @13, 0.939 @17; position percentile 47.9%/47.8%; @19 rank 14 of 9,699,690 | `research/natal-cap-19-calm-lemma.md` leg (iv) |

Naming notes. #3, #7 and #9 are the only coinages, and each states its claim rather
than its campaign. #9 deliberately carries its calibration inside the name: a summary
cannot write "Proven: the Anchored Typicality **Measurement**" without the sentence
visibly contradicting itself. #8 is not a new result — it is a refutation the corpus
already owns and never surfaces above the leaf note, which is the reason it needs a name.

#### (b) What the parent name means afterwards

**RETIRE "the Fused-Window Calm Lemma" entirely as a claim name.** It is not kept as a
defined conjunction, because a defined conjunction whose status is its weakest leg would
still be a citable object called a *Lemma*, and the word Lemma is what invited "Proven".

**Keep "the anchored calm" as an informal umbrella for the phenomenon**, which is
exactly what `research/GLOSSARY.md`:221-226 already does: *"the measured fact that the
anchor sits in the extreme low tail…"*. That entry is correct today and needs only a
pointer to the status table. The rule to write down beside it: **"the anchored calm" is
a phenomenon, never a claim, and may not appear in any list headed Proven, Theorems, or
the proven spine.** The decomposition of the phenomenon is
`(#2 fusion) × (#4,#5,#6 anticorrelation) × (#9 typicality)`, and that product is a
description of a measurement, not a theorem.

Test applied: after the split, the only way to write "Proven: …" about this material is
to name #1–#5, which are proven at all x and all q. There is no name left that spans a
proven leg and an unproven one.

#### (c) The status table (this is the artifact the corpus is missing)

| sub-claim | status | scope | home |
|---|---|---|---|
| Mirror-Sibling Identity | PROVEN | all x, all scour q | `research/natal-cap-19-calm-lemma.md` §Lemma 1 |
| Fusion Identity | PROVEN | all x, all scour q | `research/natal-cap-19-calm-lemma.md` §Lemma 2 |
| Mirror-Phase Doubling Lemma | PROVEN | all x, all scour q | `research/natal-cap-19-calm-lemma.md` §Lemma 3 |
| Minus-Half Theorem | PROVEN, exact, no error term | every level, every q coprime to 30 | `research/natal-cap-26-minus-half.md` §Thm 2 |
| Skeleton Collapse Theorem | PROVEN | all x, all q | `research/natal-cap-30-skeleton-bound.md` §Thm A |
| Aggregate 30-Skeleton Bound | CERTIFIED, exact integer inequality | six levels @11..@29 only | `research/natal-cap-30-skeleton-bound.md` §Thm B |
| Skeleton Equidistribution Conjecture | OPEN, door named, and the door reaches ~10% of the mass | all x | `research/natal-cap-36-skeleton-door.md` |
| Uniform-in-q Anticorrelation | **REFUTED** | 5 counterexample primes known | `research/natal-cap-23-covadj-proof.md`:175-179 |
| Anchored Typicality Measurement | MEASURED, no proof mechanism in sight | @13, @17, @19 | `research/natal-cap-19-calm-lemma.md` leg (iv) |

Read at a glance: the mechanism is proven, the size of the mechanism's effect is
certified at six computed levels, its uniform-in-q form is false, its all-x form is
open behind a door that reaches a tenth of the mass, and the step that connects the
mechanism to the anchor is a measurement with no proof route.

#### (d) Every site that refers to the parent, and what it should say

| site | current | replacement |
|---|---|---|
| `README.md`:53-59 | "The natal-cap campaign … added nine more: … the Fused-Window Calm Lemma …" under "**Proven:**" | Apply `qc-status.md` B-2's text, amended: the leg-(iii) scope is **x = 11..29**, not 11..29-or-23; and add the refutation, "**and its uniform-in-q form is refuted**". Do not name a "Fused-Window Calm Lemma" at all; name the Skeleton Collapse Theorem and the Minus-Half Theorem in the proven list, and the anchored calm in a following sentence as a measured phenomenon with a pointer to the status table. |
| `research/GLOSSARY.md`:221-226 ("The anchored calm") | correct as MEASURED | keep, append: `Decomposed into nine separately-named sub-claims with separate statuses: see research/anchored-calm.md. "The anchored calm" names the phenomenon and is not a claim; there is no "Fused-Window Calm Lemma" (retired 2026-08-17, research/history/CHANGELOG.md).` |
| `research/GLOSSARY.md`:215-220 ("Fused window") | "Proven (natal-cap-19-calm-lemma.md)" | correct; add `= the Fusion Identity + the Mirror-Phase Doubling Lemma` so the glossary term and the claim names line up |
| `research/GLOSSARY.md`:236-241 ("The skeleton") | "certified in exact BigInt at @11 through @23" | `@11 through @29 (six levels)`; and name the two objects separately: `Skeleton Collapse Theorem (PROVEN, all x all q)` and `Aggregate 30-Skeleton Bound (CERTIFIED at six levels; the all-x form is the Skeleton Equidistribution Conjecture, OPEN)` |
| `research/sift-limit-attack.md`:157 | table row `Fusion / anchored calm (**PROVEN (i),(ii); MEASURED (iii),(iv)**, cap-19/23/26)` | `Fusion / anchored calm (**PROVEN**: Fusion Identity, Mirror-Phase Doubling, Minus-Half, Skeleton Collapse; **CERTIFIED at six levels**: Aggregate 30-Skeleton Bound; **MEASURED**: Anchored Typicality — see `research/anchored-calm.md`)`. The current row is stale in the conservative direction: it grades leg (iii) MEASURED when it is a proven theorem plus a six-level certificate. |
| `research/natal-cap-19-calm-lemma.md`:90 heading | "## The Fused-Window Calm Lemma (status: two legs proven, two measured)" | "## What Lemmas 1–3 do and do not give" — keep the four-leg exposition as the *derivation* of the anchored calm, drop the parent name and the status verdict, and point at `research/anchored-calm.md` for status. The superseded grading goes to CHANGELOG. |
| `research/natal-cap-23-covadj-proof.md`:164-187 | "## Consequence: corrected status of the Fused-Window Calm Lemma" + full table | delete the table (it is a superseded state → CHANGELOG); keep the two things this file uniquely owns, namely the Props 1–5 proofs and **the refutation of the uniform-in-q form**, and promote the refutation to a named boxed statement so it stops being a clause inside a status block |
| `research/natal-cap-26-minus-half.md`:154-176 | "## Consequence: status of the Fused-Window Calm Lemma" + full table | same: delete the table, keep the Minus-Half Theorem and the reduction of iii-c to `G30_agg < 1/2`, point at `research/anchored-calm.md` |
| `research/natal-cap-30-skeleton-bound.md`:110-123 | current authority table, five-level | delete the table (it moves to `research/anchored-calm.md`), leaving Thms A/B and Props C/D in place; the six-level correction from `qc-status.md` F-1 is applied in the new home rather than here |
| `research/natal-cap-30-skeleton-bound.md`:1 (title) | "leg (iii) of the calm, closed at every computed level" | "The Aggregate 30-Skeleton Bound — certified at every computed level, @11..@29". "leg (iii)" is meaningless once the parent is retired. |
| `research/natal-cap-26-minus-half.md`:1 (title) | "The Minus-Half Theorem — leg (iii) of the calm, aggregate form" | "The Minus-Half Theorem — the exact −1/2 anticorrelation constant" |
| `research/natal-cap-23-covadj-proof.md`:1 (title) | "Cov_adj < 0 — the anticorrelation leg of the Fused-Window Calm" | "Cov_adj < 0 — anticorrelation proven in aggregate, refuted uniformly in q" |
| `paper/anchored-note.md`:375-405 | "**The anchored-calm lemma, two legs from closed.**" … "So the leg is a theorem for x ≤ 23" … "the deepest level also the lowest" | rename the paragraph "**The anchored calm, and which of its parts are theorems.**"; `x ≤ 23` → `x ≤ 29`; add the sixth value 0.1176; **delete "the deepest level also the lowest", which is false once @29 is included** (the minimum is 0.0945 at @23 — already flagged in `qc-CAMPAIGN.md`); add one sentence that the uniform-in-q form is refuted and only the aggregate form is claimed; drop the word "lemma" from the object. |
| `paper/anchored-note.md`:180 | "since part-proven: the fusion identity and the exact −1/2 anticorrelation" | correct as written; no change beyond checking it does not say "the lemma" |
| `TODO.md`:168-189 (item 4) | "the calm's last analytic step" | "the last analytic step of the Aggregate 30-Skeleton Bound (the Skeleton Equidistribution Conjecture)". TODO's numbers are already correct at six levels and need no other change. |
| `research/natal-cap-31-calm-vs-kill.md`:107 | "the Cov_adj < 0 leg cap-23" | "the Cov_adj < 0 aggregate result, cap-23" |
| `research/SCRIPTS.md`:190,193,197 | script headers say "the calm's leg (iii)" | **generated file — do not hand-edit.** Fix the three script header banners in `natal-cap-23/26/30-*.js`, then regenerate with `node research/gen-scripts-index.js`. |
| `research/maier-matrix.md`:215 | "Head-calm lemma of ZONE-POSTULATE.md §6" | unrelated object (see "left whole" below); no change |

#### (e) File split

**Warranted, and it is the load-bearing part of this decomposition.** One new parent
document:

```
research/anchored-calm.md          (new, ~60 lines: the status table of (c),
                                    the nine names, and one paragraph each on
                                    what the phenomenon is and what is not proven)
  ├── research/natal-cap-19-calm-lemma.md   Lemmas 1-3 (#1,#2,#3) + the typicality measurement (#9)
  ├── research/natal-cap-23-covadj-proof.md Props 1-5 + the REFUTATION (#8)
  ├── research/natal-cap-26-minus-half.md   Minus-Half Theorem (#4)
  ├── research/natal-cap-30-skeleton-bound.md Skeleton Collapse (#5) + Aggregate Bound (#6) + Prop D
  └── research/natal-cap-36-skeleton-door.md  Skeleton Equidistribution Conjecture (#7), and why the door reaches ~10%
```

Crosslinks: the parent lists each child with the sub-claim it owns; each child opens
with one line, `Status of this result and of the anchored calm as a whole:
[research/anchored-calm.md](anchored-calm.md).` `README.md`, `GLOSSARY.md`,
`TODO.md` item 4, `sift-limit-attack.md`:157 and `paper/anchored-note.md` §10 all point
at the parent rather than at a child, which is what stops the next summary from
inventing a conjunction.

Why a new file rather than a section of `natal-cap-30`: the status table has been
rewritten four times as the campaign advanced, and each rewrite left the previous one
in a working document. A table that is *expected* to be revised needs a home whose only
job is to hold it, so the next revision replaces it rather than adding a fifth copy.
This also removes four near-duplicate status blocks from four leaf notes, which is a
duplication win on `qc-CAMPAIGN.md`'s test: the second, third and fourth tellings add
nothing a reader of the parent does not have.

<a id="cc-2"></a>
### CC-2. Assumption A / "the whole Twin Prime Conjecture is the positivity of this one number" — one name over four inequivalent statements, and a one-way implication written as an identity

**Rank 2**, and it outranks everything below because this is the claim a reader uses to
choose what to prove. It sits in `research/GLOSSARY.md` (the file `README.md` says to
read first), in `README.md` §Status, in `paper/anchored-note.md` §§7-9, in
`paper/moire-primes.md` §7A Face 1, and in `TODO.md` items 7 and X.

**The parent as it stands.** `research/GLOSSARY.md`:201-214 carries two entries,
**Anchored bias β(x)** and **Assumption A**. The β entry states, in bold:
*"**The whole Twin Prime Conjecture is the positivity of this one number**"*. The
Assumption A entry then says the sharp form is HL-equivalent and the weak form is
parity-blocked. So the glossary contains both the inflation and its own correction,
three lines apart, and the bolded sentence is the one a summary copies.

**Two distinct defects, and they pull in opposite directions.**

1. **A sufficient condition written as an identity.** What is proven
   (`paper/anchored-note.md` §7, Theorem (conditional)) is *liminf β > 0 ⟹ TPC*. The
   converse is nowhere proven or claimed; a grep for a converse returns nothing. So
   Assumption A is **at least** as strong as TPC and possibly strictly stronger, and
   "TPC **is** the positivity of β" asserts an equivalence from an implication. This
   makes the target look easier than it is.
2. **The corpus's own weakest sufficient statement is not the one the glossary
   advertises.** `paper/anchored-note.md` §8 Proposition 2 (PROVEN): *if S(x) ≥ 1 for
   infinitely many x, twin primes are infinite* — no density, no positivity, no
   exponent. The note is explicit that this is "the weakest target a proof in this
   framework must hit", and that at @41 the measured margin is S = 256,725,962,834
   against the needed 1. **That statement appears in no summary document.** A planner
   reading the glossary aims at a positive-proportion HL lower bound; the corpus
   already knows the minimum target is one survivor infinitely often.

#### (a) The sub-claims

| # | proposed name | calibration | exact scope | home |
|---|---|---|---|---|
| 1 | **Anchored Sufficiency Theorem** (coined; currently "Theorem (conditional)", unnamed) | PROVEN | liminf β > 0 ⟹ infinitely many twins, with x₁ computable from (c, x₀) | `paper/anchored-note.md` §7 |
| 2 | **Non-Annihilation Sufficiency** (coined; currently "Proposition 2", and it is the weakest sufficient statement) | PROVEN | S(x) ≥ 1 for infinitely many x ⟹ infinitely many twins | `paper/anchored-note.md` §8 |
| 3 | **Assumption A (weak form)**, β ≥ c | OPEN, and **parity-blocked at every known input including GEH** | all large x | `paper/anchored-note.md` §9; `research/bv-import-survey.md`:301 |
| 4 | **Assumption A (sharp form)**, β → e^{2γ}/4 | OPEN for d = 2, and **algebraically equivalent to Hardy-Littlewood on the 11/17 comb**; NOW-provable on average over the comb family | d = 2 vs the family | `paper/anchored-note.md` §9; `research/bv-import-survey.md`:302 |
| 5 | **X-Channel Restatement of Assumption A** | RESTATEMENT, MEASURED support only | the anchored overlap-credit deficit stays below (1−ε)·S̄ | `research/natal-cap-31-calm-vs-kill.md`; `paper/anchored-note.md`:408-423 |
| 6 | **Anchored bias β(x)** | MEASURED, ten levels, W to 3.04·10¹⁴, descending 1.156 → 0.846 | a definition plus a measurement, not a claim | `paper/anchored-note.md` §§3, 6 |

#### (b) What the parent name means afterwards

**Keep "Assumption A" as a name, because the papers use it and `GLOSSARY.md`:214 rightly
says to keep it — but only ever with a form attached.** The rule to write into the
glossary: **"Assumption A" alone is not a statement; every occurrence carries `(weak
form)` or `(sharp form)`.** A summary that writes "Assumption A" bare is then visibly
incomplete rather than quietly ambiguous.

**Retire the sentence "The whole Twin Prime Conjecture is the positivity of this one
number" wherever it appears without a direction marker.** It is not a name, so it cannot
be retired as one; the fix is to make the implication's direction part of the sentence
everywhere.

This decomposition does not weaken anything: #1 and #2 are proven and stay proven, and
#2 is *stronger* framing than the corpus currently advertises, because it names a target
strictly weaker than the one the glossary points at.

#### (c) The status table

| sub-claim | status | scope | home |
|---|---|---|---|
| Anchored Sufficiency Theorem | PROVEN | one direction only: β-positivity ⟹ TPC | `paper/anchored-note.md` §7 |
| Non-Annihilation Sufficiency | PROVEN | one direction only; the weakest sufficient statement in the framework | `paper/anchored-note.md` §8 |
| Assumption A, weak form | OPEN, parity-blocked | β ≥ c for all large x | `paper/anchored-note.md` §9 |
| Assumption A, sharp form | OPEN at d = 2; equivalent to HL on the comb | β → e^{2γ}/4 | `paper/anchored-note.md` §9 |
| X-Channel Restatement | RESTATEMENT (measured support) | same content, different channel | `paper/anchored-note.md` §10 |
| β(x) itself | MEASURED, 10 levels | definition + trajectory, not a claim | `paper/anchored-note.md` §3 |
| converse (TPC ⟹ β > 0) | **NOT CLAIMED, NOT PROVEN** | — | nowhere |

#### (d) Every site, and what it should say

| site | current | replacement |
|---|---|---|
| `research/GLOSSARY.md`:205-206 | "**The whole Twin Prime Conjecture is the positivity of this one number**" | "**Positivity of this one number implies the whole Twin Prime Conjecture** (the Anchored Sufficiency Theorem, PROVEN, `paper/anchored-note.md` §7). The converse is not proven and is not claimed, so Assumption A is at least as strong as TPC and may be strictly stronger. The framework's *weakest* sufficient statement is weaker still: one anchored survivor at infinitely many levels (Non-Annihilation Sufficiency, PROVEN, §8)." |
| `research/GLOSSARY.md`:211-214 | "Assumption A — the positivity of β … Its sharp form … its weak form …" | keep, and add the standing rule: "Never write `Assumption A` without `(weak form)` or `(sharp form)`: the two have different statuses and different obstructions." |
| `research/GLOSSARY.md` (new entry) | absent | add **Non-Annihilation Sufficiency** as its own glossary entry. It is the lowest bar in the programme and it is currently findable only inside a paper section. |
| `README.md`:71-77 | "the whole conjecture is the positivity of the anchored bias β(x) … That positivity is priced honestly at Hardy-Littlewood strength." | correct in spirit; make the direction explicit — "positivity of β would prove the conjecture (proven implication, one way)" — and add one clause naming the weaker sufficient target so the entry point does not point only at the hardest form. |
| `paper/anchored-note.md`:296-299 | "The entire Twin Prime Conjecture, in this framework, lives inside that single ratio." | acceptable inside a section that has just proved the one-way implication; tighten to "…lives inside that single ratio, in the sense that positivity suffices; no converse is claimed." |
| `paper/moire-primes.md`:528-531 | "Assumption A, the positivity of β, is Hardy-Littlewood-strength input. Its sharp form … is algebraically equivalent to the HL asymptotic …; its weak form is a …" | correct; this is the best form in the corpus. No change. |
| `research/bv-import-survey.md`:301-302 | verdict rows, both forms, separately | correct; this is the authority for #3 and #4 and should be cited from the glossary |
| `TODO.md`:212-221 (item 7) | "Assumption A priced as HL-strength" | add: "and the weakest sufficient statement, Non-Annihilation Sufficiency, is the target no item currently attacks" — that is a live route the summary layer buries |
| `research/natal-cap-31-calm-vs-kill.md`:119 | "Assumption A relocated, not …" | correct; mark the restatement as a restatement, not a reduction |

#### (e) File split

**Not warranted.** All six sub-claims already live in `paper/anchored-note.md` §§3, 7, 8,
9, 10, in that order, and the note reads as one argument. The defect is entirely in the
summary layer. The only structural change is two new `GLOSSARY.md` entries
(Non-Annihilation Sufficiency; and a form-marker rule on Assumption A), plus the
crosslink from the glossary to `research/bv-import-survey.md` §5's verdict table, which
is the authority for the two forms' obstructions and is currently uncited from the
glossary.

<a id="cc-3"></a>
### CC-3. "The fully analytic certificate law" (natal-cap-28) — one proven theorem, two named unproven ingredients, one refutation and a deep extrapolation, all under one name, and the name has no markdown home at all

**Rank 3.** `TODO.md`:255-266 opens item 8 with *"natal-cap-28 **closed** the analytic
certificate"*, and item 11 offers three write-ups against it. Those are the two TODO
items a planner would pick up next, and the object they rest on is a script header.

**The parent as it stands.** `research/natal-cap-28-analytic-certificate.js` lines 1-70,
titled "THE FULLY ANALYTIC CERTIFICATE LAW". **There is no `natal-cap-28-*.md`.**
`research/SCRIPTS.md`:195 lists it with an empty description column and "cited by
`TODO.md` +5 more". So the corpus's most heavily-conditional composite object has its
only prose statement inside a script comment, which `research/README.md`'s reading path
does not send anyone to.

**Correction to the brief.** The brief pairs "the certificate law and the Buchstab
transfer" as one example of proven-modulo-an-unproven-ingredient. It is worse than that:
there are **two** independent unproven ingredients, not one, and the script names both.
`TODO.md`:307 knows this ("one of cap-28's two unproven ingredients"); `TODO.md`:255
does not ("the certificate law's one heuristic").

#### (a) The sub-claims

| # | proposed name | calibration | exact scope | home |
|---|---|---|---|---|
| 1 | **Certified-Head Theorem** (exists as "Result 1"; README calls it the Legendre-comb head certificate) | PROVEN, explicit error term | `|cap₂(q) − main| ≤ 2^{j+1}(2·3^k + 1)`; covers 20–30% of Σcap₂ at @23, share grows with x | `natal-cap-28-*.js` Result 1 (needs an md home) |
| 2 | **Window Dilation Lemma** (exists, cap-12 L1) | PROVEN | dilation preserves comb type and census | `research/natal-cap-12-overlap-sign.md` |
| 3 | **Comb Discrepancy Lemma** (exists as "cap-25's 2·3^k lemma") | PROVEN | each Legendre term off its share by at most 2·3^k; measured slack ~30× | `research/natal-cap-25-excess-law.js` |
| 4 | **Tail Comb Equidistribution** (coined; currently "UNPROVEN equidistribution") | **OPEN, and the obvious tool is vacuous** — combined modulus is W itself, so Brun–Titchmarsh says nothing | q³ > W+1 | script Result 1 TAIL |
| 5 | **Tail Envelope Measurement** (coined) | MEASURED | aggregate |err| 0.0–1.1% of tail mass | script Result 1 TAIL |
| 6 | **Buchstab Transfer** (exists) | **HEURISTIC**: ω(u) itself is a theorem, the transfer to the conditioned ensemble is not | shifted rough pairs; NOW-provable at y = T^{o(1)}, open at y = T^{1/u} with u bounded | script Result 2; `research/bv-import-survey.md`:307-308 |
| 7 | **Pair-Correlation Hypothesis for the deep-K deviation** | **REFUTED** | X₂ small and sign-varying, X₃ as large as X₂; the deviation is all-orders | script Result 2 |
| 8 | **Priced-Deviation Measurement** (coined) | MEASURED | max err 3.4% → 0.2% @23, 4.1% → 0.9% @19, 3.4% → 0.6% @17 | script Result 2 |
| 9 | **Deep-Level K\* Predictions** (coined) | PREDICTED, conditional on #4 and #6 | @37/@41/@53/@97, W to ~2.3·10³⁶; K*(37) = 431; K*(29) = 69 matches measurement | script Result 3 |

#### (b) What the parent name means afterwards

**Retire "the certificate law" and "the fully analytic certificate law" as claim names,
and never write "closed" of this object.** Nine parts at five calibrations, of which one
is REFUTED and one is a set of predictions at levels no computation reaches, cannot share
a name. Keep **"the certificate engine"** as an informal umbrella for the *machinery*
(#1–#3 plus the Li-integral evaluator), with the rule that the engine's *outputs* (#9)
carry the status of their weakest input, which is #6, HEURISTIC.

Test applied: "Proven: the certificate law" becomes unwritable because no object of that
name exists; the only proven names are the three lemmas and the Certified-Head Theorem,
each with its scope attached. `README.md`:58 currently names exactly the proven leg, so
this decomposition costs the README nothing and gains the two open ingredients a name.

#### (c) The status table

| sub-claim | status | scope | home |
|---|---|---|---|
| Certified-Head Theorem | PROVEN, explicit error | head only, 20–30% of Σcap₂ at @23 | new md, from script Result 1 |
| Window Dilation Lemma | PROVEN | all q coprime to the comb | `natal-cap-12-overlap-sign.md` |
| Comb Discrepancy Lemma | PROVEN | all levels | `natal-cap-25-excess-law.js` |
| Tail Comb Equidistribution | OPEN; Brun–Titchmarsh vacuous at modulus W | tail regime q³ > W+1 | new md |
| Tail Envelope Measurement | MEASURED | @13..@23 | new md |
| Buchstab Transfer | HEURISTIC (ω(u) proven; the transfer is not) | NOW at y = T^{o(1)}; OPEN at bounded u | new md + `bv-import-survey.md` §3.3 |
| Pair-Correlation Hypothesis | **REFUTED** | all orders contribute | new md |
| Priced-Deviation Measurement | MEASURED | @17, @19, @23 | new md |
| Deep-Level K* Predictions | PREDICTED, conditional on two open ingredients | @37..@97 | new md |

#### (d) Every site, and what it should say

| site | current | replacement |
|---|---|---|
| `TODO.md`:255 (item 8 title) | "Prove the Buchstab transfer (**the certificate law's one heuristic**)" | "Prove the Buchstab transfer (**one of the certificate engine's two unproven ingredients**; the other is Tail Comb Equidistribution, item 11c)" |
| `TODO.md`:256 | "natal-cap-28 **closed** the analytic certificate" | "natal-cap-28 **assembled** the certificate engine: the Certified-Head Theorem is proven with an explicit error term, and the engine's deep-level outputs rest on two unproven ingredients and one measured envelope" |
| `TODO.md`:262-266 | items (a)(b)(c) already list both ingredients correctly | no change; this is the one site that is right |
| `README.md`:58 | "the Legendre-comb head certificate" inside "Proven:" | rename to the home's own name, "the Certified-Head Theorem (the head only, 20–30% of Σcap₂ at @23)". Correct as to status; the scope qualifier is what is missing. |
| `research/bv-import-survey.md`:167, 212-218, 307-308 | correctly split by regime | no change; this is the authority for #6, and the new md must cite it |
| `research/SCRIPTS.md`:195 | empty description column | add a banner title to `natal-cap-28-analytic-certificate.js` (it is one of the three scripts with no banner title per `qc-CAMPAIGN.md`), then regenerate the index |
| `research/GLOSSARY.md` | no entry for the certificate engine, the Certified-Head Theorem, the Buchstab transfer or Tail Comb Equidistribution | add one entry for the engine, pointing at the new md's status table. Four objects that gate two TODO items are absent from the glossary. |

#### (e) File split

**Warranted: one new file, and it is the missing prose home rather than a split.**

```
research/certificate-engine.md   (new: the status table of (c), the three proven
                                  lemmas by reference, the two open ingredients
                                  stated as named conjectures, the refutation,
                                  and the deep-level predictions marked conditional)
  ← natal-cap-28-analytic-certificate.js   (code + output stay as they are; add the
                                            banner title and a pointer to the md)
  → research/natal-cap-12-overlap-sign.md  (#2)
  → research/natal-cap-25-excess-law.js    (#3)
  → research/bv-import-survey.md §3.2, §3.3 (#4, #6 verdicts)
  → paper/staircase-note.md                (cap₁/cap₂/cap_K, the object being certified)
```

Do not move the script's READINGS block: `qc-CAMPAIGN.md` decision U5 exempts script
readings, and the pasted output is the provenance. The new md restates the *claims* with
statuses and points at the script for the numbers.

<a id="cc-4"></a>
### CC-4. The Origin Excess Lemma — a proven identity, a hypothesis-dependent characterisation, a non-vacuity condition, a corollary with its own threshold, and an independent no-go, all inside one boxed "Lemma (PROVEN, VERIFIED 14/14)"

**Rank 4.** Not because it is stated badly — `qc-status.md` §7 correctly records that all
five sites carry the three-hypothesis form and the ≈2.2 ceiling, and they do. It ranks
here because it is the **template** the campaign is working from, because it is the one
place where the decomposition has already been checked by computation, and because the
boxed statement at `research/maier-matrix.md`:198-208 still fuses parts whose hypotheses
differ, so the next summary can pick the box and drop the paragraph beneath it.

**Correction to the brief.** The brief says the verification script "is in the scratchpad
as `oel-hypotheses.js`". It is not in this session's scratchpad; it belongs to an earlier
session's directory. The decomposition below is reconstructed from
`research/origin-excess.md` §6 (a)/(b)/(c) and `research/maier-matrix.md` §4, which carry
the same five parts in prose, so nothing depends on recovering the script — but the
script should be copied into `research/` under the house convention if its result is to
be cited, since a claim verified by a file in a temporary directory has no provenance.

#### (a) The sub-claims

| # | proposed name | calibration | exact scope | home |
|---|---|---|---|---|
| 1 | **Origin Count Identity** | PROVEN | `#(A ∩ [0,S)) = D_y(S) − L`. Needs **no hypothesis**: verified to hold outside the lemma's stated range | `research/maier-matrix.md` §4 |
| 2 | **Late-Strike Characterisation** | PROVEN, and this is the real content | a y-rough m ≤ y′² is struck by a prime in (y, x] only if m is itself prime in (y, x], or m = y′² with y′ ≤ x. **Needs S ≤ y′²**; verified to fail outside it | `research/maier-matrix.md` §4 |
| 3 | **Non-Vacuity Condition** | PROVEN, and it is a constraint rather than a result | the lemma says something only if y′² > x, because D_x(S) = 0 for all S ≤ x; at S = y′² ≤ x it reads 0 = 0 | `research/origin-excess.md` §6(a) |
| 4 | **Origin Excess Corollary** | PROVEN, positive only below a threshold | `origin ≥ D_y(y′²) − 2(π(x) − π(y) + 1)`, positive only for x < x\* with ln x\*/ln y ≈ 1.44, flat over nine levels | `research/origin-excess.md` §6(b) |
| 5 | **Origin Advantage Ceiling** | PROVEN (from #3 + #4), MEASURED maximum 1.372 over 14 cells | the origin beats the ensemble mean by a factor of at most **about 2.2**, for S ≤ y′² | `research/origin-excess.md` §6(b), `maier-matrix.md` §4 |
| 6 | **Scale Collision No-Go** | PROVEN, independent of the lemma | y < x with x prime ⟹ y′² < x′² strictly: the two regimes never touch, and no better lemma repairs it | `research/origin-excess.md` §6(c), `maier-matrix.md` §5 |

#### (b) What the parent name means afterwards

**Keep "the Origin Excess Lemma" as a defined conjunction of #1 + #2 only**, which is
what the boxed statement actually proves, at the scope `y < x, y′² > x, S ≤ y′²`. Both
legs are PROVEN, so the parent's status is PROVEN and no leg borrows anything.

**Move #3, #4, #5 and #6 out of the parent.** #3 is a hypothesis, not a part; #4 is a
corollary with its own threshold; #5 is the number everyone actually quotes; #6 is a
separate theorem about the parameters that the lemma's name currently shelters.

Test applied: "Proven: the Origin Excess Lemma" stays **true** after the split, and it
stops implying the origin has a usable advantage, because the usable-advantage claim now
has its own name (#5) carrying "at most about 2.2" inside it. The failure this prevents
is the opposite of B-2's: not an unproven leg borrowing PROVEN, but a proven leg being
read as more useful than it is. The corpus already avoids it at four sites by repeating a
whole paragraph; naming #5 replaces four copies of a paragraph with one citable name.

#### (c) The status table

| sub-claim | status | scope | home |
|---|---|---|---|
| Origin Count Identity | PROVEN, no hypothesis needed | all y < x, all S | `maier-matrix.md` §4 |
| Late-Strike Characterisation | PROVEN | requires S ≤ y′²; false outside it | `maier-matrix.md` §4 |
| Non-Vacuity Condition | PROVEN (constraint) | requires y′² > x, else 0 = 0 | `origin-excess.md` §6(a) |
| Origin Excess Corollary | PROVEN | positive only for x < x\*, ln x\*/ln y ≈ 1.44 | `origin-excess.md` §6(b) |
| Origin Advantage Ceiling | PROVEN ≤ ~2.2; MEASURED max 1.372 (14 cells) | S ≤ y′² | `origin-excess.md` §6(b) |
| Scale Collision No-Go | PROVEN | y < x, x prime | `origin-excess.md` §6(c) |

#### (d) Every site, and what it should say

| site | current | replacement |
|---|---|---|
| `research/maier-matrix.md`:198-208 (the box) | "**Origin Excess Lemma (PROVEN, VERIFIED 14/14).** Let y < x with y′² > x … and a y-rough integer m ≤ y′² is struck … only if …" | split the box in two: **Origin Count Identity** (no hypothesis) and **Late-Strike Characterisation** (needs S ≤ y′²), with the hypothesis attached to the leg that needs it rather than to the pair |
| `research/maier-matrix.md`:214-216 | "This is the Head-calm lemma of `ZONE-POSTULATE.md` §6 in the two-level form." | keep; it is a correct identification and it is the crosslink that stops the two names diverging |
| `research/maier-matrix.md`:224-234 (the three-hypothesis paragraph + the 2.2 box) | correct, and repeated at three other sites | replace the *repeats* with a citation of the new name, **Origin Advantage Ceiling**; keep the full derivation at `origin-excess.md` §6, which is its home |
| `research/maier-matrix.md` reading 3 (:548) | full restatement | cite the Ceiling by name |
| `research/origin-excess.md` §6 heading | "The three hypotheses of the Origin Excess Lemma, only one of which was written down" | "The Origin Excess Lemma's hypotheses, its corollary's threshold, and the ceiling they force" — and name (a) (b) (c) as the Non-Vacuity Condition, the Origin Excess Corollary + threshold, and the Scale Collision No-Go |
| `research/origin-excess.md` §9 | full restatement | cite by name |
| `research/ZONE-POSTULATE.md`:284-297 | full restatement | cite the Ceiling by name, keep the one sentence about what it means for the strong form |
| `research/G2-STATE.md`:750 | "the Origin Excess Lemma \| PROVEN, VERIFIED 14/14 \| its ceiling at about 2.2 and the reversal to ρ(2) = 0.79305 …" | split into two rows: the Lemma (PROVEN) and the Origin Advantage Ceiling (PROVEN ≤ 2.2, MEASURED max 1.372). See CC-5: this table promises one calibration per line. |
| `research/GLOSSARY.md` | no entry | add **Origin Advantage Ceiling** — the number four documents quote is not in the glossary |

#### (e) File split

**Not warranted, and deliberately so.** The material is already split the right way:
`maier-matrix.md` §4 owns the lemma, `origin-excess.md` §6 owns the hypotheses and the
ceiling. What is missing is naming and de-duplication, not files. Add the reciprocal
crosslink `origin-excess.md` §6 → `maier-matrix.md` §4 (present) and
`maier-matrix.md` §4 → `origin-excess.md` §6 (present at :233) — both directions already
exist, so this decomposition is cheap: four paragraph-length repeats collapse to one name
plus one pointer.

<a id="cc-5"></a>
### CC-5. `research/G2-STATE.md`'s ownership table — the document `README.md` advertises as having "a calibration marker on every line" has five lines carrying two objects or two calibrations

**Rank 5.** `README.md`:19 sends readers to `G2-STATE.md` as *"Everything known about G₂,
the central object, **with a calibration marker on every line**"*. That promise is the
reason the table is trusted, and it is the reason a compound row there is worse than a
compound row anywhere else: the reader has been told not to check.

**The parent as it stands.** `research/G2-STATE.md`:735-760, the "Ours, at the calibration
marked" table. Five rows are conjunctions:

| row | what is fused | why it matters |
|---|---|---|
| "the two-class discrepancy ΔΦ₂, its ×3 ceiling, and the identity R_k(p) → k+1" — **PROVEN + MEASURED** | three objects, and the calibration cell is itself a conjunction | the reader cannot tell which of the three is proven |
| "the Overshoot Budget, and the four-hypothesis form of the no-fixed-point argument" — **PROVEN given the measured G2 law** | two independent arguments, one shared conditional status | see CC-11 |
| "Facts A and B, and the two-class Localized Merge Lemma" — **PROVEN** | three objects, all proven but at different scopes, and the mechanism attribution (Holt and Rudd) applies to a subset | attribution and scope both flatten |
| "the two-class driving-term lemma, and its refutation as a route" — **PROVEN** | a lemma and a refutation share a PROVEN cell | "PROVEN" reads as though the route works |
| "the Origin Excess Lemma" — **PROVEN, VERIFIED 14/14**, note column carries the 2.2 ceiling and the ρ(2) reversal | the ceiling and the reversal are separate results parked in a note column | see CC-4 |
| "route A's shadow implication into the explicit one-class Jacobsthal bound" — **PROVEN as an implication** | correct, but the note says "see the loose end in §5", so the row's usability is elsewhere | mild |

#### (a)-(c) The decomposition, and the rule that prevents recurrence

There is no new mathematics here and no new naming beyond CC-4's and CC-11's. The fix is
a **table discipline**, stated once at the head of the table and then enforced:

> **One object per row, one calibration per cell. A row whose subject contains the word
> "and" is a defect. A calibration cell containing "+" or "given" names a second object
> that needs its own row.**

Applied, the five rows become eleven:

| new row | status | scope |
|---|---|---|
| the two-class discrepancy ΔΦ₂ | PROVEN | as stated at its home |
| the ×3 ceiling on ΔΦ₂ | MEASURED | the computed range |
| the identity R_k(p) → k+1 | PROVEN | all k, all p |
| the Overshoot Budget | PROVEN **conditional on the measured G₂ law** | x = 11..37, the reachable ladder |
| the no-fixed-point argument, four-hypothesis form | PROVEN | accumulating-index chains; does **not** reach re-basing recursions |
| Fact A | PROVEN | two-class; mechanism Holt and Rudd |
| Fact B | PROVEN | two-class; loose by 3.5×–6.7× at a single fold |
| the two-class Localized Merge Lemma | PROVEN | the localized-window application is on Holt's own open-problem list |
| the two-class driving-term lemma | PROVEN | as stated |
| the driving-term route | **REFUTED** | as a route to a bound |
| the Origin Excess Lemma / the Origin Advantage Ceiling | PROVEN / PROVEN ≤ ~2.2 | see CC-4 |

#### (d) Sites

The table is the site. Two downstream consequences:

- `README.md`:19's promise becomes true rather than aspirational, so no change is needed
  there — but if the discipline is not adopted, `README.md`:19 should drop the phrase
  "with a calibration marker on every line", because five of about 24 rows do not have one
  marker, they have two.
- `research/GLOSSARY.md` should gain entries for the two rows that are currently findable
  only inside a table cell: the **×3 ceiling on ΔΦ₂** and the **driving-term route's
  refutation**. A refutation that lives in a note column is a refutation someone re-runs.

#### (e) File split

**Not warranted.** The table is the right length and the right place. This is a row-level
edit and a stated discipline, nothing more.

<a id="cc-6"></a>
### CC-6. The five doors and the four faces of `paper/moire-primes.md` §§7, 7A — each door fuses a proven mechanism, a measured toll and a failure point under one number, and Door 2's toll is a retracted number

**Rank 6.** `README.md`:71-72 advertises the survey: *"It is surveyed at five doors and
located on four faces with coordinates."* `qc-status.md`'s own coverage note says a second
pass should start here, "because a paper draft is the one place a scope error becomes a
false claim". `qc-papers2.md` already found the two content defects (P-1 Door 2, P-11
Door 5) and they are adjudicated; this entry is about the **shape** that let them survive.

**The parent as it stands.** Each door is a single paragraph fusing three things at three
calibrations, with no internal labels:

| door | mechanism | toll | failure point |
|---|---|---|---|
| 1 Legendre's budget | exact inclusion–exclusion, PROVEN | 2·3ⁿ error terms; certified ±1,062,882 against signal 50 at p = 41; observed cancellation ~2 — MEASURED | lower bound never survives the budget — PROVEN |
| 2 Fourier budget | transform factors over primes, PROVEN | "grows like 2ⁿ" and "misses the p = 11 zone by only 18%" — **RETRACTED**: both come from `attack-04`'s invalidated certificate column, and the corrected `natal-cap-02` reverses the conclusion (at x = 11 even an oracle fails, cap 117.3 vs N = 90) | parity survives — PROVEN |
| 3 moment ceiling | sub-Poisson, Gaussian moments, PROVEN | 1.6·10⁻⁴ at p = 19, 57× beyond Chebyshev — CERTIFIED at that level | each degree costs ~5μ without reaching zero — MEASURED |
| 4 removal ledger | capacity exceeds census, PROVEN + machine-verified | 1,699 kills vs 1,485 slots at T₁₃; overrun ~2 ln x — MEASURED | scarcity route dead; the thin-band variant needs the equidistribution problem — PROVEN |
| 5 coverings | Hough / BBMST settle the infinite version, PROVEN (**for distinct moduli only**) | adversary short of the zone by ~p/ln p — INFERRED | our classes {0, −2 mod q} use each modulus twice, so the cited theorems **do not apply**; KKL 2024 is the theorem that does, with no numeric constant at s = 2 |

**The structural point.** A door is not a claim, it is a route plus a price plus an
obstruction, and the three have different statuses in every one of the five cases. Because
they are fused, Door 2's retracted toll sat inside a paragraph whose mechanism and failure
point are both fine, so nothing about the paragraph looked wrong. The same fusion is why
Door 5's mechanism (a real theorem about coverings) lent its authority to a translation
the theorem does not license.

#### (a)-(b) The decomposition

**Keep all five door names — they are good names and the survey is a real contribution —
but give each door three labelled parts.** Proposed uniform shape, applied to all five:

> **Door N — <name>.** **Mechanism** (status): … **Toll** (status, level): … **Where it
> stops** (status): …

The parent "Door N" then means the route, never a result; and "the five doors" in
`README.md` means a surveyed perimeter, which is what it is. No door may be cited for a
number without the Toll label, and a Toll is always level-stamped. Door 2's Toll becomes,
per `qc-papers2.md` P-1: **Toll (RETRACTED; corrected value)** — the 2ⁿ growth and the 18%
near-miss came from `attack-04`'s invalidated column; `natal-cap-02` shows the per-prime
union bound is structurally dead from x = 11 on, and the real near-miss is 15% at x = 7 and
moot. Door 5's Toll becomes **INFERRED, no numeric constant available at multiplicity 2**,
citing KKL 2024.

Test applied: "Proven: Door 2" is unwritable because a door has no status; only its three
labelled parts do, and the Toll carries its own word.

**The four faces of §7A already do this correctly** and should be the model: Face 1 marks
its parts "(proven)", "(proven)", "(proven, with the pricing measured)" and "(proven in
part, measured in part)" separately within the face. That is exactly the discipline §7's
doors lack, in the same file, forty lines apart. One further note: `paper/anchored-note.md`
:501 lists "Proposition 1" inside "the proven layer", while §7A Face 1 and
`anchored-note.md`:504 both say part (ii) extrapolates measured trends. Fix
`anchored-note.md`:501 to "the proven layer around it (the moments, **Proposition 1's part
(i)**, the W/2 mechanism, Lemmas 1 and 2)".

#### (d) Sites

`paper/moire-primes.md` §7 (all five door paragraphs), `README.md`:71-72 (no change needed
once the doors are labelled — "surveyed at five doors" is accurate), `paper/PAPERS.md`
(check that its door summary inherits the labels), `paper/anchored-note.md`:501 (above).
`research/attack-04-fourier-budget.js` keeps its correction banner untouched per
`qc-CAMPAIGN.md` U5.

#### (e) File split

**Not warranted for the doors** — five paragraphs in one section is the right size, and
`qc-arch.md` was accepted on the view that `moire-primes.md`'s problem is not this section.
The labelling is the whole fix.

<a id="cc-7"></a>
### CC-7. The exponent road — "Lemma V", the Gaussian maximal law, the theta ladder and the decoupling targets are four objects sharing one story, and the glossary hands the reader the wrong one

**Rank 7.** This is `qc-status.md` A-1 and `qc-papers2.md` P-3, both accepted and both with
replacement text already written. It appears here because the underlying shape is a
compound claim and fixing the two sentences does not fix the shape.

**The parent as it stands.** "The exponent road" / "TODO item 0" bundles:

| # | proposed name | calibration | exact scope | home |
|---|---|---|---|---|
| 1 | **β₂ bound** G₂(x#) ≪_ε x^{4.2665+ε} | PROVEN | all x | `paper/beta2-note.md` |
| 2 | **Lemma V** | NEEDED, NOT PROVEN — **and off the working point** | stated for s from ~0.63u to u−ε, i.e. s ≤ u | `research/sift-limit-attack.md` §§3, 4.5 |
| 3 | **Gaussian Maximal Law for the interval sawtooth** | NEEDED, NOT PROVEN — **this is the operative assumption** | the measured working point s/u ≈ 1.2–1.25 | `research/sift-limit-attack.md` §3; `research/theta-ladder.md` §5b |
| 4 | **Theta ladder (conditional column)** | CONDITIONAL on #3 | θ = 2.482 at z = 47, rising 0.57 per unit ln z | `research/theta-ladder.md` §§2-3 |
| 5 | **Exact theta suprema** | VERIFIED, unconditional | complete periods to z = 31, prefix bounds to z = 71 | `research/theta-ladder.md` §5b; `G2-STATE.md`:753 |
| 6 | **Decoupling payoff scale** | ARITHMETIC consequence, not a result | partial decoupling past θ = 1.2417 beats 4.2665; full decoupling gives 1 + √e ≈ 2.649; below 2 is TPC | `research/sift-limit-attack.md` |

**What the compound costs.** `research/GLOSSARY.md`:265-271 names #2 as "the one missing
ingredient on the exponent road". Four documents including the home say the missing
ingredient is #3 and that #2 would not reach the regime. A reader who plans from the
glossary spends the day on a lemma whose stated range excludes the working point. This is
the single most expensive misdirection in the corpus for a planner, and it is exactly the
brief's criterion.

**(b) The parent's fate.** **Retire "the one missing ingredient" as a phrase.** There are
two unproven ingredients on this road and they are not interchangeable: #3 is the whole
price and #2 is a statement about a different range. Keep "the exponent road" as an
informal umbrella (a route, not a claim). Rename nothing else; #2 and #3 already have
statements, #3 just has no name — coin **Gaussian Maximal Law for the interval sawtooth**
and put it in the glossary, since `qc-papers2.md` P-3 records that the phrase "maximal
law" appears in **no paper file at all**.

**(d) Sites.** `research/GLOSSARY.md`:265-271 (apply `qc-status.md` A-1's replacement text
verbatim); a **new** `GLOSSARY.md` entry for #3; `research/ZONE-POSTULATE.md`:231-236
(A-1's second replacement); `paper/moire-primes.md` §7A Face 4 (P-3: delete "exactly one
ingredient, which we name Lemma V", name both); `TODO.md`:60-66 (already correct — the one
site that states it right, and `research/theta-ladder.md`:570-572 says TODO 0's "two open
items are not independent halves", which TODO has since absorbed); `research/THE-DIALS.md`
(check dial 6/7 wording inherits the correction).

**(e) File split.** Not warranted. `sift-limit-attack.md` and `theta-ladder.md` already
own #2–#5 correctly; the defect is entirely in the glossary and one paper section.

<a id="cc-8"></a>
### CC-8. The Unification Law — one name over a closed form, a Buchstab continuation, four separate explananda, an inferred argmin and an HL conditionality

**Rank 8.** In `research/GLOSSARY.md`:154-159 with **no calibration marker**, in
`research/ATTACKS2.md`:24 as "theorem-grade", and used as a factual input at
`research/FOLD-PROFILE.md`:169. `qc-status.md` B-1, C-4 and C-5 all landed on this object
and all three fixes are accepted; what remains is that the object is a conjunction, and a
single calibration marker on the glossary entry will still be the wrong shape.

**The parent as it stands.** ρ(u) = e^{2γ}/u² for u ≤ 2, continuing as (e^γω(u))² on
2 ≤ u ≤ 3, pinned to 1 beyond, "explaining" four things.

#### (a) The sub-claims

| # | proposed name | calibration | exact scope | home |
|---|---|---|---|---|
| 1 | **Pair-Buchstab Density Curve** | DERIVED, **Hardy-Littlewood-conditional**; ω(u) is Buchstab's (prior art) | ρ(u) = (e^γω(u))² on 2 ≤ u ≤ 3 | `research/ATTACKS2.md` #3, #5; `paper/moire-primes.md` §4 |
| 2 | **Inverse-Square Head Law** | DERIVED, HL-conditional | ρ(u) = e^{2γ}/u² for u ≤ 2 | same |
| 3 | **One-Percent Agreement** | MEASURED to ~1% at every grid point tested | the computed grid; re-measured VERIFIED at 15 levels (`origin-excess.md`:730) | `research/ATTACKS2.md` #5 |
| 4 | **Zone-Edge Trough** e^{2γ}/4 = 0.793055 | value follows from #2 at u = 2; the **argmin at u = 2 is INFERRED, not proven** | u = 2 | `research/origin-excess.md`:34-38 ("is not proven here") |
| 5 | **Head Cap** e^{2γ} = 3.172, and mortal | MEASURED, and the mortality (crash to 0 as p_n → x) is measured | u → 1 | `research/anchored-windows.md` §3 |
| 6 | **Kill-Shadow Absorption** | DERIVED — the historical "kill shadow" ≈ 0.85 is the curve's first-octave average, so it is **not a separate object** | first octave | `research/ATTACKS2.md` #5 |
| 7 | **p³ Equidistribution Law** | MEASURED (the three-phase head life) | u ≥ 3 | `research/anchored-windows.md` §3 |

**(b) The parent's fate.** **Keep "the Unification Law" as an informal umbrella and bar it
from status lists**, exactly as with the anchored calm. Its content is #1 + #2 (a curve),
its evidence is #3 (a measurement), and #4–#7 are the four things the curve accounts for,
each with its own status. The name's value is real — it is what collapsed four objects into
one, and #6 is a genuine deletion of a separate object — so retiring the name loses
something. Barring it from status lists loses nothing.

Test applied: "theorem-grade: the Unification Law" is unwritable once the name denotes an
umbrella and #1/#2 carry "DERIVED, HL-conditional" in their own names' entries.

**(d) Sites.** `research/GLOSSARY.md`:154-159 (apply C-5's marker, then split the entry so
the curve and the four explananda are visibly different kinds of thing);
`research/ATTACKS2.md`:24-27 (apply B-1's replacement verbatim, which already says "It is
not a theorem"); `research/ATTACKS2.md`:13, :15 (add the conditionality marker to #5's
"DONE, CLOSED" row); `research/FOLD-PROFILE.md`:169 (apply B-1's second fix);
`research/origin-excess.md`:34-38 (home, correct — keep the "is not proven here");
`paper/moire-primes.md`:294-305 (best form in the corpus, no change);
`paper/anchored-note.md`:224, :279 ("consistent with", "the Unification-Law zone-edge
value" — both correct); `research/PRIOR-ART.md`:318-334 (authority for the ω(u)
attribution, cite it from the glossary).

**(e) File split.** Not warranted. One glossary entry becomes two (the curve; what it
explains), and that is the whole structural change.

<a id="cc-9"></a>
### CC-9. `paper/staircase-note.md` — the title fuses a theorem at all q with computational floors at six levels, and the note's one non-elementary ingredient sits in a different theorem again

**Rank 9.** A paper title is a status claim, and `README.md`:30 reproduces it
("Per-prime hard caps on the Scour, and certified twin floors").

**The parent as it stands.** Title: *"The Staircase Theorem: per-prime hard caps on the
Scour, and certified twin floors"*. `README.md`:55 lists "the Staircase Theorem" under
"Proven:". The note's own status block is careful and says most of this already, which is
why this ranks below the entries above — the defect is that one name spans it all.

#### (a) The sub-claims (all already numbered in the note; only the naming is missing)

| # | proposed name | calibration | exact scope | home |
|---|---|---|---|---|
| 1 | **Cofactor Rigidity Lemma** (exists, Lemma 1) | PROVEN, elementary | every scour prime q, every fresh strike | §2 |
| 2 | **Self-Strike Classification** (exists, Lemma 2) | PROVEN, elementary | at most one self-strike per q; only residues 11, 13, 17, 19 mod 30 can graduate | §3 |
| 3 | **Staircase of Hard Caps** (exists, Theorem 3) — this is *the* Staircase Theorem | PROVEN, elementary | every scour prime q, all x ≥ 7; three regimes, (iii) a definition rather than a claim | §4 |
| 4 | **Pigeonhole Corollary** (exists, Corollary 4) | PROVEN, and **it never closes on cap₁ alone** (Σcap₁/N = 3.2–8.0) | any family of per-prime upper bounds | §4 |
| 5 | **Survivors-Are-Twins Lemma** (exists, Lemma 5) | PROVEN, elementary | all x ≥ 7 | §5 |
| 6 | **Tail Theorem** (exists, Theorem 6) | PROVEN, **and it is the note's only non-elementary ingredient** (PNT + Mertens; finite instances explicit by Rosser–Schoenfeld) | asymptotic, tail q > (W+1)^{1/3} | §6 |
| 7 | **Ladder Monotonicity** (exists, Proposition 7) | PROVEN | every K ≥ 0 | §7 |
| 8 | **Certified Twin Floors** (exists, Theorem 8, marked "computational") | CERTIFIED at **six levels only**, @11..@29, floors 34 / 110 / 82 / 1877 / 4841 / 31327, with a stated moduli pool per level | §7 | 

**(b) The parent's fate.** **Keep "the Staircase Theorem" as the name of #3 only**, which
is what its home already does (Theorem 3, §4). Stop using it as shorthand for the note.
The note's subject is "per-prime hard caps and what they certify"; its results are the
eight above. Rename the note's title to drop the implication that one theorem covers both
halves: *"Per-prime hard caps on the Scour: the staircase, the tail, and certified twin
floors"* — three objects, three names, one of which is asymptotic and one of which is
finite-level.

Test applied: "Proven: the Staircase Theorem" stays true and now means exactly Theorem 3.
"Proven: certified twin floors" becomes unwritable because #8's name carries CERTIFIED and
its scope carries six levels.

**(d) Sites.** `paper/staircase-note.md`:1 (title, as above); `README.md`:30 (map row,
inherit the new title); `README.md`:55 ("the Staircase Theorem" under Proven — correct
once the name means #3; no change needed, which is worth recording as a *non*-defect);
`research/FOLD-PROFILE.md`:568 ("The Staircase Theorem does certify survivors …" — check
this means #8 rather than #3, and if so say #8); `research/bv-import-survey.md`:155, :345
("the Staircase Theorem's injection", "the staircase theorems they extend" — the second is
plural and vague; name #3 and #6); `research/NATAL-CAP-CAMPAIGN.md`:46, :83 (campaign rows,
historical; leave per `qc-history.md`'s finding that these are framing, but check the
"HEADLINE" row's floors are the six-level list); `paper/PAPERS.md` (check the note's
one-line description).

**(e) File split.** **Not warranted, and the note is a good counter-example to the
splitting instinct.** 537 lines carrying eight numbered results with proofs, an honesty
section and a reproduction section is a coherent paper. Splitting it would separate #3 from
#4, which is the only reason #3 is interesting. Naming is the whole fix.

<a id="cc-10"></a>
### CC-10. The Overshoot Budget and the no-fixed-point argument — "PROVEN given the measured G₂ law" is a status that cannot be inherited, and two arguments share it

**Rank 10.** `research/G2-STATE.md`:365-375 and :743. It ranks here rather than higher
because both statements are honest at their home; the risk is inheritance, since
"PROVEN given the measured G₂ law" abbreviates to "PROVEN" in one careless copy.

#### (a) The sub-claims

| # | proposed name | calibration | exact scope | home |
|---|---|---|---|---|
| 1 | **Overshoot Budget** | PROVEN as an implication; its *input* is MEASURED | any valid chain of upper bounds ending in G₂(x#) < x² has total multiplicative overshoot capped at x²/G₂(x#) | `research/gate-multiplies.md` §5, `G2-STATE.md`:365 |
| 2 | **Measured Slack Ladder** | MEASURED | ln(x²/G₂(x#)) = 1.058, 0.940, 0.984, 0.878, 0.953, 1.182, 1.016, 0.953 across x = 11..37 | `G2-STATE.md`:368-372 |
| 3 | **Predicted Slack Asymptote** | PREDICTED, unproven | ln(1/0.55) = 0.598 nats | `G2-STATE.md`:373 |
| 4 | **No-Fixed-Point Argument, four-hypothesis form** | PROVEN | closes accumulating-index chains and A4's tile analogue; **does not reach** a recursion that re-bases at every fold | `G2-STATE.md`:352-361 |
| 5 | **Three Escapes** | PROVEN as a classification, and all three are occupied | exact identity; B-free per-fold cost; re-basing (the u-frame recursion escapes via this) | `G2-STATE.md`:358-361 |

**(b) The parent's fate.** **Split the shared row (see CC-5) and keep both names.** The
Overshoot Budget is a proven implication whose hypothesis is a measurement over eight
levels; write its status as **"PROVEN as an implication; the number it is applied with is
MEASURED at x = 11..37"** rather than "PROVEN given the measured G₂ law", because the
second form invites a reader to treat the conjunction as one proven fact and to extrapolate
the ladder. #4 is unconditionally proven and should not share a cell with #1 at all — it is
the stronger of the two and currently borrows a conditional marker it does not need. **This
is a case where the compound understates**: separating them makes the corpus stronger, not
weaker.

**(d) Sites.** `research/G2-STATE.md`:365-375 (the boxed statement: separate the proven
implication from the measured ladder and the predicted asymptote);
`research/G2-STATE.md`:743 (split into two rows per CC-5);
`research/gate-multiplies.md` §5 (home; confirm it separates them — it is the authority);
`TODO.md` item 0b (checked by `qc-status.md` §5 and consistent);
`research/GLOSSARY.md` (no entry for either; add one for the Overshoot Budget, since it is
the argument that closes a whole class of routes and a planner needs it to avoid re-opening
them).

**(e) File split.** Not warranted.

<a id="cc-11"></a>
### CC-11. The finite-level family — seven results proven at listed levels and presented under names that carry no level, plus one whose stated scope may exceed its proof

**Rank 11 as a group, but the group is the corpus's most common compound shape and the
convention below is the cheapest single fix in this report.**

A result certified at six levels and a result proven for all x are different kinds of
object. The corpus proves both, marks the difference correctly at the homes, and then names
them identically, so every summary has to re-supply the scope from memory. Seven instances:

| result | nominal name | actual scope | home |
|---|---|---|---|
| G30_agg < 1/2 | "the Aggregate 30-Skeleton Bound" / "leg (iii) closed" | six levels, @11..@29 | CC-1 #6 |
| certified twin floors | "certified twin floors" | six levels, @11..@29; per-level moduli pool | CC-9 #8 |
| the ensemble bound at @11 | "the first beyond-Chebyshev ensemble **bounds**" (`README.md`:57, plural) | **one bound, @11 only** | `research/natal-cap-21-beyond-chebyshev.md` §Thm 2 |
| G₂ lower bound by construction | "the certified G₂ lower-bound ladder" | sixteen levels, to x = 4001 | `research/two-class-lower-bounds.md` §5 |
| certified occupancy ≥ 99.87% | part of "the Variance Theorem" | at P₉₇# specifically | `paper/variance-note.md` §4 |
| the Zone Postulate, strong form | "the Zone Postulate" | VERIFIED for every prime to 10¹¹ (4,118,054,813 primes) | `research/ZONE-POSTULATE.md`:90 |
| non-annihilation at @11 | "Theorem 1" | @11 only, because H < 1 holds only at @11 (H = 0.789; @13: 1.147, @17: 1.494) | `research/natal-cap-31-calm-vs-kill.md` §Thm 1 |

#### The convention that fixes all seven at once

> **A result established by finite computation carries its scope in its name or immediately
> after it, and the phrases "all x", "every level" and "for all q" are reserved for
> statements proven for all of them. A certified result is never named without its levels.**

Applied: "the Aggregate 30-Skeleton Bound (@11..@29)", "certified twin floors (@11..@29)",
"the beyond-Chebyshev ensemble bound (@11)", "the certified G₂ construction ladder (to
x = 4001)", "the certified occupancy bound (at P₉₇#)", "the Zone Postulate, strong form
(VERIFIED to 10¹¹)", "@11 non-annihilation". Every one of these can then be dropped into a
"Proven:" list without lying, which is the test.

This is not a weakening. Six certified levels of an exact integer inequality is a strong
result and the corpus should say so loudly — `qc-status.md` F-1 found the corpus
*understating* it by a level. The convention protects the strength by making it precise.

#### The one case where the stated scope may exceed the proof — FLAGGED, NEEDS MATH JUDGEMENT

**The X-limitation Theorem.** Three documents state it as *"proven from x = 13 upward"*
(`paper/moire-primes.md`:553, `paper/anchored-note.md`:416, `TODO.md`:230), and
`qc-status.md` B-3 treats x ≥ 13 as the correct scope on the strength of that agreement.
Reading the proof at `research/natal-cap-31-calm-vs-kill.md` §Theorem 2, the argument runs
from L1–L2 and **"the enumerated ensemble maximum of VR"**, with the numbers supplied at
@11 / @13 / @17 only (max VR = 2.78 / 2.35 / 2.14, |D| ≤ 20.5 / 97.8 / 542 against
S̄ = 38.2 / 310.9 / 3614.9). The scaling claim is that the driver S̄/√(K·V̄) = 3.1 / 4.9 / 9.8
"grows with level" — which is measured, over three points, and needs max VR to stay bounded
above, which is also measured.

So the reading to check is: **the X-limitation Theorem is proven at @13 and @17, and its
extension to all x ≥ 13 rests on two measured trends.** If that is right, the name should be
"the X-limitation Theorem (@13, @17)" plus a separately named conjecture for the extension,
and three sites need the qualifier. If there is a general argument bounding max VR that I did
not find, the current wording is correct and this note should be recorded as checked.
**Confidence MEDIUM-HIGH on the reading, and it is a correction to `qc-status.md` B-3's
"Confidence HIGH for X-limitation (three sources agree on x ≥ 13)" — three summaries
agreeing on a scope is not evidence about the proof, and all three summaries descend from
the same home.** I did not open `natal-cap-31-calm-vs-kill.js`.

#### A resolution of one of `qc-CAMPAIGN.md`'s open items, for free

`qc-CAMPAIGN.md` Decision 2 records that `natal-cap-21`'s lines 31 and 141 "both cannot be
the first" and marks the reconciliation NEEDS MATH JUDGEMENT. They are not in conflict; the
ellipsis in `qc-status.md`'s quotation removed the disambiguating clause. Line 141 reads in
full: *"Run @13's T₄ offline (~90 min, parallelizable) → first beyond-Chebyshev bound **at a
level where P(S=0) = 0 is NOT provable by capacity**"*. So there are two distinct firsts:

| # | proposed name | calibration | scope |
|---|---|---|---|
| 1 | **Beyond-Chebyshev Ensemble Bound (@11)** | PROVEN / verified: P(S=0) ≤ 1.49·10⁻⁶ by exact moments 1..6 + Markov | @11, where capacity already gives P(S=0) = 0 |
| 2 | **Beyond-Chebyshev Bound Beyond Capacity (@13)** | status uncertain — see Unresolved | @13, the first level where capacity does not already close it |

`README.md`:57's plural "bounds" should become singular and name #1. Whether #2 now exists
is a question `TODO.md` items 6 and 11 leave ambiguous and is listed under Unresolved.

<a id="cc-12"></a>
### CC-12. The Variance Theorem — five parts under one name, sitting as a single numbered item in "the proven spine"

**Rank 12.** Low because the corpus states it well: `qc-status.md` §7 audited every site
and found no inflation, `paper/variance-note.md`:184 heads the scaling law "(empirical)",
and :208 explicitly retires an earlier "sub-Poisson ≈ 0.2 constant" reading. It appears
here because `research/README.md` item 7 is a single item in a list titled **"The proven
spine (each provable in a paragraph)"**, and that item contains an empirical law and an
open question. The item's own prose supplies every qualifier; the *name* does not, and the
name is what gets quoted.

#### (a) The sub-claims — and the note already numbers them, at §5's (i)/(ii)/(iii)

| # | proposed name | calibration | exact scope | home |
|---|---|---|---|---|
| 1 | **Exact Pair-Correlation Formula** (Theorem 1) | PROVEN, exact, finite-level | the primorial wheel, two classes | `paper/variance-note.md` §2 |
| 2 | **Exact Window-Variance Formula** (Theorem 2) | PROVEN, exact, finite-level; VERIFIED against brute force | same | `paper/variance-note.md` §3 |
| 3 | **Certified Occupancy Bound (at P₉₇#)** | CERTIFIED | ≥ 99.87% of length-p_next² windows mod P₉₇# contain a twin slot; empty-window fraction ≤ 1.3·10⁻³ | `paper/variance-note.md` §4 |
| 4 | **Sub-Poisson Scaling Law** | **EMPIRICAL** | ln(Var/E) ≈ −(0.24u² + 0.13u) at y = 401, y = 199 within 0.02 | `paper/variance-note.md` §6 |
| 5 | **The Var/E limit at u = 2** | **OPEN**, and no finite computation can separate the limit from a slow decay | ≈ 0.611 on current measurement; lnlnW favoured 10:1 | `paper/variance-note.md` §7; `TODO.md` item 9 |

**(b) The parent's fate.** **Keep "the Variance Theorem" as the name of #1 + #2 only** —
two exact formulas, both PROVEN, so the parent is honestly PROVEN. Move #3, #4, #5 out from
under it: #3 is a corollary at one level, #4 is an empirical law, #5 is Paper III's open
question. `research/README.md` spine item 7 then becomes item 7 (the two exact formulas,
proven) plus a following sentence, outside the spine list, carrying #3, #4 and #5 with their
markers. The spine list stops containing an open question.

Test applied: "Proven: the Variance Theorem" is true and means the two formulas. "the
sub-Poisson scaling law" can no longer be reached by citing the Variance Theorem, because it
is no longer part of it.

**(d) Sites.** `research/README.md`:59-67 (split item 7 as above);
`README.md`:29 (map row "Paper III: exact window variance" — accurate, no change);
`research/GLOSSARY.md`:256-264 (the Hyperuniformity entry already carries the drift and the
open limit correctly — no change, and it is the model);
`paper/variance-note.md` §§2-7 (no change: this is the authority and it is right);
`paper/PAPERS.md`:41 (checked by `qc-status.md` §7, correct);
`TODO.md` item 9 (correct).

**(e) File split.** Not warranted. 361 lines, seven sections, one argument.

<a id="left-whole"></a>
## Compound claims found and deliberately left whole

Not every conjunction should be split. These were examined and left alone, with the reason.

**1. The Zone Postulate.** Already decomposed, and correctly: `ZONE-POSTULATE.md`:26 and
:30 state the strong and weak forms as separate boxed statements, :37 proves the weak form
equivalent to TPC in both directions, :48 marks the strong form strictly stronger and :51
says "we must never claim the programme *needs* it". `qc-status.md` §7 checked all 20
outside-home sites and every one keeps the distinction. **The best-maintained object in the
corpus and the model for CC-2.** The only thing added here is CC-11's level stamp on the
strong form's verification (to 10¹¹).

**2. A5's Theorems A, B and C.** Three theorems under one campaign label, and all three are
PROVEN — Theorem A attained with equality at every fold, B the first unconditional bound on
L, C the same argument without adjacency. They differ in *usefulness*, not calibration, and
the corpus already carries that distinction in the exact place it matters:
`gate-multiplies.md`:225 grades them "SURVIVES as a theorem, CLOSED as a supplier". A
uniform-calibration conjunction is not the defect this report is about, and splitting the
label would cost eight citing documents a working shorthand. Leave whole; the "structurally
capped" qualifier at `ATTACKS3.md`:38, `U-FRAME.md`:688-691 and `LOCALIZED-GAP.md`:161-162
is doing the necessary work.

**3. The Deficit Lemma and the Traverse Bound.** The apparent scope difference — home says
"PROVEN, given m̄ ≍ ln²x", `G2-STATE.md`:748 says "PROVEN … unconditionally" — is not a
defect: the same home section states the input is Mertens, so the condition is
unconditional. `qc-status.md` §7 verified this at seven sites. A conjunction whose parts
share both calibration and scope needs no name of its own.

**4. The seven dials, and attacks A1–A10.** These are triage devices and campaign labels,
not claims. "Dial 7" and "A5" name a place to look, and each carries its own landed verdict
at its own site. Naming them as claims would be the opposite error. (Dial 7's content defect
is `qc-status.md` F-2 and is already accepted.)

**5. `research/two-moire-argument.md`:48-50, the perfect-overlap question in three scopes.**
"joint period — impossible (theorem); all integers — impossible (census > 0); inside each
tile window for all large x — this IS TPC in mod-30 costume." Three scopes, three statuses,
one sentence, no shared name. **This is what a correctly-handled compound looks like and it
should be quoted as the house pattern.** Similarly `G2-STATE.md`:607, "lemma **PROVEN**,
route **REFUTED**" — the same object that CC-5 finds fused at :743 is split correctly at
:607, in the same file. The good version already exists; it just is not the one the summary
table uses.

**6. The Copying Theorem, the Redundancy Lemma, Crystallization, Euclid-in-moiré, the Exact
Invariance Lemma, the Survival Quotient Identity, the Seam Lemma, the Gap Reformulation.**
Single statements at a single calibration. Their defect class is attribution, not
compounding, and `qc-status.md` C-1 through C-3 owns it.

**7. House-blindness — left whole, one wording fix.** `README.md`:52 lists it under
"Proven"; `two-moire-argument.md`:44 marks it "(provable, CRT + measured)". The claim is
proven by CRT and the numbers are its verification, so this is not a compound claim. But
`paper/moire-primes.md`:333-338 says CRT forces the strikes to spread "in **exact**
proportion" and then quotes measured kill rates of 68.7% / 69.3% / 69.9%, which differ by
1.2%. The exactness is per-remover; the aggregate rates differ because of overlap. Worth one
clause — "exact per remover; the aggregate rates differ only through overlap" — so a reader
does not take the measurement as a failed test of the theorem. Flagged for the papers axis
rather than decomposed.

**8. The five doors' Mechanism/Toll/Failure shape — labelled, not split.** Recorded here as
well as at CC-6 because the decision went the other way from CC-1: the doors keep their
names and gain internal labels, because a door is genuinely one route and splitting it into
fifteen objects would destroy the survey that is the section's contribution.

<a id="unresolved"></a>
## Unresolved / needs a decision

1. **Does the X-limitation Theorem hold for all x ≥ 13, or at @13 and @17?** CC-11.
   `natal-cap-31-calm-vs-kill.md` §Theorem 2 argues from the *enumerated* ensemble maximum
   of VR, supplied at three levels, and the extension to all x ≥ 13 rests on two measured
   trends (the driver grows; max VR stays bounded). Three documents state "proven from
   x = 13 upward". **This needs a math read of `natal-cap-31-calm-vs-kill.js`, which I did
   not open.** If the reading is right, it is a scope inflation in a paper and it corrects
   `qc-status.md` B-3's confidence. If wrong, record it as checked so nobody re-raises it.
   This is the only item in this report that could change a *paper's* claim, so it should be
   settled before wave 2 touches `paper/moire-primes.md`:553 or
   `paper/anchored-note.md`:416.

2. **Does the @13 beyond-Chebyshev bound exist yet?** CC-11. `TODO.md`:196-203 says the @13
   T₄ gate is MET with six orders to spare and that the remaining work is "the @17 rerun
   itself, which never started", which reads as though @13's bound is computed;
   `natal-cap-21`:141 still lists running @13's T₄ as a next step. If it is computed, it is
   a second named result (Beyond-Chebyshev Bound Beyond Capacity, @13) and belongs in the
   status record. If not, `README.md`:57 goes singular and stays singular.

3. **Where does the new parent file for the anchored calm live, and does the same pattern
   apply elsewhere?** CC-1(e) proposes `research/anchored-calm.md` as a status-only parent
   whose single job is to hold a table that has already been rewritten four times.
   That is a new document *kind* for this corpus, and if it is accepted the same
   pattern is the obvious answer for the certificate engine (CC-3) and possibly for the
   exponent road (CC-7). **Approving or rejecting the kind, rather than the two instances,
   is the decision.** My recommendation: approve, because the alternative is that each new
   result appends a fifth status table to a fifth leaf note.

4. **Naming: `Measurement` and `Conjecture` suffixes as status carriers.** Three of the
   coinages here (Anchored Typicality **Measurement**, Skeleton Equidistribution
   **Conjecture**, Tail Envelope **Measurement**) put the calibration inside the name on
   purpose, so that "Proven: <name>" reads as self-contradictory. This is a naming policy,
   not a local choice, and it cuts against `GLOSSARY.md`'s current habit of naming the
   object and marking the calibration separately. **If you like it, it should be a standing
   rule; if not, these three need calibration-free names and the protection is weaker.**

5. **Does `paper/moire-primes.md` §7's door labelling count as a content edit under the
   moratorium?** CC-6 proposes adding Mechanism / Toll / Where-it-stops labels to five
   paragraphs of the flagship draft, which changes no mathematics but does change how Door 2
   reads once `qc-papers2.md` P-1's retraction lands in the same paragraph. Sequencing
   question for the shepherd: labels first, then P-1's correction, or both at once.

6. **`research/SCRIPTS.md` is generated, and three of my fixes are upstream of it.** CC-1
   and CC-3 both need script *header banners* edited (`natal-cap-23/26/30-*.js` say "the
   calm's leg (iii)"; `natal-cap-28-*.js` has no banner title at all). Editing a script
   header is close to the exemption `qc-CAMPAIGN.md` U5 granted the scripts. My reading is
   that the exemption protects *correction and superseded banners*, not descriptive titles,
   so retitling is allowed and the index is then regenerated. **Confirm.**

7. **Coverage gap in this report, stated plainly.** Twelve compound claims decomposed,
   eight examined and left whole. **Not examined for compounding:** `research/U-FRAME.md`
   §§10-15 (the one-index chain and the misalignment principle — `qc-arch.md` owns the
   restructure and I did not want to design against it), `research/OBSERVATIONS.md` (688
   lines, ten entries with a triage table of their own), the Localized Merge Lemma and Facts
   A/B beyond CC-5's row split, `research/maxgap-law.md`'s `r` term, the Alternation /
   Inertness / Low-Band / Channel / Rigidity / Dilation / Discrepancy Lemmas, and
   `research/exponent-control.md`. Of these I expect **U-FRAME §§10-15 and the Localized
   Merge Lemma** to carry the most, because the one-index chain is where a proven lemma, a
   measured growth law and a refuted route meet, and because
   `research/PRIOR-ART.md` puts part of the mechanism in Holt's hands and part of the
   application on his open-problem list, which is a compound of ownership as well as status.

---

## Corrections to the brief, for the record

1. **Leg (iii) of the calm is a theorem at x = 11..**29**, not 11..23.** The brief and
   `natal-cap-30-skeleton-bound.md` both say 23; `qc-CAMPAIGN.md` records the `--at29`
   re-run reproducing G30_agg = 0.1176. Six levels, not five.
2. **The brief's four-leg summary omits the refutation.** The uniform-in-q form of leg (iii)
   is REFUTED, not open (`natal-cap-23-covadj-proof.md`:178), and that fact reaches no
   summary document in the corpus. It is the most decision-relevant part of the object.
3. **`oel-hypotheses.js` is not in this session's scratchpad.** It belongs to an earlier
   session's directory. The Origin Excess decomposition is reconstructible from
   `origin-excess.md` §6 and `maier-matrix.md` §4 without it, but a claim whose verification
   lives in a temp directory has no provenance under the house rule, so the script should be
   moved into `research/` if it is to be cited.
4. **"The certificate law and the Buchstab transfer" is two unproven ingredients, not one.**
   `TODO.md`:255 says "the certificate law's one heuristic"; `TODO.md`:307 and the script
   both name two.
5. **`natal-cap-28` has no markdown home at all**, which is why "the fully analytic
   certificate law" has no findable status. The brief's seed list includes it implicitly via
   "the certificate law"; the finding is that the document does not exist.
6. **`natal-cap-21`'s two "firsts" are not a contradiction**, resolving one of
   `qc-CAMPAIGN.md`'s NEEDS MATH JUDGEMENT items: the disambiguating clause was lost to an
   ellipsis in `qc-status.md`'s quotation. See CC-11.
7. **The brief's grep hint missed two of the largest compounds**, exactly as it predicted:
   `research/G2-STATE.md`'s ownership table (CC-5) and `paper/staircase-note.md`'s title
   (CC-9) contain no "(i)/(ii)" and no "leg", and the first of them is the document
   `README.md` advertises as carrying a calibration marker on every line.
