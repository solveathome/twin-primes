# Wave 5, partition S1: the 37 `natal-cap-*.js` scripts, swept

<!-- ledger
id: Q-qc-scripts-S1
status: ANSWERED
todo: none
question: Do the 37 natal-cap scripts' READINGS blocks hold against their own output and against the documents citing them?
verdict: Twenty-six of 37 are consistent and eleven carry a defect, none of them contradicting the summary layer on a status claim: a false promise of a record with no READINGS block, a reading refuted by its own printed output, an absence claim at the site a whole wave read as absolute, and a Miller-Rabin bound wrong by nine orders (3.186e14 for 3.186e23) at three sites.
-->

*(2026-08-17. Coverage: all 37 files. Every header banner, every pasted OUTPUT
block and every READINGS block read against the documents citing it. Gates at
finish: `qc.js` 0 on all seven checks, `qc/selftest.js` exit 0 with 13 known
positives firing and 5 controls silent, `audit-numbers.js` 78/78 in 153.9 s.)*

**The null result first, because it is the point of the exercise.** No wave had
opened this family. Thirty-seven READINGS blocks were read against their own
output and against every citing document. **Twenty-six are consistent with both.**
Eleven carry a defect, and they are ranked below. Nothing in this family
contradicts the summary layer on a *status* claim; every defect is either a
number, a scope, a promise, or a next step the corpus has since executed.

## Defects, ranked by consequence

| # | script | class | what | fixed here |
|---|---|---|---|---|
| **S1-1** | `natal-cap-34` | **false promise of a record** | header:12 read "PREDICTIONS ON RECORD (written before the runs; **graded in the READINGS**)". There is no READINGS block and no pasted output in the file. Three pre-registered predictions, no landed verdict inside the artifact. Same shape as the U-FRAME hollow reproduction promise. | YES |
| **S1-2** | `natal-cap-08` | **output refutes its own reading** | reading 6 asserted "exact < RS < PNT at all four levels" where line 343 of the same file prints RS 854,132 > PNT 835,838 at @19. **This is O15, adjudicated in wave 3 with a prescribed fix, and never applied.** | YES |
| **S1-3** | `natal-cap-21` | **absence claim, the R-1 site itself** | header:38-39 said @13's T₄ is "feasible offline, **not here**". Both named blockers have since been executed (cap-27 at @13, cap-32 at @17). This is the sentence wave 2 read as "not anywhere". | YES, forward pointer |
| **S1-4** | `natal-cap-35` | **retired scope, stated as proven** | header:7 credited cap-31 with proving the X-limitation theorem "from @13 on". Its home says in terms: proven **per level at @11, @13 and @17 and nowhere else**, and "from @13 upward" is an extrapolation. | YES |
| **S1-5** | `natal-cap-31` | **scope, in the home itself** | reading 3 said "from @13 on ... PROVABLY too small". Narrower than its own output at one end (@11 also holds: max\|D\| 20.5 < S̄ 38.2) and unboundedly broader at the other. | YES |
| **S1-6** | `natal-cap-33` | **wrong constant, three sites** | the 12-base Miller-Rabin bound is recorded as "3.186e14" at lines 33, 66 and 483. True Sorenson-Webster bound for the first 12 primes is **3.186e23**. cap-37 PART 0 reading 6 caught it and quotes the three sites verbatim. | YES, banner added; the three sites deliberately left so cap-37's quotation stays alive |
| **S1-7** | `natal-cap-11`, `natal-cap-18` | **retired value** | four prose sites carried e^{2γ}/4 = **0.79306** where the same files' own OUTPUT prints 0.79305 and `audit-numbers.js`:53 asserts 0.793055. cap-11:41 corrected somebody else's rounding slip while carrying one. | YES, 4 sites |
| **S1-8** | `natal-cap-01` | **hand count** | reading 4: "the **13** head primes 19..61". There are 11 (19,23,29,31,37,41,43,47,53,59,61). The derived figures 9,424 and 39% are right; only the count was wrong. | YES |
| **S1-9** | `natal-cap-10` | **hand count** | reading 3: cumulative Σcap crosses N at q=97, "(**23rd** of 120 primes)". 97 is the 18th. Same convention cap-01 uses correctly two rows away. | YES |
| **S1-10** | `natal-cap-13` | **wrong scour count** | reading 9: "@19 full enumeration (W = 9.7M, **K = 446**)". K = 435, computed by five other artifacts and by direct sieve. | YES |
| **S1-11** | `natal-cap-16` | **retired value** | reading 6: "e^{2γ}/4 = **0.7932**". Corpus pins 0.793055 / 0.79305. | YES |
| **S1-12** | `natal-cap-07` | **stated range excludes a printed value** | reading 3: "z-values ... sd ≈ 1.1–1.4" across all levels, where @11 prints z_bin sd 0.458. | YES |

## Forward pointers added, where a later cap moved the answer

The night-run reconciliation of 2026-08-15 put `FORWARD POINTER` blocks in
cap-06, cap-07, cap-11, cap-17 and cap-18. It did not reach seven more where a
successor either refutes the predecessor by name or executes its named next
step. Those are now symmetric, which is the house rule that refutations stay
visible on both sides:

- **cap-08 → cap-11, cap-18, cap-24.** Reading 8's "extend K* to @23" is done at
  @23 and @29; reading 7's fear that the moduli list becomes the march is
  refuted twice; the K* law of record is the quarter-power band, not linearity.
- **cap-13 → cap-19.** Reading 9's @19 enumeration is done. The percentile does
  keep falling, but the **suppression ratio does not** (0.553 @17 → 0.699 @19),
  so the "deepening calm" should not be named as this reading proposed.
- **cap-14 → cap-21.** Both named targets executed, and the answer to (i) is a
  refutation: exact E[v_k²] still loses to endpoint Chebyshev 43× to 3600×.
- **cap-19 → cap-23, cap-26, cap-30, cap-36.** Reading 10's next step executed;
  the uniform-in-q form **refuted**; the −1/2 proved exact with no
  equidistribution needed; leg (iii) certified @11..@29. **And the name in
  reading 8 is retired**: the Fused-Window Calm Lemma is nine sub-claims at
  four calibrations, `research/anchored-calm.md`.
- **cap-21 → cap-27, cap-32.** See S1-3.
- **cap-27 → cap-32.** Reading 6(ii), "find the 4-point wrap identity", is done;
  T₄@17 exists; the bound does not.
- **cap-30 → cap-36.** Reading 6's "x ≤ 23" is now x ≤ 29; **reading 4(a) is
  refuted** (Θ(L/Vg) is wrong, the constant is L-free); reading 3's softening of
  cap-26 reading 5 is withdrawn.

## Per-script verdicts

| script | OUTPUT | READINGS | verdict |
|---|---|---|---|
| `natal-cap-01-window-cartography.js` | yes | yes | **DEFECT S1-8** (head-prime count 13→11); all 6 other readings reproduce from the output |
| `natal-cap-02-fourier-budget.js` | yes | yes | CLEAN. Carries a genuine CORRECTION banner (attack-04's untwisted index). Every ratio, exponent and hybrid gain checks out |
| `natal-cap-03-dilation-ensemble.js` | yes | yes | CLEAN. One observation: reading 4(b)'s "all-space baseline (0.192)" is not printed anywhere in the output; unverifiable at the artifact |
| `natal-cap-04-packing-cap.js` | yes | yes | CLEAN. Reading 4 mixes the @13 and @17 superdensity columns without saying so; each statement is individually findable. Reading 5's "worst +4 on ~653" is true but the printed table shows +4 at q=23 and q=71 as well |
| `natal-cap-05-second-moment.js` | yes | yes | CLEAN. 164 primes, every identity and ratio reproduces. SCRIPTS.md flags it as carrying a correction banner; it does not (see below) |
| `natal-cap-06-bonferroni.js` | yes | yes | CLEAN. Genuine FORWARD POINTER banner (readings 3 and 7 superseded by cap-12) |
| `natal-cap-07-trajectory.js` | yes | yes | **DEFECT S1-12** (sd range). Genuine correction banner. Everything else reproduces, including the e^−311 ceiling |
| `natal-cap-08-staircase.js` | yes | yes | **DEFECT S1-2**, the wave-3 O15 fix applied at last. Forward pointer added |
| `natal-cap-09-mirror.js` | yes | yes | CLEAN. 166 primes; the refutation and the independence baseline both check |
| `natal-cap-10-sieve-cap.js` | yes | yes | **DEFECT S1-9** (prime index 23→18) |
| `natal-cap-11-kstar23.js` | yes | yes | **DEFECT S1-7** (0.79306 ×3). Genuine forward-pointer banner. K*, floors and all six fits reproduce |
| `natal-cap-12-overlap-sign.js` | yes | yes | CLEAN, five levels. Reading 1's "21–23%" rounds up @13's 20.7% |
| `natal-cap-13-anchored-calm.js` | yes | yes | **DEFECT S1-10** (K=446→435). Forward pointer added. Reading 1's "NEAR 48–56" excludes @11's 45.9 |
| `natal-cap-14-discrepancy-lemma.js` | yes | yes | CLEAN. Forward pointer added. 164 steps, 210,400 MC marches, every figure reproduces |
| `natal-cap-15-head-certificate.js` | yes | yes | CLEAN. The W^0.44..0.47 first-positive-B exponents recompute exactly |
| `natal-cap-16-fast-variance.js` | yes | yes | **DEFECT S1-11** (0.7932). Table, fits and certified bars all reproduce |
| `natal-cap-17-cheap-laws.js` | yes | yes | CLEAN. Genuine SUPERSEDED banner. Both parts reproduce |
| `natal-cap-18-at29.js` | yes | yes | **DEFECT S1-7** (0.79306). Genuine forward-pointer banner; the three graded predictions all check against cap-11/cap-17 |
| `natal-cap-19-calm-lemma.js` | yes | yes | CLEAN on numbers. Forward pointer added: reading 10 executed, reading 8's lemma NAME retired |
| `natal-cap-20-third-order.js` | yes | yes | CLEAN. a_j = (j+1)!/2^j reproduces a₁, a₂, a₃, a₄ and the two budget closures |
| `natal-cap-21-beyond-chebyshev.js` | yes | **NO** | **DEFECT S1-3.** The only script in the family with a pasted output and no READINGS block; its readings live in the companion .md |
| `natal-cap-22-at31-drift.js` | yes | yes | CLEAN. Custody, forecast scoreboard and residual sequence all reproduce |
| `natal-cap-23-covadj-proof.js` | yes | yes | CLEAN, and the calibration conflict `research/qc/README.md`:48 records as its worked example is FIXED: the banner now reads "certified in aggregate, refuted uniformly in q" |
| `natal-cap-24-boundK-curve.js` | yes | yes | CLEAN. 2328 primes; every K_eps and relative-depth figure reproduces |
| `natal-cap-25-excess-law.js` | yes | yes | CLEAN. Two conservative loosenesses: reading 5's "P(z≥3) ≤ Gaussian at 5 of 6" is 6 of 6, and "max z equals √(2ln(W/l)) to 2–8%" is 0.9–5.6%. Both understate the file's own accuracy |
| `natal-cap-26-minus-half.js` | yes | yes | CLEAN, and reading 5 STANDS: cap-30 softened it, cap-36 withdrew the softening |
| `natal-cap-27-t4-at13.js` | yes | yes | CLEAN on numbers; forward pointer added for reading 6(ii). This is the artifact wave 4 found nobody had opened |
| `natal-cap-28-analytic-certificate.js` | yes | yes | CLEAN. b·ln³W, the engine-vs-truth table and the 16-orders extrapolation all reproduce |
| `natal-cap-29-sigma-plateau.js` | yes | yes | CLEAN. Its on-record E_med(31) = 54.98 lost to the 61.22 variant; cap-33 RUN 1 R1.1 grades it, so the record is symmetric already |
| `natal-cap-30-skeleton-bound.js` | yes | yes | CLEAN on numbers; forward pointer added for readings 3, 4(a) and 6 |
| `natal-cap-31-calm-vs-kill.js` | yes | yes | **DEFECT S1-5** (X-limitation scope) |
| `natal-cap-32-wrap-identity.js` | yes | yes | CLEAN. The @17 numbers, the honest wall and the T5/T6 verdict all check |
| `natal-cap-33-overnight.js` | yes ×3 | yes ×3 | **DEFECT S1-6** (3.186e14). Three runs, three readings blocks, all three otherwise reproduce |
| `natal-cap-34-wrap-precision.js` | **NO** | **NO** | **DEFECT S1-1.** Nothing of what this file computed is inside it |
| `natal-cap-35-x-multiplicity.js` | **NO** | **NO** | **DEFECT S1-4**, and five pre-registered predictions with no landed verdict anywhere in the artifact |
| `natal-cap-36-skeleton-door.js` | yes | yes | CLEAN, and the most up-to-date file in the family |
| `natal-cap-37-at41-march.js` | **NO** | **NO** | No pasted output and no readings; it does print its own forecast grading at run time, which the other two do not |

## Document-side findings, for the shepherd

Evidence only, not replacement text. Named file, quoted sentence, and which side
is the home.

**D-1, and it is the headline.** `README.md`:100, inside the natal-cap paragraph:

> "the beyond-Chebyshev ensemble bounds (two of them, at @11 and @13; **@17 is
> not run**)"

The status is right and the phrase is the R-1 phrase. `natal-cap-32` ran @17 and
printed `T4 = 4,616,850,623,332.1 +- 4e-4 rel` under the banner "first-ever @17
values"; `TODO.md`:212-215 says so in terms. What does not exist at @17 is the
*bound*, because the μ₄ assembly cancels seven orders. The corpus's own settled
wording is `natal-cap-21-beyond-chebyshev.md`:152, "Only the @17 **rerun** is
outstanding", and the adjudication now sitting in
`research/qc/checks.js` `ABSENCE_VERIFIED` reads "natal-cap-32 computed T4@17 to
±4e−4 and says in its own output that the identity needs ~3e−9 relative and is
'NOT certifiable', so the bound does not exist." Home: cap-32's output.
`README.md` is the file `README` tells a reader to open first, and it carries the
one wording that has already cost this campaign a wave.

**D-1a, why no instrument caught it.** The new `absence` check matches the phrase
`not run` on that line. It then skips it, because the check requires a
*resolvable artifact token* in the same paragraph and README's paragraph names
only `.md` files, which the `ART` regex does not match. Verified by running the
check's own regexes against the line: the phrase matches, the artifact list comes
back empty. Widening `ART` to `.md` filenames would close this specific hole.

**D-2. `research/SCRIPTS.md`'s correction-banner table is 6/12 false positives in
this family, and the table's own instruction is load-bearing.** Lines 20-21 say
"**Never quote a figure from one of these without reading its banner first.**"
Of the twelve natal-cap rows, six have no banner at all; `gen-scripts-index.js`
:115 flags on `/CORRECTION|SUPERSED|NOT a valid|⚠|WRONG/i` over the first 40
lines, and it is matching the ordinary word *correction*:

- `natal-cap-05`:30 "the floor **corrections** cancel over the ensemble"
- `natal-cap-11`:16 "The same **correction** applies to natal-cap-18" (this one
  is a real forward pointer, so it is a true positive)
- `natal-cap-15`:19 "is a Buchstab **correction**"
- `natal-cap-22`:13 "classical-**correction** 0.8641" (a column label)
- `natal-cap-29`:18 "grid-range **corrections** handled in Step 4"
- `natal-cap-32`:26 "per-prime component **corrections**"

Genuine banners: 02, 06, 07, 17, 18, and 11 and 36. Sending a reader to five
scripts to read a banner that is not there is the cheapest possible way to make
U5's real warnings stop being read.

**D-3. `research/SCRIPTS.md` must be regenerated, and exactly one row changes.**
The `natal-cap-33` banner added here is a real correction banner, so
`natal-cap-33-overnight.js` newly enters the correction table (12 natal-cap rows
→ 13). I simulated `gen-scripts-index.js`'s `corrected`, `companion` and `date`
parses over all 37 files after my edits: nothing else moves, no companion
changes, no date changes, no title changes. Run `node research/gen-scripts-index.js`.

**D-4. `TODO.md`:172-173 attributes the @37 variance run to the wrong artifact.**

> "The product-sieve engine (**natal-cap-16-fast-variance.js**) reached @37 in
> 5.25 h."

`natal-cap-16`'s own table stops at @31 and its reading 5 says @37 "costs ~30·W
growth ≈ 4.5 hrs — feasible", i.e. it prices @37 and does not run it. The @37
sieve is `natal-cap-33-overnight.js` RUN 3, 18894.3 s = 5.25 h.
`paper/anchored-note.md`:532-533 gets this exactly right: "natal-cap-16 through
@31, with roundoff bar ±7.4e2 there; natal-cap-33 RUN 3 at @37". Home:
anchored-note. The engine is shared, the run is not.

**D-5. `paper/anchored-note.md`:250 carries the Miller-Rabin slip.**

> "The @37 run's primality layer is deterministic Miller-Rabin to **3.186e14**,
> which covers W = 37#."

The clause is true as written (37# = 7.42e12 < 3.186e14) but the constant is
wrong by nine orders. `natal-cap-37`'s PART 0 reading 6 is the home and states
it: the true bound for the first 12 primes is 3.186e23, "and it already covered
41#". Independently confirmed: 12 bases 318,665,857,834,031,151,167,461; 13
bases 3,317,044,064,679,887,385,961,981.

**D-6. Three artifacts hold pre-registered predictions with no landed verdict in
the artifact, and the corpus's credibility rule says that is exactly what must
not happen.** Decision U1 in `qc-CAMPAIGN.md`: "A pre-registered win condition
sitting beside its landed verdict is what proves the goalposts were not moved
after the result came in, and this corpus's credibility rests heavily on that."
`natal-cap-34` (3 predictions), `natal-cap-35` (5 predictions) and
`natal-cap-37` carry no pasted output and no readings. cap-34's header promise
is fixed here; cap-35's and cap-37's results live only in `TODO.md`:268-278 and
`paper/anchored-note.md`:485-489 respectively. Of cap-34's three, only P2 is
graded anywhere; P1's layer attribution and P3's @17 rung are ungraded, the @17
stage never having been run.

## What I did not reach, and why

- **`natal-cap-34`, `-35`, `-37` were not re-run**, so their outputs are still
  not in their artifacts. cap-34's `exact13` stage is the C(990,4) = 3.98e10
  march; cap-37's `at41` is 6.16 hours over eight shards. **NEEDS COMPUTE**, and
  the honest price is hours, not minutes. Recovering the readings from the
  documents that quote them would import a document's numbers into an artifact,
  which is the wrong direction and I refused it.
- **`natal-cap-34` P1 and P3 stay ungraded.** P1 asks which layer carries the
  −3.5e−5; only the exact13 stage answers it. P3 is contingent on an @17 gate
  that has not been met.
- **I did not verify every number in the four biggest OUTPUT blocks** (cap-18,
  cap-32, cap-33, cap-37 print tens of thousands of figures). I checked every
  figure a READING quotes, plus every figure a citing document quotes. Figures
  printed and never quoted were not independently recomputed.
- **The `.md` companions were read as evidence, not audited.** Nine natal-cap
  scripts have companion prose files. I opened those that adjudicate a claim I
  was checking; I did not sweep them, and a fourth partition owns that axis.

## Method notes worth keeping

1. **The forward-pointer convention already existed and had stopped at five
   files.** cap-06, cap-07, cap-11, cap-17 and cap-18 got pointers on
   2026-08-15. The seven added here are the same shape, and every one of them
   was found by reading the successor's readings, not the predecessor's. A
   reconciliation pass that runs *forward* from the newest file finds these; one
   that runs through the file list in order does not.
2. **Two hand counts, in adjacent files, in the same idiom.** cap-01's "13 head
   primes" and cap-10's "23rd of 120" are both counts of scour primes that the
   output does not print. Anything a reading counts but the output does not is
   the cheapest place in this corpus to be wrong, and it is worth a check: every
   ordinal or cardinal in a READINGS block that does not appear in the OUTPUT
   block above it.
3. **A conservative error is still an error, and this family has three.**
   cap-25 understates its own accuracy twice and cap-07 states a range that
   excludes a printed value. None of them changes a verdict, which is exactly
   why they survived four waves.
