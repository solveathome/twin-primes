# The max-gap law is a diagonal law, and that is why two agents got two constants

<!-- ledger
id: Q-maxgap-law
status: ANSWERED
todo: none
question: Does maxgap ~ c*mbar*lnD survive far enough to contradict Maier-Pomerance, and why did two agents measure two constants?
verdict: It does not, and not because the law breaks late: it was never an extreme-value law but a curve through a two-dimensional surface, and the two agents sat on different curves without recording which; on the diagonal c really is flat over a lever 46 times long with an estimator demonstrably able to see Maier-Pomerance growth, and one repo projection is REFUTED by the audit.
-->

*(Engine `research/maxgap-law.js`, 21 s plain and 147 s with `--big`.
Calibration marked throughout: PROVEN, VERIFIED by exact computation, MEASURED,
INFERRED, REFUTED. Read `research/localized-04-maxsum.md` §4 and
`research/two-class-lower-bounds.md` §6 first; this note reconciles them.)*

## 0. What is hard here, first

The question was whether `maxgap ~ c·mbar·lnD` survives far enough to
contradict Maier and Pomerance. It does not, and the reason is not that the law
breaks late. **The law was never an extreme-value law.** It is an accurate
description of a one-dimensional curve through a two-dimensional surface, and
both agents measured it on different curves without recording which curve they
were on.

That is harder than "the law drifts", because a drift can be fitted and
extrapolated. A surface cannot be extrapolated from one curve to another, and
the whole apparent conflict between `c = 0.9` and `c = 0.46` is exactly such an
extrapolation, performed silently, twice.

The second hard thing: on the curve that matters, the diagonal, `c` really is
flat, over a lever 46 times long, and the estimator that says so is demonstrably
able to see Maier-Pomerance growth when it is present. So the tension is real,
sharper than it looks, and resolved only by an argument that finite data cannot
reach.

## 1. The answer, in five lines

1. **The two constants are the same formula on two different curves.** `c` is a
   surface `c(x, lnD)`. Along a column (fix `x`, grow `lnD`) it falls; along a
   row (fix `lnD`, grow `x`) it rises. A sits at `lnD/theta(x) ~ 1e-2` with
   `x ~ 1e3`. B sits at `lnD/theta(x) = 1` with `x ~ 20`. MEASURED.
2. **Neither agent is meaningfully tighter than the other.** A quoted a range, B
   quoted a coefficient of variation. On matched statistics both spreads are
   near +-20%, A's wider by about a quarter, not by the factor of three the
   raw comparison suggests.
3. **B's flatness is a cancellation, not a law.** The off-diagonal exponents,
   measured on the same objects, predict `c` falls 32% along the diagonal leg
   `p = 101 -> 271`. The exact terms deliver a 2.5% rise. REFUTED as a surface
   law, VERIFIED as a diagonal law.
4. **There is a drift and it is a tenth of what Maier-Pomerance needs.**
   `c1 ~ (log p)^{0.12 +- 0.02}` on the top 47 exact terms. MP needs exponent 1.
   A synthetic ladder built to have exponent 1 returns `0.981 +- 0.006` from the
   identical estimator, so the absence is a measurement and not a resolution
   limit.
5. **The omitted term is a maximum over an index the law does not have.** In
   Ford-Green-Konyagin-Tao's own accounting the law is `y ~ e^gamma·x·T1·r` with
   `T1` the gain from ALIGNING the residue classes and `r` the number of
   survivors one large prime can kill. The law is `T1·r = log x`. Rankin proves
   `T1 = log x·log_3 x/(log_2 x)^2`, slightly less than one log. MP conjecture
   `r = (log x)^{1+o(1)}`, the missing log. Evaluated, `T1·r/log x` reproduces
   the measured `c` at the top of the ladder and doubles it only past
   `x ~ 1e17`.

---

## 2. Custody

Third engine, segmented sieve of the exact period, no tile built in memory.

```
  two-class-lower-bounds.md S6:
   c1  one class,  p in [11,229]  n=46 mean=0.3718 sd=0.0269 cv=7.2%  range [0.3359, 0.4873]  = +-22.5%
   c2  free 2class, p in [11,73]  n=17 mean=0.8511 sd=0.0623 cv=7.3%  range [0.7784, 1.0157]  = +-15.2%
   c2' diff-2 G2,  p in [11,37]   n= 8 mean=0.4814 sd=0.0490 cv=10.2%  range [0.4463, 0.5939]  = +-16.5%
   published: c1 0.3718 sd 0.0269 cv 7.2% | c2 0.8511 0.0623 7.3% | c2' 0.4814 0.0490 10.2%
   MATCH: YES

  exact tiles, both classes, against A048670 and the repo G2 ladder:
    x  mode      period       slots      mbar   max gap  published
     7   1           210          48    4.375       10        10   MATCH  0.0s
    11   1          2310         480    4.813       14        14   MATCH  0.0s
    13   2         30030        1485   20.222       66        66   MATCH  0.0s
    17   2        510510       22275   22.919      108       108   MATCH  0.0s
    19   2       9699690      378675   25.615      150       150   MATCH  0.3s
    23   1     223092870    36495360    6.113       40        40   MATCH  3.6s
    23   2     223092870     7952175   28.054      204       204   MATCH  4.8s
    29   1    6469693230  1021870080    6.331       46        46   MATCH  98.9s
    29   2    6469693230   214708725   30.132      258       258   MATCH 133.9s

  localized-04-maxsum.md S4, Y = 1e7 row, third engine:
   published Y=1e7: R(1) 9.00-11.92, lnD 11.1-11.9, R(1)/lnD 0.756-1.053
   ours:            R(1) 9.46-11.66, lnD 11.0-12.2, R(1)/lnD 0.7803-1.0324
```

VERIFIED: fourteen exact max gaps against A048670 and the repo `G2` ladder,
both agents' summary statistics, and A's `Y = 1e7` scan by an independent
engine. A used a different `x` grid inside the same window, so the ranges agree
rather than the individual entries.

---

## 3. READING 1 (MEASURED). The apparent tightness dispute is a units error

Two numbers are in circulation for the same spread: agent A's `c` spanning
[0.736, 1.170], a spread of plus or minus 23 percent, and agent B's `c` flat to
7 percent.

Those are two different statistics. A reported a **range** over 72
measurements. B reported a **coefficient of variation** over 46. Put both on the
same scale and the difference all but disappears. Two matched conventions, both
given because the choice moves the number by a third:

| | raw | half-range / midpoint | half of (max/min − 1) |
|---|---|---|---|
| A, `R(1)/lnD`, 72 points | `[0.736, 1.170]` | **+-22.8%** | +-29.5% |
| B, `c1`, 46 points | `[0.3359, 0.4873]`, cv 7.2% | **+-18.4%** | +-22.5% |

**The two spreads are the same size**, A's wider than B's by about a quarter on
either convention, not by the factor of three that "23 percent against 7
percent" implies. There was never a tightness disagreement to reconcile, and
neither agent's number should be quoted without saying which statistic it is.
The real disagreement is in the level, `0.9` against `0.46` on the same
twin-slot object, and §4 measures where it comes from.

**The one-class lever is long.** On the 64 exact terms
`lnD = theta(p) - ln m1` runs **6.17 at p = 11 to 286.16 at p = 311**, a factor
46, and `c1` moves by 22% over the whole of it. That is not weak evidence of
flatness. It is the strongest single fact in this note and it is what makes §5
uncomfortable.

---

## 4. READING 2 (MEASURED). c is a surface, and the two agents sat on different curves

Neither agent recorded more than one coordinate. Three matter: the level `x`,
the log gap count `lnD`, and the position `lnD/theta(x)` of the window inside
the period.

```
   source                   object     x     lnD      u      lnD/theta(x)     c
   A localized Y=1e7    twin      89   12.18   3.59       0.1539     0.7803
   A localized Y=1e7    twin     251   11.81   2.92       0.0509     0.8062
   A localized Y=1e7    twin     997   11.29   2.33       0.0118     1.0324
   A localized Y=1e7    twin    2153   11.03   2.10       0.0052     0.8581
   B exact G2 tile      twin      11    4.91   3.23       0.6333     0.5004
   B exact G2 tile      twin      19   12.84   5.46       0.7984     0.4559
   B exact G2 tile      twin      29   19.18   6.71       0.8492     0.4463
   B exact G2 tile      twin      37   26.11   8.21       0.8810     0.5939
   B exact A048670      units     11    6.17   3.23       0.7971     0.4712
   B exact A048670      units    101   86.22  19.14       0.9759     0.3648
   B exact A048670      units    271  252.12  45.42       0.9909     0.3740
```

Both agents even sat at nearly the same `lnD`, near 12, and got 0.78 against
0.456. The uncontrolled variable is `x`, and the controlled experiment is to
move one coordinate at a time.

### 4a. The controlled experiment nobody ran

Cut the `D` gaps of one exact period into blocks of `B` consecutive gaps. Each
block is a window of exactly A's kind, and `c(B) = (block max)/(mbar·ln B)`.
Same object, same `x`, same primes, only `lnD` moves. The head block is reported
separately, because the first gap of a primorial tile is distinguished and would
otherwise contaminate the mean.

`x = 29`, twin slots, the whole period of width 6,469,693,230:

```
   x=29 twin   D=214708725  mbar=30.132  whole-period max=258
     lnD       B    blocks  meanmax  c(mean)   head  c(head)   max  c(max)
     2.08         8 26838589     67.8   1.0827     30   0.4788   258  4.1176
     3.47        32 6709646     94.3   0.9026    150   1.4364   258  2.4705
     4.85       128 1677410    119.8   0.8192    150   1.0260   258  1.7647
     6.24       512  419351    141.4   0.7520    150   0.7980   258  1.3725
     7.62      2048  104837    159.0   0.6922    156   0.6790   258  1.1230
     9.01      8192   26208    175.7   0.6472    180   0.6629   258  0.9502
    10.40     32768    6551    189.8   0.6058    198   0.6320   258  0.8235
    11.78    131072    1637    202.1   0.5692    198   0.5576   258  0.7266
    13.17    524288     408    213.2   0.5373    210   0.5292   258  0.6501
    14.56   2097152     101    223.1   0.5086    228   0.5198   258  0.5882
    15.94   8388608      24    234.5   0.4882    228   0.4746   258  0.5371
    17.33  33554432       5    246.0   0.4711    240   0.4596   258  0.4941
    18.02  67108864       2    249.0   0.4585    258   0.4751   258  0.4751
    19.18 214708725       1      258   0.4463   <-- whole period, B's measurement
```

**`c` falls monotonically from 1.083 to 0.446 as `lnD` runs 2.1 to 19.2 inside
one fixed tile.** VERIFIED, not fitted: the last row is `G2(29#) = 258`, the
exact repo value, so the column terminates on a known number.

`c(head)` tracks `c(mean)` once `B` is past a few hundred, so **A's
single-window measurement is an honest draw and head bias is not the
explanation.** MEASURED.

### 4b. The same statistic in A's own regime

Twin slots of `T_x` inside `[0, 1e8)`, identical block statistic, so the two
tables are directly comparable row by row.

```
     lnD       x=97    x=199    x=401    x=797   x=1601   x=3203   x=6421
     6.24     0.8315   0.8977   0.9233   0.9486   0.9720   0.9924   1.0106
     8.32     0.7978   0.8547   0.8900   0.9045   0.9379   0.9555   0.9759
    10.40     0.7540   0.8230   0.8674   0.8527   0.9366   0.9378   0.9812
    11.09     0.7448   0.8034   0.8570   0.8159   0.9510   0.9437   0.9889

   the same rows from the exact tiles, twin:
     lnD       x=17     x=19     x=23     x=29
     6.24     0.6605   0.7122   0.7403   0.7520
     8.32          -   0.6449   0.6562   0.6687
    10.40          -        -   0.5957   0.6058
    11.09          -        -   0.5768   0.5866
```

Read along a row: at `lnD = 11.09`, `c` runs **0.577 (x = 23), 0.587 (29), 0.745
(97), 0.803 (199), 0.857 (401), 0.951 (1601), 0.989 (6421)**. That is A's whole
range, produced by moving `x` alone. **A's `c ~ 0.9` and B's `c ~ 0.46` for the
same twin-slot object are the same surface read at `x ~ 1e3` and `x ~ 20`.**
MEASURED.

Local exponents, read off the tables:

```
     b(x) = d ln c / d ln lnD at fixed x        (twin object)
       x        13      17      19      23      29      97     401    1601    6421
       b     -0.527  -0.380  -0.356  -0.375  -0.396  -0.233  -0.169  -0.122  -0.121

     a(lnD) = d ln c / d ln ln x at fixed lnD   (twin object)
     lnD      6.24    6.93    7.62    8.32    9.01    9.70   10.40   11.09
       a      0.347   0.377   0.412   0.401   0.430   0.478   0.491   0.528
```

`b` is negative everywhere and shrinks toward zero as `x` grows. `a` is positive
everywhere and sits near 0.4. So the extreme-value law, meaning `c` independent
of `lnD`, is approached only as `x` grows, and **the exact full-period data
lives exactly where it is furthest from holding.**

### 4c. READING 3 (REFUTED). The surface does not survive the diagonal

The off-diagonal exponents are measured. Feed them along the diagonal leg
`p = 101 -> 271`, where `lnD` moves by a factor 2.92 and `ln x` by 1.214:

```
   Over p = 101 -> 271 the diagonal moves lnD by a factor 2.92 and ln x by
   a factor 1.214.  Feeding those into the LOCAL exponents measured
   off the tile (b = -0.430, a ~ 0.4) predicts c changes by
     0.630 * 1.081 = 0.681
   The exact terms change it by 1.025.
```

**A 32% predicted fall against a 2.5% measured rise.** The surface fitted off
the diagonal is REFUTED on the diagonal, and that refutation is the answer.

**The mechanism, INFERRED and elementary.** Off the diagonal, growing `lnD`
means more POSITIONS at a fixed sieving resource `pi(x)`, and `c` falls because
the far tail is sub-exponential (§5). On the diagonal, growing `lnD` means more
PRIMES: `lnD = theta(x) - ln mbar`, so the resource grows in lockstep with the
number of positions and the fall is cancelled.

> **The law `maxgap ~ c·mbar·lnD` is a diagonal law.** Its constancy is a
> cancellation between two effects of opposite sign, not an extreme-value
> statement. Quoting `c` without the coordinates `(x, lnD)` is the error, and
> both source files do it.

---

## 5. READING 4 (MEASURED). What the constant actually is

The extreme-value prediction for `D` iid `Exp(mbar)` gaps is
`mbar·(lnD + gamma)`, that is `c -> 1` from above. Measure the real survival
`S(t) = P(gap > t)` in the exact `x = 23` period:

```
   x=23 units  mbar=6.113  D=36495360
     lam=t/mbar     S(t)       -lnS    mean rate   local rate
          1      5.642e-1     0.572     0.5723       1.6136
          2      1.124e-1     2.186     1.0929       1.9027
          3      1.676e-2     4.089     1.3629       2.2463
          4      1.773e-3     6.335     1.5837       5.2488
          5      9.316e-6    11.584     2.3168       3.1899
          6      3.836e-7    14.774     2.4623            -
   extreme-value solve D*S(t)=1  ->  t* = 40   actual whole-period max 40   ratio 1.000
```

The extreme-value solve is exact at both `x = 23` objects, ratio 1.000. And the
mean tail rate climbs from 0.57 at one mean gap to 2.46 at the extreme. Since
`c = lam/(-ln S)`, which is `1/(mean rate)`:

> **`c` is the reciprocal of the gap tail's exponential rate at the extreme.**
> `c1 = 0.372` says the one-class gap tail decays like `exp(-2.7·g/mbar)`, not
> `exp(-g/mbar)`. MEASURED.

That is the entire content of the constant, and it explains the sign of `b`
without any further theory: a sub-exponential tail cannot supply a constant `c`
as `lnD` grows, because the effective rate keeps rising.

---

## 6. READING 5 (MEASURED, with a control). The drift, and its size

Ford's Montreal slides state both facts one line apart, verbatim (Kevin Ford,
*Large gaps between primes*, Talk 1, CRM Montreal workshop **Probability in
Number Theory**, 2018,
[ford126.web.illinois.edu/montreal_talk1_primegaps.pdf](https://ford126.web.illinois.edu/montreal_talk1_primegaps.pdf),
slide "Proving large gaps: Jacobsthal's function"):

> **Conjecture (Maier-Pomerance, 1990).** `J(T) = T(log T)^{2+o(1)}`.
> Random dart model prediction: `J(T) ~ T·Q_T/phi(Q_T) ~ e^gamma T log T`.

**The law with `c = 1` IS Ford's random-dart prediction**, so MP requires
`c ~ log x/e^gamma`. Over the 64 exact terms `log p` runs 2.40 to 5.74, so a
genuine MP `c` must grow by a factor 2.39 across the ladder.

```
   dataset                     n   beta(vs log p)     beta(vs p)      rms
   c1 one class [11,311]      60   -0.1091 +- 0.0335  -0.0202 +- 0.0084 0.0531
   c1 one class [61,311]      47    0.1221 +- 0.0232   0.0245 +- 0.0047 0.0145
   c1 one class [97,311]      40    0.1185 +- 0.0236   0.0233 +- 0.0046 0.0097
   c1 one class [181,311]     23    0.1994 +- 0.0473   0.0363 +- 0.0087 0.0062
   c2 free 2class [11,73]     17    0.0858 +- 0.0988   0.0308 +- 0.0294 0.0673
   c2' diff-2 G2 [11,37]       8    0.2236 +- 0.2515   0.0844 +- 0.0833 0.0833

   sliding windows of 20 consecutive one-class terms:
   [11,89]=-0.423 [23,107]=0.077 [41,131]=0.267 [59,151]=0.235 [73,173]=0.008
   [97,193]=0.039 [109,223]=0.153 [137,239]=0.200 [157,263]=0.203 [179,281]=0.219
   [197,311]=0.166
```

**There is a drift, it is positive, and it is real.** The whole-ladder fit is
negative only because `p = 11` is a large outlier (`c1 = 0.4712` against a
plateau of 0.366). From `p = 61` upward `beta = 0.12 +- 0.02`, from `p = 181`
upward `0.20 +- 0.05`, and ten of the eleven sliding windows are positive.

**The control, which is the part that makes this a measurement.** Following
`exponent-control.md`'s method, synthesise two ladders on the same `p`, `mbar`,
`lnD` as the real one, rounded to even integers exactly as a real Jacobsthal
value is. LAW has `c` constant, MP has `c` proportional to `log p`. Run the
identical estimator:

```
     synthetic LAW ladder (true beta = 0):  estimator returns -0.0152 +- 0.0083
     synthetic MP  ladder (true beta = 1):  estimator returns 0.9808 +- 0.0063
     REAL A048670  ladder:                  estimator returns -0.1091 +- 0.0335
```

**The estimator recovers 0.981 when the truth is 1.** So MP's growth is not
merely unresolved on this ladder. It is absent by a factor of 5 to 8 in the
exponent, and the estimator is demonstrably able to see it. VERIFIED as an
estimator property, MEASURED as a fact about the ladder.

Term by term against the MP shape:

```
       p    g(p#)    mbar     lnD      c1     MP c    c1/MP
      11      14    4.813     6.2   0.4712   1.346   0.3500
      59     118    7.475    47.0   0.3359   2.289   0.1467
     109     312    8.636   100.2   0.3606   2.634   0.1369
     179     550    9.377   160.0   0.3665   2.913   0.1258
     241     834    9.925   224.3   0.3746   3.079   0.1217
     277     978   10.153   257.7   0.3737   3.158   0.1184
```

`c1/MP` falls monotonically from 0.35 to 0.12. The MP `o(1)` is not merely
negative on this range, it is diverging.

---

## 7. READING 6 (INFERRED, from a PROVEN source). The term the law omits

Ford, Green, Konyagin and Tao, arXiv:1408.4505 §1, verbatim. This is the whole
answer and it was sitting in the source the repo already cites. **Read from the
arXiv:1408.4505v2 PDF (9 Nov 2015, 32 pages), foot of printed page 3 running
onto page 4**, with the sub- and superscripts resolved from glyph bounding boxes
rather than from flattened text (verified 2026-08-18,
`research/history/staging/lit-pdf-fgkt-maier.md` item 1).

> a key to all of them being to take a common value of `a_p` for "large" `p`,
> say `a_p = 0` for `z < p < delta x` ... The numbers in `[y]` surviving this
> first sieving either have all of their prime factors `<= z` (i.e., they are
> "z-smooth") or are of the form `pm` with `p` prime and `m <= y/delta x`. One
> then appeals to bounds for smooth numbers ... to see that there are very few
> numbers of the first kind, say `O(x/log^2 x)`. By the prime number theorem
> there are `~ y log_2 x/log x` unsieved numbers of the second kind. **By
> contrast, if one were to take a random choice for `a_p` for `z < p < delta x`,
> then with high probability, the number of unsifted integers in `[y]` would be
> considerably larger, about `y log z/log x`.**

> Assuming that `V` is a "random" subset of `[y]`, for every prime
> `p in (delta x, x]` there should in fact be a residue class `a (mod p)`
> containing `>> log x/(log_2 x)^{O(1)}` elements of `V`. (Roughly, the
> heuristic predicts that the sizes of the sets `V n (a mod p)` are Poisson
> distributed with parameter `~ |V|/p`.)

Run their own accounting. Survivors after stages 1 and 2 are
`|V| ~ e^{-gamma}·y·log_2 x/(log x·log z)`, and stage 3 kills `r` of them per
prime with `(1-delta)x/log x` primes available, so

>   `y ~ e^gamma · x · T1 · r`,  with  `T1 = log z/log_2 x`.

The law is `y = e^gamma·x·log x`. So **in the law's own units**

>   **`c = T1 · r / log x`.**

- **`T1` is the Rankin term. PROVEN.** It is the gain of an ALIGNED `a_p` over a
  random one. It is capped by the smooth-number step, which needs the `z`-smooth
  survivors to be `O(x/log^2 x)`, forcing `z = x^{c log_3 x/log_2 x}` and
  `T1 = log x·log_3 x/(log_2 x)^2`. That is LESS than one log, which is exactly
  why the best proven bound sits BELOW the random-dart level `e^gamma x log x`
  and does not contradict the law. The best proven bound is FGKMT's eq. (1.2),
  `Y(x) >> x·log x·log_3 x/log_2 x`, a single power of `log_2 x`; against
  `e^gamma x log x` its ratio is `log_3 x/(e^gamma log_2 x) -> 0`, so it sits
  below by a diverging margin. **Confirmed against the source.**
- **`r` is the Maier-Pomerance term. CONJ.** `r = 2` for a positive proportion is
  proved, and it buys their constant `1.31256 e^gamma` and nothing in the
  exponent. `r = (log x)^{1+o(1)}` is the conjecture and is the whole of the
  missing log.

> **Both omitted factors are maxima over an index the law does not have.** The
> law maximises over POSITION. `T1` maximises over the ALIGNMENT of the residue
> classes. `r` maximises over the CLASS chosen for each large prime, and is
> itself an extreme-value statement, over `p` Poisson counts rather than over
> positions. A random-dart model has neither index. That is why it can be off by
> a whole log and still fit everything anyone can compute.

**The Maier-Pomerance statement, pinned to the source.** Checked against
`arXiv:1412.5029` (FGKMT, JAMS 31 (2018) 65-105) on 2026-08-17, so it does not
need re-checking; if it is ever re-checked, check it against that version.

- FGKMT p. 4, verbatim: *"It is conjectured by Maier and Pomerance that in fact
  `Y(x) << x(log x)^{2+o(1)}`."*
- `Y(x) = j(P(x)) - 1` exactly, their **eq. (1.3)**; `Y` itself is their
  **Definition 1**. Their **eq. (1.2)** is a different statement, the proven
  lower bound `Y(x) >> x log x log_3 x/log_2 x`.
- The squared form `x log x log_3 x/(log_2 x)^2` is **Rankin's**, and FGKMT
  print it only to say they improve on it: *"This improves on the bound
  `Y(x) >> x log x log_3 x/(log_2 x)^2` obtained by Rankin."* Their own
  Theorem 1 is `G(X) >> log X log_2 X log_4 X/log_3 X` with an effective
  implied constant; the arbitrary-constant `R` statements belong to the
  earlier Rankin-shape literature and not to FGKMT.
- The equality form `J(T) = T(log T)^{2+o(1)}` is Ford's Montreal slides, §6,
  and the slides are located: Kevin Ford, *Large gaps between primes*, Talk 1,
  CRM Montreal workshop **Probability in Number Theory**, 2018,
  [ford126.web.illinois.edu/montreal_talk1_primegaps.pdf](https://ford126.web.illinois.edu/montreal_talk1_primegaps.pdf).
  The same slide corroborates FGKMT's single `log_2 T` independently:
  *"Lower bound (FGKMT, 2018). `J(T) >> T log T log_3 T/log_2 T`."* The form is
  also in print in A048670's OEIS comment (*"Maier & Pomerance conjecture that
  Max_{n <= x} A048669(n) = log(x)(log log x)^{2+o(1)}"*).

### 7a. The ledger, evaluated

`r` solves `max` over `p` classes of `Poisson(1/log x)`, that is
`r·log(1/lambda) + log r! = log p`.

```
       x       log x     T1      r    c_pred=T1*r/logx   c_pred/c_pred(229)
       1e1.6     3.61    0.547     2          0.3032              0.825
       1e2.4     5.43    0.998     2          0.3674              1.000
       1e3.0     6.91    1.219     2          0.3528              0.960
       1e6.0    13.82    1.934     4          0.5601              1.524
      1e10.0    23.03    2.675     5          0.5810              1.581
      1e20.0    46.05    4.216     8          0.7324              1.994
      1e50.0   115.13    7.960    17          1.1753              3.199
     1e100.0   230.26   13.181    29          1.6601              4.519
    1e1000.0  2302.59   78.627   191          6.5221             17.753
```

Three readings.

1. **`c_pred(229) = 0.3674` against the MEASURED `c1 = 0.3722`.** The ledger's
   own value at the top of the exact ladder, with `r` frozen at MP's PROVEN
   `r = 2` and `T1`'s implicit constant set to 1, lands on the measured
   constant. Do not over-read it: `T1` carries an unfitted `O(1)`. What is not a
   coincidence is the shape.
2. **Why `c` looks flat.** `c_pred/r = T1/log x = log_3 x/(log_2 x)^2`, and that
   function has a stationary point where `log_3 x = 1/2`, that is `log x = 5.200`
   and **`x = 181`**. The exact one-class ladder, `p = 11` to `271`, brackets
   that point, and `r` is frozen at 2 the whole way. **The flatness of `c` over
   the only data anyone has is a property of where the data sits on
   `log_3 x/(log_2 x)^2`.** INFERRED, and it is the most useful line in the note.
3. **Where it breaks.** `c` reaches twice its measured value at `x ~ 1e17` and
   ten times at `x ~ 1e406`. Under MP itself, which is the fast reading, the
   factor 2 arrives at `x ~ 1e5` and the factor 10 at `x ~ 1e24`.

### 7b. The four live extrapolations

```
       x         law    measured drift    ledger      MP
       1e2.4    0.3722         0.3722       0.3722    0.3722
       1e3.0    0.3722         0.3831       0.3574    0.4732
       1e6.0    0.3722         0.4163       0.5674    0.9463
      1e10.0    0.3722         0.4426       0.5886    1.5772
      1e20.0    0.3722         0.4810       0.7420    3.1545
     1e100.0    0.3722         0.5835       1.6819   15.7723
    1e1000.0    0.3722         0.7692       6.6076  157.7229
```

All four agree to within 20% over the entire exact ladder, which is exactly why
the ladder cannot decide between them. **The law is not wrong in our range and
it is not right asymptotically. Its failure is not observable, only derivable.**

---

## 8. READING 7 (REFUTED). One repo projection is wrong, and it is not the one anyone worried about

`FOLD-PROFILE.md` §12 projects

> localized: `M(x, x'^2) ~ 1.2·x·ln x` against `x^2`, **margin `~ x/(1.2 ln x)`**

The law says `M(x, x^2) = c·mbar·ln(x^2/mbar) ~ 4.8·c·ln^3 x`, which is polylog,
not linear in `x`. Measured directly:

```
        x      M(x,x^2)   mbar    lnD    c      4.8 ln^3x   1.2 x ln x   ratio
       211       498     71.1   6.44  1.087        736         1355     2.7
       401       630     89.9   7.49  0.936       1034         2884     4.6
       797       924    114.2   8.62  0.938       1431         6390     6.9
      1601      1452    140.4   9.81  1.054       1928        14175     9.8
      3203      1722    170.3  11.01  0.919       2524        31025    18.0
      6421      2832    204.2  12.22  1.135       3235        67554    23.9
      9973      2868    227.1  12.99  0.972       3747       110193    38.4
```

`M(x,x^2)/ln^3 x` sits between 2.9 and 4.2 over a 47-fold range in `x` (the "flat at 3.2 to 3.7" that stood here was narrower than either engine that measured it; `history/staging/audit-cross-document-constants.md` A6), and `c` is
flat at 0.92 to 1.14 with no trend. **`FOLD-PROFILE`'s projection is a factor 38
high at `x = 9973` and the error grows like `x/ln^2 x`.** REFUTED.

This is an internal contradiction the repo already contained.
`LOCALIZED-GAP.md` §5 records `M/(k ln^3 x)` flat in 1.2 to 1.6, which at
`k = 2` is `M ~ 2.4` to `3.2 ln^3 x`, and the measurement above settles it in
`LOCALIZED-GAP`'s favour. It errs in the safe direction for the Zone Postulate:
**the true localized margin is `x^2/(4.2 ln^3 x)` at this engine's worst case, `x^2/(4.4 ln^3 x)` across both engines that measured it (3.5 is the midpoint, not a bound), not `x/(1.2 ln x)`.**

---

## 9. Which repo extrapolations inherit the error

The rule from §4: an ON-DIAGONAL use of the law (window = the whole tile `x#`)
is safe, for the cancellation reason. An OFF-DIAGONAL use (window `x^k` at fixed
`k`) needs the off-diagonal `c`, which is 0.85 to 1.05 and itself moves with `x`.

| use | curve | verdict |
|---|---|---|
| `two-class-lower-bounds.md` §6, `G2(41#)` | diagonal, one step | **SAFE**. Band 476 to 633; 513 at the full-sample mean `c2' = 0.4814`, 488 if the `x = 37` term is an outlier and 633 if it is a level shift. Ledger drift over `37 -> 41` is 4%. |
| `two-class-lower-bounds.md` §8, measured law `≈ 1.2 x ln^2 x` | diagonal | **SAFE as a description of `x <= 41`.** Must not be quoted as an asymptotic: with the ledger's drift it is 3x larger by `x = 1e50`. The `≈` is the target's own symbol and carries the distinction: this is a measured approximation, not an asymptotic `~`. |
| `two-class-lower-bounds.md` §6 caveat, "`c1` should eventually grow like `ln x` and does not" | diagonal | **CORRECT, now quantified**: it grows like `(ln x)^{0.12}` on the top 47 terms against MP's 1. |
| `localized-04-maxsum.md` §4, `M(x,Y) ~ mbar·ln(Y/mbar)` | off diagonal | **SAFE in its own window.** The constant 0.74 to 1.17 is specific to `lnD ~ 11-16` and `x ~ 1e3`. Carrying it to the full tile gives 0.46 for the same object. |
| `FOLD-PROFILE.md` §12, localized `M(x,x'^2) ~ 1.2 x ln x` | off diagonal | **REFUTED**, §8. |
| `exponent-control.md` §6 margin extrapolations | neither | **UNAFFECTED**. Those are power-law fits, not uses of this law. |
| any use of `c` as a universal constant | both | **There is no such constant.** Report `c` with `(x, lnD)` attached or do not report it. |

The band 476 to 633 that `two-class-lower-bounds.md` §6 predicts for `G2(41#)`
is confirmed here from the diagonal, and the ledger's drift over the single step
`37 -> 41` is 4%, well inside the band's own width. The prediction stands as a
real test.

---

## 10. What survives, and what does not

**Does the law contradict Maier-Pomerance?** No. It is Ford's own random-dart
prediction, which he prints one line below the MP conjecture without flagging a
conflict, because there is none: the truth is expected to exceed the random-dart
level by the correlation factor `T1·r`, and no computable `x` can show it.

**Where does it break?** It does not break at an `x`. It breaks off the
diagonal, immediately, and that is measurable today: `c` runs from 0.45 to 1.09
across the surface we can reach. Along the diagonal it is stable to 22% over a
41-fold range in `lnD` and drifts upward at `(log p)^{0.12}`, and the ledger
says that drift accelerates to double the constant only past `x ~ 1e17`.

**What is the omitted term?** `T1·r/log x`, with `T1` the alignment gain that
Rankin proves and `r` the multi-kill count that MP conjecture. Both are maxima
over indices the law does not carry.

**The uncomfortable residue.** `c_pred = T1·r/log x` reproduces the measured
`c1` at `x = 229` to 1.3% with nothing fitted, and it predicts flatness across
exactly the range where flatness is observed, for a reason (`log_3 x/(log_2 x)^2`
is stationary at `x = 181`) that has nothing to do with extreme-value theory. If
that is a coincidence it is a good one. If it is not, then the constant this
repo has been quoting as a Poisson constant is really a smooth-number constant
wearing a disguise, and the right way to extrapolate it is the ledger, not the
law.

---

## 11. Reproduction

```
node --max-old-space-size=6144 research/maxgap-law.js          # 21 s, tiles to x = 23
node --max-old-space-size=8192 research/maxgap-law.js --big    # 147 s, adds x = 29
```

Section 1 is custody against A048670, the repo `G2` ladder, both agents'
summary statistics and A's `Y = 1e7` scan. Sections 3 and 4 are the block
statistic, on exact periods and on localized windows respectively. Section 5 is
the gap tail. Section 6 is the drift with its synthetic control. Section 7 is
the FGKMT ledger. Section 8 is the affected-extrapolation audit.

Engine note. The exact periods are swept by a segmented sieve with `O(1)`
memory, 16.7M per segment, so `29# = 6,469,693,230` is walked without ever
building a tile: 99 s for the units pass and 35 s for the twin pass. The block
maxima for all 27 block sizes are accumulated in one pass, and the head block is
excluded from every mean, because the first gap of a primorial tile is a
distinguished object and dominates the mean at large block size.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
