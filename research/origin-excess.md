# The origin's advantage: exactly how far it reaches, and why nothing extends it

<!-- ledger
id: Q-origin-excess
status: ANSWERED
todo: none
question: Can the Origin Excess Lemma be pushed to S = x'^2, and is the scale collision genuine or an artifact of that one argument?
verdict: It cannot, and the collision is genuine: the origin's excess is exactly a ratio of two values of the survival curve rho at the same window and two sieving levels, and the Zone Postulate asks for that ratio at u = 2, where rho takes its minimum, so no better lemma moves the boundary; three candidate mechanisms fail, each for a different reason, one of them working against us.
-->

*(2026-08-17. Question from Chris: can the Origin Excess Lemma, or anything like
it, be pushed to S = x′², and if not, is the scale collision a genuine theorem or
an artifact of that particular argument? His doubt, recorded before the work: "I
expect the answer is no, and that the collision is genuine rather than an
artifact. A clean statement of WHY is what I am actually buying here." The doubt
is correct. Below is the WHY, and it is sharper than the collision he stated.
Code `research/origin-excess.js`, 13 seconds, all output real and pasted.)*

---

## 0. The hard part first

**The collision is not an artifact, and the reason it is not an artifact has
nothing to do with the Maier matrix.** Read as a clash of two inequalities,
S ≤ y′² against S = x′², the obstruction looks like a bookkeeping accident of
one lemma, which invites the thought that a better lemma would move the
boundary.

It would not, and here is why in one sentence. The origin's excess over the
matrix ensemble is **exactly** a ratio of two values of the survival curve ρ,
taken at the same window and two sieving levels; the Zone Postulate asks for that
ratio at S = x′², which is the point u = 2 where ρ takes its **minimum**. The
origin is not merely undistinguished at the zone's width. It sits at the worst
point of the only curve in the problem, and against the full ensemble of all x#
translates it is **below** the mean by a factor tending to e^{2γ}/4 = 0.79305.
Measured, after stripping the finite-size Hardy-Littlewood factor: **0.79303 at
x = 1487**.

So the answer to "can it be pushed to S = x′²" is worse than no. Pushing it
there lands on the one width where the origin is worst.

**Stated with the right hedges.** Two of the three legs are proven outright: the
Survival Quotient Identity (§2) and the parameter collision (§6c). The third, that
ρ attains its minimum exactly at u = 2, is INFERRED from the squared-Buchstab form
(e^γω(u))² and is not proven here; the measured trough at [0, 1.2·10⁸) sits at
u = 2.0903 with the offset explained by the window's finite-size factor. But the
operative fact needs no such inference: **ρ(2) < 1, measured directly at eighteen
levels, and landing on e^{2γ}/4 = 0.79305 to four digits.** Whether u = 2 is the exact argmin only
affects whether SOME y might still help, and §5's finite-size table answers that
empirically: the band of y that helps shrinks monotonically toward y = x across
nine levels.

**Three things also came back that were not asked for and change the ledger.**

1. The lemma's **corollary carries a positivity threshold**, and that threshold
   is the binding constraint on the whole advantage. The guaranteed lower bound
   D_y(y′²) − 2(π(x) − π(y) + 1) is positive only for x below a threshold x\*,
   and ln x\*/ln y ≈ 1.44 across every level computed. So the advertised factor
   (ln x / ln y)² is **capped at about 2.2**, not merely small. The largest ratio
   in the 14-cell table is 1.372, and no choice of (y,x) can push it past about
   2.2. The lemma has one hypothesis and travels with three companion statements
   of three different logical types; they are enumerated in `maier-matrix.md` §4a
   and derived in §6 here.
2. Above y′² the advantage does not decay to nothing. It **reverses**. The origin
   goes to a deficit with a trough at S ≈ 3.5 y′², and only then relaxes back to
   1. Per prime, the origin's loss runs at 5% of fair share below the threshold,
   **125% of fair share** at eight times the threshold, and back to 100% at a
   hundred times. That overshoot is FOLD-PROFILE §5's shoulder, measured in the
   loss ledger and in a scale-free variable for the first time.
3. At S = x′², the residue class a_q = 0 that the origin occupies is the **worst
   of the q available classes** at the smallest prime q = y′ (rank 17 of 17 at
   y = 13, x = 23). The origin's choice is not merely non-optimal at the zone
   width; it is coordinate-wise the worst choice at the coordinate carrying the
   most weight.

---

## 1. Custody, first

Everything below is computed by an engine written from scratch for this file, not
by reusing `maier-matrix.js`. The slot sets are built by marking n ≡ 0 and
n ≡ −2 (mod p) walking forward, where `maier-matrix.js` marks offsets 0 and
W − 2; different indexing, same object. The three published censuses and the two
published tables come back digit for digit.

```
   y   x     S=y'^2   D_y(S)   L(pred)  origin(pred)  origin(true)  ok   mean       ratio
   7  11      121        8        1             7             7   YES      6.545  1.069
   7  13      121        8        1             7             7   YES      5.538  1.264
   7  17      121        8        2             6             6   YES      4.887  1.228
   7  19      121        8        2             6             6   YES      4.372  1.372
  11  13      169       10        1             9             9   YES      8.462  1.064
  11  17      169       10        2             8             8   YES      7.466  1.072
  11  19      169       10        2             8             8   YES      6.680  1.198
  11  23      169       10        2             8             8   YES      6.099  1.312
  13  17      289       16        1            15            15   YES     14.118  1.063
  13  19      289       16        1            15            15   YES     12.632  1.188
  13  23      289       16        1            15            15   YES     11.533  1.301
  17  19      361       18        1            17            17   YES     16.105  1.056
  17  23      361       18        1            17            17   YES     14.705  1.156
  19  23      529       21        0            21            21   YES     19.174  1.095

  lemma verified 14 of 14
  census custody: D_13=1485 D_19=378675 D_23=7952175 (GLOSSARY: 1485 / 378675 / 7952175)
```

The two rank measurements Chris quoted are also exact:

```
  y=13 x=23  M=7429 rows   y'^2=289  x'^2=841
       S   mean     origin  min max   origin rank (1=largest)  origin>=mean?
     169     6.487       8    3    9      163 / 7429          yes
     289    11.533      15    7   15        1 / 7429          yes
     361    13.696      17    9   17        1 / 7429          yes
    1000    33.879      32   28   40     5752 / 7429          NO
    5000   177.323     177  168  189     3522 / 7429          NO
   30030  1070.423    1075 1055 1087     1036 / 7429          yes
```

and the S = x′² table, including the two rows where the origin is genuinely
below the mean:

```
   y   x       S    mean     origin   min  max   rank / M        origin>=mean?
  11  17     361    15.679      18    12   19       3 /    221      yes
  13  17     361    16.765      18    15   18       1 /     17      yes
  13  19     529    21.316      21    19   24     135 /    323      NO
  13  23     841    29.554      30    24   36    2254 /   7429      yes
  17  19     529    20.579      21    19   22       2 /     19      yes
  17  23     841    27.776      30    24   32      16 /    437      yes
  19  23     841    27.391      30    25   30       1 /     23      yes
```

Custody is clean: every inherited number above reproduces on an independent engine.

---

## 2. The Survival Quotient Identity, and why it settles the question

This is the whole file in three lines, so it goes first.

Write δ_z = D_z/z# for the twin-slot density of T_z, and

> **ρ_z(S) := (D_z(S)/S) / δ_z**,

the local-to-global density ratio of level z in the window [0,S). Then for every
y < x and every S ≤ y#:

> **Survival Quotient Identity (PROVEN, VERIFIED 39/39).**
>
>   **origin(S) / mean(S) = ρ_x(S) / ρ_y(S).**

*Proof.* mean(S) = D_y(S)·∏_{y<q≤x}(1 − 2/q) = D_y(S)·(δ_x/δ_y) =
S·δ_y·ρ_y(S)·(δ_x/δ_y) = S·δ_x·ρ_y(S), and origin(S) = D_x(S) = S·δ_x·ρ_x(S). ∎

It is a one-line rewriting and it has no error term. What it buys is the right
frame: **the origin's excess over the matrix ensemble is not a property of the
origin at all. It is the same survival curve read at two levels.** Verified
exactly across five (y,x) and eight widths:

```
   y   x        S    origin   mean       origin/mean   rho_x/rho_y   u_x=lnS/lnx  u_y=lnS/lny  match
  13  23      289       15     11.533      1.300595      1.300595       1.807       2.209   YES
  13  23      529       21     19.462      1.079012      1.079012       2.000       2.445   YES
  13  23      841       30     29.554      1.015099      1.015099       2.148       2.626   YES
  13  23     2310       81     82.174      0.985714      0.985714       2.470       3.020   YES
  13  23    30030     1075   1070.423      1.004276      1.004276       3.288       4.020   YES
  ...
  identity holds in 39 of 39 cells
```

Now add the one measured input, which is the repo's own Unification Law
(`FOLD-PROFILE.md` §9a): **ρ_z(S) depends on u = ln S / ln z and on nothing
else**, so there is a single function ρ(u). Re-measured here in a fresh window
[0, 1.2·10⁸) across fifteen levels:

```
        u  z=  43 z=  61 z=  89 z= 127 z= 181 z= 257 z= 367 z= 521 z= 739 z=1049 z=1487 z=2111 z=2999 z=4253 z=6037     spread
     2.30   0.9832  0.9551  0.9316  0.9256  0.9266  0.9205  0.9189  0.9216  0.9218  0.9178  0.9161  0.9146  0.9127     -       -     0.0705
     2.60   0.9932  0.9777  0.9765  0.9778  0.9781  0.9809  0.9854  0.9845  0.9852  0.9868     -       -       -       -       -     0.0167
     3.00   1.0040  1.0088  1.0070  1.0088  1.0105  1.0106  1.0121     -       -       -       -       -       -       -       -     0.0081
     3.50   1.0019  1.0008  1.0012  1.0007  1.0004     -       -       -       -       -       -       -       -       -       -     0.0015
     4.00   0.9994  0.9995  0.9995     -       -       -       -       -       -       -       -       -       -       -       -     0.0002
```

The collapse is four decimals from u = 3 upward. Below u ≈ 2.3 the columns still
drift monotonically with z, and that drift is the finite-size Hardy-Littlewood
factor of the window itself rather than a failure of the law; §6 strips it and
the residue is flat.

**With the identity and the collapse together, the whole question becomes one
question about the shape of a single curve:**

> origin/mean at width S = **ρ(ln S / ln x) / ρ(ln S / ln y)**.

---

## 3. The crossover, measured

Fine scan of the intermediate range at seven pairs. The (13,23) scan, which is
the pair `maier-matrix.md` measured at six widths, at forty:

```
  y=13 x=23   M=7429 rows   y'^2=289   x'^2=841   y#=30030
        S    S/y'^2   origin      mean    origin/mean    rank/M          min  max   note
      200     0.69       11       8.65       1.2717        1/   7429     5   11   
      257     0.89       13      10.09       1.2882        1/   7429     6   13   
      289     1.00       15      11.53       1.3006        1/   7429     7   15   <- y'^2  (Origin Excess Lemma stops here)
      330     1.14       16      12.25       1.3057        1/   7429     8   16   
      361     1.25       17      13.70       1.2413        1/   7429     9   17   
      374     1.29       17      13.70       1.2413        1/   7429     9   17   
      424     1.47       18      15.14       1.1891        8/   7429    11   19   
      481     1.66       20      17.30       1.1561       18/   7429    14   21   
      529     1.83       21      19.46       1.0790      392/   7429    15   23   
      618     2.14       24      22.35       1.0740      504/   7429    17   27   
      700     2.42       26      24.51       1.0609      573/   7429    18   30   
      794     2.75       26      25.95       1.0019     2772/   7429    20   32   
      841     2.91       30      29.55       1.0151     2254/   7429    24   36   <- x'^2  (what the Zone Postulate asks for)
      899     3.11       32      31.72       1.0089     2468/   7429    25   38   
     1020     3.53       33      35.32       0.9343     6173/   7429    29   41   
     1156     4.00       38      40.37       0.9414     6325/   7429    34   46   
     1310     4.53       44      46.13       0.9538     6085/   7429    39   52   
     1683     5.82       55      58.39       0.9420     6877/   7429    52   65   
     2451     8.48       85      86.50       0.9827     4970/   7429    78   95   
     4585    15.87      160     163.63       0.9778     6410/   7429   154  175   
     9724    33.65      348     347.44       1.0016     2814/   7429   335  362   
    30030   103.91     1075    1070.42       1.0043     1036/   7429  1055 1087   
```

**Two readings, and the second is new.**

The rank collapses far earlier than the mean does. The origin is rank 1 of 7429
up to S = 374 = 1.29 y′², is 392nd by S = 529, and 2254th at the zone width. The
mean comparison is much more forgiving because the ensemble's window counts are sub-Poisson;
`maier-matrix.md` §7 already noted that small measured dispersion is not a bound,
and here it also means "above the mean" is a weak test.

**The advantage does not decay into nothing, it reverses.** The ratio goes
1.3057 at 1.14 y′², through 1.0 near 2.9 y′², down to a trough of **0.9343 at
3.53 y′²**, and only then climbs back to 1.0043 at the full period. The origin
pays back what it gained, and it overpays first.

Crossover summary over the seven exactly-enumerated pairs:

```
   y/x      y'^2     x'^2    first crossing   / y'^2   / x'^2
  13/23       289      841           1020     3.53   1.213
  13/19       289      529            529     1.83   1.000
  13/17       289      361            529     1.83   1.465
  11/23       169      841            712     4.21   0.847
  11/19       169      529            529     3.13   1.000
  11/17       169      361            530     3.14   1.468
  17/23       361      841           1262     3.50   1.501
```

That table on its own does not name the law, because at these levels y′² and x′²
are within a factor of five of each other. The law appears at scale, in §5.

---

## 4. The per-prime anatomy: the threshold is S = q·y′, and the smallest prime binds

The M rows are not a vague ensemble. They are exactly a set of residue vectors:

> **Row bijection (PROVEN).** M = x#/y# = ∏_{y<q≤x} q. Row r is the window at
> r·y#, and a slot s is killed by q exactly when s ≡ a_q or a_q − 2 (mod q) with
> a_q = −r·y# mod q. Since y# is invertible mod q, the map r ↦ (a_q)_q is a
> **bijection** onto ∏_{y<q≤x} Z/q, by CRT. **The origin is the all-zero
> vector**, and every other vector occurs exactly once.

So the origin has exactly one distinguishing feature: it takes the class 0 at
every prime simultaneously. Its whole advantage must live in the fact that the
y-rough multiples of q are depleted at small heights. That is a statement about
one prime at a time, and it has a sharp threshold:

> **Per-prime threshold (PROVEN).** Put λ_q(S) = #{T_y slots t < S with q | t or
> q | t+2}, the origin's loss to q; the ensemble's fair loss is 2·D_y(S)/q. If
> **S ≤ q·y′** then a y-rough multiple of q below S is q·k with k y-rough and
> k < y′, hence k = 1, hence λ_q(S) ≤ 2 whatever S is. The Origin Excess Lemma is
> this bound applied to every q at once; since the smallest q is y′, the binding
> case is **S ≤ y′²**.

Measured in the scale-free variable v = S/(q·y′), pooled over six levels
y ∈ {29, 61, 127, 251, 401, 641} and twenty-five primes q each, keeping only
cells where the fair share is at least 4 so the ratio is not quantisation noise:

```
       v = S/(q*y')     cells   mean lambda_q/fair_q    median    max     (cells with fair share >= 4)
            0.50        50              0.0485    0.0000  0.2089
            0.75        75              0.0439    0.0000  0.2025
            1.00       100              0.0754    0.0000  0.4742
            1.50       125              0.6352    0.6299  1.2539
            2.00       142              0.9049    0.8807  1.5000
            3.00       150              1.1068    1.1259  1.6803
            5.00       150              1.2240    1.2240  1.6063
            8.00       150              1.2472    1.2609  1.5372
           15.00       150              1.2269    1.2396  1.4253
           30.00       125              1.1348    1.1521  1.3017
          100.00        85              1.0041    1.0015  1.1064
```

**This is the crossover law in its cleanest form.** Below the threshold the
origin loses 4 to 8 percent of its fair share. It is at 64% by v = 1.5, at 90% by
v = 2, and **overshoots to 125% at v = 8** before relaxing to 100% by v = 100. The
overshoot is FOLD-PROFILE §5's shoulder, and it is why the aggregate ratio dips
below 1 rather than approaching it.

**No reweighting avoids the binding prime.** The loss sum is weighted by 1/q, so
the smallest prime in (y,x] carries the largest weight, and its threshold is
q·y′ = y′². There is no choice of y, and no choice of which primes to fold in,
that removes the term with the largest weight and the earliest threshold.

**And at the zone's width the origin's class is not even locally good.** Mean row
count conditioned on a_q = a, over every a mod q, at S = x′²:

```
  y=13 x=23 S=841  q=17:  a=0 ratio 0.9398   best a=15 ratio 1.0780   rank of a=0: 17 of 17
  y=13 x=23 S=841  q=19:  a=0 ratio 0.9813   best a=3 ratio 1.0359   rank of a=0: 10 of 19
  y=13 x=23 S=841  q=23:  a=0 ratio 1.0151   best a=7 ratio 1.0418   rank of a=0: 6 of 23

  y=11 x=23 S=841  q=13:  a=0 ratio 0.9691   best a=10 ratio 1.0636   rank of a=0: 11 of 13
  y=11 x=23 S=841  q=17:  a=0 ratio 0.9520   best a=8 ratio 1.0427   rank of a=0: 16 of 17
  y=11 x=23 S=841  q=19:  a=0 ratio 1.0059   best a=1 ratio 1.0282   rank of a=0: 5 of 19
  y=11 x=23 S=841  q=23:  a=0 ratio 1.0295   best a=2 ratio 1.0514   rank of a=0: 2 of 23
```

At the smallest prime, the one that matters, **a = 0 is the worst class of the
q**. The origin at the zone width is not a lucky row that we cannot certify; it
is an actively poor row.

---

## 5. The crossover law at scale, and the ceiling

One incremental sieve of [0, 1.2·10⁸) with snapshots at eighteen levels gives
ρ_z(S) for every level and every width at once, hence origin/mean for every
(y,x) pair by the identity. Only pairs with y′² > x appear; below that the lemma
is vacuous for the reason in §7 G4. u_x and u_y are the two survival arguments at
the crossing.

```
      y      x       y'^2       x'^2      crossing S     /y'^2   /x'^2     u_x     u_y   origin/mean at x'^2
     13     29        289        961             983     3.40  1.023   2.046   2.686     0.9718  (S=983)
     13    127        289      17161           16414    56.80  0.956   2.004   3.784     0.9936  (S=16414)
     13    257        289      69169           63408   219.40  0.917   1.993   4.311     0.9635  (S=70967)
     29    367        961     139129          111352   115.87  0.800   1.968   3.451     0.9642  (S=139483)
     43   1487       2209    2217121         1484745   672.13  0.670   1.945   3.778     0.9361  (S=2329678)
     61   2999       4489    9006001         5124753  1141.62  0.569   1.930   3.758     0.9249  (S=8999699)
     89   6037       9409   36517849        17688624  1879.97  0.484   1.917   3.718     0.9126  (S=34766432)
    127   6037      17161   36517849        17688624  1030.75  0.484   1.917   3.445     0.9121  (S=34766432)
    257   6037      69169   36517849        15804583   228.49  0.433   1.904   2.987     0.9045  (S=34766432)
    739   2111     552049    4464769         5124753     9.28  1.148   2.018   2.339     1.0046  (S=4578908)
   1049   2999    1104601    9006001        10072540     9.12  1.118   2.014   2.318     1.0074  (S=8999699)
   2111   6037    4464769   36517849        38910887     8.72  1.066   2.008   2.283     1.0080  (S=34766432)
   4253   6037   18139081   36517849        61054148     3.37  1.672   2.059   2.146     1.0460  (S=34766432)
```

*(the full 127-row table is in the run log; these are the rows that span the range)*

**The crossover law.** In the S/y′² column the crossing wanders over three orders
of magnitude, from 3.4 to 1880, so y′² is the wrong variable. In the **u_x**
column it does not move. Over the 127 pairs in the table:

```
  u_x at the crossing:  n=127  min=1.012  p05=1.916  median=1.993  p95=2.149  max=2.224
  in the band [1.90, 2.23]: 122 of 127
  the 5 outside it, all with x near y'^2 where the lemma is already vacuous:
     y=  19 x=  367  u_x=1.072  ln x/ln y=2.01
     y=  19 x=  521  u_x=1.012  ln x/ln y=2.12
     y=  29 x=  739  u_x=1.043  ln x/ln y=1.96
     y=  43 x= 2111  u_x=1.018  ln x/ln y=2.04
     y=  61 x= 4253  u_x=1.013  ln x/ln y=2.03
```

**122 of the 127 sit in [1.90, 2.23]**, with u_x → 1.90 when ln x/ln y is large
and u_x → 2.09 when ln x/ln y → 1. Those two endpoints are exactly the two
features of ρ: 1.90 is where ρ crosses 1 on the way down, and 2.09 is where it
bottoms out. The law is

> **S\* solves ρ(u_x) = ρ(u_y), i.e. ρ(ln S/ln x) = ρ(ln S/ln y),**

which is immediate from the identity. The content is that ρ's descent and
recovery pin u_x into a band of width 0.3 around 2, whatever y and x are.

The five exceptions confirm rather than dent the picture: every one has
ln x/ln y ≈ 2, that is x ≈ y′², which is exactly where hypothesis (a) of §6 has
already failed and the origin is below the mean at S = y′² itself.

**So the crossover is the zone width.** S\* = x^{1.90…2.22} against x′² = x^{2+o(1)}.
The origin's advantage expires within a whisker of exactly the width the Zone
Postulate asks for, and which side of the line you land on is decided by ρ(2)
against ρ(2·ln x/ln y). Asymptotically ρ has its minimum at u = 2, so that
comparison always goes the wrong way. The finite-size version of the same
statement is the largest ln x/ln y at which the origin still beats the mean at
S = x′²:

```
  x          367    521    739   1049   1487   2111   2999   4253   6037
  max      1.219  1.203  1.190  1.178  1.168  1.159  1.151  1.144  1.137
  ln x/ln y
```

Monotone down, nine levels, no exceptions. **The band of y that helps is
shrinking toward y = x**, which is the degenerate matrix.

**The ceiling, stated without any y at all.** Take the d = 1 ensemble, all x#
translates, whose mean is simply S·δ_x. Then origin/mean = ρ_x(x′²) = ρ(2), and
that is a statement about the origin and the tile with no matrix in it:

```
       x       x'^2       origin     S*delta_x    rho_x(x'^2)    HL factor   rho/HL   (target 0.79305)
      29         961           30          32.6     0.91961     1.09750  0.83791
      89        9409          187         182.7     1.02326     1.26663  0.80786
     181       36481          538         536.7     1.00250     1.24283  0.80662
     367      139129         1584        1638.3     0.96686     1.20691  0.80110
     739      552049         4835        5082.2     0.95136     1.18365  0.80375
    1049     1104601         8563        9025.6     0.94874     1.17858  0.80499
    1487     2217121        16883       18044.6     0.93562     1.17982  0.79303
    2111     4464769        30074       32339.3     0.92995     1.17011  0.79475
    2999     9006001        53783       58169.5     0.92459     1.16056  0.79668
    4253    18139081        96465      105002.3     0.91869     1.15034  0.79863
    6037    36517849       173738      190487.2     0.91207     1.14120  0.79922
```

The HL factor column is the window's own finite-size Hardy-Littlewood overshoot,
measured not assumed. Dividing it out leaves **0.7930, 0.7948, 0.7967, 0.7986,
0.7992** at the top five levels against e^{2γ}/4 = **0.79305**. That is the
Unification Law's trough constant of `FOLD-PROFILE.md` §9 and the conjectured
limit of β in `GLOSSARY.md`, arriving at the Zone Postulate from a direction
nobody had pointed it. It is the constant's **fifth** independent appearance in
the repo, and the first from the origin side.

> **The origin ceiling (MEASURED, HL-conditional in its exact value).** At the
> zone's own width the origin carries **e^{2γ}/4 ≈ 0.79** of the tile's mean
> density, not more. The raw ratio approaches it from above like 1 + c/ln x;
> the measured raw values run 1.00 at x = 181 down to 0.912 at x = 6037.

The curve's trough, measured directly in the same window as a check:

```
  minimum of rho over 1.5 <= u <= 6: rho = 0.86392 at u = 2.0903 (y = 7331)
```

and the shape on [1,2] against e^{2γ}/u², all fifteen readings agreeing on one
constant which is the window's HL factor:

```
       y        u     y-rough pairs in (y,N)      N*delta_y       rho    e^{2g}/u^2
  1639664   1.3000                504821         243883.7   2.06993    1.87705
   373121   1.4500                513766         303377.1   1.69349    1.50878
   112070   1.6000                516022         369310.1   1.39726    1.23915
    41369   1.7500                516757         441669.5   1.17001    1.03583
    17873   1.9000                517049         520331.0   0.99369    0.87873
    10954   2.0000                517139         576096.5   0.89766    0.79305
```

ρ/(e^{2γ}/u²) reads 1.1028, 1.1224, 1.1276, 1.1295, 1.1308, 1.1319: constant to
under one percent over u ∈ [1.45, 2.0]. The shape is exactly e^{2γ}/u², and the
constant is the finite-size factor of the window, which tends to 1.

---

## 6. The lemma's one hypothesis, the corollary's threshold, and the collision

The lemma needs exactly one hypothesis, S ≤ y′². Three further statements travel
with it, and each has a different logical type: a non-vacuity remark, a corollary
with its own threshold, and a proposition about the parameters that owes the
lemma nothing. **The canonical enumeration of all four is `maier-matrix.md` §4a,
which is the lemma's home; this section derives the three companions, one
subsection each.**

### 6a. The non-vacuity condition: the conclusion is empty unless y′² > x

An x-rough integer below x is 1, and 1 is not a slot because 1·3 is divisible
by 3. So **D_x(S) = 0 for every S ≤ x**. At S = y′² ≤ x the lemma says 0 = 0.

This is a remark and not a hypothesis, because the identity is true in that
regime as well, and it is true outside S ≤ y′² too: L is *defined* as the struck
count, so the bookkeeping never fails. What needs S ≤ y′² is the strike
characterisation, whose consequent bound L ≤ 2(π(x) − π(y) + 1) breaks once
S > y′². All fourteen verification cells of `maier-matrix.md` §4 satisfy
y′² > x, so the evidence covers the non-vacuous regime only, which is the regime
worth having.

### 6b. The Origin Excess Corollary, and the ceiling its threshold forces

> **Origin Excess Corollary (PROVEN, positive only below a threshold).**
> origin ≥ D_y(y′²) − 2(π(x) − π(y) + 1).

The guarantee is positive only below a threshold x\*:

```
       y      y'^2    D_y(y'^2)   x for which 2(pi(x)-pi(y)+1) >= D_y(y'^2)   so x must satisfy
     13       289          16                            41      x < 41
     19       529          21                            61      x < 61
     29       961          30                            89      x < 89
     43      2209          62                           193      x < 193
     61      4489         110                           359      x < 359
     89      9409         187                           643      x < 643
    127     17161         289                          1039      x < 1039
    181     36481         542                          2069      x < 2069
    257     69169         878                          3529      x < 3529
```

ln x\*/ln y reads 1.448, 1.396, 1.333, 1.399, 1.431, 1.441, 1.434, 1.469, 1.472
down that column: flat at about **1.44**, with no upward trend across two orders
of magnitude in y. So in the regime where the lemma says anything at all,

> **(ln x / ln y)² ≤ about 2.2.**

**The advertised factor is not merely small, it is bounded by an absolute
constant near 2**, which is a stronger statement than calling the measured
factor small, and the bound does not improve with scale. The 14-cell table's
maximum, 1.372, is not a small-sample artifact; it is close to the ceiling.
Chris's third honest doubt, "check whether the size is useful before
celebrating", is answered: it is not, and the reason is structural rather than
numerical.

This ceiling is on the origin's *advantage* below y′², and it is a different
object from the origin's value at the zone width, which is ρ(2) = 0.79305 and a
deficit rather than an advantage (§5).

### 6c. The Scale Collision Proposition: the regimes never touch

> **Scale Collision Proposition (PROVEN, one line, no matrix in it).** If y < x
> with x prime, then y′ ≤ x < x′, so **y′² < x′² strictly**.

The two regimes are not merely disjoint, they never touch; they meet only at
y = x, where the matrix is the tautology of `maier-matrix.md` §2 and the fold
question A6 already closed. The strict inequality is a consequence of
y′ ≤ x < x′ alone, so it is a fact about the two parameters rather than a
property of the construction: **no better lemma repairs it**, and this is why
§8's first reason is the hardest of the three to argue around.

---

## 7. Mechanism tests: three candidates, three failures, each for a different reason

Chris asked for at least two of the mirror, the fused window and the −1/2
constant, the skeleton kernel, and head monotonicity. Three were tested. All
three fail, and the three failure modes are worth keeping separate.

### G1. The mirror (`FOLD-PROFILE.md` §4) is the origin, not a second sample

```
       x      S     head   mirror   equal?   fused head+mirror    2*head
      13    289       16       16   YES              32          32
      13   1156       56       56   YES             112         112
      17    361       18       18   YES              36          36
      17   1444       59       59   YES             118         118
      19    529       21       21   YES              42          42
      19   2116       79       79   YES             158         158
      23    841       30       30   YES              60          60
      23   3364      116      116   YES             232         232
```

The palindrome σ(r) = W − 2 − r is an involution on the slot set, and it maps
[0,S) onto the interval immediately *below* 0 in the periodic tile. So the
"fused" head-plus-mirror window is one centred window of width 2S about the point
−1, and its count is exactly twice the head's. Sample size and count double
together and the ratio to the mean is unchanged.

**REFUTED as an independent source of origin advantage.** The mirror is not a
second observation of the origin. It is the same observation written backwards.

### G2. The abutting window and the −1/2 constant (natal-cap-19, -26): the mechanism is real and it works against us

Split each row into A = [0,S) and B = [S,2S).

```
       y   x      S     corr(A,B)    origin A (z)    origin B (z)   origin A+B (z)   A ratio  B ratio  A+B ratio
    13  23    289     -0.4497        2.680       -1.254        1.327     1.301    0.809     1.090
    13  23    361     -0.4439        2.395       -1.616        0.494     1.241    0.780     1.031
    13  23    500     -0.0267        1.632       -2.692       -1.014     1.110    0.757     0.945
    13  23    841     -0.3920        0.241       -2.056       -1.652     1.015    0.867     0.942
    11  23    250     -0.3476        2.275       -0.998        1.003     1.332    0.820     1.093
    11  23    400     -0.2754        1.845       -2.707       -0.981     1.212    0.642     0.927
    11  19    250     -0.3082        1.906       -1.568       -0.025     1.216    0.748     0.998
    11  19    400     -0.2494        1.156       -3.907       -2.525     1.106    0.586     0.846
```

Two things, and the first is a small positive.

**The −1/2 constant shows up here independently.** The abutting correlation reads
−0.45, −0.44, −0.39, −0.39, −0.35, −0.31, −0.31 across most cells. natal-cap-26's
exact −1/2 was proved for the flat spectral functional on the natal set; seeing
−0.39 to −0.45 for abutting windows in the two-level row ensemble is a fourth
independent sighting of the same negative adjacency.

**And it is exactly the wrong sign for this problem.** At S = 289 the origin is
+2.68 standard deviations in A and **−1.25 in B**; the fused window A+B is only
+1.33 and by S = 500 it is **−1.01**. The B ratio runs 0.809, 0.780, 0.757, 0.642,
0.586: the origin is a large deficit on the shoulder. The head advantage is
repaid immediately above the crystallisation frontier, and any construction that
widens the window past y′² collects the repayment.

**REFUTED as a route to a wider window**, and the refutation is mechanistic, not
numerical: negative adjacency means a widened window sees the sum of an excess
and its own compensating deficit.

### G3. The impact window and head monotonicity (`FOLD-PROFILE.md` §11): circular, exactly the A6 trap

```
       x     x'^2   slots in head   twin primes in (x, x'^2)   + [x'^2-2 rough]   identical?
      13      289             16                       16                  0      YES
      17      361             18                       17                  1      YES
      19      529             21                       21                  0      YES
      23      841             30                       29                  1      YES
```

The head is the twin primes below x′² plus at most the single boundary slot
x′² − 2, which is the Head Lemma's second element. So the mechanism's entire
content is "the head equals the twin primes below x′²". That is the Zone
Postulate written out.

**CIRCULAR**, and it is exactly the failure A6 recorded for the first-slot
recursion. Chris's warning about this trap was well placed: two of the three
candidates that look like origin structure are crystallisation wearing a
different hat, and the check that catches them is to ask whether the object being
counted is π₂ of the head.

### The general obstruction, stated so it does not need re-testing

The three failures are not three coincidences.

> **Origin Channel Lemma (INFERRED, with the proof sketch below).** In the
> two-level frame the M rows are exactly the M residue vectors (a_q)_{q∈(y,x]},
> each occurring once, and the origin is the all-zero vector (§4, PROVEN). Row
> counts differ only through which T_y slots fall in the excluded classes
> a_q, a_q − 2 (mod q). For a fixed a, the number of T_y slots below S in a
> single class mod q is D_y(S)/q up to fluctuation, with **no systematic bias for
> any a except a = 0 and a = −2**, whose bias is that a y-rough multiple of q is
> q·k with k y-rough. Hence **every origin advantage in this frame is the
> depletion of the y-rough numbers below S/q, and nothing else.** That depletion
> is total for S/q < y′ and gone by S/q ≈ 3y′ (§4, MEASURED). Its reach is
> therefore S ≈ q·y′ per prime and S ≈ y′² in aggregate, and it is
> crystallisation by definition.

The one loophole worth naming and closing: the origin's excluded sets overlap
more than a generic vector's only in the sense that they are all multiples, but
for any vector the classes a_q and a_{q'} intersect in one class mod q·q′ with
the same expected count. The joint structure is identical; only the roughness of
the elements differs. So there is no second channel hiding in the
inclusion-exclusion either.

**What that leaves of route B.** Three pieces of the origin's proven structure
are aimed at route B of `ZONE-POSTULATE.md` §6 and all three miss, for the three
distinct reasons above. Route B's non-fold half is narrower than it looks.

---

## 8. The verdict

**Q. Can the Origin Excess Lemma, or anything like it, be pushed to S = x′²?**

**No, and the target is worse than empty.** Three separate reasons, in increasing
order of how hard they are to argue around.

1. **Parameters.** y < x forces y′ ≤ x < x′, hence y′² < x′² strictly. PROVEN,
   one line, no matrix. The regimes are disjoint and do not even touch.
2. **Size.** Even inside its own regime the lemma's advantage is capped at about
   2.2, because it is silent for x ≥ y′² and trivial for x ≥ x\* with
   ln x\*/ln y ≈ 1.44. MEASURED at nine levels.
3. **Shape, and this is the real answer.** origin/mean = ρ(u_x)/ρ(u_y) exactly.
   S = x′² is u_x = 2, which is the minimum of ρ. So the zone's width is the one
   width at which the origin is worst, and against the full ensemble the origin
   carries e^{2γ}/4 = 0.79305 of the mean density. VERIFIED to four digits after
   stripping the window's Hardy-Littlewood factor.

**Q. Is the collision genuine or an artifact?**

**Genuine, and it is not really a collision.** "Collision" suggests two
constraints that happen to be incompatible. What is actually going on is that the
origin's advantage and the zone's width are the *same* object measured in the
same variable: the advantage lives where ρ is above 1, which is u < 1.90, and the
zone sits at u = 2, which is where ρ bottoms out. The crossover S\* = x^{1.90…2.22}
is not near x′² by accident. Both are the point where crystallisation ends.

**Q. Is there another source of origin advantage that does not route through
crystallisation?**

**No, in this frame, and §7's Origin Channel Lemma says why.** The origin is the
all-zero residue vector; the only thing that distinguishes the zero class is that
its members are q times something rough; the reach of that is q·y′. The mirror is
the origin reflected, the fused window collects the shoulder's repayment, and the
impact window is π₂ of the head. Anyone proposing a fourth candidate should be
asked one question: *does it distinguish the class 0 mod q from a generic class
by anything other than the roughness of its elements?* If not, it has the same
reach.

**What this leaves.** Route B of `ZONE-POSTULATE.md` §6 asked for "structure
specific to the origin". The structure exists, it is exactly crystallisation, and
this file measures its reach: **S ≈ y′² in the two-level frame, S = x^{1.90…2.22}
in general, and the Zone Postulate needs S = x^{2+o(1)}, on the wrong side by a
constant that tends to e^{2γ}/4.** Nobody in this repo should attempt an origin
advantage at the zone width again without first exhibiting a mechanism that
survives §7's one question.

---

## 9. READINGS

1. **VERIFIED (custody, exact).** Independent engine reproduces
   `maier-matrix.js` §F 14 of 14, the §D and §E rank tables digit for digit, and
   the censuses D₁₃ = 1485, D₁₉ = 378,675, D₂₃ = 7,952,175. §1.
2. **PROVEN + VERIFIED (39/39).** Survival Quotient Identity:
   origin(S)/mean(S) = ρ_x(S)/ρ_y(S) exactly, for every y < x and S ≤ y#. The
   origin's excess over the matrix ensemble is one survival curve read at two
   levels. §2.
3. **PROVEN.** Row bijection: M = ∏_{y<q≤x} q and r ↦ (−r·y# mod q)_q is a
   bijection onto ∏ Z/q. The ensemble is the set of residue vectors, each once,
   and the origin is the all-zero vector. §4.
4. **PROVEN.** Per-prime threshold: λ_q(S) ≤ 2 whenever S ≤ q·y′. The Origin
   Excess Lemma is this bound over all q at once, and the binding prime is the
   smallest, q = y′, giving S ≤ y′². Weights are 1/q, so no reweighting escapes
   the binding prime. §4.
5. **MEASURED (scale free, 150 cells per bin, six levels y ∈ 29…641).** The
   per-prime loss ratio λ_q/fair_q is 0.05 for S ≤ q·y′, 0.90 at twice, and
   **overshoots to 1.25 at eight times** before returning to 1.00 at a hundred
   times. The advantage does not decay to 1; it crosses and reverses. §4.
6. **MEASURED, decisive.** At S = x′² the class a_q = 0 is the **worst of the q
   classes** at the smallest prime (rank 17/17 at y = 13, x = 23; 16/17 and 13/13
   at y = 11). The origin at the zone width is an actively poor row, not an
   uncertified good one. §4.
7. **MEASURED (127 pairs, levels to 6037).** The crossover law: the first S at
   which the origin falls below the ensemble mean satisfies
   **u_x = ln S\*/ln x ∈ [1.90, 2.23]** for 122 of 127 pairs (median 1.993,
   p05 1.916, p95 2.149), tending to 1.90 as ln x/ln y grows and to 2.09 as it
   tends to 1. The five exceptions all have x ≈ y′², where the lemma is already
   vacuous. The largest ln x/ln y at which the origin still beats the mean at
   S = x′² falls monotonically 1.219 → 1.137 over x = 367…6037. In S/y′² the same quantity
   ranges over three orders of magnitude, so y′² is the wrong variable. §5.
8. **MEASURED, and the headline.** Against the ensemble of all x# translates,
   origin/mean at S = x′² is ρ(2), which after dividing out the window's own
   Hardy-Littlewood factor reads 0.79303, 0.79475, 0.79668, 0.79863, 0.79922 at
   x = 1487…6037 against e^{2γ}/4 = **0.79305**. The origin at the zone's width
   is 21% **below** the tile's mean density, asymptotically. §5.
9. **VERIFIED (fresh window, 15 levels).** The Unification Law re-measured:
   ρ_z(z^u) collapses to a function of u alone to four decimals for u ≥ 3, and
   ρ(u) = C·e^{2γ}/u² on u ∈ [1.45, 2.0] with C = 1.13 constant to under one
   percent, C being the window's finite-size factor. Trough measured at
   ρ = 0.86392, u = 2.0903 in [0, 1.2·10⁸). §5.
10. **PROVEN (the collision, without the matrix).** y < x with x prime forces
    y′ ≤ x < x′ hence y′² < x′² strictly. The Origin Excess Lemma and the Zone
    Postulate can never be satisfied together, and this is a statement about
    y′ and x′, not about the construction. §6c.
11. **MEASURED, and it caps the prize.** The Origin Excess Lemma is vacuous for
    y′² ≤ x and trivial for x ≥ x\* with ln x\*/ln y ≈ 1.44 at nine levels.
    Hence **(ln x/ln y)² ≤ about 2.2** wherever the lemma is non-trivial; the
    measured maximum 1.372 is near the ceiling, not a small sample. §6.
12. **REFUTED.** The mirror is not an independent origin observation. σ(r) =
    W − 2 − r maps [0,S) onto the interval below 0, so head + mirror is one
    centred window of width 2S with exactly twice the count. Ratio to the mean
    unchanged, at every (x,S) tested. §7 G1.
13. **REFUTED, with a mechanism, plus a small positive.** Abutting windows in the
    row ensemble are negatively correlated at −0.39 to −0.45, an independent
    sighting of natal-cap-26's −1/2. That is exactly the wrong sign here: the
    origin is +2.68σ in [0,y′²) and −1.25σ in [y′², 2y′²), and the fused window is
    −1.01σ by S = 500. Widening the window collects the repayment. §7 G2.
14. **REFUTED as circular.** The impact-window and head-monotonicity route gives
    head = π₂(x, x′²) plus at most the single boundary slot x′² − 2, verified at
    x = 13, 17, 19, 23. Its content is the Zone Postulate written out; the same
    trap as A6. §7 G3.
15. **INFERRED, and it is the general obstruction.** Origin Channel Lemma: the
    origin is the all-zero residue vector, the only systematic property of the
    zero class is that its members are q times a rough number, and the reach of
    that is S ≈ q·y′. **Every origin advantage in this frame is crystallisation
    and has the same reach.** The screening question for any new candidate: does
    it distinguish the class 0 mod q from a generic class by anything other than
    the roughness of its elements? §7.
16. **INFERRED, where this leaves the repo.** Route B's origin-structure half is
    closed for the zone width. The advantage exists, its reach is measured, and
    the reach ends at u ≈ 2, which is where the zone begins. What remains of
    route B is unchanged from A6: the non-fold half, which is counting inside the
    head, which is route C and the parity floor.

---

## 10. Reproduction

`node --max-old-space-size=6144 research/origin-excess.js`, 13 seconds.

Sections A (custody), B (identity), C (crossover scans), D (per-prime anatomy),
G (mechanism tests), E (the ρ curve), F (the crossover law at scale) correspond
to §§1, 2, 3, 4, 7, 5, 5 here. The heap flag is for T₂₃ (223,092,870 residues)
and the two sieves of [0, 1.2·10⁸); everything else is small. Section order in
the code is A, B, C, D, G, E, F so that the tiles are released before the sieves
are allocated.

---

*This document states current understanding. Superseded claims, retired numbers and the reasons they changed are in [history/CHANGELOG.md](history/CHANGELOG.md), indexed by document.*
