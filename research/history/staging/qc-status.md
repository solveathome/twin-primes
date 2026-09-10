# QC-STATUS: claim-status audit across objects

<!-- ledger
id: Q-qc-status
status: ANSWERED
todo: none
question: Is any named object's claimed status inflated, contradicted or misattributed?
verdict: Thirteen findings, 12 with replacement text: the worst scope inflation is the Fused-Window Calm Lemma listed as proven when two of its four legs are not, and "the matching lower bound" claims a sharpness the corpus explicitly disclaims; on attribution the corpus is in better shape than the brief assumed.
-->

STATUS: COMPLETE for the objects listed in §0 and §7; coverage gap stated at the end.
Wave 1, diagnosis only. Read-only on all existing files; nothing edited, nothing
committed. This is the only file written.

Count by class: (a) 1 · (b) 4 · (c) 5 · (d) 0 real, 1 inverted · (e) 0 · (f) 2.
Total 13 findings, 12 of them with concrete replacement text.
Axis: CLAIM STATUS of named objects (theorem / lemma / route / attack / dial / door / conjecture),
across all files, not per-file. Attribution/prior-art findings first, by instruction.

Finding classes: (a) STATUS CONTRADICTION, (b) SCOPE INFLATION, (c) ATTRIBUTION STATUS,
(d) ORPHAN STATUS, (e) DEAD ROUTE STILL LIVE, (f) LIVE ROUTE BURIED.

## 0. Register construction (method + coverage)

Register built empirically, not from the brief's seed list. Method:

1. `find . -name '*.md' -not -path './.git/*'` → 79 markdown files (23,759 lines),
   the audit universe (repo root, `research/`, `research/history/`, `paper/`, `web/`,
   `attestation/`).
2. Regex sweep for named objects over all 79 files:
   `(([A-Z][A-Za-z0-9_-]+|[a-z][a-z0-9-]+)[ -])?(Theorem|Lemma|Postulate|Conjecture|Identity|Certificate|Ledger|Reformulation|Principle|Shortcut|Door|Dial|Route|Attack)\b`,
   counted and deduped. Top of the frequency list: Zone Postulate (63), Gap
   Reformulation (32), Copying Theorem (27), Origin Excess Lemma (26), Level Ledger
   (23), Deficit Lemma (21), Localized Merge Lemma (15), Seam Lemma (14),
   A5 Theorem B/C (12), Redundancy Lemma (11), Staircase Theorem (10), Survival
   Quotient Identity (10), Exact Invariance Lemma (10), Fused-Window Calm Lemma (9),
   Skeleton Collapse (5), X-limitation (4), Structured-Bias (4), Head Lemma (4),
   Alternation Lemma (4), Variance Theorem (3), Mirror Ledger (2), Natal Dispersion
   Lemma (2), Pane Postulate (1), Mirror-Sibling Identity (1), Fusion Identity (1),
   Minus-Half Theorem (1).
3. The sweep also surfaced objects NOT in the brief's seed list: the **Deficit
   Lemma** and the **Traverse Bound** (21 hits, the second most-discussed lemma in
   the corpus; audited, consistent — see §7), **Alternation
   Lemma**, **Low-Band Lemma**, **Channel Lemma**, **Inertness Lemma** (7),
   **Rigidity Lemma**, **Dilation Lemma**, **Discrepancy Lemma**, **Fusion
   Identity**, **Mirror-Sibling Identity**, **Minus-Half Theorem**, **Unification
   Law**, **Pane Postulate**, **maxgap law / the `r` term**. Correction to the
   brief: the seed list is missing the Origin Deficit Lemma and the Unification
   Law, both of which carry status defects (below).
4. Per object: grep every occurrence, isolate the status word and the scope
   qualifier, compare against the home document, `research/PRIOR-ART.md`,
   `research/history/CHANGELOG.md` and the dated session records.

## 1. Attribution status (class c) — prior art presented as ours

`research/PRIOR-ART.md` is the authority. Holt/Rudd own: cycle of gaps (tile),
fold recursion, fusions, closure theorem, transfer operator, population models,
interval of survival, one-class discrepancy. Maier owns tile-as-matrix. Buchstab
owns omega(u). Also classical per the verdict table: Copying Theorem (A059861,
Schemmel 1869, Smith 1857), Redundancy Lemma (Holt Thm 2.3), Crystallization
(Pritchard 1982), Euclid-in-moire (Euclid IX.20), the wheel, the p^2 rule.

**Overall verdict on this class: the corpus is in far better shape than the brief
fears.** `PRIOR-ART.md`, `README.md` §Attribution, `research/README.md` §Prior art,
`GLOSSARY.md` (Holt aliases inline at lines 15, 20, 28, 57, 63), `THE-LENS.md`
§174-175, `G2-STATE.md` §719-721, `a3-09-histogram-operator.md` line 16, and
`paper/moire-primes.md` §9 all carry correct attribution, several of them
inline at the point of use. The A9 demotion is applied in its home document.
Four defects remain, all of the same shape: a **summary list that says "Proven"
or "ours" without the prior-art marker its home document carries.**

### C-1. `README.md` line 49: the "Proven:" list reads as a novelty list

Text: `Proven: Copying Theorem, Redundancy Lemma, Crystallization, Euclid-in-moiré,
Zone Equivalence, the 2·ln p pigeonhole theorem, Exact Invariance Lemma, Seam
Lemma, ...`

Class (c) plus (b). The first four items are **classical** per `PRIOR-ART.md`
lines 15-18, and Copying+Redundancy are jointly Holt 1408.6002 Thm 2.3
(`PRIOR-ART.md` line 108). The status word "Proven" is correct; the defect is
that a bare list of proven objects in a repository README is read as a list of
this repository's results, and the attribution paragraph that fixes it sits 12
lines below at line 61 and names only the *frame*, not these five objects.

FIX (replace lines 49-52's opening): 
`Proven, with the classical spine marked as such: the Copying Theorem
(classical: A059861, Schemmel 1869; = Holt 1408.6002 Thm 2.3), the Redundancy
Lemma (same theorem), Crystallization (classical: the sieve p² rule, Pritchard
1982), Euclid-in-moiré (classical: Euclid IX.20), Zone Equivalence (a framing
biconditional, not a result — see PRIOR-ART.md), and then ours: the 2·ln p
pigeonhole theorem, the Exact Invariance Lemma, the Seam Lemma, birth-cohort
decomposition, the grain census law, the d2=d4 identity (Labos 2001, first
proof), house-blindness, and the β₂ theorem ...`

Confidence HIGH. Checked: `PRIOR-ART.md` lines 15-19, 108; `README.md` 49-69.

### C-2. `research/README.md` §"The proven spine": items 1-5 unmarked

Section heading: `## The proven spine (each provable in a paragraph; proofs to
appear in the paper)`. Items 1 Redundancy Lemma, 2 Crystallization, 3 Copying
Theorem, 4 Euclid-in-moiré, 5 Zone Equivalence carry no prior-art marker. Item 4
does say "(Euclid's construction, rediscovered as the edge of the mirror)", which
is the right pattern; items 1, 2, 3 do not. The §Prior art block at line 128
fixes it 80 lines later.

Class (c). FIX: append the same parenthetical pattern item 4 already uses:
- item 1, after "…measured 2020–2025 in the original research corpus as 1, 1, 2, 8, …)": add ` (Classical: Holt and Rudd 1408.6002 Thm 2.3.)`
- item 2, after "(script 04: 8/8)": add ` (Classical: the sieve p² rule; Pritchard 1982.)`
- item 3, after "verified exactly up to 6.5·10⁹ (script 05b)": add ` (Classical: OEIS A059861; Schemmel 1869; Smith 1857.)`

Confidence HIGH. Checked: `research/README.md` 43-67 against `PRIOR-ART.md` 15-18, 108.

### C-3. Zone Equivalence is listed as a proven result in three places, against PRIOR-ART's explicit instruction

`PRIOR-ART.md` line 51: *"Present Zone Equivalence as a framing device, not a
result."* Verdict-table entry line 19: *"possibly novel as stated, logically
lightweight"*. Occurrences:

| file:line | status word used | verdict |
|---|---|---|
| `research/PRIOR-ART.md`:19,51 | "logically lightweight", "framing device, not a result" | HOME / AUTHORITY |
| `paper/moire-primes.md`:377 | "**Zone Equivalence Proposition**" | CORRECT (proposition, not theorem) |
| `README.md`:49-50 | inside the "Proven:" list | DEFECT |
| `research/README.md`:56 | item 5 of "**The proven spine**" | DEFECT |
| `paper/PAPERS.md`:18 | listed among "the spine theorems" | DEFECT |

Class (c) plus (b). It IS proven (it is a trivial biconditional), so this is not
a status contradiction; it is the corpus advertising a definitional restatement
as a spine theorem, which PRIOR-ART.md explicitly forbids for publication.

FIX: in all three summary sites, render as `Zone Equivalence (a framing
biconditional; logically lightweight — see PRIOR-ART.md)` and move it out of any
list headed "theorems" or "the proven spine".

Confidence HIGH. Checked all five occurrences plus `paper/moire-primes.md` §377.

### C-4. `research/ATTACKS2.md` — the Unification Law's Buchstab core is unattributed

`ATTACKS2.md`:15 and :24 present `ρ(u) = e^{2γ}/u² → (e^γω(u))²` as "**THE
UNIFICATION LAW**" and "theorem-grade", with no mention that ω(u) is Buchstab's
function. `README.md`:66 states "Buchstab owns the survival curve ω(u)", and
`paper/moire-primes.md`:794 and 828 attribute it correctly (Buchstab;
Cheer–Goldston 1990). `ATTACKS2.md` is dated 2026-08-14, before the Buchstab
attribution was made, which explains it but does not excuse it under the
document convention (working documents state current understanding).

Class (c). FIX in `ATTACKS2.md` line 24, replace `the **Unification Law** ρ(u) =
e^{2γ}/u² → (e^γω(u))²` with `the **Unification Law** ρ(u) = e^{2γ}/u² →
(e^γω(u))², whose ω(u) is Buchstab's survival function (Buchstab; numerics
Cheer–Goldston, Math. Comp. 55, 1990) — the curve is prior art, its
identification as the single law behind cap, trough, kill shadow and the p³ law
is ours`.

Confidence HIGH. Checked: `PRIOR-ART.md` 318-334, `README.md` 66,
`paper/moire-primes.md` 794/828, `GLOSSARY.md` 154-159.

### C-5. `research/GLOSSARY.md`:154 — Unification Law entry carries no calibration marker and no attribution

The glossary marks calibration inline elsewhere (VERIFIED at 41, PROVEN at 89 and
329, MEASURED at 288 and 310). The Unification Law entry states flatly *"one curve
governs local twin density relative to the tile average"* with no marker, while
its home documents say HL-conditional and measured (see B-1 below).

Class (c) plus (b). FIX: open the entry `- **Unification Law** (MEASURED to ~1%,
Hardy-Littlewood-conditional; ω(u) is Buchstab's) — one curve governs …`.

Confidence HIGH. Checked `GLOSSARY.md` 154-159 against `research/ATTACKS2.md` 13,
`research/origin-excess.md` 34-38, `paper/moire-primes.md` 294-305.

## 2. Status contradictions (class a)

### A-1. GLOSSARY names Lemma V as "the one missing ingredient"; its home document says Lemma V is not the operative assumption at all

CORRECT CURRENT STATUS: **the open object on the exponent road is a Gaussian
maximal law for the bilinear interval sawtooth, NOT Lemma V.** At the measured
working point s/u ≈ 1.2, which is outside the range s ≤ u that Lemma V is even
stated in, so proving Lemma V as stated would not reach the working point. Home:
`research/sift-limit-attack.md` §§3, 4.5 and its closing calibration;
corroborated by `research/theta-ladder.md` §§(i)-(ii).

| file:section | what it says the missing ingredient is | verdict |
|---|---|---|
| `research/sift-limit-attack.md`:40-53 | "the working point there has s/u ≈ 1.2, **outside the range s ≤ u that Lemma V is stated in** … **The whole price of the route is that one maximal inequality.**" | **HOME / AUTHORITY** |
| `research/sift-limit-attack.md`:249 | "**Lemma V (needed, not proven).**" — the boxed statement | correct as a statement |
| `research/sift-limit-attack.md`:400-404 | "an estimate (Lemma V) **that is not even the operative assumption at the measured working point**, where s/u > 1 puts the ladder outside Lemma V's stated range and on an unproven maximal law instead" | HOME, restated |
| `research/theta-ladder.md`:569-572 | "this regime is OUTSIDE the range Lemma V is stated in … It is the statement 'the actual sawtooth, if it obeys a Gaussian maximal law, is smaller than Lemma V's stated range would need'. **Closing it needs the maximal law**" | CORRECT |
| `TODO.md`:60-66 | "every conditional number rests on the unproven Gaussian maximal law for the sawtooth, and at theta ~ 2.5 the ratio s/u = 1.2 sits outside the range Lemma V is even stated in. **So the maximal law is not half the price, it is the whole price.**" | CORRECT |
| `research/GLOSSARY.md`:265-271 | "**Lemma V — the one missing ingredient on the exponent road**" | **DEFECT (a)** |
| `research/ZONE-POSTULATE.md`:231-236 | "The one visible road is Brüdern-Fouvry vector-sieve decoupling, **missing the signed cancellation of the bilinear interval sawtooth remainder uniform in position (Lemma V)**" | **DEFECT (a), milder** |

FINDING, class (a). Four documents including the home say the open object is the
Gaussian maximal law and that Lemma V is off the working point; the glossary — the
document `README.md` tells readers to read first — says Lemma V *is* the one
missing ingredient. This is the exact failure the brief describes: a reader who
trusts the glossary spends a day trying to prove a lemma that would not reach the
regime the ladder actually sits in.

FIX, `research/GLOSSARY.md` lines 265-271. Replace the entry with:

`- **Lemma V** — the two-dimensional analog of Iwaniec's 1980 linear-sieve error
  term: signed cancellation of the bilinear interval sawtooth remainder, uniform
  in position. NEEDED, NOT PROVEN. It is what the Brüdern-Fouvry vector sieve
  needs to decouple, and full decoupling would give 1 + √e ≈ 2.649, with any
  partial decoupling past θ = 1.2417 beating our proven 4.2665. **But Lemma V is
  not the operative assumption at the measured working point.** There s/u ≈ 1.2,
  outside the range s ≤ u that Lemma V is stated in, so the ladder rests instead
  on an unproven **Gaussian maximal law for the sawtooth**, which is the whole
  price of the route (`research/sift-limit-attack.md` §§3, 4.5;
  `research/theta-ladder.md`). Below 2 is TPC outright.`

FIX, `research/ZONE-POSTULATE.md` line 234, replace `missing the signed
cancellation of the bilinear interval sawtooth remainder uniform in position
(Lemma V)` with `missing the signed cancellation of the bilinear interval sawtooth
remainder uniform in position (Lemma V) — and note that at the measured working
point s/u ≈ 1.2 sits outside Lemma V's stated range, so the operative unproven
input is a Gaussian maximal law for the sawtooth rather than Lemma V itself`.

Confidence HIGH. Checked all seven sites listed. The two corrected documents
(`sift-limit-attack.md`, `theta-ladder.md`) are both dated after `GLOSSARY.md`'s
entry and both state the correction as a correction, so the direction of the fix
is not in doubt.

## 3. Scope inflation (class b)

### B-1. The Unification Law: "theorem-grade" in the summary, "not proven here" at home

CORRECT CURRENT STATUS: **MEASURED to ~1% at every grid point tested,
Hardy-Littlewood-conditional; the u = 2 argmin is INFERRED, not proven.** Home:
`research/ATTACKS2.md` #3/#5 for the derivation, `research/origin-excess.md` §2-3
for the hedged statement, `paper/moire-primes.md` §4 for the publication form.

| file:section | status word / scope | verdict |
|---|---|---|
| `research/ATTACKS2.md`:13 (#3) | "HL-conditional" | CORRECT |
| `research/ATTACKS2.md`:15 (#5) | "DONE, CLOSED … verified ~1% everywhere" | CORRECT-ish, no conditionality marker |
| `research/ATTACKS2.md`:24 (verdict) | "Two **theorem-grade** results: the **Unification Law**" | DEFECT (b) |
| `research/GLOSSARY.md`:154 | no marker at all: "one curve governs" | DEFECT (b), see C-5 |
| `research/origin-excess.md`:34-38 | "INFERRED from the squared-Buchstab form … and **is not proven here**" | HOME, CORRECT |
| `research/origin-excess.md`:730 | "VERIFIED (fresh window, 15 levels)" | CORRECT for the re-measurement |
| `research/FOLD-PROFILE.md`:169 | "The repo's Unification Law gives that curve as …" — asserted as fact, used as an input to a further reading | DEFECT (b), mild |
| `paper/moire-primes.md`:294-305 | "derived independently by two routes … verified to ~1% … the derivation is Hardy–Littlewood-" | CORRECT, best form in the corpus |
| `paper/anchored-note.md`:224 | "consistent with the Unification Law's curve" | CORRECT |

FINDING, class (b): `ATTACKS2.md`:24 calls an HL-conditional measured law
"theorem-grade", and the same document's own row 13 says "HL-conditional". This is
the corpus's own campaign verdict inflating its own row. It is also the sentence
most likely to be copied forward into a summary.

FIX, `research/ATTACKS2.md` line 24-27, replace `Two theorem-grade results: the
**Unification Law** ρ(u) = e^{2γ}/u² → (e^γω(u))² (one curve explaining the cap,
the trough, the kill shadow, and the p³ law — derived independently by two agents)
and the **Exact Invariance Lemma** (fossil depth frozen at birth, unconditional —
proved independently twice).` with:

`One theorem and one law. The **Exact Invariance Lemma** (fossil depth frozen at
birth) is PROVEN, unconditional, one line of CRT, proved independently twice. The
**Unification Law** ρ(u) = e^{2γ}/u² → (e^γω(u))² — one curve explaining the cap,
the trough, the kill shadow and the p³ law, derived independently by two agents —
is MEASURED to ~1% at every grid point tested and is Hardy-Littlewood-conditional;
its ω(u) is Buchstab's survival function. It is not a theorem.`

Confidence HIGH. Checked: `ATTACKS2.md` 13/15/24-27, `origin-excess.md` 34-38 and
730, `paper/moire-primes.md` 294-305, `GLOSSARY.md` 154-159,
`research/history/staging/audit-uframe.md`:147 (which already caught a *different*
misuse of the same curve in `U-FRAME.md` §5 and refuted it).

FIX for `FOLD-PROFILE.md`:169, replace `The repo's Unification Law gives that curve
as` with `The repo's Unification Law (MEASURED, HL-conditional) gives that curve as`.

### B-2. THE WORST SCOPE INFLATION IN THE CORPUS: the Fused-Window Calm Lemma is listed as proven; two of its four legs are not

CORRECT CURRENT STATUS, per its own home document
`research/natal-cap-30-skeleton-bound.md` §"Status of the Fused-Window Calm Lemma
after this file":

- leg (i) fusion — **PROVEN** (cap-19)
- leg (ii) duplication — **PROVEN** (cap-19)
- leg (iii) the −1/2 exact + deviation = skeleton — **THEOREM at x = 11..23 only;
  the all-x statement is OPEN with the blocking term named** (Prop C:
  prime-equidistribution of window residues)
- leg (iv) anchored typicality ≈ 0.94 — **MEASURED, and its home says "this leg
  has no proof mechanism in sight; it is the calm's last wall."**

| file:section | status word / scope | verdict |
|---|---|---|
| `research/natal-cap-19-calm-lemma.md`:90 | "(status: two legs proven, two measured)" | ORIGINAL HOME, correct for its date |
| `research/natal-cap-23-covadj-proof.md`:164 | "Consequence: corrected status of the Fused-Window Calm Lemma" | update |
| `research/natal-cap-26-minus-half.md`:154 | "Consequence: status of the Fused-Window Calm Lemma" | update |
| `research/natal-cap-30-skeleton-bound.md`:110-125 | the four-leg breakdown above | **CURRENT HOME / AUTHORITY** |
| `README.md`:55-59 | listed flat among "The natal-cap campaign … added nine more" under the sentence beginning "**Proven:**" | **DEFECT (b), the worst instance found** |

FINDING, class (b). `README.md` puts a lemma with one finite-level leg and one
openly unproven leg into a list whose governing word is "Proven". A reader who
takes `README.md` at its word believes the anchored calm is a theorem. Its home
document says the opposite in plain words on the same day. This is the single
highest-consequence status defect in the corpus because `README.md` is the entry
point and because the calm is what the anchored route rests on.

FIX, `README.md` lines 54-59. Replace `The natal-cap campaign of 14 to 15 August
added nine more: the Staircase Theorem, the Structured-Bias Theorem, the
Fused-Window Calm Lemma, the exact −1/2 correlation constant, the Skeleton
Collapse Theorem, the X-limitation Theorem, the first beyond-Chebyshev ensemble
bounds, the Legendre-comb head certificate, and survivors-are-twins for all
levels.` with:

`The natal-cap campaign of 14 to 15 August added eight proven results: the
Staircase Theorem, the Structured-Bias Theorem, the exact −1/2 correlation
constant, the Skeleton Collapse Theorem (all x, all q), the X-limitation Theorem
(from x = 13 up), the first beyond-Chebyshev ensemble bound (at @11 and @13; @17
is not run), the Legendre-comb head certificate, and survivors-are-twins for all
levels. The **Fused-Window Calm Lemma is not among them**: two of its four legs
are proven (fusion, duplication), the third is a theorem at x = 11..29 with the
all-x case open at a named analytic door, and the fourth, anchored typicality
≈ 0.94, is MEASURED with no proof mechanism in sight
(`research/natal-cap-30-skeleton-bound.md`).`

Confidence HIGH. Checked: `natal-cap-19-calm-lemma.md`:90, `natal-cap-30-skeleton-bound.md`:105-125,
`natal-cap-36-skeleton-door.md`, `TODO.md`:168-189, `paper/anchored-note.md`:390,
`README.md`:54-59.

### B-4. "the matching lower bound" — the one phrase in the corpus that claims sharpness the corpus explicitly disclaims

CORRECT CURRENT STATUS: **upper bound G₂(x#) ≪_ε x^{4.2665+ε} (PROVEN); lower bound
G₂(x#) ≫ x·log x·logloglog x/loglog x (PROVEN, by monotonicity from G₂ ≥ g). These
are exponent ~4.27 and exponent 1+o(1). They do not match; the distance between
them is the open band and the repository's central fact.** Home:
`paper/beta2-note.md` §"The point of this note is not sharpness", and
`research/two-class-lower-bounds.md` §3.

| file:line | wording | verdict |
|---|---|---|
| `paper/beta2-note.md`:234 | "**The point of this note is not sharpness.** The interval of provable exponents was entirely empty before, in both directions" | **HOME / AUTHORITY** |
| `research/G2-STATE.md`:736-737 | two separate rows, "the first upper bound at any exponent" and "the first lower bound of any kind"; no sharpness claim | CORRECT |
| `README.md`:37-47 (§Status) | "the central fact is that we cannot bound it … the target … is exponent 2, and **no route in this repository has moved that gap by any amount**" | CORRECT |
| `README.md`:28 (Map table) | "Paper II: G₂ ≪ p^{4.267+ε}, the first two-class Jacobsthal bound of any kind, **with the matching lower bound**" | **DEFECT (b), and it contradicts line 39 of its own file** |
| `paper/moire-primes.md`:39 | "A companion note (Paper II) proves the first upper bound for G₂ at any exponent; **the matching lower bound** is free, and is likewise the first recorded" | **DEFECT (b), publication risk** |

FINDING, class (b). "Matching lower bound" is a term of art meaning the two bounds
agree in order. Here they differ by an exponent of about 3.27, and that difference
IS the programme. `README.md` contradicts itself eleven lines apart, and
`paper/moire-primes.md` puts the phrase in its opening positioning paragraph, which
is the paragraph a referee reads first. Nothing else in the corpus claims sharpness.

FIX, `README.md` line 28: replace `with the matching lower bound` with `plus the
first two-class lower bound, G₂ ≫ x·log x·logloglog x/loglog x — not matching; the
band between them is the whole problem`.

FIX, `paper/moire-primes.md` line 39: replace `the matching lower bound is free, and
is likewise the first recorded` with `a lower bound is free and is likewise the first
recorded, though it is nowhere near matching: the band (2, 4.2665] between them is
the problem this paper is about`.

Confidence HIGH. Checked: `paper/beta2-note.md`:224-238, `README.md`:28 and 37-47,
`paper/moire-primes.md`:34-41, `research/two-class-lower-bounds.md`:209 and 680,
`research/G2-STATE.md`:736-737. Grepped "matching" across the corpus: exactly two
occurrences, both listed.

### B-3. Two more members of the same "nine" carry qualifiers README drops

Same sentence, `README.md`:55-59. Independent of B-2:

- **the first beyond-Chebyshev ensemble bounds** (plural, unqualified). Home
  `research/natal-cap-21-beyond-chebyshev.md` §"Theorem 2 (the first
  beyond-Chebyshev unconditional ensemble bound)" is marked **[verified]**,
  singular, and its own next-steps list line 141 reads `Run @13's T₄ offline
  (~90 min…) → first beyond-Chebyshev`. `TODO.md`:191-210 confirms the current
  state: the @13 gate is MET, and *"Remaining: the @17 rerun itself, which never
  started."* So the correct scope is **one bound, at @11 and @13, with @17 not
  run** — not "bounds" in general. Class (b).
- **the X-limitation Theorem** (unqualified). Home
  `research/natal-cap-31-calm-vs-kill.md` Theorem 2, and both
  `paper/moire-primes.md`:553 and `paper/anchored-note.md`:416 correctly state it
  as *"proven from x = 13 upward"* / *"from @13 on"*. `README.md` and
  `GLOSSARY.md`:229 drop the x ≥ 13 floor. Class (b), mild but trivially fixable.

FIX: both handled by the B-2 replacement text above, which restores "(at @11 and
@13; @17 is not run)" and "(from x = 13 up)". For `GLOSSARY.md`:229, prefix the
statement with `from x = 13 up,`.

Confidence HIGH for X-limitation (three sources agree on x ≥ 13). Confidence
MEDIUM-HIGH on beyond-Chebyshev: `natal-cap-21` is marked [verified] rather than
PROVEN and I did not open its script, so the plural-vs-singular fix is certain but
the exact level list should be confirmed against `natal-cap-21-beyond-chebyshev.js`
before applying.

## 4. Orphan statuses (class d)

The corpus has **no instance of the classic (d) defect** — a status asserted in a
summary with no home document behind it. Every named object in the register traced
to a home. Two objects the brief lists were checked specifically and both have
homes:

- **the Structured-Bias Theorem.** `README.md`:55 lists it; I first read it as an
  orphan because the home spells it with a lowercase b. Home is
  `research/natal-cap-12-overlap-sign.md` §T1 "Structured-bias theorem", stated
  "For every pair (q,q′) at every level x". Not an orphan; the only thing worth
  doing is making the capitalisation match so a grep finds it.
- **head monotonicity.** Home is `research/FOLD-PROFILE.md` §9, as an unnamed
  "*Lemma (PROVEN).*" ("head membership is monotone decreasing. The head is pure
  attrition"). Not an orphan, but it is unnamed at its home while three other
  documents refer to it by name (`research/origin-excess.md`:501, :562;
  `research/history/SESSION-2026-08-17.md`:49). FIX: name it at the home —
  `*Head Monotonicity Lemma (PROVEN).*`.

### D-1 (inverted). Two established objects live only in `history/` and in a script, so they have no status a reader can find

`research/README.md`:21 instructs: *"None of `history/` should be read unless you
need the history of a specific claim."* Under that rule, an object whose only prose
statement is in `history/` has no findable status. Two:

| object | where it actually is | status recorded there |
|---|---|---|
| **the Natal Dispersion Lemma** | `research/history/SESSION-2026-08-17.md`:52-54 and `research/fold-profile-09-natal-dispersion.js`:16 (proof in comments) | "For q > p, gcd(W,q)=1 and q > p−1 make k ↦ kW−1 injective mod q on [1,p−1], so the fold by q removes at most two members of natal@p. **VERIFIED, never exceeded.**" |
| **the lineage identity** | `research/history/SESSION-2026-08-17.md`:56 only | "rarity (y−3)/y# × quality m̄(y) = (y−3)/D_y = the share, **EXACT at every level**" |

Grepped both across every `*.md` and `*.js`: no working document mentions either.
This matters beyond tidiness for the first one, because the same session record uses
it to justify a CLOSURE: §3 closes "the natal creation engine" partly on the ground
that *"the Dispersion Lemma protects it only out to u ≈ x/ln x, which is far above
β₂ = 4.26645 and therefore already covered by the standard sieve for free."* So a
closed route's justification rests on a lemma with no home.

FIX: add both to `research/FOLD-PROFILE.md` §9 (which already holds the natal
material and the natal@p cohort table) as named boxed lemmas with the statuses
quoted above, and add a one-line entry for each to `research/GLOSSARY.md`. Then the
"natal creation engine is CLOSED" reading has a citable basis.

Confidence HIGH on the absence (exhaustive grep on three spellings each).
Confidence MEDIUM on where they should go: `FOLD-PROFILE.md` §9 is my
recommendation, not an established convention — this touches the architecture
agent's axis, so treat the placement as a suggestion and the omission as the finding.

## 5. Dead route still live (class e)

**No instance found, and this is worth stating positively because the brief expected
some.** `TODO.md` was checked item by item against the research bodies. It is the
best-disciplined document in the corpus on this axis: it names its own dead branches
inline rather than quietly dropping them, and every one I checked matched the
research body.

| TODO item | dead thing it names | checked against | agrees? |
|---|---|---|---|
| 0b | "ALREADY REFUTED, do not retry: (i) the doubling guess, dead at the first fold, 12 → 30 not 24; (ii) bounding the adjacent-kill run, which bounds the wrong quantity" | `research/gate-multiplies.md` §§9-10, `research/U-FRAME.md` §7, `research/ATTACKS3.md` A5/A8 | yes |
| 0b | the corrected rate `ln c(p) ≤ 2 ln p / p`, "the gap is a factor 0.58 ln p, and it is the only gap" | `gate-multiplies.md`:456-470, which states the retirement of TODO 0b's old inequality in those words | yes, verbatim |
| 0c | the maxsum copy theorem as "the strongest survivor in the branch", immune to NFP and to the Overshoot Budget | `gate-multiplies.md`:231-238 and :435-443 | yes, verbatim |
| 0e | "Two mechanisms are checked and dead" (almost-all-positions cannot be steered to the origin; large prime gaps widen the window by 2(p′−p)/p → 0) | `THE-DIALS.md` dial 4, `G2-STATE.md` §9 item 5 | yes |
| 4 | "the DECAY SHORTCUT IS DEAD, refuted twice" | `natal-cap-36-skeleton-door.md` §"The decay-law shortcut (refuted)" **[REFUTED]** | yes (but see F-1 on the level count) |
| 4 | "THE DOOR AS NAMED REACHES ABOUT A TENTH OF THE MASS", and "First move: decide whether this item survives" | `natal-cap-36-skeleton-door.md`:161-192 | yes, and the item honestly proposes its own demotion |
| 6 | "The class-histogram shortcut is REFUTED: setting the pair weight to 1 costs 64% of the multi layer" | `natal-cap-34`/`-32` material via TODO's own citation | yes |
| 8 | "the pair-resummation hypothesis was REFUTED — the correlation is all-orders and exactly ω(u)" | `natal-cap-28` material; `PRIOR-ART.md`:329 confirms the ω(u) identification | yes |
| X | "REFUTED the intuition (calm does not concentrate S…)" | `natal-cap-31-calm-vs-kill.md`:111 | yes |
| Parked | the pane, G₂(41#) cost, Erdős #689 | `THE-DIALS.md` §1 ("closed twice over"), `ATTACKS3.md` A7 ("CLOSED, twice") | yes |

The one thing `TODO.md` does that is worth naming as a near-miss rather than a
defect: item 11 proposes three write-ups from a dial that `THE-DIALS.md` tells the
reader is dead. That is recorded as F-2 above, and the defect is in `THE-DIALS.md`,
not in `TODO.md`.

## 6. Live route buried (class f)

### F-1. The G30_agg certified ladder runs to @29 in the script and to @23 in every markdown

CORRECT CURRENT STATUS: **G30_agg < 1/2 is CERTIFIED as an exact integer
inequality at SIX levels, @11 @13 @17 @19 @23 @29**, values
0.2132, 0.1113, 0.1011, 0.1259, 0.0945, 0.1176, margin at @29 = 0.3824, 7,863
scour primes, W = 6,469,693,230. Authority: `research/natal-cap-36-skeleton-door.js`
lines 23, 275, 287, 338-340 (`P6 @29: … W·ΣNUMsk < 15·ΣV: CERTIFIED
G30_agg=0.1176 margin 0.3824`), reproducible with `--at29`, 18.5 min.

| file:section | scope claimed | verdict |
|---|---|---|
| `research/natal-cap-36-skeleton-door.js`:23, 275, 287, 332-340 | six levels @11..@29, @29 CERTIFIED | **AUTHORITY** |
| `TODO.md`:170-178 | "certified G30_agg < 1/2 in exact BigInt at six levels @11..@29 (0.2132, 0.1113, 0.1011, 0.1259, 0.0945, 0.1176 … natal-cap-36 default and --at29)", mean 0.1101, spread 0.0313, fits R² 0.44/0.26/0.33 | CORRECT, and it is the only markdown that is |
| `research/natal-cap-36-skeleton-door.md`:194-205 | "G30_agg = 0.2132, 0.1113, 0.1011, 0.1259, 0.0945 at **@11 through @23**", mean 0.1082, spread 0.0314, fits R² 0.601/0.511/0.527 | **STALE — five levels, five-level statistics** |
| `research/natal-cap-30-skeleton-bound.md`:110-125 | "certified … at **all five levels**", "a **five-level** exact theorem", leg (iii) "THEOREM at **x = 11..23**" | **STALE** |
| `paper/anchored-note.md`:390 | states the G30_agg < 1/2 form; scope not re-checked in this pass | verify |

FINDING, class (f) inverted scope — the corpus **understates** a certified result,
and it is the only instance of that direction I found. The markdown record loses a
level that the script has already certified, and it also loses the *stronger* form
of the negative result: the .js records that adding @29 makes the decay fits
strictly worse (R² 0.601/0.511/0.527 → 0.44/0.26/0.33) and makes the sequence
non-monotone **twice** rather than once. So the REFUTED verdict on the decay
shortcut is better supported than its home document claims.

FIXES, three, all mechanical:

1. `research/natal-cap-36-skeleton-door.md`, replace the sentence
   `G30_agg = 0.2132, 0.1113, 0.1011, 0.1259, 0.0945 at @11 through @23. The
   increments are −0.1019, −0.0102, +0.0248, −0.0314: the sequence is
   non-monotone, and after @11 it is flat within its own spread (mean 0.1082,
   spread 0.0314).` with `G30_agg = 0.2132, 0.1113, 0.1011, 0.1259, 0.0945,
   0.1176 at @11 through @29 (the @29 row is the `--at29` pass, 18.5 min). The
   increments are −0.1019, −0.0102, +0.0248, −0.0313, +0.0231: the sequence is
   non-monotone twice, and after @11 it is flat within its own spread (mean
   0.1101, spread 0.0313).` Then replace the three R² values 0.601 / 0.511 /
   0.527 with the six-level values 0.44 / 0.26 / 0.33 and note that adding @29
   makes every fit worse.
2. `research/natal-cap-30-skeleton-bound.md` §"Status of the Fused-Window Calm
   Lemma after this file": replace `all five levels` with `all six levels,
   @11 through @29`, replace `a five-level exact theorem` with `a six-level exact
   theorem`, and replace leg (iii)'s `THEOREM at x = 11..23` with
   `THEOREM at x = 11..29`. Margins `0.29–0.41` should become `0.29–0.41 at
   @11..@23 and 0.3824 at @29`.
3. `TODO.md`:170-178 needs no change; it is already correct. Its "confirmed by
   clean re-runs" wording is the reason the discrepancy is safe to resolve in the
   script's favour.

Confidence HIGH. Checked: `natal-cap-36-skeleton-door.js` lines 23, 59-64, 228,
275, 286-287, 331-340, 404-405 (embedded output, the house code>output>readings
format, so this is recorded output rather than a prediction);
`natal-cap-36-skeleton-door.md`:194-205; `natal-cap-30-skeleton-bound.md`:105-131;
`TODO.md`:168-189. Grepped `0.1176` and `at29` across all `*.md` and `*.js`: the
value appears in the script and in TODO.md and nowhere else.

NOTE for the numbers agent, since the split falls on their axis too: the five-level
statistics (mean 0.1082, spread 0.0314, R² 0.601/0.511/0.527) and the six-level
ones (0.1101, 0.0313, 0.44/0.26/0.33) are both in the repo as though they described
the same object.

### F-2. Dial 7 writes off equidistribution as "inert"; the survey it cites names two provable-now theorems

CORRECT CURRENT STATUS: **equidistribution imports are inert for the two legs that
matter (Assumption A and the Buchstab transfer at bounded u) and LIVE for four
others**, of which two are now-provable. Home: `research/bv-import-survey.md` §5
verdict table (four `NOW` rows, two `BV` rows) and §"The two NOW-provable
discoveries, named" (line 314) plus §6 next-steps items 1-3.

| file:section | status claimed for the equidistribution dial | verdict |
|---|---|---|
| `research/bv-import-survey.md`:292-320 | verdict table: `NOW` for fixed-modulus prime-comb equidistribution (Siegel-Walfisz), `NOW` for rotation-averaged HL, `NOW` for the Buchstab transfer at y = T^{o(1)}, `NOW on average` for sharp Assumption A; `BV` for full-wheel tail-regime comb equidistribution; `none` for weak Assumption A and for the Buchstab transfer at bounded u | **HOME / AUTHORITY** |
| `research/bv-import-survey.md`:336 (§6 item 4) | "**Do not spend equidistribution effort on the skeleton bound or the Buchstab transfer at bounded u**" — scoped to exactly two legs | HOME, and note the scope |
| `TODO.md`:301-310 (item 11) | "The three NOW-provable prizes from the BV survey … Win: three finished theorems from imports that are already proven" | CORRECT (it splits the survey's S1/S2 into two, which is faithful) |
| `research/THE-DIALS.md`:121-125 (dial 7) | "Bombieri-Vinogradov gives θ = 1/2 and Elliott-Halberstam would give θ = 1 … `research/bv-import-survey.md` already returned the verdict for us: **inert.** Our statements contain no primes, only roughness, so equidistribution-of-primes inputs have nothing to attach to. **Do not spend effort here.**" | **DEFECT (f)** |
| `research/THE-DIALS.md`:152 (summary table) | "| 7 | level of distribution | inert for our objects | **no** |" | **DEFECT (f)** |

FINDING, class (f). `THE-DIALS.md` takes the survey's narrowly-scoped "do not spend
effort" (two named legs) and generalises it to the whole dial, in the one document
whose stated purpose is triage. The reasoning it gives — "our statements contain no
primes, only roughness" — is true of the *target* legs and false of the certificate
machinery, whose prime-comb equidistribution ingredient is exactly a prime count
and is a Siegel-Walfisz theorem at fixed modulus. A reader triaging with dial 7
would kill TODO item 11, which is three finished theorems for the price of writing
them up. This is the most valuable single fix in the report, because unlike every
other finding here it does not lose anything, it recovers work.

FIX, `research/THE-DIALS.md` lines 121-125. Replace with:

`**Dial 7, level of distribution. Inert where it counts, live where it does not.**
Bombieri-Vinogradov gives θ = 1/2 and Elliott-Halberstam would give θ = 1. This is
the standard dial in the literature and `research/bv-import-survey.md` returned a
split verdict. **Inert on the target:** Assumption A in its weak form is
parity-blocked at every input including GEH, and the Buchstab transfer at bounded u
is the κ = 2 sifting-limit problem rather than an equidistribution problem, so
neither moves. Do not spend effort on those two. **Live on the machinery:** the
prime-comb equidistribution ingredient IS a prime count, and it is a Siegel-Walfisz
theorem at fixed modulus and depth, and a Bombieri-Vinogradov theorem on the full
wheel in the tail regime. Those two retire named unproven ingredients of the
certificate (TODO item 11), and they are theorems waiting to be written up rather
than research. The dial is worth nothing against the wall and worth three write-ups
against the heuristics.`

FIX, `research/THE-DIALS.md` line 152 summary row: replace `| 7 | level of
distribution | inert for our objects | no |` with `| 7 | level of distribution |
inert on the target legs, NOW-provable on two certificate ingredients | only for
the write-ups (TODO 11) |`. And `THE-DIALS.md` §4's `Dial 7 … inert` sentence, if
it repeats the flat claim, takes the same qualifier.

Confidence HIGH. Checked: `bv-import-survey.md`:12, 42-63, 127-134, 180, 212-218,
292-336; `THE-DIALS.md`:121-125 and 144-153; `TODO.md`:255-266 and 301-310.

## 7. Objects checked and found consistent

These were audited across every occurrence and need no change. Recorded so the
next reader does not re-check them.

- **Origin Excess Lemma.** Status PROVEN, VERIFIED 14/14, and — this is the part
  that usually gets lost — the *three*-hypothesis form with the advantage capped at
  about 2.2 is carried at all four sites: `research/maier-matrix.md` §4 (boxed
  statement plus the explicit three-hypothesis paragraph and the 2.2 cap), the same
  file's reading 3 (line 548), `research/origin-excess.md` §6 and §9,
  `research/ZONE-POSTULATE.md`:284-288, and `research/G2-STATE.md`:750. No scope
  inflation. Checked all five.
- **Survival Quotient Identity.** PROVEN, VERIFIED 39/39 in `G2-STATE.md`:744;
  `origin-excess.md` §2 is the home and states it with no error term for every
  y < x and S ≤ y#; `maier-matrix.md`:258-262 quotes it as the exact form that
  should be quoted instead of the asymptotic factor. Consistent.
- **Exact Invariance Lemma.** PROVEN, unconditional, one-line CRT, at
  `research/ATTACKS2.md` #9 and verdict, `README.md`:50, `paper/moire-primes.md`:268
  and 852. Consistent everywhere; the one place it could have inflated
  (`ATTACKS2.md`:26 "unconditional") is correct.
- **A9 / the histogram transfer operator.** Correctly demoted to prior art at its
  home (`research/a3-09-histogram-operator.md`:16, "The transfer operator below is
  not new"), in `PRIOR-ART.md`:110/117-122, `THE-LENS.md`:175, `README.md`:64,
  `G2-STATE.md`:719, `paper/PAPERS.md`:66, `paper/moire-primes.md`:826. The
  computation (42 exact diagonal points) stays ours and is labelled as such. No
  defect found; the demotion is fully applied.
- **The interval of survival / horizon of survival.** Holt's names carried inline at
  `GLOSSARY.md`:58 and :63 as canonical aliases for zone and frontier, and in
  `THE-LENS.md`:174. Correct.
- **The Deficit Lemma and the Traverse Bound.** PROVEN at all four sites. The one
  apparent scope difference is not one: the home
  (`research/localized-04-maxsum.md` §7) writes "**Traverse Bound (PROVEN, given
  m̄ ≍ ln²x)**" while `research/G2-STATE.md`:748 says "PROVEN … kills the chain
  **unconditionally**". Both are right, because the same section states the input is
  Mertens — "It needs no sieve theory, no Fact A, no transfer operator, and **no
  measurement beyond Mertens**" — so m̄ ≍ ln²x is unconditional and the home is
  merely being explicit about its input. Also consistent at `LOCALIZED-GAP.md`:66-70,
  `G2-STATE.md`:334-339, `gate-multiplies.md`:71/85/106-118/248,
  `FOLD-PROFILE.md`:521, `localized-single-alignment.md`:163. No change needed.
- **The Zone Postulate, both forms.** Weak form ⟺ TPC, PROVEN both directions,
  elementary; strong form strictly stronger and unproven; VERIFIED for every prime to
  10¹¹. Checked at all 20 occurrence sites outside its home. Every one of them keeps
  the weak/strong distinction, and `G2-STATE.md`:755 even flags the weak-form
  biconditional as "PROVEN, lightweight … a device rather than a result", which is
  the treatment `PRIOR-ART.md` asks for and which C-3 shows Zone *Equivalence* does
  not get. `TODO.md`:21-30 restates the whole status correctly. This is the
  best-maintained object in the corpus.
- **The Variance Theorem and the sub-Poisson scaling law.** Correctly scoped
  everywhere: "at every **computed** level and window exponent"
  (`research/README.md`:63, `paper/variance-note.md`:187), the scaling law labelled
  "(empirical)" at its home heading (`paper/variance-note.md`:184), the 99.87%
  certified bound always attached to its level (P_97#), and the Var/E limit posed as
  open rather than asserted (`GLOSSARY.md`:257, `paper/PAPERS.md`:41). No inflation
  found. `paper/variance-note.md`:208 even retires an earlier "sub-Poisson ≈ 0.2
  constant" reading explicitly.
- **The seven dials.** `research/THE-DIALS.md` is internally consistent and its
  statuses match `ZONE-POSTULATE.md`, `exponent-control.md`, `sift-limit-attack.md`
  and `bv-import-survey.md` — with the single exception of dial 7, which is F-2.
- **Attacks A1-A10.** `research/ATTACKS3.md` landing verdicts match
  `gate-multiplies.md` §8's survivor table row for row (A4 CLOSED, A5 Theorems B/C
  "SURVIVES as a theorem, CLOSED as a supplier", A9 SURVIVES + PRIOR ART, A10 CLOSED
  by step 4's refutation), match `THE-DIALS.md` §1 on A7's pane ("closed twice"), and
  match `PRIOR-ART.md` on A9. No contradictions.
- **Lemma V's own statement.** "Needed, not proven" at `sift-limit-attack.md`:249 is
  correct and consistent; the defect A-1 is about which object is *the* open one, not
  about Lemma V's status.

## 8. Notes for other agents' axes (one line each)

- NUMBERS: `natal-cap-36-skeleton-door.md` carries five-level statistics (mean
  0.1082, spread 0.0314, R² 0.601/0.511/0.527) for a sequence its own script
  computes at six levels (0.1101, 0.0313, 0.44/0.26/0.33) — see F-1.
- NUMBERS: the sifting limit is written `4.2665` in most places and `4.26645` in
  `THE-DIALS.md`:37/81/188 and `ZONE-POSTULATE.md`:67 — pick one rounding.
- NUMBERS: `README.md`:28 writes the exponent `4.267` while `README.md`:39 writes
  `4.26645`; same file.
- DUPLICATION: the Origin Excess Lemma's three-hypothesis form and its 2.2 cap are
  stated in full at four separate sites (`maier-matrix.md` §4, same file reading 3,
  `origin-excess.md` §6 and §9, `ZONE-POSTULATE.md`:284-297) — correct everywhere,
  but four copies of one paragraph.
- DUPLICATION: the Holt attribution paragraph is repeated near-verbatim in
  `README.md`:61-69, `research/README.md`:145-148, `G2-STATE.md`:717-729,
  `THE-LENS.md`:174-175 and `paper/moire-primes.md`:825-830.
- ARCHITECTURE: `research/ATTACKS.md` (23 lines) and `ATTACKS2.md` (34 lines) are
  campaign verdict tables from 2026-08-13/14 whose objects have since been restated
  in `THE-DIALS.md`, `FOLD-PROFILE.md` and `origin-excess.md`; `ATTACKS2.md`:24 is
  the source of the "theorem-grade" inflation in B-1.
- ARCHITECTURE: `research/GLOSSARY.md` marks calibration inline for some entries
  (lines 41, 89, 288, 310, 320, 329) and not for others (154 Unification Law, 265
  Lemma V) — the two unmarked ones are exactly where A-1 and C-5 landed. A rule
  that every glossary entry carries a calibration word would have caught both.
- REFERENCES: `research/PRIOR-ART.md`:376-390 lists four references as "should be
  cited" (Erdős 1962, Clement 1949, Fan–Pomerance 2024, Weingartner 2026) and two
  comparisons as "available and has not been made"; none of the four appears in any
  paper file.

## Unresolved / needs a decision

1. **Is the Fused-Window Calm Lemma's leg (iii) certified at @29 or not — and does
   that change `paper/anchored-note.md`?** F-1 establishes the @29 certificate
   exists in `natal-cap-36-skeleton-door.js`. What I could not settle is whether
   `paper/anchored-note.md`:385-395, which states the G30_agg < 1/2 form, quotes a
   level count; if it says five, it needs the same fix as `natal-cap-30`. QUESTION:
   should the @29 row be written into the two markdown files on the strength of the
   script's embedded output alone, or should `--at29` be re-run first (18.5 min)?
   My reading of the house rule (code > output > readings, output pasted into the
   file) is that the embedded output IS the record and no re-run is needed, but this
   is a custody decision and it is yours.

2. **`natal-cap-21`'s "beyond-Chebyshev" scope: which levels exactly?** The home is
   marked `[verified]` rather than `PROVEN`, its own next-steps line says "Run @13's
   T₄ offline → first beyond-Chebyshev", and `TODO.md` says the @13 gate is met and
   @17 never started. So the bound holds at @11 and @13. QUESTION: is @11 actually
   included, or is @13 the first? I did not open
   `natal-cap-21-beyond-chebyshev.js`. B-3's fix text says "at @11 and @13" and
   should be confirmed before it is applied.

3. **Should Zone Equivalence be removed from "the proven spine" entirely?**
   `PRIOR-ART.md` says present it as a framing device, not a result. C-3 proposes
   annotating it in place. The stronger option is to drop it from the spine list and
   move it into the statement of the target in `ZONE-POSTULATE.md` §2, where it
   already lives as the weak-form equivalence. That is an editorial call about how
   much of the spine is allowed to be definitional, and it is yours.

4. **Where do the Natal Dispersion Lemma and the lineage identity belong?** D-1
   establishes they have no home. `FOLD-PROFILE.md` §9 is my recommendation. This
   overlaps the architecture agent's axis, so it needs one decision rather than two
   agents each picking a file.

5. **Correction to the brief, for the record.** Four items in the seed list do not
   exist as named objects in the working corpus and should not be searched for
   again: "Natal Dispersion Lemma" and "the lineage identity" exist only in
   `history/SESSION-2026-08-17.md` (D-1); "the natal creation engine" exists only as
   a CLOSED route in the same file plus one script comment; "head monotonicity" is
   real and PROVEN but unnamed at its home. Conversely the seed list omits two
   objects that carry defects: **the Origin Deficit Lemma** (21 occurrences, the
   second most-discussed lemma in the corpus, not audited in this pass for lack of
   time — flagged as the largest remaining gap in coverage) and **the Unification
   Law** (B-1, C-4, C-5). CORRECTION TO THAT CORRECTION, made after a second pass:
   the 21-occurrence object is the **Deficit Lemma** (with the Traverse Bound), not
   an "Origin Deficit Lemma"; it was audited and is consistent (§7). So the seed
   list's only substantive omission is the Unification Law.

---

## Coverage gap in this report, stated plainly

The register has ~45 named objects. This pass audited about 30 of them in full — the
13 defects are in §§1-6, the 12 clean ones in §7 — and found no defect in the
remaining big three (Zone Postulate, Variance Theorem, Deficit Lemma / Traverse
Bound), which were the highest-traffic objects left.

**Not audited, in descending order of how much I expect them to carry:** the
**Alternation / Inertness / Low-Band / Channel / Rigidity / Dilation / Discrepancy
Lemmas** (each 1-7 occurrences, mostly single-home so low contradiction risk), the
**Mirror-Sibling Identity**, the **Fusion Identity**, the **Minus-Half Theorem**, the
**Head Lemma** and **Impact Lemma** (both PROVEN + VERIFIED at `FOLD-PROFILE.md`
§§10-11, spot-checked but not traced to every site), the **five doors** of
`paper/moire-primes.md` §7, the **four faces** of §7A, and the whole of
`research/OBSERVATIONS.md` (688 lines, which carries a triage table with its own
status column at lines 636-639 that I sampled but did not audit).

A second pass should start with `paper/moire-primes.md` §§7 and 7A, because the five
doors and four faces are where every object's status gets restated for publication,
and a paper draft is the one place a scope error becomes a false claim rather than an
internal inconsistency.
