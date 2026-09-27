# Attack 2: the killer census

<!-- ledger
id: Q-block-killers
status: ANSWERED
todo: none
question: For a maximal run of deleted T_v slots under the block v -> v^2, which primes do the deleting and how concentrated is the work?
verdict: Not concentrated: across 40 runs in five datasets every block prime kills at least one slot of every run and the exact minimum set cover is 82 to 100 per cent of the block, so no bound ranging over the block gets a reduction; the one favourable number is 915 of 1146 slots, 79.8 per cent, with exactly one killer.
-->

Object: BLOCK v -> v^2 on the twin tile T_v. For a maximal run of consecutive
deleted T_v slots, which primes of the block do the deleting, and how
concentrated is the work.

**VERDICT (two sentences).** The work is not concentrated: across 40 maximal
and near-maximal runs in five datasets, *every block prime kills at least one
slot of every run*, the exact minimum set cover of a run is 82 to 100 percent
of the block (100 percent in all 24 runs from exhaustive full-period scans),
and kills per prime follow the fair share 2L/p to within a factor 1.0 to 2.0
with the *largest* primes over-performing most. The effective block therefore
equals the nominal block to within a prime or two, so any bound that must range
over the block gets no reduction from this direction; the one favourable
number is that **915 of 1146 slots, 79.8 percent, have exactly one killer.**

Status: COMPLETE and exhaustive for v = 5 (full 23# period) and for two
extensions (full 29# and 31# periods). PARTIAL for v = 7, where block 2 is
provably out of computational reach and two sampled windows were used instead.
No existing repo file touched. Scratch code lives outside the repo.

---

## 0. Custody: block 1 reproduced from scratch, not taken on trust

New C program written for this task (segmented mask sieve, no repo code
reused). Slot i of T_5 is x = 30*floor(i/3) + [11,17,29][i mod 3]. Fold at
prime p sets bit j of slot i iff x = 0 or x = -2 (mod p). Runs are found in one
streaming pass, with the cyclic wrap closed by joining the tail run to the head
run.

| check | expected (brief) | measured | |
|---|---|---|---|
| period M = 23# | 223,092,870 | 223,092,870 | OK |
| T_5 slots | 22,309,287 | 22,309,287 | OK |
| survivors after the block | 7,952,175 = D_23 | 7,952,175 | OK |
| combined L | 19 | 19 | OK |
| max run span | G2(23#) = 204 | 204 | OK |
| kills by p, whole period | 2N/p | exact, all six primes | OK |

Kills per prime over the whole period land on 2N/p with zero error. That is
forced (N = 3*7*11*13*17*19*23 is divisible by every block prime) and is the
cheapest available check that the marking arithmetic is right.

Two further confirmations, both *predicted before running*, from the T_5 gap
pattern 6,12,12 and the published G2 table:

- primes 7..29 over 29#: predicted L = 25 with span 258 = G2(29#).
  Measured L = 25, span 258, survivors 214,708,725 = D_29.
- primes 7..31 over 31#: predicted L = 34 with span 348 = G2(31#).
  Measured L = 34, span 348, survivors 6,226,553,025 = D_31.

The span of a maximal run equals G2 of the modulus exactly in all three cases.
That is the identity making "combined L" and "twin-Jacobsthal maximal gap" the
same object read on two scales. It is a check here, not a new result.

Maximal runs are rare and all of them were examined: exactly **six** of length
19 in the whole 23# period (four of span 204, two of span 198), **two** of
length 25 at 29#, **four** of length 34 at 31#.

---

## 1. The five datasets

| id | tile | fold primes | scan | slots | L found | span |
|---|---|---|---|---|---|---|
| A | T_5 | 7..23 (6) = block 1 | full 23# | 2.231e7 | 19 | 198-204 |
| B | T_5 | 7..29 (7) | full 29# | 6.470e8 | 25 | 258 |
| C | T_5 | 7..31 (8) | full 31# | 2.006e10 | 34 | 348 |
| D | T_7 | 11..47 (11) = block 2 | window, 8.0e9 slots | 1.8e-7 of 47# | 34 | 450-516 |
| E | T_7 | 11..47 (11) = block 2 | window, 2.4e10 slots | 5.5e-7 of 47# | 37 | 492-540 |

B and C are not blocks (no v has v^2 = 29 or 31); they are the natural next
steps of the same fold set and serve as scaling probes. D and E are the real
block 2, sampled, because the full period cannot be scanned (section 8).
Statistics below use the top 8 runs of each dataset, 40 runs and 1146 slots
in total.

---

## 2. The maximal run of block 1, slot by slot

Run at x0 = 76,166,579, span 204, one of the four that realise G2(23#).
Offsets are from the first dead slot.

| # | offset | killers |
|---|---|---|
| 0 | 0 | 17 |
| 1 | 12 | 23 |
| 2 | 18 | 13 |
| 3 | 30 | 19 |
| 4 | 42 | 13 |
| 5 | 48 | **7, 11** |
| 6 | 60 | 23 |
| 7 | 72 | 11 |
| 8 | 78 | 7 |
| 9 | 90 | 7 |
| 10 | 102 | 17 |
| 11 | 108 | 19 |
| 12 | 120 | **7, 13** |
| 13 | 132 | 7 |
| 14 | 138 | 11 |
| 15 | 150 | 23 |
| 16 | 162 | 7 |
| 17 | 168 | 17 |
| 18 | 180 | 11 |

17 of 19 slots have a unique killer. Kills per prime 7:6, 11:4, 13:3, 17:3,
19:2, 23:3; 21 kills for 19 slots. All six block primes are used.

The maximal run of dataset C (L = 34, span 348, largest exhaustive case):

| # | offset | killers | | # | offset | killers |
|---|---|---|---|---|---|---|
| 0 | 0 | **7, 29** | | 17 | 174 | 29 |
| 1 | 12 | 23 | | 18 | 180 | 11 |
| 2 | 24 | 17 | | 19 | 192 | 31 |
| 3 | 30 | 7 | | 20 | 204 | **11, 19** |
| 4 | 42 | **7, 13** | | 21 | 210 | 7 |
| 5 | 54 | 19 | | 22 | 222 | 13 |
| 6 | 60 | **17, 29** | | 23 | 234 | 29 |
| 7 | 72 | **7, 11** | | 24 | 240 | **7, 23** |
| 8 | 84 | 7 | | 25 | 252 | 7 |
| 9 | 90 | 19 | | 26 | 264 | 17 |
| 10 | 102 | 23 | | 27 | 270 | 11 |
| 11 | 114 | **7, 11** | | 28 | 282 | **7, 19** |
| 12 | 120 | 13 | | 29 | 294 | 7 |
| 13 | 132 | 31 | | 30 | 300 | 13 |
| 14 | 144 | 13 | | 31 | 312 | 11 |
| 15 | 150 | 23 | | 32 | 324 | 7 |
| 16 | 162 | 17 | | 33 | 330 | 17 |

---

## 3. Unique-killer count: the one favourable number

| dataset | block | L | unique-killer fraction, mean | range |
|---|---|---|---|---|
| A 23# | 6 | 19 | **0.880** | 0.833-0.944 |
| B 29# | 7 | 25 | **0.813** | 0.783-0.840 |
| C 31# | 8 | 34 | **0.764** | 0.719-0.824 |
| D v=7 window | 11 | 34 | **0.780** | 0.719-0.818 |
| E v=7 window | 11 | 37 | **0.792** | 0.706-0.861 |

**Pooled: 915 unique-killer slots of 1146, 0.798.**

Four slots in five in a maximal run answer to exactly one prime. Compare the
global figure over every dead slot in the period, which is much worse: 0.637 at
23#, 0.608 at 29#, 0.582 at 31#, 0.608 in the v = 7 windows. Killers per dead
slot are 1.447, 1.497, 1.544, 1.510 globally, against 1.13 to 1.28 inside
maximal runs. **Maximal runs are markedly cleaner covers than typical dead
ground**, which is what one should expect: a run reaches maximal length only by
wasting as little coverage as possible. One length-22 run at 29# scored 1.000,
every slot with exactly one responsible prime.

What this buys: a bound that only has to defeat the unique killer of a slot
faces one prime per slot for four fifths of the run. That is genuinely the good
half of the answer. It does not shrink the *set* of primes involved, which is
the bad half and comes next.

---

## 4. Killer distribution: no concentration anywhere

Kills per prime, averaged over the top 8 runs, as a multiple of the fair share
2L/p:

| dataset | 7 | 11 | 13 | 17 | 19 | 23 | 29 | 31 | 37 | 41 | 43 | 47 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| A 23# | 1.12 | 1.17 | 1.13 | 1.19 | 1.26 | **1.76** | | | | | | |
| B 29# | 0.99 | 1.17 | 1.17 | 1.09 | 1.15 | 1.96 | **1.47** | | | | | |
| C 31# | 1.22 | 1.00 | 0.99 | 1.16 | 1.15 | 1.53 | 1.49 | **1.00** | | | | |
| D v=7 | | 1.15 | 1.16 | 1.35 | 1.08 | 1.48 | 1.37 | 1.41 | 1.82 | 1.63 | 1.14 | **1.69** |
| E v=7 | | 1.10 | 1.18 | 1.46 | 1.05 | 1.32 | 1.40 | 1.38 | 1.98 | 1.03 | 1.08 | **1.51** |

Every entry is of order 1. The distribution of work is the harmonic
distribution 2/p and nothing else, tilted slightly *toward* the top of the
block rather than away from it. Head against tail at v = 7 (primes 11..23
against 29..47), dataset D run 1: 27 kills against 16, observed split
0.628/0.372, predicted from sum 1/p alone 0.665/0.335. Pure harmonic weight
predicts the split to within four percentage points.

Killers per slot inside a maximal run: 1.13 (A), 1.20 (B), 1.24 (C), 1.28 (D),
1.24 (E). Block-wide capacity, sum 2/p over the block: 0.931, 1.000, 1.065,
0.971, 0.971. Maximal runs extract 1.2 to 1.3 times the *average* coverage
density, which is Trap 1 arriving from the other side: coverage was never the
scarce resource.

### The largest prime always works

| dataset | block top | largest killer in the longest run | its kills |
|---|---|---|---|
| A 23# (v^2 = 25) | 23 | 23 | 3 |
| B 29# | 29 | 29 | 2 |
| C 31# | 31 | 31 | 2 |
| D v=7 (v^2 = 49) | 47 | 47 | 3 |
| E v=7 | 47 | 47 | 2 |

The largest prime in the block kills in every one of the 40 runs. It never
sits idle, and neither does anything between it and the bottom of the block:
**distinct killers = full block in all 40 runs.**

---

## 5. The effective block: it is the whole block, or one prime short

Three measures, computed on each of the 40 runs.

**(a) Exact minimum set cover**, the smallest subset of block primes whose
kills still cover every slot, by exhaustive search over all subsets.

| dataset | block | min cover sizes over the 8 runs | mean | as fraction of block |
|---|---|---|---|---|
| A 23# | 6 | 6,6,6,6,6,6,6,6 | 6.00 | 1.000 |
| B 29# | 7 | 7,7,7,7,7,7,7,7 | 7.00 | 1.000 |
| C 31# | 8 | 8,8,8,8,8,8,8,8 | 8.00 | 1.000 |
| D v=7 | 11 | 9,10,11,11,11,11,11,11 | 10.62 | 0.966 |
| E v=7 | 11 | 9,9,10,10,10,10,11,11 | 10.00 | 0.909 |

**All 24 exhaustive-period runs need every prime in the block. The v = 7
windows show the first slack: 10 of 16 runs need everything, the worst case
needs 9 of 11.** The primes that occasionally drop out are 29, 37, 41 and 43,
never the smallest and never the largest. The slack appears where the block is
large relative to L, so it reads as a redundancy effect, not as evidence of a
core.

**(b) Drop-one.** Delete one prime's kills and measure the longest surviving
dead run. At 23#, dropping any single prime cuts 19 down to between 6 and 14.
At v = 7, dropping any single prime cuts 34 down to between 11 and 33. No
prime's removal is free (bar the exceptions in (a)) and none is decisive.

**(c) Best k primes**, the longest dead run obtainable from the best subset of
size k, exhaustive:

| dataset | k = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| A, L = 19 | 2 | 3 | 6 | 8 | 14 | **19** | | | | | |
| B, L = 25 | 2 | 3 | 6 | 10 | 13 | 17 | **25** | | | | |
| C, L = 34 | 2 | 3 | 8 | 12 | 14 | 18 | 24 | **34** | | | |
| D, L = 34 | 1 | 4 | 6 | 8 | 10 | 12 | 15 | 21 | 28 | 33 | **34** |
| E, L = 37 | 1 | 3 | 6 | 8 | 12 | 14 | 19 | 23 | 29 | **37** | |

Close to linear in k until the last one or two primes, where it jumps. Half the
block buys a quarter to a third of the run. There is no knee, no small core,
nothing to truncate.

---

## 6. Clustering of the multiply-killed slots: they spread

| dataset | multi-killed slots | adjacent multi-pairs, observed | expected if random |
|---|---|---|---|
| A 23# | 18 / 150 | 0 | 1.39 |
| B 29# | 35 / 188 | 3 | 5.13 |
| C 31# | 62 / 264 | 9 | 13.12 |
| D v=7 | 58 / 264 | 13 | 11.22 |
| E v=7 | 58 / 280 | 9 | 10.99 |

Redundantly covered slots do **not** cluster. Four of five datasets sit below
the random-placement expectation, that is, mild mutual repulsion; the fifth is
at expectation. Mean normalised distance from the nearer end of the run is
0.500, 0.418, 0.392, 0.495 against 0.5 for a uniform spread, so any bias of
overlap toward the ends of the run is weak and inconsistent.

Interpretation: the redundancy is not a structural seam that could be attacked.
It is the residue of an otherwise near-perfect packing.

---

## 7. The stated hypothesis, tested and reported as vacuous

> "the run is covered almost entirely by primes p < span(run), with the primes
> above the span contributing at most 2 slots each and mostly 0."

**Measured split: 100 percent below the span, 0 percent above, in every
dataset, because the set of block primes above the span is EMPTY.**

| dataset | span of longest run | largest block prime | span / top |
|---|---|---|---|
| A 23#, v = 5 | 204 | 23 | 8.9 |
| B 29# | 258 | 29 | 8.9 |
| C 31# | 348 | 31 | 11.2 |
| D v=7 | 474 | 47 | 10.1 |
| E v=7 | 528 | 47 | 11.2 |

The hypothesis is TRUE and EMPTY. The block never reaches the span; the span
runs an order of magnitude ahead of the top of the block, and that ratio grows.

The sharper threshold is not the span but p ~ 2L, below which a prime expects
at least one kill. 2L is 38, 50, 68, 68, 74 for the five datasets, against
block tops 23, 29, 31, 47, 47. Even that threshold sits above the block
everywhere.

Does the block top ever cross 2L as v grows? The ratio to watch is
2L / v^2 = 2 * G2((v^2)#) / (m_bar(T_v) * v^2). Measured 1.52 at v = 5 and at
least 1.51 at v = 7 (from a sampled window, so a lower bound). Projected from
the repo's certified Y2 lower bounds (G2-STATE §5a) taken at x = v^2, with
m_bar(T_v) = v#/D_v:

| x = v^2 | v approx | Y2 lower bound | m_bar(T_v) | L >= Y2/m_bar | 2L/x >= |
|---|---|---|---|---|---|
| 229 | 15 | 6,748 | 20.22 (T_13) | 334 | **2.92** |
| 1009 | 32 | 56,213 | 32.21 (T_31) | 1,746 | **3.46** |

m_bar(T_31) = 32.21 is independently confirmed by
`research/a3-10-lower-tightness.js`:793. Both rows are approximate: sqrt(x) is
not an integer, so m_bar is taken at the nearest tile level below, which
over-states L and 2L/x by a few percent. Neither row is near 1, so it does not
matter.

The ratio is bounded away from 1 and drifting up on the two points available.
**On this evidence the top of the block stays inside the working zone as v
grows**, which would mean every block prime keeps expecting about three kills
(2L/p ~ 3 at p ~ v^2), matching the two to three measured. That is the
structural reason the census came out flat, and it says the flatness is not an
artefact of the small v reached. Two points is not a trend; see COVERAGE.

---

## 8. Extension and affordability, decided by arithmetic not assumption

Measured throughput, single core, Apple M1 Max, 4-byte killer mask per slot,
segments of 2^28 slots (1 GB), peak memory 1 GB:

| run | slots | time | rate |
|---|---|---|---|
| A 23#, 6 primes | 2.23e7 | 0.54 s wall | 41 M slots/s |
| B 29#, 7 primes | 6.47e8 | 12.8 s wall | 50 M slots/s |
| C 31#, 8 primes | 2.006e10 | 471 s wall, 317 s user | 43 M slots/s |
| D v=7, 11 primes | 8.0e9 | 160 s wall, 141 s user | 50 M slots/s |
| E v=7, 11 primes | 2.4e10 | 441 s user (wall inflated by overlap with C) | 54 M slots/s |

**29#: affordable, done, full period.** 646,969,323 T_5 slots in 12.8 s. The
brief asked for a judgement on whether a segmented pass is affordable here; the
judgement is that segmentation was not even necessary at this size, since a
single 2.6 GB pass fits in the 64 GB available. It was used anyway because it
costs nothing and is what makes 31# reachable.

**31#: affordable, done, full period.** 20,056,049,013 T_5 slots, 7 min 51 s,
75 segments. The 31# period is not new ground for this repo:
`research/natal-cap-33-overnight.js`:259 already sieves W = 200,560,490,130.
What is new is recording the per-slot killer SET rather than a survivor count.

**37#: technically affordable, deliberately skipped.** 742,073,813,481 slots at
40 M/s is 5.2 hours on one core, under an hour on ten. Skipped on value, not on
cost: the five datasets already agree to two significant figures on every
statistic that matters.

**47#, the true block 2 for v = 7: NOT affordable. Confirmed by arithmetic, not
assumed.** 47# = 614,889,782,588,491,410, and T_7 carries 15 slots per 210, so
the period holds 43,920,698,756,320,815 slots. At the measured 50 M slots/s
that is 8.8e8 seconds, **27.8 years on one core, 2.8 years on ten**. No
constant-factor engineering closes that, and no smaller full period exists for
block 2, since the block's own primes force the modulus. It was not attempted.

**What was done for v = 7 instead.** Two contiguous windows of the 47# period,
both taken far from the origin because origin bias is a live concern in this
repo (`research/origin-excess.js` exists, so this is not a hypothetical).
Window D: 8.0e9 slots from slot 1,234,567,890,123. Window E: 2.4e10 slots from
slot 30,000,000,000,000. Combined coverage 3.2e10 of 4.4e16 slots, 7.3e-7 of
the period. Survivor density agreed to eight significant figures between the
two windows (0.357032279 and 0.357032274), which is a decent sign that neither
window is freakish.

The longest run found is 37 with span 528. The true block-2 L is larger:
G2(37#) = 528 already, and G2(47#) > G2(37#). With m_bar(T_7) = 14, a plausible
true L for block 2 is 50 to 65. **Every v = 7 statement here therefore
describes a run at roughly 55 to 75 percent of maximal length, and each one
agrees with the three exhaustive datasets.** A longer run can only flatten the
census further, since L rises while the block stays fixed at 11 primes.

---

## 9. Trap checks, both run

**Trap 1, capacity counting.** The census itself is not a capacity count: it
measures which primes actually cover, not how much cover exists. But capacity
turns up as a warning worth recording. Using the 6-divisibility cap (every T_v
gap for v >= 5 is a multiple of 6, so two slots in one class mod p differ by a
multiple of 6p, so each of the two classes {a, a-2} holds at most
floor((S-1)/6p) + 1 slots of a run of span S), the caps at 23# span 204 are
7:10, 11:8, 13:6, 17:4, 19:4, 23:4, sum 36 against L = 19. The cap was never
violated in any of the 40 runs, so the reasoning is sound, but it is slack by
1.8x, and on capacity alone the three primes 7, 11, 13 could cover 24 > 19
slots. Measured, the best three primes cover 6. **Capacity says a small
effective block is possible; measurement says it is not.** Anything derived
from the capacity side is vacuous, exactly as the brief warned.

**Trap 2, TPC.** The census is a measurement and implies nothing about a window
(u, u^2), so it does not trip the trap directly. The leverage it was scouting
does trip a weaker version, worth stating: a *bounded* effective block, k
primes independent of v, would give G2((v^2)#) = O_k(1), which is false for
elementary reasons, so the strong form of the hope was never on the table. The
survivable form, effective block of size o(pi(v^2)), is what the census tested
and refuted empirically.

---

## 10. What this closes and what it leaves

- **Any bound ranging over a reduced set of block primes is dead.** Minimum set
  cover is the whole block in all 24 exhaustive runs and 9 to 11 of 11 in the
  16 sampled ones.
- **The thin-tail reading is confirmed at the top of the block.** Primes near
  v^2 each kill two or three slots; there are pi(v^2) - pi(v) of them; all of
  them are needed. In the brief's own framing that also kills attack 3 and
  attack 7. (Stated as the brief framed it. The definitions of attacks 3 and 7
  were not in the brief and were not looked up, so treat the transfer as the
  brief's claim, not as verified here.)
- **The unique-killer fraction, 0.798 pooled, survives as the one asset.** Most
  slots in a maximal run answer to exactly one prime. Any next line should
  start from that and not from the size of the killer set.

---

## COVERAGE: what was not reached, what is suspected, where this is wrong

**Not reached.**

- Block 2 proper (v = 7, full 47# period) was not measured and cannot be.
  Everything at v = 7 comes from two windows covering 7.3e-7 of the period. The
  true maximal run at v = 7 was never seen.
- 37# was affordable and was skipped. No block beyond v = 5 has an exhaustive
  measurement, and v = 5 is the only genuine block in the whole report; B and C
  are extensions of its fold set, not blocks.
- Only the top 8 runs per dataset carry per-slot killer detail (the program
  prints detail for the first 8 only). For 23#, 29# and 31# this is not a
  limitation, since 6, 2 and 4 runs respectively reach maximal length and all
  were examined. For the v = 7 windows the tail of long runs was not analysed.
- **The CRT copy question was not examined, and it is the weakest point in the
  report.** The four maximal runs at 31# have near-identical kill profiles, and
  the six at 23# fall into three pairs that are identical in kill profile,
  drop-one profile and best-k curve (runs 1/6, 2/5, 3/4). If these are CRT copies
  of one configuration rather than independent samples, the effective sample
  size per level is one or two, not eight, and every "mean over 8 runs" in this
  report is over-counted. The v = 7 windows are less exposed, being drawn from
  far apart, but were not checked either.
- No attempt was made to construct the extremal configuration directly by DP or
  greedy search over residue choices, which is the only route to any statement
  about v = 7 and beyond.

**Suspected, not proven.**

- That the census stays flat for all v, on the grounds that 2L/v^2 is bounded
  below by about 3 and rising. That rests on the Y2 *lower* bounds and on
  m_bar(T_v) growing only like (log v)^2. If G2 grew much more slowly than the
  Y2 line suggests, the top of the block would eventually fall outside the
  working zone and the census would start to concentrate. Nothing here rules
  that out. It is a plausibility argument on two data points.
- That the unique-killer fraction settles above 0.5 rather than decaying toward
  the global value near 0.6. The sequence 0.880, 0.813, 0.764 across A, B, C is
  monotone down; D and E at 0.780 and 0.792 break the monotonicity but come
  from sub-maximal runs on a different tile, so they are not comparable. Three
  comparable points cannot distinguish a slow decay from a limit.
- That the slack in the v = 7 minimum set covers (9 to 11 of 11) is a
  redundancy effect from a large block rather than the first sign of a core.
  The evidence for the redundancy reading is that the dropped primes are always
  interior (29, 37, 41, 43), never the extremes, but that is 10 observations.

**Where this is likely wrong.**

- The v = 7 numbers are probably biased toward *more* concentration than the
  truth, since a run of 34 to 37 in a block of 11 primes has less room to use
  every prime than a maximal run of 50 to 65 would. That biases against this
  report's own conclusion, which is the safe direction, but the v = 7 rows of
  sections 4 and 5 should not be quoted as block-2 values.
- "True block-2 L is 50 to 65" is an extrapolation from G2(37#) = 528 and
  m_bar(T_7) = 14 with no error bar. It could be well off.
- An earlier draft claimed this was the largest exhaustive measurement of the
  object in the repo. That claim was checked and **WITHDRAWN**: grep for
  `200560490130` across `research/` and `paper/` returns 15 files, so 31#-scale
  work is routine here. Calibration of that grep: the same pattern hits
  `natal-cap-33-overnight.js`:123 and `a3-10-lower-tightness.js`:793, both known
  positives, so a null result would have meant something. The absence claim was
  wrong and is recorded rather than deleted.
