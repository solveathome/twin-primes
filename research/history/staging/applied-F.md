# Applied, wave 2 partition F: the natal-cap family and the compound-claim decompositions

<!-- ledger
id: Q-applied-wave2-F
status: ANSWERED
todo: none
question: Which wave-2 partition F corrections were applied to the natal-cap family and its compound claims?
verdict: Applied across nine natal-cap files with two new homes created (anchored-calm.md and certificate-engine.md); the Fused-Window Calm Lemma was decomposed and its name retired, the X-limitation theorem's scope is confirmed a scope error, and the refutation is recorded as bigger than it had been reported.
-->

Owned and edited: `research/natal-cap-*.md`, `research/NATAL-CAP-CAMPAIGN.md`,
and two new files. Nothing outside that set was touched. No commit, no add, no
push.

**Files created:** `research/anchored-calm.md` (status-only parent),
`research/certificate-engine.md` (the prose home natal-cap-28 never had).
**Files edited:** `natal-cap-12-overlap-sign.md`, `-19-calm-lemma.md`,
`-21-beyond-chebyshev.md`, `-23-covadj-proof.md`, `-26-minus-half.md`,
`-30-skeleton-bound.md`, `-31-calm-vs-kill.md`, `-36-skeleton-door.md`,
`NATAL-CAP-CAMPAIGN.md`.
**Changelog entries:** `research/history/staging/changelog-add-F.md`, including
the four deleted status tables in full.

## qc.js, before and after

| check | at my first run | at my last read of the baseline | after my edits |
|---|---|---|---|
| refs | 7 | 5 | 4 |
| quotes | 1 | 1 | 1 |
| crosslinks | 0 | 0 | 0 |
| scripts | 2 | 2 | 2 |
| transfers | 12 | 12 | 13 |
| **total** | **22** | **20** | **20** |

**Zero findings in any check are in a file I own, at any point.** A `grep` of the
full run's output for `natal-cap`, `NATAL-CAP`, `anchored-calm` and
`certificate-engine` returns 0 lines. The baseline moved under me because six
other appliers are editing concurrently: refs fell from 7 to 5 before I made an
edit and to 4 after, and the thirteenth `transfers` finding is `TODO.md`:98
against `U-FRAME.md`:260, neither of which is mine. My two new files are
reachable, with `crosslinks` staying at 0 while the working-document count rose
64 → 66.

---

## JOB 1. The Fused-Window Calm Lemma: decomposed, name retired

**Parent's fate: RETIRED entirely as a claim name.** Not kept as a defined
conjunction, because a defined conjunction whose status is its weakest leg would
still be a citable object called a *Lemma*, and the word Lemma is what invited
"Proven". "The anchored calm" survives as the name of a **phenomenon**, barred
from any list headed Proven, Theorems or the proven spine.

**Test applied.** After the split, the only way to write "Proven: …" about this
material is to name one of the five proven objects, each of which is proven at
all x and all q. No name remains that spans a proven leg and an unproven one.
Two of the nine names carry their calibration inside the name.

### `research/anchored-calm.md`'s table, as written

| sub-claim | status | scope | home |
|---|---|---|---|
| Mirror-Sibling Identity | PROVEN | all x, all scour q | `natal-cap-19-calm-lemma.md` §Lemma 1 |
| Fusion Identity | PROVEN | all x, all scour q | `natal-cap-19-calm-lemma.md` §Lemma 2 |
| Mirror-Phase Doubling Lemma | PROVEN | all x, all scour q | `natal-cap-19-calm-lemma.md` §Lemma 3 |
| Minus-Half Theorem | PROVEN, exact, no error term | every level, every q coprime to 30 | `natal-cap-26-minus-half.md` §Theorem 2, Props 3–4 |
| Skeleton Collapse Theorem | PROVEN | all x, all q | `natal-cap-30-skeleton-bound.md` §Theorem A |
| Aggregate 30-Skeleton Bound (@11..@29) | CERTIFIED, exact integer inequality | six computed levels only | `natal-cap-30-skeleton-bound.md` §Theorem B, `natal-cap-36-skeleton-door.md` §P6 |
| Skeleton Equidistribution Conjecture | OPEN, door named, measured open, and the door reaches about a tenth of the mass | all x | `natal-cap-36-skeleton-door.md` §Proposition C |
| Uniform-in-q Anticorrelation | **REFUTED** | six counterexample primes known, of 10,201 scour primes over six levels | `natal-cap-23-covadj-proof.md` §"Uniform-in-q Anticorrelation is refuted" |
| Anchored Typicality Measurement | MEASURED, no proof mechanism in sight | @13, @17, @19 | `natal-cap-19-calm-lemma.md` §"What Lemmas 1–3 do and do not give" |

The file is 96 lines: the table, a paragraph on what the phenomenon is, a
paragraph on what is not proven, and a child index. It holds no mathematics.

### The four deleted status tables

All four are reproduced verbatim in `changelog-add-F.md`. In brief:

| table | what it graded | fate |
|---|---|---|
| `natal-cap-19-calm-lemma.md`:90-111 | (i)(ii) PROVEN, (iii)(iv) MEASURED | section retitled "What Lemmas 1–3 do and do not give"; keeps the exposition, carries no verdict |
| `natal-cap-23-covadj-proof.md`:164-187 | (iii) split iii-a/iii-b/iii-c; the refutation as a clause | deleted; replaced by §"Where this sits"; the refutation promoted to a named box |
| `natal-cap-26-minus-half.md`:154-176 | iii-c reduced to G30_agg < 1/2 | deleted; the reduction survives in §"Where this sits" |
| `natal-cap-30-skeleton-bound.md`:110-123 | the "current authority" table, five levels | deleted; replaced by §"What this file owns, and what it does not" |

### The refutation is now visible, and it is bigger than reported

The uniform-in-q form of the anticorrelation is **REFUTED**, and that fact
reached no summary in the corpus. It is now a boxed statement at
`natal-cap-23-covadj-proof.md` with all counterexamples named, a row in the
parent table, and a line in `natal-cap-19`'s §"What is not proven, precisely" —
which previously proposed proving the refuted statement as "a plausible general
proof target".

**Correction to `qc-compound.md`: there are SIX known counterexample primes, not
five.** Its CC-1 #8 says "4 exceptions in 599 primes @11–@19, one more (q = 2339)
at @23". The `--at29` pass adds q = 173 at @29 (skeleton 0.511, the only Cov_adj
> 0 prime among 7,863), which its own script output records. The full list, all
skeleton resonances: q = 13 @11 (0.625), 107 @17 (0.544), 2083 @19 (0.606),
2221 @19 (0.521), 2339 @23 (0.575), 173 @29 (0.511) — six in 10,201 scour primes
across six levels.

### The @29 level, applied everywhere in the partition

`natal-cap-30`'s certified table gains its sixth row (K = 7,863,
G30_agg = +0.1176, margin 0.3824, dev_agg = +0.1180, R_agg = −0.382, resonance
q = 173). R_agg is arithmetically forced by dev_agg − 1/2 and is the only derived
entry; max|no30| is left empty with the reason stated, because the `--at29` pass
computes the certificate and not the per-prime no-30 ledger. This answers
`qc-numbers.md` U4: the row is complete except for one column, and the column is
marked absent rather than invented.

## JOB 5. The X-limitation Theorem's scope: it IS a scope error

**Verdict: the theorem is proven at @11, @13 and @17, and nowhere else. "Proven
from x = 13 upward" is a conjecture.**

Evidence, from `research/natal-cap-31-calm-vs-kill.js`:

- Line 184 is the whole level loop: `for(const x of [11,13,17]) runLevel(x);`.
  Three levels, full enumeration of 2,310 / 30,030 / 510,510 rotations. No
  fourth level is computed anywhere in the file.
- Reading 3 states the scope itself: "ANNIHILATION IS X-LIMITED, NOT D-LIMITED
  (proven, **per level**, from L2 + **enumerated** max VR)".
- The proof is L2 (Cauchy–Schwarz, proven for all x) applied with VRmax. VRmax
  enters only as an enumerated maximum. A grep of the file for any bound on max
  VR returns nothing, and no such bound exists elsewhere in the corpus.
- The extension therefore needs two things, both measured over the same three
  points: max VR bounded above (2.78 / 2.35 / 2.14, falling) and the driver
  S̄/√(K·V̄) growing (3.1 / 4.9 / 9.8).

**Independently corroborated.** Partition C reached the same reading while I was
working and `paper/moire-primes.md`:669-679 already reads "proven at x = 13 and
x = 17, the levels where the ensemble maximum of VR is enumerated … its extension
to every larger x rests on two measured trends rather than on a theorem". Two
readers, separately, same verdict.

**Applied in my file:** Theorem 2 is retitled "the X-Limitation Theorem, at @11,
@13 and @17", a §"Scope, exactly" paragraph states the per-level proof and names
the enumeration, and the extension is boxed as the **Loudness Ceiling Conjecture
[OPEN]**: for every x ≥ 13, max_t VR(t) < S̄²/(K·V̄). The name states the claim
and carries its calibration.

**Consequence for `qc-status.md` B-3: its HIGH confidence is downgraded.** Its
stated ground was "three sources agree on x ≥ 13" — and all three descend from
this one home, so the agreement was never evidence about the proof. `qc-compound`
CC-11 flagged exactly this and was right at MEDIUM-HIGH; it is now settled.

## JOB 2. The other eleven decompositions

**Partition constraint, stated plainly:** of the twelve compound claims, two have
their homes in files I own (CC-1, CC-3) and one has a leaf in my files (CC-11's
X-limitation and level stamps). The other nine live in `paper/*`, `G2-STATE.md`,
`GLOSSARY.md`, `maier-matrix.md`, `origin-excess.md`, `ATTACKS2.md`,
`variance-note.md` and `sift-limit-attack.md`, all owned by partitions A, C, D
and E. I implemented what is mine and routed the rest; `qc-compound.md`'s own
site tables are already written for those and need no re-derivation.

### CC-3, the fully analytic certificate law: retired, and given a home

**Parent's fate: "the certificate law" and "the fully analytic certificate law"
RETIRED as claim names, and "closed" retired as a word for this object.** "The
certificate engine" survives as an informal umbrella for the *machinery*, with
the standing rule written into the file: **the engine's outputs carry the status
of their weakest input**, which is HEURISTIC.

`research/certificate-engine.md` holds the status table below plus four sections
of prose. The two open ingredients are boxed as named conjectures; the refutation
is stated first, before what replaced it; every deep-level number is marked
PREDICTED.

| sub-claim | status | scope |
|---|---|---|
| Certified-Head Theorem | PROVEN, explicit error term | the head only: 1 / 3 / 6 certified primes at @17 / @19 / @23 carrying 9.69% / 17.40% / 22.93% of Σcap₂ |
| Window Dilation Lemma | PROVEN | every combo class (cap-12 L1) |
| Comb Discrepancy Lemma | PROVEN | every Legendre term, off by at most 2·3^k (cap-25) |
| Tail Comb Equidistribution Conjecture | **OPEN**, and Brun–Titchmarsh is vacuous there | tail regime q³ > W+1 |
| Tail Envelope Measurement | MEASURED | aggregate \|err\| 0.0–1.1% of tail mass, @13..@23 |
| Buchstab Transfer Hypothesis | **HEURISTIC** (ω is a theorem; the transfer is not) | provable at y = T^{o(1)}; open at y = T^{1/u}, u bounded |
| Pair-Correlation Hypothesis for the deep-K deviation | **REFUTED** | all orders contribute, every level |
| Priced-Deviation Measurement | MEASURED | max err 3.41 → 0.21% @23, 4.11 → 0.99% @19, 3.39 → 0.62% @17 |
| Analytic-Swap Calibration | MEASURED envelope | b = 2.15 / 1.16 / 0.64% at @17/@19/@23; b·ln³W flat at 47 ± 2 |
| Deep-Level K\* Predictions | PREDICTED, conditional on the two unproven ingredients | @29..@97, W to ~2.3·10³⁶ |

**Two corrections to `qc-compound.md` CC-3, both in the direction of precision:**

1. **A tenth sub-claim was missing, and it is the one the retired name was about.**
   The word "fully analytic" refers to swapping exact cap₂ for its closed form,
   and that swap costs a measured systematic overshoot with its own calibration
   (b·ln³W ≈ 47 ± 2). Without a row for it the table would say the engine is
   free of the thing that made it "fully analytic". Named **Analytic-Swap
   Calibration**, MEASURED.
2. **The Certified-Head Theorem's share is 22.93% at @23, not "20–30%".** The
   band is loose where the artifact is exact: 9.69% at @17 (1 prime), 17.40% at
   @19 (3 primes), 22.93% at @23 (6 primes), max relative error 0.01 / 0.34 /
   0.40%. The share grows with x, which is the point worth carrying.

**And one item that makes the corpus stronger, not weaker (JOB 3).** One of the
deep-level predictions has since been **tested and passed**: the @29 march
(`natal-cap-18-at29.js`) measures K\*(29) = 69 against the engine's predicted 69,
and certifies a floor of 31,327 twin pairs. The file records this as the engine's
first true falsification test, survived, while stating that it does not upgrade
the predictions' calibration, since one confirmed point does not touch the two
unproven ingredients.

### CC-11, the finite-level convention: applied inside my files

- Theorem 2 of `natal-cap-21` renamed **"the Beyond-Chebyshev Ensemble Bound,
  @11 — the first, and so far the only one"**. **This settles `qc-compound.md`
  Unresolved item 2: the @13 bound does not exist.** Its lines 31 and 141 were
  never in conflict; they name different objects, and :141 now says so in the
  file, so the reconciliation is in the corpus and not only in a staging report.
- `natal-cap-31` Theorem 1 already carried its @11 stamp; Theorem 2 gains its
  three levels.
- `natal-cap-30`'s Theorem B is stamped "six levels @11 through @29" in the
  heading, the corollary and the title.
- `NATAL-CAP-CAMPAIGN.md`'s attack-8 row is stamped: floors 34/110/82/1877 at
  @11..@19, extended to 4841 @23 and 31,327 @29, six certified levels in all;
  K\* = 0,0,2,10 at @11..@19, with 27 @23 and 69 @29 both measured.

### CC-2's one leaf in my files

`natal-cap-31`:119's "Assumption A relocated, not removed" is named the
**X-Channel Restatement of Assumption A** and marked a restatement with measured
support rather than a reduction. The rest of CC-2 is `paper/anchored-note.md` and
`GLOSSARY.md`.

## JOB 4. History migration and stale numbers

- **`natal-cap-23-covadj-proof.md`:164's heading**, "Consequence: **corrected**
  status of …". Gone with the section; replaced by §"Where this sits", which
  states current understanding in present tense.
- **`natal-cap-23`:123's "The brief's candidate mechanism"** reworded to "The
  candidate mechanism, that most lags sweep the generic (p−4)/p classes"
  (`qc-history.md`:446). Numbers and verdict unchanged.
- **The decay-shortcut disagreement: the NOTE was stale, `TODO.md` was right.**
  I checked the script before choosing. `natal-cap-36-skeleton-door.js` lines
  331-340 carry the six-point fits in its own recorded output — R² 0.439 /
  0.261 / 0.331, exponent −0.483 against ln ln W, increments including +0.0231,
  mean 0.1101, spread 0.0313 — and `TODO.md`:175-177 reports them correctly. The
  note's five-point statistics (0.601 / 0.511 / 0.527, exponent −0.700, mean
  0.1082, spread 0.0314) are superseded and are now replaced. **This resolves
  `qc-numbers.md` U2 without a refit: the six-point exponent already exists in
  the artifact, so the exponent line is kept with its correct value rather than
  dropped.** `TODO.md` needs no numeric change, only the wording handed off below.
  The refutation comes out **stronger**: adding @29 makes every fit worse and the
  sequence non-monotone twice.
- **The two stale G30_agg sites in my files**: `natal-cap-30`'s certified table
  (six rows now) and `natal-cap-36`'s decay paragraph. `GLOSSARY.md`:239 was
  handed off in the brief but **partition D has already fixed it** — it now reads
  "CERTIFIED at six levels, @11 through @29". Verified, no handoff needed.
- **`NATAL-CAP-CAMPAIGN.md`'s attack-04 note**: kept, and moved to a blockquote
  at the head of the file with the two invalid readings named explicitly (the 2ⁿ
  growth rate and the 18% near-miss) and the corrected artifact's reversed
  conclusion stated. A reader cannot open the file without meeting it. I removed
  a sentence I had first drafted about how long the note took to reach the paper:
  that is process record and belongs in the changelog, not the body.
- **`qc-numbers.md` Q3.2 applied**: `NATAL-CAP-CAMPAIGN.md`:31's
  "e^{2γ}/4 = 0.7932" corrected to 0.79305.

## JOB 3. Checking myself for the opposite error

Three places where the decomposition could have made the corpus sound weaker
than the evidence supports, and what I did:

1. **The Aggregate 30-Skeleton Bound.** Splitting it out of a conjunction that
   `README.md` called Proven could read as a demotion. It is not: it is an exact
   integer inequality certified at six levels with margins 0.287 to 0.406, and
   the corpus was **understating** it by a level. The name now carries "@11..@29"
   so it can be dropped into a Proven list without lying, which is stronger than
   a bare name a careful reader has to qualify.
2. **`natal-cap-19`'s suppression bullet.** It graded the fusion suppression
   MEASURED at @13/@17, which was true when written and understates the state
   now. The bullet keeps its two measured ratios and adds that the
   anticorrelation behind them is a theorem plus a six-level certificate.
   `sift-limit-attack.md`:157 has the same understatement and is handed off.
3. **The certificate engine's predictions.** Marking them PREDICTED is a
   demotion of the word "closed", not of the work, so the file records the @29
   falsification test the predictions passed.

I did not weaken any proven leg. Every PROVEN row in both new tables is stated at
the exact scope its home proves, and three of them ("all x, all q") are stronger
than the conjunction they sat inside, which inherited the weakest leg's scope in
any careful reading.

---

## Handoffs to other partitions

Each row is file, line, current text, exact replacement. Rows marked **VERIFIED
DONE** were already applied by another partition while I worked; they are listed
so nobody re-applies them.

### To partition D (`README.md`, `GLOSSARY.md`, `TODO.md`)

| # | site | current | replacement |
|---|---|---|---|
| D-1 | `README.md`:95-107 | the "eight proven results" paragraph naming the anchored calm as not among them, with the four-calibration decomposition and a pointer to `research/anchored-calm.md` | **VERIFIED DONE.** The pointer now resolves: the file exists. No change. |
| D-2 | `README.md`:97-99 | "the X-limitation Theorem (proven per level at @11, @13 and @17; the all-x form is open for want of a level-uniform bound on max VR)" | **VERIFIED DONE**, and it matches my JOB-5 verdict exactly. Optional: name the open object, "…is the **Loudness Ceiling Conjecture**, OPEN", so all four sites use one name. |
| D-3 | `README.md`:100 | "the Legendre-comb head certificate" | "the Certified-Head Theorem (the head only: 22.9% of Σcap₂ at @23, and the share grows with x)" — the object's own name, with the scope that is missing. `research/certificate-engine.md` §1. |
| D-4 | `GLOSSARY.md`:226-241 (Fused window; The anchored calm) | already names the Fusion Identity and the Mirror-Phase Doubling Lemma, retires the parent, and links `anchored-calm.md` | **VERIFIED DONE.** Both link targets now exist. |
| D-5 | `GLOSSARY.md`:253-261 (The skeleton) | "CERTIFIED at six levels, @11 through @29" | **VERIFIED DONE.** The brief listed this as stale at @23; it is already correct. |
| D-6 | `GLOSSARY.md`:271-276 | "**X-limitation Theorem** (PROVEN PER LEVEL, at the enumerated levels @11, @13 and @17) … The all-x form is OPEN, because no level-uniform bound on max VR exists" | **VERIFIED DONE**, same verdict, reached independently. Optional: name the open object the **Loudness Ceiling Conjecture** (max_t VR(t) < S̄²/(K·V̄) for every x ≥ 13), which is what `natal-cap-31` now calls it. |
| D-7 | `GLOSSARY.md`, new entry | absent | Add **the certificate engine** — "the machinery of `natal-cap-28`: the Certified-Head Theorem (PROVEN, head only), the Window Dilation and Comb Discrepancy Lemmas (PROVEN), a Li-integral evaluator, and two unproven ingredients. It is an umbrella, not a claim, and its outputs carry the status of their weakest input, the Buchstab Transfer Hypothesis (HEURISTIC). Status table: `research/certificate-engine.md`." Four objects that gate two TODO items are currently absent from the glossary. |
| D-8 | `TODO.md`:187-189 (item 4 title) | "Open the named door: the Skeleton Equidistribution Conjecture — equidistribution of ⌈W/q⌉ mod 30 over scour primes, which is the all-x form of the Aggregate 30-Skeleton Bound." | **VERIFIED DONE**, and it uses the same coined name `natal-cap-36` now boxes. |
| D-9 | `TODO.md`:255-259 | "the X-LIMITATION THEOREM … PROVEN PER LEVEL at the enumerated levels @11, @13 and @17 … The all-x form is OPEN" | **VERIFIED DONE.** Optional: adopt the Loudness Ceiling Conjecture as the name of the open half. |
| D-10 | `TODO.md`:284 (item 8 title) | "Prove the Buchstab transfer (**the certificate law's one heuristic**)" | "Prove the Buchstab transfer (**one of the certificate engine's two unproven ingredients**; the other is the Tail Comb Equidistribution Conjecture, item 11c)". Still live; the "one heuristic" is wrong on the count as well as the name. |
| D-11 | `TODO.md`:285 | "natal-cap-28 **closed** the analytic certificate" | "natal-cap-28 **assembled** the certificate engine (`research/certificate-engine.md`): the Certified-Head Theorem is proven with an explicit error term, and the engine's deep-level outputs rest on two unproven ingredients and two measured envelopes". Still live. |
| D-12 | `TODO.md` item 8's (a)/(b)/(c) | already list both ingredients correctly | no change. This is the one site that was right, and it is worth keeping as the model. |

### To partition C (`paper/*`)

| # | site | current | replacement |
|---|---|---|---|
| C-1 | `paper/anchored-note.md` §10 opening | the "anchored-calm lemma" heading | **VERIFIED DONE.** |
| C-2 | `paper/anchored-note.md`:401-411 | "@11 through @29 … 0.1176 … the deepest level is not the lowest: the minimum is 0.0945 at @23" | **VERIFIED DONE.** Two residual wordings: "So the **leg** is a theorem for x ≤ 29" — "leg" names a retired parent, so read "the aggregate anticorrelation is a theorem for x ≤ 29"; and "The @29 value was reproduced during the 2026-08-17 consistency campaign" is a dated process note in a paper body, which `paper/` is exempt from migrating but which reads better as "reproduced from `natal-cap-36-skeleton-door.js --at29`". |
| C-3 | `paper/anchored-note.md`:395-400 | "Only the aggregate form is claimed: the uniform-in-q form is **refuted** … six counterexamples known once the deeper levels are counted" | **VERIFIED DONE**, and it matches my count of six exactly. |
| C-4 | `paper/anchored-note.md`:435-443 | "proven at @13 and at @17, the two levels where the ensemble maximum of VR is enumerated … extension … rests on two measured trends" | **VERIFIED DONE.** One tightening: the enumeration covers @11 too, so the exact scope is @11, @13 and @17, with @11 additionally closed outright. |
| C-5 | `paper/moire-primes.md`:910-911 | "the real tile is consistently *quieter* than its ensemble on **four independent statistics** ("the anchored calm", `research/NATAL-CAP-CAMPAIGN.md`)" | "the real tile is quieter than its ensemble on the strike-variance statistics ("the anchored calm", `research/anchored-calm.md`). Three of the four original sightings dissolved under exact control." Two defects in one clause: the count is stale, and the pointer goes to a campaign scoreboard rather than to the status table. |
| C-6 | `paper/anchored-note.md`:180-184 | "since part-proven: the fusion identity and the exact −1/2 anticorrelation constant are theorems" | correct as written. No change; recorded as a checked non-defect. |
| C-7 | `paper/moire-primes.md`:669-679 | "proven at x = 13 and x = 17, the levels where the ensemble maximum of VR is enumerated …" | **VERIFIED DONE**, and it is right. One optional tightening: the enumeration covers @11 as well, so "at x = 11, 13 and 17" is the exact scope, with @11 additionally closed outright by Theorem 1. |

### To partition E (`sift-limit-attack.md`)

| # | site | current | replacement |
|---|---|---|---|
| E-1 | `research/sift-limit-attack.md`:159 | `\| Fusion / anchored calm (**PROVEN (i),(ii); MEASURED (iii),(iv)**, cap-19/23/26) \| DP1 \| none \| statement about one position; G₂ is a worst-position problem \|` | `\| Fusion / anchored calm (**PROVEN**: Fusion Identity, Mirror-Phase Doubling, Minus-Half, Skeleton Collapse; **CERTIFIED at six levels**: Aggregate 30-Skeleton Bound; **MEASURED**: Anchored Typicality — `research/anchored-calm.md`) \| DP1 \| none \| statement about one position; G₂ is a worst-position problem \|` — the current row is stale in the **conservative** direction: it grades the third leg MEASURED when it is a proven theorem plus a six-level certificate. |

### To partition G (scripts and the generated index)

| # | site | current | replacement |
|---|---|---|---|
| G-1 | `research/natal-cap-23-covadj-proof.js` header title | "Cov_adj < 0: proving the calm's anticorrelation **leg (iii)**" | "Cov_adj < 0: the anticorrelation proven in aggregate, refuted uniformly in q" |
| G-2 | `research/natal-cap-26-minus-half.js` header title | "THE MINUS-HALF THEOREM: the calm's **leg (iii)**, aggregate form" | "THE MINUS-HALF THEOREM: the exact −1/2 anticorrelation constant" |
| G-3 | `research/natal-cap-30-skeleton-bound.js` header title | "THE AGGREGATE 30-SKELETON BOUND: the calm's **leg (iii)** closed" | "THE AGGREGATE 30-SKELETON BOUND: certified at every computed level, @11 through @29" |
| G-4 | `research/natal-cap-28-analytic-certificate.js` header title | "ATTACK 28 — THE FULLY ANALYTIC CERTIFICATE LAW" | "ATTACK 28 — THE CERTIFICATE ENGINE: one proven head theorem, two unproven ingredients, and the deep-level predictions they condition" |
| G-5 | `research/SCRIPTS.md`:190, 193, 197, 195 | the four titles above, plus an empty description column for cap-28 | **generated file — do not hand-edit.** Apply G-1..G-4 to the script headers, then `node research/gen-scripts-index.js`. cap-28's description column can also be filled by the new `research/certificate-engine.md`, which is its companion prose. |

**Why I did not do G-1..G-5 myself.** My partition is `research/natal-cap-*.md`.
Editing the four script headers requires regenerating `research/SCRIPTS.md`,
which is outside it and which another applier may be reading. The edits are
mechanical and safe once sequenced. This also answers `qc-compound.md`
Unresolved item 6: retitling a *descriptive* banner is not what decision U5
exempted — U5 protects CORRECTION and superseded banners, and none of these four
is one. Two of the three scripts qc-CAMPAIGN listed as untitled now have titles;
`qc.js scripts` reports only `audit-numbers.js` and `exponent-control.js`.

---

## Unresolved

1. **The Anchored Typicality Measurement has no route, and the parent now says
   so in one line.** That is honest, and it is also the calm's whole remaining
   value proposition. If Chris wants the calm demoted further — out of the
   glossary's headline position, say — that is an editorial call I did not take.
2. **`natal-cap-26`'s scope tags stay at @11–@19** (`qc-numbers.md` U5). I kept
   the per-attack note's own scope and let the parent carry the frontier, which
   is what every other decision in that report assumed. If the convention is
   meant to force every leaf to the frontier, cap-23 and cap-26 both need a pass
   and their verdict tables become partly re-runs, not edits.
3. **`natal-cap-30`'s @29 row has one empty column.** max|no30| per prime is not
   computed by the `--at29` pass. Filling it costs another 18.5-minute run. I
   marked it absent rather than inventing it or dropping the row.
4. **The Loudness Ceiling Conjecture is my coinage** and it is the second name
   I have put into the corpus for an object that previously had none (the first
   is the Tail Comb Equidistribution Conjecture). Both state their claim and
   carry their calibration, per standing policy. If either name is wrong, they
   are cheap to change now and expensive later.
5. **`certificate-engine.md` is not under `natal-cap-*`.** I followed
   `qc-compound.md` CC-3(e)'s proposed path exactly. If the house prefers the
   natal-cap numbering for anything paired with a `natal-cap-NN` script, the
   file should be `natal-cap-28-certificate-engine.md` and three pointers move
   with it.
6. **CC-4 through CC-10 and CC-12 are untouched by me** and are routed above only
   where they cross my files. Their site tables are complete in
   `qc-compound.md` §§CC-4..CC-12 and need no re-derivation; they need an owner.
