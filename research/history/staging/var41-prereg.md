# Pre-registration: Var(41), the tenth Var/E point and the z column's last entry

<!-- ledger
id: Q-var41
status: OPEN
todo: 2, 9
question: What does the stable law predict for Var(41), and what can the tenth Var/E point pin?
verdict: Pre-registration only, sealed and committed alone before any Var(41) engine exists: it freezes the prediction, a band taken from the law's own residuals at z <= 37, the derived z(41) prediction, and the honest statement that one more point cannot separate a limit from a drift.
-->

**Sealed before any producer for this pass was written, and committed alone**, with
message `prereg: var41` and nothing else in that commit. `git log --stat` is the
proof. Every number in sections 1 to 4 was computed from **already embedded** corpus
figures by a throwaway script kept outside the repository. The producer
`research/var41-price.js` recomputes each of them from the same published inputs
and aborts on any mismatch, so the freeze is machine-checkable after the fact as
well as commit-ordered.

## 0. What this pass registers

TODO item 2 asks for Var(41) so that the anchored note's section 3 z column runs
the full ten levels, and so that TODO item 9's `lim Var/E = 0.611` question gets a
tenth separation point. This file registers, before any Var(41) engine exists:

1. the stable law's prediction for Var(41)/E(41), with u at z = 41 stated exactly;
2. a band for that prediction, taken from the law's own residuals at z <= 37;
3. what the new point does to item 9 under each outcome, including the honest
   statement that one more point **cannot** separate a limit from a drift, and
   what it can pin instead;
4. the derived z(41) prediction, and the precision each of the two consumers needs.

## 1. Inputs, all embedded, none recomputed

The nine diagonal points are the embedded output of
`research/natal-cap-16-fast-variance.js` (PART 3, levels 7..31) and
`research/natal-cap-33-overnight.js` (RUN 3, level 37), reproduced in
`paper/variance-note.md` section 7:

| x | W = x# | y = maxprime <= sqrt(W) | E[N_W] | Var | r = Var/E |
|---|---|---|---|---|---|
| 7  | 210               | 13        | 6.92            | 1.05          | 0.1521 |
| 11 | 2,310             | 47        | 39.27           | 10.06         | 0.2563 |
| 13 | 30,030            | 173       | 304.28          | 91.13         | 0.2995 |
| 17 | 510,510           | 709       | 3,245.51        | 1,060.54      | 0.3268 |
| 19 | 9,699,690         | 3,109     | 41,441.19       | 14,392.59     | 0.3473 |
| 23 | 223,092,870       | 14,929    | 669,028.80      | 243,740.37    | 0.3643 |
| 29 | 6,469,693,230     | 80,429    | 14,063,617.40   | 5,307,862.63  | 0.3774 |
| 31 | 200,560,490,130   | 447,829   | 328,601,798.62  | 127,363,168.00| 0.3876 |
| 37 | 7,420,738,134,810 | 2,724,079 | 9,377,228,928.76| 3,711,451,136 | 0.3958 |

At z = 41: W = 41# = 304,250,263,527,210, and y = 17,442,769, the largest prime
below floor(sqrt(W)) = 17,442,771. E(41) = 303,627,067,641.7 and
S(41) = 256,725,962,834 are the embedded output of
`research/natal-cap-37-at41-march.js`, quoted in `paper/anchored-note.md` section 3.

## 2. The stable law, evaluated the way the note evaluates it

`paper/variance-note.md` section 6 states the empirical law

    ln(Var/E) ~= -(c2 u^2 + c1 u),   c2 = 0.24, c1 = 0.13,   L = y^u,

fitted at sieve level y = 401. The note evaluates it in u = ln L / ln y, and the
diagonal of section 7 is the case L = W with y = maxprime <= sqrt(W). At z = 41
that gives

    u(41) = ln(304,250,263,527,210) / ln(17,442,769) = 33.34886 / 16.67443
          = 2.0000005,

so **u = 2 to seven digits**. The same evaluation at the nine computed levels gives
u = 2.08468, 2.01161, 2.00065, 2.00235, 2.00043, 2.00010, 2.00001, 2.00000,
2.00000: the diagonal is the u = 2 line from z = 13 upward, and z = 7 and z = 11
are the only levels where the integrality of y moves u at all.

**Literal prediction.** At u = 2 the law gives

    Var(41)/E(41) = exp(-(0.24*4 + 0.13*2)) = exp(-1.22) = 0.29523.

**This literal reading is registered as wrong, and registered as wrong in advance.**

## 3. The band, from the law's own residuals at z <= 37

The law is frozen at y = 401; section 6 point 2 of the note already records that at
u = 2 the ratio rises with level, so on the diagonal the law carries a level-dependent
residual rather than a scatter. Its residuals against the nine measured points are

| x | r measured | law (0.29523) | residual | increment |
|---|---|---|---|---|
| 7  | 0.1521 | 0.29523 | -0.1431 |         |
| 11 | 0.2563 | 0.29523 | -0.0389 | +0.1042 |
| 13 | 0.2995 | 0.29523 | +0.0043 | +0.0432 |
| 17 | 0.3268 | 0.29523 | +0.0316 | +0.0273 |
| 19 | 0.3473 | 0.29523 | +0.0521 | +0.0205 |
| 23 | 0.3643 | 0.29523 | +0.0691 | +0.0170 |
| 29 | 0.3774 | 0.29523 | +0.0822 | +0.0131 |
| 31 | 0.3876 | 0.29523 | +0.0924 | +0.0102 |
| 37 | 0.3958 | 0.29523 | +0.1006 | +0.0082 |

The residual is monotone with a smoothly shrinking increment, ratio 0.78 to 0.80 per
level over the last four steps. Carrying the increment forward at 0.0066 (the 0.80
continuation) and bracketing it by the last measured increment 0.0082 above and by a
two-step continuation 0.0055 below:

**REGISTERED PREDICTION: Var(41)/E(41) = 0.4024, band [0.4013, 0.4040].**

Equivalently Var(41) = 1.2218e11 with band [1.2185e11, 1.2267e11], against
E(41) = 303,627,067,641.7.

For reference, the two diagonal fits of variance-note section 7 evaluated at
lnW(41) = 33.34886 and lnlnW(41) = 3.50702:

| fit | fitted on | value at z = 41 |
|---|---|---|
| 0.4435 - 1.509/lnW      | 8 points, frozen pre-@37 | 0.3983 |
| 0.6106 - 0.729/lnlnW    | 8 points, frozen pre-@37 | 0.4027 |
| 0.4454 - 1.534/lnW      | 9 points, refit          | 0.3994 |
| 0.6108 - 0.729/lnlnW    | 9 points, refit          | 0.4029 |

The registered band brackets both lnlnW values and excludes both lnW values. That
is not an independent vote: the residual-extrapolation of section 3 and the lnlnW
fit are two descriptions of the same monotone shrinkage, so they agree by
construction. It is recorded here so that a measured r(41) near 0.399 falsifies the
registered prediction outright rather than being absorbed.

## 4. What the tenth point does to TODO item 9, stated honestly

### 4a. What it cannot do

The two live functional forms separate at z = 41 by **0.0035** (refit-9 pair) or
**0.0044** (frozen-8 pair). That is a decidable gap only if the measurement is good
to about 5e-4, and it is a *model comparison*, not a measurement of a limit.

The abscissa argument is the binding one. Over the nine computed points 1/lnlnW runs
0.59646 down to 0.29508; z = 41 adds a single point at 0.28514. From z = 13 upward,
where the fits are actually taken, the span is 0.42861 down to 0.29508, and z = 41
extends it by 0.00994, that is by **7.4% of the existing lever arm**. Extrapolating
that line to the intercept means going from 0.285 to 0.000, which is thirty times
the range that all ten points together will cover.

**Registered in advance: one more point cannot discriminate drift from limit.** No
outcome of this computation entitles the corpus to say that lim Var/E = 0.611 is
measured, and any write-up that upgrades the 0.611 hypothesis on the strength of
z = 41 alone is overclaiming. The reading of variance-note section 7 stands: what
settles this is a derivation, not a level.

### 4b. What it can pin

1. **The z column.** The anchored note's section 3 table has "not yet
   (Var@41 uncomputed)" in its last row and nothing else missing: S(41) and E(41)
   are already exact. Var(41) alone completes the ten-level ladder. Registered
   prediction, from the band of section 3:

       sigma(41) = sqrt(Var) = 349,540, band [349,140, 349,880]
       z(41) = (256,725,962,834 - 303,627,067,641.7)/sigma(41) = -134,180,
       band [-134,310, -134,030],

   a factor 5.93 on z(37) = -22,632.9, which continues the measured 5.3 to 5.7
   per-level ratio and slightly extends it.
2. **A fifth consecutive frozen-forecast test of the lnlnW form**, at a 0.0035
   separation. A hit inside 5e-4 makes it five in a row; a miss on the lnW side
   would be the first evidence against the current reading since z = 37.
3. **The intercept's stability**, refit on ten points. The lnlnW intercept has gone
   0.6106 -> 0.6108 across the ninth point; the tenth either keeps that stability or
   breaks it, and "the intercept stopped drifting" is a genuine, if weak, fact about
   the fit that the analytic hunt of item 9 can be calibrated against.

### 4c. The precision split, registered because it changes the price

The two consumers do not need the same accuracy.

- **z(41) needs about 1%.** z scales as Var^(-1/2), so a 1% error in Var moves z by
  0.5%, that is by 670 units on -134,180, which is far inside the 5.93 per-level
  ratio being reported. A Var(41) good to 1% closes the z column completely.
- **Item 9 needs about 0.1%.** Separating 0.0035 on r = 0.402 at 5:1 needs r to
  7e-4, that is Var to 0.17%.

Any pass that delivers only the first is still a full answer to TODO item 2 as
written, and is not an answer to item 9.

## 5. Adjudication rule, fixed now

Let r = Var(41)/E(41) as measured, with its certified roundoff bar b.

- **PREDICTION HELD** if |r - 0.4024| <= 0.0016 (the registered band).
- **PREDICTION FAILED, lnW direction** if r < 0.4000. Then the 1/lnW form scores its
  first hit since z = 31, the 0.611 hypothesis is demoted back to a tie, and
  variance-note section 7 must be rewritten before it is quoted again.
- **PREDICTION FAILED, other direction** if r > 0.4048. Then the residual increments
  stopped shrinking, which no current model predicts, and the fit family itself is
  the thing under suspicion.
- **INDECISIVE** if b >= 0.0009, whatever r is. A certified bar that large cannot
  resolve a 0.0035 separation at better than 4:1, and the run is then reported as a
  z-column closure only, with the item 9 consumer explicitly left open.

The `b >= 0.0009` clause is registered because it is the likely outcome for the
existing engine: the bar of `natal-cap-16`'s `fastVariance` is
`u*(C*2*S2 + 2*d2W2 + 2*E)` with a worst-case patch constant C, and since
2*S2 ~= d2W2 = E^2 the bar grows in proportion to E, that is by a factor of about
32 per level. Reproducing the published @37 bar from that formula with C = 40 gives
8.20e5 against the published 8.2e5, so the model is calibrated; carried to z = 41
with C = 36 (the primorial patch bound at 41#, 11 mid-primes per factor of
d(d-2)(d+2) since 7*11*...*43 = 2.5e14 < 41# < 7*11*...*47) it gives

    Var(41) = 1.22e11 +/- 7.8e8, relative 6.4e-3, that is r = 0.402 +/- 0.0026.

**Registered in advance: with the engine as it stands, the tenth point is
INDECISIVE for item 9 by rule, and closes the z column only.** A tighter bar
requires charging each term its actual patch count rather than the worst case; the
mean count is 3*sum_{7<=p<=y} 1/p + 3 = 9.1 rather than 36, which would give
+/- 2.3e8, relative 1.9e-3, r = 0.402 +/- 0.00075, and that is the only version of
this run that adjudicates item 9. Whether the run is launched at all is a separate
question of price, settled in `research/var41-price.js` and not prejudged here.

---

## CORRECTION (2026-08-19, from `research/var41-price.js` PART 0)

The producer's freeze check recomputed every number above from the published
inputs and found two arithmetic slips, both in quantities **derived from** the
registered prediction rather than in the prediction itself. The text above is left
exactly as sealed; the corrections are here.

1. **Section 4b, sigma(41).** Written as 349,540. The exact value at r = 0.4024
   and E(41) = 303,627,067,641.7 is **349,542**.
2. **Section 4b, the z band.** Written as [-134,310, -134,030]. That interval was
   formed from the wrong r endpoints. The registered band r in [0.4013, 0.4040]
   implies **z(41) in [-134,363, -133,913]**, half-width 225 rather than 140. The
   central forecast z(41) = -134,180 is unchanged (exactly -134,179), as is the
   ratio 5.93 on z(37).
3. **Section 3, the frozen-8 separation.** Written as 0.0044, which is the
   difference of the two endpoints after each is rounded to four places
   (0.4027 - 0.3983). The direct difference is 0.00448, which rounds to 0.0045.
   Both readings are recorded; the adjudication rule of section 5 uses neither.

**The registered prediction is untouched:** Var(41)/E(41) = 0.4024, band
[0.4013, 0.4040], and the adjudication rule of section 5 stands as written. The
widened z band makes no difference to any rule, since section 5 adjudicates on r.

## OUTCOME OF THE PRICING PASS (2026-08-19)

`research/var41-price.js` priced the run and it was **declined, not launched**.
The engine is 2.183e+14 elementary ops at SEG = 2^26, which is 239.7 h on one core
at the throughput its own two recorded wall times establish (508 s at @31, 18288 s
at @37, agreeing on throughput to 10%). Sharded over all ten cores that is 24.0 h,
on a machine already carrying seven heavy jobs. Section 5's INDECISIVE clause also
fires in advance: the engine's certified bar at @41 is dr = 0.00256 against a
0.0035 separation, so the run as it stands would have closed the z column and left
item 9 exactly where it is. The census in that file measured the fix (mean patch
count 4.958 at @29 against a worst case of 29, a 3.05x bar tightening) which would
bring the bar to dr = 0.00075 and make the point decisive. Any future @41 run
should carry it.
