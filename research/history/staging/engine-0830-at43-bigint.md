# The @43 arithmetic ceiling: which paths leave 2^53, a BigInt-promoted K-30 engine gated against the record, and the price of the sixth residual collapse

<!-- ledger
id: Q-at43-bigint-0830
status: PARTIAL
todo: 1
question: Can the K-30 natal march be carried past its 2^53 ceiling to @43 exactly, and is the @43 point worth its cost?
verdict: The engine side is done and VERIFIED (five paths promoted to BigInt, @7..@37 and a 0.248% slice of @41 reproduced digit for digit); the @43 point is NOT run, because the measured extrapolation is 579 h of eight cores on this machine (a 43x tile times a 2.23x per-cell cost, against the brief's ~13x), which is a weeks-class box job whose only payoff is a sixth point on a curve with no consumer; the forecast 0.8393 raw / 0.8399 persisted stands unscored.
-->

*(2026-08-30. Staging note; nothing here is integrated into a live document.
HELD. Producer, formally embedded with both streams:
`research/history/staging/engine-0830-at43-bigint.js`. Calibration marked per
claim: PROVEN, VERIFIED (exact computation), MEASURED, HEURISTIC, OPEN,
REFUTED. Every figure below sits in that producer's OUTPUT block or is quoted
from `research/natal-cap-37-at41-march.js`'s embedded OUTPUT by line; nothing
is transcribed by hand. This note edits no other file.)*

---

## 0. What is open first

- **beta(43) is not measured.** Nothing below scores the forecast on record.
  The producer can run @43 (modes `shard` and `combine`, positions in BigInt)
  and was not asked to, because the measured price is far above the 3.5 h
  rule of the brief: 579 h wall on this machine's eight shards, MEASURED by
  extrapolation from a slice (section 4), against the record's 6.035 h for
  @41. The decision the brief wanted is therefore made by the price, not by
  a result.
- **S(41) still has one witness.** The record says so
  (`natal-cap-37-at41-march.js` reading 5, 10(a)); this note reproduces 0.248%
  of the @41 tile on the new path and nothing more of it. A full second
  march of @41 is 6 h of eight cores and was not run.
- **The per-cell cost at @43 is 2.23x the @41 cost and is not decomposed.**
  The cursor scan is the obvious suspect (3.12 scour cursor entries per
  block cell at @43 against 0.53 at @41, printed in PART 3) and the record's
  own reading names the ring-bucket sieve as the fix that was not built; the
  number here is a MEASURED ratio on interleaved equal spans under a shared,
  heavily loaded machine, not a profile.
- **No box conversion rate exists on disk.** `bench/README.md` carries laptop
  reference numbers and no box result file; the plan in section 6 prices in
  laptop core-hours and says so.

## 1. The object, the engine, and the forecast on record

The object is beta(x) = S(x)/E(x) of the natal march: S(x) is the exact
number of positions r = 11, 17 (mod 30) in [0, x#) surviving the strikes
r = 0, -2 (mod p) for every prime 7 <= p <= x and every scour prime
x < q <= floor sqrt(x#); E(x) is the independence value
(2/30) x# prod(1 - 2/p) prod(1 - 2/q). The engine of record is the K-30
engine in `research/natal-cap-37-at41-march.js`, whose header (lines 7-31)
states the question, the zero-knob classical curve
beta = (e^{2 gamma}/4)(1 + 2/ln W + 6/ln^2 W), and the ceiling. Rung:
every beta on the ladder is MEASURED (an exact integer S over a double E).

The record's last point is beta(41) = 0.8455 at S(41) = 256,725,962,834,
E(41) = 303,627,067,641.7 (`natal-cap-37-at41-march.js`:825), the fifth
consecutive collapse of the classical residual, +0.0046, +0.0026, +0.0016,
+0.0010, +0.0006 at @23..@41 (line 847). The forecast the TODO item quotes
is the record's own last printed line (line 851): "forecast @43
(W = 1.308e16, BEYOND 2^53 — needs a different engine): classical-raw 0.8393
(+persisted residual 0.8399)". PART 4 of the producer re-derives both from
the formula: classical(43) = 0.8393 at W = 43# = 13082761331670030, and
persisted = classical(43) + residual(41) = 0.8399, with residual(41) =
+0.0006 from S(41)/E(41) = 0.8455 against classical(41) = 0.8449. So the
@43 level extends beta, the natal survival ratio, at the MEASURED rung, and
the forecast is a HEURISTIC (a fitted-free curve plus the last residual). No
band was registered for either forecast, in the record or in TODO item 1;
the two differ by 0.0006, which PART 4 prints as 6.4 units of the fourth
decimal beta is quoted in.

## 2. The overflowing path, isolated

PART 0 recomputes the record's fourteen-path audit at @43 with every worst
case formed in BigInt. Five paths exceed 2^53 = 9007199254740992 in
magnitude: A (W = 43# = 1.4525 x 2^53), B (the bracket (sq+1)^2), C (the
y-depth product q^2 with q = 114379879), F (the CRT anchor, worst
13082756491294884), and M (the position 30k + 17, worst 13082761331670017).
The other nine stay below 2^53: M = W/30 = 436092044389001, N = 2 prod(p-2)
= 232312693362750, the shard anchor kA mod q, the cursor kb + i, and the
Int32 paths (block offset 118574183 and stride 114379879, 5.5% and 5.3% of
2^31). The extended-Euclid path E is bounded by 2q, not q^2, because each
coefficient is bounded by the modulus; the record's audit listed q^2 as its
worst case, which was safe at @41 and is over-conservative.

**The brief's premise is wrong in a way that matters for @47 and not for
@43.** TODO item 1 says "one line blocks it: W = 1.308e16 > 2^53 in the CRT
anchoring product", following the record's line 683 ("@43 dies at path A
first"). PART 0 re-runs the record's path F in the record's own double
arithmetic, `(((a-b) mod q) * inv30(q)) mod q`, on all 26,157,448 scour
classes at @43 (both lanes): 644256 of the products exceed 2^53 in
magnitude, and 0 disagree with BigInt. The reason is parity: a - b is q - 11, q - 13, q - 17 or q - 19,
even for every odd q, so each product is an even integer below
2^54 = 18014398509481984 and is exactly representable in a double. The same
parity makes W = 43# (even, below 2^54) exact as a double, which the block
confirms ("double(W) exact: YES"). The record's path F is exact at @43 by
accident, and the accident ends at @47, where 47# = 614889782588491410 lies
above 2^54. What actually breaks the record engine at @43 is (i) its own
guard `assert(W < 2**53)` in `levelSpec`, and (ii) path M: an odd position
30k + 17 above 2^53 rounds to an even double, and PART 0 shows the first
such k = 300239975158033 (BigInt 9007199254741007, double 9007199254741008,
off by -1), over 31.2% of the @43 tile, so every sampled survivor there would fail its twin check. VERIFIED
(exact computation, printed). The correction to the record is listed in
section 7.

## 3. The BigInt path and its chain of custody

The producer copies the record's march kernel (wheel prefix, strike loop,
SWAR census, survivor sampling) unchanged, and promotes exactly the five
paths above: W and the primorial ladder are BigInt (the double copy is
checked exact and its exactness printed); the square-root bracket is a
BigInt integer root; the y-depth assert is BigInt; the CRT anchor is a
BigInt product mod q whose result, below q < 2^31, is stored as a double
for the cursor arithmetic; every position that leaves the march is a
BigInt (`30n k + b`), and the 13-base Miller-Rabin plus strong-Lucas layer
already accepts BigInt. The class tables at @43 are 26,157,492 entries
built in BigInt in 6.41 s on the stderr line, a one-off per shard and not
a march cost. The march's per-strike cost is untouched: the
record's PART 0.5 measured a blanket BigInt cursor at 30x slower, and this
path keeps the cursors Float64 because at @43 they stay below 2^53 (paths G,
H).

Custody, PART 1, all on this code path, all VERIFIED against the record:

- Gate 0: @7..@29 serial. S, N, E, beta, scour census and y match at all
  seven levels.
- Gate 1: @31 serial. S(31) = 283449187, N = 4151035350, E = 328601798.6,
  beta = 0.8626, scour 37534 (37..447829), first survivor 448157, last
  200560488827; 36 sampled survivors are twins.
- Gate 2: @37 through eight shards, and per shard: all eight (np, S) pairs
  equal the record's shard lines (`natal-cap-37-at41-march.js`:784-791),
  S(37) = 7998394865, N = 145286237250, E = 9377228928.8, beta = 0.8530,
  first 2725001, last 7420738134527; 84 sampled survivors are twins. The
  eight shards took 1003.4 s wall here against the record's 437.0 s (line
  795), the machine being shared with the other agents of the wave.
- Gate 3: a slice of @41, shard 0's first 6000 blocks of 302246 at blockK
  2^22, against the three progress ticks the record embeds (lines 803-805):
  blk 2000 np=4686722957 S=349203305, blk 4000 np=9373445779 S=661452618,
  blk 6000 np=14060168660 S=961752168, all three matched, and the first five
  @41 survivors (17442827, 17443091, 17443301, 17443661, 17443961; line 828)
  matched. This is 0.248% of the @41 tile.

The brief asked for @37 and @41 "digit for digit". @37 is met in full. @41
is met on the slice the record makes checkable; the whole @41 tile is 6.035 h
of eight cores (line 820) and is outside this note's budget. What the slice
establishes is that the promoted path is the same deterministic function of
k as the record's on the region tested; it does not add a second witness to
S(41).

## 4. The price of @43, measured on a slice

PART 3 prints the exact strike budgets 4 M sum 1/q: @41 5.9157e+13 (M =
10141675450907, 1117909 scour primes, sum 1/q = 1.458276) and @43 2.6896e+15
(M = 436092044389001, 6539362 scour primes, sum 1/q = 1.541874). The ratio
is 45.465, of which 43.000 is the tile and the rest the longer scour sum.
**TODO item 1's "~13x the @41 runtime" is not the strike budget and is not
the measured cost.** No derivation of 13 was found in the record; it is
recorded as a brief error in section 7.

The measured part: equal spans of 2^27 k-cells at k = M/3 were marched at
@41 and @43 back to back, three interleaved repetitions, blockK 2^22. Per
span the block prints the counts (np and S on the span at each level) on
stdout and the seconds on stderr: @41 2.33, 2.19, 2.17 s and @43 5.24,
4.89, 4.87 s, medians 2.19 s and 4.89 s, a per-cell cost ratio @43/@41 of
2.230 (per strike 2.109). The load average at probe time is printed beside
it (7.6, 66.9, 124.9 on 10 cpus), since this machine was shared with the
other agents of the wave. The extrapolation, printed on stderr, is 6.035 h
(the record's eight-shard wall for @41) x 43.00 (tile) x 2.230 (per cell) =
579 h wall = 24.1 days on this machine's eight shards; the brief's 13x would
have been 78 h. A single serial span at blockK 2^24 came out at 3.65 s
against 4.89 s at 2^22, which is the same serial-versus-concurrent
inversion the record's cost log found at @41 (line 742 and reading 3), so
the block size for a real run has to be re-probed under concurrency on the
machine that runs it.

Calibration: MEASURED, one machine, loaded, three repetitions, a single
span position. The 2.23 factor is the least certain input; the 43x tile is
exact. Even at a per-cell factor of 1.0 the run is 6.035 h x 43 = 260 h
here (arithmetic on printed values). Nothing
under this heading is under the 3.5 h rule.

The residual-collapse question priced: the sixth collapse is the whole
payoff of the run, and it is one number to four decimals. The residual
sequence +0.0046, +0.0026, +0.0016, +0.0010, +0.0006 has ratios near 0.6;
a sixth term of that size sits between the two forecasts, 0.8393 and
0.8399, which differ by 0.0006. So the point would distinguish raw from
persisted only if it lands near one of them, and a landing between them
scores as the nearer one under the record's own rule (line 846,
"closest = ...") without a registered band.

## 5. What the @43 point would decide

One calibrated sentence: the @43 point would add a sixth MEASURED term to
the classical residual series and score the HEURISTIC forecast pair
0.8393/0.8399, and it cannot move any proof, because beta is the knob whose
headroom "has no consumer" (TODO.md:562, `sift-limit-attack.md`:689) and
the fifth collapse already leaves the classical curve without a rival
description at any computed level (`paper/anchored-note.md`:527-533). The
run's value is calibration of a curve, at weeks of box time.

## 6. The box plan

Given only if Chris wants the point. Everything is script-only: the
producer is one file with no repo dependency; ferry it, run, ferry the JSON
back, `combine` on the laptop.

1. **Convert first.** Run `bench/bench.sh` on the box for the Node
   single-core rate, and this producer's `probe 43 22 32`, `probe 43 23 32`,
   `probe 43 24 32` as 16 concurrent copies each (a shell loop), to pick the
   block size under concurrency on the 5950X's two 32 MB CCDs. The record's
   @41 finding was that the serial optimum (2^24) loses under eight shards;
   the box may differ. The producer's `BLOCKK` is a constant and must be
   edited on the ferried copy if 2^22 loses; say so in the returned log.
2. **Segment.** `shard 43 i 128 <dir>` for i = 0..127, 16 at a time under
   `nohup nice`, each writing `e0830-x43-of128-i.json` with np, S, first and
   last survivors and samples as decimal strings, plus its own seconds and
   the box's node version and CPU model. A segment is the checkpoint: a
   crash loses at most one segment. At the laptop rate each segment is
   579 h x 8 / 128 = 36 core-hours (arithmetic on the printed 579 h); at 16 concurrent that is 8 rounds of
   36 h = 12 days if the box matches this machine per core, and unknown
   until step 1 has run. Memory per shard is about 0.6 GB (26M-entry class
   tables plus cursors), 16 shards under 10 GB.
3. **Fold and score.** `combine 43 128 <dir>` on the laptop: asserts the
   partition is contiguous and exact, N = 2 prod(p-2), sums np and S,
   cross-checks E against the 2^256 fixed-point reference, BPSW-checks every
   sampled survivor as a BigInt, and prints the misses against 0.8393 and
   0.8399 with the sign. Bind the box stdout/stderr by the declared-provenance
   path with the node version and CPU in the tail; never hand-paste.
4. **Custody on return.** Before trusting S(43): re-run `quick` and the
   gates on the box's copy of the file (the `full` mode does this; its
   embedded elapsed here is 1621.4 s on the loaded laptop), and compare a segment boundary against a laptop
   re-run of the same k-range (`shard 43 i 128` for one i, about 36
   core-hours, or a narrower range via `probe`).

## 7. Corrections to the record and to the brief

- **Brief and record, the blocking path.** TODO item 1 line 554 and
  `natal-cap-37-at41-march.js`:683 say the CRT anchoring product / path A is
  where @43 breaks. PART 0 shows path F and path A are exact at @43 by
  parity (0 disagreements on 26,157,448 classes; W even and below 2^54);
  the breaks are the engine's own guard and path M (survivor positions
  above 2^53, 31.2% of the tile). The brief's fix (BigInt on "that single
  path") would have been insufficient without path M and unnecessary for
  path F at @43; it becomes necessary for F at @47. The producer promotes
  all five.
- **Brief, the cost factor.** "~13x the @41 runtime" has no source found in
  the record; the strike budget ratio is 45.465 and the measured per-cell
  extrapolation is 579 h against the record's 6.035 h, about 96x.
- **Record, the audit's path E bound.** `natal-cap-37-at41-march.js` PART 0
  lists invMod's worst case as q x q; the extended-Euclid coefficients are
  bounded by the modulus, so the true worst case is 2q. Harmless at @41 and
  at @43.
- **Brief, the reading of TODO's forecast.** The brief guessed the forecast
  was for "the anchored bias beta or the anchored calm"; it is beta = S/E of
  the natal march, and not the anchored calm of `research/anchored-calm.md`,
  which is a different object.

## 8. Honesty

The engine claim is narrow and checked: the promoted path reproduces the
record wherever the record can be checked without a six-hour run. It has not
produced a number the record does not already hold. The cost claim rests on
one loaded machine and three interleaved spans; it is good to perhaps a
factor of 1.5 on the per-cell factor and exact on the 43x, and no reading of
it brings @43 under the run-it-now rule. The @43 forecast is unscored and
stays so until someone spends the box time; this note's recommendation is
that the point be scheduled only if a sixth term of the residual series is
wanted for its own sake, since no live target consumes it.
