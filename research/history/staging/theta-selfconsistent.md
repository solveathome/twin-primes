# The exact-supremum ladder, re-run self-consistently in H

<!-- ledger
id: Q-theta-selfconsistent
status: ANSWERED
todo: none
question: What does the exact-supremum theta ladder give when re-run self-consistently in H?
verdict: All five published self-consistent values reproduce exactly from two independent implementations; z = 31 is now measured at nP = 588, nP/z^2 = 0.6119, so the published 1.1776 is overstated by 1.93x, continuing the pattern, and at z = 47 a prefix walk finds the certificate failing at H = 1.0412 z^2, so the self-consistent unconditional requirement leaves the zone budget by z = 47.
-->

**The instrument is fixed and the ladder is re-run. Four things came out of it.**

**One: all five published self-consistent values reproduce exactly, from two
independent implementations.** `need/z^2 = 0.5485 / 0.4877 / 0.4637` at
z = 19 / 23 / 29, and 0.3550 / 0.4360 at z = 13 / 17, are confirmed digit for
digit against `phase1-T4-maximal-law.md` sec.4. The certificate is positive at
every one of the 223,092,870 positions of the z = 29 period at H = 390 = 0.4637 z^2,
and `sift-limit-lemmaV.js`'s own `fullPeriodArray` gives the same `sup|R| = 11.4187`
and the same `minT = 1` there. Nothing in the correction is overturned.

**Two: z = 31 is now measured, and it is the point T4 said it could not reach.**
Exhaustive walk over all 6,469,693,230 positions of the period: `nP = 588`,
`nP/z^2 = 0.6119`, `th_true = 1.8569`, positive at every position. The published
1.1776 is overstated by 1.93x, continuing the 1.58x, 1.74x, 2.17x pattern. T4's
guess that "1.1776/2.2 = 0.54 would continue the pattern" is close but low.

**Three, and this is the new finding: the crossing does happen, past where the
exact ladder can reach and far past where the published column put it.** At z = 47 a 4e9-position prefix walk finds `min_x T(x) = 0` at
H = 2300 = 1.0412 z^2. A prefix minimum is an UPPER bound on the period minimum,
so the certificate genuinely fails somewhere in the period at that window, and
`nP(47) >= 2301 > z^2`. **The self-consistent unconditional requirement leaves
the zone budget by z = 47.** `theta-ladder.md` sec.5b's correction box says
"**Nothing crosses**"; that is right for every z it measured and wrong as a
general statement. The crossing is in (31, 47], not in (23, 29).

**A fourth thing, about the method rather than the numbers.** TODO 0's named
first move is "take H from the caller and iterate to the fixed point". Iterating
to the fixed point is not enough, and the reason is structural: `sup|R_H| >=
H*M - minT_H`, so `f(H) = ceil(sup|R_H|/M)` equals H at EVERY H where
`minT_H = 0`. The fixed points come in runs (180..197 at z = 19, 372..389 at
z = 29, 586..587 at z = 31), the iteration lands on the first one, and the first
one certifies `T >= 0`, not `T >= 1`. The operative window is the last fixed
point plus one. The band walk, which answers every integer window in one pass
over the period, gets it in one walk where the iteration took eleven.

Repository files written: `research/theta-ladder-sup.js` (the fix and its
embedded tail) and this report. No live document was edited.

---

## 0. CUSTODY

**The old contract, before anything new was computed.** The rewritten script at
`--u=3.2` must reproduce the numbers the broken version produced, or the rewrite
changed the object and not just the interface:

```
$ node research/theta-ladder-sup.js 19 --u=3.2
  H=   12360 [given exact]  sup|R|=12.4270  H*M=489.4270  minT=477  need_true=313.83  th_true=1.9524  need/z^2=0.8693
$ node research/theta-ladder-sup.js 20 --u=3.2
  H=   14565 [given exact]  sup|R|=18.8274  H*M=486.8274  minT=468  need_true=563.28  th_true=2.1143  need/z^2=1.4082
$ node research/theta-ladder-sup.js 23 --u=3.2
  H=   22779 [given exact]  sup|R|=15.3410  H*M=778.3410  minT=763  need_true=448.97  th_true=1.9477  need/z^2=0.8487
$ node research/theta-ladder-sup.js 19 1e18 gauss --u=3.2
  gauss bound=22.8193  need_cond=576.28  th_cond=2.1588  slack=cond/true=1.8363
```

`sup|R| = 12.4270, 18.8274, 15.3410` and `minT = 468` at z = 20 are
`theta-ladder.md` sec.9's custody line verbatim; `need_true = 313.83, 448.97`,
`th_true = 1.9524, 1.9477`, `need/z^2 = 0.8693, 0.8487` and `slack = 1.8363` are
sec.5b's table verbatim. The legacy positional interface (`<z> <LIMIT> gauss`)
still parses.

**An independent second implementation at the OPERATIVE window.** The custody
above is at u = 3.2, which is the window the defect is about, so it does not test
the numbers this report is about. `sift-limit-lemmaV.js`'s exported
`fullPeriodArray(z, u, s)` is a different walker over a flat array; driving it at
`u = ln(nP)/ln z` gives:

```
z=13 u=1.596267 H=60  (want 60)  sup|R|=2.6494  minT=1  W=2310
z=17 u=1.706995 H=126 (want 126) sup|R|=4.9203  minT=1  W=30030
z=19 u=1.796019 H=198 (want 198) sup|R|=6.8403  minT=1  W=510510
z=23 u=1.771000 H=258 (want 258) sup|R|=7.8157  minT=1  W=9699690
z=29 u=1.771792 H=390 (want 390) sup|R|=11.4187 minT=1  W=223092870
```

Every one of those `sup|R|` and `minT` matches the blocked walker's band table at
the same H, at all five z. Two implementations, agreeing at the window the
conclusion is drawn about.

---

## 1. WHAT WAS WRONG AND WHAT THE FIX IS

`research/theta-ladder-sup.js`:18 read `const z=Number(process.argv[2]), u=3.2,
s=3.0;`. Confirmed by reading the line before touching it: z came from the
caller, u did not.

The window is now an argument, four ways: `--u=<x>` (H = round(z^x)), `--H=<n>`,
`--Hs=a:b[:step]` (a whole band in ONE walk over the period), and
`--fixed-point`. With no window given the script REFUSES to run and names the
defect rather than defaulting, because a default is exactly what produced the
bad column. The prefix `LIMIT` positional survives unchanged.

The fixed-point mode iterates `H_{n+1} = f(H_n)` with
`f(H) = ceil(sup|R_H| / M)`, from `H0` (default `round(0.25 z^2)`, deliberately
below the answer). **Convergence criterion: exact integer equality
`H_{n+1} === H_n`.** There is no tolerance because the iterate is an integer
window length. A cycle guard reports `CYCLE` and returns the largest member
rather than a fixed point; no monotonicity is assumed anywhere in the code.
`--strict` iterates `g(H) = ceil((sup|R_H|+1)/M)` instead, whose fixed point
certifies `T >= 1` rather than `T >= 0`.

The band mode is the instrument that matters. One pass over the period costs
O(NPOS) in the weight `cc(r)` and O(NPOS * |band|) in the accumulators, measured
here at about 4 ns per window per position against about 37 ns per position for
`cc` alone, so 161 windows cost roughly 18x one window rather than 161x.

---

## 2. THE SELF-CONSISTENT LADDER, EXACT OVER COMPLETE PERIODS

`s = 3.0` throughout. `H*` is the first fixed point of `f` reached by the
iteration; `nP` is the smallest window at which the certificate is positive at
every position of the period and stays positive to the top of the scanned band;
`need_true(nP) = sup|R_{nP}|/M`.

```
   z            W        H*  iters    nP   nP/z^2  th(nP)  sup|R_nP|  need_true(nP)  minT(nP)  positive everywhere
  13         2310        48      2    60   0.3550  1.5963     2.6494          47.44         1   YES (all 2,310)
  17        30030       116      3   126   0.4360  1.7070     4.9203         104.72         1   YES (all 30,030)
  19       510510       192      2   198   0.5485  1.7960     6.8403         172.75         1   YES (all 510,510)
  23      9699690       220      2   258   0.4877  1.7710     7.8157         228.73         1   YES (all 9,699,690)
  29    223092870       372     11   390   0.4637  1.7718    11.4187         358.60         1   YES (all 223,092,870)
  31   6469693230      <=530  band   588   0.6119  1.8569    16.2005         553.81         1   YES (all 6,469,693,230)
```

At z = 31 the fixed-point iteration was not run: at roughly 500 s per walk over
6.47e9 positions it would have cost eleven walks by the z = 29 precedent, so the
band was used directly. The coarse band shows fixed points of `f` at 530 and
above, so `H*(31) <= 530`; the fine band names `nP` exactly.

The z = 31 fine band, the new exact point, walked over the complete period:

```
        H     H*M     sup|R|    minT   need_true  th_true  need/z^2  H*M-sup
      586   17.1420   17.1420       0     586.00   1.8560    0.6098    0.0000
      587   17.1712   17.1712       0     587.00   1.8564    0.6108    0.0000
      588   17.2005   16.2005       1     553.81   1.8395    0.5763    1.0000
      589   17.2297   16.2297       1     554.81   1.8400    0.5773    1.0000
      ...
      595   17.4053   16.4053       1     560.81   1.8432    0.5836    1.0000
```

Against the published sec.5b column, which measured the same object at
`H = z^3.2`:

```
   z                        19       23       29       31
   published need/z^2   0.8693   0.8487   1.0060   1.1776
   self-consistent      0.5485   0.4877   0.4637   0.6119
   overstated by         1.58x    1.74x    2.17x    1.93x
   published th_true    1.9524   1.9477   2.0018   2.0476
   self-consistent      1.7960   1.7710   1.7718   1.8569
```

---

## 3. THE ONE-SIDED ROWS PAST z = 31, AND THE CROSSING

Past z = 31 the period is not walkable, so a prefix of 4e9 positions was walked
at every z. **The one-sidedness runs the other way for the two quantities and
both directions are the safe one here.** `sup|R|` over a prefix is a LOWER bound
on the period supremum. `min_x T` over a prefix is an UPPER bound on the period
minimum, so a prefix `minT < 1` PROVES the certificate fails somewhere in the
period at that window, and therefore proves a LOWER bound on `nP`. A prefix
`minT >= 1` proves nothing at all. Every row below is a lower bound and is
written with `>=`.

```
   z            W          walked   fraction   last H with minT<1     nP >=   nP/z^2 >=  th(nP) >=
   37  2.0056e+11      4.000e+09    2.0e-02                 1150      1151      0.8408     1.9520
   41  7.4207e+12      4.000e+09    5.4e-04                 1100      1101      0.6550     1.8860
   43  3.0425e+14      4.000e+09    1.3e-05                 1550      1551      0.8388     1.9533
   47  1.3083e+16      4.000e+09    3.1e-07                 2300      2301      1.0416     2.0106
```

The z = 47 row is the one that carries a verdict: the scanned windows were
1900, 1950, ..., 2600 at stride 50, `minT` runs
-7, -6, -5, -4, -4, -3, -2, -1, 0 at 1900 through 2300 and 1, 2, 3, 3, 6, 7 at
2350 through 2600, and the zone budget is `z^2 = 2209`. So the certificate is
NOT positive at every position at any window up to 2300 = 1.0412 z^2, and the
self-consistent requirement at z = 47 exceeds the zone budget. Because the
strides are 50, the exact prefix threshold is bracketed in (2300, 2350] and was
not named; the lower bound does not need it.

**The z = 47 bound was re-run at a 5x longer prefix and did not move.** Walking
2e10 positions instead of 4e9, at H = 2300, 2400, ..., 3000:

```
        H     H*M     sup|R|    minT   need_true  th_true  need/z^2  H*M-sup
     2300   53.2828   53.2828       0    2300.00   2.0105    1.0412    0.0000
     2400   55.5995   53.5995       2    2313.67   2.0120    1.0474    2.0000
     2500   57.9161   54.9161       3    2370.50   2.0183    1.0731    3.0000
     2600   60.2328   53.2328       7    2297.84   2.0102    1.0402    7.0000
     2700   62.5494   54.5494       8    2354.67   2.0166    1.0659    8.0000
     2800   64.8660   54.8660      10    2368.34   2.0181    1.0721   10.0000
     2900   67.1827   56.1827      11    2425.18   2.0242    1.0979   11.0000
     3000   69.4993   54.4993      15    2352.51   2.0163    1.0650   15.0000
```

`minT` is unchanged at every sampled H against the 4e9 run (0 at 2300, 2 at 2400,
3 at 2500), so 1.6e10 further positions turned up nothing worse. The lower bound
`nP(47) >= 2301` is therefore not an artifact of a short prefix at this window,
though it remains a lower bound. The prefix threshold is bracketed in
(2300, 2400] at stride 100 and was not named.

Note the shape of the column: 0.8408, 0.6550, 0.8388, 1.0416. The dip at z = 41
is the same bookkeeping irregularity `theta-ladder.md` sec.4 measures between z
and the largest prime below it, and by sec.4's own reading no local slope on this
ladder carries information.

**The trajectory, which is what the brief asks.** Putting the exact and the
one-sided rows in one column:

```
   z          13      17      19      23      29      31      37      41      43      47
   nP/z^2   0.3550  0.4360  0.5485  0.4877  0.4637  0.6119 >0.8408 >0.6550 >0.8388 >1.0416
   status    exact   exact   exact   exact   exact   exact  prefix  prefix  prefix  prefix
```

It rises to z = 19, falls through z = 29, and RISES from z = 31 onward. It stays
inside the zone budget at every exactly measured level, with the worst margin
39% at z = 31, and the one-sided lower bounds put it OUTSIDE the budget by z = 47.
The answer to "falling, flat, or rising" is: falling only over 19 to 29, rising
everywhere else, and the corrected column crosses the budget in (31, 47].

---

## 4. CROSS-CHECK AGAINST phase1-T4-maximal-law.md

T4 sec.4's table, against this run, independently coded and independently walked:

```
   z    T4 nP  T4 /z^2  T4 th_true   this run  /z^2     th_true    verdict
   13      60   0.3550     1.5963          60  0.3550   1.5963     EXACT MATCH
   17     126   0.4360     1.7070         126  0.4360   1.7070     EXACT MATCH
   19     198   0.5485     1.7960         198  0.5485   1.7960     EXACT MATCH
   23     258   0.4877     1.7710         258  0.4877   1.7710     EXACT MATCH
   29     390   0.4637     1.7718         390  0.4637   1.7718     EXACT MATCH
```

All five reproduce digit for digit. T4's scratch scripts were not committed, so
this is a genuine reproduction from an independently written walker, not a re-run
of the same code. T4's overstatement factors 1.58x, 1.74x, 2.17x reproduce too
(0.8693/0.5485 = 1.585, 0.8487/0.4877 = 1.740, 1.0060/0.4637 = 2.169).

---

## 5. sec.5b's CORRECTION BOX AND READING 8, RE-READ AGAINST THESE NUMBERS

Claim by claim.

1. "`theta-ladder-sup.js`:18 reads `const z=..., u=3.2, s=3.0;` -- z comes from
   the caller and u never does." **SURVIVES.** Verified by reading the line
   before the rewrite.
2. "a window 39x to 62x longer than the window the conclusion is drawn about."
   **DOES NOT SURVIVE AS STATED, and it understates the defect.** Against the
   self-consistent window the ratio `round(z^3.2)/nP` is 61.2, 68.7, 62.4, 88.3,
   122.6 at z = 13, 17, 19, 23, 29 and 100.7 at z = 31. The 39x appears to be
   `round(z^3.2)/need_true(published)` at z = 19, which is 12360/313.83 = 39.4, a
   different denominator from the 62x in the same phrase. The honest range is
   61x to 123x, and it grows like z^1.2.
3. "Measured self-consistently by exhaustive full-period walk, `need_true/z^2` is
   0.5485 / 0.4877 / 0.4637 at z = 19 / 23 / 29." **SURVIVES**, exactly (sec.4).
   One wording point: the number quoted is the WINDOW `nP`, not
   `need_true(nP) = sup|R_{nP}|/M`, which is 172.75, 228.73, 358.60, i.e.
   0.4785, 0.4324, 0.4264 of z^2. The window is the right quantity to quote; the
   label `need_true/z^2` is the loose part.
4. "overstated by 1.58x, 1.74x and 2.17x." **SURVIVES**, exactly.
5. "The certificate is POSITIVE at every one of the 223,092,870 positions at
   H = 0.46 z^2." **SURVIVES.** `minT(390) = 1` over the complete period, from two
   independent walkers.
6. "**Nothing crosses.**" **DOES NOT SURVIVE.** True at every z the box measured
   and at z = 31, which it did not. False by z = 47, where a prefix walk proves
   `nP >= 2301 > z^2 = 2209` (sec.3). The correct statement is that the crossing
   is in (31, 47] rather than in (23, 29).
7. "The prefix rows past z = 31 are lower bounds on an overstated quantity and
   therefore bound nothing for this question." **SURVIVES**, and this run
   replaces them with prefix rows at the self-consistent window that do bound it.
8. Reading 8's superseding paragraph repeats claims 2, 3 and 5 and inherits
   exactly their verdicts: the two values and the positivity statement stand, the
   "39x to 62x" does not.

**Two sec.5b readings the correction box does NOT flag, and one of them does not
survive either.**

- Reading 1, "the conditional column overstates the true requirement by a factor
  1.70 to 2.09": that ratio is `need_cond / need_true(u=3.2)`. Against the
  self-consistent window it is `need_cond / nP` = 2.458, 2.424, 2.910, 3.636,
  3.682 at z = 13, 17, 19, 23, 29. The factor is larger than recorded.
- Reading 2, "**That slack is a constant, not an exponent** ... 1.84, 1.86, 2.09,
  1.70, 2.02 with no trend, mean about 1.9", and from that "the conditional theta
  and the true theta have the same limit". **The "no trend" does not survive.**
  At the self-consistent window the slack reads 2.458, 2.424, 2.910, 3.636, 3.682
  and rises monotonically from z = 17 on. It is consistent with T4 sec.2's
  independent measurement that the crude-to-sharp loss runs "1.48 rising to
  8.40". The conclusion that the two columns share a limit is not refuted by
  five points, but it is no longer supported by the measurement that was offered
  for it.

**Two integration notes for whoever folds this in, neither of them a result.**

- `theta-ladder.md` sec.9's reproduction block lists
  `node research/theta-ladder-sup.js <z>` and
  `node research/theta-ladder-sup.js <z> 4000000000`. Both now exit 2 with the
  REFUSING message, by design, because they name no window. The replacements are
  `--fixed-point --band=<w>` and `<z> 4000000000 --Hs=a:b[:step]`, and sec.9
  needs updating with them.
- The tail is embedded with `--streams both`, which `qc/embed.js --check`
  verifies (`code-sha256 matches`, `out-sha256 matches`, "verified in the tail's
  recorded mode: stdout+stderr"). `qc/tails.js`, the slow tier, captures stdout
  only on a successful run and has no `streams` handling, so it may report a
  mismatch on this file and on the eight others already carrying
  `streams: stdout+stderr`. Pre-existing, not introduced here.

---

## 6. READINGS

1. **VERIFIED.** The rewritten walker reproduces the old u = 3.2 contract exactly
   at z = 19, 20, 23 (`sup|R| = 12.4270, 18.8274, 15.3410`, `minT = 468` at
   z = 20) and the sec.5b derived columns (`need_true = 313.83, 448.97`,
   `th_true = 1.9524, 1.9477`, `slack = 1.8363`). The rewrite changed the
   interface and not the object.

2. **VERIFIED.** At the operative window, `fullPeriodArray` and the blocked
   band walker agree on `sup|R|` and `minT` at all five z where both run:
   2.6494, 4.9203, 6.8403, 7.8157, 11.4187 and `minT = 1` at H = 60, 126, 198,
   258, 390.

3. **VERIFIED.** All five of T4's self-consistent values reproduce digit for
   digit from independently written code: 0.3550, 0.4360, 0.5485, 0.4877,
   0.4637.

4. **MEASURED.** z = 31, the point T4 recorded as not verified: `nP = 588`,
   `nP/z^2 = 0.6119`, `th_true = 1.8569`, `minT = 1` at every one of the
   6,469,693,230 positions of the period. The published 1.1776 is overstated by
   1.93x. T4's extrapolation "1.1776/2.2 = 0.54 would continue the pattern" is
   the right size and 12% low.

5. **MEASURED, and it is the new result.** At z = 47, `min_x T(x) = 0` at
   H = 2300 over a 4e9-position prefix, and a prefix minimum bounds the period
   minimum from above, so the certificate fails somewhere in the period at
   H = 1.0412 z^2 and `nP(47) >= 2301 > z^2`. **The self-consistent unconditional
   requirement leaves the zone budget at z = 47.** sec.5b's "Nothing crosses" is
   right for everything it measured and wrong in general; the crossing sits in
   (31, 47], not in (23, 29).

6. **MEASURED.** The z = 47 lower bound is stable under a 5x longer prefix.
   At 2e10 positions instead of 4e9, `minT` reads 0, 2, 3, 7, 8, 10, 11, 15 at
   H = 2300 to 3000 in steps of 100, identical to the 4e9 run at every H they
   share. The crossing verdict does not rest on a thin prefix.

7. **MEASURED.** The self-consistent column is 0.3550, 0.4360, 0.5485, 0.4877,
   0.4637, 0.6119 exact at z = 13 to 31 and then at least 0.8408, 0.6550, 0.8388,
   1.0416 at z = 37 to 47. It stays inside the zone budget at every exactly
   measured level, worst margin 39% at z = 31, and it RISES from z = 31 onward.
   The fall is confined to 19 through 29.

8. **MEASURED, about the method.** `f(H) = ceil(sup|R_H|/M)` has many fixed
   points, not one: `sup|R_H| >= H*M - minT_H` makes every H with `minT_H = 0` a
   fixed point, and they come in runs (180..197 at z = 19, 372..389 at z = 29,
   586..587 at z = 31 within the fine band). The iteration lands on the FIRST,
   which certifies `T >= 0`; the operative window is the LAST plus one. TODO 0's
   "iterate to the fixed point" is therefore necessary and not sufficient, and
   the script now says so on stdout when `minT(H*) < 1`.

9. **MEASURED, about cost.** The iteration is also the expensive way to get
   there. At z = 29 the orbit ran 210, 336, 368, 400, 369, 401, 370, 402, 371,
   403, 372, drifting by one through a near two-cycle for eleven full walks of
   the period. The band walk answers 161 windows in one pass at about 18x the
   cost of one window. Every number in sec.2 and sec.3 above came from band
   walks.

10. **MEASURED.** `nS`, the window from which the two-sided supremum certifies
   positivity outright (`H*M - sup|R_H| >= 1`), equals `nP` at z = 17, 19, 23,
   29, 31 and exceeds it at z = 13 (72 against 60). At every larger z the
   extreme deviation of `R` is on the negative side, so `sup|R_H| = H*M - minT_H`
   identically across the scanned bands and the sup criterion and the positivity
   criterion coincide. That is why the two columns agree, and it is a fact about
   this range, not a theorem.

11. **INFERRED.** The repricing in `theta-ladder.md` reading 11 is unaffected in
    direction and improved in the numbers: the unconditional all-positions
    exponent is 1.60 to 1.86 across z = 13 to 31, not the 1.95 to 2.05 on record,
    and it reaches 2.01 at z = 47 by a one-sided bound. The route still fails as
    a road to TPC for T4 sec.2's reason, which this run does not touch: the sharp
    maximal law is itself TPC-implying. What changes is that the unconditional
    data now DOES show the requirement leaving the budget, so sec.5b's headline
    reverts in direction while moving five primes to the right and losing the
    "at z = 29" that made it look imminent.

---

## 7. WHAT THIS DOES NOT SHOW

- **It does not prove anything for all z.** Every row is a finite verification at
  one z. `nP` is measured, not bounded.
- **Prefix positivity is worthless and is not claimed.** A prefix `minT >= 1`
  says nothing about the rest of the period; only `minT < 1` carries over. The
  script prints `PREFIX ONLY, NOT CERTIFIED` rather than a positivity verdict on
  any prefix row. Nothing in sec.3 asserts that any certificate is positive.
- **"Positive from nP onward" is verified only to the top of the scanned band.**
  Bands ran to H = 88, 176, 252, 300, 452, 665 at z = 13, 17, 19, 23, 29, 31. If
  `minT` dipped below 1 above those, `nP` would be larger. The pattern
  `sup|R_H| = H*M - minT_H` with `minT` stepping up about once per `1/M` makes a
  dip unlikely and does not exclude it.
- **The crossing point is bracketed, not located.** (31, 47] is all this run
  says. z = 37, 41, 43 are lower bounds below 1 and are silent on whether the
  true values there exceed the budget; only z = 47 carries the verdict.
- **One family only.** `s = 3.0` throughout. sec.5a's finding that theta barely
  moves with s was measured on the conditional column and has not been re-checked
  self-consistently.
- **Nothing here touches the Gaussian maximal law**, the elementary comparison,
  or T4 sec.2's argument that the sharp form is TPC-implying. Those are the
  reason the route retires; this report only fixes what the unconditional column
  says.
- **`T >= 1` is the certificate being positive, not a twin prime.** The object is
  `sift-limit-lemmaV.js`'s vector-sieve weight, unchanged.

---

## 8. GATE

`node research/qc.js` read **TOTAL 0** before this work began. After it,
**TOTAL 1**, and the single finding is on `research/greedy-oracle-validation.js`,
a file that is not mine and that is being written in the shared tree during this
session: it read `uncited-script` on one run and
`tail-does-not-belong-to-this-code` on the next, minutes apart, which is what an
in-flight file looks like. **No check names `research/theta-ladder-sup.js` or
this report.** The script's own tail verifies:
`qc/embed.js --check` reports `code-sha256 matches`, `out-sha256 matches`.

---

## 9. NOT REACHED

- **The exact full period at z = 37** (W = 2.0056e+11, roughly 30x the z = 31 walk,
  so about 4 h for one window and more for a band). That is the next exact point
  and it would say whether the exact column is already above 0.84 there.
- **The exact crossing z.** It needs exact periods at 37, 41, 43, which are 4 h,
  150 h and 6000 h respectively for a single window at the measured rate.
- **A contiguous prefix threshold at z = 37 to 47.** The bands there ran at
  stride 50, which is all a lower bound needs.
- **A prefix at z = 47 long enough to be worth calling representative.** 2e10
  positions is 1.5e-6 of that period. It changed nothing, which is suggestive and
  is not evidence about the other 999999.9998 parts in a million.
- **The conditional columns at the self-consistent window for every z.** Only
  z = 19 was spot-checked with `--gauss`; the O(N^2) mean square is the cost.
- **`--strict` was exercised but not laddered.** At z = 17 it converges to 137
  against `nP = 126`, i.e. it is conservative by 9%; whether that margin is
  stable across z was not measured.
