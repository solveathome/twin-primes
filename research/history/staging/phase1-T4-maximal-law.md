# T4: is the SIEVE Gaussian maximal law TPC-implying?

<!-- ledger
id: Q-maximal-law-tpc
status: ANSWERED
todo: 0
question: Is the SIEVE Gaussian maximal law TPC-implying?
verdict: YES in the only form that would deliver anything: stated for the operative remainder R_H, need/z^2 runs 0.49 to 0.61, flat and below the zone budget at every z from 13 to 43, which is the Gap Reformulation, hence the Zone Postulate, hence TPC, so no soft argument can prove it; the published above-2 theta column is not the maximal law's verdict but the law plus two lossy steps.
-->

**YES — in the only form of it that would deliver anything.** Stated for the
operative remainder R_H instead of for the H-free potential rho, the sieve
maximal law gives an all-positions window of `need/z^2 = 0.49 to 0.61`, flat and
below the zone budget at every z from 13 to 43. That is the Gap Reformulation,
hence the Zone Postulate, hence TPC. So it cannot be proved by any soft argument,
for exactly the reason attack 8 gave for the elementary count. The published
above-2 theta column is **not** the maximal law's verdict: it is the maximal law
plus two lossy steps taken afterwards, and those steps cost a factor 1.48 rising
to 8.40 across z = 13 to 43.

**The certificate route retires as a road to TPC.** It survives only in the
weaker form the corpus actually wrote down, which is legal precisely because it
finishes nothing.

**And the reason it has looked close is now measurable.** At the operative
window the sharp maximal law is not a generous hypothesis but an approximately
exact description of the sawtooth: the ratio
`sup|R_H| / (rms * sqrt(2 lnW))` reads 0.56, 0.73, 0.92, 0.79, 0.85 at
z = 13, 17, 19, 23, 29, and is transiently above 1 at z = 19. A hypothesis that
is true to a few percent, whose truth would give TPC, is not a hypothesis with a
soft proof waiting to be found. It is the wall wearing a different hat.

**One separate defect, found on the way and worth its own line:**
`research/theta-ladder-sup.js`:18 hardcodes u = 3.2, so every exact-supremum
number in `theta-ladder.md` sec.5b measures the supremum at a window 39x to 62x
longer than the one it draws a conclusion about. Corrected self-consistently, the
unconditional requirement at z = 29 is `0.4637 z^2`, not the published
`1.0060 z^2`. **The crossing that reading 8 calls "the headline of the run", and
that TODO 0 cites as the reason this is not a road to TPC, does not happen.**
The route is not refuted by the unconditional data. It is refuted by sec.2.

Scratch scripts (not committed): `t4-elem.js`, `t4-sieve.js`, `t4-sup.js`,
`t4-probe.js` in the session scratch directory. No repository file was edited.

---

## 0. CUSTODY

Three independent reproductions before anything new was computed.

```
ELEMENTARY, attack 8 sec.4, all nine rows, digit for digit:
   p_n     L_need   theta    L/p_n^2      attack 8 says
    13       120    1.8665   0.7101       120  1.8665  0.7101   OK
    19       191    1.7838   0.5291       191  1.7838  0.5291   OK
    23       312    1.8316   0.5898       312  1.8316  0.5898   OK
    31       462    1.7867   0.4807       462  1.7867  0.4807   OK
    47       985    1.7902   0.4459       985  1.7902  0.4459   OK
    71      1800    1.7584   0.3571      1800  1.7584  0.3571   OK
    97      2935    1.7453   0.3119      2935  1.7453  0.3119   OK
   199      9744    1.7351   0.2461      9744  1.7351  0.2461   OK
   401     26378    1.6984   0.1640     26378  1.6984  0.1640   OK

SIEVE crude column against theta-ladder.md sec.2:
   z=19 need 576.3 theta 2.1588 | ladder 576.28 2.158846   OK
   z=23 need 938.0 theta 2.1827 | ladder 938.05 2.182686   OK
   z=29 need 1436.0 theta 2.1589 | ladder 1435.99 2.158887 OK
   z=31 need 2285.8 theta 2.2523 | ladder 2285.76 2.252324 OK
   z=37 need 4760.3 theta 2.3451 | ladder 4760.25 2.34513  OK
   z=41 need 7040.0 theta 2.3857 | ladder 7040.03 2.38567  OK
   z=43 need 9485.4 theta 2.4347 | ladder 9485.41 2.43473  OK

MEAN SQUARE, my bucketed evaluator against the repo's closed form
(research/sift-limit-lemmaV.js meanSquare), worst relative error over
{H = 7, 50, 200, 651, 3806} plus H = z^3.2, and the plateau:
   z=13  4.0e-13   z=17  2.2e-12   z=19  3.0e-12   z=23  1.1e-11
   z=29  2.0e-11   z=31  1.3e-11

FULL-PERIOD WALK, my prefix-sum walker against the repo's fullPeriodArray:
   z=13 H=200  sup 2.168831 minT  9  | repo identical
   z=17 H=340  sup 5.975358 minT 10  | repo identical
   z=19 H=600  sup 9.758594 minT 14  | repo identical
   z=23 H=1000 sup 11.169236 minT 23 | repo identical
   z=29 H=700  sup 13.289889 minT  9 | repo identical
```

The bucketed evaluator is the only new machinery. It is the repo's own closed
form regrouped: a divisor pair (i,j) enters `<R^2>_H` only through
`h = H mod g`, `g = gcd(q_i,q_j)`, so one O(N^2) pass bucketed by
`(g, x = (c_j-c_i) mod g)` serves every H. The buckets are tiny (3,068 nonzero
entries at z = 19; 29,834 at z = 31), which is what makes a full H-scan
affordable where the repo's per-H O(N^2) call is not.

**No S6 column was used.** The crude `need` is recomputed from `row()`'s
`plateau`, `M` and `lnW`, which `sift-limit-lemmaV.js`:424 lists as UNAFFECTED by
the `elementaryVariance` bug, and the elementary side is computed here from
`paper/variance-note.md` Theorem 2 directly, not from the flagged function.

---

## 1. THE TWO STATEMENTS, SIDE BY SIDE

This was the first deliverable asked for, and stating it is most of the answer.

**E — the elementary version** (attack 8 sec.4). Let
`N_H(x) = #{r in (x, x+H] : r and r+2 both p_n-rough}`, `E = delta H`,
`Var` from `paper/variance-note.md` Theorem 2. The hypothesis is a sub-Gaussian
lower tail plus a union bound over the W = p_n# positions of the period:

```
    P(N_H(x) = 0) <= exp(-E^2/(2 Var))     for every x,
 => min_x N_H(x) >= 1  as soon as  E^2/(2 Var) > ln W,
    equivalently                   E > sqrt(2 lnW * Var).
```

**S — the sieve version.** The certificate splits exactly as `T(x) = H*M + R(x)`
(`sift-limit-lemmaV.js` header), `R` a signed sawtooth over the divisor-pair
lattice. The corpus states the hypothesis in exactly one place,
`sift-limit-lemmaV.js`:466, echoed by `theta-ladder.md` sec.1:

```
 S-crude:  sup_y |rho(y)| <= sqrt(<rho^2>) * sqrt(2 ln W),
           then  |R_H| <= 2 sup|rho|
 =>        H*M > 2 sqrt(2 lnW <rho^2>)        (right side FREE of H)
```

The exact analogue of E is not written down anywhere in the corpus. It is:

```
 S-sharp:  sup_x |R_H(x)| <= sqrt(2 lnW) * sqrt(<R^2>_H)
 =>        H*M > sqrt(2 lnW * <R^2>_H)        (right side DEPENDS on H)
```

**The difference is not a difference of hypothesis class.** Both say: the
supremum of a lattice sawtooth sum over W positions is at most `sqrt(2 ln W)`
times its own rms. rho and R_H are members of the same family over the same
divisor-pair lattice; R_H is a sawtooth sum of 2N terms. What separates them is
where the template is applied and what is done afterwards:

| | E | S-crude | S-sharp |
|---|---|---|---|
| field | the count N_H | the potential rho | the remainder R_H |
| fluctuation scale | Var(N_H), grows like H | `<rho^2>`, H-free | `<R^2>_H`, grows like H |
| extra lossy step | none | triangle inequality, factor 2 | none |
| criterion | `E > sqrt(2 lnW Var)` | `HM > 2 sqrt(2 lnW <rho^2>)` | `HM > sqrt(2 lnW <R^2>_H)` |

S-crude pays twice: the factor 2 from `|R| <= 2 sup|rho|`, and the replacement of
the operative `<R^2>_H` by the H-free saturation plateau `2<rho^2>` that
`<R^2>_H` only reaches at H far beyond the window in question. At z = 19, H = 191:
`2 sqrt(<rho^2>) = 4.4508` against `sqrt(<R^2>_191) = 1.4659`, a factor of 3.04.

---

## 2. THE ANSWER: THE SHARP COLUMN IS BELOW THE BUDGET AND FLAT

Fixed family s = 3.0 throughout, matching the ladder. `need/z^2` is the column
the Gap Reformulation must get below 1: the sift is over p < z, so a survivor
pair inside the zone (w, z^2), w the largest prime below z, is a twin pair.

```
   z      crude need   th_cr   cr/z^2  |  sharp need  th_sh   sh/z^2  | cr/sh  C_crit
   13         147.5   1.9470   0.8728  |        100   1.7954  0.5917  |  1.48   2.225
   17         305.4   2.0195   1.0568  |        142   1.7492  0.4913  |  2.15   1.720
   19         576.3   2.1588   1.5963  |        191   1.7838  0.5291  |  3.02   1.358
   23         938.0   2.1827   1.7732  |        325   1.8446  0.6144  |  2.89   1.418
   29        1436.0   2.1589   1.7075  |        436   1.8049  0.5184  |  3.29   1.660
   31        2285.8   2.2523   2.3785  |        570   1.8479  0.5931  |  4.01   1.445
   37        4760.3   2.3451   3.4772  |        709   1.8178  0.5179  |  6.71   1.564
   41        7040.0   2.3857   4.1880  |        913   1.8356  0.5431  |  7.71   1.509
   43        9485.4   2.4347   5.1300  |       1129   1.8688  0.6106  |  8.40   1.386
```

Three readings, in order of what they change.

**(a) The sharp column is below the zone budget at every level and is flat.**
`sh/z^2` has mean 0.5566, sd 0.0461, range [0.4913, 0.6144], and an OLS slope
against ln z of **+0.0104 +/- 0.0414, t = +0.25**: no trend, and the fluctuation
band is stated as brief Trap 3 requires. Structurally `need_sharp ~ 0.55 z^2`,
so `th_sh = 2 + ln(0.55)/ln z` rises toward 2 **from below** — exactly the
finite-size mechanism `theta-ladder.md` sec.0 warns about, operating here in the
direction the ladder did not test. The rise of th_sh is not the requirement
getting worse; it is a constant below 1 read through a logarithm. The measured
`d th_sh/d ln z = 0.0640 +/- 0.0233` (t = 2.75) is exactly what a
constant ratio predicts: `d/d ln z [2 + ln c / ln z] = -ln(c)/(ln z)^2 = 0.062`
at c = 0.55, ln z = 3.1. The slope is the signature of a constant, not of a
drift.

**So the decisive column is `need/z^2`, not theta.** Below 1 means TPC.

**(b) The crude column's rise above 2 is the lossy steps, not the requirement.**
`d th_cr/d ln z = 0.3746 +/- 0.0404 (t = 9.26)` against
`d th_sh/d ln z = 0.0640 +/- 0.0233 (t = 2.75)`. **83% of the published upward
drift in theta is the growth of the triangle-inequality and plateau losses, and
the residual 17% is the finite-size term of a constant ratio, not a real drift**
(the predicted finite-size slope is 0.062, the measured 0.064). The loss factor
itself grows as a clean power:
`d ln(crude/sharp)/d ln z = 1.367 +/- 0.142, t = 9.66`, so `cr/sh ~ z^{1.4}`.

`theta-ladder.md` sec.3 attributes the drift to `<rho^2>` tracking the
divisor-pair count N at a flat cancellation factor. That diagnosis is correct
about `<rho^2>` and it is therefore a diagnosis of the lossy step, because
`<R^2>_H` at the operative window does **not** grow that way: `<R^2>_H / H` reads
1.99e-2, 1.52e-2, 1.13e-2, 1.18e-2, 1.15e-2, 1.08e-2, 1.07e-2, 1.06e-2, 1.01e-2
at z = 13..43, essentially constant. The sawtooth remainder at the operative lag behaves like a
random walk in H; the saturated potential does not, and the ladder prices the
saturated potential.

**(c) The implication is robust, not delicate.** `C_crit` is the largest constant
C for which a maximal law `sup|R_H| <= C sqrt(2 lnW <R^2>_H)` still yields
`need < z^2`. It reads 2.23, 1.72, 1.36, 1.42, 1.66, 1.45, 1.56, 1.51, 1.39 — flat near 1.5
with no downward trend. A maximal law that is loose by 50% is still TPC-implying.
The implication does not depend on the constant `sqrt(2 ln W)` being exactly
right.

### Why this settles the binary

`S-sharp` at level z gives `T(x) > 0` at every x for `H = need_sharp < z^2`. The
Brüdern-Fouvry pointwise inequality makes `T(x)` a lower bound for the count of
twin-admissible r in the window, so every window of length H holds one; the
window anchored at x = w is the zone (w, z^2); a z-rough pair below z^2 is a twin
prime pair. That is the strong Zone Postulate at every z, hence TPC. Attack 8
sec.1.3 already showed no quantifier over z buys legality.

Checked against the more conservative budget `w^2` (attack 8 sec.1.1's form,
w the top sifted prime, rather than the ladder's `z^2`): `need_sharp/w^2` =
0.826, 0.840, 0.661, 0.900, 0.824, 0.678, 0.738, 0.667, 0.672 at z = 13..43. Below 1 at
every level, with less margin. The conclusion survives the stricter convention.

---

## 3. THE ELEMENTARY SIDE, REPRODUCED AND EXTENDED

Attack 8's nine rows reproduce exactly (sec.0). Extended to twenty-three levels
the drift is locally noisy and unambiguous in the aggregate:
`d theta/d ln p = -0.0362 +/- 0.0029 (t = -12.3)` and
`d ln(L/p^2)/d ln p = -0.447 +/- 0.015 (t = -29.4)`.

```
   p_n     13     17     19     23     29     31     37     41     43     47
   theta 1.8665 1.7755 1.7838 1.8316 1.7594 1.7867 1.7674 1.7717 1.7877 1.7902
   L/p^2 0.7101 0.5294 0.5291 0.5898 0.4447 0.4807 0.4317 0.4283 0.4500 0.4459

   p_n     53     59     61     67     71     97    127    199    251
   theta 1.7722 1.7500 1.7662 1.7566 1.7584 1.7453 1.7396 1.7351 1.7165
   L/p^2 0.4048 0.3608 0.3824 0.3593 0.3571 0.3119 0.2833 0.2461 0.2087

   p_n    401    601   1009   2003
   theta 1.6984 1.6815 1.6592 1.6340
   L/p^2 0.1640 0.1303 0.0947 0.0619
```

Below 2 at every level; `L/p^2` falls by a factor of 11.5 across the range, at a
clean rate `L_need ~ p^{1.55}`. Confirmed: **the elementary maximal law is
TPC-implying with a margin that grows.** The sieve version is TPC-implying with a
margin that is constant (sec.2a, slope t = -0.25). Both are on the same side of
the line, and the difference between them is a rate, not a verdict.

**Cross-check against a settled result, not a re-derivation.**
`research/history/MORNING-2026-08-16.md`:74 settled that the sieve mean square
loses to the elementary second moment by about 1.4x. Comparing the two criteria
at *matched prime sets* (sieve at z uses p < z, so it pairs with the elementary
at p_n = the largest prime below z):

```
   sift primes   <=11   <=13   <=17   <=19   <=23   <=29
   elementary      88    120    153    191    312    374
   sieve sharp    100    142    191    325    436    570
   ratio         1.14   1.18   1.25   1.70   1.40   1.52     mean 1.37
```

The 1.4x reappears at a completely different observable. That is a consistency
check on both computations, and it is the settled number, not a new one.

---

## 4. A SEPARATE DEFECT FOUND ON THE WAY: THE EXACT-SUPREMUM COLUMN IS NOT SELF-CONSISTENT IN H

This one matters independently of the binary, because the exact-supremum walk is
the instrument TODO 0 says to keep.

`research/theta-ladder-sup.js`:18 hardcodes `u = 3.2`. Every `need_true` in
`theta-ladder.md` sec.5b is therefore `sup|R| / M` with the supremum measured at
`H = z^3.2` and the conclusion asserted about a window 39x to 62x shorter. Since
`sup|R_H|` grows with H toward saturation, the published column systematically
**overstates** the unconditional requirement. Measured self-consistently — the
smallest H from which `min_x T(x) >= 1` holds onward, by exhaustive full-period
walk at every integer H in the scanned range:

```
   z   published need_true  /z^2   | self-consistent nP  /z^2   th_true | overstated by
   13         --             --    |        60          0.3550  1.5963  |     --
   17         --             --    |       126          0.4360  1.7070  |     --
   19       313.83         0.8693  |       198          0.5485  1.7960  |    1.58x
   23       448.97         0.8487  |       258          0.4877  1.7710  |    1.74x
   29       846.06         1.0060  |       390          0.4637  1.7718  |    2.17x
```

At z = 19 the published number uses `sup|R| = 12.4270` measured at H = 12360; the
supremum at the window the conclusion is about, H = 198, is 6.8403. The
overstatement grows with z (1.58, 1.74, 2.17) because the mismatch between
`z^3.2` and the operative `~0.5 z^2` widens like `z^{1.2}`.

This is brief Trap 2 in its purest form: two quantities compared at different
levels.

**The consequence is that the crossing does not happen.**
`theta-ladder.md` reading 8 — "the headline of the run" — states
`need_true/z^2 = 0.869, 0.849, 1.006, 1.178` and concludes "the route's actual
requirement fitted inside the zone budget only at z = 19 and z = 23 ... and
stopped fitting at z = 29". Measured self-consistently at z = 29 by exhaustive
walk over all 223,092,870 positions of the period at every integer H from 250 to
700: `min_x T(x) >= 1` from H = 390 onward, and 390/29^2 = **0.4637**. The
certificate fits inside the zone budget at z = 29 with 54% to spare. It fits at
every exactly computable z, not at two of them. TODO 0's "the unconditional
supremum, measured exactly, crossed the zone budget between z = 23 and 29" is
refuted at the point where it says the crossing happens.

**The prefix rows at z = 37 to 71 do not survive either, and not because they are
prefixes.** They are lower bounds on `sup|R_{z^3.2}|`, hence lower bounds on a
quantity that is itself 1.6x to 2.2x larger than the self-consistent one. A lower
bound on an overstatement bounds nothing. Their one-sidedness is real for the
question they answer and useless for the question TODO 0 asks of them.

**What the corrected column actually says**, unconditional and exhaustive over
complete periods: the vector-sieve certificate is positive at **every one of the
W positions** of the period at a window of only 0.36 to 0.55 of the zone budget,
at z = 13, 17, 19, 23, 29. That is a stronger unconditional statement than the
corpus currently records. It is a finite verification, not a theorem.

**Law tightness at the operative window.** `theta-ladder.md` sec.5b reading 2
reports `sup/rms` running at 0.73 to 0.82 of `sqrt(2 lnW)`, "the maximal law
being approached from below". That ratio is also measured at H = z^3.2. At the
operative window it is larger, and it does not approach cleanly from below:

```
   z                              13      17      19      23      29
   sup / (rms * sqrt(2 lnW))    0.5634  0.7279  0.9215  0.7935  0.8507
   last H at which S-sharp fails     1      35     227     197    none
```

At z = 19 the sharp law is violated at H = 191 by 0.6%, which is why the sharp
bound (191) comes out 3.5% below the truth (198). At z = 29 it holds at every one
of the 451 integer H scanned, with 15% to spare at the operative window. **The Gaussian maximal law at
the operative window is not a generous hypothesis: it is an approximately exact
description of the sawtooth, accurate to a few percent.** That is the cleanest
statement of why it cannot be proved softly — it is as hard as the truth, and the
truth there is TPC.

---

## 5. WHAT RETIRES, AND WHAT SURVIVES

### RETIRES

1. **TODO item 0's first move is answered: NO.** No weak form of the sawtooth
   maximal law is both soft-provable and sufficient. The two forms are disjoint:
   the form that finishes (S-sharp, `need/z^2 ~ 0.56`) is TPC-implying and
   therefore unprovable by any second-moment, concentration or soft argument; the
   form that is legal (S-crude, `need/z^2` rising past 3.4) finishes nothing.
   **The certificate route retires as a road to TPC.** Per TODO 0's own charter
   that is a win, not a loss.

2. **The theta ladder retires as an instrument for deciding TPC-reachability.**
   Its column measures S-crude, and 83% of its upward drift is the growth of two
   lossy steps rather than of the requirement (sec.2b). `theta-ladder.md` sec.6's
   three-way verdict ("theta settles above 2: SUPPORTED as to above 2") is a
   verdict on S-crude only; the maximal law's own exponent is 1.75 to 1.85 and
   nearly flat. `theta-ladder.md` sec.7 Branch A ("theta turns over below 2 =>
   TPC") is not a hope to be tested: it is already true of S-sharp, which is
   precisely why S-sharp is unprovable.

3. **`sift-limit-attack.md` sec.4.5's "the maximal law is the whole cost" needs
   splitting.** There are two maximal laws and they have different prices. A
   maximal law for the H-free potential rho alone is legal and buys an exponent
   reading 2.43 at z = 43 and 2.48 at z = 47, still rising, against
   beta_2 = 4.2665. A maximal law for R_H at the
   operative lag is TPC. The entire difference is the lag-H cancellation between
   rho(x) and rho(x+H) — which is a genuine mathematical distinction, not a
   bookkeeping one, and which the repo's own structural fact (V1: `g | H` kills
   the pair contribution) identifies as where all the cancellation lives.

4. **The Lemma V sub-question is moot, and moves further out of range.** At the
   corrected working point `u = th_sh = 1.75 to 1.85`, so `s/u = 3.0/1.8 = 1.62
   to 1.72` and `theta_total = 2s/u = 3.25 to 3.43`. TODO 0 records `s/u = 1.2`
   as already outside Lemma V's stated range `s <= u`; the corrected point is
   further outside, not closer. No weak form of the maximal law brings the
   working point into Lemma V's range, because the two are not the same
   statement and never were: `sift-limit-attack.md` sec.4.5 already says so and
   is right.

### SURVIVES

1. **The exact-supremum prefix walk, but only if run self-consistently in H.**
   TODO 0 is right that it is unconditional and one-sided in the safe direction,
   and it remains the best-conditioned instrument here. As currently coded it
   answers a different question than the one asked (sec.4). Fixing it costs one
   line: take H from the caller instead of hardcoding `u = 3.2`, and iterate to
   the fixed point of `H*M = sup|R_H|`.

2. **The unconditional finite verifications, which are stronger than recorded.**
   The certificate is positive at every position of the complete period at
   H/z^2 = 0.36, 0.44, 0.55, 0.49, 0.46 for z = 13, 17, 19, 23, 29 — five
   complete periods, the largest 223,092,870 positions. `sift-limit-attack.md`
   sec.4.5's pilot records exhaustive positivity at u = 2.2 through z = 20; this
   is the same fact at the sharper exponent 1.60 to 1.80, and two primes further.

3. **The Brüdern-Fouvry certificate and the exact mean-square machinery.** The
   closed form in `sift-limit-lemmaV.js` `meanSquare` reproduces to 1e-11 or
   better against an independently regrouped evaluator at six z and six H, and
   `fullPeriodArray` reproduces exactly against an independent prefix-sum walker
   at five z. Neither is implicated in anything above.

4. **The exponent programme, repriced upward in difficulty.**
   `theta-ladder.md` reading 11 already reprices the route as
   exponent-improvement rather than TPC. That stands, with one correction: the
   legal target is now specifically **a maximal law for rho**, not "the maximal
   law". What it would buy is the published rising column, 2.35 at z = 37 and
   2.48 at z = 47, which reading 11 already declines to extrapolate. The
   sharper-sounding exponent 1.85 that the correctly-stated law delivers is not
   available at any price: it is TPC.

5. **Attack 8 sec.4's alarm, now generalised.** Its rule — "anyone who computes
   the conditional and finds theta < 2 should read that as a soundness check
   firing, not as progress" — applies verbatim to the sieve side. This report is
   an instance of the rule firing, deliberately.

---

## 6. COVERAGE

**What I did not reach.**

- z = 47 for the sharp column was launched and had not finished when this was
  written (the O(N^2) bucket build is 4.3e10 pairs). The column is z = 13..43,
  nine points, against a published crude column reaching 47. Nothing in the nine
  points suggests `sh/z^2` is about to leave [0.49, 0.61], but the last point
  would be worth having and costs about half an hour.
- The self-consistent exact supremum reaches z = 29. **z = 31 is not verified**:
  W = 6.47e9 exceeds the 2^32-1 flat typed-array limit, and
  `theta-ladder-sup.js`'s blocked walker handles it but hardcodes u = 3.2, so
  using it would need the one-line change I am not permitted to make here. So
  the published 1.1776 at z = 31 is uncorrected by measurement; the correction
  factor grows 1.58, 1.74, 2.17 across z = 19, 23, 29, and 1.1776/2.2 = 0.54
  would continue the pattern, but that is an extrapolation, not a measurement.
  z = 29 is the point where the published column says the crossing happened, and
  that point IS measured.
- The z = 29 scan covered H = 250 to 700. `min_x T` is negative at H = 350 and
  positive from 390 on, so the threshold is inside the scanned range, but I did
  not verify H < 250 (irrelevant, since I want the LAST failure) nor H > 700
  (where H*M keeps growing against a sup that is flat near 13).
- I did not test s other than 3.0. `theta-ladder.md` sec.5a measured theta as
  nearly insensitive to s over a factor of 200 in D for the crude column; I did
  not check that the sharp column inherits that insensitivity.
- I did not compute the sixth moment or any non-Gaussian tail. The question was
  posed about the Gaussian maximal law and I answered that.
- **A discrepancy in the task, recorded so nobody hunts for it.** The task asked
  me to reproduce attack 8's elementary result "on the same 18 exact levels".
  `attack-block-08-secondmoment.md` sec.4's table has **nine** rows
  (p_n = 13, 19, 23, 31, 47, 71, 97, 199, 401); its sec.6 table has ten, a
  different set. There is no 18-level table in that report. I reproduced all
  nine of sec.4 exactly and extended to twenty-three levels.

**What I suspect but could not prove.**

- That `need_sharp / z^2` converges to a constant near 0.56 rather than drifting.
  Nine points with a range of [0.49, 0.61] and no trend is consistent with a
  constant, and also with a very slow drift either way. Brief Trap 3 applies:
  I am not calling a trend, and I am not calling its absence a proof of one.
- That the law-tightness ratio `sup/(rms sqrt(2 lnW))` at the operative window
  eventually settles above 1. It reads 0.56, 0.73, 0.92, 0.79, 0.85 at
  z = 13..29: rising then wobbling, with no clean trend over five points, and it
  already exceeds 1 transiently at z = 19 (the law fails there for every H up to
  227, by 0.6% at H = 191). If it settles above 1 the sharp law as literally
  stated is false, and the honest hypothesis is
  `sup <= C sqrt(2 lnW <R^2>_H)` with C somewhat above 1 — which sec.2(c) shows
  is still TPC-implying for any C below about 1.4. **So the binary does not turn
  on this**, but the correct statement of the hypothesis does, and I have not
  pinned C.

**Where I think I am most likely wrong.**

- **The strongest objection to the whole report is that S-sharp is a strictly
  stronger hypothesis than S-crude and I have no right to substitute it.** My
  defence is in sec.1: both are the same template applied to members of the same
  family of lattice sawtooth sums, the corpus's justification for one contains
  nothing that fails for the other, and the elementary criterion attack 8 used is
  the H-dependent one, so applying the H-free one on the sieve side is comparing
  two different methods. If an adjudicator rejects that, the report degrades to:
  *the corpus's stated sieve maximal law is not TPC-implying, but a statement of
  the same type about the same lattice is, and the two differ by a factor
  1.5 to 6.7 that is growing.* That weaker form still retires the route, because
  the gap between the legal form and the finishing form is widening, not closing.
- Sec.4's claim against `theta-ladder.md` reading 8 rests on my reading of
  `theta-ladder-sup.js`:18 (`u = 3.2` hardcoded) plus two self-consistent
  measurements. I did not re-derive the published `need_true` values from the
  script's own output; I reproduced `sup|R|` at the published H via
  `fullPeriodArray` (custody, sec.0) and checked that `sup/M` gives the published
  need_true at z = 19 (12.4270 / 0.0395977 = 313.83, published 313.83). That is
  strong but it is one point.
- The `C_crit` scan runs H from z^2 to 4x the crude need. If `<R^2>_H` dips below
  its scanned minimum somewhere past that, `C_crit` is overstated. The bound
  `<R^2>_H <= 4<rho^2>` makes the test automatic past `2C sqrt(2 lnW <rho^2>)/M`,
  which for C = 4 is exactly the scan top, so the scan covers C up to 4 and the
  reported values (all under 2.3) are inside it.

**Calibration of searches.** `grep -rl "maximal law" research/ paper/ TODO.md`
returns 27 files, 8 of them working documents (`paper/PAPERS.md`,
`paper/wall-note.md`, `research/G2-STATE.md`, `research/ZONE-POSTULATE.md`,
`research/sift-limit-attack.md`, `research/sift-limit-lemmaV.js`,
`research/theta-ladder.md`, `TODO.md`), so the pattern is very much live. The
known positive: `grep -rn "sup_y |rho(y)|" research/` returns exactly one
non-report hit, `sift-limit-lemmaV.js`:466, which is the rho form. The absence
claim: `grep -rn "<R^2>_H|sqrt(2 lnW \* <R\^2>)|sqrt(<R\^2>)" research/ paper/`
returns hits only inside this report. **The corpus states the maximal law in
symbols exactly once, and it is the rho form; the sharp form appears nowhere.**
Directory listing taken before writing that: `research/` has 196 entries,
`research/history/staging/` was listed as well.

**Brief trap checks.** Trap 1: every threshold in this report comes from a full
integer scan with the last-failure recorded, never a bisection; `monotone=yes`
is printed for the sharp column at every z, and the exact column's scan range is
stated. Trap 2: the units are stated in sec.1's table and the budget convention
is checked both ways (z^2 and w^2) in sec.2. Trap 3: the flatness of `sh/z^2` is
reported as a band, not a trend. Trap 6: the absence claim is calibrated above.
