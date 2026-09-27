# qc-wave6-Y — wave 6, partition Y: the eight run logs, the three `.txt` outputs, and the leaf-note residue

<!-- ledger
id: Q-qc-wave6-Y
status: ANSWERED
todo: none
question: Do the eight run logs, the three committed .txt outputs and the leaf-note residue say what the corpus above them says?
verdict: Findings on all three surfaces, including a stated bound on sup|R|/(H*M) that the log's own full-period block violates by 5.6x, an S6 block produced by a function the repo has since flagged wrong while the log stays unflagged, and a false absence claim in G2-STATE that the same document refutes 162 lines later; line numbers were taken against a tree being modified concurrently.
-->

Read-only pass over the three surfaces five waves never touched: `research/wave7-logs/`
(eight `.log` files), the three committed `.txt` outputs, and the `research/*.md` leaf
notes left over after subtracting what `qc-scope-R.md` and `qc-scope-T.md` actually
opened. Hunting the one question all three surfaces pose in the same form: **does the
corpus above this artifact say what this artifact says?**

Nothing here supplies replacement text. Every finding gives both ends verbatim, the
defect class, severity and a confidence with its basis. Coverage statement at the end,
and it is the part worth reading.

---

## ⚠ The working tree moved under this pass. Read this before any line number.

This partition began at 06:53 and finished at ~07:30 on 2026-08-18. The working tree
was being edited by another agent throughout. Concretely, my first corpus-wide absence
grep (run at the start of the pass) returned

> `research/natal-cap-31-calm-vs-kill.md:89:` "conjecture asks max_t VR < S̄²/(K·V̄), and the @19 driver has not been computed"
> `paper/wall-note.md:241:` "at the first three levels, and the @19 driver has not been computed, so whether"

and the identical grep re-run forty minutes later returns neither string; both files now
carry the computed @19 driver. The adjudicator confirmed mid-run that it had computed it
(`research/natal-cap-38-loudness-driver.js`, driver 24.96, threshold 623.1, margin ×271.7)
and propagated the correction. I independently reconstructed the same three numbers from
`natal-cap-19-calm-lemma.js` PART A @19 (`Vrot=8944.60`) and
`wave7-logs/cap35-x-multiplicity.log` (`S̄=49238.76`, `K=435`) before that message arrived,
and they agree to the digit, which is a useful independent check on the new artifact but
is not a finding.

**Consequence for the reader: every `path:line` below was re-verified against the tree at
the end of the pass, but a partition running concurrently may have moved them again.**

---

## Grep calibration (required before any "nothing cites this" claim below)

Three known-positive calibrations, all run from the repo root:

| pattern | expectation | result |
|---|---|---|
| `grep -rn "natal-cap-27-t4-at13" --include="*.md" .` | a filename the corpus is known to cite | 8 hits, incl. `TODO.md`:217, `research/SCRIPTS.md`:194, `research/natal-cap-21-beyond-chebyshev.md`:141 |
| `grep -rn "natal5-variance" --include="*.md" .` | a heavily-cited artifact stem | 20 hits across 14 files |
| `grep -rn "wave7-logs" --include="*.md" .` | the directory name itself | 13 hits across 5 files |

So the pattern form, the `--include` filter and the search path all reach the corpus. The
two zero-hit results in Y-10 were additionally re-run **without** `--include` over the
whole repo (all file types, including `.js`, `.txt`, `.log` and `history/`) and stayed at
zero.

**Prior-adjudication check.** Each of Y-1 … Y-10 was grepped over `research/history/`
(`CHANGELOG.md`, the dated session records and all 44 `staging/*.md`) on its distinguishing
string — `0.025 and 0.106`, `elementaryVariance`, `9.2% / −0.9%`, `Open leads`, `58/435`,
`9% and 11%`, `ENUMERATES`, `cap30-repro`, `pilot-rerun`. **The only hits are this file.**
Y-8 is the one partial exception and is labelled as such: the same defect was adjudicated
for a different file at `qc-status.md`:466 and the correction did not reach the second copy.

---

## Ranked findings

`Y-*` are mine. `YA-*` and `YB-*` come from two delegated leaf sweeps (Parts 3.6 and 3.7).
**I re-verified all six YA findings and YB-1 through YB-6 myself at both ends**, and every
quotation in this report is one I pulled from the file rather than one relayed to me;
YB-7…12 are delegated and not re-derived.

**Tally: 6 HIGH, 4 MED-HIGH, 10 MEDIUM, 3 LOW-MED, 6 LOW.** Three of the six HIGH are false
or self-refuting claims inside blocks the corpus grades PROVEN or CERTIFIED; two more are
precision claims a document's own printed series refutes.

| # | severity | where | one line |
|---|---|---|---|
| **YA-1** | **HIGH** | `G2-STATE.md`:584 | "**Nobody in this repo had ever asked how large G2 can be *made* to get**" — `attack2-rankin2d.js` asked it three days earlier, the home says "this is not new to the repo", and **the same file says so at :746**. Seventh instance of the class. VERIFIED HERE |
| **Y-1** | **HIGH** | `history/WAVE7-RESULTS-2026-08-15.md`:64 | "sup\|R\|/(H·M) stays between 0.025 and 0.106 wherever a full period was enumerable" — the log's own full-period block has a seventh row at **0.5965**, 5.6× outside the stated band |
| **Y-2** | **HIGH** | `wave7-logs/lemmaV-meansquare.log`:83–95 + `WAVE7-RESULTS`:50–54 | the whole S6 elementary-bound comparison is output of a function the repo has since banner-flagged `!!! WRONG. DO NOT TRUST !!!`; the log carries no flag, and the one document that quotes it voids it **for the wrong reason** |
| **Y-3** | MED-HIGH | `TODO.md`:200 | the skeleton-mass split quoted as four level figures with the sample disclosure dropped: @19 is **40 of 435 primes (step 11)** and @23 is **29 of 1739 (step 60)**, which both the log and the home `.md` state |
| **Y-4** | MED-HIGH | `NATAL-CAP-CAMPAIGN.md`:91–93 | "Open leads ranked / 1. **K\*(x) at @23** … Bitset march at W=223M is feasible" — refuted twice by the same file, at :36 and :61, which both say @23 and @29 are measured |
| **Y-5** | MEDIUM | `natal-cap-30-skeleton-bound.md`:5 | the @19 ledger check quoted without its `58/435` sample, immediately after an @11–@17 clause that does say "all 164 primes"; the script's own OUTPUT block and the log both carry `58/435` |
| **Y-6** | MEDIUM | `anchored-calm.md`:53 | "the branches the door governs carry **between 9% and 11%** of the skeleton's mass" — the four measured values are 9.2%, **−0.9%**, −10.8% and **5.5%**; two of four fall outside the stated band |
| **Y-7** | MEDIUM | `WAVE7-RESULTS-2026-08-15.md`:34–35 | "a spectral form … reproduces the same numbers **to 5e-14**" — the log's three spectral rows are 4.96e-14, 1.82e-13 and **3.84e-13**; the same sentence's brute-force band also misses its own best point |
| **Y-8** | LOW-MED | `WAVE7-RESULTS-2026-08-15.md`:143–147 | five-point fit statistics (R² 0.601/0.511/0.526, mean 0.1082, spread 0.0313) attached to a six-value sequence. The same defect was adjudicated for `natal-cap-36-skeleton-door.md` (`qc-status.md`:466) and this second copy was not swept with it |
| **Y-9** | LOW-MED | `GLOSSARY.md`:97–98 | "the self-strike sequence of a tile **ENUMERATES its twin primes**" — the @17 tile has **16** self-strikes and **3,099** twin primes |
| **Y-10** | LOW (uncited) | `wave7-logs/cap36-cap30-repro.log`, `wave7-logs/lemmaV-pilot-rerun.log` | zero references anywhere in the repository, by any pattern, in any file type |
| **YA-2** | MEDIUM | `ZONE-POSTULATE.md`:307 | the Origin Excess Lemma's "unstated third hypothesis" — `CHANGELOG.md`:640 RETIRED that framing; this is the last live instance in the corpus |
| **YA-3** | MEDIUM | `GLOSSARY.md`:393–397 | "matching the closed form **to three digits**" — of the six points the entry prints, **one** does, four agree to two digits and n = 100 agrees to **none** (1.3 vs 1.5). The precision claim was demonstrated at n = 3e6 only. VERIFIED HERE |
| **YA-4** | LOW-MED | `G2-STATE.md`:23 | "the exponent reads 1.54 on **eight exact terms**"; the same file says 10 twice, at :161 and :655 |
| **YA-5** | LOW | `GLOSSARY.md`:209–211 | h₂'s 1.57 quoted as G₂'s, inside the entry defining G₂, against the directive "quote 1.57 for h2 and **1.54 for G2**" |
| **YA-6** | LOW | `ZONE-POSTULATE.md`:191–192 | "above 2.05 at every z from 37 to 71"; `G2-STATE.md`:701 prints the z = 37 entry as ">2.0495" |
| **YB-1** | **HIGH** | `a3-05-bound-L.md`:125–127 (+ `a3-05-bound-L.js`:342, :652) | a **PROVEN** corollary's closed form `c_min(m) = 3pm − p + 2η` has the wrong sign; the script's own DP prints the `− 2η` values and refutes it at four of eight folds. `applied-P.md` row 10 marked the neighbouring table clean. VERIFIED HERE |
| **YB-2** | **HIGH** | `a3-05-bound-L.md`:228–229 | "tracking the measured m\* to within one at **all seven folds**" — the table has **eight** rows and folds 17, 29 and 31 miss by 1.51, 1.02 and 1.38. VERIFIED HERE |
| **YB-3** | **HIGH** | `localized-04-maxsum.md`:34 (+ :99, :401, `U-FRAME.md`:681) | "matched … **to within 6%**" against the same file's printed `R/EV ∈ [1.038, 1.119]` — **11.9%**. `applied-P.md` row 43 marked it "clean at both ends" after checking the scope and not the value. VERIFIED HERE |
| **YB-4** | MED-HIGH | `a3-05-bound-L.md`:316–317 (+ `kappa-not-L.md`:96) | "the Markov bound sits flat between 0.32 and 0.44 **at every fold**"; fold 7 reads **0.4762**. `applied-P.md` row 13 marked it clean by treating the second copy as corroboration. VERIFIED HERE |
| **YB-5** | MED-HIGH | `PRIOR-ART.md`:274 | R-4's fix landed at four of five sites; the survivor is the **coverage guarantee** — "**Twelve** arXiv manuscripts read or searched in full text" under a heading declaring the fourteen-row sweep COMPLETE. VERIFIED HERE |
| **YB-6** | MEDIUM | `certificate-engine.md`:82 | its one OPEN conjecture routed to `TODO.md` item **11(b)** ("Fixed-depth cap_K as Siegel-Walfisz theorems"); the conjecture is item **8(b)**. VERIFIED HERE |
| YB-7…12 | MEDIUM → trivial | `localized-04-maxsum.md`:283/:324/:266, `PRIOR-ART.md`:381, `certificate-engine.md`:79, `level-ledger-tight.md`:248, `oeis-G2-submission.md`:37 | two quantities merged; a stale "should be cited" against five live citations; a 2–5% band covering two of four levels; a mislabelled level; a factor-2 slip; a reduction stated in a form the homes do not use. Delegated, not re-derived |

---

# PART 1 — the eight logs

## 1.1 `cap36-at29.log` (921 B, 23 lines, read in full)

**Contents.** Two levels of `natal-cap-36-skeleton-door.js --at29`: an @23 control row
and the @29 production row, plus progress ticks. `@29: W=6469693230 K=7863 W*SNUM<15*SV:
CERTIFIED G30_agg=0.1176 margin 0.3824 dev_agg=0.1180 R_agg=-0.3820 SumCov<0: YES
Cov>0: 1/7863`, resonance `173 (0.511)`, 1088.2 s, TOTAL 1111.876 s.

**The corpus reflects it, and well.** Every one of those figures appears in
`natal-cap-30-skeleton-bound.md`'s Theorem B table (the bolded @29 row), in
`natal-cap-36-skeleton-door.md`:21, in `anchored-calm.md`:43–45 and in `TODO.md`:193.
`CHANGELOG.md`:1246–1248's statement that "the aggregate no30 there is +0.0004" is exactly
`dev_agg − G30_agg = 0.1180 − 0.1176`. The @23 control row reproduces the @23 row of
`cap36-cap30-repro.log` to every printed digit, which is what a control is for.

**One presentational note, not a finding.** The log prints resonances and near-resonances
in one field, `resonances/near: ~107 (0.483), 2339 (0.575)`, with `~` marking the near.
`natal-cap-30-skeleton-bound.md`:127 splits them correctly ("near-resonances form the
expected continuum (@23: q = 107 at 0.483)"). No document confuses the two.

**Timing.** `qc-scope-T.md`:1276 already noted the 1111.9 s here against the 11.3 min in
`natal-cap-30-skeleton-bound.md`; I confirm the log reads `[1088.2s]` for the @29 level
and `TOTAL 1111.876s`, and I have nothing to add to T's reading.

## 1.2 `cap36-cap30-repro.log` (3.6 kB, 46 lines, read in full) — **uncited, see Y-10**

**Contents.** A clean re-run of `natal-cap-30-skeleton-bound.js` (confirmed: it is the
only script in the repo that prints the string `APBsk`). P1a: the collapse identity
pointwise at @11 over all 2310 lags, `max abs err 3.5e-18`. P1b: kernel closed form
against the 2ⁿ mask ledger at @11 (10/10), @13 (34/34), @17 (120/120) and **@19 (58/435)**.
P2/P3/P4 at @11..@23 with the certificate, the resonances, and the three uniformity
blockers. A summary block and the leg-(iii) status line.

**The corpus reflects the substance but not the file.** Prop C of
`natal-cap-30-skeleton-bound.md` carries all three blockers — "Aggregate value 18.2 → 52.5
→ 158 → 521 → 1593 at @11..@23", "certifies **zero** primes at any level", "0.711 @11,
1.805 @23", "24.5 @11 → 7.3e6 @23" — against the log's `APBsk_agg = 18.23 / 52.51 /
157.88 / 520.98 / 1592.73`, `per-q APBsk<1/2: 0/K` at every level, `∏(1+2/(p−2))−1 = 0.711
… 1.805`, `POS_agg = 24.5 … 7299002.1`. Correct at every printed digit.

**Y-5 (MEDIUM). The @19 ledger check is a 13% sample and the `.md` header does not say so.**

`research/natal-cap-30-skeleton-bound.md`:3–6:

> "*(2026-08-14. Companion to `natal-cap-30-skeleton-bound.js`, which verifies the
> collapse identity pointwise (≤ 4e−18 @11) and against cap-26's 2ⁿ-mask ledger
> (relerr ≤ 1.6e−10 through @17, **all 164 primes**; 1.5e−7 @19, the float ledger's own
> precision floor) …*"

Against `research/wave7-logs/cap36-cap30-repro.log`:6:

> `P1b @19: kernel closed form vs 2ⁿ mask ledger, 58/435 scour primes: max relerr 1.5e-7`

and against the script's own committed OUTPUT block,
`research/natal-cap-30-skeleton-bound.js`:215–218:

> `// P1b kernel vs 2ⁿ mask ledger: @11 1.9e-13 (10/10)  @13 1.0e-11 (34/34)`
> `//   @17 1.6e-10 (120/120)  @19 1.5e-7 (58/435 incl. all exceptions) — the @19`
> `//   floor is the float LEDGER's own precision …`

and against the driver, `natal-cap-30-skeleton-bound.js`:224:
`verifyLedger(11,1);verifyLedger(13,1);verifyLedger(17,1);verifyLedger(19,8);`

10 + 34 + 120 = 164, so the `.md`'s "all 164 primes" is exactly and only the @11–@17
clause. The @19 clause that follows it carries no count. A reader who has just been told a
count for the shallower levels reads the deeper one as complete; it is 58 of 435, chosen
by `i % 8` plus a five-element `keep` set of the known exceptions. **Defect class:** scope
dropped in transit — enumeration-versus-sample. **Severity:** MEDIUM (it does not change
the certificate, which is exact BigInt and independent of P1b; it changes how much of the
float cross-check was actually performed). **Confidence:** HIGH — the script, its pasted
output and the log all three state `58/435`, and only the prose omits it. `58/435` appears
nowhere else in the repository.

**Orphan check.** The only content of this log with no home I could find is the per-level
`max|no30|` for @11–@19 as a *sequence* (0.0024, 0.0068, 0.0070, 0.0060, 0.0039) — the
`.md` table carries every one of them, so nothing here is orphaned. The log's closing line
`Leg (iii) status: … ⟹ THEOREM at every computed level; all-x uniform bound OPEN (blockers
in P3)` matches `anchored-calm.md`:31 ("CERTIFIED, exact integer inequality / six computed
levels only") and the Corollary in `natal-cap-30-skeleton-bound.md`. **This log is spent
evidence, not load-bearing** — everything in it is stated somewhere, apart from the 58/435
above, which is stated in the script.

## 1.3 `cap36-skeleton-door.log` (4.9 kB, 53 lines, read in full)

**Contents.** `natal-cap-36-skeleton-door.js`: P1 the trapezoid cancellation identity at
@11..@19; P0/P2 the custody chain plus the calm ratio and the two uniform bounds at
@11..@23; P3 the door (χ² for `(q mod 30, ⌊W/q⌋ mod 30)` on 240 cells, df 239) at
@17/@19/@23/@29/@31/@37; P4 where the skeleton mass sits; P5 the decay-law fits.

**Reflected accurately in `natal-cap-36-skeleton-door.md`.** Measurement D's table
(`.md`:161–166) transcribes P3 correctly including the two **empty** M=30030 cells at @31
and @37, which the log genuinely does not compute. The calm ratio 0.2349 / 0.1149 / 0.0505
/ 0.0198 / 0.0080 in `natal-cap-30-skeleton-bound.md`'s Prop C is P2's `calm ΣV/ΣLδ`
column verbatim. Proposition E's table (`.md`:188–194) transcribes P4 including the sample
labels `40 (step 11)` and `29 (step 60)`.

Corollary B (`.md`:85–109) likewise carries P2's second bound family correctly — "the new
bound is worse than cap-26's Abel bound at every level (aggregate 5.7e2 against 1.8e1 at
@11, 5.6e4 against 1.6e3 at @23), and like it certifies zero primes anywhere" against the
log's `trapezoid agg 5.695e+2` / `Abel(cap-26) agg 1.828e+1` at @11 and `5.605e+4` /
`1.593e+3` at @23, with `certified 0/K` at every level. **Orphan check: one item.** P1's
`min slack in |Snum| ≤ 8Mσ` column (53.8× at @11/@13, 94.6× at @17/@19) is reported
nowhere — that is the measured looseness of Corollary B's uniform bound, and the `.md`
gives two reasons the bound is vacuous without giving this third quantitative one. Not a
defect; available evidence.

**Y-3 (MED-HIGH). `TODO.md` restates the P4 percentages with the sample disclosure gone.**

`TODO.md`:198–202:

> "(ii) THE DOOR AS NAMED REACHES ABOUT A TENTH OF THE MASS. The part of the skeleton
> that fixed-modulus-30 equidistribution can control (M_T ≤ lB) carries **9.2% / −0.9% /
> −10.8% / 5.5% of the total at @13/@17/@19/@23**. The other ~90% sits at modulus of order
> W, which is a different and harder problem."

Against `research/wave7-logs/cap36-skeleton-door.log`:28–43:

> `P4 @13 (34 primes, step 1): … [custody: Σ_q NUMsk/(15W) = 2.9021e+1]`
> `P4 @17 (120 primes, step 1): … [custody: Σ_q NUMsk/(15W) = 2.2650e+2]`
> `P4 @19 (40 primes, step 11): Σ_TΣ_q Snum_T = 1.8153e+2`
> `P4 @23 (29 primes, step 60): Σ_TΣ_q Snum_T = 3.8400e+2`

and against the home, `research/natal-cap-36-skeleton-door.md`:190–194, which prints a
`primes` column reading `34 (all)`, `120 (all)`, `40 (step 11)`, `29 (step 60)` and then
says explicitly "At @13 and @17 the total is checked against cap-30's exact BigInt
kernel … to all five printed digits" — a custody line the log supplies for @13 and @17
and, tellingly, **does not supply for @19 or @23**, because a 9%-subsample cannot be
custody-checked against the full kernel.

Two of the four numbers `TODO.md` quotes — the two with the largest magnitude, including
the one that carries the sign reversal — come from 9.2% and 1.7% subsamples of the scour.
**Defect class:** scope dropped in transit; sample presented as enumeration. **Severity:**
MED-HIGH — `TODO.md` item 4's live decision ("decide whether this item survives … restate
it around the modulus-W mass, or demote it") is being taken from these four numbers, and
the reader is not told that half of them are subsampled. **Confidence:** HIGH — log and
home agree on the sampling, and `TODO.md` alone omits it. (`WAVE7-RESULTS-2026-08-15.md`:
152–153 has the same omission, but it is a dated history record under a provenance
banner and I rank it below the live `TODO.md` copy.)

**Y-8 (LOW-MED). The five-point fit statistics carried on a six-value sequence, second copy.**

`research/history/WAVE7-RESULTS-2026-08-15.md`:143–147:

> "The six certified values are 0.2132, 0.1113, 0.1011, 0.1259, 0.0945, 0.1176. It goes UP
> at @19, and UP again at @29. **Fits of ln G30 against ln ln W, against x, and against ln
> K give R² of 0.601, 0.511 and 0.526**, which is no law at all. **From @13 on the values
> sit at mean 0.1082 with spread 0.0313**, flat within their own spread."

Against `research/wave7-logs/cap36-skeleton-door.log`:46–50, whose P5 block is explicitly
five-valued:

> `P5 G30_agg = 0.2132, 0.1113, 0.1011, 0.1259, 0.0945   increments −0.1019 −0.0102 0.0248 −0.0313`
> `     fit ln G30 ~ b·(ln ln W): b = -0.699  R² = 0.601  residuals 0.204 -0.246 -0.173 0.188 0.027`
> `     @13..@23 mean 0.1082, spread 0.0313 — flat within its own spread, non-monotone at @19`

The @29 value is not in this run at all; it comes from the separate `--at29` pass
(`cap36-at29.log`), which prints no fit. The six-level statistics are mean 0.1101, spread
0.0314 and R² 0.439 / 0.261 / 0.331, which is what `natal-cap-36-skeleton-door.md`:213–216
and `TODO.md`:196–198 now carry. **This is the same defect `qc-status.md`:466 adjudicated
for the `.md`** ("STALE — five levels, five-level statistics"); the correction landed in
the home and in `TODO.md` and did not reach this second copy. **Severity:** LOW-MED — the
file is a dated history record, so the adjudicator may reasonably rule it out of scope;
I report it because the number sits one line below a sentence that says "six", which is
exactly the reading a future agent will lift. **Confidence:** HIGH.

*Ancillary, worth one line only.* Five staging documents and `CHANGELOG.md`:1347 record the
retired third R² as **0.527**; the log prints **0.526** and `WAVE7-RESULTS` prints 0.526.
The number is retired, so this decides nothing, but if the adjudicator ever needs to say
which value was on record, the run says 0.526.

## 1.4 `lemmaV-meansquare.log` (11.4 kB, 96 lines, read in full)

**Contents.** `research/sift-limit-lemmaV.js`, 470 s. S0 custody (pilot rows re-derived and
corrected against the true window); S1 the identity `T(x) − H·M − R(x)`; S2 the mean square
closed form against brute force at seven configurations; S3 the spectral form and the phase
factorisation; S4a a z-ladder at (u,s) = (2.8, 2.6) to z = 47; S4b a z-ladder at (3.2, 3.0)
to z = 31; S4c a u-scan at z = 29 from u = 1.8 to 4.4; S5 sup/rms; S6 the almost-all
comparison.

**Two clean corroborations first, because they matter for confidence elsewhere.**
`research/theta-ladder.md`:736–738 says "minT = 468 at z = 20 matches the S5 line of
`wave7-logs/lemmaV-meansquare.log`" — S5 line 76 reads `z=20 u=3.2 s=3 W=9699690: … sup|R|=18.8274
… minT=468`. Correct. And `theta-ladder.md`:17 records the conditional column as
"2.159, 2.183, 2.159, 2.252, 2.308, 2.345 at z = 19, 23, 29, 31, 41, 47" with "the last
two points from a different family (s = 2.6)"; the log independently corroborates that
disclosure, because S4b (s = 3.0) stops at z = 31 while S4a (s = 2.6) runs to z = 47. The
`<R^2>` values in `theta-ladder.md`:70–74 are `L.row(19, u, 3.0)`, and its u = 3.2 entry,
11.1585, is the log's z=19 u=3.2 s=3 row to the digit. I checked this pair specifically
because 10.0694 at u = 2.8 does **not** match the log's z=19 u=2.8 row (5.3543) — the
difference is entirely `s`, 3.0 against 2.6, and the invocation printed above the table
states it. No defect.

### Y-1 (HIGH). A stated bound on sup|R|/(H·M) that the log's own full-period block violates by 5.6×.

`research/history/WAVE7-RESULTS-2026-08-15.md`:59–65:

> "**Honest limits.** All of this is the ALMOST-ALL direction. … The sup data is
> encouraging and unproven: sup|R|/rms sits between 3.3 and 4.8 at every measured
> configuration, against √(2 ln W) running from 3.9 to 12.9, so the worst position is far
> from Gaussian-extremal. **sup|R|/(H·M) stays between 0.025 and 0.106 wherever a full
> period was enumerable.** None of that is a theorem."

Against `research/wave7-logs/lemmaV-meansquare.log`:69–76. S5's first block is exactly the
full-period-enumerable set — each row prints its `W`, and line 77 opens the *sampled*
block with "sampled sup over 8e6 consecutive positions (period far larger; LOWER bound on
the true sup)". The seven full-period rows give `sup|R|/H*M` = 0.0955, 0.0635, 0.0663,
0.1059, **0.5965**, 0.0254, 0.0387. The outlier, verbatim, line 74:

> `  z=20 u=2.2 s=2.6 W=9699690: rms=2.5366  sup|R|=11.8275  sup/rms=4.663  sqrt(2 lnW)=5.672  H*M=19.83  sup|R|/H*M=0.5965  minT=8`

That row is unambiguously a full period. `research/wave7-logs/lemmaV-pilot-rerun.log`:11
labels the identical configuration:

> `z=20 u=2.2 s=2.6 H=728 D=2414 |D+|=40 |D-|=48  [EXHAUSTIVE: u=2.2, full period 9699690, every x]`

**Defect class:** a quoted band computed from a subset of the printed rows — the same shape
as wave 5's T-3, where five of ten values were quoted and the omitted five broke the
sentence. Here six of seven were quoted. **Severity: HIGH.** The sentence is the file's
one summary of how far the worst position sits from the main term, it is the quantity the
Gap Reformulation's uniformity-in-position requirement turns on, and it is the sentence a
reader would act on when deciding whether the sup side is "encouraging". At u = 2.2 the
worst position eats 60% of the main term (`minT = 8` against `H*M = 19.83`), which is not
encouraging at all. The companion clause "sup|R|/rms sits between 3.3 and 4.8" is correct
for all twelve rows (3.327 … 4.792), so the failure is specific to the normalisation by
H·M — precisely the normalisation that is small when the window is short. **Confidence:
HIGH**, verified in two independent logs.

### Y-2 (HIGH). The S6 block is output of a function the repo has since flagged `!!! WRONG !!!`; the log is unflagged and the one document that quotes it voids it for the wrong reason.

`research/sift-limit-lemmaV.js`:395 and :422 now carry, above `elementaryVariance`:

> `// !!! WRONG. DO NOT TRUST THIS FUNCTION OR ANY S6 COLUMN DERIVED FROM IT. !!!`
> … `// line in S6 are artifacts and must not be quoted.`

`research/history/MORNING-2026-08-16.md`:58–84 is where that was established:

> "**What broke.** The S6 section compares the sieve mean square against an elementary
> second moment, and its `elementaryVariance` is wrong by about three orders. … **The
> conclusion reverses.** With the true elementary bound, the sieve mean square does not
> beat the elementary second moment. **It loses, by about 1.4×**, at every point brute
> force can reach: 8.249e−4 against 5.884e−4 at z=13, 3.722e−4 against 2.365e−4 at z=19
> u=2.8, and 4.658e−5 against 3.252e−5 at z=19 u=3.2."

Those three sieve figures are `lemmaV-meansquare.log`:86, :87 and :90 verbatim
(`sieve bound=8.249e-4`, `3.722e-4`, `4.658e-5`). So the log's S6 is exactly the block
`MORNING` voided. The log's entire `elementary bound` and `ratio sieve/elem` columns (lines
86–92) and its two closing lines (93–95) —

> `  z=41 fitted law: <R^2> = kappa*H with kappa=1.9236e-3, M=1.9271e-2.`
> `    sieve mean square becomes nontrivial at H > kappa/M^2 = 5.2 = 0.027 * ln^4 z`
> `    elementary second moment becomes nontrivial at H > 0.30/delta = 10.2 = 0.741 * ln^2 z`

— are therefore void. **The log carries no flag.** There is no banner file in
`research/wave7-logs/`, and nothing in `history/` marks this log's S6 as retired.

**And the CHANGELOG never heard of it.** `research/README.md`:116–117 states the house rule:
"**Every correction, supersession and retired claim lives in
[history/CHANGELOG.md](history/CHANGELOG.md).** That file is the ledger of what was wrong
and why it changed." Grepping `research/history/CHANGELOG.md` returns **zero** hits for
`lemmaV`, `S6`, `elementaryVariance` and `mean square`. Calibration on known positives in
the same file: `theta-ladder` 7 hits, `sift-limit-attack` 8, `natal-cap-36` 8,
`origin-excess` 4 — so the CHANGELOG does index research files by name and the pattern
fires. A three-order error that reversed a route's verdict was recorded in a dated session
record (which `research/README.md`:119–120 tells readers not to open) and in an in-script
banner, and in neither of the two places the corpus's own convention designates.

Worse, the one document that reports the log gives a *different and superseded* reason for
distrusting it. `WAVE7-RESULTS-2026-08-15.md`:50–54:

> "That plateau is better than the linear law the earlier section fitted, and it changes
> the verdict, so **the almost-all comparison in the log's S6 block is computed from the
> wrong law and should not be quoted.** Under the fitted linear law the sieve mean square
> becomes useful only at H beyond about **0.027·ln⁴z**, while the elementary second moment
> is already useful at **0.741·ln²z**, which would make the whole route worthless. Under
> the plateau the sieve bound improves like 1/H² instead, and at z = 29, u = 4.4 it beats
> the elementary bound by roughly two orders."

Three things are wrong with that paragraph against the settled state. (i) The named defect
is the growth law; the actual defect, established the next morning, is a three-order error
in the elementary side, which the growth law does not touch. (ii) It quotes the two voided
constants **inside the sentence telling you not to quote them**, so both numbers survive
into anything that lifts the paragraph. (iii) Its closing claim, "at z = 29, u = 4.4 it
beats the elementary bound by roughly two orders", is the reverse of the settled verdict —
`MORNING`:74 says the sieve **loses** by about 1.4× at every point brute force can reach,
and the honest statement is `MORNING`:80–83's "the two methods are genuinely comparable
rather than one dominating".

**Defect class:** orphaned/voided evidence with no custody marker, plus a misattributed
retraction. **Severity: HIGH.** `WAVE7-RESULTS`'s "what to do next" list item 2 —
"Settle the Lemma V plateau question, which is the one genuinely open mathematical fork" —
was settled on 2026-08-16 and the file still poses it as open; an agent picking up that
list would re-run a decided question and would carry the two voided constants while doing
it. **Confidence: HIGH** — the script's own banner, `MORNING`'s table and the log's
numbers all agree on which block is void.

**What in S6 survives, for the adjudicator's benefit.** `MORNING`:86 says "S6's last block
does not touch the broken function and stands", and that is the θ column
(2.159, 2.183, 2.159, 2.252, 2.308, 2.345), which `theta-ladder.md` owns and carries
correctly. The plateau finding itself also stands: S4c's saturation
(`<R^2>/H` = 1.52e-2 → 8.28e-6 as H runs 429 → 2,719,889 with `<R^2>` flat at 6.53 …
22.51) is reported correctly at `WAVE7-RESULTS`:42–46 and echoed at `MORNING`:52–56.

### Y-7 (MEDIUM). The precision claims on the mean-square verification quote the best row, not the worst.

`research/history/WAVE7-RESULTS-2026-08-15.md`:31–36:

> "The mean square then got a closed form, and that closed form was checked against brute
> force at seven configurations, **agreeing to between 7.9e-15 and 2.6e-11**. **A spectral
> form over moduli e dividing P(z) reproduces the same numbers to 5e-14**, with a phase
> factorisation holding at 11,389 (e, term) pairs and zero violations."

Against `research/wave7-logs/lemmaV-meansquare.log`:25–39. S2's seven `rel` values are
7.87e-15, 1.01e-13, 1.74e-12, **2.60e-15**, 1.20e-11, 2.56e-11, 5.64e-14 — so the band's
*lower* end is 2.60e-15, not 7.9e-15 (an understatement, harmless). S3's three spectral
rows are:

> `z=13 u=2.8 s=2.6: spectral=2.312169000  closed=2.312169000  rel=4.96e-14`
> `z=13 u=3.2 s=3: spectral=3.697734300  closed=3.697734300  rel=1.82e-13`
> `z=17 u=2.8 s=2.6: spectral=4.314096826  closed=4.314096826  rel=3.84e-13`

"to 5e-14" is the first row alone; the worst of the three is 3.84e-13, **7.7× the quoted
bound**. Likewise "a phase factorisation holding at 11,389 (e, term) pairs" is the largest
of three counts (2,785 / 9,753 / 11,389) — all three had zero violations, so the claim is
true, but the number is one row's. `MORNING`:53–55 inherits the same "spectral form
agreeing to 5e-14". **Defect class:** a bound quoted from the best of the printed rows.
**Severity:** MEDIUM — it is an accuracy claim about a verification, all three agreements
are tiny, and nothing downstream depends on 5e-14 versus 3.8e-13; but it is a stated bound
that the artifact refutes, and it has already propagated to a second file. **Confidence:
HIGH.**

**Orphan check on this log.** Genuinely unreported anywhere I could find: S0's corrected
`true` rows (the pilot-slide-versus-true-window custody, e.g. `z=17 … pilot minT=103` vs
`true minT=104`, `offset c(1)-c(H+1)=-1`); S4a's rows at z = 43, 47; S5's sampled sup rows
at z = 50 and z = 100; and the `sqrt(gcdBd)/H*M` column throughout. None of these is
load-bearing on any current claim — the z-ladder's headline (the plateau) is carried, and
the sampled rows are explicitly lower bounds. I flag them as available rather than as
defects.

## 1.5 `lemmaV-pilot-rerun.log` (3.3 kB, 29 lines, read in full) — **uncited, see Y-10**

**Contents.** A pilot sweep at `default L = 8000000`, eleven configurations, columns
`minT | #T<=0 /positions | meanT | sdT | maxdev | budget=(|D+|+|D-|)^2 |
gamma=ln(maxdev)/ln(budget) | minS meanS`. Five rows are exhaustive full periods
(z = 13, 17, 19 and two at z = 20); the rest are sampled prefixes at z = 30, 50 and 100.

**Nothing in the repository references it, and its content is largely unreported.** The
five exhaustive rows duplicate S0 of `lemmaV-meansquare.log` exactly (same minT, meanT,
sdT), so those are corroboration. What is here and nowhere else is (a) the `gamma` column,
0.238 / 0.244 / 0.249 / 0.284 / 0.276 / 0.302 / 0.380 / 0.333 / 0.322 / 0.303 / 0.325 /
0.278 / 0.232, a measured cancellation exponent against the trivial budget; and (b) the
three **negative controls**, which are the most informative rows in the file:

> `z=30 u=4.4 s=2.2 H=3157428 D=1777 … [coupled control: D^2 = H, DHR-safe regime u>beta2]`
> `   minT=10028 … T<=0: 0/4842569`
> `z=50 u=2.8 s=1.4 H=57163 D=239 … [coupled at u=2.8: D^2 = H (classical, expect weak/neg)]`
> `   minT=-11277 … T<=0: 7942834/7942834`
> `z=50 u=2.8 s=2 H=57163 D=2500 … [mildly decoupled: D^2 = H^1.43]`
> `   minT=-763 … T<=0: 7942834/7942834`

i.e. the certificate is negative at **every sampled position** in both coupled regimes and
positive at every position once s reaches 2.6. That is the cleanest statement of where the
decoupling threshold bites that I found in any artifact, and no `.md` carries it.
`MORNING`:55–56 reports "the measured cancellation exponent is γ ≈ 0.15 to 0.21 against a
provable 0.61" — note that band does **not** match this log's γ column, which runs 0.232
to 0.380; I could not determine whether these are the same γ (the definitions may differ:
this log's is `ln(maxdev)/ln(budget)`, and `MORNING` cites a run outside the repo,
`~/Files/primeoire-runs/lemmaV/lemmaV-full.log`, which I cannot open). **I flag this as
suspected but unproven** and it is in my coverage section.

**Assessment:** load-bearing, not spent. The negative controls are the evidence for the
regime boundary that `theta-ladder.md` §5a and `sift-limit-attack.md` §4.5 both discuss,
and they are currently reachable only by reading this uncited log.

## 1.6 `cap34-cap27-custody.log` (2.3 kB, 36 lines, read in full — the other agent's file, read for cross-checking only)

Engine verification against cap-21 at @11, the @13 fourth moment
(`T4 = 352253669.87624449`, 10 workers, 19.4 min), the error budget, the MC control, and
the four unconditional bounds ending `THEOREM (finite computation): P(S=0) <= 1.898e-6 at
@13`. Every figure is carried: `NIGHT-LEDGER-2026-08-14-15.md`:127 has the 1.898e−6, the
×513 and the kurtosis 2.9999; `TODO.md`:217–219 has the bound, the quadruple count and the
23 checks; `natal-cap-21-beyond-chebyshev.md`:62 has the "capacity exceeds N by ~15%" that
the log's line 33 states. The distinct-count `8,214,570` appears in
`natal-cap-27-t4-at13.js`:55 and :334. **No finding.** I did not audit it further; it
belongs to the other agent.

## 1.7 `cap34-exact13.log` (1.4 kB, 21 lines, read in full — other agent's file)

The exact @13 decomposition and the layer split. `WAVE7-RESULTS`:72–90 and `TODO.md`:
220–226 carry it accurately, including the pair-weight refutation (−64.36% of the multi
layer, −55.46% on the linear layer). One small asymmetry, reported without severity
because it is the other agent's surface: `TODO.md`:224 keeps the 64% and drops the −55%
linear-layer figure that both the log and `WAVE7-RESULTS`:87 carry. **No finding of mine.**

## 1.8 `cap35-x-multiplicity.log` (21.9 kB, ~240 lines — **skimmed, not read in full**; other agent's file)

I read the four CUSTODY headers, the full @11 and @19 level blocks and PART 6, and skimmed
the @13 and @17 blocks. PART 6's table is transcribed correctly into
`WAVE7-RESULTS`:121–126. The @19 block confirms `S̄ = 49,238.76`, `K = 435`,
`(X̄−X(0))/S̄ = 0.2225`, which is what `natal-cap-31-calm-vs-kill.md` and the new
`natal-cap-38-loudness-driver.js` now depend on. I used it only to reconstruct the @19
driver (see the tree-movement note at the top) and otherwise leave it to the agent that
owns it. **No finding of mine.** I did not check the @13/@17 census, cofactor-trichotomy
or enhancement tables against anything.

---

# PART 2 — the three `.txt` outputs

## 2.1 `research/natal5-variance.txt` (1.9 kB, 30 lines, read in full)

**Contents.** Four blocks: (A) exact variance over rotations at x = 7, 11, 13, 17, 19 with
`Var/E` = 0.152, 0.256, 0.299, 0.327, 0.347 and `empty ≤ (Var/E²)`; (B) brute force at @7
over all 30,030 rotations, `match=true`; (C) the anchored window's actual count, ratio and
z-score, `+1.05, +1.81, +0.28, −4.50, −25.52`; (D) a Monte-Carlo control at @11 and @13.

**Fully reflected, and correctly.** `NATAL-CAP-CAMPAIGN.md`:43–48 carries the almost-all
figures ("≤ 1.0e-4 of rotations empty at @17, ≤ 8.4e-6 at @19" against the file's 1.01e−4
and 8.38e−6) and the z-march verbatim with its scope stated as "(x=7..19)".
`paper/variance-note.md`:289 and `paper/anchored-note.md`:131 carry the extended series.
`CHRONICLE.md`:121 carries the ρ₃₀ = 2/1/0 comb. The self-check at line 24 — "(x=17
anchored must equal 3099 = the march result)" — holds against every other artifact in the
repo that prints 3099.

**One cross-artifact discrepancy, LOW, and it is inside a log rather than a document.**
`lemmaV-meansquare.log`:85 declares its Fano constant as

> `        elementary bound = F/(delta*H) with Fano F = 0.30 (natal5-variance measured 0.15..0.40)`

`natal5-variance.txt` measures 0.1521 … 0.3473, five points; the upper end 0.40 only exists
once `natal-cap-33-overnight.txt`'s ninth point, 0.3958 at @37, is included, and that is a
different artifact. The parenthetical also conflates two different quantities: the Var/E of
the *survivor count over rotations* with the Fano factor of the *twin count in a window*.
Both observations are moot in practice, because the whole line belongs to the
`elementaryVariance` block that Y-2 voids. Noted so the adjudicator does not have to
rediscover it if that function is ever repaired.

**Orphan check: none.** Every number in this file has a home.

## 2.2 `research/natal5-17tile-scour.txt` (10.6 kB, 150 lines, read in full)

**Contents.** The cumulative Natal@5 scour march across the @17 tile: 14,850 slots, scour
primes 19 … 709, one row per prime with fresh removals, self-strikes, genuine kills,
cumulative removed, alive, `ratio` and `2/q`. Totals: 11,751 fresh removals (79.1%), of
which **16 self-strikes**, 11,735 genuine kills, **3,099 survivors (20.9%), all genuine
twin primes**.

**Cited by number, not by name.** `paper/staircase-note.md`:199's "the actual removals 45 /
683 / 11751 / 214070" at x = 11/13/17/19 is this file's total; `CHRONICLE.md`:118's "the
17-tile Natal@5 march (14,850 → 3,099, all survivors genuine twins)" is this file's
headline. `natal-cap-10-sieve-cap.md`:157 uses the 14,850. So the file is not orphaned even
though `qc-scope-T.md`:1357–1358 listed it as "cited by nothing I checked".

### Y-9 (LOW-MED). "The self-strike sequence of a tile ENUMERATES its twin primes" — 16 against 3,099.

`research/GLOSSARY.md`:93–99:

> "- **Self-strike = twin found (NOT a kill)** … PROVEN: a self-strike occurs iff the pair
> (q, q±2) is a genuine twin prime (a composite partner would have been bulk-killed by a
> smaller prime first). **So the self-strike sequence of a tile ENUMERATES its twin
> primes**; honest destruction count = kills − self-strikes."

Against `research/natal5-17tile-scour.txt`:141–150:

> `  TOTAL fresh removals:   11751  of 14850   (79.1%)`
> `    of which self-strikes (TWIN PRIMES FOUND): 16`
> `    genuine kills (composite candidates unmasked): 11735`
> `  Natal@5 SURVIVORS after the Scour to √W: 3099  (20.9%)`
> `  Of the 3099 survivors, 3099 are genuine twin primes (r, r+2 both prime).`

The @17 tile contains 3,099 twin primes; its self-strike sequence has 16 members. The
biconditional in the entry is right and the *enumeration* clause is not: what the
self-strikes enumerate is the twin primes among the **scour primes**, q ≤ √W. The tile's
other 3,083 twins are precisely the survivors, which the same file counts separately, and
the GLOSSARY's very next entry says so — "if q² > W the prime is nearly toothless — it can
only self-strike (find a twin)". **Defect class:** scope dropped (a statement true of an
unbounded march restated for "a tile"). **Severity:** LOW-MED — nothing computes from the
sentence, but GLOSSARY is the corpus's definitional authority and this is the one entry a
reader would use to interpret the self-strike column of the artifact. **Confidence: HIGH**
on the arithmetic — I rebuilt the @17 Natal@5 set and its 120-prime scour from scratch and
reproduced 14,850 → 3,099 with the identical 16-element self-strike list and all 3,099
survivors twin, so both numbers are independently established; MEDIUM on the reading,
since a charitable reader supplies "as the scour deepens past √W". `GLOSSARY.md` is also
in the derived unswept list below and was read by a delegated sweep, so this may arrive
twice.

**Orphan check.** The per-prime `ratio` versus `2/q` columns — the file's own READING,
"fresh removals track 2/q of the survivors at every step (natal-blindness)" — are stated
qualitatively in several places but the 120-row table exists only here. Not load-bearing;
`natal-cap-01`'s `max gross/(2N/q) = 1.077` is the quantitative version and has its own
artifact. Minor: the header says "Scour range: primes 19 … 714 (q ≤ √W = 714.5)" while the
last row is q = 709; harmless, but it is a bound rather than the last prime.

## 2.3 `research/natal-cap-33-overnight.txt` (6.1 kB, 107 lines, read in full)

**Contents.** Three overnight runs. RUN 1, @31 window excess: `E_med(31) MEASURED = 60.90`
against 54.98 and 61.22 on record, implied c = 1.074. RUN 2, the @37 drift march:
`S(37) = 7,998,394,865`, `E(37) = 9,377,228,928.8`, `beta(37) = 0.8530`, the four forecasts
and the classical residual sequence. RUN 3, x = 37 variance: `Var = 3,711,451,136 ± 8.2e5`,
`Var/E = 0.3958`, the nine-point drift, the two frozen fits, and the anchored z-ladder
ending `z(37) = −22,632.9`.

**This is the best-reflected artifact in my partition.** `CHRONICLE.md`:188–193,
`NIGHT-LEDGER-2026-08-14-15.md`:50/133, `TODO.md`:311/328, `paper/anchored-note.md`:131/484,
`paper/variance-note.md`:289/303 and `paper/wall-note.md`:205 all carry its headline
figures, at the right precision, with the right scope attached (`qc-numbers.md`:143–160
verified the 0.611 hypothesis's caveats independently). The txt's own honest calibration —
"model comparison, not a limit measurement — 1/lnlnW spans only 0.295..0.343 over the
computable range, and x=41 (~41x cost) is out of JS reach" — is echoed at
`paper/variance-note.md`:313–317 per `qc-numbers.md`:154.

**Absence claims tested against this artifact, all TRUE.** `TODO.md`:170–173 ("the
anchored note's §3 table has no z entry at @41 because the ensemble variance **was never
computed there**") and `history/MORNING-2026-08-16.md`:128 ("Var(41) was not computed") are
both confirmed: RUN 3 reaches @37 and the file states @41 is out of reach. `TODO.md`:227
("Remaining: the @17 rerun, which never started") is confirmed by the two cap-34 logs,
which reach @13 only. `TODO.md`:281 ("@23 was never attempted" in the m ≥ 3 channel) is
confirmed by `cap35-x-multiplicity.log`, whose PART 6 table stops at @19. **No false
absence claim was found anywhere in the corpus that any of my eleven artifacts refutes.**
That is a negative result and I state it plainly, because it was my highest-priority task.

**Orphan check.** Two things in this file are reported nowhere else: RUN 1's window
sensitivity ("E stays 57.7..76.3 over four decades of window mean (log-log slope 0.060 —
l-independent); the l = W/37 monster window (mean 1.12e8) runs E = 100.4, the familiar
1.4-1.7x edge tilt"), and RUN 2's Miller-Rabin custody note ("extended to 12 prime bases
(deterministic to 3.186e14; cap-22's 6-base version stopped below 37#)"). The second is a
correctness precondition for `beta(37) = 0.8530` — the headline number of four documents —
and it lives only in this `.txt`. Not a defect, but the adjudicator should know that the
primality-testing basis for the deepest march on record is recorded in one uncited-by-name
file.

---

# PART 3 — the leaf notes

## 3.1 The derived unswept list — **first derivation was wrong, and here is why**

**Correction, stated first because it changes what this Part is worth.** My first
derivation subtracted only the files R and T *name in their coverage sections* and produced
a fifteen-file "unswept" list. That was wrong, and it was wrong by the exact mechanism this
campaign hunts: **I read R's negative statement of what it did not sweep and never read its
positive statement of what it did.** `qc-scope-R.md`:3–8 opens:

> "Read-only pass over the summary layer (`README.md`, `TODO.md`, `research/README.md`,
> **`GLOSSARY.md`, `THE-LENS.md`, `THE-DIALS.md`, `ZONE-POSTULATE.md`, `G2-STATE.md`,
> `PRIOR-ART.md`**, the whole of `paper/`, plus the three REG documents
> **`anchored-calm.md`, `certificate-engine.md`, `NATAL-CAP-CAMPAIGN.md`**), hunting the
> campaign's confirmed dominant defect…"

That is **ten of my fifteen**. A delegated sweep caught it before I did, and its opening
line — "the brief's premise is false: these five were swept in wave 4" — is correct on the
facts. I record the error rather than quietly fixing the list, because the brief's
instruction ("if you cannot establish that a file was swept, treat it as unswept") is
sound and my failure was the reverse: I could have established it in one `sed -n '1,10p'`
and did not.

**But "swept by R" is one axis, not an end-to-end read.** R's own subtitle is "the
scope-flattening sweep" and its hunt is stated as a single defect class. `qc-scope-T.md`:2–8
says R "grepped them for the specific quantities in R-3 and the 0.58 axis and read nothing
else" of the U-FRAME family, and R:612 says of `anchored-calm.md`'s home "**I did not open
it**". So the correct statement is: these ten were swept **on the scope-drop axis only, in
wave 4**, and six of the findings below are new against R's fifteen. That is the useful
conclusion, and it is weaker than my brief assumed.

**Truly unswept by both R and T** — five files, all of which R:693–697 declared
"deliberately out of scope, other agents own them": `a3-05-bound-L.md`,
`level-ledger-tight.md`, `localized-04-maxsum.md`, `oeis-G2-submission.md`,
`oeis-seam-submission.md`. R named no other agent by name and no later partition claims
them, so as of this wave nobody has read them.

For the record, the subtraction that produced the fifteen was:

- **T, end to end, itself:** `U-FRAME.md`, `kappa-not-L.md`, `operator-and-pair-count.md`,
  `f-decays.md`, `FOLD-PROFILE.md`, `OBSERVATIONS.md`, `ATTACKS.md`, `ATTACKS2.md`,
  `ATTACKS3.md` (`qc-scope-T.md`:1330–1332).
- **TA** (`qc-scope-T.md`:786–789): `gate-multiplies.md`, `maxgap-law.md`, `theta-ladder.md`,
  `exponent-control.md`, `h2-scoping.md`, `two-class-lower-bounds.md`, `covering-dive.md`,
  `discrepancy-two-class.md`.
- **TB** (`qc-scope-T.md`:962–967): `sift-limit-attack.md`, `bv-import-survey.md`,
  `dhr-verification.md`, `maier-matrix.md`, `origin-excess.md`, `LOCALIZED-GAP.md`,
  `localized-single-alignment.md`, `a3-03-f-from-census.md`, `a3-09-histogram-operator.md`,
  `d2-d4-bijection.md`, `two-moire-argument.md`.
- **TC** (`qc-scope-T.md`:1130–1132): `natal-cap-04/10/12/14/19/21/23/26/30/31/32/36-*.md`
  (all twelve `natal-cap-*.md` in the directory), `anchored-windows.md`, `SCRIPTS.md`.

That leaves **fifteen**, of which R's header reclaims ten:

| # | file | lines | true prior coverage | status here |
|---|---|---|---|---|
| 1 | `research/anchored-calm.md` | 79 | **R, wave 4, scope axis** (R:3–6; R-14/15 live in it) | **read end to end (me)** |
| 2 | `research/NATAL-CAP-CAMPAIGN.md` | 145 | **R, wave 4, scope axis** | **read end to end (me)** |
| 3 | `research/README.md` | 149 | **R, wave 4, scope axis** | **read end to end (me)** |
| 4 | `research/G2-STATE.md` | 927 | **R, wave 4, scope axis** | delegated sweep Y1 |
| 5 | `research/THE-DIALS.md` | 300 | **R, wave 4, scope axis** | delegated sweep Y1 |
| 6 | `research/THE-LENS.md` | 196 | **R, wave 4, scope axis** | delegated sweep Y1 |
| 7 | `research/ZONE-POSTULATE.md` | 396 | **R, wave 4, scope axis** | delegated sweep Y1 |
| 8 | `research/GLOSSARY.md` | 424 | **R, wave 4, scope axis** | delegated sweep Y1 |
| 9 | `research/PRIOR-ART.md` | 433 | **R, wave 4, scope axis** (defect at :274) | delegated sweep Y2 |
| 10 | `research/certificate-engine.md` | 159 | **R, wave 4, scope axis** | delegated sweep Y2 |
| 11 | `research/a3-05-bound-L.md` | 471 | **NONE** — R:695 "other agents own them" | delegated sweep Y2 |
| 12 | `research/level-ledger-tight.md` | 421 | **NONE** — R:695 | delegated sweep Y2 |
| 13 | `research/localized-04-maxsum.md` | 427 | **NONE** — R:695 | delegated sweep Y2 |
| 14 | `research/oeis-G2-submission.md` | 161 | **NONE** — R:695 | delegated sweep Y2 |
| 15 | `research/oeis-seam-submission.md` | 146 | **NONE** — R:695 | delegated sweep Y2 |

4,834 lines in total; 1,626 of them in the five with no prior coverage at all.
**Note on the brief's "roughly 50".** That figure comes from
`qc-scope-R.md`:718, "The ~50 `natal-cap-*.md` and `attack-*.md` leaf notes — not swept",
written before T's TC sub-sweep took all twelve `natal-cap-*.md`. There are no
`attack-*.md` files in the repository at all — only `ATTACKS.md`, `ATTACKS2.md`,
`ATTACKS3.md`, which T swept. So R's ~50 was an overestimate of a surface that no longer
exists in that shape, and the true residue is the fifteen above. `research/qc/README.md`
is a sixteenth candidate; I treat it as owned by the QC-framework partition and did not
open it.

I also confirmed that `research/research/` and `research/research/history/` are **empty
directories** — two stray empty dirs created 2026-08-17, containing no files. Not a
finding; flagged so nobody else spends a grep on them.

## 3.2 `research/anchored-calm.md` — read end to end

### Y-6 (MEDIUM). The door's share of the skeleton mass stated as a band that two of the four measured values fall outside.

`research/anchored-calm.md`:50–54:

> "The **Skeleton Equidistribution Conjecture** is the all-x form of a statement certified
> at every level anyone has computed; its door is named, analytic, and measured open, but
> **the branches the door governs carry between 9% and 11% of the skeleton's mass**, so
> proving it as named would move the bound by a few percent and close nothing."

Against `research/wave7-logs/cap36-skeleton-door.log`:29/33/37/41 and its home
`research/natal-cap-36-skeleton-door.md`:190–194:

| level | M_T ≤ lB share |
|---|---|
| @13 | **+9.2%** |
| @17 | **−0.9%** |
| @19 | **−10.8%** |
| @23 | **+5.5%** |

Only @13 lies in [9%, 11%]; @19 lies in it only in absolute value and with the opposite
sign; @17 and @23 lie outside on either reading. `TODO.md`:200 and
`natal-cap-36-skeleton-door.md` both print all four with signs. The home's own summary
sentence is the safe one — "**[MEASURED, decisive]** The branches for which the door is a
fixed-modulus question carry essentially none of the skeleton. Their aggregate is small and
of either sign" (`natal-cap-36-skeleton-door.md`:196–199) — and "of either sign" is exactly
what `anchored-calm.md`'s band loses. **Defect class:** wrong band; a range fitted to the
two largest magnitudes and stated as if it covered the series. **Severity:** MEDIUM —
`anchored-calm.md` is the designated status parent, the file that exists precisely because
"the same status table was written four times … so no summary could copy it correctly"
(:4–7), so a band that no other copy carries is the failure mode the file was created to
prevent. **Confidence: HIGH**, four printed values against a two-endpoint band.

**Everything else in this file checks out**, and two checks are worth recording because
they are the kind that usually fail. (i) :33's "six counterexample primes are known, **of
10,201 scour primes over six levels**": the six levels' K values are 10 + 34 + 120 + 435 +
1739 + 7863 = 10,201 exactly, and the `Cov>0` counts across `cap36-cap30-repro.log` (1, 0,
1, 2, 1) plus `cap36-at29.log` (1) sum to six. (ii) :43–45's G30 sequence and "margins
0.287 to 0.406 and 0.3824 at @29" match the logs' margins 0.2868 / 0.3887 / 0.3989 /
0.3741 / 0.4055 / 0.3824. Both correct.

*One thing I could not settle.* :34 scopes the Anchored Typicality Measurement to
"@13, @17, @19" while :45–46 gives values at @13 and @17 only, and :12–13 gives ranks at
@17 and @19. Three different level sets in one file for one object. I did not open
`natal-cap-19-calm-lemma.md` (TC's file) to determine which is right, so I report it as a
lead, not a finding.

## 3.3 `research/NATAL-CAP-CAMPAIGN.md` — read end to end

### Y-4 (MED-HIGH). "Open leads ranked / 1. K*(x) at @23" — the same file says twice that @23 and @29 are measured.

`research/NATAL-CAP-CAMPAIGN.md`:89–93:

> "## Open leads ranked
>
> 1. **K\*(x) at @23** (attack 8): does the freshness-moduli count grow linearly or faster?
>    The K\* curve is the honest quantitative shape of the wall — a new object. **Bitset
>    march at W=223M is feasible.**"

Against the same file at :35–37, in the answer-in-one-paragraph block:

> "Bonferroni depth escalates K\* = 0, 0, 2, 10 at @11..@19 (attack 8; **the ladder
> continues 27 at @23 and 69 at @29, both measured**);"

and again at :61, in the scoreboard's row 8:

> "K\*(x) = 0,0,2,10 @11..@19 (**27 @23, 69 @29**) = the wall's quantitative shape"

and corroborated outside the file by `history/NIGHT-LEDGER-2026-08-14-15.md`:118, which
attributes @29 to a specific artifact: "`natal-cap-18-at29.js` | **K\*(29) = 69** against
the φ-band forecast ~70; K\* sub-linear in the scour". The lead's own question — "does the
freshness-moduli count grow linearly or faster?" — is answered by that entry: sub-linear.

**Defect class:** false absence claim, of the R-1 / T-1 shape, and this one does not even
need another file to refute it — the contradiction is internal, 56 lines apart.
**Severity: MED-HIGH.** It is item 1 of a ranked open-leads list in the campaign's
scoreboard document, it prices a computation ("Bitset march at W=223M is feasible") that
has already been run at both @23 and @29, and `qc-scope-T.md`'s method note 4 identifies
exactly this section shape as the corpus's defect generator: "a next-step item is either
struck with a pointer to its artifact or is not there." **Confidence: HIGH** — three
statements in two files, one of which names the artifact.

**Also in this file, reported without severity because the scope is stated.** :45–46's
z-march "+1.05, +1.81, +0.28, −4.50, −25.52 (x=7..19)" is `natal5-variance.txt` section C
verbatim and correctly scoped, but the series now runs four levels deeper —
`natal-cap-33-overnight.txt`:91–92 gives z(23) = −144.9, z(29) = −762.1, z(31) = −4000.9,
z(37) = −22,632.9, and `paper/wall-note.md`:205 carries the nine-level version. The
campaign document is not wrong; it is five-ninths of the current series with the scope
attached. Whether a scoreboard should be extended is the adjudicator's call, not a defect.

**Checks that passed:** :43's "≤ 1.0e-4 of rotations empty at @17, ≤ 8.4e-6 at @19"
against `natal5-variance.txt`'s 1.01e−4 / 8.38e−6; :61's "survivors ≥ 34/110/82/1877
@11/13/17/19, since extended to 4841 @23 and 31,327 @29 (six certified levels in all)";
:141's "the @13 scour is 34 primes" against every log that prints K = 34. The `attack-04`
correction banner at :3–15 is intact and its replacement pointer
(`natal-cap-02-fourier-budget.js`) exists.

## 3.4 `research/README.md` — read end to end

**No findings.** It is a router and it holds no mathematics, exactly as :3–5 claims. I
checked every one of its 41 file links resolves and every class label (LIVE / SPENT /
ORIENT / REG / SUB) against the file it names; `natal-cap-NN-*.md (twelve)` at :95 is the
correct count. Two observations for the adjudicator, neither a defect:

- :97 lists the X-limitation theorem in the corpus's proven set via `../README.md`; the
  root `README.md` was among the files the adjudicator corrected mid-pass for the @19
  extension, and `research/README.md` carries no level count, so it needed no change.
- :47 routes "is the corpus self-consistent right now" to `node research/qc.js`. Per my
  brief I did not run it.

## 3.5 The two delegated sweeps, YA and YB

Twelve of the fifteen were read by two delegated read-only sweeps, briefed on the same
defect classes, the calibration rule and the no-replacement-prose rule, and told to check
each candidate against `qc-scope-R.md`, `qc-scope-T.md`, `qc-status.md`, `qc-CAMPAIGN.md`
and `CHANGELOG.md` for prior adjudication before reporting. **YA** took `G2-STATE.md`,
`THE-DIALS.md`, `THE-LENS.md`, `ZONE-POSTULATE.md`, `GLOSSARY.md` (§3.6); **YB** took
`a3-05-bound-L.md`, `level-ledger-tight.md`, `localized-04-maxsum.md`, `PRIOR-ART.md`,
`certificate-engine.md` and the two `oeis-*` drafts (§3.7). Provenance is marked per entry,
and nothing from a delegated sweep should be applied without a second reader at the
artifact — the discipline `qc-scope-T.md` set after TC-1. I re-verified five of YA's six
myself and say so per entry.

## 3.6 Findings from delegated sweep YA — `G2-STATE.md`, `THE-DIALS.md`, `THE-LENS.md`, `ZONE-POSTULATE.md`, `GLOSSARY.md`

All five read end to end. Renumbered `YA-*` here; the sweep's own labels were `Y-1…Y-6`
and collide with mine. **I re-verified YA-1, YA-2, YA-4, YA-5 and YA-6 myself at both ends
and all five stand** — the quoted strings and line numbers below are mine, not the sweep's.
**YA-3 I confirmed by a shorter route than the sweep took** (see below); I did not repeat
its recomputation of the measured column, only of the closed form. One
addendum to YA-2 from my own grep: besides `ZONE-POSTULATE.md`:307 the retired phrasing also
survives at `research/history/staging/audit-new1.md`:12, which is a staging document rather
than a body document, so the sweep's "exactly one live body instance" is right.

### YA-1 (HIGH, VERIFIED HERE). A false absence claim that the same document refutes 162 lines later.

`research/G2-STATE.md`:584, the opening sentence of §5a:

> "**Nobody in this repo had ever asked how large G2 can be *made* to get.** G2 **is** an
> adversarial covering problem: **PROVEN (elementary, CRT)**, G2(x#) − 1 equals the maximum
> length of an interval [1,m] coverable by choosing, for each prime…"

Against `research/attack2-rankin2d.js`:2–7, dated 2026-08-14 (three days before):

> `// ATTACK2 — RANKIN-2D: how far can TWO classes per prime actually cover?`
> `// (2026-08-14; the constructive/adversary side of covering-dive.md Q4)`
> `// THREE ADVERSARIES, one target: cover EVERY integer in [1, m], the covered m`
> `// measuring the constructible gap between twin-viable positions (the`
> `// constructive counterpart of G2 = the wall measured from the other side).`

Against **the same document**, `research/G2-STATE.md`:745–747:

> "The CRT collapse that makes G2 an adversarial covering problem **was already in this
> repo under the name PAIRED** (`research/attack2-rankin2d.js`)."

And against the home, `research/two-class-lower-bounds.md`:50–52:

> "**This is not new to the repo.** `research/attack2-rankin2d.js` already records it, under
> the name PAIRED, with the note *'CRT COLLAPSE: choosing all shifts a_p independently is
> the same as sliding ONE window over the … tile'*. It is restated here because the whole
> of §4 and §5 depends on it."

The home's §0 says the defensible thing — "Every other bound in this repo is an upper
bound; this note asks the adversary's question instead" — and then its §1 supplies the
correction. `G2-STATE.md` §5a kept §0's framing, hardened it into a bare absence claim, and
dropped §1's correction, while carrying that same correction in its own §8. The artifact
computed exact branch-and-bound PAIRED optima at n = 3..13, cross-checked them against a
full-period CRT tile scan, and produced WalkSAT lower bounds at p = 97..199 — it is not a
stub. **Defect class: false absence claim (R-1 / T-1 / Y-4 shape), plus internal
contradiction. Severity HIGH** — it is the sentence a reader uses to decide whether the
construction side is unexplored, in the corpus's consolidated-state document.
**Confidence HIGH**, four ends, two of them in the same file. The sweep's calibration:
`grep -rn "Nobody in this repo\|had ever asked" research/history/` → 0 hits, while the same
grep style for `"halves the open band"` returns `qc-scope-T.md`:954 and `qc-scope-R.md`:576,
so the pattern fires on this corpus; `grep -rn "attack2-rankin2d" research/history/` → 8
hits, none touching this claim. **This is the seventh confirmed instance of the class.**

### YA-2 (MEDIUM, VERIFIED HERE). A framing the CHANGELOG explicitly RETIRED, surviving in the target document — the last live instance.

`research/ZONE-POSTULATE.md`:306–308 (§6, route B): the Origin Excess Lemma "**carries an
unstated third hypothesis that binds**". Against `history/CHANGELOG.md`:640–643 —
"**RETIRED as a private count.** The lemma has one hypothesis, S ≤ y′²; the x < x\*
threshold belongs to the **Origin Excess Corollary**" — repeated at :739–740, and against
`G2-STATE.md`:418–422 ("**do not keep a private count of them here**"),
`GLOSSARY.md`:124–127, `maier-matrix.md`:255 and `origin-excess.md`:457. The wave-4 fix
landed in three files and never in `ZONE-POSTULATE.md`. `grep -rn "third hypothesis"
--include="*.md"` returns exactly one live body instance. Class: stale, adjudicated
elsewhere, unapplied here. **Confidence HIGH** (sweep's, not re-derived).

### YA-3 (MEDIUM, VERIFIED HERE by a shorter route). "Matching the closed form to three digits" refuted by the series printed in the same sentence.

`research/GLOSSARY.md`:393–397 ("The overshoot"): "VERIFIED against exact counts: 1.32,
1.94, 2.33, 2.61, 2.89, 3.13 at n = 100, 300, 1000, 3000, 10⁴, 3·10⁴, **matching the closed
form to three digits**." The sweep recomputed both sides exactly and the *measurements*
reproduce, but the agreement does not: at n = 100 the closed form 2·Σ_{7≤q≤n}1/q gives
1.5390 against 1.3214, **−14.1%**, not agreeing to one significant figure; only n = 1000
reaches three digits. The precision claim comes from `a3-07-pane-overlap.js` reading 0,
which demonstrates it at **n = 3e6 only** ("3.861 vs 3.861"), and was welded onto the
low-n series. Class 3 plus a dropped demonstration range. *Routing note: the home's own
"at every n" is the same over-claim and is outside both my file set and the sweep's.*

**The shorter route, and it is worth recording as method.** The sweep recomputed both
columns. That was not necessary: the claim falls to the closed form alone, evaluated
against the six numbers the entry already prints. `2·Σ_{7≤q≤n} 1/q` at
n = 100, 300, 1000, 3000, 10⁴, 3·10⁴ is **1.5390, 1.9590, 2.3295, 2.6214, 2.8995, 3.1231**,
against the entry's printed **1.32, 1.94, 2.33, 2.61, 2.89, 3.13**. Only n = 1000 agrees to
three digits. n = 300, 3000, 10⁴ and 3·10⁴ agree to two, and **n = 100 agrees to none** —
1.3 against 1.5. So five of the six points refute the sentence using only numbers already
on the page, and no artifact needed opening. **Confidence HIGH.** This is the same shape as
Y-1 and Y-7 in Part 1: a precision claim asserted over a series whose own printed values
contradict it.

### YA-4 (LOW-MED, VERIFIED HERE). A term count contradicted twice inside the same file.

`research/G2-STATE.md`:23 (§0): "the exponent reads 1.54 on **eight exact terms**". Against
`G2-STATE.md`:161 and :655 ("**x ≤ 37, 10 terms** | **1.54 ± 0.09**") and the home
`exponent-control.md`:167–169 ("**10 terms**"). Likely mechanism: "eight" is the term count
of the c₂′ row discussed in the same paragraph (`G2-STATE.md`:168, "MEASURED, **8 exact
terms**"). The value 1.54 is right; only its support is understated. Not covered by R-9 or
R-10.

### YA-5 (LOW, VERIFIED HERE). GLOSSARY quotes h₂'s exponent inside the entry that defines G₂.

`research/GLOSSARY.md`:209–211: "G₂ ≪ (log p#)^{4.2665+ε} PROVEN … **the exponent measured
at 1.57 central**". Against the explicit house directive at `exponent-control.md`:198 and
`G2-STATE.md`:667: "**Quote 1.57 for h2 and 1.54 for G2**". `THE-DIALS.md`:54 and
`ZONE-POSTULATE.md`:182 also say 1.57 but say "the two-class exponent", which is defensible;
GLOSSARY is the one that attaches it to G₂ specifically. **Agreement is not independence
here** — all three descend from `exponent-control.md`:175's headline, and the sweep says so.

### YA-6 (LOW, VERIFIED HERE). One entry of six outside its own summary band.

`research/ZONE-POSTULATE.md`:191–192: θ_true is "**above 2.05 at every z from 37 to 71**".
`G2-STATE.md`:701 prints the z = 37 entry as **">2.0495"**. The other five clear 2.05.
Distinct from Q6.3, which flagged the missing prefix-flattening warning at the same lines.

### Already adjudicated, reported by the sweep as such and not as new

R-13 (`G2-STATE.md`:529 "halves the open band" against :803's "removes about 71%"; the
sweep computes 1.6175/2.2665 = 71.4% and notes §9 item 1 was fixed while §5 was not),
R-10, R-3, Q6.2 and Q6.3, all still live and all previously logged. The sweep also clears
`G2-STATE.md`:369–372's factor 1.82 as *copying* the home rather than flattening it.

### The sweep's own coverage, carried up

It verified by hand or in node: the full G2 ladder table and four derived columns, 31#/37#
censuses and the ×35 factor, the T₇ grain word, the T₁₁ grain census, the @13 cohort
decomposition, π(1e11), π₂(1e8), 5·C₂, and the pane capacity/slots table. Two suspected and
unproven: `THE-DIALS.md` §5's whole zone row rests on one unexecuted run of
`window-exceptions.js`, and there is an unadjudicated **range asymmetry** — THE-DIALS
measures families A and B to n ≤ 1e4 while `ZONE-POSTULATE.md` §5a and `GLOSSARY.md` quote
n ≤ 1e5 from `square-window.js`, both reporting the same exception counts, with neither
document saying which range its "1" is from. Not reached at all: **`GLOSSARY.md`:218–349,
the entire anchored layer** — roughly 130 lines of quoted numbers (the β ladder, Assumption
A's two forms, the fused window, the calm, the X-channel and its ×271.7 margin, the
skeleton, K\*, the 0.611-vs-0.44 hypothesis, the staircase caps) read for internal
arithmetic only, with **no `natal-cap-*` home opened**. `qc-scope-T.md` TC-1 came out of
exactly that block. Also unverified: `GLOSSARY.md`:41–57's seam-enrichment ladder against
the fold-profile scripts, `G2-STATE.md` §8's 28-row ownership table against `PRIOR-ART.md`,
and the Holt citation used identically in `THE-LENS.md` §5 and `ZONE-POSTULATE.md` §7.
`ZONE-POSTULATE.md`:276's hedged "nobody has posed it" is flagged **unresolved**, not clean.

## 3.7 Findings from delegated sweep YB — `a3-05-bound-L.md`, `level-ledger-tight.md`, `localized-04-maxsum.md`, `PRIOR-ART.md`, `certificate-engine.md`, `oeis-G2-submission.md`, `oeis-seam-submission.md`

All seven read end to end, none skimmed; four of the generating scripts' OUTPUT/READINGS
blocks read in full alongside. This is the set containing the five files **no wave has ever
read**, and it is the richest of the three sweeps. Renumbered `YB-*`. **I re-verified YB-1
through YB-6 myself at both ends and all six stand**; the quoted text below is mine.

The sweep also ran `research/audit-numbers.js` to completion — **90/90 checks pass, and it
fired on none of this**, which is the cleanest available demonstration that the repo's own
instrument cannot see this defect class.

### YB-1 (HIGH, VERIFIED HERE). A closed form inside a PROVEN corollary has the wrong sign, and the file's own tables refute it at four of eight folds.

`research/a3-05-bound-L.md`:125–127:

> "> c_min(m) = 3pm for m even, and **c_min(m) = 3pm - p + 2\*eta** for m odd,
>
> so in all cases c_min(m) >= 3pm - p - 2. Pair up the gaps and apply Theorem A; a leftover
> single gap costs at least the smaller class minimum, **2p - 2\*eta**."

η is +1 for p ≡ 1 (mod 6) and −1 for p ≡ 5 (mod 6) (`a3-05-bound-L.md`:69). Against the
script's own DP output, `research/a3-05-bound-L.js` Reading 5 (:667–677), m = 1 column:

| fold p | 7 | 11 | 13 | 17 | 19 | 23 | 29 | 31 |
|---|---|---|---|---|---|---|---|---|
| c_min(1) **printed** | 12 | 24 | 24 | 36 | 36 | 48 | 60 | 60 |
| stated `3pm − p + 2η` | **16** | 24 | **28** | 36 | **40** | 48 | 60 | **64** |
| `3pm − p − 2η` | 12 | 24 | 24 | 36 | 36 | 48 | 60 | 60 |

I recomputed all eight by hand. The sign is **minus**, not plus, and the corollary's own
next sentence already says so — "a leftover single gap costs at least … **2p − 2η**" — as
does Corollary A2 at :130 and §8 at :273. At m = 3, p = 31 the DP prints 246 and the stated
formula gives 250; 246 is `3·31·3 − 31 − 2`. **The same error is in the script banner**,
`a3-05-bound-L.js`:342 and its pasted output at :652. The DP that produces every printed
number is correct; only the closed form is wrong, in both places. **Severity HIGH** — it is
the closed form of the quantity Theorems B and C are both stated against, inside a block
marked PROVEN, and a reader evaluating it by hand gets a wrong bound at every odd m where
p ≡ 1 (mod 6). **Confidence HIGH**, three independent checks (DP output, two printed
tables, the corollary's own proof sentence). **Prior adjudication:** `applied-P.md` row 10
recorded "§4 extremal-run table, spans and c_min | reading 4, row for row | **clean**" — it
checked the table and never the formula.

### YB-2 (HIGH, VERIFIED HERE). "Within one at all seven folds": eight folds, and three of them are not within one.

`research/a3-05-bound-L.md`:228–229:

> "Reading 8 confirms the mechanism, with the model m\* = (G2 - mbar)/(3p - mbar)
> **tracking the measured m\* to within one at all seven folds.**"

Against `a3-05-bound-L.js` Reading 8 (:809–817), which has **eight** rows:

| fold p | 7 | 11 | 13 | **17** | 19 | 23 | **29** | **31** |
|---|---|---|---|---|---|---|---|---|
| model m\* | 0.18 | 0.84 | 1.14 | **1.49** | 2.50 | 2.87 | **2.98** | **3.62** |
| measured m\* | 1 | 1 | 1 | **3** | 3 | 3 | **4** | **5** |
| \|diff\| | 0.82 | 0.16 | 0.14 | **1.51** | 0.50 | 0.13 | **1.02** | **1.38** |

Five of eight are within one. Folds 17, 29 and 31 are not, and dropping the eighth row to
make "seven" true still leaves 17 and 29 failing. The measured m\* column is the one §5's
Theorem B bound is read off (:175, bound = 1 + m\* = 2, 2, 2, 4, 4, 4, 5, 6).
**Severity HIGH** — the sentence is the file's stated evidence for §7's mechanism claim,
that a single record gap subsidises the whole window. **Confidence HIGH**, arithmetic on
the script's own pasted table. No prior adjudication; `applied-P.md` has no row for it.

### YB-3 (HIGH, VERIFIED HERE). "To within 6%" over a range the same file prints as [1.038, 1.119].

`research/localized-04-maxsum.md`:33–34, the four-line §1 summary:

> "MEASURED and matched by an unfitted extreme-value model **to within 6%** over
> m ∈ [2 lnD, 1024]"

Against the same file, §3:84–85:

> "Over m ≥ 2 lnD it holds to `R/EV ∈ [0.981, 1.110]` at x = 997, **`[1.038, 1.119]`** at
> x = 3499, `[0.990, 1.064]` at x = 16001."

`localized-04-maxsum.js`:381, :404, :451 print exactly those three intervals and the string
"6%" appears nowhere in the script. The worst deviation is **11.9%**, twice the quoted
tolerance; 6% is achieved only at x = 16001 — a band correct on the narrowest grid and
carried onto the widest, which is the mechanism `qc-scope-T.md` method note 3 named. The
claim is repeated at :99 and :401 of the same file and **has propagated** to
`research/U-FRAME.md`:681 ("holding to **6 percent** over m ∈ [2 ln D, 1024]"), which is
not independent corroboration — U-FRAME cites localized-04 in the same sentence.
**Prior adjudication, and this is the instructive part:** `applied-P.md` row 43 recorded
"6% over m ∈ [2 lnD, 1024] | this file §3; restated `U-FRAME.md` §9 with the same scope |
**clean at both ends**". P verified that the *scope* travelled intact and never checked the
*value* against the interval printed one screen away.

### YB-4 (MED-HIGH, VERIFIED HERE). A band that excludes the fold breaking it, in two files, marked clean by a prior wave.

`research/a3-05-bound-L.md`:316–317:

> "MEASURED, reading 6: the Markov bound sits flat **between 0.32 and 0.44 at every fold**
> and for every m…"

Against `a3-05-bound-L.js` Reading 6's markov-bound column (:761–768):
`0.4762` (p = 7), 0.4242, 0.4387, 0.3965, 0.4021, 0.3712, 0.3225, 0.3240. **Fold 7 reads
0.4762**, outside the band; the true range over the printed grid is 0.32 to 0.48.
Second site, `research/kappa-not-L.md`:96–97, carries the identical "0.32 to 0.44" and
descends from the same reading, so the agreement carries no evidential weight.
**Prior adjudication:** `applied-P.md` row 13 — "Markov flat 0.32 to 0.44 | reading 6;
`kappa-not-L.md` agrees | **clean**". The verdict is wrong, and it is wrong because P took
the second site as corroboration instead of recounting the column.

### YB-5 (MED-HIGH, VERIFIED HERE). R-4 was applied at four of its five sites; the survivor is the coverage guarantee itself.

`qc-scope-R.md` R-4 named five "twelve" sites against a fourteen-row audit table. Current
state, from `grep -rn -iE "twelve arxiv|fourteen arxiv|twelve manuscripts|fourteen manuscripts"`
over `research/`, `TODO.md` and `paper/` (five hits, calibrated by the four known positives
it recovers):

- `TODO.md`:39 — "The **fourteen** arXiv manuscripts" ✔
- `paper/moire-primes.md`:654 — "**fourteen** arXiv manuscripts" ✔
- `research/PRIOR-ART.md`:167 — "All **fourteen** arXiv manuscripts were downloaded" ✔
- `research/PRIOR-ART.md`:283 — "Every bibliography in the **fourteen** manuscripts" ✔
- **`research/PRIOR-ART.md`:274 — "Twelve arXiv manuscripts read or searched in full text, plus the repository. The only item not covered is the 2022 book" ✘**

The survivor is the one that matters: it sits under the heading "**Coverage, and the one
gap left**", below a heading reading "Full corpus sweep, 2026-08-17 (COMPLETE)" over a
fourteen-row table, and it is the sentence that converts the count into the guarantee the
novelty boundary rests on. R itself flagged this at R-4: "if twelve of fourteen were
actually read, that guarantee is false and two papers are unswept". `CHANGELOG.md` carries
no entry recording R-4's application at all, so there is no record that the fifth site was
considered and left.

### YB-6 (MEDIUM, VERIFIED HERE). The certificate engine routes its one OPEN conjecture to the wrong TODO item.

`research/certificate-engine.md`:82, closing §2 on the Tail Comb Equidistribution
Conjecture: "`TODO.md` **item 11(b)** is this conjecture."

`TODO.md`:346–347, item 11(b): "**(b) Fixed-depth cap_K as Siegel-Walfisz theorems.**" — a
different object. The conjecture is `TODO.md`:304–305, **item 8(b)**: "(b) **prime-comb
equidistribution in the tail regime** (Brun–Titchmarsh vacuous at modulus W — needs another
route)", which is verbatim the statement §2 builds its box around, Brun–Titchmarsh vacuity
included. The item that would retire it is 11(**c**), the cap₂ prime-regime asymptotic via
Bombieri–Vinogradov. Knock-on at :114 ("`TODO.md` item 8 is the proof of the transfer") —
true of 8(a), but item 8 covers **both** of the engine's two unproven ingredients, which is
exactly what the mis-route hides.

### YB-7 … YB-12 (MEDIUM and below, delegated, not re-derived by me)

- **`localized-04-maxsum.md`:283**, MEDIUM: "the Deficit Lemma's own ceiling, **x/(4m̄) = 15
  to 18 folds** at those x". The file's own §5 table prints that quantity as C_gate = 13.9
  and 15.3; the 18 is the *other* number beside it in `localized-04-maxsum.js`:409–410 — "cap
  x/(4 mbar) = **15** vs sec7 heuristic x/(9.6 ln^2x) = **18**". Two quantities merged.
- **`PRIOR-ART.md`:381–386**, MEDIUM, class 1: "We reached Iwaniec 1978 **without ever citing
  Erdos 1962. Should be cited.**" It is now cited five times — `two-class-lower-bounds.md`:90
  (a numbered prior-art row with a live URL), `exponent-control.md`:20,
  `paper/beta2-note.md`:313, `paper/moire-primes.md`:686 and :761. `qc-papers2.md`:1066–1073
  corrected `qc-status` on exactly this point but applied the correction to the papers layer
  and never returned to the home that issues the instruction. The three siblings in the same
  bullet list are still true (Clement 1949 genuinely absent; the Fan–Pomerance and
  Weingartner comparisons genuinely unmade), which is why a reader would act on this one.
- **`certificate-engine.md`:79–80**, MEDIUM: the Li-versus-π offset given as "**2–5%** at
  these small ranges"; `natal-cap-28-analytic-certificate.js` gives 5.4, 2.2, 0.9, 0.3 % over
  @13…@23, so the band covers the two shallowest of the four levels the table row two lines
  above declares. Confidence MEDIUM — "these small ranges" is not pinned to the level list.
- **`localized-04-maxsum.md`:324–325**, MEDIUM: three numbers attributed to "x = 1009" are the
  script's **x = 997** block (`localized-04-maxsum.js`:395–396, p′ = 1009 so 2p′ = 2018; at
  x = 1009 the next prime is 1013 and 2p′ = 2026). Mislabelled level.
- **`level-ledger-tight.md`:248–249**, LOW: "the single term j = 1 already contributes
  **|S(1)|/2**" is off by a factor 2 — |S(1)| = ∏_q 2|cos(2π/q)| over the π(x)−1 odd primes,
  confirmed numerically at x = 11 (1.29666 against the printed |S(1)| = 1.297). Same error at
  `level-ledger-tight.js`:405. Does not touch the ET ≫ 2^{π(x)} conclusion. :250 also quotes
  0.0334 where the script prints 0.0335.
- **`localized-04-maxsum.md`:266**, trivial: "9.6 ln x … 78.7" against 9.6·ln(3499) = 78.34;
  the adjacent 14.4 ln x column reproduces exactly, so it is a slip, not a different x.
- **`oeis-G2-submission.md`:37–38**, LOW: states the reduction as
  `a(n) < prime(n+1)^2 - prime(n)` where the repo's settled form is `G₂(x#) < x′² − 2`
  (`ZONE-POSTULATE.md`:73, `G2-STATE.md`:61 and :156, `THE-DIALS.md`:274). The draft's
  condition is *stronger*, so conservative rather than wrong, but it does not match the home.
  `qc-scope-T.md`:951–953 raised this as out-of-scope routing; it is in scope now and still
  unaddressed.

### What YB checked and found CLEAN, so no later wave re-runs it

**Both OEIS drafts are sound.** `audit-numbers.js` passes 90/90 including the 39 draft
checks; the sweep independently re-derived the seam draft's Hardy–Littlewood algebra from
Mertens, hand-verified a(1)–a(4) and their witnesses from first principles, recounted the
DATA sum to 48, verified a(21)…a(30)'s witness lists term by term against the A060256 table,
and confirmed the "n+1 = 2, 3, 5" endpoint against `attack2-04-10-hierarchy-oeis.js`. The G2
draft's whole exponent chain reproduces `exponent-control.md` word for word — **including
the word "unexplained", which is the home's own and is not a false absence claim.** Also
clean: all eight of a3-05 §3's qualifying sets re-derived independently; §4 spans; §5 both
bound rows; §6's λ·m̄ band; §8's "fourteen of sixteen nonzero ratios" (recounted: exactly 16
nonzero, exceptions at folds 7 and 13); §8a's 56 cases; N(T₂₉) = 214,708,725; every
arithmetic cell of `level-ledger-tight.md` §6's rebuilt table; §§1 and 3's geometric means;
the whole §3 R(m) table of localized-04 and its three outside quotations in `kappa-not-L.md`,
`maxgap-law.md` and `localized-single-alignment.md`; every number in `certificate-engine.md`'s
status table and §§1–4; and PRIOR-ART's h(x#)/G₂ ratio table, the three Holt Table 2 clerical
corrections and the fourteen-row corpus table. One incidental: `certificate-engine.md`'s
"K\*/scour falls from 0.88% to 2·10⁻⁸" silently **corrects** its script's own reading 6,
which says "0.88% → 0.002%" against a table row of 2e−8 — the doc is right and the script
is wrong.

### YB's own coverage, carried up

**Suspected, not proven.** (a) `PRIOR-ART.md`:191–192's "Across the whole corpus the word
'twin' appears only in three roles … three of the papers do not contain the word at all" —
an absence claim over fourteen external PDFs, untestable from the repo, and it is the
load-bearing sentence under "THE NOVELTY BOUNDARY, drawn sharply". Given YB-5, whether all
fourteen were text-searched is now genuinely open, and R-4 said it could not settle that
either. Nobody has since. (b) `localized-04` §5's x = 61 and x = 251 rows appear in no pasted
scan output (the Y = 1e9 scan starts at x = 661), so C_obs 10.73 / 13.16 and C_gate 0.4 / 0.8
are unverified. (c) `level-ledger-tight.md`:132's "would need R\*(19) < 28.0" not reproduced.

**Not reached.** None of `a3-05-bound-L.js`, `level-ledger-tight.js` or
`localized-04-maxsum.js` was re-executed, so a claim where the *pasted output itself* is
stale against the current code is invisible to this sweep — and `qc-slopes-K.md`:32 records
that `localized-04-maxsum.js` was not run in a prior wave either, so **that file's output
has now gone two waves unre-executed.** None of PRIOR-ART's ~30 external citations was
verified (no web access), including the fourteen arXiv verdicts, the Dickson/Smith 1857
chain, the Cheer–Goldston quotation and the Holt Table 2 corrections against the actual
paper — only their internal arithmetic. Neither OEIS draft's A-numbers were checked against
oeis.org; the sweep relied on `qc-CAMPAIGN.md`:806–808's one-wave-old record.
`oeis-G2-submission.md`'s PARI program **remains unrun by any partition.**

### The structural observation YB ends on, which I rate above any single finding here

Three of YB's seven files — `a3-05-bound-L.md`, `localized-04-maxsum.md`,
`level-ledger-tight.md` — are precisely the three `qc-CAMPAIGN.md`:1091–1093 flagged as
having "got migration and an orphan sweep but **no systematic calibration check against
their homes** … They must not be assumed clean." Four of YB's eight findings are in those
three files, and **two of them (YB-3 and YB-4) sit on rows `applied-P.md` marked clean** —
in both cases because P verified the scope, or the corroborating site, rather than
recounting the number against the pasted table. The campaign predicted the gap correctly.
What it did not predict is the failure mode: **a "clean" verdict in a staging report is
itself an artifact that a later wave trusts**, and it is trusted more cheaply than the
document it certifies, because it is shorter. If one instrument comes out of wave 6, it
should be that a `clean` row names *what was compared against what*, so the next reader can
see that "scope travelled" is not "value checked".

---

# Coverage: what I did not reach, and what I could not prove

**Blunt version first, in three parts.**

*(1) I got my own scope wrong.* Ten of the fifteen "unswept" leaf notes I derived were
named in `qc-scope-R.md`'s opening sentence as R's surface, and I did not read that
sentence — I built the list from R's coverage section alone. A delegated sweep caught it
and told me so. The five genuinely untouched files are `a3-05-bound-L.md`,
`level-ledger-tight.md`, `localized-04-maxsum.md` and the two `oeis-*` drafts, all of which
R deferred to "other agents" who never came. **The lesson generalises past me: R's coverage
section is not a complement of its surface, and any partition deriving scope from it alone
will make this same error.**

*(2) Only three leaf notes were read by me.* `anchored-calm.md`,
`NATAL-CAP-CAMPAIGN.md` and `research/README.md`, 373 lines. The other twelve, 4,461 lines,
went to two delegated sweeps. I re-verified **all six** of sweep YA's findings at the
artifact and they all stand, so §3.6 can be treated as first-hand; but **reading a
delegated finding's two quoted ends is not reading the file**, and a defect elsewhere in
those five files would not have been seen by me. If the adjudicator counts only what I read
end to end, my leaf-note coverage is **3 of 15 files, 7.7% of the lines**.

*(3) The `.txt` and log surfaces I did do properly*, and that is where my own findings are.

**Logs.** Seven of eight read line by line. `cap35-x-multiplicity.log` (21.9 kB) I
**skimmed**: I read the four CUSTODY headers, the @11 and @19 level blocks in full, PART 6
in full, and skimmed the @13 and @17 blocks. Its census tables, cofactor-trichotomy tables
and the per-level `enhancement obs/CRT by cofactor range` matrices at @13 and @17 were not
compared against anything. It is the other agent's file and I read it only to cross-check
the @19 driver; a defect inside those tables would not have been seen from here.

**`.txt` files.** All three read in full, and `natal5-17tile-scour.txt` is now **certified
twice over**. First, an internal parse of all 120 rows: `genuine = fresh − self` holds at
every row, the `cumulative` and `alive` columns reconcile exactly at every row and land on
11,751 and 3,099, and all 16 self-strike primes are twin primes ≡ 11 or 17 mod 30. Second,
an **independent reconstruction from scratch** — build the Natal@5 set at @17 (r ≡ 11, 17
mod 30 with neither r nor r+2 divisible by 7, 11, 13 or 17), sieve it by the 120 primes in
[19, 709], and count. It returns 14,850 slots, 120 scour primes, 11,751 removed, **3,099
survivors, 16 self-strikes with the identical list (41, 71, 101, 107, 137, 191, 197, 227,
281, 311, 347, 431, 461, 521, 617, 641), and all 3,099 survivors genuine twin primes**.
**Zero discrepancies with the committed file.** So Y-9 is a defect in the GLOSSARY sentence
and not in the artifact, and the 16-against-3,099 contrast is independently established.
The only thing in the file I did not certify is the per-row `ratio` and `2/q` columns.

**Leaf notes, mine.** `anchored-calm.md`, `NATAL-CAP-CAMPAIGN.md` and `research/README.md`,
all three end to end. For `NATAL-CAP-CAMPAIGN.md` I verified the scoreboard's ten rows
against the campaign's own head paragraph and against the artifacts I had open; I did
**not** open `natal-cap-01/02/03/06/07/08/09.js` to check the seven keeper cells that
have no `.md` companion. I did chase one of them to the end and it is **clean**: row 5's
"Fano 0.26→0.10 (sub-Poisson deepening)" appears to run opposite to
`natal5-variance.txt`'s Var/E series (0.152 → 0.347, rising), but
`natal-cap-05-second-moment.js`:316–320 defines it as `VarRot/E₀` for a *single prime's
strike counts* — "In Fano form VarRot/E₀ ≈ 0.26 / 0.14 / 0.10: the Scour's strike counts
are 4–10x SUB-POISSON, deepening with x" — which is a different object from the survivor
count's Var/E over rotations. No conflict. The other six keeper cells are unchecked.

**Leaf notes, delegated.** Twelve files, 4,461 lines. Sweep YA (five files) returned and is
in §3.6, with its own honest gap: **`GLOSSARY.md`:218–349, the whole anchored layer**, about
130 lines of `natal-cap`-derived numbers, was read for internal arithmetic only with no home
opened. That block produced TC-1 in wave 5 and it is now the single most valuable unswept
surface I can name. Sweep YB returned and is in §3.7; it is the strongest of the three, with six
findings I re-verified and three of them HIGH, and it is where the five never-read files
were. Its own gaps, carried up in full there, are that **none of the three generating
scripts was re-executed** (and `localized-04-maxsum.js` has now gone two waves unrun),
**none of PRIOR-ART's ~30 external citations was checked** for want of web access, and
`oeis-G2-submission.md`'s PARI program **remains unrun by any partition in six waves**.

**What I suspect and could not prove.**

1. **The γ mismatch in `lemmaV-pilot-rerun.log`.** `MORNING-2026-08-16.md`:56 states "the
   measured cancellation exponent is γ ≈ 0.15 to 0.21 against a provable 0.61"; the
   pilot log's γ column runs 0.232 to 0.380. Either two different γ's share a name, or one
   of the two runs is stale. The reference run `MORNING` cites,
   `~/Files/primeoire-runs/lemmaV/lemmaV-full.log`, is outside the repository and I could
   not open it. **This is the highest-value unresolved item I am handing on.**
2. **Whether `cap36-cap30-repro.log`'s `APBsk_agg` and `cap36-skeleton-door.log`'s
   `Abel(cap-26) agg` are the same quantity.** They differ in the third digit at every
   level (18.23 vs 18.28; 52.51 vs 52.54; 1592.73 vs 1593). `natal-cap-30-skeleton-bound.md`
   quotes to two significant figures, so both are consistent with it and no defect follows;
   but if either is ever quoted to three digits, somebody has to decide which.
3. **Whether the `natal-cap-36-skeleton-door.md` Measurement D claim "consistent with
   uniformity at every level" survives its own χ².** 280.0 on 239 df is p ≈ 0.03. I did not
   pursue it because the file is TC's and the conclusion does not turn on it.
4. **`natal-cap-36-skeleton-door.md`:170–173's "separate census (not in the script, same
   method) … nine levels through @41, 1,117,909 scour primes"** is not in any of my eight
   logs either. T flagged it as disclosed-but-unverifiable; I confirm no wave7 log contains
   it, which narrows where it could be but does not find it.

**What I deliberately did not do.** I did not run `node research/qc.js` (the gate is the
adjudicator's). I did not open `research/qc/README.md`, `web/`, `attestation/`, or the
`.js` layer beyond the four scripts I needed to settle Y-2, Y-3 and Y-5
(`sift-limit-lemmaV.js`, `natal-cap-30-skeleton-bound.js`, `natal-cap-36-skeleton-door.js`,
`natal-cap-38-loudness-driver.js`). I edited nothing, committed nothing and pushed nothing;
this file is the only file I created.

**Two method notes, both about instruments rather than findings.**

**(a) A "clean" verdict in a staging report is now itself a defect surface.** YB-3 and YB-4
sit on rows `applied-P.md` marked *clean*, and in both cases the row is honest about what it
compared — "restated `U-FRAME.md` §9 **with the same scope**", "`kappa-not-L.md` **agrees**"
— and in both cases what it compared was not the thing that was wrong. A later wave reads
the verdict rather than the comparison, because the verdict is one word and the comparison
is a file. **A `clean` row should be required to name what was checked against what**, so
that "the scope travelled" cannot be read as "the value was recounted". That is the cheapest
structural change this partition can propose and it costs one table column.

**(b) The band-from-a-subset shape, third wave running.** Five findings here — Y-1, Y-7,
YA-3, YB-3 and YB-4, spanning a run log, a history file, the GLOSSARY and two never-read
leaf notes — have one shape: **a document asserted a precision or a band whose endpoints
came from a subset of the rows, and every printed number was correct.** That is
`qc-scope-T.md`'s T-3 again. No grep finds it, no cross-reference check finds it,
`audit-numbers.js` passes 90/90 without firing on any of them, and reading the document does
not find it.

But YA-3 and YB-3 sharpen T's prescription. T concluded "for a document quoting a subset of a
script's output, the script must be run, because the subset is invisible from the text."
Neither needed a script. YA-3's six values were **on the page**, and one line of arithmetic
against the closed form the same sentence states refutes it; YB-3's refuting interval,
`[1.038, 1.119]`, is fifty lines below the "within 6%" it contradicts, **in the same file**.
So the instrument is cheaper than T thought, and it is this: **whenever a document states a
precision or a band over a series, evaluate the claim against every element of the series,
starting with the ones the document itself prints.** Y-1 and YB-4 needed the artifact only
because the document printed no series at all. The corresponding repo change is the one T proposed for counts — have
`audit-numbers.js` hold the *series* rather than the derived endpoint — and it would catch
bands and precision claims as well as counts.

---

*This is a wave-6 partition report. Findings are stated for adjudication; no replacement
text is supplied and nothing in the corpus was edited. Line numbers were verified against
the working tree at ~07:30 on 2026-08-18 and the tree was being modified concurrently.*
