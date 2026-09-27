# Attack 8: the second moment over a block, and whether it is allowed to work

<!-- ledger
id: Q-block-secondmoment
status: CLOSED
todo: none
question: Can a second moment over a block bound the empty windows, and is it allowed to work?
verdict: NO, on a tile-independent impossibility: Chebyshev needs dist(E, Z) < E/sqrt(W) and the measured shortfall at H = 204 is a factor 8.41e6, so a second moment gives a density bound that is legal at every H and TPC-relevant nowhere; the TPC line sits at eps = 1/W and at H about w^2, and quantifying over w buys nothing.
-->

Block 1, v = 5 -> 25. Tile T_5 mod 30 (slots 11, 17, 29), folded at every prime in
(5, 25]. Period W = 23# = 223,092,870; 22,309,287 T_5 slots; survivors form T_23.
Everything below is exact enumeration or exact finite formula. No estimates, no fits
except where labelled.

Companion scratch scripts (not committed): `block8.js`, `block8b.js`, `block8c.js`,
`block8d.js`, `block8e.js`, `block8f.js` in the session scratch directory.

---

## 0. Custody

Reproduced before anything was computed:

```
survivors A = 7,952,175            = D_23 exactly                      OK
combined L (longest deleted run)   = 19                                OK
maxsum_20(T_5)                     = 204                               OK
G2(23#) = max survivor gap         = 204                               OK
```

The exact-variance code was separately checked against `paper/variance-note.md` §4,
which it reproduces digit for digit at all six printed levels:

```
  p_n     L      E[N]     Var      note says
   13    289     14.3     2.4      14.3 / 2.4
   19    529     20.7     4.0      20.7 / 4.0
   31   1369     42.5     8.0      42.5 / 8.0
   53   3481     85.4    19.1      85.4 / 19.1
   71   5329    115.2    28.3     115.2 / 28.3
   97  10201    195.3    48.1     195.3 / 48.1
```

At block 1 the Theorem 2 formula and the brute-force walk over all 223,092,870
positions agree to five decimals at every H tested (204 through 5000). Two
independent routes to the same variance.

---

## 1. THE LEGALITY BOUNDARY

This is the deliverable. The brief asked which version of "the window is non-empty"
is TPC-equivalent. Here is the line, stated four ways, because four different axes
were candidates and only two of them are real.

### 1.1 The bridge, and the exact threshold

Let w be the top prime of a block, W = w#, and let a "survivor" be a twin-admissible
residue mod W. The only bridge from the tile to the integers is this:

> If r and r+2 have no prime factor <= w, and r+2 < w^2, then r and r+2 are both
> prime.

So a survivor located inside the integer interval (w, w^2) is a twin pair. There is
exactly one tile position that delivers such a survivor: the head, x = w. Every other
position of Z/W is arithmetically inert.

Consequently:

- **G2(w#) < w'^2 - 2 for infinitely many w implies TPC** (`ZONE-POSTULATE.md` §3,
  the Gap Reformulation; the Ziller-Morack Prop 3.2/3.5 form is h_2(k) < p_k^2 - p_k,
  `covering-dive.md` line 47). Both are exponent 2 **with constant below 1**.
- Exponent 2 with constant above 1 implies nothing. Since w'/w -> 1, no sparse choice
  of w with a large following prime gap rescues a constant above 1.

**Refinement of the brief's Trap 2 statement.** "Exponent exactly 2 is TPC-equivalent"
is the abbreviation. The precise line is:

```
G2(w#) = o( (log w#)^2 )   or  <= (1-eps)(log w#)^2 i.o.   ==>  TPC.
G2(w#) = O( (log w#)^2 )   with an unspecified constant    ==>  nothing. OPEN.
```

`covering-dive.md` line 141 already carries the qualifier ("Reaching exponent 2 **with
the right constant**"); the brief dropped it. The distinction matters here because a
second-moment argument never produces a clean constant, so it is worth knowing that
landing on exponent 2 with constant 1.4 would be legal, publishable, and useless.

### 1.2 Axis A, tile versus integers: REAL, and the line is at H ~ w^2

A pure tile statement "every window of length H in Z/W contains a survivor" is
G2(W) < H. It is TPC-implying exactly when H <= w^2 - w and it holds for infinitely
many w. Above that it is legal, and it is a theorem: G2 << (log q)^{4.2665+eps}
(`paper/beta2-note.md`) is a tile statement at H far above w^2. The open band
(2, 4.2665] is entirely legal territory.

### 1.3 Axis B, all v versus almost all v versus infinitely many v: NOT REAL

No escape here at all. "Infinitely many w" is already fatal, and almost-all and
for-all are subsets of it. Averaged forms are fatal too: if the average of
G2(w#)/w^2 over w <= V tends to 0 then infinitely many terms are below 1. Anyone
hoping to buy legality by weakening the quantifier over w is buying nothing. This
candidate distinction fails, and that is worth recording because it is the one the
brief listed first among the plausible ones.

### 1.4 Axis C, all positions versus almost all positions: REAL, and it is the whole story

Chebyshev bounds the **density** of empty positions. TPC needs **one** distinguished
position, the head. A density bound eps reaches the head only if eps < 1/W, at which
point the count of empty positions is below 1, hence 0, hence Axis A applies again.

So the boundary is:

```
empty-density bound eps >= 1/W   :  LEGAL, says nothing about the head, provably safe.
empty-density bound eps <  1/W   :  identical to the all-positions statement, TPC at H < w^2.
```

**The line is at eps = 1/W = e^{-(1+o(1))w}, not at any rate polynomial in w.** This is
the single most important sentence in this report. It means a second-moment argument
is legal for exactly the same reason it is useless: Chebyshev's bound is Var/E^2, and
Var/E^2 is polynomially small in H while 1/W is exponentially small in w.

### 1.5 Axis D, bound on the count versus bound on the probability: REAL but trivial once separated

Three "count" statements get confused:

- `E[N] >= 1`, a bound on the **mean** count. True for H >= 29 at block 1. Vacuous.
  This is brief Trap 1 in another costume: it is capacity counting.
- `P(N = 0) <= eps`, a bound on the **probability**. Axis C. Legal above 1/W.
- `min_x N(x) >= 1`, a bound on the **minimum**. This is the target, and it is
  Axis A / TPC at H < w^2.

Only the minimum matters, and no moment of N is a bound on its minimum without a
maximal inequality. That is the whole content of §4 below.

### 1.6 What is left standing

The legal-and-reachable set for a second moment at block scale is:

1. Almost-all occupancy at any H. Already done and published in the corpus
   (`paper/variance-note.md` §4). Attack 8 adds nothing there.
2. All-positions occupancy at H above the crossover measured in §3, which at block 1
   is H* = 3,939,961 = W^0.79. That is a legal tile statement. It is also **13 times
   weaker than the already-proven bound**, since (ln 23#)^4.2665 = 3.00e5 at this
   level, and exponentially weaker asymptotically.
3. Lower bounds on G2, which run the safe direction. The second moment certifies
   these for free and they only make the Zone Postulate harder.

Nothing in that list moves the programme. The second moment over a block is allowed
to work, and it is allowed precisely because it cannot.

---

## 2. EXACT MOMENTS AT BLOCK 1

### 2.1 Slot space: K consecutive T_5 slots, all 22,309,287 positions

Slot survival density delta_s = 0.356451329 = prod_{7<=p<=23}(p-2)/p.

```
   K   E[N]      Var      Var/E     Var/E^2      true empty frac   minN   Cheb/true
    1   0.3565   0.2294   0.64355   1.8054e+0    6.4355e-1           0        2.8
    5   1.7823   0.9558   0.53629   3.0090e-1    8.1229e-2           0        3.7
   10   3.5645   1.6031   0.44973   1.2617e-1    4.7161e-3           0       26.8
   14   4.9903   1.8277   0.36625   7.3391e-2    1.7804e-4           0      412.2
   18   6.4161   1.8862   0.29398   4.5820e-2    1.7930e-6           0    25555.1
   19   6.7726   1.9389   0.28628   4.2271e-2    2.6895e-7           0   157172.2
   20   7.1290   1.9374   0.27176   3.8120e-2    0                   1        inf
   32  11.4064   3.2701   0.28669   2.5134e-2    0                   3        inf
   64  22.8129   4.3477   0.19058   8.3540e-3    0                  13        inf
  256  91.2515   8.5816   0.09404   1.0306e-3    0                  78        inf
  512 182.5031  12.8021   0.07015   3.8436e-4    0                 166        inf
```

Smallest K with zero empty slot-windows is **20 = L + 1**, as it must be.

The exceptional set at the critical K is tiny and exactly countable:

```
  K=17: 186 empty slot-positions      Chebyshev allows 1,129,144
  K=18:  40                           Chebyshev allows 1,022,203
  K=19:   6                           Chebyshev allows   943,033
  K=20:   0                           Chebyshev allows   850,437
```

Six empty positions at K = 19 means six maximal deleted runs of length exactly 19.
Chebyshev overstates that by a factor of 157,000, and at K = 20 it permits 850,437
empty positions where there are none.

### 2.2 Integer space: window (x, x+H], all 223,092,870 positions

delta = 3.56451329e-2 = A/W exactly.

```
    H    E[N]      Var(brute)  Var(Thm2)   Var/E    Var/E^2     true empty   minN
   200   7.1290     1.97815     1.97815   0.27748  3.8922e-2      16 pos        0
   201   7.1647     1.98555     1.98555   0.27714  3.8680e-2      12            0
   202   7.2003     1.99040     1.99040   0.27643  3.8392e-2       8            0
   203   7.2360     1.99272     1.99272   0.27539  3.8059e-2       4            0
   204   7.2716     1.99250     1.99250   0.27401  3.7682e-2       0            1
   289  10.3014     3.01875     3.01875   0.29304  2.8447e-2       0            2
   529  18.8563     4.26485     4.26485   0.22618  1.1995e-2       0            8
   841  29.9776     5.20460     5.20460   0.17362  5.7916e-3       0           18
  5000 178.2257    12.39274    12.39274   0.06953  3.9015e-4       0          162
```

The empty count falls by exactly 4 per unit of H from 200 to 204, so T_23 has exactly
**four maximal gaps of length 204 and none longer**, which is where G2 = 204 lives.

Full distribution of N at the critical H = 204, over all W positions:

```
  N =  1 :      1,092      N =  6 : 42,174,000     N = 11 :  2,010,432
  N =  2 :     43,920      N =  7 : 61,873,332     N = 12 :    205,440
  N =  3 :    610,872      N =  8 : 55,046,928     N = 13 :      6,924
  N =  4 :  4,284,006      N =  9 : 29,604,684
  N =  5 : 17,354,244      N = 10 :  9,876,996                total 223,092,870
```

The 1,092 positions with N = 1 alone force `Var >= 1092*(1-E)^2/W = 1.92528e-4`,
which is already 812 times the 2.37015e-7 that Chebyshev would need. Nothing about
the other 223 million positions is required to see that the method fails here.

---

## 3. THE GAP TO WHAT CHEBYSHEV NEEDS

Chebyshev forbids emptiness exactly when `Var/E^2 < 1/W`, equivalently
`Var < E^2/W`, equivalently `sum_x (N(x)-E)^2 < E^2`.

### 3.1 The measured shortfall

```
     H     measured Var    needed Var     shortfall
    204    1.99250e+0     2.37015e-7     8.4066e+6
    289    3.01875e+0     4.75675e-7     6.3462e+6
    529    4.26485e+0     1.59377e-6     2.6759e+6
    841    5.20460e+0     4.02816e-6     1.2921e+6
   1000    5.99311e+0     5.69528e-6     1.0523e+6
  10000    1.70516e+1     5.69528e-4     2.9940e+4
```

In slot space at the critical K = 20: measured Var 1.93739, needed 2.27811e-6,
shortfall 8.5044e5.

**The shortfall is not a constant.** It equals W * Var/E^2 = W * Fano / E. At the
operative window the Fano factor is about 0.27 and E is about 7.3, so the shortfall
is of order W/w, which at block 1 is 2.23e8/23 = 9.7e6 against the measured 8.4e6.
For a general block v -> v^2 with top prime w, that is **e^{(1+o(1))w}**. The gap
grows superexponentially with the block index.

### 3.2 Where Chebyshev does start working, and why it does not help

Bisecting for the first H with Var/E^2 < 1/W:

```
  H* = 3,939,961 = 0.01766 * W = W^0.7900
  at H*:  E = 1.4044e5   Var = 88.215   Var/E^2 = 4.4726e-9   (1/W = 4.4824e-9)
```

So the strongest all-positions statement the second moment can produce at block 1 is
`G2(23#) < 3.94e6`. The truth is 204. `(ln 23#)^2 = 369.5`. The already-proven bound
is of order `(ln 23#)^{4.2665} = 3.00e5`. Chebyshev's legal output is 13 times worse
than a theorem the corpus already has, and 19,000 times worse than the truth.

### 3.3 A tile-independent impossibility, which is the cleanest form of the answer

N(x) is integer-valued, so every position contributes at least `dist(E, Z)^2` to
`sum_x (N-E)^2`. Chebyshev's requirement `sum_x (N-E)^2 < E^2` therefore needs

```
  dist(E, Z)  <  E / sqrt(W).
```

This has nothing to do with the tile. It is a statement about delta*H and W alone.
At block 1:

```
     H      E = delta*H    dist(E,Z)    E/sqrt(W)    verdict
    204        7.2716       0.271607    0.000487     IMPOSSIBLE
    289       10.3014       0.301443    0.000690     IMPOSSIBLE
    529       18.8563       0.143725    0.001262     IMPOSSIBLE
    841       29.9776       0.022443    0.002007     IMPOSSIBLE
   1000       35.6451       0.354867    0.002386     IMPOSSIBLE
 100000     3564.5133       0.486710    0.238648     IMPOSSIBLE
 200000     7129.0266       0.026580    0.477296     possible
```

With a generic fractional part the constraint binds until
`H > sqrt(W)/(4 delta) = 1.05e5`, and it binds in the worst case until
`sqrt(W)/(2 delta) = 2.10e5 = W^0.637`. In general terms:

> **The second moment cannot force a non-empty window shorter than about
> sqrt(W)/(4 delta) = e^{(1/2 + o(1)) w}, for reasons that hold for any tile
> whatsoever. The Gap Reformulation needs w^2.**

That is a rigorous, one-line, measurement-free proof that this attack cannot reach
its target, and it is stronger than the numerical shortfall because it does not
depend on the tile being the one we have.

The same floor applied to higher moments: `M_{2k} >= dist(E,Z)^{2k}`, so
`M_{2k}/E^{2k} < 1/W` needs `dist(E,Z) < E / W^{1/2k}`. At H = 204 that fails for
k = 1 and k = 2 and first becomes possible at k = 3. **The 2nd and 4th moment
methods are dead on arithmetic grounds alone at the operative window; the 6th is the
first that is not.** (Attack 3, `research/attack-03-higher-moments.js`, already
computes M4 at these levels; this explains why it could never have been enough.)

### 3.4 The ceiling on all moment methods

Even a perfect Gaussian lower tail, `P(N=0) ~ exp(-E^2/(2 Var))`, gives at H = 204:

```
  E = 7.2716   Var = 1.99250   E^2/(2 Var) = 13.269   exp(-13.269) = 1.727e-6
  needed: < 1/W = 4.4824e-9.    Short by a factor of 385.
```

The count is simply too small at the operative window. At block 1 the Gaussian tail
first suffices at H around 312 (E^2/2Var crosses ln W = 19.2231 between H = 300, where
it is 18.413, and H = 350, where it is 23.319).

---

## 4. A RED FLAG WORTH MORE THAN THE COMPUTATION: the elementary maximal law is TPC-hard

The corpus records the all-positions exponent under an unproven Gaussian maximal law
as theta = 2.159 to 2.482 across z = 19 to 47 (`research/theta-ladder.md` §2), above
2 and rising, and reads that as "even granting the maximal law this route does not
reach the finish line". That column is computed from the **sieve** mean square, the
vector-sieve sawtooth R.

`MORNING-2026-08-16.md` §2 established that the sieve mean square loses to the
elementary second moment by about 1.4x. The consequence was not drawn. Running the
same conditional on the **elementary** variance, using Theorem 2 of
`paper/variance-note.md` exactly, gives the smallest L with E^2/(2 Var) > ln(p_n#):

```
   p_n   ln(p_n#)   L_need   theta = lnL/ln p_n   L_need/p_n^2
    13     10.310      120        1.8665             0.7101
    19     16.088      191        1.7838             0.5291
    23     19.223      312        1.8316             0.5898
    31     26.024      462        1.7867             0.4807
    47     40.960      985        1.7902             0.4459
    71     61.586     1800        1.7584             0.3571
    97     83.728     2935        1.7453             0.3119
   199    188.564     9744        1.7351             0.2461
   401    376.727    26378        1.6984             0.1640
```

**Every value is below 2, and the column drifts down, not up.** Structurally
L_need ~ 2 F ln(p_n#) / delta ~ c p_n ln^2 p_n, so theta -> 1.

Read against §1, this is an alarm and not a result. A sub-Gaussian maximal law for
the elementary two-class window count, at window length p_n^2, implies TPC. So:

- it cannot be proved by any second-moment or soft-concentration argument;
- the corpus is right to carry it as `[INFERRED heuristic arithmetic]`
  (`research/sift-limit-attack.md` §3, which already states the same conclusion in
  the form `G2 <~ (2F/0.41621) p_n ln^2 p_n` and immediately flags it as "the parity
  wall in concentration clothing, not a route");
- and the theta-ladder's above-2 column is not the general verdict on the maximal-law
  route. It is the verdict on the **sieve** version. The elementary version is below
  2 at every computed level, which is exactly why it is unprovable.

Anyone who later computes the elementary conditional and finds theta < 2 should read
that as a soundness check firing, not as progress. That is the practical value of the
Trap 2 discipline: it tells you in advance which of two nearly identical calculations
is allowed to come out looking good.

---

## 5. THE `elementaryVariance` BUG, DIAGNOSED EXACTLY

`research/sift-limit-lemmaV.js`:427 is bannered WRONG at line 395, "too large by
roughly three orders", with the tell that Var/E^2 printed 0.500 across a decade in
z and H. The banner is correct and the cause is now pinned to one line.

The function does `if (d & 1) continue;` on odd lags. For odd d, J(d) = 0, so the
correct contribution is `2(H-d)(0 - delta^2)`, which is negative. `continue` drops
the `-delta^2` part along with the J part. The omitted mass is

```
  sum_{d odd, 1<=d<H} 2 (H-d) delta^2  =  delta^2 H^2 / 2  =  E^2 / 2   exactly (H even),
                                          delta^2 (H^2-1)/2            (H odd).
```

Hence `Var_buggy/E^2 = 1/2 + Var_true/E^2`, which is the 0.500 signature, digit for
digit. Verified at all three configurations the morning report brute-forced:

```
  z,H          buggy Var/E^2   fixed Var/E^2   morning-report brute force   Var diff = predicted omission
  13, 1315       5.0059e-1       5.8840e-4          5.884e-4                2953.0094 = 2953.0094
  19, 3806       5.0024e-1       2.3646e-4          2.365e-4               13789.0546 = 13789.0546
  19, 12360      5.0003e-1       3.2521e-5          3.252e-5              145423.2560 = 145423.2560
```

The one-line fix is to compute the term for every d and set J = 0 when d is odd,
rather than skipping the iteration. Fixed Var reads 3.4751, 6.5212, 9.4586 against
the morning report's brute-force 3.4751, 6.5212, 9.4586. The "three orders" in the
banner is level-dependent: the factor is 851x, 2116x, 15376x at those three points,
growing like H, because the omitted term is quadratic in H while the truth is
sublinear.

**I did not edit the file** (brief rule). This is a report of the cause, not a patch.

---

## 6. DOES THE BLOCK FRAMING CHANGE THE UNIFORMITY-IN-POSITION LIMITATION?

No. It makes the limitation sharper in one way and softer in another, and neither
helps.

**Sharper.** The brief's established fact 1 is that combined L IS the covering
optimum, proven elementarily by CRT: every adversarial per-prime residue choice
occurs somewhere in the tile. So in the block framing the extremal position is not
merely possible, it is guaranteed to exist. An almost-all statement is therefore
provably unable to become an all-positions statement by any argument that does not
locate positions. The exceptional set is not a technical residue, it is a theorem.
Block 1 measures it: exactly 6 empty slot-positions at K = 19, exactly 4 maximal
integer gaps of length 204.

**Softer, but only apparently.** `natal5-variance.js` reading 6 records a second
obstruction: the anchored window is not merely one point but a diverging-z outlier
of the ensemble, z-score marching +1.05, +1.81, +0.28, -4.50, -25.52 at x = 7..19.
That measurement is at **diagonal** scale, L = W. At **zone** scale, L = p'^2, the
anchored window is typical over the whole computable range:

```
  p_n     L      E[N]      sd     N(0,L]    z       N(p_n,L]   z_head    N/E
   13    289     14.29   1.536      16     1.112       16      1.573    1.120
   19    529     20.65   1.988      21     0.175       21      0.558    1.017
   23    841     29.98   2.281      30     0.010       30      0.369    1.001
   31   1369     42.50   2.837      42    -0.177       42      0.164    0.988
   47   2809     71.64   3.998      74     0.591       74      0.903    1.033
   71   5329    115.21   5.320     123     1.464      123      1.765    1.068
   97  10201    195.33   6.938     202     0.961      202      1.234    1.034
  127  17161    294.16   8.675     289    -0.595      289     -0.345    0.982
  199  44521    634.98  13.171     627    -0.606      627     -0.391    0.987
  401 167281   1904.61  23.414    1843    -2.632     1843     -2.439    0.968
```

The ratio wobbles in [0.94, 1.14] with no clear trend and the z-score stays in
[-2.6, +1.8]. So reading 6's outlier mechanism is not visibly operating at zone
scale. **That changes nothing.** E/sd grows like p_n/ln p_n at zone scale, so a
persistent proportional deficit of only about 3 percent would reproduce the
divergence; the range above cannot rule one out. And more importantly, the
1/W counting obstruction of §1.4 is independent of whether the head is typical.
Being an average member of the ensemble does not help when the bound has to beat
1/W and it is 8.4e6 short.

At block 1 the head windows are comfortable in any case: (25, 625] holds 24
survivors against E = 21.39, and (23, 841] holds 30 against E = 29.16. The first
survivors above 25 are 29, 41, 59, 71, 101, 107, 137, 149.

---

## 7. DELIVERABLE

**Where the TPC line falls.**

1. The line is at **eps = 1/W** on the empty-density axis, and at **H ~ w^2 with
   constant below 1** on the window-length axis. Nowhere else. Quantifying over w
   (all / almost all / infinitely many / on average) buys nothing.
2. A second-moment argument produces a density bound. It is legal at every H,
   for every quantifier over w, unconditionally, because Var/E^2 is polynomially
   small in H and 1/W is exponentially small in w. The two never meet in the
   region that matters.
3. Only a bound on min_x N(x) is TPC-relevant. A bound on E[N] is Trap 1. A bound
   on P(N = 0) is Axis C and safe.
4. The brief's "exponent exactly 2 is TPC-equivalent" needs the constant attached:
   `o((log q)^2)` is TPC, `O((log q)^2)` is open and legal.

**Exact moments at block 1** are in §2. At the operative window H = 204 = G2(23#):
E = 7.2716, Var = 1.99250, Var/E^2 = 3.7682e-2, true empty positions 0, min N = 1.
In slot space at K = 20 = L+1: E = 7.1290, Var = 1.93739, Var/E^2 = 3.8120e-2.

**The gap to what Chebyshev needs** is a factor of **8.41e6** at H = 204 and
**8.50e5** at K = 20, and it is of order W/w, hence e^{(1+o(1))w} at block v -> v^2.
The first H at which Chebyshev works at all is W^0.79 = 3.94e6, whose conclusion is
13x weaker than an existing theorem. And §3.3 kills it without any measurement: the
integer-valuedness floor makes Chebyshev impossible at every H below about
sqrt(W)/(4 delta) = 1.05e5 = e^{(1/2+o(1))w}, against a target of w^2.

**Anything legal that survives?** Three things, none of which move the programme:
the almost-all corollary already published in `variance-note.md` §4; a vacuous
all-positions bound at W^0.79; and lower bounds on G2, which run the wrong way.
The one genuinely new item is §4's alarm and §5's bug diagnosis.

**Trap 1 check.** This attack did not reduce to capacity counting at any point.
Trap 2 fires on the all-positions branch and is the reason §1 is the deliverable.

---

## 8. COVERAGE

**What I did not reach.**

- Only block 1 was enumerated. Everything at v > 5 in §4 and §6 comes from the exact
  Theorem 2 formula and short-interval sieving, not from a full-period walk. The
  formula was validated against a full-period walk at block 1 and against
  `variance-note.md` §4 at six levels, so I trust it, but no second block has been
  enumerated end to end.
- I did not compute the sixth moment at block 1. §3.3 shows k = 3 is the first order
  the arithmetic floor does not kill, and §3.4 shows a perfect Gaussian tail is still
  385x short at H = 204, so I believe the sixth moment cannot close it either, but I
  did not compute M6 and the belief rests on the Gaussian reference, not on the true
  M6.
- I did not check whether the H* = W^0.79 crossover is the same exponent at other
  blocks. The local exponent of Var/E^2 in H at block 1 wanders between -1.42 and
  -2.28 over the range H = 5e2 to 3e7 (the corpus's H^{-1.7} sits inside that), so
  W^0.79 is one measurement, not a law.
- I did not read `paper/beta2-note.md`, so the 4.2665 comparison in §1.6 and §3.2 is
  taken from the brief and from `ZONE-POSTULATE.md` §3 without checking the implied
  constant. If that constant is large, the "13x weaker" claim in §3.2 could go either
  way at this small level. The asymptotic statement is unaffected.

**What I suspect but could not prove.**

- That the elementary conditional theta of §4 tends to exactly 1, not merely below 2.
  The derivation L_need ~ 2 F ln(p_n#)/delta gives 1 + 2 lnln p_n/ln p_n, which at
  p_n = 401 predicts 1.598 against a measured 1.698, so the Fano drift is doing
  something the formula does not capture over this range.
- That the mild negative drift in the anchored z-scores of §6 at p_n = 127, 199, 401
  is the beginning of reading 6's mechanism at zone scale, and that the column would
  cross -5 somewhere in the low thousands. Three points is not a trend and I am
  explicitly not claiming it.

**Where I think I am wrong.**

- §1.3 asserts that no quantifier over v buys legality. I checked all / almost all /
  infinitely many / average. I did not check quantifiers over a set of v defined by
  arithmetic conditions that could conceivably be finite in disguise, and I do not
  have a proof that no such gadget exists, only the observation that any construction
  producing infinitely many v is fatal.
- §3.3's floor argument assumes the conclusion must come from Chebyshev's inequality
  literally. A cleverer inequality using Var plus one extra piece of information (the
  support of N, say, or its integer-valuedness used positively rather than as a floor)
  is not covered. I believe such an argument would have to be a maximal inequality in
  disguise, and §4 prices those, but that is an assertion.
- The claim in §5 that the fix is one line assumes nothing else in `elementaryVariance`
  is wrong. I checked the odd-d omission accounts for the discrepancy to seven
  significant figures at three configurations, which is strong, but I did not audit
  the rest of the function against an independent derivation.

**Calibration of searches.** Greps for `slot-space|slot window|slotVar` across
`research/` and `paper/` returned only `a3-01-misalignment-ledger.js` and
`a3-08-adjacent-pairs.js`, neither of which computes a slot-indexed variance; the same
grep for `variance` returns 25+ files, so the pattern is live and the narrow result is
a real absence, not a dead pattern. A grep for `Q5.4` in `covering-dive.md` returned
nothing and the brief's citation is off by a label: the content is at
`covering-dive.md` lines 47, 141 and 152 under "Realistic Target 6 / What NOT to
attempt", which `research/history/staging/attack-block-05-exponent.md` line 300 cites
the same way. A grep for `READING 6` in `natal5-variance.js` returned nothing because
the readings block uses bare numbering; the content is at lines 200-240.
