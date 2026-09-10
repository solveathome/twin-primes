# QC wave 6, partition W — the three expensive natal-cap artifacts

<!-- ledger
id: Q-qc-wave6-W
status: ANSWERED
todo: none
question: Do the three expensive natal-cap artifacts reproduce?
verdict: All three re-run, after the complete @41 march log turned up on disk outside the repo in a place no wave had cited; a three-way tally per file, with the .md disagreements logged rather than edited and the coverage limits stated.
-->

Files owned: `research/natal-cap-34-wrap-precision.js`,
`research/natal-cap-35-x-multiplicity.js`, `research/natal-cap-37-at41-march.js`.
No commits. No pushes. No `.md` edited. No `fold-profile-*.js` touched.
Date of work: 2026-08-18.

## 0. THE FIRST STEP, AND WHAT IT OVERTURNED

The brief warned that `research/wave7-logs/` might already hold output for two of
the three. It holds output for two of the three — and the third's output was
also on disk, in a place the brief did not name and no wave has cited:

    ~/Files/primeoire-runs/            (OUTSIDE the repo, untracked)
      at41/at41-run2.log     294 lines, 2026-08-16 03:29  — the COMPLETE @41 march
      at41/at41.log          116 lines, 2026-08-15 19:02  — the killed first attempt
      at41/audit.log          69 lines, 2026-08-15 18:14
      at41/gates.log          79 lines, 2026-08-15 18:01
      at41/cost.log           18 lines, 2026-08-15 18:03
      at41/nc37-x{31,37,41}-of8-*.json   24 shard result files
      chain/cap34-verify.log  2026-08-15 21:42, 56.2 s, 88,520 checks
      chain/cap35-default.log 2026-08-15 21:27, 101.1 s
      chain/cap36-default.log, chain/cap36-at29.log, chain/chain.log
      lemmaV/lemmaV-full.log
      overnight-chain.sh      the driver that produced the chain/ logs

**`natal-cap-37`'s 6.16-hour @41 march had already been run to completion and
its full output was sitting on disk.** `qc-scripts-S1.md`:194-196 records it as
"NEEDS COMPUTE"; `MORNING-2026-08-16.md`:8 already knew the run finished. So the
"needs 6 hours" reading was true of re-running and false of recovering. Anyone
who had priced this partition off the script headers alone would have burned
six hours reproducing a log that existed. This is the campaign's named trap in
its exact predicted shape, and it was avoided only by listing directories.

**Second finding from the same step, and it is a provenance error already in the
repo:** `research/wave7-logs/cap34-cap27-custody.log` is **not cap-34 output**.
Its text ("V. ENGINE VERIFICATION", "T. THE @13 FOURTH MOMENT",
`[23 checks passed, 1202.5s]`) is printed by
`research/natal-cap-27-t4-at13.js`:220, :255, :321 — it is a re-run of cap-34's
custody TARGET, cap-27. `WAVE7-RESULTS-2026-08-15.md`:69-70 lists it as one of
cap-34's two logs without saying so. Anyone pasting it into cap-34 as cap-34's
output would have manufactured a false custody record. Severity MED,
confidence HIGH (the format strings are unique to cap-27).

## 1. THE THREE-WAY TALLY

| file | route | what landed | own custody? |
|---|---|---|---|
| `natal-cap-35-x-multiplicity.js` | **(a)+RE-RAN** | full 237-line run pasted, 80.3 s, produced today; third independent run, digit-identical to two archived logs | **YES, fully** |
| `natal-cap-34-wrap-precision.js` | **RE-RAN the expensive stage** | `exact13` re-run today (10 workers), plus `verify`, `kurt`, `layers`, `c2`, `joint` | **YES, fully** |
| `natal-cap-37-at41-march.js` | **(a) PASTED FROM LOG, plus own re-run of the cheap modes** | `audit`+`cost`+`at41` pasted from the 2026-08-15 logs with explicit provenance; `audit`, `smoke`, `gates` re-run today | **PARTIAL — the @41 march itself is log-only** |

## 2. PER FILE

### 2.1 `natal-cap-35-x-multiplicity.js` — ROUTE: re-ran it, 80.3 s

**Cost basis: MEASURED, by running it.** `MORNING-2026-08-16.md`:109 priced it at
101 s and `WAVE7-RESULTS`:100 at 163 s. Both are right; it took 80.3 s today.
Wave 5's "expensive, hours not minutes" pricing was wrong for this file by three
orders of magnitude, and the two archived logs said so.

**Provenance of the pasted output: my own run, today, on this machine.** It is
the THIRD run of the file. Diffed against both archived logs
(`research/wave7-logs/cap35-x-multiplicity.log`,
`~/Files/primeoire-runs/chain/cap35-default.log`) the only differing lines are
the five wall-clock lines. Every figure is now reproduced three times.

**Added:** a 237-line verbatim OUTPUT block and a 10-item READINGS block that
grades the five predictions the header put on record and never graded.

Findings, in the file and here:

- **F-35-1 (MED, HIGH). P4 is REFUTED as stated, and refuted in the direction
  the file's own warning predicted.** Header:74-75 predicts "The m = 2 cell
  carries the sign change of X(0) − X̄ across the crossing". Output: the total
  X-gap flips sign between @11 and @13 (+8.74 → −4.18) while the m = 2 cell
  stays POSITIVE across that flip (+10.71 → +3.16); the flip is carried
  entirely by the m ≥ 3 cells (−1.96 → −7.34). The m = 2 cell only turns
  negative at @17. P4's second half ("m ≥ 3 cells carry large individual gaps
  that mostly cancel") holds: at @17 they are −751.28, +448.03, +60.68, +190.24
  summing to −59.24.
- **F-35-2 (MED, HIGH). P5 CONFIRMED**, the sharpest call in the file:
  X(0)/X̄ = 1.4541, 0.9908, 0.9482, **0.9558** — the descent breaks at @19 and
  breaks upward, exactly as predicted at header:80-83.
- **F-35-3 (LOW-MED, HIGH). P2 is false at the level it was formed on.**
  "p_nat·Π_i to a few percent for i ≥ 2" reads 1.185 at @11 (18.5% out), then
  ≤3.7% at @13, ≤0.7% at @17, ≤0.5% at @19.
- **F-35-4 (LOW, MED). P3 is unsupported.** The enhancement matrices show no
  cofactor-range structure in either direction; what they show instead is a
  level effect the prediction did not name — the j = 2 spread collapses to 1
  (0.41..2.14 @11 → 0.87..1.01 @19), i.e. by @19 the pair channel is CRT and
  the whole departure has moved to j ≥ 3.
- **F-35-5 (MED, HIGH). The @19 row is a MEANS row and carries no significance
  statistic.** Every `z(anch)` at @19 is NaN and there is no CUSTODY line at
  @19, because `part0` (the W-rotation sweep) runs only where cap-31 published
  a reference — `CAP31` at :106-108 holds x ∈ {11,13,17} only. cap-31's
  headline "pair statistics cannot see this" (z(X) = −2.71 vs z(P2) = −0.30 at
  @17) is therefore **NOT extended to @19 by this file**, though the @19 row is
  cited around the corpus as the fourth point of the X-channel story.
- **F-35-6 (LOW, HIGH). The @19 ensemble column is not brute-force checked.**
  `[u-form vs sweep: PASS]` appears at @11/@13/@17 and is absent at @19, which
  is correct and honest (the sweep is what the u-form replaces) but means I1 at
  @19 rests on the identity holding three levels below.
- **F-35-7 (LOW, MED). Cost of @23 is much lower than the corpus implies.**
  Of the 80.3 s total, @17 is 79.0 s and @19 is 0.96 s. The entire cost is the
  two things switched off above @17: the W-rotation custody sweep and the j = 3
  census (`if(x<=17)part5(L,U,3)` at :347). `TODO.md`:280-281 says "Price the
  run, not the plumbing" without pricing it. Estimated, not measured: an @23 row
  through the u-form path is tens of seconds; an @23 custody sweep (2.2e8
  rotations × 1,739 primes) is dead. I did **not** run @23, because adding to
  the hardcoded level array changes what the script computes and the brief
  forbids that.

**Cross-partition correction applied (adjudicator handoff, verified before
applying).** Header:8-10 read "proven PER LEVEL at @11, @13 and @17 **and
nowhere else**, those being **the three levels** where the ensemble maximum of
VR is enumerated". I confirmed the adjudicator's claim at the artifacts before
touching the file: `natal-cap-19-calm-lemma.js`:505-511 enumerates the FULL @19
ensemble ("all 9699690 rotations") and returns V̄ = 8944.60 with
`VR(W/2)=2.293 rank-from-top 0/9699690`, so max VR IS enumerated at @19;
K = 435 from the same block; and S̄ = 49,238.76 comes from **my own run today**,
not from a cited log. √(K·V̄·VRmax) = 2,987 < S̄ = 49,238.76, so the per-level
inequality holds at @19 and the count is four, not three. Rewrote lines 8-10 to
say four levels, to record the @19 evidence inline with its date, to name the
old text as the false absence claim it was, and to KEEP the surviving clause
that "from @13 upward" is still an extrapolation. Sites changed: **one**
(`natal-cap-35-x-multiplicity.js`:8-10). I scanned my other two files for the
same phrasing and for "nowhere else"/"enumerated" scope language: **no hits**
in `natal-cap-34` or `natal-cap-37`. My new READINGS block does not restate the
three-level scope anywhere.

### 2.2 `natal-cap-34-wrap-precision.js` — ROUTE: re-ran ALL SIX STAGES, ~25 min total

**Cost basis: MEASURED, by running every stage.** This is the finding that most
changes what the campaign believed. `qc-scripts-S1.md`:194-196 says cap-34's
`exact13` is the "C(990,4) = 3.98e10 march. **NEEDS COMPUTE**, and the honest
price is hours, not minutes." Measured on ten cores today:

| stage | wall | note |
|---|---|---|
| `exact13` | **876.1 s (14.6 min)** | the full 39,782,707,965-quadruple march, 10 workers |
| `layers` | 348.2 s | |
| `c2` | 265.8 s | |
| `verify` | 17.9 s | 88,520 checks, 2 workers |
| `joint` | 3.8 s | |
| `kurt` | 2.6 s | |
| **all six** | **~25 min** | |

The archived `wave7-logs/cap34-exact13.log` reads 1857.0 s because that run was
sharing the machine with the @41 march. So "hours" was wrong by at least 4x, and
the whole file is a coffee break.

**Provenance: every byte pasted was produced by me today.** The two archived
logs were used only as reproduction targets and both reproduce:

- `exact13` is IDENTICAL digit for digit to `research/wave7-logs/cap34-exact13.log`.
  The only differing line in the whole block is the scratch path the truth JSON
  is written to.
- `verify` is IDENTICAL to `~/Files/primeoire-runs/chain/cap34-verify.log` with
  timing prefixes stripped; 88,520 checks both times.

The third archived log, `wave7-logs/cap34-cap27-custody.log`, is **cap-27
output** (see section 0) and is deliberately NOT pasted.

**Added:** a six-stage verbatim OUTPUT block, a 12-item READINGS block grading
all three predictions, a corrected PLAN-vs-CODE note, and a corrected
predictions header.

Findings:

- **F-34-1 (HIGH, HIGH). P1 is now graded, and it is the answer the corpus has
  been missing.** Stage `layers` gives the -3.5e-5 as a measured per-layer
  budget: **Multi (model x CAL4 = 0.87) -4.531943e-5**, C2 instance +1.056084e-5,
  A k4-Monte-Carlo -1.597529e-9, C1 instance -2.265633e-13, C3 instance
  +6.720878e-14. The stage then rebuilds cap-32's whole instance pipeline and
  lands on 352241335.077, **REL -3.501681e-5**, reproducing cap-32's published
  -3.50e-5 to three digits. So P1's verdict (the multi layer, not C2 order-3) is
  CONFIRMED, and the published figure is a partial cancellation of a -4.53e-5
  multi error against a +1.06e-5 C2 error. P1's own arithmetic was wrong twice
  in compensating directions: it assumed multi/G ~ 2e-4 (measured 6.795774e-4)
  and a ~13% calibration error (measured 6.7%).
- **F-34-2 (HIGH, HIGH). The calibration constant is the entire error and its
  exact value is now known.** cap-32 used CAL4 = 0.87; the exact truth implies
  **0.932164**. The independence model fed with exact per-prime inputs returns
  48083774.2789 against an exact 44821955.4433, so the model's shape is right to
  7% and one hardcoded constant carries the whole published discrepancy.
- **F-34-3 (HIGH, HIGH). The 1e-9 gate is missed by 2%, and by exactly one
  Monte-Carlo shape.** The best assembly `layers` can build — A(shapes + k4 by MC
  at n = 2e8) + C1,C3 instance + C2 factorised-exact + Multi EXACT — returns
  T4 = 352253669.51634955, **REL -1.021692e-9** against a 1e-9 gate, of which
  the k4 Monte Carlo alone is **8.290660e-10**. Every other layer in that
  assembly is exact to 1e-13 or better. The residual obstruction at @13 is
  neither the joint layer, nor C2, nor float: it is one MC shape whose exact
  value the same stage prints (60234.5044708). Honest caveat recorded in the
  file: k4_exact = A_exact - A_shapes needs the exact13 truth, so a cheap
  pipeline cannot help itself to it.
- **F-34-4 (HIGH, HIGH). P3's precondition is six orders out of reach on the T4
  road, and stage `kurt` prices it exactly.** @17 needs relT4 <= 3.055646e-8 for
  mu4 to 100%, 3.055646e-9 for 10%, **3.055646e-10 for 1%** (relT3 four times
  tighter). cap-32's @17 T4 is +-4e-4 relative. The corpus's standing plan
  ("meet the @13 gate, then rerun @17") is therefore not the cheap step it reads
  as: the @13 gate is 1e-9 and the @17 requirement is 3e-10 on a level whose T4
  is known to 4e-4. The viable road is the kappa4 SIGN, not T4.
- **F-34-5 (MED, HIGH). P3's arithmetic checks out and its multiplier is 3305,
  not "~3000".** `kurt`: @17 exact mu = 3245.512635440701,
  Var = 1062.3544031865895, Chebyshev 1.008562e-4, 3Var^2/mu^4 = 3.051595e-8.
- **F-34-6 (MED, HIGH). A header CLI line that names a stage which does not
  exist.** BEFORE (line 59): `CLI: node natal-cap-34-wrap-precision.js
  [verify|exact13|layers|joint|at17]`. Running `at17` answers
  `unknown stage at17; have: verify ework exact13 layers c2 kurt joint`. The
  line both promises `at17`, which was never written, and omits `c2` and `kurt`,
  which exist and produce results. AFTER: the real dispatch list, plus a dated
  PLAN-vs-CODE note recording that the @13 gate which would have triggered
  stage [17] **was met by six orders**, so [17] is not a correctly skipped
  stage — it is the one piece of the file's own plan that its own result called
  for and nobody wrote. Fix is unambiguous (the dispatcher is the authority) and
  is documentation only; no computed value changed.
- **F-34-7 (MED, HIGH). A header claim that had gone stale in the safe
  direction.** BEFORE (lines 12-17): "This file carries no pasted run output and
  no READINGS block, so the three predictions below are NOT graded inside the
  artifact." That was true when written and false the moment I pasted the
  output. AFTER: records the grading, the date, and what the header used to say.
- **F-34-8 (MED, HIGH). The instance engine and the block engine differ by four
  to eleven orders and the corpus quotes "cap-32's C1" without saying which.**
  Per-layer error as relative error on T4: C1 instance -2.27e-13 vs block
  -1.796335e-4; C3 instance +6.72e-14 vs block -1.229796e-4; C2 instance
  +1.056084e-5 vs block +2.552517e-5.
- **F-34-9 (MED, HIGH). The term cap-32 drops from C2 is a quarter of the
  layer.** Stage `c2`: factorised exact -184829668.852314 against truth
  -184829668.852342 (error 4.324244e-16 of G); without the s_kl term,
  -139150881.841113 (error 6.925684e-4 of G). The dropped piece is -45,678,787,
  **24.7% of the exact C2 layer** and 25x the whole published -3.5e-5. Price of
  exactness: 63.5 s + 69.3 s V4 against 5.6 s.
- **F-34-10 (MED, HIGH). The joint road dies between @17 and @19, with exact
  operation counts.** WJ (w dropped, O(1) lookups) = 1.3198e+9 / 7.9777e+12 /
  5.6899e+16 at @13/@17/@19; WJ4 (w kept) = 3.2818e+9 / 4.0689e+13 /
  **5.3882e+17**. Table building alone at @19 is 1391.5 s. And w cannot be
  dropped: doing so turns Multi's 44821955.4433 into 15975541.2041, -64.36% of
  the layer. So WJ4 is the real column and @19 is dead.
- **F-34-11 (LOW-MED, HIGH). The multi layer is a two-prime object to four
  digits**: Multi 44821955.4433291 = 2-prime 45090019.6365043 + 3-prime
  -268718.409425233 + 4-and-up 654.216249991616.

### 2.3 `natal-cap-37-at41-march.js` — ROUTE: pasted from log (@41), re-ran the cheap modes

**Cost basis: MEASURED, from the logs, and confirmed for the cheap modes by
running them.** audit 9.3 s; cost 83.0 s; gates 450.1 s; at41 22,176.3 s =
6.160 h wall on ten cores. Only `at41` is genuinely hours, and it did not need
re-running because its log is complete.

**Provenance, stated in the file in the strongest terms I could write it.** The
pasted `audit`/`cost`/`at41` blocks are copied byte for byte from
`~/Files/primeoire-runs/at41/{audit,cost,at41-run2}.log` by a script, never
retyped, and the block says at the top that none of it was produced today, gives
each log's path and mtime, and marks both elisions in place with exact counts
(49 repeated banner lines dropped, 145 progress ticks elided). I re-ran `smoke`
(0.1 s, passes) and `audit` and `gates` myself for first-hand custody of
everything except the march.

Findings:

- **F-37-1 (LOW-MED, HIGH). A cost figure in the code that the cost log does not
  support.** `natal-cap-37-at41-march.js`:606 prints
  `strike budget 4*M*sum_q 1/q = 5.916e13; projected 11 h at the measured 1.5e9
  strikes/s aggregate.` `cost.log` never measured 1.5e9: its three 8-concurrent
  aggregates are 1185e6/s (13.9 h), **1357e6/s (12.1 h)** and 838e6/s (19.6 h).
  So "the measured 1.5e9" is not a measured number. The real run then delivered
  6.035 h over the shards, i.e. ~2.7e9 aggregate — the probe under-predicted the
  march by 2×. Nothing depends on it; anyone pricing @43-class work off it will
  price high.
- **F-37-2 (LOW, HIGH). Header runtime vs log.** The CLI block says
  `audit  (~30 s)`; `audit.log` ends `[audit done in 9.3s]`. Only such
  disagreement I found between this header and these logs.
- **F-37-3 (MED, HIGH). S(41) has ONE witness, and the corpus does not say so.**
  `paper/anchored-note.md`:485-492 states S(41) = 256,725,962,834 and
  β(41) = 0.8455 without noting the march ran once. The killed first attempt
  (`at41.log`) agrees digit-for-digit with run 2 at every shared progress tick
  (np=4686722957 S=349203305 at block 2000 through np=74987566147
  S=4532204145 at block 32000), which covers ~10.6% of one shard of eight,
  i.e. ~1.3% of the tile, and establishes DETERMINISM, not correctness. The
  other 98.7% of S(41) has been computed exactly once, ever. Recorded in
  reading 5 and reading 10 of the new block.
- **F-37-4 (INFO, HIGH). The gates have now been run three times**, identically:
  `gates.log` (18:01) and the gates inside `at41-run2.log` (19:19) differ only
  in timing lines, and I ran them again today.
- **F-37-5 (LOW, HIGH). The logs are outside version control.**
  `~/Files/primeoire-runs/` is not in the repo and not in `.gitignore` either —
  it is simply elsewhere on the disk. The @41 march is the most expensive
  artifact in the corpus and until today its only record was an untracked file.
  Pasting it into the script is now the durable copy.
- **F-37-6 (INFO, HIGH). The 2^53 ceiling is the level ladder's ceiling.**
  PART 0's binding path is F, the CRT anchor, bounded by y² ≤ W, so the engine
  is exact exactly while W < 2^53. @43 (43# = 1.45 × 2^53) dies at path A. The
  file's own @43 forecast (classical-raw 0.8393) is therefore on record and
  ungradeable by this engine. Worth a corpus-level note: the ladder stopped for
  ENGINE reasons at @41, not for cost reasons.

## 3. `.md` DISAGREEMENTS NOTICED — LOGGED, NOT EDITED (I edited no `.md` but this report)

Each gives file:line, the exact text, and the contradicting evidence.

1. **`TODO.md`:220-223 (MED, HIGH) — two different runs welded into one custody
   claim.** Text: *"(natal-cap-34, verified by clean re-run, 88,520 checks): the
   exact decomposition returns T₄ = 352,253,669.87624460 against cap-27's
   certified value, relative 3.4e-16."* The 88,520 checks are the **`verify`**
   stage (`~/Files/primeoire-runs/chain/cap34-verify.log`, 56.2 s,
   `[88520 checks passed]`), which does @7, @11 and a 120-slot @13 subset and
   never touches all C(990,4) quadruples. The T₄ figure is the **`exact13`**
   stage (`research/wave7-logs/cap34-exact13.log`, 1857 s), which prints
   `[4 checks passed]`. The "clean re-run" of `MORNING-2026-08-16.md`:112 was
   `verify` only. So the sentence attaches exact13's number to verify's check
   count and to verify's re-run. **As of my run today the underlying claim is
   now true** — exact13 has been re-run and reproduces — but the sentence's
   evidence chain was wrong when written.
2. **`MORNING-2026-08-16.md`:123-124 (MED, HIGH) — an over-retirement.** Text:
   *"The provenance warning in `WAVE7-RESULTS-2026-08-15.md` can be retired for
   cap-34, cap-35 and cap-36, whose numbers are now reproduced from clean
   runs."* For cap-34 only `verify` was in the overnight chain
   (`overnight-chain.sh` step 4/4); `exact13`, which produced every number
   cap-34 is cited for, was NOT re-run. True for cap-35 and cap-36; false for
   cap-34 until today.
3. **`research/history/staging/qc-scope-T.md`:1283 (LOW, HIGH) — a recomputed
   number that does not reproduce.** Text: *"κ₄ is negative at both certified
   levels (recomputed: @11 −1.14, @13 −0.48)"*. Running `natal-cap-34 kurt`
   today: κ₄ = **−1.1063** at @11 and −0.4850 at @13. The @13 figure is right;
   @11 rounds to −1.11, not −1.14.
4. **`research/SCRIPTS.md`:12 (LOW, HIGH) — a stale generated count.** Text:
   *"Scripts: **128**. Cited by at least one document: **128**."* `research/`
   holds **132** `.js` files today (wave 5 counted 131; `natal-cap-38` landed
   this morning and is not in the index at all). The file's own banner says
   regenerate with `node research/gen-scripts-index.js`; nobody has.
5. **`research/history/WAVE7-RESULTS-2026-08-15.md`:167-175 (LOW-MED, HIGH) — a
   document frozen mid-flight.** Text: *"**Running now.** Eight shards launched
   detached at 18:16 … That claim is NOT independently confirmed here, because
   the agent died before writing its OUTPUT block; the gates should be re-run
   and the result checked against the log when the march finishes."* The march
   finished at 03:29 on 2026-08-16, the gates ARE in the log, and everything the
   paragraph asks for has been done — but the paragraph still reads as if @41 is
   in flight. Same file :69, :99, :167 give line counts 655 / 356 / 565 against
   660 / 359 / 622 before my edits today.
6. **`paper/anchored-note.md`:490 (LOW, HIGH) — a runtime that double-counts.**
   Text: *"6.16 hours over eight shards, after reproducing @7 through @29
   digit-for-digit and S(31) and S(37) exactly through the same sharded code
   path."* `at41-run2.log`: the eight shards took **6.035 h**; the 6.160 h is
   the whole job and INCLUDES the 450.1 s of gates the sentence describes as
   coming before it.
7. **`research/history/MORNING-2026-08-16.md`:106 (LOW, MED) — not my partition,
   flagged only.** *"natal-cap-36 --at29 (781 s)"*. `qc-scope-T.md`:1270-1277
   already has three other figures for the same pass (header 11.3 min, printed
   `[658s]`, `wave7-logs/cap36-at29.log` 1111.9 s). MORNING's 781 s is a
   **fourth**. I did not chase it; cap-36 is another agent's file.
8. **Confirming two findings already on the books, not new.**
   `qc-scope-T.md`:1284 says `natal-cap-32-wrap-identity.md` carries no
   reference to cap-34 — confirmed, `grep` returns zero hits, though cap-34
   exists solely to grade cap-32's engines. `qc-scope-T.md`:1289-1293 says
   cap-31 carries no pointer to cap-35 — confirmed.

## 4. EDITS MADE, IN FULL

`research/natal-cap-34-wrap-precision.js` (660 → 953 lines)
- header lines 12-17 rewritten: the "carries no output, predictions ungraded"
  paragraph replaced by the grading verdict, dated, with what it used to say.
- header lines 57-59 rewritten: PLAN-vs-CODE note added; the CLI line replaced
  with the real dispatch list.
- appended: OUTPUT block (six stages, all run today), READINGS block (12 items).
- **no executable line changed.** `node --check` passes.

`research/natal-cap-35-x-multiplicity.js` (359 → 720 lines)
- header lines 8-10 rewritten: X-limitation scope corrected from three levels to
  four, with the @19 evidence and its date inline (adjudicator handoff, verified
  at the artifacts first — see 2.1).
- appended: OUTPUT block (237 lines, run today), READINGS block (10 items).
- **no executable line changed.** `node --check` passes.

`research/natal-cap-37-at41-march.js` (622 → 974 lines)
- appended: OUTPUT block (audit + cost + at41, pasted from the 2026-08-15 logs
  with provenance and marked elisions), READINGS block (10 items), CUSTODY
  ADDENDUM recording the three modes I re-ran today.
- **nothing in the existing header or code changed.** F-37-1 (the "measured
  1.5e9" that was not measured) and F-37-2 (audit "~30 s" vs 9.3 s) were
  deliberately left in place and reported here, because both sit inside a
  printed line whose bytes are quoted in the pasted OUTPUT block: editing line
  606 would put the source out of step with its own pasted output. The
  adjudicator should decide whether to change the line and re-paste, or annotate.
- `node --check` passes.

`research/history/staging/qc-wave6-W.md` — this report. No other `.md` touched.

Custody check run after every paste: each pasted block was re-read out of the
finished `.js` and string-compared against the log it came from. All eight
blocks (six cap-34, one cap-35, audit+cost+at41 for cap-37) verified VERBATIM.

## 5. COVERAGE — what I did not reach, and how much to trust what I did

**Trust the numbers; the cost estimates are the soft part.**

WHAT I DID NOT REACH.

1. **The @41 march was not re-run and S(41) still has one witness.** This is the
   single biggest gap in the partition. 6 h of ten cores. The ~1.3%-of-tile
   agreement with the killed first attempt is determinism, not correctness. If
   one number in this corpus deserves a second independent run, it is
   S(41) = 256,725,962,834, because `paper/anchored-note.md` builds the fifth
   residual collapse on it.
2. **Stage `at17` was not written and I did not write it.** Writing it would be
   new work, not QC, and reading 5 of cap-34 says the T4 road it would take is
   six orders short anyway. The kappa4-sign road at @17 is unattempted by anyone.
3. **cap-35 at @23 was not run.** It needs an edit to the hardcoded level array,
   which the brief forbids. My "tens of seconds" price for it is an ESTIMATE
   from the @19 u-form cost (0.96 s) scaled by W (23x) — **low-to-medium
   confidence**. The O(W log log W) legs should scale that way; part3/part4
   factor the natal set and may not. Nobody should quote it as measured.
4. **I did not verify every figure in the pasted blocks.** cap-37's at41 block
   alone prints hundreds. I verified: every figure a READING quotes, every
   figure a citing `.md` quotes, and the shard-fold arithmetic. Figures printed
   and never quoted were not independently recomputed.
5. ~~The eight `nc37-x41-of8-*.json` shard files were not opened.~~ **DONE
   after first drafting this section.** Summed in BigInt outside
   `combineReport`: sum S = 256,725,962,834 (== published S(41)), sum np =
   5,666,163,252,750 (== published N(41)), and the eight kA..kB ranges are
   contiguous from 0 to M = 10,141,675,450,907 with no gap and no overlap. That
   independently confirms the FOLD and the PARTITION, and confirms nothing about
   the march, since the JSONs are the same run's own output. F-37-3 stands
   unchanged. Recorded as ADDENDUM 2 in the artifact.
6. **`~/Files/primeoire-runs/lemmaV/lemmaV-full.log` (16 KB) and
   `chain/cap36-*.log` were listed but not read.** They belong to other
   partitions. Whoever owns cap-36 and Lemma V should know these exist: the
   directory `~/Files/primeoire-runs/` is untracked and is not in the brief for
   any partition I know of. **It should be swept by someone.**
7. **I did not audit the `.md` companions** of these three scripts (cap-34,
   cap-35 and cap-37 have none) or the wider corpus. Section 3's list is what I
   tripped over while chasing numbers, not a sweep.
8. **`natal-cap-38-loudness-driver.js` landed this morning and I read only the
   four lines of it I needed** to check the adjudicator's claim. I did not audit
   it. It is not in `SCRIPTS.md`.

HOW MUCH I TRUST MY COST FIGURES.

- **exact13 876.1 s, layers 348.2 s, c2 265.8 s, gates 440.5 s, audit 5.3 s,
  smoke 0.1 s, cap-35 80.3 s: HIGH confidence, these are stopwatch readings
  from runs I started.** They will move with machine load; the archived
  exact13's 1857.0 s against my 876.1 s is a 2.1x load factor on the same
  machine, so treat any single figure as +-2x.
- **at41 6.160 h and cost's 83.0 s: HIGH confidence in the log, but I did not
  produce them.** The 6.035 h shard figure and the 6.160 h total are two
  different numbers and the corpus quotes them interchangeably (F-37-6).
- **@23 for cap-35: LOW-MEDIUM, as above.**
- **The claim "@43 is unreachable by this engine": HIGH.** It is computed inside
  PART 0 from 43# = 1.45 x 2^53, and I reproduced PART 0 today.

WHAT I SUSPECT AND COULD NOT PROVE.

- **The CAL4 = 0.87 constant is probably wrong at @17 too, by more than at @13.**
  Implied CAL4 at @13 is 0.932164. Nothing measures it at @11 or @17, so I have
  one point and no trend. If CAL4 drifts with level, cap-32's @17
  T4 = 4,616,850,623,332 +- 4e-4 may be biased rather than merely imprecise, and
  the +-4e-4 would be an understatement. **Cheap test: run the same implied-CAL4
  extraction at @11, where `bruteTG` gives the exact truth in seconds.** I did
  not, because it needs a new stage and the brief forbids changing what the
  script computes.
- **The k4 Monte-Carlo error may be the reason cap-32's @17 figure carries
  +-4e-4 rather than something smaller.** At @13 k4-by-MC alone is 8.29e-10 of
  T4 at n = 2e8; the shape count grows fast with N. Unproven; I have one level.
- **`wave7-logs/` may hold other mis-attributed logs.** `cap34-cap27-custody.log`
  was one. I checked only the three in my partition. The naming convention
  ("cap34-cap27-custody") is ambiguous by construction: it reads as "cap-34's
  cap-27 custody log" and is in fact "cap-27's output, run as cap-34's custody
  target". **Someone should check `cap36-cap30-repro.log` and
  `lemmaV-pilot-rerun.log` for the same shape.** I did not.
- **The corpus has no convention for logs living outside the repo.** Three
  partitions' worth of primary evidence sits in `~/Files/primeoire-runs/`. There
  is no `.gitignore` entry, no README pointer, and `SCRIPTS.md` does not mention
  it. That is a structural risk, not a finding, and it is above my pay grade.
