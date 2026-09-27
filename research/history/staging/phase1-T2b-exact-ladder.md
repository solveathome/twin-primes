# Phase 1 / T2b: the exact G2 ladder past 41#

<!-- ledger
id: Q-g2-43-term
status: ANSWERED
todo: none
question: What is the fourteenth exact term of the G2 ladder, past 41#?
verdict: G2(43#) = 618, at least position 830,330,079,152,051 and attained at 8 positions of the period, confirmed by two independent enumerations over disjoint natal masks agreeing on value, multiplicity, position and survivor count; 47# is priced by direct probe at 1.49 days per run and stays out of session reach.
-->

## Headline

**G2(43#) = 618**, the fourteenth exact term, at least position
830,330,079,152,051, attained at 8 positions of the period, confirmed by two
independent enumerations over disjoint natal masks that agree on value,
multiplicity, position and survivor count, with survivors = D_43 =
348,469,040,044,125 exactly on both, in 63 and 48 minutes on ten cores; and 47#
is priced by direct probe at 1.49 days per run, which is 2.3x cheaper than the
figure on the adjudicator's sheet but still firmly out of session reach.

## 1. The known positive, first

Nothing below is believable without this. Two instruments, built here today,
reproduce the whole exactly-known ladder.

**brute.c** sieves every integer of [0, x#) with no wheel, no masks and no
filtering, and walks the survivors. It is slow and stupid on purpose. It
reproduces ten terms:

    x    2   3   5   7  11  13  17  19  23  29
    G2   2   6  12  30  42  66 108 150 204 258

with `survivors = D_x` exactly in every case, where D_x = prod_{3<=q<=x}(q-2).
G2(29#) = 258 took 87 s by that method; 31# would take a week.

**tilegap.c** is the fast instrument. Against brute force it agrees on value,
on position, and on two things nobody had recorded before:

| x  | G2  | least position | number of maxima |
|----|-----|----------------|------------------|
| 19 | 150 | 659            | 20 |
| 23 | 204 | 76,166,567     | 4  |
| 29 | 258 | 1,205,437,109  | 2  |

The maximum is NOT unique. At 23# four positions attain 204 and at 19# twenty
positions attain 150. **This matters for the two-run protocol**: two runs over
different natal masks will in general report DIFFERENT positions for the same
G2, because each reports whichever maximum its thread schedule reached first.
Agreement on "the position" is therefore not a real check unless the maximum
happens to be unique. Both instruments here now report the multiplicity and the
LEAST position, which are canonical, and those are what the two runs are
required to agree on.

Continuing up the ladder with tilegap, on two base wheels each:

| x  | wheel | THRESH | G2  | least position    | maxima | survivors = D_x | wall |
|----|-------|--------|-----|-------------------|--------|-----------------|------|
| 31 | 19    | 6      | 348 | 8,813,641,451     | 4 | yes | 0.17 s |
| 31 | 23    | 3      | 348 | 8,813,641,451     | 4 | yes | 0.31 s |
| 37 | 19    | 11     | 528 | 544,899,485,411   | 2 | yes | 1.21 s |
| 37 | 23    | 7      | 528 | 544,899,485,411   | 2 | yes | 9.9 s (2 threads) |
| 41 | 19    | 12     | 546 | 3,784,200,788,231 | 4 | yes | 59.74 s |
| 41 | 23    | 9      | 546 | 3,784,200,788,231 | 4 | yes | 52.21 s |

G2(41#) = 546 at r = 3,784,200,788,231 with survivors = D_41 =
8,499,244,879,125 reproduces yesterday's result exactly. Two further
coincidences with yesterday's independent code base (`bitblock2.c`) are worth
recording because they are internal diagnostics nobody would match by accident:
the maximum run of dead T_v slots is **16** at v = 19 and **14** at v = 23, the
same two numbers yesterday's run printed as "COMBINED L". Different program,
same intermediate quantity.

And the position itself, by trial division with no wheel and no masks:

    verify b=41 pos=3784200788231  isSlot=YES
      next slot 3784200788777   gap forward  = 546

## 2. G2(43#)

**Certified lower bound, final and independent of any enumeration.**

    verify b=43 pos=1403312099425139  isSlot=YES
      next slot 1403312099425757   gap forward  = 618
      prev slot 1403312099425109   gap backward = 30

1,403,312,099,425,139 is twin-admissible mod 43# and the next twin-admissible
residue sits exactly 618 above it. That is trial division over the fourteen
primes up to 43 and nothing else, so **G2(43#) >= 618** stands on its own.

**Exact value, wheel 19, complete.** The period was cut into five chunks of
slot-tiles, each covering every one of the 1,348,781,387 copies. Chunk results
combine exactly (survivors add, G2 is the max, multiplicity adds over the chunks
attaining it, least position is the min), and that combination rule was verified
against a single-shot run on 31# before being used here.

| tiles | survivors | G2 | maxima | least position | max dead run | wall |
|-------|-----------|----|--------|----------------|--------------|------|
| [0,10)  | 75,385,445,990,400 | **618** | 4 | 1,403,312,099,425,139 | 20 | 921 s |
| [10,20) | 75,385,445,990,400 | 600 | 5 | 1,867,351,605,851,309 | 19 | 795 s |
| [20,30) | 75,385,445,990,400 | 600 | 6 | 3,244,484,377,606,049 | 19 | 758 s |
| [30,40) | 75,385,445,990,400 | 606 | 1 | 4,279,552,267,646,651 | 19 | 744 s |
| [40,47) | 46,927,256,082,525 | **618** | 4 | **830,330,079,152,051** | 20 | 568 s |

    survivors  = 348,469,040,044,125
    D_43       = 348,469,040,044,125   MATCH
    G2(43#)    = 618
    multiplicity = 8
    least position = 830,330,079,152,051
    max dead run of T_19 slots = 20
    wall total = 3786 s = 63.1 min on 10 cores

The survivor count matching D_43 to the unit over 5.1e14 examined slots is the
completeness check: every slot of the period was visited exactly once, none
twice, none skipped. And the answer certifies:

    verify b=43 pos=830330079152051  isSlot=YES
      next slot 830330079152669   gap forward  = 618
      prev slot 830330079152027   gap backward = 24

**Exact value, wheel 23, complete.** A second enumeration over a disjoint natal
mask, base wheel 23 instead of 19, THRESH 9 instead of 12, 1295 tiles instead of
47, 58,642,669 copies instead of 1,348,781,387. It shares no tile geometry with
the first.

| tiles | survivors | G2 | maxima | least position | wall |
|-------|-----------|----|--------|----------------|------|
| [0,260)     | 70,000,771,276,800 | 600 | 3 | 1,867,351,605,851,309 | 550 s |
| [260,520)   | 70,000,771,276,800 | **618** | 4 | **830,330,079,152,051** | 565 s |
| [520,780)   | 70,000,771,276,800 | 606 | 2 | 4,279,552,267,646,651 | 577 s |
| [780,1040)  | 70,000,771,276,800 | **618** | 4 | 1,403,312,099,425,139 | 549 s |
| [1040,1295) | 68,465,954,936,925 | 600 | 3 | 3,736,913,100,732,389 | 639 s |

### Two-run agreement

| | wheel 19 | wheel 23 | agree |
|---|---|---|---|
| G2(43#) | **618** | **618** | yes |
| number of maxima | 8 | 8 | yes |
| least position | 830,330,079,152,051 | 830,330,079,152,051 | yes |
| survivors | 348,469,040,044,125 | 348,469,040,044,125 | yes |
| = D_43 | yes | yes | yes |
| max dead run | 20 T_19 slots | 16 T_23 slots | n/a, wheel-dependent |
| wall | 3786 s = 63.1 min | 2880 s = 48.0 min | |
| throughput | 1.35e11 slots/s | 1.62e11 slots/s | |

**G2(43#) = 618, at least position 830,330,079,152,051, attained at 8 positions
of the period, with survivors = D_43 exactly on both runs.**

The max dead run differs because it counts T_v slots and the two wheels have
different slot densities; that is the same pattern as at 41#, where the two
wheels gave 16 and 14. It is not a disagreement.

## 3. Threshold safety, which nothing was checking

Both instruments filter: only runs of at least THRESH consecutive dead T_v slots
are examined. That filter is not free. A gap whose run is L < THRESH spans L+1
consecutive T_v gaps, so the filter can only miss gaps of size at most

    maxsum_THRESH(T_v) = max over i of ( s[i+THRESH] - s[i] ),  s = T_v slots.

The filter is sound if and only if maxsum_THRESH(T_v) < the G2 it reports. The
tables were never in the repo. Both a C and a JS implementation compute them
here and agree exactly:

    m       1   2   3   4   5   6   7   8   9  10  11  12  13  14
    T_19  150 186 210 228 282 300 348 378 390 462 498 528 540 570
    T_23  204 234 300 348 390 462 498 528 540 570 582 612 630 660

Every run above clears the bar, including yesterday's:

| run | THRESH | maxsum_THRESH | G2 found | margin |
|-----|--------|---------------|----------|--------|
| v=19 b=31 | 6  | 300 | 348 | 48 |
| v=23 b=31 | 3  | 300 | 348 | 48 |
| v=19 b=37 | 11 | 498 | 528 | 30 |
| v=19 b=41 | 12 | 528 | 546 | 18 |
| v=23 b=41 | 9  | 540 | 546 | **6** |
| yesterday v=19 b=41 | 11 | 498 | 546 | 48 |
| yesterday v=23 b=41 | 7  | 498 | 546 | 48 |
| **v=19 b=43** | 12 | 528 | **618** | 90 |
| **v=23 b=43** | 9  | 540 | **618** | 78 |

The two 43# runs are the most comfortable in the table, because 618 came in
well above 546 while the thresholds stayed where they were. Choosing THRESH
before knowing the answer is legitimate here: G2 is nondecreasing in x, since
the survivors mod 43# are a subset of the lift of the survivors mod 41#, so
removing residues can only lengthen gaps. G2(43#) >= 546 was therefore known in
advance, and any THRESH with maxsum_THRESH < 546 was safe before the run.

So yesterday's G2(41#) = 546 is sound on this axis, which was luck rather than
design, because the check did not exist. The v=23 / THRESH=9 margin of 6 is the
thinnest in the table and should not be pushed further.

The rule is load-bearing and not theoretical. A run of v=23, b=29 at THRESH=3
was launched by mistake during validation and returned **G2 = 0**, because the
true max run there is 2. maxsum_3(T_23) = 300 > 258 had already said that
threshold was illegal. The failure mode is silent when the answer is merely
depressed rather than zero.

## 4. The 2^53 boundary

43# = 13,082,761,331,670,030 and 47# = 614,889,782,588,491,410, against
2^53 = 9,007,199,254,740,992. Positions in [0, 43#) run to 1.31e16, so 31% of
the period lies above the double's exact-integer range; at 47# it is 98.5%.

Every position in both instruments is uint64 and there is no double anywhere on
the position path. The demonstration that this is load-bearing rather than
decorative is `dprobe.c`, which recomputes the reported position from the same
(s, j, v#) twice, once in uint64 and once in double, and trial-divides both.

Calibration, at 41#, where the arithmetic is safe:

    b = 41,  b# = 304250263527210   exceeds 2^53: no
      uint64 path : pos = 3784200788231
      double path : pos = 3784200788231   (difference 0)
      is the uint64 position a slot mod 41#? YES   gap forward = 546
      is the double position a slot mod 41#? YES   gap forward = 546
      of the 1000 integers from the answer upward, 0 do not survive a
      round trip through double.

That is the known negative: at 41# nothing breaks, and a test that fires there
would be measuring noise.

The same probe at the 43# scale, on a position above 2^53 (10,000,000,000,007
is a genuine twin-admissible slot mod 43#, reached as s = 2,742,737,
j = 1,030,960,783, v# = 9,699,690, which is exactly the form the enumerator
uses):

    b = 43,  b# = 13082761331670030   (2^53 = 9007199254740992, exceeds it: YES)
    inputs: s = 2742737   j = 1030960783   v# = 9699690
      uint64 path : pos = 10000000000000007
      double path : pos = 10000000000000008   (difference 1)
      is the uint64 position a slot mod 43#? YES   gap forward = 30
      is the double position a slot mod 43#? NO
      VERDICT: the double path gives a different position and it is NOT a slot
      of the 1000 integers from the answer upward, 500 do not survive a
      round trip through double.

**That is the test that fails if the arithmetic is broken.** A floating-point
implementation does not merely lose precision here; it reports a position that
fails its own trial-division check. Every reported position in this file has
been through that check.

And this is not hypothetical for the 43# run. The wheel-23 enumeration reported
its longest dead run at position 9,432,141,056,492,129, which is above
2^53 = 9,007,199,254,740,992. Checked:

    verify b=43 pos=9432141056492129  isSlot=YES
      next slot 9432141056492717   gap forward  = 588
      prev slot 9432141056492111   gap backward = 18
    above 2^53: True
    double round trip: 9432141056492128 differs by -1

That is an output of the enumerator, at a position the double cannot represent,
and 9,432,141,056,492,128 is even and therefore not a slot at all. The uint64
path gives a position that verifies; the double path would have given one that
does not.

Accumulating 47# in double gives 614,889,782,588,491,392, which is 18 short of
the true value. Half the integers at the 43# scale, and all but a vanishing
fraction at the 47# scale, cannot round-trip through a double.

53# = 32,589,158,477,190,044,730 exceeds 2^64 = 18,446,744,073,709,551,616 as
well, so a 53# position does not fit a machine word either. That is a one-line
fix rather than a wall: the position is only formed for recorded runs, off the
hot loop, so an `__int128` there costs nothing. The 53# obstacle is time, not
representation, and the time is quoted below.

## 5. Measured prices, from probe not from guess

Units, stated because the last three cost arguments in this repo went wrong on
units. One "T_v slot" is one integer of [0, b#) surviving the primes up to the
base wheel v. The instruments process 64 of them per machine word.

| instrument | measurement | throughput |
|---|---|---|
| `bitblock2.c` (yesterday) | 41#, 1.1878e13 T_19 slots in 151 s | 7.9e10 slots/s |
| `tilegap.c` (today)       | 41#, 1.1878e13 T_19 slots in 59.74 s | **1.99e11 slots/s** |

7.9e10 slots/s is exactly the figure the adjudicator was given, so the two
price sheets differ by the instrument and not by the arithmetic.

**The rate is not constant up the ladder, and pricing 47# off the 41# rate is
the mistake to avoid.** Adding a prime raises the dead fraction, which raises
the candidate rate the run-filter passes to the exact scan. Measured:

| x  | wheel | dead fraction among T_v slots | rate |
|----|-------|-------------------------------|------|
| 41 | 19 | 0.2845 | 1.99e11 slots/s |
| 43 | 19 | 0.3177 | 1.18e11 slots/s (chunk 1, no pair tables) |
| 43 | 19 | 0.3177 | **1.35e11 slots/s (whole run, 5.1075e14 slots in 3786 s)** |

So the honest basis for 47# is the measured 43# rate, not the 41# rate. Two
columns below: the optimistic one scales 41#, the one to plan against scales
the completed 43# run.

**47# was then probed directly rather than scaled.** Five configurations, each
running the real 47# geometry over a sampled fraction of the period, so the
mask sizes, the number of big primes and the cache behaviour are the real ones:

| wheel | tile | pair tables | inner-loop reads/word | table MB total | measured full-run projection |
|-------|------|-------------|-----------------------|----------------|------------------------------|
| 19 | 128 | 1 | 6 | 9.5  | 46.1 h |
| 19 | 128 | 2 | 5 | 21.4 | 40.4 h |
| 23 | 128 | 1 | 5 | 11.7 | 38.1 h |
| 23 | 96  | 2 | 4 | 21.0 | 37.4 h |
| 23 | 96  | 1 | 5 | 8.9  | **35.8 h = 1.49 days** |

The best configuration is not the one with the fewest reads per word. Two pair
tables take the working set to 21 MB against a 12 MB L2 shared by the P cluster,
and the extra misses cost more than the saved read. **The binding resource is
L2, not arithmetic**, which is worth knowing before anyone tunes this again.

| x   | wheel | T_v slots in x#           | price | basis | figure on the adjudicator's sheet |
|-----|-------|---------------------------|-------|-------|-----------------------------------|
| 43  | 19    | 510,749,791,722,225       | **63.1 min** | run completed | 1.8 h |
| 43  | 23    | 466,336,766,355,075       | **48.0 min** | run completed | |
| 47  | 23    | 21,917,828,018,688,525    | **35.8 h = 1.49 days** | probed at 47# | 3.5 days |
| 53  | 23    | 1,161,644,884,990,491,825 | **79 days**  | scaled from the 47# probe | 186 days |
| 59  | 23    | 6.85e19                   | **12.8 years** | scaled | 30 years |

Every one of these is under the figure on the sheet, by about 2.3x and not by an
order. **The adjudicator's instinct was right: this is the one cost argument in
this repo that is not secretly cheap.** 47# is a day and a half per run and
three days for the pair, on this laptop, and that is a measurement rather than
an extrapolation.

One reassurance about the scaling to 53# and 59#: the per-slot rate does NOT
decay as primes are added, because the safe THRESH rises with G2 at the same
time and a higher threshold makes the run-filter more selective. Wheel 23
measured 1.62e11 slots/s at 43# with THRESH 9 and 1.70e11 at 47# with THRESH 12.
The two effects roughly cancel over this stretch of the ladder.

Two configuration facts fell out of the chunking, both worth having:
- The pair table is worth 14%. Chunk 1 ran with no pair table (6 mask reads per
  word) at 921 s; chunks 2 to 4 with one pair table (5 reads) at 795, 758 and
  744 s. The budget has to be set against the tile width or no pair forms at
  all, which is how chunk 1 ended up misconfigured.
- The tile overlap costs 6.4%. Every tile scans 8 words past its end so that a
  run opening inside it can be closed, and at WT = 128 that is 376 extra words
  on 5917.

**What would bring 47# inside a day.** The tuning is already spent: the five
configurations above span 46.1 h to 35.8 h, and the best of them is 1.49 days.
The remaining 1.5x is not available from parameters, because the binding
resource is L2 and the table already fits it. Two routes are left.
1. **A hand-written NEON inner loop.** The run-filter is three shift-and-AND
   pairs per word and vectorises cleanly at two words per 128-bit lane; the OR
   of the mask rows and the popcount do too. 2x is plausible, which puts one
   47# run at about 18 hours and the pair inside a day and a half.
2. **More cores.** The work is embarrassingly parallel over tiles and the
   chunking already exists, so a 32-core machine puts one run at about 11 hours
   with no code change at all.
Neither is a session-length job, and the honest recommendation is to run 47#
overnight on a spare machine rather than to tune for it.

**What brings 47# inside a day.** It is already at 1.4 days, so the gap is a
factor of 1.4, and three separate things each cover it:
1. Base wheel 23 instead of 19 removes 8.7% of the slots outright (30.6 h).
2. Load balance. At WT=128 there are 47 tiles for 10 threads, so the final wave
   runs 7 tiles on 10 threads and the run ends about 15% idle. Splitting the
   copy range as well as the slot range makes the work unit arbitrarily fine.
3. Pair tables. Combining the two smallest big primes into one precomputed dead
   mask takes the inner loop from 6 reads per word to 5, and a second pair takes
   it to 4, bounded only by the 12 MB L2 shared across the P cluster.
An overnight run is enough for one 47# enumeration on this machine today, and
two independent ones fit a weekend. It is not out of reach; it is out of reach
*of a session*.

53# at 74 days is out of reach of anything short of a cluster, and the cost
curve is the honest reason, not the word size.

## 6. What the fourteenth term does to the open ratio question

Phase 1 exists because of one question: does G2(x#)/x^2 fall? The new term
answers it in opposite directions depending on the denominator, so the honest
statement is that it does not answer it.

| x  | G2  | G2/theta(x)^2 | G2/x^2 |
|----|-----|---------------|--------|
| 29 | 258 | 0.505559 | 0.306778 |
| 31 | 348 | 0.513829 | 0.362123 |
| 37 | 528 | 0.601195 | 0.385683 |
| 41 | 546 | 0.490942 | 0.324807 |
| 43 | 618 | **0.448750** | **0.334235** |

theta(x) = log(x#) = sum of log p over p <= x. Against theta^2 the new term
falls, 0.4909 to 0.4488, and 0.4488 is the lowest value anywhere in the
exactly-known range. Against x^2 it rises, 0.3248 to 0.3342.

**Neither is a trend.** The fall against theta^2 is 0.042 and the spread of the
previous four terms is 0.110, from 0.4909 at 41 to 0.6012 at 37. The step is
well inside the term-to-term fluctuation. One term does not move this question;
it adds a fourteenth point to whatever gets fitted, and it does so with the
denominators stated, which is the part that went wrong the last three times a
ratio was compared here.

## 7. The instrument

The gain over the previous layout is one inversion. The old layout streams, for
each copy j of the base tile, 2*nbig rows of D/64 words, so the mask array is
walked once per copy and the loop is memory bound. Here the loops are turned
inside out: the slot tile is cut into w-tiles of WT words, the per-tile residue
masks are a few hundred KB and stay in cache, and the inner loop runs over all
NCOPY copies.

What makes that legal is that the gap VALUE of a run from slot i1 to slot i2 is
s[i2] - s[i1], **independent of j**. Nothing has to be reassembled in position
order. Only the position of the maximum needs j, and that is computed once per
recorded run.

Runs straddling the copy seam are caught by extending the tile with
s[D+t] = s[t mod D] + (1 + t/D)*v#. The residue s[D+t] mod p carries the copy
shift automatically, so the extended tile is scanned with correct masks, and a
run is recorded by the tile owning its OPENING survivor, so every run is seen
exactly once and none twice. The cyclic wrap at j = NCOPY-1 is the same
mechanism and needs no special case, which is why the cyclic max gap at 19#,
23#, 29# and 31# matches brute force.

Two bugs found and fixed during validation, both worth recording:

- **A run reachable from two candidate words was recorded twice.** It never
  affected the maximum, only the multiplicity, which is exactly the kind of
  defect a value-only check cannot see. It showed up as base wheel 13 reporting
  5 maxima at 23# where wheels 17 and 19 reported 4. Brute force says 4.
- **False sharing on the per-thread result structs.** `sizeof(res_t)` is not a
  multiple of the 128-byte line, so some pairs of threads shared a line, and
  the survivor counter is bumped once per copy, which is billions of times.
  Fixed by accumulating into a stack-local struct and publishing once.

## 8. COVERAGE: what this does not establish

- **Maximality of G2(43#) rests on the enumeration, not on a certificate.**
  G2(43#) >= 618 is certified by trial division and stands alone. The claim that
  nothing larger exists rests on the two runs. They differ in base wheel, in tile
  geometry, in threshold and in the number of copies, but they share the phase-B
  run analysis, so a phase-B bug would corrupt both. The mitigation is that phase B was validated
  against brute force at THRESH=1, where the filter is vacuous, on every x up to
  29; and that the internal diagnostics at 41# match a code base written
  yesterday by a different route. That is strong but it is not a proof.
- **The threshold argument is the single point of failure I would attack first.**
  It reduces to maxsum being monotone in m (it is, trivially) and to the maxsum
  table being right. Two implementations agree, but they use the same
  definition, and if the definition is subtly wrong (say, off by one in what
  "spans L+1 gaps" means) both are wrong together. The margin at v=23 THRESH=9
  is 6 out of 546.
- **I did not run 47#**, on instruction. The 35.8 h figure is a probe of the
  real 47# geometry over 0.04% of the period, not a scaling, so it carries the
  right mask sizes, the right number of big primes and the right cache
  behaviour. What it does not carry is the tail: the probe samples a prefix of
  the copy index, and phase B cost varies with the copy, so a long run could
  drift. The 43# runs give the calibration for that, and there the chunk-to-chunk
  spread was 744 s to 921 s on wheel 19 and 549 s to 639 s on wheel 23, so about
  15%. **Plan against 41 h, not 35.8 h.**
- **The 53# and 59# figures ARE scalings** and should be read as one significant
  figure. They also carry an unproven assumption, that the safe THRESH keeps
  rising fast enough to hold the per-slot rate flat; that held from 43# to 47#
  and I did not check it further.
- **The multiplicity counts are new and unreplicated outside these tools.**
  Brute force confirms them only to 29#.
- **I did not reconcile G2/theta(x)^2 with the repo's c2'.** My table gives
  0.4909 at x = 41 where the 41# commit quotes c2'(41) = 0.5123. The definitions
  differ by something I did not chase. The quantity I computed is
  G2(x#)/theta(x)^2 with theta(x) = log(x#) = sum of log p over p <= x, stated
  explicitly so it is not silently compared against a differently-normalised
  number.
- **The run was killed once at 55 minutes** by the harness before it could
  print. That is why the work is now chunked. Anyone repeating this should
  assume long foreground and background runs will be terminated and should
  checkpoint at a granularity of about ten minutes.

## Artifacts

- `research/exact-g2-ladder.js` recomputes, instantly, the lower certificate for
  every term of the ladder, the maxsum threshold-safety table and its margins,
  and the 2^53 demonstration. It is BigInt throughout. It fails loudly if any
  certificate stops holding.
- The enumerators `tilegap.c` and `tilegap2.c`, the brute-force `brute.c`, the
  maxsum table `tv.c`, the double-hazard probe `dprobe.c`, the chunk driver
  `drive2.sh` and every run log are in
  `/private/tmp/claude-501/-Users-benjaminsen-Files-Git-primeoire/43d455bc-6530-4df2-9970-05f6622affcb/scratchpad/t2b/`.
  `tilegap.c` is the one to keep if only one is kept: it is the plainest and it
  is the one that was checked against brute force first. `tilegap2.c` is the one
  that produced the 43# answer, because it is the one that can be chunked.
  Reproducing 43# is two commands per wheel:

      ./drive2.sh 19 43 12 128 10 0 47 out19.txt 10 1024
      ./drive2.sh 23 43  9  96 260 0 1295 out23.txt 10 1024

  then add the per-chunk survivor counts, take the max G2, add the multiplicities
  of the chunks attaining it and take the least of their positions.
