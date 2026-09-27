# Quality campaign, 2026-08-17: the consistency pass

<!-- ledger
id: Q-qc-campaign
status: ANSWERED
todo: none
question: What did the 2026-08-17 consistency campaign run, find, decide and apply?
verdict: The shepherd's ledger: Chris's duplication rule and splitting ruling recorded in his words, the qc framework and the provenance index delivered in wave 1, and every partition's results with the decisions that settled them, including two novelty verdicts flagged as publication-track changes.
-->

Chris's charter, in his words: the body of work was built over time with limited
quality control, so it likely carries (1) statements that are no longer true,
(2) duplicated statements, (3) bad ordering and alignment, and (4) non-relevant
data in the core body that should move to history, "to better optimize our body
of work for AI reading and working". The goal is maximum internal consistency
and quality without new edge research. Revalidation of buggy code is allowed,
and so is re-research where a reference's quality is genuinely in doubt.

This file is the shepherd's ledger: what ran, what it found, what was decided,
what was applied. The findings themselves live in the `qc-*.md` files beside it.

## What the campaign inherited

A truth-audit wave ran earlier the same day across seven file partitions
(`audit-campaign`, `audit-spine`, `audit-papers`, `audit-uframe`, `audit-new1`,
`audit-new2`, `audit-numbers`; commits `56bc30f` through `7b36f78`). It worked
file by file, and its fixes are already in the bodies. Two consequences shape
this campaign. Axis 1 has had one pass, so the marginal value there is in what a
per-file method cannot see. Axes 2 and 3 have had no pass at all, and
duplication in particular is invisible to a per-file audit by construction.

Axis 4 has a known unfinished list, recorded in the doc-convention note itself:
the inline corrections in `a3-*.md`, `natal-cap-*.md`, `GLOSSARY.md`,
`OBSERVATIONS.md` and one residual in `U-FRAME.md` were never migrated, because
agents were live against those files when the rule was adopted.

## Wave 1: diagnosis, read-only

Six agents, disjoint by question rather than by file, because contradiction and
duplication only appear across files. None of them may edit an existing file.
Each writes one findings report.

| Report | Question |
|---|---|
| `qc-numbers.md` | Do the recurring load-bearing quantities agree across files, and does each one carry the caveat its home document requires |
| `qc-status.md` | Does every named object have one calibration status across all files, at one scope, with prior art attributed correctly |
| `qc-dup.md` | Where does the corpus say the same thing twice, where should it say it once, and what do the other copies become |
| `qc-history.md` | Which passages and which whole files are process record sitting in working documents, and what must the body say after each one leaves |
| `qc-arch.md` | Entry path, altitude, ordering, ownership boundaries and findability, judged against a fresh agent reaching current understanding at minimum context cost |
| `qc-refs.md` | Do internal references resolve to a file, a section and the claim asserted, and do external citations survive contact with their sources |

Wave 2 applies the findings, partitioned by FILE so no two appliers collide.
Adjudication of conflicts between wave-1 reports happens here, in this file,
before wave 2 launches.

## The governing rule for duplication (Chris, 2026-08-17)

Asked whether a consolidation document should restate a claim or point at it,
Chris ruled:

> "Restating is fine when it actually adds context / learnings. The issue is
> confusing, duplicative or disagreeing facts. The goal is to be able to
> understand as much of this with the highest level of quality at the smallest
> token window."

**This is the test every duplication verdict must pass, and it is not a
line-count test.** The objective is understanding per token, so the question
about any repeated passage is what a reader gains from meeting it a second time:

- **DISAGREEING facts are the top priority, above everything else.** Two places
  stating incompatible things is the defect that costs a reader a day or produces
  a false publication. Every duplication cluster is checked for disagreement
  first, and any found is reclassified as a truth finding immediately.
- **CONFUSING beats merely duplicative.** A restatement that leaves the reader
  unsure which version governs is worse than a longer document that is clear.
  Ambiguity about which document owns a claim is itself a defect.
- **Restatement that adds context or a learning STAYS**, and is not counted as
  waste. Worked example: G2-STATE §4a restates LOCALIZED-GAP's Fact A and Fact B,
  and then adds why the two-class version is cleaner than Holt and Rudd's
  one-class original, the minimum span being p − 2 rather than 2p. The second
  telling teaches something the first does not, so it earns its tokens and stays.
- **Restatement that adds nothing GOES.** Same cluster, different verdict: the
  30-word block at `LOCALIZED-GAP.md` 32-33 and `G2-STATE.md` 314-315 is
  byte-identical and carries no added framing. That is the kill target.
- **Line count is evidence, never the goal.** Do not report a recovered-lines
  total as if it were the win. A cluster that recovers 60 lines by deleting a
  passage a reader needs is a loss, and a 5-line fix that removes a contradiction
  is a large win.

Consequence for the G2-STATE question, now settled: G2-STATE keeps its restated
claims wherever the restatement carries added calibration, context or contrast,
and drops the passages that merely reproduce another document's sentences. It is
not converted into a document of pointers.

## Chris's second ruling (2026-08-17): splitting is allowed, crosslinking is the constraint

> "Our goal is correctness of the body of work for future AI assisted research. …
> Do note where it makes sense to do so, breaking up papers, claims etc into sub
> papers and sub claims is absolutely allowed. This eases token pressure and makes
> things cleaner to read. As long as our md files are internally crosslinked we are
> super happy to move things around. We are by no means at a place where we will
> start publishing papers so everything is a draft and will be condensed down to
> narrow specific papers before release."

**This changes wave 2 from reordering to restructuring.** Consequences that bind every
applier:

- **Splitting a long document into a parent plus sub-documents is a first-class move**,
  not a last resort. The 900-line files (`U-FRAME.md` 967, `paper/moire-primes.md` 928,
  `G2-STATE.md` 884) are candidates. So is splitting a compound claim into sub-claims
  where the parts have different calibrations, which is exactly the Fused-Window Calm
  Lemma's problem: four legs at three different statuses under one name, which is how
  README came to call the whole thing proven.
- **Crosslinking is the safety condition, so `refcheck.js` is the gate.** Every split
  must leave a parent that points at its children and children that point back, and the
  reference check must return zero broken section references before the campaign closes.
  A split that orphans an inbound pointer is worse than the long file it replaced.
- **The 128 inbound pointers into `U-FRAME.md` are the live constraint on how it splits.**
  §5a alone carries 47 and fifteen of the citing artifacts are scripts whose pointers sit
  in pasted output that must not be edited. Splitting is allowed; renumbering §§1-9 is
  still not.
- **Draft status lowers the cost of paper edits but not of P-1.** A false claim in a draft
  is still a false claim, and the whole point of the moratorium is that drafts get fixed
  before they leave.

Three rulings on the specific questions put to Chris:

1. **`research/README.md` becomes the directory's router: APPROVED.** Its current
   prose is an accurate 2026-08-13 summary, so it is moved to `history/` rather than
   deleted, which is precisely what history is for.
2. **Door 5's claim strength after citing KKL: delegated to me.** Decision: cite
   Klein-Koukoulopoulos-Lemieux 2024 as the theorem that actually covers multiplicity
   s = 2, state plainly that no numeric constant is available at s = 2, and reduce Door
   5's claim to what that supports. The door gets weaker and honest. Flagged for an
   expert read before it goes anywhere, per the papers agent.
3. **`research/SCRIPTS.md`: APPROVED, and the reason is provenance**, in Chris's words:
   "we need to be able to point exactly to where our data was generated."

## Delivered during wave 1: the qc framework

Chris, 2026-08-17: "feel free to write yourself a small software library that
enforces these rules where needed. Consider it a self helping software framework."

`node research/qc.js` runs every check in about 0.4 s. `--list` explains what each
one is and which real defect it caught; `--strict` exits non-zero for a hook or CI;
`--index` regenerates the provenance index. Documentation, including the house rules
the framework itself obeys and the known false-positive shapes, is in
`research/qc/README.md`.

**Five checks, each written against a defect found in the wild that day.** The
framework exists because this corpus's characteristic failure is not a wrong number:
it is a claim fixed in the research layer while the summary layer above it goes on
asserting the old thing. Those defects survive every check a careful reader performs,
because the citation resolves, the calibration marker is intact and the numbers agree.
What fails is the relationship between two documents, which is why the checks are
mechanical: a reader holding either document alone cannot see it.

| check | catches | first catch |
|---|---|---|
| `refs` | pointers to a file or section that does not exist | `maier-matrix.md`:282 → `origin-excess.md` §6c, and a dead `attack-06b` shorthand in `THE-DIALS.md`:115 |
| `quotes` | a quotation attributed to a document that no longer contains it | `maxgap-law.md`:502 quotes `two-class-lower-bounds.md` §8 for a "measured law ~1.2 x ln^2 x"; that file contains no 1.2 at all |
| `transfers` | near-duplicate passages that **differ**, where hypotheses go missing | the two dropped qualifiers in `G2-STATE.md` |
| `crosslinks` | a working document nothing points at | clean: all 64 reachable |
| `scripts` | untitled or unreferenced scripts, and surfaces correction banners | 18 banner scripts surfaced; `audit-numbers.js` and `exponent-control.js` have no title |

**Two things the framework caught in its own authors' work, which is the point.**
It flagged `gen-quotecheck.js` as uncited the moment its logic was folded into
`qc/checks.js`, so the redundant file was deleted. And `gen-scripts-index.js`
reported 130 scripts while `qc.js` reported 128, because each walked the tree with
its own idea of what counts as evidence rather than tooling. That is precisely the
two-sources-of-truth defect the campaign is about, so discovery was consolidated into
`qc/corpus.js` and both now report 128.

**Precision was tuned down, not up.** The `quotes` check first reported 12 hits, of
which one was real. Requiring an attribution cue on the *same line* as the quotation
took it to 1 finding, a verified true positive. The earlier ±2-line window bled
across markdown list items and tested a quotation of an external author against a
neighbouring item's citation. That failure mode is recorded in `qc/README.md` so
nobody widens the window back. A false positive costs an applier real time, so
recall was traded for precision deliberately.

## Delivered during wave 1: the provenance index

`research/gen-scripts-index.js` generates `research/SCRIPTS.md` from the script headers,
so the index cannot drift from the scripts. Regenerate with
`node research/gen-scripts-index.js`. It reports 129 scripts, and it surfaces two things
deliberately rather than hiding them:

- **The 18 scripts whose header carries a CORRECTION or superseded banner get their own
  section at the top of the index.** This follows the ruling that scripts are exempt from
  history-migration because such a banner is the only guard between a reader and a
  runnable wrong number. `attack-04-fourier-budget.js`, the source of the P-1 false claim
  in Door 2, is cited by 8 documents and now appears in that list.
- **The 3 scripts with no banner title at all**, including `exponent-control.js`, which is
  cited by 28 documents and is the most-referenced script in the corpus without one. A
  wave-2 item.

**Correction to `qc-arch.md`, established by computation here.** The report claims 129
scripts have no index and "19 are reachable only by `ls`". The index part was true. The 19
is **wrong: there are zero orphans.** Tested three ways, each stricter than the last: full
basename match, word-boundary match, and word-boundary match restricted to *working*
documents with `research/history/` excluded, which is the operationally relevant test since
a fresh agent is told not to read history. All three return 0. Every one of the 129 scripts
is cited by at least one working document by filename or canonical shorthand. The index is
still worth having for provenance and for the correction banners, but not for rescuing lost
scripts, because none were lost.

## Wave 2: the apply phase, partitioned by file

Diagnosis is complete: nine reports, 7,489 lines, committed at `4293686` with not one
body document edited. Wave 2 applies them. **Partitioned by FILE, not by finding**, so
no two appliers can touch the same document.

| partition | owns | principal work |
|---|---|---|
| A | `G2-STATE.md`, `LOCALIZED-GAP.md`, `maier-matrix.md`, `origin-excess.md` | the two dropped qualifiers; the Origin Excess Lemma split by logical type; §6c |
| B | `U-FRAME.md`, `ATTACKS3.md`, `gate-multiplies.md` | the §§10-15 restructure; the rho statistic; O1's dead quotation |
| C | `paper/*.md` | Door 2 (the false claim), Door 5 and KKL, Face 4, §8 vs Face 2, "matching" |
| D | `README.md`, `research/README.md`, `GLOSSARY.md`, `TODO.md`, `THE-DIALS.md`, `THE-LENS.md`, `ZONE-POSTULATE.md`, `FOLD-PROFILE.md` | the entry path; Lemma V; dial 7; TODO 000b and the G2(41#) repricing |
| E | `covering-dive.md`, `two-class-lower-bounds.md`, `PRIOR-ART.md`, `sift-limit-attack.md`, `theta-ladder.md`, `maxgap-law.md`, `dhr-verification.md` | the FKMPT constant 6 and the corrigendum; Fan-Pomerance; Holt AND Rudd |
| F | `natal-cap-*.md`, new `anchored-calm.md` | the compound-claim decompositions |
| G | everything remaining | the residual history migration and the OEIS off-by-one |

**CHANGELOG has a single owner and it is not the appliers.** Every partition generates
entries for `research/history/CHANGELOG.md`, which would collide. Each writes its
entries to `research/history/staging/changelog-add-<partition>.md` instead, and the
parent session merges them in one pass. Same discipline as the night runs: agents never
commit, the parent does.

**The gate: `node research/qc.js --strict` must return clean before the campaign
closes.** Crosslinking is Chris's stated condition for moving things around, so a split
that orphans an inbound pointer is a regression regardless of how good the split is.

### The last four decisions

**The @13 beyond-Chebyshev bound does NOT exist, and this settles two findings at
once.** `natal-cap-21-beyond-chebyshev.md`:141 reads "Run @13's T₄ offline (~90 min,
parallelizable) → first beyond-Chebyshev bound **at a level where P(S=0) = 0 is NOT
provable by capacity** — expected ≈ 3Var²/μ⁴ ≈ 2.9e−6 (~340× beat)", under a heading
of **Next steps**. So:

- The two "firsts" in that file were never in contradiction, and the compound agent is
  right that `qc-status`'s quotation lost the disambiguating clause to an ellipsis. My
  earlier report of an in-file contradiction is withdrawn. What exists at @11 is a
  beyond-Chebyshev bound at a level where capacity already settles P(S=0) = 0; the @13
  one would be the first at a level where it does not, which is the first *useful* one.
- **`README.md`:57's plural "the first beyond-Chebyshev ensemble bounds" is confirmed
  wrong**: exactly one exists. Singular.
- **`TODO.md` item 6's "the @13 gate is MET" needs disambiguating**: what is met is the
  T₄ *precision* gate, not the bound. As written it reads as though the @13 bound is in
  hand. Partition D owns the fix.

**Status-only parent files: APPROVED as a document kind.** A short document whose whole
job is to hold one status table over sub-claims that live elsewhere, with no mathematics
of its own. `research/anchored-calm.md` is the first. It is the right answer to a claim
whose status currently lives in four competing tables, and it keeps the token cost of
"what is actually established here" to one screen.

**Calibration-in-the-name: APPROVED as standing policy.** Names carry their calibration
where the object is not proven, so a suffix like Measurement, Conjecture or Hypothesis
becomes part of the name. This is the mechanism that satisfies Chris's requirement that
the error be structurally impossible rather than merely corrected: **"Proven: the
anchored typicality Measurement" is self-contradicting on its face**, where "Proven: the
Fused-Window Calm Lemma" reads fine and is false. Apply to new and renamed objects; do
not rename a genuinely proven theorem to carry a suffix it does not need.

**The X-limitation Theorem's scope goes to verification, not to a ruling.** Three
documents say "proven from x = 13 upward" while the proof enumerates max VR at @11, @13
and @17 only, so the all-x extension may rest on two measured trends. That is a scope
error in two papers if true, and it downgrades `qc-status` B-3's HIGH confidence. It
needs a read of `natal-cap-31-calm-vs-kill.js`, which no agent has opened.

## Wave 2 results

### Partition A: applied. Two calibration decisions settled here.

Landed: both dropped qualifiers restored, the Origin Excess Lemma decomposed by
logical type with the canonical enumeration at `maier-matrix.md` §4a, `origin-excess.md`
§6 split into §6a-6c, §6c now existing so `maier-matrix.md`:282 resolves, two corrections
sections migrated, and G₂(41#) repriced. `refs` went 1 → 0 in its files; global 22 → 20.

**A did something better than the brief asked, and it should be the pattern for the rest
of wave 2.** Rather than restoring `with y′² > x` as prose beside the lemma, it put the
condition *inside the boxed statement* as a labelled non-vacuity remark, "so the box
can't be transferred without it". That converts a fix into a structural guarantee, which
is exactly the standard Chris set for the compound-claim work: make the error unwritable
rather than corrected once.

**DECISION: the ×3 discrepancy ceiling is PROVEN. A's call stands.** `G2-STATE.md` §4g
states the reason in its own text: "The ×2 and ×3 ceilings are the Möbius term counts,
and 3^{π(x)} is exactly the Level Ledger's majorant." A term count is a combinatorial
fact about how many terms exist, not a measurement of them. What is MEASURED in that
table is the sup (×1.8356) and the sd (×1.6612); the √R_k column is derived. A split the
measured ladder off, which resolves qc-compound's CC-5 objection that the table promised
one calibration per line and delivered two.

**DECISION: the 2.2 origin-advantage ceiling is MEASURED, and I am overruling the
proposed wording.** A wrote "MEASURED in one input, PROVEN from there", and qc-compound
CC-5 proposed "PROVEN ≤ 2.2, MEASURED max 1.372". Both let the word PROVEN attach to a
quantity that cannot carry it. The structure is: `ln x*/ln y ≈ 1.44` is MEASURED across
nine levels and is not proven; squaring it to reach 2.2 is exact. **A chain is calibrated
by its weakest link, so the ceiling is MEASURED.** Anything else is precisely the scope
inflation this campaign exists to remove, and "PROVEN from there" is how it gets in.

Required wording: name it the **Origin Advantage Ceiling**, calibration **MEASURED**,
stated as "≈ 2.2, derived exactly from a measured input (ln x*/ln y ≈ 1.44 at every
computed level, nine levels), against a measured maximum of 1.372 over the fourteen
cells". The derivation being exact is worth saying; it does not upgrade the result.

**Brief corrections accepted, one of them mine on my own script's output.** It is **6 of
8 rows** outside S ≤ y′² that fail the strike characterisation, not "7 of 12": I
conflated the total test rows with the out-of-range rows when reading `oel-hypotheses.js`.
The loose end is in §5, not §4. And two of qc-history's relocate bullets needed no
relocation, the content already being in the body.

**Handoffs routed live** to partitions D and E by message while they were still running,
rather than being left for a later wave: the false W7 premise surviving at
`ZONE-POSTULATE.md`:248, `THE-DIALS.md`:260 and `two-class-lower-bounds.md`:611, the
GLOSSARY additions, the instruction that `THE-LENS.md` §5 must keep its number because A
repointed three citations at it, and the G₂(41#) repricing so the two partitions do not
diverge.

### Partition C: applied. Door 2 is sound, and the applier verified rather than copied.

**The campaign's one false claim is fixed.** Door 2 of `moire-primes.md` is rewritten
from `natal-cap-02-fourier-budget.js` after reading that artifact, as mechanism / toll /
where-it-stops, with every number checked against the script's embedded output and the
retraction left visible in place rather than quietly swapped.

**C declined to paste qc-papers2's supplied replacement text, and was right to.** The
script's reading says "the four comb frequencies"; C recomputed |S| from the CRT
factorization and found there are **five** (k = j·W/30 with 5 | j), so the paper now
states the condition rather than a count. It also found that the 2ⁿ pointwise bound
needs a hypothesis nobody had written down, that no natal prime divides k, since
F_p(0) = p − 2. **That is a dropped hypothesis found by an applier while applying**,
which is the fourth independent appearance of the campaign's dominant defect class and
the best argument for having appliers read the artifact rather than trust the finding.

**The X-limitation Theorem's scope: SETTLED, and it was a real scope error.**
`natal-cap-31-calm-vs-kill.js` reading 3 marks the theorem "proven, **per level**, from
L2 + enumerated max VR" at @11, @13 and @17, and **no level-uniform bound on VRmax
exists**. So "proven from x = 13 upward", which stood in three documents, is an
extrapolation. Fixed at both paper sites; `TODO.md`:230 routed to partition D. This
downgrades qc-status B-3, which carried HIGH confidence on the wider claim, and it is
recorded so the earlier confidence is not re-inherited.

**DECISION: `moire-primes.md` splits, with §7 and §7A as the child.** Chris approved
splitting in general ("breaking up papers, claims etc into sub papers and sub claims is
absolutely allowed. This eases token pressure") and the file is now 1,096 lines with §7
plus §7A forming a clean 390-line unit. C did not act because qc-arch declined to
recommend structure inside `paper/`; the split is approved on Chris's own permission,
with bidirectional crosslinks as the condition. **What remains CHRIS-DECIDES is the
separate question `PAPERS.md` raises, whether §7A becomes the paper's spine.** That is an
argument about what the paper is for, not a token-pressure fix, and it is not mine.

**DECISION: Door 5 keeps its place and states its gap; it is not demoted or hidden.**
After the KKL correction it is the weakest door, because the theorems it cited require
distinct moduli while our classes {0, −2 mod q} use each modulus twice, and the theorem
that does apply carries no numeric constant at multiplicity s = 2. Demoting or dropping
it would hide the most interesting thing about it: this is a door whose toll cannot
currently be priced, and saying so is more useful to a planner than a tidy omission. Keep
it, name the gap, keep the expert-read note.

**Handoffs**: the stale 18% at `research/README.md`:120 routed to partition D; the same
figure at `research/ATTACKS.md`:14 was in no partition and **was fixed here directly**,
along with the surrounding verdict, which had the per-prime union bound succeeding when
the corrected artifact shows it structurally dead. A fourth residual FGKMT site was found
at `beta2-note.md`:152, beyond the three qc-refs listed.

### Partition D: applied. The entry path exists now, and the framework had a bug.

Landed: the Gaussian Maximal Law named as the operative unproven input in GLOSSARY and
ZONE-POSTULATE with Lemma V marked off the working point; README's "Proven:" list cut
from nine to eight with Zone Equivalence removed and the Fused-Window Calm Lemma out,
**its refuted uniform-in-q form stated**; `research/README.md` rebuilt as a router;
dial 7 no longer retiring TODO 11; TODO item 000b closed by inspection and gone from the
file; G₂(41#) repriced and promoted out of Parked; the @13 gate disambiguated as
*precision*; FOLD-PROFILE §8 written.

**The reading path, now stated identically in all four entry documents:** README §Status
→ `G2-STATE.md` §0 → the `research/README.md` router, then by question. GLOSSARY is a
lookup and never a first read; `history/` only for a claim's history.

**D found a bug in the qc framework, not a defect in the corpus, and it was right.**
`THE-DIALS.md`:121 cites `attack-06b`, which exists and is cited correctly:
`SHORT_RE` in `checks.js` accepts a trailing letter while `resolveRef` in `corpus.js` did
not, so a correct citation was reported dead. **Fixed here**; `attack-06b` and
`attack-06` now resolve to their two distinct artifacts. This was the framework's first
false positive against the corpus, and an applier caught it by opening the target instead
of trusting the tool, which is the discipline `qc/README.md` asks for.

**D re-ran scripts rather than trusting a report, and corrected a number twice over.**
The lineage figure is **99.93% on the tile**, while 99.94% is the real-twins figure: two
different objects. That also refines qc-numbers' claim that "the 99.94% lineage figure
does not exist", which I had accepted; both figures exist and they measure different
things. D also explained the 440,311 against 440,312 discrepancy.

### Partition B: applied. U-FRAME is claim-shaped, and it declined to split, correctly.

§§1-9 keep every number and identity. The six attack-titled sections are gone: A4's
mathematics into §5a, A9's prior art into §6a, the three disagreeing custody notes merged
into §8, and the residue into three claim-named sections, **§10 L and κ(m)**, **§11 the
transfer operator and the pair count**, **§12 f, 42 points and the staircase**. §§13-15
retired as numbers while §§10-12 still exist, so no inbound pointer dangles. `refs` and
`crosslinks` both 0 → 0 across its three files, and every bare `§N` was grep-checked by
hand because `refs` only tests the `file.md §N` shape.

**DECISION: B's refusal to split into child files stands, and the split is deferred
rather than abandoned.** Its reason is sound: `qc-arch`'s layout keeps `TODO.md`:103 and
`localized-04-maxsum.md`:291 resolvable, and those files belong to partitions B does not
own, so splitting mid-wave would have broken pointers it could not repair. The cost is
real and must be named: **U-FRAME grew 967 → 1,032 lines**, which is the wrong direction
for Chris's token-pressure goal even though the structural defect is fixed. The three new
sections are self-contained, so the conversion to children with stubs is mechanical.
**Do it as a closing step once every partition has landed and no other agent is mutating
the referring files.** That is the correct sequencing, not a change of mind.

**Four corrections to my brief, and one of them corrects a claim I made to Chris.** The ρ
trend claim sits at **four** sites, not two: `U-FRAME.md` §9 also carries a max-over-m
series as "rising", and `gate-multiplies.md`:493, **which I described as already holding
the honest version, also says "and it is rising"**. My characterisation of that line was
wrong; all four are now fixed. Second, the looseness verdict and the effective run length
were the same measurement under two names, since 1 + j*(1) = m_eff by definition and the
five overlapping values agree, so they are one statement now. Third, `ATTACKS3.md` A8's
verdict said "min(N_P, N_M) still decays, so A5's hole remains", which is
self-contradicting and opposite to U-FRAME's honest limit. Fourth, ATTACKS3's organising
principle presented the refuted additive chain as the live route.

**Open, and worth the compute:** three fits of the same shape now sit in one file with
slopes 1.06 (7 tile points), 1.45 (42 census points) and 1.30 (31 operator points, a
different object). The first two are the same object and **nobody has checked them on
their shared points**. That is a potential real inconsistency rather than a presentation
issue, and it falls squarely inside Chris's licence to revalidate.

### Standing answer on em dashes, since partition D asked

The house guide bans them and greps for them, and the ban reaches anything written or
rewritten in Chris's voice, papers included. It does **not** license a retrofit sweep
across `research/`, for two reasons: a mass punctuation edit is churn with zero
correctness value in a campaign whose whole purpose is correctness, and the job is
already tracked in `TODO.md` item 12 for `moire-primes.md` specifically. **New and
rewritten prose follows the guide; existing research notes are left alone.** Appliers
should match their host document rather than introduce a third style, which is what D did.

### Partition F: applied. The compound-claim work, and the epistemic lesson of the campaign.

**The Fused-Window Calm Lemma name is RETIRED.** Nine sub-claims at four calibrations,
one status table in the new `research/anchored-calm.md` (status-only, no mathematics, 96
lines), and the four competing leaf status tables deleted into the changelog verbatim.
That is Chris's requirement met structurally: there is no longer a name that a summary
could call "Proven" and be wrong, because the conjunction no longer has one.

**The most valuable single catch in wave 2.** The refuted uniform-in-q form of leg (iii)
is now a boxed named statement in cap-23 and a row in the parent table, and applying it
turned up that **cap-19's own "gap" section had been proposing to prove the refuted
statement**. Work was being planned against something already known false, and it was
invisible precisely because the refutation was buried inside a compound name that no
summary could state correctly. This is the clearest possible vindication of the
decomposition workstream, and of Chris's instinct that the fix had to be structural.

**X-limitation: confirmed a scope error, by three partitions independently.** The smoking
gun is `natal-cap-31-calm-vs-kill.js`:184, `for(const x of [11,13,17])`, with the script's
own reading 3 saying "proven, per level, from L2 + enumerated max VR". No level-uniform
bound on max VR exists anywhere. It is now proven at @11, @13 and @17, with the all-x
extension boxed as the **Loudness Ceiling Conjecture (OPEN)**.

**And the reason qc-status got it wrong is the lesson worth keeping.** B-3 carried HIGH
confidence on the ground that three sources agreed. F found those three sources were
**three descendants of one home**. Agreement among documents that inherit from a common
ancestor is not independent confirmation, and this corpus is full of such inheritance, so
a confidence claim resting on "N documents agree" must first check whether N is really 1.
Partitions C, D and F converging here is genuine independence, because each read the
artifact.

**The decay-shortcut disagreement resolves in TODO's favour, reversing the usual
direction.** The script's own output carries the six-point fits (R² 0.439 / 0.261 /
0.331, exponent −0.483), so `natal-cap-36` was *behind* its own summary rather than ahead
of it, and the refutation of the decay shortcut comes out stronger, not weaker. Worth
noting because every other instance in this campaign ran the other way, with the summary
stale against the research layer.

**Correction accepted: six counterexample primes, not five** (q = 173 at @29 was missed).

**DECISIONS, all four taken here.**
1. **Both coinages approved.** "Loudness Ceiling Conjecture" and "Tail Comb
   Equidistribution Conjecture" each carry their calibration in the name, which is the
   standing policy, and both use vocabulary the corpus already owns (loudness from the
   cap-31 line, comb and tail throughout). No change.
2. **`certificate-engine.md`'s unnumbered path is correct.** The `natal-cap-NN`
   convention numbers campaign artifacts in sequence; a document that spans several caps
   is not the Nth cap experiment and should not pretend to be. `anchored-calm.md` sets
   the same precedent in the same wave, so the two are consistent.
3. **Per-attack notes keep their own scope.** F kept it and every other report assumed
   it. Pulling cap-23 and cap-26 to the frontier would erase the record of what each
   attack established at the time it ran, which is the thing that makes them auditable.
4. **Fill the absent column.** `natal-cap-30`'s @29 row carries one column marked absent
   at a cost of ~18.5 minutes. An absent cell in a certified table is exactly the kind of
   gap that later gets filled by inference, and the same run already reproduced once
   today, so it is cheap insurance. Queued as a closing task.

**Handoffs: 25 rows, and 10 were already VERIFIED DONE by partitions C and D without
coordination.** Convergent application across independent partitions, with no rework
needed, is evidence the file-partitioned design held.

### Partition E: applied. And it caught the shepherd putting a wrong number into a fix.

**FKMPT is settled better than the decision asked for.** E re-verified from the four
arXiv PDFs rather than trusting the report, and found what nobody had: **v4 prints
`C(1/2) > 1/325565` in its own text**, so the corpus now cites the paper instead of our
arithmetic. v4 carries the corrigendum as its Appendix A, naming the cause (errors in the
exponents of H force M > 6) and crediting Gabdullin; the published corrigendum is **JEMS
25 (2023), no. 6, 2483-2485, DOI 10.4171/JEMS/1305**, which appeared nowhere in the repo
and is now in both files. Both state which version they quote, and the changelog records
why the value moved three times so it does not move a fourth.

**MY FINDING WAS WRONG, and E's correction prevented a real regression.** I reported to
Chris that `maxgap-law.md`:502 quotes `two-class-lower-bounds.md` §8 for a "measured law
~1.2 x ln^2 x" and that "that file contains no 1.2 at all", calling it a verified true
positive. Checked here against the pre-wave-2 commit: **1.2 is there**, at lines 339-341
as table values 1.2255, 1.2594, 1.2500. Worse, I recommended writing in c ≈ 1.90 as the
current constant. **1.90 is h₂'s constant, not G₂'s** — line 448 pairs it with
`h2(73#) = 2622` — so applying my recommendation would have put a wrong number into the
home document. The actual defect at :502 was `~` against `≈`.

Two lessons, both about this campaign's method rather than the corpus. A grep that returns
nothing is not evidence of absence until the pattern is checked against a known positive.
And a shepherd handing an applier a replacement VALUE is more dangerous than handing it a
question: partition C refused its supplied text and recomputed, partition E refused mine
and re-derived, and both were right. **Findings should carry the defect and the evidence,
not the answer.**

**That check then exposed a genuine disagreement E owns both ends of.**
`covering-dive.md`:108 attributed "c ≈ 1.90 over all 21 exact terms" to
`two-class-lower-bounds.md` §6, which gives 2.04. From the exact A288815 terms the ratio
is **not constant at all**: 1.04 at x = 11 rising to 1.95 at x = 73, mean 1.63. Scoped
rather than deleted.

**Two findings no diagnostic report caught, both from spending Chris's re-research
licence.**
- `dhr-verification.md` told readers the Diamond-Halberstam book was inaccessible and
  Theorem 9.1 unverified, while `paper/beta2-note.md` records it was later **obtained and
  read at line level with page numbers**, every triangulated prediction holding. The audit
  trail said "unverified" about the corpus's central citation while the paper it audits
  said "verified". Now closed, with the file kept in the body under a dated
  APPLIED/OUTSTANDING header because its source ledger is cited live by
  `sift-limit-attack.md`.
- Chasing the Smith 1857 flag through Dickson **confirmed the date** (Proc. Ashmolean Soc.
  3 (1857) 128-131) and turned up that Dickson p. 436 credits that paper with a method for
  the primes between P_x and P²_{x+1}: our zone, in 1857.

**DECISION: E's narrowing of the mirror novelty claim is APPROVED.** The same Dickson page
records de Polignac's 1849 "diatomic series" as periodic *and* symmetric about its middle,
which is the palindrome and the census together. `PRIOR-ART.md`'s mirror row claimed it was
"never foregrounded"; E narrowed the claim from the observation to the *use* of it. That is
the correct direction: an 1849 observation cannot be our novelty, while what we do with it
may be. **Flagged as a publication-track change**: this is now the second novelty verdict
this campaign has moved, after the Holt attribution, and any remaining novelty claim in the
mirror/palindrome area needs a literature check before anything leaves the repo.

## FOR CHRIS: the decision queue, none of it decided here

Six items. Each is genuinely editorial or strategic, none is resolvable by
evidence, and each is stated with a recommendation so it costs one line to
settle. Items 1 to 5 carried over unchanged; item 6 is new from wave 6.

1. **§7A as the flagship's spine.** Whether `paper/moire-primes.md` §7A becomes
   the organising spine of the paper. Structural and yours.
2. **Door 5's claim strength, now that it must cite KKL.** Hough and BBMST
   require *distinct* moduli and our residue classes {0, −2 mod q} use each
   modulus twice, so the cited theorems do not apply to our object. The theorem
   that does is Klein–Koukoulopoulos–Lemieux 2024 on multiplicity s, and **there
   is no numeric constant at s = 2**. Correctness requires citing it; how much
   Door 5 then claims is yours, and the honest version is weaker than the
   current one. This wants an expert read.
3. **Zone Equivalence in "the proven spine".** `PRIOR-ART.md` says present it as
   a framing device, not a result. **Recommendation: the stronger option** —
   drop it from the spine list and fold it into the statement of the target in
   `ZONE-POSTULATE.md` §2. An equivalence between our target and TPC is a
   restatement of what we are trying to prove, and listing it beside the Copying
   Theorem invites a reader to count it as progress. Costs nothing, since the
   content stays where it is used.
4. **The remaining mirror/palindrome novelty claims.** Novelty framing, yours.
5. **The OEIS drafts: still HELD, and three things must happen first.** Fix the
   two LINKS entries, which are filesystem paths where OEIS requires a URL; run
   the PARI under a real `gp`, which no partition has been able to; and get an
   expert read. Wave 6 has additionally routed the two OEIS *absence* claims to
   a partition with web access, because they rest on one search by one agent on
   one day, restated by two documents descended from it.
6. **NEW. Are `ATTACKS.md` and `ATTACKS2.md` frozen dated records or live
   indexes?** They are scoreboards of waves that closed on 13 and 14 August, and
   `ATTACKS.md`:6-7 says "Status updated as executed". Six of wave 6's fifteen
   index findings are supersessions that **would not be defects at all** under a
   frozen-record reading, and would want banners rather than edits. Nobody has
   ever made this call, and it sits upstream of every fix in that partition.
   **No action is blocked on it**: the wave-6 text is written to survive either
   ruling, since every correction states what the cell used to say as well as
   what is true now. **Recommendation: live indexes.** A reader opens
   `ATTACKS.md` to learn the state of an attack, not to learn what was believed
   on 13 August, and the dated framing is preserved in the corrections
   themselves.

## WAVE 6: the conjecture is tested, and a theorem gains a level

Five partitions: U on the two index files, V on the sixteen `fold-profile-*.js`
with no pasted output, W on `natal-cap-34/-35/-37`, X on the literature layer
with web access (the first partition in the campaign to have any), Y on the
never-swept surfaces — `wave7-logs/`, three `.txt` outputs and the leaf notes.
The shepherd took the mathematics and every `.md` edit.

**The wave opened with the mathematics rather than the cleanup**, deliberately.
Wave 5's list had exactly one item that was not bookkeeping, and a wave that
opens with bookkeeping tends to stay there.

### The Loudness Ceiling Conjecture survives, and it was never a close-run thing

`natal-cap-38-loudness-driver.js`, written and run here. S̄ at @19 is
**49,238.76**, so the driver S̄/√(K·V̄) is **24.96** and the conjecture's
threshold S̄²/(K·V̄) is **623.1** against an enumerated max VR of 2.293. **The
conjecture holds at @19 with a margin of ×271.7.**

**The result is a theorem, not just a conjecture test, and that was not
obvious from the way the corpus stated it.** max_t VR < S̄²/(K·V̄) is, after
multiplying out and taking a square root, exactly √(K·V̄·VRmax) < S̄ — the
inequality the X-limitation theorem's per-level proof already needs. The
conjecture is therefore not a separate hope about loudness; it is precisely the
statement that the theorem's proof goes through at a given level. So computing
one number promoted @19 from conjecture to theorem, and **the X-limitation
Theorem now holds at @11, @13, @17 and @19.** Nothing in the corpus had noticed
the equivalence, which is why the item was priced as a conjecture test.

**The leg that broke was carrying almost none of the weight.** Wave 5 killed
the "max VR falls" leg by enumerating a fourth point. The margin runs ×3.5,
×10.1, ×44.4, ×271.7, accelerating by factors of 2.9, 4.4 and 6.1 per level,
while max VR has stayed inside [2.14, 2.78] across a factor of 4,200 in W and
the strike channel max|D| has fallen from 53.5% of S̄ to 6.1%. The honest
status: one monotone measured trend over four levels, with two orders of
magnitude of headroom at the deepest level that can be enumerated. Still
**[OPEN]** for all x, and it must stay open — four levels is four levels, and
this corpus has twice had a short-run trend refuted by the next point.

**Custody, and the shepherd committed lesson 5 inside the wave that restated
it.** Every quantity was reproduced against a known positive before the @19 row
was read: W, N, K, V̄, S̄, VR(0) and max VR all PASS against cap-31's pasted
output at @11, @13 and @17, and V̄, VR(0) and max VR against cap-19 PART A at
@19. cap-38's readings then claimed S̄ at @19 was **"the only load-bearing
number here with no known positive available, since cap-31 stops at @17"**.
cap-31 does stop at @17. It is not the only producer.
`research/wave7-logs/cap35-x-multiplicity.log` has printed `S̄=49238.76` at @19
since **2026-08-15**, three days, from natal-cap-35's u-form path, and calls it
"exact S̄" in its own convolution-test line. **Partition Y found it within the
hour, and the finding is against me.**

This is the third time the campaign has produced this defect, and the second
time inside the commit that restated the rule. The mechanism was the same on all
three occasions: I reasoned from the producer I knew (cap-31, whose driver I had
just read) instead of listing the directory. The brief for this very wave says
"before writing that something was never run, list the directory", and partition
W's brief said it twice. **Writing the rule into the brief does not execute the
rule.** What would have caught it in ten seconds: `grep -rl "S̄=" research/` — a
producer search rather than a reasoned exclusion.

**And the correction strengthens the result rather than weakening it.** S̄ at
@19 now has four witnesses in agreement: cap-35's archived u-form log
(49,238.76), cap-35 re-run today by partition W (49,238.76), cap-38's prefix
identity (49,238.76, sharing no code with the u-form), and cap-38's direct
simulation (49,201 ± 50, z = −0.76). PART B was built as a *substitute* for a
known positive and turns out to be a fourth witness. All eleven numbers are now
in `audit-numbers.js`, which recomputes them from scratch and reproduces
cap-31's @17 enumeration first as its own known positive.

**It cost 8 seconds, against a full sweep that costs 76 s at @17 and cannot
reach @19 at all.** cap-31 sweeps survivors, strikes, overlap credit and pair
counts per rotation. The conjecture needs four numbers, and each has a cheap
exact route; S̄ in particular follows from an exact prefix identity that
replaces the sweep with one 2W-length sieve. **The generalisable lesson is that
"this level is out of reach" was a statement about one algorithm, not about the
question.** The item sat on the list unpriced for a wave because the only
instrument that had ever computed S̄ was the expensive one.

### W/2 is not the loudest rotation at @13, found for free

Checking the max-VR statistic's custody meant asking where the maximum sits.
VR(W/2) = 1.6652 at @13, rank 198 from the top of 30,030 — the 99.34th
percentile, against a true maximum of 2.3518 at t = 3461. W/2 IS the loudest at
@11, @17 and @19, all at rank-from-top 0.

`research/history/CHRONICLE.md` said "W/2 duplicates (**proven loudest**)" and
`natal-cap-19-calm-lemma.md` said "the single loudest rotation for the **third
level running**", a streak claim that is wrong at exactly the level it skipped.
What the Mirror-Phase Doubling Lemma proves is per-prime variance doubling;
maximality of the sum over primes is a different claim and is measured.
**`paper/anchored-note.md` had it exactly right** — "the loudest rotation of the
entire ensemble at @11 and @17 and the 99.3rd percentile at @13" — and the
refuting number had been sitting in cap-31's own @13 enumeration since
14 August. Nobody had compared max VR with VR(W/2) at the one level where they
differ. **Lesson 16 again: the paper was right and the index was not.**

### Extending a scope found where the previous scope fix had stopped

Wave 2 corrected "proven from x = 13 upward" to "per level" in five places. It
never reached the history layer: `history/CHRONICLE.md` and
`history/NIGHT-LEDGER-2026-08-14-15.md` at two sites still carried the
unscoped claim, and so did a stale absence clause inside
`natal-cap-31-calm-vs-kill.js`'s own reading 3 — "max VR is enumerated nowhere
else" — which wave 5 edited without noticing, in the same paragraph where it
named the conjecture. All corrected.

### Partition U, the index files: ACCEPTED, all fifteen, four spot-checked by re-run

`qc-wave6-U.md`, 749 lines, 15 findings (5 HIGH, 5 MED, 5 LOW), six of them new.
Four were re-verified here by running the artifact rather than reading the
report: `attack-03`'s three Chebyshev ratios divide to 34.8 / 30.4 / 37.4, so
the index's "35-40×" contains neither endpoint; `attack2-04-10` prints
meas/pred 0.9935 at m = 7, so "4 decimals at every depth" holds at four of five
depths and the script's own parenthesis saying so was the half that got dropped.
Both stand exactly as reported. All fifteen applied.

**U-1 is the partition's flagship and the whole index defect in one sentence.**
`ATTACKS2.md`'s campaign verdict awarded "**two theorem-grade results**", one of
them the Unification Law, while its home `GLOSSARY.md` marks it "MEASURED to
~1%, Hardy-Littlewood-conditional", its own cited script calls the [2,3] step "a
conjecture", `origin-excess.md` marks the u = 2 argmin INFERRED and "not proven
here", and ω(u) is Buchstab's. Row 3 of the same table ends "HL-conditional"
about the same curve that row 5 and the verdict promote to a theorem. **The file
contradicts itself and the half a reader quotes is the half in bold.**

**And the reason it survived is a process failure, not a reading failure.**
`ATTACKS2.md` has not been *edited at all* since `324252f`. Waves 2, 4 and 5 all
passed over it, and the fix was written three times and handed off three times —
`qc-compound.md` CC-8(d) wrote the replacement text, `applied-D.md` handoff 3
routed it to "partition G's", and partition G never arrived. CC-8 even recorded
an acceptance test, "'theorem-grade: the Unification Law' is unwritable once the
name denotes an umbrella", and that sentence was still on disk four waves later.
**Lesson 24 below is this.**

**Two findings came from asking where a number came from, and neither had an
answer.** The seam slot-enrichment "25×" is printed by no script: recomputed
from the census it is 20.2, 22.9, 25.6 and 28.1 at T₁₃ through T₂₃, so the flat
figure was one level's value, and it sat in `GLOSSARY.md` too. And the same cell
said a seam is "no more likely than average to be a twin PRIME" having dropped
the words "conditional on being a slot" — which makes it contradict, eight words
earlier in the same row, the wave's headline that seams ARE 10× to 20× twin-prime
factories. The conditional is the sentence.

**One correction repaired a defect and introduced a smaller one of the same
class.** Wave 5 rewrote `ATTACKS.md` row 6 to import `attack-06b`'s negative
result and flattened it in the import: the script's reading 3 is titled "no
simple statistic determines G_d **within a density class**", reading 1 of the
same script says density DOES set the scale, the sweep covers three levels not
four, and one faint signal survives. That is lesson 13's shape again, inside the
fix for a different lesson.

**Its coverage section earned two further corrections beyond its own findings.**
The Unification Law is written "for u ≤ 2" at three sites, a domain on which
e^{2γ}/u² diverges; u = ln(position)/ln(level) is ≥ 1 structurally, so all three
now read 1 ≤ u ≤ 2. And the two OEIS absence claims it could not settle were
**routed live to partition X**, which had web access and was still running — one
search by one agent on one day, restated by two documents descended from it, is
one witness and it was four days stale.

**Honest about its own limits, and the admission is the useful part.**
`attack2-01-06` and `attack2-05-07` carry the wave's two headline numbers, E(P)
and the ρ curve, and **neither had been executed by anyone since 2026-08-14** —
wave 5 skipped them precisely because they carry pasted output, which is the
inverse of the rule that caught the fold-profile family. U named that as its
largest unverified surface and priced both above its time box.

**So both were run here, and both reproduce exactly.** `attack2-01-06`: all four
meas/pred ratios 0.9983, 0.9989, 0.9944, 0.9940, the four asymptotic slices
0.9984, 0.9991, 0.9942, 0.9968, and both seam-window results 1.0022 ± 0.0054 and
1.0029 ± 0.0052, every one matching the pasted block. `attack2-05-07`: the u = 2
trough 0.788 at x = 10⁸, the convergence ladder 0.852 → 0.802 → 0.788, and all
35 terms of m(n) ending 47, 226, 2, 12, 203, 30, 38, 356. **A negative result
worth as much as a finding: the `attack2` family's custody is honest, and the
two rows that rest on the most expensive evidence in the partition are now
reproduced rather than trusted.** This closes U's stated largest gap and is the
first application of lesson 25.

**Queued for Chris, not decided here.** Both files are dated scoreboards of
waves that closed on 13 and 14 August. Six of the fifteen findings are
supersessions that would not be defects at all if these are frozen records
rather than live indexes, and would want banners instead of edits. Nobody has
made that call. **The applied text is written to survive either ruling**: every
correction states what the cell used to say as well as what is true now, so a
frozen-record reading loses no history and a live-index reading gets the current
fact.

### Partition X, the literature: ACCEPTED. 4 REFUTED, 3 WEAKENED, 8 SURVIVE, 3 unresolved

**The first partition in six waves with web access, and it earned the access on
its first finding.** `covering-dive.md`:112 said "**No Erdős–Rankin-type
two-class paper exists [ABSENT]**". One exists, and **one of its authors is the
K of FKMPT**: Kalmynin and Konyagin, *A polynomial analogue of Jacobsthal
function*, arXiv:2302.00459v2. **Verified here at the source** — title, both
authors, v1 1 Feb 2023, v2 3 Dec 2023, and the abstract's definition of M(f) as
"the average size of the maximal preimage of a point under a map f : F_p → F_p"
all confirmed by fetching the arXiv record. Choosing one residue x_p per prime
deletes the whole fibre {i : f(i) ≡ −x_p}, M(x²) = 2, and the gain over Rankin
is the Rankin factor raised to the M(f)-th power — squared in the two-class
case, landing on the same y·ln²y shape this corpus states as its own unreached
Realistic Target 4. **What survives is narrower and is now what the file says**:
their two classes are a varying fibre, ours is the fixed pair {0, −2}, so the
twin system itself is still untouched. A referee would have raised this.

**Two citation errors of the class the campaign has declared its sore spot.**
The "DHR book" is **Diamond, Halberstam and Galway** — Richert is not an author
of it, though "DHR sieve" is the right name for the sieve; confirmed here
against the Cambridge record. And Riesel–Vaughan's venue was wrong: *On sums of
primes* is **Ark. Mat. 21 (1983) 45–74**, not BIT 23; confirmed here through
DOI 10.1007/BF02384300 to Project Euclid. That is the Holt-and-Rudd failure
twice more.

**One [UNVERIFIED] closed by reading the primary source, and it is a gain.**
`natal-cap-10` flagged that it could find no primary statement of the
interval-uniform twin bound with the explicit constant 8. Riesel–Vaughan's
Lemma 5 is exactly that, and its supremum runs over **all intervals of length
x**, so the position-uniformity the corpus called "folklore-true" is in the
lemma's own statement. And Wu's 3.39951 is now read at source: Theorem 3 states
3.3996, the proof line in §8 gives 3.39951, and **"twin side by halving" is not
how he gets it** — that gloss describes the earlier Selberg/Pan/BD/Chen family,
not Wu's theorem.

**Eight absence claims SURVIVE a competent search, which is a real outcome and
is recorded as one** so no later wave re-spends it.

### Partition Y, the unswept surfaces: ACCEPTED, 29 findings, and it caught the shepherd

**Its highest finding is a dead number with no flag on it.** The S6 block of
`wave7-logs/lemmaV-meansquare.log` is output of `elementaryVariance`, which
`sift-limit-lemmaV.js`:395 now banners as `!!! WRONG. DO NOT TRUST THIS FUNCTION
OR ANY S6 COLUMN DERIVED FROM IT. !!!` — wrong by three orders, with the tell in
its own output (Var/E² printed as a constant 0.500). The log carries no flag,
`CHANGELOG.md` had zero hits for `lemmaV`, `S6` or `elementaryVariance` (Y
calibrated that grep against `theta-ladder`, 7 hits, and `natal-cap-36`, 8), and
`WAVE7-RESULTS-2026-08-15.md` voided the block **for the wrong reason** while
quoting two of the voided constants inside the sentence telling a reader not to
quote them, then closed by saying the route "beats the elementary bound by
roughly two orders". `MORNING-2026-08-16.md`:74 settled it two days later: it
**loses, by about 1.4×**. Verified here at both ends and corrected.

**Two more self-contradicting absence claims, the seventh and eighth of the
class.** `G2-STATE.md`:584 opened §5a with "Nobody in this repo had ever asked
how large G2 can be *made* to get" while §5c of **the same file**, 160 lines
below, says `attack2-rankin2d.js` asked it three days earlier. And
`NATAL-CAP-CAMPAIGN.md`:91 ranked "K*(x) at @23" as open lead #1 while the same
file states twice that K* is 27 at @23 and 69 at @29, "both measured". Both
corrected.

**And it caught me.** See the custody paragraph above: Y's opening absence grep
found the shepherd's own false claim that S̄ at @19 had no known positive. That
is the single most valuable thing any partition did this wave.

**Two corrections to its own brief, both accepted, and the first generalises.**
Y derived its leaf-note list from `qc-scope-R.md`'s *coverage section* and got
it wrong: ten of its fifteen are named in R's **opening sentence** as R's
surface. **A coverage section is not the complement of a surface**, and any
partition deriving scope from one will repeat this. Only five files were
genuinely never read by anyone, and those five produced 8 findings including 3
HIGH. Second, Y reports plainly that the tree moved under it mid-run and that it
re-verified every line number afterwards.

**Its negative result is stated as plainly as its findings**, which is the
practice this campaign wants: **no false absence claim anywhere in the corpus is
refuted by any of its eleven artifacts.** That was its highest-priority task and
the answer is no.

**And it names a new defect surface: "clean" verdicts.** Two of its findings sit
on rows `applied-P.md` marked clean, in both cases because P checked that a
scope had travelled rather than recounting the value against the printed table.
Five findings across three surfaces share one shape — a band or precision claim
whose endpoints came from a subset of the rows, every printed number correct —
and `audit-numbers.js` passes without firing on any of them.

### Partition W, the expensive scripts: ACCEPTED, and the directory listing overturned the premise

**All three files now carry pasted output and readings, and the brief's cost
estimate was wrong by at least 4×.** "Hours, not minutes" was the reason nobody
had run these. Measured: cap-35 is **80.3 s**, cap-34's six stages are **~25
minutes** in total. W re-ran both in full rather than reasoning about not
re-running them, which is the right instinct and the same one that produced
cap-38.

**It refused to manufacture a custody record, and that is the finding.**
`research/wave7-logs/cap34-cap27-custody.log` is **not cap-34 output at all** —
its format strings are printed by `natal-cap-27-t4-at13.js`. Pasting it in, as
the brief's route (a) invited, would have created a false provenance record in a
file whose whole purpose is provenance. W excluded it and flagged it instead.

**The @41 march had already been run to completion**, 6.16 hours, with the full
log and shard JSONs in `~/Files/primeoire-runs/at41/` — outside the repo — while
`qc-scripts-S1.md`:194 still listed it as "NEEDS COMPUTE". **One correction to
W's report, checked here**: W says no wave has cited that location, and
`research/history/OVERNIGHT-2026-08-15.md`:9-10 cites both the log and the shard
JSONs by path. The live layer knew; the wave-5 staging report did not. The
finding stands in its useful half — a six-hour result whose only copy sits
outside version control, which cap-37 now states in its own header.

**Its headline is mathematics and it is routed, not applied.** cap-34's P1 grades
the published −3.5e−5 as Multi −4.531943e−5 against C2 +1.056084e−5, implying
CAL4 = **0.932164** where cap-32 used 0.87; the best assembly misses the 1e−9
gate by 2% with the k4 Monte-Carlo shape alone contributing 8.29e−10; and stage
`kurt` prices the @17 rung at relT4 ≤ 3.06e−10 against cap-32's ±4e−4. **If that
holds, the corpus's standing "meet the @13 gate, then rerun @17" plan is routed
down the wrong road** — six orders short. Not adjudicated here: it needs a
mathematics pass of its own, and it is the first item for wave 7.

### Partition V, the fold-profile family: ACCEPTED, 16 of 16 run, and the cost estimate was off by four orders

**Every one of the sixteen now carries real pasted output and readings, and the
whole family cost 34.6 s.** Wave 5 had left `fold-profile-09` unrun as "NEEDS
COMPUTE, unpriced". It runs in **0.09 s**. Custody was done properly: each block
was byte-copied by a script rather than retyped, then verified by re-running and
diffing, 16 of 16 identical but for the elapsed-time line.

**Its highest finding is a false lemma quoted as proven, in a displayed block
quote.** "Inside [0, p²) copy 0 deletes at most the single slot p" appears as a
quoted proven statement in `a3-06-origin-vs-max.js` and in
`fold-profile-03`'s header, while **three scripts in the same family print the
counter-example**: T₂₃ folded by 29 has two kills below p², at 29 and 839. The
true statement is the corpus's own **Head Lemma**, proven at
`FOLD-PROFILE.md`:144-150 — the kills are contained in {p, p²−2} — and in six of
eleven ladder folds the single kill is p²−2 with p not a slot at all. Two
artifacts were carrying pre-Head-Lemma wording the rest of the repo had
superseded. `a3-06` is outside V's partition and was corrected here; the
conclusion it supports survives, since at most two slots is still vacuous for
the strong Zone Postulate.

**V-2 is the reason "paste the output" is not a clerical task.**
`fold-profile-15` and `-16` still drew controls from **unseeded
`Math.random()`** — the identical defect wave 5 fixed in `-14`. Pasting their
output would have created a custody record that does not reproduce. Both are now
seeded with 14's generator and seed and are byte-identical across runs.

**It closed wave 5's one open loose end and corrected wave 5 twice, explicitly.**
The "positive excess survived — **investigate**" is settled: simulating
`fold-profile-13`'s own estimator under an independence null gives a median
max-z of 4.70 against the observed 4.90, and the cause is +0.31 skew at ~36
twins per window that √(2 ln n) cannot see. And it recorded that S2-19's "0.8929
is a slip" is itself wrong, and that S2-7 has since been repaired, so neither
should be re-opened.

### Method lessons this wave adds

20. **Check whether the open question is algebraically the same as one you have
    already answered.** The Loudness Ceiling Conjecture and the X-limitation
    theorem's per-level hypothesis are one inequality written two ways, and the
    corpus carried them as separate objects in separate files with separate
    statuses. The cost of not noticing was that a theorem sat one cheap
    computation away from a fourth level for four days.
21. **"Too expensive to compute" is a claim about an instrument, not about a
    number.** @19 was unreachable for cap-31's sweep and free for the identity.
    Before recording that a level is out of reach, ask what the smallest
    sufficient computation actually is.
22. **A scope fix does not propagate to the history layer, and nothing checks
    that it did.** Three of this wave's corrections were the wave-2 fix
    arriving late in `history/`. The summary layer gets swept because agents
    are pointed at it; `history/` reads as settled and is not.
23. **Search for the producer; do not reason about which producers exist.**
    This replaces the version first written here, which said "when a claim has
    no known positive available, build the second code path" — advice given in
    the act of falsely believing none was available. Building the second code
    path is still right and it is what made the number solid. But the step
    before it is the one that failed: I excluded a known positive by reasoning
    from the producer I had just read (cap-31 stops at @17) instead of grepping
    for the quantity (`grep -rl "S̄=" research/`, ten seconds, would have found
    cap-35's log). **An absence claim reached by reasoning about a corpus is
    not evidence about that corpus.** Only a listing is. Three occurrences now,
    two of them inside the commit that restated the rule, which is enough to
    say plainly that writing the rule into a brief does not execute it — the
    grep has to be a step somebody performs, not a principle somebody holds.
24. **A file found three times and handed off three times is not
    under-swept; the hand-off is the defect.** `ATTACKS2.md` was diagnosed by
    `qc-scope-T`, by `qc-compound` CC-8 and by `applied-D`, each of which wrote
    the fix and assigned it to a partition that did not own the file. Four
    waves later not one character had changed. **A finding routed to a
    partition that does not exist yet is indistinguishable from a finding
    nobody made.** The operational rule: a diagnostic pass that writes
    replacement text must also name the wave that will apply it, and the
    adjudicator must own anything left unassigned at the end of a wave.
25. **A pasted output block is a reason to re-run, not a reason to skip.**
    Wave 5 re-ran twelve `fold-profile` scripts *because* they had no pasted
    output, and skipped all seven `attack2` scripts *because* they had one. So
    the two scripts carrying that wave's headline numbers are the two nobody
    has executed since the day they were written. Custody runs the other way:
    a pasted output is a claim about a run, and an unreproduced claim about a
    run is exactly what this campaign exists to check.
26. **A cost estimate nobody has measured is a guess, and this wave's guesses
    were wrong by 4× and by four orders.** The fold-profile family was priced
    at "some are hours" and ran in 34.6 seconds total, with the one script wave
    5 called "NEEDS COMPUTE, unpriced" taking 0.09 s. cap-34 was "hours" and is
    25 minutes. The @19 driver was implicitly unreachable and took 8 seconds.
    **Measure before you defer**, because the deferral costs a wave and the
    measurement costs a probe.
27. **A coverage section is not the complement of a surface.** Partition Y
    derived its scope from `qc-scope-R.md`'s coverage section and inherited ten
    files R had actually opened, while the five genuinely untouched files —
    which produced 8 findings including 3 HIGH — were named nowhere it looked.
    Read a prior report's header and scope statement, not just its confessions.
28. **Pasting an output is not clerical, because the act of running the script
    is an audit.** Two fold-profile scripts drew their controls from unseeded
    `Math.random()`, so pasting their output would have created a custody
    record that does not reproduce. The same pass found a lemma quoted as
    proven that three scripts in the family refute. Neither is visible from the
    prose.
29. **When the brief offers a shortcut, check that the shortcut is what it
    claims.** Partition W was told it could paste output from existing logs
    rather than re-run. One of those logs is not the output of the script it is
    named after. A brief that says "this may already exist" is a hypothesis for
    the agent to test, not a permission to copy.

## WAVE 5: the scripts, and the trend that broke

Four partitions: S1 on `natal-cap-*.js` (37), S2 on `fold-profile-*` and
`attack*` (34), S3 on the remaining ~62, T read-only on the document surfaces R
left unswept. The shepherd took the instrument work and every `.md` edit, so the
scripts partitioned cleanly and documents never collided.

### The mathematical finding: max VR is not on a trend

Partition T flagged it and asked for a second reader, which was the right call
because it contradicts a value wave 4 had just applied. Verified here at the
artifacts.

`natal-cap-31` states max VR is "enumerated at @11, @13 and @17 **only**", and
its Loudness Ceiling Conjecture rests on "two measured trends over three points:
max VR **falls**, 2.78 / 2.35 / 2.14". But `natal-cap-19-calm-lemma.js` PART A
walks **all 9,699,690 rotations at @19** and prints VR(W/2) = **2.293** at
rank-from-top 0.

**The two are the same statistic, and the proof is cap-19's own @17 row**, which
prints 2.143 against cap-31's 2.14 and carries the line "reproduction of
cap-05/13 @17: PASS". So the sequence is **2.78, 2.35, 2.14, 2.293**: down for
two levels, then up, with the deepest level above the one before it.

**One of the conjecture's two legs is gone.** This is the rho lesson exactly: a
trend asserted on a short run and refuted by the next point. The driver leg
stands. Whether the conjecture survives at @19 is **OPEN and needs one
computation**, the @19 driver, which nothing in the corpus has run. Corrected at
five sites, and the papers now say four enumerated levels rather than three.

### The campaign committed lesson 13 inside the fix for lesson 13

Partition S1's lead: `README.md` said "**@17 is not run**". Wave 4 wrote that
line, in the commit that established "before writing that something was never
run, list the directory". `natal-cap-32-wrap-identity.js` ran @17 and printed
T₄ = 4,616,850,623,332.1 ± 4e−4 under "first-ever @17 values". What is absent at
@17 is the **bound**, because μ₄ cancels about seven orders and the identity
needs ~3e−9. Corrected.

**And the new `absence` check had the same blind spot.** It matched "not run" on
that line and then discarded it, because its artifact pattern excluded `.md`
filenames and README's paragraph names only documents. The paragraph carrying an
absence claim is usually a summary citing summaries, which is precisely the layer
where the defect lives. Pattern widened; the finding now fires.

### The refuted algorithm was still running inside another script

Partition S3, and it is the Lgrowth hazard in the direction the brief predicted.
`a3-02-diagonal-f.js` still ran the **refuted** L scanner and its header still
named the repaired sibling as its source. S3 ran both state machines on identical
streams: they agree everywhere except one cell, **L(T₂₃, 29) = 3 against the true
2**, the known bug and no other.

**The consequence is not the cell.** Re-running drops `regress L on lnD` from
R² 0.904 to **0.683** and `L on (ln lnD)²` from 0.867 to **0.627**, so **the two
L regressions no longer separate the branches at all**. U-FRAME's shape check
said "L/ln²x is flat at 0.25 to 0.35 while L/lnD falls monotonically". Recomputed
here independently: L/ln²x runs 0.348, 0.304, 0.249, 0.346, 0.203, 0.353, 0.339,
a factor of 1.7 end to end and not flat; L/lnD runs 0.408, 0.274, 0.200, 0.234,
0.126, 0.208, 0.177, falling overall but reversing twice. The branch verdict does
not flip, but it now rests on the ratio comparison and the mechanism rather than
on any fit, and the section says so.

S3 also closed two standing campaign items at zero compute: the eighth looseness
ratio is **801 at x = 29** and was never `level-ledger-tight.js`'s to produce, and
`exponent-control.md` §1's unreproducible prefix readings are a **p = 5 start**,
with the script using p = 5 for pilot fits and p = 2 for sliding windows, which is
the whole ~0.004 offset between the two files.

### S2 refused the brief's premise and was right

The brief predicted superseded artifacts would be "the norm rather than the
exception" in the attack family. Six of 34 carry a superseded reading and two
already said so. **The dominant defect there was the class the brief ranked
third**: eight scripts whose own printed output contradicts their own prose.

The reason is structural and worth keeping: **none of the sixteen
`fold-profile-*` scripts has a pasted OUTPUT or READINGS block**, against
`SCRIPTS.md`'s stated house format. A third of that surface cannot be audited the
wave-4 way at all, because there is nothing to read against the summary. S2 ran
twelve of them, and most of its findings came from the runs.

Two novelty claims were refuted by their own scripts and are corrected:
`ATTACKS.md` logged "New unstudied object: d ↦ G_d" where `attack-06b` reading 3
is a stated NEGATIVE RESULT over all 105 even d ≤ 210, and `web/PROPOSAL.md`
carried the same claim **one line above the sentence where wave 4 removed its
neighbour on identical grounds**. That pruning pass was mine and it missed the
adjacent item.

**Two mis-citations that `refs` structurally cannot see**, because the pointer
resolves and only the artifact is wrong: the flagship cited `attack-06` and
`attack2-04-10` for data that is `attack-06b`'s, and `GLOSSARY.md` and the
flagship both credited `fold-profile-12` with 400 random controls and z-scores.
Run here: **12 prints no z anywhere and uses one control per width**; the 400
controls are `fold-profile-13`, whose header lists them as the gap it exists to
close. The two z extremes are also **different tiles at different half-widths**,
T₁₉ at 3,000 and T₂₃ at 30,000, so the quoted range is six measurements and not a
trend. Both fixed, and the instrument caught me inventing a filename for the
correction.

### Instrument work, and one blind spot found by reading

- **`refs` could not see relative paths.** PATH_RE matched four hardcoded
  top-level prefixes, so `history/CHANGELOG.md`, `qc/README.md` and
  `staging/applied-D.md` were never checked, and neither was
  `scratchpad/anchored-check.js`, **which does not exist**. S2 found that one by
  reading. Paths now resolve the way a reader resolves them, against the citing
  file's directory and each ancestor.
- The custody gap it exposed is real: `anchored-windows.md` §3 and §5 cite a
  vanished session file for tables nothing in the repo can regenerate. The file
  is SPENT and now carries a header stating the gap, pricing the fix at under a
  minute, and forbidding quotation of the affected sections. Its "kill shadow"
  novelty claim is also retired there, since `GLOSSARY.md` lists the term as
  absorbed.
- **`scripts` now checks that a script parses.** All 131 do. A cited artifact
  that cannot run is a result nobody can reproduce, and it was the one property
  of the evidence base nothing tested.
- **`audit-numbers.js` exited 0 while printing FAILURES**, so it reported failure
  in prose and success in its exit code. It now exits 1, and `qc.js --full` runs
  all three gates.

### Method lessons this wave adds

16. **Where a family has an index file, that index is the least-swept document in
    the corpus.** S2's note, and it is exact: `paper/moire-primes.md` carries the
    23# dissolution and the solved rich vein correctly while `ATTACKS.md` and
    `ATTACKS2.md` still held the dead versions. An index looks like a summary and
    reads like a changelog, so nobody treats it as either.
17. **Running the artifact beat reading it, nine times.** Partition T's phrase.
    Two of its highest findings came from 30 to 64 second runs that no diff could
    have found, because every printed number is correct and the only defect is
    *which subset appears*.
18. **The scoreboard vocabulary is where false absence hides.** Thirty-five of
    T's forty hits on "never / not yet run / nobody has" were mathematical
    non-existence statements, while both of its real hits said **"unexplained"**
    and **"unexplored"**.
19. **Nothing in the repo links a "do X" to the artifact that later did X.** Of
    T's eleven HIGH findings, three sit in a *Next steps* section and two in
    scoreboard status cells. `natal-cap-21` item 1 is the worked fix: wave 4
    struck it and it now opens "DONE, by `natal-cap-27-t4-at13.js`".

## WAVE 4: the campaign audits its own damage

Three partitions: P on the calibration axis in the three files partition G had
honestly reported it did not reach, Q on the OEIS drafts, R read-only sweeping the
summary layer for scope flattening. The shepherd adjudicated and applied.

### The finding that matters most: THIS CAMPAIGN INTRODUCED AN ERROR

**R-1. The @13 beyond-Chebyshev bound exists. Wave 2 wrote into the entry document
that it does not.**

`research/natal-cap-27-t4-at13.js` summed T₄ at @13 over all **39,782,707,965
quadruples**, eight workers, 15.4 minutes, 23 checks passed, and prints its own
theorem: `P(S=0) <= 1.898e-6 at @13`, beating Chebyshev's 9.74e−4 by a factor of
**513**. `natal-cap-34` reproduces its T₄ to a relative 3.4e−16. Verified here at
the artifact.

Against that, wave 2 reconciled `natal-cap-21`'s two disagreeing lines by writing
"Not yet run, so the corpus holds exactly one beyond-Chebyshev ensemble bound, at
@11", and `README.md` said "@13 and @17 are not run". **`TODO.md` item 6 then
contradicted itself in nine lines**, citing "cap-27's certified value" for T₄@13
and calling the bound "never run" in the same paragraph.

**The mechanism is mine and it is worth stating plainly.** Wave 2's Decision 2 saw
the tension, said in terms "Both cannot be the first", and resolved it from
`natal-cap-21`'s own *Next steps* section. Nobody opened `natal-cap-27`, a file
whose name is `natal-cap-27-t4-at13.js`. The decision was taken from the document
that recorded the intention rather than from the artifact that recorded the result.

**And R's method note generalises it, so it goes on the record as a lesson.**
Every "not yet run", "never started" and "exactly one exists today" in this corpus
is a claim about the ABSENCE of an artifact, and an absence claim is the one thing
no citation check can test. `refs` confirms that what is cited exists. Nothing
confirms that what is said not to exist does not.

Fixed at four sites, and the @13 bound is now stated with its own correct
superlative: it is the first beyond-Chebyshev bound at a level where P(S=0) = 0 is
NOT provable by capacity, which @11's is not. cap-21 also predicted ≈ 2.9e−6 before
the run and cap-27's quartic Markov leg returned 2.85e−6, so the prediction was
borne out and that is now recorded too.

### R-2, the second HIGH: both papers gave a self-refuting reason

`wall-note.md` and `anchored-note.md` both said the X-limitation theorem is proven
at 13 and 17, "the levels where the ensemble maximum of VR is enumerated". The
home says that maximum is enumerated at **@11, @13 and @17**, and
`anchored-note.md` prints all three values, 2.78, 2.35, 2.14, four lines below the
claim that only two levels are enumerated. The *scope* was adjudicated in wave 2;
the *justification* was not, and it refutes itself inside its own paragraph. Both
now state the three enumerated levels and the true reason the content sits at 13
and 17, which is that @11 is closed outright by a separate result.

### Partition P: the three files were not clean, and the probe that found it was the only thing checked

P found **fourteen defects** on the axis nobody had audited. The priced gap was
the only thing in those files that was already right, because wave 3 had fixed
exactly that one number. Everything else on the axis was untouched:

- **A stale prohibition on a script repaired the same day.** `a3-05` §9 said
  "`research/Lgrowth.js` has not been fixed, and its sweep tables must not be
  quoted until it is". `Lgrowth.js` line 1 reads "The old runFor() was REFUTED
  2026-08-16 and has been corrected below." **This is worse than a wrong number:
  it is an instruction a future agent obeys without checking**, and it would send
  them to regenerate a sweep that already exists. Two further copies stood outside
  P's files, in `U-FRAME.md` and `a3-09`, both now fixed.
- **A slot count contradicting thirteen sites and a closed form**: T_29 given as
  214,708,853 where it is 214,708,725, forced by 3·∏(q−2), in a custody sentence.
- **A superseded sifting limit**: 4.42, which is Ankeny-Onishi, where the corpus
  settled on β₂ = 4.26645. The sentence's whole point was the distance to the
  limit, so the stale value overstated the gap. A third copy stood in
  `kappa-not-L.md` and is fixed.
- **Two documents contradicting their own pasted script output**, 81.0 where the
  script prints 53.96.

**P's method finding corrects a standing lesson, and it is the most useful thing
in the wave.** Lesson 2 says a word diff finds what reading cannot. P reports that
one of its fourteen came from a diff and that **five came from opening the home or
recounting against the script, where no diff could have helped, because there was
no near-duplicate to diff against**. A diff finds a dropped hypothesis. It does
not find a number that was never copied from anywhere, or a prohibition whose
subject was repaired underneath it. Lesson 2 stands and is now bounded.

### The Overshoot Budget's slack: one quantity, six renderings, now one

R-3 found the wave-1 range-collapse shape alive in a CLOSED verdict.
`gate-multiplies.md` §7's home states the lifetime slack as **measured 0.88 to
1.19 nats, tending to ln(1/0.55) = 0.598**. Five other sites quoted "about 0.6
nats", which is the conditional asymptote and the favourable end, and the
favourable end is what makes a closure look stronger than measured. It matters
here: the verdict rests on a counting tool loose by 3.5× to 6.7×, and ln 3.5 =
1.25 sits close to the measured top of 1.19. All six sites now carry the measured
range and name 0.598 as the asymptote it is.

### Partition Q: the OEIS drafts are instrumented, and they are NOT fit to leave

Three more errors, all in `oeis-G2-submission.md`, all in COMMENTS, none caught by
any instrument. That makes **five distinct error classes in two short documents**,
counting wave 3's index off-by-one and factor of two.

1. **The growth exponent was another sequence's number.** The draft quoted 1.57,
   which is h₂'s figure over 19 terms. G₂'s is 1.54 ± 0.09 over its ten exact
   terms, and `exponent-control.md` says in terms "Quote 1.57 for h2 and 1.54 for
   G2". **Q refused to copy the corrected number in** on the shepherd's routing,
   and rebuilt both from the control instead: raw G₂ x-frame slope 1.801, bias
   +0.262, giving 1.539. Its control table reproduces `exponent-control.md` §1
   digit for digit at all five widths. That is the sixth refusal of a supplied
   answer in this campaign, and the sixth time the refusal was right to insist.
2. **Maier-Pomerance was cited in the wrong direction**, deriving a LOWER bound
   from what FGKMT state as an UPPER bound. The corpus separates the equality form
   from the inequality form explicitly and the draft collapsed them.
3. **"No upper bound is published at any exponent"** is contradicted by this
   repository's own `paper/beta2-note.md`, which holds `G₂ ≪ p^(β₂+ε)` as a
   THEOREM. Rewritten to state the open band (2, 4.2665].

**The null results are results and are recorded as such.** All fourteen A-numbers
were fetched from oeis.org and none is wrong. The seam draft has no correctness
defect: all 20 DATA terms and every witness reproduced under two independent
primality tests, and OEIS confirms it four independent ways. Wave 3's factor-of-two
fix was **rederived from Mertens rather than accepted**, and stands. Three absence
searches returned nothing **against two positive controls through the identical URL
form**, which is lesson 5 applied without being asked.

**Readiness judgement: hold.** Two mechanical blockers, both LINKS entries being
filesystem paths where OEIS requires a URL. But the real reason is the pattern.
Every one of the five errors lived in a NAME or COMMENTS field, prose asserting
things at a strength the corpus does not carry, **which is exactly what the new
`calibration` check cannot see**, because a submission does not use the internal
marker vocabulary. `audit-numbers.js` gained **39 checks** covering the drafts, so
all five retired values now fail the run if reintroduced, and it passes **78/78**.
Instrumentation is not a track record.

### The regression test was failing and the gate was green

Q handed back two failing checks in `audit-numbers.js`. They turned out to be
checks **written deliberately to fail**, as a standing flag on a documentation
disagreement: G2-STATE said 487 where the computation and two other files say 488,
and one file was recorded as saying 475 where the computation says 476. Settled
here on the computation: G2-STATE now reads 488, no 475 survives anywhere, and
both checks are ordinary passing assertions carrying the retired value in their
label.

**The lesson is about the shape, not the numbers.** A deliberately-failing check
stops working the moment nobody remembers why it fails, and it cannot distinguish
"the disagreement is still live" from "somebody broke this". Worse, `qc.js` does
not run `audit-numbers.js`, so the campaign's own gate read TOTAL 0 through four
waves while the corpus's numeric regression test was failing. **A green gate that
does not include every instrument is a partial green.**

### Smaller, and all verified at both ends before applying

The papers' Door 5 stated the two-class construction constant as a flat 1.90 where
its home says the ratio is not constant at all, running 1.04 to 1.95, with an
explicit instruction to quote it with the level attached: wave 2 scoped the home
and the paper never inherited it. `beta2-note.md` still called Iwaniec's Lemma 1
"possibly erroneous" after the campaign ruled that word dropped and applied the
ruling only to `PAPERS.md`. `certificate-engine.md` said its three PROVEN rows
"need no qualifier" while its own scope column and §1 say the Certified-Head
Theorem certifies **nothing at @13**. The flagship stated the sufficient condition
as `G₂ < p²ₙ₊₁ − pₙ` where four sites say `− 2`. Holt's corpus was called "twelve
arXiv manuscripts" in four places against `PRIOR-ART.md`'s own **fourteen-row**
table, every row carrying its own verdict. And full decoupling "halves the band"
in three places where the exactly computable figure, printed in a fourth, is 71%.

**R-9 looked like broken arithmetic and was a dropped scope.**
`exponent-control.md` §6 says the 21 terms read 1.924 against x, the control's
bias is +0.282, "so after correction the frames land at 1.567". 1.924 − 0.282 =
1.642. The script settles it: the corrected figures are computed on the **[5, 73]
range, 19 terms**, whose raw x-frame slope is 1.847, and 1.847 − 0.280 = 1.567
exactly. The script labels the range in its own output and the prose dropped it,
which turned a correct calculation into one that cannot be checked.

## WAVE 3: the splits, the instrument audit, and two compute jobs

Five partitions ran in parallel: H (the U-FRAME split), I (the flagship split),
G (residual history migration and the script headers), J (read-only, the thirteen
`transfers` findings) and K (read-only, the slope question). The shepherd took the
instrument audit and the routing.

### The headline: nobody had ever tested the instrument the campaign runs on

By wave 3 the whole campaign rested on `refs` and `crosslinks` reading zero. The
campaign's own fifth lesson says a grep returning nothing proves nothing until the
pattern is checked against a known positive, and that lesson had never been turned
on the checks themselves.

Every check was run against a fixture corpus of deliberate defects, one per class,
each copied from a defect this campaign actually found. Four fired correctly.
**Three blind spots turned up, all now closed:**

1. **`refs` could not see the prose form.** It matched a filename plus a section
   sign but not "U-FRAME section 4 and section 6a", which is the form running text
   uses, and is the exact shape of the orphan `gate-multiplies.md`:332 carried. The
   corpus holds 20 such pointers. All 20 resolve, so the gap was not hiding a live
   defect, but nothing was stopping the next edit from making one. **The probe that
   established the 20 was itself checked against a known positive before its zero
   was believed.**
2. **`crosslinks` let history confer reachability.** It counted a mention in any
   file, and `research/history/staging/` alone holds sixteen reports naming most of
   the corpus by path. A document cited only by the record of its own retirement
   scored clean.
3. **`crosslinks` accepted orphan cliques.** Counting inbound edges lets documents
   clear each other. It now walks transitively from the entry set over body-only
   edges. **Within minutes of the fix it caught three real files in that state**,
   the U-FRAME children, mid-split and not yet linked from their parent. The old
   check would have passed them silently.

**`quotes` was the weak one, and the number is the finding.** It reported "3
checked" against a corpus holding 125 quoted spans: **2.4% coverage of the
campaign's dominant defect class.** "3" with no denominator reads like a corpus
with three quotations. It now prints the denominator and the reason for every span
it drops. Widening the document-token search to the paragraph, while keeping the
attribution cue on the same line, and accepting the possessive and noun forms of
attribution took coverage to 8, and **two of the newly reachable spans were live
dead quotations**: `OBSERVATIONS.md` quoting a sentence `GLOSSARY.md` no longer
contains, and `h2-scoping.md` quoting a recommendation `exponent-control.md` §8 had
already reversed. Both are the wave-1 orphan shape, the claim correctly fixed and
the note about fixing it left behind.

**The audit is now a standing test.** `node research/qc/selftest.js` rebuilds the
fixture in a temp directory, asserts all eleven known positives fire and two
controls stay silent, and exits 1 if any case is wrong. That converts a one-off
finding into a permanent property: a future agent can establish in half a second
that a zero from `qc.js` means something, which is what the campaign spent wave 3
discovering it could not previously assume.

A false-positive shape was found and is now documented: **a quotation carried in
order to be corrected is not a dead quotation.** `staircase-note.md`:287 quotes the
staircase script's "exact < RS < PNT at all four levels" precisely because the
script's own output refutes it at @19. Flagging that would ask an applier to delete
the correction. The suppressor costs real recall and the cost is recorded: it hides
the `h2-scoping.md` orphan, which had to be found by hand.

### The transfers ledger, and why it is keyed on content and not on position

J word-diffed all thirteen `transfers` findings and returned **11 KEEP, 2 DEFECT**.
The eleven were correct under Chris's rule that restatement adding context earns
its tokens. But an adjudicated pair reappears on every run forever and costs every
future agent the same read, which is the opposite of the goal.

`ADJUDICATED` in `qc/checks.js` now records each verdict with its reason. **The key
is a content fingerprint of both passages, never a file and line, and that is the
whole safety property.** Edit either side and the fingerprint changes, the
suppression lapses, and the pair returns for re-adjudication. A ledger keyed on
position would keep hiding a pair after someone quietly dropped a hypothesis from
it, converting the corpus's best instrument into a blindfold. **The lapse was
tested**, not assumed: editing an adjudicated passage brought its finding straight
back. `transfers` went 13 to 0 with the count of suppressions printed.

Two entries record a REPAIR rather than a KEEP, because the pair still
near-duplicates after the fix and would otherwise return forever looking exactly
like the defect that was already mended.

### D-1, the campaign's last dropped hypothesis, and it was load-bearing

J's one real defect, confirmed by me at both ends. The home, `U-FRAME.md` §5a step
2, states the copy theorem for the maxsum family as **"exactly (VERIFIED 40 of 40,
over five folds and m ≤ 8)"**, resting on an empirical clause the corpus has never
proved: no straddling window ever beats a single-copy one. Both copies lost part of
that:

- `gate-multiplies.md` §6 said flatly **"These are identities"**, with no
  calibration marker at all, and then rested a conclusion on the exactness: "NFP
  cannot touch it and neither can the Overshoot Budget, because an identity
  overshoots by nothing."
- `gate-multiplies.md` §9 kept "VERIFIED 40 of 40" but dropped "over five folds and
  m ≤ 8", in the section a reader opens for what survives.

This is the branch's only live entry point: `TODO.md` 0c builds on it, `U-FRAME.md`
§7 item 2 repeats it, `G2-STATE.md` lists it as one of three escapes from the
no-fixed-point argument. All three sites now carry the marker, the range and the
unproven clause. **`TODO.md` 0c was clean throughout and was the control case**: it
was the only downstream copy that already carried all three together.

Also fixed, from J: `gate-multiplies.md` §8's boxed survivor named two measured laws
where §10 of the same file says three, omitting rho, the input that generates the
whole spread and which the box uses one sentence later; and the same box collapsed
the gap to **"a factor 0.58 ln p, and nothing else"** where §9 of the same file and
five other sites read 0.58 to 0.95. That is the wave-1 Q5.1 amendment reappearing in
a box nobody had re-read.

### The two compute jobs, both settled

**The absent column is filled, with its control.** `natal-cap-30`'s @29 row carried
one cell marked absent, max|no30|. `natal-cap-36-skeleton-door.js` gained the column
(both quantities were already in the loop, so it cost nothing beyond the pass) and
the pass was re-run: **max|no30| = 0.0054 at q = 1109**, the largest in the table and
still four times inside the margin. Every other figure on both rows reproduced
exactly, and the @23 control row's 0.0039 matches cap-30's own @23 row, so the new
column arrived with its control already passed. Measured runtime 11.3 min against
the recorded 18.5, and the record now carries both figures rather than quietly
replacing one.

**The slope question: no inconsistency, and the recorded reconciliation was half
wrong.** K regenerated all three point sets rather than transcribing them. The
answer is that the 1.06 and 1.45 fits **are not two datasets**: the seven tile points
are the first seven of the 42 census points and carry the same f, agreed by three
independent routes to 1e−16 on the five enumerable folds. Restricting the 42 to the
tile x values returns 1.062 by construction. Statistically the two are
**undecidable**: the seven-point 95% interval is [0.319, 1.805], which contains
1.451 and contains 1.

U-FRAME's stated reasons for the difference were both wrong and are withdrawn. The
comb correction does not explain it (comb-correcting the seven moves them to 1.161,
*away* from 1.451) and neither does truncation (1.450 to 1.436). What is real is
stronger than what was claimed: **the coefficient is range-dependent under every
specification tried**, halves 1.695 against 0.906 at t = 2.92, a significant
quadratic term, and 1.866 against 1.115 even comb-corrected. No specification gives
a stable slope. Downstream, L at x = 1000 moves between **30.8 and 42.9** depending
on which half anchors it, so the recorded 35.5 carried a hidden band of ±7. The
branch call survives, since the whole band stays under ln²x = 47.7.

K also separated an object that had been silently compared: the 1.30 fit is the
unconditional tail, not f, and the decomposition closes exactly (tail slope 1.311
plus comb-share drift 0.366 = 1.677, the f slope on the same 30 levels). And it
found that `U-FRAME.md` §5a step 7's heading asserted **"slope 1"** on an interval
spanning [0.32, 1.81], which is now stated with its standard error.

### The splits, both executed pointer-safe

`U-FRAME.md` 1,032 → 772, into `kappa-not-L.md`, `operator-and-pair-count.md` and
`f-decays.md`. `paper/moire-primes.md` 1,097 → 778, into `paper/wall-note.md`. In
both cases **every heading kept its number and its text**, so all inbound pointers
still resolve, including the fifteen inside pasted script output that must not be
edited. Both agents proved the moved blocks verbatim by word diff rather than by
reading, and both reported the complete list of differences.

**H refused the redundancy list in its brief and was right.** All four items, the
doubled Alternation Lemma, the tripled closed form, the §12/§5a overlap and the
L(T₂₃, 29) ordinals, had already been fixed by partition B in wave 2; the line
numbers in the brief were pre-wave-2 addresses. **There was no ordinal to settle.**
That is the fourth time in this campaign an applier has refused a supplied answer
and been right.

**H also declined to shrink the stubs to the size asked for, with evidence.** Nine
forward references from §§1-9 point into §§10-12 for a specific fact; a 4-line stub
turns at least three of them into promises the file no longer keeps, and the
alternative was editing the two most-referenced sections in the corpus to save nine
lines. Accepted.

**And H reported the honest total**: the working set shrank by a quarter, the corpus
total grew by 87 lines, and it did not present the first number as if it were the
second.

**I found a live residual while verifying that wave 2's three paper defects had
landed** (they had, all three, verified at their homes rather than from the applied
report). `applied-F.md`'s handoff C-5 had been applied only in half: §8 still claimed
the anchored calm was quieter than its ensemble "in four places", while its home
`NATAL-CAP-CAMPAIGN.md` is headed "one sighting, not four" and names what each of
the other three dissolved into. The flagship was claiming four surviving sightings
where one survives.

### Partition G, and the fifth refusal of a supplied answer

**G refused G-1 and was right, and the way it caught the error is the point.**
The supplied retitle read "the anticorrelation **proven** in aggregate".
`natal-cap-23-covadj-proof.md`:184 carries `[OPEN] the aggregate theorem … for
all x` and the script's own reading 7 is "NEXT STEP: prove the aggregate form".
The aggregate is certified at every computed level and has never been proven for
all x. **The supplied G-1 contradicted the supplied G-3 two rows down**, which
said "certified at every computed level", so the brief disagreed with itself and
the applier caught it by opening the artifact. Both verified here. One word
changed, "proven" to "certified". That is the fifth time in this campaign an
applier has refused a supplied answer and been right, and the rule now has no
counterexamples.

**A second externally-visible error, in no report, in an OEIS submission draft.**
`oeis-seam-submission.md`'s Hardy-Littlewood heuristic dropped the prime 2 from
the twin-candidate density, and the spurious `/2` in the expected count was that
same error propagated. Verified here against the corpus's own constant: the mean
gap satisfies mbar/ln²x → e^{2γ}/(2C₂), so writing the per-seam probability
through `P/A059861(n)` cancels the twin constant exactly and no `/2` survives.
The corrected form predicts 57.3 asymptotic and 52.5 by exact k-sum against **48
observed**; the retired form predicted 26.3, and 26.3 doubling to 52.5 confirms
the defect was exactly a factor of two.

**The repository already held a regression test against this precise slip and it
could not reach the file.** `audit-numbers.js`:63 checks
`e^{2γ}/(4C₂) = 1.2013`, labelled in the code "the retired factor-2-slipped
value", against the correct `e^{2γ}/(2C₂) = 2.4026`. Same constant, same factor,
and the audit's scope is the research corpus rather than the submission drafts.
**An OEIS draft is one of the few artifacts here with an external consequence,
and it sits outside every instrument the campaign built.** That is a coverage
statement worth acting on before anything is submitted.

**The second OEIS proof exists and the brief garbled it twice.** With
`A059861(n)` the fit returns mean 0.4814, sd 0.0490, **cv 10.2%**, range
[0.4463, 0.5939], reproducing `maxgap-law.md`:66's c₂′ row digit for digit
including both endpoints. The brief's "9.5%" was the population sd where the
corpus quotes the sample sd, and 0.4814 is in neither `oeis-*.md`, which round to
0.48 and 10%. With `(n−1)` the fit collapses to mean 0.0406 at cv 69.4%. G also
found two proofs no report had: the file's own EXAMPLE and its own provenance
table, both already indexed at `(n)`. Four proofs, three independent of the fit.

**Coverage, stated honestly, and it defines the next wave.** Part 1 is complete on
ten of eleven files. Part 4 is complete on the three files named in its scope, but
the dominant find, `0.58 ln p` standing where the home says **0.58 to 0.95 ln p**,
in three files all descending from one `gate-multiplies` §8 reading, came out of an
accidental sweep of files that were only ever in Part 1's scope.
**`a3-05-bound-L.md`, `localized-04-maxsum.md` and `level-ledger-tight.md` got
migration and an orphan sweep but no systematic calibration check against their
homes**, and one number found a live flattening in all three. They must not be
assumed clean.

Seven orphans of the predicted inverse shape were fixed. Two are worth keeping in
mind because both are second instances of orphans already fixed elsewhere and
neither was caught by any check: `exponent-control.md`:219 quoted a phrase
present in no working document, and `localized-04-maxsum.md`:392 quoted U-FRAME
§9's "one rung, no ladder" when §9 now records that hole as closed and cites this
very file as what closed it. **The same §9 orphan had two further copies**, in
`LOCALIZED-GAP.md` and `G2-STATE.md`, both fixed here.

**A tooling defect, found by an agent noticing its own drafts were wrong.**
`gen-scripts-index.js` silently truncated any banner title that wrapped across two
comment lines, with no ellipsis and nothing to signal the title was incomplete;
two of G's drafts reproduced the truncated form believing it was the real title.
Fixed by joining continuation lines under a narrow rule, with a dangling-function-word
test to catch the one continuation that begins with a proper noun. Five titles were
being cut. **The failure mode is the campaign's own in miniature**: an artifact
stating something false, and every downstream reader inheriting it.

### Method lessons this wave adds

6. **Audit the instrument before trusting its zeros.** Three blind spots, two of
   them in the check the campaign leaned on hardest, and one of them caught a real
   defect within minutes of being fixed.
7. **A silence needs a denominator.** "3 checked" and "3 of 125 quoted spans" are
   the same fact and opposite reports. Any check that cannot say what it did not
   look at invites a reader to mistake silence for cleanliness.
8. **Record a verdict so it is paid for once, but key it to content.** Suppression
   keyed on position is how an instrument becomes a blindfold.
9. **A supplied count is as dangerous as a supplied value.** J reported the corpus
   holds 14 scripts with correction banners and I measured 16; both were wrong. The
   generator computes 18 and prints it at the top of `SCRIPTS.md`, and the README
   was right all along. The authority is the artifact that computes the number.
10. **A brief that contradicts itself is caught by opening the artifact, never by
    reading the brief.** G-1 and G-3 disagreed about whether the same object was
    proven or certified, and nobody drafting or reviewing the handover noticed.
11. **Ask an agent what it did NOT reach.** G's coverage paragraph, naming three
    files that got migration but no calibration check, is worth more than its
    completed work, because it is the only reason the next wave will look there.
    An applier that reports only what it finished leaves the gap invisible.
13. **An absence claim is the one thing no check can test.** Every "not yet run",
    "never started" and "exactly one exists today" asserts that an artifact does
    NOT exist. `refs` confirms that what is cited is real; nothing confirms that
    what is said to be missing is missing. Wave 2 wrote one such claim into the
    entry document from a document that recorded an intention, while the artifact
    recording the result sat in the same directory under a matching name. **Before
    writing that something was never run, list the directory.**
14. **A diff finds a dropped hypothesis. It does not find a number with no
    parent.** Five of partition P's fourteen defects had no near-duplicate to diff
    against: a count that disagreed with a closed form, a prohibition whose subject
    had been repaired, a document contradicting its own pasted output. Lesson 2
    stands and is now bounded, and the complementary move is to open the home and
    recount.
15. **Fixing the one number that was checked proves nothing about the rest.** The
    priced gap was the single probe anyone had run through those three files, and
    it was the only thing in them that was already correct. A file is clean on the
    axis you tested and unknown on every other.
12. **Check what the instruments cannot see, not only what they say.** The
    corpus held a regression test against the exact factor-2 slip that was live
    in an OEIS draft, and the test's scope did not include the drafts. The
    artifacts with external consequences are the ones furthest outside the
    campaign's tooling.

## STATE AT THE END OF PHASE 1, and what the next session picks up

**Read this first, then `attack-block-00-ADJUDICATION.md`.** Three campaigns ran
on 2026-08-18: wave 6 of the consistency campaign, the ten-attack block
campaign, and phase 1's nine agents. The wave-6 and wave-5 versions of this
section survive below and their method lessons are live; their *task lists* are
spent.

### The gate

`node research/qc.js --full` passes: **EIGHT checks clean, 15 known positives
firing, 7 controls silent, 103 numbers recomputed.** `sourcing` was added on
Chris's rule that our tested claims must name the script that produced them;
`units.js` is the lookup for the brief layer, which the gate does not defend and
where six of the session's nine adjudicator errors lived.

### The one item that is a call site

**The @13 gate is met today.** cap-32 already ships `k4direct`, an exact version
of the k4 Monte-Carlo shape that was the last obstruction; at full @13 it
returns 60234.496774278130 in 198.9 s on one core and moves the assembly from
REL −1.021692e−9 to **−2.753038e−13, the gate MET by ×3600**. One call site, not
yet edited because it changes what the script computes.
(`phase1-W2-cal4-routing.md`.)

### What retired

TODO item 0's certificate route: the sieve Gaussian maximal law **is
TPC-implying**, so no weak form is both soft-provable and sufficient. The theta
ladder retires as a TPC-reachability instrument, and its "headline of the run"
crossing **does not happen** — `theta-ladder-sup.js`:18 hard-codes `u = 3.2`, so
every `need_true` was measured at a window 39–62× too long. The legal target is
now named precisely: a maximal law for rho, 2.43 at z = 43 and rising, against
β₂ = 4.2665.

### What is open

TODO **1b–1e**, four pre-registered tests. Two sealed pre-registrations exist
(commits `2f6c49e`, `3902944`). And the finding that governs the measurement
strategy: **the separation point between the two live hypotheses for G₂'s growth
is x = 53 or x = 151, and lies past the end of every route that exists**, so the
43#/47# terms cannot settle it however welcome they are.

### Superseded task list from wave 6, kept for its reasoning

`node research/qc.js --full` then passed: **7 checks clean, 14 known positives
firing, 5 controls silent, 90/90 numbers recomputed** (78 before that wave, plus
12 for the loudness driver).

**The mathematics item on wave 5's list is settled and it produced a theorem.**
The Loudness Ceiling Conjecture holds at @19 with margin ×271.7, and because its
per-level hypothesis is algebraically the X-limitation theorem's, **that theorem
now holds at @11, @13, @17 and @19.**

**Every surface wave 5 named as unswept has now been opened**: both index files,
all sixteen fold-profile scripts, the three expensive natal-cap scripts, all
eight logs, all three `.txt` outputs, the leaf notes, and — for the first time
in the campaign — the literature, by a partition with web access.

**All 129 scripts now carry pasted output and readings.** That surface is
complete for the first time.

### What remains, ranked

1. **THE ONLY MATHEMATICS ITEM, and it may redirect a standing plan.**
   Partition W's cap-34 run grades the wrap precision and implies **CAL4 =
   0.932164 where cap-32 used 0.87**; the best assembly misses the 1e−9 gate by
   2%, with the k4 Monte-Carlo shape alone contributing 8.29e−10; and stage
   `kurt` prices the @17 rung at relT4 ≤ 3.06e−10 against cap-32's ±4e−4, six
   orders short. If that holds, the corpus's standing "meet the @13 gate, then
   rerun @17" plan is aimed at the wrong obstruction. **Not adjudicated in wave
   6.** It wants a mathematics pass, and it is cheap now that cap-34 is priced
   at 25 minutes rather than "hours".
2. **Chris's six, in the decision queue at the top of this file.** Unchanged
   except that item 6 is new (frozen records vs live indexes) and item 5's OEIS
   absence claims are now verified rather than assumed.
3. **The three findings partitions reported and nobody has applied.** Partition
   Y filed 29 findings and the shepherd applied its three highest; X filed 15
   and the shepherd applied 6; V filed 18 and W 8 `.md` disagreements. **The
   remainder are in `qc-wave6-{U,V,W,X,Y}.md` and are the first bulk work for
   wave 7.** Per lesson 24, they are hereby assigned to wave 7's shepherd rather
   than to a partition that does not exist yet.
4. **Three literature claims partition X could not resolve**, because Semantic
   Scholar, erdosproblems.com's search, Siebert 1976 and Halberstam–Richert are
   all closed to it. Its ranked unreached list is the place to start, and a
   human with database access settles them in an afternoon.
5. **The surfaces still unread**, named by Y: `GLOSSARY.md`:218-349, the whole
   anchored layer, ~130 natal-cap-derived numbers checked for internal
   arithmetic only with no home document opened; `localized-04-maxsum.js`, now
   two waves un-re-executed; PRIOR-ART's ~30 external citations; and
   `oeis-G2-submission.md`'s PARI program, unrun in six waves and still
   requiring a real `gp`.
6. **A new defect surface with no instrument**: Y's observation that "clean"
   verdicts in earlier apply-reports are themselves unchecked, and that five
   findings share a shape — a band or precision claim whose endpoints came from
   a subset of the rows, every printed number correct — that `audit-numbers.js`
   passes straight through. Nothing tests a range against the rows it was drawn
   from.

### The quantitative caveats every downstream consumer must carry

Unchanged from wave 5: L at x = 1000 is 30.8 to 42.9, not 35.5; the Overshoot
Budget's slack is measured 0.88 to 1.19 nats and 0.598 is a conditional
asymptote; the priced gap is 0.58 to 0.95 ln p at both ends; the two-class
construction ratio is 1.04 to 1.95; and the L shape ratios are not flat. Wave 6
adds: the X-limitation theorem is four levels, not "from @13 upward"; max VR
does not fall; the Unification Law is MEASURED and HL-conditional on
1 ≤ u ≤ 2; and the seam slot-enrichment is 20× to 28× by level, not a flat 25×.

## STATE AT THE END OF WAVE 5, and what the next session picked up

Waves 1 to 5 are complete. **Read this before starting anything.**

### What is done

`node research/qc.js --full` passes: **7 checks clean, 14 known positives firing,
5 controls silent, 78/78 numbers recomputed.** One command now runs the whole
gate and exits 1 if any part fails, which through four waves it could not do.

**All 131 scripts have been opened**, which no wave had done before. They
produced the mathematical finding of the campaign (max VR is not on a trend), the
discovery that a refuted algorithm was still running inside a live script, and
proof that the corpus's own instrument had been reporting a partial green.

### What remains, ranked

1. **A COMPUTATION THAT WOULD SETTLE A LIVE CONJECTURE.** The Loudness Ceiling
   Conjecture asks max_t VR < S̄²/(K·V̄). Max VR at @19 is now known, 2.293, and
   **the @19 driver has never been computed**, so nothing says whether 2.293
   clears the @19 threshold. One run decides whether the conjecture survives its
   first real test or fails it. This is the only item on the list that is
   mathematics rather than bookkeeping, and it is cheap.
2. **Everything else of consequence is Chris's**, unchanged: the §7A spine
   question, Door 5's claim strength, Zone Equivalence in the proven spine, and
   the remaining mirror/palindrome novelty claims.
3. **The OEIS drafts stay HELD.** Five error classes found across two short
   documents, now covered by 39 checks. Before submission: fix the two LINKS
   entries, which are filesystem paths where OEIS requires a URL; run the PARI
   under a real `gp`, which no partition could; and get an expert read.
4. **The next sweep has a named target and it is not the scripts.** Partition S2:
   **where a family has an index file, that index is the least-swept document in
   the corpus.** `ATTACKS.md` and `ATTACKS2.md` are the two to put in front of
   the next partition; both still held dead versions of claims the papers above
   them had already corrected. Partition T also leaves `research/wave7-logs/`,
   three `.txt` outputs, and the whole literature layer, where every `[ABSENT]`
   in `covering-dive.md` Q1–Q5 is unverified because no sub-sweep had web access.
5. **Sixteen fold-profile scripts have no OUTPUT and no READINGS block**, against
   the house format `SCRIPTS.md` states. A third of that family cannot be audited
   against its summaries at all. `natal-cap-34`, `-35` and `-37` are in the same
   position and are expensive to re-run, hours not minutes.
6. **Two unreproducible sections.** `anchored-windows.md` §3 and §5 cite a
   vanished session file; the header now says so and prices the fix at under a
   minute. It is SPENT, so this is cheap insurance rather than urgent.
7. **The quantitative caveats every downstream consumer must carry**: L at
   x = 1000 is 30.8 to 42.9, not 35.5; the Overshoot Budget's slack is measured
   0.88 to 1.19 nats and 0.598 is a conditional asymptote; the priced gap is 0.58
   to 0.95 ln p at both ends; the two-class construction ratio is 1.04 to 1.95;
   and the L shape ratios are not flat.

### The method lessons, which matter more than any single fix

Lessons 1 to 5 came out of waves 1 and 2; lessons 6 to 9 are in the wave-3 section
above, where the work that produced them is described.

1. **The defect class is cross-document, not arithmetic.** A claim gets fixed in the
   research layer and the summary layer above it goes on asserting the old thing. The
   citation resolves, the calibration marker is intact, the numbers agree. Nothing but
   comparing the two documents finds it, which is why `qc.js` exists.
2. **A word diff finds what reading cannot.** Every dropped hypothesis in this campaign
   survived every check that was not a diff.
3. **Agreement is not independence.** `qc-status` rated the X-limitation scope HIGH
   confidence because three documents agreed; they were three descendants of one home.
   Before trusting "N sources agree", check whether N is really 1.
4. **Hand an applier the evidence, not the answer.** Partition C refused its supplied
   replacement text and recomputed, finding five comb frequencies where the source said
   four. Partition E refused the shepherd's and re-derived, preventing a wrong constant
   from entering a home document. Both were right, and in both cases the supplied answer
   was wrong.
5. **Re-research beats internal consistency for citations.** The FKMPT constant was
   internally consistent across the corpus and its own bibliography, and retracted at the
   source. Only fetching the paper caught it.

## Adjudications

### Wave 1, `qc-status.md` (729 lines, 13 findings): ACCEPTED, three spot-checked

The report was verified rather than taken on trust. Three findings were re-checked
at both ends against the primary files, chosen as the three with the largest
consequences. All three stand exactly as written.

**A-1, ACCEPTED, apply as written.** `GLOSSARY.md`:265 opens "**Lemma V** — the
one missing ingredient on the exponent road". `sift-limit-attack.md`:47-53 says
the working point has s/u ≈ 1.2, "**outside the range s ≤ u that Lemma V is
stated in**", and closes "The whole price of the route is that one maximal
inequality", meaning a Gaussian maximal law. Four documents including the home
agree against the glossary. Verified at both ends. The defect is in the file
`README.md` tells a reader to open first, so it is the highest-priority status fix
in the corpus.

**B-2, ACCEPTED, apply as written.** `README.md`:49-59 lists the Fused-Window
Calm Lemma inside a sentence governed by "Proven:". Its home,
`natal-cap-30-skeleton-bound.md`:110-125, grades the four legs separately: (i) and
(ii) PROVEN, (iii) **THEOREM at x = 11..23 with the all-x case OPEN** at a named
analytic door, (iv) **MEASURED**, and says of (iv) in terms, "this leg has no
proof mechanism in sight; it is the calm's last wall." Two of four legs are not
proven and the entry-point document says they are. Verified.

**F-2, ACCEPTED, and it is the one finding that returns work rather than costing
it.** `THE-DIALS.md`:121-125 flattens the equidistribution axis to "already
returned the verdict for us: **inert.** … Do not spend effort here."
`bv-import-survey.md` scopes that word narrowly: at line 217 the axis is inert
*for integer counts rather than prime counts*, in the specific band where n and
n+2 are both y-rough. Elsewhere the same survey states the opposite for other
legs: §3.2 is titled "Provable by BV: the full-wheel prime-comb equidistribution,
tail regime", line 197 calls the full wheel product at depth q_K = T^{o(1)} "a BV
theorem", line 225 marks an item "provable NOW, elementarily", and line 267 says
"Assumption A is a theorem for the P₂-weakened comb, and BV is what proves it".
Read literally, dial 7 retires TODO item 11, which asks for exactly three
BV-provable theorems that need writing up rather than discovering. Verified.

**Method note worth keeping.** Every one of these three is the same shape: a
summary document flattened a *scoped* status into an unscoped one. Not one of
them is a wrong number, and none would be caught by checking arithmetic. The
generalisable check is to compare each summary claim against the scope its home
document attaches, which is what this report did and what the earlier
per-file audit could not do.

### The five decisions `qc-status.md` escalated: three settled here, one is Chris's

The agent was right to escalate rather than guess. Three of the five did not need
Chris, only compute or a script read, and are settled.

**Decision 1, the @29 certificate: RE-RUN, and it is running.** The agent's
reading of the house rule (code > output > readings, so the embedded output IS
the record) is defensible, and I am overriding it anyway, because the standing
custody rule for this repo is to reproduce a level before quoting it. 18.5 minutes
is far cheaper than a wrong certified level reaching a paper.
`natal-cap-36-skeleton-door.js --at29` is running; its output lands in the session
scratchpad at `at29-rerun.log` and F-1's fix is gated on it matching.

**Decision 2, `natal-cap-21`'s beyond-Chebyshev scope: @11, singular, and the
agent's proposed fix text needed correcting.** The script's own pasted output
settles it: "THEOREM (finite computation): P(S=0) <= 1.49e-6 at @11 by exact
moments 1..6 + Markov — **the first** beyond-Chebyshev unconditional ensemble
bound", and `natal-cap-21-beyond-chebyshev.md`:31 heads it "Theorem 2 (the first
beyond-Chebyshev unconditional ensemble bound) [verified]", singular. So B-3's fix
text must read **@11**, not "at @11 and @13".

**And settling it exposed a defect the report did not carry, now added to wave 2.**
`README.md`:57 claims "the first beyond-Chebyshev ensemble **bounds**", plural.
Only one is established. @17 never started (`TODO.md` item 6, "the @17 rerun
itself, which never started"), and @13's status is not clean either: the same
`natal-cap-21` file that heads Theorem 2 as "the first" also carries, at line 141,
a next-step reading "Run @13's T₄ offline (~90 min) → first beyond-Chebyshev".
Both cannot be the first. Either line 141 is stale relative to Theorem 2, or the
two refer to different objects (the @11 rotation ensemble versus the @13 natal
comb) and neither says so. **Fix: `README.md`:57 to the singular "the first
beyond-Chebyshev ensemble bound", and reconcile `natal-cap-21` lines 31 and 141
against each other.** NEEDS MATH JUDGEMENT for the second half.

**Decision 4, where the Natal Dispersion Lemma and the lineage identity live:
`FOLD-PROFILE.md` §9, as the agent recommended.** Both are fold-profile results,
that file is their natural subject, and it is already their de-facto home in the
session record. Taken by me rather than split between two agents, per the agent's
own request that it be decided once.

**Decision 3, Zone Equivalence in "the proven spine": CHRIS DECIDES.** This is
genuinely editorial and not resolvable by evidence. `PRIOR-ART.md` says present it
as a framing device rather than a result. The narrow option annotates it in place;
the stronger option drops it from the spine list and folds it into the statement of
the target in `ZONE-POSTULATE.md` §2, where the weak-form equivalence already
lives. **My recommendation is the stronger option.** An equivalence between our
target and TPC is a restatement of what we are trying to prove, and listing it
beside the Copying Theorem invites a reader to count it as progress. Removing it
from the spine costs nothing, since the content stays where it is used.

**Item 5 was not a decision** but a correction to my brief, accepted: four seed
objects do not exist as named objects in the working corpus, and the seed list's one
real omission was the Unification Law, which carries three findings.

### Wave 1, `qc-history.md` (619 lines): ACCEPTED, including all three corrections to the brief

**Three briefing errors, all accepted, and the third is the most valuable thing in
the report.**

1. **There is no bulk-relocate candidate anywhere in the corpus.** I expected whole
   spent files to move to history/ and briefed for it. The agent hunted specifically
   and cleared ATTACKS, ATTACKS2, ATTACKS3, NATAL-CAP-CAMPAIGN and OBSERVATIONS in
   writing. The process record is distributed as *framing inside live documents*, so
   this is a sentence-level job, not a `git mv`. Recorded so no later agent goes
   looking again.
2. **My five-section list was right but incomplete**: four more of the same kind,
   `maxgap-law.md` §10 (a debt list whose three debts are all paid),
   `level-ledger-tight.md`:47-67 (an agent-to-parent handoff claiming "nothing was
   edited" when everything it asked for has been), `theta-ladder.md`'s two costing
   blocks, and `gate-multiplies.md` §7/§9's retired-TODO framing. Plus
   `theta-ladder.md` and `maxgap-law.md` are whole brief-response documents, 18 and 7
   sites where "the brief" is the grammatical subject.
3. **`research/*.js` must be EXEMPT, and `audit-numbers.js` especially.** The
   reasoning is better than mine and I am adopting it wholesale: a script header
   saying "the output below is superseded" is that artifact's *current status*, not
   our learning, and it is the only guard between a reader and a runnable wrong
   number. `audit-numbers.js` is a regression test **against retired numbers**, so
   stripping them would delete the enforcement behind the changelog itself. Exempting
   the scripts protects the corpus rather than excusing work.

**The orphan class is the inverse of what I predicted, which changes what to hunt.**
I warned that removing a correction block without fixing the claim leaves the
document asserting the wrong thing. Fourteen of the fifteen orphans are the mirror
image: the claim WAS correctly fixed, and the note about fixing it stayed behind, so
it now attributes to a sister document a statement that document no longer makes.

O1 verified by me at both ends: `gate-multiplies.md`:332 says the bottom row "is
what U-FRAME section 4 and section 6a report as 'the multiplier uses only 15 to 45
percent of its budget and the fraction is TRENDING DOWN'", while `U-FRAME.md`:115
now says "our multiplier uses 77 to 214 percent of its budget, and the fraction is
not falling". **The numbers in the two files agree; the quotation is dead.** A reader
following the pointer finds agreement, not the error being described.

O15 is worse and is a genuine artifact bug: `natal-cap-08-staircase.js`:417 asserts
"exact < RS < PNT at all four levels" while line 343 of the same file prints
RS 854,132 > PNT 835,838. `staircase-note.md` §6 already has it right.

**This class is invisible to `refcheck.js` by construction**, since the file exists
and the section number resolves; only the quoted phrase is dead. A dedicated agent is
now sweeping for the rest, and extending the instrument is on the standing-gates list.

### The seven decisions `qc-history.md` escalated

**U1, ATTACKS3's pre-registered "Win:" lines: KEEP ALL FOUR BLOCKS, do not compress.**
The agent leaned toward folding Win into Landed, worth ~25 lines. I am ruling the
other way, on Chris's own test. A pre-registered win condition sitting beside its
landed verdict is what proves the goalposts were not moved after the result came in,
and this corpus's credibility rests heavily on that. It is restatement that *adds a
learning*, so it earns its tokens. Twenty-five lines is a cheap price for
falsifiability.

**U2, the two ranges for rho: routed to the numbers verifier, to be settled by
computation, not by editing.** `U-FRAME.md`:646 says about 1.3 at T_11 and about 1.7
at T_23; `gate-multiplies.md`:359 says 1.0 to 1.9 across the same range and rising.
Same formula, same tiles. The leading hypothesis is that one quotes per-cell extremes
over all m and the other the endpoints of the trend, in which case both are right and
neither says which statistic it is. Not to be merged until computed. This is a
possible numbers defect, correctly triaged out of the migration.

**U3, dates in headings: keep where a reader uses them to date OTHER documents, drop
where they only date the idea.** Attribution to Chris always stays. So `GLOSSARY.md`'s
adoption dates stay, because `research/README.md`:29-31 explicitly relies on them to
tell readers that older files use older vocabulary; the stamps on
`two-moire-argument.md`:1 and `THE-LENS.md`:62 go. About six sites.

**U4, whether `OBSERVATIONS.md` belongs in the reading path: routed to the
architecture agent.** 688 lines, third-largest file, explicitly a sightings notebook,
and the largest block of tokens whose necessity no agent has judged. That is an
architecture question, not a migration one.

**U5, the READINGS blocks of `research/*.js`: LEAVE THEM.** Follows from accepting
correction 3. The .md is the working document a reader loads; the script's reading is
its own dated provenance. Stated as policy so the pair does not read as disagreeing.
The two exceptions are O14 and O15, which are factual errors in headers and get fixed
regardless.

**U6, `paper/` exempt from history-migration: CONFIRMED, in writing.** Roughly 30
lines across five paper files would otherwise come into scope, and
`paper/moire-primes.md`:592-599 would be the first casualty. The agent said it would
argue hard against that one and it is right. **But exempt from migration is not
exempt from audit**: a dedicated agent is now auditing the whole suite for scope,
status and dropped hypotheses, with the honesty passages explicitly protected. The
papers are where a scope error becomes a false published claim, so they get more
scrutiny, not less, just not this kind of edit.

**U7, renumbering: ONE mechanical pass at the very END, after every content edit,
never file-by-file.** Six files lose a whole numbered section and nine inbound
cross-references point at or past those numbers. `refcheck.js` is the gate: it must
return zero broken section references before the campaign closes.

**One further correction accepted, affecting my recommendation 9.** The
`origin-excess.md` §6c reference from `maier-matrix.md`:282 cannot be repaired by
repointing to §6 or §7. The statement it wants lives in §9's second bullet and must
be moved into §6 first, so this fix is sequenced BEHIND the history migration rather
than being the independent one-liner I called it.

### Wave 1, `qc-numbers.md` (644 lines): ACCEPTED with one finding's reasoning amended

**Task 0 settled by computation, and it found a defect the disagreement was hiding.**
The agent sieved T_11 through T_23 from scratch in 1.5 s, reproduced both recorded
maxsum tables digit for digit, and resolved the two ranges: `gate-multiplies.md`:360's
"1.0 to 1.9" is the min/max over every (tile, m ≤ 8) cell, 1.015 at (T_19, m=4) to
1.839 at (T_23, m=6); `U-FRAME.md`:646's "1.3 / 1.7" is the per-level **median** over
m, 1.332 and 1.711 exact to two decimals, and it is the unique natural statistic
fitting both ends. So both files are right and neither says which statistic it quotes.
Not a numbers defect, exactly as triaged.

**But both files also say "rising with level", and that is false.** Medians run
1.332, 1.261, 1.152, 1.272, 1.711, falling for three levels before recovering; means
do the same; even the max statistic dips 1.833 to 1.405 at T_19, and
`gate-multiplies.md` prints that dip itself at line 424, sixty lines after asserting
the rise at line 360. An in-file disagreement. Line 493 of the same file already has
the honest version, "measured on six tiles … Do not extrapolate rho in either
direction", which §8's headline does not inherit. Fix both sites to name the statistic
and drop the trend claim.

**AMENDMENT, mine, to finding Q5.1.** The finding is that "the gap is a factor
**0.58 ln p**, and it is the only gap" appears in eight places beside the range
0.19 to 0.31 p/ln p, and that 0.58 is 0.18/0.31, the optimistic end only. **The
recommendation is accepted**: those sites should read "a factor 0.58 to 0.95 ln p",
because collapsing a range to its favourable end in the corpus's most-quoted gap
figure is exactly the kind of quiet optimism this campaign exists to remove.

**The justification attached to it is struck.** The report argues at line 380 "Since
rho is measured to be *rising* (Task 0), 0.19 is the end the trend points at". Task 0
of the same report establishes the opposite, that the rising claim is unsupported by
any of the three statistics. The report cites its own refuted claim as evidence. It is
weaker still because the rho = 2.4 attributed to T_29 was not computed in this pass,
which stopped at T_23. **Corrected wording for the fix: give the range, name which rho
each end corresponds to, and state that the corpus's own measurement does not support
a monotone trend in rho, so neither end may be presented as the one the trend
favours.** The finding survives; the prop under it does not.

### Decision U1, `G2(41#)`: the cost is about 6 hours, not 37, and TODO must change

The agent flagged that `TODO.md`'s "roughly 37 hours" may be badly wrong. Checked and
confirmed arithmetically here.

`TODO.md` and `U-FRAME.md` §7 price the thirteenth term as 54 minutes × 41, scaling
the **lattice walk by tile width**. But `U-FRAME.md`:818 records a different engine:
"The streaming leg recovers G₂(31#) = 348 from T₂₉ in 10 s and G₂(37#) = 528 from
T₃₁'s 6,226,553,025 slots in **519 s**, both matching the published sequence." The
streaming leg scales in **slots**, not positions.

Independent check of the slot ladder, computed here: D_x = ∏_{3≤p≤x}(p−2) gives
T_31 = 6,226,553,025, matching U-FRAME's figure exactly, and T_37 = 217,929,355,875,
a factor of **exactly 35**. So 519 s × 35 = **5.05 h**, and carrying the deletion-state
factor 41/37 gives **5.59 h**, against the quoted 36.9 h.

**The code question the agent left open is largely answered by the measurement
itself.** Producing G₂(37#) required folding T₃₁ by 37, so the work for 37 deletion
states is already inside the measured 519 s. An implementation that needed a separate
pass per state could not have produced that number in that time. The residual risk is
memory rather than time, since T_37 holds 2.2e11 slots; the standing compute note in
TODO records the segmented engine walking a full period in O(1) memory, so the
streaming leg is the right instrument to price against.

**Consequence for the record:** `TODO.md`'s Parked entry and `G2-STATE.md` §9 both
price this at ~40× the 37# run, and both should be repriced to about 6 hours by the
streaming leg, with the 37-hour figure identified as the lattice-walk cost. A term
that reads as a 37-hour commitment is parked; a 6-hour one is a same-day falsifiable
test of the Poisson law, which predicts 476 to 633 with centre 513 and discriminates
whether x = 37's c₂′ = 0.594 is an outlier or a level shift. **This changes TODO's
ordering and is the campaign's first finding that creates work worth doing rather
than removing work.**

Four briefing corrections accepted, one of them mine to own: **the "99.94% lineage
figure" I seeded does not exist.** I conflated the exact zero-orphans lineage claim
with the Variance Theorem's 99.87%; both are clean. Also gate-multiplies' rho line is
:360-361 not :359-360, T_23 sieves in seconds not minutes, and my "endpoints of the
trend" hypothesis was the near-miss that exposed the real defect, because there is no
trend.

### Wave 1, `qc-papers2.md` (1,077 lines, 23 publication-risk findings): ACCEPTED

**P-1 is the campaign's most serious finding and the only one that is a false claim
rather than an internal inconsistency. Verified here at both ends.**

`research/attack-04-fourier-budget.js` line 4 carries its own banner: "⚠ CORRECTION
(2026-08-14, natal-cap-02): … the 'certified' bound column paired moduli with WRONG
kernel values (pointwise |F| off by up to N/2 at x=11) and was **NOT a valid
certificate**." `paper/moire-primes.md`:432-437, Door 2 of the flagship, cites
`research/attack-04` for both of its load-bearing claims: that the certified
window-discrepancy budget "grows like 2ⁿ", and that it misses "certification of the
p = 11 zone by only 18%". Both are outputs of the invalidated column; the 2ⁿ reading
is literally the script's own reading 3 off the `certified/mu` row.

The corrected artifact `natal-cap-02-fourier-budget.js` **reverses** the conclusion: at
x = 11 even an oracle fails (cap 117.3 against N = 90) and the per-prime union bound is
structurally dead from there on. The real near-miss is 15% at x = 7 and it is moot.

**The corpus already knew.** `NATAL-CAP-CAMPAIGN.md` carries this as a standing note on
the artifacts, and has since 14 August. The paper never inherited it. This is the
sharpest possible illustration of why the campaign exists: the fix landed in the
research layer and the summary layer above it kept asserting the old thing for three
days. **It is also the strongest argument yet for the publication moratorium, which is
the only reason this is a draft defect and not a retraction.**

**P-11, Door 5, accepted and it is a genuine mathematical gap.** Hough and BBMST
require *distinct* moduli; our residue classes {0, −2 mod q} use each modulus twice, so
the cited theorems do not apply to our object. `covering-dive.md` §3.3 already holds the
theorem that does, Klein-Koukoulopoulos-Lemieux 2024 on multiplicity s, marks our
translation [INFERRED], and records that there is no numeric constant at s = 2. KKL
appears nowhere in the suite. Correctness requires citing it; **how much Door 5 then
claims is Chris's call and wants an expert read**, because the honest version is weaker
than the current one.

**P-3, accepted:** Face 4 says the vector sieve is "missing exactly one ingredient,
which we name Lemma V". This is `qc-status` A-1 reproduced in a paper with the word
"exactly" added, and "maximal law" appears in no paper file at all. **S-3, accepted:**
§8 calls the anchored calm "an unexplained structural bias in the helpful direction"
while §7A Face 2, forty lines earlier, says its mechanism is proven and irrelevant to
survival. The paper argues with itself about its headline measurement.

Six dropped hypotheses in the suite, all six invisible to every check that was not a
word-diff. That makes three independent passes finding the same signature, so it is now
the campaign's confirmed dominant defect class and belongs in the standing gates.

**The @29 custody question is settled, and settles a second error.** The re-run I
launched reproduces G30_agg = 0.1176 at @29. So `paper/anchored-note.md`:392-397's
five-level count is stale and can be fixed on verified data. And the six-level ladder is
0.2132, 0.1113, 0.1011, 0.1259, 0.0945, 0.1176 at @11 through @29, whose minimum is
**0.0945 at @23**, so the sentence "the deepest level also the lowest" that the note
prints is false once @29 is included. Both fixes now rest on a reproduced number.

**Cross-agent correction, and this is the parallel design paying off:** `qc-papers2`
found four errors in `qc-status` and in my brief, including that qc-status's claim that
none of PRIOR-ART's four "should be cited" references appears in any paper is wrong on
three of four (only Clement 1949 is genuinely absent), and that the "matching" count is
3 not 2. Agents auditing each other caught what neither caught alone.

### Wave 1, `qc-arch.md` (1,069 lines): ACCEPTED, and it overrules me on U-FRAME

**The biggest architectural defect is not U-FRAME, and the agent is right.** Seven
documents totalling 2,279 lines all summarise the same programme (README §Status,
research/README, GLOSSARY, THE-LENS, ZONE-POSTULATE, THE-DIALS, G2-STATE), two of them
claiming in their own headers to be the hub. The entry path contradicts itself: README
says read GLOSSARY first, GLOSSARY says read THE-LENS first, TODO says read
ZONE-POSTULATE and G2-STATE, and README's path never reaches G2-STATE at all.

**Verified here, and the result is worse than the report's phrasing suggests.** A grep
of `research/README.md` for U-FRAME, G2-STATE, ZONE-POSTULATE, FOLD-PROFILE, THE-DIALS,
THE-LENS, natal-cap, anchored-note, 4.2665 and even the bare string "4.26" returns
**zero hits on all ten**. It is an accurate 2026-08-13 summary wearing the filename a
fresh agent opens first, and it names not one current object of the programme.

**I am accepting the agent's U-FRAME plan over my own, on its evidence.** It counted
**128 inbound section pointers across 29 artifacts**, §5a alone carrying 47 and §5
carrying 21, and fifteen of the artifacts are scripts whose pointers sit inside pasted
output that must not be edited. So §§1-9 keep their numbers; renumbering §5a would cost
68 repairs to buy a heading. Two further corrections to my plan that I accept: §§1-9 are
*already* claim-shaped, so the disease is confined to §§10-15, which absorb into the
existing skeleton plus three new claim-named sections; and **nothing goes to `history/`**,
because the attack chronology already has a home in `ATTACKS3.md`, whose ten Landed
verdicts point straight at the sections I proposed to move. My plan would have broken
those pointers.

The real prize it found is redundancy nobody had measured: the Alternation Lemma stated
twice, the qualifying-gap closed form three times, the L(T₂₃, 29) custody note three
times **each claiming a different ordinal**, and §12 about 60% a restatement of §5a's own
EXTENDED block. I confirmed two of the custody sites in markdown (`U-FRAME.md`:816 "the
fourth of five independent confirmations" and :924); the third is presumably in a script,
and the differing ordinals are a genuine disagreement, not mere repetition.

**OBSERVATIONS.md: verdict accepted, leave it exactly as it is.** Evidence-based and it
overturns my worry: the file is cited zero times from README, research/README and TODO,
so it is already outside the reading path and costs a fresh agent nothing, and nine of
its ten entries are live with entry 5 load-bearing for web/bench. One edit only, shrinking
its 33-line triage statement to two operational sentences plus a pointer, because
`THE-LENS.md` §5 owns that rule and says so.

**Correction accepted, better than my call:** the Natal Dispersion Lemma goes to
`FOLD-PROFILE.md` **§8**, not §9. §9 is Survival, a window question backed by script 05;
the lemma is a cohort question backed by script 09. FOLD-PROFILE's numbering runs
0-7, 9, 11, 12, 10, so there is no §8, zero references point at it, and the empty slot is
free, correctly ordered, and gives three orphan scripts their first prose home. The agent
also withdrew its own file count (62 against my 63, its glob dropped one) and left the
withdrawal visible, which is the right practice.

### Wave 1, `qc-refs.md` (1,227 lines): ACCEPTED, and it reverses an earlier audit

**W1 is the campaign's most important single correction, and it corrects the
correctors.** My brief told this agent, on the authority of
`research/history/staging/audit-campaign.md`, that the FKMPT constant is **4** and
that the 6 came from a stale arXiv version. **That is backwards.** The agent pulled
all four PDFs and found the theorem changed in the other direction:

- v2 and v3 print `(4+δ)·10^{2δ}` and `C(ρ) > e^{−1−4/ρ}`
- **v4 (19 Sep 2022) and the published corrigendum print `6` and `e^{−1−6/ρ}`**

Verified independently here against the arXiv record: v4 is dated 19 Sep 2022, after
the JEMS 23 (2021) publication, and there is a **corrigendum at J. European Math.
Soc. 25 (2023), no. 6, 2483-2485 which appears nowhere in this repository.** The
direction is also the one that makes sense: 4 → 6 *weakens* the bound, since
e^{−1−6/ρ} < e^{−1−4/ρ}, which is the ordinary shape of a corrected error.

**Consequence, and it is quantitative.** `covering-dive.md`:59 carries the v3 values.
`two-class-lower-bounds.md`:127's `C(1/2) > 1/6001` is the v3 number; the agent solved
the sup both ways and v4 gives **1/325565**, so the figure standing in the corpus is
**54× too generous**. The qualitative claim survives, which is the only reason this is
not worse.

**DECISION (a): v4 plus the corrigendum is authoritative. The constant is 6.** Both
files move together, in one commit, and the corrigendum gets cited. The earlier
audit's 6 → 4 edit is reverted with the reasoning recorded, so nobody "re-fixes" it a
third time.

**The lesson is about the campaign's own method, so it goes on the record.** An audit
wave corrected a value toward a retracted one and wrote its confidence into a staging
file, and every later pass inherited it, including mine. Version drift in a cited
source is not caught by internal consistency: `covering-dive.md` and its own
bibliography agreed with each other perfectly. Only fetching the source caught it.
Chris's licence to "re-research where we state something but have a sudden degree of
questioning about the reference quality" is what found this, and it should be spent
more often, not less.

**W7 closes a planned work item by inspection, saving the afternoon it was priced at.**
"Kanold, Stevens and Paseman each prove one-class exponent-(2+ε) bounds with stated
constants" is **false for all three**, in six places, and it is the entire premise of
`TODO.md` item 000b. From Paseman's own paper: Kanold gives `2^{√k}`, Stevens
`2k^{2+2e·log k}`, Paseman `2^{O(log k·loglog k)}`. The k^{2+ε} result is **Vaughan
1977**. So 000b is not an afternoon's reading, it is a citation fix, and route A's
second difficulty floor does not collapse the way the item hoped.

**W5, a misquotation with two independent errors in one formula.** Fan-Pomerance
reads `Φ(x,y) < .6x/log y when y ≤ √x`; `PRIOR-ART.md`:383 and
`paper/staircase-note.md`:444 say `6x/log y for y ≤ x`. A dropped decimal point and a
dropped square root, in a bound the staircase note leans on.

**Two findings about the audit apparatus itself, both accepted.**
`dhr-verification.md` is a spent audit whose seven recommendations were all applied to
`beta2-note.md`, so it now quotes six dead claims (D1-D6) while
`audit-campaign.md`:11 lists it as "Clean, no change needed". And `maxgap-law.md`
carries a block headed to the effect that it was checked against the source so nobody
need re-check it, of whose three legs **two are wrong**: it is eq. 1.3 not 1.2, and
FGKMT's (1.2) is `/log₂x` not `/(log₂x)²`, the squared form being Rankin's, which
they beat. Its conclusion survives and the other fourteen sites in the repo have it
right. A "do not re-check this" note that is itself wrong is the highest-leverage kind
of error in a corpus meant to be trusted.

Also accepted: the FGKMT→FKMPT fix **did not fully land**, three residual sites, two
of them in `paper/`; **arXiv:1402.1970 is Holt AND Rudd** and the corpus drops Rudd in
all four places including the bibliography; and W3, an off-by-one in the OEIS
submission draft where `A059861(n−1)` should be `A059861(n)`, proved two ways
including that the file's own c = 0.4814 at CV 9.5% only reproduces with `(n)`.

**DECISION (b) and (c), taken here.** Paper II's title: `beta2-note.md`'s own title
governs, and `PAPERS.md` is brought into line, since the note is the artifact and the
suite document is the index. Iwaniec's Lemma 1 "contested": **drop the word.** One
unanswered 2016 MathOverflow post is not a controversy, and describing a 1978 result
that way in our own suite document is the kind of unsupported characterisation this
campaign exists to remove. Replace with a plain note that an explicit-constant or
formalised exposition would be useful, which is what the survey actually supports.

**Sequencing constraint accepted:** W6 is corrected *before* the history migration
relocates that paragraph into §7.

### Cross-report consistency: no conflicts to resolve yet

`qc-status.md` and `qc-shepherd.md` overlap on `G2-STATE.md` and `U-FRAME.md` and
do not contradict each other. They found different defect classes in the same
files: the status report found scope inflation in summary lists, the shepherd pass
found two dropped qualifiers in transferred passages plus the U-FRAME chronology
problem. Both sets can be applied by one wave-2 agent per file without conflict.

One useful convergence: `qc-status.md` class (e), dead-route-still-live, came back
**empty** after an item-by-item check of TODO.md against the research bodies, and
the shepherd pass independently found TODO.md's forward-only charter being kept.
Two passes agreeing that TODO.md is honest is worth more than either alone.

## Applied

*(To be written as wave-2 partitions land.)*

---

Operational notes on record: no agent commits, and nothing is pushed. The
publication moratorium and the three-layer no-push rule hold throughout the
campaign, as they did through the night runs.
