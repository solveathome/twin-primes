# Readings traceability pass (2026-08-20)

<!-- ledger
id: Q-readings-traceability
status: ANSWERED
todo: none
question: What is the source of each of the 1,592 figures that appear in a script's READINGS and not in its own OUTPUT block?
verdict: The running record: nothing in the pass changes a number, 56 mismatches are classified in eight kinds for adjudication elsewhere, and the advisory count rises when the work is done right because a provenance declaration is prose that carries printed values.
-->

`node research/qc.js embed-backlog` reported **149 `readings-not-traceable`
findings** at the start of this pass (150 files by a local walk that also sees
`research/qc/selftest.js`, which `C.scripts` excludes), covering **1,592
individual figures** that appear in a script's READINGS and not in its own
OUTPUT block. This file is the running record of what each of those figures
turned out to be.

**Nothing in this pass changes a number.** Edits are confined to READINGS
regions, outside both hashes, and consist only of provenance declarations,
rounding markers, and `[UNTRACED — verify before quoting]` flags. Where a
reading's figure contradicts its true source the contradiction is recorded in
the MISMATCH list below and the number is left exactly as it stands.

**The advisory count RISES when this work is done right** — the fortieth-pass
entry says so (137 to 139 there). A declaration is prose, and prose carrying a
printed value adds figures the OUTPUT block does not contain. The count is a
reading order, not a score.

## Classification vocabulary

| class | what it means | what the pass writes |
| --- | --- | --- |
| ROUNDING | the reading rounds a value its own OUTPUT prints | marked, printed value quoted |
| BORROWED | the figure is printed by a *different* script's embedded OUTPUT | provenance line naming that script, verified against its OUTPUT |
| DERIVED | arithmetic performed in the reading over printed inputs | named as arithmetic, inputs named |
| IN-CODE | the figure is a constant in the code region above the banner | named, with the line |
| LITERATURE | a published constant, not produced here | source named inline |
| UNDECLARED RUN | real measurement from an invocation whose output was never pasted | flagged `[UNTRACED — verify before quoting]` |
| STALE | contradicts its true source | MISMATCH list, both values, number untouched |

## MISMATCH list

Every figure found this pass whose value contradicts the source it names, or
whose arithmetic does not check out. **Nothing here was changed.** Each is
recorded in its own file under `[UNTRACED — verify before quoting]` or in an
explicit adjudicator note, with both values, so a reader meets the discrepancy
where the figure is.

### A. A figure contradicts a named script's embedded OUTPUT

| # | site | says | its source says |
| --- | --- | --- | --- |
| 1 | `natal-cap-32-wrap-identity.js` reading 0, at13 | "cap-27's **15.4 min** x 8 workers for T4 alone" | `natal-cap-27-t4-at13.js` prints "8 workers, **24.9 min** wall", progress lines marching 2.0 to 24.0 min |
| 2 | `natal-cap-32-wrap-identity.js` reading 3 | "**16 core-hours** for cap-27's exact march" | same tail: 1537.1 s whole run, T4 leg 24.9 min on 8 workers = **3.3 core-hours** |
| 3 | `natal-cap-39-triple-census.js`:717 (R11) | "the full C(K,3) leg at @29 has K ≈ **6800**" | `natal-cap-18-at29.js` prints "scour **7863** primes (31..80429)"; C(K,3) is 8.10e10, not 5.24e10 |
| 4 | `natal-cap-18-at29.js` reading 7 | "sum 2/q = **2.66**" at @31 | `natal-cap-22-at31-drift.js` prints `sum_scour 2/q = **2.524**`; recomputed 2.5236 (from 37) or 2.588 (from 31). Nothing yields 2.66 |
| 5 | `natal-cap-14-discrepancy-lemma.js` reading 4 | "cap-07 observed (**0.03** → 0.85)" | `natal-cap-07-trajectory.js` prints `min=0.017 max=0.853`. The 0.85 checks; the 0.03 has no counterpart there |
| 6 | `attack-D-twopoint.js` reading 4 | "slope 1.70 − 2/ln x = **1.00** at the log-mean level x = **13.1**" | its own OUTPUT: "at the log-mean level x = **14.0**: 1.70 − 2/ln x = **0.942**". The pair is not self-consistent either: 1.70 − 2/ln(13.1) = 0.923 |
| 7 | `a3-04-maxsum-recursion.js` reading 1 | "the T23 → T29 stream takes **14.4s**" | the embedded run prints **[26.9s]** for that fold, [31.6s] at the last copy |
| 8 | `natal-cap-36-skeleton-door.js`:449 reading 7 | "(**18.5 min**)" for the P6 pass | the recorded P6 rows time it at 658 s + 20 s = **11.3 min**, as the P6 note's own header states |

### B. Arithmetic that does not check out against printed values

| # | site | says | recomputation |
| --- | --- | --- | --- |
| 9 | `natal-cap-29-sigma-plateau.js` readings 4 and 7(c) | "×2.75/level measured vs ×2.70 predicted (**+1.7%**)" | the nine printed per-level P ratios have geometric mean **2.720**; predicted 2.7082; the gap is **+0.45%**. The +1.7% is reused in 7(c), so the wrong figure is load-bearing |
| 10 | `natal-cap-22-at31-drift.js` reading 5 | "@37: sum 2/q = **2.85** → **0.19W** → **1.4e12** strides" | summing 2/q over the 198,274 primes in (37, 2724103] gives **2.7293**; the same method reproduces this file's printed @31 value 2.524 to four digits. Corrected chain ≈ 2.729 / 0.182W / 1.35e12 |
| 11 | `natal-cap-24-boundK-curve.js` reading 5 | "monotone at every depth ≥ **3%**" | its own PART 4 3% column: @17 0.2614 → @19 **0.2040** → @23 0.3922. Monotone holds at 5%, 10%, 25%, 50%, 100%. The honest boundary is 5% |
| 12 | `attack-hybrid-bound.js`:496 reading 4 | "every other head prime pays between −0.07 and −0.28" | table (D1) row p = 5 pays **+0.078** and is marked "yes, worth taking". The endpoints themselves are legitimate roundings of −0.075 and −0.281 |
| 13 | `natal-cap-33-overnight.js`:605 (R3.1) | "1/lnlnW spans only **0.295..0.343**" | from the printed W ladder, 0.2951 at @37 and 0.3383 at @23, 0.4286 at @13. **No level gives 0.343.** The same span travels in `natal-cap-33-overnight.txt`:86 and `history/staging/qc-wave6-Y.md`:608 |
| 14 | `natal-cap-19-calm-lemma.js`:544 reading 1 | Z2 percentile **0.00007%** | printed rank 6/9,699,690 = **0.000062%**. The companion VR figure 0.00014% from rank 14 checks out |
| 15 | `natal-cap-30-skeleton-bound.js`:276 reading 1 | "verified ... at **599** primes" | the P1b ledger comparison covers 10/10, 34/34, 120/120 and 58/435 = **222** primes. 599 is the total scour-prime count, which is what P2 certifies |
| 16 | `natal-cap-14-discrepancy-lemma.js` reading 1 | "verified to **1e-15**" | the three printed Lemma 1 maxima are 9.2e-16, 2.7e-15, **6.2e-15**. The statement the OUTPUT supports is 1e-14 |
| 17 | `import-chaining-01.js`:429 reading 2 | "the measured value is **0.0875 to 0.1168**" | recomputed from printed METRIC and rms: 0.1168, 0.0976, 0.0875, 0.0788, **0.0530**. The z = 29 value sits below the stated interval. The P1 refutation is unaffected |
| 18 | `fold-profile-13-hotspot-sweep.js`:341 reading 2 | "at widths 80, 800 and 8000 the counts are **10x to 10,000x** larger" | against width 8 those widths give 10x, 100x, **1000x**. Top of the range overshoots by 10 |
| 19 | `fold-profile-05-survival-curve.js` reading 3 | "S/P = **0.892624**" | 895,790 / 1,003,543, both printed on that row, = **0.892627**. The rounded 0.8926 that everything downstream carries is correct |
| 20 | `attack-frontier37-01-word.js` reading 6 | "cmin gains **111** per step on average" | exact only as cmin(8)/8 = 888/8 counting from cmin(0) = 0; averaging the seven printed increments gives 816/7 = **116.6**. Both are now recorded in the file |
| 21 | `a3-09-histogram-operator.js` reading 8 | "mbar/ln^2 p ... **2.49** at p = **199**" | section 7b prints **2.502** at p = 199, which rounds to 2.50. 2.486 is p = 127's entry |
| 22 | `natal-cap-16-fast-variance.js` context note | "±3.1e-3 (@23) ... relative **4.6e-9**" | @29 and @31's relatives are bar/Var; @23's 4.6e-9 is bar/**E**. bar/Var at @23 is **1.26e-8**. One end of the triple uses the other denominator |
| 23 | `natal-cap-30-skeleton-bound.js`:284 reading 3 | "no30 stays ≤ 0.004" | true at @23 (max 0.0039); @13/@17/@19 print 0.0068/0.0070/0.0060. The paragraph's subject is @23, so this is scope, not a wrong number |
| 24 | `fold-profile-08-zone-localized-gap.js`:342 reading 3 | "**0.44**", given both as maxgap-law's constant and as an average of three numbers | the three derived ratios average **0.450**; `maxgap-law.md` reports c = **0.4463**; and `maxgap-law.js` carries **no embedded OUTPUT block at all** |

### C. A literature constant carried wrong

| # | site | says | truth |
| --- | --- | --- | --- |
| 25 | `natal5-variance.js`:238 reading 5 | `e^{2gamma}/4 = **0.7932...**` | **0.7930547395**, recomputed 2026-08-20. `natal-cap-22-at31-drift.js` prints 0.793055 in its embedded OUTPUT. The trailing ellipsis makes 0.7932 read as a truncation of the true decimal, which it is not. `natal-cap-11-kstar23.js`:482 already records a sibling slip, 0.79325 |
| 25a | `attack2-03-09-depth-formula.js`:19 and :166 | `e^{2gamma}/4 = **0.7935**` | **0.7930547395**. This is the value the corpus RETIRED on 2026-08-18. `research/history/CHANGELOG.md`:3859 closes that retirement with "Now 0.7931; **the only site in the corpus carrying it**". That sentence is false: these two sites were missed, one of them above the OUTPUT banner and therefore inside the code hash. Everything else in the corpus reads 0.79305 or 0.793055 and is correct. The other files containing a literal `0.7935` are a digit coincidence, `sup/(rms*sqrt(2 lnW))` at z = 23 |

### D. The reading is right and the OUTPUT block is wrong

| # | site | the block says | truth |
| --- | --- | --- | --- |
| 26 | `natal-cap-27-t4-at13.js` output line 374 (code line 309) | C(990,6) = **1.1e15** | **1.287912126756255e15**; reading 6's 1.3e15 is the correct one |
| 27 | `natal-cap-27-t4-at13.js` output line 345 (code line 261) | "C(990,3) = **160,940,540** triples" | C(990,3) = **161,226,780** |
| 28 | `level-ledger-tight.js`:865, PART 4 prose | "3^{(pi(19)−1)/2} = 46.7654 against R*(19) = 53.9728 is **15% high**" | 46.7654 is *below* 53.9728; reading 7 states it correctly as "15% **low**" |

Both of #26 and #27 are hardcoded string literals inside `console.log`, not
computed quantities, and no T3/T4 result depends on either. #28 is prose inside
an OUTPUT region. All three are outside this pass's editing rights and are
recorded here for the adjudicator.

### E. A claim of completeness that is false as written

| # | site | says |
| --- | --- | --- |
| 29 | `attack-lower-bound.js` READINGS header | "Every number below is in the OUTPUT block above." Twenty figures are not literally there. All twenty are benign (roundings, `e+6` against `e6`, and catalogue identifiers), but the absolute claim does not hold |

### F. Figures with no source anywhere

| # | site | figure | what was checked |
| --- | --- | --- | --- |
| 30 | `lemmaV-sup-extension.js` S2 | `P(29) = **6.5e8**` | no script prints it. The product of the odd primes to 29 is 3,234,846,615; 29# is 6,469,693,230; the product to 23 is 111,546,435; prod_{p<29}(2p−1) is 5.06e10 by the same staging report's own count. Carried identically in `history/staging/lemmaV-sup-extension.md`:180 and :621, so the two sites do not check each other. The sentence is safe either way |
| 31 | `natal-cap-34-wrap-precision.js` readings 6(a), 6(b), 6(e), 13, 14 | ~40 figures | real measurements from the 2026-08-18 W2 pass through invocations that were never pasted. Checked against every embedded OUTPUT in `research/`. Flagged in the file |
| 32 | `fold-profile-13-hotspot-sweep.js` readings 1, 2, 6 | 7 figures (medians 4.70/5.38, p10 4.28/5.01, p90 5.30/5.95, sd 1.007, skew +0.312) | a scratch Monte Carlo the reading itself calls "not this script", never pasted anywhere. It is the entire basis for retiring the sweep's one positive excess |
| 33 | `level-ledger-tight.js`:901 reading 9 | "2.5e-4 at x = 23" | Part 5's cell list is hardcoded to (11,13), (11,29), (13,17), (13,41); no x = 23 row has ever been printed and no p is named. Re-running the identical statistic at x = 23, p = 29 gives 2.51e-4, so the figure is right and undeclared |
| 34 | `natal-cap-03-dilation-ensemble.js` reading 4(b) | "mean sd(d_p/p) in the top tail is 0.192 = exactly the all-space baseline (0.192)" | OUTPUT prints 0.192 only as the top-1% statistic. **No all-space baseline appears anywhere in the run.** The advisory cannot see this one, because 0.192 is present verbatim |
| 35 | `a3-03-f-from-census.js` reading 7 | L band 30.8 to 42.9 at x = 1000 | verbatim in `research/f-decays.md`, which the reading names, but no script prints the pair and f-decays.md carries no script custody for the half-range re-anchoring behind it |

### G. Stale pointers, not wrong values

| site | cites | now at |
| --- | --- | --- |
| `fold-profile-05-survival-curve.js` reading 3 | FOLD-PROFILE.md:385 and :393 | 389 and 397 |
| `fold-profile-06-scale-free.js` reading 3 | FOLD-PROFILE.md:393 | 397 |
| `natal-cap-08-staircase.js`:502 | "line 343 of the output above" | output line 213, file line 426 |

All three shifts are benign and have the same cause: FOLD-PROFILE.md gained the
citation block at lines 404-410, which is exactly the repair both readings asked
for.

### H. Same name, two objects

`natal-cap-18-at29.js` reading 7 calls 0.8641 the "classical-correction model".
Continuing reading 4's bare series to @31 gives 0.8610; 0.8641 is
`natal-cap-22-at31-drift.js`'s "classical-record", raw plus the persisted @29
residual, which that file prints and defines. Also: `natal-cap-22`'s "5.3e11
naive strides" is attributed to cap-18's pricing but lives in cap-22's own
header above the banner as an a-priori estimate; the run's measured 2.524 gives
5.06e11.

## Per-file record

### Batch 1 (done by hand, the six heaviest files)

| file | untraceable | what they were |
| --- | --- | --- |
| `natal-cap-34-wrap-precision.js` | 127 | 13 ROUNDING, ~30 DERIVED (readings 5a-5d are arithmetic over the two cap-32 literals at line 596 plus [K]'s printed mu/Var), the rest an UNDECLARED RUN: the 2026-08-18 W2 pass measured the CAL4-vs-N table, the fixed-n cross-level table, the k = 1.9943 fit, the three-assembly comparison's rows 2 and 3, and the @17 operation counts through invocations that were never pasted. Flagged. |
| `lemmaV-sup-extension.js` | 45 | 21 ROUNDING (four of them bracket bands printed with decimals), 6 DERIVED, 13 BORROWED from `history/staging/lemmaV-sup-extension.md` and one from `history/staging/attack-beta2-01-lemmaV-meansquare.md` (attack 1's 7.8e10), 3 LITERATURE, 1 UNTRACED (`P(29) = 6.5e8`) |
| `natal-cap-32-wrap-identity.js` | 44 | reading 0's declaration already covers the `at13`/`at17` figures; 6 ROUNDING, 2 BORROWED and verified in `natal-cap-27-t4-at13.js`, ~10 DERIVED, **2 MISMATCH** |
| `a3-07-pane-overlap.js` | 42 | 8 SAME-VALUE-DIFFERENT-NOTATION, 17 ROUNDING, 12 DERIVED, 4 LITERATURE (5*C2, e^{2γ}/4, GLOSSARY's 4.95) |
| `attack2-rankin2d.js` | 34 | reading 0 covers the two `--deep` results; 12 TOKENIZER ARTIFACT (hyphenated ranges and comma lists), 3 notation, 15 ROUNDING, 1 IN-CODE, rest DERIVED |
| `fold-profile-15-variance-law.js` | 31 | 28 DERIVED (readings 2-4 are a control-subtracted re-analysis of the printed table), 1 ROUNDING, 2 IN-CODE |

### Three false-positive classes the advisory cannot see, measured here

1. **Hyphenated range.** `0.61-0.64` tokenizes as a figure `-0.64`. Both endpoints
   are usually printed. Four instances in `attack2-rankin2d.js` alone.
2. **Comma list or bracketed pair.** `[141,158]`, `p=97,113,149,173,199`,
   `(2,4,10,24,31,42,60,74)` each read as one number. Same family as the
   trailing-comma class `qc/tailfmt.js` records for 2026-08-19.
3. **Exponent notation.** The reading writes `1.7e10`, the run prints `1.7e+10`.
   Eight instances in `a3-07-pane-overlap.js`, three in `attack2-rankin2d.js`.
   `presentIn()` normalises commas and trailing zeros but not the exponent sign.

Together these three account for roughly a fifth of the figures examined so far
and are not defects of any kind.

### Batch 2 (by hand)

| file | untraceable | what they were |
| --- | --- | --- |
| `natal-cap-31-calm-vs-kill.js` | 28 | 13 ROUNDING, 9 DERIVED, 6 BORROWED (cap-38's `S̄ = 49,238.76` and margin row, cap-21's window means, cap-21 Thm 3's exhaustion), 0 untraced |
| `lemmaV-parseval.js` | 26 | 15 ROUNDING, 3 notation, 2 TOKENIZER (a `theta-ladder.md:408` line reference and a `beta_2 - 1.45` subtraction), 3 BORROWED and verified in `lemmaV-sup-extension.js`, 5 DERIVED, 1 DEFINITION |
| `natal-cap-35-x-multiplicity.js` | 26 | 8 BORROWED and verified in `research/OBSERVATIONS.md`:515 and `history/staging/xchannel-at23.md`:130/:217 (the addendum names both), 10 DERIVED, 3 ROUNDING, 2 TOKENIZER (level arrays), 1 DEFINITION (29# = 6,469,693,230) |
| `natal-cap-28-analytic-certificate.js` | 26 | 19 SAME-VALUE-DIFFERENT-NOTATION (the whole K*, K0.9 and Spred rows, printed `e+` and quoted `e`), 4 ROUNDING, 3 IN-CODE/DERIVED |

### Batch 3 (by hand) — the files that already carried a fortieth-pass declaration

These five were not undeclared; they were declared at the level of "this block
came from another invocation" and never at the level of the individual figure.
The pass adds the second level and confirms the first.

| file | untraceable | what they were |
| --- | --- | --- |
| `a3-08-adjacent-pairs.js` | 49 | all inside or quoted from the `[6b]` T31 leg reading 0 declares. Six of them independently cross-check against `a3-09-histogram-operator.js`, `import-sofic-01-graph.js` and `import-sofic-02-prediction.js`. Readings 9-11 are DERIVED |
| `attack-bf-split.js` | 21 | 15 are NOT FIGURES: a numdam article id, journal page numbers, a dpi range, a display number, an exponent's `-100c`, and two embed hash prefixes whose hex runs tokenize as `256`, `5857`, `10e3`, `107`. 2 BORROWED and verified in `attack-ford-halberstam.js`. 1 ROUNDING, 2 DERIVED |
| `a3-10-lower-tightness.js` | 18 | all from the `deep31` and `deep37` legs named in the header at lines 53-54; the default run prints the two headline results those legs land on. 1 ROUNDING, 1 DERIVED, 1 IN-CODE |
| `natal-cap-11-kstar23.js` | 16 | 3 ROUNDING, 3 BORROWED and verified, 5 DERIVED, 2 TOKENIZER, 3 DEFINITION. `e^{2γ}/4 = 0.793055` recomputed here as 0.7930547395, so the reading's six-place value is right and its own note about the memo's `0.79325` slip stands |
| `attack-beta2-04-loss-budget.js` | 15 | 6 SELF-DECLARED ROUNDINGS (the summary declares them in the act of quoting), 4 further ROUNDING, 3 notation, 3 IN-CODE/LITERATURE. Confirms the thirty-first-pass finding that this file carries no sourceless figure |

### Batch 4 (by hand) — the seventeen one- and two-figure files

Cheap and revealing: at this end of the ranking almost nothing is a
measurement. `01-zone-twin-share` (e^{2γ}/4), `import-bfree-03` (β₂),
`05b-twin-jacobsthal-segmented` (31# = 200,560,490,130) are DEFINITION or
LITERATURE constants. `attack-05-annulus-induction` (`A192870`),
`import-bfree-01-toeplitz` (`A048670`), `attack-foldL-01-census` (`(12,12)`)
and `scour-into-fixed-tile` (`29,41`) are TOKENIZER artifacts, three of them
OEIS identifiers. `fdecay-deep-02-window` is notation (`1e10` for `1.00e+10`).
`03-legendre-error-budget`, `attack-ab-coupling-01` (103 = 61 + 42),
`null-limsup-01-score` (1400 = 1000 + 400 reps) and `attack-foldL-03-transport`
(0.046 = 1.182 − 1.136) are DERIVED. `attack-04-fourier-budget` (117.3) and
`attack-ioslack-survey` (0.033 to 0.054 nats) are BORROWED and were verified in
`natal-cap-02-fourier-budget.js` and
`history/staging/attack-0c0e-level-selection.md`:335. Two are ROUNDINGS.

**Nothing at this end of the ranking was untraceable.**

### A hazard this pass hit, and every later pass will

**A provenance line that wraps the word `OUTPUT` to the start of a line steals
the tail.** `tailfmt.locate` scans BACKWARDS for the last `// OUTPUT`, so a
sentence like "present in other files' embedded / OUTPUT, which is a
cross-check" splits across two lines and the second one becomes, to the parser,
a new OUTPUT banner at the foot of the file. The real tail then has no
fingerprint and the file reappears as `hand-pasted-tail`. It happened twice
here, in `a3-08-adjacent-pairs.js` and `natal-cap-32-wrap-identity.js`, and
`hand-pasted-tail` went 3 to 5 before it was caught. The fortieth pass wrote
the standing rider for exactly this; the rider is worth repeating with the
detection method attached:

```
for f in $(find research -name '*.js'); do
  n=$(grep -cE '^[[:space:]]*//[[:space:]]*OUTPUT\b' "$f")
  [ "$n" -gt 1 ] && echo "$n  $f"
done
```

Legitimate multiples: `qc/selftest.js` (fixtures), `natal-cap-33-overnight.js`
and `h2-length-needed.js` (declared composites). Anything else is a stolen tail.
Both were repaired by rewording the appended prose. No OUTPUT block was touched.

### Adversarial pass on the mismatch list (2026-08-20, same day)

The campaign rule is that a headline gets one adversarial pass before it is
believed. Seven of the mismatches were recomputed here from scratch rather than
taken from the agent that found them. All seven hold.

| # | claim | independent recomputation |
| --- | --- | --- |
| 26 | C(990,6) is not 1.1e15 | **1,287,912,126,756,255**, so the reading's 1.3e15 is right and the printed 1.1e15 is not |
| 27 | C(990,3) is not 160,940,540 | **161,226,780** |
| 3 | C(7863,3) against C(6800,3) | **8.099e10** against **5.238e10**; K at @29 is 7863 |
| 9 | `natal-cap-29` geo mean | printed step column gives **2.7204**, identical to (P(41)/P(7))^(1/9); R_pred column gives **2.7082**; gap **+0.45%**, not +1.7%. Both figures sit in the READINGS region, not the OUTPUT block, so this is a reading defect and not a code one |
| 10 | `natal-cap-22` @37 stride budget | sieved: **198,274** primes in (37, 2724103], sum 2/q = **2.7293**, not 2.85. The same sieve reproduces the printed @31 value: 37,534 primes, sum **2.5236** against the printed 2.524 |
| 4 | `natal-cap-18`'s 2.66 at @31 | same sieve: **2.5236**. Nothing yields 2.66 |
| 13 | `natal-cap-33`'s 1/lnlnW span | the whole ladder is 0.4286, 0.3882, 0.3600, 0.3383, 0.3208, 0.3068, **0.2951** at @13..@37. 0.343 is not any level's value |
| 25 | e^{2γ}/4 | **0.7930547395**. `0.7932...` is wrong in the fourth decimal; `0.793055` and `0.79305` are right |

Second round, eight more recomputed from the printed values alone. All eight
hold.

| # | claim | independent recomputation |
| --- | --- | --- |
| 6 | `attack-D-twopoint` reading 4 | 1.70 − 2/ln(13.1) = **0.9226**; 1.70 − 2/ln(14.0) = **0.9422**, which is the printed 0.942. The reading's "1.00 at x = 13.1" matches neither |
| 14 | `natal-cap-19` Z2 percentile | 6/9,699,690 = **0.000062%**; the companion rank 14 gives **0.000144%**, which is the reading's 0.00014% |
| 15 | `natal-cap-30` P1b coverage | 10 + 34 + 120 + 58 = **222** primes compared, against the 599 claimed |
| 18 | `fold-profile-13` width factors | 80/8, 800/8, 8000/8 = **10, 100, 1000** |
| 19 | `fold-profile-05` S/P | 895,790 / 1,003,543 = **0.892627421** |
| 20 | `attack-frontier37-01` cmin | 888/8 = **111** exactly, and the seven printed increments average 816/7 = **116.57**. Both readings of "per step" are defensible, which is why both are now written down |
| 24 | `fold-profile-08`'s 0.44 | `research/maxgap-law.js` contains **zero** OUTPUT banner lines, so it has no embedded output of any kind; `maxgap-law.md`:176 gives c = **0.4463** as the whole-period twin measurement |
| 29 | `attack-lower-bound`:958 | the sentence "Every number below is in the OUTPUT block above" is there verbatim, and twenty figures below it are not |
| 34 | `natal-cap-03`'s baseline | the run prints 0.192 on exactly one line, "top-1% pooled (1972 tuples): ... clustering sd(d_p/p)=0.192". There is no all-space baseline line anywhere in the run |

Third round, four more checked against the printed block directly.

| # | claim | what the block shows |
| --- | --- | --- |
| 11 | `natal-cap-24` monotonicity at 3% | PART 4's 3% column reads @17 **0.2614**, @19 **0.2040**, @23 **0.3922**. Not monotone |
| 12 | `attack-hybrid-bound` head primes | the (D1) row `1000003 | 5 | 11 | 11 | 0.194 | 0.116 | **0.078** | yes` is inside the stated scope and pays positive. The endpoints −0.075 and −0.281 are printed on the p = 29 and p = 53 rows |
| 16 | `natal-cap-14`'s 1e-15 | the three printed Lemma 1 lines read max rel err **9.2e-16**, **2.7e-15**, **6.2e-15** over 10, 34 and 120 anchored steps |
| 28 | `level-ledger-tight` PART 4 prose | "3^{(pi(19)-1)/2} = 46.7654 against R*(19) = 53.9728 is 15% **high**" is there verbatim, and 46.7654 is below 53.9728 by a factor 1.154. Reading 7's "15% low" is the correct direction |

## What the pass measured about the advisory itself

**The advisory's false-positive floor is much higher than the framework
assumed.** `qc/README.md` names one class, prose arithmetic over printed values,
and calls its floor "real". It is real and it is not alone. Measured over the
files read here, six classes account for the majority of every figure the
advisory lists, and only one of them is a defect of any kind:

| class | what it is | is it a defect |
| --- | --- | --- |
| ROUNDING | the reading quotes a printed value to fewer digits | no |
| SAME VALUE, DIFFERENT NOTATION | reading writes `1.7e10`, run prints `1.7e+10` | no |
| TOKENIZER ARTIFACT | ranges `0.61-0.64`, pairs `(12,12)`, lists `p=97,113,149`, OEIS/DOI/arXiv ids, line references, page ranges, hex hash prefixes | no, and not a figure at all |
| DERIVED | arithmetic done in the reading over printed values | no, but it should say so |
| IN-CODE | a literal above the banner, often a borrowed constant | no, and the code usually names its owner |
| LITERATURE / DEFINITION | β₂, C₂, e^{2γ}/4, a primorial, a cited paper's value | no |
| BORROWED | printed by a different script or document | only if undeclared |
| UNDECLARED RUN | a real measurement from an invocation never pasted | **yes** |
| STALE | contradicts its source | **yes** |

`SAME VALUE, DIFFERENT NOTATION` is worth fixing in the tool rather than in the
corpus: `tailfmt.presentIn()` already normalises commas and trailing zeros, and
one more normalisation of the exponent sign would remove nineteen of
`natal-cap-28-analytic-certificate.js`'s twenty-six findings, eight of
`a3-07-pane-overlap.js`'s forty-two, and six each in three more files. The
tokenizer classes could be narrowed the same way the trailing-comma class was on
2026-08-19. Neither change is made here: this pass was told to write
declarations, not to edit the checker, and a checker edit belongs in its own
pass with its own selftest fixtures.

## Why the count goes UP, and what to use instead

The advisory counted **1,592 untraceable figures across 150 files** at the start
of this pass and **1,998 across 149** at the end. That is the fortieth-pass
rider working exactly as it said it would: a declaration that says "0.8824 is a
rounding of the printed 0.882353" adds two figures the OUTPUT block does not
contain. Driving this number down would mean deleting provenance.

The number to watch instead is the one this file now carries: **how many of a
script's untraceable figures have a written classification.** That number was 0
before this pass.

### Added by the later batches

| # | site | says | its source or the recomputation |
| --- | --- | --- | --- |
| 36 | `04-crystallization-and-hl.js` reading 3 | "act/HL in [0.977, **1.0002**]" | the run prints eight act/HL values: 0.9866, 0.9771, 0.9931, 0.9940, **1.0030, 1.0045, 1.0009**, 0.9998. The printed interval is [0.9771, **1.0045**]. 1.0002 appears nowhere and is below the actual maximum. The lower end and the "±1.1 standardized deviation" (printed 1.10 at p = 3203) both check out |

Stale pointer, added to section G: `fold-profile-10-lineage-census.js` reading 4
cites `FOLD-PROFILE.md`:320-321 for a sentence now at :324-325, the same
four-line shift as the other three.

Two items examined and NOT defects, recorded so they are not re-flagged:
`fold-profile-10-lineage-census.js`'s 440,312 against its own printed 440,311 is
a deliberate, explained off-by-one (the mod-6 comb omits (3,5)) and reading 4
exists to say so; `verify-ladder-big.js`'s 54.1 against 53.0 minutes is the
already-documented stopwatch difference between the 2026-08-14 run and the
`--force` rebind.

| # | site | says | its source or the recomputation |
| --- | --- | --- | --- |
| 37 | `h2-length-needed.js` reading 1 | the p = 2-start refit "returns **1.176, 1.198, 1.258** ... computed here rather than taken on report" | the embedded run prints only the p = 5 prefixes, whose matching entries are **1.191, 1.238, 1.282** (section (b), rows at 10/19/56 terms). No script in `research/` prints the p = 2 triple. The three numbers entered with the readings in `88d2287` from a side computation never declared |
| 38 | `natal-cap-12-overlap-sign.js` reading 2 | "(+0.90σ)" attached to the model gap | the one-line model gives 11,078,586 − 35,906 = 11,042,680 against the printed S2 = 11,044,311, a gap of **1,631**. The run's exact @23 residual is **1,382** with structured term **−35,657**. The +0.90σ is the printed z of the 1,382 residual, not of the 1,631 gap |
| 39 | `natal-cap-20-third-order.js` reading 8 | the window-excess constant ≈ 1.81 has "no classical counterpart on the shelf" and is "the natural next target" | `natal-cap-17-cheap-laws.js` marks that constant SUPERSEDED: `natal-cap-18-at29.js` measures the @29 step at **1.562**, so it drifts, and `natal-cap-25-excess-law.js` derives the drift parameter-free. The producer prints **×1.814**; 1.81 is cap-17's own rounding via 2^0.859 |

Fourth round, four more read straight off the printed block.

| # | claim | what the block shows |
| --- | --- | --- |
| 5 | `natal-cap-14`'s "cap-07 observed (0.03 → 0.85)" | `natal-cap-07-trajectory.js` prints three ratio lines: `mean=0.435 min=0.129 max=0.771`, `mean=0.511 min=0.070 max=0.824`, `mean=0.573 min=0.017 max=0.853`. The 0.85 is the third row's max. **No row has 0.03**; the smallest minimum is 0.017 |
| 21 | `a3-09`'s "2.49 at p = 199" | section 7b prints p = 97 → **2.495**, p = 127 → **2.486**, p = 199 → **2.502** |
| 22 | `natal-cap-16`'s relative bars | 3.08e-3 / 669,028.799 = **4.604e-9**, which is bar over **E**; 1.36 / 5,307,862.625 = **2.562e-7** and 743 / 127,363,168 = **5.834e-6**, which are bar over **Var**. The triple mixes two denominators |
| 37 | `h2-length-needed`'s p = 2 triple | the run's section (b) prints `[5,37] 1.191`, `[5,73] 1.238`, `[5,271] 1.282`. **1.176 is not in the file** |

## Coverage, and the one deliberate exclusion

Every file the advisory lists now carries a written classification of its
untraceable figures, with one exclusion made on purpose:

**`research/qc/selftest.js` is left alone.** It appears in a local walk of
`research/` with two untraceable figures, but `qc/corpus.js` excludes it from
`C.scripts`, so it is not one of the advisory's 148 and never was. Its READINGS
region is a set of FIXTURES for the checks themselves. Appending prose to it
would change what the selftest asserts about its own parser, which is the one
edit in this repository that cannot be made safely from outside the framework.
Anyone who wants its two figures documented should do it as part of a selftest
change, with the fixtures re-derived.

Fifth round.

| # | claim | what the block shows |
| --- | --- | --- |
| 23 | `natal-cap-30`'s "no30 stays ≤ 0.004" | the five printed `max|no30|` values are **0.0024, 0.0068, 0.0070, 0.0060, 0.0039**. The bound holds at the first and last level and fails at the three in between. (The batch that found this named only the last one; the first, 0.0024, also satisfies it.) |
| 30 | the `P(29) = 6.5e8` candidates, recomputed | odd primorial to 29 = **3,234,846,615**; 29# = **6,469,693,230**; odd primorial to 23 = **111,546,435**; prod_{3≤p≤23}(2p−1) = **16,874,983,125**, which is the staging report's 5.06e10 once the p = 2 factor of 3 is included; prod_{3≤p≤29}(2p−1) = **961,874,038,125**. None is 6.5e8 |

### Added by batches I and J

| # | site | says | its source or the recomputation |
| --- | --- | --- | --- |
| 40 | `attack-beta2-A-B-bounded.js`:813 | "all **twenty** steps, 1.3833 → **1.5471** over z = 13..**73**" | the embedded S5 ladder has **eleven rows, z = 13 to 53**, ending at B = **1.5201580**, a rise of 9.90% over ten steps. The z = 73 row exists, but only in `history/staging/attack-AB-bounded.md`:253 (B = 1.5471042), announced in `CHANGELOG.md`:2392. **No embedded script tail anywhere carries it.** The sharpened classification is now written into the file: BORROWED from that report, not untraceable, and not re-derivable in place |
| 41 | `removal-ledger.js`:88 | the union-bound ratio **2.66** over the remover range (37, ~450000] at T31 | summing 2/q over that range gives **2.4703** (2.4696 to the exact endpoint sqrt(T31) = 447840); including 37 gives **2.5236**, which is what `natal-cap-22-at31-drift.js` printed as `sum_scour 2/q = 2.524`. Nothing over this window yields 2.66. Same figure and same defect as #4 at `natal-cap-18-at29.js` |
| 42 | `fold-profile-03-inside-copy0.js`:449 | "In **SIX** of those eleven the single kill is p^2−2" | regenerating all eleven kill sets from the stated Head Lemma reproduces the listed sets exactly and the count is **FIVE**: (5,7), (11,13), (17,19), (31,37), (41,43). Only the tally is wrong; the sentence's point (five outnumbers three) survives |
| 43 | `natal-cap-05-second-moment.js`:458 | "verified to **1e-10** at every level" | the printed identity errors are 2.1e-14 (@11), 2.5e-12 (@13) and **1.3e-10** (@17). The @17 level sits above the quoted threshold |
| 44 | `removal-ledger.js`:88 | "~37,000 primes" | the exact count in (37, 450000] is **37,694** |
| 45 | `attack-foldL-04-localized.js`:468 | "the left side is 2c*421/89.15 = **11.6** at c = **1.22**" | 2 × 1.22 × 421 / 89.15 = **11.5226**. The balance against ln 105790 = 11.56921 is at c = **1.22492**; 11.6 is the left side at c = 1.2282. Rounding c to two decimals, amplified by the ratio. Reading [4]'s crossing conclusion is unaffected |
| 46 | `grain-census.js`:468 | "the e^{6/g} factor: 0.4117 x **1.2386**" | from the exact g = 223092870/7952175 = 28.05432, e^{6/g} = **1.23846**; from the printed g = 28.05, 1.23850. 1.2386 is 0.510/0.4117 back-solved at three digits. The product still lands on the printed 0.510 |

Two custody notes from the same batches, not mismatches:
`redteam-DP1-certificate.js`'s 1.020 has no embedded producer anywhere; its
source was a session scratchpad (`mono-h1.js`) and the only custody is
`history/staging/monotonicity-sweep.md`. `xchan-at29-01-segmented.js`'s 1.203 GB
borrows a figure that `natal-cap-39-triple-census.js` itself labels
"[MEASURED, off-block]", so the R1 comparison pairs one embedded figure with one
that is not.

Sixth round.

| # | claim | recomputation |
| --- | --- | --- |
| 42 | `fold-profile-03`'s "SIX of those eleven" | the eleven kill sets the reading itself lists are [47], [11], [167], [17], [359], [], [29,839], [], [1367], [41], [1847] over p = 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43. Against p and p²−2: the single kill is **p²−2** in 47, 167, 359, 1367, 1847 = **five**; it is **p** in 11, 17, 41 = three; two sets are empty and one has both. 5 + 3 + 2 + 1 = 11. **Five, not six** |
| 40 | `attack-beta2-A-B-bounded`'s ladder | the embedded S5 rows run z = 13 (B = 1.3832631) to z = 53 (B = 1.5201580); the only sites carrying 1.5471 are `history/staging/attack-AB-bounded.md`:253/:256/:655 and `CHANGELOG.md`:2392 |
| 43 | `natal-cap-05`'s 1e-10 | the three printed `pair-form == bucket VarRot: max|err|` lines read 2.1e-14, 2.5e-12 and **1.3e-10** |

Twenty-one of the mismatches above were recomputed here independently of the
agent that found them. All twenty-one hold.

## The remainder, ranked

There is no file remainder. Every file on the advisory carries a written
classification. What remains is work of three other kinds, ranked by what it
would buy:

1. **Adjudicate the 46 mismatches.** They are listed above with both values.
   Three of them (#26, #27, #28) live inside OUTPUT regions or code and cannot
   be repaired from a readings pass at all; #25a additionally falsifies a
   completeness claim already committed to the CHANGELOG, which means the
   2026-08-18 constant sweep needs re-running rather than trusting its own
   closing sentence. Nine (#9, #11, #12, #14, #15, #16, #23, #29, #42) are
   statements a reader would repeat, and the numbers behind them are printed
   right there.
2. **Fix the checker rather than the corpus, for two classes.** Normalising the
   exponent sign in `tailfmt.presentIn()` and teaching `figures()` to skip a
   comma or hyphen that sits between two digits inside brackets would remove
   several hundred findings that are not defects. It needs its own pass and its
   own selftest fixtures; the trailing-comma fix of 2026-08-19 is the template.
3. **Decide what to do about the undeclared runs.** Sections F of the mismatch
   list names them: `natal-cap-34`'s W2 pass, `fold-profile-13`'s scratch Monte
   Carlo, `attack-beta2-A-B`'s z = 73 ladder, `h2-length-needed`'s p = 2 triple,
   `redteam-DP1-certificate`'s `mono-h1.js`, `level-ledger-tight`'s x = 23 cell.
   Each is a real measurement with no re-runnable record. Two of them
   (`fold-profile-13`, `attack-beta2-A-B`) are load-bearing for a verdict.
### Added by batch H (extracted from the blocks it wrote)

| # | site | figure | what was checked |
| --- | --- | --- | --- |
| 47 | `import-chaining-02.js` readings 1 and 4 | 2.5769 (lag-1 subgaussian ratio at z = 23) and the moment triple 0.998 / 1.022 for R at z = 23 | section S1 runs z = 13, 17 and 19 only; z = 23 needs W = 223,092,870. The reading says "measured separately" but no embedded run in the corpus carries either. The only corpus hit on 2.5769 is an unrelated LP solver s-value in `lp-push-x43.js`; the 0.998 matches a printed m4/3 at z = 19 lag 256 by digit coincidence. **Re-run S1 at z = 23 before either is quoted load-bearing** |
| 48 | `natal-cap-37-at41-march.js` custody addendum | 0.41 s, 50e6 per s, 18.6x | PART 0.5 of a 2026-08-18 re-run whose transcript was never embedded; the pasted [A] log carries the archived machine's 0.63 s / 32e6 / 30.0x instead. The three are mutually consistent with the pasted 20.5M-strike probe, so they read as a genuine benchmark. Timing benchmarks are expected to move between machines and nothing rests on these |
| 49 | `natal-cap-37-at41-march.js` reading 5 | np = 74,987,566,147, S = 4,532,204,145, block 32000 | traceable only to the ELIDED part of an off-repo log. The pasted [R] block prints the blk 2000 tick and then removes 145 further ticks; the blk 32000 tick is inside that removal |

`natal-cap-37-at41-march.js` is the sharpest case in the whole pass and it is
honest about itself: its OUTPUT block is three logs pasted from
`~/Files/primeoire-runs/at41/`, outside version control, one of them with a
marked elision. "The file's own printed evidence" there means "a log this
repository cannot re-run". The advisory put this file near the top of its
ranking on the day it landed, and that judgement holds.

### Batch H's mismatches

| # | site | says | recomputation or the printed block |
| --- | --- | --- | --- |
| 50 | `attack-02-head-bias.js` reading 2 — **the one leg the 2026-08-17 audit says still stands** | the ratio "is **1.000** (to 3 decimals) for all x ≥ ~p³" | the printed table at the first checkpoints past p³: p = 13 (p³ = 2197) gives x = 3157 → **0.999**, x = 9977 → **1.001**; p = 17 gives x = 9977 → **1.006**; p = 19 gives x = 9977 → **1.001**, x = 31528 → **0.998**. Only p = 23 matches the letter of the claim. Verified here against the block, 2026-08-20. The honest form is "within ~0.007 of 1 from x ~ p³, settling to 1.000 a factor of a few later" |
| 51 | `natal-cap-38-loudness-driver.js` reading 6(iii) | measured-S̄/N to naive-product ratio **0.97, 1.01, 1.10, 1.17** | recomputed from the file's own printed S̄ and N with the code's scour sets: **0.9736, 1.0217, 1.1138, 1.1882**, i.e. 0.97, **1.02, 1.11, 1.19**. Three of four are low by one in the second decimal. The claim that the discrepancy grows with level survives and strengthens |
| 52 | `natal-cap-25-excess-law.js` reading 7 | the @31 direct variance pass is **6.5e9** d's | the pass runs d up to the largest grid length; @29 prints `d ≤ 2.09e8` = W(29)/31, so the same construction at @31 gives W(31)/37 = **5.42e9**. 6.5e9 is exactly W(29) = 6,469,693,230, the @29 **tile size** standing in for the @31 d-count |
| 53 | `attack2-01-06-seam-census.js` reading 3 | "C_head matches fair share to **0.03%** (2473 vs 2472.5)" | that pair is the P = 30030 line and gives **0.02%**. 0.03% belongs to the P = 510510 line (2181 against 2181.6, 0.0275%). The bound is true of both; the parenthetical is attached to the wrong one |
| 54 | `natal-cap-25-excess-law.js` reading 4 (soft) | "σ_med step by ~×**1.55** per added prime" | printed steps 1.350, 1.439, 1.689, 1.349, 1.687: geometric mean **1.495**, arithmetic **1.503** |
| 55 | `natal-cap-25-excess-law.js` reading 2 (soft) | "σ²/mean collapses **0.20** → 0.009" | the @17 grid's endpoints compute to **0.183** and 0.0094 |

## Coverage, counted

148 of 148 advisory files carry a `FIGURE PROVENANCE (added 2026-08-20)` block.
Which classes those blocks had to invoke, counted by file:

| class | files invoking it |
| --- | --- |
| DERIVED IN THIS READING | 100 |
| ROUNDING | 73 |
| BORROWED | 66 |
| TOKENIZER ARTIFACT | 57 |
| DEFINITION / LITERATURE | 48 |
| IN-CODE | 35 |
| SAME VALUE, DIFFERENT NOTATION | 31 |
| **[UNTRACED — verify before quoting]** | **23** |

**Twenty-three files carry an untraced flag**, and that is the number this pass
existed to produce: `a3-04-maxsum-recursion`, `04-crystallization-and-hl`,
`attack-D-twopoint`, `fold-profile-08-zone-localized-gap`,
`attack-beta2-A-B-bounded`, `natal-cap-27-t4-at13`, `attack2-03-09-depth-formula`,
`natal-cap-37-at41-march`, `fold-profile-11-lineage-yield`,
`fold-profile-13-hotspot-sweep`, `h2-length-needed`, `import-chaining-02`,
`level-ledger-tight`, `lemmaV-sup-extension`, `natal-cap-18-at29`,
`natal-cap-22-at31-drift`, `natal-cap-29-sigma-plateau`, `natal-cap-33-overnight`,
`natal-cap-34-wrap-precision`, `natal-cap-39-triple-census`,
`natal-cap-32-wrap-identity`, `natal-cap-36-skeleton-door`, `removal-ledger`.

The other 125 files needed no flag at all: everything in them was a rounding, a
notation difference, a tokenizer artifact, arithmetic done in the reading, a
constant in the code, a literature value, or a borrow that verified.
