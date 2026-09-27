# Phase 1 / T1 — is the corrected greedy a G2 oracle?

<!-- ledger
id: Q-greedy-oracle
status: ANSWERED
todo: none
question: Is the corrected greedy a G2 oracle?
verdict: ORACLE ESTABLISHED, 13 of 13 exactly-known terms hit with minimum ratio 1.0000, so the greedy RULE is an exact solver where the answer is checkable at x <= 41; the rider matters more, the search budget needed grows 3.31x per additional prime and two objects whose truth reaches further show the same estimator's fidelity DECAYING, so nothing is established for the greedy AS RUN on the ladder.
-->

Date 2026-08-18. Files touched: `research/two-class-lower-bounds.js` and
`research/two-class-lower-bounds.md`, and this report. Nothing else. Nothing
committed, nothing pushed, `research/qc.js --full` not run.

---

## 0. Headline

**ORACLE ESTABLISHED, 13 of 13 exact, minimum ratio 1.0000** — and the finding
that matters more is the rider: the search budget needed to hold that ratio at
1.000 grows by a factor of **3.31 per additional prime**, so the ladder above
`x ≈ 100` gets a budget roughly `10^19` short of the one that established the
oracle, and **the oracle property is proved for the greedy RULE at `x <= 41`, not
for the greedy AS RUN on the ladder**.

New `Y2(37) = 527`, which IS `G2(37#) − 1`. Ladder extended one rung, to a
certified `G2(5003#) >= 479,340`.

Four results, ranked by what they change.

1. **The pre-registered test passes outright.** The repaired search reaches
   `G2(x#) − 1` exactly at all thirteen exactly-known terms `x = 2 .. 41`,
   including the new `x = 41` (545 against `G2(41#) − 1 = 545`). Every
   certificate replays clean. Log-log slope of the ratio against `x`: 0.0000.
   So the greedy rule is an exact solver for the difference-2 covering problem
   everywhere the answer is checkable, and `G2-STATE.md` §5a's "0.672 of the
   truth at `x = 37`" was a search failure, not an estimator property.

2. **Two other objects, where truth reaches further than `x = 41`, say the same
   estimator's fidelity DECAYS — and both are already below 1 at `x = 41` where
   ours is exactly 1.** One class (truth to `x = 229`, at the ladder's own
   budget schedule): `1.232 x^{-0.0638}`, reading 0.972 at `x = 41` and 0.725 at
   `x = 4001`. Free-choice two class (truth to `x = 73`, at the identical
   `R = 512` that makes ours exact): `1.538 x^{-0.1440}`, reading 0.901 at
   `x = 41` and 0.466 at `x = 4001`. This is new, it is the only direct evidence
   anywhere about what this instrument does above `x = 41`, and it is the single
   most decision-relevant thing in this report. See §4.

3. **The Y2 levels move, and NOT all of them upward.** `Y2(37)` goes 355 →
   **527** (×1.485, and 527 is the exact optimum); the gain decays up the ladder
   and at three levels the repaired search at an affordable budget
   lands *below* the 2026-08-17 chained run. Both are machine-verified certificates, so the
   certified bound at those levels is the older number. That is result 2 showing
   up in the ladder itself: **above about `x = 1300` the repair buys nothing,
   because the search is budget-limited, not method-limited.** See §5.

4. **The ladder extends, and the extension makes the same point.** `x = 5003`,
   `Y2 = 479,339`, replayed clean — one rung past where the ladder stopped, and
   `Y2/x²` continues down to 0.019. The rung was call-capped and took 94 minutes
   on its own, so the ladder stops here for cost, not for any obstruction, and
   the marginal value of another rung is low: §4 says the curve's LEVEL above
   `x = 41` is unmeasured, and another rung does not change that.

---

## 1. Custody, done before anything was changed

`node research/two-class-lower-bounds.js` at HEAD 88d2287, unmodified:

```
    37         65         355    5.46      1.5125   0.25931       0.7359    OK
   229        600        6748   11.25      2.0698   0.12868       0.9980    OK
```

**Y2 = 355 at `x = 37` and 6748 at `x = 229` reproduce exactly.** The published
ladder IS reproducible; the defect is in the search, not in the record.

Stronger custody than that was available and was taken. The old bisecting
`maxM` is kept in the repaired file as `oldMaxM`, and §1b runs it, so the
superseded ladder is regenerated from the same file that supersedes it:

```
       x   published   old search (cold)   old search (chained)
      37        355                355                   355   MATCH
      73       1211               1181                  1211   MATCH
     113       2501               2471                  2501   MATCH
     167       4210               4109                  4210   MATCH
     229       6748               6569                  6748   MATCH
```

The two columns differ because the old code seeded each level's bisection from
the level below. That is defect (3) below, and this table is the evidence for
it: cold-started, the old search gives 1181/2471/4109/6569, not the published
numbers. **The published ladder was only reproducible if you ran the levels in
order.** Its own write-up half-recorded this, noting that "an independent run of
the same code with different seeding produced 144191, 193637, 246209, 354982 at
the last four levels".

Run chained, over the whole ladder, **all sixteen published levels reproduce
exactly and all sixteen certificates replay clean**:

```
   x   published   old chained   match   replay      x   published   old chained   match   replay
  37        355           355   YES    OK          773      39277         39277   YES    OK
  73       1211          1211   YES    OK         1009      56213         56213   YES    OK
 113       2501          2501   YES    OK         1301      81986         81986   YES    OK
 167       4210          4210   YES    OK         1699     118367        118367   YES    OK
 229       6748          6748   YES    OK         2003     144712        144712   YES    OK
 313      10469         10469   YES    OK         2503     191927        191927   YES    OK
 421      16453         16453   YES    OK         3001     245270        245270   YES    OK
 571      25469         25469   YES    OK         4001     356711        356711   YES    OK
```

This matters for more than custody: **the old values are genuine machine-verified
certificates**, so at any level where the repaired search comes in lower, the
certified lower bound is the older number. See §5.

The optimised greedy in the repaired file was checked bit-identical to the
2026-08-17 routine over 4288 deterministic calls spanning `x = 2 .. 229` and
`m = 1 .. 400`, both tie-breaks, comparing `ok`, `uncov` and the full chosen
sequence: **0 differences**. So every number that moves below moves because of
the search and for no other reason. (It is also 4.2x faster, from an analytic
count initialisation and a batched per-prime decrement.)

---

## 2. The three defects, and the repair

**(1) Bisection on a non-monotone predicate.** `maxM` bisected on
`greedy covers [1,m]`. Enlarging the target changes every gain and hence the
whole choice sequence, so the greedy can fail at `m` and succeed at `m+1`.

**Attack 4's §8a table reproduces exactly, from an independent exhaustive scan**
(every `m` from 1, both tie-breaks, better kept):

| x | max m the det. greedy covers | longest unbroken feasible prefix | infeasible m below the max | published Y2 |
|---|---|---|---|---|
| 13 | 65 | 53 | 5 | 56 |
| 23 | 176 | 173 | 2 | 176 |
| 29 | 220 | 205 | 3 | 211 |
| 31 | **305** | **233** | 34 | **233** |
| 37 | **389** | 359 | 19 | **355** |

Every cell matches attack 4. At `x = 31` the published 233 is exactly the
unbroken feasible prefix and there are 34 infeasible values below the real reach
of 305, so the bisection understated the script's own estimator by 31%.

**(2) Deterministic tie-breaking.** Two fixed rules and no randomisation.

**(3) Level chaining.** The bracket was seeded from the previous level, so the
ladder depended on the order it was run in. Now a closed form, `x·ln²x`, which
also makes the levels independent and the ladder shardable across processes.

**The repaired search, and why it terminates.** Three phases, none assuming
monotonicity:

- **A, anchor and double.** Terminates because a full cover of `[1,t]` exhibits
  a legal `(a_p)`, so `t <= G2(x#) − 1 < ∞`, and `t` grows geometrically. This
  is the §1 CRT identity doing real work: it is what bounds the search domain.
- **B, scan and refine.** Between the largest feasible `lo` and the failing
  `hi`, try **every** one of `NG` interior grid points; move `lo` to the LARGEST
  feasible one seen, so holes are stepped over, and `hi` to the smallest failure
  above it. Terminates because `hi − lo` shrinks by a factor of at least `NG+1`
  per pass.
- **C, window polish.** Scan `m = best+1 .. best+W` exhaustively; a failure does
  not stop the scan; any progress restarts the window. Terminates because `best`
  strictly increases each restart and is bounded by `G2(x#) − 1`.

Plus two things that are not phases. **Every run certifies its prefix**: a
greedy that fails at `m` still leaves a covered run `[1,r]`, and that run is a
valid certificate for `r`, so failures are evidence rather than wasted calls.
And the budget is a cap on greedy **calls**, never on seconds, because a
wall-clock cutoff makes the output irreproducible — which is the class of defect
this whole file was opened for.

**Randomisation is seeded**: mulberry32, all streams from `SEED_BASE = 20260818`,
no `Math.random()` anywhere in the file.

**What is and is not proved.** The result is exhaustive over `(best, best+W]`
and best-effort below, so it is the exact maximum of the searched family
*provided no feasible target sits more than `W` above it*. `W` is calibrated by
measurement, not assumption: at the exact levels' budget the longest run of
consecutive infeasible `m` below the maximum is **7** (at `x = 31`), and `W` is
200. Whatever the search missed, the reported number is a certified lower bound,
which is the only direction the quantity is used in.

Measured cost of each defect separately, at the same seed base
(`W-only` = repaired window with zero restarts; `R-only` = restarts with no
window):

| x | published | old bisect (cold) | W only | R only | both | both/published |
|---|---|---|---|---|---|---|
| 37 | 355 | 355 | 410 | 422 | **527** | 1.485 |
| 73 | 1211 | 1181 | 1265 | 1277 | **1440** | 1.189 |
| 113 | 2501 | 2471 | 2639 | 2675 | **2823** | 1.129 |
| 167 | 4210 | 4109 | 4546 | 4450 | **4728** | 1.123 |
| 229 | 6748 | 6569 | 7091 | 6853 | **7372** | 1.092 |
| 313 | 10469 | 11039 | 11422 | 10967 | **11805** | 1.128 |

Neither defect dominates and they are super-additive: separately they buy 4 to
20 per cent, together 9 to 49 per cent.

---

## 3. THE ORACLE TEST (pre-registered rule, fixed before the test ran)

Rule: ESTABLISHED if greedy = optimum at ≥ 12 of 13 and ≥ 0.99 at all 13; DEAD
if the ratio degrades with `x`; otherwise report the fraction.

| `x` | 2 | 3 | 5 | 7 | 11 | 13 | 17 | 19 | 23 | 29 | 31 | 37 | 41 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `G2(x#) − 1` | 1 | 5 | 11 | 29 | 41 | 65 | 107 | 149 | 203 | 257 | 347 | 527 | 545 |
| old bisecting search | 1 | 5 | 11 | 29 | 41 | 56 | 107 | 137 | 176 | 211 | 233 | 355 | 419 |
| **repaired search** | 1 | 5 | 11 | 29 | 41 | 65 | 107 | 149 | 203 | 257 | 347 | **527** | **545** |
| ratio | 1.000 | 1.000 | 1.000 | 1.000 | 1.000 | 1.000 | 1.000 | 1.000 | 1.000 | 1.000 | 1.000 | 1.000 | 1.000 |

All thirteen replay clean against the independent verifier, which also rejects a
prime used twice, a prime outside the allowed set, and a class out of range
(calibrated on all three deliberate negatives).

> **VERDICT: ORACLE ESTABLISHED. 13 of 13 exact. Minimum ratio 1.0000. Log-log
> slope of the ratio against `x` over `x >= 13`: 0.0000.**

This confirms attack 4's replay-verified figures independently, and goes past
them: attack 4 reported 0.997 at `x = 31` and did not have `x = 41`. With the
phased search at `R = 512` both are exact.

It also saturates rather than running away: `R = 4000, W = 300` returns the same
thirteen values as `R = 512, W = 200`, so this is a converged answer and not an
artefact of unbounded search.

**Budget dependence of the verdict**, which the rule did not anticipate and
which the adjudicator should see:

| budget | exact / 13 | min ratio | verdict under the rule |
|---|---|---|---|
| `R=0, W=40` (repaired window, no restarts) | 8 | 0.738 | fails |
| `R=16, W=80` | 9 | 0.939 | fails |
| `R=64, W=120` | 10 | 0.965 | fails |
| `R=192, W=160` | 11 | 0.994 | between |
| **`R=512, W=200`** | **13** | **1.000** | **ESTABLISHED** |

---

## 4. THE RIDER, and it is the most decision-relevant thing here

### 4a. The budget needed grows geometrically in the number of primes

Restarts to first reach the optimum, at the optimum's own target, median over 25
independent seed bases, cap 30 000:

| `x` | 13 | 17 | 19 | 23 | 29 | 31 | 37 | 41 |
|---|---|---|---|---|---|---|---|---|
| primes `<= x` | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 |
| median restarts | 3 | 5 | 6 | 21 | 1 100 | 1 038 | 282 | 17 999 |

(`x = 41` censored in 6 of 25 bases at the cap, so 17 999 is a floor.)
`log(median)` rises **1.196 per extra prime**, a factor of 3.31. At `x = 229`, 50
primes, that extrapolates to `10^19` restarts. The ladder gets between 2 and 512.

### 4b. The same estimator's fidelity, measured where truth reaches further, DOES decay

`G2` is known only to `x = 41`. The **one-class** problem is known exactly to
`x = 229` — A048670, fifty terms — and §2+3 already runs the identical repaired
search on it as the matched control. So the control can measure its own fidelity
over a 100-fold range in `x`, and nothing else in this repo can.

| `n` | `p_n` | `g(p_n#) − 1` | repaired `Y1` | fidelity |
|---|---|---|---|---|
| 1 | 2 | 1 | 1 | 1.0000 |
| 2 | 3 | 3 | 3 | 1.0000 |
| 3 | 5 | 5 | 5 | 1.0000 |
| 4 | 7 | 9 | 9 | 1.0000 |
| 5 | 11 | 13 | 13 | 1.0000 |
| 6 | 13 | 21 | 21 | 1.0000 |
| 10 | 29 | 45 | 45 | 1.0000 |
| 15 | 47 | 99 | 99 | 1.0000 |
| 20 | 71 | 173 | 169 | 0.9769 |
| 25 | 97 | 257 | 231 | 0.8988 |
| 30 | 113 | 329 | 311 | 0.9453 |
| 35 | 149 | 431 | 395 | 0.9165 |
| 40 | 173 | 537 | 476 | 0.8864 |
| 45 | 197 | 641 | 556 | 0.8674 |
| 50 | 229 | 761 | 658 | 0.8647 |

exact at 16 of 50 terms. Fidelity ~ 1.232 x^-0.0638 over x in [11,229].
Extrapolated to x = 4001 that is 0.725, and to x = 41 it is 0.972.

**A third curve, and it is the budget-matched one.** The free-choice two-class
problem has exact ILP optima to `x = 73` (Resta/Morack, A072753). Over
`x = 23 .. 59` the whole stretch runs at the SAME `R = 512` that makes the
difference-2 greedy exact, and there the fidelity is `1.538 x^{-0.1440}`, mean
0.909, reading **0.901 at `x = 41`**.

> So at the same budget and the same `x = 41`, the greedy is **1.000** on the
> difference-2 problem and **0.901** on the free-choice one. The exactness is a
> property of the difference-2 structure, not of a generous budget. That is the
> best argument that our ladder degrades slower than the free-choice curve, and
> it is an argument, not a measurement.

**Read all three together.** On the two-class difference-2 object the fidelity is
1.000 at every `x` where truth exists, and truth stops at 41. On the free-choice
object it is already 0.90 at 41 and falling like `x^{-0.14}`. On the one-class
object, where truth runs 5.6x further than ours, it is exact to `x = 47` and then
falls. The two-class ladder above `x = 41` is bracketed by those and pinned by
none of them. **A falling
`Y2/x²` still does not show that `G2/x²` falls**, and now there is a measured
decay rate to price the doubt with rather than a hand wave.

---

## 5. The recomputed ladder

All sixteen levels recomputed with the repaired search and **every one replayed
from scratch by the independent verifier: sixteen of sixteen OK, zero
uncovered**, with prime reuse, out-of-list primes and out-of-range classes
rejected (the verifier was calibrated on all three deliberate negatives).

|  x   | R | W | Y1 (1 class) | **Y2 (diff-2)** | 2026-08-17 Y2 | new/old | Y2/Y1 | (Y2/Y1)/ln x | Y2/x² | Y2/(x ln²x) | replay |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 37 | 512 | 200 | 65 | **527** | 355 | 1.485 | 8.11 | 2.2453 | 0.38495 | 1.0924 | OK |
| 73 | 96 | 120 | 182 | **1,440** | 1,211 | 1.189 | 7.91 | 1.8441 | 0.27022 | 1.0716 | OK |
| 113 | 96 | 120 | 311 | **2,823** | 2,501 | 1.129 | 9.08 | 1.9201 | 0.22108 | 1.1179 | OK |
| 167 | 96 | 120 | 462 | **4,728** | 4,210 | 1.123 | 10.23 | 1.9996 | 0.16953 | 1.0808 | OK |
| 229 | 32 | 96 | 658 | **7,372** | 6,748 | 1.092 | 11.20 | 2.0619 | 0.14058 | 1.0903 | OK |
| 313 | 32 | 96 | 1000 | **11,682** | 10,469 | 1.116 | 11.68 | 2.0330 | 0.11924 | 1.1303 | OK |
| 421 | 12 | 80 | 1391 | **17,280** | 16,453 | 1.050 | 12.42 | 2.0558 | 0.09749 | 1.1241 | OK |
| 571 | 12 | 80 | 2005 | **26,303** | 25,469 | 1.033 | 13.12 | 2.0668 | 0.08067 | 1.1433 | OK |
| 773 | 12 | 80 | 2906 | **40,644** | 39,277 | 1.035 | 13.99 | 2.1031 | 0.06802 | 1.1889 | OK |
| 1009 | 4 | 64 | 3928 | **57,245** | 56,213 | 1.018 | 14.57 | 2.1070 | 0.05623 | 1.1859 | OK |
| 1301 | 4 | 64 | 5469 | **82,013** | 81,986 | 1.000 | 15.00 | 2.0912 | 0.04845 | 1.2259 | OK |
| 1699 | 4 | 64 | 7447 | **117,596** | 118,367 | 0.993 | 15.79 | 2.1231 | 0.04074 | 1.2512 | OK |
| 2003 | 4 | 64 | 8938 | **143,942** | 144,712 | 0.995 | 16.10 | 2.1183 | 0.03588 | 1.2434 | OK |
| 2503 | 2 | 64 | 11639 | **195,617** | 191,927 | 1.019 | 16.81 | 2.1478 | 0.03122 | 1.2763 | OK |
| 3001 | 2 | 64 | 14324 | **247,877** | 245,270 | 1.011 | 17.31 | 2.1613 | 0.02752 | 1.2884 | OK |
| 4001 | 2 | 64 | 19775 | **354,729** | 356,711 | 0.994 | 17.94 | 2.1627 | 0.02216 | 1.2888 | OK |

Extension past the 2026-08-17 ladder, same budget schedule. Still a LOWER
bound on `G2(x#) - 1` at every row, and at a budget thinner than any row above:

|  x   | R | W | Y1 (1 class) | **Y2 (diff-2)** | Y2/Y1 | (Y2/Y1)/ln x | Y2/x² | Y2/(x ln²x) | replay |
|---|---|---|---|---|---|---|---|---|---|
| 5003 | 2 | 64 | 25723 | **479,339** | 18.63 | 2.1877 | 0.01915 | 1.3206 | OK |

**Read the `new/old` column, because it is the story.** The gain from repairing
the search runs 1.485 at `x = 37`, 1.19 at `x = 73`, about 1.12 through the
middle, and collapses to about 1.0 by `x = 1301`, dipping below 1 at some of the
top levels. At the top of the ladder the repaired search and the defective one
land in the same place, because both are budget-limited rather than
method-limited there. **That is direct evidence that the top rows are not the
greedy's reach either, and it is the reason §4's rider matters more than §3's
verdict.**

At `x = 1699`, `x = 2003`, `x = 4001` the repaired search at its budget lands BELOW the 2026-08-17 chained run (117,596 against 118,367; 143,942 against 144,712; 354,729 against 356,711). Both are machine-verified certificates, so **the certified lower bound at those levels is the larger, older number**, and the repaired column is the weaker of the two there. That is not a defect of the repair; it is §5c arriving. The old search reached those values by chaining its bracket from the level below, which is free information the repaired search deliberately refuses in exchange for level independence, and at the top of the ladder that free information is worth more than the repair.

The levels were produced by sharding one process per level, which is only
legitimate because defect (3) was fixed: each row now depends on `x` and
`SEED_BASE` alone. Each reproduces on its own with
`node research/two-class-lower-bounds.js --ladder-only --levels=<x>`.

---

## 6. Corrections to the record (for CHANGELOG.md, not applied by me)

The standing doc convention is that working documents state current
understanding and all supersessions go to `research/history/CHANGELOG.md`. I own
only the two `two-class-lower-bounds` files, so the following are proposed, not
applied. **The task brief asked me to leave the old values marked superseded in
the body; the convention says not to. I resolved it by keeping the retired
ladder live in the SCRIPT (§1b regenerates it, and qc.js explicitly protects
script correction banners) and in this report, and by keeping only a
`new/old` diagnostic column in the body table. Flagging the tension rather than
choosing silently.**

**Retired, with the reason.** All sixteen 2026-08-17 `Y2` levels: superseded
upward, cause = three search defects (non-monotone bisection, deterministic
tie-breaking, level-chained bracket seed), greedy rule unchanged and verified
bit-identical. Old → new is the table in §5. `Y2(37)` 355 → 527, `Y2(4001)`
356,711 → 356,711.

**Files that quote a retired number and are not mine to edit:**

| file | what needs changing |
|---|---|
| `research/G2-STATE.md` §5a | the whole ⚠ block, lines ~596-631: the two defects are now three, the "not reproduced independently here" is now reproduced independently AND extended to `x = 41`, the four-row table (355 / 6,748 / 56,213 / 356,711 with `Y2/x²` 0.25931 / 0.12868 / 0.05521 / 0.02228) is superseded, "falls by a factor of 11.6" becomes 17.4, "reaches 2.2% of the zone, down from 26% at x = 37" becomes 2.2% against 38.5%, and "0.672 of the truth, should read 1.000" is now **confirmed at 13 of 13 including the new `x = 41`** |
| `research/G2-STATE.md` line 158 | `lower bound, best constructed \| 356,712 at x = 4001` → 356,712 |
| `research/G2-STATE.md` line 598 | the `maxM` defect description: the fix is in, and there was a third defect it does not name |
| `research/ZONE-POSTULATE.md` §5 / line 162 | the 108-fold `x²/certificate` climb: levels change, direction does not |
| `research/maxgap-law.md` lines 529-537 | the `G2(41#) ≈ 476 to 633` prediction is **settled**: the exact value is 546, inside the band, 6% above the 513 centre, and it discriminates neither branch of the outlier question |
| `research/U-FRAME.md` lines 177, 569, 627 | same: the 476-to-633 prediction is now a resolved test, not a pending one |
| `research/G2-STATE.md` line 864 | same |
| `TODO.md` line 150 | the `maxM` question is answered; the item can leave the file per its forward-only charter |

**One thing that is NOT a correction and should not be read as one.** The SAFE
verdict is untouched, and is now better supported at the bottom of the ladder
than before: at `x = 37` the construction is exactly `G2(37#) − 1 = 527`, and
`G2(37#)/37² = 0.386 < 1`, so the exact optimum sits comfortably inside the zone.
What changed is the level of the curve and the licence to read its slope.

---

## 7. COVERAGE — what I did not reach, and where I am most likely wrong

**Not reached.**

- **No two-class truth above `x = 41`.** Everything about ladder fidelity is
  inference from thirteen instances with at most thirteen primes each, plus two
  proxies on different problems. The single highest-value missing measurement remains an exact
  solver (ILP, DFS with bounds) for the two-class problem at `x = 43 .. 73`,
  which would extend the oracle test past the point where restarts stop being
  affordable. Attack 4 judged that feasible and did not attempt it; so did I.
- **The window width `W` is calibrated only at `x <= 41`.** The measured worst
  hole there is 7 at the high budget and 34 at a low one. `W` on the ladder runs
  200 down to 64 as the budget tightens, so the margin over the *measured* hole
  width narrows exactly where the budget is thinnest, and the hole width at
  `x = 4001` is unmeasured. If holes widen with `x`, the top of the ladder is
  under-searched by more than the call cap alone implies.
- **No local search beyond restarts.** No annealing, no LP rounding, no repair
  of a near-cover. Worth noting that a failing run at ladder scale typically
  leaves only 1 to 25 uncovered points out of hundreds of thousands, and the
  greedy stops because every prime is spent, not because no move has gain — so a
  swap-repair is the obvious untried lever and it is not obviously cheap.
- **§4d's Rankin-hybrid comparison was not re-run.** Its hybrid numbers come
  from the superseded estimator, so the comparison is now one-sided in the
  repaired greedy's favour. I edited the claim to say so rather than quietly
  keeping the old margin.
- **Three ladder levels are weaker than the numbers they replace, and I did not
  buy them back.** At `x = 1699, 2003, 4001` the repaired search at its call cap
  lands 0.5 to 0.7 per cent below the 2026-08-17 chained values. Raising the cap
  would fix it and I judged the cost not worth it — `x = 4001` already took 71
  minutes at 2404 calls, and the fix buys under a per cent on a quantity whose
  fidelity is unmeasured anyway. The consequence is that the ladder table is not
  a single consistent estimator's output at those three rows if a reader takes
  the max, and I have said so in the body rather than hiding it.
- **The ladder stops at `x = 5003` for cost, not for an obstruction.** That rung
  alone took 94 minutes and was call-capped. `research/two-class-lower-bounds.js`
  now sieves to 6100, so the next rungs are one command each.
- **Wall-clock costs here are unreliable.** The machine ran at load average
  250-300 on 10 cores throughout. Call counts are reported alongside seconds for
  that reason, and the seconds should be treated as upper bounds. On an idle
  machine the same work is several times faster; I measured 4.2x on the greedy
  alone before the load arrived.

**Suspected, not proven.**

- I suspect the two-class fidelity decays *slower* than the one-class fidelity,
  because the difference-2 constraint makes the instance more rigid and the
  greedy's exactness at 13/13 is a stronger regularity than the one-class
  estimator ever shows (which is exact at only a handful of its 50 terms). But
  that is a guess about the direction of an unmeasured quantity.
- I suspect the `x = 41` restart figure (17 999, censored) is an instance
  peculiarity rather than the trend, since `x = 37` needs only 282. The
  geometric fit is dominated by three points and is not stable.

**Where I think I am wrong.**

- **The headline is a rule-satisfied verdict on an instrument whose licence does
  not extend to where it is used.** If a reader takes away "the greedy is a G2
  oracle" and applies it at `x = 4001`, that is my fault, and no amount of
  labelling in §5d fully prevents it. The pre-registered rule was written
  assuming that a non-degrading ratio implies a usable oracle; it does not, when
  the budget that holds the ratio up is itself exploding. If I were writing the
  rule again I would require the ratio to hold at a budget that is a fixed
  polynomial in `π(x)`.
- **The `10^19` extrapolation is a log-linear fit through 8 points with a factor
  of 60 of scatter** (282 at `x = 37` against 17 999 at `x = 41`). It is the right
  order-of-magnitude message and the wrong number to quote to two figures. I have
  quoted it to one.
- **Both fidelity curves are proxies, not the thing.** They are the same
  estimator on different problems. The 13/13 result is itself proof that the
  three problems have different greedy-hardness profiles, so the decay rates
  transfer badly by construction. They are the best available evidence and they
  are not good evidence. §4's framing leans on them harder than that, and if the
  adjudicator wants one thing struck from this report it should be the numeric
  bracket `[0.47, 0.73]`, which reads more precise than it is.
- **`W = 64` at the top of the ladder is the thinnest thing in this file.** The
  only hole-width measurement is at `x <= 41`, where 7 is the worst at high
  budget. If the hole structure scales at all with `x` — and I see no reason it
  should not — then 64 is not a safe window at `x = 4001` and the top rows are
  under-searched for a reason I have not quantified. Measuring the hole width at
  `x = 229` or `x = 571` is affordable and I did not do it.
