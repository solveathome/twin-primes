# Wave 5, partition S3: the script sweep, 57 files

<!-- ledger
id: Q-qc-scripts-S3
status: ANSWERED
todo: none
question: Do the 57 non-campaign research scripts' banners, embedded OUTPUT blocks and READINGS agree with each other and with the documents citing them?
verdict: Defects ranked by consequence, the leading one a3-02-diagonal-f.js carrying the refuted L scanner while naming as its source the sibling that had been repaired underneath it, the two state machines disagreeing at exactly one cell, L(T23, 29) = 3 against the true 2, now fixed; the partition ends with qc.js at 0 on all seven checks and audit-numbers.js 78/78.
-->

Every `research/*.js` that is not `natal-cap-*`, not `fold-profile-*`, not
`attack*`, and not the tooling (`qc.js`, `qc/*`, `gen-scripts-index.js`,
`audit-numbers.js`). Fifty-seven files, 17,200 lines. Each was opened; the
header banner, the pasted OUTPUT block and the READINGS block were read against
each other and against the documents citing the file.

**Gates at the end of the partition.** `node research/qc.js` 0 on all seven
checks (it has seven now, not six). `node research/qc/selftest.js` exits 0, 14
known positives firing, 5 controls silent. `node research/audit-numbers.js`
**78/78 in 151.1 s**.

**Compute spent, itemised.** `whatmadeit.js` 23.4 s. `a3-02-diagonal-f.js` deep
179 s + fast 35 s. `a3-05-bound-L.js` 72.5 s. `verify-ladder.js` and
`h2-length-needed.js` under a second each. One scratch comparison of two run
scanners over T23, 40 s. `audit-numbers.js` 151 s as a gate. Nothing else was
run and nothing was left running.

---

## Defects, ranked by consequence

### S3-1 (HIGH, script side, FIXED). `a3-02-diagonal-f.js` carried the refuted L scanner, and its own header pointed at the sibling that had been repaired underneath it

This is the `Lgrowth.js` shape in the second direction the brief asked to hunt.

`a3-02` line 84 read "longest adjacent-kill run (**verbatim logic of
research/Lgrowth.js**)" and the function under it was verbatim logic of what
`Lgrowth.js` held *before* 2026-08-16. `Lgrowth.js` and `killrun.js` were
corrected that day, `a3-08`, `a3-09`, `a3-10` and `a3-04` all recorded the
correction, and `a3-02` absorbed none of it while still naming `Lgrowth.js` as
its source.

Verified before touching anything, by running both state machines over the same
residue streams: they agree at T5@7, T7@11, T11@13, T13@17, T17@19, T19@23 and
over a p = 29..127 sweep of T23, and disagree at exactly one cell, **L(T23, 29)
= 3 against the true 2**, which is the known bug and no other.

Fixed: the scanner is now the corrected one, the file carries a dated
CORRECTION banner naming the retired 3, and both legs were re-run (`deep` 179 s,
`fast` 35 s) so the pasted OUTPUT is a real run rather than a hand edit. The
re-run reproduces the 2026-08-16 output line for line except at that cell and
the five quantities derived from it.

**What moved, and one of the moves matters.**

| quantity | was | is |
|---|---|---|
| L(T23, 29) | 3 | **2** |
| L/lnD at T23 | 0.189 | 0.126 |
| L/ln²x at T23 | 0.305 | 0.203 |
| regress L on lnD | slope 0.1341, **R² 0.904** | slope 0.1232, **R² 0.683** |
| regress L on (ln lnD)² | slope 0.3241, **R² 0.867** | slope 0.2915, **R² 0.627** |
| PHASE F, fold 29: maxsum_{L+1} | maxsum_4 = 348 | maxsum_3 = **300** |
| PHASE F, fold 29: G2 + L·m̄ | 288 | 260 |

The verdict does not flip: step 3's two-sided bound still HOLDS at every
checkable fold, and the fold-29 upper bound is now *tighter*, which is exactly
what `a3-10` reading 1 says from its own enumeration. What does change is the
strength of the evidence. **The two L regressions no longer separate the
branches**, 0.683 against 0.627 where they were 0.904 against 0.867, so reading
5's polylog call now rests on the ratio comparison and the mechanism and not on
any fit. Readings 1, 5, 6, 7 and 10 were rewritten to say so.

### S3-2 (HIGH, script side, FIXED). `a3-02` reading 5 said "falls monotonically" of a column that has never been monotone

Independent of S3-1 and older than it. Reading 5 said L/lnD "falls
monotonically" while the pasted column it was read off, in the 2026-08-16 run,
reads 0.408, 0.274, **0.200, 0.234**, 0.189, **0.208**, 0.177. It rises twice.
This is the `natal-cap-08` shape: a reading refuted by its own output a hundred
lines above it. Corrected, with the retired wording named.

### S3-3 (HIGH, document side, EVIDENCE ONLY). `U-FRAME.md` contradicts itself on the L diagonal, and the second copy is the retired value

Both sentences are in one file.

- `research/U-FRAME.md`:221, "The last column is **L, the longest adjacent-kill
  run**, whose diagonal is L = 2, 1, 2, 2, 2, 3, **2**, 4, 4 at folds 7 to 37."
  Correct, and §5's own table at line 216 prints **2** in bold at fold 29.
- `research/U-FRAME.md`:424, §5a step 7's seven-point table, row
  `| T₂₃ | 29 | 28.1 | 58 | 2.07 | 3.07e−2 | 3.48 | **3** |`. That 3 is the
  retired `killrun.js` value.

**The home is line 221 and §5's table**, which agree with `a3-08`, `a3-09`,
`a3-10`, `a3-04`, `a3-05`, `killrun.js`, `Lgrowth.js` and, since today,
`a3-02`. Nine artifacts against one table cell.

### S3-4 (HIGH, document side, EVIDENCE ONLY). `U-FRAME.md`:468 carries two errors in one sentence

> "L/ln²x is flat at **0.25 to 0.35** across all seven folds, while L/ln D
> **falls monotonically** from 0.41 to 0.18."

(a) With L(T23, 29) = 2 the band is **0.20 to 0.35**, not 0.25 to 0.35, since the
T₂₃ point is 0.203. (b) "falls monotonically" is false and was false before the
correction as well, for the reason in S3-2; with the correction the column is
0.408, 0.274, 0.200, 0.234, **0.126**, 0.208, 0.177, which falls by a factor
2.3 first to last and is not monotone anywhere. Same paragraph, line 469, also
inherits the collapsed regression R² if it is quoted.

Two smaller items in the same neighbourhood: `U-FRAME.md`:354's step-4 table row
`| 29 | 288 | 258 | holds |` becomes **260** (204 + 2·28.05), verdict unchanged;
and §5a step 7's "intercept 1.357" prints 1.358 on the re-run, which is print
precision and not a defect.

### S3-5 (HIGH, script side, FIXED). `h2-length-needed.js` carried seven wrong terms of A048670 and said they were copied from a file that has them right

The header said "Data: research/exponent-control.js lines 42-49, **unchanged**".
It was not unchanged. Terms n = 52..58 read **820, 838, 870, 884, 906, 924,
940** where A048670 has **810, 834, 858, 876, 908, 926, 954**. Terms 1..51 were
correct.

**Settled at the source rather than by majority**, because three files agreeing
is not three witnesses: `oeis.org/A048670`'s own DATA line was fetched and it
gives 810, 834, 858, 876, 908, 926, 954. `exponent-control.js`:46,
`maxgap-law.js`:63 and `audit-numbers.js`:543 all already held the right values;
this file was the only copy out of step.

Fixed, and re-run. The consequence is small and is recorded honestly in the new
OUTPUT block: sections (a), (b) and (d) all read the tail and all move in the
third decimal, **no verdict changes at any prefix length**, and the three prefix
readings the corpus quotes (1.191, 1.238, 1.282) sit in the clean part of the
ladder and did not move at all.

### S3-6 (MEDIUM, script side, FIXED). `a3-05-bound-L.js` printed the wrong census for T29, and its own progress line said so

Reading 1's slots column read **214,708,853** for the streamed T29 where
D(T29) = **214,708,725 = 3·∏_{7≤q≤29}(q−2)**. The same run's progress line
prints the correct 214,708,725 eleven lines above it. Cause found and fixed at
the source: `A.n` is a push counter and the 128-slot wrap replay was being
counted twice, so the column reported D + 128.

**This is where wave 4's P-finding came from.** P fixed 214,708,853 in
`a3-05-bound-L.md`'s custody sentence; the script that produced it was not
touched and would have reproduced the wrong number on the next run. Now it does
not. Re-run at 72.5 s and the whole output is otherwise identical.

### S3-7 (MEDIUM, script side, FIXED). `a3-05` described a repaired sibling in the present tense

Reading 1's column header read `Lgrowth.js` and its footer read
"research/Lgrowth.js **over-reports**, so the published diagonal **has** an
error". Both were true on 2026-08-16 and neither is true now. The refutation
itself is correct and stays: the file deliberately keeps a private copy of the
retired scanner so a reader can run the bug next to the thing that refutes it,
which is the right design. Only the labels changed: columns are now "retired
scan" and "retired U-FRAME", and the footer names the four repairs and their
dates. Nothing was stripped or softened.

### S3-8 (MEDIUM, script side, FIXED). `a3-03-f-from-census.js` quoted L ≈ 35.5 bare

Its reading 7 extrapolates to x = 1000 and gives "L ~ 35.5 against ln²x = 47.7".
`research/f-decays.md`, which is the home of that extrapolation, says in terms
that **the 35.5 must not be quoted bare** and puts the band at **30.8 to 42.9**.
This is the legitimate direction, a document carrying a later correction the
script had not absorbed, so the correction was added to the script rather than
the document being touched.

### S3-9 (MEDIUM, script side, FIXED). `two-class-lower-bounds.js` printed `1.2 x ln²x` as an asymptotic law

Its closing lines print "the law reads … i.e. about 1.2 x ln²x, against the Zone
Postulate threshold x²" with no scope. Two documents and one sibling script
restrict it: `two-class-lower-bounds.md`:466 says prefer the Poisson form
because the shorthand replaces (θ(x) − ln m) by its asymptotic and a
finite-range fit gives 0.8 rather than 1.2; :594 grades it "a description of
x ≤ 41, not an asymptotic"; and `maxgap-law.js` §8 item 2 says the same form
carried to 1e50 is 3× too small. The script now prints both caveats and the
one-step-past-the-data figure, G2(41#) in 476 to 633, central 513.

### S3-10 (LOW, script side, FIXED). Two files carried an empty "appended after run" placeholder

`verify-ladder.js` ended with "OUTPUT + READING: appended after run" and
`whatmadeit.js` had no output block at all, though `a3-01` cites it as the
custody source it "reproduces column for column". Both were run and both blocks
were filled from the actual runs, with readings. `whatmadeit.js` also gains the
sibling-agreement note, since running it is what verified `a3-01`'s claim.

---

## Two campaign items settled

### `level-ledger-tight.md` §1's seven looseness ratios against a home that has eight: RESOLVED, at zero compute

The open item said "resolve when the script is next run". It does not need a
run. `level-ledger-tight.js`'s Ladder A has **seven** rows, x = 5 to 23,
because Part 0 materialises tiles only to T23. The home,
`discrepancy-two-class.md` §5, has **eight**, and the eighth is **x = 29, ratio
801**, from the bound 2·3⁹ = 3.937e4 against a measured two-class sup of
49.1520. That row is streamed, not materialised, and it belongs to
`research/discrepancy-two-class.js`, which prints it in its own D3 table.

**Nothing is missing.** The two ladders have different reaches by construction
and 801 was never `level-ledger-tight.js`'s to produce. A scope note saying so
is now in the script's reading 1 so the question does not reopen.

### `exponent-control.md` §1's prefix readings 1.191 / 1.238 / 1.282: RESOLVED, and it is a starting-prime convention, as suspected

`h2-length-needed.js` reproduces all three and **prints its own p-range**: the
ten-term prefix is [5, 37] and the nineteen-term one is [5, 73]. The fits drop
p = 2 and p = 3 and start at the third prime. `exponent-control.js`'s own code
confirms it independently: the pilot line is `fit2(H,P,2,11)` and `fit2(H,P,2,57)`,
index 2 being p = 5.

Refitting the identical estimator from p = 2 was done here rather than taken on
report, and returns **1.176, 1.198, 1.258**. Partition Q reported 1.176, 1.198,
1.262; the first two match and the third is 1.258 on this computation.

**And there is a second half of the convention worth recording**, because it
will otherwise be rediscovered as a disagreement: `exponent-control.js` uses the
p = 5 start for its nested and pilot fits but the **p = 2** start for its
sliding-window distribution, 49 windows at width 10. `h2-length-needed.js`
slides over the p ≥ 5 frame, 47 windows. That is the whole of the ~0.004 offset
between the two files' bias columns. Both are internally right. This is now in
`h2-length-needed.js`'s reading 1.

---

## Sibling agreement, collected

Nobody had gathered this. Where two files in the set compute the same object,
they were checked against each other. **Twelve independent agreements, one
disagreement, and the disagreement is S3-1.**

| object | files | verdict |
|---|---|---|
| the fold table: new G₂, kills, merged sub-gaps, 7 folds | `whatmadeit.js` ↔ `a3-01` table A | **AGREE**, column for column. Verified by running `whatmadeit.js` (23.4 s), which also confirms a3-01's own "4s against whatmadeit's 23s" claim |
| the corrected L diagonal 2, 1, 2, 2, 2, 3, 2, 4, 4 | `killrun` ↔ `Lgrowth` ↔ `a3-04` ↔ `a3-05` ↔ `a3-08` ↔ `a3-09` ↔ `a3-10` ↔ `a3-02` | **8 of 8 AGREE after today.** Before today it was 7 of 8: `a3-02` was the holdout (S3-1) |
| maxsum_m(T₁₁..T₂₉), m = 1..8 | `a3-02` reading 8 ↔ `a3-04` reading 1 ↔ `gate-multiplies-03` | **AGREE** digit for digit. All three give maxsum_5(T₂₉) = 510 and G₂(T₂₉) = 258, which is what makes gate-multiplies-03's "BUSTS at fold 31" verdict (1.9767 against a needed 1.376) reproducible |
| the seven-point f diagonal, 4.44e−2 … 1.84e−2 | `a3-02` ↔ `a3-08` reading 11 | **AGREE** to printed precision |
| f at T₂₉@31 and T₃₁@37 | `a3-02` (tile stream) ↔ `a3-03` (census law, no tile) | **AGREE** to four figures, 3.737e−2/3.7367e−2 and 1.844e−2/1.8445e−2. Two methods with nothing in common |
| m̄/ln²x per level | `a3-02` reading 5 ↔ `a3-09` reading 8 | **AGREE** where they overlap (3.70 at p = 7, 2.85 at p = 23); the two index by tile and by fold respectively, which is the only reason the printed lists differ |
| the G₂ ladder 12, 30, 42, 66, 108, 150, 204, 258 | `05` ↔ `05b` ↔ `grain-census` ↔ `a3-06` ↔ `a3-04` | **AGREE** |
| the census ladder, incl. D(T₂₉) = 214,708,725, D(T₃₁) = 6,226,553,025, D(T₃₇) = 217,929,355,875 | `verify-ladder` ↔ `verify-ladder-big` ↔ `05b` ↔ `a3-06` ↔ `a3-02` ↔ `a3-05` | **AGREE after S3-6.** `a3-05` was the one out of step |
| the 53.96 / 81.04 transfer gain | `level-ledger-tight.js` reading 6 ↔ `level-ledger-tight.md` ↔ `FOLD-PROFILE.md`:64 | **AGREE.** 2·3⁶/27.019392 = 53.96 (y = 17 seed), 2·3⁷/53.972817 = 81.04 (y = 19). Wave 4's fix is consistent on both sides |
| the two-class looseness ladder, 25.7 … 479.5 (+801) | `level-ledger-tight.js` Part 0b ↔ `discrepancy-two-class.js` D3 | **AGREE** on all seven shared rows; the eighth is scope, see above |
| h2's x-frame slope on [5, 73] and the 47-AIC gap | `exponent-control.js` readings 5, 13 ↔ `h2-length-needed.js` (c), (b) | **AGREE**: 1.847 ± 0.035 both, ΔAIC 46.9 against "47". The two files' absolute AIC differs by exactly 2.0 because they count parameters differently; the difference, which is what is quoted, is identical |
| A048670, 58 terms | `exponent-control` ↔ `maxgap-law` ↔ `audit-numbers` ↔ `h2-length-needed` | **AGREE after S3-5**, and checked against OEIS rather than against each other |
| M(307, 307³) = 870, m̄ = 79.33 | `localized-01` ↔ `localized-04` reading 1 | **AGREE**, different sieves |
| e^{2γ}/4 = 0.79305 as the dimension-2 constant | `01` reading 2 ↔ `a3-07` reading 3(a) ↔ `natal5-variance` reading 5 ↔ `origin-excess` F3 ↔ `a3-06` reading 11 | **AGREE**. Five files, one constant, reached from five directions |

---

## Null results, which are results

- **The absence sweep found nothing false in my set.** Every "not run", "never
  started", "does not exist", "nobody has tried" and "has not been fixed" in the
  non-history `*.md` corpus was listed (87 hits) and each was checked against
  the script directory. The pattern's known positives are `README.md`:100
  ("@17 is not run") and `TODO.md`:227 ("the @17 rerun, which never started"),
  both of which it caught, and it also caught wave 4's own quoted sentences in
  the campaign file verbatim, so a zero from it means something. Every hit that
  touches my set is TRUE: TODO 0c's "nobody has tried bounding the
  residue-deleted maxsum directly" holds, because the eight scripts that compute
  maxsum all route through a kill count (κ(m) in `a3-04`, L in `a3-05`) and
  none bounds maxsum_m(T_x) as a function of x. `gate-multiplies.md`:464 and
  `U-FRAME.md`:270, 608 are the same claim and are likewise true. The rest of
  the hits are about `natal-cap-*` (not my set) or about the literature.
- **`a3-07` reading 2's "CORRECTION OF RECORD: 5·C₂ = 3.301, not 4.95" has
  landed.** No live document carries 4.95 as the corridor constant. Pattern
  checked against a known positive, `CHANGELOG.md`:1563, which records the
  correction and is found.
- **`maxgap-law.js` §8's refutation of `FOLD-PROFILE.md` §12 has landed.**
  FOLD-PROFILE now reads `M(x, x′²) ~ 3.5·ln³x`, not `1.2·x·ln x`, and
  `maxgap-law.md`:493's copy of the old wording is inside its own refutation
  block, which is correct.
- **`sift-limit-lemmaV.js`'s prohibition is live and respected.** Its
  `elementaryVariance` carries a dated "DO NOT TRUST … must not be quoted"
  banner over the S6 columns. No live document quotes "sieve/elem" or
  "elementary needs H > …"; the only hits are in `history/MORNING-2026-08-16.md`,
  which is the record of the refutation. Known positive: that same file.
- **`localized-04` reading 7's correction to `LOCALIZED-GAP.md` §4 has landed**
  (13933, not 1453).
- **The G₂(41#) band is consistent everywhere it appears**: 476 to 633, central
  513, in `two-class-lower-bounds.md`, `G2-STATE.md` and `maxgap-law.js`. No
  475 and no 487 survives in a live document.

---

## The ledger, one row per file

Verdicts: **CLEAN** nothing found; **FIXED** a defect in this file, repaired
here; **EVIDENCE** a defect found here that lives in a document I may not edit;
**NO-BLOCK** the file legitimately carries no pasted output or readings, its
results living in its companion `.md`.

| # | file | OUT | READ | verdict |
|---|---|---|---|---|
| 1 | `01-zone-twin-share.js` | y | y | CLEAN. Reading 2's e^{2γ}/4 ≈ 0.793 agrees with four siblings |
| 2 | `02-first-twin-margin.js` | y | y | CLEAN |
| 3 | `03-legendre-error-budget.js` | y | y | CLEAN |
| 4 | `04-crystallization-and-hl.js` | y | y | CLEAN. 8/8 crystallisation checks, readings match output |
| 5 | `05-twin-jacobsthal.js` | y | y | CLEAN. G₂ ladder agrees with grain-census and a3-06 |
| 6 | `05b-twin-jacobsthal-segmented.js` | y | y | CLEAN, with one stale forward pointer noted below the table |
| 7 | `06-variance-theorem.js` | y | y | CLEAN. "at least 99.87%" checks out against the printed 1.26e−3 |
| 8 | `a3-01-misalignment-ledger.js` | y | y | CLEAN, and its custody claim is now verified by running the sibling |
| 9 | `a3-02-diagonal-f.js` | y | y | **FIXED**, S3-1 and S3-2. Scanner corrected, both legs re-run, five readings rewritten |
| 10 | `a3-03-f-from-census.js` | y | y | **FIXED**, S3-8 |
| 11 | `a3-04-maxsum-recursion.js` | y | y | CLEAN. Reading 11 already carries the L correction; readings 4, 5, 7 all use L = 2 at fold 29 |
| 12 | `a3-05-bound-L.js` | y | y | **FIXED**, S3-6 and S3-7. Re-run at 72.5 s, output otherwise identical |
| 13 | `a3-06-origin-vs-max.js` | y | y | CLEAN. Readings 8's "climbs"/"falls" are trend statements over non-monotone printed columns; loose wording, not a false claim, so left alone |
| 14 | `a3-07-pane-overlap.js` | y | y | CLEAN. Its CORRECTION OF RECORD (3.301) has landed downstream |
| 15 | `a3-08-adjacent-pairs.js` | y | y | CLEAN, and it is the strongest file in the set: three independent enumerations at every fold |
| 16 | `a3-09-histogram-operator.js` | y | y | CLEAN. Reading 10's refutation is correct and stays visible |
| 17 | `a3-10-lower-tightness.js` | y | y | CLEAN. Reading 1's maxsum_3 = 300 replacement is what a3-02 now agrees with |
| 18 | `birth-cohorts.js` | y | n | CLEAN. Cohort table sums exactly to D(T31) = 6,226,553,025 |
| 19 | `discrepancy-two-class.js` | y | y | CLEAN. Holds the eighth looseness ratio, 801 at x = 29 |
| 20 | `exponent-control.js` | y | y | CLEAN. Its A048670 copy is the correct one; its two starting-prime conventions are now documented in the sibling |
| 21 | `fossil-shadows.js` | y | y | CLEAN |
| 22 | `gate-multiplies-01.js` | n | n | NO-BLOCK. Output lives in `gate-multiplies.md` |
| 23 | `gate-multiplies-02.js` | n | n | NO-BLOCK, same |
| 24 | `gate-multiplies-03.js` | n | n | NO-BLOCK. `gate-multiplies.md`:427 carries its pasted verdict and it agrees with a3-02 and a3-04 on maxsum_5(T₂₉) = 510 |
| 25 | `gen-natal5-17tile-scour.js` | n | y | CLEAN. Writes its report to `natal5-17tile-scour.txt` |
| 26 | `genealogy.js` | y | n | CLEAN |
| 27 | `grain-census.js` | y | y | CLEAN. Reading 2's single absent size at T₂₃, 144, is what a3-08 reading 8 uses |
| 28 | `h2-length-needed.js` | y | y | **FIXED**, S3-5. Data corrected against OEIS, re-run, OUTPUT and READINGS blocks added |
| 29 | `h2-lower-ladder.js` | n | n | NO-BLOCK. Home is `h2-scoping.md` |
| 30 | `h2-prototype.js` | n | n | NO-BLOCK, same. Verifies every witness before accepting a bound |
| 31 | `h2-randomised.js` | n | n | NO-BLOCK, same |
| 32 | `killrun.js` | n | n | CLEAN. Its REFUTED banner is current and correct; keep |
| 33 | `level-ledger-tight.js` | y | y | **FIXED** (scope note). The eight-versus-seven question is settled at zero compute |
| 34 | `Lgrowth.js` | n | n | CLEAN. Its REFUTED banner is current; the sweep it prints is regenerated on each run so nothing stale is pasted |
| 35 | `localized-01-ladder.js` | n | n | NO-BLOCK. Home is `LOCALIZED-GAP.md`; localized-04 reproduces it |
| 36 | `localized-02-fixed-window.js` | n | n | NO-BLOCK |
| 37 | `localized-03-merge-lemma.js` | n | n | NO-BLOCK. Prior art correctly attributed to Holt and Rudd 2014 |
| 38 | `localized-04-maxsum.js` | y | y | CLEAN. Reading 7's correction to LOCALIZED-GAP §4 has landed |
| 39 | `localized-single-alignment.js` | n | y | CLEAN. Pre-registered rules, honest "no rule fires cleanly" verdict |
| 40 | `lucky-control.js` | n | n | NO-BLOCK. A control, self-describing |
| 41 | `maier-matrix.js` | n | n | NO-BLOCK. Home is `maier-matrix.md` |
| 42 | `maxgap-law.js` | n | n | NO-BLOCK, home `maxgap-law.md`. Its seven-item prohibition list is live and correct; two of its targets are checked above and both have landed |
| 43 | `natal5-variance.js` | y | y | CLEAN. Formula matched to brute force over all 30,030 rotations |
| 44 | `origin-excess.js` | n | n | NO-BLOCK. Home is `origin-excess.md` |
| 45 | `removal-ledger.js` | y | y | CLEAN. Survivors 456 = the real twin pairs below the width, checked in the same run |
| 46 | `scour-into-fixed-tile.js` | y | n | CLEAN |
| 47 | `sift-limit-attack.js` | y | y | CLEAN |
| 48 | `sift-limit-lemmaV.js` | y | y | CLEAN. Its "DO NOT TRUST" banner is live, correct, and respected downstream. Keep |
| 49 | `square-window.js` | n | n | NO-BLOCK. Home is `window-exceptions` / the pane notes |
| 50 | `theta-ladder-row.js` | n | n | NO-BLOCK. A driver for `sift-limit-lemmaV.js`'s exported `row()`; reimplements nothing |
| 51 | `theta-ladder-sup.js` | n | n | NO-BLOCK. Carries its own custody requirement in the header |
| 52 | `two-class-lower-bounds.js` | n | n | **FIXED**, S3-9 |
| 53 | `verify-ladder.js` | y | y | **FIXED**, S3-10. Placeholder filled from a real run |
| 54 | `verify-ladder-big.js` | y | y | CLEAN. T₃₇ census 217,929,355,875, matching Chris's 2024 hand derivation |
| 55 | `whatmadeit.js` | y | y | **FIXED**, S3-10. Output and readings added from the 23.4 s run |
| 56 | `window-check.js` | n | n | NO-BLOCK |
| 57 | `window-exceptions.js` | n | n | NO-BLOCK |

**One stale forward pointer, LOW, not fixed and worth a decision.**
`05b-twin-jacobsthal-segmented.js`'s reading closes "Next level (31#, 2.0e11)
needs ~30x this runtime or a faster language, **the natural next push**."
G₂(31#) = 348 and G₂(37#) = 528 have both been computed since, by
`a3-02`, `a3-10`, `a3-01` and `audit-numbers.js`. The sentence is a stale
next-step rather than a wrong number and the file is a 2026-08-13 artifact, so
it was left alone rather than edited into a different file's territory. Flagging
it because it is the same *shape* as the finding that started this partition.

---

## What was not reached

- **`gate-multiplies-01.js` and `-02.js` were read but not run.** Their outputs
  live in `gate-multiplies.md` and I did not re-derive them. `-03.js` was
  checked against the document's pasted verdict and against two siblings
  instead, which is cheaper and independent. NEEDS COMPUTE if anyone wants the
  Overshoot Budget's 0.88 to 1.19 nat range re-derived: `-02` folds to 29 with
  a κ(m) scan and is the expensive one.
- **`h2-prototype.js`, `h2-lower-ladder.js`, `h2-randomised.js` were not run.**
  The prototype is an exact ω₂ solver whose cost is the whole point of
  `h2-scoping.md`; re-running it is a multi-hour job with no question attached.
- **`maier-matrix.js` and `origin-excess.js` were not run.** Both are large and
  both have companion documents holding their output. Their headers, section
  structure and claims were read and nothing in them contradicted a sibling, but
  I did not verify their tables against `maier-matrix.md` and
  `origin-excess.md` line by line. That is the largest unchecked surface I am
  leaving, roughly 860 lines of script against two documents.
- **`localized-01/02/03` were not run**, so `localized-04`'s custody claim
  (M = 870 at x = 307) is verified only in the direction of localized-04's own
  pasted output, not by an independent run of localized-01.
- **`sift-limit-lemmaV.js` and `theta-ladder-*` were not run.** The lemma-V file
  is 491 lines with an O(N²) leg and the theta ladder drives it; the campaign
  has no open question there and the one live defect in the file is already
  banner-flagged.
- **I did not audit `a3-06`'s S4/S5 tables against `ZONE-POSTULATE.md`**, only
  its readings against its own output. Reading 7 is an explicit calibration fix
  addressed to that document and I did not confirm the document absorbed it.
- **The seventh `qc.js` check, `absence`, was added by another partition while I
  was working.** Its `ADJUDICATED` entry for TODO 0c reaches the same verdict I
  reached independently, which is a small piece of corroboration but was not
  coordinated.
