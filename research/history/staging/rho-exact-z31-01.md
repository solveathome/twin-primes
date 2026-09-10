# Exact Λ and sup|ρ̃| at z = 31 and z = 37: TODO item 0's named cheap data, run

<!-- ledger
id: Q-rho-maximal-law
status: PARTIAL
todo: 0
question: What is the rho maximal law, what is its weakest sufficient form against the crossing, and where does it sit against print?
verdict: TODO 0's named cheap data ran (6928 s): Lambda(31) = 476.314, Lambda(37) = 1286.338, sup|rho~|(31) = 28.122062, sup|rho~|(37) = 52.219092, all exact and Parseval-controlled; MV(alpha)'s measured slope rises 4.214 +/- 0.304 to 4.566 +/- 0.217 and beta_2 leaves the 1se bar from BELOW by 1.38 se (inside at 2se, and inside again if z = 37 alone is dropped), so the weakest sufficient form is now measured against rather than undecided, while the TRUTH it bounds grows at only 2.766 +/- 0.212, 1.50 exponents under beta_2, the gap being the l1 instrument's own z^1.8 loss; the Gaussian rho law holds at both new levels (C_true 0.8412, 0.7820) and the TPC-implying sharp form is broken across the whole scan at both; RML(alpha) is open at every alpha, unchanged.
-->

**Caveats first. Nothing here bounds G₂(z#) and RML(α) is open at every α.**
What ran is two exact points on a measured curve, at a cost of 6928 s, with
every control passing. The one verdict-shaped result is a **1.38-standard-error**
exclusion of β₂ from a seven-point slope fit over less than one octave of z,
which survives neither a two-se bar nor the removal of z = 37, and which cannot
refute an asymptotic statement in any case. Four things came out.

**One: the two levels TODO item 0 named, exact (§4.1).** Λ(31) = **476.314**
and Λ(37) = **1286.338**; sup|ρ̃|(31) = **28.122062** over the complete period
of 6,469,693,230 positions and sup|ρ̃|(37) = **52.219092** over 200,560,490,130.
The first suprema measured past z = 29 in this corpus. ⟨ρ̃²⟩ at both levels
reproduces the cited column digit for digit by two independent routes, so the
two genuinely new numbers sit on a confirmed lattice.

**Two: MV(α) loses its standing, weakly (§4.2).** The slope moves 4.2144 ±
0.3039 (5 pts) → **4.5656 ± 0.2173** (7 pts) and β₂ = 4.26645 leaves the 1se bar
from below. Before tonight MV(α) was, in `attack-f4weak-01.md`'s own words, the
only form here "whose truth the measurements do not already decide against"; it
now sits with √N·rms, Λ_V and CH as an instrument measured above β₂ in growth.
The exclusion is 1.38 se, inside the 2se bar, and reverses if z = 37 is dropped
(leave-one-out slope 4.365). It is a MEASURED tension, never a refutation.

**Three, and more useful: the truth has 1.50 exponents of room, and the ℓ¹
accounting is what spends them (§4.3).** d ln sup|ρ̃| / d ln z = **2.766 ±
0.212** on seven points against β₂ = 4.26645. The instrument's own loss,
Λ/sup|ρ̃| running 3.74 → 24.63 across z = 13..37, is an endpoint z^1.802, and
2.766 + 1.802 = 4.568 recovers the Λ slope to three digits. MV exceeds β₂
because absolute-value accounting over modes bleeds 1.8 exponents, not because
the object RML must bound is large.

**Four: the legal law survives at both new levels and the TPC-implying one is
destroyed at both (§§4.4–4.5).** The Gaussian ρ law (F4, λ = 0, C = 1) holds
with C_true = **0.8412** and **0.7820**, 16% and 22% of margin, extending the
"true at every exactly measurable level" column to seven points. S-sharp fails
on **528 of 640** integer H at z = 31 (worst ratio 7.02) and on **all 26** grid
values to 2048 at z = 37 (worst 15.89). One incidental finding, recorded and not
applied: the dense scan reproduces `phase1-T4-maximal-law.md` §4's last-failure
H exactly at z = 13, 17, 19, 23 and finds 201 failures at z = 29 where that note
records **none** — a disagreement with a cited number whose producer was never
committed.

---

## 0. WHAT IS OPEN, FIRST

- **RML(α) is open at every α, and nothing here can close it.** This note buys
  two exact points on a measured curve. A measured slope over seven levels
  spanning less than one octave of z is not a theorem about any exponent, and
  the corpus has already recorded (`rho-maximal-law.md` reading 6,
  `attack-f4weak-01.md` §5) that local slopes in this corpus RISE with the
  window at every instrument looked at. Rung: OPEN, unchanged.
- **Both new levels are single measurements.** sup|ρ̃| at z = 31 and z = 37 is
  one number each, exact over the complete period to the walker's stated drift,
  with no independent second implementation. The controls below are what stands
  between them and a transcription error, and they are named in advance.
- **The MV(α) slope is a two-point extension of a five-point fit.** If β₂ leaves
  the bar it is because two points moved a short-window OLS, not because
  anything about the law was proven or refuted. §1 pre-registers what each
  outcome may and may not be said to mean.
- **z = 41, 43, 47 stay out of reach for the exact sup.** The walk is linear in
  W = P(z), and W = 7.42e12, 3.04e14, 1.31e16 there against 2.01e11 at z = 37:
  37×, 1517× and 65,232× the level this note reached.
- **The sharp form's check is dense to z = 31 and a GRID at z = 37.**
  `phase1-T4-maximal-law.md` §4 scanned integer H densely and reports "last H
  at which S-sharp fails". This note scans EVERY integer H in 1..640 wherever that is affordable
  (z ≤ 31, which contains T4's 451-value scan and the windows nP = 60..588), and
  falls back to a 26-value grid to 2048 at z = 37, where the dense scan prices
  at ~12 h. A grid that finds no failure has not proven S-sharp holds at every
  H; the z = 37 row is therefore weaker evidence than the others and says so.
  The z = 13..29 rows are carried precisely so the scan can be judged against
  T4's recorded failures at 1, 35, 227, 197.

## 1. PRE-REGISTRATION (written before Λ(31) and Λ(37) existed)

**State of knowledge at the moment this section was written.** Λ(z) =
Σ_{e,a}|Θ_e(a)|/(2 sin(πa/e)) is exact in the corpus at five levels only:
9.801, 25.157, 60.031, 121.250, 261.555 at z = 13, 17, 19, 23, 29
(`attack-f4weak-01.md` §2/S3), OLS slope d lnΛ/d lnz = 4.214 ± 0.304 against
β₂ = 4.26645, β₂ inside the bar. Λ(31) and Λ(37) have never been computed; the
only figures for them in the corpus are the FLAGGED constant-share model
Λ-hat = 4.369e+2 and 1.101e+3, which `attack-f4weak-01.md` states leans LOW.
This session has NOT computed Λ at 31 or 37 at the time of writing.

**Disclosed, so the blindness claim is exact:** scratchpad pricing probes for
this note walked PARTIAL periods and so already produced lower bounds on
sup|ρ̃| — ≥ 24.7168 at z = 31 (5% of the period) and ≥ 43.4377 at z = 37 (1%).
The sup pre-registration below is therefore only partly blind and is written
knowing those two floors. The Λ pre-registration is fully blind.

**Outcome A — β₂ stays inside the seven-point bar.** Reading: the measured
growth of the ℓ¹ mean value over modes remains statistically indistinguishable
from the sifting-limit exponent on the available window. What follows: nothing
about MV(α)'s truth. What does NOT follow: any claim that MV(α < β₂) is
plausible, likely, or supported. Rung: MEASURED, seven points, one octave.

**Outcome B — the bar excludes β₂ from ABOVE (slope + 1se < β₂).** Reading: a
measured tension in MV(α)'s FAVOUR — the weakest sufficient form's own growth
sits below the proven sieve limit on this window. What follows: the object
worth an analytic attempt is named and its target exponent is quantified. What
does NOT follow: any exponent for G₂(z#). A slope is not a bound; MV(α)
requires a uniform constant C and a proof for all z, and a fitted slope over
z ≤ 37 supplies neither. Rung: MEASURED tension, never evidence for a theorem.

**Outcome C — the bar excludes β₂ from BELOW (slope − 1se > β₂).** Reading: a
measured tension AGAINST the weakest sufficient form. What follows: MV(α) joins
the instruments this corpus has already watched die by exceeding β₂ in growth
(√N·rms at 8.174 ± 0.249, Λ_V at 5.230 ± 0.186, CH at 5.214 ± 0.151). What does
NOT follow: refutation. MV(α) is an asymptotic statement; a finite-z slope that
exceeds β₂ over one octave does not contradict it, exactly as the Bonferroni
x ≤ 227 and the trivial-ℓ¹-suffices-to-z~64 phenomena in this corpus do not.
Rung: MEASURED tension, never a refutation.

**In every outcome the standing rider holds:** local slopes in this corpus rise
with the window at every instrument measured so far, so a seven-point slope is
an upper-biased estimate of nothing in particular and quoting a single power is
refused (`attack-f4weak-01.md` §5's own instruction).

**Pre-registered on the Gaussian ρ law** (F4 at λ = 0, C = 1: sup|ρ̃| ≤
√⟨ρ̃²⟩·√(2 lnW)). Measured TRUE at all five exact levels with C_true =
0.6362, 0.6044, 0.8022, 0.7554, 0.7830. If C_true < 1 at 31 and 37, the law
survives two more levels and the C_true column becomes seven points; that is
MEASURED and is not evidence the law holds for all z. If C_true > 1 at either,
the legal law is FALSE as literally stated at a computable level, which would
be the first such reading and would demote F4 from "measured true everywhere
checkable" to "false at z = 31 (or 37)" — a real correction to
`rho-maximal-law.md` reading 3 and to `rho2-analytic-bound.md` §4's F4 row.

**Pre-registered on the sharp form** (S-sharp: sup_x|R_H(x)| ≤
√(2 lnW)·√(⟨R²⟩_H), TPC-implying, violated by 0.6% at z = 19, H = 191). If
S-sharp fails somewhere on the H grid at z = 31 or 37, the "already false as
literally stated" reading extends past z = 23. If it holds on the whole grid at
both, that is a NULL on a coarse grid and says nothing beyond the grid, since
T4 already records that z = 29 has no failure at any of 451 scanned H.

## 2. THE PRICE, WRITTEN BEFORE THE RUN

Priced from measured neighbours, not from guesses, per the standing compute
rule. Every figure below is a scratchpad measurement on this machine
(10 cores, 8 performance) taken before the producer was written:

| piece | measured basis | price |
|---|---|---|
| exact Λ, z = 29 | re-ran `attack-f4weak-01.js`'s `l1exact` verbatim: 261.555 in **4.9 s** | — |
| exact Λ, z = 31 | inner work Σ_e φ(e)·\|m1\|/2 = 4.31e8 vs 1.15e8 at z = 29, ×3.75 | **~18 s** |
| exact Λ, z = 37 | inner work 3.55e9, ×31 over z = 29 | **~155 s** |
| full-period walk, z = 29, 26-value H grid | measured, 8 workers | **6 s** |
| full-period walk, z = 29, dense H = 1..640 | measured | **57 s** |
| full-period walk, z = 31, dense H = 1..640 | measured on 2% of the period, ×50 | **~1750 s (29 min)** |
| full-period walk, z = 37, 26-value H grid | measured on 1% of the period, ×100 | **~4600 s (77 min)** |
| closed-form ⟨ρ̃²⟩ and ⟨R²⟩_H | measured: 9.0 s at 29, 28.4 s at 31, O(n²) → ~130 s at 37 | **~180 s** |
| **total** | | **~113 min, under the 4 h ceiling** |

**What the engine could NOT reach, and what would be needed.** The single-thread
walker of `attack-f4weak-01.js` prices z = 37 at 899 × 17.2 s ≈ 4.3 h before any
H tracking, i.e. OVER the ceiling; that is why `rho-maximal-law.md` §7 lists
only z = 31 as the next exact point. What buys z = 37 is not a new
normalisation but the same walk cut into re-seeded chunks: ρ̃(a) is computable
exactly at any a in O(n) from the terms, so the period splits into independent
blocks with no accumulated drift across them, and the block width was dropped
from 2²² to 2²⁰ so the stamping array is L2-resident (measured 2.2× on its own,
before any parallelism). Together: 4.3 h → 75 min. **z = 47 remains out of
reach by the same accounting: W = 1.31e16 is 65,232 times z = 37's period, so
the exact sup there is ~10⁵ core-hours on this engine and no reorganisation of
it changes that; it needs a different object, not a faster walk.**

## 3. DEFINITIONS (unchanged from the existing exact levels)

s = 3.0, D = z^s, terms from `sift-limit-lemmaV.js`'s `buildTerms(z, D)` —
identical call, identical lattice, identical weights. ρ(y) = Σ_j w_j ψ((y−c_j)/q_j),
ψ(t) = t − ⌊t⌋ − 1/2, period W = P(z) = ∏_{p<z} p; ρ̃ = ρ + M/2 with
M = Σ_j w_j/q_j. sup|ρ̃| is the maximum over ALL W positions of the complete
period. Λ(z) = Σ_{e,a} |Θ_e(a)|/(2 sin(πa/e)) over all reduced residues a mod e
for every conductor e in the mode set, Θ_e(a) = Σ_{j: e | q_j} (w_j/q_j)·e(−a c_j/e),
computed by `attack-f4weak-01.js`'s factorised recursion verbatim. R_H(x) =
ρ(x) − ρ(x+H) = ρ̃(x) − ρ̃(x+H). β₂ = 4.26645 per `paper/beta2-note.md`. No
normalisation is introduced here and none is changed.

## 4. RESULTS

Producer `research/rho-exact-z31-01.js`, embedded by `node research/qc/embed.js
--timeout 14000`, elapsed **6928.4 s (115 min)** against the 113 min price.
Every number below is in that file's OUTPUT block. All five S0 controls PASS:
the OLS estimator returns 2.500000 on a known z^2.5 truth; the recomputed Λ
reproduces the cited 9.801 / 25.157 / 60.031 / 121.250 / 261.555 at the five old
levels; Parseval reproduces the PROVEN closed-form ⟨ρ̃²⟩ at all seven levels to
6.0e-10 worst; the period mean is 0 to 1.2e-7 worst; and the chunked parallel
walker reproduces the old single-thread walker's full-period sup at z = 19 and
z = 29 to inside that walker's own accumulated drift.

### 4.1 The two new exact levels

```
   z         W            sup|rho~| exact   Lambda exact   <rho~^2> exact   max drift
  31    6,469,693,230        28.122062        476.314        24.738489       9.9e-8
  37  200,560,490,130        52.219092       1286.338        85.677253       2.5e-7
```

⟨ρ̃²⟩ at both levels reproduces the cited column digit for digit (24.738487 in
`attack-rhoms-01.md` S1; 9.25620² = 85.6772 from `theta-ladder.md` §2), by two
independent routes here — Parseval over the modes and the O(n²) closed form —
so the two genuinely new numbers, sup|ρ̃| and Λ, sit on a lattice whose second
moment is confirmed three ways.

### 4.2 MV(α): the slope, and what it does to β₂

```
   window                          slope    1se     1se bar             beta_2       2se bar
   5 pts, 13..29 (standing)        4.2144  0.3039  [3.9105, 4.5183]    INSIDE   [3.6066, 4.8223] INSIDE
   6 pts, 13..31                   4.3651  0.2411  [4.1239, 4.6062]    INSIDE   [3.8828, 4.8473] INSIDE
   7 pts, 13..37 (this file)       4.5656  0.2173  [4.3482, 4.7829]   OUTSIDE   [4.1309, 5.0002] INSIDE
```

**This is pre-registered Outcome C, and it is weak.** β₂ = 4.26645 leaves the
one-standard-error bar from BELOW, by **1.38 standard errors** — it stays
comfortably inside the two-se bar. Two further reasons to hold it lightly, both
in the producer's own output:

- **The exclusion is not robust to dropping one level.** Leave-one-out slopes on
  the seven points read 4.701, 4.476, 4.613, 4.566, 4.672, 4.561, **4.365**;
  the last is the fit with z = 37 removed, and 4.365 puts β₂ back inside.
  One level carries the sign of the verdict.
- **The local slopes are not a power law and never have been.** 3.51, 7.82,
  3.68, 3.32, **8.99**, **5.62** across the six consecutive gaps. The 29 → 31
  local slope of 8.99 is the largest in the corpus for this object; ln(31/29) is
  a 0.067 lever, so a single level's jump reads as an enormous local exponent.
  `attack-f4weak-01.md` §5's instruction to quote no single power stands.

**One prior prediction scored.** `attack-f4weak-01.md` S3's flagged
constant-share model Λ-hat put z = 31 at 4.369e+2 and z = 37 at 1.101e+3, with
its own rider that the falling a ≤ 3 share makes it lean LOW. Measured: 476.314
and 1286.338, so the truth came in **9.0% and 16.8% above the model** and its
rider was right in direction and roughly right in size. That is a scored forecast, not a
control, and it is recorded because the model is still cited at z = 41..47 where
nothing has been measured: it should be read as a lower bound drifting further
low with z, and the 5.649 ± 0.227 slope that model carries at 31..47 is
correspondingly biased.

Per §1's Outcome C: this is a MEASURED tension against the weakest sufficient
form, on a one-octave window, and it is **not a refutation**. MV(α) is an
asymptotic statement; a finite-z slope above β₂ over z ≤ 37 contradicts nothing,
and this corpus has watched the trivial ℓ¹ law "suffice" to z ~ 64 and the
Bonferroni bound "hold" to x ≤ 227 for exactly this reason.

**What DID change, and it is the substantive reading.** Before tonight MV(α) was
"the only form here whose truth the measurements do not already decide against"
(`attack-f4weak-01.md` §2). It no longer holds that position: it now sits with
√N·rms (8.174 ± 0.249), Λ_V (5.230 ± 0.186) and CH (5.214 ± 0.151) as an
instrument measured ABOVE β₂ in growth, differing from them only in how far
above and in how weak the exclusion is.

### 4.3 Why MV moved: the ℓ¹ instrument's loss, not the truth

The truth and the instrument are now both measured at seven levels, and they
separate:

```
   d ln sup|rho~| / d ln z  =  2.497 +/- 0.346  (5 pts)  ->  2.766 +/- 0.212  (7 pts)
   d ln Lambda   / d ln z  =  4.214 +/- 0.304  (5 pts)  ->  4.566 +/- 0.217  (7 pts)
   Lambda / sup|rho~|      =  3.74, 5.80, 6.56, 10.02, 14.61, 16.94, 24.63  at z = 13..37
```

The last row is arithmetic on the two measured columns. Its endpoint ratio is
z^1.802 across z = 13 → 37 (two-endpoint, NOT a fit), and 2.766 + 1.802 = 4.568
recovers the Λ slope to three digits. **So the ℓ¹ mean value exceeds β₂ because
of its own accumulating loss against the truth, not because the object it bounds
is growing fast.** The object RML(α) actually has to bound grows at **2.766 ±
0.212**, which is **1.50 exponents below β₂** and leaves the pricing lemma
enormous room. Rung: MEASURED, seven levels, one octave; the same short-window
rider applies to the 2.766 as to the 4.566, and the two riders do not cancel.

### 4.4 The Gaussian ρ law at the new levels: still true

```
   z      sup|rho~|    sqrt<rho~^2>   sqrt(2 lnW)   C_true    alpha_true   theta_true   theta_G
  31      28.122062      4.97378        6.7217      0.8412      0.9716       2.2071     2.25232
  37      52.219092      9.25620        7.2144      0.7820      1.0954       2.2797     2.34513
```

**F4 at λ = 0, C = 1 holds at both new levels**, with 16% and 22% of margin.
The C_true column is now seven points: 0.6362, 0.6044, 0.8022, 0.7554, 0.7830,
**0.8412, 0.7820**. z = 31 is the highest value the column has ever taken and
z = 37 falls back below z = 29, so the column is NOT monotone and the fitted
drift (0.255 ± 0.099 per ln z, crossing C_true = 1 at z ~ 75) is a straight line
through a non-monotone seven-point column. **That crossing is a fit artefact
quoted for scale, not a prediction that the law breaks near z = 75**, and no
weight should be put on it; the corpus has no mechanism that says C_true must
drift at all.

θ_true, the exponent the truth actually delivers under the strict T ≥ 1
accounting, is 2.2071 and 2.2797 — BELOW the Gaussian law's θ_G at the same
levels (2.25232, 2.34513), by 0.045 and 0.065 of exponent, which is exactly
C_true < 1 restated. And sup|ρ̃| ≤ smax holds at both levels with room:
28.12 ≤ 3.372e+4 and 52.22 ≤ 6.881e+4.

### 4.5 S-sharp: dead at both new levels, and a candidate correction at z = 29

```
   z   scan           #H failing   worst ratio (at H)   LAST H failing   T4 sec.4 records
  13   dense 1..640      1/640      1.1147 (H=1)              1                1
  17   dense 1..640     35/640      2.4812 (H=3)             35               35
  19   dense 1..640    153/640      3.3245 (H=3)            227              227
  23   dense 1..640     90/640      3.0812 (H=3)            197              197
  29   dense 1..640    201/640      2.9648 (H=3)            221             none
  31   dense 1..640    528/640      7.0169 (H=1)            629               —
  37   grid to 2048     26/26      15.8889 (H=1)           2048               —
```

**At z = 31 and z = 37 the TPC-implying sharp form is not "transiently violated"
— it is broken across the whole scan.** At z = 31, 528 of 640 integer H fail and
the worst ratio is 7.02; at z = 37 every one of the 26 grid values fails,
including H = 2048, with a worst ratio of 15.89. Reading: S-sharp as literally
stated is FALSE at these levels, which is what `phase1-T4-maximal-law.md` §5
already concluded structurally (a form that would imply TPC cannot be a
generous hypothesis) and what its z = 19 row showed at 0.6%. Rung: MEASURED,
exact sup over complete periods. What does NOT follow: nothing about the LEGAL
ρ law, which forfeits exactly the lag cancellation S-sharp keeps; §4.4 above is
the relevant column and it holds.

**Two caveats on the two new rows, both structural.** At z = 31 the last failing
H, 629, sits 11 short of the top of the dense range, so "last H failing" there
is a lower bound on the truth, not the truth. At z = 37 the scan is a 26-value
grid and finding all 26 failing is not the same statement as a dense scan; the
number to quote is "every grid value to 2048 fails", not "every H fails".

**The candidate correction.** The dense scan reproduces T4 §4's last-failure H
EXACTLY at z = 13, 17, 19 and 23 (1, 35, 227, 197 — four for four, an engine
calibration against a known failure, not a null). At z = 29 it finds 201 failing
H with the largest at 221, where T4 records **none**. Given four-for-four
agreement below it, the most likely reading is that T4's z = 29 row is wrong or
that its scan range at z = 29 did not include H ≈ 221. It cannot be diagnosed
from here: `phase1-T4-maximal-law.md` §0 lists its producers (`t4-sup.js` et al.)
as **uncommitted scratch scripts**, so there is nothing to re-run. Rung: a
MEASURED disagreement with a cited number that has no reproducible producer.
This note does not edit that file; the discrepancy is recorded here for
adjudication.

### 4.6 The second moment against the proven bound: nothing moves

The bound/exact ratio table now carries own exact values at 31 and 37 in place
of cited ones:

```
   z      <rho~^2>       FORM I*      I*/exact     R1f/smax  (cited)   (3W)^{1/3}/smax  (cited)
  29     13.595974    2.3728e+15    1.745e+14      0.076   0.076         0.032          0.032
  31     24.738489    4.0882e+15    1.653e+14      0.232   0.232         0.080          0.080
  37     85.677253    1.7123e+16    1.999e+14      0.541   0.541         0.123          0.123
  47    360.901967    1.1597e+17    3.213e+14     15.343  15.346         2.155          2.155
```

Every cited figure reproduces, including the corrected absolute-floor row from
`redteam-0828-closures.js` R5 (clears at 41 and 43, misses at 47 by 2.155×) and
the I*/exact endpoint control at z = 13 (2.535e+12, MATCH). The non-monotonicity
`rho2-analytic-bound.md` §0 flags is confirmed on own numbers: 1.745e+14 at
z = 29 EXCEEDS 1.653e+14 at z = 31. **Nothing here moves any exponent**, and the
standing verdict is unchanged: the mean-square lemma is an ingredient of RML,
never a route, because Chebyshev off any second moment cannot reach a sup law.

## 5. READINGS

1. **MEASURED, new.** Exact Λ at the two levels TODO 0 named:
   **Λ(31) = 476.314, Λ(37) = 1286.338**, each Parseval-controlled against the
   PROVEN closed-form ⟨ρ̃²⟩ (rel 1.8e-11 and 6.0e-10) and produced by
   `attack-f4weak-01.js`'s recursion unaltered, which reproduces all five cited
   values at the levels where they exist. Producer S1.

2. **MEASURED, new.** Exact sup|ρ̃| over complete periods:
   **28.122062 at z = 31** (W = 6.47e9) and **52.219092 at z = 37**
   (W = 2.01e11), the first supremum measured past z = 29 in this corpus.
   Period mean 0 to 1.2e-7, walked m2 against the closed form to 3.8e-12, worst
   chunk drift 2.5e-7. Producer S2.

3. **MEASURED tension, pre-registered Outcome C, WEAK.** MV(α)'s slope moves
   4.2144 ± 0.3039 → **4.5656 ± 0.2173**, and β₂ = 4.26645 leaves the 1se bar
   from below by **1.38 se**. It stays inside the 2se bar, and dropping z = 37
   alone returns 4.365, which puts it back inside at 1se. What this is: the
   weakest sufficient form is no longer the only instrument the measurements do
   not decide against. What this is NOT: a refutation of MV(α), which is
   asymptotic and untouched by any finite-z slope. §4.2.

4. **MEASURED, and the more useful half of reading 3.** The truth's own growth
   is **d ln sup|ρ̃| / d ln z = 2.766 ± 0.212** on seven points, **1.50
   exponents below β₂**. The ℓ¹ instrument's slope is the truth's plus its own
   measured loss: Λ/sup runs 3.74 → 24.63 across z = 13..37, an endpoint z^1.802,
   and 2.766 + 1.802 = 4.568 recovers the Λ slope. MV exceeds β₂ because the ℓ¹
   accounting bleeds 1.8 exponents, not because the object is large. §4.3.

5. **MEASURED.** The Gaussian ρ law (F4, λ = 0, C = 1) **holds at both new
   levels**: C_true = 0.8412 (z = 31) and 0.7820 (z = 37), margins 16% and 22%.
   Seven-point column, non-monotone; the fitted crossing at z ~ 75 is an
   artefact of fitting a line to a non-monotone column and is quoted for scale
   only. §4.4.

6. **MEASURED.** S-sharp, the TPC-implying form, is **broken across the whole
   scan at both new levels**: 528 of 640 integer H fail at z = 31 (worst ratio
   7.02) and all 26 grid values to 2048 fail at z = 37 (worst 15.89). The
   asymmetry `rho-maximal-law.md` reading 3 records — the legal law true, the
   TPC-implying law false — widens rather than closes at the new levels. §4.5.

7. **MEASURED disagreement with an uncustodied cited number.** The dense scan
   reproduces T4 §4's last-failure H exactly at z = 13, 17, 19, 23 and finds
   201 failing H at z = 29 with the largest at 221, where T4 records "none".
   T4's producers are uncommitted scratch scripts, so this cannot be diagnosed
   from the repository. Recorded, not applied. §4.5.

8. **MEASURED, confirmatory only.** ⟨ρ̃²⟩ at 31 and 37 reproduces the cited
   column digit for digit by two independent routes; the FORM I*/exact ratio
   table, the R1f floor and the corrected absolute floor all reproduce, and the
   ratio's recorded non-monotonicity (1.745e+14 at 29 > 1.653e+14 at 31) is
   confirmed on own numbers. Nothing about any exponent moved. §4.6.

9. **ENGINE, auditable.** z = 37's exact supremum was reached inside the compute
   ceiling by chunking the same walk with exact O(n) re-seeding and an
   L2-resident Int32 stamping block, not by changing any definition; the old
   single-thread walker and the new one agree at z = 19 and z = 29 to inside the
   old one's own drift. z = 47 stays out of reach by a factor 3.1e6 in W and no
   reorganisation of this engine reaches it. §2.

## 6. NOT REACHED

- **sup|ρ̃| at z = 41, 43, 47.** W = 7.42e12, 3.04e14, 1.31e16 against 2.01e11
  at z = 37, and the walk is linear in W: **z = 41 prices at ~48 h** on this box
  (37 × the 77-minute z = 37 walk, over the 4 h ceiling but not absurd),
  z = 43 at ~81 days, z = 47 at ~9 years. These need a different object, not a
  faster walk.
- **A dense H scan at z = 37**, priced at ~12 h; the 26-value grid stands in for
  it and the row is labelled accordingly.
- **The last failing H at z = 31 beyond 640.** 528 of 640 fail and the largest
  failure is at 629, so the recorded value is a lower bound.
- **Any adjudication of the z = 29 S-sharp disagreement**, which needs a decision
  about a cited number whose producer was never committed.
- **The s-freedom.** Everything here is s = 3.0, as at every existing exact level.

## 7. CUSTODY AND GATE

Every measured figure in this note is in `research/rho-exact-z31-01.js`'s OUTPUT
block, written by `node research/qc/embed.js --timeout 14000` — the tool ran the
script and wrote the block, so nothing was transcribed by hand
(code-sha256 `433689f5…`, out-sha256 `b0519fcd…`, 108 body lines, elapsed
6928.4 s, embedded 2026-08-28). A `qc/embed.js --check` re-run costs another
115 minutes and was not bought; the block is bound by construction because the
tool produced it in the same invocation that ran the code.

**Derived arithmetic in this note, done on the embedded columns and not by the
script:** the Λ/sup|ρ̃| row (3.74, 5.80, 6.56, 10.02, 14.61, 16.94, 24.63), its
two-endpoint exponent 1.8020, and the 1.377 standard errors by which β₂ sits
below the seven-point slope. Nothing else in §§4–5 is computed outside the
producer.

**Cited, custody-bound, reproduced in-pass rather than trusted:** Λ at
z = 13..29 (`attack-f4weak-01.md` S3), sup|ρ̃| at z = 13..29 (`rho-maxlaw-01`
S1), θ_G at all ten levels (`theta-ladder.md` §2 via `rho-maxlaw-01` S3, worst
|recomputed − cited| = 4.2e-5), C_true at z = 13..29, rmsr at 41..47, the
FORM I*/exact endpoint (`rho2-analytic-bound.md` S1), both Chebyshev floor rows
including `redteam-0828-closures.js` R5's correction, and T4 §4's last-failure H
column. β₂ = 4.26645 per `paper/beta2-note.md`.

**Gate: `node research/qc.js` was NOT run** (out of scope for this pass by
instruction). No existing file was edited by this session: the producer and this
note are both new, and the two things this note argues bear on other files —
T4 §4's z = 29 row and MV(α)'s standing in `attack-f4weak-01.md` and TODO 0 —
are recorded here for adjudication and applied nowhere.
