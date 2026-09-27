# The theta ladder within one family: does the all-positions exponent turn over?

<!-- ledger
id: Q-theta-ladder
status: CLOSED
todo: 0
question: Does the all-positions exponent theta turn over below 2, converge to exactly 2, or settle above 2?
verdict: The answer is above 2 with an amendment, and the route is retired regardless: theta does not turn over (it dips and comes back, need/z^2 = 0.3550 to 0.6119 at z = 13..31 and rising from 31), convergence to exactly 2 is not supported (e = 1 rejected at 95% in all four fits), point estimates run 2.37 to 2.99 without settling, and OUTCOMES.md records the certificate route as RETIRED because the sharp maximal law it needs is itself TPC-implying.
-->

Feeds TODO item 0.
Companion to `research/sift-limit-lemmaV.js` (S4b, S5, S6), `research/sift-limit-attack.md` §4.5,
and `research/ZONE-POSTULATE.md` §5, whose question about the window/G₂ ratio this file settles
on the theta side.

## 0. The question, and the doubt brought to it

The all-positions exponent theta answers: at sieve level D = z^s, how long a window H = z^theta
does the vector-sieve certificate need before it is positive at EVERY position, conditional on an
**unproven Gaussian maximal law for the sawtooth remainder**? Every theta in the conditional
column below inherits that hypothesis and must not be quoted without it; the exact column of §5b
is the one that owes nothing to it. The column on record read

    theta = 2.159, 2.183, 2.159, 2.252, 2.308, 2.345   at z = 19, 23, 29, 31, 41, 47

with the last two points from a different family (s = 2.6). The Gap Reformulation needs
theta < 2. The column sits above 2 and appears to drift upward.

**The doubt.** An upward drift over a range this short is not by itself evidence against
theta -> 2. Write need = c(z) * z * ln^2 z. Then

    theta = ln(need)/ln z = (1+e) + (ln A + 2 ln ln z)/ln z     when c(z) ~ A * z^e,

so theta -> 1+e, and c ~ z^1 is exactly theta -> 2. The bracket is a finite-size term worth 0.15
to 0.35 across our whole range, and when A < 1 it can rise with z before it falls. A rising theta
is therefore compatible with theta -> 2, and reading the trend off theta is the wrong
measurement. The right one is the growth exponent e of c(z) inside one family.

That is what this file does first. It then does three more things, because e turns out to be the
noisiest quantity on the table: it measures how much of the theta column is set by the arbitrary
offset between z and the largest prime below it (§4), it checks whether s is a lever on theta at
all (§5a), and it throws away the Gaussian bound entirely and measures the EXACT supremum, over
complete periods to z = 31 and one-sidedly by prefix to z = 71 (§5b). That last one is the
measurement that matters.

**The answer to the title question, up front.** The conditional
exponent, which rests on the unproven Gaussian maximal law, runs 2.159 to 2.482 across z = 19 to
47 and is still rising at the top: on that column the route loses ground. The
unconditional one, which owes nothing to any maximal law and is measured
self-consistently, sits INSIDE the zone budget at every exactly-measured level —
need/z² = 0.3550, 0.4360, 0.5485, 0.4877, 0.4637, 0.6119 at z = 13..31, all
exact, worst margin 39% — and the crossing is real but sits in (31, 47]: at
z = 47 a 4·10⁹-position prefix finds min T = 0 at H = 2300 = 1.041 z², and a
prefix minimum upper-bounds the period minimum, so the requirement leaves the
budget there (`history/staging/theta-selfconsistent.md`). What retires the
route as a road to TPC is not the crossing but the maximal law's own price:
the sharp form is TPC-implying (`history/staging/phase1-T4-maximal-law.md`).
The rest of the file is how firmly each column is established and what it
costs the programme.

---

## 1. Method and custody

The quantity is the one computed in `sift-limit-lemmaV.js` S6, verbatim:

> **⚠ Custody warning on S6, added 2026-08-18, because a reader following this
> pointer lands in a block that is half void.** `sift-limit-lemmaV.js`:395 now
> carries `!!! WRONG. DO NOT TRUST THIS FUNCTION OR ANY S6 COLUMN DERIVED FROM
> IT. !!!` over `elementaryVariance`, whose `Var` is too large by about three
> orders. Void: S6's `elementary bound` and `ratio sieve/elem` columns, every
> "elementary needs H > …" line, and the two closing constants 0.027·ln⁴z and
> 0.741·ln²z. The settled verdict is `history/MORNING-2026-08-16.md`:80-83's
> "the two methods are genuinely comparable rather than one dominating", **not**
> `history/WAVE7-RESULTS-2026-08-15.md`:50-54's "beats the elementary bound by
> roughly two orders", which is the reverse and which quotes the two voided
> constants inside the sentence telling you not to quote them.
> **What survives is exactly the θ column this document owns** — the script's
> own banner lists "the conditional all-positions exponent" under UNAFFECTED,
> and `MORNING`:86 says "S6's last block does not touch the broken function and
> stands". `research/wave7-logs/lemmaV-meansquare.log` carries **no** flag of
> its own, and `history/CHANGELOG.md` has no entry for any of this, so this
> paragraph is currently the warning's only home outside the script.

    need  = 2 * sqrt( 2 * lnW * <rho^2> ) / M          theta = ln(need) / ln z

with <rho^2> = plateau/2 the H-free sawtooth potential, M the position-free main-term density,
lnW = theta(z) the Chebyshev function. The bound behind it: R(x) = rho(x) - rho(x+H), so
|R| <= 2 sup|rho| <= 2 sqrt(<rho^2>) sqrt(2 lnW) under the Gaussian maximal law, and positivity
of T = H*M + R at every x needs H*M above that.

**VERIFIED: `need` contains no H.** The plateau is H-free by construction, M is H-free, lnW is
H-free. So `row(z, u, s)` returns the same theta for every u. The window index u is a formality;
the family is set by s alone.

```
$ node -e "const L=require('./research/sift-limit-lemmaV.js');
  for(const u of [1.8,2.2,2.8,3.2,4.0]){const r=L.row(19,u,3.0);
  const need=2*Math.sqrt(2*r.lnW*r.plateau/2)/r.M;
  console.log('u='+u+'  H='+r.H+'  <R^2>='+r.ms.toFixed(4)+'  plateau='+r.plateau.toFixed(6)
    +'  need='+need.toFixed(6)+'  theta='+(Math.log(need)/Math.log(19)).toFixed(6));}"

u=1.8  H=200     <R^2>=2.1215   plateau=9.904749  need=576.278257  theta=2.158846
u=2.2  H=651     <R^2>=6.1809   plateau=9.904749  need=576.278257  theta=2.158846
u=2.8  H=3806    <R^2>=10.0694  plateau=9.904749  need=576.278257  theta=2.158846
u=3.2  H=12360   <R^2>=11.1585  plateau=9.904749  need=576.278257  theta=2.158846
u=4    H=130321  <R^2>=12.1839  plateau=9.904749  need=576.278257  theta=2.158846
```

What u buys is the other columns (<R^2>, rms, rms/H*M), not theta.

**The invocation.** One process per z, run in parallel, each calling the repo's exported
`row(z, 3.2, 3.0)` with nothing reimplemented locally:

```js
const L = require('research/sift-limit-lemmaV.js');
const r = L.row(z, 3.2, 3.0);
const need  = 2*Math.sqrt(2*r.lnW*r.plateau/2)/r.M;
const theta = Math.log(need)/Math.log(z);
const c     = need/(z*Math.log(z)*Math.log(z));
```

One change was made to `research/sift-limit-lemmaV.js`: `fullPeriodArray` was added to
`module.exports`, for §5b. The function itself is untouched.

**CUSTODY.** The four existing s = 3.0 rows reproduce digit for digit against the four rows on
record, 2.159, 2.183, 2.159, 2.252:

```
  z=19 s=3.0 N=4764  M=3.9598e-2 lnW=13.1432 sqrt(<rho^2>)=2.225393
  -> H > 576.2783   = 3.498433 * z ln^2 z ;  theta = 2.158846   [0.6s]
  z=23 s=3.0 N=9636  M=3.4169e-2 lnW=16.0876 sqrt(<rho^2>)=2.825328
  -> H > 938.0464   = 4.148437 * z ln^2 z ;  theta = 2.182686   [2.5s]
  z=29 s=3.0 N=20700 M=3.1843e-2 lnW=19.2231 sqrt(<rho^2>)=3.687272
  -> H > 1435.9919  = 4.367083 * z ln^2 z ;  theta = 2.158887   [12.1s]
  z=31 s=3.0 N=35868 M=2.9253e-2 lnW=22.5904 sqrt(<rho^2>)=4.973780
  -> H > 2285.7557  = 6.252746 * z ln^2 z ;  theta = 2.252324   [36.7s]
```

Cost: rows are O(N^2) in the divisor-pair count, with N = 4764, 9636, 20700, 35868, 76484,
125884, 183084, 293980 at z = 19..47, giving 2.85e-8 s per pair on this machine, at which
z = 31 costs 36.7 s.

---

## 2. The rows

Fixed family s = 3.0 throughout. The four new rows are z = 37, 41, 43, 47. `c` is the coefficient
in need = c * z * ln^2 z; `c/B` is need/z^2 exactly, the ratio the Gap Reformulation must get
below 1. No s = 2.6 row appears anywhere in this file.

**Every theta in this table is CONDITIONAL on the unproven Gaussian maximal law for the sawtooth**
(§1). The unconditional column, which assumes nothing, is §5b, and at the self-consistent window it
is a factor 2.46 to 3.68 smaller, the factor rising with z.

```
   z pmax      N        M       lnW   sqrt<rho^2>       need     c(z)    theta    c/B    secs
   19   17    4764 3.960e-2  13.143    2.22539      576.28    3.498  2.15885   1.596      1
   23   19    9636 3.417e-2  16.088    2.82533      938.05    4.148  2.18269   1.773      2
   29   23   20700 3.184e-2  19.223    3.68727     1435.99    4.367  2.15889   1.707     12
   31   29   35868 2.925e-2  22.590    4.97378     2285.76    6.253  2.25232   2.379     37
   37   31   76484 2.806e-2  26.024    9.25620     4760.25    9.867  2.34513   3.477    174
   41   37  125884 2.624e-2  29.635   11.99697     7040.03   12.451  2.38567   4.188    515
   43   41  183084 2.444e-2  33.349   14.19345     9485.41   15.593  2.43473   5.130   1120
   47   43  293980 2.317e-2  37.110   18.99742    14129.48   20.280  2.48199   6.396   2834
```

Three things to read off before any fitting.

**theta rises monotonically from z = 29 onward** and reaches 2.482 at z = 47. Within the family
the drift is real and it has not slowed: 2.159, 2.183, 2.159, 2.252, 2.345,
2.386, 2.435, 2.482.

**c(z) rises from 3.50 to 20.28**, a factor of 5.8 while z rises by a factor of 2.5. If c grew
like z^1, the factor would have been 2.5. So c is growing distinctly faster than z^1 over this
range, which by §0's identity is theta going somewhere above 2, not to 2.

**need/z^2, the column that actually decides the Gap Reformulation, runs 1.60, 1.77, 1.71, 2.38,
3.48, 4.19, 5.13, 6.40.** The required window is already too long for the zone at the bottom of
the ladder and is four times more too long at the top. Whatever the asymptotics turn out to be,
nothing in the measured range is close to closing.

---

## 3. The within-family fit

The question is the growth exponent e in c(z) ~ A z^e, because theta -> 1+e and e = 1 is exactly
theta -> 2. Fitted by OLS on logs over all eight rows:

```
-- FIT c(z) = A z^e over all 8 points --
     e = 1.9933 +/- 0.2562   A = 0.0077   R^2 = 0.9098
     95% CI for e: [1.3662, 2.6203]   =>  theta_infty = 1+e in [2.3662, 3.6203]
     H0: e = 1 (theta -> 2)      t = 3.876  REJECTED at 95%
     H0: e = 0.9 (theta -> 1.9)  t = 4.266  REJECTED at 95%
     drop-one jackknife range for e: [1.8400, 2.3826]
     last 4 points only: e = 3.0685 +/- 0.2751
     first 4 points only: e = 0.9447 +/- 0.3842
```

**c grows faster than z^1, by a margin this data can see.** But the last two lines are the
important ones.

**A second parametrisation, because ln z is a bad abscissa here.** Consecutive rows differ by
which prime joins the sieve, while ln z moves by whatever the prime gap happens to be; §4 shows
what that does. lnW = theta(z) moves only when a prime actually enters, so abscissa and ordinate
jump together, and by PNT lnW ~ z so the exponent transfers. Same model, need = A' lnW^(1+eW)
ln^2(lnW), same null eW = 1:

```
     c_W(lnW) = A' lnW^eW :  eW = 1.5256 +/- 0.1413   A' = 0.1101   R^2 = 0.9510
     => theta_infty = 1 + eW = 2.5256   95% CI [2.1798, 2.8714]
     H0: eW = 1 (theta -> 2)   t = 3.719   REJECTED at 95%
     drop-one jackknife range for eW: [1.4737, 1.7251]
```

(A trap worth recording, since it caught this analysis first time round: a raw regression of
ln(need) on ln(lnW) must be compared to the null 2 + <2/ln lnW> = 2.649, NOT to 2. That 2.649 is
an empirical null for a regression slope and is numerically a near-coincidence with the unrelated
vector-sieve threshold 1+sqrt(e) = 2.6487 of §7; the two have nothing to do with each other. The ln^2
factor carries about 0.65 of slope over this range. Testing the raw slope against 2 manufactures
a rejection out of nothing.)

**Both parametrisations reject e = 1 at 95%, and the drop-one jackknife never comes near it**
(worst case 1.84 in z, 1.47 in lnW). Two cautions on that, stated because eight structured points
do not deserve a clean p-value. First, the residuals are not independent noise; §4 shows they
carry the bookkeeping pattern, so the nominal level is optimistic. Second, and more seriously:

**c(z) is not a power law over this range.** The exponent itself drifts, from
e = 0.94 +/- 0.38 on the first four points to e = 3.07 +/- 0.28 on the last four. So the fitted e
is not estimating an asymptotic exponent; it is averaging a moving one. Anything read off it as
"the limit" is over-reading. What the fit legitimately supports is the weaker and still decisive
statement that **over the measured range c grows faster than z^1 and the gap is widening.**

**The mechanism, which is steadier than the fit.** Decomposing
need = 2 * sqrt(2 lnW) * sqrt(<rho^2>) / M, two of the three factors are tame and known:

```
     d ln[sqrt(2 lnW)]/d ln z    = 0.5657 +/- 0.0263   (R^2 0.987)   [lnW ~ z, so 1/2]
     d ln[1/M]/d ln z            = 0.5551 +/- 0.0345   (R^2 0.977)   [1/M ~ ln^2 z, so 2/ln z]
     d ln[sqrt(<rho^2>)]/d ln z  = 2.4625 +/- 0.2184   (R^2 0.955)   [everything else]
     d ln[N]/d ln z              = 4.5629 +/- 0.1952   (R^2 0.989)
     cancellation (N/12)/<rho^2>: 80.2 100.6 126.9 120.8 74.4 72.9 75.7 67.9
```

So theta < 2 requires sqrt(<rho^2>) to grow slower than z^{3/2} (after the ln^2 z is accounted
for). It is measured at z^{2.46}, and at z^{3.02} on the last four points. The whole problem is
in <rho^2>, and <rho^2> is tracking the divisor-pair count N with a cancellation factor that is
flat near 75 to 125 rather than improving. That is a cleaner statement of the obstruction than
any number in the theta column: **the mean square is not cancelling any harder as the sieve grows,
so it inherits N's growth, and N grows like z^{4.6} while the budget allows z^3.**

---

## 4. How much of the theta column is z-versus-p_max bookkeeping

z does double duty. It sets D = z^s and ln z continuously, but it enters the arithmetic only
through `primesBelow(z)`, which jumps at primes. So a block of z between two consecutive primes
shares an identical prime set, an identical W, an identical lnW. Anything theta does across such
a block is bookkeeping.

**This is not a defect in the ladder.** z = prime is the physically correct convention:
the zone is (p, p'^2), the sifted set is the z-rough numbers with z = p', and the Gap
Reformulation asks for the gap below p'^2 = z^2. Every z in the ladder is a prime, so every point
is a genuine zone. The block sweep below is a CONTROL on how much of theta's numerical value is
set by the offset, not a correction to the ladder.

Three complete blocks. Every row inside a block has the SAME prime set, the same W, the same lnW;
only D = z^3 and ln z move.

```
   z  pmax     D       N     lnW      M          sqrt<rho^2>     need     theta
   19   17    6859    4764  13.1432 3.9598e-2    2.225393    576.278 2.158846   <- zone (prime)
   20   19    8000    8868  16.0876 3.3424e-2    3.079392   1045.180 2.320616
   21   19    9261    9052  16.0876 3.3437e-2    2.963209   1005.380 2.270675
   22   19   10648    9372  16.0876 3.4160e-2    2.896904    962.083 2.222260
   23   19   12167    9636  16.0876 3.4169e-2    2.825328    938.046 2.182686   <- zone (prime)
   24   23   13824   16668  19.2231 2.9934e-2    3.960675   1640.844 2.329402
   25   23   15625   17052  19.2231 2.9948e-2    4.013201   1661.815 2.303806
   26   23   17576   18308  19.2231 3.0622e-2    3.861137   1563.664 2.257388
   27   23   19683   18940  19.2231 3.1346e-2    3.512913   1389.768 2.195768
   28   23   21952   19436  19.2231 3.1665e-2    3.300789   1292.677 2.150069
   29   23   24389   20700  19.2231 3.1843e-2    3.687272   1435.992 2.158887   <- zone (prime)
   32   31   32768   57020  26.0244 2.6266e-2    6.893421   3786.841 2.377356
   33   31   35937   57380  26.0244 2.6601e-2    6.736350   3653.914 2.346214
   34   31   39304   62116  26.0244 2.6879e-2    8.055576   4324.263 2.374118
   35   31   42875   69124  26.0244 2.7415e-2    8.827980   4646.281 2.374964
   36   31   46656   69476  26.0244 2.7681e-2    8.405287   4381.314 2.339908
   37   31   50653   76484  26.0244 2.8057e-2    9.256201   4760.250 2.345125   <- zone (prime)
```

**What the control says, and it is not what a first look suggests.** In the p_max = 19 block
theta falls monotonically by 0.138 across z = 20..23, and in the p_max = 23 block it falls by
0.179 across z = 24..29 (2.329 down to 2.150, with a small rebound at the last step). Either
number is as large as the whole drift being read off the ladder. That first look suggests a
correctable offset, roughly 0.95 per unit of ln z.

The third block REFUTES that. In p_max = 31, z = 32..37, theta moves by only 0.037 and does not
fall monotonically; it wanders (2.377, 2.346, 2.374, 2.375, 2.340, 2.345). So there is no offset
rule to correct by, and the 0.95 figure does not survive its second test. What does survive is
weaker and still worth carrying: **the theta column carries irregular bookkeeping noise of order
0.04 to 0.18, of no consistent sign, and the noise shrinks as z grows.** At the bottom of the
ladder that noise is the size of the whole signal; by z = 37 it is a fifth of it. The practical
consequence is that no LOCAL slope on this ladder means anything, and only whole-range fits with
their error bars should be quoted. §3 does that.

**An independent control ladder.** Sampling at z = p+1 instead of z = p puts every point at its
block START rather than its block end. This is not a zone, so it is not physical, but it is a
second systematic sample of the same arithmetic:

```
   z pmax      N        M       lnW   sqrt<rho^2>       need     c(z)    theta    c/B    secs
   18   17    4644 3.959e-2  13.143    2.30839      597.83    3.976  2.21193   1.845      1
   20   19    8868 3.342e-2  16.088    3.07939     1045.18    5.823  2.32062   2.613      3
   24   23   16668 2.993e-2  19.223    3.96067     1640.84    6.769  2.32940   2.849     12
   30   29   34820 2.857e-2  22.590    5.17646     2435.58    7.018  2.29270   2.706     49
   32   31   57020 2.627e-2  26.024    6.89342     3786.84    9.852  2.37736   3.698    129
   38   37  110692 2.558e-2  29.635   11.29829     6799.61   13.523  2.42596   4.709    413
   42   41  177972 2.430e-2  33.349   14.20768     9549.59   16.275  2.45186   5.414   1097
   44   43  253716 2.258e-2  37.110   17.46291    13326.33   21.150  2.50978   6.883   2102
```

Same picture, shifted up by about 0.05 in theta, which is the block-position offset and nothing
else. The fit agrees with the main ladder within its error bar and reproduces the same
non-stationarity:

```
     e  = 1.6242 +/- 0.1829   R^2 0.9293   H0 e=1: t = 3.413  REJECTED at 95%
        drop-one jackknife [1.4843, 1.7534];  first 4: 0.9877 +/- 0.4305;  last 4: 2.2237 +/- 0.3522
     eW = 1.3653 +/- 0.1134   R^2 0.9603   H0 eW=1: t = 3.222  REJECTED at 95%
        drop-one jackknife [1.3035, 1.4940]
     need/z^2: 1.85  2.61  2.85  2.71  3.70  4.71  5.41  6.88
```

So the conclusion does not depend on which systematic position in the block is sampled. Both
ladders reject e = 1, both put the point estimate well above it, and both show the same drift of
the exponent from about 1 on the first four points to 2.2 or 3.1 on the last four.

(A ninth control row at z = 48, the block start matching the main ladder's z = 47, was launched
and had not finished at 50 minutes when this was written. It is not needed for anything above:
the control ladder already spans p_max = 17 to 43, the same span as the main ladder, and the two
fits already agree inside their error bars.)

---

## 5. Two probes that change how the column should be read

### 5a. theta does not move with s: raising the level is not a lever

The s = 2.6 and s = 3.0 families are not comparable, and the reason is stronger than
incomparability: at s = 2.6 the main term is below
the sifting threshold 1+sqrt(e) = 2.6487 and is positive only by finite-size effects, so those
rows do not describe an asymptotically valid certificate at all. But empirically theta barely
notices s:

```
  z=19:  s    D        N     M          sqrt<rho^2>   need      theta
  z=19: 2.8     3806    2460 3.6949e-2    2.138971    593.599 2.168904
  z=19: 3.0     6859    4764 3.9598e-2    2.225393    576.278 2.158846
  z=19: 3.4    22272    5908 4.2085e-2    1.865714    454.579 2.078281
  z=19: 4.0   130321    8004 4.3511e-2    2.562481    603.883 2.174737
  z=19: 4.6   762547    8628 4.3621e-2    2.497732    587.144 2.165190
  z=23: 2.8     6499    5412 3.2270e-2    2.647928    930.895 2.180245
  z=23: 3.0    12167    9636 3.4169e-2    2.825328    938.046 2.182686
  z=23: 3.4    42646   15876 3.8156e-2    3.756713   1116.951 2.238358
  z=23: 4.0   279841   21020 3.8908e-2    3.427819    999.466 2.202913
  z=23: 4.6  1836319   25340 3.9025e-2    4.579069   1331.135 2.294307
  z=29: 2.8    12437   16668 2.9934e-2    3.960675   1640.844 2.198490
  z=29: 3.0    24389   20700 3.1843e-2    3.687272   1435.992 2.158887
  z=29: 3.4    93789   38140 3.4690e-2    6.297258   2251.147 2.292402
```

Over a factor of 200 in D, theta stays inside a band of about 0.1, the same size as the
bookkeeping noise, with no monotone trend. **Raising s is not a lever on theta**: the extra
divisor pairs a higher level buys inflate <rho^2> at almost exactly the rate they inflate M.

Two consequences. First, there is no cheap escape here; the exponent will not be bought by
pushing the level. Second, the two s = 2.6 points at z = 41, 47 are not materially biased in
value: mixing families was a validity error, not the source of the drift, and separating them
does not by itself change the reading.

### 5b. The exact supremum, which is not conditional on anything

`need` assumes the Gaussian maximal law as an equality and then applies |R| <= 2 sup|rho|. Both
are loose. Where the full period can be walked, the true sup|R| is available and the whole
conditional apparatus can be bypassed. `fullPeriodArray` handles z <= 29 (W = 223092870); past
that W + H exceeds the 2^32-1 typed-array limit, so a blocked walk was written for z = 31 and
custody-checked against z = 29 first:

```
$ node research/theta-ladder-sup.js 29
  z=29 s=3 W=223092870 H=47827: sup|R|=26.9407  minT=1496  H*M=1522.9407
     ... th_cond=2.1589  th_true=2.0018  true/z^2=1.0060   [18.6s]
      (fullPeriodArray gives sup|R| = 26.9407, identical)
```

Every z for which the full period is walkable, s = 3.0 throughout. `th_cond` is the conditional
column of §2; `th_true` uses the actual supremum in place of the Gaussian bound. z = 20 is
included as a non-prime control (it is not a zone, so it is not a physical point):

```
   z    W            sup|R|    rms     sup/rms  sqrt(2lnW)  ratio   slack   need_cond  need_true  th_cond  th_true  true/z^2
   19       510510   12.4270   3.3404    3.720      5.127   0.726  1.8363     576.28     313.83   2.1588   1.9524    0.8693
   20      9699690   18.8274   4.3393    4.339      5.672   0.765  1.8555    1045.18     563.28   2.3206   2.1143    1.4082
   23      9699690   15.3410   3.5291    4.347      5.672   0.766  2.0893     938.05     448.97   2.1827   1.9477    0.8487
   29    223092870   26.9407   5.2735    5.109      6.200   0.824  1.6973    1435.99     846.06   2.1589   2.0018    1.0060
   31   6469693230   33.1030   6.2204    5.322      6.722   0.792  2.0199    2285.76    1131.63   2.2523   2.0476    1.1776
```

Three readings, and this is the part of the file that is not conditional on an unproven law.

1. **The conditional column overstates the true requirement by a factor 2.46 to 3.68 at the
   self-consistent window, and the factor rises monotonically from z = 17**
   (`history/staging/theta-selfconsistent.md`). The theta column is pessimistic at every
   measured z, which keeps it safe as a ceiling and useless as a floor.
2. **That slack is not a constant**, so the old argument that the conditional and the true
   theta share a limit (a constant slack vanishes in the exponent) does not go through on
   measurement; whether the two columns share a limit is OPEN.

> **⚠ CORRECTION 2026-08-18, amended 2026-08-19: THE z = 29 CROSSING DOES NOT HAPPEN, AND EVERY `need_true`
> IN THIS SECTION IS MEASURED AT THE WRONG WINDOW.**
> `research/theta-ladder-sup.js`:18 reads `const z=Number(process.argv[2]), u=3.2,
> s=3.0;` — **z comes from the caller and u never does.** So every `need_true`
> here is sup|R| at a window 61x to 123x longer than the operative window (an
> earlier 39x-62x phrase mixed two denominators). Verified by reading the line. Measured self-consistently by
> exhaustive full-period walk, `need_true/z²` is **0.5485 / 0.4877 / 0.4637** at
> z = 19 / 23 / 29 against the 0.869 / 0.849 / 1.006 printed below — overstated
> by 1.58x, 1.74x and **2.17x**. The certificate is POSITIVE at every one of the
> 223,092,870 positions at H = 0.46 z². **Nothing crosses at any level this box
> measured — z ≤ 31, all exact, all inside the budget — and the real crossing
> sits in (31, 47]** (`history/staging/theta-selfconsistent.md`). The prefix
> rows past z = 31 below are lower bounds on an overstated quantity and
> therefore bound nothing for this question. The numbers below are left in place as the custody record of
> what was run; do not quote them. Source:
> `research/history/staging/phase1-T4-maximal-law.md`.

3. **The true exponent crosses 2 inside the computable range, upward.** th_true reads
   1.9524, 1.9477, 2.0018, 2.0476 at the four physical points z = 19, 23, 29, 31, and
   need_true/z^2 reads 0.869, 0.849, 1.006, 1.178. The route's actual requirement FITTED inside
   the zone budget at z = 19 and z = 23, with 13 to 15 percent to spare, and stopped fitting at
   z = 29. This is the single most important measurement in the file, because it is exact
   arithmetic over complete periods and it is conditional on nothing at all.

**Past z = 31 the sup is still reachable one-sidedly.** The supremum over a PREFIX of the period
is a lower bound on the supremum over the period, hence a lower bound on need_true and on
th_true, and the prefix walk costs O(prefix), not O(W). Four billion positions each, s = 3.0,
about 210 seconds at every z tried:

```
   z    W                     H        sup|R|    need_true   th_true   need_true/z^2  secs
   37   2.0056e11            104291    45.9279    1636.96    2.0495      1.1957        202
   41   7.4207e12            144847    63.3621    2414.81    2.0975      1.4365        202
   43   3.0425e14            168694    70.9670    2903.62    2.1200      1.5704        205
   47   1.3083e16            224240    83.1568    3589.54    2.1261      1.6250        211
   53   6.1489e17            329369    94.2254    4259.08    2.1048      1.5162        211
   59   3.2589e19            464223   113.5770    5297.18    2.1030      1.5217        215
   61   1.9228e21            516482   128.2555    6269.47    2.1269      1.6849        218
   67   1.1729e23            697332   142.1060    7152.35    2.1108      1.5933        218
   71   7.8583e24            839512   153.5875    8013.87    2.1088      1.5897        218
```

**The flattening past z = 47 is an artifact of the fixed prefix and must not be read as the true
value levelling off.** The prefix is 4e9 positions at every z while W runs from 2.0e11 to 7.9e24, so
the fraction covered collapses (3e-7 of the period at z = 47, 5e-16 at z = 71) and the bound
weakens monotonically. For a field with Gaussian tails the sup over a window of length P scales
like sqrt(2 ln P) rather than sqrt(2 lnW), so the bound understates by roughly
sqrt(lnW / ln(4e9)), which is 1.09 at z = 37, 1.30 at z = 47 and 1.61 at z = 71.
Correcting by that heuristic factor would put th_true near 2.22 at z = 71, still climbing. The
correction is a heuristic and is NOT claimed; only the printed inequalities are.

Putting the exact and the one-sided rows in one column, s = 3.0, every point a zone:

```
   z          19       23       29       31       37       41       43       47       59       71
   th_true  1.9524   1.9477   2.0018   2.0476  >2.0495  >2.0975  >2.1200  >2.1261  >2.1030  >2.1088
   need/z^2 0.8693   0.8487   1.0060   1.1776  >1.1957  >1.4365  >1.5704  >1.6250  >1.5217  >1.5897
   status    exact    exact    exact    exact   prefix   prefix   prefix   prefix   prefix   prefix
```

**The statement this licenses, with nothing conditional in it:** the vector-sieve certificate's
actual all-positions window exceeds the zone budget z^2 at every z from 29 to 71 that was tested,
by a factor of at least 1.5 from z = 43 onward. It fitted inside the budget only at z = 19 and
z = 23, the two smallest points available. That is the run's firmest result and it is the one
that does not depend on the Gaussian maximal law at all.

---

## 6. The three-way verdict

The brief asks which of three the data supports: theta turns over below 2; theta converges to
exactly 2; theta settles above 2. Taking them in the order the evidence separates them.

### "theta turns over below 2": the range does speak to this, and it argues against

The exponent fit sharpens the trend and does not settle where the LIMIT sits. Branch A is
settled anyway, because §5b drops the conditional bound entirely and measures the exact
supremum:

```
   z          19      23      29      31      37     41     43     47     53     59     61     67     71
   th_true  1.9524  1.9477  2.0018  2.0476  >2.05  >2.10  >2.12  >2.13  >2.10  >2.10  >2.13  >2.11  >2.11
   need/z^2 0.8693  0.8487  1.0060  1.1776  >1.20  >1.44  >1.57  >1.63  >1.52  >1.52  >1.68  >1.59  >1.59
   status    exact   exact   exact   exact  prefix prefix prefix prefix prefix prefix prefix prefix prefix
```

Measured self-consistently, the actual all-positions requirement stays inside the zone budget
at every exactly-measured level — need/z^2 = 0.3550..0.6119 at z = 13..31, all exact — and
leaves it in (31, 47] (§5b, `history/staging/theta-selfconsistent.md`). The
table above is the custody record of the mis-windowed run — its suprema were taken at windows
39x to 62x too long, and its prefix rows are lower bounds on an overstated quantity; do not
quote either. The conditional column, which rests on the unproven Gaussian
maximal law, is where the route loses ground, with need/z^2 running

```
   z          19     23     29     31     37     41     43     47
   need/z^2  1.596  1.773  1.707  2.379  3.477  4.188  5.130  6.396
```

What argues against branch A is the conditional column and, past z = 31, the self-consistent
crossing; and the route is retired regardless: the sharp maximal law it needs is TPC-implying
(`history/staging/phase1-T4-maximal-law.md`).

### "exactly 2" against "above 2": the fits reject "exactly 2", with one real caveat

The honest answer here is nuanced, and it took the whole apparatus of §3 and §4 to see why.

**Nominally, e = 1 is rejected.** Both parametrisations, both ladders, all four tests:

```
   main ladder,    c vs z    : e  = 1.9933 +/- 0.2562  t = 3.876  REJECTED
   main ladder,    c_W vs lnW: eW = 1.5256 +/- 0.1413  t = 3.719  REJECTED
   control ladder, c vs z    : e  = 1.6242 +/- 0.1829  t = 3.413  REJECTED
   control ladder, c_W vs lnW: eW = 1.3653 +/- 0.1134  t = 3.222  REJECTED
```

and no drop-one jackknife on any of the four comes within 0.3 of e = 1. Taken at face value that
settles it: theta does not go to 2, it goes above.

**But it should not be taken quite at face value, for one specific reason.** The fitted exponent
is not stable. On the first four points of the main ladder it is 0.94 +/- 0.38, exactly the
theta -> 2 value; on the last four it is 3.07 +/- 0.28. The control ladder does the same, 0.99
then 2.22. A single power law does not describe c(z) here, so the OLS e is not estimating a
limit, and a test against e = 1 is a test against a model the data has already rejected. The
rejection is real as a statement about the measured range and is not licensed as a statement
about the limit.

So the fits establish this much, robustly: **over z = 19 to 47, c grows faster than z^1, the
margin is widening, and the exponent shows no sign of turning down.** They do not establish where
it ends up.

The reason the separation of the limit fails is §4. Consecutive rows on this ladder differ by which prime
enters the sieve, and the abscissa ln z moves by whatever the prime gap happens to be, so local
slopes swing from 0.2 to 5.4 and carry no information. Only the whole-range fit is meaningful,
and over ln z from 2.94 to 3.85 the leverage is not enough. The ceiling on what this ladder can
settle is therefore a mechanism, not an assertion.

**Extending the ladder will not fix it.** §9 prices z = 71 at 36 hours and it would move ln z
only from 3.85 to 4.26. The error bar on e scales like 1 over the spread in ln z, so a day and a
half of compute buys roughly a tenth off the error bar, and it cannot repair a fit whose exponent
tripled across the points it already has. The limit cannot be settled by more of this ladder, and
that is a statement about the method, not about the budget.

### The three-way verdict, stated plainly

1. **theta turns over below 2: NO — it dips and comes back.** Measured self-consistently the
   unconditional requirement sits inside the budget at every exact level (need/z^2 =
   0.3550..0.6119 at z = 13..31, falling 19 to 29 and rising from 31) and leaves it in
   (31, 47], where min T = 0 inside a prefix at H = 1.041 z². The conditional budget ratio
   rose 1.60 to 6.40 over z = 19 to 47. Both columns now point the same way, and the route is
   retired regardless, because the sharp maximal law it needs is TPC-implying.

2. **theta converges to exactly 2: NOT SUPPORTED.** The null e = 1 is rejected at 95% in all four
   fits and no drop-one jackknife approaches it. The caveat of §3 applies and is important: the
   exponent is not stationary, so this rejects a model rather than a limit. But nothing in the
   data pulls toward 2, and the direction of the instability is away from it, not toward it.

3. **theta settles above 2: SUPPORTED as to "above 2", NOT ESTABLISHED as to "settles".** Every
   estimator centre on both ladders in both parametrisations puts theta above 2, with the range
   of point estimates 2.37 to 2.99. But "settles" is not observed: the fitted exponent climbs
   from about 1 on the first four points to 2.2 or 3.1 on the last four, and the mechanism of §3
   says why, namely that <rho^2> tracks a divisor-pair count growing like z^{4.6} with a
   cancellation factor that is flat near 75 to 125 rather than improving.

**The answer is (3), with an amendment.** theta is above 2, it is rising, and there is no
evidence of it settling anywhere within reach. A fourth possibility is live beside the three:
that theta has no visible asymptote in this range at all.

**The decisive instrument is the exact supremum, not the fit.** The fit cannot separate a limit,
for the reasons above. The supremum removes the conditionality outright, which no amount of
laddering the conditional column could have matched.

---

## 7. What each branch costs the programme

The threshold arithmetic of `sift-limit-attack.md` §4.5, restated with our parameters. Component
levels D1 = D2 = z^s, window H = z^u, theta_total defined by D1*D2 = H^{theta_total}, so
**theta_total = 2s/u**.

| accounting | theta_total | positivity needs | against beta_2 = 4.26645 |
|---|---|---|---|
| coupled, absolute-value remainders | 1 | u > K_BF = 5.1581 (the 2(1+sqrt e) = 5.2974 here before 2026-08-20 was Ford-Halberstam's constant, 2.7% worse) | loses |
| break-even | 1.2090 | u > 4.26645 | ties |
| full decoupling (Lemma V as stated) | 2 | u > 1+sqrt e = 2.649 | wins by 1.62 |
| **this ladder, s = 3.0, u = theta** | **6/theta** | u > theta | see below |

At the measured theta = 2.159 to 2.482, theta_total = 6/theta sits at **2.4 to 2.8**, i.e. ABOVE
full decoupling: the component level D = z^3 exceeds the window H = z^{2.5}. Two things follow,
and both need saying plainly.

**(i) The exponent, if the maximal law held, is still inside the interesting range, but only
just.** theta = 2.482 at z = 47 is below beta_2 = 4.2665 by 1.78, and below the full-decoupling
target 2.649 by 0.17. It sits below 2.649 because s = 3.0 buys margin over the sifting threshold
2.6487, which moves the binding constraint off the sifting limit and onto the remainder. But the
column is rising: across z = 37 to 47 theta gains 0.137 while ln z gains 0.240, a local slope of
0.57 per unit ln z. Extrapolating that linear trend, theta reaches 2.649 near z = 63; under the
fitted power law of §3, nearer z = 130. Both are extrapolations and §3 says why neither should be
trusted as a limit. But either way the margin below the full-decoupling target is 0.17 and
closing, so the claim in (i) has a short measured runway, and it would be checkable at z = 59 for
about five hours of compute if anyone wanted the deadline pinned.

**(ii) But this regime is OUTSIDE the range Lemma V is stated in.** Lemma V is written for s from
about 0.63u up to u - eps, i.e. s <= u. Here s/u = 1.62–1.72 > 1. So the theta column is NOT
the statement "Lemma V suffices". It is the statement "the actual sawtooth, if it obeys a Gaussian
maximal law, is smaller than Lemma V's stated range would need". Closing it needs the maximal law,
which `sift-limit-attack.md` §3 already names as "the parity wall in concentration clothing".
`research/sift-limit-attack.md` §§3 and 4.5 is the home and the authority for this: Lemma V is
not the operative assumption at the measured working point. TODO 0's two open items, (a) the
drift and (b) the maximal law, are therefore not independent halves. (b) is the whole price;
(a) only tells you what you would be buying.

Now the three branches.

**Branch A: theta turns over below 2.** Then the certificate is positive at every position in a
window shorter than z^2, which is the Gap Reformulation, hence the Zone Postulate, hence TPC. But
conditional on the maximal law throughout. Even the win branch is not TPC; it converts the
programme's open problem from "find an exponent" into "prove one maximal inequality", which is
better posed and not obviously easier: it is the same all-positions quantifier that
`natal5-variance.js` reading 6 shows no ensemble statement can close.

**Branch B: theta -> exactly 2.** This is a MISS, not a tie, and more is owed than it looks.
theta -> 2 means need = A z^2 ln^2 z, which exceeds z^2 by a factor
A ln^2 z. The Gap Reformulation needs the gap below p'^2 = z^2, so the real requirement on the
coefficient is not "c grows like z^1" but

    c(z)  <  B(z) = z / ln^2 z ,      equivalently   need / z^2 < 1.

That column is in §2 and it is above 1 throughout and rising. So e = 1 exactly loses by
A ln^2 z, which with the e := 1 refit coefficient A = 0.2445 is a factor 3.6 at z = 47 and grows
without bound. Branch B leaves the route exactly where branch C does.

**Branch C: theta settles above 2.** This is what the data says, and the route becomes an
exponent-improvement programme that should be repriced as one. Conditional on the maximal law it
currently gives a two-class gap exponent of 2.48 at z = 47 against the unconditional 4.2665. That
would be a real theorem if the law were ever proved, and it is the first thing in this repo below
2.649. It is not and never becomes TPC. And per (i) the margin below 2.649 is 0.17 and shrinking,
so even the "first below full decoupling" claim has a short measured runway.

---

## 8. Readings

1. **VERIFIED.** The four existing s = 3.0 rows reproduce digit for digit with this invocation:
   theta = 2.158846, 2.182686, 2.158887, 2.252324 at z = 19, 23, 29, 31. The blocked supremum
   walker reproduces `fullPeriodArray` exactly at z = 19, 20, 23, 29 (sup|R| = 12.4270, 18.8274,
   15.3410, 26.9407) and minT = 468 at z = 20 matches the archived S5 log.

2. **VERIFIED.** `need` and theta are H-free. `row(z, u, s)` returns the same theta for
   u = 1.8, 2.2, 2.8, 3.2, 4.0, so the family is set by s alone and the window index is
   irrelevant.

3. **MEASURED.** Four new s = 3.0 rows at z = 37, 41, 43, 47, plus a control ladder at z = p+1
   and three complete inter-prime blocks. Full tables in §2 and §4.

4. **MEASURED.** The within-family growth of the coefficient. c(z) = 3.498, 4.148, 4.367, 6.253,
   9.867, 12.451, 15.593, 20.280 at z = 19..47, fitted as c ~ A z^e with e = 1.9933 +/- 0.2562
   (and eW = 1.5256 +/- 0.1413 in the lnW parametrisation, 1.6242 and 1.3653 on the control
   ladder). All four reject e = 1 at 95%. **c grows faster than z^1.** The strong caveat is
   reading 9.

5. **MEASURED.** theta does not move with s. Over D from z^2.8 to z^4.6, a factor of 200 in
   level, theta stays inside a band of about 0.1 with no trend. Raising the sieve level is not a
   lever on the exponent: the divisor pairs it buys inflate <rho^2> at the rate they inflate M.

6. **REFUTED.** Mixing the s = 2.6 and s = 3.0 families is not the source of the drift.
   Separating them is correct for VALIDITY, since s = 2.6 is below the sifting threshold
   1+sqrt(e) = 2.6487 and its main term is positive only by finite-size effects. But reading 5
   shows theta is nearly insensitive to s, so the two s = 2.6 points were not materially biased
   in value, and cleaning the family up does not change the reading.

7. **MEASURED.** The theta column carries irregular bookkeeping noise of 0.04 to 0.18 from the
   offset between z and the largest prime below it, of no consistent sign, shrinking with z. The
   guess that it behaves as a fixed offset of about 0.95 per unit ln z holds in two blocks and is
   REFUTED by the third. Consequence: no local slope on this ladder carries information, and only
   whole-range fits should be quoted.

8. **SUPERSEDED 2026-08-18 — this was called "the headline of the run" and it does
   not survive.** Every `need_true` below is measured at u = 3.2, hard-coded in
   `theta-ladder-sup.js`:18 and taken from no caller, 61x to 123x longer than
   the operative window. Self-consistently the values are 0.5485 / 0.4877 /
   0.4637 at z = 19 / 23 / 29 (0.6119 exact at z = 31), not
   0.869 / 0.849 / 1.006; the certificate is positive at all 223,092,870
   positions at H = 0.46 z², and the real crossing sits in (31, 47]
   (`history/staging/theta-selfconsistent.md`). The
   original text follows as the custody record of the run; it must not be quoted.
   See §5b's correction box and `history/staging/phase1-T4-maximal-law.md`.

   *(original, superseded)* **MEASURED, exact, and conditional on nothing. The headline of the run.** Replacing the
   Gaussian maximal bound by the true full-period supremum gives th_true = 1.9524, 1.9477,
   2.0018, 2.0476 at z = 19, 23, 29, 31, and a 4e9-position prefix supremum extends the column
   one-sidedly to th_true > 2.05, 2.10, 2.12, 2.13, 2.10, 2.10, 2.13, 2.11, 2.11 at
   z = 37, 41, 43, 47, 53, 59, 61, 67, 71, at about 210 seconds each. The corresponding
   need_true/z^2 is 0.869, 0.849, 1.006, 1.178 exact, then above 1.20, 1.44, 1.57, 1.63, 1.52,
   1.52, 1.68, 1.59, 1.59. **The route's actual requirement fitted inside the zone budget only at
   z = 19 and z = 23, the two smallest points available, and exceeds it by at least half again at
   every z from 43 to 71.** The apparent flattening past z = 47 is an artifact of the fixed prefix
   length against a period growing to 7.9e24, not a levelling of the true value. The conditional
   column is a factor 1.70 to 2.09 pessimistic with no trend in that factor, so both columns
   share a limit.

9. **MEASURED, and it limits reading 4.** c(z) is not a power law over this range. The fitted
   exponent drifts from e = 0.94 +/- 0.38 on the first four points to e = 3.07 +/- 0.28 on the
   last four (control ladder: 0.99 to 2.22). So the OLS e is averaging a moving exponent, not
   estimating a limit, and no extrapolation off it should be quoted. What survives is the
   range statement: over z = 19 to 47, c grows faster than z^1 and the margin widens. Extending
   the ladder does not fix this; by reading 13 it costs 36 hours to move ln z from 3.85 to 4.26,
   which would tighten the error bar by about a tenth.

10. **REFUTED.** "theta -> 2 exactly would be the boundary case." It is a miss, not a tie.
    theta -> 2 means need = A z^2 ln^2 z, which exceeds the zone budget z^2 by A ln^2 z: with the
    e := 1 refit coefficient A = 0.2445 that is a factor 3.6 at z = 47, and it grows without
    bound. The requirement on the coefficient is c(z) < z/ln^2 z, not c ~ z^1.

11. **INFERRED (the repricing for TODO 0).** The exponent road survives as an
    exponent-improvement programme and not as a route to TPC. It should be repriced at: a
    conditional two-class gap exponent of 2.48 at z = 47 and rising, against the unconditional
    4.2665, whose entire price is one unproven maximal inequality for the sawtooth. Note the
    margin below the full-decoupling target 2.649 is now only 0.17 and closing (§7 (i)), so even
    the modest version of the claim has a measured deadline. TODO 0's items (a) and (b)
    are not independent halves; (b) is the whole cost and (a) only prices the goods. Item (a),
    the drift, is now answered as far as this method can answer it and should leave TODO. Item
    (b), the maximal law, is the live question and should be restated as the whole of item 0.

12. **INFERRED (next move, if the route is kept).** The exact-supremum direction is better
    conditioned than the exponent ladder and far cheaper per unit of information: it costs
    O(prefix length) rather than O(N^2) in the divisor-pair count, it needs no hypothesis, and its
    error is one-sided in the safe direction. Four billion positions cost about 200 seconds at any
    z in this range, against 47 minutes for one conditional row at z = 47. If the route is kept,
    this is the instrument to push, not the ladder: it already reaches past where the conditional
    ladder can afford to go, and the quantity it bounds is the one the Gap Reformulation actually
    needs. Two refinements worth having: a longer prefix at fixed z, to measure how fast the
    prefix sup approaches the period sup and hence how much the one-sidedness is costing; and the
    full period at z = 37 (4.6 hours), which would give a fifth exact point and calibrate the
    prefix bounds against a known truth at a z where they are already in use.

13. **MEASURED.** The upper ladder is 3x to 10x more expensive than the divisor-pair count
    suggests at first glance (§9), and by reading 9 it would not separate the hypotheses anyway.

---

## 9. Reproduction

```
node research/theta-ladder-row.js <z>              # one row: row(z,3.2,3.0) + the S6 need line
node research/theta-ladder-sup.js <z> --fixed-point --band=80  # self-consistent H*, then one band walk
node research/theta-ladder-sup.js <z> --Hs=a:b[:st]             # a whole H band in ONE period walk (z <= 31 exact)
node research/theta-ladder-sup.js <z> 4000000000 --H=<n>        # prefix sup at a caller-set window: a LOWER bound
node research/theta-ladder-sup.js <z> 1e18 gauss --u=<x>        # conditional columns; the window must be named
```

Rows are O(N^2); at s = 3.0 budget about 2.85e-8 s per divisor pair on this machine. The whole
ladder above ran in parallel, one process per z, inside 70 minutes of wall clock.

**Cost.** Priced against the divisor-pair counts, which are exact and cheap to get:

```
z=47 N=293980   est   41 min = 0.7 h
z=53 N=466340   est  103 min = 1.7 h
z=59 N=774812   est  285 min = 4.8 h
z=61 N=1025812  est  500 min = 8.3 h
z=67 N=1574044  est 1177 min = 19.6 h
z=71 N=2148388  est 2192 min = 36.5 h
```

So z = 59 is about 5 hours and z = 71 is a day and a half. Given §6, none of it is worth
buying: going from z = 47 to z = 71 moves ln z from 3.85 to 4.26 and would move the c-fit's
error bar by less than the bookkeeping noise of §4.

The exact-supremum walk (`theta-ladder-sup.js`) is the cheaper and better-conditioned direction.
Exact means walking the whole period, which is linear in W = P(z): z = 29 is 19 s, z = 31 is 5
minutes, and z = 37 is 4.6 hours. The prefix mode is linear in the prefix instead, so four billion
positions cost about 200 seconds at every z tried, from 37 to 71, and it returns a one-sided bound
in the safe direction. That is the whole reason the unconditional column of §5b reaches further
than the conditional ladder does.

Custody for the blocked walker against `fullPeriodArray`: sup|R| = 12.4270, 18.8274, 15.3410,
26.9407 at z = 19, 20, 23, 29, identical both ways, and minT = 468 at z = 20 matches the S5 line
of `wave7-logs/lemmaV-meansquare.log`.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
