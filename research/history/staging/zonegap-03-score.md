# SCORING — the sealed 1e12 preregistration: ten of ten, no misses, and two engine defects found on the way

<!-- ledger
id: Q-zonegap-03-score
status: ANSWERED
todo: Z7
question: Do the ten predictions sealed in zonegap-03-prereg.md score against the stage-3 sweep at X = 1e12?
verdict: All ten sealed rows score HIT and none miss, after a second pass added a band-edge argument to zonegap-01.js and re-ran the decade so the two rows that named an unprinted band could be scored; the four Group T hits are a custody promotion that follows from CUSTODY 1 and 3 passing, one sub-clause of T5 (the full-decade sd) stays unprinted, and the sweep still needs a DERIVED engine because zonegap-01.js's inlined 41-record ladder makes it exit at 1e12.
-->

*(2026-08-29, HELD under the publication moratorium; nothing here is
integrated into a live document. Scoring document: the embedded OUTPUT of
`research/zonegap-04-sweep-1e12.js` (invocation `node
research/zonegap-04-sweep-1e12.js`, code-sha256 `9075306f...`, out-sha256
`1d159b6e...`, 4,249.0 s, embedded 2026-08-29 under `--force`, second pass),
which streams the sweep
engine's stdout verbatim. No number below is hand-pasted and no sealed rule is
re-interpreted after the fact. Calibration marked per claim; everything the
sweep produces is (i), a measurement of the zone fields, and nothing here
bounds Z2 below the zone width or at i.o. p, which would be (ii).)*

## 0. Misses first, then the tally

**MISSES: none, on either pass.** No prediction, in either group, landed
outside its sealed band or its kill rule.

**NOT SCORABLE: none of the ten rows; one sub-clause inside T5.** On the
first pass (13:00 CEST) two rows were unscorable because
`zonegap-01.js` hard-coded its band edges and printed no row for the decade
it had just swept. A band-edge argument was added to the engine, the decade
was re-swept, and both rows now score against their sealed bands with the
sealed numbers untouched (§1 carries the custody of that change). What
remains unprinted is one sub-clause of T5's text, the FULL decade
`[1e5, 1e6)` sd of 0.193; three of its four sealed fields reproduce exactly
by arithmetic on the two printed sub-bands and the fourth does not, at
printed precision (§2).

**The four caveats that come before the ten hits.**

1. **The engine could not run at X = 1e12 as it stood, and still cannot.**
   `zonegap-01.js` inlines A113274 records 1..41 and asserts its own
   running-max ladder has exactly that many rows; at 1e12 the sweep reaches
   record 49, so CUSTODY 1 would have failed and exited before printing one
   zone statistic. Both scored sweeps ran on a DERIVED engine (§1) whose
   sha256 differs from `zonegap-01.js`. The band-edge argument added on the
   second pass does NOT fix this: the substitution is still required.
2. **Group T is a custody promotion, not a blind test, and four of its five
   rows follow from two printed custody lines.** Once CUSTODY 1 prints
   "ladder == A113274 records 1..49: EXACT" and CUSTODY 3 prints "env(p) =
   running max Z2 at ALL 78,497 zones: EXACT", T2, T3 and the deterministic
   functionals of T4/T5 cannot fail: the model that sealed them recomputes
   exactly those functionals from the same ladder. The information in a Group
   T hit is that the ENGINE and the PUBLISHED RECORD agree, not that a law
   was predicted.
3. **Group S is blind, and its rows are not equally demanding.** S1, S2 and
   S4 landed at -0.29, -0.32 and -0.31 sigma, S5 repeats a condition already
   verified at 1e11, and S3's sealed band ([0.7218, 0.90]) was wide enough
   that the 20 percent branch, not the 80 percent one, scored inside it. The
   sigma machinery is not falsified; it is also barely stressed.
4. **The second pass cost a re-embed under `--force` and one wasted
   70-minute run.** The producer's tail was BOUND, so `embed.js` refused the
   first re-run whose output differed and discarded it (§6, D9). The forced
   re-embed is stamped in the fingerprint: `forced: 2026-08-29, 0 of 320
   figures in the replaced block not reproduced` — that is, every figure of
   the first pass's block reproduces in the second, and the difference is the
   added band row, the added guard and the timings.

**Tally** (prereg order, prereg rules):

| row | verdict |
|---|---|
| T1 zones | HIT |
| T2 records and envelope | HIT |
| T3 Z2 = env fraction | HIT |
| T4 whole-sweep functionals | HIT |
| T5 bands: `1e5-p.5` clause | HIT |
| T5 bands: `[316228, 1e6)` clause | HIT (second pass) |
| T5 bands: full-decade sd sub-clause | NOT PRINTED |
| S1 new-band head | HIT (second pass) |
| S2 whole-sweep head | HIT |
| S3 worst head vs the ceiling | HIT |
| S4 twin pairs to 1e12 | HIT |
| S5 postulate | HIT |

Ten sealed rows, ten HIT, zero MISS.

## 1. Custody

Producer: `research/zonegap-04-sweep-1e12.js`, formally embedded with
`node research/qc/embed.js --timeout 14400 research/zonegap-04-sweep-1e12.js`.
No output in this note is hand-pasted; every figure below is quoted from that
script's embedded OUTPUT block.

**The sealed hashes, checked against the files on disk** (printed by the
producer, CUSTODY A):

| object | prereg quotes | recomputed from disk | verdict |
|---|---|---|---|
| `zonegap-03-model.js` code-sha256 | `94361acf...c59c` | `94361acf...c59c` | MATCH |
| `zonegap-03-model.js` out-sha256 | `805cbcbe...dffc` | tail records the same, and its pasted body hashes to it | MATCH |
| `zonegap-01.js` out-sha256 (the 1e11 dataset the model was fitted on) | `2be031a1...` (quoted in `zonegap-01.md`) | tail records the same, pasted body hashes to it | MATCH |
| `zonegap-01.js` code-sha256 | `5b6814a5...` | recomputed `5b6814a5...b79d` | MATCH, code and tail bound |
| `zonegap-03-prereg.md` | sealed at commit `f345adf` (quoted from `TODO.md` Z7, not from git) | file-sha256 `dad1aa0d...7932` | recorded |
| `a113274-gap-records.js` | the adopted 82-record ladder | file-sha256 `b6479604...5706` | recorded |

`research/zonegap-01.js` was NOT edited and NOT re-embedded: its sha256 is
printed before and after the sweep and is unchanged, so the 1e11 custody tail
stands.

**THE ENGINE COULD NOT RUN AT 1e12 AS IT STANDS, and this is the largest
custody item in the note.** `zonegap-01.js` inlines A113274/A113275 records
1..41 only (its TRUSTED DATA 1: "its first 41 records (p_end <= 1e11) are
inlined below as trusted data"), and its CUSTODY 1 asserts that the sweep's
own running-max ladder has exactly as many rows as the inlined records with
p_end <= X. At X = 1e12 the sweep reaches record 49 (record 42 starts at
1.34e11), so CUSTODY 1 fails and the engine exits before printing one zone
statistic; CUSTODY 3's envelope assertion would fail at p = 366,103. This is
an ENGINE RANGE LIMIT, found by reading the code before launching.

The producer therefore builds a DERIVED ENGINE: `zonegap-01.js`'s bytes with
exactly two constant array literals (`REC_GAP`, `REC_START`) replaced by the
same construction rule its own header states, applied at X = 1e12 — the
adopted ladder's records with p_end <= X, read from
`research/a113274-gap-records.js`. Four guards, all printed in the OUTPUT:

- (a) the derived arrays' first 41 entries equal the engine's inlined 41
  entry for entry: EXACT.
- (b) reversing the substitution reproduces `zonegap-01.js` byte for byte:
  YES, so nothing outside the two arrays moved.
- (c) every kept value < 2^53 (record 50 starts at 1.246e12, above X;
  records 76..82 exceed 2^53 and are not reached).
- (d) at X = 1e10 the original engine and the derived engine print the same
  stdout modulo elapsed seconds (both scrub to sha256 `c81fce4d...`):
  IDENTICAL, so the substitution is MEASURED inert on the audited range.

Derived-engine sha256 `76b875a0...e0cb`; original `44b4e461...b82b`. A reader
scoring Group T is scoring output from a source whose sha256 differs from
`zonegap-01.js`: guard (d) makes the difference a measured no-op on the range
where both can run, not a promise, but it is a deviation and it is stated
here rather than buried.

**Width audit at X = 1e12** (the engine's header audit says "X = 1e11
default-capable", so it was re-read, not assumed). The engine's own guard
admits X in [1e6, 4e15]. All quantities are <= p'^2 <= X = 1e12 < 2^53 =
9.007e15, exact in doubles. Base primes to sqrt(X) + 4000 = 1,004,000 are
int32-safe and the largest base prime squared, ~1.008e12, is exact. Sieve
strides p <= 1.004e6 over j <= X + 2 are double adds on integers < 2^53,
exact. SEG = 2^22, so the in-segment index is < 2^22 as audited and the
segment count is 238,419, itself int32-safe. Top zone p = 999,979, p'^2 =
999,966,000,289 <= X. The audit extends to 1e12; no BigInt is needed.

**Memory model** (checked before launching, because the prereg prices 1.87e9
twin pairs at 1e12). The engine streams pairs and stores none: a 4 MB segment
byte array, a monotonic deque of the live window's right-to-left maxima
(tens), one record per ZONE (78,497), openers below 1,204,000 only (~8,200),
and a first-occurrence map over gap sizes (~1,900 keys). Nothing scales with
the pair count. Measured RSS during the 1e10 guard run: 72 MB.

**Machine and timings.**
node v22.21.0 on darwin arm64, Apple M1 Max, 10 logical cores, 64 GB RAM.
Sweep wall time 4,145.2 s (69.1 min) as printed by the engine on the scored
second pass; wrapper total 4,249.0 s including the four 1e10 guard runs. The
first pass read 4,113.9 s inside 4,169.0 s with the same aggregates. The
prereg priced the decade at "about an hour": MEASURED 1.15 h. Peak RSS
observed by `ps` during the 1e12 child: 113 MB, so the memory model held.
Compute spent on this note in total: four 1e12-class sweeps of about 70 min
each, one of them discarded by a guard (§6, D9), plus two 1e11 runs and eight
1e10 guard runs.

**Second pass, 2026-08-29: the band argument, and what it did not fix.**
The two NOT SCORABLE rows were unscorable only because `zonegap-01.js`
hard-coded its band edges. The engine now takes an optional third argument, a
comma-separated list of extra band intervals `lo:hi` appended to the standard
decade bands and named X1, X2, ... with a legend line; it defaults to empty.

- The default path is unchanged, checked twice. Its embedded 1e11 tail was
  regenerated with the same invocation (`node research/qc/embed.js
  research/zonegap-01.js --timeout 900 -- 1e11`) and reproduces out-sha256
  `2be031a1...` exactly, body-lines 123 unchanged; **no `--force` was
  required and none was used**, because the guard fires only when the
  normalised output changes and it did not. Two figures in the block moved,
  both elapsed timings: `315.4 s` -> `319.3 s` in the SWEEP line and
  `315.7 s` -> `319.5 s` in the total. No other figure changed. Notes that
  quote 315.4 or 315.7 as this producer's runtime (`zonegap-01.md`,
  `zonegap-03-model.md`, `zonegap-03-prereg.md`) now name a superseded
  timing; the mathematics in them is untouched and this agent edited none of
  them. `zonegap-01.js`'s code-sha256 moved `5b6814a5...` ->
  `d8af999b...`, the honest signature of a code change. Separately, an
  independent check: the patched engine at X = 1e10 scrubs to sha256
  `c81fce4d...`, the same hash the first pass's guard (d) recorded for the
  pre-patch engine.
- **The 41-record assertion is NOT handled by the argument.** CUSTODY 1 still
  compares the sweep's ladder against the inlined 41-record prefix, so
  `zonegap-01.js` still exits at X = 1e12 on its own and the derived-engine
  substitution of §1 is still REQUIRED for this sweep. The one-line fix, reading
  the ladder from `research/a113274-gap-records.js` instead of inlining a
  prefix, was not applied: it is a second change to a custody file and is held
  for the orchestrator (§5).
- The producer's own tail was BOUND from the first pass, so re-embedding it
  with a deliberately changed output required `--force`, and the override is
  stamped in the fingerprint: `forced: 2026-08-29, 0 of 320 figures in the
  replaced block not reproduced`. Nothing from the first pass's block failed
  to reproduce; the difference is the added band row, the added guard block
  and the timings. The cost of learning this the slow way was one discarded
  70-minute run (§6, D9).
- A fourth guard was added to the producer and is printed. Guard (e): original
  and derived engine at X = 1e10 with an extra band `1e4:1e5` print identical
  scrubbed stdout (sha256 `0226dc84...`), and the X1 row reproduces the
  engine's own 10^4 row field for field, so the new code path is checked
  against a row the engine already computes.

## 2. Group T — the theorem-grade rows (sigma = 0, custody promotion)

The prereg's own framing: "every Z2 quantity the brief asked to predict is
custody, not statistics — its sigma is 0 — and a miss is a custody event
(engine defect or a wrong published record), never model noise." There are no
misses, so no custody investigation is owed. What follows is predicted,
observed, rule, verdict.

**T1. Zones.** Predicted 78,497 zones at X = 1e12 (p = 2 .. 999,979) and
51,205 new zones, p in [316,223, 999,979]. Kill: any other count.
Observed, printed: `SWEEP: X = 1.0e+12, ... 78497 zones (p = 2 .. 999979)`.
**HIT.** The new-zone clause is not a printed field: 78,497 minus the 27,292
zones of `zonegap-01.js`'s bound 1e11 tail gives 51,205, and an independent
base sieve run in this session gives 78,497 zones, p = 2 .. 999,979, of which
51,205 have p'^2 > 1e11. That is arithmetic on two printed counts plus a
second witness against a transcription error, not a second measurement.

**T2. Records and envelope.** Predicted: the running-max ladder at 1e12
equals A113274 records 1..49, exactly 8 new records enter, the envelope value
at the sweep top is 11,388, and the 8 new envelope-step rows are exact in
every field (p, Z2, gapStart, u, rec#). Kill: any deviation in any field.
Observed, printed: `CUSTODY 1: the sweep's running-max gap ladder ==
A113274 records 1..49 (all with p_end <= X): EXACT`; the ENVELOPE STEPS table
ends at `891409 11388 794623899269 1.0000 49` and the 8 rows 42..49 read

      366103    8994  134037421667   0.9999   42
      445321    9312  198311685749   0.9999   43
      472319    9318  223093059731   1.0000   44
      594551   10200  353503437239   1.0000   45
      696271   10338  484797803249   1.0000   46
      799003   10668  638432376191   1.0000   47
      885679   10710  784468515221   1.0000   48
      891409   11388  794623899269   1.0000   49

field for field as sealed. **HIT.** Note the direction of the information:
`Z2 > env` at any zone would have been a missed published record and `Z2 <
env` is impossible while s_42 = 1.34e11 far exceeds p_max = 1e6, so this row
tests the engine against A113274, and it agrees. Independently of the
prereg, CUSTODY 2 passed in both directions on 1,511 gap sizes against the
adopted Oliveira e Silva table (1,116 at 1e11), 0 mismatches; a single
mismatch voids that adoption by construction.

**T3. Z2 = env fraction 1.0000 at all 78,497 zones.** Kill: one zone off.
Observed, printed: `CUSTODY 3: env(p) = running max Z2 == largest A113274
record wholly below p'^2, verified at ALL 78497 zones: EXACT`. **HIT.** This
promotes the identity `Z2(p) = env(p)` from 27,292 verified zones to 78,497,
a 2.88x extension of the verified range of the `D = 0` theorem's premise. It
remains PROVEN CONDITIONAL on the adopted ladder being the true running max,
exactly as before; verification is not proof of the condition.

**T4. Whole-sweep staircase functionals at 1e12** (zones with p >= 100,
n = 78,472). Predicted: power-fit exponent e = 3.332 (match to 3 decimals),
mean u = 0.7913 (4 decimals), u deciles exactly
[0 0 1767 2105 1935 3878 8013 14607 23082 23085]. Kill: any digit.
Observed, printed: `over 78472 zones (p >= 100, cnt >= 2)`, `measured
exponent e = 3.332`, `mean u = 0.7913`, `decile counts [0.0-0.1 .. 0.9-1.0]:
0 0 1767 2105 1935 3878 8013 14607 23082 23085`. **HIT, every digit,
including n.** Twelve sealed integers and two sealed decimals, all exact.
This is the sharpest row in the prereg and also the most deterministic: the
model derives all of it from the ladder and a base sieve with no twin data.

**T5. Bands at 1e12, clause 1.** Predicted: the `1e5-p.5` band is not an
identical reprint, zone p = 316,223 joins it, 17,701 zones, printed c3 stays
3.930 +/- 0.219. Observed, printed band row: `1e5-p.5  17701  1.10e+08
3.930 +/- 0.219  0.7272  1/1.66e+06  0.725  924  0.752  0.728  0.462`.
**HIT** on the zone count and on c3 at the printed precision. (The row is
printed with the band name and count run together, `1e5-p.517701`, a
cosmetic width defect of the engine's `padEnd(7)`, noted in §6.)

**T5, clause 2 — the new band [316228, 1e6). HIT, second pass, every field.**
Predicted: 51,204 zones, c3 = 4.182 +/- 0.132, mean u = 0.836, frac u>0.8 =
0.690, worst Z2/width = 1/1.24e+7. Kill: any value off at the printed
precision. Observed, printed as row X1 of the second sweep, with the band
interval passed to the engine verbatim as `316228:1e6`:

      band   zones  pairs/zone   c3=Z2/ln^3(p)    maxLoad  worst Z2/width   head/ln2p  headmax  tail/ln2(p2)  meanU  frac u>.8
      X1     51204    9.13e+8     4.182 ± 0.132    0.7283     1/1.24e+7      0.723    1452      0.749   0.836   0.690
      X1 = extra band [316228, 1000000) from argv[3], additive only

51,204 zones, c3 = 4.182 +/- 0.132, worst Z2/width = 1/1.24e+7, mean u =
0.836, frac u>0.8 = 0.690. **Five sealed fields, five exact at printed
precision.** The band was named by the prereg on 2026-08-21 and passed to the
engine as a literal, not chosen after reading anything; the sealed numbers
were not touched, and no rule was re-read.

**T5, clause 3 — the full decade [1e5, 1e6): three fields reproduce, the sd
does not, and NO PRODUCER PRINTS THE ROW.** The sealed text also carries
"Full decade [1e5, 1e6): 68,905 zones, c3 = 4.117 +/- 0.193, mean u = 0.808,
frac u>0.8 = 0.631". The second pass printed the decade as two sub-bands,
not as one row, so this clause is scored by arithmetic on printed rows and
that is stated rather than hidden: 17,701 + 51,204 = 68,905 zones EXACT;
zone-weighted c3 mean (17,701 x 3.930 + 51,204 x 4.182)/68,905 = 4.117 EXACT;
mean u = 0.808 EXACT; frac u>0.8 = 0.631 EXACT. The pooled sd computed from
the two ROUNDED printed sds reads 0.195 against the sealed 0.193 — a
difference inside the propagation of the printing, so it is neither a hit nor
a miss, and it is left **NOT PRINTED**. Closing it costs one more 70-minute
sweep with `1e5:1e6` added to the band argument; it was not run.

## 3. Group S — the blind rows

These are the rows the seal actually risked. Each carries its sigma model
from the prereg; the deviations are computed from the sealed sigma, not
refitted.

**S1. New-band head. HIT, second pass.** Predicted mean head/ln^2 p over
[316228, 1e6) = 0.7275 +/- 0.0155, sealed 3-sigma [0.681, 0.774], with sigma
on n_eff = 5,076 pairs rather than 51,205 zones (the run-correlation priced
in, not assumed away). Kill: outside. Observed, printed in row X1's
`head/ln2p` column: **0.723**. Inside the sealed band; deviation
(0.723 - 0.7275)/0.0155 = -0.29 sigma. Two caveats stated before the verdict
is used: the column prints THREE decimals, so the observation is
[0.7225, 0.7235] and not a four-decimal number, which is far inside a band
0.093 wide and therefore does not change the verdict; and the sealed sigma
was calibrated on a deficit model fitted to three earlier bands, so a -0.29
sigma landing is agreement with an extrapolation, not a test that could
easily have failed. The band's `headmax` is 1,452, the same record-18 gap
that sets S3's worst load at p = 850,349.

**S2. Whole-sweep head at 1e12** (p >= 100, scored against the printed HEAD
line). Predicted 0.7259 +/- 0.0101, sealed 3-sigma [0.696, 0.756]. Kill:
outside. Observed, printed: `Mean head/ln^2 p = 0.7227 over 78472 zones
(p >= 100)`. Inside the band; deviation (0.7227 - 0.7259)/0.0101 = -0.32
sigma. **HIT.** Caveat on what this buys: the 1e11 sweep already read 0.7229
on 27,267 zones, so the sealed prediction and the prior reading differ by
0.0030 while the sealed sigma is 0.0101 — a persistence test more than a
forecast test.

**S3. Worst head vs the 0.76 ln^3 p ceiling at height p.** Predicted:
new-zone max (Exp-head model, run-corrected) median 0.640, 95% band
[0.520, 0.879]; whole-sweep worst = max(0.7218, new-zone max) with
P(stays 0.7218) = 0.80; sealed whole-sweep worst in [0.7218, 0.90] and the
guard (< 1) holds. Kill: outside [0.7218, 0.90] kills the Exp-head model;
>= 1 kills the guard. Observed, printed: `worst head vs the Kourbatov
ceiling AT HEIGHT p: head/(0.76 ln^3 p) = 0.7506 at p = 850349 (head 1452)`.
**HIT** on the sealed band and on the guard. Stated flatly because it matters
for how much the row is worth: the 80 percent branch did NOT occur. A new
zone beat the old worst case, so the reading that scored is the 20 percent
branch, comfortably inside a band 0.18 wide. The new extreme has a mechanism
worth one line: p = 850,349 is itself the start prime of A113274 record 18
(gap 1,452), so that zone's HEAD inherits a record gap, the head and the
record ladder are not independent fields, and the Exp-head model's tail is
therefore optimistic by an unquantified amount at exactly the zones that set
the maximum. That coupling is (i)-level and unmeasured; §6 lists it.

**S4. Twin pairs to 1e12.** Predicted 1,870,593,490 +/- 26,264 (two-point HL
calibration), sealed 4-sigma [1,870,488,435, 1,870,698,545]. Kill: outside.
Observed, printed: `SWEEP: X = 1.0e+12, 1,870,585,220 twin pairs`. Inside;
deviation -8,270 = -0.31 sigma on the sealed sigma. **HIT.** The prereg's own
honesty note governs the reading: pi2(1e12) is published but sits in no
adopted table of this corpus, so this scores against the sweep's own count
and tests the sigma machinery, not the literature. Comparing 1,870,585,220 to
a published pi2(1e12) would require adopting a table under the series rule;
that has not been done here and is not asserted from memory.

**S5. Postulate, refined.** Predicted: minimum in-zone pair count stays 2 (at
p = 2), single-pair zones stay 0. Conjecture-grade; a miss is mathematics
news. Observed, printed: `ZONE POSTULATE: every zone holds >= 1 pair; minimum
count 2 at p = 2; zones with a single pair: 0`. **HIT.** The Zone Postulate
now holds at 78,497 verified zones to 1e12 with two-pair slack everywhere.
This is verification of a conjecture on a finite range, and it says nothing
about i.o. p: the postulate's strong form is TPC-strength, which the
programme's own reading of the wall has not moved.

## 4. What the decade adds to Z2's measured law

All of this is (i): measurements of the zone fields on a finite range.
Nothing here bounds Z2 below the zone width, and nothing here says anything
at i.o. p.

**The decade adds one new band constant, MEASURED on 51,204 zones.** On the
first pass it added none, because the engine's band edges are hard-coded at
decades of p with the last decade split at sqrt(1e11) and the whole decade
p in [316,228, 1e6) fell in no printed row. With the band argument the second
pass prints it:

| band | zones at 1e11 | zones at 1e12 | c3 = Z2/ln^3 p | mean u | frac u>0.8 | worst Z2/width |
|---|---|---|---|---|---|---|
| 10^2 | 143 | 143 | 3.426 +/- 0.497 | 0.623 | 0.315 | 1/5.00e+1 |
| 10^3 | 1,061 | 1,061 | 3.681 +/- 0.362 | 0.672 | 0.308 | 1/7.06e+2 |
| 10^4 | 8,363 | 8,363 | 4.022 +/- 0.243 | 0.668 | 0.274 | 1/3.49e+4 |
| 1e5-p.5 | 17,700 | 17,701 | 3.930 +/- 0.219 | 0.728 | 0.462 | 1/1.66e+6 |
| [316228, 1e6) | — | 51,204 | **4.182 +/- 0.132** | 0.836 | 0.690 | 1/1.24e+7 |

So the decade adds (a) a band constant, c3 = 4.182 +/- 0.132, the highest and
by far the tightest band in the table, (b) the env identity verified at
78,497 zones instead of 27,292, (c) three whole-sweep aggregates that moved,
and (d) the pair count. Read the new c3 with its coordinates or not at all:
it is a band MEAN over p in [316,228, 1e6), the sd is a spread across zones
and not an error bar on a law, and the object is a deterministic functional of
the published record ladder, so the tightening from +/- 0.219 to +/- 0.132 is
the staircase getting relatively flatter across a wider band, not a
measurement getting more precise.

**The whole-sweep aggregates that moved** (1e11 -> 1e12, both from bound
embedded outputs of the same estimator):

| quantity | 1e11 | 1e12 |
|---|---|---|
| power-fit exponent e | 3.192 | 3.332 |
| E-form read (no noise) | 3.261 | 3.242 |
| ln^3 control | 3.000 +/- 0.003 | 3.000 +/- 0.002 |
| separation from the ln^3 control | 58.3 sd | 198.8 sd |
| residual sigma around ln^3 p | 0.064 | 0.054 |
| mean u (p >= 100) | 0.7071 | 0.7913 |
| mean head/ln^2 p (p >= 100) | 0.7229 | 0.7227 |
| worst head/(0.76 ln^3 p) | 0.7218 | 0.7506 |
| Oliveira e Silva envelope load, mean | 1.367 | 1.296 |

Two readings, both MEASURED and both narrow:

- **The exponent crossed the E-form.** At 1e11 the measured exponent sat
  0.069 BELOW the E-form read; at 1e12 it sits 0.090 ABOVE it. Both readings
  are deterministic functionals of the adopted ladder (no twin data enters
  either), so this is not sampling noise; it is what the record staircase does
  to a `ln Z2 = e * lnln p` fit as the lnln p range widens. It is estimator-
  dependent by construction and must not be quoted as "the exponent of Z2".
- **The measured object is not ln^3 p at these heights.** 198.8 control-sd
  from the ln^3 read, on a control calibrated on the same grid with matched
  noise. That was already the 1e11 finding (58.3 sd); the decade sharpens it
  and changes nothing qualitative.

**Against `TODO.md`:50, "Z2 ~ (3.4..4.0) ln^3 p drifting".** Two separate
points, and the row from `object-models-read-0829.md` §6 I2 is the second.

1. The printed band means at 1e12 span 3.426 (10^2) to 4.022 (10^4), with the
   top printed band at 3.930. The 10^4 row already reads 4.022, ABOVE the
   stated 4.0, and it read 4.022 at 1e11 as well: the TODO band's upper edge
   is 0.022 low against a printed row that predates this sweep. The drift is
   also not monotone (3.426, 3.681, 4.022, 3.930), and the last band is a
   HALF decade `[1e5, 316228)`, so the fall from 4.022 to 3.930 is partly a
   coordinate artifact of the band edge, not a fact about Z2. A coefficient
   without its band edges is the defect class `maxgap-law.md` §4 names.
2. **I2's pending contradiction is now CONFIRMED, and it is a measurement,
   not a model number.** `object-models-read-0829.md` §6 I2 records that
   `TODO.md`'s (3.4..4.0) would be contradicted by T5's sealed new-band
   c3 = 4.182 +/- 0.132 and full-decade 4.117 if the prereg scored. It
   scored: the sweep prints c3 = 4.182 +/- 0.132 over 51,204 zones in
   [316,228, 1e6), and the pooled full decade reads 4.117. Both sit above
   4.0, so `TODO.md`:50's band is contradicted at its upper edge by a
   measurement on the decade it does not cover. The proposed replacement is
   §5(a). I2's softer second point stands unchanged: the power-fit exponent
   (3.192 at 1e11, 3.332 at 1e12) is a different functional from c3 and the
   two must not be read as the same number.

**What the decade does NOT add.** No tail-field data (the engine prints only
a per-band tail mean, and the new decade has no printed band). No new
envelope record beyond the published ladder — by construction, since CUSTODY
1 would have failed instead. No statement about Z2 at unswept p. No progress
on the wall: proving `Z2 + head + tail < width` for every p is the strong
Zone Postulate, TPC-strength, and 78,497 verified zones is verification, not
a bound.

## 5. Proposed TODO.md text — HOLD for the orchestrator

Neither edit is applied; `TODO.md` is untouched by this agent.

**(a) For `TODO.md`:50**, which currently reads
`Z₂ ~ (3.4..4.0) ln³p drifting (Z₂ = the record envelope EXACTLY, D ≡ 0)`,
proposed replacement (the band is contradicted at its upper edge by the
measured decade, §4):

> `Z₂ = the record envelope EXACTLY (D ≡ 0), verified at all 78,497 zones to
> X = 1e12; band means c3 = Z₂/ln³p read 3.43 (10²), 3.68 (10³), 4.02 (10⁴),
> 3.93 ([1e5, 3.16e5)), 4.18 ± 0.13 ([3.16e5, 1e6), 51,204 zones,
> zonegap-04-sweep-1e12.js) — rising, not monotone, and every figure is a
> band mean that needs its edges quoted with it.`

**(b) For Z7 item (2)**, whose clause was rewritten today to name these two
items as OWED, proposed exact replacement text for that clause:

> (2) DONE for `zonegap-03-prereg.md` (`zonegap-03-score.md`, 2026-08-29):
> ten sealed rows, ten HIT, zero MISS, at X = 1e12 in two sweeps of about
> 70 min each on the laptop. Both OWED items are discharged: `zonegap-01.js`
> now takes an extra-band argument (default empty; its 1e11 tail
> re-embedded and reproducing out-sha256 `2be031a1...`, code-sha256 now
> `d8af999b...`), and the sealed rows T5 clause 2 and S1 scored on the
> re-sweep — c3 = 4.182 ± 0.132 and head/ln²p = 0.723 over the 51,204 zones
> of [316228, 1e6), both inside their sealed bands. STILL OWED, both small:
> (i) `zonegap-01.js` still inlines a 41-record A113274 prefix and still
> exits at 1e12, so the scored runs used a derived engine — the one-line fix
> is to read the ladder from `research/a113274-gap-records.js`; (ii) the
> full decade `[1e5, 1e6)` is printed as two sub-bands, so T5's sealed
> full-decade sd of 0.193 is unscored (pooling the printed rows gives 0.195
> from rounded inputs), which one more sweep with `1e5:1e6` in the band
> argument would close.

## 6. Defects, and what would falsify

**D1. The derived engine is a custody deviation, and it is the first thing an
adversary should attack.** The scored output did not come from
`research/zonegap-01.js` (sha256 `44b4e461...`) but from a derived source
(sha256 `76b875a0...`) differing in two constant arrays. Mitigations, all
printed: the substitution reverses byte-exactly, its first 41 entries match
the engine's inlined ladder, and original and derived print identical stdout
at X = 1e10. **What would falsify the inertness claim:** any X <= 1.34e11
where the two engines disagree. Only X = 1e10 has been checked. The stronger
check — derived at X = 1e11 against `zonegap-01.js`'s bound tail, 315 s — was
NOT run and is cheap; it is the first thing to do if this note is challenged.

**D2. `zonegap-01.js` has a hard range limit its header does not name.** The
header's width audit says "X = 1e11 default-capable" and its guard admits
X in [1e6, 4e15], but CUSTODY 1 exits as soon as the sweep finds a record
past the inlined 41, i.e. above p_end = 1.34e11. The failure lands AFTER the
full sieve, so at 1e12 it costs an hour before printing anything. Fix, not
applied here: read the ladder from `research/a113274-gap-records.js` at
require time instead of inlining a prefix, or state the ceiling in the guard.

**D3. Hard-coded band edges cost two of the ten sealed rows on the first
pass; FIXED on the second, at the price of a second 70-minute sweep.** The
band loop special-cases `e === 5` and splits at sqrt(1e11), so the first
1e12 sweep printed no row for the decade it had just measured. The engine now
takes an extra-band argument (§1). Residual: the fix is additive only, so the
full decade `[1e5, 1e6)` is still printed as two rows and T5's full-decade
sd stays unscored (§2).

**D4. Cosmetic, but it defeats a naive parser.** The band name column is
`padEnd(7)` and `1e5-p.5` is exactly 7 characters, so the row prints as
`1e5-p.517701` with no space before the count. `zonegap-03-model.js` parses
this block; the parse survived, but the column is one character from
ambiguity for any 7-character band name.

**D5. The head field and the record ladder are coupled, and S3's model does
not price it.** The 1e12 worst head sits at p = 850,349, which is the start
prime of A113274 record 18 (gap 1,452): a zone whose lower edge is a record
gap's start inherits that record as its head. So head extremes are drawn
partly from the same staircase Z2 is, and the Exp-head tail model behind S3
is optimistic at exactly the zones that set the maximum, by an amount nobody
has measured. MEASURED coupling, unquantified magnitude.

**D6. Group T's four hits carry less information than a 4-for-4 suggests.**
They are entailed by CUSTODY 1 and CUSTODY 3 passing, because the model that
sealed them recomputes those functionals from the same ladder. The only way
Group T could have missed was an engine defect or a wrong published record.
Reporting "8 of 10 sealed predictions scored" without that sentence attached
would overstate the result by most of its content.

**D7. The pair count is scored against itself.** S4 scores the sweep's own
count against a sealed sigma model; pi2(1e12) is published but sits in no
adopted table of this corpus, so no external confirmation of 1,870,585,220 is
claimed here. Adopting a twin-count table under the series rule would turn
S4 into a real external check and is not done.

**D8. Volatility in the bound output.** Hardware, node version and elapsed
lines sit inside the OUTPUT block, so `out-sha256` binds this run on this
machine; a re-run reproduces the mathematics and not the hash. The producer
writes a temporary sibling engine (`research/.zonegap-04-derived.tmp.js`)
during the run and deletes it; a killed run leaves it on disk, and it is
deliberately dot-prefixed and named `.tmp.js` so it is visible if it happens.

**D9. A bound tail refused a changed run, and one 70-minute sweep was
discarded.** The second pass was launched under `embed.js` without
`--force`. The producer's tail was BOUND from the first pass, the new output
differs (an added band row, an added guard, timings), and the tool correctly
refused to replace it — AFTER the 70-minute run, discarding the captured
output, since it holds the capture in memory and exits. The re-run under
`--force` is stamped in the fingerprint: `forced: 2026-08-29, 0 of 320
figures in the replaced block not reproduced`, i.e. every figure of the
replaced block reproduces. Cost of the omission: 71 minutes of compute.
Whoever re-embeds a long producer whose output has deliberately changed
should pass `--force` on the first attempt, or check the guard on a short
run first.

**D10. The head column prints three decimals and the S1 seal has four.** Row
X1 reads `0.723` against a sealed 0.7275 +/- 0.0155. The rounding is 30
times smaller than the sealed sigma, so the verdict cannot turn on it, but a
tighter seal on a future band would be unscorable against this column. Fix:
print head/ln^2 p to four decimals, which changes every band row and so needs
its own re-embed.

**What would falsify the note's claims, and whether the check has run.**

| claim | falsifier | run? |
|---|---|---|
| the substitution is inert | original vs derived differ at some X <= 1.34e11 | at X = 1e10 only |
| Z2 = env at all 78,497 zones | one zone with Z2 != env | asserted in-engine at all zones; independently brute-forced only at the 167 zones below 1e6 |
| the adopted ladder is the true running max to 1e12 | a twin gap below 1e12 exceeding every published record | CUSTODY 1 and 2 passed, 1,511 gap sizes both directions |
| the sigma machinery is calibrated | a decade whose sealed band misses | two rows at -0.3 sigma; that is agreement, not calibration |
| c3 = 4.182 +/- 0.132 on [316228, 1e6) | a producer printing the band and reading otherwise | RUN, second pass, printed as row X1 |
| the band argument is inert by default | the patched engine differing from the pre-patch engine at default args | RUN: identical scrubbed stdout at 1e10 (`c81fce4d...`) and an unchanged out-sha256 on the 1e11 re-embed |
| T5's full-decade sd of 0.193 | a producer printing `[1e5, 1e6)` as one row | NOT run; pooling the printed rows gives 0.195 from rounded inputs |
| the prereg's rules were not re-interpreted | any row scored against a band computed after the run | none; the two unscorable rows were left unscored for exactly this reason |
