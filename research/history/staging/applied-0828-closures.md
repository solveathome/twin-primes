# Applying the 2026-08-28 closures red team to the five HELD notes

<!-- ledger
id: Q-applied-0828-closures
status: ANSWERED
todo: 10 (retired), 1c (retired), 1d, Z5b (retired), 0
question: Were the closures red team's corrections applied to the five HELD notes?
verdict: Applied. 47 prose corrections across the five notes; c2prime-refit-22 drops from CLOSED to PARTIAL and three ledger verdicts are rewritten; four producer READINGS blocks and eleven live-document lines carry the same defects and are listed here uncorrected, behind the fence.
-->

*2026-08-28, branch `opus-try`. Input: `research/history/staging/redteam-0828-closures.md`.
Every WEAKENED and REFUTED grade in that pass is applied to the note it targets,
in present tense, with no correction block, per the house doc convention.
Corrected sentences supplied by the red team are used as supplied; where none was
supplied the minimal correct sentence is written. Nothing was recomputed: every
figure below comes from the red team's note or its producer
`research/history/staging/redteam-0828-closures.js`.*

**Fence.** Five `.md` notes edited and this record written. No `.js` producer was
touched, no live document, no other staging note, and no git command was run.
`research/qc.js` was not run, so the generated `research/QUESTIONS.md` is stale
against the ledger blocks below until someone regenerates it.

---

## 1. `rho2-analytic-bound.md` (TODO 0), 10 edits

| section | old reading | new reading |
|---|---|---|
| ledger `verdict` | Chebyshev diverges from RML, no floor figure | adds the corrected floor: the true `C_L = ms = 1` floor clears at z = 41 and 43 and misses by 2.155× at z = 47 |
| §0 bullet 2 | "the ratio WIDENS with z"; "the measured truth grows at roughly half that rate" | widens but not monotonically (1.745e+14 at z = 29 exceeds 1.653e+14 at z = 31); the measured ⟨ρ̃²⟩ exponent 13→47 is 4.511, 75% of the stated z⁶ and 44% of the effective 10.2054 |
| §0 [MEMORY] bullet | RS quoted, "zero violations" over sixteen sampled z | the quoted RS form is FALSE at x = 109 and x = 113 (1.001320, 1.003226) and holds from 127 to 3.3e7; the sixteen-z sample missed both, so the sampling passed, not the check |
| §2, after FORM I* | "Validity: all z for which the RS bound holds (RS states x > 1)" | not all z; FORM I* carries a validity floor, and PROVEN only above it |
| §4 floor paragraph | the cited `R1f` column is "the ABSOLUTE FLOOR (C_L = 1 and ⟨ρ̃²⟩ = 1)" | `R1f` is `C_L = 1` with the MEASURED mean square; the true absolute floor is `(3W)^{1/3}`, and `attack-rhoms-01.js` S5 already keeps the two apart |
| §4 table | one ratio row, 0.012 … 15.346 | two rows: the cited measured-ms row unchanged, plus the true `C_L = ms = 1` row 0.012, 0.011, 0.020, 0.028, 0.032, 0.080, 0.123, 0.282, 0.852, 2.155 (R5) |
| §4 verdict sentence | "misses by a factor 15.346, or 0.7093 of exponent, at z = 47" | misses by 2.155×, 0.1994 of exponent, at z = 47; clears at 41 and 43; the measured-ms floor is the one failing from z = 41 at 1.474×, 5.000×, 15.346× |
| §5 reading 2 | "MS1's steps (1), (5) and (6) each verify with zero violations" | step (6)'s binomial half verifies; its RS half fails at z = 109 and 113, which is a validity floor rather than a defect in MS1 |
| §5 readings 4 and 6 | "widening with z"; "misses RML by 0.7093 of exponent … at its absolute floor" | not monotone; and the true absolute floor clears at 41 and 43 and first misses at 47 by 2.155× |
| §6 falsifier, §8 | "only the closed constant 170.88 is at risk" | 170.88 = (27/16)e^{8γ} comes from Mertens' leading term and is not at risk; what moves is the (1+1/(2ln²z))⁸ factor and the validity floor, sized at +29% under (1+1/ln²z)⁸ |

Untouched, as the red team grades them: MS1 steps 1 and 3–5, `81/48 = 27/16`,
`3.2134e+14` at z = 47, `log_z = 10.2054`, the divergence mechanism, and the
"ingredient, not route" closure.

## 2. `excess-chain-c.md` (TODO 10), 12 edits

| section | old reading | new reading |
|---|---|---|
| ledger `verdict` | "tends to 1 for any correlation length … c = 1.05 +/- 0.06 flat" | tends to 1 for any FIXED correlation length; c = 1.05 +/- 0.07 (sd) over x = 17..31, which does not separate 1.05 from 1.074; what is refuted is the derivation, not the value |
| §0 lead | "The correction accounts for the small-k transient at x = 7 and for nothing after it" | the apparent x = 7 fit is the asymptotic's own 5.8% error at n = 10.5; with exact maxima the x = 7 residual is +7.9% and the zero-parameter log-rms worsens 0.1489 → 0.1614, so the correction accounts for nothing at any level |
| CALIBRATION | "the eight inputs, all imported from embedded artifacts" | seven of eight; E_med(31) is read off the hand-pasted RUN 1 tail that `TODO.md` line 457 lists as unbound |
| §2 consequence 1 | limit exactly 1, full stop | limit exactly 1 at fixed ν; if ν grows with L the limit is √(lim ln n/L), and PART 3 measures ln n/L drifting to 1.32–1.41 |
| §3 custody, §5 falsifier 3 | "better than 3% at six of eight levels" | five of eight, and better than 6.5% at all eight; the two failures are 3.8% at x = 11 and 5.6% at x = 19 |
| §3 model comparison | log-rms 0.1489 vs 0.1153 read as evidence against the correction | both rms use N, not N − k; ΔAICc = 0.36, F = 1.67 on (8,7) against a 5% critical value near 3.7, so the rms comparison carries nothing. The verdict is carried instead by the residual sign: +0.06 … +2.94 sd, positive at 8 of 8, sign test p = 0.0039 |
| §3 A·Gumbel | "A = 1.1445 … renames c" | adds ΔAICc = 9.7 over the constant, and that A and the fitted block count are one number since ln n/L = A² = 1.3099, so only the normalisation is off by 14.5% |
| §3 closing | "c = 1.05 ± 0.06 over x = 13..31, not c = 1.074" | x = 17..31, mean 1.0482, sample sd 0.0657, slope +0.0069 ± 0.0048 (t = 1.44, 3 dof); dropping the single @17 point gives 1.0772 ± 0.0114 over x = 19..31, which contains 1.074; the window start is not argued in either direction |
| §5 falsifier 1 | "mid-tail heavier, far tail lighter … is the right sign to lift c. NOT CHECKED" | checked and refuted in every family built: four sub-Gaussian families all LOWER E[max] at n = 2.1e5 by 13% to 51%; the @23 tail enumeration is still the direct check and has not run |
| defects, bullet 1 | cap-25 reading 5 "roughly offset" is wrong | kept, and quantified: reading 5's own 10–20% centering predicts c* ≈ 0.80–0.90 against a measured c* = 0.972 |
| defects, bullet 2 | "the difference has never been sized" | sized: dL = 0.144 on L = 12.257, about ±0.006 in c, so it does not matter |

Status stays `CLOSED`: the question as posed ("does c pin to 1.074 via a
compressed-tail max correction") is answered NO, and only the positive
counter-claim about the value moved.

## 3. `c2prime-refit-22.md` (TODO 1c), 11 edits

| section | old reading | new reading |
|---|---|---|
| ledger `status` | CLOSED | **PARTIAL** |
| ledger `verdict` | "0.334 vs 0.375 per ln ln x, gap 0.63 of the control's own sd" | the red team's supplied verdict: the matched-pair difference is 0.0401 = 0.12 of the window sd, and whether the drift is real is NOT closed here, since attack-c2drift-01 measured it at p = 0.0053 on x ≥ 17 with (i)′ and (ii) alive |
| §0 premise 3 | attack-c2drift-01 "closed the twin-specific readings" | adds its §3: drift real on x ≥ 17, b = 0.3351 ± 0.1098, p_logn = 0.0053, p_EV = 0.0075, two candidates alive and the data unable to decide |
| §1 open | "understate the true spread by a factor of 2.47" | 2.47 against the whole control column, 1.84 phase-matched on x ≥ 59 |
| §1 failed-as-measurement | 2.47×, negative in 23 of 51 (45%) | keeps those as whole-column figures and adds the phase-matched null the file's own §C5 argument requires: 39 windows, sd 0.2602, ratio 1.84, negatives 16 of 39 (41%); also records the ruler inconsistency, since the same slope is 2.65 se from zero on the nominal ruler |
| §2 model ranking | "the same seven models in the same order at 22 terms as at 10" | same best two and worst two; ranks 3 and 5 swap in the file's own table |
| §2 phase anchor | "c₂′'s minimum is at x = 29" | c₂′(13) = 0.4469 against c₂′(29) = 0.4463 is 0.03 of the column's sd, so which is the minimum is unresolved |
| §2 fits table | pre-refit Qg and margin cited to `exponent-control.md` §4/§6 | those two figures live only in `exponent-control.js` lines 201 and 545 |
| §2 gap sentence | "0.2192 … 0.63 of the control's own ten-point sd. The two rates are indistinguishable" | names which pair the 0.63 belongs to (the long post-dip lever), adds 0.84 phase-matched and 1.53 nominal σ, and gives the matched-primes gap 0.0401 = 0.12 |
| §2 candidate (a) | "the same verdict attack-c2drift-01.md §1 reached" | §1 found class-count-blindness, §3 found the drift significant and left two candidates alive; this file adds only the x ≥ 41 band statement |
| §3 verdict | "Item 1c closes at the level the data supports" | item 1c does not close; one half closes (class-count-blind, rate unmeasurable on x ≥ 41) and the reality of the drift stays where attack-c2drift-01 §3 left it |

## 4. `hsubpow-explicit-K.md` (TODO 1d), 5 edits

| section | old reading | new reading |
|---|---|---|
| §0 item 2 | "`K*` is **not** sublinear" | `K*` is **unbounded**, so no constant `e^K·Ĝ(b)` dominates it; sublinearity is not the property the route needs, and Lemma 1's own floor `(b−1)y/ln y` is `o(y)` |
| §2c gap line | "breaks the cap `66 e^K` at `y = 117` for `K = 1.3946`" | `y = 122` for `K = 1.3946`; `y = 117` is the custody row `K = 1.3555`, also rung 2; rung labels unaffected since `⌈ln117/ln16⌉ = ⌈ln122/ln16⌉ = 2`; the producer's own 117-against-1.3946 line is flagged in place |
| §2c following paragraph | "`K*` is **not** sublinear. The first alternative is closed" | boundedness is what dies; the measured drift `0.6881 ± 0.1328` is in `ln P(2s)` and reads the `y/ln y` rate, since `d ln(y/ln y)/d ln y ≈ 0.67` at `y ≈ 20` |
| §4b Lemma 2 | "the constant it yields satisfies `K ≥ sup_k[…]`" | the red team's restatement: the largest defect the shape leaves unbounded is `(γ−λ)k ln b + …`, so the smallest constant it can certify is that sup; the displayed proof line gives `≤` on the defect, and turning it into a lower bound on the true `K` needs an admissible extremal `Ĝ` that is not exhibited |
| falsifier table, two rows | "a proof that `K*` is sublinear"; Lemma 2 row unqualified | "a proof that `K*` is bounded in the level"; and Lemma 2 as corrected closes the two-envelope proof shape, not the object |

Status stays `CLOSED` and the verdict line is unchanged: it names the divergence
of `π(y′) − π(y)`, not sublinearity, so it did not carry the defect.

## 5. `fold-ledger-forced.md` (TODO Z5b), 9 edits

| section | old reading | new reading |
|---|---|---|
| §0 bullet 2 | "its share of the truth is *falling* band over band" | F12's band share **rises** 0.1500 → 0.4746 without approaching 1; F11 holds 29.89% and falls to 0.2984; F13 holds 84.59% and falls to 0.8444 |
| §0 bullet 3 | "Both are monotone increasing" | the closed-form series is monotone increasing; the sharpest-floor series dips at band 2, where F13's `P` is still all of `[7, q)`, then increases monotonically |
| §2 F1 | "both sum to the same value" | 54 against 60, so a sum argument does not close it; the two multisets differ only in 16 against 22, and those two offsets fall in the same count bracket for each of the three `W` classes, giving `3t+2, 3t, 3t+1` |
| §3 F9 | kills lie in the top `q′/(q+q′)` fraction | top `(q′·g + 2)/(g·(q+q′))`, which is `q′/(q+q′)` plus at most two integers; the overhang is attained at 51 of 293 folds, earliest `q = 157` (row 34, slot (25589, 25591)); the coded inequality holds 293 of 293 |
| §3 by_new bound | `1 + ⌈(8/30)·g(1+g/q)⌉` annotated "coprimality to 30 only" | the step is false for an arbitrary start ((10, 19] holds four primes against ⌈8·9/30⌉ = 3) and survives only because `q′` is coprime to 30; that anchoring is load-bearing and is checked exhaustively over all 8 coprime starts to length 600 |
| §3 slack line | "the forced max B3 = 5" | the largest value the forced bound takes in range, B3 = 5 at q = 6173; B3 has no forced maximum, being driven by g |
| §5 F14 measured line, §6 F14 row | "Both monotone increasing" / "both growing" | same split as §0 bullet 3 |
| §5 literature | "at the top band's scale the crude 8C₂ makes the literature bound worse" | worse in every band, not only the top: bound/net 6.430 to 8.841 against F14's 1.100 to 4.517 |
| §9 defects | "`fold-ledger-01.js` header line 27" | line 9 |

The ledger block is unchanged: the red team confirms the constraint census and
the forced/measured axis, and none of the five corrected sentences reaches the
verdict line.

---

## 6. Declined, and why

- **Producer `.js` files.** Four READINGS blocks carry a defect this record
  corrects only in prose, because editing producers is outside the fence. They
  are listed in §7 and none of them is a figure the `embed.js` fingerprint would
  catch, since each is a true number attached to the wrong object.
- **`hsubpow-explicit-K.md`'s "111 reachable pairs".** Graded CONFIRMED with a
  reading hazard rather than WEAKENED, so it is not applied. The hazard is real:
  111 is the unordered (H-sub) pair count `st ≤ 82` while (H-sub-pow) quantifies
  over 15 power pairs, and that same split is why `redteam-0820-math.md` §1.2
  gives the trap as `[1.0761, 1.3946)` and TODO 1d gives `[1.0033, 1.3946)`
  without either saying which hypothesis its number belongs to.
- **`fold-ledger-forced.md`'s "Fourteen forced constraints".** The census is
  fifteen labelled constraints (F4b is separate and the §6 table has fifteen
  rows), but the grade is CONFIRMED, not WEAKENED, and the count sits in the
  headline and the ledger verdict rather than in a corrected sentence. Left for
  whoever integrates the note.
- **`natal-cap-33-overnight` custody.** The @31 input stays a hand-pasted tail.
  The record now says so in `excess-chain-c.md`'s CALIBRATION line; binding it
  needs a re-run, which the red team's brief excluded and this pass did not do.
- **Regenerating `research/QUESTIONS.md`.** Requires `node research/qc.js
  --index`, which the fence forbids. See §7.

## 7. Left for the primary agent: live documents and producers

| target | defect | what it needs |
|---|---|---|
| `research/QUESTIONS.md` lines 31, 46 | carries `Q-c2prime-drift` as CLOSED with the verdict line "gap 0.63 of the control's own sd", which is arithmetically wrong (those two numbers differ by 0.0401 = 0.12 of 0.3480) | regenerate the index; `c2prime-refit-22.md` is now PARTIAL and `attack-c2drift-01.md` is PARTIAL, so the id should report PARTIAL rather than MIXED |
| `TODO.md` items 0, 1c, 1d, 10, Z5b | none carries `Q-redteam-0828-closures` on its `Ledger:` line, so the gate will flag the red-team note and this record | add the id to all five items |
| **`TODO.md` item 1c** | reads as closed by `c2prime-refit-22.md` | the item does not close. The refit half is done. The mechanism half is where `attack-c2drift-01.md` §3 left it: drift significant on x ≥ 17 at p_logn = 0.0053, candidates (i)′ finite-limit and (ii) polylog growth both alive. What is new is only that on the item's own band x ≥ 41 the ten-point rate is unresolvable |
| **`TODO.md` item 10** | records the compressed-tail correction as pinning c away from 1.074 | the item stays OPEN and the wording should separate two things: the *derivation* of 1.074 from a compressed-tail max correction is refuted (the family's limit is 1 at fixed ν, and both named corrections lower the maximum), while the *value* is not refuted, since c = 1.05 ± 0.07 (sd) over x = 17..31 does not separate 1.05 from 1.074 and x = 19..31 reads 1.0772 ± 0.0114 |
| `TODO.md` line 457 | lists `natal-cap-33-overnight.js` among three unbound hand-pasted tails | the @31 leg of the excess chain rides on it; either bind it or keep the caveat visible in item 10 |
| `TODO.md` item 0 and `research/rho-maximal-law.md` §7 | both still list the analytic ⟨ρ²⟩ upper bound as a first move / NOT REACHED | it was closed 2026-08-21 by `attack-rhoms-01.md`; two stale pointers |
| `TODO.md` item 1e | quotes "C_true = 0.60–0.78 at z = 13..29" | the measured values run to 0.8022 (`rho-maximal-law.md` §4, whose §3 states the band correctly as 0.60–0.80) |
| `research/history/staging/attack-doubling-01.md` §4 | asks for `K*` "proven sublinear in the level" without defining the term, which is what let the sublinearity sentence into TODO 1d | restate the open condition as boundedness: the route needs `K* + 1 ≤ e^K·Ĝ(b)`, constant in `k` |
| `research/exponent-control.md` §5 | says "practical bracket 1.3 to 1.8" while `exponent-control.js` READING 13 says 1.3 to 1.9 | the S11 block resolves it to 1.3 to 1.8 at 22 terms; the READINGS block carries the superseded ten-term bracket |
| `research/exponent-control.md` §4, §6 | the pre-refit Qg 0.2978 ± 0.0627 and margin −0.0806 ± 0.0469 are cited to these sections but live only in `exponent-control.js` lines 201 and 545 | either surface them in the `.md` or fix the citations that point at it |
| `research/fold-ledger-01.js` header | line 9's "the stretches `S_q = [q², q′²)` partition the line" is false for the slot set (one opener per fold boundary is uncovered, 1,225 over the range); line 149's `by_new = O(1)` is MEASURED over q ≤ 9973, not forced | both are producer edits, outside this fence |
| `hsubpow-explicit-K.js` READING 4 and line 426 | quote `y = 117` against `K = 1.3946`; 117 is the `K = 1.3555` row and 122 is the 1.3946 row, both printed in the script's own SEC G | producer edit plus re-embed |
| `fold-ledger-forced.js` READING 5 | "BOTH ratios grow monotonically band over band"; the exact-union series dips at band 2 | producer edit plus re-embed |
| `rho2-analytic-bound.js` READING 5 | "R1's absolute floor (C_L = 1, ms = 1 …) misses smax by 1.47x at z = 41, 5.00x at 43, 15.346x at 47"; those three figures belong to the `C_L = 1`, measured-ms floor, and the true absolute floor clears at 41 and 43 and misses by 2.155× at 47 | producer edit plus re-embed |
| `natal-cap-25-excess-law.js` reading 5 | "a Gumbel centering correction … and the sub-Gaussian compression roughly offset"; both lower the predicted maximum, and reading 5's own 10–20% centering predicts c* ≈ 0.80–0.90 against a measured c* = 0.972 | producer edit plus re-embed |

*History and superseded claims: `research/history/CHANGELOG.md`.*
